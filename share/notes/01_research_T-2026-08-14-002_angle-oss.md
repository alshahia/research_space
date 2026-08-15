# 01_research_T-2026-08-14-002_angle-oss.md

- Task: T-2026-08-14-002
- Phase: 1 (research)
- Angle: oss
- Agent: am-research
- Date: 2026-08-14
- Status: complete
- Reuses: playbook methodology only (verdict-table structure + [Sn] citation discipline from prior dossiers, e.g. T-2026-08-13-003 angle B/F); no prior topic-specific research matched this task.

## Task in one sentence

Research the open-source Unity RTS landscape (projects + learning materials) to determine whether any existing OSS project can serve as a foundation or must simply be learned from, for a single-player (user vs AI, no multiplayer/network) Unity RTS game that saves progress to a folder, per the dispatch.

## What we know for sure

- No permissively-licensed, actively maintained, complete Unity RTS engine exists. Every verified candidate falls into one of four buckets: GPL-licensed (startcraft-unity3d), unlicensed (ATerribleKingdom, stormtek/unity-rts-demo, WarKingdoms, Unity-ECS-RTS), MIT but explicitly unmaintained and render-pipeline-incompatible (MinaPecheux/UnityTutorials-RTS), or multiplayer/lockstep/network-focused (LittleBee, chromealex/ecs, LockstepRTSEngine).
- All Unity candidates are old-engine: newest verified ProjectSettings versions are 2019.4.1f1 (ATerribleKingdom), 2020.3.18f1 (MinaPecheux), 2020.3.12f1 (startcraft), 2021.3.4f1 (WarKingdoms). None is Unity 6 compatible out of the box.
- Dispatch-named leads verified dead or wrong: "OpenRTS" (OpenRTS/OpenRTS and bsneeze/OpenRTS) does not exist; the real OpenRTS is methusalah/OpenRTS, a 1,514-star Java engine (active, pushed 2026-08-12), not Unity. "RTS Engine" (mmoniem/RTS-Engine): GitHub repo 404, Asset Store page 404, absent from Asset Store search results -> treated as delisted/unverifiable. "Ancient RTS (GitHub unity-oss)": no Unity project of that name exists; the closest ancient-theme RTS is 0 A.D. (C++, not Unity).
- The mature, active OSS RTS engines (OpenRA C#, 0 A.D. C++, Warzone2100 C++, Spring C++, openage Python/C++) are all GPL-family and non-Unity, but are the best architecture and AI references available.
- User requirement carried in the dispatch: the game must save progress to a new folder (persistence). This is a build-phase requirement, noted here for the planning agent.
- License facts verified from primary sources on access date 2026-08-14: ATerribleKingdom has NO LICENSE file (root listing shows only .gitignore/.vscode/Assets/Logs/Packages/ProjectSettings/README.md); Spring is GPL-2.0-or-later (raw LICENSE chain); openage is GPL-3.0-or-later (raw copying.md, lowercase - my first uppercase fetch 404'd); 0 A.D. mirror root lists LICENSE.txt + license_gpl-2.0.txt.

## What we don't know (and clarifying questions)

1. Target Unity version: 2022 LTS vs Unity 6. All OSS references predate Unity 6; this decides how much porting is needed.
2. Whether the user accepts direct code reuse from MIT sources with attribution, or strictly wants learn-from-only. Only MinaPecheux/UnityTutorials-RTS qualifies for reuse.
3. Art direction: is "ancient RTS" literal (0 A.D. becomes the closest design reference) or generic medieval/fantasy?
4. Scope of the first milestone (vertical slice vs full game) - affects which references matter most.

## Risks and doubts

| # | Severity | Risk | Mitigation |
|---|---|---|---|
| R1 | HIGH | License contamination: most mature/active OSS RTS is GPL (startcraft, OpenRA, 0 A.D., Spring, openage, Warzone2100) or unlicensed (ATerribleKingdom is an official Unity demo repo with NO LICENSE file). Copying code from these into a proprietary game is legal exposure. | Strict learn-from-only policy for all non-MIT projects; only MIT code (MinaPecheux) may be adapted, with attribution; code written from scratch. |
| R2 | MEDIUM | Ecosystem staleness: all permissive Unity candidates are 2019-2021 engine era; render-pipeline migration (built-in RP -> URP/Unity 6) is real work, routinely underestimated. | Pin the chosen Unity version early; budget porting for any reused pattern; verify each reference opens cleanly in the chosen version before planning around it. |
| R3 | MEDIUM | No verified commercial Unity RTS template exists (RTS Engine delisted). If the plan assumed "buy a foundation", that path is closed. | Plan build-from-scratch with a realistic scope; if a paid template is still wanted, re-verify at purchase time. |
| R4 | MEDIUM | Architecture-translation risk: OpenRA/0 A.D. patterns (trait composition, data-driven defs) do not map 1:1 onto Unity components; over-copying non-Unity patterns can slow development. | Adopt only the proven ideas (data-driven unit defs, behavior trees) and implement them in Unity idioms (ScriptableObjects/components). |
| R5 | LOW | GitHub metadata can mislead: honnisha/Unity-RTS shows updated_at 2026-05-07 but pushed_at 2024-09-05 (code stale ~2y). Time heuristics must use pushed_at. | Use pushed_at for all activity judgments; this report does. |
| R6 | LOW | "Ancient RTS" naming ambiguity: if the user meant a specific project, scope may mismatch. | Clarify with the user (Q3). |

## Technical findings

- [S1] ATerribleKingdom (UnityTechnologies): 849 stars, last push 2020-10-04 (~5.8y stale), Unity 2019.4.1f1 (ProjectSettings/ProjectVersion.txt verified). Root listing confirms NO LICENSE file - official Unity demo, unlicensed. Verdict: learn-from (architecture/flow reference only). Sources: https://api.github.com/repos/UnityTechnologies/ATerribleKingdom ; https://raw.githubusercontent.com/UnityTechnologies/ATerribleKingdom/master/ProjectSettings/ProjectVersion.txt
- [S2] MinaPecheux/UnityTutorials-RTS: 725 stars, MIT, 138 commits, Unity 2020.3.18f1, pushed 2025-09-09. README states UNMAINTAINED and not compatible with newer render pipelines. 41-tutorial series (Mar 2021 - Mar 2022) covering single-player mechanics: selection, fog of war, behavior trees, event system, scripting. Verdict: learn-from - the ONLY safe code-reuse candidate. Source: https://api.github.com/repos/MinaPecheux/UnityTutorials-RTS
- [S3] coconauts/startcraft-unity3d: 703 stars, GPL-3.0, Unity 2020.3.12f1, pushed 2025-09-12 (recent maintenance). StarCraft-inspired; trademark/IP caution on top of GPL. Verdict: learn-from for systems, no code reuse. Source: https://api.github.com/repos/coconauts/startcraft-unity3d
- [S4] stormtek/unity-rts-demo: 425 stars, no license, 2012-era Unity 3.x/4.x demo, pushed 2020-09-30. Verdict: reference-only (ancient code). Source: https://api.github.com/repos/stormtek/unity-rts-demo
- [S5] dudu502/LittleBee: 577 stars, license NOASSERTION, ECS + lockstep + network, pushed 2024-09-12. Multiplayer focus -> out of scope. Verdict: reference-only (ECS/lockstep ideas). Source: https://api.github.com/repos/dudu502/LittleBee
- [S6] chromealex/ecs: 561 stars, network rollback ECS framework. Multiplayer focus -> out of scope. Verdict: reference-only; license unverified. Source: https://api.github.com/repos/chromealex/ecs
- [S7] skhamis/Unity-ECS-RTS: 240 stars, no license, pushed 2019-05-02 (dead ~7y). Verdict: avoid. Source: https://api.github.com/repos/skhamis/Unity-ECS-RTS
- [S8] skyteks/WarKingdoms: 240 stars, no license, Unity 2021.3.4f1, pushed 2023-12-08. WC3-style prototype. Verdict: reference-only (no license blocks reuse). Source: https://api.github.com/repos/skyteks/WarKingdoms
- [S9] mrdav30/LockstepRTSEngine: 183 stars, pushed 2026-08-06 (ACTIVE). Deterministic lockstep engine - multiplayer/determinism focus; single-player does not need lockstep. Verdict: reference-only. Source: https://api.github.com/repos/mrdav30/LockstepRTSEngine
- [S10] FieldWarning/projectFieldWarning: 99 stars, Apache-2.0 (permissive), pushed 2022-01-23 (stale 4.5y). Community WWII RTS. Verdict: reference-only (stale, small). Source: https://api.github.com/repos/FieldWarning/projectFieldWarning
- [S11] honnisha/Unity-RTS: 43 stars, NOASSERTION, pushed_at 2024-09-05 (stale ~2y) despite updated_at 2026-05-07. Multiplayer medieval 3D RTS. Verdict: avoid (no license, stale, multiplayer). Source: https://api.github.com/repos/honnisha/Unity-RTS
- [S12] methusalah/OpenRTS: 1,514 stars, Java (NOT Unity), pushed 2026-08-12 (active). The real "OpenRTS"; the dispatch-named OpenRTS/OpenRTS and bsneeze/OpenRTS return 404. Verdict: reference-only (non-Unity architecture ideas). Sources: https://api.github.com/repos/methusalah/OpenRTS
- [S13] "RTS Engine" (mmoniem): GitHub repo mmoniem/RTS-Engine 404; Asset Store page https://assetstore.unity.com/packages/templates/systems/rts-engine-121344 404 (via Jina); store search "rts engine" shows no such listing; the mmoniem GitHub account is a fresh re-registration (user id 178495272, only a swot fork). Verdict: unverifiable/delisted - abstention gate applied. Sources: https://r.jina.ai/https://assetstore.unity.com/packages/templates/systems/rts-engine-121344
- [S14] "Ancient RTS" on GitHub: GitHub search "ancient rts" returns no Unity project of that name (closest: AncientCityBuilder 1 star dead 2020; AncientWar 30 stars HTML5; foda 133 stars JS). Verdict: unverifiable naming; closest ancient-theme reference is 0 A.D. [S16]. Abstention gate applied.
- [S15] OpenRA/OpenRA: 17,226 stars, GPL-3.0, C#, pushed 2026-08-01 (active). Trait-based entity system, Mod SDK, skirmish AI, deterministic lockstep. Best C# architecture reference. Verdict: reference-only (GPL blocks code reuse in proprietary). Source: https://api.github.com/repos/OpenRA/OpenRA
- [S16] 0 A.D.: 2,823 stars on GitHub mirror, mirror archived 2024-08-20; live at https://gitea.wildfiregames.com/0ad/0ad (commits through 2026-08-12 verified via Jina; gitea is Anubis bot-protected). Mirror root lists LICENSE.txt + license_gpl-2.0.txt -> GPL-2.0 component (LICENSE.txt header fetch blocked; license marked secondary/high-confidence). Ancient-theme RTS, C++. Verdict: reference-only. Sources: https://api.github.com/repos/0ad/0ad ; https://gitea.wildfiregames.com/0ad/0ad
- [S17] spring/spring: 3,963 stars, GPL-2.0-or-later (raw LICENSE chain verified: LICENSE -> "see LICENSE" -> GPL v2 or later), pushed 2024-03-31 on GitHub (issues moved to springrts.com/mantis). Lua gameplay, Skirmish AI interface. Verdict: reference-only (AI architecture). Sources: https://api.github.com/repos/spring/spring ; https://raw.githubusercontent.com/spring/spring/develop/LICENSE
- [S18] Warzone2100/warzone2100: 3,909 stars, GPL-2.0, C++, pushed 2026-08-14 (active today). Single-player AI focus, research tree, JS scripting. Verdict: reference-only (best single-player AI design reference). Source: https://api.github.com/repos/Warzone2100/warzone2100
- [S19] SFTtech/openage: 14,376 stars, pushed 2026-07-04 (active), Python/C++. GPL-3.0-or-later verified via raw copying.md (lowercase - my first uppercase COPYING.md fetch 404'd). Verdict: reference-only. Source: https://raw.githubusercontent.com/SFTtech/openage/master/copying.md
- [S20] Learning content (secondary): unitycodemonkey.com They-Are-Billions-style RTS free video series (unit selection, flow-field pathfinding, fog of war, building placement, resource manager, zombie AI); paid GameDev.tv "Unity Real Time Strategy" course on Unity 6 (secondary, unverified detail - verify before purchase). Sources: https://unitycodemonkey.com/howtomakegame.php?i=theyarebillions ; GameDev.tv listing

## Existing solutions verdict table

| Project | Stars | License | Last push | Unity version | Verdict | Why |
|---|---|---|---|---|---|---|
| ATerribleKingdom | 849 | none (no LICENSE file) | 2020-10-04 | 2019.4.1f1 | learn-from | Official Unity demo, strong architecture reference; unlicensed + stale -> no code reuse |
| MinaPecheux/UnityTutorials-RTS | 725 | MIT | 2025-09-09 (code 2021-22, unmaintained) | 2020.3.18f1 | learn-from (only safe reuse) | Permissive, complete single-player mechanics; not modern-RP compatible |
| coconauts/startcraft-unity3d | 703 | GPL-3.0 | 2025-09-12 | 2020.3.12f1 | learn-from (no reuse) | Active + recent, but GPL and StarCraft IP |
| stormtek/unity-rts-demo | 425 | none | 2020-09-30 | 3.x/4.x era | reference-only | Ancient (2012-era), no license |
| dudu502/LittleBee | 577 | NOASSERTION | 2024-09-12 | ECS | reference-only | Lockstep/network, multiplayer scope |
| chromealex/ecs | 561 | unverified | (n/a) | ECS | reference-only | Network rollback ECS, multiplayer scope |
| skhamis/Unity-ECS-RTS | 240 | none | 2019-05-02 | ECS | avoid | Dead ~7y, no license |
| skyteks/WarKingdoms | 240 | none | 2023-12-08 | 2021.3.4f1 | reference-only | WC3-style prototype, no license |
| mrdav30/LockstepRTSEngine | 183 | unverified | 2026-08-06 | (n/a) | reference-only | Active but lockstep/determinism (multiplayer) |
| FieldWarning/projectFieldWarning | 99 | Apache-2.0 | 2022-01-23 | (n/a) | reference-only | Permissive but stale + small |
| honnisha/Unity-RTS | 43 | NOASSERTION | 2024-09-05 | (n/a) | avoid | No license, stale, multiplayer |
| methusalah/OpenRTS | 1,514 | (Java) | 2026-08-12 | n/a | reference-only | The real "OpenRTS" - Java, not Unity |
| OpenRA | 17,226 | GPL-3.0 | 2026-08-01 | n/a | reference-only (architecture) | Best C# architecture + AI reference; GPL blocks reuse |
| 0 A.D. | 2,823 | GPL-2.0+ (secondary) | 2026-08-12 (gitea) | n/a | reference-only | Ancient-theme; closest to the "Ancient RTS" hint |
| Warzone2100 | 3,909 | GPL-2.0 | 2026-08-14 | n/a | reference-only (AI) | Single-player AI + research tree ideas |
| Spring | 3,963 | GPL-2.0+ | 2024-03-31 | n/a | reference-only | Lua gameplay + Skirmish AI interface |
| openage | 14,376 | GPL-3.0+ | 2026-07-04 | n/a | reference-only | Active engine, Python/C++ architecture ideas |
| RTS Engine (mmoniem) | - | - | - | - | unverifiable | GitHub 404 + Asset Store 404; delisted |
| "Ancient RTS" (GitHub) | - | - | - | - | unverifiable | No Unity project of that name found |

## Build vs reuse decisions

- Cornerstone: NONE exists. Do not fork or adapt any GPL or unlicensed project into the game.
- Reuse (code): only MinaPecheux/UnityTutorials-RTS (MIT) qualifies, with attribution; requires pinning Unity 2022 LTS (its code targets Unity 2020.3 + built-in RP) or treating it as read-only reference.
- Reuse (assets): none from OSS repos (per-project licenses/CC-BY-SA art require per-asset verification; unlicensed repos give no permission at all).
- Build from scratch: YES - Unity, with architecture inspired by OpenRA trait/data-driven unit definitions (implemented as ScriptableObjects/components, not a port) and AI inspired by Warzone2100/OpenRA skirmish AI + behavior trees (MinaPecheux pattern).
- Buy: no verified commercial Unity RTS template found (RTS Engine delisted). Do not plan a purchase without a re-verification pass at purchase time.

## Feasibility verdict

FEASIBLE with HIGH confidence. Building a single-player Unity RTS from scratch (selection, movement, combat, building, resources, simple AI, save-to-folder) is well-trodden territory, and the OSS landscape provides excellent learning material. The constraint is not feasibility but license discipline: the build must be original code informed by (not copied from) GPL/unlicensed references. Confidence: HIGH (0.8+) on feasibility; MEDIUM that the no-code-reuse rule survives the build phase without enforcement.

## Recommendations for the planning agent

1. Plan a build-from-scratch Unity project. Do NOT plan around forking an OSS engine.
2. If code reuse is wanted, target MinaPecheux/UnityTutorials-RTS (MIT, attribution) pinned to Unity 2022 LTS; otherwise use it as read-only reference. Decide this with the user (open question Q2).
3. Adopt data-driven unit/weapon definitions (JSON or ScriptableObjects) + trait-style composition (OpenRA [S15] pattern) as the unit architecture - it maps cleanly onto Unity components.
4. AI: behavior trees for unit AI (MinaPecheux series [S2]); goal/utility-based opponent decision-making (Warzone2100 [S18] + OpenRA skirmish AI [S15] as design references).
5. Persistence: the user requires saving progress to a new folder - design a folder-based, versioned save system (JSON/binary serialization) from day one; do not bolt it on late.
6. First milestone: vertical slice (selection, movement, one unit type, one building, one AI opponent, save/load) before full scope.
7. Do not spend on RTS Engine or any paid Unity RTS template without re-verifying availability (this pass found it delisted [S13]).
8. Pin the Unity version at planning time (2022 LTS vs Unity 6); all OSS references predate Unity 6 -> budget URP migration work if Unity 6 is chosen [R2].

## Open questions for the user

1. Unity version preference: 2022 LTS or Unity 6?
2. Acceptable to reuse MIT code with attribution, or strictly learn-from-only?
3. Is "ancient RTS" a literal theme (0 A.D. becomes the closest design reference) or generic medieval/fantasy?
4. Free learn-from path sufficient, or is a paid course (GameDev.tv, Unity 6) in budget?

## Self-critique

- The Asset Store search pass used Jina (JS-heavy page); weaker signal than a logged-in store session. RTS Engine may exist under a renamed listing - re-verify at purchase time rather than trusting this negative.
- Activity judgments use pushed_at, but commit-detail nuance (e.g., MinaPecheux's 2025 push being maintenance-only) is inferred from README wording, not commit inspection.
- 0 A.D. license is high-confidence secondary (mirror root listing shows LICENSE.txt + license_gpl-2.0.txt; header fetch blocked by Anubis on gitea and raw 404 on the GitHub mirror main branch).
- chromealex/ecs license unverified - harmless since its verdict (reference-only) does not depend on it.
- No repo was cloned (research-only boundary); ProjectVersion.txt via raw fetch is the strongest proxy for "does it open in Unity" that was available.
- Breadth over depth: 20 findings prioritize the landscape; no repo internals beyond README/API metadata were inspected. Follow-ups (e.g., a deep-dive on MinaPecheux's architecture) belong to the planning phase if reuse is chosen.

## Metrics

- findings_count: 20
- risks_HIGH: 1
- risks_MEDIUM: 3
- risks_LOW: 2
- clarifying_questions: 4

## Sources

| # | What it proves | URL | Access date | Type |
|---|---|---|---|---|
| S1 | ATerribleKingdom metadata, Unity 2019.4.1f1, no LICENSE file | https://api.github.com/repos/UnityTechnologies/ATerribleKingdom ; https://raw.githubusercontent.com/UnityTechnologies/ATerribleKingdom/master/ProjectSettings/ProjectVersion.txt ; root listing via GitHub contents API | 2026-08-14 | primary |
| S2 | MinaPecheux metadata + README (MIT, unmaintained, 41 tutorials) | https://api.github.com/repos/MinaPecheux/UnityTutorials-RTS | 2026-08-14 | primary |
| S3 | startcraft metadata + Unity 2020.3.12f1 | https://api.github.com/repos/coconauts/startcraft-unity3d ; https://raw.githubusercontent.com/coconauts/startcraft-unity3d/master/ProjectSettings/ProjectVersion.txt | 2026-08-14 | primary |
| S4 | stormtek metadata | https://api.github.com/repos/stormtek/unity-rts-demo | 2026-08-14 | primary |
| S5 | LittleBee metadata + license | https://api.github.com/repos/dudu502/LittleBee | 2026-08-14 | primary |
| S6 | chromealex/ecs metadata | https://api.github.com/repos/chromealex/ecs | 2026-08-14 | primary |
| S7 | skhamis metadata | https://api.github.com/repos/skhamis/Unity-ECS-RTS | 2026-08-14 | primary |
| S8 | WarKingdoms metadata + Unity 2021.3.4f1 | https://api.github.com/repos/skyteks/WarKingdoms ; https://raw.githubusercontent.com/skyteks/WarKingdoms/main/ProjectSettings/ProjectVersion.txt | 2026-08-14 | primary |
| S9 | LockstepRTSEngine metadata | https://api.github.com/repos/mrdav30/LockstepRTSEngine | 2026-08-14 | primary |
| S10 | projectFieldWarning metadata + license | https://api.github.com/repos/FieldWarning/projectFieldWarning | 2026-08-14 | primary |
| S11 | honnisha metadata (pushed_at vs updated_at) | https://api.github.com/repos/honnisha/Unity-RTS | 2026-08-14 | primary |
| S12 | methusalah/OpenRTS metadata; OpenRTS/OpenRTS 404 | https://api.github.com/repos/methusalah/OpenRTS | 2026-08-14 | primary |
| S13 | RTS Engine delisted: GitHub 404 + Asset Store 404 + search negative | https://r.jina.ai/https://assetstore.unity.com/packages/templates/systems/rts-engine-121344 ; https://r.jina.ai/https://assetstore.unity.com/search?q=rts%20engine | 2026-08-14 | primary (404 evidence) |
| S14 | "ancient rts" GitHub search - no Unity project | https://github.com/search?q=ancient+rts&type=repositories | 2026-08-14 | primary |
| S15 | OpenRA metadata + README (traits, Mod SDK, skirmish AI) | https://api.github.com/repos/OpenRA/OpenRA | 2026-08-14 | primary |
| S16 | 0 A.D.: mirror archived, gitea live, GPL-2.0 component files | https://api.github.com/repos/0ad/0ad ; https://gitea.wildfiregames.com/0ad/0ad (via Jina) ; mirror root listing | 2026-08-14 | primary (activity), secondary (license header) |
| S17 | Spring metadata + GPL-2.0+ LICENSE chain | https://api.github.com/repos/spring/spring ; https://raw.githubusercontent.com/spring/spring/develop/LICENSE | 2026-08-14 | primary |
| S18 | Warzone2100 metadata + README (AI, research tree) | https://api.github.com/repos/Warzone2100/warzone2100 | 2026-08-14 | primary |
| S19 | openage metadata + GPL-3.0-or-later copying.md | https://raw.githubusercontent.com/SFTtech/openage/master/copying.md | 2026-08-14 | primary |
| S20 | Free video tutorial series (They-Are-Billions-style RTS); paid course listing | https://unitycodemonkey.com/howtomakegame.php?i=theyarebillions ; GameDev.tv RTS course listing | 2026-08-14 | secondary (course detail unverified) |
