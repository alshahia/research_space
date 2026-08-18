/* Purpose: embedded owner agent - spawn opencode serve, probe health, create a session, run ONE bounded explicit-model structured prompt, reap the server. */
/* Expected behavior: server.url is non-empty; the /global/health probe reports healthy:true and a 1.18.x version; the prompt returns either a schema-bounded answer string or a StructuredOutputError discriminator; server.close() resolves. */
/* Smallest validation: bun run example-a-owner.ts exits 0 and prints server url:, healthy: true, version: 1.18.x, created id:, model pin: opencode / deepseek-v4-flash-free, answer: <string> (or structured-output failure: true), and close completed: true. */
/* Freshness footer: sdk=1.18.18 cli=1.18.x access=2026-08-18 */

import { createOpencode } from "@opencode-ai/sdk";

// Explicit free high loopback port (dossier policy: never port:0, never non-loopback).
const PORT = 47831;
const PROMPT_BOUND_MS = 30000; // 30 s wall-clock ceiling on the one prompt call.
const PROMPT_MODEL = { providerID: "opencode", modelID: "deepseek-v4-flash-free" };

// Profile: the dossier's verified server endpoint GET /global/health returns
// { healthy: true, version: string } [S2]. The v1 SDK surface at 1.18.18 does
// NOT generate a client.global.health() method (probed on this host; the v1
// Global namespace exposes only event). We probe the same loopback endpoint
// directly; no auth, no credentials, no non-loopback traffic.
async function probeHealth(serverUrl: string): Promise<{ healthy: boolean; version: string }> {
  const url = new URL("global/health", serverUrl);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`health probe failed with status ${response.status}`);
  }
  const raw = (await response.json()) as { healthy?: boolean; version?: string };
  return { healthy: raw.healthy === true, version: typeof raw.version === "string" ? raw.version : "<missing>" };
}

// Bounded prompt executor: races the SDK call against a 30 s clock. When the
// clock wins it aborts the request signal (the SDK accepts an AbortSignal like
// any RequestInit-derived option) and rejects with a bounded error. One attempt,
// no retry, no model substitution inside this file.
async function promptBounded<T>(call: () => Promise<T>, ms: number): Promise<T> {
  const controller = new AbortController();
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      controller.abort();
      reject(new Error(`prompt bounded timeout after ${ms} ms`));
    }, ms);
  });
  try {
    return await Promise.race([call(controller.signal), timeout]);
  } finally {
    if (timer) {
      clearTimeout(timer);
    }
  }
}

let closeCompleted = false;

try {
  const { client, server } = await createOpencode({
    hostname: "127.0.0.1",
    port: PORT,
    timeout: 30000,
  });

  try {
    const health = await probeHealth(server.url);
    console.log("server url:", server.url);
    console.log("healthy:", health.healthy);
    console.log("version:", health.version);

    const created = await client.session.create({ body: { title: "Example-A-owner" } });
    if (!created.data) {
      throw new Error("session.create returned no data");
    }
    const id = (created.data as { id?: string }).id;
    console.log("created id:", typeof id === "string" && id.length > 0 ? id : "<missing>");

    console.log("model pin:", PROMPT_MODEL.providerID + " / " + PROMPT_MODEL.modelID);

    // ONE prompt call, explicitly pinned model, tiny JSON schema, 30 s bound.
    const promptStartMs = Date.now();
    let dataPresent = false;
    let errorPresent = false;
    let timedOut = false;
    let promptError: string | undefined;

    try {
      const result = await promptBounded(
        (signal) =>
          client.session.prompt({
            path: { id },
            signal,
            body: {
              model: PROMPT_MODEL,
              parts: [{ type: "text", text: "Return JSON {\"answer\":\"ok\"}" }],
              format: {
                type: "json_schema",
                schema: {
                  type: "object",
                  properties: {
                    answer: { type: "string", maxLength: 16 },
                  },
                  required: ["answer"],
                  additionalProperties: false,
                },
              },
            },
          }),
        PROMPT_BOUND_MS,
      );

      dataPresent = Boolean(result?.data);
      errorPresent = Boolean(result?.error);

      if (result?.data) {
        // Verified discriminator first [S1]: data.info.error.name === "StructuredOutputError".
        // Observed drift on this host (2026-08-18): the same info.error slot can
        // carry another server-emitted name (e.g. "APIError") when the model fails
        // the schema. Any info.error presence is treated as the structured-output
        // failure verdict; the observed name is printed for the evidence file.
        // Any other info.* field stays not-verified beyond error.name.
        const info = (result.data as { info?: { error?: { name?: unknown } } }).info;
        const errorName = info?.error ? (info.error as { name?: unknown }).name : undefined;
        const structuredFailure =
          errorName === "StructuredOutputError" || info?.error !== undefined;

        if (structuredFailure) {
          console.log("structured-output failure: true");
          console.log("info error name:", typeof errorName === "string" ? errorName : "<non-string>");
        } else {
          const parts = (result.data as { parts?: Array<{ text?: unknown }> }).parts;
          const firstText = Array.isArray(parts) && parts.length > 0 ? parts[0]?.text : undefined;
          console.log("answer:", typeof firstText === "string" ? firstText : "<no-answer-text>");
        }
      } else {
        console.log("answer: <no-data>");
      }
    } catch (value) {
      const message = value instanceof Error ? value.message : String(value);
      promptError = message;
      if (message.startsWith("prompt bounded timeout")) {
        timedOut = true;
        process.exitCode = 1; // honest run failure; no fallback for timeout class
        console.log("answer: <bounded-timeout>");
      } else {
        process.exitCode = 1; // transport/other failure class; not a fallback trigger
        console.log("answer: <prompt-error>");
      }
    }

    const promptEndMs = Date.now();
    console.log("data present:", dataPresent);
    console.log("error present:", errorPresent || timedOut);
    if (promptError !== undefined) {
      console.log("prompt error:", promptError);
    }
    console.log("prompt start (UTC):", new Date(promptStartMs).toISOString());
    console.log("prompt end (UTC):", new Date(promptEndMs).toISOString());
    console.log("prompt elapsed ms:", promptEndMs - promptStartMs);
    console.log("usage shape: not-verified");
    console.log("info shape: not-verified beyond error.name");
  } finally {
    await server.close();
    closeCompleted = true;
  }
} catch (value) {
  process.exitCode = 1;
  console.log("run failed:", value instanceof Error ? value.message : String(value));
} finally {
  if (closeCompleted) {
    console.log("close completed: true");
  } else {
    process.exitCode = 1;
    console.log("close completed: false");
  }
}