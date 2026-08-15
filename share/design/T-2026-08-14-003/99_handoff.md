# Design Handoff - T-2026-08-14-003 (P2)

**From:** am-design
**To:** am-coder (P2a parallel, P2b vision), am-coder (P9 HUD), am-review (gate)
**Date:** 2026-08-14
**Artifacts:**

- `share/design/T-2026-08-14-003/00_brief.md` - discovery answers (7 questions)
- `share/design/T-2026-08-14-003/01_preset_schemas.md` - P0 deliverable (existing)
- `share/design/T-2026-08-14-003/02_visual_style_HUD.md` - THIS phase: palette, placeholder unit map, FoW visual contract, HUD wireframes (pre/in/post), data contracts
- `share/design/T-2026-08-14-003/99_handoff.md` - this file

## How to use (for am-coder)

Read section 2 (placeholder unit map) before building any prefab: shape =
type, color = team, scale = subtype. One shared URP Lit material tinted via
MaterialPropertyBlock keeps prefabs material-free and SRP Batcher-friendly;
do not create 13 materials. Build the P2 HUD slice as exactly two TMP texts
(gold, XP+level) bound to GoldXpManager events; do not build panels, bars,
timer, or ability slots now (all P9). For the P2b vision overlay, implement
the layer order and FOG/BRUSH colors from section 2 as-is; overlay geometry
(quad vs chunks) is your call. Nothing here implies balance: no color may
encode strength or bounty (R4).

## Top 3 things NOT to do

1. Do not add textures, custom shaders, or per-unit materials at P2 (flat
   URP Lit + MaterialPropertyBlock only).
2. Do not encode subtype or power in color: caster vs melee is scale only,
   team color is identity only.
3. Do not build HUD elements 1-2, 5-8 in P2 (timer, wave, vision chip, bars,
   ability slots are P9; ability data does not exist until P4).

## Open questions for master

- Ability hotkeys: dispatch says Q/E/R/T (unusual; standard MOBA is QWER).
  P2 doc follows the dispatch; P9 input remap can change bindings. No action
  needed unless the user wants QWER.

## Self-critique

- Palette locked as named tokens (no inline hex outside this doc, which is
  the token source for the project): pass.
- Placeholder unit map names every unit with primitive + color: pass.
- HUD covers pre/in/post with P2/P9/P10 markers: pass.
- Data contracts map every visual to a producer system: pass (17 rows).
- ASCII-only: scan run, em_dash_count=0: pass.
- No source code, no Unity assets written: pass.
- Contrast: all HUD text pairs >= 7:1; PLAYER on GROUND 3.6:1 (world accent,
  passes 3:1 large/UI bar): pass.
- Strict separation: only `share/design/T-2026-08-14-003/**` written: pass.

STATUS: DONE