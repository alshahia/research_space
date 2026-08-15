---
scope: role
topic: T-2026-08-12-001 chunk 3B - verbatim row-carry docs + python launcher on this machine
status: active
superseded_by:
created: 2026-08-12
last_verified: 2026-08-12
---

## TL;DR

1) When a plan spec gives row counts for tables you must copy verbatim from a research file, count the source rows yourself before writing - planning can miscount. 2) On this Windows machine, `python`/`python3` hit the Microsoft Store alias stub; the working launcher is `py -3`.

## Context

Chunk 3B of the kotobee dossier build: P3T4 (resource master list, 7 tables D0–D6) + P3T5 (LLM/agent guide). The plan asserted D4 = 8 rows and a 54-row total; the angle-strategy source table D4 carries 9 rows. Dropping a row would have violated the "every row verbatim" hard rule.

## Insight

- For verbatim-carry documentation builds: trust the source, not the plan's count. Count the source table rows first (each `|...|` data line), carry every row, state the actual total in the file intro, and flag the plan discrepancy in the coder summary as a deviation. Here: D4 = 9 → total 55, not the planned 54.
- `rg` is NOT installed in this environment - use the grep tool for content/pattern checks and manual tallies of its match list for row counts.
- `python` and `python3` are Store-alias stubs ("Python was not found"); `py -3` resolves to the real 3.14 interpreter. Use `py -3 scripts/append-trace.py ...` for trace writes.
- Prompt banks: avoid bracketed markers like `[VERIFY]` inside prompts - reviewers grep for `\[.*\]` as "placeholder" evidence. Plain-text tokens ("mark anything uncertain with the word VERIFY") pass the zero-placeholder check.

## Source

`share/notes/03_coder_summary_T-2026-08-12-001_chunk-3B.md` (deviations #1–#4)

## Verification

`Get-Command python*` shows only Store-alias stubs for `python.exe`/`python3.exe` plus real installs; `py -3 --version` → Python 3.14.0. File 04 intro (line 5) states the 55-row actual count; grep `\[.*\]` on 05 returns 0 matches.
