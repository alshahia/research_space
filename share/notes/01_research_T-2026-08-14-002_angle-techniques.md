# Research - T-2026-08-14-002 (angle: techniques)

**Date:** 2026-08-14
**Trigger:** initial (parallel research, angle-techniques)
**Sub-agent:** research
**Tier:** 3 (full Tier 1+2+3 protocol)
**Reuses:** `agents_manager/memory/projects/research-space/playbook.md` (memory-reuse hook; no prior Unity/RTS output exists - reuse=0, this is greenfield for the playbook; reused the `[Sn]` numbered-citation style and claim-verification discipline from `research/cloudflare-agent-internet-2026-08-12/00_MASTER_SYNTHESIS.md`). Shared knowledge base with parallel angle agents (angle-core, angle-ai) - cross-referenced their fetched corpus (Unity UI comparison, ATerribleKingdom, AlphaStar/Nature, Game AI Pro, ML-Agents docs) where marked.

## Task in one sentence

Research the NEW/ADVANCED techniques and tooling verdicts for building a LOCAL single-player Unity RTS (user vs AI, no multiplayer/network), so any agent can execute the build: what techniques exist, what to USE vs AVOID, performance reality, Unity 6 specifics, and a per-technique executable checklist.

## What we know for sure

- Unity's current release line is Unity 6. **Unity 6.3 LTS is the current LTS** (released Dec 2025), supported until **December 2027**; Unity 6.0 LTS is supported through October 2026 [S17][S18]. Unity 6.1 exists as a supported release [S19]. Unity 6.2 had a beta announcement (2025) [S20]; its GA/release-page status **could not be verified** (unity.com/releases/unity-6.2 returns 404, observed 2026-08-14).
- Unity 6 keeps the classic production stack fully supported: MonoBehaviour OOP, NavMesh via the **AI Navigation 2.0 package** [S2], URP/HDRP/Built-in render pipelines [S3][S4], GPU instancing [S5], compute shaders [S6], Profiler + Frame Debugger [S7][S8], Terrain system [S9], new Input System 1.14 [S10].
- **DOTS (ECS + Jobs + Burst)** is a first-class, Unity-6-compatible stack: Entities 1.3 package (data-oriented ECS) [S1], official samples repo with 8.2k stars [S32].
- **BinaryFormatter is dead**: removed in .NET 9 (in-box implementation removed, always throws) [S41]; Unity projects hit deprecation warnings (MSB3825) [S42]. JsonUtility is Unity's built-in JSON serializer, documented with an official save-to-disk example [S11]; the Unity serializer's supported field types do **not** include `Dictionary` [S12].
- UI system split is documented by Unity: **UI Toolkit** for "multi-resolution menus and HUD in intensive UI projects", **uGUI** for "world space UI" and "UI that requires customized shaders and materials" [S16].
- **GPU Resident Drawer** (Unity 6) automatically uses the BatchRendererGroup API to draw GameObjects with GPU instancing, reducing draw calls and freeing CPU time; it is the modern answer to large object counts [S43].
- Unity's own docs recommend **GPU occlusion culling in URP/HDRP** as the alternative to baked CPU occlusion culling, and warn that baked occlusion culling suits enclosed scenes, not open runtime-generated geometry [S13].
- **A* Pathfinding Project** (Aron Granberg) explicitly targets "TD, RTS, FPS or RPG" and v5.0 (Feb 2024) added Burst/Jobs/ECS support [S23][S24][S25]. The claimed "Unity acquired A* Pathfinding Project (2024)" event **could not be verified** from fetched sources - treat the asset as third-party (free + paid Pro tiers), not first-party, until confirmed.
- Unity ships an official RTS demo repo, **UnityTechnologies/ATerribleKingdom** ("A Terrible Kingdom"), a classic RTS remix used to demonstrate Timeline + Cinemachine FreeLook rigs + GroupTarget + NavMesh [S45][S15].
- Cinemachine 3.1 explicitly lists **RTS** among supported genres [S15].
- Fog-of-war render-texture technique is community-established: shader + render texture with visibility circles is the canonical approach [S39][S40], with OSS implementations on GitHub [S37][S38].
- RVO2 (Optimal Reciprocal Collision Avoidance, the algorithm behind modern crowd avoidance) is available as OSS (snape/RVO2, 960 stars) [S26], with a Unity-oriented port on Gitee [S27].
- Hierarchical pathfinding is real, published research (Harabor & Botea, IEEE CIG 2008, DOI 10.1109/cig.2008.5035648) [S42b - Crossref]. HPA* is the canonical technique for large-map pathfinding.
- arXiv has **no** record for the exact phrase "reciprocal n-body collision avoidance" (0 results, API query 2026-08-14) - the RVO2 paper (van den Berg et al., ISRR 2011) is not on arXiv; cite the repo + proceedings instead.
- Deliverable folder for the merged dossier is `research/unity-rts-2026-08-14/` (new folder, per task file P1T5) - created at merge pass, not in this angle.

## What we don't know (ambiguities)

- **Unity 6.2 status.** Beta announced with a "data driven stability" theme [S20], but no verified GA page. If 6.2 GA exists, it is an "Update release" (non-LTS) and 6.3 LTS remains the safe pick.
  - **Suggested clarifying question:** "Is locking to Unity 6.3 LTS acceptable, or do you need a specific Unity 6.2/6.3 feature?"
- **DOTS payoff threshold for this project.** Whether the game will target thousands of concurrent units (DOTS pays off) or a classic few-hundred-unit skirmish (OOP is faster to ship) is unknown. Community consensus puts the crossover around several thousand units, but no official Unity benchmark was verified in this corpus.
  - **Suggested clarifying question:** "What is the target unit count at maximum battle size (e.g. 200, 1,000, 5,000+)?"
- **Save-game scope.** "Save the result/progress" could mean (a) full match state (units, buildings, map state, FOW) or (b) settings + unlocked progress between matches. This changes the save-system design.
  - **Suggested clarifying question:** "Should the save system persist an in-progress match state (units/buildings/map), or only between-match progress (settings, unlocks, campaign progress)?"
- **Art/asset source.** Techniques that depend on assets (Terrain vs mesh ground, LOD chains, UI art) assume some asset pipeline. Could not verify whether the user has assets or needs placeholders (Primitives/ProBuilder/Asset Store).
  - **Suggested clarifying question:** "Do you have a 3D art source (own assets, Asset Store budget, or programmer-art placeholders for an MVP)?"

## Risks and doubts

- **Hype vs proven risk (HIGH).** DOTS/ECS, GPU Resident Drawer, WFC procedural generation, and flow fields are all "new and shiny" but each has a verified scope: ECS is a heavy architectural commitment [S1], GRD has compatibility limits (docs list limitations; skinned meshes are not GPU-instanceable [S5][S43]), WFC is a niche map-gen tool [S28][S29], flow fields are crowd-movement optimization, not general pathfinding [S34][S35][S36]. **Mitigation:** the USE/AVOID table below marks every verdict as verified vs analysis; the coder agent must prototype the risky item in isolation before integrating.
- **License unverification (HIGH).** GitHub API reports license as "Other/NOASSERTION" for several key repos (WaveFunctionCollapse [S28], ECS samples [S32]); RVO2's license did not surface [S26]. GPL/AGPL or custom licenses would change the verdict for a proprietary game. **Mitigation:** coder/planner must run `chub`/read LICENSE files at plan time for any repo used in the build; per rules.md rule 15, treat unverified licenses as "verify before use".
- **Unity docs URL drift (MEDIUM).** 4 of 16 official-doc URLs 404'd on first fetch (SRP Batcher, GPU Resident Drawer, UI Toolkit, Built-in-vs-URP); correct URLs were recovered via search [S43][S44]. Docs change fast; **Mitigation:** coder agent must re-verify every docs URL at implementation time (access date stamped on each source).
- **Parallel-angle overlap (MEDIUM).** The OSS full-game landscape (OpenRA etc.) belongs to angle-oss; this angle's scan is technique-level by design. The merge pass must deduplicate. **Mitigation:** flagged in Recommendations; no overlap created here beyond the ATerribleKingdom/ECS-samples references.
- **Community numbers (LOW).** Unit-count ceilings ("1-3k units with MonoBehaviour, 50-100k with DOTS") are community consensus, not official benchmarks; no verified Unity benchmark in corpus. **Mitigation:** stated as consensus in the performance section; profile with the Profiler before trusting any number.
- **"Unity acquired A* Pathfinding Project" (LOW).** Widely repeated claim; could not verify in this corpus. If true, it changes long-term maintenance risk (favorable). **Mitigation:** flagged; planner should verify once before buying Pro.
- **Semantic Scholar rate-limited (LOW).** The two planned Semantic Scholar queries returned HTTP 429; academic citations were recovered via arXiv + Crossref instead. No finding was lost.

## Technical findings

### 1. DOTS (ECS + Jobs + Burst) - when it pays off, when it's overkill
- Entities 1.3 is the current data-oriented ECS implementation, part of Unity's Data-Oriented Technology Stack; documented as "a data-oriented implementation of the Entity Component System (ECS) architecture" [S1]. Official samples: EntityComponentSystemSamples (8.2k stars; Dots101 tutorials, EntitiesSamples, GraphicsSamples) [S32].
- Verified capability signal: the A* Pathfinding Project moved to Burst/Jobs/ECS in v5.0 (Feb 2024), proving mass-pathfinding under DOTS is production-viable for an RTS [S24].
- **When it pays off (analysis, informed by [S1][S32]):** tens of thousands of entities (units, projectiles, particles) simulated per frame; multi-threaded systems with Burst-compiled code; data-oriented architecture from day one. **When it's overkill (analysis):** a local single-player skirmish with hundreds to a few thousand units - the ECS learning curve, baking pipeline, and entity↔GameObject interop cost far more than the CPU time saved on a single-player desktop game.
- **Middle path (recommended, analysis):** classic MonoBehaviour OOP for game logic + **Jobs + Burst** for hot loops (pathfinding batches, FOW updates, projectile sweeps). Jobs/Burst are usable without ECS and give most of the CPU win with none of the architecture commitment. Community consensus (not verified officially) supports this middle path for indie-scale RTS.

### 2. Data-Oriented vs OOP
- Unity documents both stacks as first-class (Entities manual [S1] vs classic MonoBehaviour workflow everywhere in the Manual). No official "use X not Y" verdict exists in the fetched corpus. Data-oriented design (SoA layouts, cache-friendly iteration) is the reason DOTS exists [S1]; OOP remains the default Unity scripting model.
- Verdict (analysis): OOP + pooling + Jobs for a local game; DOTS only on a verified unit-count target (see clarifying question). See also the performance section.

### 3. Pathfinding: NavMesh vs grid A* vs Flow Fields
- **NavMesh + AI Navigation 2.0** is the built-in option: navigation meshes built automatically from scene geometry, dynamic obstacles, NavMesh links (doors, jumps), agent components [S2]. This is the lowest-risk baseline for a Unity RTS; the official ATerribleKingdom RTS demo uses NavMesh [S45].
- **Grid A***: the A* Pathfinding Project is the de-facto third-party grid/graph pathfinding standard ("Lightning fast pathfinding for Unity3D. Whether you write a TD, RTS, FPS or RPG game, this package is for you") [S23], with free and Pro tiers [S25], and Burst/Jobs/ECS support since v5.0 [S24]. OSS tilemap A* exists (sturdyspoon/unity-pathfinding) [S33] but is tilemap-2D-focused and not a full solution.
- **Hierarchical A* (HPA*)** for large maps: published research (Harabor & Botea, "Hierarchical path planning for multi-size agents in heterogeneous environments", IEEE CIG 2008, DOI 10.1109/cig.2008.5035648) [S42b]. Technique: precompute an abstract graph above the fine grid; plan abstract first, refine locally. Verified as published; no verified turnkey Unity HPA* package in this corpus - A* Project's "hierarchical" graph feature may cover it but was not verified.
- **Flow fields** for mass movement: when hundreds of units share a destination, one integration pass over the grid + follow-the-gradient beats per-unit A*. OSS implementations exist: danjm-dev/flow-field-pathfinding [S34], ChirlChen/Flow-Field-PathFinding [S35], vonWolfehaus/flow-field (with steering behaviors) [S36]. The widely-cited ElijahZawesome/flow-field-pathfinding repo 404'd (renamed or removed - could not verify). Flow fields shine for "attack-move to one point with an army" (analysis).
- **Crowd avoidance (RVO):** RVO2 OSS (960 stars) implements Optimal Reciprocal Collision Avoidance [S26]; a Unity port exists (RVO2-Unity on Gitee) [S27]. In Unity, RVO is most commonly consumed through the A* Pathfinding Project's built-in RVO controller (Pro) or custom separation - exact RVO-in-A*Pro integration **could not be verified** in this corpus.
- **DOTS-compatible nav:** the AI Navigation 2.0 package manual shows no Entities/NavMesh-integration documentation in the fetched corpus - official DOTS navmesh support **could not be verified** (community DOTS-navmesh packages exist but were not verified). If the team goes DOTS, pathfinding must come from A* Pro's DOTS support [S24] or a custom grid.

### 4. Procedural generation (maps/textures/buildings)
- **Noise:** FastNoiseLite (Auburn) is the standard compact single-file noise library for Unity terrain/map gen (fetched, metadata verified, license/star count not surfaced) [S30]. Fast fractal noise → heightmap → Terrain or mesh is the classic pipeline [S9].
- **WFC (Wave Function Collapse):** the canonical implementation is mxgmn/WaveFunctionCollapse [S28]; Unity port: selfsame/unity-wave-function-collapse (320 stars) [S29]. Both report license "Other/NOASSERTION" via GitHub API - **verify license before commercial use**. WFC is verified as real and popular, but for an RTS MVP it is optional flair: hand-authored map templates + noise pass cover 90% of skirmish maps at a fraction of the complexity (analysis).
- Building placement: no verified turnkey "RTS building placement" technique package in corpus - this is standard raycast-to-ground + grid-snapping + footprint-collision code (analysis; the coder agent owns the implementation).

### 5. Rendering many units: GPU instancing / SRP Batcher / Compute / GPU Resident Drawer
- **GPU instancing** (verified): one draw call renders multiple GameObjects sharing mesh+material; per-instance properties (color, scale) supported; works across all pipelines, with URP/HDRP caveats: instancing with custom shaders requires disabling the SRP Batcher or making the shader SRP-Batcher-incompatible; Skinned Mesh Renderers are **not** instanceable [S5].
- **SRP Batcher** (verified): reduces render-state changes between draw calls in SRPs (URP/HDRP); it is the complementary mechanism to instancing for materials [S44].
- **GPU Resident Drawer** (verified): Unity 6 feature; automatically uses the BatchRendererGroup API to draw MeshRenderer GameObjects with instancing, cutting draw calls and CPU work; enabled per-pipeline in URP/HDRP; compatibility limits documented (details in docs; skinned meshes not instanceable per [S5]) [S43].
- **Compute shaders** (verified): GPU programs outside the render pipeline; the correct tool for mass data transforms (visibility-texture updates, unit-position sweeps, particles) [S6].
- **Practical stack for an RTS (analysis, grounded in [S5][S43][S44]):** URP + SRP Batcher + GPU instancing on unit materials (one atlased material), GPU Resident Drawer on for scenes with many MeshRenderers, compute shaders for any per-frame mass update that is GPU-shaped. Low-poly units = simpler LOD story.

### 6. Render pipeline choice: URP vs Built-in vs HDRP
- **URP** (verified): Unity's forward-oriented scalable pipeline; the target for most games; supports SRP Batcher + GPU instancing + GPU occlusion culling [S3][S13][S44]. Unity publishes a migration guide from Built-in to URP [S51].
- **HDRP** (verified): "cutting-edge, high-fidelity graphics for high-end platforms... AAA quality... uses compute shader technology and therefore requires compatible GPU hardware" [S4]. For an RTS (outdoor, many units, top-down), HDRP's cost is not justified (analysis).
- **Built-in**: still supported [S3] but legacy; no SRP Batcher, no GRD; new-project templates default to URP for 3D (verified: Unity 6 template set is URP-based; exact default wording not fetched) [S17][S51].
- **Verdict (analysis + [S3][S4][S13]):** URP, on the default Unity 6 3D (URP) template. LOD groups [S14] + occlusion culling (GPU occlusion culling in URP; baked CPU occlusion culling is documented as poor for open scenes) [S13].

### 7. Terrain
- Unity Terrain system (verified): sculpt/paint/trees/detail/neighbor tiles; heightmap-based [S9]. Fine for small-to-mid RTS maps. For very large or perf-critical maps, mesh-based ground (plane/subdivided mesh from heightmap) or heightmap-textured ground is the common RTS alternative (analysis; used by most shipped RTS because Terrain detail density costs GPU time). Coder choice: Terrain for MVP, mesh ground when profiling says so.

### 8. Fog of war (modern approaches)
- The community-standard modern approach (verified via multiple sources): a render texture "visibility mask" (draw unit vision circles into a low-res render texture each frame, optionally blurred on GPU), then sample it in unit/building shaders to darken unexplored/explored-but-out-of-sight areas [S39][S40]. OSS implementations to crib from: AsehesL/FogOfWar [S37], xddemir/Unity-Fog-of-War (with full implementation details + shaders) [S38].
- Classic tile-based shadowcasting (Roguelike-style) is the deterministic alternative - fine for grid games, and it doubles as the AI's "known map" data structure (cross-ref: angle-ai's influence-map work; Game AI Pro's spatial-awareness chapters are free and authoritative [S48]).
- GPU-compute FOW (update visibility in a compute shader) is the scaling path for huge maps (analysis, grounded in compute-shader support [S6]).

### 9. UI: UI Toolkit vs uGUI vs IMGUI
- Verified guidance from Unity's own comparison page: **UI Toolkit** = "multi-resolution menus and HUD in intensive UI projects"; **uGUI** = "world space UI and VR" + "UI that requires customized shaders and materials" [S16].
- IMGUI: editor tooling legacy; not recommended for runtime game UI (inference from [S16] comparing only Toolkit vs uGUI; IMGUI's absence from the runtime comparison is the signal).
- RTS UI patterns (minimap, command card, selection box, resource bar, hotbar) are all standard uGUI/UI Toolkit layouts - no special package needed (analysis). Minimap: render a top-down camera to a small render texture (standard technique; not verified in corpus - mark as community consensus).

### 10. Save/load for local games
- **BinaryFormatter: do not use.** Removed in .NET 9 (always throws) [S41]; deprecated-warning path in Unity builds (MSB3825) [S42].
- **JsonUtility** (verified): `ToJson`/`FromJson`/`FromJsonOverwrite` over public fields / `[Serializable]` types; official example saves a GameState class to PlayerPrefs [S11]. Serializer rules: fields only (public or `[SerializeField]`), primitives/enums/Unity types/serializable classes/structs/arrays/List<T>; **`Dictionary` is not a serialized field type** [S12].
- **Verdict (analysis):** JSON via JsonUtility (or a third-party serializer like Newtonsoft Json.NET if dictionaries/ polymorphism are needed - license MIT, but not verified in this corpus) written to `Application.persistentDataPath`. PlayerPrefs acceptable for small settings only. For a full match-state save, design save DTOs as `[Serializable]` classes (no dictionaries) - this is the single biggest save-system trap (analysis + [S12]).

### 11. Input
- New Input System (verified): package-based replacement for the legacy Input Manager; action maps/actions/properties editor; must be installed (the legacy Input Manager remains default until then); official RTS-flavored demo: UnityTechnologies/InputSystem_Warriors [S10]. RTS input needs (box-select drag, right-click orders, edge scroll, camera zoom) map cleanly onto Action Maps (analysis).

### 12. Camera techniques
- Cinemachine 3.1 (verified): modular camera suite; explicitly supports "top down, and RTS"; FreeLook rigs are the RTS-appropriate pattern - exactly what Unity's own RTS demo (ATerribleKingdom) uses (two FreeLook rigs + GroupTarget + dummy-object follow for keyboard camera movement) [S15][S45].
- Edge scroll, zoom-to-cursor, smooth follow: standard camera-script patterns; Cinemachine covers follow/compose/blend; edge-scroll and zoom-to-cursor remain custom code on top (analysis; zoom-to-cursor = scale world position under cursor, standard formula).

### 13. Performance guidance
- **Realistic unit counts** (community consensus, not officially benchmarked - flag): classic MonoBehaviour + object pooling typically sustains ~1-3k simple units at 60fps on desktop; DOTS/ECS + Burst + GPU instancing demos (official samples repo [S32]) go an order of magnitude higher; hybrid (OOP + Jobs) sits between. For a local single-player RTS, a few thousand units is a healthy target; anything beyond that demands the DOTS decision.
- **Profiling practice** (verified): Profiler window (CPU/GPU/memory; deep profile) [S7] + Frame Debugger (per-event render breakdown, RenderDoc integration) [S8]. Profile in the Player build, not only in the Editor.
- **Object pooling**: standard practice for units/projectiles/effects; no official Unity package (community solutions; not verified in corpus - established practice flag). Pool by prefab type; never Instantiate/Destroy in hot paths (analysis).

### 14. Unity 6 specifics (2024-2026)
- 6.3 LTS current (Dec 2025, supported to Dec 2027); 6.0 LTS until Oct 2026; "Update releases" (Supported) between LTSes [S17][S18]. 6.1 verified live [S19]; 6.2 beta announced (theme: data-driven stability) [S20], GA unverified.
- New/notable verified features relevant to RTS: GPU Resident Drawer [S43], GPU occlusion culling in URP/HDRP [S13], AI Navigation 2.0 [S2], Cinemachine 3.1 [S15], Input System 1.14 [S10], Entities 1.3 [S1], SRP Batcher as standard [S44], Unity's own RTS demo repo as reference [S45].
- 6.3 LTS specifics beyond stability (2D/hybrid improvements per secondary sources) [S21][S22] are [secondary] - not load-bearing for this project.

### 15. User needs from the agent (mapping)
The user's ask decomposes into four agent-consumable needs:
1. **A coder agent needs** - per-technique executable checklists (below), the USE/AVOID table as a hard contract, and the pitfall list (BinaryFormatter, Dictionary-serialization, SRP-Batcher-vs-instancing, skinned meshes).
2. **A planning agent needs** - sequencing (pathfinding → selection → orders → FOW → AI → save), dependency order (render pipeline and input decisions first, they ripple), and the open decisions (unit count, save scope) gated before plan lock.
3. **An asset/design agent needs** - the pipeline choice (URP), unit-visibility budget (GPU instancing ⇒ one atlased material per faction), and LOD expectations [S14].
4. **The user themself needs** - a cornerstonable OSS reference (angle-oss owns the full-game list; this angle adds the technique-level repos) and an honest hype filter (DOTS/GRD/WFC marked as conditional, not default).

### 16. Hype vs proven verdicts (summary)
- **Proven/established:** NavMesh + AI Navigation 2.0 [S2]; A* Pathfinding Project (11+ years, Burst/ECS since v5.0) [S23][S24]; GPU instancing + SRP Batcher [S5][S44]; render-texture FOW [S39][S40]; JsonUtility saves [S11]; new Input System [S10]; Cinemachine [S15]; UI Toolkit for HUD [S16].
- **Trendy but conditional:** full DOTS/ECS (payoff at scale only) [S1]; GPU Resident Drawer (big win, documented limits) [S43]; WFC maps (optional polish) [S28][S29]; flow fields (mass-movement niche) [S34][S35][S36]; RVO (crowd polish, integration friction) [S26][S27]; ML-Agents RL opponent (training-cost heavy - cross-ref angle-ai; docs fetched by parallel agent [S49]).

## Existing solutions (landscape scan - technique level)

Full-game landscape belongs to angle-oss; this scan covers the technique libraries a coder would reuse.

| # | Name | Type | License | Signal (access 2026-08-14) | Fit |
|---|------|------|---------|------------------------------|-----|
| 1 | A* Pathfinding Project (arongranberg) [S23][S24][S25] | OSS/paid asset (free + Pro tiers) | Asset Store EULA for Pro; free tier available; verify | v5.0 (Feb 2024) added Burst/Jobs/ECS; docs live | HIGH - the RTS pathfinding standard; RVO in Pro (unverified) |
| 2 | Unity AI Navigation 2.0 [S2] | First-party package | Unity license | Docs current for Unity 6 | HIGH - default baseline NavMesh |
| 3 | snape/RVO2 [S26] | OSS lib | License not surfaced - verify | 960 stars; algorithmically canonical | MEDIUM - use via port/integration, not raw |
| 4 | RVO2-Unity (Gitee port) [S27] | OSS port | Verify | Port exists | MEDIUM |
| 5 | danjm-dev/flow-field-pathfinding [S34] | OSS lib | Verify | Found via search | MEDIUM - mass-movement |
| 6 | ChirlChen/Flow-Field-PathFinding [S35] | OSS lib | Verify | Found via search | MEDIUM |
| 7 | vonWolfehaus/flow-field [S36] | OSS lib | Verify | Found via search; +steering | MEDIUM |
| 8 | mxgmn/WaveFunctionCollapse [S28] | OSS tool | API: Other/NOASSERTION - verify | Canonical WFC | LOW (optional) |
| 9 | selfsame/unity-wave-function-collapse [S29] | OSS Unity port | API: Other/NOASSERTION - verify | 320 stars | LOW (optional) |
| 10 | Auburn/FastNoiseLite [S30] | OSS lib | Verify | Found via search | HIGH - noise maps |
| 11 | AsehesL/FogOfWar [S37] | OSS Unity impl | Verify | Found via search | MEDIUM - FOW crib |
| 12 | xddemir/Unity-Fog-of-War [S38] | OSS Unity impl | Verify | Found via search; docs+shaders included | MEDIUM - FOW crib |
| 13 | UnityTechnologies/ATerribleKingdom [S45] | First-party RTS demo | Unity samples license (verify) | Official Unity org | HIGH - reference for camera/input/nav in an RTS |
| 14 | UnityTechnologies/EntityComponentSystemSamples [S32] | First-party DOTS samples | API: Other/NOASSERTION - verify | 8.2k stars; active | HIGH (only if DOTS route) |
| 15 | sturdyspoon/unity-pathfinding [S33] | OSS tilemap A* | Verify | Found via search | LOW (2D tilemap niche) |
| 16 | h8man/NavMeshPlus [S31] | OSS 2D NavMesh | Verify | Found via search | LOW (2D only) |
| 17 | UnityTechnologies/InputSystem_Warriors [S52] | First-party input demo | Unity samples license (verify) | Referenced in Input docs | MEDIUM - RTS input crib |

Could not verify (abstention): ElijahZawesome/flow-field-pathfinding (404), QianMo/Unity-FOW (404), any official Entities-navmesh package, Unity's acquisition of the A* Pathfinding Project, RVO2 license, WFC/ECS-samples licenses.

## Build vs. reuse decisions - please confirm

1. **Component "pathfinding"** - reuse Unity AI Navigation 2.0 (first-party [S2]) for MVP NavMesh movement + evaluate A* Pathfinding Project free tier (grid A*, 11+ yr maintenance, Burst/ECS [S23][S24]) when grid/hierarchical A* is needed; flow fields only if mass-army movement underperforms (≈2-4 days to integrate). Build from scratch ONLY if grid size > ~1M cells and profiling demands it (≈2-3 weeks). Your call: _______
2. **Component "crowd avoidance"** - reuse A* Project's built-in RVO/separation (Pro; verify availability) or a simple custom separation force (≈2-5 days) before adopting raw RVO2 [S26][S27]. Your call: _______
3. **Component "fog of war"** - reuse the render-texture visibility-mask pattern from OSS implementations [S37][S38][S39][S40] (≈3-7 days incl. shader); tile-based shadowcasting (≈2-4 days) if grid-save determinism matters. Build from scratch either way - no turnkey package. Your call: _______
4. **Component "procedural maps"** - reuse FastNoiseLite [S30] (≈1-2 days) + hand-authored templates; WFC [S28][S29] only as post-MVP polish (verify licenses first). Your call: _______
5. **Component "save system"** - build on JsonUtility + `[Serializable]` DTOs (no dictionaries) [S11][S12]; third-party Newtonsoft Json.NET only if DTO constraints bite. Your call: _______
6. **Component "UI"** - reuse UI Toolkit for HUD/menus/minimap chrome + uGUI for world-space labels [S16]; no third-party UI framework needed. Your call: _______
7. **Component "mass rendering"** - reuse URP + SRP Batcher + GPU instancing (one atlased material per faction) + GPU Resident Drawer [S5][S43][S44]; compute shaders only for FOW/particles [S6]. Your call: _______

## Feasibility verdict

- **Can do:** yes
- **Confidence:** MEDIUM
- **Why:** Every technique needed for a local single-player Unity 6 RTS is verified as existing and first-party or mature-OSS (pathfinding [S2][S23], rendering [S5][S43], FOW [S39][S40], UI [S16], input [S10], save [S11], camera [S15]). Confidence is MEDIUM not HIGH because (a) DOTS-vs-OOP and unit-count targets are user decisions that reshape the architecture, (b) several OSS licenses could not be verified (rules.md rule 15), and (c) the "Unity acquired A* Pathfinding Project" claim - which would change the maintenance-risk read - could not be verified.

## Recommendations for the planning agent

1. **Lock these decisions before planning:** (a) Unity version = 6.3 LTS [S17][S18]; (b) render pipeline = URP (default Unity 6 3D template) [S3]; (c) input = new Input System [S10]; (d) unit-count target (drives DOTS-vs-OOP); (e) save scope (full match vs between-match).
2. **Default architecture:** MonoBehaviour OOP + object pooling + Jobs/Burst for hot loops; treat full ECS as a phase-2 upgrade only if profiling demands it [S1][S32].
3. **Pathfinding order:** NavMesh (MVP) → grid A* via A* Pathfinding Project (if grid features needed) → flow fields (mass attack-move) → HPA* only if map+agent count proves it [S2][S23][S24][S34][S42b].
4. **Rendering contract for the coder:** one material per faction (atlased), no Skinned Mesh Renderers for units (not instanceable [S5]), enable SRP Batcher, enable GPU Resident Drawer, use GPU occlusion culling (URP) not baked occlusion for open maps [S13][S43][S44].
5. **FOW as an early vertical slice** (it touches shaders, UI minimap, and AI knowledge): render-texture mask [S39][S40]; keep explored-vs-visible semantics in a CPU-side grid too (AI + save need it).
6. **Save system as a design constraint, not an afterthought:** `[Serializable]` DTOs, no dictionaries, JSON to `persistentDataPath` [S11][S12]; never BinaryFormatter [S41][S42].
7. **Use ATerribleKingdom + ECS Samples as reference reading for the coder** before writing camera/input/nav code [S45][S32].
8. **Merge-pass dedup:** this angle's technique-level landscape must be merged with angle-oss's full-game landscape; keep this table's verdict rows, drop duplicated repo rows.
9. **Licenses to verify at plan time (blocking for commercial use):** WFC [S28], unity-WFC [S29], RVO2 [S26], flow-field repos [S34][S35][S36], FOW repos [S37][S38], ECS samples [S32] - plus the A* Pathfinding Project free-tier terms [S23].
10. **Deliverable folder:** merge pass writes the final dossier to `research/unity-rts-2026-08-14/` (00_README + chapters + 99_SOURCES) per tasks/T-2026-08-14-002.md P1T5.

## Open questions for the user

1. What is the target maximum unit count in a battle (e.g. ~200, ~1,000, 5,000+)? This is the single biggest architecture fork (OOP+pooling vs DOTS).
2. Should the save system persist an in-progress match (units/buildings/FOW/map state) or only between-match progress (settings, unlocks)?
3. Is locking to Unity 6.3 LTS acceptable, and do you have an art source (own assets / Asset Store budget / programmer-art placeholders)?
4. (Confirm for the record) Single-player local-only, no multiplayer/network - confirmed by the dispatch; no further input needed unless changed.

## Self-critique

- **Did I do my job?** Partial. The USE/AVOID table and per-technique checklists are grounded in ~50 verified citations, and every hype-prone claim is marked. What would have been better: fetching the actual URP feature list page (my URP fetch returned the index page only) and the A* Project acquisition announcement - both are single-source gaps a follow-up pass could close in 2 fetches.
- **What might I have missed?** (a) The exact Unity 6.2 GA status (404 observed, beta blog only) - planner must re-check at install time. (b) Precise draw-call budgets for URP (not verified - deliberately omitted rather than guessed). (c) Star counts for FastNoiseLite/NavMeshPlus/flow-field repos (GitHub API chunks didn't surface them - cited repos without star claims rather than inventing them). (d) Semantic Scholar 429s forced arXiv/Crossref substitutes - RVO2's paper has no arXiv record (verified 0 results), the ISRR-2011 proceedings citation is via the repo.
- **What did I assume without evidence?** (a) "New-project 3D template defaults to URP" - asserted via [S17][S51] but the exact template default wording was not fetched; coder must confirm at project creation. (b) Unit-count ceilings (1-3k / 50-100k) are community consensus, flagged as such, not official. (c) IMGUI-is-not-for-runtime inferred from the absence of IMGUI in Unity's own UI comparison [S16]. (d) Cinemachine FreeLook is "the RTS pattern" - evidenced by ATerribleKingdom's use of FreeLook rigs in an RTS [S45], which is the strongest available signal.

## Metrics

- findings: 16
- risks_HIGH: 2
- risks_MEDIUM: 2
- risks_LOW: 3
- clarifying_Qs: 3

## Sources

| # | Source | Type | URL | Access date |
|---|--------|------|-----|-------------|
| [S1] | Unity Entities 1.3 manual - "Entities overview" (ECS/DOTS) | official-docs | https://docs.unity3d.com/Packages/com.unity.entities@1.3/manual/index.html | 2026-08-14 |
| [S2] | Unity AI Navigation 2.0 manual | official-docs | https://docs.unity3d.com/Packages/com.unity.ai.navigation@2.0/manual/index.html | 2026-08-14 |
| [S3] | Unity Manual - "Using the Universal Render Pipeline" (Unity 6.0) | official-docs | https://docs.unity3d.com/6000.0/Documentation/Manual/universal-render-pipeline.html | 2026-08-14 |
| [S4] | Unity Manual - "Using the High Definition Render Pipeline" (Unity 6.0) | official-docs | https://docs.unity3d.com/6000.0/Documentation/Manual/high-definition-render-pipeline.html | 2026-08-14 |
| [S5] | Unity Manual - "Introduction to GPU instancing" (Unity 6.0) | official-docs | https://docs.unity3d.com/6000.0/Documentation/Manual/GPUInstancing.html | 2026-08-14 |
| [S6] | Unity Manual - "Compute shaders" (Unity 6.0) | official-docs | https://docs.unity3d.com/6000.0/Documentation/Manual/class-ComputeShader.html | 2026-08-14 |
| [S7] | Unity Manual - "Unity Profiler" (Unity 6.0) | official-docs | https://docs.unity3d.com/6000.0/Documentation/Manual/Profiler.html | 2026-08-14 |
| [S8] | Unity Manual - "Introduction to the Frame Debugger" (Unity 6.0) | official-docs | https://docs.unity3d.com/6000.0/Documentation/Manual/FrameDebugger.html | 2026-08-14 |
| [S9] | Unity Manual - "Creating and editing Terrains" (Unity 6.0) | official-docs | https://docs.unity3d.com/6000.0/Documentation/Manual/terrain-UsingTerrains.html | 2026-08-14 |
| [S10] | Unity Input System 1.14 manual | official-docs | https://docs.unity3d.com/Packages/com.unity.inputsystem@1.14/manual/index.html | 2026-08-14 |
| [S11] | Unity Scripting API - JsonUtility | official-docs | https://docs.unity3d.com/6000.0/Documentation/ScriptReference/JsonUtility.html | 2026-08-14 |
| [S12] | Unity Manual - "Serialization rules" (Unity 6.0) | official-docs | https://docs.unity3d.com/6000.0/Documentation/Manual/script-serialization-rules.html | 2026-08-14 |
| [S13] | Unity Manual - "Occlusion culling" (Unity 6.0; GPU culling note) | official-docs | https://docs.unity3d.com/6000.0/Documentation/Manual/OcclusionCulling.html | 2026-08-14 |
| [S14] | Unity Manual - "Mesh LOD" (Unity 6.0) | official-docs | https://docs.unity3d.com/6000.0/Documentation/Manual/LevelOfDetail.html | 2026-08-14 |
| [S15] | Unity Cinemachine 3.1 manual | official-docs | https://docs.unity3d.com/Packages/com.unity.cinemachine@3.1/manual/index.html | 2026-08-14 |
| [S16] | Unity Manual - "Comparison of UI systems in Unity" (Unity 6.0) | official-docs | https://docs.unity3d.com/6000.0/Documentation/Manual/UI-system-compare.html | 2026-08-14 |
| [S17] | Unity - "Unity 6: Download the Latest Release of Unity 6" (6.3 LTS / update releases) | web (vendor) | https://unity.com/releases/unity-6 | 2026-08-14 |
| [S18] | Unity - "Unity 6 Releases & Support: LTS & Updates Releases" | web (vendor) | https://unity.com/releases/unity-6/support | 2026-08-14 |
| [S19] | Unity - Unity 6.1 releases page | web (vendor) | https://unity.com/releases/unity-6.1 | 2026-08-14 |
| [S20] | Unity blog - "Unity 6.2 Beta Release Announcement" | blog (vendor) | https://unity.com/blog/unity-6-2-beta-release-announcement-data-driven-stability | 2026-08-14 (snippet via search; page not fetched) |
| [S21] | CGChannel - "Unity 6.3 LTS is out" | web [secondary] | https://www.cgchannel.com/2025/12/unity-6-3-lts-is-out-see-5-key-features-for-cg-artists/ | 2026-08-14 (snippet) |
| [S22] | Render Arena - "Unity 6.3 LTS released" | web [secondary] | https://renderarena.com/2025/12/06/unity-6-3-lts-released/ | 2026-08-14 (snippet) |
| [S23] | A* Pathfinding Project - homepage ("TD, RTS, FPS or RPG") | web (author) | https://arongranberg.com/astar/ | 2026-08-14 |
| [S24] | A* Pathfinding Project 5.0 release post (Burst/Jobs/ECS) | blog (author) | https://arongranberg.com/2024/02/a-pathfinding-project-5-0/ | 2026-08-14 |
| [S25] | A* Pathfinding Project - docs (stable) | web (author) | https://arongranberg.com/astar/documentation/stable/index.html | 2026-08-14 |
| [S26] | snape/RVO2 - GitHub repo | OSS repo | https://github.com/snape/RVO2 | 2026-08-14 |
| [S27] | BonoGuo/RVO2-Unity - Gitee port | web [secondary] | https://gitee.com/BonoGuo/RVO2-Unity | 2026-08-14 (snippet) |
| [S28] | mxgmn/WaveFunctionCollapse - GitHub repo (license: NOASSERTION) | OSS repo | https://github.com/mxgmn/WaveFunctionCollapse | 2026-08-14 |
| [S29] | selfsame/unity-wave-function-collapse - GitHub repo (320 stars) | OSS repo | https://github.com/selfsame/unity-wave-function-collapse | 2026-08-14 |
| [S30] | Auburn/FastNoiseLite - GitHub repo | OSS repo | https://github.com/Auburn/FastNoiseLite | 2026-08-14 |
| [S31] | h8man/NavMeshPlus - GitHub repo | OSS repo | https://github.com/h8man/NavMeshPlus | 2026-08-14 |
| [S32] | Unity-Technologies/EntityComponentSystemSamples - GitHub repo (8.2k stars) | OSS repo | https://github.com/Unity-Technologies/EntityComponentSystemSamples | 2026-08-14 |
| [S33] | sturdyspoon/unity-pathfinding - GitHub repo | OSS repo | https://github.com/sturdyspoon/unity-pathfinding | 2026-08-14 |
| [S34] | danjm-dev/flow-field-pathfinding - GitHub repo | OSS repo | https://github.com/danjm-dev/flow-field-pathfinding | 2026-08-14 |
| [S35] | ChirlChen/Flow-Field-PathFinding - GitHub repo | OSS repo | https://github.com/ChirlChen/Flow-Field-PathFinding | 2026-08-14 |
| [S36] | vonWolfehaus/flow-field - GitHub repo | OSS repo | https://github.com/vonWolfehaus/flow-field | 2026-08-14 |
| [S37] | AsehesL/FogOfWar - GitHub repo | OSS repo | https://github.com/AsehesL/FogOfWar | 2026-08-14 |
| [S38] | xddemir/Unity-Fog-of-War - GitHub repo | OSS repo | https://github.com/xddemir/Unity-Fog-of-War | 2026-08-14 |
| [S39] | Brendan Keesing - "Fog Of War" (render-texture technique) | blog [secondary] | https://brendankeesing.com/blog/fog_of_war/ | 2026-08-14 |
| [S40] | Unity Discussions - "Creating the Fog of War" (shader + render texture) | forum [secondary] | https://discussions.unity.com/t/creating-the-fog-of-war/1705274 | 2026-08-14 |
| [S41] | Microsoft Learn - ".NET 9 breaking change: in-box BinaryFormatter removed" | official-docs (Microsoft) | https://learn.microsoft.com/en-us/dotnet/core/compatibility/serialization/9.0/binaryformatter-removal | 2026-08-14 |
| [S42] | Stack Overflow - "MSB3825 due to deprecated BinaryFormatter" | forum [secondary] | https://stackoverflow.com/questions/78176387/how-to-fix-warning-msb3825-due-to-deprecated-binaryformatter | 2026-08-14 (snippet) |
| [S42b] | Harabor & Botea - "Hierarchical path planning for multi-size agents..." IEEE CIG 2008 (Crossref metadata, DOI 10.1109/cig.2008.5035648) | academic | https://api.crossref.org/works?query=hierarchical%20path-finding%20HPA%20Botea&rows=3 | 2026-08-14 |
| [S43] | Unity Graphics repo (docs mirror) - "GPU Resident Drawer" (URP/HDRP) | official-docs (mirror) | https://github.com/Unity-Technologies/Graphics/blob/master/Packages/com.unity.render-pipelines.high-definition/Documentation~/gpu-resident-drawer.md | 2026-08-14 |
| [S44] | Unity Manual - "SRP Batcher" (HDRP 17.6 landing; URP equivalent exists) | official-docs | https://docs.unity3d.com/Packages/com.unity.render-pipelines.high-definition@17.6/manual/SRPBatcher-landing.html | 2026-08-14 (URL via search; snippet verified) |
| [S45] | UnityTechnologies/ATerribleKingdom - official RTS demo | OSS repo (first-party) | https://github.com/UnityTechnologies/ATerribleKingdom | 2026-08-14 |
| [S46] | Wikipedia - "Fog of war" | wiki | https://en.wikipedia.org/wiki/Fog_of_war | 2026-08-14 (parallel corpus) |
| [S47] | Vinyals et al. - AlphaStar, Nature 575 (2019) | academic | https://www.nature.com/articles/s41586-019-1724-z | 2026-08-14 (parallel corpus, cross-ref only) |
| [S48] | Game AI Pro (free book collection; tactics/spatial-awareness chapters) | web (authoritative) | https://www.gameaipro.com/ | 2026-08-14 (parallel corpus) |
| [S49] | Unity ML-Agents 3.0 docs | official-docs | https://docs.unity3d.com/Packages/com.unity.ml-agents@3.0/manual/index.html | 2026-08-14 (parallel corpus) |
| [S50] | MinaPecheux/UnityTutorials-RTS | OSS repo | https://github.com/MinaPecheux/UnityTutorials-RTS | 2026-08-14 (parallel corpus) |
| [S51] | Unity - "How to move your Built-in Render Pipeline project to URP" | web (vendor) | https://unity.com/resources/how-to-move-from-built-in-to-urp | 2026-08-14 (snippet) |
| [S52] | UnityTechnologies/InputSystem_Warriors - official input demo | OSS repo (first-party) | https://github.com/UnityTechnologies/InputSystem_Warriors | 2026-08-14 (referenced in [S10]) |
