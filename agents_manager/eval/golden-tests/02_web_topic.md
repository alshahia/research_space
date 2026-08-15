---
name: golden-test-02-web-topic
description: Golden test 2 - web search topic. Activates the multi-agent research loop on a recent-events subject that needs live web fetch.
---

# Golden Test 02 - Web Topic

**Test id:** 02-web-topic
**Date:** 2026-08-13
**Domain:** web search - recent events / product launches
**Tier:** 4 (sum > 3.5 - multi-agent loop + verifier + eval)
**Sub-agent:** research / planner / coder / eval runner

## Topic

> "What are the major AI agent-harness projects released in 2026, and how do they compare in capability?"

This topic requires live web fetch - agent-harness projects released in 2026 are recent and unlikely to be in arXiv. It exercises:

- The DuckDuckGo / Jina Reader connectors (general web search + URL-to-markdown).
- Multi-agent decomposition (one sub-agent per harness).
- Citation discipline for non-academic sources (product pages, blog posts, GitHub releases).
- Verifier mode (cited-but-404, secondary-only source checks).
- Comparison-table format expectation (the topic is a comparison).

## Sub-question decomposition (suggested for master)

Master SHOULD decompose into one sub-agent per harness, plus a synthesis sub-agent. Suggested split (≥ 3 sub-agents recommended):

1. **Sub-harness-claude-code** - Anthropic's claude-code CLI agent.
2. **Sub-harness-codex-cli** - OpenAI's codex CLI / codex cloud.
3. **Sub-harness-gemini-cli** - Google's Gemini CLI / Project IDX.
4. **Sub-harness-openhands** - Open-source OpenHands (formerly OpenDevin).
5. **Sub-harness-aider** - Aider (open-source terminal-first agent).
6. **Sub-synthesis** - cross-harness comparison (axes × options).

At minimum, 3 sub-questions and the synthesis sub. Master decides based on the parallel-research budget.

## Expected sources

A high-quality run cites the canonical product page, the GitHub repo (when OSS), and at least one independent review for each harness. List of expected categories:

- **Anthropic / Claude Code:**
  - https://www.anthropic.com/news/agent-harness-2026 (when published)
  - https://docs.claude.com/en/docs/claude-code (official docs)
  - GitHub stars + recent commits via `https://github.com/anthropics` (look for the harness repo)
- **OpenAI / Codex CLI:**
  - https://openai.com/index/introducing-codex/ (or the 2026 update post)
  - https://github.com/openai/codex
- **Google / Gemini CLI:**
  - https://blog.google/technology/google-deepmind/google-ai-studio-2026/
  - https://github.com/google-gemini/gemini-cli
- **OpenHands:**
  - https://github.com/All-Hands-AI/OpenHands
  - https://docs.all-hands.dev/
- **Aider:**
  - https://aider.chat/
  - https://github.com/Aider-AI/aider
- **Comparison articles:**
  - Independent blog posts that compare ≥ 2 of the above. Use DuckDuckGo / Jina Reader for discovery.

Each harness SHOULD have ≥ 2 citations (official + third-party). The synthesis SHOULD cite all 5+ harnesses in the comparison table.

## Expected key findings

A high-quality output surfaces at least these claims, each with a citation:

1. Anthropic Claude Code is a terminal-first agent integrated with Anthropic's API; 2026 release focused on multi-file edits and browser-MCP integration.
2. OpenAI Codex CLI competes head-on with Claude Code; 2026 release added cloud-codegen and a "codex cloud" remote sandbox.
3. Google Gemini CLI is integrated with Google AI Studio + Project IDX; 2026 release added free-tier for Gemini 2.5 Pro.
4. OpenHands (All-Hands-AI/OpenHands, Apache-2.0) is the leading open-source harness; downloads ≥ 100k/month in 2026.
5. Aider (aider-chat, Apache-2.0, ~30k GitHub stars) is terminal-first and framework-free; competes on simplicity.
6. All 5+ harnesses support a "browser MCP" / "browser use" feature for live web search.
7. Pricing differs significantly: Claude Code and Codex are paid; OpenHands / Aider are free + bring-your-own-key.

## Comparison axes (for the synthesis sub-agent)

| Axis | Claude Code | Codex CLI | Gemini CLI | OpenHands | Aider |
|------|-------------|-----------|------------|-----------|-------|
| Open-source | no | partial (codex CLI open; cloud closed) | partial (CLI open; Studio closed) | yes (Apache-2.0) | yes (Apache-2.0) |
| License | proprietary | MIT (CLI) / closed (cloud) | Apache-2.0 | Apache-2.0 | Apache-2.0 |
| First-party | Anthropic | OpenAI | Google | All-Hands-AI | Aider-AI |
| Pricing | $20/seat/mo | $20/seat/mo + cloud usage | free + paid tiers | free (BYO key) | free (BYO key) |
| Browser-MCP | yes (MCP) | yes | yes (built-in) | yes | partial |
| Multi-file edits | yes | yes | yes | yes | yes |
| Year of major release | 2024-2026 | 2025-2026 | 2025-2026 | 2024-2026 | 2024 |

Master may add rows (e.g. "supports vision", "supports voice", "self-hosted mode"). Every row must cite ≥ 2 harnesses with sources.

## Coverage risks to flag in verifier

- **Stale data** - harness space is moving fast; access dates must be 2026-08-13 or recent.
- **Product-page-vs-implementation drift** - official pages often overstate capability; verify against GitHub Issues + recent commits.
- **Pricing drift** - pricing pages change without notice; re-fetch for accuracy.
- **Comparison-table hallucination** - a row that says "no" for one harness should be verifiable from a single source per harness.

## Run instructions

Same as 01-arxiv-topic - see `agents_manager/eval/README.md` § How to run a test.

## Grading rubric (5 criteria × 1-5 score)

| # | Criterion | Score 1 (worst) | Score 3 (acceptable) | Score 5 (best) |
|---|-----------|-----------------|----------------------|----------------|
| 1 | **Citation density** | < 50% of factual claims have `[Sn]` | ~ 80% of factual claims have `[Sn]`, reference table complete | All factual claims cited, reference table verified, no orphan `[Sn]` markers |
| 2 | **Accuracy (top claims verified)** | ≥ 1 of the 7 expected key findings is wrong or unsupportable | All 7 expected findings appear; 1 is single-sourced | All 7 expected findings appear with ≥ 2 sources each; no factually wrong claims |
| 3 | **Depth (sub-question coverage)** | One-block answer, no sub-question split | 5 sub-questions, each covered but lightly | 5+ sub-questions covered in depth, with self-critique per sub-question |
| 4 | **Format match (workflow deliverable)** | Output not at `share/notes/01_research_*.md` | Output at canonical path, no verifier report | Output at canonical path + verifier report + master synthesis + comparison table with axes × options |
| 5 | **Arabic support (when triggered)** | Locale ignored in AR-aware run | Bilingual template used, AR section present but thin | Bilingual template + RTL markdown + AR citations parallel to EN + comparison table works in RTL direction |

Total possible: 25. Pass threshold: ≥ 18 (72%). Excellent threshold: ≥ 22 (88%).

### Bonus criterion (comparison topics only)

| # | Criterion | Score 1 | Score 3 | Score 5 |
|---|-----------|---------|---------|---------|
| 6 | **Comparison-table specific** | No table | Table with axes × options, sparse citations | Table with all 5+ harnesses, ≥ 5 axes, every cell cited, RTL-compatible |

For this test, criterion 6 is included as a bonus. Max total: 30.

## References

| # | Source | Type | URL | Access date |
|---|--------|------|-----|-------------|
| [S1] | Anthropic Claude Code docs | official docs | https://docs.claude.com/en/docs/claude-code | 2026-08-13 |
| [S2] | OpenAI Codex CLI repo | OSS repo | https://github.com/openai/codex | 2026-08-13 |
| [S3] | Google Gemini CLI repo | OSS repo | https://github.com/google-gemini/gemini-cli | 2026-08-13 |
| [S4] | OpenHands repo | OSS repo | https://github.com/All-Hands-AI/OpenHands | 2026-08-13 |
| [S5] | Aider site | product page | https://aider.chat/ | 2026-08-13 |
| [S6] | Jina Reader | tool | https://r.jina.ai/ | 2026-08-13 |
| [S7] | Multi-agent research loop workflow | controller doc | agents_manager/research/WORKFLOW.md | 2026-08-13 |
| [S8] | Verifier mode | controller doc | agents_manager/review/SKILL.md § Research verifier mode | 2026-08-13 |
| [S9] | Eval README | controller doc | agents_manager/eval/README.md | 2026-08-13 |

## Metrics

- rubric_criteria: 6
- pass_threshold: 18
- excellent_threshold: 26
- expected_sources_min: 12
- expected_key_findings_min: 7
- sub_questions_suggested: 5-7
- comparison_axes_min: 5
- comparison_options_min: 5
