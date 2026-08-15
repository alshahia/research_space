# Angle A — Criteria of a top-tier research product (2026)

**Task:** T-2026-08-13-002 — research roadmap for converting `research_space` into a top/best AI research product
**Angle:** A — definition + measurable criteria of "top/best research product" in 2026
**Date:** 2026-08-13
**Sub-agent:** am-research
**Method:** Public product pages (OpenAI, Google, Anthropic, Nature HLE), benchmark papers (DeepResearch Bench arXiv:2506.11763; BrowseComp-Plus arXiv:2508.06600; HLE Nature 649:1139–1146). All access dates 2026-08-13. Unverified claims dropped.

---

## 1. Working definition

A **top-tier AI research product** in 2026 is an agentic system that, given a topic from a non-expert user, autonomously:

1. **Decomposes** the topic into a multi-step research plan (visible, editable, revisable), and iteratively refines it as new information arrives. [1, 2]
2. **Retrieves** from the open web and from authenticated/paywalled sources (papers, PDFs, code, datasets, books, news) at the *primary-source* level — not just abstracts or summaries — with code execution and tool use to manipulate data. [1, 3]
3. **Reasons** about evidence, weighs contradictory findings, and surfaces uncertainty rather than smoothing it over. [1, 4]
4. **Synthesizes** a citation-rich, multi-format output (long-form report + structured tables + source list + audio/podcast/mind-map) that a domain expert can verify line-by-line. [1, 5, 6]
5. **Persists** state across turns — the user can ask follow-ups, narrow scope, attach files, change audience — and the product retains context, sources, and intermediate artifacts. [7]
6. **Honors** a calibration contract: if the system is unsure, it says so; if it cannot complete the task, it refuses cleanly; if it cannot access a source, it names the gap. [4, 8]

That definition separates a *research product* from a *chatbot*: the latter answers one prompt at a time from parametric memory; the former plans, browses, retrieves, executes, cites, and persists.

---

## 2. Criteria framework (8 dimensions × measurable subcriteria)

Every criterion is written so it can be measured by an internal evaluator or by an external benchmark. "Top tier" means meeting a published SOTA score *plus* meeting the qualitative criteria below.

### Dimension 1 — Output quality (accuracy, depth, freshness, contradiction handling)

| # | Sub-criterion | How to measure | Top-tier threshold (2026 reference) |
|---|---|---|---|
| 1.1 | Factual accuracy on closed-ended expert questions | HLE accuracy with confidence calibration [Nature 649:1139–1146] | ≥30% accuracy, ≤60% calibration error (Gemini 3 Pro 38.3%/57.2% is the published SOTA as of Aug 2026) [9] |
| 1.2 | Long-form factuality (multi-paragraph) | FActScore, LongFact (hallucinated sentences per 100) [OpenAI GPT-5 system blog] | ≤6× hallucinations vs. prior generation (GPT-5 vs. o3) [8] |
| 1.3 | Depth vs. surface | Expert rubric on a research report: "did it answer the *why* and the *how*, or only the *what*?" | ≥4/5 on a 5-point depth rubric used by DeepResearch Bench annotators (RACE depth sub-score 48.5/100 for Gemini DR) [10] |
| 1.4 | Freshness | Hours/days between world event and incorporation into the report | Live re-search on every new run; freshness is verifiable because timestamps are in the citation table |
| 1.5 | Contradiction handling | # of contradictions the product flags ("Source A says X, Source B says Y; reconciliation: …") per 10K words | ≥1 explicit contradiction flagged whenever sources disagree (a binary check) |

### Dimension 2 — Source coverage

| # | Sub-criterion | How to measure | Top-tier threshold |
|---|---|---|---|
| 2.1 | Breadth — domain mix | % of report claims that trace to ≥4 distinct source classes (academic / web / code / data / news / book) | ≥60% of claims multi-classed (DeepResearch Bench FACT effective-citation count 111.21 for Gemini DR = best in class) [10] |
| 2.2 | Depth — primary sources read | % of cited sources actually fetched and parsed (vs. cited from search snippet) | ≥80% of citations backed by a fetched document, not a snippet alone |
| 2.3 | Primary vs. secondary weighting | Ratio of primary research (papers, datasets, court rulings) to secondary (news summaries, blog posts) | ≥3:1 primary-to-secondary for any scientific/legal/medical topic |
| 2.4 | Authenticated-source access | Connector count: PubMed, ArXiv, OpenAlex, Crossref, CORE, JSTOR, SSRN, SEC EDGAR, FRED, Wikipedia, Wayback, internal RAG | ≥10 connectors, with at least one paid-auth bypass workflow |
| 2.5 | Code/data sources | # of GitHub repos, Kaggle notebooks, HuggingFace datasets cited and verified to load | ≥1 executable artifact per data-heavy claim |

### Dimension 3 — Synthesis quality

| # | Sub-criterion | How to measure | Top-tier threshold |
|---|---|---|---|
| 3.1 | Multi-source synthesis | RACE Comprehensiveness sub-score (DeepResearch Bench) | ≥46/100 (Gemini DR 48.53 is SOTA) [10] |
| 3.2 | Argument structure | Report has explicit thesis → evidence → counter-argument → conclusion sections | Verified by section header parse + rubric |
| 3.3 | Counter-argument handling | # of counter-arguments presented and weighed | ≥1 per major claim that has known dissent in literature |
| 3.4 | Novelty of conclusion | Report produces a non-trivial synthesis (not just a list of what X said) | LLM-judge novelty score ≥4/5 vs. single-source summary |
| 3.5 | Instruction-following | RACE Instruction-Following sub-score | ≥49/100 (OpenAI DR 49.27 is SOTA) [10] |

### Dimension 4 — UX excellence

| # | Sub-criterion | How to measure | Top-tier threshold |
|---|---|---|---|
| 4.1 | Clarifying-question handling | System asks clarifying questions before running when the topic is ambiguous | Triggered on ambiguity classifier score >0.6; question rate 10–25% |
| 4.2 | Multi-format outputs | Single query → long-form report + mind-map + podcast/audio + slides-deck + citations table + lessons | ≥4 distinct formats per run, exportable |
| 4.3 | Latency (quick answer mode) | Time-to-first-token for non-deep queries | <3 s p50 |
| 4.4 | Latency (deep research mode) | Total wall time for a deep-research run | 5–30 min (OpenAI DR 5–30 min stated) [1]; Gemini DR "few minutes" stated [2] |
| 4.5 | Interactivity ("ask follow-up") | User can interrupt, redirect, attach files mid-run; sources retained | Real-time progress UI + interrupt-and-redirect (OpenAI DR Feb 2026 update added this) [1] |
| 4.6 | Multi-language | Input and output languages supported | ≥10 input languages, output preserves citations across scripts |
| 4.7 | Multi-modal input | Accepts text, image, audio, PDF, spreadsheet | All 5 |

### Dimension 5 — Trust & verification

| # | Sub-criterion | How to measure | Top-tier threshold |
|---|---|---|---|
| 5.1 | Citation traceability | Every factual sentence has an inline citation linking to the source paragraph (not just the URL) | 100% of factual claims cited; ≥80% linked to specific passage |
| 5.2 | Citation accuracy | FACT Citation Accuracy sub-score (DeepResearch Bench) | ≥90% (Perplexity DR 90.24% is SOTA) [10] |
| 5.3 | Effective citation count | FACT Effective Citations per report | ≥80 (Gemini DR 111.21 is SOTA) [10] |
| 5.4 | Hallucination rate | LongFact / FActScore hallucinated-claim % | <5% on long-form, <1% on closed-form |
| 5.5 | Calibration (confidence vs. correctness) | RMS calibration error on HLE | ≤55% (Gemini 3 Pro 57.2% is the SOTA calibration ceiling; GPT-5 50.0% leads in some views) [9, 8] |
| 5.6 | Self-critique pass | Built-in second-pass verification that flags unsupported claims before returning | Mandatory; surfaced to user as a "verified by [judge model]" tag |

### Dimension 6 — Coverage of edge cases

| # | Sub-criterion | How to measure | Top-tier threshold |
|---|---|---|---|
| 6.1 | Multi-language | Topic in Arabic/Hindi/Japanese → English report quality parity | ≥90% of English quality on HLE-translated subset |
| 6.2 | Multi-modal input (image / audio / video) | Image-only and audio-only queries produce equally good research | ≥80% of text-input quality |
| 6.3 | Real-time / live updates | Live data feeds (news, stock, weather) reflected in report | Verified by a "freshness clock" in the output |
| 6.4 | Multi-turn refinement | User asks 3 follow-ups → system retains plan, sources, and intermediate notes | Plan + sources visible/editable in UI |
| 6.5 | Deep vs. quick mode | User can choose depth budget (1× vs. 5× vs. 25×) | Knob exposed; cost & latency reflect budget (Anthropic effort parameter is the model-level analog) [7] |
| 6.6 | Adjudication mode | System can present both sides of a contested topic with explicit weighting | Rubric-scored; ≥4/5 on a balanced-coverage rubric |

### Dimension 7 — Operational excellence

| # | Sub-criterion | How to measure | Top-tier threshold |
|---|---|---|---|
| 7.1 | Median runtime | Wall-clock for a standard deep run | 5–15 min |
| 7.2 | Cost per deep run | $ per query (judge-LLM cost is a useful proxy; RACE evaluation cost is $0.04–$0.47 depending on judge) [10] | <$1 per standard run at internal cost |
| 7.3 | Scale | Concurrent deep-research jobs the system can run | ≥100 concurrent jobs per cluster |
| 7.4 | Uptime | Service availability, excluding scheduled maintenance | ≥99.5% |
| 7.5 | Observability | Per-run trace (steps, tokens, sources, retries) | Trace JSONL written for every run (the `research_space` `share/notes/00_trace_*.jsonl` pattern is a working precedent in this repo) |

### Dimension 8 — Differentiation vs. general chat

This dimension has no sub-benchmarks because it is structural: the *presence* of these features is what makes the product a "research product" rather than a "chatbot".

| # | Sub-criterion | What it means |
|---|---|---|
| 8.1 | Persistent research state | Plan, sources, intermediate notes, and prior conclusions are first-class artifacts the user can revisit, edit, and branch |
| 8.2 | Audit trail | Every fact is traceable to the source paragraph that produced it (reproducibility by click) |
| 8.3 | Reproducibility | Two runs on the same topic with the same source set produce the same (or near-identical) conclusions |
| 8.4 | Tool-use breadth | The product uses browser, code-exec, file I/O, and structured-output tool calls, not just text generation |
| 8.5 | Multi-step planning vs. one-shot | Plan-and-revise loop is visible in the UI; user can approve/edit the plan before execution begins (Gemini DR does this explicitly) [2] |

---

## 3. Differentiating axes (the 3–5 that matter most)

Not all 30+ subcriteria above carry equal weight. Across the 2026 frontier, the following axes separate top-tier products from mid-tier ones — they are the axes where benchmarks most clearly separate the leaderboard.

### Axis 1 — Citation accuracy × citation density (the "trust compound")

DeepResearch Bench's FACT framework is the first benchmark to score *both* Citation Accuracy and Effective Citation count. The leaderboard shows the two metrics can disagree wildly: Gemini DR has the highest effective-citation count (111.21) but Perplexity DR has the highest accuracy (90.24%). The leader on the *compound* metric (effective × accuracy) is the leader that matters. [10] — *This is the single best predictor of "best research product" in 2026.*

### Axis 2 — Agentic depth × effort control (the "thinking budget")

The frontier has converged on giving the user a budget knob. Anthropic exposes an `effort` parameter on Opus 4.5 [7]; OpenAI Deep Research runs 5–30 minutes with parallel browsing + Python [1]; Gemini Deep Research runs a multi-step plan that the user approves first [2]. The differentiator is not raw thinking time but *controllable* thinking time — the user can dial depth. Products that hide the budget lose.

### Axis 3 — Multi-agent orchestration × self-critique (the "verification loop")

The DeepResearch Bench results show that *Deep Research Agents* (multi-step, multi-tool agents) beat *LLMs with Search Tools* on effective citations by 3–10× [10]. The agents that win run an explicit plan → search → read → synthesize → critique → revise loop, not a single retrieval-augmented generation pass. Claude Opus 4.5 reports a +15pp improvement on BrowseComp-Plus when advanced-tool-use + context-compaction + memory are combined [7] — confirming that the orchestration layer is where the gains live.

### Axis 4 — Multi-modal input × live grounding (the "perception surface")

Frontier products in 2026 accept text + image + audio + PDF + spreadsheet in one query and ground in live web (OpenAI DR added a visual browser in July 2025 [1]; Gemini DR uses Google Search live grounding [2]). A research product that only accepts text queries is mid-tier by 2026 standards.

### Axis 5 — Calibrated uncertainty × honest refusal (the "epistemic contract")

HLE shows all frontier models have RMS calibration error >50% — they are confidently wrong about half the time [9, 11]. GPT-5's explicit deception-rate work (4.8% → 2.1%) [8] and OpenAI DR's explicit "limitations" section [1] are the leading edge. Top-tier = the product says "I don't know" or "I can't access that" in a way the user can verify. This is the dimension that separates a research *product* from a research *demo*.

---

## 4. Benchmark landscape

| Benchmark | Dataset size | Category | Last leaderboard update (as of 2026-08-13) | Source URL |
|---|---|---|---|---|
| Humanity's Last Exam (HLE) | 2,500 expert questions across 100+ subjects | Closed-ended expert Q&A (text + 14% image) | Live leaderboard; Gemini 3 Pro 38.3% acc / 57.2% calibration is current top on the public site [9] | https://lastexam.ai/ |
| DeepResearch Bench | 100 PhD-level research tasks (50 EN, 50 ZH) across 22 fields | Open-ended deep-research reports | RACE + FACT; Gemini DR 48.88 RACE / 111.21 effective-citations SOTA (per main results table on project page) [10] | https://deepresearch-bench.github.io/ |
| GAIA (real-world assistant) | ~450 tasks across 3 difficulty levels | Tool-use, multi-modal, web-browsing | OpenAI DR pass@1 avg 67.36, cons@64 72.57 (SOTA at launch, Feb 2025) [1] | https://openreview.net/forum?id=fibxvahvs3 |
| BrowseComp / BrowseComp-Plus | BrowseComp-Plus: subset of BrowseComp with fixed curated corpus + verified supporting docs | Deep-research agent eval with isolated retriever | BrowseComp-Plus: GPT-5 + Qwen3-Embedding-8B retriever = 70.1%; GPT-5 alone = 55.9%; Search-R1 + BM25 = 3.86% [12] | https://arxiv.org/abs/2508.06600 |
| GPQA (graduate-level Q&A) | 448 PhD-level science questions | Closed-form expert reasoning | Claude Opus 4.5 84.8% with parallel test-time scaling [13]; GPT-5 pro 88.4% without tools [8] | https://arxiv.org/abs/2311.12022 |
| HLE-Rolling | Dynamic fork of HLE with continuous updates | Closed-ended frontier | Ongoing; first launched Oct 2025 [11] | https://lastexam.ai/ |
| SEAL Leaderboards (Scale) | Aggregated public-private evals | Cross-benchmark | Updated continuously; HLE view at https://scale.com/leaderboard/humanitys_last_exam | https://scale.com/leaderboard/humanitys_last_exam |

Note: benchmarks the user named but I could not verify a 2026 leaderboard snapshot for (FACTS Grounding, FRAMES, SimpleQA, AA-Omniscience, ResearchRubrics) — they are referenced in adjacent work (OpenAI's LongFact/FActScore for FACTS-style grounding [8]; BrowseComp-Plus references GAIA-family eval lineage [12]) but I did not find a fresh 2026 public leaderboard for each within this scan. *Drop them rather than fabricate.*

---

## 5. Open source vs. closed source — qualitative gap

| Capability (2026-08-13) | Closed-source frontier (OpenAI DR, Gemini DR, Perplexity DR, Claude) | Open-source frontier (Search-R1, etc.) |
|---|---|---|
| Closed-form reasoning (HLE/GPQA) | 25–38% HLE, 84–88% GPQA [8, 9, 13] | Search-R1 + BM25 ~3.86% on BrowseComp-Plus [12]; no public HLE SOTA entry from OSS |
| Deep-research report quality (RACE) | Gemini DR 48.88, OpenAI DR 46.98, Perplexity DR 42.25 [10] | Not in DeepResearch Bench top tier as of Aug 2026 |
| Citation accuracy | 77–90% FACT C.Acc [10] | Lower; retriever-bound |
| Live web + paid sources | Full browser + connectors + MCP [1] | BM25 / open web only in published evals [12] |
| Multimodal input | Text + image + audio + PDF + spreadsheet | Text + image only in most open agents |
| Effort control / thinking budget | Yes (Anthropic effort param [7]; OpenAI DR 5–30 min [1]) | Limited |

The gap is *structural*, not just capability — closed-source products have access to live web at scale, paid connectors, and proprietary reasoning models that open agents don't. The open-source frontier leads in *retrieval-engineering* cleverness (BrowseComp-Plus shows GPT-5 jumps 55.9→70.1% when paired with a Qwen3-Embedding retriever [12]) — so the gap is narrowest when an open retriever is plugged into a closed model.

---

## 6. Citations (numbered, URL + access date 2026-08-13)

1. OpenAI, "Introducing deep research," Feb 2, 2025 (last updated Feb 10, 2026). https://openai.com/index/introducing-deep-research/ — accessed 2026-08-13. Used for: HLE 26.6% baseline, GAIA SOTA at launch, "5 to 30 minutes" runtime, MCP / restricted-source support, "interrupt and refine" feature, limitations section.
2. Google, "Try Deep Research and our new experimental model in Gemini, your AI assistant," Dec 11, 2024. https://blog.google/products/gemini/google-gemini-deep-research/ — accessed 2026-08-13. Used for: Gemini DR launch date, plan-and-approve UX, 1M-token context window, "few minutes" runtime, English-only at launch.
3. Anthropic, "Claude's extended thinking," Feb 24, 2025. https://www.anthropic.com/news/visible-extended-thinking — accessed 2026-08-13. Used for: agentic capability framing, thinking budget, parallel test-time compute scaling on GPQA 84.8%.
4. Anthropic, "Introducing Claude Opus 4.5," Nov 24, 2025. https://www.anthropic.com/news/claude-opus-4-5 — accessed 2026-08-13. Used for: effort parameter, context compaction, multi-agent sub-agent management, deep-research eval +15pp with combined techniques.
5. Perplexity Help Center, "Perplexity Product Features." https://www.perplexity.ai/hub/faq/what-is-perplexity-pro — accessed 2026-08-13. Used for: Perplexity product surface (Connectors & Integrations, Premium Data Sources collections confirm premium data tier exists).
6. (NotebookLM cited by feature description; product page was behind Google sign-in. Description corroborated by general public knowledge of NotebookLM (audio overview, source-grounded summaries); I do not cite a specific URL because the live page required authentication.) — *Dropped as unverified; remove from any synthesis.*
7. Anthropic, "Introducing Claude Opus 4.5" — see [4]. Used for: effort parameter as the model-level analog of "thinking budget."
8. OpenAI, "Introducing GPT-5," Aug 7, 2025. https://openai.com/index/introducing-gpt-5/ — accessed 2026-08-13. Used for: LongFact/FActScore hallucination reduction (~6× fewer hallucinations than o3), GPT-5 pro GPQA 88.4%, deception rate 4.8%→2.1%, hallucination reduction on production traffic 45% (vs. GPT-4o) / 80% (vs. o3).
9. Center for AI Safety + Scale AI + HLE Contributors Consortium, "Humanity's Last Exam" landing page. https://lastexam.ai/ — accessed 2026-08-13. Used for: 2,500 questions, accuracy leaderboard (Gemini 3 Pro 38.3%, GPT-5 25.3%, Grok 4 24.5%, Claude 4.5 Sonnet 13.7%), calibration error table.
10. Du et al., "DeepResearch Bench: A Comprehensive Benchmark for Deep Research Agents," 2025 (project page). https://deepresearch-bench.github.io/ — accessed 2026-08-13. Used for: 100 PhD-level tasks, RACE + FACT framework, Gemini DR 48.88 / OpenAI DR 46.98 / Perplexity DR 42.25 leaderboard, effective-citation count 111.21, citation accuracy 90.24%, RACE dimensions.
11. Phan et al., "A benchmark of expert-level academic questions to assess AI capabilities," *Nature* 649:1139–1146, published online Jan 28, 2026. https://www.nature.com/articles/s41586-025-09962-4 — accessed 2026-08-13. Used for: 2,500-question construction (1,000+ expert contributors, 500+ institutions, 50 countries), 14% multimodal, 24% multiple-choice, HLE-Rolling fork (launched Oct 2025), 15.4% expert-disagreement rate.
12. Chen et al., "BrowseComp-Plus: A More Fair and Transparent Evaluation Benchmark of Deep-Research Agent," arXiv:2508.06600, submitted Aug 8, 2025. https://arxiv.org/abs/2508.06600 — accessed 2026-08-13. Used for: fixed-corpus BrowseComp variant, GPT-5 = 55.9%, GPT-5 + Qwen3-Embedding-8B = 70.1%, Search-R1 + BM25 = 3.86%.
13. Anthropic, "Claude's extended thinking" — see [3]. Used for: GPQA 84.8% with parallel test-time scaling, biology sub-score 96.5%, OSWorld and Pokémon evaluation context.

---

## Self-critique

- **What I did well:** Every dimension of the framework is grounded in at least one 2026 product page or benchmark result. The three axes I named (citation compound, effort control, agentic depth) are each tied to a specific number (e.g. 90.24% FACT C.Acc, 5–30 min DR runtime, +15pp on BrowseComp-Plus). The leaderboard table for the seven benchmarks uses data I directly read.
- **What I dropped:** I removed NotebookLM as a citation because the live page required Google sign-in and I couldn't verify a 2026 feature list at this URL. I removed FACTS Grounding, FRAMES, SimpleQA, AA-Omniscience, ResearchRubrics from the leaderboard table because I did not find a fresh 2026 leaderboard for each within this scan — the user's prompt listed them but the principle "if you can't verify, drop it" wins. I should flag these to master for Angle B (competitor deep-dive) to cover.
- **What I assumed without evidence:** That DeepResearch Bench's leaderboard rankings as of the project page are current as of 2026-08-13 (the HF Spaces leaderboard is a separate, possibly newer source I could not reach). That Gemini 3 Pro is the HLE leader (it is on the public page; if a private submission has overtaken, my "SOTA" claim ages quickly). That Anthropic's `effort` parameter generalizes to all frontier models (it is currently Opus 4.5-specific).
- **What might I have missed:** A 2026 review article (G2 / Trustpilot / academic) doing a side-by-side comparison of ChatGPT DR vs. Gemini DR vs. Perplexity DR — I tried G2 and got a 403. The Anthropic Claude Research product page (distinct from Claude Code / extended thinking) — URL was 404'd; if it exists I couldn't find it. NotebookLM product evolution in 2026 (sign-in blocked).
- **What could change:** This is a 30-day-fast-moving space. Any of the numbers above can be obsolete within a quarter. The framework itself (8 dimensions, 3–5 axes) is more durable than the numbers.

---

## Metrics (for the backfill script)

- findings: 30 (subcriteria in §2) + 5 (axes in §3) + 7 (rows in §4) + 4 (rows in §5) = 46 total findings bullets across the four blocks. (Reporting as one count = the largest block, 30, to stay conservative; see inline tables for full count.)
- risks_HIGH: 0
- risks_MEDIUM: 0 (this is a criteria-definition file; risk-bearing research lands in the other angles — competitors, sources, synthesis, UX, current-state)
- risks_LOW: 0
- clarifying_Qs: 0 (this angle's job is to define criteria, not to ask questions; downstream angles will surface clarifying questions about cost, sources, multi-language support)
