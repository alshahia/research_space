# OpenCode SDK v1.18.18 surface gotchas (T-2026-08-18-003)

Repo: research_space (dossier folder `opencode-sdk-agent-docs/agents/`). Facts verified by live probe + runs on 2026-08-18 against CLI 1.18.3 / SDK 1.18.18 / bun 1.3.14.

1. **`client.global.health()` does NOT exist on the v1 default import.** The v1.18.18 Global namespace only exposes `event`; the v2 subpath has `health` (fetch that instead). Server endpoint `GET /global/health` answers `{"healthy":true,"version":"1.18.3"}` over loopback - probe it directly when the plan/recipe says "client.global.health()".
2. **`server.url` has NO trailing slash** at runtime (`http://127.0.0.1:47831`). Recipe prose shows a trailing slash notationally.
3. **`body.format` (json_schema) is not in the v1 `SessionPromptData` type**; the server still accepts it in the body. On a structured-output failure this server reports `data.info.error.name = "APIError"` with an EMPTY `parts` array (not the dossier's single verified name `StructuredOutputError`).
4. **Forced-404 discipline:** `session.get` on a MALFORMED id string returns HTTP 500; a well-formed missing id (`ses_` + 24 chars, e.g. `ses_aaaaaaaaaaaaaaaaaaaaaaaa`) returns the real 404 with `message: Session not found: <id>`, `.cause.status = 404`, `.cause.body` present.
5. **Runtime SSE event `type` strings (`server.connected`, `tui.toast.show`, `server.heartbeat`) differ from the generated type NAMES** (`EventServerInstanceDisposed`, ...). Print the runtime discriminator defensively; never switch on generated names.
6. `client.session` / `client.event` expose methods on the prototype (own keys show only `_client`) - do not assert surfaces via `Object.keys`.

Memory written: agents_manager/coder/notes/semantic/opencode-sdk-v1-18-18-surface-gotchas.md