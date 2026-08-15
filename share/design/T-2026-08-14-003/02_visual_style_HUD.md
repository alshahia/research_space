# Visual Style + Placeholder Look + HUD Wireframe - T-2026-08-14-003 (P2)

**Task:** T-2026-08-14-003
**Phase:** P2 (Core sim MVP lane loop), am-design lane
**Sub-agent:** am-design
**Date:** 2026-08-14
**Consumers:** am-coder (P2a parallel + P2b vision overlay), am-coder (P9 HUD), am-assets (P11 art swap), am-review (gate)
**Plan anchors:** plan line 102; preset schemas doc `01_preset_schemas.md` (MatchSettings band, VisionRuleset state)

This document is the design contract for the placeholder look and the HUD.
It contains no source code and no Unity assets. am-coder builds prefabs,
materials, and UI from the tables and diagrams below. Plain-text diagrams are
intentional (repo ASCII rule); they are not code blocks.

---

## 1. Visual style direction

**Target.** A dark, high-contrast arena floor with saturated team accents, so
unit identity reads at a glance during fast playtesting. The whole look is
placeholder-grade on purpose: flat colors, primitives, zero textures. Nothing
in the look may imply balance (risk R4): colors are team identity only, never
strength, rarity, or bounty.

**Palette (13 named colors).**

| Token | Hex | Use |
|---|---|---|
| GROUND | #2A2E33 | arena floor base tint |
| FOG | #0B0D10 | un-revealed area overlay (alpha 0.92) |
| BRUSH | #2E7D32 | bush discs (vision placeholder) |
| PLAYER | #3D7BFF | player hero capsule; player team identity (allied bots P7) |
| ENEMY | #E84A4A | enemy hero capsules |
| MINION_PLAYER | #7FB2FF | player team minion cubes |
| MINION_ENEMY | #FF8A80 | enemy team minion cubes |
| TOWER | #8A94A0 | tower cylinder body (both sides) |
| GOLD | #F5C542 | HUD gold counter; XP accent |
| INK | #E8EAED | HUD text |
| PANEL | #14171C | HUD panel background |
| HP | #46C14B | health bar fill |
| MP | #4AA3FF | mana bar fill |

Contrast check (rule 14): INK on PANEL ~15:1, GOLD on PANEL ~11:1, HP on
PANEL ~8:1, MP on PANEL ~7:1 (all above the 4.5:1 text bar). PLAYER on GROUND
~3.6:1: a world-space accent, not text; acceptable at the 3:1 large/UI bar.

**Primitive-shape placeholder language (matches am-coder prefabs).**

| Type | Primitive | Color | Notes |
|---|---|---|---|
| Player hero | capsule | PLAYER | 20% taller than enemy capsules (player accent only) |
| Enemy hero | capsule | ENEMY | |
| Minion melee | cube | team minion color | 3 per wave |
| Minion caster | cube, 0.7x scale | team minion color | 3 per wave; subtype = scale only, never color |
| Tower | cylinder | TOWER body + team-color band at top | band = PLAYER or ENEMY |
| Projectile | sphere | caster team color (PLAYER/ENEMY) | Q12 standard projectiles |
| Bush | flattened disc (short wide cylinder) | BRUSH | sits on the floor |

Shape encodes unit type, color encodes team, scale encodes subtype. Caster
cubes are smaller but the same color as melee cubes: a size difference reads
as composition, a color difference would read as power (R4).

**Material approach.** One shared URP Lit material (white albedo, smoothness
~0.05, no metallic, no emissive, no texture) tinted per unit at spawn via
MaterialPropertyBlock color. This keeps prefabs material-free, keeps SRP
Batcher happy for minion swarms, and makes the P11 free-art swap a
per-prefab replacement, not a material-system rewrite. Tower team band may
use a second tinted sub-mesh (cylinder top ring) with the same shared
material. No custom shaders (Art README default).

**Target aesthetic for free-art integration (P11).** The eventual art should
keep this readability contract: dark neutral arena floor, saturated blue vs
red team sides, unit type readable from silhouette at lane distance, flat
stylized low-poly material (URP Lit, no PBR texture spam) so the 60 fps
desktop / 30 fps Android budget survives. Camera framing, HUD geometry, and
token names are designed so P11 swaps materials and meshes only; it must not
touch gameplay code or HUD layout.

---

## 2. Placeholder look spec (unit map)

| Unit | Primitive | Base color | Team color source | Notes |
|---|---|---|---|---|
| Player hero | capsule | PLAYER | n/a | always revealed by vision |
| Enemy hero | capsule | ENEMY | n/a | hidden in brush per ruleset |
| Allied bot hero (P7) | capsule | PLAYER | n/a | same color as player; P7 distinguishes by name tag |
| Melee minion (player) | cube | MINION_PLAYER | PLAYER family | |
| Caster minion (player) | cube 0.7x | MINION_PLAYER | PLAYER family | |
| Melee minion (enemy) | cube | MINION_ENEMY | ENEMY family | |
| Caster minion (enemy) | cube 0.7x | MINION_ENEMY | ENEMY family | |
| Tower (player side) | cylinder | TOWER + PLAYER band | PLAYER | LoL turret model (minion-first) |
| Tower (enemy side) | cylinder | TOWER + ENEMY band | ENEMY | |
| Projectile | sphere | PLAYER or ENEMY | caster team | |
| Bush | disc | BRUSH | n/a | brush = vision feature, not a unit |

Player-hero distinction rule: exactly one capsule with PLAYER color + taller
scale belongs to the player; enemy capsules are ENEMY; allied bots (P7) reuse
PLAYER. Minion team colors are lighter tints of their hero family so heroes
pop against waves at lane distance.

**Fog-of-war / vision placeholder visual contract (P2b owns logic; this is
the visual side).**

- Layer order (bottom to top): GROUND floor -> BRUSH discs -> units ->
  FOG overlay -> HUD.
- State UNREVEALED: FOG overlay drawn over the area (flat PANEL-dark
  quad, color FOG, alpha 0.92); units under it are not drawn.
- State REVEALED: no overlay; units visible.
- Optional linger state (revealTimerSec from VisionRuleset, default 2.0):
  fading chunk at alpha 0.5 for the linger duration after a unit leaves
  brush. If this is not trivial in P2b, ship instant on/off and add linger
  at P9; the contract is alpha 0.5 linger, not a hard requirement now.
- Brush hiding is per-unit, independent of chunk reveal: a unit standing in
  a BRUSH disc is hidden from the other team unless trueSightActive
  (VisionRuleset field) applies (tower true sight radius).
- The player hero is always revealed (its own chunk + itself).
- Data source: VisibilityGrid reveal state per chunk; changes surface via
  EventBus vision-reveal events (dossier 02 line 94: "vision reveals
  (brush)" are bus events). Overlay rendering technique (single full-map
  quad vs per-chunk quads) is am-coder's choice; this doc only fixes color,
  alpha, layer order, and state semantics.
- The AI reads the same grid as the player (VisionRuleset aiSharesPlayerVision,
  risk R10); no separate AI vision visual.

---

## 3. HUD wireframe

Phase markers: P2 = built now (P2 acceptance: gold/XP feed a HUD counter),
P9 = full HUD implementation, P10 = menu/results. Diagrams are plain text.

**Pre-match (placeholder; full menu + preset pickers are P10).**

PRE-MATCH - PRESET SELECT (PLACEHOLDER)
+----------------------------------------------------+
|  LOCAL MOBA - single player                         |
|                                                    |
|  Duration     : MLBB 10-12 min            [EDIT]   |
|  Lane layout  : Symmetric 1-1-1-2         [EDIT]   |
|  Vision       : MLBB Simplified Bush      [EDIT]   |
|  Difficulty   : Medium                    [EDIT]   |
|                                                    |
|  value summary line under each row, e.g.           |
|  "band 10-20 min, first wave 0:10, wave 30s"       |
|                                                    |
|  [ START MATCH ]   P2: bare button, loads LaneScene|
+----------------------------------------------------+

- P2: the four rows render preset displayName + one summary line from each
  preset asset; START MATCH button (bare, loads LaneScene with the four
  selected assets). Selection state = 4 presetIds, stored for save (P8).
- P10: full picker UIs replace [EDIT]; hero unlock + match-complete screen.

**In-match (desktop reference layout; touch note below).**

IN-MATCH HUD
+----------------------------------------------------------+
| 08:42   LANE 1            GOLD 1250  XP 310  LVL 6       |
| wave in 12s               VISION: SIMPLIFIED BUSH [o]    |
|                                                          |
|   (empty game viewport - world renders here)             |
|                                                          |
|                                                          |
| [ HP #########--- ]  [ MP ######------ ]                 |
|                                                          |
|     [Q]    [W]    [E]    [R]                             |
|   slot1   slot2   slot3   slot4  (cooldown overlay)      |
+----------------------------------------------------------+

Element list with phase + producer:

| # | Element | Content | Phase | Data producer |
|---|---|---|---|---|
| 1 | Match timer | MM:SS elapsed + band label ("MLBB 10-12 min") | P9 | MatchManager / PacingTimer |
| 2 | Wave countdown | "wave in 12s" (next wave) | P9 | WaveScheduler (PacingTimer) |
| 3 | Gold counter | integer gold | P2 | GoldXpManager |
| 4 | XP counter + level | XP number + LVL badge | P2 | GoldXpManager |
| 5 | Vision chip | active VisionRuleset displayName + brush state dot | P9 | VisionRuleset + VisibilityGrid |
| 6 | Health bar | HP fill (HP color) | P9 | Health (Combat) |
| 7 | Mana bar | MP fill (MP color) | P9 | Attribute/Ability (P4) |
| 8 | Ability slots 1-4 | keys Q/E/R/T, cooldown overlay | P9 | Ability system (P4) |

- P2 slice: elements 3 + 4 only (two TMP texts, no panels). Everything else
  is P9 (plan: HUD is P9 implementation; P2 acceptance is the gold/XP
  counter only).
- Match timer reads the MatchSettings band: elapsed from PacingTimer,
  band label from preset displayName; at durationCeilingMin the timer
  switches to a warning style (INK on HP fill) - ceiling logic is
  MatchManager's, the visual state is P9.
- Touch layout placeholder note: on Android the ability row sits in the
  bottom-right thumb zone (same 4 slots), HP/MP bars above the row, virtual
  joystick bottom-left. Exact positions, deadzones, and joystick visuals are
  P9 mobile tuning (risk R8); the P2 contract is only that data bindings
  (elements 3-8) are device-independent.
- Cooldown overlay: dark radial/rectangular fill over the slot (INK at
  alpha 0.6), driven by per-ability cooldownRemainingSec (P4).

**Post-match (result placeholder; full results screen is P10).**

POST-MATCH - RESULT (PLACEHOLDER)
+----------------------------------------------------+
|              MATCH OVER                             |
|              [ DEFEAT ]  or  [ VICTORY ]            |
|                                                    |
|  duration  08:42                                   |
|  gold      1250                                    |
|  XP        310                                     |
|  level     6                                       |
|                                                    |
|  [PLACEHOLDER - P10 adds progression unlock data]  |
|                                                    |
|  [ RETURN TO MENU ]  (P10; P2 stub button optional)|
+----------------------------------------------------+

- P10 owns the real results screen (hero unlock + progression, plan P10).
- Data contract locked now so P2 sim can emit it: result enum (VICTORY /
  DEFEAT, decided by MatchManager: durationCeiling reached or lane
  objective destroyed) + match totals (gold, XP, level) from
  GoldXpManager.

---

## 4. Consumed-by contract (visual element -> data producer)

| Visual element | Producer system | Data fields the visual reads |
|---|---|---|
| Player/enemy hero capsule | prefab config (static) | team enum at spawn (P2a) |
| Minion cubes | prefab config + WaveScheduler | team enum, melee/caster subtype (scale) |
| Tower cylinder + band | prefab config + TowerBehaviour | team enum; HP bar state P9 (world-space optional) |
| Projectile sphere | Combat (Projectile) | caster team enum |
| Bush disc | Map generation (static) + VisibilityGrid | brush cell occupancy |
| FOG overlay | VisibilityGrid | chunk reveal state + linger; VisionRevealEvent on EventBus |
| Gold counter | GoldXpManager | gold (passiveGoldPer10s + lastHitGold + ramp, MatchSettings) |
| XP counter + LVL | GoldXpManager | xp, level (xpPerMinion + XP curve, MatchSettings) |
| Match timer + band | MatchManager / PacingTimer | elapsedSec, targetDurationMin, durationCeilingMin, preset displayName |
| Wave countdown | WaveScheduler (PacingTimer) | nextWaveInSec, firstWaveTimeSec, waveIntervalSec |
| HP bar | Health (Combat) | currentHp, maxHp (damage events via EventBus) |
| Mana bar | Attribute (P4) | currentMana, maxMana (placeholder 0/0 until P4) |
| Ability slots | Ability system (P4) | 4 ability refs + cooldownRemainingSec (locked slots render at P9) |
| Vision chip | VisionRuleset + VisibilityGrid | displayName, playerBushState, lingerRemaining |
| Pre-match rows | Preset SOs + SaveManager (P8) | displayName + summary fields + presetId |
| Post-match screen | MatchManager + GoldXpManager | result enum, matchDurationSec, totalGold, totalXp, level |

HUD data flow rule: all producers publish through the EventBus (gold/XP
events, minion death, vision reveals - dossier 02 line 94); the HUD never
polls systems directly and never mutates sim state. This keeps the P2
counter slice decoupled from the P9 full HUD.

---

## 5. Exit gate checklist (this document)

- Every placeholder unit named: player hero, enemy hero, allied bot (P7),
  melee minion, caster minion, tower, projectile, bush: yes (section 2).
- Primitive + color for every unit: yes.
- HUD wireframe covers pre-match / in-match / post-match: yes (section 3).
- P2 / P9 / P10 markers on every HUD element: yes (section 3 tables).
- No source code, no Unity assets: yes.
- ASCII-only (no U+2014): verified by scan.
- Metrics footer: below.
- Data contract visual -> system: yes (section 4, 17 rows).

## Metrics

- palette_colors=13
- placeholder_primitives=7
- placeholder_units=11
- hud_elements_prematch=5
- hud_elements_inmatch=8
- ability_slots=4
- hud_elements_postmatch=5
- data_contracts=17
- phases_marked=P2,P9,P10
- contrast_text_min=7:1
- contrast_accent_min=3.6:1
- scope_tier=S
- modes_used=BRAND,SYSTEMIZE,MOCK
- mediums_used=desktop,android
- em_dash_count=0