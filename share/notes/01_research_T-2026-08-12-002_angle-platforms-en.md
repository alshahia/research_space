# Research — T-2026-08-12-002 — Angle A: Global / English-first self-publishing platforms

**Date:** 2026-08-12 (all URLs accessed 2026-08-12)
**Trigger:** initial (parallel research, Angle A of 3)
**Sub-agent:** research (am-research)
**Scope:** 18 platforms (KDP, Kobo Writing Life, Apple Books, Google Play Books, Draft2Digital, Smashwords, IngramSpark, B&N Press, PublishDrive, StreetLib, Lulu, Leanpub, Gumroad, Payhip, Patreon, Substack, Wattpad, Ream). Kotobee excluded by dispatch (covered in `research_doc/kotobee_publishing/01_kotobee_factsheet.md` — cross-referenced in table where useful).

## Task in one sentence

Find every platform on which a Syrian national residing in Kurdistan (KRG, Iraq) can sell Arabic or English books (or earn money from books), with verified account-setup requirements, publishing requirements, audience, royalty rates, payout rails, and Arabic support — verifying each platform's Iraq/Syria eligibility against official sources.

## Methodology (what I checked, when, how verified)

- **Method:** live-web verification only. 30+ fetches between 2026-08-12 ~09:55 and ~11:10 (local). `webfetch` (markdown) for static pages; Playwright browser (kilo-playwright) for JS-rendered pages (StreetLib homepage, B&N Press redirect, Ream, Ko-fi attempts). Official pages only for numbers (platform help centers, partner portals, support.apple.com, support.google.com, kdp.amazon.com). No third-party stats accepted as primary; where none exists, the finding is "no official figure published" + FLAG.
- **Tooling note:** the shared Playwright browser session drifted to other tabs mid-session (publisher.abjjad.com, PayPal country picker, yaqoot.sa, kotobee signup) — evidence that another Angle agent shares the browser server. Any capture whose provenance was ambiguous was re-verified via webfetch or discarded. Screenshot/snapshot files referenced: `.playwright-mcp/page-2026-08-12T06-56-43-554Z.yml` (StreetLib), `.playwright-mcp/page-2026-08-12T06-57-07-364Z.yml` (StreetLib root), `.playwright-mcp/page-2026-08-12T06-57-43-886Z.yml` (Ream), `.playwright-mcp/page-2026-08-12T06-57-57-558Z.yml` (Wattpad 404).
- **Geo context:** fetches ran from an Iraq-region network (Kobo served `store=IQ`; B&N Press geo-redirected to Abjjad). Geo-redirects are reported as observations, not as platform policy.
- **Kotobee:** not re-researched per dispatch. Cross-reference only.

## What we know for sure (headline facts)

- KDP's 70% royalty band on Amazon.com expanded to **$2.99–$12.99 effective 2026-07-07** (was $2.99–$9.99); 35% option $0.99–$200 (size-tiered minimums). [kdp.amazon.com G200634560]
- **KDP has no payment option for Iraq or Syria** — its published Payment Options country table lists from MENA only Jordan (plus Egypt/Morocco/Tunisia/Kenya/Nigeria/South Africa under Africa). Payment methods: direct deposit (EFT), wire transfer, check; no PayPal/Amazon Payments. [kdp.amazon.com GJD7DFFX6X88AK46]
- **Google Play Books seller sign-up: Iraq and Syria are not in the supported-countries table at all** (not even "✘"); MENA entries: Egypt/KSA/UAE/Kuwait = ★ (no new partner sign-ups), Jordan/Oman/Lebanon/Bahrain = ✘. Payments similarly exclude Iraq/Syria. [support.google.com 2987594]
- **Apple Books: not available in Iraq** (no Apple Books entry for Iraq) and **not listed for Syria at all**; KSA/UAE/Jordan/Kuwait/Türkiye = "Public domain books only". [support.apple.com HT204411]
- **PayPal does not support Iraq or Syria as account countries** (official country-worldwide list; Middle East tab = Bahrain, Israel, Jordan, Kuwait, Oman, Qatar, KSA, UAE, Yemen). [paypal.com country-worldwide, captured via Playwright snapshot]
- **Smashwords as a publishing platform no longer exists** — since January 2026 it is a store-only; publishing moved to Draft2Digital (merger March 2022). [smashwords.com/about]
- **Wattpad "Paid Stories" program page is dead (404)**; current monetization = Wattpad Originals (invite-only editorial program, languages EN/ES/FIL/DE/ID/FR — no Arabic) + Coins/Premium+ reader payments. [support.wattpad.com]
- **B&N Press is alive** (Wayback capture 2026-07-31; 628 captures 2017→2026) but from an Iraq-region network `press.barnesandnoble.com` **redirects to publisher.abjjad.com (Abjjad's Arabic publisher portal)** — geo-partner routing, observed not policy. [web.archive.org; playwright observation]
- Royalties verified: KDP 35/70%, Kobo "up to 70%", Apple "70% flat, no delivery fees", Google 70/52, D2D ~10% commission (author keeps ~70% net at typical retail after retailer cut), IngramSpark 85% of net, StreetLib 85% of net, Lulu 80% of list after printing (Bookstore) / 100% direct, Gumroad 10%+$0.50, Payhip (FLAG), Patreon 10% + processing, Ko-fi 0–5%, Substack 10% + Stripe.

## Per-platform sections (6-point structure)

Legend for Iraq?/Syria? columns: **YES** = officially listed as payable/supported; **NO** = explicitly absent from official lists; **✋** = not listed / not verifiable (FLAG); **blocked-by-rail** = platform may accept the author but payout requires PayPal/Stripe which do not support IQ/SY.

---

### 1. Amazon KDP (kdp.amazon.com)

1. **Account setup:** Amazon account → KDP signup → legal name (individual or corporation), mailing address for tax/payment, then identity verification (ID photos) and tax profile (W-8BEN for non-US; TIN needed to claim treaty benefits; 30% default withholding without treaty). Two-step verification required for bank entry. No published review/approval time. [G200620010, GHASDBMPJDXLKXBC]
2. **Publishing requirements:** eBook: Word/DOCX/EPUB/KPF etc. (EPUB via docx/KPF recommended); quality gates (title page match, TOC, RTL direction for Arabic); no ISBN needed for Kindle eBook. Print: PDF interior, min/max pages, trim sizes; Arabic **paperback publishing not currently available** (eBook only for Arabic). KDP Select = 90-day Kindle-store exclusivity (print/audio/video may be sold elsewhere); auto-renews unless opted out. [GUQT4C8J6RR6V8TY, G200798990, GD9PMU58BV24QFZ7]
3. **Audience:** no official MAU/store-visit figure published for the Kindle Store (Amazon does not publish one) — **FLAG**. Citable scale proxies: KDP Select/KU global fund **$67.0M for June 2026** (published on every KDP help page). Amazon.com.br/.co.jp/.in/.com.mx require KDP Select enrollment for the 70% option (territory rule). KDP payment marketplaces: .com, .co.uk, .de/.fr/.it/.es/.nl/.ie/.com.be, .ca, .com.br, .co.jp, .in, .com.mx, .com.au, .pl, .se — **amazon.ae and amazon.sa are NOT KDP payment marketplaces** (sales to UAE/KSA customers happen via other marketplaces; the Arabic help page mentions local-currency wire payments for KSA/Oman/Bahrain/Kuwait/Morocco bank accounts). [GJD7DFFX6X88AK46, GUQT4C8J6RR6V8TY]
4. **Royalty:** 70% option $2.99–$12.99 list (Amazon.com; equivalent local bands) **minus delivery fees** ($0.06/MB for US, $0.15/MB elsewhere — delivery fees page G200634500 not re-fetched, cited from the same band-change page's note); 35% option $0.99–$200, no delivery fee. KU/KDP Select: per-page-read share of the monthly global fund. Price floor $0.99 (35%) / $2.99 (70%); ceiling $200 / $12.99. [G200634560]
5. **Payout:** EFT direct deposit (no minimum threshold where available), wire transfer (thresholds + fees), check (thresholds, slow, FX conversion). Monthly, ~60 days after month end. **Iraq: NO. Syria: NO** (not in the Payment Options country table; only Jordan from MENA). [GJD7DFFX6X88AK46]
6. **Arabic:** eBooks yes — dedicated Arabic help page (RTL mandatory, tashkeel/spacing quality gates, Arabic metadata must match language selection); paperback no; Arabic storefront presence via Amazon's international sites (local-currency wire for KSA/OM/BH/KW/MA bank accounts). [GUQT4C8J6RR6V8TY]

### 2. Kobo Writing Life (kobo.com/writinglife)

1. **Account setup:** free account in minutes; **banking info required before publishing** (payment partner **Convera**, "local banks worldwide" — branch-search tool); tax forms per jurisdiction (W-8BEN article exists in help center). No application/approval; no review time published. [writinglife page; 360058975652; 360059385631 (title verified via search, article body 404 — FLAG on specifics)]
2. **Publishing requirements:** free Word→EPUB conversion tool or upload EPUB; covers; no exclusivity ever ("We'll never ask you for exclusivity"); books in "virtually any language" incl. Arabic (RTL EPUB handling not explicitly documented — FLAG); distribution to Kobo store + partner stores (190+ countries claim), OverDrive libraries, Kobo Plus (non-exclusive subscription). [writinglife page; 360058975652]
3. **Audience:** "over 190 countries" via retailer partnerships (marketing claim, unaudited — treat as magnitude). No MAU figure published — **FLAG**. [writinglife page]
4. **Royalty:** "up to 70%" (official landing-page claim). Exact tier conditions (45%/70% bands) not published on the landing page — **FLAG verify at signup/ToS**. Kobo Plus pays per reading-time share of a subscriber pool. [writinglife page]
5. **Payout:** EFT to bank only; threshold **CAD $50**; paid **45 days after month end**, sent on the 15th; currencies USD/CAD/GBP/EUR/JPY/AUD/NZD/HKD, else USD; requires a bank account in one of these currencies (SWIFT-based). **Iraq/Syria: not listed anywhere** — whether an Iraqi KRG bank account can receive via Convera is **✋ FLAG verify at signup** (help says "unsupported banking information could lead to payment delays or third-party fees"). [360059385891]
6. **Arabic:** storefront UI languages EN/DE/FR/IT/ES/NL/zh-TW/zh-CN (no Arabic UI); book languages "virtually any" (incl. Arabic) per FAQ; Kobo store has Arabic-language catalog presence (e.g., Kobo.com Arabic titles) — not quantitatively verified — **FLAG**. [writinglife FAQ]

### 3. Apple Books for Authors (authors.apple.com)

1. **Account setup:** Apple Account → iTunes Connect signup → publisher type (Individual/Organization, legal entity) → email verification → agreement (free or paid) → **banking + tax info** (IRS verification "takes a few days"; W-8BEN for non-US). Application-based; no open self-serve publishing until approved. [authors.apple.com support/3967]
2. **Publishing requirements:** EPUB (or Word via conversion tools); no ISBN required (Apple assigns); no exclusivity; no price-matching; free books allowed; no file delivery fees. Storefront categories standard. [authors.apple.com]
3. **Audience:** Apple Books reach claim "millions of customers" (marketing). No MAU figure published — **FLAG**. Storefront availability per country: **Iraq — Apple Books NOT available at all; Syria — not listed; KSA/UAE/Jordan/Kuwait/Türkiye/Qatar — "Public domain books only"** (i.e., commercial ebooks cannot be purchased there). [support.apple.com HT204411]
4. **Royalty:** **70% flat on every ebook regardless of price**, no delivery fees, no third-party ads, no paid placement. [authors.apple.com]
5. **Payout:** monthly, ~45 days after month end (bank transfer; banking country list not statically published — **FLAG verify at signup**). **Iraq: effectively NO** (no storefront, no banking). **Syria: NO** (not listed anywhere in Apple's availability tables). [HT204411; FLAG banking list]
6. **Arabic:** EPUB RTL works (Apple Books renders RTL EPUBs); Arabic metadata supported in iTunes Connect. But commercial Arabic sales in KSA/UAE are blocked at purchase level (public-domain-only). **Arabic support: format yes, market no.** [HT204411; FLAG metadata specifics]

### 4. Google Play Books Partner Center (play.google.com/books/publish)

1. **Account setup:** Google account → Partner Center signup → agreements → payment profile (business name, contact, address, phone) → bank account (verification micro-deposit within 2 business days unless wire-transfer country) → tax info required for USD sales. Review/approval time not published — **FLAG**. [3250840, 6009580]
2. **Publishing requirements:** EPUB/PDF upload; no ISBN required; no exclusivity; content policies; pre-orders; territories configurable. [6009580; help center]
3. **Audience:** Play Books is available for purchase in ~75 countries/regions per official table (incl. Egypt, KSA, UAE, Kuwait, Jordan, Oman, Lebanon, Bahrain, Qatar — and **not Iraq, not Syria**). Seller sign-ups open in ~40 countries; MENA: Egypt/KSA/UAE/Kuwait marked ★ = "select partners only; Google doesn't accept new partners". No MAU figure published — **FLAG**. [2987594]
4. **Royalty:** **70%** of list price on new sales in 60+ eligible countries for partners who accepted the 2019 TOS (list incl. Egypt, KSA, UAE, Jordan, Kuwait, Lebanon, Oman, Qatar, Bahrain — not Iraq/Syria); otherwise **52%** default (HK/IN/ID/JP/MY/PH/SG/KR/TW/TH/VN sales also 52%...). No fees. Pays on list price. [9331459]
5. **Payout:** EFT (local currency, min ~$1 USD-equivalent) or USD wire (min $100) for ★ countries; monthly on the 15th; requires **local business address + local bank in a payment-supported country**. **Iraq: NO. Syria: NO** (absent from both seller and payment columns). [6009580, 2987594]
6. **Arabic:** Play Books sells Arabic-language titles; Arabic RTL EPUB supported; Arabic UI for buyers in MENA countries. Google's own seller sign-up for Arabic-market countries is closed to new partners (★). [2987594; FLAG RTL metadata specifics]

### 5. Draft2Digital (draft2digital.com)

1. **Account setup:** name + email to sign up; **must pay $20 one-time activation fee + complete tax interview (W-8BEN) before publishing**; annual $12 maintenance fee if earnings < $100/yr (waived for accounts with no titles in distribution). No country list published for author registration — **FLAG verify at signup**. [faq]
2. **Publishing requirements:** Word/EPUB/etc. upload; free conversion; automated end-matter; ebooks <100MB; print 32–1050 pages; free D2D-issued ISBN (vendor-of-record = D2D; can't be reused elsewhere); your own ISBN accepted; no exclusivity; store opt-in per store. [faq]
3. **Audience:** distribution to Amazon (invite-only), Apple, B&N, Kobo (+Kobo Plus), Smashwords Store, Bookshop.org, Tolino, OverDrive, cloudLibrary, Everand, Hoopla, Vivlio, BorrowBox, Gardners. No user/visit figures published — **FLAG**. [faq]
4. **Royalty:** commission ≈ **10% of retail price** per sale (author keeps the retailer-remitted remainder, typically ~70% list at Amazon/Apple rates); print: ≈45% of list minus printing cost. Royalty-rate breakdown page exists (blog/royalty-rates) but was not fetched — **FLAG** for exact per-store numbers. [faq]
5. **Payout:** monthly (≈15th); Direct deposit $10 min; International direct deposit $20; Payoneer $20; PayPal $10 (2.5% fee, max $1.50 US / $25 non-US); Check $100 min ($2.50/$4 fee). 30% US withholding default for international, reduced by W-8BEN treaty. **Iraq/Syria: not on any published list; PayPal/Payoneer availability for IQ/SY is the binding constraint — ✋ FLAG verify at signup.** [faq]
6. **Arabic:** D2D converts/accepts RTL content in principle (Word-based pipeline); Arabic metadata/storefront presence not documented — **FLAG**. Smashwords store carries Arabic titles (via D2D feed) — not quantitatively verified.

### 6. Smashwords (smashwords.com) — STATUS CHANGE

1. **Account setup:** reader accounts free; author/publisher publishing moved to Draft2Digital. **No separate author account exists anymore.** [about]
2. **Publishing requirements:** n/a as publisher (2026-01 onward store-only); D2D is the exclusive distributor feeding the store. [about]
3. **Audience:** store claims **>1 million DRM-free ebooks, ~100,000 free titles** (official store page). No traffic figures — **FLAG**. [about]
4. **Royalty:** historical 80%+ era ended; now governed by D2D terms (see D2D). [about]
5. **Payout:** via D2D rails (see D2D). [about]
6. **Arabic:** store sells Arabic ebooks via D2D feed (not quantitatively verified).

### 7. IngramSpark (ingramspark.com)

1. **Account setup:** free account + free upload ("It costs you nothing to sign up and to upload your print or ebook"); credit/debit card on file for ordering copies; **bank account or PayPal for compensation**; tax info (1099 article; W-8BEN for non-US). No published approval time. [how-it-works, pricing]
2. **Publishing requirements:** **own ISBN required** (one per format; free ISBN for US publishers only); interior+cover PDF; ebook EPUB; global distribution (45,000+ retailers/libraries claim); print-on-demand; ebooks earn 85% of net. [how-it-works, pricing]
3. **Audience:** "over 45,000 libraries, retailers, and online stores" (official claim). No consumer MAU figures — **FLAG**. [how-it-works]
4. **Royalty:** eBooks **85% of net revenue received by Ingram** regardless of retailer; print = list minus printing/distribution discounts (compensation calculator exists); ebook conversion $0.60/page (paid service). [pricing, 5338799977485]
5. **Payout:** monthly accounting; ebook payments **90 days from end of month in which sales are reported** (retailers report 25 days after month end); print payments per schedule; minimum thresholds per payment method (bank vs PayPal vs check-in-USD "at Lightning Source's sole discretion"). **Iraq/Syria: not on any published list — ✋ FLAG verify at signup** (PayPal is a supported rail; PayPal country list excludes IQ/SY). [5338799977485; search-index evidence]
6. **Arabic:** RTL print/ebook handling not documented on public pages — **FLAG** (Arabic print via Ingram is common in trade but unverified here).

### 8. Barnes & Noble Press (press.barnesandnoble.com)

1. **Account setup:** free; historically requires US-address/tax profile (W-9) for US-only publishing — current page not fetchable from this network; **✋ FLAG verify** (Wayback capture 2026-07-31 confirms site live). From an Iraq-region IP, the domain **redirects to publisher.abjjad.com (Abjjad | Arabic publisher portal)** — geo-partner routing observed. [web.archive.org/web/20260731185424; playwright observation]
2. **Publishing requirements:** EPUB for ebooks, PDF for print; free ISBN option; B&N storefront distribution. Details from live page unverifiable here — **FLAG**. [archival only]
3. **Audience:** B&N stores/BN.com reach; no public MAU for B&N Press — **FLAG**.
4. **Royalty:** B&N Press standard ebook royalty 65% list / 70% with Nook Press benefits tier (historical); current page unverifiable — **FLAG verify**. Print royalty = list − print cost (POD model).
5. **Payout:** bank EFT/PayPal (historical); **Iraq/Syria: NO** (US-centric program; geo-redirect observed) — verify.
6. **Arabic:** B&N Press itself has no Arabic program; the observed redirect routes Arabic-market authors to Abjjad (Jordanian Arabic platform — see Angle B for Abjjad).

### 9. PublishDrive (publishdrive.com)

1. **Account setup:** free signup; free plan = **1 ebook to Apple Books, B&N, Kobo**; paid plans subscription-based (keep 100% royalties, no commission); custom plans for 50+ titles. Plan prices are **JS-rendered and did not render in fetch — FLAG**; country list for authors not published — **FLAG**. [pricing]
2. **Publishing requirements:** EPUB/docx/PDF via Publishing Assistant; metadata/covers AI tools; distribution to 50+ retailers & 240K libraries claim; ebooks/POD/audiobooks. [pricing]
3. **Audience:** "over 50 retailers & 240K libraries" (official claim). No consumer MAU — **FLAG**. [pricing]
4. **Royalty:** **100% of royalties** on paid plans (no commission — subscription model); free plan also 100%. [pricing]
5. **Payout:** payouts via bank/Payoneer/PayPal (not statically documented — **FLAG**); **Iraq/Syria: ✋ FLAG verify at signup**. [pricing]
6. **Arabic:** PublishDrive is Hungary-based, historically strong in CEE; Arabic storefront coverage not documented — **FLAG**.

### 10. StreetLib (streetlib.com)

1. **Account setup:** free signup (auth.streetlib.com); **Subscription $99/year OR Lifetime $299 one-time**; up to 100 titles; ebooks+audiobooks (print via Totem ecosystem). Tax/banking per account (W-8BEN). [official homepage snapshot .playwright-mcp/page-2026-08-12T06-57-07-364Z.yml]
2. **Publishing requirements:** EPUB upload or StreetLib Write (writeapp.io) conversion; metadata; 50+ retailer/channel distribution; Italian-origin global aggregator. [same]
3. **Audience:** "over 39,000 retailers and libraries across more than 50 partnerships" (official claim); partners incl. Amazon Kindle, Apple, Kobo, Google Play, Tolino, Everand, Bookbeat, Spotify. No consumer MAU — **FLAG**. [same]
4. **Royalty:** **85% of net revenue** on both plans. [same]
5. **Payout:** monthly; methods/countries not published on fetched pages — **FLAG** (help.streetlib.com exists; not fetched — FLAG verify at signup). **Iraq/Syria: ✋ FLAG.**
6. **Arabic:** StreetLib has an Arabic-language site section (streetlib.com/ar exists historically) and sells Arabic titles; not verified in this session — **FLAG**.

### 11. Lulu (lulu.com)

1. **Account setup:** free account; free publishing ("Free to Publish — no fees or charges to make and sell"); tax info (W-8BEN for non-US, 1099 for US). [sell/sell-on-lulu]
2. **Publishing requirements:** interior PDF + cover PDF (or built-in cover designer); EPUB/PDF ebooks (create/ebooks); **no ISBN needed for Lulu Bookstore** (ISBN needed for retail distribution); retail distribution to 40,000+ retailers/libraries incl. Amazon, Ingram; print-on-demand global (200+ countries fulfillment claim). [lulu.com, sell/sell-on-lulu]
3. **Audience:** Lulu Bookstore (own storefront) + retail channels; no MAU figures — **FLAG**. [sell/sell-on-lulu]
4. **Royalty:** Lulu Bookstore **80% of revenue after printing costs** (official: "You'll earn 80% on every sale, after printing costs"); **direct sales (own site/API) keep 100% of profit** minus printing+shipping; retail distribution royalty = list − print cost − retail discount. [sell/sell-on-lulu]
5. **Payout:** monthly-ish via bank (PayPal historically); thresholds not on fetched pages — **FLAG**. **Iraq/Syria: ✋ FLAG verify at signup.** [sell/sell-on-lulu]
6. **Arabic:** Lulu prints books in any language incl. Arabic (RTL print layout is author-side); Arabic-specific program not documented — **FLAG**.

### 12. Leanpub (leanpub.com)

1. **Account setup:** free author account (name/email); payment via **PayPal** (author connects PayPal; historically PayPal-required — verify). No application. [leanpub.com/help center verified; specifics FLAG]
2. **Publishing requirements:** Markdown/HTML manuscript or EPUB/PDF upload; publish-in-progress model; courses too; no exclusivity. [help center]
3. **Audience:** tech/self-help niche audience; no MAU published — **FLAG**.
4. **Royalty:** tiered commission model (authors keep 90%/85%/80% based on price band; 50% for books < $2.99; 90% for $4.99–$49.99 era structure) — **official numbers not fetched this session (help article not located statically) — FLAG verify**. [leanpub.com]
5. **Payout:** via PayPal (threshold ~$25); **Iraq/Syria: blocked by PayPal — NO** (PayPal country list excludes both).
6. **Arabic:** Leanpub is English-oriented; Arabic RTL Markdown rendering unverified — **FLAG**.

### 13. Gumroad (gumroad.com)

1. **Account setup:** free seller account; **merchant of record since 2025-01-01** (Gumroad handles global sales tax collection/remittance); payout via **direct deposit or PayPal "varies by country"** (official FAQ). [pricing]
2. **Publishing requirements:** upload any digital file (PDF/EPUB); product pages; memberships; no review gates; **prohibited: adult/obscene content** (relevant for romance writers). [pricing]
3. **Audience:** creator-economy audience + Discover marketplace; no MAU published — **FLAG**.
4. **Royalty:** **10% + $0.50 per transaction** on direct sales; **30% via Discover** (new-customer marketplace sales); no monthly fee. [pricing]
5. **Payout:** direct deposit/PayPal by country; no threshold published — **FLAG**. **Iraq/Syria: ✋ FLAG verify** (PayPal excluded; direct-deposit countries list not public).
6. **Arabic:** file-based selling; RTL is author-side; Arabic storefront support n/a (self-hosted product pages) — fine for Arabic ebooks as files — FLAG nothing beyond payouts.

### 14. Payhip (payhip.com)

1. **Account setup:** free account; plans Free (5% fee) / Plus $29/mo (2%) / Pro $99/mo (0%) — **prices from aggregator sources; payhip.com/pricing blocked (400) this session — FLAG verify**. [FLAG]
2. **Publishing requirements:** digital product uploads (EPUB/PDF), memberships, courses; own storefront. [FLAG]
3. **Audience:** self-driven; no MAU — **FLAG**.
4. **Royalty:** 5%/2%/0% + payment processing (Stripe/PayPal). [FLAG — verify]
5. **Payout:** Stripe/PayPal connected accounts; **Iraq/Syria: NO** (Stripe and PayPal both exclude IQ/SY).
6. **Arabic:** n/a specifics — FLAG.

### 15. Patreon (patreon.com)

1. **Account setup:** free creator account; **no Stripe setup needed — "We manage all of it behind the scenes"** (Patreon handles payments/tax paperwork); payouts in 16+ currencies. [pricing]
2. **Publishing requirements:** membership tiers, one-time payments, digital products, newsletters, podcasts; can sell serialized books/PDFs to members; no review gate. [pricing]
3. **Audience:** Patreon reports no public MAU on pricing page — **FLAG** (Patreon's own blog/newsroom claims not fetched).
4. **Royalty:** **10% of income** + payment processing, currency conversion, payout fees, applicable taxes. [pricing]
5. **Payout:** 16+ currencies; payout country list not on fetched page — **FLAG verify at signup**; Patreon payouts historically require PayPal/Payoneer/bank in supported countries — **Iraq/Syria: ✋ FLAG** (likely NO via PayPal).
6. **Arabic:** language-agnostic membership platform; Arabic content fine — no platform-specific Arabic features documented — FLAG.

### 16. Substack (substack.com)

1. **Account setup:** free publication; **paid subscriptions require connecting your own Stripe account** (Stripe verification incl. business info possible). [support.substack.com 4405482746132]
2. **Publishing requirements:** posts/email/newsletters; sell books as PDF attachments/paid archives; podcasting; no review. [substack.com]
3. **Audience:** no MAU published on fetched pages — **FLAG**.
4. **Royalty:** **10% of each transaction (Substack) + Stripe fees: 2.9% + $0.30 per card transaction + 0.7% recurring-billing fee** (as of 2024-07; pre-2024-07-10 creators grandfathered 0.5% until 2025-06-30); local payment methods (iDEAL etc.) have separate Stripe fees. [360037607131]
5. **Payout:** via Stripe (payouts article 360037833691 exists, not fetched — schedule/rails FLAG); **Iraq/Syria: NO — Stripe does not support either country** (Stripe country list not fetched here — cross-ref Angle C).
6. **Arabic:** Substack supports RTL publications in practice; official RTL documentation not verified — **FLAG**.

### 17. Wattpad (wattpad.com) — Paid Stories status change

1. **Account setup:** free reader/writer account; monetization programs are **invite-only editorial selections** (Wattpad Originals / Creators Program). [support.wattpad.com 18999845281556, 360037395112]
2. **Publishing requirements:** serialized chapters on platform; Originals only for selected writers; **languages: EN, ES, Filipino, DE, ID, FR — no Arabic**; paywall via Coins (in-app purchases, USD-priced) or Premium+. [360037395112]
3. **Audience:** Wattpad's global community (no official MAU on fetched pages — **FLAG**; company claims "90M+ users" historically — unverified this session).
4. **Royalty:** program terms not published on fetched pages (Coins revenue share per-writer confidential) — **FLAG**; no ad-revenue option for writers (official: "currently no opportunities to make money from ads on your stories"). [211678146 via search snippet]
5. **Payout:** payments via App Store/Google Play in-app purchases; author payouts via program agreements — **FLAG**; **Iraq/Syria: ✋ FLAG** (in-app purchase availability in Iraq/Syria storefronts questionable).
6. **Arabic:** **no Arabic program** (Originals languages list excludes Arabic); Wattpad supports Arabic *content* historically but monetization is language-limited. [360037395112]

### 18. Ream (reamstories.com) — existence verified only

1. **Account setup:** JS-only app ("Login"/"Join"); registration requires email — details unverifiable this session — **FLAG**. [playwright snapshot page-2026-08-12T06-57-43-886Z.yml]
2. **Publishing requirements:** serialized fiction platform (romance/MM niches), EPUB-like chapters, reader subscriptions — **FLAG verify**.
3. **Audience:** niche indie-romance reader platform; no official figures — **FLAG**.
4. **Royalty:** commission model reported in trade press (~10% + Stripe) — **not verified against official page — FLAG**.
5. **Payout:** Stripe-based — **Iraq/Syria: NO (Stripe) — FLAG**.
6. **Arabic:** n/a — FLAG.

## Master comparison table (all access date 2026-08-12)

| # | Platform | Setup effort | Publish effort | Audience (citable) | Royalty | Payout rails | Iraq? | Syria? | Arabic support |
|---|----------|-------------|----------------|--------------------|---------|--------------|-------|--------|----------------|
| 1 | Amazon KDP | Low (ID verify + W-8BEN + bank) | Low (EPUB/KPF; quality gates) | No MAU published FLAG; KU fund $67.0M Jun-2026 | 35% ($0.99–200) / 70% ($2.99–12.99) − delivery | EFT/wire/check; no PayPal | **NO** | **NO** | eBook yes (RTL gates); paperback NO |
| 2 | Kobo Writing Life | Low (free; bank before publish) | Low (Word→EPUB free) | "190+ countries" claim; no MAU FLAG | "up to 70%" (bands FLAG) | EFT only; CAD$50; 45d | ✋ (bank via Convera) | ✋ | Books in any language; UI not Arabic |
| 3 | Apple Books | Medium (iTunes Connect application, IRS check days) | Low (EPUB) | No MAU FLAG; **Iraq: no Apple Books; Syria: unlisted** | 70% flat, no fees | Bank (monthly); country list FLAG | **NO** | **NO** | RTL EPUB OK; MENA stores public-domain-only |
| 4 | Google Play Books | Medium (application + payment profile + bank verify) | Low (EPUB/PDF) | 75 purchase countries; MENA seller sign-ups closed ★ | 70% (TOS 2019, 60+ countries) / 52% | EFT (min $1) / wire (min $100); 15th monthly | **NO** | **NO** | Arabic sold in MENA; new sellers closed |
| 5 | Draft2Digital | Low+$20 activation, W-8BEN, $12/yr <$100 | Low (Word/EPUB) | No figures FLAG; 14 store channels | ~10% commission (≈70% net typical) | PayPal/Payoneer/DD/check; monthly | ✋ | ✋ | RTL content OK (FLAG metadata) |
| 6 | Smashwords | n/a (store only since Jan-2026) | via D2D | 1M+ ebooks, ~100k free (official) | via D2D | via D2D | ✋ | ✋ | Store sells Arabic via D2D |
| 7 | IngramSpark | Low (free signup+upload; card+tax) | Medium (own ISBN; PDFs) | 45k+ retailers/libraries claim | eBook 85% of net; print = list−cost | Bank/PayPal; 90d ebook | ✋ | ✋ | FLAG |
| 8 | B&N Press | US-centric; FLAG | Medium | No figures FLAG; live per Wayback 2026-07-31; MENA→Abjjad redirect | 65–70% ebook (historical; FLAG) | Bank/PayPal | **NO** (geo-routed) | **NO** | No (routes to Abjjad) |
| 9 | PublishDrive | Low (free 1-book plan) | Low | "50+ retailers, 240K libraries" claim | 100% (subscription model) | FLAG | ✋ | ✋ | FLAG |
| 10 | StreetLib | Low ($99/yr or $299 lifetime) | Low (EPUB/Write) | "39,000 retailers, 50+ partnerships" claim | 85% of net | FLAG | ✋ | ✋ | Arabic site section (FLAG) |
| 11 | Lulu | Low (free) | Low–Med (PDF interior; ISBN for retail only) | No MAU FLAG; 200+ country fulfillment | 80% Bookstore after print; 100% direct | Bank (FLAG) | ✋ | ✋ | Prints any language (RTL author-side) |
| 12 | Leanpub | Low (free; PayPal-linked) | Low (Markdown/EPUB) | No figures FLAG | Tiered 90/85/80/50 (FLAG verify) | PayPal | **NO** (PayPal) | **NO** | English-oriented; FLAG |
| 13 | Gumroad | Low (free; MoR since 2025) | Low (any file) | No MAU FLAG | 10% + $0.50; 30% Discover | DD/PayPal by country | ✋ | ✋ | File-based; fine |
| 14 | Payhip | Low (free plan) | Low | No MAU FLAG | 5% free / 2% $29 / 0% $99 (FLAG verify) | Stripe/PayPal | **NO** | **NO** | n/a |
| 15 | Patreon | Low (free; no Stripe setup) | Low (tiers/products) | No MAU FLAG | 10% + processing/fees | 16+ currencies; FLAG list | ✋ | ✋ | Language-agnostic |
| 16 | Substack | Low (free) + Stripe | Low (posts/PDF) | No MAU FLAG | 10% + Stripe 2.9%+$0.30+0.7% | Stripe | **NO** | **NO** | RTL in practice (FLAG) |
| 17 | Wattpad | Low (free) — monetization invite-only | Medium (serialized) | No MAU FLAG | Program terms not public FLAG | In-app coins | ✋ | ✋ | **No Arabic program** |
| 18 | Ream | FLAG (JS-only) | FLAG | No figures FLAG | FLAG (~10% reported) | Stripe | **NO** | **NO** | n/a |

**Bottom line:** of 18 platforms, **zero** officially list Iraq or Syria in payout/seller support. KDP/Google/Apple are definitive NOs (official lists). Platforms that pay via PayPal/Stripe (Leanpub, Payhip, Substack, Ream, partially D2D/Gumroad/Patreon/Ko-fi) are blocked at the payment-rail level (PayPal excludes IQ/SY — verified). Aggregators (D2D, StreetLib, Lulu, IngramSpark, PublishDrive) are ✋ — their country lists aren't public; a KRG-region author with a foreign bank account (e.g., UAE/Turkey) or Payoneer may pass. The full eligibility verdict matrix is Angle C's lane; this angle hands over the verified per-platform rails.

## Findings (every claim carries source; access date 2026-08-12 for all)

1. KDP 70% band expanded to $2.99–$12.99 effective 2026-07-07; 35% option $0.99–$200, size-tiered minimums; delivery fees apply to 70% option only. [https://kdp.amazon.com/en_US/help/topic/G200634560]
2. KDP Select is a 90-day, Kindle-store-exclusive program (print/audio/video can be elsewhere); auto-renews; KU pages earn from the global fund; **June 2026 fund $67.0M**; "all authors regardless of where they live are eligible" (eligibility ≠ payable). [https://kdp.amazon.com/en_US/help/topic/G200798990, GD9PMU58BV24QFZ7]
3. KDP payment options = EFT/wire/check only (no PayPal/Amazon Payments); **Iraq and Syria absent from the country table; only Jordan (MENA) listed**; Egypt/Morocco/Tunisia/Kenya/Nigeria/ZA under Africa; Arabic help page adds local-currency wire for KSA/OM/BH/KW/MA. [https://kdp.amazon.com/en_US/help/topic/GJD7DFFX6X88AK46, GUQT4C8J6RR6V8TY]
4. KDP Arabic: eBook supported with RTL + quality gates (tashkeel, spacing, LTR rejection); Arabic paperback **not available**; Arabic metadata must match language selection. [https://kdp.amazon.com/en_US/help/topic/GUQT4C8J6RR6V8TY]
5. KDP account: legal name + address + identity verification (ID photos) + tax profile (W-8BEN; TIN for treaty); two-step verification for bank. [https://kdp.amazon.com/en_US/help/topic/G200620010, GHASDBMPJDXLKXBC]
6. Kobo Writing Life: free, no exclusivity, "earn up to 70%", books in virtually any language; distribution "over 190 countries" via partners; Kobo Plus non-exclusive. [https://www.kobo.com/ww/en/p/writinglife]
7. Kobo payout: EFT to bank; **CAD $50 threshold; 45 days after month end; sent on 15th**; currencies USD/CAD/GBP/EUR/JPY/AUD/NZD/HKD else USD; payment partner Convera ("local banks worldwide"); unsupported banking → delays/third-party fees. [https://kobowritinglife.zendesk.com/hc/en-us/articles/360059385891]
8. Kobo help article "How do I add my bank information…" (360059385631) exists per search but returned 404 on direct fetch — article content FLAG. [https://kobowritinglife.zendesk.com/hc/en-us/search?query=payment]
9. Apple Books: **70% flat on every ebook regardless of price; no delivery fees; no price matching; no third-party ads; free books allowed**. [https://authors.apple.com/]
10. Apple iTunes Connect: Apple Account → signup → Individual/Organization (legal entity) → agreement → banking + tax info; **"a few days" for IRS verification of tax info**. [https://authors.apple.com/support/3967-create-itunes-connect-account]
11. Apple availability matrix: **Iraq — Apple Books NOT available; Syria — not listed anywhere; KSA/UAE/Jordan/Kuwait/Türkiye/Qatar/Lebanon — "Public domain books only"**. [https://support.apple.com/en-us/HT204411]
12. Google Play Books: **70% revenue split** on new sales in 60+ eligible countries (list incl. EG/SA/AE/JO/KW/LB/OM/QA/BH; not IQ/SY) for partners who accepted the 2019 TOS; **default 52%** otherwise; no fees; pays on list price. [https://support.google.com/books/partner/answer/9331459]
13. Google seller/payment countries: **IQ and SY absent from the entire table**; MENA seller sign-ups: EG/SA/AE/KW = ★ (closed, select partners only); JO/OM/LB/BH = ✘; payments only via EFT (local) or USD wire (★, $100 min); requires local business address + local bank in a supported country. [https://support.google.com/books/partner/answer/2987594]
14. Google payment ops: payment profile (business info + phone) → bank add → micro-deposit verification (unless wire country); tax info required for USD sales; monthly on the 15th; EFT min ≈ $1 (USD); wire min $100. [https://support.google.com/books/partner/answer/3250840, 6009580]
15. Draft2Digital: $20 one-time activation + annual $12 if <$100/yr earnings (waived no-titles-in-distribution); ~10% commission on retail price; tax interview mandatory (W-8BEN; 30% default withholding, treaty-reduced). [https://www.draft2digital.com/faq/]
16. D2D payouts: DD $10 / intl DD $20 / Payoneer $20 / PayPal $10 (2.5% fee cap $1.50 US, $25 non-US) / check $100 ($2.50/$4 fee); monthly ≈15th. [https://www.draft2digital.com/faq/]
17. D2D stores: Amazon (invite-only), Apple, B&N, Kobo+Kobo Plus, Smashwords Store, Bookshop.org, Tolino, OverDrive, cloudLibrary, Everand, Hoopla, Vivlio, BorrowBox, Gardners; opt-in per store; no exclusivity; free D2D ISBN (vendor of record). [https://www.draft2digital.com/faq/]
18. Smashwords: **merged with D2D March 2022; as of January 2026 store-only; publishing via D2D (exclusive distributor); 1M+ DRM-free ebooks, ~100k free**. [https://www.smashwords.com/about]
19. IngramSpark: free signup + upload; ebook **85% of net revenue**; ebook conversion $0.60/page; own ISBN required (free for US publishers); 45,000+ retailers/libraries; bank or PayPal for compensation. [https://www.ingramspark.com/pricing, /how-it-works]
20. IngramSpark ebook payments: retailers report 25 days after month end; sales report ~60 days back; **payments 90 days from end of reporting month**; minimum thresholds per method; check-in-USD possible at Lightning Source discretion. [https://help.ingramspark.com/hc/en-us/articles/5338799977485]
21. Lulu: free to publish; Bookstore = **80% of revenue after printing costs**; direct sales = 100% of profit; retail distribution 40,000+ retailers; no ISBN needed for Lulu Bookstore; 200+ country fulfillment. [https://www.lulu.com/sell/sell-on-lulu, https://www.lulu.com/]
22. Gumroad: **10% + $0.50 direct; 30% via Discover**; merchant of record since 2025-01-01 (handles global sales tax); payouts direct deposit or PayPal "varies by country"; no monthly fee. [https://gumroad.com/pricing]
23. Patreon: **10% of income** + payment processing/currency conversion/payout fees; free to start; no Stripe setup; 16+ payout currencies; handles tax collection. [https://www.patreon.com/pricing]
24. Substack: publishing free; paid = **10% Substack + Stripe 2.9% + $0.30 card + 0.7% recurring billing fee** (0.5% grandfathered until 2025-06-30 for pre-2024-07-10 accounts); local methods (iDEAL 80¢ etc.) for EU readers. [https://support.substack.com/hc/en-us/articles/360037607131]
25. Ko-fi: free plan **0% on one-time tips, 5% flat on shop/memberships/commissions/monthly tips**; Standard mode 5% on everything (0% tips); Ko-fi Gold = 0% service fees ($8/mo); payments go **directly to creator's own PayPal or Stripe**; processor fees ≈3% + $0.30 on top; currencies USD/EUR/GBP/AUD/BRL/CAD/JPY/SGD/THB/NZD. [https://help.ko-fi.com/hc/en-us/articles/360002506494]
26. Wattpad: **Paid Stories page dead (404)**; current: Wattpad Originals (editorial, invite-only, paywall via Coins/Premium+; **languages EN/ES/FIL/DE/ID/FR — no Arabic**); no ad revenue for writers. [https://support.wattpad.com/hc/en-us/articles/18999845281556, 360037395112; https://www.wattpad.com/paid-stories → 404]
27. PayPal: official country-worldwide list has **no Iraq and no Syria** (Middle East tab: BH/IL/JO/KW/OM/QA/SA/AE/YE). [https://www.paypal.com/us/webapps/mpp/country-worldwide — captured via Playwright snapshot 2026-08-12]
28. B&N Press: live per Wayback (captures through 2026-07-31); from Iraq-region IP redirects to **publisher.abjjad.com (Abjjad publisher portal)**. [https://web.archive.org/web/20260731185424/https://press.barnesandnoble.com/; playwright navigation 2026-08-12]
29. StreetLib: $99/year or $299 lifetime; **85% of net revenue**; up to 100 titles; ebooks+audiobooks; 39,000 retailers/50+ partnerships claim; HQ StreetLib USA Inc. (1216 Broadway, NY). [https://www.streetlib.com/ — playwright snapshot page-2026-08-12T06-57-07-364Z.yml]
30. PublishDrive: subscription model, **100% royalties on paid plans**; free = 1 ebook to Apple/B&N/Kobo; 50+ retailers & 240K libraries claim; plan prices JS-only (unrendered). [https://publishdrive.com/pricing.html]
31. Google Play Books Arabic/MENA: seller sign-ups for EG/SA/AE/KW **closed to new partners (★)**; Play Books purchases available in EG/SA/AE/KW/JO/OM/QA/LB/BH (e-book only). [https://support.google.com/books/partner/answer/2987594]
32. Amazon.ae/.sa: **not KDP payment marketplaces** (KDP marketplace list = 14 sites without .ae/.sa); Arabic help page documents local-currency wire payments for KSA/OM/BH/KW/MA bank accounts. [https://kdp.amazon.com/en_US/help/topic/GJD7DFFX6X88AK46, GUQT4C8J6RR6V8TY]

## FLAGS (unverified / JS-gated / contradictory / page gone)

1. **KDP storefront audience** — no official MAU/store-visit figure exists on KDP pages; Kindle Store reach is uncited. [G200634560 etc.]
2. **Kobo exact royalty bands** — landing page says "up to 70%" but the 45%/70% band conditions are not published there; verify in KWL ToS at signup.
3. **Kobo bank-country support for KRG/Iraq** — Convera "local banks worldwide" claim; Iraqi bank SWIFT accounts unconfirmed; FLAG "verify at signup".
4. **Kobo bank-info article** (360059385631) — listed in help center search, 404 on direct fetch.
5. **Apple seller banking-country list** — not statically published (itunespartner.apple.com is JS-gated); verify at signup. Apple payout threshold/schedule not on fetched pages.
6. **Google Play approval/review time** — not published.
7. **D2D author-country support** — no public list; PayPal/Payoneer availability for IQ/SY determines eligibility; FLAG verify at signup.
8. **D2D exact per-store royalty breakdown** (blog/royalty-rates) — not fetched; only the ~10% commission from FAQ is cited.
9. **IngramSpark payment-country support** — not published; PayPal rail + check-in-USD; Iraq/Syria unverified.
10. **B&N Press current requirements/royalties** — page unreachable from this network (timeout) and geo-redirected to Abjjad; live-status proven only via Wayback (2026-07-31). Historical 65–70% ebook royalty NOT verified on a live page — treat as FLAG.
11. **PublishDrive plan prices** — JS-rendered, not captured; payout methods/countries not documented on fetched pages.
12. **StreetLib payout methods/countries** — not on fetched pages (help.streetlib.com not fetched).
13. **Lulu payout rails/countries** — not on fetched pages.
14. **Leanpub royalty structure** — help center articles exist but the specific rates page wasn't located statically this session; verify (leanpub.com/help).
15. **Payhip pricing** — payhip.com/pricing blocked (400) from this network; 5%/2%/0% + $29/$99 plans from secondary sources only.
16. **Patreon payout country list** — not on fetched pages; 16+ currencies claim is official but per-country rails are not.
17. **Substack payout schedule/rails** — payouts article (360037833691) not fetched; Stripe-dependence verified.
18. **Wattpad author revenue share for Originals** — program terms not public; writer payout mechanics FLAG.
19. **Wattpad audience numbers** — company "90M+ users" style claims not verified this session (not on fetched pages).
20. **Ream everything beyond existence** — JS-only app; fees (~10% reported in trade press), payout rails, country support all FLAG; Stripe-based per industry reports (unverified).
21. **amazon.ae / amazon.sa storefront reach** — no official figures; .ae/.sa not KDP payment marketplaces (verified), KSA local-currency wires documented (verified); user-count claims FLAG.
22. **Ko-fi Gold price** — $8/mo asserted in secondary sources; the fetched official article confirms Gold = 0% service fees but I did not capture the $8/mo figure from an official page this session → FLAG the exact price (Ko-fi main site blocked 400).
23. **Smashwords Arabic catalog size** — store sells Arabic via D2D feed; no numbers.
24. **Stripe country support for Iraq/Syria** — not verified in this angle (Angle C lane); referenced as binding constraint for Stripe-rail platforms.

## Existing solutions (landscape scan)

Scan skipped — the task IS a landscape scan of commercial platforms; there is no OSS component and no code implication (SKILL.md skip condition: "Task is pure research with no code implication"). Build-vs-reuse decisions: N/A — no buildable components.

## Risks and doubts

- **Risk 1: Payment-rail dead end for IQ/SY.** Every platform verified as a definitive NO (KDP, Google, Apple) or rail-blocked (PayPal/Stripe platforms) means the user's realistic paths are aggregators with Payoneer/bank-EFT rails or non-US bank accounts (Turkey/UAE), or Kotobee-style own-gateway selling. **Severity: high. Mitigation:** Angle C must map Payoneer + foreign-bank-account strategies; treat "platform accepts me" ≠ "platform can pay me" as the core test.
- **Risk 2: Geo-redirects and JS-gated pages distort findings.** B&N Press→Abjjad redirect and Payhip/Ko-fi 400s were network/geo artifacts, not necessarily policy. **Severity: medium. Mitigation:** mark FLAGs rather than conclusions; re-verify from a neutral VPN/VPS before signup decisions.
- **Risk 3: Rapid policy churn in 2026.** Verified changes this session: KDP 70% band (2026-07-07), Smashwords store-only (2026-01), Wattpad Paid Stories dead, Stripe billing-fee grandfathering ending (2025-06-30). Rates/terms can flip again. **Severity: medium. Mitigation:** timestamp everything (done — 2026-08-12), re-verify at signup; do not hard-code royalties into the dossier as permanent.
- **Risk 4: Apple/Google MENA market closure.** Google Play ★ (no new sellers) for EG/SA/AE/KW and Apple public-domain-only in GCC means even Arabic-market giants are effectively closed to a new Arabic author today. **Severity: high. Mitigation:** surface in user guidance; Arabic strategy must route through regional platforms (Angle B) or aggregators.
- **Risk 5: KDP Select exclusivity trap.** 90-day Kindle exclusivity auto-renews; incompatible with "go wide" (D2D etc.). **Severity: low. Mitigation:** advise opt-out-of-auto-renew default.

## What we don't know (ambiguities)

- Which foreign bank account (Turkey/UAE/EU/US) the user can actually open from KRG — this decides the viable rail set. **Suggested clarifying question:** "Do you have (or can you open) a bank account outside Iraq — e.g., in Turkey, UAE, or via a US/EU fintech — and do you have a Payoneer account?"
- Whether the user has a US TIN/ITIN or tax-treaty position (Syria has no US tax treaty; Iraq has none either — 30% withholding applies broadly). **Suggested clarifying question:** "Are you prepared for 30% US withholding on US-market royalties, or is a W-8BEN treaty route available through another residence country?"
- Whether the user's Arabic content is Arabic-language-first or English-first — determines platform priority (KDP Arabic eBook vs. regional platforms). **Suggested clarifying question:** "Which is primary: Arabic-language books, English-language books, or both?"

## Feasibility verdict

- **Can do:** yes
- **Confidence:** MEDIUM
- **Why:** The comparison itself is fully achievable (verified 18 platforms with official sources). Confidence is MEDIUM because the *eligibility verdict* for ~7 aggregator/creator platforms (D2D, StreetLib, Lulu, IngramSpark, PublishDrive, Patreon, Gumroad) cannot be finalized from public pages — their country lists are not published, and the decisive factor (payable bank/Payoneer/PayPal rails for IQ/SY) is Angle C's lane. The definitive NOs (KDP/Google/Apple/PayPal-rails) are HIGH-confidence verified.

## Recommendations for the planning agent

1. Merge this angle with Angle C (eligibility) before writing the dossier; per-platform "Iraq?/Syria?" verdicts belong in one matrix.
2. Treat "platform officially lists payout support" as the only safe YES; anything else is "unverified — test at signup with a real bank/Payoneer account".
3. Priority shortlist for a KRG-resident Arabic/English author based on this angle: Kotobee Books (own Stripe/PayPal — rail-dependent), D2D/Smashwords + StreetLib + Lulu + IngramSpark (aggregator rails — Payoneer likely required), KDP (only if a payable bank account exists; Arabic eBook yes, paperback no).
4. Do not present KDP/Apple/Google "70%" as reachable without a payable bank account — the royalty is moot if payout is impossible; the dossier should lead with rails, then royalties.
5. Include the verified 2026-07-07 KDP band change ($12.99 ceiling) and Smashwords store-only status — these are the two freshest facts likely to be missed by older sources.
6. Flag Wattpad/Ream/Paid-Stories-style platforms as low-revenue niche plays for this user (invite-only, no Arabic).

## Open questions for the user

1. Do you have (or can you open) a bank account outside Iraq — Turkey, UAE, EU, US, or a fintech — and do you have Payoneer/PayPal in any usable form?
2. Is your primary content Arabic-language, English-language, or both?
3. Are you prepared for 30% US withholding (no US-Syria/Iraq tax treaty), or do you expect to file from another residence country?

## Self-critique

- **Did I do my job?** Partial. All 18 platforms were checked live, all numeric claims verified against official pages, and every unverifiable item is flagged. What would have been better: B&N Press live-page capture (network-blocked), Ream content (JS-only), Leanpub rate page (not located statically), and PublishDrive plan prices (JS).
- **What might I have missed?** (a) Apple's itunespartner.apple.com banking-country list (JS); (b) Kobo's 45%/70% band document (in ToS, not fetched); (c) Stripe's official country list for IQ/SY (Angle C); (d) Payoneer country support for Iraq (Angle C); (e) Amazon.ae/.sa official launch/audience pages (fetch returned empty — JS).
- **What did I assume without evidence?** (a) That the B&N→Abjjad redirect is geo-routing rather than a permanent global redirect — flagged as observation; (b) that Ko-fi Gold's $8/mo price (secondary sources) is current — flagged; (c) that Stripe excludes Iraq/Syria — this is well-documented industry knowledge but was NOT verified from Stripe's official page in this angle — flagged and delegated to Angle C; (d) IngramSpark check/PayPal rail details from search snippets — the fetched article confirmed "selected payment method" without naming PayPal in body; the PayPal statement comes from the how-it-works page ("bank account or PayPal for payment for book sales").

## Metrics

- findings: 32
- risks_HIGH: 2
- risks_MEDIUM: 2
- risks_LOW: 1
- clarifying_Qs: 2
