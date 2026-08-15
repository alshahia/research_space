# Coder Summary — T-2026-08-12-001 / chunk-3A (Phase 3)

**Date:** 2026-08-12 09:20
**Sub-agent:** coder (am-coder)
**Loop:** initial

## Tasks attempted

| ID | Status | Notes |
|----|--------|-------|
| P3T1 | done | `01_kotobee_factsheet.md` — 14-row fact sheet (all 7 contract facts, "for a limited time" flag), Press URL archaeology, product family, pricing, 8-step publish path, 9-platform vs-alternatives, audience facts, verify-at-signup flags #1 and #3. 116 lines. |
| P3T2 | done | `02_genres_analysis.md` — 10-row 60/40 ranking table, honest caveat + pure global-demand order, all 10 cards (≥2 examples, ≥3 resources, Kotobee lane + export lane lines), 23-row supply table (labeled supply-side), price observation, AR+EN+ES market lens, triangulation flags. 149 lines. |
| P3T3 | done | `03_start_path.md` — pros 8 / cons 6, 10-step table (0–9 + totals, cost defaults $0), 4–8-week fast lane week-by-week, fiction second track, multi-channel strategy (KDP 2026-07-07 band + KU warning + Apple/Google/Kobo + optional Library/Shopify), reality-check box, 10 monetization tactics. 113 lines. |

## Files written / edited

- `research_doc/kotobee_publishing/01_kotobee_factsheet.md` — created — fact sheet chapter (P3T1)
- `research_doc/kotobee_publishing/02_genres_analysis.md` — created — ranked genre analysis chapter (P3T2)
- `research_doc/kotobee_publishing/03_start_path.md` — created — start path chapter (P3T3)
- `share/notes/03_coder_summary_T-2026-08-12-001_chunk-3A.md` — created — this file

## Commands run

- Grep verification (4 parallel greps): spot-checked 6 URLs per file (18 total) against the angle files in `share/notes/` — all found verbatim.
- Grep verification (2nd batch): structural checks — 14 fact-sheet rows, 10 ranking rows, "verify at signup" ×2 in 01, 10 cards with Kotobee/Export lane lines, 10-step table + totals, reality-check stats, 10 monetization tactics, pros/cons counts.
- Grep placeholder scan (`TODO|TBD|placeholder|lorem|XXX|FIXME`, case-insensitive) across `research_doc/kotobee_publishing/` — only hit is the scaffold `00_README.md` "Planned contents (final shape TBD by Phase 2 plan)" line, which is chunk 3C's file (P3T7), not mine.

## Tests run

Documentation build — no executable tests exist for the dossier (plan self-score: testability 4, grep-based). Verification performed: file existence (glob + read), header + Sources-line presence (read first 10 lines of each file), URL verbatim spot-checks (6 per file), placeholder scan (clean).

## Deviations from plan

- None in content. One process note: I did NOT update `tasks/T-2026-08-12-001.md` status rows (P3T1–P3T3 remain `todo`). My dispatch boundaries state `tasks/<id>.md` is master's lane (CANNOT edit). The coder SKILL.md § "What you must produce" says to update the tracker, but the boundary contract in my dispatch overrides — leaving the status flip to master.
- File 02's ranking table uses the 5-column shape from the canonical file (rank/genre/Kotobee-fit/global demand/lane) as the plan's "Done when" prescribes; the angle-genres table's extra columns (typical price, competition, examples, resources) live in the per-genre cards instead.

## Known issues / TODOs left in files

- **FLAGGED (not invented):** the research snapshot states the Kotobee Books library has **24 categories** but the angle file enumerates **23** with counts. File 02's supply table carries all 23 enumerated rows and explicitly flags the missing 24th category name (line ~102). Reviewer should decide whether this needs a research re-check or acceptance of the flag.
- **Scheme-less URLs kept as plain text:** a few resources appear in the angle files without a scheme (scbwi.org, kindlepreneur.com, reedsy.com/blog, r/thrillerbooks, r/Fantasy, r/travelwriting, kotobee.com/en/case-study/5g-interactive-multimedia-textbook). Per hard rule 1 (URLs verbatim, never invent) I copied them exactly as written in the angle files and did not prepend `https://` — they appear as plain text, not as markdown links. Full-scheme variants that exist elsewhere in the angle files were used where available (e.g., k-lytics.com/).
- **Card 9 artifact not reproduced:** the angle-genres ranking table's row 9 contains a malformed bracket artifact ("[The Girl with the Dragon Tattoo crossover aside: memoir lane = [Becoming...]"). I used the clean per-genre card 9 (From Copper Wires, Between Worlds, Becoming — all verbatim) instead of reproducing the malformed cell.
- **No 04_warns_register file exists yet** for this task id — checked, absent; nothing appended.

## Suggested review focus

1. **URL fidelity** — the plan's "Done when" asks the reviewer to grep 5 URLs per file against the angle files. I verified 6 per file; the highest-risk spots are file 01's comparison-table source list and file 02's card resource lines (many links).
2. **The 24-vs-23 category discrepancy** in file 02 section 4 (flagged inline) — confirm acceptance or route to research.
3. **Scheme-less plain-text URLs** in file 02 (SCBWI, Kindlepreneur, Reedsy blog, subreddits, 5G case study) — confirm the verbatim-copy treatment is acceptable.
4. **File 03's totals row** (`~80–250 h / $0 min / $10–100/mo typical / $500–2,500 with pros / 2–6 months`) must match angle-strategy §B — it does, but it is the single most-cited figure in the chapter.
5. **"Verify at signup" placement** — 01 has both flags #1 and #3 with the exact words; 03 has one extra mention on the 100%-royalties promo (pros item 1). Flag #2 (ToS AI clause) is deferred to chapter 05 per the plan.

## Self-critique

- **Did I do my job?** Yes — all 3 assigned files written, all "Done when" checks pass, no invented URLs/figures, user decisions Q1–Q6 woven in (bilingual AR+EN in 02's market lens + 03's channel strategy; all 4 lanes in depth; multi-channel; $0-first; fast-lane-first; hybrid language split untouched since 01–03 are EN-only).
- **What might I have missed?** (a) A full exhaustive URL-by-URL diff of all ~60 URLs across the 3 files (I spot-checked 18 — the reviewer's grep pass covers the rest); (b) the 24th storefront category name (absent from source — flagged); (c) Kobo/Draft2Digital are mentioned as channel names without URLs (no verbatim URL exists in the angle files for them) — intentional.
- **What did I assume without evidence?** (a) That the reviewer accepts the 23-row supply table with the inline flag rather than requiring re-research; (b) that keeping scheme-less URLs as plain text satisfies "URLs copied verbatim" better than normalizing them; (c) that the task-tracker status flip is master's job (boundary interpretation).

## Status signal

**DONE_WITH_CONCERNS** — all three tasks complete and verified; one source-side flag surfaced (24 vs 23 storefront categories). `READY_FOR_REVIEW: true`.
