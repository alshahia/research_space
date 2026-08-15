# 05 — Action plan for this user (bank account → decisive tests → publish track → audiobooks → negotiated channels)

**Sources:** canonical merged research (`share/notes/01_research_T-2026-08-12-002.md` — "Feasibility verdict", flags 1–2, 8), master synthesis §1–2 (Tier-1 order, ≈ $4.40 margin), auto-answers Q1–Q5 (no PayPal/Payoneer; no bank yet; bilingual; ebooks + audiobooks; tax = advise me), dossier chapters `01_eligibility_and_rails.md` (D1 tests), `02_platform_matrix.md` (sheets 1, 5, 9, 20, 27), `03_arabic_channels.md` (contact sheet + templates), `04_audiobooks.md` (EN/AR decision), Task 001 research (`share/notes/01_research_T-2026-08-12-001_angle-strategy.md` — WordsRated). Access date for every URL: **2026-08-12**.

Legend: ⚠️ conditional (depends on a rail test) · ❌ blocked per official evidence · 🔶 unverified — test at signup.

This chapter is the step-by-step plan for **this specific user** (auto-answers): no PayPal, no Payoneer, **no bank account yet**; bilingual (Arabic + English); ebooks and audiobooks; $0-first budget. It is sequenced so that every step works no matter which way the two decisive rail tests (D1) land.

---

## Step 0 — Open a KRG (Iraq) USD bank account that accepts incoming SWIFT transfers

**Why first:** the user has **no bank account yet** (auto-answer Q2), and every bank-dependent rail in this dossier is marked **"after account opening"**: **Kobo EFT, PublishDrive, KDP wire/EFT** (01 §2 note). Without an account, the only payout routes are check-by-mail and the Payoneer/PayPal tests in Step 1.

**What to do — generic guidance only; no bank is named in this dossier** (KRG banking reality is user-side and uncitable — canonical flag 8; 01 §2):

1. Choose a bank in the Kurdistan Region (KRG). Bank choice is the user's; the dossier names no bank because no citable source exists (canonical flag 8).
2. Ask for a **USD-denominated account**.
3. Ask for the account's **SWIFT/BIC code**, and confirm the bank accepts **incoming international SWIFT transfers in USD**.
4. Ask about documentation and fees up front — KDP's own Payment Options page notes "some local banks require additional documentation to release funds from international electronic payments, and some of them may have a payment threshold." [https://kdp.amazon.com/en_US/help/topic/GJD7DFFX6X88AK46, 2026-08-12]

**What opens after account opening (each still verify-at-signup):**

- **Kobo Writing Life** — EFT-only payout (no PayPal/Payoneer/check), CAD $50 threshold, paid 45 days after month end, 8 currencies; whether a KRG bank can receive via Kobo's payment partner is unverified → try the KWL dashboard bank-add flow. [https://kobowritinglife.zendesk.com/hc/en-us/articles/360059385891-How-and-when-do-I-get-paid, 2026-08-12; 02 sheet 4]
- **PublishDrive** — bank/Payoneer/PayPal payout methods (not statically documented — verify at signup). [https://publishdrive.com/pricing.html, 2026-08-12; 02 sheet 9]
- **KDP wire/EFT** — Iraq is not on KDP's direct-deposit country list; the participating-PSP route (Payoneer/Wise, Step 1 Test A) is the realistic EFT path. [https://kdp.amazon.com/en_US/help/topic/GJD7DFFX6X88AK46, 2026-08-12]

---

## Step 1 — The two 10-minute tests (decision point D1)

The user holds **neither PayPal nor Payoneer** (auto-answer Q1), so both must be tested with the KRG address. Full test cards, steps, and record-results checklists live in **01 §3** — run **Payoneer first (decisive), then PayPal**.

### Test A — Payoneer registration with the KRG address (the decisive test)

1. Read the official capabilities page and its disclaimer ("Payoneer does not guarantee the availability of any particular payment method"). [https://www.payoneer.com/resources/tools/global-payment-capabilities/, 2026-08-12]
2. Attempt registration at payoneer.com with the **KRG (Iraq) address**.
3. Record the exact outcome (screen text, error, or approval).

### Test B — PayPal signup attempt with the KRG address (expected-negative)

1. Visit `paypal.com/iq` — expect a redirect to the US homepage (no Iraq market site). [https://www.paypal.com/iq/webapps/mpp/home, 2026-08-12]
2. Visit `paypal.com/sy` — expect a 404 (no Syria market site). [https://www.paypal.com/sy/webapps/mpp/home, 2026-08-12]
3. Attempt signup with the KRG address — expect CAPTCHA/JS gating; cross-check Patreon's official PayPal-payout country list (Iraq and Syria absent). [https://support.patreon.com/hc/en-us/articles/29467737603981-Paypal-supported-countries, 2026-08-12]

### Decision point D1 — outcome branches (the plan works either way)

**Test A (Payoneer):**

| Outcome | Consequence | Branch the plan takes |
|---------|-------------|------------------------|
| **Opens / account created** | KDP-PSP rail (Payoneer is a **participating KDP PSP**), D2D-Payoneer payout ($20 min), and the Patreon bank-transfer rail open → ≈60% of the matrix re-classified (01 §3; 02 sheets 1, 5, 15) | **Branch A** — Step 2 uses PSP rails; Patreon becomes a candidate (still verify-at-signup, 02 sheet 15) |
| **Refused / "not available in your country"** | Payoneer-dependent paths close | **Branch B** — Step 2 uses **check-by-mail**: KDP "Other" USD check, Lulu quarterly check ($20 min), D2D check ($100 min) [https://kdp.amazon.com/en_US/help/topic/GJD7DFFX6X88AK46, https://help.lulu.com/en/support/solutions/articles/64000255464-creator-revenue-the-basics, https://www.draft2digital.com/faq/, 2026-08-12]; bank EFT (Kobo, PublishDrive) after Step 0; the negotiated Arabic channels (03) become primary; **revisit Payoneer once after the bank account opens** |
| **"Needs more information" / pending review** | Treat as 🔶 — do not assume either way | Record the exact request, retry once after 48h, then proceed on the branch the evidence supports |

**Test B (PayPal):**

| Outcome | Consequence | Branch the plan takes |
|---------|-------------|------------------------|
| **Signup opens with the KRG address** | Lulu PayPal rail, Ko-fi PayPal leg, and D2D PayPal payout open (01 §3) | Lulu via PayPal; D2D can use either rail |
| **Blocked (expected)** | Lulu routes via check (quarterly, $20 min); Ko-fi and Leanpub stay blocked at the rail (02 sheets 12, 16); D2D falls back to Payoneer (Test A) | Branch A or B per Test A |

---

## Step 2 — Publish track (after D1; ebooks first, bilingual)

Three platforms, **$0 setup each** (except D2D's $20 activation), each with a pointer to its 02 sheet. The 30% US withholding is included in the net-royalty math in 06.

### 2.1 KDP — Arabic eBook (02 sheet 1)

- **Cost:** $0 free. [02 sheet 1]
- **Arabic:** eBook supported; **RTL is mandatory** (LTR files rejected); tashkeel/spacing quality gates; Arabic metadata must match the language selection; **no Arabic paperback** (eBook only). [https://kdp.amazon.com/en_US/help/topic/GUQT4C8J6RR6V8TY, 2026-08-12; 02 sheet 1]
- **Royalty:** 70% band **$2.99–$12.99, eff. 2026-07-07**, minus delivery fees ($0.06/MB US, $0.15/MB elsewhere). [https://kdp.amazon.com/en_US/help/topic/G200634560, 2026-08-12]
- **Payout (per D1):** participating PSP (**Payoneer and Wise both participating**; as of 2026-08-01 KDP stopped payments to non-participating PSPs) or check-by-mail ("Other", USD). [https://kdp.amazon.com/en_US/help/topic/G6GLVRHVQZY4V4FX, https://kdp.amazon.com/en_US/help/topic/GD9NN4LS8ZDU8XZ7, https://kdp.amazon.com/en_US/help/topic/GJD7DFFX6X88AK46, 2026-08-12]
- **Margin:** 30% US withholding on US-sourced royalties — worked math in 06 §3.1.

### 2.2 Draft2Digital — bilingual wide EN/AR (02 sheet 5)

- **Cost:** $20 one-time activation; $12/yr maintenance if earnings < $100/yr. [https://www.draft2digital.com/faq/, 2026-08-12]
- **One upload → 14 stores** (Apple, B&N, Kobo + Kobo Plus, Smashwords Store, Tolino, OverDrive, cloudLibrary, Everand, Hoopla, Vivlio, BorrowBox, Gardners, Bookshop.org; Amazon invite-only). [02 sheet 5]
- **Rail (per D1):** Payoneer ($20 min) / PayPal ($10 min) / check ($100 min) / direct deposit. [https://www.draft2digital.com/faq/, 2026-08-12]
- **Arabic:** RTL content accepted in principle; Arabic metadata/storefront presence not documented (FLAG — verify at signup). [02 sheet 5]
- **Margin:** D2D withholds **30% for all international publishers by default** (treaty-reduced only — no IQ/SY treaty) — 06 §3.2. [https://www.draft2digital.com/faq/, 2026-08-12]

### 2.3 Kotobee Books — Arabic-native storefront (02 sheet 20)

- **Cost:** $0 free — "There are no fees required for publishing on Kotobee Books"; **100% royalties ("for a limited time" promo)**. [https://books.kotobee.com/signup, 2026-08-12; 02 sheet 20]
- **Rail gate:** the author connects their **own Stripe or PayPal** at publish time (buyer pays the author directly) — the same D1 test; eFinance (Egypt) gateway added v1.9.8 (2026-07-07). [https://support.kotobee.com/en/support/solutions/articles/8000111089-collect-payments-in-kotobee-books, 2026-08-12; 02 sheet 20]
- **Arabic:** native Arabic, RTL-first; signup country dropdown includes **"Syrian Arab Republic" and "Iraq"** (signup itself is not the gate — the processor is). [https://books.kotobee.com/signup, 2026-08-12; 02 sheet 20]

---

## Step 3 — Audiobooks (EN now, AR deferred)

- **English via ACX:** $0 setup; new royalty model **50% (exclusive) / 30% (non-exclusive), eff. 2026-05-26**; monthly bank payout USD/GBP/EUR/CAD, payments under $50 carried forward; gate = the payout-rail test (D1) + tax/bank info at payout setup. [https://help.acx.com/s/article/how-royalties-work, 2026-08-12; 04 Card 1]
- **Arabic audio: deferred.** ACX does not support Arabic (documented absence — 04 Card 1); Voices by INaudio Arabic audio unverified; Storytel is aggregator-only with no captured route list — all are verify-at-signup items (04 §2 decision table). No Arabic-audio step runs until a channel clears verification.
- **Production note:** narration cost is user-side and uncitable — the "$0" label covers platform setup only (04 §3).

---

## Step 4 — Negotiated Arabic channels (after the storefront is live)

Once Step 2 has a live storefront, send the ready-made templates in **03 §3** (each in EN + AR): Template 1 for **Rufoof / Abjjad**, Template 2 (ebook + POD variant) for **Neelwafurat** via widadd@nwf.com, Template 3 for **KDP Arabic support** via Arabic-KDP-Resolvers@amazon.com. The full contact sheet (all five captured addresses, verbatim) is 03 §2.

**Reply-tracking table** (fill as you send):

| Platform | Sent date | Reply date | Outcome |
|----------|-----------|------------|---------|
| Rufoof (support@rufoof.com) | | | |
| Abjjad (feedback@abjjad.com) | | | |
| Neelwafurat — ebook (widadd@nwf.com) | | | |
| Amazon KDP Arabic support (Arabic-KDP-Resolvers@amazon.com) | | | |

---

## Timeline (4–8-week fast lane, adapted — bank opening is the first milestone)

All timeframes are **estimates** (ranges, per plan rule); bank opening is user-side and uncitable (canonical flag 8).

| Step | Timeframe (estimate) | Cost | Depends on |
|------|----------------------|------|------------|
| 0 — KRG USD bank account | 2–6 weeks (user-side) | $0 + bank fees (user-side, uncitable) | nothing |
| 1 — Two 10-minute tests (D1) | 1 day (two 10-minute tests) | $0 | nothing — runs in parallel with Step 0 |
| 2 — Publish track (KDP + D2D + Kotobee) | 1–4 weeks (manuscript/format prep is user-side) | $0 + $20 D2D activation | D1 result; finished manuscript |
| 3 — Audiobooks (EN via ACX) | 2–8 weeks (narration production is user-side and uncitable — 04 §3) | $0 platform setup | D1 result; narration |
| 4 — Negotiated Arabic channels | Starts after storefront live; reply times not published | $0 | Step 2 live |

Fast-lane note: Steps 1–2 run **in parallel with bank opening (Step 0)** — the bank gates only the bank-EFT rails (Kobo, PublishDrive, KDP wire), not the PSP/check rails.

---

## The $0 cost path (summary)

- **Free-first stack:** KDP $0 + D2D $20 activation + Kotobee $0 + ACX $0 → **minimum outlay $20**.
- **Paid tiers are later-only options, not part of the path:** D2D $12/yr maintenance (only if earnings < $100/yr); StreetLib $99/yr or $299 lifetime; PublishDrive plans (prices JS-gated — verify at signup). [https://www.draft2digital.com/faq/, https://www.streetlib.com/ (rendered snapshot 2026-08-12), https://publishdrive.com/pricing.html, 2026-08-12]
- Every platform in the stack is $0 to set up except D2D's $20 activation (02 sheets 1, 5, 20; 04 Card 1).

---

## Success metrics (targets, not guarantees)

Each metric is a milestone of this plan itself — no external threshold is invented. Realistic framing: these measure **rails opened and platforms live**, not sales (see the reality check below).

| Metric | Target | Step it tracks |
|--------|--------|----------------|
| Rails open | 2 rails working: Payoneer account (Test A) + KRG bank account (Step 0) | 1, 0 |
| Platforms live | 3 platforms live with ≥1 book each: KDP AR eBook, D2D EN+AR, Kotobee storefront | 2 |
| First payout evidence | First royalty statement received (any platform) | 2 / 3 |
| Negotiation progress | ≥1 reply from a negotiated Arabic channel | 4 |

---

## Reality check (carried from Task 001 — read before expecting sales)

Self-publishing is a volume-and-marketing game, not publish-and-earn. Task 001's research (WordsRated, updated 2026-03-27): the average self-published ebook sells **~250 copies**; **90% of self-published books sell fewer than 100 copies**; the average self-published author earns **~$1,000/yr**; the self-publishing segment grows **~17%/yr**. [https://wordsrated.com/self-published-book-sales-statistics/, 2026-08-12; `share/notes/01_research_T-2026-08-12-001_angle-strategy.md` §B] That is why this plan is multi-channel (three storefronts + negotiated Arabic lanes) and why the metrics above are **targets, not guarantees** — multi-channel distribution and marketing are the mitigation; no single platform fixes discoverability (Task 001 master synthesis §1.3).

*Print note: Lulu and Neelwafurat print/POD are optional-later only per auto-answer Q4 (ebooks + audiobooks are the core); print is not a step in this plan (02 sheets 11, 25; 03 Card 1).*
