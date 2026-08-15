# 02 — Problem catalog (66 blocks)

One block per problem, ordered by the composite **rank** (descending `C`) from
`03-ranking.md`. Each block lists the three factor scores — **I** (Impact
/40), **F** (Fit /40), **E** (Entry /40) — and the composite **C** (/40),
weights 0.4·I + 0.4·F + 0.2·E, all matching `03-ranking.md` and the anchors in
`01-overview.md` (M1-08 → 36.8/40; M4-01 → 24.8/40). Severity labels are
research ratings, as of the 2026-08-08 snapshot. Sources were captured in the
same snapshot; every URL/ref carries its known date. Where research names no
proposer for a solution, the field says the sentinel
`no named proposer found in research — applicant can be the first`.

---

### M3-16 — AI-agent PR flood / maintainer bottleneck (rank #1 of 66, C 37.2/40)
- **Surface/location:** `huggingface/transformers` (PR queue, issue tracker, contributing docs).
- **Why it matters:** the contributing guide itself says the team is "overwhelmed by PRs
  and issue comments written by code agents" and "bottlenecked by our ability to review";
  ~2,400 open issues and weekly minor releases. Agent-generated PRs consume reviewer
  hours, first-time human contributors lose the feedback loop, and trust in the
  contribution pipeline erodes.
- **Severity:** HIGH — structural SHIFT risk to the OSS contribution model (research
  ratings HIGH/MEDIUM-HIGH across P-A02 + P-C015 sources), as of 2026-08-08 snapshot.
- **Proposed solutions:** 1. automated PR triage/labeling bots + "review-ready" checklist
  bots (Angle A proposal, no named proposer in research — applicant can be the first);
  2. official policy + triage lane for AI-generated PRs (Angle A proposal, no named
  proposer — applicant can be the first); 3. dedicated agent-PR queue + CI runtime
  checks for permissioned files (Angle C proposal; no named proposer found in research —
  applicant can be the first); 4. community issue-triage office hours (HF practice).
- **Difficulty for applicant:** MEDIUM — process design + bot engineering against a
  moving repo; no deep model work needed, but public policy sensitivity.
- **Axis scores:** I 40/40 · F 40/40 · E 26/40 → C 37.2/40
- **Cluster:** 3 (merged from P-A02, P-C015)
- **Sources:** https://huggingface.co/docs/transformers/en/contributing (2025-2026);
  HF forum + issue replies from core team (2025-2026).

### M2-09 — `load_dataset` parquet streaming hang (rank #2 of 66, C 37.2/40)
- **Surface/location:** `huggingface/datasets` steaming path; pyarrow `ParquetFileFragment.to_batches()`.
- **Why it matters:** streaming parquet hangs forever in threads for pyarrow<25 users; the bug
  is upstream (arrow#45214) with a dataset-side workaround (#8176) that still floats on release
  versions. Training pipelines that stream large datasets stall silently at scale.
- **Severity:** HIGH — research rates high (Angle B P-B09).
- **Proposed solutions:** 1. force/require pyarrow>=25 with a version gate + workaround path
  (datasets maintainers fix #8176/#8188, 2025); 2. add a regression test reproducing the hang
  on pinned pyarrow (no named proposer found in research — applicant can be the first); 3.
  surface a clear error instead of a hang (no named proposer).
- **Difficulty for applicant:** MEDIUM — code path is narrow but inside the Rust/Python reader
  boundary; a repro is easy.
- **Axis scores:** Impact 35/40 · Fit 40/40 · Entry 36/40 → C 37.2/40
- **Cluster:** 2 (from P-B09)
- **Sources:** pyarrow#45214; datasets/issues#7467, #8168, #8176 (2025); notebook on datasets
  streaming parquet hang.

### M1-08 — datasets streaming: leaks + parquet hangs (rank #3 of 66, C 36.8/40)
- **Surface/location:** `huggingface/datasets` streaming, `map(num_proc=...)`, audio streaming.
- **Why it matters:** the canonical "streaming" bugs: memory leaks while iterating (issues
  #7269, #7721, #6530), OOM with many workers (#7722), and parquet streaming hangs (#7947,
  pyarrow). Streaming is the recommended pattern for large datasets, so leaks make it unusable
  at training scale; open more than a year.
- **Severity:** MEDIUM (recurring pain, not a safety incident) — as-of snapshot 2026-08-08
- **Proposed solutions:** 1. reproduce + fix the iterator reference leak (maintainer lhoestq et
  al. historically responsive in these threads, Angle A); 2. GC/close hygiene tests
  (no named proposer found — applicant can be the first); 3. guard pyarrow parquet streaming
  edge cases (fixed upstream by #8176 workaround, HF maintainers).
- **Difficulty for applicant:** MEDIUM — defined repro with a clean benchmark; opened a year+.
- **Axis scores:** Impact 38/40 · Fit 40/40 · Entry 28/40 → C 36.8/40 (anchor: 01-1.md)
- **Cluster:** 1 (from P-A13)
- **Sources:** datasets/#7269, #7722, #6814, #7947 (2024-2025, snapshot 2026-08-08);
  #6176 workaround; `01-overview.md` anchor row.

### M2-13 — `create_repo(exist_ok=True, private=True)` privacy footgun (rank #4 of 66, C 36.4/40)
- **Surface/location:** `huggingface_hub` / HF API `create_repo`.
- **Why it matters:** silently leaves an existing repo public when `private=True` is passed —
  a privacy leak class bug affecting every `create_repo` user before editing private repos. When
  exist_ok is true and the repo already exists, visibility is not updated; new users read the
  flag as authoritative.
- **Severity:** HIGH — data-leak-class footgun (angle B P-B13 rates high)
- **Proposed solutions:** 1. update privacy when exist_ok and private=True are both passed
  (proposed by the angle B research, surfaced via the_blurred blog + docs); 2. warn loudly when
  visibility is not flipped (no named proposer — applicant can be the first).
- **Difficulty for applicant:** EASY — a few lines in `get_repo`/`create_repo` plus tests.
- **Axis scores:** Impact 33/40 · Fit 40/40 · Entry 36/40 → C 36.4/40
- **Cluster:** 2 (from P-B13)
- **Sources:** huggingface_hub docs `create_repo` (2025); the_blurred blog "flip your repo
  private" (2024); discussed in user groups 1554 20 (2025).

### M1-15 — Download & Xet resilience (hangs / 403s / no resume) (rank #5 of 66, C 35.6/40)
- **Surface/location:** huggingface_hub download internals, `hf_xet`, `hf_transfer` legacy
  path, shared file cache.
- **Why it matters:** five merged originals (P-A05/A06/A07, P-B14/P-B15): hangs at 99%,
  403s on restricted networks, no resume/parallelism, Windows >2GB upload stall, and no
  bandwidth throttle. Every heavy downloader (training clusters, CI, egress) pays, and
  the download pipeline is the single most user-facing surface of the Hub.
- **Severity:** HIGH — research ratings MEDIUM-HIGH..HIGH across the merged set, as of the
  2026-08-08 snapshot.
- **Proposed solutions:** 1. persist upload state + resume (issue #3701/#3726/#3871 —
  Windows 2GB stall; proposer: HF download pipeline team, active work); 2. make Xet
  fallback honor HF_ENDPOINT on restricted networks (proposer: HF maintainers,
  docs/concepts/migration); 3. add `--max-rate` token-bucket CLI flag (proposer: issue
  #2118 reporter); 4. auto-retry with backoff in the Python API (no named proposer found
  in research — applicant can be the first); 5. document workaround matrix for Xet
  stalling (proposer: community — HF_HUB_DISABLE_XET, xet-core#409).
- **Difficulty for applicant:** MEDIUM-HARD — download/upload internals span Rust (xet-core)
  + Python; an isolated repro and a slow-lane PR are feasible.
- **Axis scores:** Impact 40/40 · Fit 36/40 · Entry 26/40 → C 35.6/40
- **Cluster:** 1 (merged from: P-A05, P-A06, P-A07, P-B14, P-B15)
- **Sources:** huggingface_hub#2677, #2118, #2658, #3871, #3726, #3701; xet-core#409;
  docs/concepts/migration (2024-2026).

### M3-03 — Malicious/pickle models + weaponized datasets (rank #6 of 66, C 35.6/40)
- **Surface/location:** Hub model/dataset upload path; pickle weights (`.bin`, `.pt`, joblib).
- **Why it matters:** pickle executes code at load; estimates >2.1B pickle downloads/month (PickleBall
  arXiv 2508.15787), ~100 malicious models (JFrog 2025), scanner-evasion PoCs (ReversingLabs
  2025). A single malicious repo is a supply-chain incident for thousands of consumers.
- **Severity:** HIGH (security, supply-chain scope)
- **Proposed solutions:** 1. safetensors default + enforcement roadmap (HF security guidance,
  "What are Pickle and Safetensors?" docs, 2022-2023); 2. pickle scanner with `weights_only` default in torch.load (PyTorch community,
  GHSA-63cw-57p8-fm3p Jan 2025); 3. pickle-scanning "PickleGate" PoCs (JFrog and
  ReversingLabs trace it; no strict role for applicant naming); 4. conversion bot for popular
  repos to safetensors (angle A P-A12 proposal; no named proposer — applicant can be first).
- **Difficulty for applicant:** MEDIUM (scanner+conversion can be a solo PR; kernel loader work is HARD).
- **Axis scores:** Impact 40/40 · Fit 36/40 · Entry 26/40 → C 35.6/40
- **Cluster:** 3 (merged from P-A12, P-C003)
- **Sources:** security-pickle docs; arXiv 2508.15787; JFrog blog (2025-03);
  cybersecuritynews 2025-02; huggingface/transformers GHSA-63cw-57p8-fm3p; NVD CVE-2025-14930.

### M1-07 — `from_pretrained` ~2x init / parallel loading opt-in (rank #7 of 66, C 35.6/40)
- **Surface/location:** `transformers` `from_pretrained`, safetensors logic, pytorch load.
- **Why it matters:** cold-start model load ~2x theoretical; parallel loading exists but switched off by
  default (#27709, #36835) and users must know 3 flags. Serving cold start and every local
  notebook load pays 2x on the single most common entry point.
- **Severity:** MEDIUM — visible, benchmarkable, no security impact.
- **Proposed solutions:** 1. flip `HF_ENABLE_PARALLEL_LOADING` once safe/fast path is default
  (proposed in thread of #36835, transformers maintainers); 2. `low_cpu_mem_usage`/`device_map`
  defaults revisited (perf issue #21913); 3. benchmark harness over popular models (no named
  proposer).
- **Difficulty for applicant:** MEDIUM — binary perf engineering, need careful bench + tests.
- **Axis scores:** Impact 31/40 · Fit 40/40 · Entry 36/40 → C 35.6/40
- **Cluster:** 1 (from P-A11)
- **Sources:** transformers/#21913, /#27709, /#36835 (2024-2026); docs/transformers main
  classes model (2026).

### M1-02 — tokenizers release pipeline + semver violations (rank #8 of 66, C 33.2/40)
- **Surface/location:** `huggingface/tokenizers` release engineering (Python/Rust/nPM).
- **Why it matters:** the tokenizer used by transformers + vLLM + many downstreams has shipped with
  semver violations (0.21.x, 0.23.2), missed wheels (Node multi-platform missing since 2023),
  silent Python 3.9 drops, and 3–4 pin/unoot churn events across transformers 2024-26. Every
  downstream of the ecosystem rebuilds around broken releases.
- **Proposed solutions:** 1. CI-driven release automation (action pipeline never finished from 2023 plan;
  listed in issue #1855); 2. semver policy + gate in CI (no named proposer); 3. matrix tests
  for python+npm+node wheels each release (no named proposer); 4. community-maintained release
  checklist (research proposal; no named proposer found in research — applicant can be the first).
- **Severity:** HIGH (per Angle A P-A03)
- **Difficulty for applicant:** MEDIUM — release engineering on three build systems, visible
  and bounded.
- **Axis scores:** Impact 31/40 · Fit 36/40 · Entry 32/40 → C 33.2/40
- **Cluster:** 1 (from P-A03)
- **Sources:** tokenizers/releases, tag v0.21.2, #1855, #2091; transformers#45736 (pin, 2026);
  tokenizers/#1855, /#2094 (2024-2026).

### M3-01 — License metadata unreliable (model/dataset cards) (rank #9 of 66, C 32.0/40)
- **Surface/location:** Hub model card `license:` tag validation; `datasets` card license field.
- **Why it matters:** the license tag is user-entered with no verification: two academic audits found 35%
  of model→app transitions relicense permissively (Jewitt et al., arXiv 2507.09873) and Stalnaker
  2025 (dataset→model 175k/760k). Enterprises cannot trust a filter on a recovering license.
- **Severity:** HIGH — data-integrity and legal exposure for the whole catalog.
- **Proposed solutions:** 1. LicenseRec rule engine (Jewitt et al. 2025, arXiv 2507.09873); 2. LicenseGPT
  FM for dataset license compliance (arXiv 2501.04806); 3. enforced SPDX identifiers + allowlist
  (Gorwa/Vak-E via CFI; docs "model-cards guidelines" present, May 2026); 4. per-author license
  drift reporting tool (Stalnaker data; user-side tooling gap — applicant first).
- **Difficulty for applicant:** MEDIUM (legal-ish data engineering; scan all repos).
- **Axis scores:** Impact 36/40 · Fit 28/40 · Entry 32/40 → C 32.0/40
- **Cluster:** 3 (from P-C001)
- **Sources:** arXiv 2507.09873, 2501.04806; Hugging Face model-card guidelines (2025-05);

### M1-06 — Gated repo + fine-grained token UX / 403s (rank #10 of 66, C 31.6/40)
- **Surface/location:** huggingface_hub auth; fine-grained token checkbox; gated-repo requests.
- **Why it matters:** public gated repos 403 for fine-grained tokens unless "enable access to public
  gated repositories" is ticked — undocumented enough for a steady stream of tickets
  (#2844); three env vars (HF_TOKEN/HUGGINGFACE_HUB_TOKEN/HF_HUB_TOKEN) with overlapping
  precedence; users of the most-popular gated models hit first-run failures.
- **Severity:** MEDIUM-HIGH (angle A)
- **Proposed solutions:** 1. client-side error message pointing to the exact setting page
  (proposed in issue #2844 thread); 2. doc table of env-var precedence (researchers-tracked);
  3. reduce the 3-token vars confusion by targeting one + alias map (no named proposal).
- **Difficulty for applicant:** EASY — client-side message fix in `huggingface_hub/auth.py`.
- **Axis scores:** Impact 31/40 · Fit 32/40 · Entry 32/40 → C 31.6/40
- **Cluster:** 1 (from P-A10)
- **Sources:** huggingface_hub#2844; docs/hub/en/security-tokens (2025); forum 2025-12
  gated-403 threads.

### M3-12 — Open-source-claim fidelity / OSAID stalemate (rank #11 of 66, C 31.2/40)
- **Surface/location:** Hub model cards, `license:` tags, docs; OSI OSAID debate.
- **Why it matters:** the Hub hosts both permissively- and restrictively-licensed weights under one "open" brand; OSI's OSAID (Oct 2024) requires public training data, which most popular "open" models (Llama family included) do not meet — so the Hub's central "open" claim cannot be verified from the card; SFC/GNU push back publicly; the EU AI Act adds another definition, splitting compliance targets.
- **Severity:** LOW-MEDIUM (trust/positioning; no runtime impact, escalates with regulation) — as-of 2026-08-08 snapshot.
- **Proposed solutions:** 1. OSAID-compliance linter + per-card `open-source` badge with a `data-transparency` signal when training data is unknown (angle C proposal — no named proposer found in research; applicant can be the first); 2. automated card warning when license and data claims conflict (same); 3. explicit "open weights ≠ open-source AI" labeling guidance (P-C012 research).
- **Difficulty for applicant:** MEDIUM — policy-adjacent tooling; the linter is a contained software project; the policy debate itself is not winnable alone.
- **Axis scores:** I 33/40 · F 32/40 · E 26/40 → C 31.2/40
- **Cluster:** 3 (from P-C012)
- **Sources:** OSI OSAID (2024-10-28); TheNewStack rebuttal (Dec 2024); SFC/GNU critique (Kuhn, Oct 2024); TheVerge 2024-10-24.

### M1-04 — China & firewall-restricted networks: endpoints partially honored (rank #12 of 66, C 30.0/40)
- **Surface/location:** huggingface_hub HTTP layer, Xet client, CLI; `HF_ENDPOINT` support.
- **Why it matters:** huggingface.co is blocked in mainland China (since May 2023); users route via community mirrors (hf-mirror.com, hfd); several internal URLs are still hardcoded to the default host (multipart-complete during uploads, issue #2150) and Xet CAS endpoints extend the whitelist burden — leaving a third of the platform's traffic without an officially supported path.
- **Severity:** MEDIUM-HIGH — persistent years-long pain, no official fix (angle A P-A08).
- **Proposed solutions:** 1. route ALL client URLs (including multipart-complete and CAS endpoints) through `HF_ENDPOINT` (angle-A research proposal); 2. publish + verify the official restricted-network endpoint whitelist incl. Xet CAS (no named proposer — applicant can be the first); 3. open an official channel with mirror operators (P-A08 recommendation).
- **Difficulty for applicant:** MEDIUM — endpoint redirection plus test coverage.
- **Axis scores:** I 31/40 · F 28/40 · E 32/40 → C 30.0/40
- **Cluster:** 1 (from P-A08)
- **Sources:** huggingface_hub#2150; huggingface_hub#2830 (mirror request); hf-mirror.com; Rest-of-World block coverage (May 2023).

### M2-12 — Hub discoverability: tag filters broken / search returns wrong results (rank #13 of 66, C 30.0/40)
- **Surface/location:** `<hf.co/models>` search page; `library` filters; model-card tags; adapters.
- **Why it matters:** a ModelFilter/tag-mismatch bug (#1668) and missing tag search on model cards make "find a model by rare name/tag" unreliable (Reddit r/MachineLearning threads 2024–2026); adapter repos are missing `library` attribution; the market is 2M+ models and discovery failure buries the long tail and frustrates intent-driven navigation.
- **Severity:** MEDIUM (angle B P-B12) — user-facing, no risk profile.
- **Proposed solutions:** 1. fix and backfill tag/filter indexing (root: ModelFilter matching; no named proposer — applicant can be the first); 2. support tag-based search on model cards (P-B12); 3. assign `library_name` to adapter repos (angle B).
- **Difficulty for applicant:** LOW–MEDIUM — search-index plumbing with a test-fix loop.
- **Axis scores:** I 31/40 · F 28/40 · E 32/40 → C 30.0/40
- **Cluster:** 2 (from P-B12)
- **Sources:** huggingface#1668 (setup); "ModelFilter" blog; Reddit r/MachineLearning (2024–2026).

### M1-14 — Docs & good-first-issue hygiene (rank #14 of 66, C 30.0/40)
- **Surface/location:** transformers/diffusers docs; good-first-issue pipeline; ~2.4k open issues.
- **Why it matters:** the docs redesign has run for years; there is no cross-repo GFI dashboard; new contributors cannot find tractable tasks and the contributing guide now warns about AI-generated PR flood — onboarding is the funnel for both candidates and future maintainers.
- **Severity:** MEDIUM (P-A19) — no security impact, high long-term leverage.
- **Proposed solutions:** 1. cross-repo GFI dashboard (label audit + automation) (angle-A proposal); 2. "stale example" linter across docs pages (P-A19); 3. triage office hours with community maintainers (P-A19 practice).
- **Difficulty for applicant:** LOW — dashboards are self-contained; zero blocking risk.
- **Axis scores:** I 23/40 · F 32/40 · E 40/40 → C 30.0/40
- **Cluster:** 1 (from P-A19)
- **Sources:** HF blog transformers-docs-redesign; docs/transformers/en/contributing; transformer 10900.

### M3-04 — Dataset-processing security debt: SSRF/Jinja2/HDF5 escapes (rank #15 of 66, C 29.2/40)
- **Surface/location:** Hub dataset-processing workers (`datasets` / `datasets-server`, fsspec `reference://`), production kube pods.
- **Why it matters:** the July-2026 autonomous-agent intrusion proved a single dataset upload can reach cluster admin in <13h (HDF5 arbitrary file read + Jinja2 template eval in a worker; 17,600 attacker actions; disclosed 2026-07-16, timeline 2026-07-27; Black Hat USA + IEEE Spectrum 2026-08) — a boundary across 1.8M datasets.
- **Severity:** HIGH — supply-chain security incident class (angle C P-C004).
- **Proposed solutions:** 1. HF's own post-incident hardening (template eval disabled, IMDSv2 blocked, clusters rebuilt — HF security team, 2026); 2. a "just-in-time dataset scanner" for dataset files (angle-C follow-on; no named proposer — applicant can be the first); 3. sandbox + least-privilege processing pools (industry pattern; P-C004).
- **Difficulty for applicant:** HARD — infra-sec, requires platform access; the post-incident dataset-scanner project is the realistic open door.
- **Axis scores:** I 35/40 · F 32/40 · E 12/40 → C 29.2/40
- **Cluster:** 3 (from P-C004)
- **Sources:** HF blog security-incident-july-2026; HF technical timeline (2026-07-27); IEEE Spectrum 2026-08-06; CNBC/TechCrunch 2026-07.

### M3-02 — Data/bias/license documentation gap (rank #16 of 66, C 29.2/40)
- **Surface/location:** model cards, dataset cards, `library`/tags; Hub settings.
- **Why it matters:** studies (CPC24; EMSE 2026-03) found most model cards don't state training datasets, biases, or license compliance — downstream users can't vet provenance, enterprises abstain, and audits propagate opacity.
- **Severity:** MEDIUM-HIGH (P-C002) — legal/CSR scrutiny is rising (EU AI Act disclosures).
- **Proposed solutions:** 1. Sayak Paul's `model-card-generation` scripts (Hub, 2022); 2. HF model card template + required `base datasets` field (angle C); 3. "card completeness score" product feature (angle-C research recommendation); 4. datasheet-style metadata (Mitchell et al. pattern).
- **Difficulty for applicant:** LOW-MEDIUM — audits are spreadsheets+LLM; a completeness score is a small product feature.
- **Axis scores:** I 33/40 · F 24/40 · E 32/40 → C 29.2/40
- **Cluster:** 3 (from P-C002)
- **Sources:** dl.acm.org/doi/10.1145/3643882…; EMSE 2026-03; github.com/sayakpaul/model-card-generation-hf; docs/hub/model-cards.

### M3-11 — Leaderboard gaming / benchmark contamination (OLLB) (rank #17 of 66, C 29.2/40)
- **Surface/location:** Open LLM Leaderboard (v1/v2), benchmark pages, community discussions.
- **Why it matters:** v1 succumbed to saturation (12/20 top models trained on the benchmark — dataku, 2023); v2 (Oct 2024) fixed saturation, but in March 2026 a "Show HN" took #1 by duplicating 7 middle layers of a Qwen2-72B without touching weights — public proof the board can still be gamed; selection power over the ecosystem is real.
- **Severity:** MEDIUM (P-C011) — integrity issue, not runtime.
- **Proposed solutions:** 1. contamination detection tooling (EmergentMind-style estimators; open-source research); 2. private/dynamic probe blocks (LMSYS-style arena); 3. method-level contamination metrics (Gordienko et al. 2026); 4. community flagging (already partially live).
- **Difficulty for applicant:** MEDIUM (evals/MLOps) — a contamination detector over the leaderboard is a tractable solo project.
- **Axis scores:** I 31/40 · F 32/40 · E 20/40 → C 29.2/40
- **Cluster:** 3 (from P-C011)
- **Sources:** Open-LLM-leaderboard v2 (Oct 2024); HN "Show HN" 2026-03-10; dataku 2023-04 benchmark-contamination post.

### M2-04 — `gradio_client` ↔ gradio 6.x crash ("serializing" module missing) (rank #18 of 66, C 29.2/40)
- **Surface/location:** `gradio_client` (2.x) + gradio 6.x Spaces; consumer apps.
- **Why it matters:** a major mismatch crashes clients with `ModuleNotFoundError: gradio_client.serializing` (gradio#12844, 2026); when a Space upgrades to 6.x, every third-party client breaks unless the app pins its own client — silently, in production.
- **Severity:** MEDIUM (angle B P-B04) — client crash, production-visible.
- **Proposed solutions:** 1. client-side version-mismatch detection with a clear upgrade error (no named proposer — applicant can be the first); 2. pin `gradio_client` to the app's Gradio version (angle B recommendation); 3. publish a version-matrix page (P-B04).
- **Difficulty for applicant:** LOW–MEDIUM — client-side check + error mapping.
- **Axis scores:** I 23/40 · F 32/40 · E 36/40 → C 29.2/40
- **Cluster:** 2 (from P-B04)
- **Sources:** gradio#12844 (2026).

### M1-01 — transformers v5 breaking-change wave (rank #19 of 66, C 28.8/40)
- **Surface/location:** transformers v5 release train; tokenizers/vLLM/NixOS compatibility packages.
- **Why it matters:** v5 (merged Aug–Sep 2025) removes TF/JAX models, redesigns the weight-uning API and consolidates tokenizers; back-compat is deliberately dropped; ~26 weekly small-breaking patches create a moving target for the whole ecosystem (NixOS rollback to tokenizers 0.23.0 — nixpkgs#517274) and users stay pinned on v4.
- **Severity:** HIGH (P-A01) — ecosystem-wide churn.
- **Proposed solutions:** 1. per-breaking-change migration scripts (existing MIGRATION_GUIDE_V5 — transformers maintainers); 2. automated changelog generation per PR (angle-A); 3. version-pin linter over tutorials (angle-A).
- **Difficulty for applicant:** MEDIUM — design-heavy but mechanical; an "upgrade helper" CLI is a feasible solo contribution.
- **Axis scores:** I 31/40 · F 28/40 · E 26/40 → C 28.8/40
- **Cluster:** 1 (from P-A01)
- **Sources:** MIGRATION_GUIDE_V5.md; transformers v5.0.0 release; nixpkgs#517274; HF blog tokenizers v5.

### M2-01 — Spaces cold boot latency / free-tier wake instability (rank #20 of 66, C 28.0/40)
- **Surface/location:** free/paid Spaces; auto-sleep (48h) + wake path.
- **Why it matters:** Spaces take 60–150s to load after wake; the free tier has no warm start, quota semantics are invisible, and users hit flaky 5xx/429 restarts during incidents (discussion 174003; 2024–2026).
- **Severity:** MEDIUM (P-B01) — broad user-visible latency.
- **Proposed solutions:** 1. "Spaces health probe" tool (cold-start vs quota reporting; angle-B offering); 2. warm-start behavior for paid tiers (user proposal); 3. quota/“sleeping now” status surfaced in the UI (angle-B).
- **Difficulty for applicant:** LOW-MEDIUM — probe tool is client-side; platform internals are slower.
- **Axis scores:** I 26/40 · F 28/40 · E 32/40 → C 28.0/40
- **Cluster:** 2 (from P-B01)
- **Sources:** discussions 174003 + 174094 (2024–2026); docs/hub/en/spaces-gpus (autoload/sleep).

### M2-08 — Legacy Inference API deprecation drift (rank #21 of 66, C 27.6/40)
- **Surface/location:** docs `/docs/inference` legacy pages + tutorial sample code.
- **Why it matters:** the old serverless API is relegated, `use_legacy` flags are gone, yet tutorials from 2023–2024 still call deleted endpoints — a fresh user following the first recommended tutorial gets a dead call; docs publish a warning but not fix the rot.
- **Severity:** LOW (angle B P-B08) — docs/API hygiene, easy to fix.
- **Proposed solutions:** 1. docs linter that validates every endpoint in example code against the live API (no named proposer — applicant can be the first); 2. legacy-warning banner on dated tutorials (angle B); 3. legacy shutdown plan with redirects.
- **Difficulty for applicant:** LOW — docs CI lint, self-contained.
- **Axis scores:** I 21/40 · F 32/40 · E 32/40 → C 27.6/40
- **Cluster:** 2 (from P-B08)
- **Sources:** docs/inference legacy notes (2024–2025).

### M2-03 — Gradio 5→6 migration breaks running apps (rank #22 of 66, C 27.2/40)
- **Surface/location:** Gradio upgrading path; `migration-v5.md`; existing Spaces.
- **Why it matters:** upgrades break apps (queue/streaming, file access, `/wdir` paths, CORS changes) and old tutorials target removed functionality; "Gradio 5 but my app broke" is a standing 2025–2026 community thread — a loss of trust in forward compat.
- **Severity:** HIGH (P-B03) — frequent breakage, broad user base.
- **Proposed solutions:** 1. an upgrade-checker CLI that scans an app for deprecated APIs before migrating (angle-B proposal — applicant can be first); 2. in-app migration guide with breaking-item checklist (gradio team); 3. maintain migration-v5 as living doc.
- **Difficulty for applicant:** LOW–MEDIUM — a static-analysis linter over gradio apps.
- **Axis scores:** I 31/40 · F 24/40 · E 26/40 → C 27.2/40
- **Cluster:** 2 (from P-B03)
- **Sources:** gradio migration-v5.md; gradio issues 2025–2026.

### M1-05 — Cache management: opaque, duplicate blobs, no reflink (rank #23 of 66, C 26.8/40)
- **Surface/location:** huggingface_hub cache v1 → v2 (`hf cache ls/prune`), hardlink layout.
- **Why it matters:** cache dirs grow to tens/hundreds of GB with duplicated blobs, per-repo size accounting is awkward, symlink warnings appear on Windows/network filesystems, and the v1.0 cache-layout change invalidated prior tooling — disk hygiene is the most common support complaint in the tracker.
- **Severity:** MEDIUM (P-A09) — recurring pain, no risk profile.
- **Proposed solutions:** 1. reflink (copy-on-write) support on APFS/NTFS where available (PR #3120 exists; proposer: huggingface_hub contributors, 2024); 2. per-repo size reporting in `hf cache ls` (no named proposer — applicant can be the first); 3. documented v0.x→v2 migration path (HF docs).
- **Difficulty for applicant:** MEDIUM — filesystem layer + CLI; a clear benchmark.
- **Axis scores:** I 23/40 · F 28/40 · E 32/40 → C 26.8/40
- **Cluster:** 1 (from P-A09)
- **Sources:** docs/huggingface_hub concepts/migration (cache v2); huggingface_hub#3120 (reflink).

### M1-13 — huggingface_hub v1 API churn: httpx switch, CLI rename, per-minor breakage (rank #24 of 66, C 26.8/40)
- **Surface/location:** huggingface_hub public API; `huggingface-cli` → `hf` CLI; v1.0+ release train.
- **Why it matters:** v1.0.0 removed `Repository`, `HfFolder`, `InferenceAPI`, `resume_download`, `use_auth_token` and switched to httpx; later minors kept breaking (BucketUrl→uri, RepoUrl single-segment rejection, upload_folder multi-commit); every wrapper library in the ecosystem lags behind and users read five-year-old tutorials that are now wrong.
- **Severity:** MEDIUM (P-A18).
- **Proposed solutions:** 1. deprecation shims with clear timelines (angle-A proposal); 2. breaking-change announcement channel (same); 3. automated wrapper-compat CI over popular downstreams (no named proposer — applicant can be the first).
- **Difficulty for applicant:** LOW–MEDIUM — compat shims and test harnesses.
- **Axis scores:** I 23/40 · F 28/40 · E 32/40 → C 26.8/40
- **Cluster:** 1 (from P-A18)
- **Sources:** docs/huggingface_hub concepts/migration; release notes v1.16–v1.20.

### M4-02 — ZeroGPU / free-tier meltdowns on viral surges (gpt-oss, Apr 2026) (rank #25 of 66, C 26.4/40)
- **Surface/location:** ZeroGPU free tier + PRO/Team quota pools; `gpt-oss`-class surges.
- **Why it matters:** free unauthenticated users get ~2–5 min ZeroGPU/day; a viral model release exhausts limits mid-generation, paid tiers are starved too ("PAYS for the heavy stuff and it's dead"), queues grow hours — the onboarding "wow" becomes a reputation burn on every viral wave (Apr 2026 incident).
- **Severity:** HIGH (P-D02) — recurring with each viral release.
- **Proposed solutions:** 1. raise/restore free-tier quotas and cap backlog (HF forum users, Apr 2026); 2. per-second metered bursts + real-time paid queue (HF forum proposal); 3. dedicated paid-tier ZeroGPU quota pools (P-D02 research); 4. paywall heavy traffic and restore sane caching (HF admins).
- **Difficulty for applicant:** MEDIUM — infra/queue work needs HF access; a quota-tracking dashboard is the opened door.
- **Axis scores:** I 40/40 · F 20/40 · E 12/40 → C 26.4/40
- **Cluster:** 4 (from P-D02)
- **Sources:** HF forum Apr 2026 ZeroGPU threads; ZeroGPU docs; P-D02 angle-D block.

### M1-11 — Diffusers: breaking API churn vs stale tutorials (rank #26 of 66, C 26.4/40)
- **Surface/location:** `diffusers` 0.30+ releases; `LoraLoaderMixin` import path; tutorial ecosystem.
- **Why it matters:** 0.30 changed dtype defaults and device_map handling, the LoraLoaderMixin import path broke (#8975, reverted in follow-ups), third-party tutorials target 0.19–0.25 APIs and silently change outputs — the largest generative-AI user base pays for churn with rot-ridden tutorials.
- **Severity:** MEDIUM (P-A16).
- **Proposed solutions:** 1. breaking-change lint for docs examples (no named proposer — applicant can be the first); 2. deprecation-cycle policy (2 minor releases) (angle A); 3. tutorial version tagging (P-A16).
- **Difficulty for applicant:** LOW–MEDIUM — docs linting + policy.
- **Axis scores:** I 26/40 · F 24/40 · E 32/40 → C 26.4/40
- **Cluster:** 1 (from P-A16)
- **Sources:** diffusers#8975; diffusers v0.30.0 release; theneuralbase 0.30 notes.

### M2-05 — Share links: 72h expiry, frpc firewall blocks (rank #27 of 66, C 26.4/40)
- **Surface/location:** Gradio share links (`gradio.live`), frpc relay, Windows Defender whitelists.
- **Why it matters:** share links expire after 72h and route via frpc, which corporate networks/AVs block — the fastest demo path is unavailable to exactly the enterprise users the platform wants.
- **Severity:** MEDIUM (P-B05).
- **Proposed solutions:** 1. share-link watchdog/tool (angle-B offering); 2. document frpc whitelist thoroughly (gradio manages); 3. offer a longer-lived share option for paid tiers (P-B05).
- **Difficulty for applicant:** LOW–MEDIUM — watchdog is client-side.
- **Axis scores:** I 26/40 · F 24/40 · E 32/40 → C 26.4/40
- **Cluster:** 2 (from P-B05)
- **Sources:** gradio docs "Share your app" (frpc, whitelist).

### M2-14 — Gated-repo approval: weeks, no SLA (rank #28 of 66, C 26.4/40)
- **Surface/location:** gated repos; access-request workflow; author-side manual review.
- **Why it matters:** approvals take days–weeks with no SLA ("reasonable time to wait" threads, 2026); users' only option is bumping; researchers phoning in time-critical work stall and some resort to mirrors.
- **Severity:** MEDIUM (P-B16).
- **Proposed solutions:** 1. user-side access API / request status endpoint (angle B); 2. approval SLA + auto-notify on author activity (P-B16); 3. "remind author" button.
- **Difficulty for applicant:** LOW–MEDIUM — API + UI + notifications.
- **Axis scores:** I 26/40 · F 24/40 · E 32/40 → C 26.4/40
- **Cluster:** 2 (from P-B16)
- **Sources:** discussions "Gated repo permission still pending" (Nov 2024); docs models-gated.

### M2-15 — doc-builder breakage + stale notebooks (rank #29 of 66, C 26.4/40)
- **Surface/location:** Doc-Builder; transformers/diffusers docs; notebook gallery.
- **Why it matters:** docs builds break on signature mismatches (doc-builder#465; transformers#38613), notebooks from 2023 surface in current docs (#10900), translation targets break on rolling PRs (#41286) — the docs surface is the first contact for new users and it crumbles under CI drift.
- **Severity:** MEDIUM (P-B17).
- **Proposed solutions:** 1. docs-build CI with signature check over examples (no named proposer — applicant can be the first); 2. stale notebook linter (angle B); 3. backfill 2023 notebooks to current API (P-B17).
- **Difficulty for applicant:** LOW — CI lint + notebook update PRs, high visibility.
- **Axis scores:** I 26/40 · F 24/40 · E 32/40 → C 26.4/40
- **Cluster:** 2 (from P-B17)
- **Sources:** doc-builder#465; transformers#38613; transformers#10900.

### M3-10 — Gated access UX-blocking: no user-side API; manual approval (rank #30 of 66, C 26.4/40)
- **Surface/location:** Hub gated repos; `models-gated`; request/approval flow.
- **Why it matters:** only authors have API visibility for approvals; users cannot see status or "nudge"; manual model authors can go absent, leaving requests pending indefinitely (discuss 116063, Nov 2024); no SLA — blocks critical development.
- **Severity:** MEDIUM (P-C010).
- **Proposed solutions:** 1. user-side waitlist API with status + follow-up button; 2. org single view of gates; 3. late-approval notifications (P-C010 research — no named proposer — applicant first).
- **Difficulty for applicant:** LOW (UI + API) — approvals remain external.
- **Axis scores:** I 26/40 · F 24/40 · E 32/40 → C 26.4/40
- **Cluster:** 3 (from P-C010)
- **Sources:** discuss/116063; models-gated docs; Milos blog 2026-07.

### M3-15 — Docs contributor fragmentation: no unified entry (rank #31 of 66, C 26.4/40)
- **Surface/location:** docs split across many repos (hub-docs, transformers, notebooks); no unified search; no sanctioned "docs health" lane.
- **Why it matters:** static tutorials lag the feature set and stale-URL clusters hide in the multi-repo sprawl; contribution paths are split, and there is no upstream "docs maintenance" track — so the docs surface keeps losing to feature velocity.
- **Severity:** MEDIUM (P-C016).
- **Proposed solutions:** 1. docs-health dashboard + stale-URL tracker; 2. unified contribution skeleton; 3. centralize a docs-lane GFI program (P-C016 research — no named proposers, applicant can be the first).
- **Difficulty for applicant:** LOW — Sphinx/organization work.
- **Axis scores:** I 21/40 · F 32/40 · E 26/40 → C 26.4/40
- **Cluster:** 3 (from P-C016)
- **Sources:** docs landing; hub index; contributing rules.

### M3-08 — CSP/CSAM-inflected generative enforcement (nudify class) (rank #32 of 66, C 26.0/40)
- **Surface/location:** Hub content policy; hosted models on Spaces; reports pipeline.
- **Why it matters:** 2026 press (IBTimes) showed "one prompt" nudify outputs from hosted demo models; the platform relies on take-down after the fact; legal/CSAM-adjacent risk and bad-press waves erode trust; moderate surface is unknown — low cooperation with law.
- **Severity:** MEDIUM-HIGH (P-C008) — legal exposure; rising trend.
- **Proposed solutions:** 1. automatic NSFW-assessment flagging (NFAA) on such models with owner gating (P-C008; no named proposer — applicant can be the first); 2. content-policy milestone for weights not artifacts (angle C, hard); 3. civil-society/case partnership + dataset scanning (P-C008).
- **Difficulty for applicant:** HIGH for weights-level gating; MEDIUM for flagging pipeline.
- **Axis scores:** I 33/40 · F 24/40 · E 16/40 → C 26.0/40
- **Cluster:** 3 (from P-C008)
- **Sources:** IBTimes 2026; HF content-policy effective 2025-04-10; 404media snippet.

### M3-09 — Copyright & scrape-derived datasets (P-C009) (rank #33 of 66, C 26.0/40)
- **Surface/location:** community re-uploads of books3/The Pile (takedown Dec 2023, 20M+ downloads), massive scrapes; 2026 lawsuit naming HF co-founders (verification flag in source).
- **Why it matters:** HF is the default channel for scrape corpora; takedowns happen only after distribution; legal exposure is concentrated on a focal point, and safe-harbor arguments vs creator need nuance.
- **Severity:** HIGH (legal) (P-C009) — trend rising with lawsuits/regulatory focus.
- **Proposed solutions:** 1. library/partner-cleared corpora pipelines ("Institutional" pilot, 2025–2026); 2. DMCA responsive handling processes; 3. data-citation + download-tracking standards (P-C009).
- **Difficulty for applicant:** MEDIUM — legal-process + product work, high sensitivity.
- **Axis scores:** I 31/40 · F 24/40 · E 20/40 → C 26.0/40
- **Cluster:** 3 (from P-C009)
- **Sources:** The Pile takedown reports (Dec 2023); IBTimes 2026-07-06 (verification flag); phil monk 2025-06.

### M1-03 — slow/fast tokenizer duality & v5 unification (rank #34 of 66, C 25.6/40)
- **Surface/location:** tokenizers Python API; transformers v5 tokenizer consolidation.
- **Why it matters:** two tokenizer classes with diverging behavior (`__getstate__` hacks, one-sided kwargs), then a forced migration to the unified one in v5; custom-tokenizer authors face a footgun-rich window.
- **Severity:** MEDIUM (P-A04).
- **Proposed solutions:** 1. migration codemod/checker script (no named proposer — applicant can be the first); 2. deprecation warnings with exact v5 replacements; 3. updated fast-tokenizer docs (P-A04).
- **Difficulty for applicant:** MEDIUM.
- **Axis scores:** I 23/40 · F 28/40 · E 26/40 → C 25.6/40
- **Cluster:** 1 (from P-A04)
- **Sources:** HF blog tokenizers-0-23; MIGRATION_GUIDE_V5.

### M1-09 — optimum/optimum-intel fragmentation: import clash, exporter breakage (rank #35 of 66, C 25.6/40)
- **Surface/location:** `optimum` vs `optimum-intel` (and optimum-benchmark); ONNX/OpenVINO exporters.
- **Why it matters:** importing `optimum.exporters.openvino` broke ONNX export (issue #1498, fixed PR #1501); Mistral feature-extraction export broken (#1731); users cannot tell which optimum package owns which feature — export pipelines are the on-ramp to inference engines, and the fragmentation is structural.
- **Severity:** MEDIUM (P-A14) — fixes are reactive.
- **Proposed solutions:** 1. shared exporter-core package with thin wrappers (no named proposer — applicant can be the first); 2. cross-repo import tests (angle A); 3. task-table update automation (P-A14).
- **Difficulty for applicant:** MEDIUM — package restructure across repos.
- **Axis scores:** I 23/40 · F 28/40 · E 26/40 → C 25.6/40
- **Cluster:** 1 (from P-A14)
- **Sources:** optimum-intel#1498, #1501; optimum#1731.

### M3-06 — Gradio security depth: 27 findings, 8 high, fixes not enforceable (rank #36 of 66, C 25.2/40)
- **Surface/location:** Gradio 5 framework + share infrastructure; 475k+ Spaces apps; ToB audit.
- **Why it matters:** Trail-of-Bits audited Gradio 5 (Jun–Jul 2024, public Oct 2024): 27 issues incl. SSRF, arbitrary file leaks, RCE on the API server (TOB-GRADIO-19), CORS token theft (TOB-GRADIO-1/2) — fixed in Gradio 5, but apps can run unprotected and unpinned CI builds re-introduce risk; devs assume "default safe".
- **Severity:** MEDIUM-HIGH (P-C006) — chronic, high default packaging.
- **Proposed solutions:** 1. Space-owner security lint/checker (proposed in angle-C research — applicant can be the first); 2. fuzz tests + secure defaults in CI (ToB recommendation); 3. unpinned-actions scanner for user CI (P-C006).
- **Difficulty for applicant:** LOW (lint tool) to HIGH (infra-sec).
- **Axis scores:** I 31/40 · F 24/40 · E 16/40 → C 25.2/40
- **Cluster:** 3 (from P-C006)
- **Sources:** trailofbits.com library hugging-face-gradio; ToB blog 2024-10-10; HF blog gradio-5-security.

### M2-07 — Opaque 429 / rate-limit dashboard (rank #37 of 66, C 25.2/40)
- **Surface/location:** Inference API, dataset viewer endpoint throttle; 429 responses without retry/счетdown.
- **Why it matters:** throttles surface as bare 429s with no countdown or retry-after (discussion 155420); users loop with naive retries worsening backoff; free per-hour quotas exist in docs but are not exposed per call — invisible limits burn goodwill and load.
- **Severity:** MEDIUM (P-B07) — platform surface, EVERY seat.
- **Proposed solutions:** 1. add `Retry-After` + remain-count headers (platform change; no named proposer — applicant can be the first); 2. client-side backoff loop in `huggingface_hub`/endpoints SDK (angle B); 3. quota dashboard page per org (P-B07).
- **Difficulty for applicant:** LOW–MEDIUM (client SDK work is solo-able; server headers need HF).
- **Axis scores:** I 28/40 · F 24/40 · E 22/40 → C 25.2/40
- **Cluster:** 2 (from P-B07)
- **Sources:** discussions 155420 (rate-limit thread); inference docs.

### M4-13 — Long-tail cost: 2M models, half with <200 downloads, 45PB storage (rank #38 of 66, C 25.2/40)
- **Surface/location:** the Hub long tail; 45PB across 2M+ repos; storage economics.
- **Why it matters:** top 0.01% (≈200 models) gets 49.6% of downloads; half of models get <200 downloads ever; 6-week median engagement; clone spam (a single prolific quantizer can dump hundreds of TB); storage cost scales with tail while revenue scales with head — a quality-index collapse corrupts the search value ("app store" comparison).
- **Severity:** MEDIUM (P-D13) — rising with repo growth.
- **Proposed solutions:** 1. dataset/repo retention policies (HF has run trash cleanups since 2024); 2. download-weight/quality signals in ranking (P-D13); 3. paid archive tier for cold repos (same).
- **Difficulty for applicant:** MEDIUM — data-eng/policy; "cold repo archive" tooling is the most candidate-friendly slice.
- **Axis scores:** I 26/40 · F 24/40 · E 26/40 → C 25.2/40
- **Cluster:** 4 (from P-D13)
- **Sources:** KhulnaSoft State of Open Source Spring 2026; HF storage blogs 2025.

### M2-17 — `sdk_version` pin conflicts & rebuild loops (rank #39 of 66, C 25.2/40)
- **Surface/location:** Spaces SDK pinning; `sdk_version` field; runtime mismatch rebuilds.
- **Why it matters:** pin conflicts keep surfacing in support ("rebuild needed" then silently breaks); users waste cycles rebuilding and guessing; the pin is in the README config but errors don't say what to change.
- **Severity:** LOW-MEDIUM (P-B19) — friction, no risk.
- **Proposed solutions:** 1. Space config linter that validates `sdk_version` against available SDKs before deploy (P-B19; no named proposer — applicant can be the first); 2. actionable mismatch error text in build output (same).
- **Difficulty for applicant:** LOW — config linter + error copy.
- **Axis scores:** I 23/40 · F 24/40 · E 32/40 → C 25.2/40
- **Cluster:** 2 (from P-B19)
- **Sources:** Spaces FAQ/support overview; sdk_version deploy logs.

### M4-01 — Value-capture gap: all traffic, no proportionate revenue *(anchor)* (rank #40 of 66, C 24.8/40)
- **Surface/location:** company strategy; Hub free tier, endpoints, seats, pricing.
- **Why it matters:** self-positioned "home of all AI" (2M+ models, 100PB/mo in 2024) yet estimated revenue is a fraction (≈$70–130M ARR range) vs OpenAI/Anthropic — value captured per download is minuscule; the monetization layer is a thin layer of seats and a no-markup pass-through while the open ecosystem's spend goes to compute and closed labs.
- **Severity:** HIGH (structural) — the anchor contrast: single candidate cannot move it.
- **Proposed solutions:** 1. Enterprise Hub seat attach-to-usage (HF's 2024–25 attempt); 2. API-programmable datasets + paid batch APIs (sanctioned 2025–26); 3. monetize Spaces compute (ZeroGPU paid tiers, dedicated vCPU billing — HF billing direction).
- **Difficulty for applicant:** HIGH — strategy/business; no solo PR; interview-discussion material.
- **Axis scores:** I 40/40 · F 16/40 · E 12/40 → C 24.8/40 (anchor per 01-overview)
- **Cluster:** 4 (from P-D01)
- **Sources:** Sacra 2023; Contrary Research 2024; HF pricing docs; Chaumond LinkedIn 2024.

### M2-06 — Inference `:cheapest` provider down, no fallback (rank #41 of 66, C 24.8/40)
- **Surface/location:** Inference Providers routing; `:cheapest` convenience flag.
- **Why it matters:** `:cheapest` chooses a provider at request time but the cheapest may actually be down/not-enabled; failures surface mid-request, not pre-request; no inline health prompt — users get 429s/5xx on a route the docs sold as automatic.
- **Severity:** MEDIUM-HIGH (P-B06) — every `:cheapest` user.
- **Proposed solutions:** 1. pre-request health/fallback chain in the client (no named proposer — applicant can be the first); 2. expose per-provider status inline (docs table update); 3. automatic fallback to next-cheapest (P-B06).
- **Difficulty for applicant:** MEDIUM — client-side routing logic.
- **Axis scores:** I 31/40 · F 20/40 · E 22/40 → C 24.8/40
- **Cluster:** 2 (from P-B06)
- **Sources:** Inference Providers overview docs; discussions 155420.

### M3-13 — Generative provenance (C2PA) still voluntary (rank #42 of 66, C 24.8/40)
- **Surface/location:** Hub model/dataset provenance fields; C2PA pilot; post-publishing.
- **Why it matters:** OpenAI joined C2PA steering (2024-05-07), Meta (2024-09-05); HF is in a 2025 "pilot"; provenance is voluntary and metadata is stripped on rehost — the ecosystem's "AI-generated" markers don't survive transit, and regulators want markers on everything generated.
- **Severity:** MEDIUM (P-C013) — framework risk, rising.
- **Proposed solutions:** 1. HF C2PA-member tooling (with C2PA); 2. proof-of-provenance field per Space/dataset (automatic authorship badge); 3. adopters collaborative program (P-C013 — no single proposer; applicant can be first).
- **Difficulty for applicant:** MEDIUM — needs standard tooling + policy alignment.
- **Axis scores:** I 26/40 · F 24/40 · E 24/40 → C 24.8/40
- **Cluster:** 3 (from P-C013)
- **Sources:** c2pa.org press 2024; eyesift 2026-06; contentcredentials.org.

### M1-10 — bitsandbytes: maintenance backlog, no GPU CI (rank #43 of 66, C 24.4/40)
- **Surface/location:** bitsandbytes (bitsandbytes-foundation); transformers quant integration.
- **Why it matters:** 4-bit/8-bit is table-stakes for consumer GPUs but bnb ships infrequently, lags CUDA minors, has no GPU CI (RFC #1031), and PyPI's size cap constrains bundled backends — LoRA/QLoRA users inherit stale wheels.
- **Severity:** MEDIUM (P-A15).
- **Proposed solutions:** 1. GPU-agnostic CI runners (funded/community; RFC #1031); 2. split-backend packaging to dodge PyPI limits (P-A15); 3. explicit CUDA-version support matrix (same).
- **Difficulty for applicant:** applicant MEDIUM (CI/ops) to HARD (kernel).
- **Axis scores:** I 26/40 · F 24/40 · E 22/40 → C 24.4/40
- **Cluster:** 1 (from P-A15)
- **Sources:** bitsandbytes-foundation#1031; bnb repo activity.

### M2-11 — Dataset viewer `/search` only scans first MBs (rank #44 of 66, C 24.4/40)
- **Surface/location:** dataset viewer `/search` endpoint; large datasets.
- **Why it matters:** search is documented as limited to the first MBs of files — a user hunting content in a multi-GB dataset simply cannot find it; extremely common need for ML researchers/teachers.
- **Severity:** MEDIUM (P-B11) — platform dependency.
- **Proposed solutions:** 1. chunked/streamed search mode (P-B03 — platform infra, candidates can affect only docs); 2. document the limitation and add a "full-search not supported" warning + column name hints (angle-B).
- **Difficulty for applicant:** applicant HIGH (platform server) for fix; LOW for doc/tooling mitigations.
- **Axis scores:** I 26/40 · F 24/40 · E 22/40 → C 24.4/40
- **Cluster:** 2 (from P-B11)
- **Sources:** datasets-viewer docs `/search` paragraph.

### M3-07 — Moderation transparency: reports open public issues (P-C007) (rank #45 of 66, C 24.0/40)
- **Surface/location:** Hub reporting flow (`report repo` → public discussion), DSA/compliance.
- **Why it matters:** official docs say repo reports open a **public discussion**; users see their report land on the repo board ("Does staff see this? It's very ambiguous" — 2025); outcomes are opaque, appeals except via legal, and good-faith reporters are burned in public.
- **Severity:** MEDIUM (P-C007) (community) + compliance.
- **Proposed solutions:** 1. private report forwarding + visible resolution log (community proposal "report channels v2" — applicant can be the first); 2. DSA formal role mapping (HF docs); 3. SLA-style resolution guidance.
- **Difficulty for applicant:** LOW–MEDIUM — workflow+UI+SLA design.
- **Axis scores:** I 23/40 · F 24/40 · E 26/40 → C 24.0/40
- **Cluster:** 3 (from P-C007)
- **Sources:** docs/hub/moderation; discuss 151501 (2025-04); discuss 134287 (2025-01).

### M2-10 — Dataset viewer 429 "maximum queue size reached" (rank #46 of 66, C 23.6/40)
- **Surface/location:** dataset viewer convert/search endpoints; 429 when overloaded.
- **Why it matters:** no retry-after; users in big transforms queue into "maximum queue size reached" with no guidance (2025); scale of large public datasets makes convert-path overload a routine event for tools like Leaderboards/Chat.
- **Severity:** MEDIUM (P-B10) — platform dependent.
- **Proposed solutions:** 1. retry-after header exposure (platform; no named proposer — applicant first); 2. client-side exponential backoff library-supplied; 3. pre-convert warning (angle C).
- **Difficulty for applicant:** HIGH (platform) for the fix — client/backoff tooling is LOW.
- **Axis scores:** I 28/40 · F 20/40 · E 22/40 → C 23.6/40
- **Cluster:** 2 (from P-B10)
- **Sources:** datasets viewer GH issue (2025); mention discussion 155420.

### M3-14 — "Stack of models" reuse rules unclear (rank #47 of 66, C 23.6/40)
- **Surface/location:** Hub model composition (base + adapters + pipelines); derived-model card policies; TOU.
- **Why it matters:** the Hub increasingly hosts "stacks" of models, but author-provided reuse rules and a platform-finish model conflict; license/TOU semantics for composed models are ambiguous, so enterprises can't safely compose.
- **Severity:** MEDIUM (low-medium per research; policy-adjacent) — as-of 2026-08-08.
- **Proposed solutions:** 1. machine-readable reuse-rule field on model cards (no named proposer — applicant can be the first); 2. clarify TOU for composed models (HF legal); 3. derived-model license-trace demo panel.
- **Difficulty for applicant:** MEDIUM — policy + product work.
- **Axis scores:** I 23/40 · F 24/40 · E 24/40 → C 23.6/40
- **Cluster:** 3 (from P-C014)
- **Sources:** angle-C P-C014 research note; HF model-card guidelines.

### M1-12 — TRL trainer sprawl heading to v1 experimental reorg (rank #48 of 66, C 23.6/40)
- **Surface/location:** `trl` trainers (SFT/DPO/KTO/BCO/PPO/GRPO); "Road to v1" RFC (#4374, June 2026).
- **Why it matters:** API churn between releases (config renames, trainer moves); practitioners can't tell which trainer is stable; the v1 reorg moves most trainers to experimental modules — a large migration wave for the RLHF community.
- **Severity:** MEDIUM (P-A17).
- **Proposed solutions:** 1. v1 migration guide + codemod (angle-A proposal; no named proposer — applicant can be the first); 2. per-trainer stability badges (P-A17); 3. test-suite parity between old/new paths.
- **Difficulty for applicant:** MEDIUM — docs + codemod, bounded.
- **Axis scores:** I 18/40 · F 28/40 · E 26/40 → C 23.6/40
- **Cluster:** 1 (from P-A17)
- **Sources:** trl#4374 (RFC); trl#4223.

### M2-02 — No visible Spaces quota/limits (free-tier opacity) (rank #49 of 66, C 23.2/40)
- **Surface/location:** free-tier Spaces quotas; quota error text; concurrent slots.
- **Why it matters:** quota errors are terse/ambiguous; there is no per-Space quota dashboard or "when it resets" info; free-tier cap = 8 concurrent cpu-basic with no visible meter — users hit walls without a path forward.
- **Severity:** LOW (P-B02).
- **Proposed solutions:** 1. quota/health probe tool (angle-B offering; prober — no named proposer — applicant can be the first); 2. per-Space quota dashboard; 3. friendly quota text with reset time (P-B02).
- **Difficulty for applicant:** LOW–MEDIUM.
- **Axis scores:** I 18/40 · F 24/40 · E 32/40 → C 23.2/40
- **Cluster:** 2 (from P-B02)
- **Sources:** discussions 174003; FAQ "Quota limite".

### M3-05 — Private-only, invite-only bug bounty (rank #50 of 66, C 22.8/40)
- **Surface/location:** HackerOne program (hackerone.com/hugging_face) — private, invite-only.
- **Why it matters:** researchers must be invited (via a GitHub-issue first contact); others cannot submit and get no public channel; reports left in issues go stale (#22688 montage); attackers find real 0-days anyway (2026, July incident). The diverse external tester pool is a high-ROI trust fix.
- **Severity:** MEDIUM (P-C005) — central, infra/lib wide.
- **Proposed solutions:** 1. public bug-bounty expansion (P-C005; maintainers keep HackerOne private — candidate-facing change); 2. public `security.txt`-style channel (no named proposer — applicant can be the first); 3. coordinated-disclosure doc page.
- **Difficulty for applicant:** LOW–MEDIUM — process + docs.
- **Axis scores:** I 26/40 · F 20/40 · E 22/40 → C 22.8/40
- **Cluster:** 3 (from P-C005)
- **Sources:** github transformers#22688; HackerOne platform page.

### M2-16 — Team tier SCIM/RBAC gap (rank #51 of 66, C 22.4/40)
- **Surface/location:** Team vs Enterprise tiering; SSO/SCIM matrix on docs.
- **Why it matters:** Team orgs cannot provision via SCIM or enforce RBAC; SSO per-org is Enterprise+-only — mid-size teams with infosec policies cannot adopt the paid tier without jumping to Enterprise.
- **Severity:** LOW (P-B18) — product gap, friction.
- **Proposed solutions:** 1. SCIM for Team tier (roadmap item); 2. RBAC model; 3. doc matrix clarity (angle B).
- **Difficulty for applicant:** HIGH (platform/product) — not a solo contribution; doc/tooling angle is LOW.
- **Axis scores:** I 18/40 · F 24/40 · E 28/40 → C 22.4/40
- **Cluster:** 2 (from P-B18)
- **Sources:** hub/en/enterprise docs matrix (2025).

### M4-03 — Inference middleware trap: no markup, providers hold margin (rank #52 of 66, C 22.0/40)
- **Surface/location:** Inference Providers pass-through; pricing; router design; `:cheapest`.
- **Why it matters:** HF's "one API to 30 providers, no markup" turns HF into a catalog, not a wallet: OpenRouter offers the same surface; cloud model gardens click-to-deploy HF models; OpenAI's gpt-oss distributes on the Hub while OpenAI owns the brand — only seats/endpoints capture revenue.
- **Severity:** HIGH (core commercial flywheel; angle-D P-D03).
- **Proposed solutions:** 1. router intelligence (cost-routing, cache, fallback) as the product (P-D03 research); 2. aggregated vendor pricing for paid tiers (PRO tokens cheaper than any single provider); 3. selective margin on HF-owned assets; 4. ally with/acquire OpenRouter (P-D03).
- **Difficulty for applicant:** HIGH (strategy) — client-side router observability is the entry; interview material more than a PR.
- **Axis scores:** I 33/40 · F 16/40 · E 12/40 → C 22.0/40
- **Cluster:** 4 (from P-D03)
- **Sources:** Inference Providers docs; OpenRouter; gpt-oss launch (Aug 2025).

### M4-05 — China gravity: Chinese-filed downloads, enterprise procurement notices (rank #53 of 66, C 21.2/40)
- **Surface/location:** model download distribution; DeepSeek-R1; US/EU procurement.
- **Why it matters:** Chinese-published models are 41% of downloads and China passed the US in monthly downloads (State of OSS Spring 2026); DeepSeek-R1 10.9M downloads; US enterprise procurement flags Chinese weights — a governance/trust filter gap at the platform layer.
- **Severity:** MEDIUM-HIGH (P-D05) — rising.
- **Proposed solutions:** 1. curated "deploy-ready / verified" layer for Enterprise Hub (HF's model-governance direction; candidate angle — build it); 2. provenance evidence (SBOM/CBOM) + benchmark/CI badges (HF's Safety-on-the-Hub 2026).
- **Difficulty for applicant:** MEDIUM — enterprise product angle.
- **Axis scores:** I 31/40 · F 16/40 · E 12/40 → C 21.2/40
- **Cluster:** 4 (from P-D05)
- **Sources:** KhulnaSoft SOS Spring 2026; HF "Safety on the Hub" (2026).

### M4-06 — Open weights self-host everywhere: cannibalization (rank #54 of 66, C 21.2/40)
- **Surface/location:** local inference (Ollama), token-selling providers, HF hosting economics.
- **Why it matters:** anyone can `ollama pull` a model (155K+ public deployments vs ~9.7K Gradio/HF Spaces per arXiv 2505.02502); the most valuable layer (hosting/inference) is given away — revenue becomes "seats + data" and agents make edge/local inference dominant.
- **Severity:** MEDIUM (P-D06) — structural.
- **Proposed solutions:** 1. ecosystem-side fees (leaderboards, premium datasets, curated packages); 2. "HF runs your cluster" agent-side orchestration; 3. monetize the trust surface (governed open) (P-D06).
- **Difficulty for applicant:** HIGH (strategy) — interview/discussion, not a PR.
- **Axis scores:** I 31/40 · F 16/40 · E 12/40 → C 21.2/40
- **Cluster:** 4 (from P-D06)
- **Sources:** arXiv 2505.02502; Ollama vs HF Spaces stats.

### M4-08 — ToS "training-related use" ambiguity (rank #55 of 66, C 21.2/40)
- **Surface/location:** HF Terms of Service; training-data clauses; DSA/EU AI Act.
- **Why it matters:** the ToS grants a royalty-free license to community content that formal readings say "may include training-related use" — fuzziness is a commercial trust smell for artists/enterprises; EU AI Act Art. 53 forces training summaries anyway; one credible incident would cut the largest data layer off (FineWeb/CommonPool PII episode, MIT Tech Review Jul 2025).
- **Severity:** LOW-MEDIUM (P-D08) — rising (regulatory + class-action).
- **Proposed solutions:** 1. two-layer opt-out matrix per asset (HF tools for opt-out/redaction; EU AI Act guide 2025); 2. Art. 53 training-data summaries for hosted public repos; 3. plain-language "what we do with your data" front-page (P-D08).
- **Difficulty for applicant:** policy/legal — clarity docs are LOW effort win.
- **Axis scores:** I 31/40 · F 16/40 · E 12/40 → C 21.2/40
- **Cluster:** 4 (from P-D08)
- **Sources:** HF ToS; conductatlas/AIRIN readings; MIT Tech Review Jul 2025.

### M4-09 — Data residency & compliance gaps (EU only paid; no ISO 27001) (rank #56 of 66, C 21.2/40)
- **Surface/location:** Storage Regions (2025): US default, EU Team+ only, APAC/GCC "coming soon".
- **Why it matters:** EU/institutional buyers need EU-hosted data and certifications (ISO/IEC 27001, SOC2 present but no ISO on the 2025 blog); public SLAs missing (RFP.wiki); CLOUD Act jurisdiction applies to GDPR data — the enterprise gate to sensitive data is closed by default.
- **Severity:** MEDIUM (P-D09) — rising EU sovereignty.
- **Proposed solutions:** 1. ISO 27001/27701 certification track; 2. EU-region storage for paid tiers; 3. "EU-Only" compute+storage isolation; 4. public SLA at Enterprise (P-D09 research).
- **Difficulty for applicant:** HIGH (infra+legal) — docs/pricing analysis is the candidate slice.
- **Axis scores:** I 31/40 · F 16/40 · E 12/40 → C 21.2/40
- **Cluster:** 4 (from P-D09)
- **Sources:** Storage Regions docs 2025; RFP.wiki; TrustWebscore 68%.

### M4-04 — "Open heaven, closed enterprise": the commercial pitch is hollow (rank #57 of 66, C 19.2/40)
- **Surface/location:** enterprise sales; open-model vs closed-model procurement; HF Enterprise Hub pitch.
- **Why it matters:** open models score ~90% of closed performance yet ~80% of enterprise spend goes to closed models (MIT Sloan); closed devs raised 2.5x more than open devs (CB Insights) — the "strongest open ecosystem" alone does not convert CIOs, who want accountability, not weights; gpt-oss (open from OpenAI) blunts the moat.
- **Severity:** MEDIUM (P-D04) — stable-to-worsening.
- **Proposed solutions:** 1. bundle open models + governance + SOC2 into an enterprise package — "Switzerland as a product" (Delangue, Acquired podcast); 2. sell "where they run" via mid-tier closed-model gateways (P-D04).
- **Difficulty for applicant:** HIGH (GTM/strategy) — interview material.
- **Axis scores:** I 26/40 · F 16/40 · E 12/40 → C 19.2/40
- **Cluster:** 4 (from P-D04)
- **Sources:** CB Insights 2025; MIT Sloan research; Delangue Acquired podcast.

### M4-07 — Comp/retention gap: best devs, worst comp curve (rank #58 of 66, C 19.2/40)
- **Surface/location:** headcount (~677, Revelio), hiring, layoffs (Feb 2025), comp vs closed labs.
- **Why it matters:** a few core engineers abstract a huge platform surface; compensation trails closed labs, the Feb 2025 layoff scar dented culture, and hiring postings dropped ~46% — key-engineer risk is existential for a platform of this breadth.
- **Severity:** MEDIUM (P-D07) — stable.
- **Proposed solutions:** 1. equity refresh after the 2023 round; 2. internal secondary liquidity (ties to P-D12); 3. protected OSS time + community bounties (HF practices; P-D07).
- **Difficulty for applicant:** HIGH (people ops/strategy) — interview material.
- **Axis scores:** I 26/40 · F 16/40 · E 12/40 → C 19.2/40
- **Cluster:** 4 (from P-D07)
- **Sources:** Revelio headcount data; The Information (Feb 2025).

### M4-10 — Enterprise support blackhole: api-enterprise@ silence (rank #59 of 66, C 19.2/40)
- **Surface/location:** `api-enterprise@` mailbox; forum tickets; sales-eng coverage; Discord disabled.
- **Why it matters:** 50K+ orgs use the platform, ~2K pay; enterprise conversion depends on a support function that visibly does not scale — "4 months still no response" (May 2026), Feb 2026 "What happened to HuggingFace?", ticket #24754 silence, RFP.wiki flags SLA gaps; every lost enterprise deal is a valuation event.
- **Severity:** HIGH-MEDIUM (P-D10) — worsening.
- **Proposed solutions:** 1. intraday first-response SLO with price floor (24h for Enterprise); 2. 1-hour first-response queue for named accounts; 3. make the support guarantee a headline feature (P-D10 research).
- **Difficulty for applicant:** MEDIUM-HIGH (GTM/support engineering) — SLO tooling/dashboards are the candidate slice.
- **Axis scores:** I 26/40 · F 16/40 · E 12/40 → C 19.2/40
- **Cluster:** 4 (from P-D10)
- **Sources:** HF forum May 2026; Feb 2026 thread; RFP.wiki.

### M4-14 — Agent/MCP era: value shifts from the Hub to runtimes and routers (rank #60 of 66, C 19.2/40)
- **Surface/location:** tiny-agents/MCP client in `huggingface_hub`; provider routing; agent runtimes.
- **Why it matters:** agents route inference to external providers (Nebius et al.), Ollama-style edge agents eat inference revenue entirely, and "agent-in-the-Spaces" lands on provider-managed compute — the Hub becomes a registry while runtimes and routers capture the token stream (P-D14).
- **Severity:** MEDIUM (P-D14) — rising 2025–2028.
- **Proposed solutions:** 1. make HF the default registry + runtime for agent tool-use (HF ships tiny-agents + MCP); 2. low-latency burst inference for agents as a paid tier; 3. "agents use us" brand line (P-D14).
- **Difficulty for applicant:** MEDIUM-HIGH — dev-rel/product; MCP tooling experiments are the entry.
- **Axis scores:** I 26/40 · F 16/40 · E 12/40 → C 19.2/40
- **Cluster:** 4 (from P-D14)
- **Sources:** huggingface_hub tiny-agents/MCP docs; P-D14 angle-D research.

### M4-16 — OpenAI's open pivot: gpt-oss distributes on HF, captures brand (rank #61 of 66, C 19.2/40)
- **Surface/location:** gpt-oss (Aug 2025) on the Hub; OpenAI platform external-model marketplace; Azure/Vertex listings.
- **Why it matters:** a closed leader strategically entered HF's home turf: 4.1M downloads/mo of Apache-2.0 gpt-oss on the Hub, OpenAI's platform offers third-party models via OpenRouter, Azure AI Foundry lists 10K+ HF models click-to-deploy — the Hub feeds OpenAI's ecosystem gravity while OpenAI owns brand and compute relationships.
- **Severity:** MEDIUM (P-D16) — rising.
- **Proposed solutions:** 1. become the trust layer (verified models, SBOM, leaderboards) over all ecosystems; 2. monetize the data/registry layer rather than the inference pass-through (P-D16).
- **Difficulty for applicant:** HIGH (strategy) — interview material.
- **Axis scores:** I 26/40 · F 16/40 · E 12/40 → C 19.2/40
- **Cluster:** 4 (from P-D16)
- **Sources:** gpt-oss announcement (Aug 2025); Azure AI Foundry blog; P-D16.

### M4-17 — Catalog-ization: cloud model gardens make HF a listing, not a wallet (rank #62 of 66, C 19.2/40)
- **Surface/location:** Azure AI Foundry / Vertex Model Garden / Bedrock click-to-deploy listings.
- **Why it matters:** enterprises buy compute from the cloud, not from HF; referral fees are thin (Sacra); cloud SLAs and support beat HF's (P-D10); neutrality blocks exclusive partnerships — if the Hub is a catalog and clouds are the wallets, HF's role shrinks to SEO for model names.
- **Severity:** MEDIUM (P-D17) — rising.
- **Proposed solutions:** 1. bundle Hub + Enterprise features (governance, audit logs, storage regions) clouds don't ship for open weights; 2. sell "HF-governed deployment" regardless of which cloud runs it (P-D17).
- **Difficulty for applicant:** HIGH (GTM/partnerships) — interview material.
- **Axis scores:** I 26/40 · F 16/40 · E 12/40 → C 19.2/40
- **Cluster:** 4 (from P-D17)
- **Sources:** Sacra 2023/2025; Azure/Vertex docs; P-D17.

### M4-18 — Revenue concentration on a few models and their surges (rank #63 of 66, C 19.2/40)
- **Surface/location:** load and revenue anchoring on R1, gpt-oss, Llama family; ZeroGPU meltdowns.
- **Why it matters:** top 0.01% (≈200 models) = 49.6% of downloads; a deprecation or license shift on one flagship swings platform load and revenue — the platform's diversification pitch does not match its economics (P-D18).
- **Severity:** MEDIUM (P-D18) — stable.
- **Proposed solutions:** 1. tiered storage/archival economics (P-D13); 2. model-agnostic governance products; 3. curated vertical solutions (code/medical/legal) beyond flagships (P-D18).
- **Difficulty for applicant:** HIGH (strategy/product) — interview material.
- **Axis scores:** I 26/40 · F 16/40 · E 12/40 → C 19.2/40
- **Cluster:** 4 (from P-D18)
- **Sources:** KhulnaSoft SOS Spring 2026; ZeroGPU Apr 2026 threads.

### M4-11 — France/EU identity tension: "French champion" vs "global company" (rank #64 of 66, C 18.0/40)
- **Surface/location:** dual HQ (Paris + NY); French Tech visa dependence; EU AI Act co-authorship.
- **Why it matters:** France's AI-champion narrative (Macron's €109B plan, CIR tax credit, Station F) supplies talent, subsidies and a policy shield; but English-first product, US-default storage, and the "global company" line (Thomas Wolf) pull the other way — losing either side erodes an asset (P-D11).
- **Severity:** LOW-MEDIUM (P-D11) — stable.
- **Proposed solutions:** 1. keep both HQs real, not cosmetic; 2. publish EU AI Act compliance artifacts prominently; 3. lead with French/European public-sector reference deployments (P-D11).
- **Difficulty for applicant:** MEDIUM-HIGH (policy/comms) — interview material.
- **Axis scores:** I 23/40 · F 16/40 · E 12/40 → C 18.0/40
- **Cluster:** 4 (from P-D11)
- **Sources:** WIRED 2025; Fortune 2026; france2030.ai; Semafor.

### M4-12 — Liquidity staleness: no round since 2023; employees' equity is paper (rank #65 of 66, C 18.0/40)
- **Surface/location:** cap table; no valuation event since Aug 2023; Nvidia $500M at $7B rejected (late 2025).
- **Why it matters:** capital efficiency is the tagline but 3+ years without a round means no price discovery, no liquidity loop, and stale equity — retention (M4-07) and hiring depend on credible equity; a future round risks down-round optics.
- **Severity:** MEDIUM (P-D12) — stable.
- **Proposed solutions:** 1. partial secondary buyback for early employees; 2. extended post-termination exercise windows; 3. internal secondary marketplace (P-D12).
- **Difficulty for applicant:** HIGH (finance/people ops) — interview material.
- **Axis scores:** I 23/40 · F 16/40 · E 12/40 → C 18.0/40
- **Cluster:** 4 (from P-D12)
- **Sources:** Reuters/CNBC Aug 2023; TipRanks Feb 2026; Observer Jul 2026.

### M4-15 — The capex arms race is a two-sided bet (rank #66 of 66, C 18.0/40)
- **Surface/location:** macro capex (Stargate $500B, OpenAI–Oracle $300B); HF's flat-capacity "Switzerland" stance.
- **Why it matters:** if the bubble bursts, HF's open/self-host/resilient position wins; if it doesn't, flat capacity and no-markup mean HF participates least in the boom (Delangue's public "bubble might burst" hedge, Nov 2025) — the strategy IS the bet, and the risk is not participating in either scenario.
- **Severity:** MEDIUM (P-D15) — structural.
- **Proposed solutions:** 1. stress-test the no-bubble scenario and build a participation path (usage-tiered enterprise offerings, regional partnerships); 2. post-bubble plan: compression-driven lower fees, self-host ease (Delangue/Boudier).
- **Difficulty for applicant:** HIGH (strategy/finance) — interview material.
- **Axis scores:** I 23/40 · F 16/40 · E 12/40 → C 18.0/40
- **Cluster:** 4 (from P-D15)
- **Sources:** TechCrunch Nov 2025; Reuters/BI Jan 2026; CB Insights 2025.