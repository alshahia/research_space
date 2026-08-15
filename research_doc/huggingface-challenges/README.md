# HF Challenges — problem catalog for a Hugging Face interview (2026-08-08)

**Goal:** the catalog a candidate needs to navigate a Hugging Face
interview — 66 concrete problems with evidence, ranked for solo-actionability,
plus a top-10 shortlist and a 3-week apply playbook.

## The files

| File | What's inside |
|------|---------------|
| [`01-overview.md`](01-overview.md) | method, dedupe map (72 research problems → 66 blocks), score anchors |
| [`02-problem-catalog.md`](02-problem-catalog.md) | the 66 blocks (one per problem) with evidence + scores |
| [`03-ranking.md`](03-ranking.md) | the full ranked table + per-cluster tables (the derivation) |
| [`04-top-picks.md`](04-top-picks.md) | the 10 best candidate picks |
| [`05-apply-guide.md`](05-apply-guide.md) | the 3-week playbook for using the catalog |
| `raw/` | the four source research files (angles A-D) |

## Headline numbers

- **66 problems** in 4 clusters: libraries (M1), products (M2), governance &
  trust (M3), business (M4).
- **Top composite (C): M3-16** — AI-agent PR flood (37.2) and **M2-09** —
  `load_dataset` parquet hang (37.2, tied); the anchors are **M1-08 (36.8)**
  and **M4-01 (24.8)**.
- **F formula:** `C = 0.4·I + 0.4·F + 0.2·E` (Impact/Fit/Entry).
- **72 raw research problems → 66 blocks** after deduplication (see
  `01-overview.md` §2 for the merge map).

## Top 10 quick pick

| Rank | ID | Problem | C | See |
|------|-----|---------|---:|-----|
| 1 | M3-16 | AI-agent PR flood / maintainer bottleneck | 37.2 | [04-top-picks.md](04-top-picks.md) |
| 2 | M2-09 | `load_dataset` parquet streaming hang | 37.2 | [04-top-picks.md](04-top-picks.md) |
| 3 | M1-08 | datasets streaming leaks + hangs | 36.8 | [04-top-picks.md](04-top-picks.md) |
| 4 | M2-13 | `create_repo` privacy footgun | 36.4 | [04-top-picks.md](04-top-picks.md) |
| 5 | M1-15 | Download & Xet resilience | 35.6 | [04-top-picks.md](04-top-picks.md) |
| 6 | M3-03 | Malicious/pickle models | 35.6 | [04-top-picks.md](04-top-picks.md) |
| 7 | M1-07 | parallel `from_pretrained` | 35.6 | [04-top-picks.md](04-top-picks.md) |
| 8 | M3-01 | License metadata unreliable | 32.0 | [04-top-picks.md](04-top-picks.md) |
| 9 | M4-02 | ZeroGPU surge meltdowns | 26.4 | [04-top-picks.md](04-top-picks.md) |
| 10 | M4-01 | Value-capture gap | 24.8 | [04-top-picks.md](04-top-picks.md) |

## How to use

1. Scan `03-ranking.md` (one minute: the top 20 are the realistic action list).
2. Pick a private-entry block in `02-…` (marked "client-side, solo").
3. Follow `05-apply-guide.md` week-by-week. That's the interview.

Severity labels are verbatim from the source research (2026-08-08) and the
scores are our own; they may disagree (see overview). All numbers are
estimates for private companies and must be hedged in speech.