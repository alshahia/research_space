# 02 - Opponent AI (Local Single-Player)

Source: angle-ai research (26 findings, 29 sources). Verdict: feasible, HIGH confidence. "What to use": hand-authored hierarchical AI. "What to avoid": RL whole-opponent, LLM at runtime, dead components.

## The proven shape: layered hierarchical AI

Strategy + tactical + reactive layers. Evidence:
- TStarBot2's hard-coded rules beat all 10 SC2 built-in AI levels including the cheating ones.
- UAlbertaBot (scripted + search) reached SC2 Grandmaster rank 19 NA.
- Academic survey (Ontanon 2013): hierarchy + scripting is the dominant proven approach.

Per-layer tick rates (coroutines; `yield return null` does not allocate; cache WaitForSeconds):
- Strategy: 0.5-2s (build orders, economy, army goals)
- Tactical: 0.1-0.3s (targeting, engagement/retreat, formation moves)
- Reactive: per-frame or event-driven (C# events/UnityEvents: building completed, attack received)

## The single most important decision: perception layer FIRST

The AI reads the game through its OWN perception view-model (seen positions, last-seen timestamps, threat map), fed by the SAME fog-of-war-restricted data as the player. This is the architectural seam that makes fairness enforceable: the AI cannot see what the player has hidden. Test: AI cannot see a unit hidden in the fog.

## System-by-system (9-system checklist, coder-executable)

1. **Perception system** - AI-only view model fed by shared FoW; test AI cannot see FoW-hidden unit.
2. **Build-order engine** - data-driven steps (ScriptableObjects/JSON, not recompiled code); condition -> action timeline; branching (expand vs rush).
3. **Economy manager** - worker allocation + saturation + spend priorities + bank-vs-spend threshold. Tuning note: ~16 workers/8-patch base efficient, 24 = full saturation (community rule of thumb, not verified primary).
4. **Production/army manager** - unit goals with utility scoring vs counters + rally points.
5. **Tactical/combat manager** - target selection, engagement/retreat thresholds, formation moves.
6. **Scouting manager** - patrol points, expansion detection, enemy last-known push.
7. **Attack scheduler** - wave timers + strength thresholds + optional scripted rush + multi-prong.
8. **Difficulty governor** - handicap dials + optional DDA, reads player-performance metric (win rate, econ lead, APM).
9. **Integration shell** - coroutine ticks with cached yields, event hooks, decision logging + Gizmos, zero per-frame allocations. Debug tooling is part of the AI build; budget it as a task, not a nicety.

## Difficulty: handicap dials (three verified philosophies)

- **SC2-style (verified):** levels 8-10 cheat openly (full vision + resource boost); Insane = extra mining + awareness. Dials: resource multiplier, reaction/latency, vision flag.
- **AoE2-style "honest AI" (disputed):** AoE2 DE extreme AI claims no resource cheat, only knowledge + infinite APM; players dispute hidden resources.
- **DDA (dynamic difficulty adjustment, verified/cheap):** measure player performance, nudge handicap every N minutes, no ML. MOBA study: players' PERCEPTION of difficulty matters more than raw adaptation.

Pick one philosophy as a user decision (07). AlphaStar's APM limit shows fairness constraints matter even for superhuman AI.

## Technique selection for AI components

| Technique | Use for | Unity options | Verdict |
|---|---|---|---|
| FSM | unit micro (idle/move/attack/harvest) | hand-rolled | Use (weak at strategy: state explosion) |
| Behavior trees | unit/commander behavior | Behavior Designer ($, active), NodeCanvas ($, active), hand-rolled, MinaPecheux free | Use |
| GOAP | worker/build logic (emergent sequences) | ReGoap (free, license verify), hand-rolled ~1wk | Optional v2 |
| HTN | build orders (task decomposition) | hand-rolled; free chapter Game AI Pro 1 Ch.12 | Optional v2 |
| Utility AI | army composition, target selection | hand-rolled consideration curves | Use, pairs with BT |
| Game-tree search | combat micro | hybrid with scripted (Game AI Pro 3 Ch.14) | Skip v1 |
| RL | whole opponent | ML-Agents: training Mono-only (no IL2CPP); AlphaStar-scale infra beyond solo dev | No for v1; at most one micro-behavior post-v1 experiment |
| LLM opponent | whole opponent | SEMA/PLAP/TowerMind research: latency + inference needs violate no-network, below-human quality | Monitor, do not adopt |

The scripted version IS the baseline product. No planner before the scripted version works.

## What to avoid (verified dead or wrong-tool)

- RL whole-opponent; LLM-at-runtime (latency + network)
- Dead/unverified components: TheKiwiCoder BehaviourTree (repo 404), Panda BT (unreachable), ReGoap (license unstated - verify before commercial use)
- Cheating-by-vision on normal difficulties
- Planners (GOAP/HTN) before the scripted version works

## Free verified literature (spec source)

- Game AI Pro Vol 1: Ch4 behavior selection, Ch5 structural architecture, Ch9/10 utility, Ch12 HTN, Ch26 tactical position, Ch29 Killzone 3 hierarchical AI (gameaipro.com, free)
- Game AI Pro Vol 3: Ch9 BT pitfalls, Ch12 FSM, Ch13 utility, Ch14 scripted+game-tree hybrid
- arXiv: TStarBots 1809.07193; AlphaStar nature.com/articles/s41586-019-1724-z; DDA 1706.02796, 2007.07220, 2408.06818; AI survey 2111.07631; RL survey 1912.10944

## Reference codebases

- MinaPecheux/UnityTutorials-RTS (free, includes a BT, Unity 2020.3, unmaintained - learn-from, not fork)
- davechurchill/ualbertabot (MIT, unmaintained since 2021 - read for build-order/economy logic)
- TStarBots (research code 2018 - read for layered design)
- Warzone2100 (GPL-2.0, active, best single-player AI reference - read-only)

## Coordination notes for planning

- AI issues MOVE ORDERS only through the shared command pipeline (01).
- Perception reads the SAME FoW grid (01); ownership shared with core.
- Unit-count scale (07) changes AI cost (tens: cheap A* + simple BTs; 300-600: flow-field pathfinding + performance-critical AI).
- AI core must be swappable behind an interface (ML-Agents inference constraint).

## User needs from the agent

(a) AI spec (this chapter), (b) verified free literature links, (c) working reference codebase (learn-from, not fork), (d) explicit non-goals: no RL, no LLM, no network.