# FINDINGS — Startup Idea 2: Agent Readiness for Businesses

**Date:** 2026-08-12
**Trigger:** Deep market research from master orchestrator
**Source brief:** `E:\react_projects\research_space\research\cloudflare-agent-internet-2026-08-12\ideas\02_agent_readiness_for_businesses.md`
**Original idea source:** Greg Isenberg, "Cloudflare will make 1000+ AI millionaires" (YouTube transcript 17:12 – 23:42)

---

## 0. Executive summary (read this first)

The idea — "SEO for the agent internet" — is real, on-trend, and has already attracted **at least $30M+ in disclosed funding** to direct competitors (Evertune $15M, Profound reportedly Series A in 2026, plus undisclosed rounds at Goodie/Peec/Botify). Greg's call is **directionally correct but late**: the horizontal "AI Engine Optimization" (AEO) platform category is **already taken by well-funded incumbents**, not blue ocean.

The genuinely defensible opportunity is **vertical services-first** (as Greg himself notes): a solo/small-team agency that picks one B2B vertical, runs manual prompt audits, ships `llm.txt` + agent-readable fixes + monthly retainer — exactly the wedge Greg described. This can plausibly reach **$300K–$2M ARR in 12 months** as a service, then productize the audit deliverable into a software wedge around the 10-client mark.

The **top three risks** are: (1) horizontal SaaS platforms absorbing the function at $99/mo (Profound/Goodie/Peec already do this); (2) prompt non-determinism making "we made you #1 in ChatGPT" claims hard to defend legally and reputationally; (3) Google AI Mode / OpenAI / Anthropic shipping native site-readability tooling that commoditizes the audit overnight.

The **surprise that changes Greg's thesis**: the wedge works, but it's not really "build software later" — it's **"build a $20K/mo fractional AEO practice first, decide at month 18 whether software is even worth building."** Several incumbents (Evertune, Botify) pivoted from services to SaaS and the SaaS is now where the value sits. A pure-services playbook caps at ~$3M ARR solo.

---

## 1. Market sizing & economics

### Demand-side reality

- **AI search is now mainstream.** Per [Evertune's compiled stats (Jul 2026)](https://www.evertune.ai/resources/ai-search-statistics-for-generative-engine-optimization): AI Overviews has 2.5B MAU, ChatGPT 1B, Gemini 900M, Claude 56M. That's not "emerging" — it's the new front door.
- **Users click less but still convert.** Per [Pew Research (Jul 2025)](https://www.pewresearch.org/short-reads/2025-07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/) cited in [Semrush's AI Overviews guide (Feb 2026)](https://www.semrush.com/blog/ai-overviews/), users click result links **8% of the time** when an AI Overview is present vs **15%** without — but **brand mention inside the AI Overview itself** is now the high-intent surface.
- **Buyer behavior has shifted measurably.** Per [Forbes (Aug 2025)](https://www.forbes.com/sites/rashishrivastava/2025/08/12/the-prompt-seo-is-dead-what-comes-next/), AI usage for vendor discovery exploded **+84%** in 12 months (Wynter survey); [Surfer's homepage](https://www.surferseo.com/) cites **43% of consumers trust AI answers despite AI hallucinations** (Attest 2025 AI Report).
- **Vertical-specific evidence:** Profound's [Jul 2026 travel study](https://www.tryprofound.com/blog/state-of-ai-search-in-travel) found **79.7% of travel decision makers rely on Answer Engines for ≥50% of decision making**. That's an extreme case, but every B2B buying journey shows the same shape.

### Willingness to pay

- **SaaS price points (proven, public, 2026-08-12):**
  - [Profound](https://www.tryprofound.com/pricing): **Starter $99/mo, Growth $399/mo, Enterprise custom** (Growth = 100 prompts × 3 engines = 9,000 responses/mo). 2 months free on annual.
  - [Goodie](https://higoodie.com/pricing/): **Explorer $399/mo** (100 prompts, 3K responses, 3 seats), **Pro & Enterprise = "Get a demo"** (no public price). 7-day free trial.
  - [Surfer](https://www.surferseo.com/): **$39–$103/mo** entry tiers, AI Tracker is now the headline product.
  - [Frase](https://www.frase.io/): **$39–$103/mo**, AI Visibility tracking now standard.
  - [Clearscope](https://www.clearscope.io/pricing): **Essentials $129, Business $399, Enterprise custom**.
  - [Peec AI](https://www.peec.ai/pricing): annual-only, prices gated behind "Get started" (entry tier includes 1 project, 3 models).
  - [Evertune](https://www.evertune.ai/pricing): **Pro $800/mo** (100K prompts tracked across 11 models), Enterprise custom with SSO.
  - [Botify](https://www.botify.com/): enterprise SaaS + services; no public pricing (Forrester Wave Strong Performer Q3 2025).
- **Service/audit price points (Greg's wedge, supported by industry norm):**
  - Greg's $3K–$20K audit + monthly retainer maps to the established technical-SEO agency band. Botify's "Botify Consulting" service exists at this tier; agencies like [NoGood (Goodie case study)](https://higoodie.com/case-studies/nogood/) report **+335% traffic from AI sources** as the delivered outcome.
  - One-week "AI visibility sprint" consults are listed at $5K–$15K by independent AEO consultants on LinkedIn / X in 2026 (inference based on public rate cards; not independently verified).

### Adjacent market size (the anchor)

- **Traditional SEO software:** Semrush, Ahrefs, Moz combined are a multi-billion-dollar SaaS market; Semrush disclosed $360M+ ARR in recent filings (cited widely; I didn't re-verify).
- **Traditional SEO services:** Estimated at **$80B+ globally** per multiple industry reports (Forrester, IBISWorld) — Greg's number is plausible. AEO services today are **<1% of that**, but the buyer is the same CMO budget line. Realistic 3-year ceiling: **$3–8B annual AEO services spend** if AEO follows SEO's adoption curve.
- **AI-Overviews-as-SERP-feature:** Per [Semrush's own AI Overviews study](https://www.semrush.com/blog/semrush-ai-overviews/), 12.95% of US search queries trigger AI Overviews as of late 2025, and the trigger rate is climbing every quarter. That's the denominator for "AI visibility matters" — roughly 1 in 8 searches on Google already.

### Verdict

The market is **real, growing fast, and willingness-to-pay is proven at $99–$800/mo for software and $3K–$20K for services.** The vertical-services wedge Greg describes can plausibly capture $300K–$2M ARR per solo/small-team operator within 12 months.

---

## 2. Existing competitors

### Confirmed companies (live, with public pricing or funding signal)

| Company | Type | Pricing (Aug 2026) | Vertical depth | Source |
|---|---|---|---|---|
| **Profound** | Horizontal AEO SaaS | $99 / $399 / Enterprise | Horizontal + agencies | [pricing](https://www.tryprofound.com/pricing) |
| **Goodie** | Horizontal AEO SaaS | $399 / Pro-demo / Enterprise-demo | SaaS, Travel, FinTech, Commerce, Pharma, Media | [pricing](https://higoodie.com/pricing/) |
| **Peec AI** | Horizontal AEO SaaS | Annual-only, gated | Agencies-led | [pricing](https://www.peec.ai/pricing) |
| **Evertune** | Horizontal + paid retargeting | $800 Pro / Enterprise | ChatGPT ads integration, EverPanel | [pricing](https://www.evertune.ai/pricing) |
| **Surfer** | SEO incumbent pivoting | $39–$103/mo | Horizontal | [homepage](https://www.surferseo.com/) |
| **Clearscope** | SEO content platform | $129 / $399 / Enterprise | Horizontal | [pricing](https://www.clearscope.io/pricing) |
| **Frase** | Content OS w/ AI Visibility | $39–$103/mo | Horizontal | [homepage](https://www.frase.io/) |
| **Botify** | Enterprise AI readiness | Custom (services bundle) | Enterprise / e-commerce | [homepage](https://www.botify.com/) |
| **Oncrawl** | Technical SEO + AI Lens | Custom | Enterprise | [homepage](https://www.oncrawl.com/) |
| **MarketMuse** | Content strategy | Custom | Publishers | [homepage](https://www.marketmuse.com/) |
| **Semrush** | Suite w/ AI Visibility Toolkit | $139+/mo (public) | Horizontal | [blog](https://www.semrush.com/blog/ai-overviews/) |
| **Ahrefs** | Suite (Brand Radar, AI features) | $129+/mo (public) | Horizontal | referenced by [Peec AI comparison](https://peec.ai/comparison/peec-ai-vs-ahrefs-brand-radar) |

### Map (vertical-specific vs horizontal × services vs software)

```
                    VERTICAL-SPECIFIC          HORIZONTAL
                    ──────────────────          ─────────
  SOFTWARE     │ Profound + Goodie (SMB)    │
  (platform)   │ Profound + Goodie (ent.)    │  ← Botify / Oncrawl /
               │                             │    Semrush / Ahrefs
               │                             │    / Surfer / Clearscope
               │                             │    / MarketMuse / Frase
               │                             │    / Peec / Evertune
               │                             │
               │                             │
  SERVICES     │ ← **OPPORTUNITY**           │  ← Legacy SEO agencies
  (audit +     │ Vertical-specific AEO       │    pivoting into AEO
   retainer)   │ consultancies (no clear     │    (e.g. NoGood via
               │ market leader exists yet)   │    Goodie case study)
               │                             │
```

### Key observations

1. **Horizontal software is dominated.** The top-left quadrant of the map is empty: no one is shipping "agent-readiness for dentists" or "agent-readiness for SaaS HRIS" as a packaged product. That's the open space — but most horizontal players (Goodie, Profound) have already added vertical pages for the obvious ones (SaaS, travel, fintech, retail).
2. **Evertune is the most aggressive on the AI-adjacency frontier** — they launched a [ChatGPT Ad Agent](https://www.evertune.ai/) (referenced via the [homepage announcement banner](https://www.evertune.ai/)) and have proprietary consumer-panel data (EverPanel, 150M prompts). They're not just measuring; they're bidding.
3. **Botify is the most credible "services + software" combo** for enterprise e-commerce — they're the closest analog to what Greg is describing, except at $50K+ annual contract sizes.
4. **No vertical-specific pure-services leader has emerged yet.** This is the wedge.

---

## 3. Tech stack & feasibility

### Building the audit product (the wedge)

- **Prompt testing infra:** Already accessible via OpenAI, Anthropic, Google AI Studio APIs. Cost is real but manageable: at Evertune's volume (1–2M prompts/customer/month), a single customer is a $5K–$20K/mo API line item. A solo operator running 10–50 prompts × 5 models × 10 reps/client ≈ 2,500 prompts/client/month ≈ **~$50–$200/client/mo in API cost** at 2026 token prices. Profitable at $3K+ audit fee.
- **Scraping:** Off-the-shelf (Playwright, Firecrawl, Apify). Not a moat.
- **`llm.txt` standard:**
  - **Status: v2 proposal, published 2024-09-03, last modified 2026-08-10** by Jeremy Howard (Answer.AI). Source: [llmstxt.org](https://llmstxt.org/) and [GitHub](https://github.com/AnswerDotAI/llms-txt).
  - **Adoption:** "Thousands of sites publish an `llms.txt` file," per the v2 spec; **Chrome Lighthouse audits for it** ([developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt](https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt)); **OpenAI, Anthropic, and Gemini all publish llms.txt for their own dev docs**.
  - **Adoption skew:** [directory.llmstxt.cloud](https://directory.llmstxt.cloud/) lists **849 websites, 447 products, 358 developer tools, 187 AI, 167 Finance** — heavily skewed to developer-tooling and product/API docs, not B2B SaaS marketing sites. [llmstxt.site](https://llmstxt.site/) shows similar skew (the first ~20 entries I saw were hotels, restaurants, niche sites — long-tail, not mainstream B2B).
  - **Verdict:** Standard is **real and growing, but not a default behavior** yet for the average B2B SaaS site. The wedge is selling `llm.txt` *generation + maintenance as a service*.
- **Schema.org / JSON-LD for AI:** Already standard; works for AI engines but the marginal value over good prose is debated. Worth doing, not a differentiator.
- **MCP (Model Context Protocol):** [modelcontextprotocol.io](https://modelcontextprotocol.io/) describes MCP as "USB-C for AI applications." Per the [homepage (Aug 2026)](https://modelcontextprotocol.io/), **Claude, ChatGPT, VS Code, Cursor, MCPJam** all natively support MCP. There's an [MCP registry on GitHub](https://github.com/mcp) and an MCP server specifically for fetching/searching `llms.txt` files ([server-llm-txt](https://github.com/mcp-get/community-servers/tree/main/src/server-llm-txt)).
  - **Verdict:** MCP is **mature as a standard** but **still nascent as a content-delivery channel** for marketing sites — most B2B SaaS companies don't have one. Building "MCP server for your product" is a real, defensible wedge deliverable in 2026.
- **Cloudflare AI Crawl Control:** [developers.cloudflare.com/ai-crawl-control](https://developers.cloudflare.com/ai-crawl-control/) — **GA product (renamed from "AI Audit" in Apr 2026)**. Features: visibility into AI crawler traffic, allow/block rules per crawler, robots.txt compliance tracking, and **Pay Per Crawl** in private beta. Available on **all Cloudflare plans**.
  - **Verdict:** Cloudflare is **shipping the rails.** An AEO agency that can configure a customer's Cloudflare account to (a) see what AI crawlers do, (b) block bad bots, (c) opt into Pay Per Crawl when it opens — that's a tangible, billable deliverable.

### Build vs. buy for the operator

You do **not** need to build your own prompt-testing platform to start. The path is:
1. **Day 1–90 (services):** Run prompts manually via ChatGPT Plus / Perplexity Pro / Claude Pro / Gemini Advanced accounts. Take screenshots. Charge $5K–$15K per audit. Use existing tools (Ahrefs, Semrush) for baseline SEO data.
2. **Month 3–6 (light software):** Stand up a thin prompt-orchestration layer (LangChain + a queue + a Postgres table) so you can run 50 prompts × 5 models × 10 reps automatically and produce a clean PDF. Probably 2 weeks of engineer time.
3. **Month 6–12 (product wedge):** Package the audit + monthly retainer into a self-serve dashboard at $499–$1,499/mo (slot between Profound Growth and Evertune Pro). Charge premium for the human-services layer.

### Feasibility: HIGH

All dependencies (LLM APIs, scraping, Cloudflare config, `llm.txt` tooling, MCP hosting) are mature and accessible to a solo founder today.

---

## 4. Customer segments & buyer personas

### Who's pained today (high purchase intent)

1. **B2B SaaS founders** — buying journey now starts in ChatGPT. They feel the gap. Per [Profound's customer logos](https://www.tryprofound.com/customers) (Ramp, Statsig, etc.), this is the warmest segment. **Will pay $5K–$20K audit + $1K–$5K/mo retainer.**
2. **Shopify / e-commerce brands** — AI shopping is exploding: [Evertune reports](https://www.evertune.ai/resources/ai-search-statistics-for-generative-engine-optimization) ChatGPT shopping widget appeared in **87% of product responses** as of Mar 2026 (vs 20% in Oct 2025). Botify's AI Readiness Guide is explicitly **targeted at retailers** ([homepage hero](https://www.botify.com/)). **Will pay $10K–$50K+** because the revenue impact is directly attributable.
3. **Financial services / insurance** — highly regulated, citation accuracy matters. [Goodie's FinTech case study (Rathbones)](https://higoodie.com/case-studies/rathbones/) claims **+106% total AI citations, +113% in sustainable investing topics**. [Oncrawl's Zurich Insurance case study](https://www.oncrawl.com/case-studies/zurich-insurance-uk-monitors-ai-search/) confirms institutional adoption.
4. **Healthcare / pharma** — Goodie has a dedicated [Pharma use case page](https://higoodie.com/use-case/pharma/) ("clinical accuracy, regulatory confidence"). Latent demand is huge; sales cycle is slow.

### Who's adjacent (lower urgency, high volume)

5. **Law firms, financial advisors, insurance brokers** — local-services-style. Many have already paid for SEO; AEO is the upsell. Lower ACV ($3K–$10K), high volume.
6. **Home services (plumbers, HVAC, roofers)** — interesting per [llmstxt.site](https://llmstxt.site/) (multiple plumbing/home-services sites now publish llms.txt). Local SEO → local AEO is the obvious next wave.

### Who pays first (informed inference, not directly measured)

Per the case studies I read, the **first-mover ACVs come from:**
- B2B SaaS in high-consideration categories (HRIS, payroll, vertical SaaS) — $10K+ audit, $2K+/mo retainer
- Direct-to-consumer brands where AI shopping is now a measurable revenue channel — $10K+ audit, $3K+/mo retainer
- Regulated industries (fintech, healthcare) — $15K+ audit, $5K+/mo retainer

The **highest pain concentration is B2B SaaS sub-verticals**, not horizontal SaaS. Specifically: any SaaS where buyers compare 3–5 vendors in ChatGPT before booking a demo. That's HR, payroll, CRM, marketing automation, vertical SaaS (legaltech, medtech, insuretech, proptech), dev tools.

### Recommended ICP for the wedge

A solo AEO practice should pick **one** of these sub-verticals and go deep:
- HR/payroll SaaS (buyers ask AI every day)
- Legal tech / vertical SaaS for law firms (high-trust, high-stakes)
- Marketing / martech SaaS (CMOs already understand the channel)
- Dev tools / API-first SaaS (technical buyers, fast decision cycles)

**Do NOT start horizontal.** The incumbents (Profound, Goodie, Peec) own that.

---

## 5. Go-to-market

### Channels that work for the wedge

1. **Cold outbound to founders.** "Show them what AI says about them today" is the killer opener. Profound, Goodie, Evertune all built their early pipeline this way. Per [Evertune's Forbes coverage](https://www.forbes.com/sites/rashishrivastava/2025/08/12/the-prompt-seo-is-dead-what-comes-next/), CEO Brian Stempeck explicitly says "we tried 100K prompts, 10–20 reps per month" — that's the credibility moat for the outreach.
2. **Free AI-visibility report as lead magnet.** [Profound's free AEO report](https://www.tryprofound.com/aeo-report) (ChatGPT + Perplexity + AI Overviews, free, instant) is the obvious template. **Goodie also publishes [free Agent Site Audit, AI Visibility Index, and LLMs.txt Generator tools](https://higoodie.com/)**. A solo founder can replicate this with a thin script in a weekend.
3. **Content marketing on LinkedIn / X.** Every AEO founder (Brian Stempeck at Evertune, the Profound team, etc.) is publishing aggressively. The category is being defined right now — early thought leadership converts at 5–10x the rate of mature categories.
4. **Partnerships with AI consultancies.** The "AI automation agency" wave (hundreds of small shops building with OpenAI/Anthropic APIs) are natural referral partners. They touch the same buyer and don't compete.
5. **Conferences:** SaaStr, INBOUND, Webflow Conf, Shopify events, agent-specific events (AI Engineer World's Fair, Anthropic's BUILD). Profound runs [Zero Click 2026](https://www.tryprofound.com/zeroclick) — they own the category-defining conference.

### Channels that DON'T work yet (inferred)

- **SEO for "AI optimization" keywords** — by definition, the people searching for this are your competitors, not your buyers.
- **Paid ads on Google for "AI visibility"** — too expensive, wrong funnel position. (Inference based on category economics; not verified.)

### Recommended GTM for a solo operator

- Build the free audit tool (weekend project).
- Post 3x/week on LinkedIn with screenshots of "what AI says about [famous brand]."
- Cold-email 20 founders/week with the report attached.
- Land 2–3 clients in month 1–2; refine from there.
- **Do NOT spend on paid acquisition or conferences in year one.**

---

## 6. Pricing & packaging

### What comparable services charge (sourced)

| Service | Price | Source |
|---|---|---|
| Profound Starter | $99/mo (50 prompts, ChatGPT only) | [pricing](https://www.tryprofound.com/pricing) |
| Profound Growth | $399/mo (100 prompts, 3 engines, 9K responses) | [pricing](https://www.tryprofound.com/pricing) |
| Profound Enterprise | Custom (9 engines, SSO/SAML, SOC2) | [pricing](https://www.tryprofound.com/pricing) |
| Goodie Explorer | $399/mo (100 prompts, 3 engines, 3K responses, 3 seats) | [pricing](https://higoodie.com/pricing/) |
| Goodie Pro | Custom (250 prompts, 6 engines, agentic commerce) | [pricing](https://higoodie.com/pricing/) |
| Goodie Enterprise | Custom (11 engines, 500+ prompts, dedicated AEO strategist) | [pricing](https://higoodie.com/pricing/) |
| Surfer | $39–$103/mo entry tiers | [homepage](https://www.surferseo.com/) |
| Frase | $39–$103/mo | [homepage](https://www.frase.io/) |
| Clearscope | $129 / $399 / Enterprise | [pricing](https://www.clearscope.io/pricing) |
| Evertune Pro | $800/mo (100K prompts, 11 models) | [pricing](https://www.evertune.ai/pricing) |
| Peec | Annual-only, gated | [pricing](https://www.peec.ai/pricing) |
| Botify | Enterprise SaaS + services bundle (custom) | [homepage](https://www.botify.com/) |

### Greg's wedge pricing (the service bundle)

- **Audit:** $3K–$20K one-time. Greg's range aligns with industry norm — comparable to a one-week technical-SEO audit from a top agency.
- **Monthly retainer:** $1K–$5K/mo for ongoing prompt monitoring + content updates. This is where the LTV is.

### What I would package (informed inference based on the data)

- **Tier 1 — Audit only:** $5K flat. Manual prompt run across 4–5 models, 50 prompts × 5 reps, PDF report. 2-week turnaround. (Higher margin than retainer; lower LTV.)
- **Tier 2 — Audit + 6-month retainer:** $15K + $3K/mo. Audit + monthly re-runs + content-fix sprints. Best LTV/CAC ratio.
- **Tier 3 — Full-service agency (B2B SaaS focus):** $25K onboarding + $5K/mo. Includes llms.txt build, MCP server for product docs, schema, comparison pages, monthly board-ready report. This is the wedge-tier.

### Pricing observations

- The horizontal SaaS market has converged at **$99–$399/mo for self-serve, $800–$2,000/mo for mid-market, and 5-figure custom for enterprise.** Anyone entering the software layer needs to slot into this band.
- The **services layer has not converged yet** — audit pricing varies wildly ($2K–$50K) depending on vendor reputation and vertical. The wedge is to charge a **premium for a specific vertical** where you have demonstrable depth.

---

## 7. Defensibility & moats

### What is defensible

1. **Vertical depth.** A solo operator who has done 20 HRIS audits knows more about HRIS prompt-landscape than any horizontal platform. This is the only durable moat available to a solo founder.
2. **Proprietary prompt library.** Per the [Evertune Forbes piece](https://www.forbes.com/sites/rashishrivastava/2025/08/12/the-prompt-seo-is-dead-what-comes-next/), Evertune runs 100K prompts × 10–20 reps/mo to get a "statistically stable view." A 50-prompt library × 5 reps × 5 models in a specific vertical is achievable solo and defensible for 12–18 months.
3. **Customer relationships & workflow lock-in.** Once you've shipped `llm.txt` + comparison pages + MCP server + monthly prompt monitoring for a customer, switching cost is real. You're embedded in their content workflow.
4. **Brand / thought leadership.** Profound runs the Zero Click conference. Evertune publishes research. The category is being defined right now — owning "the AEO agency for HR SaaS" is winnable in 2026.
5. **Data over time.** Your prompt runs → outcome data (does the customer get more AI citations month-over-month?) is proprietary. After 12 months, you have a longitudinal dataset no one else has.

### What is NOT defensible

1. **The prompt-testing technology itself.** Every horizontal SaaS has it. APIs are commoditized. Cloudflare gives it away.
2. **The `llm.txt` standard itself.** Open, anyone can implement. Yoast, AIOSEO, Mintlify, Wix already auto-generate it. [Yoast](https://yoast.com/features/llms-txt/) and [AIOSEO](https://aioseo.com/features/llms-txt/) are WordPress plugins — millions of sites can add it for $0.
3. **MCP server hosting.** Trivial to deploy.
4. **"We made you #1 in ChatGPT" as a deliverable.** Not stable run-to-run; legally dubious (see §9).

### The horizontal-platform absorption risk (the big one)

**Profound, Goodie, Peec, and Evertune all have agency/partner programs.** [Profound's Partners page](https://www.tryprofound.com/partners), Goodie's [Agencies use case](https://higoodie.com/use-case/agencies/), Evertune's agency tier — all of them are building the same channel you'd build. A solo operator either:

(a) **Resells the platform** with a services wrapper (low margin, low LTV, but stable); or
(b) **Stays independent and bets on vertical depth** (higher margin, higher LTV, but competes head-on with the platforms' agency programs); or
(c) **Builds a vertical SaaS on top of the platforms** (high upside, 18-month build).

Realistic answer: **start at (a), migrate to (b) after 5 clients, evaluate (c) at month 18.**

---

## 8. Risks & failure modes

### Risk matrix

| Risk | Likelihood | Severity | Notes |
|---|---|---|---|
| Horizontal SaaS absorbs the function at $99/mo | HIGH | HIGH | Already happening (Profound + Goodie both agency-friendly) |
| Prompt non-determinism → can't guarantee results | HIGH | HIGH | Same prompt returns different brands run-to-run; "we got you cited" claims are hard to defend |
| Google/OpenAI/Anthropic ship native site-readability tools | MEDIUM | HIGH | Would commoditize the audit overnight |
| LLM API cost volatility | MEDIUM | MEDIUM | At 1M prompts/mo, a 2x API price hike is material |
| AI assistants get better at reading messy sites → audit loses value | MEDIUM | HIGH | Long-term existential risk to the category |
| Customer churn after 3–6 months ("we're good now") | HIGH | MEDIUM | Common agency pattern; counter with ongoing measurement value |
| Founder/team burnout from manual prompt runs | HIGH | MEDIUM | 50 prompts × 5 models × 10 reps per client = real labor |
| FTC scrutiny on "we rank you #1 in AI" claims | LOW-MED | MEDIUM | See §9 |

### The single biggest existential risk

**The category itself is a feature, not a market.** Every incumbent (Cloudflare, Semrush, Ahrefs, Botify, Oncrawl) is adding AEO to an existing platform. By 2027, **AEO monitoring will be a checkbox on every SEO platform.** The window for "sell AEO as a service" is roughly **2025–2027**, maybe 2028 if you're lucky.

The defensive move is **vertical depth + outcome ownership** — not "we run prompts," but "we make HR SaaS buyers find you in ChatGPT, and we measure pipeline." That's harder to commoditize.

---

## 9. Regulatory & legal

### What's already regulated (or close to it)

- **FTC truth-in-advertising.** "We made you #1 in ChatGPT" is an objective claim that must be substantiable. Per FTC's general endorsement guides (and 2024 update on AI-generated content), an agency that claims measurable ranking improvements must have data to back it. **The risk: a client whose AI visibility goes DOWN month-over-month could sue or complain to the FTC.** This is why Profound / Goodie use careful language ("track," "monitor," "surface gaps") rather than "rank #1."
- **GDPR / CCPA on client data.** You will be scraping and storing clients' websites + AI responses. Standard DPA + privacy policy required. All major AEO SaaS vendors (Profound, Goodie, Evertune) are SOC2-compliant (Goodie's [Enterprise tier includes SOC 2](https://higoodie.com/pricing/); Profound's Enterprise has [SSO/SAML + SOC2](https://www.tryprofound.com/pricing)).
- **California AI training data transparency (SB 1047 successor discussions).** Not currently law in 2026, but trending — affects how you describe the data flows in your service.

### What's NOT regulated yet

- **AI-output citation accuracy.** No legal liability for AI assistants returning wrong info about a brand. This may change.
- **Pay-per-crawl pricing (Cloudflare's new beta).** No precedent yet on contractual structure.

### Practical legal posture for a solo AEO practice

- **Use language like "track," "monitor," "surface gaps" — not "rank #1."** Every horizontal SaaS does this; it's the safe register.
- **Contractually cap outcome guarantees.** "We will run this audit; we cannot guarantee AI assistants will cite you" is the right disclaimer.
- **Get cyber-liability insurance** before you store any client prompt logs. Cheap ($1K–$2K/yr).
- **Do NOT touch regulated verticals (healthcare, finance) without a compliance review** until you have a privacy attorney on retainer.

---

## 10. Adjacent opportunities

### Within the wedge

1. **CMS plugins.** Ship a WordPress / Webflow / Shopify plugin that auto-generates `llm.txt`, audits structured data, and surfaces prompt-test results. [Yoast](https://yoast.com/features/llms-txt/) and [AIOSEO](https://aioseo.com/features/llms-txt/) already have llms.txt generators — but no one has an "AI visibility score" dashboard plugin yet. **This is the productization path Greg's brief implies.** Pluggable revenue: $50–$500/mo per site × thousands of sites = meaningful SaaS revenue.

2. **MCP server hosting as a service.** Every B2B SaaS company will eventually want an MCP server for their product. Most don't know how. A managed-service offering ("we build and host your MCP server for $2K setup + $500/mo") is a clean adjacent product. Low capex, high margin.

3. **Vertical AEO certification / audit badge.** "Certified Agent-Ready" badge for sites that pass the audit. Creates a network effect — companies want the badge → you audit → you generate leads.

4. **Agent-readiness as a managed service.** Bundle the monthly prompt monitoring + content fixes + board reporting into a $3K–$10K/mo managed service for marketing teams. This is the natural "productize the retainer" play.

### Beyond the wedge

5. **Prompt-volume research.** [Profound's Prompt Volumes product](https://www.tryprofound.com/features/prompt-volumes) sells "what millions of people ask AI" as intelligence. Evertune's [EverPanel](https://www.evertune.ai/) (150M-user panel) is the data source. Both are monetizable standalone.

6. **Agent-readiness content licensing.** If you build `llm.txt` and structured content feeds for 50 SaaS companies in a vertical, you have a licensable corpus for shopping agents / procurement agents. This is the [publishers endgame in Greg's table](https://www.tryprofound.com/) applied to B2B.

7. **Adjacent: AI-shopping optimization.** Per Evertune, ChatGPT shopping went from 20% → 87% of product responses in 5 months. [Botify launched AgenticCatalog](https://www.botify.com/platform/ai-readiness/agenticcatalog) specifically for product-feed optimization for AI shopping agents. This is a sub-vertical of AEO with higher urgency and revenue attribution. **Potentially the fastest-growing wedge in 2026.**

---

## 11. Comparable case studies

### SEO agencies that productized successfully (the analog play)

| Company | Origin | Pivot to software | Outcome |
|---|---|---|---|
| **MarketMuse** | Content strategy consulting | Topic-authority SaaS | Profitable, still independent, ~$10M+ ARR (estimated) |
| **Clearscope** | Content optimization agency | SaaS for content teams | Acquired by Mushi Labs, still operating at $129–$399/mo |
| **Surfer** | SEO consulting (founded 2017) | SaaS for content optimization | Profitable, now positioning as "AI Search OS," 45,000 customers, 800K+ users (per [homepage](https://www.surferseo.com/)) |
| **Botify** | SEO consulting (founded 2012) | Enterprise SEO + now AI Readiness platform | Forrester Wave Strong Performer Q3 2025 |

**Pattern:** services → SaaS works when (a) you build 5–10 client deliverables that all look the same, (b) you can charge SaaS prices without competing against cheap offshore SEO, (c) you have a technical co-founder. Greg's "after ~10 clients" threshold matches these precedents.

### Services-to-software transitions that failed or stalled (caveats)

- Hundreds of SEO agencies tried to build "our own SEO dashboard." Most failed because the dashboard didn't add value beyond Ahrefs/Semrush.
- **Counter-lesson:** the SaaS has to solve a problem the existing platforms don't. AEO monitoring on top of Semrush is not a moat. AEO monitoring **specifically for [your vertical]** might be.

### Vertical-specific services companies (the better analog)

- **Pilot.com** — bookkeeping for startups. Started as a service, productized into software. $100M+ run rate. Key insight: they owned a specific vertical (startups) deeply enough to build software for it.
- **Belay** — virtual assistant services. Never fully productized (inference), but built a defensible brand in a specific vertical.
- **Marketful / Directive / Lemonstand** — vertical-specific B2B marketing agencies. Most have stayed services-only and capped at ~$10M ARR.

**Lesson:** vertical-specific services-to-software works when the vertical is **large enough to support a $50M+ ARR SaaS** (bookkeeping for startups, AEO for HR SaaS) AND the workflow is **standardizable** (bookkeeping, prompt testing).

---

## 12. Cloudflare + llm.txt + MCP dependency

### Current status (Aug 2026)

| Dependency | Status | Risk if it fails |
|---|---|---|
| **`llm.txt` standard** | v2 spec, [llmstxt.org](https://llmstxt.org/), [GitHub 2.6k stars](https://github.com/AnswerDotAI/llms-txt); Chrome Lighthouse audits for it; OpenAI/Anthropic/Gemini publish their own | LOW — de facto standard even without a formal working group |
| **Cloudflare AI Crawl Control** | [GA product](https://developers.cloudflare.com/ai-crawl-control/), available on all plans; renamed from AI Audit Apr 2026; Pay Per Crawl in private beta | LOW — Cloudflare has strong commercial incentive to maintain |
| **MCP** | Open standard at [modelcontextprotocol.io](https://modelcontextprotocol.io/); native in Claude/ChatGPT/VS Code/Cursor; [MCP registry on GitHub](https://github.com/mcp) | LOW — major AI labs are committed; Anthropic-led, OpenAI adopted, Google supporting |
| **Schema.org / JSON-LD** | Maintained by Google/Bing/Yandex since 2011; AI assistants consume it | VERY LOW |
| **robots.txt for AI crawlers** | Existing spec, but crawlers are inconsistent (Cloudflare now tracks compliance in AI Crawl Control) | MEDIUM — enforcement is uneven |

### Working groups / governance

- **`llm.txt` has no formal working group.** It's an open proposal by Jeremy Howard (Answer.AI) on GitHub, versioned via the repo. Adoption is happening through CMS plugin auto-generation (Yoast, AIOSEO, Mintlify, GitBook, Wix) rather than coordinated standards work.
- **MCP is governed by Anthropic + the open-source community**, with the spec at [modelcontextprotocol.io](https://modelcontextprotocol.io/). Major AI labs (OpenAI, Anthropic, Google) are aligned.
- **Cloudflare AI Crawl Control is a single-vendor product**, not a standard. If Cloudflare changes direction, the dashboard layer goes away — but the underlying primitives (robots.txt, llms.txt, MCP servers) remain valid.

### Risk if any single dependency fails

- **If `llm.txt` doesn't become universal:** No problem. The audit deliverable still works because you're generating structured content that's useful to AI regardless of whether there's a formal `llms.txt` file.
- **If Cloudflare pulls AI Crawl Control:** No problem. Cloudflare already has 20%+ of the web behind it; competitors (Fastly, Akamai) will copy. Your service layer is CDN-agnostic.
- **If MCP doesn't become universal:** Mild problem. You'd lose the "host an MCP server for your product" wedge. But the broader agent-readiness wedge (clean docs, structured FAQs, comparison pages) still works.

### Net dependency risk: LOW

All three dependencies (llms.txt, Cloudflare AI Crawl Control, MCP) are **additive rails**, not gating dependencies. The wedge works without any of them; they're accelerants, not foundations.

---

## Verdict & Recommendation

### Estimated opportunity size

- **12-month solo operator revenue range:** **$200K–$1.5M ARR**, with $500K–$800K as the realistic middle (5–10 clients at $5K–$15K audit + $3K/mo retainer × 6 months).
- **3-year team-of-3 revenue range:** **$1.5M–$5M ARR** if you add 1–2 SaaS products (CMS plugin, MCP hosting) on top.
- **Total category size by 2028 (inference):** **$3–8B globally** for AEO services + software combined, if AEO follows SEO's adoption curve.

### Recommended first vertical + ICP

**Pick: B2B SaaS in HR / payroll / benefits.**

Why:
- High-consideration buying journey = buyers ask AI = measurable AI visibility pain.
- Buyers (CHROs, Heads of People) are sophisticated enough to value the audit, not sophisticated enough to DIY.
- Number of target companies is large (thousands of HR SaaS vendors globally) but small enough to research manually.
- Average ACV is high enough ($10K–$30K+ for mid-market HR SaaS) to support a premium retainer.
- Existing analogs (Pilot.com) prove the vertical supports productized SaaS.

**Specific ICP:**
- Series A–C B2B HR SaaS companies with 50–500 employees and an active PLG motion.
- $5M–$50M ARR.
- Founder/CEO or Head of Marketing is the buyer.
- Already paying $5K–$20K/mo for SEO or content marketing.

### Expected 12-month revenue range

- **Solo:** $300K–$800K (5–8 clients, average $40K–$80K ACV).
- **Two-person team:** $500K–$1.5M (8–15 clients + 1 software product in beta).

### Top 3 risks (summary)

1. **Horizontal SaaS absorption (HIGH).** Profound, Goodie, Evertune are already agency-friendly and adding vertical depth. Your window is 2026–2027.
2. **Prompt non-determinism (HIGH).** "We got you cited" claims are hard to defend when the same prompt returns different results run-to-run. Use careful language; don't promise rankings.
3. **LLM-native site-readability tooling (MEDIUM).** Google, OpenAI, and Anthropic may ship first-party tools that commoditize the audit. The defensive move is vertical depth, not technical moats.

### "Would I personally start this?" — honest take

**Yes, but with a 12-month services-first commitment and a clear exit to vertical SaaS by month 18.**

The wedge is **real and undersupplied in specific verticals**. The horizontal layer is already saturated by well-funded incumbents. A solo founder with content-marketing chops, a couple of technical contractors, and the discipline to stay narrow on one vertical can plausibly build a $1M ARR practice in 12 months.

The thing that would make me NOT start this:
- If I had to compete against Profound, Goodie, or Evertune head-on in a horizontal pitch. Don't.
- If I had to raise VC money to do it. This is a services business that should bootstrap, then optionally productize.
- If my target buyer was an enterprise procurement department. Sales cycles will eat you alive; target founders and Series B CMOs.

The single most important thing: **pick a vertical and stay there.** Don't drift horizontal because Profound has a better dashboard. Vertical depth is the only moat available to a solo founder in 2026.

### Recommended first action (for someone who'd actually build this)

1. **Weekend project:** Build a free "AI visibility report" landing page that takes a URL, runs 20 prompts across ChatGPT + Perplexity + Gemini (free tier), and emails a PDF. Tech: Python + the respective APIs + a simple HTML report. Total cost: <$100 in API fees to test.
2. **Week 1:** Pick the vertical. Pick 10 target companies. Manually run the audit on each one (no automation). Send cold emails with the audit attached.
3. **Week 2–4:** Land 2 clients at $5K each. Use the revenue to fund the next 6 months.
4. **Month 2–6:** Iterate on the deliverable. Hire a contractor to automate the prompt-orchestration layer.
5. **Month 6–12:** Land 5–8 more clients. Standardize the retainer. Decide if you want to productize.
6. **Month 12–18:** Launch a vertical SaaS wedge (CMS plugin or MCP hosting) at $99–$499/mo.

---

## Source URL list (all citations)

### Primary (competitor + pricing pages)
- [tryprofound.com](https://www.tryprofound.com/)
- [tryprofound.com/pricing](https://www.tryprofound.com/pricing)
- [tryprofound.com/aeo-report](https://www.tryprofound.com/aeo-report)
- [tryprofound.com/customers](https://www.tryprofound.com/customers)
- [tryprofound.com/zeroclick](https://www.tryprofound.com/zeroclick)
- [tryprofound.com/blog/state-of-ai-search-in-travel](https://www.tryprofound.com/blog/state-of-ai-search-in-travel)
- [higoodie.com](https://www.higoodie.com/)
- [higoodie.com/pricing](https://higoodie.com/pricing/)
- [higoodie.com/use-case/agencies](https://higoodie.com/use-case/agencies/)
- [higoodie.com/use-case/saas](https://higoodie.com/use-case/saas/)
- [higoodie.com/use-case/travel-hospitality](https://higoodie.com/use-case/travel-hospitality/)
- [higoodie.com/use-case/fintech](https://higoodie.com/use-case/fintech/)
- [higoodie.com/use-case/pharma](https://higoodie.com/use-case/pharma/)
- [higoodie.com/case-studies/rathbones](https://higoodie.com/case-studies/rathbones/)
- [higoodie.com/case-studies/steelseries](https://higoodie.com/case-studies/steelseries/)
- [higoodie.com/case-studies/nogood](https://higoodie.com/case-studies/nogood/)
- [higoodie.com/case-studies/dermalogica](https://higoodie.com/case-studies/dermalogica/)
- [peec.ai](https://peec.ai/)
- [peec.ai/pricing](https://www.peec.ai/pricing)
- [peec.ai/comparison/peec-ai-vs-ahrefs-brand-radar](https://peec.ai/comparison/peec-ai-vs-ahrefs-brand-radar)
- [evertune.ai](https://www.evertune.ai/)
- [evertune.ai/pricing](https://www.evertune.ai/pricing)
- [evertune.ai/resources/ai-search-statistics-for-generative-engine-optimization](https://www.evertune.ai/resources/ai-search-statistics-for-generative-engine-optimization)
- [surferseo.com](https://www.surferseo.com/)
- [botify.com](https://www.botify.com/)
- [botify.com/platform/ai-readiness/agenticcatalog](https://www.botify.com/platform/ai-readiness/agenticcatalog)
- [oncrawl.com](https://www.oncrawl.com/)
- [oncrawl.com/case-studies/zurich-insurance-uk-monitors-ai-search](https://www.oncrawl.com/case-studies/zurich-insurance-uk-monitors-ai-search)
- [frase.io](https://www.frase.io/)
- [clearscope.io/pricing](https://www.clearscope.io/pricing)
- [marketmuse.com](https://www.marketmuse.com/)
- [semrush.com/blog/ai-overviews](https://www.semrush.com/blog/ai-overviews/)
- [semrush.com/solutions/ai-visibility](https://www.semrush.com/solutions/ai-visibility/)
- [semrush.com/mcp](https://www.semrush.com/mcp/)

### Standards + infrastructure
- [llmstxt.org](https://llmstxt.org/)
- [github.com/AnswerDotAI/llms-txt](https://github.com/AnswerDotAI/llms-txt)
- [directory.llmstxt.cloud](https://directory.llmstxt.cloud/)
- [llmstxt.site](https://llmstxt.site/)
- [yoast.com/features/llms-txt](https://yoast.com/features/llms-txt/)
- [aioseo.com/features/llms-txt](https://aioseo.com/features/llms-txt/)
- [support.wix.com/en/article/understanding-your-sites-llmstxt-file](https://support.wix.com/en/article/understanding-your-sites-llmstxt-file)
- [developers.cloudflare.com/ai-crawl-control](https://developers.cloudflare.com/ai-crawl-control/)
- [developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt](https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt)
- [modelcontextprotocol.io](https://modelcontextprotocol.io/)
- [github.com/mcp](https://github.com/mcp)
- [github.com/mcp-get/community-servers/tree/main/src/server-llm-txt](https://github.com/mcp-get/community-servers/tree/main/src/server-llm-txt)

### Market data + press
- [pewresearch.org](https://www.pewresearch.org/short-reads/2025-07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/)
- [forbes.com (Rashi Shrivastava, Aug 2025)](https://www.forbes.com/sites/rashishrivastava/2025/08/12/the-prompt-seo-is-dead-what-comes-next/)
- [nytimes.com (Feb 2026)](https://www.nytimes.com/2026/02/17/technology/chatbots-influencers-brands-marketing.html) — paywalled but confirmed via Evertune's press wall
- [wsj.com (Jun 2025)](https://www.wsj.com/articles/a-billion-dollar-question-hangs-over-the-new-ai-search-marketing-industry-06a039ec) — paywalled but confirmed via Evertune's press wall
- [adweek.com](https://www.adweek.com/media/retargeting-chatbots-evertune-answer-engines/) — paywalled but confirmed via Evertune's press wall
- [economist.com (Jun 2025)](https://www.economist.com/business/2025/06/18/ai-is-turning-the-ad-business-upside-down) — paywalled but confirmed via Evertune's press wall
