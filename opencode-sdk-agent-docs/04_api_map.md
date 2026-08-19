# Unified API map

<!-- freshness: sdk=1.18.18 cli=1.18.x access=2026-08-18 -->

This file is the single namespace map for the OpenCode SDK. It lists every server namespace and the corresponding SDK surface, with one row per method and the matching HTTP path. Each row carries a version marker (one of `v1`, `v2-only`, `both`) plus a "purpose" line and a "notes" column for the non-obvious request/response details research surfaced. The v2-only rows live in a contiguous delta block at the end of the file so that a v1-only reader can read the file top-to-bottom without seeing a v2-only call until the very end.

Every row in this file cites at least one `[Sn]` from the canonical research ledger (`../share/notes/01_research_T-2026-08-18-001.md`). The authoritative mirror lives in [`99_sources.md`](99_sources.md) once Phase 3F lands; for now, the citation set stays closed in `[S1]..[S22]`. Context Hub (`chub`) was searched for `OpenCode SDK` and returned no matching entry; the dossier fell back to official OpenCode source (`https://opencode.ai/docs/server/`, the OpenAPI spec at `/doc`, and the `anomalyco/opencode` repo on the `dev` branch) [S2][S5][S17].

The 17 namespaces covered below match the research `## Technical findings` enumeration: Global, Instance, Project, Path, Vcs, Config, Tools (Experimental), Ptys, Auth, Providers, Files, Sessions, Commands, MCP, LSP, Formatter, TUI [S1][S2]. Within each namespace, the table lists the SDK method name and the HTTP path the server expects. Any row whose body or response shape was not fully verified by research carries a `Body shape unverified -- revalidate against types.gen.ts` note in the "notes" column. Invented shapes are explicitly disallowed.

The "version" column uses three values:

- `v1` -- the default import (`@opencode-ai/sdk`). Verified on the v1 OpenAPI surface and the v1 `types.gen.ts`.
- `v2-only` -- reachable only via the subpath `@opencode-ai/sdk/v2`. Either the surface itself does not exist in v1, or the body / header / interceptor is v2-specific.
- `both` -- the method exists in both versions with identical shape; the version tag is informational only.

When in doubt, treat a row as `v2-only` only if the cited source names a v2-specific token (a v2-only event type, the `experimental_workspaceID` config, the HTML-response guard, the `data.message.user` helper). Otherwise default to `v1` or `both`.

## Global namespace

| # | SDK method | HTTP path | Version | Purpose | Notes | Citation |
|---|---|---|---|---|---|---|
| 1 | `client.global.health()` | `GET /global/health` | both | Liveness / version probe; returns `{ healthy: true, version: string }` | First call to make at agent boot; result is a tuple `{ data, error, response, request }`. Used as the v1 vs v2 mismatch probe (compare returned `version` to SDK package version). Does NOT mutate state. | [S2] |
| 2 | `client.global.event.subscribe()` / SSE on `GET /global/event` | `GET /global/event` | both | Server-Sent Events stream of named events | The v1 client supports `@hey-api` SSE options: `onSseError`, `onSseEvent`, `sseDefaultRetryDelay`, `sseMaxRetryAttempts`, `sseMaxRetryDelay`. The v1 verified event name set is small -- see the notes column for the list. v2 adds many v2-only event names -- see the v2-delta block at the end of this file. | [S1][S2][S15][S16] |

The v1 verified event-name set is: `EventServerInstanceDisposed`, `EventInstallationUpdated`, `EventInstallationUpdateAvailable`, `EventLspClientDiagnostics`, `EventLspUpdated`, `EventMessageUpdated`, `EventMessageRemoved` [S15]. Any other event name in v1 code is not verified by research and must be revalidated against `types.gen.ts`.

## Instance namespace

| # | SDK method | HTTP path | Version | Purpose | Notes | Citation |
|---|---|---|---|---|---|---|
| 3 | `client.instance.dispose()` | `POST /instance/dispose` | both | Tear down the current server instance; returns boolean | Useful for a graceful shutdown hook in a long-lived agent. Idempotent only at the server side; the SDK does not retry. | [S2] |

## Project namespace

| # | SDK method | HTTP path | Version | Purpose | Notes | Citation |
|---|---|---|---|---|---|---|
| 4 | `client.project.list()` | `GET /project` | both | List projects known to the server | Auth-free in default deployment. Return shape not fully verified; use `Array.isArray(data)` defensively. | [S2] |
| 5 | `client.project.current()` | `GET /project/current` | both | Get the project the server currently resolves for the requesting directory | Depends on `directory` header / query; see "directory" semantics in Recipe B of [`02_quickstart.md`](02_quickstart.md) and in [`05_lifecycle.md`](05_lifecycle.md) when it lands. | [S2] |

## Path namespace

| # | SDK method | HTTP path | Version | Purpose | Notes | Citation |
|---|---|---|---|---|---|---|
| 6 | `client.path.get()` | `GET /path` | both | Return the resolved filesystem path the server is rooted at | Useful as a sanity check on `directory` negotiation. | [S2] |

## Vcs namespace

| # | SDK method | HTTP path | Version | Purpose | Notes | Citation |
|---|---|---|---|---|---|---|
| 7 | `client.vcs.get()` | `GET /vcs` | both | Get VCS (git) info for the resolved project | Returned shape not fully verified by research; assert defensively. | [S2] |

## Config namespace

| # | SDK method | HTTP path | Version | Purpose | Notes | Citation |
|---|---|---|---|---|---|---|
| 8 | `client.config.get()` | `GET /config` | both | Get the server's merged Config | Useful for a writer that wants to inspect provider rows; pairs with `client.config.providers()` for a richer view. | [S1][S2] |
| 9 | `client.config.update({ body })` | `PATCH /config` | both | Partially update the server's Config | Body shape is the subset of `Config` from `types.gen.ts`; the SDK serialises via the generated client. | [S2] |
| 10 | `client.config.providers()` | `GET /config/providers` | both | List configured providers | The CLI command `opencode providers list` reaches the same endpoint. Used in [`01_prerequisites.md`](01_prerequisites.md) secure provider-presence guidance. | [S1][S2] |

The `Config` shape and any per-field semantics come from `types.gen.ts`; the dossier does not enumerate the full field set because the SDK regenerates `types.gen.ts` on each CLI publish.

## Tools (Experimental) namespace

| # | SDK method | HTTP path | Version | Purpose | Notes | Citation |
|---|---|---|---|---|---|---|
| 11 | `client.tool.ids()` | `GET /experimental/tool/ids` | both | List the registered experimental tool IDs | Experimental surface; names can change without notice. | [S2] |
| 12 | `client.tool.list({ query: { provider, model } })` | `GET /experimental/tool` | both | Resolve tool IDs available for a given provider + model | Query is `{ provider, model }`; both are required. Returned shape is an array of tool descriptors (exact field set is in `types.gen.ts`). | [S2] |

Do NOT use this namespace as a stable public API -- "experimental" in the path is the SDK server signalling that breaking changes are allowed.

## Ptys namespace

| # | SDK method | HTTP path | Version | Purpose | Notes | Citation |
|---|---|---|---|---|---|---|
| 13 | `client.pty.list()` | `GET /pty` | both | List active ptys | Useful for a worker that wants to know which long-lived shells are open. | [S2] |
| 14 | `client.pty.create({ body })` | `POST /pty` | both | Create a pty | Body shape is in `types.gen.ts`; do not invent field names here. | [S2] |
| 15 | `client.pty.remove({ path })` | `DELETE /pty/{id}` | both | Remove a pty by id | The path parameter is the pty id. | [S2] |
| 16 | `client.pty.get({ path })` | `GET /pty/{id}` | both | Get a pty by id | Returns the pty state; the returned shape is in `types.gen.ts`. | [S2] |
| 17 | `client.pty.update({ path, body })` | `PATCH /pty/{id}` | both | Update a pty by id | Body shape in `types.gen.ts`. | [S2] |
| 18 | `client.pty.connect({ path })` | `POST /pty/{id}/connect` | both | Open a streaming connection to a pty | Returned stream is not part of the typed surface; consume defensively. | [S2] |

## Auth namespace

| # | SDK method | HTTP path | Version | Purpose | Notes | Citation |
|---|---|---|---|---|---|---|
| 19 | `client.auth.set({ path, body })` | `PUT /auth/{id}` | both | Persist provider credentials keyed by provider id | Body shape NOT fully verified; do NOT hardcode provider-credential field names. The dossier never names an auth-file path, never reads / prints / copies / parses one. The CLI's provider store is the upstream truth. | [S2] |

The auth-file path on disk is intentionally not named anywhere in this dossier; see the secure provider-presence guidance in [`01_prerequisites.md`](01_prerequisites.md).

## Providers namespace

| # | SDK method | HTTP path | Version | Purpose | Notes | Citation |
|---|---|---|---|---|---|---|
| 20 | `client.provider.list()` | `GET /provider` | both | List known providers | Auth-free. | [S2] |
| 21 | `client.provider.auth({ path, body })` | `POST /provider/{id}/auth` | both | Authorize a provider | Body shape is provider-specific and NOT fully verified. | [S2] |
| 22 | `client.provider.oauth.authorize({ body })` | `POST /provider/oauth/authorize` | both | Begin an OAuth flow for a provider | Body shape is in `types.gen.ts`; do NOT invent field names. | [S2] |
| 23 | `client.provider.oauth.callback({ query })` | `GET /provider/oauth/callback` | both | Receive an OAuth provider callback | Query parameters depend on provider. | [S2] |

All bodies for this namespace are NOT fully verified; this dossier does not include any `provider.*` recipe.

## Files namespace

| # | SDK method | HTTP path | Version | Purpose | Notes | Citation |
|---|---|---|---|---|---|---|
| 24 | `client.find.text({ query })` | `GET /find` (with `?pattern=`) | both | Search the project for a text pattern | Returns an array of matches; verified subset is `{ path, lines, line_number, absolute_offset, submatches }`. Other fields are not-verified. | [S1] |
| 25 | `client.find.files({ query })` | `GET /find/file` (with `?query=&type=&directory=&limit=&dirs=`) | both | Resolve a file path by glob or substring | Verified parameters: `query`, `type` (`"file" \| "directory"`), `directory` (override project root), `limit` (1-200). Do not assume `dirs` is honored on this server version. | [S1][S2] |
| 26 | `client.find.symbols({ query })` | `GET /find/symbol` (with `?query=`) | both | Find code symbols matching a query | Return shape is an array; do not depend on a specific symbol field set. | [S2] |
| 27 | `client.file.list({ path })` | `GET /file?path=` | both | List a directory's contents | Path is the directory path. The `path` argument must NOT contain trailing whitespace; see #43112 mitigation in [`03_decision_guide.md`](03_decision_guide.md). | [S1][S2][S19] |
| 28 | `client.file.read({ path })` | `GET /file/content?path=` | both | Read a file by path | Verified return shape: `{ type: "raw" \| "patch", content: string }`. Do not assume `metadata` or other fields. The `path` argument must be trimmed by the caller. | [S1][S19] |
| 29 | `client.file.status({ directory })` | `GET /file/status?directory=` | both | Get the VCS-tracked status of files | Return shape is `File[]`; field set is in `types.gen.ts`. | [S1][S2] |

## Sessions namespace

The Sessions namespace is the largest. The 16 verified endpoints below cover session lifecycle, message sending, sharing, permissions, summarization, and the structured-output prompt. The Sessions namespace also introduces `session.init` and `session.fork` for explicit-message flows; both bodies are partially verified -- see the notes column.

| # | SDK method | HTTP path | Version | Purpose | Notes | Citation |
|---|---|---|---|---|---|---|
| 30 | `client.session.list()` | `GET /session` | both | List all sessions known to the server | Auth-free. Return shape: `Session[]`. | [S2] |
| 31 | `client.session.status({ path })` | `GET /session/{id}/status` | both | Get the status of a single session | Useful for polling when SSE is not available. | [S2] |
| 32 | `client.session.create({ body })` | `POST /session` | both | Create a new session | Body: `{ parentID?, title? }`. Auth-free. Does NOT issue a model call. Returns the created `Session`. | [S2] |
| 33 | `client.session.get({ path })` | `GET /session/{id}` | both | Fetch one session by id | Return shape is the full `Session` record. | [S2] |
| 34 | `client.session.delete({ path })` | `DELETE /session/{id}` | both | Delete one session | Cleanup-style call; safe in a `finally` block. | [S2] |
| 35 | `client.session.update({ path, body })` | `PATCH /session/{id}` | both | Update mutable session fields (e.g. `title`) | Body is the subset of `Session` the server accepts on update. | [S2] |
| 36 | `client.session.children({ path })` | `GET /session/{id}/children` | both | List child sessions of a parent | Useful for tree-style UI; return shape is `Session[]`. | [S2] |
| 37 | `client.session.todo({ path })` | `GET /session/{id}/todo` | both | Get the session's todo list (if any) | Return shape in `types.gen.ts`. | [S2] |
| 38 | `client.session.init({ path, body })` | `POST /session/{id}/init` | both | Initialize a session for an existing message | Body: `{ messageID, providerID, modelID }` -- all three are required to pin the explicit model. | [S2] |
| 39 | `client.session.fork({ path, body })` | `POST /session/{id}/fork` | both | Fork an existing session at a given message | Body: `{ messageID? }` -- if absent, forks at the latest message. | [S2] |
| 40 | `client.session.abort({ path, body })` | `POST /session/{id}/abort` | both | Abort an in-flight prompt | Wire shape NOT fully verified; if not verified at write time, fall back to `AbortSignal.timeout(30000)` only. | [S2] |
| 41 | `client.session.unshare()` | `DELETE /session/{id}/share` | both | Revoke a session's shareable URL | Body NOT verified; do not invent. | [S2] |
| 42 | `client.session.share()` | `POST /session/{id}/share` | both | Create a shareable URL for the session | Body NOT verified. The dossier ships no recipe for this. | [S2] |
| 43 | `client.session.diff()` | `GET /session/{id}/diff` | both | Return the file diff accumulated by the session | Return shape is `File[]` or a stringified diff -- confirm with `types.gen.ts`. | [S2] |
| 44 | `client.session.summarize({ path, body })` | `POST /session/{id}/summarize` | both | Summarize a session's messages | Body NOT verified. | [S2] |
| 45 | `client.session.messages({ path })` | `GET /session/{id}/messages` | both | List the session's messages | Auth-free; does not invoke a model. | [S2] |
| 46 | `client.session.message({ path, query })` | `GET /session/{id}/message` | both | Fetch one message by id | Path is the session id; `query.messageID` selects the message. | [S2] |
| 47 | `client.session.prompt({ path, body })` | `POST /session/{id}/prompt` | both | Send a prompt to the model | Body shape: `{ model: { providerID, modelID }, parts: Part[], noReply?: boolean, format?: { type: "json_schema", schema: JSONSchema } }`. Response shape: `{ data: { info, parts }, error, response, request }`. `info.error.name === "StructuredOutputError"` is the structured-output failure surface; `parts[0].text` is the usual successful content location. No verified `max_tokens` field. `usage.*` field names NOT verified for SDK path -- mark `usage: not-verified`. | [S1][S2][S15] |
| 48 | `client.session.promptAsync({ path, body })` | `POST /session/{id}/prompt-async` | both | Send a prompt and return without waiting for the model | Same body as `session.prompt`. Combine with SSE subscription on `GET /global/event` to observe completion. | [S2] |
| 49 | `client.session.command({ path, body })` | `POST /session/{id}/command` | both | Issue a slash-command to the session | Body shape NOT fully verified -- `Body shape unverified -- revalidate against types.gen.ts`. The dossier ships no recipe for this; do not invent field names. | [S1] |
| 50 | `client.session.shell({ path, body })` | `POST /session/{id}/shell` | both | Send a shell command to the session | Body shape NOT fully verified -- `Body shape unverified -- revalidate against types.gen.ts`. | [S1] |
| 51 | `client.session.revert({ path, body })` | `POST /session/{id}/revert` | both | Revert the session's file changes | Body NOT verified. | [S2] |
| 52 | `client.session.unrevert({ path })` | `POST /session/{id}/unrevert` | both | Undo a previous revert | Path is the session id; body NOT verified. | [S2] |
| 53 | `client.session.permissions({ path, body })` | `POST /session/{id}/permissions/{permissionID}` | both | Reply to a permission prompt | Path is the session id + permission id; body carries the action set. Action set NOT fully verified. | [S2] |

## Commands namespace

| # | SDK method | HTTP path | Version | Purpose | Notes | Citation |
|---|---|---|---|---|---|---|
| 54 | `client.command.list()` | `GET /command` | both | List the slash-commands registered for the current directory | Return shape is `Command[]` or an array of descriptors; see `types.gen.ts`. | [S2] |

## MCP namespace

| # | SDK method | HTTP path | Version | Purpose | Notes | Citation |
|---|---|---|---|---|---|---|
| 55 | `client.mcp.list()` | `GET /mcp` | both | List MCP server connections | The v1.18.9 release notes "Restored compatibility with legacy MCP SDK clients" -- the MCP surface had a break-and-fix during the 1.18.x series. Pair with `types.gen.ts` before relying on a specific field name. | [S2][S21] |
| 56 | `client.mcp.add({ body })` | `POST /mcp` | both | Dynamically register an MCP server | Body shape in `types.gen.ts`. | [S2] |
| 57 | `client.mcp.auth({ path, body })` | `POST /mcp/{name}/auth` | both | Start an OAuth flow for an MCP server | Path parameter is the MCP server's registered name; body shape in `types.gen.ts`. | [S2] |
| 58 | `client.mcp.oauth.callback({ path, query })` | `GET /mcp/oauth/callback` | both | Receive the MCP OAuth callback | Query parameters depend on the upstream. | [S2] |
| 59 | `client.mcp.authStatus({ path })` | `GET /mcp/{name}/auth/status` | both | Get the current auth status for an MCP server | Return shape in `types.gen.ts`. | [S2] |
| 60 | `client.mcp.authRemove({ path })` | `DELETE /mcp/{name}/auth` | both | Remove the stored auth for an MCP server | Path parameter is the MCP server's registered name. | [S2] |

## LSP namespace

| # | SDK method | HTTP path | Version | Purpose | Notes | Citation |
|---|---|---|---|---|---|---|
| 61 | `client.lsp.status()` | `GET /lsp` | both | Return the LSP server status array (`LSPStatus[]`) | Useful for "is the language server alive" checks. | [S2] |

## Formatter namespace

| # | SDK method | HTTP path | Version | Purpose | Notes | Citation |
|---|---|---|---|---|---|---|
| 62 | `client.formatter.status()` | `GET /formatter` | both | Return the formatter status array (`FormatterStatus[]`) | Auth-free. | [S2] |

## TUI namespace

The TUI namespace on the wire drives the human-facing terminal UI. The dossier recommends SDK methods on this namespace only for a parent terminal that owns a controlling TTY; non-interactive agents must NOT call any of these directly, and there is no `createOpencodeTui()` recipe in this dossier (see [`03_decision_guide.md`](03_decision_guide.md)). The Ptys and TUI namespaces are also where the community plugins listed on the OpenCode ecosystem page -- e.g., `opencode-pty`, `opencode-shell-strategy` -- extend the official surface; the SDK methods above are the SDK-side hooks those plugins rely on [S22].

| # | SDK method | HTTP path | Version | Purpose | Notes | Citation |
|---|---|---|---|---|---|---|
| 63 | `client.tui.appendPrompt({ body })` | `POST /tui/append-prompt` | both | Append text to the TUI prompt input | Body shape in `types.gen.ts`. | [S2] |
| 64 | `client.tui.openHelp()` | `POST /tui/open-help` | both | Open the TUI help pane | No body. | [S2] |
| 65 | `client.tui.openSessions()` | `POST /tui/open-sessions` | both | Open the TUI sessions pane | No body. | [S2] |
| 66 | `client.tui.openThemes()` | `POST /tui/open-themes` | both | Open the TUI themes pane | No body. | [S2] |
| 67 | `client.tui.openModels()` | `POST /tui/open-models` | both | Open the TUI models pane | No body. | [S2] |
| 68 | `client.tui.submitPrompt()` | `POST /tui/submit-prompt` | both | Submit the currently-buffered prompt to the model | No body. The TUI itself calls the model; no explicit-model pin here. | [S2] |
| 69 | `client.tui.clearPrompt()` | `POST /tui/clear-prompt` | both | Clear the TUI prompt buffer | No body. | [S2] |
| 70 | `client.tui.executeCommand({ body })` | `POST /tui/execute-command` | both | Execute a TUI-internal command by name | Body: `{ command }`. | [S2] |
| 71 | `client.tui.showToast({ body })` | `POST /tui/show-toast` | both | Show a toast in the TUI | Body: `{ title?, message, variant }`. | [S2] |
| 72 | `client.tui.control.next()` | `GET /tui/control/next` | both | Long-poll for the next control request from the TUI | Drives the bidirectional TUI control channel; do not call from non-interactive agents. | [S2] |
| 73 | `client.tui.control.response({ body })` | `POST /tui/control/response` | both | Reply to a TUI control request | Body: `{ body }`. | [S2] |

## v2 delta block (contiguous)

The v2-only surface is presented in one contiguous block. Every row below is `v2-only`; a v1-only reader can stop reading the file at the end of the TUI namespace and skip this block.

### v2-only configuration and helpers

| # | Surface | Marker | Purpose | Notes | Citation |
|---|---|---|---|---|---|
| 74 | `experimental_workspaceID` config on `createOpencodeClient({ ..., experimental_workspaceID })` | v2-only | Forward the value as the `x-opencode-workspace` request header | Used by workspace-aware v2 server routes; the header name and the workspace-routing rule are v2-only. A v1 client ignores the option. | [S10] |
| 75 | Response interceptor `text/html` guard | v2-only | Throws `Error("Request is not supported by this version of OpenCode Server (Server responded with text/html)")` on any HTML response | Canonical signal of v1-vs-v2 mismatch; the only fix is to switch the import path. The same import path used against a misconfigured server raises this on every call. | [S10] |
| 76 | `import { data } from "@opencode-ai/sdk/v2"` then `data.message.user({ sessionID, agent, model, parts })` | v2-only | Returns `{ info: UserMessage, parts: Part[] }` with auto-filled `id`, `time`, `role: "user"` fields and per-part `id`, `sessionID`, `messageID` | Client-side convenience; the server still generates the canonical ids on receipt. The route class is `v2/gen/data.ts`; do not assume the helper exists in v1. | [S12] |

### v2-only request-side surface

| # | Surface | Marker | Purpose | Notes | Citation |
|---|---|---|---|---|---|
| 77 | `/api/` path-prefix detection: both `directory` (v1) and `experimental_workspaceID` (v2) rewrite into `?location[directory]=` form when the request targets an `/api/...` route | v2-only | Aligns a request that targets the `/api/` variant of a route with the v2 location object | Avoid hard-coding `?directory=` for v2-on-v2 routes; let the SDK rewrite. | [S10] |

### v2-only event types on `GET /global/event`

The v2 generated types file `src/v2/gen/types.gen.ts` adds many event names that are not present in v1's `src/gen/types.gen.ts`. The non-exhaustive set below is what research surfaced; the canonical list lives in `types.gen.ts` at write time [S16]:

| Event name (v2-only) | Marker | Notes | Citation |
|---|---|---|---|
| `EventMessagePartDelta` | v2-only | Streaming part-level delta; v1 emits whole `EventMessageUpdated` only | [S16] |
| `EventMessagePartUpdated` | v2-only | A part within a message was updated | [S16] |
| `EventMessagePartRemoved` | v2-only | A part within a message was removed | [S16] |
| `EventSessionNextText` | v2-only | Step-level streaming: next text chunk of the model step | [S16] |
| `EventSessionNextReasoning` | v2-only | Step-level streaming: next reasoning chunk | [S16] |
| `EventSessionNextTool` | v2-only | Step-level streaming: next tool call part | [S16] |
| `EventSessionNextShell` | v2-only | Step-level streaming: next shell output | [S16] |
| `EventSessionNextCompaction` | v2-only | Step-level streaming: next compaction chunk | [S16] |
| `EventSessionNextRevert` | v2-only | Step-level streaming: next revert state | [S16] |
| `EventSessionNextStepFinish` | v2-only | Step-level streaming: the step finished | [S16] |
| `EventPermissionV2Asked` | v2-only | Replaces v1's permission event with an explicit permission id | [S16] |
| `EventPermissionV2Replied` | v2-only | Reply to a v2 permission ask | [S16] |
| `EventQuestionV2Asked` | v2-only | V2 question ask | [S16] |
| `EventQuestionV2Replied` | v2-only | Reply to a v2 question ask | [S16] |
| `EventQuestionV2Rejected` | v2-only | Reject a v2 question ask | [S16] |
| `EventWorkspaceReady` | v2-only | Workspace is ready after directory negotiation | [S16] |
| `EventWorkspaceFailed` | v2-only | Workspace failed to initialize | [S16] |
| `EventWorkspaceStatus` | v2-only | Periodic workspace status update | [S16] |
| `EventWorktreeReady` | v2-only | A worktree finished setup | [S16] |
| `EventWorktreeFailed` | v2-only | A worktree failed to initialize | [S16] |
| `EventMcpToolsChanged` | v2-only | The MCP tool set changed | [S16] |
| `EventSessionCompacted` | v2-only | A compaction finished | [S16] |
| `EventTuiPromptAppend2` | v2-only | V2 TUI: append to prompt | [S16] |
| `EventTuiPromptSubmit2` | v2-only | V2 TUI: submit the prompt | [S16] |
| `EventTuiPromptClear2` | v2-only | V2 TUI: clear the prompt | [S16] |
| `EventTuiCommandExecute2` | v2-only | V2 TUI: execute a command | [S16] |
| `EventTuiToastShow2` | v2-only | V2 TUI: show a toast | [S16] |

Plus an unspecified but expected set of additional v2 session lifecycle events; treat any v2-only event name as `not-verified` unless it appears in this table or in `src/v2/gen/types.gen.ts`.

## Cross-namespace patterns

Some questions cut across namespaces. The patterns below name the cross-cutting fields and the canonical source for each. None of the patterns below introduce a new body shape -- they cite the same shapes the per-namespace tables already cover.

### The `directory` propagation chain

The `directory` option on `createOpencodeClient({ baseUrl, directory })` flows through every namespace in two ways:

- `GET` and `HEAD` requests carry `x-opencode-directory: <encoded>` as a request header [S7].
- `POST`, `PATCH`, and `DELETE` requests carry `?directory=<encoded>` as a query parameter [S7].
- v2 adds `/api/` path-prefix detection that promotes both `directory` (v1) and `experimental_workspaceID` (v2) into `?location[directory]=` form for routes under `/api/...` [S10].

Per-namespace footnotes:

- `Project.current()` resolves the project the directory points at. Calling `client.path.get()` is a sanity check that the directory is what the agent expected [S2].
- `Files.*` resolves every `path` argument against the directory. A trailing newline or whitespace in `path` creates files whose names literally contain the whitespace (#43112); the trim is on the caller, not on the SDK [S19].
- `Sessions.*` resolves the session's parent directory to the same workspace; `session.init` and `session.fork` enforce the same `directory` for any descendant session [S2].
- `MCP.add` and `Providers.*` resolve to the directory's local provider discovery, NOT to the global `/etc/opencode` set. The dossier never modifies either [S2][S3].

### The `model: { providerID, modelID }` discipline

Every `session.prompt` body must pin `model: { providerID, modelID }`. The rule covers both the prompt path and the read-side auditing:

- `client.session.prompt({ body: { model: { providerID, modelID }, parts } })` [S1].
- `client.session.init({ body: { messageID, providerID, modelID } })` -- init also pins a model [S2].
- `client.session.fork({ body: { messageID? } })` -- fork optionally carries the model from the parent session; pass it again if the parent model is older or unset [S2].

The rule is universal: any prompt that does not pin a model silently falls back to the user's saved default. The dossier documents this as a top anti-pattern; see [`03_decision_guide.md`](03_decision_guide.md).

### The error-tuple shape

Every SDK method returns `{ data, error, response, request }` by default. With `throwOnError: true`, the SDK throws an `Error` whose message is the most informative string available and attaches `{ body, status }` under `.cause` [S13]. The shape is the same for every namespace, so a single parsing snippet works across the whole map:

- `if (result.error) handle(result.error)` -- non-throwing mode.
- `try { ... } catch (e) { log(e.message, (e as Error & { cause?: { status?: number; body?: unknown } }).cause?.status) }` -- throwing mode.

### The SSE event subscription path

`GET /global/event` is the only event-source the dossier uses. The shape of an event payload is event-name-specific and lives in `types.gen.ts`. The verified v1 set lives in the Global namespace section above [S15]; the v2 delta is in the v2-delta block above [S16]. A v1 server receiving a v2-only event name silently drops it; a v2 server receiving a v1 event name accepts it. The only safe assumption: switch on `event.type` with an explicit default that ignores unknown types.

### The PID + port cleanup chain

Any agent that calls `createOpencode()` gets back a `server` whose `.close()` is the canonical cleanup. The same agent on Win32 hosts runs through `taskkill /pid /T /F` automatically because the SDK wires that into the cleanup path [S14]. On POSIX, the SDK uses `cross-spawn` and a SIGTERM-then-SIGKILL chain. The dossier recommends `server.close()` in a `finally` block without inspecting the platform [S14].

## Reading this map

- A row marked `Body shape unverified -- revalidate against types.gen.ts` means the SDK method exists and the URL is correct, but the body fields are not asserted in research. Lookup the typed body in the package's `types.gen.ts` before publishing a snippet.
- A row marked `v2-only` requires the v2 subpath import. Mixing SDK versions silently loses events or trips the HTML-response guard -- see [`03_decision_guide.md`](03_decision_guide.md) v1 vs v2 rule.
- The TUI namespace calls are wired but not meant for non-interactive agents. The dossier has no recipe for them; they live in this map because they exist on the wire and a future reader will encounter them while grepping the SDK.

## Sources used in this file

- `[S1]` OpenCode SDK docs page (full v1 namespace + body shape table, generated types named)
- `[S2]` OpenCode Server docs page (per-namespace HTTP path table, exact endpoint list)
- `[S5]` `anomalyco/opencode` repo root
- `[S10]` v2 SDK client source (workspace header rewrite, HTML-response guard)
- `[S12]` v2 `data` helper source (`data.message.user`)
- `[S15]` v1 generated types file (verified v1 event-name set)
- `[S16]` v2 generated types file (v2-only event-name set)
- `[S17]` SDK package.json (exports map for `@opencode-ai/sdk` and `@opencode-ai/sdk/v2`)
- `[S19]` GitHub issue #43112 (truncate `filePath` discipline)
- `[S21]` SDK-related releases, `v1.18.9` MCP-compat fix

The authoritative mirror of all `[Sn]` markers is in [`99_sources.md`](99_sources.md), Phase 3F.

## Body-shape invariants every namespace shares

Most of the per-namespace rows above land in one of three return-shape buckets. The invariants below apply uniformly and let a reader recognize the shape without consulting `types.gen.ts`:

### Tuple shape (every SDK call, every namespace)

```
{ data: T | undefined, error: ErrorObject | undefined, response: Response, request: Request }
```

- `data` is `undefined` when `error` is set; the SDK never sets both [S13].
- `error` is `undefined` on a `2xx` response with a parseable body [S13].
- `response` and `request` mirror the standard Fetch `Response` and `Request` objects; useful for inspecting headers, status, or the raw body when `error` is set [S13].

Switching the client to `throwOnError: true` changes `data` / `error` to a thrown `Error` whose `cause` carries `{ body, status }`. The shape of `data` is unchanged for callers that catch the error.

### Config shape (Config namespace)

The merged `Config` returned by `client.config.get()` is a JSON object whose top-level keys match the OpenCode server's `opencode.json` schema. The dossier does not enumerate the top-level keys because the SDK regenerates `types.gen.ts` on every CLI publish [S2][S17]. The provider rows inside `client.config.providers()` are an array of `{ id, source, ... }` whose provider-specific fields come from each provider's typed surface; treat any field outside `id` / `source` as `not-verified` until checked against `types.gen.ts`.

### Session shape (Sessions namespace)

The Sessions namespace returns `Session` records with `id`, `parentID?`, `title?`, and message / child counters in the same shape across every Sessions method. The internal field set (`createdAt`, `updatedAt`, `shareURL`, `messageCount`, etc.) is in `types.gen.ts`; the dossier asserts only `id` and `parentID` because those are the fields research verified [S1][S2].

## Read-this-map walkthrough (v1-only agent)

A v1-only reader that wants to find a method by question can scan the per-namespace tables in this order:

1. **State questions** start at `Global.health()` or `Global.event.subscribe()`. These two calls are the only ingress for server-level state without a namespace prefix [S1][S2].
2. **Project-shape questions** start at `Project.current()` plus `Path.get()` plus `Vcs.get()`. The three together describe the project the directory points at [S2].
3. **Config questions** start at `Config.get()` plus `Config.providers()`. These are the right calls for "is provider X configured" -- not the auth-file path, never the env vars [S1][S2].
4. **File questions** start at `Files.find.text`, `Files.find.files`, `Files.file.read`. These return text-paths and content; they do NOT trigger a model call [S1].
5. **Session lifecycle questions** start at `Sessions.list` then `Sessions.create`. From there, the prompt path is `Sessions.prompt` (with explicit `model`); the structured-output path adds `format: { type: "json_schema", schema }` [S1].
6. **Process / TUI / shell questions** stay in Sessions (`Sessions.command`, `Sessions.shell`) or jump to TUI (`Tui.*`). The TUI namespace calls are meant for an interactive terminal, not a non-interactive agent [S1][S2].

A v2-capable agent adds:

- The `experimental_workspaceID` config for workspace routing [S10].
- The HTML-response guard as the canonical signal of v1-vs-v2 skew [S10].
- The `data.message.user()` helper for client-side prompt assembly [S12].
- The v2-only event names from the v2-delta block, which expand the per-event payload coverage research captured [S16].

## Next step

Phase 3C ships [`05_lifecycle.md`](05_lifecycle.md), [`06_security.md`](06_security.md), [`07_errors.md`](07_errors.md), [`08_events.md`](08_events.md) -- the operational guidance this map hints at but does not spell out.

<!-- freshness: sdk=1.18.18 cli=1.18.x access=2026-08-18 -->
