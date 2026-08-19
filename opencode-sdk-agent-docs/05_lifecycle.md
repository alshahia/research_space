# Server lifecycle ownership

<!-- freshness: sdk=1.18.18 cli=1.18.x access=2026-08-18 -->

This file is for an agent that owns the OpenCode server process. It covers spawn defaults, explicit port selection, startup timeout, abort propagation, configuration injection, project-directory routing, and shutdown evidence. Read [`01_prerequisites.md`](01_prerequisites.md) before using the lifecycle recipe and [`02_quickstart.md`](02_quickstart.md) for the smaller embedded and existing-server recipes.

Every factual SDK claim below resolves to the canonical research ledger. The future authoritative mirror is [`99_sources.md`](99_sources.md). Until that planned file lands, use the ledger in [`../share/notes/01_research_T-2026-08-18-001.md`](../share/notes/01_research_T-2026-08-18-001.md).

## Ownership rule

Use `createOpencode()` when the caller owns both halves of the lifecycle:

1. The SDK spawns `opencode serve`.
2. The SDK parses `opencode server listening on <url>` from child stdout.
3. The SDK creates a client pointed at that URL.
4. The caller receives `{ client, server }`.
5. The caller uses `server.close()` in `finally`.

The combined factory is the shortest correct path for a daemon, worker, or test harness that must not depend on somebody else's server [S1][S6][S8]. If another process owns the server, use `createOpencodeClient({ baseUrl, directory })` instead and never close that external process.

## Source-verified spawn defaults

| Option | Source-verified behavior | Production rule | Citation |
|---|---|---|---|
| `hostname` | Defaults to loopback `127.0.0.1` | Keep loopback unless [`06_security.md`](06_security.md) has been applied first | [S1][S8] |
| `port` | Defaults to `4096` in the researched v1.18.18 server source | Pass an explicit free high port when collision isolation matters | [S1][S8] |
| `timeout` | Defaults to `5000` ms while waiting for the listening URL | Use `30000` ms for cold production starts | [S1][S8] |
| `signal` | Accepts an `AbortSignal` for cancellation | Bind process signals to one `AbortController` | [S1][S8][S14] |
| `config` | Accepts a `Config` object and serializes it into the spawn environment | Validate against the pinned `Config` type before setting fields | [S1][S8][S11] |

### Random port and `port: 0` policy

The source-grounded default for this dossier is `4096`, not a random port [S1][S8]. The refined plan requires a unique loopback port for the later harness, but it also forbids treating `port: 0` as OS-assigned without verification against the pinned generated/source surface.

`port: 0` behavior is not verified in the canonical research ledger. Do not claim that it returns a random or ephemeral port in v1.18.18. For this docs-only phase, use one of these safe choices:

- Let a trusted launcher select an explicit free high loopback port, then pass that number to `createOpencode()`.
- Use `4096` only when the owner has already established that it is free.
- If a future writer verifies `port: 0` against the pinned server source, update this section and record the actual bound port.

The relevant option shape is otherwise verified, but the zero-port behavior is not. `Body shape unverified -- revalidate against types.gen.ts` before publishing a harness that depends on automatic port assignment.

## Minimal owned-server recipe

This snippet starts a local server, performs an auth-free health call, and closes only the server it owns. It does not invoke a provider.

```ts
// Save as lifecycle-owned.ts and run with a supported TypeScript runner.
import { createOpencode } from "@opencode-ai/sdk";

const abort = new AbortController();
const stop = () => abort.abort();

process.once("SIGINT", stop);
process.once("SIGTERM", stop);

let server: Awaited<ReturnType<typeof createOpencode>>["server"] | undefined;
let closeRequested = false;
let closeCompleted = false;

try {
  const opened = await createOpencode({
    hostname: "127.0.0.1",
    port: 47831, // explicit free loopback port selected by the owner
    timeout: 30000,
    signal: abort.signal,
  });

  server = opened.server;
  const health = await opened.client.global.health();

  console.log("server url:", server.url);
  console.log("healthy:", health.data?.healthy === true);
} finally {
  process.removeListener("SIGINT", stop);
  process.removeListener("SIGTERM", stop);

  if (server) {
    closeRequested = true;
    await server.close();
    closeCompleted = true;
  }

  console.log({ closeRequested, closeCompleted });
}
```

The explicit port in the snippet is an example placeholder, not a reserved or guaranteed-free port. Replace it with a free high loopback port chosen by the process that owns the run.

## Startup state machine

Treat spawn as a small state machine instead of a single opaque promise.

| State | Evidence | Owner action |
|---|---|---|
| `starting` | `createOpencode()` has been called but no URL has returned | Keep the startup deadline active |
| `listening` | The factory resolved and `server.url` is non-empty | Record the URL and begin health probing |
| `ready` | `client.global.health()` returned `healthy: true` | Admit normal work [S2] |
| `startup-timeout` | Factory rejected after `options.timeout` | Check binary availability, port collision, and cold-start budget [S8] |
| `exited-before-ready` | Child exited before the listening URL was captured | Treat as a startup failure, not a healthy shutdown [S8] |
| `closing` | Owner entered `finally` and called `server.close()` | Reject new work and wait for close completion |
| `closed` | `server.close()` resolved | Mark owned cleanup complete |

The SDK does not expose a verified public `shutdownMode` field. Do not invent one. Keep the owner-side booleans or structured log fields shown above when a later audit must distinguish an expected close from an unexpected exit.

## Timeout policy

The default `5000` ms startup timeout is a development default, not a production recommendation [S1][S8]. A cold Windows host, a loaded machine, or a server that initializes many providers can take longer.

Use this policy:

- Local warm loop: `timeout: 5000` is acceptable.
- Long-lived agent: start with `timeout: 30000`.
- CI or heavily loaded host: choose a measured bound and record it.
- Never remove the timeout entirely.
- Never retry an unknown startup failure in a tight loop.
- A second attempt is justified only after the owner has resolved the first failure class.

A timeout means the expected listening line was not observed in time. It does not prove that the port was the cause. The complete troubleshooting matrix is planned for [`10_known_issues_and_troubleshooting.md`](10_known_issues_and_troubleshooting.md).

## Abort signals and `bindAbort`

`ServerOptions.signal` is the public cancellation input [S1][S8]. The SDK process helper uses `bindAbort` to bind an `AbortSignal` to child-process termination [S14]. `bindAbort` is an internal lifecycle helper in the researched source, not an API this dossier tells callers to import.

The owner should:

1. Create one `AbortController` per owned server.
2. Connect `SIGINT`, `SIGTERM`, job cancellation, or request cancellation to `controller.abort()`.
3. Pass `controller.signal` into `createOpencode()`.
4. Still call `server.close()` from `finally` after the factory resolves.
5. Remove process listeners during cleanup so repeated harness runs do not accumulate handlers.

Signal handling has two timing cases:

| Timing | Expected handling |
|---|---|
| Signal aborts before the listening URL is observed | Spawn rejects or is cancelled; no client should be admitted |
| Signal aborts after the factory resolves | Owner stops new work and executes the normal `finally` close path |

Do not use an abort signal as a substitute for `finally`. Cancellation tells the work to stop; `finally` records and completes the cleanup obligation.

## `OPENCODE_CONFIG_CONTENT` channel

The inline `config` option is JSON-serialized into `OPENCODE_CONFIG_CONTENT` for the spawned server [S8][S11]. This is a spawn-time transport channel. It is not a second configuration schema.

| Question | Rule |
|---|---|
| Who builds the value? | The SDK serializes the `config` object supplied to the server factory [S8][S11] |
| Which fields are valid? | The pinned `Config` type is canonical [S1] |
| May callers log the serialized value? | No; log only whether a config object was supplied |
| May callers free-type undocumented fields? | No; `Body shape unverified -- revalidate against types.gen.ts` |
| When does it take effect? | At child-process spawn time [S8][S11] |

A minimal typed shape uses an empty object and lets the server merge its normal defaults:

```ts
import { createOpencode, type Config } from "@opencode-ai/sdk";

const config: Config = {};
const { client, server } = await createOpencode({
  hostname: "127.0.0.1",
  port: 47831,
  timeout: 30000,
  config,
});

try {
  await client.global.health();
} finally {
  await server.close();
}
```

Do not set the channel manually when `config` already expresses the desired typed input. One source of configuration is easier to audit than two.

## Windows process-tree cleanup

On Windows, process cleanup must cover the child and its descendants. The researched SDK helper uses this command shape [S14]:

```bat
taskkill /pid <pid> /T /F
```

Meanings:

- `/pid <pid>` scopes cleanup to the recorded child PID.
- `/T` includes descendants in the child process tree.
- `/F` forces termination when graceful exit does not complete.

Use the PID that the owning launcher recorded. Never enumerate and terminate every process with the same executable name. Never apply the command to a PID the current owner did not spawn.

For normal SDK use, call `await server.close()` and let the SDK select the platform implementation [S14]. The explicit command is a documented last-resort or custom-launcher primitive for a caller that already owns and records the child PID.

## Detect clean close versus process-tree kill

The public server handle does not expose a verified kill-reason enum. Detect the path with owner-side evidence rather than an invented SDK field.

| Outcome label | Evidence required | Interpretation |
|---|---|---|
| `owned-close-complete` | Close was requested and `server.close()` resolved | Normal owner cleanup completed |
| `abort-before-ready` | Abort signal fired before the factory returned a server handle | Startup cancellation, not a clean running-server close |
| `unexpected-exit` | The server became unavailable before a close request | Failure; preserve the first error |
| `tree-kill-invoked` | The owning launcher explicitly ran the PID-scoped Windows command | Forced cleanup path |
| `cleanup-unverified` | No close result and no owned-PID exit evidence | Do not declare success |

The later live-validation file, [`11_live_validation.md`](11_live_validation.md), is planned to record actual PIDs and cleanup evidence after its mandatory review gate. Do not infer that future result here.

## Directory routing with `directory`

`createOpencodeClient({ directory })` URL-encodes the project root into the `x-opencode-directory` request header [S7]. The v1 interceptor promotes the directory value for GET and HEAD routing so the server resolves the request against the intended project [S7].

```ts
import { createOpencodeClient } from "@opencode-ai/sdk";

const client = createOpencodeClient({
  baseUrl: "http://127.0.0.1:47831",
  directory: "/absolute/path/to/project",
});

const current = await client.project.current();
const resolved = await client.path.get();

console.log({
  hasProject: Boolean(current.data),
  hasResolvedPath: Boolean(resolved.data),
});
```

Rules for the owner:

- Set `directory` once when constructing a client for one project.
- Create separate clients when concurrent workers target different project roots.
- Do not log a project root unless the log destination is approved for that path.
- Call `project.current()` or `path.get()` before file mutations when project selection matters [S2].
- For v2 workspace routing, consult the delta in [`04_api_map.md`](04_api_map.md); do not mix v1 and v2 routing assumptions [S10].

## Shutdown checklist

Before marking an owned server run complete, verify:

- Startup used loopback unless the security file was applied first.
- The actual explicit port was recorded.
- New work stopped before cleanup began.
- The abort listener was removed.
- `server.close()` ran in `finally`.
- Close completion or forced cleanup was recorded with one of the labels above.
- Any Windows forced cleanup used only the recorded owned PID.
- No process-name-wide cleanup was attempted.
- No provider call was required to establish lifecycle success.

## Failure routing

| Symptom | First classification | Next file |
|---|---|---|
| Listening URL never appears | Spawn timeout or early exit | [`07_errors.md`](07_errors.md) |
| Connection fails after a URL was returned | Unexpected exit or wrong port | [`07_errors.md`](07_errors.md) |
| Non-loopback exposure is required | Security gate not yet satisfied | [`06_security.md`](06_security.md) |
| Directory resolves the wrong project | Client routing configuration error | [`04_api_map.md`](04_api_map.md) |
| SSE remains open during shutdown | Subscription cleanup issue | [`08_events.md`](08_events.md) |
| Root cause remains unclear | Use the planned troubleshooting matrix | [`10_known_issues_and_troubleshooting.md`](10_known_issues_and_troubleshooting.md) |

## Version note

This file is pinned to SDK `1.18.18` and CLI `1.18.x`. If the local coordinates are CLI `1.18.3` and SDK `1.18.18`, record `same-minor-patch-delta-15`; that label does NOT claim compatibility from semver alone. Observe compatibility through the health probe and owned lifecycle evidence.

## Freshness footer

sdk=1.18.18 cli=1.18.x access=2026-08-18
