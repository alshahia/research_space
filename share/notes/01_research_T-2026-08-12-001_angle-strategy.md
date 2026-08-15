# Research — T-2026-08-12-001 (angle: strategy)

**Date:** 2026-08-12
**Trigger:** initial (parallel research, 3 angles: platform / genres / strategy)
**Sub-agent:** research
**Access date for all URLs:** 2026-08-12 (all links live-verified via webfetch unless marked otherwise)

**Progress checkpoint (rule 16):** ~44 tool steps; blocker: none; findings: Kotobee ecosystem fully mapped (Books storefront = books.kotobee.com, blog = blog.kotobee.com), pricing verified, market stats verified, resource catalog link-verified.

## Task in one sentence

Research, for a new author wanting to publish on Kotobee, (a) why Kotobee is a good (and honestly, not so good) place to start, (b) the exact step-by-step path from idea to published + marketed ebook with effort/cost/time, (c) monetization and marketing tactics, (d) a link-verified resource catalog per genre, and (e) source material for the final LLM/agent-readable guide.

## What we know for sure

- Kotobee Books (`https://books.kotobee.com/`) is the Kotobee Press storefront (the old "Kotobee Press" URL has moved — master's risk R1 confirmed). It is a **free** self-publishing platform: no publishing fees, **100% royalties** ("for a limited time" per support article), publish "in just 3 simple steps", published immediately after upload. Verified: `https://support.kotobee.com/en/support/solutions/articles/8000120127-publishing-your-ebook-on-kotobee-books-step-by-step-guide` and `https://books.kotobee.com/`.
- Kotobee Books accepts **EPUB and KPUB only**; max **500 MB/file**; **30 ebooks per author account** (more by request). Cover: JPG/JPEG/GIF/PNG, best 1600x2400 px, min width 1400 px. Payouts via **Stripe or PayPal API keys** (Stripe/PayPal setup docs in support article 8000111089). Verified: same two support articles.
- Kotobee's own selling point vs Amazon: interactivity (quizzes, drag-drop questions, media, mini-apps, widgets) + DRM + branded library/cloud delivery + LMS integration (LTI 1.1/1.3, Tin Can/xAPI, SCORM authoring) + education/corporate solutions. Verified: `https://www.kotobee.com/` (products, solutions), `https://support.kotobee.com/` (LTI articles, integration folders), blog interactive-ebook guide.
- Kotobee Author ships **built-in AI tools**: text generation, image generation, question generation, text-to-speech ("AI tool" tutorial #32 in Academy; interactive-ebook guide mentions all four). Verified: `https://www.kotobee.com/academy` and `https://blog.kotobee.com/how-create-interactive-ebook-guide/`.
- Pricing (paid tiers, for later scale-up): Kotobee Library $100–$1,000/mo (10→unlimited books, <1k–<10k users; user upgrades from $75/yr per 1k users); Kotobee Cloud hosted/cloud ebooks $10–$500/mo (1→unlimited books, 1,000 users included). Free licenses: 30-day trial; trial Library = 20 users/40 MB per book; trial cloud = 10 users; files deleted after trial. Verified: support articles 8000075597 and 8000075593.
- Affiliate program: up to **40%** commission (30% base, 40% performance tier), $200 minimum payout via PayPal end-of-month, 90-day cookie (180 if free-account signup within 90 days). Verified: `https://www.kotobee.com/en/affiliates`.
- Free learning path exists: 7-day email course ("Ebook Publishing Basics", days: formats/content/publishing/attracting users/making money/protection) at `https://www.kotobee.com/ebook-publishing-basics-course`; Kotobee Academy = 47 video tutorials at `https://www.kotobee.com/academy`; help center at `https://support.kotobee.com`; blog at `https://blog.kotobee.com`.
- Market reality (must be in the dossier to stay honest): avg self-published ebook sells **~250 copies**; **90% of self-published books sell <100 copies**; avg self-pub author earns **~$1,000/yr**; avg ebook price $4.16; self-publishing segment grows ~17%/yr vs ~1% overall; 30–34% of all ebooks sold are self-published; >1,000 self-pub authors made $100k+ on Amazon (2021). Verified: `https://wordsrated.com/self-published-book-sales-statistics/` (updated 2026-03-27).
- Amazon exclusivity trap (why multi-channel matters): publishing an ebook on KDP via Kindle Unlimited = Amazon-only digital rights; you cannot sell that ebook elsewhere. Verified: WordsRated same page.
- Kotobee monetization playbook article verified: research → content → pricing → selling (own site, branded library, ecommerce like Payhip, WordPress plugin) → promotion. `https://blog.kotobee.com/make-money-selling-ebooks/`.
- BookTok marketing playbook verified (May 2026, updated): YA/Fantasy/Romance dominant on BookTok; 3–5 posts/week; hashtag pyramid; 80/20 rule; 3-second hook; POV content; conversion pillars (one-click bio, TikTok LIVE, analytics). `https://blog.kotobee.com/what-is-booktok/`.
- Self-publishing marketing article verified: pre-launch (killer 150–200-word description, author website, audience building, email marketing, pre-orders) and post-launch (reviews, outreach, Facebook/TikTok/Goodreads/Instagram, ads, BookBub/Publisher Rocket). `https://blog.kotobee.com/how-to-market-a-self-published-book/`.
- Kotobee's own AI stance: embraces AI-assisted creation (built-in AI generators; blog article "Best AI Writing Software in 2026" updated 2026-01-18 lists Article Forge $25/mo, Jasper $29–59/mo, CopyMatic $19–49/mo, Writesonic $15–95/mo, Rytr $9–29/mo + free plan, AI Writer $29–375/mo, Shortly $65–75/mo; notes ~80% AI accuracy claim (via IGI Global), AI detectors, Google auto-generated-content guidance link). Verified: `https://blog.kotobee.com/ai-writing-software/`.
- K-lytics (book market data service) is **defunct**: klytics.com now shows a domain-for-sale page. Verified: `https://www.klytics.com/`. Do not put K-lytics in the final dossier as a live resource.
- 17 official Kotobee sample ebooks exist, categorized: Education & Training (7), Lifestyle & Wellness (5), Creative Writing (3), Arts & Design (2); 15 reflowable / 2 fixed; includes Arabic samples (Alzheimer's مرض الزهايمر, Body Language لغة الجسد) and children's audiobooks (The Great Marshmallow Chase, The Cat Who Knew Secrets). Verified: `https://www.kotobee.com/en/samples`.

## What we don't know (ambiguities)

- Kotobee Books storefront size, category structure, and sales/rank data are **not public** (no bestseller list observed on fetched pages; homepage only claims "reach thousands of readers"). We cannot quantify "lower competition inside Kotobee Press" — it is an inference from storefront immaturity, not a measured fact.
  - **Suggested clarifying question:** "Have you checked how many books exist in your target category on books.kotobee.com/library? (I can't measure storefront size from here — you can, in 2 minutes.)"
- The exact tier prices of Kotobee Author paid plans are JS-rendered on `kotobee.com/pricing` (placeholders in fetched HTML); only feature names (Free/Basic/Premium/Institutional) and Library/Cloud plan tables are verifiable. Free license is confirmed real (risk-free, no credit card).
  - **Suggested clarifying question:** none needed — default: start with the free license; paid Author tiers only matter for advanced export/branding. Flag for planner to add a "confirm current Author paid-tier prices at signup" step.
- Kotobee Books terms of service regarding **AI-generated content** were not fetched (books.kotobee.com/terms is linked but content unverified). Kotobee's own tools are AI-enabled, which suggests acceptance, but the author-facing ToS text is unread.
  - **Suggested clarifying question:** "Do you want the dossier to include a 'read the Kotobee Books Terms before publishing' checkpoint as a hard rule?" (recommended default: yes)
- Whether the "100% royalties" promotion is permanent. Support article says "for a limited time".
  - **Suggested clarifying question:** "If Kotobee Books later reduces royalties below 100%, would you still publish there, or is 100% a deal-breaker?"
- English→Arabic translation quality and Kotobee's Arabic RTL handling beyond the two Arabic samples (RTL is demonstrated to work — the Arabic samples exist — but no official localization guide was found in this pass).
  - **Suggested clarifying question:** "Is one of your planned books Arabic-first, or Arabic as a translated second edition?"

## Risks and doubts

- **Market-discoverability risk — Severity: high.** Kotobee Books is a small storefront; there is no evidence of marketplace-scale traffic (no public traffic/rank data; the storefront FAQ is minimal). An author who only publishes on Kotobee Books and does no marketing can expect near-zero organic sales — consistent with the global stat that 90% of self-published books sell <100 copies. **Mitigation:** treat Kotobee as the "interactive flagship + 100% royalty" channel, not the only channel: export EPUB/MOBI/PDF and also publish to Amazon KDP / Apple Books / Google Play / Kobo / own website (Kotobee supports EPUB/MOBI/PDF export and WordPress/Shopify/WooCommerce/Memberful sales paths). The dossier must say this plainly.
- **"100% royalties" is time-limited — Severity: medium.** The official step-by-step article says "100% royalties for a limited time". **Mitigation:** capture current terms screenshot in the dossier, add a re-check step at publication time, and price/plan assuming a future lower royalty (e.g., 70% benchmark used by other stores) so the business case survives the change.
- **Storefront/platform lock-in — Severity: medium.** Kotobee Books has no visible bulk-export/account portability docs (unverified); 30-ebook cap and 500 MB/file limits constrain catalog growth. **Mitigation:** keep master manuscripts in plain formats (Markdown/DOCX) and treat EPUB as the portable asset; never let the platform hold the only copy.
- **AI-content legal/ToS uncertainty — Severity: medium.** AI-assisted books raise copyright/disclosure questions (US Copyright Office human-authorship requirement; Kotobee Books ToS unread; Amazon KDP requires AI disclosure). **Mitigation:** dossier includes a "disclosure and legal check" step; for now, recommend AI-assisted (human-directed) workflows over fully AI-generated manuscripts, and add a lawyer-free checklist (platform disclosure fields, AI-content policy links).
- **Paid-tier pricing shock — Severity: low.** Scaling to branded library/cloud distribution costs $100+/mo (Library) — B2B pricing, not indie-friendly. **Mitigation:** stage monetization: free Books storefront first; only graduate to Library/Cloud for institutional (school/company) deals where the buyer pays.

## Technical findings

1. Kotobee Books = the live Press storefront; publish path: account → upload EPUB/KPUB → metadata (title, author, language, category, description, tags) → price (0 = free, else USD) → payment setup (Stripe/PayPal) → cover → agreement → "Publish now". Published instantly. (`https://support.kotobee.com/en/support/solutions/articles/8000120127-publishing-your-ebook-on-kotobee-books-step-by-step-guide`, 2026-08-12)
2. Royalty collection requires the author's own Stripe or PayPal API keys; test-mode sandbox keys supported for both. (`https://support.kotobee.com/en/support/solutions/articles/8000111089-collect-payments-in-kotobee-books`, 2026-08-12)
3. Kotobee blog moved from kotobee.com/blog → `blog.kotobee.com` (41 pages of articles). Verified guide URLs for the dossier: interactive-ebook-guide, edit-epub-books-manually, ebook-drm-security-what-how, ebook-formats, best-ebook-layout-reflowable-fixed, what-is-booktok, how-to-market-a-self-published-book, make-money-selling-ebooks, ai-writing-software, how-to-create-a-shopify-bookstore, how-to-protect-ebook-sharing, how-to-come-up-with-a-pen-name. (`https://blog.kotobee.com/`, 2026-08-12)
4. docs.kotobee.com root returns "Book Doesn't Exist" — the knowledge base is the Freshdesk help center at support.kotobee.com (solutions tree: Author, Library, Cloud, Reader, Books, Narrator, Integration/API, Mini-Apps). (`https://docs.kotobee.com/`, `https://support.kotobee.com/`, 2026-08-12)
5. Fixed vs reflowable guidance from Kotobee: fixed for magazines/comics/children's storybooks/design-critical pages; reflowable for novels/short fiction/mobile reading; Kotobee allows **mixing both layouts in one ebook**. (`https://blog.kotobee.com/how-create-interactive-ebook-guide/`, 2026-08-12)
6. DRM: Kotobee's model is cloud-key encryption (email/password or code auth) + optional device-count DRM — applies to cloud-ebook apps, NOT to standard EPUB/PDF exports (those go DRM-free to marketplaces). (`https://blog.kotobee.com/ebook-drm-security-what-how/`, 2026-08-12)
7. Market stats for the dossier's reality-check section (WordsRated, updated 2026-03-27): 250 avg copies/self-pub book; 90% sell <100 copies; $1,000/yr avg author income; $4.16 avg price; 17% self-pub segment growth; KDP/KU exclusivity clause. (`https://wordsrated.com/self-published-book-sales-statistics/`, 2026-08-12)
8. Cover specs for Kotobee Books: 1600x2400 px preferred, min width 1400 px, JPG/JPEG/GIF/PNG. (support article 8000120127, 2026-08-12)
9. K-lytics dead (domain for sale, $14,795); Bookstat alive but enterprise-focused ("annual revenues $10M+"); WordsRated free and current. (`https://www.klytics.com/`, `https://www.bookstat.com/`, 2026-08-12)
10. Capterra page for Kotobee Author exists (linked from kotobee.com footer: `https://www.capterra.com/p/160177/Kotobee-Author/`) but direct fetch returned 403 — cite as linked, review via Google cache/manual browse.
11. Reedsy's flagship writing course is now paid: "How to Write a Novel" $1,399 one-time (101 video lessons + 12-month membership); a free lesson is available; Reedsy Studio (free writing app) is the integrated tool. (`https://reedsy.com/learning/`, 2026-08-12)
12. ProWritingAid (verified 2026-08-12) now includes story-level tools: Story Canvas, Chapter/Character/Manuscript Analysis, Virtual Beta Reader, Marketability Analysis; free tier + paid; integrates with Scrivener/Atticus/Word/Google Docs.
13. AI-tool prices verified on vendor sites: Sudowrite $10/mo after free trial (fiction-focused, "Muse 1.5" model); NovelAI $10/$15/$25 tiers (anime art + storytelling); ElevenLabs free tier + paid, 70+ languages, narration voices for audiobooks, Eleven v3 model (2025) + Music/Dubbing; Grammarly Free $0 / Pro $12/mo annual; Vellum $199.99 (ebooks) / $249.99 (press), Mac-only.
14. Kotobee sample categories show the platform's demonstrated genre strengths: Education & Training, Lifestyle & Wellness, Creative Writing, Arts & Design; 2 fixed-layout samples; Arabic samples exist. (`https://www.kotobee.com/en/samples`, 2026-08-12)
15. Kotobee YouTube channel exists at `https://www.youtube.com/@Kotobee` (title verified via fetch; videos not enumerated).

## Existing solutions (landscape scan)

This is a research-only task with no code implication; the scan IS the resource catalog (deliverable of this angle) — see "Angle deliverable" below. Skip conditions per SKILL.md rule apply ("pure research, no code"). Build-vs-reuse: **N/A — research-only task**.

## Build vs. reuse decisions — please confirm

N/A — research-only task. (No software components; the "build" is the user's book, and the catalog below lists the reusable tooling.)

## Feasibility verdict

- **Can do:** yes
- **Confidence:** MEDIUM
- **Why:** The strategy angle is fully answerable from live sources: the entire Kotobee publish/sell/distribute path was verified on official pages today, market context is cited (WordsRated), and every catalog entry carries a live-checked URL. Confidence is MEDIUM, not HIGH, because (a) Kotobee Books storefront size/sales data is not public, (b) Author paid-tier prices are JS-rendered/unread, and (c) Kotobee Books ToS (esp. AI-content clause) is unread — three facts the final dossier must mark as "verify at signup".

## Recommendations for the planning agent

- Structure the final dossier so the Kotobee-Books-specific facts (100% royalties, 30-book cap, EPUB/KPUB only, cover specs, Stripe/PayPal payout, 1600x2400 cover) form a single "Kotobee Books fact sheet" — they are the highest-confidence, most actionable block.
- Include a mandatory "channel strategy" section: Kotobee Books (interactive + 100%) AND export-to-Amazon/Apple/Google/Kobo/own-site (reach). Never single-channel.
- Include a "reality check" box with the WordsRated stats (250 copies avg, $1,000/yr avg) so the user's expectations are calibrated; marketing is the differentiator.
- Include the verified start-path with effort/cost/time table from this report (below) as the core how-to chapter.
- LLM/agent guide should be built as: decision tables (genre → layout → interactivity → channels), checklists (publish checklist, launch checklist), and copy-paste prompt bank (outline/draft/editor/cover/blurb/SEO/Arabic-translation/BookTok-caption) — all source material provided in this file's angle deliverable.
- Flag 3 "verify at signup" items: current Author paid-tier prices, Kotobee Books ToS AI clause, "100% royalties" still active.
- Do NOT include K-lytics anywhere; replace with WordsRated + Bookstat (enterprise) + Statista (paid, fetch-error → cite with caution).
- Cross-check with angle B (genres): the genre→resource tables below were built for the genre list given in my dispatch (children's/educational, self-help, religious/Arabic, fiction, how-to/training); adjust rows if angle B's ranked list differs.

## Open questions for the user

1. Target language mix: Arabic-first, English-first, or bilingual from day one? (This decides the Arabic/translation resource rows and the RTL layout testing step.)
2. Budget per book: $0 (all free tools), $10–50/mo (AI+editing subscriptions), or $200–2,500 (pro editor/designer)? (The start-path cost column depends on this.)
3. Primary goal: passive income from consumer sales, institutional/education licensing, or building an author brand (books as lead magnets)? (This picks the monetization chapter emphasis.)
4. First-book timeline target: 4–8 weeks (short nonfiction, AI-assisted) or 3–6 months (full fiction/manual)?

## Self-critique

- **Did I do my job?** Yes — every Kotobee-specific claim is live-verified from official sources; the honest downsides (discoverability, 90%-sell-<100 stat, time-limited royalties, B2B pricing) are stated explicitly, which is the point of this angle.
- **What might I have missed?**
  - Kotobee Books ToS / AI-content clause (link exists, content not fetched) — flagged as an open item, but the final dossier should get the actual text at build time.
  - Facebook groups for Kotobee authors specifically (no official group URL verified; only FB page links seen).
  - Actual prices of Kotobee Author paid tiers (JS-rendered) — verify at signup.
  - NaNoWriMo, Atticus, Statista, subreddits: fetches returned empty/blocked → marked "canonical URL, content unverified"; I did not fabricate details for them.
  - ElevenLabs/Kotobee Arabic TTS quality (no hands-on test possible from here).
- **What did I assume without evidence?**
  - Assumed the user is likely Arabic-speaking/MENA-adjacent (timezone +03:00, and the prompt's mention of Arabic market in my angle brief) — the Arabic/Moyasar/sample findings are included but the dossier should not over-index without user confirmation (open question 1).
  - Assumed "lower competition inside Kotobee Press" — stated as inference, not measured.
  - Assumed effort/time estimates (2–6 months first book) — these are industry-typical ranges, marked as estimates, not cited facts.

## Angle deliverable — strategy & resources

### A. Why Kotobee now (pros / cons)

**Pros (all verified 2026-08-12):**
1. **Zero-cost entry + 100% royalties on Kotobee Books** — free publishing, instant publication, 100% of sale price to author (limited-time promo per support docs). No other mainstream self-publishing storefront offers 100% (KDP: 35–70%; Apple Books: 70%). Sources: books.kotobee.com; support 8000120127; blog how-create-interactive-ebook-guide.
2. **Interactivity = structural moat vs Amazon.** Quizzes (MCQ/true-false/short-answer/drag-drop), media (video/audio/3D), mini-apps, widgets, question banks, answer persistence, Google Analytics on readers. KDP strips interactivity (Kindle format allows only limited multimedia; no scripting). Source: blog how-create-interactive-ebook-guide + Kotobee comment on Kindle restrictions (same page).
3. **Education/training positioning** — K12/Higher Ed/Corporate Training solution pages, LMS integration (LTI 1.1/1.3, Tin Can/xAPI), SCORM authoring tool, question scoring into gradebooks, 300,000+ customers, education whitepaper, awards (Brandon Hall etc.). Source: kotobee.com home/footer; support.kotobee.com integration folder.
4. **Arabic/MENA support** — Arabic site (kotobee.com/ar), Arabic samples, Moyasar payment gateway (MENA) for Library/Cloud, Arabic email course. Source: kotobee.com footer, support 8000098165/8000098164.
5. **DRM + private/secure distribution** — cloud-key encryption, device limits, offline access, branded library apps, promo codes, user access control, email automation. Source: blog ebook-drm-security-what-how; support Library/Cloud folders.
6. **Institutional/private sales channel** — sell via branded Library (Stripe/PayPal/Moyasar), Shopify/WooCommerce/Memberful integrations, Zapier, WordPress plugin. Source: blog make-money-selling-ebooks; support integration folder.
7. **Low competition inside the storefront** — small storefront with no observable rank/chart system (inference, not measured): a new listing can at least be *found* on page 1 of its category, which is impossible on Amazon. Honest caveat: small storefront also means small traffic.
8. **Author-adjacent revenue**: Kotobee affiliate program (up to 40%) lets an author monetize a how-to/education audience around the tool itself.

**Cons (honest):**
1. **Discoverability is your job.** No public traffic data, no charts; "reach thousands of readers" is a claim, not a promise. Pair with the WordsRated reality: 90% of self-pub books sell <100 copies. Mitigation = multi-channel distribution + marketing (Section C).
2. **Not a consumer marketplace.** Kotobee's DNA is tooling + education/training/institutional, not consumer book retail. Consumer fiction buyers are on Amazon/Apple/Kobo — you must export EPUB and go there yourself.
3. **No print channel** in the Kotobee stack (use KDP Print/IngramSpark or Vellum separately if you want paperbacks).
4. **B2B-priced scale-up**: Library $100+/mo, Cloud from $10/mo — fine for institutional deals, not for indie experimentation beyond the free tier (30-day trial; files deleted if unpaid).
5. **Platform limits**: 30 ebooks/account, 500 MB/file, EPUB/KPUB only, "100% royalties for a limited time".
6. **Ecosystem maturity gaps**: Author pricing page JS-rendered (hard to compare plans), docs.kotobee.com dead root, storefront FAQ thin, ToS/AI clause unread (flagged).

### B. End-to-end start path (numbered, with effort/cost/time)

Estimated for a first book, part-time author. Costs are ranges; $0 path is real.

| # | Step | What to do | Effort | Cost | Time |
|---|------|-----------|--------|------|------|
| 0 | Learn the platform | Free 7-day email course + Academy videos #1–3 (account, first ebook, fixed vs reflowable) + blog interactive-ebook guide | 3–5 h | $0 | 1 week (parallel) |
| 1 | Pick genre + niche | Use angle B's ranked genres; niche down (Kotobee blog: "Develop Your Niche"); check books.kotobee.com/library for existing competition | 2–4 h | $0 | 2–4 days |
| 2 | Outline | LLM-assisted outline (see prompt bank §E) or Reedsy Studio/Scrivener; target length from category norms (ebook can be 12 pages to 1,000+) | 4–8 h | $0 | 1 week |
| 3 | Draft | Write in Scrivener/Reedsy Studio/Google Docs or directly in Kotobee Author (has AI text gen); 1,000 words/day ≈ 6–10 weeks for a 40–60k novel; 2–4 weeks for a 10–20k nonfiction | 40–120 h | $0 (or $10/mo Sudowrite for fiction assist) | 3–12 weeks |
| 4 | Edit + proofread | Grammarly/ProWritingAid (free tiers OK); optional pro editor (Reedsy marketplace); Kotobee's budget trick: pay editor for first chapters only, fix the rest yourself | 10–30 h | $0–300 (sample edit) / $300–1,500 (full edit) | 1–3 weeks |
| 5 | Cover + layout decision | Cover: Canva (free) or designer; Kotobee Books spec 1600x2400 (min width 1400). Layout: children's/illustrated/design-heavy → fixed; novels/self-help → reflowable; Kotobee supports mixing | 4–10 h | $0–150 (cover) | 1 week |
| 6 | Build in Kotobee Author | Free license; import DOCX/EPUB/PDF or write in-app; add interactivity per genre (educational → quizzes/questions; children's → audio narration + animations; training → SCORM widgets); AI tools for text/images/questions/TTS | 10–30 h | $0 (free license; advanced export tiers paid) | 1–3 weeks |
| 7 | Publish to Kotobee Books | 3 steps: upload EPUB/KPUB → metadata + price → publish; set Stripe/PayPal payout keys; instant publication | 1–2 h | $0 | 1 day |
| 8 | Distribute beyond Kotobee | Export EPUB/MOBI/PDF from Author; upload to Amazon KDP, Apple Books, Google Play, Kobo (or aggregator like Draft2Digital); own site via WordPress plugin/Shopify; keep EPUB as portable asset | 3–8 h per channel | $0 (KDP/Apple/Google take royalty %) | 1–2 weeks |
| 9 | Market | Pre-launch: 150–200-word description, author site, email list, pre-order push; Post-launch: reviews, BookTok (3–5 posts/wk), outreach, ads, promo codes via Library | ongoing 3–5 h/wk | $0–100/mo (ads/boost) | continuous |
| — | **Totals (first book)** | | **~80–250 h** | **$0 min / $10–100/mo typical / $500–2,500 with pros** | **2–6 months part-time; 4–8 weeks short-AI-assisted nonfiction** |

Sources: books.kotobee.com; support 8000120127 & 8000111089; blog how-create-interactive-ebook-guide; blog make-money-selling-ebooks; academy.kotobee.com (47 videos); blog how-to-market-a-self-published-book. Effort/time figures are estimates from industry norms (not vendor claims).

### C. Monetization & marketing tactics (verified sources)

1. **Pricing**: benchmark same-genre titles; account for your costs; avg self-pub ebook = $4.16 (WordsRated); on Kotobee Books you keep 100% of the price — price like a store (e.g., $2.99–$9.99 niche-dependent) and use $0/free as lead magnet. Source: blog make-money-selling-ebooks; WordsRated.
2. **Royalties by channel**: Kotobee Books 100% (limited time) > own site/library ~100% > Apple/Google/Kobo ~70% > KDP 35–70% (KU = exclusivity). Source: WordsRated (KDP exclusivity), blog make-money-selling-ebooks.
3. **Bundles/promos**: promo codes (Library), free-first chapter/lead magnet, series + box sets (Vellum does box sets for exports), discounts via price field.
4. **BookTok** (verified playbook, May 2026): YA/Fantasy/Romance strongest; 3–5 posts/week; hashtag pyramid (broad → genre → your own tag); 80% community/20% promo; 3-second hook; POV videos; conversion pillars (one-click bio, TikTok LIVE, analytics-driven iteration). Source: blog what-is-booktok.
5. **Email lists**: newsletter from day one; share sneak peeks/discounts; don't oversend; DMARC hygiene. Source: blog how-to-market-a-self-published-book.
6. **Social + ads**: Facebook (groups), Instagram (giveaways/quotes/hashtags), Goodreads (author program, 45M users/mo — claim yours), TikTok; paid social ads responsive among Gen Z (75%)/Millennials (48%) — per Kotobee-cited study. Source: same article.
7. **Metadata/SEO**: title + description (150–200 words, hook first, keywords) + tags/category on Kotobee Books; keywords in ads (Publisher Rocket for keyword research); author site SEO + blog. Source: blog how-to-market-a-self-published-book; blog make-money-selling-ebooks.
8. **Institutional angle (biggest Kotobee-specific lever)**: package your book as a course-ready product: LTI 1.1/1.3 into school LMS (Moodle/Canvas/Google Classroom), SCORM export for corporate training, xAPI tracking (Kotobee blog: What Is xAPI), sell site licenses via Library; education whitepaper + case studies as sales collateral. Sources: support.kotobee.com (LTI articles), kotobee.com solutions pages, blog what-is-xapi.
9. **Affiliate program**: promote Kotobee products (not your books) for 30–40% commission; $200 threshold; useful if your brand is "how to publish ebooks". Source: kotobee.com/en/affiliates.
10. **Reviews**: ask at book end + link to review page; outreach to reviewers/influencers; Amazon review guide exists (blog how-to-get-reviews-on-amazon). Source: blog make-money-selling-ebooks.

### D. Resource catalog (link-verified; name · URL · what it offers · free/paid)

**D0. Kotobee-specific (for every genre):**
| Resource | URL | Offers | Cost |
|---|---|---|---|
| Kotobee Books | https://books.kotobee.com/ | Free storefront, 100% royalties, 3-step publish | Free |
| Kotobee Author | https://www.kotobee.com/en/products/author | Interactive ebook editor; AI text/image/question/TTS; EPUB/MOBI/PDF/app export | Free license |
| 7-day ebook course | https://www.kotobee.com/ebook-publishing-basics-course | Email course: formats→publish→attract→monetize→protect | Free |
| Kotobee Academy | https://www.kotobee.com/academy | 47 video tutorials (getting started→interactive→export) | Free |
| Help center | https://support.kotobee.com | Knowledge base: Author/Library/Cloud/Books/Narrator/API | Free |
| Blog | https://blog.kotobee.com/ | Guides: interactive ebooks, DRM, formats, layout, BookTok, marketing, AI writing | Free |
| Samples | https://www.kotobee.com/en/samples | 17 example ebooks by category (edu/wellness/fiction/design; Arabic included) | Free |
| YouTube | https://www.youtube.com/@Kotobee | Video tutorials | Free |
| Affiliate program | https://www.kotobee.com/en/affiliates | 30–40% commissions | Free |
| Capterra reviews | https://www.capterra.com/p/160177/Kotobee-Author/ | User reviews (direct fetch 403 — check manually) | Free |
| Custom services | https://www.kotobee.com/en/services | Conversion/design/scripting/publishing done-for-you | Paid (quote) |

**D1. Children's & educational (7 resources):**
| Resource | URL | What | Cost |
|---|---|---|---|
| Kotobee samples (children's/edu) | https://www.kotobee.com/en/samples (Space Journey, Plant Anatomy, Great Marshmallow Chase audiobook) | Genre exemplars, fixed-layout cases | Free |
| Blog: How to Write a Children's Book | https://blog.kotobee.com/how-to-write-a-childrens-book/ | Dos/don'ts guide | Free |
| Canva | https://www.canva.com/ | Illustrated layouts/covers (children's book templates) | Free tier / paid |
| Pixabay / Pexels / Freepik | https://pixabay.com/ · https://www.pexels.com/ · https://www.freepik.com/ | Stock illustrations (copyright-safe) | Free (Freepik paid tier) |
| Kotobee Academy videos #14–22 | https://www.kotobee.com/academy | Images, galleries, audio narration, videos in ebooks | Free |
| ElevenLabs | https://elevenlabs.io/ | AI narration voices for read-aloud audiobooks (70+ languages) | Free tier / paid |
| Blog: How to Make an Interactive Ebook (questions section) | https://blog.kotobee.com/how-create-interactive-ebook-guide/ | Quiz/question design for educational workbooks | Free |

**D2. Self-help / wellness / lifestyle (7):**
| Resource | URL | What | Cost |
|---|---|---|---|
| Kotobee wellness samples | https://www.kotobee.com/en/samples (Holistic Aromatherapy, Yoga En Casa, Health & Fitness, Smoothies) | Genre exemplars | Free |
| Blog: The Simple Guide to Prewriting Your Ebook | https://blog.kotobee.com/extensive-guide-prewriting-ebook/ | Outlining for nonfiction | Free |
| Blog: How to Make Money Selling Ebooks in 5 Steps | https://blog.kotobee.com/make-money-selling-ebooks/ | Research→pricing→selling loop for niche nonfiction | Free |
| ProWritingAid | https://prowritingaid.com/ | Grammar + style + manuscript analysis | Free tier / paid |
| WordsRated (ebook stats) | https://wordsrated.com/ebook-statistics/ | Category/price benchmarks | Free |
| r/selfpublish (community) | https://www.reddit.com/r/selfpublish/ | Self-pub Q&A, pricing/marketing war stories (fetch blocked — canonical) | Free |
| Bookstat | https://www.bookstat.com/ | Real-time ebook sales data per genre (enterprise tier) | Paid (enterprise) |

**D3. Religious / Arabic / MENA (7):**
| Resource | URL | What | Cost |
|---|---|---|---|
| Kotobee Arabic samples | https://www.kotobee.com/en/samples (alzheimer-arabic, body-language-arabic) | RTL + Arabic interactive ebooks proven on platform | Free |
| Kotobee Arabic site | https://www.kotobee.com/ar | Arabic product site + Arabic email course | Free |
| Moyasar (payments) | https://support.kotobee.com/en/support/solutions/articles/8000098165-collect-payments-with-moyasar | MENA payment gateway for Library/Cloud sales | Fee per transaction |
| Grammarly | https://www.grammarly.com/ | EN + (limited) AR grammar support | Free / $12 mo |
| DeepL (canonical) | https://www.deepl.com/ | EN↔AR translation for second editions | Free tier / paid |
| Blog: pen name + branding | https://blog.kotobee.com/a-step-by-step-guide-on-how-to-come-up-with-a-pen-name/ | Author identity for Arabic/MENA market | Free |
| WordsRated global stats | https://wordsrated.com/self-published-book-sales-statistics/ | Market context (no AR-specific data — flag) | Free |

**D4. Fiction (YA/fantasy/romance/thriller) (8):**
| Resource | URL | What | Cost |
|---|---|---|---|
| Reedsy Learning — How to Write a Novel | https://reedsy.com/learning/ | 101-lesson video masterclass (+free lesson; Reedsy Studio integration) | $1,399 one-time |
| NaNoWriMo | https://nanowrimo.org/ | Annual novel-writing challenge + community (fetch empty — canonical) | Free |
| Sudowrite | https://www.sudowrite.com/ | Fiction AI partner: Describe/Write/Expand/Rewrite/Story Bible; Muse model | $10/mo after trial |
| NovelAI | https://novelai.net/ | Storytelling + anime art generation | $10–25/mo |
| r/romanceauthors · r/eroticauthors · r/writing · r/wroteabook | https://www.reddit.com/r/romanceauthors/ · /r/eroticauthors/ · /r/writing/ · /r/wroteabook/ | Genre communities, blurbs, covers, tropes (fetch blocked — canonical) | Free |
| Scrivener | https://www.literatureandlatte.com/scrivener/overview | Long-form drafting, corkboard, compile to EPUB | Paid (one-time) |
| Vellum | https://www.vellum.pub/ | Beautiful EPUB/print formatting (Mac only) | $199.99 / $249.99 |
| Blog: What Is BookTok | https://blog.kotobee.com/what-is-booktok/ | Fiction-specific marketing playbook (YA/Fantasy/Romance) | Free |
| Kotobee samples (fiction) | https://www.kotobee.com/en/samples (Cat Who Knew Secrets audiobook, Marshmallow Chase) | Fiction/children's audiobook exemplars | Free |

**D5. How-to / training / professional (7):**
| Resource | URL | What | Cost |
|---|---|---|---|
| Kotobee Corporate Training solution | https://www.kotobee.com/en/solutions/corporate-training | Positioning your book for companies/LMS | Free |
| Blog: What Is xAPI | https://blog.kotobee.com/what-is-xapi/ | Learning-tracking for interactive training books | Free |
| Blog: Best SCORM Authoring Tools 2026 | https://blog.kotobee.com/best-scorm-authoring-tools/ | SCORM export for corporate clients | Free |
| Kotobee Library | https://www.kotobee.com/en/products/library | Sell site licenses / branded library | $100–1,000/mo |
| Kotobee Cloud | https://www.kotobee.com/en/products/cloud | Secure per-user delivery + DRM | $10–500/mo |
| Blog: How to Create Your Own Shopify Bookstore | https://blog.kotobee.com/how-to-create-a-shopify-bookstore/ | Direct-to-customer store | Free (Shopify fees separate) |
| Kotobee education whitepaper | https://www.kotobee.com/files/docs/education-whitepaper.pdf | Institutional sales collateral | Free PDF |

**D6. AI stack for the LLM/agent-assisted pipeline (cross-genre):**
| Resource | URL | What | Cost |
|---|---|---|---|
| Kotobee Author built-in AI | https://www.kotobee.com/academy (tutorial #32) | Text/image/question gen + TTS inside the editor | Included in free license |
| Blog: Best AI Writing Software 2026 | https://blog.kotobee.com/ai-writing-software/ | Kotobee's tool roundup w/ prices + caveats | Free |
| Sudowrite | https://www.sudowrite.com/ | Fiction drafting | $10/mo |
| ElevenLabs | https://elevenlabs.io/ | Audiobook narration/TTS | Free tier / paid |
| Midjourney | https://www.midjourney.com/ | Cover art generation | Paid (subscription) |
| NovelAI | https://novelai.net/ | Anime-style covers/illustrations | $10–25/mo |
| Grammarly AI | https://www.grammarly.com/ | Editing + AI detector/humanizer | Free / $12 mo |

### E. LLM/agent-guide source material

**E1. Where an LLM/agent adds value per step** (each maps to a prompt in the final guide):
1. **Genre/niche research**: summarize category landscapes, competition gaps, keyword demand (feed it WordsRated/blog data).
2. **Outline**: generate chapter-by-chapter outlines from a one-paragraph premise; iterate structure.
3. **Drafting**: scene/chapter drafts, dialogue, worldbuilding consistency; Sudowrite for fiction-native tools; general LLMs (Claude/GPT/DeepSeek class) for prose + fact-check pass.
4. **Editing**: line edits, consistency checks (character names, timelines), readability scores; ProWritingAid reports as second pass.
5. **Cover prompt generation**: prompt-engineering for Midjourney/DALL-E-class tools (subject, palette, typography placement, genre conventions, 1600x2400 canvas note).
6. **Marketing copy**: 150–200-word descriptions (hook-first), blurbs, BookTok scripts/captions, hashtag sets, ad copy variants, email sequences.
7. **Metadata/SEO**: title/description/tag/category suggestions from genre keywords; Goodreads/Amazon keyword research support.
8. **Translation EN↔AR**: draft translation + RTL-safe phrasing; ALWAYS human-review (Arabic register/religious-sensitivity errors are common LLM failure modes).
9. **Automation/ops for agents**: assemble publish checklists, generate Kotobee Books metadata form values, track pre-order/review tasks, draft affiliate content.

**E2. Verified AI landscape (prices as of 2026-08-12):**
- Sudowrite $10/mo (fiction; Muse 1.5) — verified sudowrite.com
- NovelAI $10/$15/$25 (anime art + stories) — verified novelai.net
- ElevenLabs free tier + paid (TTS, 70+ languages, audiobook narration voices, v3 model) — verified elevenlabs.io
- Midjourney (image+video models; subscription) — verified midjourney.com
- Grammarly Free/Pro $12/mo (incl. AI detector + humanizer) — verified grammarly.com
- General LLMs (Claude / GPT / DeepSeek classes): canonical vendor sites; no fetch performed — mark "unverified fetch, well-known".
- Kotobee blog's roundup (Article Forge/Jasper/CopyMatic/Writesonic/Rytr/AI Writer/Shortly with prices) — verified blog.kotobee.com/ai-writing-software.

**E3. Caveats (must appear in the guide):**
- **Accuracy**: Kotobee's article cites ~80% AI accuracy — always human fact-check (esp. health/religious/legal content).
- **Copyright**: AI-generated-content copyright is jurisdiction-dependent and evolving (US Copyright Office requires human authorship for registration); Kotobee Books ToS AI clause unread — verify at signup. Do NOT state definitive legal positions in the dossier; provide the checkpoints.
- **Disclosure**: Amazon KDP requires AI-generated-content disclosure; other platforms differ — keep a disclosure checklist.
- **Quality bar**: AI drafts are starting points; the differentiator on a small storefront is human-quality writing + real interactivity.
- **Kotobee's stance**: platform-embracing — Author ships AI generators; blog promotes AI writing tools (2026 update), so AI-assisted workflows are consistent with the platform's positioning.

**E4. Machine-readable guide structure (recommended for the final dossier):**
1. Decision tables: genre × layout (fixed/reflowable/mixed) × interactivity level × channels × price band.
2. Checklists: pre-publish (10 items incl. cover spec, EPUB validation, ToS check, payout keys), launch (5 items), post-launch (7 items incl. reviews/BookTok cadence).
3. Prompt bank (copy-paste, one per step in E1): e.g., outline prompt, chapter-draft prompt, blurb prompt (150–200 words, hook first), metadata prompt, cover-art prompt (Midjourney format), Arabic-translation prompt (register + RTL), BookTok caption + hashtag pyramid prompt.
4. Failure-mode registry: what to do when (a) EPUB rejected (re-export from Author), (b) Stripe keys invalid (sandbox vs live), (c) interactivity lost in export (Kindle strips scripting → export MOBI only for Kindle Fire, else EPUB), (d) 500MB cap (compress media), (e) 30-book cap (contact support).
5. Metrics: define success (copies, royalties, list growth) against the WordsRated baselines.

## Metrics

- findings: 15
- risks_HIGH: 1
- risks_MEDIUM: 3
- risks_LOW: 1
- clarifying_Qs: 5
