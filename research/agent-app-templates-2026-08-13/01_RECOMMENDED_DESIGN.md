# 01_RECOMMENDED_DESIGN - the answer

**Task:** T-2026-08-13-003
**Date:** 2026-08-13
**Role:** architecture specification, not implementation. This is what a builder should hand to a coder; it is not a phased plan.
**Status:** research deliverable. Pending user confirmation on the seven items in `07_OPEN_QUESTIONS.md`.

---

## The shape in one diagram

The whole template family, as a folder layout. A builder can copy this and use it as the target structure.

```
templates/                                    # the family root
├── AGENTS.md                                 # cross-runtime standing instructions (~500 tokens, always read)
├── CLAUDE.md                                 # 1-line symlink / pointer to AGENTS.md, optional
├── README.md                                 # human-readable entry point
├── registry.json                             # discoverable index: { tiers: [...], kinds: [...], routing: {...} }
│
├── tier0-minimal/                            # Tier 0 - one-page app, no DB, no auth
│   ├── SKILL.md                              # Level 1 metadata + Level 2 instructions (~3,000 tokens)
│   ├── memory/
│   │   ├── index.md                          # what this tier is for
│   │   ├── dos-and-donts.md                  # the rule list, distilled
│   │   └── reference-projects.md             # one canonical example, no copy-paste of code
│   ├── skeleton/                             # ~6 files: index.html, src/main.tsx, vite.config.ts, package.json, tsconfig.json, src/index.css
│   ├── prompts/
│   │   └── intake-minimal.md                 # the 3-axis minimal intake, batched
│   └── decisions/
│       └── decision-log.md                   # append-only
│
├── tier1-standard/                           # Tier 1 - multi-page, one backend, one external service
│   ├── SKILL.md
│   ├── memory/
│   ├── skeleton/                             # ~10 files / ~2,500 LOC: Next.js 16 + Tailwind v4 + Drizzle + Vitest + shadcn add entrypoint + auth wiring shell + tier.config.json
│   ├── prompts/
│   └── decisions/
│       └── decision-log.md
│
├── tier2-ai-chat/                            # Tier 2 - AI SDK wiring, streaming, conversation schema
│   ├── SKILL.md
│   ├── memory/
│   ├── skeleton/                             # tier1 + ai-sdk wiring + conversation routes + markdown pipeline
│   ├── prompts/
│   └── decisions/
│       └── decision-log.md
│
├── tier2-mobile/                             # Tier 2 - Expo SDK 57 + EAS + Clerk Expo
├── tier2-saas-bundle/                        # Tier 1 + auth layer + Stripe Billing layer (NOT a separate tier1)
├── tier2-storefront/                         # Tier 1 + commerce backend (Path A Shopify headless OR Path B Medusa)
│
├── tier2-tooling/                            # Tier 2 - bot / extension / CLI family (Option C, user to confirm)
│   ├── SKILL.md
│   ├── _spine/                               # shared non-UI base: commander config, env loader, logger, error envelope
│   ├── extension/                            # WXT shim, has UI (in family)
│   ├── bot/                                  # discord.js shim, non-UI (UI-only tension unresolved)
│   └── cli/                                  # commander + tsup shim, non-UI (UI-only tension unresolved)
│
└── cinematic-landing/                        # existing shipped template; promote to family
    ├── SKILL.md
    ├── memory/
    ├── skeleton/
    ├── prompts/
    └── decisions/
```

The skeleton folders are the load-bearing artifact. They are not markdown. They are runnable `npm install && npm run dev` projects, version-pinned, with `package.json` engines and a frozen lockfile committed.

---

## The end-to-end flow

Numbered, from the user's one-line idea to a running app. Each step says what the agent reads, what it writes, what it runs, and roughly what it costs. All USD is at Claude Sonnet 4.6 pricing; cached reads at 0.1× input.

| # | Step | What the agent reads | What the agent writes | What it runs | Approx USD (cached) |
|---|---|---|---|---|---:|
| 1 | User chat: "build me a thing for tracking X" | - | - | - | $0.00 |
| 2 | Agent reads `AGENTS.md` (family root) | ~500 tokens | - | `cat AGENTS.md` | $0.0002 |
| 3 | Agent runs the intake (chapter 04's protocol: 3 to 6 fixed axes batched in one message, 0 to 4 adaptive, hard cap 10) | the question-bank markdown | one batched user prompt | one round trip | $0.0007 |
| 4 | Agent writes `SPEC.md` from the restate-and-confirm artifact | the user's one-word-per-axis reply | `SPEC.md` (structured spec block) | - | $0.0009 |
| 5 | User replies "go" or "change X to Y" | - | - | - | $0.0009 |
| 6 | Agent reads `tier<N>-<kind>/SKILL.md` (Level 2 instructions for the chosen tier) | ~3,000 tokens | - | `cat SKILL.md` | $0.0018 |
| 7 | Agent copies the spine | - | - | `cp -r skeleton/ ./` | $0.0018 |
| 8 | Agent installs dependencies | `package.json` | - | `npm install` | $0.0050 |
| 9 | Agent runs the deterministic layer commands the spec asked for (auth, payments, charts, mobile shell, realtime, UI library) | SKILL.md appendices | updated `package.json` + new files | `npx shadcn add ...`, `npx @better-auth/cli init`, etc. | $0.0200 |
| 10 | Agent edits 15 to 20 files for the delta (data model, theme, name, route map, one CRUD page) | per-edit `cat file.ts` (uncached) | surgical `edit` calls | `edit`, `cat`, `edit` | $0.7900 |
| 11 | Agent verifies (definition of done, per tier) | the tier's SKILL.md `## Done` section | test files if missing | `tsc --noEmit`, `npm run build`, `npm test` (smoke test) | $0.8600 |
| 12 | Agent writes a 200-line README | the SKILL.md, the spec | `README.md` | - | $0.8900 |
| 13 | Agent reports back | - | - | - | $0.8900 |

Total cached USD for a single Tier 1 build: **~$0.89** (matches `03_TOKEN_ECONOMY.md` §4.2 cell arithmetic). Total wall-clock: 3 to 6 minutes on a working agent. Total user-visible cost: zero - the agent eats it.

The same build on the current `resources/general-app-template` takes 8 to 15 minutes and costs ~$2.74 cached. **Wall-clock reduction ~2× to 3×, USD reduction ~2.7×.** Mechanism is the combination of skeleton-first (cuts output) plus caching on the spine (amortizes input). Neither alone gets you there; the dossier math is in `03_TOKEN_ECONOMY.md` Part 1.3.

---

## Decision 1: the file-format convention

Three pieces, adopted together. This is the highest-value finding in the source corpus.

| Layer | Convention | Role |
|---|---|---|
| Family root | **AGENTS.md** (open standard, Linux Foundation stewarded via the Agentic AI Foundation) | Cross-runtime standing instructions. Plain markdown. Agents that read markdown read this. |
| Per tier | **Anthropic Skills `SKILL.md`** (Apache-2.0 spec, open since 2025-12-18) | Progressive-disclosure invocation. Level 1 metadata (~100 tokens) always loaded. Level 2 instructions (<5,000 tokens) loaded when triggered. Level 3+ bundled files cost zero tokens until accessed. |
| Per tier | **In-repo `agents_manager/templates/cinematic-landing/` folder shape** (memory/ + skeleton/ + prompts/ + decisions/ + 00-readme-first.md) | The Skills folder spec does not prescribe an internal layout. The cinematic-landing shape fills that gap. |

**Why this trio.** AGENTS.md is the only cross-runtime standing-instructions convention that works in all five target runtimes (Kilo, Claude Code, Cursor, OpenCode, Codex) without per-runtime adapters. Anthropic Skills is the only convention with first-class progressive disclosure, which maps to prompt-cache economics (Level 1 metadata is the always-cached prefix; Level 3 scripts run in a sub-agent, only their output enters context). The cinematic-landing shape is the in-repo precedent: it has been validated once by the `agents_manager` team and audited again by sibling Angle F, which confirmed it generalises to app templates with three adjustments (multi-file Vite skeleton, richer decision trees, architecture-shaped memory files).

**Convergence.** Two independent angles (Angle A OSS prior art, Angle F audit) converged on this trio. github/spec-kit (126.8k stars) ships a near-identical `.specify/` shape. OpenHands (83.9k stars) ships `AGENTS.md` + `.agents/skills/`. Archon (23.2k stars) ships `.archon/workflows/` + `AGENTS.md` + `CLAUDE.md`. Four major OSS projects, four different teams, the same primitive shape. We are assembling a proven convention, not inventing one.

---

## Decision 2: router-first reading

The current `resources/general-app-template` instructs the agent to read six files totalling ~12,560 tokens before writing a line of code (`03_TOKEN_ECONOMY.md` A3, A4). The recommended design replaces this with a single always-loaded `AGENTS.md` of ~500 tokens that names every tier and routes to per-tier `SKILL.md` files of ~3,000 tokens each.

| Layer | Current template | Recommended design | Token cost on first call |
|---|---|---|---:|
| Family root | `INDEX.md` (~530 tokens) plus pointer text | `AGENTS.md` (~500 tokens) | ~500 (cache read) |
| Per-tier | agent greps prose for tier cues | `tier<N>-<kind>/SKILL.md` (~3,000 tokens, loaded on demand) | ~3,000 (cache read, single tier) |
| Always-on rule set | `RULES_GUIDE.md` (~1,300 tokens, mixed in) | distilled `memory/dos-and-donts.md` (~600 tokens) plus SKILL.md embed | ~600 (cache read) |
| Reference material | `REFERENCES.md` (~3,400 tokens), read whole or skipped | per-tier `memory/reference-projects.md` (≤2,000 tokens, Level 3, zero tokens until read) | $0 until accessed |
| **First-call input total** | **~12,560 tokens** (six files in reading order) | **~3,500 tokens** (AGENTS.md + one SKILL.md + dos-and-donts) | **~9,000 tokens saved per build** |

The cache key is the stable prefix: tools + system prompt + AGENTS.md + the chosen SKILL.md body. Per-app configuration (app name, theme, route map) lives after the cache breakpoint. Per-request user message (the chat input) lives at the end. This layout matches the Anthropic prompt-caching page's "stable prefix first, volatile content last" recommendation; see `03` §3.3 for the cell arithmetic.

The agent must read `AGENTS.md` and exactly one `SKILL.md` per build. Reading more is wasteful; reading fewer breaks the deterministic routing. The `AGENTS.md` ends with a one-line decision table that maps the kind axis answer (1 to 9) directly to the `tier<N>-<kind>/SKILL.md` path, no inference required.

---

## Decision 3: what is checked in versus what is a command

The hybrid shape was validated by Angle D; the split below is the concrete partition.

### Checked into the spine (~10 files / ~2,500 LOC per `03` §5)

Items with stable contract across many apps, low per-app churn, and high token cost when regenerated:

- `package.json` (engines, scripts, base deps; app-name parameterised via `tier.config.json`).
- `vite.config.ts`, `tsconfig.json`, `vitest.config.ts` (config shells; app-config overrides via `tier.config.json`).
- `src/main.tsx` + `src/App.tsx` (provider nesting, lazy loading, routing shell).
- `src/index.css` (theme tokens via Tailwind v4 CSS-first `@theme` block).
- `src/lib/utils.ts` (`cn()` helper, base `api` object re-export).
- `src/db/DatabaseProvider.tsx` (provider stub; storage-adapter pattern; concrete impl via the data-layer command).
- `src/lib/audit.ts` (the `logCreate / logUpdate / logDelete` pattern from the existing template's survivors; generic, not WatermelonDB-coupled).
- `tests/smoke.test.ts` (one smoke test per tier; runs in CI; preconfigured in `vitest.config.ts`).
- `tier.config.json` (locale, dir, font, optional flags).
- `SPEC.md` (the restate-and-confirm artifact; written before any code, editable mid-build).

### Delivered as commands (optional layers)

Items that are inherently app-specific in configuration, depend on credentials, or change frequently across apps:

| Layer | Command | Per-build token saving | Note |
|---|---|---|---|
| Auth | `npx @better-auth/cli init` OR `npx clerk init` | ~8,000 to 15,000 output tokens | Vendor choice is part of the spec |
| Payments | `npx stripe init` + webhook scaffolding | ~5,000 to 10,000 | Stripe Billing is the default; Paddle / Lemon Squeezy as opt-in |
| Charts | `npx shadcn add chart` | ~2,000 to 4,000 | shadcn-native; no library to pin |
| Mobile shell | `npx create-expo-app@latest` OR `npx cap init` | ~10,000 to 20,000 | Tier2-mobile already wraps Expo; tier1 stays web-only |
| Realtime | `npx supabase init` (realtime + Postgres) OR `npx liveblocks init` | ~1,500 to 3,000 | Only when the spec surfaces "live" / "real-time" / "collaborative" |
| UI components | `npx shadcn add button card input modal toast ...` | ~5,000 to 8,000 | The full library, behind a single line in `package.json` scripts |
| Database | `npx drizzle-kit init` OR `npx prisma init` | ~3,000 to 6,000 | The data-layer command matches the AXIS 3 answer |
| Locale | `npx next-intl init` OR equivalent | ~2,000 to 4,000 | AXIS 5 answer; Arabic / RTL only fires when selected |

**Rule.** If a layer's configuration depends on user credentials, secrets, or app-specific identity, it is a command. If a layer's contract is stable across every app built from this tier, it is checked in. The UI component library is the canonical case: every app needs buttons, inputs, modals, toasts. But the *specific* components and tokens depend on the design system, so the spine ships the contract (`src/lib/ui.ts` re-exporting from the shadcn CLI) and the components themselves come down per-build via `npx shadcn add ...`.

**The interactive-TTY trap carries forward.** A scaffolder that prompts the agent with a TTY question is unusable from a non-interactive shell. Every hardcoded command above must carry its non-interactive flags. **These flags remain untested by this dispatch** - flagged in `05` Part 8 ("Caveats carried forward"). The planning pass should run each scaffolder under `< /dev/null` in CI before locking the tier routing.

---

## Decision 4: the tier and kind map

8 entries total. The matrix is in `02_STACK_MATRIX.md` Master Matrix; this section is the load-bearing subset.

| Slot | What it is | Stack core (verified 2026-08-13) | Size |
|---|---|---|---:|
| **Tier 0 minimal** | One-page app, no DB, no auth | Vite + React 19 + TypeScript strict + Tailwind v4 | ~6 files |
| **Tier 1 standard** | Multi-page, one backend, one external service | Next.js 16 + Tailwind v4 + Drizzle or Prisma + Vitest + shadcn add + auth shell | ~10 files / ~2,500 LOC |
| **tier2-ai-chat** | Streaming chat + multi-turn persistence + per-user history | Next.js 16 + Vercel AI SDK 7 + Drizzle + Clerk + react-markdown | 15 to 25 files / 1.5 to 3k LOC |
| **tier2-mobile** | Touch-first, runs on a phone | Expo SDK 57 + Expo Router + EAS Build + Clerk Expo + Supabase | 30 to 50 files / 3 to 5k LOC |
| **tier2-saas-bundle** | tier1 + auth layer + Stripe Billing layer (NOT a separate tier1) | Next.js 16 + Clerk + Stripe + Drizzle + Resend | 40 to 60 files / 4 to 8k LOC |
| **tier2-storefront** | Catalog, cart, checkout, tax, email | Path A Shopify headless + Stripe, OR Path B Medusa + Next.js + Stripe | Path A: 25 to 40 files. Path B: 60 to 100 files |
| **tier2-tooling** | Browser extension (in family) + bot (UI-only tension, user to confirm) + CLI (UI-only tension, user to confirm). Option C: shared `_spine/` plus three shims | WXT (extension) / discord.js (bot) / commander + tsup (cli) | shared spine 5 files + 4 to 12 per shim |
| **cinematic-landing** | The existing shipped template | unchanged | existing |

Three user-unlisted kinds that live as **Tier 1 + a layer**, not their own tier2:

- **Realtime / collaborative** - chat rooms, multiplayer editors, live dashboards. Skipped unless the user said "live", "real-time", "multiplayer", "collaborative", or "co-edit".
- **API-first / developer tool** - REST API + docs, GraphQL gateway, SDK generator. Skipped unless the user said "API", "endpoint", "SDK", or "developer tool".
- **AI agent** - autonomous, multi-step, tool-using, distinct from "AI chat". Skipped unless the user said "agent", "autonomous", "do X for me", or named specific tools.

SaaS, CRUD dashboard, and content site do NOT get their own tier2. They are tier1 plus one layer each (auth+billing / admin table / content collections + MDX). The reasoning is in `02` Master Matrix row notes; the principle is **a tier2 earns itself when the runtime differs (mobile, AI streaming, commerce backend, tooling), not when the surface looks different**.

Selection is a **13-step deterministic decision tree** in `02` §Selection Rule; the tree is the intake protocol's first question. First match wins; fallback is `tier0-minimal`.

---

## Decision 5: the intake protocol in one page

This is a one-page summary of `04_INTAKE_PROTOCOL.md`; that chapter is the canonical source.

**Position:** one bounded multi-choice intake at project start, then generate-first for the build loop.

**Six fixed axes** (every axis carries a default; user can answer in one line):

1. **Kind** - Landing / Dashboard / SaaS / Mobile / AI chat / Storefront / Content / Tooling / Not sure. Default: 2 (Dashboard / CRUD).
2. **Tier** - 0 / 1 / 2. Default: 1.
3. **Data** - browser-only / SQLite / hosted BaaS / serverless KV / external / none. Default: 2 (SQLite).
4. **Auth** - anyone / email+password / magic link+OAuth / multi-tenant with roles. Default: 1 for Tier 0, 3 otherwise.
5. **Locale** - English LTR / Arabic RTL / Kurdish RTL / bilingual / other. Default: 1 (English LTR).
6. **Scope** - explicit out-of-scope list (payments, notifications, realtime, search, uploads, charts, mobile UX, i18n). Default: none selected.

**Adaptive axes** (0 to 4, fired only when a fixed answer unlocks them): visual identity, deploy target, external integrations, compliance. Full question bank in `04` §"The question bank".

**Per-tier budget:**

| Tier | Fixed asked | Adaptive fired | Hard cap | Intake tokens |
|---|---|---|---|---:|
| Tier 0 | 3 | 0 to 1 | 4 | ~400 |
| Tier 1 | 4 to 6 | 1 to 3 | 8 | ~700 |
| Tier 2 | 6 | 2 to 4 | 10 | ~1,000 |

**Stop rule** is OR of: (a) coverage checklist green; (b) self-rated confidence ≥ 0.85 across 4 sub-axes; (c) per-tier budget exhausted. Self-rated confidence is the weak instrument; the coverage checklist and the budget cap are the load-bearing gates.

**Confirmation artifact** is written to `SPEC.md` at the project root before any code. It is a structured spec block (not prose), one field per axis, plus a "What I will build" / "What I will NOT build" pair and a confidence rating. The user replies "go" or "change X to Y". `SPEC.md` is editable mid-build; the agent re-runs only the commands affected by the changed axis. No full restart.

**Reconciliation evidence.** The "one bounded turn" position is supported by both bodies of evidence, not diplomatic split-the-difference. Angle B's commercial survey shows 9 of 12 closed tools converge on generate-first; Angle E's empirical literature (Ambig-SWE +74% [S2], Ask-or-Assume +19pp [S3]) shows interaction helps when bounded. Ghosh et al. 2026 shows a structured checklist beats an open-ended interview on rubric scores (7.50 vs 6.67 vs 5.67) and uses fewer tokens. The verdict is in `04` §"The evidence: ask-first versus generate-first".

---

## Decision 6: how the agent verifies its own work

The current `resources/general-app-template` bans test frameworks (`RULES_GUIDE.md:49`). That ban leaves the agent no cheap self-verification mechanism, which is the root cause of the "shipped but broken" failure mode in `06` Part 4.

The recommended design replaces it with **a tier-specific definition of done, expressed as commands that must exit zero**.

### Definition of done per tier

| Tier | Must pass | Why |
|---|---|---|
| Tier 0 | `tsc --noEmit && npm run build` | Type check and production build cover the bare minimum. |
| Tier 1 | `tsc --noEmit && npm run build && npm test` | Adds Vitest smoke test ("render the home page; expect h1 text"). |
| Tier 2-ai-chat | Tier 1 + a streaming smoke test ("first token within 3s on a `Hello` message with a stub provider") | Streaming is the failure mode for this kind. |
| Tier 2-mobile | Tier 1 + `npx expo-doctor` (zero errors) + `eas build --local --profile development` exit 0 | Expo-specific health gate. |
| Tier 2-saas-bundle | Tier 1 + webhook signature verification test + Stripe Billing portal smoke test | The two places SaaS companies leak MRR. |
| Tier 2-storefront | Tier 1 + product-list route renders + cart-add smoke + Stripe Checkout redirect | The minimum lovable flow. |
| Tier 2-tooling (extension) | Tier 1 + `wxt build` exit 0 + manifest V3 validation (`wxt validate`) | MV3 validation is non-negotiable for Chrome Web Store. |
| tier2-tooling (bot / cli) | Tier 1 + `--help` exit 0 + one happy-path command exit 0 | Both have a deterministic runnable shell. |

The smoke test is **not** a full test suite. It is one Vitest case, preconfigured in `tests/smoke.test.ts`, that runs in CI and tells the agent "I built something and the basics render". The agent is allowed to add more tests, but it is not required to. This is the deliberate reversal of the current "no tests" rule (`06` Part 4).

**Failure handling.** If a command in the `## Done` section exits non-zero, the agent enters a fix loop:

1. Re-read the failing command's output.
2. Identify the smallest change that addresses the failure.
3. Apply the change via `edit`.
4. Re-run the failing command.
5. Cap the loop at 3 retries per command; after that, stop and report the partial state to the user with the verbatim error output.

The cap is intentional. A 3-retry ceiling prevents the agent from drifting into a hole. If three attempts did not close the gap, the user needs to see the gap before more tokens are spent.

---

## Portability across agent runtimes

The user made this a hard requirement: "any agent, portable markdown. Templates must work in Kilo, Claude Code, Cursor, OpenCode, Codex."

| Runtime | Reads `AGENTS.md`? | Reads `SKILL.md`? | Native Skills support? | Degradation if any |
|---|---|---|---|---|
| Kilo | yes (this repo's convention) | yes (markdown) | yes (Skills folder shape) | none |
| Claude Code | yes (also reads `CLAUDE.md`; pointer file recommended) | yes (markdown) | yes (Skills spec since 2025-12-18) | none |
| Cursor | yes (since 2026) | yes (markdown) | partial (Skills spec from Anthropic, not Cursor-native) | Skills progressive disclosure is best-effort, not enforced |
| OpenCode | yes (this repo's convention) | yes (markdown) | partial (folder shape honoured) | none |
| Codex | yes | yes (markdown) | no (Skills spec is Anthropic, not OpenAI) | Progressive disclosure is conventional, not enforced |
| Plain terminal / no agent | via `cat AGENTS.md` | via `cat SKILL.md` | no | No cache reuse; agent has to re-read each time |

**Hard requirement:** every file in the family is plain markdown or plain TypeScript / JSON / CSS. No proprietary format, no runtime-locked widget, no `task()` dispatch, no per-runtime adapter.

**Soft degradation:** the Anthropic Skills progressive disclosure is a convention, not a contract. Cursor and Codex may load the whole `SKILL.md` instead of honouring the Level 1 / Level 2 / Level 3 split. That is fine; the worst case is "agent reads 3,000 tokens instead of 100", which is still better than the current 12,560 tokens.

**Cross-runtime parity test.** Before shipping the family, the planning pass should run a Tier 1 build through Kilo, Claude Code, Cursor, OpenCode, and Codex on the same brief and compare: (a) `SPEC.md` content, (b) generated file list, (c) per-step token counts, (d) `tsc --noEmit && npm run build && npm test` exit codes. If parity fails, that runtime's adapter (if any) is the wrong shape.

---

## The maintenance story

A checked-in skeleton is a maintenance liability. The honest accounting is in `03` §5.3.

| Maintenance item | Trigger | Cost | Owner |
|---|---|---|---|
| Dependency drift | React major, Tailwind major, Vite major, Next.js major, Drizzle / Prisma major | 30 min to 2 hours per event | The skeleton maintainer |
| Lockfile rot | `npm ci` fails in CI; transitive security patch | ~5 min per cleanup | CI / dependabot |
| Type drift | Library types evolve; new strict TS rules | ~30 min per quarterly `tsc --noEmit` pass | The skeleton maintainer |
| `[UNVERIFIED]` items | A claim in `02` was marked UNVERIFIED and is now load-bearing | ~30 min per item, paid once at first use | The planner at plan time |
| Scaffolder drift | `create-vite`, `create-next-app`, etc. ship breaking changes | ~1 hour per scaffolder per major | The skeleton maintainer |
| Framework majors (aggregate) | One major per quarter is typical for any actively maintained stack | 1 to 2 days per quarter, total | The skeleton maintainer |

**Break-even.** Amortised savings hit the maintenance cost at **~10 apps built per quarter**. Below that, the checked-in skeleton is a net loss versus pure generation. Above that, it is a clear win. The 65% amortised savings figure (across 10 builds) translates to roughly $19.50 saved per quarter at Tier 1 Sonnet 4.6 pricing, which exceeds the 1 to 2 day maintenance cost (roughly $800 at typical engineer rates).

**What happens if nobody maintains it.** Dependency drift accumulates; `npm install` starts failing on a fresh clone within 6 months; the skeleton's `package.json` engines drift out of sync with what the agent actually generates; the locked-in skill is wrong. The skeleton rots silently. The mitigation is **explicit**: a top-level `CHANGELOG.md` in the family, a per-tier `VERSION`, a `dependabot.yml` at the family root, and a `scripts/verify-stack-claims.ts` run weekly against the `02` chapter's pinned versions.

**Who owns it.** This is an open question in `07_OPEN_QUESTIONS.md` (item 6). Default assumption: a single named maintainer per quarter, with CI as the safety net. If nobody is named, the skeleton will rot within one quarter.

---

## What this replaces in the existing template

The full audit is in `06_TEMPLATE_AUDIT.md`. The summary, in one paragraph:

~75 to 80% of the existing `resources/general-app-template/` does not survive. The single thing most worth keeping is the audit-logging pattern (`logCreate / logUpdate / logDelete` from `APP_ARCHITECTURE_GUIDE.md:566-588`), which is small, kind-agnostic, and copy-pasteable once the storage adapter is generic. The remaining survivors are 4 of 12 worked examples in `REFERENCES.md` (sidebar with `NavLink` active-state, animation transitions, `cn()`, modal structure), the security headers in `Express` (`APP_ARCHITECTURE_GUIDE.md:638-642`), and the project structure bones (`server.ts` at root, `src/main.tsx` with `StrictMode + DBProvider + App`, `src/pages/` vs `src/components/` split, `src/lib/api/`). The 58 KB of prose compresses to ~10 KB of curated `memory/` markdown per tier, plus the runnable skeleton that does not exist today.

Three rules reverse from the existing template:

1. **Allow comments on exports** (replace `NEVER write comments`). JSDoc on exported functions is fine; banner comments are not.
2. **Ship Vitest preconfigured** (replace `NEVER add test framework`). One smoke test per tier, runnable in CI.
3. **Locale is a parameter** (replace hard-coded Arabic/RTL). Default `en` + `ltr`; Arabic is one entry in `locales/`, not the default.

WatermelonDB drops from the default. The migrations target is Drizzle (web) / `expo-sqlite` (mobile) / Postgres (server), with WatermelonDB preserved as an opt-in adapter behind a `tier.config.json` flag. The decorator config (`experimentalDecorators: true`, Babel decorator plugins) dies with it.

---

## Where this design could be wrong

Five failure modes the user should know about. Each has a cheapest experiment that would test it.

| Failure mode | Severity | Cheapest experiment that would test it |
|---|---|---|
| The cost model is a model, not a measurement. The 2.7× headline depends on A8 = 22 tokens/line of generated TSX and Sonnet 4.6 pricing. A pilot run with N=10 distinct Tier 1 briefs across 3 agents would validate or kill it. | medium | Build the Tier 1 spine and run 10 briefs on Claude Code, Kilo, and OpenCode; log per-call `cache_read_input_tokens`, `output_tokens`, USD; compare mean to the model. Protocol in `03` §"How to measure this system". |
| The scaffolder non-interactive claims in `02` (the verdict matrix on `create-vite`, `create-next-app`, `create-expo-app`, `shadcn add`, `create-t3-app`, etc.) rest on README claims, not empirical `< /dev/null` tests. A scaffolder that prompts the agent with a TTY question will break the spine. | medium | Run each scaffolder in CI under `< /dev/null` before locking the tier routing. If any prompts, either supply the flag or drop it. |
| The template count could be too many. 8 entries is the result of "5 tier2 + tier0 + tier1 + cinematic-landing", but if 3 of those 5 tier2 templates are rarely used, the maintenance cost dominates the savings. Conversely, 8 could be too few if the user's actual usage splits finer. | medium | Track which tier is selected per build over the first 6 months. If `tier2-tooling` < 5% of builds, fold it into Tier 1 + a shim. If a new kind dominates > 20%, add a tier2 for it. |
| The bounded 10-question intake may still under-specify a complex app. The empirical evidence transfers only partially from bug-fix-on-existing-code (Ambig-SWE, Ask-or-Assume) to greenfield app generation; Angle E flagged this caveat (R-7). | low | Add a "free-text escape hatch" to the intake: after the batched MC, the user can add one free-text sentence; the agent uses it to set the per-axis defaults instead of the standard defaults. Measure "first-build acceptance rate" over 30 builds. |
| The Tier 2 SaaS bundle is `tier1 + auth + billing layers`, not its own tier2. If the user's SaaS apps cluster around a specific commerce or billing shape, this collapses into something specific enough to deserve its own tier2 later. | low | Track: if > 30% of Tier 1 builds add the auth + billing layers together, graduate to `tier2-saas-bundle` as a tier2 (which `02` already lists). |

If any one of these failure modes materialises, the design is amendable, not a rewrite. The spine is the load-bearing artifact; everything else is layered on top.