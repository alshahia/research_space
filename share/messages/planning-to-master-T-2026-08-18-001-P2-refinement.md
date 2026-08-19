# planning to master - T-2026-08-18-001 - P2 refinement complete

**Date:** 2026-08-18 09:01 UTC+3
**From:** am-planning
**To:** master
**Task:** T-2026-08-18-001 (OpenCode SDK agent/LLM docs dossier)
**Trigger:** master re-dispatched Phase 2 planning after identifying that the original `findstr`-based lint checks were unsound on Windows (see `agents_manager/memory/global/windows-encoding-validation-trap.md`).

## Verdict

**DONE_WITH_CONCERNS** — refinement complete; structurally strong plan; **NEEDS_USER_CONFIRMATION: true** (unchanged from the original dispatch; user-confirm gate still pending).

## What changed

Refined both existing plan files in place. No new files in `opencode-sdk-agent-docs/`; no new dependencies; no scope change; the 13-file dossier map and the 5-phase build plan are unchanged.

### `share/notes/02_plan_high_T-2026-08-18-001.md` (110 lines, 0 em-dashes)

- Non-goals bullet 2: replaced "banned-phrase grep" with "Python path/label-aware scan".
- Approach step 7: rewrote the lint summary to reference the new Python commands and the encoding-trap memory.
- Risks acknowledged: added a new bullet for the Windows encoding-trap risk (high severity, mitigated by Python byte-scan).
- Build vs. reuse decisions table: replaced the `findstr` + `rg` row with a `py` + `Get-ChildItem` row and noted that `rg` is not installed on this host.
- Plan self-score Testability: kept 4 with an expanded justification that names the new check commands.
- Plan self-score Risks covered: kept 4 with an expanded justification noting the encoding-trap risk is now explicitly mitigated.
- Risk bullet for `createOpencodeTui()` now points at the Python path/label-aware check.
- Freshness procedure now references the Python one-liner instead of `findstr`.

### `share/notes/02_plan_phases_T-2026-08-18-001.md` (424 lines, 0 em-dashes)

- Phase 3E writer constraint: replaced `findstr` / `rg` with Python stdlib (Windows-launched via `py`) + `Get-ChildItem`.
- Phase 3E final-lint numbered list: rewrote items 3, 4, 5, 6 to reference the new Python commands with documented expected stdout and exit code.
- `## Lint checklist` section: full replacement with 5 sub-checks:
  1. **File existence and line counts** — PowerShell `Get-ChildItem` + Python per-file minimum check.
  2. **Em-dash ban (UTF-8-safe byte scan)** — reads each `.md` as raw bytes, checks for `b"\xE2\x80\x94"`, exits 1 on hit.
  3. **Citation resolution (exact set diff)** — extracts `\[S\d+\]` from `99_sources.md` and every other `.md`; prints four lines; fails when either `orphan citations` or `uncited sources` is non-empty. **Both expected diff sizes are explicitly zero.**
  4. **Banned-example check (path- and label-aware)** — path-allow-list (`03_decision_guide.md`, `09_examples.md`, `10_known_issues_and_troubleshooting.md`) plus a +/- 6 line window check for `> UNSAFE` / `## UNSAFE` markers; known-issues file exempted from label check.
  6. **Freshness footer check** — Python one-liner counting files with the `<!-- freshness: sdk=1.18.18 -->` footer.
  7. **Manual checklist** — six reader-only checks (e.g., the v2 HTML-guard error string verbatim) that no string matcher can prove.
- Per-phase `Done when` clauses preserved verbatim (Phase 3A through Phase 3E, including all "Zero em-dash characters" bullets).
- Per-phase `### Complexity` blocks preserved verbatim.

### Permitted task/progress/trace artifacts

- `tasks/T-2026-08-18-001.md` — added P2T2 row and a Loop history entry for the refinement.
- `share/notes/99_progress_T-2026-08-18-001.md` — appended a refinement entry.
- `share/notes/00_trace_T-2026-08-18-001.jsonl` — appended 3 JSONL entries (fix-loop, start, complete).
- `share/messages/planning-to-master-T-2026-08-18-001-P2-refinement.md` — this file.

## Self-checks performed

- Byte-level em-dash count on both plan files: 0 (matches char-level count, so the file itself is clean).
- All 4 Python heredocs + 1 inline `py -c` block in the lint checklist pass `ast.parse()` with no syntax errors.
- Em-dash scan script logic smoke-tested against the non-existent `opencode-sdk-agent-docs/` folder: returns "0 hits" and exits 0 as documented.
- `rg` verified absent from `PATH` on 2026-08-18 (per master dispatch hint).
- `py` (Windows Python launcher) verified present and resolves to Python 3.14.0.

## Plan self-score (re-evaluated honestly)

- **Testability (1-5): 4** — kept. Every validation command now has a documented expected stdout and exit code; the previous `findstr` defects (false negatives / positives) are eliminated. The T=5 ceiling (automated `bun run` per example against a live CLI) is unchanged and still out of scope (no test framework, no new dependency).
- **Scope (1-5): 5** — kept. 13 dossier files, 5 build sub-phases, no inflation, no added work.
- **Dependencies (1-5): 5** — kept. Build phases remain strictly ordered; no cross-phase coupling introduced.
- **Risks covered (1-5): 4** — kept. All 7 research risks plus the endpoint-shape self-critique gap retain their named mitigations. The Windows encoding-trap risk (originally latent in the `findstr`-based lint) is now explicitly mitigated and listed in `## Risks acknowledged`. The R=5 ceiling (a stub `types.gen.ts` or generated-types snapshot alongside the dossier) is unchanged.

Both T and R retain their original "what would raise it to 5" statements verbatim (no inflation).

## Open questions for the user (carried from the original dispatch, no change)

1. Anchor on v1 or v2 for the dossier?
2. Primary reader: long-lived server-owning agent or short-lived existing-server client? (Both paths are covered by the current plan.)
3. Include a `prerequisites: install the CLI` section? (Current plan: yes.)
4. Unified API map with v1/v2/both markers or two parallel maps? (Current plan: unified.)
5. Progress file goes inside the new folder (`opencode-sdk-agent-docs/progress.md`), not in `share/notes/`? (Current plan: yes.)

## Recommendation

Ready for the user-confirm gate (Phase 2). No further refinement needed unless the user re-opens a question. After confirm, dispatch am-coder for Phase 3A per the existing build plan.

---

**NEEDS_USER_CONFIRMATION: true**