# 07 - Open Questions (User Decisions That Gate the Plan)

8 consolidated decisions from the four research angles. All are needed before the plan can lock (Phase 2). None change the verdict (feasible/HIGH), they change HOW.

## 1. Max concurrent units on screen (the biggest architecture fork)

- ~50-200: GameObject + NavMesh/A* + simple BTs. Cheapest.
- ~300-600: A* or flow fields + performance-conscious AI. Recommended middle.
- 5000+: DOTS/ECS day one + flow fields + GPU instancing + GRD. 3-5x dev time.
- Recommendation: start GameObject-based with the movement abstraction; upgrade path documented (P12 evaluates).

## 2. 2D vs 3D presentation

- 3D (URP) with top-down camera is the default assumption of this research; 2D (sprites, tilemap) is simpler for art but changes pathfinding (grid A* on tilemap, NavMeshPlus only 2D) and FoW implementation. Which one?

## 3. Art/audio sourcing

- Free asset packs / purchased packs / programmer-art placeholders. Affects material-atlasing contract (one atlased material per faction) and LOD budget. Placeholder-first is fine for the vertical slice.

## 4. Save semantics (user said "save the result/progress in new folder")

- Mid-match save/load (full game-state DTOs: units, orders, queues, buildings, FoW grid) vs between-match progress only (campaign/unlocks) vs both. Mid-match is more work (P11) but is the standard RTS expectation.
- Note: the "new folder" requirement is satisfied by the deliverable folder (this dossier). For the GAME, saves go to Application.persistentDataPath.

## 5. Unity version

- 6.3 LTS (recommended; current, supported to Dec 2027) vs 2022 LTS (max compatibility with old OSS repos). All research assumes 6.3 LTS + URP.

## 6. Paid AI tools budget

- Behavior Designer (~$90) or NodeCanvas (~$95) vs hand-rolled free (FSM + priority rules + BT, ~1-2 weeks) vs MinaPecheux's free BT. Free is viable for v1.

## 7. Difficulty philosophy

- SC2-style: open handicaps (resource boost, vision) at higher levels. Reliable, verified, easy.
- AoE2-style: honest AI (knowledge/APM only), disputed fairness, harder to balance.
- DDA: adaptive difficulty, cheapest to keep fair. Can combine with either.

## 8. MIT code reuse OK?

- Reuse MinaPecheux/UnityTutorials-RTS code with attribution (MIT) vs learn-from-only (read patterns, write fresh code). Learn-from-only is safest legally but slower.

## Non-questions (resolved by the task)

- Local single-player, no multiplayer, no network: CONFIRMED.
- Unity engine: CONFIRMED.
- Deliverable in a new folder: DONE (research/unity-rts-2026-08-14/).

## How to answer

Reply with numbers (e.g. "1: 300-600, 2: 3D, 3: placeholders, 4: mid-match, 5: 6.3 LTS, 6: free, 7: DDA + SC2, 8: learn-from") or any combination. Then the planning agent locks the plan.