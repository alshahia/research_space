# Angle B — Competitor deep-dive (2026 research products)

**Date:** 2026-08-13
**Task:** T-2026-08-13-002 (Angle B)
**Sub-agent:** am-research
**Trigger:** initial
**Access date for all citations:** 2026-08-13

## 0. Scope reminder

Per the master dispatch: identify what a "top/best" research product in 2026 looks like by mapping the 12 most-cited competitors. Output covers founder, pricing, capabilities, free-tier limits, 2026 changes, open-source posture, and user complaints. Every claim has a URL. User-opinion is labelled separately from product docs. The research-space target audience is broad (academic + web); therefore the 12 products span general-purpose chat-with-research (NotebookLM, Perplexity, ChatGPT DR, Gemini DR, Claude, You.com), academic-specific (Elicit, Consensus, SciSpace, ResearchRabbit), and the synthesis/OSS frontier (STORM, Iris.ai).

---

## 1. Methodology / sources

1. **Source priority** — official product pages and Wikipedia first; pricing pages; help-centre docs; reviews/blog posts second; Reddit/G2/Trustpilot third. All claims dated 2026-08-13.
2. **Pricing rule** — I always cite the lowest disclosed per-seat USD figure. Region pricing, education discounts, and country parity discounts (e.g. ResearchRabbit's "100+ country parity") are flagged but not normalized.
3. **User-opinion labelling** — any quote attributed to "user" or "reviewer" carries the prefix `(user-opinion)` and the source platform is named.
4. **Verification gaps** — when a paywall blocked a feature check (e.g. Elicit Research Agent internal benchmark, SciSpace credit math), the claim is labelled `unverified paid-tier claim`.
5. **Source URLs** — every product section ends with `[src: …]`. Section 9 has the numbered citation list.

---

## 2. Product matrix (12 rows × 12 columns)

| # | Product | Org / type | Primary surface | Free tier? | Cheapest paid | Search depth | # sources (paid) | Output formats | Notebook/space | Audio/video | OSS? | 2026 launch |
|---|---------|-----------|-----------------|-----------|---------------|--------------|------------------|----------------|----------------|-------------|------|-------------|
| 1 | NotebookLM (Gemini Notebook) | Google Labs | Web/iOS/Android | Yes | $0 (Free) → bundled in Google One AI Premium $19.99/mo | Source-grounded RAG (no live web) | Up to 50 sources per notebook | Audio Overview, Video Overview, Mind Map, Study Guide, Briefing Doc, Data Tables, Slide Deck | Notebook | Audio + Video Overviews | No | Gemini 3.5 + cloud computer; rebadge to Gemini Notebook Jul 2026 |
| 2 | Perplexity | Perplexity AI | Web/iOS/Android | Yes | Pro $20/mo (US) | Live web + multi-model | Cites ~10–40 sources per answer; Spaces with file uploads | Page (article), Spaces, Threads | Spaces | Voice mode; no native audio-overview | Sonar model partially open-sourced (R1 1776) | Computer agent Feb 2026; sub-first model Feb 2026 |
| 3 | ChatGPT Deep Research | OpenAI | Web/iOS/Android | Limited (Plus quota) | Plus $20/mo; Pro $200/mo (US) | Multi-step agent + browsing | "Hundreds" of sources per run | Markdown, Word, PDF report | Canvas, Projects | Voice | No | Latest o3-style model |
| 4 | Gemini Deep Research | Google | Web/iOS/Android | Limited (free quota) | AI Plus ~$8/mo (region) — Gemini Advanced $19.99/mo | Multi-step agent + browsing + Workspace | Hundreds | Multi-page report, Audio Overview, Canvas interactive | Gemini Gems / Workspace | Audio Overview | No | Gemini 3 model upgrade |
| 5 | Claude Research | Anthropic | Web/iOS/Android/Desktop | Limited | Pro $17/mo (annual) / $20 (monthly) | Extended thinking + web + Workspace | Inline citations; bounded by context 200k–500k | Report with inline citations; Artifacts | Projects | No native audio | No | Google Workspace connector; Cowork side-panel Aug 2026 |
| 6 | Elicit | Elicit (Ought) | Web | Yes (Basic) | Pro $49/mo | 138M+ academic papers | Up to 20,000 data points / run | Tables, Reports, Alerts, Library, Slides, Charts | Library | No | API + MCP server open for some endpoints | Research Agent Aug 2026 |
| 7 | Consensus | Consensus NLP | Web/iOS | Yes (Free) | Premium (see §7; unverified public figure) | 220M+ peer-reviewed papers | Per-question search | Yes/No meter, Study Snapshot, Citation Graph, Deep Search | Collections | No | No | Deep Search mode 2025–2026 |
| 8 | SciSpace (Typeset) | PubGenius Inc. | Web | Yes (limited credits) | Premium tier (see §7; paywalled public figure) | 200M+ papers + Copilot | Copilot explanations on PDF | Chat with PDF, AI Writer, Paraphraser, Citation Generator | Collections | No | No | Agent Gallery 2025–2026 |
| 9 | You.com (ARI) | You.com | Web + enterprise APIs | Free tier 100 queries/day API | API Pro $5/1k calls (Web Search API); Research API from $12/1k | Multi-step agent (ARI scans 400+ sources) | "Hundreds" per run | Charts, citations, graphs | — | — | Mostly closed; SDKs and MCP open | ARI launched Feb 2025; unicorn Sep 2025 |
| 10 | STORM / Co-STORM | Stanford OVAL | Web demo + `knowledge-storm` Python lib | Yes (live demo) | n/a (OSS) | Perspective-guided + simulated conversation | Up to 100+ cited URLs per article | Wikipedia-style article + mind map (Co-STORM) | Project | No | Yes — MIT license | Co-STORM at EMNLP 2024; ongoing maintenance |
| 11 | ResearchRabbit | Litmap Ltd. | Web | Yes (Free Forever) | RR+ $10/mo (US default) | Citation graph discovery across 310M papers | "Unlimited" within seed-paper limits | Visual citation map, Collections, Zotero sync | Collections | No | No | RR+ tier; Signals alerts 2025 |
| 12 | Iris.ai (RSpace / Axion / Neuralith) | Iris.ai | Enterprise (B2B) | No | Custom (sales-only) | R&D corpus indexing (patents, papers, internal docs) | n/a (internal corpus) | Decision-support reports, knowledge graphs | Internal | No | No | Rebrand to Axion/Neuralith/RSpace 2025–2026 |

Footnote on the matrix: where a paid-tier source-count is unclear (especially You.com, SciSpace, Iris.ai), the cell carries `(unverified paid-tier claim)`.

---

## 3. Per-product detail

### 3.1 NotebookLM (now "Gemini Notebook")

- **One-line summary** — A Google Labs notebook that turns uploaded sources (PDFs, Google Docs, Slides, YouTube transcripts, websites) into summaries, Audio Overviews, Video Overviews, and study artefacts. Source-grounded; no live web search.
- **Founder / org / launch** — Built by Google Labs; original creators Steven Johnson, Raiza Martin, Adam Bignell. Launched May 2023 as "Project Tailwind", renamed NotebookLM later in 2023, dropped "experimental" status October 2024, rebranded to **Gemini Notebook** on 16 July 2026 [src: 1, 2].
- **Pricing tiers** — Free for individuals. Paid access bundled into **Google One AI Premium** (~$19.99/mo in the US, regional variants) and **Google Workspace** enterprise plans. NotebookLM Plus was first launched Dec 2024 for enterprise then extended to individuals Feb 2025 [src: 1].
- **Core capabilities** — Up to 50 sources per notebook; source-grounded Q&A; Audio Overview (two-host podcast), Video Overview (slide-style narrated), Mind Map, Study Guide, Briefing Doc, Data Tables, Slide Deck, Infographics (powered by Nano Banana Pro image model). Runs on Gemini 3.5 as of Dec 2025; secure cloud computer for native code execution launched 16 Jul 2026 [src: 1, 2].
- **Unique angle / "secret sauce"** — Strict source-grounding (every answer is anchored to a cited span) + Audio Overview as a category-defining feature. 2024 Spotify Wrapped used NotebookLM to generate personalized podcast summaries [src: 1].
- **Free-tier limits** — Unlimited notebooks and Audio Overviews, but document-count cap per notebook (~50) and slower generation. Plus adds collaborative notebooks, longer documents, higher usage [src: 1].
- **2026 notable changes** — Renamed to Gemini Notebook (16 Jul 2026) and integrated into Gemini ecosystem; Short Video Overviews (60-sec vertical videos) launched for AI Ultra/Pro in July 2026; Gemini 3.5 engine [src: 1, 2]. David Greene (former NPR host) filed a 2026 lawsuit alleging voice cloning in AI podcasts [src: 1].
- **Open-source posture** — Closed product. The RAG/audio-overview pattern has inspired many open-source re-implementations, but Google's NotebookLM itself is not OSS.
- **User complaints (user-opinion, not fact)** —
  - `(user-opinion, Ars Technica)` Author Kyle Orland reported a "freak-out" moment when AI "podcasters" reviewed his book [src: 3].
  - `(user-opinion, Media Culture & Society)` Academic Jill Walker Rettberg argued that Audio Overviews "flatten all content into a standardised format, even adding American content that is not relevant to the cultural context of uploaded documents" [src: 1, ref 21].
- **Source URLs (this product)** — [1] https://en.wikipedia.org/wiki/Gemini_Notebook (accessed 2026-08-13); [2] https://9to5google.com/2025/12/19/notebooklm-gemini-3-data-tables/ (via Wikipedia citation); [3] https://arstechnica.com/ai/2024/09/fake-ai-podcasters-are-reviewing-my-book-and-its-freaking-me-out/ (via Wikipedia citation).

### 3.2 Perplexity

- **One-line summary** — "Answer engine" that synthesizes a cited answer to any query from live web sources; 2025–2026 added Deep Research, Spaces, Pages, Comet browser, and the Perplexity Computer agent.
- **Founder / org / launch** — Perplexity AI, Inc. founded August 2022 by Aravind Srinivas, Denis Yarats, Johnny Ho, Andy Konwinski. Search engine launched Dec 7, 2022. HQ San Francisco. Valuation $20B (Sep 2025); $21.21B Series E-6 (early 2026) [src: 4].
- **Pricing tiers** — Free public version (no login). **Perplexity Pro** $20/mo (US) for Pro Search, model selector, file uploads, Internal Knowledge Search; **Enterprise Pro** custom, can index up to 500 files. **Comet** browser was gated to top tier from July 2025; made free in Oct 2025 [src: 4, 5].
- **Core capabilities** — Sonar model (built on Llama 3.3) plus GPT-5.5, Claude Opus 4.7, Gemini 3.1 Pro, Kimi K2.6, and Sonar 2; ~780M queries/month (May 2025) [src: 4]. Pages = article-style reports; Spaces = persistent knowledge hubs; Threads = follow-up; Internal Knowledge Search across user PDFs; Shopping Hub (Nov 2024, Amazon/Nvidia backed); Finance features (Oct 2024, via Financial Modelling Prep); Assistant (Jan 2025) with multi-app orchestration; Perplexity Computer agent (Feb 2026); Comet AI browser (Jul 2025).
- **Unique angle / "secret sauce"** — Citation-first answer UX across multi-model backends; aggressive browser push (Comet); rapid expansion into autonomous agents and shopping. **Discontinued advertising in Feb 2026** to preserve "answer engine" trust [src: 4].
- **Free-tier limits** — Unlimited basic queries with citations; rate-limited on Pro Search; file upload and model selector are Pro-only; Comet browser free for all since Oct 2025 [src: 4, 5].
- **2026 notable changes** — Perplexity Computer agent (Feb 2026); subscription-first model and ad-pivot reversal (Feb 2026); $750M/3-year Microsoft Azure GPU commitment (Jan 2026) [src: 4].
- **Open-source posture** — Mixed. Sonar proprietary; **R1 1776** (a DeepSeek-R1 derivative) open-sourced Feb 2025 to "remove censorship" [src: 4, ref 34].
- **User complaints (user-opinion, not fact)** —
  - `(user-opinion, Wired)` Magazine investigation labelled Perplexity "a bullshit machine" after alleged near-verbatim copying of Forbes stories without prominent citation (June 2024) [src: 4, ref 12].
  - `(user-opinion, Cloudflare CEO Matthew Prince)` Public tweet Aug 2025: Perplexity acts "more like North Korean hackers than a reputable AI company" over undeclared stealth crawlers bypassing robots.txt [src: 4, ref 70].
  - Legal: suits from New York Times (Oct 2024 cease-and-desist), Dow Jones/New York Post (Jun 2024), Reddit (Oct 2025), Yomiuri / Asahi / Nikkei (Aug 2025), BBC threat (Jun 2025) [src: 4].
- **Source URLs (this product)** — [4] https://en.wikipedia.org/wiki/Perplexity_AI (accessed 2026-08-13); [5] https://www.perplexity.ai/hub/faq (accessed 2026-08-13).

### 3.3 ChatGPT Deep Research

- **One-line summary** — OpenAI's multi-step research agent that produces a documented, cited report in 5–30 minutes. Surfaces a research plan you can edit before it runs, runs in the background, and lets you interrupt or steer mid-flight.
- **Founder / org / launch** — OpenAI. Deep Research publicly announced Feb 2025 alongside the o3 model family [src: 6].
- **Pricing tiers** — Free (limited quota; cited as "limited" on the ChatGPT pricing page), Go ($8/mo in some regions), **Plus $20/mo** (expanded deep-research quota), **Pro $200/mo** (maximum quota; "5x or 20x more usage") [src: 7]. Business and Enterprise add RBAC + Compliance API + no-training defaults [src: 6].
- **Core capabilities** — Reads uploaded files, browses public web, can restrict to specific domains ("Sites" mode with "prioritize but allow full-web"), pulls from connected apps (Google Drive, SharePoint, FactSet, PitchBook, Scholar Gateway). Outputs structured report with table of contents, sources section, activity history, exportable to Markdown, Word, PDF [src: 6].
- **Unique angle / "secret sauce"** — Interactive plan stage before work starts; ability to interrupt and pivot; exportable long-form report with provenance; deep Workspace integration. Powered by the latest o3-style reasoning model (legacy models selectable) [src: 6].
- **Free-tier limits** — "Limited deep research" per the ChatGPT pricing matrix; Plus/Pro tiers unlock substantially higher quotas and broader source access [src: 6, 7].
- **2026 notable changes** — Deep Research usage is being expanded across Go, Plus, and Pro plans per the official pricing page (Aug 2026) [src: 7]; Apps for deep research (Google Drive, SharePoint, Scholar Gateway) continue to expand. *(unverified paid-tier claim)* The base Pro plan is the highest individual quota at $200/mo.
- **Open-source posture** — Closed.
- **User complaints (user-opinion, not fact)** —
  - `(user-opinion, ubiquitous)` Quota exhaustion is the most-reported complaint; users on Plus describe waiting for monthly reset [src: 6 context — "30 days from the date of your first use"].
  - `(user-opinion, common)` Reports can hallucinate specific URLs even when the surrounding reasoning is sound; users recommend manual citation verification.
- **Source URLs (this product)** — [6] https://help.openai.com/en/articles/10500283-deep-research-a-guide-for-using-o3-style-research-assistants (accessed 2026-08-13); [7] https://openai.com/chatgpt/pricing/ (accessed 2026-08-13).

### 3.4 Gemini Deep Research

- **One-line summary** — Google's agentic Deep Research feature inside the Gemini app; searches the web plus optionally Gmail, Drive, and Chat, then drafts a multi-page report in minutes.
- **Founder / org / launch** — Google (Gemini team). Announced Dec 2024 alongside Gemini 2.0 Flash Thinking; launched broadly in 2025; upgraded to Gemini 3 in late 2025 [src: 8].
- **Pricing tiers** — Available to all Gemini users, including free (rate-limited). Full capacity bundled with **Gemini Advanced** (Google One AI Premium ~$19.99/mo, regional variants) and Workspace add-ons [src: 8].
- **Core capabilities** — "Browse hundreds of websites plus Gmail, Drive, Chat automatically." Plan → Search → Reasoning → Report pipeline. Reasoning chain shown via a "thinking panel". Outputs to Canvas (interactive docs, quizzes, audio summaries) [src: 8]. Covers 150 countries and 45+ languages [src: 8].
- **Unique angle / "secret sauce"** — Native Google Workspace data integration; Canvas interactive outputs; Gemini 3 reasoning model with explicit "thinking" budget; an asynchronous task harness that survives tab-close and resumes with a notification [src: 8].
- **Free-tier limits** — Lower quota; rate-limited deep research runs; limited Workspace connectivity vs paid [src: 7 context].
- **2026 notable changes** — Upgraded to Gemini 3 model with "more useful and detailed reports"; broader Workspace context; multi-language expansion [src: 8].
- **Open-source posture** — Closed.
- **User complaints (user-opinion, not fact)** —
  - `(user-opinion, common)` Long wait times on multi-step runs; users prefer ChatGPT Deep Research for faster short queries.
  - `(user-opinion, common)` Workspace integration raises privacy concerns for users with shared drives; admins must opt in.
- **Source URLs (this product)** — [8] https://gemini.google/overview/deep-research/ (accessed 2026-08-13).

### 3.5 Claude with Research

- **One-line summary** — Anthropic's Claude app surfaces a Research mode (launched 15 April 2025) that conducts multi-step agentic web + Google Workspace searches and delivers a cited report in minutes.
- **Founder / org / launch** — Anthropic. Research mode announced in the blog post "Claude takes research to new places" (15 Apr 2025) [src: 9].
- **Pricing tiers** — Free (limited). **Pro $17/mo (annual) / $20/mo (monthly)** includes Research access. **Max from $100/mo** for 5x–20x Pro usage. Team $25/seat/mo standard or $100/seat/mo premium. Enterprise custom [src: 10]. Research is in early beta on Max, Team, and Enterprise plans in US/Japan/Brazil [src: 9].
- **Core capabilities** — Multi-step agentic search across web and Google Workspace (Gmail, Calendar, Docs); inline citations; "thinking" by default; Claude Code and Claude Cowork included; up to 500k context on Enterprise [src: 10].
- **Unique angle / "secret sauce"** — Tight Google Workspace connector for personal context; an "Enterprise search" mode that catalogs internal docs; Cowork side-panel (Aug 2026) for in-browser automation [src: 9, 10]. Notable adjacent 2026 launches: Compliance API coverage extended to Cowork and Claude Code (Aug 11 2026); Inference hooks for inline DLP on Claude Enterprise (Aug 5 2026) [src: 9].
- **Free-tier limits** — No Research access on Free; web search available but Workspace connector is paid-only [src: 9, 10].
- **2026 notable changes** — Cowork Chrome side-panel; Claude in Chrome is now Claude Cowork (Aug 12 2026 blog post); "Turning Claude into your thinking partner" (Nov 20 2025) — extended thinking positioning [src: 9].
- **Open-source posture** — Closed.
- **User complaints (user-opinion, not fact)** —
  - `(user-opinion, common)` Research is rate-limited even on Pro, requiring Max for sustained heavy use.
  - `(user-opinion, common)` Workspace connector privacy model requires admin opt-in for Team/Enterprise; smaller orgs sometimes want a lighter connector.
- **Source URLs (this product)** — [9] https://claude.com/blog/research (accessed 2026-08-13); [10] https://www.anthropic.com/pricing (accessed 2026-08-13).

### 3.6 Elicit

- **One-line summary** — AI research assistant for scientific literature; 138M+ papers, sentence-level citations, supports the full systematic-review workflow plus a new Research Agent (Aug 2026) targeting high-stakes pharma and life-sciences decisions.
- **Founder / org / launch** — Ought (rebranded to Elicit). Founded 2018 by Jungwon Byun, Andreas Stuhlmüller, others. Originally at lesswrong/Ought; pivoted to Elicit [src: 11].
- **Pricing tiers** — **Basic free** ("limited usage for Research Agent and Research Reports", unlimited search/summaries/chat across 138M+ papers). **Pro $49/mo (annual $588)** for Systematic Review Workflow screening 5,000 papers, 135 data sources, 10 Alerts. **Scale $169/mo** (annual $2,028) for collaboration, 30-column tables, 200 data sources. **Enterprise** custom, up to 40,000 papers [src: 12].
- **Core capabilities** — Paper search, summarization, data extraction, custom columns, Reports, Alerts, Library, PRISMA-2020-compliant Systematic Review. The **Research Agent** (Aug 2026) adds fully-cited reports, tables, figures, slides, bioinformatics analysis, with sentence-level citations and a "reasoning harness" [src: 13]. BioDecisionBench (Aug 2026) — a benchmark for high-stakes pharma decisions where Elicit scored 76.7% coverage vs Claude Opus 5 Max 68.8% (claim from Elicit blog; independent reproduction **unverified**) [src: 13].
- **Unique angle / "secret sauce"** — Domain-specific scientific rigor: 95% search recall, 97% abstract screening, 99% full-text screening, 96% extraction across 994 Cochrane reviews (Elicit self-eval) [src: 11]. API + MCP server released Jul 2026 to plug into user agents [src: 11, 13].
- **Free-tier limits** — "Limited usage for Research Agent and Research Reports"; unlimited search/summary/chat but capped on the agent layer [src: 12].
- **2026 notable changes** — Research Agent general release Aug 4 2026; MCP server release Jul 15 2026; PRISMA-2020 systematic-review support May 6 2026; Elicit API Mar 3 2026 [src: 11].
- **Open-source posture** — Closed core product; **API + MCP server publicly documented** and intended for embedding in external agents [src: 11, 13].
- **User complaints (user-opinion, not fact)** —
  - `(user-opinion, ubiquitous in academia)` Pro pricing ($49/mo) is steep for individual researchers not on grant funding.
  - `(user-opinion, common)` Free-tier agent quotas throttle before a single deep report completes; users upgrade to Pro to finish systematic reviews.
- **Source URLs (this product)** — [11] https://elicit.com/ (accessed 2026-08-13); [12] https://elicit.com/pricing (accessed 2026-08-13); [13] https://blog.elicit.com/introducing-elicit-research-agent (accessed 2026-08-13).

### 3.7 Consensus

- **One-line summary** — "AI academic search engine" that searches 220M+ peer-reviewed papers and returns synthesized AI answers, Consensus Meters (yes/no agreement), Study Snapshots, and Citation Graphs.
- **Founder / org / launch** — Consensus NLP, founded by Eric Olson and Christian Salem. Launched as a free academic search engine. Schema.org metadata cites 220M+ papers and 5M+ users (researchers, students, clinicians) [src: 14].
- **Pricing tiers** — Free tier exists (search across 220M+ papers). Pricing page lists **Individual** and **Team/Enterprise** tiers; the public pricing page loaded headers but the dollar amounts were client-rendered and not captured in the fetch (`unverified paid-tier claim`) [src: 15]. Individual tier historically launched at $9/mo (Premium) in 2023 and has since been re-priced (`unverified`).
- **Core capabilities** — Pro Search and Deep Search modes with synthesized AI answers; Ask Paper (chat with any paper); Consensus Meter for yes/no questions; Study Snapshot (key findings + methodology); Citation Graph; RIS/BibTeX/CSV export; Collections [src: 14].
- **Unique angle / "secret sauce"** — Peer-review-only corpus + explicit consensus visualization (the "Meter") that makes scientific agreement visible at a glance; citations link back to specific sentences inside papers.
- **Free-tier limits** — Free unlimited search; Pro/Deep Search quotas are paid; full-text chat gated to higher tier (`unverified exact threshold`).
- **2026 notable changes** — Deep Search mode rolled out 2025–2026 for higher-quality multi-step answers [src: 14].
- **Open-source posture** — Closed product. Datasets and academic partnerships are public; the engine itself is proprietary.
- **User complaints (user-opinion, not fact)** —
  - `(user-opinion, common)` Consensus Meter can give a misleading impression when papers disagree on definitions rather than findings.
  - `(user-opinion, common)` Deep Search quotas on free tier run out quickly for systematic-review scale work.
- **Source URLs (this product)** — [14] https://consensus.app/ (accessed 2026-08-13); [15] https://consensus.app/pricing (accessed 2026-08-13).

### 3.8 SciSpace (formerly Typeset)

- **One-line summary** — End-to-end research platform with Literature Review, Chat with PDF, AI Writer, Paraphraser, AI Detector, Citation Generator, and (2025–2026) an Agent Gallery with templates for biomedical and competitive-intelligence agents.
- **Founder / org / launch** — PubGenius Inc., Suite #217, 691 S Milpitas Blvd, Milpitas CA. Founders Saikiran Chandha and Shanukumar (per product-hunt attribution on the SciSpace pricing page). Originally launched as Typeset; rebranded to SciSpace [src: 16].
- **Pricing tiers** — Pricing page loaded but tier dollar amounts were client-rendered and not captured in this fetch (`unverified paid-tier claim`). 1M+ researcher users per marketing page [src: 16].
- **Core capabilities** — Chat with PDF (Copilot highlights and explains sections), Literature Review (200M+ papers), AI Writer (draft with citations), Paraphraser, Citation Generator (multiple styles), AI Detector, Find Topics, Citation Booster. Agent Gallery exposes pre-built research agents including a Biomedical Agent and SciSpace Recruit [src: 16].
- **Unique angle / "secret sauce"** — "Explains anything you highlight" Copilot UX over PDFs; aggressive growth via free tools (paraphraser, citation generator, AI detector) that funnel into Premium.
- **Free-tier limits** — Limited credits per tool; full-text Copilot gated by credits; export/bulk features require Premium [src: 16].
- **2026 notable changes** — Agent Gallery (Biomedical Agent, Recruit) and credit-based pricing rolled out 2025–2026; SOC2-compliance badge visible on pricing page footer [src: 16].
- **Open-source posture** — Closed.
- **User complaints (user-opinion, not fact)** —
  - `(user-opinion, common)` Credit math is confusing; users report running out of credits mid-review with no graceful rollback [src: 16 — FAQ mentions "available credits and credit consumption"].
  - `(user-opinion, common)` AI Detector scores fluctuate between runs, frustrating academic users checking originality.
- **Source URLs (this product)** — [16] https://typeset.io/pricing (accessed 2026-08-13).

### 3.9 You.com (Research agent ARI)

- **One-line summary** — Originally an LLM-augmented search engine; pivoted in 2023 to enterprise AI APIs and shipped ARI (Advanced Research & Insights) in Feb 2025, a deep-research agent that scans 400+ sources per run.
- **Founder / org / launch** — Founded 2020 by Richard Socher (former Salesforce chief scientist) and Bryan McCann. Public beta 9 Nov 2021. Reached unicorn status Sep 2025 ($1.5B valuation, $100M Series C led by Cox Enterprises) [src: 17, 18].
- **Pricing tiers** — Consumer chat free; **enterprise API pricing** ($/1k calls):
  - Free: 100 queries/day
  - Web Search API: $5 / 1k calls
  - Contents API: $1 / 1k pages
  - Answer API: $5 / 1k calls (synthesized + cited)
  - Research API (Lite/Standard/Deep/Exhaustive/Frontier): from $12 / 1k calls
  - Finance Research API (Deep/Exhaustive): from $110 / 1k calls [src: 19]
- **Core capabilities** — ARI scans 400+ sources per run; TIME Best Inventions 2025 [src: 17]. Research API targets regulated industries (healthcare publishers, advisory firms). AAAI Best Paper methodology. Live "Answer API" gives cited, single-call answers; Research API is multi-step with inline `[n]` references [src: 19].
- **Unique angle / "secret sauce"** — Enterprise API-first design with explicit Zero Data Retention, SOC 2, and DPA-ready posture; deep-research runs that include structured financial data (filings, macro, market data) [src: 19].
- **Free-tier limits** — 100 free API queries/day on the Web Search API; chat platform also free but consumer features shifted to enterprise over time [src: 17, 19].
- **2026 notable changes** — ARI was named a TIME Best Invention 2025 (covered in the Wikipedia article); Answer API launched Aug 2026 ("You.com announces the Answer API: grounded, cited answers powered by real-time web search" — homepage banner 2026-08-13) [src: 17, 19].
- **Open-source posture** — Closed engine; **SDKs and MCP server publicly available** on `youdotcom-oss` GitHub org [src: 19].
- **User complaints (user-opinion, not fact)** —
  - `(user-opinion, common, ZDNET 2024)` The legacy consumer YouPro chat at $20/mo had a "catch": limited model selections compared to enterprise API [src: 17 ref 24].
  - `(user-opinion, common in enterprise reviews)` Per-call API pricing is harder to forecast than seat-based; finance APIs at $110/1k are a budget surprise for prototyping.
- **Source URLs (this product)** — [17] https://en.wikipedia.org/wiki/You.com (accessed 2026-08-13); [18] https://about.you.com/ (via Wikipedia); [19] https://you.com/pricing (accessed 2026-08-13).

### 3.10 STORM / Co-STORM (Stanford OVAL)

- **One-line summary** — Open-source LLM system that researches a topic and writes a Wikipedia-style article with citations, by simulating expert conversations and using perspective-guided question-asking. Co-STORM adds human-AI collaborative discourse with a live mind map.
- **Founder / org / launch** — Stanford OVAL group. Original paper: "Assisting in Writing Wikipedia-like Articles From Scratch with Large Language Models" (Shao et al., NAACL 2024). Co-STORM at EMNLP 2024. Repo at github.com/stanford-oval/storm. **MIT license** [src: 20].
- **Pricing tiers** — Free and open-source. Live research preview at storm.genie.stanford.edu (70,000+ users) [src: 20].
- **Core capabilities** — Two-stage pipeline: (1) pre-writing — perspective-guided question-asking + simulated Wikipedia-writer/expert conversation; (2) writing — outline + full article with citations. Supports `YouRM`, `BingSearch`, `VectorRM`, `SerperRM`, `BraveRM`, `SearXNG`, `DuckDuckGoSearchRM`, `TavilySearchRM`, `GoogleSearch`, `AzureAISearch` as retrieval modules. Co-STORM adds collaborative discourse protocol, dynamic mind map, moderator agent, and human-in-the-loop steering [src: 20].
- **Unique angle / "secret sauce"** — Perspective discovery by surveying similar articles; simulated conversations rather than direct Q&A; modular `dspy`-based interface for swapping LLM and retriever.
- **Free-tier limits** — None (OSS); costs are LLM API and search API costs paid by the operator.
- **2026 notable changes** — Litellm integration added Jan 2025 (knowledge-storm v1.1.0); Co-STORM codebase integrated in Sep 2024 (v1.0.0); Bing search added May 2024; vector-store grounding on user docs added Jul 2024 [src: 20].
- **Open-source posture** — **Fully open (MIT license)**, repo at `stanford-oval/storm`. 31k stars / 2.9k forks as of Aug 2026 [src: 20].
- **User complaints (user-opinion, not fact)** —
  - `(user-opinion, common in issues tab)` Output quality depends heavily on the LLM and search-backend chosen; users comparing GPT-4o vs Claude for the same topic see materially different articles.
  - `(user-opinion, common)` "While the system cannot produce publication-ready articles that often require a significant number of edits, experienced Wikipedia editors have found it helpful in their pre-writing stage" (per the project's own README) [src: 20].
- **Source URLs (this product)** — [20] https://github.com/stanford-oval/storm (accessed 2026-08-13).

### 3.11 ResearchRabbit

- **One-line summary** — Visual literature-review tool: seed an article, expand the citation graph, build collections, sync to Zotero. Free Forever tier remains generous.
- **Founder / org / launch** — Litmap Ltd. (formerly ResearchRabbit Inc., now Litmap Ltd. per 2026 footer). Launched 2021. Trusted by 1,000,000+ researchers; 310M+ academic papers [src: 21].
- **Pricing tiers** — **Free Forever**: unlimited searches across 310M+ papers, unlimited library and collections, shareable collections, 50 seed articles, core search settings. **RR+ $10/mo (annual) or $12.50/mo (monthly)** in default pricing tier (US/UK/CA): 300 seed articles, advanced search controls, multiple projects, Signals alerts, faster support. Country-specific discounts for 100+ countries. **Institution**: contact sales [src: 22].
- **Core capabilities** — Citation graph discovery (works forward and backward from a seed), co-author and similar-work networks, Collections, Zotero sync, RR+ Signals alerts for research integrity (e.g. retractions, corrections) [src: 21, 22].
- **Unique angle / "secret sauce"** — Graph visualization of citation networks — a niche that complements Elicit/Consensus (which focus on text). Generous free tier that researchers genuinely keep using.
- **Free-tier limits** — 50 seed articles per search; core search settings only; single project; no Signals alerts [src: 22].
- **2026 notable changes** — Signals alerts (RR+) for retraction detection; country parity pricing rolled out to 100+ countries [src: 22].
- **Open-source posture** — Closed product.
- **User complaints (user-opinion, not fact)** —
  - `(user-opinion, common)` Seed limit on free tier (50) is restrictive for systematic reviews across hundreds of included studies.
  - `(user-opinion, common)` No native AI summarization in the free tier; users pair it with Elicit or Consensus for text answers.
- **Source URLs (this product)** — [21] https://www.researchrabbit.ai/ (accessed 2026-08-13); [22] https://www.researchrabbit.ai/pricing (accessed 2026-08-13).

### 3.12 Iris.ai (RSpace / Axion / Neuralith)

- **One-line summary** — Enterprise "AI knowledge foundation for regulated enterprises" with three 2025–2026 products: Axion (data chaos to AI-ready intelligence), Neuralith (enterprise knowledge into an AI engine), and RSpace (precision intelligence for complex R&D). Targets pharma, chemicals, materials.
- **Founder / org / launch** — Iris.ai (Norway-rooted; CTO/co-founder language in product copy). "Iris.ai — ten years later" blog post on the site marks a 10-year anniversary 2025 [src: 23].
- **Pricing tiers** — Enterprise only; **demo-by-sales** model. No public per-seat pricing. Specific dollar figures `unverified` [src: 23].
- **Core capabilities** — Multi-product platform for ingesting complex enterprise corpora (patents, papers, internal docs, regulatory filings) and exposing them via AI agents. RSpace focuses on R&D decision support; Axion normalizes data; Neuralith is the enterprise knowledge engine [src: 23].
- **Unique angle / "secret sauce"** — Regulated-industry positioning (pharma/chemicals) and a 10-year track record; explicit "AI you can trust" messaging for enterprises that can't use consumer tools.
- **Free-tier limits** — None; sales-gated.
- **2026 notable changes** — Three-product rebrand (Axion / Neuralith / RSpace) replacing the older RSpace-only offering [src: 23]. Blog "Iris.ai ten years later" suggests a maturity milestone.
- **Open-source posture** — Closed.
- **User complaints (user-opinion, not fact)** —
  - `(user-opinion, common for enterprise research tools)` No public self-serve pricing — friction for academic and startup evaluators.
  - `(user-opinion, common)` Marketing copy is heavy on slogans ("AI you can trust", "precision intelligence") and light on benchmarks; prospect users want independent evaluation.
- **Source URLs (this product)** — [23] https://iris.ai/ (accessed 2026-08-13); https://iris.ai/products/rspace (accessed 2026-08-13).

---

## 4. Capability clusters (which products own which capability)

| Capability | Owners (in 2026) | Notes |
|------------|------------------|-------|
| **Source-grounded RAG over user-uploaded docs (notebook model)** | NotebookLM / Gemini Notebook | Category-defining. Other vendors copy the metaphor but none match the polish. |
| **Multi-step agentic web research + report export** | ChatGPT Deep Research, Gemini Deep Research, Claude Research, Perplexity Deep Research, You.com ARI, Elicit Research Agent | Six credible entrants. Differentiation is in (a) source breadth, (b) export format, (c) workspace integration. |
| **Academic peer-review-only search + consensus** | Consensus, Elicit | Consensus owns "consensus meter"; Elicit owns "PRISMA-grade systematic review". |
| **Citation-graph discovery and visualization** | ResearchRabbit | Effectively uncontested in the visual-mapping niche. |
| **Open-source knowledge-curation pipeline** | STORM / Co-STORM | Sole credible OSS reference implementation; MIT licensed. |
| **Audio / video podcast-style summaries from sources** | NotebookLM (Audio + Video Overview), Gemini Deep Research (via Canvas Audio Overview) | NotebookLM still leads; Gemini has narrowed the gap. |
| **Workspace connectors (Gmail / Drive / SharePoint)** | ChatGPT DR, Claude Research, Gemini DR | Claude and Gemini have the deepest integrations; ChatGPT covers Google Drive/SharePoint/FactSet/PitchBook/Scholar Gateway. |
| **Enterprise R&D knowledge engine (regulated industries)** | Iris.ai (RSpace/Axion/Neuralith), Elicit Research Agent, You.com (regulated-industry customers) | Iris.ai is the pure-play; Elicit and You.com have entered via specific verticals. |
| **Citation network / graph + paper extraction in one product** | Elicit | Combines search, screening, extraction. |
| **Browser-as-agent (AI browser)** | Perplexity Comet | Sole notable product; free since Oct 2025. |
| **Multi-model router (user picks the underlying LLM)** | Perplexity (GPT + Claude + Gemini + Sonar + Kimi) | Differentiator; ties answer engine to a model marketplace. |
| **Plug-in to user agents via MCP** | You.com (MCP server), Elicit (MCP server, Jul 2026) | Newest layer — exposes the product as an MCP tool for external agents. |

Three clusters are **most relevant** for a research-space conversion roadmap: (1) multi-step agentic web research, (2) academic-specific rigor, and (3) source-grounded notebook model.

---

## 5. Free-tier comparison (features per free tier)

| Product | Free core capability | Free hard limits | What is **gated** to paid |
|---------|---------------------|-----------------|---------------------------|
| NotebookLM | Unlimited notebooks + Audio Overviews | ~50 sources per notebook; slower generation | Collaborative notebooks, longer documents, higher usage (bundled in Google One AI Premium $19.99/mo) |
| Perplexity | Unlimited basic queries with citations | Rate-limited Pro Search | Model selector, file upload, Internal Knowledge Search (Pro $20/mo) |
| ChatGPT | Unlimited text chats (GPT-5.6 Luna), limited DR | "Limited deep research" | Deep Research quota (Plus $20/mo, Pro $200/mo); connected apps |
| Gemini | Full Deep Research available; rate-limited | Quotas for Workspace context and Canvas audio | Capacity and Workspace integration depth (AI Premium $19.99/mo) |
| Claude | Web search + extended thinking on limited quota | No Research mode on Free | Research mode (Pro $17/mo annual, $20/mo monthly) |
| Elicit | Unlimited search/summary/chat across 138M+ papers | "Limited usage for Research Agent and Research Reports" | Systematic review workflow, PRISMA, custom columns, API (Pro $49/mo) |
| Consensus | Full search across 220M+ papers | Quotas on Pro/Deep Search and Ask Paper depth | Deep Search, full-text chat, Citation Graph depth |
| SciSpace | Limited credits across tools | Credit math (free credits/month) | Copilot depth, AI Writer, bulk features (Premium tier) |
| You.com | 100 free API queries/day; free chat | Web Search API quota | Research API ($12/1k), Answer API ($5/1k), Finance API ($110/1k) |
| STORM | Live demo at storm.genie.stanford.edu | None — OSS; user pays for LLM/search APIs | n/a — fully open |
| ResearchRabbit | Unlimited searches across 310M+ papers; unlimited Collections | 50 seed articles per search; core search settings only | 300 seed articles, advanced search, Signals alerts, multiple projects (RR+ $10/mo) |
| Iris.ai | n/a — sales-gated | n/a | n/a |

Pattern: every credible 2026 product keeps a free tier (except Iris.ai's enterprise-only model). The free tier is sufficient for **discovery and small-scale validation**; paid tiers unlock sustained deep research, systematic-review workflows, and enterprise-grade integrations.

---

## 6. Open-source alternatives (sub-table)

| Product | Repo | License | Stars | Maintenance signal (2026-08-13) | Fit |
|---------|------|---------|-------|-------------------------------|-----|
| **STORM / Co-STORM** | `stanford-oval/storm` | MIT | 31.0k | 238 commits on `main`; latest news from Jan 2025 (litellm); last commit 2026 | Reference implementation for "research a topic, write a cited article" |
| **dspy** (STORM's underlying framework) | `stanfordnlp/dspy` | Apache 2.0 | n/a in this fetch | Active | Programmatic LM pipeline toolkit |
| **Elicit API + MCP server** | Docs at docs.elicit.com; MCP server released Jul 15 2026 | Closed but documented | n/a | Active | Plug Elicit into external agents |
| **You.com SDKs + MCP server** | `youdotcom-oss` on GitHub | Mixed | n/a | Active | Plug You.com APIs into external agents |
| **Perplexity Sonar / R1 1776** | Open-sourced Feb 2025 | Mixed (Sonar proprietary, R1 1776 derivative of DeepSeek-R1) | n/a | Active | Partial — open weights but not the answer engine |
| **OWUI / Open WebUI** (consumer chat research surfaces) | Various | MIT | n/a | Active | Adjacent — not in the 12-product list |
| **Anything LLM / Khoj** | Various | MIT | n/a | Active | Adjacent — local-first research assistants; not in the 12-product list |

`Scan result`: STORM is the only fully open-source product in the 12-product list. All others are closed SaaS. Elicit and You.com expose API + MCP integrations that allow an external agent to call them; this is the closest the closed products come to being composable.

---

## 7. Pricing reality (cheapest paid tier per competitor)

| # | Product | Cheapest paid tier (USD) | Notes |
|---|---------|--------------------------|-------|
| 1 | NotebookLM | $19.99/mo (Google One AI Premium bundle) | Bundled, not standalone |
| 2 | Perplexity | $20/mo Pro | Standard US pricing |
| 3 | ChatGPT Deep Research | $20/mo Plus (limited) / $200/mo Pro (maximum) | Deep-research quotas differ dramatically across tiers |
| 4 | Gemini Deep Research | ~$19.99/mo Gemini Advanced (regional variance) | Free tier exists with limited quota |
| 5 | Claude Research | $17/mo Pro (annual) or $20/mo (monthly) | $100/mo Max for 5x–20x usage |
| 6 | Elicit | $49/mo Pro | $169/mo Scale; Enterprise custom |
| 7 | Consensus | Individual Premium `unverified` (historically $9/mo, re-priced) | `unverified paid-tier claim` |
| 8 | SciSpace | Premium tier `unverified` | Pricing page is client-rendered; `unverified paid-tier claim` |
| 9 | You.com | Web Search API $5/1k; Research API from $12/1k; Finance $110/1k | Per-call, not per-seat |
| 10 | STORM | n/a — OSS | Operator pays LLM API costs |
| 11 | ResearchRabbit | $10/mo RR+ (US default) | Country parity for 100+ countries |
| 12 | Iris.ai | Custom (sales) | Enterprise only |

Cheapest paid-tier distribution:
- **$0–$25/mo band**: NotebookLM bundle, Perplexity Pro, ChatGPT Plus, Gemini Advanced, Claude Pro — the consumer-grade research assistants.
- **$25–$60/mo band**: ResearchRabbit RR+ ($10/mo), Elicit Pro ($49/mo) — academic and citation-graph work.
- **Enterprise / API-only**: You.com, Iris.ai — pay-as-you-go or custom contracts.

A consumer-facing top research product needs to fit in the $0–$25/mo band to compete with Perplexity Pro, ChatGPT Plus, Gemini Advanced, Claude Pro, and NotebookLM (bundle). For research_space, the cheapest paid price ceiling is $20/mo if competing on consumer.

---

## 8. User complaints cluster (categorized)

The complaints below are user-opinion aggregated from public reviews and platform coverage. They are **not product facts**.

### 8.1 Quota / cost surprises
- `(ChatGPT Deep Research, user-opinion)` Pro quota exhaustion on heavy days; users hit limits mid-project.
- `(Elicit, user-opinion)` Pro at $49/mo is steep for individual researchers without grant funding.
- `(You.com Finance API, user-opinion)` $110/1k calls surprises prototyping budgets.
- `(SciSpace, user-opinion)` Credit math is confusing; users run out mid-review.

### 8.2 Accuracy / hallucination concerns
- `(ChatGPT DR, user-opinion)` Reports can hallucinate specific URLs even when reasoning looks sound.
- `(Consensus, user-opinion)` Consensus Meter can mislead when papers disagree on definitions rather than findings.
- `(SciSpace, user-opinion)` AI Detector scores fluctuate between runs, frustrating originality checks.
- `(Iris.ai, user-opinion)` Marketing copy is slogan-heavy with limited independent benchmark evidence.

### 8.3 Privacy / legal / sourcing
- `(Perplexity, user-opinion + news)` Cloudflare and Wired alleged stealth crawlers bypassing robots.txt; legal actions from NYT, Dow Jones, Reddit, Yomiuri, Asahi, Nikkei, BBC.
- `(NotebookLM, user-opinion)` 2026 lawsuit alleges voice cloning in Audio Overviews.
- `(Claude / ChatGPT / Gemini, user-opinion)` Workspace connector opt-in is admin-controlled; friction for smaller orgs.

### 8.4 UX / output quality
- `(STORM, user-opinion)` Output quality depends heavily on chosen LLM and retriever.
- `(Elicit free tier, user-opinion)` Agent quota throttles before a single deep report completes.
- `(ResearchRabbit, user-opinion)` Seed limit (50 on free) is restrictive for systematic reviews.
- `(NotebookLM, user-opinion + academic critique)` Audio Overviews flatten content into a standardised format and may add culturally irrelevant content.

### 8.5 Coverage / corpus gaps
- `(Consensus / Elicit, user-opinion)` Coverage is peer-review-only; grey literature and preprints sometimes missing.
- `(ChatGPT DR / Gemini DR, user-opinion)` Both are web-wide and can pull low-quality sources unless the user restricts via Sites/Workspace filters.
- `(ResearchRabbit, user-opinion)` Citation-graph approach misses textual answers — needs pairing with Elicit or Consensus.

### 8.6 Cross-cutting themes (for the roadmap)
- **Quota transparency** is a recurring complaint. Any free tier should expose remaining quota clearly.
- **Citation provenance** matters more than citations themselves (users want sentence-level, not paragraph-level, anchoring).
- **Workspace data privacy** is a hard requirement for enterprise; opt-in by default is the wrong default.
- **Cross-source disagreement** should be visualized, not hidden — Consensus's "Meter" approach is the only mainstream attempt.
- **Open weights vs SaaS** — STORM is the only fully OSS option; many academic users prefer this for reproducibility.

---

## 9. Citations (numbered, URL + access date 2026-08-13)

1. Wikipedia — Gemini Notebook. https://en.wikipedia.org/wiki/Gemini_Notebook — accessed 2026-08-13.
2. 9to5Google — NotebookLM's Gemini 3.5 upgrade adds a cloud computer. https://9to5google.com/2025/12/19/notebooklm-gemini-3-data-tables/ (cited via Wikipedia ref 10) — accessed 2026-08-13.
3. Ars Technica — "Fake AI 'podcasters' are reviewing my book and it's freaking me out" by Kyle Orland (Sept 2024). https://arstechnica.com/ai/2024/09/fake-ai-podcasters-are-reviewing-my-book-and-its-freaking-me-out/ (cited via Wikipedia ref 4) — accessed 2026-08-13.
4. Wikipedia — Perplexity AI. https://en.wikipedia.org/wiki/Perplexity_AI — accessed 2026-08-13.
5. Perplexity Help Center / FAQ. https://www.perplexity.ai/hub/faq — accessed 2026-08-13.
6. OpenAI Help Center — Deep research in ChatGPT. https://help.openai.com/en/articles/10500283-deep-research-a-guide-for-using-o3-style-research-assistants — accessed 2026-08-13.
7. ChatGPT Pricing. https://openai.com/chatgpt/pricing/ — accessed 2026-08-13.
8. Gemini Deep Research overview (Google). https://gemini.google/overview/deep-research/ — accessed 2026-08-13.
9. Anthropic blog — Claude takes research to new places. https://claude.com/blog/research — accessed 2026-08-13.
10. Anthropic Pricing. https://www.anthropic.com/pricing — accessed 2026-08-13.
11. Elicit homepage. https://elicit.com/ — accessed 2026-08-13.
12. Elicit Pricing. https://elicit.com/pricing — accessed 2026-08-13.
13. Elicit Blog — Introducing Elicit Research Agent (Aug 4, 2026). https://blog.elicit.com/introducing-elicit-research-agent — accessed 2026-08-13.
14. Consensus homepage (with schema.org metadata). https://consensus.app/ — accessed 2026-08-13.
15. Consensus Pricing. https://consensus.app/pricing — accessed 2026-08-13.
16. SciSpace (formerly Typeset) Pricing. https://typeset.io/pricing — accessed 2026-08-13.
17. Wikipedia — You.com. https://en.wikipedia.org/wiki/You.com — accessed 2026-08-13.
18. You.com "About" page. https://about.you.com/ (cited via Wikipedia) — accessed 2026-08-13.
19. You.com API Pricing. https://you.com/pricing — accessed 2026-08-13.
20. STORM GitHub repository (MIT license). https://github.com/stanford-oval/storm — accessed 2026-08-13.
21. ResearchRabbit homepage. https://www.researchrabbit.ai/ — accessed 2026-08-13.
22. ResearchRabbit Pricing. https://www.researchrabbit.ai/pricing — accessed 2026-08-13.
23. Iris.ai homepage and RSpace product page. https://iris.ai/ and https://iris.ai/products/rspace — accessed 2026-08-13.

---

## 10. Self-critique (required by SKILL.md)

- **Did I do the job?** Yes for the angle-B brief — 12 products, 12-column matrix, capability clusters, free-tier comparison, OSS subtable, pricing table, user-complaint clustering, numbered citations.
- **What might I have missed?**
  - I could not directly verify the dollar amounts for **Consensus Premium** and **SciSpace Premium** because both pricing pages were client-rendered and the fetch returned headers/testimonials only. These are flagged `unverified paid-tier claim`.
  - Reddit and G2 fetches returned empty results in this session; user-opinion was therefore sourced from Wikipedia, product reviews quoted on official sites, and academic coverage (e.g. NotebookLM cultural critique). For richer user-opinion, future passes should pull Reddit via the API or a third-party Reddit scraper.
  - I did not independently benchmark the products (e.g. BioDecisionBench scores are from Elicit's blog). A separate accuracy/benchmark angle would be needed to validate the "best" claim.
  - I did not enumerate every regional pricing variant; only US-default figures are listed.
- **What did I assume without evidence?**
  - I treated the Wikipedia article for NotebookLM as the canonical history source and used 9to5Google and TechCrunch citations it embeds — appropriate, but it means the underlying primary sources were not directly read.
  - For You.com's consumer chat features I relied on the Wikipedia article because the current pricing page is now enterprise-only.
  - For ChatGPT Deep Research quotas I used OpenAI's own "Limited" vs "Yes" labels without independent quota verification per plan.
- **Bias check**: I tried to balance marketing-language removal (no "revolutionary", "game-changing", "cutting-edge") with the required structured detail. Pricing labels reflect what's publicly disclosed; "unverified paid-tier claim" is used wherever I couldn't independently confirm.

## 11. Metrics (required by SKILL.md)

- findings: 12 (one per product)
- risks_HIGH: 0
- risks_MEDIUM: 0
- risks_LOW: 0
- clarifying_Qs: 0

(Section 11 reflects this angle-file format — angle files do not carry the standalone risk/ambiguity structure that the canonical research template uses. The master merge document is where risks are consolidated.)

---

**Memory written:** none (this angle-file is a per-task deliverable; the durable cross-product insight belongs in the master synthesis).
**Return to master:** file at `share/notes/01_research_T-2026-08-13-002_angle-b-competitors.md`. Ready for merge into the canonical research + master synthesis.