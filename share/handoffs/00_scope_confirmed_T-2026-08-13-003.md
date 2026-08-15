# Confirmed scope - T-2026-08-13-003 (round 1)

**Date:** 2026-08-13
**Source:** master scoping questions, user answers verbatim below.

## Q1 - How far does this task go?

**Answer: Research dossier only.**

Stop after Phase 1 (research) plus the Tier 4 verifier pass. No plan, no build in this task. Master presents the dossier; user decides what to build next.

Implication: `tasks/T-2026-08-13-003.md` rows P2T1 and P2G become `skipped (deferred to a follow-up task)`.

## Q2 - How broad should the template system be?

**Answer (verbatim):** *"all of them , its not a bad idea to have one minimam template for quicke simple app and full template for more complex app ,and many template for specialist kind app , discuss with me about it , if some thing unclear ask me"*

Reading: a **tiered template family**, not a single template and not one-template-per-app-kind.

- **Tier 0 - minimal**: quick simple app
- **Tier 1 - standard/full**: complex app
- **Tier 2 - specialist**: many templates, one per app kind

The user explicitly requested discussion on this before research is dispatched. Round 2 questions cover: which specialist kinds to prioritize, whether non-UI targets are in scope, and how the skeleton is delivered.

## Q3 - What is the "input field"?

**Answer: just the agent's chat prompt.** No intake UI to design or build. Angle E studies the clarification protocol as a prompt-level protocol, not a product surface.

## Q4 - Target agent runtime

**Answer: any agent, portable markdown.** Templates must work in Kilo, Claude Code, Cursor, OpenCode, Codex. No runtime lock-in. Do not assume the agents_manager pipeline is present.

Implication: no dependency on `opencode.jsonc`, on `task()` dispatch, or on the 9-memory-file `templates/<name>/` convention. Those may be an optional adapter, never a requirement.

## Q5 - Non-negotiables

**Answer: nothing is fixed.**

Everything in the current `resources/general-app-template` is open to challenge, including:

- React 18 + TypeScript as the web layer
- Arabic / `dir="rtl"` as the default UI language
- WatermelonDB + LokiJS adapter for data
- better-sqlite3 + Express for the server
- Capacitor / Android as a build target
- "no test framework" rule
- "no comments in code" rule
- Tailwind v4 via `@tailwindcss/vite`

Research must justify or replace each, with evidence and access dates. "It is already in the template" is not a justification.

---

# Round 2 - tiered-family discussion

Master proposed a concrete shape (shared `_spine/` + tier0-minimal + tier1-standard + tier2-`<kind>`, router-first reading, skeleton-as-real-code, tiers inherit rather than fork, deterministic CLI where possible). Three follow-up questions were asked.

## Q6 - Which specialist kinds get a deep dive?

**Answer: AI chat / LLM tool, Mobile app, SaaS with auth and billing, Storefront / e-commerce, Content / docs site, Bot / extension / CLI.**

**Not picked: Landing / marketing page, CRUD dashboard / admin panel.**

Master's reading of the omission (to be validated by Angle F, not assumed): both are already covered in-house. `agents_manager/templates/cinematic-landing/` is a shipped landing template, and the existing `resources/general-app-template` is effectively a CRUD-dashboard template. Both still get a one-line row in the Angle C matrix; neither gets a deep dive.

## Q7 - Non-UI targets?

**Answer: apps with a UI only.** No API-only service, worker, data pipeline, or scraper templates.

**Unresolved tension, delegated to research (do NOT re-ask the user):** Q6 selected `Bot / extension / CLI` as a deep-dive specialist kind, but Q7 restricts the family to UI apps. A Chrome extension has UI; a Telegram bot and a CLI do not. Angles C, D, and F must resolve whether these share the UI spine, need a separate minimal spine, or should be split (extension in, bot/CLI out). Surface the resolution and its reasoning in the dossier as an explicit decision for the user, with a recommendation.

## Q8 - Skeleton delivery mechanism

**Answer: hybrid - minimal runnable skeleton checked in, plus commands for optional layers.**

The base skeleton is a real folder where `npm install` and `npm run dev` are green before the agent touches it. Optional layers (auth, payments, charts, mobile shell, realtime) are delivered as exact commands the agent runs (`npx shadcn add`, provider CLIs, and so on) rather than as checked-in code.

Angle D must stress-test this: which layers genuinely belong in the checked-in base, which belong behind commands, and what the maintenance cost of the checked-in half actually is (dependency drift, lockfile rot, framework major versions).

---

## Net effect on the research plan

| Angle | Change from provisional plan |
|---|---|
| A prior-art OSS | unchanged |
| B competitors | unchanged |
| C app-kind matrix | now must produce a **ranked specialist-template shortlist** for Tier 2, not just advisory guidance |
| D token economy | now the load-bearing angle: the tier router and skeleton-delivery mechanism live or die here |
| E intake protocol | scoped to prompt-level protocol only, no UI design |
| F audit of existing template | now an unconstrained audit; nothing is protected |

New requirement across all angles: every recommendation must be **portable markdown**, no agent-runtime-specific mechanism.
