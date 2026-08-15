# 99 - Consolidated Sources

All sources accessed 2026-08-14 unless noted. Verification tags: [P] primary/verified, [S] secondary/high-confidence, [U] unverified/flagged, [D] dead/404 at access.

## Unity official documentation and products

| # | Source | What it supports | Tag |
|---|---|---|---|
| S1 | docs.unity3d.com/6000.0/Documentation/Manual/Input.html | Two input systems, legacy default | [P] |
| S2 | Input System package manual (com.unity.inputsystem@1.13/1.14) | Action Maps, RTS fit | [P] |
| S3 | docs.unity3d.com/6000.0/Documentation/Manual/class-InputManager.html | Legacy Input Manager | [P] |
| S4 | JsonUtility scripting ref (6000.0) | Fields-only serialization, no Dictionary | [P] |
| S5 | docs.unity3d.com/6000.0/Documentation/Manual/class-ScriptableObject.html | SO data assets | [P] |
| S6 | docs.unity3d.com/6000.0/Documentation/Manual/Prefabs.html | Prefab workflow | [P] |
| S7 | docs.unity3d.com/6000.0/Documentation/Manual/UI-system-compare.html | UI Toolkit vs uGUI vs IMGUI | [P] |
| S8 | AI Navigation 2.0 package manual (com.unity.ai.navigation@2.0) | NavMesh baking/agents/obstacles | [P] |
| S9 | Entities 1.3.15 manual (com.unity.entities@1.3) | DOTS ECS | [P] |
| S10 | docs.unity3d.com/Manual/Coroutines.html | Coroutine ticks, allocations | [P] |
| S11 | docs.unity3d.com/6000.0/Documentation/Manual/GPUInstancing.html | Instancing, skinned NOT instanceable | [P] |
| S12 | docs.unity3d.com/6000.0/Documentation/Manual/script-serialization-rules.html | Serialization rules, no Dictionary | [P] |
| S13 | docs.unity3d.com/6000.0/Documentation/Manual/OcclusionCulling.html | GPU occlusion culling alternative | [P] |
| S14 | docs.unity3d.com/6000.0/Documentation/Manual/LevelOfDetail.html | LOD groups | [P] |
| S15 | Cinemachine 3.1 manual | "top down, and RTS" support | [P] |
| S16 | docs.unity3d.com/6000.0/Documentation/Manual/universal-render-pipeline.html | URP | [P] |
| S17 | docs.unity3d.com/6000.0/Documentation/Manual/high-definition-render-pipeline.html | HDRP | [P] |
| S18 | docs.unity3d.com/6000.0/Documentation/Manual/class-ComputeShader.html | Compute shaders | [P] |
| S19 | docs.unity3d.com/6000.0/Documentation/Manual/Profiler.html | Profiler | [P] |
| S20 | docs.unity3d.com/6000.0/Documentation/Manual/FrameDebugger.html | Frame Debugger | [P] |
| S21 | docs.unity3d.com/6000.0/Documentation/Manual/terrain-UsingTerrains.html | Terrain system | [P] |
| S22 | unity.com/releases/unity-6 | Unity 6.3 LTS current | [P] |
| S23 | unity.com/releases/unity-6/support | LTS support windows (6.0 ends Oct 2026) | [P] |
| S24 | unity.com/releases/unity-6.1 | 6.1 exists | [P] |
| S25 | unity.com/blog/unity-6-2-beta-release-announcement-data-driven-stability | 6.2 beta announced | [P] |
| S26 | unity.com/releases/unity-6.2 | 6.2 GA page | [D] 404 |
| S27 | unity.com/dots | Door 407 "Diplomacy is Not an Option" DOTS quote | [P] |
| S28 | learn.unity.com (750+ hours) | Unity Learn catalog | [P] |
| S29 | Unity Learn object pooling tutorial | Pooling pattern (2019.4 verified) | [P] |
| S30 | Unity Learn A* project | Retired | [D] dead link |
| S31 | unity.com/resources/how-to-move-from-built-in-to-urp | URP migration guide | [P] |
| S32 | github.com/Unity-Technologies/megacity-metro | Official DOTS sample | [P] |
| S33 | github.com/Unity-Technologies/EntityComponentSystemSamples (8.2k stars) | DOTS samples, NOASSERTION license | [P] |
| S34 | github.com/Unity-Technologies/Graphics (gpu-resident-drawer.md) | GPU Resident Drawer docs | [P] |
| S35 | SRP Batcher manual (HDRP 17.6) | SRP Batcher | [P] |
| S36 | github.com/UnityTechnologies/ATerribleKingdom (849 stars) | Official small RTS sample, NO LICENSE, 2019.4.1f1 | [P] |
| S37 | github.com/UnityTechnologies/InputSystem_Warriors | RTS input demo | [P] |

## Community and OSS (Unity RTS / components)

| # | Source | What it supports | Tag |
|---|---|---|---|
| S38 | arongranberg.com/astar/ | A* Pathfinding Project, RTS-targeted | [P] |
| S39 | arongranberg.com/2024/02/a-pathfinding-project-5-0/ | v5.0 Burst/Jobs/ECS | [P] |
| S40 | arongranberg.com/astar/documentation/stable/index.html | A* docs | [P] |
| S41 | github.com/MinaPecheux/UnityTutorials-RTS (725 stars) | MIT, learn-from codebase; 2020.3.18f1 | [P] |
| S42 | github.com/coconauts/startcraft-unity3d (703 stars) | GPL-3.0, 2020.3.12f1 | [P] |
| S43 | github.com/stormtek/unity-rts-demo (425 stars) | no license, 2012 code | [P] |
| S44 | github.com/gadget114514/DOTS-RTS | DOTS demo, no LICENSE, flow fields/formations | [P] |
| S45 | github.com/skhamis/Unity-ECS-RTS (240 stars) | dead 2019 | [P] |
| S46 | github.com/skyteks/WarKingdoms (240 stars) | no license, 2021.3.4f1 | [P] |
| S47 | github.com/dudu502/LittleBee (577 stars) | NOASSERTION, ECS/lockstep | [P] |
| S48 | github.com/chromealex/ecs (561 stars) | network rollback reference | [U] |
| S49 | github.com/mrdav30/LockstepRTSEngine (183 stars) | active, lockstep/determinism | [U] |
| S50 | github.com/FieldWarning/projectFieldWarning (99 stars) | Apache-2.0, stale | [P] |
| S51 | github.com/honnisha/Unity-RTS (43 stars) | NOASSERTION, pushed 2024-09 | [P] |
| S52 | github.com/nibsbin/LockstepFramework (1,528 stars) | lockstep, avoid | [P] |
| S53 | github.com/proepkes/UnityLockstep (711 stars) | archived, avoid | [P] |
| S54 | github.com/methusalah/OpenRTS (1,514 stars) | Java, NOT Unity | [P] |
| S55 | github.com/snape/RVO2 (960 stars) | RVO crowd avoidance, license verify | [U] |
| S56 | gitee.com/BonoGuo/RVO2-Unity | RVO2 Unity port | [U] |
| S57 | github.com/mxgmn/WaveFunctionCollapse | NOASSERTION | [U] |
| S58 | github.com/selfsame/unity-wave-function-collapse (320 stars) | NOASSERTION | [U] |
| S59 | github.com/Auburn/FastNoiseLite | noise maps | [P] |
| S60 | github.com/h8man/NavMeshPlus | 2D only | [P] |
| S61 | github.com/sturdyspoon/unity-pathfinding | 2D tilemap | [P] |
| S62 | github.com/danjm-dev/flow-field-pathfinding | flow field | [U] |
| S63 | github.com/ChirlChen/Flow-Field-PathFinding | flow field | [U] |
| S64 | github.com/vonWolfehaus/flow-field | flow field + steering | [U] |
| S65 | github.com/ElijahZawesome/flow-field | flow field | [D] 404 |
| S66 | github.com/AsehesL/FogOfWar | FoW render-texture crib | [U] |
| S67 | github.com/xddemir/Unity-Fog-of-War | FoW crib | [U] |
| S68 | brendankeesing.com/blog/fog_of_war/ | FoW writeup | [P] |
| S69 | discussions.unity.com/t/creating-the-fog-of-war/1705274 | FoW community thread | [P] |
| S70 | github.com/luxkun/ReGoap | free GOAP, license unstated | [U] |
| S71 | github.com/davechurchill/ualbertabot | MIT, unmaintained 2021 | [P] |
| S72 | github.com/tim-kos/the_duke_ai | AoE2 custom AI | [P] |
| S73 | api.github.com/repos/TheKiwiCoder/BehaviourTree | dead | [D] 404 |
| S74 | Panda BT | unreachable | [D] |
| S75 | opsive.com Behavior Designer | paid BT, active | [P] |
| S76 | paradoxnotion.com NodeCanvas | paid BT/FSM, active | [P] |
| S77 | gamedev.tv/courses/unity-realtime-strategy | Unity 6 course, 25.5h, BTs/FoW/event bus | [P] |
| S78 | unitycodemonkey.com/dotsfreecourse.php | free 7h DOTS RTS course | [P] |
| S79 | unitycodemonkey.com They-Are-Billions-style RTS series | free RTS series | [P] |
| S80 | quickunitytips.blogspot.com DOTS-ECS 2025 guide | NavMesh not DOTS-ready | [P] |
| S81 | darkounity.com DOTS-ECS 2026 guide | DOTS-ECS guide | [P] |
| S82 | theknightsofu.com GRD deep dive | 43.5k->128 calls, +100MB memory | [P] |
| S83 | discussions.unity.com Entities+GRD regressions (Feb 2025) | GRD regression reports | [P] |
| S84 | soldier.jp 25 best Unity templates 2026 | template landscape | [P] |
| S85 | github.com/search?q=ancient+rts | no Unity ancient RTS | [P] |
| S86 | Asset Store rts-engine-121344 (via Jina) | RTS Engine | [D] 404 |
| S87 | assetstore.unity.com strategy-kit-rts-engine-79732 | $85 commercial, Unity 6000.0.51, 2025-08 | [P] |
| S88 | RTS Engine SoumiDelRio 79732 | $60, 2019-era | [P] |
| S89 | gameaipro.com Vol 1 | Ch4/5/9/10/12/26/29 AI chapters, free | [P] |
| S90 | gameaipro.com Vol 3 | Ch9/12/13/14 AI chapters, free | [P] |
| S91 | learn.unity.com Super Simple RTS | AI snippet | [P] |
| S92 | GameDev.tv community BinaryFormatter->Json.NET thread | migration evidence | [P] |
| S93 | learn.microsoft.com .NET 9 BinaryFormatter removal | always throws, MSB3825 | [P] |
| S94 | stackoverflow MSB3825 | warning reference | [P] |
| S95 | devblogs.microsoft.com/dotnet/binaryformatter-removed-from-dotnet-9/ | removal announcement | [P] |

## Non-Unity OSS RTS engines (architecture/AI references)

| # | Source | What it supports | Tag |
|---|---|---|---|
| S96 | api.github.com/repos/OpenRA/OpenRA (17,226 stars, GPL-3.0, push 2026-08-01) | trait architecture reference | [P] |
| S97 | api.github.com/repos/0ad/0ad (2,823 stars, GPL-2.0+) + gitea.wildfiregames.com/0ad/0ad | ancient theme reference | [P] |
| S98 | api.github.com/repos/spring/spring (3,963 stars, GPL-2.0+) + raw LICENSE | Lua + Skirmish AI reference | [P] |
| S99 | api.github.com/repos/Warzone2100/warzone2100 (3,909 stars, GPL-2.0, pushed 2026-08-14) | best single-player AI reference | [P] |
| S100 | raw.githubusercontent.com/SFTtech/openage/master/copying.md (14,376 stars, GPL-3.0+) | openage reference | [P] |

## Academic and literature

| # | Source | What it supports | Tag |
|---|---|---|---|
| S101 | Ontanon survey, IEEE T-CIAIG 2013, doi 10.1109/TCIAIG.2013.2286295 | hierarchy+scripting dominant | [P] (paywalled abstract) |
| S102 | arxiv.org/abs/1809.07193 (TStarBots) | hierarchical bot beat SC2 AIs | [P] |
| S103 | nature.com/articles/s41586-019-1724-z (AlphaStar) | RL scale, APM limit | [P] |
| S104 | arxiv.org/abs/1706.02796 | DDA MOBA study | [P] |
| S105 | arxiv.org/abs/2007.07220 | DDA overview | [P] |
| S106 | arxiv.org/abs/2408.06818 | personalized DDA | [P] |
| S107 | arxiv.org/abs/2111.07631 | AI gaming survey | [P] |
| S108 | arxiv.org/abs/1912.10944 | RL survey | [P] |
| S109 | arxiv.org/abs/2006.15545 | fast user adaptation DDA | [P] |
| S110 | doi.org/10.1609/aimag.v37i2.2657 | StarCraft AI competition | [P] |
| S111 | arxiv.org/abs/2603.23875 (SEMA) | LLM latency cuts, not real-time | [P] |
| S112 | arxiv.org/abs/2509.13127 (PLAP) | LLM beats 80% MicroRTS baselines, needs inference | [P] |
| S113 | arxiv.org/abs/2601.05899 (TowerMind AAAI 2026) | LLMs below human experts | [P] |
| S114 | api.crossref.org HPA* query | Harabor & Botea 2008, DOI 10.1109/cig.2008.5035648 | [P] |
| S115 | Orkin GOAP paper (F.E.A.R.) | GOAP origin | [D] 404 (MIT mirrors) |
| S116 | Pottinger AoE AI paper | AoE AI | [D] unfindable |
| S117 | starcraft.fandom.com/wiki/AI_script | SC2 AI scripts | [U] captcha-blocked, partial |
| S118 | forums.ageofempires.com/t/does-the-ai-cheat/119262 | AoE2 honest AI claim | [P] |
| S119 | aoe.heavengames.com | classic hardest extra resources | [P] |
| S120 | steamcommunity.com/app/813780 | AoE2 extreme AI cheat dispute | [P] |

## Encyclopedia and general

| # | Source | What it supports | Tag |
|---|---|---|---|
| S121 | en.wikipedia.org/wiki/Fog_of_war | FoW concept | [P] |
| S122 | en.wikipedia.org/wiki/Real-time_strategy | RTS genre definition | [P] |
| S123 | ML-Agents 3.0 docs | Mono-only training | [P] |
| S124 | cgchannel.com + renderarena.com Unity 6.3 LTS | 6.3 LTS secondary | [S] |
| S125 | GitHub search API "unity rts language:C#" (1,469 hits) | landscape scan method | [P] |

## Verification status summary

- Verified primary at access: 96 rows. Secondary/high-confidence: 2. Flagged/unverified (license or access): 18. Dead/404 at access: 7 (S26, S30, S65, S73, S74, S86, S115, S116).
- Re-verify at implementation time: Unity 6.2 GA status, all licenses marked [U], A* Pro terms, Asset Store template availability.
- Semantic Scholar endpoints 429'd twice during research; paths recovered via arXiv and Crossref (no loss of cited claims).