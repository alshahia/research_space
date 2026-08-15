---
name: tier2-ai-chat
description: Tier 2 AI chat template. Vite + React 19 + TS strict + Tailwind v4 + Drizzle + Vercel AI SDK 7 (Path A) + OpenCode SDK bridge (Path B). Dual-path AI spine: user picks path at intake. Cite selection-rule step 2 (chat/assistant/LLM/agent) when picking this template.
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, WebFetch
triggers: tier2, ai-chat, chat, assistant, llm, ai-sdk, opencode, streaming chat, copilot, chat agent
selection-rule: [2]
version: 0.1.0
---

## Purpose

Tier 1 spine + **dual-path AI SDK**. Two co-equal user paths picked at scaffold time via `tier.config.json` axis `modelPath`:

- **Path A** = Vercel AI SDK direct (`@ai-sdk/openai` + `@ai-sdk/anthropic` + `@ai-sdk/google` + openai-compat baseURL for MiniMax).
- **Path B** = OpenCode SDK bridge (`@opencode-ai/sdk` calls `session.prompt()` over `opencode serve`).

When the user's idea is **chat / assistant / GPT / Claude / LLM / copilot / agent (in chat sense)** (selection-rule step 2), pick this template.

## When to use

Pick `tier2-ai-chat` when the build is a streaming chat UI with AI. For agentic multi-step tasks where the AI calls tools autonomously, use `tier2-ai-chat` + the `agent` axis (selection-rule step 13). For pure static landing pages, use `cinematic-landing`. For dashboards, use `tier1-standard`.

## Dual-path setup

`src/lib/models.ts` (Path A) and `src/lib/opencode.ts` (Path B) are the only files that touch the model. Everything else (the React UI, the smoke test, the markdown rendering) is path-agnostic and consumes the registry.

- **Path A** uses AI SDK 7's `streamText()` + `@ai-sdk/react`'s `useChat()` hook (caller wires the route). Provider chosen via `tier.config.json` `modelFamily`: `google` (default, cheapest on this host) / `anthropic` / `openai` / `minimax` (via openai-compat baseURL).
- **Path B** wraps `client.session.prompt()` from `@opencode-ai/sdk`. The bridge spawns or connects to `opencode serve` (started by `scripts/start-opencode-server.ps1`); per-conversation session IDs are cached in `runtime/opencode-sessions.json` (gitignored) keyed by client-supplied `conversationId`. Latency is **agent-shaped** (full agent loop per message), not streaming-token-shaped — by design.

**Path B caveat:** same-box deployment means `opencode serve` + Vite dev server both live on `127.0.0.1`. Port collision is unlikely (`opencode serve --port 0` picks a random port and prints it on stdout; Vite defaults to `5173`). The bootstrap script writes the resolved port to `runtime/opencode-url.txt` (gitignored) and `opencode.ts` reads it back.

## Stack pins (verified 2026-08-14, see `02_STACK_MATRIX.md` tier2-ai-chat block)

- Inherits all `tier1-standard` pins: `react ^19.2.8`, `react-dom ^19.2.8`, `drizzle-orm ^0.45.2`, `tailwindcss ^4.3.3`, `typescript ^5.9.3`, `vite ^8.2.1`, `vitest ^4.1.10`, `@vitejs/plugin-react ^6.0.5`.
- `ai ^7.0.64` [S2] — Vercel AI SDK 7 (Path A spine).
- `@ai-sdk/openai ^4.0.41` (Path A, matches AI SDK 7's provider versioning).
- `@ai-sdk/anthropic ^4.0.38` (Path A).
- `@ai-sdk/google ^4.0.44` (Path A).
- `@opencode-ai/sdk ^1.18.18` (Path B; matches host `opencode --version` 1.18.5; latest published 2026-08-13).
- `react-markdown ^10.1.0` (markdown rendering of model output; `react-markdown` sanitizes by default — never use `dangerouslySetInnerHTML`).
- `remark-gfm ^4.0.1` (GitHub-flavored markdown: tables, strikethrough, autolinks).
- `rehype-highlight ^7.0.2` (code-block syntax highlighting).
- `lucide-react ^1.31.0` (icons).
- `zod ^4.4.3` (structured output schemas).

**Deviation noted:** `@ai-sdk/react` is NOT a separate install — it ships inside the `ai` package as of AI SDK 7.x. Verify at scaffold.

## Standing rules (apply to every Tier 2 ai-chat build)

1. **`SPEC.md` before code.** User picks `modelPath` (Path A / Path B) and `modelFamily` (Path A only) at intake. Default = Path A + Google.
2. **Markdown rendering via `react-markdown`, NEVER `dangerouslySetInnerHTML`.** Model output is untrusted text.
3. **Stop / cancel button is mandatory** (Path A: `stop()` from `useChat`; Path B: `client.session.abort()`).
4. **Path B latency ≠ Path A latency.** Path B is full agent loop per message (5–60s typical). Document this in the user-facing chat copy. Don't promise Path A's "snappy chat" UX when Path B is selected.
5. **Multi-turn persistence is mandatory** (`messages` table + `session_id` column for Path B continuity).
6. **Audit log on every write.** Inherits tier1's `logCreate / logUpdate / logDelete`.
7. **DatabaseProvider wraps `<App />`.** Tier 1 convention; tier2 adds the messages-schema stub.
8. **`cn()` is the only classname helper.** Inherits tier1.
9. **Run `tsc --noEmit && npm run build && npm test` after every edit batch.**
10. **Run `node scripts/verify-stack-claims.ts` after every `package.json` write.** Drift gate.
11. **Cite `chub get <id>` for every new dep in the coder summary.** Q5 hard rule.

## Done (Tier 2 ai-chat definition-of-done)

The Tier 2 ai-chat build is done when **all** of the following exit zero on a fresh clone:

```bash
cd templates/tier2-ai-chat/skeleton
npm install
npx tsc --noEmit
npm run build
npm test                                      # smoke.test.ts + opencode-bridge.test.ts
node ../../scripts/verify-stack-claims.ts     # workspace root drift gate
```

- `tsc --noEmit` — type check passes (Path A and Path B bridge both compile).
- `npm run build` — Vite production build produces `dist/`.
- `npm test` — Vitest runs:
  - `tests/smoke.test.ts` — renders `<App />`, asserts h1 text from `tier.config.json` title + at least one user/assistant bubble rendered for Path A.
  - `tests/opencode-bridge.test.ts` — stubs the `@opencode-ai/sdk` client transport, asserts `session.prompt()` is called with the right shape and the response text is unwrapped from the `AssistantMessage` parts.
- `verify-stack-claims.ts` — every dep with an `[Sn]` citation satisfies the caret range (or appears in `share/notes/03_drift_register_T-2026-08-14-001.md`).

## Failure handling

If any of the above exits non-zero:
1. Re-read the failing command's output.
2. Identify the smallest change that addresses the failure.
3. Apply via `edit` (no rewrites).
4. Re-run the failing command.
5. Cap at 3 retries per command; after that, stop and report partial state to master with the verbatim error.

## Out of scope for this template

- Mobile shell (Expo / Capacitor) → `tier2-mobile`
- Commerce backend (Shopify / Medusa) → `tier2-storefront`
- Stripe Billing + MRR shapes → `tier2-saas-bundle`
- Static landing pages → `cinematic-landing`
- ~150-line brochure sites → `tier0-minimal`

## Files in scope (the load-bearing artifact)

Skeleton files (19):

1. `package.json` — tier1 deps + AI deps.
2. `vite.config.ts` — tier1 config.
3. `tsconfig.json` — strict TS (jsx: react-jsx).
4. `vitest.config.ts` — Vitest preconfigured.
5. `src/main.tsx` — React DOM mount entry.
6. `src/App.tsx` — chat preview with seed messages.
7. `src/index.css` — Tailwind v4 CSS-first + chat styles.
8. `src/lib/utils.ts` — `cn()` helper.
9. `src/lib/audit.ts` — `logCreate / logUpdate / logDelete`.
10. `src/lib/models.ts` — **NEW** Path A registry (`getModel(family)` returns the configured `LanguageModel`).
11. `src/lib/opencode.ts` — **NEW** Path B bridge (`createOpencodeClient()` + session cache).
12. `src/db/DatabaseProvider.tsx` — tier1 storage-adapter pattern (comment notes future `messages` table + `session_id` column for Path B).
13. `tests/smoke.test.ts` — renders `<App />`, asserts h1 + locale + at least one user/assistant bubble for Path A.
14. `tests/opencode-bridge.test.ts` — **NEW** stubs the OpenCode SDK client transport; asserts `session.prompt()` shape.
15. `runtime/.gitignore` — **NEW** keeps `runtime/` out of VCS (per-port, per-machine file).
16. `.env.example` — **NEW** documents all four Path A keys; comments mark Path B as needing none.
17. `scripts/start-opencode-server.ps1` — **NEW** `opencode serve --port 0`; writes resolved URL to `runtime/opencode-url.txt`.
18. `tier.config.json` — `modelPath` + `modelFamily` + locale/dir/font.
19. `SPEC.md` — restate-and-confirm template.

Plus meta files:
- `memory/{index,dos-and-donts,reference-projects}.md`
- `prompts/intake-standard.md`
- `decisions/decision-log.md`

## DB schema extension (Path B continuity)

The tier1 `DatabaseProvider` storage-adapter stub gains a `messages` table with a `session_id: text` column for Path B. The `session_id` stores the OpenCode session ID; Path A rows leave it NULL. tier2-saas-bundle wires Drizzle + Postgres; for the spine, the schema is documented but not migrated.

```ts
// Future extension (out of scope for this dispatch — see DatabaseProvider.tsx comment).
interface Message {
  id: string;
  conversationId: string;
  role: "user" | "assistant";
  content: string;
  sessionId: string | null;   // Path B: OpenCode session ID for resume.
  createdAt: string;
}
```

## Pointers

- `memory/dos-and-donts.md` — distilled rules, distilled from `06_TEMPLATE_AUDIT.md` + the dossier + the OpenCode research note.
- `memory/reference-projects.md` — one canonical Tier 2 ai-chat example.
- `prompts/intake-standard.md` — intake prompt with the two `modelPath` + `modelFamily` axes.
- `decisions/decision-log.md` — append-only.
- `research/agent-app-templates-2026-08-13/02_STACK_MATRIX.md` row 1 — canonical AI chat pins (READ-ONLY).
- `share/notes/04_opencode_research_T-2026-08-14-001.md` — Path B OpenCode capability research.
- `templates/tier1-standard/SKILL.md` — parent spine.

## Versioning

This `SKILL.md` follows the Anthropic Skills Level 1 / Level 2 / Level 3 split. Bumping this template = PR to `SKILL.md` + `package.json` + `CHANGELOG.md` (template root or workspace).
