# Plan Review - plan-ceo angle - T-2026-08-14-002

**Reviewer:** am-planning (plan-ceo lens)
**Date:** 2026-08-14
**Plan under review:** `share/notes/02_plan_T-2026-08-14-002.md` (+ `02_plan_high_`, `02_plan_phases_`)

## Lens: find the 10-star product. Is the plan ambitious enough? Solving the right problem?

**The problem being solved is right.** The user asked for a research-first foundation any agent can build an RTS from, then a build plan. The research correctly killed the two wrong paths (no OSS cornerstone - build from scratch; no RL/LLM opponent - hand-authored hierarchical AI) and the plan correctly inherits those verdicts. A 10-star outcome for THIS user is not "the most ambitious RTS ever made" - it is "a local RTS that feels responsive at 300-600 units with a fair, readable opponent, delivered on time." The plan's 6 milestones serve exactly that.

## What is strong

- **Ambitious where it counts:** 300-600 concurrent units is the research's recommended middle path (`07_OPEN_QUESTIONS.md` Q1) and it forces real engineering (pooling, spatial hash, instancing, eventual pathfinding upgrade). The plan does not settle for the 50-200 unit cheapest lane.
- **The 10-star differentiator is named:** fairness. Perception-first AI + shared FoW grid (M3 gate: "hidden unit invisible to player AND AI") is the feature that makes the single-player experience credible. This is the plan's strongest single decision.
- **3 difficulty modes as one governor** is the correct product move: user-selectable in settings means replay value without tripling the AI build.
- **Hard non-goals are the ambition shield.** RTS scope creep is the genre's classic killer; the WHAT-NOT-TO-BUILD list + milestone gates protect the 9.5-17 week estimate.

## Fixes / suggestions (non-blocking)

1. **Add a one-line game pitch to the plan** so every later agent (design, art, balance) anchors to the same product. Suggestion: "A fast, fair local RTS skirmish: 300-600 units, fog of war, and an opponent that plays by the same rules you do." The plan implies this but never states it.
2. **Make "game feel" explicit in the M1 gate.** The gate currently reads as mechanical (selection semantics, queue orders). Add one feel criterion: "camera pan is snappy (< 100ms perceived lag) and selection feedback is immediate." RTS veterans judge games in the first 10 seconds.
3. **Name the post-v1 horizon** (1 paragraph in the canonical plan): flow fields, DDA tuning, campaign content, WFC maps, ML-Agents micro-experiment. This keeps the ambition alive without letting it leak into v1. The Deferred section in the phased plan already lists the techniques - a one-paragraph product horizon would complete it.
4. **Balance target should be a number, not a vibe.** The 2F gate says "tuned for a ~15-minute match" - fine, but M5's "AI wins on Hard, loses on Easy" is the right kind of measurable; keep it, and record the 3 scripted runs as artifacts so tuning is reviewable.

## Verdict

**PASS** - right-sized ambition, correct problem selection, and the fairness-first architecture is a genuine 10-star lever. No scope re-cut needed. Apply fixes 1-3 as plan addenda (they are one-line edits), fix 4 is already satisfied by the 2E gate wording.

## Pass/fail checklist

- [x] Plan solves the user's actual problem (local RTS vs AI, buildable by any agent)
- [x] Ambition matches the 300-600 unit decision (not the cheapest lane)
- [x] Non-goals protect against the genre's scope-creep failure mode
- [x] Post-v1 horizon exists (Deferred section) - suggest promoting to a named product horizon
- [x] Every milestone ends in something the user can see or run