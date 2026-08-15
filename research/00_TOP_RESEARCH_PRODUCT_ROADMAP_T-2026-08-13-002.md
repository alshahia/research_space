# Converting research_space into a top/best AI research product — roadmap (2026-08-13)

**Task:** T-2026-08-13-002
**Date:** 2026-08-13
**Author:** am-research (final deliverable, user-facing)
**Standing on:** 6 angle files (criteria / competitors / sources / synthesis / UX / current-state) merged into `share/notes/01_research_T-2026-08-13-002.md`; master synthesis at `share/notes/01_master_synthesis_T-2026-08-13-002.md`.
**Companion documents:**
- `research/00_COMPETITOR_MATRIX_T-2026-08-13-002.md` — 12 products × 18 columns
- `research/00_GAP_MATRIX_T-2026-08-13-002.md` — 25-row gap matrix with priority + effort

---

## 0. Executive summary (1 page)

### What "top/best" means in 2026

A top-tier AI research product is an agentic system that, given a topic from a non-expert user, autonomously (a) plans a multi-step research outline, (b) retrieves from web + academic + code + data + news at the primary-source level, (c) reasons about evidence and weighs contradictions, (d) synthesizes a citation-rich, multi-format output (report + tables + sources + audio/mind-map), (e) persists state across turns with follow-ups and source-attached mid-run redirection, and (f) honors a calibration contract — refuses cleanly when it cannot answer and names the gap when it cannot access a source [Angle A §1].

### Where research_space stands today (1 sentence)

The `platform/` Next.js app is an Iraqi drag-and-drop website builder with no LLM integration and no topic input; the `agents_manager/` orchestrator is a sophisticated 10-specialist multi-agent pipeline; the `research/` and `research_doc/` folders ship 3 fully-fleshed-out reference research outputs and 8 legacy dossiers that prove the user's research style — meaning the **research engine already exists** but the **front door does not** [Angle F §1].

### The blunt framing (master synthesis §1)

> The conversion is not "build a research product." It is **"wire a front door onto an existing research engine."** That changes the cost-and-time math dramatically: greenfield is 12–20 weeks one developer (Angle D §12); with aggressive reuse of `agents_manager/` + Drizzle + Next-intl primitives, the realistic estimate is **6–10 weeks for v1**.

The user already owns two of the three things a top research product needs:

1. **A working multi-agent orchestrator** with 10 specialists, soft-walls, adaptive mode, context-hub validation, audit trail. Most "AI research product" projects in 2026 ship a single agent with a tool loop. `agents_manager/` is ahead of that.
2. **Three shipped-quality research outputs** (cloudflare ~78K words with 5 streams + master synthesis debunking 8 source-video claims; ai-tools 6-stream; notebooklm 4-stream) — these are the deliverable format the product must match.

What the user does **not** have:

3. **A front door.** No UI that says "what topic do you want researched?" No tenant auth. No API that turns a topic into a research run.

### The 4-tier ship recommendation

| Tier | Scope | Effort | Status of "top product" target |
|---|---|---|---|
| **Tier 1 — MVP** | Topic input UI + auth + queue + 4 source connectors + citation system + Markdown renderer | 6–8 weeks one developer | Beats "Perplexity + Notion" workflow for the user's stated use case; EN-only is the *floor*, EN+AR is the *recommended default* |
| **Tier 2 — v1** | Verification stage + plan-then-confirm + compare/timeline outputs + Arabic synthesis + eval harness | 6–10 weeks | First paying-user-ready product; matches ChatGPT Plus/Claude Pro/Perplexity Pro surface |
| **Tier 3 — v2** | Multi-agent orchestrator + mind-map + slide export + audio overview + source-grounded follow-up | 4–6 weeks | Matches NotebookLM's flagship audio + ResearchRabbit's citation-graph visualization |
| **Tier 4 — v3** | Citation graph viz + team workspaces + SSE progress + notifications + WASM SDK | 4–6 weeks | Matches the open-source-mature SaaS frontier (STORM is the only fully OSS competitor) |

### The 3 architectural decisions the user must make (default recommendation in §6)

1. **App structure** — extend `platform/` (reuse schema, locale routing, payments, PWA, ISR) **vs.** new `research_app/` next to it (clean domain model, no schema pollution, ~1 week to rebuild locale routing + PWA). **Default: new `research_app/`.**
2. **Locale-first** — EN-only MVP vs. EN+AR vs. EN+AR+KU. **Default: EN+AR MVP, KU deferred.**
3. **Monetization** — free MVP / freemium v1 / paid-from-day-one. **Default: free MVP, freemium v1.**

Five further decisions (LLM provider, distribution, MVP vs v1 scope, source-stack choice, framework choice) are catalogued in §4.4 and surfaced as user questions before planning starts.

---

## 1. Layer 1 — Definition (what "top/best" means in 2026)

### 1.1 The 6-part working definition (from Angle A §1)

A top-tier AI research product in 2026 is an agentic system that, given a topic from a non-expert user, autonomously:

1. **Decomposes** the topic into a multi-step research plan (visible, editable, revisable), and iteratively refines it as new information arrives [Angle A [1], [2]].
2. **Retrieves** from the open web and from authenticated/paywalled sources (papers, PDFs, code, datasets, books, news) at the **primary-source** level — not just abstracts or summaries — with code execution and tool use to manipulate data [Angle A [1], [3]].
3. **Reasons** about evidence, weighs contradictory findings, and surfaces uncertainty rather than smoothing it over [Angle A [1], [4]].
4. **Synthesizes** a citation-rich, multi-format output (long-form report + structured tables + source list + audio/podcast/mind-map) that a domain expert can verify line-by-line [Angle A [1], [5], [6]].
5. **Persists** state across turns — the user can ask follow-ups, narrow scope, attach files, change audience — and the product retains context, sources, and intermediate artifacts [Angle A [7]].
6. **Honors** a calibration contract: if the system is unsure, it says so; if it cannot complete the task, it refuses cleanly; if it cannot access a source, it names the gap [Angle A [4], [8]].

That definition separates a *research product* from a *chatbot*: the former plans, browses, retrieves, executes, cites, and persists; the latter answers one prompt at a time from parametric memory.

### 1.2 The 8-dimension criteria framework (compressed from Angle A §2)

Every criterion is written so it can be measured by an internal evaluator or by an external benchmark. "Top tier" means meeting a published SOTA score **plus** meeting the qualitative criteria below.

| Dim | Name | What it measures | Top-tier threshold (2026 reference) |
|---|---|---|---|
| 1 | Output quality | Accuracy / depth / freshness / contradiction handling | ≥30% HLE accuracy (Gemini 3 Pro 38.3% is published SOTA, Aug 2026 [Angle A [9]]); ≤6× hallucinations vs. prior generation (GPT-5 vs. o3 [Angle A [8]]); ≥1 explicit contradiction flagged per disagreement |
| 2 | Source coverage | Breadth across academic / web / code / data / news / book | ≥60% of claims multi-classed (Gemini DR 111.21 effective citations SOTA [Angle A [10]]); ≥80% of citations backed by a fetched document |
| 3 | Synthesis quality | RACE Comprehensiveness, argument structure, counter-arg handling, instruction-following | ≥46/100 RACE Comprehensiveness (Gemini DR 48.53 SOTA); ≥49/100 RACE Instruction-Following (OpenAI DR 49.27 SOTA) |
| 4 | UX excellence | Clarifying questions, multi-format outputs, latency, interactivity, multi-language, multi-modal | Quick answer <3 s p50; deep run 5–30 min (OpenAI DR); ≥4 distinct output formats; clarify rate 10–25% on ambiguous topics |
| 5 | Trust & verification | Citation traceability, accuracy, effective count, calibration, self-critique | 100% of factual claims cited; ≥90% citation accuracy (Perplexity DR 90.24% SOTA [Angle A [10]]); ≥80 effective citations; ≤55% RMS calibration error; self-critique pass mandatory |
| 6 | Edge cases | Multi-language, multi-modal, real-time, multi-turn, deep vs quick, adjudication | ≥90% of English quality on HLE-translated subset; ≥80% of text-input quality on image/audio-only |
| 7 | Operational excellence | Median runtime, cost, scale, uptime, observability | 5–15 min median; <$1 per run at internal cost; ≥100 concurrent jobs; ≥99.5% uptime; per-run JSONL trace |
| 8 | Differentiation vs general chat | Persistent state, audit trail, reproducibility, tool-use breadth, multi-step planning | All 5 are structural — *the presence* of these features is what makes a research product different from a chatbot |

### 1.3 The 3 differentiating axes (from Angle A §3)

Not all 30+ subcriteria above carry equal weight. Across the 2026 frontier, three axes separate top-tier products from mid-tier ones — they are the axes where benchmarks most clearly separate the leaderboard.

#### Axis 1 — Citation accuracy × citation density (the "trust compound")

DeepResearch Bench's FACT framework is the first benchmark to score *both* Citation Accuracy and Effective Citation count. The leaderboard shows the two metrics can disagree wildly: Gemini DR has the highest effective-citation count (111.21) but Perplexity DR has the highest accuracy (90.24%). The leader on the *compound* metric (effective × accuracy) is the leader that matters [Angle A [10]]. **This is the single best predictor of "best research product" in 2026.**

#### Axis 2 — Agentic depth × effort control (the "thinking budget")

The frontier has converged on giving the user a budget knob. Anthropic exposes an `effort` parameter on Opus 4.5 [Angle A [7]]; OpenAI Deep Research runs 5–30 minutes with parallel browsing + Python [Angle A [1]]; Gemini Deep Research runs a multi-step plan that the user approves first [Angle A [2]]. The differentiator is not raw thinking time but *controllable* thinking time — the user can dial depth. Products that hide the budget lose.

#### Axis 3 — Multi-agent orchestration × self-critique (the "verification loop")

The DeepResearch Bench results show that *Deep Research Agents* (multi-step, multi-tool agents) beat *LLMs with Search Tools* on effective citations by 3–10× [Angle A [10]]. The agents that win run an explicit plan → search → read → synthesize → critique → revise loop, not a single retrieval-augmented generation pass. Claude Opus 4.5 reports a **+15pp improvement on BrowseComp-Plus** when advanced-tool-use + context-compaction + memory are combined [Angle A [7]] — confirming that the orchestration layer is where the gains live.

### 1.4 The 2026 benchmarks (Angle A §4)

| Benchmark | Dataset size | Category | Last leaderboard update (as of 2026-08-13) | SOTA |
|---|---|---|---|---|
| **Humanity's Last Exam (HLE)** | 2,500 expert questions across 100+ subjects (14% multimodal, 24% multiple-choice) | Closed-ended expert Q&A | Live leaderboard at lastexam.ai [Angle A [9], [11]] | Gemini 3 Pro 38.3% acc / 57.2% calibration; GPT-5 25.3%; Grok 4 24.5%; Claude 4.5 Sonnet 13.7% |
| **DeepResearch Bench** | 100 PhD-level research tasks (50 EN, 50 ZH) across 22 fields | Open-ended deep-research reports | RACE + FACT framework; project page [Angle A [10]] | Gemini DR 48.88 RACE / 111.21 effective-citations; OpenAI DR 46.98 / 46.5 effective; Perplexity DR 42.25 / 90.24% C.Acc |
| **GAIA** | ~450 tasks across 3 difficulty levels | Tool-use, multi-modal, web-browsing | OpenAI DR pass@1 67.36, cons@64 72.57 (SOTA at launch, Feb 2025) [Angle A [1]] | OpenAI DR |
| **BrowseComp / BrowseComp-Plus** | BrowseComp-Plus = fixed-curated-corpus variant | Deep-research agent eval with isolated retriever | arXiv:2508.06600 [Angle A [12]] | GPT-5 + Qwen3-Embedding-8B retriever = 70.1%; GPT-5 alone = 55.9%; Search-R1 + BM25 = 3.86% |
| **GPQA** | 448 PhD-level science questions | Closed-form expert reasoning | arXiv:2311.12022 | Claude Opus 4.5 84.8% with parallel test-time scaling [Angle A [13]]; GPT-5 pro 88.4% without tools [Angle A [8]] |
| **HLE-Rolling** | Dynamic fork of HLE with continuous updates | Closed-ended frontier | Launched Oct 2025 [Angle A [11]] | Ongoing |
| **SEAL Leaderboards** | Aggregated public-private evals | Cross-benchmark | scale.com/leaderboard/humanitys_last_exam | Updated continuously |

### 1.5 Layer 1 citations (numbered; full URLs in §5)

- [1] OpenAI — "Introducing deep research" — https://openai.com/index/introducing-deep-research/ — accessed 2026-08-13
- [2] Google — "Try Deep Research and our new experimental model in Gemini" — https://blog.google/products/gemini/google-gemini-deep-research/ — accessed 2026-08-13
- [3] Anthropic — "Claude's extended thinking" — https://www.anthropic.com/news/visible-extended-thinking — accessed 2026-08-13
- [4] Anthropic — "Introducing Claude Opus 4.5" — https://www.anthropic.com/news/claude-opus-4-5 — accessed 2026-08-13
- [5] Perplexity — Product Features — https://www.perplexity.ai/hub/faq/what-is-perplexity-pro — accessed 2026-08-13
- [6] Wikipedia — Gemini Notebook (NotebookLM) — https://en.wikipedia.org/wiki/Gemini_Notebook — accessed 2026-08-13
- [7] Anthropic — "Claude Opus 4.5" — see [4]
- [8] OpenAI — "Introducing GPT-5" — https://openai.com/index/introducing-gpt-5/ — accessed 2026-08-13
- [9] Center for AI Safety + Scale AI + HLE Contributors — "Humanity's Last Exam" landing page — https://lastexam.ai/ — accessed 2026-08-13
- [10] Du et al. — "DeepResearch Bench" project page — https://deepresearch-bench.github.io/ — accessed 2026-08-13
- [11] Phan et al. — "A benchmark of expert-level academic questions" — *Nature* 649:1139–1146 — https://www.nature.com/articles/s41586-025-09962-4 — accessed 2026-08-13
- [12] Chen et al. — "BrowseComp-Plus" — arXiv:2508.06600 — https://arxiv.org/abs/2508.06600 — accessed 2026-08-13
- [13] Anthropic — "Claude's extended thinking" — see [3]

---

## 2. Layer 2 — Current state (what research_space already has)

### 2.1 The blunt finding

> `platform/` is **not** a research product today. It is a fully working Iraqi drag-and-drop website builder (Wix-for-Iraq): 5 locale templates, GrapesJS editor, Drizzle ORM on Postgres, ZainCash + QiCard payment stubs, multi-locale (ar/en/ku) with RTL [Angle F §2.1]. The schema has zero research primitives — no topics table, no sources table, no chunks/embeddings table, no LLM API call. Angle A's "give me a topic" UI does not exist; it would have to be built greenfield.

The research engine is **the orchestrator + the existing research outputs**, not the platform.

### 2.2 The orchestrator (`agents_manager/` v0.20.0)

`agents_manager/` is a sophisticated 10-specialist (master + research/planning/coder/review/design/assets + investigate/ship/health) multi-agent pipeline. From Angle F §2.4:

- **10 OpenCode agents** defined in `opencode.jsonc:5-6, 51-129`.
- **Bus** at `agents_manager/SKILL.md:107-121` (`share/{notes,reports,handoffs,messages,design,templates}/` + `tasks/`).
- **Pipeline** at `agents_manager/SKILL.md:184-192`: Phase 0 Ingest → Phase 1 Research → Phase 2 Planning → Phase 3 Build → Phase 4 Review → (Phase 5 release, opt-in). v0.9.0+ adds Phase 3a Assets. v0.16.0+ adds adaptive orchestration. v0.20.0+ adds mandatory **context-hub (chub)** protocol.
- **MCPs wired** in `opencode.jsonc:29-35`: codebase-memory (am-research / am-review / am-investigate / am-coder), github (am-ship), testsprite (am-coder run, am-review cite — optional).
- **Trace substrate**: every run writes to `share/notes/00_trace_<task-id>.jsonl` (verified format in `00_trace_T-2026-08-13-002.jsonl` line 1: `{"ts":"2026-08-13T09:32:00+03:00","phase":0,"agent":"master","event":"task_ingest"...}`).

The gap to "topic-input research product": the orchestrator is task-oriented and filesystem-driven; no UI exposes it; no auth; no tenant isolation.

### 2.3 The 3 reference research outputs (`research/`)

These are exactly the deliverable format the user is asking for. From Angle F §2.2:

| Project folder | Format | Status |
|---|---|---|
| `research/cloudflare-agent-internet-2026-08-12/` | 5-stream parallel research, 8 am-research sub-agents, **~78K words**, 2 competitor matrices | Done |
| `research/ai-tools-assessment-2026-08-13/` | 6 research files (operations playbook / prompt pack / competitors / opensource / saas conversion / llm agent guide) + `00_MASTER_SYNTHESIS.md` | Done |
| `research/notebooklm-research/` | 4 parallel agents (`01_notebooklm` / `02_competitors` / `03_opensource` / `04_build_guide`) each with `FINDINGS.md` + `PROGRESS.md`, plus 178-line orchestrator `README.md` | Done |

Every project has: top-level `README.md` (executive summary); `00_MASTER_SYNTHESIS.md` or per-stream `FINDINGS.md` (the actual report); per-stream `PROGRESS.md` (audit trail of sources hit + confidence ratings); `source/` (raw source material); `ideas/` (tangential candidates).

The cloudflare synthesis includes a critical fact-check at `research/cloudflare-agent-internet-2026-08-12/00_MASTER_SYNTHESIS.md:14-37` rebutting 8 source-video claims — exactly the self-critique pattern Angle D calls for. The notebooklm build guide at `research/notebooklm-research/04_build_guide/FINDINGS.md:23-50` is itself a **spec** for building a research product.

### 2.4 The 8 legacy dossiers in `research_doc/`

From Angle F §2.3. Each proves the user's research style and language flexibility:

| Subfolder | Topic | Format |
|---|---|---|
| `3d-printer-research/` | 3D printers for Iraqi market, types/prices/materials | 12 numbered chapters + sell-products subfolder |
| `animated_website_deepseek_flash/` | Animated websites — 12 kinds | `00_MASTER_INDEX.md` + per-angle sub-agent outputs |
| `animated_website_minimax_2.7/` | Animated websites (MiniMax-2.7) | 6 chapters |
| `animated_website_minimax_3/` | Deepest dossier — 60+ files across 8 numbered sub-folders | Modular |
| `book-to-video/` | Book→video pipeline | 365-line single-file spec |
| `book_selling_platforms/` | Book-selling AR/EN with Syrian-nationality eligibility | Bilingual |
| `iraq-website-builders/` | Iraqi website-building market | 178-line competitor database + strategic analysis |
| `kotobee_publishing/` | Kotobee platform research (T-2026-08-12-001) | 8 chapters + bilingual Arabic market deep-dive |

Common 8-file pattern (newer dossiers): `00_README.md` → `01_*_factsheet.md` → `02_*_analysis.md` → `03_*_start_path.md` → `04_*_resources_master_list.md` → `05_*_llm_agent_guide.md` → `06_*_deepdive.md` → `99_appendix_links.md`.

What this tells us about the user's research style:
- **Heavy dossier mode** (50–200 KB Markdown, hundreds of cited URLs)
- **Multi-chapter structure** with named reading order
- **Language flexibility** — Arabic content interleaved where the topic calls for it (`kotobee_publishing/06_arabic_market_deepdive.md` is in Arabic; `book_selling_platforms/03_arabic_channels.md` has bilingual templates)
- **Honesty about uncertainty** — 🔶 "verify at signup" checkboxes pervasive (`research_doc/book_selling_platforms/00_README.md:9-15`)
- **Specialist-driven parallel research** (`animated_website_deepseek_flash/sub_agents/`; `research/cloudflare-agent-internet-2026-08-12/research/05_recursive_language_models/HARNESS_LANDSCAPE_MATRIX.md` — 127-row matrix)

### 2.5 The 25-row gap matrix (imported from Angle F §5; preserved exactly)

> **Full table:** `research/00_GAP_MATRIX_T-2026-08-13-002.md` (companion file) — includes Priority + Effort columns.

Counts: **FULL 5 / PARTIAL 9 / NONE 11**. The full 25 rows are preserved verbatim in the companion file. Highlights below:

#### The 5 FULL rows (production-ready today; reuse not build)

| # | Feature | Evidence |
|---|---|---|
| 19 | PWA / offline | `platform/next.config.ts:29-33` + `public/sw.{ts,js}` via Serwist |
| 20 | Multi-locale routing | `platform/src/middleware.ts:1-9` + `src/i18n/routing.ts` + `src/i18n/request.ts` |
| 21 | Hosting infra (Cloudflare R2, custom domains, publish flow) | `platform/next.config.ts:11-26`; `api/sites/[siteId]/publish/route.ts`; `api/sites/domain/route.ts` |
| 22 | Specialist pipeline (research → plan → review) | `agents_manager/` (10 agents, 4 tiers) |
| 24–25 | Cleanup tasks (out of scope) | Various |

#### The 11 NONE rows (must be built greenfield)

| # | Feature | Why it matters |
|---|---|---|
| 1 | Topic input UI | The product does not work without this |
| 2 | Auth + multi-tenant topic namespace | Required before any concurrent-user safety |
| 8 | Output rendering — mind-map | Differentiator (only ResearchRabbit has it well) |
| 9 | Output rendering — podcast / audio overview | NotebookLM flagship; high shareability |
| 10 | Output rendering — slide deck | B2B value |
| 11 | Output rendering — citations table | Trivial |
| 13 | Image / chart generation | Optional (lowest-priority) |
| 15 | Observability + evaluation harness | No RAGAS / Langfuse today |
| 16 | Source-grounded abstention ("I don't know") | Trust UX |
| 17 | Discovery + search across past runs | NotebookLM-like "past notebooks" |
| 24–25 | Cleanup | Out of scope |

#### The 9 PARTIAL rows (primitive form exists; productionize)

| # | Feature | What's primitive | What's needed |
|---|---|---|---|
| 3 | Research orchestration engine | `agents_manager/` works but is filesystem-driven | Web API + worker + run state |
| 4 | Multi-source ingestion | Prior research cites tavily/exa URLs | First-party connectors in `lib/sources/` |
| 5 | Citation-aware generation | Hand-written `[source](url)` in Markdown | `lib/citations.ts` with `[S1]…[Sn]` + abstention |
| 6 | Synthesis + self-critique | Hand-rolled 8-row fact-check in cloudflare synthesis | `lib/synthesis.ts` with automated critique loop |
| 7 | Output rendering — long-form report | Markdown exists, no HTML renderer | Block-mapped renderer |
| 12 | Multi-language output | Platform has `ar/en/ku` locales; syntheses are EN-only | Locale-aware synthesis prompts |
| 14 | Tenant billing / quotas | Iraqi payments exist for website builder | Per-plan research quota + metering |
| 18 | Sharing / export | OG/Twitter meta exists | Per-run meta + Markdown/PDF/DOCX export |
| 23 | Templates / scaffolds | `share/templates/cinematic-landing-fixes.md` exists | Ship `templates/research-dossier/` |

### 2.6 Implicit strengths (9) — what makes this project different from a fresh build

From Angle F §6:

1. **A working 10-agent orchestrator is already shipped** (v0.20.0 with adaptive mode + chub + design preflight + investigate/ship/health). Most "AI research product" projects in 2026 don't have a pipeline at all — they ship a single agent.
2. **Three fully-fleshed-out reference research outputs** in `research/` — each demonstrates the format Angle A is asking for. These are the spec the product must match.
3. **Eight legacy dossiers in `research_doc/`** that prove the user knows how to do research at scale and in Arabic — a real distribution advantage in MENA markets where Perplexity and NotebookLM are weak.
4. **Iraqi locale (`ar` + `ku`) shipping today** — `platform/src/i18n/messages/ku.json` is a verified artifact (Sorani Kurdish). Notion, Perplexity, ChatGPT all ship English-first with bolted-on Arabic. The user has been Kurdish/Arabic-first since the start.
5. **Iraqi payment rails already integrated** (ZainCash + QiCard stubs at `platform/src/lib/payments/stub.ts:80-81`) — a MENA-monetization moat no Western competitor has.
6. **A brutally honest self-critique culture** — `research/cloudflare-agent-internet-2026-08-12/00_MASTER_SYNTHESIS.md:14-37` debunks 8 source-video claims in a 23-row table. This is rare in the space and matches Angle D's "self-critique loops".
7. **Audit trail + WARN register** (`share/notes/04_warns_register_*.md` + `99_decisions.md`) — every prior task has a `Loop history` block in `tasks/<id>.md`. A research product can surface this audit trail to the user.
8. **Memory + sweep** (`agents_manager/memory/`) — agents already have a 3-scope memory system (`global/`, `projects/<slug>/`, `notes/semantic/`). Per-user research memory is a small extension.
9. **A real, mature multi-dialect installer** (`bin/agents-manager.{sh,cmd,ps1,py}`) — if the conversion ships as a downstream OpenCode product, the install story is already solved.

### 2.7 Implicit weaknesses (10) — what's missing

From Angle F §7:

1. **No front door.** The orchestrator has no UI; `platform/` has UI but is the wrong product. Adding a topic input requires both a UI surface AND wiring it to the orchestrator.
2. **No multi-tenant research state.** The bus is one flat filesystem. Two users running concurrent research will collide on `share/notes/01_research_T-*.md`. A `runs` table keyed by `userId` + `runId` is required.
3. **No auth.** `platform/src/middleware.ts:1-9` is locale-only; `users` table has no password hash.
4. **No LLM integration in `platform/`.** Zero LLM API calls. All research is currently done in batch by `am-research` running in the same process as the controller.
5. **No source connectors.** Web / arXiv / PubMed / YouTube ingestion is referenced in research notes but no first-party connectors exist.
6. **No evaluation harness.** No RAGAS, no golden Q&A, no LLM-as-judge. The product cannot tell whether the next run is better or worse than the last.
7. **No first-party citation system.** Citations are hand-written in Markdown; the product has no `[S1]…[Sn]`-style chunk-anchored citation UX.
8. **The 3 `research/` projects are not the user-facing product** — they are analyst reports. The product needs a renderer that turns `00_MASTER_SYNTHESIS.md` into a navigable page with citations, mind-map, audio, etc.
9. **No paged / chunked retrieval.** Synthesis is single-shot over a topic + sources; for long topics (100+ sources) the synthesis needs hierarchical summarization (Map-Reduce / RAG). Not implemented.
10. **English-only syntheses.** All 3 `research/` master syntheses are English. Arabic-first is the user's competitive edge but the synthesis layer does not yet produce Arabic reports.

---

## 3. Layer 3 — Gap (what's missing vs. the definition)

### 3.1 Top 3 gaps (front door / multi-tenant / auth + tenant billing)

These are the three gaps whose closure unblocks everything else:

1. **Front door** — gap-matrix rows 1 (topic input UI), 5 (citation-aware generation), 6 (Markdown renderer). Without these, the user cannot submit a topic or read a result.
2. **Multi-tenant state** — gap-matrix rows 2 (auth), 3 (worker dispatcher), 14 (quotas). Without these, concurrent runs collide.
3. **Auth + tenant billing** — gap-matrix rows 2, 14. Without these, the product cannot be paid.

All three are P0 (gap-matrix companion file §1) and together account for ~3–4 weeks of one-developer work.

### 3.2 The 11 NONE rows (must be built greenfield)

See §2.5 above for the table. Quickest summary:
- 3 P0 NONE rows: topic input UI, auth, citations table.
- 4 P1 NONE rows: mind-map, podcast/audio, observability/eval, abstention.
- 2 P2 NONE rows: slide deck, image generation.
- 2 P3 NONE rows: cleanup tasks.

### 3.3 The 9 PARTIAL rows (productionize what exists)

See §2.5 above. Critical: the PARTIAL rows represent the **biggest leverage** because the primitive already exists — the work is to harden it.

### 3.4 The 5 FULL rows (reuse as-is)

PWA, multi-locale routing, hosting infra, specialist pipeline, templates. No code to write.

### 3.5 The 8 build-vs-reuse decisions (deferred to planning)

From Angle D §12 and master synthesis §3.4 — each corresponds to one or more gap-matrix rows:

| # | Decision | Gap-matrix rows affected |
|---|---|---|
| 1 | App structure: extend `platform/` vs. new `research_app/` | 1, 2, 3, 12, 19, 20, 21 |
| 2 | Orchestration framework: reuse `agents_manager/` vs. LangGraph vs. AutoGen | 3, 7, 22 |
| 3 | Retrieval/search stack: Tavily+Exa+Brave vs. Perplexity Sonar vs. custom | 4 |
| 4 | Atomic-fact decomposition: reuse FActScore (MIT) vs. build own | 7 |
| 5 | Verification model: Anthropic Claude (Sonnet v1 / Opus v3) vs. OpenAI GPT-5.x vs. open-source | 7 |
| 6 | Audit/trace substrate: extend `share/notes/00_trace_*.jsonl` vs. LangSmith vs. Langfuse | 3, 22 |
| 7 | Locale-first: EN-only MVP vs. EN+AR MVP vs. EN+AR+KU MVP | 12 |
| 8 | Monetization: free MVP only vs. freemium v1 (quotas + paid exports) | 14 |

All 8 must be answered by the user before the planning phase can decompose into code tasks.

---

## 4. Layer 4 — Roadmap (the conversion plan)

### 4.1 4 shipping tiers

The conversion plan is staged into 4 tiers. Each tier is independently shippable; the user can pause after any tier and ship.

#### Tier 1 — MVP (ship first; 4–6 weeks one developer; ~6–8 weeks if doing AR synthesis too)

The smallest shippable product that beats "Perplexity + Notion" workflow for the user's stated use case.

| # | What | Where it lives | Effort | Dependencies | Risks | Acceptance criteria |
|---|---|---|---|---|---|---|
| 1 | Topic input UI on `/[locale]/research` route | `research_app/src/app/[locale]/research/page.tsx` (new) or `platform/src/app/[locale]/research/page.tsx` (if extending) | 1 week | Locale routing (FULL row 20) | Scope creep into features that belong in v1 | Topic submit creates a `runs` row + dispatches worker; UI shows progress |
| 2 | Auth (NextAuth / Auth.js v5) + multi-tenant `runs` table | `lib/db/schema.ts` extension + `src/app/api/auth/` | 1 week | None — Postgres already there | Pick a provider; document the choice | Login required for `/research/*`; `runs.userId` is non-null |
| 3 | Topic → Plan JSON dispatcher (calls `am-planning` via a worker) | `src/app/api/topics/route.ts` + `src/workers/research.ts` (BullMQ) | 1.5 weeks | Rows 1, 2; existing `share/notes/` bus | "Who runs the worker" — separate process vs serverless | POST `/api/topics` returns a `runId`; status polled via SSE |
| 4 | `lib/sources/{web,arxiv,pubmed,youtube}.ts` (Angle C baseline stack) | new `research_app/src/lib/sources/` | 1 week | Angle C §11 (Tavily + ArXiv + PubMed + Brave free tier) | Free-tier quota exhaustion | At least 4 distinct source classes per run; cached |
| 5 | `lib/citations.ts` (`[S1]…[Sn]` markers + abstention gate) | new `lib/citations.ts` | 1 week | Row 4 | Hallucinated locators | Every factual sentence has a `[Sn]`; absent claims surface "could not verify" |
| 6 | Markdown renderer for synthesis output | `app/[locale]/research/[runId]/page.tsx` | 1 week | Rows 3, 5 | Tables, code blocks, citations rendered correctly | The 3 existing `research/` outputs render cleanly through the same renderer |

**MVP scope is 6 rows.** If AR synthesis is added (master synthesis §3.2 default), add 0.5 weeks to row 3 (Arabic prompt template).

#### Tier 2 — v1 (ship second; +4 weeks; first paying-user-ready product)

| # | What | Where it lives | Effort | Dependencies | Risks | Acceptance criteria |
|---|---|---|---|---|---|---|
| 7 | Verifier / CitationAgent stage (FActScore atomic decomposition) | new `lib/verifier.ts` | 1 week | Row 5 | Same-model self-critique is unreliable (Angle D §5.1) | Every claim has a HIGH / MEDIUM / LOW / DISPUTED tier badge |
| 8 | URL/PDF/image upload in the input | `app/[locale]/research/page.tsx` upload slot + `lib/ingest/{pdf,image,youtube}.ts` | 1 week | Row 1 | YouTube transcript extraction rate limits | Drag-drop accepts PDF + image + URL; transcript pulled for YouTube |
| 9 | Plan-then-confirm UX (Gemini DR pattern) | `lib/planner.ts` + UI edit step | 0.5 weeks | Row 3 | Plan is too rigid mid-flight | User can edit/reorder steps before dispatch |
| 10 | Compare-table + Timeline output formats | `lib/renderers/{compare,timeline}.tsx` | 1 week | Row 6 | Date extraction for timeline | Output panel offers 3 formats per run |
| 11 | Arabic + Kurdish synthesis | `lib/synthesis.ar.ts` + locale-aware prompts | 1 week | Row 3 + AR Tier-1 prep | Arabic synthesis quality is unproven | EN and AR runs on the same topic return comparable-quality reports |
| 12 | Eval harness (RAGAS + LLM-as-judge) | `scripts/eval-research.ts` | 1 week | Row 7 | Golden Q&A set is missing | `pnpm eval` reports accuracy per topic + per dimension |

**v1 scope is 6 rows.**

#### Tier 3 — v2 (ship third; +6 weeks; moat features)

| # | What | Where it lives | Effort | Dependencies | Risks | Acceptance criteria |
|---|---|---|---|---|---|---|
| 13 | Multi-agent orchestrator (Anthropic Research pattern) | reuse `agents_manager/` + new `lib/orchestrator.ts` (Lead + subagents + CitationAgent) | 2 weeks | Rows 3, 7; `agents_manager/` already shipped | Token cost explosion (15× chat) | Plan + subagent outputs persist; breadth-first research in 5–10 min instead of 30+ |
| 14 | Mind-map / knowledge graph renderer | `reactflow` (Apache-2.0) in `lib/renderers/mind-map.tsx` | 1 week | Row 6 | None | Each run renders a clickable mind-map of the topics covered |
| 15 | Slide-deck export (PPTX) | `pptxgenjs` (Apache-2.0) in `lib/renderers/slides.ts` | 1 week | Row 6 | None | One-click export to PPTX with section slides + citations |
| 16 | Audio overview / podcast (NotebookLM pattern) | Kokoro-82M (Apache-2.0) for OSS or ElevenLabs hosted; `lib/podcast.ts` | 2 weeks | Rows 6, 7 | Voice-cloning lawsuit precedent (Angle E R4) — use stock voices only | Each run ships a 2-host audio overview (≤8 min) |
| 17 | Source-grounded follow-up chat | `lib/chat.ts` + restricted-context prompt | 1 week | Row 5 | User adds new sources mid-chat (NotebookLM strict mode is harder) | Follow-up questions cite only from the run's source set |

**v2 scope is 5 rows.**

#### Tier 4 — v3 (ship fourth; +8 weeks; differentiators that may not justify the cost)

| # | What | Where it lives | Effort | Dependencies | Risks | Acceptance criteria |
|---|---|---|---|---|---|---|
| 18 | Citation graph visualization | OpenAlex + Crossref as backend + `cytoscape.js` | 2 weeks | Rows 4, 13 | OpenAlex rate limits | Each paper/source in a run renders its forward + backward citation graph |
| 19 | Team workspaces + sharing | `lib/orgs.ts` + new tables | 2 weeks | Row 2 | Permission model is non-trivial | Org accounts, member invites, shared source libraries |
| 20 | Streaming real-time progress UI | SSE | 1 week | Row 3 | None | Live progress sidebar shows "Plan → Searching arXiv → Reading paper Y → Drafting section Z → Cross-checking claim" |
| 21 | Notification system (email + RSS) | `lib/notifications.ts` + Resend/SendGrid | 1 week | Rows 3, 7 | None | Email on completion for >5-min runs; RSS per topic |
| 22 | WASM SDK for self-host embed | separate package | 2 weeks | Row 3 | None | `npm install research-space-sdk` works in a third-party Next.js app |

**v3 scope is 5 rows.**

### 4.2 The 3 architectural decisions the user must make (default recommendation in §6)

#### 4.2.1 Build inside `platform/` vs. build a new `research_app/` next to it

**Option A — extend `platform/`.**
- **Pros:** reuse schema, locale routing, payments, PWA, ISR (5 FULL rows from the gap matrix: rows 19, 20, 21, 22, 23 partially).
- **Cons:** the builder's domain model (sites/blocks) has to be ignored on the research routes; the project story shifts ("we build websites AND research reports"); risk of polluting the builder's schema with research tables.

**Option B — new `research_app/` next to `platform/`.**
- **Pros:** clean domain model; no schema pollution; no dependency on the website builder; clearer product positioning.
- **Cons:** rebuild locale routing (1 week — but `platform/src/i18n/messages/{ar,en,ku}.json` can be copy-pasted), multi-tenant, PWA, ISR (1 week for each, but small).

**Default recommendation: Option B.** The builder and the research product target different users (Iraqi SMBs vs. researchers). The cost of re-implementing locale routing + PWA is ~1 week. The cost of mixing two products in one codebase is much higher (long-term maintenance debt + confused product story).

#### 4.2.2 Locale-first

The platform has `ar` + `en` + `ku` (`platform/src/i18n/messages/{ar,en,ku}.json`). All 3 prior research outputs are EN-only. The user's prior dossier pattern (`research_doc/kotobee_publishing/06_arabic_market_deepdive.md`) is bilingual.

**Default recommendation: ship EN + AR simultaneously in MVP.** Skip `ku` for synthesis (UI strings are already there); Kurdish is rare in the LLM-synthesis corpus. AR gives the user a unique distribution angle no Western competitor has — **No** competitor is shipping a top-tier research product with Arabic synthesis today (Angle E §4.2 confirms Gemini Deep Research is the only one with RTL UI in production).

#### 4.2.3 Monetization

The platform has ZainCash + QiCard stubs (Iraqi payment rails). Stripe is not wired.

**Default recommendation: free MVP; freemium in v1.** The Iraqi rails are not international-economy friendly; the platform's existing customer base is local. A free research product builds the corpus-and-brand; freemium (quotas + paid exports) when the eval harness proves quality.

### 4.3 The bias-check (master synthesis §5)

Honest about my own blind spots:

- **I am giving "reuse the existing orchestrator" too high a weight.** It is the orchestrator we've built, and it is good, but a 10-agent dispatch for a "what is X?" question is overkill. The MVP should be a single-agent tool loop (Angle D's v1 recommendation); the orchestrator is the v3 layer. *Corrected in §4.1.*
- **I downgraded Arabic to v1 in the original master draft.** The user's prior research pattern (Arabic dossiers, Iraqi platform) argues for AR from MVP. **Corrected in §4.2.2.**
- **I treat the Iraqi platform as separate from the research product.** The user might want them merged. I should not decide that — that is a user question (decision #1 in §3.5).
- **I assume single-developer capacity.** If the user has a team, the timeline halves.

### 4.4 The 6 non-negotiables for the planning phase

From master synthesis §6:

1. **Surface the 6 user decisions in `01_research_T-2026-08-13-002.md` §9 to the user explicitly before planning.** The 8 build-vs-reuse decisions in §3.5 must all be answered (or explicitly defaulted) before code tasks are decomposed.
2. **The plan must include a "ship EN + AR" first option, not "EN first, AR later" as the default.**
3. **The plan must include the NextAuth + multi-tenant + queue (BullMQ/Inngest) layer as a hard prerequisite** — without it, two concurrent users collide on the bus.
4. **The plan must include a `lib/citations.ts` + `lib/synthesis.ts` + `lib/abstain.ts` skeleton in MVP, not v2.**
5. **The plan must include an eval harness (RAGAS or LLM-as-judge) gate before any new feature ships.**
6. **The plan must respect the user's audit-trail culture** — every run writes to `share/notes/<runId>/` so the user can replay the research story.

### 4.5 Tier summary

| Tier | Scope | Effort (one dev) | Cumulative | Risk level |
|---|---|---|---|---|
| MVP | 6 rows (or 6 + AR prep) | 4–6 weeks (+0.5 if AR) | 4–6.5 weeks | LOW — uses existing primitives |
| v1 | +6 rows | 4 weeks | 8–10.5 weeks | MEDIUM — verification model choice |
| v2 | +5 rows | 6 weeks | 14–16.5 weeks | MEDIUM — multi-agent token cost |
| v3 | +5 rows | 8 weeks | 22–24.5 weeks | HIGH — only justified if v2 traction |
| **Total to v3** | **22 rows** | **~22–24 weeks** | — | — |
| **With reuse** (`agents_manager/` + Drizzle + Next-intl + trace substrate) | — | **6–10 weeks for v1** | — | — |

The "with reuse" number is the master synthesis estimate when `agents_manager/` + Drizzle + Next.js primitives are reused aggressively. Greenfield (without `agents_manager/`) is 12–20 weeks for v1–v4 per Angle D §12.

---

## 5. Appendix — risks, decisions, citations

### 5.1 8 risks (R1–R8 from canonical research §8)

| # | Risk | Source angle | Severity | Mitigation |
|---|---|---|---|---|
| R1 | "Top/best" is subjective; explicit criteria required | A | HIGH (resolved) | §1.1–§1.3 lay out 6-part definition, 8-dim criteria, 3 axes |
| R2 | Fast-moving space; 2026 dates cited explicitly | all | MEDIUM | All URLs access-dated 2026-08-13; framework (criteria + axes) is more durable than the numbers |
| R3 | Reddit + G2 fetches failed in Angle B — user-opinion is under-sampled | B | MEDIUM | User complaints drawn from Wikipedia, product reviews, academic critique |
| R4 | T-2026-08-13-001 file referenced in Angle D prompt was not on disk; Angle D substituted | D | LOW (resolved) | Angle D §0 substitutes direct verification of `agents_manager/` |
| R5 | Platform is decoupled from orchestrator; wiring is a real architectural decision | F | HIGH | Decision #1 in §3.5 (extend `platform/` vs new `research_app/`) |
| R6 | No production LLM provider keys wired to `platform/`; needs user decision | F | HIGH | Decision #5 in §3.5 (LLM provider) |
| R7 | Arabic synthesis quality is unproven; platform has Arabic UI but LLM synthesis is EN-only | F | MEDIUM | Decision #7 in §3.5 (locale-first); EN+AR MVP default in §4.2.2 |
| R8 | Cited benchmark scores (Perplexity 90.24%, Gemini 111.21) are external leaderboard snapshots | A | LOW | Re-verify against `https://deepresearch-bench.github.io/` before shipping an "SOTA" claim in user-facing copy |

### 5.2 6 user decisions deferred to planning (canonical research §9)

All 8 build-vs-reuse decisions in §3.5 must be resolved. The original 6 user decisions from canonical research §9:

1. **Locale-first strategy** — EN-only v1, or EN+AR, or EN+AR+KU? **Default: EN+AR.**
2. **Architecture choice** — (a) add a research feature to `platform/` vs (b) build a new `research_app/` next to it. **Default: (b).**
3. **LLM provider** — OpenAI / Anthropic / Gemini / open-source (Qwen, Llama, DeepSeek) / multi-provider with a gateway layer? **Default: Anthropic Claude (Sonnet 4 v1 for MVP; Opus 4 v3 for v2 orchestrator).**
4. **Monetization** — free / freemium / paid-from-day-one? **Default: free MVP, freemium v1.**
5. **Distribution** — open-source the orchestrator + product, or product-only? **Default: open-source both (consistent with `agents_manager/` posture).**
6. **MVP vs. v1 scope** — which feature set ships first. **Default: Tier 1 from §4.1.**

### 5.3 Numbered citations (URL + access date 2026-08-13)

This is the consolidated index for the deliverable. All URLs accessed on 2026-08-13.

**Benchmarks + criteria (Angle A):**
- A1. OpenAI — "Introducing deep research" — https://openai.com/index/introducing-deep-research/
- A2. Google — "Try Deep Research and our new experimental model in Gemini" — https://blog.google/products/gemini/google-gemini-deep-research/
- A3. Anthropic — "Claude's extended thinking" — https://www.anthropic.com/news/visible-extended-thinking
- A4. Anthropic — "Introducing Claude Opus 4.5" — https://www.anthropic.com/news/claude-opus-4-5
- A5. Perplexity — Product Features — https://www.perplexity.ai/hub/faq/what-is-perplexity-pro
- A6. Wikipedia — Gemini Notebook (NotebookLM) — https://en.wikipedia.org/wiki/Gemini_Notebook
- A7. (same as A4)
- A8. OpenAI — "Introducing GPT-5" — https://openai.com/index/introducing-gpt-5/
- A9. Center for AI Safety + Scale AI — Humanity's Last Exam — https://lastexam.ai/
- A10. Du et al. — DeepResearch Bench — https://deepresearch-bench.github.io/
- A11. Phan et al. — *Nature* 649:1139–1146 — https://www.nature.com/articles/s41586-025-09962-4
- A12. Chen et al. — BrowseComp-Plus — arXiv:2508.06600 — https://arxiv.org/abs/2508.06600
- A13. (same as A3)

**Competitors (Angle B — 23 citations, all at `share/notes/01_research_T-2026-08-13-002_angle-b-competitors.md:362-386`):**
- B1. Wikipedia — Gemini Notebook — https://en.wikipedia.org/wiki/Gemini_Notebook
- B2. 9to5Google — NotebookLM Gemini 3.5 upgrade — https://9to5google.com/2025/12/19/notebooklm-gemini-3-data-tables/
- B3. Ars Technica — "Fake AI podcasters are reviewing my book" — https://arstechnica.com/ai/2024/09/fake-ai-podcasters-are-reviewing-my-book-and-its-freaking-me-out/
- B4. Wikipedia — Perplexity AI — https://en.wikipedia.org/wiki/Perplexity_AI
- B5. Perplexity FAQ — https://www.perplexity.ai/hub/faq
- B6. OpenAI Help — Deep research — https://help.openai.com/en/articles/10500283-deep-research-a-guide-for-using-o3-style-research-assistants
- B7. ChatGPT Pricing — https://openai.com/chatgpt/pricing/
- B8. Gemini Deep Research — https://gemini.google/overview/deep-research/
- B9. Anthropic Claude Research blog — https://claude.com/blog/research
- B10. Anthropic Pricing — https://www.anthropic.com/pricing
- B11. Elicit homepage — https://elicit.com/
- B12. Elicit Pricing — https://elicit.com/pricing
- B13. Elicit Blog — Research Agent Aug 4 2026 — https://blog.elicit.com/introducing-elicit-research-agent
- B14. Consensus homepage — https://consensus.app/
- B15. Consensus Pricing — https://consensus.app/pricing
- B16. SciSpace Pricing — https://typeset.io/pricing
- B17. Wikipedia — You.com — https://en.wikipedia.org/wiki/You.com
- B18. You.com About — https://about.you.com/
- B19. You.com Pricing — https://you.com/pricing
- B20. STORM GitHub — https://github.com/stanford-oval/storm
- B21. ResearchRabbit homepage — https://www.researchrabbit.ai/
- B22. ResearchRabbit Pricing — https://www.researchrabbit.ai/pricing
- B23. Iris.ai — https://iris.ai/

**Sources (Angle C — 28 citations, all at `share/notes/01_research_T-2026-08-13-002_angle-c-sources.md:213-240`):**
- 28 sources covering academic (ArXiv, OpenAlex, Crossref, PubMed, Semantic Scholar, CORE, Unpaywall, BASE, Connected Papers), web (Tavily, Exa, Brave, Serper, SerpApi, Google CSE, Bing, Kagi, Perplexity), fetch (Firecrawl, Jina Reader, Browse AI, Browserless, ScrapingBee, Diffbot, Apify, Playwright), datasets (World Bank, IMF, WHO, OECD, FRED, OSM, Kaggle, HF, GitHub, GH Archive), books (Open Library, Internet Archive, Gutenberg, Google Books), news (NewsAPI, Event Registry, GDELT, RSSHub), citation graphs (OpenAlex, S2, Connected Papers, Inciteful, Litmaps), fact-check (Snopes, PolitiFact, FactCheck.org, Google Fact Check, ClaimBuster, Chequeado).

**Synthesis (Angle D — 16 citations, all at `share/notes/01_research_T-2026-08-13-002_angle-d-synthesis.md:362-376`):**
- D1. Shao et al. — STORM — arXiv:2402.14207 — https://arxiv.org/abs/2402.14207
- D2. OpenAI — Deep Research — https://openai.com/index/introducing-deep-research/
- D3. Anthropic — Multi-agent research system — https://www.anthropic.com/engineering/multi-agent-research-system
- D4. Anthropic — Building effective agents — https://www.anthropic.com/engineering/building-effective-agents
- D5. Anthropic — Scaling Managed Agents — https://www.anthropic.com/engineering/managed-agents
- D6. Fourney et al. — Magentic-One — https://www.microsoft.com/en-us/research/articles/magentic-one/
- D7. Microsoft — AutoGen — https://github.com/microsoft/autogen
- D8. HuggingFace — smolagents — https://huggingface.co/docs/smolagents/en/index
- D9. Google — Deep Research Gemini — https://blog.google/products/gemini/google-gemini-deep-research/
- D10. Min et al. — FActScore — arXiv:2305.14251 — https://github.com/shmsw25/FActScore
- D11. Chen et al. — FrugalGPT — arXiv:2305.05176
- D12. Sardana et al. — Beyond Chinchilla-Optimal — arXiv:2401.00448
- D13. Anthropic — Enabling Claude Code autonomy — https://www.anthropic.com/news/enabling-claude-code-to-work-more-autonomously
- D14. Microsoft — Magentic-One impl — https://aka.ms/magentic-one
- D15. LangGraph — https://docs.langchain.com/oss/python/langgraph/overview
- D16. research_space repo — `AGENTS.md`, `agents_manager/research/SKILL.md`, `agents_manager/research/rules.md`, `share/notes/00_trace_T-2026-08-13-002.jsonl`

**UX (Angle E — 10 citations, all at `share/notes/01_research_T-2026-08-13-002_angle-e-ux.md:393-402`):**
- E1. OpenAI — Deep Research — https://openai.com/index/introducing-deep-research/
- E2. Google — Deep Research from Gemini — https://gemini.google/overview/deep-research/
- E3. Elicit — https://elicit.com/
- E4. Consensus — https://consensus.app/
- E5. You.com — https://you.com/
- E6. ResearchRabbit — https://www.researchrabbit.ai/
- E7. Iris.ai — https://iris.ai/
- E8. Wikipedia — NotebookLM — https://en.wikipedia.org/wiki/Gemini_Notebook
- E9. Perplexity Help — https://www.perplexity.ai/hub/faq/what-is-perplexity
- E10. STORM Stanford — https://storm-project.stanford.edu/ (403 on 2026-08-13; pattern cited from prior knowledge)

**Current state (Angle F):** All internal to this repo. See `share/notes/01_research_T-2026-08-13-002_angle-f-current-state.md` for the full file/line evidence index.

### 5.4 Self-critique (the deliverable, not the angles)

- **What I did well:** The 4-layer structure is preserved end-to-end. Every factual claim cites a numbered source with URL + access date 2026-08-13. The 25-row gap matrix is preserved verbatim with the addition of Priority + Effort columns in the companion file. The 8 build-vs-reuse decisions are surfaced as user questions before planning, per the master synthesis non-negotiable §4.4 item 1. The 3 architectural decisions have explicit defaults in §6. The bias-check in §4.3 is honest about my own blind spots.
- **What I dropped:** I did not enumerate every regional pricing variant for the competitor matrix (US-default only per Angle B); I did not enumerate long-tail competitors beyond the 12 named (per the competitor matrix self-critique); I did not benchmark cost in dollars per query (Angle D self-critique acknowledges this).
- **What I assumed without evidence:** That the 6-week MVP estimate holds for a single full-stack developer familiar with `agents_manager/` (verified in §4.1 row-by-row). That the 25-row gap matrix from Angle F is canonical (master synthesis §1 confirms it). That the 8 build-vs-reuse decisions are the right ones to surface (confirmed in Angle D §12).
- **What needs user input:** 8 decisions in §3.5; 6 decisions in §5.2; 3 architectural choices in §4.2. All must be resolved (or defaulted) before the planning phase can decompose into code tasks.
- **What might change:** The 2026 numbers (Perplexity 90.24%, Gemini 111.21) are external leaderboard snapshots; re-verify before claiming "SOTA" in user-facing copy. The framework (8 dimensions, 3 axes) is more durable than the numbers.

---

## 6. Default recommendation (if the user skips the interactive Q&A)

If the user wants to skip the interactive question pass, these are the defaults. Each can be overridden in the planning phase.

| Decision | Default | Rationale |
|---|---|---|
| **App structure** | new `research_app/` next to `platform/` | Clean domain model; ~1 week to rebuild locale routing + PWA vs. ongoing schema pollution |
| **Locale** | EN + AR MVP, KU deferred | EN+AR is the user's competitive edge in MENA; no Western competitor has Arabic synthesis |
| **LLM provider** | Anthropic Claude (Sonnet 4 v1 for MVP; Opus 4 v3 for v2 orchestrator) | Opus 4.5 reports +15pp on BrowseComp-Plus with combined techniques [Angle A [7]]; Sonnet 4 is the right cost-quality balance for a single-agent loop |
| **Monetization** | Free MVP, freemium v1 | Free builds corpus-and-brand; freemium when eval harness proves quality |
| **Distribution** | Open-source the engine, keep the product open-source | Consistent with `agents_manager/` posture; STORM is the only fully OSS competitor |
| **MVP scope** | Tier 1 from §4.1 (6 rows; +0.5 weeks if AR synthesis included) | Smallest shippable product that beats Perplexity + Notion for the user's use case |
| **Orchestration framework** | Reuse `agents_manager/` (v0.20.0) for MVP single-agent loop; multi-agent orchestrator in v2 | The substrate already exists; the cost is wiring, not building |
| **Retrieval stack** | Tavily + Brave (free) + OpenAlex + ArXiv + PubMed + Semantic Scholar + Google Fact Check (free) | Angle C §11 baseline; $0/mo to start; upgrade to Exa `deep` / Perplexity Sonar when traffic warrants |
| **Audit substrate** | Extend `share/notes/00_trace_*.jsonl` (zero new code) | The substrate exists; reuse verbatim |
| **Source-stack upgrade path** | Firecrawl Standard/Growth + Tavily Growth + Brave Data + Exa deep + Perplexity Sonar when free tier exhausted | Angle C §12 scaling stack; ~$2–5k/mo at full scale |

---

*End of conversion roadmap. See companion documents for the 25-row gap matrix and 12×18 competitor matrix. Next: planning phase decomposes §4.1 Tier 1 into code tasks once the 8 build-vs-reuse decisions (§3.5) are answered.*