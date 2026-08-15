# 01 - RTS Core Architecture (Unity)

Source: angle-core research (36 findings, 41 sources). Verdict: feasible, HIGH confidence.

## Architecture verdict

**Default: GameObject/MonoBehaviour components + plain C# game-state classes + ScriptableObject data assets + event bus.** This matches every current Unity RTS course and working repo, and is the cheapest to build and debug.

- **Event bus** (C# events or ScriptableObject channels) decouples units, UI and AI.
- **DOTS/ECS (Entities 1.3.x)** is a scale escape hatch only: no per-GameObject Animator, baking workflow, Jobs+Burst discipline, 3-5x dev time. Adopt only at horde scale (thousands of units) or after profiling proves a bottleneck.
- **Hybrid is legitimate:** GameObject game + Jobs/Burst only for hot loops (pathfinding, flow fields, projectiles).
- **Lockstep/netcode frameworks are the wrong tool** for local single-player: they exist for multiplayer determinism. Do not use them.

## System-by-system

### 1. Input (new Input System)
- Unity 6 ships two input systems; legacy Input Manager is default until the Input System package is installed. Install the package and deactivate legacy.
- Legacy Input.GetAxis cannot express RTS modifiers (Shift-add, Ctrl-force-move). Use Action Maps.
- Define named actions early; names become the input-to-command contract:
  `SelectUnit, BoxSelectDrag, MoveOrder, AttackOrder, QueueModifier/Shift, PanCamera, ZoomCamera, RotateCamera, BuildHotkeys`

### 2. Camera (build first, zero dependencies)
- WASD / edge-scroll pan + wheel zoom + middle-mouse / Q-E rotate + minimap click-to-jump.
- Isolated CameraRig component. Cinemachine 3.1 explicitly supports "top down, and RTS" (FreeLook rigs; ATerribleKingdom uses two FreeLook rigs + GroupTarget + dummy-object follow).

### 3. Selection
- Canonical stack: click-select, marquee/drag-box, Shift add/remove, click-empty deselect.
- Implement against a SelectableRegistry + spatial hash, NOT per-frame physics raycasts on hundreds of units.

### 4. Orders and movement (build the abstraction FIRST)
- Orders = command pipeline with serializable order structs (type, targetId, position, queue slot). Shift queues orders. The SAME pipeline is reusable by the AI.
- Formations: slot assignment at order-execution time (FormationBase + Factory, square/arrow/circle), not at movement time.
- **Movement abstraction is mandatory from Phase 1:** an interface + NavMesh implementation. Retrofit is a classic rewrite. Pathfinding families by scale:
  1. **NavMeshAgent** (AI Navigation 2.0 package, built-in, free): tens of agents, MVP.
  2. **Grid A\*** (A\* Pathfinding Project, de-facto standard; grid + Recast navmesh graphs, navmesh cutting, multithreading, free tier + paid Pro): hundreds of agents.
  3. **Flow fields** (direction vector field per frame): amortizes hundreds to thousands of units; proven in DOTS-RTS demo + Code Monkey course.
- NavMesh supports dynamic obstacles/links, but building placement must trigger carving from day one. NavMesh crowds degrade with many same-target agents.

### 5. Fog of war
- Two layers, two purposes:
  - **Display:** render units' visibility to a low-res RenderTexture, sample in shader (community standard).
  - **Logic:** tile-based visibility grid (explored/unexplored/visible per tile) that AI, building and pathfinding logic query.
- The grid doubles as the AI's perception model (the AI must not cheat - see 02).

### 6. Economy and building
- Canonical loop: harvesters -> resource nodes -> drop-off (town hall/refinery) -> stockpile -> costs. Queue-based production buildings.
- Building placement: grid snap + validity checks (occupied/terrain/resource) + ghost preview + construction progress (health ramp or timer) + NavMesh carve hook on completion.
- Units/buildings data-driven via ScriptableObjects (MinaPecheux tutorial set is the reference for placement + SO conversion).

### 7. Combat
- Attack orders, line-of-sight checks, damage events through the event bus, object pooling for projectiles/effects/units (pre-instantiate, activate/deactivate; Unity Learn tutorial documents the pattern).

### 8. Save/load
- **BinaryFormatter is DEAD**: removed in .NET 9 (2024), CWE-502 security risk, always throws (MSB3825 warnings).
- **JsonUtility** (built-in): fields-only, no Dictionary, supported types only.
- **Json.NET for Unity** (community standard, free): dictionaries/polymorphism; GameDev.tv migrated to it.
- Design: serialize game-state DTOs (resources, unit list with orders+queues, buildings with construction progress, explored/visible grid, tech state), NOT Unity objects. Mandatory save-version field. Write to Application.persistentDataPath.

### 9. Unit behavior
- State machines (idle/move/attack/harvest/build/construct) are sufficient for player units.

### 10. Rendering and UI
- **GPU Resident Drawer** (Unity 6, URP Forward+): auto-instancing via BatchRendererGroup; measured 43.5k -> 128 draw calls in a 35k-object scene, BUT ~100MB extra memory, longer builds, requires compute APIs (not OpenGL ES). Evaluate late, profile before/after.
- **SRP Batcher** = baseline URP optimization. GPU instancing for repeated units (shared meshes/materials, prefab variants). Skinned Mesh Renderers are NOT instanceable.
- **UI Toolkit** for intensive HUD/menus (actively developed, DOTS UI sample exists); **uGUI** for world-space health bars + custom-shader UI; IMGUI = editor-legacy, not runtime. Pick per-widget.

## Landscape scan (component level)

| Item | Type | Use |
|---|---|---|
| AI Navigation 2.0 | built-in, active | MVP pathfinding |
| A* Pathfinding Project | proprietary free/Pro, active | grid/navmesh multithreaded, RTS-proven |
| Flow field pattern | no canonical lib | horde movement |
| MinaPecheux/UnityTutorials-RTS | OSS, 725 stars, license verify | learn-from: buildings/UI/resources/selection/SO/camera/events |
| UnityTechnologies/ATerribleKingdom | official sample, 849 stars | learn-from: small RTS, Timeline+NavMesh+Cinemachine |
| gadget114514/DOTS-RTS | OSS demo, no LICENSE | learn-from: DOTS, flow fields, formations, drag-box select |
| Strategy Kit RTS Engine | $85 commercial | purchase option, heavy integration (verify at purchase) |
| LockstepFramework / UnityLockstep / LockstepRTSEngine | OSS | AVOID: network determinism, wrong tool |

## Build-vs-reuse decisions (need user input, see 07)

1. Pathfinding: AI Navigation MVP -> flow-field/grid A* later, or A* Project free tier now.
2. Full RTS framework: learn-from OSS / buy (unverified) / build from scratch (2-4 months).
3. Architecture: GameObject+SO+event bus (default) / DOTS day one / hybrid.
4. Save: JsonUtility / Json.NET.
5. UI: uGUI everywhere / UI Toolkit HUD + uGUI world-space.

## User needs from the agent (requirements)

Self-sufficient research: named systems, ordered build sequence, per-system checklists, avoid-lists - no re-research needed. New techniques included (GRD/instancing, DOTS at scale, flow fields, BTs/state machines, SO-driven config, event bus, UI Toolkit, modern save). OSS cornerstone identified. Local-only guardrails. Results in a new folder.