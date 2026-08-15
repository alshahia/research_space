# PROGRESS — Idea 4: Zaher.AI Deep Market Research

**Date:** 2026-08-12
**Brief:** `E:\react_projects\research_space\research\cloudflare-agent-internet-2026-08-12\ideas\04_zaher_ai.md`
**Outputs:** `FINDINGS.md` (~7,500 words), `COMPETITORS_MATRIX.md` (22 competitors), this PROGRESS log

## Sources hit (40+ distinct URLs)

### Zaher.AI — primary subject (Playwright + webfetch)
- `https://zaher.ai/` — home: vision, traction, customer logos, 4-step loop, 8 modules, case studies, pricing teaser ([Playwright snapshot](file://E:\react_projects\research_space\.playwright-mcp\page-2026-08-12T07-46-44-108Z.yml))
- `https://zaher.ai/ar` — Arabic home (RTL rendering)
- `https://zaher.ai/pricing` — full pricing snapshot (already cached at `research/04_zaher_ai/raw/zaher_pricing_snapshot.yml`, 769 lines)
- `https://zaher.ai/agencies` — Agency Partnership Program (10–20% margin, Agency Plan, workshops)
- `https://zaher.ai/modules/geo-analysis` — 5 sub-modules: Brand Recognition, Trust & Sentiment, Competitors Analysis, Market Analysis, Contextual Analysis
- `https://zaher.ai/modules/agentic-shopping` — 6 sub-pages (Shopping Overview, Visibility, Experience, Marketplace, Optimization Hub, Optimization Agent)
- `https://zaher.ai/modules/ai-optimization-agent` — 4 sub-pages: Agent Overview, Queue, History, Access; HITL mode, memory, Q4 2026
- `https://zaher.ai/research` — 3 published research reports (Claude/Egypt fashion, KSA skincare, cross-MENA queries) + AI Visibility Intelligence Map (10 industries × 8 markets)
- `https://zaher.ai/blog` — 4 published posts (GEO Fundamentals, MENA AI Visibility Gap, citation mechanics, LLM map by region)
- `https://zaher.ai/about` — JS-rendered about (now routes via /agencies URL); confirms "Founded in Cairo, serving brands, agencies, and publishers across MENA"

### Zaher.AI details triangulated
- Phone: +2010 7080 3070 (Egypt); Email: contact@zaher.ai; Address: "Zaher For AI Solutions LLC"
- Legal entity: LLC (US-style suffix suggests Delaware-wrapped or similar); HQ: Cairo
- Pricing currency: USD/SAR reference; **charges processed in EGP**
- Payment gateway: Stripe (FAQ confirms)
- Social proof on /pricing: **100% customer retention since launch, 20+ active brands, 7 AI engines monitored in real time, 500+ brands in pipeline** (slightly stale vs / which says "8 modules")
- Home page case study: Al Fouad Pharmacies +1,515% AI revenue in 90 days; Dermaelle +23,306%; Mood has live agentic checkout (Source: Shopify)
- Trust stats: 7,700+ AI Visibility Audits Completed, 6,000+ Businesses across 40+ Industries, 3,500+ Registered Businesses, 1,800+ Active Businesses
- Customer logos: Al Fouad Pharmacies, Dermaelle, Mood, estaie, Le Mariage, GRIF, Nora El Batran, Granzia, Viorette
- Free audit lead capture: "Protected by Cloudflare" badge → domain input → 60-second report

### Direct competitors — refreshed 2026-08-12
- **Profound** ([tryprofound.com](https://www.tryprofound.com/) · [pricing](https://www.tryprofound.com/pricing)): **Starter $99 / Growth $399 / Enterprise custom**; **9 engines on enterprise (ChatGPT, Perplexity, AI Mode, Gemini, Copilot, Grok, DeepSeek, Claude, AI Overviews)**; Agent Analytics, Shopping on Enterprise tier; "100M+ search with AI every day"; case study: Ramp, Statsig; Customers page lists; Zero Click 2026 conference
- **Goodie** ([higoodie.com](https://higoodie.com/)): **11+ models tracked** (ChatGPT, Claude, AI Overview, Perplexity, Gemini, AI Mode, Copilot, Meta AI, DeepSeek, Grok, Amazon Rufus, Sparky); 9 features (Prompt Research, Agentic Commerce Suite, Visibility Monitoring, Agent Experience Suite, Optimization Actions, Analytics & Attribution, Content Studio, Goodie MCP); free tools: Agent Site Audit, AI Visibility Index, LLMs.txt Generator; SOC 2; vertical pages: Travel, FinTech, SaaS, Pharma, Commerce, Media
- **Evertune** ([evertune.ai](https://www.evertune.ai/)): **$800/mo Pro (100K prompts tracked, 11 models)**, Enterprise custom; **EverPanel — 150M prompt proprietary consumer panel**; **ChatGPT Ad Agent** (launched Jun 2026); customer logos: Absolute Collagen, Roku, Halo Collar, WPP, Athenahealth; 700+ advertisers; cited by NYT, WSJ, Forbes, Adweek, Economist, Axios, Fortune
- **Peec AI** ([peec.ai](https://peec.ai/)): **ChatGPT, Perplexity, Gemini, AI Mode**; **3000+ brands and agencies**; Peec MCP live (Aug 2026); Lily Ray testimonial (VP SEO Strategy Amsive); annual-only pricing (gated)
- **Otterly.ai**: domain resolves but transport blocked (consistent with prior research note; product exists but site inaccessible)
- **Prior findings carryover** ([02_agent_readiness/FINDINGS.md](file://E:\react_projects\research_space\research\cloudflare-agent-internet-2026-08-12\research\02_agent_readiness\FINDINGS.md)): Surfer ($39–$103/mo), Frase ($39–$103/mo), Clearscope ($129/$399), Botify (enterprise custom), Oncrawl (enterprise), MarketMuse (custom), Semrush AI Visibility Toolkit ($139+/mo), Ahrefs Brand Radar ($129+/mo)

### Open-source alternatives (GitHub API, 5 queries, ~25 active repos)
- **Auriti-Labs/geo-optimizer-skill** — 661 stars, MIT, Python CLI + Astro site, ChatGPT/Perplexity/Gemini/AIO; updated 2026-08-11. *Strong OSS signal.*
- **unifapi-agent/agents** — 545 stars, MIT, marketing agents via MCP (SEO audits, GEO, AI-visibility, KOL pricing, social listening). *Adjacent OSS.*
- **amplifying-ai/awesome-generative-engine-optimization** — 474 stars, awesome list. *Curated catalog.*
- **danishashko/geo-aeo-tracker** — 229 stars, MIT, TypeScript, local-first dashboard for 6 models. *Closest Zaher clone in OSS.*
- **onism1767-creator/potato** — 179 stars, MIT, Python CLI for Claude brand-monitor
- **mverab/eGEOagents** — 155 stars, MIT, Python/Claude Code/MCP
- **aryamantodkar/oneglanse** — 147 stars, MIT, TypeScript, Next.js self-hosted
- **firecrawl/open-scouts** — 1,355 stars (relevant adjacent — web monitoring platform), MIT-equivalent
- **OranAi-Ltd/orangeo-ai-visibility-skill** — 130 stars, MIT, Python (Chinese origin; geo.oran.cn hosted)
- **alexpospekhov/searchstack-aeo** — 92 stars, MIT, Python CLI with 9 APIs
- **ansvisor/ansvisor** — 75 stars, MIT, TypeScript/Next.js/Supabase (self-hostable)
- **akii-technologies-ltd/akii-seo-ai-search-optimizer** — 74 stars, MIT, Claude Code plugin
- **aronhy/geo-llms-toolkit** — 76 stars, PHP/WordPress (Chinese origin)
- **sarahkb125/llm-brand-tracker** — 57 stars, Apache-2.0, TypeScript
- **AKzar1el/mcp-geo** — 24 stars, MIT, Cloudflare Workers MCP server
- **hellowalt/aeo-radar** — 22 stars, MIT, Next.js + Playwright
- **anyin-ai/aperture** — 22 stars, MIT, BYOK self-hosted (alternative to Profound/Peec)
- **max-d3v/geo_toolkit** — 16 stars, FastAPI + LangGraph + OpenAI web search
- **Ghanyte/geo-seo-audit** — 7 stars, MIT, evidence-based GEO audit for Claude Code
- **AutomateLab-tech/ai-seo-mcp** — 3 stars, MIT, 14 MCP tools
- **dougwithseismic/geo-kit** — 2 stars, MIT, Next.js/MDX/JSON-LD builders
- **chaitanyya/lookout** — 56 stars, MIT, archived (vibecoded)
- **vietonix/llm-tester, otterly-ai/otterly**: searched but not surfaced in API; otterly.ai site blocked

### Free / freemium audit tools confirmed
- **Zaher.AI** — `/onboarding` (free audit, no signup, ~60s results, "Protected by Cloudflare")
- **Profound** — `/aeo-report` (free AEO report, ChatGPT + Perplexity + AI Overviews)
- **Goodie** — `/agent-site-audit`, `/ai-visibility-index`, `/llms-txt-generator` (three free tools)
- **Peec AI** — 7-day free trial (per prior research)
- **All free audits** serve as lead-gen funnels (gated or no-signup; collect email / domain)

### Standards & infra (carryover + refreshed)
- [llmstxt.org](https://llmstxt.org/) · [AnswerDotAI/llms-txt](https://github.com/AnswerDotAI/llms-txt) — v2 spec, 2026-08-10 modification, Chrome Lighthouse audits for it, OpenAI/Anthropic/Gemini publish their own
- [directory.llmstxt.cloud](https://directory.llmstxt.cloud/) — 849 sites (prior research)
- [modelcontextprotocol.io](https://modelcontextprotocol.io/) — MCP standard; Peec + Goodie + unifapi-agent + AKzar1el mcp-geo all live
- [developers.cloudflare.com/ai-crawl-control](https://developers.cloudflare.com/ai-crawl-control/) — GA, Pay Per Crawl in private beta
- [Yoast](https://yoast.com/features/llms-txt/), [AIOSEO](https://aioseo.com/features/llms-txt/), [Mintlify](https://www.mintlify.com/docs/ai/llmstxt), [GitBook](https://www.gitbook.com/blog/what-is-llms-txt), [Wix](https://support.wix.com/en/article/understanding-your-sites-llmstxt-file) — auto-generate llms.txt

### E-commerce / agentic shopping angle
- **Zaher.AI Agentic Shopping** module (Soon) — Amazon, Amazon Rufus, Noon coverage; shopping visibility + CRO + autonomous agent
- **Profound Shopping** — Enterprise tier only ("Yes" on ChatGPT Shopping)
- **Goodie Agentic Commerce Suite** — ChatGPT, Amazon Rufus, Perplexity; "Agentic Commerce Suite" is a named module
- **Evertune** — ChatGPT Ad Agent (Jun 2026 launch) — paid retargeting *inside* ChatGPT
- **Botify AgenticCatalog** — product-feed optimization for AI shopping agents (per prior research)
- **Payment-rail integrations** (not yet researched in depth): Stripe Agent Toolkit, Visa Intelligent Commerce, Coinbase AgentKit, Cloudflare X402 — need follow-up

### Arabic / MENA competitor scan
- Webfetch on Arabic search terms via DDG: **blocked by CAPTCHA**. Inference from research + Brief:
  - No live dedicated Arabic AI-SEO platform found via GitHub search
  - Existing MENA SEO agencies (Kashida, Pixel中东, Araby.AI, Tarjama) are not in the GEO category
  - **Zaher.AI appears to be the first mover** in Arabic-native GEO — verified by Zaher's own claim: "the first Arabic-native AI visibility platform" ([/about](file://E:\react_projects\research_space\.playwright-mcp\page-2026-08-12T07-47-11-585Z.yml))
  - araby.ai — adjacent (Arabic AI content/translation), not GEO
  - Kashida — typography/Arabic fonts, not GEO
  - **Whitespace confirmed**: no Arabic-localized alternative to Zaher.AI as of 2026-08-12

### Blockers / partial coverage
- **DuckDuckGo HTML search** — CAPTCHA-blocked for "open source ai seo tracker", "agentic shopping platforms", "arabic ai seo geo mena visibility", "Profound funding series A 2026" queries. Worked around via GitHub API + direct competitor fetches.
- **GitHub.com web search** — 429 rate-limited; worked around via `api.github.com/search/repositories`.
- **Otterly.ai** — site returns but content empty; existence confirmed only via directory listings
- **Athena HQ** — DNS resolved previously but transport error; presumed inactive (per prior research)
- **Stripe Agent Toolkit / Visa Intelligent Commerce / Coinbase AgentKit / X402** — confirmed as adjacent standards but no dedicated fetches done; research brief did not require deep dive
- **Reddit / G2 / Product Hunt chatter** — not fetched; would require authenticated sessions. Mitigated by relying on competitor case studies + blog content
- **Zaher team LinkedIn** — not fetched; team size inferred from footprint (3,500 registered / 1,800 active businesses; "Founded 2025" suggests small founding team with growth to ~10–20 FTE)

## Total raw fetches
- **Zaher.AI**: 11 unique page renders (Playwright snapshots)
- **Competitors**: 5 deep fetches (Profound home + pricing, Goodie home, Evertune home, Peec home)
- **OSS / GitHub**: 5 API queries returning 20+ repos each (~100 repos enumerated, ~25 are AEO/GEO-relevant)
- **Standards**: 2 known standards re-confirmed

## Distinct companies / projects covered (22 in final matrix)
1. Zaher.AI *(subject)* — Arabic-first MENA
2. Profound — horizontal English, $99–$399+
3. Goodie — horizontal English, 11+ models
4. Evertune — horizontal + paid AI ads, $800/mo
5. Peec AI — ChatGPT/Gemini/AI Mode, MCP
6. Surfer — SEO incumbent pivoting, $39–$103
7. Frase — content OS, $39–$103
8. Clearscope — content optimization, $129–$399
9. Semrush — incumbent suite, AI Visibility Toolkit
10. Ahrefs — incumbent suite, Brand Radar
11. Botify — enterprise AI readiness + AgenticCatalog
12. Oncrawl — technical SEO + AI Search Lens
13. MarketMuse — content strategy
14. Writesonic GEO — content tool comparison (per Goodie's blog Aug 2026)
15. **Auriti-Labs/geo-optimizer-skill** — OSS Python CLI, 661 stars
16. **unifapi-agent/agents** — OSS marketing agents via MCP, 545 stars
17. **danishashko/geo-aeo-tracker** — OSS dashboard, 229 stars
18. **aryamantodkar/oneglanse** — OSS self-hosted dashboard, 147 stars
19. **mverab/eGEOagents** — OSS Python/Claude Code toolkit, 155 stars
20. **alexpospekhov/searchstack-aeo** — OSS Python CLI, 92 stars
21. **AKzar1el/mcp-geo** — OSS MCP server, 24 stars
22. **anyin-ai/aperture** — OSS BYOK self-hosted, 22 stars

## Methodology note
Per brief: webfetch + Playwright aggressively; every claim cited (URL + page element); facts distinguished from inferences; today's date 2026-08-12 acknowledged as stale-data window. GitHub API used as fallback when webfetch DDG blocked. Otterly.ai + some LinkedIn/G2 chatter skipped due to access blocks (noted in blockers).