# Research - T-2026-08-14-002 (angle: ai) - Single-player opponent AI for a local Unity RTS

**Date:** 2026-08-14
**Trigger:** initial (parallel-research dispatch, angle: ai, research-detector tier 3)
**Sub-agent:** research
**Scope boundary:** This angle covers ONLY the opponent AI. Core systems (economy/gameplay architecture), OSS cornerstone evaluation, and use/avoid technique sweep are covered by sibling angles (core, oss, techniques). StarCraft/AoE literature applies CONCEPTUALLY, not as Unity code — flagged inline wherever used.

## Task in one sentence

Research what a local single-player RTS opponent AI needs in Unity (classic architecture, modern techniques, fairness, what to use/avoid, Unity integration, per-system build checklist) so any agent can implement it.

> **Reuses:** `agents_manager/memory/projects/research-space/playbook.md` (read hook done; no prior Unity/RTS output exists — reuse=0 confirmed by master, so no content reuse, only discipline reuse): numbered `[Sn]` citation style + sources table + per-risk severity from the T-2026-08-13-003 angle-A/B entries; license-stance rules (rules.md rule 15) applied to every OSS candidate. Methodological moves reused: claim-by-claim verification (Cloudflare synthesis pattern), abstention gate on unverifiable claims.

**Outline (structured first):** (1) what is verified and where; (2) classic RTS AI architecture [S5][S13][S1]; (3) modern techniques taxonomy [S13][S14][S21]; (4) learning-based honesty check [S6][S4][S31]; (5) LLM-driven AI (emerging) [S10][S11][S12]; (6) fairness/difficulty [S5][S8][S2][S22][S23]; (7) Unity integration [S9][S4][S27]; (8) use vs avoid; (9) per-system checklist; (10) landscape + build-vs-reuse; (11) verdict.

## What we know for sure

- The single-player opponent AI for a local RTS is a solved problem at the *hand-authored* level: scripted build orders + hierarchical decision layers + handicap-based difficulty is the industry-standard shape, verified by production games (SC2 built-in AI) and by research bots (TStarBot2, a hard-coded-rules hierarchical bot, defeated all 10 SC2 built-in AI levels including the cheating ones) [S5][S8].
- SC2 built-in AI officially cheats at the top levels: levels 8-10 get full map vision and boosted resource harvesting; "Insane" difficulty is documented as gaining extra mining resources and extra map awareness [S5][S8].
- Modern AoE2 (Definitive Edition) went the opposite way: developers claim the extreme AI does NOT cheat resources, only uses superior game knowledge and effectively infinite APM — community discussions disagree about hidden free resources, a real contradiction (see Contradictions block) [S22][S25].
- AlphaStar (DeepMind, Nature 2019) reached Grandmaster level in SC2 using multi-agent RL with a league of main agents + exploiters; PFSP training beat FSP; the agent's action rate (APM) was deliberately limited to human-comparable values — direct evidence that "feels fair" constrains even a superhuman AI [S6].
- Unity ML-Agents exists and supports RL, imitation learning and neuroevolution, but training is limited to Editor/standalone Mono builds (NOT IL2CPP builds) [S4].
- Unity coroutines are the documented way to run long-lived tick loops; `yield return null` does not allocate, `new WaitForSeconds` does — cache them; long-lived coroutines beat per-frame-started ones [S9].
- Free primary literature exists for every decision technique: Game AI Pro volumes 1-3 are free PDFs covering behavior selection overviews, behavior trees, utility theory, HTN planners, FSMs, tactical positioning, and scripted+game-tree hybrids [S13][S14].
- GOAP mechanics are verified via the ReGoap open-source implementation README (world-state facts, actions with preconditions/effects/cost, A* planning, goal selection, replanning) [S21]. The original F.E.A.R. GOAP paper PDF could NOT be fetched (both MIT mirrors 404) — see Could not verify.
- Behavior Designer (Opsive) and NodeCanvas (Paradox Notion) are live, documented, paid Unity AI tools; Behavior Designer's docs confirm BT task types (action/composite/conditional/decorator) and depth-first execution [S19][S20].
- ReGoap is a generic C# GOAP library with Unity and Godot adapters (license not stated in README — verify before use) [S21].
- UAlbertaBot (StarCraft 1 bot, BWAPI) is not maintained since early 2021 [S26]. TheKiwiCoder/BehaviourTree repo no longer resolves (404, checked 2026-08-14) [S28].
- MinaPecheux/UnityTutorials-RTS is a complete 53-tutorial Unity RTS codebase (buildings, units, fog of war, behavior trees, tech tree, save/load) but is UNMAINTAINED and built on Unity 2020.3 — explicitly not compatible with Unity 6 [S27].

## What we don't know (ambiguities)

- **Paid-tool budget.** Whether the user accepts paid Asset Store AI tools (Behavior Designer / NodeCanvas) vs. requiring free/open options changes the build-vs-reuse answer for the decision framework.
  - **Suggested clarifying question:** "Is spending money on Asset Store AI tools acceptable (e.g., Behavior Designer / NodeCanvas), or must everything be free/open-source?"
- **Difficulty philosophy.** Whether the AI may cheat (resource multipliers, vision) on high difficulty, or must stay honest (only better decisions + reaction speed). SC2 and AoE2 take opposite sides — this is a design decision only the user can make [S5][S22].
  - **Suggested clarifying question:** "On higher difficulties, is it acceptable for the AI to get hidden advantages (extra resources / vision), or should difficulty come only from smarter play and faster reactions?"
- **Scale target.** Number of simultaneous AI-controlled units (50 vs 500) determines whether a plain coroutine tick suffices or a DOTS/Jobs-style AI update is needed.
  - **Suggested clarifying question:** "What is the target scale: roughly how many units can be on the map at once (tens, ~100-200, or 500+)?"
- **Unity version target.** Unity 6.x is current (docs fetched show Unity 6.5); some reference code (MinaPecheux) is Unity 2020.3-only [S9][S27].
  - **Suggested clarifying question:** "Which Unity version will the project use (Unity 6 LTS, or another)?"

## Risks and doubts

- **Scope creep into learning-based AI (RL/LLM) eating the project.** AlphaStar-scale training is out of reach for a solo dev (league training infrastructure documented but its compute cost is not practically reproducible — Extended Data Fig. 6 in the paper; exact TPU-days could not be verified from the fetched text) [S6][S4]. LLM-driven AI is research-stage and adds latency/network dependency (SEMA, PLAP, TowerMind) [S10][S11][S12].
  - **Severity:** high
  - **Mitigation:** Lock the v1 scope to hand-authored hierarchical AI; treat ML-Agents and LLM integration as explicitly optional post-v1 experiments with their own milestones.
- **Unity version drift invalidating reference material.** Asset compatibility and API details shift (MinaPecheux explicitly warns it does not work with Unity 6) [S27]; asset docs fetched today (Behavior Designer) may drift [S19].
  - **Severity:** medium
  - **Mitigation:** Pin the Unity version at plan time (prefer Unity 6 LTS); verify every asset/package against that version with `chub` before the coder writes against it; treat all prices/versions in this report as 2026-08-14 snapshots.
- **Wrong free-vs-paid pick blocking debugging.** A hand-rolled BT without a visual editor costs debugging time; a paid tool costs money and adds a dependency the user may not want.
  - **Severity:** medium
  - **Mitigation:** The build-vs-reuse block below asks the user directly; the pragmatic default is custom FSM+priority-rule code for v1 (zero dependencies) with a visual tool as an optional layer.
- **License/unknown-maintenance traps in free components.** ReGoap README does not state a license (rule 15: verify before use); KiwiCoder BT is dead (404); Panda BT could not be verified (site unreachable) [S21][S28].
  - **Severity:** medium
  - **Mitigation:** Only plan around components with verified license + maintenance signal; run `chub`/GitHub checks at plan time for anything cited here as unverified.
- **Cheating-AI perception backlash.** Players often read resource/vision cheating as unfair even when it is the standard industry difficulty mechanism (AoE2 community threads are full of this) [S22][S25].
  - **Severity:** low
  - **Mitigation:** Gate handicaps behind difficulty level, disclose them in the difficulty select screen, and prefer reaction/decision quality over hidden resource cheats where possible.
- **Hype adoption of LLM-as-AI.** 2025-2026 papers show LLM agents can play RTS at decent levels but with latency and hallucination issues; adopting them for a local offline game is premature [S10][S11][S12].
  - **Severity:** low
  - **Mitigation:** Document as a monitored trend in the dossier; do not schedule any LLM work in v1.

## Technical findings

**F1. Layered/hierarchical AI is the proven classic shape.** A strategy layer (build order + economy goals), a tactical layer (army composition, engagement decisions), and a reactive layer (unit behavior) — the shape used by shipped RTS games and by winning research bots. TStarBot2 ("hard-coded rules over a hierarchical action structure") defeated all 10 built-in SC2 AI levels including the cheating ones [S5]. Game AI Pro 1 Ch. 29 documents hierarchical bot AI in Killzone 3 [S13]. The academic survey of SC AI research confirms hierarchy + scripting as the dominant approach [S1].

**F2. Build orders are data-driven scripts, not code.** A timeline of "when conditions hold, do action" steps (build worker X, then barracks, then ...). SC2's built-in AI is literally configured via "AI scripts" per difficulty [S8]; community custom AIs like The Duke AI (AoE2) implement the same pattern in script form and "only cheats on Hardest" [S24]. The build-order executor should read from ScriptableObjects/JSON, not be recompiled per balance change [S27 shows the SO pattern in a Unity RTS context].

**F3. Economy management is a priority system, not a planner.** Worker allocation (per-resource-patch saturation), spend priorities, and production queuing. Community rule of thumb for SC-style mining is ~16 workers per 8-patch base for efficient income and 24 for full saturation — Could not verify a primary source in this pass; treat as a tuning parameter, not a law [design-guidance].

**F4. Attack waves use timers + strength thresholds.** Classic pattern: attack when (army strength >= threshold) OR (timer elapsed since last attack); optionally with scripted "rush" moments in the build order. Verified as the standard shape of SC2 AI-script aggression [S8] and of bot behavior in the competition literature [S1][S30].

**F5. Scouting is a scripted sub-AI.** Send a scout at fixed build-order points, patrol expansion locations, remember last-seen enemy positions. The AI's knowledge should flow through the same fog-of-war-restricted perception the player uses — SC2's cheating levels are precisely the ones that bypass this (full map vision) [S5][S8], which is the "unfair" line in the sand.

**F6. Defense is a reactive priority list.** When base is attacked: rally defenders, garrison workers, repair, request army recall. Game AI Pro's hierarchical examples put this in the reactive layer [S13]; AoE2 discussions confirm "infinite APM + perfect knowledge" is what makes even a non-cheating extreme AI strong — i.e., reaction quality IS the difficulty lever [S25].

**F7. Difficulty levels = handicaps + reaction speed, and cheating is standard at the top.** Verified: SC2 levels 8-10 grant full vision + resource-harvest boost; "Insane" = extra mining resources + map awareness; classic AoE "hardest" gave extra starting resources [S5][S8][S23]. The three classic handicap dials: resource multiplier, reaction/latency, and vision (fog-of-war flag).

**F8. Honest-AI difficulty exists and is the modern alternative.** AoE2 Definitive Edition's extreme AI reportedly does not cheat resources — difficulty comes from strategy knowledge + perfect micro; the community still disputes hidden free resources (see Contradictions) [S22][S25]. AlphaStar's APM limit shows even a superhuman model is constrained to human-comparable reaction for fairness [S6].

**F9. FSM: fine for unit-level states, weak at strategy.** Simple, cheap, well-documented (Game AI Pro 3 Ch. 12 ships a reusable lightweight FSM) [S14]; the classic comparison chapter covers when it breaks (state explosion, poor reuse) [S13]. Use for unit micro states (idle/move/attack/retreat), not for the whole AI.

**F10. Behavior trees: the mainstream choice for unit and commander behavior.** Sequence/selector/decorator/composite semantics + depth-first execution verified via Behavior Designer's official docs [S19]; design pitfalls (shared-state bugs, over-branching) documented in Game AI Pro 3 Ch. 9 [S14]. Unity options: Behavior Designer (paid, active) [S19], NodeCanvas (paid, active, also ships FSM + dialogue trees) [S20], hand-rolled (small, well-understood), or the BT implementation inside MinaPecheux's free RTS codebase (Unity 2020.3) [S27].

**F11. GOAP: emergent sequences from reusable actions — good for worker/build logic.** Verified mechanics: world-state facts, actions with preconditions/effects/cost, A* search over actions, goal selection (deterministic or weighted-random), replan on world change [S21]. Origin: F.E.A.R. (Orkin) — Could not verify the primary PDF (both MIT mirrors 404 on 2026-08-14); attribution is standard in the literature [tertiary, widely attributed]. ReGoap is the verified free Unity implementation [S21].

**F12. HTN: natural fit for build orders.** Hierarchical task decomposition (plan = network of tasks/subtasks) matches how build orders are actually written; free chapter exists (Game AI Pro 1 Ch. 12) [S13]. More structure than GOAP, less freedom than GOAP; a good middle ground for the commander layer if the team wants a real planner.

**F13. Utility AI: best for continuous trade-offs (army composition, target selection).** Score each option from considerations (response curves), pick highest — the "which unit to build next" and "which target to focus" decisions are exactly this shape [S13 Ch. 9, Ch. 10; S14 Ch. 13]. Pairs well with BT (utility inside BT nodes) [S13 Ch. 10].

**F14. Planning under uncertainty is research territory — borrow ideas, not code.** Opponent modeling via Bayesian plan recognition exists for SC (Synnaeve & Bessiere, cited inside AlphaStar's reference list [S6]); UAlbertaBot's build-order optimization was research code in a stale repo (unmaintained since early 2021) [S26]. For a local game, "plan with last-seen information + replan when reality disagrees" captures 80% of the value.

**F15. Scripted + game-tree-search hybrids are documented but heavy.** Game AI Pro 3 Ch. 14 documents combining scripted behavior with game tree search for stronger, more robust AI [S14]. Only worth it for combat micro (small search spaces); skip for v1.

**F16. RL is honest-to-report: proven but not for a solo local game.** AlphaStar (Grandmaster, league of main agents + exploiters, PFSP > FSP, ~3M rock-paper-scissors cycles among exploiters) required infrastructure beyond a solo dev's reach; exact compute could not be verified from the fetched text [S6]. Surveys confirm RL beats pros at huge cost (OpenAI Five, AlphaStar) [S7][S31]. Unity ML-Agents makes RL *possible* in-engine (RL + imitation + neuroevolution) but training is Mono-only (no IL2CPP) and inference adds a runtime dependency [S4]. Verdict: at most, use ML-Agents for one micro-behavior as a post-v1 experiment; never for the whole opponent.

**F17. LLM-driven opponents are emerging and NOT ready for offline local.** SEMA (2026): multi-agent LLM framework cuts decision latency >50% vs naive LLM on SC2 maps — still not real-time-friendly; PLAP (2025): GPT-4o beats 80% of MicroRTS baselines zero-shot, Qwen2-72B beats the top scripted agent — but requires LLM inference (network or huge local model); TowerMind (AAAI 2026 oral) shows LLMs clearly below human experts with hallucination issues [S10][S11][S12]. For a local game with no network, none of these is viable for v1. Monitor; do not adopt.

**F18. Fairness toolkit (what makes AI "feel" fair):** (1) respect fog of war (never read the player's hidden state — SC2 cheaters are precisely the ones that don't [S5][S8]); (2) reaction latency dial (AlphaStar's APM limit is the canonical example [S6]; AoE2 players call infinite APM a cheat [S25]); (3) resource honesty vs handicap (two verified philosophies [S5][S22]); (4) imperfect scouting (AI only knows what its scouts saw [S5]).

**F19. DDA (dynamic difficulty adjustment) is verified, cheap, and player-facing.** The MOBA DDA study (2017) switched AI behavior tiers based on a player-performance metric and found players' *perception* of difficulty matters more than the raw adaptation [S2]; the overview paper frames DDA as keeping the player between boredom and overwhelm [S3]; personalized imitation+RL DDA is research-stage [S4]. Implementation: measure player performance (win rate, econ lead, APM), nudge handicap every N minutes — no ML needed.

**F20. Where AI decisions live in Unity: coroutine-based tick, with event-driven triggers.** Verified semantics: `yield return null` resumes next frame and does not allocate; `new WaitForSeconds` allocates — cache instances; prefer long-lived coroutines looping with `yield return null` over starting new ones per frame [S9]. Recommended rhythm: strategy tick every 0.5-2s (build order, economy, army goals), tactical tick every 0.1-0.3s, reactive/unit layer per-frame or event-driven. Event-driven wiring (C# events / UnityEvents for "building completed", "attack received") is verified as a pattern in a Unity RTS codebase [S27].

**F21. The AI must read the game through its own perception layer.** An AI-only view model (positions it has actually seen, last-seen timestamps, threat map) is the architectural seam that makes fairness (F18) enforceable — the same code path the player's fog of war feeds. This is the single most important integration decision for the AI angle; SC2's difficulty design is literally the difference between respecting and bypassing this layer [S5][S8].

**F22. Debug tooling is part of the AI build.** Decision logging + Gizmo/onion visualization of AI state is what makes hand-authored AI tunable; Game AI Pro's structural-architecture chapter calls this out as a common trick of the trade [S13 Ch. 5]. Budget it as a task, not a nicety.

**F23. What to use (pragmatic stack for a solo/small team local RTS):** (1) hand-authored hierarchical AI as the backbone: build-order script executor + economy priorities + army-goal utility scores + FSM/BT for unit behavior [S5][S13][S19]; (2) data-driven everything (ScriptableObjects/JSON) so balance and AI tuning never require recompiles [S27]; (3) coroutine ticks + event triggers [S9][S27]; (4) free literature as the spec: Game AI Pro PDFs [S13][S14], arXiv abstracts [S5][S6][S2].

**F24. What to avoid:** (1) RL for the whole opponent (compute + Mono-only training + integration cost) [S6][S4]; (2) LLM-at-runtime AI (latency + network — violates the no-network constraint) [S10][S11][S12]; (3) dead/unverified components: TheKiwiCoder BehaviourTree (404) [S28], Panda BT (unreachable on access date), ReGoap without license verification [S21]; (4) cheating-by-vision on normal difficulties (perception damage [S22]); (5) building a GOAP/HTN planner before the scripted version works — the scripted version IS the baseline product [S13 comparison chapter implies the trade-off; recommendation].

**F25. ML-Agents integration constraints (if used later):** training only in Editor/standalone Mono; IL2CPP builds default to inference mode [S4]. Plan the architecture so the AI core is swappable: scripted AI behind an interface, ML inference behind the same interface.

**F26. OSS/reference landscape relevant to the AI angle** (sibling angle-oss covers the full RTS landscape; only AI-relevant rows listed here): Behavior Designer (paid, active, vendor-documented) [S19]; NodeCanvas (paid, active, vendor-documented) [S20]; ReGoap (free, Unity+Godot, license-unstated) [S21]; MinaPecheux UnityTutorials-RTS (free, complete BT+fog-of-war RTS, stale/Unity 2020.3) [S27]; UAlbertaBot (stale, BWAPI — SC1, conceptual only) [S26]; TStarBots (research code, SC2, conceptual only) [S5]; Unity ML-Agents (official, active) [S4]; SC2/AoE AI literature (conceptual only) [S1][S5][S8].

## Contradictions and caveats

- **Does AoE2's extreme AI cheat resources?** Players on the AoE forums and Steam claim hidden free resources / production boosts on extreme difficulty [S23][S25]; other players and the Definitive Edition devs' stated design say the extreme AI does NOT get extra resources — only knowledge and APM [S22]. We report both; the user decides which philosophy to copy. (SC2 is unambiguous: it cheats at top levels [S5].)
- **AlphaStar compute cost:** the Nature paper documents the league training setup and infrastructure figure [S6] but the fetched text did not include a verifiable total compute number; do not quote any TPU-days figure.
- **GOAP origin:** F.E.A.R.'s GOAP (Orkin) is universally attributed but the primary PDF could not be fetched on access date (MIT mirrors 404). Mechanics are cited from ReGoap instead [S21].
- **"Worker saturation 16/24" is community knowledge, not a verified primary source** — treat as tuning parameter (F3).

## Existing solutions (landscape scan — AI angle only)

| Name | Type | License | Last activity | Maintenance signal | Fit for a local Unity RTS |
|---|---|---|---|---|---|
| Behavior Designer (Opsive) | Paid Asset Store tool | proprietary (EULA) | active (docs live 2026-08-14) | strong, vendor-supported [S19] | Best visual BT if paid tools are accepted |
| NodeCanvas (Paradox Notion) | Paid Asset Store tool | proprietary (EULA) | active (site live 2026-08-14) | strong [S20] | BT + FSM + dialogue trees; alternative to BD |
| ReGoap | OSS (GitHub, Unity+Godot) | not stated in README — verify | repo live at access date | moderate (community) [S21] | Free GOAP if GOAP route chosen; verify license first |
| MinaPecheux UnityTutorials-RTS | OSS (GitHub, tutorial series) | not stated in README — verify | unmaintained (2021-2022), Unity 2020.3 | STALE — explicitly not Unity 6 [S27] | Best free *learning* reference (BT + FoW + tech tree); do not fork for Unity 6 |
| UAlbertaBot / CommandCenter | OSS (GitHub, SC1/SC2 bots) | MIT (repo, verify) | unmaintained since early 2021 [S26] | STALE | Conceptual only (build-order search, bot architecture); not Unity |
| TStarBots | research code (GitHub-linked, arXiv) | research | 2018 [S5] | research artifact | Conceptual evidence: hierarchical rules beat built-in AI; not Unity |
| Unity ML-Agents | Official Unity package | Unity Companion License | active | strong [S4] | RL/IL experiments post-v1 only (Mono-only training) |
| TheKiwiCoder BehaviourTree | OSS (GitHub) | MIT (per repo history) | repo 404 on 2026-08-14 [S28] | DEAD | Do not plan around it |
| Panda BT | Asset Store / website | proprietary | unreachable on access date | UNVERIFIED | Do not plan around it |

## Build vs. reuse decisions - please confirm

1. **Component "AI decision framework (commander + unit behavior)"** — reuse Behavior Designer (paid, active) / reuse NodeCanvas (paid, active) / build minimal custom (FSM + priority rules, ~1-2 weeks for a competent coder, zero dependency). Your call: _______
2. **Component "GOAP/planner layer" (if wanted)** — reuse ReGoap (free, license-verify first, active) / build from scratch (≈1 week). Your call: _______
3. **Component "build-order + economy AI"** — build from scratch (data-driven script executor, ≈1-2 weeks; no OSS fits a custom game's tech tree). Your call: _______
4. **Component "learning-based opponent" (optional post-v1)** — reuse Unity ML-Agents (official, free) for a single micro-behavior experiment / skip entirely in v1. Your call: _______

## Feasibility verdict

- **Can do:** yes
- **Confidence:** HIGH
- **Why:** The opponent-AI problem for a local single-player RTS is thoroughly documented by verified primary sources (research bots that beat cheating built-in AIs [S5], shipped-game difficulty design [S8][S22], free professional chapters on every decision technique [S13][S14], official Unity documentation on the integration mechanics [S9][S4]). Every v1 technique is hand-authored, well-understood, and engine-portable; the only genuinely hard options (RL, LLM) are correctly deferrable and flagged as such. The one caveat that keeps this from being trivially certain is Unity version drift (assets/APIs move; pin the version at plan time).

## Recommendations for the planning agent

- Plan the AI in three layers matching F1: strategy (0.5-2s tick), tactical (0.1-0.3s tick), reactive (per-frame/event) — with the perception layer (F21) built FIRST since fairness, scouting and difficulty all route through it.
- Schedule the per-system checklist below as its own work items; each is independently testable.
- Do not schedule any RL or LLM work in v1 (F16/F17); add an explicit "post-v1 experiments" appendix instead.
- Include debug visualization as a first-class task (F22) — hand-authored AI without debug views is untunable.
- Ask the user the 4 clarifying questions (budget, cheating philosophy, scale, Unity version) BEFORE locking the plan — answers change build-vs-reuse rows 1-2 and the difficulty design.
- Coordinate with angle-core on: NavMesh/formation movement (the AI issues move orders only), fog-of-war data ownership (the perception layer must read the SAME FoW the player uses), and unit-count scale (drives tick budget).
- The user's ask "Add the user need from the agent": the building agent needs (a) this AI spec, (b) verified free literature links, (c) a working reference codebase for patterns (MinaPecheux — learn-from, not fork [S27]), and (d) explicit non-goals (no RL, no LLM, no network) so it does not gold-plate the opponent AI.

### Per-system "what needs to be done" checklist (coder-executable)

1. **Perception system** — AI-only view model fed by the shared fog-of-war; stores visible units, last-seen positions, threat map; exposes query API (nearest threat, known enemy bases). Test: AI cannot "see" a unit hidden by FoW.
2. **Build-order engine** — data-driven step list (condition + actions + optional priority); ScriptableObjects/JSON; supports branching (expand vs rush). Test: scripted rush fires at the configured step.
3. **Economy manager** — worker allocation to resources with saturation targets (F3), spend priorities, and "bank vs spend" threshold. Test: no worker oversaturation; bank drains on big build steps.
4. **Production/army manager** — unit-type goals with utility scoring (F13) against current army + enemy counters; rally points; production queue drain. Test: army composition shifts when scouting reports a counter unit.
5. **Tactical/combat manager** — target selection (focus fire, priority), engagement/retreat thresholds, formation moves. Test: outnumbered squads retreat instead of suicide.
6. **Scouting manager** — scout patrol points, expansion detection, enemy-army last-known push; feeds the perception layer. Test: AI reacts to a seen expansion.
7. **Attack scheduler** — wave timers + strength thresholds + optional multi-prong (F4). Test: no attack before minimum strength unless rush scripted.
8. **Difficulty governor** — handicap dials (resource multiplier, reaction latency, vision flag) + optional DDA nudges (F7/F18/F19); reads player-performance metric. Test: easy AI has delayed reactions and no vision cheat; hard AI may.
9. **Integration shell** — coroutine ticks with cached yield instructions (F20) [S9], event hooks, decision logging + Gizmos (F22); zero per-frame allocations in AI code.

## Open questions for the user

1. Is spending on paid Asset Store AI tools acceptable, or must everything be free/open-source? (changes Build-vs-reuse 1-2)
2. May the AI cheat (extra resources/vision) on high difficulty, or should difficulty come only from smarter play and faster reactions? (changes the difficulty-governor design)
3. What is the target unit-count scale (tens / ~100-200 / 500+)? (changes the tick architecture)
4. Which Unity version will the project target? (changes asset compatibility checks)

## Self-critique

- **Did I do my job?** Yes for the AI angle: every v1 technique is backed by a verified primary source or an explicit abstention; the honesty checks on RL and LLM AI are data-backed; the checklist is executable by a coder. Gap: I did not fetch full text of the Ontañón survey (paywalled IEEE) or the Game AI Pro chapter PDFs — chapter-level claims rest on verified titles/TOC, not full-text reads.
- **What might I have missed?** (1) Playtesting evidence on perceived fairness of reaction-delay tuning (only indirect sources); (2) other live free Unity BT packages beyond those checked (I verified BD, NC, ReGoap, KiwiCoder-dead, Panda-unreachable — there may be others, e.g., Flux BT; not checked); (3) the exact SC2 difficulty tables (reaction latency per level) — fandom page was captcha-blocked, so difficulty details are partial [S8]; (4) DDA-in-RTS specific case studies (found MOBA/overview papers, not an RTS-specific DDA deployment).
- **What did I assume without evidence?** (1) That a "competent coder" can build the minimal FSM+priority AI in 1-2 weeks (effort estimate, not measured); (2) that the user's game resembles SC-style RTS (economy + tech + armies) — the user's task says "RTS" without specifying subgenre; if the game is closer to a skirmish RTS (no economy), systems 3-4 shrink; (3) that the AI should be fully deterministic/scripted rather than randomized-openings — variance was not requested, so scripts it is, flagged.

## Metrics

- findings: 26
- risks_HIGH: 1
- risks_MEDIUM: 3
- risks_LOW: 2
- clarifying_Qs: 4

## Sources table

| # | Source | Type | URL | Access date |
|---|--------|------|-----|-------------|
| [S1] | Ontañón et al., "A Survey of Real-Time Strategy Game AI Research and Competition in StarCraft", IEEE T-CIAIG 2013 (metadata via Crossref; full text paywalled) | primary (academic, paywalled) | https://doi.org/10.1109/TCIAIG.2013.2286295 | 2026-08-14 |
| [S2] | Silva et al., "Dynamic Difficulty Adjustment on MOBA Games" | primary (academic) | https://arxiv.org/abs/1706.02796 | 2026-08-14 |
| [S3] | Sepulveda et al., "Exploring Dynamic Difficulty Adjustment in Videogames" | primary (academic) | https://arxiv.org/abs/2007.07220 | 2026-08-14 |
| [S4] | Fuchs et al., "Personalized Dynamic Difficulty Adjustment - Imitation Learning Meets RL" | primary (academic) | https://arxiv.org/abs/2408.06818 | 2026-08-14 |
| [S5] | Sun et al., "TStarBots: Defeating the Cheating Level Builtin AI in StarCraft II in the Full Game" | primary (academic) | https://arxiv.org/abs/1809.07193 | 2026-08-14 |
| [S6] | Vinyals et al., "Grandmaster level in StarCraft II using multi-agent reinforcement learning", Nature 2019 | primary (academic) | https://www.nature.com/articles/s41586-019-1724-z | 2026-08-14 |
| [S7] | Yin et al., "AI in Human-computer Gaming: Techniques, Challenges and Opportunities" | primary (academic) | https://arxiv.org/abs/2111.07631 | 2026-08-14 |
| [S8] | StarCraft Wiki (Fandom), "AI script" (snippet-level; page captcha-blocked) | secondary (wiki) | https://starcraft.fandom.com/wiki/AI_script | 2026-08-14 |
| [S9] | Unity Manual 6.5, "Write and run coroutines" | primary (official-docs) | https://docs.unity3d.com/Manual/Coroutines.html | 2026-08-14 |
| [S10] | Ma et al., "Self-Evolving Multi-Agent Framework for Efficient Decision Making in RTS (SEMA)" | primary (academic, research-stage) | https://arxiv.org/abs/2603.23875 | 2026-08-14 |
| [S11] | Cui et al., "Empowering LLMs with Parameterized Skills for Adversarial Long-Horizon Planning (PLAP)" | primary (academic, research-stage) | https://arxiv.org/abs/2509.13127 | 2026-08-14 |
| [S12] | Wang et al., "TowerMind: A Tower Defence Game Learning Environment and Benchmark for LLM as Agents" (AAAI 2026 oral) | primary (academic, research-stage) | https://arxiv.org/abs/2601.05899 | 2026-08-14 |
| [S13] | Game AI Pro Vol 1 (free PDF collection; TOC verified; chapters: Ch4 behavior selection overview, Ch5 structural architecture, Ch9/10 utility theory + utility-in-BT, Ch12 HTN planners, Ch26 tactical position selection, Ch29 Killzone 3 hierarchical AI) | primary (official free source) | https://www.gameaipro.com/ | 2026-08-14 |
| [S14] | Game AI Pro Vol 3 (free PDF collection; TOC verified; chapters: Ch9 BT pitfalls, Ch12 reusable FSM, Ch13 utility considerations, Ch14 scripted + game-tree search hybrid) | primary (official free source) | https://www.gameaipro.com/ | 2026-08-14 |
| [S15] | Unity ML-Agents 3.0 docs, "ML-Agents Overview" | primary (official-docs) | https://docs.unity3d.com/Packages/com.unity.ml-agents@3.0/manual/index.html | 2026-08-14 |
| [S16] | Opsive, "Behavior Designer - Overview" | primary (vendor docs) | https://opsive.com/solutions/behavior-designer/ | 2026-08-14 |
| [S17] | Paradox Notion, NodeCanvas product page | primary (vendor page) | https://paradoxnotion.com/ | 2026-08-14 |
| [S18] | ReGoap repository README (GOAP mechanics; license not stated) | primary (OSS repo) | https://github.com/luxkun/ReGoap | 2026-08-14 |
| [S19] | UAlbertaBot repository README (unmaintained since early 2021) | primary (OSS repo) | https://github.com/davechurchill/ualbertabot | 2026-08-14 |
| [S20] | Mina Pecheux, UnityTutorials-RTS README (53-tutorial RTS, Unity 2020.3, unmaintained) | primary (OSS repo) | https://github.com/MinaPecheux/UnityTutorials-RTS | 2026-08-14 |
| [S21] | TheKiwiCoder/BehaviourTree — GitHub API 404 (repo gone) | tertiary (verification attempt) | https://api.github.com/repos/TheKiwiCoder/BehaviourTree | 2026-08-14 |
| [S22] | Age of Empires Forum, "Does the AI cheat?" (extreme AI: knowledge/APM, not resources) | secondary (forum) | https://forums.ageofempires.com/t/does-the-ai-cheat/119262 | 2026-08-14 |
| [S23] | AoE Heaven Forums, "Do the computer cheat in hardest difficulty?" (classic AoE hardest = extra starting resources) | secondary (forum) | https://aoe.heavengames.com/cgi-bin/aoecgi/display.cgi?action=st&fn=1&tn=1096 | 2026-08-14 |
| [S24] | The Duke AI (AoE2 custom AI; "only cheats on Hardest") | primary (OSS repo, snippet-level) | https://github.com/tim-kos/the_duke_ai | 2026-08-14 |
| [S25] | Steam AoE2 DE discussion, "Does the Extreme difficulty A.I use cheats?" | secondary (forum) | https://steamcommunity.com/app/813780/discussions/0/3969421533317702189/ | 2026-08-14 |
| [S26] | Shao et al., "A Survey of Deep Reinforcement Learning in Video Games" | primary (academic) | https://arxiv.org/abs/1912.10944 | 2026-08-14 |
| [S27] | Moon et al., "Dynamic Difficulty Adjustment via Fast User Adaptation" | primary (academic) | https://arxiv.org/abs/2006.15545 | 2026-08-14 |
| [S28] | Farooq et al., "StarCraft AI Competition: A Step Toward Human-Level AI for RTS" (AI Magazine 2016) | primary (academic, open access) | https://doi.org/10.1609/aimag.v37i2.2657 | 2026-08-14 |
| [S29] | Unity Learn, "Super Simple RTS" submission (snippet-level) | secondary (web) | https://learn.unity.com/submission/super-simple-rts | 2026-08-14 |