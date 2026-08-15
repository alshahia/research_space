# 08 - Open Questions (12)

**Status:** NEEDS_USER_INPUT - answer these before P0 (07). Each: why it matters, options, recommended default.

---

## Q1. Target platform first?
- **Why:** forks the control scheme (input system work, S2/S3), the perf budget (S32 vs desktop), and the save/perf targets. Also decides Q13-ish build targets at P13.
- **Options:** (a) desktop first, touch as a phase-12 pass; (b) Android-first; (c) both from day one.
- **Default:** (a) desktop-first with touch later. Desktop is the fastest path to a playable loop; touch adds the mobile pipeline cost (S16) early for no MVP gain.

## Q2. Unity version baseline?
- **Why:** API drift between 2022.3 LTS and 6.3 LTS affects Input System, URP asset format, NavMesh changes (S86/S87 jitter reports are Unity-6-era).
- **Options:** Unity 6.3 LTS (recommended); 2022.3 LTS (conservative).
- **Default:** 6.3 LTS (ADR 1). The jitter reports have documented steering workarounds (S20).

## Q3. Match duration target?
- **Why:** drives minion HP, gold ramp, XP curve, tower HP, and bot pacing (01-6, 02-5, 07 P3 gate).
- **Options:** ~10 min (MLBB, S65); 15-20 min (Wild Rift, S64); 30+ min (LoL PC, S24).
- **Default:** ~10-12 min. Solo play sessions benefit from short matches; MLBB's compressed curve is the closest model.

## Q4. Lane layout and economy?
- **Why:** forks lane assignment AI (03-3), map layout, and the Gold/EXP lane contradiction adjudication (01-4, 06).
- **Options:** (a) symmetric lanes with duo bottom (1-1-1-2); (b) symmetric with a jungler (1-1-1-1-1); (c) MLBB asymmetric Gold/EXP lanes (S58/S59).
- **Default:** (a) symmetric with duo bottom. Simplest for bot lane assignment, no jungle-timer complexity, no source contradiction.

## Q5. v1 match shape?
- **Why:** the single biggest scope lever (07 P0 gate; HIGH risk).
- **Options:** (a) scoped MVP: 1 playable hero, 1 lane loop, 2-3 enemy heroes; (b) full 5v5 on 3 lanes at MVP.
- **Default:** (a). The lane loop must prove fun before the 5v5 scale costs 3x the content work (01, 07 P4-P7).

## Q6. AI difficulty philosophy?
- **Why:** determines the dial implementation (03-5): cheat dials (bonus gold/XP/vision, LoL-style) vs honest limits (reaction/scan-rate, Riot-style S25/S28).
- **Options:** cheat dials; honest limits; hybrid (honest base + optional merciless tier).
- **Default:** hybrid: honest limits as the curve, one optional merciless cheat tier.

## Q7. Paid budget?
- **Why:** gates asset purchases: A* Pro $140 (list) / $70 (sale) (S122), Behavior Designer $95 (S123), art packs. Default stack is 100% free (04).
- **Options:** free stack only; paid allowed.
- **Default:** free stack at MVP; purchases only if a gate proves the need (04-4, 06 A14).

## Q8. Ability system architecture?
- **Why:** fork between adopting an MIT framework (UnityStarter S107 / Flexi S108 as reference) or building bespoke SO-based abilities (U13, ADR 3).
- **Options:** borrow framework; bespoke SO system.
- **Default:** bespoke SO system (ADR 3). The frameworks are 2020-era, pre-Unity 6, and locked/unmaintained (04).

## Q9. AI decision tooling?
- **Why:** free (official Unity Behavior graphs S18, hand-rolled tree 03-2, ReGoap S119) vs paid (Behavior Designer S123).
- **Options:** free; paid.
- **Default:** free, hand-rolled tree. The 3-layer brain is a small decision tree; a visual editor buys nothing at this scale (05-3).

## Q10. Save semantics?
- **Why:** mid-match snapshot vs match-complete progression vs both (02-6, U22).
- **Options:** mid-match snapshot; match-complete progression; both.
- **Default:** both (cheap with DTOs): progression unlocks + checkpoint save for crash recovery.

## Q11. Brush/vision rule set?
- **Why:** LoL rules (wards + brush, S41/S53) vs MLBB simplified bush (S61) vs custom simplified set.
- **Options:** LoL; MLBB; custom simplified.
- **Default:** MLBB-style simplified bush, no ward consumables at MVP (A18). Vision is a feel feature, not a depth feature, for a solo player.

## Q12. Ability design profile?
- **Why:** standard projectiles vs channeled/returning abilities changes per-ability dodge rules in bot micro (03-2) and the aim solver (U10).
- **Options:** mostly standard projectiles; include channeled/returning.
- **Default:** mostly standard projectiles at MVP; one channeled ability as a stretch. Also decide ability ranks: LoL standard ranks (5 levels) vs simplified single-rank - default simplified single-rank at MVP.

---

## Decision procedure

1. Master collects answers, freezes the ADR log at P0 (07-1).
2. Any unanswered question defaults to the bolded default above; the default is documented, not hidden.
3. A "defer" answer is valid for Q8/Q9/Q12 (build the default now, revisit at the named gate).

## Risks

- HIGH: unanswered Q5 (scope) - the #1 project killer; P0 gate hard-requires it.
- MEDIUM: answered-after-P2 questions (Q3, Q4) ripple into lane/tuning work; answer all 12 before P0.
- LOW: default-drifting (choosing the default without saying so) - the ADR log records every choice with its question number.