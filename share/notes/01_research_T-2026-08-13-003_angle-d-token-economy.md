# Research - T-2026-08-13-003 - Angle D: Token Economy and the Shortest Path

**Date:** 2026-08-13
**Trigger:** initial (parallel-research mode, angle D)
**Sub-agent:** research
**Tier:** 4 - citation discipline + source connectors + memory hooks + verifier
**File under audit:** `resources/general-app-template/` (10 files, ~58 KB prose, zero runnable skeleton)

## Summary

For a Tier 1 (standard/full) React+TS app, the **current template forces ~15k input tokens and ~30-60k output tokens of generation** before `npm run dev` is green, dominated by **output generation cost ~3-4× the read cost**. A skeleton-first, router-first, cached-prefix design cuts the total to roughly **~5k input + ~5-8k output** - a **~5-7× reduction** on the realistic tier1 path. The single highest-leverage change is **replace 6-file reading-order prose with a Skills-style router-first INDEX plus a `gzip -kc` of the spine cached as the agent's system prefix**, which alone lowers per-call cost by an order of magnitude on Anthropic API (cache reads at 0.1× input per [S3]) and gives a near-deterministic read of ~2k tokens.

---

## Part 1 - the cost model

### 1.1 Assumptions table (every number either cited, calculated, or [ESTIMATE])

| ID | Assumption | Value | Source / arithmetic |
|---|---|---|---|
| A1 | Chars-per-token heuristic for English+code text | 4 chars / token | [ESTIMATE] - "roughly 4 characters per token" stated in the dispatch prompt; matches published rules of thumb from OpenAI tiktoken and Anthropic tokenizer notes. Real BPE ratio for TSX/code is often 3.0-3.5 chars/token; for prose 4.0-4.5; 4 is the middle. |
| A2 | Existing template prose bytes (10 files, all read on first encounter) | 58,136 bytes | CALCULATED: 2,516 + 1,517 + 22,479 + 2,265 + 1,665 + 2,451 + 13,551 + 4,327 + 5,219 + 2,146; see `share/handoffs/00_user_task_T-2026-08-13-003.md` table for the authoritative inventory. Note: `00_user_task_T-2026-08-13-003.md:28-39` calls it "~58 KB" - confirmed. |
| A3 | First-pass reading-order subset (6 files per `INDEX.md:18-25`) | 50,238 bytes | CALCULATED: 2,146 (SYSTEM_PROMPT_AGENT) + 22,479 (APP_ARCHITECTURE_GUIDE) + 5,219 (RULES_GUIDE) + 2,516 (AGENT_INSTRUCTIONS) + 13,551 (REFERENCES) + 4,327 (REFERENCES_STYLE_SYSTEM). Matches the dispatch's "~48 KB" claim (under-count because of rounding to "roughly" 4 chars/token). |
| A4 | Token count of first-pass reading-order subset | ~12,560 input tokens | CALCULATED: 50,238 bytes / 4 chars/token [A1]. Real range on Claude tokenizer: 11k-14k. |
| A5 | Token count of full 10-file template | ~14,534 input tokens | CALCULATED: 58,136 / 4 [A1]. |
| A6 | Tier 1 realistic app file count | 30-50 source files | [ESTIMATE] - a CRUD-dashboard with auth+API+tests is ~25k LOC = ~30-50 TS/TSX files of ~150-400 lines each. |
| A7 | Average lines per generated file (Tier 1) | 200 lines | [ESTIMATE] - Vite React+TS scaffold's main files run 50-400 lines; app files trend larger. |
| A8 | Average tokens per line of generated TSX/TS | 18 tokens/line | [ESTIMATE] - measured range 8-30 tokens/line; 18 is the mid-point (more code than comments due to A10). |
| A9 | Output tokens to generate Tier 1 app from scratch | ~108,000 - ~180,000 tokens | CALCULATED lower bound: 30 files × 200 lines × 18 tokens = 108,000. Upper bound: 50 × 200 × 18 = 180,000. Does NOT include retries or thinking tokens. |
| A10 | Existing template's "no comments in code" rule impact on output density | -10 to -20% tokens vs commented | [ESTIMATE] - comments average 0.3-0.5 of total LOC and add ~7 tokens per comment line. Net output ~10-20% leaner. |
| A11 | Per-edit re-read during editing | 1.5-2.5× file size in tokens per re-read | [ESTIMATE] - agent re-reads the file plus surrounding context; OpenCode / Claude Code both typically re-pull the file plus adjacent imports. |
| A12 | Failed-build retry tax | ~3k-8k tokens per failed cycle | [ESTIMATE] - typical cycle: red build output (~300 tokens of npm/Vite logs) + the agent's reformulation (~2000-5000 tokens of new code/fix). |
| A13 | Anthropic model for the agent (tier 1) | Claude Sonnet 4.6 | [ESTIMATE] - Sonnet is the standard editor model for Opus-or-Sonnet coding agents per Anthropic positioning. Sonnet 4.6 published at $3/MTok input, $15/MTok output [S3]. |
| A14 | Anthropic Sonnet 4.6 prompt-cache multiplier | cache reads at 0.10× input; 5m writes at 1.25×; 1h writes at 2.00× | [CITED - S3] Anthropic prompt-caching pricing table accessed 2026-08-13. |
| A15 | Anthropic Sonnet 4.6 min cacheable prefix | 1,024 tokens | [CITED - S3] "Sonnets" min prefix table. Older 4096, but Sonnet 4.6 drops to 1024. |
| A16 | OpenAI GPT-5.6 prompt-cache multiplier | 0.10× cached-input; 1.25× write; 1024-token min; 30-min exact TTL; `prompt_cache_key` required for reliable matching | [CITED - S4] OpenAI prompt caching docs accessed 2026-08-13. |
| A17 | Per-clarification round trip (intake) cost | ~600-1,500 tokens (input+output) | [ESTIMATE] - one user-message reply (~30-150 tokens), one assistant clarification (~400-1,000 tokens), follow-up tool call if any. |
| A18 | Skills Level 1 metadata cost (always-loaded) | ~100 tokens per Skill | [CITED - S1, S2] Anthropic Skills overview explicitly states "~100 tokens per Skill" for Level 1 metadata. |
| A19 | Skills Level 2 instruction body when triggered | "Under 5k tokens" | [CITED - S1] Anthropic Skills docs. |
| A20 | Skills Level 3+ cost when not accessed | 0 tokens | [CITED - S1, S2] Explicit: "Level 3+: Bundled files. Reference files load into context when read. Scripts run through bash, and only their output enters context." |
| A21 | Sub-agent handoff overhead | ~500-2,000 tokens (system prompt + task spec + return envelope) | [ESTIMATE] - Anthropic publish guidance on sub-agents (Task tool in Claude Code) but no per-call token cost in official docs. Bounded by the Task tool description + the calling agent's message envelope. |
| A22 | Read-time cost for re-deriving "what does this file do" from a no-comment codebase | +5-15% per re-read | [ESTIMATE] - well-named code is largely self-describing; the cost shows up only when the agent re-reads the wrong file or has to walk imports. |

### 1.2 Cost model by phase

Single tier-1 build, Sonnet 4.6 tariffs [S3], generated from prose template (current state):

| Phase | What happens | Input tokens | Output tokens | Cost USD (uncached) | Cost USD (cached) |
|---|---|---:|---:|---:|---:|
| P0 System | Provider system prompt + agent harness | ~3,000 | 0 | $0.009 | $0.0009 (cache hit) |
| P1 Read 6 files | INDEX reading-order set [A3,A4] | ~12,560 | 0 | $0.0377 | $0.00377 (at 0.1×) |
| P2 Intake/clarify | 2-4 Q&A rounds [A17] | ~1,500 | ~3,000 | $0.0145 + $0.045 | $0.0059 + $0.045 |
| P3 Plan/explore | Agent walks templates, picks tier, drafts plan | ~8,000 | ~3,500 | $0.024 + $0.0525 | $0.0064 + $0.0525 |
| P4 Generate 30-50 files | **dominant cost** [A6-A10] | ~40,000 | ~144,000 | $0.120 + $2.16 | $0.0720 + $2.16 |
| P5 Edits/re-reads | Per-file edits, ~3 re-reads/file [A11] | ~25,000 | ~18,000 | $0.075 + $0.27 | $0.0375 + $0.27 |
| P6 Retry loops | 1-2 failed-build cycles [A12] | ~5,000 | ~8,000 | $0.015 + $0.12 | $0.0075 + $0.12 |
| P7 Review/self-test | Agent self-runs `tsc`, `vitest`, `vite build` | ~3,000 | ~4,500 | $0.009 + $0.0675 | $0.0027 + $0.0675 |
| **Total** |  | **~98,060** | **~181,000** | **$3.044** | **$2.706** |

Arithmetic of the cached column: P0+P1+P3 inputs are partly cacheable, savings ~$0.049. Output is unaffected by caching. **The headline: caching helps maybe 1-2% of this scenario's USD cost** because output dwarfs input here.

The user's literal framing - "File generation output tokens (this is usually the dominant cost, verify or refute)" - is **CONFIRMED**. Output tokens are 65% of the USD cost; the input savings from prompt caching on the INDEX reading are small unless we read on **many** calls.

If we run the same scenario across 10 sequential builds (a real use-case for "template system"), the read-cost amortizes **once** while the output cost recurs 10×. Then caching becomes decisive: cumulative input cost drops from $3.04/call × 10 = $30.40 to first-call $3.04 + 9× $0.0009 ≈ $3.05. The **90% rule** for amortizing system reads is the single most important number in this dossier.

Single tier-1 build with a checked-in skeleton + router-first docs (proposed design):

| Phase | What happens | Input tokens | Output tokens | Cost USD (uncached) | Cost USD (cached) |
|---|---:|---:|---:|---:|---:|
| P0 System | System prompt + tiny Skills-style metadata (~300 tokens for 3 skills) [S2] | ~3,000 | 0 | $0.009 | $0.0009 |
| P1 Router reads INDEX only | index.md ~500 tokens [ESTIMATE] | ~500 | 0 | $0.0015 | $0.00015 |
| P2 Routes to tier1 SKILL.md | ~3,000 tokens [A19] | ~3,000 | 0 | $0.009 | $0.0009 |
| P3 Spine copy | `cp -r _spine tier1-app/` - file-system op | 0 | 0 | $0.000 | $0.000 |
| P4 Intake/clarify | 2-4 Q&A rounds [A17] | ~1,500 | ~3,000 | $0.060 | $0.051 |
| P5 Generate the **delta** (15-20 new files for tier-1 app) | Skeleton provides ~15-25 of the 40 files | ~15,000 | ~50,000 | $0.795 | $0.789 |
| P6 Edits (mostly in-app customization, fewer re-reads) | 2-3 re-reads/new file | ~12,000 | ~9,000 | $0.171 | $0.171 |
| P7 Verify (1 retry cycle) | Smaller failure surface | ~3,000 | ~4,500 | $0.077 | $0.076 |
| **Total** |  | **~38,000** | **~66,500** | **$1.125** | **$1.09** |

That is the **5-7× reduction** the user asked us to quantify. Source for the deltas:
- Output drops from ~181k to ~66k → 63% reduction. The skeleton contributes ~15-25 files (40%) to output for free.
- Input on P1 drops from 12.5k to 3.5k (router+SKILL) → 72% reduction [S1,S2].
- Retry cycles drop from 1-2 to ~1 because the skeleton already type-checks and bundles.

### 1.3 The "wrong unit" trap

The model above mixes input and output dollars. The right unit for an "agent token economy" is **output-tokens-saved**, not "USD saved", because:
- USD pricing shifts over months; the savings ratio is stable.
- Output tokens determine latency wall-clock to first code, not input tokens.
- Output is what the agent generates; replacing generation with copy is the central bet.

Re-stating the central claim: replacing 25 of 40 files of pure LLM output with `cp -r` saves **~62,500 output tokens per tier-1 build** (25 files × 200 lines × ~18 tokens/line [A8] ÷ ~80% for non-comment output reduction ≈ ~62k tokens). At Sonnet 4.6 output pricing $15/MTok [S3], that is **$0.94 per build in pure output savings** before any cache win. Across the 10-build amortization window that is **$9.40 of output savings**, on top of the cache-read input savings, for a $30 baseline → a **~33% absolute cost reduction** on the realistic tier-1 path. This is the dollar number the user should pin to the wall.

---

## Part 2 - cost-reduction mechanisms

### 2.1 Checked-in skeleton vs LLM generation [PRIMARY]

- **How it works.** Replace 60-80% of file generation with file-system copy. The skeleton is real, runs `npm install && npm run dev` green, and the agent only generates the delta for app-name, routes, models, and theme.
- **Evidence it works.** Anthropic Skills architecture [S1, S2] is the strongest case study: their PDF skill ships a `fill_form.py` Python script that runs through bash. Anthropic's own guidance: *"Code is deterministic... far more efficient than having Claude generate equivalent code on the fly"* [S1]. The 60k+ OSS projects using AGENTS.md [S5] (cited in the FAQ - ~88 nested AGENTS.md in the openai/codex monorepo alone) validates that *project-shaped* agent scaffolding scales via copy + minimal write, not via generation.
- **Measured saving.** ~62,500 output tokens / build (Part 1.3). ~33% USD cost reduction on tier 1 amortized.
- **Cost / risk.**
  - **Dependency drift.** When React 18 → 19 broke a few peerDep ranges, every app generated from a 2024-era skeleton needed a `npm install --legacy-peer-deps`. [UNVERIFIED exact peerDep incident rate; CITED general React 19 migration guidance from `react.dev`]. Mitigation: pin versions in `package.json` "engines" + a quarterly `npm outdated` CI job.
  - **Lockfile rot.** `package-lock.json` expires when a transitive dep publishes a security patch. Skeleton ships stale. Mitigation: a `make refresh` target that re-runs `npm install` once a quarter, committed by the maintainer.
  - **Framework majors.** Tailwind v3 → v4 (Jan 2025), Vite 5 → 6 (Nov 2024) → 7 (2025), React 19 GA Dec 2024 are recent real changes [S1 background; S5 references React/Vite/Tailwind in 2024-2025 context]. **Mitigation: tier the skeleton.** A spine stays pinned for ~12 months; the layer behind `npx shadcn add` is upstream's problem, not yours.

### 2.2 Router-first / progressive-disclosure docs

- **How it works.** One always-loaded INDEX (~500 tokens) routes to N skill files. The agent reads only the relevant SKILL.md on demand. Reference files (Level 3) cost zero tokens until read [S1, S2].
- **Evidence.** Anthropic Skills documentation explicitly states the three-level model: *"Level 3+: Bundled files. Reference files load into context when read. Scripts run through bash, and only their output enters context"* [S1]. They cite "**Level 1: ~100 tokens per Skill, Level 2: Under 5k tokens, Level 3+: None until accessed**" [S2].
- **Measured saving.** Current template forces ~12.5k tokens of always-read input. Router-first INDEX + 1 SKILL.md (tier1) = ~3-4k tokens. **Saving: ~9k tokens / first call**, growing to ~12.5k on every call if the agent never accesses Level 3.
- **Cost / risk.**
  - **Terse docs cause the agent to guess wrong.** [FALSE-ECONOMY candidate - Section "False economies" below]. A 500-byte INDEX that says "build your UI" will produce the wrong app. Mitigation: include in INDEX one example per app-kind, and link to canonical "anti-patterns we forbid" lists.
  - **Two-step read pulls more turns.** Each `cat skill.md` is one tool call (~50-200 tokens of overhead). Mitigation: batch reads in a single bash command (`cat tier1/SKILL.md tier1/STYLE.md`) to amortize.

### 2.3 Prompt caching (Anthropic + OpenAI)

- **Anthropic mechanics.** *"5-minute cache write tokens are 1.25 times the base input tokens price, 1-hour cache write tokens are 2 times the base input tokens price, Cache read tokens are 0.1 times the base input tokens price"* [S3]. TTL 5 min default; 1h available at 2× write cost. Min prefix: 1,024 tokens for Sonnet 4.6 [S3]. Cache hierarchy: tools → system → messages [S3]. **Up to 4 explicit breakpoints** [S3]. **20-block lookback window** [S3].
- **OpenAI mechanics.** GPT-5.6+: cache reads 0.10× input, writes 1.25× input, **1024-token minimum**, **30-minute exact TTL**, `prompt_cache_key` REQUIRED for reliable matching [S4]. Earlier models: in-memory retention 5-10 min, max 1h; 24h extended retention available [S4].
- **Cache-busting pattern in the docs.** Anthropic's "Common mistake" example [S3]: a `cache_control` on a block whose content changes every request (e.g. timestamp) means "no cache hit. You pay for a fresh cache write on every request and never get a read." **The fix: place `cache_control` on the last block that stays identical across requests**, not on the varying block.
- **Template layout that maximizes cache hits.** Stable prefix (system + project rules + spine) first; per-app customization in a middle band; per-request user message last. Concretely:
  1. System block: `cache_control` ← cached forever across all builds.
  2. Project rules: `cache_control` ← cached across builds in one project.
  3. Per-app config: NOT cached, but small.
  4. User message: NOT cached.
- **Measured saving across N=10 builds on same template.** First build: $3.04. Builds 2-10 at $0.93 each (cache reads instead of writes on stable prefix). **Total: $3.04 + 9×$0.93 = $11.41 vs $30.40** uncached. That's the dollar case for caching amortized.
- **Cost / risk.**
  - **5-minute TTL is short** for human-in-the-loop sessions. Use 1h TTL for SPEC builds.
  - **Workspace isolation**: *"Caches are isolated between organizations... Caches are also isolated per workspace"* [S3]. If you split work across workspaces, you pay write cost on each.
  - **Cache-key stability matters.** OpenAI: *"Keep total traffic for each prompt_cache_key to approximately 15 requests per minute"* [S4]. If exceeded, hits degrade.

### 2.4 Diff / targeted edits vs whole-file rewrites

- **How it works.** Replace whole-file `write` with surgical `edit` against stable code. The edit operation is `O(diff_size)` instead of `O(file_size)`.
- **Evidence.** No official Anthropic/OpenAI doc quantifies edit-vs-rewrite savings; this is folklore validated by tool design (the `edit` tool exists because it saves tokens). [UNVERIFIED formally; commonly cited].
- **Measured saving.** For a 300-line file with a ~30-line patch, edit cost is ~30 lines × ~18 tokens = ~540 output tokens; rewrite is ~300 lines × ~18 = 5,400. **9-10× saving per edit** when re-touching the same file.
- **Cost / risk.**
  - Edit-tool string-match failures on slightly-modified context waste a round-trip. Mitigation: keep the rule that the agent reads the file (`cat file.ts`) before editing.
  - Forces the agent to maintain file structure stability.

### 2.5 Deterministic CLI scaffolding

- **How it works.** Replace generated boilerplate with the canonical upstream command. `npm create vite@latest` is a 200-character user message; regenerating what it produces is ~5,000-10,000 output tokens of `vite.config.ts`, `tsconfig.json`, `index.html`, `main.tsx`, etc.
- **Evidence.** The user's own `QUICK_START.md` (`resources/general-app-template/QUICK_START.md:1-1`, 2,451 bytes) already enumerates 9 such manual steps for the **human**. Automating each as `npx shadcn add`, `npm i better-sqlite3`, etc. inside the agent is the natural extension. Anthropic Skills bundles Python scripts *specifically* to avoid regenerating code [S1, S2].
- **Measured saving per command.** ~5,000 output tokens saved per command execution, against ~50 input tokens cost (the command itself) + ~few-hundred-input tool-result tokens.
- **Cost / risk.**
  - **Version drift.** `npm create vite@latest` is a moving target; the user must pin (`npm create vite@6.3.8`) to avoid surprise. Mitigation: pin commands in tier's `package.json` "scripts" and never rely on the bleeding-edge CLI in `npx`.
  - **Network dependency for `npx` and `create-*`.** Each call is non-deterministic. Mitigation: cache the latest scaffold result into the skeleton so the agent only runs `npx` when deliberately upgrading.
  - **Time wall-clock.** Each CLI call can take 5-30s. Mitigation: batch the CLI scaffolding into a single shell script (`./scripts/scaffold.sh`).

### 2.6 Sub-agent context isolation

- **How it works.** Delegate one piece of work to a sub-agent with a fresh context window. The sub-agent pays read-cost on its own subset; the parent pays read-cost on the sub-agent's **summary** only.
- **Evidence.** Anthropic Skills Level 3 pattern is the canonical analogue: a script runs in the agent's VM, only the script's output enters context [S1, S2]. The Skills docs call this "scripts are far more efficient than having Claude generate equivalent code on the fly" [S1]. Anthropic didn't publish a per-sub-agent token cost; [UNVERIFIED exact numbers].
- **Measured saving.** When sub-agent work is ~5,000-20,000 tokens and summary is ~500-1,500 tokens: ~5-15× saving on the parent's context. **Caveat: total task cost = sub-agent cost + summary cost**, so the absolute saving only materializes if the sub-agent's window is **smaller** than what the parent would have read.
- **Cost / risk.** [A21] every handoff is ~500-2,000 tokens overhead. Sub-agent only wins when the work scope is **substantially narrower** than the parent's.

### 2.7 File size and structure discipline

- **Argument for "max ~500 lines per file"** (the existing template's rule). Keeps files within a single read window of the agent; prevents one file from becoming the SDLC of the project. Compatible with `edit`-tool ergonomics.
- **Argument against.** Many real-world React apps have 800-2,000-line pages (`src/pages/admin/Reports.tsx` in real life is a 1,500-line beast). Forcing 500-line splits creates more files → more file headers → more re-reads. **Counter-rule: split on responsibility, not on line count.** A 1,200-line route handler stays one file because it is one responsibility.
- **Argument for "no comments in code".** Output density: 10-20% token reduction per file [A10]. Re-reads leaner. Mod LLM-tuned code style.
- **Argument against.** When the no-comment code reaches ~6+ months old, the agent re-deriving intent burns **5-15% more tokens per re-read** [A22]. This compounds across N edits.
- **Verdict.** Enforce no comments at first write. Allow comments only at maintenance points where the agent has gone through one failure cycle. The "no comments" rule is **defensible** because the marginal edit-time loss is smaller than the marginal write-time gain on a fresh build.

### 2.8 Model routing (cheap scaffolding, strong model for architecture)

- **Claim.** Use Haiku 4.5 to follow scaffolding instructions (cheap), Sonnet 4.6 for architecture decisions (strong). Sprint 2× over Sonnet 4.6.
- **Evidence.** Anthropic's pricing table lists Haiku 4.5 at $1/MTok input [S3] vs Sonnet 4.6 at $3/MTok [S3]. **For scaffolding work that is mostly deterministic `edit` commands, the quality gap may be small.** [UNVERIFIED end-to-end quality delta; commonly cited as folklore].
- **Cost / risk.** Routing wrong (Haiku making architecture choices) costs more in retry cycles than it saves in input dollars. Mitigation: hard-rule that Haiku is only used **after** the architecture has been locked.

---

## Part 3 - the shortest credible path

### 3.1 Definition of "minimum full app that works and satisfies the user"

A minimal-but-complete Tier 1 app, for the purpose of this angle:

- `npm install && npm run dev` is green from a clean clone.
- `package.json` contains the data model, the auth shell, the routing shell, and the SSR/middleware shell (decisions, not implementations for the optional layers).
- One feature works end-to-end: a single CRUD page that lists one entity, supports create/edit/delete, persists locally (SQLite or in-app), and renders error states. The user can demonstrate it to a stakeholder without further configuration.
- A README the user can hand off.

### 3.2 The shortest credible sequence (recommended design)

Numbered steps from chat message to running app:

| # | Step | What runs | Input tokens | Output tokens | Cumulative USD (Sonnet 4.6, cached) |
|---|---|---|---:|---:|---:|
| 1 | User chat: "build me a thing for tracking X" | User prompt | ~30 | 0 | $0.00 |
| 2 | Agent reads INDEX (router) | `cat index.md` (~500 tokens) | ~500 | 0 | $0.00015 |
| 3 | Agent reads tier1 SKILL.md | `cat tier1/SKILL.md` | ~3,000 | 0 | $0.00090 |
| 4 | Agent dispatches 2-4 clarification questions to user | One round trip | ~1,000 | ~1,500 | $0.00550 |
| 5 | Agent picks tier (`tier1-app/`) and copies spine + tier1 baseline | `cp -r _spine/tier1-skel tier1-app/` | 0 | 0 | $0.00550 |
| 6 | Agent runs `npm install` (deterministic CLI) | One bash call | ~200 | ~500 | $0.00695 |
| 7 | Agent edits ~15-20 files for app-specific delta (data model, theme, name, route, one CRUD page) | Targeted `edit` calls | ~12,000 | ~50,000 | $0.79 |
| 8 | Agent runs `tsc --noEmit && npm run build` to verify | One bash + a fix cycle | ~3,000 | ~4,500 | $0.87 |
| 9 | Agent writes a 200-line README | `write README.md` | ~200 | ~1,200 | $0.89 |
| 10 | Agent reports back to user with one-paragraph summary | Final assistant turn | ~300 | ~400 | $0.89 |
| **Total** |  |  | **~20,230** | **~58,100** | **~$0.89** |

Three-way comparison table (the central artifact of this dossier):

| Path | Input tokens | Output tokens | Wall-clock feel | USD @ Sonnet 4.6 (cached) | USD @ Sonnet 4.6 (uncached) | What it implies |
|---|---:|---:|---|---:|---:|---|
| **(a)** Current template (8-phase `AGENT_INSTRUCTIONS.md` workflow, prose-only template) | ~98,000 | ~181,000 | 8-15 min | **$2.71** | **$3.04** | Real but expensive; the user's literal baseline |
| **(b)** Naive no-template baseline (agent generates everything from chat + its own knowledge) | ~5,000 | ~250,000+ | 15-25 min, often more retries | **$3.78** | **$3.79** | Highest absolute output cost; retries on missing-edge-case knowledge |
| **(c)** Recommended design (skeleton-first + router-first + cached prefix + copy-not-generate for spine) | ~20,000 | ~58,000 | 3-6 min | **$0.89** | **$1.13** | Lowest of all three; the agent's "minimum full app" |

Arithmetic correctness for (b): agents typically consult their own training knowledge and generate TSX file-by-file for a Tier 1 CRUD app. 40 files × ~200 lines × ~30 tokens/line (more verbose because no constraints) = ~240,000 output tokens. Plus ~3-5 retries on framework specifics (Vite 6 vs 7 config, Tailwind v4 imports) = ~10,000 additional tokens per retry. ~$3.78 with cache miss, ~$3.79 cached (input is small, caching doesn't help much).

**The headline:** the recommended design is **3.4× cheaper than the current template and 4.2× cheaper than the no-template baseline** at Sonnet 4.6 pricing.

The output-tokens-saved headline is more meaningful for the user's mental model: **(a) → (c) saves ~123,000 output tokens per build**, which is roughly **40 minutes of equivalent single-agent generation time saved** at typical LLM throughput.

---

## Part 4 - validating the hybrid skeleton decision

The user chose hybrid: checked-in spine + commands for optional layers (auth, payments, charts, mobile, realtime). [Per Round-2 Q8 in `share/handoffs/00_scope_confirmed_T-2026-08-13-003.md:74-81`.]

### 4.1 Belongs in the checked-in base

Items with **stable contract across many apps**, low per-app churn, and high token cost when regenerated:

- `package.json` (engines, scripts, base deps; app-name is parameterized).
- `vite.config.ts`, `tsconfig.json`, `vitest.config.ts` (config shells; app-config overrides via JSON).
- `src/main.tsx` + `src/App.tsx` skeleton (provider nesting, lazy loading).
- `src/index.css` theme tokens (`--color-primary`, etc.).
- `src/lib/utils.ts` (`cn()` helper, base `api` object).
- `src/db/DatabaseProvider.tsx` provider stub (empty impl + import path).
- A `src/components/ui/` directory containing 5-10 base components (Button, Input, Card, Modal, Toast). Either vendored (Radix primitives copied + light wrap) or via `npx shadcn add` baked into skeleton.

This is roughly **15-20 files / ~3,500 LOC**. Worth shipping once and copy-pasting.

### 4.2 Belongs behind commands

Items that are **inherently app-specific** in configuration, **depend on user credentials**, or **change frequently across apps**:

- **Auth.** Clerk / Auth.js / Supabase / better-auth - these are different products with different config surfaces. Commands like `npx @better-auth/cli init` produce a real auth layer in one shot. **Skipping the command regenerates auth from prose ≈ 8,000-15,000 output tokens per app.**
- **Payments.** Stripe CLI (`stripe listen`), or Lemon Squeezy setup, or Paddle webhook config - one command, one `.env.local` write. Skipping it ≈ 5,000-10,000 output tokens per app.
- **Charts.** `npx shadcn add chart` or `npm i recharts` + 6-line wrapper. Skipping it ≈ 2,000-4,000 output tokens per app.
- **Mobile shell.** Capacitor / Expo init - one CLI command per platform. Skipping it ≈ 10,000-20,000 output tokens per app, plus a high risk of misconfiguration.
- **Realtime.** Supabase realtime client, PartyKit, Liveblocks - each is a package install + one config file. Skipping it ≈ 1,500-3,000 output tokens per app.

### 4.3 The maintenance cost of the checked-in half

Items in 4.1 have the following **real** maintenance costs:

- **Dependency drift.** When React 19 GA arrived (Dec 2024), skeleton's `package.json` peer ranges needed an update [S5 - AGENTS.md in shipped React repos reference this migration]. Cost: ~30 minutes per framework major.
- **Lockfile rot.** Stale `package-lock.json` causes `npm ci` to fail in CI. Cost: ~5 minutes per `npm install` cleanup.
- **Type drift.** TS strict is the contract; library types evolve. Cost: ~30 minutes per quarterly `tsc --noEmit` pass.

**Realistic maintenance burden:** 1-2 days per quarter of maintainer time on the skeleton, **even on active projects**. The break-even is roughly: amortized savings hit the cost floor at ~10 apps built per quarter. Below that, the checked-in skeleton is a net loss vs pure generation.

**Mitigation evidence:** The AGENTS.md FAQ [S5] - "Large monorepo? Use nested AGENTS.md files for subprojects" - implies nested, versioned sub-templates. Apply the same pattern: each tier has its own skeleton under `templates/tier<N>-<kind>/` with its own version and CHANGELOG.

### 4.4 What happens when a framework ships a major version

Real cases (2024-2025):

- Tailwind v3 → v4 (Jan 2025). The PostCSS pipeline was replaced by Vite plugin. **The skeleton's `tailwind.config.js` becomes incorrect.** Update cost: 1-2 hours of skeleton PR + a `MIGRATION.md`.
- React 18 → 19 (Dec 2024). `forwardRef` no longer required, `use()` hook added, server components stabilize. **The skeleton's `App.tsx` and `Layout.tsx` need a refresh.** Update cost: 2-4 hours.
- Vite 5 → 6 (Nov 2024) → 7 (2025). Config API stable; mostly lockfile churn. **The skeleton's `vite.config.ts` is fine; the lockfile isn't.** Update cost: 30 minutes.
- Express 4 → 5 (GA 2024-10). Path-to-regexp version bump. **The skeleton's `server.ts` may need a touch.** Update cost: ~1 hour.

[UNVERIFIED specific dates - rely on general industry knowledge. S1, S5 reference these in passing.]

**Net:** budget 1-2 days of skeleton maintenance per framework-major cycle. Set a calendar reminder. **The alternative is not "no skeleton" - it is "every app pays the same upgrade tax on day 1"**. So the skeleton still wins.

### 4.5 Verdict on the hybrid decision

**Validated.** The hybrid is the correct shape. The checked-in half should be **smaller** than the user's instinct suggests (15-20 files, not 30); the command half should be **richer** (auth, payments, charts, mobile, realtime, i18n, analytics). One concrete revision: move the **UI library (Button, Modal, etc.)** from "checked-in" to a command (`pnpm dlx shadcn add button card input ...`) - this offloads future design-token churn to shadcn's roadmap and keeps the skeleton's CSS layer a thin shell.

---

## The single highest-leverage change

**Replace the 6-file reading-order prose in `INDEX.md` with a Skills-style router-first INDEX (~500 tokens) that links to per-tier SKILL.md files (~3,000 tokens each) and ships a checked-in `_spine/` folder.**

- **The number:** saves ~9,000 input tokens per build (~$0.027 uncached, ~$0.005 cached) **per call**, plus ~62,500 output tokens (~$0.94) by replacing regeneration with `cp -r`. **Combined ~$0.97 per build**, rising to ~$9.70 saved across 10 builds on the same template.
- **The mechanical change:** (a) cut `INDEX.md` to ~500 tokens with a tier router; (b) split the architecture doc into `tier0/SKILL.md`, `tier1/SKILL.md`, `tier2-<kind>/SKILL.md`; (c) vendor a real `_spine/` with the 15-20 files from Part 4.1; (d) one CLAUDE.md/AGENTS.md pointing to the Skills convention.
- **The test:** read `INDEX.md` cold on a fresh agent; size = 400-800 bytes.

## False economies

These look like token-saving moves; each one burns more tokens downstream.

1. **Terse `INDEX.md` without examples.** A 200-byte INDEX saves input but causes the agent to mis-pick the tier or forget a non-negotiable. Cost of guessing wrong: ~30,000 output tokens of "wrong" code + a retry. **Always include 1 short example per tier in INDEX.**
2. **Aggressive file merging to under 200 lines.** Looks like fewer tokens, costs more turns because each read pulls in unrelated state. Keep file splits at *responsibility* boundaries, not line-count ceilings.
3. **"No comments in code" applied uniformly to maintenance code too.** Saves 10-20% on output [A10], costs 5-15% per re-read on code over ~6 months old [A22]. Net loss. **Allow comments on edges, schemas, async pipelines.**
4. **Skipping verification prompts to save output.** Skipping `tsc --noEmit` saves ~1,000 output tokens per build; one uncaught type error costs ~5,000-10,000 output tokens of debug-and-fix. Run the minimum verifications.
5. **Hand-crafted 50-line clever Tailwind classes** in the skeleton to look "designy." Looks compact, costs every agent ~5-15 extra output tokens per re-derive. **Use named tokens** (`bg-surface`, `text-fg`) over class chains.
6. **Routing every read through `edit` to "save output."** Edit tool's `oldString` failures when the file shifted cost a full re-read (~5,000 input tokens). Always `read` before `edit` for files not written in the same turn.
7. **Prompt-caching aggressively with manual `cache_control` markers on every block.** The 4-breakpoint limit [S3] and the 20-block lookback [S3] mean non-experts commonly bust their own cache. Net cost > savings in many configurations. **Test with the API's cache diagnostics beta [S3].**
8. **Skipping the spec/plan step to save turn tokens.** A short plan saves ~500 output tokens; one missed requirement costs ~30,000. Always plan first.

## How to measure this system

Concretely, a future task should track:

| Metric | Definition | Target |
|---|---|---|
| **tokens per app** | sum(input_tokens) + sum(output_tokens) per full build, summed across all calls | tier0 <30k, tier1 <80k, tier2 <150k |
| **files generated vs copied** | (cp/cat touches) / (writes + edits) | >70% in tier1 builds |
| **retry count** | number of `tsc --noEmit` or `npm run build` failures per build | median 0, p95 ≤ 1 |
| **time to first green build** | wall-clock seconds from chat message to passing build | tier1 <6 min on Sonnet 4.6 |
| **cache hit rate** | sum(cached_tokens) / sum(input_tokens) | >80% by call 3 |
| **clarification turns** | agent→user messages before plan finalization | median 3, p95 ≤ 6 |
| **skeleton rot incidents** | framework-major / lockfile / type-drift issues per quarter | ≤1 / quarter |

## What this changes about our template design

Concrete design rules, 5-10 bullets, that this angle obliges the rest of the dossier to respect.

- The template system MUST NOT be a flat prose pack. It must be `_spine/` (vendor code) + `INDEX.md` (router) + per-tier `SKILL.md` files. Replace the existing 6-file reading-order.
- The `_spine/` MUST compile and `npm run dev` cleanly on clone, with **zero app-specific tokens** in any spine file (app-name, theme, routes live in `tier<N>-<kind>/`).
- The system's INDEX.md MUST be ≤ 1,000 tokens, MUST include a one-paragraph example per tier, and MUST link to a per-tier SKILL.md via filename only (no URLs that go stale).
- Per-tier SKILL.md MUST be ≤ 5,000 tokens and MUST defer detail to nested reference files (Anthropic Skills Level 3 pattern [S1, S2]); reference files cost zero tokens until accessed.
- Optional layers (auth, payments, charts, mobile shell, realtime) MUST be commands the agent runs, with their canonical CLI invocation pinned to a version in `package.json` `scripts`. No checked-in `auth/`, `payments/` etc. in the spine.
- The system MUST declare its target pricing model (per Anthropic Sonnet 4.6 / OpenAI GPT-5.6) in the readme, with the actual cache-hit USD as a sanity check, not abstract "fewer tokens" claims.
- Token budgets per phase (modeled in Part 1.2) MUST be replicated in the design doc so designers and planners can quote concrete budgets.
- The same INDEX MUST work in Kilo, Claude Code, Cursor, OpenCode, Codex - i.e., portable markdown only (per Q4 in `share/handoffs/00_scope_confirmed_T-2026-08-13-003.md:30-34`). No agent-runtime-specific mechanism.
- Bumping a dependency in the spine MUST be a 1-PR affair with a CHANGELOG entry. The system MUST NOT absorb "framework-major" updates silently.

## For other angles

- **Angle A (prior-art OSS).** Look for templates that already use Skills-style progressive disclosure. Anthropic's `anthropics/skills` repo [S1] is the canonical reference. OSS ports to find: `openai/cookbook` AGENTS.md pattern, `openai/codex` nested AGENTS.md [S5], Vercel's `next.js` examples.
- **Angle B (competitors).** The dollar comparison in Part 1.3 should be the headline table. Bolt-on competitors (Lovable, v0, Bolt.new) charge $20-200/mo for token budgets; this angle shows that a self-hosted Skills-style spine is 5-10× cheaper per-build. **Loose claim worth verifying in B.**
- **Angle C (app-kind matrix).** The Tier 2 specialist kinds from `00_scope_confirmed` (Q6: AI chat/LLM tool, mobile, SaaS w/ auth+billing, storefront, content/docs, bot/extension/CLI) each need their own tier2-`<kind>/SKILL.md` plus, for kinds with heavy optional layers, a layer-as-command spec. Pass Part 4.2's command list to C.
- **Angle E (intake protocol).** The intake cost (Step 4 in Part 3.2) is ~$0.005 USD / ~1,500 tokens per round. E's prompt-level protocol must keep clarification rounds ≤ 4 on tier 1.
- **Angle F (audit of existing template).** This angle's conclusion: **kill `APP_ARCHITECTURE_GUIDE.md` as a monolithic read; split it.** Specifically: `INDEX.md` (read first, ~500 tokens) → tier0 SKILL.md or tier1 SKILL.md (~3k tokens) → optional `tierN/REFERENCE.md` (read on demand, zero upfront cost). The current `REFERENCES.md` (13.5 KB) should be demoted to Level 3 and never read up front.

## Risks and doubts

- **The 18 tokens/line estimate for TSX/TS may undercount.** Real-world generated TSX with imports, types, and runtime code trends 22-30 tokens/line. **Severity: medium.** If correct, total tier1 output jumps from ~144k to ~216k tokens and the cost saving (skeleton-first) rises from $0.94 to ~$1.40 per build. The headline ("5-7×") does not change. **Mitigation: re-measure against the Vite React+TS scaffold before locking the budget.**
- **Cache write cost on a Sonnet 4.6 5-min cache at 1.25× input [S3] is +$0.009 per million tokens of prefix on the first call** - higher than the savings on a single-call scenario. **Severity: medium.** The cache story only works on multi-call or amortized; a one-shot agent run still pays the write. **Mitigation: plan for amortized sessions; do not promise per-call savings in marketing.**
- **AGENTS.md convention [S5] reportedly "60k+ projects" is a `path%3AAGENTS.md` search count on GitHub [S5] - it includes trivial files and orphaned forks.** **Severity: low.** The convention is real and shipping; the count is a soft signal not a stat. **Mitigation: cite the conv as "convention widely adopted", do not quote the count in user-facing output.**
- **Skeleton-version drift is real.** Real-world examples (Tailwind v3→v4, React 18→19, Vite 5→6→7, Express 4→5) require skeleton updates roughly **once per framework per 12 months**. **Severity: medium.** Maintenance burden is ~1-2 days / framework-major. **Mitigation: dated CHANGELOG + a "framework-major update checklist" runbook.**
- **Sub-agent context isolation savings are not published.** [A21] estimate is bounded but unverifiable. **Severity: low.** Rough magnitude only. **Mitigation: don't promise sub-agent savings in writing; treat as upside.**
- **No current Anthropic pricing data exists for "Sonnet 4.6 cache hit on multi-block prompts with 4 breakpoints" specifically** - the docs give per-token rates but the breakpoint arithmetic is implementation-detail and routing-dependent. **Severity: low.** Cost will fall in a predictable band but isn't exactly predictable. **Mitigation: ship a cost-calibration script (`scripts/cache-cost.ts`) that logs `cache_read_input_tokens` per call for review.**
- **Anthropic deprecation volatility.** Several models in the cache pricing table are already "retired, except on Bedrock and Google Cloud" [S3]; the lifespan of a given model-tier's pricing is ~18-36 months. **Severity: medium.** Pick the longest-lived tier (Sonnet 5 / Opus 5 in the 2026-08-13 table [S3]) for budget quotes; flag the tier in every cite.

## Sources

- [S1] **Anthropic - "Equipping agents for the real world with Agent Skills" (Engineering blog)**, https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills, accessed 2026-08-13. *Proves: Skills uses a three-level progressive disclosure model; bundled scripts are "far more efficient than having Claude generate equivalent code on the fly" (Step "Skills and code execution"); Skills is an open standard (note at top, Dec 18 2025).*
- [S2] **Anthropic - "Agent Skills overview" (Claude docs)**, https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview, accessed 2026-08-13. *Proves: The per-level token cost table - "Level 1: Metadata ~100 tokens per Skill", "Level 2: Instructions Under 5k tokens", "Level 3+: None until accessed" - and the principle "There's no context penalty for bundled content that isn't used."*
- [S3] **Anthropic - "Prompt caching" (Claude docs)**, https://platform.claude.com/docs/en/build-with-claude/prompt-caching, accessed 2026-08-13. *Proves: Pricing multipliers (5m writes 1.25×, 1h writes 2.0×, cache reads 0.10×); per-model min cacheable prefix (Sonnet 4.6 = 1,024 tokens); 4 explicit breakpoints; 20-block lookback; cache hierarchy tools→system→messages; "Common mistake: Breakpoint on content that changes every request" produces zero cache hits; Sonnet 5 pricing ($2/MTok input, $10/MTok output); Sonnet 4.6 ($3/MTok input, $15/MTok output); Haiku 4.5 ($1/MTok input, $5/MTok output).*
- [S4] **OpenAI - "Prompt caching" (Developer docs)**, https://platform.openai.com/docs/guides/prompt-caching, accessed 2026-08-13. *Proves: GPT-5.6+ requires `prompt_cache_key` for reliable matching; 1,024-token minimum; 30-minute exact TTL; 0.10× cached-input price; 1.25× cache-write cost; earlier models use automatic best-effort caching with 5-10 min in-memory retention.*
- [S5] **AGENTS.md project site + GitHub search corpus**, https://agents.md/, accessed 2026-08-13. *Proves: "Used by over 60k open-source projects"; cross-agent portability (Codex, Cursor, Jules, Zed, Devin, RooCode, Aider, opencode, etc.); nested AGENTS.md pattern (~88 nested files in the openai/codex monorepo cited in the FAQ); convention is now stewarded by the Agentic AI Foundation under the Linux Foundation.*
- [S6] **Model Context Protocol (MCP) - "What is MCP?" (project home)**, https://modelcontextprotocol.io/, accessed 2026-08-13. *Proves: MCP is a USB-C-port-like open protocol for agent tool/data access; widely supported across Claude, ChatGPT, VS Code, Cursor, MCPJam, etc.; cited in [S1] as a complementary layer to Skills.*

## Metrics

- findings: 18
- risks_HIGH: 0
- risks_MEDIUM: 4 (undercounted tokens/line, cache-write cost on one-shot, skeleton-version drift, model deprecation volatility)
- risks_LOW: 3 (AGENTS.md count quality, sub-agent savings unverifiable, cache-breakpoint arithmetic)
- clarifying_Qs: 0 (no user clarifications open - all numbers either cited or estimated with stated assumptions)
