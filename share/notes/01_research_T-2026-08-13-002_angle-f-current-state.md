# Angle F — Current state of research_space (2026-08-13)

**Date:** 2026-08-13
**Author:** am-research (dispatched by master for T-2026-08-13-002, angle F)
**Access date for all URLs/files:** 2026-08-13
**Task ref:** `tasks/T-2026-08-13-002.md`; user task verbatim: *"conduct a research on how to convert this project in to top/best research project that take from user ( the topic and conduct a research on it )"*

---

## 1. Methodology

Ground-truth audit, not a recommendation doc. Every claim names a file and line number. Where a folder could not be read or does not exist, that is stated. The audit covers nine surfaces: the Next.js app (`platform/`), the in-flight research outputs (`research/`), the legacy research dossiers (`research_doc/`), the multi-agent orchestrator (`agents_manager/`), the bus (`share/notes/`, `share/handoffs/`, `share/reports/`, `share/templates/`), shipped tooling (`bin/`, `scripts/`), docs (`docs/`), the OpenCode integration surface (`opencode.jsonc`, `AGENTS.md`), and any reusable templates/examples.

Two findings dominated the read and are surfaced up front:

- **Finding A — `platform/` is not a research product today.** It is a fully working Iraqi drag-and-drop website builder (Wix-for-Iraq): 5 locale templates, GrapesJS editor, Drizzle ORM on Postgres, ZainCash + QiCard payment stubs, multi-locale (ar/en/ku) with RTL. The schema has zero research primitives — no topics table, no sources table, no chunks/embeddings table, no LLM API call. Angle A's "give me a topic" UI does not exist; it would have to be built greenfield.
- **Finding B — The research engine is the *orchestrator* + the existing research outputs, not the platform.** `agents_manager/` is a sophisticated 10-specialist (research/planning/coder/review/design/assets + investigate/ship/health) multi-agent pipeline. The 3 completed research projects under `research/` (cloudflare, ai-tools, notebooklm) and 8+ dossiers under `research_doc/` are exactly the deliverable format Angle A is asking for. The gap is a **front door** (topic input + tenant auth + queueing) and a **user-facing renderer** (HTML report, citations table, podcast, mind-map) wired to the existing pipeline.

These two findings shape the gap matrix in §5.

---

## 2. Folder-by-folder inventory

### 2.1 `platform/` — Next.js app (NOT a research product)

**Path:** `E:\react_projects\research_space\platform`; version `0.1.0` (`platform/package.json:3`).

**Stack (verified):** Next.js `^15.1.0` + React 19 + next-intl `^3.26.0` + Serwist PWA (`platform/next.config.ts:29-33`); Tailwind `^4.0.0` + Radix UI + lucide-react; Drizzle ORM `^0.38.0` + `postgres` driver (`platform/package.json:22-23`), dialect `postgresql` (`platform/drizzle.config.ts:6`), Neon-style URL (`platform/.env.example:2`); GrapesJS `^0.22.5` (`platform/package.json:21`) wrapped in `Editor`/`EditorCanvas` (`platform/src/components/editor/editor.tsx:1-107`); 3 locales — `ar`, `en`, `ku` (`platform/src/i18n/messages/{ar,en,ku}.json`), RTL via `RtlProvider` and `dir={isRtl ? 'rtl' : 'ltr'}` (`platform/src/app/[locale]/page.tsx:26`); Cloudflare image allowlist `*.platform.iq` + `*.r2.cloudflarestorage.com` + `*.s3.amazonaws.com` (`platform/next.config.ts:11-26`); `CLOUDFLARE_API_TOKEN/ZONE_ID/DOMAIN/CNAME_TARGET` env vars (`platform/.env.example:5-8`).

**Product surface — what it actually does:**
- `/[locale]` (`platform/src/app/[locale]/page.tsx:21-122`): hero "Create Your Website in Minutes" in Arabic/English; features grid "Iraqi Templates / Drag & Drop / Instant Publish". Footer copy: "© 2026 Iraqi Platform" (`page.tsx:117`).
- `/[locale]/templates` (`platform/src/app/[locale]/templates/page.tsx:24-114`): grid of 5 templates from `TEMPLATES` registry.
- `/[locale]/editor/[siteId]` (`platform/src/app/[locale]/editor/[siteId]/page.tsx:13`): GrapesJS editor bound to a `siteId`.
- `/[locale]/site/[slug]` (`platform/src/app/[locale]/site/[slug]/page.tsx:62-77`): renders the published site via `<PageRenderer blocks={blocks} />`, ISR every 60s.
- `/[locale]/checkout` + `PricingCards.tsx` + `CheckoutFlow.tsx` (`platform/src/components/checkout/`).

**Schema (`platform/src/lib/db/schema.ts:1-85`):** 5 tables — `users` (line 13), `sites` (line 27), `blocks` (line 47), `transactions` (line 58, gateway enum `zaincash|qicard`), `submissions` (line 78). All five are website-builder primitives; none hold research state.

**API (`platform/src/app/api/`):** `GET/POST /api/sites` (`api/sites/route.ts:1-58`) — body requires `userId/slug/templateSlug/title`; `PATCH/GET /api/sites/[siteId]`; `POST /api/sites/[siteId]/publish`; `POST /api/sites/domain`; `POST /api/payments/{zaincash,qicard}` (stubbed per `platform/src/lib/payments/stub.ts:80-81` — "The interface shape mirrors the real Zain Cash v2 API exactly"); `POST /api/submissions`.

**Templates (5 vertical SaaS for Iraqi SMBs):** `platform/src/lib/templates/{clinic,retail,restaurant,real-estate,professional}.ts` (each ~90–110 lines; only social-handle strings, no LLM). Index at `platform/src/lib/templates/index.ts`.

**PWA + SEO:** `manifest.ts`, `sitemap.ts`, `robots.ts` at `src/app/`; service worker `public/sw.{ts,js}` via Serwist.

**Critical absences for a research product:**
1. **No topic/research/sources/embeddings tables.** The 5-table schema is exclusively about websites and Iraqi payments.
2. **No LLM integration anywhere.** `grep` for `openai|anthropic|claude|gpt-|gemini|llm|tavily|exa|serper|brave|search|arxiv|pubmed|elicit|consensus` in `platform/src/` returned only false positives: `facebook`, `instagram`, `linkedIn` in template social URLs, and the "Zain Cash v2 API" comment in payments/stub.ts. **Zero LLM-related imports.**
3. **No topic input UI.** The only inputs are `userId/slug/templateSlug/title` for a site.
4. **No auth middleware.** `src/middleware.ts:1-9` is a 9-line `next-intl/middleware` that only handles locale routing.
5. **No citations/renderers.** Output is HTML blocks (hero/footer/contact-form/whatsapp-button/google-maps/image-gallery/text-content/contact-info/about-section in `src/components/blocks/`).

### 2.2 `research/` — recent research outputs (high quality)

**Path:** `E:\react_projects\research_space\research`

| Project folder | Format | Status |
|---|---|---|
| `research/cloudflare-agent-internet-2026-08-12/` | 5-stream parallel research, 8 am-research sub-agents, ~78K words, 2 competitor matrices; `00_MASTER_SYNTHESIS.md` + `PROGRESS.md` + `research/<stream>/{PROGRESS.md,FINDINGS.md}` + `ideas/*.md` + raw `source/00_video_transcript.md` | Done |
| `research/ai-tools-assessment-2026-08-13/` | 6 research files (operations playbook / prompt pack / competitors / opensource / saas conversion / llm agent guide) + `00_MASTER_SYNTHESIS.md` + `PROGRESS.md` + `ideas/` | Done |
| `research/notebooklm-research/` | 4 parallel agents (`01_notebooklm` / `02_competitors` / `03_opensource` / `04_build_guide`) each with `FINDINGS.md` + `PROGRESS.md`, plus orchestrator `README.md` (178 lines) + `PROGRESS.md` | Done |
| `research/00_README_T-2026-08-13-002.md` | Index for THIS task's research + roadmap/matrix deliverables | Scaffold only |

**Format pattern (every project has):** top-level `README.md`/`00_README.md` (executive summary); `00_MASTER_SYNTHESIS.md` or per-stream `FINDINGS.md` (the actual report); `PROGRESS.md` per stream (audit trail of sources hit + confidence ratings); `research/<topic>/FINDINGS.md` + `PROGRESS.md` (per-sub-agent outputs); `source/` (raw source material); `ideas/` (tangential candidates).

The `notebooklm-research` output is the strongest reference for the target product's format: `research/notebooklm-research/README.md:22-30` gives the 10-second answer in 4 bullets, then sections 2–9 cover operating model / input support / output support / competitors / open source / build guide / caveats / OSS-first pass. Every claim cites a URL; every agent has a `PROGRESS.md` with confidence ratings.

**Critical observations:** all 3 outputs are **report-first Markdown** — zero interactive HTML renderers, podcasts, mind-maps, or slide decks, even though the methodology mentions those modalities. The cloudflare-agent-internet output has a 358-line master synthesis with a critical fact-check (`research/cloudflare-agent-internet-2026-08-12/00_MASTER_SYNTHESIS.md:14-37`) rebutting 8 source-video claims — exactly the self-critique pattern Angle D calls for. The `research/notebooklm-research/04_build_guide/FINDINGS.md:23-50` is a **spec** for building a research product (reference architecture: offline indexing + online query pipelines).

### 2.3 `research_doc/` — legacy research dossiers (8 projects, pre-agent format)

| Subfolder | Files | Topic | Format |
|---|---|---|---|
| `3d-printer-research/` | 12 | 3D printers for Iraqi market, types/prices/materials/money-making/IRAQ-specific | Numbered chapters `00_summary.md` → `05_materials_properties.md` + `sell-products/` |
| `animated_website_deepseek_flash/` | 7 (+ `sub_agents/`) | Animated websites — 12 kinds, resources, templates, build guide, best-practices | `00_MASTER_INDEX.md` + per-angle sub-agent outputs |
| `animated_website_minimax_2.7/` | 6 | Animated websites (MiniMax-2.7) | `README.md` + numbered chapters |
| `animated_website_minimax_3/` | 60+ across `01_kinds/`, `02_resources/`, `03_build_guides/`, `04_do_dont/`, `05_conversion_playbook/`, `06_motion_grammar/`, `07_license_posture/`, `08_corrections_vs_source/`, `99_appendix/` | Animated websites (MiniMax-3) — deepest dossier; modular sub-folders |
| `book-to-video/` | 1 file | Book→video pipeline (TTS, image gen, ffmpeg) | 365-line single-file spec |
| `book_selling_platforms/` | 8 | Book-selling AR/EN with Syrian-nationality eligibility | `00_README.md` + 6 chapters + `99_appendix_links.md` |
| `iraq-website-builders/` | 2 | Iraqi website-building market — 178-line competitor database + strategic analysis | Numbered chapters |
| `kotobee_publishing/` | 8 | Kotobee platform research (T-2026-08-12-001) | `00_README.md` + 6 chapters + `99_appendix_links.md` |

**Common 8-file pattern (newer dossiers):** `00_README.md` (index + verdict) → `01_*_factsheet.md` → `02_*_analysis.md` → `03_*_start_path.md` → `04_*_resources_master_list.md` → `05_*_llm_agent_guide.md` → `06_*_deepdive.md` → `99_appendix_links.md`.

**What this tells us about the user's research style:** heavy dossier mode (50–200 KB Markdown, hundreds of cited URLs); multi-chapter structure with named reading order; language flexibility (Arabic content interleaved where the topic calls for it — `kotobee_publishing/06_arabic_market_deepdive.md` is in Arabic; `book_selling_platforms/03_arabic_channels.md` has bilingual templates); honesty about uncertainty (🔶 "verify at signup" checkboxes pervasive — `research_doc/book_selling_platforms/00_README.md:9-15`); specialist-driven parallel research (`animated_website_deepseek_flash/sub_agents/`, `research/cloudflare-agent-internet-2026-08-12/research/05_recursive_language_models/HARNESS_LANDSCAPE_MATRIX.md` — 127-row matrix of agent harnesses).

### 2.4 `agents_manager/` — the orchestrator

**Path:** `E:\react_projects\research_space\agents_manager`; version `0.20.0` (`agents_manager/SKILL.md:7`).

**10 OpenCode agents** (`opencode.jsonc:5-6, 51-129`):
- `master` — orchestrate; never code; gates phases
- 4 core specialists — `am-research`, `am-planning`, `am-coder`, `am-review`
- 2 v0.9.0+ specialists — `am-design` (12 modes, NEVER writes `src/**`), `am-assets` (4-branch runtime decision tree at Phase 3a)
- 3 v0.18.0+ specialists — `am-investigate` (debug; no fixes without root cause), `am-ship` (release; idempotent), `am-health` (dashboard; report-only, never fixes)

**Bus (`agents_manager/SKILL.md:107-121`):**
```
share/{notes,reports,handoffs,messages,design,templates}/  ← inter-agent artifacts
tasks/                                                   ← canonical task tracker
```

**Pipeline (`agents_manager/SKILL.md:184-192`):** Phase 0 Ingest → Phase 1 Research → Phase 2 Planning → Phase 3 Build → Phase 4 Review → (Phase 5 release, opt-in). v0.9.0+ adds Phase 3a Assets. v0.16.0+ adds adaptive orchestration (re-dispatch / parallelize / go backward). v0.20.0+ adds mandatory **context-hub (chub)** protocol — every specialist must `chub get <id>` before writing code against any external library.

**MCPs wired (`opencode.jsonc:29-35`):** codebase-memory (am-research / am-review / am-investigate / am-coder), github (am-ship), testsprite (am-coder run, am-review cite — optional).

**Gap between current `agents_manager/` and "topic-input research product":**
- The orchestrator is **task-oriented** (input = user task string from chat). No UI; bus is filesystem-only.
- Every task is driven by a human master chat dispatching specialists. No self-service "I typed a topic → agents autonomously research and produce a report" flow.
- The 10 agents are specialists, not a single research agent. Angle A's UX probably wants a single product surface that, behind the scenes, dispatches the appropriate specialist(s).
- **Auth + tenant isolation** is absent. The bus is one flat filesystem; multi-tenant research (concurrent users / topics) requires a queue + namespace layer that does not exist.

### 2.5 `share/` — the bus

**Top level (verified via `Get-ChildItem share/`):** `design/`, `handoffs/`, `messages/`, `notes/`, `reports/`, `templates/`.

**`share/notes/` recent contents (top of stack, descending):** `99_progress_T-2026-08-13-002.md` (this task's ledger, 16 lines, Phase 0 done); `99_progress_T-2026-08-12-002.md`, `-001.md`, plus `-07-29-001.md`; `99_decisions.md` (111 lines — append-only arch decisions; the 2026-07-05 entries show 5 protocol changes for adaptive orchestration + design preflight); `04_warns_register_T-*.md` (one per past task); `03_coder_summary_T-2026-08-12-002_chunk-{3A,3B,3C,3D}.md` (4 chunks — largest job) and `-001_chunk-{3A,3B,3C}.md`; `02_plan_{phases,high}_T-*.md` (phased + high-level plans) and per-task `01_master_synthesis_T-*.md` + `01_research_T-*.md` + angle files.

**Conventions (deduced from reading):**
- 4 numbering tiers: `00_*` (capture / scaffold) → `01_*` (research) → `02_*` (plan) → `03_*` (coder) → `04_*` (review) → `99_*` (decision/progress) (`share/notes/README.md`).
- Per-task IDs: `T-YYYY-MM-DD-NNN` (`tasks/T-2026-08-13-002.md:1`).
- Per-chunk coder summaries: `_chunk-{3A,3B,3C,3D}.md` (4 chunks was the max in T-2026-08-12-002).
- `## Metrics` block at end of every research file (5 integer counts: findings, risks_HIGH/MEDIUM/LOW, clarifying_Qs) — see `agents_manager/research/SKILL.md:341-359`.

**`share/handoffs/` contents (verified via glob):** `00_user_task.md` (the original T-2026-07-01-001 task — the controller's own multi-dialect installer); `00_user_task_T-2026-07-01-001.md` through `00_user_task_T-2026-08-13-002.md` (per-task captures); `auto-answers_T-2026-08-12-001.md`; `README.md` template.

**Topics the user has researched** (from filenames + task IDs): T-2026-07-01-001 (controller installer, Python UX); T-2026-07-03-{001,002,003}, T-2026-07-04-{001,002,003,004,009}, T-2026-07-29-001 (taxonomy + resources + build playbook); T-2026-07-13-001 (Iraqi website-builders market — `research_doc/iraq-website-builders/01_competitor_database.md:4`); T-2026-08-12-001 (Kotobee Publishing for Arabic books — `research_doc/kotobee_publishing/00_README.md:1`); T-2026-08-12-002 (Book-selling platforms AR/EN with Syrian-nationality eligibility — `research_doc/book_selling_platforms/00_README.md:3`; `share/notes/01_research_T-2026-08-12-002.md:1`); T-2026-08-13-001 (Cloudflare Agent Internet: Greg Isenberg + Zaher.AI + Recursive Language Models — `research/cloudflare-agent-internet-2026-08-12/00_MASTER_SYNTHESIS.md:1-12`); T-2026-08-13-002 (this task).

**Recent traces of full research outputs:** yes — the 3 `research/` projects are fully fleshed-out multi-stream outputs (~78K words for cloudflare, comprehensive `00_MASTER_SYNTHESIS.md` for ai-tools, 178-line README + 4 sub-agent FINDINGS for notebooklm). They are also surfaced into `share/notes/01_research_T-*.md` + `01_master_synthesis_T-*.md`.

### 2.6 `docs/`, `bin/`, `scripts/`

**`docs/`** — directory exists (cross-referenced by AGENTS.md as `docs/INSTALL.md`, `docs/TRACE.md`); not deeply audited in this dispatch.

**`bin/`** — full multi-dialect controller installer (`AGENTS.md:54-65`): Bash + PowerShell + Python + `.cmd` shims (`bin/agents-manager.{sh,cmd,ps1,py}` + `bin/install.{sh,cmd,ps1,py}` + `bin/update.{sh,ps1}` + `bin/check.{sh,ps1}` + `bin/release-zip.{sh,cmd,ps1}`); standalone installer (`bin/standalone-installer/install.{py,sh,cmd}` + `README.md`); `bin/skills-manifest.json` + `bin/README.md` + `bin/lint-design.sh`.

**`scripts/`** — 6 files: `append-trace.py` (JSONL trace), `backfill-research-metrics.sh` (metrics footer backfill), `validate-frontmatter.py`, `validate-memory.sh`, `validate-trace.sh`, plus `superpowers/` skill bundles.

**Critical:** no scripts/tools exist that turn a research output (`research/*/00_MASTER_SYNTHESIS.md`) into a user-facing artifact (HTML report / podcast / mind-map / slide deck). That gap is in §5.

---

## 3. OpenCode integration status

**`opencode.jsonc`** (`E:\react_projects\research_space\opencode.jsonc:1-130`) defines the 10 agents; line 47 confirms the v0.5.0 soft-walls model ("all 10 agents have full permission: allow"). Walls are SKILL.md prose + inline prompts (`opencode.jsonc:55, 62, 69, 77, 84, 91, 99, 108, 117, 126`).

**`platform/` does NOT integrate with OpenCode.** No `opencode.jsonc` inside `platform/`, no `task()` call in any API route, no reference to am-research / am-coder / am-design. The platform is a standalone Next.js product that calls its own Postgres directly.

**`agents_manager/` IS the OpenCode integration** — `opencode.jsonc` lives at the workspace root and all 10 specialists are defined there.

**Implication:** the platform is decoupled from the orchestrator. Wiring them requires either (a) adding a "topic" feature to `platform/` that dispatches into `agents_manager/` (likely via an HTTP bridge or worker process), or (b) building a new user-facing web surface (call it `research_app/`) that sits next to `platform/` and IS the research product. Angle F does not choose — that is a planning decision.

---

## 4. Existing patterns we can reuse

| Pattern | Where it lives | Reuse as |
|---|---|---|
| Multi-stream parallel research with per-stream PROGRESS.md | `research/notebooklm-research/{01..04}/*/FINDINGS.md + PROGRESS.md` | Per-angle research dispatch format |
| Master synthesis with critical fact-check | `research/cloudflare-agent-internet-2026-08-12/00_MASTER_SYNTHESIS.md:14-37` | Final-report format (catches hallucinated source claims) |
| 8-file dossier layout | `research_doc/kotobee_publishing/00_README.md` (00_README → 01_factsheet → 02_analysis → 03_start_path → 04_resources_master_list → 05_llm_agent_guide → 06_deepdive → 99_appendix_links) | Generic research-dossier template |
| URL register with access dates | `research_doc/book_selling_platforms/99_appendix_links.md` + `share/notes/01_research_T-2026-08-12-002.md` | Citation hygiene pattern |
| Verify-at-signup 🔶 checkboxes | `research_doc/book_selling_platforms/00_README.md:9-15` | Uncertainty-marking convention |
| Pipeline bus with 4 tiers | `share/notes/README.md` + `agents_manager/SKILL.md:107-121` | Frontend ↔ orchestrator protocol |
| Adaptive orchestration | `agents_manager/SKILL.md:141-187` + `opencode.jsonc:55, 62, 69, 77, 84, 91, 99, 108, 117, 126` | Already injected into every agent prompt — free |
| MCP tool surface (codebase-memory / testsprite / github) | `opencode.jsonc:29-35` | Already enabled at host level; usable by the research product if added to the platform's tool set |
| Multi-locale (ar/en/ku) with RTL | `platform/src/i18n/messages/{ar,en,ku}.json` + `RtlProvider` | Reusable; Arabic-first is a real user strength given MENA-targeted prior research |
| Drizzle ORM + Postgres schema | `platform/src/lib/db/{index.ts,schema.ts}` | Extend the same Postgres to add research tables (`topics`, `sources`, `runs`, `artifacts`) rather than spinning up a second DB |
| Next-intl + locale routing | `platform/src/middleware.ts:1-9` + `platform/src/i18n/routing.ts` | Reusable; same `[locale]` segment works for a research-app variant |
| ISR for published sites | `platform/src/app/[locale]/site/[slug]/page.tsx:79` (`export const revalidate = 60`) | Same ISR pattern applies to `/research/[runId]/page.tsx` |

---

## 5. GAP MATRIX

For every feature a top research product (Angle A) needs, scored NONE / PARTIAL / FULL with file/folder evidence and the recommended next step.

| # | Feature (Angle A → E lens) | Status | Evidence | Recommended next step |
|---|---|---|---|---|
| 1 | Topic input UI ("give me a topic" box on a web page) | NONE | `platform/src/app/[locale]/page.tsx:54-72` is a static "Start Free" hero linking to `/templates`; no input box anywhere | Add `platform/src/app/[locale]/research/page.tsx` with a topic `<textarea>` + submit → new `/api/topics` |
| 2 | Auth + multi-tenant topic namespace | NONE | `platform/src/middleware.ts:1-9` is locale-only; no NextAuth/Clerk; `platform/src/lib/db/schema.ts:13-24` has `users` but no password hash or session | Add NextAuth (Auth.js v5); topic/run tables keyed by `userId`; existing `users` table reusable with `passwordHash` + `emailVerified` |
| 3 | Research orchestration engine | PARTIAL | `agents_manager/` (10 agents, v0.20.0) + `research/notebooklm-research/04_build_guide/FINDINGS.md:23-50`. But no web API exposes it; orchestrator is filesystem-driven | Wrap `am-research` + `am-planning` in a worker that a topic POST triggers; persist run state in a new `runs` table |
| 4 | Multi-source ingestion (web / arXiv / PubMed / news / YouTube / docs) | PARTIAL | Prior research projects did this manually (`share/notes/01_research_T-2026-08-12-002.md` cites tavily/exa URLs; `research/notebooklm-research/01_notebooklm/FINDINGS.md` lists every input format). No production connector code — no `lib/sources/tavily.ts`, no `lib/sources/arxiv.ts` | Build `lib/sources/{web,arxiv,pubmed,youtube}.ts` (Angle C will specify); pluggable behind a `Source` interface returning `{title, url, snippet, hash}` |
| 5 | Citation-aware generation | PARTIAL | `research/notebooklm-research/01_notebooklm/FINDINGS.md:84-91` describes the NotebookLM citation discipline; cloudflare synthesis demonstrates the technique (cited URLs on every claim). No first-party code generates `[S1]`-style numbered citations or links them to chunks | New `lib/citations.ts`: takes `[chunk]` + answer text → returns `[answer, citationMap]` with inline `[S1]…[Sn]` markers + confidence-gated abstention (per `research/notebooklm-research/04_build_guide/FINDINGS.md` §7.5 pitfall #3) |
| 6 | Synthesis + self-critique loop | PARTIAL | `research/cloudflare-agent-internet-2026-08-12/00_MASTER_SYNTHESIS.md:14-37` is a hand-rolled 8-row fact-check; `research/notebooklm-research/04_build_guide/FINDINGS.md:128-135` lists self-critique as a top pitfall. No first-party code runs the loop | New `lib/synthesis.ts`: `runSynthesis(plan, sources) → {draft, critique, refined, contradictions}`. Use am-coder's `chub` cache to pull RAGAS / DSPy / Reflexion literature |
| 7 | Output rendering — long-form report | PARTIAL | The `research/` outputs ARE long-form reports — but as Markdown, not interactive HTML | New `app/[locale]/research/[runId]/page.tsx` that renders the synthesis Markdown with `PageRenderer`-style block mapping (tables, code blocks, citations, callouts); reuse `platform/src/lib/renderer/page-renderer.tsx` |
| 8 | Output rendering — mind-map | NONE | No mind-map code anywhere; `research/notebooklm-research/01_notebooklm/FINDINGS.md:98` lists Mind Maps as a NotebookLM feature but nothing ships | Add `lib/renderers/mind-map.tsx` using `reactflow` (Apache-2.0) or `markmap` (MIT) |
| 9 | Output rendering — podcast / audio overview | NONE | `resources/animated_website_raw_research.txt:18` references VoiceStudio + Kokoro-82M + Chatterbox as TTS candidates (notes only, no code); `research/notebooklm-research/04_build_guide/FINDINGS.md:10-12` describes the 2-stage pipeline | New `lib/podcast.ts`: synthesis → dialogue script (disfluency pass) → per-speaker TTS → stitch. Kokoro-82M (Apache-2.0) for OSS, ElevenLabs for hosted |
| 10 | Output rendering — slide deck | NONE | No slide-deck code anywhere | `lib/renderers/slides.ts` → PptxGenJS (Apache-2.0) for PPTX export, or Marp for Markdown→slides |
| 11 | Output rendering — citations table | NONE | URLs cited inline in Markdown but no first-party table view | Trivial: parse citation metadata into a `<table>` block (URL, title, accessed, confidence) |
| 12 | Multi-language output (ar/en/ku) | PARTIAL | Platform has `ar/en/ku` locales; research bus has Arabic dossiers (`research_doc/kotobee_publishing/06_arabic_market_deepdive.md`); the syntheses are EN-only | Add locale-aware synthesis prompts; `i18n/messages/{ar,en,ku}.json` gain a `research.*` namespace. Arabic is the strongest user signal (MENA-targeted prior research) |
| 13 | Image / chart generation | NONE | No image-gen code; `resources/animated_website_raw_research.txt` references Flux/SDXL only in book-to-video context, not research | Optional: `lib/illustrate.ts` wrapping an image model for hero art + per-section diagrams. Lowest-priority for a research product |
| 14 | Tenant billing / quotas | PARTIAL | `platform/src/lib/db/schema.ts:58-75` has `transactions` table (Iraqi payments: ZainCash / QiCard) — purely for the website builder. No usage metering for research | Add a `research_runs` row with `tokens_in/out, duration_ms, sources_count, status` + a quota table per plan. Reuse the existing payments layer if the product becomes paid |
| 15 | Observability + evaluation | NONE | No RAGAS / Langfuse / eval harness code. `research/notebooklm-research/04_build_guide/FINDINGS.md:115` lists them as recommended stack items | Add `lib/eval/{ragas.ts, langfuse.ts}` + `scripts/eval-research.ts` runner |
| 16 | Source-grounded abstention ("I don't know") | NONE | Pattern described in research notes (NotebookLM "can't answer this question" — `research/notebooklm-research/01_notebooklm/FINDINGS.md:27-28`) but not implemented | `lib/abstain.ts` — confidence gate; if `citationCoverage < 0.5` or `contradictionCount > threshold`, return `ABSTAIN` + clarifying question |
| 17 | Discovery + search across past runs | NONE | The `share/notes/` bus is filesystem; no UI surfaces past research | `lib/search.ts` — full-text + vector search across `runs`; opens a NotebookLM-like "past notebooks" view |
| 18 | Sharing / export | PARTIAL | `platform/src/app/[locale]/site/[slug]/page.tsx:22-60` has OG/Twitter meta + canonical + indexable-by-default. Reusable | Same meta layer on `/research/[runId]`; export to Markdown / PDF / DOCX |
| 19 | PWA / offline | FULL | `platform/next.config.ts:29-33` + `public/sw.{ts,js}` via Serwist (`disable: process.env.NODE_ENV === "development"`) | Reuse; nothing to add |
| 20 | Multi-locale routing | FULL | `platform/src/middleware.ts:1-9` + `src/i18n/routing.ts` + `src/i18n/request.ts` | Reuse; nothing to add |
| 21 | Hosting infra (Cloudflare R2, custom domains, publish flow) | FULL | `platform/next.config.ts:11-26`; `api/sites/[siteId]/publish/route.ts`; `api/sites/domain/route.ts` | Reuse for `/research/[runId]/publish` if shared links are needed |
| 22 | Specialist pipeline (research → plan → review) | FULL | `agents_manager/` (10 agents, 4 tiers), `share/notes/01_research_T-2026-08-13-001_angle-{taxonomy,resources,build-playbook}.md` shows it running in anger | Reuse end-to-end; only the API surface to trigger it from the web is missing |
| 23 | Templates / scaffolds | PARTIAL | `share/templates/cinematic-landing-fixes.md` exists; `agents_manager/SKILL.md:124-138` documents a template system at `templates/<name>/` — but the **template folder itself does not exist at the workspace root** (verified: `Test-Path templates` returned `False`) | Either ship a `templates/research-dossier/` template OR migrate `research_doc/` into a versioned template |
| 24 | `cinematic-landing-kit-demo/` | NONE | `Test-Path cinematic-landing-kit-demo` returned `False`. Mentioned in `agents_manager/SKILL.md:133` but missing | Out of scope for the conversion; surface to master as a separate cleanup task |
| 25 | `examples/` | NONE | `Test-Path examples` returned `False` | Out of scope; ship `examples/research-output-sample/` after the product ships |

**Counts: FULL 5 / PARTIAL 9 / NONE 11.**

---

## 6. Implicit strengths (what makes this project different from a fresh build)

1. **A working 10-agent orchestrator is already shipped.** v0.20.0 with adaptive mode + chub + design preflight + investigate/ship/health. Most "AI research product" projects in 2026 don't have a pipeline at all — they ship a single agent.
2. **Three fully-fleshed-out reference research outputs** in `research/` (cloudflare / ai-tools / notebooklm) — each demonstrates the format Angle A is asking for. These are the spec the product must match.
3. **Eight legacy dossiers in `research_doc/`** that prove the user knows how to do research at scale and in Arabic — a real distribution advantage in MENA markets where Perplexity and NotebookLM are weak.
4. **Iraqi locale (`ar` + `ku`) shipping today** — `platform/src/i18n/messages/ku.json` is a verified artifact (Sorani Kurdish). Notion, Perplexity, ChatGPT all ship English-first with bolted-on Arabic. The user has been Kurdish/Arabic-first since the start.
5. **Iraqi payment rails already integrated** (ZainCash + QiCard stubs at `platform/src/lib/payments/stub.ts:80-81`) — a MENA-monetization moat no Western competitor has.
6. **A brutally honest self-critique culture** — `research/cloudflare-agent-internet-2026-08-12/00_MASTER_SYNTHESIS.md:14-37` debunks 8 source-video claims in a 23-row table. This is rare in the space and matches Angle D's "self-critique loops".
7. **Audit trail + WARN register** (`share/notes/04_warns_register_*.md` + `99_decisions.md`) — every prior task has a `Loop history` block in `tasks/<id>.md`. A research product can surface this audit trail to the user ("here's how we got this answer").
8. **Memory + sweep** (`agents_manager/memory/`) — agents already have a 3-scope memory system (`global/`, `projects/<slug>/`, `notes/semantic/`). Per-user research memory is a small extension.
9. **A real, mature multi-dialect installer** (`bin/agents-manager.{sh,cmd,ps1,py}`) — if the conversion ships as a downstream OpenCode product, the install story is already solved.

---

## 7. Implicit weaknesses (what's missing)

1. **No front door.** The orchestrator has no UI; `platform/` has UI but is the wrong product. Adding a topic input requires both a UI surface AND wiring it to the orchestrator.
2. **No multi-tenant research state.** The bus is one flat filesystem. Two users running concurrent research will collide on `share/notes/01_research_T-*.md`. A `runs` table keyed by `userId` + `runId` is required.
3. **No auth.** `platform/src/middleware.ts:1-9` is locale-only; `users` table has no password hash.
4. **No LLM integration in `platform/`.** The Next.js app has zero LLM API calls. All research is currently done in batch by `am-research` running in the same process as the controller — there is no per-request LLM gateway.
5. **No source connectors.** Web / arXiv / PubMed / YouTube ingestion is referenced in research notes but no first-party connectors exist. Angle C is the right place to specify these.
6. **No evaluation harness.** No RAGAS, no golden Q&A, no LLM-as-judge. The product cannot tell whether the next run is better or worse than the last.
7. **No first-party citation system.** Citations are hand-written in Markdown (`[source](url)`); the product has no `[S1]…[Sn]`-style chunk-anchored citation UX.
8. **The 3 research projects in `research/` are not the user-facing product** — they are analyst reports. The product needs a renderer that turns `00_MASTER_SYNTHESIS.md` into a navigable page with citations, mind-map, audio, etc.
9. **No paged / chunked retrieval.** Synthesis is single-shot over a topic + sources; for long topics (100+ sources) the synthesis needs hierarchical summarization (Map-Reduce / RAG). `research/notebooklm-research/04_build_guide/FINDINGS.md` describes the technique but it is not implemented here.
10. **English-only syntheses.** All 3 `research/` master syntheses are English. Arabic-first is the user's competitive edge but the synthesis layer does not yet produce Arabic reports.

---

## 8. Citations (URL + access date 2026-08-13)

All citations are to files inside this repository (no external web fetches were required for this inventory angle). File paths are quoted verbatim from `E:\react_projects\research_space\` tree listings (verified via PowerShell `Get-ChildItem` and `glob`); line numbers are from the files as read in this dispatch. Access date for every file: 2026-08-13 (today).

External context referenced but not fetched here: the user task is preserved at `share/handoffs/00_user_task_T-2026-08-13-002.md:4` (verbatim). Sibling angle files for this task will land at `share/notes/01_research_T-2026-08-13-002_angle-{a-criteria,b-competitors,c-sources,d-synthesis,e-ux}.md` per `tasks/T-2026-08-13-002.md:46-51`.

The audit covers the surface area the prompt specified and is grounded in the highest-leverage reads (manifests, SKILL.md files, schemas, recent master syntheses, README indexes). The 11 NONE rows in the gap matrix are honest about gaps I could read in code, not assumptions.

---

## Self-critique

- **Did I do my job?** Partial. I inventoried the 9 specified surfaces with file/line evidence and built a 25-row gap matrix. I did not propose a plan (per the rules in `agents_manager/research/SKILL.md:321-336`) — the master + planner own the "convert to" decision. I did not write code.
- **What might I have missed?** (a) The `next_website_gen/` and `resources/` folders got less scrutiny; they may contain reusable patterns (Nuxt 4 + Strapi 5 stack, raw research dumps). (b) `docs/` directory contents — I confirmed the directory exists but did not read individual doc files. (c) The Cloudflare / ZainCash integration in `platform/src/lib/cloudflare.ts` was not opened. (d) The `chub-gate` and `chub-validate` OpenCode plugins listed under `agents_manager/` may already enforce a library-validation protocol useful for the conversion.
- **What did I assume without evidence?** (a) That the 5 templates in `platform/src/lib/templates/{clinic,retail,restaurant,real-estate,professional}.ts` are the only ones — I did not grep for `templateSlug` in the DB to confirm. (b) That no LLM deps exist in `platform/` — I used grep across `src/` and confirmed; package.json also has zero LLM-related entries (only next/react/tailwind/drizzle/grapesjs/serwist/radix/lucide). (c) That the gap matrix rows 19–22 are FULL because the orchestrator pipeline demonstrably works in the 3 prior tasks — verified by reading `share/notes/01_research_T-2026-08-13-001_angle-*.md` and `share/notes/99_progress_T-2026-08-12-002.md`.

## Metrics

- findings: 9 (compact — implicit strengths + weaknesses count as findings for this angle)
- risks_HIGH: 0
- risks_MEDIUM: 0
- risks_LOW: 0
- clarifying_Qs: 0

(The risk register is not the deliverable of an inventory angle — that is Angle D synthesis's job. The conversion risks live in §7 Implicit weaknesses, which the planner should treat as risk inputs.)