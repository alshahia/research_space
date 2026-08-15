# 05 - Build Roadmap (What Needs To Be Done)

Synthesized from all four angles. 13 phases, ordered by dependency, with hard gates. Estimate: 2-4 months for a build-from-scratch vertical slice to playable opponent, solo dev pace.

## Lock BEFORE starting (decisions that change the plan)

1. Unity version: **6.3 LTS** (recommended; 6.0 LTS ends Oct 2026).
2. Render pipeline: **URP** (default 3D URP template).
3. Input: **new Input System** (install package, deactivate legacy).
4. Unit-count target (07): drives GameObject vs DOTS and pathfinding family.
5. Save scope (07): in-match save/load vs between-match progress.
6. 2D vs 3D (07), art source (07), AI difficulty philosophy (07), paid-tools budget (07).

## MVP phases

| Phase | Scope | Hard gate to pass |
|---|---|---|
| P1 | Setup: Unity 6.3 LTS, URP template, Input System (legacy off), AI Navigation 2.0, versions pinned in manifest.json | Project opens, builds, runs empty scene |
| P2 | Input + camera: named actions -> CameraRig (pan/zoom/rotate/minimap-jump) | WASD/edge pan + wheel zoom work |
| P3 | Selection: SelectableRegistry + click + marquee + Shift add/remove + deselect | Box-select selects, Shift modifies |
| P4 | Orders + movement: order structs + queue + Shift-queue + movement abstraction (NavMesh impl) + formation slots | Units move to order, queue works, abstraction in place |
| P5 | Units as prefabs + ScriptableObject stats | New unit type = new SO, no code |
| P6 | Economy: nodes + harvesters + drop-off + stockpile + production queues | Harvest loop completes, costs deduct |
| P7 | Building: grid snap + validity + ghost preview + construction progress + NavMesh carve hook | Placement validates, carving works |
| P8 | Combat: attack orders, LOS checks, damage events (event bus), pooling | Units fight, projectiles pooled |
| P9 | Fog of war: visibility grid + render-texture display; grid exposed to AI | Hidden unit invisible to player AND AI |
| P10 | UI: resources, selection panel, build menu, minimap | HUD reads event bus, no coupling |
| P11 | Save/load: DTOs + JSON + version field (mid-match state) | Save -> reload -> identical state |
| P12 | Performance pass: pooling audit, shared materials, GPU Resident Drawer evaluation | Profile numbers before/after |
| P13 | AI opponent: perception -> build orders -> economy -> production -> combat -> scouting -> attack scheduler -> difficulty governor | AI plays a full game vs player |

## Per-system checklists (coder-executable)

### Movement/pathfinding (P4, P13)
- [ ] IMovementProvider interface + NavMeshAgent implementation from day one
- [ ] Order queue with Shift append (shared command pipeline)
- [ ] Building placement triggers NavMesh carving (from P7, never retrofit)
- [ ] Scale upgrade path documented: NavMesh (tens) -> grid A* (hundreds) -> flow fields (thousands)

### Selection (P3)
- [ ] SelectableRegistry + spatial hash (no per-frame physics raycasts)
- [ ] Click, marquee, Shift add/remove, click-empty deselect

### Economy (P6)
- [ ] Harvester -> node -> drop-off -> stockpile -> cost loop
- [ ] Queue-based production buildings
- [ ] ScriptableObject data for all units/buildings/costs

### Building (P7)
- [ ] Grid snap, validity checks (occupied/terrain/resource), ghost preview, construction progress

### Fog of war (P9)
- [ ] Tile visibility grid (explored/unexplored/visible) as the logic source of truth
- [ ] RenderTexture visibility mask for display
- [ ] AI perception reads the SAME grid (fairness test: AI cannot see FoW-hidden unit)

### Combat (P8)
- [ ] Attack orders via command pipeline, LOS checks, damage events, object pooling

### Save (P11)
- [ ] [Serializable] DTOs, NO Dictionary, NO BinaryFormatter
- [ ] Save-version field; write to Application.persistentDataPath
- [ ] JsonUtility or Json.NET (decision 07/04)

### AI opponent (P13, 9-system checklist from 02)
- [ ] Perception system (AI-only view model, FoW-fed)
- [ ] Build-order engine (data-driven, branching)
- [ ] Economy manager (worker allocation, saturation, spend priorities)
- [ ] Production/army manager (utility scoring vs counters, rally points)
- [ ] Tactical/combat manager (targeting, engagement/retreat, formations)
- [ ] Scouting manager (patrols, expansion detection, last-known push)
- [ ] Attack scheduler (waves + thresholds + multi-prong)
- [ ] Difficulty governor (handicap dials, optional DDA)
- [ ] Integration shell (coroutine ticks, cached yields, event hooks, decision logging + Gizmos, zero per-frame allocations)

### UI (P10)
- [ ] UI Toolkit HUD/menus/minimap chrome + uGUI world-space health bars
- [ ] All UI reads the event bus; zero direct unit coupling

## Guardrails for any agent (hard rules)

- NO lockstep/netcode frameworks (local single-player)
- NO BinaryFormatter (removed in .NET 9)
- NO Dictionary in JsonUtility DTOs
- NO RL/LLM opponent in v1
- NO Skinned Mesh Renderers for units
- NO baked CPU occlusion culling on open maps
- NO copying code from GPL/unlicensed repos (learn-from only)
- MIT reuse (MinaPecheux) only with attribution, or read-only
- Movement abstraction from P4; building carve hooks from P7; NEVER retrofit
- Pin every version; re-verify doc URLs at implementation time

## Estimated effort (solo dev, community consensus)

- Vertical slice (P1-P11 minus polish): 4-8 weeks
- AI opponent (P13): 3-6 weeks
- Performance pass (P12): 1-2 weeks
- DOTS/ECS upgrade if ever needed: 3-5x the equivalent MonoBehaviour work
- Flow fields: 2-4 days (if mass movement underperforms)
- Custom grid A*: 2-3 weeks (only if >1M cells)
- FoW (render-texture): 3-7 days incl. shader; tile shadowcasting 2-4 days