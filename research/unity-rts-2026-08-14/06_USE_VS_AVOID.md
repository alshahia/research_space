# 06 - What To Use, What To Avoid

Consolidated USE/AVOID contract from all four angles. Treat this as a hard contract for any agent writing code.

## USE

| Item | Why (evidence) |
|---|---|
| Unity 6.3 LTS | Current LTS, supported to Dec 2027 (S17, S18) |
| URP render pipeline | SRP Batcher + instancing + GPU occlusion culling; HDRP unjustified, Built-in legacy (S3-S5, S13) |
| New Input System + Action Maps | RTS modifiers (Shift/Ctrl); named actions = input-to-command contract (S2) |
| AI Navigation 2.0 (NavMesh) | Built-in, active, free; MVP pathfinding (S8) |
| A* Pathfinding Project | De-facto standard, multithreaded, Burst/ECS v5.0, RTS-targeted (S10, S24) |
| Flow fields (pattern) | Horde movement, amortized cost (S20, S21) |
| ScriptableObject data | Units/buildings/orders data-driven; new content = new asset (S5) |
| Event bus (C# events / SO channels) | Decouples units/UI/AI; single integration seam (S15, S19) |
| Object pooling | Projectiles/effects/units; standard practice (S23) |
| State machines for units | idle/move/attack/harvest/build/construct (S19) |
| Behavior trees for commander | Mainstream, verified semantics (S10, S13, S14, S16) |
| Utility AI for army composition/targeting | Continuous trade-offs, pairs with BT (S13, S14) |
| Hand-authored hierarchical AI | Strategy/tactical/reactive; proven by TStarBot2/UAlbertaBot (S5, S6) |
| Data-driven build orders | SO/JSON timelines; SC2 pattern (S5, S8) |
| Handicap difficulty dials | Resource multiplier, latency, vision; SC2 verified (S5, S8) |
| DDA (optional) | Cheap, player-facing; perception matters more than adaptation (S2-S4) |
| Perception layer first | AI fairness seam; same FoW as player (S21) |
| Render-texture FoW | Community standard display layer (S37-S40) |
| Tile-based visibility grid | Logic source of truth + AI known-map (S46) |
| UI Toolkit (HUD/menus) + uGUI (world-space) | Unity's own intensive-UI recommendation (S7, S16) |
| Cinemachine 3.1 FreeLook | Explicit "top down, and RTS" support (S15, S45) |
| JsonUtility / Json.NET saves | BinaryFormatter dead; DTOs + version field (S4, S11, S12, S24, S41, S42) |
| GPU instancing + SRP Batcher | One draw call per shared mesh+material (S5, S44) |
| GPU Resident Drawer | Evaluate late: 43.5k -> 128 calls, but +100MB memory (S22, S27, S43) |
| GPU occlusion culling | Open maps: baked CPU culling wrong (S13) |
| FastNoiseLite | Standard noise for procedural maps (S30) |
| MinaPecheux/UnityTutorials-RTS (MIT) | Only safe code-reuse candidate; learn-from default (S15, S20) |
| Game AI Pro (free chapters) | Spec literature for AI (S13, S14) |
| Profiler + Frame Debugger | Profile in Player build, not just Editor (S7, S8) |
| Object/asset verification before ANY inclusion | chub/read LICENSE; push dates via pushed_at (R5) |

## AVOID

| Item | Why (evidence) |
|---|---|
| Lockstep/netcode frameworks (LockstepFramework, UnityLockstep, LockstepRTSEngine) | Multiplayer determinism = wrong tool for local single-player (S29-S31) |
| Full DOTS/ECS for small scale | 3-5x dev time; payoff only at horde scale; NavMesh not natively DOTS (S9, S26, S36) |
| BinaryFormatter | Removed .NET 9, always throws, CWE-502 (S24, S41, S42) |
| Dictionary in JsonUtility DTOs | Not a serialized field type; biggest save trap (S11, S12) |
| Skinned Mesh Renderers for units | NOT instanceable (S5) |
| Baked CPU occlusion culling on open maps | GPU occlusion is the documented alternative (S13) |
| RL whole-opponent | AlphaStar-scale infra; ML-Agents Mono-only training (S4, S15) |
| LLM-at-runtime opponent | Latency + inference needs violate no-network; below-human quality (S10-S12) |
| Cheating-by-vision on normal difficulties | Fairness: perception reads same FoW (S21) |
| Planners (GOAP/HTN) before scripted version works | Scripted IS the baseline product (S24, F24) |
| TheKiwiCoder BehaviourTree, Panda BT | Dead/unreachable (S21, UNVERIFIED) |
| ReGoap without license verification | License unstated (S18) |
| GPL/unlicensed repo code copying | Legal exposure; learn-from only (R1) |
| Paid RTS templates (Strategy Kit / RTS Engine) | Availability unverified; re-verify at purchase (S17, S18, S13-oss) |
| WFC / unity-WFC / RVO2 / flow-field repos without license check | NOASSERTION licenses (S26-S29, S34-S36) |
| HDRP | AAA fidelity, GPU-hungry, unjustified for RTS (S4) |
| IMGUI at runtime | Editor-legacy (S7) |
| PlayerPrefs for game state | Settings only (S11) |
| Per-frame physics raycasts for selection | Use registry + spatial hash (F8-F11) |
| Hard-wiring NavMeshAgent into unit brains | Retrofit = rewrite; abstraction first (F12-F16) |
| "Unity acquired A* Project" as fact | Unverified; treat third-party (S24) |

## Decision-needed rows (user, see 07)

- Pathfinding family for target scale (NavMesh / A* / flow fields)
- Save library (JsonUtility / Json.NET)
- UI split (uGUI everywhere / UI Toolkit + uGUI)
- AI framework spend (Behavior Designer / NodeCanvas / hand-rolled)
- Difficulty philosophy (SC2 cheating-style / AoE2 honest / DDA)
- MIT reuse (MinaPecheux) with attribution vs learn-from-only