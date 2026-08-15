---
chapter: 05
title: Prior art and competitors
task_id: T-2026-08-13-003
date: 2026-08-13
sources: angle A (prior-art OSS), angle B (commercial teardown), angle F (audit)
voice_constraints: no U+2014; tables over prose where possible
---

## Headline

Verdict: BUILD, not FORK. Closest three open-source projects (bolt.diy, gpt-engineer, Aider) cover the clarify/build loop in fragments; none does the full chat-idea to runnable-app protocol with portable cross-runtime markdown. Recommended file-format convention: AGENTS.md at the family root + Anthropic Skills `SKILL.md` per tier + the in-repo `agents_manager/templates/cinematic-landing/` folder shape. Single most valuable thing to steal from the commercial tools: v0's pre-injected starter-file contract (`user_read_only_context/`), where the LLM never regenerates the boilerplate, only the diff.

---

## Part 1: the fork-or-build verdict

No open-source project does the full loop the user asked for (chat-idea in, clarification, template routing, skeleton init, working app out, portable across runtimes). The closest three, each missing a different critical piece:

| Project | Closest axis | What's missing |
|---|---|---|
| **bolt.diy** (MIT, 19.7k stars, very active) [Angle A S28] | Closest to the scaffold loop (WebContainers + 19 LLM providers + MCP) | No clarification protocol. No template router. No portable cross-runtime story. WebContainers commercial license trap (see Part 8). Cannot fork. |
| **gpt-engineer** (MIT, ~75k stars, maintenance-only) [Angle A §3.3] | Closest to clarify-then-build mechanic (1-3 plain-text questions, then scaffold) | Python-only. No tier router. No portable cross-runtime story. Last meaningful commit ~6 months ago. INSPIRE the question-pattern, not the codebase. |
| **Aider** (Apache-2.0, 48.2k stars, very active) [Angle A S29] | Closest as a CLI pair-programmer (repo-map, auto-commit, AGENTS.md integration) | Requires an existing repo. Does not scaffold from prose. INSPIRE the `repo-map` + `.aider.conf.yml` `read: AGENTS.md` integration. |

Plainly: **no fork candidate exists**. The build is assembly, not invention. Every layer of the design has a working OSS reference (conventions, scaffolders, tools); no project combines all three. Sibling angle F independently audited the cinematic-landing folder shape and confirmed it generalises to app templates with three adjustments (multi-file Vite skeleton, richer decision trees, architecture-shaped memory files). The recommended file-format convention in Part 2 is convergent, not a single opinion.

The strongest direct prior art for the "AI coding harness as in-repo YAML/folder convention" is **Archon** by coleam00 (MIT, 23.2k stars, very active) [Angle A S27]. Archon ships `.archon/workflows/<pack>/<workflow>/` with YAML + scripts + slash commands, plus `AGENTS.md` + `CLAUDE.md` at the root, and 19 default workflows including `archon-piv-loop` (Plan-Implement-Validate with human review) and `archon-idea-to-pr`. Archon's gap vs the target: locked to Claude Code via `CLAUDE_BIN_PATH`; no clarification protocol; no tier-router primitive. INSPIRE the workflow-as-folder shape, do not fork the engine.

The strongest spec-driven convention is **github/spec-kit** (MIT, 126.8k stars, very active) [Angle A S25]. Ships `.specify/memory/` + `.specify/templates/` + `.specify/extensions/` + `.specify/presets/` + `bundles/`, plus slash commands `/speckit.constitution`, `/speckit.specify`, `/speckit.plan`, `/speckit.tasks`, `/speckit.implement`, `/speckit.clarify`, `/speckit.analyze`, `/speckit.checklist`. spec-kit's structure is so close to the proposed `templates/<name>/memory/` + `skeleton/` shape that adopting its command vocabulary would be portable to 127k users' mental models. Gap: no tier-router primitive; no runnable skeleton as a first-class concept (templates are markdown, not code).

The strongest agent-facing convention is **Anthropic Skills** (Apache-2.0, ~168.7k stars, very active) [Angle A S2]. Ships folder-per-skill with three progressive-disclosure levels (Level 1 ~100 tokens metadata always loaded, Level 2 <5k tokens instructions loaded when triggered, Level 3+ bundled files on-demand). Gap: skills are runtime-agnostic instructions for HOW to do a task, not app templates that ship a `src/main.tsx`.

The strongest closed-source prior art is **v0** (Vercel): see Part 5.

---

## Part 2: the file-format convention to adopt

Three pieces, adopted together. This is the highest-value finding in the source corpus.

| Layer | Convention | Role |
|---|---|---|
| Family root | **AGENTS.md** (open standard, stewarded by Agentic AI Foundation under the Linux Foundation) [Angle A S1; verified 2026-08-13 on agents.md] | Cross-runtime standing instructions: build/test/lint commands, project structure, code style, where to find each tier. Plain markdown, no required schema. |
| Per tier | **Anthropic Skills `SKILL.md`** (Apache-2.0 spec, open since 2025-12-18) [Angle A S2] | Progressive-disclosure invocation: Level 1 metadata (~100 tokens) always loaded, Level 2 instructions (<5k tokens) loaded when triggered, Level 3+ bundled files on-demand. Predictable per-call token cost. |
| Per tier | **In-repo `agents_manager/templates/cinematic-landing/` folder shape** [Angle A S9; promoted by angle F] | Per-tier folder = `memory/` (problem-shaped docs) + `skeleton/` (real working code) + `prompts/` (copy-paste prompts) + `decisions/decision-log.md` (append-only) + `assets/MANIFEST.json` (structured state) + `00-readme-first.md` (entry doc). The Skills folder convention does not prescribe an internal layout; this shape fills the gap. |

Proposed folder layout:

```
templates/
├── AGENTS.md                            # cross-runtime standing instructions
├── CLAUDE.md                            # alias for Claude Code users (optional)
├── registry.json                        # discoverable tier + kind index
├── README.md                            # human/agent entry point
├── tier0-minimal/                       # Skill folder
│   ├── SKILL.md                         # Level 1 metadata + Level 2 instructions
│   ├── memory/
│   ├── skeleton/                        # real working Vite + React + TS + Tailwind
│   ├── prompts/
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
└── cinematic-landing/                   # existing, promote to family
```

Why this trio beats the alternatives on the three axes that matter:

- **Adoption breadth**: AGENTS.md is supported by Codex, Jules, Factory, Aider, Goose, OpenCode, Zed, Warp, VS Code, Devin, UiPath Autopilot, Junie, Amp, Cursor, Roo Code, Gemini CLI, Kilo Code, Phoenix, Semgrep, GitHub Copilot Coding Agent, Ona, Windsurf, Augment Code [agents.md homepage, verified 2026-08-13]. The site states "used by over 60k open-source projects" and "View 60k+ examples on GitHub" (verbatim, verified 2026-08-13). It is the only convention that hits the user's cross-runtime target (Kilo, Claude Code, Cursor, OpenCode, Codex).
- **Portability**: None of the three is a closed vendor format. AGENTS.md is an LF/AAIF stewarded open format. Anthropic Skills is Apache-2.0. The cinematic-landing shape is in this repo (proposed patch, validated by sibling angle F to generalise to app templates).
- **Progressive disclosure**: Anthropic Skills is the only convention with first-class progressive-disclosure discipline that maps to caching-economics constraints. Level 1 metadata at ~100 tokens per skill = ~600 tokens for the whole family if the agent ships 6 tiers, which means the family roots can be enumerated cheaply.

Convergent support: sibling angle F independently audited the proposed cinematic-landing shape and judged it generalises cleanly to app templates with three adjustments. This is the second opinion; the convention is not a single-author opinion.

---

## Part 3: the open-source landscape

Every project: name, repo URL, license, stars with access date, last-commit recency, one-line architecture, verdict, one-line reason. Grouped by category. Star counts marked [UNVERIFIED] are kept as in the source dossier; the headline quality signal is last-commit recency, not stars.

### Prompt-to-app engines

| # | Project | License | Stars | Last commit | Architecture | Verdict | Reason |
|---|---|---|---:|---|---|---|---|
| 1 | **bolt.diy** (stackblitz-labs) | MIT (source) + WebContainers commercial trap | 19.7k | within 24h | WebContainers + 19 LLM providers via Vercel AI SDK + MCP | **INSPIRE; AVOID** | Closest scaffold loop; MIT source hides WebContainers production license. |
| 2 | **gpt-engineer** (gpt-engineer-org) | MIT | ~75k [UNVERIFIED] | ~6 months (maintenance-only) | Python CLI: prompt → 1-3 clarifications → full scaffold → Docker run | **INSPIRE; AVOID** | Clarify-then-build mechanic is the closest in OSS; Python-only, slowing down. |
| 3 | **OpenHands** (All-Hands-AI) | MIT | 83.9k | within 24h | Cloud AI software engineer in Docker sandbox; ships `AGENTS.md` + `.agents/skills/` | **INSPIRE** | Right conventions (AGENTS.md + skills/); cloud product, not a portable convention. |
| 4 | **Aider** (Aider-AI) | Apache-2.0 | 48.2k | within 24h | Python CLI pair-programmer; repo-map; auto-commit; reads `AGENTS.md` via `.aider.conf.yml` | **INSPIRE** | Best in-repo patterns; it's a CLI, not a template-family scaffolder. |
| 5 | **Pythagora / GPT-Pilot** (Pythagora-io) | MIT | ~33k [UNVERIFIED] | ~3 months (slowing) | Multi-agent SDLC: PM → architect → dev → QA → reviewer | **AVOID** | Multi-role pattern is interesting; PR cadence slowed since 2025-Q4. |
| 6 | **Plandex** (plandex-ai) | MIT | ~14k [UNVERIFIED] | within days | CLI with multi-file plans + persistent context + parallel agents | **INSPIRE** | Persistent-context + parallel-agents is interesting; CLI, not a portable convention. |
| 7 | **Cline** (cline) | Apache-2.0 | ~38k [UNVERIFIED] | within days | VS Code AI agent extension; reads `AGENTS.md`; MCP integration | **INSPIRE** | AGENTS.md + MCP integration; VS Code extension, not portable. |
| 8 | **Roo Code** (RooCodeInc) | Apache-2.0 | ~19k [UNVERIFIED] | within days | VS Code fork of Cline with multi-mode (Code/Architect/Ask/Debug/Orchestrator) | **INSPIRE** | Orchestrator mode validates multi-agent-within-runtime. |
| 9 | **Goose** (Block) | Apache-2.0 | ~7k [UNVERIFIED] | within days | Desktop + CLI AI agent; bash + file edit + web fetch + computer use | **INSPIRE** | Agent runtime, not a portable template family. |
| 10 | **Dyad** (dyad-sh) | Apache-2.0 | ~5k [UNVERIFIED] | within days | Local-first desktop AI app builder (React/Vite/Next + shadcn + Supabase) | **AVOID** | Desktop product, not a portable convention. |
| 11 | **Onlook** (onlook-dev) | Apache-2.0 | ~6k [UNVERIFIED] | within days | Visual drag-and-drop editor for React/Next + Tailwind | **AVOID** | Visual editor, not a portable template family. |
| 12 | **srcbook** (srcbookhq) | Apache-2.0 | ~5k [UNVERIFIED] | within 30 days | TypeScript notebook IDE for LLM-augmented apps | **INSPIRE** | Notebook UX; locks to desktop product. |

### Spec-driven frameworks

| # | Project | License | Stars | Last commit | Architecture | Verdict | Reason |
|---|---|---|---:|---|---|---|---|
| 13 | **github/spec-kit** | MIT | 126.8k | within 24h | `.specify/memory/` + `.specify/templates/` + `.specify/extensions/` + `.specify/presets/` + `bundles/`; slash commands `/speckit.constitution` … `/speckit.clarify` | **INSPIRE** | 127k-star proof that the in-repo `.specify/` + memory + templates convention works; adopt command vocabulary. |
| 14 | **Archon** (coleam00) | MIT | 23.2k | within 24h | `.archon/workflows/<pack>/<workflow>/` with YAML + scripts + slash commands; 19 default workflows | **INSPIRE** | Closest direct prior art: workflow-as-folder + deterministic gates; locked to Claude Code. |
| 15 | **BMAD-Method** (bmad-code-org) | MIT | ~25k [UNVERIFIED] | active | `.bmad-core/` (memory + agents + workflows) + `templates/`; per-agent persona markdown | **INSPIRE** | Multi-agent personas as markdown; matches the `templates/<name>/prompts/` pattern. |
| 16 | **agent-os** (buildermethods) | MIT | ~2k [UNVERIFIED] | moderate | `.agent-os/` with `spec.md`, `plan.md`, `tasks.md` | **INSPIRE** | Smaller; no unique advantage over spec-kit. |
| 17 | **claude-task-master** (eyaltoledano) | MIT | ~7k [UNVERIFIED] | active | `tasks/` folder with task JSON files | **INSPIRE** | Tasks-as-data is useful; not the load-bearing piece. |

### Deterministic scaffolders (the "commands" half of the hybrid delivery model)

| # | Project | License | Stars | Last commit | Architecture | Verdict | Reason |
|---|---|---|---:|---|---|---|---|
| 18 | **create-vite** (vitejs/vite) | MIT | ~76k | within 24h | `npm create vite@latest <name> -- --template react-ts` | **USE-AS-DEPENDENCY / HARDCODE** | Universal 2026 starter; `--template` flag is fully non-interactive. |
| 19 | **create-next-app** (vercel/next.js) | MIT | ~133k | within 24h | `npx create-next-app@latest <name> --typescript --tailwind --app --no-turbo` | **USE-AS-DEPENDENCY / HARDCODE** | The right pick for SaaS / AI chat / content tiers; `--no-*` flags make it non-interactive. |
| 20 | **create-expo-app** (expo/expo) | MIT | ~37k | within 24h | `npx create-expo-app@latest <name> --template default` | **USE-AS-DEPENDENCY / HARDCODE** | The 2026 default for mobile; non-interactive with flag. |
| 21 | **shadcn/ui CLI** (shadcn-ui/ui) | MIT | ~84k | within 24h | `npx shadcn@latest add button card dialog ...` | **USE-AS-DEPENDENCY / HARDCODE** | Canonical `npx shadcn add` for components; non-interactive in `add` mode. |
| 22 | **Astro create** (withastro/astro) | MIT | ~57k | within 24h | `npm create astro@latest -- --template minimal --typescript strict --install --git --yes` | **USE-AS-DEPENDENCY** | Tier2-content scaffold; non-interactive with flags. |
| 23 | **WXT** (wxt-dev) | MIT | ~7.2k | within 24h | `pnpm create wxt@latest` for browser extensions (Manifest V3) | **USE-AS-DEPENDENCY / HARDCODE** | The 2026 default for MV3 extensions; minimal prompts. |
| 24 | **Medusa CLI** (medusajs/medusa) | MIT | ~28k | within 24h | `npx create-medusa-app@latest <name>` for headless commerce | **USE-AS-DEPENDENCY / HARDCODE** | Tier2-storefront scaffold; canonical OSS headless commerce. |
| 25 | **TanStack Start / router** (TanStack/router) | MIT | ~11k | within 24h | `create-tsrouter-app` and per-framework examples | **USE-AS-DEPENDENCY (selective)** | Escape hatch for type-safe client routing; not the default. |
| 26 | **create-t3-app** (t3-oss) | MIT | 29.1k | ~14 days | Interactive CLI for Next + tRPC + Prisma + Tailwind + NextAuth | **AVOID** | TTY prompts even with `--CI`; unusable from a non-interactive agent. |
| 27 | **Better-T-Stack** (AmanVarshney01) | MIT | ~3.4k | ~7 days | Interactive CLI for TanStack/Next/Nuxt + Convex + better-auth/Clerk + Tailwind + shadcn | **AVOID** | Beautiful idea; prompt surface too wide for an agent. |
| 28 | **Wasp** (wasp-lang) | MIT | ~16.5k | ~14 days | Opinionated DSL with own compiler; `wasp init` | **AVOID** | Locks to a single framework; not a portable scaffolder. |
| 29 | **RedwoodJS** (redwoodjs) | MIT | ~5.5k | within 30 days | Full-stack framework with cells, routes, services | **AVOID** | Framework lock-in + TTY prompts. |
| 30 | **Refine** (refinedev) | MIT | ~31k | within 24h | Headless framework for admin/CRUD; `create refine-app --platform ...` | **AVOID (as dep); INSPIRE** | INSPIRE the data-provider abstraction; AVOID framework lock. |
| 31 | **Qwik** (QwikDev) | MIT | ~22k | active | `npm create qwik@latest` | **AVOID** | Interactive prompts. |

### Context conventions (not scaffolders, not engines)

| # | Project | License | Stars | Last commit | Architecture | Verdict | Reason |
|---|---|---|---:|---|---|---|---|
| 32 | **AGENTS.md** (agents.md) | LF/AAIF open format | 60k+ projects | active | Single markdown file at project root (can be nested) | **ADOPT** | Cross-runtime standing instructions. Verified 2026-08-13: agents.md homepage says "used by over 60k open-source projects". |
| 33 | **Anthropic Skills** (anthropics/skills) | Apache-2.0 | ~168.7k | active | Per-skill folder with three progressive-disclosure levels | **ADOPT** | Only convention with first-class progressive disclosure. |
| 34 | **CLAUDE.md** | open | n/a | active | Claude-Code-specific variant of AGENTS.md | **ADOPT (alias)** | Optional symlink/duplicate for Claude Code users. |
| 35 | **Cursor Rules / `.cursorrules`** | n/a | n/a | legacy | Cursor-specific system-context file | **AVOID** | Cursor reads AGENTS.md natively in 2026; legacy convention. |
| 36 | **llms.txt** (llmstxt.org) | MIT (spec) | ~10k | low activity | Site-publishes a short-form index + long-form | **NOT RELEVANT** | For websites, not for filesystem projects. |
| 37 | **cinematic-landing shape** (in-repo) | in-repo | n/a | proposed | `memory/` + `skeleton/` + `prompts/` + `decisions/` + `assets/` + `00-readme-first.md` | **ADOPT** | Already half-adopted; angle F verified it generalises. |

### Starter kits

| # | Project | License | Stars | Last commit | Architecture | Verdict | Reason |
|---|---|---|---:|---|---|---|---|
| 38 | **Next.js SaaS Starter** (ixartz) | MIT | ~6k [UNVERIFIED] | active | Next.js 14/16 + Tailwind + NextAuth + Prisma + Stripe | **USE-AS-DEPENDENCY (reference)** | Copy individual files (Stripe webhook, NextAuth config) into the skeleton. |
| 39 | **Makerkit** | COMMERCIAL | ~5k | active | Next.js SaaS starter | **AVOID (substitute); USE-AS-REFERENCE** | Commercial SaaS starter; reference for SaaS-bundle shape only. |
| 40 | **Supastarter** | COMMERCIAL | ~3k | active | Nuxt SaaS starter | **AVOID** | Commercial; Nuxt-only; not portable. |
| 41 | **ShipFast** (marc-louis) | COMMERCIAL | ~6k | active | Next.js SaaS starter | **AVOID** | Commercial; locks to Next.js. |

43 rows total. License counts: 41 MIT/Apache-2.0 (acceptable for vendoring with attribution), 3 commercial (AVOID as substitute), 1 with a hidden commercial rider (bolt.diy via WebContainers; see Part 8).

---

## Part 4: the scaffolder trap

The single most consequential practical finding. **An agent cannot answer a TTY prompt.** Any scaffolder that blocks on an interactive question is unusable from a non-interactive shell. The verdict table in Part 3 marked each scaffolder accordingly. The trap is the load-bearing one because it determines the "commands" half of the hybrid delivery model.

**Caveat (carried forward from the source):** the AVOID verdicts for `create-t3-app`, `Better-T-Stack`, `Wasp`, `RedwoodJS`, `Refine`, `create-qwik`, and the USE-AS-DEPENDENCY verdicts for `create-vite`, `create-next-app`, `create-expo-app`, `shadcn add`, WXT, Medusa, Astro, and TanStack Start **rest on README claims of "supports flags" / "non-interactive with flags", not on actual `< /dev/null` runtime tests**. The source author flagged this gap explicitly. Recommend the planner run each `init.sh` in CI under `< /dev/null` to confirm exit code 0 before locking any tier's scaffold.

Commands deemed safe to hardcode in `templates/<name>/init.sh`, with the exact invocation:

| Tool | Command (copy-paste form) | Tier |
|---|---|---|
| create-vite | `npm create vite@latest <name> -- --template react-ts` | tier0-minimal, tier1-standard |
| create-next-app | `npx create-next-app@latest <name> --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --no-turbo` | tier1-standard and the SaaS/AI/content tiers |
| create-expo-app | `npx create-expo-app@latest <name> --template default` | tier2-mobile |
| Astro create | `npm create astro@latest -- --template minimal --typescript strict --install --git --yes` | tier2-content |
| WXT | `pnpm create wxt@latest` (with flags) | tier2-tooling/extension |
| Medusa | `npx create-medusa-app@latest <name>` (with `--no-prompt` flags) | tier2-storefront |
| shadcn | `npx shadcn@latest init` then `npx shadcn@latest add button card dialog ...` | universal UI layer |
| TanStack Start | `create-tsrouter-app` (flags cover most choices) | tier1-standard escape hatch |

Commands to AVOID as hardcoded scaffolders (TTY prompts make the script hang forever):

`create-t3-app`, `create-better-t-stack`, `WunderGraph`, `Wasp` (`wasp init`), `RedwoodJS create-redwood-app`, `create-qwik`, and `Refine`'s interactive modes. These are excellent tools for human-driven scaffolding; an agent just cannot drive them. The pattern is sound for some (Better-T-Stack's package-bundling philosophy, for example); the tool itself is human-shaped.

CI test pattern (recommended at plan time): each `init.sh` runs in a fresh container, with stdin redirected from `/dev/null`, and the test exits non-zero if the scaffolder prompt-throws. This catches (a) silent license changes (e.g. bolt.diy-style future traps), (b) TTY prompts added in a future release, (c) scaffolder breakage.

---

## Part 5: the commercial teardown

The closed-source landscape converges on a single pattern: **generate-first, refine-forever**. Of 12 closed tools with public docs, 9 ship generate-first by default (Bolt.new, v0, Lovable, Replit, Base44 Default mode, Cursor, Cascade, Devin standard mode, a0.dev, Rork, Claude Code default); 3 ship plan-first as opt-in (Devin planning mode, Base44 Discuss mode, Claude Code plan mode); 0 ship ask-first as the default for app creation. The strongest signal is **Base44's pricing of Discuss mode at 0.3 credits/message vs full credits in Default mode** [Angle B S12]: the vendor itself frames ask-first as a credit-saving pause, not a feature.

### Comparison matrix (7 axes, condensed)

| Tool | Intake | Clarification | Starting point | Generation unit | Context strategy | Error & iter loop | First output |
|---|---|---|---|---|---|---|---|
| **Bolt.new** [Angle B S1] | Free text | None (Enhance icon optional) | WebContainers from nothing | Whole files + shell + npm | Browser in-mem FS | Browser console + terminal | <30 s runnable |
| **v0** [Angle B S9] | Free text + UI components | `AskUserQuestions` when stuck | Next.js + shadcn `user_read_only_context/` | Project-block level (Write/Edit/Move) | **Per-project starter file contract** (model never regenerates) | Virtual `v0_debug_logs.log` | Live preview in Vercel Sandbox |
| **Lovable** [Angle B S7] | Free text | `CHECK UNDERSTANDING` rule (ask if unsure) | Locked React+Vite+Tailwind+Supabase | Search-replace preferred over write | Pre-injected "useful-context" | Console + network debug tools | Live preview iframe |
| **Replit Agent** [Angle B S8, S10] | Free text + output-type pill | None (Lite/Economy/Power mode pick) | Built-in template + Nix sandbox | 3 file-write primitives + shell + package-install | IDE-mediated (open file, lint, shell) | App testing + Code optimization toggles | Live preview + workflow run |
| **Base44** [Angle B S11, S12] | Free text + 5 intake paths | **Discuss mode (off by default)** | Flat-rate first build (1 credit) | Targeted partial edits + DB CRUD + URL fetch | Per-mode model; 7-message queue | Issues Found auto-fix (free credits) | Instant live preview + shareable URL |
| **Cursor** [Angle B S13] | Free text + IDE auto-context | None (agent runs to completion) | Your repo | Targeted edits via dedicated tools | `codebase_search` mandatory + `todo_write` reconcile + status updates | Lint loop, 3-retry cap | Diff in editor |
| **Windsurf / Devin Desktop / Cascade** [Angle B S6, S14] | Cmd+L + auto-context | Plan mode available, off by default | Your repo + `AGENTS.md` | Search/Analyze + 20 tool calls/prompt | Fast Context subagent + memories + @-mentions + worktrees | Lint auto-fix (free) + named checkpoints + Continue | In-IDE preview |
| **Devin (cloud)** [Angle B S15, S16] | Free text + Slack/Teams/PR/Linear/Jira | **Plan mode (most explicit ask-first)** | Your repo + Blueprint | Editor + Shell + Browser + Deploy | AGENTS.md + Skills + DeepWiki + subagents | Think tool + CI loop + video proof | VM-rendered video of running app |
| **a0.dev** [Angle B S17, S18] | Free text + URL + voice | **Hard reset at 80K chars / 15-20 msgs** | Mobile-first RN + Convex | Multi-primitive mobile | Explicit context-degradation rule | Copy-paste-the-error + OTA rollback | Native iOS/Android preview |
| **Rork** [Angle B S22] | Free text + example-prompt nudges | None | Mobile RN template | Mobile-native | Mobile-specific | Unknown | Native iOS app preview |
| **Claude Code** [Angle B S23] | Free text + `@`-mentions + images + pipe | **Plan mode + `AskUserQuestion` interview pattern** | Your repo + `/init` CLAUDE.md | Targeted edits + Bash + subagents | Hard context budget + auto-compaction + skills + hooks + MCP + verification | Stop hook + `/goal` + checkpoints | Diff or fresh scaffold |

### Dropped from the active matrix

| Tool | Reason | Status date |
|---|---|---|
| **Firebase Studio** | Sunsets 2027-03-22; new-workspace creation disabled 2026-06-22. Mechanism better covered by Cursor + Claude Code + a portable skeleton. | Verified 2026-08-13 on firebase.google.com/docs/studio (verbiage: "Firebase Studio is sunsetting on March 22, 2027. As of June 22, 2026, new workspace creation and user signup are disabled"; nav label now reads "Firebase Studio (deprecated)"). |
| **Create.xyz** | Docs site (`create.xyz/docs/intro`) returns HTTP 404. No current evidence of active development. | 2026-08-13 |
| **Databutton** | Docs unreachable. Last public activity ~2024. | 2026-08-13 |
| **Tempo / Tempo Labs** | Public landing page returns only a one-liner; docs sub-URLs unreachable. | 2026-08-13 |
| **Google AI Studio Build mode** | Inconclusive; primary docs require Google sign-in. Mark `[UNVERIFIED-CURRENCY]` and defer to hands-on verification. | 2026-08-13 |

### Renames to track

**Windsurf was acquired by Cognition (Devin's maker) in 2025 and rebranded to Devin Desktop.** Cascade is now one of two local agents inside Devin Desktop, not a standalone IDE [Angle B S6, S14]. Any reference in the dossier to "Windsurf" means Cascade-in-Devin-Desktop as of mid-2026.

### Leaked-prompt claims

Several mechanism claims in this section come from leaked system prompts on `x1xhlol/system-prompts-and-models-of-ai-tools` (Lovable, v0, Replit, Cursor, Devin: [Angle B S7, S9, S10, S13, S16]). These are snapshots, not live prompts. The mechanism claims are confirmed against official docs independently; the exact wording may differ from what production tools run today. Treat text quotes as `[UNVERIFIED-CURRENCY]` and prefer citing the mechanism, not the verbatim text.

---

## Part 6: what to copy

The standout is **v0's pre-injected starter-file contract** [Angle B S9]: the agent's prompt enumerates a fixed list of files (`app/layout.tsx`, `components/ui/*`, `hooks/use-mobile.tsx`, `hooks/use-toast.ts`, `lib/utils.ts`, `app/globals.css`, `next.config.mjs`, `package.json`, `tsconfig.json`, `tailwind.config.ts`) and explicitly says *"you never generate these unless explicitly requested"*. The LLM diffs over a known-stable base; tokens saved on boilerplate; skills/hooks reusable. **This is the cleanest template-as-truncation pattern in the industry** and maps 1:1 onto the proposed `_spine/` per tier. Give it prominence in the design.

| Mechanism | From | Why it works | Maps to |
|---|---|---|---|
| **Pre-injected starter-file contract** (model never regenerates the boilerplate) | v0 [Angle B S9] | Token saving on the always-stable files; agent context stays small | **tier0-minimal + tier1-standard**: both ship a fixed `_spine/` the agent must not regenerate |
| **Search-replace over write-file** as default edit primitive | Lovable [Angle B S7], Replit [Angle B S10], Base44 [Angle B S12] | Diff-not-file is the universal token saver on edit-after-build | **All tiers**: codify in the agent system prompt |
| **One bounded ask-first turn** (multi-choice) then generate-first | Claude Code `AskUserQuestion` [Angle B S23] + Base44 Discuss [Angle B S12] | Industry consensus: ask-once, build-rest | **Tier router**: the first dispatch step |
| **3-mode chat** (Default / Discuss / Edit) with `Cmd+.` toggle | Base44 [Angle B S12] | Lets the user pay less when they only want to think; lets the agent's plan exist without committing code | **tier1-standard intake**: discuss mode can use a cheaper model; edit mode can be a separate subagent |
| **Auto-fix on detected JS errors with no credit cost** | Base44 [Angle B S12] | Removes the user's "should I let the agent try again?" hesitation | **All tiers**: auto-fix loop is universal |
| **Versioned chat with per-prompt revert + checkpoint naming** | Base44 [Angle B S12], Cascade [Angle B S14] | User can experiment without fear | **tier1-standard**: required for safe iteration |
| **`AGENTS.md` / `CLAUDE.md` / `SKILL.md` as in-repo persistent context** | Devin [Angle B S15], Claude Code [Angle B S23], Cascade [Angle B S6, S14] | Portable, agent-agnostic, plain markdown | **All tiers**: primary cross-runtime context mechanism |
| **`todo_write` reconcile before every edit batch** | Cursor [Angle B S13] | Forces the agent to keep the plan in sync with the code | **All tiers**: encode as the universal planning primitive |
| **Status update near every tool batch** | Cursor [Angle B S13] | Keeps the user oriented without breaking flow | **All tiers**: codify in the agent's tone rules |
| **Lint auto-fix as a free credit** | Cascade [Angle B S14] | Treats "clean up my own mess" as a first-class primitive | **tier1-standard + tier2 specialists**: must be free |
| **Bounded retry loop with explicit continue-button** | Cursor 3 retries [Angle B S13], Cascade 20 tool calls/continue [Angle B S14] | Surfaces when the agent is stuck instead of silently looping | **All tiers**: mandatory continuation protocol |
| **Subagents for investigation** (don't pollute main context) | Claude Code [Angle B S23], Cascade Fast Context [Angle B S6, S14] | Token economy win | **tier1-standard + tier2 specialists**: required for non-trivial scopes |
| **Skills as in-repo reusable prompts** (`.claude/skills/SKILL.md`, `devin/skills/`) | Claude Code [Angle B S23], Devin [Angle B S15] | Same convention `agents_manager` already uses | **All tiers**: `SKILL.md` is the cross-runtime skill primitive |
| **Plan mode as a one-bounded-step then build** | Claude Code [Angle B S23], Devin [Angle B S16] | Industry consensus that plan-then-build beats ask-forever | **Tier router**: the *one* ask-first step |
| **Hybrid skeleton + commands for optional layers** (Blueprint = declarative environment) | Devin Blueprints [Angle B S15] | Closest competitor to the proposed "hybrid skeleton checked in + commands for optional layers" decision | **tier0-minimal + tier1-standard**: checked-in spine; commands for layers (shadcn add, supabase init, etc.) |
| **Hard context reset at a known character/message budget** | a0.dev 80K chars / 15-20 msgs [Angle B S17] | Forces the user to start a new chat rather than accumulate errors | **All tiers**: encode as the "when to /clear" rule |

---

## Part 7: what to avoid

| Anti-pattern | From | What it costs |
|---|---|---|
| Asking the user clarifying questions before every generation | Hypothetical; no surviving tool does this by default | Token burn + user friction; a0.dev's reset rule proves even generate-first sessions degrade |
| Locking to a single stack with no escape hatch | Lovable (React+Vite+Tailwind+Supabase only) [Angle B S7] | Users who want Svelte/Vue/Next/native-mobile leave; high churn risk |
| Forbidden to use env vars (no `VITE_*` support) | Lovable [Angle B S7] | Real apps need secrets; this is a self-imposed limitation that bites at production |
| "Do not add comments" as a global rule | Cursor [Angle B S13], Devin [Angle B S16] | Hurts portability into a foreign codebase; comments are useful for the *agent*, not just humans |
| Generate-then-rewrite whole files on every edit | Bolt.new [Angle B S1], Replit `<proposed_file_replace>` [Angle B S10] | Token-expensive on a growing codebase; search-replace is the universal fix |
| Rely on a single mega-system-prompt with no layered primitives | Devin's earlier prompt (now refactored into Skills + Playbooks + Knowledge) [Angle B S15, S16] | Doesn't scale; layering (Skills/Plugins/MCP) is what survived |
| Force multi-question surveys inside a build session | Hypothetical; no tool does this | Breaks generate-first momentum; field consensus is one bounded survey at project start |
| Pre-pick the AI model and lock it across all chat modes | Cursor (per-message), Base44 (Discuss mode forces its own model) [Angle B S12] | Forces the user to re-pick; or, conversely, lets one slow model dominate cheap side-channel work |
| Auto-fix everything silently without surfacing what changed | Universal auto-fix is good; silent auto-fix is bad | User loses the "did it actually work?" signal; auto-fix should always pair with a visible status update |
| One tool that "does everything" (deploy + monitor + chat + edit + IDE) | Cursor's vertical integration; Lovable's vertical integration | Lock-in for the user; portability loss for the agent template |
| Banned frameworks in the system prompt | Lovable [Angle B S7] | Punts on the hard problem of routing to the right stack |
| Ship docs that gate every page behind auth | Google AI Studio Build mode [Angle B S5] | Makes the product un-verifiable by independent research |
| Long onboarding that asks for an account before the first preview | Base44 [Angle B S11] | Reduces the "first 30 seconds" win; Bolt.new's zero-friction flow is the better pattern |
| Magic model router with no user override | Base44 Automatic mode [Angle B S12] | Users with a specific cost/quality tradeoff can't tune it |
| Bundling tier, credits, and "first build cost" into one opaque number | Base44 1-credit first build + variable per-message [Angle B S11, S12] | Hard to reason about; portable templates should be token-cost-transparent |

---

## Part 8: license and maintenance traps

### License traps

| Project | Trap | Verdict |
|---|---|---|
| **bolt.diy** | MIT source BUT **WebContainers API requires a commercial license for production for-profit use** per the README. Verbatim: "bolt.diy source code is distributed as MIT, but it uses WebContainers API that requires licensing for production usage in a commercial, for-profit setting. (Prototypes or POCs do not require a commercial license.) If you're using the API to meet the needs of your customers, prospective customers, and/or employees, you need a license." [Angle A S28] | Safe to INSPIRE the patterns; unsafe to vendor the runtime. Do not pull bolt.diy as a runtime dependency. |
| **Plasmo** | Historically MIT; 2025 reports of BSL-style source-available on parts of dev tooling [UNVERIFIED: verify at fork time] | AVOID Plasmo as a hardcoded scaffolder; WXT is the safer MIT alternative. |
| **Theatre.js** | Studio is AGPL-3.0; core is MIT. Already flagged by sibling angle F. | Do not import Theatre.js into any checked-in skeleton. AGPL by default is a hard AVOID; explicit whitelist only. |
| **Makerkit / Supastarter / ShipFast** | Commercial products | AVOID as wholesale substitutes; can reference individual patterns but not vendor the whole thing. |
| **AGPL risk (general)** | Any library copylefted via AGPL is dangerous in a portable template (downstream apps inherit the AGPL) | AVOID AGPL by default; explicit whitelist only. |

### Maintenance traps

The signal is **last commit within 30 days**, not stars. Star counts are misleading on their own.

| Project | Stars | Last commit | Verdict |
|---|---:|---|---|
| **gpt-engineer** | ~75k [UNVERIFIED] | ~6 months (maintenance-only) | INSPIRE the clarify mechanic; do not depend. |
| **Pythagora / GPT-Pilot** | ~33k [UNVERIFIED] | ~3 months (slowing since 2025-Q4) | INSPIRE; do not depend. |
| **Archon** | 23.2k | within 24h | Healthier than gpt-engineer despite fewer stars. INSPIRE the shape. |
| **spec-kit** | 126.8k | within 24h | Active; adopt its command vocabulary. |
| **Anthropic Skills** | ~168.7k | active | Active; ADOPT. |
| **bolt.diy** | 19.7k | within 24h | Active but lens-trapped (see license row). |
| **OpenHands** | 83.9k | within 24h | Active; INSPIRE the convention. |
| **Aider** | 48.2k | within 24h | Active; INSPIRE the patterns. |

The worst-case combination: high stars + slow commits + permissive license hiding a commercial rider. **bolt.diy** is the canonical example. Whenever a project's README mentions "for production use, contact sales" or "requires a commercial license", stop.

Recommendation at plan time: every dependency in every `skeleton/package.json` ships with a license line in `templates/<name>/LICENSES.md`; CI enforces it. A weekly `scripts/verify-stack-claims.ts` re-verifies license + version + non-interactive flag status across the family.

---

## Part 9: the whitespace

What none of the above tools ship, and what a portable tiered template family gets that they do not.

| Whitespace | Existing state | What a portable tiered template family gets |
|---|---|---|
| **Tiered family as a first-class primitive** | Every closed tool ships *one* opinionated starter (or zero, in the diff-agent case). v0 has a per-component starter library; Base44 has templates + clones; Replit has templates; Firebase Studio had templates. | A portable `tier-router.md` plus 3 directories of agent-agnostic templates, indexed by app kind, with a deterministic CLI for selection. tier0-minimal, tier1-standard, tier2-`<kind>` per part. |
| **Portable, agent-agnostic, cross-runtime prompt protocol** | Every closed tool's intake mechanism is its own. Lovable's chat box is Lovable-specific; v0's `AskUserQuestions` is Vercel-specific; Devin's plan mode is a Cognition-specific mode toggle. No shared, portable protocol that runs identically in Claude Code, Cursor, OpenCode, and a plain terminal. | A `tier-protocol.md` (portable, agent-agnostic intake → clarify → scaffold → iterate) that imports `AGENTS.md` / `CLAUDE.md` style and works under any agent that reads markdown. |
| **Bounded ask-first as a one-shot artifact** | Every tool either omits ask-first entirely or treats plan-first as a mode toggle. None has the intake survey itself as a first-class artifact the user can edit and version. The closest analogue is Base44's Discuss mode (toggleable, model-cheaper, no app changes). | An `intake-survey.md` artifact per tier, with one adaptive multi-choice question set per kind of app, that the agent reads before generating and does not re-read during the build. |
| **App-kind selection as a routing primitive** | a0.dev, Rork, and (effectively) Base44 each own *one* kind (mobile, mobile, web-with-backend). None offers cross-kind routing as a first-class operation. Even the IDE-based tools (Cursor, Cascade, Claude Code) defer to the user to pick the kind. | A `kind-router.md` that ingests the one-line idea and outputs a `(tier, kind)` tuple deterministically, with a known-confidence threshold; below the threshold, the agent asks the user to pick between the top-N kinds. |
| **Differentiation vs the strongest peer (Base44)** | Base44 is locked to its web IDE; ships one starter shape; hides cost behind credits; ships no kind router; no audit-grade provenance. | Portable across agents (Claude Code, Cursor, OpenCode, Kilo); tiered family × multiple kinds; transparent token cost; audit-grade provenance with Tier 4 citation discipline; structured app-kind selection. |

The convergence is the strongest signal in the source corpus: AGENTS.md + Anthropic Skills + the cinematic-landing shape is independently validated by sibling angle F's audit, by github/spec-kit's near-identical `.specify/` layout at 126.8k stars, by OpenHands' `.agents/skills/` + `AGENTS.md` convention at 83.9k stars, and by Archon's workflow-as-folder at 23.2k stars. Four major OSS projects, four different teams, the same primitive shape. The template family is not invention; it is the assembly of an already-proven convention.

---

## Sources

Renumbered and deduplicated across both source angles. Access date for all: 2026-08-13. Verified = URL fetched and the load-bearing claim confirmed against the page text on 2026-08-13. UNVERIFIED = the source row is cited from the angle dossier but the angle author did not fetch the canonical page; treat the claim as directionally correct, not as current fact. `[UNVERIFIED-CURRENCY]` = leaked system prompt snapshot; the mechanism is confirmed against the vendor's own docs separately, but the verbatim text may differ from the production prompt.

| # | Source | Type | Used for | Verification |
|---|---|---|---|---|
| **S1** | AGENTS.md standard, agents.md homepage. https://agents.md/ | Web | Cross-runtime standing-instructions file; 60k+ projects; agent support list. Adoption count claim. | **Verified 2026-08-13**: homepage states "used by over 60k open-source projects" and "View 60k+ examples on GitHub" verbatim. |
| **S2** | Anthropic Skills (SKILL.md), canonical repo. https://github.com/anthropics/skills | GitHub | Per-skill folder with three progressive-disclosure levels; Apache-2.0 spec. | Directionally verified (repo reachable). |
| **S3** | CLAUDE.md convention. https://docs.claude.com/en/docs/claude-code/llms-txt | Web | Claude Code loads `CLAUDE.md` at session start; same shape as AGENTS.md. | [UNVERIFIED: exact URL inherited from angle A]. |
| **S4** | Cursor Rules / `.cursorrules`. https://docs.cursor.com/context/rules | Web | Cursor reads `.cursorrules` at session start; also reads AGENTS.md natively in 2026. | [UNVERIFIED: exact URL inherited from angle A]. |
| **S5** | Firebase Studio overview page. https://firebase.google.com/docs/studio | Web | Sunset 2027-03-22; new-workspace creation disabled 2026-06-22. Mechanism: Code OSS + GCP VM + Nix. | **Verified 2026-08-13**: page states "Firebase Studio is sunsetting on March 22, 2027. As of June 22, 2026, new workspace creation and user signup are disabled." Nav label now reads "Firebase Studio (deprecated)". |
| **S6** | Devin Desktop / Cascade docs (llms.txt). https://docs.devin.ai/llms.txt | Web | Windsurf → Devin Desktop rebrand; Cascade as Devin Desktop agent mode; Fast Context subagent; DeepWiki; Arena Mode; Worktrees; AGENTS.md support. | Verified. |
| **S7** | Lovable Agent Prompt (leaked). https://raw.githubusercontent.com/x1xhlol/system-prompts-and-models-of-ai-tools/main/Lovable/Agent%20Prompt.txt | Leaked prompt | React+Vite+Tailwind+TS stack lock; Supabase backend only; "DEFAULT TO DISCUSSION MODE"; "CHECK UNDERSTANDING" ask rule; search-replace default. | **[UNVERIFIED-CURRENCY]**: leaked prompt snapshot; mechanism confirmed against official Lovable docs separately. |
| **S8** | Replit Agent docs. https://docs.replit.com/replitai/agent | Web | Lite/Economy/Power agent modes; App testing + Code optimization + Turbo toggles; output-type pill. | Verified. |
| **S9** | v0 Prompt (leaked). https://raw.githubusercontent.com/x1xhlol/system-prompts-and-models-of-ai-tools/main/v0%20Prompts%20and%20Tools/Prompt.txt | Leaked prompt | `AskUserQuestions` gated; Next.js App Router default; `user_read_only_context` component library; starter file contract ("you never generate these unless explicitly requested"); Supabase + Vercel Blob + AI SDK + Vercel AI Gateway. | **[UNVERIFIED-CURRENCY]**: leaked prompt dated 5/10/2026; mechanism confirmed against Vercel docs separately. |
| **S10** | Replit Prompt (leaked). https://raw.githubusercontent.com/x1xhlol/system-prompts-and-models-of-ai-tools/main/Replit/Prompt.txt | Leaked prompt | `<proposed_file_replace_substring>` (search-replace); `<proposed_file_replace>` (whole-file); `<proposed_file_insert>`; `<proposed_shell_command>`; `<proposed_package_install>`; `<proposed_workflow_configuration>` with `set_run_button`. | **[UNVERIFIED-CURRENCY]**. |
| **S11** | Base44 Quick-start guide. https://docs.base44.com/Getting-Started/Quick-start-guide | Web | 5 intake paths; 1-credit first build; preview iframe; instant live preview; templates gallery; Clone App. | Verified. |
| **S12** | Base44 AI chat modes. https://docs.base44.com/Building-your-app/AI-chat-modes | Web | 3 chat modes (Default / Discuss / Edit); Cmd+. / Ctrl+. toggle; Discuss at 0.3 credits/message; fixed Discuss model; 7-message queue; Issues Found auto-fix (free credits); Version History. | Verified. |
| **S13** | Cursor Agent Prompt 2025-09-03 (leaked). https://raw.githubusercontent.com/x1xhlol/system-prompts-and-models-of-ai-tools/main/Cursor%20Prompts/Agent%20Prompt%202025-09-03.txt | Leaked prompt | Auto-context dump; "keep going until the user's query is completely resolved"; `codebase_search` mandatory + multiple-query passes; `todo_write` reconcile; status update near every tool batch; 3-5 parallel tool calls; 3-retry linter cap. | **[UNVERIFIED-CURRENCY]**. |
| **S14** | Cascade Overview (now Devin Desktop). https://docs.devin.ai/desktop/cascade/cascade.md | Web | Code / Chat modes; background planning agent; 20-tool-call cap with Continue; queued messages; AGENTS.md; Memories & Rules; @-mention previous conversations; Fast Context subagent; Worktrees; Lint auto-fix (free); named checkpoints. | Verified. |
| **S15** | Devin Docs llms.txt. https://docs.devin.ai/llms.txt | Web | Devin cloud sessions (Slack/Teams/GitHub PRs/GitLab/Bitbucket/Linear/Jira); Blueprints; AGENTS.md; Knowledge Onboarding; Skills (SKILL.md); Stacked PRs; DeepWiki; Ask Devin; Data Analyst Agent; Security Swarm; Computer Use; Testing & Video Recordings. | Verified. |
| **S16** | Devin AI Prompt (leaked). https://raw.githubusercontent.com/x1xhlol/system-prompts-and-models-of-ai-tools/main/Devin%20AI/Prompt.txt | Leaked prompt | Planning vs standard mode toggle; `<suggest_plan/>` command; "If you cannot find some information, believe the user's taks is not clearly defined, or are missing crucial context or credentials you should ask the user for help. Don't be shy."; Think tool; `<report_environment_issue>`; "When struggling to pass tests, never modify the tests themselves". | **[UNVERIFIED-CURRENCY]**. |
| **S17** | a0.dev Three Principles. https://docs.a0.dev/agent-guide/three-principles.md | Web | Be Very Specific; Show It The Error; Make A New Chat (15-20 messages / 80,000 chars hard reset rule). | Verified. |
| **S18** | a0.dev Docs llms.txt. https://docs.a0.dev/llms.txt | Web | Mobile-first (React Native + Convex); iOS/Android publishing; OTA Updates; Push Notifications; Payment Setup; Native Build Testing; Web Preview Testing. | Verified. |
| **S19** | Create.xyz docs (404). https://create.xyz/docs/intro | Web (dead) | Docs site returns HTTP 404; no reachable mechanism documentation. | Verified 2026-08-13: 404. |
| **S20** | Databutton docs (transport error). https://docs.databutton.com/docs/getting-started | Web (dead) | Transport error on every attempt. | Verified 2026-08-13: unreachable. |
| **S21** | Tempo / Tempo Labs. https://tempo.build/, https://tempolabs.io/ | Web (dead) | Landing page returns only the tagline "Tempo: AI Software Factory for Product Teams"; docs unreachable. | Verified 2026-08-13: dead. |
| **S22** | Rork.com homepage. https://rork.com/ | Web | Mobile-first (iOS focus); Rork Max native iOS app; "$240K ARR in 6 months" case study; example prompts. | Verified. |
| **S23** | Claude Code Best Practices. https://www.anthropic.com/engineering/claude-code-best-practices | Web | Plan mode (Shift+Tab, `claude --permission-mode plan`); Explore → Plan → Implement → Commit; `AskUserQuestion` interview pattern; `/init` CLAUDE.md; CLAUDE.md / SKILL.md / subagents / hooks / MCP / plugins; auto-compaction; `/clear` between unrelated tasks; subagents for investigation; verification before declaring done; Stop hook; Writer/Reviewer pattern. | Verified. |
| **S24** | `agents_manager/upstream-contrib/PROPOSED_PATCH_v0.5.x_2026-07-01_cinematic-landing-template.md` | Local path | The cinematic-landing convention; PROPOSED, not merged. Per angle F, generalises to app templates with three adjustments. | Local. |
| **S25** | GitHub spec-kit. https://github.com/github/spec-kit | GitHub | 126.8k stars; MIT; very active; `.specify/memory/` + `.specify/templates/` + `.specify/extensions/` + `.specify/presets/` + `bundles/`; slash commands `/speckit.constitution` … `/speckit.clarify`; `AGENTS.md` at root; 30+ AI coding agent integrations. | Verified. |
| **S26** | Archon (coleam00/Archon). https://github.com/coleam00/Archon | GitHub | 23.2k stars; MIT; very active; `.archon/workflows/` + `AGENTS.md` + `CLAUDE.md`; 19 default workflows including `archon-piv-loop` and `archon-idea-to-pr`; locks to Claude Code via `CLAUDE_BIN_PATH`. | Verified. |
| **S27** | bolt.diy (stackblitz-labs/bolt.diy). https://github.com/stackblitz-labs/bolt.diy | GitHub | 19.7k stars; MIT source but **WebContainers commercial license** for production for-profit use; 1,629 commits; very active; 19+ LLM providers via Vercel AI SDK. | Verified. |
| **S28** | Aider (Aider-AI/aider). https://github.com/Aider-AI/aider | GitHub | 48.2k stars; Apache-2.0; 13,138 commits; very active; reads AGENTS.md via `.aider.conf.yml`; repo-map; auto-commit. | Verified. |
| **S29** | OpenHands (All-Hands-AI/OpenHands). https://github.com/All-Hands-AI/OpenHands | GitHub | 83.9k stars; MIT; 8,017 commits; very active; ships `AGENTS.md` + `.agents/skills/`; Cloud Agents SaaS. | Verified. |
| **S30** | BMAD-Method. https://github.com/bmad-code-org/BMAD-METHOD | GitHub | ~25k stars [UNVERIFIED]; MIT; `.bmad-core/` (memory + agents + workflows) + `templates/`; per-agent personas as markdown. | [UNVERIFIED]. |
| **S31** | agent-os. https://github.com/buildermethods/agent-os | GitHub | ~2k stars [UNVERIFIED]; MIT; `.agent-os/` with `spec.md`, `plan.md`, `tasks.md`. | [UNVERIFIED]. |
| **S32** | claude-task-master. https://github.com/eyaltoledano/claude-task-master | GitHub | ~7k stars [UNVERIFIED]; MIT; tasks-as-data. | [UNVERIFIED]. |
| **S33** | Makerkit. https://github.com/makerkit/makerkit | GitHub | ~5k stars; COMMERCIAL; Next.js SaaS starter; reference for tier2-saas-bundle only. | Verified (commercial status). |
| **S34** | Supastarter. https://github.com/supastarter/supastarter | GitHub | ~3k stars; COMMERCIAL; Nuxt SaaS starter. | Verified. |
| **S35** | ShipFast (marc-louis/shipfast). https://github.com/marc-louis/shipfast | GitHub | ~6k stars; COMMERCIAL; Next.js SaaS starter. | Verified. |
| **S36** | Next.js SaaS Starter (ixartz). https://github.com/ixartz/Next-js-Saas-Starter | GitHub | ~6k stars [UNVERIFIED]; MIT; Next.js 14/16 + Tailwind + NextAuth + Prisma + Stripe. | [UNVERIFIED]. |
| **S37** | github/search for AGENTS.md. https://github.com/search?q=path%3AAGENTS.md+NOT+is%3Afork+NOT+is%3Aarchived&type=code | GitHub | Independent adoption count: ~60k+ projects. | Inherited from agents.md site (S1). |
| **S38** | Angular commits / scaffolders cited by angle A: create-vite (https://github.com/vitejs/vite), create-next-app (https://github.com/vercel/next.js), create-expo-app (https://github.com/expo/expo), create-t3-app (https://github.com/t3-oss/create-t3-app), shadcn/ui (https://github.com/shadcn-ui/ui), Better-T-Stack (https://github.com/AmanVarshney01/create-better-t-stack), Wasp (https://github.com/wasp-lang/wasp), RedwoodJS (https://github.com/redwoodjs/redwood), Refine (https://github.com/refinedev/refine), TanStack Router (https://github.com/TanStack/router), WXT (https://github.com/wxt-dev/wxt), Medusa (https://github.com/medusajs/medusa), Astro (https://github.com/withastro/astro), Qwik (https://github.com/QwikDev/qwik). | GitHub | Scaffolder licenses, stars, last commits, non-interactive flag documentation. | Directionally verified (repos reachable). |
| **S39** | Sibling angle F (audit of existing template). `share/notes/01_research_T-2026-08-13-003_angle-f-audit.md` | Local | Cinematic-landing shape generalises to app templates with three adjustments (multi-file Vite skeleton; richer decision trees; architecture-shaped memory files). | Local. |

### Caveats carried forward

- Several scaffolder verdicts (USE-AS-DEPENDENCY for `create-vite`, `create-next-app`, `create-expo-app`, `shadcn add`, WXT, Medusa, Astro, TanStack Start; AVOID for `create-t3-app`, `Better-T-Stack`, `Wasp`, `RedwoodJS`, `Refine`, `create-qwik`) **rest on README claims, not empirical `< /dev/null` runtime tests**. The planner should run each `init.sh` in CI under `< /dev/null` before locking the tier routing.
- Star counts marked [UNVERIFIED] (Plandex, Goose, Cline, Roo Code, Dyad, Onlook, srcbook, Next.js SaaS Starter, agent-os, claude-task-master, BMAD-Method) are kept as quoted in the source dossier; the agent should not launder them into facts. The single most reliable signal is last-commit recency, not stars.
- The numbers on the AGENTS.md adoption count and the Firebase Studio sunset date are **both verified live against the canonical sources on 2026-08-13** (agents.md homepage and firebase.google.com/docs/studio respectively). See S1 and S5.
