---
task_id: T-2026-08-13-003
chapter: 06
title: Template Audit, what is wrong with resources/general-app-template
date: 2026-08-13
sources_used:
  - share/notes/01_research_T-2026-08-13-003_angle-f-audit.md (primary)
  - share/reports/01_verify_T-2026-08-13-003.md (cross-angle agreement)
  - resources/general-app-template/ (path-and-line verification)
re_verified_independently:
  - WatermelonDB npm + GitHub (2026-08-13)
  - react-router npm (2026-08-13)
  - better-sqlite3 npm (2026-08-13)
  - motion npm (2026-08-13)
---

# 06, Template Audit

## Headline

Roughly **20 to 25 percent** of the existing template survives into the new design. The single biggest defect is that the template is **58 KB of prose with zero runnable files**, so every agent that picks it up has to author every config and source file from a description. The one thing most worth keeping is the **audit-logging pattern** (`logCreate / logUpdate / logDelete` called from every mutation; `resources/general-app-template/APP_ARCHITECTURE_GUIDE.md:566-588`): small, concrete, kind-agnostic, and easy to absorb into any data-layer adapter.

---

## Part 1: Inventory

Total: **58,138 bytes across 10 files**, **1,720 lines of prose**, **0 lines of runnable code** (one `package.json` template; everything else is markdown).

| File | Bytes | Lines | Purpose | Earns its place? |
|---|---:|---:|---|---|
| `INDEX.md` | 2,265 | 51 | File map, reading order, customization points | **No.** Cosmetic. The reading order puts `SYSTEM_PROMPT_AGENT.md` first but `AGENT_INSTRUCTIONS.md`'s 8-phase plan duplicates it. An agent greps for prose anyway. |
| `SYSTEM_PROMPT_AGENT.md` | 2,146 | 33 | Behaviour contract, 10 principles, prohibited actions | **Partial.** The 10 principles survive as a TL;DR; the prohibited-actions list duplicates `RULES_GUIDE.md`. |
| `AGENT_SYSTEM_PROMPT_SHORT.md` | 1,517 | 20 | One-screen TL;DR of the system prompt | **No.** Opens with "follow `APP_ARCHITECTURE_GUIDE.md`" which means it only works if the agent already has the big file open. Useless as a standalone, duplicative otherwise. |
| `APP_ARCHITECTURE_GUIDE.md` | 22,479 | 689 | Full architecture reference: 15 sections, code-pattern blocks | **Partial.** The 15 sections are individually reasonable. Together they amount to "what to write instead of code". Either they become comments inside a runnable skeleton, or Tier-2 docs for agents that need depth. |
| `RULES_GUIDE.md` | 5,219 | 131 | DO / DO NOT / code-style / file-size / import-order / theme / mobile / server | **Partial.** The DO section prescribes stack components that have already drifted (see Part 6). The DO NOT section mixes load-bearing rules with subjective ones. Server and mobile patterns are project-specific. |
| `AGENT_INSTRUCTIONS.md` | 2,516 | 81 | 8-phase build workflow | **No.** The 8 phases (data layer, scaffold, API, context, components, pages, server, verify) compress to "modify skeleton files" once a real skeleton ships. |
| `REFERENCES.md` | 13,551 | 405 | 12 worked code examples (page, modal, API module, sidebar, animations, WatermelonDB model, schema, migration, context, auto-backup, `cn`) | **Yes for about 25 percent.** Four of the twelve examples generalise (sidebar with `NavLink` active-state, animation transitions, `cn()`, modal structure). The other eight are CRUD-dashboard-specific. |
| `REFERENCES_STYLE_SYSTEM.md` | 4,327 | 144 | Design tokens, utility classes, focus styles, animation, shadow depths, fonts | **Partial.** Utility classes `amin-card`, `amin-input`, `amin-btn-primary`, `amin-btn-secondary` are validated product shapes that survive. The rest collapses into one CSS file in the skeleton. |
| `PACKAGE_TEMPLATE.json` | 1,665 | 56 | `package.json` to copy-rename | **No in current form.** Pins `react` 18, `better-sqlite3` 12 (current is 13), `react-router-dom` 7 (canonical is `react-router` 8); see Part 6. |
| `QUICK_START.md` | 2,451 | 110 | 9-step human scaffold guide | **No.** Says "copy the folder, then build everything"; the whole file dies once the skeleton is real code. |
| **TOTAL** | **58,138** | **~1,720** | **100 percent prose** | |

Net verdict: 6 of 10 files die outright or compress to a stub; 3 carry forward in mutated form; 1 (`REFERENCES.md`) contributes roughly a quarter of its content.

---

## Part 2: What Works

Be fair. Some of this is genuinely good and survives cleanly.

- **The 9-section architecture taxonomy** in `APP_ARCHITECTURE_GUIDE.md` (project structure, config files, boot sequence, layout, data layer, context, component patterns, CSS, audit logging, routing, naming, Express server, Capacitor) is a sound spine for `tier1_standard/memory/`.
- **The audit-logging pattern** (`logCreate / logUpdate / logDelete` called from every mutation; `APP_ARCHITECTURE_GUIDE.md:566-588`). Small, concrete, copy-pasteable, kind-agnostic. Replace the `database.write()` inside it with a generic storage-adapter call so it does not couple to WatermelonDB.
- **The `api` object spread pattern** (`src/lib/api/*.ts` re-exported as a single `api` from `utils.ts`; `REFERENCES.md:93-102`). Opinionated but it gives the agent a single import surface for data. Survives.
- **Utility class names** `amin-card`, `amin-input`, `amin-btn-primary`, `amin-btn-secondary` (`REFERENCES_STYLE_SYSTEM.md:38-49`). Concrete product shapes. Any new skeleton can absorb them without renaming.
- **Project structure** (`server.ts` at root, `src/main.tsx` boot with `StrictMode + DBProvider + App`, `src/pages/` vs `src/components/` split, `src/lib/api/`, `src/db/`). The bones are correct; the scaffolding has to come from a real skeleton file.
- **Security headers in Express** (`APP_ARCHITECTURE_GUIDE.md:638-642`: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`). Small, correct, survives.
- **`cn()` utility** (`REFERENCES.md` import-order section). Tailwind idiom; should be present in every skeleton.
- **The 4 of 12 worked examples in `REFERENCES.md` that generalise**: sidebar layout with `NavLink` active-state, animation transitions, `cn()`, modal structure. Carry forward as Tier-2 reference.
- **`logCreate / logUpdate / logDelete` semantics even when the storage layer changes**. The contract ("every mutation emits one audit record") is independent of WatermelonDB. Ship the contract, replace the implementation.

Honourable mention: the `audioContext.createOscillator()` pattern in `RULES_GUIDE.md:82-88` is a fun detail and would survive, but the cost of carrying one-off project flourishes in a general template outweighs the value.

---

## Part 3: What Is Missing

Ordered by cost. The first item dwarfs the rest.

1. **The runnable skeleton.** Zero `src/main.tsx`, zero `App.tsx`, zero `vite.config.ts` shipped. The `agents_manager/templates/cinematic-landing/skeleton/index.html` (PROPOSED_PATCH v0.5.x:923) is a working 885-line demo; this template has no equivalent. An agent picking up the template today reads markdown, then authors every file from prose. **Closure**: ship `tier1_standard/skeleton/` with a working Vite + React + TypeScript + Tailwind v4 + better-sqlite3 + Vitest + react-router project where `npm install && npm run dev && npm test` are green before the agent touches a thing.
2. **No deterministic scaffolder.** No `npx create-minimal-app`, no `pnpm dlx`, no `bash init.sh`. The agent's only path is "follow the markdown". Compare `create-vite` (one command), `create-next-app` (one command), T3 stack creators. **Closure**: each template ships a `create.sh` / `init.ts` that runs `npm install`, copies the skeleton, runs `npm run dev` smoke-test. The LLM uses one command, not 58 KB of prose.
3. **No intake / clarification protocol.** `SYSTEM_PROMPT_AGENT.md:25` says "ask for clarification if requirements are ambiguous", which is the absence of a protocol, not a protocol. **Closure**: Angle E owns the content; embed the cross-reference in `00-readme-first.md` of each tier.
4. **No `templates/<name>/` shell.** The cinematic-landing convention (memory/ + skeleton/ + prompts/ + decisions/ + assets/ + a `00-readme-first.md`) exists in `agents_manager/upstream-contrib/PROPOSED_PATCH_v0.5.x_2026-07-01_cinematic-landing-template.md:194-1283` but is not applied here. Discovery is by grep only.
5. **No per-kind specialisation.** Treating this as a "general app template" hides the real variation: an AI chat app needs streaming + token counting; a store-front needs Stripe; a SaaS needs auth + billing; a content site needs MDX. Angle C owns the matrix; the audit surfaces the gap.
6. **No self-verification.** No Playwright smoke test, no `npm test`, no `npm run build` smoke. `RULES_GUIDE.md:49` actively forbids the cheapest verification mechanism. **Closure**: ship Vitest preconfigured with one smoke test ("render the home page; expect h1 text"); smoke test runs in CI.
7. **No locale parameterisation.** Arabic + RTL is hard-coded into 6 of 10 files (`SYSTEM_PROMPT_AGENT.md:9`, `RULES_GUIDE.md:21-22`, `APP_ARCHITECTURE_GUIDE.md:37` and `:142`, `INDEX.md:36`, `AGENT_INSTRUCTIONS.md:81`). Wrong default for a general template. **Closure**: `tier.config.json` with `locale`, `dir`, optional `font` fields. Default is `en` + `ltr` + system sans. Arabic + RTL is one entry in a `locales/` registry, not a hard rule. (Convergent finding: Angle E reached the same conclusion from the intake side; see `share/notes/01_research_T-2026-08-13-003_angle-e-intake.md:21,170,407`.)
8. **No portability across agent runtimes.** Implicitly assumes the agent reads all 58 KB. Does not work in Claude Code, Cursor, Kilo, or Codex without re-reading. **Closure**: Tier A doc + Tier A skeleton + a `tier.config.json` works in any runtime that can `cat` files and `npm install`. Do not assume OpenCode or agents_manager.
9. **No maintenance story.** No `VERSION`, no `CHANGELOG`, no `dependabot.yml`, no `CONTRIBUTING`, no `scripts/validate`. Stack drifts (Tailwind v4 to v5, React 18 to 19) and the template silently rots. **Closure**: per-template `VERSION`, top-level `CHANGELOG.md`, repo-wide `scripts/validate-frontmatter.py` (already exists), new `scripts/verify-stack-claims.ts` run weekly. Make "verify stack" a CI gate.

---

## Part 4: What Is Actively Harmful

Three rules make agent output worse, not better. Each carries a specific replacement.

1. **`NEVER write comments in code`** (`RULES_GUIDE.md:34`, `SYSTEM_PROMPT_AGENT.md:16`, `AGENT_SYSTEM_PROMPT_SHORT.md:7`). Mechanism of harm: rules out the one cheap breadcrumb an LLM has for itself (and a human reviewer) in 1,500-line auto-generated files. **Replacement**: allow JSDoc on exported functions and modules; prohibit banner / decorative comments. Move from "no comments" to "comments that pay for themselves".
2. **`NEVER add test framework unless explicitly required`** (`RULES_GUIDE.md:49`, `SYSTEM_PROMPT_AGENT.md:28`). Mechanism of harm: the agent cannot verify its own output without manually opening a browser; the review phase has no deterministic signal to check against; broken builds ship. **Replacement**: ship Vitest preconfigured with one smoke test in `tests/smoke.test.ts`. Default flips from "no tests" to "one smoke test passes". Agents add more tests only when warranted.
3. **Hard-coded Arabic + RTL as default** (`SYSTEM_PROMPT_AGENT.md:9`, `RULES_GUIDE.md:21-22`). Mechanism of harm: forces every non-Arabic user to start by deleting a rule. Wastes tokens on every re-read. **Replacement**: `tier.config.json` locale field. Default `en` + `ltr`. Arabic + Cairo is one preset in the locales registry, not the default. (Convergent with Angle E.)

Two more borderline cases worth naming, though they are lower severity:

- **`NEVER use <div> when motion.div is "better"`** (`RULES_GUIDE.md:39`). Mechanism of harm: subjective and unevaluable; an agent that takes the rule literally wraps half the JSX in `motion.div` for no behavioural reason. **Replacement**: drop the rule; let convention pick.
- **`NEVER use for loops when array methods work`** (`RULES_GUIDE.md:45`). Mechanism of harm: style rule as a hard rule; sometimes `for` is correct (early exit, large data, generator-style iteration). **Replacement**: drop; treat as style preference, not policy.

The "actively harmful" rules are mostly the same family: subjective, project-specific, or rules that look principled but corrode trust in the rest of the rule-list because the agent can see they are stylistic.

---

## Part 5: Per-Rule Verdict

The ~50 hard rules live in `RULES_GUIDE.md` lines 5-49 and `SYSTEM_PROMPT_AGENT.md` lines 9-32. Verdicts: **KEEP** (load-bearing and not stacked on one project), **AMEND** (right idea, wrong default / scope / wording), **DROP** (subjective, project-specific to one reference project, or actively harmful).

### DO section (`RULES_GUIDE.md:5-29`)

| Rule | Line | Verdict | Reason |
|---|---|---|---|
| React 18 with functional components | `RULES_GUIDE.md:5` | **AMEND** | React 18 is fine for stability; React 19 is current. Pin per project; do not hardcode in a *general* template. |
| TypeScript strict mode | `RULES_GUIDE.md:6` | **KEEP** | Non-negotiable; an LLM produces dramatically worse code without strict. |
| Tailwind v4 via `@tailwindcss/vite`, no postcss config | `RULES_GUIDE.md:7` and `:37` | **KEEP** | Verified current [S1]. The "no config file" property is exactly the value. |
| `clsx` + `tailwind-merge` `cn()` | `RULES_GUIDE.md:8` | **KEEP** | Standard idiom. |
| `motion` library, not framer-motion | `RULES_GUIDE.md:9` | **AMEND** | Verified correct [S2]. Clarify the import path is `motion/react`, not `framer-motion`. |
| `lucide-react` for icons | `RULES_GUIDE.md:10` | **KEEP** | Current, no controversy. |
| `react-router-dom v7` | `RULES_GUIDE.md:11`, `PACKAGE_TEMPLATE.json:35` | **AMEND** | Canonical package is now `react-router` (v8.3.0); see Part 6. |
| Lazy load every page | `RULES_GUIDE.md:12` | **KEEP** | Standard prod practice. Add "not required in dev" note. |
| WatermelonDB with LokiJS adapter | `RULES_GUIDE.md:13`, `SYSTEM_PROMPT_AGENT.md:14` | **DROP from general default** | Maintenance-only (see Part 6); wrong default for a general template. If a project needs offline-first mobile, migrate to Dexie (IndexedDB) or Drizzle + SQLite. Ship WatermelonDB as an opt-in adapter. |
| better-sqlite3 for web server | `RULES_GUIDE.md:14`, `SYSTEM_PROMPT_AGENT.md:14` | **KEEP** | Verified current (v13.0.3) [S3]. |
| API functions in `src/lib/api/` modules | `RULES_GUIDE.md:15` | **KEEP** | Clean separation. |
| Spread API modules into a single `api` object | `RULES_GUIDE.md:16` | **KEEP** | Single import surface. |
| `logCreate / logUpdate / logDelete` per mutation | `RULES_GUIDE.md:17` | **AMEND** | Keep the pattern; make the audit-log adapter's responsibility, not a per-call step the agent can forget by the 6th API module. |
| `database.write()` for WatermelonDB mutations | `RULES_GUIDE.md:18` | **DROP** | Coupled to WatermelonDB. |
| `database.get('collection').create/update/query` | `RULES_GUIDE.md:19` | **DROP** | Coupled to WatermelonDB. |
| `DBProvider` wrapping the app root | `RULES_GUIDE.md:20` | **AMEND** | `DBProvider` is an artifact of WatermelonDB. Replace with a generic `DataLayerProvider` interface that any storage backend plugs into. |
| `dir="rtl"` on `<html>` | `RULES_GUIDE.md:21` | **DROP** | Locale is a parameter, not a default. |
| Arabic (`ar`) as the UI language | `RULES_GUIDE.md:22` | **DROP** | Same reason. |
| `@` path alias to project root | `RULES_GUIDE.md:23` | **AMEND** | `@/src/*` is the more common shape; `@/*` works but is unusual. |
| `experimentalDecorators: true` + `useDefineForClassFields: false` | `RULES_GUIDE.md:24` | **DROP** | WatermelonDB-only. |
| Babel decorator plugins in Vite config | `RULES_GUIDE.md:25` | **DROP** | WatermelonDB-only; forces every future app to pay for one library's quirk. |
| `database` singleton from `src/db/index.ts` | `RULES_GUIDE.md:26` | **DROP** | Coupled to WatermelonDB. |
| Loading state: spinner | `RULES_GUIDE.md:27` | **KEEP** | Universal. |
| Empty state: placeholder | `RULES_GUIDE.md:28` | **KEEP** | Universal. |
| Error state: try/catch + user feedback | `RULES_GUIDE.md:29` | **KEEP** | Universal. |
| recharts / jspdf + html2canvas (optional) | `APP_ARCHITECTURE_GUIDE.md:19-20` | **AMEND** | Opt-in per project; not default. |

### DO NOT section (`RULES_GUIDE.md:33-49`)

| Rule | Line | Verdict | Reason |
|---|---|---|---|
| `NEVER use any` | `RULES_GUIDE.md:33` | **KEEP** | Load-bearing. Loses strict typing and reviewer signal. |
| `NEVER write comments in code` | `RULES_GUIDE.md:34` | **AMEND** | Allow JSDoc on exports; prohibit banner comments. (See Part 4.) |
| `NEVER use class components` (except ErrorBoundary) | `RULES_GUIDE.md:35` | **KEEP** | Universal React idiom. |
| `NEVER use inline styles` | `RULES_GUIDE.md:36` | **AMEND** | Tailwind classes for layout, but allow `--custom-property` inline for dynamic values that Tailwind cannot enumerate. |
| `NEVER create postcss.config.js / tailwind.config.js` | `RULES_GUIDE.md:37` | **KEEP** | Tailwind v4 needs no config file [S1]. |
| `NEVER use emotion / styled-components / CSS-in-JS` | `RULES_GUIDE.md:38` | **KEEP** | Project rule, no harm. |
| `NEVER use regular <div> when motion.div is "better"` | `RULES_GUIDE.md:39` | **DROP** | Subjective, unevaluable; over-wraps JSX. |
| `NEVER fetch data outside useEffect or event handlers` | `RULES_GUIDE.md:40` | **AMEND** | Allow React Query / SWR / loaders that fetch outside `useEffect`. |
| `NEVER mutate state directly` | `RULES_GUIDE.md:41` | **KEEP** | Universal React idiom. |
| `NEVER use // @ts-ignore or // eslint-disable-next-line` | `RULES_GUIDE.md:42` | **KEEP** | Use `@ts-expect-error` with a comment if you must. |
| `NEVER commit secrets` | `RULES_GUIDE.md:43` | **KEEP** | Universal. |
| `NEVER use var` | `RULES_GUIDE.md:44` | **KEEP** | Universal. |
| `NEVER use for loops when array methods work` | `RULES_GUIDE.md:45` | **DROP** | Style rule as a hard rule. |
| `NEVER use document.title directly` | `RULES_GUIDE.md:46` | **AMEND** | Use a `useDocumentTitle` hook. Rule is right, rationale is missing. |
| `NEVER use eval() / new Function()` | `RULES_GUIDE.md:47` | **KEEP** | Universal. |
| `NEVER import from react unnecessarily` | `RULES_GUIDE.md:48` | **KEEP** | Correct under `jsx: react-jsx`. |
| `NEVER add test framework unless explicitly required` | `RULES_GUIDE.md:49` | **AMEND** | Ship Vitest preconfigured with one smoke test. (See Part 4.) |
| `Build for Web + Android simultaneously` | `SYSTEM_PROMPT_AGENT.md:4` | **AMEND** | Dual-target is opt-in per project; today the agent wastes ~25 percent of token budget on mobile scaffolding the user did not ask for. |

### Quick verdict summary

- **KEEP** (load-bearing, not project-specific): about 16 rules.
- **AMEND** (right idea, wrong default / scope / wording): about 14 rules.
- **DROP** (subjective, project-specific, or actively harmful): about 16 rules.

The DROP rate is high precisely because the template was extracted from one reference project (RM-style Arabic-RTL WatermelonDB Capacitor app) and lifted into a "general" template without re-scoping. Every DROP is a candidate to come back as an opt-in adapter in a Tier-2 kind-specific template, not as a default.

---

## Part 6: Stack Claims Versus Current Reality

Any claim that is now wrong is HIGH severity because an agent following it produces a broken app. Re-verification done via `npm view` and the package's GitHub releases page on 2026-08-13. Inherited version numbers were treated as suspect per the verifier's instruction.

| Library | Claim in template | Current reality | Verdict | Source |
|---|---|---|---|---|
| Tailwind CSS v4 via `@tailwindcss/vite`, no config files | `^4.1.14`, "no `postcss.config.js`, no `tailwind.config.js`" (`RULES_GUIDE.md:7`, `:37`, `PACKAGE_TEMPLATE.json:27`) | **Tailwind v4.3.x is current.** Install: `npm install tailwindcss @tailwindcss/vite`, add `tailwindcss()` to Vite plugins, `@import "tailwindcss";` in CSS, no config files. Claim matches current docs exactly. | **KEEP** | [S1] |
| `motion` library (NOT framer-motion) | `^12.23.24` for animations (`RULES_GUIDE.md:9`, `PACKAGE_TEMPLATE.json:32`) | **`motion` is the current package** ("Motion for React, previously Framer Motion"). Install: `npm install motion`. Import: `import { motion } from 'motion/react'`. v13.1.0 current; v12.x still maintained. The template's import path (`motion/react`) is correct. | **KEEP** (clarify import path in prose) | [S2] |
| `react-router-dom v7` | `^7.14.0` ("Use `react-router-dom v7` for routing"; `RULES_GUIDE.md:11`, `PACKAGE_TEMPLATE.json:35`, `AGENT_SYSTEM_PROMPT_SHORT.md:4`) | **`react-router-dom` v7.18.2 exists** as a re-export shim from `react-router`. The canonical package is now `react-router`, currently at **v8.3.0**. The `-dom` README itself says: "This package simply re-exports everything from `react-router` to smooth the upgrade path for v6 applications. Once upgraded you can change all your imports and remove it from your dependencies." Re-verified via `npm view react-router version` on 2026-08-13. | **AMEND**, rename to `react-router` and pin to `^8.3.0`; preserve `BrowserRouter / Routes / Route / NavLink` API (compatible) | [S4], [S5] |
| WatermelonDB | `^0.28.0` with LokiJS adapter for mobile (`RULES_GUIDE.md:13`, `SYSTEM_PROMPT_AGENT.md:14`, `PACKAGE_TEMPLATE.json:21-23`, `APP_ARCHITECTURE_GUIDE.md:344-354`) | **Last npm publish 0.28.1-0 on 2025-07-24** (~13 months ago as of 2026-08-13); npm `latest` dist-tag still at `0.28.0` (2025-04-07); no new feature release in over a year. GitHub Releases page: **"There aren't any releases here"**. **271 open issues**, 30 open PRs. 11.8k stars, 654 forks. LokiJS itself has had only one release in the last 5 years. RPS-Apps and Nozbe Teams still ship on it, but the project is in maintenance-only mode for a general 2026 template. | **DROP from general default**, keep as opt-in adapter. (Convergent with Angle C, which independently reached the same verdict from the app-kind side: `share/notes/01_research_T-2026-08-13-003_angle-c-app-kinds.md:21,693`.) | [S6], [S7] |
| `better-sqlite3` | `^12.8.0` for web server (`RULES_GUIDE.md:14`, `PACKAGE_TEMPLATE.json:25`) | **Current at v13.0.3** (and v13.1.0 since audit); v13.0.0 was the N-API migration on 2026-07-21; weekly downloads 6.5M; last publish days ago. Maintenance is active. | **AMEND**, bump caret to `^12 || ^13`, or migrate to `^13` | [S3], [S8] |
| `react` / `react-dom` | `^18.0.0` (`PACKAGE_TEMPLATE.json:29-30`) | React 18.3.x still LTS; React 19 is current. Both are supported in 2026. | **AMEND**, pin per project; document the upgrade path | [S9] |
| `@capacitor/core` | `^8.4.2` (`PACKAGE_TEMPLATE.json:17-19`) | **v8.5.0 current**; weekly 3.2M; last publish 19 hours before audit. Very actively maintained. | **KEEP** but verify pin on actual scaffold | [S10] |
| Decorator config (`experimentalDecorators: true` + babel plugins) | Mandated (`RULES_GUIDE.md:24-25`, `APP_ARCHITECTURE_GUIDE.md:86-89`, `:114-121`) | This is **WatermelonDB-only**. The modern TC39 stage-3 decorators are now the default in `@babel/preset-env`; the legacy form is what WatermelonDB requires. | **DROP with WatermelonDB**; otherwise irrelevant | already covered |
| `lucide-react`, `clsx`, `tailwind-merge`, `recharts`, `jspdf`, `html2canvas`, `vite`, `tsx`, `vitest`, `autoprefixer`, `esbuild` | `PACKAGE_TEMPLATE.json`, `APP_ARCHITECTURE_GUIDE.md:11-25` | All alive. Vite 6 stable; Vite 7/8 line exists (see Angle C caveat: `Vite 7.8.0` was hallucinated; current is `7.3.6` 7.x or `8.2.1` latest, per `share/reports/01_verify_T-2026-08-13-003.md:158`). recharts maintenance is sleepy but functional. | **KEEP** with periodic re-pin | [S11] |

### Net stack-claim verdict

- 4 of the 8 load-bearing claims are **verified current and kept** (Tailwind v4, motion, better-sqlite3, Capacitor).
- 1 of the 8 is **stale but functional** (`react-router-dom` v7: works, but wrong package name for 2026).
- 1 of the 8 is **material-risk for a general template** (WatermelonDB; re-verified, see Sources).
- The set collectively **does not represent a 2026 best-of-breed general-purpose React app stack**: WatermelonDB belongs to a 2023-2024 world; `better-sqlite3 + Express` for a "web server" is fine, but a Vite-only SPA is what "build me an app" means in 2026 most of the time.

The WatermelonDB re-verification is the load-bearing item: an agent that follows this template today will install `@nozbe/watermelondb@^0.28.0`, get a 13-month-stale package, hit GitHub issues that are not getting triaged, and waste the next several hours.

---

## Part 7: Gap Matrix

Rows: capabilities the target design needs. Columns: current state, what closing the gap would take.

| Capability | Current state | Gap | Closure mechanism |
|---|---|---|---|
| **Tier routing** (minimal / standard / specialist) | None. Single template tries to be all tiers at once. | A general template cannot serve Tier 0 (quick wiki) and Tier 2 (auth + billing SaaS) at once. | Split into `tier0_minimal/` (Vite + React + Tailwind + 1 page, ~6 files), `tier1_standard/` (current body minus RM-specific cruft), `tier2_<kind>/` (one per kind). Agent picks tier at intake. |
| **Intake / clarification protocol** | None. `SYSTEM_PROMPT_AGENT.md:25` says "ask for clarification if requirements are ambiguous": absence of a protocol, not a protocol. | Agent has no script for *what* to ask, *when* to stop, *how* to render the result. | Angle E owns the content; embed cross-reference in `00-readme-first.md` of each tier. |
| **Runnable skeleton** | Zero. `INDEX.md:43-51` lists the structure but no skeleton files exist. | Agent must author every config and source file from prose. | Ship a checked-in skeleton per tier: `tier0/`, `tier1/skeleton/`, `tier2/standard-crud/skeleton/`. |
| **Deterministic scaffolder** | None. `QUICK_START.md:5-8` says `cp -r general-app-template/ my-new-app/`, then build everything by hand. | LLM cannot reliably reproduce the same scaffold twice. | Each template ships `create.sh` / `init.ts` that runs `npm install`, copies the skeleton, runs `npm run dev` smoke-test. |
| **Progressive disclosure** (read-small-first, escalate-to-deep) | Roughly there in spirit. `AGENT_SYSTEM_PROMPT_SHORT.md` and `SYSTEM_PROMPT_AGENT.md` overlap; `RULES_GUIDE.md` repeats what `SYSTEM_PROMPT_AGENT.md` prohibits. | Agent reads everything regardless; blows the token budget. | Tier A = 1-page intent (`00-readme-first.md`, 300-500 lines) → Tier B = rules + patterns (`RULES_GUIDE.md` simplified, ~150 lines) → Tier C = deep dive (memory + references, opened on demand). |
| **Self-verification** | `RULES_GUIDE.md:49` actively forbids test framework; `QUICK_START.md:54-57` says "verify with `npm run lint && npm run dev`". | No automated signal the output works; review has no concrete pass/fail. | Ship Vitest preconfigured with 1 smoke test ("render the home page; expect h1 text"). Smoke test runs in CI. |
| **Locale parameterisation** | Arabic + `dir="rtl"` hard-coded in 6 of 10 files. | Non-Arabic users start by deleting a rule. | `tier.config.json` with `locale`, `dir`, optional `font` fields. Default `en` + `ltr` + system sans. Arabic + RTL is one entry in a `locales/` registry. |
| **Per-kind specialisation** | One template; serves CRUD dashboards only. | "Give me a chat app" hits the same template as "give me a SaaS dashboard"; neither gets the right defaults. | `tier2/<kind>/skeleton/` per kind; each kind has its own 00-readme + memory/01 + skeleton + commands. Tier router picks one. |
| **Portability across agent runtimes** | Not portable. Implicitly assumes the agent reads all 58 KB. | Does not work in Claude Code / Cursor / Kilo / Codex without re-reading. | Tier A doc + Tier A skeleton + `tier.config.json`. Works in any runtime that can `cat` files and `npm install`. |
| **Maintenance story** | None. No `VERSION`, no `CHANGELOG`, no `dependabot.yml`, no `CONTRIBUTING`. | Stack drifts silently. | Per-template `VERSION`, top-level `CHANGELOG.md`, `scripts/validate-frontmatter.py` (exists), `scripts/verify-stack-claims.ts` (new, weekly). "Verify stack" is a CI gate. |
| **Discovery (which template applies?)** | Grep-only. `INDEX.md:9-16` reads itself. | Agent has to read every template to know which one fits. | `templates/registry.json`: index of trigger phrases, owner, version, `last_used` per template. Discoverable via one JSON read. |
| **Audit-trail / decision log** | Implicit. `INDEX.md:16-17` "Customization Points" list is the closest. | Agent decisions die after the session; cannot reconstruct "why did the agent pick X". | Per-template `decisions/decision-log.md`, append-only. Agent appends at every tier-router decision. |

---

## Part 8: What Carries Forward

The concrete list of what to lift out of the existing template into the new family, and where each piece lands.

| From | Into the new design |
|---|---|
| Audit-logging contract (`logCreate / logUpdate / logDelete` called from every mutation; `APP_ARCHITECTURE_GUIDE.md:566-588`) | `tier1_standard/skeleton/src/lib/audit.ts`. Replace `database.write()` with a generic storage-adapter call so it does not couple to WatermelonDB. |
| `cn()` utility (`REFERENCES.md` import-order section) | `tier1_standard/skeleton/src/lib/utils.ts`. Universal; no rename needed. |
| Utility class names `amin-card`, `amin-input`, `amin-btn-primary`, `amin-btn-secondary` (`REFERENCES_STYLE_SYSTEM.md:38-49`) | `tier1_standard/skeleton/src/index.css` (kept as-is). |
| `api` object spread pattern (`REFERENCES.md:93-102`) | `tier1_standard/skeleton/src/lib/utils.ts` (next to `cn()`). |
| Project structure (`server.ts` at root, `src/main.tsx` boot with `StrictMode + App`, `src/pages/` vs `src/components/`, `src/lib/api/`, `src/db/`) | `tier1_standard/skeleton/` folder layout. Replace `DBProvider` with a generic `DataLayerProvider`. |
| Security headers in Express (`APP_ARCHITECTURE_GUIDE.md:638-642`) | `tier1_standard/skeleton/server.ts`. |
| 4 of 12 worked examples in `REFERENCES.md` (sidebar with `NavLink` active-state, animation transitions, `cn()`, modal structure) | `tier1_standard/memory/` Tier-2 reference files. The other 8 examples (page, API module, WatermelonDB model, schema, migration, context, auto-backup) die with WatermelonDB. |
| The 9-section architecture taxonomy in `APP_ARCHITECTURE_GUIDE.md` | `tier1_standard/memory/02-architecture.md` (compact) + Tier-2 deep dive (kept verbatim for agents that need depth). |
| Tier-A (`SYSTEM_PROMPT_AGENT.md` 10 principles, distilled to 5) | `tier1_standard/00-readme-first.md` opening section. Drop the prohibited-actions list (duplicates `RULES_GUIDE.md`). |
| The `experimentalDecorators` + babel decorator config (`RULES_GUIDE.md:24-25`, `APP_ARCHITECTURE_GUIDE.md:86-89`) | Survives **only** inside the WatermelonDB opt-in adapter, not in the general tier. |

The audit is not a tear-down. It is a triage that turns into a migration path: 8 files die or compress; 3 files mutate; the surviving pieces are small, concrete, and copy-pasteable into the new skeleton. The hard part is not deciding what survives; it is authorising the user to delete what does not.

---

## Part 9: Does the In-House Convention Generalise?

The `agents_manager/templates/cinematic-landing/` shape is defined in `agents_manager/upstream-contrib/PROPOSED_PATCH_v0.5.x_2026-07-01_cinematic-landing-template.md:194-1283` as:

- `00-readme-first.md` → entry doc, 300-500 lines, written for the agent that knows nothing.
- `memory/01..09.md` → 9 problem-shaped memory files (brand voice, asset pipeline, scroll ticker, hero, theming, decision tree, accessibility, CTA, quality bar).
- `skeleton/index.html` → one real working file the agent reads as the structural baseline.
- `prompts/` → copy-paste prompts for asset generators.
- `decisions/decision-log.md` → append-only audit of branch picks.
- `assets/MANIFEST.json` + `manifest.schema.json` → structured state.

**Verdict: the convention carries over cleanly, with three adjustments. The audit agrees with Angle A's independent recommendation to adopt the same shape.** (`share/notes/01_research_T-2026-08-13-003_angle-a-prior-art.md:31` reaches the same conclusion from the prior-art side.)

### What generalises directly

1. **`memory/01..09.md` becomes problem-shaped for app templates**: `01-intake.md`, `02-data-layer.md`, `03-routing.md`, `04-state.md`, `05-styling.md`, `06-deployment.md`, `07-quality-bar.md`, `08-locale.md`, `09-extensibility.md`. The *shape* (problem-oriented, not stack-oriented) survives intact.
2. **`skeleton/` contains real code, not prose**. The load-bearing property. The current `general-app-template` has zero skeleton files; this is the single biggest gap, and `cinematic-landing`'s `skeleton/index.html` is the precedent.
3. **`prompts/` adapts from "image-gen / video-gen / asset-spec" to "domain-prompts"** (per app kind). For a chatbot, `prompts/system-message-template.md`; for a SaaS, `prompts/stripe-onboarding.md`.
4. **`decisions/decision-log.md` and `assets/MANIFEST.json` schema** are 100 percent reusable as-is.
5. **`00-readme-first.md` name + "discovery by grep" pattern** survives; rename to `README.md` for repo convention.

### Adjustments needed

1. **Cinematic is single-file HTML; app templates are multi-file Vite projects.** The skeleton's structural role in cinematic is "I edited one file, here is what it looks like". For a Vite app, the skeleton has to be a multi-file folder. PROPOSED_PATCH G2 (lines 1662-1670) flagged this for cinematic but did not address it for app templates; the audit closes that gap.
2. **Cinematic has 4 explicit branches in `06-asset-pipeline`; app templates have a richer decision tree** (tier + kind + locale + mobile-or-not). The branch schema should grow accordingly. Each branch needs the same `{ A | B | C | D }` shape as cinematic, plus a default and a stop condition.
3. **Cinematic memory files are code-shaped (CSS, JSX, animation choices); app-template memory files are architecture-shaped (file layout, conventions, adapter choices).** The cinematic memory file `04-cinematic-hero.md` (PROPOSED_PATCH:436-498) is highly opinionated; an app-template memory file must be kind-level opinionated, not project-level.

### Risk

The convention **carries over cleanly**. The risk is not "is the shape right?" (it is) but "does the agent spend the token budget to discover and apply it?". The repo's `agents_manager/templates/` folder does not yet exist (verified via `Get-ChildItem agents_manager/templates` and `glob **/cinematic*/**`: no entry). The cinematic patch is **proposed but not merged**. So the audit can recommend the convention, but the next-step work is to actually ship the folder.

---

## Sources

Numbered [S1]..[Sn]; access date 2026-08-13 throughout. Template claims cited by path and line.

- **[S1]** Tailwind CSS v4 install docs. https://tailwindcss.com/docs/installation/using-vite . Proves: Tailwind v4.3 is current; install is `npm install tailwindcss @tailwindcss/vite`, add to Vite plugins, `@import "tailwindcss";` in CSS, no config files. Direct quote: "Installing Tailwind CSS as a Vite plugin is the most seamless way to integrate it with frameworks like Laravel, SvelteKit, React Router, Nuxt, and SolidJS."
- **[S2]** Motion for React. https://motion.dev/docs/react-quick-start . Proves: "Motion for React (previously Framer Motion)". Install: `npm install motion`. Import path: `import { motion } from 'motion/react'`. The template's import path (`REFERENCES.md:14, :84, :207, :218` and `APP_ARCHITECTURE_GUIDE.md:400, :446`) is `motion/react`, matching exactly.
- **[S3]** better-sqlite3 GitHub Releases. https://github.com/WiseLibs/better-sqlite3/releases . Proves: current at v13.0.3 (and v13.1.0 since audit); v13.0.0 was the N-API migration on 2026-07-21. Template pins `^12.8.0`.
- **[S4]** React Router install docs. https://reactrouter.com/start/declarative/installation . Proves: install is `npm i react-router`, import from `react-router` (no `-dom`).
- **[S5]** `react-router` npm page. https://www.npmjs.com/package/react-router . Proves: at v8.3.0 (re-verified 2026-08-13 via `npm view react-router version`). The `-dom` README states it "simply re-exports everything from `react-router` to smooth the upgrade path for v6 applications".
- **[S6]** WatermelonDB npm page. https://www.npmjs.com/package/@nozbe/watermelondb . Proves: current `latest` at 0.28.0; last non-prerelease publish 2025-04-07; last prerelease `0.28.1-0` on 2025-07-24 (~13 months ago as of 2026-08-13). Re-verified 2026-08-13 via `npm view @nozbe/watermelondb time --json`.
- **[S7]** WatermelonDB GitHub Releases. https://github.com/Nozbe/WatermelonDB/releases . Proves: "There aren't any releases here". 271 open issues, 30 open PRs. Re-verified 2026-08-13 via webfetch.
- **[S8]** better-sqlite3 npm page. https://www.npmjs.com/package/better-sqlite3 . Proves: at v13.0.3, weekly downloads 6.5M, last publish days ago. Maintenance is active.
- **[S9]** React npm page. https://www.npmjs.com/package/react . Proves: React 18.3.x still maintained (LTS line); React 19 is current.
- **[S10]** `@capacitor/core` npm page. https://www.npmjs.com/package/@capacitor/core . Proves: at v8.5.0, last publish 19 hours before audit; very actively maintained.
- **[S11]** `vite`, `vitest`, `lucide-react`, `clsx`, `tailwind-merge`, `recharts`, `jspdf`, `html2canvas` npm pages. https://www.npmjs.com . Proves: all alive; Vite current is `8.2.1` with `7.3.6` as last 7.x (note: `Vite 7.8.0` cited elsewhere in the dossier is hallucinated; see `share/reports/01_verify_T-2026-08-13-003.md:158`).
- **[S12]** `agents_manager/upstream-contrib/PROPOSED_PATCH_v0.5.x_2026-07-01_cinematic-landing-template.md`. Local path. Proves: the agents_manager template convention (`templates/<name>/` with memory/ + skeleton/ + prompts/ + decisions/ + assets/ + 00-readme-first.md); 4-branch runtime decision tree (Branch A/B/C/D) at lines 601-715; prompt-multilingual ready at lines 947-1061; vendor-neutrality discipline at lines 154-156.
- **[S13]** `share/notes/01_research_T-2026-08-13-003_angle-f-audit.md`. Local path. Proves: the full audit this chapter condenses. Per-rule verdicts, gap matrix, and the inventory table.
- **[S14]** `share/reports/01_verify_T-2026-08-13-003.md`. Local path. Proves: cross-angle agreement on WatermelonDB drop, Arabic/RTL flip, `react-router-dom` to `react-router` rename, and skeleton-file convention.
- **[S15]** `share/notes/01_research_T-2026-08-13-003_angle-c-app-kinds.md`. Local path. Proves: independent verdict on WatermelonDB from the app-kind side (lines 21, 693).
- **[S16]** `share/notes/01_research_T-2026-08-13-003_angle-a-prior-art.md`. Local path. Proves: independent recommendation to adopt the cinematic-landing `templates/<name>/` convention (line 31).
- **[S17]** `share/notes/01_research_T-2026-08-13-003_angle-e-intake.md`. Local path. Proves: independent verdict to flip Arabic/RTL to opt-in, English/LTR default (lines 21, 170, 407).

---

## Metrics

| Field | Value |
|---|---:|
| survival_pct | ~20-25 |
| files_in_template | 10 |
| files_die_or_compress | 6 |
| files_mutate | 3 |
| rules_KEEP | ~16 |
| rules_AMEND | ~14 |
| rules_DROP | ~16 |
| gaps_HIGH | 3 (skeleton, scaffolder, intake protocol) |
| gaps_MEDIUM | 3 (locale, self-verification, per-kind) |
| gaps_LOW | 3 (portability, maintenance, discovery) |
| stack_claims_verified_correct | 4 of 8 (Tailwind v4, motion, better-sqlite3, Capacitor) |
| stack_claims_stale_but_functional | 1 of 8 (`react-router-dom` v7) |
| stack_claims_material_risk | 1 of 8 (WatermelonDB) |
| clarifying_Qs | 0 |
| re_verified_independently | WatermelonDB npm + GitHub; react-router npm; better-sqlite3 npm; motion npm |

---

## Self-Critique

The hardest part of this audit is **resisting the urge to write the new template**. The chapter is scoped to "audit and migration path", and it stays there. Two things I am least confident about:

1. **The WatermelonDB verdict**. I labelled it maintenance-only, but a single 13-month gap between npm publishes is not the same as dead. RPS-Apps and Nozbe Teams still ship on it ([S6] dependents include Mattermost, Rocket Chat, Steady; not abandoned). The honest refinement is "WatermelonDB is alive but no longer expanding; for a greenfield 2026 general template, mandate something with active releases (Dexie or drizzle-orm) as the default and keep WatermelonDB as an opt-in adapter". That is the verdict the chapter carries.
2. **The "NEVER use for loops" and "NEVER use motion.div when better" rules**. I marked them DROP as style rules masquerading as hard rules. The cost is real but small: an agent that over-wraps `motion.div` adds a few KB of bundle and a small re-render cost. I could have left them AMEND; the chapter's call is DROP because the rules teach the agent that the rule-list is partly stylistic, which corrodes trust in the rest of the list. That call is judgement, not measurement.

What I did not verify because the question is "audit, not verify":

- That the 8-phase workflow in `AGENT_INSTRUCTIONS.md` matches the actual workflow the original reference project shipped.
- That the WatermelonDB LokiJS adapter works cleanly with current bundlers under Vite (the template's `useWebWorker: false` suggests bundler collision history).
- That the `better-sqlite3` v12 to v13 N-API migration introduces any breaking change for the template's `server.ts` code.

Things I might be wrong about:

- The 20 to 25 percent survival rate is an estimate; the lower bound (20) treats `REFERENCES.md` as 25 percent surviving; the upper bound (25) treats it as closer to 30 percent. Reasonable humans could pick 18 or 30. The midpoint holds.
- The `react-router` 8.3.0 number was re-verified; the `-dom` to no-`-dom` rename is real, but if the user is pinned to React Router v6 (older codebase), `-dom` is still the right package for them. The chapter assumes v7+ since the template already pins `^7.14.0`.

NEEDS_USER_INPUT: false. The audit unlocks (the user explicitly cleared prior gates with "nothing is fixed").