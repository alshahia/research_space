# OpenCode SDK agent examples

Three runnable agent examples adapted verbatim-faithfully from the verified
recipes in `../09_examples.md`, `../02_quickstart.md`, `../05_lifecycle.md`,
`../07_errors.md`, and `../08_events.md`. Each example is INDEPENDENT and
SINGLE-COMMAND: it spawns its own `opencode serve` via `createOpencode()` on
its own explicit free high loopback port, so "ensure its working" needs no
second shell and no manager process.

Version coordinates: SDK `@opencode-ai/sdk@1.18.18`, CLI on the `1.18.x`
line. On this host the pair is CLI `1.18.3` vs SDK `1.18.18` -> dossier label
`same-minor-patch-delta-15`; that label is a position description, NOT a
semver compatibility claim. Observed compatibility is what the live runs in
`LIVE_RUN_EVIDENCE.md` record.

## Install

```sh
cd opencode-sdk-agent-docs/agents
bun install
```

The SDK is pinned EXACTLY at `1.18.18` in `package.json` (no caret). Verify
the resolution before the first run:

```sh
bun -e "console.log(require('./node_modules/@opencode-ai/sdk/package.json').version)"
```

## Run the examples

```sh
cd opencode-sdk-agent-docs/agents
bun run example-a-owner.ts   # ONE bounded provider call (see policy below)
bun run example-b-client.ts  # auth-free session CRUD + forced 404 parse
bun run example-c-events.ts  # auth-free SSE subscription, 30 s abort bound
```

Each run prints its smallest-validation contract and exits 0 on PASS. Each
run also checks its port is free before starting and again after `server.close()`
(the evidence file records the port-free confirmation).

## Run the tests

```sh
cd opencode-sdk-agent-docs/agents
bun test                        # auth-free, deterministic, ~40-60 s, no credentials
RUN_PROVIDER_TESTS=1 bun test   # adds the ONE bounded provider verdict (A gate)
```

What PASS means per suite (`agents.test.ts`, bun's built-in runner, zero new
dependencies):

| Suite | Duration | Needs provider? | PASS when |
|---|---|---|---|
| Structural lint (3 tests) | ~1 s | NO | each example file has the 4-line header, zero em-dash/en-dash/smart-quote bytes, no `port: 0` / `createOpencodeTui` / `process.kill` / auth-file paths, and `server.close()` present; A additionally ships the explicit primary pin, the 30 s bound constant, and a Promise.race/AbortSignal bounded mechanism |
| B smoke | ~10 s | NO | exit 0, session CRUD lines in order with created/fetched id equality, forced `status: 404` with a non-empty message, `v2 html guard: false`, `close completed: true`, port 47832 free before and after |
| C smoke | ~35 s | NO | exit 0, `abort requested: true`, `frames observed: <n>` with n >= 0, `close completed: true`, terminates inside the 40 s gate (the suite intentionally waits out the 30 s abort bound - the dossier's smallest validation for SSE), port 47833 free before and after |
| A provider-gated | ~20-70 s | YES - gated | skipped unless `RUN_PROVIDER_TESTS=1`; when run: terminates inside the 90 s gate, exit 0, contract lines in order including `model pin: opencode / deepseek-v4-flash-free`, then `answer: <real value>` OR `structured-output failure: true`, `close completed: true`, port 47831 free after |

The subprocess suites run sequentially on the pinned ports; a busy port is a
loud FAIL (no auto-rebind - the examples are port-pinned by contract). The
provider-gated suite fires ONE bounded call on the primary pin
(`opencode / deepseek-v4-flash-free`, 30 s wall clock, tiny JSON schema) under
the same provider-call policy as the examples; a gated fallback
(`opencode-go / deepseek-v4-flash`) is exercised only by an executor holding the
approved policy, never by the test file itself. Verdicts land in
`LIVE_RUN_EVIDENCE.md` (`## Test suite run`).

## File index and safety labels

| File | Label | What it does | Provider calls |
|---|---|---|---|
| `example-a-owner.ts` | [WARN] | Embedded owner agent: spawn server on port 47831, probe health, create a session, send ONE explicit-model structured prompt (`opencode / deepseek-v4-flash-free`) bounded by a 30 s wall clock, print presence-only result shapes, `server.close()` in finally | YES - exactly one, bounded, one attempt, no retry |
| `example-b-client.ts` | [SAFE] | Existing-server client agent, self-contained: spawn server on port 47832, connect through `createOpencodeClient({ baseUrl, directory })` with a TRIM-root repository directory, session CRUD, FORCED 404 via `session.get` on a missing id with `throwOnError: true`, parse `Error.message` / `.cause`, `server.close()` in finally | NO - auth-free |
| `example-c-events.ts` | [SAFE] | SSE event agent: spawn server on port 47833, subscribe to `GET /global/event` with a 30 s AbortController bound BEFORE subscribing, bounded retry budget, frame counting, abort-before-close shutdown order | NO - auth-free |

[WARN] means caller-side discipline is required: a real provider call with an
explicit model pin, a 30 s wall-clock bound, and a tiny JSON schema. The file
implements that discipline itself.

## Provider-call policy

- PRIMARY pin: `opencode / deepseek-v4-flash-free` (OpenCode Zen free tier).
  EXACTLY ONE example makes a real model call: A. Body = tiny JSON schema
  (`{ type: "object", properties: { answer: { type: "string", maxLength: 16 } }, required: ["answer"], additionalProperties: false }`).
  One attempt, no retry, no model substitution somewhere inside the example
  file. The prompt call is bounded by a 30 s wall-clock guard (AbortSignal
  plus a Promise.race timeout wrapper); total run budget is 60 s.
- FALLBACK rule: `opencode-go / deepseek-v4-flash` may be used ONLY IF the
  Zen primary fails with a bounded Zen-incident verdict (rate limit 429 /
  gateway incident), NOT on local/structural failures (type error, port
  collision, module-not-found - those are code bugs to fix, not fallback
  triggers). Same one-attempt / no-retry / 30 s bounds. The pin actually used
  is recorded in LIVE_RUN_EVIDENCE.md.
- B and C make ZERO provider calls (auth-free only: health, session CRUD,
  SSE against the local loopback server) - the folder is demonstrably
  runnable on a credential-less host.
- Prompt text is synthetic and non-sensitive (`Return JSON {"answer":"ok"}`).
- Credential discipline: uses only the existing global provider config
  through the SDK's provider loader. No auth file is read, printed, copied,
  exported, or stored.

## Notes on the security and lifecycle posture

- Loopback only (`127.0.0.1` on every spawn); never `port: 0`; never
  `createOpencodeTui()`; never a non-loopback bind.
- `server.close()` runs in a `finally` block in all three files. On Win32 the
  SDK dispatches `taskkill /pid <pid> /T /F`; the examples never call
  `process.kill` as owner.
- `example-a-owner.ts` and `example-c-events.ts` probe the server's version
  through the dossier's verified server endpoint `GET /global/health`
  (returns `{ healthy: true, version }`, cited in the research ledger as
  [S2]). The v1 SDK surface at 1.18.18 does not generate a
  `client.global.health()` method (verified by probe on this host on
  2026-08-18), so the loopback endpoint is fetched directly. This is the
  closest safe equivalent to the recipe's `client.global.health()` lines and
  keeps the exact printed output the plan requires.
- Every `.ts` file carries the dossier 4-line header (Purpose / Expected
  behavior / Smallest validation / Freshness footer) and is zero
  em-dash/en-dash/smart-quote (pure ASCII).

## Recipe B reference: the two-shell variant

These examples are single-command because B owns its server in-process
(`createOpencode()` -> take `server.url` -> `createOpencodeClient({ baseUrl, directory })`).
The pure two-shell variant from the dossier remains the reference for
connecting to a server someone else runs:

```sh
# shell 1 - the external server
opencode serve --port 4096 --hostname 127.0.0.1

# shell 2 - the client-only agent
bun run example-b-client.ts
```

(For the two-shell variant the client would point `baseUrl` at the external
server instead of spawning its own; `example-b-client.ts` implements the
self-contained shape so the check can run in one command.)

## Known adaptation surface (honest deviations from the recipe text)

1. `client.global.health()` does not exist on the v1 SDK 1.18.18 surface.
   The examples probe `GET /global/health` directly over loopback (see above).
   `server.url` is printed verbatim as returned by the SDK; at runtime it has
   NO trailing slash (for example `http://127.0.0.1:47831`), while the recipe
   prose shows a trailing slash notationally.
2. `body.format` (structured output) is not in the v1 generated
   `SessionPromptData` type; the examples send it anyway exactly as the
   dossier's Example 7 does, and treat the verified
   `data.info.error.name === "StructuredOutputError"` discriminator as the
   only certified failure signal. Observed on this host: the server can emit
   a different name in the same `info.error` slot (observed `APIError` with
   zero parts) when the model fails the schema; the example prints
   `structured-output failure: true` for any `info.error` presence and logs
   the observed name (`info error name:`) so the evidence file is
   self-explaining. `info shape: not-verified beyond error.name` stays as the
   marker.
3. A forced 404 needs a WELL-FORMED missing session id (`ses_` + 24 chars).
   The recipe's malformed placeholder string gets HTTP 500 on CLI 1.18.3;
   the example uses `ses_aaaaaaaaaaaaaaaaaaaaaaaa` to exercise the real 404.
4. `absent in list before:` follows the dossier recipe semantics
   (`!beforeIds.has(id)`): on a fresh server it prints `true`. The plan's
   verification matrix showed `false`; the line is present either way.
5. Live-run outcomes and per-run evidence: `LIVE_RUN_EVIDENCE.md`.

## Benefits

Per-agent demonstrated value:

- **A (example-a-owner.ts)** - the owned-lifecycle pattern with the safety
  rail that matters most: an explicit `model: { providerID, modelID }` pin on
  every prompt, because an unpinned prompt silently falls back to the user's
  saved default model (the dossier's top agent anti-pattern). It also proves
  the bounded structured-output discipline: one attempt, a 30 s wall clock,
  a tiny JSON schema, and an honest verdict line (`answer:` or
  `structured-output failure: true`) instead of an unbounded hang.
- **B (example-b-client.ts)** - the client-only factory against a trimmed
  repository directory, plus the throwOnError `.cause` contract: a forced 404
  surfaces as a real `Error` with `{ body, status }` under `.cause`, and the
  example prints a body-presence boolean, never a body dump. This is the
  error-parsing discipline that keeps secrets out of logs.
- **C (example-c-events.ts)** - the SSE pattern with a hard exit: a 30 s
  AbortController bound before subscribing, a finite retry budget, and
  abort-before-close shutdown order. It shows how a long-lived agent
  terminates in finite time instead of hanging on an open stream.

Design benefits:

- Single-command self-contained runs - no second shell, no manager process;
  each example owns its server, works, and reaps it.
- Explicit free high loopback ports (47831/47832/47833) - no `port: 0`
  guesswork, no TIME_WAIT contention between the three ports.
- `server.close()` in `finally` in every file - no orphaned `opencode serve`
  on Windows (the SDK dispatches `taskkill /pid <pid> /T /F`).
- B and C are entirely auth-free - the folder demonstrably runs on a
  credential-less host (CI stays credential-free too).
- Honest `not-verified` markers - the folder never invents field shapes for
  `usage.*`, `info.*` beyond the verified discriminator, or event payloads.
- Zero em-dash/en-dash/smart-quote bytes everywhere - the ASCII discipline
  makes the folder lint-friendly and diff-friendly.

Test-suite benefits:

- Regression protection for all three contracts: the structural lint pins the
  header convention, the ASCII byte discipline, the forbidden patterns, and
  A's explicit-pin + bounded-prompt discipline; the B/C smoke tests pin the
  exact stdout contracts (including CRUD id equality and the 404 parse).
- Port-hygiene verification: every subprocess test asserts its port is free
  before and after, so a leaked server (failed `server.close()`) fails the
  suite instead of silently polluting the next run.
- No-hang proofs: C is proven to terminate inside 40 s and the provider gate
  inside 90 s; a hang kills the subprocess and FAILs loudly.
- The provider path is optional and gated (`RUN_PROVIDER_TESTS=1`), so the
  default suite is deterministic and credential-free.
- Evidence chain: README run instructions -> LIVE_RUN_EVIDENCE.md verdicts ->
  `agents.test.ts` assertions; `bun test` is the review's re-run baseline.

## Freshness footer

<!-- freshness: sdk=1.18.18 cli=1.18.x access=2026-08-18 -->