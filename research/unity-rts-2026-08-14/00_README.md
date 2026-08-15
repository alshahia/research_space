# Unity RTS Research Dossier - 2026-08-14

## Map

| File | Contents | Read when |
|---|---|---|
| 00_README.md | This map, verdict, headline numbers | Always start here |
| 01_RTS_CORE_ARCHITECTURE.md | Core systems: input, selection, orders, movement, economy, building, FoW, save, architecture verdicts | Designing or building any core system |
| 02_OPPONENT_AI.md | Single-player opponent AI: layered shape, build orders, difficulty, techniques, 9-system checklist | Building the AI opponent |
| 03_OPEN_SOURCE_LANDSCAPE.md | Full OSS scan (18 projects), cornerstone verdict, license risk table | Choosing what to learn from / reuse |
| 04_NEW_TECHNIQUES.md | New techniques: Unity 6.x, DOTS, URP rendering stack, FoW modern, UI Toolkit, save, perf | Deciding what techniques to adopt |
| 05_BUILD_ROADMAP.md | What needs to be done: 13-phase MVP order, gates, per-system checklists, effort estimates | Sequencing the build |
| 06_USE_VS_AVOID.md | Consolidated USE / AVOID contract tables (what to use, what to avoid, why) | Any agent before writing code |
| 07_OPEN_QUESTIONS.md | 8 user decisions that gate the plan | Before planning locks |
| 99_SOURCES.md | Consolidated source table (~140 rows) with verification tags and access dates | Verifying any claim |

## Verdict

- **Can the project be built?** Yes. Local single-player RTS in Unity is a well-trodden path; every required system has a verified Unity-native or OSS path.
- **Is there an OSS cornerstone?** No. Every Unity OSS RTS is GPL, unlicensed, MIT-but-stale, or multiplayer-focused. Build from scratch, informed by a learn-from constellation. See 03.
- **Confidence:** HIGH (aggregate of 4 parallel research angles, all feasible).

## Headline numbers

- 98 findings across 4 angles (36 core / 26 AI / 20 OSS / 16 techniques)
- 4 HIGH, 8 MEDIUM, 7 LOW risks (deduped), 8 clarifying questions for the user
- 140+ sources, all with access date 2026-08-14, verified/flag-tagged
- 18 OSS projects evaluated; 4 dead leads identified and excluded
- 13-phase MVP roadmap with hard gates, ~2-4 month build-from-scratch estimate
- Unity 6.3 LTS baseline (supported to Dec 2027)

## Reading paths

1. **Decision maker (short path):** 00 -> 07 (decisions) -> 06 (use/avoid) -> 05 (roadmap)
2. **Planning agent:** 00 -> 05 -> 07 -> 02 (AI) -> 01 (core) -> 99
3. **Coder agent:** 06 (contract) -> 01 (per-system checklists) -> 02 (AI checklist) -> 04 (technique pitfalls) -> 99

## Method

Four parallel am-research agents (core / AI / OSS / techniques), each with citation discipline (numbered [Sn] markers, endpoint + access date), a Metrics footer, self-critique, and abstention gate ("Could not verify") where sources failed. Canonical synthesis: share/notes/01_research_T-2026-08-14-002.md. Source files: share/notes/01_research_T-2026-08-14-002_angle-{core,ai,oss,techniques}.md.

## Project rules honored

- Local-only, no multiplayer, no network, no lockstep
- Research/ and research_doc/ historical artifacts untouched
- Em-dash (U+2014) banned in all files
- All sources carry access date; unverifiable claims explicitly flagged