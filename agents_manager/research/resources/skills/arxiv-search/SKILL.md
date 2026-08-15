---
name: arxiv-search
description: Search arXiv for academic preprints via webfetch on the public API. Returns XML Atom feed with title, authors, abstract, arxiv-id, pdf-link.
allowed-tools: Read, Bash (read-only), grep, glob, webfetch
triggers: arxiv, arXiv, preprint, academic paper, cs paper, physics paper, math paper, find papers on, literature search
preamble-tier: 0
version: 0.1.0
---

# arxiv-search

## When to use

- The task asks for academic / scientific / technical literature.
- Topic is CS, physics, math, statistics, quantitative biology, or quantitative finance.
- Need preprints (not peer-reviewed) or recent work that may not be on publisher sites yet.
- Looking for arxiv-id, abstract, authors, or pdf link.

Do not use for biomedical topics (use `pubmed-search`). Do not use for general web search (use webfetch on DuckDuckGo HTML or Jina Reader).

## How to use

1. Build the query URL with proper URL-encoding.
2. webfetch the URL.
3. Parse the Atom XML feed.
4. Extract per entry: title, authors, summary (abstract), arxiv-id, pdf-link.

The endpoint is public, no API key needed. Returns XML, not JSON. Stay under 1 req/sec to be polite.

## Recipes

### Recipe 1: Simple keyword search

```
http://export.arxiv.org/api/query?search_query=all:<query>&start=0&max_results=20&sortBy=relevance&sortOrder=descending
```

Replace `<query>` with URL-encoded keywords. Example for "retrieval augmented generation":

```
http://export.arxiv.org/api/query?search_query=all:retrieval+augmented+generation&start=0&max_results=20&sortBy=relevance&sortOrder=descending
```

### Recipe 2: Field-scoped search

Search a specific field. `ti:` = title, `au:` = author, `abs:` = abstract, `cat:` = category.

```
http://export.arxiv.org/api/query?search_query=ti:transformer+attention+variants&start=0&max_results=15&sortBy=submittedDate&sortOrder=descending
```

### Recipe 3: Category filter

Limit to a specific arxiv category. `cs.AI` = AI, `cs.CL` = computation and language, `cs.LG` = machine learning.

```
http://export.arxiv.org/api/query?search_query=cat:cs.AI+AND+all:reasoning&start=0&max_results=10&sortBy=relevance&sortOrder=descending
```

### Recipe 4: Author search

```
http://export.arxiv.org/api/query?search_query=au:Yann+LeCun&start=0&max_results=15&sortBy=submittedDate&sortOrder=descending
```

### Parsing the Atom XML

Each result is an `<entry>` block. Key fields:

- `<entry><id>` contains the arxiv-id (example: `http://arxiv.org/abs/2312.12345v1`).
- `<entry><title>` is the paper title.
- `<entry><author><name>` is one author per block.
- `<entry><summary>` is the abstract.
- `<entry><link href="http://arxiv.org/pdf/...">` is the PDF link.

Grep these patterns against the webfetch output to extract. Example: `grep -oP '(?<=<id>)[^<]+' <output>` to get all arxiv-ids.

## Citations / sources

- [S1] arXiv API user manual - http://export.arxiv.org/api_query_help.html - access date 2026-08-13
- [S2] arXiv API base endpoint - http://export.arxiv.org - access date 2026-08-13

## Self-critique

- arXiv has no API key but does have a soft rate limit. Bulk fetches over hundreds of queries may get throttled. If you need many queries, batch them slowly.
- The API returns Atom XML, not JSON. Grepping is the fastest parse. For complex extractions, an XML parser is cleaner.
- arXiv is English-only. No French / German / Arabic papers indexed. Do not use for non-English research topics.
- Preprints are not peer-reviewed. Mark every claim as `[preprint, not peer-reviewed]` if downstream synthesis treats it as authoritative.
- If webfetch returns a 503 or empty body, retry once. If still empty, surface the empty result in the reference table rather than guessing.
