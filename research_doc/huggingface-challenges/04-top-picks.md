# 04 — Top-10 picks (best candidate opportunities)

Ten picks drawn from the full ranked list (`03-ranking.md` §1), at least two
per cluster. Choice criteria: high composite `C`, a **client-side, solo-dev
entry point** (YAGNI-safe), a public issue/thread anchor, and strong
"recognizability" for an interview. The `Effort` column is a rough single-dev
estimate; `Mode` says whether the move lives in an open-source repo or is a
documented tool for the candidate.

| # | Rank | ID | Problem | C | Why this one | Mode | Effort | Persona |
|---|------|-----|---------|---|--------------|------|--------|---------|
| 1 | 1 | M3-16 | AI-agent PR flood / maintainer bottleneck | 37.2 | HF itself says repos are "overwhelmed" by code-agent PRs; the 2026-estable differentiator topic | Interview + tooling | 2-6 wk | Security |
| 2 | 2 | M2-09 | `load_dataset` parquet streaming hang (pyarrow) | 37.2 | Upstream fix exists but versions float → a 10-line pin/fallback fix is genuinely useful today | Client PR | <1 wk | ML/platform engineer |
| 3 | 3 | M1-08 | datasets streaming: memory leaks + parquet hangs | 36.8 | The canonical solo PR: anchored issues (#7269/#7722/#6814), benchmarkable, maintainers responsive | OSS PR | 2-4 wk | ML/platform engineer |
| 4 | 4 | M2-13 | `create_repo(exist_ok=True, private=True)` silent privacy footgun | 36.4 | A few lines of guard + warning prevent real data leaks; pure client-side; blast radius huge | Client PR | <1 wk | ML/platform engineer |
| 5 | 5 | M1-15 | Download & Xet resilience (hangs/403s/no resume) | 35.6 | "-how does your downloader behave on a bad network" is a live question; toggles exist (HF_HUB_DISABLE_XET) | Tool (CLI) | 1-2 wk | ML/platform engineer |
| 6 | 6 | M3-03 | Malicious/pickle models + weaponized datasets | 35.6 | Highest-visibility security win on the Hub; static `__reduce__`/safetensors converter is self-contained | Client tool / OSS | 2-4 wk | Security |
| 7 | 7 | M1-07 | `from_pretrained` ~2× init (parallel loading opt-in) | 35.6 | A benchmark harness + "make fast path default" argument is achievable and gets maintainer attention | Ops PR | 2-4 wk | ML/platform engineer |
| 8 | 9 | M3-01 | License metadata unreliable in cards | 32.0 | SPDX lint + drift report is open-tooling with academic precedent; EU AI Act tailwind | Client tool | 1-2 wk | Security |
| 9 | 25 | M4-02 | ZeroGPU / free-tier surge meltdowns | 26.4 | Best *strategy* pick: concrete April 2026 gpt-oss incident, client-side quota monitor | Interview case | talk | PM/strategy |
| 10 | 40 | M4-01 | Value capture: "home of all AI" vs revenue rounding error | 24.8 | The anchor strategy block; cracks the enterprise case in one sentence | Interview case | talk | PM/strategy |

Persona per the plan: clusters 1-2 → ML/platform engineer, cluster 3 → Security, cluster 4 → PM/strategy.

Notes
- Everything in row 1-8 has a **public issue/PR anchor** (see `02-problem-catalog.md` raw IDs and `04`-style evidence in `raw/`).
- Rows 1-8 are the "portfolio" a technical candidate should own; rows 9-10 are the strategy layers for "what would you change at HF" questions.
- See `05-apply-guide.md` for the 3-week plan that turns any of these into a narrative.
- Picks use the same composite `C` from `03-ranking.md`; anchors M1-08 (36.8) and M4-01 (24.8) are included on purpose.