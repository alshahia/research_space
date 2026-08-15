# Build spec — restate-and-confirm artifact

**Date:** <YYYY-MM-DD>
**Template:** tier2-ai-chat
**Selection-rule step:** <2> (chat / assistant / LLM / copilot / agent)

## App idea (your words)

> <verbatim user input>

## Axes (filled by intake)

| Axis | Answer | Default? | Notes |
|---|---|---|---|
| **Kind** | <AI chat / agent / assistant / copilot> | 5 (AI chat) | |
| **Tier** | 2 | 2 | |
| **Path** | <direct (A) / opencode (B)> | direct (A) | Path A = Vercel AI SDK 7 direct; Path B = OpenCode SDK bridge. See `SKILL.md` §Dual-path setup. |
| **Model family** | <google / anthropic / openai / minimax> | google | Path A only. Ignored when Path = opencode. |
| **Data** | <browser-only / SQLite / hosted BaaS / serverless KV / external / none> | 2 (SQLite) | tier2-saas-bundle wires Drizzle + Postgres. |
| **Auth** | <anyone / email+password / magic-link+OAuth / multi-tenant+roles> | 3 (magic-link+OAuth) | tier2-saas-bundle picks the vendor. |
| **Locale** | <English LTR / Arabic RTL / Kurdish RTL / bilingual / other> | 1 (English LTR) | |
| **Scope (OUT of v1)** | <payments / notifications / realtime / search / uploads / charts / mobile-UX / i18n> | none | |

## Stack (per `02_STACK_MATRIX.md` tier2-ai-chat block)

- Tier 1 spine: React 19 + Vite 8 + TypeScript 5 (strict) + Tailwind v4 + Drizzle + Vitest
- Path A: Vercel AI SDK 7 (`ai`) + `@ai-sdk/openai` + `@ai-sdk/anthropic` + `@ai-sdk/google`
- Path B: `@opencode-ai/sdk` (HTTP client over `opencode serve`)
- Markdown: `react-markdown` + `remark-gfm` + `rehype-highlight`

## What I will build

- Chat UI with user/assistant bubbles; streaming responses (Path A) / agent-shaped responses (Path B).
- Stop / cancel / regenerate buttons.
- Model registry (`src/lib/models.ts`) keyed by `tier.config.json` `modelFamily`.
- OpenCode bridge (`src/lib/opencode.ts`) with per-conversation session caching.
- Markdown rendering with code highlighting.
- Smoke test rendering `<App />` with seed messages.
- OpenCode bridge unit test with stubbed SDK client.

## What I will NOT build (per your scope answer)

- <bullet per out-of-scope answer>
- Mobile shell → tier2-mobile
- Commerce backend → tier2-storefront
- Stripe Billing → tier2-saas-bundle
- Real `/api/chat` route handler — out of scope for the spine; production builds wire it

## Confidence

<0.85+ = green / 0.7–0.85 = yellow, here are the gaps / <0.7 = red, ask more>

| Sub-axis | Confidence (0-1) |
|---|---|
| Kind | |
| Path | |
| Model family | |
| Locale | |
| **Mean** | |

## Tier 2 done-when (per `01_RECOMMENDED_DESIGN.md` Decision 6 ai-chat row)

```bash
cd templates/tier2-ai-chat/skeleton
npm install
npx tsc --noEmit
npm run build
npm test                                                # smoke.test.ts + opencode-bridge.test.ts
node ../../scripts/verify-stack-claims.ts               # workspace root drift gate
```

All five must exit zero before this build is "done" for the Tier 2 ai-chat spine.

**Reply "go" to start, or "change X to Y" to adjust.**
