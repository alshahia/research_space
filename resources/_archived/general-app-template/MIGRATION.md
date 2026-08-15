# MIGRATION - general-app-template (archived)

This folder is the **archived** pre-Phase-3 template. It was moved here on 2026-08-14 per `share/handoffs/00_decisions_T-2026-08-14-001.md` Q3 B (move-not-delete). No further development happens here.

## What you want instead

The new root is `templates/` at the workspace root:

```
templates/
├── AGENTS.md          <- family-root standing instructions, 13-step selection rule
├── README.md          <- human entry point
├── registry.json      <- machine-readable {tiers, kinds, routing}
├── CHANGELOG.md
├── MIGRATION.md       <- counterpart to this file (points back here)
├── dependabot.yml
├── tier0-minimal/          SKILL.md + skeleton/ + memory/ + prompts/ + decisions/
├── tier1-standard/         SKILL.md + ...
├── cinematic-landing/      SKILL.md + ...
├── tier2-ai-chat/          SKILL.md + ...
├── tier2-mobile/           SKILL.md + ...
├── tier2-storefront/       SKILL.md + ...
└── tier2-saas-bundle/      SKILL.md + ...
```

For the full migration rationale (Q3 B's reasoning: maintain the old template as a read-only archive while building the new family beside it), see `templates/MIGRATION.md`.

## Why this folder is kept around

`templates/` is the new home, but any in-flight work or scratch notes that still reference `resources/general-app-template/...` continue to resolve. Nothing in the archive is being deleted. If you need to migrate a quote or a code pattern from this archive into the new family:

1. Identify the target template via the 13-step selection rule in `templates/AGENTS.md`.
2. Open a PR that files the quote/snippet into that template's `memory/` folder (not `skeleton/` - the skeleton is the runnable shape; the memory folder is for distilled patterns).

## What you must NOT do

- Treat anything in this archive as the source of truth for stack pins. The canonical table is `research/agent-app-templates-2026-08-13/02_STACK_MATRIX.md` (READ-ONLY per `AGENTS.md`).
- Copy `AGENT_INSTRUCTIONS.md` or `SYSTEM_PROMPT_AGENT.md` from this archive into a new template's `SKILL.md`. Those files are pre-Anthropic-Skills and pre-Q2-B-build-order; they were superseded by the per-template `SKILL.md` schema (Level 1 metadata + Level 2 instructions).

## Pointers back

- `templates/MIGRATION.md` - counterpart from the new root's side.
- `templates/AGENTS.md` - the family rules and selection rule.
- `share/notes/02_plan_phases_T-2026-08-14-001.md` Phase 3.0 - the spec for the move.
- `share/handoffs/00_decisions_T-2026-08-14-001.md` Q3 B - the locked decision.
