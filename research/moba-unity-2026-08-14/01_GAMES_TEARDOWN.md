# 01 - Games Teardown: What to Copy, Face, and Avoid

**Angle:** games | **Findings:** 42 | **Sources:** S24-S65, S88 | **Verdict:** Clone LoL/MLBB rules for minions, turrets, gold, vision; Dota 2 for bot design; avoid MOBA-typical online-first complexity (netcode, matchmaking, anti-cheat) entirely - this product is local single-player.

---

## 1. Why a teardown

We are building a local, single-player MOBA in Unity. The genre's rules are not invented fresh; the four reference titles (LoL, Dota 2, MLBB, Wild Rift) have spent a decade tuning the same core loop. This chapter extracts, per game: what to copy (do), what will bite us (face), what to avoid (avoid), and how each translates to a local single-player product.

## 2. League of Legends

Sources: S24 (official How to Play), S25 (Riot bot blog 14.6), S28 (Riot "Making a More Human Bot"), S36 (minions), S38 (turrets), S41 (wards), S43 (gold), S44 (Co-op vs. AI), S45 (bots), S53 (brush).

### Do
- **Minion wave model** [S36]: 3 melee + 3 caster per wave per lane, spawn every 30s, aggro rules (minions attack nearest enemy or the enemy champion that attacks an allied champion nearby). This is the skeleton of lane pacing. Copy the aggro rules verbatim-ish; they create the "wave management" depth that makes lanes interesting.
- **Turret model** [S38]: turret prioritizes minions, switches to champions only when a champion attacks an allied champion in range; high damage falloff per consecutive hit (amplifying damage). Simple, readable, and teaches positioning.
- **Gold economy** [S43]: passive gold + per-last-hit gold + champion-kill bounties. Last-hit tension is the single biggest "skill feel" in the genre; keep it.
- **Wards/vision** [S41]: limited-view cone, brush hides units [S53]. Vision denial creates the fog-of-war information game.
- **Co-op vs. AI as the core mode** [S44]: Riot's own beginner mode is bot-vs-player on the real map with simplified queue names; this is exactly our product shape. Copy the structure: full map, bots, no ranked stakes.
- **Bot heuristic philosophy** [S25, S28]: Riot's human-like bots use per-player behavioral archetypes and constraints (staggered reactions, bounded precision), not raw simulation. Steal this framing for 03_OPPONENT_AI.

### Face
- **Match length**: 20-35 min [S24] vs our likely 10-15 min target. Our minion spawn cadence and tower HP must be tuned to compress the arc, not copied 1:1.
- **Skill ceiling**: LoL's depth (wave manipulation, recall timing, jungle timers) is built on a 5v5 human meta; a solo player vs bots will not generate the same dynamics. Accept a shallower game or script richer bot behavior (03).
- **Bot queue name contradiction**: wiki [S44] lists Intro/Beginner/Intermediate; Riot's own blog [S25] lists Intro/Beginner/Advanced. Adjudication: Riot's blog wins for naming (primary source), wiki for mechanics.

### Avoid
- **Online dependency**: LoL is online-only; we have zero netcode (ADR 6). Nothing from LoL's server architecture transfers.
- **Champion roster bloat**: 160+ champions [S24]; we need 1-3 playable at MVP (Q5).
- **Rune/mastery meta-layers**: added complexity with no single-player payoff at MVP.

## 3. Dota 2

Sources: S63 (official Dota 2 Wiki Bots), S88 ([UNVERIFIED] community bot threads), S90 (arXiv Dota 2 RL study).

### Do
- **Bot system as the reference implementation** [S63]: Dota's official bots are scripted with lane assignments, item timings, and difficulty tiers (Passive/Easy/Medium/Hard/Unfair). This is the strongest documented scripted-bot design in the genre; 03 models our hero brain on its structure.
- **Bot difficulty tiers** [S63]: named tiers with dial changes are the cleanest difficulty model we found; our Q6 asks cheat-dials vs honest-limits, and Dota proves named tiers work.
- **Creep aggro rules** [S90, community]: Dota's aggro-on-attack-command detail (creeps react to the attack command, not just damage) is deeper than LoL's; a simplified version is cheap and adds texture.

### Face
- **Complexity wall**: Dota's itemization (active items, couriers, deny mechanics) is the genre's heaviest; copy the bot structure, not the item depth.
- **RL literature is aspirational, not actionable** [S90]: OpenAI Five (S35) and the arXiv study [S90] prove RL bots beat humans with enormous compute; we explicitly choose scripted AI (ADR 5). Cite them only to justify the choice.

### Avoid
- **Deny mechanics** (killing your own creeps): a skill mechanic that adds little for a solo player vs bots.
- **Turn rates**: Dota's turn-rate movement is a simulation realism artifact that feels bad without the human-vs-human context.
- **Couriers**: logistics depth with no payoff locally.

## 4. Mobile Legends: Bang Bang (MLBB)

Sources: S58 (minions), S59 (Turtle/Lord), S60 (AI Training mode), S61 (bush), S62 (Vs. AI mode), S65 (Wikipedia).

### Do
- **AI Training / Vs. AI modes as product precedent** [S60, S62]: MLBB ships dedicated single-player bot modes with progressive difficulty; validates that a MOBA can be a solo product.
- **Match pacing** [S65]: ~10 min average match; closest to our target duration (Q3). Copy MLBB's compressed economy curve (gold/XP ramp) more than LoL's.
- **Bush/vision simplified** [S61]: MLBB's bush rules are simpler than LoL's; good default if Q11 picks simplified brush rules.

### Face
- **Duration contradiction**: Wikipedia [S65] says 10-30 min; MLBB marketing says ~10 min. Adjudication: 10 min is the design target (marketing), 30 min is the outlier ceiling (real matches); target 10-15 (Q3).
- **Lane naming contradiction**: Minions page [S58] vs Turtle page [S59] disagree on which lane is "Gold" vs "EXP" (asymmetric 5v5 layout). Adjudication: treat lane economy roles as a design decision (Q4), not a fact to copy; symmetric lanes avoid the contradiction entirely.
- **Asymmetric map**: 3 lanes + jungle with a Turtle and a Lord [S59] adds objective timing complexity; fine for AI lane assignment but Q4 must pick.

### Avoid
- **Auto-battle assists / auto-pilot**: MLBB's accessibility assists are designed for mobile thumb fatigue; a desktop solo player does not need them, and they fight the skill feel.
- **Gacha/hero-shop monetization**: nothing to copy; we are not monetizing (prototype scope).

## 5. Wild Rift

Sources: S31 (Riot chooses Unity), S32 (WR minimum specs), S64 (Wikipedia).

### Do
- **Unity engine precedent** [S31]: WR is Riot's Unity MOBA; proves Unity is a credible engine for this genre at commercial scale. Our ADR 1 (Unity 6.3 LTS) is aligned.
- **Mobile perf discipline** [S32]: WR's minimum-spec tuning (draw calls, memory, frame pacing) is a checklist for our URP settings (05).
- **Compressed match length** [S64]: WR targets 15-20 min; middle ground between LoL and MLBB (Q3 options).

### Face
- **Touch-first controls** [S64]: WR is touch-first; our Q1 asks desktop-first vs Android-first. Desktop-first means joystick-lite mouse controls; Android-first means virtual joystick + ability buttons. The control scheme decision changes input system work (S2, S3) significantly - decide Q1 before building.

### Avoid
- **Skin monetization pipeline**: cosmetic economy is out of scope.
- **Matchmaking/ranked**: out of scope (ADR 6).

## 6. What the genre is NOT telling us (translation rules)

1. **Single-player changes the economy of attention**: no human opponents means no psychological pressure; bot behavior must manufacture pressure (03). LoL/Dota balance is tuned for humans; our tuning target is "fun vs scripted opponent".
2. **Session length is a product decision, not a genre law**: Q3. Compress by scaling minion HP/gold curves, not by removing systems.
3. **No matchmaking means no ELO**: difficulty must be a setting (Q6), not a ladder.
4. **Local simulation frees us from netcode**: everything is synchronous; no lockstep, no prediction, no reconciliation (ADR 6). This is the single biggest simplification the genre teardown buys us.

## 7. Risks (this chapter)

- HIGH: Cloning LoL/Dota rules without tuning for solo play produces a boring or overwhelming first hour (mitigate: 07 phase plan gates every system on a playtest loop).
- MEDIUM: Bot queue naming / lane naming contradictions resolved by judgment; if Q4 picks MLBB asymmetric lanes, re-derive lane rules from a single source (S58 or S59, pick one) to avoid internal drift.
- MEDIUM: MLBB-duration 30 min outlier could mislead pacing estimates if cited alone (adjudicated above).