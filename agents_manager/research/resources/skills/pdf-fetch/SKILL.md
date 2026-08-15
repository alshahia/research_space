---
name: pdf-fetch
description: Fetch full-text PDFs or HTML articles when abstracts are insufficient. Three methods: Jina Reader proxy, Playwright headless browser, direct curl + pdftotext.
allowed-tools: Read, Bash (read-only + curl, pdftotext), grep, glob, webfetch, playwright_browser_navigate, playwright_browser_snapshot, playwright_browser_evaluate
triggers: full text, full paper, read the paper, fetch PDF, get the article, behind paywall, journal article, extract text
preamble-tier: 0
version: 0.1.0
---

# pdf-fetch

## When to use

- The abstract is not enough; you need the full text of a paper, report, or article.
- The source is a PDF file or a JS-heavy page that webfetch cannot parse cleanly.
- The user explicitly asked for the full content of a specific URL.

Do not use if the abstract suffices. Do not use for paywalled content unless the user has access (this skill does not bypass paywalls).

## How to use

Three methods, in order of preference:

1. **Jina Reader** - easiest, free, no key. Converts any URL to clean markdown.
2. **Playwright** - for JS-heavy pages or sites that block Jina. Requires the playwright MCP to be enabled.
3. **Direct fetch + parse** - `curl` the URL, then `pdftotext` to extract text. Last resort.

Pick the first method that works for the source. If method 1 returns garbage or empty, fall back to 2, then 3.

## Recipes

### Recipe 1: Jina Reader (default)

```
https://r.jina.ai/<url>
```

Example for an arxiv PDF:

```
https://r.jina.ai/https://arxiv.org/pdf/2312.12345
```

Returns clean markdown with the paper text. No API key, no rate limit issues for normal use. Returns markdown, easy to grep.

### Recipe 2: Playwright for JS-heavy pages

Use when the source needs JS execution (SPA, dynamic content). Sequence:

1. `playwright_browser_navigate(url=...)` - load the page.
2. `playwright_browser_snapshot()` - get the accessibility tree as text.
3. Optionally `playwright_browser_evaluate(...)` for specific DOM extraction.

Example for a JavaScript-rendered article page:

```
playwright_browser_navigate(url="https://example.com/article/123")
playwright_browser_snapshot()
```

### Recipe 3: Direct curl + pdftotext

```
curl -L -o /tmp/paper.pdf <pdf-url>
pdftotext /tmp/paper.pdf /tmp/paper.txt
```

Then read `/tmp/paper.txt`. Use this when Jina returns empty or garbled and Playwright is not available.

For HTML, use `lynx -dump` or `html2text`:

```
curl -L <html-url> | lynx -dump -stdin > /tmp/article.txt
```

### Recipe 4: arxiv abstract page via Jina

arxiv abstract pages (not PDFs) convert well via Jina:

```
https://r.jina.ai/https://arxiv.org/abs/2312.12345
```

Returns title, authors, abstract, comments, subjects in clean markdown.

### Recipe 5: GitHub README via Jina

For source code or library docs:

```
https://r.jina.ai/https://github.com/<owner>/<repo>
```

Or a specific file:

```
https://r.jina.ai/https://raw.githubusercontent.com/<owner>/<repo>/main/README.md
```

## Citations / sources

- [S1] Jina Reader - https://jina.ai/reader/ - access date 2026-08-13
- [S2] Playwright (environment-dependent; not part of default tools) - https://playwright.dev - access date 2026-08-13
- [S3] pdftotext (poppler-utils) - https://poppler.freedesktop.org/ - access date 2026-08-13

## Self-critique

- Jina Reader is third-party. If the upstream service is down, the recipe fails. Fall back to Recipe 3 (curl + pdftotext) in that case.
- Playwright availability is environment-dependent. If the playwright MCP is not enabled, this recipe fails. Document the fallback in the research output.
- PDFs with scanned images contain no extractable text. `pdftotext` returns empty. The skill cannot OCR; surface the limitation in the reference table row.
- Paywalled content: this skill does not bypass paywalls. If the URL returns a paywall, abort and surface "paywalled; abstract only" in the citation row.
- Some sites block scrapers via User-Agent. If Jina or curl return 403, try Playwright which presents a real browser UA.
- For very long PDFs (>100 pages), chunk the read. Do not paste the entire document into a research synthesis; extract the relevant section.
