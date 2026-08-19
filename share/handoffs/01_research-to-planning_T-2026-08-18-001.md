# Research to planning handoff - T-2026-08-18-001

**Created:** 2026-08-18 08:37 UTC+3
**Research:** `share/notes/01_research_T-2026-08-18-001.md`
**User task:** `share/handoffs/00_user_task_T-2026-08-18-001.md`
**Final folder:** `opencode-sdk-agent-docs/`

## Confirmed user decisions

1. SDK focus: anchor on the public v1 API and include an explicit v2 delta, import paths, migration notes, and version probe.
2. Runtime patterns: cover both server-owning long-lived agents and short-lived clients that connect to an existing server.
3. Prerequisites: include OpenCode CLI installation, PATH/version checks, and health preflight.
4. API map: one unified namespace map with v1/v2/both markers plus a focused v2-delta section.
5. Reader-facing progress: create `opencode-sdk-agent-docs/progress.md`; retain the controller ledger separately in `share/notes/`.

## Verified research gate

- Artifact: 274 lines, 42,391 characters.
- Metrics: 31 findings; risks 0 HIGH / 5 MEDIUM / 2 LOW; 5 questions answered above.
- Official spot-check: `npm install @opencode-ai/sdk` confirmed by the official page; package source confirms v1.18.18 and explicit `./v2` exports.
- Context Hub search returned no OpenCode SDK registry entry. Official docs/source fallback is approved.
- No anomalous content.

## Planning constraints

- Produce a complete agent/LLM-facing dossier plan, not application code.
- Keep the folder easy to navigate. Prefer a small set of substantial files over many thin files.
- Cover quick start, decisions, unified API map, instructions, dos/don'ts, lifecycle/security/errors/events, known issues with solutions, examples, source ledger, and progress.
- Every planned example must name its validation method. Examples must pin the model where relevant and must not use `createOpencodeTui()` from a non-interactive agent.
- Pin time-sensitive claims to access date 2026-08-18 and SDK/package version 1.18.18.
- Preserve explicit caveats where endpoint body shapes were not fully verified in research.
- No commits.
