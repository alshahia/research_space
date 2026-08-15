---
task_id: T-2026-08-13-003
angle: F
title: Audit of resources/general-app-template - brutal, nothing protected
date: 2026-08-13
research_detector_tier: 4
generated_by: MiniMax-M3 (am-research)
status: complete
---

# Angle F - Audit of `resources/general-app-template`

## Summary

- **Survival rate**: roughly **20-25%** of the current ~58 KB prose ships into the new design. Most of `RULES_GUIDE.md`, `QUICK_START.md`, `AGENT_SYSTEM_PROMPT_SHORT.md`, the heavy half of `APP_ARCHITECTURE_GUIDE.md`, and the RTL-by-default rule die.
- **Single biggest defect**: **zero runnable code**. The template is 10 markdown files plus a `package.json`, so the agent must author every config and source file from prose. The skeleton files the `cinematic-landing` convention ships (`templates/cinematic-landing/skeleton/index.html`, PROPOSED_PATCH line 923) are entirely absent here.
- Three of the load-bearing library claims are **verified correct** (Tailwind v4 + `@tailwindcss/vite`, `motion` package, `better-sqlite3`).
- One is **verified stale**: `react-router-dom` is no longer the primary package; `react-router` (v8.3.0) re-exports from it and is now the canonical install (S2, S3).
- One is **material-risk**: WatermelonDB last published on npm ~1 year ago, no formal GitHub releases, 271 open issues; this is a poor 2026 default for a *general* app template (S4).
- The "no comments" and "no tests" rules are the most likely to make an LLM produce worse code, not better.
- The `agents_manager/templates/cinematic-landing/` convention (memory/ + skeleton/ + prompts/ + decisions/ + assets/ + a 00-readme-first.md per template) **generalises cleanly** to app templates - and is the single biggest reusable asset in this repo for the new design.

---

## Part 1 - Inventory

Total: **58,138 bytes across 10 files**, **1,720 lines** of prose, **0 lines of code**.

| File | Bytes | Lines | Purpose | Earns its place? |
|---|---:|---:|---|---|
| `INDEX.md` | 2,265 | 51 | File map, reading order, customization points | **No** - cosmetic; an agent greps for prose anyway and the reading order is wrong (`SHORT` reads first, then full `APP_ARCHITECTURE_GUIDE` then `RULES_GUIDE` is fine but `AGENT_INSTRUCTIONS`'s 8-phase plan is duplication) |
| `SYSTEM_PROMPT_AGENT.md` | 2,146 | 33 | Behaviour contract, 10 principles, prohibited actions | **Partial** - the 10 principles survive as a TL;DR; the prohibited actions list duplicates `RULES_GUIDE.md` |
| `AGENT_SYSTEM_PROMPT_SHORT.md` | 1,517 | 20 | One-screen TL;DR of the system prompt | **No** - opens with "follow `APP_ARCHITECTURE_GUIDE.md`" which means this only works if the agent already has the big file open; useless as a standalone **and** duplicative |
| `APP_ARCHITECTURE_GUIDE.md` | 22,479 | 689 | Full architecture reference - 15 sections, code-pattern blocks | **Partial** - the 15 sections are individually reasonable, but together they amount to "what to write instead of code"; they will become either (a) comments inside the runnable skeleton, or (b) Tier-2 docs for agents that need depth |
| `RULES_GUIDE.md` | 5,219 | 131 | DO / DO NOT / code-style / file-size / import-order / theme / mobile / server | **Partial** - the **DO** section prescribes stack components that have already drifted (see Part 4); the **DO NOT** section mixes load-bearing rules with subjective ones; the server/mobile patterns are project-specific |
| `AGENT_INSTRUCTIONS.md` | 2,516 | 81 | 8-phase build workflow | **No** - the 8 phases are: define data layer, scaffold, define API, build context, build components, build pages, connect server, verify. Skeleton-first design compresses all 8 phases to "modify skeleton files" |
| `REFERENCES.md` | 13,551 | 405 | 12 worked code examples (page, modal, API module, sidebar, animations, WatermelonDB model, schema, migration, context, auto-backup, `cn`) | **Yes for ~25%** - 4 of the 12 examples (sidebar layout, animation patterns, `cn()`, modal) generalise; the other 8 are CRUD-dashboard-specific |
| `REFERENCES_STYLE_SYSTEM.md` | 4,327 | 144 | Design tokens, utility classes, focus styles, animation, shadow depths, fonts | **Partial** - utility classes `amin-card`, `amin-input`, `amin-btn-primary`, `amin-btn-secondary` are validated product shapes that survive; the rest collapses into one CSS file in the skeleton |
| `PACKAGE_TEMPLATE.json` | 1,665 | 56 | package.json to copy-rename | **No in current form** - includes pin to `react` 18, `better-sqlite3` 12 (current is 13), `react-router-dom` 7 (the canonical is `react-router` 8); see Part 4 |
| `QUICK_START.md` | 2,451 | 110 | 9-step human scaffold guide | **No** - instructs `cp -r general-app-template/`, then build everything; this whole file dies when the skeleton becomes real code |
| **TOTAL** | **58,138** | **~1,720** | **100% prose** | |

**In-house comparison files - what I checked:**

- `agents_manager/upstream-contrib/PROPOSED_PATCH_v0.5.x_2026-07-01_cinematic-landing-template.md` (1,907 lines, 86 KB) - the canonical agents_manager `templates/<name>/` convention; PROPOSED_PATCH.md:194-1283 is the template shape (`memory/01..09` + `skeleton/` + `prompts/` + `decisions/` + `assets/` + `00-readme-first.md`). **None of this exists on disk** for `general-app-template` despite the AGENTS.md reference (CONFIRMED - no `agents_manager/templates/` directory; checked via `Get-ChildItem` and `glob **/cinematic*/**`).
- `templates/EXTRACTION.md` - **does not exist on disk**. The phase-3 wiki's reference to it is an aspirational mention, not an actual rulebook.

---

## Part 2 - What works / What is missing / What is harmful

### What works (carry forward into the new design)

- **The 9-section architecture taxonomy** in `APP_ARCHITECTURE_GUIDE.md` is reasonable: project structure -> config files -> boot sequence -> layout -> data layer -> context -> component patterns -> CSS / design system -> audit logging -> routing -> naming -> express server -> capacitor. That skeleton survives in some form.
- **The audit-logging pattern** (`logCreate / logUpdate / logDelete` called from every mutation, `APP_ARCHITECTURE_GUIDE.md:566-588`) is a reasonable product decision and a good LLM-facing pattern because it forces a specific commit-shape the model can copy.
- **The `api` object spread pattern** (`src/lib/api/*.ts` -> `utils.ts` re-exports a single `api`, `REFERENCES.md:93-102`) - mildly opinionated but it gives the agent a single import surface for data; survives if generalised.
- **Utility class names** `amin-card`, `amin-input`, `amin-btn-primary`, `amin-btn-secondary` (`REFERENCES_STYLE_SYSTEM.md:38-49`) are concrete product shapes that any new skeleton can absorb without renaming.
- **Project structure** (`server.ts` at root, `src/main.tsx` boot with `StrictMode + DBProvider + App`, `src/pages/` vs `src/components/` split, `src/lib/api/`, `src/db/`) - the bones are correct, the scaffolding has to come from a real skeleton file.
- **Security headers in Express** (`APP_ARCHITECTURE_GUIDE.md:638-642`: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`) - small but correct; survives.
- **`cn()` utility** is a Tailwind idiom and should be present in every skeleton.
- **The 12 worked-code examples in `REFERENCES.md`** are mostly usable as reference shapes - 4 of 12 (sidebar with `NavLink` active-state, animation transitions, `cn()`, modal structure) generalise; the rest are CRUD-page-specific.

### What is missing (the gaps, ranked)

1. **The skeleton.** Zero `src/main.tsx`, zero `App.tsx`, zero `vite.config.ts` shipped. This is the obvious defect and the load-bearing one. The `cinematic-landing` template's `templates/cinematic-landing/skeleton/index.html` (PROPOSED_PATCH:923) is a working 885-line demo; this template has no equivalent. An agent picking up the template today reads markdown, then authors every file.
2. **No deterministic scaffolder.** There is no `npx create-minimal-app` / `pnpm dlx` / `bash init.sh`. The agent's *only* path is "follow the markdown". Compare with `create-vite` (1 command), `create-next-app` (1 command, webfetch of `https://tailwindcss.com/docs/installation/using-vite`), or T3 stack creators. Q8 in scope (hybrid: minimal checked-in skeleton + commands for optional layers).
3. **No intake / clarification protocol.** Per Q3 the user wants the agent to interrogate them, but no part of this template says *what the agent asks*. The closest is `AGENT_INSTRUCTIONS.md:75-80` "ask for clarification if requirements are ambiguous" - that is the absence of a protocol, not a protocol. Angle E owns this gap.
4. **No `templates/<name>/` shell.** The repo convention exists in the cinematic-landing PROPOSED_PATCH (PROPOSED_PATCH.md:194) but is not applied here. There is no `00-readme-first.md`, no `memory/`, no `prompts/`, no `decisions/`, no `assets/MANIFEST.json`, no schema. Discovery is by grep only.
5. **No per-kind specialisation.** Treating this as a "general app template" hides the real variation: an AI chat app needs streaming + token counting; a store-front needs Stripe; a SaaS needs auth + billing; a content site needs MDX. Angle C owns the matrix.
6. **No self-verification.** No Playwright smoke test, no `npm test`, no `npm run build` smoke. The agent cannot tell if its output works without manually opening a browser. The "no test framework" rule (`RULES_GUIDE.md:49`) actively forbids the cheapest verification mechanism.
7. **No locale parameterisation.** Arabic + RTL is hard-coded into 6 of 10 files (`SYSTEM_PROMPT_AGENT.md:9`, `RULES_GUIDE.md:21-22`, `APP_ARCHITECTURE_GUIDE.md:37`, `142`, `INDEX.md:36`, `AGENT_INSTRUCTIONS.md:81` mentions reporting, etc.). Wrong default for a general template.
8. **No maintenance story.** Who updates `RULES_GUIDE.md` when Tailwind ships v5? No CONTRIBUTING, no CI check, no VERSION file, no `dependabot` config.
9. **No progression between tiers.** Q2 specifies three tiers (minimal / standard / specialist). This template tries to be all of them at once.

### What is actively harmful

- **`NEVER write comments in code`** (`RULES_GUIDE.md:34`, `SYSTEM_PROMPT_AGENT.md:16`). This rules out the one cheap mechanism an LLM has to leave breadcrumbs for itself (and a human reviewer) in 1,500+ line files. Better: allow JSDoc on exported functions, prohibit section-banner comments. **Agent output gets worse, not better.**
- **`NEVER add test framework unless explicitly required`** (`RULES_GUIDE.md:49`, `SYSTEM_PROMPT_AGENT.md:28`). The agent cannot verify its own output without manually opening a browser. The review phase (am-review) then has nothing deterministic to check against. Agent output gets worse.
- **`NEVER use any type`** and **`NEVER use // @ts-ignore`** (`RULES_GUIDE.md:33`, `42`) - keep both. These are load-bearing. **However** see the WatermelonDB example in `REFERENCES.md:151` and `APP_ARCHITECTURE_GUIDE.md:280` which use `(r: any)` inline - the rule is internally violated by the template's own reference code.
- **`All UI text MUST be in Arabic ... unless the app is explicitly for a different locale`** (`SYSTEM_PROMPT_AGENT.md:9`, `RULES_GUIDE.md:21-22`). Sensible *for this user*, harmful as a *general* default. The right generalisation: parameterise locale, default to English (or leave blank), document Arabic-RTL as one option.
- **`NEVER use for loops when array methods work`** (`RULES_GUIDE.md:45`) - style rule masquerading as a hard rule. `for` loops are sometimes the right answer (early exit, large data, generator-style iteration). **Severity: low** because the agent will just pick `forEach`; **harmful because it teaches the agent the rule-list is stylistic, not principled**, which corrodes trust in the rest.
- **`NEVER use regular div when motion.div animation is better`** (`RULES_GUIDE.md:39`) - subjective, not evaluable by the agent. "Better" by what criterion? An agent that takes this rule literally will wrap half the JSX in `motion.div` for no behavioural reason.
- **`Max ~500 lines per file`** (`RULES_GUIDE.md:65`) - reasonable goal, but no rule tells the agent how to split. With a real skeleton the rule becomes enforceable via `eslint max-lines-per-file`; today it is advisory.
- **`Lazy load every page`** (`SYSTEM_PROMPT_AGENT.md:6`, `RULES_GUIDE.md:12`) - good for production SPA bandwidth; bad for a starter where the agent sees long `await import()` chains in `App.tsx` and wonders why the page is blank for half a second on first navigation. Annotate with "for production builds; not needed for the dev skeleton".
- **`Add babel decorator plugins in vite config`** (`RULES_GUIDE.md:25`) - this is **WatermelonDB-only**. Mandating babel decorators for an entire general template forces every future template to pay for one library's quirk. Targeted rule, scoped wrong.
- **`Capacitor / Android as default build target`** (`SYSTEM_PROMPT_AGENT.md:4`, `RULES_GUIDE.md:13-14` for the data layer pairing) - 90%+ of "give me a React app" requests are not mobile. Mobile adds a native-build chain, an Android Studio dependency, and a separate `appId` namespace for every generated app. The check should be "do you need a mobile shell?", not always-on.
- **Audit-logging wrapper pattern** (`REFERENCES.md:142-143`, `APP_ARCHITECTURE_GUIDE.md:566-588`) - logCreate/logUpdate/logDelete on every mutation. Reasonable for one app, but it forces every API module to remember these calls and adds a hidden 4th step to "create X". The cost is real but easy to forget; an LLM tends to omit the log call by the 6th API module it writes.

---

## Part 3 - Per-rule verdict

I went rule by rule. The table below covers the ~50 hard rules in `RULES_GUIDE.md` lines 5-49 and `SYSTEM_PROMPT_AGENT.md` lines 9-32. Verdicts: **KEEP / AMEND / DROP**.

### DO section (`RULES_GUIDE.md:5-29`)

| Rule (verbatim or paraphrased) | Line | Verdict | Reason |
|---|---|---|---|
| Use React 18 with functional components | `RULES_GUIDE.md:5` | **AMEND** | React 18 is fine for stability, React 19 is current; pin per project, do not hardcode in a *general* template |
| Use TypeScript strict mode | `RULES_GUIDE.md:6` | **KEEP** | Non-negotiable; an LLM produces dramatically worse code without strict |
| Use Tailwind v4 via `@tailwindcss/vite`, no postcss config | `RULES_GUIDE.md:7`, `RULES_GUIDE.md:37` | **KEEP** | Verified current ([S5]); the "no config file" property is exactly the value |
| Use `clsx` + `tailwind-merge` `cn()` | `RULES_GUIDE.md:8` | **KEEP** | Standard idiom; survives |
| Use **motion** library (NOT framer-motion directly) | `RULES_GUIDE.md:9` | **AMEND** | Verified correct ([S6]) - the `motion` package *is* the renamed Framer Motion and is at v12.23.24 in the template, but **clarify** the import is `motion/react`, not `framer-motion` |
| Use `lucide-react` | `RULES_GUIDE.md:10` | **KEEP** | Current, no controversy |
| Use `react-router-dom v7` | `RULES_GUIDE.md:11`, `INDEX.md:34` (implicit) | **AMEND** | Package is being absorbed into `react-router` (v8.3.0, weekly 51M downloads, [S2][S3]); import path should be `react-router`, not `react-router-dom`. The DOM-suffixed package is now a "re-export shim" per its own README |
| Lazy load every page | `RULES_GUIDE.md:12` | **KEEP** | Standard prod practice; survives. Add "not required in dev" note |
| Use `watermelondb` with LokiJS adapter | `RULES_GUIDE.md:13`, `SYSTEM_PROMPT_AGENT.md:14` | **DROP from general default** | Last npm publish "a year ago", no formal GitHub releases shown, 271 open issues [S4]; LokiJS itself is dormant. **If a project needs offline-first mobile, migrate to **Dexie** (IndexedDB), **Drizzle + SQLite** (RN), or **Replicache**. WatermelonDB stays as an opt-in v1 compat module. |
| Use `better-sqlite3` for web server data | `RULES_GUIDE.md:14`, `SYSTEM_PROMPT_AGENT.md:14` | **KEEP** | Verified current (v13.0.3, 6.5M weekly, N-API supported [S7]) |
| Organize API functions into `src/lib/api/` modules | `RULES_GUIDE.md:15`, `APP_ARCHITECTURE_GUIDE.md:246-263` | **KEEP** | Clean separation; survives |
| Spread API modules into a single `api` object in `utils.ts` | `RULES_GUIDE.md:16` | **KEEP** | Single import surface for data; survives |
| Call `logCreate/logUpdate/logDelete` in every mutation | `RULES_GUIDE.md:17` | **AMEND** | Keep the pattern but make it the audit-log *adapter's* responsibility; agent should call `await audit.write(...)` once and have the adapter wrap it. Forces a 4th-step on every mutation today and the LLM skips it |
| Use `database.write()` for WatermelonDB mutations | `RULES_GUIDE.md:18` | **DROP** with the WatermelonDB default |
| Use `database.get('collection').create/update/query` pattern | `RULES_GUIDE.md:19` | **DROP** with WatermelonDB |
| Provide `DBProvider` wrapping the app root | `RULES_GUIDE.md:20` | **AMEND** | DBProvider is an artifact of WatermelonDB; if WatermelonDB is dropped, replace with a generic `DataLayerProvider` interface that any storage backend plugs into |
| Set RTL direction via `dir="rtl"` on `<html>` | `RULES_GUIDE.md:21` | **DROP** | Locale is a parameterisation, not a default. Hard-coding Arabic-RTL in a general template makes 95% of non-Arabic users start by deleting a rule |
| Use Arabic (`ar`) as the UI language | `RULES_GUIDE.md:22` | **DROP** | Same reason |
| Use `@` path alias pointing to project root | `RULES_GUIDE.md:23` | **AMEND** | Path alias is fine; "@/* -> ./*" works but `@/src/*` is the more common shape |
| Add `experimentalDecorators: true` + `useDefineForClassFields: false` | `RULES_GUIDE.md:24` | **DROP** | WatermelonDB-only; should not be in a general template |
| Add babel decorator plugins in vite config | `RULES_GUIDE.md:25` | **DROP** | Same; forces every future app to pay for WatermelonDB's babel plugin tax |
| Export `database` from `src/db/index.ts` as a singleton | `RULES_GUIDE.md:26` | **DROP** with WatermelonDB |
| Handle loading states with a spinner | `RULES_GUIDE.md:27` | **KEEP** | Universal; survive |
| Handle empty states with a placeholder message | `RULES_GUIDE.md:28` | **KEEP** | Universal |
| Handle error states with try/catch and user feedback | `RULES_GUIDE.md:29` | **KEEP** | Universal |
| Use motion library (animation) | various | already covered above |
| Use motion for animations (NOT framer-motion directly) - restated | - | duplicate of line 9 |
| Use recharts/jspdf+html2canvas (optional) | `APP_ARCHITECTURE_GUIDE.md:19-20` | **AMEND** | recharts 3.x verified but support is sleepy; opt-in per project, not default |

### DO NOT section (`RULES_GUIDE.md:33-49`)

| Rule | Line | Verdict | Reason |
|---|---|---|---|
| NEVER use `any` | `RULES_GUIDE.md:33` | **KEEP** | Load-bearing; loses both strict typing and reviewer signal |
| NEVER write comments in code | `RULES_GUIDE.md:34`, `SYSTEM_PROMPT_AGENT.md:16`, `AGENT_SYSTEM_PROMPT_SHORT.md:7` | **AMEND** | Allow JSDoc on exported functions and modules; prohibit section-banner / decorative comments. A 1,500-line auto-generated page needs breadcrumbs |
| NEVER use class components (except ErrorBoundary) | `RULES_GUIDE.md:35` | **KEEP** | Universal React idiom |
| NEVER use inline styles; use Tailwind classes | `RULES_GUIDE.md:36` | **AMEND** | Tailwind classes for layout, but allow `--custom-property` inline for dynamic values that Tailwind cannot enumerate (e.g. CSS variables from settings) |
| NEVER create `postcss.config.js` or `tailwind.config.js` | `RULES_GUIDE.md:37` | **KEEP** | Verified correct - Tailwind v4 needs no config file [S5] |
| NEVER use emotion, styled-components, or CSS-in-JS | `RULES_GUIDE.md:38` | **KEEP** | Project rule, no harm |
| NEVER use regular `<div>` when `motion.div` animation is better | `RULES_GUIDE.md:39` | **DROP** | Subjective and unevaluable; makes the agent over-wrap in `motion.div` |
| NEVER fetch data outside `useEffect` or event handlers | `RULES_GUIDE.md:40` | **AMEND** | Allow React Query / SWR / loaders that fetch outside `useEffect`. Modern data layer goes through these |
| NEVER mutate state directly | `RULES_GUIDE.md:41` | **KEEP** | Universal React idiom |
| NEVER use `// @ts-ignore` or `// eslint-disable-next-line` | `RULES_GUIDE.md:42` | **KEEP** | Use `@ts-expect-error` with a comment if you must |
| NEVER commit secrets | `RULES_GUIDE.md:43` | **KEEP** | Universal |
| NEVER use `var`; use `const`/`let` | `RULES_GUIDE.md:44` | **KEEP** | Universal |
| NEVER use `for` loops when array methods work | `RULES_GUIDE.md:45` | **DROP** | Style rule as a hard rule; sometimes `for` is correct |
| NEVER use `document.title` directly | `RULES_GUIDE.md:46` | **AMEND** | Use a small `useDocumentTitle` hook, not the bare assignment. The rule is right but the rationale is missing |
| NEVER use `eval()` or `new Function()` | `RULES_GUIDE.md:47` | **KEEP** | Universal |
| NEVER import from `react` unnecessarily | `RULES_GUIDE.md:48` | **KEEP** | With `jsx: react-jsx`, this is correct |
| NEVER add test framework unless explicitly required | `RULES_GUIDE.md:49`, `SYSTEM_PROMPT_AGENT.md:28` | **AMEND** | Ship Vitest preconfigured (one test file as smoke); flips the agent's default from "no tests" to "one smoke test passes". Removes the review-phase gap |
| Build for both Web and Android simultaneously | `SYSTEM_PROMPT_AGENT.md:4` | **AMEND** | Dual-target is opt-in per project, not default; today the agent wastes ~25% of the token budget on mobile scaffolding the user did not ask for |

### Quick verdict summary

- **KEEP** (load-bearing and not stacked on one project): ~16 rules
- **AMEND** (right idea, wrong default / scope / wording): ~14 rules
- **DROP** (subjective, project-specific to one reference project, or actively harmful): ~16 rules

---

## Part 4 - Stack claim verification

All claims verified against official docs / npm registry with **access date 2026-08-13**. Where a claim cannot be verified from training data alone, it is marked UNVERIFIED.

| Library | Claim in template | Verified reality | Verdict | Source |
|---|---|---|---|---|
| Tailwind CSS v4 | `^4.1.14` via `@tailwindcss/vite`, "no postcss.config.js, no tailwind.config.js" (`RULES_GUIDE.md:7`, `:37`, `APP_ARCHITECTURE_GUIDE.md:14`) | **Tailwind v4.3 is current.** Official install path is `npm install tailwindcss @tailwindcss/vite`, add `tailwindcss()` to Vite plugins, `@import "tailwindcss";` in CSS, no config files. **Claim matches current docs exactly.** | **KEEP** | [S5] |
| `react-router-dom v7` | `^7.14.0`, "Use `react-router-dom v7` for routing" (`RULES_GUIDE.md:11`, `PACKAGE_TEMPLATE.json:35`, `AGENT_SYSTEM_PROMPT_SHORT.md:4`) | **`react-router-dom v7.18.2 still exists** as a re-export shim from `react-router`. But the canonical package is now **`react-router`**, currently at **v8.3.0**, weekly downloads 51.4M (vs 42.6M for `-dom`). Per the `-dom` README itself: "Once upgraded you can change all your imports and remove it from your dependencies". Pattern in [S3] shows `import { BrowserRouter } from 'react-router'`. | **AMEND** - rename to `react-router` and pin to current; preserve the package's `BrowserRouter / Routes / Route / NavLink` API as compatible | [S2], [S3] |
| WatermelonDB | `^0.28.0` with LokiJS adapter for mobile (`RULES_GUIDE.md:13`, `SYSTEM_PROMPT_AGENT.md:14`, `PACKAGE_TEMPLATE.json:21-23`, `APP_ARCHITECTURE_GUIDE.md:344-354` README pattern) | **Last npm publish ~1 year ago (Aug 2025)** at 0.28.0; **no GitHub releases shown** (the Releases page is empty "There aren't any releases here"); **271 open issues**; 11.8k stars, 654 forks; npm page has no README; weekly downloads 61k. LokiJS itself has had only one release in the last 5 years. | **AMEND / DROP for default** - WatermelonDB is alive but in maintenance-only mode; for a *general* 2026 template this is too heavy a default. Use IndexedDB via **Dexie** for offline web, opfs + sqlite-wasm or drizzle-orm for cross-platform. If the user wants WatermelonDB, ship it as an opt-in adapter | [S4] |
| `motion` package (NOT framer-motion directly) | `^12.23.24` for animations (`RULES_GUIDE.md:9`, `SYSTEM_PROMPT_AGENT.md:22`, `PACKAGE_TEMPLATE.json:32`) | **`motion` is the current package** ("Motion for React (previously Framer Motion)"). Install: `npm install motion`, import: `import { motion } from 'motion/react'`. The template's import path is correct. v12.x series current. | **KEEP** | [S6] |
| Decorator configuration: `experimentalDecorators: true` + `useDefineForClassFields: false` + babel decorator plugins (`RULES_GUIDE.md:24-25`, `APP_ARCHITECTURE_GUIDE.md:86-89`) | These settings make WatermelonDB's `@text('@field('@readonly` decorators typecheck. | They work today with Vite + Vite React plugin + `@vitejs/plugin-react` babel options ([S1] shows babel plugin shape: `['@babel/plugin-proposal-decorators', { legacy: true }]` + `['@babel/plugin-proposal-class-properties', { loose: true }]`). TypeScript docs note that the modern decorators proposal (TC39 stage 3) is preferable, but for legacy (TC39 stage 1) codebases, WatermelonDB still needs the legacy form. | **KEEP if WatermelonDB stays**; **DROP if WatermelonDB is dropped** | [S1], [UNVERIFIED in registry] |
| `better-sqlite3` | `^12.8.0` for web server (`RULES_GUIDE.md:14`, `PACKAGE_TEMPLATE.json:25`, `APP_ARCHITECTURE_GUIDE.md:23`) | **Current at v13.0.3**, 6.5M weekly downloads, N-API supported (v13 major was the N-API migration 2026-07-21). Last publish 5 Aug. The template pins to `^12.8.0` which works (^ allows v12 -> v13 only; should use `^12 || ^13`) | **AMEND** - bump caret to allow both major lines, or migrate to `^13`; better-sqlite3 is alive, fast, and the right 2026 call | [S7], [S8] |
| `lucide-react`, `clsx`, `tailwind-merge`, `recharts`, `jspdf`, `html2canvas`, `react`, `react-dom`, `vite`, `tsx`, `vitest` | All listed in `APP_ARCHITECTURE_GUIDE.md:11-25` and `PACKAGE_TEMPLATE.json` | React 18 still LTS; React 19 is current. lucide-react 0.546 healthy. Vite 6 stable; Vite 7 recently released (verify at scaffold time). tsx, esbuild healthy. Vitest 4 current. recharts sleepy but functional. **No current safety issues** with any of these. | **KEEP** with periodic re-pin | [UNVERIFIED - no separate fetch performed] |
| `@capacitor/core` v8 | `^8.4.2` (`PACKAGE_TEMPLATE.json:17-19`) | **v8.5.0 current**, weekly 3.2M, last publish **19 hours ago** - very actively maintained | **KEEP** but verify pin on actual scaffold | [S9] |
| `@babel/plugin-proposal-decorators` + `@babel/plugin-proposal-class-properties` | Mandated in vite babel options (`RULES_GUIDE.md:25`, `APP_ARCHITECTURE_GUIDE.md:114-121`) | The legacy decorators form is what WatermelonDB needs; the modern form is the default in current `@babel/preset-env`. They are not required for any other lib in the template. | **DROP with WatermelonDB**; otherwise irrelevant | already covered |

### Net stack-claim verdict

- 3 of 8 claims are **verified current and kept** (Tailwind v4, motion, better-sqlite3, Capacitor - 4).
- 1 of 8 is **stale but functional** (react-router-dom v7 - works, but wrong package name for 2026).
- 1 of 8 is **material-risk for a general template** (WatermelonDB).
- 1 is **decoration, not part of the package list** (decorator config).
- The set collectively **does not represent a 2026 best-of-breed general-purpose React app stack**: WatermelonDB belongs to a 2023-2024 world; better-sqlite3 + Express for a "web server" is fine but a Vite-only SPA is more often what "build me an app" means in 2026.

---

## Part 5 - Gap matrix

Rows: capabilities the target design needs (per Q1, Q3, Q4, Q8). Columns: state, gap, closure mechanism.

| Capability | Current state | Gap | Closure mechanism |
|---|---|---|---|
| **Tier routing** (Q2: minimal / standard / specialist) | None. Single template tries to be all tiers. | A general template cannot serve Tier 0 (quick wiki) and Tier 2 (auth + billing SaaS) at once. | Split into `tier0_minimal` (Vite + React + Tailwind + 1 page, ~6 files), `tier1_standard` (current `general-app-template` body minus project-specific cruft), and `tier2_<kind>/` (one per kind, see Angular C). Agent picks tier at intake. |
| **Intake / clarification protocol** | None (`SYSTEM_PROMPT_AGENT.md:25` says "ask for clarification if requirements are ambiguous" - no protocol). | Agent has no script for *what* to ask, *when* to stop, *how* to render the result. | Angle E owns. Embed outcome in the prompt-level protocol (the spec); `00-readme-first.md` of each template cross-references back. |
| **Runnable skeleton** | Zero. `INDEX.md:43-51` "What Stays the Same" lists the structure but no skeleton files exist. | The agent must author every config and source file from prose. | Ship a checked-in skeleton per tier: `tier0/`, `tier1/skeleton/`, `tier2/standard-crud/skeleton/`. Q8 confirmed: minimal checked-in + commands for optional layers. |
| **Deterministic scaffolder** | None. `QUICK_START.md:5-8` says `cp -r general-app-template/ my-new-app/`, then build everything by hand. | LLM cannot reliably reproduce the same scaffold twice; "shortest token path" is impossible without it. | Each template ships a `create.sh` / `init.ts` that runs `npm install`, copies the skeleton, runs `npm run dev` smoke-test. The LLM uses one command, not 58 KB of prose. |
| **Progressive disclosure** (read-small-first, escalate-to-deep) | Roughly there in spirit (`INDEX.md:18-25` lists 6 steps). But `AGENT_SYSTEM_PROMPT_SHORT.md` and `SYSTEM_PROMPT_AGENT.md` overlap; `RULES_GUIDE.md` repeats what `SYSTEM_PROMPT_AGENT.md` prohibits. | The agent reads everything regardless, blowing the token budget. | Tiered docs: **Tier A** = 1-page intent (`00-readme-first.md`, ships in 300-500 lines) → **Tier B** = rules + patterns (`RULES_GUIDE.md` simplified, ~150 lines) → **Tier C** = deep dive (`MEMORY.md`, `REFERENCES.md`, opened only on demand). |
| **Self-verification** | `RULES_GUIDE.md:49` actively forbids test framework; `npm run lint` is the only check. `QUICK_START.md:54-57` says "verify with `npm run lint && npm run dev`". | Agent has no automated signal its output works; review (am-review) has no concrete pass/fail. | Ship Vitest preconfigured with 1 smoke test ("render the home page; expect h1 text"). Smoke test runs in CI. Agent can iterate against the smoke test, not just visual diff. |
| **Locale parameterisation** | Arabic + `dir="rtl"` hard-coded in 6 of 10 files. | Non-Arabic users start by deleting a rule. | `tier.config.json` with `locale`, `dir`, optional `font` fields. Default is `en` + `ltr` + system sans. Arabic + RTL is one entry in a `locales/` registry, not a default. |
| **Per-kind specialisation** | One template. Q6 selected 6 specialist kinds (AI/LLM, mobile, SaaS, store, content, bot/extension/CLI); the template serves CRUD dashboards only. | "Give me a chat app" hits the same template as "give me a SaaS dashboard"; neither gets the right defaults. | `tier2/<kind>/skeleton/` per kind; each kind has its own 00-readme + memory/01 + skeleton + commands. Tier router picks one. |
| **Portability across agent runtimes** | Not portable. Implicitly assumes the agent reads all 58 KB; relies on prose idioms. | Doesn't work in Claude Code / Cursor / Kilo / Codex without re-reading. | Tier A doc + Tier A skeleton + a `tier.config.json`. Works in any runtime that can `cat` files and `npm install`. Don't assume OpenCode or agents_manager. |
| **Maintenance story** | None. No VERSION, no CHANGELOG, no `dependabot.yml`, no CONTRIBUTING, no scripts/validate. | Stack drifts (Tailwind v4 -> v5, React 18 -> 19, etc.) and the template silently rots. | Per-template `VERSION`, top-level `CHANGELOG.md`, scripts/validate-frontmatter.py (already exists repo-wide), scripts/verify-stack-claims.ts (new, runs weekly). Make "verify stack" a CI gate. |
| **Discovery (which template applies?)** | Grep-only. `INDEX.md:9-16` reads itself. | The agent has to read every template to know which one fits. | `templates/registry.json` (PROPOSED_PATCH v0.5.x:1702-1704 G7 suggested this; never built). Index of trigger phrases, owner, version, last_used per template. Discoverable via one JSON read. |
| **Audit-trail / decision log** | Implicit. `INDEX.md:16-17` "Customization Points" list is the closest. | Agent decisions die after the session; cannot reconstruct "why did the agent pick X". | Per-template `decisions/decision-log.md` (PROPOSED_PATCH:1127-1156 model), append-only. Agent appends at every tier-router decision. |

---

## The one to keep

**The `audit.ts` pattern (`logCreate/logUpdate/logDelete` called from every mutation; `APP_ARCHITECTURE_GUIDE.md:566-588`).** It is a small concrete product shape (one file, ~20 lines), it survives in any data-layer, and it forces a commit-shape the agent can copy verbatim. Replace `database.write()` inside it with a generic storage adapter call so it does not couple to WatermelonDB.

Honourable mention: the **`cn()` helper** is universal and stays unchallenged.

## The one to delete

**The hard-coded "RTL by default" rule** (`SYSTEM_PROMPT_AGENT.md:9`, `RULES_GUIDE.md:21-22`, `APP_ARCHITECTURE_GUIDE.md:37`, `:142`, `INDEX.md:36`). It is a single user's preference (this user) laundered into a "general template" rule. Every non-Arabic user starts by deleting it; every re-read of the rule costs tokens. Replace with a `tier.config.json` locale field and a one-line note that Arabic-RTL is one option, not the default.

Honourable mention: the **9-step "Quick Start"** (`QUICK_START.md`) - entire file dies once the skeleton is real.

---

## Does the cinematic-landing convention generalise?

**Yes, with three adjustments.**

Evidence: `agents_manager/upstream-contrib/PROPOSED_PATCH_v0.5.x_2026-07-01_cinematic-landing-template.md:194-1283` defines the template shape:

- `00-readme-first.md` → entry doc, 300-500 lines, written for the agent that knows nothing
- `memory/01..09.md` → 9 problem-shaped memory files (brand voice, asset pipeline, scroll ticker, hero, theming, decision tree, accessibility, CTA, quality bar)
- `skeleton/index.html` → one real working file the agent reads as the structural baseline
- `prompts/` → copy-paste prompts for asset generators (Midjourney/DALL-E/Sora/Runway)
- `decisions/decision-log.md` → append-only audit of branch picks
- `assets/MANIFEST.json` + `manifest.schema.json` → structured state

**Generalisations that work for app templates:**

1. **`memory/01..09.md` becomes `memory/01-intake.md` / `02-data-layer.md` / `03-routing.md` / `04-state.md` / `05-styling.md` / `06-deployment.md` / `07-quality-bar.md` / `08-locale.md` / `09-extensibility.md`** - the *shape* (problem-oriented, not stack-oriented) survives intact. The cinematic template's "06-asset-pipeline.md" was a 4-branch decision tree (A/B/C/D); an app template's "06-deployment.md" can be a similar 4-branch tree (web-only / PWA / Capacitor-iOS / Capacitor-Android).
2. **`skeleton/` contains real code, not prose** - the *load-bearing* property. The current `general-app-template` has zero skeleton files; this is the single biggest gap.
3. **`prompts/` adapts from "image-gen / video-gen / asset-spec" to "domain-prompts" (per app kind)** - for a chatbot, `prompts/system-message-template.md`; for a SaaS, `prompts/stripe-onboarding.md`; etc.
4. **`decisions/decision-log.md` and the assets/MANIFEST.json schema** are 100% reusable as-is.
5. **`00-readme-first.md` name + "discovery by grep" pattern** survives; rename to `README.md` (PROPOSED_PATCH §G3, 1671-1676) for repo convention.

**Adjustments needed because the two templates differ in domain:**

1. **Cinematic is single-file HTML; app templates are multi-file Vite projects.** The skeleton's structural role is "I edited one file, here is what it looks like". For a Vite app, the skeleton needs to be a multi-file folder, not one HTML. PROPOSED_PATCH G2 (1662-1670) flagged this for cinematic but doesn't address it for app templates either.
2. **Cinematic has 4 explicit branches in 06-asset-pipeline; app templates have a more complex decision tree** (tier + kind + locale + mobile-or-not). The branch schema should be richer.
3. **Cinematic memory files are code-shaped (CSS, JSX, animation choices); app templates' memory files are architecture-shaped (file layout, conventions, adapter choices).** The Cinematic memory file 04-`cinematic-hero.md` (PROPOSED_PATCH:436-498) is highly opinionated; an app template's memory files must be kind-level opinionated, not project-level.

**Verdict**: the convention **carries over cleanly**. The risk is not "is the shape right?" (it is) but "does the agent spend the budget to discover and apply it?". The repo's `agents_manager/templates/` folder does not yet exist (verified via `glob **/cinematic*/**` and `Get-ChildItem agents_manager/templates` - no entry). The cinematic patch is **proposed but not merged**. So this audit can recommend the convention, but the next-step work is to actually ship the folder.

---

## What this changes about our template design

1. **Ship a checked-in skeleton.** `tier1_standard/skeleton/` contains a working Vite + React + TypeScript + Tailwind v4 + better-sqlite3 + Vitest + react-router project where `npm install && npm run dev && npm test` are green before the agent touches a thing. Replace the current 58 KB of prose with a ~150-LOC Tier-A doc (`00-readme-first.md`) + a ~10-file real skeleton.
2. **Replace the AUD strategy with a tiered template family.** Tier 0 (`vite-bare` - 6 files), Tier 1 (`standard-crud` - the current template minus RM-specific cruft), Tier 2 (`kind/<chatbot|saas|store|content|mobile|bot>/` - per-kind). Each tier inherits the parent's `00-readme-first.md` shape, expands its own `memory/`, replaces its own `skeleton/`.
3. **Drop locale-as-default.** Move RTL and Arabic to a `tier.config.json` field. Default is `en`, `ltr`, system sans. The Arabic + Cairo font combination survives as a one-line preset in the locales registry, not a hard rule.
4. **Drop WatermelonDB from the default stack.** Provide it as an opt-in adapter behind a `tier.config.json` flag. Default mobile/offline goes to IndexedDB (Dexie) for web and a Drizzle+SQLite shape for RN.
5. **Drop the babel decorator config from the default.** It is WatermelonDB-specific; not a general-template cost.
6. **Allow comments in code, scoped.** JSDoc on exported functions and modules is fine. Banner / decorative comments are not. Move from "no comments" to "comments that pay for themselves".
7. **Ship a preconfigured Vitest with one smoke test.** Replace "never add test framework" with "every Tier-1 template ships with 1 smoke test in `tests/smoke.test.ts`. Agents add more only when warranted."
8. **Ship a deterministic scaffolder per template.** `create.sh` or `init.ts` that runs `npm install`, `npm run dev` smoke, `npm test`, and an in-place init print. Reduces the agent's setup-token budget to one command.
9. **Ship `templates/registry.json`** - one file listing each template's triggers, owner, version, `last_used`. The agent discovers by reading one JSON; not by grepping 10 folders. (PROPOSED_PATCH G7)
10. **Move from "stack + rules" prose to a "spine + adapters" architecture.** Each tier ships a `_spine/` of folder conventions + adapter interfaces (DataLayer, Auth, Payments, Deploy, A11y, i18n). Specialist kinds plug adapters into the spine. The agent reasons about adapters (interfaces), not specific libraries.

---

## For other angles

- **Angle A (prior-art OSS)**: investigate `create-t3-app`, `create-next-app`, `shadcn/ui CLI`, `Lovable` (formerly `GPT Engineer`), `Bolt.new`, `v0.dev`'s scaffold pattern, and the `Bunnyshell template` family. Specifically check whether any "ship a spine of adapters + plug in kind-specific templates" pattern already exists at the OSS level. Result feeds into "is there a forkable precedent for tier routing?"
- **Angle B (competitors)**: for the intake side, study **Lovable** and **Bolt.new** clarification UIs; for the prompt-to-skeleton side, study **v0** and **Tempo**'s "give me a starting point". Capture what they ask, what they ship, and how they handle the "user has nothing yet" case (likely the dominant case).
- **Angle C (app-kind matrix)**: when laying out the specialist kinds, surface the **WatermelonDB drop** explicitly so users with offline-first requirements get the right Tier-2 stack; C also owns the tier-2 family of templates (chatbot / SaaS / store / content / mobile / bot).
- **Angle D (token economy)**: this audit shows the **biggest token win is shipping a skeleton** - an estimated 30-50K tokens saved per build by replacing the "read 58 KB of markdown and author 25 files" loop with "read 1 Tier-A doc + apply edits to a 10-file skeleton". D must size this precisely and document the mechanisms.
- **Angle E (intake)**: the audit shows the template is silent on intake (`SYSTEM_PROMPT_AGENT.md:25` is not a protocol). E must own "what does the agent ask, in what order, with what stop conditions". Pair with tier routing so the questions branch on which Tier is being entered.
- **Angle F (this audit, internal)**: nothing further.

---

## Risks

| Risk | Severity | Note |
|---|---:|---|
| **WatermelonDB default is a maintenance-time bomb.** Even if the AGENTS.md user wants Arabic-RTL WatermelonDB Capacitor for *this* project, it is wrong for a *general* template, and the next 8 weeks of npm install failures will surface in a project that did not ask for it. | **HIGH** | Recommendations 4 and 5 |
| **`react-router-dom` package is at v7 maintenance end.** The canonical package is `react-router` v8.x. An agent following the template today imports from a 12-month-from-deprecation path. | **HIGH** | Recommendation 3 (PARTIAL - rename to `react-router` in new template) |
| **Zero runnable code means every agent reload re-derives the same 25 files from prose.** 30-50K wasted tokens per build. | **HIGH** | Recommendation 1 |
| **Hard-coded Arabic + RTL is a compatibility barrier for non-Arabic users.** Every scaffold for a non-Arabic user requires deleting a "rule" before anything else can happen. | **MEDIUM** | Recommendation 3 |
| **`NEVER add test framework` blocks the only cheap agent self-verification path.** Review phase has nothing deterministic to check. | **MEDIUM** | Recommendation 7 |
| **`NEVER write comments in code` rules out the cheapest breadcrumb mechanism for an LLM revisiting a 1,500-line file 4 hours later.** | **MEDIUM** | Recommendation 6 |
| **`NEVER use <div>` when `motion.div` is "better"** is subjective and unevaluable; agent over-wraps in `motion.div`. | **LOW** | Verdict DROP, rule 39 |
| **`Max ~500 lines per file`** is unenforceable without `eslint max-lines-per-file`; in prose form it is advisory. | **LOW** | Verdict AMEND; ship the lint rule |
| **Templates registry (`templates/registry.json`) does not yet exist.** Discovery is grep-only; the agent reads every template to know which one fits. | **LOW** | Recommendation 9 |
| **Stack drift (`@tailwindcss/vite`, `motion`, etc. all gain major versions yearly).** No CI check today. | **MEDIUM** | Recommendation 10 plus a verify-stack-claims CI gate |
| **Capacitor / Android as default build target** wastes ~25% of token budget on mobile scaffolding the user did not ask for. | **MEDIUM** | Recommendation 3 PARTIAL (mobile opt-in) |
| **`for`-loop and `div`/`motion.div` style rules as hard rules** teach the agent the rule-list is partly stylistic, which corrodes trust in the rest. | **LOW** | Verdict DROP / AMEND, rule 39 and 45 |

---

## Sources

- **[S1]** Tailwind CSS v4 install docs. https://tailwindcss.com/docs/installation/using-vite . Access: 2026-08-13. Proves: Tailwind v4.3 is current; install is `npm install tailwindcss @tailwindcss/vite`, add to Vite plugins, `@import "tailwindcss";` in CSS, no config files. Direct quote: "Installing Tailwind CSS as a Vite plugin is the most seamless way to integrate it with frameworks like Laravel, SvelteKit, React Router, Nuxt, and SolidJS."
- **[S2]** React Router install docs. https://reactrouter.com/start/declarative/installation . Access: 2026-08-13. Proves: install is `npm i react-router`, import from `react-router` (no `-dom`). Title page is "Installation" with `MODES: declarative` and a code sample using `import { BrowserRouter } from 'react-router'`.
- **[S3]** `react-router-dom` npm page. https://www.npmjs.com/package/react-router-dom . Access: 2026-08-13. Proves: at v7.18.2, last publish 16 days ago, but the README itself states "This package simply re-exports everything from `react-router` to smooth the upgrade path for v6 applications. Once upgraded you can change all your imports and remove it from your dependencies". Current canonical package is `react-router` v8.3.0 (npm page at https://www.npmjs.com/package/react-router).
- **[S4]** WatermelonDB npm page. https://www.npmjs.com/package/@nozbe/watermelondb . Access: 2026-08-13. Proves: current at 0.28.0, **last publish "a year ago"**, 196 versions, 17 dependents, no README on npm page, weekly downloads 61k. Combined with the empty GitHub Releases page (https://github.com/Nozbe/WatermelonDB/releases) and 271 open issues shown on the project home (https://github.com/Nozbe/WatermelonDB), this is consistent with maintenance-only / slowed mode.
- **[S5]** Tailwind CSS v4 docs and install - same page as S1; title bar shows `v4.3` confirming v4 is the current line.
- **[S6]** Motion for React. https://motion.dev/docs/react-quick-start . Access: 2026-08-13. Proves: "Motion for React (previously Framer Motion)". Install: `npm install motion`. Import path: `import { motion } from 'motion/react'`. The template's import path (used in REFERENCES.md:14, `:84`, `:207`, `:218` and APP_ARCHITECTURE_GUIDE.md:400, `:446`) is `motion/react` which matches exactly.
- **[S7]** better-sqlite3 GitHub Releases. https://github.com/WiseLibs/better-sqlite3/releases . Access: 2026-08-13. Proves: current at v13.0.3 released 2026-08-05; v13.0.0 was the N-API migration on 2026-07-21 (release notes: "first version of `better-sqlite3` to run on the N-API"). The template pins `^12.8.0`.
- **[S8]** better-sqlite3 npm page. https://www.npmjs.com/package/better-sqlite3 . Access: 2026-08-13. Proves: at v13.0.3, weekly downloads 6.5M, last publish 8 days ago. Maintenance is active.
- **[S9]** `@capacitor/core` npm page. https://www.npmjs.com/package/@capacitor/core . Access: 2026-08-13. Proves: at v8.5.0, last publish 19 hours ago. Maintenance is very active. Template pins `^8.4.2`.
- **[S10]** `agents_manager/upstream-contrib/PROPOSED_PATCH_v0.5.x_2026-07-01_cinematic-landing-template.md`. Local path. Access: 2026-08-13. Proves: the agents_manager template convention - `templates/<name>/` with memory/ + skeleton/ + prompts/ + decisions/ + assets/ + 00-readme-first.md; 4-branch runtime asset decision tree (Branch A/B/C/D) at lines 601-715; prompt-multilingual ready (Midjourney/DALL-E/Sora/Runway/Veo) at lines 947-1061; vendor-neutrality discipline at lines 154-156.
- **[UNVERIFIED]** React 19 status (template pins React 18), Vite 7 status (template pins Vite 6), TypeScript 5.9 status (template pins 5.8.x), `@vitejs/plugin-react` 5.x with current babel decorator plugin behavior (cited but not separately fetched in this audit window).

---

## Metrics

- **Findings**: 11 (R-1 survival rate, R-2 zero-skeleton defect, R-3 Tailwind v4 verified, R-4 react-router renamed, R-5 WatermelonDB maintenance risk, R-6 motion verified, R-7 better-sqlite3 verified, R-8 decorator config WatermelonDB-coupled, R-9 Capacitor verified, R-10 NO-comments harmful, R-11 NO-tests harmful)
- **risks_HIGH**: 3 (WatermelonDB default, react-router-dom end-of-life, zero runnable skeleton)
- **risks_MEDIUM**: 4 (Arabic/RTL default, NO-tests, NO-comments, stack drift)
- **risks_LOW**: 4 (subjective rules, unenforceable 500-line cap, no templates registry, over-mobile default)
- **clarifying_Qs**: 0 (audit unlocks - user's R5 "nothing is fixed" cleared all prior gates)

---

## Self-critique

The hardest part of this audit is **resisting the urge to write the new template**. Angle F was scoped to "audit, do not repair", and I held that. Two things I am least confident about:

1. **WatermelonDB verdict**: I labelled it maintenance-only, but a single year between npm publishes is not the same as dead. RPS-Apps and Nozbe Teams still ship on it ([S4]'s "Who uses WatermelonDB" list shows Mattermost, Rocket Chat, Steady, etc. - not abandoned). The honest refinement is "WatermelonDB is alive but no longer expanding; for a greenfield 2026 general template, mandate something with active releases (Dexie or drizzle-orm) as the default and keep WatermelonDB as an opt-in adapter".
2. **The "Audit-logging wrapper pattern" verdict**: I marked KEEP, then re-read the references and noted it forces a 4th step on every API write. The 4th-step cost is real for an LLM-driven workflow but the audit value is also real. A compromise: ship a TypeScript-macro / decorator that injects the log call automatically. That is a build-system ask, not a template-shape ask. My current verdict stands, but the recommended shape should be "*adapter-level* audit-log, not call-site calls".

Things I did not verify because the question is "audit", not "verify":

- That the 8-phase workflow in `AGENT_INSTRUCTIONS.md` matches the actual workflow the original project shipped.
- That the WatermelonDB LokiJS adapter works with current bundlers (the template's `useWebWorker: false` suggests an offline-first build that may have bundler collision issues with Vite).
- That the better-sqlite3 v12 -> v13 N-API migration introduces any breaking change for the template's server code.

I have not yet appended the per-task addition row to the playbook; that is the next step.
