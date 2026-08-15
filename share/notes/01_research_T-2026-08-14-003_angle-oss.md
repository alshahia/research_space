# 01_research_T-2026-08-14-003_angle-oss.md

- Task: T-2026-08-14-003
- Phase: 1 (research, Tier 4)
- Angle: oss (open-source landscape + cornerstone verdict)
- Agent: am-research
- Date: 2026-08-14
- Status: complete
- Reuses: `research/unity-rts-2026-08-14/03_OPEN_SOURCE_LANDSCAPE.md` (prior RTS cornerstone verdict + verified rows) and `share/notes/01_research_T-2026-08-14-002_angle-oss.md` (full prior verified rows, 20 findings); `agents_manager/memory/projects/research-space/playbook.md` rows for T-2026-08-14-002 (angle-ai findings on AoE2 AI honesty and KiwiCoder dead repo, playbook.md:418-421). This pass DELTAS the MOBA lens on top of the RTS dossier; prior verified rows are cited, not re-verified.

## Task in one sentence

Verify whether the MOBA (LoL-style, local single-player vs AI) lens changes the prior "no OSS cornerstone, build from scratch" RTS verdict, and produce a verified open-source landscape for: Unity MOBA/ARTS projects, ARPG/hero-action ability systems, non-Unity MOBA/strategy AI references (SC2 bots, Dota 2 bots, AoE2 AI), and Unity build-vs-buy packages (pathfinding, AI, pooling, tweening, UI), with license + maintenance + verdict per candidate.

## What we know for sure

- Prior RTS dossier verdict: no permissively-licensed, active, complete Unity RTS engine exists; build from scratch; learn-from constellation = MinaPecheux/UnityTutorials-RTS (MIT) + OpenRA + 0 A.D. + Warzone2100; all mature non-Unity engines are GPL-family and reference-only (prior dossier `03_OPEN_SOURCE_LANDSCAPE.md:5-14, 32-34`).
- Every GitHub search this pass used the search API (api.github.com) with pushed_at as the activity signal (updated_at misleads, prior finding `01_research_T-2026-08-14-002_angle-oss.md:39,44`).
- License + maintenance facts below are primary-source verified on 2026-08-14 via repo API, raw LICENSE/README fetches, and Asset Store/web pages.
- The MOBA lens does NOT produce a Unity MOBA cornerstone: all Unity MOBA projects found are dead, unlicensed, or multiplayer/lockstep-oriented (findings 2-8). The lens DOES materially upgrade the component-level landscape: 3 active MIT gameplay-ability-system (GAS) frameworks, an active MIT LoL-style project, an active MIT Dota 2 bot-script AI reference, and an active Apache-2.0 GOAP library (findings 9-11, 17, 23).

## What we don't know (ambiguities)

1. Target Unity version for the build (2022.3 LTS vs Unity 6/6000.x). UnityStarter is badge-verified for both [S11]; every other Unity reference has an unverified engine version this pass.
   - **Suggested clarifying question:** "Which Unity version is the baseline for the MOBA build: 2022.3 LTS or Unity 6 (6000.x)?"
2. Paid-asset budget: Behavior Designer ($95) [S24], A* Pathfinding Project Pro ($140, on sale $70) [S23], and the paid Odin Inspector hidden dependency inside EX-GAS [S10] all assume different budgets; free paths exist for each.
   - **Suggested clarifying question:** "Is there a paid-asset budget for the MOBA build (e.g., Behavior Designer $95, A* Pro $140), or must the stack be free?"
3. Framework-adoption appetite: the strongest ability-system candidates (UnityStarter, Flexi) are frameworks with their own architecture opinions; adopting one changes the project's architecture far more than using a library.
   - **Suggested clarifying question:** "Do you prefer adopting an existing MIT ability-system framework (UnityStarter/Flexi) or building a small bespoke ability system from scratch informed by them?"
4. MOBA AI fidelity target: full Dota-style 5v5 lane roles + ganks + teamfights (needs the OpenHyperAI-style layered AI [S19]) vs a simplified 1v1/3v3 lane brawl (much smaller AI scope).
   - **Suggested clarifying question:** "What is the target match shape for v1: full 5v5 with lanes/roles/teamfights, or a simplified smaller-format lane battle?"

## Risks and doubts

| # | Severity | Risk | Mitigation |
|---|---|---|---|
| R1 | HIGH | License traps concentrate exactly where the MOBA landscape is richest: unlicensed Unity MOBA demos (MoBaDemo, UnityMoba [S3][S4]), the paid Odin Inspector dependency buried in EX-GAS's README [S10], Boss Room's NOASSERTION license (Unity Companion License terms) [S8], DOTween's custom no-redistribute-modified license [S27], and GPL engines (OpenRA/0 A.D./Warzone2100, prior rows) [P1]. Copying any of these into a closed game is legal exposure. | Strict learn-from-only for everything not MIT/Apache-2.0; verify per-file license headers before reuse; document each reused component's license in the build; treat Odin-dependent code as non-reusable. |
| R2 | MEDIUM | Ability-system framework churn: all three GAS candidates are young or self-admitted unstable (EX-GAS author: "lots of bugs and performance issues" [S10]; UnityStarter is a large production framework with experimental networking [S11]; Flexi is a programmer's tool with suspended features [S12]). Picking one early and being wrong means a re-architecture. | Treat GAS choice as a milestone-0 decision with a spike: port one ability through the candidate before committing; keep ability data SO-based so the runtime can be replaced. |
| R3 | MEDIUM | No Unity OSS reference exists for MOBA-specific AI (lanes, last-hitting, minion waves, teamfights); the closest verified references are Dota 2 Lua bot scripts [S19] and GPL C++ engines [P1], all requiring architecture translation into Unity C#. | Use OpenHyperAI's structure (role assignment, mode state machines, item-purchase FSM, handicap difficulty) as the design spec, not code; budget translation effort in planning. |
| R4 | MEDIUM | Component-integration drag: adopting UnityStarter or ReGoap-style frameworks pulls in their dependencies (HybridCLR, YooAsset, Odin-style tooling) and architectural assumptions, which can fight the local-only, no-network constraint. | Evaluate modules standalone (GAS/BT packages) before adopting the whole framework; prefer library-shaped components over foundation-shaped ones. |
| R5 | LOW | Chinese-ecosystem references: several active candidates (NKGMobaBasedOnET, Legends-Of-Heroes, EX-GAS) document in Chinese (zhihu, QQ groups) and depend on the ET framework ecosystem [S1][S2][S10]; translation and ecosystem coupling add friction. | Treat as learn-from only; rely on code structure over docs; skip QQ-group support channels. |
| R6 | LOW | Price/activity drift: A* Pro sale price ($70) and LeanPool's slow release cadence (v2.0.2, 2023-10) [S23][S26] can change; Asset Store listings are JS-heavy and weaker via websearch than logged-in sessions (prior dossier caveat, `01_research_T-2026-08-14-002_angle-oss.md:121`). | Re-verify prices at purchase time; treat all prices as 2026-08-14 snapshot. |

## Technical findings

1. MOBA lens, cornerstone test: no complete, permissively-licensed, active Unity MOBA/ARTS engine or template exists. Every Unity MOBA project found falls into the same four buckets the RTS dossier found (dead, unlicensed, multiplayer/lockstep, or framework-fragment). The "no cornerstone, build from scratch" verdict from the RTS dossier is CONFIRMED, unchanged, for the MOBA build [P1][S1-S6].
2. wqaetly/NKGMobaBasedOnET: 1,001 stars, MIT, pushed 2022-07-03 (stale ~4y), Chinese. LoL-style MOBA on the ET framework: state-frame sync with prediction/rollback, Box2D physics, skill editor v1.0, skill system architecture diagrams. Multiplayer architecture -> out of scope; verdict: learn-from for the skill-system editor + data-driven ability layout, no code reuse (ET coupling + stale) [S1].
3. FlameskyDexive/Legends-Of-Heroes: 915 stars, MIT, pushed 2026-07-27 (ACTIVE, ~2.5 weeks before access). LoL-style "ball battle" on ET10 client-server: ECS-based skill framework (active + passive abilities, server-authoritative casting/targeting/cooldowns), composable buff system (stack rules, durations, modifiers), behavior-tree AI agents, Luban data tables, YooAsset, UnityMCP. Verdict: learn-from for skill/buff/behavior-tree architecture; networking layer explicitly out of scope; Unity version unverified (repo default branch master, no ProjectVersion fetched) [S2].
4. swordjoinmagic/MoBaDemo: 785 stars, NO LICENSE, pushed 2019-10-12 (dead ~7y). Chinese Unity MOBA demo. Verdict: AVOID (unlicensed + dead) [S3].
5. exmex/UnityMoba: 445 stars, NO LICENSE, pushed 2018-12-08 (dead ~8y). Mobile MOBA demo. Verdict: AVOID (unlicensed + dead) [S4].
6. Unity's own ARTS / Action RPG sample: NOT FOUND. GitHub names Unity-Technologies/ARTS, UnityTechnologies/ARTS, Unity-Technologies/ActionRPG all return 404 (repo API, 2026-08-14); a web search for an official "Action RPG sample" surfaced no live Asset Store listing (only Unity Learn 3D Game Kit, a different sample). [UNVERIFIED] - treated as delisted or never-public; abstention gate: the 404s are recorded as evidence, do not chase [S5][S6].
7. MOBA tutorial series repos: gabrielmarques22/moba-tutorial-unity3d (12 stars, NO license, 2016 dead) and UnofficialJoe/MOBA-Tutorial (5 stars, NO license, 2023) are too small and unlicensed; verdict: avoid; no OSS MOBA tutorial series of usable quality exists [S7].
8. Unity-Technologies/com.unity.multiplayer.samples.coop (Boss Room): 1,970 stars, NOASSERTION, pushed 2026-07-27 (ACTIVE). Official hero-action sample with an action/ability pattern, cast bars, health/shield system, hero classes. It is built on Netcode for GameObjects (multiplayer), violating the no-network constraint. Verdict: reference-only for action/ability patterns; NOASSERTION license means verify Unity Companion License terms before any code reuse [S8].
9. No commercial MOBA template verified on the Asset Store this pass: GitHub search "moba kit" yields only paulgswanson/UnityMobaKit (2 stars, GPL-3.0, 2019) plus unrelated noise [S9a]; store web search surfaced FPS/royale templates, no dedicated MOBA kit [S9b]. Abstention: like the delisted RTS Engine in the prior dossier, no commercial MOBA template is verifiable; re-verify at purchase time [P1].
10. No78Vino/gameplay-ability-system-for-unity (EX-GAS): 834 stars, MIT, pushed 2026-07-02 (ACTIVE). Standalone Unity port of Unreal's GAS: GameplayTag, Attribute/AttributeSet, ModifierMagnitudeCalculation, GameplayCue, GameplayEffect, Ability, AbilitySystemComponent, plus editor visualizers. LICENSE TRAP: README (master) documents a hard dependency on the PAID Odin Inspector (3.2+), and the author admits the system is "not stable, lots of bugs and performance issues"; docs in Chinese (zhihu). Verdict: learn-from only; reuse not recommended without removing the Odin coupling [S10].
11. MaiKuraki/UnityStarter: 810 stars, MIT (LICENSE file verified, Copyright 2025-2026), pushed 2026-08-13 (ACTIVE, one day before access). Production-oriented modular Unity foundation with UE-inspired architecture (Actor/Pawn/Controller/GameMode), GameplayAbility + GameplayTags, BehaviorTree + AIPerception, Projectile, Movement, Interaction modules, UI framework, HybridCLR hot-update, CI/CD; networking explicitly experimental; Unity 2022.3 LTS + Unity 6000.x compatible (README badges verified). English README. Verdict: strongest component-level reuse candidate for hero ability/behavior systems; adopt modules, not the whole foundation, per R4 [S11].
12. PhysaliaStudio/Flexi: 243 stars, MIT, pushed 2026-03-16 (ACTIVE). OOP gameplay-ability framework: stat/modifier system with stat refresh, built-in ability runners, node-based ability editor built on GraphView + UI Toolkit, no DOTS, no singletons; self-described as a tool for programmers (not artists); a macro feature is suspended (GC-free approach failed). Verdict: learn-from/reuse-with-attribution candidate for the ability runtime + editor [S12].
13. sjai013/unity-gameplay-ability-system: 1,083 stars, MIT, but README declares "REPOSITORY NO LONGER IN DEVELOPMENT... archiving this repository" (pushed 2022-08-12). Verdict: learn-from only (archived) [S13].
14. OSS skill editors (data-driven ability authoring): YouwantLee/Joker_Unity_SkillEditor (163 stars, NO license, 2023), huailiang/seqence (245 stars, MIT, 2020 stale, Chinese 技能编辑器), jewer3330/plato (198 stars, NO license, 2020 stale). None is reusable (license or staleness); verdict: reference-only for editor UX; the build's own skill editor is better started from UnityStarter/Flexi editor patterns [S14].
15. Inventory/shop OSS: Heymity/UniversalInventorySystem (278 stars, Apache-2.0, pushed 2024-03-14, README says "still maintained, some time until next update", Unity 2019.3+) is the only permissively-licensed multi-purpose inventory system; adammyhre/Unity-Inventory-System (281 stars, NO license, 2024-06-27, UI Toolkit based) is unusable for reuse; Cholopol Tetris-style inventory (70 stars, Apache-2.0, 2026-01-30) is niche (backpack grid). MOBA shops are simple lists/grids; verdict: build from scratch or reuse UniversalInventorySystem with the staleness caveat [S15].
16. Non-Unity constellation unchanged and cited from the prior dossier: OpenRA (17,226 stars, GPL-3.0, C#, active; traits + data-driven defs + skirmish AI), 0 A.D. (GPL-2.0, C++, live at gitea; formations/team AI), Warzone2100 (3,909 stars, GPL-2.0, active; single-player AI + research tree), Spring (GPL-2.0+, Lua skirmish AI), openage (GPL-3.0+) [P1]. MOBA mapping: OpenRA trait/data-driven definitions map to ScriptableObject hero definitions; Warzone2100 goal-based AI maps to lane/objective AI [P1][P2].
17. Dota 2 bot scripts are the closest verified lane/teamfight AI reference for a MOBA: forest0xia/dota2bot-OpenHyperAI (277 stars, MIT LICENSE verified, pushed 2026-04-17 ACTIVE) implements: deterministic position 1-5 lane assignment, per-mode state machines (farm/push/defend/roam), item-purchase state machine, ability/item usage per hero, gank + tower push + jungle + Roshan behaviors, FretBots difficulty mode (unfair bonuses scaling with difficulty, i.e. the SC2-style handicap dial verified in the prior AI angle [P3]), and offline/LAN play. Verdict: learn-from as the AI architecture spec; code is Lua for Valve's bot API and cannot be reused directly [S19].
18. Valve's official Dota 2 Bot Scripting wiki page: fetch blocked (Anubis proof-of-work on direct fetch) and 404 via Jina reader at access date. [UNVERIFIED-fetch-blocked] The practical primary source is the bot Lua scripts shipped inside the Dota 2 install (referenced by OpenHyperAI's project structure) [S20].
19. SC2 bot frameworks (strategy/micro AI ideas only): BurnySc2/python-sc2 (631 stars, MIT, pushed 2026-04-25 ACTIVE; the maintained fork of Dentosal/python-sc2, 590 stars, MIT, 2022), google-deepmind/pysc2 (8,304 stars, Apache-2.0, pushed 2024-07-23, NOT archived - the SC2 Learning Environment), sharknice/Sharky (45 stars, NO license, 2026-05-29 ACTIVE, C#), AresSC2/ares-sc2 (39 stars, MIT, 2026-08-11 ACTIVE). Verdict: learn-from for army control/strategy layering; python-sc2/ares-sc2 MIT are the permissive ones; Sharky unlicensed [S16][S17][S18].
20. AoE2 AI: only small tooling OSS exists (FLWL/aoe2-ai-module, 22 stars, LGPL-2.1, 2021 stale; Jvinniec/aoe2-aiscript, 13 stars, GPL-3.0, 2022). The gameplay AI itself is AoE2 DE's proprietary in-game scripting; the "extreme difficulty honesty" question was already covered in the prior AI angle (playbook.md:420). Verdict: no new OSS value; do not chase [S21][P3].
21. project.storm: dead lead. No public repo exists under any project-storm name; web search shows only unrelated projects (Starbreeze's cancelled co-op shooter STORM; a weather-prediction repo ngone8lo/Project-Storm). Blizzard's cancelled StarCraft shooter ("Ares", cancelled 2019) never shipped public code. Abstention: do not chase [S22].
22. A* Pathfinding Project Pro: USD 140 (sale USD 70 at access, per AssetFigures, lowest-ever 2026-06-11), latest release 2026-01-22 (active), by Aron Granberg; prior dossier already verified it as the RTS pathfinding choice [P5]. MOBA relevance: seeker + flow fields handle minion waves/hordes; free alternatives (Unity AI Navigation + hand-rolled grid A*) remain viable for smaller unit counts. Verdict: buy (when on sale) or free alternative [S23].
23. Behavior Designer: USD 95 (latest release 2026-06-23, active); Behavior Designer Pro 3 (DOTS) USD 79.75-159.50. Prior AI angle priced it at $90 and flagged the free alternatives: KiwiCoder repo is dead (playbook.md:421) and hand-rolled BTs (MinaPecheux pattern) work; new this pass: MIT behavior-tree modules exist inside UnityStarter [S11] and Flexi [S12]. Verdict: buy optional; free MIT alternative now exists [S24][P3][P4].
24. GOAP: luxkun/ReGoap, 1,108 stars, Apache-2.0 (LICENSE verified), pushed 2026-04-21 (ACTIVE) - the prior "sleg/ReGoap" 404s because the repo moved to luxkun. Verdict: reuse with attribution; the only actively-maintained free GOAP for Unity [S25].
25. LeanPool: FREE on the Asset Store (v2.0.2 released 2023-10-12; docs v2.1.0 at carloswilkes.com); the GitHub repo 404s (removed). Slow cadence but a tiny, stable pooling asset; free alternative: Unity's ObjectPool<T> or ~50 hand-written lines. Verdict: free, fine to use [S26].
26. DOTween: free for commercial use under a custom Demigiant license (verbatim redistribution allowed, redistribution of modified copies not allowed), repo pushed 2026-07-26 (ACTIVE). Verdict: use for movement/UI tweens; keep modifications local [S27].
27. UI for shop/HUD: Unity 6.0 official manual (built 2026-08-13) recommends uGUI (Unity UI) as the runtime system with UI Toolkit as the alternative; UI Toolkit is the recommended editor system and wins on data binding, textureless UI, advanced layout, RTL/emoji; uGUI wins on world-space UI, custom shaders, in-scene authoring, Timeline integration, serialized events [S28]. MOBA mapping: uGUI for the in-game HUD/shop (battle-tested, world-space minimap possible), UI Toolkit for the ability-editor tooling (Flexi already proves this split [S12]).
28. Cornerstone verdict (DELTA): the MOBA lens does not create a cornerstone, but it rebalances the landscape from the RTS dossier's "one stale MIT candidate" to a component-level "reuse-with-attribution" reality: 3 active MIT GAS frameworks [S10][S11][S12], active MIT LoL-style skill/buff/behavior-tree reference [S2], active MIT Dota 2 lane/teamfight AI reference [S19], active Apache-2.0 GOAP [S25], free active DOTween + free LeanPool [S26][S27], and the buy-or-free A*/Behavior Designer pair [S23][S24]. The build-from-scratch verdict stands for the GAME; individual SYSTEMS can now be reused under MIT/Apache-2.0 with attribution [P1][P2].

## Existing solutions (landscape scan) - verdict table

| Project | Stars | License | Last push | Verdict | Why |
|---|---|---|---|---|---|
| NKGMobaBasedOnET | 1,001 | MIT | 2022-07-03 | learn-from | LoL-style but ET-framework + state-sync multiplayer; stale |
| Legends-Of-Heroes | 915 | MIT | 2026-07-27 | learn-from (active) | Skill/buff/BT architecture; ET client-server out of scope |
| MoBaDemo | 785 | none | 2019-10-12 | AVOID | Unlicensed + dead ~7y |
| exmex/UnityMoba | 445 | none | 2018-12-08 | AVOID | Unlicensed + dead ~8y |
| Boss Room (com.unity.multiplayer.samples.coop) | 1,970 | NOASSERTION | 2026-07-27 | reference-only | Action/ability patterns; multiplayer + license caveat |
| Unity official ARTS/Action RPG sample | - | - | 404 x3 + no store listing | [UNVERIFIED] | Delisted/never-public; abstention |
| EX-GAS (No78Vino) | 834 | MIT | 2026-07-02 | learn-from | GAS port but paid Odin dependency + self-admitted unstable |
| UnityStarter (MaiKuraki) | 810 | MIT (verified) | 2026-08-13 | reuse candidate | GAS+BT+Perception+Projectile modules; 2022.3 LTS + Unity 6; big surface |
| Flexi (PhysaliaStudio) | 243 | MIT | 2026-03-16 | reuse candidate | OOP GAS + node editor; programmer-oriented |
| sjai013 GAS | 1,083 | MIT | archived | learn-from | Author-archived |
| UniversalInventorySystem | 278 | Apache-2.0 | 2024-03-14 | reuse w/ caveat | Permissive, maintained-slow; shop = simple grid anyway |
| ReGoap (luxkun) | 1,108 | Apache-2.0 (verified) | 2026-04-21 | reuse | Active GOAP, permissive |
| OpenHyperAI (Dota 2 bots) | 277 | MIT (verified) | 2026-04-17 | learn-from (AI spec) | Lanes/roles/FSMs/handicaps; Lua, not reusable code |
| python-sc2 (BurnySc2) | 631 | MIT | 2026-04-25 | learn-from | SC2 bot client; AI layering ideas |
| pysc2 (DeepMind) | 8,304 | Apache-2.0 | 2024-07-23 | learn-from | SC2 learning env; stale ~2y, not archived |
| A* Pathfinding Project Pro | - | paid $140 ($70 sale) | 2026-01-22 | buy/free-alt | Active; verified prior |
| Behavior Designer | - | paid $95 | 2026-06-23 | buy optional | Active; free MIT BT now exists (UnityStarter/Flexi) |
| LeanPool | - | free | 2023-10-12 | use | Tiny stable; GitHub gone |
| DOTween | 2,676 | custom-free | 2026-07-26 | use | Free commercial; no modified-redistribution |
| OpenRA / 0 A.D. / Warzone2100 | prior rows | GPL | prior rows | learn-from | Cite prior dossier, not re-verified [P1] |
| project.storm | - | - | - | dead lead | No public code exists [S22] |

## Build vs reuse decisions - please confirm

1. **Component "hero ability system"** - reuse UnityStarter's GAS modules (MIT, active, 2022.3 LTS + Unity 6 verified) / reuse Flexi (MIT, active, smaller) / build from scratch informed by Legends-Of-Heroes + EX-GAS (MIT). Your call: _______
2. **Component "hero/team AI decision-making"** - ReGoap GOAP (Apache-2.0, active, free) + hand-rolled behavior trees (MinaPecheux pattern [P4]) / Behavior Designer ($95, active). Your call: _______
3. **Component "pathfinding"** - A* Pathfinding Project Pro ($140, on sale $70, active) / Unity AI Navigation + hand-rolled grid A* (free). Prior RTS dossier recommended A* for full control [P5]. Your call: _______
4. **Component "shop/inventory UI"** - build on uGUI (Unity 6 runtime recommendation [S28]) / UI Toolkit runtime / reuse UniversalInventorySystem (Apache-2.0, slow-maintained). Your call: _______
5. **Component "tweening + pooling"** - DOTween (free) + LeanPool (free) / hand-rolled (ObjectPool + tween-free). Default: free pair, both verified usable [S26][S27]. Your call: _______

## Cornerstone verdict (Q5 of dispatch)

- **Verdict: unchanged - NO OSS cornerstone; build from scratch in Unity.** No complete, permissive, active Unity MOBA/ARTS engine or template exists (findings 2-8); the RTS dossier's verdict carries over [P1].
- **DELTA vs RTS dossier: the component layer is now reusable, not just learn-from.** The RTS dossier found exactly one stale MIT candidate; this pass verified 3 active MIT GAS frameworks, an active MIT LoL-style project, an active MIT Dota 2 AI reference, and an active Apache-2.0 GOAP (findings 10-12, 17, 24). The MOBA build can reuse permissive code with attribution for hero abilities, AI logic, tweens, and pooling, while the game itself is original.
- **Final learn-from / reuse constellation:**
  - UnityStarter (MIT, active): GAS + BehaviorTree + AIPerception + Projectile modules; adopt modules, not the foundation [S11].
  - Legends-Of-Heroes (MIT, active): ECS skill framework + buff pipeline + behavior-tree AI patterns [S2].
  - OpenHyperAI (MIT, active): the lane/teamfight AI architecture spec (roles, mode FSMs, item FSM, handicap difficulty) [S19].
  - ReGoap (Apache-2.0, active): GOAP planner for goal-driven hero/team decisions [S25].
  - Flexi (MIT, active): ability editor UX + stat/modifier runtime [S12].
  - OpenRA / 0 A.D. / Warzone2100 (GPL, prior rows): trait/data-driven hero definitions + single-player AI design, learn-from only [P1].
  - DOTween + LeanPool + A* Pro (or free alt): utility layer [S23][S26][S27].
  - MinaPecheux/UnityTutorials-RTS (MIT, prior): selection/camera/event patterns carry over from the RTS dossier [P4].
- **License traps:** unlicensed MOBA demos [S3][S4][S7]; Odin Inspector paid dependency in EX-GAS [S10]; Boss Room NOASSERTION (Unity Companion terms) [S8]; DOTween custom license (no modified redistribution) [S27]; GPL engines learn-from-only [P1]; ET-framework repos couple to a Chinese ecosystem [S1][S2].

## Feasibility verdict

- **Can do:** yes
- **Confidence:** HIGH
- **Why:** Every landscape claim above was verified against primary sources (GitHub repo API, raw LICENSE/README, Asset Store/web pages) at access date 2026-08-14, and the component-level reuse pool is materially stronger than the RTS dossier's. The residual uncertainty is architectural (which GAS framework, if any, survives a spike) and version (Unity 2022.3 vs 6), not existence of a path [R2][R3][R4].

## Recommendations for the planning agent (research-only)

1. Keep "build from scratch" as the headline; treat the game as original code with MIT/Apache-2.0 components reused with attribution - do not plan around forking any GPL or unlicensed project [P1][R1].
2. Run a GAS spike in milestone 0: implement one hero ability in UnityStarter, Flexi, and a bare-minimum bespoke system; pick on spike evidence, not stars (R2).
3. Adopt OpenHyperAI's structure as the AI design spec: deterministic role assignment, mode state machines (farm/push/defend/roam -> lane/objective states), purchase/leveling FSMs, and SC2-style handicap difficulty dials [S19][P3].
4. Reuse ReGoap for GOAP-level decisions only if a spike shows it fits the BT layer; do not adopt a full framework when a library-shaped module suffices (R4).
5. Budget one research line-item to re-verify A* Pro pricing and the Unity version pin at purchase time (R6); prices are 2026-08-14 snapshots.
6. The shop/inventory system is small (grid of buyable items); do not over-plan it, and note uGUI is the Unity 6 runtime recommendation for the HUD/shop while UI Toolkit serves the ability editor tooling [S28][S12].
7. Do not chase: Unity's ARTS sample (404 evidence), project.storm (no code exists), or any "MOBA kit" store purchase without a live re-verification (findings 6, 9, 21).

## Open questions for the user

1. Unity version baseline: 2022.3 LTS or Unity 6 (6000.x)? (Affects all references; UnityStarter verified for both [S11].)
2. Paid-asset budget: allowed (Behavior Designer $95, A* Pro $140/sale $70) or free stack only?
3. Framework appetite: adopt an MIT GAS framework (UnityStarter/Flexi) or build a small bespoke ability system?
4. v1 match shape: full 5v5 lanes+roles+teamfights, or a simplified lane brawl (halves the AI scope)?

## Self-critique

- **Did I do my job?** Yes - all 5 dispatch questions answered with primary-source verification; the delta vs the prior dossier is explicit (finding 28) rather than re-run.
- **What might I have missed?** (a) No repo was cloned (research-only boundary): UnityStarter's "works in Unity 6" is badge-verified, not compile-verified; (b) Asset Store negatives (ARTS sample, MOBA kits) rely on websearch + Jina, which the prior dossier flagged as weaker than a logged-in session; (c) the Valve wiki was unreachable (Anubis + 404), so the official Dota 2 bot-API doc claim is [UNVERIFIED-fetch-blocked] and leans on OpenHyperAI; (d) Chinese-doc repos (NKG, Legends-Of-Heroes, EX-GAS) were assessed via README structure, not full doc read; (e) GitHub search is capped at 100 pages of results and per_page=6-8 samples may have missed mid-tail MOBA repos below ~400 stars.
- **What did I assume without evidence?** (a) That EX-GAS's module map and UnityStarter's CycloneGames modules are the same vendor family (both reference "UnityStarter/Assets/ThirdParty/CycloneGames" paths); this does not affect either verdict but should be confirmed before reuse; (b) that Boss Room's NOASSERTION license is the Unity Companion License (not re-read this pass; prior dossier verified ATerribleKingdom has none); (c) that the ARTS/Action RPG sample was ever public on GitHub - the 404s only prove it is not there now.

## Sources

| # | Source | Type | URL | Access date |
|---|---|---|---|---|
| [S1] | NKGMobaBasedOnET repo API + README | primary | https://api.github.com/repos/wqaetly/NKGMobaBasedOnET | 2026-08-14 |
| [S2] | Legends-Of-Heroes repo API + README | primary | https://api.github.com/repos/FlameskyDexive/Legends-Of-Heroes | 2026-08-14 |
| [S3] | MoBaDemo repo API | primary | https://api.github.com/repos/swordjoinmagic/MoBaDemo | 2026-08-14 |
| [S4] | UnityMoba repo API | primary | https://api.github.com/repos/exmex/UnityMoba | 2026-08-14 |
| [S5] | ARTS/ActionRPG candidate 404s (3 repo fetches) | primary (404 evidence) | https://api.github.com/repos/Unity-Technologies/ARTS (404), /UnityTechnologies/ARTS (404), /Unity-Technologies/ActionRPG (404) | 2026-08-14 |
| [S6] | Websearch: Unity official Action RPG sample (negative; only Unity Learn 3D Game Kit surfaced) | web | websearch, 6 results, no official ARPG sample listing | 2026-08-14 |
| [S7] | MOBA tutorial repos API | primary | https://api.github.com/search/repositories?q=moba+unity+tutorial | 2026-08-14 |
| [S8] | Boss Room repo API | primary | https://api.github.com/repos/Unity-Technologies/com.unity.multiplayer.samples.coop | 2026-08-14 |
| [S9] | MOBA kit search: a) GitHub search q=moba+kit; b) websearch MOBA kit store | primary (negative) | https://api.github.com/search/repositories?q=moba+kit ; websearch 5 results | 2026-08-14 |
| [S10] | EX-GAS repo API + master README (Odin dependency, stability admission) | primary | https://api.github.com/repos/No78Vino/gameplay-ability-system-for-unity ; https://raw.githubusercontent.com/No78Vino/gameplay-ability-system-for-unity/master/README.md | 2026-08-14 |
| [S11] | UnityStarter repo API + LICENSE + README (badges, modules, networking status) | primary | https://api.github.com/repos/MaiKuraki/UnityStarter ; https://raw.githubusercontent.com/MaiKuraki/UnityStarter/master/LICENSE ; .../master/README.md | 2026-08-14 |
| [S12] | Flexi repo API + README | primary | https://api.github.com/repos/PhysaliaStudio/Flexi ; raw README | 2026-08-14 |
| [S13] | sjai013 GAS repo API + README (archived notice) | primary | https://api.github.com/repos/sjai013/unity-gameplay-ability-system | 2026-08-14 |
| [S14] | Skill editors API x3 | primary | https://api.github.com/repos/YouwantLee/Joker_Unity_SkillEditor ; /huailiang/seqence ; /jewer3330/plato | 2026-08-14 |
| [S15] | Inventory repos API + README | primary | https://api.github.com/repos/Heymity/UniversalInventorySystem ; /adammyhre/Unity-Inventory-System ; /Cholopol/Cholopol-Tetris-Inventory-System | 2026-08-14 |
| [S16] | python-sc2 forks API | primary | https://api.github.com/repos/BurnySc2/python-sc2 ; /Dentosal/python-sc2 | 2026-08-14 |
| [S17] | pysc2 repo API | primary | https://api.github.com/repos/google-deepmind/pysc2 | 2026-08-14 |
| [S18] | Sharky + ares-sc2 repo API | primary | https://api.github.com/repos/sharknice/Sharky ; /AresSC2/ares-sc2 | 2026-08-14 |
| [S19] | OpenHyperAI repo API + README + LICENSE | primary | https://api.github.com/repos/forest0xia/dota2bot-OpenHyperAI ; raw LICENSE | 2026-08-14 |
| [S20] | Valve Dota 2 Bot Scripting wiki (404 via Jina; Anubis on direct) | primary (fetch blocked) | https://developer.valvesoftware.com/wiki/Dota_2_Bot_Scripting via https://r.jina.ai/ | 2026-08-14 |
| [S21] | AoE2 AI repos API | primary | https://api.github.com/repos/FLWL/aoe2-ai-module ; /Jvinniec/aoe2-aiscript | 2026-08-14 |
| [S22] | project.storm websearch (cancelled/ unrelated, no public repo) | web | websearch 4 results; icy-veins + gamepressure | 2026-08-14 |
| [S23] | A* Pathfinding Project Pro store + AssetFigures | product-page | https://assetstore.unity.com/packages/tools/behavior-ai/a-pathfinding-project-pro-87744 ; https://www.assetfigures.com/pack/details/87744/ | 2026-08-14 |
| [S24] | Behavior Designer store (classic $95; Pro 3 DOTS $79.75-159.50) | product-page | https://assetstore.unity.com/packages/tools/behavior-ai/behavior-designer-behavior-trees-for-everyone-15277 ; .../behavior-designer-pro-3-dots-powered-behavior-trees-368344 | 2026-08-14 |
| [S25] | ReGoap repo API + raw LICENSE | primary | https://api.github.com/repos/luxkun/ReGoap ; https://raw.githubusercontent.com/luxkun/ReGoap/master/LICENSE | 2026-08-14 |
| [S26] | LeanPool store page + docs + GitHub 404 | product-page + primary (404) | https://assetstore.unity.com/packages/tools/utilities/lean-pool-35666 ; https://carloswilkes.com/Documentation/LeanPool ; https://api.github.com/repos/carloswilkes/LeanPool (404) | 2026-08-14 |
| [S27] | DOTween repo API + raw LICENSE | primary | https://api.github.com/repos/Demigiant/dotween ; https://raw.githubusercontent.com/Demigiant/dotween/master/LICENSE | 2026-08-14 |
| [S28] | Unity 6.0 Manual: Comparison of UI systems (uGUI recommended for runtime, UI Toolkit for editor) | official-docs | https://docs.unity3d.com/6000.0/Documentation/Manual/UI-system-compare.html | 2026-08-14 |
| [P1] | Prior RTS dossier chapter 03 (cornerstone verdict + OpenRA/0 A.D./Warzone2100/Spring/openage rows + license table) | prior-dossier | research/unity-rts-2026-08-14/03_OPEN_SOURCE_LANDSCAPE.md:5-14,32-34,46-57 | 2026-08-14 |
| [P2] | Prior angle-oss full file (MinaPecheux/ATerribleKingdom/startcraft rows + R1 license risk + caveats) | prior-dossier | share/notes/01_research_T-2026-08-14-002_angle-oss.md:17-58,121-126 | 2026-08-14 |
| [P3] | Prior angle-ai (AoE2 extreme-AI honesty dispute; KiwiCoder repo dead; SC2 handicap-dial model) | prior-dossier | agents_manager/memory/projects/research-space/playbook.md:418-421 | 2026-08-14 |
| [P4] | Prior angle-ai build-vs-buy row (hand-rolled BT beats stale assets; UnityTutorials-RTS pattern) | prior-dossier | agents_manager/memory/projects/research-space/playbook.md:421 | 2026-08-14 |
| [P5] | Prior dossier pathfinding rows (A* Pathfinding Project verified; movement abstraction) | prior-dossier | agents_manager/memory/projects/research-space/playbook.md:484-487 | 2026-08-14 |

## Metrics

findings: 28
risks_HIGH: 1
risks_MEDIUM: 3
risks_LOW: 2
clarifying_Qs: 4
