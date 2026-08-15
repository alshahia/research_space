# 01 — Overview & Methodology

Source task: **T-2026-08-08-001** — "Rank a Hugging Face problem set" (phases 3–5:
consolidate, rank, and package). Everything in this folder derives from the four
referenced research angles (`raw/`) plus the canonical merged research note
`share/notes/01_research_T-2026-08-08-001.md`.

## 1. What this artifact is

66 problems, each with a stable ID (`M<cluster>-<seq>`), a one-page evidence
block (severity as-of 2026-08, users, sources, mitigations, fix difficulty), and a
composite score meant for a candidate's use:

- **Do:** pick a cluster that matches your background; within it, pick the highest
  `C` problem you can actually ship a PR/proposal for.
- **Do not:** treat `C` as a de-facto "importance" rank of Hugging Face. It ranks
  **actionability to a single candidate**, weighted by impact.

## 2. Clusters and dedup (72 → 66)

Four research angles produced 72 problems: A (open-source libraries, 19),
B (product surfaces & platform services, 19), C (governance & trust, 16),
D (business & strategy, 18). Three merge groups were applied:

| Merged into | Clustered | Tasks they came from |
|---|---|---|
| **M1-15** | M1 | P-A05 (hf_transfer gaps) + P-A06 (Xet restricted-network 403s / Windows >2GB stall) + P-A07 (no rate-limit / resume on the classic path) + P-B14 (Xet 99% stall / forbidden workaround) + P-B15 (slow downloads, no parallelism) |
| **M3-16** | M3 | P-A02 (maintainer bottleneck under AI-agent PRs) + P-C015 (mass AI-generated contributions; trust erosion) |
| **M3-03** | M3 | P-A12 (pickle RCE / safetensors migration, conversion-framing) + P-C003 (malicious pickle models on the Hub, security-framing) |

All 72 original P-IDs are preserved in catalog blocks (see `Merged sources` line per
block; verification in `03-ranking.md` §5).

Every merged block's **Cluster** line lists the full original ID set; every chunk is
present exactly once in the catalog; no original problem was dropped.

## 3. Scoring rubric

Score = **Impact 40%** + **Fit 40%** + **Entry 20%**, each computed from three
5-tap dimensions; components are from the fixed tier sets shown (`8` and `10`
midpoints document intermediate evidence, see §3.2):

| Factor | Weight | Dimensions (tiers) | Meaning |
|---|---|---|---|
| **Impact (I)** | 40% | Severity `5/10/15` · Breadth `5/10/15` · Trend `3/6/8/10` | How bad, how many, which way |
| **Fit (F)** | 40% | Realizability `4/8/12/16` · Visibility `4/8/12` · Responsiveness `4/8/12` | Can one person ship it; will anyone notice; will HF engage |
| **Entry (E)** | 20% | Difficulty `4/10/16` · Domain-requirements `4/8/12` · Time `4/8/10/12` | Cost of entering the problem as a candidate |

`C = 0.4·I + 0.4·F + 0.2·E` (0–40 scale; 40 = perfect candidate-owned problem).

### 3.1 Anchor calibration (fixed by the plan)

Two cells were fixed as calibration anchors **before** scoring the rest:

- **M1-08** (= P-A13, datasets streaming leaks/hangs): `I 38 (15/15/8) · F 40 (16/12/12) · E 28 (10/8/10)` → **C = 36.8**. The `trend=8` and `time=10` cells are documented *intermediate* values; the trend=8 midpoint ("accelerating, slowly") is reused only for M4-03.
- **M4-01** (= P-D01, value-capture gap): `I 40 (15/15/10) · F 16 (4/8/4) · E 12 (4/4/4)` → **C = 24.8** — a high-impact problem a **single candidate cannot move**: the hall-of-mirrors contrast to M1-08.

Both recompute exactly in the published tables (03-ranking, §1).

Where the merged or angle record uses composite labels (e.g. "MEDIUM-HIGH",
"LOW-MEDIUM"), the catalog block **labels the problem with the exact as-of value**
and scores the component with the nearest tap (HIGH-MEDIUM → 10, LOW-MEDIUM → 10;
the label line explains this). No WARN register exists for this task, so none is emitted.

## 4. Cross-picks (top of table)

| Rank | ID | C | One-liner |
|---|---|---|---|
| 1 | M3-16 | 37.2 | AI-agent PR flood → maintainer bottleneck (transformers) |
| 2 | M2-09 | 37.2 | `load_dataset` parquet streaming hangs; fix released but versions float |
| 3 | M1-08 | 36.8 | datasets streaming memory leaks & parquet hangs (anchor) |
| 4 | M2-13 | 36.4 | `create_repo(exist_ok=True, private=True)` silent privacy footgun |
| 5 | M1-15 | 35.6 | Download & Xet resilience (hangs, 403s, no resume) |
| 6 | M3-03 | 35.6 | Malicious/pickle models + weaponized datasets on the Hub |

Top-10 picks and rationale: see `04-top-picks.md`; the full 66-row table:
`03-ranking.md`.

## 5. Evidence handling

- All URLs, issue numbers, forum threads and figures are copied **verbatim** from
  the four raw research files (see `raw/`). No claim outside the research was
  added; where research itself was agnostic ("no visible SLA", "estimated"),
  the block says so.
- Where the research named a proposed solution (e.g. angle-D blocks list
  proposers like "HF itself proposes…", "HF forum users propose…", "Sayak Paul's
  model-card-generation"), the catalog credits them.
- Where a fix proposal has **no named proposer**, block uses the exact sentinel
  **`no named proposer found in research`**.
- Pulling a problem meant *Preference order* is not a promise: **worst case the
  choice collapses; every top-N block is solvable standalone.**

## 6. Files and ownership

| File | Contains |
|---|---|
| `01-overview.md` | This file |
| `02-problem-catalog.md` | 66 blocks, M-ID sorted |
| `03-ranking.md` | Full rank table, per-cluster, tie-break rules, verification |
| `04-top-picks.md` | Top-10 narratives + "what, who, why, how" |
| `05-apply-guide.md` | Usage guide for the candidate |