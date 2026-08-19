# Research - T-2026-08-18-001 (OpenCode Go backup addendum for DeepSeek V4 Flash)

**Date:** 2026-08-18
**Trigger:** post-Zen-research focused addendum (P1c); primary remains `opencode/deepseek-v4-flash-free` on OpenCode Zen.
**Sub-agent:** research
**Companion:** `share/notes/01_research_T-2026-08-18-001_zen-live-validation.md` (Zen primary, 325 lines)
**Scope:** backup provider only. OpenCode Go is used only if the Zen free target raises a bounded free-limit, gateway, or SSE incident. This file does not re-research the Zen primary.
**Read-only environment confirmation (2026-08-18):** `opencode models opencode-go` returns 19 models including `opencode-go/deepseek-v4-flash` (verbatim CLI output captured below). `opencode providers list` shows `OpenCode Go [api]` credential configured (key never printed).
**Bounded execution budget:** read-only discovery + external doc fetch only. No provider calls, no installs, no config/auth changes, no source code edits, no `opencode-sdk-agent-docs/` creation.

## Task in one sentence

Verify, before the writer's bounded backup test, the exact providerID and modelID for "DeepSeek V4 Flash" on OpenCode Go, document its endpoint / capabilities / limits / cost / privacy / known incidents, and define a credential-free-bounded test plan that uses the existing configured Go subscription without ever exposing the API key, printing it, copying it, or substituting a different model.

## What we know for sure

### Exact providerID and modelID (catalog and SDK)

- The user's phrase "DeepSeek V4 Flash on OpenCode Go" maps to the catalog entry `opencode-go/deepseek-v4-flash`. **Full reference string: `opencode-go/deepseek-v4-flash`.** This is the canonical `providerID/modelID` form used by every OpenCode Go model (e.g. `opencode-go/kimi-k3`). The OpenCode Go docs explicitly state: "the model id in your OpenCode config uses the format `opencode-go/<model-id>`. For example, for Kimi K3, you would use `opencode-go/kimi-k3`." [G1, G2, G3]
- There is **no `opencode-go/deepseek-v4-flash-free`** model. The Go subscription does not expose any `-free` model variant. Every Go model consumes the subscription allowance; there is no per-request zero-cost free path on Go. Verified by enumerating the 19 entries returned by `opencode models opencode-go` (full list below). [G1, G2, G3]
- `opencode models opencode-go` on the user host (CLI 1.18.3) returns exactly the following 19 lines (read-only, no key required):
  ```
  opencode-go/deepseek-v4-flash
  opencode-go/deepseek-v4-pro
  opencode-go/glm-5.1
  opencode-go/glm-5.2
  opencode-go/glm-5.3
  opencode-go/gpt-5.6-luna
  opencode-go/grok-4.5
  opencode-go/hy3
  opencode-go/kimi-k2.6
  opencode-go/kimi-k2.7-code
  opencode-go/kimi-k3
  opencode-go/mimo-v2.5
  opencode-go/mimo-v2.5-pro
  opencode-go/minimax-m2.7
  opencode-go/minimax-m3
  opencode-go/qwen3.6-plus
  opencode-go/qwen3.7-max
  opencode-go/qwen3.7-plus
  opencode-go/qwen3.8-max
  ```
  Same list confirmed by the public OpenCode Go models endpoint at `https://opencode.ai/zen/go/v1/models` (25 total entries when counted via the docs page, 19 visible by default without auth: the docs and the user CLI agree on every model that maps to a paid Go subscription). [G1, G2, G3]

### Verified Go credential state (read-only, no secrets)

- `opencode providers list` on the user host shows `OpenCode Go [api]` is configured. The CLI prints the type (`api`) and never prints the key. The key is stored in `~/.local/share/opencode/auth.json` (mode `0o600`) under the `opencode-go` provider key. The exact CLI excerpt captured on 2026-08-18:
  ```
  T  Credentials ~\.local\share\opencode\auth.json
  |
  •  MiniMax Token Plan (minimax.io) api
  |
  •  OpenCode Go api
  |
  •  Google api
  |
  •  Hugging Face api
  |
  •  OpenCode Zen api
  |
  |  5 credentials
  ```
  [G1, G3]
- Distinct-provider confirmation: the user host is wired with five distinct `api` credentials. Zen and Go are stored as separate `Info` entries in `auth.json`. The Zen entry is unused for the backup test path; the Go entry is the one the writer will route through. [G1]
- The provider loader at `packages/opencode/src/provider/provider.ts` reads `input.env` first, then `Auth.all()` for the provider id, then `provider.opencode-go.options.apiKey` in the runtime config. None of these reads print the key. The "free-only public mode" branch is `opencode` (Zen) specific, NOT `opencode-go` specific: the Go loader has no equivalent `apiKey: "public"` fallback, so a missing Go credential will surface as `auth undefined` rather than a synthetic free model. This is documented for the writer: the backup test cannot run on an auth-free path. [G4]

### Verified endpoint, capabilities, limits, cost, privacy

- **Endpoint (deepseek-v4-flash on Go):** `https://opencode.ai/zen/go/v1/chat/completions`. AI SDK package: `@ai-sdk/openai-compatible`. The chat/completions path uses the OpenAI-compatible request/response shape. [G1, G2, G3]
- **Capabilities (models.dev, 2026-08-18):**
  - Context window: **1,000,000 tokens**
  - Output limit: **384,000 tokens**
  - Reasoning: Yes
  - Tool call: Yes
  - Structured output: Yes
  - Temperature: Yes
  - Mapped upstream: `deepseek/deepseek-v4-flash-0731` (DeepSeek lab, 2025-05 knowledge cutoff) [G3, G5]
- **Cost structure (Go subscription, NOT free):**
  - Subscription price: **$5 for the first month, then $10/month**. [G2]
  - Allowance is a dollar cap, not a token cap. Limits: **$12 / 5-hour window, $30 / weekly, $60 / monthly**. After limits are reached, requests block (unless "Use balance" is on, which lets Go fall back to the user's Zen balance). [G2]
  - Estimated per-model request counts (Go docs table, deepseek-v4-flash): ~7,600 requests per 5-hour, ~18,900 per week, ~37,800 per month. [G2]
  - DeepSeek V4 Flash per-1M-token prices on Go: **$0.22 input / $0.66 output off-peak; $0.44 input / $1.32 output peak**. Peak hours are **01:00-04:00 and 06:00-10:00 UTC**; everything else is off-peak. The docs reference upstream `https://api-docs.deepseek.com/quick_start/pricing/`. [G2, G6]
  - The cheapest possible bounded backup prompt ("Reply with the single word: ok" or one sanitized phrase) costs on the order of a few micro-cents of allowance: roughly 10 input tokens + 5 output tokens = ~$0.0000055 of the $12/5h allowance. This is bounded, pre-paid, and consumes a vanishingly small fraction of the user's existing Go subscription. The user's earlier decision (P1b, `03_live-validation-choices`) was "do not use a paid OpenCode Zen model or paid fallback" - this addendum is for OpenCode Go, which is a different subscription tier, not Zen pay-as-you-go. [G2, G7]
- **Privacy (Go deepseek-v4-flash):** the Go docs state: "DeepSeek: Not used for model training. 0 days retention*" with the note "ZDR agreement is renewed monthly. The current agreement is valid through August 31, 2026." This is materially better than the Zen `deepseek-v4-flash-free` model whose Privacy section says "During its free period, collected data may be used to improve the model." Therefore the backup test path is also safer than the Zen primary from a privacy standpoint, even when both paths are reachable. [G1, G2]
- **Peak-hour check:** the access date 2026-08-18 in UTC. The writer should record the UTC time of the backup test and confirm whether peak applies. Off-peak is the safe default for cost. [G2]

### Verified local CLI discovery (read-only, no key printed)

- The full `opencode models` enumeration was captured on 2026-08-18. The Go provider appears in the listing as 19 `opencode-go/<id>` rows; the Zen provider appears in the same listing as 58 `opencode/<id>` rows including `opencode/deepseek-v4-flash-free` and `opencode/deepseek-v4-flash` (the latter is the paid Zen variant, not the Go model). The Zen and Go models are clearly distinct rows with no aliasing. [G1, G3]
- The full `opencode providers list` excerpt (above) confirms `OpenCode Go [api]` is one of five configured credentials, and the writer can rely on the existing Go key for the bounded test. [G1]

### Known issues that materially affect this target (deepseek-v4-flash on opencode-go)

**Confirmed open (unresolved, exactly on this target):**

- **#43146 (Open, 2026-08-18, assignee `MrMushrooooom`, opened by `omani`):** title `deepseek flash v4 (opencode go) is broken.` Reporter says: "it ends up in an endless reply loop with the same sentence." Steps to reproduce: "just write something." Reporter environment: OpenCode version `1.18.18`, Alpine Linux, uxterm + tmux. **Targeting:** the title explicitly says "opencode go" and the only opencode-go DeepSeek model is `opencode-go/deepseek-v4-flash`. The body has no model id and no curl repro. URL: https://github.com/anomalyco/opencode/issues/43146. **Confidence:** HIGH for the target identification (title is unambiguous); MEDIUM for the universal reproducibility (single reporter, no shared repro). [G8]
- **#43181 (Open, 2026-08-18, assignee `MrMushrooooom`, opened by `yiyayoh`):** title `[OpenCode Go] DeepSeek V4 Flash intermittently degenerates into gibberish`. The reporter says the OpenCode Go `deepseek-v4-flash` route intermittently generates normal Chinese that progressively degenerates into incoherent multilingual gibberish during long generations (~200K input). A/B against `opencode-go/deepseek-v4-pro`, kimi, minimax, and the official DeepSeek API: Go V4 Flash is the only failing path. Reporter environment: RikkaHub on Android 16 (not the OpenCode CLI). URL: https://github.com/anomalyco/opencode/issues/43181. **Confidence:** HIGH for the target identification and symptom; MEDIUM for "always reproduces in OpenCode CLI" since the reporter used a third-party client. **Distinct from #43146:** #43181 is a long-context degeneration issue; #43146 is a short-prompt endless-loop issue. [G9]

**Confirmed open (provider-class, not DeepSeek-specific):**

- **#43163 (Open, 2026-08-18, opened by `shiye1274`):** `Upstream request failed: Endpoint is unavailable.` for qwen3.7-plus / qwen3.7-max / grok-4.5. kimi-k3 / glm-5.2 / minimax-m3 / gpt-5.6-luna work fine. Direct curl to `/zen/go/v1/chat/completions` shows the same error; the gateway is reachable on `/zen/go/v1/models` (HTTP 200). The error string comes from the gateway's upstream provider ("Console Go"). **Affects `opencode-go/deepseek-v4-flash` indirectly only** - the failing-model list does NOT include deepseek-v4-flash. URL: https://github.com/anomalyco/opencode/issues/43163. **Confidence:** MEDIUM for "may not affect deepseek-v4-flash" (the reporter's list of failing models is explicit but the underlying gateway class is shared, so the same symptom class could appear for deepseek-v4-flash under a different incident id). [G10]
- **#43185 (Open, 2026-08-18, assignee `fwang`, opened by `zarahao`):** `mimo-v2.5 (opencode-go)` tool calls fail with `stream disconnected before completion: upstream response contained invalid tool calls`. **Distinct model and distinct symptom** (mimo, not DeepSeek; tool-call parse error, not degeneration). URL: https://github.com/anomalyco/opencode/issues/43185. **Confidence:** HIGH for mimo; LOW for generalization to deepseek. [G11]
- **#43007 (Open, 2026-08-17, assignee `neriousy`, opened by `Lichao-WH`):** `opencode proxy gateway SSE stream hangs silently with zero chunks`. The reporter's stack is `providerID=opencode modelID=deepseek-v4-flash-free` on Zen (NOT Go). This is the same SSE hang documented in the companion Zen file. **Does NOT directly affect the Go backup path.** URL: https://github.com/anomalyco/opencode/issues/43007. **Confidence:** HIGH that this is the Zen path. [G12]
- **#43149 (Open, 2026-08-18, assignee `fwang`, opened by `wilmermunoz`):** Mismatch between USD consumption and usage percentages on `opencode-go/deepseek-v4-pro` (NOT V4 Flash). Dashboard math is inconsistent. This matters for **cost reporting, not for model correctness**. URL: https://github.com/anomalyco/opencode/issues/43149. **Confidence:** MEDIUM (V4 Pro, not V4 Flash, but the same provider class). [G13]
- **#42985 (Open, 2026-08-17, opened by `tnn226`):** "OpenCode Go quota usage appears ~4x higher than displayed DeepSeek V4 Flash cost." This is **directly relevant to the user's backup target** because it says the dashboard under-reports the USD that Go actually bills against the allowance. URL: https://github.com/anomalyco/opencode/issues/42985. **Confidence:** MEDIUM (single reporter, no quant confirmation). [G14]
- **#43023 (Open, 2026-08-17, opened by `Guard42`)** and **#43032 (Open, 2026-08-17, opened by `AakashKay`):** both report monthly vs weekly usage percentage inconsistencies on OpenCode Go. These are about dashboard reconciliation, not request correctness. **Confidence:** MEDIUM. [G15, G16]
- **#42991 (Closed, 2026-08-17, opened by `shqcandy`):** Go subscription usage discrepancy. Closed as completed. **Confidence:** HIGH (closed). [G17]

**Confirmed previously known (Zen-side, not Go):**

- #42977 (Zen free-limit 429) and #43007 (Zen SSE hang) are documented in the companion Zen research. The Go backup test does not run against Zen, so neither applies; they are listed here only to confirm the disambiguation. [G12, G18]

**Resolved / informational (Go class):**

- **#42987 (Closed not-planned, 2026-08-17, opened by `pppolf`):** "Go 套餐接入 DeepSeek Harness 出现问题" - Go subscription integration with DeepSeek Harness had issues. Closed intentionally. **Confidence:** HIGH. [G19]
- **#43148 (Closed not-planned, 2026-08-18, opened by `wilmermunoz`):** Same dashboard math issue as #43149, on DeepSeek V4 Pro. Closed not-planned. **Confidence:** HIGH (closed). [G20]

### Disambiguation: this is NOT the same as #43163 (the prior Zen research call)

- The companion Zen research `01_research_T-2026-08-18-001_zen-live-validation.md` correctly separates the Zen free target from the Go subscription. This addendum confirms that separation for the backup path: the writer routes the bounded backup test through `providerID=opencode-go, modelID=deepseek-v4-flash` and does NOT reuse the Zen `opencode` provider. [G7]

## What we don't know (ambiguities)

- **Whether the user's Go subscription is currently active or has been paused/cancelled.** The CLI confirms the credential is wired (`OpenCode Go [api]`), but a configured key is necessary, not sufficient. The wire-level check is whether a minimal prompt gets a non-401/non-402 response. The writer should treat any `401 Unauthorized`, `402 Payment Required`, or `403 Forbidden` on a minimal prompt as `SKIP-AUTH` and stop; the gateway will not give a Go prompt route to an inactive or cancelled subscription. The CLI never reveals subscription state.
  - **Suggested clarifying question:** "Confirm the OpenCode Go subscription is active and within the $12/5h allowance; if it has lapsed, the bounded backup test stops at SKIP-AUTH and the writer should not retry."
- **Whether the user's current allowance has been consumed in the 5-hour or weekly window.** A 5-hour-window of $12 is bounded but not infinite. If a previous live-validation run already consumed the window, the bounded backup test could return `429 Rate limit exceeded` or `402 Payment Required` even with a valid key. The writer cannot read the allowance from the CLI; the live prompt is the only signal.
  - **Suggested clarifying question:** "Confirm the Go $12/5h and $30/week allowance has not been exhausted by prior testing; if exhausted, the backup test stops at SKIP-COST-UNKNOWN or SKIP-UPSTREAM-INCIDENT and the writer does not retry."
- **Whether the exact prompt shape `"Reply with the single word: ok"` is enough to dodge the "endless reply loop" symptom reported in #43146.** The reporter's repro is "just write something" with no prompt body, and a single open issue is not a deterministic repro. The writer should treat any timeout, hang, or repeated identical sentence as a verbatim capture of the #43146 symptom and exit the backup path with `SKIP-UPSTREAM-INCIDENT`, never retrying under the same model id.
  - **No clarifying question needed:** the verdict vocabulary below already covers the two known incident classes (endless-loop = `SKIP-LoopIncident`; gibberish / hang = `SKIP-StreamIncident`) and the writer aborts on the first observation.
- **Whether the long-context gibberish symptom from #43181 will trigger on a 10-token input.** A 10-token input is far below the ~200K-input threshold the reporter used. The minimal backup prompt is the cheapest possible hedge against #43181. The writer should keep the test input <100 tokens.
  - **No clarifying question needed:** the bounded input size is the smallest hedge available.
- **Whether the cost dashboard under-reports actual USD consumption (#42985, #43023, #43032, #43149, #43148).** This affects billing truth, not request correctness. The bounded test will be the cheapest possible Go prompt; the writer records the exact input/output token count returned in the response and the verdict flags any dashboard-vs-actual cost discrepancy as a `NOTE-Cost-Discrepancy` line, but does not block on it.
  - **No clarifying question needed:** the verdict is PASS / FAIL / SKIP-*; cost reporting discrepancies are evidence, not blockers.

## Risks and doubts

- **R1 (#43146 endless reply loop on the exact target).**
  - **Severity:** high.
  - The reporter's environment is Alpine Linux; the user host is Windows 10. A single unconfirmed repro is not a guaranteed universal bug, but the title, model id, and provider are unambiguous.
  - **Mitigation:** the bounded backup test uses a 30-second hard wall-clock and an `AbortSignal.timeout(30000)`. If the stream produces no new chunk for 30s, the writer aborts and records verdict `SKIP-LoopIncident` with the issue id `43146`. The writer MUST NOT retry on the same model id; retries would compound an already-bugged path. If the user wants to retry, the master should surface a new question; the writer does not silently fall back to a different Go model. [G8]
- **R2 (#43181 multilingual gibberish on the exact target).**
  - **Severity:** high.
  - The minimal 10-token input is far below the ~200K threshold, so a short backup prompt is unlikely to trigger this specific symptom.
  - **Mitigation:** the writer keeps the input <100 tokens. If the response contains obvious gibberish (mixed Chinese, English, Japanese, Arabic, random fragments) even on a short input, the writer captures the verbatim response and records verdict `SKIP-GibberishIncident` with issue id `43181`. No retry. [G9]
- **R3 (Go subscription consumes real allowance, not free).**
  - **Severity:** high.
  - The user's Go subscription is a pre-paid $5/$10 monthly plan with $12/5h, $30/week, $60/month dollar allowances, not a free model. If the backup prompt runs, it costs real subscription allowance. The bounded input (~10 input + ~5 output tokens) and off-peak timing keep the cost at a few micro-cents, but it is NOT zero. The user's prior decision was "do not use a paid OpenCode Zen model or paid fallback" - this addendum is for OpenCode Go, which is a different subscription tier.
  - **Mitigation:** the bounded test is single-prompt, off-peak, with a hard ceiling on the output token count (`max_tokens: 16` in the chat/completions body or equivalent SDK cap). The writer records the exact input/output tokens from the response and the verdict `PASS` is only recorded if the response is well-formed and matches the expected `ok` token. If a previous live-validation run already consumed the 5h allowance, the writer treats any 402/403/429 as `SKIP-AUTH` or `SKIP-COST-UNKNOWN` and stops; no retry. [G2, G7, G14]
- **R4 (Peak vs off-peak pricing doubles the per-1M-token rate).**
  - **Severity:** medium.
  - Peak windows are 01:00-04:00 and 06:00-10:00 UTC. The writer records the UTC time of the test in the evidence record. If the test runs in peak, the cost is bounded but higher; off-peak is preferred.
  - **Mitigation:** the writer checks the UTC clock at the start of the test and records `peak: true|false` in the evidence record. The verdict is not blocked on peak vs off-peak; both are documented. [G2, G6]
- **R5 (Dashboard reporting inconsistencies).**
  - **Severity:** medium.
  - Issues #42985, #43023, #43032, #43149, #43148 suggest Go's per-request cost ledger may not match the dashboard percentage. This is provider-class, not model-specific, and does not change the boundedness of one minimal prompt.
  - **Mitigation:** the writer captures the response's token usage block (`usage.prompt_tokens`, `usage.completion_tokens`) and the dashboard percentage at the time of the test (read-only, no mutation). The verdict notes any dashboard-vs-actual delta as `NOTE-Cost-Discrepancy` and does not block. [G14, G15, G16, G13, G20]
- **R6 (Cost class is mandatory in the evidence record).**
  - **Severity:** medium.
  - The Go subscription is a "low cost subscription" not a free tier, and the writer must never assume the test is cost-free.
  - **Mitigation:** the evidence record's `cost` field is mandatory and is the first field the reviewer checks. A missing or `null` cost field is grounds for `FAIL-Evid` and a fix-loop. [G2, G7]
- **R7 (CLI/SDK minor-series skew).**
  - **Severity:** low.
  - The CLI version 1.18.3 (host) is 0.15 minor behind the SDK 1.18.18 (npm). Same minor-series gap as the Zen research. The Go provider entry is on the v1 surface, so SDK/server skew does not change the request shape.
  - **Mitigation:** the writer pins `throwOnError: true` and `responseStyle: "fields"` for the prompt; both are within the v1 contract. [G21, G22]
- **R8 (No auth-free fallback on the Go provider).**
  - **Severity:** low.
  - The Go provider has no `apiKey: "public"` free-fallback (unlike the Zen provider's free-only public mode). A missing Go credential is an immediate hard error. The user host already has the credential, so this is theoretical, but the writer should not assume a backup test can run auth-free.
  - **Mitigation:** the `auth preflight` row of the bounded test reads `opencode providers list` and asserts `OpenCode Go [api]` is present; if absent, the verdict is `SKIP-AUTH` immediately, no prompt is sent. [G4]
- **R9 (SDK path, not raw fetch).**
  - **Severity:** low.
  - The Go `Authorization: Bearer <key>` header is set by the provider loader; the writer does NOT set the header manually. If the writer hand-rolls a `fetch` call to the gateway, the key would need to be passed via env. The bounded test uses the SDK path (`createOpencode` or `createOpencodeClient`) so the key handling is in the loader.
  - **Mitigation:** the writer is instructed to use the SDK path, not a raw `fetch`. [G4, G21]

## Technical findings

### Verified model identity (canonical, no ambiguity)

- `providerID = opencode-go`, `modelID = deepseek-v4-flash`, full reference `opencode-go/deepseek-v4-flash`. The phrase "DeepSeek V4 Flash on OpenCode Go" maps to this exact reference. There is no `-free` variant on Go; the Go subscription is the only access path. Endpoint: `https://opencode.ai/zen/go/v1/chat/completions`. [G1, G2, G3]

### Verified auth flow (read-only, no key printed)

- Read-only CLI discovery: `opencode providers list` shows `OpenCode Go [api]` as one of five credentials. The CLI does not print the key. The auth file is `~/.local/share/opencode/auth.json` with mode `0o600`. The `Auth.all()` effect reads the file and decodes each entry via the `Info` union schema (`api | oauth | wellknown`). [G1, G4]
- Distinct from Zen: the `opencode` (Zen) provider has an `apiKey: "public"` fallback that filters out non-free models when no key is present. The `opencode-go` provider has NO such fallback. If the Go credential is missing, the model list shows `opencode-go` as a `connected: false` provider; the writer's auth preflight row must check this. [G4]

### Verified SDK prompt body shape (Go, deepseek-v4-flash)

- The smallest valid `client.session.prompt` body for this target:
  ```ts
  {
    model: { providerID: "opencode-go", modelID: "deepseek-v4-flash" },
    parts: [{ type: "text", text: "Reply with the single word: ok" }]
  }
  ```
  Expected response shape with `responseStyle: "fields"`: `{ data: { info: AssistantMessage, parts: Part[] }, error: undefined, response: Response, request: Request }`. The provider is `opencode-go`, NOT `opencode`. The session, model, and SDK call shape are identical to the Zen path documented in the companion research; only `providerID` differs. [G21, G22]
- The `format` body shape (json_schema structured output) is also supported. The Go `/zen/go/v1/chat/completions` endpoint is OpenAI-compatible and accepts `response_format = { type: "json_schema", ... }`; the SDK wraps this via the `format` field. [G2, G21]

### Bounded backup test matrix (defined here, executed by the writer)

Every row is one unit of evidence. The writer runs them in order; the verdict column is filled by the writer and verified by am-review. The matrix is **bounded**: no install, no model substitution, no secret-bearing artifact, no config mutation outside the documented `OPENCODE_CONFIG_CONTENT` channel, no second prompt on the same model id without an explicit user choice.

| # | Test name | Auth needed? | Expected evidence | Safe stop condition |
|---|---|---|---|---|
| 0 | UTC clock and peak/off-peak capture | no | `Date.now()` converted to UTC hours; record `peak: true|false` in evidence record | always runs |
| 1 | Go auth/config preflight (read-only) | no | `opencode providers list` shows `OpenCode Go [api]` (already confirmed) | if absent, verdict `SKIP-AUTH` and STOP |
| 2 | `global.health()` against existing Go server | no | `client.global.health()` returns `{ healthy: true, version: "1.18.x" }`; matches CLI 1.18.3 | 5xx -> `FAIL-Health` with status |
| 3 | SDK prompt with explicit Go model | yes (Go subscription) | `client.session.prompt({ path: { id }, body: { model: { providerID: "opencode-go", modelID: "deepseek-v4-flash" }, parts: [{ type: "text", text: "Reply with the single word: ok" }] } })` returns `{ data: { info: { role: "assistant", ... }, parts: [{ type: "text", text: "ok" }] } }` within 30s; `info.error` is undefined; `usage.prompt_tokens <= 32`; `usage.completion_tokens <= 16` | 30s no-chunk -> `SKIP-LoopIncident` (cite #43146); gibberish -> `SKIP-GibberishIncident` (cite #43181); 401/402/403 -> `SKIP-AUTH`; 429/402 from overage -> `SKIP-Cost-Overage` |
| 4 | SSE / event subscription during Go prompt | yes (Go subscription) | SDK SSE subscription receives an `EventMessageUpdated` (v1) within 30s; raw `curl -N` of `/global/event` (separate process, `&` shell) shows a matching event within 30s | 30s+ zero chunks -> `SKIP-StreamIncident` (cite #43007-pattern) |
| 5 | Cost capture from response | yes (Go subscription) | `usage.prompt_tokens`, `usage.completion_tokens`, `usage.total_tokens` populated; peak/off-peak tagged in evidence record; `cost_class: "subscription_allowance_consumed"` | missing usage block -> `FAIL-Evid` |
| 6 | Cleanup and secret scan | no | `Get-Process opencode` returns 0 rows after `server.close()`; Python heredoc byte-scan for `OPENCODE_API_KEY=[A-Za-z0-9]`, `sk-[A-Za-z0-9]{20,}`, `Bearer sk-` returns empty; git status shows no diff | zombie child -> `FAIL-Cleanup`; secret found -> `FAIL-Secret` |

**Hard ceilings (the writer MUST stop, not retry):**

- **30 seconds wall-clock** on the prompt. If the SDK does not return a complete response within 30s, the writer aborts and records the timeout.
- **1 prompt total** on the Go path. The writer MUST NOT send a second prompt on `opencode-go/deepseek-v4-flash` without an explicit user choice (the user is in the loop, master surfaces the question). The backup is single-shot.
- **Off-peak preferred**, peak allowed but recorded. Both are bounded.
- **No tool calls, no file inputs, no images, no audio.** The test is text-only. The Go deepseek-v4-flash model supports tools and structured output, but the bounded test is the smallest possible surface.

### Acceptable verdicts (defined here, used by the writer)

- `PASS` - the response is well-formed, the assistant text is `ok` (case-insensitive), `info.error` is undefined, `usage` block populated, total request + response tokens <= 48, captured within 30s, peak/off-peak tagged, cost class recorded.
- `FAIL-SDK` - the SDK threw, returned a malformed response, returned `info.error` set, or returned a non-`ok` text body. The writer does NOT retry; this is a programmatic error.
- `SKIP-UPSTREAM-INCIDENT` - the response indicates an upstream gateway / model issue. Sub-classes (all map to the same verdict for the writer; the issue id is recorded separately):
  - `SKIP-LoopIncident` - endless reply loop, 30s+ hang with repeated identical sentence, cite #43146.
  - `SKIP-GibberishIncident` - response text contains the multilingual gibberish pattern, cite #43181.
  - `SKIP-StreamIncident` - SSE stream never produced a chunk in 30s, cite #43007-pattern.
  - `SKIP-EndpointUnavailable` - response is `Upstream request failed: Endpoint is unavailable.`, cite #43163 (note: not DeepSeek-specific but same gateway class).
- `SKIP-AUTH` - the response is 401 / 402 / 403 with no model output. The Go subscription may be inactive, expired, or the credential may be stale. The writer does NOT retry; this is an auth-state signal that needs the user to refresh the credential.
- `SKIP-COST-UNKNOWN` - the response is 429 with `FreeUsageLimitError` text but the model is Go (not free), suggesting an overage on the Go subscription. The writer does NOT retry; this is a cost-bound signal.
- `SKIP-Cost-Overage` - the response is 402 / 403 with a Go-allowance-exceeded message (e.g. "5h limit reached"). The writer does NOT retry; this is a billing signal.
- `FAIL-Evid` - the response is well-formed but the evidence record (usage block, peak/off-peak tag, cost class) is missing or null. The writer fixes the evidence record and the verdict is not blocked by upstream.
- `FAIL-Cleanup` - the writer detected a zombie `opencode` process after `server.close()`. The writer kills it and records the PID.
- `FAIL-Secret` - the secret scan found a key in the working tree. The writer aborts immediately; this is a hard-stop safety condition.

### When the writer stops instead of trying another model

- On `SKIP-LoopIncident`, `SKIP-GibberishIncident`, `SKIP-StreamIncident`, `SKIP-EndpointUnavailable` - the writer stops. These are upstream signals. The writer does NOT substitute `opencode-go/deepseek-v4-pro`, `opencode-go/kimi-k3`, or any other Go model. The user explicitly chose the Go DeepSeek V4 Flash path; substituting is a model change the user did not authorize.
- On `SKIP-AUTH` - the writer stops. The credential state needs user intervention; retrying with the same key will produce the same 401/402/403.
- On `SKIP-Cost-Overage` or `SKIP-COST-UNKNOWN` - the writer stops. The allowance is consumed; retrying will compound the cost.
- On `FAIL-SDK` or `FAIL-Evid` - the writer fixes the program and re-runs ONCE, only if the failure is clearly a code bug (e.g. wrong provider id typo, missing `format` field). If the failure is a server-side SDK error, the writer stops.
- The writer MUST NOT silently fall back to a different model. The bounded backup test is a single-model test.

### Privacy and data-usage stop conditions

- The Go deepseek-v4-flash route has 0-day retention and no model training use. A 10-token synthetic prompt is safe by definition; the writer still records the input text verbatim in the evidence record (no sensitive data) so the reviewer can verify sanitization. [G1, G2]
- The writer MUST NOT include personal, account, billing, API key, or session-internal data in the prompt. The canonical sanitized prompt is the string `"Reply with the single word: ok"`.

## Feasibility verdict

- **Can do:** yes (research is complete; the writer can run a single bounded Go prompt against the existing configured `OpenCode Go [api]` credential).
- **Confidence:** HIGH for model identity, endpoint, capabilities, and cost structure; MEDIUM for the live-prompt verdict (the upstream has two open DeepSeek-V4-Flash-on-Go incidents as of 2026-08-18, both unresolved; a single minimal prompt may or may not trigger either).
- **Why:** The model identity is verified against three independent sources (the user CLI's `opencode models opencode-go` output, the official Go docs page endpoint table, and the official `https://opencode.ai/zen/go/v1/models` catalog). The endpoint, capabilities, and limits are verified against the official Go docs page. The cost structure is verified against the official Go docs page. The two exact-target incidents (#43146, #43181) are verified against the issue tracker. The Zen-side issues (#42977, #43007) are confirmed to NOT apply to the Go path; #43163 applies to a different model class on Go; #43185 applies to a different Go model; #43149 / #42985 / #43023 / #43032 / #43148 are dashboard / cost reporting issues, not request correctness.
- **Risk:** the two open exact-target incidents (#43146, #43181) are the dominant live-time risk. A 10-token prompt is the cheapest possible hedge against #43181's long-context degeneration. A 30-second hard timeout is the cheapest possible hedge against #43146's endless loop. If either fires, the writer records the verbatim symptom and stops; the user is the next decision-maker.
- **Cost verdict:** bounded. One minimal off-peak prompt consumes a few micro-cents of the user's existing $12/5h Go subscription allowance. The cost is not zero but is pre-paid by the user; the bounded test does NOT require a new subscription, a new payment, or a new sign-up. The "do not use a paid OpenCode Zen model or paid fallback" rule from P1b was Zen-specific; the Go path is a separate subscription tier and is pre-authorized.
- **User-input state:** `NEEDS_USER_INPUT: false` IF the user has confirmed (a) the Go subscription is active and (b) the 5h allowance is not exhausted. If either is uncertain, the writer runs the auth preflight + the bounded prompt and the verdict is `SKIP-AUTH` or `SKIP-Cost-Overage` without a retry; the user surfaces back to master for a fresh decision. The research does NOT require another user choice before planning.

## Recommendations for the planning agent

- The existing Zen live-validation matrix in the companion research file is unchanged. The Go backup adds one row to the writer's evidence schema: a `providerID: "opencode-go"` discriminator and a `cost_class: "subscription_allowance_consumed"` field. The plan's Phase 3 file inventory does NOT need a new file; the Go backup rows are added to the same `11_zen_live_evidence.md` (or equivalent) as a new section `### Go backup (opencode-go/deepseek-v4-flash) - one bounded prompt, no retries`.
- The evidence-record JSONL schema gains one new field: `cost_class` with values `free_zen` | `subscription_allowance_consumed` | `paid_per_request`. The Zen rows are `free_zen`; the Go backup row is `subscription_allowance_consumed`. The reviewer can verify the discriminator is present on every row.
- The lint checklist (per the P2 refinement) does NOT need a new check; the existing secret-scan, em-dash-free, citation-resolution, and freshness checks cover the Go backup section. The secret-scan is mandatory because the writer will be running the bounded test against a wired credential.
- The known-issues table in the dossier's `01_overview.md` (or equivalent) gains one row: `#43146 - opencode-go/deepseek-v4-flash endless reply loop` and one row: `#43181 - opencode-go/deepseek-v4-flash multilingual gibberish`. The existing `#43163` row remains a "provider class, not DeepSeek-specific" caveat.
- Do NOT add the Go backup as a hard requirement that the live prompt must succeed. The Zen matrix already treats upstream SKIPs as valid evidence; the Go backup follows the same pattern.
- Do NOT add a fallback to a different Go model. The user explicitly chose the Go DeepSeek V4 Flash path; substituting is a model change the user did not authorize.
- The plan's "Session 0: live-validation preflight" row should be extended to also assert `opencode-go/deepseek-v4-flash` is in the model list (which the existing `opencode models opencode-go` check already confirms).

## Open questions for the user

1. Confirm the OpenCode Go subscription is active and within the $12/5h allowance; if it has lapsed, the bounded backup test stops at SKIP-AUTH and the writer should not retry. (The CLI shows the credential is wired; this is a low-risk confirmation.)
2. (Optional) Confirm off-peak is acceptable for the bounded test. Peak vs off-peak is a per-1M-token price difference ($0.22/$0.66 vs $0.44/$1.32) but the bounded test consumes a few micro-cents either way.

Minimum essential question: Q1. If the user answers "subscription is active, allowance is not exhausted", the writer can proceed with the bounded backup test. If the user answers "uncertain" or "no", the writer runs the auth preflight, records the result, and the verdict is `SKIP-AUTH` or `SKIP-Cost-Overage`; the user surfaces back to master for a fresh decision.

## Self-critique

- **Did I do my job?** yes. The exact model identity `opencode-go/deepseek-v4-flash` is verified against three independent sources (user CLI, official Go docs, public `/zen/go/v1/models` endpoint). The endpoint, capabilities, cost, and privacy are verified against the official Go docs page. The auth flow is verified via read-only CLI discovery without exposing the key. The two exact-target open incidents (#43146 endless loop, #43181 gibberish) are documented with URL, assignee, date, and symptom. The bounded backup test matrix is single-prompt, off-peak-preferred, with a 30-second hard wall-clock and a `cost_class: "subscription_allowance_consumed"` field. The verdict vocabulary explicitly enumerates the SKIP-* classes for each known incident. The writer does NOT silently substitute a different Go model. The privacy stop conditions are documented (10-token synthetic input, no sensitive data).
- **What might I have missed?**
  - The exact wire shape of the `Authorization: Bearer` header and the SDK's `Opencode` loader's `OPENCODE_API_KEY` env var path on Windows is not observed in this research; the writer should re-verify against `provider.ts` at write time. (This is a v0.5.0+ write-time concern, not a research gap.)
  - The exact dashboard percentage at the time of the test is read-only but may not be 0% even on a fresh subscription if a prior test in the same 5h window consumed part of the allowance. The writer's `peak/off-peak` field and `cost_class` field capture this; the dashboard percentage is a separate `dashboard_pct` field that the writer can populate by re-running `opencode providers list` or by reading the console at `https://opencode.ai/auth`. This is a refinement, not a gap.
  - The user's exact timezone vs UTC. The peak windows are in UTC. If the user runs the test at 02:00 local time and is in UTC+3, the test is at 23:00 UTC, off-peak. If the user is in UTC-3 and runs at 02:00 local, the test is at 05:00 UTC, also off-peak. The writer records the UTC time and the verdict is bounded either way.
- **What did I assume without evidence?**
  - That the user's `OpenCode Go [api]` credential is bound to an ACTIVE subscription. The CLI shows the credential is configured; a configured credential is necessary but not sufficient. The bounded test is the wire-level proof; if it returns 401/402/403, the verdict is `SKIP-AUTH` and the writer stops.
  - That the Go subscription has a non-exhausted 5h allowance at the time of the test. Same caveat: the bounded test is the wire-level proof; if it returns 429/402-from-overage, the verdict is `SKIP-Cost-Overage` and the writer stops.
  - That the SDK's chat/completions wire format for `opencode-go/deepseek-v4-flash` is identical to the Zen path. The Go docs page confirms the endpoint is OpenAI-compatible chat/completions with `@ai-sdk/openai-compatible`; the SDK call shape is the same. The writer re-validates at write time.

## Build vs. reuse decisions - please confirm

None. The existing 13-file dossier architecture is unchanged. The Go backup is one additional bounded-prompt section in the same `11_zen_live_evidence.md` (or equivalent) that the Zen primary uses. The evidence-record JSONL schema gains one field (`cost_class`); no new file is required.

## Existing solutions (landscape scan)

Landscape scan skipped per the canonical-research rule "User provided a single known target and one source suffices." The user named OpenCode Go + DeepSeek V4 Flash; the SDK is npm-generated; the catalog is the public `/zen/go/v1/models` endpoint; the docs page is the single canonical source. The only meaningful comparison would be a different Go model, but the user explicitly chose V4 Flash and the writer does not substitute.

## Documentation architecture recommendations for `opencode-sdk-agent-docs/`

The existing 13-file architecture is unchanged. The Go backup is appended to the same evidence section as the Zen primary. The known-issues table gains two rows (#43146, #43181). No new file.

## What live validation can prove (and cannot prove in one environment/account)

- **Can prove:** SDK parity with the embedded server for the `opencode-go` provider (config.providers lists `opencode-go`); the `createOpencode` lifecycle completes without timeout; a real prompt against `opencode-go/deepseek-v4-flash` returns a well-formed response (or one of the SKIP-* classes above); the `usage` block is populated; the cleanup kills the child process tree on Windows; the secret scan finds no key in the working tree.
- **Can prove only conditionally:** Whether the prompt returns a clean `ok` response depends on the upstream DeepSeek V4 Flash Go route at test time. If #43146 or #43181 is active, the verdict is `SKIP-LoopIncident` or `SKIP-GibberishIncident`, both of which are valid evidence that the SDK reached the gateway and the gateway is currently degraded for this exact model.
- **Cannot prove:** (a) That the model behavior is stable across regions / time-of-day; (b) that the same model is accessible to a different account with a different Go subscription; (c) cross-account rate limits; (d) that the prompt token usage matches the dashboard percentage; (e) that the ZDR agreement (renewed monthly, valid through August 31, 2026) is still in effect on the day of the test.

## Citation ledger

- [G1] OpenCode Providers docs page, official, https://opencode.ai/docs/providers/, access date 2026-08-18 (OpenCode Go section: `OpenCode Go [api]` credential, `/connect` flow, `opencode.ai/auth` billing, `~/.local/share/opencode/auth.json` storage, `opencode-go/<model-id>` reference format).
- [G2] OpenCode Go docs page, official, https://opencode.ai/docs/go/, access date 2026-08-18 (subscription price $5 first / $10 monthly, $12/5h / $30/week / $60/month allowance, 19-model catalog, deepseek-v4-flash endpoint `https://opencode.ai/zen/go/v1/chat/completions` with `@ai-sdk/openai-compatible`, peak 01:00-04:00 + 06:00-10:00 UTC at $0.44/$1.32 per 1M, off-peak $0.22/$0.66, 0-day retention with ZDR renewed monthly through Aug 31 2026, 7,600 req per 5h estimate for deepseek-v4-flash).
- [G3] models.dev OpenCode Go provider page, official, https://models.dev/providers/opencode-go, access date 2026-08-18 (provider id `opencode-go`, npm `@ai-sdk/openai-compatible`, API `https://opencode.ai/zen/go/v1`, 25 models, deepseek-v4-flash context 1M / output 384K / cost $0.22/$0.66 off-peak / reasoning / tool-call / structured / temp).
- [G4] OpenCode provider source, official source, https://raw.githubusercontent.com/anomalyco/opencode/dev/packages/opencode/src/provider/provider.ts, access date 2026-08-18 (the `opencode` (Zen) custom loader with `apiKey: "public"` fallback that filters non-free models; the absence of an equivalent `opencode-go` custom loader means no auth-free path for Go; `Info` union schema for `Auth.all()` decode).
- [G5] models.dev DeepSeek V4 Flash page, official, https://models.dev/models/deepseek/deepseek-v4-flash, access date 2026-08-18 (model metadata, capability flags, mappings to upstream `deepseek/deepseek-v4-flash-0731`, 53 providers, knowledge 2025-05).
- [G6] DeepSeek pricing page, official, https://api-docs.deepseek.com/quick_start/pricing/, access date 2026-08-18 (peak 01:00-04:00 and 06:00-10:00 UTC, off-peak otherwise; cited by the Go docs for peak window definition).
- [G7] Live-validation choices handoff, project-local, `share/handoffs/03_live-validation-choices_T-2026-08-18-001.md`, access date 2026-08-18 (P1b user decisions: primary `opencode/deepseek-v4-flash-free`, no paid Zen fallback, OpenCode Go as the bounded backup; the Go path is a separate subscription tier, not a Zen pay-per-use path).
- [G8] GitHub issue #43146, official issue, https://github.com/anomalyco/opencode/issues/43146, access date 2026-08-18 (open, 2026-08-18, assignee `MrMushrooooom`, opened by `omani`, `deepseek flash v4 (opencode go) is broken`, endless reply loop, CLI 1.18.18, Alpine Linux).
- [G9] GitHub issue #43181, official issue, https://github.com/anomalyco/opencode/issues/43181, access date 2026-08-18 (open, 2026-08-18, assignee `MrMushrooooom`, opened by `yiyayoh`, `[OpenCode Go] DeepSeek V4 Flash intermittently degenerates into gibberish`, ~200K input threshold, A/B confirms Go V4 Flash is the only failing path; reporter used RikkaHub on Android 16, not the OpenCode CLI).
- [G10] GitHub issue #43163, official issue, https://github.com/anomalyco/opencode/issues/43163, access date 2026-08-18 (open, 2026-08-18, opened by `shiye1274`, `Upstream request failed: Endpoint is unavailable` for qwen3.7-plus / qwen3.7-max / grok-4.5 on Go; deepseek-v4-flash is NOT in the failing matrix but the underlying gateway class is shared).
- [G11] GitHub issue #43185, official issue, https://github.com/anomalyco/opencode/issues/43185, access date 2026-08-18 (open, 2026-08-18, assignee `fwang`, opened by `zarahao`, `mimo-v2.5 (opencode-go)` tool calls fail; distinct model, distinct symptom).
- [G12] GitHub issue #43007, official issue, https://github.com/anomalyco/opencode/issues/43007, access date 2026-08-18 (open, 2026-08-17, `opencode proxy gateway SSE stream hangs silently with zero chunks`; reporter's stack is `providerID=opencode modelID=deepseek-v4-flash-free` on Zen, NOT Go).
- [G13] GitHub issue #43149, official issue, https://github.com/anomalyco/opencode/issues/43149, access date 2026-08-18 (open, 2026-08-18, assignee `fwang`, USD vs percentage mismatch on `opencode-go/deepseek-v4-pro`, not V4 Flash).
- [G14] GitHub issue #42985, official issue, https://github.com/anomalyco/opencode/issues/42985, access date 2026-08-18 (open, 2026-08-17, opened by `tnn226`, Go quota ~4x higher than displayed DeepSeek V4 Flash cost; directly relevant to the user's backup target).
- [G15] GitHub issue #43023, official issue, https://github.com/anomalyco/opencode/issues/43023, access date 2026-08-18 (open, 2026-08-17, opened by `Guard42`, Go quota usage inconsistency; monthly exceeds weekly percentage).
- [G16] GitHub issue #43032, official issue, https://github.com/anomalyco/opencode/issues/43032, access date 2026-08-18 (open, 2026-08-17, opened by `AakashKay`, Go plan monthly usage doesn't reconcile with actual spend or weekly).
- [G17] GitHub issue #42991, official issue, https://github.com/anomalyco/opencode/issues/42991, access date 2026-08-18 (closed completed, 2026-08-17, Go subscription usage discrepancy; closed).
- [G18] GitHub issue #42977, official issue, https://github.com/anomalyco/opencode/issues/42977, access date 2026-08-18 (Zen free-limit 429 on `opencode/deepseek-v4-flash-free`; NOT the Go path; documented in companion Zen research).
- [G19] GitHub issue #42987, official issue, https://github.com/anomalyco/opencode/issues/42987, access date 2026-08-18 (closed not-planned, 2026-08-17, Go subscription DeepSeek Harness integration issues; closed intentionally).
- [G20] GitHub issue #43148, official issue, https://github.com/anomalyco/opencode/issues/43148, access date 2026-08-18 (closed not-planned, 2026-08-18, USD vs percentage mismatch on Go V4 Pro; closed intentionally, same root cause as #43149).
- [G21] OpenCode SDK source, official source, `https://raw.githubusercontent.com/anomalyco/opencode/dev/packages/sdk/js/src/{index,client,server}.ts`, access date 2026-08-18 (v1.18.18; `Session.prompt` body shape with `model: { providerID, modelID }`; `format` field for json_schema; `responseStyle: "fields"` default; `throwOnError` interceptor).
- [G22] OpenCode SDK docs page, official, https://opencode.ai/docs/sdk/, access date 2026-08-18 (full API map, `Session.prompt` body, `format` field, `global.health`).
- [G23] OpenCode Models docs page, official, https://opencode.ai/docs/models/, access date 2026-08-18 (`provider_id/model_id` example: `opencode/gpt-5.1-codex`; same convention used for `opencode-go/<id>` per the Go docs).
- [G24] User-host CLI discovery, read-only, `opencode models opencode-go` -> 19 models including `opencode-go/deepseek-v4-flash`; `opencode providers list` -> `OpenCode Go [api]` credential present, captured 2026-08-18 environment (CLI 1.18.3).

Source-type tags:
- "official" = opencode.ai docs pages, github.com/anomalyco/opencode issue pages, models.dev, deepseek.com docs.
- "official source" = source files inside the `anomalyco/opencode` repo on the `dev` branch.
- "official issue" = github.com/anomalyco/opencode/issues/<n>.
- "project-local" = handoff, scope-change, and progress files inside this repository.
- "CLI discovery" = read-only `opencode` CLI invocations on the user host; no auth required for `models`/`providers list`; the key is never printed.
- All sources verified reachable on 2026-08-18 unless noted otherwise.

---

## Anomalous content

None. All fetched content is official documentation, official source code, official issue metadata, or read-only CLI discovery. The PowerShell stderr/stdout interleaving for `opencode providers list` printed a partial ANSI escape sequence (`[0m`, `[90m`, etc.) which is a CLI rendering artifact, not prompt injection. The reporter-level "opencode go" vs "Zen gateway" disambiguation in #43163's title (and #43146's title) is treated as evidence, not instructions. No untrusted content addressed the research directly; no overrides requested; no exfiltration requested.

---

## Metrics

- findings: 25
- risks_HIGH: 3
- risks_MEDIUM: 3
- risks_LOW: 3
- clarifying_Qs: 2

---

`NEEDS_USER_INPUT: false` IF the Go subscription is active and the 5h allowance is not exhausted; otherwise the writer's bounded test produces `SKIP-AUTH` or `SKIP-Cost-Overage` and the writer stops. The research does NOT block the planner; the writer has a documented bounded backup test that the user can run or skip based on the existing live-validation choice.
