# 99 — Appendix: URL register, verify-at-signup checklist, contact sheet

**Sources:** dossier chapters 01–06 (URLs copied verbatim from the chapter text), canonical merged research (`share/notes/01_research_T-2026-08-12-002.md` — flags 1–11), and the three angle files (`01_research_T-2026-08-12-002_angle-{platforms-en,platforms-ar,eligibility}.md`) for status classification and the flag-only URLs. **Access date for every URL in this register: 2026-08-12.** No URL was invented or reconstructed: relative-form citations (bare help-topic IDs, scheme-less hosts, path-only references) are kept exactly as the source files wrote them and are marked as such.

## Legend (status column)

- **verified 2026-08-12** — page live and content captured during research on 2026-08-12 (per the angle files / chapters)
- **verify at signup** — 🔶 item: JS-gated / login-gated / not published / redirect; must be re-checked at registration (checklist below)
- **dead** — 404 / TLS failure / parked / unreachable on 2026-08-12 (see dead table for details)

---

## URL register (every unique URL cited in chapters 01–06, deduplicated, plus flag-only URLs)

### Chapter 01 — Eligibility and payout rails (01_eligibility_and_rails.md)

| # | URL | Used in | Purpose/claim | Access date | Status |
|---|-----|---------|---------------|-------------|--------|
| 1 | https://ofac.treasury.gov/sanctions-programs-and-country-information/paarss | 01 §1 | PAARSS program (31 CFR 569) — the only remaining Syria-related US sanctions after the 2025-07-01 revocation | 2026-08-12 | verified 2026-08-12 |
| 2 | https://ofac.treasury.gov/sanctions-programs-and-country-information/iraq-related-sanctions | 01 §1 | Iraq not comprehensively sanctioned since 2010 (75 FR 55462); only targeted 31 CFR 576 remains | 2026-08-12 | verified 2026-08-12 |
| 3 | https://ofac.treasury.gov/sanctions-programs-and-country-information/where-is-ofacs-country-list-what-countries-do-i-need-to-worry-about-in-terms-of-us-sanctions | 01 §1 | OFAC administers no single country list — programs are targeted/SDN-based | 2026-08-12 | verified 2026-08-12 |
| 4 | https://stripe.com/global | 01 §2 rails; 02 sheet 17; 02 gray-area box | Stripe official country list (~46 countries/regions; MENA = UAE only) — IQ/SY absent → rail ❌ | 2026-08-12 | verified 2026-08-12 |
| 5 | https://www.paypal.com/iq/webapps/mpp/home | 01 §2, §3; 05 Step 1 | `paypal.com/iq` redirects to the US homepage — no Iraq market site | 2026-08-12 | verified 2026-08-12 (redirect — negative evidence) |
| 6 | https://www.paypal.com/sy/webapps/mpp/home | 01 §2, §3; 05 Step 1 | `paypal.com/sy` 404s — no Syria market site | 2026-08-12 | dead (404) |
| 7 | https://www.paypal.com/us/webapps/mpp/country-worldwide | 01 §2, §3 | PayPal's own country-worldwide list — no Iraq and no Syria (Middle East tab: BH/IL/JO/KW/OM/QA/SA/AE/YE); captured via Playwright | 2026-08-12 | verified 2026-08-12 |
| 8 | https://support.patreon.com/hc/en-us/articles/29467737603981-Paypal-supported-countries | 01 §2, §3; 02 sheets 15; 05 Step 1 | Patreon's official PayPal-payout country list — Iraq and Syria absent (MENA list: EG, JO, KW, SA, AE, etc.) | 2026-08-12 | verified 2026-08-12 |
| 9 | https://www.payoneer.com/resources/tools/global-payment-capabilities/ | 01 §2, §3; 05 Step 1 | Payoneer capabilities page — 190+ countries claimed, JS map + disclaimer "does not guarantee the availability of any particular payment method"; **the decisive test** | 2026-08-12 | verify at signup |
| 10 | https://wise.com/available-countries/ | 01 §2 rails; 02 gray-area box | Wise availability page — 404 / gated; no static country list fetched | 2026-08-12 | dead (404) |
| 11 | https://wise.com/gb/availability/ | 01 §2 rails; 02 gray-area box | Wise availability JS probe — no static country list | 2026-08-12 | verify at signup (JS probe) |
| 12 | https://kdp.amazon.com/en_US/help/topic/G6GLVRHVQZY4V4FX | 01 §2; 02 sheet 1; 05 Step 2 | KDP PSP participating-provider list — Payoneer and Wise both participating (as of 2026-08-01 payments to non-participating PSPs stopped) | 2026-08-12 | verified 2026-08-12 |
| 13 | https://kdp.amazon.com/en_US/help/topic/GD9NN4LS8ZDU8XZ7 | 01 §2; 02 sheet 1; 05 Step 2 | KDP PSP program change 2026-08-01 — PSP eligibility is per-account | 2026-08-12 | verified 2026-08-12 |
| 14 | https://kdp.amazon.com/en_US/help/topic/GJD7DFFX6X88AK46 | 01 §2; 02 sheet 1; 05 Steps 0–2 | KDP Payment Options country table — IQ/SY not listed (only Jordan from MENA); "Other" = paper check by mail in USD; note on local banks + payment thresholds | 2026-08-12 | verified 2026-08-12 |
| 15 | https://support.google.com/books/partner/answer/2987594 | 01 §2; 02 sheet 2 | Google Play Books supported-countries table — IQ/SY absent from seller AND payments columns; MENA seller sign-ups ★ closed | 2026-08-12 | verified 2026-08-12 |
| 16 | https://support.google.com/books/partner/answer/6009580 | 01 §2; 02 sheet 2; 06 §1, §4 | Google Play Books payment rules — local business address + local bank in a payment-supported country; no alternative payment methods; US tax info for USD sales | 2026-08-12 | verified 2026-08-12 |
| 17 | https://kobowritinglife.zendesk.com/hc/en-us/articles/360059385891-How-and-when-do-I-get-paid | 01 §2; 02 sheet 4; 05 Step 0 | Kobo payout — EFT only (Convera), CAD$50 threshold, 45 days after month end, 8 currencies; no country list published | 2026-08-12 | verified 2026-08-12 |
| 18 | https://itunespartner.apple.com/books/articles/set-up-banking-information-in-itunes-connect-2705 | 01 §2; 02 sheet 3 | Apple Books banking setup — Bank Country dropdown; per-country payout list not published | 2026-08-12 | verify at signup (dropdown content not published) |
| 19 | https://help.lulu.com/en/support/solutions/articles/64000255464-creator-revenue-the-basics | 01 §2; 02 sheet 11; 05 Step 1 | Lulu payout — check (USD, quarterly, $20 min) or PayPal (monthly, $5 min) only; no direct bank transfer, no Payoneer | 2026-08-12 | verified 2026-08-12 |
| 20 | https://www.draft2digital.com/faq/ | 01 §2; 02 sheet 5; 05 Steps 1–2; 06 §1, §3 | D2D FAQ — $20 activation, $12/yr <$100, ~10% commission, 5 payout methods (DD/Intl DD/Payoneer/PayPal/check), 30% default withholding | 2026-08-12 | verified 2026-08-12 |
| 21 | https://www.irs.gov/instructions/iw8ben | 01 §2, §4; 02 sheets 1–3, 5–7, 13, 15, 17, 27–28; 06 §1, §5 | IRS W-8BEN instructions — Line 2 citizenship, Line 3 tax residence, 30% default foreign-person rate under IRC §1441 | 2026-08-12 | verified 2026-08-12 |
| 22 | https://www.irs.gov/businesses/international-businesses/united-states-income-tax-treaties-a-to-z | 01 §4; 02 sheets 1–3, 5–7, 13, 15, 17, 27–28; 06 §1, §2 | IRS treaty A–Z — no US–Iraq and no US–Syria income tax treaty (Egypt has one) → 30% either way | 2026-08-12 | verified 2026-08-12 |
| 23 | https://kdp.amazon.com/en_US/help/topic/G201274750 | 01 §4; 02 sheet 1; 06 §1, §2, §5 | KDP tax help — "default withholding rate is 30%", W-8BEN expiry resets to 30%, TIN = Iraq TIN/ITIN/EIN accepted | 2026-08-12 | verified 2026-08-12 |

### Chapter 02 — Platform matrix (02_platform_matrix.md)

| # | URL | Used in | Purpose/claim | Access date | Status |
|---|-----|---------|---------------|-------------|--------|
| 24 | https://kdp.amazon.com/en_US/help/topic/G200620010 | 02 sheet 1; 06 §1 | KDP account setup — identity verification, W-8BEN tax profile, two-step verification for bank entry | 2026-08-12 | verified 2026-08-12 |
| 25 | https://kdp.amazon.com/en_US/help/topic/G200634560 | 02 sheet 1; 05 Step 2; 06 §3 | KDP royalty band — 70% option $2.99–$12.99 eff. 2026-07-07, minus delivery fees ($0.06/MB US, $0.15/MB elsewhere) | 2026-08-12 | verified 2026-08-12 |
| 26 | https://kdp.amazon.com/en_US/help/topic/GUQT4C8J6RR6V8TY | 02 sheet 1; 03 §2 contact sheet; 05 Step 2 | KDP Arabic help topic — Arabic eBook supported (RTL mandatory, quality gates); **no Arabic paperback**; Arabic-KDP-Resolvers@amazon.com support channel | 2026-08-12 | verified 2026-08-12 |
| 27 | G200798990 (KDP help-topic ID, cited bare in 02 sheet 1; full: https://kdp.amazon.com/en_US/help/topic/G200798990) | 02 sheet 1 | KDP Select/KU — global fund $67.0M June 2026; "all authors regardless of where they live are eligible" (eligibility ≠ payable) | 2026-08-12 | verified 2026-08-12 |
| 28 | GD9PMU58BV24QFZ7 (KDP help-topic ID, cited bare in 02 sheet 1; full: https://kdp.amazon.com/en_US/help/topic/GD9PMU58BV24QFZ7) | 02 sheet 1 | KDP Select terms — 90-day Kindle-store exclusivity, auto-renews | 2026-08-12 | verified 2026-08-12 |
| 29 | GHASDBMPJDXLKXBC (KDP help-topic ID, cited bare in 02 sheet 1; full: https://kdp.amazon.com/en_US/help/topic/GHASDBMPJDXLKXBC) | 02 sheet 1 | KDP signup — legal name, mailing address, identity verification (ID photos) | 2026-08-12 | verified 2026-08-12 |
| 30 | https://support.google.com/books/partner/answer/3250840 | 02 sheet 2 | Google Partner Center signup — payment profile, bank micro-deposit verification | 2026-08-12 | verified 2026-08-12 |
| 31 | https://support.google.com/books/partner/answer/14164701 | 02 sheet 2 | Google Play Books — audiobooks can be uploaded | 2026-08-12 | verified 2026-08-12 |
| 32 | https://support.google.com/books/partner/answer/9331459 | 02 sheet 2 | Google Play Books royalty — 70% of list price (2019 TOS, 60+ countries incl. EG/SA/AE/JO/KW/LB/OM/QA/BH; not IQ/SY), else 52% | 2026-08-12 | verified 2026-08-12 |
| 33 | https://authors.apple.com/support/3967-create-itunes-connect-account | 02 sheet 3 | Apple Books account setup — iTunes Connect application, publisher type, banking + tax info | 2026-08-12 | verified 2026-08-12 |
| 34 | https://itunespartner.apple.com/books/support/7-required-tax-forms | 02 sheet 3; 06 §1, §4 | Apple tax forms — US tax form mandatory for ALL partners (W-8BEN etc.); Ireland exporter-status ended April 2026 | 2026-08-12 | verified 2026-08-12 |
| 35 | https://authors.apple.com/ | 02 sheet 3 | Apple Books for Authors — 70% flat royalty on every ebook, no delivery fees | 2026-08-12 | verified 2026-08-12 |
| 36 | https://support.apple.com/en-us/HT204411 | 02 sheet 3 | Apple Books availability — Iraq: not available at all; Syria: not listed; GCC: "Public domain books only" | 2026-08-12 | verified 2026-08-12 |
| 37 | https://www.kobo.com/ww/en/p/writinglife | 02 sheet 4 | Kobo Writing Life landing — free, no exclusivity, "up to 70%" royalty, "190+ countries" claim, banking info required before publishing | 2026-08-12 | verified 2026-08-12 |
| 38 | 360058975652 (Kobo help-article ID, cited bare in 02 sheet 4) | 02 sheet 4 | Kobo setup specifics — W-8BEN article exists in KWL help center | 2026-08-12 | verified 2026-08-12 |
| 39 | 360059385631 (Kobo help-article ID, cited bare in 02 sheet 4) | 02 sheet 4 | Kobo bank-info article — title verified via search; **article body 404 on direct fetch (FLAG)** | 2026-08-12 | dead (404) |
| 40 | https://www.kobo.com/ | 02 sheet 4 | Kobo storefront — UI has no Arabic (16 interface languages, none Arabic) | 2026-08-12 | verified 2026-08-12 |
| 41 | https://kobowritinglife.zendesk.com | 02 sheet 4 | Kobo Writing Life help center | 2026-08-12 | verified 2026-08-12 |
| 42 | https://www.smashwords.com/about | 02 sheet 6 | Smashwords — merged with D2D (March 2022); **store-only since January 2026**; 1M+ DRM-free ebooks, ~100k free titles claims | 2026-08-12 | verified 2026-08-12 |
| 43 | https://www.ingramspark.com/pricing | 02 sheet 7 | IngramSpark — $0 free signup + upload; ebook conversion $0.60/page; 85% of net royalty | 2026-08-12 | verified 2026-08-12 |
| 44 | https://www.ingramspark.com/how-it-works | 02 sheet 7 | IngramSpark — own ISBN required (free for US publishers only); 45,000+ retailers/libraries claim; bank account or PayPal (US) | 2026-08-12 | verified 2026-08-12 |
| 45 | https://help.ingramspark.com/hc/en-us/articles/5338799977485 (chapter also cites bare ID 5338799977485) | 02 sheet 7 | IngramSpark ebook payments — retailers report 25 days after month end; payments 90 days from end of reporting month | 2026-08-12 | verified 2026-08-12 |
| 46 | https://help.ingramspark.com/hc/en-us/articles/5281113497485 (chapter also cites bare ID 5281113497485) | 02 sheet 7 | IngramSpark getting started — banking info or PayPal (US) for direct deposit | 2026-08-12 | verified 2026-08-12 |
| 47 | https://help.ingramspark.com/hc/en-us/articles/16684961523085 | 02 sheet 7 | IngramSpark eligible-country list — "authors must be located in one of the countries listed"; print list has UAE but **not Iraq/Syria**; ebook list narrower → ❌ residency gate | 2026-08-12 | verified 2026-08-12 |
| 48 | https://help.ingramspark.com/hc/en-us/search?query=arabic | 02 sheet 7 | IngramSpark Arabic RTL handling documented ("books written in Arabic that should be read from right to left") | 2026-08-12 | verified 2026-08-12 |
| 49 | https://web.archive.org/web/20260731185424/https://press.barnesandnoble.com/ | 02 sheet 8 | B&N Press — live per Wayback capture 2026-07-31; from Iraq-region IP the domain geo-redirects to publisher.abjjad.com (observed, not policy) | 2026-08-12 | verified 2026-08-12 |
| 50 | https://publishdrive.com/pricing.html | 02 sheet 9; 05 Step 0 | PublishDrive — free 1-book plan, 100% royalties, 50+ retailers & 240K libraries claim; **plan prices JS-rendered and did not render (FLAG)** | 2026-08-12 | verify at signup (JS-gated) |
| 51 | https://www.streetlib.com/ | 02 sheet 10; 05 $0 path | StreetLib — $99/yr or $299 lifetime; 85% of net revenue; 39,000 retailers/50+ partnerships claim (rendered snapshot page-2026-08-12T06-57-07-364Z.yml) | 2026-08-12 | verified 2026-08-12 |
| 52 | streetlib.com/ar (path only, cited in 02 sheet 10 — Arabic site section "exists historically"; not verified this session) | 02 sheet 10 | StreetLib Arabic-language site section (FLAG) | 2026-08-12 | verify at signup |
| 53 | https://www.lulu.com/sell/sell-on-lulu | 02 sheet 11 | Lulu — "Free to Publish"; Bookstore 80% of revenue after printing costs; direct sales 100% of profit | 2026-08-12 | verified 2026-08-12 |
| 54 | https://www.lulu.com/ | 02 sheet 11 | Lulu homepage — retail distribution 40,000+ retailers, 200+ country fulfillment claim | 2026-08-12 | verified 2026-08-12 |
| 55 | https://help.lulu.com/en/support/solutions/articles/64000255468-tax-and-withholding-the-basics | 02 sheet 11; 06 §1, §3, §4 | Lulu tax article — 30% withholding **only on US-delivered sales** for Lulu-ISBN royalties (documented narrower scope); own-ISBN = no US withholding; 1042-S; 1099-K US-only context | 2026-08-12 | verified 2026-08-12 |
| 56 | https://help.lulu.com/en/support/search?q=arabic | 02 sheet 11 | Lulu KB search for "arabic" — no results (Arabic-specific program not documented; FLAG) | 2026-08-12 | verified 2026-08-12 |
| 57 | leanpub.com/ (scheme-less as cited in 02 sheet 12 Sources) | 02 sheet 12 | Leanpub — free author account, PayPal-linked payouts; tiered 90/85/80/50 royalty structure (FLAG verify) | 2026-08-12 | verified 2026-08-12 |
| 58 | https://gumroad.com/pricing | 02 sheet 13 | Gumroad — 10% + $0.50 per transaction (30% via Discover); merchant of record since 2025-01-01 | 2026-08-12 | verified 2026-08-12 |
| 59 | https://help.gumroad.com/article/76-payouts | 02 sheet 13 | Gumroad payouts article — **behind login (gated)**; direct-deposit countries list not public | 2026-08-12 | verify at signup (login-gated) |
| 60 | payhip.com/pricing (scheme-less as cited in 02 sheet 14) | 02 sheet 14 | Payhip pricing page — **blocked (400) from the research network**; plans 5%/2%/0% from aggregator sources only (FLAG verify) | 2026-08-12 | dead (400) |
| 61 | https://www.patreon.com/pricing | 02 sheet 15 | Patreon — 10% of income + processing; no Stripe setup needed; payouts in 16+ currencies | 2026-08-12 | verified 2026-08-12 |
| 62 | https://support.patreon.com/hc/en-us/articles/39694936541965-Payouts-guide-for-creators-outside-of-the-US | 02 sheet 15; 02 gray-area box | Patreon payouts guide — IQ/SY in none of the three payout lists; bank transfers via Payoneer; US-bank-country option documented (not a documented right) | 2026-08-12 | verified 2026-08-12 |
| 63 | https://help.ko-fi.com/hc/en-us/articles/360002506494 | 02 sheet 16 | Ko-fi help — 0–5% fees, payments to the creator's own PayPal or Stripe, Ko-fi Gold 0% service fees ($8/mo asserted in secondary sources — FLAG) | 2026-08-12 | verified 2026-08-12 |
| 64 | https://help.ko-fi.com/hc/en-us/search?query=withdraw+paypal+payout | 02 sheet 16 | Ko-fi help search — result "How do I get paid?" (creator's own PayPal or Stripe; no minimum) | 2026-08-12 | verified 2026-08-12 |
| 65 | https://support.substack.com/hc/en-us/articles/4405482746132 | 02 sheet 17 | Substack — paid subscriptions require the author's own Stripe account | 2026-08-12 | verified 2026-08-12 |
| 66 | https://substack.com/ | 02 sheet 17 | Substack homepage — posts/newsletters, PDF attachments, podcasting | 2026-08-12 | verified 2026-08-12 |
| 67 | https://support.substack.com/hc/en-us/articles/360037607131 | 02 sheet 17 | Substack fees — 10% + Stripe 2.9% + $0.30 + 0.7% recurring-billing fee (as of 2024-07) | 2026-08-12 | verified 2026-08-12 |
| 68 | https://support.substack.com/hc/en-us/search?query=receive+payouts | 02 sheet 17 | Substack help search — payouts via the author's own Stripe; Stripe country coverage gates Substack | 2026-08-12 | verified 2026-08-12 |
| 69 | https://support.wattpad.com/hc/en-us/articles/18999845281556 | 02 sheet 18 | Wattpad — monetization programs invite-only (Wattpad Originals / Creators Program) | 2026-08-12 | verified 2026-08-12 |
| 70 | https://support.wattpad.com/hc/en-us/articles/360037395112 | 02 sheet 18 | Wattpad — Originals languages EN/ES/FIL/DE/ID/FR — **no Arabic**; Coins/Premium+ paywall | 2026-08-12 | verified 2026-08-12 |
| 71 | 211678146 (Wattpad help-article ID via search snippet, cited bare in 02 sheet 18) | 02 sheet 18 | Wattpad — "currently no opportunities to make money from ads on your stories" (official text via search snippet) | 2026-08-12 | verified 2026-08-12 (search snippet) |
| 72 | https://www.wattpad.com/paid-stories | 02 sheet 18 | Wattpad Paid Stories page — **404 (dead)**; program page gone | 2026-08-12 | dead (404) |
| 73 | https://reamstories.com/ | 02 sheet 19 | Ream — JS-only app ("Login"/"Join"); serialized fiction (romance/MM niches); details unverifiable in research (rendered snapshot page-2026-08-12T06-57-43-886Z.yml) | 2026-08-12 | verified 2026-08-12 |
| 74 | https://books.kotobee.com/signup | 02 sheet 20; 05 Step 2 | Kotobee Books signup — country dropdown **includes "Syrian Arab Republic" and "Iraq"**; "Publish for free and earn 100% royalties" | 2026-08-12 | verified 2026-08-12 |
| 75 | 8000120127 (Kotobee support-article ID, cited bare in 02 sheet 20; full URL in the Kotobee dossier `research_doc/kotobee_publishing/99_appendix_links.md`) | 02 sheet 20 | Kotobee Books publish guide — EPUB/KPUB only, 500 MB max, "100% royalties for a limited time" promo wording | 2026-08-12 | verified 2026-08-12 |
| 76 | https://support.kotobee.com/en/support/solutions/articles/8000111089-collect-payments-in-kotobee-books | 02 sheet 20; 05 Step 2 | Kotobee Books payouts — author's own Stripe (publishable + secret keys) or PayPal (client ID + secret) at publish time | 2026-08-12 | verified 2026-08-12 |
| 77 | https://support.kotobee.com/en/support/solutions/articles/8000130253-kotobee-v1-9-8-platform-release-7th-july-2026 | 02 sheet 20 | Kotobee v1.9.8 release (2026-07-07) — eFinance gateway added for Egyptian audiences (availability to non-Egyptians unverified) | 2026-08-12 | verified 2026-08-12 |
| 78 | 8000111373 (Kotobee support-article ID, cited bare in 02 sheet 20 — v1.8.10 release note; full URL not captured in research) | 02 sheet 20 | Kotobee v1.8.10 release note (2023-08-16) — selling enabled; "100% royalties for a limited time" promo wording; 10,000 ebooks in shared library at that time | 2026-08-12 | verified 2026-08-12 |
| 79 | https://rufoof.com/ar/publishers | 02 sheet 21; 03 Card 3 | Rufoof participating-publishers page — 20 entities incl. individual authors; "نشر ذاتي" self-publishing entity exists | 2026-08-12 | verified 2026-08-12 |
| 80 | https://rufoof.com/ar/publisher/2/-- | 02 sheet 21; 03 Card 3 | Rufoof "نشر ذاتي" profile — placeholder (no books listed); company footer address Riyadh, Saudi Arabia | 2026-08-12 | verified 2026-08-12 |
| 81 | https://rufoof.com/ar | 02 sheet 21; 03 Card 3 | Rufoof Arabic storefront — Arabic categories incl. audiobooks (كتب صوتية) and summaries | 2026-08-12 | verified 2026-08-12 |
| 82 | https://rufoof.com/ | 02 sheet 21; 03 Card 3 | Rufoof homepage | 2026-08-12 | verified 2026-08-12 |
| 83 | https://play.google.com/store/apps/details?id=co.yaqut.app | 02 sheet 21; 03 Card 3 | Rufoof Play listing — 1M+ downloads, 4.8★, 30.9K reviews, "More than 30,000 titles" (claims, unaudited); developer ALYACOUTA AL HAMRAA (formerly branded "Yaqut"); updated 2026-08-11 | 2026-08-12 | verified 2026-08-12 |
| 84 | https://publisher.abjjad.com | 02 sheet 22; 03 Card 2 | Abjjad publisher portal — login-gated, "ليس لديك حساب؟ اتصل بنا" (no account? contact us); approval-gated onboarding | 2026-08-12 | verified 2026-08-12 |
| 85 | https://www.abjjad.com/ | 02 sheet 22; 03 Card 2 | Abjjad homepage — 6M+ active Arabic readers, 35K+ ebooks/audiobooks, 200+ publishers (claims, unaudited); subscription $9/mo, $32/6-mo, $54/yr | 2026-08-12 | verified 2026-08-12 |
| 86 | https://www.storytel.com/ae/en/ | 02 sheet 23; 03 Card 4; 04 Card 3 | Storytel UAE storefront — 800K+ stories, 200K+ titles claims (unaudited); $9.99/mo; Arabic catalog | 2026-08-12 | verified 2026-08-12 |
| 87 | https://www.storytel.com/eg | 02 sheet 23 | Storytel Egypt region — kitabsawti.com apex redirects here (Kitab Sawti brand absorbed) | 2026-08-12 | verified 2026-08-12 |
| 88 | kitabsawti.com (scheme-less as cited in 02 sheet 23 / 03 Card 4) | 02 sheet 23; 03 Card 4; 04 Card 3 | Kitab Sawti — **fails DNS (ERR_NAME_NOT_RESOLVED)**; apex redirects to storytel.com/eg; brand dead | 2026-08-12 | dead (DNS-fail) |
| 89 | /publisher · /publishing · /for-publishers (Storytel relative paths, cited in 02 sheet 23 / 03 Card 4 / 04 Card 3) | 02 sheet 23; 03 Card 4; 04 Card 3 | Storytel author-portal paths — **all 404**; no self-service author portal exists | 2026-08-12 | dead (404 ×3) |
| 90 | https://www.hindawi.org/ | 02 sheet 24; 03 Card 5 | Hindawi Foundation — registered charity no. 1181788 (England and Wales); no self-publishing channel; 300K+ monthly readers (claim) | 2026-08-12 | verified 2026-08-12 |
| 91 | https://www.neelwafurat.com/publishers.aspx | 02 sheet 25; 03 Card 1 | Neelwafurat "انشر كتابك" page — print needs a distributor in 1 of 7 countries **incl. Syria**; POD service; password-protected ePub; commission agreed in advance | 2026-08-12 | verified 2026-08-12 |
| 92 | https://www.neelwafurat.com/ | 02 sheet 25; 03 Card 1 | Neelwafurat homepage — Iraq free-shipping banner; Iraqi phone +964 773 113 3765; iKitab + masmu3 apps | 2026-08-12 | verified 2026-08-12 |
| 93 | https://ireadhub.com/ | 02 sheet 26; 03 Card 6 | iRead Hub — **spam-compromised homepage** (casino/gambling SEO links: aviator, pin-up, mostbet, 1xbet-style); treat web content as untrusted; never log in or enter payment details here | 2026-08-12 | verified 2026-08-12 (spam-compromised — see dead table warning) |
| 94 | https://play.google.com/store/apps/details?id=com.victorylink.iRead | 02 sheet 26; 03 Card 6 | iRead eBooks Play listing — 100K+ downloads (claim); developer IREAD FOR ART PRODUCTION, Maadi, Cairo; updated 2026-08-05 | 2026-08-12 | verified 2026-08-12 |
| 95 | https://help.acx.com/s/article/how-royalties-work | 02 sheet 27; 04 Card 1; 05 Step 3 | ACX royalties — new model 50% (exclusive) / 30% (non-exclusive) eff. 2026-05-26; legacy 40/25 to year-end; monthly bank payout USD/GBP/EUR/CAD, $50 carry-forward | 2026-08-12 | verified 2026-08-12 |
| 96 | https://help.acx.com/s/global-search/what%20languages (angle file and 04 Card 1 cite the relative form `/s/global-search/what%20languages`; full form appears in 02 sheet 27) | 02 sheet 27; 04 Card 1 | ACX language search — returns **no language-support article** (negative evidence for Arabic support) | 2026-08-12 | verified 2026-08-12 |
| 97 | https://help.acx.com/s/global-search/arabic | 02 sheet 27; 04 Card 1 | ACX search for "arabic" — **zero Arabic-language articles** (negative evidence, documented absence) | 2026-08-12 | verified 2026-08-12 |
| 98 | https://www.findawayvoices.com/ | 02 sheet 28; 04 Card 2 | Findaway Voices — **redirects to voicesbyinaudio.com** (rebrand observed 2026-08-12; footer still "©2023 Findaway Voices by Spotify") | 2026-08-12 | verified 2026-08-12 |
| 99 | https://www.voicesbyinaudio.com/ | 02 sheet 28; 04 Card 2 | Voices by INaudio — non-exclusive global distribution; royalty split **not published** (legacy ~80/20 unverified) | 2026-08-12 | verified 2026-08-12 |
| 100 | /features (relative path, cited in 02 sheet 28 / 04 Card 2 — voicesbyinaudio.com/features) | 02 sheet 28; 04 Card 2 | Voices by INaudio features — "fast, reliable payments" (claim) | 2026-08-12 | verified 2026-08-12 |
| 101 | https://play.google.com/store/apps/details?id=com.rega.android | 02 sheet 29; 03 §4 | REGA Kurdish Digital Library — 10K+ downloads (claim); consumer library, no author portal | 2026-08-12 | verified 2026-08-12 |
| 102 | https://play.google.com/store/apps/details?id=com.wisedevs.wise_library | 02 sheet 29; 03 §4 | Wise Library کتێبخانەی زیرەک — 100K+ downloads (claim); books "collected from various internet sources" (aggregation model, no author payments) | 2026-08-12 | verified 2026-08-12 |
| 103 | https://www.jamalon.com | 02 sheet 30; 03 §4 | Jamalon — **defunct**: TLS cert invalid on apex + www (ERR_CERT_COMMON_NAME_INVALID); HTTP error page; shared-hosting IP | 2026-08-12 | dead (TLS failure) |
| 104 | https://tafaseel.com | 02 sheet 30; 03 §4 | Tafaseel — **defunct**: domain parked for sale on GoDaddy (redirect to forsale.godaddy.com) | 2026-08-12 | dead (parked) |
| 105 | https://yaqoot.sa | 02 sheet 30; 03 §4 | Yaqoot — **unreachable** (HTTPS aborted / HTTP timed out); Play "Yaqoot" = Zain KSA telecom app, not books | 2026-08-12 | dead (unreachable) |
| 106 | https://play.google.com/store/apps/details?id=com.sa.maana | 02 sheet 30; 03 §4 | Play "Yaqoot | ياقوت" — Zain KSA telecom app (5M+ downloads), NOT a book platform | 2026-08-12 | verified 2026-08-12 |
| 107 | https://play.google.com/store/apps/details?id=com.yaquot.store | 02 sheet 30; 03 §4 | Play "ياقوت" (com.yaquot.store) — general e-commerce shopping app, not books | 2026-08-12 | verified 2026-08-12 |

### Chapter 03 — Arabic channels (03_arabic_channels.md)

No dedicated rows — every 03 URL first appears in Chapter 02 and is traced via the "Used in" columns (rows 26, 79–94, 101–105; row 26 is the ch01-listed KDP Arabic help topic, also cited in 03 §2).

### Chapter 04 — Audiobooks (04_audiobooks.md)

| # | URL | Used in | Purpose/claim | Access date | Status |
|---|-----|---------|---------------|-------------|--------|
| 108 | voices.inaudio.com (hostname, no scheme, cited in 04 Card 2 — "Free registration at voices.inaudio.com") | 04 Card 2 | Voices by INaudio registration entry point | 2026-08-12 | verify at signup |

### Chapter 05 — Action plan (05_action_plan.md)

| # | URL | Used in | Purpose/claim | Access date | Status |
|---|-----|---------|---------------|-------------|--------|
| 109 | https://wordsrated.com/self-published-book-sales-statistics/ | 05 Reality check | WordsRated (updated 2026-03-27) — avg self-published ebook ~250 copies; 90% sell <100; avg author ~$1,000/yr; segment ~17%/yr growth | 2026-08-12 | verified 2026-08-12 |

### Chapter 06 — Tax 101 (06_tax_101.md)

| # | URL | Used in | Purpose/claim | Access date | Status |
|---|-----|---------|---------------|-------------|--------|
| 110 | https://support.google.com/books/partner/answer/10722804 | 06 §4 | Google tax help — "Submit your US tax information" FAQ (1099-K/1042-S mechanics for partners) | 2026-08-12 | verified 2026-08-12 |

### Canonical-flag URLs (from canonical flags 1–11 / angle-eligibility — not cited in chapters 01–06, kept for traceability)

| # | URL | Used in | Purpose/claim | Access date | Status |
|---|-----|---------|---------------|-------------|--------|
| 111 | https://kdp.amazon.com/terms-and-conditions | canonical flag 4; angle-eligibility §1.2 | KDP Terms and Conditions — page is a **redirect**; exact sanctions-clause wording not captured in research | 2026-08-12 | verify at signup (redirect) |
| 112 | https://kdp.amazon.com/en_US/help/topic/G200627430 | canonical flag 4; angle-eligibility §1.2 | KDP T&C help-topic URL — clause text not captured this pass; read the T&C at signup | 2026-08-12 | verify at signup |

**Total: 112 URLs** (rows 1–112, continuous numbering; deduplicated across chapters 01–06 — a URL is listed once, at its first-appearing chapter, with all citing chapters in "Used in").

**File-reference note (not a URL):** 02 sheet 20 cross-refs `research_doc/kotobee_publishing/01_kotobee_factsheet.md` (Kotobee factsheet from task T-2026-08-12-001) — kept as a file path, no URL constructed.

---

## Verify-at-signup checklist (every 🔶 item from the 02 matrix + canonical flags 1–11)

### 🔶 platforms (one row per 🔶 sheet in 02; canonical flag 6)

- [ ] **Smashwords** — payout terms via the D2D account (payout docs not accessible — reader FAQ only) — where: D2D account → payout settings (02 sheet 6)
- [ ] **B&N Press** — current requirements/royalties from a neutral network (page geo-redirected to Abjjad from Iraq-region networks; live per Wayback 2026-07-31 only) — where: press.barnesandnoble.com via a non-Iraq network (02 sheet 8)
- [ ] **Gumroad** — payout countries (direct-deposit list not public; help article behind login) — where: payout settings / help.gumroad.com/article/76-payouts (02 sheet 13)
- [ ] **Payhip** — pricing plans (payhip.com/pricing blocked 400) + any payout-country change — where: signup flow / pricing page from a neutral network (02 sheet 14)
- [ ] **Wattpad** — program terms + in-app purchase availability (Paid Stories dead; Originals invite-only, no Arabic) — where: Wattpad Originals / support.wattpad.com (02 sheet 18)
- [ ] **Ream** — fees, payout rails, country support (JS-only app; ~10% + Stripe per trade press, unverified) — where: reamstories.com signup (02 sheet 19)
- [ ] **Leanpub** — exact royalty tiers (90/85/80/50 not verified this session) + PayPal country acceptance — where: leanpub.com/help / payout setup (02 sheet 12)
- [ ] **PublishDrive** — payout methods/countries + JS-rendered plan prices — where: publishdrive.com/pricing.html / account (02 sheet 9)
- [ ] **StreetLib** — payout methods/countries (help.streetlib.com not fetched) — where: help.streetlib.com / account (02 sheet 10)
- [ ] **ACX** — payout-country/bank acceptance (help.acx.com JS/CAPTCHA-gated) — where: ACX payout setup (02 sheet 27; 04 Card 1)
- [ ] **Voices by INaudio** — current royalty split + payout rails + Arabic-language acceptance — where: registration at voices.inaudio.com (02 sheet 28; 04 Card 2)
- [ ] **Rufoof** — royalty % + onboarding terms + payout method — where: outreach to support@rufoof.com (03 §3 template 1; 02 sheet 21)
- [ ] **Abjjad** — royalty % + onboarding criteria + payout — where: publisher.abjjad.com approval flow / feedback@abjjad.com (03 §3 template 1; 02 sheet 22)
- [ ] **Storytel** — current aggregator/publisher routes for Arabic self-published titles (no self-service portal; /publisher, /publishing, /for-publishers all 404) — where: signup/aggregator research; **no email captured — do not invent one** (02 sheet 23; 04 Card 3)
- [ ] **iRead** — existence of an author program + terms (web property ireadhub.com is spam-compromised — use the official app) — where: official app / contact; no author-facing email captured (02 sheet 26; 03 Card 6)
- [ ] **Apple Books** — Bank Country dropdown content for Iraq/Syria (canonical flag 5) — where: iTunes Connect → banking section (02 sheet 3)
- [ ] **Kobo Writing Life** — EFT reach to an Iraqi bank (canonical flag 5) — where: KWL dashboard → bank-add flow (02 sheet 4)
- [ ] **Kotobee Books** — "100% royalties" promo still active (canonical flag 11) — where: books.kotobee.com / support article 8000120127 (02 sheet 20)
- [ ] **Kotobee Books** — ToS AI-content clause (canonical flag 11) — where: books.kotobee.com/terms (02 sheet 20)
- [ ] **Kotobee Books** — Author paid-tier prices (JS-rendered) (canonical flag 11) — where: kotobee.com pricing page (02 sheet 20)

### Remaining canonical flags 1–11 (checkbox rows; flags 5 and 11 covered by the platform rows above)

- [ ] **Flag 1 — Payoneer registration for a KRG resident: THE decisive test** (gates KDP-PSP, D2D-Payoneer, Patreon-bank ≈ 60% of the matrix) — where: Test A, payoneer.com signup with the KRG address (01 §3; 05 Step 1)
- [ ] **Flag 2 — PayPal account availability for IQ/SY** (official list JS/CAPTCHA-gated; market-site probes negative) — where: Test B, paypal.com signup probe with the KRG address (01 §3; 05 Step 1)
- [ ] **Flag 3 — Wise availability for Iraq + participating-KDP-PSP status** (static list gated; wise.com/available-countries/ 404) — where: in-app availability check at wise.com
- [ ] **Flag 4 — KDP signup acceptance of an Iraqi (KRG) address + PSP-eligibility notice + T&C sanctions-clause wording** (T&C page is a redirect — https://kdp.amazon.com/terms-and-conditions) — where: KDP signup flow + KDP T&C (01 §2; angle-eligibility §1.2)
- [ ] **Flag 7 — Arabic-channel royalty outreach:** Rufoof/Abjjad/Neelwafurat/Storytel terms are not public — where: send 03 §3 templates 1–2 (support@rufoof.com, feedback@abjjad.com, widadd@nwf.com)
- [ ] **Flag 8 — KRG bank USD account + incoming SWIFT reception** (user-side, uncitable) — where: your bank (05 Step 0)
- [ ] **Flag 9 — Gray-area workaround decision:** Patreon US-bank-country / Wise USD as KDP PSP / Stripe Atlas — user decision with account risk; never a recommended path (02 gray-area box; rows repeated below)
- [ ] **Flag 10 — Syria SST designation:** some platform compliance policies treat SST countries restrictively beyond OFAC — where: test per platform at signup; any refusal is appealable (01 §1)

---

## Gray-area workaround rows (traceability — flagged user decisions, never recommended; canonical flag 9)

| Workaround | What it is | Evidence (2026-08-12) | Label |
|------------|------------|----------------------|-------|
| **Patreon US-bank-country option** | A non-US creator may select the US as bank country for USD payouts (documented option, not a documented right); Patreon bank transfers processed via Payoneer | https://support.patreon.com/hc/en-us/articles/39694936541965-Payouts-guide-for-creators-outside-of-the-US | Account risk; compliance posture for a Syrian national unverified — **user decision** |
| **Stripe Atlas (US LLC incorporation)** | US incorporation path to obtain a Stripe account | no source URL captured in research (canonical flag 9) — re-verify before any decision | Account risk; compliance posture for a Syrian national unverified — **user decision** |
| **Wise USD account as KDP PSP** | Wise is a participating KDP PSP; a USD Wise account could act as the KDP payout account | https://wise.com/available-countries/ (404) · https://wise.com/gb/availability/ (JS probe) · https://kdp.amazon.com/en_US/help/topic/G6GLVRHVQZY4V4FX | Account risk; compliance posture for a Syrian national unverified — **user decision** |

---

## Contact sheet appendix (the 5 captured email addresses — verbatim, no others)

| Platform | Email | Purpose |
|----------|-------|---------|
| Rufoof | support@rufoof.com | Royalty/onboarding terms for the self-publishing ("نشر ذاتي") route (03 §3 template 1) |
| Abjjad | feedback@abjjad.com | Approval-gated onboarding at publisher.abjjad.com (03 §3 template 1) |
| Neelwafurat (ebook) | widadd@nwf.com | Ebook submission + commission terms (encrypted ePub; 03 §3 template 2) |
| Neelwafurat (print — optional per Q4) | manard@nwf.com | Print/POD route (distributor in 1 of 7 countries incl. Syria); optional lane only |
| Amazon KDP (Arabic support) | Arabic-KDP-Resolvers@amazon.com | Arabic eBook publishing + payout for an Iraq address (PSP/check; 03 §3 template 3) |

Platforms with **no captured contact** (do not invent one): Storytel (aggregator-only route), Hindawi (charity), iRead (no author program). — 03 §2

---

## Dead/404 URL table (for the record — 2026-08-12)

| URL / path | Status 2026-08-12 | Note |
|------------|-------------------|------|
| https://www.paypal.com/sy/webapps/mpp/home | dead (404) | No Syria market site (Test B expected-negative) |
| https://www.paypal.com/iq/webapps/mpp/home | redirect (not dead) | Redirects to the US homepage — no Iraq market site (negative evidence, kept here for contrast) |
| https://wise.com/available-countries/ | dead (404) | Wise availability page; use the in-app check instead |
| 360059385631 (Kobo help article) | dead (404) | Kobo bank-info article moved; title verified via search only |
| https://www.wattpad.com/paid-stories | dead (404) | Wattpad Paid Stories program page gone (status change 2026) |
| payhip.com/pricing | dead (400) | Blocked from the research network; plan prices from aggregator sources only (FLAG) |
| ko-fi.com (main site) | dead (400) | Blocked from the research network (angle-platforms-en FLAG 22); help.ko-fi.com articles used instead |
| kitabsawti.com | dead (DNS-fail) | ERR_NAME_NOT_RESOLVED; apex redirects to storytel.com/eg — brand dead |
| /publisher · /publishing · /for-publishers (storytel.com) | dead (404 ×3) | Storytel author-portal paths — all 404; no self-service author portal |
| https://www.jamalon.com | dead (TLS failure) | ERR_CERT_COMMON_NAME_INVALID on apex + www; shared-hosting IP; plain HTTP serves an error page |
| https://tafaseel.com | dead (parked) | Domain parked for sale on GoDaddy (redirect to forsale.godaddy.com) |
| https://yaqoot.sa | dead (unreachable) | HTTPS aborted / HTTP timed out; Play "Yaqoot" (com.sa.maana) = Zain KSA telecom app, not books |
| https://ireadhub.com/ | live but untrusted | Spam-compromised homepage (casino/gambling SEO links) — never log in or enter payment details via this domain; use the official app |
