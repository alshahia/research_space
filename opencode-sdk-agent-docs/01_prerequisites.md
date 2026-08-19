# Prerequisites

<!-- freshness: sdk=1.18.18 cli=1.18.x access=2026-08-18 -->

This file walks the reader from a clean Node 22+ host to a state where every later recipe (`02_quickstart.md`, `05_lifecycle.md`, `09_examples.md`, and the rest) can run end-to-end against an `opencode` binary that matches the dossier pin. Nothing here talks to a provider -- all of the checks are auth-free and side-effect-free on the global config: PATH lookups, version strings, and a single local `GET /global/health` against an embedded server.

## What the dossier assumes

- **SDK package version**: `@opencode-ai/sdk@1.18.18` (MIT, ESM, single runtime dep `cross-spawn`) [S17].
- **Local CLI**: any `opencode` build on the 1.18.x line. The pinned value for the live-validation phase is `1.18.3`; the dossier does NOT treat any 1.18.x CLI as compatible a priori -- observed compatibility is determined by the `global.health()` probe and the auth-free calls later in the dossier. The skew between CLI `1.18.3` and SDK `1.18.18` is recorded as the coordinate label `same-minor-patch-delta-15`, which is a position description, not a compatibility verdict [S3][S17].
- **Runtime**: Node 22+ (the SDK's `tsconfig` references `@tsconfig/node22`). Bun, `npm`, and `pnpm` all work; the dossier's verification recipes use `bun run` because the SDK ships with bun scripts [S17].

## Install the `opencode` CLI binary

The SDK requires the `opencode` binary on `PATH`. The SDK does NOT bundle it; `bin/sh: opencode: command not found` from `cross-spawn` will surface as a generic spawn error wrapped by the server's process error handler. Pick one install method [S3]:

- **npm (cross-platform)**: `npm install -g opencode-ai@latest`. Easiest path on any Node-equipped host.
- **brew (macOS / Linux)**: `brew install opencode`. Maintained as a Homebrew formula.
- **choco (Windows)**: `choco install opencode`. Maintained as a Chocolatey package; `scoop install opencode` is the equivalent for Scoop users.
- **mise (cross-tool version manager)**: `mise use opencode`. Useful when the host already runs mise for other toolchains; `mise` lets you pin a specific CLI version per project (for example `mise use opencode@1.18.3`) and switch with `mise shell` or a per-directory `.tool-versions` file.
- **curl script (Linux / macOS)**: a single-line installer is documented on the OpenCode main docs page. Use this only when none of the above are available.

Pick the method that matches your host. Do NOT install multiple `opencode` binaries side-by-side; the SDK calls whichever one resolves first on `PATH`. If you need a pinned version for a project, use `mise` or a `package.json` constraint; the dossier pins the SDK at `1.18.18` and treats the CLI version as best-effort.

## When you cannot install the CLI on the local host

Some hosts are locked down (read-only `$PATH`, no admin rights, no outbound HTTP from the package manager). In that case this dossier is not the right starting point -- the SDK always shells out to the binary via `cross-spawn`, and there is no "SDK without the CLI" mode. Options to consider:

- **Containerized CLI**: run the opencode binary inside a Docker container and forward the loopback port. The SDK on the host then points at the forwarded port via `createOpencodeClient({ baseUrl })` from `02_quickstart.md`. The dossier treats this as a Path B (existing-server) topology; consult `05_lifecycle.md` once it lands for the directory-header implications of a forwarded port.
- **Remote dev box**: open an SSH shell on a box where you have install rights, install the CLI there, and have your agent on the laptop connect via the existing-server path. The dossier treats this as Path B again.
- **Wait for a different host**: if neither of the above works, the dossier does not help. Try again on a host where one of the install methods listed above is available.

Do not paste the binary contents into your project, do not vendor the CLI source, and do not try to reimplement the server. The dossier assumes a real CLI on `PATH`; if the install methods above are unavailable, the answer is "unblock one of them", not "bypass the SDK".

## Confirm the binary is on PATH

After install, run:

```sh
opencode --version
```

Expected output on this dossier's pin: a string starting with `1.18.` (the live-validation phase records the exact value). If you see `command not found`, see the troubleshooting table below. If you see a version on a different major line (for example `0.x` or `2.x`), re-check the install command -- a stray older binary from a prior install is the most common cause.

## Install the SDK package

The SDK is published as `@opencode-ai/sdk` on npm. Install it locally where your agent lives:

```sh
# bun
bun add @opencode-ai/sdk@1.18.18
# npm
npm install @opencode-ai/sdk@1.18.18
# pnpm
pnpm add @opencode-ai/sdk@1.18.18
```

The package is ESM-only and has one runtime dependency (`cross-spawn`) [S17]. TypeScript users can import it under `moduleResolution: "Node16"` or `"Bundler"` with `target: "ES2022"`; the SDK targets Node 22+ in its own `tsconfig`.

## Confirm the SDK resolves and matches your expected import path

```ts
import { createOpencode } from "@opencode-ai/sdk";
// v1 is the default import [S17].
//
// For v2, import explicitly from the subpath:
import { createOpencode as createOpencodeV2 } from "@opencode-ai/sdk/v2";
```

If your build complains that `@opencode-ai/sdk` cannot be resolved, check that your package manager installed it (look for `node_modules/@opencode-ai/sdk/package.json` and confirm `"version": "1.18.18"`).

## Record the version skew before the first call

A pinned SDK and a pinned CLI can drift apart. Record the skew early so a future "why did this break" is one grep away. The dossier's wording is `same-minor-patch-delta-15` for CLI `1.18.3` against SDK `1.18.18` (same major `1`, same minor `18`, patch delta `15`); that label does NOT assert semver compatibility -- it is just a coordinate pair that goes into the evidence file.

```ts
import { execFileSync } from "node:child_process";

const cli = execFileSync("opencode", ["--version"], { encoding: "utf8" }).trim();
const sdk = (await import("@opencode-ai/sdk/package.json", { with: { type: "json" } }))
  .default.version as string;

console.log({ cliVersion: cli, sdkVersion: sdk });
// On the pinned host the output should look like:
//   { cliVersion: "1.18.3", sdkVersion: "1.18.18" }
// The label for this combination is "same-minor-patch-delta-15".
// Observed compatibility is determined by the global.health() probe below.
```

Runner note: the `with: { type: "json" }` import-attribute form requires Node 22+ or a current Bun/tsx build. Older runners may need their own supported JSON-import form. If the snippet fails on your runner, swap to that runner's documented form rather than rewriting the dossier.

If your `cli` and `sdk` majors differ (for example `2.x` versus `1.x`) the dossier treats that as a hard skew -- the v2 HTML-response guard fires on every call against a v1 server, and the v1 client silently returns v1-only event types against a v2 server [S10].

## Probe the server with `global.health()`

Before any real call, do a version probe. This is the canonical "is my SDK version actually compatible with the running server" check. The endpoint returns `{ healthy: true, version: string }` and requires no authentication on the default loopback bind [S2].

```ts
import { createOpencodeClient } from "@opencode-ai/sdk";

const client = createOpencodeClient({ baseUrl: "http://127.0.0.1:4096" });
const health = await client.global.health();
console.log(health.data);
// => { healthy: true, version: "1.18.x" }
```

If you have not yet started `opencode serve`, the probe will reject with `ECONNREFUSED`; start the server with `opencode serve --port 4096` (default hostname `127.0.0.1`) and re-run.

The probe does NOT mutate state; it is safe to call once at agent boot and ignore the response except as a version-skew signal. Record both the SDK package version (above) and the server `version` from the probe into the same log line. If the two differ, see the troubleshooting table.

## Environment and runtime prerequisites

- **Node 22+.** Older Node builds typecheck-fail on the SDK; they will still run the published `dist` for trivial cases but error during a real `tsx` session. Use `node --version` to confirm.
- **One of `bun`, `npm`, `pnpm` on PATH.** The dossier's examples are written for `bun run`. If you must use `tsx` or `node --experimental-strip-types`, the import statement does not change -- only the runner does.
- **A free loopback TCP port.** The default is `4096`; the live-validation phase picks a planner-approved unique loopback port via stdlib so it never assumes `4096` is free. For a one-shot recipe, run `opencode serve --port 4096` and stop any earlier server first.
- **Network access to the OpenCode server.** Loopback by default -- no outbound network is required for `createOpencode` or `client.global.health()`. Real model calls (later files) require outbound network and a configured provider; both are out of Phase 3A scope.

## Secure provider-presence guidance

The dossier never reads, prints, copies, exports, or stores any credential. It never names an auth-file path, never parses one, never chmods one, never stats one. If your agent needs to confirm a provider is configured, use the CLI's built-in listing (which redacts the key) -- this is the only provider-presence check the dossier recommends:

```sh
opencode providers list
# Expected: a list of provider IDs. The first match for Zen looks like:
#   opencode                  openai-compat        OpenCode Zen [api]
#   opencode                  openai-compat        OpenCode Zen [oauth]
# The key is never printed. Do not paste the key into a file, a script,
# an environment variable dump, or this dossier.
```

If `opencode providers list` returns nothing for Zen, your agent should treat the Zen provider as not configured and stop; do not fall back to a paid model, do not read the global config file, do not set environment variables from outside this dossier. The bounded live-validation matrix in Phase 3E2 documents `SKIP-NotConfigured` as the official verdict for that case.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `opencode: command not found` after install | install completed but PATH did not refresh; or a different shell is running | open a new shell; on POSIX verify `which opencode`; on Windows re-launch the terminal after `choco` / `scoop` |
| `opencode --version` returns a `0.x` or `2.x` string | an older or newer binary is shadowing the install | `which -a opencode` (POSIX) or `where opencode` (Windows); remove the stray binary; re-install |
| `Cannot find module '@opencode-ai/sdk'` at import time | `package.json` does not list the SDK, or the install was scoped to the wrong directory | verify `node_modules/@opencode-ai/sdk/package.json` exists; re-run `bun add @opencode-ai/sdk@1.18.18` in the project root |
| SDK reports `1.18.18` but `global.health()` reports a different major | version skew between SDK and server | align both: install the matching CLI version, or pin the SDK to the CLI's major; record the skew as `version_skew: <label>` -- the dossier does NOT claim compatibility |
| `Error: Request is not supported by this version of OpenCode Server (Server responded with text/html)` | v2 client against a v1 server, or vice versa | re-verify the version probe above; switch import path (`@opencode-ai/sdk/v2` versus `@opencode-ai/sdk`) to match the server version |
| `Timeout waiting for server to start` from `createOpencode` | binary missing, port collision, or 5000 ms default too short on a cold host | confirm `opencode --version` works; ensure the port is free on `127.0.0.1`; pass `timeout: 30000` to `createOpencode` for production agents |
| `ECONNREFUSED 127.0.0.1:<port>` from `createOpencodeClient` | `opencode serve` was not started, or was started on a different host or port | start `opencode serve --port <port>` and re-run; confirm with `opencode --version` on the same shell |

## Freshness footer

sdk=1.18.18 cli=1.18.x access=2026-08-18
