# Competitor matrix — 12 AI research products × 18 columns (2026-08-13)

**Task:** T-2026-08-13-002
**Date:** 2026-08-13
**Author:** am-research
**Source:** `share/notes/01_research_T-2026-08-13-002_angle-b-competitors.md` (12 products, full per-product detail in §3) — pruned and recomposed into an 18-column matrix.
**Companion documents:**
- `research/00_TOP_RESEARCH_PRODUCT_ROADMAP_T-2026-08-13-002.md` — 4-layer conversion roadmap
- `research/00_GAP_MATRIX_T-2026-08-13-002.md` — 25-row feature gap matrix

**Legend:** ✓ = ships · △ = partial · ✗ = absent · `?` = unverified or paywalled · $ = paid · FOSS = fully open source.

---

## 1. The 12 × 18 matrix

| # | Product | Founded | Org | Free tier | Paid tier (cheapest) | Depth (multi-step agent?) | Sources (per run) | Citation accuracy | Primary-source access | Multi-modal input | Multi-language output | Real-time web | Audio overview | Mind-map | Slide export | Self-critique | Audit trail | Open-source | 2026 status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | **NotebookLM** (now Gemini Notebook) | 2023-05 (as "Project Tailwind"); renamed Gemini Notebook 2026-07-16 | Google Labs | Unlimited notebooks + audio overviews; ~50 sources/notebook cap | Bundled in Google One AI Premium **$19.99/mo** | ✗ (source-grounded RAG, no live web; runs on Gemini 3.5) | Up to 50 sources per notebook | ✓ (sentence-level; strict source-grounded) | △ user-uploads only | ✓ PDF, Docs, Slides, YouTube transcript, websites | ✓ 80+ languages for audio/video overviews | ✗ | ✓ Audio + Video Overview (flagship) | ✓ Mind Map (studio) | ✓ Slide Deck (Nov 2025) | △ (refuses out-of-corpus questions) | ✗ | ✗ (closed; RAG/audio pattern OSS-imitated) | Active; rebranded to Gemini Notebook 2026-07; Gemini 3.5 engine 2025-12; 2026 voice-cloning lawsuit filed |
| 2 | **Perplexity** | 2022-08; search 2022-12-07 | Perplexity AI (valuation $21.21B, 2026 Series E-6) | Unlimited basic queries with citations | Pro **$20/mo** | ✓ (Pro Search, Deep Research, multi-model) | ~10–40 sources per answer; Spaces with file uploads | ✓ (per-claim, hover-preview) | △ (live web strong; paywall circumvention varies) | ✓ PDF, image, CSV; "Computer" mode for local files | ✓ UI in 9+ languages; output in prompt language | ✓ (real-time + Comet browser free since Oct 2025) | ✗ (voice mode is input; no audio-overview) | ✗ | ✗ | △ (Spaces = bounded context) | ✗ | △ Sonar proprietary; **R1 1776** (DeepSeek derivative) OSS Feb 2025 | Active; Computer agent Feb 2026; ads removed Feb 2026; $750M Azure GPU commit Jan 2026 |
| 3 | **ChatGPT Deep Research** | 2025-02-02 (with o3) | OpenAI | "Limited deep research" | Plus **$20/mo** / Pro **$200/mo** | ✓ single-agent tool loop (5–30 min runs; can interrupt mid-flight Feb 2026) | "Hundreds" | ✓ inline citations; admits hallucination risk | ✓ Apps: Google Drive, SharePoint, FactSet, PitchBook, Scholar Gateway; MCP connectors Feb 2026 | ✓ text, image, audio, PDF, spreadsheet | ✓ follows prompt language; no explicit locale switch | ✓ (with "Sites" mode for trusted-domain restrict Feb 2026) | ✗ | ✗ | ✗ (PDF export of report only) | △ "Limitations" section; weak calibration (self-admitted) | △ (audit logs on Enterprise) | ✗ | Active; MCP + Sites mode Feb 2026; Pro $200 is the highest individual quota |
| 4 | **Gemini Deep Research** | 2024-12-11 (Gemini 2.0 Flash Thinking); broad 2025; Gemini 3 upgrade late 2025 | Google | Full DR available, rate-limited | AI Premium / Gemini Advanced **$19.99/mo** (regional variance) | ✓ multi-step plan-and-approve | "Hundreds" | ✓ inline citations | ✓ native Gmail/Drive/Chat pulls; Workspace-deep | ✓ text, image, PDF, Workspace | ✓ 45+ languages, 150 countries; RTL Arabic page in production | ✓ live grounding | △ via Canvas Audio Overview (NotebookLM-style) | △ via Canvas interactive | △ via Canvas | △ Canvas + thinking panel; calibration limits not published | ✗ | ✗ | Active; Gemini 3 engine late 2025; broader Workspace context 2026 |
| 5 | **Claude Research** (with Research mode) | 2025-04-15 Research mode | Anthropic | Web search available; no Research mode on Free | Pro **$17/mo annual / $20/mo monthly**; Max from **$100/mo** | ✓ multi-agent (Opus 4 lead + Sonnet 4 subagents + CitationAgent); **+90.2%** vs single-agent on internal eval | Inline citations | ✓ "thinking" by default | ✓ Google Workspace (Gmail, Calendar, Docs) connector; Cowork Chrome side-panel Aug 2026 | ✓ text, image, PDF | ✓ follows prompt language | ✓ web + Workspace | ✗ (no native audio) | ✗ (Artifacts only) | ✗ | ✓ self-critique built in; effort parameter on Opus 4.5 | ✓ Enterprise audit logs + Inference hooks for DLP Aug 2026 | ✗ | Active; Cowork side-panel Aug 12 2026; Inference hooks for DLP Aug 5 2026 |
| 6 | **Elicit** (formerly Ought) | 2018; rebrand to Elicit ~2022 | Ought / Elicit | Unlimited search/summary/chat across 138M+ papers | Pro **$49/mo**; Scale **$169/mo**; Enterprise custom | ✓ (Research Agent Aug 2026; PRISMA-2020 systematic-review workflow) | Up to 20,000 data points/run | ✓ sentence-level citations; "reasoning harness" | ✓ PubMed/ArXiv/WoS via API | ✓ PDF upload in screening | ✗ (English-only synthesis) | △ (corpus indexed; alerts for new research) | ✗ | ✗ | △ (Slides export) | △ "Research Agent" Aug 2026 adds figure/slide synthesis | ✗ | △ API + MCP server (Jul 2026) plug-in for external agents; core closed | Active; Research Agent Aug 4 2026; MCP server Jul 15 2026; API Mar 3 2026; BioDecisionBench 76.7% coverage (self-eval) |
| 7 | **Consensus** | 2017 (public 2021); founders Eric Olson, Christian Salem | Consensus NLP | Unlimited search across 220M+ peer-reviewed papers | Premium `?` (historically $9/mo, re-priced) | ✓ (Pro Search + Deep Search 2025–2026) | Per-question search | ✓ citations to specific sentences inside papers | △ peer-review-only corpus (no grey literature) | ✗ | ✗ | △ (corpus indexed; weekly digests) | ✗ | ✗ | ✗ | ✓ Consensus Meter (yes/no agreement visualization) + Study Snapshot | ✗ | ✗ | Active; Deep Search mode 2025–2026; 5M+ users |
| 8 | **SciSpace** (formerly Typeset) | 2018 (as Typeset); SciSpace rebrand 2022 | PubGenius Inc. (Milpitas CA) | Limited credits across tools | Premium `?` (paywalled public figure; credit math complex) | △ (Copilot on PDF; Agent Gallery 2025–2026) | 200M+ papers | ✓ inline Copilot citations | △ PDF Copilot + 200M+ papers | ✓ PDF + image upload; chat-with-PDF | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | Active; Agent Gallery (Biomedical + Recruit) 2025–2026; SOC2 footer |
| 9 | **You.com** (ARI — Advanced Research & Insights) | 2020; public beta 2021-11-09; unicorn Sep 2025 ($1.5B) | You.com | 100 free API queries/day; free chat | Web Search API **$5/1k**; Answer API $5/1k; Research API from **$12/1k**; Finance **$110/1k** | ✓ ARI multi-step (400+ sources per run; TIME Best Inventions 2025) | "Hundreds" per run | ✓ inline `[n]` references | ✓ enterprise APIs (Zero Data Retention, SOC 2) | ✓ (ARI scans multi-modal sources) | ✗ | ✓ | ✗ | ✗ | ✗ | △ AAAI Best Paper methodology | ✗ | △ SDKs + MCP server on `youdotcom-oss` GitHub org; engine closed | Active; Answer API launched Aug 2026; ARI named TIME Best Inventions 2025 |
| 10 | **STORM / Co-STORM** | 2024 NAACL (Shao et al., Stanford OVAL); Co-STORM EMNLP 2024 | Stanford OVAL | Free live demo at storm.genie.stanford.edu | n/a (OSS) | △ perspective-driven outline + RAG article; simulated conversations | Up to 100+ cited URLs | ✓ inline citations | ✓ web via modular retrievers (YouRM / BingSearch / Brave / Serper / Tavily / SearXNG / DuckDuckGo / AzureAISearch) | ✗ text-only input | ✓ output in prompt language | ✓ (depends on retriever module) | ✗ | △ Co-STORM dynamic mind map | ✗ | ✗ (over-association of unrelated facts is a known failure mode) | △ trace per Article generation | **FOSS** — MIT; `stanford-oval/storm`; 31k stars / 2.9k forks | Active; litellm integration Jan 2025; Co-STORM codebase Sep 2024 |
| 11 | **ResearchRabbit** (Litmap Ltd.) | 2021; rebranded to Litmap Ltd. 2026 | Litmap Ltd. | **Free Forever**: unlimited searches across 310M+ papers; 50 seed articles/search cap | RR+ **$10/mo** (US default; 100+ country parity) | ✗ (no native AI summarization; citation-graph discovery only) | 310M+ papers (catalog) | n/a (graph not text) | ✓ citation graph works forward + backward from seed | ✗ | ✗ | ✓ via Zotero sync + RR+ Signals alerts (retractions) | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | Active; RR+ Signals alerts 2025; country parity 100+ countries |
| 12 | **Iris.ai** (RSpace / Axion / Neuralith) | ~2015; "ten years later" 2025 blog post | Iris.ai (Norway-rooted) | ✗ (sales-gated) | Custom (sales-only) | ✓ enterprise R&D knowledge engine | Internal corpus (patents, papers, regulatory filings) | ? (no independent benchmarks) | ✓ (R&D-focused) | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | Active; 3-product rebrand (Axion / Neuralith / RSpace) 2025–2026; 10-year anniversary |

---

## 2. Capability cluster summary (which products own which capability)

| Capability | Owner(s) | Differentiator type |
|---|---|---|
| **Source-grounded RAG over user-uploaded docs** (notebook model) | **NotebookLM / Gemini Notebook** | Category-defining |
| **Multi-step agentic web research + report export** | **ChatGPT DR, Gemini DR, Claude Research, Perplexity DR, You.com ARI, Elicit Research Agent** | Crowded; differentiation is in (a) source breadth, (b) export format, (c) workspace integration |
| **Academic peer-review-only search + consensus** | **Consensus, Elicit** | Two-horse race; Consensus owns "Meter" UI, Elicit owns "PRISMA-grade systematic review" |
| **Citation-graph discovery and visualization** | **ResearchRabbit** | Effectively uncontested in visual-mapping niche |
| **Open-source knowledge-curation pipeline** | **STORM / Co-STORM** | Sole credible OSS reference; MIT |
| **Audio / video podcast-style summaries** | **NotebookLM** (flagship); Gemini DR (Canvas) | NotebookLM still leads |
| **Workspace connectors (Gmail / Drive / SharePoint)** | **ChatGPT DR, Claude Research, Gemini DR** | Claude + Gemini deepest integrations; ChatGPT covers Drive/SharePoint/FactSet/PitchBook |
| **Enterprise R&D knowledge engine (regulated industries)** | **Iris.ai**, Elicit Research Agent, You.com (regulated-industry customers) | Iris.ai pure-play |
| **Browser-as-agent (AI browser)** | **Perplexity Comet** | Sole notable product; free since Oct 2025 |
| **Multi-model router (user picks the underlying LLM)** | **Perplexity** (GPT + Claude + Gemini + Sonar + Kimi) | Differentiator; ties answer engine to model marketplace |
| **Plug-in to external agents via MCP** | **You.com (MCP)**, **Elicit (MCP, Jul 2026)** | Newest layer; exposes the product as an MCP tool |

---

## 3. Free-tier comparison (what you actually get for $0)

| Product | Free core capability | Free hard limits | What is **gated** to paid |
|---|---|---|---|
| NotebookLM | Unlimited notebooks + audio overviews | ~50 sources/notebook; slower generation | Collaborative notebooks, longer docs (Google One AI Premium $19.99/mo) |
| Perplexity | Unlimited basic queries with citations | Rate-limited Pro Search | Model selector, file upload, Internal Knowledge Search (Pro $20/mo) |
| ChatGPT DR | Unlimited text chats (GPT-5.6); limited DR | "Limited deep research" | Deep Research quota (Plus $20/mo, Pro $200/mo); connected apps |
| Gemini DR | Full DR available | Quotas for Workspace + Canvas audio | Capacity + Workspace depth (AI Premium $19.99/mo) |
| Claude | Web search + extended thinking | No Research mode on Free | Research mode (Pro $17/mo annual, $20/mo monthly) |
| Elicit | Unlimited search/summary/chat across 138M+ papers | "Limited Research Agent" | Systematic review workflow, PRISMA, custom columns, API (Pro $49/mo) |
| Consensus | Full search across 220M+ papers | Quotas on Pro/Deep Search | Deep Search, full-text chat, Citation Graph depth |
| SciSpace | Limited credits across tools | Credit math | Copilot depth, AI Writer, bulk features (Premium) |
| You.com | 100 free API queries/day | Web Search API quota | Research API ($12/1k), Answer API ($5/1k), Finance ($110/1k) |
| STORM | Live demo at storm.genie.stanford.edu | None — OSS | n/a (operator pays LLM API) |
| ResearchRabbit | Unlimited searches across 310M+ papers; unlimited Collections | 50 seed articles/search; core search settings | 300 seeds, advanced search, Signals alerts, multi-project (RR+ $10/mo) |
| Iris.ai | n/a (sales-gated) | n/a | n/a |

**Pattern:** Every credible 2026 product keeps a free tier (except Iris.ai). Free tier is sufficient for **discovery and small-scale validation**; paid tiers unlock sustained deep research, systematic-review workflows, and enterprise-grade integrations.

---

## 4. Open-source sub-table

| Product | Repo | License | Stars | Maintenance signal (2026-08-13) | Fit |
|---|---|---|---|---|---|
| **STORM / Co-STORM** | `stanford-oval/storm` | **MIT** | 31.0k | 238 commits on `main`; litellm news Jan 2025; last commit 2026 | Reference impl for "research a topic → write a cited article" |
| **dspy** (STORM's underlying framework) | `stanfordnlp/dspy` | Apache-2.0 | n/a | Active | Programmatic LM pipeline toolkit |
| **Elicit API + MCP server** | docs.elicit.com + MCP server Jul 15 2026 | Closed but documented | n/a | Active | Plug Elicit into external agents |
| **You.com SDKs + MCP server** | `youdotcom-oss` GitHub org | Mixed | n/a | Active | Plug You.com APIs into external agents |
| **Perplexity Sonar / R1 1776** | OSS weights Feb 2025 | Mixed (Sonar proprietary, R1 1776 = DeepSeek derivative) | n/a | Active | Partial — open weights, not the answer engine |

**Scan result:** STORM is the **only fully open-source product** in the 12-product list. All others are closed SaaS. Elicit and You.com expose API + MCP integrations so an external agent can call them — closest the closed products come to being composable.

---

## 5. Pricing reality (cheapest paid tier per competitor)

| # | Product | Cheapest paid (USD/mo) | Notes |
|---|---|---|---|
| 1 | NotebookLM | $19.99 (Google One AI Premium bundle) | Bundled, not standalone |
| 2 | Perplexity | $20 Pro | Standard US pricing |
| 3 | ChatGPT DR | $20 Plus (limited) / $200 Pro (maximum) | Quotas differ dramatically across tiers |
| 4 | Gemini DR | ~$19.99 Gemini Advanced | Regional variance |
| 5 | Claude Research | $17 Pro (annual) / $20 (monthly) | $100/mo Max for 5×–20× usage |
| 6 | Elicit | $49 Pro | $169 Scale; Enterprise custom |
| 7 | Consensus | `?` (historically $9, re-priced) | Paywalled pricing page |
| 8 | SciSpace | `?` | Paywalled pricing page |
| 9 | You.com | $5/1k Web Search API; $12/1k Research API; $110/1k Finance API | Per-call, not per-seat |
| 10 | STORM | n/a (OSS) | Operator pays LLM API |
| 11 | ResearchRabbit | $10 RR+ | 100+ country parity |
| 12 | Iris.ai | Custom (sales) | Enterprise only |

**Distribution:**
- **$0–$25/mo band:** NotebookLM bundle, Perplexity Pro, ChatGPT Plus, Gemini Advanced, Claude Pro — consumer-grade research assistants.
- **$25–$60/mo band:** ResearchRabbit RR+ ($10), Elicit Pro ($49) — academic + citation-graph work.
- **Enterprise / API-only:** You.com, Iris.ai — pay-as-you-go or custom contracts.

**For research_space:** if competing on consumer, the cheapest paid price ceiling is **$20/mo** to match Perplexity Pro / ChatGPT Plus / Gemini Advanced / Claude Pro / NotebookLM (bundle).

---

## 6. User-complaint clusters (cross-cutting themes for the roadmap)

From Angle B §8.6, six themes matter for the conversion plan:

| # | Theme | Implication |
|---|---|---|
| 1 | **Quota transparency** is a recurring complaint (ChatGPT DR, Elicit, You.com) | Surface remaining quota clearly in the UI from day 1 |
| 2 | **Citation provenance matters more than citations themselves** — sentence-level anchoring, not paragraph-level | Citations in `[S1]…[Sn]` form linked to specific chunks (gap-matrix row 5) |
| 3 | **Workspace data privacy** is a hard requirement for enterprise; opt-in by default is the wrong default | Auth layer must be tenant-isolated; no shared-bus leakage (gap-matrix row 2) |
| 4 | **Cross-source disagreement should be visualized, not hidden** — Consensus Meter is the only mainstream attempt | Section-level confidence + "what sources disagree" callout (gap-matrix row 7) |
| 5 | **Open weights vs. SaaS** — STORM is the only fully OSS option; many academic users prefer this for reproducibility | Default recommendation: open-source the engine, keep the product open-source |
| 6 | **Free-tier competition is brutal** — every credible 2026 product keeps a free tier | Ship a free MVP; do not gate behind paywall |

---

## 7. Source citations

All cells above trace to `share/notes/01_research_T-2026-08-13-002_angle-b-competitors.md` (23 numbered citations, access date 2026-08-13). Key URLs:

- Wikipedia — Gemini Notebook: https://en.wikipedia.org/wiki/Gemini_Notebook
- Wikipedia — Perplexity AI: https://en.wikipedia.org/wiki/Perplexity_AI
- OpenAI Help — Deep Research: https://help.openai.com/en/articles/10500283-deep-research-a-guide-for-using-o3-style-research-assistants
- OpenAI Pricing: https://openai.com/chatgpt/pricing/
- Gemini Deep Research: https://gemini.google/overview/deep-research/
- Anthropic Claude Research blog: https://claude.com/blog/research
- Anthropic Pricing: https://www.anthropic.com/pricing
- Elicit homepage: https://elicit.com/
- Elicit Pricing: https://elicit.com/pricing
- Elicit Blog — Research Agent (Aug 4 2026): https://blog.elicit.com/introducing-elicit-research-agent
- Consensus homepage: https://consensus.app/
- SciSpace Pricing: https://typeset.io/pricing
- Wikipedia — You.com: https://en.wikipedia.org/wiki/You.com
- You.com Pricing: https://you.com/pricing
- STORM GitHub: https://github.com/stanford-oval/storm
- ResearchRabbit homepage: https://www.researchrabbit.ai/
- ResearchRabbit Pricing: https://www.researchrabbit.ai/pricing
- Iris.ai: https://iris.ai/

## 8. Self-critique

- **What I did well:** Every cell traces to a numbered citation in Angle B (access date 2026-08-13). I expanded Angle B's 12-column matrix into the requested 18-column shape by splitting "depth" into multi-step agent / sources / primary-source access, and adding the 6 trust/differentiator columns (multi-modal, multi-language, real-time, audio, mind-map, slide, self-critique, audit trail). The 5 sub-tables (capability clusters, free-tier, OSS, pricing, user complaints) all reuse Angle B content.
- **What I dropped:** `unverified paid-tier claim` flags for Consensus and SciSpace pricing are preserved as `?` in column 5 — those numbers could not be verified.
- **What needs user input:** Pricing-band choice ($0-only MVP vs. freemium v1 vs. paid-from-day-one) — informed by section 5's distribution table.
- **What might change:** The 12-product list is the most-cited subset; long-tail products (Andi, iAsk, Komo, Phind, Exa Answer, iFellow, Humata, PDFGPT, ChatPDF, Sharly, Mendel, Linnk) exist but were not enumerated to keep the table scannable. A second-pass angle could grow the table to 20+ rows.