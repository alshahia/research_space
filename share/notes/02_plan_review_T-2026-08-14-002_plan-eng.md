# Plan Review - plan-eng angle - T-2026-08-14-002

**Reviewer:** am-planning (plan-eng lens)
**Date:** 2026-08-14
**Plan under review:** `share/notes/02_plan_T-2026-08-14-002.md` (+ `02_plan_phases_`)

## Lens: lock architecture, data flow, edge cases, tests.

## Architecture checks (with verdicts)

- **Movement abstraction first (P2T6 before P2T12):** PASS. IMovementProvider + NavMeshAgent impl in milestone 2A; combat in 2B consumes the abstraction. Guardrail 9 enforces no retrofit. Upgrade path (NavMesh -> grid A* -> flow fields) documented in the movement contract (`01` § 4). This is the classic Unity RTS rewrite trap and the plan closes it at task level.
- **Event bus decoupling (UI/AI never touch systems directly):** PASS. Explicit review-fail item for direct references. UI in 2C and AI in 2E both consume the same bus - single integration seam (`01` § Architecture verdict).
- **Perception-first AI fairness seam:** PASS. P2T14 (visibility grid) precedes P2T22 (AiPerception); the AI reads the SAME grid; M3 gate tests it. This is the plan's most important data-flow decision (`02` § The single most important decision).
- **AI orders through CommandPipeline only:** PASS. Order schema (§ 4.3) is shared; 2E contract states it. Prevents the AI from bypassing unit brains.
- **Save DTO shape:** PASS with one fix (below). [Serializable] plain DTOs, version field, no Dictionary, no UnityEngine.Object references, world state includes FoW grid (`01` § 8). Automated round-trip test (P2T21) is the gate - correct.
- **Object pooling:** PASS. P2T13 in 2B, before combat/effects scale up; unit pooling audited again in 2F.
- **Order schema defined:** PASS. Order struct with type/targetId/position/queueSlot/isQueued is concrete enough for the coder without re-reading research.

## Fixes (required before coder dispatch)

1. **FoW grid allocation guard:** the plan says `byte[] explored/visible` but does not state the grid budget. Fix: define the default map size (e.g. 256x256 tiles -> 64KB per byte array, trivial) and record it in the save DTO contract so 2C/2D cannot drift into 2048x2048 grids without a documented decision. One line in § 4.4.
2. **Unit ID authority:** Order.targetId and UnitDto.id must come from ONE registry (SelectableRegistry doubles as the id authority). Fix: state in § 4.3 that targetId is a SelectableRegistry id, so save/load and AI targeting cannot fork id spaces. This is the classic save-corruption root cause; the plan currently implies it but does not state it.
3. **M5 split is correct, make it mandatory:** the phased plan sets `split_recommended: true` for 2E with a two-chunk split. Recommend master honors it (chunk 1: P2T22-P2T24; chunk 2: P2T25-P2T27) - 2,200 LOC at high review difficulty is at the safety floor limit.

## Edge cases covered

- Save version migration (readable failure path) - PASS (2D gate).
- Shift-queue semantics vs replace-order (isQueued flag) - PASS (§ 4.3).
- FoW re-light on return, explored-vs-visible distinction - PASS (2C gate).
- NavMesh carve on building completion, never retrofit - PASS (guardrail 9, 2B gate).
- Zero per-frame allocations in AI shell and harvest loop - PASS (2B/2E gates, Profiler-verified).

## Verdict

**PASS with 2 required fixes** (FoW grid budget in § 4.4; SelectableRegistry as id authority in § 4.3). Both are one-line contract additions, not structural changes. Architecture is otherwise locked and dependency-ordered correctly.

## Pass/fail checklist

- [x] Movement abstraction from day one, no retrofit paths
- [x] Data flow: event bus, shared command pipeline, shared FoW grid
- [x] Save: DTOs + version + no Dictionary + automated round-trip test
- [x] Tests exist per milestone (editor tests, manual smoke, profile gates)
- [ ] FIX: FoW grid size budget documented in save contract
- [ ] FIX: SelectableRegistry declared as unit id authority