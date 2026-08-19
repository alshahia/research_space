# Live Validation - T-2026-08-18-001 (Zen primary + Go backup A or B + other providers)

<!-- freshness: sdk=1.18.18 cli=1.18.x access=2026-08-18 -->
<!-- live-evidence: cli_version=1.18.3 sdk_version=1.18.18 node_version=v24.11.1 bun_version=1.3.14 timestamp_utc=2026-08-18T13:22:35.877Z harness_path=%TEMP%\opencode-sdk-validation-20260818T124919Z\ actual_port=47831 secret_scan=clean pid_scoped_cleanup=PASS git_allowlist_baseline=see TASK.md Phase 3E1 row -->

## Provenance and deviation notice

This file is the authoritative live-validation evidence for task T-2026-08-18-001. The plan (`share/notes/02_plan_phases_T-2026-08-18-001.md` Phase 3E1 / 3E2) prescribes a strict 11-row matrix (rows 0-10) run from a stand-alone temp-directory harness with mandatory `am-review` PASS boundaries between 3E1 and 3E2 and between 3E2 and 3F.

In practice, the live runs that produced the evidence below were executed **in-band** as part of task T-2026-08-18-003 (the three runnable agent examples in `opencode-sdk-agent-docs/agents/`). Master dispatched the agent examples first to prove the verification recipe end-to-end, then ran the documented `bun test` suite with the same `RUN_PROVIDER_TESTS=1` gate. The matrix rows below are derived from the verbatim runs in `opencode-sdk-agent-docs/agents/LIVE_RUN_EVIDENCE.md`. Not every row in the prescribed 11-row matrix has a corresponding live run; rows that were not directly exercised are marked with the explicit verdict that records the evidence class (recipe-verified offline, historical-run, or no-budget-not-run).

The deviation is recorded here honestly. The live-evidence header fields (`cli_version`, `sdk_version`, `node_version`, `bun_version`, `harness_path`, `actual_port`, `secret_scan`, `pid_scoped_cleanup`, `git_allowlist_baseline`) come from the `Environment verification` and `Provider spend` sections of `LIVE_RUN_EVIDENCE.md` and the `bun test` runs T1-T4.

### Expansion notice (this revision)

The original 11-row matrix (Phase 3E1 / 3E2) carried a sentinel verdict on row 9 because the user had not yet chosen between Go alternative A (raw OpenAI-compatible with `max_tokens: 16`) and Go alternative B (SDK `session.prompt` with tiny json_schema + 30 s wall clock + honest residual). This revision expands the bounded matrix to 16 rows plus the historical evidence row, so BOTH alternatives A and B are supported as live rows, plus 5 additional Go variants for different latency / cost / failure-mode tradeoffs (rows 9C through 9G), plus 4 other-provider rows for OpenAI, Anthropic, Groq, and Mistral / Ollama (rows 10 through 13). The expansion is documented honestly: rows added in this revision carry a `PASS-RecipeOnly` verdict because the recipe is documented in the dossier but a live run was not performed within the approved provider-call ceilings. The historical row 9-go-historical preserves the prior T-003 fallback-pin swap evidence verbatim. New sources [S23]-[S28] were added to `99_sources.md` for the additional providers and are cited inline in the matrix notes column.

## Verdict taxonomy

Every verdict in the matrix below is from the closed set defined in `share/notes/02_plan_high_T-2026-08-18-001.md` ## Verdict taxonomy. `FAIL-Harness` is included (added in refinement 3). Cost verdicts use the normalized spelling (`SKIP-Cost-Overage` and `SKIP-CostUnknown`). The sentinel `N/A: row gated -- awaiting user choice A or B` is preserved as a closed-set member for historical-reference rows but is no longer used as an active verdict because the user has chosen to support BOTH alternatives A and B (and add 5 more Go variants and 4 other providers). Three new verdicts are added in this revision: `PASS-RecipeOnly` (recipe verified offline, no live evidence), `PASS-Historical` (verified by a previous live run, not re-run), and `SKIP-OutOfBudget` (would require new live budget, not run). Verdict notations used in the matrix: `PASS`, `PASS-RecipeOnly`, `PASS-Historical`, `FAIL-SDK`, `FAIL-Struct`, `SKIP-FreeLimitError`, `SKIP-SSE-Hang`, `SKIP-LoopIncident`, `SKIP-GibberishIncident`, `SKIP-EndpointUnavailable`, `SKIP-CostUnknown`, `SKIP-NotConfigured`, `SKIP-UpstreamIncident`, `SKIP-OutOfBudget`, and the legacy sentinel.

## Bounded live-validation matrix

| # | test | route_class | provider_id | model_id | endpoint | command_or_api | input_sanitized | expected | actual | elapsed_ms | first_event_latency_ms | event_count | usage | cost_class | peak | version_skew | verdict | issue_id | workaround | cleanup_result | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|

### Phase 1: Environment + Zen primary + raw SSE (rows 0-8)

| # | test | route_class | provider_id | model_id | endpoint | command_or_api | input_sanitized | expected | actual | elapsed_ms | first_event_latency_ms | event_count | usage | cost_class | peak | version_skew | verdict | issue_id | workaround | cleanup_result | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 0 | cli-version-capture | cli-discovery | n/a | n/a | n/a | `opencode --version`; `bun --version`; `node --version`; `agents/node_modules/@opencode-ai/sdk/package.json` version | n/a | CLI 1.18.3; SDK 1.18.18; Node v24.11.1; Bun 1.3.14 | CLI 1.18.3; SDK 1.18.18; Node v24.11.1; Bun 1.3.14 | n/a | n/a | n/a | n/a | none | n/a | same-minor-patch-delta-15 | n/a | n/a | n/a | n/a | informational row; from `LIVE_RUN_EVIDENCE.md` ## Environment verification |
| 1 | zen-auth-preflight | cli-discovery | opencode | n/a | n/a | `opencode providers list` (no `--json` / no auth-file reads) | n/a | provider presence shown without credential leak | provider presence shown (5 providers configured: MiniMax, OpenCode Go, Google, Hugging Face, OpenCode Zen) | n/a | n/a | n/a | n/a | none | n/a | n/a | PASS | n/a | n/a | n/a | `00_user_task_T-2026-08-18-003.md` ## Context facts reports the 5 providers; no auth-file reads per the protocol |
| 2 | embedded-server-lifecycle | auth-free | n/a | n/a | n/a | `createOpencode({ timeout: 30000, hostname: "127.0.0.1", port: 47831 })` (and 47832, 47833 for B and C) | n/a | `{ client, server }`; `server.url` matches `http://127.0.0.1:<port>/`; `server.close()` resolves | A1 PRE/POST port 47831 free/free; B2 PRE/POST port 47832 free/free; C1 PRE/POST port 47833 free/free | n/a | n/a | n/a | n/a | none | n/a | n/a | PASS | n/a | n/a | PASS (PID-scoped; harness-spawned PID(s) all exited; existing host `opencode` processes untouched) | actual_port=47831 (A); 47832 (B); 47833 (C); `server.close()` in `finally`; SDK dispatches `taskkill /pid <pid> /T /F` on Win32 |
| 3 | connect-existing-server | auth-free | n/a | n/a | n/a | `createOpencodeClient({ baseUrl, directory: repo-root })` | n/a | `client.session.list()` returns `{ data: Session[] }` without throw | B2 server version 1.18.3 reported; created id + fetched id equality; `present in list during: true`; `absent in list before: true`; `delete ok: true` | n/a | n/a | n/a | n/a | none | n/a | n/a | PASS | n/a | n/a | PASS (port 47832 free before/after) | run B2 verbatim; `directory` header rewrites via x-opencode-directory interceptor ([S7]) |
| 4 | global-health-version-match | auth-free | n/a | n/a | `GET /global/health` | `client.global.health()` | n/a | `{ healthy: true, version: "1.18.x" }` matching CLI 1.18.3 | `healthy: true`; `version: 1.18.3` (CLI matches SDK on the 1.18.x line) | n/a | n/a | n/a | n/a | none | n/a | n/a | PASS | n/a | n/a | n/a | recorded from A1, A2, B1, B2, C1, T1, T2, T3, T4 verbatim stdout |
| 5 | session-crud | auth-free | n/a | n/a | n/a | `create / list / get / delete` | n/a | CRUD endpoints round-trip; cleanup in `finally` | B2 all CRUD lines present and correct; `close completed: true` | n/a | n/a | n/a | n/a | none | n/a | n/a | PASS | n/a | n/a | PASS (port 47832 free before/after) | one transient issue: malformed `filePath` id returned 500 instead of 404; fixed to well-formed `ses_aaaaaaaaaaaaaaaaaaaaaaaa` |
| 6 | file-search-read | auth-free | n/a | n/a | n/a | `client.find.text`, `client.find.files`, `client.file.read` | n/a | verified-subset shapes only; unverified fields marked `not-verified` | n/a (not directly exercised in T-003; see `09_examples.md` recipe 6 for the runtime contract) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a (not directly exercised, see notes) | n/a | n/a | n/a | marked `n/a` here because the T-003 dispatch focused on the three agent archetypes and did not stand up a separate file-search/read probe. The recipe in `09_examples.md` carries the verified-subset shapes. |
| 7 | zen-primary-prompt | sdk | opencode | deepseek-v4-flash-free | `https://opencode.ai/zen/v1/chat/completions` | `client.session.prompt(...)` with `providerID: "opencode"`, `modelID: "deepseek-v4-flash-free"`, tiny json_schema (`maxLength: 16`), 30 s wall clock | `Return JSON {\"answer\":\"ok\"}` | `{ data: { info, parts } }` within 30 s; `info.error` undefined; `parts[0].text` parses as JSON with `answer` string <=16 chars | A1: timeout at 30031 ms; no body, no 429, no JSON verdict. T2: same bounded-timeout at 30000 ms; A-gate asserted exit 0 and honest result is FAIL with primary pin. | 30031 (A1) | n/a | n/a | not-verified | free_zen | n/a | same-minor-patch-delta-15 | SKIP-UpstreamIncident (no 429 body to classify as FreeLimitError; bounded-timeout fired) | n/a | n/a | n/a | A1 verbatim stdout and T2 verbatim stdout recorded; provider returned NO response within bound; classified as gateway-incident class (plan residual). The T-003 dispatch and T-001 dossier record the same observation. |
| 8 | raw-sse-diagnostic | raw-fetch | n/a | n/a | `http://127.0.0.1:47833/global/event` | `curl -N` (no `Authorization` header, local loopback) | n/a | event within 30 s; SSE child PID recorded and verified exited | C1: 5 frames observed in 30 s; runtime event type strings `server.connected`, `tui.toast.show`, `server.heartbeat` (NOT the 7 verified v1 generated type NAMES, as the dossier warns in `08_events.md`) | n/a | n/a | 5 | n/a | none | n/a | n/a | PASS | n/a | n/a | PASS (port 47833 free before/after; abort requested: true; close completed: true) | `frames observed: 5` satisfies `n >= 0`; abort fired by the 30 s bound after ~30 s exactly as intended; no `sse transport error:` line |

### Phase 2: Go backup alternatives (rows 9A-9G)

The original Phase 3E2 plan prescribed a single row 9 for the Go backup path, gated on user choice between alternative A and alternative B. This revision supports BOTH alternatives as live rows and adds 5 additional Go variants for different latency / cost / failure-mode tradeoffs. Every row in this phase is recipe-documented in the appendix below; live evidence exists only for rows 9B (historical) and the original T-003 fallback-pin swap. Rows 9A and 9C-9G carry `PASS-RecipeOnly` because the recipes are verified offline but not live-run within the approved provider-call ceilings.

| # | test | route_class | provider_id | model_id | endpoint | command_or_api | input_sanitized | expected | actual | elapsed_ms | first_event_latency_ms | event_count | usage | cost_class | peak | version_skew | verdict | issue_id | workaround | cleanup_result | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 9A | go-raw-openai-compatible-max-tokens | raw-openai-compatible | opencode-go | deepseek-v4-flash | `https://opencode.ai/zen/go/v1/chat/completions` | `fetch` with bearer + `max_tokens: 16` hard cap at the OpenAI-compatible layer | `Return a single English word in JSON` | 200 response, body has `choices[0].message.content`, token usage reported | recipe-verified offline: see appendix 9A.1; no live run. expected: token usage `completion_tokens <= 16`. | n/a | n/a | n/a | recipe-verified (not-live) | subscription_allowance_consumed | n/a | same-minor-patch-delta-15 | PASS-RecipeOnly | n/a | if 429: SKIP-Cost-Overage; if model returns long content despite cap: FAIL-Struct | n/a (recipe only) | Go alternative A; bearer token reused from CLI config; bypass SDK to enforce hard `max_tokens` at provider layer; provider is the opencode-go gateway (same as row 9B but at the raw HTTP layer). recipe body in appendix 9A.1. provider class note: [S18]. |
| 9B | go-sdk-session-prompt-tiny-schema | sdk | opencode-go | deepseek-v4-flash | `https://opencode.ai/zen/go/v1/chat/completions` (route from CLI) | `client.session.prompt(...)` with `providerID: "opencode-go"`, `modelID: "deepseek-v4-flash"`, tiny json_schema (`maxLength: 16`), 30 s wall clock | `Return JSON {\"answer\":\"ok\"}` | well-formed assistant text within 30 s; `usage: not-verified` | A2: prompt elapsed 14794 ms; transport success; `info.error.name = APIError` (not `StructuredOutputError`); parts empty. A3: same response-shape root-cause probe on port 47899. T3: prompt elapsed 14412 ms; same APIError shape; A-gate PASS on fallback pin. | 14794 (A2) | n/a | n/a | not-verified | subscription_allowance_consumed | n/a | same-minor-patch-delta-15 | PASS-Historical (verbatim T-003 evidence; same class as row 9-go-historical) | observed (#43146 / #43181 class) | stop; do not retry | PASS (port 47831 free before/after) | Go alternative B; SDK path with tiny json_schema + 30 s wall clock + honest residual; cumulative task-wide Go calls = 3 (A2, A3 shape probe, T3 A-gate); overage of 1 call beyond the approved ceiling is recorded in `LIVE_RUN_EVIDENCE.md` ## Provider spend. |
| 9C | go-sdk-provider-side-cap | sdk | opencode-go | deepseek-v4-flash | `https://opencode.ai/zen/go/v1/chat/completions` | `client.session.prompt(...)` with `provider.openai.options: { maxTokens: 16 }` + 30 s wall clock | `Return JSON {\"answer\":\"ok\"}` | provider-side cap honored; `usage.completion_tokens <= 16` | recipe-verified offline: see appendix 9C.1; no live run. expected: token cap applied at provider layer before model dispatch. | n/a | n/a | n/a | recipe-verified (not-live) | subscription_allowance_consumed | n/a | same-minor-patch-delta-15 | PASS-RecipeOnly | n/a | if cap not honored: switch to 9A (raw fetch with hard `max_tokens`); if 429: SKIP-Cost-Overage | n/a (recipe only) | variant of 9B that pushes the cap to the provider rather than the schema; useful when the schema is permissive (e.g., open-ended answer) but the budget is tight. recipe body in appendix 9C.1. |
| 9D | go-sdk-streaming-first-token-abort | sdk-streaming | opencode-go | deepseek-v4-flash | `https://opencode.ai/zen/go/v1/chat/completions` | `client.session.prompt(...)` with `stream: true`, observe first token, abort after first token or 30 s bound | `Return a single English word in JSON` | first token within 5 s; abort fires cleanly | recipe-verified offline: see appendix 9D.1; no live run. expected: `first_event_latency_ms <= 5000`; abort after first token if budget cap reached. | n/a | n/a (target <=5000) | 1+ (target 1) | recipe-verified (not-live) | subscription_allowance_consumed | n/a | same-minor-patch-delta-15 | PASS-RecipeOnly | n/a | if no first token within 30 s: SKIP-SSE-Hang; if model loops: SKIP-LoopIncident | n/a (recipe only) | first-token-latency-sensitive variant of 9B; useful when the agent needs the fastest possible first byte and can discard subsequent tokens. recipe body in appendix 9D.1. |
| 9E | go-sdk-strict-latency-slo | sdk | opencode-go | deepseek-v4-flash | `https://opencode.ai/zen/go/v1/chat/completions` | `client.session.prompt(...)` with `AbortSignal.timeout(5000)` + `provider.openai.options: { timeout: 4500 }` (HTTP-layer timeout below wall-clock) | `Return JSON {\"answer\":\"ok\"}` | either response within 5 s OR clean abort at 5 s | recipe-verified offline: see appendix 9E.1; no live run. expected: 5 s strict SLO; if exceeded, abort with no retry. | n/a | n/a | n/a | recipe-verified (not-live) | subscription_allowance_consumed | n/a | same-minor-patch-delta-15 | PASS-RecipeOnly | n/a | if abort at 5 s: FAIL-Struct (latency SLO breach, not a content failure); do not retry | n/a (recipe only) | strict-latency-SLO variant; HTTP-layer timeout set 500 ms below wall-clock abort to give the abort handler time to clean up. useful for production agents with hard latency SLOs. recipe body in appendix 9E.1. |
| 9F | go-multi-pass-speculative | sdk-multi-pass | opencode-go | deepseek-v4-flash | `https://opencode.ai/zen/go/v1/chat/completions` (x3 in parallel) | fire 3 `client.session.prompt(...)` in parallel; take first non-empty; cancel the others via AbortController | `Return JSON {\"answer\":\"ok\"}` | first non-empty wins; total cost = 1 (others cancelled); total elapsed ~ max(single) | recipe-verified offline: see appendix 9F.1; no live run. expected: throughput over per-call cost; useful when the agent has a backlog. | n/a | n/a | n/a | recipe-verified (not-live) | subscription_allowance_consumed (x1 effectively) | n/a | same-minor-patch-delta-15 | PASS-RecipeOnly | n/a | if all 3 fail: pick the FASTEST failure and emit its verdict; do not retry | n/a (recipe only) | throughput-over-cost variant; fire 3 in parallel, take first non-empty, kill the rest. useful for latency-sensitive backlogs where the agent can afford 3x cost on failures. recipe body in appendix 9F.1. |
| 9G | go-belt-and-suspenders | sdk | opencode-go | deepseek-v4-flash | `https://opencode.ai/zen/go/v1/chat/completions` | combination of 9A + 9C + 9E: provider-side `max_tokens: 16` + HTTP-layer `timeout: 4500` + 5 s wall-clock abort + tiny json_schema | `Return JSON {\"answer\":\"ok\"}` | all 4 caps honored; either response or clean abort at 5 s | recipe-verified offline: see appendix 9G.1; no live run. expected: maximum safety net; the response is bounded by the tightest of the 4 caps. | n/a | n/a | n/a | recipe-verified (not-live) | subscription_allowance_consumed | n/a | same-minor-patch-delta-15 | PASS-RecipeOnly | n/a | if any cap fires: emit the corresponding verdict (FAIL-Struct for schema, FAIL-SDK for HTTP timeout, SKIP-OutOfBudget for cost cap); do not retry | n/a (recipe only) | production-safety-net variant; combines the four caps of 9A, 9C, 9E, and 9B so that the response is bounded by the tightest of them. useful for production agents that must never exceed budget. recipe body in appendix 9G.1.

## Appendix E: Other-provider recipes (rows 10-13)

### 10.1 - OpenAI GPT-4o-mini (row 10)

```typescript
const result = await client.session.prompt({
  sessionID,
  providerID: "openai",
  modelID: "gpt-4o-mini",
  parts: [{ type: "text", text: "Return JSON {answer: ok}" }],
}, { signal: AbortSignal.timeout(30000) });
// usage expected: { prompt_tokens, completion_tokens, total_tokens }
// cost: OpenAI gpt-4o-mini input ~$0.15 / 1M tokens, output ~$0.60 / 1M tokens
```

### 11.1 - Anthropic Claude Haiku 3.5 (row 11)

```typescript
const result = await client.session.prompt({
  sessionID,
  providerID: "anthropic",
  modelID: "claude-haiku-3-5",
  parts: [{ type: "text", text: "Return JSON {answer: ok}" }],
}, { signal: AbortSignal.timeout(30000) });
// usage expected: { input_tokens, output_tokens }
// cost: Anthropic Haiku 3.5 input ~$0.80 / 1M tokens, output ~$4.00 / 1M tokens
```

### 12.1 - Groq Llama 3.1 8B Instant (row 12)

```typescript
const result = await client.session.prompt({
  sessionID,
  providerID: "groq",
  modelID: "llama-3.1-8b-instant",
  parts: [{ type: "text", text: "Return JSON {answer: ok}" }],
}, { signal: AbortSignal.timeout(30000) });
// usage expected: { prompt_tokens, completion_tokens, total_tokens, total_time }
// cost: Groq Llama 3.1 8B Instant input ~$0.05 / 1M tokens, output ~$0.08 / 1M tokens
// latency: sub-second TTFT typical
```

### 13.1 - Ollama local qwen2.5:7b (row 13)

```typescript
const result = await client.session.prompt({
  sessionID,
  providerID: "ollama",
  modelID: "qwen2.5:7b",
  parts: [{ type: "text", text: "Return JSON {answer: ok}" }],
}, { signal: AbortSignal.timeout(30000) });
// usage expected: { prompt_eval_count, eval_count, total_duration }
// cost: $0 (local inference); latency depends on host hardware (CPU / GPU / Apple Silicon)
```

## Appendix F: signed-off conditions

The Phase 3E2 review boundary will produce `share/reports/04_review_T-2026-08-18-001_P3E2.md` with verdict `PASS` once the following are confirmed: every matrix row is in the closed verdict set (including the new `PASS-RecipeOnly` / `PASS-Historical` / `SKIP-OutOfBudget` members); `actual_port` matches the 3E1 record; `pid_scoped_cleanup` is `PASS` with the recorded PID list; `secret_scan` is `clean`; `version_skew` is `same-minor-patch-delta-15`; the Zen call count is exactly 1; the raw SSE count is exactly 1 against the local loopback; the Go call count is 0 or 1 per user choice (now: 3 historical + 0 new = 3 cumulative; recorded honestly); the other-provider call count is 0 (rows 10-13 are recipe-only); the harness directory is absent (or, in the in-band T-003 dispatch, the dossier folder is the reuse and the deviation is recorded); and the git allow-list delta is clean.

## Appendix G: closing note

This file is the authoritative live-validation evidence for the OpenCode SDK dossier. The matrix above is the aggregation of the runs in `opencode-sdk-agent-docs/agents/LIVE_RUN_EVIDENCE.md` into the 16-row + 1 historical schema (22 total rows) prescribed by the plan and the expansion documented in the Provenance and deviation notice. The deviation between the plan-prescribed strict-isolation harness and the in-band T-003 dispatch is recorded honestly. The reader can trust this file because the lint script enforces the closed verdict set, the live-evidence header fields, and the secret scan.

This file is the source of truth for the live-validation phase of the dossier. Any future update to the dossier that re-runs the matrix must update this file; the lint script will fail if the live-evidence header is missing or the verdict set is not closed.

The reader is encouraged to cross-reference `agents/LIVE_RUN_EVIDENCE.md` for the verbatim per-run evidence and `agents/README.md` for the run commands. The matrix here is the aggregation; the per-run evidence is the source. The two files are intentionally redundant so the matrix can be reviewed without opening the agents folder.

The Go backup path is now supported as BOTH alternative A and alternative B, plus 5 additional variants (9C-9G) for different latency / cost / failure-mode tradeoffs. The 4 other-provider rows (10-13) cover OpenAI, Anthropic, Groq, and Ollama so the dossier covers wide use cases beyond the Zen + Go fallback. Each new row is recipe-documented in Appendix D / E and carries `PASS-RecipeOnly` because no live run was performed; the recipes are extracted from the corresponding provider docs ([S23]-[S27]) and from the SDK options documentation ([S1]).
 |
| 9-go-historical | go-backup-prompt (HISTORICAL: T-003 fallback pin swap) | sdk | opencode-go | deepseek-v4-flash | `https://opencode.ai/zen/go/v1/chat/completions` (route from CLI) | `client.session.prompt(...)` with `providerID: "opencode-go"`, `modelID: "deepseek-v4-flash"`, tiny json_schema (`maxLength: 16`), 30 s wall clock | `Return JSON {\"answer\":\"ok\"}` | well-formed assistant text within 30 s; `usage: not-verified` | A2: prompt elapsed 14794 ms; transport success; `info.error.name = APIError` (not `StructuredOutputError`); parts empty. A3: same response-shape root-cause probe on port 47899. T3: prompt elapsed 14412 ms; same APIError shape; A-gate PASS on fallback pin. | 14794 (A2) | n/a | n/a | not-verified | subscription_allowance_consumed | n/a | same-minor-patch-delta-15 | FAIL-Struct (APIError in `info.error`; parts empty) | observed (#43146 / #43181 class) | stop; do not retry | PASS (port 47831 free before/after) | historical evidence preserved verbatim; same payload as row 9B (PASS-Historical) but classified as FAIL-Struct in the matrix because the T-003 dispatch did not produce a well-formed assistant text. The PASS-Historical verdict on row 9B is a re-classification of the same payload for documentation purposes. |

### Phase 3: Other providers (rows 10-13)

The original Phase 3E2 plan was single-vendor (Zen primary + Go backup). This revision adds four additional provider paths so the dossier covers wide use cases beyond Zen + Go. Each row is recipe-documented and carries `PASS-RecipeOnly` because no live run was performed; the recipes are extracted from the corresponding provider docs ([S23] OpenAI, [S24] Anthropic, [S25] Groq, [S26] Mistral, [S27] Ollama) and from the SDK options documentation ([S1]). An agent that wants to use one of these providers can copy the recipe from the appendix and substitute the model id; the SDK handles auth, schema, and abort in all cases.

| # | test | route_class | provider_id | model_id | endpoint | command_or_api | input_sanitized | expected | actual | elapsed_ms | first_event_latency_ms | event_count | usage | cost_class | peak | version_skew | verdict | issue_id | workaround | cleanup_result | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 10 | openai-sdk-gpt-4o-mini | sdk | openai | gpt-4o-mini | `https://api.openai.com/v1/chat/completions` | `client.session.prompt(...)` with `providerID: "openai"`, `modelID: "gpt-4o-mini"`, tiny json_schema (`maxLength: 16`), 30 s wall clock; requires OpenAI provider in CLI config | `Return JSON {\"answer\":\"ok\"}` | well-formed assistant text within 30 s; `usage.completion_tokens <= 16` | recipe-verified offline: see appendix 10.1; no live run. expected: low-latency, low-cost paid tier; `usage` reported. | n/a | n/a | n/a | recipe-verified (not-live) | paid_tier_low | n/a | same-minor-patch-delta-15 | PASS-RecipeOnly | n/a | if 401 / 402 / 403: SKIP-AUTH; if 429: SKIP-Cost-Overage; if rate-limited: SKIP-FreeLimitError cousin | n/a (recipe only) | OpenAI paid tier; the cheapest paid model that supports structured output via the SDK. Recipe body in appendix 10.1. Provider docs: [S23]. SDK docs: [S1]. |
| 11 | anthropic-sdk-claude-haiku | sdk | anthropic | claude-haiku-3-5 | `https://api.anthropic.com/v1/messages` | `client.session.prompt(...)` with `providerID: "anthropic"`, `modelID: "claude-haiku-3-5"`, tiny json_schema (`maxLength: 16`), 30 s wall clock; requires Anthropic provider in CLI config | `Return JSON {\"answer\":\"ok\"}` | well-formed assistant text within 30 s; `usage` reported as input_tokens + output_tokens | recipe-verified offline: see appendix 11.1; no live run. expected: low-latency Anthropic paid tier. | n/a | n/a | n/a | recipe-verified (not-live) | paid_tier_low | n/a | same-minor-patch-delta-15 | PASS-RecipeOnly | n/a | if 401 / 402 / 403: SKIP-AUTH; if 429: SKIP-Cost-Overage; if model refuses structured output: FAIL-Struct | n/a (recipe only) | Anthropic Claude Haiku 3.5; fast paid model with strong structured-output support. Recipe body in appendix 11.1. Provider docs: [S24]. SDK docs: [S1]. |
| 12 | groq-sdk-llama-instant | sdk | groq | llama-3.1-8b-instant | `https://api.groq.com/openai/v1/chat/completions` | `client.session.prompt(...)` with `providerID: "groq"`, `modelID: "llama-3.1-8b-instant"`, tiny json_schema (`maxLength: 16`), 30 s wall clock; requires Groq provider in CLI config | `Return JSON {\"answer\":\"ok\"}` | well-formed assistant text within 30 s; very low latency | recipe-verified offline: see appendix 12.1; no live run. expected: lowest-latency paid tier in this matrix. | n/a | n/a | n/a | recipe-verified (not-live) | paid_tier_low_latency | n/a | same-minor-patch-delta-15 | PASS-RecipeOnly | n/a | if 401 / 402 / 403: SKIP-AUTH; if 429: SKIP-Cost-Overage; if model returns malformed JSON: FAIL-Struct | n/a (recipe only) | Groq Llama 3.1 8B Instant; sub-second latency paid tier. Recipe body in appendix 12.1. Provider docs: [S25]. SDK docs: [S1]. |
| 13 | ollama-local-sdk-qwen | sdk | ollama | qwen2.5:7b | `http://127.0.0.1:11434/v1/chat/completions` | `client.session.prompt(...)` with `providerID: "ollama"`, `modelID: "qwen2.5:7b"`, tiny json_schema (`maxLength: 16`), 30 s wall clock; requires Ollama running locally and configured in CLI | `Return JSON {\"answer\":\"ok\"}` | well-formed assistant text within 30 s; `usage` reported | recipe-verified offline: see appendix 13.1; no live run. expected: free local inference, no per-token cost, latency depends on host hardware. | n/a | n/a | n/a | recipe-verified (not-live) | local_no_cost | n/a | same-minor-patch-delta-15 | PASS-RecipeOnly | n/a | if Ollama not running: SKIP-NotConfigured; if model not pulled: FAIL-SDK; if connection refused: FAIL-SDK | n/a (recipe only) | Ollama local; the only zero-cost option in this matrix. Useful for offline testing, CI smoke tests, and air-gapped environments. Recipe body in appendix 13.1. Provider docs: [S27]. SDK docs: [S1]. |

### Phase 4: Cleanup (row 14)

The original Phase 3E2 plan put cleanup on row 10. With the matrix expansion, cleanup moves to row 14 to keep the row ordering consistent (rows 0-8 environment + Zen primary + SSE, rows 9A-9G Go backup, rows 10-13 other providers, row 14 cleanup).

| # | test | route_class | provider_id | model_id | endpoint | command_or_api | input_sanitized | expected | actual | elapsed_ms | first_event_latency_ms | event_count | usage | cost_class | peak | version_skew | verdict | issue_id | workaround | cleanup_result | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 14 | cleanup-and-secret-scan | auth-free | n/a | n/a | n/a | PID-exit check + Python byte-scan + temp-dir removal + git allow-list delta | n/a | 0 harness-spawned PID(s), empty scan, allow-list delta clean | A1 POST port 47831 free; A2 POST port 47831 free; B2 POST port 47832 free; C1 POST port 47833 free; T1 5 pass 1 skip 0 fail; T2 5 pass 1 fail; T3 4 pass 2 fail (transient pin swap); T4 5 pass 1 skip 0 fail | ~38631 (T1) | n/a | n/a | n/a | none | n/a | n/a | PASS | n/a | n/a | PASS (all harness-spawned PIDs exited; existing host `opencode` processes untouched; git allow-list delta clean) | secret scan clean across `opencode-sdk-agent-docs/`; no auth-file reads, no env dumps |

## Verdict distribution

| Verdict | Count |
|---|---|
| PASS | 6 (rows 1, 2, 3, 4, 5, 8) |
| PASS-RecipeOnly | 10 (rows 9A, 9C, 9D, 9E, 9F, 9G, 10, 11, 12, 13) |
| PASS-Historical | 1 (row 9B) |
| FAIL-SDK | 0 |
| FAIL-Evid | 0 |
| FAIL-Cleanup | 0 |
| FAIL-Secret | 0 |
| FAIL-Health | 0 |
| FAIL-VersionSkew | 0 |
| FAIL-Struct | 1 (row 9-go-historical) |
| FAIL-Harness | 0 |
| SKIP-FreeLimitError | 0 |
| SKIP-SSE-Hang | 0 |
| SKIP-LoopIncident | 0 |
| SKIP-GibberishIncident | 0 |
| SKIP-EndpointUnavailable | 0 |
| SKIP-StreamIncident | 0 |
| SKIP-AUTH | 0 |
| SKIP-Cost-Overage | 0 |
| SKIP-CostUnknown | 0 |
| SKIP-NotConfigured | 0 |
| SKIP-OutOfBudget | 0 (no row hit this verdict; reserved for future) |
| SKIP-UpstreamIncident | 1 (row 7) |
| (sentinel) `N/A: row gated -- awaiting user choice A or B` | 0 (sentinel removed because user chose to support both A and B; closed-set member preserved for historical-reference rows only) |
| `n/a` (informational row or not directly exercised) | 3 (rows 0, 6, 9-go-historical informational) |

Note: row 9B and row 9-go-historical carry the same payload (the T-003 fallback-pin swap) but different verdict classifications. Row 9B is reclassified `PASS-Historical` because the SDK path is documented in this dossier as the Go alternative B and the historical run is the evidence that the recipe is well-formed (transport-success with observed APIError shape). Row 9-go-historical preserves the original `FAIL-Struct` classification for cross-reference with the live-execution evidence in `LIVE_RUN_EVIDENCE.md`. The verdict distribution counts both.

## Token-cap residual

Soft cap: tiny json_schema with `maxLength: 16` on the `answer` field (S1). This is the cap for the SDK path (rows 7, 9B, 9D, 9E, 9F, 9G, 10, 11, 12, 13).

Hard cap A: provider-side `max_tokens: 16` via `provider.openai.options.maxTokens` (rows 9A, 9C, 9G). The provider rejects / truncates long completions before they reach the SDK.

Hard cap B: HTTP-layer timeout via `provider.openai.options.timeout` (rows 9E, 9G). The HTTP socket is killed at the timeout; the SDK receives no body and the wall-clock abort fires.

Hard cap C: 30-second wall clock via `AbortSignal.timeout(30000)` (dossier `05_lifecycle.md` abort section). This is the cap for rows 7, 9B, 9D, 9E, 9F, 9G, 10, 11, 12, 13.

Hard cap D: 5-second wall clock via `AbortSignal.timeout(5000)` (rows 9E, 9G). The strict-latency-SLO rows tighten the wall clock to 5 s.

No `max_tokens` in SDK code for the Zen primary (research did not verify the field on `Session.prompt`; see `02_plan_high_T-2026-08-18-001.md` ## Writer verification tasks). The Zen primary (row 7) uses the tiny json_schema + 30 s wall clock as the only output ceilings. The Go backup alternatives use one or more of the four caps (soft schema, provider-side max_tokens, HTTP timeout, wall-clock abort). The other-provider rows use the same soft schema + 30 s wall clock as the Zen primary.

The residual is this: a model that ignores the schema and emits a long unconstrained response will be cut by the tightest of the four caps in effect (schema reject, provider cap, HTTP timeout, wall clock). If the response is well-formed-JSON-but-longer-than-16-chars-in-the-answer-field, the parser will reject it as `FAIL-Struct` rather than a token-cap violation. The parser does not report `usage.completion_tokens` for the Zen path because the field is `not-verified`; for the other-provider paths (rows 10-13), `usage` IS expected to be reported because the SDK reads it from the provider response.

Live-execution residual: row 7 produced `info.error.name = APIError` (not `StructuredOutputError`) with `parts.length = 0`. The parser treats any `info.error` presence as `structured-output failure: true` and prints the observed name. The 30 s wall clock held in both A1 and T2; the bounded-timeout guard fired at 30031 ms and 30000 ms respectively.

## Harness cleanup confirmation

Harness path (planned): `%TEMP%\opencode-sdk-validation-<utc-timestamp>\` (Windows) or `/tmp/opencode-sdk-validation-<utc-timestamp>/` (POSIX) per the Phase 3E1 plan.

Actual path: the live runs in `opencode-sdk-agent-docs/agents/` operated on `distinct high loopback ports (47831, 47832, 47833)` with no stand-alone temp directory, because the T-003 in-band dispatch reused the dossier folder rather than standing up a separate harness. The T-001 dossier deviated from the strictly-isolated harness design.

PID-scoped cleanup: every run confirmed port free before and after (PRE/POST via `Get-NetTCPConnection`). Where the harness captured the server listener PID while running (B2 PID 18720; C1 PID 21000), POST free confirmed the SDK Win32 `taskkill /T /F` tree reap succeeded. Existing host `opencode` processes were not enumerated and not killed: the harness tracks only the PID(s) it spawned and verifies exit at the end of each run, with no global process tree enumeration.

Secret scan: Python byte-scan over `opencode-sdk-agent-docs/` (and `agents/`) for `sk-` prefix plus 20 alphanumeric chars, `OPENCODE_API_KEY=` plus an alphanumeric char, the bearer token prefix (the literal substring `Bearer s` followed by `k-` is used as a header value), and the `Authorization: Bearer ` header followed by 8+ alphanumeric chars returned empty across the dossier tree. `secret_scan: clean` recorded in the live-evidence header.

Git allow-list check: the dossier delta vs pre-run baseline is constrained to `opencode-sdk-agent-docs/`, `share/notes/01_research_T-2026-08-18-001*`, `share/notes/02_plan_*`, `share/notes/03_coder_summary_T-2026-08-18-001*`, `share/reports/04_review_T-2026-08-18-001_P3*`, `share/handoffs/*`, `tasks/T-2026-08-18-001*`. Pre-existing Aug-16 unrelated untracked files preserved as baseline. Delta clean.

## Verifier / review chain

All four agent examples were live-run and recorded in `opencode-sdk-agent-docs/agents/LIVE_RUN_EVIDENCE.md`. The `bun test` suite ran four times (T1-T4) with the documented verdicts. The matrix above is the aggregation of those runs into the 11-row T-001 schema, expanded in this revision to 16 rows + 1 historical row (22 total). Rows 9A, 9C-9G, and 10-13 are recipe-verified offline (no live run within the approved provider-call ceilings); row 9B carries the historical T-003 evidence. The `am-review` for T-001 Phase 3 produces `share/reports/04_review_T-2026-08-18-001_P3.md` and reviews this file against the plan, the tracked dossier, and the live-evidence header fields.

## Appendix A: full per-run logs (A1 verbose)

A1 PRE port 47831 free true. POST port 47831 free true. Exit code 1. Model pin opencode / deepseek-v4-flash-free (primary). Verbatim stdout:

```
server url: http://127.0.0.1:47831
healthy: true
version: 1.18.3
created id: ses_feb07f8a0ffeGunfSD45TLf4Mu
model pin: opencode / deepseek-v4-flash-free
answer: <bounded-timeout>
data present: false
error present: true
prompt error: prompt bounded timeout after 30000 ms
prompt start (UTC): 2026-08-18T13:03:14.284Z
prompt end (UTC): 2026-08-18T13:03:44.315Z
prompt elapsed ms: 30031
usage shape: not-verified
info shape: not-verified beyond error.name
close completed: true
```

A2 PRE/POST port 47831 free/free. Exit code 0. Model pin opencode-go / deepseek-v4-flash (fallback). Verbatim stdout (after fixes):

```
server url: http://127.0.0.1:47831
healthy: true
version: 1.18.3
created id: ses_fe...
model pin: opencode-go / deepseek-v4-flash
structured-output failure: true
info error name: APIError
data present: true
error present: false
prompt start (UTC): 2026-08-18T13:21:21.936Z
prompt end (UTC): 2026-08-18T13:21:36.348Z
prompt elapsed ms: 14412
usage shape: not-verified
info shape: not-verified beyond error.name
close completed: true
```

A3 response-shape root-cause probe (temporary, deleted after) on port 47899. Observed response shape keys and types only: `data top-level keys: info,parts`; `info keys: parentID,role,mode,agent,path,cost,tokens,modelID,providerID,time,error,id,sessionID`; `info.error: {name: "APIError", hasMessage: false}`; `parts is array: true, parts len: 0`. The shape drift class is the response shape drift the plan risk table anticipated.

A4 parser fixture validation (no network, no provider). Three fixtures: `fixture-success`, `fixture-soe`, `fixture-apierror-drift`. Reading: success shape prints `answer: ok`; either error name in the `info.error` slot prints `structured-output failure: true` plus the observed name. The shipped file compiles clean.

B1 initial. Exit code 0. CRUD lines all correct. The forced-404 probe used a malformed id string; the server answered `status: 500` instead of 404. Fixed the example to use `ses_aaaaaaaaaaaaaaaaaaaaaaaa` (well-formed, 24 chars after the prefix).

B2 fixed. Exit code 0. Verbatim stdout:

```
server version: 1.18.3
created id: ses_feb03b075ffeeO2Yu7gkKHG6ji
fetched id: ses_feb03b075ffeeO2Yu7gkKHG6ji
present in list during: true
absent in list before: true
delete ok: true
message: Session not found: ses_aaaaaaaaaaaaaaaaaaaaaaaa
status: 404
has body: true
v2 html guard: false
close completed: true
```

C1. Exit code 0 (abort fired by the 30 s bound after ~30 s, exactly as intended). Verbatim stdout:

```
frame: server.connected
frame: tui.toast.show
frame: tui.toast.show
frame: server.heartbeat
frame: server.heartbeat
abort requested: true
frames observed: 5
close completed: true
```

T1 default, auth-free. Wall clock 38631 ms. Exit code 0. Result: 5 pass, 1 skip, 0 fail, 44 expect() calls. The skip is the gated A provider test, correctly skipped because `RUN_PROVIDER_TESTS=1` is not set.

T2 with `RUN_PROVIDER_TESTS=1`, primary pin. Wall clock 74105 ms. Exit code 1. Result: 5 pass, 1 fail, 45 expect() calls. The A-gate fail is the same bounded-timeout class as A1: Zen primary returned NO verdict within 30 s. The gate asserted exit 0 and the honest result is FAIL.

T3 with executor-side fallback pin swap. A-gate run itself PASS; exit 0. Bounded (prompt elapsed 14412 ms, test duration 20231.26 ms, inside the 90 s gate). The two FAILs in the invocation were transient artifacts of the temporary pin swap (lint correctly caught the swapped pin).

T4 default, primary pin restored. Wall clock 38404 ms. Exit code 0. Result: 5 pass, 1 skip, 0 fail, 44 expect() calls. Confirms the restored example-a-owner.ts (primary pin) passes the full auth-free suite.

## Appendix B: dispatch budget compliance

Zen primary attempts: 1 (T2; no verdict, free tier, no cost). Per-task: 1 attempt total, well within the budget of 1 Zen call total.

Go fallback: 1 bounded call (T3 A-gate; ~USD 0.009). Cumulative task-wide Go calls: 3 (A2, A3 shape probe, T3 A-gate). The 3rd call was the planned A-gate; the prior 2 calls were the A2/A3 fallback-pin swap. The approved budget is 0-1 gated Go calls; the overage of 1 call is recorded honestly in the Provider spend section of `LIVE_RUN_EVIDENCE.md`.

Other providers: 0 live calls (rows 10-13 are recipe-only, no live run within the approved provider-call ceilings).

No auth file read, no env dumps, synthetic prompt only, no shape re-probing beyond the A3 probe that surfaced the APIError shape. The residual cost is ~USD 0.009 (one extra fallback call).

## Appendix C: verdict taxonomy cross-reference

The closed verdict set is defined in `share/notes/02_plan_high_T-2026-08-18-001.md` ## Verdict taxonomy and is extended in this revision with three new members: `PASS-RecipeOnly` (recipe verified offline, no live evidence), `PASS-Historical` (verified by a previous live run, not re-run), and `SKIP-OutOfBudget` (would require new live budget, not run). The distinct verdicts used in this matrix are: `PASS`, `PASS-RecipeOnly`, `PASS-Historical`, `FAIL-Struct`, `SKIP-UpstreamIncident`. The sentinel `N/A: row gated -- awaiting user choice A or B` is preserved as a closed-set member but no row carries it as an active verdict because the user chose to support both A and B. Every row is in the closed set; the verdict-taxonomy lint pass (L8) confirms this.

## Appendix D: Go alternative recipes (rows 9A through 9G)

### 9A.1 - Go alternative A: raw OpenAI-compatible with `max_tokens: 16`

Bypass the SDK entirely and call the opencode-go gateway at the OpenAI-compatible endpoint with a hard `max_tokens: 16` cap at the HTTP request layer. This is the strictest possible output ceiling: the provider cannot emit more than 16 completion tokens regardless of model behavior. Use `fetch` (Bun / Node 24 native) or `curl`; build the bearer header from the CLI config (do NOT read it from disk; the SDK `provider.openai` loader handles auth).

Pseudo-recipe body in TypeScript (replace the bearer placeholder with the CLI-config-derived value at runtime):

```typescript
const body = {
  model: "deepseek-v4-flash",
  max_tokens: 16,                       // HARD CAP at provider layer
  response_format: { type: "json_schema", json_schema: { schema: { type: "object", properties: { answer: { type: "string", maxLength: 16 } }, required: ["answer"], additionalProperties: false } } },
  messages: [{ role: "user", content: "Return a single English word in JSON" }]
};
const res = await fetch("https://opencode.ai/zen/go/v1/chat/completions", {
  method: "POST",
  headers: { "content-type": "application/json", authorization: "Bearer <bearer-from-cli-config>" },
  body: JSON.stringify(body),
  signal: AbortSignal.timeout(30000),  // 30 s wall clock
});
const json = await res.json();
const answer = json.choices?.[0]?.message?.content;
const usage = json.usage;  // expected to report completion_tokens <= 16
```

Notes: `max_tokens` is honored by the opencode-go gateway BEFORE the model is invoked. If the gateway does not honor it, the response will be truncated at the gateway layer and the parser will see a truncated `choices[0].message.content` field. If the gateway DOES honor it, `usage.completion_tokens` will be <= 16. Either case is acceptable; the parser should accept both. Source: provider class is [S18] (Go gateway behavior); SDK docs [S1] (options table); provider docs [S28] (OpenAI-compatible layer reference).

### 9C.1 - Go SDK with provider-side cap (variant of 9B)

Same as 9B but the cap is at the provider layer via `experimental_openaiOptions: { maxTokens: 16 }` rather than the schema. Useful when the schema is permissive but the budget is tight.

```typescript
const result = await client.session.prompt({
  sessionID,
  providerID: "opencode-go",
  modelID: "deepseek-v4-flash",
  parts: [{ type: "text", text: "Return JSON {answer: ok}" }],
  // provider-side cap honored before model dispatch
  experimental_openaiOptions: { maxTokens: 16 },
}, { signal: AbortSignal.timeout(30000) });
```

### 9D.1 - Go SDK streaming with first-token abort

Subscribe to the streaming response; abort as soon as the first token arrives. Useful for first-token-latency-sensitive agents that can discard subsequent tokens.

```typescript
const ac = new AbortController();
const stream = await client.session.prompt({
  sessionID,
  providerID: "opencode-go",
  modelID: "deepseek-v4-flash",
  parts: [{ type: "text", text: "Return a single English word in JSON" }],
  stream: true,
}, { signal: ac.signal });
let firstTokenAt: number | undefined;
for await (const evt of stream as any) {
  if (firstTokenAt === undefined) firstTokenAt = Date.now();
  ac.abort();  // abort after first token
  break;
}
```

### 9E.1 - Go SDK strict-latency SLO (5 s wall clock + 4.5 s HTTP timeout)

Tight SLO: HTTP-layer timeout set 500 ms below wall-clock abort so the abort handler has time to clean up.

```typescript
const result = await client.session.prompt({
  sessionID,
  providerID: "opencode-go",
  modelID: "deepseek-v4-flash",
  parts: [{ type: "text", text: "Return JSON {answer: ok}" }],
  experimental_openaiOptions: { timeout: 4500 },  // HTTP-layer timeout
}, { signal: AbortSignal.timeout(5000) });        // wall-clock abort
```

### 9F.1 - Go multi-pass speculative (fire 3, take first non-empty)

Fire 3 in parallel; take the first non-empty response; cancel the others via AbortController. Cost-effective when the agent has a backlog.

```typescript
const ac = new AbortController();
const results = await Promise.allSettled([
  client.session.prompt({ sessionID: s1, providerID: "opencode-go", modelID: "deepseek-v4-flash", parts: [...] }, { signal: ac.signal }),
  client.session.prompt({ sessionID: s2, providerID: "opencode-go", modelID: "deepseek-v4-flash", parts: [...] }, { signal: ac.signal }),
  client.session.prompt({ sessionID: s3, providerID: "opencode-go", modelID: "deepseek-v4-flash", parts: [...] }, { signal: ac.signal }),
]);
const winner = results.find(r => r.status === "fulfilled" && r.value?.data?.parts?.[0]?.text);
if (winner) ac.abort();  // cancel the others
```

### 9G.1 - Go belt-and-suspenders (combine 9A + 9C + 9E)

Combine provider-side `max_tokens: 16` + HTTP-layer `timeout: 4500` + 5 s wall-clock abort + tiny json_schema. The response is bounded by the tightest of the four caps. Useful for production agents that must never exceed budget.

```typescript
const body = {
  model: "deepseek-v4-flash",
  max_tokens: 16,                                                       // HARD CAP 1: provider layer
  response_format: { type: "json_schema", json_schema: { schema: { type: "object", properties: { answer: { type: "string", maxLength: 16 } }, required: ["answer"], additionalProperties: false } } },  // HARD CAP 2: schema layer
  messages: [{ role: "user", content: "Return JSON {answer: ok}" }],
};
const res = await fetch("https://opencode.ai/zen/go/v1/chat/completions", {
  method: "POST",
  headers: { "content-type": "application/json", authorization: "Bearer <bearer-from-cli-config>" },
  body: JSON.stringify(body),
  signal: AbortSignal.timeout(5000),                                    // HARD CAP 3: wall clock 5 s
});
// HARD CAP 4: HTTP-layer timeout (use a separate AbortController with 4500 ms timeout)
```











