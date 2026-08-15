# WARN register — T-2026-08-12-001

**Created by:** am-review, Phase 4 initial (2026-08-12)
**Per-file verdicts:** 8 PASS, 0 WARN, 0 FAIL. All items below are LOW-severity observations (informational — no fix required before acceptance).

- phase-4 — LOW — Chapter 06 Arabic share is metric-dependent: 64.7% of file lines / 66.8% of body (lines 26–133) non-whitespace characters are Arabic, but only 49.3% of whole-file non-whitespace characters are — the plan's "≥60% of the file" wording is ambiguous; line-based metric used and documented by coder — `research_doc/kotobee_publishing/06_arabic_market_deepdive.md:1-136`
- phase-4 — LOW — Appendix register row for `books.kotobee.com/library` still describes "24-category supply counts" while chapter 02 carries 23 enumerated categories + an inline 24-vs-23 flag; wording should mirror the flag — `research_doc/kotobee_publishing/99_appendix_links.md:49` / `02_genres_analysis.md:101`
- phase-4 — LOW — Chapter 05 success-metrics row derives the KDP range "$1.46–$2.91" (=$4.16 × 35%/70%) but does not label it as derived arithmetic; math is correct against the sourced baselines — `research_doc/kotobee_publishing/05_llm_agent_guide.md:222`
