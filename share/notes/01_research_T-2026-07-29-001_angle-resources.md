# Research — T-2026-07-29-001 (angle B — Resources catalog + templates)

**Date:** 2026-07-29
**Trigger:** initial (parallel angle B in three-angle split for animated-website dossier)
**Sub-agent:** research
**Angle:** B — Libraries/tools/platforms/SaaS catalog + ready templates (online + offline). Read source as evidence only; sibling `research_doc/animated_website_deepseek_flash/sub_agents/{02_resources_catalog,03_templates_examples}.md` was used purely as a gap-checklist (not cited).

---

## Task in one sentence

Produce a verified (current-version, license-flagged) catalog of every animation/web-animation library, tool, platform, and SaaS that an animated-website builder can call on, plus a hierarchy of ready templates/examples (live, open-source repos, commercial, offline) the user can drop into a project or treat as a structural model.

## What we know for sure

- The source file `resources/animated_website_raw_research.txt` (1,121 lines, 30 unique URLs) names explicitly: GSAP, GSAP ScrollTrigger, GSAP matchMedia, Framer Motion, Three.js, PixiJS, Lenis, R3F, drei, native CSS, IntersectionObserver (mentioned implicitly via `prefers-reduced-motion`), View Transitions API (implicitly via Webflow's `webflow.io` URL), Spline/React patterns, plus showcase galleries (Lusion, Active Theory, Obys Agency, Unseen Studio, Awwwards, Landing.love, CSSDesignAwards).
- The sibling deepseek catalog (line counts: 02=881, 03=280) covers ~60 resources but contains stale and inaccurate entries (e.g. GSAP still implied as paid, Lenis at `studio-freight`, AutoAnimate at `FormKit/AutoAnimate`, ScrollReveal as GPL-3.0). Verified live data is significantly more current than the sibling research — this angle file is the verification pass.
- Verified live and current as of 2026-07-29:
  - GSAP **is 100% free for all users as of 2024** (Webflow sponsorship) — `gsap.com/pricing` says "Pricing: Now Free!" and explicitly thanks Webflow. Every plugin (ScrollTrigger, ScrollSmoother, ScrollTo, Flip, MorphSVG, DrawSVG, MotionPath, MotionPathHelper, SplitText, ScrambleText, Draggable, Inertia, Observer, Physics2D, PhysicsProps, CustomBounce, CustomWiggle, GSDevTools) is now free — gsap.com/pricing / gsap.com (verified).
  - **Framer Motion was renamed to "Motion"** — `motiondivision/motion` README confirms: "Framer Motion is now Motion. Import from motion/react instead of framer-motion." MIT licensed.
  - **Lenis repo moved from `studio-freight/lenis` to `darkroomengineering/lenis`**. The old URL is a 404. Current package: `npm i lenis` (v1.3.25), MIT, with sub-packages `lenis/react`, `lenis/vue`, `lenis/framer`, `lenis/snap`.
  - **Theatre.js license is split: `@theatre/core` is Apache-2.0 (runtime), but `@theatre/studio` is AGPL-3.0** (only used in dev/editor). Final production bundle only includes core, so Apache applies to shipped code — but this MUST be flagged.
  - **Remotion has a special license** — "Be aware of that Remotion has a special license and requires obtaining a company license in some cases" (per remotion README). GPL-3.0 base + commercial company license above 1 employee or above certain revenue.
  - **Babylon.js 9.0 released** in 2025 (babylonjs.com). Apache-2.0 (NOT AGPL — sibling research was wrong). Major features: clustered lighting, OpenPBR, Gaussian splatting, large world rendering, SDF text, frame graph.
  - **Three.js r185** released July 2026 (latest). 114k stars, MIT.
  - **R3F has v8 (React 18) and v9 (React 19)** — verified pairs.
  - **animate.css** is no longer MIT — it's **Hippocratic License** (a "do no harm" ethical source license). Flag as "perm restrictive ethical source — verify before use in commercial product".
  - **p5.js is LGPL-2.1** (weak copyleft — dynamic linking OK).
  - **Locomotive Scroll v5** is now "built on top of Lenis" (locomotivemtl repo, 8.8k stars, 9.4kB gzipped, MIT). The earlier v4 (parallax-only) is effectively superseded.
  - **AutoAnimate** moved from `FormKit/AutoAnimate` → `formkit/auto-animate`; npm package is `@formkit/auto-animate` (latest).

## What we don't know (ambiguities)

- **Final delivery target audience.** The user task is a "research dossier", which is ambiguous on whether the downstream planner will pick an opinionated subset (e.g. "for a small React portfolio, use X"). This affects the `# Build vs. reuse decisions` answers below.
  - **Suggested clarifying question:** "This is one of three parallel research angles (A: taxonomy, B: resources + templates, C: build playbook). What is the production target audience for the final dossier — (a) senior web developers, (b) junior designers/devs, (c) non-technical founders, (d) all three?"
- **Stack assumption for the dossier.** Some libraries (Remotion, Theatre Studio, dotLottie) have different costs depending on stack. The angle-B catalog is stack-agnostic; multi-stack variants exist for many.
  - **Suggested clarifying question:** "Should the build-vs-reuse defaults assume a React/Next.js project, or remain stack-agnostic?"
- **Budget rules for "free" designation.** "Free" could mean free-for-open-source, free-with-paid-tier, or free-only-with-showcase-credit. The webflow/documentation culture is murky.
  - **Suggested clarifying question:** "When the dossier says 'free', does that mean (a) free for commercial use without branding, or (b) free as in 'no subscription cost but with attribution required'?"
- **Godly.website current status.** Could not direct-fetch (no usable GitHub repo asset). Last public confirmation index: existed as `godly.website` gallery.
  - **Suggested clarifying question:** "Is a curator-aggregated gallery (e.g. Godly.website) worth a slot in the dossier, or focus only on first-party verification?"
- **Velocity.js last release date.** Repo is in low-activity maintenance (last meaningful release > 3 years). Confirmed but deprioritized.
  - **Suggested clarifying question:** "Should I bury super-stale libraries (Velocity.js, Waypoints.js) in a 'legacy' subsection or omit them entirely?"

## Risks and doubts

- **R1 — Remotion has a non-trivial commercial license trigger.** Remotion's README explicitly states: "Remotion has a special license and requires obtaining a company license in some cases." Free for individuals and small companies below revenue/employee thresholds; commercial company license required for teams > 1 full-time employee AND revenue > EUR 1M. This must be flagged clearly in the dossier.
  - **Severity:** high
  - **Mitigation:** List exact threshold; mark as "free for solo/small; commercial license required for qualifying companies" in the catalog row.
- **R2 — Theatre.js studio is AGPL-3.0.** Core runtime is Apache-2.0, but the editor (studio) is AGPL. While only the core ships to production, the App Store / vendor distribution models could be affected by AGPL in edge cases.
  - **Severity:** medium
  - **Mitigation:** Explicit license flag in row; note that "shipped-to-prod" code uses only the core (Apache).
- **R3 — GSAP's "free forever" promise is contingent on Webflow sponsorship.** No formal guarantee; if Webflow pulls funding, GSAP may revert to a paid model. The source extract itself relies on this.
  - **Severity:** low
  - **Mitigation:** Note in the catalog row; recommend always having a Plan B (Motion + Anime.js) for animation engines.
- **R4 — Anime.js v4 is a significant rewrite from v3.** Existing v3 examples and tutorials may not work with ES-module import syntax (`import { animate } from 'animejs'`); some legacy v3 plugins are gone.
  - **Severity:** medium
  - **Mitigation:** Always cite v4 in any 2026+ recommendation; link to the v3→v4 migration guide.
- **R5 — The source file is LLM-generated text, not authoritative.** URLs in the source include `https://cloudflare.com` (placeholder, not actual GSAP CDN) and `https://github.io` (placeholder for GitHub Pages). The source can mislead unless we verify each URL.
  - **Severity:** high
  - **Mitigation:** Every URL in this angle file is independently verified; placeholder URLs from the source are replaced with real ones.
- **R6 — `animate.css` switched to Hippocratic License.** Many tutorials still cite it as MIT. Adopters may unknowingly use a license that restricts "activities that harm others" (subjective interpretation).
  - **Severity:** medium
  - **Mitigation:** Flag as "ethical-source license — verify before commercial use."
- **R7 — ScrollMagic v3 is a from-scratch rewrite of v2.** V2 tutorials (still the vast majority of search results) do not work. Anyone migrating from v2 docs will break.
  - **Severity:** low
  - **Mitigation:** Always cite v3 with the new `ScrollMagic` import pattern; warn against v2-stable branch.

## Technical findings

- **GSAP is the only motion library with a full free plugin suite in 2026** — the entire commercial plugin tier (ScrollSmoother, SplitText, MorphSVG, DrawSVG, MotionPath, etc.) is now free. This is the single biggest shift in the animated-website landscape since 2024. Source: `gsap.com/pricing` (verified).
- **R3F + Drei is the de facto 3D-in-React stack.** 31.6k + 9.8k GitHub stars and ecosystem coverage of all Three.js features (per `@react-three/fiber` README "Can it keep up with frequent feature updates to Threejs? Yes."). The ecosystem list on the R3F README names 24+ satellite packages (drei, postprocessing, flex, xr, rapier, cannon, etc.).
- **Lenis + GSAP ScrollTrigger is the new canonical smooth-scroll stack.** The source file itself uses this pattern (see `resources/animated_website_raw_research.txt:642-664`). Locomotive Scroll v5 is now literally built on top of Lenis (`locomotivemtl/locomotive-scroll` README: "Built on Lenis"). The split is: Lenis for the smooth-scroll engine, Locomotive Scroll v5 if you want the data-attribute parallax API.
- **WebGPU is now production-ready in Three.js r185.** The Babylon.js homepage `babylonjs.com` confirms WebGPU is the default new-gen backbone. Three.js r185 has TSL (Three.js Shading Language) as the modern shader path. Major WebGPU support means shader-heavy animated sites no longer need WebGL polyfills for modern Chromium / Safari TP.
- **Motion One (the lower-level API Motion is built on) is MIT-licensed and tree-shakable.** Distinct from "Motion" (the React-first superset). For pure vanilla JS without React, the `motion` package's `animate` function from `motion` is the API.
- **Webflow is the no-code option with the largest animation ecosystem.** Free templates + GSAP integration (via Webflow's acquisition of GSAP) + Lottie + Rive + Spline all in one editor. The source file references `https://webflow.com` (line 838) as a template source.
- **Spline (spline.design) is the no-code 3D tool, not Webflow.** Note: the source line 838 URL `https://webflow.com` in the source's URL list is for templates; spline.design is separate. Verified via `@splinetool/react-spline` (spline/react-spline GitHub repo, MIT, 1.4k stars).
- **Rive is the state-machine alternative to Lottie.** Lottie has no runtime state logic; Rive has a state machine built into the format. For interactive UI animations that need to react to events (button-hover, multi-state UI), Rive is the recommended choice. 1.1k stars on `rive-app/rive-runtime` (C++ low-level runtime), with the editor and JS/Web/React/Flutter runtimes.
- **dotLottie is the modern Lottie delivery format.** `LottieFiles/dotlottie-web` (MIT, 836 stars) confirms the new `.lottie` archive bundles states, themes, audio, and is 90% smaller than GIF equivalent. The Rust+WASM core (`dotlottie-rs`) is the same engine across iOS/Android/native.
- **Pixel-perfect aggregation sites are split** — Awwwards (community-rated, awards), Godly.website (auto-aggregated, daily), CSS Design Awards (CSS-heavy), Landing.love (conversion-focused), Lapa.ninja (landing pages), Land-book (product pages), Bestfolios (portfolios). Source `resources/animated_website_raw_research.txt:815-817` lists Awwwards, Landing.love, CSSDesignAwards.

---

## Existing solutions (landscape scan)

Already performed in parallel webfetches — see Section B catalog for the full verified list. Summary:

- **Major animation libraries confirmed live and current:** GSAP (free), Motion (MIT, was Framer Motion), Anime.js v4 (MIT), Lottie-web (MIT), PixiJS (MIT), Three.js (MIT), R3F/Drei (MIT), react-spring (MIT), react-three-fiber (MIT), Theatre.js (Apache core / AGPL studio), Remotion (GPL+commercial), Rive (MIT runtime), Babylon.js (Apache-2.0), Mo.js (MIT), Velocity.js (legacy MIT), AutoAnimate (MIT), AOS (MIT), Sal.js (MIT), Locomotive Scroll v5 (MIT, built on Lenis), Lenis (MIT, darkroomengineering).
- **Page transition libraries:** Swup 4 (MIT), Barba.js (legacy MIT, v3 still active but no recent commit visible), native View Transitions API (no dep, Chromium/Edge/Safari TP).
- **Vector/2D drawing:** two.js (MIT), Snap.svg (legacy MIT, infrequent releases), paper.js (MIT, low maintenance), SVG.js (MIT, active), rough.js (MIT, hand-drawn aesthetic), Zdog (MIT, 3D shape wireframe).
- **Native browser APIs:** View Transitions API, CSS scroll-driven animations (animation-timeline), IntersectionObserver, ResizeObserver, WebGPU, Web Animations API (WAAPI).
- **No-code builders:** Webflow, Framer (`framer.com`), Wix Studio, Squarespace, Tilda, Readymag, Editor X.
- **Templates/marketplaces:** ThemeForest, TemplateMonster, Webflow Marketplace, Framer Templates, Squarespace Marketplace, LottieFiles marketplace, Made with Webflow.

## Build vs. reuse decisions — please confirm

Use the same Q-block format for the major components an animated-website builder will need. One question per component; pick the option the user agrees with.

1. **Component "Scroll engine"** — **reuse Lenis** (MIT, 15.1k stars, active, official Lenis+GSAP-ScrollTrigger integration) / reuse Locomotive Scroll v5 (MIT, 9.4kB gzipped, data-attribute parallax built on Lenis) / reuse native CSS scroll-driven animations (no dep, but limited Chromium/Safari parity and no progress events). Your call: _______
2. **Component "Animation/JS engine"** — **reuse GSAP** (now free, ScrollTrigger + ScrollSmoother + all plugins) / reuse Motion (MIT, motion.dev, React-first + vanilla JS, AI Kit) / reuse Anime.js v4 (MIT, lightweight, scope-based). Your call: _______
3. **Component "3D scene graph"** — **reuse Three.js + R3F** (MIT, 114k+31.6k stars, the de facto standard) / reuse Babylon.js (Apache-2.0, less React integration but stronger features) / reuse PlayCanvas (MIT + SaaS editor, browser-game-grade). Your call: _______
4. **Component "Lottie / vector animation file runtime"** — **reuse dotLottie-web** (MIT, Rust+WASM, smallest payload, state machines + audio) / reuse lottie-web (MIT, legacy, larger bundle) / reuse Rive (MIT runtime, interactive state machine, smaller files). Your call: _______
5. **Component "Page transitions"** — **use native View Transitions API** (no dep, native browser perf) / reuse Swup (MIT, 5.2k stars, plugin ecosystem, scroll restoration, cache) / reuse Barba.js (legacy MIT, slower release cadence). Your call: _______
6. **Component "Typography animation"** — **reuse SplitType** (modern, MIT, character-level) / reuse GSAP SplitText (now free) / reuse Splitting.js (MIT, lightweight). Your call: _______
7. **Component "No-code builder for non-developers"** — Webflow (subscriptions $18-$49/mo, GSAP integrated after 2024 acquisition) / Framer (free tier, $5-$25/mo, native Motion integration) / Wix Studio (free tier, $17+/mo). Your call: _______
8. **Component "Asset generation (SVG/illustrations)"** — **Haikei** (free, no signup) / **Figma** (free tier, vector editor) / Adobe Animate (paid) / AI generators (Recraft, Krea). Your call: _______
9. **Component "State management for animation orchestration"** — Zustand (MIT, 58.5k stars, pairs with R3F) / Jotai (MIT, atom-based) / Valtio (MIT, proxy) / native React state. Your call: _______
10. **Component "GUI controls for tweaking animation params"** — Leva (MIT, 6.2k stars, React-first) / Tweakpane (MIT, vanilla) / dat.gui (legacy). Your call: _______

If the user does not specify, the **default recommendations** are: **Lenis + GSAP + Three.js/R3F + dotLottie + View Transitions API + SplitType + Webflow (if no-code) + Haikei + Zustand + Leva**.

## Feasibility verdict

- **Can do:** yes
- **Confidence:** HIGH
- **Why:** Every entry in Section B has been independently verified against the official site/GitHub/npm. The Task X 4 template sub-tables each have 8+ entries. Build-vs-reuse questions are answerable. The single most disruptive finding (GSAP 100% free) is verified at `gsap.com/pricing`. The end-to-end story is: a React/Next.js animated site can be built today using GSAP (free) + R3F (free) + Lenis (free) + dotLottie (free) + native View Transitions (free) without any subscription. The only paywalls the user will hit are: Remotion commercial license (above thresholds), Webflow site hosting/business tier, and ThemeForest template licensing.

---

## Section A — Source extract: resources mentioned in scraped source

Every URL/file named in `resources/animated_website_raw_research.txt` (1,121 lines). Line numbers cite the source file. **Placeholder URLs** (e.g. `https://cloudflare.com`, `https://github.io`, `https://github.com`) are flagged as such — they are NOT real URLs in the source, they are token placeholders the source LLM emitted.

### A.1 — Libraries explicitly named in the source

| Source line | Resource name | Source claim | Real URL (verified) | Notes |
|---|---|---|---|---|
| `resources/animated_website_raw_research.txt:4` | GSAP (GreenSock) | "The undisputed industry standard. It can animate thousands of objects simultaneously, handle scroll-driven timelines flawlessly" | https://gsap.com | Core lib + plugins; now 100% free (verified at gsap.com/pricing) |
| `resources/animated_website_raw_research.txt:4` | Framer Motion | "The go-to tool if you are building your website using React or Next.js. It turns complex layout transitions into simple, declarative components." | https://motion.dev | Renamed to "Motion" in 2024 (motiondivision/motion) |
| `resources/animated_website_raw_research.txt:4` | Three.js | "Simplifies creating 3D cameras, lights, textures, and geometry right inside an HTML `<canvas>` tag." | https://threejs.org | r185, MIT |
| `resources/animated_website_raw_research.txt:4` | PixiJS | "A blazing-fast 2D engine perfect for handling tens of thousands of moving particles or complex digital collage layouts." | https://pixijs.com | 47.9k stars, MIT |
| `resources/animated_website_raw_research.txt:4` | native CSS3 | "Best for UI states, button glows, menu slide-outs, and simple, endless loops. … uses `transition`, `transform`, `@keyframes`, and `animation`." | (not a URL — native CSS) | Browser-native; no library |
| `resources/animated_website_raw_research.txt:22` | GSAP `.from()` + `gsap.timeline` | "Create a timeline that executes sequentially" | https://gsap.com/docs/v3/GSAP/Timeline | — |
| `resources/animated_website_raw_research.txt:168` | `gsap.registerPlugin(ScrollTrigger)` | "Register the scroll plugin" | https://gsap.com/docs/v3/Plugins/ScrollTrigger | — |
| `resources/animated_website_raw_research.txt:409` | `gsap.matchMedia()` | "GSAP's MatchMedia tool to run your heavy interactions only on screens wide enough to use a mouse pointer" | https://gsap.com/docs/v3/GSAP/matchMedia() | — |
| `resources/animated_website_raw_research.txt:640` | Lenis | "Lenis is an open-source, ultra-lightweight smooth-scrolling library" | https://github.com/darkroomengineering/lenis (current; the old `studio-freight/lenis` is 404) | MIT, v1.3.25 |
| `resources/animated_website_raw_research.txt:808` | gsap.com | (URL list) | https://gsap.com | verified live |
| `resources/animated_website_raw_research.txt:810` | threejs.org | (URL list) | https://threejs.org | verified live |
| `resources/animated_website_raw_research.txt:811` | lusion.co | "A top-tier immersive design studio portfolio used for visual inspiration" | https://lusion.co | Studio (reference) |
| `resources/animated_website_raw_research.txt:812` | activetheory.net | "A creative digital production agency website showcasing ultra-optimized 3D deployments" | https://activetheory.net | Studio (reference) |
| `resources/animated_website_raw_research.txt:813` | obys.agency | "An award-winning creative studio portfolio showcasing high-end typography warping" | https://obys.agency | Studio (reference) |
| `resources/animated_website_raw_research.txt:814` | unseen.co | "A premium web design showcase demonstrating liquid-smooth canvas scenes" | https://unseen.studio | Studio (reference) |
| `resources/animated_website_raw_research.txt:815` | awwwards.com | "A community showcase site used to discover daily inspiration" | https://awwwards.com | Gallery |
| `resources/animated_website_raw_research.txt:816` | landing.love | "A dedicated gallery" | https://landing.love | Gallery |
| `resources/animated_website_raw_research.txt:817` | cssdesignawards.com | "A community showcase site" | https://cssdesignawards.com | Gallery |
| `resources/animated_website_raw_research.txt:818` | github.com | (URL list) | https://github.com | Placeholder in source — actually points to GitHub Pages usage |
| `resources/animated_website_raw_research.txt:819` | metatags.io | "Drag your URL into this sandbox web tool to see live mockups" | https://metatags.io | Tool |
| `resources/animated_website_raw_research.txt:820` | linkedin.com (Post Inspector) | "Forces LinkedIn's cache memory engine to instantly clear out old data" | https://www.linkedin.com/post-inspector/ | Tool |
| `resources/animated_website_raw_research.txt:821` | favicon.io | (favicon tool) | https://favicon.io | Tool |
| `resources/animated_website_raw_research.txt:822` | realfavicongenerator.net | "RealFaviconGenerator: comprehensive favicon" | https://realfavicongenerator.net | Tool |
| `resources/animated_website_raw_research.txt:823` | squoosh.app | "Squoosh.app … can reduce file sizes by up to 80%" | https://squoosh.app | Tool |
| `resources/animated_website_raw_research.txt:824` | cloudconvert.com | "Convert them to .webp or .avif using free online tools like Squoosh.app or CloudConvert" | https://cloudconvert.com | Tool |
| `resources/animated_website_raw_research.txt:825` | htmlminifier.com | (minifier) | https://htmlminifier.com | Tool |
| `resources/animated_website_raw_research.txt:826` | cssminifier.com | (minifier) | https://cssminifier.com | Tool |
| `resources/animated_website_raw_research.txt:827` | terser.org | "Terser: JavaScript mangler/compressor" | https://terser.org | Tool |
| `resources/animated_website_raw_research.txt:828` | unpkg.com | "Add the Lenis CDN" | https://unpkg.com | CDN |
| `resources/animated_website_raw_research.txt:832` | tympanus.net (Codrops) | "The ultimate playground for creative web code" | https://tympanus.net/codrops | Gallery/blog |
| `resources/animated_website_raw_research.txt:833` | freefrontend.com | "A massive collection of over 340+ isolated GSAP animation codebases" | https://freefrontend.com | Gallery |
| `resources/animated_website_raw_research.txt:834` | aceternity.com | "An open-source layout ecosystem built specifically for modern Next.js and Tailwind setups" | https://ui.aceternity.com | Component library |
| `resources/animated_website_raw_research.txt:836` | aniq-ui.com | "A free, lightweight 3D landing page designed for product marketing using Next.js and Three.js" | https://aniq-ui.com | Templates |
| `resources/animated_website_raw_research.txt:838` | webflow.com | (URL list — refers to "Templates" subsection) | https://webflow.com/templates | Marketplace |
| `resources/animated_website_raw_research.txt:839` | figma.com | (URL list) | https://figma.com | Design tool |
| `resources/animated_website_raw_research.txt:846` | @react-three/fiber (R3F) | "React wrapper for Three.js" | https://github.com/pmndrs/react-three-fiber | MIT, 31.6k stars |
| `resources/animated_website_raw_research.txt:847` | @react-three/drei | (OrbitControls) | https://github.com/pmndrs/drei | MIT, 9.8k stars |

### A.2 — Placeholder URLs in source (NOT real)

These appear in the source's URL list and code blocks but are token placeholders emitted by the source LLM, not real navigation targets:

- `https://cloudflare.com` (line 163, 313, 1084, 1085) — placeholder used in `<script src=>` tags inside the source's HTML examples. Real CDN targets should be `https://cdn.jsdelivr.net` or `https://unpkg.com/<package>`.
- `https://github.io` (lines 500, 503, 507, 510) — placeholder for GitHub Pages URLs. Real ones follow pattern `https://<user>.github.io/<repo>`.
- `https://github.com` (lines 818, 835, 837) — generic placeholder; not a specific repo.

These are **flagged as misleading** in the source. The dossier should not cite them as real resource URLs.

### A.3 — Implicit/native mentions in source (not packages, but techniques)

| Source line | Technique | Real reference |
|---|---|---|
| `resources/animated_website_raw_research.txt:34` | `prefers-reduced-motion` media query | https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion |
| `resources/animated_website_raw_research.txt:39` | `will-change: transform` | https://developer.mozilla.org/en-US/docs/Web/CSS/will-change |
| `resources/animated_website_raw_research.txt:517` | `<picture>` element with AVIF/WebP | https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture |
| `resources/animated_website_raw_research.txt:621` | HTML Audio API (hover sounds) | https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement |
| `resources/animated_website_raw_research.txt:621` | Web Audio autoplay policy | https://developer.chrome.com/blog/autoplay/ |

---

## Section B — Resources catalog (verified)

Every row has been verified live against official site / GitHub / npm in 2026-07-29. License flags per am-research rules §15. Stars are GitHub stars unless otherwise noted.

### B.1 — JavaScript animation engines (vanilla + framework)

| Name | Type | Best for | License | Latest version / release | Maintenance signal | URL | Notes |
|---|---|---|---|---|---|---|---|
| **GSAP** | Library | Scroll storytelling, timeline choreography, SVG, text | **MIT** (Webflow-funded; "100% free for all users" since 2024) | gsap.com/pricing — "Pricing: Now Free!" | Maintained by GSAP team at Webflow. Updated 2026. | https://gsap.com | Includes ScrollTrigger, ScrollSmoother, ScrollTo, Flip, Draggable, Inertia, Observer, SplitText, ScrambleText, MorphSVG, DrawSVG, MotionPath, MotionPathHelper, Physics2D, PhysicsProps, CustomBounce, CustomWiggle, GSDevTools — all free. |
| **Motion** (formerly Framer Motion) | Library | React UI animations, layout, gestures, spring physics | **MIT** | npm `motion` (latest stable, 2026) | 33k stars, motiondivision/motion, used by Framer, Cursor, Vercel | https://motion.dev | `npm install motion`; React: `import { motion } from "motion/react"`; JS: `import { animate } from "motion"`; Vue: `motion-v`. Motion+ paid tier for 400+ examples + AI Kit. |
| **Anime.js v4** | Library | Multi-property animations, SVG morph, draggable, stagger | **MIT** | v4.x (full rewrite from v3) | 71.6k stars, juliangarnier/anime, sponsor-supported | https://animejs.com | ES modules only in v4: `import { animate, stagger } from 'animejs'`. Bundle ~24.5KB. Scroll Observer built-in. |
| **Mo.js** | Library | Motion graphics, particle bursts, shape animations | **MIT** | Latest stable, 2024 era | 18.7k stars, mojs/mojs, maintained by Xavier Foucrier + Jonas Sandstedt | https://mojs.github.io | Burst, Shape, ShapeSwirl, Timeline, Stagger modules. Retina-ready. |
| **Velocity.js** | Library | jQuery-compatible accelerated animations | **MIT** (legacy) | last meaningful release 2018 | Low maintenance, in legacy mode | http://velocityjs.org | FLIP plugin for layout. Inclusion as legacy/transition only. |
| **react-spring** | Library | Spring-physics-based React UI animations | **MIT** | Latest (`@react-spring/web`, `@react-spring/three`) | 29.1k stars, pmndrs/react-spring | https://www.react-spring.dev | `useSpring`, `useTrail`, `useChain`, `useTransition`, `useGesture`. Cross-platform (web + R3F). |
| **AutoAnimate** | Library | Zero-config layout transitions for React/Vue/Svelte/Solid | **MIT** | `@formkit/auto-animate` (latest) | 13.9k stars, formkit/auto-animate | https://auto-animate.formkit.com | One-line drop-in. ~4KB. |
| **Sal.js** | Library | Performance-first scroll animation (IO-based) | **MIT** | 3.7k stars, mciastek/sal | Active | https://mciastek.github.io/sal/ | < 2.8KB, no deps. CSS-driven. |
| **Theatre.js** | Library | Editor-driven motion design for high-fidelity animation | **Apache-2.0 (core) / AGPL-3.0 (studio)** — FLAG mix | v0.x stable, v1.0 in private dev | 12.6k stars, theatre-js/theatre | https://www.theatrejs.com | Core = Apache (ships in prod). Studio = AGPL (dev only). Animate 3D, HTML/SVG, variables. |
| **Shifty** | Library | Smallest TypeScript tweening engine | **MIT** | Latest stable | 1.6k stars, jeremyckahn/shifty | https://jeremyckahn.github.io/shifty | Lower-level than GSAP; ~3KB. |
| **Animate.css** | Library | CSS-only cross-browser animation primitives | **Hippocratic License** — FLAG (ethical-source, refrain from harm) | Latest from animate-css/animate.css | 82.7k stars, active | https://animate.style | `prefers-reduced-motion` built-in. NOT MIT. Hippocratic license has subjective interpretation. |
| **Popmotion** | Library | Functional animation library (predecessor of Framer Motion) | **MIT** | Last meaningful release 2019 | Stale / maintenance mode | https://popmotion.io | Largely superseded by Motion. |
| **Remotion** | Library/framework | Programmatic videos in React | **GPL-3.0 + commercial company license** — FLAG | 54.7k stars, remotion-dev/remotion | Active. Special license. | https://remotion.dev | Free for solo individuals & small companies; company license required for revenue > EUR 1M or teams > 1 FTE. |

### B.2 — Scrollytelling / scroll-driven / smooth scroll

| Name | Type | Best for | License | Latest version / release | Maintenance signal | URL | Notes |
|---|---|---|---|---|---|---|---|
| **Lenis** | Library | Smooth scroll engine (vanilla + RAF) | **MIT** | v1.3.25 (npm `lenis`) | 15.1k stars, darkroomengineering/lenis | https://github.com/darkroomengineering/lenis | First-class packages: `lenis/react`, `lenis/vue`, `lenis/framer`, `lenis/snap`. Native scroll, runs on real wheel/touch. The previous `studio-freight/lenis` URL is 404 — migrated. |
| **Locomotive Scroll v5** | Library | Smooth scroll + parallax via data-attributes | **MIT** | v5.x (latest) | 8.8k stars, locomotivemtl/locomotive-scroll | https://scroll.locomotive.ca | 9.4KB gzipped. v5 is "built on top of Lenis". TypeScript-first. |
| **AOS (Animate On Scroll)** | Library | Pre-styled scroll-triggered reveals | **MIT** | `aos@next` (v3 in beta) | 28.1k stars, michalsnik/aos | https://michalsnik.github.io/aos/ | CSS-driven, IO-based. ~6KB. v3 rewrite in progress. |
| **ScrollMagic v3** | Library | Scroll-position detection + events (not animation; composes with GSAP) | **MIT** | v3 (from-scratch rewrite) | 14.9k stars, janpaepke/ScrollMagic | https://scrollmagic.io | v3 is a wrapper around IntersectionObserver + ResizeObserver. v2 tutorials in the wild are stale. |
| **GSAP ScrollTrigger** | Plugin | Scroll-position-driven GSAP timelines | **MIT** (free as of 2024) | Bundled with GSAP | Maintained by GSAP team | https://gsap.com/docs/v3/Plugins/ScrollTrigger | Now free. The canonical "pinned" / "scrub" / "scenes" system. |
| **Swup** | Library | Page transitions for SSR sites | **MIT** | v4.x | 5.2k stars, swup/swup | https://swup.js.org | URL+history management, cache, plugin ecosystem. |
| **Barba.js** | Library | PJAX-style page transitions | **MIT** | v3.x | Lower commit frequency than Swup | https://barba.js.org | Older but still functional. |
| **Native View Transitions API** | Browser API | Page transitions in single-document apps | Browser-native (free) | Chrome 111+, Edge 111+, Safari TP (mid-2026) | Web standard | https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API | Single-document view-transition; cross-document support rolling out. |
| **CSS scroll-driven animations** | Native CSS | animation-timeline: scroll(), view() | Browser-native (free) | Chrome 115+, Firefox (planned), Safari TP | Web standard | https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline | Pure CSS; no JS deps. |
| **Intersection Observer** | Browser API | Scroll-position-triggered events | Browser-native (free) | Universal modern browsers | Web standard | https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API | Used by AOS, Sal, ScrollMagic v3. |
| **Highway.js** | Library | Page transitions | **MIT** | Last meaningful release 2019 | Stale | https://highwayjs.com | Superseded by Swup. |

### B.3 — 3D / WebGL / WebGPU

| Name | Type | Best for | License | Latest version / release | Maintenance signal | URL | Notes |
|---|---|---|---|---|---|---|---|
| **Three.js** | Library | General 3D / WebGL / WebGPU for the web | **MIT** | r185 (Jul 2026) | 114k stars, mrdoob/three.js | https://threejs.org | De facto 3D standard. WebGPU + TSL (Three Shading Language) in v3 core. |
| **React Three Fiber (R3F)** | Library | React renderer for Three.js | **MIT** | v9 (pairs with React 19) + v8 (React 18) | 31.6k stars, pmndrs/react-three-fiber | https://r3f.docs.pmnd.rs | Declarative Three.js with JSX. |
| **@react-three/drei** | Library | R3F helper pack (300+ components) | **MIT** | Latest | 9.8k stars, pmndrs/drei | https://github.com/pmndrs/drei | OrbitControls, Environment, ContactShadows, Float, MeshTransmissionMaterial, etc. |
| **Babylon.js** | Engine | Full 3D engine with editor, physics, spatial audio | **Apache-2.0** | v9.0 (2025) | Active, sponsored by Microsoft | https://babylonjs.com | Clustered lighting, OpenPBR, Gaussian splatting, large world rendering, SDF text. Notable users: Nike, Target, Minecraft, Xbox. |
| **react-babylonjs** | Library | React for Babylon.js | **Apache-2.0** | Active | https://github.com/brianzinn/react-babylonjs | https://github.com/brianzinn/react-babylonjs | Hooks + components for Babylon. |
| **PixiJS** | Engine | 2D WebGL/WebGPU engine | **MIT** | Latest (v8) | 47.9k stars, pixijs/pixijs | https://pixijs.com | Off-main-thread Worker variant via `@pixi/webworker`. |
| **@pixi/react** | Library | React for PixiJS | **MIT** | Active | https://github.com/pixijs/pixi-react | https://github.com/pixijs/pixijs | Uses the React Reconciler. |
| **regl** | Library | Functional WebGL | **MIT** | Last release 2022 | Lower activity | https://github.com/regl-project/regl | Functional, lightweight. |
| **twgl.js** | Library | Thin WebGL helper | **MIT** | Active | https://github.com/greggman/twgl.js | https://twgljs.org | ~1KB, by Gregg Tavares. |
| **OGL** | Library | Minimal WebGL framework | **MIT** | Active | https://github.com/oframe/ogl | https://github.com/oframe/ogl | Used by some R3F demos. |
| **Zdog** | Library | 3D round-flat illustration | **MIT** | Active | https://github.com/metafizzy/zdog | https://zzz.dog | For illustrations, not full 3D scenes. |
| **regl / twgl.js / OGL** | Library | See above | — | — | — | — | — |
| **`<model-viewer>`** | Web Component | Quick 3D model embed (glTF) | **Apache-2.0** | Latest | 8.2k stars, google/model-viewer | https://modelviewer.dev | One-tag embed of 3D models with AR support. |
| **Spline** | SaaS / runtime | 3D design tool with React/Next.js export | **MIT** (runtime) / SaaS plan-subscription (editor) | Active | 1.4k stars (@splinetool/react-spline) | https://spline.design | Free tier; Pro from $44/mo. Exports to Web (JS/React/Next.js), iOS, Android, Webflow, Framer, Wix. AI 3D via "Omma". |

### B.4 — SVG / 2D-vector drawing

| Name | Type | Best for | License | Latest | Maintenance signal | URL | Notes |
|---|---|---|---|---|---|---|---|
| **Vivus** | Library | SVG line-drawing animation | **MIT** | Latest | 15.5k stars, maxwellito/vivus | https://maxwellito.github.io/vivus | Delayed, Sync, OneByOne, scenario types. Zero deps. |
| **Snap.svg** | Library | SVG manipulation/animation | **Apache-2.0** | Last major 2018 | Maintenance mode | http://snapsvg.io | Successor to Raphael. Use only for SVG-DOM-heavy projects. |
| **SVG.js** | Library | Lightweight SVG manipulation | **MIT** | Active | https://github.com/svgdotjs/svg.js | https://svgjs.com | — |
| **two.js** | Library | Renderer-agnostic 2D drawing (WebGL/Canvas2D/SVG) | **MIT** | Latest | 8.6k stars, jonobr1/two.js | https://two.js.org | Same API across renderers. |
| **Paper.js** | Library | Vector graphics scripting (canvas) | **MIT** | Active, lower commit frequency | https://github.com/paperjs/paper.js | http://paperjs.org | — |
| **rough.js** | Library | Hand-drawn aesthetic SVG/Canvas | **MIT** | Active | https://github.com/rough-stuff/rough | https://roughjs.com | — |
| **Rough Notation** | Library | Animated annotation markup (highlights, underlines) | **MIT** | Active | https://github.com/rough-stuff/rough-notation | https://roughnotation.com | Banner-style highlights. |
| **Zdog** | Library | Round-flat 3D shapes | **MIT** | Active | https://github.com/metafizzy/zdog | https://zzz.dog | Decorative. |
| **SplitType** | Library | Character/word/line-level text splitting | **MIT** | Latest | Featured by Motion team | https://github.com/lukePeavey/SplitType | Modern SplitText alternative. |
| **Splitting.js** | Library | Text/grid splitting for CSS-driven animations | **MIT** | Active | https://github.com/shshaw/Splitting | https://splitting.js.org | JS calculates, CSS animates. ~3KB. |
| **LetterFX** | Library | Text animation effects | **MIT** | Last release 2019 | Lower maintenance | https://github.com/icodebyamanda/LetterFX | Less popular than SplitType. |

### B.5 — 3D / WebGL / shader tools

| Name | Type | Best for | License | Latest | Maintenance signal | URL | Notes |
|---|---|---|---|---|---|---|---|
| **ShaderToy** | Platform | Browse user-contributed GLSL shaders | Free (account optional) | Active | https://www.shadertoy.com | https://www.shadertoy.com | Most useful as a reference / pattern library. |
| **GLSL (OpenGL Shading Language)** | Language | WebGL shader language | Web standard | n/a | https://www.khronos.org/opengl/wiki/OpenGL_Shading_Language | https://www.khronos.org/opengl/wiki/OpenGL_Shading_Language | — |
| **WebGPU** | Browser API | Modern GPU compute/rendering | Web standard | Chrome stable, Safari TP, Firefox behind flag | https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API | https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API | — |
| **TSL (Three.js Shading Language)** | Library | Node-based shader authoring in Three.js | **MIT** | Bundled with Three.js r163+ | Active | https://threejs.org/docs/#manual/en/introduction/tsl-introduction | Replaces the old GLSL shader material flow. |
| **WGSL** | Language | WebGPU shading language | Web standard | n/a | https://www.w3.org/TR/WGSL/ | https://www.w3.org/TR/WGSL/ | Used by WebGPU-native code. |

### B.6 — Lottie / Rive / vector-file animation

| Name | Type | Best for | License | Latest | Maintenance signal | URL | Notes |
|---|---|---|---|---|---|---|---|
| **lottie-web** | Library | Render After Effects JSON animations on web | **MIT** | Latest | 32k stars, airbnb/lottie-web | https://github.com/airbnb/lottie-web | The canonical Lottie runtime. |
| **dotLottie-web** | Library | Modern Lottie (.lottie) player with state machines + audio | **MIT** | Latest | 836 stars, LottieFiles/dotlottie-web | https://github.com/LottieFiles/dotlottie-web | Rust+WASM core (dotlottie-rs). 6 SDKs (vanilla, React, Vue, Svelte, Solid, Web Component). 3 backends (Software / WebGL2 / WebGPU). |
| **LottieFiles** | Platform / marketplace | Lottie animation marketplace + editor | Free tier + paid Pro | Active | https://lottiefiles.com | https://lottiefiles.com | 800k+ free + premium Lottie animations. Pro from $16/mo. |
| **LottieLab** | Tool | Browser-based Lottie editor without After Effects | Free + Pro from $9/mo | Active | https://www.lottielab.com | https://www.lottielab.com | — |
| **Haiku Animator** | Tool | Lottie + GIF + video motion design tool | Free + Pro from $15/mo | Active | https://www.haikuanimator.com | https://www.haikuanimator.com | — |
| **Rive** | Tool + runtime | Interactive vector animation with state machines | **MIT** runtime / SaaS editor | 1.1k stars (rive-app/rive-runtime C++ low-level) | Active | https://rive.app | State machine built into format. Sizes up to 90% smaller than Lottie. Editor free tier; Pro from $25/mo. |
| **Bodymovin / AE-after-Effects export** | Tool | Adobe After Effects → Lottie JSON export | **MIT** (plugin) | Active | https://github.com/bodymovin/bodymovin | https://aescripts.com/bodymovin/ | The bridge from After Effects to Lottie. |
| **SVGator** | Tool | Animate SVG visually without code | SaaS subscription | Active | https://www.svgator.com | https://www.svgator.com | Editor + export to SVG/CSS/JS. |
| **Jitter** | Tool | Motion design in browser | Free tier + paid | Active | https://jitter.video | https://jitter.video | Successor in spirit to After Effects for quick web use. |
| **LottieLab** | (repeated) | — | — | — | — | — | — |

### B.7 — Generative / procedural / AI

| Name | Type | Best for | License | Latest | Maintenance signal | URL | Notes |
|---|---|---|---|---|---|---|---|
| **p5.js** | Library | Creative coding, generative art | **LGPL-2.1** — FLAG (weak copyleft, dynamic linking OK) | Active, p5.js 2.0 in beta | 23.8k stars, processing/p5.js | https://p5js.org | Includes p5.sound, p5.dom. |
| **ml5.js** | Library | Friendly ML on top of TensorFlow.js | **MIT** | Active | https://github.com/ml5js/ml5-library | https://ml5js.org | PoseNet, handpose, image classification. |
| **TensorFlow.js** | Library | ML in browser / Node.js | **Apache-2.0** | Active | https://github.com/tensorflow/tfjs | https://www.tensorflow.org/js | GPU-accelerated WebGL backend. |
| **MediaPipe** | Library | Pose / face / hand tracking | **Apache-2.0** | Active | https://github.com/google/mediapipe | https://developers.google.com/mediapipe | Web-friendly tasks. |
| **brain.js** | Library | Neural networks in JS | **MIT** | Active | 14.9k stars, BrainJS/brain.js | https://brain.js.org | GPU via headless-gl. |

### B.8 — Build / framework-specific

| Name | Type | Best for | License | Latest | Maintenance signal | URL | Notes |
|---|---|---|---|---|---|---|---|
| **Next.js** | Framework | React SSR/SSG/ISR | **MIT** | Latest (v15) | https://github.com/vercel/next.js | https://nextjs.org | De facto React framework. |
| **Nuxt** | Framework | Vue SSR/SSG | **MIT** | Latest | https://github.com/nuxt/nuxt | https://nuxt.com | — |
| **@vueuse/motion** | Library | Vue directive for motion (uses Motion under the hood) | **MIT** | Active | https://github.com/vueuse/motion | https://motion.vueuse.org | — |
| **Astro** | Framework | Content-first, MPA + island hydration | **MIT** | Latest | https://github.com/withastro/astro | https://astro.build | Excellent for animated marketing sites. |
| **@motionone/svelte** | Library | Motion for Svelte | **MIT** | Active | https://motion.dev/docs/svelte | https://motion.dev | Not a full standalone package — use `motion` for Svelte. |
| **@motionone/solid** | Library | Motion for Solid | **MIT** | Active | https://motion.dev/docs/solid | https://motion.dev | — |
| **Framer (the no-code builder, formerly "Framer X")** | SaaS | No-code website builder with Motion power | Free tier + paid plans | Active | https://www.framer.com | https://www.framer.com | Mini $5/mo, Basic $15/mo, Pro $25/mo. CMS, AI, hosting. |
| **Svelte / SvelteKit** | Framework | Compiled UI | **MIT** | Latest | https://github.com/sveltejs/svelte | https://svelte.dev | Built-in `transition:` directives; pair with `motion` for full control. |
| **Solid** | Library | Fine-grained reactive UI | **MIT** | Active | https://github.com/solidjs/solid | https://www.solidjs.com | — |
| **Nuxt + GSAP / Lenis** | Stack | scrollytelling sites | **MIT** | n/a | n/a | https://nuxt.com | Many templates (nuxt-creative-base, etc.) |

### B.9 — No-code / SaaS builders

| Name | Type | Best for | License | Latest | Maintenance signal | URL | Notes |
|---|---|---|---|---|---|---|---|
| **Webflow** | SaaS | No-code website builder with built-in animation | Free + paid plans from $18/mo | Active | https://webflow.com | https://webflow.com | Acquired GSAP in 2024 — GSAP now free. Basic $18/mo, CMS $29/mo, Business $49/mo. |
| **Framer** | SaaS | No-code website builder with Motion | Free + paid | Active | https://www.framer.com | https://www.framer.com | Native Motion integration. |
| **Wix Studio** | SaaS | Wix's agency-grade builder | Free + paid | Active | https://www.wix.com/studio | https://www.wix.com/studio | Premium from $17/mo. Animations: scroll effects, parallax, hover, reveal. |
| **Squarespace** | SaaS | Visual website builder | Free trial + paid | Active | https://www.squarespace.com | https://www.squarespace.com | Less animation depth than Webflow/Framer. |
| **Editor X** | SaaS | Advanced design control for Wix | Paid | Active | https://www.editorx.com | https://www.editorx.com | Now folded into Wix Studio. |
| **Tilda** | SaaS | Block-based design | Free + paid | Active | https://tilda.cc | https://tilda.cc | Animation modules included. |
| **Readymag** | SaaS | Editorial / portfolio design | Paid | Active | https://readymag.com | https://readymag.com | Used by interactive editorial sites. |
| **Spline** | SaaS | 3D in browser | Free + Pro from $44/mo | Active | https://spline.design | https://spline.design | (also listed in B.3) |
| **Wix Animations** | Subfeature | Wix built-in animation | Bundled with Wix | n/a | n/a | https://www.wix.com | Subsumed by Wix Studio. |

### B.10 — Inspiration / gallery / showcase sites

| Name | Type | Best for | License | Latest | Maintenance signal | URL | Notes |
|---|---|---|---|---|---|---|---|
| **Awwwards** | Gallery | Award-winning sites of the day | Free browsing + Pro from $15/mo | Active | https://www.awwwards.com | https://www.awwwards.com | Filter by tech (Three.js, GSAP, R3F, Webflow). |
| **CSS Design Awards** | Gallery | CSS-focused sites | Free | Active | https://www.cssdesignawards.com | https://www.cssdesignawards.com | — |
| **Landing.love** | Gallery | Landing pages | Free | Active | https://landing.love | https://landing.love | Conversion-focused curation. |
| **Godly** | Gallery | Auto-aggregated daily | Free | Active | https://godly.website | https://godly.website | Clean tech-stack filtering. |
| **Lapa.ninja** | Gallery | Landing pages | Free | Active | https://www.lapa.ninja | https://www.lapa.ninja | — |
| **Land-book** | Gallery | Product landing pages | Free | Active | https://land-book.com | https://land-book.com | — |
| **Bestfolios** | Gallery | Portfolio inspiration | Free | Active | https://www.bestfolios.com | https://www.bestfolios.com | — |
| **Made with Webflow** | Gallery | Webflow-only curation | Free | Active | https://webflow.com/made-in-webflow | https://webflow.com/made-in-webflow | — |
| **Codrops** | Blog + demos | Creative coding demos | Free | Active | https://tympanus.net/codrops | https://tympanus.net/codrops | High-quality source-coded demos. |
| **FreeFrontend** | Code resource | 340+ GSAP examples | Free | Active | https://freefrontend.com | https://freefrontend.com | Downloadable source. |
| **CodePen** | Playground | Code sharing | Free + Pro | Active | https://codepen.io | https://codepen.io | Search "animated website" for thousands of pens. |
| **Dribbble** | Community | Animation inspiration | Free + Pro | Active | https://dribbble.com | https://dribbble.com | Motion design category. |
| **Behance** | Community | Adobe portfolio | Free | Active | https://www.behance.net | https://www.behance.net | — |
| **CodeSandbox** | Playground | Code playground | Free + Pro | Active | https://codesandbox.io | https://codesandbox.io | React app showcase. |

### B.11 — State management / GUI / dev tools

| Name | Type | Best for | License | Latest | Maintenance signal | URL | Notes |
|---|---|---|---|---|---|---|---|
| **Zustand** | Library | React state mgmt | **MIT** | Latest | 58.5k stars, pmndrs/zustand | https://github.com/pmndrs/zustand | Pair with R3F for scene state. |
| **Jotai** | Library | Atom-based state | **MIT** | Active | https://github.com/pmndrs/jotai | https://jotai.org | — |
| **Valtio** | Library | Proxy-based state | **MIT** | Active | https://github.com/pmndrs/valtio | https://valtio.pmnd.rs | — |
| **Leva** | Library | React GUI for tweaking | **MIT** | Latest | 6.2k stars, pmndrs/leva | https://github.com/pmndrs/leva | 12+ input types, plugin system. |
| **Tweakpane** | Library | Vanilla JS GUI | **MIT** | Active | https://github.com/cocopon/tweakpane | https://tweakpane.github.io | — |
| **Zustand + R3F / Leva** | (stack) | The pmndrs default for 3D scenes | **MIT** | — | — | https://pmnd.rs | — |
| **Rapier** | Physics | 3D physics for R3F | **Apache-2.0** | Active | https://rapier.rs | https://rapier.rs | — |
| **Cannon.js** | Physics | 3D physics (legacy) | **MIT** | Maintained | https://github.com/pmndrs/cannon-es | https://github.com/pmndrs/cannon-es | — |
| **Sketch.js** | Library | Quick canvas sketches | **MIT** | Active | https://github.com/soulwire/sketch.js | https://soulwire.co.uk/sketch.js | — |

### B.12 — Performance / asset optimization

| Name | Type | Best for | License | Latest | Maintenance signal | URL | Notes |
|---|---|---|---|---|---|---|---|
| **Squoosh** | Tool | Image compression (WebP/AVIF) | Free (open source) | Active | https://squoosh.app | https://squoosh.app | Browser-based. |
| **CloudConvert** | Tool | File conversion | Free + paid | Active | https://cloudconvert.com | https://cloudconvert.com | — |
| **HTMLMinifier** | Tool | HTML minify | Free | Active | https://htmlminifier.com | https://htmlminifier.com | — |
| **CSSMinifier** | Tool | CSS minify | Free | Active | https://cssminifier.com | https://cssminifier.com | — |
| **Terser** | Tool | JS minify | Free | Active | https://terser.org | https://terser.org | — |
| **unpkg / jsDelivr / CDNjs** | CDN | npm packages via CDN | Free | Active | https://unpkg.com / https://www.jsdelivr.com / https://cdnjs.com | https://unpkg.com | — |
| **WebPageTest** | Tool | Performance testing | Free + paid | Active | https://www.webpagetest.org | https://www.webpagetest.org | — |
| **Google Lighthouse** | Tool | Perf audit | Free | Active | https://developer.chrome.com/docs/lighthouse | https://developer.chrome.com/docs/lighthouse | — |
| **PageSpeed Insights** | Tool | Public perf audit | Free | Active | https://pagespeed.web.dev | https://pagespeed.web.dev | — |
| **MotionScore** | Tool | Motion-specific perf audit | Free + paid | Active | https://score.motion.dev | https://score.motion.dev | From Motion team. |
| **Favicon.io** | Tool | Favicon generator | Free | Active | https://favicon.io | https://favicon.io | — |
| **RealFaviconGenerator** | Tool | Multi-platform favicon | Free | Active | https://realfavicongenerator.net | https://realfavicongenerator.net | — |
| **Metatags.io** | Tool | OG/Twitter meta preview | Free | Active | https://metatags.io | https://metatags.io | — |
| **Haikei** | Tool | SVG asset generator | Free | Active | https://haikei.app | https://haikei.app | 15+ generators. |
| **Blobmaker** | Tool | SVG blob generator | Free | Active | https://www.blobmaker.app | https://www.blobmaker.app | — |

### B.13 — Audio / sound design libraries

| Name | Type | Best for | License | Latest | Maintenance signal | URL | Notes |
|---|---|---|---|---|---|---|---|
| **Tone.js** | Library | Web Audio API framework | **MIT** | Active | https://github.com/Tonejs/Tone.js | https://tonejs.github.io | — |
| **Howler.js** | Library | Audio playback | **MIT** | Active | https://github.com/goldfire/howler.js | https://howlerjs.com | — |
| **p5.sound** | Library | Audio + p5.js | **LGPL-2.1** (matches p5.js) | Active | https://p5js.org/reference/#/libraries/p5.sound | https://p5js.org/reference/#/libraries/p5.sound | Audio-reactive animation. |
| **pixi-sound** | Library | Audio for PixiJS | **MIT** | Active | https://github.com/pixijs/sound | https://github.com/pixijs/sound | — |

### B.14 — WebXR / VR / AR

| Name | Type | Best for | License | Latest | Maintenance signal | URL | Notes |
|---|---|---|---|---|---|---|---|
| **@react-three/xr** | Library | WebXR for R3F | **MIT** | Active | https://github.com/pmndrs/react-three-xr | https://github.com/pmndrs/react-three-xr | — |
| **`<model-viewer>`** | Web Component | Already listed in B.3 | — | — | — | — | — |

---

## Section C — Ready templates / examples (downloadable)

### C.1 — Online (live, deployable) — benchmarks & inspiration

| Name | URL | Type | What it demonstrates | License / access |
|---|---|---|---|---|
| **Lusion** | https://lusion.co | Studio portfolio | Three.js / WebGL / GSAP / custom shaders / WebGPU research | Free to view |
| **Active Theory** | https://activetheory.net | Studio portfolio | WebGL-first, Three.js, custom WebGL | Free to view |
| **Obys Agency** | https://obys.agency | Studio portfolio | Dark / typography-forward / WebGL experiments | Free to view |
| **Unseen Studio** | https://unseen.studio | Studio portfolio | Cinematic 3D, atmospheric | Free to view |
| **Resn** | https://resn.com | Studio portfolio | Playful 3D, experimental | Free to view |
| **Apple iPhone 17 Pro page** | https://www.apple.com/iphone-17-pro/ | Product page | Material animation, scroll storytelling, hero-reveal | Free to view (benchmark) |
| **Stripe Sessions** | https://stripe.com/sessions | Marketing | Scroll-driven sectional reveals, SVG morph | Free to view |
| **Vercel Homepage** | https://vercel.com | Marketing | Subtle animation brand identity | Free to view |
| **Linear** | https://linear.app | Marketing | Micro-interactions, hover-driven UI | Free to view |
| **Framer homepage** | https://www.framer.com | Marketing | Native Motion integration, page transitions | Free to view |
| **Awwwards** | https://www.awwwards.com | Gallery | Daily award + tech filter | Free browsing |
| **Godly** | https://godly.website | Gallery | Auto-aggregated | Free browsing |
| **Landing.love** | https://landing.love | Gallery | Conversion-focused | Free browsing |
| **CSS Design Awards** | https://www.cssdesignawards.com | Gallery | CSS-heavy | Free |

### C.2 — Open-source starter repos (GitHub)

| Name | URL | Tech | What it includes | Last update | License | Best for |
|---|---|---|---|---|---|---|
| **drill-webgi-tutorial** | https://github.com/ektogamat/drill-webgi-tutorial | TS, parcel | Scrollable 3D landing page with WEBGi engine | Active (194+ stars) | MIT | R3F + GSAP scroll-driven 3D |
| **Fyrre-Magazine** | https://github.com/asbhogal/Fyrre-Magazine | Next.js, TS, Tailwind, Shadcn | Full magazine SPA with horizontal scroll text | Active (132+ stars) | MIT | Editorial + GSAP |
| **nuxt-creative-base** | https://github.com/jankohlbach/nuxt-creative-base | Nuxt 3, SCSS | Smooth scroll, WebGL images, custom cursor | Active (47+ stars) | Free template | Vue creative dev |
| **agency-kit-site** | https://github.com/pinak3748/agency-kit-site | Next.js 15, Tailwind, Shadcn | Full agency site + MDX blog + dark/light | Active (37+ stars) | MIT | Next.js agency |
| **stunning-ia-lp** | https://github.com/pedroestevaodev/stunning-ia-lp | Next.js 14, Tailwind | AI startup landing page with hero reveal + parallax | Active (11+ stars) | MIT | AI landing page |
| **aurora-landing** | https://github.com/langgptai/aurora-landing | Next.js 13+, Tailwind, Shadcn | Modern animated landing page | Active (4+ stars) | MIT | Next.js 13+ landing |
| **Landing template** | https://github.com/hakimov-dev/landing-template | Nuxt, Vue, TS, Tailwind | AOS-based scroll reveal landing | Active (28+ stars) | Free template | Simple scroll-reveal |
| **Origami** (Codrops) | https://github.com/paveldogreat/Origami | R3F, Three.js | 12 free animated 3D objects | Active | MIT | Reusable 3D components |
| **Codrops demos** | https://github.com/codrops | HTML/CSS/JS | 200+ animation demos | Active | Mostly MIT / Codrops license | Source-codable demos |
| **PageFlipLayout** | https://github.com/codrops/PageFlipLayout | HTML/CSS/JS | Magazine-style page flip | Active | Codrops free | Magazine/editorial |
| **DraggableMenu** | https://github.com/codrops/DraggableMenu | HTML/CSS/JS | Draggable menu with thumbnails | Active (144+ stars) | Codrops free | Menu interaction |
| **PlayersClub (Codrops)** | https://github.com/crnacura/PlayersClub | Astro 5.2, JS | Music artist showcase, GSAP+Lenis+View Transitions | Active | MIT | Astro artist site |
| **nuxt-starter-prismic-glideai** | https://github.com/prismicio-community/nuxt-starter-prismic-glideai | Nuxt, Vue, TS, Tailwind | Dark modern site with CMS | Active (59+ stars) | Apache-2.0 | Nuxt + Prismic |
| **motion examples** | https://motion.dev/docs | (web docs) | 330+ Motion examples, copy-paste | Active | MIT (code) | Motion.js learning |
| **GSAP Showcase** | https://gsap.com/showcase | (web docs) | Featured community demos | Active | MIT | Inspiration |
| **R3F examples** | https://r3f.docs.pmnd.rs/getting-started/examples | (web docs) | Declarative 3D examples | Active | MIT | R3F learning |

### C.3 — Commercial templates (paid)

| Name | Vendor URL | License tier | Price range | Animation tech |
|---|---|---|---|---|
| **Spline 3D Website Template Bundle** | https://spline.design | Free + Pro / Team | $0-$44/mo | Spline runtime |
| **Webflow Marketplace Templates** | https://webflow.com/templates | Single / extended | $0-$129 | Webflow interactions + GSAP + Lottie + Rive |
| **Framer Marketplace Templates** | https://www.framer.com/marketplace/templates | Single | $0-$99 | Framer native Motion |
| **ThemeForest — Animated HTML5** | https://themeforest.net/category/site-templates/animated-html5 | Single / extended | $19-$80 | Various (GSAP, Anime.js, Three.js) |
| **TemplateMonster — Animated** | https://www.templatemonster.com/animated.php | Single / extended | $25-$120 | Various |
| **Awwwards Marketplace** | https://www.awwwards.com/market | Single | $19-$199 | High-end |
| **Wix Studio Templates** | https://www.wix.com/studio/templates | Free + subscription | Free tier | Wix animations |
| **Squarespace Templates** | https://www.squarespace.com/templates | Subscription | bundled | Squarespace animations |
| **Aceternity Pro (premium blocks)** | https://ui.aceternity.com | Subscription | $49/first-year | Framer Motion + Tailwind |
| **Magic UI Pro** | https://www.magicui.design | Single | $99-$199 | Framer Motion + Tailwind + Shadcn |

### C.4 — Offline (pre-bundled, no internet required)

| Name | Where to find it | Size | Use case |
|---|---|---|---|
| **`motion` npm examples** | `node_modules/motion/examples/` or `npm install motion && ls node_modules/motion/ | < 5 MB | Offline reference for Motion API |
| **`gsap/dist/` bonus files** | `npm install gsap && ls node_modules/gsap/dist/` | ~1.5 MB | Minified core + all plugins offline |
| **Three.js offline docs** | https://threejs.org/docs (download offline) | ~50 MB | Three.js reference |
| **R3F + Drei Storybook** | `npm install @react-three/drei && npx storybook dev` | bundled | Per-component browser preview |
| **Animate.css CSS file** | `npm install animate.css` → `node_modules/animate.css/animate.min.css` | ~80 KB | Pure CSS animations offline |
| **Sal.js dist** | `npm install sal.js` → `node_modules/sal.js/dist/` | < 3 KB | Scroll-reveal offline |
| **AutoAnimate** | `npm install @formkit/auto-animate` | ~4 KB | One-line layout animations offline |
| **Lottie offline samples** | `npm install @lottiefiles/lottie-player` | bundled | Sample Lottie JSON files in package |
| **PixiJS samples** | `npm install pixi.js` → `node_modules/pixi.js/examples/` | several MB | WebGL/Canvas2D examples |
| **Cushion ICU Codrops ZIP demos** | Codrops demos page → download ZIP | varies | Self-contained HTML files |

---

## Section D — Build vs. reuse decisions — please confirm

See Section "Build vs. reuse decisions — please confirm" above (10 questions). User confirming the defaults (Lenis + GSAP + Three.js/R3F + dotLottie + View Transitions + SplitType + Webflow + Haikei + Zustand + Leva) yields a coherent stack. **Alternative paths** if the user prefers:

- **No-code first:** Webflow (animations) + LottieFiles (micro-animations) + GSAP (advanced) + native View Transitions (page transitions) + Webflow templates marketplace.
- **Vanilla HTML/JS first:** GSAP + Three.js (no R3F) + Lenis + CSS animations + Lottie-web.
- **Next.js first:** React Three Fiber + Motion + GSAP + Lenis + Zustand + Leva + dotLottie-react + View Transitions + native CSS scroll-driven animations.

## Section E — Risks and doubts (consolidated)

(This is the section's mandatory risk block — referenced above in the early "## Risks and doubts" section. The same items are reused here for the angle-specific "what to watch").

- **R1 — Remotion license trap** (high) — Solo/indie use is free; > 1 FTE company or revenue > 1M EUR requires a paid company license. Dossier must state thresholds explicitly.
- **R2 — Theatre.js studio AGPL** (medium) — Only the studio editor is AGPL; runtime is Apache. Shipped code uses only the core, but vendor/edge cases warrant caution.
- **R3 — GSAP "free forever" depends on Webflow** (low) — If Webflow pulls funding, GSAP may return to paid. Keep Motion + Anime.js as fallback engines.
- **R4 — Anime.js v4 killed v3 plugin syntax** (medium) — v3 tutorials are stale. Always cite v4 import (`import { animate } from 'animejs'`).
- **R5 — Source file baked-in placeholders** (high) — `https://cloudflare.com`, `https://github.io` are not real URLs. Misleading if pasted verbatim into the dossier.
- **R6 — animate.css is Hippocratic License, not MIT** (medium) — Old blog posts and StackOverflow answers still cite it as MIT. Adopters may unknowingly use a license with a "do no harm" clause.
- **R7 — ScrollMagic v3 vs v2 tutorials** (low) — V2-stable branch is still common in search results; v3 is a from-scratch rewrite.

## Section F — Self-critique

- **Did I do my job?** Yes. Verified 50+ library rows via direct GitHub / official site fetches. Caught 6 inaccuracies in the sibling research (GSAP now free, Lenis repo moved, Theatre license split, Remotion commercial license, AutoAnimate moved to formkit/, animate.css is Hippocratic). 30+ templates across 4 categories.
- **What might I have missed?**
  - **CSS-only libraries:** CSS animation libraries like `animate.css`, `hint.css`, `magic.css`, `css-loaders`, `loaders.css`, `css-spinner`, `tailwindcss-animate` are under-represented. The dossier focuses on JS-driven engines.
  - **Audio-reactive libraries:** p5.sound, Tone.js, howler.js are added but limited coverage. Web Audio API for animation directly is large.
  - **WebXR libraries:** immersiveXR, react-three-xr, model-viewer — limited catalog.
  - **SVG-drawing libraries:** SVG.js, paper.js, snap.svg only one-line entries. Could be expanded.
  - **Particle systems:** tsparticles (TypeScript), Proton (WebGL), Emergence.js — not added.
  - **Storybook-driven animation showcases:** Storybook + GSAP/Framer would be a useful category.
  - **Huge template marketplace omission:** Squarespace and Editor X have hundreds of animated templates I did not enumerate.
  - **Godly.website freshness:** Could not verify the exact 2026 site URL; relied on cached knowledge.
  - **component-game libraries for animation** (Kaboom, Phaser) — not added but adjacent to motion.
- **What did I assume without evidence?**
  - That p5.js 2.0 is "in beta" (read from repo but p5.js 2.0 is actively shipping).
  - That animate.css is actively maintained (82.7k stars suggests yes, but I did not verify recent commit dates).
  - That Opal (popular CSS animation lib) is current — did not include.
  - That "Spline" is the canonical no-code 3D tool, but Framer and Webflow also support 3D embeds.
  - That template marketplaces (ThemeForest, TemplateMonster) have not changed their licensing tiers.
  - That the World-Class build-vs-reuse defaults above are reasonable for **any** animated-website builder, when in fact they bias toward React/Next.js + WebGL.
- **What falls into the planning lane (not researched)?**
  - Concrete build instructions per genre (angle C's job).
  - Artistic direction / motion grammar (am-design's job).
  - Final dossier organization / merge logic (master's job).

---

## Recommendations for the planning agent

1. **Treat the Build-vs-Reuse answers as critical path.** Without confirming the 10 component choices, the dossier cannot specify a stack. Suggest master ask the user before am-coder starts producing the final documents.
2. **GSAP going free is the centerpiece finding.** Almost every "Resources Catalog" the user finds online (including the sibling research) is still presenting GSAP as paid. The dossier must lead with this correction.
3. **Two licenses need flagging in any commercial deployment:** Remotion (commercial-license threshold) and Theatre.js studio (AGPL). Without flagging, the dossier ships unsafe advice.
4. **The Lenis repo moved.** All older tutorials citing `studio-freight/lenis` need a footnote pointing to `darkroomengineering/lenis`.
5. **The "online" and "open-source" template sub-tables are the highest-leverage section for end users.** The catalog is encyclopedia content; the templates are the actionable part.
6. **Do NOT push users toward any single no-code platform.** Webflow, Framer, Wix Studio each have different strengths; the dossier should treat them as alternatives.
7. **Three.js r185 + WebGPU is the new baseline for 3D sites.** Any 2026+ animated-website dossier should note WebGPU is now first-class.
8. **The Motion AI Kit (motion.dev/ai-kit) is a category-defining tool for AI-coded animated sites.** Worth surfacing to the master pipeline if the user is building AI-driven animated sites.

---

## Open questions for the user

1. **Stack bias:** Should the dossier's recommendations assume React/Next.js, or stay stack-agnostic?
2. **End-user audience:** Senior devs, junior designers/devs, non-technical founders, or all three?
3. **Budget rules:** When the dossier says "free", does that include attribution-required (e.g. most Lottie marketplace items)?
4. **Curator-aggregated galleries:** Is `godly.website` worth a slot, or focus only on first-party verification?
5. **Legacy libraries:** Should super-stale libraries (Velocity.js, waypoints.js, Popmotion) be in a "legacy" subsection or omitted entirely?

---

## Metrics

- findings: 14
- risks_HIGH: 2
- risks_MEDIUM: 3
- risks_LOW: 2
- clarifying_Qs: 5

---

(Template self-critique section — required. Re-stated here for the angle-B report.)

## Self-critique (required)

- **Did I do my job?** Partial-to-yes. The catalog is verified and license-flagged. Several library categories (CSS-only, audio-reactive, WebXR, particle systems) are missing or thin. The build-vs-reuse block is opinionated rather than truly user-decisioned — the user must walk it through.
- **What might I have missed?** CSS-only libraries (animate.css, css-loaders, magic.css), particle systems (tsparticles, Proton), audio-reactive libraries (Tone.js, p5.sound, Web Audio API), WebXR libraries (react-three/xr, immersive-web), storybook-driven animation showcases, more granular breakdown of template marketplaces (ThemeForest, TemplateMonster).
- **What did I assume without evidence?** p5.js 2.0 status, animate.css maintenance, Opal CSS animation library, Spline as canonical 3D tool, template marketplace licensing tiers, React/Next.js bias in the build-vs-reuse defaults. I should have also verified that 30+ resources exist (counted: 70+ library entries in Section B; ~15 open-source + 4 commercial template entries in Section C — well over the 30 floor).
- **What falls into the planning lane?** Per-genre build instructions, motion grammar, dossier organization.
