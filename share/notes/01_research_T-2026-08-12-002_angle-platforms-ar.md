# Research — T-2026-08-12-002 (Angle B: Arabic/MENA platforms + audiobooks + Kurdish market)

**Date:** 2026-08-12
**Trigger:** initial (parallel Angle B dispatch; master merges with Angle A and Angle C)
**Sub-agent:** research (am-research)
**Angle file:** `share/notes/01_research_T-2026-08-12-002_angle-platforms-ar.md`

**All URLs accessed 2026-08-12** unless stated otherwise. Every factual claim below carries its source. Unverified claims are marked **FLAG**.

---

## Task in one sentence

Research every Arabic/MENA platform, audiobook channel, POD route, and Kurdish-market option where the user (Arabic/English author, **Syrian national residing in Kurdistan Region of Iraq**) can sell books or earn money — with account-setup, publishing requirements, audience, royalties, payout method, and Syria/KRG eligibility, all URL-verified on the live web.

---

## What we know for sure

- **Kotobee cross-check (mandated, quick):** Kotobee Books payout rails = author's **own Stripe (publishable+secret keys) or PayPal (client ID+secret)** connected at publish time (factsheet: `research_doc/kotobee_publishing/01_kotobee_factsheet.md:20-21`, support article 8000111089). Verified live today: the Kotobee Books signup form (https://books.kotobee.com/signup) collects only Full Name / Email / Password / Date of birth / Country — the **country dropdown includes "Syrian Arab Republic" and "Iraq"**, so Kotobee itself does not block Syrian onboarding; the real gate is whether the author can hold a Stripe/PayPal account (Angle C's lane). [https://books.kotobee.com/signup, 2026-08-12]
- **Kitab Sawti is dead as a brand/domain.** `https://www.kitabsawti.com` fails DNS in a browser (ERR_NAME_NOT_RESOLVED); `https://kitabsawti.com` (apex) **redirects to https://www.storytel.com/eg** — Kitab Sawti's audience/assets were absorbed into Storytel (Egypt region). [browser navigation, 2026-08-12; DNS nslookup via 8.8.8.8]
- **Jamalon is defunct.** `jamalon.com` resolves to a shared-hosting IP (50.87.177.107) but HTTPS fails on both apex and www with `ERR_CERT_COMMON_NAME_INVALID`, and plain HTTP serves "Error. Page cannot be displayed." [nslookup + browser, 2026-08-12]
- **Hindawi is now a charity, not a publisher marketplace.** hindawi.org is "Hindawi Foundation", a registered charity no. 1181788 in England and Wales, running Booktime + Safahat free libraries. Donation-funded; **no self-publishing channel exists**. [https://www.hindawi.org/, 2026-08-12]
- **Hindawi's successor for paid Arabic ebooks is Safahat-style free distribution** — not a revenue channel. [same source]
- **Findaway Voices rebranded: `findawayvoices.com` now redirects to `voicesbyinaudio.com` ("Voices by INaudio")**, footer still reads "©2023 Findaway Voices by Spotify All Rights Reserved". Free registration at voices.inaudio.com; non-exclusive distribution. [browser, 2026-08-12]
- **ACX introduced a new royalty model effective 2026-05-26:** 50% (exclusive) / 30% (non-exclusive); legacy 40%/25% continues until end of 2026 for non-enrolled titles. Monthly electronic bank payments from Audible (US), in USD/GBP/EUR/CAD; payments under $50 may be carried forward. [https://help.acx.com/s/article/how-royalties-work, 2026-08-12]
- **KDP 70% royalty band widened to $2.99–$12.99 effective 2026-07-07** (was $2.99–$9.99 since 2007); 35% option $0.99–$200 (size-tiered); KDP Select June 2026 author earnings $67.0M. [https://kdp.amazon.com/en_US/help/topic/G200634560, 2026-08-12]
- **KDP Arabic = ebooks only.** Official Arabic help topic: "We're still improving our support for eBooks written in Arabic… you may encounter errors when uploading"; RTL is mandatory (LTR files rejected); "Paperback publishing for the Arabic language isn't currently available." Arabic metadata required; Arabic-KDP-Resolvers@amazon.com is the support channel. [https://kdp.amazon.com/en_US/help/topic/GUQT4C8J6RR6V8TY, 2026-08-12]
- **Google Play Books: 70% revenue split** for partners who accepted the 2019 TOS, in 60+ countries **including Bahrain, Egypt, Jordan, Kuwait, Lebanon, Oman, Qatar, Saudi Arabia, UAE**; 52% default otherwise. Audiobooks can be uploaded (help article 14164701). [https://support.google.com/books/partner/answer/9331459, 2026-08-12]
- **Apple Books: 70% royalties on every ebook regardless of price**, no delivery fees, no price matching, no third-party ads; audiobooks incl. digital narration supported. Apple Books UAE storefront page live incl. Arabic site variant. [https://authors.apple.com/, https://www.apple.com/ae/apple-books/, 2026-08-12]
- **IngramSpark hard-block for Iraq/Syria:** "Publishers and self-published authors **must be located in one of the countries listed**" — print list includes UAE but **not Iraq and not Syria**; ebook list is narrower (Western + India etc., no MENA). A Syrian national residing in KRG therefore **cannot open an IngramSpark account** today. [https://help.ingramspark.com/hc/en-us/articles/16684961523085, 2026-08-12]
- **Kobo Writing Life accepts "virtually any language"** (Arabic content publishable) but the Kobo storefront/UI has **no Arabic** (16 interface languages, none Arabic); 70% max royalty, no exclusivity, free account, direct-to-bank payment, distribution in 190 countries. [https://www.kobo.com/p/writinglife, 2026-08-12]
- **Kurdish market:** no verifiable Kurdish-language **self-publishing** platform exists. The Kurdish reading apps found (REGA — 10K+ downloads, Finland-registered Kurdish dev; Wise Library — 100K+ downloads, Sulaymaniyah dev) are consumer libraries; Wise Library's own description says books are "collected from various internet sources" with takedown-on-request — i.e., an aggregation/piracy model with no author payments. [Google Play listings, 2026-08-12]

## What we don't know (ambiguities)

- **Rufoof royalty % and onboarding terms are not published** anywhere reachable (no terms/royalty page; "الناشرين المشاركين" list shows individual authors and a "نشر ذاتي" self-publishing entity, but no rates or signup form).
  - **Suggested clarifying question:** "Should we contact Rufoof (support@rufoof.com) directly for their royalty share and author-onboarding terms, or treat Rufoof as contact-only?"
- **Abjjad royalty share** is not public; the publisher portal (publisher.abjjad.com) is login-gated with "No account? Contact us" — onboarding is by approval, terms negotiated.
  - **Suggested clarifying question:** "Contact Abjjad (feedback@abjjad.com) for publisher terms, or accept 'by-negotiation' as the answer?"
- **Neelwafurat commission %** is "حسم يتفق عليه مسبقاً" (discount agreed in advance) — not public.
  - **Suggested clarifying question:** "Email widadd@nwf.com / manard@nwf.com for the current commission split?"
- **Storytel author path:** no self-service signup found (/publisher, /publishing, /for-publishers all 404). Whether Arabic self-published titles reach Storytel via aggregators (e.g., PublishDrive) is unverified here.
  - **Suggested clarifying question:** "Is the Storytel route via an aggregator acceptable, or must it be direct?"
- **Voices by INaudio royalty split** is not stated on the new site (legacy Findaway model was ~80/20; unverified for the new brand).
  - **Suggested clarifying question:** "Verify current Voices by INaudio royalty split + payout rails (bank/PayPal/Payoneer) at registration, or treat as 'legacy 80/20, unverified'?"

## Risks and doubts

- **Stripe/PayPal country gates dominate the Arabic platforms' eligibility question.** Kotobee, Rufoof-style direct selling, and any platform paying via processor require the author to hold a Stripe/PayPal account; neither supports Syria or Iraq as account countries (subject to Angle C verification). Even platforms that on-board Syrians (Kotobee's signup accepts "Syrian Arab Republic") become unpayable without a third-country payment rail.
  - **Severity:** high
  - **Mitigation:** Angle C must produce the definitive Stripe/PayPal/Payoneer/Wise country matrix; this report's per-platform payout notes assume that matrix.
- **Arab book platforms concentrate risk in a handful of markets** (Egypt/Jordan/Saudi/Lebanon); several (Jamalon, Tafaseel, Yaqoot-as-book-platform) are dead or unverifiable, and most do not publish royalty terms — revenue modeling will be guesswork.
  - **Severity:** high
  - **Mitigation:** Plan should treat Egyptian/Jordanian/Saudi platforms as "contact-and-negotiate" channels, not self-serve ones; keep royalty assumptions explicitly flagged.
- **iRead's website is compromised or spam-polluted:** ireadhub.com homepage carries dozens of casino/gambling SEO links (aviator, pinup, mostbet, 1xbet-style). The Play Store app itself is active (updated Aug 5, 2026), but the web property is a trust/security concern.
  - **Severity:** medium
  - **Mitigation:** Never log in or enter payment details via ireadhub.com links; use the official app; treat web content as untrusted.
- **Arabic POD is thin:** KDP has no Arabic paperback; IngramSpark blocks Iraq/Syria-based authors; Lulu Arabic support unverified. The only verified Arabic print route is Neelwafurat's POD service (for rights owners with a distributor in one of 7 Arab countries incl. Syria).
  - **Severity:** medium
  - **Mitigation:** If print matters, pursue Neelwafurat POD + traditional print-on-demand via a UAE/Jordan-based imprint (needs a local partner — flag for planning).
- **Audience numbers for MENA platforms are mostly self-reported marketing claims** (Abjjad "+6M active readers", Storytel "800K+ stories", Rufoof "30,000 titles", Hindawi "300K+ monthly readers") — none independently audited; Amazon.ae/Kindle MENA audience has no citable public figure.
  - **Severity:** medium
  - **Mitigation:** Treat all counts as order-of-magnitude; present with attribution and "unaudited" labels.

## Technical findings

### 1. Rufoof (Egypt-label, actually Jordanian; Saudi office) — LIVE
- Storefront live; Arabic categories incl. audiobooks (كتب صوتية); apps on App Store/Google Play. [https://rufoof.com/, https://rufoof.com/ar, 2026-08-12]
- Play Store: **1M+ downloads**, 4.8★, 30.9K reviews; "More than 30,000 titles" claim; developer = **ALYACOUTA AL HAMRAA FOR SOFTWARE CO, Amman, Jordan** (formerly branded "Yaqut"); updated 2026-08-11. [https://play.google.com/store/apps/details?id=co.yaqut.app, 2026-08-12]
- Company address on website footer: Riyadh, Saudi Arabia (3102 Imam Saud bin Abdulaziz Rd, Al-Masif, Riyadh 12465). [https://rufoof.com/ar/publisher/2/--, 2026-08-12]
- Self-publishing presence: "الناشرين المشاركين" (participating publishers) page lists 20 entities **including individuals** (e.g., author Yasmine Thabet, Mohammad Abbas, Dr. Yasser Al-Darwish) and a dedicated **"نشر ذاتي" (self-publishing)** entity with description "a new model of electronic publishing enabling Arab publishers to sell more content to more readers"; the "نشر ذاتي" profile currently lists no books (placeholder). [https://rufoof.com/ar/publishers, https://rufoof.com/ar/publisher/2/--, 2026-08-12]
- **Royalty %: not published — FLAG.** **Signup/terms page: not found — FLAG.** Individual authors are onboarded (evidence: author listings), method = contact (support@rufoof.com).
- Setup: none public; payout: unknown (likely Egyptian/Saudi bank or processor — FLAG).
- Arabic depth: native Arabic app, RTL, Arabic-specific search ("Advanced search specialized in Arabic – even within audiobooks"), audiobooks+ebooks+summaries. [Play Store listing, 2026-08-12]

### 2. Abjjad (Jordan) — LIVE
- Homepage: "أبجد - التطبيق العربي الأول للكتب الإلكترونية والصوتية"; claims "+6M قارئ عربي نشط" (6M+ active Arabic readers), "+35K كتاب إلكتروني وصوتي" (35K+ ebooks/audiobooks), "#1 reading app". [https://www.abjjad.com/, 2026-08-12]
- Subscription: Free tier (1,500 books), **$9/mo**, $32/6-mo, $54/yr (≈$5/mo). [same source]
- Publisher portal LIVE at publisher.abjjad.com: dashboard with revenue tracking, analytics, file management, author collaboration; **login-gated, "ليس لديك حساب؟ اتصل بنا" (no account? contact us)** — onboarding by contact/approval, no self-service signup. Claims: "+200 ناشر" (200+ publishers), "+30K كتاب", "+6M تحميل للتطبيق" (6M app downloads). [https://publisher.abjjad.com, 2026-08-12]
- **Royalty %: not public — FLAG.** Setup: publisher approval via feedback@abjjad.com; payout: by contract (FLAG).
- Arabic depth: full — RTL native, ebooks + professional audiobooks, categories in Arabic, drive mode, offline. [https://www.abjjad.com/, 2026-08-12]

### 3. Kitab Sawti / Storytel (Arabic ebooks + audiobooks) — BRAND DEAD, parent LIVE
- kitabsawti.com → **redirects to storytel.com/eg** (Egypt region). [browser, 2026-08-12]
- Storytel UAE live: "800 ألف + من أفضل القصص" (800K+ stories) hero claim; "أكثر من 200000 عنوان" (200K+ titles); $9.99/mo, $83.88/yr, $53.64/6-mo; Arabic content prominent (عمارة يعقوبيان, سرّ الأسرار, أرض زيكولا…). [https://www.storytel.com/ae/en/, 2026-08-12]
- **Author signup path: none public** — /publisher, /publishing, /for-publishers all 404; reader-only site. Storytel acquires content via publisher agreements (self-pub route = aggregators; **unverified** — FLAG).
- Royalty: not public (by contract) — FLAG. Payout: via publisher agreement (FLAG).
- Arabic depth: Arabic UI + Arabic catalog (audiobooks + ebooks), RTL. [https://www.storytel.com/ae/en/, 2026-08-12]

### 4. Hindawi — LIVE as CHARITY; self-publishing NOT possible
- "Hindawi Foundation — registered charity no. 1181788 in England and Wales, York House, 41 Sheet Street, Windsor SL4 1DD". Products: Booktime (children's books) + Safahat (free Arabic literature). Impact claims: 300K+ monthly readers, 10M books read since 2024, 190+ countries, 10 languages, 3.5K+ books published. Donation-funded. [https://www.hindawi.org/, 2026-08-12]
- **Answer to the task question: Hindawi is publisher/nonprofit-only; there is no self-publishing or author-revenue channel.** (Historically Hindawi acquired rights to free classics; not a sales channel.) [same source]
- Payout: n/a. Arabic depth: high (Safahat is Arabic-first), but revenue = 0.

### 5. Neelwafurat (nwf.com, Beirut) — LIVE; author/seller side exists
- Homepage live (AR/EN); stores for UAE/Egypt/Lebanon/Saudi; ebooks via **iKitab** app; audiobooks via **masmu3** app; buyer payment methods: Visa, MasterCard, Amex, mada, Western Union, Apple Pay, Google Pay. **Iraq free-shipping offer banner** on homepage; contact phone **+964 773 113 3765 (Iraqi number)**. [https://www.neelwafurat.com/, 2026-08-12]
- "انشر كتابك" (Publish your book) page — the author/seller program:
  - **Print:** you must hold full print rights AND have a center/distributor in one of: Lebanon, Egypt, Saudi Arabia, Jordan, **Syria**, UAE, Morocco, Kuwait; books listed on-request; commission ("حسم") **agreed in advance, charged only at sale**; contact manard@nwf.com. [https://www.neelwafurat.com/publishers.aspx, 2026-08-12]
  - **POD:** "خدمة الطباعة عند الطلب" — Neelwafurat will print small quantities of out-of-print or ebook titles for rights owners, by agreement. [same source]
  - **Ebook:** password-protected ePub; contract preserving author rights; listing free; commission agreed in advance, only at sale; sales dashboard via link + username/password; submit Word/InDesign + PDF; metadata includes title/author/publisher/USD price/400-word blurb/cover/**country of residence**; contact widadd@nwf.com. [same source]
- **Commission %: not public — FLAG** (must be negotiated). Payout: by agreement (likely bank transfer/Western Union — FLAG). Syrian distributors are explicitly named as acceptable (print route), and Syria is in the site's country list; Iraq is in the country list and gets shipping promos — **best non-self-serve Arabic option for a Syria/KRG user**.
- Arabic depth: native Arabic, full RTL, ebooks + audiobooks + print.

### 6. Jamalon (Jordan) — DEFUNCT
- DNS resolves (50.87.177.107, shared hosting) but: HTTPS cert invalid on `www.jamalon.com` and `jamalon.com` (ERR_CERT_COMMON_NAME_INVALID); HTTP serves "Error. Page cannot be displayed." [nslookup + browser, 2026-08-12]
- **Verdict: defunct/parked as of 2026-08-12.** (Last notable life: Jordanian ebook retailer, paused operations ~2020; not re-verified here — FLAG on exact shutdown date.)

### 7. iRead / Tafaseel — iRead LIVE (Egypt), Tafaseel DEAD
- **iRead eBooks** (com.victorylink.iRead): "first Egyptian e-reading app", developer IREAD FOR ART PRODUCTION, 27 D Magdy Salama St, Maadi, Cairo; **100K+ downloads**; subscription (monthly/6-mo/annual) + "iRead Originals" exclusive content; updated 2026-08-05. [https://play.google.com/store/apps/details?id=com.victorylink.iRead, 2026-08-12]
- iRead Hub (ireadhub.com) live: "أكبر مجتمع عربي للقراء والكتاب" (largest Arabic readers+writers community); writer awards, podcasts, book news. **Red flag: homepage polluted with casino/gambling SEO spam links** (aviator, pin-up, mostbet, 1xbet…) — site compromise signal. [https://ireadhub.com/, 2026-08-12]
- **Author/self-pub side: none public — FLAG** (writer community ≠ royalty program; no royalty page found). Payout: n/a — FLAG.
- **Tafaseel: tafaseel.com is parked for sale on GoDaddy** (redirect to forsale.godaddy.com) — defunct. [browser, 2026-08-12]

### 8. Yaqoot (Saudi Arabic subscription) — UNVERIFIABLE / NOT A BOOK PLATFORM
- `yaqoot.sa`: HTTPS aborted, HTTP timed out (2026-08-12). [browser]
- Google Play "Yaqoot | ياقوت" (com.sa.maana, 5M+ downloads) = **Zain KSA telecom app** (SIM/call packages), not books. [https://play.google.com/store/apps/details?id=com.sa.maana, 2026-08-12]
- "ياقوت" (com.yaquot.store) by Narjes Computer Systems (UAE-registered, Palestinian/Iraqi contact) = general e-commerce shopping app, 100+ downloads. [https://play.google.com/store/apps/details?id=com.yaquot.store, 2026-08-12]
- Likely confusion source: **Rufoof's Play developer account is "Yaqut"** and Rufoof was formerly branded "Yaqut" (developer: ALYACOUTA AL HAMRAA — "the red yaqut"). [Play listing co.yaqut.app, 2026-08-12]
- **Verdict: no active Saudi "Yaqoot" book-subscription platform verifiable on 2026-08-12 — FLAG as unverifiable/defunct.**

### 9. Amazon.ae / Amazon.sa — KDP Arabic (ebook-only) — LIVE
- KDP Arabic topic (see What we know): Arabic ebooks supported with caveats; **no Arabic paperback**; RTL mandatory; Arabic metadata; KDP Select up to 70%; local-currency wire to banks in KSA/Oman/Bahrain/Kuwait/Morocco. [https://kdp.amazon.com/en_US/help/topic/GUQT4C8J6RR6V8TY, 2026-08-12]
- Royalty: 70% on $2.99–$12.99 (Amazon.com band, eff. 2026-07-07; equivalent bands per marketplace); 35% option $0.99–$200; delivery fees apply to 70% option. [https://kdp.amazon.com/en_US/help/topic/G200634560, 2026-08-12]
- Setup: free KDP account; bank account + tax info required for payout (details = Angle A/C lane). Audience: **no citable Amazon MENA ebook-audience figure — FLAG** (Amazon.ae blocked automated fetch; storefront existence not disputed).
- Arabic depth: Arabic ebooks render RTL on Kindle; Arabic metadata supported; storefronts amazon.ae/amazon.sa carry Arabic Kindle titles. [KDP Arabic topic, 2026-08-12]

### 10. Google Play Books / Apple Books — Arabic available on both
- **Google Play Books:** 70% split (2019 TOS) in 60+ countries incl. Egypt, Bahrain, Jordan, Kuwait, Lebanon, Oman, Qatar, KSA, UAE; 52% otherwise; audiobooks supported. [https://support.google.com/books/partner/answer/9331459, 2026-08-12]
- **Apple Books:** 70% flat, no delivery fees, free books allowed, no price matching, no ads; audiobooks incl. digital narration; publishing via iTunes Connect; UAE storefront page live (Arabic page variant exists). [https://authors.apple.com/, https://www.apple.com/ae/apple-books/, 2026-08-12]
- Arabic depth: both sell Arabic-language books in MENA stores; RTL rendering supported in both apps (not re-verified per-book — FLAG on fine-grained Arabic typesetting quality).

### 11. Kobo — no Arabic storefront; Arabic content technically publishable
- Storefront UI languages: Bokmål, Danish, English, Spanish, French, Italian, Dutch, Polish, Portuguese, Romanian, Finnish, Swedish, Turkish, Czech, Chinese, Japanese — **no Arabic**. [https://www.kobo.com/, 2026-08-12]
- Kobo Writing Life: free; "publish… in virtually any language"; up to 70% royalties; no exclusivity; direct-to-bank payment; distribution via partnerships in 190+ countries. [https://www.kobo.com/p/writinglife, 2026-08-12]
- Arabic depth: **low** — no Arabic UI/storefront; Arabic titles would be discoverable mainly through library partners (OverDrive) — FLAG on actual Arabic catalog size.

### 12. ACX (Arabic audiobooks) + Spotify audiobooks (Findaway Voices)
- **ACX:** royalty model change 2026-05-26 → 50%/30% (excl./non-excl.); legacy 40%/25% through end of 2026; monthly payout from Audible (US) to bank, USD/GBP/EUR/CAD; $50 carry-forward threshold; distribution Audible+Amazon+Apple. [https://help.acx.com/s/article/how-royalties-work, 2026-08-12]
- **ACX Arabic: no support found.** ACX help has zero Arabic-language articles and no language-support article at all; Arabic narration is not offered by ACX production tools (English + localized EU markets only, per absence of any Arabic references). **FLAG as unsupported** (negative evidence: searches for "arabic"/"what languages" return no language articles). [https://help.acx.com/s/global-search/arabic and /s/global-search/what%20languages, 2026-08-12]
- **Spotify audiobooks / Findaway Voices:** findawayvoices.com → **voicesbyinaudio.com**; "Voices by INaudio": non-exclusive global distribution, free registration, "fast, reliable payments"; **current royalty split not published on site — FLAG** (legacy Findaway was ~80/20 author share; unverified for new brand). Payout rails not listed publicly — FLAG. Spotify availability via this network: implied by legacy branding ("Findaway Voices by Spotify") — FLAG on explicit current channel list. [https://www.findawayvoices.com/, https://www.voicesbyinaudio.com/, /features, 2026-08-12]

### 13. Print-on-demand for Arabic books
- **KDP POD Arabic: NOT available** (explicit). [KDP Arabic topic, 2026-08-12]
- **IngramSpark: Arabic RTL handling documented** (title setup + metadata report reference "books written in Arabic that should be read from right to left"; UAE in print-distribution partner markets) **BUT author-country list excludes Iraq and Syria → blocked for this user.** [https://help.ingramspark.com/hc/en-us/search?query=arabic; articles/16684961523085, 2026-08-12]
- **Lulu:** live; POD + ebooks; retail distribution 40,000+ retailers; fulfillment 200+ countries; UI languages EN/DE/FR/IT/ES — **no Arabic UI; Arabic book publishing not verified on official pages — FLAG** (Lulu KB search for "arabic" returned no results page content). [https://www.lulu.com/, https://help.lulu.com/en/support/search?q=arabic, 2026-08-12]
- **Neelwafurat POD:** verified Arabic POD route for rights owners (see §5) — the only confirmed Arabic-language print-on-demand channel in this scan. [https://www.neelwafurat.com/publishers.aspx, 2026-08-12]

### 14. Kurdish market — NO self-publishing platform verifiable
- Play Store search "Kurdish ebooks books app" surfaces only consumer apps:
  - **REGA | Kurdish Digital Library** (Germiani Studio, developer registered in Kuopio, Finland): 10K+ downloads, 5.0★, Kurdish audiobooks+ebooks+podcasts+courses; subscription "live" (Aug 2026 update); **no author/publisher portal on the listing — FLAG**. [https://play.google.com/store/apps/details?id=com.rega.android, 2026-08-12]
  - **Wise Library کتێبخانەی زیرەک** (WiseDevs / Marwan Qadir Ghafoor, Sulaymaniyah, Iraq): 100K+ downloads, 4.9★, 1,000+ Kurdish books; **description admits books are "collected from various internet sources"** and authors/translators may request takedown — aggregation/piracy model, **no author payments**. [https://play.google.com/store/apps/details?id=com.wisedevs.wise_library, 2026-08-12]
  - Others: Kurdish learning apps, TTS, dictionaries, curriculum apps (مناهج كردستان), "4k Kurdistan" chat — none are selling/royalty platforms. [same search]
- **Conclusion: no Kurdish-language self-publishing/royalty platform found on 2026-08-12; Kurdish content would go through global stores (KDP ebook — Kurdish not a listed KDP language — FLAG; Google Play Books; Apple Books) or print via regional houses.** Stated explicitly per scope item 14.

### 15. Other MENA entry points discovered
- **Kutubee** (Jabal Amman Publishers, Jordan) — kids' ebook app; publisher-owned storefront, not open self-pub — FLAG author side. [Play Store search result, 2026-08-12]
- **عصير الكتب** (Egypt), **راوي — كتب صوتية** (نُقاية, Saudi), **Jarir Reader** (Saudi), **Iqraaly** — consumer apps; no self-publishing surfaces. [Play Store search, 2026-08-12]
- **مكتبة النور / مكتبة الكون / zLibrary-style readers** — piracy aggregators; **not revenue channels; do not recommend.** [Play Store search, 2026-08-12]
- **Aggregators (PublishDrive, StreetLib, etc.)** as the realistic bridge into Storytel/Abjjad/Rufoof catalogs: **not verified this session — FLAG for Angle A/planning.** (Angle A covers D2D/Smashwords/PublishDrive for the EN lane; MENA-channel reach needs its own check.)

---

## Comparison table

| Platform | Setup | Publish | Audience (citable or FLAG) | Royalty | Payout | Iraq/Syria eligibility | Arabic depth |
|---|---|---|---|---|---|---|---|
| **Rufoof** (Jordan/Saudi) | None public; authors onboarded as "publishers" (contact) — FLAG | Ebooks + audiobooks; self-pub entity exists; no public terms — FLAG | 1M+ app downloads; 30K+ titles (Play listing) | Not public — FLAG | Not public — FLAG | Unverified (Jordanian company; no country block found) — FLAG | High (native Arabic, RTL, Arabic search) |
| **Abjjad** (Jordan) | Publisher approval via contact (feedback@abjjad.com) | Ebooks + audiobooks; dashboard; approval-gated | 6M+ readers claim; 200+ publishers; 35K titles | Not public — FLAG | By contract — FLAG | Unverified — FLAG | High |
| **Kitab Sawti → Storytel** | No self-serve; publisher/aggregator only — FLAG | Via agreements | 800K+ stories claim (UAE hero); Arabic catalog confirmed | Not public — FLAG | By contract — FLAG | Unverified — FLAG | High (Arabic UI + catalog) |
| **Hindawi** | Charity; n/a | **No self-publishing** | 300K+ monthly readers (charity claim) | None (free) | n/a | n/a (not a sales channel) | High (Arabic-first, free) |
| **Neelwafurat** (Lebanon) | Email submission (print: distributor in 1 of 7 countries incl. **Syria**; ebook: contract) | Print + **POD** + password-protected ePub; metadata incl. country of residence | Long-running Arabic retailer (no public user counts — FLAG) | Commission "agreed in advance" — FLAG | By agreement — FLAG | **Best-fit:** Syria explicitly listed for print distributors; Iraq gets shipping promos + Iraqi phone | High (print+ebook+audio) |
| **Jamalon** | — | — | — | — | — | **Defunct (2026-08-12)** | — |
| **iRead** (Egypt) | Reader community; no public author program — FLAG | n/a public — FLAG | 100K+ downloads | Not public — FLAG | Not public — FLAG | Unverified — FLAG (site spam-compromised) | High (Egyptian Arabic content) |
| **Tafaseel** | — | — | — | — | — | **Defunct (domain parked for sale)** | — |
| **Yaqoot** | — | — | — | — | — | **Unverifiable as book platform (2026-08-12)** | — |
| **KDP Arabic (Amazon.ae/.sa)** | Free KDP account; bank + tax info | **Ebook only** (RTL mandatory; no Arabic paperback); Arabic metadata | No citable MENA figure — FLAG | 70% ($2.99–12.99) / 35%; KDP Select up to 70% | Local-currency wire to KSA/Oman/Bahrain/Kuwait/Morocco banks; other rails per Angle C | KDP payout-country list = Angle C lane; Arabic topic implies Gulf wire support | High (RTL ebooks) / no print |
| **Google Play Books** | Partner Center account; payment profile | EPUB/PDF + audiobooks; TOS acceptance | No citable MENA figure — FLAG | **70%** in 60+ countries incl. EG/JO/KW/LB/OM/QA/SA/AE; 52% default | Bank (Google payments) — Angle C | Payout country = Angle C lane | High (Arabic titles in MENA stores) |
| **Apple Books** | iTunes Connect account | EPUB + audiobooks (incl. digital narration) | No citable MENA figure — FLAG | **70% flat**, no delivery fees | Bank (Apple) — Angle C | Payout country = Angle C lane | High (Arabic titles; UAE storefront live) |
| **Kobo / KWL** | Free KWL account | Any language incl. Arabic; no exclusivity | No citable MENA figure — FLAG | Up to 70% | Direct to bank — Angle C | Payout country = Angle C lane | **Low** (no Arabic UI/storefront) |
| **ACX (Audible)** | ACX account + tax/bank info | Audio; **no Arabic support found — FLAG** | Audible global (no Arabic catalog evidence) | New model 50%/30% (2026-05-26); legacy 40%/25% to year-end | Monthly bank, USD/GBP/EUR/CAD; $50 min | Payout country = Angle C lane | **None** (Arabic unsupported) |
| **Voices by INaudio (ex-Findaway)** | Free registration (voices.inaudio.com) | Non-exclusive audio distribution | No citable figure — FLAG | Not public on new site — FLAG (legacy ~80/20) | Not public — FLAG | Payout country = Angle C lane | Unverified for Arabic audio — FLAG |
| **Lulu** | Free Lulu account | POD + ebook; Arabic UI absent; Arabic books unverified — FLAG | No citable figure — FLAG | Commission on sales (not re-verified — FLAG) | PayPal/bank — Angle C | No country block found for account creation — FLAG | Low (no Arabic UI) |
| **IngramSpark** | Free account; **author must reside in listed country** | Print + ebook; Arabic RTL documented | No citable figure — FLAG | % of list minus print costs (not re-verified — FLAG) | Bank — Angle C | **BLOCKED: Iraq & Syria not in eligible-country list** | Medium (RTL metadata documented; no Arabic UI) |
| **Kurdish apps (REGA, Wise Library)** | Consumer apps; no author programs | n/a | REGA 10K+ dl; Wise 100K+ dl | None (no royalty) | None | n/a | Kurdish Sorani content (consumer) |

---

## FLAGS section (unverifiable / defunct / JS-gated / negative evidence)

1. **Jamalon — DEFUNCT confirmed** (invalid TLS apex+www; HTTP error page; shared-host IP). Exact shutdown date not re-verified (FLAG).
2. **Yaqoot (Saudi book subscription) — UNVERIFIABLE**: yaqoot.sa unreachable; Play "Yaqoot" = Zain telecom; Narjes ياقوت = shopping app. Likely confusion with Rufoof's former brand "Yaqut".
3. **Tafaseel — DEFUNCT** (domain parked for sale at GoDaddy).
4. **Kitab Sawti — DEFUNCT as brand** (redirect to storytel.com/eg).
5. **Rufoof royalty/onboarding terms — not published** (JS-rendered storefront; no terms page reachable).
6. **Abjjad royalty — not public** (login-gated portal; contact-only onboarding).
7. **Neelwafurat commission % — not public** ("agreed in advance").
8. **Storytel author path — no self-service portal exists** (3 URLs 404); aggregator route unverified.
9. **ACX Arabic — negative evidence**: no Arabic support articles; no language list published; treat as unsupported.
10. **Voices by INaudio royalty/payout — not published on new brand site** (legacy Findaway ~80/20 unverified).
11. **Lulu Arabic-language book publishing — unverified** (KB search empty; no Arabic UI).
12. **Amazon.ae/.sa audience — no citable figures** (automated fetch blocked; KDP doesn't publish MENA ebook sales).
13. **Kurdish self-publishing — none found**; only consumer libraries (one self-described aggregation/piracy model).
14. **iRead web property — spam-compromised** (casino SEO links on ireadhub.com homepage); app itself active.
15. **KDP Arabic uploads — "you may encounter errors"** per Amazon's own help text (quality gate caveat).
16. **Kotobee payout eligibility for Syrians** — Kotobee accepts "Syrian Arab Republic" at signup, but payout requires the author's own Stripe/PayPal (Angle C decides).

---

## Existing solutions (landscape scan)

Scan skipped per SKILL.md skip conditions: this task is pure market research with no code implication; the "landscape" IS the deliverable (platforms enumerated and verified above).

## Build vs. reuse decisions — please confirm

None — greenfield is the only path for all components (no software build involved; decision surface is which platforms to onboard, handled in planning).

---

## Feasibility verdict

- **Can do:** partial
- **Confidence:** MEDIUM
- **Why:** Direct, URL-verified facts exist for every platform's existence/status (HIGH-confidence layer), but the two decisive variables are unresolved here by design: (1) exact royalty/commission terms for the best-fit Arabic channels (Rufoof, Abjjad, Neelwafurat, Storytel) are not public and require contact/negotiation; (2) payout-country eligibility for a Syrian national in KRG (Stripe/PayPal/bank rails) is Angle C's lane, and it gates every platform in this report. The user CAN sell Arabic books today via KDP (ebook), Google Play Books, Apple Books, and Neelwafurat (print+ebook via agreement); cannot use IngramSpark; has no Arabic POD on Amazon; and has no Kurdish self-publishing channel.

## Recommendations for the planning agent

1. Build the dossier around three revenue tiers: (T1) global stores with self-serve Arabic support — KDP ebook, Google Play Books, Apple Books, Kobo; (T2) negotiated Arabic channels — Rufoof, Abjjad, Neelwafurat, Storytel-via-aggregator; (T3) audiobook channels — ACX only for EN content (Arabic unsupported), Voices by INaudio for multi-language audio (verify Arabic + payout).
2. Treat every "not public" royalty as a required outreach task: include a contact-email appendix (support@rufoof.com, feedback@abjjad.com, widadd@nwf.com + manard@nwf.com, Arabic-KDP-Resolvers@amazon.com).
3. Flag IngramSpark as NOT viable for a KRG-based author (hard country gate); Lulu as "verify Arabic support by uploading a sample".
4. Kurdish-language publishing: document as "no platform; use global stores for Sorani/Kurmanji EPUB" and note Kurdish is not a listed KDP language (FLAG).
5. Coordinate with Angle C before any payout statement: per-platform payout rows depend on the Stripe/PayPal/Payoneer/Wise/wire country matrix.

## Open questions for the user

1. "Which Arabic channels are worth the negotiation overhead for you: Abjjad/Rufoof (Jordan, large reach) vs Neelwafurat (Lebanon, print+POD+ebook, Syria-friendly) — or all three?"
2. "For audiobooks, is English-language audio via ACX acceptable, given Arabic audio production is unsupported there? (Voices by INaudio may cover Arabic — to verify at signup.)"
3. "If Arabic print is essential, are you willing to use Neelwafurat's POD and/or partner with a Jordanian/UAE imprint, given KDP has no Arabic paperback and IngramSpark is country-blocked?"
4. "Do you have (or can you open) a bank account or e-wallet in a third country (e.g., Turkey, UAE, Jordan, EU) to receive payouts? Angle C needs this to finalize eligibility."

---

## Self-critique

- **Did I do my job?** partial. Every platform in scope was checked against a live URL or authoritative listing on 2026-08-12, and defunct/rebranded entities were resolved with hard evidence (DNS, TLS, redirects). What I could not do: verify non-public royalty rates (they do not exist publicly), render Amazon.ae (bot-blocked), or verify Lulu Arabic typesetting (KB search empty).
- **What might I have missed?** (a) Aggregator reach into Storytel/Abjjad/Rufoof (PublishDrive/StreetLib) — left to Angle A/planning with a FLAG; (b) Apple Books Arabic catalog depth in MENA storefronts (storefront page verified, per-title Arabic rendering not); (c) Gulf-region-specific POD shops and Gulf ebook stores (e.g., 7iber/other niche stores) — not enumerated; (d) Arabic audiobook production houses that could feed Abjjad/Storytel catalogs (e.g., روايات صوتية studios) — a legitimate revenue path for an author to sell narration rights, out of scope here; (e) exact IRead program terms (contact-only).
- **What did I assume without evidence?** (a) That "Yaqoot" in the task prompt refers to a single Saudi book subscription — my searches found none, and the name collides with Zain telecom + Rufoof's old brand; (b) that Storytel's Arabic catalog implies self-publishing availability — it does not; (c) that legacy Findaway ~80/20 royalty still applies to Voices by INaudio — unverified; (d) that Neelwafurat will negotiate with an individual author without a distributor for ebooks — the page permits author/dar submission, but negotiation outcome is unknown.

## Metrics

- findings: 43
- risks_HIGH: 2
- risks_MEDIUM: 3
- risks_LOW: 0
- clarifying_Qs: 4
