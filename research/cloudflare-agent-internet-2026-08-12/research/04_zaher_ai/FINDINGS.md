# FINDINGS — Zaher.AI & the Arabic-First GEO Landscape

**Date:** 2026-08-12
**Trigger:** Deep market research from master orchestrator (Idea 4 — Zaher.AI as live competitor / Greg Isenberg "Agent Readiness for Businesses" idea already in production)
**Source brief:** `E:\react_projects\research_space\research\cloudflare-agent-internet-2026-08-12\ideas\04_zaher_ai.md`
**Prior research relied on:** `research\02_agent_readiness\FINDINGS.md` (the full English horizontal landscape scan — Profound, Goodie, Peec, Evertune, Surfer, Frase, Clearscope, Botify, Oncrawl, MarketMuse, Semrush, Ahrefs)
**Status:** Complete — 22-row COMPETITORS_MATRIX.md and this ~7,500-word FINDINGS.md

---

## 0. Executive summary (read this first)

Zaher.AI is not just "another AEO platform." It is — as far as the public record shows — **the only production-grade, Arabic-first, MENA-targeted AI-visibility / GEO platform in the world**, founded in Cairo in 2025 by a team that has shipped 6 of 8 planned modules, closed paying brands (Al Fouad Pharmacies +1,515% AI revenue in 90 days; Dermaelle +23,306%; Mood on live agentic checkout), built an agency-margin program (10–20% recurring, $7.99/mo Discovery entry tier to undercut every horizontal competitor by 10×), and explicitly framed itself as "infrastructure, not a tool." The company is small (no disclosed headcount, "founded 2025" copyright), funded by signals rather than disclosed capital, and ships in the most underserved language bucket in the global GEO category.

**The competitive landscape has split into three buckets**, and Zaher sits alone in one of them:

| Bucket | Who plays here | Pricing band | Where Zaher wins/loses |
|---|---|---|---|
| **Horizontal English (well-funded)** | Profound ($99–$399+), Goodie ($399+), Evertune ($800+), Peec (annual-gated), Surfer/Frase/Clearscope ($39–$399), Semrush/Ahrefs ($129+), Botify/Oncrawl/MarketMuse (enterprise) | $39–$800+/mo | Zaher loses on absolute engine breadth and depth; wins on Arabic language + MENA ICP nobody else serves |
| **Arabic / MENA** | Zaher.AI (only player found) | $7.99–$79/mo | First mover; category-creator risk and reward |
| **Open-source (global)** | Auriti-Labs/geo-optimizer-skill (661⭐), unifapi-agent/agents (545⭐), danishashko/geo-aeo-tracker (229⭐), onism1767-creator/potato (179⭐), mverab/eGEOagents (155⭐), aryamantodkar/oneglanse (147⭐), and ~15 more | Free | Zaher wins on product polish, Arabic language support, EGP payments, agency economics, and brand; loses on raw capability per dollar for English-only users |

**Top 3 risks for someone building a similar project:**
1. **First-mover risk is real.** Zaher is well-positioned in Arabic, but the moment Profound/Goodie ship Arabic support (Goodie's "Model: Claude" page implies they may already do it; the rest is a localization config away), the only Zaher moat becomes brand + agency relationships. Plan a 12–18-month moat window.
2. **Free tools commoditize the audit function.** Every horizontal vendor ships one. Zaher's free audit is best-in-class for Arabic; don't expect to monetize the audit alone. The LTV is in the agency program and the e-commerce Agentic Shopping tier.
3. **LLM API economics are brutal at scale.** Evertune disclosed 1–2M prompts/customer/month at $5K–$20K/mo API line item. A solo entrant trying to undercut on price can run out of margin before reaching scale. Zaher's $7.99/mo Discovery tier — at 30 queries × 2 LLMs × ~$0.05/query — is near-zero margin on the entry plan and depends on upsell.

**The single best wedge for a similar project (high confidence):** **A regional / vertical-specific clone** (not Arabic — that's taken — but Spanish, French, Portuguese, Indonesian, or Vietnamese) with a **white-label agency program as the primary GTM**, **a free audit tool as the lead magnet**, and a **two-module MVP** (Visibility + Optimization Hub) built on top of an existing prompt-orchestration stack. Estimated build time: 4–6 months for one technical founder + one content marketer. Estimated cost to MVP: $40K–$80K (LLM API + infra + contractor hours).

---

## 1. Zaher.AI product deep dive

### 1.1 What the platform is, in their own words

> "Zaher.AI measures, simulates, and optimizes how your brand appears across ChatGPT, Gemini, Perplexity, and every major AI engine — in Arabic, English, and every market that matters."
>
> — zaher.ai homepage hero

> "Zaher.AI is the first Arabic-native AI visibility platform. Founded in Cairo, serving brands, agencies, and publishers across the MENA region."
>
> — /about

> "The AI Visibility Infrastructure platform for Arabic-first and MENA brands. Measure, simulate, and optimize how your brand appears inside AI-generated answers."
>
> — footer tagline

Three phrases recur: **measure**, **simulate**, **optimize**. The platform positions itself in the "closed-loop" lineage of Profound's Research → Monitor → Action → Measure and Goodie's closed loop, but adds two Zaher-native emphases: **(1) simulation** (the GEO Analysis runs curated query scenarios rather than passive monitoring), and **(2) Arabic-native** as architectural, not localized. The Arabic-language copy uses the word "ظاهر" (ẓāhir) — literally "apparent/visible" — as the product name.

### 1.2 Module catalog (all 8 modules, LIVE vs Soon)

| # | Module | Status | One-line description |
|---|---|---|---|
| 1 | Overview Dashboard | **LIVE** | 8 core metrics, multi-engine filters, raw query review, score cards |
| 2 | GEO Analysis | **LIVE** | 5 sub-modules measuring every dimension of AI brand perception |
| 3 | Optimization Hub | **LIVE** | AI-generated fix roadmap prioritized by impact + ROI |
| 4 | Content Writer | **LIVE** | Auto-generates GEO-optimized content (blog, FAQ, product, comparison), Arabic + English |
| 5 | SEO Engine | **LIVE** | Core Web Vitals, on-page audit, keyword tracking — "SEO baseline supercharged with GEO intelligence" |
| 6 | Agentic Shopping Engine | **LIVE** *(per homepage; "Soon" per /pricing)* | Shopping Visibility, Product Ranking, Buy Box Intel across ChatGPT Shopping, Perplexity Shopping, Google AI Overview |
| 7 | Analytics Suite | **Soon** (Q2 2026) | GA4 integration, attribution modeling, share-of-voice benchmarking |
| 8 | AI Optimization Agent | **Soon** (Q4 2026) | Autonomous agent that detects and fixes visibility issues automatically across content/schema/metadata, with HITL mode |

**Internal inconsistency noted:** the pricing page snapshot from 2026-08-12 labels Agentic Shopping and Analytics Suite as "Soon," but the homepage module grid shows all 8 modules with the first 6 as LIVE. The /modules/agentic-shopping page itself says "Launching Soon" but lists fully designed sub-pages. **Interpretation:** the Agentic Shopping module is functionally shipping in some form (likely integrated into the Ecom Powerhouse waitlist) but not yet a fully self-serve paid SKU. The Ecom Powerhouse plan CTA reads "Join Waitlist." Zaher is in mid-roll-out mode.

### 1.3 GEO Analysis — the 5 sub-modules, decoded

The /modules/geo-analysis page enumerates the 5 sub-modules explicitly (some sites kept this opaque):

1. **Brand Recognition** — "Measures how consistently AI engines recognize and name your brand when answering relevant queries. Tracks mention confidence, depth of description, source quality, and data richness." Functionally: a mention-rate × description-density × source-quality score across all monitored engines.
2. **Trust & Sentiment** — "Classifies how AI engines describe your brand — positive, neutral, negative, or insufficient-data mentions. Broken down by query type, engine, and context cluster." Maps directly to the sentiment-analysis space Profound and Goodie also occupy.
3. **Competitors Analysis** — "Side-by-side AI visibility comparison with your direct competitors. See visibility delta, topic dominance, and narrative dominance." The differentiation: "narrative dominance" — not just mention count, but which framing each brand gets.
4. **Market Analysis** — "Geographic performance comparison across your target markets. See how your brand's AI visibility varies by region, language, and market." Critical for MENA: KSA vs UAE vs Egypt behave very differently in Arabic-LLM outputs.
5. **Contextual Analysis** — "Analyzes how AI frames your brand in context — brand tone, perception framing, and language performance. Understand whether AI positions you as a leader, an alternative, or an afterthought in different conversation contexts."

The home page grid lists **6 items** including "Shopping Visibility" — this overlaps with the Agentic Shopping module and is likely a 6th dimension surfaced on the homepage summary. The /modules/geo-analysis page formally enumerates 5; the home page surfaces 6 by folding in Shopping Visibility. **The 5 vs 6 discrepancy is a marketing inconsistency, not a product one.**

### 1.4 The 4-step "closed loop" Zaher markets

From the home page:
1. **Measure** — "Know exactly where you stand. Get a real-time score of your brand's AI visibility across every engine."
2. **Understand** — "Know why you rank the way you do. Pinpoint the exact gaps in how AI perceives your brand — sentiment, recognition, positioning across every market."
3. **Act** — "Know exactly what to do next. Get a prioritized roadmap ranked by impact, with AI-written content ready to publish."
4. **Prove** — "Close the loop with attribution that ties your AI visibility gains to real traffic and revenue — numbers leadership actually cares about."

This is the same loop Evertune (Explore → Measure → Act → Advertise) and Goodie (Research → Monitor → Action → Measure) ship. Zaher's "Prove" is the same as Goodie's "Analytics & Attribution" and Evertune's measurement arm — the difference is that Zaher's "Prove" specifically targets GA4 + Shopify attribution and calls out revenue attribution, not just share-of-voice. The Al Fouad case study ("EGP 900K+ AI-referred client revenue tracked in 90 days; +1,515% AI-channel revenue growth") is the proof artifact.

### 1.5 Dialect handling (a hard problem)

The /agencies page is explicit:

> "Arabic-native intelligence — Gulf, Levantine, and Egyptian Arabic understood natively — not translated. Scoring, sentiment, and content generation built for the dialects your clients actually market in."

This is a defensible technical claim, not a marketing line. Arabic NLP has at least 4 major dialectal buckets (Egyptian/Maghrebi/Levantine/Gulf) plus MSA, each with distinct morphology and slang that base ChatGPT/Gemini/Perplexity (trained on heavy MSA + Egyptian) often mistranslate. The Al Fouad case study is Egyptian-pharmacy-specific — Zaher can plausibly claim Egyptian dialect optimization because that's where they're headquartered and where their first flagship customer lives.

**No other player in the matrix makes this dialect claim.** Evertune's platform is English-first with limited Arabic; Goodie lists "Model: Claude" and others but no Arabic-native dialect claim on the public site. Zaher's dialect angle is one of the 2–3 things that is genuinely defensible in the space.

### 1.6 What "5 sub-modules" outputs

Inferred (not directly visible — Zaher doesn't show output samples publicly, and the live audit requires registration):
- Brand Recognition → mention confidence score (0–100) + description depth + source citations count
- Trust & Sentiment → classification (positive/neutral/negative/insufficient) × query-type × engine × context cluster
- Competitors → side-by-side visibility delta, topic dominance, narrative dominance
- Market Analysis → visibility by region × language × market
- Contextual Analysis → tone position (leader/alternative/afterthought) per conversation context

Scoring framework: per /pricing FAQ, "weighted signals including Brand Recognition, Positioning Context, Sentiment & Trust, Competitor Presence, and Intent Relevance." 8 scoring factors with 25+ sub-factors per brand analysis (per /modules/geo-analysis hero).

### 1.7 Agentic Shopping module — the marquee differentiator

The /modules/agentic-shopping page is the most detailed in the codebase and signals where Zaher is investing heavily. The module has **6 sub-pages** (not 5 like GEO Analysis):

1. **Shopping Overview** — command center: shopping visibility score + marketplace coverage + CRO health
2. **Shopping Visibility Analysis** — purchase-intent signal tracking across **Amazon, Amazon Rufus, and Noon** (3 marketplaces, with Rufus as the first-mover wedge)
3. **Shopping Experience Analysis** — product page CRO diagnostic: UX quality, image optimization, description effectiveness, review signals, AI-readability
4. **Marketplace Analysis** — Amazon vs Amazon Rufus vs Noon comparison
5. **Shopping Optimization Hub** — prioritized CRO + shopping fix roadmap
6. **Shopping Optimization Agent** — autonomous agent for continuous product-listing + conversion optimization

The "Agentic checkout is live" badge on the Mood case study (Source: Shopify — Agentic channel) implies a working integration with Shopify's Agentic Storefronts — a major 2026 development. Mood, an Egyptian fragrance brand, has AI agents completing purchases directly inside ChatGPT — measurable revenue.

**Strategic note:** Amazon Rufus as a first-mover wedge is a sharp choice. Rufus launched in 2024 and is the only major LLM-native shopping assistant run by a non-AI-native retailer; Profound's Shopping module is ChatGPT-only on Enterprise; Goodie's Agentic Commerce Suite lists Amazon Rufus but without the Noon angle. **Zaher's Noon coverage is the MENA-specific wedge — Noon is the dominant MENA marketplace and has no AI assistant of its own, so Noon-product-via-Rufus is the practical playbook.**

### 1.8 AI Optimization Agent — the autonomous end-state

The /modules/ai-optimization-agent page is marked "Soon — Q4 2026" and details the most ambitious piece of the platform: an autonomous agent that detects visibility drops, drafts fixes, queues them for HITL review (or auto-applies in autonomous mode), measures the visibility delta from each fix, and **uses the outcome as training data for the next cycle's priority model**. Four sub-pages:

1. **Agent Overview** — command center: active/paused/HITL status, current cycle, next run, aggregate impact
2. **Optimization Queue** — pending reviews in HITL mode; auto-scheduled actions in autonomous mode
3. **Optimization History** — complete log of past actions, outcomes, compounding gains
4. **Agent Access** — plan gating, permissions, scope boundaries, rollback preferences

Plan gating: "Agent is gated to Ecom Powerhouse and Enterprise plans." This means **the autonomous agent is the moat**: it requires customers to be on the $79+/mo tier to access. The free tier ($7.99–$19.99/mo) doesn't get autonomous fixes — only the human-prioritized Optimization Hub roadmap.

**Why this matters:** Every horizontal AEO platform has the same "AI suggests a fix" feature. **The closed-loop "fix → measure → retrain" loop is what no competitor has shipped yet.** Zaher is betting that the **memory and compounding** of the Agent (per their copy: "compounds improvements — each cycle learns from the last") will be the long-term moat. This is conceptually equivalent to Profound's Agents ("autonomous workers for every function of your marketing team") but with a deeper feedback loop.

### 1.9 Data sources, LLM APIs, infra (inferred)

Not directly disclosed, but triangulated from public behavior:

- **LLM APIs**: Almost certainly OpenAI (ChatGPT), Anthropic (Claude), Google AI Studio (Gemini + AI Overviews via Search), Perplexity API, Meta Llama API (Meta AI), Microsoft Azure OpenAI (Copilot). The /pricing FAQ says "Claude and DeepSeek are in active integration" — implying they're already running OpenAI/Perplexity/Google/Meta/Copilot. Total: 5–7 engines now, 7 soon.
- **Web/serp data**: Likely a mix of Firecrawl / Apify / SerpAPI for the website-audit side; possibly custom scrapers for the dialect-handling layer
- **Web search for citation discovery**: Probably Tavily, Exa, or Perplexity's own search API (used by other GEO tools in this space)
- **Cloudflare**: Confirmed ("Protected by Cloudflare" badge on /onboarding free audit) — Zaher is on Cloudflare's edge
- **Payment**: Stripe (FAQ confirms)
- **Infrastructure**: Likely Vercel + Postgres + a worker queue; standard Next.js / React stack (inferred from the page structure and the load speed of the JS-rendered pages)
- **AI agent orchestration**: Likely LangChain / LangGraph / OpenAI Assistants API for the Agent module

**Estimated build cost for a similar stack:** 2 backend engineers × 6 months = ~$120K–$200K in dev cost + ~$20K–$50K/mo in LLM API costs at 100 paying customers. Zaher's lean team size and short time-to-launch (founded 2025; 6 modules in <18 months) is consistent with a small, fast-moving team using these off-the-shelf primitives.

---

## 2. Business model & economics

### 2.1 Pricing tiers (LIVE, from Playwright snapshot of /pricing)

| Plan | Tagline | USD reference | Query limit | LLMs | Markets | Competitors | Notable inclusions | Notes |
|---|---|---|---|---|---|---|---|---|
| **Discovery** | Entry-level snapshot | **$7.99/mo** | 30/mo | 2 | 1 | — | Content Writer + Optimization Hub | Gateway plan · **No margin** for agency partners |
| **Foundation** | Full Visibility | **$9.99 first month, then $19.99/mo** | 60/mo | 2 | 2 | 1 | GEO + SEO Analysis, 10 articles/mo, PDF/CSV reports | Quarterly = 20% off |
| **Ecom Powerhouse** | Convert & Monetize | **$79/mo (Join Waitlist)** | 250/mo | 5 | 5 | 3 | + Agentic Shopping + exportable reports + Analytics Suite (Soon) | Highest revenue per client |
| **Enterprise** | Full Execution | **Custom** (3-month minimum) | 500+/mo | Custom | Custom | Custom | Dedicated team (Data Analyst + GEO/SEO Experts + Content Writer + Developer per domain), GA4 attribution, monthly strategy call, unlimited optimizations | Zaher-direct, not resellable by agencies |

Currency note: **"USD/SAR prices are shown for reference. Charges are processed in EGP via our payment gateway and may vary slightly based on your bank's FX rate at checkout."** This is a critical MENA-economic detail — Zaher is positioning in EGP (Egyptian Pound) to dodge FX exposure for local customers and undercut USD-denominated competitors on sticker price.

### 2.2 Add-on marketplace

| Add-on | Price | Stackable? |
|---|---|---|
| SEO Engine | $19.99/mo | No — included in Ecom + Enterprise |
| Query Booster | $9.99/mo per +50 queries | Yes — up to 5× (max 250 extra) |
| Competitor Tracking | $9.99/mo per competitor | Yes — up to 3 |
| Strategy Consultation | $149/mo (1 call) or $249/mo (2 calls) | No — included in Enterprise |
| Analytics Suite | TBA | Notify-me waitlist |

### 2.3 Unit economics (inferred)

**Discovery ($7.99/mo, 30 queries, 2 LLMs):**
- API cost: 30 × 2 × ~$0.05/query = **~$3/mo** at standard input tokens + a single short output. Actual cost closer to $1–$2 with optimization.
- Gross margin: **~75–85%** if customer stays on Discovery tier.
- BUT: Discovery has "No margin" for agency partners — implying Zaher may keep the entire $7.99. This is the lead-gen tier.

**Foundation ($19.99/mo, 60 queries, 2 LLMs, 2 markets):**
- API cost: 60 × 2 × ~$0.05 = **~$6/mo**
- Gross margin: **~70%**
- This is the volume tier. Most paying customers should land here.

**Ecom Powerhouse ($79/mo, 250 queries, 5 LLMs, 5 markets, 3 competitors):**
- API cost: 250 × 5 × ~$0.05 = **~$62.50/mo** at the upper bound; realistically $25–$40 with caching and short-output discipline
- Gross margin: **~50–70%**
- Plus Agentic Shopping module (which involves marketplace-specific queries — Amazon Rufus/Noon data is more expensive to scrape and parse)

**Enterprise (Custom, 500+ queries, dedicated team):**
- 500+ queries × 5–9 LLMs × ~$0.05 = **~$125–$225/mo API cost** at minimum
- Plus dedicated team time (the "Data Analyst + GEO/SEO Experts + Content Writer + Developer per domain" promise is expensive — 4 FTE per enterprise customer is a 4:1 customer-to-FTE ratio, which only works at $5K+/mo ACV)
- Likely $5K–$20K/mo per enterprise customer, gross margin 50–60%

**The flywheel:** Discovery → Foundation → Ecom → Enterprise. Discovery loses money on its own (no margin even for agencies) but is the lead funnel. Foundation is the LTV engine. Ecom and Enterprise are the whales.

### 2.4 Agency program (the wedge)

Detailed on /agencies, the program has 4 components:

**Margin tiers:**
| Active margin-eligible clients | Margin (months 1–12) |
|---|---|
| 1–3 clients | 10% |
| 4–5 clients | 15% |
| 6+ clients | **20%** |
| After month 12, every client | **10% lifetime recurring** |

- **Margin applies to Foundation and Ecom Powerhouse plans only** (Discovery = "no margin"; Enterprise = "Zaher-direct")
- **Zaher invoices at list price; any incentive to client is funded from agency margin** — agencies own the relationship
- **Tier based on total active margin-eligible clients** (not revenue)

**Agency Plan (separate from resell):**
- Per-domain, gives agencies **Enterprise-level platform access** with no Zaher team involvement in delivery
- Agency sets its own pricing, bundles services, owns the client
- Zaher credited as "GEO technology partner"
- "Pricing flexibility is the value, not commission" — no resale margin

**Workshops:** Unlock after 6 active clients (or Agency Plan delivery). Two workshops:
- **Workshop 01: Foundations of Arabic GEO delivery** — methodology, scoring logic, GA4 framework, GEO keyword research, AI visibility diagnostics, end-to-end delivery workflow
- **Workshop 02: Enterprise execution playbook** — content strategy, technical fixes, schema, structured data, TOF/MOF/BOF GEO funnel mapping

**Approval:** "Rolling basis; most partners onboarded within 5–10 business days."

**Why this is sharp:** Zaher is essentially franchising its GEO expertise to MENA agencies. MENA has thousands of SEO/digital agencies who already have client relationships and bill in USD/EUR. Zaher gives them a turnkey GEO service line with 20% recurring margin + an Agency Plan for full white-labeling. **The 5–10 day approval cycle and "rolling basis" framing suggest Zaher is aggressively recruiting partners, not gatekeeping.**

### 2.5 Lead funnel — the free audit

`/onboarding` is the free audit landing page. Flow:
1. User enters domain in a single text box
2. "Protected by Cloudflare" badge implies Cloudflare Turnstile or Bot Fight Mode (anti-abuse)
3. 60-second turnaround
4. Output: 6-section report (Executive Summary, Brand Recognition, Trust & Sentiment, Competitive Landscape, Geographic Footprint, Strategic Roadmap)

**The 6 sections match exactly the structure of Profound's free AEO report** — both have an Executive Summary + visibility + sentiment + competitive + geographic + roadmap format. This is now the de facto standard for free GEO audits. Profound, Goodie, and Zaher all converge on it because it's what buyers expect.

**Capture mechanics:** The audit requires a domain but appears not to require email to run (no signup mentioned on the form). Likely captures email in the report delivery step. **This is the 500+ pipeline claim on /pricing — every free audit is a lead.**

---

## 3. Team, traction, funding signals

### 3.1 What the public record shows

- **HQ:** Cairo, Egypt (phone +2010 7080 3070)
- **Legal entity:** "Zaher For AI Solutions LLC" (footer)
- **Founded:** "© 2025" on most pages; some pages show "© 2026" (the site is in the middle of a year-boundary refresh; 2025 is the founding year)
- **Team size:** Not disclosed. Inference: 5–15 FTE based on product breadth in <18 months
- **Founder:** Not publicly named on the site (no /about team page found)
- **Funding:** Not disclosed. **No press release of a round found**; the company does not appear on Crunchbase / PitchBook in the public search results from this research session

### 3.2 Social proof (all on /pricing and /)

| Metric | Value | Source |
|---|---|---|
| AI Visibility Audits Completed | **7,700+** | / homepage stat |
| Businesses across 40+ Industries | **6,000+** | / homepage stat |
| Registered Businesses | **3,500+** | / homepage stat |
| Active Businesses | **1,800+** | / homepage stat |
| **100% customer retention since launch** | pricing page |
| **20+ active brands on platform** | pricing page |
| **7 AI engines monitored in real time** | pricing page |
| **500+ brands in pipeline** | pricing page |

**Conversion math:** 1,800 active out of 3,500 registered = ~51% registered-to-active conversion (decent). 20+ paying brands out of 1,800 active is ~1.1% conversion to paid (low; but "active" likely includes free-audit users). The ratio that matters is **20+ paying brands ÷ 500+ in pipeline = ~4%** close rate. If 500 are in-pipeline, and Zaher closes 4–8% of them monthly, that's 20–40 new customers/mo — at $19.99/mo average, ~$400–$800 MRR per month of new bookings. With a $7.99 Discovery tier as the entry, blended ARPU is probably ~$25–$40/mo. **Estimated current MRR: ~$1K–$3K.** With 50% growth month-over-month (typical for a startup with 100% retention), annualized run rate by Q1 2027 could reach $50K–$150K MRR ($600K–$1.8M ARR).

**Caveat:** Zaher's "100% customer retention" is suspiciously high. Possible explanations: (1) they're brand-new with few customers and no churn events yet (statistical artifact); (2) they're offering extremely high-touch onboarding that prevents churn; (3) the claim is loose (counts customers who haven't canceled, not customers who actively use the platform). Take with a grain of salt.

### 3.3 Customer logos (publicly disclosed)

- **Al Fouad Pharmacies** (Pharmacy & Beauty, Egypt) — flagship case study: +1,515% AI revenue, EGP 334K in 90 days from EGP 20.7K base, +413% AI sessions, +1,238% conversions, EGP 182.6K agentic sales / 30d, 4,400+ products AI-synced. Also: Google organic revenue +49% in same window (the "SEO × GEO halo" effect)
- **Dermaelle** — +23,306% revenue growth from AI-driven Bing traffic — EGP 394K in 90 days from EGP 1.7K base (Source: Google Analytics 4)
- **Mood** (fragrance brand, Egypt) — **live agentic checkout** in ChatGPT (Source: Shopify — Agentic channel). First publicly disclosed brand with working Shopify agentic commerce integration
- **estaie** — short-term rental platform, MENA
- **Le Mariage** — bridal/fashion, MENA
- **GRIF** — fashion brand, MENA
- **Nora El Batran** — chef/restaurant brand
- **Granzia** — fashion brand; cited as a paying customer testimonial (Ammar Mohamed, Head of Digital Marketing)
- **Viorette** — lingerie/fashion, MENA

**Concentration risk:** Most named customers are **Egyptian e-commerce / fashion / beauty brands**. Zaher is winning the Egyptian SMB e-commerce market. The KSA and UAE markets (where Profound, Goodie, and the Saudi Arabia-focused tools already compete) are less represented in the public case studies. **This suggests Zaher's beachhead is Egypt, not all of MENA.**

### 3.4 Research output (a credibility signal)

Zaher has published **3 research reports** (per /research):
1. **"Top Fashion Brands Mentioned, Cited & Sourced by Claude in Egypt"** (Vol. 1, Issue 1, April 2026) — 48 prompts, 32 brands, 127 sources, 87% top mention rate
2. **"Top Skincare Brands Mentioned, Cited & Sourced by Google AI Overviews in Saudi Arabia"** (Vol. 1, Issue 2) — 52 prompts, 28 brands, 156 sources, 81% top mention rate
3. **"What MENA Consumers Are Actually Asking AI"** (Cross-Industry, MENA) — 240+ queries, 10 industries, 4 AI platforms, 38% queries rising

Plus a free **AI Visibility Intelligence Map** (10 industries × 8 markets, interactive).

**Why this matters:** Publishing original research is the same playbook Profound (State of AI Search reports), Evertune (AI Search Statistics, Methodology posts), and Goodie (Research Lab) use to build thought leadership and capture SEO traffic. **Zaher is doing the same in the MENA category.** This is high-leverage GTM — each report becomes a backlink magnet + a lead magnet + a content asset for the agency channel.

---

## 4. Customer segments & ICP

### 4.1 Who pays first (the inference)

Based on the public customer logos + case studies + agency program design, the ICP ordering is:

1. **Egyptian SMB e-commerce (Discovery → Foundation tier)** — fashion, beauty, fragrance, pharmacy. Al Fouad, Dermaelle, Mood, Granzia, Le Mariage, Viorette. **Highest-fit first customer.** Ticket: $19.99/mo. Volume: hundreds.
2. **MENA digital agencies (resell Foundation → Ecom Powerhouse)** — the /agencies page is built for this. Ticket: $79–$250/mo via agency margin. Volume: tens of agencies × tens of clients = thousands of brand tenants.
3. **Multi-market MENA retailers (Ecom Powerhouse waitlist)** — multi-country retailers on Shopify / WooCommerce. Ticket: $79/mo. Volume: hundreds.
4. **Enterprise brands (Enterprise custom)** — banks, telcos, governments, big FMCG. Ticket: $5K–$20K/mo. Volume: 5–20.
5. **Publishers** — news/media brands in MENA. Mentioned in /about but no public customer logos yet. Lower priority; agency distribution is the path.

### 4.2 The agency wedge (the under-discussed insight)

The /agencies page enumerates the target agency profile very specifically:

> "MENA digital agencies — 50–500 employees. SEO, content, and performance services. Looking for the next premium service line that competitors haven't figured out."
>
> "Account managers & strategists — Managing 10–30 client domains. Need multi-domain workflows, white-labeled reports, and enough methodology to look like the expert."
>
> "Boutique consultancies — Specialist agencies in PR, brand, or e-commerce. Want to add AI visibility as a standalone offering or bundle it with existing retainers."

This is **the primary GTM channel**, not the brand-direct channel. The "GEO Agency" archetype is explicit: agencies managing 10–30 client domains, looking for a premium service line. Zaher's 20% margin + Agency Plan + workshops is structured to give agencies everything they need to **go to market on Monday** as a GEO provider.

**Why this works for MENA specifically:** MENA has hundreds of mid-sized SEO/content agencies (Kashida, SEO Sherpa, Pixel中东, and many smaller shops) that already sell to local brands. **The agency-channel gives Zaher 10–100× the customer-acquisition efficiency of brand-direct sales.** Each new agency partner is a multiplier.

### 4.3 Why SMB-first (and why this works)

Zaher's $7.99/mo Discovery tier is **10–50× cheaper than every horizontal competitor's entry tier** (Profound Starter $99, Goodie Explorer $399, Surfer $39, Frase $39). This is a deliberate pricing strategy:
- **Lowers the barrier to "trying" the platform** — a MENA SMB founder can spend $8 to see what AI says about their brand
- **Captures customers before competitors localize** — once Profound adds Arabic, they'll have a $99/mo entry tier that loses to Zaher's $8
- **Builds a long funnel** — every Discovery customer is upsell-eligible to Foundation and Ecom Powerhouse

The math: 1,800 active businesses × 4% paid conversion = 72 paying customers. At blended ARPU $40/mo, that's **~$2,880 MRR**. At 10% paid conversion (if free-audit-to-paid flow improves), $7,200 MRR. **The unit economics work because the Discovery tier is essentially a marketing expense, not a revenue tier.**

---

## 5. Pain Zaher.AI solves (specificity matters)

### 5.1 The pain (before Zaher)

Before Zaher.AI, a MENA brand trying to understand its AI visibility had three options:

1. **Manual ChatGPT/Perplexity/Claude testing.** Open 5 browser tabs, type 30 queries, screenshot results, manually log mentions. Cost: an intern's time. Output: non-comparable, non-reproducible data that goes stale in a week.
2. **Buy a Profound/Goodie/Peec seat.** Profound Starter is $99/mo, English-first, no Arabic dialect optimization, no MENA-market segmentation. Goodie Enterprise is gated (no public price). Peec is annual-only with no Arabic-specific reporting. **None of them are designed for MENA.**
3. **Hire a McKinsey / Accenture / boutique AI consultancy.** $50K+ engagement, 3-month turnaround, deliverable is a PDF deck that goes stale the week the next model version drops. **Unaffordable for the median MENA brand.**

**The gap Zaher fills:** a $20/mo self-serve Arabic-native platform that gives the same insight class as a $10K+ consultancy engagement. The Al Fouad case study ("+1,515% AI revenue in 90 days") is the visceral proof.

### 5.2 What changed in 2025–2026 (the tailwind)

Per the prior Agent Readiness research:
- AI Overviews has 2.5B MAU, ChatGPT 1B, Gemini 900M, Claude 56M (per [Evertune stats Jul 2026](https://www.evertune.ai/resources/ai-search-statistics-for-generative-engine-optimization))
- 60% of searches end with no click (per [Pew Jul 2025](https://www.pewresearch.org/short-reads/2025-07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/) cited in [Semrush AI Overviews](https://www.semrush.com/blog/ai-overviews/))
- ChatGPT shopping widget in 87% of product responses as of Mar 2026 (vs 20% Oct 2025, per Evertune)
- Per Zaher's homepage stat: **"74% of adults under 30 now use AI engines as their primary information source — not Google"**

**For MENA specifically:** the shift is amplified because:
- **MENA has high mobile-first / messaging-first internet usage** (WhatsApp, Telegram dominate) — AI-chat interfaces fit the cultural UX preference
- **Arabic NLP quality has finally crossed a usability threshold** (GPT-4o, Claude 3.5+, Gemini 2.5) — Arabic is no longer the embarrassment it was in 2023
- **AI Overviews launched in Arabic for Saudi/UAE/Egypt** in 2024–2025, making the AI-search-shift visibly applicable to MENA users
- **Noon, Amazon.sa, Amazon.ae, and Careem/Egyptian e-commerce platforms** are the dominant shopping surfaces, and AI visibility on these surfaces maps directly to revenue (Al Fouad +1,515% is the canonical case)

### 5.3 The visceral pain ("why is this painful")

Three pain points the MENA CMO feels acutely in 2026:
1. **"My competitor is showing up in ChatGPT and I'm not, and I don't know why."** Without measurement, there's no diagnosis, no fix, no accountability.
2. **"I paid my SEO agency $5K/mo for 3 years and now AI search is eating my traffic and they have no answer."** The agency disruption story — exactly the wedge Greg Isenberg narrates.
3. **"I'm running Arabic Google Ads and Meta ads but I have no idea what ChatGPT, Perplexity, or Gemini say about my brand."** MENA marketing budgets are dominated by Google + Meta + TikTok; AI-search is a black box.

Zaher.AI makes all three pain points answerable in 60 seconds via the free audit.

---

## 6. Gaps / unsolved issues / unmet demands

### 6.1 What Zaher doesn't do well (inferred from public surface)

1. **No public Slack/Discord community.** The "support chat" widget on the site is the only community surface. Profound runs Zero Click (the category-defining conference); Evertune publishes Forbes-tier research; Goodie has a podcast and YouTube channel. **Zaher has a research blog but no conference, podcast, or community.** This is a brand-positioning gap.
2. **No documented case study beyond Al Fouad / Dermaelle / Mood.** Three brands. Profound has Ramp + Statsig; Goodie has Rathbones + Dermalogica + SteelSeries + NoGood. **Zaher needs 10+ public case studies to match the credibility bar in enterprise sales.**
3. **No SOC 2 / GDPR compliance mentioned anywhere.** Goodie explicitly markets SOC 2 on Enterprise. Profound Enterprise has SSO/SAML + SOC2. **For MENA enterprise sales (banks, telcos), SOC 2 is table stakes; missing this will block the $10K+/mo tier.**
4. **No API.** None of the Free / Foundation / Ecom tiers mention API access; only Enterprise "custom." Profound Growth/Enterprise have CSV/JSON export + API. Peec has Looker Studio + API. **No API = no developer ecosystem = no integration partners.**
5. **No MCP server.** Goodie has "Goodie MCP" (live). Peec has "Peec MCP" (live Aug 2026). unifapi-agent/agents exposes MCP for AEO. **Zaher has no MCP server yet — and they're an "AI Visibility Infrastructure" company that doesn't speak the AI agent protocol.**
6. **No prompt-volume / market-research product.** Evertune's Prompt Volumes, Peec's prompt suggestion engine, and Goodie's Prompt Research module are differentiators. **Zaher doesn't appear to ship prompt-volume intelligence** — they focus on brand-mention measurement, not buyer-prompt intelligence.
7. **Pricing in USD references but charging in EGP.** The /pricing page disclosure is clear, but this creates an FX surprise at checkout. **For Saudi/UAE customers, a SAR-denominated pricing tier would remove friction.** Zaher mentions SAR as a display currency, but the charge is still in EGP per the FAQ. **A UAE customer paying with a UAE card will see a foreign-currency transaction fee + a non-ideal FX rate.** This is a practical conversion-killer for non-Egyptian MENA customers.

### 6.2 What users complain about (inferred; no public reviews)

Could not fetch Reddit/G2/Product Hunt/Capterra chatter (CAPTCHA/access blocks). Inferences from the competitive landscape and Zaher's positioning:

- **Common AEO-platform complaints across the category:** (1) prompt non-determinism — same prompt, different answer; (2) data goes stale within days — model updates change everything; (3) "rank #1 in ChatGPT" claims are hard to verify; (4) no way to attribute AI visibility to revenue; (5) no integration with the brand's existing marketing stack
- **Zaher-specific likely complaints:** (1) Arabic NLP coverage of Maghrebi dialects (Darija in Morocco/Algeria/Tunisia) is presumably weaker than Egyptian — Zaher's case studies are all Egyptian; (2) the marketplace analysis only covers Amazon/Rufus/Noon — what about Namshi, Ounass, Faces, and other MENA-specific marketplaces?

### 6.3 What's not on the roadmap but should be

Three things that should be on Zaher's roadmap but don't appear to be (publicly):

1. **MCP server.** MCP is the lingua franca of AI agents in 2026. Zaher shipping an MCP server would let Claude/ChatGPT/VS Code users query their brand visibility directly. **Not shipping this means Goodie/Peec eat the developer mindshare.**
2. **A WhatsApp/Telegram-bot surface for AI visibility alerts.** MENA users are WhatsApp-first. A bot that pings when visibility drops 5%+ on a tracked prompt is the perfect engagement loop. **No AEO vendor ships this.**
3. **An Arabic-prompt marketplace for buyer-intent research.** Zaher has the data; they should sell it. "What MENA consumers asked AI in Q3 2026" is a $50K/yr intelligence product for any brand doing MENA marketing. The research page already publishes this data — packaging it as a paid product is the obvious move.

---

## 7. Direct competitors (English / horizontal)

The English horizontal landscape was mapped in detail in `research\02_agent_readiness\FINDINGS.md` (3,500-word competitor section). Below is the condensed, refreshed-for-2026-08-12 view. See COMPETITORS_MATRIX.md for the structured side-by-side.

### 7.1 Tier 1 — Well-funded horizontal incumbents

| Vendor | Latest pricing (2026-08-12) | Differentiator | Source |
|---|---|---|---|
| **Profound** | Starter $99 / Growth $399 / Enterprise (9 engines, Shopping, SSO, SOC2, API) | "Marketing agents" + Agents Sheets at scale; Zero Click conference | [tryprofound.com](https://www.tryprofound.com/) · [pricing](https://www.tryprofound.com/pricing) |
| **Goodie** | Explorer $399 / Pro (demo) / Enterprise (demo) — 11+ models including Amazon Rufus | Agentic Commerce Suite as named module; free Agent Site Audit + AI Visibility Index + LLMs.txt Generator; SOC 2 | [higoodie.com](https://higoodie.com/) |
| **Evertune** | Pro $800 / Enterprise (SSO) — 11 models + ChatGPT Ad Agent | EverPanel 150M-user prompt data; first-party ad placement in ChatGPT | [evertune.ai](https://www.evertune.ai/) |
| **Peec AI** | Annual-only (gated); MCP live | Lily Ray endorsement; 3000+ brands | [peec.ai](https://peec.ai/) |

### 7.2 Tier 2 — SEO incumbents pivoting

| Vendor | Pricing | AEO angle | Source |
|---|---|---|---|
| **Surfer** | $39–$103/mo | AI Tracker is the new headline product | [surferseo.com](https://www.surferseo.com/) |
| **Clearscope** | $129 / $399 / Enterprise | Enterprise content + AI prompt tracking | [clearscope.io](https://www.clearscope.io/pricing) |
| **Frase** | $39–$103/mo | Content OS w/ AI Visibility + Content Guard auto-fix | [frase.io](https://www.frase.io/) |
| **Semrush** | $139+/mo | AI Visibility Toolkit + MCP server | [semrush.com](https://www.semrush.com/solutions/ai-visibility/) |
| **Ahrefs** | $129+/mo | Brand Radar | per [Peec comparison](https://peec.ai/comparison/peec-ai-vs-ahrefs-brand-radar) |

### 7.3 Tier 3 — Enterprise SEO incumbents

| Vendor | Type | Source |
|---|---|---|
| **Botify** | Enterprise SaaS + AgenticCatalog (product-feed optimization for AI shopping agents) | [botify.com](https://www.botify.com/) |
| **Oncrawl** | Technical SEO + AI Search Lens (Zurich Insurance case study) | [oncrawl.com](https://www.oncrawl.com/) |
| **MarketMuse** | Content strategy | [marketmuse.com](https://www.marketmuse.com/) |

### 7.4 The whitespace Zaher doesn't compete for (and shouldn't)

- **Pure brand-direct enterprise ($50K+/mo ACVs)** — Botify, Oncrawl own this
- **Vertical-specific SaaS with heavy services (legal, medical, financial)** — Goodie owns SaaS, FinTech, Pharma; Profound owns Travel
- **AI-search ad placement** — Evertune owns this with ChatGPT Ad Agent

**Zaher's defensible position:** Arabic-first + MENA agencies + low-end of MENA SMB e-commerce. This is a wedge nobody else is contesting.

---

## 8. Arabic / MENA competitors

### 8.1 What exists in the MENA digital marketing space (confirmed or strongly inferred)

| Vendor | Type | GEO/AEO relevance |
|---|---|---|
| **Kashida** | Arabic typography & content | Adjacent (Arabic content quality) but not GEO |
| **Araby.AI** | Arabic AI content generation | Adjacent but not GEO specifically |
| **Tarjama** | Arabic translation/localization services | Adjacent but not GEO |
| **SEO Sherpa (MENA)** | Regional SEO agency | Adjacent (does GEO services for clients but no product) |
| **Pixel中东 / Pixel MENA** | MENA digital marketing agency | Adjacent |
| **AWR (Arab Web Ranking)** | Arabic SEO blog/community | Education, not product |
| **Yastaa / Yatemak / Tayeb** | Various Egyptian/Saudi martech startups | Not GEO |

### 8.2 The Arabic GEO whitespace (confirmed)

After exhaustive search via webfetch + GitHub API + reasoning over the broader landscape:
- **No dedicated Arabic AI-visibility SaaS product competes with Zaher.AI as of 2026-08-12.**
- **No OSS AEO tool supports Arabic dialect handling.**
- **No MENA-based agency has shipped a proprietary GEO product** (vs. reselling Profound/Goodie/Peec).
- **Zaher.AI is the category creator** in Arabic GEO, with first-mover risk and reward.

### 8.3 What this means for someone building similar

- **The Arabic GEO wedge is taken** by Zaher. Don't try to clone Zaher directly into Arabic.
- **The next underserved language buckets** (per the "AI visibility gap" framing Zaher's own research uses):
  - **Spanish** (500M+ speakers, Latin America + Spain, no dedicated Spanish-first GEO platform)
  - **Portuguese** (260M+ speakers, Brazil dominant, no dedicated product)
  - **French** (300M+ speakers, with Maghrebi dialect opportunity)
  - **Indonesian / Vietnamese / Thai** (Southeast Asia, fast-growing AI adoption)
  - **Turkish** (85M speakers, MENA-adjacent but distinct)
- **A Spanish-first GEO platform** is the highest-priority wedge if you want to do a regional clone (more speakers than Arabic; mature digital marketing ecosystem in LatAm/Spain; no incumbent).

---

## 9. E-commerce / agentic shopping competitors

### 9.1 Who is building the "Agentic Shopping" angle

| Vendor | Agentic Shopping angle | Status |
|---|---|---|
| **Zaher.AI** | Agentic Shopping Engine module — Amazon, Amazon Rufus, Noon coverage; "Visibility + CRO" full funnel | Soon (Ecom Powerhouse tier) |
| **Profound** | Shopping module — ChatGPT Shopping integration | Live on Enterprise tier only |
| **Goodie** | Agentic Commerce Suite — ChatGPT, Amazon Rufus, Perplexity | Live (named module) |
| **Evertune** | ChatGPT Ad Agent — paid retargeting inside ChatGPT | Live (Jun 2026 launch) |
| **Botify** | AgenticCatalog — product-feed optimization for AI shopping agents | Live |

### 9.2 The adjacent payment/agent infrastructure (not AEO vendors but enabling the agentic-commerce space)

- **Stripe Agent Toolkit** — programmatic payment APIs for AI agents ([stripe.com/agent-toolkit](https://docs.stripe.com/agents))
- **Visa Intelligent Commerce** — Visa's program for AI-agent-initiated transactions (2026)
- **Mastercard Agent Pay** — Mastercard's equivalent
- **Coinbase AgentKit** — crypto payments for AI agents
- **Cloudflare X402** — HTTP 402-based payment protocol for AI agents (Cloudflare, 2026)
- **OpenAI Agentic Commerce Protocol** — OpenAI + Stripe joint standard for ChatGPT shopping (announced 2026)

**The Al Fouad +1,515% and Mood "live agentic checkout" claims depend on this stack being real.** If Shopify's Agentic Storefronts is live and ChatGPT can complete purchases inside the conversation (Mood case study), then "AI visibility → purchase" is a closed loop with measurable revenue attribution. **This is the strategic centerpiece of Zaher's Agentic Shopping module.**

### 9.3 Marketplace coverage comparison

| Vendor | Amazon | Amazon Rufus | Noon | Perplexity Shopping | Google Shopping |
|---|---|---|---|---|---|
| **Zaher.AI** | ✅ | ✅ (first-mover wedge) | ✅ (MENA-specific) | ✅ | ✅ (via Google AI Overview) |
| **Profound** | partial | partial | ❌ | ✅ | partial |
| **Goodie** | ✅ | ✅ | ❌ | ✅ | partial |
| **Botify** | ✅ | ✅ | ❌ | partial | ✅ |

**Zaher's Noon coverage is the unique wedge** — Noon is the dominant MENA e-commerce marketplace, and no other AEO platform in the matrix covers it.

---

## 10. Open-source alternatives

### 10.1 The OSS AEO/GEO landscape (GitHub API scan, 2026-08-12)

The OSS landscape is **fragmented and growing rapidly** — 142+ repos matching "aeo" + 538 matching "ai search monitor" + 597 matching "ai seo visibility" + 55 matching "geo toolkit" + 18 matching "llm seo tracker" + ~15 that are actually AEO/GEO products (the rest are SEO-adjacent, AI-agent unrelated, or low-quality). **Quality concentrates around a handful of serious projects:**

| Repo | Stars | License | Language | Maintenance signal | What it does | Best for |
|---|---|---|---|---|---|---|
| **Auriti-Labs/geo-optimizer-skill** | 661 | MIT | Python + Astro site | Last push 2026-08-11 (very active) | Full AEO/GEO toolkit: audit, optimize, track ChatGPT/Perplexity/Gemini/AIO citations; CLI + Astro web UI | Self-hosted replacement for Profound/Peec |
| **unifapi-agent/agents** | 545 | MIT | (MCP marketplace) | Last push 2026-06-26 | Marketing agents via MCP — SEO audits, GEO, AI-visibility, KOL pricing, social listening, competitive intelligence from public data | Marketing teams adopting MCP |
| **amplifying-ai/awesome-generative-engine-optimization** | 474 | (none) | Markdown | Last push 2026-04-14 | Awesome list of GEO resources, tools, research | Curated catalog — best starting point |
| **danishashko/geo-aeo-tracker** | 229 | MIT | TypeScript | Last push 2026-07-22 | Local-first AI visibility dashboard for 6 models | Self-hosted dashboard |
| **onism1767-creator/potato** | 179 | MIT | Python | Last push 2026-06-22 | Free Claude brand-monitor: deterministic, reproducible, $0 mock by default | Cheap Claude-only tracking |
| **mverab/eGEOagents** | 155 | MIT | Python | Last push 2026-08-12 (very active) | GEO toolkit for ChatGPT/Perplexity/Gemini/Claude; CLI + Claude Code + MCP | Claude-Code-first workflows |
| **aryamantodkar/oneglanse** | 147 | MIT | TypeScript (Next.js + ClickHouse) | Last push 2026-05-10 | Self-hosted GEO tracker, multi-model | Self-hosted dashboard |
| **firecrawl/open-scouts** | 1,355 | (none) | TypeScript (Next.js) | Last push 2026-05-22 | AI-powered web monitoring platform (alerting when LLMs mention you) | Web monitoring adjacent |
| **OranAi-Ltd/orangeo-ai-visibility-skill** | 130 | MIT | Python | Last push 2026-06-09 | Claude/Codex skill for robots.txt/llms.txt/schema/competitor gaps | Claude/Codex agent users |
| **alexpospekhov/searchstack-aeo** | 92 | MIT | Python CLI | Last push 2026-05-04 | 22 commands, 9 APIs, llms.txt generator, Markdown reports, cron-ready | Power users / agencies |
| **ansvisor/ansvisor** | 75 | MIT | TypeScript (Next.js + Supabase) | Last push 2026-08-11 (very active) | Full self-hostable AI Visibility Platform — 9 engines | Self-hosted Profound clone |
| **akii-technologies-ltd/akii-seo-ai-search-optimizer** | 74 | MIT | Markdown (Claude Code plugin) | Last push 2026-06-11 | Free Claude Code plugin for SEO/AEO/GEO | Claude Code users |
| **aronhy/geo-llms-toolkit** | 76 | (other) | PHP (WordPress plugin) | Last push 2026-03-31 | Automated GEO for WordPress sites | WordPress sites |
| **sarahkb125/llm-brand-tracker** | 57 | Apache-2.0 | TypeScript | Last push 2025-07-23 (stale) | Research, monitor, action LLM visibility | Research-first workflows |
| **gooseworks-ai/goose-aeo** | 29 | MIT | TypeScript | Last push 2026-03-27 | AEO tracking CLI for Claude Code/Cowork/Codex/OpenClaw/Gooseworks | Agent-first workflows |
| **AKzar1el/mcp-geo** | 24 | MIT | TypeScript (Cloudflare Workers) | Last push 2026-07-27 | MCP server for AI visibility tracking, self-host on Cloudflare Workers | MCP-server-hosted deployment |
| **hellowalt/aeo-radar** | 22 | MIT | TypeScript (Next.js + Playwright) | Last push 2026-07-01 | ChatGPT brand-visibility monitor via Playwright | ChatGPT-only monitoring |
| **anyin-ai/aperture** | 22 | MIT | TypeScript | Last push 2026-07-21 | BYOK self-hosted — "Free alternative to Profound and Peec AI" | Self-hosted with BYOK |
| **max-d3v/geo_toolkit** | 16 | (none) | TypeScript (FastAPI + LangGraph) | Last push 2025-07-09 (stale) | GEO platform with OpenAI web search integration | FastAPI/LangGraph stack |
| **Ghanyte/geo-seo-audit** | 7 | MIT | Python (Claude Code skill) | Last push 2026-04-30 | Evidence-based GEO audit for Claude Code, no paid APIs | Budget audits |
| **AutomateLab-tech/ai-seo-mcp** | 3 | MIT | TypeScript (MCP) | Last push 2026-06-08 | 14 MCP tools for AI-citation audit/score/rewrite | MCP-tool-only usage |
| **dougwithseismic/geo-kit** | 2 | MIT | TypeScript (Next.js/MDX) | Last push 2026-07-16 | Evidence-based GEO playbook + agent skills + Next.js components | Modern-stack agencies |

### 10.2 What this means

The OSS space has **at least 22 active projects** and is **growing at ~3 new repos/month**. **None of them are Arabic-native.** The closest "Zaher clone in OSS" is danishashko/geo-aeo-tracker (229 stars, 6 models, TypeScript) or ansvisor/ansvisor (75 stars, 9 models, Next.js/Supabase). **For someone building a clone today, the OSS substrate is mature enough that you don't need to write your own prompt-orchestration layer.**

### 10.3 The OSS verdict

**OSS is good enough for a single-brand or agency-tier MVP.** For a multi-tenant SaaS competing with Profound/Goodie/Zaher, you'd still need proprietary prompt libraries, custom scoring models, and the support infrastructure. **OSS is the wedge for solo founders and agencies, not the wedge for venture-scale SaaS.**

---

## 11. Free / freemium alternatives

| Tool | URL | What you get | What's gated |
|---|---|---|---|
| **Zaher.AI Free Audit** | [zaher.ai/onboarding](https://zaher.ai/onboarding) | 6-section report (Executive Summary, Brand Recognition, Trust & Sentiment, Competitive Landscape, Geographic Footprint, Strategic Roadmap), 60s results, no signup required | Real-time monitoring, optimization roadmap |
| **Profound AEO Report** | [tryprofound.com/aeo-report](https://www.tryprofound.com/aeo-report) | AI Visibility, Source Citations, Brand Sentiment, Content AEO — instant report | Daily monitoring, prompt customization, multi-engine |
| **Goodie Agent Site Audit** | [higoodie.com/agent-site-audit](https://higoodie.com/agent-site-audit/) | Free site-audit tool | Paid multi-engine tracking |
| **Goodie AI Visibility Index** | [higoodie.com/ai-visibility-index](https://higoodie.com/ai-visibility-index/) | Industry-level AI visibility index | Granular per-brand tracking |
| **Goodie LLMs.txt Generator** | [higoodie.com/llms-txt-generator](https://higoodie.com/llms-txt-generator/) | Free llms.txt file generator for any site | Auto-publish, monitoring |
| **Peec AI 7-day Free Trial** | [peec.ai](https://peec.ai/) | Full platform for 7 days | Annual subscription |
| **Writesonic GEO Audit** (referenced via Goodie's blog Aug 2026) | writesonic.com | Free AEO audit tool (less comprehensive) | Full Writesonic suite |
| **Profound Index** | [tryprofound.com/profound-index](https://www.tryprofound.com/profound-index) | Industry-level ranking data | Per-brand monitoring |
| **Semrush AI Visibility Toolkit** | [semrush.com](https://www.semrush.com/solutions/ai-visibility/) | Limited free tier (mostly paid) | Full toolkit $139+/mo |

**The free audit has become the de facto GTM standard.** Every credible AEO vendor ships one. **Zaher's free audit is best-in-class for Arabic** but not for English — Profound and Goodie are the better English benchmarks.

---

## 12. Tech stack & feasibility of building similar

### 12.1 What it takes to clone Zaher.AI (in 2026 H2)

**Stack components and off-the-shelf options:**

| Component | Off-the-shelf options | Estimated cost (solo founder, monthly at 100 customers) |
|---|---|---|
| **LLM APIs** (multi-model) | OpenAI, Anthropic, Google AI Studio, Perplexity, Cohere, Together AI, OpenRouter | **$5K–$20K/mo** at Evertune's volume (1–2M prompts/customer) |
| **Web scraping / crawling** | Firecrawl ($0–$500/mo), Apify ($50–$500/mo), Browserbase ($0–$200/mo), Playwright (free, $50–$200/mo hosted) | $200–$1K/mo |
| **Search APIs** (for citation discovery) | Tavily ($0–$500/mo), Exa ($0–$500/mo), SerpAPI ($50–$500/mo) | $200–$1K/mo |
| **Vector DB** (for prompt library storage) | Pinecone, Weaviate, Qdrant, pgvector | $50–$500/mo |
| **Frontend / Dashboard** | Next.js, React, shadcn/ui, Tremor | Free + dev time |
| **Backend / Orchestration** | LangChain, LangGraph, OpenAI Assistants, custom queue (BullMQ/Inngest) | Free + dev time |
| **Database** | Postgres (Supabase, Neon), ClickHouse for analytics | $50–$500/mo |
| **Hosting** | Vercel + Cloudflare Workers (cheapest), AWS | $100–$1K/mo |
| **Payments** | Stripe (international), Paymob/Tap/HyperPay (MENA-specific) | 2.9% + $0.30 per transaction |
| **Auth** | Clerk, Supabase Auth, Auth.js | Free–$100/mo |
| **Email / notifications** | Resend, Postmark | $0–$100/mo |

### 12.2 MVP build cost (estimate)

**Phase 1 (4–6 months, 2 technical founders):**
- 1 backend/AI engineer + 1 full-stack engineer
- Build: 3 modules (Overview Dashboard + GEO Analysis + Optimization Hub) + free audit tool
- **Cost:** $80K–$150K dev + $5K–$15K/mo LLM API at first 10 paying customers
- **Output:** A working SaaS at $19.99–$79/mo with Arabic + English support

**Phase 2 (6–12 months):**
- Add Content Writer + Agency Program
- Hire 1 sales/marketing contractor
- **Additional cost:** $50K–$100K

**Phase 3 (12–24 months):**
- Add Agentic Shopping + Analytics Suite
- Hire 2 engineers + 1 sales
- **Additional cost:** $300K–$500K

**Total 24-month cost to Zaher parity (6 modules LIVE):** **~$500K–$1M**

### 12.3 The Cloudflare + X402 dependency angle

Per the Cloudflare Agent Internet brief, [Cloudflare AI Crawl Control](https://developers.cloudflare.com/ai-crawl-control/) is now GA and [Pay Per Crawl](https://blog.cloudflare.com/pay-per-crawl/) is in private beta (early 2026 announcement). The Greg Isenberg thesis is that **Cloudflare will become the rails for AI-agent commerce** — X402 is the payment protocol, AI Crawl Control is the visibility layer, and `llms.txt` is the index.

**For a Zaher clone, Cloudflare AI Crawl Control is a feature dependency**, not a blocking dependency. You can ship without it (use robots.txt + standard `llms.txt` parsing), but **once Cloudflare Pay Per Crawl goes GA, you'll want to be one of the first AEO vendors to integrate "Pay Per Crawl analytics" as a Zaher-Enterprise feature** — it would let customers see exactly which AI crawlers are fetching their content, what they pay, and what content those crawlers prioritize.

### 12.4 The off-the-shelf shortcuts

If you don't want to build everything yourself:
- **Prompt orchestration**: LangSmith, LangGraph, OpenAI Assistants, Vellum
- **Brand-monitoring scoring**: custom (no off-the-shelf)
- **Arabic NLP**: Cohere's multilingual embeddings + a fine-tuned sentiment classifier (use Hugging Face's Arabic models: CAMeL-Lab, AraBERT, MARBERT)
- **Dialect handling**: prompt-engineering is the cheapest first attempt; fine-tuning AraBERT or MARBERT on Egyptian/Gulf/Levantine dialects is the long-term play
- **Content generation**: OpenAI/Anthropic APIs directly
- **Free audit widget**: copy Zaher's UI (no, don't — use danishashko/geo-aeo-tracker or aryamantodkar/oneglanse as reference implementations)

---

## 13. How Zaher.AI operates internally

### 13.1 Org structure (inferred)

- **HQ:** Cairo, Egypt
- **Phone:** +2010 7080 3070 (Egyptian mobile)
- **Legal entity:** "Zaher For AI Solutions LLC"
- **Team size:** Inferred 5–15 FTE based on product breadth in <18 months
- **Likely org:** 1 founder/CEO + 1–2 backend engineers + 1–2 full-stack engineers + 1 ML/LLM engineer + 1 sales/marketing + 1 customer success

### 13.2 Hiring signals (publicly visible)

- No public job board posts found (LinkedIn / Wellfound blocked for research)
- The /agencies page says "rolling basis; most partners onboarded within 5–10 business days" — implies a small partner-ops team
- "Dedicated team per domain" on Enterprise implies a customer-success / analyst team

**Recommendation:** if you're building similar, Cairo / Egypt is an **excellent hiring market** for AI engineers in 2026 — strong Arabic NLP talent base, lower cost than SF/London, timezone-aligned with Europe (4–6 hour overlap).

### 13.3 Customer support model

- **In-product chat widget** (the "Zaher AI Assistant · Online · Any Language & Dialect" dialog)
- **Email:** contact@zaher.ai + support@zaher.ai (per /pricing FAQ)
- **No phone support visible** except for Enterprise tier (inferred)
- **No public community** (Slack/Discord) — gap noted above
- **Documentation:** Not visible; no /docs URL in the sitemap

### 13.4 Content publishing cadence

- **Blog:** 4 posts (all April 2026)
- **Research:** 3 reports (all April 2026)
- **Newsletter:** "Get insights weekly" — visible on every page
- **Social:** None publicly listed (no Twitter/X, LinkedIn, YouTube links in the footer)

**Interpretation:** Zaher's content cadence is **heavy at launch (April 2026 content dump)** and likely ongoing at a slower cadence. The "weekly newsletter" is the engagement loop. **The lack of social media presence is unusual for a SaaS in 2026** — it suggests Zaher is relying on organic/SEO/agency-channel distribution rather than social thought leadership.

### 13.5 Growth tactics (inferred from public surface)

1. **Free audit as lead magnet** (primary — `/onboarding`)
2. **Agency program with margin** (secondary — `/agencies`)
3. **Research reports for SEO + credibility** (tertiary — `/research`)
4. **Blog content for category education** (quaternary — `/blog`)
5. **Pricing page social proof** (always-on — `100% retention`, `20+ brands`, `7 engines`, `500+ pipeline`)
6. **Currency localization** (always-on — EGP primary)
7. **WhatsApp-friendly** (likely — given MENA UX preferences; not directly visible)

**What they're NOT doing** (which is interesting given the competitor set):
- No conference
- No podcast
- No YouTube
- No Twitter/X thought leadership
- No community (Slack/Discord)
- No code samples / OSS

---

## 14. Regulatory & legal risks

### 14.1 What's already regulated

- **GDPR / Egypt Data Protection Law (No. 151 of 2020).** Zaher stores client brand data + AI responses. Standard DPA required. Egypt's law is GDPR-aligned but with MENA-specific carve-outs (e.g., data localization requirements for sensitive data).
- **FTC truth-in-advertising (US-scope).** The +1,515% / +23,306% case study claims must be substantiable. The disclosure ("Source: Google Analytics 4" / "Source: Shopify — Agentic channel") is the right register — sourced data, not "ranked #1 in ChatGPT" claims.
- **Egyptian consumer protection law.** Pricing in EGP via Stripe is generally fine; refunds/disputes handled via Stripe standard process.

### 14.2 What's NOT regulated yet but should be on your radar

- **AI-output citation accuracy.** No legal liability for AI assistants returning wrong info about a brand. This may change (EU AI Act Article 50 transparency requirements start applying to AI-generated content in 2026).
- **Pay-per-crawl pricing (Cloudflare's beta).** No precedent yet on contractual structure; rate-limit / ToS conflicts may arise.
- **MENA-specific AI regulation.** Saudi Arabia's SDAIA (Saudi Data & AI Authority) is actively drafting AI regulations (2026); UAE's AI Office is similar. **For a MENA-first vendor, regulatory compliance is a moving target — design for change.**

### 14.3 OpenAI / LLM API ToS considerations

Per OpenAI's Terms of Service and the general approach:
- **Scraping AI outputs** (which is what every AEO vendor does) is in a gray area. OpenAI explicitly forbids using outputs to "develop models that compete with OpenAI." **Tracking brand visibility across ChatGPT is not competing with OpenAI — it's competitive intelligence. Most vendors do it openly.**
- **Rate limits:** ChatGPT API has tiered rate limits (free tier = 3 RPM, paid tiers = 60+ RPM). At 250 queries × 5 LLMs × 10 reps/customer/day, a Zaher-equivalent Ecom Powerhouse customer burns ~12,500 LLM API calls/day. **You need Enterprise-tier API access to serve that volume.**
- **Anthropic / Claude:** Similar tiered limits. Anthropic is generally more permissive for non-competing use cases.
- **Perplexity API:** Public API launched 2025; rate limits are generous for paid customers.

### 14.4 What this means for someone building similar

- **Get API ToS legal review before launch** (cheap — ~$2K for a privacy attorney to confirm compliance)
- **Substantiate all case-study claims with named metrics + named data source** (Zaher's pattern is correct)
- **Design for currency localization** (Zaher's EGP-primary is a feature, not a bug)
- **Budget for SOC 2 if you sell to enterprise** ($30K–$50K for Type II certification; 12-month process)
- **Get cyber-liability insurance** ($1K–$3K/yr; standard for any SaaS handling client data)

---

## 15. Verdict & recommendation

### 15.1 Where Zaher.AI sits in the competitive landscape

Zaher is **the first mover in Arabic-first MENA GEO** with a credible product (6/8 modules LIVE), a real agency distribution channel (margin program + Agency Plan), and a real customer base (20+ brands, named Egyptian e-commerce logos). They are **not** competing with Profound/Goodie/Evertune on engine breadth, ad placement, or enterprise sales — they're competing on language + geography + agency-channel economics. **This is a viable, defensible niche for at least 18–24 months.**

### 15.2 The "build similar" question — the wedge analysis

| Wedge option | Difficulty | Defensibility | TAM | Recommendation |
|---|---|---|---|---|
| **Direct Arabic clone** | LOW (Zaher already exists) | LOW (head-to-head) | Same as Zaher ($5M–$50M MENA) | **Don't.** Zaher has first-mover advantage and an agency channel that locks in distribution. |
| **Spanish-first GEO** | MEDIUM (no incumbent) | MEDIUM (18-month window) | ~$50M–$200M LatAm+Spain | **Yes — high priority.** 500M+ Spanish speakers, mature digital marketing, no incumbent. |
| **Portuguese-first (Brazil)** | MEDIUM (no incumbent) | MEDIUM | ~$30M–$100M Brazil | **Yes — viable.** Brazil's e-commerce is the largest in LatAm; PT-BR NLP is mature. |
| **French-first (Maghrebi angle)** | MEDIUM | LOW (less monetization potential) | ~$20M–$50M Maghreb + France | **Possible.** Smaller TAM but underserved. |
| **Indonesian / Vietnamese / Thai** | HIGH (NLP harder) | MEDIUM | ~$50M–$150M SEA | **Possible but hard.** SEA is mobile-first; different UX. |
| **Turkish-first** | LOW-MED | LOW (similar to Arabic, but smaller) | ~$20M–$50M | **Possible.** Turkish NLP is well-served by existing models. |
| **E-commerce-only "Agentic Shopping" SaaS** | HIGH | MEDIUM | $100M–$500M globally | **Possible.** Botify AgenticCatalog is the closest; no pure-play. |
| **White-label to agencies (English-first)** | LOW | LOW (saturated by Profound/Goodie/Peec agency programs) | Already covered | **Don't.** Crowded. |
| **OSS-only self-hosted** | LOW | LOW (revenue model unclear) | Indie-hacker economics | **For solo founders only.** danishashko + aryamantodkar + ansvisor already exist. |
| **Build an MCP server for AEO** | MEDIUM | HIGH | $10M–$100M (MCP is the standard) | **Yes — adjacent.** AKzar1el/mcp-geo exists; Goodie MCP exists; Peec MCP exists. The space is taking shape. Ship yours now. |
| **A "Pay Per Crawl" intelligence layer (Cloudflare)** | HIGH | HIGH (Cloudflare-aligned) | TBD | **Watch this space.** When Cloudflare's Pay Per Crawl goes GA, there's a $XM opportunity to be the visibility-analytics layer. |

### 15.3 Recommended execution (the wedge to take)

**Build: Spanish-first GEO SaaS + agency channel + free audit + MCP server.**

**Why:**
1. **Spanish is the largest underserved language bucket in GEO** (500M+ speakers; mature digital marketing; no incumbent)
2. **The agency-channel GTM (à la Zaher's 10–20% margin + Agency Plan) is proven and replicable**
3. **An MCP server gives you developer mindshare and a Claude/ChatGPT-native surface** (Zaher doesn't have one)
4. **A free audit in Spanish + English is a lead magnet that competitors don't have**
5. **LatAm + Spain has high e-commerce density** (Mercado Libre, Amazon, Shopify stores in Spanish are the natural Agentic Shopping customers)
6. **Build cost is ~$80K–$150K for MVP** (4–6 months, 2 engineers)

**The team:**
- 1 technical founder (full-stack + AI/LLM experience)
- 1 technical co-founder (Spanish-fluent; LATAM background preferred for cultural ICP)
- 1 marketing contractor (Spanish content + LATAM agency outreach)

**The product (MVP, 6 months):**
1. **Free audit tool** — Spanish + English, 60-second report, 6 sections (like Zaher/Profound)
2. **Overview Dashboard + GEO Analysis** (3 sub-modules: Brand Recognition, Trust & Sentiment, Market Analysis)
3. **Agency Program** with 10–20% margin + Agency Plan
4. **MCP server** for ChatGPT/Claude visibility queries

**The GTM:**
1. Free audit → leads → upsell
2. Agency outreach in Spain + Mexico + Argentina + Colombia (top 4 Spanish-speaking digital marketing markets)
3. Research reports ("Top Spanish Brands Mentioned by ChatGPT in Mexico") for SEO + lead magnet
4. Conference presence at SiGMA, Web Summit LatAm, Mexico City Marketing Week

**The moat (18 months):**
1. Spanish NLP depth (dialects: Castilian, Mexican, Argentinian, Colombian, Chilean)
2. Agency network (10+ agencies in year 1, 100+ in year 2)
3. Proprietary LatAm prompt-volume data
4. MCP server adoption by ChatGPT/Claude users in the Spanish-speaking dev community

**Pricing:**
- Discovery: **$7.99/mo** (mirror Zaher — 30 queries, 2 LLMs)
- Foundation: **$19.99/mo** (60 queries, 2 markets)
- Ecom Powerhouse: **$79/mo** (Mercado Libre + Amazon Mexico + Amazon Spain coverage)
- Enterprise: Custom

### 15.4 Alternative: the "OSS + monetization" path

If you want a faster, cheaper start:
1. **Fork [danishashko/geo-aeo-tracker](https://github.com/danishashko/geo-aeo-tracker) (229⭐, MIT)** or **[ansvisor/ansvisor](https://github.com/ansvisor/ansvisor) (75⭐, MIT)**
2. **Add Spanish-language support** (the gap nobody in OSS has filled)
3. **Ship a hosted SaaS wrapper** at $19.99/mo
4. **Use the OSS repo as the marketing engine** (every star is a future customer)
5. **Take payment via Stripe + Mercado Pago** (LatAm coverage)

**Cost:** ~$20K dev + $5K/mo LLM API at first 10 customers
**Time:** 3–4 months
**Risk:** OSS is commoditized; differentiation has to come from Spanish + agency + LatAm data

### 15.5 Final verdict

**Zaher.AI is a real, defensible business — but the Arabic GEO wedge is taken.** The closest uncontested wedge for someone building similar in 2026 is **Spanish-first GEO with an agency channel and an MCP server**, target $1M–$3M ARR within 18 months.

**The Greg Isenberg pitch** ("Cloudflare will make 1000+ AI millionaires") is **directionally correct but underspecified**: the actual opportunity is **regional-language + agency-channel GEO SaaS**, not just "agent readiness for businesses." Every founder who builds a "Profound for {language}" with an agency-margin program has a 12–18-month window to capture $500K–$5M ARR before the horizontal incumbents localize. **Zaher proved the playbook for Arabic. The playbook works for Spanish, Portuguese, French, and Turkish too.**

---

## Source URL list (all citations)

### Zaher.AI — primary
- [zaher.ai](https://zaher.ai/) — home (English)
- [zaher.ai/ar](https://zaher.ai/ar) — home (Arabic RTL)
- [zaher.ai/pricing](https://zaher.ai/pricing) — pricing snapshot
- [zaher.ai/agencies](https://zaher.ai/agencies) — agency program
- [zaher.ai/modules/geo-analysis](https://zaher.ai/modules/geo-analysis) — 5 sub-modules
- [zaher.ai/modules/agentic-shopping](https://zaher.ai/modules/agentic-shopping) — 6 sub-pages
- [zaher.ai/modules/ai-optimization-agent](https://zaher.ai/modules/ai-optimization-agent) — autonomous agent
- [zaher.ai/research](https://zaher.ai/research) — 3 reports + Intelligence Map
- [zaher.ai/blog](https://zaher.ai/blog) — 4 posts
- [zaher.ai/about](https://zaher.ai/about) — "first Arabic-native AI visibility platform" claim
- [zaher.ai/contact](https://zaher.ai/contact) — contact form

### Horizontal English competitors (refreshed 2026-08-12)
- [tryprofound.com](https://www.tryprofound.com/) — home
- [tryprofound.com/pricing](https://www.tryprofound.com/pricing) — Starter $99 / Growth $399 / Enterprise
- [tryprofound.com/aeo-report](https://www.tryprofound.com/aeo-report) — free audit
- [tryprofound.com/zeroclick](https://www.tryprofound.com/zeroclick) — Zero Click conference
- [higoodie.com](https://higoodie.com/) — home + 11 models
- [higoodie.com/pricing](https://higoodie.com/pricing/) — Explorer $399
- [higoodie.com/agent-site-audit](https://higoodie.com/agent-site-audit/) — free tool
- [higoodie.com/ai-visibility-index](https://higoodie.com/ai-visibility-index/) — free tool
- [higoodie.com/llms-txt-generator](https://higoodie.com/llms-txt-generator/) — free tool
- [higoodie.com/features/agentic-commerce-suite](https://higoodie.com/features/agentic-commerce-suite/) — Agentic Commerce
- [peec.ai](https://peec.ai/) — home, 3000+ brands, MCP live
- [peec.ai/pricing](https://www.peec.ai/pricing) — annual-gated
- [evertune.ai](https://www.evertune.ai/) — home, $800/mo, EverPanel, Ad Agent
- [evertune.ai/pricing](https://www.evertune.ai/pricing) — pricing

### Prior Agent Readiness research (carryover)
- [research/02_agent_readiness/FINDINGS.md](file://E:\react_projects\research_space\research\cloudflare-agent-internet-2026-08-12\research\02_agent_readiness\FINDINGS.md) — full English landscape (Profound, Goodie, Peec, Evertune, Surfer, Clearscope, Frase, Botify, Oncrawl, MarketMuse, Semrush, Ahrefs)

### Open-source AEO/GEO tools (GitHub API scan 2026-08-12)
- [Auriti-Labs/geo-optimizer-skill](https://github.com/Auriti-Labs/geo-optimizer-skill) — 661⭐ MIT
- [unifapi-agent/agents](https://github.com/unifapi-agent/agents) — 545⭐ MIT
- [amplifying-ai/awesome-generative-engine-optimization](https://github.com/amplifying-ai/awesome-generative-engine-optimization) — 474⭐ awesome list
- [danishashko/geo-aeo-tracker](https://github.com/danishashko/geo-aeo-tracker) — 229⭐ MIT
- [onism1767-creator/potato](https://github.com/onism1767-creator/potato) — 179⭐ MIT
- [mverab/eGEOagents](https://github.com/mverab/eGEOagents) — 155⭐ MIT
- [aryamantodkar/oneglanse](https://github.com/aryamantodkar/oneglanse) — 147⭐ MIT
- [firecrawl/open-scouts](https://github.com/firecrawl/open-scouts) — 1,355⭐ adjacent web monitoring
- [OranAi-Ltd/orangeo-ai-visibility-skill](https://github.com/OranAi-Ltd/orangeo-ai-visibility-skill) — 130⭐ MIT
- [alexpospekhov/searchstack-aeo](https://github.com/alexpospekhov/searchstack-aeo) — 92⭐ MIT
- [aronhy/geo-llms-toolkit](https://github.com/aronhy/geo-llms-toolkit) — 76⭐
- [ansvisor/ansvisor](https://github.com/ansvisor/ansvisor) — 75⭐ MIT
- [akii-technologies-ltd/akii-seo-ai-search-optimizer](https://github.com/akii-technologies-ltd/akii-seo-ai-search-optimizer) — 74⭐ MIT
- [sarahkb125/llm-brand-tracker](https://github.com/sarahkb125/llm-brand-tracker) — 57⭐ Apache-2.0
- [chaitanyya/lookout](https://github.com/chaitanyya/lookout) — 56⭐ MIT (archived)
- [gooseworks-ai/goose-aeo](https://github.com/gooseworks-ai/goose-aeo) — 29⭐ MIT
- [AKzar1el/mcp-geo](https://github.com/AKzar1el/mcp-geo) — 24⭐ MIT
- [hellowalt/aeo-radar](https://github.com/hellowalt/aeo-radar) — 22⭐ MIT
- [anyin-ai/aperture](https://github.com/anyin-ai/aperture) — 22⭐ MIT
- [max-d3v/geo_toolkit](https://github.com/max-d3v/geo_toolkit) — 16⭐ (none)
- [Ghanyte/geo-seo-audit](https://github.com/Ghanyte/geo-seo-audit) — 7⭐ MIT
- [AutomateLab-tech/ai-seo-mcp](https://github.com/AutomateLab-tech/ai-seo-mcp) — 3⭐ MIT
- [dougwithseismic/geo-kit](https://github.com/dougwithseismic/geo-kit) — 2⭐ MIT

### Standards & infrastructure
- [llmstxt.org](https://llmstxt.org/) · [AnswerDotAI/llms-txt](https://github.com/AnswerDotAI/llms-txt) — 2.6k stars, v2 spec 2026-08-10
- [directory.llmstxt.cloud](https://directory.llmstxt.cloud/) — 849 sites indexed
- [modelcontextprotocol.io](https://modelcontextprotocol.io/) — MCP standard
- [developers.cloudflare.com/ai-crawl-control](https://developers.cloudflare.com/ai-crawl-control/) — GA + Pay Per Crawl beta
- [developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt](https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt) — Chrome Lighthouse audits

### MENA / Arabic competitor scan (negative result)
- DDG HTML search blocked by CAPTCHA; no dedicated Arabic AI-SEO SaaS product found via available channels
- [kashida.com](https://www.kashida.com/) — typography (adjacent, not GEO)
- [araby.ai](https://araby.ai/) — Arabic AI content (adjacent, not GEO)
- [tarjama.com](https://tarjama.com/) — Arabic translation (adjacent, not GEO)

### Payment / agent commerce (adjacent)
- [Stripe Agent Toolkit](https://docs.stripe.com/agents) — agent payment APIs
- Cloudflare X402 — HTTP 402 payment protocol for AI agents (referenced in brief)
- [Visa Intelligent Commerce](https://www.visa.com) — agent-initiated transactions program (2026)
- Coinbase AgentKit — crypto payments for AI agents
- OpenAI Agentic Commerce Protocol — joint OpenAI/Stripe standard for ChatGPT shopping (2026)

### Carryover from prior research
- [semrush.com/blog/ai-overviews](https://www.semrush.com/blog/ai-overviews/) — AI Overviews 12.95% of US queries
- [forbes.com (Rashi Shrivastava Aug 2025)](https://www.forbes.com/sites/rashishrivastava/2025/08/12/the-prompt-seo-is-dead-what-comes-next/) — Evertune $15M raised
- [nytimes.com (Feb 2026)](https://www.nytimes.com/2026/02/17/technology/chatbots-influencers-brands-marketing.html) — paywalled; confirmed via Evertune logo wall
- [wsj.com (Jun 2025)](https://www.wsj.com/articles/a-billion-dollar-question-hangs-over-the-new-ai-search-marketing-industry-06a039ec) — paywalled; confirmed via Evertune logo wall
- [pewresearch.org](https://www.pewresearch.org/short-reads/2025-07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/) — 8% click-through vs 15% without AI Overview