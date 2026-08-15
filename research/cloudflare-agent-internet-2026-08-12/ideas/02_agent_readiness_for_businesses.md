# Startup Idea 2 — Agent Readiness for Businesses

> Source: Greg Isenberg, "Cloudflare will make 1000+ AI millionaires"
> Video: https://www.youtube.com/watch?v=MNNfat_QP0E
> Transcript timestamp reference: 17:12 – 23:42 ("Startup Idea 2: Agent Readiness for Businesses")

## One-line pitch
Help companies become easy for agents to understand, trust, compare, and recommend. "SEO for the agent internet."

## Why this exists
Agents are compressing the B2B buying journey. When a user asks an assistant *"find me the best payroll provider for a 15-person company in California,"* the agent needs to answer: who's this for, what does it cost, what does it replace, what integrations, what risks, what implementation, what do customers say, how does it compare to alternatives.

**The problem:** Most B2B websites make this hard. They:
- Hide pricing
- Bury docs in PDFs
- Don't update pages regularly
- Have stale comparison pages
- Use foggy copywriting ("unlock operational excellence")

## Wedge — the paid audit
1. Pick **one vertical**. (B2B SaaS is obvious; also Shopify apps, law firms, healthcare clinics, financial advisors, insurance brokers, home services.)
2. Run **20–50 buyer-intent prompts** across major AI tools. Example prompts:
   - "What is the best software for [use case]?"
   - "Compare [company] to top alternatives."
   - "What does [company] cost?"
   - "Who is this product best for?"
   - "What are the risks of choosing this vendor?"
   - "Would you recommend this product for a 20-person company?"
   - "What integrations does it support?"
3. Show the founder the AI answers. **That's the sales moment.** Common findings:
   - "When buyers ask AI for your category, you do not show up."
   - "You show up but AI gets your pricing wrong ($20/mo on site, $8/mo in answers)."
   - "AI recommends your competitor because their docs are cleaner."
   - "The answer is on your site but buried in a 2002 PDF."
4. Sell the fix.

## The fix — agent-readable source of truth
A deliverable bundle that includes some/all of:
- Clean `llm.txt` file
- Better documentation structure
- Pricing page agents can parse
- Honest, specific comparison pages
- Use-case pages in plain language
- Customer proof organized by segment
- Structured FAQs around real buyer questions
- Schema markup
- Product feed
- Changelog
- Lightweight MCP server or search endpoint (only if the company has enough content)

## The recurring product — measurement loop
Every month, rerun the prompts. Track:
- Are AI answers more accurate?
- Does the company appear more often?
- Do competitor comparisons improve or get worse?
- Where does the site need more structured proof?

## Pricing
- SMB: **$3,000–$10,000** for the audit + cleanup
- Larger B2B: **$10,000–$20,000**
- Recurring measurement loop: monthly retainer

## Productization path (services → software)
After ~10 clients in the same niche, patterns emerge:
- Same docs are missing
- Same pricing pages are unclear
- Same questions matter
- Same structured files need to be created
- Same monthly report needs to be delivered

→ Turn repeated work into software.

## Sales motion
**"You're not selling the future. You're selling the screenshot."**
- Show them what AI says about their company today.
- That screenshot is the whole sales deck.

## Vertical-specific endgame
| Vertical | Endgame product |
|---|---|
| Local businesses | Let AI assistants book appointments with you |
| E-commerce | Make your product catalog easy for shopping agents to compare and buy |
| B2B SaaS | Make your product easy for procurement agents to evaluate |
| Publishers | Make your archive easy for AI systems to understand and license |

## Competitive landscape (from transcript — unverified)
Greg claims horizontal products are already emerging, but the opportunity is to **go extremely vertical** (B2B SaaS is too broad — pick a sub-vertical).

## Why-now
- AI assistants are now default surface for product research (ChatGPT, Perplexity, Claude, Gemini, Copilot).
- Many companies are feeling the pain but don't know what to fix.
- Day-one cash flow; productize over time.

## Key risks / open questions
- How durable is this — when AI assistants improve their web understanding, does the audit become a commodity?
- Tooling (llm.txt, schema, MCP) is still standardizing — risk of building on a moving target.
- Defensibility after productization: data + workflow lock-in vs. horizontal platforms.