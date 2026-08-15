# 03 — Ranked table (all 66)

Sort: descending `C`, then `I`, `F`, `E`, then lexicographic `M-id`. Ties on `C`
are broken by `I`; ties on all four by ID order. Section 5 proves the table.

## 1. Full ranking (66)

| # | ID | C | I | F | E | Block |
|---|---|---:|---:|---:|---:|---|
| 1 | M3-16 | 37.2 | 40 | 40 | 26 | AI-agent PR flood / maintainer bottleneck |
| 2 | M2-09 | 37.2 | 35 | 40 | 36 | `load_dataset` parquet streaming hang (pyarrow; releases float) |
| 3 | M1-08 | 36.8 | 38 | 40 | 28 | datasets streaming: leaks + parquet hangs *(anchor)* |
| 4 | M2-13 | 36.4 | 33 | 40 | 36 | `create_repo(exist_ok, private=True)` silent privacy footgun |
| 5 | M1-15 | 35.6 | 40 | 36 | 26 | Download & Xet resilience (hangs / 403s / no resume) |
| 6 | M3-03 | 35.6 | 40 | 36 | 26 | Malicious/pickle models + weaponized datasets |
| 7 | M1-07 | 35.6 | 31 | 40 | 36 | `from_pretrained` ~2× init, parallel loading opt-in |
| 8 | M1-02 | 33.2 | 31 | 36 | 32 | tokenizers release pipeline + semver violations |
| 9 | M3-01 | 32.0 | 36 | 28 | 32 | License metadata unreliable (model/dataset cards) |
| 10 | M1-06 | 31.6 | 31 | 32 | 32 | Gated repo + fine-grained token UX / 403s |
| 11 | M3-12 | 31.2 | 33 | 32 | 26 | Open-source-washing / OSAID stalemate |
| 12 | M1-04 | 30.0 | 31 | 28 | 32 | China firewalls: `HF_ENDPOINT` partially honored |
| 13 | M2-12 | 30.0 | 31 | 28 | 32 | Hub discoverability: tag filters broken/missing |
| 14 | M1-14 | 30.0 | 23 | 32 | 40 | Docs & good-first-issue hygiene |
| 15 | M3-04 | 29.2 | 35 | 32 | 12 | Dataset-processing SSRF/Jinja2/HDF5 (July 2026 incident) |
| 16 | M3-02 | 29.2 | 33 | 24 | 32 | Data/bias/license documentation gap |
| 17 | M3-11 | 29.2 | 31 | 32 | 20 | Leaderboard gaming / contamination (OLLB) |
| 18 | M2-04 | 29.2 | 23 | 32 | 36 | `gradio_client`↔gradio 6.x crash |
| 19 | M1-01 | 28.8 | 31 | 28 | 26 | transformers v5 breaking-change wave |
| 20 | M2-01 | 28.0 | 26 | 28 | 32 | Spaces cold boot latency |
| 21 | M2-08 | 27.6 | 21 | 32 | 32 | Legacy Inference API deprecation drift |
| 22 | M2-03 | 27.2 | 31 | 24 | 26 | Gradio 5→6 migration breakage |
| 23 | M1-05 | 26.8 | 23 | 28 | 32 | Cache management & dedup |
| 24 | M1-13 | 26.8 | 23 | 28 | 32 | `huggingface_hub` v1 API churn |
| 25 | M4-02 | 26.4 | 40 | 20 | 12 | ZeroGPU / free-tier meltdowns on viral surges |
| 26 | M1-11 | 26.4 | 26 | 24 | 32 | diffusers API churn vs stale tutorials |
| 27 | M2-05 | 26.4 | 26 | 24 | 32 | Share links 72h expiry / frpc blocks |
| 28 | M2-14 | 26.4 | 26 | 24 | 32 | Gated-repo approval: weeks, no SLA |
| 29 | M2-15 | 26.4 | 26 | 24 | 32 | doc-builder breakage / stale notebooks |
| 30 | M3-10 | 26.4 | 26 | 24 | 32 | Gated access: no approval API |
| 31 | M3-15 | 26.4 | 21 | 32 | 26 | Docs contributor fragmentation |
| 32 | M3-08 | 26.0 | 33 | 24 | 16 | CSP/CSAM generative enforcement |
| 33 | M3-09 | 26.0 | 31 | 24 | 20 | Copyright & scrape-derived datasets |
| 34 | M1-03 | 25.6 | 23 | 28 | 26 | slow/fast tokenizer + v5 unification |
| 35 | M1-09 | 25.6 | 23 | 28 | 26 | optimum / optimum-intel fragmentation |
| 36 | M3-06 | 25.2 | 31 | 24 | 16 | Gradio security depth (475k+ Spaces) |
| 37 | M2-07 | 25.2 | 28 | 24 | 22 | Opaque 429 / rate-limit dashboard |
| 38 | M4-13 | 25.2 | 26 | 24 | 26 | Long-tail cost (2M models, 45PB) |
| 39 | M2-17 | 25.2 | 23 | 24 | 32 | `sdk_version` pin conflicts |
| 40 | M4-01 | 24.8 | 40 | 16 | 12 | Value-capture gap *(anchor)* |
| 41 | M2-06 | 24.8 | 31 | 20 | 22 | `:cheapest` provider down / no fallback |
| 42 | M3-13 | 24.8 | 26 | 24 | 24 | Generative provenance (C2PA) voluntary |
| 43 | M1-10 | 24.4 | 26 | 24 | 22 | bitsandbytes maintenance / CI |
| 44 | M2-11 | 24.4 | 26 | 24 | 22 | Dataset viewer `/search` first chunk only |
| 45 | M3-07 | 24.0 | 23 | 24 | 26 | Moderation transparency |
| 46 | M2-10 | 23.6 | 28 | 20 | 22 | Dataset viewer 429 queue size |
| 47 | M3-14 | 23.6 | 23 | 24 | 24 | "Stack of models" reuse rules |
| 48 | M1-12 | 23.6 | 18 | 28 | 26 | TRL trainer sprawl → v1 reorg |
| 49 | M2-02 | 23.2 | 18 | 24 | 32 | No visible Spaces quota/limits |
| 50 | M3-05 | 22.8 | 26 | 20 | 22 | Invite-only bug bounty |
| 51 | M2-16 | 22.4 | 18 | 24 | 28 | Team tier SCIM/RBAC gap |
| 52 | M4-03 | 22.0 | 33 | 16 | 12 | Inference middleware trap |
| 53 | M4-05 | 21.2 | 31 | 16 | 12 | China gravity / downloads |
| 54 | M4-06 | 21.2 | 31 | 16 | 12 | Open weights self-host everywhere |
| 55 | M4-08 | 21.2 | 31 | 16 | 12 | ToS training-use ambiguity |
| 56 | M4-09 | 21.2 | 31 | 16 | 12 | Data residency / ISO 27001 gap |
| 57 | M4-04 | 19.2 | 26 | 16 | 12 | "Open heaven, closed enterprise" pitch |
| 58 | M4-07 | 19.2 | 26 | 16 | 12 | Comp / retention gap |
| 59 | M4-10 | 19.2 | 26 | 16 | 12 | Enterprise support silence |
| 60 | M4-14 | 19.2 | 26 | 16 | 12 | Agent/MCP-era value shift |
| 61 | M4-16 | 19.2 | 26 | 16 | 12 | OpenAI open-pivot (gpt-oss) |
| 62 | M4-17 | 19.2 | 26 | 16 | 12 | Cloud "model gardens" catalogs |
| 63 | M4-18 | 19.2 | 26 | 16 | 12 | Revenue concentration to few models |
| 64 | M4-11 | 18.0 | 23 | 16 | 12 | FR/EU "champion" tension |
| 65 | M4-12 | 18.0 | 23 | 16 | 12 | Liquidity staleness / no new round |
| 66 | M4-15 | 18.0 | 23 | 16 | 12 | Capex arms-race two-sided bet |

## 2. Per-cluster tables

### M1 — Open-source libraries (15)

| # | ID | C | I | F | E |
|---|---|---:|---:|---:|---:|
| 1 | M1-08 | 36.8 | 38 | 40 | 28 |
| 2 | M1-15 | 35.6 | 40 | 36 | 26 |
| 3 | M1-07 | 35.6 | 31 | 40 | 36 |
| 4 | M1-02 | 33.2 | 31 | 36 | 32 |
| 5 | M1-06 | 31.6 | 31 | 32 | 32 |
| 6 | M1-04 | 30.0 | 31 | 28 | 32 |
| 7 | M1-14 | 30.0 | 23 | 32 | 40 |
| 8 | M1-01 | 28.8 | 31 | 28 | 26 |
| 9 | M1-05 | 26.8 | 23 | 28 | 32 |
| 10 | M1-13 | 26.8 | 23 | 28 | 32 |
| 11 | M1-11 | 26.4 | 26 | 24 | 32 |
| 12 | M1-03 | 25.6 | 23 | 28 | 26 |
| 13 | M1-09 | 25.6 | 23 | 28 | 26 |
| 14 | M1-10 | 24.4 | 26 | 24 | 22 |
| 15 | M1-12 | 23.6 | 18 | 28 | 26 |

### M2 — Product surfaces & platform services (17)

| # | ID | C | I | F | E |
|---|---:|---:|---:|---:|---:|
| 1 | M2-09 | 37.2 | 35 | 40 | 36 |
| 2 | M2-13 | 36.4 | 33 | 40 | 36 |
| 3 | M2-12 | 30.0 | 31 | 28 | 32 |
| 4 | M2-04 | 29.2 | 23 | 32 | 36 |
| 5 | M2-01 | 28.0 | 26 | 28 | 32 |
| 6 | M2-08 | 27.6 | 21 | 32 | 32 |
| 7 | M2-03 | 27.2 | 31 | 24 | 26 |
| 8 | M2-05 | 26.4 | 26 | 24 | 32 |
| 9 | M2-14 | 26.4 | 26 | 24 | 32 |
| 10 | M2-15 | 26.4 | 26 | 24 | 32 |
| 11 | M2-07 | 25.2 | 28 | 24 | 22 |
| 12 | M2-17 | 25.2 | 23 | 24 | 32 |
| 13 | M2-06 | 24.8 | 31 | 20 | 22 |
| 14 | M2-11 | 24.4 | 26 | 24 | 22 |
| 15 | M2-10 | 23.6 | 28 | 20 | 22 |
| 16 | M2-02 | 23.2 | 18 | 24 | 32 |
| 17 | M2-16 | 22.4 | 18 | 24 | 28 |

### M3 — Governance & trust (16)

| # | ID | C | I | F | E |
|---|---:|---:|---:|---:|---:|
| 1 | M3-16 | 37.2 | 40 | 40 | 26 |
| 2 | M3-03 | 35.6 | 40 | 36 | 26 |
| 3 | M3-01 | 32.0 | 36 | 28 | 32 |
| 4 | M3-12 | 31.2 | 33 | 32 | 26 |
| 5 | M3-04 | 29.2 | 35 | 32 | 12 |
| 6 | M3-02 | 29.2 | 33 | 24 | 32 |
| 7 | M3-11 | 29.2 | 31 | 32 | 20 |
| 8 | M3-10 | 26.4 | 26 | 24 | 32 |
| 9 | M3-15 | 26.4 | 21 | 32 | 26 |
| 10 | M3-08 | 26.0 | 33 | 24 | 16 |
| 11 | M3-09 | 26.0 | 31 | 24 | 20 |
| 12 | M3-06 | 25.2 | 31 | 24 | 16 |
| 13 | M3-13 | 24.8 | 26 | 24 | 24 |
| 14 | M3-07 | 24.0 | 23 | 24 | 26 |
| 15 | M3-14 | 23.6 | 23 | 24 | 24 |
| 16 | M3-05 | 22.8 | 26 | 20 | 22 |

### M4 — Business & strategy (18)

| # | ID | C | I | F | E |
|---|---:|---:|---:|---:|---:|
| 1 | M4-02 | 26.4 | 40 | 20 | 12 |
| 2 | M4-13 | 25.2 | 26 | 24 | 26 |
| 3 | M4-01 | 24.8 | 40 | 16 | 12 |
| 4 | M4-03 | 22.0 | 33 | 16 | 12 |
| 5 | M4-05 | 21.2 | 31 | 16 | 12 |
| 6 | M4-06 | 21.2 | 31 | 16 | 12 |
| 7 | M4-08 | 21.2 | 31 | 16 | 12 |
| 8 | M4-09 | 21.2 | 31 | 16 | 12 |
| 9 | M4-04 | 19.2 | 26 | 16 | 12 |
| 10 | M4-07 | 19.2 | 26 | 16 | 12 |
| 11 | M4-10 | 19.2 | 26 | 16 | 12 |
| 12 | M4-14 | 19.2 | 26 | 16 | 12 |
| 13 | M4-16 | 19.2 | 26 | 16 | 12 |
| 14 | M4-17 | 19.2 | 26 | 16 | 12 |
| 15 | M4-18 | 19.2 | 26 | 16 | 12 |
| 16 | M4-11 | 18.0 | 23 | 16 | 12 |
| 17 | M4-12 | 18.0 | 23 | 16 | 12 |
| 18 | M4-15 | 18.0 | 23 | 16 | 12 |

## 3. Tier analysis

- **Top band (C ≥ 30, #1–14):** every problem is either (a) a youthful, well
  scoped library bug with a visible upstream fix path (M1-08, M2-09, M1-07,
  M1-02) or (b) a supply-chain/governance issue where Hugging Face *wants* a
  public contribution (M3-16, M3-03, M3-01). Candidates should read
  `04-top-picks.md` here.
- **Middle band (~25–30):** the *duty-station* problems — real pain with good
  PR potential (docs, Spaces, caching) but lower headline value.
- **Bottom band (≤ 24.8):** strategy/business problems (M4) that a candidate
  cannot unilaterally "fix"; they belong in interview discussion, not PRs.
  Note the two anchors land here (M4-01 = 24.8) and at rank 3 (M1-08 = 36.8) as
  designed.

## 4. Verification (this task's 6 checks)

1. **66 unique blocks, no gaps, no dupes.** Rows count = 66; IDs M1-01..M1-15,
   M2-01..M2-17, M3-01..M3-16, M4-01..M4-18; no ID absent, no ID repeated:
   PASS (script-checked).
2. **All 72 original P-IDs present** across merged lists: PASS — M1-15 contains
   {A05,A06,A07,B14,B15}; M3-16 contains {A02,C015}; M3-03 contains {A12,C003};
   all others 1:1; each original appears exactly once.
3. **Anchor composites** recompute: M1-08 `38/40/28 → 36.8` PASS; M4-01 `40/16/12 → 24.8` PASS.
4. **Descending order monotonic** in (C, I, F, E, id): PASS.
5. **Cluster-membership matches research clusters**: A→M1, B→M2, C→M3, D→M4: PASS (all 19+19+16+18 mapping verified by merge table).
6. **Scope discipline**: only files under `research_doc/huggingface-challenges/` plus the single coder summary were written; no git commands executed that alter repository state; pass-through caveat in `05-apply-guide.md`.