# Coder Summary — T-2026-08-14-001 / Phase 3.0 fix-loop #1

**Date:** 2026-08-14
**Sub-agent:** am-coder
**Loop:** fix-loop #1 (resolves `DONE_WITH_CONCERNS` from Phase 3.0 initial).
**Dispatch:** Phase 3.0 fix-loop — drift-register wiring on `scripts/verify-stack-claims.ts`.
**Trigger:** prior summary surfaced a real, non-network drift (`@anthropic-ai/sdk` `^0.116.0` dossier → `0.117.1` npm). Spec: read-only dossier, so add a tracked append-only register the gate consults before failing.

## Tasks attempted

| ID | Status | Notes |
|----|--------|-------|
| P3T0-fix1 | done | Drift register created; verifier consults it; `--strict` flag bypasses it. Default run now exits 0. |

## Files written / edited

| Path | Status | Change |
|---|---|---|
| `share/notes/03_drift_register_T-2026-08-14-001.md` | created | 17 lines. Append-only drift ledger. One entry: `@anthropic-ai/sdk` `^0.116.0` → `0.117.1` (2026-08-14, master Phase 3.0 fix-loop). |
| `scripts/verify-stack-claims.ts` | edited | +25 lines net. Added `DRIFT_REGISTER_PATH` + `parseDriftRegister()` + `--strict` argv parse after the claims-count log; replaced the final fail block to split `failures` into `knownDrifts` (warn) vs `unknownFailures` (fail). Extraction logic unchanged. |

**Diff size:** 1 new file + 1 surgical edit. No new dependencies, no other files touched.

## Commands run

- `node --version` — `v24.18.0` (Node 24 runs `.ts` without `--experimental-strip-types`).
- `node scripts/verify-stack-claims.ts` — **exit 0**. Output:
  ```
  verify-stack-claims: 18 unique pinned package-version claims extracted.
  failing package: known drift (register): @anthropic-ai/sdk dossier=^0.116.0 registry=0.117.1
  OK: all 18 pinned versions satisfy their caret range (1 known-accepted drift(s) ignored via register).
  ```
- `node scripts/verify-stack-claims.ts --strict` — **exit 1**. Output:
  ```
  verify-stack-claims: 18 unique pinned package-version claims extracted.
  failing package: drift detected in 1/18 pinned version(s).
  failing package: @anthropic-ai/sdk pinned ^0.116.0, npm latest 0.117.1 ([audit-trail])
  ```

(PowerShell `$?` echoes `EXIT=True` / `EXIT=False` for codes 0 / 1 respectively — actual `process.exit()` codes are 0 and 1 as required.)

## Tests run

- Default invocation → exit 0 + the single "known drift" warning line. Spec satisfied: warn-and-pass.
- `--strict` invocation → exit 1 + the original "drift detected" / "failing package" lines, no "known drift" line. Spec satisfied: flag changes behavior.
- Implicit: 17/18 claims still validated against npm the same way as before (only 1 was actually drifting). No collateral damage to the existing extraction pipeline.

## Deviations from plan

- **None of substance.** Spec was precise. Two micro-judgments, both documented inline:
  - Lookup key is `pkg@<caret-stripped-pin>` (e.g. `@anthropic-ai/sdk@0.116.0`). The dossier column carries `^0.116.0`, but the script's internal `claim.pinned` is caret-stripped at extraction time; matching them on the stripped form means a future register row written as `` `^0.116.0` `` or `` `0.116.0` `` still matches. Defensive against hand-edit drift in the markdown.
  - Added a small annotation to the OK line: `(1 known-accepted drift(s) ignored via register)`. Not in spec, but the gate is now non-trivially ignoring drift and "OK" alone would be misleading on stdout-only logs. Kept short; delete if reviewer prefers bare `OK:`.

## Known issues / TODOs

- **LOW — register path is hard-coded to `share/notes/03_drift_register_T-2026-08-14-001.md`.** Resolved via `process.cwd()`. Acceptable for now (this is the single project's repo); if Phase 3.1+ wants to run the gate from CI's working dir, switch to `workspaceRoot` resolution like the matrix path. One-line change; deferred.
- **LOW — register parser uses a regex, not a markdown table parser.** Sufficient because rows are well-formed (`| YYYY-MM-DD | `pkg` | `^x.y.z` | `a.b.c` | reason | decider |`). A malformed row silently doesn't match → drift stays unknown → gate fails (fail-safe). If the table format changes, drift registers could "fall off" without notice; add a parse-error warning later if reviewers want it.
- **LOW — `--strict` is the only flag.** No `--help`, no env-var override. Fine for now; the flag is the entire surface area.

## Suggested review focus

1. **`scripts/verify-stack-claims.ts` lines around the parse/filter logic.** Verify the key normalization (`pkg@<stripped-pin>`) matches what a human reading the register would expect, and that the split between `knownDrifts` and `unknownFailures` is exhaustive (no claim drops on the floor).
2. **Drift register entry.** Confirm the single row is enough for today's drift and the schema (header + 6 columns) matches what `DRIFT_ROW_RE` expects. Adding the next entry should require no script change.
3. **Default-run output now starts with a `failing package:` line on stderr.** Reviewers who grep for `failing package` to find bugs will see this line — it's intentional (the spec said "prefixed with the same label the fail branch uses") but worth flagging so dashboards don't false-positive on the warn-and-pass case.

## Self-critique

- **Did I do my job?** Yes. Two files in scope touched; nothing else. Default run exits 0; `--strict` exits 1; gate still surfaces real drifts.
- **What might I have missed?** The spec said "treat as empty register (no known drifts)" if the file is missing — my `existsSync` check does exactly that. If the file exists but is empty/unparseable, the empty `Set` returns the same way; an empty file is therefore indistinguishable from a missing file (fail-safe). Documented in Known issues.
- **What did I assume?** That the existing extraction logic (`extractClaims` + `npmLatest` + `caretRangeSatisfied`) was correct. Phase 3.0 summary already proved this; I did not re-validate it.
- **Out-of-lane confirmed.** No edits to `research/agent-app-templates-2026-08-13/02_STACK_MATRIX.md`. No edits to `tasks/T-2026-08-14-001.md`. No edits to `agents_manager/`, `opencode.jsonc`, or root `CLAUDE.md`. No edits to any `templates/` file.

**Status: DONE** — `DONE_WITH_CONCERNS` from Phase 3.0 resolved.
