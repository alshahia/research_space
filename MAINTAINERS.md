# Maintainers - agent-app-template family

This file is the single source of truth for who owns the `templates/` family (per Q6 A). One named maintainer per quarter, no rotation, 1-2 days/quarter budget. Quarterly reviews cover:

1. `npm view` drift vs `research/agent-app-templates-2026-08-13/02_STACK_MATRIX.md` (drift report from `scripts/verify-stack-claims.ts`).
2. `npm audit` for the seven template skeletons (CVE surfacing).
3. Any `[UNVERIFIED]` items left by Phase 3.x sub-phases (re-verify + pin or document).
4. Tier2-tooling status (currently dropped per Q1 D; revisit if any of extension / bot / CLI becomes a real demand signal).

## Q3 2026 (current)

- **Named maintainer:** TBA - to be filled before the first Phase 3 template ships (per `share/notes/02_plan_phases_T-2026-08-14-001.md` Phase 3.0 spec).
- **Backup contact:** TBA - to be filled before the first Phase 3 template ships.
- **Quarterly budget:** 1-2 days/quarter (per Q6 A).
- **Commitment:** open the quarterly review ticket within 7 days of the quarter boundary; close it within the budget; link the verdict in `templates/CHANGELOG.md` under a `[<date>] - Q<n> review` heading.

## How a quarterly review runs

1. Run `node scripts/verify-stack-claims.ts` (workspace root). Read the drift report.
2. Run `npm audit` in each of the seven `templates/<tier>/skeleton/` directories that ships a `package.json`. Capture the CVE list.
3. Diff the drift report and the CVE list against the prior quarter's entries in `templates/CHANGELOG.md`. Update the matrix if anything moved; otherwise append a one-liner "no changes this quarter".
4. Append the result to `templates/CHANGELOG.md` under `[<date>] - Q<n> review` with the maintainer's name.

## Out of scope

- Picking a template for a new project (router handles that; see `templates/AGENTS.md` §selection rule).
- Adding or removing templates in the family (amendment to `templates/AGENTS.md` + `templates/registry.json` is required first).
- Editing the canonical pins in `02_STACK_MATRIX.md` (it is research/, READ-ONLY).

## Adding yourself when ready

Replace the `TBA - to be filled before the first Phase 3 template ships` placeholder with your name and contact (GitHub handle is the minimum). Open a PR titled `MAINTAINERS: claim <quarter> <year>`. The PR is auto-merged by the family rule: one named maintainer, quarterly cadence, 1-2 days/quarter budget.
