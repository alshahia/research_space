# tier2-ai-chat — reference projects

One canonical Tier 2 ai-chat example. Read before scaffolding. **No code copy-paste — the example is a reference shape, not a template.**

## The example

**Vercel AI Chatbot** (`https://github.com/vercel/ai-chatbot`) — the reference Next.js App Router chat template from the Vercel AI SDK team. Uses `streamText` + `useChat` + `react-markdown` + `remark-gfm` + `rehype-highlight`. Multi-turn persistence in Postgres (Drizzle). Auth via Auth.js. The canonical shape for AI SDK 4+/5+/6+/7 chat.

Why this is a good Tier 2 ai-chat reference:

- **Path A spine.** `app/(chat)/api/chat/route.ts` calls `streamText({ model: getModel(), messages })` and returns a `StreamingResponse`. `useChat()` from `@ai-sdk/react` consumes the stream on the client. Single source of truth for the model registry in `lib/models.ts`.
- **Markdown rendering.** `components/markdown.tsx` wires `react-markdown` + `remark-gfm` + `rehype-highlight` (or `rehype-pretty-code` in newer versions). Sanitization via `react-markdown`'s default schema — NEVER `dangerouslySetInnerHTML`.
- **Stop / cancel / regenerate.** `useChat()` exposes `stop`, `reload`, `regenerate`. Three buttons in the message bubble's action bar.
- **Multi-turn persistence.** Drizzle schema for `messages(id, conversationId, role, content, createdAt)`. The `useChat()` hook loads history on mount via `api/history`.
- **Model registry.** `lib/models.ts` exports `getModel()` keyed by a `modelId` from the request body (or a `tier.config.json`-equivalent env var). Provider wiring (`createAnthropic`, `createOpenAI`, `createGoogleGenerativeAI`) at the top; switch by env var.

## What to copy from the example

- **Route handler shape.** `app/api/chat/route.ts` is a 30-line file: parse request body, call `streamText`, return `StreamingResponse`. The whole "AI backend" lives in this one file.
- **Provider registry.** `lib/models.ts` is a switch statement that returns the right `LanguageModel` based on `modelFamily`. OpenAI-compatible targets (MiniMax) use `createOpenAI({ baseURL, apiKey })`.
- **Markdown component.** A single `<Markdown>` wrapper around `react-markdown` + `remark-gfm` + `rehype-highlight`. Used everywhere model output is rendered.
- **`useChat()` shape.** Messages flow as `{ role, content }` objects. The hook handles optimistic updates + streaming + cancellation for free.

## What NOT to copy

- **Next.js App Router shape (`app/(chat)/page.tsx` + `layout.tsx`).** Tier 2 ai-chat is Vite + React 19; the spine ships `<App />` as a single component. Swap App Router for Vite routing (or `react-router-dom` if multi-page is needed).
- **Auth.js integration.** Tier1's spine doesn't wire auth. Tier2-saas-bundle picks its own vendor. Don't copy Auth.js here.
- **Upstash Redis for rate limiting.** Out of scope for the spine; defer to the data layer.
- **Resend for email notifications.** Same — out of scope.
- **Their exact prompt engineering.** Vercel's `lib/prompts.ts` is opinionated; user fills in their own system prompt.

## Other examples worth skimming (for shape, not code)

- **Anthropic's Claude chat template** (`https://github.com/anthropics/anthropic-quickstarts`) — minimal Vite + Claude API + streaming; demonstrates the Path A wiring without AI SDK (raw `messages.stream()`). Good baseline for what AI SDK abstracts.
- **OpenAI's Next.js chat example** (`https://github.com/openai/openai-chatbot`) — uses the OpenAI Node SDK directly (not AI SDK); demonstrates the same shape without provider abstraction.
- **OpenCode ecosystem chat examples** (`https://opencode.ai/docs/ecosystem/`) — community projects using `@opencode-ai/sdk` to build chat UIs; reference for Path B shape.

## The 1 thing that breaks Tier 2 ai-chat most often

Markdown XSS. Model output piped through `dangerouslySetInnerHTML` (or `react-markdown` without `remark-gfm`'s URL hardening) lets an attacker craft a prompt that injects `<script>` tags or `javascript:` URLs. Per `02_STACK_MATRIX.md` AI chat "Agent failure modes" row 3: "Pipe through `react-markdown`, never `dangerouslySetInnerHTML`." The `react-markdown` default schema strips script tags + event handlers; `remark-gfm` autolinks with `javascript:` URL filtering.

## See also

- `index.md` — what this tier is for.
- `dos-and-donts.md` — distilled rule list.
- `../SKILL.md` § Done — Tier 2 definition-of-done.
- `../../../share/notes/04_opencode_research_T-2026-08-14-001.md` — Path B OpenCode capability research.
- `../../../research/agent-app-templates-2026-08-13/01_RECOMMENDED_DESIGN.md` Decision 4 (tier map), Decision 6 (definition-of-done).
