/* Purpose: SSE event agent - subscribe to GET /global/event with a 30 s abort bound, count frames, and shut down in the prescribed order. */
/* Expected behavior: the subscription opens against the owned server; the 30 s AbortController ends the stream; the loop exits; retries stay within a finite budget; server.close() resolves after the subscription is done. */
/* Smallest validation: bun run example-c-events.ts exits 0 and prints abort requested: true, frames observed: <n> where n >= 0, and close completed: true. */
/* Freshness footer: sdk=1.18.18 cli=1.18.x access=2026-08-18 */

import { createOpencode } from "@opencode-ai/sdk";

// Explicit free high loopback port, distinct from the other two examples.
const PORT = 47833;
const BOUND_MS = 30000; // 30 s abort bound, armed BEFORE subscribing.

const controller = new AbortController();
let abortRequested = false;
const timer = setTimeout(() => {
  abortRequested = true;
  controller.abort();
}, BOUND_MS);

let closeCompleted = false;

try {
  const { client, server } = await createOpencode({
    hostname: "127.0.0.1",
    port: PORT,
    timeout: 30000,
  });

  let framesObserved = 0;

  try {
    const subscription = await client.event.subscribe({
      signal: controller.signal,
      onSseError: (value: unknown) => {
        const message = value instanceof Error ? value.message : String(value);
        console.error("sse transport error:", message);
      },
      onSseEvent: () => {
        framesObserved += 1;
      },
      sseDefaultRetryDelay: 1000,
      sseMaxRetryAttempts: 5,
      sseMaxRetryDelay: 10000,
    });

    for await (const event of subscription.stream) {
      // Defensive type discriminator only; never print payload bodies.
      const type = (event as { type?: unknown }).type;
      console.log("frame:", typeof type === "string" ? type : "<unknown-type>");
    }
  } catch (value: unknown) {
    if (!controller.signal.aborted) {
      throw value;
    }
  } finally {
    clearTimeout(timer);
    controller.abort();
    await server.close();
    closeCompleted = true;
    console.log("abort requested:", abortRequested);
    console.log("frames observed:", framesObserved);
    console.log("close completed: true");
  }
} catch (value) {
  process.exitCode = 1;
  console.log("run failed:", value instanceof Error ? value.message : String(value));
} finally {
  if (!closeCompleted) {
    process.exitCode = 1;
    console.log("close completed: false");
  }
}