# Strategic Analysis — How to Build a Better Website-Building Service for Iraq

**Date:** 2026-07-13
**Based on:** Competitor database (`01_competitor_database.md`) + research report (`share/notes/01_research_T-2026-07-13-001.md`)
**Author:** agents_manager master

---

## Table of Contents

1. [Market Overview](#1-market-overview)
2. [Gap Analysis — What's Missing in Iraq](#2-gap-analysis--whats-missing-in-iraq)
3. [Head-to-Head Comparison Matrix](#3-head-to-head-comparison-matrix)
4. [Differentiation Strategy by Competitor Type](#4-differentiation-strategy-by-competitor-type)
5. [Learning from Each Competitor Type](#5-learning-from-each-competitor-type)
6. [Recommended Feature Set (MVP)](#6-recommended-feature-set-mvp)
7. [Pricing Strategy — One-Time Payment Model](#7-pricing-strategy--one-time-payment-model)
8. [Service Model — Hybrid Self-Serve + WhatsApp](#8-service-model--hybrid-self-serve--whatsapp-assisted)
9. [Risk Mitigation Roadmap](#9-risk-mitigation-roadmap)
10. [Key Takeaways & Action Items](#10-key-takeaways--action-items)

---

## 1. Market Overview

### Iraq's Digital Landscape

| Metric | Value |
|--------|-------|
| Internet users | **38+ million** (81.7% penetration) |
| Mobile broadband | **82.9%** of connections |
| Facebook users | **20.1 million** |
| TikTok users | **34.3 million** |
| Instagram users | **19 million** |
| CMS market share — WordPress | **~55%** |
| CMS market share — Wix (SMEs) | **~45%** |
| Average website build cost | **~$1,200 (1,750,000 IQD)** |
| Local payment methods | Zain Cash, Qi Card, AsiaPay, cash |

*Sources: DataReportal, DMC Iraq, data.stateglobe.com, Xinhua/ITU (2025-2026)*

### Market Structure

```
                    Iraqi Website Building Market
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
   Custom Agencies    International           Freelancers
   (30+ companies)    Platforms (10+)    (Thousands on FB/IG/TikTok)
   $800-$3,000+       $3-$39/mo          $100-$1,000
        │                   │                   │
        └───────────────────┼───────────────────┘
                            │
                     ❌ NO SELF-SERVE
                       IRAQI BUILDER
```

### The Core Problem

The Iraqi market has a **missing middle**:
- **Agencies** are too expensive ($1,200+) and slow for small businesses
- **International platforms** are too generic (no Arabic-first UX, no local payments, no local support)
- **Freelancers** are unreliable (variable quality, no accountability)
- **No local self-serve platform** exists to fill the gap

---

## 2. Gap Analysis — What's Missing in Iraq

| Gap | Current State | Opportunity |
|-----|---------------|-------------|
| **Iraqi self-serve builder** | None exists | Build the first Iraqi drag-and-drop website builder |
| **Arabic-first UX** | International platforms offer Arabic as an afterthought (RTL bugs, English admin) | Full Arabic-first (and Kurdish-support) interface from day one |
| **Local payment integration** | No platform integrates Zain Cash, Qi Card, or AsiaPay | Pre-built local payment gateways are our biggest moat |
| **WhatsApp-assisted support** | No platform offers local-language, real-time human help | Hybrid model bridges the trust + digital literacy gap |
| **Iraqi-specific templates** | All templates are generic global designs | Templates for Iraqi restaurants, real estate, retail shops, clinics, schools |
| **Transparent pricing** | All local agencies are quote-based | Fixed, transparent one-time pricing — **the user's chosen model** |
| **Mobile-first, lightweight** | International platforms are desktop-first, heavy | 82.9% mobile — build PWA, lightweight, optimized for 4G |
| **Kurdish language support** | No platform offers Kurdish (Sorani/Kurmanji) | Differentiator for the KRI market (Erbil, Sulaymaniyah, Duhok) |
| **Local SEO integration** | No platform pre-integrates with Iraqi business registries, Google Maps Iraq, local directories | Automated local SEO setup for Iraqi businesses |

---

## 3. Head-to-Head Comparison Matrix

| Dimension | Our Service (Proposed) | Iraqi Agencies | Wix / WordPress | Freelancers | Wuilt (Future) |
|---|---|---|---|---|---|
| **Pricing** | One-time payment (transparent) | $800-3,000+ (opaque) | $3-39/mo (subscription) | $100-1,000 (variable) | Free core + paid add-ons |
| **Arabic UX** | ✅ Full (Arabic + Kurdish) | ✅ Arabic | ❌ Partial / RTL bugs | ✅ Varies | ✅ Arabic-first |
| **Kurdish Support** | ✅ Sorani + Kurmanji | ❌ Rare | ❌ No | ❌ No | ❌ Unlikely |
| **Self-Service** | ✅ Drag-and-drop builder | ❌ Custom dev only | ✅ Yes | ❌ Custom dev | ✅ Yes |
| **Local Payments** | ✅ Zain Cash, Qi Card, AsiaPay | ❌ Not integrated | ❌ No | ❌ No | ❌ No (Egypt only) |
| **Mobile Optimization** | ✅ Mobile-first PWA | 🟡 Varies | 🟡 Desktop-first | 🟡 Varies | 🟡 Unknown |
| **WhatsApp Support** | ✅ Integrated | 🟡 Phone/email | ❌ Chatbot/email | ✅ Direct chat | ❌ Unknown |
| **Local Templates** | ✅ Iraqi-specific | 🟡 Custom per client | ❌ Generic | 🟡 Custom | ❌ Generic MENA |
| **Local SEO** | ✅ Pre-built for Iraq | 🟡 Manual setup | ❌ Generic | 🟡 Varies | ❌ Generic |
| **Speed to Launch** | Hours to days | Weeks to months | Hours to days | Days to weeks | Hours to days |
| **Quality Guarantee** | ✅ Platform quality | ✅ Agency quality | 🟡 Depends on user | ❌ No guarantee | 🟡 Platform quality |
| **Trust / Brand** | Local Iraqi brand | Local Iraqi brand | International | Individual | Egyptian brand |
| **Offline / Low-BW** | ✅ Lightweight PWA | ❌ Not optimized | ❌ Heavy pages | ❌ Varies | ❌ Unknown |

**Legend:** ✅ Strong advantage, 🟡 Neutral/varies, ❌ Weakness/absent

---

## 4. Differentiation Strategy by Competitor Type

### 4.1 How to Beat Iraqi Agencies

**Their strengths:** Trusted local brands, face-to-face relationships, full-service (design + dev + hosting + maintenance), Arabic-speaking, understand local business needs.

**Our advantages:**
- **Price:** $199-999 one-time vs. $1,200-3,000+
- **Speed:** Launch in hours vs. weeks
- **Transparency:** Fixed pricing vs. opaque quoting
- **Self-serve:** User controls their site vs. agency dependency

**Strategy:**
1. Position as "the DIY alternative to expensive agencies" — same local quality, 10x cheaper, 10x faster
2. Offer WhatsApp-assisted building as a bridge for users who want agency-level support without agency-level pricing
3. Target the small business owner who currently can't afford an agency but needs more than a Facebook page
4. Partner with agencies as white-label providers (let them use our platform for their clients) — turn them from competitors into distribution channels

### 4.2 How to Beat Wix / WordPress / International Platforms

**Their strengths:** Global brand recognition, massive template libraries, huge ecosystems (plugins, apps, community), AI-powered features (Wix ADI), free tiers.

**Our advantages:**
- **Arabic-first UX:** Full Arabic + Kurdish interface, not a translation layer
- **RTL-native design:** Every template built RTL-first, not converted
- **Local payment gateways:** Zain Cash, Qi Card, AsiaPay pre-installed
- **Local support:** Arabic/Kurdish WhatsApp support vs. English chatbot
- **Local templates:** Iraqi restaurant menus, Iraqi real estate listings, Iraqi business registry integration
- **Lower cost:** One-time payment vs. ongoing subscription

**Strategy:**
1. Don't compete on feature breadth — compete on **local relevance**
2. A small business in Baghdad doesn't need 500 Wix templates; they need 10 templates that look like Iraqi businesses
3. Emphasize "built for Iraq, runs on Iraqi internet, accepts Iraqi money"
4. Target the user who tried Wix in English, hit RTL bugs, and gave up
5. Offer a migration tool: import from WordPress/Wix to our platform

### 4.3 How to Beat Freelancers

**Their strengths:** Lowest price ($100-1,000), direct communication, flexible, personalized service.

**Our advantages:**
- **Quality guarantee:** Platform-quality templates vs. freelancer skill variance
- **Accountability:** A company they can hold responsible vs. an individual who might disappear
- **Reliability:** The platform stays up vs. the freelancer might get busy
- **Support:** Team support vs. one person

**Strategy:**
1. Don't try to compete on price — freelancers will always be cheaper
2. Compete on **trust + reliability** — position as "more than a freelancer, less than an agency"
3. The WhatsApp-assisted model directly competes with the freelancer's value prop (personal touch) while adding platform reliability
4. Create a "freelancer marketplace" tier — let verified Iraqi freelancers build sites on our platform for clients, we take a cut

### 4.4 How to Prepare for Wuilt

**Their strengths:** VC-backed ($2M), proven free model (working in Egypt), Arabic-first, expanding aggressively, first-mover advantage in MENA self-serve.

**Our advantages:**
- **Iraq-specific:** Local payments, Kurdish language, local business templates, Iraqi internet optimization
- **Hybrid model:** WhatsApp support that Wuilt may not offer
- **User's payment relationships:** Existing gateway relationships (Zain Cash, Qi Card, AsiaPay)
- **Bootstrapped focus:** Wuilt needs growth (VC pressure); we can focus on quality

**Strategy:**
1. **Monitor closely.** Wuilt is expanding to UAE (Q4 2025) and GCC/Turkey (Q1 2026). If they enter Iraq, expect it within 12-18 months.
2. **Build moats before they arrive:**
   - Local payment integrations (hardest to replicate)
   - Kurdish language support
   - Iraqi business registry connections
   - Local telecom relationships (if pursued)
3. **Don't compete on free.** A one-time payment model is different from Wuilt's free-core model. Don't try to out-free them — out-local them.
4. **If they enter Iraq,** lean hard into what they can't replicate: local support, local business knowledge, local partnerships.
5. **Consider a dual strategy:** if Wuilt's expansion proves successful, consider a free tier to match them, funded by payment processing fees (where the user already has gateway relationships).

---

## 5. Learning from Each Competitor Type

### What to learn from Iraqi Agencies

| Lesson | How to Apply |
|--------|-------------|
| **Personal relationships matter** | WhatsApp support is essential — don't be a faceless platform |
| **Local business understanding** | Invest in template designs that reflect Iraqi business culture (restaurant menus with Iraqi dishes, real estate listings in Arabic, clinic booking flows) |
| **Patience with clients** | Build for a market where many business owners are not tech-savvy — simple interface, clear guidance |
| **WordPress familiarity** | Consider offering WordPress export/import for users who outgrow the platform |

### What to learn from Wix

| Lesson | How to Apply |
|--------|-------------|
| **Drag-and-drop is the UX standard** | Users expect intuitive, visual editing — invest heavily in the builder UI |
| **AI-assisted building (Wix ADI)** | Build templates first, then add AI-assisted site generation as a v2 feature |
| **Template variety matters** | Start with 10-15 Iraqi-specific templates in v1, target 20+ by v2 |
| **App marketplaces create stickiness** | Eventually build a plugin/add-on ecosystem for e-commerce, booking, SEO, etc. |

### What to learn from WordPress

| Lesson | How to Apply |
|--------|-------------|
| **Openness/control is valued** | Let users export their data, own their content, and migrate if needed |
| **SEO plugins are critical** | Pre-integrate with local SEO (Google Business Profile for Iraqi locations, local directories) |
| **Content management flexibility** | Don't lock users into rigid templates — allow customization within guardrails |

### What to learn from Shopify

| Lesson | How to Apply |
|--------|-------------|
| **E-commerce is the revenue driver** | The most valuable websites for Iraqi SMEs are online stores — prioritize e-commerce features |
| **Multi-channel selling** | Integrate with social commerce (Facebook Shops, Instagram Shopping, TikTok Shop) |
| **Payment + shipping integration** | Pre-configure Iraqi shipping providers and local payment gateways |

### What to learn from Freelancers

| Lesson | How to Apply |
|--------|-------------|
| **Low-touch, high-availability** | Freelancers are on WhatsApp 24/7 — our support needs to match that responsiveness |
| **Price transparency paradox** | Freelancers quote per-project which feels expensive but often ends up cheaper than subscriptions — one-time payment model matches this psychology |
| **Visual portfolio is everything** | Showcase beautiful, real-looking sample sites (not generic demos) |

### What to learn from Wuilt

| Lesson | How to Apply |
|--------|-------------|
| **Free core works in MENA** | If Wuilt proves the model, consider a free tier with paid value-add features (especially payment processing where you already have relationships) |
| **Regional pride matters** | Wuilt's "Egyptian-first" branding resonates locally — our "Iraqi-first" branding should too |
| **VC money buys growth** | Wuilt can spend $2M on marketing. We need to be smarter: leverage social media (20M+ Facebook users), WhatsApp virality, local partnerships |

---

## 6. Recommended Feature Set (MVP)

### Must-Have (v1 — Launch)

| Feature | Why |
|---------|-----|
| **Drag-and-drop page builder** | Core product — intuitive, visual, no coding |
| **10-15 Iraqi-specific templates** | Restaurant, retail shop, real estate, clinic, school, lawyer, portfolio, construction, hotel, news/blog |
| **Arabic-first + English interface** | Full RTL support, Arabic admin panel |
| **Kurdish (Sorani) interface** | Differentiator for KRI market |
| **Mobile-optimized / PWA** | 82.9% mobile users — must work well on phones |
| **WhatsApp support integration** | Core to hybrid model — chat button on every page |
| **Contact form builder** | Most basic need for every business |
| **Image gallery** | Essential for restaurants, real estate, portfolios |
| **Google Maps integration** | Local business discovery |
| **Custom domain support** | .iq domains, subdomain (ourplatform.iq/user) |
| **Basic SEO tools** | Meta tags, sitemaps, Google Analytics integration |
| **One-time payment checkout** | The user's chosen pricing model |
| **Zain Cash + Qi Card payment** | User already has gateway relationships |

### Nice-to-Have (v2 — 3-6 months)

| Feature | Why |
|---------|-----|
| **E-commerce (products, cart, checkout)** | Biggest value driver for SMEs |
| **AI-assisted site generation** | Match Wix ADI / Wuilt features |
| **Multi-page management** | Site structure (about, services, contact, etc.) |
| **Blog/CMS** | Content marketing for businesses |
| **Booking/reservation system** | For clinics, restaurants, salons |
| **Social media integration** | Auto-post to Facebook/Instagram, social feed embed |
| **Analytics dashboard** | Visitor stats, sales data |
| **Plugin/App system** | Extensibility |

### Future (v3 — 6-12 months)

| Feature | Why |
|---------|-----|
| **Freelancer marketplace** | Let Iraqi devs build on our platform |
| **Agency white-label** | Turn agencies into resellers |
| **Language expansion** | Kurmanji (Northern Kurdish), Turkmen |
| **AsiaPay + bank transfer** | More payment methods |
| **Multi-language site support** | Let a single site be Arabic+English+Kurdish |
| **Export/import (WordPress/Wix)** | Migration tool to reduce switching cost |

---

## 7. Pricing Strategy — One-Time Payment Model

The user has chosen a **one-time payment model** targeting both individuals and SMEs. Here's a recommended structure:

### Proposed Tiers

| Tier | Target | Price (est.) | Features |
|------|--------|-------------|----------|
| **Basic** | Individuals, freelancers, very small businesses | **$199-299** (one-time) | 1-page site, 3 templates, contact form, custom domain, basic SEO, 1 year hosting |
| **Business** | SMEs, retail shops, restaurants | **$399-599** (one-time) | 5-page site, all templates, gallery, Google Maps, blog, advanced SEO, 1 year hosting |
| **E-commerce** | Online stores | **$699-999** (one-time) | Business features + products, cart, checkout, Zain Cash/Qi Card, inventory management, 1 year hosting |

### Why One-Time Payment Works for Iraq

| Factor | Impact |
|--------|--------|
| **Psychological resistance to subscriptions** | Iraqis are accustomed to one-time purchases (phones, cars, SIM cards). Monthly subscriptions are less common, especially for small businesses. |
| **Matches freelancer/agency pricing** | Agencies charge one-time project fees. Our model fits the existing mental model. |
| **Easier sale** | "Pay once, own your website forever" is a stronger pitch than "Pay $20/mo forever." |
| **Lower barrier** | No recurring commitment anxiety. Users feel they get full value up front. |

### Revenue Model

| Revenue Stream | Description |
|----------------|-------------|
| **One-time payment** | Main revenue — pay for the website build |
| **Hosting renewal** | Annual hosting fee after year 1 (e.g., $49-99/yr) |
| **Add-on features** | E-commerce, booking system, premium templates |
| **Payment processing fees** | Small % on e-commerce transactions via Zain Cash / Qi Card |
| **SEO/maintenance packages** | Optional monthly plans for ongoing support |

### Comparison vs. Subscription Model

| Dimension | One-Time (Our Model) | Subscription (Wix/WordPress) |
|-----------|---------------------|------------------------------|
| **Upfront revenue** | ✅ High per customer | ❌ Low (but recurring) |
| **Customer commitment** | ✅ Low friction to buy | ❌ Subscription anxiety |
| **Long-term value** | ❌ Must upsell hosting/add-ons | ✅ Guaranteed recurring revenue |
| **Cancellation risk** | ❌ No lock-in (user leaves after paying) | ✅ Lock-in (user fears losing site) |
| **Cash flow** | ❌ Lumpier | ✅ Predictable |

**Mitigation for one-time model:** The annual hosting renewal creates recurring revenue. Payment processing fees on e-commerce create transaction-based recurring revenue. This hybrid revenue model reduces the lumpiness of pure one-time payments.

---

## 8. Service Model — Hybrid Self-Serve + WhatsApp-Assisted

### The Model

```
┌─────────────────────────────────────────────┐
│            OUR HYBRID MODEL                  │
├─────────────────────────────────────────────┤
│                                             │
│   ┌──────────────┐    ┌──────────────┐      │
│   │  SELF-SERVE  │    │ WHATSAPP-    │      │
│   │  BUILDER     │───▶│ ASSISTED     │      │
│   │  (Drag-drop) │    │ (Human help) │      │
│   └──────────────┘    └──────────────┘      │
│         ▲                      ▲            │
│         │                      │            │
│   Tech-savvy users      Non-tech users      │
│   build themselves      get help building   │
│                                             │
└─────────────────────────────────────────────┘
```

### Why This Works in Iraq

| Reason | Detail |
|--------|--------|
| **Low digital literacy** | Many Iraqi small business owners aren't comfortable with drag-and-drop. They need hand-holding. |
| **Trust barrier** | A WhatsApp human builds trust that a faceless platform can't. |
| **WhatsApp is ubiquitous** | 34.3M TikTok users, 20.1M Facebook users — WhatsApp is the primary communication channel. |
| **Agency expectation** | Iraqis expect personal service from web developers (the agency model). Meet that expectation. |
| **Scalable premium** | WhatsApp-assisted can be a premium tier (extra fee), creating an upsell path. |

### How It Works

1. **User signs up** on the platform, chooses a template
2. **Self-serve path:** User edits their site with the drag-and-drop builder, publishes when ready
3. **Assisted path:** User clicks "Get help building" → connects to a WhatsApp group with a dedicated Iraqi builder → describes their business and preferences → builder sets up the site → user reviews and approves
4. **Handoff:** Once the site is built (assisted path), the user gets access to the self-serve builder for ongoing edits
5. **Support:** Ongoing WhatsApp support for questions, changes, troubleshooting

### Operational Model

| Role | Who | Cost |
|------|-----|------|
| Builder (assisted path) | Freelancer / employee | Per-site fee or salary |
| Support | In-house team + AI chatbot | Fixed cost |
| Platform | Self-serve | Automated |

### Lessons from Competitors

| Competitor | Their Support Model | What We Learn |
|------------|-------------------|---------------|
| **Iraqi Agencies** | Phone/WhatsApp, personal | Users expect this — don't be a "no support" SaaS |
| **Wix** | Chatbot + email | Too impersonal for Iraq — need real humans |
| **Freelancers** | Direct WhatsApp, 24/7 | Gold standard for responsiveness — match this |
| **Wuilt** | Unknown (likely self-serve) | Human-assisted is our differentiator |

---

## 9. Risk Mitigation Roadmap

| Risk | Severity | Mitigation | Timeline |
|------|----------|------------|----------|
| **R1 — Agency-dominated market** | Medium | Position as "self-serve alternative to agencies." Target the $199-599 price point vs. $1,200+ agencies. WhatsApp-assisted bridges the trust gap. | Pre-launch |
| **R2 — Low digital literacy / trust** | High | Hybrid model with WhatsApp support. Simple UI with Arabic guidance. Video tutorials in Arabic. 7-day money-back guarantee. | Pre-launch |
| **R3 — Payment fragmentation** | Medium | User already has Zain Cash + Qi Card relationships. Start with these two, add AsiaPay and bank transfer in v2. | v1 + v2 |
| **R4 — International platforms** | High | Don't compete on breadth. Compete on local relevance. Iraqi-first UX + local payments + WhatsApp support + local templates. | Ongoing |
| **R5 — Internet instability** | Medium | Build PWA (works offline). Lightweight pages (<1MB). Optimized for 4G. Lazy-load images. Low-bandwidth mode. | v1 |
| **R6 — Wuilt entering Iraq** | High | Build moats: local payment integrations (hardest to replicate), Kurdish language, Iraqi business templates, local support team. Monitor quarterly. If they enter, consider free tier. | Ongoing |
| **R7 — Competitors copying features** | Medium | First-mover advantage in Iraq-specific features. Build network effects (user sites → portfolio → more users). Focus on execution speed. | Ongoing |

---

## 10. Key Takeaways & Action Items

### The Strategic Positioning

> **"The first Iraqi self-serve website builder — with local templates, local payments, and local support. Pay once. Own your site forever."**

### Competitive Advantages (Our Moat)

| # | Advantage | Defensibility |
|---|-----------|---------------|
| 1 | **Local payment integrations** (Zain Cash, Qi Card) | High — requires partnerships, takes months |
| 2 | **Kurdish language support** | Medium — takes effort but copyable |
| 3 | **Iraqi-specific templates** | Medium — first-mover advantage |
| 4 | **WhatsApp-assisted hybrid model** | Medium — operational complexity |
| 5 | **One-time payment model** | Low — easily copied |
| 6 | **Local brand + trust** | High — takes years to build |

### Action Items (Prioritized)

**Immediate (Months 1-2)**
- [ ] Finalize platform tech stack (consider white-label vs. build from scratch given 6+ month timeline)
- [ ] Design the 10-15 Iraqi-specific template designs (restaurant, retail, real estate, clinic, etc.)
- [ ] Implement Zain Cash + Qi Card payment integrations (user has existing relationships)
- [ ] Build the drag-and-drop page builder (core product)
- [ ] Design the WhatsApp-assisted workflow

**Short-term (Months 3-4)**
- [ ] Add Kurdish (Sorani) language support
- [ ] Implement PWA + mobile optimization
- [ ] Launch with one-time payment pricing (Basic $199-299, Business $399-599)
- [ ] Set up WhatsApp support team (bilingual Arabic/Kurdish)
- [ ] Build portfolio site showcasing real-looking sample sites

**Medium-term (Months 5-6)**
- [ ] Add e-commerce features (v2)
- [ ] Add blog/CMS functionality
- [ ] Implement multi-language site support (user can have site in Arabic+English+Kurdish)
- [ ] Launch marketing campaign on Facebook + TikTok (20M+ and 34M+ users)
- [ ] Monitor Wuilt's expansion; prepare contingency plan if they enter Iraq

**Ongoing**
- [ ] Quarterly competitive update — refresh competitor database
- [ ] Monitor Wuilt's expansion into GCC — if they announce Iraq, activate contingency
- [ ] Collect user feedback and iterate on templates + features
- [ ] Build case studies from first 100 customers

### Final Word

The Iraqi website-building market has a **clear, unserved gap**: a local, self-serve, Arabic-first platform with transparent pricing and local features. 30+ agencies prove there's demand (they're all busy building sites for $1,200+). 10 international platforms prove there's a self-serve model (but none serve Iraq properly).

**The opportunity is real.** The user's existing payment gateway relationships, the one-time payment model (matching local psychology), and the WhatsApp-assisted hybrid approach create a differentiated offering that no current competitor matches.

**The threat is real too.** Wuilt ($2M funded) is the biggest risk — if they enter Iraq, they bring VC money, a proven model, and an Arabic-first platform. The window to establish moats (local payments, Kurdish language, local templates, local support) is 12-18 months.

**Build local. Think local. Win local.**
