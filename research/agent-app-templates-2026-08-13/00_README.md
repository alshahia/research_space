# 00_README - Agent-facing app-template family

**Task:** T-2026-08-13-003 (research dossier, master synthesis)
**Date:** 2026-08-13
**Owner:** am-research
**Status:** research only. No plan, no code. Decisions pending in `07_OPEN_QUESTIONS.md`.

---

## The verdict in one screen

| # | User's question | One-line answer | Pointer |
|---|---|---|---|
| 1 | Does an open-source system already do this? What can be forked? | **No full fork exists.** Three projects (bolt.diy, gpt-engineer, Aider) cover parts of the loop. Build by assembly, not fork. | `05_PRIOR_ART_AND_COMPETITORS.md` Part 1 |
| 2 | How does it compare to commercial prompt-to-app tools? | The closed tools converged on **generate-first** with a one-shot bounded ask. Our design matches that posture, with the bounded ask as a first-class artifact. | `05` Part 5; `04_INTAKE_PROTOCOL.md` |
| 3 | What to use and what to avoid, per kind of app? | **8 templates** total: `tier0-minimal` + `tier1-standard` + 5 tier2 (ai-chat, mobile, saas-bundle, storefront, tooling) + `cinematic-landing`. SaaS / CRUD / content are tier1 plus layers, not tier2. | `02_STACK_MATRIX.md` |
| 4 | How does the agent build a minimum working app on the shortest token path? | **Copy a checked-in 10-file spine, then edit 15 to 20 deltas.** Cuts a Tier 1 build from ~$3.01 uncached to ~$1.11, a **2.7× USD reduction**, driven by a 63% output-token reduction (~181,000 to ~66,500 tokens). | `03_TOKEN_ECONOMY.md` Headline |
| 5 | How should intake and clarification work? | **One bounded multi-choice intake at project start (3 to 6 fixed axes plus 0 to 4 adaptive, hard cap 10 questions), then generate-first for the build loop.** Written restate-and-confirm artifact gates the first build. | `04_INTAKE_PROTOCOL.md` |
| 6 | What is wrong with the existing template? | **20 to 25% survival rate.** Single biggest defect: 58 KB of prose with zero runnable files. WatermelonDB drops from default. "No comments" and "no test framework" rules reverse. Arabic/RTL flips to opt-in. | `06_TEMPLATE_AUDIT.md` Headline |

---

## What to build (the one-paragraph shape)

A portable, cross-runtime template family whose root file is an `AGENTS.md` (~500 tokens), with one `SKILL.md` per tier (~3,000 tokens each, Anthropic Skills progressive disclosure), and a per-tier folder shape borrowed from `agents_manager/templates/cinematic-landing/` (`memory/` + `skeleton/` + `prompts/` + `decisions/` + `00-readme-first.md`). The skeleton is **real, runnable code** (~10 files / ~2,500 LOC) checked into the spine, not prose to interpret. Optional layers (auth, payments, charts, mobile shell, realtime, UI components) live behind deterministic CLI commands (`npx shadcn add`, provider CLIs), not in the checked-in base. On the user side, one bounded multi-choice intake runs before any code is generated. Then the agent copies the spine, edits the delta, runs `tsc --noEmit && npm run build` to verify, and writes the spec artifact (`SPEC.md`) for the user to edit mid-build. Details in `01_RECOMMENDED_DESIGN.md`.

---

## The numbers that matter

| Figure | Value | Unit | Main assumption |
|---|---:|---|---|
| USD reduction, single Tier 1 build | **2.7×** | USD, uncached | Sonnet 4.6 ($3/$15 per MTok); 22 tokens per line of generated TSX |
| USD reduction, single Tier 1 build | **2.5×** | USD, cached | cache reads at 0.1× input |
| Output-token reduction | **63%** | tokens (181,000 → 66,500 per build) | Same A8 = 22 tokens/line |
| Spine size | **~10 files / ~2,500 LOC** | files / lines | UI library moved behind `npx shadcn add` |
| Template count | **8** | entries | tier0 + tier1 + 5 tier2 + cinematic-landing |
| Intake question cap | **10** (Tier 2); 8 (Tier 1); 4 (Tier 0) | questions | per-tier budget, hard cap |
| Recommended design cached cost | **$1.09** | USD per Tier 1 build | Sonnet 4.6, mixed cache; see `03` §4.2 for cell arithmetic |
| Current template cached cost | **$2.74** | USD per Tier 1 build | Same model, same A8 |
| Maintenance burden | **1 to 2 days per quarter** | engineer-days | React 19 / Tailwind v4 / Vite 8 majors land in that window |
| Breakeven vs naive generation | **~10 builds per quarter** | builds | below that, checked-in spine is a net loss |

Every number above was re-verified on 2026-08-13 against `npm view <pkg> version` and the cited official docs. Two library versions that appeared in the angle corpus were hallucinated and have been corrected in `02_STACK_MATRIX.md` (Vite `7.8.0` → `^8.2.1`; Prisma `8.0.14` → `^7.9.1`).

---

## Three reading paths

Pick the path that matches your role.

### Path A - Decision-maker (15 minutes)

1. `00_README.md` (this file) - the verdict and the open questions.
2. `01_RECOMMENDED_DESIGN.md` - Decision 1 (file-format convention), Decision 4 (tier and kind map), Decision 6 (self-verification). Three pages is enough to act on.
3. `07_OPEN_QUESTIONS.md` - the seven decisions only the user can make. Stop here. Hand to the planner or coder next.

### Path B - Builder (60 minutes)

1. `00_README.md` (this file).
2. `01_RECOMMENDED_DESIGN.md` end to end, including the end-to-end flow and the maintenance story.
3. `02_STACK_MATRIX.md` - the master matrix and the per-kind deep dives, for the template you are about to implement.
4. `06_TEMPLATE_AUDIT.md` Parts 3 and 4 - the gap matrix and the actively-harmful rules to avoid when transcribing the existing template's survivors into the new shape.
5. `03_TOKEN_ECONOMY.md` §5 - the hybrid-skeleton maintenance budget, to set your quarterly cadence.
6. `04_INTAKE_PROTOCOL.md` - to wire the question bank into your template's `00-readme-first.md`.

### Path C - Runtime consumer (an agent reading this at build time)

1. The family-root `AGENTS.md` (~500 tokens; the load-bearing router).
2. The `tier<N>-<kind>/SKILL.md` for the matching tier (~3,000 tokens; matches the Kind axis answer).
3. `templates/<tier>/skeleton/` (the 10-file real-code base; `cp -r` instead of generating).
4. `04_INTAKE_PROTOCOL.md` only if the Kind or Tier answer is ambiguous and the agent needs the question bank as a fallback.
5. Skip `02`, `03`, `05`, `06` entirely. They are documentation for the human author of the templates, not for the consumer at build time.

---

## Chapter map

| File | What it answers | Size | Audience |
|---|---|---:|---|
| `00_README.md` | The verdict, the numbers, the reading paths | ~250 lines | Everyone, start here |
| `01_RECOMMENDED_DESIGN.md` | The architecture, in concrete terms a builder can implement | ~400 lines | Builder, planner |
| `02_STACK_MATRIX.md` | What to use and why, per app kind | 69 KB (1,058 lines) | Builder per kind |
| `03_TOKEN_ECONOMY.md` | The cost model and the shortest-path sequence | 42 KB (430 lines) | Decision-maker, builder |
| `04_INTAKE_PROTOCOL.md` | The bounded multi-choice intake, stop rule, restate artifact | 30 KB (354 lines) | Builder, runtime agent |
| `05_PRIOR_ART_AND_COMPETITORS.md` | Fork-or-build verdict, commercial landscape, file-format convention | 54 KB (372 lines) | Decision-maker |
| `06_TEMPLATE_AUDIT.md` | What is wrong with `resources/general-app-template`, per-rule verdicts | 42 KB (332 lines) | Builder, planner |
| `07_OPEN_QUESTIONS.md` | The seven decisions only the user can make | ~150 lines | Decision-maker |
| `99_SOURCES.md` | Consolidated, deduplicated source table for the dossier | ~250 lines | Reviewer, auditor |

The 3 reading paths above map onto these files. The chapter map above maps onto the files. The numbers table above is the headline; everything else is evidence.

---

## How this research was produced, and how far to trust it

Six parallel research angles ran on 2026-08-13:

- **Angle A** - open-source prior art, ~7,400 words across a 43-row project matrix.
- **Angle B** - commercial competitor teardown across 16 prompt-to-app tools along 7 fixed axes, ~9,400 words.
- **Angle C** - 8-kind app matrix with per-kind deep dives, ~7,800 words; produced the `02` chapter after correction.
- **Angle D** - token economy and shortest-path cost model, ~4,800 words; produced the `03` chapter after correction.
- **Angle E** - intake and requirement elicitation protocol, ~5,400 words; produced the `04` chapter.
- **Angle F** - audit of the existing template, ~6,500 words; produced the `06` chapter.

A Tier 4 verifier pass (`share/reports/01_verify_T-2026-08-13-003.md`) returned **FAIL** on the raw corpus. Five classes of defect were caught:

1. **Two hallucinated npm version numbers** in Angle C. `Vite 7.8.0` does not exist on npm (highest 7.x is `7.3.6`, current latest is `8.2.1`); `Prisma 8.0.14` does not exist (Prisma's current latest is `7.9.1`). An agent following the original recommendations would have hit `npm install` failure on the first build. Both corrected in `02_STACK_MATRIX.md`.
2. **A 6× arithmetic error in the token-economy cached column** of Angle D, which propagated to the cached USD totals. Corrected; the recomputed headline is **2.7× USD reduction** (not the broken $2.71 vs $0.89 figure). The unit-of-measurement is now labelled inline in `03`.
3. **An unreconciled contradiction between Angle B (generate-first) and Angle E (ask-first)** that would have shipped two opposing verdicts. Reconciled in `04` and adopted across the dossier: **one bounded multi-choice intake at project start, then generate-first**.
4. **A skeleton-size disagreement** between Angle D (15 to 20 files) and Angle F (~10 files). Picked the smaller (~10 files / ~2,500 LOC) with the UI library moved behind `npx shadcn add`.
5. **Three patch-drift library versions** (Clerk `7.4.2` → `^7.7.4`; Commander `14.0.3` → `^15.0.0`; Anthropic SDK `0.100.1` → `^0.116.0`) and **one major-line drift** (Astro `6.4.2` → `^7.2.1`). Bumped in `02`.

What remains unverified:

- **~9 to 11 stack items in `02` are marked `[UNVERIFIED]`** because they are either registry-shaped (shadcn/ui is not on npm), well-known to the verifier but not fetched on 2026-08-13 (Auth.js v5, `react-markdown` + plugins, `lucide-react`, `recharts`, `@hookform/resolvers`, Pagefind, TanStack Table), or behind a sign-in wall. The recommendation is **planner verifies with `chub get <id>` at plan time** before pinning in a new skeleton.
- **The scaffolder non-interactive claims** in `02` (the verdict matrix on `create-vite`, `create-next-app`, `create-expo-app`, `shadcn add`, `create-t3-app`, `Wasp`, `WunderGraph`, `Redwood`, `Better-T-Stack`, etc.) rest on README claims and the `agents.md` project convention; **none was empirically tested with `< /dev/null`** by this dispatch. A planning pass should run each scaffolder under a non-interactive shell before locking the tier routing.
- **The cost model is a model, not a measurement.** Every USD figure in `03` is arithmetic on the stated assumptions (A8 = 22 tokens/line, Sonnet 4.6 pricing, mixed-cache). A pilot run with N=10 distinct Tier 1 app briefs across at least 3 different agents is the cheapest way to validate or kill the headline. See `03` §"How to measure this system" for the exact protocol.
- **Two leaked system-prompt citations** in `05` (Sources S7, S9, S10, S13, S16) carry an `[UNVERIFIED-CURRENCY]` tag. The mechanism claims (generate-first default, search-replace ops, AGENTS.md convention) are independently verified against the vendors' public docs. The verbatim prompt text may differ from the production prompt.
- **The bot / CLI extension kind** is unresolved (Q6 selected "Bot / extension / CLI" as a deep-dive kind; Q7 restricted the family to UI apps). `02` recommends Option C (shared spine plus three shims), but this needs the user's explicit confirmation. Surfaced in `07_OPEN_QUESTIONS.md`.

A reader should finish this section knowing exactly which parts are solid (file-format convention, intake protocol, tier-and-kind map, USD headline at Sonnet 4.6 + 22 tok/line) and which need a pilot (cost model, scaffolder non-interactive behavior, `chub` verification of `[UNVERIFIED]` items).

---

## Status and what happens next

This task shipped research only. `tasks/T-2026-08-13-003.md` rows for `P2T1` and `P2G` are deferred (`skipped (deferred to a follow-up task)` per `share/handoffs/00_scope_confirmed_T-2026-08-13-003.md` Q1). Nothing in this directory should be treated as a plan or a spec for code; it is the evidence base for a plan that does not exist yet.

The seven decisions that gate any next step are in `07_OPEN_QUESTIONS.md`. None of them is technical; all of them are scope calls the user must make before a planner can lock anything. Until they are answered, the safest action is to leave `resources/general-app-template/` in place and not start a new template family beside it.

### What NOT to do with this dossier yet

Three failure modes the user should avoid:

1. **Do not start a new template family beside `resources/general-app-template/` until Q1 to Q3 in `07_OPEN_QUESTIONS.md` are answered.** A parallel folder created now will collide with whatever shape the user settles on, and the cost of merging two partially-built template families is much higher than building one correctly.
2. **Do not pin the version numbers from `02` into a fresh `package.json` and call it done.** Several items are marked `[UNVERIFIED]`; the recommended move is `chub get <id>` at plan time. The verifier (`share/reports/01_verify_T-2026-08-13-003.md`) explicitly accepts these on the dossier's mitigation, but the mitigation is a promise, not an action.
3. **Do not act on the 2.7× USD headline as if it were measured.** It is a model. If a planning or marketing document cites the headline, it must carry `[MODEL]` and a link to the pilot protocol in `03` §"How to measure this system".

### What IS safe to do now

- Read the dossier. The three reading paths above map to the role you are playing.
- Validate one or two `[UNVERIFIED]` items with `chub get <id>` if a downstream decision cannot wait for the user's seven answers.
- Compare the dossier's recommendations to the existing `resources/general-app-template/` for any in-flight project. The migration summary in `01` §"What this replaces" plus the gap matrix in `06` Part 3 are the right pair of references.

### The seven decisions, in priority order

If the user has limited time, the priority order to answer the open questions is:

1. **Q1** (tier2-tooling: bot and CLI in or out) - blocks the intake protocol and the family shape.
2. **Q3** (repair in place vs new beside) - blocks any actual file edits.
3. **Q6** (maintenance owner) - blocks the skeleton's release plan.
4. **Q2** (build order) - blocks the implementation schedule.
5. **Q7** (pilot measurement) - validates or kills the cost headline.
6. **Q5** (`[UNVERIFIED]` verification policy) - blocks every `package.json` write.
7. **Q4** (Astro 6 vs 7), **Q8** (SaaS graduation), **Q9** (5 to 7× footnote) - non-blocking; can be deferred.

After Q1 to Q3, the next-step conversation can start. Until then, the dossier is the deliverable.