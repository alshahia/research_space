# Live-validation choices - T-2026-08-18-001

**Captured:** 2026-08-18
**Scope change:** `share/handoffs/02_user_scope_change_T-2026-08-18-001.md`
**Zen research:** `share/notes/01_research_T-2026-08-18-001_zen-live-validation.md`

## Confirmed user choices

1. Primary provider/model: OpenCode Zen free option, exact target `opencode/deepseek-v4-flash-free`.
2. Cost boundary: do not use a paid OpenCode Zen model or paid fallback. The user has no paid Zen credit.
3. Backup provider: OpenCode Go. Its API key is already configured globally in the local OpenCode CLI. Never read, print, copy, or store the key.
4. Structured output: include a live `json_schema` test.
5. Events: include both the SDK subscription and a bounded raw SSE diagnostic.
6. Data boundary: synthetic, non-sensitive prompts only because free-model data may be used to improve the model.

## Required backup verification

- Verify the local OpenCode Go provider ID and exact DeepSeek V4 Flash model ID before planning.
- Verify whether the current model is affected by issue #43146 or any newer official issue.
- If the matching Go model is unavailable, do not choose another paid model without user approval.
- If the matching Go model is available but raises a known upstream incident, record the issue as hands-on evidence rather than hiding it.

## Planned execution order

1. Run credential-free SDK and server checks.
2. Run the minimal Zen free-model prompt, structured output, and SDK/raw SSE checks under strict time/token bounds.
3. Use OpenCode Go only if Zen returns a known free-limit, gateway, or SSE incident.
4. Stop after the bounded backup check. No model shopping or repeated billable retries.
5. Record sanitized evidence and cleanup results in the final dossier.
