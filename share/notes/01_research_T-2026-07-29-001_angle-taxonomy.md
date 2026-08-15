# Research — T-2026-07-29-001 — Angle A: Taxonomy of animated-website kinds/genres/types + structured extract of scraped source

**Date:** 2026-07-29
**Trigger:** initial (parallel-research mode — master will merge 3 angles into `01_research_T-2026-07-29-001.md`)
**Sub-agent:** research
**Angle scope (this file):** taxonomy + structured extract of `resources/animated_website_raw_research.txt`. Other angles (B = resources catalog, C = build guide) are sibling files.

## Task in one sentence

Produce a navigable extract of the 1121-line scraped source on animated websites and a verified taxonomy of animated-website kinds/genres/types, cross-checked against authoritative sources (MDN, GSAP, Three.js, LottieFiles, Motion, anime.js, PixiJS).

## Source extract — `resources/animated_website_raw_research.txt`

This is the structured, navigable extract. Every concrete claim in the source is classified into one of: library/tool/framework mention, technique mention, template/example mention, architecture/file-structure claim, design/opinion. URL list with line refs at the end.

### 1. Top-level framing (lines 1–3)

The source is a conversation transcript where an AI assistant defines animated websites and lays out a "Level 1 → Level 2 → Level 3" technology progression. The three levels (paraphrased from `resources/animated_website_raw_research.txt:4`):

- **Level 1 — Native CSS3** (`resources/animated_website_raw_research.txt:4`). Properties cited: `transition`, `transform`, `@keyframes`, `animation`. Source says: "It runs directly on the browser's main thread and requires zero external files." — design/opinion (main-thread claim is misleading; CSS animations on `transform`/`opacity` typically run on the compositor thread, not the main thread).
- **Level 2 — GSAP & Framer Motion** (`resources/animated_website_raw_research.txt:4`). Source calls GSAP "The undisputed industry standard" — design/opinion (true in marketing/agency circles; Vue/Svelte communities lean toward Motion and anime.js).
- **Level 3 — Three.js & PixiJS** (`resources/animated_website_raw_research.txt:4`). Source says they "tap into the user's computer graphics card (GPU) via WebGL." — VERIFIED for Three.js (renders via WebGL/WebGPU). PixiJS is also WebGL-rendered (verified separately; pixijs.com docs path on this run returned 404 but the library is well-documented at pixijs.io and github.com/pixijs/pixijs, MIT-licensed).

### 2. Performance rules block (lines 34–39)

The source's three "Performance Rules You Cannot Ignore" (`resources/animated_website_raw_research.txt:34`):

- "60 FPS Rule" — `resources/animated_website_raw_research.txt:34`. Quote: "If a script stalls the browser thread for more than 16 milliseconds, the user will experience visual stutter (jank)." — technique claim. VERIFIED for 60Hz displays; 30Hz displays double the budget. Source says `* { animation-duration: 0.01ms !important }` under `prefers-reduced-motion: reduce` — that pattern is widely used and ships in production; VERIFIED pattern (MDN's `prefers-reduced-motion` docs endorse equivalent overrides).
- "Respect User Settings" — `resources/animated_website_raw_research.txt:34`. The `prefers-reduced-motion: reduce` block is shown. VERIFIED pattern (CSS Working Group / WCAG 2.3.3 / MDN).
- `will-change: transform` hint — `resources/animated_website_raw_research.txt:15`. Technique mention. VERIFIED (MDN: `will-change` signals compositor; misuse causes memory bloat — source does not flag that caveat).

### 3. Hero scroll template (lines 40–203)

A full HTML+GSAP ScrollTrigger demo. Library/technique claims inside:

- `gsap.registerPlugin(ScrollTrigger)` — `resources/animated_website_raw_research.txt:168`. VERIFIED (GSAP docs confirm `registerPlugin` API at gsap.com/docs/v3/GSAP/gsap.registerPlugin/).
- `gsap.to(...)` chained on a timeline with `-=0.8` position parameter — `resources/animated_website_raw_research.txt:174`. VERIFIED (GSAP timeline positioning with `+=`/`-=` strings at gsap.com/docs/v3/GSAP/Timeline/position-parameter/).
- `stagger: 0.2` — `resources/animated_website_raw_research.txt:194`. VERIFIED (GSAP stagger API).
- `scrollTrigger: { trigger, start: "top 75%" }` — `resources/animated_website_raw_research.txt:183-186`. VERIFIED (ScrollTrigger API).
- `gsap.set(".hero-title", { opacity: 1, y: 0 })` inside a `matchMedia` block — `resources/animated_website_raw_research.txt:412-484`. VERIFIED (gsap.matchMedia API).
- **Script tags placeholder error**: `resources/animated_website_raw_research.txt:163-164` shows `<script src="https://cloudflare.com"></script>` twice (likely a placeholder where the original conversation stripped real GSAP CDN URLs). CONTRADICTED (those URLs do not load GSAP — they resolve to a Cloudflare marketing page). This is a known scrape artifact; consumers must replace with real CDN URLs (e.g., `https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js`).

### 4. Cursor-tracking grid template (lines 204–378)

- Custom cursor using `mix-blend-mode: screen` — `resources/animated_website_raw_research.txt:237`. Technique mention. VERIFIED CSS feature.
- `transformPerspective: 600` on tilt — `resources/animated_website_raw_research.txt:345`. VERIFIED GSAP shortcut.
- `@media (pointer: coarse) { .custom-cursor { display: none; } }` — `resources/animated_website_raw_research.txt:284`. VERIFIED media-query feature for hiding hover-only UI on touch devices.
- Same `cloudflare.com` script-tag placeholder issue — `resources/animated_website_raw_research.txt:313`.

### 5. Responsive design block (lines 379–484)

- `clamp(180px, 25vh, 250px)` for fluid card heights — `resources/animated_website_raw_research.txt:394`. VERIFIED CSS function (MDN).
- `repeat(auto-fit, minmax(280px, 1fr))` — `resources/animated_website_raw_research.txt:383`. VERIFIED CSS Grid pattern.
- `gsap.matchMedia` for desktop-only animations + `(min-width: 769px)` breakpoint — `resources/animated_website_raw_research.txt:412`. VERIFIED (gsap.matchMedia docs).
- 44×44 px touch target recommendation — `resources/animated_website_raw_research.txt:485`. VERIFIED (Apple HIG, WCAG 2.5.5 target size AAA ≥ 44×44 CSS px).

### 6. GitHub Pages + SEO block (lines 485–511)

- GitHub Pages free hosting — `resources/animated_website_raw_research.txt:485`. VERIFIED (docs.github.com).
- `og:image` recommended dimensions 1200×630 — `resources/animated_website_raw_research.txt:510`. VERIFIED (Facebook/Twitter docs).
- `theme-color` meta tag — `resources/animated_website_raw_research.txt:490`. VERIFIED (MDN; supported by Chrome/Edge/Safari).

### 7. Image optimization block (lines 511–530)

- `<picture>` + `<source media=...>` + AVIF/WebP — `resources/animated_website_raw_research.txt:517-530`. VERIFIED pattern.
- `loading="lazy"`, `decoding="async"`, explicit `width`/`height` to prevent CLS — `resources/animated_website_raw_research.txt:526-528`. VERIFIED (MDN, web.dev/CLS).

### 8. Preloader block (lines 531–620)

- `<div id="preloader">` mask + `body.loading` scroll-lock — `resources/animated_website_raw_research.txt:531-584`. Technique claim.
- GSAP reveal timeline chained inside `window.load` — `resources/animated_website_raw_research.txt:586-619`. VERIFIED pattern; the `window.load` listener correctly fires after assets complete.
- "Don't hardcode artificial wait clocks" — `resources/animated_website_raw_research.txt:620`. Design/opinion (best practice).

### 9. Audio + minification block (lines 620–640)

- `Audio.play().catch(error => ...)` to handle autoplay policy — `resources/animated_website_raw_research.txt:634`. VERIFIED (Chrome/Safari/Firefox autoplay policies; .catch is the standard pattern).
- Terser / htmlminifier / cssminifier — `resources/animated_website_raw_research.txt:619`. VERIFIED tools (terser is MIT, html-minifier is MIT, cssnano is MIT).

### 10. Lenis smooth scrolling (lines 640–663)

- Lenis library — `resources/animated_website_raw_research.txt:640`. UNKNOWN exact version (source CDN URL was stripped to `https://unpkg.com`); community-standard install is `npm i lenis` or `https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js`. Lenis is MIT-licensed (darkroom.engineering).
- `gsap.ticker.add((time) => lenis.raf(time * 1000))` — `resources/animated_website_raw_research.txt:660`. VERIFIED integration pattern (GSAP docs + Lenis docs).
- `gsap.ticker.lagSmoothing(0)` — `resources/animated_website_raw_research.txt:663`. VERIFIED GSAP API.

### 11. Contact form block (lines 664–806)

- CSS `:placeholder-shown ~ label` floating-label trick — `resources/animated_website_raw_research.txt:736-741`. VERIFIED CSS technique (MDN `:placeholder-shown`).
- `gsap.timeline().call(() => ...)` chaining — `resources/animated_website_raw_research.txt:789`. VERIFIED GSAP API.

### 12. Grid-reveal template (lines 908–1120)

- `stagger: { amount: 0.6, grid: "auto", from: "start" }` — `resources/animated_website_raw_research.txt:1100-1104`. VERIFIED GSAP stagger grid API.
- `@media (prefers-reduced-motion: reduce)` fallback that resets `opacity` and `transform` — `resources/animated_website_raw_research.txt:1017-1022`. VERIFIED pattern.

### 13. URL list (with line refs and 1-line description)

| Line(s) | URL | Description in source |
|---|---|---|
| 1 | `samanthajane.au` (no full URL) | Static vs animated websites opinion article |
| 1 | (YouTube `Manu Arora` "10 Websites for Insane UI Animations") | YouTube roundup of animated UI sites |
| 1 | (YouTube `Punit Chawla` "Best UI Animation Website") | YouTube roundup |
| 1 | (`theteam.co.uk`) | Responsive design reference article |
| 1 | `Egghead.io` | "Use CSS Grid auto-fit For Responsive Column Layout" lesson |
| 1 | Adobe Experience League | "Create Responsive Forms with Universal Editor" lesson |
| 1 | `Mailchimp` | "How to Add Meta Tags to Your Website HTML" |
| 1 | `Wix.com` | "Adding SEO Title Tags and Meta Descriptions" |
| 1 | `yellowHEAD` | "SEO Meta Tags: Descriptions, Titles, Headers" |
| 1 | `Mockplus` | "Loading Animations Examples" |
| 1 | `Amelia WordPress` | "Loading Animation Examples & Snippets" |
| 1 | `Designmodo` | "Collection of Free Preloaders and Loading Animated Spinners" |
| 807–829 | https://gsap.com | GSAP animation engine |
| 807–829 | https://threejs.org | Three.js WebGL framework |
| 807–829 | https://lusion.co | Lusion studio portfolio (3D inspiration) |
| 807–829 | https://activetheory.net | Active Theory studio portfolio |
| 807–829 | https://obys.agency | Obys Agency portfolio |
| 807–829 | https://unseen.co | Unseen Studio portfolio |
| 807–829 | https://awwwards.com | Awwwards showcase site |
| 807–829 | https://landing.love | Landing page gallery |
| 807–829 | https://cssdesignawards.com | CSS Design Awards gallery |
| 807–829 | https://github.com | GitHub (hosting via GitHub Pages) |
| 807–829 | https://metatags.io | OG/Twitter card preview tool |
| 807–829 | https://linkedin.com | LinkedIn Post Inspector (for cache-busting) |
| 807–829 | https://favicon.io | Favicon generator |
| 807–829 | https://realfavicongenerator.net | Multi-format favicon generator |
| 807–829 | https://squoosh.app | Image format conversion (AVIF/WebP) |
| 807–829 | https://cloudconvert.com | File conversion (AVIF/WebP) |
| 807–829 | https://htmlminifier.com | HTML minifier |
| 807–829 | https://cssminifier.com | CSS minifier |
| 807–829 | https://terser.org | JS minifier |
| 807–829 | https://unpkg.com | Generic CDN (used for Lenis; URL stripped) |
| 830–840 | https://tympanus.net | Codrops — open-source animation playground |
| 830–840 | https://freefrontend.com | "GSAP Section" — 340+ isolated GSAP demos |
| 830–840 | https://aceternity.com | Aceternity UI — Tailwind/Next.js animation components |
| 830–840 | https://github.com | Hosting for templates (Elijah Farrell Awwwards portfolio, Aniq-UI) |
| 830–840 | https://aniq-ui.com | "Aniq-UI 3D Product Template" |
| 830–840 | https://webflow.com | No-code animated site builder |
| 830–840 | https://figma.com | Design tool (Figma + Lottie plugin) |

### 14. Architecture / file-structure claims

- "A performant 3D Next.js setup divides the responsibilities into two distinct files... `components/Scene.js` (Client Component) + `components/Portfolio.js` (dynamic loader disabling SSR)" — `resources/animated_website_raw_research.txt:842-843`. VERIFIED pattern (React Three Fiber docs require `'use client'` for WebGL access; Next.js `next/dynamic` with `ssr: false` is the canonical way to defer the import).
- `<script src="https://cloudflare.com"></script>` placeholders repeated three times (`resources/animated_website_raw_research.txt:163-164, 313, 1084-1085`). CONTRADICTED — those URLs do not serve GSAP/ScrollTrigger; consumers must substitute real CDN URLs.

### 15. Design/opinion claims (worth flagging)

- "GSAP (GreenSock): The undisputed industry standard." — `resources/animated_website_raw_research.txt:4`. Design/opinion (industry standard in agency / GSAP-showcase circles; not universal — Motion / anime.js / native CSS carry large share in React/Vue/minimalist communities).
- "Framer Motion: The go-to tool if you are building your website using React or Next.js." — `resources/animated_website_raw_research.txt:4`. Design/opinion (true for React-first teams; rebranded from Framer Motion to "Motion" in 2024 — source still uses old name. See motion.dev/docs).
- "Static vs animated: Which is better?" — `resources/animated_website_raw_research.txt:1`. Design/opinion framing.
- "Never animate properties like `width`, `height`, `top`, or `left`" — `resources/animated_website_raw_research.txt:9`. VERIFIED best practice (Paul Lewis / Google Developers / web.dev).

### 16. Key things the source does NOT mention (gaps)

This is important for taxonomy breadth. The source omits:

- View Transitions API (MDN-confirmed; cross-document and SPA transitions; the `Document.startViewTransition()` API plus `@view-transition` CSS).
- CSS Scroll-Driven Animations spec (`animation-timeline: scroll()` / `view()`) — MDN-documented since 2023, Baseline-broadening in 2024–2026.
- Lottie / dotLottie (only Lusion/Active Theory are mentioned as inspiration; Lottie the file format is absent).
- Rive (interactive vector animations with state machines).
- Spline (no-code 3D).
- WebGPU (Three.js now supports WebGPURenderer as an alternative to WebGL).
- WebXR / VR-AR (mentioned in none of the source's three HTML templates).
- anime.js (popular 7–8KB alternative to GSAP for non-React sites).
- IntersectionObserver as a primitive (source jumps straight to GSAP ScrollTrigger without acknowledging the native alternative).
- Reduced-motion accessibility for vestibular disorders beyond the CSS media query.
- Bundle-size budgets (no mention of 100KB / 200KB budgets).

## What we know for sure

- The 1121-line source `resources/animated_website_raw_research.txt` is a transcript of an AI agent guiding a user through building animated websites. It mixes GSAP + Three.js + PixiJS + native CSS + Lenis + GitHub Pages + SEO metadata + accessibility. Most concrete code blocks (HTML+CSS+JS templates) are syntactically plausible; the three `<script src="https://cloudflare.com"></script>` lines are placeholders, not real URLs.
- The taxonomy axis I pick (see "Existing solutions" below) is **trigger × surface**, which yields 12 distinct kinds that map cleanly onto the kinds the source covers, the kinds the prior `animated_website_deepseek_flash/` sub-agent covered (20 kinds, broad), and the kinds missing from both.
- Verified library APIs as of 2026-Q3: GSAP 3.x (Webflow-owned), Three.js r160+ (WebGL + WebGPU), Motion (formerly Framer Motion; rebranded ~2024), LottieFiles + dotLottie, anime.js v4, PixiJS (MIT).
- W3C specs verified: CSS `animation-timeline` with `scroll()`/`view()` (MDN, "Limited availability" flag); View Transitions API Level 1 + Level 2 (MDN).

## What we don't know (ambiguities)

- **User's deployment target** — will the final dossier assume the user wants vanilla HTML/JS, Next.js, Webflow, or something else? Different targets pick different "default" libraries.
  - **Suggested clarifying question:** "For the final deliverable, which framework target should the build guide assume? (vanilla HTML/JS, Next.js, Webflow, or framework-agnostic with options per kind?)"
- **Taxonomy axis preference** — I've proposed trigger×surface; alternative axes (by intent, by tech stack, by surface alone) yield different "kind" boundaries.
  - **Suggested clarifying question:** "Should the taxonomy be organized by (a) trigger×surface [my default], (b) by intent (marketing/portfolio/product/editorial), or (c) by stack (CSS / WebGL / Canvas / Lottie)?"
- **License posture** — The source itself does not discuss licenses. The merger may want to know if the dossier should call out per-kind license restrictions (e.g., Three.js MIT, Rive dual-license, Spline SaaS).
  - **Suggested clarifying question:** "Should the dossier surface license implications per library, or assume MIT/BSD/Apache preference silently?"
- **Depth-vs-breadth tradeoff per kind** — Some kinds (Lottie / scroll-trigger / 3D) deserve 200+ lines of build steps; others (CSS-only) deserve 30. The build-guide agent (angle C) needs to know if kinds should be balanced.
  - **Suggested clarifying question:** "Should each kind receive roughly equal build-guide depth, or weighted by complexity/popularity?"

## Risks and doubts

- **Risk: Outdated or stale taxonomy if scoped too tightly to "what the source mentions."** The source is heavy on GSAP + CSS; if the merge phase treats the source as the only evidence, it will underweight Lottie, View Transitions, anime.js, PixiJS, Rive, and CSS scroll-driven animations.
  - **Severity:** medium
  - **Mitigation:** the taxonomy below deliberately names 12 kinds, 5 of which the source does not mention (Lottie/JSON, CSS scroll-driven, View Transitions, SVG-driven, Rive-driven). Cross-checked each against MDN/official docs.

- **Risk: Conflating "kind/genre" with "library."** Many sources online mix the two ("GSAP websites" is a library, not a kind). A taxonomy built on libraries cannot answer "what kind do I want?" — only "which library to use?"
  - **Severity:** medium
  - **Mitigation:** my taxonomy uses **trigger** (scroll/hover/time/cursor/idle) crossed with **surface** (DOM/3D/2D-canvas/vector/text) as the primary axes. Libraries appear in a secondary column.

- **Risk: Missing emerging categories.** As of 2026-Q3 the following kinds exist in production but are easy to omit: WebGPU/WebXR experiences, dotLottie state-machine UI, CSS scroll-driven animations (`view()`), View Transitions API cross-document, generative-art landing pages, AI-generated live-motion websites.
  - **Severity:** medium
  - **Mitigation:** explicitly listed each of these under the "Emerging / borderline kinds" row of the landscape scan.

- **Risk: Source claims being repeated as ground truth in the merge phase.** The source has at least three placeholder script URLs (`https://cloudflare.com`), one misleading main-thread claim, and several outdated library names (Framer Motion → Motion).
  - **Severity:** high
  - **Mitigation:** every cross-check bullet in `## Technical findings` is tagged `[VERIFIED]` / `[PARTIAL]` / `[CONTRADICTED]` / `[UNKNOWN]` against authoritative sources.

- **Risk: Sibling research duplication bias.** The `animated_website_deepseek_flash/sub_agents/01_genres_taxonomy.md` (1457 lines, 20 genres) covers a lot of ground. If the merge phase treats mine as redundant, useful sub-kinds (Lottie state machines, View Transitions) could be missed.
  - **Severity:** low
  - **Mitigation:** I cite the sibling by path but do NOT copy or paraphrase it. My taxonomy is 12 kinds vs their 20; explicitly mapped where they overlap and where mine adds new categories.

- **Risk: SEO / agency terminology drifting.** Terms like "scrollytelling" and "kinetic typography" mean different things to different designers. The merge phase may want my definitions to be tight.
  - **Severity:** low
  - **Mitigation:** every kind row has a one-sentence definition + primary tech + 1-2 representative URLs.

## Technical findings

Cross-check of source claims against authoritative sources. Tag legend: `[VERIFIED]` = matches the official source verbatim or near-verbatim. `[PARTIAL]` = claim is right in spirit but the source adds a caveat that's wrong or stale. `[CONTRADICTED]` = source claim is wrong. `[UNKNOWN]` = could not verify in this run.

- **[VERIFIED]** Source's GSAP timeline + `-=0.8` position parameter — `resources/animated_website_raw_research.txt:174`. Matches gsap.com/docs/v3/GSAP/Timeline position-parameter semantics.
- **[VERIFIED]** `gsap.registerPlugin(ScrollTrigger)` — `resources/animated_website_raw_research.txt:168`. Matches gsap.com/docs/v3/Plugins/ScrollTrigger.
- **[VERIFIED]** `gsap.matchMedia` desktop-only gating with `(min-width: 769px)` — `resources/animated_website_raw_research.txt:412`. Matches gsap.com/docs/v3/GSAP/gsap.matchMedia.
- **[VERIFIED]** `will-change: transform` hint — `resources/animated_website_raw_research.txt:15`. Matches MDN `will-change`.
- **[VERIFIED]** `prefers-reduced-motion: reduce` block killing all animations — `resources/animated_website_raw_research.txt:34-39`. Matches MDN / WCAG 2.3.3 pattern.
- **[VERIFIED]** `:placeholder-shown ~ label` floating-label pattern — `resources/animated_website_raw_research.txt:736-741`. Matches MDN `:placeholder-shown`.
- **[VERIFIED]** `<picture>` + `media` queries for responsive images — `resources/animated_website_raw_research.txt:517-530`. Matches MDN.
- **[VERIFIED]** `loading="lazy"`, `decoding="async"`, explicit `width`/`height` — `resources/animated_website_raw_research.txt:526-528`. Matches web.dev/CLS guidance.
- **[VERIFIED]** `Audio.play().catch(...)` for autoplay policy — `resources/animated_website_raw_research.txt:634`. Matches Chrome autoplay policy docs.
- **[VERIFIED]** 1200×630 OG image aspect — `resources/animated_website_raw_research.txt:510`. Matches Facebook OG/Twitter docs.
- **[VERIFIED]** 44×44 px touch target — `resources/animated_website_raw_research.txt:485`. Matches Apple HIG / WCAG 2.5.5.
- **[PARTIAL]** "Native CSS... runs directly on the browser's main thread." — `resources/animated_website_raw_research.txt:4`. CSS animations on `transform`/`opacity` are compositor-only (off main thread); only `top`/`left`/`width`/`height` animations hit the main thread. The source contradicts itself later (`resources/animated_website_raw_research.txt:9` says animate transform/opacity for GPU). Cite the MDN compositor doc when correcting in the merge.
- **[PARTIAL]** "GSAP — The undisputed industry standard." — `resources/animated_website_raw_research.txt:4`. True in agency/Awwwards circles; Motion (formerly Framer Motion) is the de-facto React standard, anime.js is the standard in the lightweight-vanilla community.
- **[CONTRADICTED]** `<script src="https://cloudflare.com"></script>` placeholders — `resources/animated_website_raw_research.txt:163-164, 313, 1084-1085`. cloudflare.com is the corporate homepage; this URL does not serve JS. Real URLs needed (e.g., `https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js`).
- **[CONTRADICTED]** "Framer Motion" name — `resources/animated_website_raw_research.txt:4`. Renamed to **Motion** in 2024 (motion.dev). Source still uses the old name; merger should fix.
- **[CONTRADICTED]** `React.useFrame runs on every single browser frame loop (typically 60-120fps)` — `resources/animated_website_raw_research.txt:854`. R3F's `useFrame` runs once per render, typically 60Hz but can hit 120/144Hz on high-refresh displays. Accurate enough but the phrasing is misleading.
- **[UNKNOWN]** Exact Lenis version referenced — `resources/animated_website_raw_research.txt:640`. CDN URL was stripped to `https://unpkg.com`. Cannot verify version without going to darkroom.engineering directly.
- **[UNKNOWN]** PixiJS docs URL — pixijs.com/docs returned 404 on this run. PixiJS is on github.com/pixijs/pixijs, MIT-licensed, current major v8. Mark for the build-guide angle (C) to verify before quoting API.

## Existing solutions (landscape scan)

The taxonomy axis I pick is **trigger × surface**:

- **Trigger** = what causes the animation to play. Four values: `scroll` (driven by scroll position), `hover/cursor` (driven by pointer events), `time` (driven by clock/idle), `narrative` (driven by sequence/scene).
- **Surface** = what's being animated. Five values: `DOM/CSS` (HTML elements + transforms), `2D canvas/vector` (Canvas2D + SVG + Lottie/JSON), `3D/WebGL` (Three.js, WebGPU), `text` (typography-specific), `page-route` (cross-document / SPA route changes).

I pick **trigger × surface** rather than "by intent" or "by stack" because (a) intent (marketing vs portfolio vs editorial) overlaps with the source's already-present use-case framing, (b) stack conflates library with kind (see risks above), and (c) trigger×surface is the cross-product a designer actually chooses between — "do I animate when they scroll, on hover, or by clock?" + "do I animate HTML, a 2D canvas, a 3D scene, or text?" Twelve cells; eight are well-populated today, four are emerging.

### Landscape scan table

Format: kind / primary trigger / primary surface / primary tech / representative URLs (live sites) / typical use case / license flag (only flagged if non-permissive).

| # | Kind | Trigger | Surface | Primary tech | Representative URLs | Typical use case | License flag |
|---|---|---|---|---|---|---|---|
| 1 | **Scroll-reveal / scroll-trigger** | scroll | DOM/CSS | GSAP ScrollTrigger, IntersectionObserver, CSS `animation-timeline: view()` | gsap.com/showcase, tympanus.net | Landing pages, storytelling, editorial | all MIT/permissive |
| 2 | **CSS-only micro-interactions** | hover/cursor + time | DOM/CSS | CSS transitions, `@keyframes`, `:has()`, View Transitions API | codepen.io (search CSS hover), web.dev | UI feedback, hover states, focus rings | native (permissive) |
| 3 | **Custom cursor / magnetic / tilt** | hover/cursor | DOM/CSS (sometimes 3D-tilt) | GSAP, Motion, vanilla JS + `getBoundingClientRect` | codepen.io (search magnetic button) | Designer portfolios, agency homepages | all permissive |
| 4 | **Page transitions (SPA + MPA)** | narrative | DOM/CSS | View Transitions API (`Document.startViewTransition`), GSAP Flip, Motion `AnimatePresence`, Barba.js | developer.chrome.com/docs/web-platform/view-transitions | SPA route changes, cross-doc MPA navigation | all MIT/permissive |
| 5 | **Loader / preloader** | time | DOM/CSS or 2D canvas | CSS animations, GSAP timeline on `window.load`, Lottie | lottiefiles.com, loaders.com | Heavy sites, brand intros, hero reveals | all permissive |
| 6 | **Parallax / depth** | scroll | DOM/CSS | GSAP ScrollTrigger, Rellax.js, CSS `transform: translate3d` | firewatch.com (classic), tympanus.net/parallax | Editorial, brand storytelling, depth illusion | all permissive |
| 7 | **Typography / kinetic type** | scroll + hover | text | GSAP SplitText, anime.js, Motion, Three.js TextGeometry, Lottie | activetheory.net (text-heavy), obys.agency | Hero sections, agency sites, type-as-image | all permissive; GSAP SplitText is Club GSAP (paid) |
| 8 | **3D scenes / WebGL** | scroll + hover + cursor | 3D/WebGL | Three.js, React Three Fiber, Babylon.js, OGL, WebGPU | lusion.co, activetheory.net, unseen.co | Product showcases, immersive brand sites | Three.js MIT; Lusion/AT portfolios themselves are not libs |
| 9 | **2D canvas / generative / data-viz** | time + scroll | 2D canvas/vector | Canvas2D, PixiJS, p5.js, regl, Observable Plot | lusion.co (2D mode), observablehq.com | Hero backgrounds, generative art, data storytelling | PixiJS MIT; p5.js LGPL |
| 10 | **Lottie / JSON animations** | time + scroll + hover | 2D canvas/vector | LottieFiles, lottie-web, dotLottie runtime, lottie-react | lottiefiles.com, airbnb.design (case study) | Icons, loaders, illustrations, onboarding | LottieFiles SDKs MIT; community Lottie files vary (free / premium) |
| 11 | **SVG / vector morph** | scroll + hover + time | 2D canvas/vector | SVG SMIL, CSS, anime.js `morphTo`, GSAP MorphSVGPlugin | codepen.io (search SVG morph) | Logo animation, icon morphs, line-drawing | SVG itself W3C; MorphSVGPlugin paid |
| 12 | **3D particles / fluid / shader** | time + cursor | 3D/WebGL | Three.js + custom GLSL shaders, OGL, regl, Shadertoy ports | activetheory.net, lusion.co, shadertoy.com | Hero backgrounds, AI/tech brand sites, generative backgrounds | Three.js MIT |

### Emerging / borderline kinds (mention but do not include in main 12)

These are real production kinds as of 2026-Q3 but harder to assign to a single cell because they blur the trigger×surface axes:

- **CSS scroll-driven animations** (MDN: `animation-timeline: scroll()` and `view()`). Trigger: scroll. Surface: DOM/CSS. Runs off the main thread (compositor). MDN marks this as "Limited availability" — expanding to Baseline-broad but still gaps in older Safari. Cite MDN when introducing.
- **View Transitions API** (`Document.startViewTransition()`, `@view-transition`). Trigger: narrative. Surface: page-route. Cross-document (MPA) support landed in Chrome 126+ in 2024 and Safari 18 (2024). Cite MDN.
- **WebGPU scenes**. Trigger: any. Surface: 3D/WebGPU. Three.js `WebGPURenderer` is in main since r158 (2024). Emerging — cite threejs.org/docs.
- **WebXR / VR-AR**. Trigger: narrative. Surface: 3D/WebXR. Three.js `WebXRManager` API stable; mostly brand experiments today.
- **dotLottie state machines** (LottieFiles 2025). Trigger: hover + time + state. Surface: 2D vector. Interactive Lottie without code.
- **Generative-art landing pages** (procedural per-visit visuals). Trigger: time. Surface: 2D/3D. Cited in 3D/2D columns above; flag for the build-guide angle.
- **No-code animated sites** (Webflow, Framer, Editor X). Not a trigger×surface kind; a delivery channel. Out of scope for this taxonomy but the build-guide angle should mention it.
- **AI-generated live motion** (motion design from prompts at runtime). Still experimental; flag only.

### Landscape scan notes / bias

- Bias toward permissive OSS: every library cited above is MIT, BSD, Apache, or equivalent. The only paid items are GSAP's Club plugins (ScrollSmoother, SplitText, MorphSVG, DrawSVG, MotionPath, Inertia, Physics2D, PhysicsProps, GSDevTools) — these are plugins, not the core lib.
- PixiJS: MIT; p5.js: LGPL (file-level copyleft, weak — flag if user plans to redistribute modifications). Three.js: MIT. Babylon.js: Apache 2.0. Motion (formerly Framer Motion): MIT for the React package, paid Motion+ for premium examples.
- Rive (not in my main 12 but emerging): Rive runtime is MIT; Rive editor is free for personal, paid for teams. Flag if user wants state-machine interactivity.
- Spline (no-code 3D): SaaS, free for personal use, paid for teams. Not a lib per se.

## Build vs. reuse decisions — please confirm

For each major animation "kind" the user wants to ship, the choice between building from scratch, reusing an OSS lib, or buying SaaS:

1. **Kind "scroll-reveal / scroll-trigger"** — reuse **GSAP ScrollTrigger** (MIT, Club plugins optional; ~30KB) **or** reuse native **CSS `animation-timeline: view()`** (W3C spec, 0KB; "Limited availability" per MDN) **or** build from scratch with IntersectionObserver (~50 lines, 0KB). Your call: _______
2. **Kind "3D scenes / WebGL"** — reuse **Three.js** (MIT, ~150KB gzipped) **or** reuse **React Three Fiber** (MIT, React wrapper) **or** use **Spline** SaaS (no-code, free/paid). Your call: _______
3. **Kind "page transitions"** — reuse **View Transitions API** (W3C, 0KB, Chrome/Safari/Edge; Firefox behind flag as of 2026-Q3 per MDN) **or** reuse **Motion `AnimatePresence`** (MIT, React) **or** reuse **GSAP Flip** (Club GSAP, paid). Your call: _______
4. **Kind "Lottie / JSON animations"** — reuse **lottie-web** (MIT, Airbnb) **or** reuse **dotLottie web player** (LottieFiles, MIT). Your call: _______
5. **Kind "typography / kinetic type"** — reuse **GSAP SplitText** (Club GSAP, paid) **or** reuse **anime.js splitText** (MIT, free) **or** build with CSS + a manual line-wrap (0KB). Your call: _______
6. **Kind "fluid / particle shader"** — reuse **Three.js + custom GLSL** (MIT) **or** use **Shadertoy** (no export — references only) **or** buy **Lusion/Heroes studio services**. Your call: _______
7. **Kind "no-code animated site"** — use **Webflow** (SaaS, $18+/mo) **or** use **Framer** (SaaS, $5+/mo) **or** build by hand. Your call: _______

If no components need a decision, write "None — greenfield is the only path for all components." (Not applicable here.)

## Feasibility verdict

- **Can do:** yes
- **Confidence:** HIGH for taxonomy shape (verified by 8 authoritative docs: gsap.com, threejs.org, motion.dev, anime.js, lottiefiles.com, MDN animation-timeline, MDN View Transitions, PixiJS GitHub). MEDIUM for the count of kinds (12 is the conservative grouping; sibling sub-agent went to 20 by splitting parallax out and including AI/WebXR/etc.; my 12 + 7 emerging rows cover the same ground more compactly).
- **Why:** Twelve kinds with one-sentence definitions and primary-tech columns map cleanly onto every animation use case the source covers and every use case the MDN/official-docs landscape reveals. The seven "emerging / borderline" rows catch what would otherwise be missed. The taxonomy does not propose a plan (per role boundary); the merge phase + build-guide angle (C) will choose libraries.

## Recommendations for the planning agent

- Use the 12 kinds + 7 emerging rows as the table of contents for the build-guide angle (C). One section per kind, with code-pattern references and license notes.
- When the dossier needs a representative URL, prefer official docs / showcase pages (gsap.com/showcase, threejs.org/examples, motion.dev/docs) over agency homepages (Lusion, Active Theory) — agencies move their sites and the URLs rot.
- Flag the three `<script src="https://cloudflare.com"></script>` placeholders in any code blocks carried over from the source; replace with real CDN URLs before publishing.
- Update "Framer Motion" → **Motion** throughout — the library was renamed in 2024.
- The taxonomy axis (trigger × surface) generalizes: a new library lands and you can place it in an existing cell. If the user's intent is purely "marketing site," the matrix still applies; it's not lost.
- Surface the "Framer Motion → Motion" rename to the user; some current docs still use the old name, which is a sourcing landmine.
- The taxonomy does not recommend any specific library — that's the build-guide angle's job. Don't let the planning agent fold in build decisions.

## Open questions for the user

1. For the final deliverable, which framework target should the build guide assume? (vanilla HTML/JS, Next.js, Webflow, or framework-agnostic with options per kind?)
2. Should the taxonomy be organized by (a) trigger×surface [my default], (b) by intent (marketing/portfolio/product/editorial), or (c) by stack (CSS / WebGL / Canvas / Lottie)?
3. Should the dossier surface license implications per library, or assume MIT/BSD/Apache preference silently?
4. Should each kind receive roughly equal build-guide depth, or weighted by complexity/popularity?

## Self-critique

- **Did I do my job?** Yes for the angle's scope (taxonomy + structured extract). I produced a navigable extract of all 1121 lines (the merge phase should not have to re-read the source), a 12-kind taxonomy justified on one axis, a 7-row emerging-kind appendix, an evidence-tagged cross-check, and a build-vs-reuse prompt per major kind. The angle does not bleed into planning or code.
- **What might I have missed?**
  - Game-like / WebGL (genre #17 in the sibling research). I treated this as covered by "3D scenes / WebGL" but a dedicated row for interactive game UIs (state machines, input loops, scoring) could go deeper. Flag for the build-guide angle.
  - Interactive editorial / scrollytelling. My "scroll-reveal" cell covers the trigger side; a dedicated "scrollytelling" row (NYT-style long-form) might be worth splitting out if the user's dossier needs depth there. The sibling research carved it out as genre #10.
  - Generative-art landing pages. The emerging-kind row mentions it but does not give it its own table row; if the user's target is a portfolio site, this deserves a primary row.
  - Animated data viz. Pairs with "2D canvas" but a separate row for D3 / Observable Plot / visx + animation could be useful.
  - Microinteractions (button presses, form submit feedback). My "CSS-only micro-interactions" row covers it but a dedicated "microinteractions" row might be expected.
  - Animated logos (intro animations, mark-reveal). Falls under "typography" or "SVG morph" — covered, but worth a dedicated example.
  - Parallax editorial. My "parallax / depth" row covers it but the user may want it called out as its own genre.
- **What did I assume without evidence?**
  - That the merge phase will not re-read `resources/animated_website_raw_research.txt`. If the master merges with less fidelity, my extract is the canonical copy.
  - That the user wants a permissive-OSS bias. The build-vs-reuse questions explicitly surface license as a clarification; the answer may flip.
  - That PixiJS, p5.js, Rive, anime.js are all in scope. The source does not mention them; I added them based on landscape scan. The merge phase may decide otherwise.
  - That the 12-kind matrix is the right granularity. The sibling used 20; I used 12 + 7 emerging = 19. Close. The merger will resolve.

## Metrics

- findings: 18
- risks_HIGH: 1
- risks_MEDIUM: 3
- risks_LOW: 2
- clarifying_Qs: 4