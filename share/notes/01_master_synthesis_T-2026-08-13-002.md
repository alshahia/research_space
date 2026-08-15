# Master synthesis — T-2026-08-13-002 — convert research_space into a top/best research product

**Date:** 2026-08-13
**Author:** master (post-merge, bias-checked)
**Standing on:** 6 angle files (A criteria / B competitors / C sources / D synthesis / E UX / F current-state) merged into `01_research_T-2026-08-13-002.md`.

This is my (master's) opinionated read. The angle files are ground truth; this is the decision load.

---

## 1. The blunt framing

The user already owns two of the three things a top research product needs in 2026:

1. **A working multi-agent orchestrator** with 10 specialists, soft-walls, adaptive mode, context-hub validation, audit trail. Most "AI research product" projects in 2026 ship a single agent with a tool loop. `agents_manager/` is ahead of that.
2. **Three shipped-quality research outputs** (cloudflare, ai-tools, notebooklm) that demonstrate the format the user wants the product to match. The cloudflare synthesis is 78K words with 5 streams, a master synthesis that debunks 8 source-video claims, and a 127-row harness matrix. This is the spec the product must match.

What the user **does not** have:

3. **A front door.** No UI that says "what topic do you want researched?" No tenant auth. No API that turns a topic into a research run. The platform (`platform/`) is the wrong product — it's an Iraqi website builder. The orchestrator is the right engine but it's filesystem-driven and chat-dispatched.

**The conversion is therefore not "build a research product." It is "wire a front door onto an existing research engine."**

That changes the cost-and-time math dramatically. The 12–20 weeks one-developer estimate (Angle D) is for building the engine greenfield. With reuse, it's 6–10 weeks.

## 2. My ranking of what to ship, in order

### Tier 1 — ship first (MVP, 4–6 weeks)

| # | What | Where it lives | Effort |
|---|---|---|---|
| 1 | Topic input UI on a new `/[locale]/research` route | `platform/src/app/[locale]/research/page.tsx` (new) | 1 week |
| 2 | Auth (NextAuth/Auth.js v5) + multi-tenant `runs` table | `platform/src/lib/db/schema.ts` extension + `src/app/api/auth/` | 1 week |
| 3 | Topic → Plan JSON dispatcher (calls `am-planning` via a worker) | new `platform/src/app/api/topics/route.ts` + `platform/src/workers/research.ts` (BullMQ) | 1.5 weeks |
| 4 | `lib/sources/{web,arxiv,pubmed,youtube}.ts` (Angle C baseline stack) | new `platform/src/lib/sources/` | 1 week |
| 5 | `lib/citations.ts` ([S1]…[Sn] markers + abstention gate) | new | 1 week |
| 6 | Markdown renderer for the synthesis output | new `platform/src/app/[locale]/research/[runId]/page.tsx` | 1 week |

This is the smallest shippable product that beats a "Perplexity + Notion" workflow for the user's stated use case. It is fully EN-only in v1.

### Tier 2 — ship second (v1, +4 weeks)

| # | What | Notes |
|---|---|---|
| 7 | Verifier / CitationAgent stage (FActScore atomic decomposition) | Angle D §3 |
| 8 | URL/PDF/image upload in the input | Angle E §1.2 |
| 9 | Plan-then-confirm UX (Gemini DR pattern) | Angle E §1.3 |
| 10 | Compare-table + Timeline output formats | Angle E §2 |
| 11 | Arabic + Kurdish synthesis | Reuses `platform/src/i18n/messages/{ar,ku}.json`; new `lib/synthesis.ar.ts` |
| 12 | Eval harness (RAGAS + LLM-as-judge) | new `scripts/eval-research.ts` |

### Tier 3 — ship third (v2, +6 weeks)

| # | What | Notes |
|---|---|---|
| 13 | Multi-agent orchestrator (Anthropic Research pattern) | Reuses `agents_manager/SKILL.md` patterns |
| 14 | Mind-map / knowledge graph renderer | `reactflow` (Apache-2.0) |
| 15 | Slide-deck export (PPTX) | `pptxgenjs` |
| 16 | Audio overview / podcast (NotebookLM pattern) | Kokoro-82M (Apache-2.0) for OSS |
| 17 | Source-grounded follow-up chat | |

### Tier 4 — differentiator (v3, +8 weeks)

| # | What | Notes |
|---|---|---|
| 18 | Citation graph visualization | OpenAlex + Crossref as backend |
| 19 | Team workspaces + sharing | |
| 20 | Streaming real-time progress UI | SSE |
| 21 | Notification system (email + RSS) | |
| 22 | WASM SDK for self-host embed | |

## 3. The three architectural decisions the user must make

### 3.1 Build inside `platform/` or build a new `research_app/` next to it

**Option A — extend `platform/`.** Pros: reuse schema, locale routing, payments, PWA, ISR. Cons: the builder's domain model (sites/blocks) has to be ignored on the research routes; the project story shifts ("we build websites AND research reports").

**Option B — new `research_app/` next to `platform/`.** Pros: clean domain model, no schema pollution, no dependency on the website builder. Cons: rebuild locale routing, multi-tenant, PWA, ISR.

**My recommendation: Option B.** The builder and the research product target different users (Iraqi SMBs vs. researchers). The cost of re-implementing locale routing + PWA is ~1 week. The cost of mixing two products in one codebase is much higher.

### 3.2 Locale-first

The platform has `ar` + `en` + `ku` (`platform/src/i18n/messages/{ar,en,ku}.json`). All 3 prior research outputs are EN-only. The user's prior dossier pattern (`research_doc/kotobee_publishing/06_arabic_market_deepdive.md`) is bilingual.

**My recommendation: ship EN + AR simultaneously in MVP.** Skip `ku` for synthesis (UI strings are already there); Kurdish is rare in the LLM-synthesis corpus. AR gives the user a unique distribution angle no Western competitor has.

### 3.3 Monetization

The platform has ZainCash + QiCard stubs (Iraqi payment rails). Stripe is not wired.

**My recommendation: free MVP; freemium in v1.** The Iraqi rails are not international-economy friendly; the platform's existing customer base is local. A free research product builds the corpus-and-brand; freemium (quotas + paid exports) when the eval harness proves quality.

## 4. Risk-adjusted verdict

- **Both option A and option B are viable; option B is cleaner.** 
- **The estimated effort is 6–10 weeks for v1 with reuse of agents_manager + platform locale routing + Drizzle.** Greenfield would be 12–20 weeks (Angle D's estimate).
- **The ceiling is "Perplexity Pro + NotebookLM + Elicit, but open-source, audit-friendly, AR-first, and integrated with the user's existing Iraqi platform."** Not a moonshot; a re-positioning.
- **The floor is "Markdown-only research reports behind a topic input, no auth, no renderer."** ~3 weeks if the user accepts "MVP single-tenant demo."

## 5. Bias check (my own)

- **I am giving "reuse the existing orchestrator" too high a weight.** It is the orchestrator we've built, and it is good, but a 10-agent dispatch for a "what is X?" question is overkill. The MVP should be a single-agent tool loop (Angle D's v1 recommendation); the orchestrator is the v3 layer. I corrected this in Tier 1.
- **I am downgrading Arabic to v1.** The user's prior research pattern (Arabic dossiers, Iraqi platform) argues for AR from MVP. I should make this the recommended default, not a tier-2 item. **Corrected in §3.2.**
- **I am treating the Iraqi platform as separate from the research product.** The user might want them merged. I should not decide that — that is a user question.
- **I am assuming single-developer capacity.** If the user has a team, the timeline halves.

## 6. Non-negotiables for the planning phase

1. Surface the 6 user decisions in `01_research_T-2026-08-13-002.md` §9 to the user explicitly before planning.
2. The plan must include a "ship EN + AR" first option, not "EN first, AR later" as the default.
3. The plan must include the NextAuth + multi-tenant + queue (BullMQ/Inngest) layer as a hard prerequisite — without it, two concurrent users collide on the bus.
4. The plan must include a `lib/citations.ts` + `lib/synthesis.ts` + `lib/abstain.ts` skeleton in MVP, not v2.
5. The plan must include an eval harness (RAGAS or LLM-as-judge) gate before any new feature lands.
6. The plan must respect the user's audit-trail culture — every run writes to `share/notes/<runId>/` so the user can replay the research story.

## 7. Decision proposal for the user

I will surface a `question` to the user with these 6 decisions once the planning phase is dispatched. If the user wants to skip the interactive Q&A, the defaults are:

- Architecture: option B (new `research_app/`).
- Locale: EN + AR MVP, KU deferred.
- LLM provider: Anthropic Claude (Sonnet 4 for v1, Opus 4 for v3 orchestrator).
- Monetization: free MVP, freemium v1.
- Distribution: open-source the engine, keep the product open-source.
- MVP scope: Tier 1 from §2 above.
