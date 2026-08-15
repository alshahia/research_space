# Preset Schemas - T-2026-08-14-003 (P0)

**Task:** T-2026-08-14-003
**Phase:** P0 (Freeze ADRs, scope, and preset schemas)
**Sub-agent:** am-design
**Date:** 2026-08-14
**Medium:** desktop + Android (Q1 day-one), web-responsive N/A, brand N/A
**Audience:** am-coder (reference implementation), am-review (gate), master (dispatch)
**Scope tier:** S (design doc only, no screens)

## Purpose

This document defines the four ScriptableObject (SO) preset families that make
the game data-driven from day one (Q3/Q4/Q6/Q11). Each preset is user-selectable
in the P10 pre-match menu and is read by core systems. No hardcoded
lanes/duration/vision/team-size anywhere. Defaults follow plan section 7: MLBB
10-12 min duration band, symmetric 1-1-1-2 lane layout, MLBB simplified bush
vision, difficulty Easy/Medium/Hard plus Merciless cheat tier.

Field values are starting points (plan risk R4): numbers are 2026-08-14
snapshots and are tunable in the SO assets, not contracts.

This is a design document only. No C# source code is included; reference
implementations are am-coder's job.

## Preset family summary (plan section 2 table)

| Preset family | Question | Default asset | Consumed by |
|---|---|---|---|
| `MatchSettings` | Q3 duration | MLBB 10-12 min | MatchManager, PacingTimer, economy, towers, bots |
| `LaneLayout` | Q4 layout | symmetric 1-1-1-2 duo | map generation, LaneAssignment, economy |
| `VisionRuleset` | Q11 vision | MLBB simplified bush | Vision system, FogOfWar, reveal timers, ward items |
| `DifficultyPreset` | Q6 difficulty | honest base (Medium) | DifficultyGovernor dials |

---

## 1. MatchSettings

Controls match pacing and the Q3 duration band. Consumed at match start by
MatchManager and by the PacingTimer that drives the whole economy/tower/robot
schedule. All time-based tuning (minion HP, gold ramp, XP curve, tower HP, bot
pacing) is derived from this preset's band.

### Schema fields

| Field | Type | Allowed range | Default | Notes |
|---|---|---|---|---|
| presetId | string | unique, [a-zA-Z0-9_-] | "mlbb_10_12" | Asset identity used by save + menu |
| displayName | string | 1-40 chars | "MLBB 10-12 min" | Menu label, no hardcoded name in code |
| targetDurationMin | float | 1.0 - 60.0 | 10.0 | Design-center match length |
| durationCeilingMin | float | targetDurationMin - 90.0 | 20.0 | Hard ceiling, rejects stagnation |
| firstWaveTimeSec | float | 0.0 - 120.0 | 10.0 | MLBB compression: first wave early (research chapter 01) |
| waveIntervalSec | float | 5.0 - 90.0 | 30.0 | Refresh cadence |
| meleePerWave | int | 0 - 10 | 3 | Wave composition |
| casterPerWave | int | 0 - 10 | 3 | Wave composition |
| siegePerWave | int | 0 - 5 | 0 | MVP zero; scale to 5v5 later |
| passiveGoldPer10s | float | 0.0 - 200.0 | 20.4 | Passive income (research S43) |
| passiveGoldStartSec | float | 0.0 - 300.0 | 110.0 | 1:50 start per research S43 |
| lastHitGold | float | 0.0 - 200.0 | 16.0 | Minion last-hit value |
| xpPerMinion | float | 0.0 - 200.0 | 55.0 | XP source, drives level curve |
| towerBaseHp | float | 100 - 20000 | 2600 | LoL turret model baseline |
| towerMaxRampPct | float | 0.0 - 3.0 | 1.75 | Amplifying tower damage cap (S38) |
| goldRampPerMin | float | 0.0 - 10.0 | 0.5 | Gold curve slope across the band |
| teamSize | int | 1 - 5 | 1 | Q5 scaling: MVP 1, future 5 |
| respawnTimeBaseSec | float | 1.0 - 120.0 | 20.0 | Death timer base |

### Shipped assets

- **Default:** `MatchSettings_MLBB_10_12` (above defaults, 10-12 min band).
- **Variants:**
  - `MatchSettings_WildRift_15_20` - 15-20 min band, first wave 1:05, wave 30s,
    slower gold ramp, higher tower HP.
  - `MatchSettings_LoL_30Plus` - 30+ min band, first wave 1:05, passive gold
    start 1:50, strongest tower HP, steepest ramp.

### Consumers

- `MatchManager` - reads teamSize, builds roster, owns match lifecycle.
- `PacingTimer` - drives firstWaveTime, waveInterval, duration band, ceiling.
- `WaveScheduler` - wave composition per preset.
- `GoldXpManager` - passive gold, last-hit, XP curve, ramp.
- `TowerBehaviour` - tower HP + ramp constants.
- `Bot pacing` - AI tick budgets derived from the duration band.

---

## 2. LaneLayout

Controls the Q4 lane assignment and economy topology. Consumed by map
generation and the LaneAssignment system that places the 1 player lane and the
2-3 enemy heroes (Q5 MVP: 1 lane loop).

### Schema fields

| Field | Type | Allowed range | Default | Notes |
|---|---|---|---|---|
| presetId | string | unique, [a-zA-Z0-9_-] | "symmetric_1_1_1_2" | Asset identity |
| displayName | string | 1-40 chars | "Symmetric 1-1-1-2" | Menu label |
| laneCount | int | 1 - 3 | 1 | MVP 1; scale to 3 at 5v5 |
| layoutId | string | enum: symmetric / jungler / asymmetric | "symmetric" | Topology discriminator |
| lanes | list | 1-3 entries | [top, mid, bot] | Lane registry |
| assignmentByRole | list | role -> lane rows | (see note) | Hero-to-lane map |
| duoLaneIndex | int | -1 .. laneCount-1 | 1 | Bottom lane carries 2 (duo), -1 = none |
| hasJungler | bool | true/false | false | Jungler variant flag |
| jungleCampCount | int | 0 - 12 | 0 | Jungler economy size |
| asymmetricEconomy | bool | true/false | false | MLBB Gold/EXP lane split flag |
| goldLaneIndex | int | -1 .. laneCount-1 | -1 | Extra-gold lane, -1 = none |
| xpLaneIndex | int | -1 .. laneCount-1 | -1 | Extra-EXP lane, -1 = none |
| laneGoldBias | float | 0.0 - 3.0 | 1.0 | Multiplier on the gold lane |
| laneXpBias | float | 0.0 - 3.0 | 1.0 | Multiplier on the EXP lane |

Note on assignmentByRole: for MVP it is the single row {player: bot-lane, ai:
bot-lane} (duo). The lane list for a 1-lane loop is a single lane; the schema
keeps the list shape so a 3-lane map adds rows without a schema change.

### Shipped assets

- **Default:** `LaneLayout_Symmetric_1_1_1_2` (symmetric, duo bottom, no jungler,
  no asymmetric economy, 1 lane at MVP).
- **Variants:**
  - `LaneLayout_Jungler_1_1_1_1_1` - hasJungler true, jungleCampCount 5, no duo.
  - `LaneLayout_MLBB_Asymmetric` - asymmetricEconomy true, goldLaneIndex and
    xpLaneIndex set, laneGoldBias/laneXpBias active.

### Consumers

- `Map generation` - builds lane topology from laneCount + lane registry.
- `LaneAssignment` - places heroes per assignmentByRole + duoLaneIndex.
- `Economy` - applies laneGoldBias/laneXpBias per hero's assigned lane.
- `Minion pathing` - per-lane waypoints derived from lane registry (risk R11).

---

## 3. VisionRuleset

Controls the Q11 bush/vision rules. Consumed by the Vision system and
FogOfWar (brush reveal), the reveal timers, and the ward item definitions.

### Schema fields

| Field | Type | Allowed range | Default | Notes |
|---|---|---|---|---|
| presetId | string | unique, [a-zA-Z0-9_-] | "mlbb_simplified_bush" | Asset identity |
| displayName | string | 1-40 chars | "MLBB Simplified Bush" | Menu label |
| bushMode | string | enum: simplified / wards / full | "simplified" | Rule-set discriminator |
| bushRevealOnEnter | bool | true/false | true | Entering bush hides unit |
| bushRevealRadius | float | 0.0 - 100.0 | 15.0 | Reveal radius when inside |
| brushVisionShare | bool | true/false | true | Allies share brush vision |
| trueSightActive | bool | true/false | true | True sight ignores brush (S54) |
| trueSightRadius | float | 0.0 - 100.0 | 1000.0 | Tower true sight radius (S38) |
| wardEnabled | bool | true/false | false | Simplified set has no wards (YAGNI) |
| wardCountLimit | int | 0 - 10 | 0 | Wards variant only |
| wardRevealRadius | float | 0.0 - 100.0 | 30.0 | Ward variant only |
| revealTimerSec | float | 0.0 - 30.0 | 2.0 | Target reveal linger after leaving brush |
| aiSharesPlayerVision | bool | true/false | true | Risk R10: AI reads same FoW as player |

### Shipped assets

- **Default:** `VisionRuleset_MLBB_Simplified` (simplified bush, no wards,
  true sight on, shared vision).
- **Variants:**
  - `VisionRuleset_MLBB_NoWards` - bushMode simplified but wardEnabled false and
    trueSightActive true; tighter reveal timer (1.5s). Kept as a menu option
    that trims the default.
  - `VisionRuleset_LoL_WardsBrush` - bushMode full, wardEnabled true,
    wardCountLimit 3, wardRevealRadius 30, revealTimerSec 3.
  - `VisionRuleset_Custom` - editor-only variant exposing every field for the
    tuner; not surfaced in the default menu.

### Consumers

- `Vision system` (VisibilityGrid) - applies bushMode + reveal rules per tile.
- `FogOfWar` - reveal-on-enter + linger + true sight.
- `Reveal timer` - revealTimerSec linger after leaving brush.
- `Ward items` (ItemShop) - ward definitions gated by wardEnabled.

---

## 4. DifficultyPreset

Controls the Q6 hybrid difficulty: an honest base curve (Easy/Medium/Hard)
plus one optional Merciless cheat overlay. One governor, no separate AI
implementations (Q6/plan section 3 P7).

### Schema fields

| Field | Type | Allowed range | Default | Notes |
|---|---|---|---|---|
| presetId | string | unique, [a-zA-Z0-9_-] | "difficulty_medium" | Asset identity |
| displayName | string | 1-40 chars | "Medium" | Menu label |
| tierId | string | enum: easy / medium / hard / merciless | "medium" | Named tier discriminator |
| isCheatTier | bool | true/false | false | Merciless sets true; honest tiers false |
| reactionMs | float | 10 - 1000 | 300 | Decision latency dial (honest) |
| scanRateHz | float | 0.5 - 20.0 | 5.0 | Perception scan rate (honest) |
| predictionError | float | 0.0 - 5.0 | 1.0 | Lead-prediction aim error (honest, S69-71) |
| lastHitUncertaintyMs | float | 10 - 1000 | 200 | Last-hit window dial (S63) |
| dodgeReactionMs | float | 10 - 1000 | 400 | Skillshot dodge window (honest) |
| bonusGoldMult | float | 1.0 - 3.0 | 1.0 | Cheat overlay: gold multiplier |
| bonusXpMult | float | 1.0 - 3.0 | 1.0 | Cheat overlay: XP multiplier |
| bonusVisionRange | float | 0.0 - 500.0 | 0.0 | Cheat overlay: extra perception range |
| minionGoldMult | float | 1.0 - 3.0 | 1.0 | Cheat overlay: minion gold boost |
| alliedDeferLastHits | bool | true/false | true | Allied bots never steal player last-hits (P7) |

### Shipped assets

- **Default:** `DifficultyPreset_Medium` (honest base; table above, bonus
  multipliers at 1.0, isCheatTier false).
- **Variants:**
  - `DifficultyPreset_Easy` - reactionMs 500, scanRateHz 3, predictionError 2.5,
    lastHitUncertaintyMs 400, dodgeReactionMs 600.
  - `DifficultyPreset_Hard` - reactionMs 150, scanRateHz 8, predictionError 0.5,
    lastHitUncertaintyMs 100, dodgeReactionMs 250.
  - `DifficultyPreset_Merciless` - isCheatTier true, honest dials match Hard,
    bonusGoldMult 1.5, bonusXpMult 1.5, bonusVisionRange 200, minionGoldMult 1.3.

### Consumers

- `DifficultyGovernor` - reads tierId + isCheatTier to select honest dials vs
  cheat overlay (P7); cheats only active when isCheatTier true.
- `AiPerception` - scanRateHz, bonusVisionRange.
- `AiBrain` (micro) - reactionMs, dodgeReactionMs, lastHitUncertaintyMs,
  predictionError.
- `AlliedOverrides` - alliedDeferLastHits for the allied bot stack.
- `GoldXpManager` - bonusGoldMult, bonusXpMult, minionGoldMult (Merciless only).

---

## Cross-cutting notes

- **Data-driven everywhere (R4/R7):** no hardcoded lane/duration/vision/team-size
  names or values anywhere; menu labels come from displayName, tunables live in
  the SOs.
- **Q5 scaling:** MatchSettings.teamSize + LaneLayout.laneCount + the list
  shapes scale the MVP (1 hero, 1 lane, 2-3 enemies) to 5v5 without schema
  changes; 5v5 content is backlog, not built now.
- **Save/menu integration (P8/P10):** presetId is the stable key for save
  (Q10) and the P10 preset pickers; a fresh match reads the selected asset at
  start.
- **Free stack only (Q7):** these are plain SOs on the default SO pipeline; no
  third-party dependency, no Odin, no paid packages.

## Metrics

- presets=4
- default_assets=4
- variant_assets=10
- schema_fields_matchsettings=17
- schema_fields_lanelayout=14
- schema_fields_visionruleset=12
- schema_fields_difficultypreset=14
- consumers_matchsettings=5
- consumers_lanelayout=4
- consumers_visionruleset=4
- consumers_difficultypreset=5
- scope_tier=S
- modes_used=SYSTEMIZE
- mediums_used=desktop,android