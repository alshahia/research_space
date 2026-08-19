# Quickstart

<!-- freshness: sdk=1.18.18 cli=1.18.x access=2026-08-18 -->

This file ships two 5-minute recipes for the OpenCode SDK: Recipe A for an agent that owns its own server lifecycle (`createOpencode()`), Recipe B for an agent that connects to an `opencode serve` someone else is already running (`createOpencodeClient({ baseUrl, directory })`). Both run as a single `bun run` against an installed SDK and CLI from [`01_prerequisites.md`](01_prerequisites.md); neither recipe executes a model call, so neither needs a configured provider credential.

The recipes stop short of an actual `session.prompt`. A prompt example is included in the embedded recipe to show the explicit-model pattern, but it is labelled **expected -- not live-verified** and the live-call validation is deferred to [`11_live_validation.md`](11_live_validation.md) (Phase 3E2). Picking up the model call correctly is one of the points where research showed agents trip (silent default-model selection); the next file, [`03_decision_guide.md`](03_decision_guide.md), documents the full rule.

The reading order is strict: read [`01_prerequisites.md`](01_prerequisites.md) first so the CLI install and PATH check are already done. Both recipes assume Node 22+, `bun` (or `tsx` / `node --experimental-strip-types`), `@opencode-ai/sdk@1.18.18`, and `opencode --version` returning a `1.18.x` string on `PATH` [S1][S3][S17].

## Recipe A -- Embedded server with `createOpencode()`

Use this recipe when the agent is a long-lived process that owns the server lifecycle -- it spawns, recycles, and tears down its own `opencode serve`. The same call returns `{ client, server }`; the server carries a `.url` and a `.close()` for the harness to call, and the client carries the namespaces the rest of the dossier covers [S1][S6][S8].

### Prerequisites

Before pasting this recipe, the host must satisfy every line in [`01_prerequisites.md`](01_prerequisites.md):

- `opencode --version` returns a `1.18.x` string.
- `@opencode-ai/sdk@1.18.18` resolves from the project root (`node_modules/@opencode-ai/sdk/package.json` shows `"version": "1.18.18"`).
- A free loopback TCP port (the SDK default is `4096`; if it is busy pick another high port and pass it as `port`).

If any of those checks fail, see the troubleshooting table at the bottom of [`01_prerequisites.md`](01_prerequisites.md) for the matching symptom and fix.

### Imports

```ts
import { createOpencode } from "@opencode-ai/sdk";
// v1 is the default; the v2 subpath adds a richer event stream and
// workspace routing but is not the focus of this recipe [S17].
// For v2: import { createOpencode } from "@opencode-ai/sdk/v2";
```

### Lifecycle ownership

The `createOpencode({ ... })` call returns `{ client, server }`. Ownership in this recipe:

- **Owned by the recipe:** the spawned `opencode serve` subprocess reachable at `server.url`; abort the spawn with `AbortSignal`; call `server.close()` in a `finally` block to reap the process tree.
- **Not owned by the recipe:** the user's saved provider credentials, the user's `~/.config/opencode/` config, the SDK package -- those are read by `cross-spawn` inside `createOpencodeServer` and never replicated or echoed back [S4][S8].
- **Defaults that matter:** hostname `127.0.0.1`, port `4096`, startup timeout `5000` ms -- production agents should pass an explicit `timeout: 30000` because cold-start with many providers can take longer than 5 seconds [S1][S8].

### Runnable snippet (no model call)

```ts
// Save this as `quickstart-embedded.ts` at the project root and run `bun run quickstart-embedded.ts`.
import { createOpencode } from "@opencode-ai/sdk";

const { client, server } = await createOpencode({
  hostname: "127.0.0.1",
  port: 4096,           // pick a free port if 4096 is busy
  timeout: 30000,       // 5s default is too short for cold start; see [S1][S8]
});

try {
  // Auth-free call: create a session record without sending any prompt.
  // No model is invoked here; the server stores the session metadata locally.
  const created = await client.session.create({
    body: { title: "Quickstart-A" },
  });

  console.log("session id:", created.data?.id);
  console.log("parent id :", created.data?.parentID ?? "(none)");
  console.log("server url:", server.url);

  // OPTIONAL: the prompt call shape. NOT executed by this recipe -- the
  // exact response shape is not verified end-to-end in Phase 3B; live
  // validation is recorded in 11_live_validation.md after the 3E1 am-review PASS.
  //
  // await client.session.prompt({
  //   path: { id: created.data.id },
  //   body: {
  //     model: { providerID: "opencode", modelID: "deepseek-v4-flash-free" },
  //     parts: [{ type: "text", text: "Return JSON {\\\"answer\\\":\\\"ok\\\"}" }],
  //     // Optional structured-output block; see [S1] for the json_schema shape.
  //     // format: {
  //     //   type: "json_schema",
  //     //   schema: { type: "object", properties: { answer: { type: "string", maxLength: 16 } }, required: ["answer"], additionalProperties: false },
  //     // },
  //   },
  // });
} finally {
  // server.close() resolves once the child + descendants have exited. On
  // Win32 the SDK uses taskkill /pid /T /F (process-tree force) [S14].
  await server.close();
}
```

### Expected result shape

`client.session.create({ body: { title: "Quickstart-A" } })` returns a result tuple `{ data, error, response, request }` because the client defaults to `responseStyle: "fields"` [S7][S13]. On success:

- `data` is the created session record. Research verified the field set as `{ id, parentID?, title, ... }`; deeper session fields (`messageCount`, `createdAt`, `shareURL`, etc.) are not asserted from research -- consult `types.gen.ts` for the canonical field set before relying on any not-listed field [S1][S15].
- `error` is `undefined` on success.
- `response` and `request` are the underlying fetch objects; useful only when debugging, not in production code.

The literal `console.log` output on the pinned host looks like:

```
session id: <uuid-ish string, length 20-40>
parent id : (none)
server url: http://127.0.0.1:4096/
```

### Error handling

Without `throwOnError`, the recipe never throws on a 4xx/5xx -- the `error` slot in the result tuple holds the error object and `data` is `undefined`. With `throwOnError: true`, the SDK wraps the error into a real `Error` whose message is the most informative string available (`.data.message`, `.message`, or a derived `METHOD URL -> status statusText`) and attaches `{ body, status }` under `.cause` [S13]. The recipe does not enable `throwOnError` because all three calls are auth-free in the snippet above; enable it once real model calls are added.

Failure modes the recipe handles implicitly:

- `Timeout waiting for server to start` -- the SDK aborts and rejects when the listening URL is not observed within `options.timeout` ms. Increase to `timeout: 30000` for production agents and confirm the port is free on `127.0.0.1` [S1][S8].
- `ECONNREFUSED 127.0.0.1:<port>` -- the server exited before the URL was captured or never started. Confirm `opencode --version` works and `opencode serve --port <port>` is reachable on the same shell [S8].
- `bin/sh: opencode: command not found` (POSIX) / equivalent on Windows -- the SDK shells out via `cross-spawn` and surfaces the OS error wrapped by the server's process error handler. Re-run the install steps in [`01_prerequisites.md`](01_prerequisites.md) [S8].

### Cleanup

`await server.close()` is called inside the `finally` so the spawned `opencode serve` is reaped whether or not the body succeeded. The same call runs whether the agent is on POSIX or Windows; the SDK dispatches `taskkill /pid /T /F` automatically on Win32 [S14]. Do NOT substitute `process.kill(server.pid)` on Windows -- it leaves descendant processes orphaned.

### Smallest validation

Run:

```sh
bun run quickstart-embedded.ts
```

PASS when:

- Exit code is `0`.
- A non-empty `session id:` line is printed.
- The `server url:` line prints `http://127.0.0.1:4096/` (or the explicit port passed in `port: <n>`).
- After the run, `opencode` is no longer listening on the bound port (`Get-Process opencode` is empty OR `lsof -i :4096` returns nothing).

The `client.session.create` call is auth-free -- no provider credential is needed -- so PASS does not require any provider configured.

### Pin the explicit model before sending any prompt

The prompt body in the commented-out block above carries `model: { providerID: "opencode", modelID: "deepseek-v4-flash-free" }` deliberately [S1]. Sending a `session.prompt` without this block lets the server silently pick the user's saved default model, which is almost never what an agent wants and is one of the research-flagged anti-patterns ([`03_decision_guide.md`](03_decision_guide.md) covers the rule).

### Version note

This recipe is pinned to the dossier pin: SDK `@opencode-ai/sdk@1.18.18`, CLI on the `1.18.x` line. CLI `1.18.3` and SDK `1.18.18` share major `1`, minor `18`, with patch delta `15`; the dossier labels this `same-minor-patch-delta-15` and explicitly does NOT claim compatibility from semver alone. Observed compatibility in this recipe is determined by the spawn succeeding, the `session.create` call returning a session id, and `server.close()` resolving -- all of which are local, auth-free checks. Do NOT extend to a real provider call until the `global.health()` probe passes and the live-validation phase 3E1 confirms the broader surface.

## Recipe B -- Existing server with `createOpencodeClient({ baseUrl, directory })`

Use this recipe when the agent connects to an `opencode serve` somebody else started -- a long-running development server, a teammate's workstation, a Docker container, or a remote dev box behind an SSH tunnel. The agent does not own the process, so there is no `server.close()` and no `finally` beyond normal resource cleanup.

### Prerequisites

- An `opencode serve` instance already running on a known `baseUrl`. Start one for testing with `opencode serve --port 4096 --hostname 127.0.0.1` from a second shell; the listening URL is printed to that shell's stdout on the line `opencode server listening on <url>` [S2][S8].
- `@opencode-ai/sdk@1.18.18` installed in the project that owns this client.
- `directory` set to the project root the agent should target. The header `x-opencode-directory` is sent on every GET/HEAD and the server uses it to resolve the right project workspace; on `POST/PATCH/DELETE` the SDK promotes the same value to the `?directory=` query parameter [S7].

### Imports

```ts
import { createOpencodeClient } from "@opencode-ai/sdk";
// v1 default; for v2 the workspace routing uses an experimental_workspaceID config.
```

### Lifecycle ownership

The recipe does NOT own a process. The boundaries are:

- **Owned by the recipe:** the HTTP client (one instance per agent; share it across requests), the configured `baseUrl` and `directory`, the optional `throwOnError` and `responseStyle` options.
- **Not owned by the recipe:** the `opencode serve` subprocess, the project working directory, the provider credentials.
- **Defaults that matter:** `responseStyle: "fields"` (returns `{ data, error, response, request }`); `directory` is URL-encoded into the `x-opencode-directory` header on GET/HEAD and the `?directory=` query on POST/PATCH/DELETE [S7][S13].

### Runnable snippet (no model call)

```ts
// Save this as `quickstart-existing.ts` and run `bun run quickstart-existing.ts`.
import { createOpencodeClient } from "@opencode-ai/sdk";

const client = createOpencodeClient({
  baseUrl: "http://127.0.0.1:4096",
  directory: "/absolute/path/to/project",
});

// 1. Health probe -- a v1 endpoint, returns { healthy, version } [S2].
const health = await client.global.health();
console.log("health:", health.data);

// 2. Auth-free: list configured providers. NO model is called; no model id is
//    required. The CLI's `opencode providers list` is a separate code path;
//    this SDK call talks to GET /config/providers and returns the same shape.
const providers = await client.config.providers();
console.log("provider count:", providers.data ? Object.keys(providers.data).length : 0);

// 3. Optional auth-free: list sessions (auth-free when no model is invoked;
//    a list does not touch a provider).
const sessions = await client.session.list();
console.log("session count:", Array.isArray(sessions.data) ? sessions.data.length : 0);
```

### Expected result shape

`client.global.health()` returns the tuple:

- `data`: `{ healthy: true, version: "1.18.x" }` when the server is reachable; `version` matches the SDK pin within the same major / minor line. If `data.healthy` is `false`, see `01_prerequisites.md` for the v1/v2 mismatch guard [S2][S10].
- `error`: `undefined` on success.

`client.config.providers()` returns the configured providers object. The literal count on the pinned host is at least 1 (the SDK install ships with the `opencode` provider row even before the user adds a real API key). The exact field names inside each provider entry come from `types.gen.ts`; the recipe only reads `Object.keys(...).length` for the count, which is safe under schema drift [S1][S2].

`client.session.list()` returns `{ data: Session[] }` on success. Use `Array.isArray(sessions.data) ? sessions.data.length : 0` rather than relying on a specific session shape.

### Error handling

The default tuple mode keeps the recipe simple. If the server is not running, `client.global.health()` rejects the underlying `fetch` and the `error` slot holds the connection error (no `data`, no `response`). Common shapes:

- `ECONNREFUSED 127.0.0.1:4096` -- server is not running, or running on a different port. Confirm with `opencode --version` on the same shell, then `opencode serve --port 4096` [S2][S8].
- `Request is not supported by this version of OpenCode Server (Server responded with text/html)` -- v2 client against a v1 server, or vice versa. The HTML-response guard fires before the body is parsed; the only fix is to switch the import path (`@opencode-ai/sdk` vs `@opencode-ai/sdk/v2`) to match the running server's major version [S10]. For the v1 default import used here, the guard is normally a no-op.

### Cleanup

There is no process to clean up -- the server belongs to someone else. The recipe only consumes a single HTTP client; the underlying `fetch` keeps a small connection-pool footprint and is GCed when the agent process exits.

### Smallest validation

Run in a second shell first:

```sh
opencode serve --port 4096 --hostname 127.0.0.1
```

Then in the project shell:

```sh
bun run quickstart-existing.ts
```

PASS when:

- Exit code is `0`.
- `health:` line shows `healthy: true, version: ...` with a `1.18.x` string.
- `provider count:` is at least `1`.
- `session count:` prints a non-negative integer (often `0` on a fresh server).

Failure modes and the matching fix from the troubleshooting table in [`01_prerequisites.md`](01_prerequisites.md) carry over verbatim.

### Pin the directory before reading or writing any file

`directory` is the only signal the SDK has for which project the request belongs to. Setting it once on `createOpencodeClient({ baseUrl, directory })` means every subsequent `find.text`, `file.read`, and `session.create` call resolves the right workspace without re-passing the path [S7]. Subpaths under the directory (e.g. `src/foo.ts`) work the same way; everything is resolved server-side.

### Version note

Same as Recipe A: SDK `1.18.18`, CLI on the `1.18.x` line, label `same-minor-patch-delta-15`, no semver compatibility claim. The `client.global.health()` probe in the snippet IS the version-mismatch detection; if the SDK pin and server version cross majors, the probe reports a `1.x` versus `2.x` mismatch and the recipe halts there [S2][S10].

## How to choose between the two recipes

| Situation | Recipe | Why |
|---|---|---|
| Long-lived agent that should not collide with a user's running `opencode serve` | A (`createOpencode()`) | The agent owns the lifecycle; `server.close()` in `finally` reaps the subprocess; `127.0.0.1:<unique-port>` keeps it off the user's port 4096 |
| Short-lived script that already has a dev server running | B (`createOpencodeClient({ baseUrl, directory })`) | No need to spawn a duplicate server; the script connects, fires one call, exits |
| Server runs on a different host or behind an SSH tunnel | B with a remote `baseUrl` | The HTTP client does not care whether `baseUrl` is loopback or remote; only the `--cors` and auth posture need to be configured on the server side [S2] |
| Worker process that needs workspace isolation per request | A (one server per worker) or B with a unique client per workspace | Pass `directory` (v1) or `experimental_workspaceID` (v2-only) to keep concurrent requests from one another's data [S7][S10] |

Both recipes use the default v1 import. Switch to `@opencode-ai/sdk/v2` only when the workspace-routing v2 feature is needed; the rest of the dossier ships `v1` first and `v2` as a delta block.

## What this file deliberately does not cover

- **Real model calls.** Both recipes stop at `session.create` and `config.providers`; the prompt example is shown but commented out because Phase 3B forbids a live provider call. Live validation lands in [`11_live_validation.md`](11_live_validation.md) after the harness is built (Phase 3E1) and after `am-review` PASS.
- **Streaming / SSE event subscription.** That is a separate file ([`08_events.md`](08_events.md) once it lands; not yet written in Phase 3B).
- **Production-grade error mapping, structured output, abort signals, Windows process-tree cleanup.** See [`05_lifecycle.md`](05_lifecycle.md), [`07_errors.md`](07_errors.md), and [`06_security.md`](06_security.md) once they land.
- **Endpoint body shapes that research did not fully verify.** The next file ([`03_decision_guide.md`](03_decision_guide.md)) is explicit about which call bodies to look up against `types.gen.ts` before relying on them.

## Next step

[`03_decision_guide.md`](03_decision_guide.md) -- what to use and what NOT to use, with citations; cross-reference table for endpoints whose exact body shape is not fully verified in the research ledger.

<!-- freshness: sdk=1.18.18 cli=1.18.x access=2026-08-18 -->
