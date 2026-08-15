# MOBA in Unity - Research Dossier

**Task:** T-2026-08-14-003 | **Date:** 2026-08-14 | **Agent:** am-research
**Scope:** Local single-player MOBA prototype in Unity - game design teardown, core systems, opponent AI, open-source landscape, build guidance.

## Verdict

**FEASIBLE with HIGH confidence - build from scratch.** No existing open-source project is a usable cornerstone (no netcode-less, licensed, actively maintained Unity MOBA exists; the one strong candidate, UnityStarter, is 2020-era with locked scripts). Use Unity 6.3 LTS + URP, GameObject/MonoBehaviour + ScriptableObject architecture with a component event bus (DOTS only at horde scale, ~70-80 entities here). No BinaryFormatter (custom serializers), versioned DTO saves, hierarchical scripted AI (no RL/LLM), no netcode.

## Headline numbers

| Metric | Count |
|---|---|
| Findings | 129 (42 games / 20 core / 14 AI / 28 OSS / 25 guide) |
| Sources cited | 124 (S1-S124, full registry in 99_SOURCES.md) |
| Risks | 16 (5 HIGH / 7 MEDIUM / 4 LOW) |
| Clarifying questions | 12 (consolidated from ~25 raw; full text in 08_OPEN_QUESTIONS.md) |

Risk register is consolidated in the canonical summary (`share/notes/01_research_T-2026-08-14-003.md`); each chapter flags its own risks inline with severity.

## File map

| File | Contents | Read when |
|---|---|---|
| `00_README.md` | This map, verdict, headline numbers, method, ADRs | First |
| `01_GAMES_TEARDOWN.md` | LoL / Dota 2 / MLBB / Wild Rift: what to copy, what to face, what to avoid, translation rules for local single-player | Choosing what to clone |
| `02_CORE_SYSTEMS.md` | 7 core systems (champion control, minions, towers/objectives, vision/brush, gold/XP/items, save/load, settings) with USE/AVOID verdicts | Designing systems |
| `03_OPPONENT_AI.md` | 3-layer hero brain, lane assignment, prediction + dodge, allied AI, difficulty dials, what NOT to do (no RL/LLM) | Designing bots |
| `04_OPEN_SOURCE_LANDSCAPE.md` | 26-repo survey, no-cornerstone verdict, component layer, license traps | Deciding build vs borrow |
| `05_NEW_TECHNIQUES.md` | Unity 6.x techniques (Input, URP, SRP Batcher, Addressables, Burst/Jobs, pooling, LOD) + anti-hype guard | Setting up the tech stack |
| `06_USE_VS_AVOID.md` | Consolidated USE/AVOID contract tables across all angles | During build, as the checklist |
| `07_BUILD_GUIDE.md` | P0-P13 phase plan with gates and effort (47-69 phase days), agent phase cards, conventions, user-needs-to-requirements table | Planning the build |
| `08_OPEN_QUESTIONS.md` | 12 clarifying questions with why-it-matters, options, defaults | Before build starts |
| `99_SOURCES.md` | All 124 sources with verification tags, access date 2026-08-14 | Citation lookup |

## Method

- Five parallel research angles (games, core, AI, OSS, guide) were dispatched, each with its own source set; this dossier is the consolidated merge.
- Citation discipline: every claim cites its registry number [Sn] into `99_SOURCES.md`. Tags: `[verified]` (directly fetched/read), `[secondary]` (aggregator or summary), `[UNVERIFIED]` (could not fetch, flagged, do not rely on).
- Verification tags and access dates recorded per source; access date for all web sources: 2026-08-14.
- The prior RTS dossier `research/unity-rts-2026-08-14/` is the sibling precedent and is cited as S124; its conventions (numbered chapters, map table, verdict, phase plan) are mirrored here. It remains READ-ONLY.
- Contradictions between sources were adjudicated (details in 01 and 03): bot queue names, Herald/Baron timings, MLBB match duration, MLBB lane naming.

## Binding ADRs (from research; do not re-litigate)

1. **Unity 6.3 LTS** baseline (2022.3 LTS as fallback, user decides via Q2).
2. **URP** render pipeline (built-in fallback acceptable, no HDRP).
3. **GameObject/MonoBehaviour + ScriptableObject + component event bus.** DOTS ECS only if horde-scale demands it (it does not at ~70-80 units).
4. **No BinaryFormatter** - custom serializers + versioned DTOs for saves.
5. **Hierarchical scripted AI** (goal-selection tree + utility scoring + steering micro). No RL, no LLM, no ML agents.
6. **No netcode / no lockstep / no server sim / no matchmaking / no anti-cheat / no analytics.** Local single-player only; the game simulation is local and synchronous.

## Reading paths

- **Decision-maker (you):** 00_README verdict -> 08_OPEN_QUESTIONS (answer these 12) -> 07_BUILD_GUIDE phase table.
- **Systems engineer:** 02 -> 03 -> 05 -> 06.
- **Novice to MOBAs:** 01 first, then 02, then 07.
- **Borrow-vs-build check:** 04 first.

## Risks summary (top)

- HIGH: Scope creep into full 5v5 3-lane before MVP proves the loop (Q5 gates this).
- HIGH: Unlicensed / locked open-source assets imported without review (04 license traps).
- HIGH: Unity 6 NavMesh + agent pursuit jitter (S86, S87) - mitigate with manual pursuit override or steering on NavMesh result (S20).
- MEDIUM: AI difficulty via cheat dials may feel unfair (S25, S28); honest-limits alternative.
- MEDIUM: MLBB-style asymmetric lanes complicate AI lane assignment (S58 vs S59 contradiction).
- MEDIUM: Em-dash/ascii discipline in generated docs is process debt, not product debt.

Full register: 16 risks (5 HIGH / 7 MEDIUM / 4 LOW) in canonical summary.