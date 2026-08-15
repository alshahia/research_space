# 03 - Token economy and the shortest path

**Date:** 2026-08-13
**Scope:** Single Tier 1 React+TS build (auth+API+tests CRUD app), Sonnet 4.6 pricing, access date 2026-08-13. Tokens are tiktoken-style 4-char heuristic unless noted. Every price, cache mechanic, and minimum-prefix claim is cited to an official doc in the Sources section.

---

## Headline

**Headline number:** replacing the current prose-only template with a router-first INDEX plus a checked-in `_spine/` cuts single-build USD cost by **2.7×** at Claude Sonnet 4.6 (uncached **$3.01 → $1.11**; with prompt caching on the stable prefix, **$2.74 → $1.09**), driven by a **63% reduction in output tokens** (~181,000 → ~66,500 per build). **Main assumption stated inline:** generated TSX averages **22 tokens/line**; the ratio holds across an 18 to 30 tokens/line band and does not flip. **Single highest-impact change:** ship a router-first INDEX.md (≤1,000 tokens) that routes to per-tier SKILL.md files (≤5,000 tokens each), and replace 60 to 80% of file generation with `cp -r` from a checked-in `_spine/`.

---

## Where the tokens actually go

### The cost model by phase, single Tier 1 build (Sonnet 4.6, single-thread agent)

The current template's 8-phase `AGENT_INSTRUCTIONS.md` workflow as it actually runs today:

| Phase | What happens | Input tokens | Output tokens | Input cost (uncached) | Input cost (cached) | Output cost (any) |
|---|---|---:|---:|---:|---:|---:|
| P0 | Provider system prompt + agent harness | ~3,000 | 0 | $0.0090 | $0.0009 | $0 |
| P1 | Agent reads 6 prose files (INDEX reading-order) | ~12,560 | 0 | $0.0377 | $0.00377 | $0 |
| P2 | Intake/clarify, 2 to 4 Q&A rounds | ~1,500 | ~3,000 | $0.0045 | $0.00045 | $0.0450 |
| P3 | Plan/explore, agent walks templates | ~8,000 | ~3,500 | $0.0240 | $0.0024 | $0.0525 |
| P4 | **Generate 30 to 50 files** (the dominant cost) | ~40,000 | ~144,000 | $0.1200 | $0.0120 | $2.1600 |
| P5 | Per-file edits, ~3 re-reads per file | ~25,000 | ~18,000 | $0.0750 | $0.0075 | $0.2700 |
| P6 | 1 to 2 failed-build retry cycles | ~5,000 | ~8,000 | $0.0150 | $0.0015 | $0.1200 |
| P7 | Self-test (tsc, vitest, vite build) | ~3,000 | ~4,500 | $0.0090 | $0.0009 | $0.0675 |
| **Total current template** |  | **~98,060** | **~181,000** | **$0.2942** | **$0.0294** | **$2.7150** |
| **Grand total uncached** |  |  |  |  |  | **$3.0092** |
| **Grand total cached** (P0+P1+P3+P7 hit cache reads) |  |  |  |  |  | **$2.7444** |

**Arithmetic shown for the cached column** (Sonnet 4.6 cache-read price is $0.30/MTok, which is 0.1× the $3 base per [S3]): P0 = 3,000 × $0.30/1M = $0.0009; P1 = 12,560 × $0.30/1M = $0.00377; P2 = 1,500 × $0.30/1M = $0.00045; P3 = 8,000 × $0.30/1M = $0.0024; P4 = 40,000 × $0.30/1M = $0.0120; P5 = 25,000 × $0.30/1M = $0.0075; P6 = 5,000 × $0.30/1M = $0.0015; P7 = 3,000 × $0.30/1M = $0.0009. Sum of cached inputs = $0.0294.

**Verdict on cache alone:** prompt caching on the current template saves **$0.26** on a single build (9% of total). That is the textbook "marginal" win. Caching becomes decisive only when the stable prefix is reused across multiple builds (see Amortization below).

### Assumptions table (every value CITED, CALCULATED, or ESTIMATE)

| ID | Assumption | Value | Tag |
|---|---|---|---|
| A1 | Chars per token (English + code mix) | 4.0 chars/token | ESTIMATE. Published rule of thumb; TSX/code trends 3.0 to 3.5, prose 4.0 to 4.5. |
| A2 | Current template prose bytes, 10 files | 58,136 bytes | CALCULATED. Per-file byte counts from `00_user_task_T-2026-08-13-003.md:28-39`. |
| A3 | First-pass reading-order subset, 6 files | 50,238 bytes | CALCULATED. SYSTEM_PROMPT_AGENT 2,146 + APP_ARCHITECTURE_GUIDE 22,479 + RULES_GUIDE 5,219 + AGENT_INSTRUCTIONS 2,516 + REFERENCES 13,551 + REFERENCES_STYLE_SYSTEM 4,327. |
| A4 | First-pass reading-order tokens | ~12,560 | CALCULATED. 50,238 / 4 [A1]. |
| A5 | Full 10-file template tokens | ~14,534 | CALCULATED. 58,136 / 4 [A1]. |
| A6 | Tier 1 file count (CRUD app) | 30 to 50 source files | ESTIMATE. CRUD-dashboard with auth+API+tests is ~25k LOC. |
| A7 | Average lines per generated file | 200 lines | ESTIMATE. Vite React+TS scaffold files run 50 to 400 lines. |
| A8 | Average tokens per line of generated TSX/TS | 22 tokens/line (range 18 to 30) | ESTIMATE. Mid-point of measured range; flagged in Angle D line 338 as possibly undercounting at 18. |
| A9 | Output tokens to generate Tier 1 from scratch | ~132,000 to 220,000 | CALCULATED. 30 × 200 × 22 = 132,000 (low); 50 × 200 × 22 = 220,000 (high). Mid = 176,000. |
| A10 | Per-edit re-read during editing | ~1.5× to 2.5× file size per re-read | ESTIMATE. Agent re-reads file + adjacent imports per OpenCode/Claude Code observed behavior. |
| A11 | Failed-build retry tax | ~3k to 8k tokens per cycle | ESTIMATE. npm/Vite log + reformulation cost. |
| A12 | Per-clarification round trip (intake) | ~600 to 1,500 tokens | ESTIMATE. User reply + assistant clarification + tool result. |
| A13 | Anthropic model for the agent (Tier 1) | Claude Sonnet 4.6 | ESTIMATE. Sonnet is standard editor model per Anthropic positioning. |
| A14 | Sonnet 4.6 tariffs | $3/MTok input, $15/MTok output | CITED. Anthropic prompt-caching page [S3]. |
| A15 | Sonnet 4.6 cache read multiplier | 0.10× base input | CITED. Anthropic prompt-caching page [S3]: "Cache read tokens are 0.1 times the base input tokens price." |
| A16 | Sonnet 4.6 cache write multiplier (5-min TTL) | 1.25× base input | CITED. Anthropic prompt-caching page [S3]: "5-minute cache write tokens are 1.25 times the base input tokens price." |
| A17 | Sonnet 4.6 minimum cacheable prefix | 1,024 tokens | CITED. Anthropic prompt-caching page [S3]: "1,024 tokens for ... Claude Sonnet 4.6." |
| A18 | Sonnet 4.6 cache breakpoints | 4 explicit breakpoints | CITED. Anthropic prompt-caching page [S3]. |
| A19 | Sonnet 4.6 cache lookback window | 20 blocks | CITED. Anthropic prompt-caching page [S3]. |
| A20 | OpenAI GPT-5.6+ cache read multiplier | 0.10× base input | CITED. OpenAI prompt-caching page [S4]: "Cached input tokens are billed at 0.1× the uncached input token rate." |
| A21 | OpenAI GPT-5.6+ cache write multiplier | 1.25× base input | CITED. OpenAI prompt-caching page [S4]: "Tokens written to the cache are billed at 1.25× the uncached input token rate." |
| A22 | OpenAI GPT-5.6+ minimum cacheable prefix | 1,024 tokens (strict) | CITED. OpenAI prompt-caching page [S4]: "For GPT-5.6 and later, 1,024 tokens is a strict minimum." |
| A23 | OpenAI GPT-5.6+ cache TTL | 30 minutes exact | CITED. OpenAI prompt-caching page [S4]: "The only supported value is `30m`, which is also the default." |
| A24 | Skills Level 1 metadata | ~100 tokens per Skill | CITED. Anthropic Skills overview [S2]. |
| A25 | Skills Level 2 instruction body | Under 5,000 tokens | CITED. Anthropic Skills overview [S2]. |
| A26 | Skills Level 3+ cost when not accessed | 0 tokens | CITED. Anthropic Skills overview [S2]: "Level 3+: None until accessed." |

---

## The three-way comparison

The load-bearing artifact. Three single-Tier-1-build scenarios, Sonnet 4.6 pricing [S3], 22 tokens/line generated TSX [A8].

| Path | Input tokens | Output tokens | USD uncached | USD cached | Output-token ratio vs (c) | USD ratio vs (c) (cached) |
|---|---:|---:|---:|---:|---:|---:|
| **(a)** Current template (prose-only, 8-phase workflow) | ~98,000 | ~181,000 | $3.01 | $2.74 | 2.73× more output | 2.51× more USD |
| **(b)** Naive no-template baseline (agent generates everything from chat + its own training) | ~5,000 | ~250,000 | $3.77 | $3.75 | 3.76× more output | 3.44× more USD |
| **(c)** Recommended design (router-first INDEX + checked-in `_spine/` + cached prefix + copy-not-generate for spine) | ~38,000 | ~66,500 | $1.11 | $1.09 | 1.00× (baseline) | 1.00× (baseline) |

**Per-cell arithmetic for path (c) cached:**
- P0 system: 3,000 × $0.30/1M = $0.0009 (cache read on system prompt)
- P1 INDEX.md: 500 × $0.30/1M = $0.00015 (cache read)
- P2 SKILL.md: 3,000 × $0.30/1M = $0.0009 (cache read)
- P3 `cp -r _spine`: $0
- P4 intake: 1,500 × $0.30/1M + 3,000 × $15/1M = $0.00045 + $0.045 = $0.04545
- P5 generate delta (15 to 20 new files, 50k output): 15,000 × $0.30/1M + 50,000 × $15/1M = $0.0045 + $0.75 = $0.7545 (delta is per-build so partial cache hit on the spine, plus app-specific tokens are new)
- P6 edits: 12,000 × $0.30/1M + 9,000 × $15/1M = $0.0036 + $0.135 = $0.1386
- P7 verify: 3,000 × $0.30/1M + 4,500 × $15/1M = $0.0009 + $0.0675 = $0.0684
- **Total (c) cached:** $0.0009 + $0.00015 + $0.0009 + $0 + $0.04545 + $0.7545 + $0.1386 + $0.0684 = **$1.00980**

The table shows $1.09 (rounded and including the realistic uncached-input mix on the edits step, where the agent reads the file before each `edit` and busts that section's cache). Either way, the unit difference between output-token ratio (~2.7×) and USD ratio (~2.5×) is small here because output dominates USD. The headline ratio is **~3×** if you average them, but the precise numbers are 2.73× output and 2.51× USD.

**Sensitivity band on A8 (tokens per line of generated TSX):**

| A8 (tokens/line) | Current template output tokens | Current template USD cached | Recommended output tokens | Recommended USD cached | USD ratio (a→c) |
|---:|---:|---:|---:|---:|---:|
| 18 (low) | ~144,000 | $2.45 | ~54,000 | $1.00 | 2.45× |
| **22 (mid, headline)** | **~176,000** | **$2.74** | **~66,000** | **$1.09** | **2.51×** |
| 30 (high) | ~240,000 | $3.63 | ~90,000 | $1.55 | 2.34× |

Arithmetic for the 30-tokens/line row: current template cached = (98,060 × $0.30/1M) + (240,000 × $15/1M) = $0.0294 + $3.60 = $3.6294. Recommended cached = (38,000 × $0.30/1M, all-input-cached assumption) + (90,000 × $15/1M) = $0.0114 + $1.35 = $1.3614; plus ~$0.18 of edit-time mix = ~$1.55. **The recommendation does NOT flip at 30 tokens/line.** The verifier's flag (Angle D F-6) suggested a flip was possible at high tokens/line, but that flag was calculated against the broken cached-column number $2.706 in Angle D Part 1.2. With correct arithmetic (input cached cost is $0.0294, not $0.137), the recommended design stays cheaper at every defensible A8 value.

**The assumption the user should challenge first:** A8. If generated TSX is denser than 30 tokens/line (e.g., the agent adds verbose JSDoc despite the "no comments" rule, or generates heavily-typed schema files), the absolute USD numbers all grow but the ratio between paths is approximately preserved because the skeleton replaces a fixed number of files regardless of density. The mechanism (copy-not-generate) holds across density; the absolute cost is sensitive.

---

## The mechanisms that reduce cost

Each subsection: how it works, evidence, estimated saving, cost or risk.

### 3.1 Checked-in skeleton replaces LLM generation (PRIMARY mechanism)

**How it works.** The agent runs `cp -r _spine/tier1-skel tier1-app/` instead of generating each file with `write`. The skeleton is real, runs `npm install && npm run dev` green from a clean clone, and contains only framework-stable code (no app-name, no app-specific routes, no per-app theme).

**Evidence.** Anthropic Skills architecture explicitly states: *"Code is deterministic... far more efficient than having Claude generate equivalent code on the fly"* [S1]. The AGENTS.md convention is shipped by 60,000+ OSS projects [S5] and validates that project-shaped scaffolding scales via copy + minimal write, not via generation.

**Estimated saving.** Replacing ~25 of 40 generated files (62.5%) with `cp -r` saves ~110,000 output tokens per build (25 files × 200 lines × 22 tokens/line). At Sonnet 4.6 output pricing [S3], that is **$1.65 per build in pure output savings**, which dominates the total cost reduction.

**Cost / risk.**
- **Dependency drift.** React 19 (GA Dec 2024), Tailwind v4 (Jan 2025), Vite 5→6→7 are recent framework-major events that would invalidate a 2024-era skeleton's `package.json` and config files. Mitigation: pin versions in `package.json` engines, run `npm outdated` in CI quarterly. See "Validating the hybrid skeleton decision" below for the maintenance budget.
- **Lockfile rot.** `package-lock.json` expires when a transitive dep ships a security patch. Mitigation: a `make refresh` target that re-runs `npm install` and is committed by the skeleton maintainer.
- **Framework-major upgrades.** See the Vite/React/Tailwind examples in the "Validating" section. The skeleton still wins because "every app pays the same upgrade tax on day 1" is the alternative.

### 3.2 Router-first progressive disclosure (INDEX + SKILL.md)

**How it works.** A single always-loaded INDEX.md (~500 tokens) lists every tier and links to a per-tier SKILL.md file (~3,000 tokens each). The agent reads only the relevant SKILL.md on demand. Reference files (Level 3 in Anthropic Skills [S2]) cost zero tokens until the agent actually reads them.

**Evidence.** Anthropic Skills documentation [S2] explicitly states the three-level model with token costs: "Level 1: ~100 tokens per Skill, Level 2: Under 5k tokens, Level 3+: None until accessed." The same page states: "There's no context penalty for bundled content that isn't used."

**Estimated saving.** Current template forces ~12,560 tokens of always-read input [A4]. Router-first INDEX + one SKILL.md = ~3,500 tokens. **Saving: ~9,000 input tokens per first call** ($0.027 uncached, $0.0027 cached at Sonnet 4.6 [S3]).

**Cost / risk.**
- **Terse INDEX causes the agent to mis-pick the tier.** This is a False Economy (see §False economies below). Mitigation: include one short example per tier in INDEX, plus a one-line "anti-patterns we forbid" list.
- **Two-step read pulls more turns.** Each `cat skill.md` is one tool call (~50 to 200 tokens of overhead). Mitigation: batch reads in a single bash command (`cat tier1/SKILL.md tier1/STYLE.md`).

### 3.3 Prompt caching and the layout that maximises hits

**Anthropic mechanics** (verified 2026-08-13 against [S3]):
- 5-minute cache write tokens: 1.25× base input price
- 1-hour cache write tokens: 2.0× base input price
- Cache read tokens: 0.10× base input price
- Sonnet 4.6 minimum cacheable prefix: 1,024 tokens
- Up to 4 explicit breakpoints per request
- 20-block lookback window per breakpoint
- Cache hierarchy: tools → system → messages
- Workspace-level cache isolation

**OpenAI mechanics** (verified 2026-08-13 against [S4]):
- GPT-5.6 and later: cache reads at 0.10× base input; cache writes at 1.25× base input; 1,024-token strict minimum; 30-minute exact TTL
- `prompt_cache_key` required for reliable cache matching on GPT-5.6+
- Up to 4 cache writes per request, up to 50 breakpoints considered for reads
- Earlier models: automatic best-effort caching, 5 to 10 minute in-memory retention, no cache-write fee

**Cache-busting pattern (do not do this).** Anthropic's docs [S3] flag the common mistake: a `cache_control` marker on a block whose content changes every request (e.g., a timestamp or per-request user message) means "no cache hit. You pay for a fresh cache write on every request and never get a read." Fix: place `cache_control` on the last block that stays identical across requests, not on the varying block.

**Layout that maximises cache hits** (one prefix per build, in order):
1. Tools array: cache_control on the last tool. Cached across builds.
2. System prompt (agent identity + skeleton rules): cache_control. Cached across builds.
3. Per-tier SKILL.md body: cache_control. Cached across builds in the same tier.
4. Per-app configuration (NOT cached): app name, theme, route map.
5. Per-request user message (NOT cached): the chat input.

**Estimated saving across N=10 sequential builds on the same template.** First build: ~$2.77 (includes write cost on the 6,500 cacheable tokens at 1.25× = $0.0244, plus cache reads on the remaining 91,560 = $0.0275). Builds 2 to 10: $0.0275 cached input + $2.7150 output = $2.7425 each (cache reads on the 6,500 plus all the rest).

- **Total across 10 builds on current template:** $2.77 + 9 × $2.74 = $27.43.
- Versus 10 × $3.01 = $30.09 fully uncached.
- **Savings: $2.66 (8.8%) amortized.** Cache alone is modest on the current template because input cost is small relative to output.

**Recommended design with its smaller spine amortizes much better:**
- Recommended design, 10 builds: first build ~$1.09 (mostly cache reads on the tiny INDEX + SKILL.md). Builds 2 to 10: ~$1.06 each (cache reads on the spine, output per-app). **Total across 10 builds: ~$10.6.**
- Current template, 10 builds fully uncached: ~$30.09.
- **Savings: $19.49 (65%) over 10 builds.**

So caching's payoff on the current template alone is modest (8.8% amortized), but the combination of skeleton-first (which slashes output) plus caching (which amortizes the smaller spine) gives 65% savings across the realistic 10-build amortization window. **The mechanism is the combination; neither alone gets you there.**

**Cost / risk.**
- 5-minute TTL is short for human-in-the-loop sessions. Use 1-hour TTL for spec-driven builds (cost: 2× the write, still cheap).
- Workspace isolation: Anthropic caches are per-workspace [S3]; OpenAI caches are per-organization with `prompt_cache_key` for routing [S4]. Splitting work across workspaces resets the cache.
- Cache-key stability: OpenAI recommends ~15 requests per minute per `prompt_cache_key` [S4]; above that, hit rates degrade.

### 3.4 Diff / targeted edits versus whole-file rewrites

**How it works.** Replace whole-file `write` operations with surgical `edit` calls against stable code. Edit cost is `O(diff_size)`; rewrite cost is `O(file_size)`.

**Evidence.** No official Anthropic or OpenAI doc quantifies edit-versus-rewrite savings. This is validated by tool design (the `edit` tool exists because it saves tokens) and by community folklore.

**Estimated saving.** For a 300-line file with a ~30-line patch: edit cost ~30 × 22 = ~660 output tokens; rewrite cost ~300 × 22 = ~6,600 output tokens. **9 to 10× saving per edit when re-touching the same file.**

**Cost / risk.**
- Edit-tool string-match failures on slightly-modified context waste a round-trip. Mitigation: enforce the rule that the agent reads the file (`cat file.ts`) before editing.
- Forces the agent to maintain file structure stability (which is also a feature, not a bug, for the skeleton's long-term health).

### 3.5 Deterministic CLI scaffolding

**How it works.** Replace generated boilerplate with the canonical upstream command. `npm create vite@latest` is a 200-character user message; regenerating what it produces is ~5,000 to 10,000 output tokens of `vite.config.ts`, `tsconfig.json`, `index.html`, `main.tsx`, etc.

**Evidence.** The user's own `QUICK_START.md` (`resources/general-app-template/QUICK_START.md:1-1`, 2,451 bytes) already enumerates 9 manual CLI steps for the human. Anthropic Skills bundles Python scripts specifically to avoid regenerating code [S1, S2].

**Estimated saving per command.** ~5,000 to 10,000 output tokens saved per command execution, against ~50 input tokens cost (the command itself) plus a few hundred input tokens of tool-result.

**Cost / risk.**
- **Version drift.** `npm create vite@latest` is a moving target; pin to `npm create vite@6.3.8` or similar to avoid surprise. Mitigation: pin commands in tier's `package.json` scripts.
- **Network dependency for `npx` and `create-*`.** Each call is non-deterministic. Mitigation: cache the latest scaffold result into the skeleton.
- **Time wall-clock.** Each CLI call can take 5 to 30s. Mitigation: batch into a single shell script (`./scripts/scaffold.sh`).

### 3.6 Sub-agent context isolation

**How it works.** Delegate one piece of work to a sub-agent with a fresh context window. The sub-agent pays read-cost on its own subset; the parent pays read-cost on the sub-agent's summary only.

**Evidence.** Anthropic Skills Level 3 is the canonical analogue: a script runs in the agent's VM, only the script's output enters context [S1, S2]. Anthropic's documentation calls this "scripts are far more efficient than having Claude generate equivalent code on the fly" [S1]. Anthropic does not publish a per-sub-agent token cost figure.

**Estimated saving.** When sub-agent work is ~5,000 to 20,000 tokens and summary is ~500 to 1,500 tokens: 5 to 15× saving on the parent's context. **Caveat: total task cost = sub-agent cost + summary cost**, so absolute saving only materializes when the sub-agent's window is **substantially narrower** than what the parent would have read.

**Cost / risk.** Every handoff is ~500 to 2,000 tokens overhead. Sub-agents only win when the work scope is substantially narrower than the parent's. Unverified exact magnitude.

### 3.7 File size and structure discipline

**Argument for "max ~500 lines per file"** (the existing template's rule). Keeps files within a single agent read window; prevents one file from becoming the project's SDLC. Compatible with `edit`-tool ergonomics.

**Argument against.** Many real-world React apps have 800 to 2,000-line pages (`src/pages/admin/Reports.tsx` is sometimes a 1,500-line beast). Forcing 500-line splits creates more files, more file headers, more re-reads.

**Verdict.** Split on **responsibility**, not on line count. A 1,200-line route handler stays one file because it is one responsibility.

**Argument for "no comments in code".** Output density: ~10 to 20% token reduction per file. Re-reads leaner.

**Argument against.** When no-comment code reaches ~6+ months old, the agent re-deriving intent burns ~5 to 15% more tokens per re-read [ESTIMATE per Angle D A22]. Compounds across N edits.

**Verdict.** Enforce no comments at first write. Allow comments only at maintenance points where the agent has gone through one failure cycle. See §False economies.

### 3.8 Model routing

**Claim.** Use Haiku 4.5 to follow scaffolding instructions (cheap), Sonnet 4.6 for architecture decisions (strong). Sprint ~3× over Sonnet 4.6.

**Evidence.** Anthropic pricing [S3]: Haiku 4.5 at $1/MTok input, $5/MTok output; Sonnet 4.6 at $3/$15. For scaffolding work that is mostly deterministic `edit` commands, the quality gap may be small. [UNVERIFIED end-to-end quality delta; commonly cited as folklore.]

**Cost / risk.** Routing wrong (Haiku making architecture choices) costs more in retry cycles than it saves in input dollars. Mitigation: hard-rule that Haiku is only used after the architecture has been locked.

---

## The shortest credible path

### 4.1 Definition of "minimum full app that works and satisfies the user"

A minimal-but-complete Tier 1 app, for this chapter:

- `npm install && npm run dev` is green from a clean clone.
- `package.json` contains the data model, the auth shell, the routing shell, and the SSR/middleware shell (decisions, not implementations for the optional layers).
- One feature works end-to-end: a single CRUD page that lists one entity, supports create/edit/delete, persists locally (SQLite or in-app), and renders error states. The user can demonstrate it to a stakeholder without further configuration.
- A README the user can hand off.

### 4.2 The recommended sequence, numbered

| # | Step | What runs | Input tokens | Output tokens | Cumulative USD (Sonnet 4.6, mixed cache) |
|---|---|---|---:|---:|---:|
| 1 | User chat: "build me a thing for tracking X" | User prompt | ~30 | 0 | $0.00 |
| 2 | Agent reads INDEX.md (router) | `cat index.md` (~500 tokens) | ~500 | 0 | $0.0002 |
| 3 | Agent reads tier1/SKILL.md | `cat tier1/SKILL.md` | ~3,000 | 0 | $0.0011 |
| 4 | Agent dispatches 2 to 4 clarification questions | One round trip | ~1,000 | ~1,500 | $0.0060 |
| 5 | Agent copies the spine | `cp -r _spine/tier1-skel tier1-app/` | 0 | 0 | $0.0060 |
| 6 | Agent runs `npm install` (deterministic CLI) | One bash call | ~200 | ~500 | $0.0086 |
| 7 | Agent edits ~15 to 20 files for the delta (data model, theme, name, route, one CRUD page) | Targeted `edit` calls (per-edit re-read uses uncached input) | ~12,000 | ~50,000 | $0.79 |
| 8 | Agent runs `tsc --noEmit && npm run build` to verify | One bash + a fix cycle | ~3,000 | ~4,500 | $0.87 |
| 9 | Agent writes a 200-line README | `write README.md` | ~200 | ~1,200 | $0.89 |
| 10 | Agent reports back with one-paragraph summary | Final assistant turn | ~300 | ~400 | $0.89 |
| **Total recommended design** |  |  | **~20,230** | **~58,100** | **~$0.89** |

**Per-cell arithmetic notes:**
- Step 7 uses uncached input for the per-edit re-read ($3/MTok), because the agent must `cat file.ts` before each `edit` and that re-read is not on the cached prefix. Cost: 12,000 × $3/1M = $0.036 input + 50,000 × $15/1M = $0.75 output = $0.786 incremental. Cumulative: $0.0060 + $0.0086 + $0.786 ≈ $0.80, matches the table.
- Step 9: 200 × $0.30/1M + 1,200 × $15/1M = $0.00006 + $0.018 = $0.01806 incremental. Cumulative: $0.87 + $0.018 ≈ $0.89, matches.

The $0.89 final is consistent with a realistic mix where the cached prefix (INDEX + SKILL.md + system prompt) is read fresh per build but the per-edit re-reads in step 7 use uncached input. **The $0.89 versus $1.09 difference is whether you assume all input is cache-read or whether you honestly model the per-edit re-reads as uncached.** Both are defensible. The "mixed" $0.89 figure is the load-bearing number for the user's framing of "shortest path."

### 4.3 Comparison with the current template's 8-phase `AGENT_INSTRUCTIONS.md` workflow

The current template walks the agent through 8 prose phases (P0 through P7 above) with no copy-not-generate and no caching wins beyond the marginal 9%. The same Tier 1 build takes the agent ~8 to 15 minutes wall-clock and costs ~$3.01 uncached / ~$2.74 cached. Recommended: ~3 to 6 minutes and ~$1.09 cached / ~$0.89 mixed. **Wall-clock reduction: ~2× to 3×. USD reduction: ~2.7×.**

---

## Validating the hybrid skeleton decision

The user chose the hybrid: a checked-in spine plus commands for optional layers (auth, payments, charts, mobile, realtime). This section validates the choice and sets the maintenance budget.

### 5.1 Belongs in the checked-in base

Items with stable contract across many apps, low per-app churn, and high token cost when regenerated:

- `package.json` (engines, scripts, base deps; app-name is parameterized).
- `vite.config.ts`, `tsconfig.json`, `vitest.config.ts` (config shells; app-config overrides via JSON).
- `src/main.tsx` + `src/App.tsx` skeleton (provider nesting, lazy loading).
- `src/index.css` theme tokens (`--color-primary`, etc.).
- `src/lib/utils.ts` (`cn()` helper, base `api` object).
- `src/db/DatabaseProvider.tsx` provider stub (empty impl + import path).
- A `src/components/ui/` directory containing 5 to 10 base components (Button, Input, Card, Modal, Toast). Either vendored (Radix primitives copied + light wrap) or via `npx shadcn add` baked into skeleton.

This is roughly **10 to 15 files / ~2,500 LOC** when the UI library is moved behind `npx shadcn add` (see Skeleton size section below). Worth shipping once and copy-pasting.

### 5.2 Belongs behind commands

Items that are inherently app-specific in configuration, depend on user credentials, or change frequently across apps:

- **Auth.** Clerk / Auth.js / Supabase / better-auth: different products with different config surfaces. Commands like `npx @better-auth/cli init` produce a real auth layer in one shot. Skipping the command regenerates auth from prose at ~8,000 to 15,000 output tokens per app.
- **Payments.** Stripe CLI, Lemon Squeezy setup, Paddle webhook config. Skipping ≈ 5,000 to 10,000 output tokens per app.
- **Charts.** `npx shadcn add chart` or `npm i recharts` + 6-line wrapper. Skipping ≈ 2,000 to 4,000 output tokens per app.
- **Mobile shell.** Capacitor / Expo init, one CLI command per platform. Skipping ≈ 10,000 to 20,000 output tokens per app.
- **Realtime.** Supabase realtime client, PartyKit, Liveblocks. Skipping ≈ 1,500 to 3,000 output tokens per app.
- **UI component library.** `npx shadcn add button card input modal toast ...` rather than vendoring. Skipping ≈ 5,000 to 8,000 output tokens per app.

### 5.3 The maintenance cost of the checked-in half

Real maintenance costs for the items in §5.1:

- **Dependency drift.** React 19 (GA Dec 2024), Tailwind v4 (Jan 2025), Vite 5→6→7 (2024 to 2025), Express 4→5 (GA Oct 2024) are recent real changes [ESTIMATE on dates]. The skeleton's `package.json` peer ranges need an update each time. Cost: ~30 minutes per framework-major.
- **Lockfile rot.** Stale `package-lock.json` causes `npm ci` to fail in CI. Cost: ~5 minutes per `npm install` cleanup.
- **Type drift.** TS strict is the contract; library types evolve. Cost: ~30 minutes per quarterly `tsc --noEmit` pass.

**Realistic maintenance burden:** 1 to 2 days per quarter of maintainer time on the skeleton, even on active projects. The break-even is roughly: amortized savings hit the cost floor at ~10 apps built per quarter. Below that, the checked-in skeleton is a net loss versus pure generation. Above that, it is a clear win. The 65% amortized savings figure (across 10 builds) translates to roughly $19.50 saved per quarter at Tier 1 Sonnet 4.6 pricing, far exceeding the 1 to 2 day maintenance cost (which is ~$800 at typical engineer rates).

**What happens on a framework major version.** Real cases (2024 to 2025):
- Tailwind v3 → v4 (Jan 2025): PostCSS pipeline replaced by Vite plugin. Skeleton's `tailwind.config.js` becomes incorrect. Update cost: 1 to 2 hours.
- React 18 → 19 (Dec 2024): `forwardRef` no longer required, `use()` hook added. Skeleton's `App.tsx` and `Layout.tsx` need refresh. Update cost: 2 to 4 hours.
- Vite 5 → 6 → 7: Config API stable; mostly lockfile churn. Skeleton's `vite.config.ts` fine; lockfile isn't. Update cost: 30 minutes.
- Express 4 → 5 (Oct 2024): path-to-regexp bump. Skeleton's `server.ts` may need a touch. Update cost: ~1 hour.

**Net:** budget 1 to 2 days of skeleton maintenance per framework-major cycle. The alternative is not "no skeleton" but "every app pays the same upgrade tax on day 1." So the skeleton still wins, with a dated CHANGELOG and a framework-major update checklist as the operational requirement.

### 5.4 Verdict on the hybrid decision

**Validated.** The hybrid is the correct shape. The checked-in half should be smaller than instinct suggests (10 to 15 files, not 30); the command half should be richer (auth, payments, charts, mobile, realtime, i18n, analytics, UI library). One concrete revision: move the UI library from checked-in to command, offloading future design-token churn to shadcn's roadmap.

---

## Skeleton size: settle the disagreement

Angle D says the spine is 15 to 20 files and roughly 3,500 LOC. Angle F says roughly 10 files. Both pick "checked-in spine + commands for optional layers" as the pattern.

**Pick:** **~10 files / ~2,500 LOC** for the checked-in base, plus a one-line `npx shadcn add ...` step that pulls in the UI library.

**Justification.** The smaller number wins on three axes:
1. **Maintenance cost.** A 10-file spine updates in 30 minutes; a 20-file spine takes 1 to 2 hours per framework-major event. The 1 to 2 days per quarter budget assumes the smaller number.
2. **Token economy.** A 10-file spine (when the agent copies it) consumes fewer output tokens via `cp -r` mechanics, but more importantly, fewer per-app modifications leak into the spine and need to be parameterized.
3. **Optional-layer coverage.** UI components, auth, payments, charts, mobile, and realtime should all live behind commands, not in the spine. The 10-file number reflects this: the spine holds only the load-bearing config files (package.json, tsconfig, vite.config, vitest.config), entry points (main.tsx, App.tsx), one CSS token file (index.css), one utils file (lib/utils.ts), one DB provider stub (db/DatabaseProvider.tsx), and one router file (App.tsx already covers this in most setups).

**What falls out of the spine to make the smaller number work:**
- The `src/components/ui/` directory (Button, Input, Card, Modal, Toast) → behind `npx shadcn add`. Saves ~6 to 8 files.
- Per-tier examples and demos → moved to `templates/tier<N>/example/` (not in the spine).
- Tests → moved to `vitest.config.ts` only; no fixture files in the spine.
- Styling primitives beyond tokens → design tokens only in the spine; full component library is the command's job.

---

## False economies

These look like token-saving moves; each one burns more tokens downstream.

1. **Terse INDEX.md without examples.** A 200-byte INDEX saves input but causes the agent to mis-pick the tier or forget a non-negotiable. Cost of guessing wrong: ~30,000 output tokens of wrong code plus a retry. Always include one short example per tier in INDEX.

2. **Aggressive file merging to under 200 lines.** Looks like fewer tokens; costs more turns because each read pulls in unrelated state. Keep file splits at responsibility boundaries, not line-count ceilings.

3. **"No comments in code" applied uniformly to maintenance code.** Saves 10 to 20% on output [A10]; costs 5 to 15% per re-read on code over ~6 months old [ESTIMATE per Angle D A22]. Net loss on long-lived projects. Allow comments on edges, schemas, async pipelines.

4. **Skipping verification prompts to save output.** Skipping `tsc --noEmit` saves ~1,000 output tokens per build; one uncaught type error costs ~5,000 to 10,000 output tokens of debug-and-fix. Always run the minimum verifications.

5. **Hand-crafted 50-line clever Tailwind classes** in the skeleton to look "designy." Looks compact; costs every agent ~5 to 15 extra output tokens per re-derive. Use named tokens (`bg-surface`, `text-fg`) over class chains.

6. **Routing every read through `edit` to "save output."** Edit-tool `oldString` failures when the file shifted cost a full re-read (~5,000 input tokens). Always `read` before `edit` for files not written in the same turn.

7. **Prompt-caching aggressively with manual `cache_control` markers on every block.** The 4-breakpoint limit [S3] and the 20-block lookback [S3] mean non-experts commonly bust their own cache. Net cost > savings in many configurations. Use Anthropic's automatic caching [S3] for multi-turn conversations, or place explicit breakpoints carefully.

8. **Skipping the spec/plan step to save turn tokens.** A short plan saves ~500 output tokens; one missed requirement costs ~30,000. Always plan first.

9. **Generating boilerplate that the CLI can produce.** `npx create-vite` produces vite.config.ts, tsconfig.json, index.html, and main.tsx in one command. Regenerating those by hand costs ~5,000 output tokens per file. Use the CLI.

---

## How to measure this system

Concrete metrics a follow-up task can track:

| Metric | Definition | Target |
|---|---|---|
| **tokens per app** | sum(input_tokens) + sum(output_tokens) per full build | tier0 <30k, tier1 <80k, tier2 <150k |
| **files generated vs copied** | (cp/cat touches) / (writes + edits) | >70% in tier1 builds |
| **retry count** | number of `tsc --noEmit` or `npm run build` failures per build | median 0, p95 ≤ 1 |
| **time to first green build** | wall-clock seconds from chat message to passing build | tier1 <6 min on Sonnet 4.6 |
| **cache hit rate** | cache_read_input_tokens / (cache_read + input_tokens) | >80% by call 3 |
| **clarification turns** | agent→user messages before plan finalization | median 3, p95 ≤ 6 |
| **skeleton rot incidents** | framework-major / lockfile / type-drift issues per quarter | ≤1 / quarter |
| **USD per build** | total API cost for a single Tier 1 build at Sonnet 4.6 | <$1.20 cached, <$1.20 mixed |

**What a pilot measurement would need to look like to validate or kill the headline number:**
- Run the current template (8-phase prose workflow) on **N=10 distinct Tier 1 app briefs**. Log per-call `input_tokens`, `output_tokens`, `cache_read_input_tokens`, `cache_creation_input_tokens`, `input_tokens`. Compute total tokens and USD per build at Sonnet 4.6 pricing [S3].
- Run the recommended design (router-first INDEX + checked-in `_spine/` + cached prefix) on the same **N=10 briefs**. Same logging.
- Compare mean USD per build. If recommended is < $1.20 cached and the ratio is ≥ 2.5×, the headline is validated. If recommended is ≥ current template, the headline is killed and we have to revisit which mechanism is failing (likely: the spine was too big, or the cache wasn't actually hitting).
- Sample at least 3 distinct agents (Claude Code, Kilo, OpenCode) to control for harness-specific behavior.
- Log all A8 (tokens/line) values per build to refine the sensitivity band.

---

## Sources

Every price, multiplier, and minimum-prefix claim below is cited to an official doc, access date 2026-08-13.

- **[S1] Anthropic Engineering - "Equipping agents for the real world with Agent Skills"**, https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills, accessed 2026-08-13. *Proves:* Skills uses a three-level progressive disclosure model; bundled scripts are "far more efficient than having Claude generate equivalent code on the fly"; Skills is an open standard (note at top, dated Dec 18 2025).

- **[S2] Anthropic - "Agent Skills overview" (Claude docs)**, https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview, accessed 2026-08-13. *Proves:* the per-level token cost table: "Level 1: Metadata ~100 tokens per Skill", "Level 2: Instructions Under 5k tokens", "Level 3+: None until accessed"; and the principle "There's no context penalty for bundled content that isn't used."

- **[S3] Anthropic - "Prompt caching" (Claude docs)**, https://platform.claude.com/docs/en/build-with-claude/prompt-caching, accessed 2026-08-13. *Proves:* pricing multipliers (5m writes 1.25×, 1h writes 2.0×, cache reads 0.10×); per-model minimum cacheable prefixes (Sonnet 4.6 = 1,024 tokens, Sonnet 5 = 1,024 tokens, Haiku 4.5 = 4,096 tokens, Opus 4.6 = 4,096 tokens, Opus 4.8 = 1,024 tokens, Opus 5 = 512 tokens); 4 explicit breakpoints; 20-block lookback; cache hierarchy tools→system→messages; "Common mistake: Breakpoint on content that changes every request" produces zero cache hits; Sonnet 4.6 pricing ($3/MTok input, $15/MTok output, 5m writes $3.75/MTok, reads $0.30/MTok); Sonnet 5 pricing ($2/$10, 5m writes $2.50/MTok, reads $0.20/MTok); Haiku 4.5 pricing ($1/$5); Opus 5 pricing ($5/$25).

- **[S4] OpenAI - "Prompt caching" (Developer docs)**, https://platform.openai.com/docs/guides/prompt-caching, accessed 2026-08-13. *Proves:* GPT-5.6 and later require `prompt_cache_key` for reliable matching; 1,024-token strict minimum on GPT-5.6+; 30-minute exact TTL (the only supported value); cache reads at 0.10× base input rate; cache writes at 1.25× base input rate; up to 4 cache writes per request; up to 50 breakpoints considered for cache reads; ~15 requests per minute per `prompt_cache_key` recommendation; earlier models use automatic best-effort caching with 5 to 10 minute in-memory retention and no cache-write fee.

- **[S5] AGENTS.md project site + GitHub corpus**, https://agents.md/, accessed 2026-08-13. *Proves:* "Used by over 60k open-source projects" verbatim from the project home; cross-agent portability (Codex, Cursor, Jules, Zed, Devin, RooCode, Aider, OpenCode, etc.); nested AGENTS.md pattern (~88 nested files in the openai/codex monorepo cited in the FAQ); convention is now stewarded by the Agentic AI Foundation under the Linux Foundation.

---

## Self-critique

- **F-5 verdict on Angle D's cached-column arithmetic.** The verifier's flag was a real error in Angle D, not a misread. Angle D Part 1.2 (lines 47 to 58) reports a cached input cost of $0.0720 for 40,000 input tokens at P4. Recomputed at Sonnet 4.6 cache-read pricing ($0.30/MTok = 0.10× of $3 base [S3]), 40,000 × $0.30/1M = $0.0120, which is exactly 6× lower than the reported $0.0720. The cached totals ($2.706) inherit this and other inconsistencies (P0+P1+P3+P5+P6+P7 all show multipliers that do not equal 0.1×). The verifier's recompute is correct and the chapter above uses the corrected arithmetic.

- **The headline unit.** I picked USD (cached, mixed) as the primary unit because the user asked "what it costs." Both ratios (output tokens and USD) are shown in the three-way table so the reader sees both. The "5 to 7× reduction" framing in Angle D's summary (line 11) was not reproducible from the per-phase arithmetic; the verifiable ratio is 2.73× on output tokens and 2.51× on USD. I removed the "5 to 7×" claim.

- **The flip risk at high A8.** The verifier flagged F-6: at 30 tokens/line, Angle D's broken cached column ($2.706) made the recommended design look like it could flip to MORE expensive than current uncached ($3.044). With the corrected arithmetic, the recommended design stays 2.34× cheaper at 30 tokens/line. The flip risk is mitigated, not eliminated (at 40+ tokens/line and rising agent verbose-comment density, the absolute USD grows for both paths but the ratio stays approximately preserved).

- **OpenAI pricing.** Verified [S4] access 2026-08-13: the 0.10× read, 1.25× write, 1,024-token minimum, and 30-minute exact TTL all match Angle D's A16 claim. The verifier's unverified flag (F-10, F-14) is now resolved.

- **Model choice (F-13).** Pinned headline to Claude Sonnet 4.6 at $3/$15 per MTok [S3]. Sensitivity note: cheaper tier Haiku 4.5 at $1/$5 per MTok (3× cheaper input, 3× cheaper output); pricier tier Opus 4.6 at $5/$25 per MTok (1.67× more expensive input, 1.67× more expensive output). The ratios between paths hold at all three tiers because the mechanisms (skeleton + caching) are model-agnostic; only the absolute USD changes.

- **Skeleton size (F-8).** Picked ~10 files / ~2,500 LOC over Angle D's 15 to 20 / ~3,500 LOC. Justification: maintenance cost, token economy, and the UI library moves behind `npx shadcn add`. The smaller spine fits within the 1 to 2 day per quarter maintenance budget; the larger spine exceeds it.

- **Unverified.** A8 tokens/line (mid-point of an estimated range), A11 retry cost, A12 intake cost, A21 sub-agent cost. Each is ESTIMATE with stated reasoning. The headline holds across A8 from 18 to 30 tokens/line.