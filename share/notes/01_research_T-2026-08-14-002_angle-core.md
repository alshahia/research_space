# Research - T-2026-08-14-002 (angle: core)

**Date:** 2026-08-14
**Trigger:** initial
**Sub-agent:** research
**Angle:** core - RTS core architecture and systems in Unity
**Research-detector tier:** 3 (sum=3.0) - Tier 1+2+3 protocol applied

Reuses: `agents_manager/memory/projects/research-space/playbook.md` (read-only) - no prior RTS/Unity output exists (reuse=0), so this is a fresh topic; reused the numbered `[Sn]` citation-table + metrics-footer conventions and the license+maintenance verification discipline from the T-2026-08-13-003 dossiers (angle A "license + maintenance verification", angle B "what to copy / what to avoid" tables). No content was copy-pasted.

## Task in one sentence

Produce the core-systems research angle of the full, citation-rich dossier that lets any agent build a local single-player (user vs AI, no network) RTS game in Unity: canonical system breakdown (selection, orders, movement/pathfinding, fog of war, economy, building, camera, input), architecture recommendations, MVP ordering, pitfalls to avoid, and per-system coder-executable checklists.

## What we know for sure

- Task file `tasks/T-2026-08-14-002.md` exists; my row is P1T1 (angle-core), status todo. Master's plan has 4 parallel angles (core / ai / oss / techniques) plus a P1T5 merge pass that creates the user-facing dossier in a NEW folder `research/unity-rts-2026-08-14/` - the "save result in new folder" requirement is handled by master, not by me [tasks/T-2026-08-14-002.md:43-53].
- Hard constraints from user: Unity engine only; single-player only (user vs AI); NO multiplayer, NO network. Everything network-related (lockstep, rollback, Netcode) is out of scope and should be actively avoided in the architecture [tasks/T-2026-08-14-002.md:14-20].
- Unity 6 is the current Unity generation. Docs accessed under version "Unity 6.0 (6000.0)" [S1][S4]; docs also observed for 6000.5 (GPU Resident Drawer page) [S22] and a UI comparison table labeled "Unity 6.6" [S7] - minor versions move fast, version-pin every claim.
- Unity ships TWO input systems: the built-in legacy Input Manager (default if the Input System package is not installed) and the Input System package (the intended replacement, which can auto-deactivate the old one) [S1][S2][S3].
- The legacy Input Manager's virtual-axis API (`Input.GetAxis`, `Input.GetButtonDown`) is still documented in Unity 6 [S3].
- NavMesh in Unity 6 is delivered via the "AI Navigation" package (NavMesh surfaces, agents, obstacles, links, baked workflow) [S8]. My earlier attempts at the old `Manual/Navigation.html` and `nav-NavigationSystem.html` URLs 404'd - the docs moved to the package manual.
- JsonUtility uses the standard Unity serializer: fields only, supported types only; officially suggested for "saving game state" (with a PlayerPrefs example) [S4].
- ScriptableObjects are assets independent of GameObjects, commonly used as shared data containers; reduce duplicate data at runtime [S5].
- Prefabs are the standard reusable GameObject template mechanism, with nested prefabs and variants [S6].
- UI Toolkit is Unity's actively-developed UI system, recommended for "multi-resolution menus and HUD in intensive UI projects"; uGUI remains the choice for world-space UI and custom-shader UI; IMGUI is editor-legacy [S7].
- `BinaryFormatter` was removed from .NET 9 (2024) and is a security risk (CWE-502); any old Unity tutorial that saves with BinaryFormatter is obsolete advice [S24].
- Wikipedia defines RTS as managing resources and commanding units continuously in real time (term coined by Brett Sperry for Dune II) [S12]; fog of war is the military/strategic-gaming term for hidden-map mechanics [S11].
- Unity's own DOTS marketing cites a real shipped RTS (Door 407's "Diplomacy is Not an Option") using DOTS "especially for pathfinding and gameplay logic" [S25].
- Megacity Metro (Unity's official DOTS sample) demonstrates large-scale ECS worlds; Entities Graphics + URP are production-proven at demo scale [S13][S14].
- The old Unity Learn "The A* Algorithm" project page is dead ("no longer available") as of 2026-08-14 [S35] - tutorial content drifts; prefer official docs + repo code.

## What we don't know (ambiguities)

- **Target scale (unit counts) is unknown.** It decides the single most expensive architecture fork (GameObject/MonoBehaviour vs DOTS/ECS). A <200-unit RTS is fine on GameObjects; thousands of units push toward DOTS or flow-field+instancing tricks.
  - **Suggested clarifying question:** "What is the maximum number of units you want on screen simultaneously? (a) under 100, (b) 100-500, (c) 500-2000, (d) 2000+ horde-scale, (e) no idea - pick what's practical."
- **2D vs 3D presentation is unknown.** Changes pathfinding (2D grid vs NavMesh), rendering (sprite vs URP 3D), fog of war (sprite mask vs render texture), and asset pipeline entirely.
  - **Suggested clarifying question:** "Should the game be 2D top-down (sprites), 3D top-down (URP), or doesn't matter / your choice?"
- **Art, audio and content assets are unaccounted for.** RTS needs dozens of unit/building models or sprites, icons, UI skin, sound effects. This is usually the schedule killer for solo devs, and the user gave no signal.
  - **Suggested clarifying question:** "Where do art/audio come from - free asset packs (e.g. Unity Asset Store free tier, Kenney), purchased packs, or are programmer-art placeholders acceptable for a working prototype?"
- **"Save the result/progress" semantics are ambiguous.** Could mean (a) mid-game save/load of a running match, (b) campaign/level progress + unlocked content + scores, or (c) just "write the research outputs into a new folder" (which master already handles).
  - **Suggested clarifying question:** "What should be saved: full mid-game save/load (quit and resume a match), or only campaign progress/results between matches, or both?"

## Risks and doubts

- **Scope creep kills RTS projects.** A "full RTS" (economy + tech tree + 3 races + campaign + AI) is a multi-month solo project. Agents will happily build features in the wrong order without an MVP gate.
  - **Severity:** high
  - **Mitigation:** Planning agent must encode a hard MVP order (see Recommendations): input+camera+selection+move orders -> resources+building -> combat -> fog of war -> AI. Nothing cosmetic before the loop is playable.
- **The GameObject-vs-DOTS architecture fork is expensive to reverse.** Choosing DOTS for a small game costs 3-5x development time (learning curve, no per-unit animator, NavMesh integration is community-solved, not native) [S26][S9]; choosing GameObjects for a 2000-unit game causes a rewrite.
  - **Severity:** high
  - **Mitigation:** Decide from the scale answer (clarifying Q1). Default: GameObject/MonoBehaviour + ScriptableObject data + pooled units; DOTS only at scale "d" or when CPU profiling proves the need. Keep gameplay logic in plain C# classes so either renderer can be swapped.
- **Unity version drift.** Docs exist for 6000.0/6000.5/6000.6 [S1][S22][S7]; package versions move (Input System 1.13 vs 1.14 both returned [S2]); tutorial content references Unity 5/2019/2021 and is stale [S23][S35].
  - **Severity:** medium
  - **Mitigation:** Pin Unity LTS + package versions in the plan; all agent-generated code must compile-check against the pinned version; treat any pre-2022 tutorial as suspect.
- **NavMesh scales poorly for hordes.** NavMeshAgent per unit is fine for tens of agents; crowd simulation has limits; RTS-style armies of hundreds need flow fields or grid A* + local avoidance instead [S8][S20][S21][S10].
  - **Severity:** medium
  - **Mitigation:** Design the movement abstraction early: `IMovementProvider` with NavMesh implementation for MVP, flow-field/A* implementation swapped in when profiling demands it. Do not hard-wire NavMeshAgent into unit brains.
- **Asset-Store template lock-in.** "RTS Engine"-class products (Strategy Kit: RTS Engine $85 [S17], RTS Engine by SoumiDelRio $60 [S18]) are commercial, single-entity EULA, and their own docs admit heavy integration work; they also drag in their own architecture. Buying one pre-commits the project's code shape.
  - **Severity:** medium
  - **Mitigation:** For a learning/cornerstone project, prefer OSS learn-from repos (MIT/etc.) [S15][S16][S21][S33] over purchased templates; if purchased, treat as reference + asset source, not as the architecture.
- **GPU Resident Drawer is a double-edged sword.** It cut a 43.5k-draw-call test scene to 128 calls, but adds ~100 MB memory, longer builds, requires Forward+ and compute-capable APIs, and forum reports show it can be slower with Entities rendering [S22][S27][S40].
  - **Severity:** low
  - **Mitigation:** Enable late in the project, profile before/after, keep a disabled path.
- **Save-format choice is a trap for agents.** Old tutorials say BinaryFormatter (removed from .NET 9 [S24]); JsonUtility can't do dictionaries and only serializes fields of supported types [S4]; community standard is Json.NET for Unity (free) or manual DTO classes [S41].
  - **Severity:** low
  - **Mitigation:** Mandate in the plan: save via JsonUtility (or Json.NET for Unity) over explicit DTO classes with version field; never BinaryFormatter; never serialize UnityEngine.Object references directly.
- **Tutorial/course content is drifting or paywalled.** Unity Learn A* project removed [S35]; best structured RTS courses are paid (GameDev.tv $39 [S19]) or YouTube-only with project files [S20].
  - **Severity:** low
  - **Mitigation:** Plan around official docs [S1]-[S9] + open repos [S15][S16][S21]; treat courses as optional supplementary reading.

## Technical findings

### A. Engine baseline and version drift

- **F1.** Unity 6 (6000.x) is current; the Manual and Scripting API are versioned per minor release and multiple minors (6000.0, 6000.5, 6000.6) are live simultaneously. Cite the exact docs minor when pinning versions [S1][S7][S22].
- **F2.** The AI Navigation package is the current home of NavMesh (baking, agents, dynamic obstacles, NavMesh links); the pre-package manual URLs are dead. NavMesh is NOT natively DOTS-compatible - community guides flag this as a current limitation [S8][S26].
- **F3.** Unity Learn's older A* tutorial project is gone, replaced by a general "Artificial Intelligence for Beginners" course; a 2024 Medium A* article still links the dead page [S35].

### B. Input abstraction

- **F4.** Unity 6 ships two input systems: legacy Input Manager (built-in, default until the package is installed) and the Input System package (intended replacement; installer offers to disable the legacy system). New projects should use the Input System package [S1][S2].
- **F5.** The legacy Input Manager's virtual-axis model (`Input.GetAxis("Horizontal")`, `GetButtonDown`) still works and is documented in Unity 6 - fine for a quick prototype, but it cannot express RTS-style modifier combinations (Shift-add-to-selection, Ctrl-force-move) cleanly [S3].
- **F6.** The Input System package's Action Maps/actions are the clean fit for RTS bindings: separate maps for "Gameplay" (right-click move/attack, A/S/D/W camera, hotkeys) vs "UI" (menu navigation), and mouse position/button actions are first-class [S2].
- **F7.** For an agent building an RTS: define named actions early (SelectUnit, BoxSelectDrag, MoveOrder, AttackOrder, QueueModifier (Shift), PanCamera, ZoomCamera, RotateCamera, BuildHotkeys) - the action names become the contract between input layer and command pipeline [S2].

### C. Selection and command/order pipeline

- **F8.** The canonical selection stack is: click-select single unit; marquee/drag-box multi-select; Shift-click adds/removes from selection; click empty ground deselects. RTS tutorials and demos converge on exactly this stack (drag-box selection explicitly implemented in DOTS-RTS demo, selection tutorials in Mina Pecheux series, "marquee selection" listed as an RTS-Engine feature) [S21][S15][S37].
- **F9.** Selection must be implemented against the renderer, not physics: raycast into a custom selectable registry (units register/unregister on spawn/death) or use a spatial hash; physics colliders for selection on hundreds of units cost per-frame queries that add up [S21][S15].
- **F10.** Orders are a command pipeline, not direct calls: right-click ground = move, right-click enemy = attack; Shift queues orders (classic RTS behavior seen across all referenced RTS tutorials and the DOTS-RTS demo); orders should be stored as serializable order structs (type, targetId, position, queue slot) so they can be saved/loaded and reused by the AI opponent (AI angle) [S15][S21][S19].
- **F11.** Formations: naive "all units walk to the same point" produces a pile-up; formation systems (slot assignment per unit, e.g. abstract FormationBase + FormationFactory in the DOTS-RTS demo; square/arrow/circle variants) are the standard solution and are cheap to add at order-execution time, not movement time [S21].

### D. Movement and pathfinding

- **F12.** Three viable pathfinding families in Unity, in increasing scale: (1) AI Navigation / NavMeshAgent - baked navmesh, built-in, free, best for tens of agents and world-space geometry [S8]; (2) grid A* (custom or A* Pathfinding Project) - full control, works with any grid, multithreaded implementations exist [S10]; (3) flow fields - compute a direction vector field per frame over a grid, units sample it; amortizes cost for hundreds of units; proven pattern in RTS (used in DOTS-RTS demo and Code Monkey's DOTS RTS course) [S21][S20].
- **F13.** The A* Pathfinding Project (Aron Granberg) is the de-facto third-party pathfinding asset for Unity: grid graphs, Recast navmesh graphs, navmesh cutting for dynamic obstacles, multithreading, free tier + paid Pro tier (Pro adds features like fully automatic navmesh generation per testimonial/feature list) [S10]. Integration into an RTS engine is documented (RTS Engine's own docs describe an "A* Pathfinding Project Module") [S17].
- **F14.** NavMesh supports dynamic obstacles and NavMesh links (doors, jumps) at runtime - enough for buildings that appear mid-game, but building placement must trigger navmesh carving/obstacle updates; plan this hook from day one [S8].
- **F15.** Local avoidance: NavMeshAgents avoid each other up to a point; flow-field + separation is the standard RTS crowd technique; pure NavMeshAgent crowds degrade with many same-target agents (community-acknowledged NavMesh scaling limits) [S8][S26].
- **F16.** Unity's official DOTS RTS-relevant evidence: Door 407's RTS "Diplomacy is Not an Option" uses DOTS "especially for pathfinding and gameplay logic" (Unity marketing quote) [S25]; the DOTS-RTS community demo implements flow-field pathfinding in Burst jobs for "hundreds of units without frame drops" [S21].

### E. Fog of war / line of sight

- **F17.** Fog of war in games = hidden map areas; two implementation families in Unity: (a) texture-based - render units' visibility to a RenderTexture, sample it in a shader for revealed/visible/explored states; (b) tile-based - a visibility grid (int per tile: explored/unexplored/visible) that any agent-facing logic (AI, building placement, pathfinding) can query [S11][S20].
- **F18.** The tile/grid approach doubles as the AI visibility model: the opponent AI should consume the same grid so it cannot cheat. GameDev.tv's Unity 6 RTS course and Code Monkey's DOTS RTS course both implement fog of war and both use visibility data the gameplay code queries [S19][S20].
- **F19.** RenderTexture is a documented Unity resource type suitable for the texture-based approach; keep the low-res visibility buffer separate from the display buffer [S4 - RenderTexture scripting reference; see sources table for the specific page].

### F. Resource economy and building placement

- **F20.** The canonical economy loop: harvesters/resource nodes -> carry to drop-off (town hall/refinery) -> stockpile counters -> costs for units/buildings; queue-based production buildings (unit queue UI) - exactly the loop covered by the GameDev.tv curriculum ("resource gathering", production queues) and visible in the RTS Engine module list (economy + building systems) [S19][S17].
- **F21.** Building placement needs: grid snap (optional but standard), validity checks (occupied, terrain, resource-blocked), ghost preview, and construction-progress state (health ramp or build-time timer). Mina Pecheux's series literally starts with "Placing buildings" as tutorial #1 - evidence it is the first gameplay system worth having [S15].
- **F22.** Units/buildings should be data-driven: unit stats, costs, build times, tech requirements in ScriptableObjects (or ScriptableObject-backed config) so agents add content without touching code; both the GameDev.tv course ("config-driven systems, ScriptableObjects") and Mina Pecheux's tutorial #5 ("transforming our data into ScriptableObjects") converge on this [S19][S15][S5].

### G. Camera controls

- **F23.** The RTS camera standard: WASD/edge-scroll pan, mouse-wheel zoom, middle-mouse or Q/E rotate (optional), minimap click-to-jump. Implemented in every referenced RTS demo/course (DOTS-RTS: "WASD keys control camera movement, mouse zoom and rotation"; Mina Pecheux tutorial #10 "Moving the camera") [S21][S15].
- **F24.** Camera is trivially isolated: one CameraRig component + the Input System actions from F7; it is a good first system for agents to build because it needs no other system [S2][S21].

### H. Architecture recommendations

- **F25.** Default architecture for a local single-player RTS: MonoBehaviour components + plain C# game-state classes + ScriptableObject data assets + an event bus. This matches what every current RTS course/repo teaches and is the cheapest to build and debug [S19][S15][S5].
- **F26.** Event-driven communication: a lightweight event bus (C# events or ScriptableObject channels) decouples units/UI/AI; both GameDev.tv ("event bus system so your units can talk without yelling across the codebase") and Mina Pecheux ("Introducing an event system" interlude) teach it as a core pattern [S19][S15].
- **F27.** DOTS/ECS is the scale escape hatch: Entities 1.3.x is a supported package [S9]; official samples (EntityComponentSystemSamples, Megacity Metro) show the workflow including DOTS UI via UI Toolkit [S14][S13]. But DOTS raises the bar: no per-GameObject Animator by default, baking workflow, jobs+Burst discipline [S26][S9]. Only justified at horde scale (clarifying Q1 = d) or after profiling.
- **F28.** Hybrid is legitimate: keep game state + UI + AI in GameObject land; move only the hot loops (pathfinding/flow field, projectile updates) to Jobs/Burst or DOTS. The DOTS-RTS demo itself is "a hybrid object-oriented design inside a DOTS-based project" for formations [S21].
- **F29.** Object pooling is mandatory for projectiles, effects, and spawned units: pre-instantiate and activate/deactivate instead of Instantiate/Destroy; official Unity Learn tutorial documents the pattern [S23]. Pairs with the GPU Resident Drawer for render-side scaling [S22].
- **F30.** State machines for unit behavior (idle/move/attack/harvest/build/construct) - the GameDev.tv course builds unit AI with behaviour trees; a plain state machine is the simpler subset and is sufficient for the player's units. This is the same pattern the AI opponent angle will extend [S19].
- **F31.** Lockstep/deterministic-simulation frameworks (LockstepFramework 1.5k+ stars [S29], UnityLockstep [S30], LockstepRTSEngine [S31]) exist and are RTS-shaped, but they exist FOR multiplayer determinism (rollback, prediction). For a local single-player game they are pure overhead and a common "wrong tool" trap for agents - explicitly avoid. [S29][S30][S31]

### I. Rendering and performance (new techniques)

- **F32.** GPU Resident Drawer (Unity 6, URP Forward+) auto-instances GameObjects sharing meshes/materials via BatchRendererGroup; measured 43.5k draw calls -> 128 in a 35k-object test scene, at the cost of ~100 MB extra memory and longer builds; requires compute-capable APIs (not OpenGL ES) [S22][S27]. Entities Graphics is the ECS-native equivalent [S13].
- **F33.** SRP Batcher remains the baseline optimization for URP; GPU instancing for repeated units; keep materials/meshes shared across unit variants (prefab variants [S6]) so instancing works [S22][S27].
- **F34.** UI: UI Toolkit recommended for intensive HUD/menus (it's the actively developed system and has a DOTS UI sample); uGUI for world-space health bars and custom-shader UI; pick per-widget, not per-project [S7][S14].

### J. Save / load (local game requirement)

- **F35.** BinaryFormatter is dead (removed in .NET 9, security risk) - any agent referencing it must be corrected [S24]. JsonUtility is built-in but field/supported-type-limited and has no dictionary support [S4]; the community standard is Json.NET for Unity (free) - GameDev.tv migrated their save system from BinaryFormatter to Json.NET for exactly these reasons [S41].
- **F36.** Save design for RTS: serialize the game-state DTOs (resources, unit list with orders/queues, building list with construction progress, explored/visible grid, tech state) not Unity objects; a "save version" field is mandatory for forward compatibility [S4][S41].

## Existing solutions (landscape scan)

Component-level scan (the full project-level OSS RTS landscape is the `angle-oss` agent's lane; this angle covers the components a core-systems coder needs):

| Solution | Type | License | Last-commit signal | Fit for this use case |
|---|---|---|---|---|
| Unity AI Navigation (NavMesh) | Built-in package | Unity ToS (free with engine) | Actively versioned (2.0) [S8] | MVP pathfinding; tens of agents |
| A* Pathfinding Project | Asset (free tier + paid Pro) | Proprietary free/Pro | Actively maintained (site live, forum active) [S10] | Grid/navmesh A*, multithreaded, RTS-proven |
| Flow field (custom) | Pattern, no canonical lib | n/a | Reference impls in DOTS-RTS [S21], Code Monkey course [S20] | Horde movement; build after MVP |
| MinaPecheux/UnityTutorials-RTS | OSS tutorial repo | MIT (repo has no explicit license file - verify) | 725 stars, last activity 2026-07 [S15] | Learn-from: buildings, UI, resources, selection, ScriptableObjects, camera, event system |
| UnityTechnologies/ATerribleKingdom | Official Unity sample | Unity sample license | 849 stars, 2026 activity [S16] | Learn-from: small RTS built on Timeline+NavMesh+Cinemachine |
| gadget114514/DOTS-RTS | OSS demo | no LICENSE file (verify) | 2025-08, 52 commits [S21] | Learn-from: DOTS RTS incl. flow field, formations, drag-box select |
| Strategy Kit: RTS Engine | Commercial asset | Asset Store EULA (single entity) | $85, v6000 (2025-08) [S17] | Full framework purchase option; heavy integration |
| RTS Engine (SoumiDelRio) | Commercial asset | Asset Store EULA | $60, older lineage (2019 v1.4 era) [S18] | Older full framework; Unity-version risk |
| LockstepFramework / UnityLockstep / LockstepRTSEngine | OSS frameworks | MIT (verify per repo) | 1.5k/711/183 stars; UnityLockstep archived [S29][S30][S31] | NOT for single-player - network determinism; avoid |
| stormtek/unity-rts-demo | OSS demo | MIT | 425 stars, created 2012, last push 2026-03 [S28][S32] | Old but clean minimal RTS foundation; Unity version drift risk |
| coconauts/startcraft-unity3d | OSS recreation | no LICENSE (verify) | 703 stars, 2017 [S33] | Learn-from: StarCraft-style systems in Unity |

Scan method: GitHub search API (`unity rts language:C#`, sorted by stars, 1469 total hits) [S28] + web search for courses/assets [S19][S20][S37]. License of several OSS repos unstated - flag "verify license before use" per rules.

## Build vs. reuse decisions - please confirm

1. **Component "pathfinding"** - reuse Unity AI Navigation (built-in, free, maintained [S8]) for the MVP / switch to flow-field-or-grid-A* (build, ~1-2 weeks, or A* Pathfinding Project free tier [S10]) when hordes demand it. Your call: _______
2. **Component "full RTS framework"** - learn-from OSS repos (Mina Pecheux [S15] / ATerribleKingdom [S16] / startcraft [S33], free, MIT-or-verify) / buy Strategy Kit: RTS Engine ($85, commercial EULA [S17]) / build from scratch (full control, 2-4 months to feature parity with a template). Your call: _______
3. **Component "architecture"** - GameObject/MonoBehaviour + ScriptableObject + event bus (default, matches all current courses [S19][S15]) / DOTS/ECS from day one (only if horde scale confirmed, Q1=d [S9][S26]) / hybrid (GameObject game + Jobs/Burst hot loops [S21]). Your call: _______
4. **Component "save system"** - JsonUtility (built-in, zero deps, limited types [S4]) / Json.NET for Unity (free, community standard [S41]) / custom binary (overkill for local). Your call: _______
5. **Component "UI"** - uGUI for everything (simplest, world-space bars included [S7]) / UI Toolkit for menus+HUD + uGUI for world-space bars (modern split, matches Unity's own DOTS UI sample [S14][S7]). Your call: _______

## Feasibility verdict

- **Can do:** yes
- **Confidence:** HIGH
- **Why:** Every required system has a documented Unity path verified at access date: input [S1][S2], NavMesh/AI Navigation [S8], A*/flow-field alternatives [S10][S20][S21], ScriptableObject data [S5], pooling [S23], save [S4][S24], UI [S7]. Multiple complete RTS tutorials/repos prove the whole loop is buildable by an agent-followable path [S15][S19][S20][S21]. The only verdict-flipping unknowns are scale (DOTS fork) and 2D/3D - both are user answers, not technical blockers. Confidence is HIGH for "a playable local single-player RTS is buildable in Unity"; the open items change HOW, not WHETHER.

## User needs from the agent

What the user (and any agent inheriting this research) explicitly needs, restated as requirements:

- The research must be self-sufficient for ANY agent: named systems, ordered build sequence, per-system checklists (below), and avoid-lists - an agent should not need to re-research before coding.
- "New techniques" must be included: GPU Resident Drawer/instancing [S22][S27], DOTS/ECS at scale [S9][S25], flow fields [S20][S21], behavior trees/state machines [S19], ScriptableObject-driven config [S5][S19], event bus [S15][S19], UI Toolkit [S7], modern save formats (not BinaryFormatter) [S24].
- An open-source cornerstone candidate must be identified and evaluated (deep-dive in angle-oss; core-relevant candidates listed in the landscape scan above).
- Hard constraint guardrails for the agent: local-only (no lockstep/netcode [S29]-[S31]), Unity 6 current docs, version-pinned packages, and "what to use / what to avoid" decisions that a coder can execute without asking.
- Results saved into a new folder (master's P1T5 merge creates `research/unity-rts-2026-08-14/`; my deliverable is this angle file under `share/notes/`).

## Per-system "what needs to be done" checklist (coder-executable)

1. **Project setup**: Unity 6 LTS (6000.x), URP template, install Input System package (deactivate legacy) [S1][S2], install AI Navigation package [S8], pin all versions in `Packages/manifest.json`.
2. **Input + camera** (build first - zero dependencies): Input System actions (F7) -> CameraRig (WASD/edge pan, wheel zoom, rotate) [S21][S15][F23][F24].
3. **Selection**: SelectableRegistry + raycast click-select, marquee box-select (screen-space rect vs world positions), Shift add/remove [F8][F9][S21].
4. **Orders + movement**: order structs + queue (Shift), NavMeshAgent movement via movement abstraction (F12-F15), formation slots [F10][F11][F12].
5. **Units as prefabs**: unit Prefab + ScriptableObject stats (HP, speed, damage, cost, build time) [S5][S6][S19].
6. **Economy**: resource nodes + harvesters + drop-off + stockpile + production queues [F20][S19][S17].
7. **Building**: grid snap + validity + ghost + construction progress; hook NavMesh carving/obstacle on completion [F21][F14][S15].
8. **Combat**: attack orders, range/line-of-sight checks, damage events via event bus, pooling for projectiles/effects [F10][F26][F29][S23].
9. **Fog of war**: visibility grid (explored/visible) + optional RenderTexture display; expose grid to AI [F17][F18][S11].
10. **UI**: resource counter, selection panel, build menu, minimap; uGUI or UI Toolkit per decision 5 [F34][S7].
11. **Save/load**: DTO classes + JsonUtility/Json.NET + save version; serialize orders/queues/FoW grid [F35][F36][S4][S41].
12. **Performance pass** (after playable, before polish): pooling audit, shared materials for instancing, GPU Resident Drawer evaluation [F32][F33][S22][S27].
13. **AI opponent** (handoff to angle-ai research): consumes the same visibility grid + order pipeline.

## Recommendations for the planning agent

- Encode the MVP order as phases with a hard gate: Phase 1 = setup + input + camera + selection + move orders ("you can select a unit and walk it around"); Phase 2 = economy + building + production; Phase 3 = combat; Phase 4 = fog of war + minimap; Phase 5 = save/load; Phase 6 = AI opponent; Phase 7 = polish/performance. Nothing after Phase 1 before the loop is playable.
- Pin versions at plan time: Unity 6000.x LTS, Input System 1.13+/1.14, AI Navigation 2.0, Entities only if scale chosen. Record the decision in `99_decisions.md`.
- Mandate the movement abstraction (interface + NavMesh impl) even in Phase 1 - retrofitting flow fields later is the classic RTS rewrite [F12-F15].
- Mandate "no BinaryFormatter, no lockstep/netcode" as explicit agent guardrails [S24][S29]-[S31].
- Get the user's answers to the 4 clarifying questions + the 5 build-vs-reuse decisions BEFORE the plan locks - the scale answer (Q1) is the only gate that changes the architecture.
- Defer all AI-opponent specifics to the `angle-ai` research file; this angle proves the player-side systems and the shared visibility/order interfaces the AI will consume [F10][F18].

## Open questions for the user

1. Max concurrent units on screen (drives GameObject vs DOTS) - see clarifying Q1.
2. 2D vs 3D presentation - see clarifying Q2.
3. Art/audio sourcing - see clarifying Q3.
4. Save semantics: mid-match save/load vs campaign progress only - see clarifying Q4.
5. (Build-vs-reuse, separate block above - please answer the 5 numbered decisions there.)

## Contradictions and caveats

- **DOTS readiness**: Unity marketing says DOTS is production-ready and RTS-appropriate (Door 407 quote [S25], Megacity Metro [S13]); community 2026 guides say "ECS 1.0 and Burst production-ready, but some features still evolving" and "not all Unity features are DOTS-ready (e.g., NavMesh)" [S26]. We report both; the decision driver is the scale answer, and NavMesh-on-DOTS must be assumed community-solved, not native [S26].
- **GPU Resident Drawer**: dramatic draw-call wins in a foliage scene (43.5k -> 128 calls) [S27] vs forum reports of equal-or-worse performance with Entities rendering and a "black ground mesh" bug interaction [S40]. We report both; mitigation = profile-before-enable [F32].
- **NavMesh documentation location**: my first four Unity-manual URLs (InputSystem.html, nav-NavigationSystem.html, entities.html, UnderstandingPerformanceObjectPooling.html) 404'd at access date - the docs moved to package manuals [S2][S8][S9]. Any agent using old doc URLs must expect dead links; the package-manual URLs above are the verified live ones.
- **Could not verify**: (1) Semantic Scholar API rate-limited twice (HTTP 429) - academic pathfinding-paper citations are therefore NOT included; flow-field/A* claims rest on product docs + shipped demo code instead [S10][S21][S20]. (2) Unity Discussions ECS-status thread returned HTTP 403 - DOTS-status claims rely on secondary sources [S26]. (3) The separate `Unity-Technologies/navmesh` GitHub repo 404'd; AI Navigation package docs used instead [S8]. (4) The classic flow-field article (leifnode.com) and gamedev.net flow-field tutorial both 404'd; flow-field claims cite the DOTS-RTS demo and Code Monkey course which implement it [S21][S20]. (5) Unity Manual "Object Pooling" page URL variants 404'd; the official Unity Learn object-pooling tutorial is cited instead (verified in 2019.4 - pattern is engine-version-independent) [S23]. (6) Several OSS repos have no LICENSE file (Mina Pecheux, DOTS-RTS, startcraft) - flagged "verify license before use" [S15][S21][S33].

## Self-critique

- **Did I do my job?** Partial. The core-systems evidence base is verified against primary sources and the MVP/checklist/avoid guidance is actionable. I did NOT cover (a) opponent AI techniques and (b) the full OSS-cornerstone deep-eval - both are explicitly other angles' lanes (angle-ai, angle-oss), and I deferred with pointers rather than duplicating.
- **What might I have missed?** (1) Performance numbers for NavMesh crowds at scale - I found no authoritative Unity doc on agent-count ceilings; the claim rests on community guides [S26] and the existence of flow-field alternatives. (2) Audio, game-feel, and localization are absent from the findings - not core-systems, but a coder will hit them; flagged for angle-techniques. (3) I did not verify Unity version numbers beyond 6000.6 (e.g., whether "Unity 7" has shipped by 2026-08-14 - out of scope; docs accessed all read Unity 6). (4) RTS Engine docs module list was fetched but its detailed module breakdown was not extracted (landscape row cites the asset page + docs landing) [S17].
- **What did I assume without evidence?** (1) That the user has a Unity license/installed Unity - assumed from the task constraint "Unity engine only" (if not, Unity Personal is free; not verified). (2) That "no multiplayer" also means no local split-screen - assumed from "just user play the game vs the ai". (3) That player skill target is casual - assumed from the phrasing; affects AI difficulty curve (angle-ai's call). (4) That Json.NET for Unity is still free/available - the GameDev.tv community thread (2021) and Asset Store listing say free; not re-verified at access date [S41].

## Metrics

- findings_count: 36
- risks_HIGH: 2
- risks_MEDIUM: 3
- risks_LOW: 3
- clarifying_questions: 4

## Sources

All sources accessed 2026-08-14. Unity version noted per row where applicable.

| # | Source | Type | URL | Notes |
|---|--------|------|-----|-------|
| [S1] | Unity Manual: Input (Unity 6.0 / 6000.0) | official-docs | https://docs.unity3d.com/6000.0/Documentation/Manual/Input.html | Two input systems documented |
| [S2] | Unity Package Docs: Input System 1.13.1 manual | official-docs | https://docs.unity3d.com/Packages/com.unity.inputsystem@1.13/manual/index.html | Replacement for legacy; 1.14 also live |
| [S3] | Unity Manual: Input Manager (6000.0) | official-docs | https://docs.unity3d.com/6000.0/Documentation/Manual/class-InputManager.html | Legacy virtual axes |
| [S4] | Unity Scripting API: JsonUtility (6000.0) | official-docs | https://docs.unity3d.com/6000.0/Documentation/ScriptReference/JsonUtility.html | Fields-only serializer; save-state example |
| [S5] | Unity Manual: ScriptableObject (6000.0) | official-docs | https://docs.unity3d.com/6000.0/Documentation/Manual/class-ScriptableObject.html | Data assets independent of GameObjects |
| [S6] | Unity Manual: Prefabs (6000.0) | official-docs | https://docs.unity3d.com/6000.0/Documentation/Manual/Prefabs.html | Variants, nesting, runtime instantiation |
| [S7] | Unity Manual: UI system comparison (6000.0) | official-docs | https://docs.unity3d.com/6000.0/Documentation/Manual/UI-system-compare.html | UI Toolkit vs uGUI vs IMGUI; table labeled Unity 6.6 |
| [S8] | Unity Package Docs: AI Navigation 2.0 | official-docs | https://docs.unity3d.com/Packages/com.unity.ai.navigation@2.0/manual/index.html | NavMesh, agents, obstacles, links |
| [S9] | Unity Package Docs: Entities 1.3.15 overview | official-docs | https://docs.unity3d.com/Packages/com.unity.entities@1.3/manual/index.html | DOTS/ECS data-oriented overview |
| [S10] | A* Pathfinding Project (Aron Granberg) | product-page | https://arongranberg.com/astar/ | Grid/navmesh A*, multithreading, free/Pro |
| [S11] | Wikipedia: Fog of war | wiki | https://en.wikipedia.org/wiki/Fog_of_war | Definition; gaming usage |
| [S12] | Wikipedia: Real-time strategy | wiki | https://en.wikipedia.org/wiki/Real-time_strategy | Genre definition; Dune II origin |
| [S13] | GitHub: Unity-Technologies/megacity-metro | web (OSS demo) | https://github.com/Unity-Technologies/megacity-metro | Official DOTS sample, 150 players, Entities Graphics + URP |
| [S14] | GitHub: Unity-Technologies/EntityComponentSystemSamples | web (OSS) | https://github.com/Unity-Technologies/EntityComponentSystemSamples | Official samples incl. DOTS UI (UI Toolkit) |
| [S15] | GitHub: MinaPecheux/UnityTutorials-RTS | web (OSS) | https://github.com/MinaPecheux/UnityTutorials-RTS | 725 stars; buildings, UI, resources, events, selection, ScriptableObjects, camera; license not stated - verify |
| [S16] | GitHub: UnityTechnologies/ATerribleKingdom | web (OSS) | https://github.com/UnityTechnologies/ATerribleKingdom | Official small RTS sample; Timeline + NavMesh + Cinemachine |
| [S17] | Unity Asset Store: Strategy Kit: RTS Engine | product-page | https://assetstore.unity.com/packages/tools/game-toolkits/strategy-kit-rts-engine-79732 | $85, Unity 6000.0.51 compatible, release 2025-08; docs at docs.gamedevspice.com |
| [S18] | Unity Asset Store: RTS Engine (SoumiDelRio) | product-page | https://assetstore.unity.com/packages/templates/packs/rts-engine-79732 | $60, older lineage, 59 reviews |
| [S19] | GameDev.tv: Unity Real Time Strategy course | product-page | https://gamedev.tv/courses/unity-realtime-strategy | Unity 6, 25.5h, behaviour trees, fog of war, config-driven, event bus, ScriptableObjects |
| [S20] | Code Monkey: Learn Unity DOTS! (RTS course) | web | https://unitycodemonkey.com/dotsfreecourse.php | 7h free YouTube DOTS RTS: selection, fog of war, flow-field pathfinding |
| [S21] | GitHub: gadget114514/DOTS-RTS | web (OSS) | https://github.com/gadget114514/DOTS-RTS | DOTS RTS demo: flow field, formations, drag-box select, WASD camera; license not stated - verify |
| [S22] | Unity Manual: GPU Resident Drawer (URP, 6000.5) | official-docs | https://docs.unity3d.com/6000.5/Documentation/Manual/urp/gpu-resident-drawer-performance.html | Requirements: Forward+, compute APIs; BRG instancing |
| [S23] | Unity Learn: Introduction to Object Pooling | official-docs | https://learn.unity.com/tutorial/introduction-to-object-pooling | Official pooling pattern (verified 2019.4; engine-version-independent) |
| [S24] | .NET Blog: BinaryFormatter removed from .NET 9 | official-docs | https://devblogs.microsoft.com/dotnet/binaryformatter-removed-from-dotnet-9/ | Removal + CWE-502 rationale; migration options |
| [S25] | Unity: DOTS official page | official-docs | https://unity.com/dots | Door 407 RTS uses DOTS for pathfinding (marketing quote) |
| [S26] | quickunitytips: Unity DOTS & ECS 2026 guide | blog [secondary] | https://quickunitytips.blogspot.com/2025/11/unity-dots-ecs-2025-guide.html | Benchmarks; "NavMesh not DOTS-ready" limitation |
| [S27] | theknightsofu.com: GPU Resident Drawer deep dive | blog [secondary] | https://theknightsofu.com/boost-performance-of-your-game-in-unity-6-with-gpu-resident-drawer/ | 43.5k -> 128 draw calls; +100MB memory; longer builds |
| [S28] | GitHub Search API: "unity rts" language:C# | web (API output) | https://api.github.com/search/repositories?q=unity+rts+language:C%23&sort=stars | 1469 results; landscape baseline |
| [S29] | GitHub: nibsbin/LockstepFramework | web (OSS) | https://github.com/nibsbin/LockstepFramework | 1528 stars; lockstep RTS/MOBA framework (network-oriented - avoid for local) |
| [S30] | GitHub: proepkes/UnityLockstep | web (OSS, archived) | https://github.com/proepkes/UnityLockstep | 711 stars; archived deterministic lockstep ECS |
| [S31] | GitHub: mrdav30/LockstepRTSEngine | web (OSS, WIP) | https://github.com/mrdav30/LockstepRTSEngine | 183 stars; WIP deterministic lockstep engine |
| [S32] | GitHub: stormtek/unity-rts-demo | web (OSS) | https://github.com/stormtek/unity-rts-demo | 425 stars; 2012 demo, last push 2026-03 (stale core, Unity-version risk) |
| [S33] | GitHub: coconauts/startcraft-unity3d | web (OSS) | https://github.com/coconauts/startcraft-unity3d | 703 stars; StarCraft recreation; license not stated - verify |
| [S34] | Unity Learn home | official-docs | https://learn.unity.com/ | 750+ hours free content |
| [S35] | Unity Learn: The A* Algorithm project | official-docs (dead link) | https://learn.unity.com/project/a-36369ng | "No longer available" at access date - drift evidence |
| [S36] | darkounity.com: Getting started with Unity 6 DOTS & ECS in 2026 | blog [secondary] | https://darkounity.com/blog/getting-started-with-unity-6-dots-and-ecs-in-2026 | DOTS learning-path evidence |
| [S37] | soldier.jp: 25 Best Unity Templates and Starter Kits for 2026 | web [secondary] | https://unityasset.soldier.jp/en/unity-template-assets/ | Lists Strategy Core RTS template (marquee selection, NavMesh) |
| [S38] | GitHub: skhamis/Unity-ECS-RTS | web (OSS) | https://github.com/skhamis/Unity-ECS-RTS | 240 stars; 2019 pure-ECS RTS recreation attempt |
| [S39] | GitHub: skyteks/WarKingdoms | web (OSS) | https://github.com/skyteks/WarKingdoms | 240 stars; WC3-style RTS prototype |
| [S40] | Unity Discussions: Entities + GPU Resident Drawer (Feb 2025) | web [forum] | https://discussions.unity.com/t/entities-graphics-gpu-resident-drawer-gpu-instancing/1594113 | Forum reports of regressions/bugs with GRD + Entities |
| [S41] | GameDev.tv community: Replacing BinaryFormatter with Json.NET | web [secondary] | https://community.gamedev.tv/t/saving-system-upgrade-replacing-binaryformatter-with-json-net/174046 | Save-system migration rationale; Json.NET free for Unity |
