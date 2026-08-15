# Research - T-2026-08-14-003 (angle-games)

**Date:** 2026-08-14
**Trigger:** initial
**Sub-agent:** research (angle: games - mechanics teardown of LoL / Wild Rift / MLBB)

## Outline (structural backbone)

1. What the three reference games DO (mechanics teardown: map, minions, towers, objectives, economy, kit, controls, vision, PvE modes) [S1-S20][S26-S28]
2. What they FACE (engineering + design problems: authoritative simulation, packet security, snowballing, match duration, bot believability, RL compute) [S21-S25][S31-S33]
3. What to AVOID for a local single-player Unity MOBA (netcode, AGPL code, PvP-only systems, patch-churn tuning data) [S31][S3][S26][S5][S32]
4. Single-player translation: AI teammates + opponents (Co-op vs AI, AI Training, macro-goal AI, bot-behavior checklist, difficulty dials) [S9][S10][S18][S25][S34]
5. Landscape scan + build-vs-reuse + feasibility + recommendations

## Task in one sentence

Reuses: `research/unity-rts-2026-08-14/` (T-2026-08-14-002, core systems + opponent-AI + OSS angles - MOBA shares RTS fundamentals; this angle DELTAS the MOBA-specific mechanics, problems, and AI translation).

Research League of Legends (PC), Wild Rift (mobile), and Mobile Legends: Bang Bang (mobile) as design and engineering references for a League-style MOBA to be built in Unity as a LOCAL SINGLE-PLAYER game (user controls one hero; 4 allied AI heroes vs 5 enemy AI heroes; no multiplayer, no network), covering what they do, what they face, what to avoid, and how single-player AI is done - so the planning agent can write the build guide from cited facts.

Note on the user's wording: "Both are mobile games" - 2 of 3 references are mobile (Wild Rift, MLBB); LoL is PC. Both families are covered below; the mobile-first lessons (match length, touch controls, perf) are separated from PC lessons.

## What we know for sure

- The task is research-only, feeding a merged dossier into the new folder `research/moba-unity-2026-08-14/` (per `share/handoffs/00_user_task_T-2026-08-14-003.md:40`). This angle file is one of the parallel inputs the master merges.
- All three reference games are built on the same genre skeleton: two teams of 5, three lanes, base structures, minion waves, jungle/neutral objectives, item economy, XP leveling [S11][S14][S19].
- All facts below were captured with access date 2026-08-14, either directly from the cited page or via Jina Reader (`https://r.jina.ai/<url>`). Fandom pages returned CAPTCHA via Jina; the MLBB Minions page was recovered via `?action=raw` wikitext [S16]. The official LoL how-to-play page failed via Jina (HTTP 400) but succeeded via direct webfetch [S11].
- Em dash (U+2014) is banned in this file; verified by byte scan before return.

## What we don't know (ambiguities)

- Target platform of the Unity build (PC desktop vs mobile-first). LoL is PC, WR/MLBB are mobile; controls, camera, match length, and perf budgets differ. The user's phrasing suggests mobile, but Unity 6 desktop is the lower-risk first target.
  - **Suggested clarifying question:** "Is the Unity MOBA targeting PC desktop first, mobile-first, or both? (This decides input scheme, camera, and match-length targets.)"
- Whether the game should copy LoL's symmetric lanes or MLBB's asymmetric economy (Gold lane vs EXP lane). Asymmetry adds design surface but MLBB proves it shortens matches [S16][S19].
  - **Suggested clarifying question:** "Do you want symmetric lanes (LoL-style) or asymmetric lane economies (MLBB Gold/EXP lanes)?"
- Which match-length target: LoL PC 30-40 min [S15], WR 15-20 min [S15], MLBB ~10 min [S19][S20]. This decides wave timers, respawn curves, and AI pacing.
  - **Suggested clarifying question:** "Target match duration: ~10 min (MLBB), 15-20 min (Wild Rift), or 30+ min (LoL PC)?"
- Whether the AI difficulty should use "cheating" handicap dials (SC2-style) or honest limits - the prior RTS dossier (T-2026-08-14-002, angle-ai) already recommends cheat dials; this angle confirms Riot's bots vary scan rates/threat response by difficulty [S9], which is a form of handicap.
  - **Suggested clarifying question:** "For AI difficulty levels, is SC2-style 'harder = better reaction + more vision' acceptable, or must the AI stay honest?"
- Art/audio sourcing and Unity version were left open by the RTS dossier; they carry into this build unchanged (see `01_research_T-2026-08-14-002_angle-core.md`).

## Risks and doubts

- High: Riot/MLBB game values change every patch (plate gold 160 to 175 in V12.22 [S3], Cash Back 6% to 8% to 7.5% [S26]); a build guide that hard-codes numbers from 2026-08-14 snapshots will drift. Mitigation: treat all numeric values as design starting points, not gospel; the plan should parameterize every tunable in ScriptableObjects/data files.
- High: The MLBB Fandom wiki is internally inconsistent about which lane is the "Gold Lane" (Minions page says Gold Lane = non-Turtle lane [S16]; Turtle page calls the Turtle lane the Gold Lane [S17]). Mitigation: verify lane-economy rules against an in-game test or official MLBB guide before locking the design.
- High: No usable open-source MOBA cornerstone exists (LeagueSandbox archived + AGPL + legal history [S31]; StarkMOBA is a 4-star blockchain demo; Blast-of-Arena is license-less). Mitigation: build from scratch; reuse only the RTS-dossier's learn-from constellation (MinaPecheux MIT course project, OpenRA/0 A.D. architecture).
- Medium: Bot AI quality is the hardest part of this genre and all three references keep their bot tech proprietary; only behavior lists are public [S9][S34][S18]. Mitigation: implement the documented behavior checklist (lane assignment, last-hitting, item builds, skillshot dodging, threat-scaled scanning, retreat) as a v1 floor; treat believability as a polish loop.
- Medium: Fandom/wiki sources are community-maintained and lag patches; several values in this report are single-source (flagged `[single-source, flag]` inline). Mitigation: planning should treat single-source numbers as provisional; the coder validates the chosen values against the live game if possible.
- Medium: The 1v9.gg-derived WR details (level cap 15, no turret plating, nexus defends itself) could not be re-verified at write time (URL not re-captured); kept out of the findings body except where the WR:Map wiki [S14] or Wikipedia [S15] corroborates.
- Low: OpenAI Five numbers (800 petaflop/s-days, ~45,000 years of self-play) are from OpenAI's own blog [S33] and the arXiv paper [S32]; they are cited only to bound the "RL for MOBA AI" option, not as a build requirement.
- Low: Match-duration claims for MLBB range 10 min (design goal [S19]), 10-30 min (Wikipedia [S20]); the range is real (snowballing ends matches early).

## Technical findings

### A. What they do (mechanics teardown)

1. **Match skeleton (LoL PC, canonical).** Two teams of five champions; destroy the enemy Nexus to win. The Nexus spawns minions; the Fountain behind it heals and grants shop access. Each lane has 3 turrets and 1 inhibitor; the Nexus is guarded by 2 turrets. Between lanes is the jungle with neutral monsters; Baron Nashor and the Drakes are the two most important [S11]. Five positions: top, jungle, mid, bot, support [S11].
2. **Hero kit shape (LoL).** Most champions have 5 abilities: a passive, three basics, an ultimate, mapped to Q W E R; plus 2 summoner spells on D F (Flash, Teleport, Smite, Ignite); up to 7 items at once [S11]. Over 170 champions [S11].
3. **Hero kit shape (MLBB, mobile variant).** Same skeleton, compressed: passive + skill 1 + skill 2 + ultimate + one battle spell (Flicker, Retribution, Execute, Purify and others) [S27][S16-adjacent]. Hero pages list exactly Passive / Skill 1 / Skill 2 / Ultimate plus a Battle Spells section [S27].
4. **Minion waves (LoL).** First wave spawns at 1:05 from the Nexus; a new wave every 30s; melee/caster/siege composition [S1]. When a lane inhibitor is destroyed, super minions replace siege minions in that lane (1600-7500 HP, 185-480 AD); when all three inhibitors are down, a second super minion spawns per wave [S2].
5. **Minion waves (MLBB, faster pacing).** First minions appear 10s after game start; refresh every 30s. Mid lane travel ~15s; side lanes ~25s. Three types: Lancer (33 gold), Infantry (65 gold), Cannon (100 gold), scaling to roughly 90/120/150 by 30 minutes. If a minion lands the last hit instead of a hero, only 80% gold is awarded. Minions gain 10 movement speed per minute. A Super Minion is mobilized in a lane when the enemy's base turret there is destroyed [S16].
6. **Asymmetric lane economies (MLBB only).** Gold Lane (non-Turtle lane): one of each minion per wave; cannon minions give +45% extra gold for the first 10 waves (~5:10 in), starting at 120 gold. EXP Lane (Turtle lane): one of each minion per wave; cannon minions give +35% extra EXP to the killer for the first 10 waves [S16]. LoL PC lanes are symmetric [S1][S11]. This is MLBB's match-shortening lever.
7. **Turrets (LoL).** 11 per team. Turret plating: first 14 minutes, 5 plates per outer/inner turret; plate gold raised 160 to 175 (V12.22); plates take 17% reduced damage from minions (V10.5); outer turret AD scales 182-350 with game time [S3]. Turrets deal damage to minions and champions and grant limited vision from the fog of war [S11]. MLBB: 18 defense towers per map (3 lanes, 4 jungle areas, 2 bosses) [S28].
8. **Objectives (LoL PC, current).** Dragon first at 5:00, respawn 5:00 after each kill [S29, secondary]; Void Grubs at 8:00 [S29, secondary]; Rift Herald at 14:00, despawns permanently at 19:45 (19:55 if in combat), Baron takes her place at 20:00 [S13, primary]. Baron: spawn 20:00, one of three forms (Hunting/Territorial/All-Seeing), respawns every 6 minutes [S12][S30, secondary]. Baron buff: bonus AD/AP, empowered recall, massively stronger nearby minions [S11].
9. **Objectives (MLBB, compressed).** Turtle: first appears at 2:00, refreshes every 2:00, stops respawning after 8 minutes, and turns into the Lord if not slain after 8:00; killing grants team gold + EXP and a shield blessing to the killer [S17]. Lord: spawns at 8:00 in the river, evolves stronger at 12 and 18 minutes, respawns 2 minutes after death, and spawns alongside the next minion wave of the killing team to push their weakest lane [S19, secondary].
10. **Match duration by reference.** LoL PC 30-40+ min [S15]; Wild Rift 15-20 min [S15]; MLBB design goal ~10 min, measured average session 13:39 (vs WR 16:15) [S19, secondary]; MLBB Wikipedia says 10-30 min on average [S20]. MLBB's 10-minute target is the explicit mobile-first design decision [S19].
11. **Fog of war and vision.** LoL: wards are deployable units that remove fog of war in an area [S6]; turrets grant limited vision [S11]. MLBB: minions have 8-unit sight range and cannot detect enemies hiding in bushes or under camouflage [S16]. Vision = information economy; both games gate it behind deployables.
12. **Shop and item economy.** LoL: buy, sell, undo [S7]; most items sell for 70% of total cost, exceptions 40% [S8]. MLBB: tap-to-equip anywhere on the map (no need to return to base) [S28, secondary] - another match-shortening lever.
13. **Surrender (LoL).** Requires 4 of 5 votes (70%) or unanimous with 3 or fewer active players; vote window 25s; types include AFK Surrender and Remake [S5]. PvP-ops-driven; not needed for a local game unless the user wants a "give up" button.
14. **Snowball control.** LoL kill bounty: 300g base, tiers from -6 to +8; consecutive deaths lower a champion's value, kill streaks raise it [S4]. MLBB: killing the same hero repeatedly pays reduced gold; killing a dominating hero with a kill streak pays bonus gold [S19, secondary]. GDC analysis of MOBAs identifies shared XP as a negative-feedback mechanic against snowballing [S23].
15. **PvE mode (LoL Co-op vs AI).** Team of humans vs team of bots on Summoner's Rift; three difficulties per wiki: Intro, Beginner, Intermediate [S9]; uses Swiftplay accelerated rules [S9]. Riot's 14.6 bot rewrite (2024-02-29) names the queues "Intro, Beginner, and Advanced" [S10]. Contradiction flagged below. Bots also fill Normal queues for new/returning accounts (5-game calibration) [S34].
16. **Wild Rift as the "abridged" reference.** WR's map is "a mostly abridged version of Summoner's Rift, reduced in features and territory" - 3 lanes, 5v5 [S14]. WR proves a LoL-like game can be cut down for shorter sessions; its feature reductions (fewer systems) are exactly the cut list a solo dev needs [S14][S15].
17. **MLBB AI modes.** Vs AI offers Easy and Normal bots; AI Training is the hard mode - AI is proficient in laning and teamfights, allied AI helps on Lord/Turtle objectives, and enemy AI actively stuns at Retribution range (objective-aware behavior), rated around Mythic Honor+ level [S18]. MLBB also runs temporary AI control of a disconnected player's hero [S28, secondary] - the "AI takes over" pattern, useful locally as an idle-handling feature.
18. **Controls.** LoL PC: keyboard-mouse (QWER/DF + click movement) [S11]. MLBB: virtual joystick on the left, skill buttons on the right, two fingers, auto-lock + target switching for last-hitting, tap-to-equip [S28, secondary]. WR sits between: touch/controller, same 3-lane map [S14].

### B. What they face (design and engineering problems)

19. **Authoritative simulation + client prediction is the hard core (Riot).** Riot's first server-side spell-slot queue failed because the server's model of the client's state diverged (client/server state mismatch); they pivoted to a client-driven "Spellbook Override" with client-side prediction and server validation [S21][S22]. Lesson for local builds: you get the authoritative sim and the client in one process, so the entire prediction layer disappears; what remains is the same discipline of one simulation authority and input as events.
20. **Packet security arms race.** Riot began encrypting LoL packets after version 4.20, which halted replay-file research that the LeagueSandbox emulator depended on [S31, wiki FAQ via search]. LeagueSandbox received a cease-and-desist from Riot in 2022 and archived the project [S31]. Legal + practical caution for anyone cloning LoL mechanics; also evidence that reverse-engineered game logic is fragile.
21. **Snowballing vs catch-up is the eternal balance problem.** GDC's MOBA analysis treats shared XP as negative feedback [S23]; both LoL [S4] and MLBB [S19] add kill-bounty systems to fight runaway snowball. A local PvE game needs the same systems or games end 15 minutes in with a 40-kill deficit.
22. **Match duration is a mobile-first design pressure.** MLBB compressed to ~10 minutes by design (faster waves at 10s, lane economies, tap-to-equip, Lord scaling) [S19][S16][S28]; WR compresses LoL to 15-20 min by cutting features [S14][S15]. Duration is a design decision made at the wave-timer and respawn-curve level, not a tuning afterthought.
23. **Bot believability is a shipped feature at Riot.** Documented bot behaviors: variable scan rates by difficulty and threat level (Beginner ~1/3 frequency; Intermediate 50-100% depending on threat), skillshot usage and dodging, item builds by tier, retreat logic, pathing fixes for specific map spots (Baron pit), lane-switching and gank attempts [S9][S34]. Riot's 2024 rewrite goal: bots that "feel much more like normal games" [S10].
24. **RL is not the answer at this scale.** OpenAI Five needed ~800 petaflop/s-days and ~45,000 years of simulated self-play over 10 months to beat Dota 2 world champions [S32][S33]. The prior RTS dossier (angle-ai, T-2026-08-14-002) already established ML-Agents trains Mono-only. Scripted/hierarchical AI is the only local-viable option; RL/LLM opponents are out of scope.
25. **Community wikis drift and contradict.** MLBB fandom pages disagree on lane naming [S16][S17]; LoL wiki and Riot's dev blog disagree on bot queue names [S9][S10]. A build guide must treat wiki numbers as dated snapshots and prefer official sources where they exist.
26. **Toxicity and human factors (PvP context).** Riot invested in systemic anti-toxicity work (Jeffrey Lin GDC talk) [S24]. For a local single-player game this becomes: design for frustration-free defeat (clear failure feedback, retry, difficulty dials) instead of matchmaking/behavior systems.

### C. What to avoid for a local single-player Unity MOBA

27. **Avoid all netcode, lockstep, and determinism frameworks.** They exist for multiplayer; LeagueSandbox's entire complexity (lobby server, game server, packet defs, protocol emulation) is the multiplayer tax [S31]. Local single-player = one authoritative simulation in one process; the prior dossier's ADR already bans lockstep frameworks for this project.
28. **Avoid the client/server prediction split.** Riot's Spellbook Override complexity [S21][S22] exists only because client and server are separate. In Unity local play, input is a local event; no prediction, no reconciliation, no interpolation. Do not architect "server-authoritative" layers.
29. **Avoid reusing AGPL/GPL MOBA code.** LeagueSandbox is AGPL-3.0 and archived under a Riot cease-and-desist [S31]; AGPL network-copyleft would force source disclosure. Learn from its structure (JSON data + Lua logic packages, data/logic separation) but do not copy code.
30. **Avoid PvP-ops systems with no local value.** Turret plating (a comeback-shaping timing system tuned for 14 min [S3]), three-form Baron [S12], rune pages [S26], surrender voting [S5], ward-tracking trinket meta [S6], champion mastery/rewards [S9] - all tuned for PvP or live ops. Cut for v1; keep only what serves a single player vs AI.
31. **Avoid hard-coded balance numbers.** LoL values churn every patch (plate gold 160 to 175 [S3]; Cash Back 6% to 8% to 7.5% [S26]; Baron spawn 15 to 20 min historically [S12]). Every tunable (wave timers, gold values, respawn curves, AI reaction) belongs in data files, not code - also required by the save-system DTO discipline from the prior dossier.
32. **Avoid ML-Agents and RL for the AI.** Compute evidence [S32][S33] + Mono-only training (prior dossier). Not viable locally; do not plan a training pipeline.
33. **Avoid BinaryFormatter and non-versioned saves.** Prior dossier finding; MOBA adds match-state save (in-progress match resume) as a first-class save shape alongside campaign/menu state.
34. **Avoid trusting community wikis for balance-critical facts.** They contradict each other [S16][S17] and lag patches; mark wiki-sourced numbers as provisional in the build guide.

### D. Single-player translation: AI teammates and opponents

35. **The 5v5-with-one-human shape is proven in PvE.** LoL Co-op vs AI matches teams of humans against all-bot teams on the full map with the full rule set [S9]; MLBB AI Training runs the same shape with allied AI that helps on objectives [S18]. The user's "1 hero + 4 AI allies vs 5 AI enemies" is exactly this shape with one human.
36. **Difficulty tiers are the standard interface.** LoL: Intro/Beginner/Intermediate (wiki) [S9], queues renamed Intro/Beginner/Advanced by Riot [S10]. MLBB: Vs AI Easy/Normal + AI Training hard [S18]. For a local game, tiers map to handicap dials: reaction time, scan frequency, vision, damage/gold multipliers (SC2-style cheating) [S9][prior-dossier ADR].
37. **Bot behavior checklist (from Riot's documented history).** Lane assignment (AD carry + support bottom, tank/bruiser top in early patches) [S34], last-hitting [S34], item builds by difficulty tier [S34], skillshot usage + dodging [S34], threat-scaled scanning [S9], retreat logic [S34], pathing bug fixes for specific spots (Baron pit, turret threat calc) [S34]. This is a v1 feature list for the AI module.
38. **Objective-aware AI is the MLBB differentiator.** Enemy AI stuns at Retribution range (defends objectives), allied AI helps on Turtle/Lord [S18]. The AI must have an objective scheduler (lane push, Turtle/Lord timing, teamfight grouping), not just per-hero scripts.
39. **Macro-goal architecture exists in the literature.** The MGG paper (Honor of Kings, 102 heroes) learns macro-goals from human demonstrations with a Meta-Controller that predicts which macro-goal an agent should pursue [S25]. For a scripted local AI, the same split works: a strategy layer choosing macro-goals (farm, gank, take Turtle, push lane) + a tactical layer executing them.
40. **Teammate AI should support the human, not just fight.** OpenAI Five showed zero-shot cooperation when asked to play with humans [S33]; MLBB allied AI helps on objectives and lanes [S18]. For a local game, allied AI should draft around the user's hero role and peel/initiate based on the user's position - a cheap scripted rule set with large perceived-quality payoff.
41. **Swiftplay-style acceleration is a legitimate PvE tuning lever.** LoL Co-op vs AI runs Swiftplay rules (accelerated progression, faster games) [S9]; MLBB's whole design is acceleration [S19]. A local MOBA can adopt faster waves/gold as the default mode instead of copying PC pacing.
42. **Idle/disconnect handling maps to "AI takeover".** MLBB's temporary AI control of disconnected heroes [S28] is directly reusable locally: if the user pauses or idles, the allied AI takes over their hero; if the user abandons, the AI keeps playing to a natural end.

## Existing solutions (landscape scan)

| Solution | Type | License | Activity | Fit for local single-player Unity MOBA |
|---|---|---|---|---|
| LeagueSandbox/GameServer | OSS (C# LoL server emulator) | AGPL-3.0 | Archived Aug 2022 after Riot C&D [S31] | Learn-only: data/logic separation (JSON data + Lua scripts). Do NOT reuse (AGPL + legal history). |
| StarkMOBA (project3fusion) | OSS Unity template | MIT | 4 stars, 8 commits, no releases | Skip: blockchain (Starknet) demo, no gameplay value. |
| Blast-of-Arena | OSS Unity project | None visible (README cites copyright reasons) | 0 stars, 2021 school project | Skip: unlicensed + multiplayer + Unity 2019.4. |
| OpenAI Five | Research project (paper + replays, not OSS) | n/a | Retired 2019 [S33] | Reference only: proves RL infeasible locally [S32]. |
| llSourcell/OpenAI_Five_vs_Dota2_Explained | Educational repo | MIT | 169 stars, 4 commits | Reference only: algorithm sketch, not a game. |
| MinaPecheux/UnityTutorials-RTS (from prior dossier) | OSS Unity RTS course | MIT | 725 stars | Reuse candidate for RTS-shared mechanics (selection, FOW, behavior trees, event system); not MOBA-specific. |
| OpenRA / 0 A.D. / Warzone2100 (from prior dossier) | OSS RTS engines | GPL-family | Active | Architecture reference only (trait systems, skirmish AI); GPL excludes code reuse for proprietary. |
| Unity Asset Store MOBA kits | Commercial | Proprietary | n/a | Options for art/animation/templates; cost + licensing to be decided by user (open question). |

Scan verdict: no usable open-source cornerstone for a local single-player Unity MOBA exists. The build is from scratch, with the RTS dossier's learn-from constellation as the only code-level references. This matches the prior dossier's ADR (T-2026-08-14-002).

## Build vs. reuse decisions - please confirm

1. **Component "ability/cast system"** - build from scratch (all three references keep kits proprietary; Riot's public write-up describes the prediction problem we do not have [S21][S22]; no OSS MOBA kit exists with a permissive license). Your call: _______
2. **Component "pathfinding"** - reuse A* Pathfinding Project (commercial license, RTS-proven) or Unity NavMesh (built-in, free) per prior dossier [S8][S10 of angle-core]; MOBA maps are small (2-3 lanes) so NavMesh likely suffices. Your call: _______
3. **Component "opponent/teammate AI"** - build from scratch: hierarchical scripted AI (macro-goal layer + tactical layer + handicap dials) per findings 35-42 [S9][S18][S25]. No OSS alternative. Your call: _______
4. **Component "save system"** - build from scratch: JsonUtility/Json.NET over versioned DTOs (prior dossier ADR), with match-state save added for MOBA. Your call: _______
5. **Component "art/animation assets"** - Asset Store / Synty-style packs (commercial) or placeholder primitives first (free). Your call: _______

## Feasibility verdict

- **Can do:** yes
- **Confidence:** HIGH
- **Why:** Every system the genre needs (minion waves, turrets, objectives, economy, kits, fog of war, PvE bot AI) is documented by primary or strong wiki sources [S1-S18], the prior RTS dossier already validated the Unity-side feasibility of the shared systems (pathfinding, save, architecture, AI), and the landscape scan shows no missing dependency - everything is buildable from scratch with documented mechanics. The main uncertainty is scope (which reference's pacing/feature set to copy), which is a user decision, not a feasibility risk.

## Recommendations for the planning agent

- Adopt MLBB's compression levers for the first playable: 10s first minion wave, 30s wave refresh, asymmetric Gold/EXP lanes, tap-to-equip-style instant shop, ~10 min target [S16][S19][S28]. LoL PC pacing (1:05 first wave, 30-40 min games [S1][S15]) is the stretch goal, not the baseline.
- Parameterize every value (wave timers, gold, bounty tiers, turret damage, respawn curves, AI reaction times) in ScriptableObjects/data files; patch-churn evidence [S3][S26] makes hard-coding a maintenance trap.
- Sequence the AI module as: (1) lane assignment + last-hitting + retreat (Riot's documented floor [S34]), (2) objective scheduler (Turtle/Lord timing, gank windows [S18]), (3) handicap dials for difficulty tiers [S9], (4) believability pass (scan rates, dodging, item builds) [S9][S34].
- Use the macro-goal/tactical split from MGG [S25] as the AI architecture: strategy layer picks macro-goals, tactical layer executes per hero kit.
- Include match-state save (resume an in-progress match) in the save-system requirements; the genre's 10-30 min matches make mid-match save a UX expectation.
- Cut list for v1 (findings 30): no plating, no runes, no surrender voting, no 3-form Baron, no ward trinket meta, no champion-mastery rewards.
- The merged dossier must land in `research/moba-unity-2026-08-14/` per the handoff [S-handoff:40]; this angle file is one input.

## Open questions for the user

1. Target platform: PC desktop, mobile-first, or both? (Decides input, camera, match length.)
2. Lane design: symmetric (LoL) or asymmetric Gold/EXP lanes (MLBB)?
3. Match duration target: ~10 min (MLBB), 15-20 (WR), or 30+ (LoL)?
4. AI difficulty philosophy: cheat dials (SC2-style) or honest limits?
5. Art/animation budget: paid Asset Store packs or placeholders first?

## Contradictions and caveats

- Bot queue names: the LoL wiki lists "Intro, Beginner, Intermediate" [S9]; Riot's official dev blog (2024-02-29) names the queues "Intro, Beginner, and Advanced" [S10]. We report both; the Riot blog is authoritative but the wiki may be more current on the final naming. User decides; planning should not hard-code queue names.
- MLBB lane naming: the Minions page calls the extra-gold lane "Gold Lane (non-Turtle Lane)" and the Turtle side the "Experience Lane" [S16]; the Turtle page (and the earlier truncated excerpt) calls the Turtle lane "Gold Lane" [S17]. The mechanics (extra gold vs extra EXP lanes) are consistent across pages; only the names differ. Flagged for design-doc discipline.
- MLBB match duration: 10 min (design goal, naavik [S19]) vs 10-30 min (Wikipedia [S20]); both true - matches run ~10 min on average but can stretch. Plan for a 10-min target with a 20-min ceiling.
- Objective timings: altchar (earlier round, URL not re-captured) reported Herald 16:00 / Baron 25:00; the LoL wiki primaries say Herald 14:00 [S13] and Baron 20:00 [S12]. Resolved in favor of the wiki primaries; the altchar numbers were rejected as stale.
- WR-specific details from 1v9.gg (level cap 15, no turret plating, nexus defends itself): could not re-verify the URL at write time. Corroborated in spirit by WR:Map "abridged, reduced in features" [S14]; marked [UNVERIFIED] - treat as provisional.
- 25.S1.1 minor-rune removals were reported by secondary outlets in an earlier round (URL not re-captured); the current live rune list (keystones + minor runes) is directly verified from the Cash Back page [S26]. Claim restricted to what is verified.

Could not verify: WR-specific bot difficulty names (support page is a JS app; webfetch returned only a loading shell). WR bot details remain [UNVERIFIED]; the PC-side bot evidence [S9][S10][S34] is the cited base.

## Reference table

| # | Source | Type | URL | Access date |
|---|--------|------|-----|-------------|
| [S1] | LoL Wiki - Minion | wiki | https://wiki.leagueoflegends.com/en-us/Minion | 2026-08-14 |
| [S2] | LoL Wiki - Super minion | wiki | https://wiki.leagueoflegends.com/en-us/Super_minion | 2026-08-14 |
| [S3] | LoL Wiki - Turret | wiki | https://wiki.leagueoflegends.com/en-us/Turret | 2026-08-14 |
| [S4] | LoL Fandom - Kill | wiki | https://leagueoflegends.fandom.com/wiki/Kill | 2026-08-14 |
| [S5] | LoL Wiki - Surrendering | wiki | https://wiki.leagueoflegends.com/en-us/Surrendering | 2026-08-14 |
| [S6] | LoL Wiki - Ward | wiki | https://wiki.leagueoflegends.com/en-us/Ward | 2026-08-14 |
| [S7] | LoL Fandom - Shop | wiki | https://leagueoflegends.fandom.com/wiki/Shop | 2026-08-14 |
| [S8] | LoL Fandom - Gold (sell 70%/40%) | wiki | https://leagueoflegends.fandom.com/wiki/Gold_(League_of_Legends) | 2026-08-14 |
| [S9] | LoL Wiki - Co-op vs. AI | wiki | https://wiki.leagueoflegends.com/en-us/Co-op_vs._AI | 2026-08-14 |
| [S10] | Riot dev blog - /dev: New Bot AI, Oh My! (14.6) | official-docs | https://www.leagueoflegends.com/en-us/news/dev/dev-new-bot-ai-oh-my-coming-14-6 | 2026-08-14 |
| [S11] | League of Legends - How to Play (official) | official-docs | https://www.leagueoflegends.com/en-us/how-to-play/ | 2026-08-14 |
| [S12] | LoL Wiki - Baron Nashor | wiki | https://wiki.leagueoflegends.com/en-us/Baron_Nashor | 2026-08-14 |
| [S13] | LoL Wiki - Rift Herald | wiki | https://wiki.leagueoflegends.com/en-us/Rift_Herald | 2026-08-14 |
| [S14] | LoL Wiki - WR:Map | wiki | https://wiki.leagueoflegends.com/en-us/WR:Map | 2026-08-14 |
| [S15] | Wikipedia - League of Legends: Wild Rift | web | https://en.wikipedia.org/wiki/League_of_Legends:_Wild_Rift | 2026-08-14 |
| [S16] | MLBB Fandom - Minions (raw wikitext) | wiki | https://mobile-legends.fandom.com/wiki/Minions | 2026-08-14 |
| [S17] | MLBB Fandom - Turtle | wiki | https://mobile-legends.fandom.com/wiki/Turtle | 2026-08-14 |
| [S18] | MLBB Fandom - AI Training | wiki | https://mobile-legends.fandom.com/wiki/AI_Training | 2026-08-14 |
| [S19] | Naavik - Mobile Legends deep dive | web [secondary] | https://naavik.co/deep-dives/mobile-legends-bang-bang/ | 2026-08-14 |
| [S20] | Wikipedia - Mobile Legends: Bang Bang | web | https://en.wikipedia.org/wiki/Mobile_Legends:_Bang_Bang | 2026-08-14 |
| [S21] | Riot tech blog - The Art of Spell Casting (part 1) | official-docs | https://technology.riotgames.com/news/art-spell-casting-part-1 | 2026-08-14 |
| [S22] | Riot tech blog - The Art of Spell Casting (part 2) | official-docs | https://technology.riotgames.com/news/art-spell-casting-part-2 | 2026-08-14 |
| [S23] | Game Developer - MOBA introduction and analysis | web | https://www.gamedeveloper.com/design/moba-introduction-and-analysis | 2026-08-14 |
| [S24] | Game Developer - Jeffrey Lin, fixing toxic behavior in LoL | web | https://www.gamedeveloper.com/design/fixing-toxic-online-behavior-in-league-of-legends | 2026-08-14 |
| [S25] | arXiv 2110.14221 - Learning Diverse Policies in MOBA Games via Macro-Goals | academic | https://arxiv.org/abs/2110.14221 | 2026-08-14 |
| [S26] | LoL Wiki - Cash Back (rune system live proof) | wiki | https://wiki.leagueoflegends.com/en-us/Cash_Back | 2026-08-14 |
| [S27] | mlbb.io - Claude hero page (kit shape) | web [secondary] | https://mlbb.io/en/hero/claude | 2026-08-14 |
| [S28] | soft112 - MLBB product page (controls, match length, AI takeover) | web [secondary] | https://mobile-legends-bang-bang-ios.soft112.com/ | 2026-08-14 |
| [S29] | LOL Brain - Objective timers guide | web [secondary] | https://www.lol-brain.com/blog/objective-timers-guide | 2026-08-14 |
| [S30] | Strafe - Baron Nashor guide | web [secondary] | https://www.strafe.com/articles/read/baron-nashor-guide/ | 2026-08-14 |
| [S31] | GitHub - LeagueSandbox/GameServer | web | https://github.com/LeagueSandbox/GameServer | 2026-08-14 |
| [S32] | arXiv 1912.06680 - Dota 2 with Large Scale Deep RL | academic | https://arxiv.org/abs/1912.06680 | 2026-08-14 |
| [S33] | OpenAI - OpenAI Five defeats Dota 2 world champions | official-docs | https://openai.com/index/openai-five-defeats-dota-2-world-champions/ | 2026-08-14 |
| [S34] | LoL Wiki - Bots | wiki | https://wiki.leagueoflegends.com/en-us/Bots | 2026-08-14 |

## Self-critique

- **Did I do my job?** Partial. The games teardown is citation-rich and covers all four user question blocks, but the WR-specific bot/AI details remain unverified (support page is a JS app that webfetch cannot render), and two earlier secondary URLs (altchar timings, 1v9.gg WR details, rune-removal articles) were not re-captured after compaction and are marked [UNVERIFIED] instead of cited.
- **What might I have missed?** (1) Live gameplay verification - all sources are wikis/blogs; no in-game testing was possible from this environment. (2) WR support pages and WR-specific AI difficulty names. (3) Deeper MLBB item shop economics (tier-1 to tier-3 items, recipes) - covered only at the surface via [S19]. (4) Exact LoL wave composition counts per wave type (melee/caster/siege counts) - the Minion wiki page was cited for spawn timing but the per-wave composition numbers were not re-fetched this session. (5) Camera/controls for WR specifically.
- **What did I assume without evidence?** (1) That the master will merge angle files into `research/moba-unity-2026-08-14/` - the folder is the handoff's requirement, not mine to create (I write only `share/notes/`). (2) That "user hero + 4 AI allies" means a 5v5 on a 3-lane map (the user's message implies it; flagged as clarifying question 2's default). (3) That Swiftplay rules (acceleration) apply to the whole Co-op vs AI queue - cited from the wiki [S9], single-source.

## Metrics

- findings: 42
- risks_HIGH: 3
- risks_MEDIUM: 3
- risks_LOW: 2
- clarifying_Qs: 5