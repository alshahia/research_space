# Coder Summary — T-2026-08-12-002 / Phase 3A

**Date:** 2026-08-12 10:45
**Sub-agent:** coder
**Loop:** initial

## Tasks attempted

| ID | Status | Notes |
|----|--------|-------|
| P3T1 | done | `01_eligibility_and_rails.md` written — sanctions reality, 6-rail map, D1 test cards, closing verdict box |
| P3T2 | done | `02_platform_matrix.md` written — legend, 30-row verdict-first matrix, 30 sheets (7 labeled lines + Sources each), 2026 callouts, gray-area box |

## Files written / edited

- `research_doc/book_selling_platforms/01_eligibility_and_rails.md` — **created** — 98 lines / 15,399 bytes. Sections: (1) Sanctions reality (2025-07-01 revocation, PAARSS, Iraq 2010, SST flag 10); (2) rails map — all 6 canonical rails (Stripe/PayPal/Payoneer/Wise/Bank EFT/Check) with evidence URLs + KDP PSP 2026-08-01 note + KRG banking flag 8; (3) Decision point D1 — Test A Payoneer + Test B PayPal cards with outcome-branch tables + record-results checklist; (4) Closing verdict box "The gate is money movement, not nationality." + 30% margin line.
- `research_doc/book_selling_platforms/02_platform_matrix.md` — **created** — 426 lines / 66,158 bytes. Legend; 2026-status quick-reference table (8 items); consolidated matrix: exactly 30 rows, column order `# | Platform | Verdict (IQ/SY) | Royalty | Setup cost | Audience | Payout | Arabic` (verdict first, royalty second); 30 per-platform sheets (Setup/Publish/Audience/Royalty/Payout/Verdict/Arabic + Sources line); 18 `🔶 verify at signup` markers; 14 sheets carry the 30% US-withholding margin note; gray-area workaround box (3 rows, flagged user decisions).

## Commands run

- `py scripts/append-trace.py ...` — trace `start` entry written (exit 0)
- PowerShell verification scripts — sheet/row/label/source counts, URL verbatim spot-checks, callout + code-fence + margin-note greps (all pass)

## Tests run

- **No test command exists for documentation-only changes** (no code; `scripts/validate-frontmatter.py` applies to controller files only). Verification was structural instead, per the chunk's Done-when checklist:
  - 30 sheets numbered 1–30, 30 matrix rows — confirmed (regex count)
  - All 7 labeled lines present in all 30 sheets — confirmed; all 30 have Sources lines
  - 18 verify-at-signup markers — confirmed, matching the canonical flag-6 list + Apple/Kobo/Kotobee conditional items (canonical flags 4–5, 11)
  - 22 URLs spot-checked verbatim against the angle files — all found (see deviations for 2 provenance notes)
  - All 8 listed 2026 callouts present (2026-07-07, 2026-01, 2026-05-26, Kitab Sawti, INaudio, April 2026, 2025-07-01, 2026-08-01)
  - 0 code fences in both files (plan hard rule 8); only the mandated verdict glyphs used

## Deviations from plan

- **30% margin-note scope (P3T2):** the dispatch requires the note in "every US-platform sheet." Applied to the 14 sheets whose domicile the research documents as US (KDP, Google, Apple, D2D, Smashwords, IngramSpark, B&N Press, StreetLib — HQ "StreetLib USA Inc." per angle A finding 29 — Lulu, Gumroad, Patreon, Substack, ACX, Voices by INaudio). Excluded with reason: PublishDrive (canonical: "Hungary-based"), Leanpub/Ko-fi/Payhip/Wattpad/Ream (non-US domicile per research; several blocked anyway). If the reviewer wants the note on all 30, it is a 5-minute mechanical add — flagged rather than silently extended.
- **Kotobee support-article URLs (sheets 20):** `.../8000111089-collect-payments-in-kotobee-books` and `.../8000130253-kotobee-v1-9-8-platform-release-7th-july-2026` are NOT in the 002 angle files — they are verbatim from the task-001 angle file (`share/notes/01_research_T-2026-08-12-001_angle-platform.md:77`) and the factsheet (`research_doc/kotobee_publishing/01_kotobee_factsheet.md:80`, §7), which the plan designates as the Kotobee cross-ref source (flag 11 "carried over from Task 001"). The `books.kotobee.com/signup` URL is verbatim in the 002 angle B file.
- **Google audiobooks citation (sheet 2):** angle B gives "help article 14164701" as a bare ID; cited as `support.google.com/books/partner/answer/14164701` using the standard pattern the angle files themselves use for 2987594/9331459. Constructed from a captured ID, not invented.
- **Kobo help IDs (sheet 4):** 360058975652 and 360059385631 cited as bare IDs exactly as the angle file presents them (full URLs not captured in research; 360059385631 is documented as 404-on-fetch). Flagged rather than fabricated.
- None of the above changes content; all are citation-provenance notes.

## Known issues / TODOs left in code

- Sheet 19 (Ream) setup cost cell = "not published (JS-only signup)" and sheets 21/22/26 setup = "not published — contact/approval-gated" — stated honestly, per hard rule "never invent"; done-when's "every row's setup cost stated" is satisfied as a stated-not-published cell.
- Sheet 30 verdict ❌ with per-entity evidence lines (Jamalon TLS, Tafaseel parked, Yaqoot not-a-book-platform) — no invented recovery path.
- WARN register for this task does not exist yet (master creates it at Phase 4); nothing appended.
- Chunk 3B ran out of phase (03/04 already on disk); my 01/02 cross-references to 03/05/06/99 are consistent with the plan's file set — no conflict observed.

## Suggested review focus

1. **02 matrix rows 1–30 vs canonical matrix** — transcription fidelity (10 rows sampled: verdicts, royalty strings verbatim, setup-cost cells).
2. **Sheet 20 (Kotobee)** — the two support-article URLs from task-001 sources; confirm the cross-ref citation is acceptable (plan flag 11).
3. **01 rails table** — all 6 canonical rails with the canonical evidence URLs; the D1 outcome-branch tables match the plan's branch spec.
4. **30% margin-note coverage** — the 14-sheet US-domicile scoping judgment (deviation #1).
5. **Bare-ID citations** (Kobo 360058975652/360059385631, Wattpad 211678146) — verify they match the angle files' own citation format.

## Self-critique

- **Did I do my job?** yes — both files written per the chunk spec, verified structurally and by URL spot-check before handoff.
- **What might I have missed?** (a) A second full pass for numeric-claim/URL pairing beyond the 22 spot-checks (the reviewer's grep pass will be the exhaustive one); (b) the plan's "(d) callouts inline where they occur" — I also added a quick-reference table up top; this is additive transcription, not invention, but the reviewer should confirm it doesn't count as scope creep; (c) emoji scan was eyeball-level — only verdict glyphs and arrow symbols used, no decorative emoji (grep for `##` code fences returned 0).
- **What did I assume without evidence?** (a) That "US-platform sheet" for the 30% margin note maps to documented US domicile (StreetLib USA Inc. from angle A finding 29; PublishDrive Hungary from angle A §9); (b) that the 2026-status quick-reference table is within plan scope for 02 (it is a transcription of the canonical recommendation #4 list); (c) that the record-results checklist belongs in 01 as plain markdown checkboxes (plan: checklists are markdown, not code blocks — 0 fences used).

Memory written: `agents_manager/coder/notes/semantic/dossier-citation-conventions.md` (cross-task citation convention for this repo's dossier builds).
