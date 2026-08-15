# Design Handoff: Animated-Website Motion Grammar

**Task id:** T-2026-07-29-001  
**Date:** 2026-07-29  
**Modes executed:** `SYSTEMIZE` pre-flight documentation  
**Medium:** Web-responsive documentation  
**Audience:** Research dossier authors and `am-coder`  
**Scope tier:** S / one-pager equivalent  
**Next consumer:** `am-coder`, producing the final research dossier documents  
**Status:** DONE

## Artifacts

- `share/design/T-2026-07-29-001/00_brief.md` — discovery answers and locked scope.
- `share/design/T-2026-07-29-001/brief.md` — canonical human-readable visual and motion grammar.
- `share/design/T-2026-07-29-001/tokens.json` — machine-readable mirror of all named token values.
- `share/design/T-2026-07-29-001/99_handoff.md` — this usage contract and self-critique.

## How to use this handoff

Read `brief.md` before drafting the build guide, do/don't guidance, templates, or conversion playbook. Refer to tokens with their dot-separated names, such as `motion.duration.base`, `motion.easing.enter`, `motion.distance.md`, and `motion.delay.item`. Use `tokens.json` only as the parseable value mirror; `brief.md` remains authoritative for intent, choreography, accessibility, performance, and cultural-fit rules.

Map any implementation-specific engine or technique back to these tokens instead of publishing unbounded engine defaults. Every implementation path must include its reduced-motion fallback, compositor/property limit, concurrency limit, logical-direction behavior, and locale checks. If an exact value must differ, document it with the deviation format required by `brief.md`.

## Top 3 things the consumer must not do

1. Do not invent or silently rename duration, easing, distance, color, typography, spacing, layout, or breakpoint tokens.
2. Do not treat the scraped conversation as authoritative evidence for library capability, performance, accessibility, or production readiness.
3. Do not omit reduced-motion, RTL/multilingual, motion-sickness, audio, or performance constraints from a genre-specific guide.

## Open questions

None blocking. Brand-specific palettes, font licensing, native haptics, voice-driven motion, and product-specific device budgets remain outside this dossier-wide preflight.

## Sources consulted

- `agents_manager/design/resources/motion-spec-template.md`
- `agents_manager/design/resources/token-schema.md`
- `agents_manager/design/resources/multi-locale-checklist.md`
- `resources/animated_website_raw_research.txt` as evidence only

No external UI or animation library was selected or specified.

## Self-critique

- Discovery completed before production: yes; see `share/design/T-2026-07-29-001/00_brief.md:1`.
- Required brief sections present: yes; color starts at `brief.md:14`, typography at `brief.md:44`, layout at `brief.md:78`, motion at `brief.md:119`, accessibility at `brief.md:197`, performance at `brief.md:221`, checklists at `brief.md:234`, handoff contract at `brief.md:255`, and self-critique at `brief.md:279`.
- Human/machine specs match: yes; all 95 base token paths in `tokens.json` are named in `brief.md`, and the JSON parses successfully.
- Contrast checked: yes; required `ink`, `accent`, and meaningful `line` pairs exceed WCAG AA thresholds in both themes. Ratios are recorded in `brief.md`.
- Mockups/browser verification: not applicable; no visual mockup or implementation was requested or produced.
- RTL sample-screen verification: not applicable; no screens were produced. Logical-direction and cultural-fit requirements are explicit in the brief.
- Open questions surfaced rather than guessed: yes; non-blocking omissions are listed in the brief self-critique.
- WARN register entry: not required; no unresolved token, accessibility, or boundary violation was found.
- Strict separation: passed; no `src/**`, `app/**`, task tracker, design controller skill/rules, or `research_doc/animated_website_minimax_3/**` file was edited.

STATUS: DONE
