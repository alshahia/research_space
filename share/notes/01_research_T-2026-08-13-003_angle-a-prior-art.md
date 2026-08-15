---
task_id: T-2026-08-13-003
angle: A
title: Open-source prior art - is there anything to fork, copy, or depend on instead of building from scratch?
date: 2026-08-13
research_detector_tier: 4
generated_by: MiniMax-M3 (am-research)
status: complete
access_date: 2026-08-13
---

# Angle A - Open-source prior art

**Date:** 2026-08-13
**Task ID:** T-2026-08-13-003
**Sub-agent:** am-research
**Angle:** A - prior-art OSS
**Reuses:** `agents_manager/templates/cinematic-landing/` PROPOSED_PATCH v0.5.x (in-repo convention; sibling angle F verified it generalises); angle D's tier0/tier1/tier2 framing; angle C's per-kind stack picks; angle B's competitor teardown (the 16 closed-source tools are the *adjacent* OSS landscape, not duplicates of what we want to find here).

**Question this angle answers:** Is there any existing open-source thing we should fork, copy, or depend on instead of building from scratch? Split into four priorities:
1. agent-facing template and context conventions (highest-value output)
2. deterministic scaffolders (the "commands" half of Q8's hybrid delivery)
3. open-source prompt-to-app engines
4. spec-driven frameworks and starter kits

---

## Summary (lead with the verdict)

1. **Fork-or-build verdict: BUILD, but INSPIRE-from-three and USE-AS-DEPENDENCY-on-the-rest.** No single OSS project today is the whole "tiered agent-facing app-template family". The closest is Anthropic Skills + AGENTS.md + a Vite/Next scaffolder wired together; everything else is one of those layers in isolation. **No fork candidate.**
2. **Recommended file-format convention: AGENTS.md (the open standard, 60k+ projects) + Anthropic Skills SKILL.md (the open progressive-disclosure standard since 2025-12-18) + the in-repo `agents_manager/templates/cinematic-landing/` shape (`memory/ + skeleton/ + prompts/ + decisions/ + assets/ + 00-readme-first.md`).** Nothing else beats this trio on adoption breadth, agent-runtime portability, and progressive-disclosure discipline. Concretely: ship `AGENTS.md` at the family root for the cross-tier entry; `SKILL.md` per tier for progressive disclosure; the cinematic-landing shape for per-tier discovery and decisions.
3. **For the "commands" half of Q8's hybrid delivery, hard-code: `create-vite` (react-ts), `create-next-app` (with `--no-eslint --no-tailwind --no-src-dir --no-turbo --import-alias` flags; flagged as interactive in some setups), `create-expo-app`, `shadcn` CLI, WXT, Medusa's CLI, Better-T-Stack. Avoid as a hard-coded scaffolder: `create-t3-app` (interactive prompts even with flags), `Wasp init`, `WunderGraph**, RedWood CLI (all prompt TTY).** Any scaffolder that blocks on a TTY prompt is unusable from a non-interactive agent — that is the **load-bearing** trap. Detailed list in Priority 2.
4. **None of the open-source prompt-to-app engines (bolt.diy, OpenHands, gpt-engineer, Pythagora/GPT-Pilot, Dyad, Onlook, srcbook, Plandex, Aider, Goose, Cline, Roo Code) does the full loop** (chat-idea → clarify → template-route → skeleton-init → runnable-app). The closest three are bolt.diy (closest to the scaffold loop but lacks clarification protocol), gpt-engineer (closest to clarify-then-build but locks to single-language), and Aider (closest as a CLI-pair-programmer but is repo-only). All require substantial glue to assemble the agent-facing family we want. **Recommendation: use bolt.diy / Aider / Cline only as inspiration for the clarification + auto-fix loop; do not try to fork any of them.**
5. **Spec-driven frameworks (GitHub spec-kit, BMAD-Method, agent-os, claude-task-master): all MIT, all 2025-2026 vintage, all repo-shaped as `templates/<role>/` with a memory/. Verdict: INSPIRE, do not fork.** spec-kit's `/specify` → `/clarify` → `/plan` → `/tasks` flow validates the restate-and-confirm mechanic Angle E landed on; BMAD's agent-roles (`pm`/`architect`/`dev`/`qa`) validate the multi-specialist pattern; none is worth forking wholesale because each ties to a single agent harness.
6. **Starter kits (Makerkit, Supastarter, ShipFast, Next.js SaaS Starter): USE-AS-DEPENDENCY for the SaaS-tier concrete shape; AVOID as a wholesale template substitute.** Most are Next.js-only, lock-in to one stack, and sell as commercial products; the agent needs portable markdown, not someone else's React.
7. **License and maintenance traps flagged loud**: **Plasmo** is moving towards BSL on parts of its dev tooling (verify before copy); **Theatre.js** studio is AGPL-3.0 (ANGLE F already flagged); **Aider** is Apache-2.0 OK; **bolt.diy** is MIT OK; **spec-kit** MIT OK; **BMAD-Method** MIT OK; **Makerkit** is commercial (no MIT fork); **ShipFast** is commercial; **Supastarter** is commercial; **Next.js SaaS Starter** by ixartz is MIT OK. Star counts are misleading: **gpt-engineer** ~75k stars but the repo is in maintenance-only mode (last meaningful commit ~6 months ago at access date).
8. **The single most consequential finding: there is no OSS that already solves Q1/Q2/Q5/Q6/Q8 together.** This means we must BUILD. But we do not need to invent — every layer of the design has a working OSS reference. The build is assembly + integration + a checked-in skeleton, not invention.

---

## Priority 1 - Agent-facing template and context conventions (most important)

These conventions define how agents consume instructions. **They are exactly what we are designing.** The verdict below is the highest-value output of this angle; downstream angles (planning, design) should not have to redo this comparison.

### 1.1 AGENTS.md (the `agents.md` standard)

- **What it is:** A markdown file at a project root (or any folder) that an agent reads as standing instructions. Convention crystallised in early 2025 and reached wide adoption across Cursor, Aider, Devin, Windsurf/Devin Desktop, Claude Code, OpenCode, GitHub Copilot Coding Agent, Codex, Gemini Code Assist, and others [S1][S2][S3][S4][S5].
- **Stars / adoption:** ~60,000+ GitHub projects contain an `AGENTS.md` file at access date 2026-08-13 [S5]. The `agents.md` website (`https://agents.md/`) is the canonical spec.
- **What it specifies:** plain markdown, no required schema. Free-form sections; common patterns include "Build / Test / Lint commands", "Project Structure", "Code Style", "When you make changes", "Out of scope", and references to other docs via relative links [S1][S2].
- **License / governance:** Open convention, no governing license. Anyone can extend; the spec lives in a public repo and has community contributions. The `agents.md` site is MIT-licensed docs [S1].
- **Maintenance signal:** actively maintained; first PR on the spec repo landed in early 2025 and the spec has evolved quarterly since. Adoption curve is still rising at access date.
- **One-line architecture:** a single markdown file with optional references to deeper docs (`docs/*.md`, `CONTRIBUTING.md`, `SPEC.md`).
- **Verdict:** **ADOPT AS-IS at the family root.** It is the de-facto cross-runtime standing-instructions file. Every agent we care about reads it.
- **One-line reason:** Portable across Kilo / Claude Code / Cursor / OpenCode / Codex; the cross-runtime contract the user's Q4 demands.

### 1.2 Anthropic Agent Skills (SKILL.md, progressive disclosure)

- **What it is:** A directory convention (`.claude/skills/<name>/SKILL.md` or any equivalent loaded by an agent) where each skill is a folder with a YAML-frontmatter `SKILL.md` plus optional bundled resources. Anthropic announced Skills as an **open standard on 2025-12-18** [S1]; the Anthropic Skills repo is the canonical reference.
- **Stars / adoption:** Anthropic Skills canonical repo (**~168.7k stars**, source-available / Apache-2.0 for OSS skills) at access date [S1]. Independent implementations: Claude Code (native), OpenCode (compatible), Gemini Code Assist (compatible via `.gemini/skills/`), Cursor (partial support), Windsurf/Devin Desktop (compatible), and the open-source `skillmgr` reference (Apache-2.0).
- **What it specifies:** three progressive-disclosure levels — Level 1 metadata (always loaded, ~100 tokens per skill), Level 2 instructions (loaded when triggered, "under 5k tokens"), Level 3+ bundled files (loaded on-demand via file reads or bash) [S1][S2]. Frontmatter YAML with `name`, `description`, and optional `when-to-use`.
- **License / governance:** Apache-2.0 for the spec and reference examples; agents_manager's own `SKILL.md` convention already mirrors this.
- **Maintenance signal:** actively maintained. Anthropic published the spec in Dec 2025 and has shipped 4 minor revisions through 2026-08-13 [S1].
- **One-line architecture:** per-skill folder = `{SKILL.md (Level 1 + 2), resources/, examples/, scripts/ (Level 3+)}`. Agent harness reads all Level 1 metadata at session start, loads Level 2 when triggered, loads Level 3+ on-demand.
- **Verdict:** **ADOPT AS-IS per-tier.** Each tier in our family ships as one Skill: `tier0-minimal/SKILL.md`, `tier1-standard/SKILL.md`, `tier2-ai-chat/SKILL.md`, etc. The progressive-disclosure discipline is exactly what angle D's cost model demands (Level 1 metadata at ~100 tokens per skill = ~600 tokens for the whole family if we ship 6 tiers).
- **One-line reason:** This is the only convention that gives us predictable per-call token cost AND agent-runtime portability.

### 1.3 CLAUDE.md, Cursor Rules (`.cursorrules`), llms.txt

- **CLAUDE.md:** Anthropic-specific variant of AGENTS.md, loaded by Claude Code at session start [S6]. Same shape, slightly more conservative frontmatter conventions (sections: "How to work", "Stack", "Commands", "Boundaries", "Examples"). Same MIT-licensed convention.
  - **Verdict:** ADOPT AS-IS at the family root *as an alias* for `AGENTS.md`. Many users running Claude Code expect `CLAUDE.md`; symlink or duplicate is fine. Some projects ship both with `CLAUDE.md` extending `AGENTS.md` for Claude-specific affordances.
- **Cursor Rules / `.cursorrules`:** Cursor-specific convention, loaded as system context for the agent [S7]. Plain markdown; Cursor-specific sections like "Communication style" and "Tool usage" expected.
  - **Verdict:** NO ADOPTION. Cursor reads `AGENTS.md` natively in 2026 [S2]; we do not need to ship a Cursor-specific file. (`.cursorrules` is legacy.)
- **llms.txt:** the proposal from `llmstxt.org` (Jeremy Howard, Answer.AI; ~10k stars on the spec repo at access date [S8]). Convention: site-publishes an `llms.txt` describing the site in a short-form + an `llms-full.txt` describing in long-form. NOT a per-agent convention — it's an `index.md`-shaped file for web content. Some agents (Perplexity, ChatGPT browse, Claude with web fetch) consume it for content lookup.
  - **Verdict:** NOT RELEVANT. Our templates are not websites; they are filesystem projects. `llms.txt` is for sites, not for agent instruction sets.

### 1.4 The in-repo `agents_manager/templates/cinematic-landing/` convention

- **What it is:** the proposed template-family shape inside this repo, defined in `agents_manager/upstream-contrib/PROPOSED_PATCH_v0.5.x_2026-07-01_cinematic-landing-template.md` (per angle F [S9]). Per-template folder = `{memory/01..09.md, skeleton/index.html, prompts/, decisions/decision-log.md, assets/MANIFEST.json, 00-readme-first.md}`.
- **Status at access date:** PROPOSED, NOT MERGED. No `agents_manager/templates/` directory exists on disk; verified by sibling angle F [S9] and confirmed by `agents_manager/SKILL.md` references that describe the convention aspirationally.
- **One-line architecture:** per-template folder with `memory/` (problem-shaped docs), `skeleton/` (real working code), `prompts/` (copy-paste prompts), `decisions/` (append-only log), `assets/` (structured state), and `00-readme-first.md` (entry doc, 300-500 lines).
- **Verdict:** **ADOPT THIS SHAPE** for our tier-family's per-tier layout. Angle F judged it generalises to app templates with three adjustments (multi-file Vite skeleton instead of single HTML; richer decision trees; architecture-shaped memory files instead of code-shaped). No external convention beats it on this specific layout.
- **One-line reason:** It's already half-adopted (in this repo, in PROPOSED_PATCH state), it captures the right primitives (memory + skeleton + prompts + decisions + assets), and it is the only convention that ships a *real working skeleton* as a first-class folder.

### 1.5 Convergent external conventions (validated)

Two OSS projects independently converged on the SAME shape we are designing, both in 2025-2026. Their existence validates the convention but also tells us the wheel exists. **Use them as inspiration, do not try to vendor their shape.**

- **GitHub `spec-kit` ([S25])** — 127k stars, MIT. Per-project folder = `.specify/memory/` + `.specify/templates/` + `.specify/extensions/` + `.specify/presets/`. Slash commands: `/speckit.constitution`, `/speckit.specify`, `/speckit.plan`, `/speckit.tasks`, `/speckit.implement`, `/speckit.clarify` (highly relevant to Angle E's intake protocol), `/speckit.analyze`, `/speckit.checklist`. Bundles = role-based presets (PM / dev / security). Ships `AGENTS.md` at the repo root. **Verdict: INSPIRE the `/clarify` + `/checklist` + bundles pattern.** spec-kit's structure is so close to our `templates/<name>/memory/` + `templates/<name>/skeleton/` that adopting their vocabulary (`constitution`, `specify`, `plan`, `tasks`, `implement`, `clarify`) for our cross-tier agent-facing commands would be portable to anyone using spec-kit today. **Major signal**: a project with 127k stars ships an AGENTS.md at root and uses memory/ + templates/ + extensions/ + presets/. We are not alone.
- **OpenHands (formerly Open Devin) [S26]** — 83.9k stars, MIT. Ships `AGENTS.md` at repo root and a `.agents/skills/` folder (matches our convention exactly). OpenHands has evolved from "an AI software engineer" to "a self-hosted developer control center" with multi-agent backend support. **Verdict: INSPIRE the `.agents/skills/` + `AGENTS.md` convention; do not try to ship OpenHands itself** — it is a 83.9k-star Cloud Agents SaaS in disguise, and shipping an agent runtime is out of scope for our portable template family.
- **Archon by coleam00 [S27]** — 23.2k stars, MIT, last-commit within days at access date. Self-describes as "**The first open-source harness builder for AI coding. Make AI coding deterministic and repeatable.**" Per-repo folder = `.archon/workflows/<pack>/<workflow>/` with YAML workflow definitions + scripts + slash commands. Ships 19 default workflows including `archon-piv-loop` (Plan-Implement-Validate loop with human review) and `archon-idea-to-pr`. **Verdict: STRONGEST DIRECT PRIOR ART for our system.** Archon's workflows are the closest analog to what we call "tiers" — pre-built, repeatable sequences the agent runs with deterministic gates (bash scripts, tests, git ops, AI nodes). Our `templates/<name>/SKILL.md` files could ship an `archon-piv-loop` workflow as an optional layer. **Major finding**: Archon is the de-facto proof that the "AI coding harness as a portable, in-repo, YAML/folder convention" pattern works at scale. **Wholesale-vendor warning**: Archon is Claude-Code-specific (its quick-install needs `CLAUDE_BIN_PATH`; its workflows shell out to Claude Code). For our portable cross-runtime target, **inspire the shape, do not fork the engine**.

### 1.6 Verdict - which convention wins for the family

The family root ships **`AGENTS.md`** (cross-runtime standing instructions). Each tier ships as an **Anthropic Skills folder** (`tierN-<name>/SKILL.md` + optional resources) — this is also where the **cinematic-landing shape** (`memory/ + skeleton/ + prompts/ + decisions/ + assets/`) lives, since the Skills folder convention does not prescribe an internal layout. CLAUDE.md is an optional alias. `.cursorrules` and `llms.txt` are irrelevant.

**Concrete file layout this mandates:**
```
templates/
├── AGENTS.md                            # cross-runtime standing instructions
├── CLAUDE.md                            # alias for Claude Code users (optional)
├── registry.json                        # discoverable tier + kind index
├── README.md                            # human/agent entry point
├── tier0-minimal/                       # Skill folder
│   ├── SKILL.md                         # Level 1 metadata + Level 2 instructions
│   ├── memory/                          # problem-shaped docs (cinematic shape)
│   ├── skeleton/                        # real working Vite + React + TS + Tailwind
│   ├── prompts/                         # copy-paste prompts
│   └── decisions/decision-log.md
├── tier1-standard/                      # same shape
├── tier2-ai-chat/                       # same shape, AI SDK wiring in skeleton/
├── tier2-mobile/                        # same shape, Expo wiring
├── tier2-saas-bundle/                   # tier1 + auth + billing layers
├── tier2-storefront/                    # tier1 + commerce
├── tier2-tooling/                       # _spine/ + 3 shims (extension/bot/CLI)
│   ├── _spine/
│   ├── extension/
│   ├── bot/
│   └── cli/
└── cinematic-landing/                   # existing — promote to family
```

**Why this beats every alternative:**
- AGENTS.md is the *only* convention portable across the user's Q4 target runtimes (Kilo, Claude Code, Cursor, OpenCode, Codex).
- Anthropic Skills is the *only* convention with first-class progressive-disclosure discipline that maps to angle D's caching economics.
- The cinematic-landing shape is the *only* convention that bakes a real skeleton folder + append-only decision log into the layout.
- None of the three is a closed vendor format; all are open specs or in-repo.

---

## Priority 2 - Deterministic scaffolders (the zero-token generation layer)

These are what the "commands" half of Q8's hybrid delivery would call. The agent does NOT generate the scaffold from prose — it runs these commands to get a known-good starting point, then diffs over the result.

The single most important property for an agent-facing scaffolder is **non-interactive mode**. **Any scaffolder that prompts the agent with a TTY question is unusable from a non-interactive shell.** That trap is the load-bearing one in this section.

### 2.1 `create-vite` (Vite scaffolding) — **HARDCODE**

- **Repo:** https://github.com/vitejs/vite (main monorepo; scaffolder at `packages/create-vite`)
- **License:** MIT
- **Stars:** ~76k on the monorepo at access date [S10]
- **Last commit:** within 24h at access date; very active
- **Architecture:** `npm create vite@latest <name> -- --template react-ts` (or any of the official templates). Outputs a real working Vite + React + TS + Tailwind v4 scaffold in ~10 seconds.
- **Interactive prompts:** YES (asks for project name, framework, variant) BUT all are skippable via flags: `npm create vite@latest my-app -- --template react-ts` is fully non-interactive.
- **Verdict:** **USE-AS-DEPENDENCY / HARDCODE.** Run from `tier0-minimal/init.sh` and `tier1-standard/init.sh`. The output is the `_spine/skeleton/` baseline before the agent applies diffs.
- **One-line reason:** Vite is the universal 2026 starter; `--template react-ts` is fully non-interactive; output is predictable.

### 2.2 `create-next-app` (Next.js scaffolding) — **HARDCODE WITH FLAGS**

- **Repo:** https://github.com/vercel/next.js (main monorepo; scaffolder at `packages/create-next-app`)
- **License:** MIT
- **Stars:** ~133k on the monorepo at access date [S11]
- **Last commit:** within 24h at access date; very active
- **Architecture:** `npx create-next-app@latest my-app --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --no-turbo` (all flags, no prompts).
- **Interactive prompts:** YES by default (asks for TypeScript, ESLint, Tailwind, src/, App Router, Turbopack, import alias). All are skippable via CLI flags in v15+.
- **Caveat:** the canonical `create-next-app` defaults to **Turbopack** in 2026; some agents benefit from `--no-turbo` for predictable Webpack-equivalent error messages. Webpack-equivalent is also where most agent guides are still written.
- **Verdict:** **USE-AS-DEPENDENCY / HARDCODE.** Run from `tier1-standard/init.sh` and `tier2-{ai-chat,saas-bundle,storefront,content}/init.sh`. Pin to a specific Next version in `package.json`.
- **One-line reason:** Next.js App Router is the right pick for SaaS / AI chat / content tiers; `--no-*` flags make it fully non-interactive; output matches angle C's stack picks.

### 2.3 `create-expo-app` (Expo / React Native scaffolding) — **HARDCODE**

- **Repo:** https://github.com/expo/expo (main monorepo; scaffolder at `packages/create-expo-app`)
- **License:** MIT
- **Stars:** ~37k on the monorepo at access date [S12]
- **Last commit:** within 24h at access date; very active
- **Architecture:** `npx create-expo-app@latest my-app --template default` (also `--template blank`, `--template tabs`). Outputs a real working Expo SDK + TypeScript + Expo Router scaffold.
- **Interactive prompts:** YES (asks for project name, template) BUT skippable via flags.
- **Verdict:** **USE-AS-DEPENDENCY / HARDCODE.** Run from `tier2-mobile/init.sh`. Output is the skeleton for Expo + EAS + Clerk wiring.
- **One-line reason:** Per angle C, Expo is the 2026 default for mobile; `--template` flag is fully non-interactive; SDK 57 is current.

### 2.4 `create-t3-app` (Next.js + TypeScript + tRPC + Prisma stack) — **AVOID FOR AGENT USE**

- **Repo:** https://github.com/t3-oss/create-t3-app
- **License:** MIT
- **Stars:** ~29.1k at access date [S13]
- **Last commit:** ~14 days ago at access date; active
- **Architecture:** interactive CLI with prompts for which of `nextAuth / Prisma / tRPC / Tailwind / drizzle` to include. Even with `--noGit --CI` flags, v7+ prompts for individual choices.
- **Interactive prompts:** YES, EVEN WITH FLAGS. The `--CI` flag disables some but not all prompts; the agent cannot reliably answer "which packages would you like to include?".
- **Verdict:** **AVOID as a hardcoded scaffolder.** INSPIRE the package-bundling pattern (auth + DB + ORM + UI as orthogonal choices); let our own `tier2-saas-bundle/init.sh` compose the equivalent pieces via `--yes` flags on individual scaffolders (create-next-app + prisma init + shadcn add). Document why in the `tier2-saas-bundle/README.md` and link `create-t3-app` as the inspiration.
- **One-line reason:** TTY prompts make it unusable from a non-interactive agent; the design pattern is sound, but the tool itself is human-shaped.

### 2.5 `shadcn/ui` CLI — **HARDCODE**

- **Repo:** https://github.com/shadcn-ui/ui (main monorepo; CLI at `packages/shadcn`)
- **License:** MIT
- **Stars:** ~84k on the monorepo at access date [S14]
- **Last commit:** within 24h at access date; very active
- **Architecture:** `npx shadcn@latest init` then `npx shadcn@latest add button card dialog ...`. Each command emits real working Tailwind-styled component code into the project's `src/components/ui/` (or `components/ui/`).
- **Interactive prompts:** `init` prompts for style (new-york / default) and base color (slate / gray / zinc / neutral / stone); both are skippable via flags or `components.json` defaults. `add` is non-interactive when the components are listed.
- **Caveat:** `init` writes to `components.json` which becomes a project-level config the agent must respect. Per angle C, this is the standard for every Next/Vite/Remix/Astro project; not a problem.
- **Verdict:** **USE-AS-DEPENDENCY / HARDCODE.** This is the canonical "optional layer as command" — `npx shadcn add chart data-table form` is the answer to "how do I add charts to my Tier 1 app?" and costs the agent ~50 tokens of output to invoke.
- **One-line reason:** Copy-paste components over npm packages; non-interactive in `add` mode; the universal 2026 React UI primitive.

### 2.6 `Better-T-Stack` — **INSPIRE**

- **Repo:** https://github.com/AmanVarshney01/create-better-t-stack
- **License:** MIT
- **Stars:** ~3.4k at access date [S15]
- **Last commit:** ~7 days ago at access date; active
- **Architecture:** interactive CLI for the TanStack Start / Next.js / Nuxt / SvelteKit / React Router + Convex / Drizzle / Prisma / Mongo / Postgres + better-auth / Clerk + Tailwind / shadcn + Turborepo / pnpm-monorepo stack. ~20+ choices.
- **Interactive prompts:** YES by default; `--yes` accepts all defaults but the defaults are opinionated (Convex + better-auth + Tailwind + shadcn). `--add-ons` and `--examples` flags exist but the prompt-driven defaults make it hard to script.
- **Verdict:** **INSPIRE the package-bundling philosophy; AVOID the scaffolder.** The CLI is a "human designer picks choices for a fresh project" tool; not a "non-interactive agent composes the orthogonal pieces" tool. Our `tier1-standard/init.sh` is the equivalent, but with hardcoded choices.
- **One-line reason:** Beautiful idea, but the prompt surface is too wide to drive from an agent.

### 2.7 Wasp (full-stack framework CLI) — **AVOID**

- **Repo:** https://github.com/wasp-lang/wasp
- **License:** MIT
- **Stars:** ~16.5k at access date [S16]
- **Last commit:** ~14 days ago at access date; active
- **Architecture:** opinionated full-stack DSL with its own compiler; `wasp init` scaffolds a Wasp project. Wasp ships its own React + Node + Prisma + auth + deploy layer.
- **Interactive prompts:** `wasp init` is interactive in some versions; `wasp new` is non-interactive but requires the Wasp CLI installed globally first.
- **Verdict:** **AVOID.** Wasp locks to its own DSL; this is a framework choice, not a scaffolder. If the user wants Wasp, we should not pretend our family covers it. Optional: document Wasp as an alternative-stack Tier 2 candidate if the user wants it later.
- **One-line reason:** Locks to a single framework; our family is supposed to be portable across stacks.

### 2.8 RedwoodJS CLI — **AVOID**

- **Repo:** https://github.com/redwoodjs/redwood
- **License:** MIT
- **Stars:** ~5.5k at access date [S17]
- **Last commit:** within 30 days at access date; moderately active
- **Architecture:** full-stack framework with cells, routes, services; `yarn create redwood-app my-app` scaffolds. Interactive prompts ask for TypeScript vs JavaScript + database.
- **Interactive prompts:** YES.
- **Verdict:** **AVOID.** Same reasoning as Wasp; this is a framework, not a scaffolder.
- **One-line reason:** Locks to a single framework + cells pattern; not the portable spine our family needs.

### 2.9 Refine (`create refine-app`) — **INSPIRE**

- **Repo:** https://github.com/refinedev/refine (CLI at `packages/create-refine-app`)
- **License:** MIT
- **Stars:** ~31k on the monorepo at access date [S18]
- **Last commit:** within 24h at access date; active
- **Architecture:** interactive scaffolder for Refine apps. Refine is a React-based headless framework for admin panels / CRUD dashboards / internal tools. Supports Next.js, Remix, Vite + React, Ant Design, Material UI, Mantine, Chakra UI backends.
- **Interactive prompts:** YES, but `create refine-app --platform vite-react --ui headless --data-provider rest --auth none --no-install` is fully non-interactive.
- **Verdict:** **INSPIRE the "admin-panel starter that wires data-provider + auth + UI" pattern; AVOID as a wholesale scaffolder.** Per angle C, CRUD dashboards are `tier1 + admin layer`, not a separate tier2. We can INSPIRE from Refine's data-provider architecture but our tier1 + admin layer is closer to TanStack Table + shadcn/ui data tables than to Refine. Verdict: **AVOID as dependency** (locks to Refine framework); **INSPIRE for the data-provider abstraction** (the agent should think in adapters, not specific libs).
- **One-line reason:** Good data-provider pattern, but locks to a framework our family doesn't adopt.

### 2.10 Tanstack Starters — **USE-AS-DEPENDENCY (selective)**

- **Repo:** https://github.com/TanStack/router (TanStack Router + Start templates)
- **License:** MIT
- **Stars:** ~11k on the router repo at access date [S19]
- **Last commit:** within 24h; very active
- **Architecture:** multiple starter templates (`create-tsrouter-app`, `examples/react/basic`, `examples/react/start-basic`). TanStack Start is a full-stack SSR framework.
- **Interactive prompts:** mostly non-interactive; flags cover most choices.
- **Verdict:** **USE-AS-DEPENDENCY (selective) for tier2 kinds where TanStack Router/Start is the right pick** (e.g. complex client-side routing needs, where TanStack Router's type-safe routes are stronger than Next.js App Router). Default is Next.js App Router; TanStack Start is the escape hatch.
- **One-line reason:** Type-safe routing is the right pick for complex client-side route graphs; not the default, but a real option.

### 2.11 WXT (browser extension scaffolder) — **HARDCODE**

- **Repo:** https://github.com/wxt-dev/wxt
- **License:** MIT
- **Stars:** ~7.2k at access date [S20]
- **Last commit:** within 24h at access date; very active
- **Architecture:** `pnpm create wxt@latest` scaffolds a browser extension project. Outputs real working Manifest V3 + Vite + (optional) Vue/React/Svelte + entrypoints (`popup.html`, `options.html`, content script stub).
- **Interactive prompts:** minimal — framework choice + browser target. Mostly skippable via flags.
- **Verdict:** **USE-AS-DEPENDENCY / HARDCODE.** Per angle C, `tier2-tooling/extension/init.sh` runs WXT.
- **One-line reason:** The 2026 default for MV3 browser extensions; minimal prompts; outputs a runnable skeleton.

### 2.12 Medusa CLI — **HARDCODE (tier2-storefront only)**

- **Repo:** https://github.com/medusajs/medusa (CLI at `packages/cli`)
- **License:** MIT
- **Stars:** ~28k on the monorepo at access date [S21]
- **Last commit:** within 24h at access date; very active
- **Architecture:** `npx create-medusa-app@latest my-store` scaffolds a Medusa + Next.js storefront + Postgres backend. Outputs a real working commerce backend with admin UI.
- **Interactive prompts:** YES (asks for project name, store name, Stripe keys); mostly skippable via flags and `.env` template.
- **Verdict:** **USE-AS-DEPENDENCY / HARDCODE for tier2-storefront (Path B per angle C).** Run from `tier2-storefront/init.sh` with `--no-prompt` flags.
- **One-line reason:** Per angle C's storefront Path B; the canonical OSS headless commerce backend.

### 2.13 Other notable scaffolders (briefly)

- **`npm create astro@latest`** — MIT, ~57k stars [S22], non-interactive with `--template minimal --typescript strict --install --git --yes` flags. **USE-AS-DEPENDENCY** for `tier2-content/` (Astro is angle C's pick for content/docs).
- **`npm create vite@latest -- --template react-swc-ts`** — MIT, part of Vite. **USE-AS-DEPENDENCY** as an alternative to `--template react-ts` (SWC is faster than Babel for dev compilation).
- **`npx create-unify-template`** (Hono full-stack) — MIT, ~2k stars, newer entrant. INSPIRE only; not standard in 2026.
- **`npx create-qwik@latest`** — MIT, ~22k stars [S23], interactive prompts. AVOID for agent use.
- **`npx remix-run create`** — MIT, but Remix is being absorbed into React Router v8 per angle F [S24]. Treat as legacy; React Router is the canonical path.

### 2.14 The interactive-prompt trap (called out explicitly)

**Any scaffolder that prompts a TTY question is unusable from a non-interactive agent.**

Test before adoption:
1. Run the scaffolder with no stdin (`< /dev/null`) and verify it exits 0 with a working output.
2. Run with all `--no-prompt` / `--yes` / `--ci` flags.
3. Document in the template's `init.sh` exactly which flags are required.

The scaffolders above marked AVOID are AVOID because of this trap, not because they are bad tools. `create-t3-app` is excellent; an agent just cannot drive it. Same for Better-T-Stack and Wasp.

---

## Priority 3 - Open-source prompt-to-app engines

**None of these does the full loop (chat-idea → clarify → template-route → skeleton-init → runnable-app).** All are missing at least one of: the clarification protocol, the tier router, or the agent-runtime portability. Listed in order of closeness to our target.

### 3.1 bolt.diy — **INSPIRE, do not fork**

- **Repo:** https://github.com/stackblitz-labs/bolt.diy
- **License:** **MIT (source code)**, but **bolt.diy relies on WebContainers API which requires a commercial license for production usage in a for-profit setting**. [LICENSE TRAP] Per the README: *"bolt.diy source code is distributed as MIT, but it uses WebContainers API that requires licensing for production usage in a commercial, for-profit setting. (Prototypes or POCs do not require a commercial license.) If you're using the API to meet the needs of your customers, prospective customers, and/or employees, you need a license."* [S28]
- **Stars:** ~19.7k at access date [S28]
- **Last commit:** within 24h at access date; very active; 1,629 commits
- **Architecture:** StackBlitz WebContainers-based full-stack web app builder. 19+ LLM providers via Vercel AI SDK (OpenAI, Anthropic, Google, Groq, xAI, DeepSeek, Mistral, Cohere, Together, Perplexity, HuggingFace, OpenRouter, Moonshot, Hyperbolic, GitHub Models, Amazon Bedrock, etc.). Tool calls: file write, file edit, npm install, shell run, deploy (Netlify/Vercel/GitHub Pages). Electron desktop variant.
- **Closest to our target?** YES, closest of any OSS prompt-to-app engine. But: no clarification protocol (generate-first only, like its parent `bolt.new`), no template-router (it scaffolds from scratch every time), no portable agent-runtime story (it is its own product, not a template others consume).
- **Verdict:** **INSPIRE for the in-browser-IDE + shell-as-tool pattern + MCP integration. DO NOT FORK.** bolt.diy is a competitor product, not a library. The closest portable artifact it produces is the system prompt + tool schema — but those are baked into the Bolt runtime, not extractable as a portable convention.
- **One-line reason:** MIT license has a WebContainers-shaped trap (license for production use); not extractable as a portable template; generate-first not ask-first.

### 3.2 Aider — **INSPIRE, do not fork**

- **Repo:** https://github.com/Aider-AI/aider
- **License:** Apache-2.0
- **Stars:** ~48.2k at access date [S29]
- **Last commit:** within 24h at access date; very active; 13,138 commits
- **Architecture:** Python-based terminal pair-programmer. Repo-map (a graph of the codebase to keep token cost down). Git integration with auto-commit per edit. Voice-to-code, image-attach, web-page attach. Works with 100+ languages. Supports Anthropic, OpenAI, DeepSeek, Ollama, OpenRouter, etc.
- **Closest to our target?** No — Aider is a CLI tool that requires an existing repo; it does not scaffold from prose. It is a "diff over your repo" tool, not a "pick a tier + init skeleton" tool.
- **Verdict:** **INSPIRE for the repo-map + auto-commit + lint-after-edit loop.** Aider's `repomap` is the canonical example of "graph-based context compression" (per Angle D's caching-economics). Its `AGENTS.md` integration via `.aider.conf.yml` (`read: AGENTS.md`) is the canonical "use AGENTS.md" example we should mirror in our family docs [S1][S29].
- **One-line reason:** Apache-2.0 OK; strong in-repo patterns (repomap, auto-commit, AGENTS.md integration); but it's a CLI, not a template-family scaffolder.

### 3.3 gpt-engineer — **AVOID (maintenance-only)**

- **Repo:** https://github.com/gpt-engineer-org/gpt-engineer (AntonOsika/gpt-engineer is the older archived fork)
- **License:** MIT
- **Stars:** ~75k at access date on the main fork [UNVERIFIED exact number]
- **Last commit:** ~6 months ago at access date; maintenance-only signal
- **Architecture:** Python CLI. User types a prompt → clarifies (asks 1-3 questions via plain text) → generates a full codebase from the clarified prompt → runs it in a Docker container → iterates with `code` and `improve` subcommands.
- **Closest to our target?** YES for the clarify-then-build loop. But: Python only (generates a single Python project), no tier router, no portable cross-runtime story, maintenance is sporadic.
- **Verdict:** **INSPIRE for the clarify-then-build mechanic; AVOID as a fork target.** The repo is in maintenance-only mode and would not survive contact with the user's Q4 cross-runtime portability constraint. Worth reading the system prompt for the clarify-question patterns but not the codebase.
- **One-line reason:** Closest clarify-then-build mechanic in OSS, but Python-only + maintenance-only + not portable.

### 3.4 OpenHands — **INSPIRE, do not fork**

- **Repo:** https://github.com/All-Hands-AI/OpenHands
- **License:** MIT
- **Stars:** ~83.9k at access date [S30]
- **Last commit:** within 24h at access date; very active
- **Architecture:** Cloud-based AI software engineer. Runs in a Docker sandbox. Multi-LLM. Tools: bash, file editor, browser, web search, GitHub API, plan mode. Ships `AGENTS.md` at repo root and `.agents/skills/` folder.
- **Closest to our target?** Partial — has plan mode + sandboxed execution + AGENTS.md convention, but is a 83.9k-star Cloud Agents product with its own dashboard. Not extractable as a portable convention.
- **Verdict:** **INSPIRE for the plan mode + sandboxed shell + `.agents/skills/` + `AGENTS.md` pattern; AVOID as a fork target.** OpenHands is a product; the open-source contribution we'd want is the *skills folder shape*, not the runtime.
- **One-line reason:** Ships the right conventions (AGENTS.md + skills/) but is a Cloud Agents SaaS in disguise.

### 3.5 Pythagora (formerly GPT-Pilot) — **AVOID**

- **Repo:** https://github.com/Pythagora-io/gpt-pilot
- **License:** MIT
- **Stars:** ~33k at access date [UNVERIFIED — repo mirror; 2025 references]
- **Last commit:** ~3 months ago at access date; moderate activity
- **Architecture:** Multi-agent CLI that walks the LLM through the full SDLC: product manager → architect → dev → Q&A → reviewer. Python back-end with a code-writing LLM agent. Generates full apps with multiple files; tests them in a Docker sandbox.
- **Closest to our target?** Partial — the multi-agent roles (PM/architect/dev/QA/reviewer) overlap with `agents_manager`'s `master` + `am-research` + `am-planning` + `am-coder` + `am-review`. But Pytha-gora's roles are hard-coded, not configurable.
- **Verdict:** **AVOID as a fork target.** INSPIRE the multi-role SDLC pattern. **Maintenance risk**: star count is misleading; PR cadence has slowed since 2025-Q4.
- **One-line reason:** Multi-agent SDLC pattern is interesting but maintenance is in deceleration; not portable.

### 3.6 Dyad — **AVOID**

- **Repo:** https://github.com/dyad-sh/dyad
- **License:** Apache-2.0 (per repo)
- **Stars:** ~5k at access date [UNVERIFIED exact]
- **Last commit:** within days at access date; active
- **Architecture:** Local-first AI app builder (a free, open alternative to v0/Lovable/Bolt). React + Electron desktop app. Generates React/Vite/Next.js apps with shadcn/ui + Supabase defaults.
- **Closest to our target?** No — Dyad is a desktop product, not a portable convention. It does, however, ship AGENTS.md and a `_spine/`-like scaffold.
- **Verdict:** **AVOID.** Inspiration only.
- **One-line reason:** Desktop product, not a portable convention.

### 3.7 Onlook — **AVOID**

- **Repo:** https://github.com/onlook-dev/onlook
- **License:** Apache-2.0
- **Stars:** ~6k at access date [UNVERIFIED exact]
- **Last commit:** within days at access date; active
- **Architecture:** Visual editor for React/Next.js + Tailwind. Drag-and-drop UI builder with AI integration.
- **Closest to our target?** No — visual editor.
- **Verdict:** **AVOID.**
- **One-line reason:** Visual editor, not a portable template family.

### 3.8 srcbook — **INSPIRE**

- **Repo:** https://github.com/srcbookhq/srcbook
- **License:** Apache-2.0
- **Stars:** ~5k at access date [UNVERIFIED exact]
- **Last commit:** within 30 days at access date; active
- **Architecture:** Notebook-shaped IDE for LLM-augmented apps. Each "srcbook" is a TypeScript project the user iterates on in cells.
- **Closest to our target?** No — desktop product.
- **Verdict:** **INSPIRE only.** Not portable.
- **One-line reason:** Notebook UX is interesting but locks to desktop product.

### 3.9 Plandex — **INSPIRE**

- **Repo:** https://github.com/plandex-ai/plandex
- **License:** MIT
- **Stars:** ~14k at access date [UNVERIFIED exact]
- **Last commit:** within days at access date; active
- **Architecture:** CLI for AI-powered coding with multi-file plans, persistent context across sessions, and parallel agent execution.
- **Closest to our target?** Partial — the persistent-context-across-sessions + parallel-agents design is close to what an agent-facing template family wants. But Plandex is a CLI, not a template family.
- **Verdict:** **INSPIRE for the multi-file-plan + persistent-context pattern; AVOID as a fork target.**
- **One-line reason:** Persistent-context + parallel-agents is interesting but Plandex is a CLI, not a portable convention.

### 3.10 Goose (by Block) — **INSPIRE**

- **Repo:** https://github.comblock/goose (per agents.md homepage [S1])
- **License:** Apache-2.0 (per repo)
- **Stars:** ~7k at access date [UNVERIFIED exact]
- **Last commit:** within days at access date; active
- **Architecture:** Open-source AI agent from Block (Square / Cash App). Desktop + CLI. Multi-LLM. Tools: bash, file edit, web fetch, computer use.
- **Closest to our target?** No — Block product.
- **Verdict:** **INSPIRE only.**
- **One-line reason:** Agent runtime, not a portable template family.

### 3.11 Cline — **INSPIRE**

- **Repo:** https://github.com/cline/cline
- **License:** Apache-2.0
- **Stars:** ~38k at access date [UNVERIFIED exact]
- **Last commit:** within days at access date; very active
- **Architecture:** VS Code AI agent extension. Multi-LLM. Tools: file read/write/edit, bash, browser, MCP integration. Reads `AGENTS.md` per the agents.md spec.
- **Closest to our target?** Partial — same AGENTS.md integration as our target. But Cline is a VS Code extension, not a portable convention.
- **Verdict:** **INSPIRE for the AGENTS.md + MCP integration; AVOID as a fork target.**
- **One-line reason:** VS Code extension, not a portable convention.

### 3.12 Roo Code — **INSPIRE**

- **Repo:** https://github.com/RooCodeInc/Roo-Code
- **License:** Apache-2.0
- **Stars:** ~19k at access date [UNVERIFIED exact; per agents.md homepage]
- **Last commit:** within days at access date; very active
- **Architecture:** VS Code AI agent fork/evolution of Cline with multi-mode support (Code, Architect, Ask, Debug, Orchestrator). Reads `AGENTS.md`.
- **Closest to our target?** No — VS Code extension.
- **Verdict:** **INSPIRE only.** The Orchestrator mode (multi-agent within VS Code) is the closest analog to our tier router.
- **One-line reason:** VS Code extension; the Orchestrator mode validates multi-agent-within-runtime as a pattern.

### 3.13 Honest verdict for Priority 3

**Of 12 OSS prompt-to-app engines examined, none does the full loop the user asked for.** The closest by axis:
- **Clarify-then-build mechanic**: gpt-engineer (closest), then bolt.diy's "Enhance" icon.
- **Tier / template selection**: NONE has it. None of these tools asks "what kind of app is this?" — they all default to scaffold from scratch.
- **Agent-runtime portability**: NONE ships a portable markdown convention. bolt.diy is its own product; OpenHands is its own product; Aider is a CLI; Cline/Roo are VS Code extensions.
- **Self-verification loop**: bolt.diy has WebContainers (in-browser smoke); Devin (cloud) is closed-source; Aider has post-edit lint/test; gpt-engineer has a Docker-run smoke test.

**Net recommendation: do not try to fork any of these. INSPIRE each for one pattern:**
- **bolt.diy** → MCP integration + LLM-provider-agnostic prompt layer
- **Aider** → repomap + auto-commit + AGENTS.md integration
- **gpt-engineer** → clarify-then-build mechanic (its system prompt is worth reading)
- **OpenHands** → `.agents/skills/` + `AGENTS.md` + plan-mode + sandboxed shell
- **Cline/Roo** → MCP + mode-selector (Architect vs Code vs Debug)
- **Plandex** → multi-file-plan + persistent context
- **Archon** → workflow-as-folder + deterministic-gates-as-bash (biggest single inspiration)

---

## Priority 4 - Spec-driven frameworks and starter kits (lowest priority, keep brief)

Per the dispatch, only need repo structure + license, not question flow (Angle E covered that).

### 4.1 GitHub spec-kit [S25]

- **Repo:** https://github.com/github/spec-kit (canonical; GitHub org)
- **License:** MIT
- **Stars:** ~127k at access date
- **Last commit:** within days at access date; very active; 1,768 commits
- **Repo structure (high level):** `.specify/memory/` + `.specify/templates/` + `.specify/extensions/` + `.specify/presets/` + `bundles/` (role-based package of extensions+presets). `templates/` folder ships spec/plan/tasks templates per agent. `AGENTS.md` at root.
- **Verdict:** **INSPIRE; do not fork.** spec-kit's `.specify/` shape is so close to our `templates/<name>/` shape that adopting its command vocabulary (`constitution`, `specify`, `plan`, `tasks`, `implement`, `clarify`) would be portable to anyone using spec-kit today. Major validation that our convention is mainstream.
- **One-line reason:** 127k-star proof that the in-repo `.specify/` + memory + templates + extensions + presets convention works.

### 4.2 BMAD-Method [S31]

- **Repo:** https://github.com/bmad-code-org/BMAD-METHOD (canonical; bmad-code-org org) [UNVERIFIED — exact org; angle E covered]
- **License:** MIT (per angle E)
- **Stars:** ~25k at access date [UNVERIFIED — angle E]
- **Repo structure:** `.bmad-core/` (memory + agents + workflows) + `src/` (the method code) + `templates/`. Agents (`pm`, `architect`, `dev`, `qa`) are persona-shaped markdown files. Workflows are multi-step task files.
- **Verdict:** **INSPIRE the multi-agent-roles-as-markdown pattern.** Our `agents_manager/memory/projects/<slug>/playbook.md` already covers some of this. BMAD's contribution is the per-agent persona folder shape.
- **One-line reason:** Multi-agent personas as markdown is exactly the pattern our `templates/<name>/prompts/` should adopt.

### 4.3 agent-os [S32]

- **Repo:** https://github.com/buildermethods/agent-os (canonical; buildermethods org) [UNVERIFIED — exact path; angle E covered]
- **License:** MIT
- **Stars:** ~2k at access date [UNVERIFIED — angle E]
- **Repo structure:** `.agent-os/` folder with `spec.md`, `plan.md`, `tasks.md`, plus per-step instructions.
- **Verdict:** **INSPIRE only.** Smaller / less adopted than spec-kit or BMAD; not worth deep integration.
- **One-line reason:** Spec → plan → tasks convention matches spec-kit; no unique advantage.

### 4.4 claude-task-master [S33]

- **Repo:** https://github.com/eyaltoledano/claude-task-master (canonical; eyaltoledano org) [UNVERIFIED exact path]
- **License:** MIT
- **Stars:** ~7k at access date [UNVERIFIED exact]
- **Repo structure:** `tasks/` folder with task JSON files; per-task metadata.
- **Verdict:** **INSPIRE only.** Tasks-as-data is interesting but not a family-wide convention.
- **One-line reason:** Tasks-as-data is a useful pattern, but not the load-bearing piece.

### 4.5 Makerkit [S34]

- **Repo:** https://github.com/makerkit/makerkit (commercial product; some OSS samples)
- **License:** **COMMERCIAL**; not open source. ~5k stars.
- **Verdict:** **AVOID as a wholesale template substitute; USE-AS-REFERENCE for the SaaS-bundle shape (Next.js + auth + billing + admin UI).** Not a fork target. The free samples are MIT for the boilerplate only; the real product is paid.
- **One-line reason:** Commercial product; reference for SaaS-tier concrete shape, not a fork.

### 4.6 Supastarter [S35]

- **Repo:** https://github.com/supastarter/supastarter (Nuxt-based SaaS starter)
- **License:** **COMMERCIAL**; not open source. ~3k stars.
- **Verdict:** **AVOID.** Same reasoning as Makerkit.
- **One-line reason:** Commercial; Nuxt-only; not portable.

### 4.7 ShipFast [S36]

- **Repo:** https://github.com/marc-louis/shipfast (Next.js SaaS starter)
- **License:** **COMMERCIAL**; ~6k stars.
- **Verdict:** **AVOID.** Same.
- **One-line reason:** Commercial; locks to Next.js.

### 4.8 Next.js SaaS Starter (ixartz) [S37]

- **Repo:** https://github.com/ixartz/Next-js-Saas-Starter
- **License:** MIT
- **Stars:** ~6k at access date [UNVERIFIED exact]
- **Repo structure:** Next.js 14 (now 16) + Tailwind + NextAuth + Prisma + Stripe. Concrete SaaS template.
- **Verdict:** **USE-AS-DEPENDENCY (reference) for tier2-saas-bundle.** MIT-licensed SaaS scaffold that we can pull individual files from (e.g. Stripe webhook handler, NextAuth config) without forking the whole repo.
- **One-line reason:** MIT-licensed Next.js SaaS reference; copy individual files (Stripe webhook, NextAuth config) into our skeleton.

---

## Verdict matrix (every project, FORK / INSPIRE / USE-AS-DEPENDENCY / AVOID)

| # | Project | License | Stars | Last commit | Verdict | One-line reason |
|---|---|---|---:|---|---|---|
| 1 | agents.md / AGENTS.md standard [S1] | open spec (LF/AAIF) | 60k+ projects | active | **ADOPT** | cross-runtime standing instructions; portable |
| 2 | Anthropic Skills / SKILL.md [S2] | Apache-2.0 | 168.7k | active | **ADOPT** | only convention with progressive-disclosure discipline |
| 3 | CLAUDE.md [S3] | open | n/a | active | **ADOPT (alias)** | symlink/duplicate for Claude Code users |
| 4 | Cursor Rules / `.cursorrules` [S4] | n/a | n/a | legacy | **AVOID** | Cursor reads AGENTS.md natively; legacy |
| 5 | llms.txt [S5] | MIT (spec) | ~10k | low activity | **NOT RELEVANT** | for websites, not agent instruction sets |
| 6 | cinematic-landing convention [S9] | in-repo | n/a | proposed | **ADOPT** | already half-adopted; right primitives |
| 7 | github/spec-kit [S25] | MIT | 127k | active | **INSPIRE** | `.specify/` shape + command vocabulary portable |
| 8 | OpenHands [S30] | MIT | 83.9k | active | **INSPIRE** | `.agents/skills/` + AGENTS.md convention |
| 9 | Archon (coleam00) [S27] | MIT | 23.2k | active | **INSPIRE** | closest direct prior art; workflows-as-folder |
| 10 | create-vite [S10] | MIT | ~76k | active | **USE-AS-DEPENDENCY** | hardcode in `tier0-minimal/init.sh` + `tier1-standard/init.sh` |
| 11 | create-next-app [S11] | MIT | ~133k | active | **USE-AS-DEPENDENCY** | hardcode with `--no-*` flags for SaaS/AI/content tiers |
| 12 | create-expo-app [S12] | MIT | ~37k | active | **USE-AS-DEPENDENCY** | hardcode for `tier2-mobile/init.sh` |
| 13 | shadcn/ui CLI [S14] | MIT | ~84k | active | **USE-AS-DEPENDENCY** | canonical `npx shadcn add` for components |
| 14 | WXT [S20] | MIT | ~7.2k | active | **USE-AS-DEPENDENCY** | hardcode for `tier2-tooling/extension/init.sh` |
| 15 | Medusa CLI [S21] | MIT | ~28k | active | **USE-AS-DEPENDENCY** | hardcode for `tier2-storefront/init.sh` (Path B) |
| 16 | Astro create [S22] | MIT | ~57k | active | **USE-AS-DEPENDENCY** | hardcode for `tier2-content/init.sh` |
| 17 | TanStack Start [S19] | MIT | ~11k | active | **USE-AS-DEPENDENCY (selective)** | escape hatch for type-safe client routing |
| 18 | create-t3-app [S13] | MIT | 29.1k | active | **AVOID** | TTY prompts make it unusable from agent; inspire the bundling pattern |
| 19 | Better-T-Stack [S15] | MIT | ~3.4k | active | **AVOID** | TTY prompts; inspire package-bundling philosophy only |
| 20 | Wasp [S16] | MIT | ~16.5k | active | **AVOID** | framework lock-in, not a scaffolder |
| 21 | RedwoodJS [S17] | MIT | ~5.5k | moderate | **AVOID** | framework lock-in; TTY prompts |
| 22 | Refine [S18] | MIT | ~31k | active | **AVOID (as dependency); INSPIRE** | INSPIRE data-provider abstraction; AVOID framework lock-in |
| 23 | create-qwik [S23] | MIT | ~22k | active | **AVOID** | TTY prompts |
| 24 | bolt.diy [S28] | MIT (with WebContainers commercial trap) | 19.7k | active | **INSPIRE; AVOID** | in-browser-IDE + MCP; WebContainers license trap |
| 25 | Aider [S29] | Apache-2.0 | 48.2k | active | **INSPIRE** | repomap + auto-commit + AGENTS.md integration |
| 26 | gpt-engineer [UNVERIFIED] | MIT | ~75k | ~6mo (slow) | **INSPIRE; AVOID** | clarify-then-build mechanic; maintenance-only; Python-only |
| 27 | OpenHands Agent [S30] | MIT | 83.9k | active | **INSPIRE; AVOID** | `.agents/skills/` + AGENTS.md; cloud product, not portable |
| 28 | Pythagora (GPT-Pilot) | MIT | ~33k | slow | **AVOID** | multi-role SDLC pattern; deceleration |
| 29 | Dyad | Apache-2.0 | ~5k | active | **AVOID** | desktop product |
| 30 | Onlook | Apache-2.0 | ~6k | active | **AVOID** | visual editor |
| 31 | srcbook | Apache-2.0 | ~5k | active | **AVOID** | desktop product |
| 32 | Plandex | MIT | ~14k | active | **INSPIRE** | multi-file-plan + persistent-context |
| 33 | Goose (Block) | Apache-2.0 | ~7k | active | **AVOID** | agent runtime, not portable |
| 34 | Cline | Apache-2.0 | ~38k | active | **INSPIRE** | AGENTS.md + MCP integration |
| 35 | Roo Code | Apache-2.0 | ~19k | active | **INSPIRE** | Orchestrator mode = multi-agent-within-runtime |
| 36 | BMAD-Method [S31] | MIT | ~25k | active | **INSPIRE** | multi-agent personas as markdown |
| 37 | agent-os [S32] | MIT | ~2k | moderate | **INSPIRE** | smaller; no unique advantage |
| 38 | claude-task-master [S33] | MIT | ~7k | active | **INSPIRE** | tasks-as-data pattern |
| 39 | Makerkit [S34] | **COMMERCIAL** | ~5k | active | **AVOID as substitute; USE-AS-REFERENCE** | commercial SaaS starter; reference only |
| 40 | Supastarter [S35] | **COMMERCIAL** | ~3k | active | **AVOID** | commercial Nuxt SaaS |
| 41 | ShipFast [S36] | **COMMERCIAL** | ~6k | active | **AVOID** | commercial Next.js SaaS |
| 42 | Next.js SaaS Starter (ixartz) [S37] | MIT | ~6k | active | **USE-AS-DEPENDENCY (reference)** | copy Stripe webhook + NextAuth config files |
| 43 | react-router (canonical) [S11] | MIT | ~133k (Next.js repo) | active | **USE-AS-DEPENDENCY** | canonical for tier1-standard + tier2-tooling/extension |

---

## Does anything already do the full loop?

**No.** No single project — open-source or closed-source — does the full loop the user asked for (chat-idea → clarify → tier-route → skeleton-init → runnable-app with portable cross-runtime markdown).

**The closest direct prior art is Archon by coleam00 [S27]** (23.2k stars, MIT, very active). Archon ships:
- Per-repo `.archon/workflows/` folder (YAML + scripts + commands)
- 19 default workflows
- `AGENTS.md` + `CLAUDE.md` at repo root
- `archon-idea-to-pr` workflow that runs: idea → plan → implement → validate → PR → multi-agent review → self-fix

Archon's gap vs our target:
1. **Locked to Claude Code**: Archon's binary install requires `CLAUDE_BIN_PATH`; quick-install is binary-only. Our target is portable across Kilo/Claude Code/Cursor/OpenCode/Codex.
2. **No clarification protocol**: Archon's `archon-idea-to-pr` goes straight from idea to planning; no restate-and-confirm step.
3. **No tier-router primitive**: Archon has workflows but no (tier, kind, stack) selector. The user's intake protocol (Angle E) is the missing primitive.

**The closest spec-driven convention is github/spec-kit [S25]** (127k stars). spec-kit ships:
- `.specify/memory/` + `.specify/templates/` + `.specify/extensions/` + `.specify/presets/` (extremely close to our `templates/<name>/memory/` + `templates/<name>/skeleton/` + `templates/<name>/prompts/` + `templates/<name>/decisions/` + `templates/<name>/assets/` shape)
- `/speckit.clarify` (the closest OSS answer to the user's clarification protocol from Angle E)
- `bundles/` (role-based setups) — close to our tier concept
- `AGENTS.md` at root

spec-kit's gap vs our target:
1. **No tier-router primitive**: spec-kit treats the project as one; no per-tier-folders-with-routing logic.
2. **No runnable skeleton as a first-class concept**: spec-kit's `.specify/templates/` are Markdown templates; not runnable code. Angle F's audit named this as the load-bearing defect in `resources/general-app-template/` too.
3. **No portable scaffolders wired**: spec-kit is a CLI; not a set of checked-in, ready-to-`npm install` skeletons.

**The closest agent-facing convention is Anthropic Skills [S2]** (168.7k stars). Anthropic Skills ships:
- Per-skill folder = `{SKILL.md, resources/, examples/, scripts/}` with three progressive-disclosure levels.
- Level 1 metadata (~100 tokens) always loaded; Level 2 instructions (<5k tokens) loaded when triggered; Level 3+ bundled files loaded on-demand.
- YAML frontmatter with `name` + `description`.

Anthropic Skills' gap vs our target:
1. **Skills are runtime-agnostic instructions, not app templates**: Skills describe HOW to do a task; they don't ship a `src/main.tsx` to copy.
2. **No scaffolders bundled**: Skills don't include `npx create-next-app` invocations or `npm install` outcomes.
3. **No per-tier folder convention**: Skills assume flat naming within `.claude/skills/`; no tier hierarchy.

**Honest verdict: BUILD.** Every layer has an OSS reference. No project combines all three (conventions + scaffolders + templates). The build is assembly + integration + a checked-in skeleton, not invention.

---

## License and maintenance traps (flagged loud)

### License traps

- **bolt.diy [S28]**: MIT-licensed source BUT requires **WebContainers commercial license** for production for-profit use. README is explicit. Verdict: do not let our agent-facing templates pull bolt.diy as a runtime dependency. Safe to INSPIRE the patterns; unsafe to vendor the runtime.
- **Plasmo**: historically MIT but **2025 reports of BSL-style source-available on parts of dev tooling** [UNVERIFIED — verify at fork time]. Verdict: AVOID Plasmo as a hardcoded scaffolder for tier2-tooling/extension; WXT is the safer MIT alternative.
- **Theatre.js** (already flagged by Angle F): studio is AGPL-3.0; the core is MIT. Verdict: do not import Theatre.js into any checked-in skeleton.
- **Makerkit / Supastarter / ShipFast**: commercial products. **AVOID as wholesale substitutes**; can reference individual patterns but not vendor the whole thing.
- **AGPL risk (general)**: any library copylefted via AGPL is dangerous in a portable template (the user's downstream apps inherit the AGPL). Verdict: AVOID AGPL by default; explicit whitelist only.

### Maintenance traps

- **gpt-engineer [UNVERIFIED]**: ~75k stars but last meaningful commit ~6 months ago at access date. The star count is misleading; the project is in maintenance-only mode.
- **Pythagora / GPT-Pilot**: ~33k stars; PR cadence has slowed since 2025-Q4. Worth INSPIRING; not worth depending on.
- **Firebase Studio** (already flagged by Angle B): sunset 2027-03-22; new-workspace creation disabled 2026-06-22 [S5]. Already dead on arrival.
- **Star-count vs commit recency**: never trust star count alone. The single most reliable signal is **last commit within 30 days**. Archon (23.2k stars, last commit days ago) is healthier than gpt-engineer (~75k stars, last commit 6 months ago).

### The combined "dangerous combination"

The worst-case combination: high stars + slow commits + MIT or permissive license that hides a commercial rider (bolt.diy). Whenever a project's README mentions "for production use, contact sales" or "requires a commercial license", stop.

---

## What this changes about our template design (mandatory, concrete, 5-10 bullets)

1. **Ship `AGENTS.md` at the family root** (per the agents.md standard [S1]). Cross-runtime standing instructions: build commands, test commands, lint commands, project structure, code style, where to find each tier, how to use the Skills convention. **One file; portable across Kilo / Claude Code / Cursor / OpenCode / Codex / Roo / Goose / Aider / Augment / Ona / Kilo / Phoenix / Semgrep / Warp / Zed / Devin / Jules / Factory / Windsurf / Gemini CLI** (per [S1]'s adoption list).
2. **Ship each tier as an Anthropic Skills folder** [S2]. Folder = `{SKILL.md (Level 1 metadata + Level 2 instructions), memory/, skeleton/, prompts/, decisions/, assets/}`. Level 1 metadata costs ~100 tokens per tier; the whole family stays under ~1k tokens when the agent loads the index.
3. **Promote `agents_manager/templates/cinematic-landing/` from PROPOSED to MERGED first.** Per angle F [S9], the convention generalises to app templates with three adjustments (multi-file Vite skeleton; richer decision trees; architecture-shaped memory files). The shape has been validated externally by spec-kit (`.specify/`) [S25] and Archon (`.archon/workflows/`) [S27] and OpenHands (`.agents/skills/`) [S30]; we are not alone in this convention.
4. **Adopt the spec-kit command vocabulary for the cross-tier agent-facing commands**: `tier0-init`, `tier1-init`, `tier2-<kind>-init`, `clarify`, `plan`, `implement`, `verify`, `ship`. Anyone who has used spec-kit will recognise these. Adds zero friction; gains portability with 127k users' mental models.
5. **Hardcode only non-interactive scaffolders** in each tier's `init.sh`: `create-vite --template react-ts`, `create-next-app --typescript --tailwind --app --no-turbo`, `create-expo-app --template default`, `shadcn init` + `shadcn add ...`, `wxt init`, `npm create astro@latest -- --template minimal --typescript strict`. **AVOID `create-t3-app`, `create-wasp-app`, `Better-T-Stack`, `WunderGraph`** — all prompt TTY and are unusable from a non-interactive agent. This is the load-bearing trap.
6. **Pin Anthropic Skills + AGENTS.md + cinematic-landing shape as the file-format convention** in `templates/registry.json`. Discovery: the agent reads one JSON, picks the tier, then loads that tier's `SKILL.md` Level 2. Three layers of indirection; ~500 tokens total to identify the right starting point.
7. **INSPIRE, do not fork, the open-source prompt-to-app engines.** Use bolt.diy's MCP integration pattern; Aider's repomap; gpt-engineer's clarify-then-build mechanic; OpenHands' plan mode + sandboxed shell; Plandex's multi-file-plan; Cline/Roo's MCP integration + mode-selector; **Archon's workflow-as-folder pattern** as the closest direct inspiration. None of them is extractable as a portable convention; all of them validate a sub-pattern.
8. **Optional layer as command, not as checked-in code.** `npx shadcn add chart data-table form` for components; `npx medusa db:migrate` for commerce; `pnpm eas build` for mobile; `wxt zip` for extensions. This is the Q8 hybrid delivery mechanism, validated by every scaffolder in Priority 2 that ships a CLI add subcommand.
9. **Per-tier scaffolder manifest in `templates/<name>/init.sh`** that documents exactly which flags are required for non-interactive use. **Per-tier test that runs `init.sh` in CI** to detect scaffolder breakage (this catches the bolt.diy-style "silent license change" or "new interactive prompt" trap).
10. **Stack-claim verification gate**: every library version + every license + every "interactive vs non-interactive" flag must be re-verified at access date. The TIER 4 discipline from `agents_manager/research/SKILL.md` is the right shape; a `scripts/verify-stack-claims.ts` that runs weekly closes the loop. (Sibling angle D's recommendation 10 already called for this; this angle endorses it.)

---

## Risks

| Risk | Severity | Note / Mitigation |
|---|---:|---|
| **bolt.diy's WebContainers commercial license is a hidden trap.** MIT-licensed source but production use requires a separate StackBlitz commercial license; the README is explicit. **HIGH** if a downstream template user copies bolt.diy as a runtime. Mitigation: do not vendor bolt.diy as a runtime; INSPIRE only. |
| **`create-t3-app` and `Better-T-Stack` prompt interactively.** Even with `--CI` / `--yes` flags, they ask the agent to pick packages; an agent cannot reliably answer. **HIGH** if hardcoded into a `init.sh` (the script hangs forever). Mitigation: never hardcode; AVOID; document why in the AVOID row of `templates/<name>/README.md`. |
| **AGENTS.md is widely supported but adoption varies by feature.** Some agents support `AGENTS.md` only as a top-level file; nested AGENTS.md is supported by Codex, Aider (via `.aider.conf.yml`), Gemini CLI, and a few others, but not by every agent on the [S1] adoption list. **MEDIUM** if our tier routing depends on nested AGENTS.md. Mitigation: ship the family root AGENTS.md as the primary; nested per-tier AGENTS.md as opt-in. |
| **Anthropic Skills is 7 months old at access date** (released 2025-12-18). The convention is being adopted fast but is not yet a mature ecosystem. **MEDIUM** if the spec changes shape (level boundaries, frontmatter fields) over the next 6-12 months. Mitigation: track `https://agentskills.io/` for spec changes; pin our `SKILL.md` frontmatter to the 2025-12-18 version. |
| **Spec-kit's command vocabulary is rapidly evolving.** `/speckit.clarify` was added in late 2025; `/speckit.checklist`, `/speckit.analyze` are still beta. **LOW-MEDIUM** if we adopt the vocabulary and a future spec-kit release renames commands. Mitigation: prefix our commands with `tmpl-` (template) to avoid collision; document the spec-kit mapping in `AGENTS.md`. |
| **Archon is Claude-Code-specific.** Its `CLAUDE_BIN_PATH` requirement locks the runtime; our target is cross-runtime. **MEDIUM** if we try to fork Archon's workflow runner. Mitigation: INSPIRE the workflow-as-folder shape; do not vendor Archon's runner. |
| **Star counts are misleading.** gpt-engineer (~75k stars, maintenance-only) is a worse signal than Archon (23.2k stars, last commit days ago). **MEDIUM** if we trust star count alone for adoption. Mitigation: always cross-reference stars with last-commit recency; this angle's matrix already does this. |
| **No single project does the full loop** the user asked for. **HIGH** if we over-commit to one of these and discover it doesn't fit. Mitigation: BUILD, with the matrix above as the reference corpus; expect to revisit if any of these projects ships the missing primitive. |
| **Interactive prompts may be added to currently-non-interactive scaffolders.** `create-vite` and `create-next-app` are non-interactive today with the right flags, but a future release could add a TTY prompt. **LOW** if we run `init.sh` in CI per-tier. Mitigation: per-tier `init.sh` + CI test; the test fails immediately on a scaffolder release that adds prompts. |
| **License traps lurking in code we INSPIRE from.** Plasmo (BSL drift), Theatre.js (AGPL studio), OpenHands (cloud SaaS pivot). **MEDIUM** if we vendor without re-checking. Mitigation: every dependency in every `skeleton/package.json` gets a license line in `templates/<name>/LICENSES.md`; CI enforces it. |
| **Anthropic Skills progressive-disclosure is a per-runtime feature, not a hard standard.** Some agents will read all skills on session start; others will honour Level 1 metadata only. **MEDIUM** if our tier routing depends on Level 2 trigger matching. Mitigation: ship the full `<5k token` Level 2 body in each tier's `SKILL.md`; design so a "load everything" agent still works correctly. |

---

## Sources

All access dates 2026-08-13 unless noted.

- **[S1]** AGENTS.md standard, agents.md site. https://agents.md/ . Web type. Proves: AGENTS.md is the open, cross-runtime standing-instructions file; 60k+ projects contain it; stewarded by Agentic AI Foundation (LF); supports Codex, Jules, Factory, Aider, Goose, OpenCode, Zed, Warp, VS Code, Devin, UiPath Autopilot, Junie, Amp, Cursor, Roo Code, Gemini CLI, Kilo Code, Phoenix, Semgrep, GitHub Copilot Coding Agent, Ona, Windsurf, Augment Code. Verified.
- **[S2]** Anthropic Skills (SKILL.md), canonical repo. https://github.com/anthropics/skills . GitHub. Proves: ~168.7k stars; `AGENTS.md`-friendly; three progressive-disclosure levels (Level 1 ~100 tokens metadata, Level 2 <5k tokens instructions, Level 3+ bundled files); YAML frontmatter `name` + `description`; Apache-2.0 for the spec and reference examples; live at https://agentskills.io (per README).
- **[S3]** CLAUDE.md convention. https://docs.claude.com/en/docs/claude-code/llms-txt . Web/official-docs. Proves: Claude Code loads CLAUDE.md at session start; same shape as AGENTS.md; treated as a Claude-specific variant. [UNVERIFIED — exact URL; convention widely documented.]
- **[S4]** Cursor Rules / `.cursorrules`. https://docs.cursor.com/context/rules . Web/official-docs. Proves: Cursor reads `.cursorrules` at session start; also reads AGENTS.md natively in 2026 (per [S1]). [UNVERIFIED — exact URL; well-documented convention.]
- **[S5]** llms.txt standard, llmstxt.org. https://llmstxt.org/ . Web. Proves: convention for publishing site content for LLM consumption; ~10k stars on the spec repo at access date; orthogonal to agent instruction sets (this is for content sites, not for agent project instructions).
- **[S6]** Firebase Studio sunset docs. https://firebase.google.com/docs/studio . Web/official-docs. Proves: sunset 2027-03-22; new-workspace creation disabled 2026-06-22. (Already cited by Angle B as dead on arrival.)
- **[S7]** AGENTS.md Google search count. https://github.com/search?q=path%3AAGENTS.md+NOT+is%3Afork+NOT+is%3Aarchived&type=code . GitHub. Proves: ~60k+ projects contain AGENTS.md (per agents.md site citation).
- **[S8]** [REDACTED — placeholder for spec-kit content; see S25]
- **[S9]** `agents_manager/upstream-contrib/PROPOSED_PATCH_v0.5.x_2026-07-01_cinematic-landing-template.md`. Local path. Access: 2026-08-13. Proves: the cinematic-landing convention (`templates/<name>/` with `memory/ + skeleton/ + prompts/ + decisions/ + assets/ + 00-readme-first.md`); per angle F's audit, the convention generalises to app templates with three adjustments. PROPOSED, not merged.
- **[S10]** create-vite (Vite monorepo, packages/create-vite). https://github.com/vitejs/vite . GitHub. Proves: ~76k stars on the monorepo; `npm create vite@latest <name> -- --template react-ts` is non-interactive; outputs a real working Vite + React + TS scaffold in ~10 seconds.
- **[S11]** create-next-app (Next.js monorepo, packages/create-next-app). https://github.com/vercel/next.js . GitHub. Proves: ~133k stars on the monorepo; `npx create-next-app@latest <name> --typescript --tailwind --app --no-turbo` is fully non-interactive.
- **[S12]** create-expo-app (Expo monorepo, packages/create-expo-app). https://github.com/expo/expo . GitHub. Proves: ~37k stars on the monorepo; `npx create-expo-app@latest <name> --template default` is non-interactive.
- **[S13]** create-t3-app. https://github.com/t3-oss/create-t3-app . GitHub. Proves: 29.1k stars; MIT; even with `--CI` flag, prompts for individual package choices; therefore AVOID for agent use.
- **[S14]** shadcn/ui CLI (shadcn-ui/ui monorepo, packages/shadcn). https://github.com/shadcn-ui/ui . GitHub. Proves: ~84k stars; `npx shadcn@latest add button card dialog` is non-interactive when components are listed.
- **[S15]** Better-T-Stack. https://github.com/AmanVarshney01/create-better-t-stack . GitHub. Proves: ~3.4k stars; MIT; CLI prompts for stack choices interactively.
- **[S16]** Wasp (Wasp lang). https://github.com/wasp-lang/wasp . GitHub. Proves: ~16.5k stars; MIT; `wasp init` requires the Wasp CLI installed globally; framework lock-in.
- **[S17]** RedwoodJS. https://github.com/redwoodjs/redwood . GitHub. Proves: ~5.5k stars; MIT; interactive prompts ask for TypeScript vs JS + database; framework lock-in.
- **[S18]** Refine (refinedev/refine monorepo). https://github.com/refinedev/refine . GitHub. Proves: ~31k stars; MIT; data-provider abstraction is portable but the framework itself locks; `create refine-app --platform vite-react --ui headless --data-provider rest --auth none --no-install` is non-interactive.
- **[S19]** TanStack Router. https://github.com/TanStack/router . GitHub. Proves: ~11k stars; MIT; starter templates available; non-interactive in most cases.
- **[S20]** WXT (browser extension framework). https://github.com/wxt-dev/wxt . GitHub. Proves: ~7.2k stars; MIT; `pnpm create wxt@latest` is non-interactive with flags.
- **[S21]** Medusa (medusajs/medusa monorepo, packages/cli). https://github.com/medusajs/medusa . GitHub. Proves: ~28k stars; MIT; `npx create-medusa-app@latest <name>` scaffolds Medusa + Next.js + Postgres.
- **[S22]** Astro (create-astro). https://github.com/withastro/astro . GitHub. Proves: ~57k stars on the monorepo; `npm create astro@latest` with `--template minimal --typescript strict --install --git --yes` is fully non-interactive.
- **[S23]** Qwik. https://github.com/QwikDev/qwik . GitHub. Proves: ~22k stars; MIT; `npm create qwik@latest` prompts interactively.
- **[S24]** React Router v8 (the `react-router-dom` deprecation). Per angle F [S24]. Proves: canonical package is now `react-router` v8; `react-router-dom` v7.x is a re-export shim; import from `react-router`.
- **[S25]** GitHub spec-kit. https://github.com/github/spec-kit . GitHub. Proves: 126.8k stars; MIT; very active; `.specify/memory/` + `.specify/templates/` + `.specify/extensions/` + `.specify/presets/` + `bundles/` folder structure; ships `AGENTS.md` at root; slash commands `/speckit.constitution`, `/speckit.specify`, `/speckit.plan`, `/speckit.tasks`, `/speckit.implement`, `/speckit.clarify`, `/speckit.analyze`, `/speckit.checklist`; 30+ AI coding agent integrations.
- **[S26]** [REDACTED — alias for S30 OpenHands]
- **[S27]** Archon (coleam00/Archon). https://github.com/coleam00/Archon . GitHub. Proves: 23.2k stars; MIT; self-describes as "The first open-source harness builder for AI coding. Make AI coding deterministic and repeatable"; ships `.archon/workflows/` + `AGENTS.md` + `CLAUDE.md` + 19 default workflows including `archon-piv-loop` (Plan-Implement-Validate loop with human review) and `archon-idea-to-pr`; 1,767 commits; very active; locks to Claude Code via `CLAUDE_BIN_PATH`.
- **[S28]** bolt.diy (stackblitz-labs/bolt.diy). https://github.com/stackblitz-labs/bolt.diy . GitHub. Proves: 19.7k stars; MIT for source but **WebContainers API requires commercial license for production for-profit use** (per README licensing section); 1,629 commits; very active; 19+ LLM providers via Vercel AI SDK; fork of stackblitz/bolt.new.
- **[S29]** Aider (Aider-AI/aider). https://github.com/Aider-AI/aider . GitHub. Proves: 48.2k stars; Apache-2.0; 13,138 commits; very active; reads AGENTS.md per `.aider.conf.yml` (`read: AGENTS.md`); repo-map for token compression; auto-commit per edit; supports 100+ languages.
- **[S30]** OpenHands (All-Hands-AI/OpenHands). https://github.com/All-Hands-AI/OpenHands . GitHub. Proves: 83.9k stars; MIT; 8,017 commits; very active; ships `AGENTS.md` at repo root and `.agents/skills/` folder (matches our convention); Cloud Agents SaaS in disguise; multi-agent backend support.
- **[S31]** BMAD-Method. https://github.com/bmad-code-org/BMAD-METHOD . GitHub. Proves: ~25k stars; MIT; `.bmad-core/` (memory + agents + workflows) + `templates/`; per-agent personas as markdown files. [UNVERIFIED — exact star count and URL; angle E covered.]
- **[S32]** agent-os. https://github.com/buildermethods/agent-os . GitHub. Proves: ~2k stars; MIT; `.agent-os/` folder with `spec.md`, `plan.md`, `tasks.md`. [UNVERIFIED — exact star count and URL; angle E covered.]
- **[S33]** claude-task-master. https://github.com/eyaltoledano/claude-task-master . GitHub. Proves: ~7k stars; MIT; tasks-as-data pattern. [UNVERIFIED — exact star count and URL.]
- **[S34]** Makerkit. https://github.com/makerkit/makerkit . GitHub. Proves: ~5k stars; COMMERCIAL; Next.js SaaS starter; reference for tier2-saas-bundle shape only.
- **[S35]** Supastarter. https://github.com/supastarter/supastarter . GitHub. Proves: ~3k stars; COMMERCIAL; Nuxt SaaS starter.
- **[S36]** ShipFast. https://github.com/marc-louis/shipfast . GitHub. Proves: ~6k stars; COMMERCIAL; Next.js SaaS starter.
- **[S37]** Next.js SaaS Starter (ixartz). https://github.com/ixartz/Next-js-Saas-Starter . GitHub. Proves: ~6k stars; MIT; Next.js 14/16 + Tailwind + NextAuth + Prisma + Stripe; reference for individual files.

---

## Self-critique

**Did I do my job?** YES, partial. The deliverable answers the question "is there anything to fork, copy, or depend on instead of building from scratch?" with a 43-row matrix, 5-priority verdict, 10 concrete changes, 11 risks, and a self-aware "no single project does the full loop" verdict. **What would have been better?** A live test of each non-interactive scaffolder to confirm `< /dev/null` succeeds — that was implied (per the "interactive-prompt trap" call-out) but not actually executed in this dispatch; the verdict on `create-t3-app` AVOID rests on the README's "Interactive CLI" framing, not on a runtime test. **Confidence: MEDIUM** on the AVOID verdict for `create-t3-app`, `Better-T-Stack`, `Wasp`, `RedwoodJS`, `Refine`, `create-qwik` — these are based on README claims, not empirical proof. **Confidence: HIGH** on AGENTS.md / Anthropic Skills / spec-kit / Archon / Aider / OpenHands — verified by direct webfetch.

**What might I have missed?**

- **`create-vite`, `create-next-app`, `create-expo-app`, `shadcn add`, WXT, Medusa, Astro, TanStack Start** all marked USE-AS-DEPENDENCY without an empirical `< /dev/null` test. The verdicts rest on the README's "supports flags" framing.
- **`gpt-engineer`'s exact star count and last-commit date** are UNVERIFIED. I cited ~75k stars and ~6 months ago, but the repo at the time of this dispatch may have more (the original AntonOsika repo was archived; the org repo is `gpt-engineer-org`).
- **`OpenHands`' plan-mode + sandboxed-shell mechanism** is described at a high level; I did not drill into the actual system prompt to verify the claim.
- **The agentskills.io spec** at https://agentskills.io/ is mentioned in anthropics/skills README but I did not fetch it to verify the spec details (Level 1 ~100 tokens; Level 2 <5k tokens). This was inherited from sibling angle D [S3] but not directly verified in this dispatch.
- **License information for several INSPIRE-only projects** (Plandex, Goose, Cline, Roo, Dyad, Onlook, srcbook) is approximate; I did not fetch each LICENSE file.

**What did I assume without evidence?**

- That AGENTS.md supports nested per-folder files in every agent that reads AGENTS.md. Per [S1], Codex does; Aider does; OpenAI has 88 nested AGENTS.md files in their main repo. But not every agent on the [S1] list supports nested AGENTS.md. Mitigation: ship the family root AGENTS.md; nested per-tier AGENTS.md as opt-in only.
- That Anthropic Skills Level 1 metadata is exactly ~100 tokens per skill. Cited from sibling angle D [S3]; not directly fetched.
- That Archon's `.archon/workflows/` folder shape is the right inspiration for our tier-folders. Confirmed by direct inspection of the Archon README [S27]; the actual `archon-idea-to-pr` workflow YAML would be a closer inspection if we want to ship an equivalent.

**Honest summary:** The matrix and verdict are honest. The TIER 4 discipline (numbered citations, access dates, license checks) is held. Empirical tests of every scaffolder's non-interactive mode would lift this from MEDIUM to HIGH confidence on the AVOID/USE-AS-DEPENDENCY column; that is the load-bearing test the planner must run before locking the tier routing.

---

## Metrics

- findings: 12 (one per numbered priority section + "no full loop" verdict + "adopt three conventions" verdict)
- risks_HIGH: 3 (bolt.diy WebContainers trap; create-t3-app TTY trap; no single project does full loop)
- risks_MEDIUM: 5 (AGENTS.md nested-file support; Anthropic Skills spec evolution; Archon Claude-Code lock; license traps lurking in INSPIRE-from code; Skills Level 1/2 trigger matching)
- risks_LOW: 3 (spec-kit command vocab drift; interactive prompts may be added; star-count misleading)
- clarifying_Qs: 0 (this angle's verdict is conclusive; downstream angles may surface questions)

---

## For other angles

- **Angle B (competitors)**: confirms bolt.diy / Aider / gpt-engineer / OpenHands / Plandex / Cline / Roo Code are the OSS counterparts to the closed-source tools teardowned in angle B. The closed-source tools (Bolt.new, v0, Lovable, Replit, Base44, Cursor, Windsurf/Devin Desktop, Claude Code) all consume the AGENTS.md / Skills / SKILL.md conventions. Angle A's matrix is the build side of angle B's buy side.
- **Angle C (app-kinds)**: the 8 tier entries from angle C (cinematic-landing + tier0-minimal + tier1-standard + tier2-{ai-chat, mobile, saas-bundle, storefront, tooling}) map 1:1 onto the convention in this angle's Priority 1.5 file layout. Each tier ships as one Anthropic Skills folder + AGENTS.md references. The scaffolders in Priority 2 are the `init.sh` commands each tier uses.
- **Angle D (token economy)**: this angle's "Pin Anthropic Skills as the convention" recommendation **directly validates** angle D's progressive-disclosure cost model. Level 1 metadata at ~100 tokens per skill = ~800 tokens for the family at session start, even before routing. This is the "stable prefix first" pattern angle D called for.
- **Angle E (intake)**: the spec-kit `/speckit.clarify` + `/speckit.checklist` + `/speckit.analyze` slash commands [S25] are the closest OSS analogues to angle E's clarification protocol. Recommend angle E cross-reference spec-kit's vocabulary for any clarifier surface names. Also relevant: github/spec-kit's `constitution` + `specify` + `plan` + `tasks` + `implement` is the canonical 5-step intake-then-build dance; angle E's "one bounded survey + confirm" maps cleanly onto `constitution` (governing principles) + `specify` (what to build) + `clarify` (ask user) + `plan` (restate-and-confirm) + `implement`.
- **Angle F (audit)**: angle F's recommendation 9 (ship `templates/registry.json`) is exactly what this angle's file-format convention supports. The registry entries are `{tier, kind, stack, skills-folder, scaffolder, init.sh}` tuples; agents discover by reading one JSON.

---

**DONE_WITH_CONCERNS**: the artifact is complete; the load-bearing concern is that the AVOID/USE-AS-DEPENDENCY verdicts on the Priority 2 scaffolders are based on README claims, not empirical `< /dev/null` tests — recommend the planner run those tests before locking any `init.sh`. The artifact is `share/notes/01_research_T-2026-08-13-003_angle-a-prior-art.md`.