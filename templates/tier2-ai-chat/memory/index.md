# tier2-ai-chat — memory index

What this tier is for, who it serves, and the one-paragraph mental model.

## One-paragraph model

`tier2-ai-chat` is the AI chat tier of the agent-app-template family. It is `tier1-standard` plus a **dual-path AI SDK spine**: Path A = Vercel AI SDK 7 direct (Google / Anthropic / OpenAI / MiniMax via `@ai-sdk/openai` openai-compat baseURL); Path B = OpenCode SDK bridge (`@opencode-ai/sdk` over `opencode serve`). The user picks the path at intake via `tier.config.json` axis `modelPath`. When the user's idea is **chat / assistant / GPT / Claude / LLM / copilot / agent (in chat sense)** (selection-rule step 2), pick this tier and follow its `SKILL.md`.

The 19 skeleton files are the load-bearing artifact: the skeleton must `npm install && npm run build && npm test` exit zero on a fresh clone, the smoke test must render `<App />` with at least one user/assistant bubble for Path A, and the OpenCode bridge unit test must compile against a stubbed `@opencode-ai/sdk` client. Every `package.json` dep must cite `chub get <id>` (Q5 hard rule) with the matching `[Sn]` from `02_STACK_MATRIX.md`.

## Memory files in this directory

| File | Purpose | Loaded when |
|---|---|---|
| `index.md` | This file — what this tier is for. | Tier picked. |
| `dos-and-donts.md` | Distilled rule list. | Before any `edit` call. |
| `reference-projects.md` | One canonical example (no code copy). | Before scaffolding. |

## What this tier inherits (do not re-derive)

- **Tier 1 base spine** from `templates/tier1-standard/` (file layout, tsconfig, vitest config, audit-log pattern, DatabaseProvider stub, cn() helper).
- **AI chat minimum-viable feature set** from `02_STACK_MATRIX.md` AI chat row:
  - Streaming responses (Path A) / agent-shaped latency (Path B).
  - Multi-turn persistence (one `messages` table).
  - Markdown rendering with code highlighting (`react-markdown` + `remark-gfm` + `rehype-highlight`).
  - Stop / cancel button.
  - Per-user conversation history.
- **Path B capability research** from `share/notes/04_opencode_research_T-2026-08-14-001.md` — confirms `@opencode-ai/sdk` 1.18.18 (matches host opencode CLI 1.18.5), `session.prompt()` shape, port-discovery via `opencode serve --port 0`.

## What this tier does NOT cover (deferred to tier2 or tier1)

- Mobile shell (Expo / Capacitor) → `tier2-mobile`.
- Commerce backend → `tier2-storefront`.
- Stripe Billing + MRR shapes → `tier2-saas-bundle`.
- Static landing pages → `cinematic-landing`.
- ~150-line brochure sites → `tier0-minimal`.
- Tier 1 CRUD dashboards → `tier1-standard` (or `tier1-standard + admin layer`).

## See also

- `../SKILL.md` — Anthropic Skills Level 1+2 instructions.
- `../prompts/intake-standard.md` — the intake prompt with `modelPath` + `modelFamily` axes.
- `../decisions/decision-log.md` — append-only decision log.
- `../../../research/agent-app-templates-2026-08-13/02_STACK_MATRIX.md` row 1 — canonical AI chat pins (READ-ONLY).
- `../../../share/notes/04_opencode_research_T-2026-08-14-001.md` — OpenCode capability research.
- `../tier1-standard/SKILL.md` — parent spine (READ for conventions).
