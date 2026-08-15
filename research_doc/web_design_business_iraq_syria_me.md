# Web Design Business in Iraq / Syria / Middle East
## Solo Founder Playbook — $500 Starting Capital, WhatsApp-First Commerce

*Research date: July 2026. All prices in USD unless stated. Region focus: Iraq (Baghdad / Erbil / Basra), Syria (Damascus / Aleppo), with Saudi / UAE / Jordan as adjacent reference markets.*

---

## 1. Executive Summary

Sell **one-page to five-page websites** with a **"Buy on WhatsApp" button on every product** to restaurants, hotels, salons, clinics, retail sellers, and individuals across Iraq and the wider Arab world. The wedge is brutal and local: in this region, the buyer's phone is the cart, the checkout, and the CRM — and 69% of Iraqis plus ~70% of Syrians are on social platforms, mostly mobile, mostly on WhatsApp, mostly without a working website for the businesses they want to buy from. You sell the website that ends with the customer landing in the seller's WhatsApp with a fully pre-filled message naming the exact product. No cart, no payment gateway, no app. Build cost: <$30 per site. Sell price: $200–$700. Margin: ~90%. Break-even: month 2–3 with 3 paying clients.

**This week's actions:** Register one .com for yourself on Cloudflare ($9.15). Create a Cloudflare Pages account. DM 5 local businesses today on Instagram/WhatsApp with a one-line pitch: *"I make a website that puts your customer in your WhatsApp with one click."*

---

## 2. Market Reality

**WhatsApp penetration.** Meta removed per-country WhatsApp ad-reach figures in 2024, so the exact "% on WhatsApp in Iraq" no longer exists publicly. The reliable proxy is Facebook Messenger: **34.1% of Iraq's population**, **43.3% of its internet users**, with the same demographics as WhatsApp (DataReportal 2024). Across Saudi/UAE, MENA SMB commerce defaults to WhatsApp DM. **Take-away:** any Iraqi/Syrian business with a smartphone already has WhatsApp installed, and the default customer behaviour is "tap the green icon, send a message."

**SME web presence.** Most restaurants, hotels, and retail sellers in Iraq and Syria have **either a Facebook page, an Instagram, or nothing.** True websites are rare outside hotels and large chains. Syria's 35.8% internet penetration and 11.82 Mbps median mobile speed (DataReportal 2024) further depress website ownership. **This is the opportunity**: you're selling to people who have zero site today.

**Connectivity & hosting reality.** Iraq median mobile: **29 Mbps** (OK). Syria: **11.82 Mbps** (3G-class). Build for 3G. **Cloudflare Pages** is the only major free static host with verified Baghdad/Erbil edge POPs. **$0/mo** for unlimited bandwidth, 500 builds, 100 domains.

**Language & cultural fit.** Arabic default in Arab Iraq/Syria. Kurdish (Sorani) in Erbil/Sulaymaniyah. English for expats/diaspora. Tone: formal on the invoice, warm in conversation. Imagery: prefer local photography over stock — restaurant kitchens, market stalls, real storefronts. Default to neutral, urban, food-and-family imagery.

**This week's actions:** Open Cloudflare Pages + WhatsApp Business. Buy one .com ($9.15). Set the page to load in <2s in airplane mode (a real 3G test).

---

## 3. Customer Segments

| Segment | Pain today | Site type | Trigger phrase that sells | Realistic price (USD) | Where to find them |
|---|---|---|---|---|---|
| **Restaurants & cafés** | No menu online; orders by phone; lost in delivery-app fees | 1-page: menu + gallery + map + WhatsApp order button | *"Customers see your full menu and tap one button to order in WhatsApp — no commission, no app."* | **$150–350** | Instagram geotags; walk around your neighborhood; food-delivery app comments |
| **Hotels & hostels** | Booking.com takes 15–22%; no direct WhatsApp inquiries | 3–5 pages: rooms, photos, amenities, WhatsApp booking button | *"Get direct bookings. No commission. Customer taps one button, your WhatsApp opens with the room they want."* | **$300–700** | Booking.com photos by phone number; Christian/Marzban listings; expat Facebook groups |
| **Individuals (portfolio / CV)** | Diaspora applying to Gulf jobs; no clean CV site | 1-page bilingual CV + portfolio + WhatsApp contact | *"Put your CV on your own domain. Gulf employers Google you and find a real site, not a PDF."* | **$80–200** | LinkedIn Iraqi/Syrian diaspora; Iraqi university Facebook groups |
| **Retail sellers** | Posts product photos on Facebook; customers ask "is this available?" 50 times | Catalog: 10–50 products + WhatsApp handoff per product | *"Stop answering 'is this available?' 50 times a day. Each product has its own WhatsApp button with the product name pre-filled."* | **$300–700** | Facebook Marketplace; Instagram shops; Kurdish wholesale bazaars |
| **Clinics / salons / service businesses** | Appointment by phone only; clients forget hours, prices | 3-page: services + prices + hours + WhatsApp booking | *"Customer taps 'book' on the service they want. WhatsApp opens with the service name and the time they chose."* | **$200–500** | Local signage; Google Maps; neighborhood walks |

**This week's actions:** Pick **one** segment to start (recommendation: restaurants or retail sellers — highest volume, lowest education needed). DM 10 of them with the trigger phrase above. Track who replies.

---

## 4. Product Tiers

| Tier | What's in | What's out | Delivery hours |
|---|---|---|---|
| **Tier 1 — Static showcase** | 1–5 pages, hero image, gallery (≤20 photos), map embed, WhatsApp button, Arabic + English, mobile-responsive, contact form (email) | CMS, blog, multi-language beyond Arabic/English, custom illustrations, copy writing | **8–16 hours** (2–4 days) |
| **Tier 2 — Catalog + WhatsApp handoff** | Everything in Tier 1 + product pages (10–50 items), category filters, per-product WhatsApp button with pre-filled SKU/name/price/URL, Decap CMS so client edits products | Cart, payment, accounts, shipping calculator, inventory sync | **20–40 hours** (5–10 days) |
| **Tier 3 — Domain + hosting + maintenance** | Tier 1 or 2 **+** .com registration, Cloudflare DNS, 12 months of hosting, 1 hour/month edits, monthly uptime report, renewal reminder | SEO campaigns, ad management, content writing, advanced integrations | **Setup: 24–48 hrs. Monthly maintenance: 1 hr/mo** |

**This week's actions:** Build one Tier-1 template (use a free HTML starter, e.g., Start Bootstrap, then skin for RTL). Build one Tier-2 template using Astro + Decap CMS. Total build time should be <6 hours for both.

---

## 5. WhatsApp Handoff — How It Actually Works

The pattern, exact and minimal:

```
https://wa.me/<intl-number>?text=<urlencoded-message>
```

**Number format:** country code + national number, no `+`, no spaces, no dashes. Iraq: `9647XXXXXXXXX`. Syria: `9639XXXXXXXX`.

**Template that wins the sale:**

```
Hi, I want to order from your website:
Product: {{product.name_ar}}
SKU: {{product.sku}}
Price: {{product.price}} USD
Page: {{page.url}}
Question: Is this still available? What is the final price?
```

**Why this beats a contact form:** A contact form gets filtered into spam, ignored, or replied to in 24 hours. A WhatsApp message is in the seller's hand in **under 3 seconds**, with the product already named and the buyer's question already asked. Conversion jumps 5–10× over email contact forms in MENA. The seller replies in one tap. The customer types nothing but "yes" or "I want 2."

**Compatibility:** iOS, Android, desktop (web.whatsapp.com), WhatsApp Business. Falls back to a download page if no app.

**Gotchas:** Never use `+` in the number. Newline `%0A` renders as line break inside WhatsApp — use it to make the message scannable. Emoji survive encoding.

**This week's actions:** Generate 3 sample `wa.me` links (one per tier) and paste into your own WhatsApp on iOS, Android, desktop to verify.

---

## 6. Tech Stack — Minimum Viable, Regional-Friendly

**Hosting: Cloudflare Pages (free).** Only major free static host with confirmed Baghdad/Erbil edge POPs. Unlimited bandwidth. 500 builds/month. 100 domains/project. $0/mo forever.

**Framework: Astro.** Zero JS by default — first paint <100KB with Arabic font and 20 product images. Content collections for type-safe catalog. Native RTL via `<html dir="rtl">`. Deploys to Cloudflare Pages in one command. Hugo is faster but Go templates are awkward; Next.js adds 200KB+ React runtime; plain HTML can't carry a 10–50 product catalog without you editing JSON every time.

**Fonts: Cairo or IBM Plex Sans Arabic, self-hosted as WOFF2 subset** to ~1500 Arabic glyphs — saves 80–150 KB vs full Latin+Arabic. `font-display: swap`. Don't use Google Fonts directly; for 3G, self-host wins. Source: [Bunny Fonts](https://fonts.bunny.net/) for free subsetting.

**RTL.** `<html lang="ar" dir="rtl">` on the root. Use CSS **logical properties** (`margin-inline-start`, `padding-inline-end`) — they auto-flip if you build an English variant. Never write `margin-left`. Source: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values).

**Images.** WebP + `srcset`. Lazy-load below the fold. Target ≤80 KB per photo. Cloudflare Images handles free transforms.

**Catalog data: Decap CMS, not JSON.** Free, open-source, runs at `/admin/`, commits edits back to git, gives the client a web UI to add/edit products. JSON forces every update through you — kills the maintenance revenue model. Sanity/Strapi are overkill at 10–50 products. Source: [decapcms.org](https://decapcms.org/).

**WhatsApp deep-link: pure HTML, zero JS.** Just `<a href="https://wa.me/...?text=...">`. One tag.

**This week's actions:** `npm create astro@latest` (Minimal template). Install `@astrojs/cloudflare`. Add Cairo WOFF2 subset to `/public/fonts/`. Set `<html dir="rtl" lang="ar">`. Deploy.

---

## 7. Pricing & Currency

| Tier | Price (USD) | IQD @ 1,310 | IQD @ 1,400 |
|---|---|---|---|
| Tier 1 (1–5 page showcase) | **$200** | 262,000 | 280,000 |
| Tier 2 (catalog, 10–50 products) | **$450** | 589,500 | 630,000 |
| Tier 3 (+ domain + hosting + maintenance, year 1) | **$650 + $25/mo** | 851,500 + 32,750/mo | 910,000 + 35,000/mo |
| Tier 3 renewal (year 2+) | **$25/mo** | 32,750/mo | 35,000/mo |

**Deposit structure.** **50% upfront, 50% before launch / domain transfer.** Non-negotiable for first-time clients. The deposit is `العربون` — culturally understood, expected, named on the invoice. IQD/SYP equivalent valid **24 hours only**; client bears FX difference and transfer fees. Source: CBI/XE IQD rates as of July 2026.

**Recurring revenue.** Tier 3 at $25/mo × 10 clients = **$250/mo passive** by month 6. Renewal reminders 30/7 days before domain expiry. Auto-renew where the card allows.

**This week's actions:** Write one PDF price list in Arabic + English with the table + deposit terms. Post on your portfolio site.

---

## 8. Delivery Workflow

1. **Discovery call (20 min, WhatsApp voice).** Deliverable: a 5-line project brief in Arabic. Client artifact: photos of business, logo if any, WhatsApp number to be the destination. **Time: 20 min.**
2. **Mockup (Figma free tier).** Deliverable: 1 homepage screenshot + 1 catalog page screenshot. Client artifact: written "yes/no" via WhatsApp. **Time: 2–3 hours.**
3. **Build.** Deliverable: live staging URL on `*.pages.dev`. **Time: Tier 1 = 6–10 hours; Tier 2 = 16–30 hours.**
4. **Review round (1 included).** Client delivers revision notes in a single message. **Time: 2 hours.**
5. **Launch.** DNS via Cloudflare. Email forwarding (free via ImprovMX or Cloudflare Email Routing). **Time: 30 min.**
6. **Handoff.** Loom video (3 min) showing client how to edit products in Decap. PDF cheat sheet in Arabic. Final invoice. **Time: 1 hour.**
7. **Renewal nudge (day 30, then monthly).** WhatsApp message: "Anything to change on your site this month?" Converts 30% of Tier 1/2 clients into Tier 3.

**Total per Tier 1 project: ~10–14 working hours over 3–5 days.**

**This week's actions:** Open a Figma free account. Draft a one-page mockup template you can re-skin per client in 90 minutes.

---

## 9. Sales & Acquisition

**Channels that actually work in this market:**

1. **In-person visits (highest conversion).** Walk into 5 restaurants a day. Bring mockups on your phone. **5–15% convert** to a discovery call.
2. **Instagram DMs.** Search hashtags: `#بغداد` `#البصرة` `#أربيل` `#مطاعم_بغداد`. DM with the trigger phrase.
3. **Facebook groups.** Search "Iraqi small business", "Syrian online sellers", "Kurdish wholesale". Don't spam — answer questions for a week, then offer your service when it fits.
4. **WhatsApp Status.** Post one portfolio screenshot per day. Tag the business. They reshare.
5. **Referrals.** 10% commission (cash, USD, or a free maintenance month) to any client who sends you a paying lead.

**The 5-question discovery script (Arabic):**

1. *"What does your business do, in one sentence?"*
2. *"How do customers find you today?"*
3. *"If a customer wanted to buy at 11pm, what happens?"*
4. *"What's the one thing you wish customers knew before they contacted you?"*
5. *"If I built you a site this week that puts every customer into your WhatsApp with their question pre-filled, what's a fair price for that?"*

Let them name the price. If they say $50, walk away politely. If they say $300–$700, proceed.

**Starter portfolio tactic.** Build 3 sites for free/cheap ($0–$50 each) to use as case studies. Pick: a friend's restaurant, a relative's salon, a small shop you buy from. **Non-negotiable — without 3 live sites, you cannot sell above $200.**

**This week's actions:** Identify 3 portfolio candidates. Build first one. DM 10 restaurants on Instagram.

---

## 10. Legal & Practical

**Business registration (Iraq).** Federal: Ministry of Trade + chamber + tax file. KRG (Erbil): separate route via [services.gov.krd](https://services.gov.krd/). Most solo freelancers operate **unregistered** year 1–2. Register when you bid for institutional work, need a corporate bank account, or hire. Budget **$150–500**.

**Business registration (Syria).** Commercial register + tax file for formal operation. **Caveat:** OFAC sanctions (General License 25, May 2025) and EU restrictions affect banking and USD processing — screen counterparties. Most Syrian freelancers route through a Lebanese or Turkish bank. Source: [OFAC GL25](https://ofac.treasury.gov/recent-actions/20250523).

**Invoicing in USD.** Quote USD. IQD/SYP reference valid **24 hours**. Client covers FX + transfer fees. Top methods, ranked: (1) **Cash USD** (Iraq — most common), (2) **USDT TRC-20** (zero receiver fee), (3) **WU / MoneyGram** (Syria, diaspora), (4) FIB / FastPay / ZainCash (Iraq domestic IQD), (5) bank wire via Lebanese/Turkish correspondent. **Do not promise PayPal** — not reliably usable in Iraq/Syria.

**One-page Arabic+English contract clauses:**

1. نطاق العمل — Deliverables (pages, languages, integrations, explicit exclusions)
2. الجدول الزمني — Timeline (start, milestones, client-feedback deadline)
3. الدفع — **50% deposit, 50% before launch.** USD with 24h IQD/SYP reference; client bears transfer fees.
4. التعديلات — **2 revision rounds** included; additional at hourly rate.
5. الملكية الفكرية — IP transfers to client **only after final payment.** Founder retains reusable templates.
6. الإلغاء — Cancellation: deposit non-refundable after work begins; client pays for work completed.
7. الضمان — **30-day bug-fix warranty.** Excludes new features, client edits, third-party outages.
8. القانون المختص — Governing law: Iraq / KRG / Syria / "neutral arbitration" — get local legal review above $500.

**This week's actions:** Write the 8 clauses in a bilingual Google Doc. Send to 2 native speakers for review. Print 5 copies.

---

## 11. Risks (ranked)

1. **Currency volatility (IQD/USD, SYP/USD).** Mitigation: **price in USD**, refresh IQD/SYP reference every 24 hours, client covers FX differential.
2. **Payment default.** Mitigation: **50% deposit, no domain transfer before final payment**, watermark previews, signed receipt for cash.
3. **Domain renewal lapse.** Mitigation: **auto-renew on a stable USD card**, calendar reminders 30/7 days before expiry.
4. **Ramadan / Eid slowdown (Feb 19 – Mar 20, 2026; Feb 9 – Mar 10, 2027).** Mitigation: front-load sales in **January and post-Eid April–May**; expect 20–40% conversion drop mid-Ramadan.
5. **Client ghosting after delivery.** Mitigation: **30-day warranty forces one contact**, monthly maintenance tier creates ongoing touchpoint, Loom handoff video.
6. **Internet shutdowns / WhatsApp throttling (Iraq).** Mitigation: keep SMS, email, offline backup of all client assets in Google Drive.
7. **Syria sanctions.** Mitigation: avoid US/EU-linked client payments; route through local bank or crypto; document each transaction.

**This week's actions:** Set auto-renew on your own domain. Open a USDT TRC-20 wallet (Trust Wallet or Tonkeeper) and verify you can receive a test transfer.

---

## 12. 12-Month Plan & Financial Estimate

**Months 1–3: setup, portfolio, first clients.**

- Month 1: 3 portfolio sites (free / $50 each). Revenue **$0–150.** Costs **$25.**
- Month 2: 3 paying clients × $300 = **$900.**
- Month 3: 5 paying clients × $300 = **$1,500.**
- **Cumulative month 3: ~$2,275 revenue, $75 costs.**

**Months 4–12: scaling.**

| Scenario | Clients/mo (avg) | Avg project | Monthly | Annual |
|---|---|---|---|---|
| **Low** | 4 | $250 | $1,000 | $9,000 |
| **Base** | 7 | $350 | $2,450 | $21,950 |
| **High** | 10 | $500 | $5,000 | $45,000 |

Recurring (Tier 3): **10 clients by month 12** × $25/mo = **$250/mo passive**.

**Fixed costs (annual).**
- Your domain + hosting: **$25–50/yr**
- Client domains (resold at cost): **$120/yr**
- Transport: **$300/yr**
- Phone + data: **$120/yr**
- **Total: ~$565/yr ($47/mo)**

**Break-even month 2.** One Tier-1 client covers hosting. Profitability from there.

**This week's actions:** Open a Google Sheet tracking: prospects contacted, discovery calls booked, projects quoted, projects won, revenue.

---

## 13. Action List — Week 1

This is the only section that matters today.

- [ ] **Day 1:** Buy your own .com via Cloudflare Registrar ($9.15). Open Cloudflare Pages + WhatsApp Business.
- [ ] **Day 1:** DM 5 local businesses on Instagram/WhatsApp: *"I make a website that puts your customer in your WhatsApp with one click — interested?"* Track replies.
- [ ] **Day 2:** `npm create astro@latest`, install `@astrojs/cloudflare`, set up Tier-1 template with Cairo font + RTL.
- [ ] **Day 2:** Generate 3 sample `wa.me` links; verify on iOS, Android, desktop.
- [ ] **Day 3:** Identify 3 portfolio candidates. Build the first one free — get written testimonial + photos + permission to publish.
- [ ] **Day 3:** Open USDT TRC-20 wallet (Trust Wallet). Do one test receive.
- [ ] **Day 4:** Walk into 5 restaurants in your neighborhood with phone-in-hand mockups. Pitch in person.
- [ ] **Day 4:** Write the 8-clause bilingual contract in Google Docs. Send to 2 native speakers for review.
- [ ] **Day 5:** Post WhatsApp Status with portfolio screenshot. Tag the business.
- [ ] **Day 5:** Write price list PDF (Arabic + English). Host on portfolio site.
- [ ] **Day 6:** Post in 5 relevant Facebook groups (Iraqi small business, Syrian online sellers, Kurdish wholesale). Don't sell — answer one question per group first.
- [ ] **Day 7:** Review the week: replies? discovery calls booked? Book next week's DMs based on what worked.

**Done = Week 2 starts with: 1 portfolio site live, 5–10 DM replies, 1–3 discovery calls booked, contract template ready, payment channels tested, ~$10 spent.**

---

## Sources (high-confidence only)

- [DataReportal Digital 2024: Iraq](https://datareportal.com/reports/digital-2024-iraq)
- [DataReportal Digital 2024: Syria](https://datareportal.com/reports/digital-2024-syria)
- [DataReportal Digital 2024: Saudi Arabia](https://datareportal.com/reports/digital-2024-saudi-arabia)
- [Cloudflare Pages pricing](https://pages.cloudflare.com/)
- [Cloudflare Registrar (.com at cost)](https://www.cloudflare.com/products/registrar/)
- [Astro docs](https://docs.astro.build/)
- [Decap CMS](https://decapcms.org/)
- [Bunny Fonts](https://fonts.bunny.net/)
- [WhatsApp wa.me FAQ](https://faq.whatsapp.com/425482568658329)
- [Namecheap .com](https://www.namecheap.com/domains/registration/gtld/com/)
- [Office Holidays: Ramadan 2026](https://www.officeholidays.com/holidays/ramadan/2026)
- [CBI IQD rate](https://cbi.iq/) | [XE IQD converter](https://www.xe.com/currencyconverter/convert/?Amount=1&From=USD&To=IQD)
- [OFAC Syria General License 25 (May 2025)](https://ofac.treasury.gov/recent-actions/20250523)
- [KRG services portal](https://services.gov.krd/)

*Stale / uncertain data flagged inline where applicable. Where no reliable country-wide statistic exists (e.g., "% of SMEs with website" in Iraq), the founder should validate locally by surveying 20 target businesses before pricing.*
