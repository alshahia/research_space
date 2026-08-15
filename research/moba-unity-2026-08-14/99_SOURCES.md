# 99 - Source Registry

**Task:** T-2026-08-14-003 | **Access date for all web sources:** 2026-08-14 | **Registry rows:** 124 (S1-S124)

## Legend

- **Tag meanings:** `[verified]` = fetched/read directly (docs, GitHub API, arXiv API, product pages, web archive). `[secondary]` = aggregator, mirror, or summary (blogs, Wikipedia, Fandom mirror pages where CAPTCHA limited Jina Reader, forum threads, websearch evidence). `[UNVERIFIED]` = fetch blocked or snippet-level only; do not build decisions on it alone.
- **Mirror dedupe:** Fandom mirror pages of the official LoL Wiki (wiki.leagueoflegends.com) were merged into the same row where both were fetched; the wiki.leagueoflegends.com URL is listed first.
- **Contradiction note:** S88 (forum claims) and S116 (blocked fetch) are the only two `[UNVERIFIED]` rows; every adjudication in chapters 01/03/06 rests on verified rows only.

## Group A - Unity official documentation (S1-S23)

| ID | Source | Type | Tag | URL |
|---|---|---|---|---|
| S1 | Unity Manual - Input (6000.0) | official-docs | [verified] | https://docs.unity3d.com/6000.0/Documentation/Manual/Input.html |
| S2 | Unity Input System package manual 1.14 | official-docs | [verified] | https://docs.unity3d.com/Packages/com.unity.inputsystem@1.14/manual/index.html |
| S3 | Unity Input System - Touch (1.13) (also core S23) | official-docs | [verified] | https://docs.unity3d.com/Packages/com.unity.inputsystem@1.13/manual/Touch.html |
| S4 | URP Manual (6000.0) | official-docs | [verified] | https://docs.unity3d.com/6000.0/Documentation/Manual/universal-render-pipeline.html |
| S5 | GPU instancing | official-docs | [verified] | https://docs.unity3d.com/6000.0/Documentation/Manual/GPUInstancing.html |
| S6 | SRP Batcher | official-docs | [verified] | https://docs.unity3d.com/6000.0/Documentation/Manual/SRPBatcher.html |
| S7 | Addressables | official-docs | [verified] | https://docs.unity3d.com/6000.0/Documentation/Manual/com.unity.addressables.html |
| S8 | Burst | official-docs | [verified] | https://docs.unity3d.com/6000.0/Documentation/Manual/com.unity.burst.html |
| S9 | Job System | official-docs | [verified] | https://docs.unity3d.com/6000.0/Documentation/Manual/JobSystem.html |
| S10 | UI system compare (uGUI recommended for runtime) (also oss S28) | official-docs | [verified] | https://docs.unity3d.com/6000.0/Documentation/Manual/UI-system-compare.html |
| S11 | Cinemachine 3.1 | official-docs | [verified] | https://docs.unity3d.com/Packages/com.unity.cinemachine@3.1/manual/index.html |
| S12 | Timeline 1.8 | official-docs | [verified] | https://docs.unity3d.com/Packages/com.unity.timeline@1.8/manual/index.html |
| S13 | Quality settings | official-docs | [verified] | https://docs.unity3d.com/6000.0/Documentation/Manual/class-QualitySettings.html |
| S14 | LOD | official-docs | [verified] | https://docs.unity3d.com/6000.0/Documentation/Manual/LevelOfDetail.html |
| S15 | Unity Learn - Introduction to Object Pooling | official-docs | [verified] | https://learn.unity.com/tutorial/introduction-to-object-pooling |
| S16 | Unity Mobile Game Performance Guide | official-docs | [verified] | https://create.unity.com/mobile-game-performance-guide |
| S17 | Android ADPF for Unity | official-docs | [verified] | https://developer.android.com/games/engines/unity/unity-adpf |
| S18 | Unity Manual - Behavior graphs (com.unity.behavior v1.0.16) | official-docs | [verified] | https://docs.unity3d.com/Packages/com.unity.behavior@1.0/manual/behavior-graph.html |
| S19 | Unity 6000.0 - NavMeshAgent API | official-docs | [verified] | https://docs.unity3d.com/6000.0/Documentation/ScriptReference/AI.NavMeshAgent.html |
| S20 | Unity 6000.0 - NavMesh.CalculatePath | official-docs | [verified] | https://docs.unity3d.com/6000.0/Documentation/ScriptReference/AI.NavMesh.CalculatePath.html |
| S21 | Unity 6000.0 - NavMeshAgent.SetDestination | official-docs | [verified] | https://docs.unity3d.com/6000.0/Documentation/ScriptReference/AI.NavMeshAgent.SetDestination.html |
| S22 | Unity 6000.0 - CharacterController | official-docs | [verified] | https://docs.unity3d.com/6000.0/Documentation/ScriptReference/CharacterController.html |
| S23 | Unity 6000.0 - Physics.OverlapSphere | official-docs | [verified] | https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Physics.OverlapSphere.html |

## Group B - Vendor / official announcements (S24-S35)

| ID | Source | Type | Tag | URL |
|---|---|---|---|---|
| S24 | League of Legends - How to Play (official) | official-docs | [verified] | https://www.leagueoflegends.com/en-us/how-to-play/ |
| S25 | Riot dev blog - /dev: New Bot AI, Oh My! (patch 14.6) | official-docs | [verified] | https://www.leagueoflegends.com/en-us/news/dev/dev-new-bot-ai-oh-my-coming-14-6 |
| S26 | Riot tech blog - The Art of Spell Casting (part 1) | official-docs | [verified] | https://technology.riotgames.com/news/art-spell-casting-part-1 |
| S27 | Riot tech blog - The Art of Spell Casting (part 2) | official-docs | [verified] | https://technology.riotgames.com/news/art-spell-casting-part-2 |
| S28 | Riot dev blog - Making a More Human Bot (2014-04, via web.archive) | official-docs | [verified] | https://web.archive.org/web/20140420075735/http://na.leagueoflegends.com/en/news/game-updates/gameplay/dev-blog-making-more-human-bot |
| S29 | Riot - Fixing the Internet for Real Time Applications, Part I | official-docs | [verified] | https://www.riotgames.com/en/news/fixing-internet-real-time-applications-part-i |
| S30 | Riot - Profiling: Optimisation | official-docs | [verified] | https://www.riotgames.com/en/news/profiling-optimisation |
| S31 | Unity News - Riot Games chooses Unity for LoL franchise | official-docs | [verified] | https://unity.com/news/riot-games-chooses-build-next-games-league-legends-franchise-unity |
| S32 | Wild Rift minimum device specification requirements | official-docs | [verified] | https://wildrift.leagueoflegends.com/en-us/news/game-updates/wild-rift-minimum-device-specification-requirements-update/ |
| S33 | Moonton News 237 - Project NEXT 2025 | official-docs | [verified] | https://en.moonton.com/news/237.html |
| S34 | Moonton News 244 | official-docs | [verified] | https://en.moonton.com/news/244.html |
| S35 | OpenAI - OpenAI Five defeats Dota 2 world champions | official-docs | [verified] | https://openai.com/index/openai-five-defeats-dota-2-world-champions/ |

## Group C - Game wikis (S36-S65)

| ID | Source | Type | Tag | URL |
|---|---|---|---|---|
| S36 | LoL Wiki - Minion (Fandom mirror merged) | wiki | [verified] | https://wiki.leagueoflegends.com/en-us/Minion |
| S37 | LoL Wiki - Super minion | wiki | [verified] | https://wiki.leagueoflegends.com/en-us/Super_minion |
| S38 | LoL Wiki - Turret (Fandom mirror merged) | wiki | [verified] | https://wiki.leagueoflegends.com/en-us/Turret |
| S39 | LoL Fandom - Kill | wiki | [secondary] | https://leagueoflegends.fandom.com/wiki/Kill |
| S40 | LoL Wiki - Surrendering | wiki | [verified] | https://wiki.leagueoflegends.com/en-us/Surrendering |
| S41 | LoL Wiki - Ward (Fandom mirror merged) | wiki | [verified] | https://wiki.leagueoflegends.com/en-us/Ward |
| S42 | LoL Fandom - Shop | wiki | [secondary] | https://leagueoflegends.fandom.com/wiki/Shop |
| S43 | LoL Fandom - Gold (sell 70%/40%) (mirror of core S5) | wiki | [secondary] | https://leagueoflegends.fandom.com/wiki/Gold_(League_of_Legends) |
| S44 | LoL Wiki - Co-op vs. AI (also ai S4) | wiki | [verified] | https://wiki.leagueoflegends.com/en-us/Co-op_vs._AI |
| S45 | LoL Wiki - Bots (Fandom mirror merged) | wiki | [verified] | https://wiki.leagueoflegends.com/en-us/Bots |
| S46 | LoL Wiki - Baron Nashor | wiki | [verified] | https://wiki.leagueoflegends.com/en-us/Baron_Nashor |
| S47 | LoL Wiki - Rift Herald | wiki | [verified] | https://wiki.leagueoflegends.com/en-us/Rift_Herald |
| S48 | LoL Wiki - WR:Map | wiki | [verified] | https://wiki.leagueoflegends.com/en-us/WR:Map |
| S49 | LoL Wiki - Cash Back (rune system live proof) | wiki | [verified] | https://wiki.leagueoflegends.com/en-us/Cash_Back |
| S50 | LoL Fandom - Damage | wiki | [secondary] | https://leagueoflegends.fandom.com/wiki/Damage |
| S51 | LoL Fandom - Armor | wiki | [secondary] | https://leagueoflegends.fandom.com/wiki/Armor |
| S52 | LoL Fandom - Critical strike | wiki | [secondary] | https://leagueoflegends.fandom.com/wiki/Critical_strike |
| S53 | LoL Fandom - Brush | wiki | [secondary] | https://leagueoflegends.fandom.com/wiki/Brush |
| S54 | LoL Fandom - Sight | wiki | [secondary] | https://leagueoflegends.fandom.com/wiki/Sight |
| S55 | LoL Fandom - Inhibitor | wiki | [secondary] | https://leagueoflegends.fandom.com/wiki/Inhibitor |
| S56 | LoL Fandom - Experience (champion) | wiki | [secondary] | https://leagueoflegends.fandom.com/wiki/Experience_(champion) |
| S57 | LoL Fandom - Controls (Hotkeys and commands) | wiki | [secondary] | https://leagueoflegends.fandom.com/wiki/Controls |
| S58 | MLBB Fandom - Minions (raw wikitext) | wiki | [verified] | https://mobile-legends.fandom.com/wiki/Minions |
| S59 | MLBB Fandom - Turtle | wiki | [verified] | https://mobile-legends.fandom.com/wiki/Turtle |
| S60 | MLBB Fandom - AI Training | wiki | [verified] | https://mobile-legends.fandom.com/wiki/AI_Training |
| S61 | MLBB Fandom - Bush | wiki | [verified] | https://mobile-legends.fandom.com/wiki/Bush |
| S62 | MLBB Fandom - Vs. AI | wiki | [verified] | https://mobile-legends.fandom.com/wiki/Vs._AI |
| S63 | Dota 2 Wiki (Fandom) - Bots (difficulty dial matrix) | wiki | [verified] | https://dota2.fandom.com/wiki/Bots |
| S64 | Wikipedia - League of Legends: Wild Rift | wiki | [secondary] | https://en.wikipedia.org/wiki/League_of_Legends:_Wild_Rift |
| S65 | Wikipedia - Mobile Legends: Bang Bang (also guide S26) | wiki | [secondary] | https://en.wikipedia.org/wiki/Mobile_Legends:_Bang_Bang |

## Group D - Industry / secondary (S66-S88)

| ID | Source | Type | Tag | URL |
|---|---|---|---|---|
| S66 | Naavik - Mobile Legends deep dive | industry | [secondary] | https://naavik.co/deep-dives/mobile-legends-bang-bang/ |
| S67 | Game Developer - MOBA introduction and analysis | industry | [verified] | https://www.gamedeveloper.com/design/moba-introduction-and-analysis |
| S68 | Game Developer - Jeffrey Lin, fixing toxic behavior in LoL | industry | [verified] | https://www.gamedeveloper.com/design/fixing-toxic-online-behavior-in-league-of-legends |
| S69 | Kain Shin - Predictive Aim Mathematics for AI Targeting (Game Developer, 2009) | industry | [verified] | https://www.gamedeveloper.com/programming/predictive-aim-mathematics-for-ai-targeting |
| S70 | GameDev StackExchange #74282 - Aim at moving target (2014) | Q&A | [verified] | https://gamedev.stackexchange.com/questions/74282/aim-at-moving-target-or-predicting-targets-position-at-time-it-takes-for-proje |
| S71 | pcx-ai-toolkit - aimbot-math.md (2025-2026) | repo-doc | [verified] | https://github.com/NetVar1337/pcx-ai-toolkit/blob/main/knowledge/aimbot-math.md |
| S72 | ExitLag blog - Wild Rift guide (2026-02-25) | blog | [secondary] | https://www.exitlag.com/blog/league-of-legends-wild-rift |
| S73 | Boosteria - Wild Rift vs LoL (2025-12-23) | blog | [secondary] | https://boosteria.org/guides/rift-vs-league-differences |
| S74 | BuyAccount - Wild Rift vs LoL PC (2026-06-26) | blog | [secondary] | https://buyaccount.gg/blog/wild-rift-vs-league-of-legends-pc |
| S75 | Yahoo Gaming SEA - Wild Rift control settings (2021-08-11) | news | [secondary] | https://sg.news.yahoo.com/how-to-wild-rift-controls-button-layout-settings-pro-134837982.html |
| S76 | PC Gamer - Wild Rift is a kinder, gentler LoL | press | [secondary] | https://www.pcgamer.com/league-of-legends-wild-rift-is-a-kinder-gentler-league-of-legends/ |
| S77 | Dot Esports - Wild Rift hands-on | press | [secondary] | https://dotesports.com/news/hands-on-with-mobile-league-of-legends-wild-rift-gameplay-and-differences |
| S78 | Upcomer - Best settings in Wild Rift | press | [secondary] | https://upcomer.com/what-are-the-best-settings-in-league-of-legends-wild-rift/ |
| S79 | ONE Esports - MLBB engine update | press | [secondary] | https://www.oneesports.gg/mobile-legends/mobile-legends-bang-bang-is-getting-an-engine-update/ |
| S80 | deskomvis - LOD performance paper (DOI 10.38010/deskomvis.v6i1.92) | academic | [verified] | https://deskomvis.org |
| S81 | EventHubs - 2XKO input latency tests (2026-02-03) | press | [secondary] | https://www.eventhubs.com/news/2026/feb/03/2xko-input-lag-tests/ |
| S82 | soft112 - MLBB product page (controls, match length, AI takeover) | aggregator | [secondary] | https://mobile-legends-bang-bang-ios.soft112.com/ |
| S83 | LOL Brain - Objective timers guide | guide | [secondary] | https://www.lol-brain.com/blog/objective-timers-guide |
| S84 | Strafe - Baron Nashor guide | guide | [secondary] | https://www.strafe.com/articles/read/baron-nashor-guide/ |
| S85 | mlbb.io - Claude hero page (kit shape) | fan-site | [secondary] | https://mlbb.io/en/hero/claude |
| S86 | Unity Discussions 733865 (2019-02-28) - SetDestination stopping agents | forum | [verified] | https://discussions.unity.com/t/issues-with-navmeshagent-setdestination-stopping-agents/733865 |
| S87 | YouTube - FIX Jittery NavMeshAgent Movement in Unity 6 | video | [verified] | https://www.youtube.com/watch?v=-egkBSkF_LA |
| S88 | Dota 2 community posts (Steam community / Reddit / GameFAQs) - Unfair bots claims | forums | [UNVERIFIED] | https://steamcommunity.com/app/570/discussions/ |

## Group E - Academic (S89-S95)

| ID | Source | Type | Tag | URL |
|---|---|---|---|---|
| S89 | arXiv 2110.14221 - Learning Diverse Policies in MOBA Games via Macro-Goals | academic | [verified] | https://arxiv.org/abs/2110.14221 |
| S90 | arXiv 1912.06680 - Dota 2 with Large Scale Deep RL | academic | [verified] | https://arxiv.org/abs/1912.06680 |
| S91 | Font & Mahlmann - The Dota 2 Bot Competition (IEEE Trans. Games 2018; arXiv 2103.02943) | academic | [verified] | https://arxiv.org/abs/2103.02943 |
| S92 | Silva & Chaimowicz - On the Development of Intelligent Agents for MOBA Games (arXiv 1706.02789) | academic | [verified] | https://arxiv.org/abs/1706.02789 |
| S93 | Silva & Chaimowicz - A Tutor Agent for MOBA Games (arXiv 1706.02832) | academic | [verified] | https://arxiv.org/abs/1706.02832 |
| S94 | Silva et al. - Dynamic Difficulty Adjustment on MOBA Games (arXiv 1706.02796) | academic | [verified] | https://arxiv.org/abs/1706.02796 |
| S95 | Tencent Honor-of-Kings RL line (arXiv 2011.12692 + 2011.12582 + 2110.14221) | academic | [verified] | https://arxiv.org/abs/2011.12692 |

## Group F - Repositories (S96-S121)

| ID | Source | Type | Tag | URL |
|---|---|---|---|---|
| S96 | GitHub - LeagueSandbox/GameServer | repo | [verified] | https://github.com/LeagueSandbox/GameServer |
| S97 | GitHub - wqaetly/NKGMobaBasedOnET (API + README) | repo | [verified] | https://api.github.com/repos/wqaetly/NKGMobaBasedOnET |
| S98 | GitHub - FlameskyDexive/Legends-Of-Heroes (API + README) | repo | [verified] | https://api.github.com/repos/FlameskyDexive/Legends-Of-Heroes |
| S99 | GitHub - swordjoinmagic/MoBaDemo (API) | repo | [verified] | https://api.github.com/repos/swordjoinmagic/MoBaDemo |
| S100 | GitHub - exmex/UnityMoba (API) | repo | [verified] | https://api.github.com/repos/exmex/UnityMoba |
| S101 | GitHub - ARTS/ActionRPG candidate 404 evidence (3 fetches) | repo | [verified] | https://api.github.com/repos/Unity-Technologies/ARTS (404) |
| S102 | Websearch - Unity official Action RPG sample (negative; only Unity Learn 3D Game Kit surfaced) | web | [secondary] | websearch, 6 results |
| S103 | GitHub search - MOBA tutorial repos (API) | repo | [verified] | https://api.github.com/search/repositories?q=moba+unity+tutorial |
| S104 | GitHub - Unity-Technologies Boss Room (com.unity.multiplayer.samples.coop; NOASSERTION license) | repo | [verified] | https://api.github.com/repos/Unity-Technologies/com.unity.multiplayer.samples.coop |
| S105 | GitHub search - MOBA kit (negative) + websearch MOBA kit store | repo | [verified] | https://api.github.com/search/repositories?q=moba+kit |
| S106 | GitHub - No78Vino/gameplay-ability-system-for-unity (EX-GAS; Odin dependency) | repo | [verified] | https://api.github.com/repos/No78Vino/gameplay-ability-system-for-unity |
| S107 | GitHub - MaiKuraki/UnityStarter (API + LICENSE + README) | repo | [verified] | https://api.github.com/repos/MaiKuraki/UnityStarter |
| S108 | GitHub - PhysaliaStudio/Flexi (API + README) | repo | [verified] | https://api.github.com/repos/PhysaliaStudio/Flexi |
| S109 | GitHub - sjai013/unity-gameplay-ability-system (archived notice) | repo | [verified] | https://api.github.com/repos/sjai013/unity-gameplay-ability-system |
| S110 | GitHub - Skill editors x3 (Joker / seqence / plato) | repo | [verified] | https://api.github.com/repos/YouwantLee/Joker_Unity_SkillEditor |
| S111 | GitHub - Inventory repos x3 (UniversalInventorySystem / Unity-Inventory-System / Cholopol-Tetris-Inventory-System) | repo | [verified] | https://api.github.com/repos/Heymity/UniversalInventorySystem |
| S112 | GitHub - python-sc2 forks (BurnySc2 / Dentosal) | repo | [verified] | https://api.github.com/repos/BurnySc2/python-sc2 |
| S113 | GitHub - google-deepmind/pysc2 | repo | [verified] | https://api.github.com/repos/google-deepmind/pysc2 |
| S114 | GitHub - Sharky + AresSC2/ares-sc2 | repo | [verified] | https://api.github.com/repos/sharknice/Sharky |
| S115 | GitHub - forest0xia/dota2bot-OpenHyperAI (API + README + LICENSE) | repo | [verified] | https://api.github.com/repos/forest0xia/dota2bot-OpenHyperAI |
| S116 | Valve Developer Wiki - Dota Bot Scripting (also ai S2; 404 via Jina, Anubis on direct) | wiki | [UNVERIFIED] | https://developer.valvesoftware.com/wiki/Dota_Bot_Scripting |
| S117 | GitHub - AoE2 AI repos (FLWL/aoe2-ai-module; Jvinniec/aoe2-aiscript) | repo | [verified] | https://api.github.com/repos/FLWL/aoe2-ai-module |
| S118 | Websearch - project.storm (cancelled/unrelated; icy-veins + gamepressure) | web | [secondary] | websearch, 4 results |
| S119 | GitHub - luxkun/ReGoap (API + raw LICENSE, Apache-2.0) | repo | [verified] | https://api.github.com/repos/luxkun/ReGoap |
| S120 | LeanPool (Asset Store page + docs + GitHub 404) | product | [verified] | https://assetstore.unity.com/packages/tools/utilities/lean-pool-35666 |
| S121 | GitHub - Demigiant/dotween (API + raw LICENSE, MIT) | repo | [verified] | https://api.github.com/repos/Demigiant/dotween |

## Group G - Asset Store (S122-S123)

| ID | Source | Type | Tag | URL |
|---|---|---|---|---|
| S122 | A* Pathfinding Project Pro (store + AssetFigures pricing: $140 list, $70 sale) | product | [verified] | https://assetstore.unity.com/packages/tools/behavior-ai/a-pathfinding-project-pro-87744 |
| S123 | Behavior Designer (classic $95; Pro 3 DOTS $79.75-159.50) | product | [verified] | https://assetstore.unity.com/packages/tools/behavior-ai/behavior-designer-behavior-trees-for-everyone-15277 |

## Group H - Prior research (S124)

| ID | Source | Type | Tag | URL |
|---|---|---|---|---|
| S124 | Prior RTS dossier research/unity-rts-2026-08-14/ (cornerstone verdict, save architecture, phase-gate format; includes prior angle files P1/P2 refs) | local dossier | [verified] | file:///E:/research_space/research/unity-rts-2026-08-14/ |

## Verification audit

- **Rows:** 124 (A:23, B:12, C:30, D:23, E:7, F:26, G:2, H:1). Verified count: 93; secondary: 29 (S39, S42, S43, S50-S57, S64-S66, S72-S79, S81-S85, S102, S118); UNVERIFIED: 2 (S88, S116).
- **Dedupes performed:** Fandom mirrors of official wiki pages (S36/S38/S41/S43/S44/S45), Touch docs (guide S3 = core S23), UI compare (guide S10 = oss S28), Co-op vs. AI (games S9 = ai S4), MLBB Wikipedia (games S20 = guide S26), Valve wiki (ai S2 = oss S20).
- **Any page moved to a newer archive/was 404:** S28 fetched via web.archive.org (2014 post no longer live); S116 unreachable; S88 snippet-level.
- **Audit rule:** a chapter claim with a `[secondary]` or `[UNVERIFIED]` tag must not be the sole basis for an ADR. Checked: all ADRs rest on [verified] rows.