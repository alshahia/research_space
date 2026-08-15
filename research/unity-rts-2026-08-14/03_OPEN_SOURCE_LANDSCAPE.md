# 03 - Open Source Landscape and Cornerstone Verdict

Source: angle-oss research (20 findings, 20 sources, 18 projects verified). Verdict: feasible, HIGH confidence.

## Cornerstone verdict

**There is no OSS cornerstone for this project.** No permissively-licensed, actively-maintained, complete Unity RTS engine exists. Every Unity OSS RTS falls into one of four buckets: GPL, unlicensed, MIT-but-unmaintained-and-render-pipeline-incompatible, or multiplayer/lockstep-focused.

**Recommendation: build from scratch in Unity**, informed by a learn-from constellation:
- **MinaPecheux/UnityTutorials-RTS** (MIT, 725 stars) - the ONLY safe code-reuse candidate (single-player mechanics: buildings, UI, resources, selection, SO data, camera, event system). Code is 2021-22, Unity 2020.3.18f1; pin 2022 LTS or treat read-only.
- **OpenRA** (GPL-3.0, C#, 17,226 stars, active) - architecture reference: trait composition, data-driven definitions (map onto ScriptableObjects/components).
- **0 A.D.** (GPL-2.0, C++, active) - "ancient RTS" reference if that theme is literal.
- **Warzone2100** (GPL-2.0, C++, active today) - best single-player AI reference.
- **ATerribleKingdom** (official Unity sample, 849 stars, no LICENSE, 2019.4) - learn-from: small RTS on Timeline + NavMesh + Cinemachine.

## Verified project table (18 rows)

| Project | Stars | License | Last push / engine | Verdict |
|---|---|---|---|---|
| ATerribleKingdom (UnityTechnologies) | 849 | NO LICENSE | 2020-10-04 / 2019.4.1f1 | learn-from (no reuse) |
| MinaPecheux/UnityTutorials-RTS | 725 | MIT | 2025-09-09 (code 2021-22) / 2020.3.18f1 | ONLY SAFE REUSE candidate |
| startcraft-unity3d (coconauts) | 703 | GPL-3.0 | 2025-09-12 / 2020.3.12f1 | learn-from, no reuse (trademark/IP caution) |
| stormtek/unity-rts-demo | 425 | no license | 2020-09-30 / 3.x-4.x | reference-only |
| LittleBee (dudu502) | 577 | NOASSERTION | 2024-09-12 | reference-only (lockstep/network, ECS) |
| chromealex/ecs | 561 | unverified | - | reference-only (network rollback) |
| skhamis/Unity-ECS-RTS | 240 | no license | 2019-05-02 | AVOID (dead 7y) |
| WarKingdoms (skyteks) | 240 | no license | 2023-12-08 / 2021.3.4f1 | reference-only |
| LockstepRTSEngine (mrdav30) | 183 | unverified | 2026-08-06 ACTIVE | reference-only (determinism/multiplayer) |
| projectFieldWarning | 99 | Apache-2.0 | 2022-01-23 | reference-only (stale, small) |
| honnisha/Unity-RTS | 43 | NOASSERTION | pushed 2024-09-05 (updated_at 2026-05 misleading) | AVOID |
| methusalah/OpenRTS | 1,514 | - | 2026-08-12 | Java, NOT Unity, reference-only |
| OpenRA | 17,226 | GPL-3.0 | 2026-08-01 | architecture reference |
| 0 A.D. | 2,823 | GPL-2.0+ | mirror archived 2024-08-20; gitea live 2026-08-12 | reference-only, ancient theme |
| Warzone2100 | 3,909 | GPL-2.0 | 2026-08-14 active | AI reference |
| Spring | 3,963 | GPL-2.0+ | active | Lua + Skirmish AI reference |
| openage | 14,376 | GPL-3.0+ | active | reference-only |
| RTS Engine (mmoniem) | - | - | GitHub 404 + Asset Store 404 | UNVERIFIABLE (abstention gate) |

## Dead leads (verified, do not chase)

- **"OpenRTS"** = methusalah/OpenRTS, a Java project (1,514 stars, active) - NOT Unity.
- **"RTS Engine"** = GitHub 404, Asset Store 404, absent from search - delisted.
- **"Ancient RTS"** = no Unity project exists; closest reference is 0 A.D. (C++).
- **honnisha/Unity-RTS**: updated_at (2026-05) misleading vs pushed_at (2024-09) - use pushed_at for activity judgment.

## License risk table

| Risk | Severity | Mitigation |
|---|---|---|
| License contamination (GPL/unlicensed copying = legal exposure) | HIGH | Strict learn-from-only for all GPL/unlicensed repos; ONLY MIT code adapted, with attribution |
| Ecosystem staleness (all Unity candidates 2019-2021 era; render-pipeline migration work) | MEDIUM | Pin Unity version early; budget porting |
| No verified commercial template (RTS Engine delisted) | MEDIUM | Build from scratch with realistic scope; re-verify any purchase at buy time |
| Architecture translation (OpenRA/0 A.D. patterns don't map 1:1) | MEDIUM | Adopt proven ideas in Unity idioms only |
| GitHub metadata traps | LOW | Use pushed_at, not updated_at |
| "Ancient RTS" naming ambiguity | LOW | Confirm theme with user (07) |

Verified license facts (primary): ATerribleKingdom has NO LICENSE file (root listing); Spring GPL-2.0-or-later (raw LICENSE); openage GPL-3.0-or-later (raw copying.md); 0 A.D. LICENSE.txt + license_gpl-2.0.txt in mirror root (secondary/high-confidence, header fetch blocked).

## Build-vs-reuse decisions

- **Fork/adapt GPL or unlicensed repos: NO** (legal exposure).
- **Reuse MinaPecheux (MIT):** OK with attribution, pin 2022 LTS or read-only. User decision in 07.
- **Reuse assets from OSS repos: none** without per-asset license verification.
- **Buy a commercial template: no verified option** - re-verify at purchase time.
- **Build from scratch: YES.** First milestone = vertical slice (selection, movement, one unit, one building, one AI opponent, save/load).

## Architecture patterns to borrow (not code)

- OpenRA: trait-style composition + data-driven unit/weapon definitions (JSON or ScriptableObjects).
- Warzone2100 + OpenRA skirmish AI: goal/utility-based opponent design.
- Persistence designed from day one: folder-based versioned save system (JSON/binary).

## Self-critique and gaps

Asset Store search via Jina is weaker than a logged-in session (RTS Engine may exist renamed - re-verify at purchase time). MinaPecheux 2025 push assumed maintenance-only from README, not commit inspection. 0 A.D. license is secondary-sourced. No repo cloned (research-only boundary); ProjectVersion.txt via raw fetch is the strongest available proxy.