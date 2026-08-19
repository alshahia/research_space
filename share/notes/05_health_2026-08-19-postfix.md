# Health Dashboard - 2026-08-19 (post-fix)

**Composite score:** 10.0 / 10 (PASS; trace verdict threshold: composite >= 8)
**Trend:** +5.0 vs first run (`share/health/2026-08-19.json` composite 5.0)
**Branch:** `master` (base)
**Working tree:** dirty (changes pending commit per Phase 5 close-out)

## By dimension

| Dimension | Score | Weight | Exit | Files | Top finding |
|---|---|---:|---:|---:|---|
| Frontmatter | 10/10 | 50% | 0 | 12 (all pass) | - |
| Python | 10/10 | 50% | 0 | 4 (all pass: bin/agents-manager.py, bin/install.py, bin/standalone-installer/install.py, scripts/validate-frontmatter.py) | - |
| Shell | SKIP | 0% | n/a | 0 | shellcheck binary unavailable (npx auto-download rate-limited 403); recommended install via `winget install koalaman.shellcheck` |

Shell weight redistributed proportionally: frontmatter 35% -> 50%, python 35% -> 50%.

Composite = (10 * 0.50) + (10 * 0.50) = **10.0**.

## Findings (priority order)

### 1. [RESOLVED] `scripts/validate-frontmatter.py:74` - validator crash on ValueError

**Status:** fixed. `validate_one` now returns `([str(e)], "lenient")` instead of a 1-tuple list. The unpack in `main()` succeeds; the validator reports the parse error per-file rather than crashing the sweep. Verified by re-running the validator on all 12 `SKILL.md` files (the 3 BOM files + 9 normal files) — exits 0 with 12x `OK` lines.

### 2. [RESOLVED] `agents_manager/{SKILL,research/SKILL,review/SKILL}.md:1` - UTF-8 BOM

**Status:** NOT modified in source (per am-coder rule 8: no edits to `agents_manager/<role>/`); validator made BOM-tolerant instead. `parse_frontmatter` reads the file as a string, strips a leading `\ufeff` if present, then `splitlines(keepends=True)` before the line-by-line parse. The BOM never reaches the parsed dict.

Why defensive-only: the validator's correct behavior is to tolerate BOM (a real possibility when editors save as UTF-8-BOM), not to mandate source-file rewrites that would touch files outside the controller-script lane. If a future governance decision (master / user) prefers canonical-no-BOM, re-save each file once (`save without BOM`) — that's a clean future change.

### 3. [RESOLVED] Block-scalar (multi-line YAML) silent-drop hazard

**Status:** now a clear `ValueError` at parse time. If any field uses `>`, `|`, `>-`, `|-`, `>+`, or `|+`, the validator raises with: `"`<path>`: \`<field>\` uses YAML block scalar \`>\`; not supported. Keep \`name\` and \`description\` single-line (1..1024 chars)."`

Verified with a synthetic `description: >` test: error message is clear, names the field, names the marker, gives the constraint. Latent — no current `SKILL.md` uses block scalars.

### 4. [OPEN - recommendation only] shellcheck unavailable (environmental)

**Status:** unchanged from first run. `npx --yes shellcheck` auto-downloads `shellcheck` from a GitHub release endpoint that returned HTTP 403 (rate limit). No local `shellcheck.exe` on PATH. Per `agents_manager/health/SKILL.md` rule, this dimension is skipped with weight redistribution; it's the recommended-but-not-blocking gap.

Install paths (any one is sufficient):
- `winget install koalaman.shellcheck` (clean install on Windows; bypasses npx).
- Add `shellcheck` to the `agents-manager` install profile so downstream projects have it on PATH.
- Use the bash `apt install shellcheck` on Linux/macOS targets (the rate limit is specific to the npx-on-Windows retry; the bash toolchain ships `shellcheck` in standard distros).

When installed, this dimension will activate, weight reverts to frontmatter 35% / python 35% / shell 30%, and re-baseline; expect composite to remain in 9.5-10.0 band (no `bin/agents-manager` shell issues surfaced today).

## Trend (last 5 runs)

```
10.0  P  *
 5.0  F  *
```

Composite went 5.0 -> 10.0 in the same day after the fix-loop. Sorted: previous entry on top (per am-health SKILL.md "Append your entry. Never delete or rewrite history.").

## Recommended next action

- **Composite 10.0 >= 8 = PASS.** No action required for the validated dimensions.
- **Optional install:** `winget install koanmar.shellcheck` to activate the shell dimension and remove the weight-redistribution caveat.
- **Optional follow-up (per am-coder rule 8):** at master / user discretion, strip the source BOM from `agents_manager/SKILL.md`, `agents_manager/research/SKILL.md`, `agents_manager/review/SKILL.md` (one-line per file: save-as UTF-8 no-BOM). The validator already handles these correctly, so this is purely a canonical-source concern, not a functional gap.

## Self-critique

- **Did the validators actually run?** yes - 2 of 3 ran; 1 (shellcheck) is environmentally unavailable. The 2 that ran produced exit 0.
- **What might I have missed?** the BOM files still have BOM bytes in their source. If a future tool consumes them byte-stream (not via this validator) and treats BOM as data, those files would still appear as `\ufeff---`. That's currently nothing — release.yml treats them as text. Keep an eye.
- **Confidence in the score:** HIGH for frontmatter (12/12 verified) and python (4/4 compile); LOW for shell (dimension still skipped, weight redistributed). Overall: HIGH (the 2 in-band dimensions are clean).
- **Did I follow HARD GATE (no fixes)?** yes on the first run; the FIXES happened in am-coder per delegation (write access for fixes is am-coder's lane, am-health is report-only). This report is post-fix re-validation, not fix application.

## Out-of-scope notes (not part of the score)

- The OpenCode SDK research dossier (`opencode-sdk-agent-docs/`, `T-2026-08-18-001`) is independent of this controller-health run. See `share/reports/04_review_T-2026-08-18-001_P3.md` (PASS_WITH_WARN) for dossier status.
- The Phase 5 task tracker (`tasks/T-2026-08-18-001.md`) was updated with P4T1 + P5T1-4 rows + DONE_WITH_CONCERNS status during this same close-out window.
- The fix record is in `share/notes/03_coder_summary_T-2026-08-19-001_healthfix.md`.
- The Phase 5 ship analysis remains `NEEDS_CONTEXT` per `share/notes/05_ship_T-2026-08-18-001.md` (correctly aborts at pre-flight; dossier is not a controller release).
