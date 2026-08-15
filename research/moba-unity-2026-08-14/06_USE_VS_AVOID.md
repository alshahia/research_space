# 06 - USE vs AVOID (Consolidated Contract)

**Angle:** all | **Purpose:** The single checklist every phase gate in 07 is graded against. One source of truth across 01-05; do not re-derive per chapter.

---

## USE (build these)

| # | Item | Source | Chapter |
|---|---|---|---|
| U1 | LoL minion wave model + aggro rules (3 melee + 3 caster, 30s, aggro-on-ally-attack) | S36 | 01, 02 |
| U2 | LoL turret model (minion-first, amplifying damage) | S38 | 01, 02 |
| U3 | Gold economy: passive + last-hit + bounties | S43 | 02 |
| U4 | Fog of war: view cone + brush hiding | S41, S53, S54, S61 | 02 |
| U5 | XP curve + 3 damage formulas (damage/armor/crit) | S50, S51, S52, S56 | 02 |
| U6 | Input System action maps (keyboard/mouse + Touch) | S2, S3 | 02, 05 |
| U7 | CharacterController for champions | S22 | 02 |
| U8 | Steering-on-NavMesh-result (avoid SetDestination jitter) | S19, S20, S21, S86, S87 | 02, 03 |
| U9 | 3-layer hero brain (macro/tactics/micro) | S25, S28, S63 | 03 |
| U10 | Lead-prediction aim solver with bounded error | S28, S69-S71 | 03 |
| U11 | Dodge micro with reaction window as difficulty dial | S28, S69 | 03 |
| U12 | Difficulty tiers (named, Dota-style) | S63, S44, S45 | 03 |
| U13 | SO ability data + component event bus (ADR 3) | ADR 3 | 02, 05 |
| U14 | Versioned DTO saves (no BinaryFormatter) | ADR 4 | 02 |
| U15 | SRP Batcher + GPU instancing (minion swarms) | S5, S6 | 05 |
| U16 | Object pooling (projectiles/effects) | S15, S120 | 05 |
| U17 | LOD groups | S14, S80 | 05 |
| U18 | Quality tiers (URP assets per tier) | S13, S32 | 02, 05 |
| U19 | Cinemachine camera shake | S11 | 05 |
| U20 | Co-op-vs-AI-shaped mode structure (local only) | S44, S60, S62 | 01 |
| U21 | MIT borrow list: DOTween, LeanPool | S120, S121 | 04 |
| U22 | Match-complete progression save + mid-match checkpoint | Q10 default | 02 |

## AVOID (do NOT build)

| # | Item | Source | Chapter |
|---|---|---|---|
| A1 | Netcode / lockstep / server sim / matchmaking / anti-cheat | ADR 6 | 01 |
| A2 | RL/ML-Agents/LLM bots at MVP | ADR 5, S35, S89, S90 | 03 |
| A3 | Unlicensed repos as base (MoBaDemo, UnityMoba, project.storm, ARTS 404) | S99-S102, S118 | 04 |
| A4 | GPL/copyleft imports (LeagueSandbox) | S96 | 04 |
| A5 | Odin-required frameworks (EX-GAS) | S106 | 04 |
| A6 | BinaryFormatter anywhere | ADR 4 | 02 |
| A7 | DOTS/Burst/Jobs before profiling | S8, S9 | 05 |
| A8 | Addressables at MVP | S7 | 05 |
| A9 | UIToolkit at MVP (uGUI + TMP instead) | S10 | 05 |
| A10 | HDRP | S4 | 05 |
| A11 | Deny mechanics, turn rates, couriers (Dota depth) | S63 | 01 |
| A12 | Roster/rune/meta bloat (LoL scale) | S24 | 01 |
| A13 | Gacha/skin monetization | - | 01 |
| A14 | A* Pro / Behavior Designer purchases before Q7+Q9 | S122, S123 | 04 |
| A15 | Full GOAP at MVP (tree covers 5 goals) | S119 | 03 |
| A16 | MLBB auto-battle assists / auto-pilot | S65 | 01 |
| A17 | Inhibitors/backdoor rules at MVP (defer) | S55 | 02 |
| A18 | Wards as consumables at MVP unless Q11 | S41 | 02 |

## Adjudicated contradictions (reference)

1. Bot queue names: wiki [S44] Intro/Beginner/Intermediate vs Riot [S25] Intro/Beginner/Advanced -> Riot wins (primary), wiki for mechanics.
2. Herald/Baron timings: community 16:00/25:00 vs wiki 14:00/20:00 -> wiki default (14:00/20:00), lock in 07 P2.
3. MLBB duration: ~10 min marketing vs 10-30 Wikipedia -> design target 10-15 min (Q3).
4. MLBB lane naming: S58 vs S59 disagree on Gold/EXP lanes -> Q4 decides; if asymmetric wins, pick one source.
5. WR bot details: partly unverified [S31, S32, S64] -> flag in 99_SOURCES, do not build on them.

## Metrics check (must match canonical summary)

Findings: 129 | Sources: 124 | Risks: 16 (5 HIGH / 7 MEDIUM / 4 LOW) | Clarifying questions: 12