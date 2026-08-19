# OpenCode SDK dossier

<!-- freshness: sdk=1.18.18 cli=1.18.x access=2026-08-18 -->

This folder is a documentation dossier for the OpenCode SDK (`@opencode-ai/sdk`), aimed at coding agents and LLMs that need to embed the SDK in a long-lived process or connect to an already-running OpenCode server. It is grounded in the official OpenCode docs, the published npm package metadata, the `@opencode-ai/sdk` source on `dev`, and the v1.18.x OpenAPI spec the SDK is generated from [S1][S2][S17].

## Status of this phase

This is Phase 3A -- scaffold and foundations. Only `00_README.md`, `01_prerequisites.md`, and `progress.md` exist in this folder today. The other eleven files are planned and listed in [`progress.md`](progress.md) with their target sub-phase. Do not assume the SDK behavior of an unfinished file; only the two files in this folder plus `progress.md` are guaranteed source-cited.

## Current verdict

These four verdicts are the spine of the dossier. Every later file is consistent with them.

- **Default to v1.** The official docs page documents only the v1 default import (`@opencode-ai/sdk`). An agent that writes `import { createOpencode } from "@opencode-ai/sdk"` gets v1 [S1][S17].
- **v2 is reachable via the explicit subpath `@opencode-ai/sdk/v2`.** v2 adds a richer event stream (`EventMessagePartDelta`, `EventSessionNext*`, `EventPermissionV2*`, `EventQuestionV2*`, `EventWorkspace*`), an `experimental_workspaceID` config that forwards as the `x-opencode-workspace` header, an HTML-response guard on the client, and a `data.message.user()` helper, with no public docs page yet [S17].
- **Version skew is recorded, not silently trusted.** Local CLI is on the 1.18.x line; the SDK package is `1.18.18`. The dossier reports the skew as `same-minor-patch-delta-15` and explicitly does NOT claim compatibility from semver alone. Observed compatibility is determined by the health endpoint and the auth-free calls in Phase 3E1 (not in this dossier).
- **Do not mix SDK versions with server versions without a probe.** A v2 client pointed at a v1 server throws on every call because of the HTML-response guard; a v1 client pointed at a v2 server silently returns v1-only event types. The version probe in `01_prerequisites.md` catches the skew before any first call.

## v1 baseline + v2 delta in one sentence

Treat every method, event type, and default in this dossier as v1 unless explicitly marked `(v2-only)`. The v2 surface is presented as a delta block at the end of `04_api_map.md` and as a focused comparison in `03_decision_guide.md`. If you do not need workspace routing, the v2 HTML guard, or the v2-only event names, stay on v1 -- it is what the official docs cover, what the npm `latest` tag points at, and what every existing server instance on the 1.18.x line speaks [S1][S2][S17].

## Reading map

Pick the path that matches how your agent runs.

### Path A: long-lived agent that owns the server

Your agent is a daemon or background process that starts, stops, and recycles the OpenCode server itself. Read these files in order.

1. [`00_README.md`](00_README.md) (this file) -- where you are now.
2. [`01_prerequisites.md`](01_prerequisites.md) -- install the `opencode` CLI binary and the SDK, confirm `opencode --version` matches the dossier pin, record the skew.
3. [`02_quickstart.md`](02_quickstart.md) (3B) -- recipe A: `createOpencode()` then `client.session.create()` then `client.session.prompt()` with an explicit model.
4. [`05_lifecycle.md`](05_lifecycle.md) (3C) -- spawn defaults, timeouts, abort signals, Windows process cleanup, the `x-opencode-directory` header.
5. [`06_security.md`](06_security.md) (3C) -- `OPENCODE_SERVER_PASSWORD` and `OPENCODE_SERVER_USERNAME` env vars, CORS, loopback versus non-loopback bind guidance.
6. [`07_errors.md`](07_errors.md) (3C) -- `throwOnError` trade-off, the v2 HTML-guard error string, the `StructuredOutputError` shape.
7. [`08_events.md`](08_events.md) (3C) -- SSE subscription on `GET /global/event`, v1 verified event types, v2 delta.
8. [`09_examples.md`](09_examples.md) (3D) -- nine safe recipes plus five unsafe-pattern callouts plus two verified config / provider snippets.
9. [`03_decision_guide.md`](03_decision_guide.md) (3B) -- when in doubt between the SDK, raw HTTP, the TUI binary, or v1 versus v2.
10. [`04_api_map.md`](04_api_map.md) (3B) -- single namespace map with v1 / v2 / both markers.
11. [`10_known_issues_and_troubleshooting.md`](10_known_issues_and_troubleshooting.md) (3F) -- when something breaks; brings in the live-execution findings.
12. [`11_live_validation.md`](11_live_validation.md) (3E2) -- bounded Zen primary SDK call and conditional Go backup (gated), the local-loopback raw SSE diagnostic, recorded with PID-scoped cleanup after `am-review` PASS.
13. [`99_sources.md`](99_sources.md) (3F) -- citation ledger for the dossier body.

### Path B: existing-server client

Your agent is a short-lived script or a long-running worker that connects to an `opencode serve` instance someone else already started. Read these files in order.

1. [`00_README.md`](00_README.md) (this file).
2. [`01_prerequisites.md`](01_prerequisites.md) -- PATH and version checks; you do NOT need to install the SDK if it is already in your project.
3. [`02_quickstart.md`](02_quickstart.md) (3B) -- recipe B: `createOpencodeClient({ baseUrl, directory })`.
4. [`06_security.md`](06_security.md) (3C) -- how `--cors` is set from the server, how the `directory` header is negotiated without leaking project paths.
5. [`07_errors.md`](07_errors.md) (3C) -- the same `throwOnError` trade-off and v2 HTML guard.
6. [`08_events.md`](08_events.md) (3C) -- the same SSE subscription, but only the v1 verified event set unless you have probed v2.
7. [`09_examples.md`](09_examples.md) (3D) -- recipe 2 (existing-server connection), recipe 3 (session CRUD), recipe 5 (events / SSE).
8. [`04_api_map.md`](04_api_map.md) (3B) -- when you need to find a method.
9. [`03_decision_guide.md`](03_decision_guide.md) (3B) -- when to abandon the SDK and call `opencode serve` over raw HTTP.
10. [`10_known_issues_and_troubleshooting.md`](10_known_issues_and_troubleshooting.md) (3F), [`11_live_validation.md`](11_live_validation.md) (3E2), [`99_sources.md`](99_sources.md) (3F) -- as needed.

## Scope

In scope for this dossier:

- The `createOpencode` lifecycle (one call covers server spawn plus client wiring), the `createOpencodeClient` client-only path, and the `createOpencodeServer` child-process spawn (advanced / custom).
- The full v1 namespace surface verified against the official docs and the generated client: `Global`, `Instance`, `Project`, `Path`, `Vcs`, `Config`, `Tools (Experimental)`, `Ptys`, `Auth`, `Providers`, `Files`, `Sessions`, `Commands`, `MCP`, `LSP`, `Formatter`, `TUI`.
- v2 surface as a delta block -- the v2-only event types, the HTML-response guard, the `data.message.user()` helper, and workspace routing.
- CLI install matrix (npm `opencode-ai`, brew, choco, scoop, mise), PATH check, version probe via `GET /global/health`.
- Lifecycle discipline: spawn timeouts, abort signals, Windows `taskkill /T /F`, PID-scoped cleanup.
- Security posture: `OPENCODE_SERVER_PASSWORD` and `OPENCODE_SERVER_USERNAME` env vars (server-side gate, not SDK-level), loopback default, CORS via `--cors` on the server.
- Error contract: `responseStyle: "fields"` tuple, `throwOnError: true` produces `Error` with `.cause = { body, status }`, v2 HTML guard string, `StructuredOutputError` shape.
- SSE event subscription and the v1 verified event set plus the v2 delta.
- Verified copy-pasteable TypeScript examples with safety labels and minimum-validation commands.
- Live validation in `11_live_validation.md`: a bounded Zen primary SDK call (one), a conditional Go backup SDK call (zero to one, gated on user-approved policy and a known Zen incident), and a local-loopback raw SSE diagnostic, all after `am-review` PASS on Phase 3E1.

## Non-scope

Explicitly out of scope for this dossier:

- Application source code, framework adapters, MCP servers, or plugin code that calls the SDK. This folder ships documentation, not a library.
- Provider-specific model quality, pricing comparisons, or selection recommendations. The dossier describes how to call a model, not which one to pick.
- Comparing the SDK against third-party OpenCode clients (none exist per research), raw HTTP envelopes beyond what the dossier needs to disambiguate SDK errors, or the OpenCode TUI binary internals.
- Authentication against real provider APIs with pasted keys, tokens, or passwords. The dossier never reads, copies, prints, exports, or stores any credential, never names an auth-file path, and never runs an environment-variable dump.
- Live validation of paid Zen models, "best provider for this prompt" benchmarks, or anything that touches a provider gateway outside the bounded matrix in Phase 3E2.
- Generated-types snapshots from a specific CLI build. The dossier links to `types.gen.ts` for the canonical shape and re-validates per-call where research was partial.

## Sources used in this folder

This file cites [S1] (OpenCode SDK docs page), [S2] (OpenCode Server docs page -- including the `global.health` endpoint used by the version probe in `01_prerequisites.md`), [S3] (OpenCode main docs page -- CLI install methods), and [S17] (SDK package metadata: version, license, exports map including `./v2` subpaths). The canonical mirror will be `opencode-sdk-agent-docs/99_sources.md`, written in Phase 3F. Until that file lands, every `[Sn]` here resolves to the canonical research ledger in `share/notes/01_research_T-2026-08-18-001.md ## Citation ledger`.

Context Hub (`chub`) returned no matching entry for the OpenCode SDK. Per the dispatch contract, this dossier fell back to the official OpenCode docs page and the `anomalyco/opencode` source on GitHub. That fallback is recorded in the coder summary for this phase.

## Picking a runner for the snippets in this dossier

Every code block in `01_prerequisites.md` and in the later files is written so the smallest validation is a single command: `bun run <path>`. Pick the runner that matches what is already on the host:

- `bun` is the SDK's own runtime and the shortest path on any host where bun is installed.
- `tsx <path>` is the npm equivalent and works without any bun install; pass `--tsconfig` if your `tsconfig.json` is non-default.
- `node --experimental-strip-types <path>` is the no-deps fallback for hosts that already have Node 22+ but neither bun nor tsx; strip-types is enabled by default on Node 23+.

All three runners resolve the same imports; the runtime difference is not the dossier's concern. If a snippet fails on one runner but works on another, treat that as a runner bug to file against the runner, not a dossier correction.

## Phase plan summary

| Phase | Goal | Files written |
|---|---|---|
| 3A | Scaffold and foundations | `00_README.md`, `01_prerequisites.md`, `progress.md` |
| 3B | Quickstart, decision guide, API map | `02_quickstart.md`, `03_decision_guide.md`, `04_api_map.md` |
| 3C | Lifecycle, security, errors, events | `05_lifecycle.md`, `06_security.md`, `07_errors.md`, `08_events.md` |
| 3D | Verified examples cookbook | `09_examples.md` |
| 3E1 | Harness creation, auth-free checks (zero provider calls) | harness only (outside the tracked repo) |
| 3E2 | Bounded provider execution (after `am-review` PASS on 3E1) | `11_live_validation.md` |
| 3F | Known issues, sources, final lint | `10_known_issues_and_troubleshooting.md`, `99_sources.md` |

## Freshness footer

sdk=1.18.18 cli=1.18.x access=2026-08-18
