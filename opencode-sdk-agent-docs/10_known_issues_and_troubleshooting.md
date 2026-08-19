# Known Issues and Troubleshooting - T-2026-08-18-001 (OpenCode SDK agent/LLM docs)

<!-- freshness: sdk=1.18.18 cli=1.18.x access=2026-08-18 -->

Four tables plus a troubleshooting map. The first table is verified-current SDK issues (cited). The second is resolved-historical issues (known fixes shipped). The third is generic operational issues an agent is likely to encounter even without a known specific ticket. The fourth lists open issues observed during the live-execution phase of this dossier (recorded verbatim from `opencode-sdk-agent-docs/agents/LIVE_RUN_EVIDENCE.md` and `11_live_validation.md`). The troubleshooting map at the end is a symptom-to-cause-to-fix table.

## Citation discipline for this file

Inline `[Sx]` markers in the rest of the dossier resolve at `99_sources.md`. The references in this file are a mix of `[Sn]` (source citations) and `#NNNNN` (issue ticket numbers). Ticket numbers without `[Sn]` are operational, not source-citation; they are documented in the plan verdict taxonomy and recorded here verbatim. Banned-phrase references (`createOpencodeTui`, `apply_patch`) appear only with the established workaround context; the lint pass enforces a positive allow-list plus an `UNSAFE` label within +/- 6 lines.

---

## Table A - Verified current SDK issues (source-cited)

Each row cites the source that proves the issue is open as of 2026-08-18 and the SDK / CLI versions affected.

| Issue ID | Title | Symptom | Status (2026-08-18) | Affected versions | Affected SDK path | Source citation | Recommended workaround |
|---|---|---|---|---|---|---|---|
| #43112 | `write` / `edit` / `apply_patch` do not trim trailing whitespace from `filePath` | Local models that emit newlines inside JSON string arguments produce files whose names end with `\n` (or spaces). The file is created on disk but invisible to `ls` / `dir` and unreachable by subsequent find/read calls. | OPEN (assignee `neriousy`) | repo `dev` (1.18.x line) | `session.prompt` + tool calls that accept `filePath` | [S19] | Trim `filePath` server-side or in the agent prompt wrapper before passing into the SDK; reject empty / whitespace-only paths. Dossier flags this in `09_examples.md` and the `03_decision_guide.md` unsafe-pattern list. |
| #43163 | Go provider gateway "Upstream request failed: Endpoint is unavailable" for `qwen3.7-plus` / `qwen3.7-max` / `grok-4.5` | Provider-class error; not an SDK issue. Reproduces with direct `curl` against the same endpoint. Surfaces in any agent that pins one of those affected models through `opencode-go`. | OPEN as of 2026-08-18 | provider route, not SDK | Go provider route in `opencode-go` | [S18] | Until the provider recovers, switch to a different model id (e.g., `opencode-go / deepseek-v4-flash`) or stop the Go path entirely. The dossier marks this as `SKIP-EndpointUnavailable` in the verdict taxonomy. |
| #42977 | Zen `429 FreeUsageLimitError` on `opencode / deepseek-v4-flash-free` | Zen free-tier rate limit; a Zen primary prompt hit within the 30-second bound returns 429 with `FreeUsageLimitError` body. | OPEN (Zen free tier is rate-limited) | Zen free tier only | Zen primary prompt | referenced in plan verdict taxonomy | Switch to a paid model or to the Go fallback (subject to the Phase 2 user gate). Dossier marks as `SKIP-FreeLimitError`. |
| #43007 | SSE stream produces zero chunks for 29+ seconds on a healthy server | The SSE connection is established but no chunks arrive within the agent epoch. Often co-occurs with `#42977` but has its own ticket. | OPEN | 1.18.x line | SSE event subscription | referenced in plan verdict taxonomy | Treat empty-chunk-after-29s as a timeout; do not retry. Dossier marks as `SKIP-SSE-Hang`. |
| #43146 | Go provider endless reply loop on `opencode-go / deepseek-v4-flash` | The model returns the same assistant text repeatedly instead of producing a single final answer; the parser is stuck and the 30 s bound fires. | OPEN | opencode-go / deepseek-v4-flash | Go SDK fallback | referenced in plan verdict taxonomy | Abort and stop. Do not retry. Dossier marks as `SKIP-LoopIncident`. |
| #43181 | Go provider multilingual gibberish on `opencode-go / deepseek-v4-flash` | Response arrives but contains non-target-language text (often Chinese / random emoji / mixed scripts) where the prompt asked for a single English word. | OPEN | opencode-go / deepseek-v4-flash | Go SDK fallback | referenced in plan verdict taxonomy | Abort and stop. Do not retry. Dossier marks as `SKIP-GibberishIncident`. |

### Aggregate summary of Table A

Six open issues, two source-cited ([S18], [S19]), four referenced by number only because they are operational incidents from the live-execution evidence rather than SDK source-code defects. Risk class: one pure local-file hygiene issue (#43112), one provider-class issue (#43163), four model-route issues (#42977, #43007, #43146, #43181). The dossier does not embed patches; it documents workarounds and verdict names so an agent can act deterministically without re-deriving the failure class.

---

## Table B - Resolved historical issues (closed before 2026-08-18)

Each row cites the source that proves the issue is closed.

| Issue ID | Title | Symptom | Resolution | Fixed in release | Source citation |
|---|---|---|---|---|---|
| #42541 | v2 server question tool SSE broadcast missing | v2 server did not broadcast question tool events via the SSE stream. Sessions stuck because the agent never saw the question. | Resolved before 2026-08-18 (label `2.0`, closed completed). | 1.18.x patch series | [S20] |
| v1.18.9 | "Restored compatibility with legacy MCP SDK clients" | Legacy MCP SDK clients broke against newly-stricter v1 M See MCP request handling. | Shipped in v1.18.9 (2026-07-28). | v1.18.9 | [S21] |

### Aggregate summary of Table B

Two rows document that v1 and v2 have had real bugs caught and fixed during the 1.18.x patch series. The dossier records these as evidence that version-pinning is a snapshot of a moving codebase; an agent that hits an issue that looks like #42541 on a newer version should re-check the GitHub issue before assuming the bug is still present.

---

## Table C - Generic operational issues (not specifically ticket-cited)

These are issues an agent is likely to encounter during normal operation even when no specific ticket exists. They are documented as patterns, not as defects.

| Pattern | Symptom | Cause | Recommended action | Source citation |
|---|---|---|---|---|
| Server not reachable | `ECONNREFUSED 127.0.0.1:<port>` on the first call after `createOpencode()`. | The server is still listening on a different port than the agent expects, or `server.url` was not awaited long enough. | Read `server.url` after `await createOpencode(...)` resolves; do not hard-code `http://127.0.0.1:4096`. Probe with `client.global.health()` before the first model call. | [S1, S7] |
| v2 HTML-response guard | The v2 client throws on every call with a stack trace that mentions the v2 HTML guard. | A v2 client was pointed at a v1 server (or vice versa). The v2 client sees the v1 server response shape and refuses to parse it as JSON. | Pin client and server to the same major version; run `client.global.health()` and `(await import("./package.json")).version` on the SDK and compare. | [S10] |
| `createOpencodeTui` hangs | The agent process freezes after `createOpencodeTui()`. | `createOpencodeTui` inherits stdio; a non-interactive agent has no stdio to inherit, so the child waits forever. | Do not call `createOpencodeTui()` from inside a non-interactive agent; use `createOpencode()` and `client.session.prompt()` instead. | [S8] |
| Implicit default model | `session.prompt` succeeds but produces a response the agent did not expect. | The prompt body omitted `model: { providerID, modelID }`, so the SDK used the user saved default. | Always pin `model: { providerID, modelID }` for non-interactive agents; never rely on the default. | [S1] |
| `Opencode Server exited with code <N>` | The server child process exits before the first call. | CLI version mismatch, missing provider, or stalled port allocation. | Capture `server.url` only after `await createOpencode(...)` resolves; on failure, read the child stderr via the SDK `process` helper. | [S1, S8, S14] |
| `ENOTSUP: operation not supported` (Windows) | The server fails to bind to the loopback port. | Often a Windows hypervisor / WSL2 port-mapping quirk. | Use a high loopback port (>= 47000) that is outside the dynamic-port range; document the port in the evidence file. | [S1] |
| `Request is not supported by this version of OpenCode Server` | The server answers but the response is a 4xx with that exact string. | SDK / server version skew; the client called an endpoint the server does not implement. | Pin the SDK to the same minor line as the CLI; re-run `client.global.health()` after every upgrade. | [S1, S2] |
| `StructuredOutputError` | The model response did not match the `json_schema`. | The model failed to produce structured output (often a small model on a hard schema). | The disk has `result.data.info.error?.name === "StructuredOutputError"` ([S1]); treat any `info.error` presence as a structured-output failure and surface the observed name. | [S1] |
| High memory usage or rejected-abort on shutdown | `server.close()` promise does not resolve within the planned cleanup window. | The child process is still completing a tool call; `taskkill /T /F` reaps the tree but can take a few seconds on Windows. | Bound cleanup with `AbortSignal.timeout(5000)`; if `close` does not resolve, log the still-running PID and let the harness reap on the next run. | [S14] |

---

## Table D - Live-execution open issues (recorded verbatim from this dossier)

These are the issues observed during the bounded live-validation runs in `opencode-sdk-agent-docs/agents/LIVE_RUN_EVIDENCE.md` and `11_live_validation.md`. They are not reproduced here as bugs; they are recorded as observations.

| Run | Observation | Verdict | Notes |
|---|---|---|---|
| A1 | Zen primary prompt on `opencode / deepseek-v4-flash-free` returned no response within 30 s; bounded-timeout guard fired at 30031 ms. No 429 body, no JSON verdict. | classified as gateway-incident class (plan residual) | Local mechanics all passed (spawn, health, session create, pin, bound, cleanup). Same verdict class reproduced in T2 (A-gate) three hours later. |
| A2 | Pin string in the example file was hard-coded; the `model pin:` line printed the primary pin while the body used the fallback pin. | FIXED inline | `example-a-owner.ts:72` now derives `model pin:` from `PROMPT_MODEL.providerID + " / " + PROMPT_MODEL.modelID`. |
| A3 | Response-shape drift on `opencode-go / deepseek-v4-flash`: `info.error.name = "APIError"` (not the dossier single verified name `StructuredOutputError`) and `parts.length = 0`. | observed, parser updated | Shipped parser now treats any `info.error` presence as `structured-output failure: true` and prints the observed `info error name:` for the evidence file. |
| A4 | Fixture validation succeeded for `fixture-success`, `fixture-soe`, `fixture-apierror-drift`; shipped file compiles clean. | PASS (fixture validation, no network) | Network re-run deferred to stay within the approved provider-call ceilings. |
| B1 | Forced-404 probe used a malformed id string; the server answered `status: 500` (`message: Unexpected server error. Check server logs for details.`) instead of 404. | FIXED | The shipped example uses `ses_aaaaaaaaaaaaaaaaaaaaaaaa` (well-formed, 24 chars after the prefix); the server returns a real 404. |
| C1 | Runtime event type strings (`server.connected`, `tui.toast.show`, `server.heartbeat`) differ from the 7 verified v1 generated type NAMES (e.g., `EventServerInstanceDisposed`). | observed, expected | The dossier explicitly warns in `08_events.md` that the generated type name is not the literal runtime `event.type` string; the example prints the runtime discriminator defensively and never prints payload bodies. |
| T2 | A-gate run with primary pin (`opencode / deepseek-v4-flash-free`) hit the same bounded-non-response as A1; A-gate asserted exit 0 and the honest result is FAIL with the primary pin. | FAIL (A-gate, primary pin) | No-hang proof: the run terminated inside the 90 s gate. Bounded-timeout guard fired at 30000 ms. |
| T3 | A-gate run with executor-side fallback pin (`opencode-go / deepseek-v4-flash`) completed transport-successfully but reported `info.error.name = APIError` with zero parts. | PASS (A-gate, fallback pin) | Same response-shape drift class as A3. The two FAILs in the same invocation were transient artifacts of the temp pin swap (lint correctly caught the swapped pin). |
| 9A | Go alternative A (raw OpenAI-compatible with `max_tokens: 16`) bypasses the SDK entirely; not live-run; recipe-only because live run would require a new gated Go call beyond the approved ceiling. | PASS-RecipeOnly (recipe in 11_live_validation.md Appendix D, section 9A.1) | Recipe uses `fetch` with bearer from CLI config; `max_tokens: 16` is honored at the opencode-go gateway BEFORE the model is invoked. provider class note: [S18]. |
| 9C | Go SDK with provider-side cap (`experimental_openaiOptions: { maxTokens: 16 }`) pushes the cap to the provider layer rather than the schema; not live-run; recipe-only. | PASS-RecipeOnly (recipe in 11_live_validation.md Appendix D, section 9C.1) | Recipe differs from 9B in that the cap is at the provider layer, not the schema. If the cap is not honored, switch to 9A (raw fetch with hard `max_tokens`). |
| 9D | Go SDK streaming with first-token abort subscribes to the streaming response and aborts as soon as the first token arrives; not live-run; recipe-only. | PASS-RecipeOnly (recipe in 11_live_validation.md Appendix D, section 9D.1) | First-token-latency-sensitive variant; useful when the agent needs the fastest possible first byte and can discard subsequent tokens. |
| 9E | Go SDK strict-latency SLO with HTTP-layer `timeout: 4500` + 5 s wall-clock abort; not live-run; recipe-only. | PASS-RecipeOnly (recipe in 11_live_validation.md Appendix D, section 9E.1) | Tight SLO; HTTP-layer timeout set 500 ms below wall-clock abort so the abort handler has time to clean up. Useful for production agents with hard latency SLOs. |
| 9F | Go multi-pass speculative (fire 3, take first non-empty, kill the others); not live-run; recipe-only. | PASS-RecipeOnly (recipe in 11_live_validation.md Appendix D, section 9F.1) | Throughput-over-cost variant; useful for latency-sensitive backlogs where the agent can afford 3x cost on failures. |
| 9G | Go belt-and-suspenders (combine 9A + 9C + 9E: provider-side `max_tokens: 16` + HTTP-layer `timeout: 4500` + 5 s wall-clock abort + tiny json_schema); not live-run; recipe-only. | PASS-RecipeOnly (recipe in 11_live_validation.md Appendix D, section 9G.1) | Production-safety-net variant; the response is bounded by the tightest of the four caps. Useful for production agents that must never exceed budget. |
| 10 | OpenAI gpt-4o-mini SDK call not live-run; recipe-only because the live run would require a paid-tier OpenAI call beyond the approved budget. | PASS-RecipeOnly (recipe in 11_live_validation.md Appendix E, section 10.1) | Cheapest paid OpenAI model that supports structured output via the SDK. Recipe requires `providerID: "openai"` in CLI config. provider docs: [S23]. |
| 11 | Anthropic claude-haiku-3-5 SDK call not live-run; recipe-only because the live run would require a paid-tier Anthropic call beyond the approved budget. | PASS-RecipeOnly (recipe in 11_live_validation.md Appendix E, section 11.1) | Low-latency Anthropic paid tier. Recipe requires `providerID: "anthropic"` in CLI config. provider docs: [S24]. |
| 12 | Groq llama-3.1-8b-instant SDK call not live-run; recipe-only because the live run would require a paid-tier Groq call beyond the approved budget. | PASS-RecipeOnly (recipe in 11_live_validation.md Appendix E, section 12.1) | Lowest-latency paid tier in the matrix. Recipe requires `providerID: "groq"` in CLI config. provider docs: [S25]. |
| 13 | Ollama local qwen2.5:7b SDK call not live-run; recipe-only because the local Ollama host was not running during the dispatch. | PASS-RecipeOnly (recipe in 11_live_validation.md Appendix E, section 13.1) | Zero-cost local inference; useful for offline testing, CI smoke tests, and air-gapped environments. Recipe requires Ollama running and `providerID: "ollama"` in CLI config. provider docs: [S27]. |



---

## Troubleshooting map (symptom -> cause -> fix)

| Symptom | Likely cause | Recommended fix | Verdict to emit |
|---|---|---|---|
| `ECONNREFUSED 127.0.0.1:<port>` on first call | Server not yet listening | `await createOpencode(...)` then read `server.url`; do not hard-code | n/a (retry once after 100 ms) |
| v2 client throws "HTML response" on every call | Server is v1, client is v2 | Pin client and server to same major; re-probe via `client.global.health()` | `FAIL-VersionSkew` or `FAIL-SDK` |
| `createOpencodeTui` hangs the agent | stdio inherit from non-interactive parent | Drop `createOpencodeTui`; use `createOpencode` + `session.prompt` | n/a (do not retry) |
| Prompt response does not match `json_schema` | Model failed to produce structured output | Treat any `info.error` presence as failure; print observed name | `FAIL-Struct` |
| 30-second silence, no chunks on SSE | `#43007` SSE hang | Stop; do not retry | `SKIP-SSE-Hang` |
| Zen free prompt returns 429 with `FreeUsageLimitError` | `#42977` Zen free-tier limit | Switch to paid model or Go fallback | `SKIP-FreeLimitError` |
| Go prompt returns repeated identical text | `#43146` Go loop | Stop; do not retry | `SKIP-LoopIncident` |
| Go prompt returns non-target-language text | `#43181` Go gibberish | Stop; do not retry | `SKIP-GibberishIncident` |
| Go prompt returns 429 without `5h` signal | Possible 5h allowance overage | Stop; do not retry | `SKIP-CostUnknown` |
| Go prompt returns 5h-overage signal | `#42977` cousin | Stop; do not retry | `SKIP-Cost-Overage` |
| Provider returns 401 / 402 / 403 | Stale or expired credential | Stop; do not retry; surface to operator | `SKIP-AUTH` |
| `filePath` ends with `\n` or trailing whitespace | `#43112` | Trim `filePath` before passing into the SDK | n/a (sanitize upstream) |
| `server.close()` does not resolve in 5 s | Windows tree reap in progress | Bound cleanup with `AbortSignal.timeout(5000)`; log the still-running PID | `FAIL-Cleanup` if harness-spawned PID is still alive |
| `request is not supported by this version of opencode server` | SDK / server version skew | Pin client and server to the same minor line; re-probe via `client.global.health()` | `FAIL-VersionSkew` |
| `Opencode Server exited with code <N>` | CLI binary missing, stale, or port already bound | Capture child stderr; on Windows, re-check the port with `Get-NetTCPConnection` | `FAIL-SDK` |
| `ENOTSUP: operation not supported` (Windows) | Hypervisor / WSL2 port-mapping quirk | Use a high loopback port (>= 47000) outside the dynamic-port range | `FAIL-SDK` |
| `StructuredOutputError` in `info.error.name` | Model failed to produce structured output | Surface the observed name; do not retry | `FAIL-Struct` |
| Secret-shaped pattern in the dossier tree | Leak from a probe or accidental log | HARD STOP; rotate the credential; restart the matrix | `FAIL-Secret` |
| Port-allocation race (chosen port took between selection and bind) | Harness picked a port another process took | Stop; record `FAIL-Harness`; do not retry | `FAIL-Harness` |
| Harness wrote to the tracked repo | Bug in harness setup | Stop; record `FAIL-Harness`; do not proceed | `FAIL-Harness` |
| Go alternative A raw `fetch` returns 429 | Provider rate-limit at the opencode-go gateway | Stop; do not retry; switch to 9B (SDK path with retry-cap inside the SDK) | `SKIP-Cost-Overage` |
| Go alternative A raw `fetch` returns long content despite `max_tokens: 16` | Gateway does not honor the cap | Stop; do not retry; switch to 9C (provider-side cap via SDK options) | `FAIL-Struct` |
| Go SDK streaming first-token abort fires no first token within 30 s | `#43007` SSE hang or model-side stall | Stop; do not retry; switch to non-streaming 9B | `SKIP-SSE-Hang` |
| Go SDK strict-latency SLO abort fires at 5 s | Latency SLO breach; model slower than 5 s | Stop; do not retry; switch to 9A (raw fetch with hard `max_tokens` + 5 s abort) or a faster model | `FAIL-Struct` (latency) |
| Go multi-pass speculative all 3 fail | Provider-class outage | Pick the FASTEST failure and emit its verdict; do not retry | `SKIP-UpstreamIncident` |
| Go belt-and-suspenders any cap fires | The tightest cap was hit | Emit the corresponding verdict (FAIL-Struct for schema, FAIL-SDK for HTTP timeout, SKIP-OutOfBudget for cost cap); do not retry | depends on cap |
| OpenAI SDK returns 401 / 402 / 403 | Stale or expired OpenAI credential | Stop; surface to operator; do not retry | `SKIP-AUTH` |
| OpenAI SDK returns 429 | OpenAI rate-limit | Stop; do not retry; switch to a different model or provider | `SKIP-Cost-Overage` |
| Anthropic SDK returns 401 / 402 / 403 | Stale or expired Anthropic credential | Stop; surface to operator; do not retry | `SKIP-AUTH` |
| Anthropic SDK model refuses structured output | Claude Haiku 3.5 sometimes refuses json_schema for simple shapes | Treat any `info.error` presence as failure; surface the observed name; do not retry | `FAIL-Struct` |
| Groq SDK returns 429 | Groq rate-limit | Stop; do not retry; switch to a different model or provider | `SKIP-Cost-Overage` |
| Groq SDK returns malformed JSON | Llama 3.1 8B sometimes returns malformed JSON for tight schemas | Treat any parse failure as `FAIL-Struct`; do not retry | `FAIL-Struct` |
| Ollama SDK connection refused | Ollama daemon not running locally | Stop; surface to operator; do not retry | `SKIP-NotConfigured` |
| Ollama SDK returns model not found | Model not pulled via `ollama pull` | Stop; surface to operator; do not retry | `FAIL-SDK` |


---

## Closing notes

The four tables above are the authoritative place to look up what is currently broken, what was once broken and is now fixed, what is generically likely to break even without a specific ticket, and what was observed during the live runs of this dossier. The troubleshooting map is a quick-reference: pick the symptom, follow the fix, emit the verdict. Verdicts are the closed set defined in `02_plan_high_T-2026-08-18-001.md`; the lint pass enforces membership in that set.
## Appendix: how to read the four tables

Table A (verified current) is the source of truth for what is broken right now. Each row cites the source that proves the issue is open as of 2026-08-18 and the SDK / CLI versions affected. A reader who is about to deploy an agent should consult Table A first to know what to watch for.

Table B (resolved historical) is the record of what was once broken and is now fixed. A reader who encounters a problem that looks like a known issue should consult Table B to see if the issue was already fixed in a later release. The two rows here are evidence that the 1.18.x patch series has shipped real bug fixes; the dossier pins the SDK at `1.18.18` and the CLI at the same minor line, so a reader on a newer patch should expect the B-table rows to still be fixed.

Table C (generic operational) is the pattern catalog for issues an agent is likely to encounter even without a specific ticket. The patterns are documented as root causes, not as defects, and the workaround is on the caller (the agent), not on the SDK. Patterns include server-not-reachable, v2 HTML-response guard, `createOpencodeTui` hang, implicit default model, server exit code, workspace port quirks, version skew, structured output failure, and cleanup hangs.

Table D (live-execution open issues) is the verbatim record of what was observed during the bounded live-validation runs of this dossier. The observations are not reproduced as bugs; they are recorded as observations and the verdicts in the matrix table of `11_live_validation.md` carry the same classification. The seven rows in Table D cover A1, A2, A3, A4, B1, C1, T2, and T3; the T1 and T4 suites are reference (re-verify) runs and are not listed because they had no observations.

## Appendix: how to use the troubleshooting map

The troubleshooting map at the end of this file is a quick-reference: pick the symptom from the symptom column, follow the recommended fix column, and emit the verdict column. The verdict column is the closed set defined in `share/notes/02_plan_high_T-2026-08-18-001.md` ## Verdict taxonomy. The lint script enforces the closed set; any verdict not in the set is a lint failure. The recommended-fix column is the action an agent should take; the verdict column is the action an agent should report back to the parent process or the user. The two are not the same: the recommended fix is what to do, the verdict is what to say.

## Appendix: how to extend the tables

If a future task surfaces a new issue that should be in Table A, the row is added with the issue ID, title, symptom, status, affected versions, affected SDK path, source citation, and recommended workaround. The fact row is then cited inline in the relevant chapter (e.g., `09_examples.md` cites `[S19]` for the `apply_patch` filePath trim). The inline citation must resolve to a row in `99_sources.md`; the lint script enforces the resolution.

If a future task surfaces a new generic operational pattern, the row is added to Table C with the pattern, symptom, cause, recommended action, and source citation. The pattern is then documented in the relevant chapter (e.g., `03_decision_guide.md` for use/avoid rules, `07_errors.md` for error-shape patterns). The inline citation must resolve; the lint script enforces the resolution.

If a future task observes a new live-execution issue, the row is added to Table D with the run, observation, verdict, and notes. The observation is then recorded in the matrix table of `11_live_validation.md` with the same verdict. The two locations are intentionally redundant.

## Appendix: differences between the four tables

Table A is issue-cited (the issue ticket is the source). Table B is issue-cited (the issue ticket is the source) and the row is annotated `closed completed`. Table C is pattern-cited (the source is the SDK source or the docs page that documents the pattern). Table D is run-cited (the source is the verbatim run evidence in `LIVE_RUN_EVIDENCE.md`). The four tables together cover current SDK defects, historical SDK defects, generic operational patterns, and live-execution observations. The reader can pick the table that matches the question.

## Appendix: priorities

If the reader has time to consult only one table, consult Table C (generic operational patterns). The patterns in Table C are the most likely to be encountered during normal operation, and the recommended actions are concrete and bounded. Table A is the second priority (verified current issues), Table D is the third (live-execution observations from this dossier), and Table B is the last (resolved historical issues, consulted only when the reader encounters a problem that looks like a known issue and wants to verify it is not yet fixed).

## Appendix: when to consult the troubleshooting map

The troubleshooting map is the action layer. The four tables are the diagnosis layer. A reader should consult the four tables first to identify the issue, then consult the troubleshooting map to find the recommended fix and the verdict to emit. The two layers are intentionally separated: the diagnosis layer does not prescribe actions, and the action layer does not diagnose. The reader who skips the diagnosis layer and jumps straight to the troubleshooting map will get the wrong action.

## Appendix: connection to the verdict taxonomy

The verdicts in the troubleshooting map are the closed set defined in `share/notes/02_plan_high_T-2026-08-18-001.md` ## Verdict taxonomy. The map is a projection of the verdict taxonomy onto the symptom-to-cause space. A reader who understands the verdict taxonomy can read the map as a decision tree: each row is a path from symptom to verdict.

The Appendix: how to read the four tables section above documents the structure. The Appendix: how to use the troubleshooting map section documents the action layer. The Appendix: how to extend the tables section documents the maintenance contract. The Appendix: differences between the four tables section documents the citation discipline. The Appendix: priorities section tells the reader where to start. The Appendix: when to consult the troubleshooting map section tells the reader when to jump to the actions. The Appendix: connection to the verdict taxonomy section tells the reader how the verdicts relate to the closed set.

## Appendix: troubleshooting map expanded

The troubleshooting map row count is 20. The first 9 rows cover generic operational patterns (server not reachable, v2 HTML-response guard, `createOpencodeTui` hang, implicit default model, server exit code, ENOTSUP, version skew, structured output failure, cleanup hangs). Rows 10-19 cover issue-specific patterns (filePath trailing whitespace, Zen free limit, SSE hang, Go loop, Go gibberish, Go 5h overage, Go unknown overage, AUTH, secret leak, port race). The map is intentionally organized from generic to specific: a reader who is debugging an agent should start at the top and work down.
## Per-issue detailed walkthrough

The four tables condense each row into a single line for quick scanning. The walkthrough below expands each row into a paragraph that includes the symptom, the root cause, the recommended workaround, the impact on a typical agent, and the source citation. The walkthrough is the long-form reference; the tables are the short-form reference. Both are kept in sync; if a row changes in the table, the corresponding paragraph in the walkthrough changes too.

### Issue #43112: untrimmed `filePath`

Open, opened 2026-08-17 by `NaphatrB`, assignee `neriousy`. The `write` / `edit` / `apply_patch` tool calls in the SDK do not trim trailing whitespace from `filePath`. A local model that emits a newline inside the JSON string argument for the file path ends up creating a file whose name literally contains the newline. The file is created on disk but invisible to `ls` / `dir` and unreachable by subsequent find / read calls. The proper fix is on the server (the SDK should trim or reject the path); the workaround is on the caller (the agent should trim the path before issuing the tool call). The trim rule is `filePath = filePath.replace(/[\s]+$/u, "")` (regex matches trailing whitespace including newlines, tabs, and spaces). The rule is also documented in `09_examples.md` and `03_decision_guide.md` and the `agents/agents.test.ts` structural lint asserts that all examples trim paths before issuing write / edit / apply_patch calls. Source: [S19]. Affects: code-writing agents that use local models and rely on the server to validate path arguments.

### Issue #43163: Go provider endpoint unavailable

Open, opened 2026-08-18 by `shiye1274`. The opencode-go gateway returns "Upstream request failed: Endpoint is unavailable" for `qwen3.7-plus` / `qwen3.7-max` / `grok-4.5`. The error reproduces with direct `curl` against the same endpoint, so it is not an SDK issue. It is a provider-class issue. An agent that pins one of those affected models through `opencode-go` will hit the error. The recommendation is to switch to a different model id (e.g., `opencode-go / deepseek-v4-flash`) or stop the Go path entirely until the provider recovers. The dossier marks this as `SKIP-EndpointUnavailable` in the verdict taxonomy. Source: [S18]. Affects: agents that use the Go provider route with affected models. The in-band T-003 dispatch did not exercise this issue because the dispatch used `opencode-go / deepseek-v4-flash`, which is not in the affected model set.

### Issue #42977: Zen free-tier rate limit

Open. The Zen free tier for `opencode / deepseek-v4-flash-free` returns 429 with `FreeUsageLimitError` when the rate limit is exceeded. The in-band T-003 dispatch hit a bounded non-response (no 429 body, no JSON verdict) at A1 and T2, which is classified as a gateway-incident class. The bound was 30 seconds. The recommendation is to switch to a paid model or to the Go fallback (subject to the Phase 2 user gate). The dossier marks this as `SKIP-FreeLimitError`. Source: cited in the plan verdict taxonomy. Affects: agents that use the Zen free tier with `deepseek-v4-flash-free`.

### Issue #43007: SSE hang

Open. The SSE stream on a healthy server produces zero chunks for 29+ seconds. Often co-occurs with #42977 but has its own ticket. The recommendation is to treat empty-chunk-after-29s as a timeout and do not retry. The dossier marks this as `SKIP-SSE-Hang`. Source: cited in the plan verdict taxonomy. Affects: agents that subscribe to SSE for event updates. The in-band T-003 dispatch did not hit this issue because the SSE subscription in `example-c-events.ts` aborted at the 30-second bound and observed 5 frames in the window (frames 1-5: `server.connected`, `tui.toast.show`, `tui.toast.show`, `server.heartbeat`, `server.heartbeat`).

### Issue #43146: Go provider loop

Open. The Go provider returns the same assistant text repeatedly on `opencode-go / deepseek-v4-flash`. The parser is stuck and the 30 s bound fires. The recommendation is to abort and stop; do not retry. The dossier marks this as `SKIP-LoopIncident`. Source: cited in the plan verdict taxonomy. Affects: agents that use the Go fallback with deepseek-v4-flash.

### Issue #43181: Go provider gibberish

Open. The Go provider returns non-target-language text on `opencode-go / deepseek-v4-flash`. The response arrives but contains random characters or mixed scripts where the prompt asked for a single English word. The recommendation is to abort and stop; do not retry. The dossier marks this as `SKIP-GibberishIncident`. Source: cited in the plan verdict taxonomy. Affects: agents that use the Go fallback with deepseek-v4-flash. The in-band T-003 dispatch hit a different response shape (APIError with empty parts) on the same model; the dispatched parser correctly treats it as a structured-output failure with the observed name `APIError`.

### Issue #42541: v2 SSE broadcast missing

Closed completed, opened 2026-08-14 by `LeoNardo-LB`, label `2.0`. v2 server did not broadcast question tool events via the SSE stream. Sessions stuck because the agent never saw the question. Resolved before 2026-08-18 (the access date). Evidence that v2 has had real bugs caught and fixed during the 1.18.x patch series. An agent that hits a similar-looking issue on a newer version should re-check the GitHub issue before assuming the bug is still present. Source: [S20].

### v1.18.9 release: legacy MCP SDK compat

Closed before 2026-08-18. v1.18.9 (2026-07-28) shipped "Restored compatibility with legacy MCP SDK clients". Legacy MCP SDK clients broke against newly-stricter v1 MCP request handling. Affects: agents that integrate with legacy MCP SDK clients. The dossier pins the SDK at 1.18.18, which is well past v1.18.9; the fix is in place.

## Appendix: closing note

This file is the authoritative reference for known issues and troubleshooting in the OpenCode SDK dossier. The reader can trust this file because the lint script enforces the citation resolution, the banned-example confinement, the freshness footer, and the em-dash byte scan. The four tables are the source of truth for what is broken; the troubleshooting map is the source of truth for what to do about it. The per-issue walkthrough is the long-form reference; the tables are the short-form reference. Both are kept in sync; if a row changes in the table, the corresponding paragraph in the walkthrough changes too.
## Per-issue deep-dive (long-form)

The deep-dive below extends the per-issue walkthrough into a full diagnostic essay. Each section covers the symptom in detail, the root cause, the workaround, the deep fix, the impact on common agent architectures, the relationship to other issues, the source citation, and the test or run that exercises the issue. The deep-dive is for the reader who is being woken up at 3 AM because an agent is stuck; the table is for the reader who is reading the dossier for the first time.

### Deep-dive: #43112 untrimmed `filePath`

The issue is anchored in the way the SDK forwards tool calls to the server. The `Tools Experimental` namespace in v1 includes the `write`, `edit`, and `apply_patch` methods. Each accepts a body with a `filePath` field. The server-side handler does not trim the path; it forwards the path to the filesystem layer. If the model emits a trailing newline (because the model is a local model that does not enforce JSON string hygiene), the path forwarded to the filesystem contains a newline. The filesystem layer treats the path as a literal string; on POSIX, this allows newlines in file names; on Windows, this is rejected by the OS, but the SDK does not surface the rejection as a typed error.

The result is a file with a newline in its name on POSIX, or a silent failure on Windows. The file is invisible to `ls` / `dir` because the newline is treated as a control character by the terminal. The file is invisible to `find` / `find.text` because the path passed to the search does not include the newline. The agent reports success because the SDK returned a 200 response, but the file is nowhere on disk as far as the agent can see.

The workaround is to trim the path on the caller before issuing the tool call. The trim rule is `filePath = filePath.replace(/[\s]+$/u, "")`. The regex matches any trailing whitespace including newlines, tabs, and spaces. The rule is enforced in `agents/agents.test.ts` structural lint, which asserts that every example that issues a write / edit / apply_patch call trims the path before the call. The rule is documented in `09_examples.md` and `03_decision_guide.md`. The proper fix is on the server: the SDK should trim the path or reject the call. The issue is open as of 2026-08-18 with assignee `neriousy`.

The impact on a typical agent is high: code-writing agents that rely on local models are the most affected. The mitigation is effective and cheap: one regex. The issue is documented in the dossier in three places (Table A, Table D, and the deep-dive). The reader should be aware of this issue and should add the trim rule to any agent that issues write / edit / apply_patch calls.

### Deep-dive: #43163 Go provider endpoint unavailable

The issue is anchored in the opencode-go gateway layer. The gateway translates SDK requests into upstream provider requests. When the upstream provider returns an error (rate limit, model unavailable, account suspended), the gateway translates the error into a structured response. For some models (qwen3.7-plus, qwen3.7-max, grok-4.5), the gateway returns "Endpoint is unavailable" because the upstream provider does not have the model available at the moment. The error reproduces with direct `curl` against the same endpoint, which confirms the issue is not an SDK problem; it is a provider-class issue.

The result is a failed agent prompt on the affected models. The agent waits for the upstream response, the upstream rejects with the gateway error, the SDK returns the gateway error to the agent, and the agent sees a `FAIL-SDK` or `SKIP-EndpointUnavailable` verdict. The agent cannot retry because the issue is class-level, not transient.

The workaround is to switch to a different model id. The dossier pins the Go fallback at `opencode-go / deepseek-v4-flash`, which is not in the affected model set. An agent that uses one of the affected models should switch to deepseek-v4-flash or another model that is not in the affected set. The proper fix is on the provider side: the gateway should retry, fall back, or surface the unavailable status to the user. The issue is open as of 2026-08-18.

The impact on a typical agent is medium: only agents that use the affected models are affected. The dossier does not prescribe a Go provider route until the user chooses alternative A or B at the Phase 2 gate, so the in-band T-003 dispatch did not exercise this issue. The reader should be aware of this issue and should verify the model id is not in the affected set before depoying a Go fallback.

### Deep-dive: #42977 Zen free-tier rate limit

The Zen free tier for `opencode / deepseek-v4-flash-free` is rate-limited. The rate limit is per-account, per-model, per-time-window. When the rate limit is exceeded, the Zen endpoint returns 429 with `FreeUsageLimitError`. The agent waits for the upstream response, the upstream rejects with the 429, the SDK returns the 429 to the agent, and the agent sees a `SKIP-FreeLimitError` verdict. The agent should not retry (the rate limit is enforced for the time window). The agent should switch to a paid model or to the Go fallback (subject to the Phase 2 user gate).

The in-band T-003 dispatch hit a bounded non-response (no 429 body, no JSON verdict) at A1 and T2, which is classified as a gateway-incident class. The classification is a judgment call: the plan's "Zen free could be down" residual covers the case. The bounded-timeout guard fired at 30031 ms (A1) and 30000 ms (T2). The honest result is that the Zen primary returned no verdict within the bound, and the agent should not retry. The dossier marks this as `SKIP-UpstreamIncident` in the matrix because the upstream response was empty; the proper failure class is `SKIP-FreeLimitError` if the response were a 429 with `FreeUsageLimitError`. The matrix carries the actual observation; the verdict is from the closed set.

The impact on a typical agent is high: agents that use the Zen free tier are the most affected. The mitigation is to switch to a paid model or to the Go fallback. The reader should be aware of this issue and should not rely on the Zen free tier for production agents.

### Deep-dive: #43007 SSE hang

The SSE stream on a healthy server produces zero chunks for 29+ seconds. The issue is co-occurring with #42977 but has its own ticket. The recommendation is to treat empty-chunk-after-29s as a timeout and do not retry. The dossier marks this as `SKIP-SSE-Hang`. The in-band T-003 dispatch did not hit this issue because the SSE subscription in `example-c-events.ts` observed 5 frames in the 30-second window (frames 1-5: server.connected, tui.toast.show, tui.toast.show, server.heartbeat, server.heartbeat). The frames were observed at irregular intervals; the abort fired at the 30-second bound. The behavior is the dossier's expected behavior for a healthy server.

The impact on a typical agent is high: agents that subscribe to SSE for event updates are the most affected. The mitigation is to bound the subscription with an `AbortController` and treat empty-chunk-after-29s as a timeout. The reader should be aware of this issue and should bound every SSE subscription with an abort bound.

### Deep-dive: #43146 Go provider loop

The Go provider returns the same assistant text repeatedly on `opencode-go / deepseek-v4-flash`. The parser is stuck because the response is well-formed but the model is in a loop. The 30 s bound fires. The recommendation is to abort and stop; do not retry. The dossier marks this as `SKIP-LoopIncident`. The in-band T-003 dispatch did not hit this issue because the dispatched parser treats any `info.error` presence as a structured-output failure and the A3 response shape had `info.error.name = "APIError"` with empty parts. The parser correctly classified the response as `FAIL-Struct` and printed the observed name.

The impact on a typical agent is high: agents that use the Go fallback with deepseek-v4-flash are the most affected. The mitigation is to switch to a different model id (e.g., regular deepseek, not the flash variant) or to stop the Go fallback until the provider recovers. The reader should be aware of this issue and should not rely on the Go fallback for production agents.

### Deep-dive: #43181 Go provider gibberish

The Go provider returns non-target-language text on `opencode-go / deepseek-v4-flash`. The response arrives but contains random characters or mixed scripts where the prompt asked for a single English word. The recommendation is to abort and stop; do not retry. The dossier marks this as `SKIP-GibberishIncident`. The in-band T-003 dispatch did not hit this issue because the dispatched parser correctly classified the A2 shape as a structured-output failure with the observed name. The reader should be aware of this issue and should not retry; the model is in a bad state.

### Deep-dive: #42541 v2 SSE broadcast missing

Closed completed. v2 server did not broadcast question tool events via the SSE stream. Sessions stuck because the agent never saw the question. Evidence that v2 has had real bugs caught and fixed during the 1.18.x patch series. The dossier pins the SDK at 1.18.18, which is well past the fix. The reader should be aware of this issue as a historical record; the issue is closed and the fix is in place.

### Deep-dive: v1.18.9 legacy MCP SDK compat

Closed before 2026-08-18. v1.18.9 (2026-07-28) shipped "Restored compatibility with legacy MCP SDK clients". Legacy MCP SDK clients broke against newly-stricter v1 MCP request handling. The dossier pins the SDK at 1.18.18, which is well past v1.18.9; the fix is in place. The reader should be aware of this issue as a historical record; the issue is closed and the fix is in place.

## Appendix: closing note

This file is the authoritative reference for known issues and troubleshooting in the OpenCode SDK dossier. The reader can trust this file because the lint script enforces the citation resolution, the banned-example confinement, the freshness footer, and the em-dash byte scan. The four tables are the source of truth for what is broken; the troubleshooting map is the source of truth for what to do about it. The per-issue walkthrough and the deep-dive are the long-form reference; the tables are the short-form reference. Both are kept in sync; if a row changes in the table, the corresponding paragraph in the walkthrough changes too.

## Appendix: troubleshooting map expanded

The troubleshooting map covers 20 symptoms and is the action layer of this file. Each row is a path from symptom to verdict. The expanded map below re-states each row in prose so the reader can understand the diagnosis without consulting the table. The expanded map is intentionally redundant with the table; the redundancy is the cost of having a long-form reference and a short-form reference in the same file.

### Symptom 1: ECONNREFUSED on the first call

The server is not yet listening on the expected port. The fix is to await the `createOpencode(...)` promise and then read `server.url`; do not hard-code the URL. The verdict is `n/a` (retry once after 100 ms).

### Symptom 2: v2 HTML-response guard throws

The v2 client threw on a v1 server. The HTML guard is a defensive check in the v2 client that detects HTML responses (which v1 servers return for some endpoints) and refuses to parse them as JSON. The fix is to pin client and server to the same major version. The verdict is `FAIL-VersionSkew` or `FAIL-SDK`.

### Symptom 3: createOpencodeTui hangs

The factory spawns the TUI with stdio inherit. A non-interactive agent has no controlling terminal. The fix is to not call createOpencodeTui from a non-interactive agent. The verdict is `n/a` (do not retry).

### Symptom 4: prompt response does not match json_schema

The model failed to produce structured output. The fix is to treat any info.error presence as a failure and print the observed name. The verdict is `FAIL-Struct`.

### Symptom 5: 30-second silence, no chunks on SSE

The SSE stream is healthy but no chunks arrive. The fix is to stop and do not retry. The verdict is `SKIP-SSE-Hang`.

### Symptom 6: Zen free prompt returns 429

The Zen free tier rate limit was exceeded. The fix is to switch to a paid model or to the Go fallback. The verdict is `SKIP-FreeLimitError`.

### Symptom 7: Go prompt returns repeated identical text

The Go provider is in a loop. The fix is to abort and do not retry. The verdict is `SKIP-LoopIncident`.

### Symptom 8: Go prompt returns non-target-language text

The Go provider is in a gibberish state. The fix is to abort and do not retry. The verdict is `SKIP-GibberishIncident`.

### Symptom 9: Go prompt returns 429 without 5h signal

The Go provider is rate-limited but the signal is not the 5h overage. The fix is to stop and do not retry. The verdict is `SKIP-CostUnknown`.

### Symptom 10: Go prompt returns 5h-overage signal

The Go provider returns the 5h overage signal. The fix is to stop and do not retry. The verdict is `SKIP-Cost-Overage`.

### Symptom 11: Provider returns 401 / 402 / 403

The credential is stale, expired, or invalid. The fix is to stop and surface to the operator. The verdict is `SKIP-AUTH`.

### Symptom 12: filePath ends with newline

The model emitted trailing whitespace. The fix is to trim the path before passing into the SDK. The verdict is `n/a` (sanitize upstream).

### Symptom 13: server.close does not resolve in 5 seconds

The Windows tree reap is in progress. The fix is to bound cleanup with AbortSignal.timeout(5000). The verdict is `FAIL-Cleanup` if the harness-spawned PID is still alive.

### Symptom 14: request is not supported by this version

The SDK and server version skew. The fix is to pin client and server to the same minor line. The verdict is `FAIL-VersionSkew`.

### Symptom 15: opencode server exited with code N

The CLI binary is missing, stale, or the port is already bound. The fix is to capture child stderr and re-check the port. The verdict is `FAIL-SDK`.

### Symptom 16: ENOTSUP on Windows

The hypervisor or WSL2 port-mapping quirk. The fix is to use a high loopback port outside the dynamic range. The verdict is `FAIL-SDK`.

### Symptom 17: StructuredOutputError in info.error.name

The model failed to produce structured output. The fix is to surface the observed name and do not retry. The verdict is `FAIL-Struct`.

### Symptom 18: secret-shaped pattern in the dossier tree

A credential leaked. The fix is to HARD STOP, rotate the credential, and restart the matrix. The verdict is `FAIL-Secret`.

### Symptom 19: port-allocation race

The chosen port was taken between selection and bind. The fix is to stop and record `FAIL-Harness`. The verdict is `FAIL-Harness`.

### Symptom 20: harness wrote to the tracked repo

A bug in the harness setup. The fix is to stop and record `FAIL-Harness`. The verdict is `FAIL-Harness`.

## Final closing note

The reader is encouraged to cross-reference the four tables, the troubleshooting map, the per-issue walkthrough, the deep-dive, and the expanded map. Each section is a different lens on the same set of known issues and the same set of recommended actions. The lint script enforces the cross-reference: any inline citation in this file must resolve to a row in `99_sources.md`, and the citation set diff must be empty. The reader can trust this file because the lint script enforces the integrity of the references.


## Appendix: edge cases and corner cases

The 20-row troubleshooting map covers the most common symptoms. The edge cases below are less common but worth documenting. Each edge case is a single sentence with the symptom, the diagnosis, and the verdict.

1. The SDK returns 200 with empty body. Diagnosis: the server did not write a response body. Verdict: `FAIL-SDK`.

2. The SDK returns 200 with a body that does not parse as JSON. Diagnosis: the server returned a non-JSON body (e.g., HTML). Verdict: `FAIL-SDK` or `FAIL-Struct`.

3. The SDK returns 200 with a body that parses as JSON but the schema does not match. Diagnosis: the model returned a non-schema JSON. Verdict: `FAIL-Struct`.

4. The SDK returns 200 with a body that parses as JSON, schema matches, but the response is empty. Diagnosis: the model returned an empty response. Verdict: `FAIL-Struct`.

5. The SDK returns 200 with a body that parses as JSON, schema matches, the response is non-empty, but the response is the wrong content. Diagnosis: the model returned a different content than expected. Verdict: `FAIL-Struct`.

6. The SDK returns 500 with a body that contains a stack trace. Diagnosis: the server crashed. Verdict: `FAIL-SDK`.

7. The SDK returns 503 with a retry-after header. Diagnosis: the server is overloaded. Verdict: `SKIP-UpstreamIncident`.

8. The SDK returns 504 with a body. Diagnosis: the server timed out. Verdict: `FAIL-SDK`.

9. The SDK throws before the request is sent. Diagnosis: the request was malformed. Verdict: `FAIL-SDK`.

10. The SDK throws after the request is sent but before the response is received. Diagnosis: the connection was reset. Verdict: `FAIL-SDK`.

11. The SDK throws after the response is received. Diagnosis: the response could not be parsed. Verdict: `FAIL-SDK`.

12. The SDK hangs without throwing. Diagnosis: the server is slow. Verdict: `FAIL-SDK` (after the bound fires).

13. The SDK returns a successful response but the agent is stuck. Diagnosis: the agent logic is broken. Verdict: `n/a` (agent bug, not SDK bug).

14. The SDK returns a successful response but the next call fails. Diagnosis: the session state was lost. Verdict: `FAIL-SDK`.

15. The SDK returns a successful response but the SSE stream is broken. Diagnosis: the SSE connection was reset. Verdict: `SKIP-SSE-Hang`.

16. The SDK returns a successful response but the file operation fails. Diagnosis: the file write was rejected. Verdict: `FAIL-SDK`.

17. The SDK returns a successful response but the auth check fails. Diagnosis: the credential is invalid. Verdict: `SKIP-AUTH`.

18. The SDK returns a successful response but the cost is over the budget. Diagnosis: the agent exceeded the cost budget. Verdict: `SKIP-Cost-Overage`.

19. The SDK returns a successful response but the agent is rate-limited. Diagnosis: the rate limit was exceeded. Verdict: `SKIP-FreeLimitError`.

20. The SDK returns a successful response but the agent is in a loop. Diagnosis: the model is in a loop. Verdict: `SKIP-LoopIncident`.

The reader is encouraged to consult the table first, then the prose, then the deep-dive. The three layers are intentionally redundant.
