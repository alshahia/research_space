# 07 - Build Guide

**Angle:** guide | **Findings:** 25 | **Sources:** S2-S17, S80, S124, plus 01-06 verdicts | **Verdict:** P0-P13 phases with gates; MVP in 47-69 phase days (~60-90 person-days with buffer = 6-9 weeks full-time). Every phase ends with a gate that blocks the next phase.

---

## 1. Phase plan (P0-P13)

| Phase | Work | Gate (blocks next) | Effort (days) |
|---|---|---|---|
| P0 | Decisions: answer Q1-Q12; freeze ADRs 1-6; define MVP scope (Q5) | Signed-off scope + ADR log | 1 |
| P1 | Project scaffold: Unity 6.3 LTS, URP, Input System, event bus skeleton, folder structure, git | Project boots; empty scene runs at 60fps | 2-3 |
| P2 | Core sim: champion movement (U7), minion wave (U1), towers (U2), gold/XP (U3, U5), fog/brush (U4); license gate scan (04-4) | Playable lane loop vs idle minions; license scan clean | 8-12 |
| P3 | Last-hit tuning: gold curve, minion HP vs champion damage; first playtest (developer + 1 friend) | Last-hit feels consistent; session length in target band (Q3) | 3-5 |
| P4 | Ability system (U13): 1 hero, 4 abilities, projectile archetype; item shop 5 items (U22 pending) | Abilities land/dodge correctly vs test dummies | 6-9 |
| P5 | Bot brain v1 (U9): lane assignment, push lane, basic combat (target selection, ability use) | Bots complete a lane push; no stalls | 7-10 |
| P6 | Bot micro v2 (U10, U11): lead-prediction aim + dodge; FrameTiming profiler run vs 05-4 budget | Bots dodge skillshots; perf budget met | 5-8 |
| P7 | Difficulty dials (U12) + allied AI (defer last-hits); bot duel test scene | Named tiers play distinct; duel scene passes unit checks | 4-6 |
| P8 | Save/load (U14, U22): versioned DTO, checkpoint + progression | Save survives crash; migration path tested | 2-3 |
| P9 | Settings + polish: quality tiers (U18), input remap, pause, HUD (uGUI+TMP), camera shake (U19) | Settings screen fully functional | 3-5 |
| P10 | Meta layer: hero unlock, match-complete screen, simple menu flow | Full player loop: menu -> match -> result -> menu | 2-4 |
| P11 | Content pass: 2nd map variant, 1-2 more heroes (only if Q5 allows), VFX/SFX pass | Content scope met; no new mechanics | 3-5 |
| P12 | Optimize + test: instancing (U15), pooling (U16), LOD (U17) verified by profiler; regression pass | Frame budget met on low-tier machine | 2-4 |
| P13 | Release candidate: bug-fix pass, build targets (Q1), final playtest | RC builds; known-issues list signed | 2-3 |

**Totals:** 47-69 phase days; with 50% buffer = 60-90 person-days -> 6-9 weeks full-time (solo dev).

## 2. Agent phase cards (who does what)

- **am-research:** P0 (answers Q1-Q12 with this dossier as the input), P2 license gate scan input, P7 bot-duel test criteria. No source code.
- **am-planning:** P0 scope + ADR log; owns the gate definitions.
- **am-design:** P2 (visual style), P9 (HUD/settings UX), P11 (content), P3-P8 only if design gates hit.
- **am-coder:** P1-P13 implementation; owns the phase gates' technical acceptance.
- **am-review:** every phase gate; P6 FrameTiming review, P7 duel scene review, P13 RC review.
- **am-ship:** P13 release (build targets, changelog, tag).
- **am-health:** P12/P13 health score.

## 3. Global build conventions

- Scripts: C#, no code gen, no Odin (A5); SO data + event bus (U13); zero allocs in per-frame hot paths (05-4).
- Assets: MIT-only imports (04-4); every asset has a license header comment.
- Docs: ASCII only (no em/en dashes) - this repo's process rule; automated scan in the P2 gate.
- Versioning: git tags at every gate; save DTO schema version = project version.
- Playtest cadence: one playtest per phase after P3 (developer + 1 external); results recorded in share/notes.

## 4. User needs to requirements (top 5)

| User need | Requirement | Phase |
|---|---|---|
| "I want to feel powerful laning" | Last-hit + gold feedback loop (U3), tuned in P3 | P3 |
| "I want to outplay the bots" | Bots dodge skillshots (U11) at mid tiers; honest limits (Q6) | P6-P7 |
| "I want to finish a match in my lunch break" | Match length in Q3 band; MLBB pacing (S65) | P3 |
| "I want my progress to persist" | Versioned saves (U14) + progression (U22) | P8 |
| "I want to play it on my setup" | Quality tiers (U18) + input remap (U6) | P9 |

## 5. Risks

- HIGH: Scope creep (Q5) - the P0 gate freezes MVP; anything new goes to a backlog file.
- HIGH: Bot unfun at P5-P7 - the P6/P7 gates have explicit exit criteria (dodge works, tiers distinct); failing a gate is the plan working, not a defect.
- MEDIUM: Perf debt sneaking past P6 - the FrameTiming run is mandatory, not optional.
- MEDIUM: Solo-dev schedule slip - 50% buffer is in the estimate; P13 is flexible by scope, not by quality.
- LOW: Tooling churn (Unity version upgrades mid-project) - freeze the editor version at P1 (ADR 1).

## 6. Source anchor

Method notes, sourcing discipline, and the full citation registry: 99_SOURCES.md. Prior precedent: S124 (RTS dossier) for the phase-gate format.