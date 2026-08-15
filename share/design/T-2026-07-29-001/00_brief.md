# Design Discovery Brief

**Task id:** T-2026-07-29-001  
**Date:** 2026-07-29  
**Dispatch:** Pre-flight motion grammar for the animated-website research dossier

## Restated task

Define the visual, typographic, layout, motion, accessibility, performance, and cultural-fit grammar that downstream research-dossier authors and agents will use consistently. The output is documentation, not an application or a site implementation.

## Discovery answers

1. **Medium:** Web-responsive documentation covering mobile, tablet, desktop, and 4K website contexts; no screen mockups are requested.
2. **Audience:** Research dossier authors and downstream agent authors, especially `am-coder` producing the final documents.
3. **Constraints:** Framework-agnostic; WCAG 2.2 AA baseline; light and dark themes; LTR, RTL, mixed-direction, and CJK-ready guidance; no application code; treat `resources/animated_website_raw_research.txt` as evidence rather than authority; motion must degrade safely and stay compositor-friendly.
4. **Artifact set:** Canonical design brief plus a machine-readable token sheet and handoff pointers.
5. **Mode set:** `SYSTEMIZE` (pre-flight documentation only: visual and motion grammar).
6. **Scope tier:** S / one-pager equivalent; one canonical dossier-wide system, no screens.
7. **Success criteria:** Downstream documents can reference named color, typography, spacing, breakpoint, and motion tokens without inventing values; all examples apply the same choreography, reduced-motion mapping, performance limits, and locale rules.
8. **Existing-system scan:** No. This task defines a framework-agnostic grammar rather than selecting a UI library, component system, or animation engine.

## Assumptions locked by dispatch

- English is the source language, but the guidance must remain valid for RTL scripts, mixed-direction content, and CJK text.
- Motion is purposeful feedback or narrative guidance, never a substitute for information architecture.
- Exact implementation techniques belong to the downstream build guide; this brief defines behavior and constraints only.

## Open questions

None required to complete this preflight. Product-specific choices such as brand palette, licensed fonts, haptics, sound, and 3D asset budgets remain intentionally outside this dossier-wide grammar.
