# 03 - Opponent AI

**Angle:** ai | **Findings:** 14 | **Sources:** S18, S25, S28, S35, S44, S45, S63, S69-S71, S86-S90 | **Verdict:** Hierarchical scripted AI: 3-layer hero brain (macro strategy / tactics / micro execution), lane assignment, lead-prediction + dodge micro, allied AI. No RL, no LLM (ADR 5). Difficulty via honest limits, cheat dials optional per Q6.

---

## 1. Why scripted (and why not RL/LLM)

- OpenAI Five [S35] and the arXiv Dota 2 RL study [S90] prove RL works only with enormous compute; the arXiv 2110.14221 study [S89] reinforces that. We are one developer on a laptop (Q7 budget) - scripted wins on cost and determinism.
- Riot's bot philosophy [S25, S28] is explicitly human-like heuristics, not simulation: behavioral archetypes, staggered reactions, bounded precision. That is a scripted architecture. Copy it.
- LLM-driven bots add latency, nondeterminism, and per-frame cost for no single-player benefit. Explicit non-goal (ADR 5).

## 2. The 3-layer hero brain

Layer 1 - Strategy (macro): goal-selection tree evaluated on a 0.5-1s tick:
- Lane assignment (see 3), objective priority (tower vs minions vs retreat), recall/heal decision, item purchase timing [S63 structure].
- Implement as a small decision tree with utility scoring; not a full GOAP graph (ReGoap [S119] exists if we want it, but the tree is 10x simpler for 5 goals).

Layer 2 - Tactics (combat): re-evaluated on damage/aggro events:
- Target selection: nearest vs lowest-HP vs attacking-ally (minion aggro rules [S36] mirrored for champions).
- Ability use policy: which ability, at what range/health threshold. This is where per-ability dodge rules live if Q12 has channeled/returning abilities.
- Positioning: stay behind minions vs engage when brush [S53] hides approach.

Layer 3 - Micro (execution): per-frame steering:
- Lead-prediction for skillshots: aim at predicted position using projectile travel time and target velocity [S69-S71]; add bounded error (human-like) per Riot [S28].
- Dodge: perpendicular offset from incoming skillshot line when within reaction window; reaction window = difficulty dial.
- Movement: steering on NavMesh result path [S20] to avoid Unity 6 jitter [S86, S87]; use SetDestination [S21] only for long-distance waypoints.

## 3. Lane assignment and wave management

- Pre-match: assign bots to lanes (Dota 2 bot lane-assignment logic [S63] is the model). Options per Q4: symmetric 1-1-1-2 duo, 1-1-1-1-1 jungler, or MLBB asymmetric Gold/EXP lanes [S58 vs S59 - adjudicated: pick one source if asymmetric wins].
- In-match: lane swap decision = strategic goal in layer 1 (rotate when tower falls, when pushed).
- Bots should respect wave management (freeze/push) at higher difficulties only; MVP bots just push (07 P7 gate).

## 4. Allied AI

- Allied bots run the same brain with friendly targeting (no dodge vs own team).
- The player should feel like the carry: allied bots defer last-hits in the player's lane (Riot's archetype system [S25] supports this via per-bot behavioral tags).
- Simplify: 4 allied bots share one brain instance with per-bot parameter overrides (archetype, aggression, lane); no per-bot independent trees at MVP.

## 5. Difficulty dials (Q6)

- Dota 2's named tiers [S63] (Passive/Easy/Medium/Hard/Unfair) are the proven shape; LoL's Co-op vs AI tiers [S44, S45] the same.
- Two philosophies, Q6 decides: cheat dials (bonus gold/XP, vision reveals - used by LoL bots at higher tiers) vs honest limits (reaction time, scan rate, prediction error - Riot's human-like approach [S25, S28]).
- Recommendation: honest limits as the base curve, with an optional "merciless" tier that adds a small cheat dial. Both are parameter sets on the same brain; no architecture fork.

## 6. What NOT to do

- No ML-Agents training at MVP (compute, nondeterminism; revisit only if scripted bots prove unfun - see 08 Q6 note).
- No LLM calls per frame or per decision (cost + latency + nondeterminism).
- No full GOAP at MVP (a tree covers 5 goals; ReGoap [S119] only if the goal count explodes).
- No separate per-bot brains (parameter overrides on shared brain; 14 findings, not 140).

## 7. Risks

- HIGH: Bots that feel unfair or dumb kill the game; mitigate with the difficulty dial work in P7 gate and the honest-limits default.
- MEDIUM: Lead-prediction math [S69-S71] is the most error-prone code in the AI; unit-test the aim solver standalone before integrating (07 P7 gate includes a bot duel test scene).
- MEDIUM: Unity 6 NavMesh jitter [S86, S87] can ship as "bot wobble" - avoid via steering-on-path [S20].
- LOW: Difficulty tier names/curves copied from LoL/Dota may not fit our match length (Q3); treat tiers as tunables, not constants.