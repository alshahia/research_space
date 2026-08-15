# Migration - templates/ root

This is the **new root** for the agent-app-template family. Created 2026-08-14 per `share/handoffs/00_decisions_T-2026-08-14-001.md` Q3 B.

If you are looking for the prior template (`general-app-template/`), it has been **moved, not deleted**, to:

```
resources/_archived/general-app-template/
```

That archive contains a `MIGRATION.md` that points back to this root. In-flight work that imports from `resources/general-app-template/...` will keep working (the folder still exists under the archive prefix), but new work should target a specific template under `templates/<tier>/skeleton/`.

## Why move rather than edit

| Path | Status |
|---|---|
| `templates/` | NEW root for the 7-template family (one folder per template; deterministic selection rule in `AGENTS.md`) |
| `resources/general-app-template/` | ARCHIVED - kept for in-flight reference, no further development |
| `resources/_archived/general-app-template/` | canonical archive location (move-not-delete per Q3 B) |

## What changes for you

- **Picking a template:** read `templates/AGENTS.md` -> run the 13-step selection rule -> cite the matching step number in your summary.
- **Building an app:** `cp -r templates/<tier>/skeleton/ <my-app>/` -> edit `tier.config.json` for locale/dir/font -> `npm install && npm run build && npm test`.
- **Adding a new template:** open a PR to `templates/AGENTS.md` + `templates/registry.json` first. Silent additions are rejected.
- **Drift detection:** `node scripts/verify-stack-claims.ts` (at the workspace root) re-checks every pinned version in `research/agent-app-templates-2026-08-13/02_STACK_MATRIX.md`. Exits 1 on mismatch.

## What does NOT change

- The 9 locked decisions in `share/handoffs/00_decisions_T-2026-08-14-001.md`. Q3 B explicitly chose "start new beside, archive old".
- The canonical research dossier (`research/`, `research_doc/`). Both remain READ-ONLY.
- The `agents_manager/` controller. Not a controller release; no VERSION bump.

See also:

- `templates/AGENTS.md` - the family rules.
- `templates/README.md` - human entry point.
- `resources/_archived/general-app-template/MIGRATION.md` - counterpart from the archive side.
