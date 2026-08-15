# Plan Review - plan-devex angle - T-2026-08-14-002

**Reviewer:** am-planning (plan-devex lens)
**Date:** 2026-08-14
**Plan under review:** `share/notes/02_plan_T-2026-08-14-002.md` (+ `02_plan_phases_`, task rows P2T2-P2T31)

## Lens: DX audit for the AGENTS executing this plan (am-coder, am-design, am-review). TTHW, friction points, persona traces.

The "developer" here is the agent pipeline that will execute the plan (plus the human user reviewing it). TTHW = time to first playable moment.

## Persona traces

- **am-coder:** needs self-contained tasks, named files, acceptance criteria, and guardrails as FAIL conditions. Trace: every task row names files (P2T2-P2T31), every phase gate is runnable, guardrails are enumerated in the canonical plan § 3, and per-system checklists are inline in the phased plan. PASS.
- **am-review:** needs verifiable gates and guardrail checklists. Trace: 9/9 guardrail audit is its own task (P2T31); automated save round-trip test (P2T21); fairness test for AI perception (2C gate). PASS.
- **am-design:** needs the visual contract without re-reading the dossier. Trace: § 4.5 is self-contained (URP, atlasing, LOD, HUD layout, FoW look, accessibility). PASS, with the mock suggestion from the design angle.
- **Human user:** needs to see progress without deep-diving. Trace: milestone gates are user-visible ("units move under queued orders", "AI completes a full match"). PASS.

## TTHW analysis

- **First playable moment:** end of M1 - player box-selects a squad and issues queued move orders. Estimated 2-3 weeks from zero. That is the correct TTHW for a project of this scale; the DevScene with 40 test units (P2T8) is the hello-world and it is a task, not an afterthought.
- **Biggest internal friction point:** M5 (AI, 3-6 weeks) has the longest time-to-visible-result inside the milestone. Mitigated: the 9-system checklist is incremental (perception first, then build orders, economy, production - each system is verifiable via decision log/Gizmos before the next starts), and the plan marks it split_recommended.

## Friction points and fixes

1. **Research doc drift is a real runtime cost** (`04`: 4+ official doc URLs 404'd at access date; 6.2 GA unverifiable). The plan mitigates with pin-at-install (P2T2) + re-verify at implementation, but the plan should also tell the coder WHERE to verify: chub-validate for package APIs (v0.20.0+ mandatory rule), Unity package-manager docs for versions. One line in the handoff notes.
2. **MinaPecheux code is Unity 2020.3-era** (`03` § License risk). DX fix: the plan already says "adapt patterns, not paste" - make it a review check: any MinaPecheux-derived file must carry a comment noting the 2020.3 -> 6.3 API migration it required. Prevents silent outdated-API drift.
3. **Profiler discipline:** research says profile in Player builds, not Editor (`04` § Performance targets). The 2F gates say this, but 2B/2E also claim "zero allocations per frame" gates - add one line to the handoff notes: run those gates in a Player build when feasible, Editor Profiler as minimum.
4. **Single-scene iteration:** DevScene (P2T8) is the permanent iteration surface. Good. Suggest the SaveTest scene (P2T21) reuse DevScene content so test scenes never fork into unmaintained fixtures.

## Verdict

**PASS** - the plan is executable by agents without re-reading the dossier (self-contained contracts, named files, runnable gates). TTHW (M1 end) is honest for the scope. Apply fixes 1-3 as one-line additions to the handoff notes; fix 4 is a suggestion.

## Pass/fail checklist

- [x] Every task names files and has an acceptance check
- [x] Guardrails are FAIL conditions, not advice
- [x] TTHW is a named milestone with a visible artifact (DevScene)
- [x] AI milestone incremental + split-recommended
- [x] Version/doc drift has a runtime mitigation path
- [ ] FIX: chub-validate + doc re-verify instruction in handoff notes
- [ ] FIX: MinaPecheux-derived files carry API-migration comments