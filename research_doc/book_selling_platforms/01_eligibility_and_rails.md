# 01 — Eligibility and payout rails (sanctions reality, rail map, the two decisive tests)

**Sources:** canonical merged research (`share/notes/01_research_T-2026-08-12-002.md` — "Payout rails matrix", "Tax (verified)", "The one-line answer", flags 1–3, 8, 10), Angle C (`share/notes/01_research_T-2026-08-12-002_angle-eligibility.md`), Angle A finding 27 (PayPal country-worldwide list), master synthesis §1, auto-answers Q1/Q2. Access date for every URL: **2026-08-12**.

This chapter is the spine of the dossier: first the sanctions reality (the thing most people fear is actually not the law anymore), then the payout-rail map (the thing that actually decides everything), then the two 10-minute tests that re-classify ~60% of the platform matrix. The one-sentence version: **the gate is money movement, not nationality.**

---

## 1. Sanctions reality (US comprehensive Syria sanctions revoked 2025-07-01)

- **Syria:** US comprehensive sanctions were revoked effective **2025-07-01** (E.O. of June 30, 2025, #14312; six founding EOs revoked; 31 CFR 542 Syrian Sanctions Regulations removed from the CFR). What remains is **targeted**: the renamed PAARSS program (31 CFR 569) — Assad + associates, human-rights abusers, Captagon traffickers, ISIS/AQ affiliates, Iran-linked actors, past-proliferation actors. Syria is not a comprehensively sanctioned country as of the access date. [https://ofac.treasury.gov/sanctions-programs-and-country-information/paarss, 2026-08-12]
- **Iraq:** not comprehensively sanctioned either — the comprehensive Iraqi Sanctions Regulations were removed in 2010 (75 FR 55462); only the targeted "Iraq Stabilization and Insurgency Sanctions Regulations" (31 CFR 576) remains, aimed at persons threatening stabilization. A person in Iraq is not sanctioned by location. [https://ofac.treasury.gov/sanctions-programs-and-country-information/iraq-related-sanctions, 2026-08-12]
- OFAC administers **no single "country list"** — programs are targeted/SDN-based; a person's location in Iraq or Syria is not, by itself, a prohibition under OFAC. The residual risks are: (a) being a designated person (SDN) — not the user's case on the facts given; (b) platform-specific compliance policy; (c) the SST designation being read restrictively by some non-US banks/processors. [https://ofac.treasury.gov/sanctions-programs-and-country-information/where-is-ofacs-country-list-what-countries-do-i-need-to-worry-about-in-terms-of-us-sanctions, 2026-08-12]
- **Consequence (canonical framing, verbatim from the merged research's one-line answer):** "A Syrian national residing in Kurdistan (KRG, Iraq) is **NOT blocked by sanctions**" — the US revoked comprehensive Syria sanctions effective 2025-07-01 (EO 14312; only targeted PAARSS 31 CFR 569 remains) and Iraq has not been comprehensively sanctioned since 2010. "**The binding constraint is payout rails and per-platform payout-country lists.**" Verified: Stripe ❌, PayPal ❌ (per official-market evidence), Payoneer 🔶 (the single decisive test), KDP/Google ❌ for Iraq/Syria on official payment lists, IngramSpark ❌ (author-country residency gate), D2D/Lulu/Kobo/Kotobee ⚠️ conditional on rails, ~13 platforms 🔶 verify-at-signup. [canonical one-line answer, 2026-08-12]
- **SST nuance (canonical flag 10):** Syria's **State Sponsor of Terrorism designation is retained**. Some platform compliance policies treat SST countries restrictively beyond OFAC. Any platform that still refuses "Syria" after the 2025-07-01 revocation is applying its own compliance policy — such a rejection is **appealable, and worth testing rather than assuming**. [https://ofac.treasury.gov/sanctions-programs-and-country-information/paarss, 2026-08-12; canonical flag 10; master synthesis §1]

Bottom line for this user: a Syrian national residing in KRG is **not OFAC-blocked by nationality or residence**. The two things that will actually decide which platforms work are (1) payout-rail availability and (2) each platform's payout-country list — covered next.

---

## 2. Payout rails map (the 6 rails that decide everything)

Legend: ❌ blocked per official evidence · ⚠️ conditional / technically possible · 🔶 unverified — must test. Every claim carries its evidence URL, accessed 2026-08-12.

| Rail | Iraq | Syria | Verdict | Evidence (all access date 2026-08-12) |
|------|------|-------|---------|----------------------------------------|
| **Stripe** | ❌ | ❌ | Blocked — official country list (~46 countries/regions; MENA = UAE only); IQ and SY absent. Verified. | [https://stripe.com/global](https://stripe.com/global) |
| **PayPal** | ❌ | ❌ | No IQ market site (`paypal.com/iq` redirects to the US homepage); no SY market site (`paypal.com/sy` 404s); absent from Patreon's official PayPal-payout country list (MENA list: EG, JO, KW, SA, AE, etc. — no IQ, no SY). PayPal's own country list is JS/CAPTCHA-gated (FLAG), so this rests on official-market evidence, not PayPal's own list. | [https://www.paypal.com/iq/webapps/mpp/home](https://www.paypal.com/iq/webapps/mpp/home) · [https://www.paypal.com/sy/webapps/mpp/home](https://www.paypal.com/sy/webapps/mpp/home) · [https://www.paypal.com/us/webapps/mpp/country-worldwide](https://www.paypal.com/us/webapps/mpp/country-worldwide) (Playwright capture) · [https://support.patreon.com/hc/en-us/articles/29467737603981-Paypal-supported-countries](https://support.patreon.com/hc/en-us/articles/29467737603981-Paypal-supported-countries) |
| **Payoneer** | 🔶 **decisive test** | 🔶 | Official page claims payouts in **190+ countries** incl. SWIFT routes; the map is interactive JS with an explicit disclaimer: "Payoneer does not guarantee the availability of any particular payment method." **Cannot be verified statically — registration with the KRG address is the single most decisive test** (gates KDP-PSP, D2D-Payoneer, Patreon-bank ≈ 60% of the matrix). | [https://www.payoneer.com/resources/tools/global-payment-capabilities/](https://www.payoneer.com/resources/tools/global-payment-capabilities/) |
| **Wise** | 🔶 | 🔶 | Availability page gated (404 / JS probe); no static country list fetched. **Wise IS a participating KDP PSP** (as of 2026-08-01 payments to non-participating PSPs stopped; Payoneer and Wise both on the participating list). | [https://wise.com/available-countries/](https://wise.com/available-countries/) (404) · [https://wise.com/gb/availability/](https://wise.com/gb/availability/) (JS probe) · [https://kdp.amazon.com/en_US/help/topic/G6GLVRHVQZY4V4FX](https://kdp.amazon.com/en_US/help/topic/G6GLVRHVQZY4V4FX) · [https://kdp.amazon.com/en_US/help/topic/GD9NN4LS8ZDU8XZ7](https://kdp.amazon.com/en_US/help/topic/GD9NN4LS8ZDU8XZ7) |
| **Bank EFT/wire** | ❌ for IQ on the KDP list → check-by-mail | same | KDP: Iraq not on the direct-deposit/wire country table (only Jordan from MENA) → "Other" table = **paper check by mail in USD** for unlisted countries. Google: IQ absent from the Payments column (requires local business address + local bank in a payment-supported country; no alternative methods). Kobo: EFT-only, 8 currencies, **no country list published**. Apple: Bank Country dropdown in iTunes Connect, content not published. | [https://kdp.amazon.com/en_US/help/topic/GJD7DFFX6X88AK46](https://kdp.amazon.com/en_US/help/topic/GJD7DFFX6X88AK46) · [https://support.google.com/books/partner/answer/2987594](https://support.google.com/books/partner/answer/2987594) · [https://support.google.com/books/partner/answer/6009580](https://support.google.com/books/partner/answer/6009580) · [https://kobowritinglife.zendesk.com/hc/en-us/articles/360059385891-How-and-when-do-I-get-paid](https://kobowritinglife.zendesk.com/hc/en-us/articles/360059385891-How-and-when-do-I-get-paid) · [https://itunespartner.apple.com/books/articles/set-up-banking-information-in-itunes-connect-2705](https://itunespartner.apple.com/books/articles/set-up-banking-information-in-itunes-connect-2705) |
| **Check / mail** | ⚠️ technically | same | KDP "Other" = check in USD for unlisted countries (technically available to an Iraqi address, subject to mail reliability); Lulu check in USD, quarterly, **$20 min**; D2D check **$100 min** ($2.50/$4 fee). Practical reliability is user-side. | [https://kdp.amazon.com/en_US/help/topic/GJD7DFFX6X88AK46](https://kdp.amazon.com/en_US/help/topic/GJD7DFFX6X88AK46) ("Other" section) · [https://help.lulu.com/en/support/solutions/articles/64000255464-creator-revenue-the-basics](https://help.lulu.com/en/support/solutions/articles/64000255464-creator-revenue-the-basics) · [https://www.draft2digital.com/faq/](https://www.draft2digital.com/faq/) |

How to read this table: the pattern across all platforms is that **payout eligibility is bank-country-driven, not citizenship-driven** — the citizenship question enters only through the US tax form (W-8BEN Line 2), which affects the withholding rate (via treaty — and no treaty exists for IQ/SY), not the ability to be paid. The actual blockers are payout-country lists and rail availability. [https://www.irs.gov/instructions/iw8ben, 2026-08-12; angle-eligibility §1.1]

Two notes that affect the rails above:

- **KDP PSP program (2026 status change):** as of **2026-08-01**, KDP stopped payments to non-participating PSPs; **Payoneer and Wise are both on the participating-PSP list** (also Airwallex, WorldFirst, PingPong, etc.). PSP eligibility is per-account — KDP notifies if only a deposit-taking bank is allowed. This is why Test A below is decisive for KDP. [https://kdp.amazon.com/en_US/help/topic/GD9NN4LS8ZDU8XZ7, https://kdp.amazon.com/en_US/help/topic/G6GLVRHVQZY4V4FX, 2026-08-12]
- **KRG banking reality (canonical flag 8):** whether the user's KRG bank holds USD and accepts incoming international SWIFT transfers is **user-side and uncitable** from platform docs. The user currently has **no bank account yet** (auto-answer Q2) — so every bank-dependent rail (KDP wire/EFT, Kobo EFT, PublishDrive) is marked "after account opening" in the action plan (05). KDP's own Payment Options page notes "some local banks require additional documentation to release funds from international electronic payments, and some of them may have a payment threshold." [https://kdp.amazon.com/en_US/help/topic/GJD7DFFX6X88AK46, 2026-08-12; auto-answers Q2]

---

## 3. Decision point D1 — the two 10-minute tests

The user holds **neither PayPal nor Payoneer** (auto-answer Q1), so both must be tested with the KRG address. These two tests are Phase-0 of the action plan (05) and **re-classify ~60% of the platform matrix** (canonical flags 1–2; Angle C recommendation 1). Do them once, record the results below, and every platform sheet in 02 becomes readable in one pass.

### Test A — Payoneer registration with a KRG address (the decisive test)

**Why it matters:** Payoneer is a participating KDP PSP, a D2D payout method, and the processor behind Patreon bank transfers. If Payoneer onboards an Iraq (KRG) resident, the Payoneer-dependent cluster of the matrix opens.

**Steps (10 minutes):**
1. Open the official capabilities page and read the disclaimer — availability is not guaranteed and changes: https://www.payoneer.com/resources/tools/global-payment-capabilities/
2. Attempt registration at payoneer.com using the **KRG (Iraq) address**.
3. Record the outcome exactly as shown — the screen text, any error, or the approval.

**Expected outcomes:**

| Outcome | Consequence for the matrix |
|---------|----------------------------|
| **Registration opens / account created** | KDP-PSP rail (Payoneer participating KDP PSP), D2D-Payoneer payout, and Patreon bank-transfer rail open → ≈60% of the matrix re-classified from 🔶/❌ to ⚠️/✅ (KDP sheet 1, D2D sheet 5, Patreon sheet 15, plus every Payoneer-rail aggregator) |
| **Registration refused / "not available in your country"** | Check-by-mail (KDP, Lulu), bank EFT (Kobo, PublishDrive), and the negotiated Arabic channels (Rufoof, Abjjad, Neelwafurat — 03) become primary; Payoneer-dependent paths close |
| **"We need more information" / pending review** | Record the exact request, **retry once** after 48h, and treat as 🔶 until resolved — do not assume either way |

### Test B — PayPal signup with a KRG address (expected-negative evidence)

**Why it matters:** PayPal is a payout rail for D2D, Lulu, Ko-fi, and Leanpub. Official evidence says it does not support IQ/SY — the test confirms or overturns that.

**Steps (10 minutes):**
1. Visit `paypal.com/iq` — expect a redirect to the US homepage (no Iraq market site).
2. Visit `paypal.com/sy` — expect a 404 (no Syria market site).
3. Attempt signup with the KRG address — expect CAPTCHA/JS gating that blocks verification (PayPal's own country list is JS/CAPTCHA-gated and could not be verified live).
4. Cross-check Patreon's official PayPal-payout country list — Iraq and Syria are absent (MENA list: EG, JO, KW, SA, AE, etc.).

**Expected-negative evidence (citable):** PayPal's own country-worldwide list has no Iraq and no Syria (Middle East tab: BH/IL/JO/KW/OM/QA/SA/AE/YE) [https://www.paypal.com/us/webapps/mpp/country-worldwide, Playwright capture 2026-08-12]; `paypal.com/iq` redirects to the US homepage and `paypal.com/sy` 404s [https://www.paypal.com/iq/webapps/mpp/home, https://www.paypal.com/sy/webapps/mpp/home, 2026-08-12]; Patreon's official PayPal-payout country list excludes both [https://support.patreon.com/hc/en-us/articles/29467737603981-Paypal-supported-countries, 2026-08-12].

**Expected outcomes:**

| Outcome | Consequence for the matrix |
|---------|----------------------------|
| **Signup opens with the KRG address** | Lulu PayPal rail, Ko-fi PayPal leg, D2D PayPal payout open → Lulu (11), Ko-fi (16), D2D (5) move up |
| **Blocked (expected)** | Lulu routes via check (quarterly, $20 min); Ko-fi and Leanpub remain blocked at the rail (sheets 12, 16); D2D falls back to Payoneer (Test A) |

### Record results here

- [ ] Date of Test A (Payoneer): ____________
- [ ] Outcome of Test A (opens / refused / needs more info): ____________
- [ ] Consequence for the matrix: ____________
- [ ] Date of Test B (PayPal): ____________
- [ ] Outcome of Test B (opens / blocked): ____________
- [ ] Consequence for the matrix: ____________

---

## 4. Closing verdict

> **The gate is money movement, not nationality.**

A Syrian national residing in KRG is not OFAC-blocked by nationality or residence (comprehensive Syria sanctions revoked 2025-07-01; Iraq not sanctioned since 2010). What decides the open set of platforms is whether money can move: Stripe ❌ and PayPal ❌ per official evidence; Payoneer 🔶 and Wise 🔶 are the unverified hinges; KDP check-by-mail and Lulu/D2D checks ⚠️ technically exist as fallbacks; bank EFT depends on the KRG bank accepting SWIFT (step 0, user-side). One margin fact applies to every US-market sale: **30% US withholding on US-sourced royalties** — no US–Iraq and no US–Syria income tax treaty exists, so the rate is 30% regardless of which country is written on the W-8BEN (details and the tax-residence recommendation in 06). [https://www.irs.gov/instructions/iw8ben, https://www.irs.gov/businesses/international-businesses/united-states-income-tax-treaties-a-to-z, https://kdp.amazon.com/en_US/help/topic/G201274750, 2026-08-12]
