# Verifier Report - T-2026-08-14-003 (MOBA-in-Unity research dossier)

**Date:** 2026-08-14
**Sub-agent:** review (verifier mode)
**Synthesis file:** share/notes/01_research_T-2026-08-14-003.md
**Dossier:** research/moba-unity-2026-08-14/ (10 chapters)
**Evidence base:** share/notes/01_research_T-2026-08-14-003_angle-{games,core,ai,oss,guide}.md
**Scope:** independent verification of the merged dossier against its own evidence base. Report only; no files edited.

## Summary

- **Overall verdict:** PASS_WITH_WARNINGS
- **Checks:** 7 (6 PASS, 1 WARN: claim-vs-evidence has one LOW cluster of uncited claims plus one vague citation)
- **Findings:** 5 (0 HIGH / 1 MEDIUM / 4 LOW)
- **Block release?** no. The dossier is shippable to planning; the MEDIUM (license mislabel) should be corrected by a quick coder/merge fix loop or accepted as-is with a note, since it does not change any build decision.

## Tests / build run

No build or test command exists for a research-only dispatch. Verification was performed as a fresh independent pass:

- Byte-level em dash / en dash scan across all 11 deliverables (Python, `read().count()` on UTF-8 bytes for U+2014 and U+2013): **0 hits**.
- Automated citation cross-reference (Python regex over all chapters + canonical against 99_SOURCES.md rows): all citations resolve.
- Registry tag arithmetic recounted from the table rows (Python count of `[verified]`/`[secondary]`/`[UNVERIFIED]` per row).
- Full manual read of: canonical summary, all 10 dossier chapters, all 5 angle reports, the source registry.

No documented test command exists for this artifact type; the above commands were run fresh in this dispatch.

## Per-check results

| # | Check | Result | Evidence |
|---|-------|--------|----------|
| 1 | Structure: 11 deliverables exist; canonical Metrics footer integers; dossier 10 chapters | PASS | glob confirms canonical + 10 dossier files present; `01_research_T-2026-08-14-003.md:112-118` Metrics footer: findings: 129, risks_HIGH: 5, risks_MEDIUM: 7, risks_LOW: 4, clarifying_Qs: 12 (all integers); dossier chapters 00-99 all present |
| 2 | Citation integrity: >=15 [Sn] across >=3 chapters resolving to 99_SOURCES; access date; weak tags preserved | PASS | 124 rows S1-S124 in 99_SOURCES.md (range check S1-S124); chapter citation instances: 01:24, 02:23, 03:14, 04:29, 05:11, 06:2, canonical: 173; **0 unresolved citations in any chapter or canonical**; no citation beyond S124; access date 2026-08-14 at 99_SOURCES.md:3 and README:40; tags preserved: S88 [UNVERIFIED] (99_SOURCES.md:117), S116 [UNVERIFIED] (:155), S102 [secondary] (:141), S118 [secondary] (:157), S101 [verified] matching the angle's own "primary (404 evidence)" typing (angle-oss S5); S88 also carries its [UNVERIFIED] tag inline at 01_GAMES_TEARDOWN.md:35 |
| 3 | Claim vs evidence: no uncited reference-game claims; no unmarked contradiction with angle reports | WARN | All mechanics claims in canonical:17 carry [Sn]; contradictions adjudicated in canonical:98-104 match the angle files (queue names S44/S25 vs games S9/S10; MLBB lane naming S58/S59 vs games S16/S17; Herald/Baron S47/S46 vs games S13/S12; duration S66/S65 vs games S19/S20; Riot latency article dead, canonical:104 vs guide F18). **Findings 3, 4, 5 below**: uncited Dota/MLBB claims in 01 (lines 47-49, 66-67), vague "[S36-adjacent adjudication]" marker in 02:40, unmarked ReGoap license contradiction (finding 1) |
| 4 | ADR compliance: local-only, Unity 6.3 LTS, URP, no BinaryFormatter, versioned DTO saves, hierarchical scripted AI with RL/LLM deferred, GameObject+MonoBehaviour+SO+event bus vs DOTS only at horde scale, playbook conventions | PASS | README:44-51 lists ADRs 1-6 exactly as required; honored throughout: 02_CORE_SYSTEMS.md:63 (no BinaryFormatter, versioned DTO), :26 (DOTS only if horde; ~30-40 minions trivial), 03_OPPONENT_AI.md:9-11 (no RL/LLM, scripted hierarchy), 05_NEW_TECHNIQUES.md:33 (ADR 3, no DOTS "because it scales"), 01:29-30,90 (no netcode, local sim), 06_USE_VS_AVOID.md A1/A2/A6/A7; prior RTS dossier conventions mirrored (S124, numbered chapters, map table, verdict, phase plan) |
| 5 | Em dash ban: U+2014 and U+2013 byte scan of all 11 deliverables | PASS | Python byte scan of canonical + 10 dossier files: TOTAL U+2014: 0, TOTAL U+2013: 0 |
| 6 | Headline consistency: 129 findings / 124 sources / 16 risks / 12 clarifying questions across README, canonical, 99_SOURCES | PASS (with LOW finding) | README:10-13 says 129 (42+20+14+28+25) / 124 / 16 (5 HIGH+7 MED+4 LOW) / 12; canonical Metrics footer 129/5/7/4/12; chapter headers sum: 42+20+14+28+25 = 129; 06:67 repeats 129/124/16/12; 99_SOURCES.md:3 + row count = 124; Q1-Q12 exactly 12 headers in 08_OPEN_QUESTIONS.md. **But** 99_SOURCES.md:177 audit footer says "Verified count: 105; secondary: 17" while the table itself holds 93 verified / 29 secondary / 2 UNVERIFIED (the footer's own parenthetical lists 29 IDs) - finding 2 |
| 7 | 07_BUILD_GUIDE agent-applicability: P0-P13 phases with gates, agent phase cards, user-needs-to-requirements table | PASS | 07_BUILD_GUIDE.md:9-24 phase table with Work/Gate/Effort per phase (P0-P13, 47-69 phase days); :28-36 agent phase cards (am-research, am-planning, am-design, am-coder, am-review, am-ship, am-health); :46-54 user-needs-to-requirements table (5 rows, each mapped to a phase); :38-44 global conventions; :64-66 source anchor |

## Findings (all)

### MEDIUM

1. **[MEDIUM] research/moba-unity-2026-08-14/99_SOURCES.md:158 + 04_OPEN_SOURCE_LANDSCAPE.md:19,40 - ReGoap license mislabeled as MIT.** The registry row and chapter 04 both tag ReGoap as MIT, but the primary-verified evidence (angle-oss finding 24, raw LICENSE fetch, 2026-08-14) and the canonical summary (01_research_...-003.md:56) both say Apache-2.0. This is an unmarked contradiction inside the merged dossier. Practical impact is nil (both permissive, recommendation unchanged), but the registry exists precisely for license hygiene and 04-4 gates imports on "MIT only" - a future agent could mis-cite the license or mis-apply the gate. Fix is a one-line correction in the registry row + chapter 04 (coder/merge lane, not mine).

### LOW

2. **[LOW] research/moba-unity-2026-08-14/99_SOURCES.md:177 - Verification audit arithmetic wrong.** Footer claims "Verified count: 105; secondary: 17" but the actual table counts are 93 verified / 29 secondary / 2 UNVERIFIED (verified by script recount; the footer's own parenthetical list contains 29 IDs). Sum happens to equal 124 either way, so the headline numbers are unaffected; the per-category audit counts are simply wrong.
3. **[LOW] research/moba-unity-2026-08-14/01_GAMES_TEARDOWN.md:47-49,66-67 - Uncited reference-game claims.** Dota deny mechanics / turn rates / couriers (lines 47-49) and the MLBB auto-battle-assist purpose ("designed for mobile thumb fatigue", lines 66-67) are factual descriptions of reference-game mechanics with no [Sn] marker, violating the chapter's own "every claim cites its registry number" rule. Genre-common knowledge, low risk of being wrong, but the claim-without-citation flag fires here (2 clusters, 1 chapter).
4. **[LOW] research/moba-unity-2026-08-14/02_CORE_SYSTEMS.md:40 - Vague citation marker.** "we adopt wiki 14:00/20:00 as default" is cited as "[S36-adjacent adjudication]"; the actual source rows are S46 (Baron) / S47 (Herald), and S36 is the Minion page. The claim itself is correct and consistent with the canonical adjudication, but a fresh reader chasing S36 will find nothing about objective timers.
5. **[LOW] research/moba-unity-2026-08-14/04_OPEN_SOURCE_LANDSCAPE.md:11,30 - LeagueSandbox license precision.** Chapter 04 says "GPL-style"/"GPL"; the angle report (angle-games finding 29, landscape table) verified AGPL-3.0. AGPL is GPL-family so the shorthand is not wrong, but the verified tag is more specific.

## Cross-cutting findings

- The merge discipline is genuinely strong: 124 rows deduped from 5 angle tables with a mirror-note system (99_SOURCES.md:178), every adjudication from the angle files is surfaced in the canonical (98-104) rather than silently resolved, and the per-chapter findings headers sum exactly to the headline 129.
- Weak-source handling is honest: S88/S116 ([UNVERIFIED]) and S102/S118 ([secondary]) are flagged in the registry, carried inline where used (01:35), and explicitly excluded from ADR foundations (99_SOURCES.md:180 audit rule; verified true on spot check: ADRs rest on S2/S4/S25/S28/S63/S124 etc., all [verified]).
- The two UNVERIFIED rows are used in the dossier only with verified co-citations (e.g. tick cadence [S63][S116] at canonical:49, with S116 explicitly listed as provisional at canonical:40).
- Angle-ai's self-critique note ("LoL Co-op vs AI fills allies with humans, not bots") is in mild tension with canonical:18 ("5v5-with-one-human PvE shape is proven by LoL Co-op vs AI"), but MLBB AI Training and Dota practice mode carry that claim and the LoL wording is defensible as "humans vs bots". Not escalated; noted for completeness.

## Out-of-scope observations (informational)

- The angle files' own em-dash bans were not rescanned (dispatch scoped the byte scan to the 11 deliverables; the angle headers claim they self-enforced).
- URL liveness (cited-but-404 check) was not re-executed against the live web in this pass; the registry documents its own 404 handling (S28 via web.archive, S116 unreachable, S88 snippet-level, 99_SOURCES.md:179), and the canonical flags Unity docs drift as a HIGH risk (canonical:32).
- S101's [verified] tag on a 404-evidence row is unusual but internally consistent with the legend ("fetched/read directly") and with the angle file's own "primary (404 evidence)" typing.

## Recommend am-investigate

No HIGH or CRITICAL findings exist; no root-cause investigation is warranted. The MEDIUM finding (ReGoap license) has an obvious cause and a one-line fix; dispatch `am-coder` directly if a correction loop is desired, or accept as-is (build decisions unchanged).

## Honest assessment

This is a strong, shippable dossier. The verification surface that usually kills merged research - unresolved citations, unmarked contradictions, headline drift, forbidden characters - is clean: 0 broken citations out of ~250 citation instances checked, all 5 known contradictions adjudicated and consistent with the evidence base, and all headline numbers reconcile across README, canonical, 06, and the source registry. What keeps it from a clean PASS is accuracy debt in the license registry (ReGoap labeled MIT where the primary source says Apache-2.0), a wrong arithmetic footnote in the registry's own audit, and two small clusters of uncited genre-common claims. None of these changes a single build decision; all are fixable in minutes. The verdict is PASS_WITH_WARNINGS, not FAIL, because nothing load-bearing is wrong.

## Self-critique

- **Did I do my job?** Yes: all 11 deliverables and all 5 angle files read in full; byte scan and citation cross-reference executed fresh; tag arithmetic recounted from the table rather than trusting the footer.
- **What might I have missed?** (1) I did not re-fetch any URLs to independently confirm liveness (registry documents its own 404s and the dispatch did not require a fetch pass; a live re-fetch would be the next-level check). (2) I did not diff the registry against each angle's source table row-by-row (mirror notes cover the dedupes; a full ID mapping table was not audited). (3) Angle-file em-dash compliance was not rescanned.
- **What did I assume without evidence?** (1) That the 6.3 LTS / URP / no-horde-scale claims are correct as stated (they are carried ADRs from the prior dossier, cited S124, and were not independently verified against Unity's site - consistent with the angle-guide self-critique). (2) That the chapter findings sums (42/20/14/28/25) reflect the angle Metrics footers (they do: angle games=42, core=20, ai=14, oss=28, guide=25 - verified).

## Metrics

- findings: 5
- risks_HIGH: 0
- risks_MEDIUM: 1
- risks_LOW: 4
- clarifying_Qs: 0
