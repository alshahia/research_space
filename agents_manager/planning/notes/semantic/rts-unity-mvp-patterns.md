# Unity RTS build planning patterns (semantic)

Source: T-2026-08-14-002 (Unity RTS, local single-player, 300-600 units).

1. Bundle the research 13-phase MVP roadmap into 6 milestones (foundation / economy+combat / FoW+UI / save / AI / perf); AI is the largest (3-6wk) and perception layer is its FIRST task.
2. Movement abstraction (interface + NavMeshAgent impl) is task #1 of the movement milestone, never retrofit - the NavMesh -> grid A* -> flow fields upgrade must be a swap.
3. Difficulty = ONE governor with dial presets (SC2 handicap / AoE2 honest / DDA = 3 preset groups), not three AI implementations. DDA needs a player-performance metric the AI shell already produces.
4. Save: [Serializable] DTOs + version field + JsonUtility; NO Dictionary (not serializable), NO BinaryFormatter (dead in .NET 9); automated save->reload->equality editor test is the gate.
5. FoW: tile visibility grid is the logic source of truth AND the AI perception input (fairness seam); render-texture is display-only.
6. Conditional techniques (GRD, flow fields, grid A*, WFC, RVO) are gated behind profile evidence collected in the final milestone; proven stack (NavMesh, JsonUtility, render-texture FoW, UI Toolkit) is the default.
7. MinaPecheux/UnityTutorials-RTS (MIT) is the only safe Unity RTS code-reuse candidate; adapt with ATTRIBUTION.md or learn-from only. OpenRA/Warzone2100 are read-only architecture references.
