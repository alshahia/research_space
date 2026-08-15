---
name: golden-test-03-comparison-topic
description: Golden test 3 - comparison topic. Activates the multi-agent research loop on a cross-product comparison.
---

# Golden Test 03 - Comparison Topic

**Test id:** 03-comparison-topic
**Date:** 2026-08-13
**Domain:** comparison research - academic / product
**Tier:** 4 (sum > 3.5 - multi-agent loop + verifier + eval)
**Sub-agent:** research / planner / coder / eval runner

## Topic

> "Compare NotebookLM, Perplexity, and ChatGPT Deep Research for academic literature review - which is best for different use cases?"

This is a cross-product comparison across 3 named tools. It exercises:

- The multi-agent decomposition (one sub-agent per tool).
- Citation discipline for product pages, blog posts, and academic case studies.
- Verifier mode (product-page drift, comparing subjective claims).
- Comparison-table format (the only output shape this test accepts).
- Use-case-specific recommendations.

## Sub-question decomposition (suggested for master)

1. **Sub-notebooklm** - Google NotebookLM feature set, 2025-2026 updates, audio overview, source grounding model, free vs. paid tiers.
2. **Sub-perplexity-dr** - Perplexity Deep Research mode (sonar-deep or equivalent), pro-tier pricing, citation model, source breadth.
3. **Sub-chatgpt-dr** - ChatGPT Deep Research mode (OpenAI o3 / o4-deep-research), academic literature review use cases, integration with PubMed / arXiv.
4. **Sub-academic-use-cases** - academic literature review workflows (systematic review, scoping review, citation graph traversal, literature synthesis).
5. **Sub-comparison-synthesis** - combine into a final table + recommendation.

Minimum recommended: 3 product sub-agents + 1 comparison sub-agent. With 5+ total, the depth scores higher.

## Expected sources

Each tool needs ≥ 2 sources (official + independent review). Minimum total: 10 sources.

- **NotebookLM:**
  - https://notebooklm.google.com/ (official)
  - https://blog.google/technology/google-deepmind/notebooklm-2026/ (Google blog)
  - Independent academic review (search: "NotebookLM academic review 2026")
- **Perplexity Deep Research:**
  - https://www.perplexity.ai/ (official)
  - https://docs.perplexity.ai/guides/agent-mode (deep research docs)
  - Perplexity blog post on Deep Research mode
- **ChatGPT Deep Research:**
  - https://chatgpt.com/ (official)
  - https://openai.com/index/introducing-deep-research/ or https://openai.com/index/chatgpt-deep-research-2026/
  - Independent academic review
- **Academic literature review best practice:**
  - PRISMA 2020 statement: https://www.prisma-statement.org/
  - Covidence or Rayyan workflow docs (if relevant)
  - arXiv surveys on LLM-assisted literature review

## Expected key findings

A high-quality output surfaces at least these claims, each with a citation:

1. **NotebookLM** is best for **source-grounded summarization** - you upload the sources, it produces notes / audio. It does NOT do open-web research. Strong for personal-paper digestion; weak for unknown-topic exploration.
2. **Perplexity Deep Research** is best for **fast open-web research** with inline citations; offers a sonar-deep model that produces multi-page reports. Strong for breadth; weaker for academic depth (no PubMed integration in free tier).
3. **ChatGPT Deep Research** is best for **multi-source academic synthesis** - it searches the web, parses PDFs, and produces a 10-25 page report with citations. The o-series reasoning model is the differentiator. Strong for academic literature review; expensive at $200/mo (Pro tier).
4. None of the three is a replacement for a systematic literature review (PRISMA-2020 compliant) - they are search-and-summarize tools, not review-management tools.
5. Pricing: NotebookLM free (with limits) + NotebookLM Plus paid; Perplexity Pro $20/mo; ChatGPT Pro $200/mo (Deep Research requires Pro).
6. Citation density differs: NotebookLM cites only the uploaded sources; Perplexity cites the open web; ChatGPT cites both.
7. For a graduate student's first-pass literature scan, **ChatGPT Deep Research is the recommended starting point** (citation density + completeness); for a final synthesis pass, **NotebookLM is the recommended starting point** (it forces you to feed the canonical sources).

## Comparison axes (mandatory for this test)

| Axis | NotebookLM | Perplexity DR | ChatGPT DR |
|------|------------|---------------|------------|
| Open web search | no (sources uploaded only) | yes | yes |
| PDF parsing | yes (uploaded) | partial (web only) | yes (uploaded + fetched) |
| Inline citations | yes (to uploaded sources) | yes (to web pages) | yes (mixed) |
| Audio overview | yes | no | no |
| Multi-page report | no (notes only) | yes (1500-3000w) | yes (10-25 pages) |
| Free tier | yes (with limits) | yes (5 queries/day for DR) | no (DR requires Pro) |
| Paid tier | $10/mo (Plus) | $20/mo (Pro) | $200/mo (Pro) |
| Academic literature review fit | high (digestion) | medium (breadth) | high (synthesis) |
| Best for | personal-paper digestion | fast web research | multi-source synthesis |

A high-quality run adds ≥ 3 more axes (e.g. "supports voice", "supports API access", "self-hosted", "plugin ecosystem", "export formats").

## Coverage risks to flag in verifier

- **Subjective claim drift** - "best for X" claims are subjective; verifier should require ≥ 2 supporting sources or one explicit primary source (e.g. a Google product page).
- **Pricing drift** - pricing pages change; re-fetch.
- **Feature-mismatch** - NotebookLM's audio overview is its differentiator; ChatGPT's reasoning model is its differentiator; Perplexity's speed+citations is its differentiator. Verifier SHOULD flag any synthesis that misses one.
- **Stale data** - Deep Research mode rolled out 2025-2026; older reviews may not reflect the current state.

## Run instructions

Same as 01-arxiv-topic - see `agents_manager/eval/README.md` § How to run a test.

## Grading rubric (5 criteria × 1-5 score)

| # | Criterion | Score 1 (worst) | Score 3 (acceptable) | Score 5 (best) |
|---|-----------|-----------------|----------------------|----------------|
| 1 | **Citation density** | < 50% of factual claims have `[Sn]` | ~ 80% of factual claims have `[Sn]`, reference table complete | All factual claims cited, reference table verified, no orphan `[Sn]` markers |
| 2 | **Accuracy (top claims verified)** | ≥ 1 of the 7 expected key findings is wrong or unsupportable | All 7 expected findings appear; 1 is single-sourced | All 7 expected findings appear with ≥ 2 sources each; no factually wrong claims |
| 3 | **Depth (sub-question coverage)** | One-block answer, no sub-question split | 5 sub-questions covered, comparison light | 5+ sub-questions covered in depth, per-tool self-critique + final synthesis + use-case recommendation |
| 4 | **Format match (workflow deliverable)** | Output not at `share/notes/01_research_*.md` | Output at canonical path, no verifier report | Output at canonical path + verifier report + master synthesis + comparison table with 8+ axes × 3 tools |
| 5 | **Arabic support (when triggered)** | Locale ignored in AR-aware run | Bilingual template used, AR section present but thin | Bilingual template + RTL markdown + AR citations parallel to EN + comparison table works in RTL direction |

Total possible: 25. Pass threshold: ≥ 18 (72%). Excellent threshold: ≥ 22 (88%).

### Bonus criterion (comparison topics only - always included)

| # | Criterion | Score 1 | Score 3 | Score 5 |
|---|-----------|---------|---------|---------|
| 6 | **Comparison-table specific** | No comparison table | Table with 3 tools × axes, sparse citations | Table with 3 tools × 8+ axes, every cell cited, RTL-compatible, use-case-specific recommendation row |

Max total: 30. Pass: ≥ 21 (70%). Excellent: ≥ 27 (90%).

## References

| # | Source | Type | URL | Access date |
|---|--------|------|-----|-------------|
| [S1] | NotebookLM | product page | https://notebooklm.google.com/ | 2026-08-13 |
| [S2] | NotebookLM Plus announcement | blog | https://blog.google/technology/google-deepmind/ | 2026-08-13 |
| [S3] | Perplexity Deep Research | product page | https://www.perplexity.ai/ | 2026-08-13 |
| [S4] | Perplexity docs | docs | https://docs.perplexity.ai/ | 2026-08-13 |
| [S5] | ChatGPT Deep Research | product page | https://chatgpt.com/ | 2026-08-13 |
| [S6] | OpenAI Deep Research announcement | blog | https://openai.com/research/ | 2026-08-13 |
| [S7] | PRISMA 2020 statement | academic | https://www.prisma-statement.org/ | 2026-08-13 |
| [S8] | Multi-agent research loop workflow | controller doc | agents_manager/research/WORKFLOW.md | 2026-08-13 |
| [S9] | Verifier mode | controller doc | agents_manager/review/SKILL.md § Research verifier mode | 2026-08-13 |
| [S10] | Eval README | controller doc | agents_manager/eval/README.md | 2026-08-13 |

## Metrics

- rubric_criteria: 6
- pass_threshold: 21
- excellent_threshold: 27
- expected_sources_min: 10
- expected_key_findings_min: 7
- sub_questions_suggested: 5
- comparison_axes_min: 8
- comparison_options_min: 3
