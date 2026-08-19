# WARN register - T-2026-08-18-001

This file consolidates issue-level WARN findings from every review phase. It is append-only.

## Phase 3A - 2026-08-18 - FAIL

- CRITICAL - Reading-map filenames are code spans, not clickable Markdown links - `opencode-sdk-agent-docs/00_README.md:32-44,50-59`.
- CRITICAL - `shape-compatible` makes an unsupported semver compatibility claim - `opencode-sdk-agent-docs/01_prerequisites.md:10`.
- LOW - Live-validation row is called the 14th row although it is row 12 in phase order - `opencode-sdk-agent-docs/progress.md:60`.
- LOW - JSON import-attribute snippet needs a modern Node/Bun/tsx runner caveat - `opencode-sdk-agent-docs/01_prerequisites.md:80`.

## Phase 3A - 2026-08-18 - PASS after fix loop 1

- RESOLVED - README now has 26 relative Markdown links covering all 14 planned files.
- RESOLVED - Unsupported `shape-compatible` wording removed; skew is a coordinate label only.
- RESOLVED - Live-validation row narrative aligned to row 12.
- RESOLVED - JSON import-attribute runner caveat added.
- Open WARNs from Phase 3A: none.

## Phase 3B - 2026-08-18 - PASS_WITH_WARN

- LOW - `client.mcp.auth({ path, body })` row signature claims a `body` parameter but the Notes column does not carry the `Body shape in types.gen.ts` marker (compare to sibling L155 `client.mcp.add` row which does). Body shape is NOT invented (no fake keys), but the in-row pointer is missing. The row IS mentioned in the deeper revalidation list at `03_decision_guide.md:197`. Suggested fix: append `; body shape in types.gen.ts` to L156 Notes column. - `opencode-sdk-agent-docs/04_api_map.md:156`
- LOW - "Sources used in this file" block lists only 10 of 15 distinct cited `[Sn]` markers (S3, S7, S13, S14, S22 missing from the in-file enumeration). Block heading implies completeness but the listing is partial. Inline citations are correct and resolve to the canonical research ledger. Suggested fix: either expand the L297-306 list to cover all 15 markers, or rename the heading to "Selected sources" / "Most-cited sources". - `opencode-sdk-agent-docs/04_api_map.md:295-306`
- LOW - Coder summary prose count discrepancy: claims "24 v2-only event types" but `04_api_map.md:215-241` contains 27 (independently counted). Coder miscount of the v2-delta event-name rows. Dossier itself is unaffected. - `share/notes/03_coder_summary_T-2026-08-18-001_P3B.md:13`
- LOW - Coder summary claims "73 method rows". Actual: 73 per-namespace method rows (rows 1-73) + 4 v2-delta config rows (rows 74-77) = 77 numbered rows total, plus 27 v2-only event rows in the v2-delta event table (unnumbered). Coder's "73" is the per-namespace-method subset; the summary would read more clearly with both sub-counts. - `share/notes/03_coder_summary_T-2026-08-18-001_P3B.md:13`
- Open WARNs from Phase 3B: 4 LOW (none blocking).

## Phase 3C - 2026-08-18 - PASS_WITH_WARN

- LOW - `progress.md` row 2 notes column carries the `same-minor-patch-delta-15` label without the `does NOT claim compatibility from semver alone` pairing in the same file. The dossier-wide pairing is satisfied by 8 other files (`00_README.md:17`, `01_prerequisites.md:10,74,86`, `02_quickstart.md:141,246`, `03_decision_guide.md:78`, `05_lifecycle.md:264`, `07_errors.md:170`, `08_events.md:394`). Single-file consistency gap on a status board. Suggested fix: append `(...does NOT claim compatibility from semver alone)` parenthetical to the row 2 notes column. - `opencode-sdk-agent-docs/progress.md:29`
- Open WARNs from Phase 3C: 1 LOW (none blocking).

## Phase 3D - 2026-08-18 - PASS_WITH_WARN

- LOW - `progress.md` row 11 is missing the trailing pipe `|` that all 13 other rows in the File status table carry. Direct read of L38 confirmed: row 11 ends with the literal character `e` (0x65), not `|`. Compare to row 1 (L28 ends with `|`, byte 0x7C) and row 12 (L39 ends with `|`, byte 0x7C). The row is structurally complete and the status is correctly `done`; markdown renders fine without trailing pipes. Suggested fix: append ` |` to L38 to match the 13-row convention. One-character cosmetic polish. - `opencode-sdk-agent-docs/progress.md:38`
- LOW - `09_examples.md` "Sources used in this file" block (L911-926) lists 12 of 13 distinct `[Sn]` markers used in the file. `[S11]` is cited at L392 (`// file paths against the right workspace [S1][S8][S11]`) and at L682 (`POSIX SIGTERM-then-SIGKILL chain via cross-spawn | verified [S8][S11][S14]`) but is missing from the L911-926 enumeration. Inline citations are correct and resolve to the canonical research ledger. Same pattern as the prior Phase 3B finding at `04_api_map.md:295-306`. Suggested fix: append `- \`[S11]\` v1 SDK server source (POSIX SIGTERM-then-SIGKILL chain via cross-spawn; file-path workspace resolution)` to the Sources block. - `opencode-sdk-agent-docs/09_examples.md:911-926`
- Open WARNs from Phase 3D: 2 LOW (none blocking).

