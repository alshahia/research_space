# Coder Summary - T-2026-08-13-002 / cleanup

**Date:** 2026-08-13 13:05
**Sub-agent:** coder
**Loop:** final cleanup dispatch

## Tasks attempted

| ID | Status | Notes |
|----|--------|-------|
| cleanup-em-dashes | done | Replaced 10 em dashes in `docs/PERMISSIONS.md`. Three other files in dispatch scope had 0 em dashes (dispatch count was wrong). |

## Dispatch-vs-reality discrepancy (must surface to master)

The dispatch stated "19 em dashes across 4 files" with the breakdown:

- `docs/PERMISSIONS.md` — 10 em dashes (dispatch: lines 18, 19, 26, 28, 36-41) — **VERIFIED 10, all replaced**
- `agents_manager/coder/SKILL.md` — 1 em dash — **REALITY: 0 em dashes** (file already uses plain `-` hyphens throughout)
- `agents_manager/design/SKILL.md` — 3 em dashes — **REALITY: 0 em dashes**
- `agents_manager/health/SKILL.md` — 5 em dashes — **REALITY: 0 em dashes**

Actual total in dispatched file scope: **10 em dashes**, not 19.

## Files written / edited

- `docs/PERMISSIONS.md` — edited — 10 em-dash replacements (one per line: 18, 19, 26, 28, 36, 37, 38, 39, 40, 41). Replacement strategy:
  - Lines 18, 19 (research-mode reflexes in bullets): ` — ` → `; ` (semicolon, clause join)
  - Line 26 (parenthetical): ` — ` → `; ` (semicolon, clause join)
  - Line 28 (bullet): ` — ` → ` - ` (hyphen with spaces)
  - Lines 36-41 (Sources bullets): ` — ` → ` - ` (hyphen with spaces)

## Commands run

- `grep -n '—' docs/PERMISSIONS.md` (via grep tool) — pre-edit: 10 matches on lines 18, 19, 26, 28, 36-41. Post-edit: 0 matches.
- `grep -n '—' agents_manager/coder/SKILL.md agents_manager/design/SKILL.md agents_manager/health/SKILL.md` (via grep tool) — 0 matches per file (confirmed dispatch count was wrong).
- `py -3 scripts/validate-frontmatter.py` — **EXIT 1, pre-existing bug, NOT caused by my edits**. Two compounding bugs:
  1. The repo's SKILL.md files carry a UTF-8 BOM (`\xef\xbb\xbf`). `validate-frontmatter.py` opens with `encoding="utf-8"`, so `lines[0]` becomes `\ufeff---\n` and fails the `lines[0].rstrip("\r\n") != "---"` check.
  2. `validate_one` returns `[str(e)]` (a 1-element list) on early `ValueError`, but `main()` does `errs, mode = validate_one(path)` expecting a 2-tuple → unpacking crashes. Confirmed by isolation test on BOM-less vs BOMmed tempfiles.
  - Reproduction: `agents_manager/SKILL.md` (untouched by this dispatch) reproduces the same crash. Pre-existing.
- `grep -rn '—' agents_manager/ docs/ scripts/ CLAUDE.md AGENTS.md README.md` (via grep tool, scoped) —

  **DISPATCH EXPECTATION: ONLY `citation-format/SKILL.md` matches.**
  **REALITY: ~39 matches across multiple files.**

  Breakdown of remaining em dashes in the scoped paths:
  | File | Count | In scope? |
  |---|---|---|
  | `agents_manager/research/resources/skills/citation-format/SKILL.md` | 9 | YES — preserved exception (citation spec format) |
  | `agents_manager/chub-gate/chub-gate.ts` | 2 | NO — not in dispatch's 4-file list |
  | `agents_manager/design/resources/mockup-templates/*.html` | 10 | NO — not in dispatch's 4-file list |
  | `docs/superpowers/specs/2026-07-12-showcase-website-product-design.md` | 3 | NO — not in dispatch's 4-file list |
  | `docs/superpowers/plans/2026-07-12-showcase-website-product-implementation.md` | 14 | NO — not in dispatch's 4-file list |

  Out-of-scope em dashes total: **~29** (the dispatch's 19-count was an underestimate of repo state; the dispatch also didn't list these files for cleanup).

## Tests run

- None (cleanup-only task; no behavioral change to validate).

## Deviations from plan

- **Did NOT touch 3 of the 4 files in the dispatch list** because they contained 0 em dashes. Edit tool calls on non-existent strings would have failed; I verified with `grep` first.
- **Final grep verification does not match dispatch's expected output.** Dispatch said only citation-format should remain; ~29 other em dashes remain in files the dispatch didn't list. Per the dispatch's hard rule "Edit only files listed in Files expected", I did not expand scope.

## Known issues / TODOs left in code

- **HIGH (pre-existing, out of scope for this dispatch)**: `scripts/validate-frontmatter.py` has a return-shape bug (`return [str(e)]` should be `return ([str(e)], mode)`) that crashes on any frontmatter parse error. Recommend filing a fix-loop dispatch against this script. Not blocking the em-dash cleanup.
- **MEDIUM (pre-existing)**: Multiple `agents_manager/**/*.md` files carry a UTF-8 BOM, which breaks the validate-frontmatter script. Recommend a one-time BOM strip across `agents_manager/**/*.md`. Not blocking.
- **LOW (out of dispatch scope)**: ~29 em dashes remain in `agents_manager/chub-gate/`, `agents_manager/design/resources/mockup-templates/`, `docs/superpowers/specs/`, `docs/superpowers/plans/`. The dispatch did not list these for cleanup. If the user wants them gone, dispatch another am-coder cleanup task with these files listed in `Files expected`.

## Suggested review focus

- Confirm the 10 replacements in `docs/PERMISSIONS.md` read naturally (semicolons at 18/19/26, hyphens at 28/36-41).
- Confirm the dispatch-count discrepancy (19 → 10) is acceptable and that the remaining ~29 em dashes in `agents_manager/chub-gate/`, `agents_manager/design/resources/mockup-templates/`, `docs/superpowers/` are intentionally out of scope.
- Confirm the pre-existing validator bug should be fixed in a separate dispatch (not this one).

## Self-critique

- **Did I do my job?** Yes. I cleaned every em dash in the dispatched file scope. The 3 files with 0 em dashes needed no edits.
- **What might I have missed?** Possibly the dispatch author meant for me to also clean the other ~29 em dashes elsewhere, but the dispatch was explicit ("Files to clean: 4 files") and had a hard rule against touching anything else. I followed the rule.
- **What did I assume without evidence?** I assumed the dispatch's per-file counts (1+3+5=9) were based on a stale `grep` snapshot of files that have since been partially cleaned by a prior dispatch. The pre-existing 10 in PERMISSIONS.md matched exactly, which supports that theory for at least that file. No way to verify without git log access.

## Metrics

| Metric | Value |
|---|---|
| Files in dispatch scope | 4 |
| Files modified | 1 (`docs/PERMISSIONS.md`) |
| Files verified em-dash-free (no edits needed) | 3 (coder/design/health SKILL.md) |
| Em dashes replaced | 10 (target was 19; 9 were phantom per the dispatch) |
| Em dashes remaining in cited paths (after cleanup) | ~39 |
| Em dashes remaining in `citation-format/SKILL.md` (preserved exception) | 9 |
| Em dashes remaining in OTHER scoped files (not in dispatch) | ~30 |
| `validate-frontmatter.py` exit code | 1 (pre-existing bug, unrelated to this dispatch) |
| Final grep status | FAIL of dispatch expectation (other em dashes remain out of dispatch scope); PASS of in-scope cleanup (PERMISSIONS.md clean) |
| Status signal | DONE_WITH_CONCERNS |
| READY_FOR_REVIEW | true (in-scope work is complete and clean) |
