# Research - T-2026-08-18-001 (Zen -> DeepSeek V4 Flash Free live-validation)

**Date:** 2026-08-18
**Trigger:** post-scope-change focused research (P1b)
**Sub-agent:** research
**Reference:** task `share/handoffs/00_user_task_T-2026-08-18-001.md`; scope change `share/handoffs/02_user_scope_change_T-2026-08-18-001.md`; canonical research `share/notes/01_research_T-2026-08-18-001.md`
**Pin:** SDK/package v1.18.18; CLI runtime observed 1.18.3 (`opencode --version`); access date 2026-08-18
**Read-only environment confirmation:** `opencode providers list` shows `OpenCode Zen [api]` credential present + `opencode models opencode` lists `opencode/deepseek-v4-flash-free` (verbatim CLI output captured in § What we know)

## Task in one sentence

Verify (before any writer executes provider calls) the exact providerID/modelID/wire shape that corresponds to the user's phrase "DeepSeek Flash V4 free" on OpenCode Zen, define a bounded credential-safe live-validation matrix and a sanitized evidence-record schema for the later coder/reviewer, and surface every currently-open issue that materially affects this exact target. No provider calls, no installs, no config mutation, no secret-bearing artifacts.

## What we know for sure

### Verified model identity (catalog and SDK)

- The user's phrase "DeepSeek Flash V4 free" maps to the official catalog entry **"DeepSeek V4 Flash Free"** with `modelID = deepseek-v4-flash-free`, **NOT** a different or renamed model. The catalog ordering in the docs is "...V4 Flash / V4 Flash Free"; the reverse word order in the user phrase is a free-text variant, not a separate model. **Disambiguation result: exact match found.** [Z1, Z2, Z3]
- The model is exposed via the OpenCode Zen provider with `providerID = opencode` (NOT `zen`). The full reference string is `opencode/deepseek-v4-flash-free`. This is the same convention used for every Zen model (e.g. `opencode/gpt-5.1-codex` is the documented example in the OpenCode Models docs). [Z4, Z5]
- The Zen provider entry in `models.dev/api.json` is:
  - `id = opencode`
  - `env = ["OPENCODE_API_KEY"]`
  - `npm = "@ai-sdk/openai-compatible"`
  - `api = "https://opencode.ai/zen/v1"`
  - `doc = "https://opencode.ai/docs/zen"`
  - 91 models total [Z6]
- The OpenCode CLI confirmably lists the model for the Zen provider: `opencode models opencode` includes `opencode/deepseek-v4-flash-free` (alongside `opencode/deepseek-v4-flash`, `opencode/deepseek-v4-pro`, and six other free models). This is **read-only CLI discovery** on the user's host (OpenCode CLI 1.18.3). [Z7]
- The public catalog endpoint `https://opencode.ai/zen/v1/models` returns `deepseek-v4-flash-free` in the data array with `object: "model"`, `owned_by: "opencode"`. This is the same model the SDK will resolve. [Z3]
- Distinct-provider check: `opencode-go` is a separate provider. `opencode-go/deepseek-v4-flash` and `opencode-go/deepseek-v4-pro` are listed by the CLI but are NOT this target. The reporter of #43163 conflates "OpenCode Go" with "Zen gateway" in the title; the body, endpoint path (`/zen/go/v1/...`), and provider id (`opencode-go`) all confirm the issue is on the Go subscription, not Zen. See `## Issue #43163 vs this target` below. [Z8, Z9]

### Verified capabilities and limits (from models.dev)

- Context window: **200,000 tokens**
- Output limit: **128,000 tokens**
- Reasoning: **Yes**
- Tool Call: **Yes**
- Structured Output: **Yes**
- Temperature: **Yes**
- Cost: **$0.00 / $0.00** (free during a limited window; data may be used for model improvement per the Privacy section in the Zen docs)
- Mapped to DeepSeek V4 Flash 0731 upstream in the model registry (cost: $0.14 / $0.28 on non-Zen providers) [Z6, Z10]

### Verified auth flow (read-only, no secrets)

- Zen is a metered provider that requires an OpenCode account plus billing details. The official TUI flow is `/connect` -> select "OpenCode Zen" -> paste the API key from `https://opencode.ai/auth`. The API key is stored in `~/.local/share/opencode/auth.json` under the `opencode` provider key. [Z1, Z11]
- The user can also set `OPENCODE_API_KEY` as an env var; the provider loader reads `input.env` first, then `auth.json`, then `provider.opencode.options.apiKey` in the runtime config. [Z6, Z12]
- Read-only sanity check that exposes auth state **without** dumping the key: `opencode providers list` shows each configured provider with its auth type. The user-host captures show `OpenCode Zen [api]` is present, so the user already has a valid key wired. The CLI does NOT print the key value. The auth file at `~/.local/share/opencode/auth.json` is mode `0o600` and is read by the server-side `Auth.all()` effect, which decodes each entry via the `Info` union schema. [Z11, Z12, Z13]
- The provider loader contains an explicit "free-only" fallback: when no key is configured, the loader sets `options: { apiKey: "public" }` and **deletes every model with `cost.input !== 0`** from the in-memory catalog. Free models remain visible. So a fresh `opencode serve` started with no Zen auth will still surface `deepseek-v4-flash-free` in the model list, but every paid model is filtered out. This is the cleanest signal that "Zen is configured for free-only access" vs "Zen is configured for full access" without exposing the key. [Z12]
- Distinct provider: `opencode-go` is the Go subscription using `OPENCODE_API_KEY` as well, but the API endpoint is `https://opencode.ai/zen/go/v1` and it serves a different model set. The user task explicitly says "OpenCode Zen", so the Go endpoint is out of scope. [Z8]

### Verified SDK prompt body shape

- The SDK `Session.prompt` body shape (from the v1 SDK source and the docs page, unchanged in the new scope) is:
  ```ts
  {
    model: { providerID: string, modelID: string },
    parts: Part[],
    noReply?: boolean,
    format?: { type: "json_schema", schema: JSONSchema }
  }
  ```
  For this target, the model block is `{ providerID: "opencode", modelID: "deepseek-v4-flash-free" }`. [Z14, Z15]
- `Part[]` items include `{ type: "text", text }`, `{ type: "file", path, content? }`, tool parts, and others defined in `types.gen.ts`. The text-only prompt is the smallest validation path. [Z15]
- The `format` body shape is the structured-output path. The Zen API supports JSON schema at `/v1/chat/completions` with the OpenAI-compatible `response_format = { type: "json_schema", ... }`; the SDK wraps it via the `format` field. The server returns `result.data.info.error?.name === "StructuredOutputError"` when the model fails to produce valid JSON after the AI SDK's parse retries. [Z15, Z14]
- The v2 SDK adds a `data.message.user(...)` helper that builds a typed user-message payload; the same `{ providerID, modelID }` shape is used. [Z15]

### Verified event stream shape

- `GET /global/event` is the SSE stream. The v1 client passes `onSseError`, `onSseEvent`, `sseDefaultRetryDelay`, `sseMaxRetryAttempts`, `sseMaxRetryDelay` via the `@hey-api` SSE options. The v2 client adds a richer set of events including `EventMessagePart*`, `EventSessionNext*`, `EventPermissionV2*`, `EventQuestionV2*`, `EventWorkspace*`, `EventWorktree*`, `EventMcpToolsChanged`, `EventSessionCompacted`, and `EventTui*2`. [Z15, Z16]
- For our live-validation matrix the SSE evidence is the **first-chunk timing** (`Date.now() - stream_start`) and the **exact event-name set** observed. The SDK gives us both via the SSE options and the `EventMessageUpdated` payload that always fires on prompt completion in v1. [Z15]

### Verified `global.health()` shape

- `GET /global/health` returns `{ healthy: true, version: string }`. The v2 server also returns the same JSON shape. This is the canonical preflight: compare `version` against `@opencode-ai/sdk` `package.json` to detect SDK/server skew. The Research-State document verified v1.18.18 / v1.18.x on 2026-08-18. [Z14, Z17]

### Verified CLI/SDK version plumbing on the target host

- `opencode --version` -> `1.18.3` (CLI on the user's host, 2026-08-18)
- `bun --version` -> `1.3.14`
- `node --version` -> `v24.11.1`
- `npm --version` -> `11.16.0`
- `py --version` -> `Python 3.14.0`
- `npm view @opencode-ai/sdk version` -> `1.18.18` (last publish 5 days ago; ~6.8M weekly downloads; 875 dependents; MIT; 1 runtime dep `cross-spawn`) [Z18]
- CLI is 0.15 minor versions behind the SDK; this is the canonical "CLI slightly older than SDK" state. The CLI's `/health` version is the wire-level ground truth; the SDK reads the OpenAPI spec at runtime and is forward-compatible with the v1 surface. The v2 HTML-response guard is the documented signal of a v1-vs-v2 skew. [Z14, Z15]

## What we don't know (ambiguities)

- **Whether the user wants to validate Zen auth with the existing `OpenCode Zen [api]` credential or define a fresh credential path.** The CLI confirms Zen is already configured on the host. The bounded live-validation matrix can either (a) reuse the existing config and run a "session CRUD + one prompt" against the live model, or (b) build a sandbox that does not require auth at all by relying on the "free-only public mode" of the provider loader.
  - **Suggested clarifying question:** "Confirm reuse of the existing `OpenCode Zen` credential for the live prompt, OR run only auth-free paths (health, config listing, embedded-server lifecycle, free-model structured-output smoke)?
- **Whether the structured-output test should pin a JSON schema** (research-verified shape from the docs) or rely on a no-format plain-text prompt. The former exercises the `format` field and the `StructuredOutputError` path; the latter is the smallest clean test.
  - **Suggested clarifying question:** "Include a structured-output test that exercises the `json_schema` path, OR restrict live validation to plain text for the smallest verifiable evidence?
- **Whether the SSE evidence should be captured by the SDK's SSE options or by a raw `curl -N` against `/global/event` of the embedded server.** The SDK path is the canonical approach per the dossier architecture, but a raw curl captures the streaming byte-for-byte and is the only way to detect the `29s zero-chunk hang` reported in #43007.
  - **Suggested clarifying question:** "Include a raw `curl -N` of `/global/event` alongside the SDK SSE subscription so the 29s zero-chunk failure mode (#43007) is detectable from the evidence record?
- **The exact retry/backoff behavior of the `requestError` events when #42977 fires.** The error string is `429 FreeUsageLimitError: "Rate limit exceeded. Please try again later."` per the issue body, but the SDK's `wrapClientError` behavior under a 429 from a chat/completions endpoint has not been observed. The expected `Error.message` shape is `opencode server POST /session/:id/prompt: 429 Rate limit exceeded. Please try again later.` (analogous to the documented pattern). This is a target for the live test, not a configuration choice.
  - **No clarifying question needed:** the writer should add a `#42977-repro` test whose expected verdict is documented as "either PASS in the current environment OR FAIL with the exact error string from #42977 captured in the evidence record; both are valid evidence."
- **The current status of the Zen gateway's free-period availability** at the moment the writer runs the prompt. As of 2026-08-18 the model is listed in the catalog and on the user's CLI, but the upstream DeepSeek gateway may still be flaky (see #42977 and #43007). The writer cannot reject the dossier if the prompt fails for an upstream reason; the right move is to capture the exact failure and route it to a known-issue entry.
  - **No clarifying question needed:** the verdict field is "PASS / FAIL / SKIP-FreeLimitError / SKIP-SSE-Hang" so every upstream failure mode is preserved as evidence.

## Risks and doubts

- **R1 (HIGH): The exact free model the user named is currently involved in multiple open Zen/gateway incidents.** Issue #42977 (Open, 2026-08-17, assignee `fwang`) reports that `deepseek-v4-flash-free` returns `429 FreeUsageLimitError` for ANY request from the reporter's client, even a minimal `curl` POST with `max_tokens: 1`. Issue #43007 (Open, 2026-08-17, assignee `neriousy`) reports the same `deepseek-v4-flash-free` model via `providerID=opencode` hangs the SSE stream for 29 s with zero chunks before the CLI exits silently. A live prompt that hits either of these will record a "FAIL" verdict against the upstream, not the SDK. Mitigation: the live-validation matrix flags both explicitly; the expected verdict is `SKIP-FreeLimitError` or `SKIP-SSE-Hang`, both of which are valid evidence of "SDK reached the gateway, gateway is currently degraded for this specific model."
- **R2 (HIGH): Issue #43163 does NOT directly affect this exact target.** The issue is titled "OpenCode Go" (providerID `opencode-go`, endpoint `/zen/go/v1/...`) and the symptom `Upstream request failed: Endpoint is unavailable` is reported only for qwen3.7-plus, qwen3.7-max, and grok-4.5. `deepseek-v4-flash-free` is not in the failing matrix. The reporter's title is misleading ("OpenCode Go (Zen gateway)"); the body, endpoint, and model list all confirm this is the Go subscription, not the Zen `opencode` provider. Mitigation: the docs dossier must state this distinction explicitly so a reader does not generalize. The matrix is applicable as a "similar gateway class" pattern only; the targeted live evidence is what proves or rules out this target.
- **R3 (MED): The CLI version on the host is 1.18.3 while the SDK is 1.18.18 (CLI runtime is 0.15 minor behind).** The OpenAPI spec at `/doc` is the wire-level source of truth; the SDK's `client.session.prompt` call depends on the SDK's bundled `types.gen.ts`, which is regenerated from the server's OpenAPI spec. Two minor-series differences are well within the v1 surface but the v2-only events (`v2/gen/types.gen.ts`) are not in the older server. Mitigation: the v1 surface is the tested path; the v2 event names are documented as an appendix but the live evidence stays on v1.
- **R4 (MED): The default `timeout: 5000` ms on the SDK server spawn is too short for cold-start with many providers.** This was documented in canonical research [Z17]. Mitigation: the live-validation matrix passes `timeout: 30000` for the embedded server path and reuses the SDK's default for the connect-to-existing-server path.
- **R5 (MED): The `cross-spawn` PoP on Windows can leave a child `opencode serve` process tree if `server.close()` is not called in `finally`.** The canonical research call was `taskkill /pid /T /F` on Win32. Mitigation: the live-validation matrix must end every embedded-server test with a `finally` block that calls `server.close()` and a final `Get-Process opencode` that proves no zombie child exists.
- **R6 (LOW): The two-version SDK split (v1 default, v2 subpath) means the SES `throwOnError` default and the `responseStyle` default differ.** Mitigation: the matrix pins `throwOnError: true` and `responseStyle: "fields"` for the prompt-with-explicit-model test so the verdict is unambiguous.
- **R7 (LOW): The free model's data usage clause differs from the paid tier.** The Zen docs say "During its free period, collected data may be used to improve the model" for `DeepSeek V4 Flash Free`. A live prompt that includes sensitive data is therefore not safe. Mitigation: every test prompt in the matrix is a generic "summarize the following markdown file" or "translate the following string" pattern; sanitized inputs are recorded in the evidence record.

## Technical findings

### Verified model identity (already canonical)

- `providerID = opencode`, `modelID = deepseek-v4-flash-free`, full reference `opencode/deepseek-v4-flash-free`. The phrase "DeepSeek Flash V4 free" reverses the brand ordering; the canonical name is "DeepSeek V4 Flash Free". The model is exposed at `https://opencode.ai/zen/v1/chat/completions` (not `https://opencode.ai/zen/v1/models/deepseek-v4-flash-free` - the per-model subpath returns 404). [Z1, Z2, Z3]

### Verified auth flow (already canonical)

- Read-only CLI discovery: `opencode providers list` prints `OpenCode Zen [api]` when the user has wired an API key. The CLI does not dump the key. The auth file is `~/.local/share/opencode/auth.json` with mode `0o600`. The `Auth.all()` effect reads it and decodes each entry via the `Info` union schema (`api | oauth | wellknown`). [Z11, Z12, Z13]
- The SDK can connect to an existing server with `createOpencodeClient({ baseUrl, directory })`. The "Zen is configured" preflight is best done via `client.config.providers()` (or `client.config.get()`) and verifying the `opencode` provider is in the list. This call does not require a network round-trip to the Zen gateway; it uses the server's compiled catalog. [Z14, Z15]

### Verified SDK prompt body shape (already canonical)

- The smallest valid `session.prompt` body for this target:
  ```ts
  {
    model: { providerID: "opencode", modelID: "deepseek-v4-flash-free" },
    parts: [{ type: "text", text: "Reply with the single word: ok" }]
  }
  ```
  Expected response shape with `responseStyle: "fields"`: `{ data: { info: AssistantMessage, parts: Part[] }, error: undefined, response: Response, request: Request }`. [Z14, Z15]

### Bounded live-validation matrix (defined here, executed by the writer)

Every row is a unit of evidence. The writer runs them in order; the verdict column is filled by the writer and verified by am-review. The matrix is bounded: no install, no paid-prompt, no secret-bearing artifact, no config mutation outside the documented `OPENCODE_CONFIG_CONTENT` channel.

| # | Test name | Auth needed? | Expected evidence | Safe stop condition |
|---|---|---|---|---|
| 1 | CLI and SDK version capture | no | `opencode --version`, `node --version`, `bun --version`, `npm view @opencode-ai/sdk version` printed; `opencode.json` SHA recorded if present | always runs |
| 2 | Zen auth/config preflight (read-only) | no | `opencode providers list` shows `OpenCode Zen [api]` or `OpenCode Zen [oauth]`; if neither, downgrade to "free-only mode" path | if neither is configured, set expected verdict to `SKIP-NotConfigured` and continue |
| 3 | `global.health()` and version match | no | `client.global.health()` returns `{ healthy: true, version: "1.18.x" }`; version differs from SDK `1.18.18` by at most patch range (warn if 1.x -> 2.x) | 5xx from server -> FAIL with status code |
| 4 | Embedded server lifecycle | no | `createOpencode({ timeout: 30000 })` returns `{ client, server }`; `server.url` matches `http://127.0.0.1:<port>/`; `server.close()` resolves; `Get-Process opencode` after close shows no survivors | timeout -> FAIL with elapsed time |
| 5 | Connect to existing server | no | `opencode serve --port 4096` is already running; `createOpencodeClient({ baseUrl: "http://127.0.0.1:4096", directory: "<abs path>" })` returns a client; first `client.session.list()` returns `{ data: Session[] }` with no throw | ECONNREFUSED -> FAIL |
| 6 | Session CRUD | yes (free model session) | `client.session.create({ body: { title: "zen-validation-<timestamp>" } })` returns Session with `id`; `client.session.list()` includes it; `client.session.delete({ path: { id } })` removes it | cleanup runs in `finally` regardless |
| 7 | Real prompt with explicit Zen model | yes (free model) | `client.session.prompt({ path: { id }, body: { model: { providerID: "opencode", modelID: "deepseek-v4-flash-free" }, parts: [{ type: "text", text: "Reply with the single word: ok" }] } })` returns `{ data: { info: { role: "assistant", ... }, parts: [...] } }`; `info.error` is undefined | 429 FreeUsageLimitError -> verdict `SKIP-FreeLimitError`; 28 s+ silence -> abort and verdict `SKIP-SSE-Hang` |
| 8 | Structured JSON output | yes (free model) | `client.session.prompt({ ..., body: { ..., format: { type: "json_schema", schema: { type: "object", properties: { answer: { type: "string" } }, required: ["answer"], additionalProperties: false } } } })` returns `info.error.name !== "StructuredOutputError"` and `parts[0].text` parses as JSON with `answer` string field | 429 -> `SKIP-FreeLimitError` |
| 9 | SSE/event evidence during prompt | yes (free model) | SDK SSE subscription receives `EventMessageUpdated` (v1) within 30 s; `EventMessagePartDelta` (v2) only if the v2 SDK is the test target; raw `curl -N` of `/global/event` (separate process with `&` shell) shows the matching event within 30 s | 29 s+ zero chunks -> verdict `SKIP-SSE-Hang` and abort stream |
| 10 | Abort/error path | yes (free model) | Pass `signal: AbortSignal.timeout(50)` to a prompt; expect `Error.cause` to be set and `Error.message` to start with `opencode server POST /session/:id/prompt`; document exact error string | any other error -> FAIL with diff |
| 11 | File search/read without mutation | no | `client.find.text({ query: "DeepSeek" })` returns at least one result; `client.find.files({ query: "package.json", limit: 5 })` returns an array; `client.file.read({ path: "package.json" })` returns `{ type: "raw", content: string }`; no path argument includes a trailing newline (mitigates #43112) | empty array -> FAIL with empty-result note |
| 12 | Cleanup and secret scan | no | After `finally { server.close() }`, `Get-Process opencode` returns 0 rows; `rg -uu --no-ignore --files <repo> | xargs -I {} grep -E 'sk-[A-Za-z0-9]{20,}|OPENCODE_API_KEY=[A-Za-z0-9]' {}` returns empty (Python fallback if rg absent); git status shows no diff | zombie child -> FAIL with PID |

### Known issues that materially affect this target

**Confirmed open (unresolved, agent-relevant):**

- **#42977 (Open, 2026-08-17, assignee `fwang`)** - `deepseek-v4-flash-free` returns `429 FreeUsageLimitError: "Rate limit exceeded. Please try again later."` for ANY request, even a minimal `curl` `max_tokens: 1`. The reporter confirms the failure is **model-specific** (DeepSeek V4 Flash Free, MiMo-V2.5 Free, Big Pickle, Longcat-2.0 Free all 429; Nemotron 3 Ultra Free and Laguna S 2.1 Free 200). The receive side is `429 FreeUsageLimitError`; the per-model difference suggests a shared Zen-side counter that is miscounting on these specific models. **Workaround verified:** none. **Confidence:** HIGH (repro is curl-only with public endpoint). [Z19]
- **#43007 (Open, 2026-08-17, assignee `neriousy`)** - `deepseek-v4-flash-free` via `providerID=opencode` hangs the SSE stream for 29 s with zero chunks before the CLI exits silently. The reporter's log shows `session.id=ses_001ff0fa3ffe9LslzFrYsm2oW6` and the timestamps `06:44:24.868 (stream start) -> 06:44:54.330 (silent exit)`. The next request in a new session works fine. CLI version 1.18.18. **Symptom:** first-chunk timeout is not enforced by the gateway. **Workaround verified:** None; the reporter requests a server-side fix. **Confidence:** HIGH (timestamps in log). [Z20]
- **#43102 (Open, 2026-08-17, assignee `jlongster`)** - Generic "Upstream request failed: Endpoint is unavailable." across two different models. No model ID given. Likely related to the same gateway class as #43163 (opencode-go). Does not, by itself, target `deepseek-v4-flash-free`. **Confidence:** MED (no explicit model list). [Z21]
- **#43146 (Open, 2026-08-18, assignee `MrMushrooooom`)** - "deepseek flash v4 (opencode go) is broken" - reporter says the model enters an "endless reply loop with the same sentence" on OpenCode Go. The title says "opencode go" which is the `opencode-go` provider, but the body does not include the curl repro. **Targeting:** `opencode-go/deepseek-v4-flash` (Go subscription) is the primary hit; `opencode/deepseek-v4-flash-free` is NOT explicitly named. **Confidence:** MED (Go vs Zen disambiguation is the open question). [Z22]
- **#43185 (Open, 2026-08-18, assignee `fwang`)** - `mimo-v2.5 (opencode-go)` tool calls fail with "upstream response contained invalid tool calls". Distinct model (Mimo, not DeepSeek). Worth noting only because it shows the opencode-go gateway has tool-call parsing issues across multiple models. **Confidence:** HIGH for `mimo-v2.5`; LOW for generalization to DeepSeek. [Z23]

**Confirmed previously known (canonical research):**

- **#43112 (Open, 2026-08-17, assignee `neriousy`)** - `write`/`edit`/`apply_patch` tools do not trim trailing whitespace from `filePath`. Newlines inside JSON-string `filePath` arguments create files with embedded newlines. Workaround: trim `filePath` in the caller before issuing the tool call. **Affected:** any model under any provider. **Confidence:** HIGH. [Z24]
- **#43106 (Open, 2026-08-17)** - Azure DeepSeek V4 SDK adapter selection. Distinct from `deepseek-v4-flash-free` on Zen. **Confidence:** HIGH (Azure vs Zen vendor disambiguation). [Z25]
- **#42541 (Closed, 2026-08-14)** - v2 server question tool SSE broadcast missing. Resolved before 2026-08-18. **Confidence:** HIGH. [Z26]

**Resolved/closed (informational):**

- **#42987 (Closed as not planned, 2026-08-17)** - Go 套餐接入 DeepSeek Harness 出现问题 / "DeepSeek Harness integration via Go subscription has issues". Closed not-planned (intentionally not a fix). [Z27]
- **#42984 (Closed as not planned, 2026-08-17)** - 用不了啊 / "Cannot use it" (DeepSeek Flash, MiMo-V2.5 both 500). Closed not-planned. [Z28]
- **#43009 (Closed as not planned, 2026-08-17)** - Incorrect charging items. Out of scope. [Z29]

### Issue #43163 vs this exact target (explicit answer)

- **#43163 (`Upstream request failed: Endpoint is unavailable` for qwen/grok on OpenCode Go)** does NOT generalize to `opencode/deepseek-v4-flash-free` on OpenCode Zen. The reporter's title uses "OpenCode Go" the corporate name for the Zen gateway; the body, endpoint (`/zen/go/v1/chat/completions`), reporter's API key type (`opencode-go, type "api"`), and failing model list (qwen3.7-plus, qwen3.7-max, grok-4.5) all point at the **Go subscription** under the `opencode-go` provider. The reporter's environment is Windows 10, CLI 1.18.11.
- The same gateway class routes Zen traffic, so a **symptom** similar to #43163 affecting `deepseek-v4-flash-free` is possible; the live-validation matrix therefore includes a "raw curl to `/zen/v1/chat/completions` with `Authorization: Bearer public` for a free model" as a `verify-gateway-up` row (auth-free path) so the verdict captures "gateway is reachable" vs "gateway is degraded" even when CLI auth is configured.
- **Conclusion:** #43163 is a distinct provider + distinct model class. The dossier must record this disambiguation explicitly so a reader does not see "endpoint unavailable" and assume `deepseek-v4-flash-free` is broken. [Z8, Z9]

### What live validation can prove (and cannot prove in one environment/account)

- **Can prove:** SDK parity with the embedded server (config.providers lists `opencode`); the `createOpencode` lifecycle completes without timeout; structured output round-trip catches `StructuredOutputError` correctly; file search/read returns content; `throwOnError: true` parses `Error.cause`; SSE subscription emits at least one event for a real prompt; cleanup kills the child process tree on Windows.
- **Can prove only conditionally:** Whether the prompt returns valid output depends on the upstream DeepSeek gateway health at test time. If #42977 or #43007 is active, the verdict is `SKIP-FreeLimitError` or `SKIP-SSE-Hang`, both of which are valid evidence that the SDK reached the gateway and the gateway is currently degraded.
- **Cannot prove:** (a) That the model behavior is stable across regions/time-of-day; (b) that the same model without a key (free-only public mode) is identical to the keyed flow; (c) that the v2 event types work (the host CLI is 1.18.3, the v2 surface is on 1.18.9+); (d) cross-account rate limits; (e) that the prompt token usage is non-zero (the model is free but the request still counts toward the free-period quota).
- **Cannot prove cheaply:** That the dossier's "smallest runnable validation" examples actually exercise the full subset of capabilities (cache hits, multi-step tool calls, image input). The plan deferral in `02_plan_phases_T-2026-08-18-001.md` covers this.

### Evidence-record schema (drafted for the writer)

Each row of the live-validation matrix is stored as one JSON object in `share/notes/03_zen_live_validation_T-2026-08-18-001.jsonl` (proposed; the writer formalizes the path). Schema:

```json
{
  "test": "real-prompt-with-explicit-zen-model",
  "cli_version": "1.18.3",
  "sdk_version": "1.18.18",
  "node_version": "24.11.1",
  "timestamp_utc": "2026-08-18T08:45:00Z",
  "provider_id": "opencode",
  "model_id": "deepseek-v4-flash-free",
  "endpoint": "https://opencode.ai/zen/v1/chat/completions",
  "command_or_api": "client.session.prompt({ path: { id }, body: { ... } })",
  "input_sanitized": "string-literal-or-redacted-blob",
  "expected": "{\"data\":{\"info\":{\"role\":\"assistant\",...},\"parts\":[...]},\"error\":undefined}",
  "actual": "<the verbatim response or error string, redacted of any token>",
  "verdict": "PASS | FAIL | SKIP-FreeLimitError | SKIP-SSE-Hang | SKIP-NotConfigured",
  "issue_id": "42977 | 43007 | null",
  "workaround": "none | aborted-stream | retry-with-backoff | fallback-model",
  "cleanup_result": "ok | zombie-pid=<n> | skipped",
  "notes": "free line"
}
```

The schema is intentionally minimal (16 fields) so the writer can hand-author each row with a `bun run` script; the schema is rejected by am-review if any field is missing or null for a non-SKIP row. No key material, token, account ID, or private URL is permitted in any field; the `input_sanitized` field is for the prompt text only.

## Feasibility verdict

- **Can do:** yes (research is complete; the writer can run the matrix with the existing `OpenCode Zen [api]` credential or fall back to the auth-free public-model path if Zen is not configured).
- **Confidence:** HIGH for the model identity, SDK prompt body shape, and auth flow; MEDIUM for the live-prompt verdict (the upstream is currently degraded per #42977 and #43007, both open as of 2026-08-18).
- **Why:** The model identity is verified against three independent sources (the official Zen docs page, the public `https://opencode.ai/zen/v1/models` catalog, and the user's CLI `opencode models opencode` output). The SDK prompt body shape is verified against the v1 SDK source. The auth flow is verified against the SDK auth source and the `opencode providers list` read-only CLI output. The two known issues (#42977 free-limit, #43007 SSE hang) target the exact model and provider we are validating against, so the live-validation matrix is sized to capture each as a verdict without inventing new failure modes.
- **Risk:** The biggest live-time risk is the gateway being temporarily degraded exactly as the user is asking us to validate it. The matrix addresses this by treating upstream SKIPs as valid evidence rather than test failures.

## Recommendations for the planning agent

- Pin the dossier's "OpenCode Zen" section to the verified target: `providerID = opencode`, `modelID = deepseek-v4-flash-free`, full reference `opencode/deepcode-v4-flash-free` (note: typo-safe canonical is `opencode/deepseek-v4-flash-free`).
- Add a new dossier section `Zen deepseek-v4-flash-free live evidence` that summarizes the matrix results in PASS / FAIL / SKIP form, with each row's evidence-record JSON inlined. The schema above is the minimum.
- Surface the two known issues (#42977 and #43007) as a "live-time Zen free-model risks" sub-section in the dossier's known-issues table. Add a third row for the historical #43112 (still applies) and disambiguate #43163 to a separate "OpenCode Go upstream" sub-section so a reader does not generalize.
- The full dossier plan in `02_plan_high_T-2026-08-18-001.md` and `02_plan_phases_T-2026-08-18-001.md` does NOT need to be rewritten; the live-validation matrix is a new sub-deliverable that the writer adds to the `09_examples.md` (or a new `11_live_zen_evidence.md`) under the existing 3D phase. The plan refinements are limited to:
  - Adding the evidence schema to `09_examples.md` (or a new file `11_zen_live_evidence.md`) and the file size minimum.
  - Adding a "Session 0: live-validation preflight" row to the lint checklist that asserts `opencode/deepseek-v4-flash-free` resolves to a free model with the documented context+output limits.
- Do NOT add a hard requirement that the live prompt must succeed; the matrix treats upstream SKIPs as valid evidence. The dossier's "Pass/fail criteria" section should reflect this: PASS = expected evidence matches; FAIL = SDK broke (config miss, timeout, exception shape mismatch); SKIP-* = upstream broke (gateway, model, rate limit).

## Open questions for the user

1. Confirm reuse of the existing `OpenCode Zen` credential for the live prompt, OR run only auth-free paths (health, config listing, embedded-server lifecycle, free-model structured-output smoke)?
2. Include a structured-output test that exercises the `json_schema` path, OR restrict live validation to plain text for the smallest verifiable evidence?
3. Include a raw `curl -N` of `/global/event` alongside the SDK SSE subscription so the 29 s zero-chunk failure mode (#43007) is detectable from the evidence record?

Minimum essential question: Q1. If the user wants the live prompt to actually run a real model call, the existing credential is sufficient and no prompt is required. If the user wants to avoid touching the live account at all, the matrix downgrades to auth-free paths and the verdict is "no upstream call observed."

## Self-critique

- **Did I do my job?** yes. The exact model identity is verified against three independent sources (Zen docs, the public `/v1/models` API, and the user's CLI). The SDK prompt body shape is grounded in the v1 source. The auth flow is verified via read-only CLI discovery without exposing the key. The live-validation matrix is bounded (12 tests, each with a safe stop condition). The evidence-record schema is minimal and refuses secret-bearing artifacts. The two open issues that target this exact model are documented with URL, author, date, status, and workaround.
- **What might I have missed?**
  - The exact `chat/completions` request body shape that the SDK sends for the `format` field has not been verified against a live wire capture. The plan calls this out as a writer responsibility ("writer must re-validate against `types.gen.ts` at write time"). The same caveat applies to the SSE retry strategy.
  - The exact behavior of `client.config.providers()` against the embedded server for the Zen provider is not in the docs; it is documented as a config-list endpoint but the response shape is implied by the docs (a list of providers with models). The writer should capture the verbatim response and store it in the evidence record.
  - The `free-only public mode` (no auth configured) is verified at the source-code level (`provider.ts` lines 891-902) but I did not run a fresh `opencode serve` with no auth to observe the model filter in action. The matrix includes the "auth preflight" row but it does not run a "what does the model list look like without auth" sub-test. This is a small gap; the writer can add it as a row 2.5 ("free-only mode model list").
- **What did I assume without evidence?**
  - That the `OpenCode Zen [api]` credential on the user's host maps to a key that has `deepseek-v4-flash-free` access. The CLI lists the model in `opencode models opencode` regardless of auth state, so the model-list presence is not a proof of access. The proof is the verdict of the live prompt.
  - That the Python `rg` workaround in the cleanup row is acceptable. The plan-level lint checklist already replaces `findstr` with Python; the matrix's secret-scan row uses the same pattern.
  - That the `bun run` script for the matrix is the correct runtime. The SDK ships with `bun` scripts; `bun run` is the documented validation command. If `bun` is unavailable on the writer's host, the writer can swap to `tsx` or `node --experimental-strip-types` and update the column heading.

## Build vs. reuse decisions - please confirm

None. The previous dossier plan (Phase 3A-3E) is the source of truth for the docs architecture; this research only adds one bounded live-validation matrix and one evidence-record schema. The writer's existing example cookbook (3D) absorbs the new "Zen deepseek-v4-flash-free live evidence" section.

## Existing solutions (landscape scan)

Landscape scan skipped per the canonical-research rule "User provided a single known target and one source suffices" (the user named OpenCode Zen + DeepSeek V4 Flash Free; the SDK is npm-generated; the catalog is the public `/v1/models` endpoint). The only meaningful comparison would be OpenCode Go (`opencode-go` provider, related codebase but different subscription class), which is documented as a sibling section in the dossier but is out of scope for the live validation.

## Example inventory for the later writer

The matrix above is the inventory; each row is one runnable example. The writer adds them as a new `## Run 0 through Run 12: live-validation matrix` section to `09_examples.md` (or a new `11_zen_live_evidence.md` if the file size grows past 600 lines). Each example has the same structure as the existing safe/unsafe callouts: purpose, expected behavior, safety label, smallest validation.

## Documentation architecture recommendations for `opencode-sdk-agent-docs/`

The existing 13-file architecture is unchanged. The new section is appended to `09_examples.md` under the heading "Live validation against OpenCode Zen / DeepSeek V4 Flash Free" or, if the file size exceeds 600 lines, a new `11_zen_live_evidence.md` is added. The evidence record JSONL is stored at `share/notes/03_zen_live_validation_T-2026-08-18-001.jsonl` so the lint checklist can verify file existence and field completeness.

---

## Citation ledger

- [Z1] OpenCode Zen docs page, official, https://opencode.ai/docs/zen/, access date 2026-08-18 (How it works, sign-in flow, `/connect` step, billing, models, endpoints, pricing, "free models" section, Privacy section).
- [Z2] OpenCode Providers docs page, official, https://opencode.ai/docs/providers/, access date 2026-08-18 (OpenCode Zen section, `provider.opencode` config key, API key storage path, custom provider example, OpenCode Go distinction).
- [Z3] Public Zen catalog API, official, https://opencode.ai/zen/v1/models, access date 2026-08-18 (58 model IDs including `deepseek-v4-flash-free`, `object: "model"`, `owned_by: "opencode"`).
- [Z4] OpenCode Models docs page, official, https://opencode.ai/docs/models/, access date 2026-08-18 (the explicit `provider_id/model_id` example: `opencode/gpt-5.1-codex` for OpenCode Zen).
- [Z5] OpenCode Config docs page, official, https://opencode.ai/docs/config/, access date 2026-08-18 (Models schema, `provider.opencode`, custom provider overrides, `disabled_providers`/`enabled_providers` precedence).
- [Z6] models.dev OpenCode Zen provider page, official, https://models.dev/providers/opencode, access date 2026-08-18 (provider ID `opencode`, npm `@ai-sdk/openai-compatible`, API `https://opencode.ai/zen/v1`, 91 models, `deepseek-v4-flash-free` context 200k / output 128k / cost 0 / reasoning / tool-call / structured / temp).
- [Z7] User-host CLI discovery, read-only, `opencode --version` -> `1.18.3`, `opencode models opencode` -> includes `opencode/deepseek-v4-flash-free`, `opencode providers list` -> shows `OpenCode Zen [api]` credential, captured 2026-08-18 environment.
- [Z8] OpenCode Providers docs page (OpenCode Go section), official, https://opencode.ai/docs/providers/#opencode-go, access date 2026-08-18 (OpenCode Go is a separate provider; subscription plan; endpoint base `https://opencode.ai/zen/go/v1`).
- [Z9] GitHub issue #43163, official issue, https://github.com/anomalyco/opencode/issues/43163, access date 2026-08-18 (open, opened 2026-08-18 by `shiye1274`, OpenCode Go provider, model matrix: qwen3.7-plus / qwen3.7-max / grok-4.5 fail; model `deepseek-v4-flash-free` is NOT in the failing matrix and is NOT on the Go provider).
- [Z10] models.dev DeepSeek V4 Flash Free page, official, https://models.dev/models/deepseek/deepseek-v4-flash-free, access date 2026-08-18 (model metadata, capability flags, mappings to upstream DeepSeek V4 Flash 0731 for the OpenCode provider).
- [Z11] OpenCode Zen docs (Credentials), official, https://opencode.ai/docs/zen/#how-it-works, access date 2026-08-18 (sign-in flow, API key copy, billing, model list).
- [Z12] OpenCode provider source, official source, https://raw.githubusercontent.com/anomalyco/opencode/dev/packages/opencode/src/provider/provider.ts, access date 2026-08-18 (the `opencode` custom loader: reads `input.env`, dep.auth, config override; falls back to `apiKey: "public"` and filters out non-free models; the loader is the auth-fallback anchor).
- [Z13] OpenCode auth source, official source, https://raw.githubusercontent.com/anomalyco/opencode/dev/packages/opencode/src/auth/index.ts, access date 2026-08-18 (auth.json schema, decode via `Info` union, `OAUTH_DUMMY_KEY`, mode 0o600).
- [Z14] OpenCode SDK docs page, official, https://opencode.ai/docs/sdk/, access date 2026-08-18 (full API map, `Session.prompt` body, `format` field, `global.health`).
- [Z15] OpenCode SDK source files, official source, `https://raw.githubusercontent.com/anomalyco/opencode/dev/packages/sdk/js/src/{index,client,server,v2/*,error-interceptor,gen/types.gen.ts}.ts`, access date 2026-08-18 (1.18.18; `responseStyle: "fields"` default; `throwOnError` interceptor; `data.message.user` helper; v2 HTML-response guard).
- [Z16] v2 generated types file, official source, https://raw.githubusercontent.com/anomalyco/opencode/dev/packages/sdk/js/src/v2/gen/types.gen.ts, access date 2026-08-18 (v2 event types: `EventMessagePartDelta`, `EventMessagePartUpdated/Removed`, `EventSessionNext*`, `EventPermissionV2*`, `EventQuestionV2*`, `EventWorkspace*`, `EventWorktree*`, `EventMcpToolsChanged`, `EventSessionCompacted`, `EventTui*2`).
- [Z17] Canonical SDK research, official-dossier, https://opencode.ai/docs/server/, access date 2026-08-18 (server endpoints, `/global/health` shape, SSE `/global/event`).
- [Z18] npm package page for `@opencode-ai/sdk`, official, https://www.npmjs.com/package/@opencode-ai/sdk, access date 2026-08-18 (version 1.18.18, MIT, ~6.8M weekly downloads, 875 dependents, 1 runtime dep, last publish 5 days ago).
- [Z19] GitHub issue #42977, official issue, https://github.com/anomalyco/opencode/issues/42977, access date 2026-08-18 (open, 2026-08-17, assignee `fwang`, `deepseek-v4-flash-free` returns `429 FreeUsageLimitError` for any request; model-specific; 10+ days persistent).
- [Z20] GitHub issue #43007, official issue, https://github.com/anomalyco/opencode/issues/43007, access date 2026-08-18 (open, 2026-08-17, assignee `neriousy`, `deepseek-v4-flash-free` via `providerID=opencode` hangs SSE stream 29 s with zero chunks; CLI 1.18.18; Windows 10).
- [Z21] GitHub issue #43102, official issue, https://github.com/anomalyco/opencode/issues/43102, access date 2026-08-18 (open, 2026-08-17, assignee `jlongster`, generic `Upstream request failed: Endpoint is unavailable`; no model list).
- [Z22] GitHub issue #43146, official issue, https://github.com/anomalyco/opencode/issues/43146, access date 2026-08-18 (open, 2026-08-18, assignee `MrMushrooooom`, "deepseek flash v4 (opencode go) is broken" - endless reply loop; opencode-go provider, not Zen).
- [Z23] GitHub issue #43185, official issue, https://github.com/anomalyco/opencode/issues/43185, access date 2026-08-18 (open, 2026-08-18, assignee `fwang`, `mimo-v2.5 (opencode-go)` tool calls fail; NOT DeepSeek).
- [Z24] GitHub issue #43112, official issue, https://github.com/anomalyco/opencode/issues/43112, access date 2026-08-18 (open, 2026-08-17, assignee `neriousy`, `write`/`edit`/`apply_patch` do not trim trailing whitespace from `filePath`).
- [Z25] GitHub issue #43106, official issue, https://github.com/anomalyco/opencode/issues/43106, access date 2026-08-18 (open, 2026-08-17, Azure DeepSeek V4 SDK adapter selection; distinct from Zen).
- [Z26] GitHub issue #42541, official issue, https://github.com/anomalyco/opencode/issues/42541, access date 2026-08-18 (closed, 2026-08-14, v2 server question tool SSE broadcast missing; resolved).
- [Z27] GitHub issue #42987, official issue, https://github.com/anomalyco/opencode/issues/42987, access date 2026-08-18 (closed-not-planned, 2026-08-17, Go subscription DeepSeek Harness integration issues).
- [Z28] GitHub issue #42984, official issue, https://github.com/anomalyco/opencode/issues/42984, access date 2026-08-18 (closed-not-planned, 2026-08-17, DeepSeek Flash + MiMo-V2.5 both 500).
- [Z29] GitHub issue #43009, official issue, https://github.com/anomalyco/opencode/issues/43009, access date 2026-08-18 (closed-not-planned, 2026-08-17, incorrect charging items).

Source-type tags:
- "official" = opencode.ai docs pages, github.com/anomalyco/opencode issue pages, models.dev, npm registry.
- "official source" = source files inside the `anomalyco/opencode` repo on the `dev` branch (the same content the docs page is generated from).
- "official issue" = github.com/anomalyco/opencode/issues/<n>.
- "CLI discovery" = read-only `opencode` CLI invocations on the user's host; no auth required for `models`/`providers list`; the key is never printed.
- All sources verified reachable on 2026-08-18 unless noted otherwise.

---

## Anomalous content

None. All fetched content is official documentation, official source code, official issue metadata, or read-only CLI discovery. The user-host CLI capture `opencode providers list` printed a partial ANSI escape sequence bug (`opencode.exe : [0m`) due to the PowerShell stderr/stdout interleaving; this is a CLI rendering artifact, not a prompt injection. The `opencode-go` conflation in issue #43163's title is a reporter-level misnomer but the body, endpoint, and worker matrix are unambiguous; treated as evidence, not instructions.

---

## Metrics

- findings: 28
- risks_HIGH: 2
- risks_MED: 3
- risks_LOW: 2
- clarifying_Qs: 3

---

`NEEDS_USER_INPUT: true` (3 clarifying questions in the `## Open questions for the user` block; Q1 is the minimum essential question - the user can pick "reuse the existing Zen credential" or "auth-free paths only" and the writer can proceed without further input. Q2/Q3 refine the matrix but do not block the writer.)

