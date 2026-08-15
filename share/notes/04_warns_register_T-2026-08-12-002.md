# WARN register — T-2026-08-12-002

Consolidated WARN items from Phase 4 review (2026-08-12). Only items needing coder/user action or signup verification. Format: `- <phase> — <severity> — <description> — <path:line>`

## Coder-action items

- Phase 4 — MEDIUM — Kotobee support article `8000111373` cited in 02 sheet 20 is missing from the 99 URL register (register rows 74–77 cover 8000120127/8000111089/8000130253 but not 8000111373); add a register row — `02_platform_matrix.md:293` ↔ `99_appendix_links.md:74-77`
- Phase 4 — LOW — 30%-margin-note exclusion rationale for Ream ("non-US domicile per research") is unsupported: research files document no Ream domicile; correct the rationale or drop the claim (note is additive beyond plan) — `02_platform_matrix.md` sheets 9–19
- Phase 4 — LOW — ★ (U+2605) used in 02/99 (verbatim from angle files) while chunk 3B removed its own ★ for rule 8; decide one policy (keep-verbatim vs strip) dossier-wide — `02_platform_matrix.md:34,83,87,304,398`; `99_appendix_links.md:33,105`
- Phase 4 — LOW — sheet 30 compresses Publish/Audience/Royalty/Payout labels onto one line; all present, formatting only — `02_platform_matrix.md:411`
- Phase 4 — LOW — register has no "Chapter 03" section (03 URLs traced via ch02 rows' "Used in"); add a one-line note — `99_appendix_links.md:13`
- Phase 4 — LOW — 00_README groups Ko-fi under "Stripe-rail platforms"; gate is PayPal-or-Stripe (outcome correct, label loose) — `00_README.md:14`

## User / signup-verification items (must re-verify)

- Phase 4 — HIGH — Test A: Payoneer registration with KRG address — the decisive test re-classifying ~60% of the matrix — `01_eligibility_and_rails.md:47-62`, `05_action_plan.md:34-38`
- Phase 4 — HIGH — Test B: PayPal signup probe (expected-negative, CAPTCHA/JS-gated) — `01_eligibility_and_rails.md:64-81`, `05_action_plan.md:40-44`
- Phase 4 — MEDIUM — Step 0: open KRG USD bank account accepting SWIFT; confirm Kobo EFT / PublishDrive / KDP-wire reach at account opening — `05_action_plan.md:11-26`
- Phase 4 — MEDIUM — Kotobee: "100% royalties" promo still active; ToS AI clause; paid-tier prices; eFinance availability — flag 11 — `02_platform_matrix.md:297`
- Phase 4 — MEDIUM — ACX payout-country/bank acceptance; Voices by INaudio royalty split + payout rails + Arabic audio acceptance — `02_platform_matrix.md:379,391`
- Phase 4 — MEDIUM — KDP: Iraqi-address signup + PSP-eligibility notice + T&C sanctions clause (redirect) — flags 4/10 — `99_appendix_links.md:192`
- Phase 4 — MEDIUM — Wise availability for Iraq (in-app check) — flag 3 — `99_appendix_links.md:191`
- Phase 4 — MEDIUM — Kobo EFT reach to Iraqi bank; Apple Bank Country dropdown content — flag 5 — `99_appendix_links.md:181-182`
- Phase 4 — MEDIUM — Arabic-channel royalty outreach (Rufoof/Abjjad/Neelwafurat/Storytel): send 03 templates 1–2; terms not public — flag 7 — `99_appendix_links.md:193`
- Phase 4 — LOW — Ko-fi Gold $8/mo (secondary source), Payhip pricing (400-blocked), PublishDrive plan prices (JS-gated): re-check from a neutral network — `02_platform_matrix.md:221,244`
- Phase 4 — LOW — Arabic email template variants: native-speaker pass before sending — `03_arabic_channels.md:151-300`
- Phase 4 — LOW — remaining 28-row verify-at-signup checklist: tick each during registration — `99_appendix_links.md:164-196`
