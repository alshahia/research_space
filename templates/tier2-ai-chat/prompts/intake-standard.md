# Intake prompt — tier2-ai-chat

Use this prompt at the start of every Tier 2 ai-chat build. Batched (one message), MC over open-ended, one default per axis. Per `04_INTAKE_PROTOCOL.md`.

## The prompt (copy-paste)

> **Building a Tier 2 AI chat app. Answer these eight in one word each, or "skip" to take every default:**
>
> 1. **Kind?** (1-9, default 5 = AI chat)
>    1. Landing / marketing · 2. Dashboard / CRUD · 3. SaaS (auth+billing) · 4. Mobile · 5. AI chat · 6. Storefront · 7. Content / docs · 8. Bot / extension / CLI · 9. Not sure
> 2. **Tier?** (1-3, default 2 = Tier 2)
> 3. **Path?** (A or B, default A = Vercel AI SDK direct)
>    - **A** = Vercel AI SDK direct (`@ai-sdk/openai` / `@ai-sdk/anthropic` / `@ai-sdk/google`). Snappy streaming. You bring your own API keys.
>    - **B** = OpenCode SDK bridge (`@opencode-ai/sdk` over `opencode serve`). Agent-shaped latency (5-60s per message). Uses the opencode host's existing provider config; no API keys in `.env`.
> 4. **Model family?** (Path A only; default `google` = Gemini)
>    - `google` · `anthropic` · `openai` · `minimax` (via openai-compat baseURL)
> 5. **Data?** (1-6, default 2 = SQLite/Postgres)
> 6. **Auth?** (1-4, default 3 = magic-link / OAuth)
> 7. **Locale?** (1-5, default 1 = English LTR)
> 8. **Out of scope (v1)?** (list any of 1-8, default none)
>    1. Payments · 2. Notifications · 3. Realtime · 4. Search · 5. Uploads · 6. Charts · 7. Mobile-specific UX · 8. i18n beyond the locale
>
> Reply in one line: `"<kind>, <tier>, <path>, <modelFamily>, <data>, <auth>, <locale>, <scope>"` or `"skip"` to take every default.

## Adaptive axes (fired only when unlocked)

- **Tool use / function calling** — fired only if Kind = 5 (AI chat) and the user said "agent", "autonomous", "do X for me", or named specific tools. (Path A: AI SDK's `tool()` helper. Path B: OpenCode's built-in tools via `session.prompt()`.)
- **Stop / regenerate UI** — always required (path-agnostic).
- **Multi-turn persistence** — always required (writes to `messages` table).
- **Model switcher** — optional but recommended. 2 models cover 90% of users.

Hard cap: 10 axes for Tier 2 (per `04_INTAKE_PROTOCOL.md` Per-tier budget).

## What the agent does next

1. Parse the 8 axes (or apply defaults).
2. Write `SPEC.md` from `templates/tier2-ai-chat/skeleton/SPEC.md` (restate-and-confirm artifact template).
3. User replies "go" or "change X to Y".
4. `cp -r templates/tier2-ai-chat/skeleton/ ./` (the spine).
5. Customise `tier.config.json` from the path + modelFamily answers.
6. Wire `.env` from the path answer:
   - **Path A**: set the provider key(s) for the chosen family (`GOOGLE_API_KEY` / `ANTHROPIC_API_KEY` / `OPENAI_API_KEY` / `MiniMax_API_KEY`).
   - **Path B**: no `.env` changes; uses OpenCode's existing provider config.
7. Run `npm install` + the Tier 2 done-when gate (`tsc --noEmit && npm run build && npm test && verify-stack-claims.ts`).
8. For Path B: run `pwsh scripts/start-opencode-server.ps1` to bootstrap the local `opencode serve`. Skip in CI / non-Windows.

## See also

- `04_INTAKE_PROTOCOL.md` — full question bank + adaptive branching.
- `templates/tier2-ai-chat/SKILL.md` — Tier 2 standing instructions.
- `templates/tier2-ai-chat/skeleton/SPEC.md` — restate-and-confirm template.
- `../../../share/notes/04_opencode_research_T-2026-08-14-001.md` — Path B capability research.
- `../../../research/agent-app-templates-2026-08-13/02_STACK_MATRIX.md` row 1 — canonical AI chat pins.
