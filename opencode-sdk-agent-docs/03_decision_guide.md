# Decision guide

<!-- freshness: sdk=1.18.18 cli=1.18.x access=2026-08-18 -->

This file is the "what to use and what NOT to use" map for the OpenCode SDK. It is organized in two halves. The first half names the bounded set of choices an agent has to make -- SDK versus raw HTTP versus the CLI/TUI binary, embedded server versus existing server, v1 default versus v2 subpath, structured output versus free text, SSE versus polling, generated types versus string JSON, security posture -- with a "use" rule and a citation for each. The second half is the matching "do not use" rule list, mirroring the research-derived anti-patterns. The closing tables call out endpoint shapes that research did not fully verify, plus pointer for revalidation against the generated types file.

Every rule below carries at least one `[Sn]` citation. The canonical citation ledger mirrors in [`99_sources.md`](99_sources.md) (Phase 3F); until that file lands, every `[Sn]` here resolves to the canonical research ledger in [`../share/notes/01_research_T-2026-08-18-001.md`](../share/notes/01_research_T-2026-08-18-001.md). Context Hub (`chub`) was searched for `OpenCode SDK` and returned no matching entry; the dossier fell back to the official OpenCode docs page and the `anomalyco/opencode` source on GitHub.

## When to use the SDK

### Use the SDK by default

Use `@opencode-ai/sdk` (v1 default import) for any TypeScript or JavaScript agent that needs to call the OpenCode server programmatically. The SDK is generated from the server's OpenAPI 3.1 spec via `@hey-api/openapi-ts`, so the request and response shapes stay aligned with whatever server version the agent targets; types are reachable from `@opencode-ai/sdk` and the v2 subpath's types from `@opencode-ai/sdk/v2/types` [S1][S17][S15][S16]. Reach for raw HTTP only when the reasoning in the next rule says so.

### Use raw HTTP only when there is no matching SDK method, or when the SDK is overkill

Reach for raw HTTP via `fetch` against `http://<host>:<port>/<path>` only in two cases:

1. The endpoint exists on the server but is not yet exposed in the SDK's generated client. Research confirmed the full server surface (Global, Instance, Project, Path, Vcs, Config, Tools Experimental, Ptys, Auth, Providers, Files, Sessions, Commands, MCP, LSP, Formatter, TUI) [S2]; if a newer server exposes something new, the SDK may lag. Re-validate against `types.gen.ts` before claiming a method is "missing".
2. The agent is a tiny shell-side script that does not benefit from `createOpencode` lifecycle ownership or `data.message.user()` typed helpers; a one-shot `fetch` call is fine. In that case prefer the SDK client anyway -- one extra line and you inherit the directory header, error wrapping, and SSE retry options [S7].

### Use the CLI/TUI binary only for interactive use, not from agents

> UNSAFE -- the paragraph below documents the createOpencodeTui non-interactive pitfall.
`createOpencodeTui()` spawns `opencode` with `stdio: "inherit"`, which is meant for driving the interactive TUI from a parent terminal. Calling it from any non-interactive agent hangs the parent process because the TUI waits on a controlling terminal that does not exist [S8]. The official docs page is explicit that the TUI is the human-facing surface; the SDK is the programmatic surface [S1]. Equivalent: do not wrap `opencode --help` / `opencode serve` in a child process and call it directly from a non-interactive harness -- the SDK already calls `opencode serve` for you with the right URL parsing [S8].

### Use `createOpencode()` for a long-lived agent that owns the server

If the agent is a daemon or background process that should not collide with a user's running `opencode serve`, use `createOpencode({ hostname: "127.0.0.1", port: <unique-loopback-port>, timeout: 30000 })`. The call returns `{ client, server }` and one `server.close()` in `finally` reaps the process tree. The `createOpencodeServer` factory underneath captures the listening URL by parsing the stdout line `opencode server listening on <url>` and rejects if the URL is not observed within `options.timeout` ms [S1][S8][S11].

### Use `createOpencodeClient({ baseUrl, directory })` for a worker that connects to a server someone else owns

If `opencode serve` is already running, call `createOpencodeClient({ baseUrl: "http://127.0.0.1:4096", directory: "/abs/path" })`. The `directory` option is URL-encoded into the `x-opencode-directory` header on GET/HEAD and the `?directory=` query on POST/PATCH/DELETE, so every namespaced call resolves the right project workspace without re-passing the path [S7]. Pin `directory` once at agent boot, not per call.

### Use the v1 default import unless v2-only surface is needed

The official docs page documents only the v1 surface, and the npm `latest` tag points at `1.18.18`. Reach for `@opencode-ai/sdk/v2` only when an agent needs v2's richer event stream, the workspace routing header, the `data.message.user()` helper, or the v2 generated types surface [S1][S9][S10][S12][S16][S17]. Mixing a v1 SDK with a v2 server (or vice versa) silently loses event types or trips the v2 HTML-response guard on every call; the only safe path is to pin a single version and probe `GET /global/health` before first use [S2][S10].

### Use structured output when the prompt expects machine-readable values

For prompts that should return a JSON object, pass `format: { type: "json_schema", schema: ... }` on the `session.prompt` body. Research verified the body shape as `{ model: { providerID, modelID }, parts: Part[], noReply?: boolean, format?: { type: "json_schema", schema: JSONSchema } }` and verified that a structured-output failure surfaces as `info.error.name === "StructuredOutputError"` after the server's retry budget is exhausted [S1]. Pass a tiny `maxLength`-bounded schema (see the residual-cost conversation in [`11_live_validation.md`](11_live_validation.md) once it lands) and parse `parts[0].text` as JSON in the caller.

### Use SSE on `GET /global/event` for any state-change that needs streaming

Polling `session.status` works but doubles the request budget for the same information; SSE on `GET /global/event` is the canonical live-event stream. The v1 client supports the `@hey-api` SSE options (`onSseError`, `onSseEvent`, `sseDefaultRetryDelay`, `sseMaxRetryAttempts`, `sseMaxRetryDelay`); the v1 verified event types include `EventServerInstanceDisposed`, `EventInstallationUpdated`, `EventInstallationUpdateAvailable`, `EventLspClientDiagnostics`, `EventLspUpdated`, `EventMessageUpdated`, and `EventMessageRemoved` [S1][S2][S15]. v2 adds many more event types (`EventMessagePartDelta`, the `EventSessionNext*` family, `EventPermissionV2*`, `EventQuestionV2*`, `EventWorkspace*`, `EventWorktree*`, `EventMcpToolsChanged`, `EventSessionCompacted`, the `EventTui*2` set, and others) [S16]; do not use a v2-only event name without first verifying the v1 server is not in use.

### Use generated types instead of stringly-typed JSON

The SDK exports the server's full generated types from its root entrypoint and from `@opencode-ai/sdk/v2/types`. Any of `Session`, `Message`, `Part`, `Config`, `Provider`, `Symbol`, `File`, `LSPStatus`, `FormatterStatus`, `MCPStatus` is reachable without copy/pasting the shape [S1][S15][S16]. Whenever an example in the dossier cannot fully verify a sub-shape, the rule is the same: pull the type from `types.gen.ts` instead of free-typing `JSON.parse(response.body)`.

### Use authentication env vars on any non-loopback bind

Set `OPENCODE_SERVER_PASSWORD` and `OPENCODE_SERVER_USERNAME` (default username `opencode`) before exposing the server on any non-loopback interface. The unauthenticated default is `127.0.0.1:4096`; changing `--hostname` to a non-loopback value without `OPENCODE_SERVER_PASSWORD` leaves the server reachable with no credential [S2]. Use `--cors` to enumerate the origins allowed to call the server from a browser [S2]. This rule is one of the dossier's hard guardrails and applies to any recipe that flips the loopback default.

### Use `throwOnError: true` only when the caller can handle the parsed body

The default mode returns a tuple `{ data, error, response, request }`. Switching to `throwOnError: true` produces an `Error` whose message is the most informative string available and attaches `{ body, status }` under `.cause` [S13]. Use it when the caller uses `try` / `catch` instead of inspecting `error` on every call; do not enable it for code paths that already pattern-match on `data` / `error`.

### Use `AbortSignal` to bound every prompt and every long-running call

The only hard ceiling on the SDK `session.prompt` path is the 30-second wall clock. There is no verified `max_tokens` field on the SDK body. Set `AbortSignal.timeout(30000)` per call; aborts past 30 seconds [S1][S13]. For server-side abort, `session.abort` is verified to exist on the Sessions namespace; the wire shape is not fully verified in research, so revalidate against `types.gen.ts` before relying on the exact argument shape [S2].

## When NOT to use the SDK or a feature inside it

### UNSAFE -- Do not use `createOpencodeTui()` from a non-interactive agent

The TUI factory spawns `opencode` with `stdio: "inherit"`. A non-interactive agent -- a daemon, an HTTP worker, a CI runner, an LLM agent loop -- does not have a controlling terminal, so the child waits forever for input [S8]. Use `createOpencode()` or `createOpencodeClient()` instead; both are first-class for non-interactive use [S1][S8].

### Do not call `session.prompt` without an explicit `model`

`session.prompt({ path: { id }, body: { ... } })` without `body.model` silently picks the user's saved default. The research and the user task both flag this as a top agent trap: the saved default is whatever the human user last interacted with, which is almost never what an agent wants. Always pin `model: { providerID, modelID }` on every prompt body; the user task lists `opencode / deepseek-v4-flash-free` as the only model authorized for this dossier's live phase [S1].

### UNSAFE -- Do not use untrimmed `filePath` on `apply_patch` / `write` / `edit`

GitHub issue #43112 (open, 2026-08-17, assignee `neriousy`) reports that the file-write / edit / `apply_patch` tool does not trim trailing whitespace from `filePath`. Local models that emit a newline inside the JSON string end up creating files whose names literally contain a newline [S19]. Mitigate by trimming in the caller's tool dispatcher before issuing any write / edit / `apply_patch` tool. The trim is on the calling agent, not on the SDK; the SDK passes the path through unmodified.

### Do not mix a v1 SDK with a v2 server (or vice versa) without a probe

The v2 client adds a response interceptor that throws `Error("Request is not supported by this version of OpenCode Server (Server responded with text/html)")` on every HTML response, which is the canonical signal that the wrong import path is in use [S10]. The v1 client pointed at a v2 server silently returns v1-only event types and never surfaces the mismatch. The fix is to call `client.global.health()` once at agent boot, compare `{ healthy, version }` to the SDK pin, and switch the import path on a major mismatch [S2]. The localized wording `same-minor-patch-delta-15` describes the dossier's pinned skew (CLI `1.18.3`, SDK `1.18.18`); observe compatibility from the probe, do not infer it from semver alone [S17].

### Do not leave the server unauthenticated on a non-loopback bind

`opencode serve` defaults to `127.0.0.1:4096` with no auth required. Changing the bind to `0.0.0.0` or to a specific non-loopback interface without `OPENCODE_SERVER_PASSWORD` (default user `opencode`, override with `OPENCODE_SERVER_USERNAME`) leaves the server reachable from any host that can resolve the address, with no credential [S2]. The dossier never does this without setting the password env var first.

### Do not paste `OPENCODE_SERVER_PASSWORD` into a script, log line, or environment-variable dump

The dossier never reads, prints, copies, parses, chmods, or stats any auth-file path. The only provider-presence check the dossier recommends is `opencode providers list`, which redacts the credential by default [S1][S2]. If a recipe needs to confirm that a provider is configured, run that CLI command; never dump `env` or `printenv` to a log file.

### Do not use a 5-second spawn timeout in production

The default `timeout: 5000` ms is fine for a warm dev loop. On a cold host or a host with many providers loaded, the SDK can miss the listening-URL stdout line within 5 seconds and reject. Production agents should pass `timeout: 30000` (or higher) [S1][S8]. The troubleshooting table in [`01_prerequisites.md`](01_prerequisites.md) maps this exact symptom.

### Do not assume the generated-types file matches a newer CLI version

The SDK is generated from the server's OpenAPI 3.1 spec served at `GET /doc`; `@hey-api/openapi-ts` 0.90.10 is the generator used by the SDK [S17]. Users on a CLI newer than `1.18.x` may see new methods or renamed fields. The dossier pins the SDK at `1.18.18` and re-validates per-call where research was partial. For users on a newer CLI, regenerate from the live `OpenAPI` spec at `GET /doc` and confirm `types.gen.ts` matches the expected fields, or restrict the SDK version to one whose types file is known.

### Do not invent endpoint body shapes

Some endpoints are well-known only at the URL level: `command`, `shell`, `auth` (e.g., `PUT /auth/:id`), the `session.init` / `session.fork` / `session.command` / `session.shell` / `session.promptAsync` / `session.permissions` bodies, and any `provider.*` body call. The dossier's exact policy is documented in the next table: every body that is not fully verified carries a "revalidate against `types.gen.ts`" marker and the example does not include an invented schema. The line on the lower bound is simple: if `types.gen.ts` does not enumerate the keys you want to set, do not send them.

## Endpoint shapes revalidate against `types.gen.ts` before use

The research ledger did not fully verify the body shape of every endpoint, even at the documentation level. The table below names the endpoints that are known to exist (`S1`, `S2`) but whose full body shape was not fully verified end-to-end. The writer of the next phase (3D Examples) and any reader copying a recipe must re-check the shape against `types.gen.ts` before publishing a snippet that uses one of these.

| Endpoint | Status | Re-resolve method |
|---|---|---|
| `session.command` | URL verified, body NOT fully verified [S1] | Look up `Command` / `SessionCommandBody` in `types.gen.ts`; do not assume `parts` or `command` field names |
| `session.shell` | URL verified, body NOT fully verified [S1] | Look up `Shell` / `SessionShellBody`; many shell surface shapes exist |
| `session.init` | URL verified; body `{ messageID, providerID, modelID }` verified [S2] | Re-check `messageID` is required vs optional; pair with explicit model per the "no implicit default" rule above |
| `session.fork` | URL verified; body `{ messageID? }` verified [S2] | Confirm the optional fork-from-message argument |
| `session.promptAsync` | URL verified; body shape mirrors `session.prompt` [S1] | Confirm the same body fields apply |
| `session.permissions` | URL verified; the per-permission-id body NOT verified [S2] | Look up the `Permission` action set; do not hard-code action strings |
| `session.share` / `session.unshare` | URL verified; body NOT verified [S2] | Re-check the payload before generating shareable session URLs |
| `PUT /auth/:id` | URL verified; provider-credential body NOT verified [S2] | Use the SDK's `client.auth.set({ path, body })`; do not paste credentials into a snippet |
| `providers.oauth.authorize` | URL verified; body NOT verified [S2] | Look up `OAuthAuthorizeBody`; this is provider-specific |
| `session.abort` | URL verified [S2]; wire shape NOT fully verified | If wire shape unverified at write time, omit from harness; rely on `AbortSignal.timeout` only |
| `usage` block in `session.prompt` response | NOT verified for SDK path [Z14][Z15] | Mark `usage: not-verified`; never use `usage` field names to drive verdicts |

Two more shapes are flagged in the high-level plan's writer-verification table, copied here for the same "do not assert without revalidation" rule:

- `find.text` returns an array shape; the research-verified subset is `{ path, lines, line_number, absolute_offset, submatches }`. Use the verified subset only; any field not in that list is `not-verified` [S1].
- `find.files` takes `{ type?, directory?, limit (1-200) }`; do not pass `dirs` (research did not verify) [S1][S2].
- `file.read` returns `{ type: "raw" | "patch", content: string }`; do not assume `metadata` or other fields exist [S1].
- `session.prompt` body shape is `{ model, parts, noReply?, format? }` and the response shape is `{ data: { info, parts }, error, response, request }` with `info.error` (a structured-output failure has `name === "StructuredOutputError"`) [S1][Z14][Z15]. `info.messageCount` and other `info.*` fields are NOT verified; record `info.error` only.

## Decision shortcuts for common shapes

| Question | Answer |
|---|---|
| `createOpencode()` vs `createOpencodeClient()` | The former owns the server; the latter connects to one. Decide by who is responsible for `server.close()` |
| v1 vs v2 default import | v1 stays on the official docs; v2 only when an explicit v2-only capability is needed (workspace header, `data.message.user`, richer event types) |
| Structured output vs free text | Structured when the caller parses JSON; free text when human-readable is the goal. Always pin `model` either way |
| SDK vs `fetch` | SDK by default; raw `fetch` only when the SDK does not yet expose a method, or for one-off scripts |
| Event subscription vs polling | SSE on `GET /global/event` for any live state; polling `session.status` only when retry budget is small and SSE is unavailable |
| Throw-on-error mode | Off by default; on when the caller uses `try` / `catch` and wants the parsed body attached via `.cause` |
| Hard cap on prompt output | No SDK-side `max_tokens`. Use `AbortSignal.timeout(30000)` and a tiny `json_schema` with `maxLength` on the answer field |

## Quick rule index

The "use" / "do not use" rules above are listed in the order an agent usually meets them (default choices first, then narrow ones). The index below sorts the rules by the situation that triggers the question, not by the order they appear in the file. Treat this table as the lookup surface; the rule text above is the canonical statement.

| Situation | Rule kind | Rule heading (canonical) | Citation |
|---|---|---|---|
| Picking the package to install | Use | Use the SDK by default | [S1][S17] |
| Picking between `fetch` and the SDK | Use / Use | Use raw HTTP only when there is no matching SDK method, or when the SDK is overkill | [S2][S7] |
| Calling `opencode` directly from an agent | Do not use | Use the CLI/TUI binary only for interactive use, not from agents | [S1][S8] |
| Selecting the construction path | Use / Use | Use `createOpencode()` for a long-lived agent that owns the server / Use `createOpencodeClient({ baseUrl, directory })` for a worker that connects to a server someone else owns | [S1][S7][S8][S11] |
| Picking the SDK import path | Use / Do not use | Use the v1 default import unless v2-only surface is needed / Do not mix a v1 SDK with a v2 server (or vice versa) without a probe | [S10][S17] |
| Sending a prompt | Use / Do not use | Use structured output when the prompt expects machine-readable values / Do not call `session.prompt` without an explicit `model` | [S1] |
| Streaming state changes | Use | Use SSE on `GET /global/event` for any state-change that needs streaming | [S1][S2][S15][S16] |
| Typing SDK responses | Use / Do not use | Use generated types instead of stringly-typed JSON / Do not assume the generated-types file matches a newer CLI version | [S1][S15][S16][S17] |
| Binding any non-loopback interface | Use / Do not use | Use authentication env vars on any non-loopback bind / Do not leave the server unauthenticated on a non-loopback bind | [S2] |
| Handling errors | Use | Use `throwOnError: true` only when the caller can handle the parsed body | [S13] |
| Bounding long calls | Use / Do not use | Use `AbortSignal` to bound every prompt and every long-running call / Do not use a 5-second spawn timeout in production | [S1][S8][S13] |
> UNSAFE -- the table row below references the apply_patch / filePath anti-pattern.
| Writing a file via the model | Do not use | Do not use untrimmed `filePath` on `apply_patch` / `write` / `edit` | [S19] |
| Logging credentials | Do not use | Do not paste `OPENCODE_SERVER_PASSWORD` into a script, log line, or environment-variable dump | [S2] |
| Copying a body shape | Do not use | Do not invent endpoint body shapes | [S1][S2] |

## v1 to v2 migration path (concrete shape only)

An agent that started on the v1 default import can move to v2 by switching one import path, no other refactor needed. The diff against a v1 harness looks like:

```diff
- import { createOpencode, createOpencodeClient } from "@opencode-ai/sdk";
+ import { createOpencode, createOpencodeClient } from "@opencode-ai/sdk/v2";
```

Three side effects of the swap that the agent will see, with the canonical signal and the canonical fix for each:

1. `createOpencodeClient` now accepts an optional `experimental_workspaceID` second argument (or as a nested config option). The SDK forwards it as the `x-opencode-workspace` request header [S10].
2. Every 200 response is checked for `Content-Type: text/html`; if it is HTML, the SDK throws `Error("Request is not supported by this version of OpenCode Server (Server responded with text/html)")` instead of returning a parsed body [S10]. The only fix is to switch the import path back to v1, or to upgrade the server to the v2 line.
3. New event names appear on `GET /global/event` -- in particular `EventMessagePartDelta`, `EventMessagePartUpdated`, `EventMessagePartRemoved`, the `EventSessionNext*` family, `EventPermissionV2*`, `EventQuestionV2*`, `EventWorkspace*`, `EventWorktree*`, `EventMcpToolsChanged`, `EventSessionCompacted`, and the v2 TUI events `EventTui*2` [S16]. A v1-only `switch (event.type)` exhaustiveness check breaks; the fix is to widen the switch with an explicit default that ignores unknown types.

Agents that do not need workspace routing, the HTML guard, or any of the v2-only event names should stay on v1 -- the official docs page documents v1, the npm `latest` tag is v1, every existing 1.18.x server is v1, and the v2 surface has no public docs page yet [S1][S17].

## Deeper endpoint revalidation list

The "do not invent endpoint body shapes" rule above lists the surface that research did not verify end-to-end. The expanded list below adds fields research partially verified, fields not verified at all, and the verification-direction note for each. Treat any field outside this list as `not-verified` -- never assert it in a recipe or in the live-validation table without re-checking against `types.gen.ts`.

| Surface | Direction | What is verified | What is NOT verified | Citation |
|---|---|---|---|---|
| `session.prompt.body` | forward | `model: { providerID, modelID }`, `parts: Part[]`, `noReply?: boolean`, `format?: { type: "json_schema", schema: JSONSchema }` | `max_tokens` field; any field named `tools`, `stop`, `temperature`, `topP` -- none of these have been verified on the SDK body shape | [S1][S15] |
| `session.prompt.response.info` | forward | `info.error` (object; structured-output failure has `name === "StructuredOutputError"`); role | `info.messageCount`, `info.tokenCount`, any other `info.*` field name | [S1][Z14][Z15] |
| `session.prompt.response.usage` | n/a | absence: research did not verify `usage.prompt_tokens`, `usage.completion_tokens`, `usage.total_tokens` field names on the SDK response | treat the entire `usage` block as `not-verified` for SDK rows; the live-validation table records `usage: n/a` or `usage: not-verified` | [Z14][Z15] |
| `session.command.body` | forward | URL `POST /session/{id}/command` | `command` key, `parts` key, any flag-style argument | [S1] |
| `session.shell.body` | forward | URL `POST /session/{id}/shell` | `command`, `cwd`, `env`, any timeout-shaped field | [S1] |
| `session.init.body` | forward | `{ messageID, providerID, modelID }` all three present | whether `messageID` can be omitted; whether `providerID` defaults to the user's saved default | [S2] |
| `session.fork.body` | forward | `{ messageID? }` | whether other fork-options exist | [S2] |
| `session.promptAsync.body` | forward | mirrors `session.prompt` body | any field that `session.prompt` does not accept | [S1][S2] |
| `session.permissions.body` | forward | URL `POST /session/{id}/permissions/{permissionID}` | action enum set, `message` field, `remember` flag | [S2] |
| `session.share.body`, `session.unshare.body` | forward | URL only | payload shape; the dossier ships no recipe | [S2] |
| `session.summarize.body` | forward | URL only | payload shape | [S2] |
| `session.revert.body`, `session.unrevert.body` | forward | URL only | payload shape | [S2] |
| `client.auth.set.body` | forward | URL `PUT /auth/{id}` only | provider-credential body shape; the dossier ships no recipe and never names the auth-file path on disk | [S2] |
| `client.provider.auth.body` | forward | URL `POST /provider/{id}/auth` only | provider-specific body shape | [S2] |
| `client.provider.oauth.authorize.body` | forward | URL only | provider-specific OAuth body | [S2] |
| `client.mcp.add.body` | forward | URL `POST /mcp` only | `name`, `command` / `url`, env shape | [S2] |
| `client.mcp.auth.body` | forward | URL `POST /mcp/{name}/auth` only | scope set shape | [S2] |
| `client.tui.appendPrompt.body` | forward | URL only | `text` field or similar | [S2] |
| `client.tui.executeCommand.body` | forward | URL `POST /tui/execute-command`; body `{ command }` | whether more fields are accepted | [S2] |
| `client.tui.showToast.body` | forward | URL `POST /tui/show-toast`; body `{ title?, message, variant }` | `variant` enum set | [S2] |
| `client.tui.control.response.body` | forward | URL `POST /tui/control/response`; body `{ body }` | inner `body` shape (depends on the request being replied to) | [S2] |
| `client.find.text.query` | forward | `pattern` required | `dirs`, `ignore`, `case` | [S1] |
| `client.find.files.query` | forward | `query`, `type?`, `directory?`, `limit?` (1-200) | `dirs` | [S1][S2] |
| `client.find.symbols.query` | forward | URL `GET /find/symbol?query=` | other query fields | [S2] |
| `client.file.read.path` | forward | URL `GET /file/content?path=` | other query fields; `path` must be trimmed by the caller (#43112) | [S1][S19] |
| `client.file.status.directory` | forward | URL `GET /file/status?directory=` | other fields | [S1][S2] |

The dossier policy for any field that lands in the "NOT verified" column: copy the pattern, look up `types.gen.ts`, and only then write a recipe. The `Body shape unverified -- revalidate against types.gen.ts` marker above is shorthand for that policy.

## Lower-friction alternatives

When a decision is hard, the right move is often to step down the abstraction ladder:

- If the SDK is producing a complex body for a task that `opencode` already does, drop down to running `opencode --help` and re-derive. The CLI binary is the source-of-truth [S3][S8].
- If `session.prompt` is producing JSON-shaped output that the caller needs to parse, switch to a structured-output schema and `parts[0].text` parse. The schema is the contract; the parser shrinks to one line.
- If `GET /global/event` SSE is too noisy, switch to polling `client.session.status()` for one state and revert to SSE only when the noise floor matters.
- If `createOpencode()` is racing against a user's own `opencode serve`, switch to `createOpencodeClient({ baseUrl: "http://127.0.0.1:<other-port>", directory })` and let the user keep their server. The server can host multiple clients on the same `directory` via the `x-opencode-directory` header [S7].
- If a v2-only capability is needed (workspace routing, `data.message.user`, richer events), import from `@opencode-ai/sdk/v2` and run the `global.health()` probe first [S2][S10][S12].

## When this file disagrees with a future SDK release

A reader on a CLI newer than `1.18.x` may see new methods or renamed fields. Two invariants survive any future release:

1. The dossier pins the SDK at `1.18.18`. Any assertion about behaviour or shape in this file is for that pin. A reader on a newer pin re-validates per call.
2. The version-mismatch probe (`GET /global/health` -> `{ healthy, version }`) and the response interceptor (`Error("Request is not supported by this version of OpenCode Server (Server responded with text/html)")`) are the canonical signals for v1/v2 skew [S2][S10]. Even on a future CLI, those two checks carry the same meaning.

## What this file deliberately does not cover

- **Specific provider behavior.** The dossier says "how to call a model," not "which provider is best for which task." Provider selection is out of scope.
- **Generated types snapshots.** The dossier links to `types.gen.ts`; it does not embed a snapshot. The SDK regenerates on every published CLI version; embedding would be stale by the time it lands.
- **Live execution evidence.** That lives in [`11_live_validation.md`](11_live_validation.md), Phase 3E2 (after `am-review` PASS on Phase 3E1).

## Sources used in this file

The "[Sn]" markers above come from the canonical research ledger; the `## Citation ledger` block of `../share/notes/01_research_T-2026-08-18-001.md` lists every entry. The authoritative mirror is [`99_sources.md`](99_sources.md), written in Phase 3F.

## Next step

[`04_api_map.md`](04_api_map.md) -- one unified table that lists every namespace the SDK exposes, with `v1` / `v2-only` / `both` markers and a contiguous v2-delta block at the end.

<!-- freshness: sdk=1.18.18 cli=1.18.x access=2026-08-18 -->
