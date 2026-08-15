# Research - T-2026-08-14-003 (angle: guide)

**Date:** 2026-08-14
**Trigger:** initial
**Sub-agent:** research (angle-guide: NEW TECHNIQUES + STEP-BY-STEP BUILD GUIDE raw material for a local single-player Unity MOBA)

## Task in one sentence

Reuses: `research/unity-rts-2026-08-14/04_NEW_TECHNIQUES.md` + `05_BUILD_ROADMAP.md` (T-2026-08-14-002, playbook-indexed) as the technique/roadmap baseline; this angle DELTAS for MOBA: hero-focused controls, abilities/projectiles, lanes+minions+turrets, economy+shop, allied+enemy AI, bushes, and a 14-phase agent-executable build guide. Produce the raw material for the final dossier chapter: what to use/avoid in Unity 6.x for a LoL/Wild Rift/MLBB-style game (local single-player, no network), and a step-by-step build guide any agent can execute without re-research.

## Outline (bullets map to sources)

1. Unity 6.x feature set relevant to a MOBA: Input System (actions+touch), URP mobile budgets, GPU instancing + SRP Batcher, Addressables, Burst+Jobs, object pooling, UI Toolkit vs uGUI, Cinemachine, Timeline, DOTS verdict (carried), LOD/quality tiers [S1]-[S17][S31]
2. Reference-game engineering: Wild Rift mobile input design, MLBB performance work, LoL latency philosophy; what transfers to a local game [S18]-[S30]
3. Anti-hype guard: what is NOT worth building for single-player (netcode, rollback, server sim, matchmaking, anti-cheat, analytics) [S19][S24][S31]
4. Project layout: folders, scenes, prefab + ScriptableObject data conventions [S31][S32]
5. Phased build order: Phase 0-13 with done-when gates, effort days, key pitfalls [S32]
6. Agent-facing per-phase cards: inputs, outputs, validation; global coding conventions [S31][S32]
7. User needs translated into agent requirements (no multiplayer, vs AI, mobile-like, agent-applicable, save in new folder)
8. Effort estimate: MVP vs full scope

## What we know for sure

- Unity 6.3 LTS is the locked baseline (prior dossier ADR); URP is the render pipeline; legacy Input Manager is default until the Input System package is installed and deactivated [S31:5-11][S1][S2].
- The three reference games: LoL (PC, in-house engine), Wild Rift and MLBB (mobile). Wild Rift and Legends of Runeterra are built on Unity (Riot statement, 2020-02-25) [S18]; MLBB has been Unity-based since launch and upgraded Unity 4 to Unity 2017 in MLBB 2.0 (2019) [S25][S26].
- The prior RTS dossier locked the rendering contract (URP + SRP Batcher + GPU instancing, one atlased material per faction), the save contract (JsonUtility/Json.NET over versioned DTOs, never BinaryFormatter), and the architecture default (MonoBehaviour + ScriptableObject + event bus; DOTS only at horde scale) [S31:15-20][S31:49-54][S32:80-91].
- Local single-player constraint is non-negotiable: no multiplayer, no network, no lockstep/netcode (user task + task file) [00_user_task_T-2026-08-14-003.md:24][tasks/T-2026-08-14-003.md:16].
- Em dash (U+2014) banned in all written files (dispatch + repo convention).

## What we don't know (ambiguities)

- **Target platform first:** PC-first or Android-first? The user says "mobile games like these", 2 of 3 references are mobile, but the dev machine is a desktop. MOBA touch ergonomics (joystick feel) vs mouse precision lead to different phase 1 and phase 12 effort.
  - **Suggested clarifying question:** "Should the first playable target desktop (mouse+keyboard) with mobile support as phase 12, or Android-first from day one?"
- **Hero roster size for MVP:** the mission scopes MVP at "1 playable hero, 1 lane full loop, 2-3 enemy heroes". Is a 5v5 full roster (10 heroes, 3 lanes) required, or is the scoped MVP acceptable as v1?
  - **Suggested clarifying question:** "Is the MVP scope (1 playable hero, 1 lane, 2-3 enemy heroes, simplified jungle) acceptable as the first shipped build?"
- **Save semantics:** "save the result/progress in new folder" is ambiguous: mid-match save/load, or between-match progression (unlocks, difficulty, stats)?
  - **Suggested clarifying question:** "Does 'save progress' mean mid-match save/load, or match-complete progression (unlocked heroes, difficulty select), or both?"
- **Art/audio sourcing:** placeholder primitives vs free asset packs vs paid assets affects phase 10 effort and phase 0 setup.
  - **Suggested clarifying question:** "What art/audio budget: Unity primitives + free packs, or a paid asset budget?"
- **Input contract:** both control schemes (touch + mouse/keyboard) or one primary? This decides whether the input abstraction is dual-binding from phase 1 or retrofitted in phase 12.
  - **Suggested clarifying question:** "Should the Input System action maps support both mouse/keyboard and touch bindings from phase 1, or only the primary scheme?"

## Risks and doubts

- **Severity:** high - Unity version/API drift: docs URLs 404'd in this dispatch too (URP intro, UI Toolkit, Timeline, GRD manual pages all 404 on 6000.0; docs moved to package manuals). Mitigation: cite package-manual URLs (com.unity.*) and the prior dossier's verified URL list; pin versions in manifest.json; re-verify at implementation time [S31:15-18].
- **Severity:** high - Scope creep: full-scope MOBA (5v5, 3 lanes, item shop, jungle, 2 AI teams) is a multi-month project; without a hard MVP gate the pipeline will stall. Mitigation: the phase table below gates each phase with done-when criteria; planning agent must lock the MVP scope (1 hero, 1 lane loop) before phase 6.
- **Severity:** medium - Touch ergonomics are the make-or-break UX and cannot be validated without a device: joystick dead zones, drag-aim sensitivity, target-priority buttons are all feel-driven (Wild Rift shipped these as user settings, not fixed values) [S21][S23]. Mitigation: expose deadzone/sensitivity/auto-aim as settings from phase 12, test on real hardware, never tune blind in Editor.
- **Severity:** medium - Allied AI quality: the same AI drives both teams, but allied AI must follow the player's intent (lane assignment, follow/retreat), otherwise teammates read as broken [per angle-ai lane; flagged for merge]. Mitigation: reuse the enemy lane-behavior AI for allies with leash/objective overrides; ship allied "follow lanes" defaults before fancy behavior.
- **Severity:** low - Platform decision ambiguity (see ambiguities Q1): building touch-first then discovering the user wants desktop-first wastes phase 1 and phase 12 work. Mitigation: input abstraction from phase 1 (action-map bindings, not hard-coded buttons).
- **Severity:** low - MLBB primary engineering sources are scarce (no Moonton engineering blog found; most claims are news/secondary) [S25][S26][S27]. Mitigation: claims about MLBB internals are marked [secondary]; do not build decisions on unverified MLBB internals.

## Technical findings

### Part A - NEW TECHNIQUES

#### A1. Unity 6.x feature set relevant to a MOBA (what to use, with evidence)

- **F1. Input System package (1.14) is the input contract.** Unity supports two input systems; the older Input Manager is the default only until the Input System package is installed, and the installer offers to deactivate the legacy system [S1][S2]. For a MOBA, commit to named actions + action maps (Move, Attack, Ability1-4, Shop, Recall, CameraSwipe) as the single input-to-gameplay pipeline; this is what makes phase 12's touch pass a binding change, not a rewrite [S2][S31:15-18].
- **F2. Touch is first-class in the Input System.** Bind `<Pointer>/press` and `<Pointer>/delta` for the primary touch; per-touch bindings via `<Touchscreen>/touchN/press`; multi-touch via wildcard `<Touchscreen>/touch*/press` with a pass-through action type [S3]. A virtual joystick is then just a UI overlay that reads pointer delta + position - no custom touch plumbing.
- **F3. URP is the render pipeline and it is explicitly mobile-to-PC.** URP "provides optimized graphics across a range of platforms, from mobile to high-end consoles and PCs"; URP 17 ships with Unity 6.0 [S4]. MOBA practice: one URP asset per quality tier (mobile low / desktop high), and let quality settings switch render scale, shadows, and AA [S13].
- **F4. GPU instancing for minions + projectiles, with a documented edge.** GPU instancing renders multiple same-mesh+same-material objects in one draw call, and the docs state the performance benefit "is better on mobile platforms than on desktop" [S5]. Two hard limits: Skinned Mesh Renderers are NOT instanceable [S5], and in URP/HDRP instancing of custom shaders requires either disabling the SRP Batcher or making the shader SRP-Batcher-incompatible [S5]. Practical read: minions/turrets/projectiles = static or simple-animated meshes sharing one atlased material per faction (prior dossier contract [S31:29-30]); heroes = individual skinned meshes, accept their draw cost (few of them).
- **F5. SRP Batcher is URP-only (not Built-in).** Available in URP, HDRP, and custom SRPs; no in Built-in RP [S6]. One more reason the prior ADR's "no Built-in" rule holds.
- **F6. Addressables: use for content scale, skip for MVP.** Addressables give address-based asynchronous loading with bundles managed for you, local or remote [S7]. For a small local MOBA, direct prefab references cover the MVP; Addressables become worth it when hero/skin/map content grows or when updates ship as bundles. Verdict: defer, but keep asset references out of code (load via serialized fields or address strings) so the swap is painless.
- **F7. Burst + Jobs for minion/hero AI hot loops.** Burst is a C# compiler that produces optimized native code; the job system runs code on worker threads [S8][S9]. Use for the hot loops: minion wave decisions, projectile updates, targeting scans, FoW updates. Keep the prior dossier's middle path: MonoBehaviour + Jobs/Burst where profiling demands, full ECS only at horde scale [S31:15-20].
- **F8. Object pooling is standard practice, no official package.** Unity Learn documents the pattern (pre-instantiate, activate/deactivate) [S15]; the prior dossier lists it as standard for projectiles/effects/units [S31:60-61]. In a MOBA the pooled set is: projectiles, damage numbers, hit VFX, minions, ward/bush effects.
- **F9. UI Toolkit vs uGUI: split by surface.** The official comparison says UI Toolkit is in active development while uGUI and IMGUI are production-proven but updated infrequently [S10]. Prior dossier split: UI Toolkit for HUD/menus/minimap chrome, uGUI for world-space health bars and custom-shader UI [S31:43-47]. For a MOBA HUD (joystick, ability buttons, shop, minimap) both work; pick UI Toolkit for the runtime HUD only if the team is comfortable with USS/UXML, else uGUI is the lower-risk choice. Build-vs-reuse decision flagged for planning.
- **F10. Cinemachine for camera.** Cinemachine 3.x is a suite of camera modules for tracking, composing, blending and cutting; explicitly supports "top down, and RTS" among its genres [S11]. MOBA camera = a follow rig with manual offset pan + zoom + minimap jump; Cinemachine handles follow+blend, custom script handles the MOBA-specific semi-lock camera behavior (Wild Rift ships a semi-lock camera setting [S23]).
- **F11. Timeline for cinematics and announcements.** Timeline 1.8 covers cutscenes, gameplay sequences, audio sequences and particle effects [S12]. MOBA use: intro/outro cinematics, objective announcements, tutorial sequences. Unity's own RTS demo (ATerribleKingdom) mixes Timeline + Cinemachine in a real-time game context [S12, demo reference].
- **F12. LOD + quality tiers for the mobile-style perf story.** LOD groups swap meshes by camera distance [S14]; quality settings include global mipmap limits (half/quarter/eighth resolution), shadow projection modes, and per-platform quality tier switching [S13]. MLBB's performance model is exactly this: LOD/visual-adjustment tiers on low-end devices [S29][S13].
- **F13. Mobile perf budget tooling.** Unity's mobile performance guide collects 75+ optimization tips (draw calls, textures, thermal) [S16]. For Android, the Unity Adaptive Performance package with the ADPF provider adjusts framerate/resolution/LOD scalers from thermal state, aiming for sustained target FPS instead of throttling spikes [S17].
- **F14. DOTS/ECS verdict carried, not re-litigated.** Prior dossier: payoff at tens of thousands of entities, overkill for MOBA-scale units; middle path is MonoBehaviour + Jobs/Burst; ECS phase-2 upgrade only if profiling demands [S31:15-20]. A MOBA has ~10 heroes + ~30-60 minions on screen per lane - nowhere near ECS territory. GameObject/ECS fork at horde scale only (honor the ADR).

#### A2. Reference-game engineering (what transfers to a local single-player game)

- **F15. Wild Rift's input model transfers directly.** Wild Rift is Unity-built and its mobile MOBA control scheme (virtual joystick + tap/drag to attack + ability buttons + auto-targeting) is the de-facto mobile MOBA standard [S18][S21]. Its complexity is in feel, not tech: dead zones, sensitivity, semi-lock camera are all user-facing settings [S23]. Transfers: the action-map structure in F1/F2 IS the Wild Rift scheme, expressed in Unity terms.
- **F16. Targeting priority is a scorer, not a switch.** Mobile MOBAs auto-target the "best" enemy; Wild Rift exposes "Target Priority" (low HP / nearest / lowest percent) as a setting [S23]. Implement as a priority scorer (threat value = f(HP%, proximity, type, current target)) with a manual override for tap-to-target; that scorer also feeds the allied-AI team (per angle-ai).
- **F17. Device-tier graphics scaling is the MLBB playbook.** MLBB 2.0's Unity 2017 upgrade let it scale from low-end to flagship; its performance model is LOD + visual-adjustment tiers [S25][S29]. Unity's equivalents: quality tiers (F12) + URP per-tier assets (F3) + optional Adaptive Performance/ADPF (F13) [S17].
- **F18. Latency philosophy: consistency beats raw speed; mostly irrelevant to local play.** Riot's engineering philosophy on input latency (published via engineering.riotgames.com; article now 404s even via web.archive.org, marked [UNVERIFIED-dead]) is about network games [S19]. The one relevant echo: EventHubs measured 2XKO's input latency (Feb 2026, [secondary]) showing fighting-game-level frame-consistency targets [S30]. For local single-player, input latency is trivial (frame-perfect by construction); what matters is frame pacing on lower-end devices (F13) and input buffering for ability queueing (a design decision, not a tech risk).

#### A3. Anti-hype guard (what NOT to build for a local single-player MOBA)

- **F19.** For a local, no-network game, these are explicitly out of scope, with reasons: netcode/lockstep/rollback (no peers exist [S31:49]); server simulation (the game is the authority); matchmaking/ELO (no online play [S24]); anti-cheat (no adversarial clients); analytics/telemetry (no remote players; local debug stats only); ECS at MOBA scale (see F14); custom engine (Unity covers all needs [S18][S25]); MMO-scale content pipelines (Addressables/asset bundles, F6). Anything in this list in a plan is a red flag for scope creep.

### Part B - STEP-BY-STEP BUILD GUIDE RAW MATERIAL

#### B1. Guide-writing facts with evidence

- **F20. Package manifest (minimum set).** Input System (com.unity.inputsystem, 1.14.x), URP (com.unity.render-pipelines.universal, 17.x), Cinemachine (com.unity.cinemachine, 3.1.x), Timeline (com.unity.timeline, 1.8.x), AI Navigation (com.unity.ai.navigation) [S1][S2][S4][S11][S12]. Pin exact versions in manifest.json (mitigates the drift risk in the Risks section).
- **F21. Scene structure.** One scene per mode: Boot (managers + main menu), Match (the MOBA map), plus optional Cinematic scenes [S12]. Addressables (F6) would allow scene streaming; deferred.
- **F22. Prefab + ScriptableObject data conventions.** Hero stats/abilities/items/units = ScriptableObjects; runtime instances = prefabs; one folder per domain (Heroes/, Abilities/, Items/, Units/, Maps/) [S31:49-54, prior dossier convention carried].
- **F23. Event bus.** MonoBehaviour + ScriptableObject + event bus architecture (prior dossier ADR [S31:15-20]); events for: hero state, shop transactions, wave spawns, objective takes, match end.
- **F24. No middleware beyond the packages above.** Prior dossier verdict + verified docs; object pooling is hand-rolled (~1-2 days, F8).

#### B2. Phased build order (raw material for the plan; done-when gates + effort)

| Phase | Scope | Done-when gate | Effort (days) | Key pitfalls |
|---|---|---|---|---|
| P0 | Project setup: Unity 6.3 LTS, URP asset per tier, Input System active (legacy deactivated), folder structure, git | Boot scene plays; Input actions map compiles with test bindings; quality tiers switch in Player settings | 1-2 | Forgetting to deactivate the legacy Input Manager (F1); URP asset not assigned in Quality (F3) |
| P1 | Data layer: SOs for hero stats, abilities (4/hero), items (~12 MVP), minion/turret stats; versioned DTOs + save service (JsonUtility, never BinaryFormatter) | Editor script can create/edit all SOs; save/load round-trip test passes | 3-4 | BinaryFormatter temptation (banned [S31:49-54]); SO GUID churn in scenes |
| P2 | Hero controller: Input actions -> movement (WASD/joystick), ability cast, basic attack, targeting scorer (F16), input buffering | Player-hero moves, attacks, casts 4 abilities against dummy target; unit test on targeting scorer | 4-6 | Targeting scorer edge cases (no target in range, minion vs hero priority) |
| P3 | Units + lanes: minion spawner (waves), turret AI (targeting, damage), lane pathing (NavMesh or waypoints), projectile pooling (F8) | Wave spawns; minions walk lane; turret kills minions; pooled projectiles show no GC spikes | 4-6 | NavMesh baking on moving map parts; pooled projectile state-reset bugs |
| P4 | Economy + shop: gold on kill/wave, XP/levels, shop UI (buy/sell), item stat application | Hero levels up; gold flows; shop purchase changes stats; items persist through save | 3-4 | Stat re-derivation order (multiplicative vs additive); shop UI clicks vs ability clicks conflict (F9 UI choice matters here) |
| P5 | Bushes + vision: bush overlays, vision radius from units/turrets, enemy-hidden state (FoW-lite: units only, no full map shroud yet) | Hero hides in bush (enemies lose target); vision radius works; OK with 30+ units | 2-3 | Per-frame vision updates on all units = GC; use dirty-flag + event bus (F23) |
| P6 | Enemy AI: lane behavior (push, attack minions/turret/hero), retreat at low HP, objective priority (dragon/baron slot), difficulty presets | 2-3 enemy heroes play a full match vs player with no scripting; AI passes replay sanity check | 5-8 | AI ignoring bushes (must respect vision, P5); AI stuck on turret range; same system reused for allies (avoid AI-stack duplication) |
| P7 | Allied AI: leash/objective overrides on the P6 system (follow lanes, respond to pings/orders) | 1-2 allied heroes follow lane assignments and join fights | 3-5 | Duplicating the AI stack instead of overrides |
| P8 | Match flow: countdown start, win/lose conditions (turrets + nexus), post-match screen, match stats | Full 1-lane match completes from countdown to victory screen | 2-3 | Match-state edge cases (all allies dead, both nexus alive, pause) |
| P9 | Camera + feel: Cinemachine follow rig, semi-lock camera (F10), screen shake, ability hit feedback (VFX pool, F8), damage numbers | Camera follows with pan/zoom/minimap jump; abilities feel responsive (input buffering + VFX) | 3-4 | Camera clipping into geometry; feel tuning blind in Editor (device test needed - medium risk) |
| P10 | Content pass: hero visual (skinned), 2-3 enemy hero variants, minion/turret models, map dressing, audio (free packs) | Placeholder art replaced; audio hooks in place | 4-8 | Skinned Mesh Renderers not instanceable (F4) - keep hero count low; atlased materials per faction [S31:29-30] |
| P11 | Polish: main menu, settings (sensitivity/deadzone/quality), pause, tutorial hints, intro cinematic (Timeline, F11) | Menu -> match -> settings loop works; tutorial hints fire | 3-4 | Settings not persisting (reuse save service, P1) |
| P12 | Mobile pass (if desktop-first): touch bindings (F2), UI scale/anchors, render scale + quality tier on device, ADPF if Android (F13/F17) | Game plays on device with touch; sustained 30fps on mid-tier device | 4-6 | Editor-only tuning trap (medium risk); joystick deadzone must be settings-driven [S23] |
| P13 | Hardening: profiler pass (draw calls, GC, main-thread stalls), build for Windows + Android, final QA | Profiler clean on both platforms; builds pass; no GC spikes in 10-min session | 3-5 | Skipping the profiler pass = top perf trap [S20] |

Total: ~47-69 days of phase work for the scoped MVP (before bug-fix and buffer time). See B5 for the estimate discussion.

#### B3. Agent-facing per-phase cards (global conventions + per-phase cards)

**Global conventions (apply to every phase):**
- One scene per mode; scenes never contain runtime logic, only references (F21).
- All gameplay data in ScriptableObjects; no magic numbers in MonoBehaviours (F22).
- No direct cross-system references; communicate via the event bus (F23).
- Every new public method/class gets a one-line comment stating intent (agent-executable contract).
- No BinaryFormatter anywhere; saves via versioned DTOs (P1) [S31:49-54].
- All timers/coroutines must be pooling-safe: never leak pooled objects in a coroutine (F8).
- Em dash (U+2014) banned in all written files (repo convention).
- Never commit unless explicitly asked (repo convention).

**Per-phase cards:** each phase in B2 maps to a card in the final dossier chapter: inputs = artifacts produced by prior phases (list of prefabs/SOs/scenes), outputs = concrete files added, validation = the done-when gate executed as a checklist by any agent. Cards are written so an agent can execute without re-research: every non-obvious step cites its source inline (e.g. "Input System activation: Package Manager -> Input System -> Enable Backend [S2]").

#### B4. USER NEEDS AS AGENT REQUIREMENTS

- **F25. User needs translated into agent requirements.** The table below is the contract: every user ask from the task file maps to an agent-executable requirement with its source finding/phase. Each row is actionable by the planning agent without re-reading the user task.

| User ask | Agent requirement |
|---|---|
| "No multiplayer, no network, just vs AI" | No netcode/lockstep packages; no network calls; all systems single-process, one authority. AI teams replace human opponents (enemy AI P6, allied AI P7). |
| "Mobile games like these" (Wild Rift, MLBB) | Touch input (joystick + drag-aim) as a first-class binding (F2); mobile perf budget: render scale, mipmap limits, LOD tiers, Adaptive Performance (F12/F13/F17); device-tier quality settings. |
| "How to build it in Unity, step by step, guide suitable for agents" | Each phase self-contained: inputs, outputs, validation steps (B3); no phase depends on knowledge that is not stated in the phase card; global conventions section applies to every phase. |
| "What to use, what to avoid" | Part A is the use/avoid contract; anti-hype list (A3) marks the avoid set; every recommendation has a citation [S1]-[S32]. |
| "New techniques" | Part A1 maps each Unity 6.x technique to the MOBA system it serves with a verdict (use / defer / skip). |
| "Open source to benefit from" | Delegated to angle-oss (same task, P1T4). This angle only notes reuse rules: prior dossier verdicts (A* Pro, NavMesh, pooling) apply unchanged [S31][S32]. |
| "Research can benefit any agent to build" | Deliverable is raw material for the final dossier chapter: phase cards + conventions are written to be executed verbatim by any agent without re-research. |
| "Save result/progress in new folder" | All outputs written to share/notes/ (this file) + playbook index row; no edits to research/ or research_doc/ (read-only). |

#### B5. Effort estimate

- MVP (scoped: 1 playable hero, 1 lane full loop, 2-3 enemy heroes, simplified jungle): 47-69 days of phase work (B2 table). With integration/bug-fix/validation buffer of 25-30%: 60-90 person-days, i.e. 3-4.5 months solo at 2-3 effective days/week, or 6-9 weeks full-time. Matches the prior dossier's "2-4 months vertical slice" (MOBA is a superset of the RTS core) [S32:3].
- Full scope (10 heroes 5v5, 3 lanes, full jungle, item shop ~30 items, 2 AI teams with personality, bushes + full FoW, cinematics, difficulty select, Android export): 4-6 months solo full-time; 2-3 months with a second dev for art/AI.
- Notes: estimates assume placeholder-to-free-pack art (P10), no middleware beyond the package list (F24), and agent-executed phases (B3 cards are self-contained, so no re-research overhead).

## Existing solutions (landscape scan)

- Scan delegated to angle-oss (same task, P1T4) to avoid duplication: the OSS landscape (LoL-style MOBA projects, Unity MOBA templates, A* Pathfinding, pooling libraries) is that angle's lane; this angle covers techniques + build guide only. Reuse-relevant verdicts carried from the prior dossier apply unchanged: A* Pathfinding Project v5.0 (Burst/Jobs/ECS) as the DOTS pathfinding escape hatch; NavMesh + AI Navigation 2.0 for MVP [S31:15-18].

## Build vs. reuse decisions (please confirm)

- Carried from prior dossier, not re-derived: MonoBehaviour + SO + event bus (build); pooling (build, ~1-2 days, F8); event bus (build); targeting-priority scorer (build, phase 2, F16); AI (per angle-ai). No new third-party dependency is required by any phase card [S31][S32].
- Open decisions for planning: UI Toolkit vs uGUI for the HUD (F9); Addressables deferral (F6); Unity 6.3 vs 6.2 (prior ADR locks 6.3; re-verify at install [S31:7]).

## Feasibility verdict

Feasible, HIGH confidence for the scoped MVP on Unity 6.3 LTS + URP with the locked contracts; the risk is not feasibility but scope and input feel. All three reference games prove the genre on Unity-class tech [S18][S25]; the prior dossier already locked the architecture [S31][S32].

## Recommendations

1. Lock MVP scope before phase 6 (per B2 gate note): 1 hero, 1 lane loop.
2. Input abstraction from phase 1 (dual bindings, F1/F2) regardless of the primary platform decision.
3. Treat P6/P7 AI as one system with overrides; do not build two AI stacks.
4. Force a Player-build profiler pass at P8 and P12; Editor-only tuning is the top perf trap [S20][S31].
5. Defer Addressables and ECS; revisit only on measured need (F6, F14).
6. Reserve 25-30% buffer on the phase total for integration and validation.

## Open questions for the user

1. Platform first: desktop or Android?
2. MVP roster: scoped 1 hero / 2-3 enemies acceptable?
3. Save semantics: mid-match, progression, or both?
4. Art/audio budget: primitives + free packs, or paid assets?
5. Input contract: both schemes or one primary?

## Reference table

[S1] Unity Manual - Input (6000.0): https://docs.unity3d.com/6000.0/Documentation/Manual/Input.html (access 2026-08-14)
[S2] Input System package manual 1.14: https://docs.unity3d.com/Packages/com.unity.inputsystem@1.14/manual/index.html (access 2026-08-14)
[S3] Input System - Touch (1.13): https://docs.unity3d.com/Packages/com.unity.inputsystem@1.13/manual/Touch.html (access 2026-08-14)
[S4] URP Manual (6000.0): https://docs.unity3d.com/6000.0/Documentation/Manual/universal-render-pipeline.html (access 2026-08-14)
[S5] GPU instancing: https://docs.unity3d.com/6000.0/Documentation/Manual/GPUInstancing.html (access 2026-08-14)
[S6] SRP Batcher: https://docs.unity3d.com/6000.0/Documentation/Manual/SRPBatcher.html (access 2026-08-14)
[S7] Addressables: https://docs.unity3d.com/6000.0/Documentation/Manual/com.unity.addressables.html (access 2026-08-14)
[S8] Burst: https://docs.unity3d.com/6000.0/Documentation/Manual/com.unity.burst.html (access 2026-08-14)
[S9] Job System: https://docs.unity3d.com/6000.0/Documentation/Manual/JobSystem.html (access 2026-08-14)
[S10] UI system compare: https://docs.unity3d.com/6000.0/Documentation/Manual/UI-system-compare.html (access 2026-08-14)
[S11] Cinemachine 3.1: https://docs.unity3d.com/Packages/com.unity.cinemachine@3.1/manual/index.html (access 2026-08-14)
[S12] Timeline 1.8: https://docs.unity3d.com/Packages/com.unity.timeline@1.8/manual/index.html (access 2026-08-14)
[S13] Quality settings: https://docs.unity3d.com/6000.0/Documentation/Manual/class-QualitySettings.html (access 2026-08-14)
[S14] LOD: https://docs.unity3d.com/6000.0/Documentation/Manual/LevelOfDetail.html (access 2026-08-14)
[S15] Unity Learn - Introduction to Object Pooling: https://learn.unity.com/tutorial/introduction-to-object-pooling (access 2026-08-14)
[S16] Unity Mobile Game Performance Guide: https://create.unity.com/mobile-game-performance-guide (access 2026-08-14)
[S17] Android ADPF for Unity: https://developer.android.com/games/engines/unity/unity-adpf (access 2026-08-14)
[S18] Unity News - Riot Games chooses Unity: https://unity.com/news/riot-games-chooses-build-next-games-league-legends-franchise-unity (access 2026-08-14)
[S19] Riot - Fixing the Internet for Real Time Applications, Part I: https://www.riotgames.com/en/news/fixing-internet-real-time-applications-part-i (access 2026-08-14)
[S20] Riot - Profiling: Optimisation: https://www.riotgames.com/en/news/profiling-optimisation (access 2026-08-14)
[S21] PC Gamer - Wild Rift (secondary): https://www.pcgamer.com/league-of-legends-wild-rift-is-a-kinder-gentler-league-of-legends/ (access 2026-08-14)
[S22] Dot Esports - Wild Rift hands-on (secondary): https://dotesports.com/news/hands-on-with-mobile-league-of-legends-wild-rift-gameplay-and-differences (access 2026-08-14)
[S23] Upcomer - Best settings in Wild Rift (secondary): https://upcomer.com/what-are-the-best-settings-in-league-of-legends-wild-rift/ (access 2026-08-14)
[S24] Wild Rift minimum device spec: https://wildrift.leagueoflegends.com/en-us/news/game-updates/wild-rift-minimum-device-specification-requirements-update/ (access 2026-08-14)
[S25] ONE Esports - MLBB engine update (secondary): https://www.oneesports.gg/mobile-legends/mobile-legends-bang-bang-is-getting-an-engine-update/ (access 2026-08-14)
[S26] Wikipedia - Mobile Legends: Bang Bang (wiki, low weight): https://en.wikipedia.org/wiki/Mobile_Legends:_Bang_Bang (access 2026-08-14)
[S27] Moonton News 237 - Project NEXT 2025: https://en.moonton.com/news/237.html (access 2026-08-14)
[S28] Moonton News 244: https://en.moonton.com/news/244.html (access 2026-08-14)
[S29] deskomvis - LOD performance paper (academic, DOI 10.38010/deskomvis.v6i1.92): https://deskomvis.org (access 2026-08-14)
[S30] EventHubs - 2XKO input latency tests (secondary): https://www.eventhubs.com/news/2026/feb/03/2xko-input-lag-tests/ (access 2026-08-14)
[S31] Prior dossier: research/unity-rts-2026-08-14/04_NEW_TECHNIQUES.md (T-2026-08-14-002) (repo, access 2026-08-14)
[S32] Prior dossier: research/unity-rts-2026-08-14/05_BUILD_ROADMAP.md (T-2026-08-14-002) (repo, access 2026-08-14)

Note: Riot engineering article "Reducing Input Latency" (engineering.riotgames.com) is dead (404, incl. web.archive.org), so the input-latency claim rests on [S19] (latency philosophy) + [S30] (secondary) - marked in F18. MLBB internals rest on news [S25][S27][S28] + one academic paper [S29] - marked [secondary]; do not build decisions on unverified MLBB internals.

## Self-critique

- Riot's "Reducing Input Latency" article is dead and unreachable even via web.archive.org; the input-consistency claim leans on a secondary source (2XKO input-lag tests, Feb 2026) [S30] - flagged [secondary] in F18.
- MLBB engineering primary sources are scarce: no Moonton engineering blog exists; MLBB internals rest on news coverage [S25][S27][S28] and one academic paper [S29] - do not build decisions on unverified MLBB internals.
- LoL client engine internals ("The Engines of League of Legends" article) unreachable (404); LoL-side claims limited to what was verified (latency philosophy [S19], profiling method [S20]).
- Effort estimates are consensus/prior-dossier-based, not measured.
- Could not verify Unity's "6.3 LTS" release date independently (carried from prior dossier ADR [S31:5-11]) - honor the ADR per dispatch instructions.
- B2's day estimates carry the prior dossier's shape; they are plan raw material, not commitments - the planning agent must re-derive durations.

## Metrics

- findings: 25
- risks_HIGH: 2
- risks_MEDIUM: 2
- risks_LOW: 2
- clarifying_Qs: 5