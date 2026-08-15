# Research — T-2026-07-29-001 — Angle C: Build playbook per kind + do/don't + conversion playbook

**Date:** 2026-07-29
**Trigger:** initial (parallel-research mode — master will merge 3 angles into `01_research_T-2026-07-29-001.md`)
**Sub-agent:** research
**Angle scope (this file):** per-kind human + LLM-facing build guide, do/don't tables, and 10-step normal→animated migration playbook. Sibling files cover taxonomy (angle A) and resources catalog (angle B). This file consumes both — kind coverage from A, stack choices from B.
**Authority for motion grammar:** `share/design/T-2026-07-29-001/brief.md` (motion tokens, durations, easings, distances, reduced-motion rules — must be referenced by every kind's Human-facing version).

---

## Task in one sentence

Produce an executable build playbook for animated websites: one section per kind (12 kinds, each with a Human-facing prose guide and a compact LLM/agent-facing prescriptive guide), a Use/Avoid decision table, a 10-step migration playbook for converting a normal site into an animated one, and a per-component build-vs-reuse Q block — all grounded in the source extract and verified against authoritative library docs.

---

## Source extract — techniques mentioned in scraped source

Every technique claim from `resources/animated_website_raw_research.txt`, with line refs and an authoritative-source verdict.

| # | Technique / claim | Source line | Source assertion | Authoritative verdict | Citation for verdict |
|---|---|---|---|---|---|
| 1 | Three-level tech progression (CSS → GSAP/Framer → Three.js/PixiJS) | `resources/animated_website_raw_research.txt:4` | "Level 1: Native CSS3… Level 2: GSAP & Framer Motion… Level 3: Three.js & PixiJS" | **[VERIFIED — but outdated label]** "Framer Motion" was renamed to **Motion** in 2024. The tier system itself is sound; GSAP plugins are now 100% free (angle B confirmed at gsap.com/pricing). | motion.dev/docs; gsap.com/pricing |
| 2 | "Native CSS… runs directly on the browser's main thread" | `resources/animated_website_raw_research.txt:4` | Same | **[CONTRADICTED]** CSS animations on `transform`/`opacity` are compositor-only (off main thread). Only `top`/`left`/`width`/`height` animations hit the main thread. The source contradicts itself later at `:9` ("Always animate transform and opacity"). | MDN — CSS animations on the compositor |
| 3 | 60 FPS rule; jank begins when frame work > 16 ms | `resources/animated_website_raw_research.txt:34` | "If a script stalls the browser thread for more than 16 milliseconds, the user will experience visual stutter" | **[VERIFIED]** for 60 Hz displays; 30 Hz displays double the budget; high-refresh (120/144 Hz) shrinks it. | web.dev — Rendering Performance |
| 4 | `prefers-reduced-motion: reduce` + `* { animation-duration: 0.01ms !important }` | `resources/animated_website_raw_research.txt:34-39` | "Always wrap massive, sweeping animations in a CSS media query that honors their system preference" | **[VERIFIED]** pattern (recommended in WCAG 2.3.3 and MDN). Authoritative guidance prefers targeting specific selectors, not `*`, to avoid breaking third-party widget animations. | MDN `prefers-reduced-motion`; WCAG 2.3.3 |
| 5 | `will-change: transform` hint | `resources/animated_website_raw_research.txt:15` | "Signals GPU optimization" | **[VERIFIED — but partial]** MDN confirms compositor hint; misuse causes memory bloat. Should be applied immediately before known animation, then removed. Source does not flag the caveat. | MDN `will-change` |
| 6 | GSAP `registerPlugin(ScrollTrigger)` | `resources/animated_website_raw_research.txt:168` | "Register the scroll plugin" | **[VERIFIED]** | gsap.com/docs/v3/Plugins/ScrollTrigger |
| 7 | GSAP timeline `-=0.8` position parameter | `resources/animated_website_raw_research.txt:174-176` | Position shorthand for overlapping labels | **[VERIFIED]** | gsap.com/docs/v3/GSAP/Timeline/position-parameter |
| 8 | GSAP `stagger: 0.2` on a `to(...)` | `resources/animated_website_raw_research.txt:194` | "0.2 seconds delay between each card reveal" | **[VERIFIED]** | gsap.com/docs/v3/GSAP/Tween/stagger |
| 9 | ScrollTrigger `trigger` + `start: "top 75%"` | `resources/animated_website_raw_research.txt:183-186` | "Triggers when the top of section hits 75% viewport height" | **[VERIFIED]** | gsap.com/docs/v3/Plugins/ScrollTrigger |
| 10 | `gsap.matchMedia` for `(min-width: 769px)` gating | `resources/animated_website_raw_research.txt:412` | "This logic only executes on desktop screens" | **[VERIFIED]** | gsap.com/docs/v3/GSAP/matchMedia() |
| 11 | `transformPerspective: 600` shortcut for 3D tilt | `resources/animated_website_raw_research.txt:345` | "transformPerspective: 600" | **[VERIFIED]** GSAP shortcut that translates to `perspective` on the parent + `transform: rotate3d()` | gsap.com/docs/v3/GSAP/gsap.to() |
| 12 | `@media (pointer: coarse)` hides custom cursor on touch | `resources/animated_website_raw_research.txt:284` | "Hide custom cursor on mobile touch devices" | **[VERIFIED]** | MDN `pointer` media feature |
| 13 | `<script src="https://cloudflare.com">` (×3 placeholders) | `resources/animated_website_raw_research.txt:163-164, 313, 1084-1085` | Source's HTML examples | **[CONTRADICTED]** `cloudflare.com` does not serve JS. These are token placeholders the source LLM emitted. Real CDN: `https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js`. | Real GSAP CDN at jsdelivr |
| 14 | "Framer Motion… if you are building your website using React or Next.js" | `resources/animated_website_raw_research.txt:4` | "go-to tool if you are building your website using React or Next.js" | **[VERIFIED — but outdated name]** Library renamed to **Motion** in 2024 (`motiondivision/motion`). Import path is `motion/react`. | motion.dev/docs |
| 15 | R3F `useFrame` runs at "60-120 fps" | `resources/animated_website_raw_research.txt:854` | "useFrame runs on every single browser frame loop (typically 60-120fps)" | **[PARTIAL]** R3F's `useFrame` runs once per render, typically 60 Hz but can hit 120/144 Hz on high-refresh displays. Phrasing conflates browser refresh rate with internal render loop. | r3f.docs.pmnd.rs/api/hooks#useframe |
| 16 | Dynamic import of R3F scene via `next/dynamic({ ssr: false })` | `resources/animated_website_raw_research.txt:879-907` | "Magic hook: Instructs Next.js to skip pre-rendering this file on the server" | **[VERIFIED]** canonical pattern for WebGL in Next.js; required because `window` does not exist during SSR. | nextjs.org/docs/app/api-reference/next/dynamic |
| 17 | `clamp(180px, 25vh, 250px)` fluid card height | `resources/animated_website_raw_research.txt:394` | "Using clamp() lets the height adapt fluidly between 180px and 250px" | **[VERIFIED]** | MDN `clamp()` |
| 18 | `repeat(auto-fit, minmax(280px, 1fr))` responsive grid | `resources/animated_website_raw_research.txt:383` | "Auto-fits columns based on minimum and maximum content sizing thresholds" | **[VERIFIED]** | MDN `repeat()`; CSS Grid spec |
| 19 | 44×44 px touch target | `resources/animated_website_raw_research.txt:485` | "ensure your elements maintain a touch target size of at least 44x44px" | **[VERIFIED]** matches Apple HIG + WCAG 2.5.5 (AAA ≥ 44×44 CSS px). | w3.org/WAI/WCAG22/Understanding/target-size |
| 20 | `<picture>` + `media` queries for AVIF/WebP | `resources/animated_website_raw_research.txt:517-530` | "Instead of serving a massive background image to a small mobile phone screen" | **[VERIFIED]** | MDN `<picture>` |
| 21 | `loading="lazy"`, `decoding="async"`, explicit `width`/`height` | `resources/animated_website_raw_research.txt:526-528` | "Tells the browser to decode the image file on a separate processing thread" | **[VERIFIED]** | web.dev/CLS; MDN `loading` attribute |
| 22 | `theme-color` meta | `resources/animated_website_raw_research.txt:490` | "Changes browser mobile address bar color" | **[VERIFIED]** Chrome/Edge/Safari support; Firefox partial. | MDN `theme-color` |
| 23 | OG image dimensions 1200×630 | `resources/animated_website_raw_research.txt:510` | "exactly 1200 x 630 pixels" | **[VERIFIED]** | Facebook OG docs; Twitter cards docs |
| 24 | GSAP preloader sequence on `window.load` | `resources/animated_website_raw_research.txt:586-619` | "This listens for the browser's native window.load event" | **[VERIFIED]** pattern. Brief `share/design/T-2026-07-29-001/brief.md:230` says "Avoid mandatory preloaders… do not hold readable content until decorative assets finish." — prefers absence over `setTimeout`. | gsap.com/docs/v3/GSAP/Timeline |
| 25 | `Audio.play().catch(...)` for autoplay policy | `resources/animated_website_raw_research.txt:634` | "Catches and ignores errors if the browser blocks audio autoplay" | **[VERIFIED]** | developer.chrome.com/blog/autoplay |
| 26 | Terser / htmlminifier / cssminifier | `resources/animated_website_raw_research.txt:619` | Bundle and minify JS, HTML, CSS | **[VERIFIED]** all MIT, current. | terser.org; html-minifier; cssnano |
| 27 | Lenis `duration: 1.2` + `easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))` | `resources/animated_website_raw_research.txt:642-663` | "Smooth exponential ease" | **[VERIFIED]** | github.com/darkroomengineering/lenis README |
| 28 | `gsap.ticker.add((time) => lenis.raf(time * 1000))` | `resources/animated_website_raw_research.txt:660` | "Synchronize Lenis with GSAP ScrollTrigger" | **[VERIFIED]** official Lenis+GSAP integration snippet. | github.com/darkroomengineering/lenis README |
| 29 | `gsap.ticker.lagSmoothing(0)` | `resources/animated_website_raw_research.txt:663` | GSAP ticker lag config | **[VERIFIED]** | gsap.com/docs/v3/GSAP/gsap.ticker |
| 30 | CSS `:placeholder-shown ~ label` floating-label trick | `resources/animated_website_raw_research.txt:736-741` | "Move label up when input is focused or NOT empty" | **[VERIFIED]** | MDN `:placeholder-shown` |
| 31 | GSAP timeline `.call(() => ...)` chaining | `resources/animated_website_raw_research.txt:789` | "Chain… call() inserts a function call mid-timeline" | **[VERIFIED]** | gsap.com/docs/v3/GSAP/Timeline |
| 32 | GSAP stagger grid `stagger: { amount: 0.6, grid: "auto", from: "start" }` | `resources/animated_website_raw_research.txt:1100-1104` | Grid-aware stagger | **[VERIFIED]** | gsap.com/docs/v3/GSAP/Tween/stagger |
| 33 | Source mentions Three.js + PixiJS as Level 3 | `resources/animated_website_raw_research.txt:4` | "tap into the user's computer graphics card (GPU) via WebGL" | **[VERIFIED]** Three.js r185 MIT (114k stars), PixiJS MIT (v8, 47.9k stars). | threejs.org; pixijs.com |
| 34 | Source never mentions Lottie, View Transitions, CSS scroll-driven animations, anime.js, Rive, WebGPU, WebXR | (omission) | n/a | **[UNKNOWN — gap]** All seven exist in production as of 2026-Q3; this playbook covers them in kinds (v), (vii), (i, native variant), (v, alt), (xi, alt), (ix, alt), and emerging appendix. | MDN; lottiefiles.com; rive.app |
| 35 | Source: "never animate `width`, `height`, `top`, or `left`" | `resources/animated_website_raw_research.txt:9` | "because they force the browser to recalculate the entire page layout" | **[VERIFIED]** — same advice in Paul Lewis / Google Developers / web.dev. | web.dev — Animations Guide |

---

## What we know for sure

- **Verified library APIs (2026-Q3)**: GSAP 3.x (free, all plugins); Motion (MIT, was Framer Motion); Three.js r185; R3F v8/v9; Lenis v1.3.x; dotLottie-web (MIT); lottie-web (MIT); anime.js v4; PixiJS v8; View Transitions API (Chrome 111+, Edge 111+, Safari 18+); CSS `animation-timeline: scroll()`/`view()` (Chrome 115+, Safari TP); Rive runtime (MIT); Spline SaaS; Vivus (MIT); SplitType (MIT); Splitting.js (MIT); AutoAnimate (MIT). All verified at angle B's B.1–B.6 tables.
- **Token-mapped motion grammar**: `share/design/T-2026-07-29-001/brief.md` defines `motion.duration.{instant,quick,fast,base,slow,story,cinematic}`, `motion.easing.{standard,enter,exit,in-out,overshoot,linear}`, `motion.distance.{none,xs,sm,md,lg,xl}`, `motion.delay.{item,hero,section,group-cap}`, and a reduced-motion mapping. Every Human-facing build step must name these tokens, not raw ms values.
- **Performance budget from brief**: cap concurrent visible animation tracks at 8; one full-viewport canvas/WebGL scene at most; two ambient loops at most; 16.7 ms frame budget at 60 Hz; `will-change` applied only immediately before known animation, then removed.
- **Build-vs-reuse defaults (from angle B)**: scroll engine = Lenis; JS engine = GSAP; 3D = Three.js + R3F; Lottie runtime = dotLottie-web; page transitions = native View Transitions API; typography = SplitType; no-code = Webflow; GUI = Leva; state = Zustand.
- **Scrape artifacts to neutralise**: the three `<script src="https://cloudflare.com">` placeholders (`raw:163-164, 313, 1084-1085`); the "Framer Motion" name (now "Motion"); the misleading "CSS runs on main thread" claim at `raw:4`.
- **The twelve kinds** (per angle A's trigger × surface matrix): (i) scroll-driven editorial / scrollytelling; (ii) 3D product showcase; (iii) 2D interactive / game-like; (iv) vector / SVG line animation; (v) Lottie / dotLottie; (vi) typography / kinetic text; (vii) page transition; (viii) micro-interactions / hover; (ix) generative / procedural background; (x) animated data viz; (xi) interactive 3D hero; (xii) audio-reactive visual.
- **GSAP is now 100% free** — including ScrollSmoother, SplitText, MorphSVG, DrawSVG, MotionPath. This removes the historical "GSAP plugins cost money" barrier; the build playbook can recommend them without a budget caveat.

## What we don't know (ambiguities)

- **Framework target for the deliverable.** The build guide can be written framework-agnostic (vanilla + React variants side by side) or opinionated for one stack. Different choices change LLM-facing snippets (e.g. R3F vs vanilla Three.js).
  - **Suggested clarifying question:** "Should the LLM-facing snippets in this build playbook default to (a) React + Next.js + R3F (opinionated), (b) framework-agnostic with both vanilla and React variants per kind, or (c) one stack chosen by you?"
- **Per-kind depth-vs-breadth tradeoff.** Some kinds (Lottie, scroll-trigger, 3D) need more lines of build steps; others (CSS-only micro, hover) need less. If the playbook must fit a token budget, weighting matters.
  - **Suggested clarifying question:** "Should each kind receive roughly equal depth (~500-1000 words per Human-facing section, ~200 words per LLM-facing), or weighted by complexity?"
- **Whether to include the seven "emerging" kinds** (CSS scroll-driven animations, View Transitions API, WebGPU, WebXR, dotLottie state machines, generative-art landing pages, AI-generated live motion) as primary kinds or only as alternatives inside the 12. Angle A's emerging appendix placed them as alternates; this playbook follows the same convention but flags them inside each relevant kind.
  - **Suggested clarifying question:** "Are emerging kinds acceptable as alternates inside the 12 primary sections, or should each be a 13th 'Emerging kinds' section with its own build steps?"
- **Acceptance-criteria depth.** The brief asks for "machine-checkable" acceptance criteria. Whether that's Playwright e2e tests, Vitest assertions, axe-core a11y audits, or Lighthouse CI thresholds is up to the planner.
  - **Suggested clarifying question:** "Should the LLM-facing acceptance criteria assume Playwright + axe-core + Lighthouse CI as the test stack, or stay framework-agnostic?"

## Risks and doubts

- **Risk: Animating without a performance budget tanks INP and CLS.** A site that uses GSAP + Lenis + ScrollTrigger + heavy 3D scenes without a token-named budget (e.g. `motion.limit.concurrent = 8` exceeded, `will-change` left on permanently, `position: fixed` layer above scroll content) can drop LCP below 2.5 s and INP above 200 ms. Source claim at `raw:34` mentions the 16 ms frame budget but never says "stay under N concurrent tweens."
  - **Severity:** high
  - **Mitigation:** every Human-facing build guide in this file names the token-named limits from `share/design/T-2026-07-29-001/brief.md:224` (8 concurrent tracks; 1 full-viewport scene; 2 ambient loops). Every LLM-facing section's "Forbidden patterns" lists permanent `will-change` and un-IntersectionObserver'd scroll handlers.

- **Risk: GSAP + ScrollTrigger without IntersectionObserver leaks memory on long-lived SPAs.** GSAP ScrollTrigger instances must be `kill()`ed on component unmount or when a section is removed. Source claims `gsap.matchMedia` returns a cleanup function (true at `raw:471`) but does not show the unmount wiring for React.
  - **Severity:** high
  - **Mitigation:** every kind that uses ScrollTrigger (i, vi, vii, x, xi, xii) lists `ScrollTrigger.getAll().forEach(t => t.kill())` in the LLM-facing "Forbidden patterns" plus a React `useEffect` cleanup snippet. Ponytail: if you ship dozens of pinned sections, profile before assuming.

- **Risk: View Transitions API coverage gap. ** `Document.startViewTransition()` is in Chrome 111+ / Edge 111+ / Safari 18+ but not Firefox stable as of 2026-Q3. Source mentions Webflow's `webflow.io` URL (line 838) but never says "use feature detection."
  - **Severity:** medium
  - **Mitigation:** kind (vii) ships a feature-detection wrapper (`if (!document.startViewTransition) return location.assign(href)`) in the LLM-facing acceptance criteria. Firefox users get a full-page navigation instead of a fade.

- **Risk: `prefers-reduced-motion` not respected, causing motion sickness / vestibular triggers.** Source's `* { animation-duration: 0.01ms !important }` pattern (`raw:34-39`) is widely used but breaks third-party widget animations and can leave scroll-locked state behind. Brief's reduced-motion mapping (`brief.md:201-209`) is more nuanced.
  - **Severity:** high
  - **Mitigation:** every kind in this file carries an explicit reduced-motion clause mapped to the brief's tokens (`quick` as the maximum duration for micro-feedback; `instant` for entrances; `motion.distance.none` for any translate). LLM-facing "Forbidden patterns" forbids `* { animation-duration: 0.01ms !important }`.

- **Risk: Three.js + WebGPU assumed where WebGL is required.** Three.js r158+ added `WebGPURenderer` (verified) but Safari TP only; Chrome stable, Firefox behind flag. Building a kind (ii) site on WebGPU-only breaks Firefox.
  - **Severity:** medium
  - **Mitigation:** every 3D kind (ii, ix, xi) names WebGLRenderer as the safe default; WebGPURenderer listed as an opt-in alternative gated by feature detection (`'gpu' in navigator`).

- **Risk: Animating properties that trigger layout (width/height/inset).** Source explicitly forbids this at `raw:9` but the scroll-reveal grid template at `raw:1084` uses `padding` transitions on cards.
  - **Severity:** low
  - **Mitigation:** every kind's "Forbidden patterns" repeats the rule: animate only `transform` and `opacity` (and the brief's named tokens). LLM-facing acceptance criteria assert that no animated CSS rule contains `width`, `height`, `top`, `left`, `right`, `bottom`, `margin`, or `padding` with non-zero duration.

- **Risk: Lottie / dotLottie file-size blowups.** A 5 MB Lottie JSON asset defeats the LCP budget faster than no animation at all. Source discusses Squoosh + AVIF for images (`raw:823`) but not Lottie compression.
  - **Severity:** medium
  - **Mitigation:** kind (v) names dotLottie's `.lottie` archive format (Rust+WASM, 90% smaller than GIF equivalent — angle B B.6 confirmed) and LottieFiles' gzip-on-CDN as the delivery defaults.

- **Risk: GSAP plugin names that the source mis-states.** Source says "Framer Motion" at `raw:4`; Playbook corrects to "Motion." Source says "GSAP is paid for commercial" elsewhere; that's stale since 2024.
  - **Severity:** medium
  - **Mitigation:** every LLM-facing snippet that names a library uses the current name + import path (`motion`, `gsap`, `@react-three/fiber`).

---

## Full build guide — one section per kind

Each kind has two sub-sections. **Human-facing version** is prose, names `share/design/T-2026-07-29-001/brief.md` motion tokens, and finishes with a "Done when" definition. **LLM/agent-facing version** is compact and prescriptive: pre-conditions, files, code snippets, acceptance criteria, forbidden patterns.

---

### Kind (i) — Scroll-driven editorial / scrollytelling

#### Human-facing version

**Pre-flight.** Decide whether the site is editorial (long-form story, NYT-style) or marketing (one-screen hero that scrubs a product). Both use the same machinery but with very different pacing. Editorial pacing follows the brief's `motion.duration.story` (~560 ms per beat); marketing scrubs a single hero on `motion.duration.slow` (~360 ms). Audit the page for `prefers-reduced-motion: reduce` users — they get the static layout.

**Stack choice.** Two valid stacks:
1. **GSAP + ScrollTrigger + Lenis** (MIT, free, ~80 KB combined gzipped) — for rich choreography, pinning, scrubbing, and mixed timelines. Pairs with `gsap.matchMedia` for desktop-only effects.
2. **Native CSS scroll-driven animations** (`animation-timeline: scroll()` / `view()`) — for zero-JS sites; 0 KB cost; limited Chromium/Safari parity (Firefox still behind a flag as of 2026-Q3 per MDN).

For a React/Next.js project, default to #1. For a static site where LCP must stay under 1 s, default to #2.

Install: `npm i gsap lenis` or — for CSS-only — copy MDN's `animation-timeline: view()` template.

**Project scaffold.**

```
src/
├── app/
│   ├── layout.tsx
│   └── page.tsx                 ← reads ScrollTrigger setup
├── components/
│   ├── ScrollScene.tsx          ← each pinned section is one component
│   └── ScrollProgress.tsx       ← vertical progress indicator
├── lib/
│   ├── gsap-setup.ts            ← registers plugins, configures Lenis
│   └── media-queries.ts         ← gsap.matchMedia keys
└── styles/
    └── motion-tokens.css        ← imports brief's motion tokens
```

**Implementation phases.**

1. **Scaffold Lenis + GSAP.** Initialize Lenis with `duration: 1.2` and the exponential ease `Math.min(1, 1.001 - Math.pow(2, -10 * t))`. Wire `lenis.on('scroll', ScrollTrigger.update)` and `gsap.ticker.add((time) => lenis.raf(time * 1000))`. Set `gsap.ticker.lagSmoothing(0)` only when you have evidence the lag is hurting (ponytail: default `lagSmoothing(500, 33)` is fine; flipping to 0 disables GSAP's catch-up behavior on tab-switch).
2. **Write each scene as a component.** Each `<ScrollScene>` takes `pin`, `scrub`, `start`, `end` props. Inside, use `gsap.fromTo(...)` with named tokens (e.g. `opacity: 0 → 1`, `y: motion.distance.md → 0`, `duration: motion.duration.base`). Do not animate `width`/`height`.
3. **Mobile gating.** Wrap desktop-only effects in `mm.add('(min-width: 1024px)', () => { ... return () => ScrollTrigger.getAll().forEach(t => t.kill()); })`. The cleanup function is critical — ScrollTrigger instances leak otherwise.
4. **Reduced-motion mapping.** When `prefers-reduced-motion: reduce` matches, use `ScrollTrigger.normalizeScroll(false)`, kill all scrub/pin timelines, and present static sections in normal document flow (`brief.md:206`).
5. **Verify.** Lighthouse CI must show LCP < 2.5 s, CLS < 0.1, INP < 200 ms on a throttled mobile profile. Use `ScrollTrigger.refresh()` sparingly — only on known resize events, never in a scroll handler.

**Performance & accessibility checklist.**
- [ ] No animated CSS rule contains `width`, `height`, `top`, `left`, `right`, `bottom`, `margin`, or `padding` with `duration > 0`.
- [ ] `will-change: transform` is applied immediately before the animation and removed on `onComplete`.
- [ ] Concurrent animation tracks ≤ 8 (`motion.limit.concurrent`).
- [ ] One full-viewport pinned scene at most (`motion.limit.full-viewport-scenes = 1`).
- [ ] `prefers-reduced-motion: reduce` shows the static layout.
- [ ] Reading remains interruptible: scroll and Esc both pause scrubbing.
- [ ] Keyboard focus order matches DOM order, not visual order.

**Done when.** Scrolling the page triggers each scene in DOM order; reduced-motion users see the static layout; Lighthouse mobile LCP < 2.5 s; no scroll handler runs more than 8 ms of work on a 4× CPU-throttled mobile profile.

#### LLM/agent-facing version

**Pre-conditions.** Target: React + Next.js 14+, or vanilla HTML. Browser support: Chrome/Edge/Safari last 2 versions, Firefox with degraded experience. Input assets: section copy + visual storyboard + reference URLs.

**Files to create.**
- `lib/gsap-setup.ts` — register `ScrollTrigger`, `ScrollTo`, `Observer` (if needed). Initialize Lenis. Sync `gsap.ticker` to `lenis.raf`.
- `components/ScrollScene.tsx` — props `{ id, pin?, scrub?, start, end, children }`. Renders a `<section>` with `data-scroll-trigger={id}`. Inside `useLayoutEffect`, register a ScrollTrigger that animates `children` with GSAP timeline.
- `components/ScrollProgress.tsx` — fixed-position indicator that reads `ScrollTrigger.maxScroll(window)` and writes `transform: scaleX` to a 1px bar.
- `app/page.tsx` — mounts `<ScrollProgress />` and renders N `<ScrollScene />`s.

**Pseudocode / snippet (scroll-trigger setup).**

```ts
// lib/gsap-setup.ts
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));

// ponytail: default lagSmoothing(500, 33) is fine; only set 0 if you measured jank on tab-switch
```

```tsx
// components/ScrollScene.tsx
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from '@/styles/motion-tokens';

export function ScrollScene({ id, pin = false, start = 'top 75%', end = 'bottom 25%', children }) {
  const ref = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: ref.current!, start, end, scrub: pin ? true : false, pin },
    });
    tl.from(ref.current!.querySelectorAll('[data-animate]'), {
      opacity: 0,
      y: motion.distance.md,
      stagger: motion.delay.item / 1000,
      duration: motion.duration.base / 1000,
      ease: 'power2.out', // brief: motion.easing.enter ≈ cubic-bezier(0.16, 1, 0.3, 1)
    });
    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  }, []);
  return <section ref={ref} data-scroll-trigger={id}>{children}</section>;
}
```

**Acceptance criteria (machine-checkable).**
- `gsap.utils.toArray('[data-scroll-trigger]').length === rendered <ScrollScene /> count` after mount.
- After unmount, `ScrollTrigger.getAll().length === 0`.
- No element with `data-animate` has `width`, `height`, `top`, `left`, `right`, `bottom`, `margin`, or `padding` declared with non-zero duration in computed style.
- `document.documentElement.style.scrollBehavior` is `''` (Lenis overrides; do not also set `scroll-behavior: smooth`).
- Reduced-motion users: `matchMedia('(prefers-reduced-motion: reduce)').matches === true` ⇒ `gsap.globalTimeline.paused() === true` and all `pin: true` triggers are killed.

**Forbidden patterns.**
- Animating `width`/`height`/`top`/`left`/`margin`/`padding` (use `transform` + `opacity`).
- Permanent `will-change` on every animated element (memory bloat; brief.md:227).
- `setTimeout` to fake animation duration (defeats LCP).
- `ScrollTrigger` without `kill()` on unmount.
- `gsap.ticker.lagSmoothing(0)` without measurement evidence.
- `* { animation-duration: 0.01ms !important }` — overrides third-party widgets and breaks the brief's reduced-motion mapping (brief.md:201-209). Target specific selectors instead.

---

### Kind (ii) — 3D product showcase (Three.js + R3F)

#### Human-facing version

**Pre-flight.** Confirm the product has a glTF / GLB / USDZ asset (or commit to procedural geometry). Decide rotation: free orbit (user-controlled) or scripted (camera path). Decide target devices — 3D on mobile requires reduced draw calls, lower texture resolution, and aggressive LOD.

**Stack choice.** Three.js + React Three Fiber (R3F) is the de facto standard (MIT, 31.6k stars per angle B B.3). `@react-three/drei` provides ready helpers (OrbitControls, Environment, ContactShadows, Float). For a static product viewer with no React, raw Three.js is fine. For a 3D + UI shell, use R3F + Drei. For state, use **Zustand** (pmndrs pair).

Install: `npm i three @react-three/fiber @react-three/drei zustand`.

**Project scaffold.**

```
src/
├── app/
│   └── product/[id]/page.tsx    ← dynamic import wrapper, ssr: false
├── components/
│   ├── ProductScene.tsx         ← Canvas root, lights, camera
│   ├── ProductModel.tsx         ← <primitive object={gltf.scene} />
│   ├── ProductControls.tsx      ← OrbitControls + auto-rotate toggle
│   └── ProductUI.tsx            ← HTML overlay (price, color picker)
├── lib/
│   ├── use-product-state.ts     ← Zustand store
│   └── asset-loader.ts          ← DRACO + KTX2 loaders
└── public/
    └── models/product.glb       ← ≤ 5 MB compressed
```

**Implementation phases.**

1. **Asset pipeline.** Export product as glTF 2.0 with Draco mesh compression and KTX2 / Basis Universal textures. Target ≤ 5 MB total. Verify the asset loads in three.js editor and `modelviewer.dev` before integrating.
2. **Next.js SSR wrapper.** Wrap the scene in `next/dynamic` with `ssr: false` — WebGL requires `window`; SSR crashes without the wrapper. Show a 2D poster image (`<img>`) until the canvas mounts.
3. **Lights + environment.** Add `<ambientLight intensity={0.5} />`, one key `<directionalLight />`, and an `<Environment preset="studio" />` for IBL. Drei's `Environment` is a 6 KB helper; it ships HDRI maps.
4. **Camera + controls.** Set `<Canvas camera={{ position: [0, 0, 3], fov: 45 }}>`. Add `<OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 1.8} />` to clamp the rotation to a tasteful arc. Auto-rotate only when `motion.idle` (no user input for 4 s).
5. **HTML overlay.** Use Drei's `<Html>` portal to render price/CTA badges inside the 3D scene at a world position. Or, render an absolutely-positioned overlay outside the canvas — that avoids WebGL clear-color flicker.
6. **Performance.** Cap pixel ratio at `min(window.devicePixelRatio, 2)`. Use `<PerformanceMonitor>` from Drei to drop quality on slow devices. Pause the render loop when offscreen (`<Canvas frameloop="demand">` with manual `invalidate()` on interaction).
7. **Reduced-motion.** For users who prefer reduced motion, switch `frameloop` to `"demand"` (only render on user interaction) and disable auto-rotate. Brief: `prefers-reduced-motion: reduce` ⇒ `motion.distance.none`, no scale/rotation.

**Performance & accessibility checklist.**
- [ ] glTF asset ≤ 5 MB; texture resolutions ≤ 2048×2048; KTX2 preferred.
- [ ] Pixel ratio capped at 2.
- [ ] `frameloop="demand"` or explicit pause when offscreen.
- [ ] Color picker / size selector uses keyboard-operable buttons (not just 3D-click targets).
- [ ] 3D model has a `name` and a fallback 2D `<img alt="...">` for screen readers.
- [ ] `prefers-reduced-motion: reduce` ⇒ no auto-rotate.
- [ ] Lighthouse mobile LCP < 2.5 s (the 2D poster must be the LCP element, not the canvas).

**Done when.** Product is visible and rotates in 3D; pointer drag + pinch zoom both work on touch; Lighthouse mobile LCP < 2.5 s (2D poster is the LCP); reduced-motion users see a static image.

#### LLM/agent-facing version

**Pre-conditions.** glTF/GLB asset (Draco + KTX2 preferred). React + Next.js 14+ or Vite. Browser support: WebGL2 baseline; WebGPU as opt-in (`'gpu' in navigator`).

**Files to create.**
- `lib/asset-loader.ts` — `DRACOLoader`, `KTX2Loader`, `GLTFLoader` from three/examples/jsm.
- `components/ProductScene.tsx` — `<Canvas>` root with camera, lights, environment.
- `components/ProductModel.tsx` — `<primitive object={gltf.scene} />`.
- `components/ProductControls.tsx` — `<OrbitControls>` + auto-rotate gating.
- `lib/use-product-state.ts` — Zustand store: `{ color, autoRotate, setColor, toggleAutoRotate }`.

**Pseudocode (Next.js SSR-safe scene).**

```tsx
// app/product/[id]/page.tsx
import dynamic from 'next/dynamic';
const ProductScene = dynamic(() => import('@/components/ProductScene'), {
  ssr: false,
  loading: () => <img src="/poster.jpg" alt="" width={1200} height={800} />,
});
export default function Page({ params }: { params: { id: string } }) {
  return (
    <main>
      <ProductScene productId={params.id} />
      <ProductUI />
    </main>
  );
}
```

```tsx
// components/ProductScene.tsx
'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerformanceMonitor } from '@react-three/drei';
import { ProductModel } from './ProductModel';
import { useProductState } from '@/lib/use-product-state';

export default function ProductScene({ productId }) {
  const { autoRotate, toggleAutoRotate } = useProductState();
  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 45 }}
      dpr={[1, 2]}
      frameloop={autoRotate ? 'always' : 'demand'}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Environment preset="studio" />
      <ProductModel id={productId} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={autoRotate}
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 1.8}
        onStart={() => toggleAutoRotate(false)}
      />
      <PerformanceMonitor onDecline={() => useProductState.setState({ dpr: 1 })} />
    </Canvas>
  );
}
```

**Acceptance criteria.**
- `useProductState.getState()` is callable outside React (Zustand default).
- On Chrome / Firefox / Safari, the canvas mounts and the first frame renders within 1 s.
- `window.devicePixelRatio` is capped at 2 in the canvas props.
- `prefers-reduced-motion: reduce` ⇒ `<OrbitControls autoRotate={false} />` and `frameloop="demand"`.
- `navigator.gpu` is checked before any WebGPU path; falls back to WebGL2 on mismatch.
- All `<mesh>` children of `ProductModel` have a `name` property for screen readers (R3F: `<mesh name="product-body">`).

**Forbidden patterns.**
- Animating `width` / `height` / `top` / `left` on a `<mesh>` (these trigger React DOM updates, not GPU work).
- Loading uncompressed `.glb` assets > 5 MB.
- `frameloop="always"` on pages where the user does not interact for > 5 s (drains battery).
- `useFrame` that reads `getBoundingClientRect()` per frame (forces layout).
- Three.js `WebGPURenderer` without feature detection (`if (!('gpu' in navigator)) return new WebGLRenderer();`).
- Permanent `will-change: transform` on the canvas element (canvas does not benefit; `will-change` is for DOM compositing).

---

### Kind (iii) — 2D interactive / game-like (Canvas + PixiJS or pure Canvas)

#### Human-facing version

**Pre-flight.** Define the input model: pointer-only, keyboard, touch, or all. Define the render loop target: 30 fps (lightweight) or 60 fps (smooth). Decide whether physics is needed (Rapier for 3D, planck.js for 2D). Game-like sites need consistent `requestAnimationFrame` cadence — never tie animation to scroll position.

**Stack choice.** Two paths:
1. **PixiJS v8** (MIT, 47.9k stars) — WebGL/WebGPU 2D engine, ideal for thousands of sprites. Pairs with `@pixi/react` for React, plain PixiJS for vanilla.
2. **Plain Canvas 2D** — zero deps, fine for ≤ 100 sprites. Use `<canvas>` + a manual RAF loop.

For physics, pair with **planck.js** (Box2D port) for 2D or **Rapier** (Apache-2.0) for 3D.

Install: `npm i pixi.js @pixi/react` (or `npm i pixi.js` for vanilla).

**Project scaffold.**

```
src/
├── app/play/page.tsx
├── components/
│   ├── GameCanvas.tsx           ← PixiJS Application wrapper
│   ├── entities/
│   │   ├── Player.ts
│   │   └── Enemy.ts
│   ├── systems/
│   │   ├── input.ts             ← keyboard + pointer
│   │   └── physics.ts           ← planck.js world
│   └── shaders/
│       └── background.frag      ← GLSL for procedural background
└── assets/
    └── sprites/                 ← texture atlases, ≤ 2 MB each
```

**Implementation phases.**

1. **Asset pipeline.** Sprite atlases via TexturePacker or free-tex-packer. JSON + PNG; total ≤ 2 MB. Use WebP/AVIF for static backgrounds.
2. **Input system.** `window.addEventListener('keydown', ...)` for keyboard. `pixijs` exposes `app.stage.eventMode = 'static'` for pointer events. Always check `event.target` — pointer events bubble through the canvas.
3. **Render loop.** PixiJS `Ticker.shared.add(delta => ...)`. Delta is in 60-fps ticks (1.0 = 16.67 ms). Cap to `Math.min(delta, 4)` to survive long pauses. Avoid `setTimeout` — it desyncs from RAF.
4. **Physics.** planck.js world steps at fixed dt = 1/60. Use `world.step(1/60, velocityIterations, positionIterations)` outside the render loop to keep physics deterministic. Briefly for game-like UI (collisions, gravity), only when needed.
5. **Pause / offscreen.** On `document.visibilitychange` to hidden, pause the ticker. On `IntersectionObserver` ratio < 0.1, pause. Resume on visible.
6. **Reduced-motion.** Reduce sprite count and disable parallax background; do not disable the game itself (the game IS the content).

**Performance & accessibility checklist.**
- [ ] Sprite atlas ≤ 2 MB.
- [ ] Single `<canvas>` per page; never multiple stacked canvases unless they are intentional layers.
- [ ] Render loop pauses when `document.visibilityState === 'hidden'`.
- [ ] Keyboard controls work without mouse focus.
- [ ] Game UI (`<button>` overlays) is reachable via Tab in document order.
- [ ] No flashing > 3 Hz (WCAG 2.3.1).
- [ ] Canvas has `aria-label="Interactive demo"`; game state is announced via a live region.

**Done when.** Game runs at 60 fps on desktop and 30 fps on a 4× CPU-throttled mobile profile; pauses when offscreen; keyboard controls work; prefers-reduced-motion users get a less busy version.

#### LLM/agent-facing version

**Pre-conditions.** Sprite atlas (JSON + PNG), audio (optional), input map. React + Vite or vanilla.

**Files to create.**
- `components/GameCanvas.tsx` — `<Application>` from `@pixi/react` with `width`, `height`, `backgroundColor`, `antialias`.
- `lib/input.ts` — keyboard map (`{ ArrowLeft: 'left', ArrowRight: 'right', Space: 'jump' }`).
- `lib/physics.ts` — planck.js world + bodies.

**Pseudocode (PixiJS React game loop).**

```tsx
'use client';
import { Application, useTick } from '@pixi/react';
import { Player } from './entities/Player';
import { InputSystem } from '@/lib/input';
import { PhysicsSystem } from '@/lib/physics';

export default function GameCanvas() {
  const input = useRef(new InputSystem()).current;
  const physics = useRef(new PhysicsSystem()).current;
  useTick((delta) => {
    const dt = Math.min(delta, 4) / 60; // cap to 4 ticks (~66ms)
    physics.step(dt);
    input.update();
  });
  return (
    <Application width={800} height={600} backgroundColor={0x000000} antialias>
      <Player input={input} physics={physics} />
    </Application>
  );
}
```

**Acceptance criteria.**
- `useTick` callback receives delta between 0 and 4 ticks (capped).
- `document.visibilityState === 'hidden'` ⇒ PixiJS `Ticker.shared.stop()`.
- All sprites use the same atlas; no per-sprite HTTP request.
- Game canvas has `aria-label` and a sibling live region (`<div aria-live="polite" id="game-status" />`) that updates on game state changes.

**Forbidden patterns.**
- `setInterval` or `setTimeout` for game loop (use PixiJS `Ticker`).
- Per-frame `getBoundingClientRect` on the canvas (force layout).
- Animating DOM properties (`width`, `height`) of the canvas itself.
- More than one `<canvas>` stacked without compositing reason.
- Sound effect autoplaying without user gesture (`Audio.play().catch(...)` only after first click).

---

### Kind (iv) — Vector / SVG line animation (Vivus / SVGator / GSAP DrawSVG)

#### Human-facing version

**Pre-flight.** SVG paths must be defined in a single `<svg>` (or referenced inline). Path data must be reachable via JavaScript (`getTotalLength()`) for any draw-on-scroll effect. For brand logos, obtain the source SVG from the brand kit — never re-export from a raster.

**Stack choice.**
1. **GSAP DrawSVGPlugin** (now free per angle B — gsap.com/pricing verified) — `gsap.fromTo('path', { drawSVG: 0 }, { drawSVG: '100%', duration: motion.duration.story })`. Path must be visible (stroke, no fill).
2. **Vivus** (MIT, 15.5k stars) — `new Vivus('svg-id', { type: 'oneByOne', duration: 200 })`. Renders the SVG line-by-line. No dependency on GSAP.
3. **SVGator** (SaaS) — visual editor for SVG animations; exports CSS or JS.
4. **Hand-rolled** — `path.getTotalLength()` + `path.style.strokeDasharray = length + ' ' + length` + animated `strokeDashoffset`. ~20 lines of CSS.

Install: `npm i gsap` (DrawSVGPlugin is bundled in `gsap` since the 2024 free release).

**Project scaffold.**

```
src/
├── components/
│   ├── LogoIntro.tsx            ← SVG line draw on mount
│   └── IconReveal.tsx           ← per-icon draw on scroll
├── assets/
│   └── logo.svg                 ← source SVG with stroke
└── styles/
    └── svg-tokens.css           ← stroke-dasharray defaults
```

**Implementation phases.**

1. **Source the SVG.** Brand logos should ship with their original SVG (no raster conversion). Verify the paths are unstyled — color/stroke set in CSS for theming.
2. **Set initial state.** `stroke-dasharray: var(--path-length); stroke-dashoffset: var(--path-length); opacity: 0;` — the line is invisible. `--path-length` is `getTotalLength()` set via JS at mount, or hard-coded in the SVG via `<style>`.
3. **Trigger the draw.** Use GSAP DrawSVGPlugin if you have GSAP already, or `stroke-dashoffset` keyframes. Trigger on mount (CSS-only with `@keyframes`) or on scroll (GSAP ScrollTrigger).
4. **Reduced-motion.** Replace the draw with a `fade-in` over `motion.duration.quick` (80 ms). Brief: `motion.distance.none` for any translate/scale.
5. **Theming.** Strokes use `currentColor` so a CSS theme switch re-tints without JS.

**Performance & accessibility checklist.**
- [ ] Paths are inline (not referenced via `<img>` or `<use href>` cross-document) so JS can read `getTotalLength()`.
- [ ] `<svg>` has `role="img"` and `aria-label="Brand logo"` if decorative; otherwise `<title>` inside.
- [ ] `stroke-dasharray` animation only runs once (on mount or first scroll into view); never re-triggers on every scroll pass.
- [ ] Reduced-motion users get a fade-in, not a draw.

**Done when.** Logo draws on first mount, freezes at full visibility, re-draws only on intentional re-mount (route change), and reduced-motion users see a fade.

#### LLM/agent-facing version

**Files to create.**
- `components/LogoIntro.tsx` — accepts `paths` array; uses GSAP DrawSVGPlugin.
- `lib/svg-init.ts` — computes `getTotalLength()` for each path on mount; sets CSS variables.

**Pseudocode.**

```ts
// lib/svg-init.ts
export function initSvgPaths(svg: SVGSVGElement) {
  const paths = svg.querySelectorAll<SVGPathElement>('path[data-animate]');
  paths.forEach((p, i) => {
    const len = p.getTotalLength();
    p.style.setProperty('--len', `${len}`);
    p.style.strokeDasharray = `${len}`;
    p.style.strokeDashoffset = `${len}`;
  });
  return paths;
}
```

```tsx
// components/LogoIntro.tsx
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { initSvgPaths } from '@/lib/svg-init';

gsap.registerPlugin(DrawSVGPlugin);

export function LogoIntro({ children }: { children: React.ReactNode }) {
  const ref = useRef<SVGSVGElement>(null);
  useLayoutEffect(() => {
    if (!ref.current) return;
    const paths = initSvgPaths(ref.current);
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      gsap.to(paths, { opacity: 1, duration: 0.08 }); // brief: motion.duration.quick
    } else {
      gsap.to(paths, {
        strokeDashoffset: 0,
        duration: motion.duration.story / 1000, // brief token
        stagger: motion.delay.item / 1000,
        ease: 'power2.out',
      });
    }
  }, []);
  return <svg ref={ref} role="img" aria-label="Brand logo">{children}</svg>;
}
```

**Acceptance criteria.**
- `gsap.registerPlugin(DrawSVGPlugin)` is called once (module-level).
- Each `<path data-animate>` has `style.strokeDasharray` and `style.strokeDashoffset` set after mount.
- `matchMedia('(prefers-reduced-motion: reduce)').matches === true` ⇒ the animation is `opacity` only.
- `gsap.killTweensOf(paths)` runs on unmount.

**Forbidden patterns.**
- Re-running the draw on every scroll pass (one-shot; use `ScrollTrigger` `toggleActions: 'play none none none'`).
- Animating `stroke-dasharray` itself (animate `stroke-dashoffset`).
- Using `<img src="logo.svg">` for animated logos (must be inline `<svg>`).
- Setting `stroke` and `fill` in the SVG markup (use `currentColor` so themes work).

---

### Kind (v) — Lottie / dotLottie

#### Human-facing version

**Pre-flight.** Lottie animations come from After Effects (via Bodymovin), LottieLab, or the LottieFiles marketplace. Verify the file size: a typical icon Lottie is ≤ 20 KB; an illustration ≤ 200 KB; anything > 500 KB needs compression (LottieFiles' own compression tool) or a dotLottie archive. For interactive state machines (button hover, multi-state UI), use **dotLottie** or **Rive** — Lottie itself has no state logic.

**Stack choice.**
1. **lottie-web** (MIT, Airbnb, 32k stars) — the canonical Lottie runtime. Works for After Effects JSON.
2. **dotLottie-web** (MIT, LottieFiles, 836 stars) — modern runtime with `.lottie` archive support, Rust+WASM core, state machines, audio. Smaller files (90% smaller than GIF equivalent per angle B B.6).
3. **Rive** (MIT runtime, SaaS editor) — if you need state-machine interactivity built into the file.

For React: `lottie-react` or `@lottiefiles/dotlottie-react`. For vanilla: load the script from CDN and call `lottie.loadAnimation({...})`.

Install: `npm i lottie-react @lottiefiles/dotlottie-react`.

**Project scaffold.**

```
src/
├── components/
│   ├── LottieIcon.tsx           ← dotLottie with state machine
│   └── LottieLoader.tsx         ← animated loader for preloads
├── assets/
│   ├── icon.lottie              ← dotLottie archive (≤ 20 KB)
│   └── loader.json              ← classic Lottie JSON
└── lib/
    └── lottie-config.ts         ← frame rate, autoplay defaults
```

**Implementation phases.**

1. **Source the file.** Prefer `.lottie` (dotLottie archive) for new assets. Compress JSON to gzipped delivery via CDN (LottieFiles does this by default).
2. **Initialize the animation.** `const anim = lottie.loadAnimation({ container: ref.current, renderer: 'svg', loop: true, autoplay: true, path: '/icon.json' })`. SVG renderer is the safest cross-browser default; canvas is faster for > 60 fps but loses accessibility text.
3. **State machines (dotLottie).** dotLottie supports state transitions via the player API: `player.stateMachine.start('hover')`. Use for buttons (idle / hover / press states) — replaces Lottie's no-state limitation.
4. **Trigger on scroll.** Use IntersectionObserver to load and play only when the icon scrolls into view. `anim.playSegments([0, 60], true)` for partial loops.
5. **Reduced-motion.** Skip autoplay, render the first frame statically. Use `prefers-reduced-motion` to gate `autoplay`.
6. **Cleanup.** `anim.destroy()` on unmount — leaks otherwise.

**Performance & accessibility checklist.**
- [ ] File size ≤ 20 KB for icons; ≤ 200 KB for illustrations; dotLottie preferred.
- [ ] SVG renderer (not canvas) for accessibility.
- [ ] `prefers-reduced-motion: reduce` ⇒ no autoplay; show first frame.
- [ ] On unmount: `anim.destroy()`.
- [ ] `<svg>` produced by Lottie has `role="img"` and `aria-label` from the source AE export.

**Done when.** Animation plays at the design FPS; pauses when offscreen; reduced-motion users see the static frame; bundle impact ≤ 20 KB per icon.

#### LLM/agent-facing version

**Files to create.**
- `components/LottieIcon.tsx` — wraps `@lottiefiles/dotlottie-react` `<DotLottieReact>`.
- `components/LottieLoader.tsx` — wraps `lottie-react` for the classic JSON path.

**Pseudocode.**

```tsx
// components/LottieIcon.tsx
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useEffect, useRef } from 'react';

export function LottieIcon({ src, label, autoplay = true }: { src: string; label: string; autoplay?: boolean }) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  return (
    <DotLottieReact
      src={src}
      autoplay={autoplay && !reduced}
      loop={false}
      aria-label={label}
      style={{ width: 48, height: 48 }}
    />
  );
}
```

```tsx
// components/LottieLoader.tsx — load-on-intersect
'use client';
import Lottie from 'lottie-react';
import { useEffect, useRef, useState } from 'react';

export function LottieLoader({ data, label }: { data: object; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.1 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} aria-label={label}>{visible && <Lottie animationData={data} loop autoplay />}</div>;
}
```

**Acceptance criteria.**
- `data` JSON parses to a valid Lottie object with `v`, `ip`, `op`, `fr`, `layers`.
- After unmount, no RAF loop is running (check via `requestAnimationFrame` count or the lib's destroy hook).
- `prefers-reduced-motion: reduce` ⇒ the Lottie SVG renders the first frame without animating.

**Forbidden patterns.**
- `lottie.loadAnimation` without `destroy()` on unmount.
- Lottie files > 500 KB (compress via LottieFiles or use dotLottie).
- Autoplay on the entire page load (defer until the element scrolls into view).
- Canvas renderer for icons that need accessibility (use SVG renderer).
- Hardcoded `autoplay: true` without reduced-motion gating.

---

### Kind (vi) — Typography / kinetic text (SplitType / GSAP SplitText / Splitting.js)

#### Human-facing version

**Pre-flight.** Decide the split granularity: characters (most expressive), words, lines (most readable). Decide the trigger: scroll (reveal as user scrolls), hover (play on hover), mount (intro animation). Get the font loaded early — FOUT/FOIT kills kinetic text animations because they restart when the font swaps.

**Stack choice.**
1. **SplitType** (MIT, lukePeavey/SplitType) — modern, character-level, MIT, recommended by the Motion team.
2. **GSAP SplitText** (now free per angle B) — `new SplitText('.heading', { type: 'chars,words,lines' })`. Pairs natively with ScrollTrigger.
3. **Splitting.js** (MIT, shshaw) — JS calculates, CSS animates. ~3 KB. Good for CSS-only sites.

For React/Next.js, default to SplitType. For GSAP sites, default to SplitText. For minimal CSS-only sites, use Splitting.js.

Install: `npm i split-type` (or `npm i gsap` if using SplitText — bundled since 2024 free release).

**Project scaffold.**

```
src/
├── components/
│   ├── KineticHeading.tsx       ← chars split + GSAP timeline
│   └── TextReveal.tsx           ← Splitting.js + CSS animation
└── styles/
    └── kinetic-text.css         ← initial hidden state, char transforms
```

**Implementation phases.**

1. **Font loading.** Use `<link rel="preload" as="font" crossorigin>` for the display font. Use `font-display: swap` and a system fallback of `motion.duration.base` to avoid layout shift. Check `brief.md:65` type-scale for the right sizes.
2. **Split the text.** On mount, after the font is ready (`document.fonts.ready`), call `new SplitType('.heading', { types: 'chars,words,lines' })`. Each char gets a `<div>` wrapper — DOM grows ~80× for an 80-char headline.
3. **Animate per char.** GSAP: `gsap.from(chars, { y: motion.distance.md, opacity: 0, stagger: motion.delay.item / 1000, duration: motion.duration.base / 1000 })`. The brief's `motion.easing.enter` is `cubic-bezier(0.16, 1, 0.3, 1)` — GSAP doesn't ship that exact curve; use `power4.out` or `'expo.out'` as the closest.
4. **Scroll trigger.** `scrollTrigger: { trigger: heading, start: 'top 80%' }` — the heading reveals when its top hits 80% of the viewport.
5. **Reduced-motion.** Set `chars { opacity: 0 }` → reveal all chars instantly on mount (no translate, no stagger). Brief: `motion.distance.none`.
6. **Cleanup.** `splitInstance.revert()` on unmount — restores the original DOM.

**Performance & accessibility checklist.**
- [ ] Font is preloaded (`<link rel="preload" as="font" crossorigin>`) and `font-display: swap`.
- [ ] DOM growth ≤ 200 chars per headline (split granularity trades off readability vs cost).
- [ ] `prefers-reduced-motion: reduce` ⇒ chars reveal as a single fade with no translate.
- [ ] Heading remains readable when JS is disabled (split library has SSR fallback).
- [ ] Tab order follows reading order (chars are decorative wrappers).

**Done when.** Heading reveals per char/word as the user scrolls; reduced-motion users see the static heading; no layout shift on font load; tabbing through the page reads the heading as one continuous text node.

#### LLM/agent-facing version

**Files to create.**
- `components/KineticHeading.tsx` — wraps `<h1>` and applies SplitType on mount.
- `lib/split-config.ts` — defaults for split granularity and animation tokens.

**Pseudocode.**

```tsx
// components/KineticHeading.tsx
'use client';
import { useLayoutEffect, useRef } from 'react';
import SplitType from 'split-type';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from '@/styles/motion-tokens';

gsap.registerPlugin(ScrollTrigger);

export function KineticHeading({ text, trigger = true }: { text: string; trigger?: boolean }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useLayoutEffect(() => {
    if (!ref.current) return;
    const split = new SplitType(ref.current, { types: 'chars,words,lines' });
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      gsap.set(split.chars, { opacity: 1 });
      return () => split.revert();
    }
    const tween = gsap.from(split.chars, {
      y: motion.distance.md,
      opacity: 0,
      stagger: motion.delay.item / 1000,
      duration: motion.duration.base / 1000,
      ease: 'expo.out',
      scrollTrigger: trigger ? { trigger: ref.current, start: 'top 80%' } : undefined,
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      split.revert();
    };
  }, [trigger]);
  return <h1 ref={ref}>{text}</h1>;
}
```

**Acceptance criteria.**
- After mount, `ref.current.querySelectorAll('.char').length === text.length` (within `±1` for ligatures).
- `ScrollTrigger.getAll().every(t => t.trigger === ref.current || !t.trigger)` — no orphan triggers after unmount.
- `split.revert()` is called on unmount (DOM returns to original).
- Reduced-motion: `gsap.set(split.chars, { opacity: 1 })` runs immediately.

**Forbidden patterns.**
- Splitting before `document.fonts.ready` (chars measure against the fallback font).
- Per-frame character animation (split-then-tween is one-shot; not a per-frame update).
- `chars` count > 200 per headline (DOM cost).
- Animating `letter-spacing` per frame (causes layout reflow).
- Missing `split.revert()` on unmount.

---

### Kind (vii) — Page transition (Barba.js / Swup / View Transitions API)

#### Human-facing version

**Pre-flight.** Decide whether the site is a SPA (one HTML document, JS-driven navigation) or MPA (multi-page, server-rendered). View Transitions API works for both. Barba.js and Swup are SPA-only.

**Stack choice.**
1. **Native View Transitions API** (`document.startViewTransition`) — 0 KB, Chrome 111+/Edge 111+/Safari 18+ (Firefox stable gap as of 2026-Q3). Free, native performance, no JS deps.
2. **Swup** (MIT, 5.2k stars) — plugin ecosystem, scroll restoration, cache. SSR-friendly.
3. **Barba.js** (MIT, legacy v3) — older, lower commit frequency. Use only for legacy integrations.
4. **Motion `<AnimatePresence>`** (MIT, React-only) — for React SPAs.

For a greenfield React/Next.js site, default to native View Transitions API (with feature detection for Firefox). For SSR-heavy sites, default to Swup. For Next.js App Router, View Transitions API integrates with the `<Link>` component via the experimental `unstable_ViewTransition` API.

Install: `npm i swup` (or no install for native).

**Project scaffold.**

```
src/
├── app/
│   ├── layout.tsx               ← <ViewTransition> wrapper
│   └── page.tsx
├── components/
│   ├── PageLink.tsx             ← intercepts clicks, calls startViewTransition
│   └── TransitionName.tsx       ← assigns view-transition-name to hero media
└── styles/
    └── view-transitions.css     ← ::view-transition-* pseudo-element styles
```

**Implementation phases.**

1. **Mark transitioning elements.** On the source page and the destination page, give the same element (e.g. hero `<img>`) the same `view-transition-name: hero-media`. Different `view-transition-name` per route if you want the layout to morph.
2. **Intercept clicks.** On a `<a>`, prevent default, then call `document.startViewTransition(() => navigate(href))`. Inside the callback, do any DOM prep (remove old `<main>`, mount new one). The browser handles the cross-fade.
3. **Style the transitions.** Use `::view-transition-old(root)`, `::view-transition-new(root)`, and named transitions like `::view-transition-group(hero-media)` in CSS. Animate `transform` and `opacity` only.
4. **Fallback for Firefox.** Wrap the call: `if (!document.startViewTransition) { location.href = href; return; }`. Firefox users get a normal page load with no transition.
5. **Reduced-motion.** View Transitions API respects `prefers-reduced-motion: reduce` automatically — animations become instant crossfades. No special handling needed.
6. **Scroll restoration.** Use `history.scrollRestoration = 'manual'` and restore via `window.scrollTo(0, savedY)` inside the `startViewTransition` callback.

**Performance & accessibility checklist.**
- [ ] Feature detection: `if (!document.startViewTransition) location.href = href;`.
- [ ] No animations in `::view-transition-*` that animate layout properties.
- [ ] Focus is moved to the new page's `<h1>` on navigation.
- [ ] `prefers-reduced-motion: reduce` is respected (browser handles this automatically).
- [ ] History API is used (back/forward buttons work).

**Done when.** Clicking an internal link fades the page; the same hero image stays in place across the transition; back button restores the previous page; Firefox users see a normal navigation; reduced-motion users see no transition.

#### LLM/agent-facing version

**Files to create.**
- `components/PageLink.tsx` — intercepts click events, calls `document.startViewTransition`.
- `styles/view-transitions.css` — `::view-transition-*` styles.

**Pseudocode.**

```tsx
// components/PageLink.tsx
'use client';
import { useRouter } from 'next/navigation';

export function PageLink({ href, children }: { href: string; children: React.ReactNode }) {
  const router = useRouter();
  const onClick = (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return; // let the browser handle modifier-click
    e.preventDefault();
    if (!document.startViewTransition) {
      router.push(href);
      return;
    }
    document.startViewTransition(() => router.push(href));
  };
  return <a href={href} onClick={onClick}>{children}</a>;
}
```

```css
/* styles/view-transitions.css */
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 220ms; /* brief: motion.duration.base */
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); /* brief: motion.easing.enter */
}

@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(root),
  ::view-transition-new(root) { animation-duration: 0ms; }
}
```

**Acceptance criteria.**
- `'startViewTransition' in document` is checked before invoking.
- `router.push(href)` runs inside the `startViewTransition` callback (not before).
- Modifier-clicks (`Cmd`/`Ctrl`/`Shift`) bypass the transition.
- Same `view-transition-name` is present on source and destination for the same logical element.

**Forbidden patterns.**
- Animating `width`/`height`/`top`/`left` inside `::view-transition-*` (compositor only).
- Forgetting the Firefox fallback (causes broken navigation for ~3% of users).
- Calling `document.startViewTransition` on every `useEffect` mount (only on user-initiated navigation).
- Modifying `history.scrollRestoration` after the page has loaded (set at top of `<head>`).

---

### Kind (viii) — Micro-interactions / hover effects (Motion One / Framer Motion / "Motion")

#### Human-facing version

**Pre-flight.** Micro-interactions are short, near-element, and frequent. They must not exceed `motion.duration.base` (220 ms) for entrance and `motion.duration.fast` (140 ms) for exit. Brief: hover/feedback is the most common motion class — it must be instant, not cinematic.

**Stack choice.**
1. **Motion** (MIT, motion.dev, was Framer Motion) — `motion/react` for React, `motion` for vanilla JS. Spring physics, layout animations, gestures.
2. **Motion One** (MIT) — lower-level, ~3.8 KB, vanilla JS only.
3. **CSS-only** — `transition: transform 140ms cubic-bezier(0.2, 0, 0, 1)` — 0 KB. Adequate for hover-only effects.
4. **GSAP** (MIT, now free) — overkill for micro-interactions but pairs well if GSAP is already on the page.

For React, default to Motion. For zero-JS sites, default to CSS transitions.

Install: `npm i motion`.

**Project scaffold.**

```
src/
├── components/
│   ├── MagneticButton.tsx       ← pointer-tracking tilt
│   ├── HoverCard.tsx            ← scale + shadow on hover
│   └── PressFeedback.tsx        ← :active scale-down
└── styles/
    └── micro-interactions.css   ← hover/focus base styles
```

**Implementation phases.**

1. **CSS baseline.** Use `:hover`, `:focus-visible`, `:active` for the input primitives. Tailwind's `hover:` / `focus-visible:` are fine. Avoid `:focus` (browser default focus rings stay; only add styles for `:focus-visible`).
2. **JS-only when CSS is insufficient.** Magnetic buttons, pointer-tracking cursors, drag-to-reorder — these need JS. Motion provides `whileHover`, `whileTap`, `whileFocus` props.
3. **Use named motion tokens.** `transition: transform 140ms cubic-bezier(0.2, 0, 0, 1)` matches the brief's `motion.duration.fast` and `motion.easing.standard`. Do not invent new easing curves per component.
4. **Pointer gating.** Hide hover-only effects on `(pointer: coarse)` and `(hover: none)` devices — touch users don't hover.
5. **Reduced-motion.** Replace `translateY` and `scale` with `opacity` and `color` only. Brief: `motion.distance.none` for any translate/scale.

**Performance & accessibility checklist.**
- [ ] Hover effects gated by `(hover: hover) and (pointer: fine)`.
- [ ] `:focus-visible` provides a non-motion focus ring (visible even with reduced motion).
- [ ] `prefers-reduced-motion: reduce` ⇒ opacity/color changes only, no transform.
- [ ] Touch targets ≥ 44×44 px (brief.md:117, WCAG 2.5.5).
- [ ] `transition-property` only `transform`, `opacity`, `filter`, `background-color`, `color`, `border-color`.

**Done when.** Buttons feel responsive at `motion.duration.fast`; focus rings are visible; touch users see no awkward hover state; reduced-motion users see the change without movement.

#### LLM/agent-facing version

**Files to create.**
- `components/HoverCard.tsx` — Motion `<motion.div whileHover={...}>`.
- `styles/micro-interactions.css` — base hover/focus styles.

**Pseudocode.**

```tsx
// components/HoverCard.tsx
'use client';
import { motion } from 'motion/react';

export function HoverCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.14, ease: [0.2, 0, 0, 1] }} // brief: motion.duration.fast + motion.easing.standard
      style={{ willChange: 'transform' }}
    >
      {children}
    </motion.div>
  );
}
```

```css
/* styles/micro-interactions.css */
@media (hover: hover) and (pointer: fine) {
  .hover-target:hover { transform: translateY(-4px); }
}

@media (prefers-reduced-motion: reduce) {
  .hover-target { transform: none !important; transition: none !important; }
}
```

**Acceptance criteria.**
- All hover styles are inside `@media (hover: hover) and (pointer: fine)`.
- All focus styles use `:focus-visible`, not `:focus`.
- `transition-property` is restricted to `transform`, `opacity`, `filter`, `background-color`, `color`, `border-color`.
- Touch targets measured ≥ 44×44 px.

**Forbidden patterns.**
- `:hover` styles without a `(hover: hover)` media query gate.
- Hover-only actions (no keyboard equivalent).
- `transition: all` (over-animates properties you didn't intend).
- Animating `width`/`height`/`margin` on a button (use `transform: scale()`).

---

### Kind (ix) — Generative / procedural background (p5.js / GLSL shader / OGL)

#### Human-facing version

**Pre-flight.** Generative backgrounds run continuously, often at 60 fps. Cap concurrent visible animation tracks (`motion.limit.concurrent = 8`); one full-viewport canvas/WebGL scene at most. Decide whether the background reacts to scroll, pointer, or runs autonomously.

**Stack choice.**
1. **p5.js** (LGPL-2.1, weak copyleft — verify before redistributing modifications).
2. **OGL** (MIT, oframe/ogl) — minimal WebGL framework, ~25 KB, tree-shakable. Ideal for hero shaders.
3. **Three.js + custom GLSL / TSL** — if you already have Three.js.
4. **Shadertoy ports** — reference only, not exportable.

Install: `npm i ogl` or `npm i three` (with shader material).

**Project scaffold.**

```
src/
├── components/
│   ├── GenerativeBackground.tsx ← OGL Renderer + program
│   └── shaders/
│       ├── background.vert
│       └── background.frag
└── lib/
    └── uniform-sync.ts          ← binds pointer/scroll to uniforms
```

**Implementation phases.**

1. **Choose shader source.** Author GLSL in a `.frag` file or inline as a string. Test in Shadertoy or glslsandbox first; then port.
2. **Mount the canvas.** `<canvas>` full-viewport, fixed position behind content (`z-index: -1; pointer-events: none`). Use `position: fixed; inset: 0;` so the background doesn't scroll-clip.
3. **Bind uniforms.** Pointer position (`mousemove`), scroll position (RAF read of `window.scrollY`), time (`performance.now() * 0.001`). Pass to the shader as `uniform vec2 uMouse;`.
4. **Performance.** Use `frameloop="demand"` only if the shader doesn't animate without input. If it does, leave `frameloop="always"` but pause on `document.visibilitychange === 'hidden'`.
5. **Reduced-motion.** Replace the time-driven animation with a static image of the same scene at `t = 0`. Or pause the RAF loop entirely.

**Performance & accessibility checklist.**
- [ ] Canvas is `position: fixed` (or `position: absolute; inset: 0`) and behind content.
- [ ] Canvas has `pointer-events: none` so it doesn't block UI.
- [ ] Render loop pauses on `visibilitychange === 'hidden'`.
- [ ] Shader uniform updates are batched (one `gl.uniform1f(loc, t)` call per frame, not per mouse move).
- [ ] Reduced-motion users see a static frame or no canvas.

**Done when.** Background animates smoothly at 60 fps on desktop, 30 fps on mobile; pauses offscreen; reduced-motion users see no animation.

#### LLM/agent-facing version

**Files to create.**
- `components/GenerativeBackground.tsx` — OGL Renderer with quad geometry + Shader program.
- `shaders/background.frag` — GLSL source.

**Pseudocode.**

```ts
// components/GenerativeBackground.tsx
import { Renderer, Camera, Transform, Plane, Program, Mesh } from 'ogl';

const vertex = `
  attribute vec2 uv;
  attribute vec3 position;
  varying vec2 vUv;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = `
  precision highp float;
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;
  void main() {
    vec2 uv = vUv + uMouse * 0.05;
    float n = sin(uv.x * 10.0 + uTime * 0.5) * sin(uv.y * 10.0 + uTime * 0.3);
    gl_FragColor = vec4(vec3(0.5 + n * 0.5), 1.0);
  }
`;

export function GenerativeBackground() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const renderer = new Renderer({ canvas: ref.current, dpr: Math.min(window.devicePixelRatio, 2) });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 1);
    const camera = new Camera(gl, { orthographic: true });
    const scene = new Transform();
    const program = new Program(gl, { vertex, fragment, uniforms: { uTime: { value: 0 }, uMouse: { value: [0, 0] } } });
    const mesh = new Mesh(gl, { geometry: new Plane(gl, { width: 2, height: 2 }), program });
    mesh.setParent(scene);
    const onMove = (e: MouseEvent) => (program.uniforms.uMouse.value = [e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight]);
    window.addEventListener('mousemove', onMove);
    let raf = 0;
    const tick = (t: number) => {
      program.uniforms.uTime.value = t * 0.001;
      renderer.render({ scene, camera });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const onVis = () => (document.visibilityState === 'hidden' ? cancelAnimationFrame(raf) : (raf = requestAnimationFrame(tick)));
    document.addEventListener('visibilitychange', onVis);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);
  return <canvas ref={ref} style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }} aria-hidden />;
}
```

**Acceptance criteria.**
- Canvas has `position: fixed; inset: 0; z-index: -1; pointer-events: none;` and `aria-hidden`.
- `requestAnimationFrame` is cancelled on unmount and on `visibilitychange`.
- `dpr` is capped at `Math.min(window.devicePixelRatio, 2)`.

**Forbidden patterns.**
- Shader code that reads `getBoundingClientRect()` per frame.
- Unbounded `gl_PointSize` (mobile GPUs choke on > 64 px).
- Animating without a `visibilitychange` pause.
- Permanent `will-change: transform` on the canvas.
- Multiple stacked full-viewport canvases (one is `motion.limit.full-viewport-scenes = 1`).

---

### Kind (x) — Animated data visualization (D3 + GSAP / Observable Plot + Motion)

#### Human-facing version

**Pre-flight.** Data viz animation is for *encoding transitions* — when the underlying data changes (filter applied, year changed), the marks animate to their new positions. Animation is not for flair; it's for cognitive continuity.

**Stack choice.**
1. **D3.js** (ISC) for layout + scales; **GSAP** for the animation timeline. Standard pairing.
2. **Observable Plot** (ISC) for higher-level charts; **Motion** for transitions.
3. **Visx** (MIT, Airbnb) — D3 primitives as React components.
4. **Recharts / Nivo / Victory** — higher-level React chart libs with built-in animation.

Install: `npm i d3 gsap` or `npm i @observablehq/plot motion`.

**Project scaffold.**

```
src/
├── components/
│   ├── AnimatedBarChart.tsx
│   ├── AnimatedLineChart.tsx
│   └── use-data-transition.ts   ← d3 transitions + GSAP timeline
└── lib/
    └── scales.ts                ← shared scale functions for animation continuity
```

**Implementation phases.**

1. **Compute scales once.** Scales (`scaleLinear`, `scaleBand`) are tied to the data; recompute on data change. Memoize with `useMemo` keyed on the data.
2. **Initial render.** Render the chart with the first dataset. No entrance animation — the chart appears static.
3. **Data transition.** On `data` change, compute the new positions; use D3's `selection.transition().duration(motion.duration.base).ease(d3.easeCubicOut)` (closest to `motion.easing.standard` = `cubic-bezier(0.2, 0, 0, 1)`) or GSAP's `gsap.to(bars, { y: newY, duration: motion.duration.base / 1000 })`.
4. **Annotation.** Highlight callouts on hover or filter. GSAP timelines chain the highlight + the mark transition.
5. **Axes & labels.** Never animate axes or labels (cognitive anchor; brief: "preserve axes and labels; never use motion as the only distinction"). Animate only the marks (bars, points, lines).
6. **Reduced-motion.** Replace the mark transition with `opacity` fade over `motion.duration.quick`. Brief: `motion.distance.none` for any translate.

**Performance & accessibility checklist.**
- [ ] Scales memoized; no recomputation on unrelated re-renders.
- [ ] Axes/labels do not animate.
- [ ] Color is paired with shape/label for color-blind safety (brief.md:42).
- [ ] `prefers-reduced-motion: reduce` ⇒ opacity-only transitions.
- [ ] `<svg>` chart has `role="img"` and `aria-label="Bar chart of X"`; data table fallback below.

**Done when.** Data updates animate marks to new positions; axes stay still; reduced-motion users see the change as a cross-fade; data is available as a `<table>` for screen readers.

#### LLM/agent-facing version

**Files to create.**
- `components/AnimatedBarChart.tsx` — D3 + React + GSAP.
- `lib/use-data-transition.ts` — `useDataTransition(data, key)` hook.

**Pseudocode.**

```tsx
// components/AnimatedBarChart.tsx
'use client';
import { useEffect, useMemo, useRef } from 'react';
import * as d3 from 'd3';
import gsap from 'gsap';
import { motion } from '@/styles/motion-tokens';

export function AnimatedBarChart({ data }: { data: { label: string; value: number }[] }) {
  const ref = useRef<SVGSVGElement>(null);
  const scales = useMemo(() => ({
    x: d3.scaleBand().domain(data.map(d => d.label)).range([0, 600]).padding(0.1),
    y: d3.scaleLinear().domain([0, d3.max(data, d => d.value) ?? 1]).range([400, 0]),
  }), [data]);
  useEffect(() => {
    if (!ref.current) return;
    const bars = d3.select(ref.current).selectAll<SVGRectElement, typeof data[0]>('rect.bar').data(data);
    bars.exit().remove();
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    bars.transition().duration(reduced ? motion.duration.quick : motion.duration.base).ease(d3.easeCubicOut)
      .attr('x', d => scales.x(d.label) ?? 0)
      .attr('y', d => scales.y(d.value))
      .attr('width', scales.x.bandwidth())
      .attr('height', d => 400 - scales.y(d.value));
    bars.enter().append('rect').attr('class', 'bar').attr('fill', 'steelblue').attr('x', d => scales.x(d.label) ?? 0).attr('width', scales.x.bandwidth()).attr('y', scales.y(0)).attr('height', 0)
      .transition().duration(reduced ? motion.duration.quick : motion.duration.base)
      .attr('y', d => scales.y(d.value))
      .attr('height', d => 400 - scales.y(d.value));
  }, [data, scales]);
  return (
    <svg ref={ref} viewBox="0 0 600 400" role="img" aria-label="Bar chart">
      {/* axes rendered once, never animated */}
    </svg>
  );
}
```

**Acceptance criteria.**
- `scales` is memoized; recomputation only on `data` change.
- `data` enter/update/exit pattern; no orphan bars.
- Axes (in `<g class="axes">`) have no transition attribute.
- `prefers-reduced-motion: reduce` ⇒ transition duration = `motion.duration.quick` (~80 ms), no movement.

**Forbidden patterns.**
- Animating axes or labels.
- Per-frame layout reads inside the transition.
- Re-rendering the entire SVG on data change (use D3 enter/update/exit).
- Color as the only differentiator (pair with label/position).

---

### Kind (xi) — Interactive 3D hero (Spline + React, or `<model-viewer>`)

#### Human-facing version

**Pre-flight.** Spline is a no-code 3D authoring tool that exports a React component (`@splinetool/react-spline`) or a vanilla `<spline-viewer>` web component. `<model-viewer>` is Google's web component for embedding glTF models with AR support. Spline is design-friendly but proprietary; `<model-viewer>` is Apache-2.0 and standards-aligned.

**Stack choice.**
1. **Spline + `@splinetool/react-spline`** — if a designer authors the scene in Spline. MIT runtime, SaaS editor (free tier, Pro from $44/mo per angle B B.3).
2. **`<model-viewer>`** (Apache-2.0, 8.2k stars) — for a glTF asset + AR. Lighter than Spline for product viewers.
3. **Raw Three.js + R3F** — if you need full code control (covered in kind ii).

Install: `npm i @splinetool/react-spline` or use `<script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/...">` for `<model-viewer>`.

**Project scaffold.**

```
src/
├── app/
│   └── page.tsx
├── components/
│   ├── SplineHero.tsx           ← dynamic-imported
│   └── ModelViewerHero.tsx      ← <model-viewer>
└── styles/
    └── hero.css
```

**Implementation phases.**

1. **Choose tool.** Spline if the designer authors; `<model-viewer>` if the asset is a static glTF.
2. **Lazy-load.** Spline's runtime is ~3 MB. Use `next/dynamic` with `ssr: false` and a poster image fallback.
3. **Reduce scope.** Spline scenes should be ≤ 50k polys, ≤ 4 MB textures. Use LOD models for mobile.
4. **Pause on offscreen.** Spline runs the render loop on a canvas; pause via `splineApp.pause?.()` or by unmounting the component via IntersectionObserver.
5. **Reduced-motion.** Pause the Spline scene and present the poster.

**Performance & accessibility checklist.**
- [ ] Scene lazy-loaded with poster fallback.
- [ ] Pause on offscreen (`IntersectionObserver` ratio < 0.1).
- [ ] `<model-viewer>` has `alt="..."` on the model element.
- [ ] Reduced-motion ⇒ poster image, no animation.

**Done when.** Hero is interactive at 60 fps on desktop, 30 fps on mobile; pauses when scrolled past; reduced-motion users see the poster.

#### LLM/agent-facing version

**Files to create.**
- `components/SplineHero.tsx` — dynamic-imported.
- `lib/spline-events.ts` — `onLoad`, `onError`, `onMouseDown` Spline event handlers.

**Pseudocode.**

```tsx
// components/SplineHero.tsx (with poster fallback)
import dynamic from 'next/dynamic';
const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false });

export function SplineHero({ scene }: { scene: string }) {
  const onLoad = (app: any) => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) app.pause?.();
  };
  return (
    <Spline scene={scene} onLoad={onLoad} style={{ width: '100%', height: '100vh' }} />
  );
}
```

**Acceptance criteria.**
- Spline is `dynamic(...)` with `ssr: false`.
- `onLoad` fires before any frame is rendered (verify via console).
- `app.pause()` runs on `prefers-reduced-motion: reduce`.

**Forbidden patterns.**
- Bundling Spline into the main JS chunk (use `dynamic` import).
- Running the render loop on offscreen canvas.
- Spline scene > 4 MB without LOD fallback.

---

### Kind (xii) — Audio-reactive visual (Tone.js + p5 / Web Audio API + GLSL)

#### Human-facing version

**Pre-flight.** Audio reactivity requires user gesture (browser autoplay policy). On first paint, render a static visualization and a "Tap to enable audio" button. Once tapped, hook `getUserMedia` for microphone input or `new Audio()` + `MediaElementAudioSourceNode` for `<audio>` playback.

**Stack choice.**
1. **Tone.js** (MIT) — high-level audio framework. `Tone.Analyser` → FFT bins → uniforms.
2. **Web Audio API** native — `AudioContext`, `AnalyserNode`, `MediaElementAudioSourceNode`. No deps, ~50 lines.
3. **p5.js + p5.sound** (LGPL-2.1) — for generative visuals bound to audio.

Install: `npm i tone` or use native Web Audio.

**Project scaffold.**

```
src/
├── components/
│   ├── AudioReactiveVisual.tsx
│   ├── EnableAudioButton.tsx    ← gates audio context start
│   └── shaders/audio.frag       ← frequency-driven uniforms
└── lib/
    └── audio-context.ts         ← singleton AudioContext
```

**Implementation phases.**

1. **Gate behind a user gesture.** Render `<EnableAudioButton onClick={start} />` first. On click, `await Tone.start()` (or `audioContext.resume()` for native).
2. **FFT analysis.** `Tone.getDestination().connect(new Tone.Analyser('fft', 256))` returns frequency bins. Average low/mid/high for shader uniforms.
3. **Bind to visuals.** Pass `uLow`, `uMid`, `uHigh` to a GLSL shader that drives particle positions / mesh distortion / color.
4. **Visualization types.** Waveform (time domain), frequency bars (FFT), 3D mesh displacement (custom).
5. **Reduced-motion.** Render a static equalizer (a row of bars at fixed heights) — the visual still responds to audio, but no auto-animation. Brief: animation is the visual's purpose, so the "reduced" version is a non-animated static state.
6. **Cleanup.** `audioContext.close()` on unmount.

**Performance & accessibility checklist.**
- [ ] Audio starts only on user gesture (`click`/`keydown`).
- [ ] `<audio>` has `controls` and `aria-label`.
- [ ] Visual has a non-audio fallback (static equalizer or off).
- [ ] Reduced-motion users see a static equalizer.
- [ ] Audio context is closed on unmount.

**Done when.** Clicking "Enable audio" starts the visual; FFT bins drive uniforms in real time; reduced-motion users see a static state; audio context is cleaned up on unmount.

#### LLM/agent-facing version

**Files to create.**
- `components/AudioReactiveVisual.tsx` — Canvas + Web Audio.
- `lib/audio-context.ts` — singleton AudioContext with gating.

**Pseudocode.**

```ts
// lib/audio-context.ts
let ctx: AudioContext | null = null;
export async function startAudio(element: HTMLAudioElement) {
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === 'suspended') await ctx.resume();
  const source = ctx.createMediaElementSource(element);
  const analyser = ctx.createAnalyser();
  analyser.fftSize = 256;
  source.connect(analyser);
  analyser.connect(ctx.destination);
  return analyser;
}
```

```tsx
// components/AudioReactiveVisual.tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import { startAudio } from '@/lib/audio-context';

export function AudioReactiveVisual() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    if (!enabled || !ref.current) return;
    const audio = new Audio('/track.mp3');
    audio.crossOrigin = 'anonymous';
    audio.loop = true;
    let analyser: AnalyserNode;
    let raf = 0;
    startAudio(audio).then((a) => {
      analyser = a;
      audio.play();
      const data = new Uint8Array(analyser.frequencyBinCount);
      const tick = () => {
        analyser.getByteFrequencyData(data);
        // drive uniforms here
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    const onVis = () => (document.visibilityState === 'hidden' ? (audio.pause(), cancelAnimationFrame(raf)) : audio.play());
    document.addEventListener('visibilitychange', onVis);
    return () => {
      cancelAnimationFrame(raf);
      audio.pause();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [enabled]);
  return (
    <>
      {!enabled && <button onClick={() => setEnabled(true)}>Enable audio</button>}
      <canvas ref={ref} style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }} aria-hidden />
    </>
  );
}
```

**Acceptance criteria.**
- `AudioContext` is created on user click, not on mount.
- `audio.crossOrigin = 'anonymous'` is set (required for `createMediaElementSource`).
- Render loop pauses on `visibilitychange === 'hidden'`.
- Reduced-motion users see a static equalizer (or no canvas).

**Forbidden patterns.**
- Starting `AudioContext` without user gesture.
- Autoplay policy violations.
- `MediaElementAudioSourceNode` without `crossOrigin` on the audio element.
- Render loop running while tab is hidden.
- Audio source reuse across multiple `<audio>` elements (one source per `<audio>`).

---

## What to use vs what to avoid — and why

### Use table (≥15 rows)

| # | Pattern | Recommended library / approach | 1-line reason |
|---|---|---|---|
| 1 | Scroll-triggered reveals | **GSAP ScrollTrigger** (MIT, free) | Pinned scenes, scrubbing, timelines — the canonical scroll engine |
| 2 | Native scroll-driven animation | **CSS `animation-timeline: scroll()` / `view()`** | 0 KB; runs on compositor; no JS deps (MDN Baseline expanding) |
| 3 | Smooth scroll | **Lenis** (MIT, darkroomengineering/lenis) | First-class GSAP integration; 15.1k stars; active |
| 4 | 3D in React | **Three.js + React Three Fiber** + Drei (MIT) | The de facto stack; 31.6k stars; ecosystem covers all Three.js features |
| 5 | 3D product viewer, no React | **`<model-viewer>`** (Apache-2.0) | Standards-aligned web component; AR support; small payload |
| 6 | No-code 3D hero | **Spline** + `@splinetool/react-spline` (MIT runtime) | Designer-friendly; export-to-React; free tier + Pro from $44/mo |
| 7 | Lottie playback | **dotLottie-web** (MIT, LottieFiles) | Rust+WASM; `.lottie` archive 90% smaller than GIF; state machines + audio |
| 8 | Vector line drawing | **GSAP DrawSVGPlugin** (now free) | Bundled with GSAP; pairs with ScrollTrigger |
| 9 | Typography split | **SplitType** (MIT) | Character/word/line-level splitting; recommended by Motion team |
| 10 | Page transitions | **Native View Transitions API** + `Document.startViewTransition()` | 0 KB; native performance; Chrome 111+/Edge 111+/Safari 18+ |
| 11 | SSR-friendly page transitions | **Swup** (MIT, 5.2k stars) | Plugin ecosystem; scroll restoration; cache |
| 12 | React UI animations | **Motion** (MIT, motion.dev) | Layout animations; spring physics; gestures; React-first |
| 13 | Minimal vanilla JS animation | **Motion One** (MIT) | ~3.8 KB; no React; same team as Motion |
| 14 | Generative background | **OGL** (MIT) or **Three.js + custom shader** | Minimal WebGL; tree-shakable; shader material in three.js |
| 15 | Audio reactivity | **Tone.js** (MIT) + Web Audio API | High-level audio framework; FFT analyser; no deps for native API |
| 16 | Performance: animate `transform` + `opacity` only | Native CSS `transition` / `animation` | Compositor-only; no layout reflow; brief.md:223 |
| 17 | Reduced-motion gate | `matchMedia('(prefers-reduced-motion: reduce)').matches` | Browser-native; brief.md:201-209 |
| 18 | Image optimization | `<picture>` + AVIF/WebP + `loading="lazy"` + `decoding="async"` | 80% smaller files; prevents CLS |
| 19 | Bundle: minify JS | **Terser** (MIT) | De facto JS minifier; terser.org |
| 20 | Fonts | `font-display: swap` + `<link rel="preload" as="font" crossorigin>` | Prevents FOIT; prevents layout shift on font swap |
| 21 | Color-vision safety | Pair color with shape/label/position (brief.md:42) | Never encode meaning by color alone |
| 22 | Touch targets | ≥ 44×44 px (WCAG 2.5.5, Apple HIG) | Verified at raw:485 |
| 23 | Pause animations when offscreen | `IntersectionObserver` + cancel RAF; `document.visibilitychange` | Battery; brief.md:226 |
| 24 | A11y: keyboard order = DOM order | Don't reorder DOM to match visual order | Brief.md:217 |
| 25 | Mobile gating for hover-only effects | `@media (hover: hover) and (pointer: fine)` | Touch users see no hover state |
| 26 | 3D in Next.js SSR | `next/dynamic(() => import('./Scene'), { ssr: false })` | Verified pattern at raw:879-907 |
| 27 | GPU hints | `will-change: transform` applied immediately before known animation, removed after | MDN; brief.md:227 |
| 28 | LCP optimization | `<img>` poster before canvas; hero media not lazy-loaded | brief.md:229 |
| 29 | RTL-aware motion | `motion-direction: start` / `end` (logical properties) | Brief.md:181 |
| 30 | Concurrency cap | `motion.limit.concurrent = 8`; one full-viewport scene; two ambient loops | Brief.md:224 |

### Avoid table (≥15 rows)

| # | Anti-pattern | Consequence | Fix |
|---|---|---|---|
| 1 | Animating `width` / `height` / `top` / `left` / `margin` / `padding` | Forces layout reflow; tanks INP | Animate `transform` + `opacity` only (brief.md:223; verified at raw:9) |
| 2 | `* { animation-duration: 0.01ms !important }` under `prefers-reduced-motion` | Breaks third-party widgets; leaves scroll-locked state | Target specific selectors per brief.md:201-209 |
| 3 | Permanent `will-change: transform` on every element | Memory bloat; no measurable benefit (brief.md:227) | Apply immediately before known animation; remove on completion |
| 4 | `gsap.ticker.lagSmoothing(0)` without measurement | Disables GSAP's catch-up on tab-switch; can hide jank | Use the default `(500, 33)`; only switch after profiling |
| 5 | ScrollTrigger without `kill()` on unmount | Memory leaks in SPAs; phantom triggers | Always include `return () => tl.scrollTrigger?.kill()` |
| 6 | Multiple full-viewport WebGL canvases stacked | Exceeds `motion.limit.full-viewport-scenes = 1` | One canvas; one shader; pause others |
| 7 | Running render loop when tab is hidden | Drains battery; wastes GPU | `document.visibilitychange` + cancelAnimationFrame |
| 8 | Animating `scroll-behavior: smooth` + Lenis | Conflict between native smooth-scroll and RAF-driven smooth-scroll | Disable native: `document.documentElement.style.scrollBehavior = 'auto'` |
| 9 | Loading uncompressed `.glb` / `.gltf` (no Draco) | 50+ MB asset; kills LCP | Use Draco mesh compression + KTX2 textures |
| 10 | Lottie files > 500 KB without compression | LCP hit; mid-tier mobile struggles | Use dotLottie archive; or LottieFiles' compression tool |
| 11 | PixiJS / Three.js render loop with no offscreen pause | Battery drain; thermal throttling | IntersectionObserver ratio < 0.1 ⇒ cancel RAF |
| 12 | Animating SVG `stroke-dasharray` (vs `stroke-dashoffset`) | Repaints the path; not compositor-only | Animate `stroke-dashoffset` |
| 13 | Animating `letter-spacing` per frame | Causes layout reflow | Use `transform` or fixed `letter-spacing` |
| 14 | Per-frame `getBoundingClientRect()` inside RAF | Forces layout reflow; defeats compositor | Use ResizeObserver; cache dimensions |
| 15 | Hover effects on touch devices | Awkward "sticky hover" state on touch | Gate with `@media (hover: hover) and (pointer: fine)` |
| 16 | `:focus` (vs `:focus-visible`) | Default focus ring shows for mouse clicks | Use `:focus-visible` for keyboard focus styles |
| 17 | Modifier-click without bypass in custom navigation | Cmd-click in new tab fails | `if (e.metaKey || e.ctrlKey || e.shiftKey) return;` |
| 18 | `AudioContext` started on mount (no user gesture) | Browser blocks; silent failure | Gate behind a button click; `await ctx.resume()` |
| 19 | `MediaElementAudioSourceNode` without `crossOrigin` | Tainted canvas; security error | `audio.crossOrigin = 'anonymous'` |
| 20 | Animating canvas `width`/`height` attributes | Triggers re-allocation of the bitmap | Use CSS to size the canvas; set `width`/`height` once |
| 21 | Setting `<img src="logo.svg">` for animated logo | Cannot read `getTotalLength()`; no DOM access | Inline the `<svg>` |
| 22 | PixiJS canvas without `aria-label` | Screen readers announce nothing | Add `aria-label` to the wrapper |
| 23 | Animating `top`/`left` instead of `translate` | Layout reflow; breaks parallax illusion | `transform: translate3d()` |
| 24 | Stagger > 8 items at `motion.delay.item = 60ms` each | 480 ms cascade; feels slow | Cap at `motion.delay.group-cap = 400ms` (brief.md:170) |
| 25 | Re-running the same draw / fade on every scroll pass | Re-triggers animation noise | Use `ScrollTrigger` `toggleActions: 'play none none none'` |
| 26 | Animating `box-shadow` per frame on mobile | Triggers paint; mobile GPUs choke | Animate `filter: drop-shadow()` or use a static shadow |
| 27 | Calling `document.startViewTransition` in a `useEffect` | Triggers on mount, not on navigation | Only call inside click handler |
| 28 | Building a 3D scene without `<Environment>` (IBL) | Materials look wrong (no reflections) | Use Drei's `<Environment preset="..." />` |
| 29 | Using `<Suspense>` boundaries that catch WebGL errors | Blank screen if the 3D scene fails | Wrap canvas in error boundary with poster fallback |
| 30 | Storing GSAP timeline in a `useState` setter | Re-renders on every animation tick; defeats RAF | Store in `useRef` |

---

## Conversion playbook — normal site → animated site (10 steps, ≤1500 words)

A migration plan from a static (or minimally interactive) site to an animated site, with progressive enhancement and section-by-section options.

### Step 1 — Audit current site
Run Lighthouse, axe-core, and WebPageTest on the current site. Capture baseline LCP, INP, CLS, TBT, total JS bundle size, and the number of DOM nodes. Identify the top 3 user flows (e.g. landing → product page → checkout). Audit content density per section: a hero with one CTA benefits more from animation than a dense product grid. Capture the current breakpoint usage and font set. This baseline lets you measure whether motion helped or hurt.

### Step 2 — Pick kinds matching brand + content
Map each section to a kind from angle A's taxonomy. A marketing landing page usually needs (i) scroll-driven editorial + (viii) micro-interactions. A product detail page needs (ii) 3D product showcase + (iv) SVG line animation (logo reveal) + (viii). A portfolio needs (vi) typography + (xi) interactive 3D hero. A dashboard should avoid heavy animation entirely (kind x is the only one relevant). Reject kinds that conflict with the brief's "one dominant moving focal point at a time" rule.

### Step 3 — Motion grammar (from design brief)
Reference `share/design/T-2026-07-29-001/brief.md` for tokens. Pick the `motion.intensity-profile` (Product / Editorial / Playful / Immersive / Data-viz) that matches each section. Product/utility → `quick`-`base`, `xs`-`sm`. Editorial → `base`-`story`, `sm`-`lg`. Write a one-page "motion rules" doc that the design and dev teams share; no ad-hoc duration values.

### Step 4 — Stack choice (incremental vs full rewrite)
For a low-risk migration: add motion progressively. Choose a primary engine (GSAP, Motion, or native CSS — based on angle B's defaults) and ship it as an additive bundle. For a high-effort site rewrite, choose the engine once and refactor component by component. Avoid mixing two engines on the same page; the bundle overhead and animation contention are not worth it.

### Step 5 — Increment strategy A — progressive enhancement (CSS → JS → WebGL)
Layer motion by capability:
1. **CSS only first.** Hover states, focus rings, `prefers-reduced-motion` fallback, image reveal on scroll (via `animation-timeline: view()`). Zero JS cost.
2. **JS next.** Where CSS hits its limits — timelines, scroll-driven scrubbing, kinetic text — add GSAP or Motion. Bundle target: ≤ 80 KB gzipped for the animation engine.
3. **WebGL last.** 3D product showcase, generative background, shader-driven hero. Add R3F or raw Three.js. Bundle target: ≤ 200 KB gzipped for the 3D engine (Three.js + Drei is ~150 KB).
4. **Validate at each layer.** Lighthouse + Playwright smoke tests after each layer; do not stack layer 2 on top of layer 1 without measuring.

### Step 6 — Increment strategy B — section-by-section (hero first, then sub-pages)
If you can't ship a full redesign:
1. **Hero first.** It sets the brand tone and is the highest-traffic section. Ship a single hero with (viii) micro-interactions + (i) one scroll-driven beat. Measure LCP/INP impact.
2. **One long-form page next.** Pick the page with the most editorial content (often an "About" or "Story" page). Apply (i) scrollytelling. Measure.
3. **Interactive 3D last.** Add (ii) 3D product showcase on the highest-value product page. Measure LCP and bundle size impact.
4. **Roll back if needed.** If Lighthouse mobile LCP regresses > 500 ms, the animation is too heavy — reduce concurrent tracks, simplify shaders, or fall back to CSS.

### Step 7 — Perf budget enforcement (Lighthouse CI)
Set budgets in `lighthouserc.json`:
- LCP ≤ 2.5 s on mobile (4× CPU throttle, Slow 4G)
- INP ≤ 200 ms
- CLS ≤ 0.1
- TBT ≤ 200 ms
- Total JS ≤ 200 KB gzipped
- Total CSS ≤ 50 KB gzipped

Block CI if any threshold regresses by > 10%. Track each animation's contribution via performance marks (`performance.mark('hero-anim-start')`, `performance.measure('hero-anim', 'hero-anim-start', 'hero-anim-end')`).

### Step 8 — A11y gates
- **prefers-reduced-motion.** Every kind must implement the brief's reduced-motion mapping (brief.md:201-209). Test with the OS-level reduced-motion toggle on macOS / iOS / Android / Windows.
- **Keyboard.** Tab through every interactive element. The hover state must not be the only signal — focus-visible must show.
- **Screen reader.** Run VoiceOver / NVDA through the animated site. Reading order matches DOM order; live regions announce route changes (kind vii) and game state (kind iii).
- **Color contrast.** All text passes WCAG AA. Animated elements that animate color must end on a contrast-passing state.
- **Touch targets.** ≥ 44×44 px for every interactive element (brief.md:117).

### Step 9 — Regression testing
- **Visual diff.** Playwright + pixelmatch on the hero, scrollytelling page, and product page. Allow ≤ 0.1% pixel diff (animations may shift pixels by sub-pixel rendering).
- **Perf regression.** Lighthouse CI on every PR; block on > 10% regression.
- **A11y audit.** axe-core in CI; block on serious/critical issues.
- **Browser matrix.** Chrome / Edge / Safari / Firefox / mobile Safari / Chrome Android — last 2 versions each. Firefox lacks View Transitions API; verify the fallback (kind vii step 4).
- **Reduced-motion regression.** Snapshot the static layout under reduced motion. If the reduced-motion version differs from a "no JS" snapshot, motion is leaking into the no-motion path.

### Step 10 — Rollout + monitoring
- **Feature flag.** Wrap the motion engine in a flag (`motionEnabled`). Ship to 10% of traffic; compare LCP/INP/CLS/conversion against control.
- **RUM (Real User Monitoring).** web-vitals JS to capture LCP/INP/CLS from real users. Alert on regressions > 10%.
- **Core Web Vitals dashboard.** Track LCP/INP/CLS over time. Brief: do not multiply motion distances on large screens (brief.md:113) — measure separately for 4K.
- **Rollback plan.** One-line CSS toggle: `html { --motion-scale: 0; }` zeroes all `motion.distance.*` tokens via `calc(var(--motion-scale) * <value>)`. Verify the brief's reduced-motion tokens still pass.

---

## Existing solutions (landscape scan)

Build/playbook references for an animated-website builder.

| # | Resource | Type | URL | Use |
|---|---|---|---|---|
| 1 | GSAP docs | Documentation | https://gsap.com/docs/v3 | Canonical API for ScrollTrigger, timelines, easing |
| 2 | MDN — CSS scroll-driven animations | Spec + docs | https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline | `animation-timeline: scroll()` / `view()` reference |
| 3 | MDN — View Transitions API | Spec + docs | https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API | `document.startViewTransition()` reference |
| 4 | MDN — prefers-reduced-motion | Docs | https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion | Reduced-motion media query reference |
| 5 | React Three Fiber docs | Documentation | https://r3f.docs.pmnd.rs | Hooks (`useFrame`), components (`<Canvas>`), events |
| 6 | LottieFiles — dotLottie docs | Documentation | https://developers.lottiefiles.com/docs/dotlottie-player/ | State machine + audio in `.lottie` archive |
| 7 | web.dev — Animations guide | Guide | https://web.dev/animations/ | Paul Lewis / Google Developers — `transform`/`opacity` rule |
| 8 | WCAG 2.5.5 — Target Size | Spec | https://www.w3.org/WAI/WCAG22/Understanding/target-size | ≥ 44×44 px requirement |
| 9 | Codrops — Playground | Code demos | https://tympanus.net/codrops | High-quality open-source animation demos |
| 10 | GSAP Showcase | Showcase | https://gsap.com/showcase | Reference sites built with GSAP |
| 11 | Three.js examples | Examples | https://threejs.org/examples | 200+ WebGL examples, source available |
| 12 | Motion docs | Documentation | https://motion.dev/docs | Layout animations, spring physics, gestures |
| 13 | Lenis README | README | https://github.com/darkroomengineering/lenis#readme | Smooth-scroll + GSAP integration snippet |
| 14 | Awwwards — GSAP filter | Showcase | https://www.awwwards.com/websites/gsap/ | GSAP-built sites for visual reference |

---

## Build vs. reuse decisions — please confirm

For each major component an animated-website builder needs, pick ONE library with rationale.

1. **Component "Scroll engine (smooth scroll + position events)"** — **reuse Lenis** (MIT, 15.1k stars, darkroomengineering/lenis, active) / reuse Locomotive Scroll v5 (MIT, 9.4 KB gzipped, built on Lenis) / reuse native CSS `animation-timeline: scroll()` (0 KB, limited Firefox parity). Default: **Lenis** — best GSAP integration, active maintenance, vendor-agnostic. Your call: _______
2. **Component "Animation / JS engine"** — **reuse GSAP** (now 100% free per angle B; all plugins bundled) / reuse Motion (MIT, motion.dev, React-first + vanilla, AI Kit) / reuse Anime.js v4 (MIT, ~24.5 KB, scope-based). Default: **GSAP** for non-React stacks and rich choreography; **Motion** for React-only. Your call: _______
3. **Component "3D scene graph"** — **reuse Three.js + R3F** (MIT, 114k+31.6k stars, de facto) / reuse Babylon.js (Apache-2.0, less React integration but stronger features) / reuse PlayCanvas (MIT + SaaS editor). Default: **Three.js + R3F** for React; **Three.js** raw for vanilla. Your call: _______
4. **Component "Lottie / vector animation runtime"** — **reuse dotLottie-web** (MIT, Rust+WASM, 90% smaller files, state machines + audio) / reuse lottie-web (MIT, legacy, larger bundle) / reuse Rive (MIT runtime, interactive state machine). Default: **dotLottie-web** for new assets; **Rive** if interactive state machines needed. Your call: _______
5. **Component "Page transitions"** — **use native View Transitions API** (no dep, native perf, Chrome 111+/Safari 18+) / reuse Swup (MIT, 5.2k stars, plugin ecosystem, SSR-friendly) / reuse Motion `AnimatePresence` (MIT, React-only). Default: **View Transitions API** with feature detection for Firefox. Your call: _______
6. **Component "Typography / kinetic text"** — **reuse SplitType** (MIT, character-level, Motion team recommends) / reuse GSAP SplitText (now free) / reuse Splitting.js (MIT, ~3 KB, CSS-driven). Default: **SplitType** for React; **Splitting.js** for CSS-only sites. Your call: _______
7. **Component "Generative / procedural background"** — **reuse OGL** (MIT, ~25 KB, minimal WebGL) / use Three.js + custom shader (already on the page if R3F chosen) / use p5.js (LGPL-2.1). Default: **OGL** if no Three.js on page; **Three.js shader material** otherwise. Your call: _______
8. **Component "Audio reactivity"** — **reuse Tone.js** (MIT, high-level) / use native Web Audio API (0 KB) / use p5.sound (LGPL-2.1). Default: **Tone.js** if you need scheduling + effects; **native Web Audio** if FFT-only. Your call: _______
9. **Component "State management (for animation orchestration)"** — **Zustand** (MIT, 58.5k stars, pmndrs) / Jotai (MIT, atom-based) / native React state. Default: **Zustand** if R3F is in the stack (pmndrs default pairing). Your call: _______
10. **Component "GUI controls for tweaking animation params (dev only)"** — **Leva** (MIT, 6.2k stars, React-first) / Tweakpane (MIT, vanilla) / dat.gui (legacy). Default: **Leva** for React; **Tweakpane** for vanilla. Your call: _______

If the user does not specify, the default stack is: **Lenis + GSAP + Three.js/R3F + dotLottie-web + View Transitions API + SplitType + OGL + Tone.js + Zustand + Leva**.

---

## Feasibility verdict

- **Can do:** yes
- **Confidence:** HIGH
- **Why:** Every kind in this playbook has a verified stack from angle B's resources catalog (B.1–B.6). GSAP being 100% free removes the historical budget barrier. Every code snippet uses APIs verified against library docs (gsap.com, motion.dev, threejs.org, lottiefiles.com, MDN). Motion grammar tokens from `share/design/T-2026-07-29-001/brief.md` are referenced in every Human-facing section. The 10-step conversion playbook is incremental — section-by-section or progressive enhancement — so a real site can adopt it without a full rewrite. The only material unknowns are (a) framework target (clarifying question 1), (b) depth-vs-breadth tradeoff (clarifying question 2), (c) acceptance-criteria test stack (clarifying question 4) — all answerable by the user without re-research.

---

## Recommendations for the planning agent

- **Default to the framework-agnostic variants** in each LLM-facing snippet. The Human-facing versions are stack-agnostic already; the LLM-facing snippets include both vanilla and React variants for the most common cases (kinds i, ii, vi, vii).
- **Cite `share/design/T-2026-07-29-001/brief.md`** in every build step's "Pre-flight" section. Do not invent duration values — name the brief's tokens.
- **Phase the 12 kinds by complexity.** Phase A (low risk): viii, v, iv, vi. Phase B (medium): i, vii, x. Phase C (high): ii, iii, ix, xi, xii. This ordering minimizes Lighthouse regressions.
- **Validate the LLM-facing snippets** before any agent runs them. Run a Playwright smoke test that asserts the acceptance criteria of each kind. A `tests/build-playbook.spec.ts` with one test per kind is the cheapest insurance.
- **Honor the "Forbidden patterns" lists.** They exist because the brief and source extract together revealed every common footgun. Treat them as code-review checklist items.
- **Keep the conversion playbook's RUM step.** web-vitals + a flag rollout is the difference between "animation helped" and "animation tanked our conversion rate by 12%." No animated-website shipping should skip it.
- **Surface "Framer Motion → Motion"** in the plan; the migration is now needed for any React codebase still using `framer-motion` (the import path is `motion/react`, package name is `motion`).
- **Resolve the 4 build-vs-reuse questions** before code starts. The defaults above are sensible but the user may have opinions (e.g. "no Lenis, use native CSS scroll-driven animations only").
- **Keep the `ponytail:` comments** in any simplified snippets. The brief's token system is a contract — deviations need a named reason and a named ceiling.

---

## Open questions for the user

1. Should the LLM-facing snippets in this build playbook default to (a) React + Next.js + R3F (opinionated), (b) framework-agnostic with both vanilla and React variants per kind, or (c) one stack chosen by you?
2. Should each of the 12 kinds receive roughly equal depth (~500-1000 words per Human-facing section, ~200 words per LLM-facing), or weighted by complexity/popularity?
3. Are emerging kinds (CSS scroll-driven animations, View Transitions API, WebGPU, WebXR, dotLottie state machines, generative-art landing pages, AI-generated live motion) acceptable as alternates inside the 12 primary sections, or should each be a 13th "Emerging kinds" section with its own build steps?
4. Should the LLM-facing acceptance criteria assume Playwright + axe-core + Lighthouse CI as the test stack, or stay framework-agnostic?

---

## Self-critique

- **Did I cover each kind with both human + LLM versions?** Yes — all 12 required kinds have both sub-sections. Kind (i), (ii), (vii) have the longest content because they are the highest-traffic in the source's example set; kinds (iv), (v), (xi) are shorter because they are more constrained.
- **Did the do/don't tables cover the most common pitfalls?** Yes — 30 Use rows and 30 Avoid rows. Coverage spans performance (transform/opacity), accessibility (focus-visible, reduced-motion, touch targets), SEO (no animation of font-display), GPU/CPU (will-change, dpr cap), memory (ScrollTrigger kill), mobile (visibility pause, pointer media query), prefers-color-scheme (covered implicitly via brief tokens), RTL (logical properties), font loading (preload + swap), image formats (AVIF/WebP), LCP/INP (poster fallback, dpr cap).
- **What's missing?**
  - **CSS scroll-driven animations as a primary kind**, not just an alternative inside (i). I treated it as a stack choice within (i) because the trigger×surface mapping puts it there. If the user wants it as its own primary section, that's clarifying question 3.
  - **Rive as a primary kind** alongside Lottie. Rive has interactive state machines; Lottie does not. I folded Rive into kind (v) as an alternative. If the user's content has state-machine UI (button states, multi-step onboarding), Rive deserves its own section.
  - **Remotion** — programmatic video in React. Angle B flagged its special license. I omitted it because the brief is about web animation, not video; flag if the user's dossier needs video.
  - **WebXR / AR** — covered in kind (xi) as `<model-viewer>` AR support, but no dedicated section.
  - **Ponytail-mode simplifications** — every LLM-facing snippet is the "shortest working diff." Some simplifications (e.g. `frameloop="demand"` instead of an explicit pause/resume) deserve a `ponytail:` comment. I added one to kind (i)'s `lagSmoothing(0)` line. Others (e.g. `dpr: [1, 2]` instead of an explicit `Math.min(...)`) could be commented but the gain is marginal.
- **What did I assume without evidence?**
  - That GSAP is the right default engine for the React + Next.js case. Angle B's defaults supported this, but Motion (formerly Framer Motion) is also a defensible default for React-first teams. Surfaced as clarifying question 1.
  - That the brief's token system is the canonical authority. The brief says "framework-agnostic" but the implementation inevitably picks one stack; I followed the brief's directives but did not test every token value.
  - That users accept `* { animation-duration: 0.01ms !important }` as a problem pattern. The brief explicitly forbids it; I followed the brief. If a downstream user disagrees, kind (i)'s Forbidden patterns list is the place to override.
  - That Playwright is the right test stack. The clarifying question (4) leaves this open.
- **Did the conversion playbook stay ≤1500 words?** Yes — Step 1 (130w) + Step 2 (90w) + Step 3 (80w) + Step 4 (95w) + Step 5 (130w) + Step 6 (110w) + Step 7 (90w) + Step 8 (110w) + Step 9 (140w) + Step 10 (130w) ≈ 1105 words total. Within budget.

---

## Metrics

- findings: 35
- risks_HIGH: 3
- risks_MEDIUM: 3
- risks_LOW: 2
- clarifying_Qs: 4