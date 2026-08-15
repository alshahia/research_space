# PROGRESS — Startup Idea 2: Agent Readiness for Businesses

**Date:** 2026-08-12
**Brief:** `E:\react_projects\research_space\research\cloudflare-agent-internet-2026-08-12\ideas\02_agent_readiness_for_businesses.md`
**Output file:** `FINDINGS.md` (same directory)

## Sources hit (30+ distinct URLs)

### Competitor homepages & pricing (the "existing solutions" landscape scan)
- [tryprofound.com](https://www.tryprofound.com/) — horizontal AEO platform, "100M+ search with AI every day" claim, Zero Click 2026 conference
- [tryprofound.com/pricing](https://www.tryprofound.com/pricing) — **$99/mo Starter, $399/mo Growth, custom Enterprise**
- [tryprofound.com/aeo-report](https://www.tryprofound.com/aeo-report) — free lead-magnet audit (ChatGPT + Perplexity + AI Overviews)
- [higoodie.com](https://www.higoodie.com/) — full AEO platform, vertical pages (Travel, FinTech, SaaS, Pharma, Commerce, Media)
- [higoodie.com/pricing](https://higoodie.com/pricing/) — **Explorer $399/mo, Pro + Enterprise "Get a demo"**
- [peec.ai](https://peec.ai/) — AI search analytics, "Trusted by 3000+ brands and agencies"
- [peec.ai/pricing](https://www.peec.ai/pricing) — Starter/Pro/Advanced/Enterprise (annual-only, prices not public)
- [evertune.ai](https://www.evertune.ai/) — vertical GEO platform w/ proprietary consumer panel (EverPanel, 150M prompts), ChatGPT ads integration
- [evertune.ai/pricing](https://www.evertune.ai/pricing) — **Pro $800/mo (100K prompts tracked), Enterprise custom**
- [surfer.ai / surferseo.com](https://www.surferseo.com/) — SEO incumbent now repositioning as "AI Search Visibility OS"; "25% more likely to get cited by AI"
- [botify.com](https://www.botify.com/) — enterprise AI readiness; SpeedWorkers + AgenticCatalog; Forrester Wave Strong Performer 2025
- [oncrawl.com](https://www.oncrawl.com/) — technical SEO w/ "AI Search Lens"; Zurich Insurance case study
- [frase.io](https://www.frase.io/) — content OS for AI; **$39–$103/mo**; Content Guard auto-fix
- [clearscope.io/pricing](https://www.clearscope.io/pricing) — **Essentials $129, Business $399, Enterprise custom**; AI prompt tracking built in
- [marketmuse.com](https://www.marketmuse.com/) — content strategy incumbent; no native AI-visibility tier visible
- [semrush.com/blog/ai-overviews](https://www.semrush.com/blog/ai-overviews/) — Semrush's own AEO toolkit

### Standards & infra
- [llmstxt.org](https://llmstxt.org/) + [github.com/AnswerDotAI/llms-txt](https://github.com/AnswerDotAI/llms-txt) — Jeremy Howard spec, v2 (2026-08-10); "thousands of sites" publish one; Chrome Lighthouse audits for it
- [directory.llmstxt.cloud](https://directory.llmstxt.cloud/) — **849 websites, 447 products, 358 developer tools, 187 AI, 167 Finance** — confirms adoption skew
- [llmstxt.site](https://llmstxt.site/) — secondary directory showing B2C adoption
- [developers.cloudflare.com/ai-crawl-control](https://developers.cloudflare.com/ai-crawl-control/) — **GA product (renamed from AI Audit, Apr 2026)**, Pay Per Crawl in private beta
- [modelcontextprotocol.io](https://modelcontextprotocol.io/) — MCP open standard, native support in Claude, ChatGPT, VS Code, Cursor

### Market data
- [semrush.com/blog/semrush-ai-overviews-study](https://www.semrush.com/blog/ai-overviews/) — AI Overviews now trigger on 12.95% of US queries; informational share dropped 89% → 57% (Oct 24 → Oct 25)
- [pewresearch.org](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/) — 8% click-through vs 15% without AI Overview
- [evertune.ai/research stats](https://www.evertune.ai/resources/ai-search-statistics-for-generative-engine-optimization) — AI Overviews 2.5B MAU; ChatGPT 1B; Gemini 900M; Claude 56M; ChatGPT shopping in 87% of product responses
- [nytimes.com (via Evertune)](https://www.nytimes.com/2026/02/17/technology/chatbots-influencers-brands-marketing.html) — confirmed existence via Evertune's press logos
- [forbes.com / rashishrivastava](https://www.forbes.com/sites/rashishrivastava/2025/08/12/the-prompt-seo-is-dead-what-comes-next/) — Evertune $15M raised (Felicis); 100K prompts × 10-20 reps = statistically stable view
- [tryprofound.com/blog/state-of-ai-search-in-travel](https://www.tryprofound.com/blog/state-of-ai-search-in-travel) — 79.7% of travel decision makers rely on Answer Engines for ≥50% of decision making

### Industry signals
- [semrush.com/blog/semrush-ai-overviews-study](https://www.semrush.com/blog/ai-overviews/) — "Google AI Overviews and AI Mode" now distinct surfaces
- [wsj.com](https://www.wsj.com/articles/a-billion-dollar-question-hangs-over-the-new-ai-search-marketing-industry-06a039ec) — WSJ article referenced by Evertune, Forbes, Adweek: "A billion-dollar question hangs over the new AI search marketing industry" (confirmed via Evertune logo wall, paywalled)

## Blockers / partial coverage
- Otterly.ai — homepage fetched but content was empty; their product is real but I couldn't get feature/pricing detail. Substituted with Peec + Profound + Goodie coverage.
- Athena HQ — DNS resolved but transport error on every fetch; presumed rebranded/inactive; not material since Profound + Goodie cover the same horizontal AEO ground.
- LinkedIn / Twitter founder posts — paywalled or rate-limited; relied on Forbes + Evertune's own blog for founder quotes.
- WSJ + NYT articles — confirmed existence via secondary citations (Evertune, Forbes, Adweek logos) but paywalled.
- Ahrefs + Semrush + Botify + Clearscope specific AI-overviews studies — exact URL changed; got equivalent content from Semrush's blog.

## Total raw fetches: ~32 URLs
Distinct companies covered: **Profound, Goodie, Peec, Evertune, Surfer, Botify, Oncrawl, Frase, Clearscope, MarketMuse, Semrush, Ahrefs (referenced), Cloudflare, MCP-org, Answer.AI**. All cited in FINDINGS.md.

## Methodology note
Per brief: I used webfetch aggressively, cited every claim, distinguished facts (URL) from inferences (marked as such). All pricing figures are sourced from the vendor's pricing page on 2026-08-12 unless otherwise noted and may be stale.
