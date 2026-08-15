# Kotobee Publishing Dossier — 01: Kotobee Fact Sheet

**Sources:** `share/notes/01_research_T-2026-08-12-001_angle-platform.md` (Angle deliverable — Kotobee platform facts; technical findings 1–21) and `share/notes/01_research_T-2026-08-12-001.md` (canonical "Platform (angle A)" block). Access date for every URL: **2026-08-12**.

This chapter is the factual backbone of the dossier: what Kotobee is, what publishing and selling on Kotobee Books costs, how the product family prices out, and how Kotobee compares with the alternatives for a new self-published author. Every figure carries its source label; nothing here is re-researched.

## 1. Kotobee Books — fact sheet

Kotobee Books (`https://books.kotobee.com/`) is the current author storefront of the Kotobee product family: a **free self-publishing platform + online store**. "Publish for free and earn 100% royalties" (storefront claim); "There are no fees required for publishing on Kotobee Books" (storefront). Publishing is done "in just 3 simple steps" and the book goes live immediately after upload (support article 8000120127).

| # | Fact | Detail | Source |
|---|------|--------|--------|
| 1 | Free publishing | $0 publishing fees, $0 listing fees on Kotobee Books | support article 8000120127; books.kotobee.com |
| 2 | 100% royalties — "for a limited time" | Platform statement: no commission deducted, author receives 100% of each purchase. **The official step-by-step guide words it "100% royalties for a limited time" — treat the 100% as a current-state promo, not a durable contract (see "Open items — verify at signup", flag #3).** | support article 8000111373 (v1.8.10 release note); support article 8000120127 |
| 3 | Formats | EPUB or KPUB only | support article 8000120127 |
| 4 | File size | Max 500 MB per ebook | support article 8000120127 |
| 5 | Books per account | Max 30 ebooks per author account (more by contacting support) | support article 8000120127 |
| 6 | Currency | Price is set in USD; a free book = price 0 | support article 8000120127 |
| 7 | Cover spec | 1600×2400 px recommended, min width 1400 px; JPG/JPEG/GIF/PNG | support article 8000120127 |
| 8 | Payments | Author connects their own **Stripe** (publishable + secret key) or **PayPal** (client ID + secret) account; buyer pays the author directly | support article 8000111089 |
| 9 | Payout | Royalties land in the author's own processor account; author pays only payment-processor fees (≈2.9% + $0.30 per Stripe/PayPal transaction) | support article 8000111089; support article 8000120127 |
| 10 | Authoring tool | Kotobee Author free license — $0 lifetime, 1 user; "Publish for free to the Kotobee Books Library" from the free plan | /en/pricing/author (rendered) |
| 11 | Publication speed | Instant publication after upload ("in just 3 simple steps") | support article 8000120127 |
| 12 | Lineage | Previously "Kotobee Shared Library" (created ≈2015); selling enabled in v1.8.10 (2023-08-16); library had 10,000 ebooks at that time; "Kotobee does not intervene in the buying process or act as an intermediator" | support article 8000111373 |
| 13 | Storefront | Reader-facing library at `https://books.kotobee.com/library/`; hosted/cloud ebooks live at `<subdomain>.kotobee.com`; store.kotobee.com serves per-book URLs (root shows "Book Doesn't Exist" — normal, not a broken site) | support article 8000074282; store.kotobee.com |
| 14 | Economics vs retail | Author keeps 100% of the price on Kotobee Books vs 35–70% on Amazon KDP and ~70% on Apple/Google (comparison in section 6) | platform angle comparison table |

**Minimum budget to start: $0.** Realistic year-1 budget: $0 (free everything + own Stripe/PayPal) up to $450 (Premium license $300 + 1 cloud ebook $120/yr).

## 2. Press URL archaeology — where the storefront lives now

Kotobee Press as a named product is discontinued. The current author-selling URL is `https://books.kotobee.com/` (storefront), managed via Kotobee Author's "Manage → Kotobee Books" tab or the website dashboard.

| URL | Status (2026-08-12) | Meaning |
|---|---|---|
| https://www.kotobee.com/press | 404 | Old Press page (dead) |
| https://press.kotobee.com/ | 404 | Old Press domain (dead) |
| https://www.kotobee.com/kotobee-press | 404 | Candidate (dead) |
| https://store.kotobee.com/ | **LIVE** | Hosted-ebook storefront; serves per-book URLs (root shows "Book Doesn't Exist" — normal) |
| https://books.kotobee.com/ | **LIVE — current Press successor** | **Kotobee Books**: free self-publishing platform + online ebook store. Previously "Kotobee Shared Library" (≈2015); selling enabled Aug 2023 (v1.8.10). 100% royalties, no commission, no listing fees. |

## 3. Product family

Kotobee is a product family of **Vijua**, an Egyptian software company founded in 2011 ("Rooted in Egypt, Vijua was founded in 2011"; https://www.vijua.com/about). Copyright footer on every Kotobee page: "Copyright © 2026 Vijua" (https://www.kotobee.com/).

| Product | What it is | Price (verified 2026-08-12) | Role for a new author |
|---|---|---|---|
| Kotobee Author | Interactive ebook authoring + EPUB editor (Windows/Mac/Linux) | Free license; Basic $150; Premium $300; Institutional $2,000 (one-time, lifetime) | The tool you write/format/export with |
| Kotobee Reader | Free reading app (Win/Mac/Android/iOS) + embedded reader | Free; enterprise branded version = custom quote | How your readers consume books |
| Kotobee Cloud | Hosted ebooks + cloud ebooks: DRM, access control, LMS (SCORM/LTI/xAPI), promo codes | $10–$500/mo (1–unlimited ebooks); 30-day free trial | DRM-protected web delivery + selling access |
| Kotobee Library | Branded digital bookshelf/library app with monetization | $100–$1,000/mo (2019 table; confirm) | Selling via your own branded library |
| Kotobee Narrator | MP3 → structured audiobook compiler | Free | Turn narration into sellable audiobooks |
| Kotobee Books | Free self-publishing platform + online store | Free; 100% royalties; author pays only Stripe/PayPal processing | Your storefront channel |
| Ebook Courses | Free 7-day email course (CEO Ayman Abdel-Rahman) | Free | Learning the publishing basics |

## 4. Pricing — what it costs to start and to scale

| Item | Cost | Source |
|---|---|---|
| Kotobee Author Free license | $0 lifetime | /en/pricing/author (rendered) |
| Kotobee Author Basic (branding + AI) | $150 one-time | /en/pricing/author (rendered) |
| Kotobee Author Premium (SCORM + encrypted EPUB + 5 mobile apps) | $300 one-time | /en/pricing/author (rendered) |
| Kotobee Author Institutional | $2,000 one-time (10 users; special training; 60 mobile app exports) | /en/pricing/author (rendered) |
| Mobile app export credits | $30 / $150 / $500 (1/10/100 apps) | /en/pricing/author (rendered) |
| Kotobee Cloud (1 hosted/cloud ebook) | $10/mo ($100/yr) | support article 8000075593 (Apr 2025) |
| Kotobee Cloud unlimited | $500/mo ($5,000/yr) | support article 8000075593 |
| Kotobee Library (10 books, <1k users) | $100/mo ($1,000/yr) — 2019 table, confirm | support article 8000075597 |
| Kotobee Books publishing + selling | $0 + payment processing (≈2.9% + $0.30/sale via your Stripe/PayPal) | support article 8000120127 |
| Kotobee Narrator / Reader | Free | /en/products/narrator, /en/pricing/reader |

Notes carried from research: the Library price table is from 2019 (support article 8000075597, modified 2019-03-21) and the live `/en/pricing/library` page is JS-rendered — **confirm by live demo / sales quote** (Kotobee offers live demos: https://www.kotobee.com/en/livedemo). Cloud plans article is current (Apr 2025). Paid Author tiers only matter for advanced export/branding — the free license is confirmed real, risk-free, no credit card.

## 5. The 8-step publish path (Kotobee Books route)

1. **Download Kotobee Author free** — https://www.kotobee.com/download/author/win64, /mac, /deb.
2. **Build the ebook in Kotobee Author** — import EPUB/PDF/DOCX/HTML or build from a template; export to EPUB or KPUB — the two formats Kotobee Books accepts.
3. **Create a Kotobee Books account** — https://books.kotobee.com/signup, or publish from Kotobee Author's "Manage → Kotobee Books" tab.
4. **Upload + metadata** — title, author name, language, category, description, tags; drag-and-drop file (max 500 MB; max 30 books per account).
5. **Set price + cover** — price in USD (0 = free) and a cover (1600×2400 px recommended, min width 1400 px).
6. **Connect payments** — "Set up a payment option": connect your own Stripe (publishable + secret keys) or PayPal (client ID + secret) via Kotobee Author or the Books website (https://support.kotobee.com/en/support/solutions/articles/8000111089-collect-payments-in-kotobee-books).
7. **Accept the publishing agreement** and click "Publish now".
8. **Share your book link** — https://books.kotobee.com/library/… — and drive your own traffic; buyers pay you directly through your payment gateway; you keep 100% (minus processor fees, for now).

## 6. Kotobee vs alternatives (for a NEW self-published author)

| Platform | Cost to start | Royalty/commission | Reach | Kotobee wins / loses |
|---|---|---|---|---|
| **Kotobee (Books + Author)** | $0 (free) → $300 one-time | 100% (no commission, time-limited promo) + Stripe/PayPal fees | Small, self-driven | **Wins:** 0% platform fee, interactive/audiobook/MENA support, no exclusivity. **Loses:** minimal built-in traffic, no print |
| Amazon KDP | $0 | 70% ($2.99–$12.99 band, delivery fees) or 35% | Massive (Kindle) | **Loses** on royalty vs Kotobee Books; **wins** hugely on reach, KU, print, advertising |
| Apple Books | $0 | 70% flat, no delivery fees | Large (iOS) | **Loses** on interactive features; **wins** on retail reach + no fees |
| Google Play Books | $0 | 70% | Large (Android) | **Loses** on features; **wins** on reach |
| iBooks Author | dead (discontinued, Apple → Pages) | n/a | n/a | Kotobee is the de-facto successor for interactive book creation |
| Atticus | $147 one-time | n/a (formatting only) | n/a | Kotobee free tier beats it on price; Atticus wins on pure writing/formatting UX for prose |
| Vellum | $199.99–$249.99 (Mac only) | n/a (formatting only) | n/a | Kotobee free tier beats it on price + cross-platform; Vellum wins on print-quality output |
| Gumroad | $0 | 10% + $0.50 (30% via Discover) | Creator-economy audience | **Kotobee wins** on royalty; Gumroad wins on storefront tooling (tax handling, memberships, email) |
| Payhip | $0 (Free plan) | 5% free / 2% Plus $29/mo / 0% Pro $99/mo + processing | Small, self-driven | **Kotobee wins** on royalty; Payhip wins on storefront convenience |

Comparison facts and sources (all accessed 2026-08-12): KDP 70% royalty option band $2.99–$12.99 on Amazon.com effective 2026-07-07 (was $2.99–$9.99 since 2007); 35% option $0.99–$200 (size-tiered); delivery fees apply to the 70% option; KDP Select June 2026 author earnings $67.0M (https://kdp.amazon.com/en_US/help/topic/G200634560). Apple Books: "70% royalties on every ebook, regardless of price. No file delivery fees. No limitations on offering free books… No price matching. No third-party ads." (https://authors.apple.com/). Google Play Books: 70% revenue split applies to new ebook sales in eligible countries regardless of price (https://support.google.com/books/partner/answer/9331459). Gumroad: 10% + $0.50 per transaction, 30% via Discover marketplace, merchant of record since 2025-01-01 (https://gumroad.com/pricing). Vellum Ebooks $199.99 / Vellum Press $249.99, one-time, Mac only (https://vellum.pub/). iBooks Author "no longer updated or available" (https://support.apple.com/en-us/102091). Caveat from research: Atticus ($147) and Payhip (5%/2%/0%) figures come from 2026 aggregator sites, not the official pages (both blocked, 403/JS) — low confidence on exact figures but consistent across 4+ independent sources; verify at purchase time.

**Bottom line:** Kotobee is the cheapest *publishing-and-direct-selling* option (free authoring, 100% royalties, no listing fees) but the weakest *discovery* option. Its unique wins: interactive/educational content, audiobooks, Arabic/MENA market, DRM delivery, and zero platform commission today. Its unique losses: no marketplace traffic, no print, format lock-in for interactive features (interactivity only works inside Kotobee Reader/Cloud/Library apps; standard EPUB/PDF/MOBI exports are plain and DRM-free — https://blog.kotobee.com/ebook-drm-security-what-how/).

## 7. Audience facts

- **Claimed scale:** "over 300,000 customers across the globe" — marketing claim, **unaudited**; treat as unverified magnitude (https://www.kotobee.com/).
- **Commercial center of gravity: B2B education/training, NOT consumer retail.** Universities (Harvard, Yale, Sydney, Penn State, UNSW, Monash, Qatar U, King Saud, Ain Shams, Helwan), corporates (Oracle, Nissan, Toyota, Aramco, L'Oréal, Schneider Electric, CapGemini), publishers (Pearson, Dean, Elyssar Press, Rushd), governments (Egypt, KSA, Qatar, UAE, Oman, Palestine, Canada) — https://www.kotobee.com/en/customers. Consumer book sales are a secondary use case.
- **Consumers on Kotobee channels** are direct customers of the author (self-driven traffic). No published consumer traffic stats; 10,000 ebooks in the shared library as of Aug 2023 (support article 8000111373).
- **MENA/Arabic is first-class:** Arabic site version (https://www.kotobee.com/ar — site versions English, Spanish, French, Arabic per https://www.kotobee.com/sitemap.xml), Arabic ebook samples (body-language-arabic, alzheimer-arabic), Arabic RTL reader support, MENA customer logos (Egypt, KSA, Qatar, UAE, Oman, Palestine govs; King Saud U; Ain Shams; Helwan; almentor), and the **eFinance payment gateway added in v1.9.8 (2026-07-07)** — "payment gateways… for Egyptian audiences" (https://support.kotobee.com/en/support/solutions/articles/8000130253-kotobee-v1-9-8-platform-release-7th-july-2026). Whether eFinance is available to non-Egyptian sellers is unverified — confirm if you are not Egypt-based.
- **Reviewer signals:** Capterra 69 verified reviews (numeric rating unverifiable — page Cloudflare-blocked 403; count via search index 2025-11-25 snapshot, https://www.capterra.com/p/160177/Kotobee-Author/), G2 15 reviews (https://www.g2.com/products/kotobee-author/reviews), Good E-Reader coverage since 2016 (https://goodereader.com/blog/electronic-readers/kotobee-makes-self-published-digital-textbooks-possible), Kotobee-curated case studies incl. authors who tripled sales (Diction Police — https://www.kotobee.com/en/case-study/diction-police-triples-revenue-with-kotobee) and publishers helping self-published authors (Dean Publishing — https://www.kotobee.com/en/case-study/dean-publishing-empowers-authors-kotobee).
- **Free learning path:** 7-day email course "Ebook Publishing Basics" (https://www.kotobee.com/en/ebook-publishing-basics-course), Academy 47 video tutorials (https://www.kotobee.com/academy), help center (https://support.kotobee.com), blog (https://blog.kotobee.com).

## 8. Open items — verify at signup

Two of the three open research items surface in this chapter (the third — the Kotobee Books ToS AI-content clause — is covered in chapter 05):

1. **Kotobee Author paid-tier prices are JS-rendered.** The figures in this fact sheet ($150 Basic / $300 Premium / $2,000 Institutional, one-time) were captured from the rendered page on 2026-08-12 (https://www.kotobee.com/en/pricing/author) — **verify at signup** that the current tier prices and features match before any purchase.
2. **"100% royalties" still active.** The support article (8000120127) says "100% royalties **for a limited time**" — **verify at signup** (at publish time, capture the current terms) whether the 100% promo is still active. This dossier plans economics on the assumption the case survives a future drop to ~70%.
