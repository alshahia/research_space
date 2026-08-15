// src/lib/opencode.ts — Tier 2 ai-chat skeleton (Path B bridge)
//
// Wraps `@opencode-ai/sdk`'s typed HTTP client. Path B is the "with opencode"
// option from the intake (modelPath: "opencode"); it does NOT use AI SDK at all
// (no `streamText`, no `useChat`). The bridge calls `session.prompt()` once per
// user message and unwraps the `AssistantMessage` parts into a single string.
//
// ponytail: one client factory + a session cache keyed by client-supplied
// `conversationId`. No plugin system, no per-call config schema, no abstract
// base class. The SDK is the source of truth; this file just glues it to the
// spine's `tier.config.json` shape and the `runtime/opencode-url.txt` file.
//
// Latency caveat: `session.prompt()` runs the configured AGENT end-to-end
// (LLM + tools + MCPs + skills). It is NOT a raw completion gateway. Per
// `04_opencode_research_T-2026-08-14-001.md` §3, this means Path B latency is
// agent-shaped (5-60s typical), not streaming-token-shaped. Surface this in
// the user-facing copy.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

// ponytail: type-only import — keeps the runtime dependency on the SDK
// explicit at the boundary while letting callers inject a stub client for
// unit tests. The smoke test never imports the real SDK module; the bridge
// factory takes a `client` parameter (see `createOpencodeBridge`).
import type { OpencodeClient } from "@opencode-ai/sdk";

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

/**
 * One user/assistant message in a conversation.
 * Mirrors the shape tier2-saas-bundle's `messages` table will store.
 */
export interface BridgeMessage {
  role: "user" | "assistant";
  content: string;
}

/**
 * Result of a single Path B prompt. Plain text + the OpenCode session id that
 * produced it (for the caller's audit log + per-conversation cache).
 */
export interface BridgeResponse {
  text: string;
  sessionId: string;
}

// ---------------------------------------------------------------------------
// Client factory
// ---------------------------------------------------------------------------

/**
 * Resolved URL for the running `opencode serve` instance.
 *
 * Lookup order:
 *   1. `process.env.OPENCODE_URL` (explicit override; useful in CI).
 *   2. `runtime/opencode-url.txt` (written by `scripts/start-opencode-server.ps1`).
 *   3. `http://127.0.0.1:4096/` (OpenCode SDK default; see
 *      `https://opencode.ai/docs/sdk/` §Create client > Client only).
 *
 * Throws if neither env var nor runtime file resolves; we don't silently
 * default to a port that may not be running.
 */
export function resolveOpencodeUrl(): string {
  const envUrl = process.env.OPENCODE_URL?.trim();
  if (envUrl) return envUrl.replace(/\/$/, "");

  // ponytail: cwd-relative so the bridge works from `npm test`, `npm run dev`,
  // or `npm run build` without explicit env config. `runtime/` is gitignored.
  const runtimeFile = resolve(process.cwd(), "runtime", "opencode-url.txt");
  if (existsSync(runtimeFile)) {
    const fileUrl = readFileSync(runtimeFile, "utf8").trim();
    if (fileUrl) return fileUrl.replace(/\/$/, "");
  }

  // Fall back to the OpenCode SDK's documented default port.
  return "http://127.0.0.1:4096";
}

// ---------------------------------------------------------------------------
// Bridge
// ---------------------------------------------------------------------------

/**
 * Construct a typed OpenCode client. Thin wrapper around
 * `@opencode-ai/sdk`'s `createOpencodeClient` for two reasons:
 *   1. Resolve the base URL from env / runtime file (see `resolveOpencodeUrl`).
 *   2. Provide a single seam for unit-test stub injection (see
 *      `tests/opencode-bridge.test.ts`).
 *
 * If you don't need URL resolution or stubbing, you can call
 * `createOpencodeClient({ baseUrl })` from `@opencode-ai/sdk` directly.
 */
export interface OpencodeBridgeOptions {
  /** Override the resolved base URL. Useful in tests. */
  baseUrl?: string;
  /** Inject a pre-built client (skips the real `createOpencodeClient` call). */
  client?: OpencodeClient;
}

/**
 * Build the bridge.
 *
 * Returns a `Bridge` object with:
 *   - `client`: the underlying `@opencode-ai/sdk` client (typed).
 *   - `prompt(conversationId, messages)`: send the latest user message to a
 *     cached session (or create one). Returns the unwrapped assistant text.
 *   - `clearSession(conversationId)`: drop a session from the cache (call when
 *     the user explicitly resets the conversation).
 */
export function createOpencodeBridge(options: OpencodeBridgeOptions = {}) {
  const baseUrl = options.baseUrl ?? resolveOpencodeUrl();

  // ponytail: lazy-import the SDK so unit tests can stub `options.client`
  // without needing the SDK to be loaded at module init. `createOpencodeClient`
  // is the documented HTTP-client-only factory from
  // https://opencode.ai/docs/sdk/#client-only.
  let client: OpencodeClient | null = options.client ?? null;
  if (!client) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
    const { createOpencodeClient } = require("@opencode-ai/sdk") as typeof import("@opencode-ai/sdk");
    client = createOpencodeClient({ baseUrl });
  }

  // Per-conversation session cache. Keyed by the client-supplied
  // `conversationId`. Survives page reloads only if the caller persists it
  // (e.g. localStorage); for the spine we keep it in-memory.
  const sessionCache = new Map<string, string>();

  return {
    client,

    /**
     * Send a prompt to OpenCode; reuse or create a session for the
     * conversation. Returns the assistant's full text + the session id.
     *
     * Latency is agent-shaped (see module header).
     */
    async prompt(conversationId: string, messages: BridgeMessage[]): Promise<BridgeResponse> {
      const lastUser = [...messages].reverse().find((m) => m.role === "user");
      if (!lastUser) {
        throw new Error("prompt() requires at least one user message");
      }

      // ponytail: re-use a session if we have one for this conversation;
      // otherwise ask OpenCode for a new one. We do NOT ship the OpenCode
      // session-create helper inline (it's a 2-line wrapper over
      // `client.session.create()`); the caller can do that themselves.
      let sessionId = sessionCache.get(conversationId);
      if (!sessionId) {
        const created = await client!.session.create({ body: { title: conversationId } });
        sessionId = created.data!.id;
        sessionCache.set(conversationId, sessionId);
      }

      // ponytail: `session.prompt()` returns an `AssistantMessage` whose
      // `parts` are typed (`type: "text" | "tool" | "reasoning" | ...`).
      // We unwrap just the text parts. Per the SDK docs
      // (https://opencode.ai/docs/sdk/#sessions), the default call returns the
      // full `AssistantMessage` after the agent loop finishes.
      const result = await client!.session.prompt({
        path: { id: sessionId },
        body: {
          parts: [{ type: "text", text: lastUser.content }],
        },
      });

      // ponytail: the SDK's response shape varies by version. The 1.18.x line
      // returns `{ data: { info, parts }, ... }`; the `parts` array is where
      // the agent's text comes from. We concat text parts only — reasoning +
      // tool parts are dropped (Path B is chat, not tool execution).
      //
      // Note: the SDK's `ReasoningPart` ALSO carries a `text` field. Filtering
      // on `"text" in p` would include it. Filter on the literal `type`
      // discriminator instead — `TextPart` is the only variant with `type === "text"`.
      const parts = result.data?.parts ?? [];
      const text = parts
        .filter((p): boolean => (p as { type: string }).type === "text")
        .map((p) => (p as { text: string }).text)
        .join("");

      return { text, sessionId };
    },

    /** Drop a session from the cache. Call when the user resets the chat. */
    clearSession(conversationId: string): void {
      sessionCache.delete(conversationId);
    },

    /** Expose the resolved URL for debugging / health checks. */
    baseUrl,
  };
}

export type OpencodeBridge = ReturnType<typeof createOpencodeBridge>;
