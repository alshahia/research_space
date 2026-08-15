---
name: golden-test-01-arxiv-topic
description: Golden test 1 - arxiv / academic / scientific / preprint topic. Activates the multi-agent research loop on a known-literature CS subject.
---

# Golden Test 01 - arXiv Topic

**Test id:** 01-arxiv-topic
**Date:** 2026-08-13
**Domain:** academic - CS / ML / quantitative
**Tier:** 4 (sum > 3.5 - multi-agent loop + verifier + eval)
**Sub-agent:** research / planner / coder / eval runner

## Topic

> "Survey recent (2025-2026) developments in Retrieval-Augmented Generation (RAG) - what are the leading architectures, and what limitations do they still have?"

This topic is a known-literature academic survey. It exercises:

- The arXiv source connector (`http://export.arxiv.org/api/query?...`).
- Multi-agent decomposition (architectures vs. limitations vs. benchmarks).
- Citation discipline (`[S1]..[Sn]`).
- Verifier mode (low-confidence secondary-only sources, single-sourced claims).
- The grader rubric below.

## Sub-question decomposition (suggested for master)

Master SHOULD decompose into 3-5 sub-questions. Suggested split:

1. **Sub-rag-architectures** - leading RAG architectures published 2025-2026 (Self-RAG, CRAG, HyDE, GraphRAG, etc.).
2. **Sub-rag-limitations** - known open problems (hallucination, retrieval quality, latency, cost, multi-hop, long-context).
3. **Sub-rag-benchmarks** - evaluation suites (RGB, RAGAS, BEIR, MS-Marco, etc.) and what they measure.
4. **Sub-rag-prod-patterns** - production deployment patterns (chunking, embedding, vector DB, caching).
5. (optional) **Sub-rag-multimodal** - extensions to image / audio / code.

A 3-sub-question split (architectures / limitations / benchmarks) is the minimum recommended.

## Expected sources

These are sources a high-quality run should cite. They are not exhaustive. The grader awards partial credit for related sources from the same conferences / authors.

- **arXiv preprints (2025-2026):**
  - "Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection" (Asai et al., 2023 → extended 2025 surveys)
  - "Corrective Retrieval Augmented Generation (CRAG)" (Yan et al., 2024)
  - "HyDE: Hypothetical Document Embeddings" (Gao et al., 2022 → 2024-2025 surveys cite as baseline)
  - "GraphRAG: Knowledge Graph Augmented Retrieval" (Edge et al., Microsoft, 2024)
  - "Retrieval-Augmented Generation for Large Language Models: A Survey" (2024-2025 survey papers)
- **Benchmarks:**
  - RGB (Retrieval-Augmented Generation Benchmark)
  - RAGAS (Automated Evaluation of RAG Systems)
  - BEIR (Benchmarking IR)
- **Standards / official docs:**
  - arXiv API documentation: `http://export.arxiv.org/api/help` and `http://export.arxiv.org/api/query`
  - OpenAlex API: `https://api.openalex.org/works?search=retrieval-augmented+generation`

A complete answer is expected to cite ≥ 5 arXiv preprints, ≥ 1 benchmark suite, and ≥ 1 standard / API doc. Coverage beyond this is bonus.

## Expected key findings

A high-quality output surfaces at least these claims, each with a citation:

1. RAG architectures have split into three camps: **retrieval-first** (HyDE, CRAG), **generation-first** (Self-RAG, FLARE), and **graph-augmented** (GraphRAG, KG-RAG). The camps disagree on the failure mode they target.
2. Multi-hop reasoning remains a known limitation - single-pass RAG degrades when the answer spans 3+ passages.
3. Latency vs. recall is the dominant production tradeoff; 2025-2026 production papers favor caching + smaller retrieve-and-rerank pipelines over larger retrievers.
4. Long-context LLMs (≥ 128k tokens) have weakened the case for RAG on single-document tasks but strengthened it for multi-document and private-corpus tasks.
5. The RAGAS / RGB benchmarks disagree on what counts as "faithfulness" - RGB measures hallucination rate, RAGAS measures answer-vs-context overlap.
6. GraphRAG (Microsoft) shows measurable gains on global summarization but doubles indexing cost.

## Coverage risks to flag in verifier

- **Source-not-cited** - preprints from 2025-2026 only available on arXiv (use the arXiv API).
- **Paywalled citations** - venue papers (NeurIPS, ACL, SIGIR) may be paywalled; cite the arXiv preprint URL when available.
- **Single-sourced quantitative claims** - percentages and benchmark scores often come from one paper; verifier should flag.
- **Stale data** - RAG is fast-moving; surface access dates on every claim.

## Run instructions

1. From repo root, run: `bash scripts/run-research-eval.sh 01-arxiv-topic` (Windows: `pwsh scripts/run-research-eval.ps1 01-arxiv-topic`).
2. The script writes a per-test prompt to `share/eval/<YYYY-MM-DD>/01-arxiv-topic/PROMPT.md` and an empty run report at `share/eval/<YYYY-MM-DD>/01-arxiv-topic/RUN.md`.
3. Dispatch the multi-agent loop (per `agents_manager/research/WORKFLOW.md`) using the topic as user input and the sub-questions above as the orchestrator's decomposition.
4. The final synthesis lands at `share/notes/01_research_T-YYYY-MM-DD-NNN.md` (or `01_master_synthesis_*.md` if Tier 4 master synthesis fires).
5. Copy that synthesis into `share/eval/<YYYY-MM-DD>/01-arxiv-topic/RUN.md` (the eval runner script does this when invoked with `--ingest`).
6. Grade per the rubric below. Paste scores back to the runner script; it aggregates to `share/notes/04_eval_run_<date>.md`.

## Grading rubric (5 criteria × 1-5 score)

| # | Criterion | Score 1 (worst) | Score 3 (acceptable) | Score 5 (best) |
|---|-----------|-----------------|----------------------|----------------|
| 1 | **Citation density** | < 50% of factual claims have `[Sn]` | ~ 80% of factual claims have `[Sn]`, reference table complete | All factual claims cited, reference table verified, no orphan `[Sn]` markers |
| 2 | **Accuracy (top claims verified)** | ≥ 1 of the 6 expected key findings is wrong or unsupportable | All 6 expected findings appear; 1 is single-sourced | All 6 expected findings appear with ≥ 2 sources each; no factually wrong claims |
| 3 | **Depth (sub-question coverage)** | One-block answer, no sub-question split | 3-5 sub-questions, each covered but lightly | All 3-5 sub-questions covered in depth, with self-critique per sub-question |
| 4 | **Format match (workflow deliverable)** | Output not at `share/notes/01_research_*.md` | Output at canonical path, no verifier report | Output at canonical path + verifier report at `04_review_<task-id>_verifier.md` + master synthesis at `01_master_synthesis_*.md` |
| 5 | **Arabic support (when triggered)** | Locale ignored in AR-aware run | Bilingual template used, AR section present but thin | Bilingual template + RTL markdown + AR citations parallel to EN + matches kotobee AR-doc style |

Total possible: 25. Pass threshold: ≥ 18 (72%). Excellent threshold: ≥ 22 (88%).

### Bonus criterion (comparison topics only - N/A here)

For comparison topics, an additional criterion counts:

- **Comparison-table specific** - does the output include a side-by-side table of options with axes × options?

For this test, the bonus criterion is omitted (replace with AR criterion if the run is AR-locale).

## References

| # | Source | Type | URL | Access date |
|---|--------|------|-----|-------------|
| [S1] | arXiv API docs | API doc | http://export.arxiv.org/api/help | 2026-08-13 |
| [S2] | OpenAlex API | API doc | https://api.openalex.org/ | 2026-08-13 |
| [S3] | Self-RAG paper | academic | https://arxiv.org/abs/2310.11511 | 2026-08-13 |
| [S4] | CRAG paper | academic | https://arxiv.org/abs/2401.15884 | 2026-08-13 |
| [S5] | GraphRAG paper | academic | https://arxiv.org/abs/2404.16130 | 2026-08-13 |
| [S6] | Multi-agent research loop workflow | controller doc | agents_manager/research/WORKFLOW.md | 2026-08-13 |
| [S7] | Verifier mode | controller doc | agents_manager/review/SKILL.md § Research verifier mode | 2026-08-13 |
| [S8] | Eval README | controller doc | agents_manager/eval/README.md | 2026-08-13 |

## Metrics

- rubric_criteria: 5
- pass_threshold: 18
- excellent_threshold: 22
- expected_sources_min: 7
- expected_key_findings_min: 6
- sub_questions_suggested: 3-5
