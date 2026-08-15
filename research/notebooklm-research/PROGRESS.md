# Orchestrator Progress Log — NotebookLM Research

**Date:** 2026-08-10 · **Working dir:** `E:\react_projects\research_space`
**Task (user, paraphrased):** research NotebookLM (how it operates, inputs, outputs), compare with similar projects, find ALL open-source alternatives and compare, and produce a build-guidance study (how you'd build one, what to use/avoid) — using sub-agents and parallel web search; save results in a new folder and document progress at every step.

## Step 1 — Setup
- Created folder tree: `research/notebooklm-research/{01_notebooklm, 02_competitors, 03_opensource, 04_build_guide}`.
- Decision: 4 pillars, 1 sub-agent each (all `general` type, full web tool access) + I (orchestrator) cross-validate in parallel.
- Each agent required to write `FINDINGS.md` (citable findings) + `PROGRESS.md` (step log with queries, URLs, confidence ratings).

## Step 2 — Parallel dispatch (4 sub-agents, one message)
| Agent | Scope | Deliverables (verified present) |
|---|---|---|
| Agent 1 | NotebookLM itself: operation, inputs, outputs, limits, timeline, API | `01_notebooklm/FINDINGS.md` (216 lines) + PROGRESS.md (124) |
| Agent 2 | Commercial competitors (20 profiled + 30 adjacent) + comparison table | `02_competitors/FINDINGS.md` (122) + PROGRESS.md (152) |
| Agent 3 | Open-source alternatives (all tiers, 40+ repos verified via GitHub API) | `03_opensource/FINDINGS.md` (184) + PROGRESS.md (51) |
| Agent 4 | Build-guidance spec: architecture, stacks, costs, OSS reuse, pitfalls, MVP roadmap | `04_build_guide/FINDINGS.md` (384) + PROGRESS.md (200) |

All 4 completed on first pass. Notable agent-level findings recorded in their own PROGRESS.md files (queries run, sources, gaps, confidence).

## Step 3 — Orchestrator cross-validation (independent parallel web searches)
- Search 1: "NotebookLM renamed Gemini Notebook July 2026" → **confirmed** via blog.google (2026-07-16), workspaceupdates.googleblog.com, The Verge, TechCrunch, 9to5Google. Agents' headline claim verified.
- Search 2: "Open Notebook lfnovo open source stars 2026" → **confirmed** ~36k★ (36,177 per GitHub page), MIT, FastAPI+Next.js+SurrealDB, podcast 1–4 speakers, 18+ providers, "basic references (will improve)" citation caveat, REST API. Verified against ghtrends.dev + andrew.ooo reviews.

## Step 4 — Synthesis
- Read all 4 FINDINGS.md (4 parallel reads). Content quality high, mutually consistent, no contradictions found between agents.
- Wrote `README.md` — master report answering every user question, with report map, exec summary, per-pillar summaries, and pointer to the detailed files.

## Step 5 — Verification
- `glob` confirmed 8/8 deliverables + README exist; line counts confirmed substantial (total ~9.5k lines of research).

## Step 6 — OSS-first re-research pass (user: "prefer the free open source, re-search if needed, append to current files")
- Dispatched 2 parallel sub-agents (one message): (A) OSS-first build-stack deep dive → append `## OSS-first free stack` section to `04_build_guide/FINDINGS.md`; (B) OSS landscape refresh + free tiers → append to `03_opensource/FINDINGS.md` + `02_competitors/FINDINGS.md`.
- Agent A's first run returned EMPTY and wrote nothing → resumed its session (task_id ses_0146ebd94ffe0D0GFD2e78OnP3) with a nudge → completed: appended §11 (per-stage free-OSS table, 3 zero-$ scenarios, fork verdict, free-path pitfalls) + PROGRESS log (25 queries, ~35 URLs, confidence table).
- Agent B completed first pass: appended §10 refresh (5 new finds: PaperQA2 9,010★, Cortex, OpenBookLM, mulmocast-cli, Gloss; corrected star counts incl. MindsDB→mindshub 39,526★, SuperDuperDB→superduper 5,308★, Dify not AGPL) + §6 free tiers (Gemini free best, ChatGPT free unlimited-text 2026-08-06, Claude free expanded, ElevenLabs ~10–20 min/mo non-commercial, Notion AI paid-only, GitHub Models retired).
- Orchestrator cross-validation (3 parallel exa searches, official pages): (1) Kokoro-82M — Apache-2.0 CONFIRMED (huggingface.co/hexgrad/Kokoro-82M + github.com/hexgrad/kokoro 8,308★), TTS Arena #1 Jan 2026, CPU, English-centric; (2) GitHub Models — retirement CONFIRMED (github.blog/changelog/2026-07-30) → **caught Agent A's stale GitHub Models free-tier claim**; (3) BGE-M3 — MIT CONFIRMED (NVIDIA NIM + llmreference), 100+ langs, dense+sparse+ColBERT, 8K ctx.
- Corrections applied to `04_build_guide/FINDINGS.md`: 3 edits replacing GitHub Models free-tier references with the retirement fact + Microsoft Foundry path (lines ~410, ~437, ~463).
- README.md updated with §9 "OSS-first pass" (best $0 stack, zero-$ scenarios, license traps, honesty ceiling, new finds, free-tier headlines).

## Gaps / caveats carried forward
- NotebookLM internals are not officially documented (third-party analysis flagged per-claim).
- 2 star counts unverified (GitHub API rate limit): MindsDB, SuperDuperDB.
- All prices point-in-time; NotebookLM pricing pages show feature tables only (third-party price claims flagged).
- Fixie status + DocumindAI/Fermat pricing could not be confirmed.

## Final deliverable map
```
research/notebooklm-research/
├── README.md                     <- master report (start here)
├── 01_notebooklm/                <- operation, inputs, outputs, limits, API, timeline
├── 02_competitors/               <- commercial comparison
├── 03_opensource/                <- open-source landscape (4 tiers) + deep dives
├── 04_build_guide/               <- how-to-build spec, costs, what to avoid, MVP roadmap
└── (each folder: FINDINGS.md + PROGRESS.md)
```
