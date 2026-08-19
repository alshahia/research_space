# User scope change - T-2026-08-18-001

**Captured:** 2026-08-18
**Original task:** `share/handoffs/00_user_task_T-2026-08-18-001.md`
**Current plans:** `share/notes/02_plan_high_T-2026-08-18-001.md`; `share/notes/02_plan_phases_T-2026-08-18-001.md`

## Verbatim user instruction

> use opencode zen provide for deepseek flash v4 free for live sdk to ensure its work and how its work and identify any issue ( if raised ) and to ensure the docs have solid info on hand on case

## Scope change

- Add live SDK execution rather than docs-only validation.
- Target OpenCode Zen as the provider.
- Target the exact current model represented by the user's phrase "DeepSeek Flash V4 free". Research must verify the official display name and SDK identifiers before implementation.
- Exercise a real provider-backed prompt, structured output, event flow, error handling, cleanup, and any other safe SDK paths needed to produce hands-on evidence.
- Capture issues actually raised during testing, their reproduction, root cause when determinable, and a solution/workaround if one exists.
- Add execution evidence to the final dossier without storing credentials, tokens, private URLs, or account details.
- If the exact model is unavailable or not free, stop and surface the verified catalog result. Do not substitute another model without user confirmation.

## Pipeline consequence

- Return to focused Phase 1 research for the current Zen model/auth contract.
- Refine Phase 2 to add bounded credential-safe live validation.
- Present the revised plan at the user confirmation gate before Phase 3.
