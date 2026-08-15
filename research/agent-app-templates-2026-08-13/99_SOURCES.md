# 99_SOURCES - consolidated source table

**Task:** T-2026-08-13-003
**Date:** 2026-08-13
**Scope:** every cited source across `00_README.md`, `01_RECOMMENDED_DESIGN.md`, `02_STACK_MATRIX.md`, `03_TOKEN_ECONOMY.md`, `04_INTAKE_PROTOCOL.md`, `05_PRIOR_ART_AND_COMPETITORS.md`, `06_TEMPLATE_AUDIT.md`, `07_OPEN_QUESTIONS.md`, plus the six angle files in `share/notes/01_research_T-2026-08-13-003_angle-*.md` and the verifier report `share/reports/01_verify_T-2026-08-13-003.md`.

**Verification tags used in this file.**
- **Verified 2026-08-13** - the URL was fetched on 2026-08-13 and the load-bearing claim was confirmed against the page text.
- **Verified by npm registry** - the URL or command returned a current value matching the claim.
- **[UNVERIFIED]** - the source row is cited from an angle dossier but the angle author did not fetch the canonical page; the claim is directionally correct but not independently verified.
- **[UNVERIFIED-CURRENCY]** - the source is a leaked system prompt snapshot; the mechanism is confirmed against the vendor's own docs separately, but the verbatim text may differ from the production prompt.
- **[Local]** - the path is inside this repository.

All access dates in this table are 2026-08-13 unless the source itself is older.

---

## Category 1: Official library and framework docs

| # | Source | URL or command | What it proves | Used in chapter(s) | Verification |
|---|---|---|---|---|---|
| **OS-1** | AGENTS.md project site + GitHub corpus | https://agents.md/ | "Used by over 60k open-source projects" verbatim; cross-agent portability list (Codex, Cursor, Jules, Zed, Devin, RooCode, Aider, OpenCode); convention stewarded by the Agentic AI Foundation under the Linux Foundation | `03` [S5]; `05` [S1]; `06` (cross-cut) | Verified 2026-08-13 |
| **OS-2** | Anthropic Skills canonical repo | https://github.com/anthropics/skills | Per-skill folder with three progressive-disclosure levels; Apache-2.0 spec; open standard since 2025-12-18 | `01` Decision 1; `03` [S1] | Verified 2026-08-13 |
| **OS-3** | Anthropic Engineering: "Equipping agents for the real world with Agent Skills" | https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills | "Code is deterministic... far more efficient than having Claude generate equivalent code on the fly"; Skills three-level model; open-standard note dated 2025-12-18 | `03` [S1]; `05` (inspiration) | Verified 2026-08-13 |
| **OS-4** | Anthropic Agent Skills overview (Claude docs) | https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview | "Level 1: Metadata ~100 tokens per Skill", "Level 2: Instructions Under 5k tokens", "Level 3+: None until accessed"; "There's no context penalty for bundled content that isn't used" | `03` [S2] | Verified 2026-08-13 |
| **OS-5** | Anthropic Prompt caching (Claude docs) | https://platform.claude.com/docs/en/build-with-claude/prompt-caching | Pricing multipliers (5m writes 1.25x, 1h writes 2.0x, cache reads 0.10x); per-model minimum cacheable prefixes (Sonnet 4.6 = 1,024 tokens, Sonnet 5 = 1,024, Haiku 4.5 = 4,096, Opus 4.6 = 4,096, Opus 4.8 = 1,024, Opus 5 = 512); 4 explicit breakpoints; 20-block lookback; cache hierarchy tools to system to messages; Sonnet 4.6 pricing $3/$15 per MTok; Sonnet 5 $2/$10; Haiku 4.5 $1/$5; Opus 5 $5/$25 | `03` [S3]; `00` Numbers table | Verified 2026-08-13 |
| **OS-6** | OpenAI Prompt caching (Developer docs) | https://platform.openai.com/docs/guides/prompt-caching | GPT-5.6+ requires `prompt_cache_key` for reliable matching; 1,024-token strict minimum on GPT-5.6+; 30-minute exact TTL; 0.10x cache reads; 1.25x cache writes; up to 4 cache writes per request; up to 50 breakpoints; ~15 RPM per `prompt_cache_key` recommendation | `03` [S4] | Verified 2026-08-13 |
| **OS-7** | Tailwind CSS v4 install docs | https://tailwindcss.com/docs/installation/using-vite | Tailwind v4.3 current; install is `npm install tailwindcss @tailwindcss/vite`; add to Vite plugins; `@import "tailwindcss";` in CSS; no config files | `02` [S3]; `06` [S1] | Verified 2026-08-13 |
| **OS-8** | Motion for React quick start | https://motion.dev/docs/react-quick-start | "Motion for React (previously Framer Motion)"; install `npm install motion`; import path `import { motion } from 'motion/react'` | `02` (motion row); `06` [S2] | Verified 2026-08-13 |
| **OS-9** | React Router install docs | https://reactrouter.com/start/declarative/installation | Install `npm i react-router`; import from `react-router` (no `-dom`) | `02` [S12]; `06` [S4] | Verified 2026-08-13 |
| **OS-10** | better-sqlite3 GitHub Releases | https://github.com/WiseLibs/better-sqlite3/releases | Current at v13.0.3 (and v13.1.0 since audit); v13.0.0 was the N-API migration on 2026-07-21 | `02` better-sqlite3 row; `06` [S3] | Verified 2026-08-13 |
| **OS-11** | Expo SDK reference | https://docs.expo.dev/versions/latest/ | Expo SDK 57.0.12 current (depends on RN 0.86 + React 19); EAS Build + Submit workflow; Expo Router file-based routing | `02` [S10]; mobile tier | Verified 2026-08-13 |
| **OS-12** | Capacitor Installing Guide | https://capacitorjs.com/docs/getting-started | `@capacitor/core` v8.5.0 current; weekly downloads 3.2M | `02` [S11]; `06` [S10] | Verified 2026-08-13 |
| **OS-13** | Stripe Payments JS Guide | https://docs.stripe.com (chub `chub get stripe/payments`) | Stripe SDK `^22.5.0`; Stripe Billing; hosted checkout + customer portal + tax + dunning | `02` [S4] | Verified 2026-08-13 |
| **OS-14** | Astro JS Guide | https://docs.astro.build (chub `chub get astro/astro`) | Astro `^7.2.1` current major; `^6.4.2` still on npm but behind major | `02` [S7] | Verified 2026-08-13 |
| **OS-15** | Telegram Bot API | https://core.telegram.org/bots/api | Reference for the bot shim; grammY README warns about API churn | `02` [S22] | [UNVERIFIED: derived claim; Telegram's own docs are terse] |
| **OS-16** | Nielsen Norman Group: Response Times | https://www.nngroup.com/articles/response-times-3-important-limits/ | Streaming UX research baseline (3-second limit) | `02` [S23] | [UNVERIFIED: industry consensus heuristic] |
| **OS-17** | Amazon Kiro Specs docs | https://kiro.dev/docs/specs/ + https://kiro.dev/docs/specs/analyze-requirements/ | EARS notation canonical; Analyze Requirements separate-agent pattern | `04` Angle-E-S4 | Verified 2026-08-13 |

---

## Category 2: npm registry (package versions, last-publish, weekly downloads)

| # | Source | Command | What it proves | Used in chapter(s) | Verification |
|---|---|---|---|---|---|
| **NPM-1** | Next.js | `npm view next version` | `16.3.0` exists; current `16.3.x` line | `02` [S1] | Verified 2026-08-13 |
| **NPM-2** | Vercel AI SDK `ai` | `npm view ai version` | `7.0.64` exists; AI SDK 7 is current | `02` [S2] | Verified 2026-08-13 |
| **NPM-3** | Tailwind CSS | `npm view tailwindcss version` | `4.3.0` exists; current `4.3.x` line | `02` [S3] | Verified 2026-08-13 |
| **NPM-4** | `@clerk/nextjs` | `npm view @clerk/nextjs version` | Latest `7.7.4`; `7.4.2` (cited in angle C) exists but is behind | `02` [S5] | Verified 2026-08-13 |
| **NPM-5** | Prisma ORM | `npm view prisma version` | `7.9.1` latest; **`8.0.14` does not exist (hallucination in angle C, corrected in `02`)** | `02` [S6] | Verified 2026-08-13 (and hallucination flag) |
| **NPM-6** | Commander | `npm view commander version` | `15.0.0` latest; `14.0.3` exists but is behind a major | `02` [S8] | Verified 2026-08-13 |
| **NPM-7** | Discord.js | `npm view discord.js version` | `14.27.0` latest; `14.26.4` (cited in angle C) exists | `02` [S9] | Verified 2026-08-13 |
| **NPM-8** | React | `npm view react version` | `19.2.8` current; `19.2.6` exists; React 18.3.x still LTS | `02` [S15]; `06` [S9] | Verified 2026-08-13 |
| **NPM-9** | Vite | `npm view vite version` | `8.2.1` latest; **`7.8.0` does not exist (hallucination in angle C, corrected in `02`); highest 7.x is `7.3.6`** | `02` [S14]; `06` [S11] | Verified 2026-08-13 (and hallucination flag) |
| **NPM-10** | WXT | `npm view wxt version` | `0.21.4` exists | `02` [S16] | Verified 2026-08-13 |
| **NPM-11** | Drizzle ORM | `npm view drizzle-orm version` | `0.45.2` exists | `02` [S17] | Verified 2026-08-13 |
| **NPM-12** | Medusa | `npm view @medusajs/medusa version` | `2.18.0` exists; Medusa 2.x is the current major | `02` [S18] | Verified 2026-08-13 |
| **NPM-13** | Anthropic SDK | `npm view @anthropic-ai/sdk version` | `0.116.0` current; `0.100.1` (cited in angle C) exists but is behind | `02` [S20] | Verified 2026-08-13 |
| **NPM-14** | Shopify Storefront API client | `npm view @shopify/storefront-api-client version` | **`12.1.0` does not exist; latest is `2.0.0`; full SDK `@shopify/shopify-api@12.1.0` is a separate package** (angle C mixed the two) | `02` [S21] | Verified 2026-08-13 (and confusion flag) |
| **NPM-15** | Supabase JS | `npm view @supabase/supabase-js version` | `2.112.3` exists | `02` [S13] | Verified 2026-08-13 |
| **NPM-16** | better-sqlite3 | `npm view better-sqlite3 version` | `13.0.3` current; v12.8.0 (cited in template) exists but is behind | `02` better-sqlite3 row; `06` [S8] | Verified 2026-08-13 |
| **NPM-17** | WatermelonDB | `npm view @nozbe/watermelondb time --json` | `latest` at 0.28.0; last non-prerelease publish 2025-04-07; last prerelease `0.28.1-0` on 2025-07-24 (~13 months ago) | `06` [S6]; audit verdict | Verified 2026-08-13 |
| **NPM-18** | `react-router` | `npm view react-router version` | `8.3.0` current; `react-router-dom` is a re-export shim | `02` [S12]; `06` [S5] | Verified 2026-08-13 |
| **NPM-19** | `@capacitor/core` | `npm view @capacitor/core version` | `8.5.0` current; very actively maintained | `02` [S11]; `06` [S10] | Verified 2026-08-13 |
| **NPM-20** | `lucide-react`, `clsx`, `tailwind-merge`, `recharts`, `jspdf`, `html2canvas`, `vitest` | `npm view <pkg> version` (multiple) | All alive; recharts maintenance is sleepy but functional | `06` [S11] | Verified 2026-08-13 |

### npm items marked `[UNVERIFIED]` in `02`

The following stack items are referenced in `02_STACK_MATRIX.md` but the planner should `chub get <id>` at plan time before pinning:

- shadcn/ui - registry, not a package; `npx shadcn add` is the install path
- Auth.js / NextAuth v5
- `react-markdown` + `remark-gfm` + `rehype-highlight`
- `lucide-react` (verifiable via NPM-20, but not yet pinned to a specific version in `02`)
- `recharts` (verifiable via NPM-20, but not yet pinned to a specific version in `02`)
- `@hookform/resolvers`
- Pagefind
- TanStack Table

---

## Category 3: Academic papers (peer-reviewed, arXiv, conference)

| # | Paper | URL | What it proves | Used in chapter(s) | Verification |
|---|---|---|---|---|---|
| **P-1** | Vijayvargiya et al., "Ambig-SWE: Interactive Agents to Overcome Underspecificity in Software Engineering." ICLR 2026 | https://arxiv.org/abs/2502.13069 (arXiv:2502.13069v3, submitted 2025-02-18, v3 2026-02-21) | "up to 74% improvement over the non-interactive settings" verbatim from abstract | `04` [S1] | Verified 2026-08-13: abstract matches verbatim. **Caveat: SWE-bench bug-fix population, not greenfield app generation.** |
| **P-2** | Edwards and Schuster, "Ask or Assume? Uncertainty-Aware Clarification-Seeking in Coding Agents" | https://arxiv.org/abs/2603.26233 (arXiv:2603.26233v2, submitted 2026-03-27, v2 2026-06-03) | 69.40% task resolve rate; "well-calibrated information-seeking behavior, conserving queries on simple tasks while proactively seeking information on more complex issues" | `04` [S2] | Verified 2026-08-13: paper exists, abstract reports the 69.40% verbatim. **Caveat: same SWE-bench population as P-1.** |
| **P-3** | Ghosh, Polach, Sow, "Less Back-and-Forth: A Comparative Study of Structured Prompting" | https://arxiv.org/abs/2605.20149 (arXiv:2605.20149v1, submitted 2026-05-19) | Across 4 task types (summarization, planning, explanation, coding) times 3 LLM systems (ChatGPT, Claude, Grok): checklist-improved prompts scored 7.50/8, clarifying-question prompts 6.67/8, raw prompts 5.67/8; checklist prompts used fewer tokens than clarifying-question prompts | `04` [S3] | Verified 2026-08-13: 7-page paper, 2 figures, 6 tables, abstract matches |

---

## Category 4: Repos (open-source projects cited)

### Conventions and frameworks

| # | Repo | URL | License | Stars (access 2026-08-13) | Used for | Verification |
|---|---|---|---|---|---|---|
| **R-1** | `anthropics/skills` | https://github.com/anthropics/skills | Apache-2.0 | ~168.7k | Per-skill folder shape | Verified 2026-08-13 |
| **R-2** | `github/spec-kit` | https://github.com/github/spec-kit | MIT | 126.8k | `.specify/` folder shape; `/speckit.clarify` command vocabulary; AGENTS.md at root; 30+ AI coding agent integrations | Verified 2026-08-13 |
| **R-3** | `All-Hands-AI/OpenHands` | https://github.com/All-Hands-AI/OpenHands | MIT | 83.9k | AGENTS.md + `.agents/skills/` convention | Verified 2026-08-13 |
| **R-4** | `Aider-AI/aider` | https://github.com/Aider-AI/aider | Apache-2.0 | 48.2k | Reads AGENTS.md via `.aider.conf.yml`; repo-map; auto-commit; pair-programmer pattern | Verified 2026-08-13 |
| **R-5** | `coleam00/Archon` | https://github.com/coleam00/Archon | MIT | 23.2k | `.archon/workflows/` + AGENTS.md + CLAUDE.md; 19 default workflows including `archon-piv-loop` and `archon-idea-to-pr` | Verified 2026-08-13 |
| **R-6** | `stackblitz-labs/bolt.diy` | https://github.com/stackblitz-labs/bolt.diy | MIT source; WebContainers **commercial license** for production for-profit use | 19.7k | WebContainers + 19 LLM providers via Vercel AI SDK | Verified 2026-08-13 |
| **R-7** | `bmad-code-org/BMAD-METHOD` | https://github.com/bmad-code-org/BMAD-METHOD | MIT | ~25k | `.bmad-core/` (memory + agents + workflows) + `templates/` | [UNVERIFIED] |
| **R-8** | `buildermethods/agent-os` | https://github.com/buildermethods/agent-os | MIT | ~2k | `.agent-os/` with `spec.md`, `plan.md`, `tasks.md` | [UNVERIFIED] |
| **R-9** | `eyaltoledano/claude-task-master` | https://github.com/eyaltoledano/claude-task-master | MIT | ~7k | Tasks-as-data pattern | [UNVERIFIED] |
| **R-10** | `cline/cline` | https://github.com/cline/cline | Apache-2.0 | ~38k | VS Code AI agent; AGENTS.md + MCP | [UNVERIFIED: stars; repo reachable] |
| **R-11** | `RooCodeInc/Roo-Code` | https://github.com/RooCodeInc/Roo-Code | Apache-2.0 | ~19k | VS Code Cline fork with multi-mode (Code/Architect/Ask/Debug/Orchestrator) | [UNVERIFIED: stars; repo reachable] |
| **R-12** | `plandex-ai/plandex` | https://github.com/plandex-ai/plandex | MIT | ~14k | Multi-file plans + persistent context + parallel agents | [UNVERIFIED: stars; repo reachable] |
| **R-13** | `Pythagora-io/gpt-pilot` | https://github.com/Pythagora-io/gpt-pilot | MIT | ~33k | Multi-agent SDLC (PM to architect to dev to QA to reviewer) | [UNVERIFIED: stars; PR cadence slowing since 2025-Q4] |

### SaaS starters (commercial and MIT, for tier2-saas-bundle reference only)

| # | Repo | URL | License | Stars (access 2026-08-13) | Used for | Verification |
|---|---|---|---|---|---|---|
| **R-14** | `makerkit/makerkit` | https://github.com/makerkit/makerkit | COMMERCIAL | ~5k | Next.js SaaS starter | Verified (commercial status) |
| **R-15** | `supastarter/supastarter` | https://github.com/supastarter/supastarter | COMMERCIAL | ~3k | Nuxt SaaS starter | Verified (commercial status) |
| **R-16** | `marc-louis/shipfast` | https://github.com/marc-louis/shipfast | COMMERCIAL | ~6k | Next.js SaaS starter | Verified (commercial status) |
| **R-17** | `ixartz/Next-js-Saas-Starter` | https://github.com/ixartz/Next-js-Saas-Starter | MIT | ~6k | Next.js 14/16 + Tailwind + NextAuth + Prisma + Stripe | [UNVERIFIED: stars; repo reachable] |

### Scaffolders (cited by angle A; non-interactive flag claims are README-only, not empirically tested)

| # | Repo | URL | License | Used for | Verification |
|---|---|---|---|---|---|
| **R-18** | `vitejs/vite` (`create-vite`) | https://github.com/vitejs/vite | MIT | Scaffolder; non-interactive flag per README | [UNVERIFIED: not empirically tested with `< /dev/null`] |
| **R-19** | `vercel/next.js` (`create-next-app`) | https://github.com/vercel/next.js | MIT | Scaffolder; non-interactive flag per README | [UNVERIFIED: not empirically tested] |
| **R-20** | `expo/expo` (`create-expo-app`) | https://github.com/expo/expo | MIT | Scaffolder; non-interactive flag per README | [UNVERIFIED: not empirically tested] |
| **R-21** | `shadcn-ui/ui` (shadcn CLI) | https://github.com/shadcn-ui/ui | MIT | Component registry; `npx shadcn add` is the install path | [UNVERIFIED: distribution model may have changed in 2025] |
| **R-22** | `t3-oss/create-t3-app` | https://github.com/t3-oss/create-t3-app | MIT | T3 stack scaffolder | [UNVERIFIED: non-interactive claim not tested] |
| **R-23** | `AmanVarshney01/create-better-t-stack` | https://github.com/AmanVarshney01/create-better-t-stack | MIT | Better-T-Stack scaffolder | [UNVERIFIED: non-interactive claim not tested] |
| **R-24** | `wasp-lang/wasp` | https://github.com/wasp-lang/wasp | MIT | Wasp DSL scaffolder | [UNVERIFIED: non-interactive claim not tested] |
| **R-25** | `redwoodjs/redwood` | https://github.com/redwoodjs/redwood | MIT | RedwoodJS scaffolder | [UNVERIFIED: non-interactive claim not tested] |
| **R-26** | `refinedev/refine` | https://github.com/refinedev/refine | MIT | Refine scaffolder | [UNVERIFIED: non-interactive claim not tested] |
| **R-27** | `TanStack/router` | https://github.com/TanStack/router | MIT | TanStack Start scaffolder | [UNVERIFIED: non-interactive claim not tested] |
| **R-28** | `wxt-dev/wxt` | https://github.com/wxt-dev/wxt | MIT | Browser extension scaffolder | [UNVERIFIED: non-interactive claim not tested] |
| **R-29** | `medusajs/medusa` | https://github.com/medusajs/medusa | MIT | Commerce backend | Verified 2026-08-13 |
| **R-30** | `withastro/astro` | https://github.com/withastro/astro | MIT | Content / docs site framework | Verified 2026-08-13 |
| **R-31** | `QwikDev/qwik` | https://github.com/QwikDev/qwik | MIT | Qwik framework scaffolder | [UNVERIFIED: non-interactive claim not tested] |

---

## Category 5: Vendor documentation (commercial closed tools)

| # | Source | URL | What it proves | Used in chapter(s) | Verification |
|---|---|---|---|---|---|
| **V-1** | Firebase Studio overview | https://firebase.google.com/docs/studio | "Firebase Studio is sunsetting on March 22, 2027. As of June 22, 2026, new workspace creation and user signup are disabled." Nav label reads "Firebase Studio (deprecated)" | `05` [S5] | Verified 2026-08-13 |
| **V-2** | Devin Desktop / Cascade docs (llms.txt) | https://docs.devin.ai/llms.txt | Windsurf to Devin Desktop rebrand; Cascade as Devin Desktop agent mode; Fast Context subagent; DeepWiki; Arena Mode; Worktrees; AGENTS.md support | `05` [S6], [S14], [S15] | Verified 2026-08-13 |
| **V-3** | Replit Agent docs | https://docs.replit.com/replitai/agent | Lite/Economy/Power agent modes; App testing + Code optimization + Turbo toggles; output-type pill | `05` [S8] | Verified 2026-08-13 |
| **V-4** | Base44 Quick-start guide | https://docs.base44.com/Getting-Started/Quick-start-guide | 5 intake paths; 1-credit first build; preview iframe; instant live preview; templates gallery; Clone App | `05` [S11] | Verified 2026-08-13 |
| **V-5** | Base44 AI chat modes | https://docs.base44.com/Building-your-app/AI-chat-modes | 3 chat modes (Default/Discuss/Edit); Cmd+. / Ctrl+. toggle; Discuss at 0.3 credits/message; fixed Discuss model; 7-message queue; Issues Found auto-fix (free credits); Version History | `04` Angle-B-S12; `05` [S12] | Verified 2026-08-13 |
| **V-6** | Cascade Overview (now Devin Desktop) | https://docs.devin.ai/desktop/cascade/cascade.md | Code/Chat modes; background planning agent; 20-tool-call cap with Continue; queued messages; AGENTS.md; Memories and Rules; @-mention previous conversations; Fast Context subagent; Worktrees; Lint auto-fix (free); named checkpoints | `05` [S14] | Verified 2026-08-13 |
| **V-7** | a0.dev Three Principles | https://docs.a0.dev/agent-guide/three-principles.md | Be Very Specific; Show It The Error; Make A New Chat (15-20 messages / 80,000 chars hard reset rule) | `04` Angle-B-S17; `05` [S17] | Verified 2026-08-13 |
| **V-8** | a0.dev Docs llms.txt | https://docs.a0.dev/llms.txt | Mobile-first (React Native + Convex); iOS/Android publishing; OTA Updates; Push Notifications; Payment Setup; Native Build Testing; Web Preview Testing | `05` [S18] | Verified 2026-08-13 |
| **V-9** | Rork.com homepage | https://rork.com/ | Mobile-first (iOS focus); Rork Max native iOS app; "$240K ARR in 6 months" case study; example prompts | `05` [S22] | Verified 2026-08-13 |
| **V-10** | Claude Code Best Practices | https://www.anthropic.com/engineering/claude-code-best-practices | Plan mode (Shift+Tab, `claude --permission-mode plan`); Explore to Plan to Implement to Commit; `AskUserQuestion` interview pattern; `/init` CLAUDE.md; CLAUDE.md/SKILL.md/subagents/hooks/MCP/plugins; auto-compaction; `/clear` between unrelated tasks; subagents for investigation; verification before declaring done; Stop hook; Writer/Reviewer pattern | `05` [S23] | Verified 2026-08-13 |
| **V-11** | Create.xyz docs (404) | https://create.xyz/docs/intro | HTTP 404; no reachable mechanism documentation | `05` [S19] | Verified 2026-08-13: 404 |
| **V-12** | Databutton docs (transport error) | https://docs.databutton.com/docs/getting-started | Transport error on every attempt | `05` [S20] | Verified 2026-08-13: unreachable |
| **V-13** | Tempo / Tempo Labs | https://tempo.build/ + https://tempolabs.io/ | Landing page returns only "Tempo: AI Software Factory for Product Teams"; docs unreachable | `05` [S21] | Verified 2026-08-13: dead |
| **V-14** | CLAUDE.md convention | https://docs.claude.com/en/docs/claude-code/llms-txt | Claude Code loads `CLAUDE.md` at session start; same shape as AGENTS.md | `05` [S3] | [UNVERIFIED: exact URL inherited from angle A] |
| **V-15** | Cursor Rules / `.cursorrules` | https://docs.cursor.com/context/rules | Cursor reads `.cursorrules` at session start; also reads AGENTS.md natively in 2026 | `05` [S4] | [UNVERIFIED: exact URL inherited from angle A] |

---

## Category 6: Leaked system prompts (with `[UNVERIFIED-CURRENCY]` tag)

All rows in this section are leaked prompts on the `x1xhlol/system-prompts-and-models-of-ai-tools` GitHub repository. The mechanism claims (generate-first default, search-replace ops, AGENTS.md integration, "keep going until resolved" instruction) are independently verified against the vendors' public docs in Category 5. The verbatim prompt text may differ from the production prompt; treat the mechanism as true, the words as snapshots.

| # | Source | URL | Used for | Verification |
|---|---|---|---|---|
| **L-1** | Lovable Agent Prompt | https://raw.githubusercontent.com/x1xhlol/system-prompts-and-models-of-ai-tools/main/Lovable/Agent%20Prompt.txt | React+Vite+Tailwind+TS stack lock; Supabase backend only; "DEFAULT TO DISCUSSION MODE"; "CHECK UNDERSTANDING" ask rule; search-replace default | [UNVERIFIED-CURRENCY] |
| **L-2** | v0 Prompt | https://raw.githubusercontent.com/x1xhlol/system-prompts-and-models-of-ai-tools/main/v0%20Prompts%20and%20Tools/Prompt.txt | `AskUserQuestions` gated; Next.js App Router default; `user_read_only_context` component library; starter file contract ("you never generate these unless explicitly requested"); Supabase + Vercel Blob + AI SDK + Vercel AI Gateway | [UNVERIFIED-CURRENCY]: dated 2026-05-10 |
| **L-3** | Replit Prompt | https://raw.githubusercontent.com/x1xhlol/system-prompts-and-models-of-ai-tools/main/Replit/Prompt.txt | `<proposed_file_replace_substring>` (search-replace); `<proposed_file_replace>` (whole-file); `<proposed_file_insert>`; `<proposed_shell_command>`; `<proposed_package_install>`; `<proposed_workflow_configuration>` with `set_run_button` | [UNVERIFIED-CURRENCY] |
| **L-4** | Cursor Agent Prompt 2025-09-03 | https://raw.githubusercontent.com/x1xhlol/system-prompts-and-models-of-ai-tools/main/Cursor%20Prompts/Agent%20Prompt%202025-09-03.txt | Auto-context dump; "keep going until the user's query is completely resolved"; `codebase_search` mandatory + multiple-query passes; `todo_write` reconcile; status update near every tool batch; 3-5 parallel tool calls; 3-retry linter cap | [UNVERIFIED-CURRENCY] |
| **L-5** | Devin AI Prompt | https://raw.githubusercontent.com/x1xhlol/system-prompts-and-models-of-ai-tools/main/Devin%20AI/Prompt.txt | Planning vs standard mode toggle; `<suggest_plan/>` command; ask-rule ("If you cannot find some information, believe the user's task is not clearly defined, or are missing important context or credentials you should ask the user for help"); Think tool; `<report_environment_issue>`; test-integrity rule ("When struggling to pass tests, never modify the tests themselves") | [UNVERIFIED-CURRENCY] |

---

## Category 7: Internal (this repository and dispatch)

| # | Path | Used for | Verification |
|---|---|---|---|
| **I-1** | `share/handoffs/00_user_task_T-2026-08-13-003.md` | The user's task verbatim | Local |
| **I-2** | `share/handoffs/00_scope_confirmed_T-2026-08-13-003.md` | Round 1 and Round 2 user answers; task scope | Local |
| **I-3** | `share/reports/01_verify_T-2026-08-13-003.md` | Tier 4 verifier pass; caught two hallucinated versions (Vite 7.8.0, Prisma 8.0.14), the 6x arithmetic error, the ask-first / generate-first contradiction | Local |
| **I-4** | `share/notes/01_research_T-2026-08-13-003_angle-a-prior-art.md` | OSS prior art: AGENTS.md convention, Anthropic Skills, cinematic-landing shape, 43-row project matrix | Local |
| **I-5** | `share/notes/01_research_T-2026-08-13-003_angle-b-competitors.md` | Commercial teardown across 16 prompt-to-app tools along 7 fixed axes; cross-tool ask-first vs generate-first verdict | Local |
| **I-6** | `share/notes/01_research_T-2026-08-13-003_angle-c-app-kinds.md` | 8-kind app matrix with per-kind deep dives (source for `02`) | Local |
| **I-7** | `share/notes/01_research_T-2026-08-13-003_angle-d-token-economy.md` | Token economy and shortest-path cost model (source for `03`) | Local |
| **I-8** | `share/notes/01_research_T-2026-08-13-003_angle-e-intake.md` | Intake and requirement elicitation protocol (source for `04`) | Local |
| **I-9** | `share/notes/01_research_T-2026-08-13-003_angle-f-audit.md` | Audit of `resources/general-app-template/` (source for `06`) | Local |
| **I-10** | `agents_manager/upstream-contrib/PROPOSED_PATCH_v0.5.x_2026-07-01_cinematic-landing-template.md` | The cinematic-landing convention; PROPOSED, not merged. Per angle F, generalises to app templates with three adjustments | Local |
| **I-11** | `resources/general-app-template/` (10 files, 58,138 bytes) | The existing template being audited by `06`; all template claims cited by path and line | Local |
| **I-12** | `agents_manager/memory/projects/research-space/playbook.md` | Per-project memory layer; the source-of-truth for the 11 historical research outputs this dossier references | Local |
| **I-13** | `agents_manager/SKILL.md` and `agents_manager/research/SKILL.md` + `rules.md` | The agent's operating instructions and standing rules | Local |

---

## Cross-reference: claim-by-source table

For every load-bearing claim in the dossier, here is the single source it cites. If a reader wants to audit one specific claim, this is the fastest path.

| Claim | Source row |
|---|---|
| AGENTS.md is used by 60k+ projects and works across all five target runtimes | OS-1 |
| Anthropic Skills is an open standard with three progressive-disclosure levels | OS-2, OS-3, OS-4 |
| Sonnet 4.6 pricing ($3 / $15 per MTok; cache reads at 0.10x) | OS-5 |
| OpenAI GPT-5.6+ requires `prompt_cache_key`; 30-min TTL; 0.10x cache reads | OS-6 |
| Tailwind v4.3 is current; no config files | OS-7, NPM-3 |
| `motion/react` is the correct import path (not `framer-motion`) | OS-8 |
| `react-router` 8.3.0 is current; `react-router-dom` is a re-export shim | OS-9, NPM-18 |
| better-sqlite3 v13.0.3 is current (N-API migration 2026-07-21) | OS-10, NPM-16 |
| Expo SDK 57.0.12 depends on RN 0.86 + React 19 | OS-11 |
| Vite `8.2.1` is current (NOT `7.8.0`, which does not exist) | NPM-9 |
| Prisma `7.9.1` is current (NOT `8.0.14`, which does not exist) | NPM-5 |
| Discord.js `14.27.0` is current | NPM-7 |
| Stripe SDK `^22.5.0` + Stripe Billing | OS-13 |
| WatermelonDB is maintenance-only (last non-prerelease publish 2025-04-07) | NPM-17 |
| Ambig-SWE +74% from interaction; SWE-bench bug-fix population, not greenfield | P-1 |
| Ask-or-Assume 69.40% task resolve rate | P-2 |
| Ghosh et al. checklist 7.50 > clarifying 6.67 > raw 5.67 | P-3 |
| Closed tools converge on generate-first (9 of 12 generate-first default) | V-1 to V-10, L-1 to L-5 |
| Base44 Discuss mode at 0.3 credits/message is the strongest signal | V-5 |
| a0.dev 15-20 message / 80,000 char hard reset rule | V-7 |
| Cinematic-landing shape generalises to app templates with three adjustments | I-10, I-4, I-9 |
| Existing template survival rate is ~20 to 25% | I-11 + I-9 (angle F audit) |
| Current template cached cost $2.74; recommended $1.09 on Tier 1 Sonnet 4.6 | OS-5 + arithmetic in `03` §3.3 |
| Recommended design is 2.7x USD reduction / 63% output-token reduction | OS-5 + arithmetic in `03` Part 1.3 |
| Per-tier maintenance budget 1 to 2 days per quarter | `03` §5.3 |

---

## Caveats carried forward

- The scaffolder non-interactive claims (R-18 to R-31) rest on README claims, not empirical `< /dev/null` runtime tests. The planner should run each scaffolder in CI under `< /dev/null` before locking the tier routing.
- Star counts marked `[UNVERIFIED]` (R-7, R-8, R-9, R-10, R-11, R-12, R-13, R-17, V-14, V-15) are kept as quoted in the source dossiers; the agent must not launder them into facts. The single most reliable signal is last-commit recency, not stars.
- The numbers on AGENTS.md adoption count and the Firebase Studio sunset date are both verified live against the canonical sources on 2026-08-13 (OS-1 and V-1).
- The npm version spot-check pass (NPM-1 to NPM-20) was performed on 2026-08-13 by `npm view`. All `[UNVERIFIED]` markers in Category 2 reflect items the verifier (`I-3`) accepted on the dossier's mitigation, not unresolved verification work.