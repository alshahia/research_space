# OpenCode CLI Capability Research — T-2026-08-14-001

**Date:** 2026-08-14
**Author:** master (on user directive: "research on it and save the result")
**Scope:** Support `tier2-ai-chat` Phase 3.2 dual-path spine decision (Path A = Vercel AI SDK direct, Path B = OpenCode SDK/CLI bridge).
**Hard constraint (user):** do NOT install / remove / kill the existing OpenCode CLI on this Windows box. Read-only research + do not mutate `~/.config/opencode/`.
**Sources:** Host probe (`opencode --version`, `opencode models`, `opencode providers ls`, `~/.config/opencode/opencode.json`); net docs at `https://opencode.ai/docs/sdk/` and `https://opencode.ai/docs/cli/` (accessed 2026-08-14). No `chub get` used — OpenCode is not in the chub registry (confirmed via `chub search opencode` → empty).

---

## 1. OpenCode CLI on this host (verified 2026-08-14)

| Property | Value |
|---|---|
| Binary | `C:\Users\AhmadMhmoud\AppData\Roaming\npm\opencode.ps1` |
| Version | v1.18.5 |
| Global config | `C:\Users\AhmadMhmoud\.config\opencode\opencode.json` (1,412 bytes) |
| Server binary | `opencode serve --port <port> --hostname <hostname>` (default port 0 = random; hostname default 127.0.0.1) |
| Running agents on this host | the `master` agent (per system prompt) — currently running on `model_id = minimax-coding-plan/MiniMax-M3` |
| Auth state (env vars) | HAS `GOOGLE_API_KEY`, `GEMINI_API_KEY` (both 39 chars). MISSING `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, `MiniMax_API_KEY`. |
| Auth state (`opencode providers ls`) | Confirms providers mounted in `~/.config/opencode/opencode.json` "provider" sections — list mirrors the `opencode models` entries below. |

## 2. Models available via `opencode models` (the relevant subset)

| Model ID | Provider / API | Notes |
|---|---|---|
| `opencode-go/minimax-m3` | MiniMax-M3 via OpenCode gateway | The model the system prompt claims is "powered by MiniMax-M3" — by model name, the OpenCode gateway version. |
| `minimax-coding-plan/MiniMax-M3` | MiniMax direct, OpenAI-compatible | The model `model_id` field actually references. Direct plan-billed MiniMax, not routed through OpenCode. |
| `opencode-go/minimax-m2.7` | MiniMax-M2.7 via OpenCode | Older MiniMax. |
| `opencode-go/gpt-5.6-luna` | OpenAI via OpenCode | One of several GPT variants. |
| `opencode-go/grok-4.5`, `opencode-go/qwen3.6-plus`, `opencode-go/glm-5.3`, `opencode-go/kimi-k3`, `opencode-go/mimo-v2.5-pro` | Various via OpenCode | All served from OpenCode's gateway. |
| `google/gemini-2.5-flash`, `google/gemini-2.5-pro`, `google/gemini-3.1-flash-lite` | Google direct (NOT via OpenCode) | Pricing tier matches `GOOGLE_API_KEY`. Cheapest path on this box: `gemini-2.5-flash`. |
| `minimax-coding-plan/MiniMax-M3` | `Provider=OpenAI compatible, baseURL=https://api.minimaxi.com/v1`, `MiniMax_API_KEY` | Confirms MiniMax exposes an OpenAI-compatible endpoint — `@ai-sdk/openai` can hit it with `baseURL` + `apiKey` overrides. |

## 3. OpenCode SDK shape (from `https://opencode.ai/docs/sdk/`)

Methods surfaced from `opencode serve`:

| Method | Path | Purpose |
|---|---|---|
| `session.prompt({ path: { id }, body: { parts, outputFormat? } })` | POST | Send a message; default returns the full `AssistantMessage`; supports `body.outputFormat` for structured output (e.g., `zod` schema or `json_schema`). |
| `session.messages({ path: { id } })` | GET | List messages on a session. |
| `session.chat.cancel/abort/command/...` | POST | Per-session control (cancel mid-stream, abort, run shell-style commands). |
| `find.text`, `find.files`, `file.read` | POST | Code-search / file-read helpers (built into OpenCode; no extra package). |

**Crucial property:** `session.prompt()` runs the configured AGENT end-to-end. It is NOT a raw LLM-completion gateway. Each prompt invokes the agent (e.g., `master`), which itself calls LLM + tools + MCPs + skills. Output is what the agent returns. → High latency for chat (full agent loop per user message), low latency ceiling for chat UIs.

## 4. CLI commands (from `https://opencode.ai/docs/cli/`)

| Command | Notes |
|---|---|
| `opencode serve [--port P] [--hostname H]` | Headless server. Port `0` = random (CLI prints actual port on stdout). Hostname default `127.0.0.1`. |
| `opencode run "message" [--format json]` | One-shot CLI invocation: spawns child, runs agent on the message, prints output (text or `--format json`). No session continuity. |
| `opencode models` | Lists all model IDs this OpenCode install can route. |
| `opencode providers ls` | Lists providers + credentials state (no secret values; status only). |
| `opencode attach <url>` | Attach a client/agent to an existing `opencode serve` URL. Useful for multi-agent setups. |

## 5. Why two paths? And why this fits the user's intent (verbatim)

User's request chain across 2026-08-14 chat:
- "opencode go" → the OpenCode CLI as a provider (Path B).
- "minimax token plan provider" → MiniMax's billing path (works in BOTH paths — in A via custom baseURL on `@ai-sdk/openai`; in B as the default model OpenCode is configured for).
- "gemini model" → Google Gemini family (works in BOTH — in A via `@ai-sdk/google`; in B because OpenCode's global config already wires Google).
- "you provide two options either ai from scratch or with opencode" → TWO paths, user choice. → Final design below.
- "support all allow the user to choose" → intake-driven model family selection in `tier.config.json`.
- "MiniMax model is openai compatible" → confirms `@ai-sdk/openai` + custom `baseURL` works.

## 6. Locked design — `tier2-ai-chat` dual-path spine

### Path A — Vercel AI SDK direct ("AI from scratch")

- Install: `@ai-sdk/react` `^7.0.64`, `@ai-sdk/anthropic` (vendor), `@ai-sdk/openai` (vendor — used for ALL OpenAI-compatible targets including MiniMax), `@ai-sdk/google` (vendor).
- Provider wiring: `src/lib/models.ts` exports a registry keyed by tier.config intake axis `modelFamily`. Default = `google/gemini-2.5-flash` (cheapest, `GOOGLE_API_KEY` already on this box).
- Per-provider overrides:
  - **Google:** `createGoogleGenerativeAI({ apiKey: process.env.GOOGLE_API_KEY })` → model = `gemini-2.5-flash`.
  - **Anthropic:** `createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY })` → model = `claude-sonnet-4-6` (verify at scaffold).
  - **OpenAI-compatible (MiniMax, others):** `createOpenAI({ apiKey: process.env.MiniMax_API_KEY, baseURL: process.env.MiniMax_BASE_URL ?? 'https://api.minimaxi.com/v1' })` → model = `MiniMax-M3`.
  - **OpenAI direct:** `createOpenAI({ apiKey: process.env.OPENAI_API_KEY })` → model = `gpt-5.6` (verify at scaffold).
- Server route: `src/app/api/chat/route.ts` does `streamText({ model: getModel(), messages })` + `StreamingResponse` to `useChat`.
- `.env.example` documents: `GOOGLE_API_KEY`, `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, `MiniMax_API_KEY`, `MiniMax_BASE_URL`.

### Path B — OpenCode SDK/CLI bridge ("with opencode")

- Install: `@opencode/sdk` (the typed JS/TS client — comes from OpenCode; pin re-verified at scaffold).
- Server bootstrap: `scripts/start-opencode-server.ps1` (or `.sh`) shells out to `opencode serve --port 0 --hostname 127.0.0.1`, parses stdout for the chosen port, writes `OPENCODE_URL=http://127.0.0.1:<port>/` to `runtime/opencode-url.txt` (gitignored).
- Client: `src/lib/opencode.ts` exports `createOpencodeClient()` that reads `process.env.OPENCODE_URL` (or `runtime/opencode-url.txt` as fallback) and constructs the client.
- Chat route: `src/app/api/chat/route.ts` (Path B variant, replaceable via `tier.config.json` intake axis `modelPath: "direct" | "opencode"`) calls `client.session.prompt({ path: { id: sessionId }, body: { parts: [{ type: 'text', text: userMessage }] } })`.
- Two sub-paths under Path B:
  - **B1 — Session-based** (default): one OpenCode session per conversation. Stores session IDs per-conversation in DB. Heavier per message but supports multi-turn thread continuity in OpenCode's audit log + shareable session URLs.
  - **B2 — `opencode run` shell** (lighter alternative): spawn `child_process.spawn('opencode', ['run', userMessage, '--format', 'json'])` per message; one-shot. Loses session continuity but is simpler. Toggle via `tier.config.json`.
- Auth: ZERO keys in `.env`. Auth state is OpenCode's existing config (`~/.config/opencode/opencode.json`). Whatever providers are configured there are what `session.prompt()` will route through.
- Default model for Path B = whatever OpenCode is set to (here, `minimax-coding-plan/MiniMax-M3` on this host).
- Caveat doc (project-internal note only, never committed): same-box deployment means `opencode serve` + Vite dev server both live on 127.0.0.1. Port collision unlikely because OpenCode defaults to random port (printed on stdout); Vite defaults to `5173`. Document the port-discovery step in `templates/tier2-ai-chat/SKILL.md`.

## 7. Effort re-estimate

Phase 3.2 was 4d as single-path. Dual-path adds ~1 day:
- Path B server bootstrap script (`.ps1` + `.sh`) = 0.25d
- Path B OpenCode SDK client + chat-route variant + smoke test = 0.5d
- Path A multi-vendor registry (`src/lib/models.ts`) + `.env.example` documentation = 0.25d

→ **Revised: 5d**. (Was 4d pre-Decision-D; was 5d post-P2G-B Capacitor bump; net +1d vs the 4d baseline, +0d vs the 5d already in the plan. Updated plan estimate: **5d**.)

## 8. Risks and how they are addressed

| Risk | Likelihood | Mitigation |
|---|---|---|
| `chub search opencode` returns empty (no chub docs for OpenCode) | Confirmed | Document in summary that `verify-stack-claims.ts` is the canonical gate, not chub for OpenCode. chub is only for npm/SDK package verification. |
| OpenCode SDK surface changes between versions | Medium | Pin to a specific minor via `^X.Y.0`; `scripts/verify-stack-claims.ts` audit covers SDK packages too. |
| Path B latency = too slow for chat UX | High (full agent loop per message) | Document explicitly in `SKILL.md` that Path B is for "complex-task" UX, not "snappy chat." Path A is the snappy default. |
| `MiniMax_BASE_URL` changes upstream | Low | `.env` overridable; default pinned to MiniMax's openai-compat endpoint. |
| `GOOGLE_API_KEY` rotates | Medium | `.env.example` documents rotation; smoke test runs against stub provider by default, real provider is opt-in via `MODEL=google` env or tier.config flag. |
| Path A and Path B drifts in UX shape | High | Both paths share `useChatWithHistory.ts` + `MessageList.tsx` + `Markdown.tsx` — only the API route swaps. |

## 9. Deliverables that consume this research

- `share/handoffs/00_decisions_T-2026-08-14-001.md` — Phase 2 Gate D section appended.
- `share/notes/02_plan_high_T-2026-08-14-001.md` — 3.2 row updated (Path A + Path B columns).
- `share/notes/02_plan_phases_T-2026-08-14-001.md` — Phase 3.2 section rewritten with dual-path spec.
- `share/notes/99_decisions.md` — architectural log entry appended.
- `tasks/T-2026-08-14-001.md` — P3T2 row updated + loop history row 8 appended.
- `agents_manager/MEMORY/projects/research-space/playbook.md` — references both paths (write contract).

## 10. What I did NOT do

- **Did not** install, remove, upgrade, or modify `opencode.ps1` or any file under `C:\Users\AhmadMhmoud\AppData\Roaming\npm\opencode\`.
- **Did not** write to `~/.config/opencode/opencode.json` (read-only).
- **Did not** start `opencode serve` on this host (no test invocation needed for capability research).
- **Did not** spawn an OpenCode SDK client to test `session.prompt()` (capability documented from public docs + CLI `models`/`providers ls` output is sufficient).

## 11. Reversibility

Deleting this file is reversible in 30 seconds. The dual-path spine decision is recorded in `share/handoffs/00_decisions_T-2026-08-14-001.md`; if the user reverses Path B, the only consumer files to undo are the Path B files in `templates/tier2-ai-chat/skeleton/` (none written yet — Phase 3.2 not dispatched).
