# Research: Unity Core Systems for a LoL-Style MOBA (angle-core)

- Task: T-2026-08-14-003 | Angle: core systems | Date: 2026-08-14 | Status: DONE
- Model: deepseek-v4-flash-free | Lane: am-research
- Scope: hero controller, ability system, minions/turrets/lanes, economy/shop/save, camera/input, FoW deltas (brush, wards), USE/AVOID
- Method: DELTA research on prior dossier `research/unity-rts-2026-08-14/` (RTS verdicts cited, not re-researched). Default tools only (webfetch, Jina, wiki fetches). All sources accessed 2026-08-14.

## What we know

- Prior dossier verdicts (binding): GameObject/MonoBehaviour + plain C# state + ScriptableObject data + event bus is the default architecture; DOTS/ECS only at horde scale (research/unity-rts-2026-08-14/01_RTS_CORE_ARCHITECTURE.md:7-10). Movement abstraction is mandatory from Phase 1, NavMeshAgent (AI Navigation 2.0) proven for tens of agents, flow fields only at hundreds-to-thousands scale (01_RTS_CORE_ARCHITECTURE.md:33-37, 04_NEW_TECHNIQUES.md:22,67). Unity 6.3 LTS, URP, new Input System, AI Navigation 2.0 (04_NEW_TECHNIQUES.md:7-10). Save via JsonUtility or Json.NET, BinaryFormatter is DEAD (01_RTS_CORE_ARCHITECTURE.md:54-56). Object pooling for projectiles/effects/units (01_RTS_CORE_ARCHITECTURE.md:51). FoW: render-texture display + tile-based visibility grid as logic source of truth (01_RTS_CORE_ARCHITECTURE.md:41-42); AI must read the same FoW-restricted perception (02_OPPONENT_AI.md:19).
- MOBA loop facts (all from LoL wiki, access date 2026-08-14):
  - Minion waves: first wave from each Nexus at 1:05, then every 30s; wave = 3 melee + 3 caster + siege minion on a slower cadence [S1]. Wave gold value 125-195g; last-hit values melee 21g, caster 14g, siege 60g [S1]. Minion aggro = 7-step priority list, acquisition range about 500 units (1000 when an allied champion is attacked) [S1].
  - Turret: range 750, AD 182-350, MR 60-81, HP about 5000; +15% damage per successive hit (cap 175%, switch cap 130%); first-turret bonus 300g; outer turrets take 75% less damage for the first 5 minutes; true sight in 1000 range; nexus turrets respawn after 3 minutes [S2]. A turret switches to an enemy champion who damages an allied champion within 1400 range of the turret [S2].
  - Inhibitor: destroyed inhibitor respawns after 5 minutes; destroying it spawns super minions for 8 waves; last hit worth 50g [S7]. Victory condition is destroying the enemy Nexus [UNVERIFIED: Nexus HP not extracted; rule itself is the defining MOBA win condition].
  - Gold: passive income 20.4g per 10s from 1:50 [S5].
  - XP: champions level up to a cap of 18; leveling unlocks new abilities or higher ranks of existing abilities [S8]. One ability point per level and rank caps are the standard scheme [UNVERIFIED: implied by [S8], not quoted].
  - Damage pipeline order: percentage amplification, percentage reduction, flat reduction, resistances, resistance reduction, penetration [S4]. Resistance math: post-mitigation = raw / (1 + resist/100); 100 armor = 50% reduction, 200 = 66.6% (S16).
  - Critical strikes: average damage = base + critChance x (critMod - 1) x base; default crit modifier 175% [S17]. Spell vamp heals less on area damage [S4]. Lifesteal heals a percentage of damage dealt [UNVERIFIED: mechanic well documented but exact scope (basic attacks only vs on-hit) not quoted in extracted excerpts].
  - Brush (LoL): units inside brush are hidden from enemies outside; wards placed inside brush reveal it; attacking from brush reveals the attacker for 2s within 300 radius; enemies cannot target what they cannot see [S3]. Sight model: standard sight vs true sight (sees stealth) vs unobstructed vision (wards) vs nearsight [S24]. Wards are a stealth vision provider with limited range and duration [S25; exact LoL numbers not extracted].
  - MLBB bush (reference alternative): 0.25s conceal delay on entry (0.75s if the unit was sighted before entering), revealed for 3s after damaging an enemy hero, crossed-eye indicator while concealed, hidden from minimap [S6].
- Unity facts (docs 6000.0/1.13, access date 2026-08-14):
  - NavMeshAgent: SetDestination triggers a new path calculation; the path may take a few frames and pathPending stays true meanwhile [S11]. Manual-locomotion properties exist: updatePosition (default true), updateRotation, desiredVelocity, velocity, nextPosition, Move, remainingDistance, stoppingDistance, isStopped, pathStatus, isPathStale, autoRepath [S9]. NavMesh.CalculatePath is static and needs no agent [S10].
  - Unity 6 regression risk: community reports that in Unity 6, 6.1 and 6.2 beta every SetDestination call briefly pauses the agent (jitter on frequent retargeting) [S13]; the underlying behavior (velocity drops to 0 while pathPending) is long documented [S12]. Official docs confirm pathPending behavior but not the bug [S11].
  - CharacterController: Move and SimpleMove for kinematic steering with slope/collision handling [S14].
  - Physics.OverlapSphere: position, radius, layerMask, queryTriggerInteraction (supports trigger queries) [S15].
  - Input System 1.13: Touchscreen (low level) vs EnhancedTouch (high level); do not poll Touchscreen inside Update/FixedUpdate, use EnhancedTouch or actions [S23].
- Mobile MOBA control conventions (access date 2026-08-14): Wild Rift = dual virtual sticks: left joystick moves, right-side buttons cast abilities, skillshots aimed by drag-and-release, smart cast + target lock available [S19][S20][S21]. Pro settings: semi-locked camera, aim panning, ability mini-cam, portrait lock, low-health target priority [S22]. PC LoL: RMB = move/attack command, Shift+RMB = attack-move, LMB = select, scroll = zoom [S18]. Match length: LoL PC 30-40 min vs Wild Rift 15-20 min [S19][S20].

## What we don't know (clarifying questions)

- CQ1. Control scheme priority: PC point-and-click first, or PC + mobile touch from day one? (Changes input/camera scope; Wild Rift dual-stick pattern [S19][S20][S21] is the mobile reference.)
- CQ2. Mid-match save scope: full match snapshot (heroes, minions, turrets, timers, gold/XP, items, wards) vs save-on-exit checkpoints vs suspend-only? (Save DTO versioning is settled [P6]; scope is a product decision.)
- CQ3. Brush rule set: LoL rules (hide until attacking, 2s reveal in 300 radius, wards reveal inside) [S3] vs MLBB rules (0.25s delay, 3s reveal) [S6] vs simplified custom? (Must be explicit; rules differ materially.)
- CQ4. Ability rank scheme: LoL standard (1 point per level, max rank 5, ult rank 3) [S8] or simplified single-rank abilities?
- CQ5. Victory scope: destroy enemy Nexus only, or include surrender, difficulty gates, practice tool?
- CQ6. Target match length: LoL-like 30-40 min vs Wild Rift-like 15-20 min [S19][S20]? (Drives economy numbers, XP curve, camera pacing.)

## Risks

- Severity: high - Unity 6 NavMeshAgent SetDestination pause/jitter bug [S13] hits the feel-critical path (hero + 9 units retargeting constantly). Mitigation is a code discipline, not a workaround: only retarget when destination meaningfully changes, guard with pathPending/remainingDistance [S9][S11], keep manual locomotion (updatePosition=false + agent.Move or CharacterController.Move [S14]) as the fallback pattern.
- Severity: medium - 10 agents plus minion swarms on one NavMesh; many agents sharing a target degrade crowd quality (01_RTS_CORE_ARCHITECTURE.md:37). Mitigation: distinct agent radii/types, per-lane waypoint paths for minions, flow-field escape hatch (01_RTS_CORE_ARCHITECTURE.md:36).
- Severity: medium - Mobile drag-aim skillshots and target priority are the hardest input surface to get right (mis-taps, portrait lock, low-health priority [S22]); if mobile is in scope, budget polish time.
- Severity: medium - Brush/vision rules are easy to implement wrong (who can target whom, reveal timers, AI perception fairness seam 02_OPPONENT_AI.md:19); needs one explicit rule set (CQ3) plus tests.
- Severity: low - Full-state save snapshot risks missing a field; versioned DTO with tolerant loading [P6] handles it, but scope should be decided early (CQ2).
- Severity: low - Wiki numbers (turret HP, passive gold, siege cadence) are current-patch values and will drift from any specific LoL patch; treat as tuning constants, not contracts.

## Findings

### F1. System 1: Hero and unit movement (NavMeshAgent vs kinematic steering)

- NavMeshAgent is the proven MVP for pathfinding around walls/turrets (04_NEW_TECHNIQUES.md:22,67; 01_RTS_CORE_ARCHITECTURE.md:33-34). USE it for AI allies and enemy units.
- The player hero depends on control scheme (CQ1). PC: click-to-move via SetDestination works, but the Unity 6 retarget pause [S13] demands the discipline: set destination on click events only, never per frame; ignore SetDestination while pathPending [S11]; reuse isStopped/remainingDistance for arrival [S9]. Mobile: virtual joystick steering needs continuous retargeting or kinematic movement. Manual locomotion is supported: updatePosition=false, drive transform (or CharacterController.Move [S14]) and call agent.Move(nextPosition) so the simulation stays in sync [S9].
- AVOID: per-frame SetDestination spam on every unit (jitter [S13], crowd degradation [P4:37]); animator root motion fighting agent motion (documented failure mode in community threads).
- USE: NavMesh.CalculatePath (static, no agent) for preview/telegraph lines, e.g. showing the walk path [S10].

### F2. System 2: Ability system (SO data, damage, CC, buffs)

- Data-driven abilities via ScriptableObjects per prior verdict (01_RTS_CORE_ARCHITECTURE.md:7,48). USE SO assets for: ability stats (damage, range, cooldown, cost), item stats, champion stats. No codegen, no reflection.
- Damage pipeline: implement ONE DamageResolver that applies, in order: percentage amplification, percentage reduction, flat reduction, resistances, resistance reduction, penetration [S4]. USE the verified resistance math: post-mitigation = raw / (1 + resist/100) [S16]. Crit: average = base + chance x (mod - 1) x base with default mod 1.75 [S17].
- Projectiles and hit detection: USE pooled projectiles (01_RTS_CORE_ARCHITECTURE.md:51) with Physics.OverlapSphere for AoE/impact checks (position, radius, layerMask, queryTriggerInteraction [S15]); layer masks separate heroes/minions/turrets/wards. AVOID per-projectile raycasts when OverlapSphere suffices.
- Buffs/CC: timed modifier components on a single stats block (flat + percent), removed on expiry; CC types (stun/slow/root/knockup) as flags consumed by the movement and ability systems. Spell vamp applies reduced healing on area damage [S4]; lifesteal heals on damage dealt [UNVERIFIED scope].
- Leveling: level cap 18, level-up grants ability ranks [S8]; rank caps per CQ4.

### F3. System 3: Minions, turrets, inhibitors, lanes

- Wave scheduler: first wave at 1:05, every 30s thereafter, from each Nexus [S1]. Wave composition 3 melee + 3 caster + siege on cadence [S1; siege cadence UNVERIFIED, commonly every 3rd wave]. Pool minion prefabs [P5]. Lane AI: minimal state machine (advance to next enemy, attack nearest valid target, retreat on aggro rules). Minion targeting: implement the 7-step priority list and the 500/1000 unit acquisition ranges [S1] (this is also the AI fairness seam, 02_OPPONENT_AI.md:19).
- Turret logic: USE a single target-selector component implementing minion priority [S1] + champion switch rule (enemy champion damages allied champion within 1400 range of the turret [S2]). Per-hit damage ramp +15% cap 175%, switch cap 130%, first-5-min 75% outer reduction, first-turret 300g bonus [S2]. Turret true sight in 1000 range [S2] feeds the ward/stealth system (F6).
- Inhibitor: 5 min respawn timer, super minions for 8 waves, 50g last hit [S7]. Nexus turrets respawn after 3 min [S2]. Victory: destroy enemy Nexus (CQ5).
- AVOID: physics-based minion pathing; USE NavMesh + lane waypoints (F1 discipline applies to all agents).

### F4. System 4: Economy, shop, mid-match save

- Income: passive gold 20.4g/10s from 1:50 [S5] + last-hit rewards [S1] + first-turret bonus [S2] as event-bus events (01_RTS_CORE_ARCHITECTURE.md:9). Gold numbers as tuning constants (patch drift, risk LOW).
- Shop: SO item catalog; stat application = flat + percent deltas on the stats block so crit math [S17] and resist math [S16] hold for items too.
- Save/load: versioned DTO serialized via JsonUtility or Json.NET; BinaryFormatter forbidden (01_RTS_CORE_ARCHITECTURE.md:54-56). Mid-match snapshot covers: team gold/XP, hero stats/items/cooldowns/position, alive units with positions/HP/aggro, turret/inhibitor state + timers, wave phase, ward placements, brush-agnostic visibility tiles (01_RTS_CORE_ARCHITECTURE.md:42). Scope per CQ2. AVOID serializing Unity objects directly; serialize plain C# DTOs [P6].

### F5. System 5: Camera and input (PC vs mobile touch)

- PC scheme (reference [S18]): RMB move/attack, Shift+RMB attack-move, LMB select, scroll zoom; hotkeys for abilities/items. Input System named actions per dossier (04_NEW_TECHNIQUES.md:9).
- Mobile scheme (reference Wild Rift [S19][S20][S21]): left virtual joystick for movement, right-side buttons for abilities, drag-and-release for skillshot aim, optional smart cast/target lock. Pro settings worth exposing: semi-locked camera, aim panning, ability mini-cam, portrait lock, low-health target priority [S22].
- Input plumbing: USE EnhancedTouch or action-based touch (Touchscreen polling in Update/FixedUpdate is documented as wrong) [S23]. One action map covering keyboard/mouse + touch keeps both schemes in one codebase (CQ1).
- Camera: semi-locked follow (camera centered on hero, drag/edge-pan to offset) matches both LoL PC and Wild Rift conventions [S22][UNVERIFIED for LoL default lock state; space-to-center is the standard PC convention]. AVOID a fully locked camera; MOBA play needs look-ahead for skillshots.

### F6. System 6: FoW deltas: brush, wards, vision model

- Base FoW stays as the dossier verdict: render-texture visibility for display + tile-based visibility grid as logic source of truth (01_RTS_CORE_ARCHITECTURE.md:41-42), with AI perception reading the same restricted data (02_OPPONENT_AI.md:19).
- MOBA deltas on that base:
  - Brush tiles: a visibility override. Units in a brush tile are hidden from enemy vision unless the viewer is in the same brush or has true sight; attacking from brush reveals the attacker 2s in 300 radius (LoL [S3]) OR the MLBB variant (0.25s delay on entry, 3s reveal after damaging a hero [S6]). Pick one rule set (CQ3). Brush must also block targeting from outside (can't target what you can't see [S3]).
  - Wards: deployable stealth vision providers with limited range/duration [S25; exact LoL numbers UNVERIFIED]; USE true sight for turrets and detection units [S24][S2].
  - Minimap: conceal rule for brush units [S6] applies on the minimap layer too.
- AVOID: implementing brush as a second FoW system; make it a per-tile visibility flag on the existing grid [P7].

### F7. System 7: USE/AVOID summary

| System | USE | AVOID | Evidence |
|---|---|---|---|
| Movement | NavMeshAgent + movement abstraction; destination-on-change; manual locomotion fallback (updatePosition=false + Move) | Per-frame SetDestination; animator root motion vs agent fight | [S9][S11][S13][S14]; 01_RTS_CORE_ARCHITECTURE.md:33-37 |
| Abilities | SO data assets; one DamageResolver (amp/reduce/flat/resist/penetration); OverlapSphere hits; pooled projectiles | Scattered damage math; per-projectile raycasts; reflection-based effects | [S4][S15][S16][S17]; 01_RTS_CORE_ARCHITECTURE.md:7,51 |
| Minions/turrets | Wave scheduler 1:05/30s; pooled minions; priority-list target selector; turret ramp + switch rules | Physics pathing; custom per-minion A* | [S1][S2]; 01_RTS_CORE_ARCHITECTURE.md:33 |
| Economy/save | Event-bus gold events; SO items; versioned DTO + JsonUtility/Json.NET | BinaryFormatter; serializing Unity objects | [S5]; 01_RTS_CORE_ARCHITECTURE.md:54-56 |
| Camera/input | Named actions; EnhancedTouch for mobile; semi-locked follow + pan; dual-stick mobile layout | Touchscreen polling in Update; fully locked camera | [S18][S19][S20][S21][S23] |
| FoW deltas | Brush = per-tile visibility flag on existing grid; wards as stealth vision providers; true sight for turrets | Second FoW system; brush bypassing AI perception | [S3][S6][S24][S25]; 01_RTS_CORE_ARCHITECTURE.md:41-42; 02_OPPONENT_AI.md:19 |

## Feasibility verdict

FEASIBLE. Every system has a documented, sourced precedent: the game-feel mechanics (damage pipeline [S4], resist [S16], crit [S17], turret aggro [S2], minion aggro [S1], brush [S3]) are well specified and implementable as data-driven constants; the engine-side building blocks (NavMeshAgent [S9], CharacterController [S14], OverlapSphere [S15], Input System touch [S23]) are proven in the prior dossier [P4][P12]. The only high-severity risk (Unity 6 SetDestination jitter [S13]) has a known code discipline and a manual-locomotion fallback. No research block remains; three product decisions (CQ1, CQ2, CQ3) gate scope, not feasibility.

## Recommendations

1. Planner: sequence Phase 1 as movement abstraction + input (both PC and mobile action maps) + damage resolver, since everything else consumes them (01_RTS_CORE_ARCHITECTURE.md:33; 04_NEW_TECHNIQUES.md:108).
2. Coder: implement the SetDestination discipline from day one (retarget on change, pathPending guard, arrival via remainingDistance); treat updatePosition=false + agent.Move as the mobile-steering pattern [S9][S13].
3. Coder: single DamageResolver honoring [S4] order; resist formula raw / (1 + resist/100) [S16]; crit formula base + chance x (mod - 1) x base [S17]; expose all numbers as ScriptableObject tuning constants (patch drift).
4. Coder: turret/minion target selection as data tables matching [S1] priority and [S2] switch/ramp rules; reuse for AI fairness (02_OPPONENT_AI.md:19).
5. User (CQ3): pick one brush rule set before build; LoL [S3] is the more faithful reference, MLBB [S6] is the more forgiving one (delay + 3s reveal).
6. User (CQ2): decide save scope early; versioned DTO is settled, full-match snapshot is the lazy-correct default for local single-player.
7. Planner: route AI opponent behavior to angle-ai research; this file covers only the systems AI acts upon.

## Self-critique

- Unity 6 NavMeshAgent bug rests on community sources (YouTube tutorial [S13], forum [S12]); not found on the official bug tracker. It is corroborated by the official docs describing the pathPending pause [S11], and the mitigation is safe regardless.
- LoL Ward page was fetched but exact range/duration numbers were not extracted (search throttle); marked [UNVERIFIED]. Same for siege-minion cadence and Nexus HP. These are tuning constants, not architecture.
- Several well-known conventions (lifesteal scope, ability-point scheme, space-to-center camera) are marked [UNVERIFIED] where the fetched excerpts did not quote them; they are presented as design defaults to confirm, not as cited facts.
- Wiki values reflect the current LoL patch as of access date; they will drift. All values are framed as tuning constants.
- Research-only per boundary: no code, no tests (nothing to test yet); no external libraries proposed beyond the dossier-sanctioned Json.NET [P6], so no chub citations required.
- FoW line refs (01_RTS_CORE_ARCHITECTURE.md:41-42) and AI perception seam (02_OPPONENT_AI.md:19) were re-verified by grep during this session.

## Sources

Access date for all sources: 2026-08-14.

| ID | Source | URL |
|---|---|---|
| S1 | LoL Wiki: Minion | https://leagueoflegends.fandom.com/wiki/Minion |
| S2 | LoL Wiki: Turret | https://leagueoflegends.fandom.com/wiki/Turret |
| S3 | LoL Wiki: Brush | https://leagueoflegends.fandom.com/wiki/Brush |
| S4 | LoL Wiki: Damage | https://leagueoflegends.fandom.com/wiki/Damage |
| S5 | LoL Wiki: Gold | https://leagueoflegends.fandom.com/wiki/Gold |
| S6 | MLBB Wiki: Bush | https://mobile-legends.fandom.com/wiki/Bush |
| S7 | LoL Wiki: Inhibitor | https://leagueoflegends.fandom.com/wiki/Inhibitor |
| S8 | LoL Wiki: Experience (champion) | https://leagueoflegends.fandom.com/wiki/Experience_(champion) |
| S9 | Unity 6000.0: NavMeshAgent API | https://docs.unity3d.com/6000.0/Documentation/ScriptReference/AI.NavMeshAgent.html |
| S10 | Unity 6000.0: NavMesh.CalculatePath | https://docs.unity3d.com/6000.0/Documentation/ScriptReference/AI.NavMesh.CalculatePath.html |
| S11 | Unity 6000.0: NavMeshAgent.SetDestination | https://docs.unity3d.com/6000.0/Documentation/ScriptReference/AI.NavMeshAgent.SetDestination.html |
| S12 | Unity Discussions 733865 (2019-02-28): SetDestination stopping agents | https://discussions.unity.com/t/issues-with-navmeshagent-setdestination-stopping-agents/733865 |
| S13 | YouTube: FIX Jittery NavMeshAgent Movement in Unity 6 | https://www.youtube.com/watch?v=-egkBSkF_LA |
| S14 | Unity 6000.0: CharacterController | https://docs.unity3d.com/6000.0/Documentation/ScriptReference/CharacterController.html |
| S15 | Unity 6000.0: Physics.OverlapSphere | https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Physics.OverlapSphere.html |
| S16 | LoL Wiki: Armor | https://leagueoflegends.fandom.com/wiki/Armor |
| S17 | LoL Wiki: Critical strike | https://leagueoflegends.fandom.com/wiki/Critical_strike |
| S18 | LoL Wiki: Hotkeys and commands | https://leagueoflegends.fandom.com/wiki/Controls |
| S19 | ExitLag blog: Wild Rift guide (2026-02-25) | https://www.exitlag.com/blog/league-of-legends-wild-rift |
| S20 | Boosteria: Wild Rift vs LoL (2025-12-23) | https://boosteria.org/guides/rift-vs-league-differences |
| S21 | BuyAccount: Wild Rift vs LoL PC (2026-06-26) | https://buyaccount.gg/blog/wild-rift-vs-league-of-legends-pc |
| S22 | Yahoo Gaming SEA: Wild Rift control settings (2021-08-11) | https://sg.news.yahoo.com/how-to-wild-rift-controls-button-layout-settings-pro-134837982.html |
| S23 | Unity Input System 1.13: Touch manual | https://docs.unity3d.com/Packages/com.unity.inputsystem@1.13/manual/Touch.html |
| S24 | LoL Wiki: Sight | https://leagueoflegends.fandom.com/wiki/Sight |
| S25 | LoL Wiki: Ward | https://leagueoflegends.fandom.com/wiki/Ward |
| P1-P7 | Prior dossier: research/unity-rts-2026-08-14/ (01_RTS_CORE_ARCHITECTURE.md, 02_OPPONENT_AI.md, 04_NEW_TECHNIQUES.md) | local, line refs inline |

## Metrics

- findings: 20
- risks_HIGH: 1
- risks_MEDIUM: 3
- risks_LOW: 2
- clarifying_Qs: 6
- Severity: high - Unity 6 NavMeshAgent SetDestination pause/jitter bug [S13] on the feel-critical path; mitigated by retarget-on-change discipline and manual-locomotion fallback [S9][S11].