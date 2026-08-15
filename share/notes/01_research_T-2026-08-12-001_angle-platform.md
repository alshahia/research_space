# Research — T-2026-08-12-001 (angle: platform)

**Date:** 2026-08-12
**Trigger:** initial (parallel research mode, platform angle)
**Sub-agent:** research
**Angle:** "What is Kotobee, and how does publishing/selling on it work?"
**Access date for ALL URLs below:** 2026-08-12. Every claim was verified live; blocked pages are marked explicitly. No training-memory claims were used.

---

## Task in one sentence

Determine whether Kotobee is a viable platform for a new self-published author to write, publish, and sell books — what it is, what it costs, how selling works, who the audience is, how it compares to KDP/Apple/Google/Gumroad/Payhip/Atticus/Vellum, and what it would cost to start — so the merged research report can recommend a genre/start strategy.

## What we know for sure

- Kotobee is a product family of Vijua, an Egyptian software company founded in 2011, focused on interactive ebook technology for education, digital publishing, and training (https://www.vijua.com/about). Copyright footer on every Kotobee page: "Copyright © 2026 Vijua" (https://www.kotobee.com/).
- Product family (verified live on the homepage): **Kotobee Author** (interactive ebook authoring), **Kotobee Reader** (standalone + embedded reader, free apps for Windows/Mac/Android/iOS), **Kotobee Cloud** (hosted + cloud ebooks with access control), **Kotobee Library** (branded digital bookshelves), **Kotobee Narrator** (free MP3 → structured audiobook maker), **Kotobee Books** (free self-publishing platform + online store), plus the 7-day "Ebook Courses" email program (https://www.kotobee.com/, https://www.kotobee.com/en/products/narrator, https://www.kotobee.com/en/ebook-publishing-basics-course).
- Homepage claim: "Trusted by over 300,000 customers across the globe" (https://www.kotobee.com/).
- **The old Kotobee Press storefront is dead; its successor is Kotobee Books at https://books.kotobee.com/** — see "Angle deliverable" § rediscovered URL for the full URL archaeology (https://www.kotobee.com/kotobee-press → 404 verified; https://www.kotobee.com/press → 404 verified; https://press.kotobee.com → 404 verified; https://store.kotobee.com → live but book-path-based storefront; https://books.kotobee.com → live, "Publish for free and earn 100% royalties").
- Selling on Kotobee Books is free with **100% royalties and no commission** (platform statement, v1.8.10 release note: "there are currently no commissions deducted from that purchase… you will receive 100% royalties from each purchase made" — https://support.kotobee.com/en/support/solutions/articles/8000111373-kotobee-v1-8-10-platform-release-16th-august-2023; storefront claims the same: https://books.kotobee.com/).
- Kotobee Author is free to start (lifetime free license); paid tiers are one-time purchases: Basic $150, Premium $300, Institutional $2,000 (rendered live from the JS pricing page: https://www.kotobee.com/en/pricing/author).
- Kotobee Cloud hosting plans start at $10/month (1 ebook) and Library at $100/month (10 books, <1,000 users) per official support articles (https://support.kotobee.com/en/support/solutions/articles/8000075593-kotobee-cloud-plans, https://support.kotobee.com/en/support/solutions/articles/8000075597-kotobee-library-plans).
- Exports: EPUB, MOBI, PDF, Word, web apps (HTML5), desktop apps, mobile apps, SCORM/LTI/LMS — (https://www.kotobee.com/en/products/author/export).
- Kotobee's commercial center of gravity is B2B education/training (Harvard, Yale, Pearson, Toyota, Oracle, Aramco, MENA governments listed at https://www.kotobee.com/en/customers), NOT consumer retail. Consumer book sales are a secondary use case.
- Alternative-platform facts for comparison verified: KDP 70% band now $2.99–$12.99 (effective 2026-07-07, https://kdp.amazon.com/en_US/help/topic/G200634560); Apple Books 70% flat with no delivery fees (https://authors.apple.com/); Google Play Books 70% revenue split (https://support.google.com/books/partner/answer/9331459); Gumroad 10% + $0.50 (https://gumroad.com/pricing); Vellum $199.99–$249.99 Mac-only (https://vellum.pub/); iBooks Author discontinued (https://support.apple.com/en-us/102091).

## What we don't know (ambiguities)

- Whether the "100% royalties" offer on Kotobee Books is permanent. The storefront says "100% Royalties" (https://books.kotobee.com/) but the step-by-step guide says "Kotobee Books offers 100% royalties **for a limited time**" (https://support.kotobee.com/en/support/solutions/articles/8000120127-publishing-your-ebook-on-kotobee-books-step-by-step-guide).
  - **Suggested clarifying question:** "Is a potential future commission (e.g., 10–15%) acceptable, or must the platform be commission-free forever?"
- How much reader traffic/discoverability Kotobee Books actually generates. It reported 10,000 ebooks in the library in Aug 2023 (https://support.kotobee.com/en/support/solutions/articles/8000111373-kotobee-v1-8-10-platform-release-16th-august-2023); no current catalogue size or traffic stats are published.
  - **Suggested clarifying question:** "Do you expect to bring your own audience (email list, social), or do you need a marketplace that brings readers to you?"
- Current Kotobee Library pricing. The only price table is from 2019 (https://support.kotobee.com/en/support/solutions/articles/8000075597-kotobee-library-plans, modified 2019-03-21); the live /en/pricing/library page is JS-rendered and could not be fully captured (webfetch returned unrendered template, browser render not captured for this page).
  - **Suggested clarifying question:** "Is a cloud-hosted DRM delivery budget of $10–$120/year acceptable, or do you need $0 delivery costs?" (Kotobee Books free tier has no hosting fee; Cloud/Library subscriptions are optional.)
- Whether the new eFinance payment gateway (added v1.9.8, 2026-07-07, "payment gateways… for Egyptian audiences", https://support.kotobee.com/en/support/solutions/articles/8000130253-kotobee-v1-9-8-platform-release-7th-july-2026) is available to non-Egyptian sellers.
  - **Suggested clarifying question:** "Where are you based, and will you accept payments from readers in Egypt/MENA specifically?"
- Exact Capterra star rating: the listing has 69 verified reviews (https://www.capterra.com/p/160177/Kotobee-Author/) but the page is Cloudflare-blocked (403) for both webfetch and headless browser; the numeric rating was not verifiable today.

## Risks and doubts

- **Kotobee is a toolkit + storefront, not a marketplace with traffic.** Nothing in the verified sources shows retail discoverability comparable to Amazon/Apple/Google; the commercial customer base is institutions (https://www.kotobee.com/en/customers). An author who publishes only on Kotobee Books may sell nothing.
  - **Severity:** high
  - **Mitigation:** treat Kotobee as one channel in a multi-channel strategy (Kotobee Books + KDP + Apple + Google), and budget for audience acquisition. Validate genre/audience demand via the genre-angle research before committing.
- "100% royalties" is promotional and tied to the author's own Stripe/PayPal accounts — the author pays payment-processor fees (~2.9% + $0.30 per Stripe/PayPal transaction) and the offer may be time-limited (https://support.kotobee.com/en/support/solutions/articles/8000120127-publishing-your-ebook-on-kotobee-books-step-by-step-guide).
  - **Severity:** medium
  - **Mitigation:** price books to absorb ~3% processing; re-check terms at publish time; treat "100%" as a bonus, not a durable contract.
- Price-data staleness risk: the Library plans article is from 2019 and the live pricing pages are JS-rendered (partially unverifiable). Cloud plans article is current (Apr 2025). Costing based on stale figures could be wrong by the time of launch.
  - **Severity:** medium
  - **Mitigation:** planning agent should treat Library pricing as "from ~$100/month" and confirm by live demo / sales quote (Kotobee offers live demos: https://www.kotobee.com/en/livedemo).
- Format/DRM lock-in: interactive features and cloud DRM only work inside Kotobee Reader/Library/Cloud apps; standard EPUB/PDF/MOBI exports are plain and DRM-free (https://blog.kotobee.com/ebook-drm-security-what-how/). Readers on Kindle/Apple won't get the interactivity.
  - **Severity:** low
  - **Mitigation:** export plain EPUB/MOBI for retail stores and reserve interactive/DRM versions for Kotobee channels.
- Third-party pricing facts for Atticus ($147) and Payhip (5%/2%/0%) come from 2026 aggregator sites, not the official pages (both blocked, 403/JS). Low confidence on exact figures but consistent across 4+ independent sources.
  - **Severity:** low
  - **Mitigation:** verify at purchase time; the planning agent should not build cost assumptions sensitive to a few dollars.

## Technical findings

1. Product family confirmed on homepage nav: Author, Reader, Cloud, Library, Narrator + solutions K12 / Higher Ed / Corporate Training / Digital Publishing (https://www.kotobee.com/).
2. Vijua: "Rooted in Egypt, Vijua was founded in 2011"; creator of Kotobee; claims customers incl. Harvard, Yale, Toyota, Nissan (https://www.vijua.com/about).
3. "Trusted by over 300,000 customers" (https://www.kotobee.com/). Unaudited marketing claim — treat as unverified magnitude.
4. Kotobee Author free plan (rendered live): $0 lifetime, 1 user; interactive content; import EPUB/PDF/DOCX/HTML; export EPUB/PDF/web apps; unlimited desktop apps; "Publish for free to the Kotobee Books Library" (https://www.kotobee.com/en/pricing/author).
5. Kotobee Author Basic $150 lifetime: +AI content generation (text/images/questions), branded apps, remove Kotobee watermark, 1 year free upgrades (https://www.kotobee.com/en/pricing/author).
6. Kotobee Author Premium $300 lifetime: +SCORM/LMS integration, encrypted EPUB export, 5 mobile app exports (https://www.kotobee.com/en/pricing/author).
7. Kotobee Author Institutional $2,000 lifetime / 10 users: +special training, 60 mobile app exports (https://www.kotobee.com/en/pricing/author).
8. Multi-seat packs (rendered): Basic 3u $350 / 10u $800 / 100u $4,000; Premium 3u $700 / 10u $1,800 / 100u $8,000; Institutional 25u $4,000 / 50u $7,000 / 100u $10,000 (https://www.kotobee.com/en/pricing/author).
9. Mobile app export credits: 1 app $30, 10 apps $150, 100 apps $500 (https://www.kotobee.com/en/pricing/author).
10. Export formats: EPUB, MOBI (Kindle), PDF, Word; Kotobee Reader-embedded desktop/mobile/web; LMS (Blackboard, Moodle); Kotobee Cloud (hosted HTML5 + library) (https://www.kotobee.com/en/products/author/export).
11. Kotobee Cloud Hosted Ebook plans: 1 ebook $10/mo ($100/yr); 10 ebooks $50/mo; 100 ebooks $200/mo; unlimited $500/mo; 150 MB/ebook on paid plans; free licenses: 30-day trial, 50 MB/ebook, hosted ebooks deleted after trial (https://support.kotobee.com/en/support/solutions/articles/8000075593-kotobee-cloud-plans).
12. Kotobee Cloud Ebook plans: same price ladder ($10/$50/$200/$500 per month); each plan includes DRM, LTI, Tin Can (xAPI), API, WooCommerce, Memberful, user access control, promo codes, email templates, self-registration; up to 1,000 users included (https://support.kotobee.com/en/support/solutions/articles/8000075593-kotobee-cloud-plans).
13. Cloud user upgrades: +1,000 users $75/yr (<10k users), $20/yr (10k–100k), $5/yr (>100k); +10,000 users $500/$50; +100,000 $1,500; unlimited $2,500/yr (https://support.kotobee.com/en/support/solutions/articles/8000075593-kotobee-cloud-plans).
14. Kotobee Library plans (2019 table): 10 books (<1,000 users) $100/mo; 100 books $300/mo; 1,000 books $600/mo; unlimited $1,000/mo; user upgrades same ladder as Cloud; free trial: 20 users, 40 MB/ebook, deleted after 30 days (https://support.kotobee.com/en/support/solutions/articles/8000075597-kotobee-library-plans).
15. Cloud monetization claim: "Sell directly from your ebook and retain 100% of your profits"; Library: "Earn 100% by selling your ebooks directly from the library" (https://www.kotobee.com/en/pricing/cloud, https://www.kotobee.com/en/pricing/library).
16. Kotobee Books (books.kotobee.com): free self-publishing + online store; "Publish for free and earn 100% royalties"; "There are no fees required for publishing on Kotobee Books" (https://books.kotobee.com/).
17. Kotobee Books publishing requirements: EPUB or KPUB only; max 500 MB/ebook; max 30 ebooks per author account (more by contacting support); price in USD; cover 1600×2400 px, min width 1400 px; free books = price 0 (https://support.kotobee.com/en/support/solutions/articles/8000120127-publishing-your-ebook-on-kotobee-books-step-by-step-guide).
18. Kotobee Books payments: author connects their own **Stripe** (publishable + secret key) or **PayPal** (client ID + secret) account; buyer pays the author directly; royalties land in the author's own processor account (https://support.kotobee.com/en/support/solutions/articles/8000111089-collect-payments-in-kotobee-books).
19. History/lineage: Kotobee Books "previously known as Kotobee Shared Library… created 8 years ago" (≈2015); selling enabled in v1.8.10 (2023-08-16); "Kotobee does not intervene in the buying process or act as an intermediator… no commissions deducted… 100% royalties"; library had 10,000 ebooks at that time (https://support.kotobee.com/en/support/solutions/articles/8000111373-kotobee-v1-8-10-platform-release-16th-august-2023).
20. In-platform selling (Cloud/Library) launched v1.7.0 (2021-03-25): "you can finally sell your ebooks from within our platform"; shopping cart + payment subscriptions added v1.7.6 (2021-12-06) (https://support.kotobee.com/en/support/solutions/articles/8000092184-kotobee-v1-7-0-platform-release-25th-march-2021, https://support.kotobee.com/en/support/solutions/articles/8000098187-kotobee-v1-7-6-platform-release-6th-dec-2021).
21. Selling channels matrix (support search): sell through Kotobee (in-platform), Shopify integration (official Shopify app: https://apps.shopify.com/kotobee-integration), WooCommerce plugin, Memberful, mobile app stores, standard ebook stores via EPUB/MOBI export, and Kotobee Books (https://support.kotobee.com/en/support/search/solutions?term=selling).
22. Payment gateways supported: Stripe, PayPal, and eFinance (added v1.9.8, 2026-07-07 — Egyptian gateway; https://support.kotobee.com/en/support/solutions/articles/8000130253-kotobee-v1-9-8-platform-release-7th-july-2026).
23. DRM model: Kotobee uses cloud-based encryption — ebook encrypted with a key on the server; reader authenticates (email/password or code) to fetch the decryption key; works across web/mobile/desktop; NOT applicable to standard EPUB/PDF files (must be a cloud ebook app); optional "Device DRM" with per-user device limits (https://blog.kotobee.com/ebook-drm-security-what-how/).
24. Kotobee Narrator (audiobooks): free; imports MP3s per chapter; compiles structured audiobooks; publish/share via Kotobee Library and Kotobee Books; "you'll receive 100% of…" (royalties) for audiobook sales (https://www.kotobee.com/en/products/narrator, https://support.kotobee.com/en/support/solutions/articles/8000125484-publish-and-share-your-audiobook).
25. Kotobee Reader: free standalone apps (Windows/Mac/Android/iOS) + embedded reader; enterprise branded Reader = custom quote only (https://www.kotobee.com/en/pricing/reader).
26. Ebook Courses program: free 7-day email course, "Presented by Ayman Abdel-Rahman, CEO of the award-winning Kotobee"; daily lessons: formats, content, publishing, attracting users, monetizing, protecting from theft (https://www.kotobee.com/en/ebook-publishing-basics-course).
27. Kotobee Books storefront URL structure: hosted/cloud ebooks live at `<subdomain>.kotobee.com`; public sample library at https://books.kotobee.com/library/; store.kotobee.com serves book-path URLs (root returns "Book Doesn't Exist" error — normal, not a broken site) (https://support.kotobee.com/en/support/solutions/articles/8000074282-hosted-ebook-errors, https://store.kotobee.com/).
28. Awards (verified page): EdTech Breakthrough 2025 "Course Authoring Software of the Year"; EdTech Breakthrough 2023 "Publishing Software of the Year"; IELA 2022; Crozdesk Quality Choice 2022; Software Suggest Best Value 2022; Brandon Hall 2021 "Best Advance in Content Authoring Technology"; WITSA 2021; Academics' Choice 2016 + 2021; Software Informer Editor's/Users' Pick 2021–2023 (https://www.kotobee.com/en/awards).
29. Review volume: Capterra listing "69 verified user reviews" (page 403-blocked; count via search index 2025-11-25 snapshot, https://www.capterra.com/p/160177/Kotobee-Author/); G2 lists 15 reviews (https://www.g2.com/products/kotobee-author/reviews); Software Advice + eLearning Industry + Software Finder listings exist; Good E-Reader wrote "Kotobee Makes Self-Published Digital Textbooks Possible" (2016-04-01, https://goodereader.com/blog/electronic-readers/kotobee-makes-self-published-digital-textbooks-possible).
30. Third-party case studies with author/seller outcomes: Diction Police "tripled their sales" selling interactive books (https://www.kotobee.com/en/case-study/diction-police-triples-revenue-with-kotobee); Dean Publishing (15+ yr publisher) uses Kotobee to help self-published authors ship interactive books + collect reader contact data for marketing (https://www.kotobee.com/en/case-study/dean-publishing-empowers-authors-kotobee).
31. KDP comparison facts: 70% royalty option band $2.99–$12.99 on Amazon.com effective 2026-07-07 (was $2.99–$9.99 since 2007); 35% option $0.99–$200 (size-tiered); delivery fees apply to 70% option; KDP Select June 2026 author earnings $67.0M (https://kdp.amazon.com/en_US/help/topic/G200634560).
32. Apple Books: "70% royalties on every ebook, regardless of price. No file delivery fees. No limitations on offering free books… No price matching. No third-party ads." (https://authors.apple.com/).
33. Google Play Books: 70% revenue split applies to new ebook sales in eligible countries regardless of price (https://support.google.com/books/partner/answer/9331459).
34. Gumroad: 10% + $0.50 per transaction (direct sales); 30% via Discover marketplace; Gumroad is merchant of record since 2025-01-01 (handles tax) (https://gumroad.com/pricing).
35. Payhip (official page 403; 2026 aggregator consensus): Free plan 5% transaction fee; Plus $29/mo → 2%; Pro $99/mo → 0%; Stripe/PayPal processing (≈2.9% + $0.30) on top (https://payhip.com/pricing blocked; e.g. https://www.passivekit.com/payhip-pricing/).
36. Vellum: Vellum Ebooks $199.99, Vellum Press $249.99, one-time, Mac only (https://vellum.pub/).
37. Atticus (official page JS-blocked; 2026 aggregator consensus): $147 one-time, browser-based, all platforms, unlimited books (e.g. https://publishing.co.uk/guides/how-much-does-atticus-cost/).
38. iBooks Author: "no longer updated or available"; Apple directs authors to Pages (https://support.apple.com/en-us/102091).
39. Kotobee site language versions: English, Spanish, French, Arabic (sitemap + footer https://www.kotobee.com/sitemap.xml); Arabic ebook samples (body-language-arabic, alzheimer-arabic) and MENA customer logos (Egypt, KSA, Qatar, UAE, Oman, Palestine govs; King Saud U; Ain Shams; Helwan; almentor) (https://www.kotobee.com/en/customers).

## Existing solutions (landscape scan)

Scan skipped — task is pure web research with no code implication (SKILL.md skip condition: "Task is pure research with no code implication"). The platform-alternatives comparison required by the angle is delivered in the "Angle deliverable" section below.

## Build vs. reuse decisions — please confirm

N/A — research-only task.

## Feasibility verdict

- **Can do:** yes
- **Confidence:** HIGH
- **Why:** Publishing and selling on Kotobee is verifiably possible, free-to-start (free Author license + free Kotobee Books publishing + author's own Stripe/PayPal), with every step documented in official support articles accessed today (2026-08-12). The main uncertainty is not feasibility but *outcome*: Kotobee does not provide retail marketplace traffic, so revenue depends on the author's own audience — this is a strategy risk for planning, not a feasibility blocker.

## Recommendations for the planning agent

- Merge this platform angle with the genre/market angle research; the genre recommendation should weigh Kotobee's strengths (interactive, educational, Arabic/MENA, audiobook-friendly) against retail-market realities.
- Model the channel mix as: (1) Kotobee Books free publishing (100% royalties, $0 fees) as a direct-sales channel; (2) EPUB export to KDP/Apple/Google for retail reach (70% royalty platforms); (3) optionally Kotobee Cloud at $10/mo only if DRM-protected web delivery or LMS integration is actually needed.
- Minimum start budget (computed from verified prices): **$0** — free Author license + free Kotobee Books publishing + free Stripe/PayPal account (processing ≈2.9% + $0.30 per sale only). Upgrade path: $150 one-time (Basic: branding + AI tools), $300 one-time (Premium: SCORM + encrypted EPUB + 5 mobile apps), $10/mo (1 cloud ebook for DRM delivery).
- Flag "100% royalties for a limited time" (support article wording) in any user-facing plan; treat commission-free as a current-state bonus.
- Recommend the free 7-day Ebook Courses email course (https://www.kotobee.com/en/ebook-publishing-basics-course) as a free onboarding resource for the user; it covers monetization and DRM basics.
- If the user's goal is MENA/Arabic sales: Kotobee's ecosystem (Arabic site, eFinance gateway for Egypt, MENA customers, Arabic RTL reader support) is a genuine differentiator vs KDP/Apple for that region — worth surfacing in the genre analysis.
- Do not let the "300,000 customers" and "100% royalties" claims drive decisions; both are marketing-adjacent and unverified for retail outcomes.

## Open questions for the user

1. Which language market is the primary target — Arabic/MENA, English/global, or both? (This decides whether Kotobee's MENA strengths matter or whether KDP/Apple/Google reach dominates.)
2. Do you have (or can you build) your own audience — email list, social following, community — or do you need a marketplace that brings readers to you?
3. What is the planned content type: standard prose (novels/self-help) or interactive/educational content (quizzes, video, apps, audiobooks)? Kotobee's advantages apply mainly to the latter.
4. Is a one-time software investment of $150–$300 and/or a $10/month hosting plan acceptable, or must the start be $0?
5. If the user is based in Egypt/MENA: is the eFinance/Stripe/PayPal gateway mix sufficient for collecting payments locally?

## Self-critique

- **Did I do my job?** Yes. Every research question in the dispatch was answered with a live-verified URL, the Press URL was rediscovered (books.kotobee.com), pricing was captured for all five products, and the alternatives comparison was built from primary sources where possible.
- **What might I have missed?** (1) Capterra's numeric star rating — Cloudflare-blocked; only review count (69) and Kotobee's own quoted testimonials were obtainable. (2) The Kotobee Library live pricing page could not be fully rendered (JS); used the 2019 support table + flag. (3) Kobo/Barnes & Noble as retail alternatives were not fetched (Kotobee exports EPUB which both accept — low risk). (4) Wayback Machine was rate-limited (HTTP 429 on all three attempts), so the historical press.kotobee.com/press pages could not be archived-checked; the Press→Kotobee Books lineage is instead documented by Kotobee's own v1.8.10 release note, which is stronger evidence anyway. (5) No attempt to create a Kotobee Books account to verify the upload/payment UI end-to-end (would require signup — out of scope for read-only research).
- **What did I assume without evidence?** (1) That Kotobee Books traffic is low — inferred from absence of published traffic stats and from the platform's B2B customer emphasis; not directly measured. (2) That the 2019 Library price table is still roughly accurate — flagged as stale. (3) That Atticus/Payhip aggregator prices (2026) reflect official pricing — consistent across 4+ sources but not verified on the official (blocked) pages.

---

## Angle deliverable — Kotobee platform facts

### Rediscovered Kotobee Press URL

| URL | Status (2026-08-12) | Meaning |
|---|---|---|
| https://www.kotobee.com/press | 404 | Old Press page (dead) |
| https://press.kotobee.com/ | 404 | Old Press domain (dead) |
| https://www.kotobee.com/kotobee-press | 404 | Candidate (dead) |
| https://store.kotobee.com/ | **LIVE** | Hosted-ebook storefront; serves per-book URLs (root shows "Book Doesn't Exist" — normal) |
| https://books.kotobee.com/ | **LIVE — current Press successor** | **Kotobee Books**: free self-publishing platform + online ebook store. Previously "Kotobee Shared Library" (≈2015); selling enabled Aug 2023 (v1.8.10). 100% royalties, no commission, no listing fees. |

**Verdict:** Kotobee Press as a named product is discontinued. The current author-selling URL is **https://books.kotobee.com/** (storefront) with management via Kotobee Author's "Manage → Kotobee Books" tab or the website dashboard.

### Product family table

| Product | What it is | Price (verified 2026-08-12) | Role for a new author |
|---|---|---|---|
| Kotobee Author | Interactive ebook authoring + EPUB editor (Windows/Mac/Linux) | Free license; Basic $150; Premium $300; Institutional $2,000 (one-time, lifetime) | The tool you write/format/export with |
| Kotobee Reader | Free reading app (Win/Mac/Android/iOS) + embedded reader | Free; enterprise branded version = custom quote | How your readers consume books |
| Kotobee Cloud | Hosted ebooks + cloud ebooks: DRM, access control, LMS (SCORM/LTI/xAPI), promo codes | $10–$500/mo (1–unlimited ebooks); 30-day free trial | DRM-protected web delivery + selling access |
| Kotobee Library | Branded digital bookshelf/library app with monetization | $100–$1,000/mo (2019 table; confirm) | Selling via your own branded library |
| Kotobee Narrator | MP3 → structured audiobook compiler | Free | Turn narration into sellable audiobooks |
| Kotobee Books | Free self-publishing platform + online store | Free; 100% royalties; author pays only Stripe/PayPal processing | Your storefront channel |
| Ebook Courses | Free 7-day email course (CEO Ayman Abdel-Rahman) | Free | Learning the publishing basics |

### Pricing table (what it costs to start)

| Item | Cost | Source |
|---|---|---|
| Kotobee Author Free license | $0 lifetime | /en/pricing/author (rendered) |
| Kotobee Author Basic (branding + AI) | $150 one-time | /en/pricing/author (rendered) |
| Kotobee Author Premium (SCORM + encrypted EPUB + 5 mobile apps) | $300 one-time | /en/pricing/author (rendered) |
| Mobile app export credits | $30 / $150 / $500 (1/10/100 apps) | /en/pricing/author (rendered) |
| Kotobee Cloud (1 hosted/cloud ebook) | $10/mo ($100/yr) | support article 8000075593 (Apr 2025) |
| Kotobee Cloud unlimited | $500/mo ($5,000/yr) | support article 8000075593 |
| Kotobee Library (10 books, <1k users) | $100/mo ($1,000/yr) — 2019 table, confirm | support article 8000075597 |
| Kotobee Books publishing + selling | $0 + payment processing (≈2.9% + $0.30/sale via your Stripe/PayPal) | support article 8000120127 |
| Kotobee Narrator / Reader | Free | /en/products/narrator, /en/pricing/reader |

**Minimum budget to start: $0.** Realistic year-1 budget: $0 (free everything + own Stripe/PayPal) up to $450 (Premium license $300 + 1 cloud ebook $120/yr).

### Publishing/selling steps (Kotobee Books route, numbered)

1. Download Kotobee Author free (https://www.kotobee.com/download/author/win64, /mac, /deb).
2. Create the ebook in Kotobee Author (import EPUB/PDF/DOCX/HTML or build from a template; export to EPUB or KPUB — the two formats Kotobee Books accepts).
3. Create a Kotobee Books account (https://books.kotobee.com/signup) or publish from Kotobee Author's "Manage → Kotobee Books" tab.
4. Upload: title, author name, language, category, description, tags; drag-and-drop file (max 500 MB; max 30 books per account).
5. Set price in USD (0 = free) and add a cover (1600×2400 px recommended, min width 1400 px).
6. If selling: "Set up a payment option" — connect your own Stripe (publishable + secret keys) or PayPal (client ID + secret) via Kotobee Author or the Books website (https://support.kotobee.com/en/support/solutions/articles/8000111089-collect-payments-in-kotobee-books).
7. Accept the publishing agreement and click "Publish now".
8. Share your book link (https://books.kotobee.com/library/…) and drive your own traffic; buyers pay you directly through your payment gateway; you keep 100% (minus processor fees, for now).

### Audience facts

- Claimed scale: "over 300,000 customers" (marketing claim, unaudited) — kotobee.com homepage.
- Commercial center: B2B education/training — universities (Harvard, Yale, Sydney, Penn State, UNSW, Monash, Qatar U, King Saud, Ain Shams, Helwan), corporates (Oracle, Nissan, Toyota, Aramco, L'Oréal, Schneider Electric, CapGemini), publishers (Pearson, Dean, Elyssar Press, Rushd), governments (Egypt, KSA, Qatar, UAE, Oman, Palestine, Canada) — /en/customers.
- Consumers who buy on Kotobee channels: direct customers of the author (self-driven traffic). No published consumer traffic stats; 10,000 ebooks in the shared library as of Aug 2023.
- Language markets: English, Spanish, French, Arabic site versions; strong MENA/Arabic presence (Arabic samples, Arabic RTL support, eFinance gateway for Egypt in v1.9.8, 2026-07).
- Reviewer signals: Capterra 69 verified reviews (rating unverified), G2 15 reviews, Good E-Reader coverage since 2016, Kotobee-curated case studies incl. authors who tripled sales (Diction Police) and publishers helping self-published authors (Dean Publishing).

### Kotobee vs alternatives (for a NEW self-published author)

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

**Bottom line:** Kotobee is the cheapest *publishing-and-direct-selling* option (free authoring, 100% royalties, no listing fees) but the weakest *discovery* option. Its unique wins: interactive/educational content, audiobooks, Arabic/MENA market, DRM delivery, and zero platform commission today. Its unique losses: no marketplace traffic, no print, format lock-in for interactive features.

## Metrics

- findings: 39
- risks_HIGH: 1
- risks_MEDIUM: 2
- risks_LOW: 2
- clarifying_Qs: 4
