# 04 - New Techniques and Tooling

Source: angle-techniques research (16 findings, 52 sources). Verdict: feasible, MEDIUM confidence (hype filtering required).

## Baseline stack (lock BEFORE planning)

- **Unity 6.3 LTS** (released Dec 2025, supported to Dec 2027). Unity 6.0 LTS ends Oct 2026; 6.2 GA status could not be verified (404) - re-check at install.
- **URP** (default Unity 6 3D (URP) template). HDRP not justified for RTS; Built-in = legacy, no SRP Batcher/GRD.
- **New Input System** package (legacy Input Manager default until installed).
- **AI Navigation 2.0** package (NavMesh).
- Pin ALL versions in Packages/manifest.json and 99_decisions.md.

## Technique verdicts

### DOTS/ECS (Entities 1.3.x)
- First-class Unity 6 (official samples 8.2k stars). Payoff at tens of thousands of entities; overkill for hundreds-to-few-thousand skirmish units.
- A* Pathfinding Project v5.0 (Feb 2024) added Burst/Jobs/ECS support - the DOTS pathfinding escape hatch.
- "Unity acquired A* Project (2024)": COULD NOT BE VERIFIED - treat as third-party.
- **Recommended middle path:** MonoBehaviour OOP + Jobs/Burst for hot loops only. ECS phase-2 upgrade only if profiling demands.

### Pathfinding
- NavMesh + AI Navigation 2.0: proven MVP. No Entities/NavMesh integration docs found (DOTS navmesh support unverified).
- Grid A*: A* Pathfinding Project explicitly targets "TD, RTS, FPS or RPG".
- HPA* (hierarchical A*): published research (Harabor & Botea, IEEE CIG 2008, DOI 10.1109/cig.2008.5035648); NO verified turnkey Unity package - build only for very large maps.
- Flow fields: OSS repos exist (danjm-dev, ChirlChen, vonWolfehaus) - verify licenses. ElijahZawesome 404 (abstention).
- RVO2 crowd avoidance: snape/RVO2 (960 stars, license verify); typically consumed via A* Pro RVO or custom separation (~2-5 days).

### Rendering stack (the contract)
- **URP + SRP Batcher + GPU instancing** (one atlased material per faction; per-instance properties).
- **GPU Resident Drawer** (Unity 6, URP Forward+): auto BatchRendererGroup instancing; big wins (43.5k -> 128 draw calls measured) BUT ~100MB extra memory, longer builds, compute APIs required (not OpenGL ES). Forum regressions reported with Entities rendering. Evaluate late, profile before/after.
- **GPU occlusion culling** in URP/HDRP; NOT baked CPU occlusion culling for open RTS maps.
- **Skinned Mesh Renderers are NOT instanceable** - use non-skinned units or accept the cost.
- LOD groups for distance detail. Low-poly units = simpler LOD story.
- Terrain system fine for small-mid maps; mesh-based ground for large/perf-critical.
- Compute shaders: FOW visibility updates, unit-position sweeps, particles - the scaling path, not the default.

### Fog of war (modern)
- Community standard: render-texture visibility mask (draw unit vision circles into low-res RT per frame, optional GPU blur, sample in shaders). OSS cribs: AsehesL/FogOfWar, xddemir/Unity-Fog-of-War (full impl + shaders).
- Tile-based shadowcasting: deterministic alternative, doubles as the AI known-map.
- GPU-compute FOW: scaling path for huge maps.
- Minimap: top-down camera to small RT (community consensus).

### UI
- **UI Toolkit:** "multi-resolution menus and HUD in intensive UI projects" - Unity's own recommendation for HUD/menus/minimap chrome.
- **uGUI:** world-space UI + custom-shader UI (health bars, labels).
- IMGUI: editor-legacy, not runtime.
- No third-party UI framework.

### Save
- **Never BinaryFormatter** (removed .NET 9, always throws, MSB3825 warnings).
- JsonUtility: `ToJson/FromJson/FromJsonOverwrite` over public fields + `[Serializable]`; fields only, primitives/enums/Unity types/arrays/List<T>. **Dictionary is NOT a serialized field type** (biggest save trap).
- Newtonsoft Json.NET for Unity (MIT) if dictionaries/polymorphism needed.
- Write to Application.persistentDataPath; PlayerPrefs for small settings only. Save DTOs without dictionaries, with version field.

### Performance targets (community consensus, NOT official benchmarks)
- MonoBehaviour + pooling: ~1-3k simple units at 60fps on desktop.
- DOTS/ECS + Burst + instancing: order of magnitude higher.
- Healthy local target: a few thousand units. Profile in a Player build (Profiler + Frame Debugger), not just the Editor.

### Object pooling
- Standard practice for projectiles/effects/units; no official package. Pre-instantiate, activate/deactivate.

## Hype vs proven

| Technique | Status |
|---|---|
| NavMesh + AI Navigation 2.0 | PROVEN |
| A* Pathfinding Project | PROVEN (11+ years, Burst/ECS v5.0) |
| GPU instancing + SRP Batcher | PROVEN |
| Render-texture FoW | PROVEN (community standard) |
| JsonUtility saves | PROVEN |
| New Input System | PROVEN |
| Cinemachine | PROVEN |
| UI Toolkit for HUD | PROVEN |
| Full DOTS/ECS | CONDITIONAL (scale only) |
| GPU Resident Drawer | CONDITIONAL (big win, documented limits) |
| WFC maps | CONDITIONAL (optional polish) |
| Flow fields | CONDITIONAL (mass-movement niche) |
| RVO | CONDITIONAL (crowd polish, integration friction) |
| ML-Agents RL opponent | CONDITIONAL (training-cost heavy) |

## Technique-level landscape (17 rows)

| Item | Value | Verdict |
|---|---|---|
| A* Pathfinding Project | HIGH | Use |
| AI Navigation 2.0 | HIGH | Use |
| snape/RVO2 | MEDIUM | Verify license |
| RVO2-Unity (Gitee port) | MEDIUM | Verify |
| 3 flow-field repos | MEDIUM | Verify licenses |
| mxgmn/WaveFunctionCollapse | LOW | Optional polish; NOASSERTION - verify |
| selfsame/unity-wave-function-collapse (320 stars) | LOW | NOASSERTION - verify |
| Auburn/FastNoiseLite | HIGH | Use (noise maps) |
| AsehesL/FogOfWar | MEDIUM | Crib |
| xddemir/Unity-Fog-of-War | MEDIUM | Crib |
| ATerribleKingdom | HIGH | First-party reference |
| EntityComponentSystemSamples (8.2k stars) | HIGH | Only if DOTS; NOASSERTION |
| sturdyspoon/unity-pathfinding | LOW | 2D tilemap only |
| h8man/NavMeshPlus | LOW | 2D only |
| InputSystem_Warriors | MEDIUM | Input crib |

## Licenses to verify at plan time (blocking for commercial reuse)

WFC, unity-WFC, RVO2, flow-field repos, FoW repos, ECS samples, A* free-tier terms. Use chub/read LICENSE before any inclusion.

## User needs from the agent

Coder: per-technique checklists + USE/AVOID table as hard contract + pitfall list (BinaryFormatter, Dictionary serialization, SRP-Batcher-vs-instancing, skinned meshes). Planner: sequencing + dependency order (render pipeline + input first) + gated decisions. Assets/design: URP, one atlased material per faction, LOD expectations. User: honest hype filter + cornerstonable reference.