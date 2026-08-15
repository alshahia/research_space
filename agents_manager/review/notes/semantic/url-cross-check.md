# URL cross-check without a diff tool (doc-review technique)

For docs reviews with citation ground truth (research angle files), verify citation integrity **exhaustively** in one PowerShell pass - no sampling needed:

1. Extract URLs: `[regex]::Matches($text, 'https?://[^\s\)\]\}`\*]+')` - **must exclude backticks and asterisks** from the capture class or markdown code-spans/bold (`\`url\``, `**url**`) produce false "missing" hits (cost me one re-run on T-2026-08-12-001).
2. Normalize each URL: trim trailing `.,;:!?"')]}` + ellipsis `…`, then trim trailing `/`. Trailing-slash-insensitive comparison is the right fidelity standard (verbatim modulo trailing slash).
3. Set-compare three ways: chapters→appendix (every chapter URL registered), chapters→angle files (no invented URLs), appendix→chapters (extras = exactly the intentional ones: warning URLs, dead-table entries).
4. Report per-chapter counts + the missing/extras lists; the counts (e.g., 124/124/124, extras=2) are the report's citation-integrity evidence.

Result: full coverage with ~5 lines of proof, beats the plan's "sample 5 URLs per file" requirement. Gotchas: separator rows (`|---|`) don't match `^\| ` (pipe+space) - count table rows as pipe-lines minus 1 header only; `books.kotobee.com/library/…` ellipsis variants normalize to the registered `library/`.
