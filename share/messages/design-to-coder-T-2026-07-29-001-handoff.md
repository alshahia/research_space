# Handoff: design to coder

**Task id:** T-2026-07-29-001  
**Date:** 2026-07-29  
**Modes executed:** `SYSTEMIZE` pre-flight documentation  
**Scope tier:** S / one-pager equivalent  
**Status:** DONE

## Artifacts to read

1. `share/design/T-2026-07-29-001/brief.md` — canonical visual, typography, layout, motion, accessibility, performance, and cultural-fit grammar.
2. `share/design/T-2026-07-29-001/tokens.json` — machine-readable token values.
3. `share/design/T-2026-07-29-001/00_brief.md` — scope and discovery decisions.
4. `share/design/T-2026-07-29-001/99_handoff.md` — usage contract and validation evidence.

## How to use

Use the brief's dot-separated token names in every final build-guide, do/don't, template, and conversion document. Map library-specific values to the shared grammar; do not replace the grammar with defaults copied from a library or the scraped conversation.

Every animated-website path must include reduced-motion behavior, transform/opacity and concurrency limits, logical RTL/LTR direction, multilingual font checks, and content-visible-without-animation behavior. Deviations require the `ponytail: ...` comment defined in the brief.

## Must not do

1. Do not invent token values or names.
2. Do not cite the raw scrape as authoritative technical evidence.
3. Do not write examples that omit reduced motion, locale direction, or performance constraints.

## Open questions

None blocking. Product-specific brand, fonts, haptics, voice motion, and measured device budgets are out of scope.

## Self-critique

Validated in `share/design/T-2026-07-29-001/99_handoff.md`.

STATUS: DONE
