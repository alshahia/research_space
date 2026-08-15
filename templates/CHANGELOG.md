# Changelog - agent-app-template family

All notable changes to the `templates/` family are documented here. Format: Keep-a-Changelog 1.1; this project does not use SemVer at the family level (each template's `package.json` does).

## [Unreleased]

### Pending
- Phase 3.0 lands the family root (this file), the registry, the verify-stack-claims drift gate, and the archive move of `resources/general-app-template/`. First template (tier1-standard) lands in Phase 3.1.

## [1.0.0] - 2026-08-14 - Phase 3.0 ship (PENDING)

### Added
- `templates/AGENTS.md` - family-root standing instructions, 7-template index, 13-step deterministic selection rule.
- `templates/CLAUDE.md` - Claude Code `/init` alias.
- `templates/README.md` - human entry point with quick start and pointers.
- `templates/registry.json` - machine-readable `{tiers, kinds, routing}` mirror of the selection rule.
- `templates/MIGRATION.md` - pointer from this root to `resources/_archived/general-app-template/`.
- `templates/dependabot.yml` - weekly `npm audit` + `npm view <pkg> version` schedule.
- `scripts/verify-stack-claims.ts` - drift gate over `research/agent-app-templates-2026-08-13/02_STACK_MATRIX.md`. Stdlib + `npm view` only; no external deps.
- `MAINTAINERS.md` - single named maintainer per quarter (per Q6 A); placeholder name; 1-2 days/quarter budget.

### Changed
- `resources/general-app-template/` moved to `resources/_archived/general-app-template/` per Q3 B. Move-not-delete; `MIGRATION.md` added at the new path.

### Notes
- No `package.json` was written in Phase 3.0; the gate lands before any template scaffold per Q5.
- Seven templates planned (tier2-tooling dropped per Q1 D); tier2-saas-bundle added back per Q8 modifier.
