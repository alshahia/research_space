---
name: research-ar
description: Arabic-aware research synthesis. Bilingual output, RTL markdown conventions, Arabic source preference, Arabic citation format.
allowed-tools: Read, Write, Edit, grep, glob, webfetch
triggers: arabic, AR, بالعربية, RTL, kuwait, iraq, saudi, uae, gulf, middle east, MENA, shamela, noon, hindawi, kitab, yasoob, فصحى
preamble-tier: 0
version: 0.1.0
---

# research-ar

## When to use

- The user task involves Arabic content (Gulf / MENA markets, Arabic-first sources, RTL outputs).
- The user writes in Arabic or mixes Arabic and English.
- The deliverable needs a bilingual EN/AR presentation.
- The topic references Arabic sources (Shamela, Noon, Hindawi, Kitab, Yasoob).

Skip this skill entirely if the task is English-only with no Arabic touchpoint. The English research skills (`arxiv-search`, `pubmed-search`, etc.) apply as usual.

## How to use

Three switches:

1. **Locale switch** - Arabic when the source is Arabic, English when the source is English, bilingual when mixed.
2. **Source preference** - for Arabic synthesis, prefer Arabic sources first.
3. **Output direction** - RTL for Arabic content, LTR for English, clear boundaries when mixing.

## Recipes

### Recipe 1: Bilingual section template

For each major section, write EN prose first, then AR prose second. Use Modern Standard Arabic (فصحى) for AR. Keep `[Sn]` markers parallel across both languages.

```markdown
## Section title (EN)

English prose here with [S1][S2] citations.

## عنوان القسم (AR)

النص العربي هنا مع نفس الاستشهادات [S1][S2].
```

### Recipe 2: RTL markdown conventions

- Tables: right-align text in Arabic tables. Use `---:` for right-align columns.
- Blockquotes: prefix with `> ` per markdown standard; the renderer handles RTL when the content is Arabic.
- Inline code: keep LTR even within RTL prose (code is direction-neutral).
- Numbers: use Western Arabic digits (0–9) by default; switch to Eastern Arabic digits (٠-٩) only if the user requests.
- Headings: direction follows content; do NOT add `dir="rtl"` manually in markdown.

For HTML output (if downstream): wrap Arabic blocks in `<div dir="rtl" lang="ar">`.

### Recipe 3: Arabic citation format

Inline: `[S1]` (same as English). The reference table row for an Arabic source:

```markdown
| [S1] | العنوان - المؤلف - المصدر - السنة - URL | academic | <url> | 2026-08-13 |
```

### Recipe 4: Arabic source preference

For Gulf/MENA topics, search Arabic sources first:

- **Shamela** - `https://shamela.ws/` - classical Arabic texts, religious literature, heritage.
- **Noon** - `https://www.noon.com/` - Gulf e-commerce product data, retail, pricing.
- **Hindawi** - `https://www.hindawi.org/` - Arabic academic publishing.
- **Kitab** - `https://www.kitab.org/` - Arabic metadata aggregator (books, authors).
- **Yasoob** - `https://yasoob.github.io/` - Python Arabic tutorials, programming in Arabic.

Example: for "Arabic book market 2026", search Hindawi and Kitab before falling back to general webfetch.

### Recipe 5: Translating technical terms

When translating to Arabic, use Modern Standard Arabic equivalents where they exist; transliterate where they do not:

- "machine learning" → "تعلم الآلة"
- "neural network" → "الشبكة العصبية"
- "transformer" → "المحوّل" (transliteration acceptable)
- "API" → keep as "API" (universal acronym)

Keep a glossary note at the bottom of the file if the same technical term appears 5+ times.

### Recipe 6: Mixed-script handling

When the source mixes Arabic and English (common in Gulf tech writing):

- Preserve the source's mixed style - do not normalize.
- Cite each source as it appears.
- Note the mixed-style in the reference table row's notes column.

## Citations / sources

- [S1] Shamela - https://shamela.ws/ - access date 2026-08-13
- [S2] Noon - https://www.noon.com/ - access date 2026-08-13
- [S3] Hindawi - https://www.hindawi.org/ - access date 2026-08-13
- [S4] Kitab - https://www.kitab.org/ - access date 2026-08-13
- [S5] Yasoob - https://yasoob.github.io/ - access date 2026-08-13
- [S6] Reference Arabic research output: `research_doc/kotobee_publishing/06_arabic_market_deepdive.md` (read-only) - internal - access date 2026-08-13
- [S7] MDN RTL reference - https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir - access date 2026-08-13

## Self-critique

- Modern Standard Arabic is not Gulf dialect. If the audience expects dialect (Iraqi, Kuwaiti, Saudi), surface the choice and ask the user.
- Transliteration of technical terms varies by region. "transformer" may be "المحوّل" in MSA, "ترانسفورمر" in colloquial. Pick one and stick with it for the document.
- Arabic sources are often paywalled or require registration. If a source returns a paywall, fall back to abstract / snippet only.
- RTL tables in markdown render inconsistently across viewers. Always right-align Arabic columns with `---:` for predictable display.
- Arabic content quality is the hardest part of this skill. The bar matches the user's prior `research_doc/kotobee_publishing/06_arabic_market_deepdive.md`. If the AR section is shorter or thinner than the EN section, flag in `## Self-critique` rather than ship it.
