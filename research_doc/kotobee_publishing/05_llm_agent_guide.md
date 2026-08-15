# Kotobee Publishing Dossier — 05: LLM / Agent Guide

**Sources:** `share/notes/01_research_T-2026-08-12-001_angle-strategy.md` (§E LLM/agent-guide source material: E1 value points, E2 AI landscape prices, E3 caveats, E4 machine-readable structure; §C tactics 4–5 BookTok/email; §B step 5 cover + layout), `share/notes/01_research_T-2026-08-12-001_angle-genres.md` (ranked table typical prices; storefront observed prices $1–$15, typical $3–$10; technical finding 22 — WordsRated hub), `share/notes/01_research_T-2026-08-12-001.md` (canonical ranked genre table — 10 rows; canonical risks 2–4 — the 3 verify-at-signup items), and user decisions (auto-answers Q6 hybrid — this guide must include Arabic copy-paste prompts). Access date for every URL: **2026-08-12**.

This chapter is the machine-readable guide (structure per angle-strategy §E4): decision tables (genre × layout × interactivity × channels × price band), three checklists, a copy-paste prompt bank with Arabic prompts, a failure-mode registry, success metrics against WordsRated baselines, and the AI caveats. Every URL, price, and figure is carried verbatim from the research files; nothing below was invented during the build.

## 1. Decision tables — genre × layout × interactivity × channels × price band

One row per ranked genre (10 rows; ranking = Kotobee-fit 60% / global demand 40%, canonical table). Layout guidance comes from §B step 5 and Kotobee's fixed-vs-reflowable rule (fixed for children's/illustrated/design-critical pages; reflowable for novels/short fiction/mobile reading; Kotobee allows mixing both layouts in one ebook). Price bands come from the observed storefront range **$1–$15, typical $3–$10** (angle-genres storefront snapshot 2026-08-12) plus each genre's typical price in the ranking table; the $15–50+ B2B band is the institutional exception.

| Rank | Genre | Layout | Interactivity level | Channels | Price band |
|---|---|---|---|---|---|
| 1 | Interactive educational / how-to / workbooks | Mixed (reflowable core + fixed worksheets) | High — quizzes (MCQ/true-false/short-answer/drag-drop), question banks, answer persistence | Kotobee storefront (biggest category: 3,589 titles) | $9–$15+ (MySQL Expert $15, workbook bundles) |
| 2 | Children's interactive picture books (+audiobook) | Fixed (illustration-driven; mixing allowed) | High — audio narration, animations | Kotobee storefront + narrated audiobooks | $2.99–$9.99 |
| 3 | Self-help / wellness / lifestyle (interactive) | Reflowable (+ optional mixed section) | Medium — quizzes, checklists, audio/video | Kotobee storefront + KDP export | $5–$10 (Time Mastery $9, Hidden Weight of Stress $10) |
| 4 | Corporate training / professional (B2B) | Mixed + SCORM/LTI/xAPI packaging | High — SCORM widgets, scoring into gradebooks | Kotobee Cloud/Library + LMS/SCORM | $15–$50+ (course/workbook model) |
| 5 | Romance | Reflowable (plain EPUB for retail) | None on storefront (Kotobee = production tool) | Amazon/Kobo (build in Kotobee; Arabic = clean/family lane) | $0.99–$4.99 (ebook launch pricing) |
| 6 | Mystery & thriller | Reflowable | Low–medium (+ audiobook lane via Narrator) | Amazon + Kotobee storefront + audiobook | $2.99–$6.99 (DARKNESS $3, The Circle $6) |
| 7 | Fantasy & sci-fi | Reflowable | Low–medium (+ audiobook lane via Narrator) | Amazon + Kotobee storefront + audiobook | $2.99–$5.99 |
| 8 | Faith / religious (Arabic/Islamic) | Reflowable, RTL-first | Medium — RTL interactive ebooks, audio | Kotobee storefront + Arabic ecosystem | $3–$9 |
| 9 | Biography & memoir | Mixed (reflowable core + photo/video media) | Medium — photos, video | Kotobee storefront (interactivity elevates personal stories) | $5–$10 (Between Worlds $10, From Copper Wires $9) |
| 10 | Travel guides (interactive) | Mixed (maps, video, audio) | Medium-high — maps, video, audio | Kotobee storefront (near-zero competition: 44 titles) | $5–$9 |

Rules of thumb behind the table: interactivity lives only inside Kotobee channels (Kotobee Reader/Cloud/Library apps) — plain EPUB exports are non-interactive and go to retail DRM-free; fiction exports (rows 5–7) therefore strip to reflowable plain EPUB for Amazon/Kobo; Arabic/religious (row 8) and children's (row 2) are where Kotobee's RTL + fixed-layout + narration advantages beat KDP.

## 2. Checklists

### 2.1 Pre-publish checklist (10 items)

1. **Cover meets spec** — 1600×2400 px preferred, min width 1400 px, JPG/JPEG/GIF/PNG (support article 8000120127).
2. **EPUB validated** — test-upload before the real one; if rejected, re-export from Kotobee Author (see failure registry #1).
3. **Kotobee Books ToS read** — including the AI-content clause; the terms link exists (books.kotobee.com/terms) but the content was unread in research — **verify at signup** (open item #2).
4. **Payout keys: sandbox → live** — test with Stripe/PayPal sandbox keys first, then switch to live publishable + secret keys (support article 8000111089).
5. **AI-disclosure fields** — fill where the platform asks; Amazon KDP requires AI-generated-content disclosure, other platforms differ — keep a disclosure checklist.
6. **Metadata complete** — title, author, language, category, description (150–200 words, hook first), tags.
7. **Price set in USD** — $0 as lead magnet, else store-like pricing in the observed typical $3–$10 band (you keep 100% of the price on Kotobee Books).
8. **Interactivity tested** — quizzes/questions/media verified inside Kotobee Reader; plain-EPUB export checked for retail channels (interactivity is Kotobee-only).
9. **"100% royalties" re-checked** — the support article says "for a limited time"; plan economics at a 70% benchmark so the case survives — **verify at signup** (open item #3).
10. **Paid-tier prices confirmed if upgrading** — the Author pricing page is JS-rendered; confirm current prices — **verify at signup** (open item #1).

### 2.2 Launch checklist (5 items)

1. **Publish now** — 3-step flow: upload EPUB/KPUB → metadata + price → publish; publication is instant.
2. **Share the live link** — from books.kotobee.com on every channel, email list first (they pre-ordered).
3. **Start BookTok cadence** — 3–5 posts/week from day one; 3-second hook; POV content (playbook: blog what-is-booktok).
4. **Lead-magnet mechanics** — if priced $0/free: enable promo codes (Library) and capture emails.
5. **Snapshot the terms** — record metadata, price, and the royalty terms at publish time (the 100% promo is time-limited; keep the record for later comparison).

### 2.3 Post-launch checklist (7 items)

1. **Ask for reviews** — request at the book's end and link readers to the review page.
2. **BookTok cadence: 3–5 posts/week** — hashtag pyramid (broad → genre → your own tag); 80% community / 20% promo.
3. **Reviewer outreach** — Goodreads author program (~45M users/mo — claim yours), BookTok creators, genre bloggers.
4. **Email list** — sneak peeks and discounts; don't oversend; DMARC hygiene.
5. **Track vs baselines** — copies, royalties, list growth against the metrics table in section 5 (WordsRated 2026-03-27).
6. **Iterate metadata/SEO** — title, description, tags, category, ad keywords from what the analytics show.
7. **Plan the next title or export** — KDP/Apple/Google/Kobo if not already done; multi-channel is the mitigation for storefront discoverability.

## 3. Copy-paste prompt bank

One fully-written prompt per E1 value point (outline, chapter draft, editor pass, cover, blurb, SEO/metadata, Arabic translation, Arabic BookTok) plus a failure-diagnosis prompt — 9 prompts total, 2 of them in/for Arabic. **Every prompt is self-contained copy-paste text with zero placeholders** — each is written against a concrete worked example (a 10–20k-word how-to ebook, "The Author's Email List: Grow Readers Before Your Launch"); swap in your own book's subject, title, and word counts and the structure and rules stay identical. All prompts are AI drafts — human fact-check everything per section 6.

**Prompt 1 — Outline (E1.2):**

```
You are an experienced nonfiction book coach. The author is writing a 10,000- to
20,000-word how-to ebook titled "The Author's Email List: Grow Readers Before Your
Launch". Produce a chapter-by-chapter outline with exactly 6 chapters plus an
introduction and a conclusion. For each chapter give: working title, goal in one
sentence, 3 to 5 bullet points of content, and one short practical exercise or
checklist the reader can complete. Sequence the chapters so each builds on the
previous one, and make sure the outline can be drafted in 2 to 4 weeks at about
1,000 words per day. End with a one-paragraph premise statement the author can
paste into the chapter-drafting prompt.
```

**Prompt 2 — Chapter draft (E1.3):**

```
You are a professional ghostwriter. Draft the chapter titled "Chapter 3: Ten Lead
Magnets That Actually Convert" for the ebook "The Author's Email List: Grow
Readers Before Your Launch". Target length 1,500 to 2,000 words. Open with a hook
that states the reader's problem in one sentence. Then cover: why free content
converts better than discounts for authors, ten specific lead-magnet ideas with a
one-line pitch each, and the single most common mistake authors make. Write in
plain, warm, active voice. Keep paragraphs under 6 lines. End the chapter with a
3-item checklist. Do not add facts, statistics, or claims you cannot verify —
mark anything uncertain with the word VERIFY so the human editor can fact-check
it.
```

**Prompt 3 — Editor pass (E1.4):**

```
You are a ruthless developmental editor. Review the attached draft manuscript and
return a structured editorial report: (1) three strengths, quoted with exact
sentences; (2) the ten highest-impact fixes ranked by priority, each with the
exact sentence, the problem, and a corrected rewrite; (3) a consistency check
across the whole manuscript — character names, timelines, terminology, and tone;
(4) a readability assessment with the three longest sentences flagged; (5) a list
of every claim or statistic that must be human-verified before publishing. Do not
rewrite the whole book — edit surgically and preserve the author's voice.
```

**Prompt 4 — Cover prompt, Midjourney format (E1.5):**

```
Midjourney prompt for a self-help ebook cover titled "The Author's Email List".
Subject: a cozy author's desk at golden hour, an open laptop with a softly glowing
envelope icon, a steaming cup of coffee, warm minimalist illustration style.
Palette: deep teal background, warm amber accents, clean cream space at the top
for the title. Composition: title space in the top third, author name space in
the bottom third, subject centered — flat-lay feel. Do not render any text in the
image (AI image tools cannot spell reliably; add typography later in Canva or
Kotobee Author). Aspect ratio 2:3 — this matches the Kotobee Books cover spec
exactly (1600x2400 px, min width 1400 px); generate at 2:3, upscale, then export
as JPG/PNG at 1600x2400.
```

**Prompt 5 — Blurb / description, 150–200 words hook-first (E1.6):**

```
Write the sales description for the ebook "The Author's Email List: Grow Readers
Before Your Launch". Exactly 150 to 200 words. Rule 1: the first sentence must be
a hook — a bold claim or a problem statement the reader recognizes, no
throat-clearing. Rule 2: then state the promise and the three core outcomes, each
on its own short line. Rule 3: close with a soft call to action and a credibility
line, for example "written for authors who publish their first book in weeks, not
years". Weave in keywords an author would search for: email list, book launch,
readers, newsletter, lead magnet. Plain language; no hype words such as
"revolutionary". Output only the description.
```

**Prompt 6 — SEO / metadata (E1.7):**

```
You are a book-marketing metadata specialist. For the ebook "The Author's Email
List: Grow Readers Before Your Launch" produce: (1) 3 title variants (the current
title plus 2 alternatives) each under 60 characters, strongest keyword first;
(2) 5 subtitle options under 90 characters; (3) 10 tags/categories mixing genre
terms (writing, publishing, self-publishing, email marketing, book marketing,
author business) with niche terms; (4) a 150- to 200-word description that starts
with the hook sentence; (5) 5 Amazon-style keyword phrases. For every suggestion
explain in one line why it fits the Kotobee Books metadata fields (title, author,
language, category, description, tags).
```

**Prompt 7 — Arabic translation, EN→AR (E1.8):**

```
Translate the attached English text into Modern Standard Arabic for the Arabic
edition of the ebook. Requirements: (1) register: formal but warm Modern Standard
Arabic, suitable for self-development and how-to content aimed at MENA readers —
never colloquial; (2) RTL-safe phrasing: keep numbers, dates, currency, URLs, and
Latin terms such as EPUB and PDF as Latin glyphs, placed correctly in the
right-to-left flow, and avoid sentence constructions that break under RTL
rendering; (3) terminology consistency: maintain a glossary of key terms and use
the same Arabic term for the same English term throughout; (4) cultural fit:
soften or rephrase any example that assumes a Western-only context without
changing the meaning, and flag religious-sensitive references for human review
instead of censoring them yourself; (5) output the translation followed by a
short note listing: terms you were unsure about, sentences that needed
restructuring for Arabic, and anything a native-speaker human reviewer must
double-check. Mandatory human review before publishing — this is an AI draft, not
a final translation.
```

**Prompt 8 — Arabic BookTok caption + hashtag pyramid (E1.6, Arabic):**

```
You are an Arabic BookTok content strategist. Write a TikTok caption and a
30-second video hook script for the Arabic edition of a self-development ebook.
The caption must: (1) open with a 3-second hook — a question that stops the
scroll, in clean conversational Modern Standard Arabic that works across the
MENA region; (2) state one concrete takeaway from the book; (3) end with a soft
call to action (follow, save, or comment). Then build the hashtag pyramid:
3 broad hashtags (e.g. #كتاب #تطوير_الذات #قراءة), 3 genre hashtags
(e.g. #تنمية_بشرية #كتب_عربية #ملخص_كتاب), and 1 personal tag built from the
author's pen name (e.g. #اكتب_انشر for an author brand about writing and
publishing). Rule: 80% of posts are community value, 20% promotion. Keep the
whole caption under 220 characters so it fits the TikTok caption box. Output:
the caption, the hook line, the hashtag pyramid, and a one-line note on when to
post.
```

**Prompt 9 — Failure diagnosis (E4.4):**

```
You are a publishing technical-support assistant for Kotobee Books authors. The
user reports a problem with publishing or exporting an ebook. Do not ask
questions — apply this diagnostic order: (1) match the symptom against the known
failure modes (EPUB rejected at upload; Stripe keys invalid; interactivity lost
in a retail export; file over the 500 MB cap; 30-book account cap) and state the
most likely cause; (2) give the exact fix in numbered steps: re-export EPUB from
Kotobee Author for validation failures; switch Stripe keys between sandbox and
live mode for payout errors; export plain EPUB for retail or MOBI only for Kindle
Fire when scripting is stripped; compress images, audio, and video to fit 500 MB;
contact Kotobee support to request more than 30 books; (3) if the symptom matches
no known mode, say so honestly and give the next diagnostic step (re-export with
validation, check the file size, re-read the error message) instead of guessing.
Keep the answer under 200 words and end with a one-line summary of what was wrong
and what the user should do first.
```

## 4. Failure-mode registry

| Symptom | Cause | Fix |
|---|---|---|
| EPUB rejected at upload | Export/validation failure | Re-export the EPUB from Kotobee Author and validate before uploading |
| Stripe keys invalid at payout setup | Sandbox vs live mode mismatch | Use live publishable + secret keys for production; sandbox keys only for testing (support article 8000111089) |
| Interactivity lost in exported retail file | Kindle strips scripting from the format | Export MOBI only for Kindle Fire devices; otherwise export a plain EPUB for retail; keep the interactive version on Kotobee channels |
| File over the 500 MB cap | Large media embedded | Compress images/audio/video before building the ebook |
| 30-book cap reached | Account limit | Contact Kotobee support to request more than 30 books |

## 5. Success metrics vs WordsRated baselines

All baselines from WordsRated (pages updated 2026-03-27; source: https://wordsrated.com/self-published-book-sales-statistics/ — some underlying data vintages are 2017–2023). Targets are self-set guides, not sourced claims.

| Metric | WordsRated baseline | What success looks like (self-set) |
|---|---|---|
| Copies sold | ~250 average per self-published ebook; 90% of self-published books sell <100 copies | >100 copies in year one (top decile); 250+ by book two |
| Royalties | Avg ebook price $4.16; avg self-published author income ~$1,000/yr | Kotobee Books pays 100% of the price — $4.16 per sale at the average price vs $1.46–$2.91 on KDP's 35–70% tiers; first-year royalties of $500+, trending toward the $1,000 average |
| List growth | No WordsRated baseline exists (flagged — not invented) | Self-set: 1,000 email subscribers by end of year one; 20%+ open rate |

## 6. AI caveats (E3)

- **Accuracy:** Kotobee's own AI-tools roundup cites ~80% AI accuracy (via IGI Global) — always human fact-check, especially health, religious, and legal content.
- **Copyright:** AI-generated-content copyright is jurisdiction-dependent and evolving; the US Copyright Office requires human authorship for registration. The Kotobee Books ToS AI clause is unread — **verify at signup** (open item #2). This dossier asserts **no legal positions** — it provides checkpoints only; consult a lawyer for your jurisdiction.
- **Disclosure:** Amazon KDP requires AI-generated-content disclosure; other platforms differ — keep a disclosure checklist per platform.
- **Quality bar:** AI drafts are starting points; on a small storefront the differentiator is human-quality writing plus real interactivity — not the raw AI output.

## 7. Kotobee platform stance on AI

Kotobee's positioning embraces AI-assisted creation: Kotobee Author ships built-in AI tools (text generation, image generation, question generation, text-to-speech — Academy tutorial #32), and the Kotobee blog promotes AI writing tools (roundup "Best AI Writing Software in 2026", updated 2026-01-18). AI-assisted workflows are therefore consistent with the platform's positioning; disclosure, fact-checking, and human review remain the author's responsibility.
