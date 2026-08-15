// tests/opencode-bridge.test.ts — Tier 2 ai-chat skeleton (Path B bridge)
//
// Unit test for `createOpencodeBridge()`. Stubs the `@opencode-ai/sdk` client
// so the test does NOT require a live `opencode serve` running on the host.
//
// Asserts:
//   1. `prompt(conversationId, messages)` calls `session.create` exactly once
//      when no session is cached for the conversationId.
//   2. Subsequent `prompt()` calls reuse the cached session (no second
//      `session.create`).
//   3. The assistant text is unwrapped from the `AssistantMessage.parts` array.
//   4. `clearSession()` drops the cache entry.
//   5. Calling `prompt()` with zero user messages throws.
//
// ponytail: stub the client at the boundary (constructor injection), not via
// module mocking. The bridge accepts a `client` parameter so unit tests never
// load `@opencode-ai/sdk` or require network access.
import { describe, it, expect, vi, beforeEach } from "vitest";
import { createOpencodeBridge, type OpencodeBridge } from "../src/lib/opencode";
import type { OpencodeClient } from "@opencode-ai/sdk";

function stubBridge(): { bridge: OpencodeBridge; stub: ReturnType<typeof makeStubClient> } {
  const stub = makeStubClient();
  // ponytail: cast the structural stub to `OpencodeClient` — the real SDK
  // type is structural and only depends on `.session.create()` and
  // `.session.prompt()` being callable. Unit tests never touch the network.
  const bridge = createOpencodeBridge({ client: stub as unknown as OpencodeClient });
  return { bridge, stub };
}

interface FakeParts {
  type: string;
  text?: string;
}

interface FakeSessionPromptResult {
  data: {
    info: { id: string; role: "assistant" };
    parts: FakeParts[];
  };
}

function makeStubClient(): {
  session: {
    create: ReturnType<typeof vi.fn>;
    prompt: ReturnType<typeof vi.fn>;
  };
  // Track calls for assertions.
  __createCalls: number;
  __promptCalls: number;
} {
  const createCalls = { value: 0 };
  const promptCalls = { value: 0 };
  const create = vi.fn(async () => {
    createCalls.value++;
    return { data: { id: `session-${createCalls.value}` } };
  });
  const prompt = vi.fn(async (_args: unknown): Promise<FakeSessionPromptResult> => {
    promptCalls.value++;
    return {
      data: {
        info: { id: "session-1", role: "assistant" as const },
        parts: [
          { type: "reasoning", text: "thinking..." },
          { type: "text", text: "Hello from OpenCode!" },
          { type: "tool" },
        ],
      },
    };
  });
  return {
    session: { create, prompt },
    __createCalls: 0,
    __promptCalls: 0,
  };
}

describe("opencode bridge (Path B)", () => {
  beforeEach(() => {
    // Reset OPENCODE_URL between tests so the resolve path doesn't leak state.
    delete process.env.OPENCODE_URL;
  });

  it("creates a new session on first prompt and caches it by conversationId", async () => {
    const { bridge, stub } = stubBridge();

    const result = await bridge.prompt("conv-1", [
      { role: "user", content: "Hi" },
    ]);

    expect(stub.session.create).toHaveBeenCalledTimes(1);
    expect(stub.session.prompt).toHaveBeenCalledTimes(1);
    expect(result.sessionId).toBe("session-1");
    // Only the `text` part is unwrapped; reasoning/tool parts are dropped.
    expect(result.text).toBe("Hello from OpenCode!");
  });

  it("reuses the cached session on subsequent prompts for the same conversationId", async () => {
    const { bridge, stub } = stubBridge();

    await bridge.prompt("conv-2", [{ role: "user", content: "First" }]);
    await bridge.prompt("conv-2", [{ role: "user", content: "Second" }]);

    expect(stub.session.create).toHaveBeenCalledTimes(1);
    expect(stub.session.prompt).toHaveBeenCalledTimes(2);
  });

  it("creates separate sessions for different conversationIds", async () => {
    const { bridge, stub } = stubBridge();

    await bridge.prompt("conv-A", [{ role: "user", content: "A" }]);
    await bridge.prompt("conv-B", [{ role: "user", content: "B" }]);

    expect(stub.session.create).toHaveBeenCalledTimes(2);
  });

  it("clearSession drops the cached entry; next prompt creates a new session", async () => {
    const { bridge, stub } = stubBridge();

    await bridge.prompt("conv-3", [{ role: "user", content: "Hi" }]);
    bridge.clearSession("conv-3");
    await bridge.prompt("conv-3", [{ role: "user", content: "Hi again" }]);

    expect(stub.session.create).toHaveBeenCalledTimes(2);
  });

  it("throws when called with no user messages", async () => {
    const { bridge, stub } = stubBridge();

    await expect(bridge.prompt("conv-x", [])).rejects.toThrow(
      /at least one user message/,
    );
    await expect(
      bridge.prompt("conv-x", [{ role: "assistant", content: "no user" }]),
    ).rejects.toThrow(/at least one user message/);
    expect(stub.session.create).not.toHaveBeenCalled();
    expect(stub.session.prompt).not.toHaveBeenCalled();
  });

  it("sends the latest user message content to session.prompt", async () => {
    const { bridge, stub } = stubBridge();

    await bridge.prompt("conv-4", [
      { role: "user", content: "First user message" },
      { role: "assistant", content: "First assistant reply" },
      { role: "user", content: "Second user message (the latest)" },
    ]);

    expect(stub.session.prompt).toHaveBeenCalledWith(
      expect.objectContaining({
        path: { id: "session-1" },
        body: {
          parts: [{ type: "text", text: "Second user message (the latest)" }],
        },
      }),
    );
  });

  it("exposes the resolved baseUrl for debugging", () => {
    const { bridge } = stubBridge();
    expect(bridge.baseUrl).toBe("http://127.0.0.1:4096");
  });
});
