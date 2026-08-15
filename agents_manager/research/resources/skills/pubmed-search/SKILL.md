---
name: pubmed-search
description: Search PubMed for biomedical / life-sciences literature via NCBI eUtils. Two-step: esearch returns IDs as JSON, efetch returns full records as XML.
allowed-tools: Read, Bash (read-only), grep, glob, webfetch
triggers: pubmed, PubMed, biomedical, clinical, drug, disease, medical, life sciences, pharmaceutical, trial, RCT, meta-analysis, MEDLINE
preamble-tier: 0
version: 0.1.0
---

# pubmed-search

## When to use

- The task asks for biomedical, clinical, pharmaceutical, or life-sciences literature.
- Topic is medicine, biology, genomics, epidemiology, public health, or pharmacology.
- Need peer-reviewed papers indexed by MEDLINE.
- Looking for PMID, abstract, MeSH terms, or full citation.

Do not use for general CS topics (use `arxiv-search`). Do not use for general web search.

## How to use

PubMed search is a two-step process:

1. **esearch** returns a list of PMIDs as JSON.
2. **efetch** returns full records for those PMIDs as XML.

Both endpoints are public, no API key needed. NCBI asks for polite use (≤3 req/sec without an API key).

## Recipes

### Recipe 1: Search and return IDs

```
https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=<query>&retmax=20&retmode=json
```

URL-encode the query. Example for "CRISPR cancer therapy":

```
https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=CRISPR+cancer+therapy&retmax=20&retmode=json
```

Returns JSON shaped like:

```json
{
  "esearchresult": {
    "count": "1234",
    "idlist": ["12345678", "23456789", "34567890"]
  }
}
```

### Recipe 2: Fetch full records

Take the `idlist` from step 1 and feed it into efetch as a comma-separated string:

```
https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=12345678,23456789&retmode=xml
```

Returns XML with one `<PubmedArticle>` per ID. Key fields:

- `<PMID>` is the PubMed ID.
- `<ArticleTitle>` is the title.
- `<AuthorList><Author><LastName>` + `<ForeName>` per author.
- `<Abstract><AbstractText>` is the abstract (may have multiple sections labeled BACKGROUND, METHODS, etc.).
- `<MeshHeading><DescriptorName>` for MeSH terms.

### Recipe 3: Field-scoped search

Use field tags. Common ones: `[Title]`, `[Author]`, `[Journal]`, `[MeSH Terms]`, `[Publication Date]`.

```
https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=aspirin%5BTitle%5D+AND+heart+attack%5BTitle%5D&retmax=10&retmode=json
```

### Recipe 4: Date range filter

```
https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=cancer+immunotherapy&mindate=2024/01/01&maxdate=2026/12/31&retmax=20&retmode=json
```

### Parsing

- For esearch, the response is JSON. Extract `idlist` directly.
- For efetch, the response is XML. Grep for `<PMID>`, `<ArticleTitle>`, `<AbstractText>` patterns. Each article block is delimited by `<PubmedArticle>` and `</PubmedArticle>`.

## Citations / sources

- [S1] NCBI eUtils documentation - https://www.ncbi.nlm.nih.gov/books/NBK25500/ - access date 2026-08-13
- [S2] PubMed help - https://pubmed.ncbi.nlm.nih.gov/help/ - access date 2026-08-13

## Self-critique

- Without an API key, NCBI asks for ≤3 req/sec. Heavy use without a key may get an HTTP 429. If you need a key, register at https://www.ncbi.nlm.nih.gov/account/settings/ (free).
- PubMed abstracts may use structured sections (BACKGROUND, METHODS, etc.). When extracting `<AbstractText>`, preserve the `Label` attribute to keep the structure.
- Some records have no abstract (marked "No abstract available"). Do not invent content; surface "abstract unavailable" in the citation row.
- MeSH terms are hierarchical. If a downstream synthesis uses MeSH as a topic tag, walk the tree via `<MeshHeadingList>`.
- For very recent papers (last few weeks), PubMed may not have full indexing yet. Fall back to the publisher page via `pdf-fetch` if the abstract is too sparse.
