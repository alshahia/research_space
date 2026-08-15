# 05 - New Techniques (Unity 6.x)

**Angle:** guide | **Findings:** 25 | **Sources:** S2-S17, S80, S124 | **Verdict:** Use Unity 6.3 LTS defaults with discipline; the anti-hype guard keeps us on the lazy-but-correct path. Profile first, optimize second.

---

## 1. The stack (all in ADR 1-6)

| Concern | Choice | Source | Notes |
|---|---|---|---|
| Render pipeline | URP | S4 | Built-in fallback OK; NO HDRP (overkill) |
| Input | Input System (keyboard/mouse + Touch maps) | S2, S3 | Q1 decides active maps; both built now |
| UI | uGUI + TextMeshPro | - | UIToolkit only if the UI grows past forms (S10 compare) |
| Camera | Cinemachine (virtual cams, shake) | S11 | Free; standard |
| Cutscenes | Timeline | S12 | Only if intro/outro wanted (skip at MVP) |
| Asset loading | Addressables (optional at MVP) | S7 | YAGNI until build size demands it; fallback: Resources/ folder |
| Performance | Burst/Jobs only when profiled | S8, S9 | ADR 3: NOT by default |
| Framerate | Quality settings tiers | S13 | Match WR discipline (S32) |
| Scalability | LOD + GPU instancing + SRP Batcher | S5, S6, S14, S80 | Minion swarms: instancing is the big win |
| Memory | Object pooling (LeanPool or hand-rolled) | S15 | Projectiles/effects only |

## 2. Techniques with real payoff (ranked)

1. **SRP Batcher + GPU instancing** [S5, S6]: minion swarms (~30-40 units) and projectile VFX collapse to a few draw calls. Do this before anything else on the perf list.
2. **Object pooling** [S15]: projectile/effect churn is the #1 GC spike source in MOBA-likes; pool everything that spawns/despawns faster than 1/sec.
3. **LOD groups** [S14, S80]: far minions at 50% poly; near-field stays detailed. Trivial in URP, big frame-time win on the desktop baseline.
4. **Quality tiers** [S13]: one URP asset per tier (low/med/high); settings screen (02-7) switches at runtime. Cheap and expected.
5. **Input System action maps** [S2, S3]: remapping UI for free; Q1-safe.
6. **Cinemachine** [S11]: camera shake on ability hits is a genre feel requirement; 10 minutes of setup.

## 3. The anti-hype guard (what NOT to adopt now)

- **Burst/Jobs/ECS** [S8, S9]: only if the profiler shows a CPU bottleneck on the hot loop (projectiles + minions + bot steering). At ~70-80 entities, it will not. ADR 3 says: GameObject + MonoBehaviour + SO + event bus. Do not add DOTS "because it scales" - it does not scale what we have.
- **Addressables** [S7]: build size is not a constraint at prototype scale; Resources/ or direct references are simpler. Add Addressables only when the project exceeds ~500MB or ships content updates.
- **UIToolkit** [S10]: uGUI + TMP covers a HUD, shop, settings, and results screen. UIToolkit adds a learning curve for no MVP gain.
- **HDRP**: no (S4 verdict). Volumetric lighting is not a MOBA need.
- **Third-party pathfinding at MVP** (S122): our AI moves along lanes + steering on NavMesh [S20]; A* Pro buys nothing until we add open-field jungle movement with dynamic obstacles (post-MVP).
- **Behavior Designer** [S123]: the 3-layer brain (03) is a tree, not a visual graph; the editor buys nothing at MVP. Revisit if Q7 + Q9 choose paid AI tooling.

## 4. Perf budget (from WR discipline [S32] + mobile guide [S16])

- Frame pacing: 60 fps desktop target; 30 fps floor. Frame-time budget: 16.6ms (12ms game + 4ms render headroom).
- Draw calls: < 300 at baseline (instancing + batcher get us there with room).
- Memory: < 1GB working set (URP default tiers; no HDRP textures).
- GC: zero allocs in per-frame hot paths (pooling [S15] + event bus with pooled event objects; the ADR 3 bus must reuse event instances).
- ADPF [S17]: Android-only tool; skip unless Q1 is Android-first.

## 5. Risks

- MEDIUM: DOTS/Burst adoption before profiling (the classic over-engineer trap) - guarded by ADR 3 and this chapter's ranked list.
- MEDIUM: Addressables refactor debt if adopted at MVP and abandoned (S7) - deferred.
- LOW: UIToolkit/HDRP adoption by "new shiny" instinct (S10) - guarded above.
- LOW: Perf budget written but not measured: 07 P6 gate includes a FrameTiming profiler run against the budget table (numbers in, verdict out).