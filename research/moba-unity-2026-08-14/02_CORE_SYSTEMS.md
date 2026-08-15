# 02 - Core Systems

**Angle:** core | **Findings:** 20 | **Sources:** S2-S23, S50-S57, S124 | **Verdict:** Seven systems, each with a USE/AVOID verdict; the binding ADRs (Unity 6.3 LTS + URP, GameObject/SO/event bus, versioned DTO saves) shape every system.

---

## 1. Champion control (movement, abilities, input)

**Sources:** S2 (Input System), S3 (Touch), S22 (CharacterController), S24, S36-S38, S53, S61.

**Verdict: USE** - CharacterController [S22] for movement (capsule, grounded, no rigidbody physics for champions), Unity Input System [S2] with both keyboard/mouse and Touch [S3] action maps so Q1's platform decision does not block control work. Mouse-move (point-and-click) is the genre default for desktop; virtual joystick only if Android-first wins Q1.

**Design notes:**
- Abilities: ScriptableObject-defined ability data (cooldown, range, cast time, projectile archetype) with a component event bus for cooldown/energy updates (ADR 3). S86/S87 warn about NavMesh agent jitter in Unity 6 for pursuit; use steering on the NavMesh result path [S20] or a manual pursuit override, not raw SetDestination [S21] for chase logic.
- Ability profile is an open question (Q12): standard projectiles (easy) vs channeled/returning abilities (needs per-ability dodge rules in the AI, 03).

**Risk:** MEDIUM - control feel is the #1 genre expectation; input latency and jitter degrade it. Mitigate with the steering override above and a perf budget in 05.

## 2. Minions

**Sources:** S36 (LoL minions), S58 (MLBB minions), S90, S124.

**Verdict: USE** - LoL aggro rules [S36] as the baseline: 3 melee + 3 caster per wave per lane, 30s spawn cadence, aggro on nearest / on champion attack. MLBB's simplified minion set [S58] as the fallback if wave management proves too deep for bots.

**Design notes:**
- Unit count: ~10 minions per lane x 3 lanes = ~30-40 active at once; trivial for ECS-free architecture (ADR 3). DOTS only if horde modes are added later (out of scope).
- Minion AI: shared steering with champions (simple state machine: move to wave, target nearest, aggro switch). No NavMesh needed per-unit if lanes are corridors; NavMesh optional for jungle creeps.
- Last-hit gold tension [S43] is the pacing engine; minion HP must be tuned so the player can last-hit consistently (07 phase P3 gate).

**Risk:** LOW - aggro rules are well documented; the risk is tuning, not design.

## 3. Towers and objectives

**Sources:** S38 (LoL turrets), S59 (MLBB Turtle/Lord), S55 (inhibitors).

**Verdict: USE** - LoL turret model [S38]: minion-first targeting, amplifying damage on consecutive champion hits, turret range and vision cone. Objectives (Turtle/Lord style [S59]) only if Q4/Q5 want them at MVP; otherwise defer to post-MVP (07).

**Design notes:**
- Inhibitor/backdoor rules [S55] are optional; skip at MVP (YAGNI until the lane loop proves fun).
- Objective timers are a design decision (14:00/20:00 wiki timings for Baron [S36-adjacent adjudication] vs 16:00/25:00 community claims; we adopt wiki 14:00/20:00 as default in 07).

**Risk:** MEDIUM - objective timers interact with AI lane assignment (03); changing them post-build ripples. Lock the timer table in the plan phase (07 P2).

## 4. Vision, brush, wards

**Sources:** S41 (LoL wards), S53 (LoL brush), S54 (sight), S61 (MLBB bush).

**Verdict: USE** - Fog of war via limited view cone [S54], brush hides units [S53]. Wards as consumables [S41] at MVP only if Q11 wants them; otherwise brush-only vision (simpler, fewer item systems).

**Design notes:**
- Brush rules: units in brush are invisible to enemies unless revealed (attack/cast reveals briefly). MLBB's simpler bush [S61] is the default if Q11 picks simplified.
- Rendering: fog of war is a shader/stencil pass in URP; keep it a single full-screen effect (05) - no per-unit visibility checks in Update.

**Risk:** LOW - vision is self-contained; the risk is render cost, mitigated by URP settings.

## 5. Gold, XP, items

**Sources:** S43 (LoL gold), S50 (damage), S51 (armor), S52 (crit), S56 (experience), S57 (controls), S124.

**Verdict: USE** - Passive gold + last-hit gold + kill bounties [S43]; XP curve per [S56]. Item shop at MVP: 5-10 items only (Q12-adjacent scope call), stat formulas per [S50, S51, S52] (damage/armor/crit are the three formulas that matter).

**Design notes:**
- No BinaryFormatter for save data (ADR 4): gold/XP/items persist as versioned DTO JSON with custom serializers.
- Item economy must be tuned against match length (Q3); MLBB's compressed ramp [S65] if 10-min target.

**Risk:** MEDIUM - item balance is the classic tuning trap; keep the item count tiny at MVP (07 P4 gate: 5 items, then extend).

## 6. Save/load

**Sources:** S124 (prior dossier save architecture), ADR 4.

**Verdict: USE** - Versioned DTO saves with custom serializers. Semantics are Q10: mid-match snapshot vs match-complete progression vs both. Default recommendation: match-complete progression (level unlocks, hero unlocks) plus a mid-match checkpoint save (crash recovery) - both are cheap with DTOs.

**Design notes:**
- Save on: match complete, checkpoint every N minutes, settings change. Load validates schema version and migrates.
- Never write save files mid-frame; queue to a dedicated writer.

**Risk:** MEDIUM - save corruption is a trust-killer; mitigate with version field + write-to-temp-then-rename.

## 7. Settings and platform

**Sources:** S13 (quality settings), S32 (WR min specs), S5-S6 (instancing/batcher), S8-S9 (Burst/Jobs), S15 (pooling), S16 (mobile perf guide), S17 (ADPF).

**Verdict: USE** - Quality settings via URP asset tiers [S13]; performance budget table in 05 (draw calls, memory, frame pacing) following WR discipline [S32]. Object pooling [S15] for projectiles/effects; GPU instancing [S5] + SRP Batcher [S6] for minion swarms; Burst/Jobs [S8, S9] only where profiling demands (not by default - ADR 3).

**Design notes:**
- Input remapping: Input System action maps expose remap UI cheaply; ship it (accessibility basic).
- Platform is Q1; settings screen is built once against the action map abstraction, so platform choice does not fork the settings system.

**Risk:** LOW - all documented techniques; risk is only over-engineering (Burst/Jobs before profiling = wasted effort; the ponytail rule: profile first, optimize second).

## Cross-system integration

- Event bus (ADR 3) carries: gold/XP events (HUD), minion death (gold awards), tower destroyed (objective timers), vision reveals (brush), save triggers. No direct references between systems; the bus keeps 02 chapters decoupled from 03 AI.
- All seven systems have a phase gate in 07 (P2-P6); none are built before the previous gate passes.