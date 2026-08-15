# Plan Review - plan-design angle - T-2026-08-14-002

**Reviewer:** am-planning (plan-design lens)
**Date:** 2026-08-14
**Plan under review:** `share/notes/02_plan_T-2026-08-14-002.md` (§ 4.5 Visual contract, M3/M6)

## Lens: visual QA the design before code. Does the plan respect the design brief?

The design brief is implicit in the research: URP, one atlased material per faction, LOD expectations, placeholder-first art (`01` § 10, `04` § Rendering stack), UI Toolkit HUD + uGUI world-space (`04` § UI), Cinemachine FreeLook (`01` § 2), and locked decisions 2 (3D) + 3 (free art + placeholders).

## What is strong

- **The rendering contract is enforced as a hard rule** (guardrail 5: no Skinned Mesh units; § 4.5: one atlased material per faction, SRP Batcher, per-instance tint). This is the single biggest visual-performance decision in a 300-600 unit game and the plan locks it before any art exists.
- **Selection feedback designed for scale:** per-instance shader tint on the shared material (zero extra draw calls) instead of outline meshes - correct call at 600 units.
- **HUD split respects Unity's own guidance:** UI Toolkit for intensive HUD/minimap chrome, uGUI only for world-space bars (`04` § UI).
- **FoW visual language is defined:** unexplored black / explored gray / visible full color, soft-edge mask, minimap shares the mask. This is the readability contract every RTS needs.
- **Faction palette accessibility note** (blue vs orange-red) - cheap, correct.

## Fixes / suggestions (non-blocking for plan lock, binding for am-design dispatch)

1. **Name the HUD hierarchy, not just the placement.** The layout (resources top-left, minimap bottom-left, command card bottom-center, build menu bottom-right) is stated as text. Recommend am-design produce a one-page HUD mock (even ASCII or a simple UI Toolkit layout) at 2C dispatch time and attach it to the coder handoff - the current plan text is sufficient to build, a mock makes it reviewable.
2. **Unit readability rule at 600 units:** add one line to § 4.5: "at 600 units, faction identification must work from silhouette + tint at typical zoom; no unit relies on text labels alone." This prevents the classic late-game blur where friendly and enemy armies become indistinguishable.
3. **World-space bar budget:** cap uGUI world-space bars (health bars) to units in viewport + selection, not all 600 units - a bar per unit off-screen is wasted UI work. One line in § 4.5.
4. **Placeholder discipline is good; make the swap task explicit** - already is (P2T30, free art integration with placeholder replacement). Keep it last so art never blocks logic.

## Verdict

**PASS** - the plan's visual contract is buildable as-is and respects every design-relevant research verdict. Fixes 1-3 are one-line addenda to § 4.5 that bind am-design at 2C/2F; none change milestone structure.

## Pass/fail checklist

- [x] Rendering contract (atlased material per faction, SRP Batcher, no skinned units)
- [x] HUD split (UI Toolkit vs uGUI) per Unity guidance
- [x] FoW visual language + minimap consistency
- [x] Selection feedback at scale (per-instance tint)
- [x] Placeholder-first art flow with a named swap task
- [ ] FIX: unit readability at 600 units (silhouette + tint, no text reliance)
- [ ] FIX: world-space bar budget (viewport + selection only)