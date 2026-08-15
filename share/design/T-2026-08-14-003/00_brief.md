# Design Brief - T-2026-08-14-003 (P2)

**Task:** T-2026-08-14-003 (Local single-player MOBA, Unity 6.3 LTS URP)
**Phase:** P2 (Core sim MVP lane loop) - am-design lane, parallel with am-coder P2a
**Sub-agent:** am-design
**Date:** 2026-08-14
**Plan anchor:** `share/notes/02_plan_T-2026-08-14-003.md` line 102 (visual style + placeholder look + HUD wireframe)

## 7-question discovery

1. **Medium:** desktop (primary, keyboard/mouse) + Android (day-one mobile budget, Q1). HUD carries a touch-layout placeholder note; full touch tuning is P9.
2. **Audience:** agent-am-coder (P2a parallel build + P9 HUD implementation), am-review (gate), am-assets (P11 free-art swap).
3. **Constraints:** Unity 6.3 LTS URP (Lit materials), free stack only (Q7), no textures at P2, no source code and no Unity assets in this deliverable, ASCII-only docs (repo rule, no em/en dashes), risk R4: colors must never imply balance meaning (team identity only), vision logic is P2b's lane (this doc specs the visual contract only).
4. **Artifact set:** style direction + placeholder look spec + HUD wireframe (single design doc, plain-text diagrams, no code blocks).
5. **Mode set:** BRAND (palette/identity) + SYSTEMIZE (placeholder unit spec) + MOCK-lite (wireframe).
6. **Scope tier:** S (one design doc; HUD implementation is P9, menu is P10).
7. **Success criteria:** every placeholder unit named with primitive + color; HUD wireframe covers pre-match / in-match / post-match; zero source code; ASCII-clean scan (no U+2014); metrics footer; every HUD element mapped to its data producer.

## Inputs read

- `share/notes/02_plan_T-2026-08-14-003.md` - P2 (lines 93-107), P9, section 5 DoD, section 6 risk R4.
- `share/design/T-2026-08-14-003/01_preset_schemas.md` - preset SO schemas (MatchSettings band, VisionRuleset state).
- `unity-moba/README.md` + `unity-moba/Assets/Art/README.md` - conventions (placeholder folders, URP Lit, ASCII scan).
- `research/moba-unity-2026-08-14/` - dossier (read-only; 02 core systems for event-bus HUD data, 07 build guide for phase ownership).

## Assumptions

- Ability keys default to Q/E/R/T per dispatch (P9 input remap may move them; slots are labeled 1-4).
- Allied AI bots (P7) share the player team color; only the player hero gets the accent treatment (slightly taller capsule), allies use the same PLAYER blue.
- One shared URP Lit material tinted per-instance (MaterialPropertyBlock) is the recommended material approach; final prefab wiring is am-coder's choice.

## Metrics

- scope_tier=S
- modes_used=BRAND,SYSTEMIZE,MOCK
- mediums_used=desktop,android
- audience=agent-am-coder
