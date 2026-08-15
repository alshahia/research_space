# Motion Grammar for Animated-Website Research Dossier

**Task id:** T-2026-07-29-001  
**Date:** 2026-07-29  
**Brief type:** Motion-grammar for animated-website research dossier  
**Audience:** Research dossier authors and downstream agent authors  
**Medium:** Web-responsive documentation covering mobile, tablet, desktop, and 4K contexts  
**Scope:** Framework-agnostic visual and motion system; no application implementation

## Purpose and authority

This brief is the canonical visual and motion reference for every downstream document in the animated-website dossier. It normalizes the useful evidence in `resources/animated_website_raw_research.txt` into one framework-agnostic grammar. The scraped conversation is evidence only: its specific library claims, performance claims, example URLs, and implementation snippets are not treated as verified authority.

Use the dot-separated token names in prose. `tokens.json` mirrors the values for machine consumers. A downstream document may describe different techniques or genres, but it must map them back to this grammar.

## 1. Color and theme tokens

The base theme is light. The dark theme overrides the same semantic names; it is not a separate naming system.

| Token | Light | Dark | Role |
|---|---:|---:|---|
| `color.bg` | `#F7F8FA` | `#0D1117` | Page canvas |
| `color.surface-1` | `#FFFFFF` | `#161B22` | Primary content surface |
| `color.surface-2` | `#EDF1F5` | `#21262D` | Grouped or raised region |
| `color.surface-3` | `#E2E8F0` | `#2D333B` | Highest non-modal surface level |
| `color.ink` | `#161B22` | `#F0F6FC` | Primary text |
| `color.ink-muted` | `#4B5563` | `#A8B3C0` | Secondary text; not disabled text |
| `color.line` | `#7B8794` | `#66717F` | Meaningful boundary or focus-adjacent line |
| `color.line-subtle` | `#D0D7DE` | `#30363D` | Decorative separator only; never the sole state cue |
| `color.primary` | `#005A9C` | `#6EB5FF` | Main action, link, selected state |
| `color.on-primary` | `#FFFFFF` | `#07111F` | Content on `color.primary` |
| `color.accent` | `#A63D00` | `#FFB44C` | Secondary emphasis, data-series counterpart |
| `color.on-accent` | `#FFFFFF` | `#1A1205` | Content on `color.accent` |
| `color.success` | `#0A6B34` | `#4AD985` | Confirmed success |
| `color.warning` | `#7A4B00` | `#FFD166` | Caution requiring attention |
| `color.danger` | `#B42318` | `#FF8A80` | Destructive or error state |

### Contrast and color-blind use

- Verified against `color.bg`: light `ink` 16.28:1, `ink-muted` 7.11:1, `line` 3.45:1, `primary` 6.72:1, and `accent` 6.01:1; dark `ink` 17.39:1, `ink-muted` 8.90:1, `line` 3.82:1, `primary` 8.76:1, and `accent` 10.71:1.
- `color.on-primary` and `color.on-accent` exceed 7:1 in their intended pairings except light `on-accent`, which is 6.39:1 and still exceeds WCAG AA for body text.
- `primary` blue and `accent` orange form the default color-vision-deficiency-safe categorical pair. Never encode a distinction with that pair alone: add a label, shape, pattern, position, or icon.
- `success`, `warning`, and `danger` always include text or icon semantics. Their light-theme contrast on `color.bg` is at least 6.19:1; their dark-theme contrast is at least 8.29:1.
- Theme changes must preserve semantic roles. Do not turn `danger` into a brand accent or use `line-subtle` as the only control boundary.

## 2. Typography

Choose one pairing per site or worked example. Do not mix display families from one pairing with body families from another without documenting a deliberate hybrid.

| Pairing | Display family token | Body family token | Intended character |
|---|---|---|---|
| Editorial | `typography.family-editorial-display`: Source Serif 4, Georgia, Times New Roman, serif | `typography.family-editorial-body`: Source Sans 3, system-ui, sans-serif | Long-form stories, magazines, cultural or institutional work |
| Product | `typography.family-product-display`: Inter Tight, Inter, system-ui, sans-serif | `typography.family-product-body`: Inter, system-ui, sans-serif | Interfaces, SaaS, commerce, utilities |
| Playful / experimental | `typography.family-playful-display`: Space Grotesk, Arial, sans-serif | `typography.family-playful-body`: Atkinson Hyperlegible, system-ui, sans-serif | Portfolios, creative studios, experimental campaigns |

### Type scale

| Token | Size | Default line-height | Use |
|---|---:|---:|---|
| `typography.size-0` | 12px | `typography.line-height-ui` 1.35 | Metadata; never primary reading text |
| `typography.size-1` | 14px | 1.45 | Labels, captions, compact controls |
| `typography.size-2` | 16px | `typography.line-height-body` 1.55 | Body baseline |
| `typography.size-3` | 18px | 1.55 | Lead text, comfortable reading |
| `typography.size-4` | 24px | 1.3 | Section heading |
| `typography.size-5` | 32px | 1.2 | Page heading |
| `typography.size-6` | 48px | `typography.line-height-display` 1.05 | Hero heading |
| `typography.size-7` | 72px | 0.98–1.05 | Large editorial or experimental display only |

Use `typography.weight-regular` 400 for body, `typography.weight-medium` 500 for labels, `typography.weight-semibold` 600 for actions and subheads, `typography.weight-bold` 700 for headings, and `typography.weight-heavy` 800 only for short display text. Avoid light-weight body text over animated imagery.

### Multilingual type rules

- Match display to display and body to body across scripts. Editorial Latin should pair with an editorial Arabic or CJK face; product sans should pair with a compatible sans.
- Preferred coverage families are Noto Naskh Arabic or Noto Sans Arabic for Arabic, Noto Sans Hebrew for Hebrew, and Noto Serif/Sans CJK for Chinese, Japanese, and Korean. Validate the exact project font before use.
- Increase Arabic body size by roughly one scale step when the selected face renders optically smaller, and leave extra line height for harakat or niqqud.
- Test accented Latin, Cyrillic, Greek, Arabic, Hebrew, Devanagari, Thai, and CJK samples before locking a font. A Latin-only specimen is insufficient.

## 3. Spacing and layout

### Spacing scale

The system uses a 4px base with an 8px rhythm for larger composition.

| Token | Value | Typical use |
|---|---:|---|
| `spacing.0` | 0px | Reset only |
| `spacing.1` | 4px | Tight optical correction |
| `spacing.2` | 8px | Inline icon/text gap |
| `spacing.3` | 12px | Compact control padding |
| `spacing.4` | 16px | Mobile gutter, card interior minimum |
| `spacing.6` | 24px | Tablet gutter, content grouping |
| `spacing.8` | 32px | Desktop gutter, card gap |
| `spacing.12` | 48px | Section interior |
| `spacing.16` | 64px | Section separation |
| `spacing.24` | 96px | Large narrative beat |
| `spacing.32` | 128px | Maximum static section separation |

### Containers and breakpoints

| Token | Value | Rule |
|---|---:|---|
| `layout.container-prose` | 720px | Reading measure; target about 55–75 Latin characters per line |
| `layout.container-content` | 1200px | Standard multi-column content |
| `layout.container-wide` | 1440px | Editorial grids and product showcases |
| `layout.container-4k` | 1920px | Maximum content canvas on 4K-class displays; do not stretch prose |
| `breakpoint.mobile` | 0px | Single-column baseline |
| `breakpoint.tablet` | 640px | Multi-column when content supports it |
| `breakpoint.desktop` | 1024px | Full navigation and richer choreography may begin |
| `breakpoint.4k` | 1920px | Increase gutters and negative space, not motion amplitude |

Reference frames are 390px mobile, 768px tablet, 1440px desktop, and 2560px CSS-width 4K-class. Treat 1920px as the 4K-class adaptation threshold because operating-system scaling often exposes fewer CSS pixels than the physical 3840px panel.

Use `layout.gutter-mobile` 16px, `layout.gutter-tablet` 24px, `layout.gutter-desktop` 32px, and `layout.gutter-4k` 48px. Layout changes must be content-driven within these reference ranges. Do not multiply motion distances on large screens.

### Geometry and target size

Use `radius.sm` 6px, `radius.md` 12px, `radius.lg` 20px, and `radius.pill` 999px. Use `size.touch-target` 44px as the minimum interactive target; animated visual bounds may be smaller only when the actual hit area remains at least 44px. Supporting interface sizes are `size.icon-small` 16px, `size.icon-base` 24px, `size.control` 40px, and `size.control-large` 48px.

## 4. Motion tokens

Motion communicates hierarchy, cause and effect, spatial continuity, or system status. If a movement does none of those, remove it.

### Duration scale

| Token | Value | Intent |
|---|---:|---|
| `motion.duration.instant` | 0ms | No interpolation; reduced-motion fallback and immediate state replacement |
| `motion.duration.quick` | 80ms | Press, focus, and near-instant micro-feedback |
| `motion.duration.fast` | 140ms | Hover, toggle, compact exit |
| `motion.duration.base` | 220ms | Standard reveal, tab/state transition, small modal |
| `motion.duration.slow` | 360ms | Large panel, section-level movement |
| `motion.duration.story` | 560ms | Deliberate editorial or hero beat |
| `motion.duration.cinematic` | 900ms | One-off scene change; never routine UI feedback |

Pair duration with distance. A short movement must not feel delayed, and a long movement must not cross the screen faster than the eye can track. `cinematic` is a ceiling, not a default.

### Easing scale

| Token | Cubic-bezier | Intent |
|---|---|---|
| `motion.easing.linear` | `cubic-bezier(0, 0, 1, 1)` | Constant-speed progress, scrubbed input, rotation loop only |
| `motion.easing.standard` | `cubic-bezier(0.2, 0, 0, 1)` | Default state transition |
| `motion.easing.enter` | `cubic-bezier(0.16, 1, 0.3, 1)` | Expo-out entrance; settles quickly |
| `motion.easing.exit` | `cubic-bezier(0.4, 0, 1, 1)` | Accelerating exit |
| `motion.easing.in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Object remains visible through a deliberate scene change |
| `motion.easing.overshoot` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Bounded playful confirmation; never for page, camera, or large text travel |

Entrances use `enter`; exits use `exit`; reversible state changes use `standard`; direct manipulation follows the input without an ornamental ease. Overshoot is limited to small controls or icons and must not obscure neighboring content.

### Distance scale

| Token | Value | Use |
|---|---:|---|
| `motion.distance.none` | 0px | Opacity-only or reduced motion |
| `motion.distance.xs` | 4px | Press/focus response |
| `motion.distance.sm` | 8px | Text or compact control reveal |
| `motion.distance.md` | 16px | Card or section child reveal |
| `motion.distance.lg` | 32px | Large panel or editorial beat |
| `motion.distance.xl` | 64px | One hero element only; never routine scrolling content |

On mobile, cap `lg` behavior at `md` and `xl` behavior at `lg`. Motion direction uses logical reading flow (`start`/`end`) rather than physical left/right.

### Stagger and delay defaults

| Token | Value | Use |
|---|---:|---|
| `motion.delay.item` | 60ms | Default delay between related list or grid items |
| `motion.delay.hero` | 100ms | Delay between hero heading, support text, action, and media |
| `motion.delay.section` | 120ms | Handoff between beats in one continuous narrative timeline; not a delay after every scroll trigger |
| `motion.delay.group-cap` | 400ms | Maximum time from first to last item in a group |

Item delay scales with logical item index and stops at `group-cap`. For more than eight items, reveal in semantic batches or reduce item delay; do not make the last item wait through a long cascade. Never add an artificial loading hold to showcase an animation.

### Choreography principles

1. Keep persistent navigation and orientation landmarks stable.
2. Enter the primary heading or key content first.
3. Enter supporting text and media next.
4. Enter the primary action after its context is readable.
5. Enter nonessential ornament last, or leave it static.
6. Stagger in DOM and reading order: top-to-bottom and logical start-to-end. RTL changes logical direction; it does not reverse time, numerals, logos, or audio waveforms.
7. Use one dominant moving focal point at a time. Secondary motion must be quieter, shorter, or delayed.
8. Exit in a compact inverse order only when it clarifies navigation or undo. Routine disappearance should use `fast` + `exit`.
9. Scroll-linked movement follows the user directly. Do not add perceptible lag to wheel, touch, pointer, or keyboard input; do not pin essential reading content behind a long sequence.
10. Content must never depend on its entrance animation to become available. If the trigger fails, the final state remains readable.

### Motion intensity profiles

| Context | Default tokens | Limits |
|---|---|---|
| Product / utility | `quick`–`base`, `xs`–`sm`, `standard` | Feedback first; no cinematic delay |
| Editorial / narrative | `base`–`story`, `sm`–`lg`, `enter`/`in-out` | One narrative focal point; reading remains interruptible |
| Playful / experimental | `fast`–`story`, `sm`–`lg`, bounded `overshoot` | No overshoot on camera/page motion; maintain stable controls |
| Immersive / 3D | Input-linked or `slow`–`cinematic`, scene transitions only | One full-viewport scene; provide static fallback and pause offscreen |
| Data visualization | `base`–`slow`, `none`–`sm`, `standard` | Preserve axes and labels; never use motion as the only distinction |

## 5. Reduced-motion mapping and accessibility

When `prefers-reduced-motion: reduce` is active:

| Full-motion behavior | Reduced behavior |
|---|---|
| `quick`, `fast`, or `base` micro-feedback | Opacity, color, or border feedback only; use `quick` as the maximum duration |
| `slow`, `story`, or `cinematic` entrance/exit | Replace with `instant`; render the final state immediately |
| Any translate, scale, rotate, blur, zoom, parallax, tilt, cursor trail, or simulated camera motion | Replace with `motion.distance.none` and no scale/rotation |
| Scroll-scrubbed or pinned narrative | Present static sections in normal document flow |
| Auto-playing loop or ambient field | Pause; show a static representative frame |
| Loading spinner | Prefer static progress text or determinate progress; if rotation remains necessary, keep it small and non-flashing |
| Success/error feedback | Keep immediate icon, text, and color feedback; motion is optional |

Additional accessibility rules:

- Never hide content initially in a way that leaves it invisible when animation fails or scripting is unavailable.
- No flashing content at or above three flashes per second. Avoid large alternating luminance changes even below that threshold.
- Motion cannot be the only status, focus, validation, or navigation cue.
- Long or repeating motion must have pause/stop control when it starts automatically and lasts more than five seconds.
- Keyboard focus and screen-reader order follow document order, not visual animation order.
- Avoid full-screen zoom, rapid depth shifts, multi-axis parallax, and oscillation even when reduced motion is not requested.
- Do not force smooth scrolling; preserve browser and assistive-technology navigation expectations.

## 6. Performance budget

- Core animation properties are transform and opacity only. Layout-triggering properties such as width, height, inset positions, margin, padding, and grid tracks change without interpolation.
- Cap concurrent visible animation tracks at `motion.limit.concurrent` = 8. Use at most `motion.limit.full-viewport-scenes` = 1 full-viewport canvas/WebGL scene and at most `motion.limit.ambient-loops` = 2 ambient loops.
- Target the display refresh cadence; at 60Hz the whole frame is about 16.7ms. Keep animation scripting to a small minority of that frame and treat any long main-thread task as a defect.
- Pause animation, video, canvas, and per-frame input work when offscreen, backgrounded, or not visible.
- Use `will-change` only immediately before and during a known transform/opacity animation, then remove it. Never apply it globally or permanently to a large list.
- Do not animate large blur radii, filters, shadows, masks, or full-screen gradients on low-power/mobile paths without measured evidence.
- Responsive assets reserve intrinsic dimensions to prevent layout shift. Hero media is not lazy-loaded if it is the primary above-the-fold content; below-the-fold media is deferred.
- Avoid mandatory preloaders. Show load feedback only for a real wait, never add a timer, and do not hold readable content until decorative assets finish.
- Scroll and pointer handlers must not perform repeated layout reads and writes in the same frame. Heavy interaction is disabled for coarse pointers and constrained devices.
- Performance claims require measurement on representative mobile and desktop hardware. “GPU accelerated” is not evidence by itself.

## 7. Motion principles checklist

- [ ] Every animation communicates hierarchy, causality, continuity, status, or orientation; otherwise it is removed.
- [ ] Duration and distance use named tokens and are proportionate.
- [ ] Entrances use `motion.easing.enter`, exits use `motion.easing.exit`, and direct manipulation follows input.
- [ ] Stagger follows reading order, scales with item index, and never exceeds `motion.delay.group-cap`.
- [ ] One dominant moving focal point is active at a time, with no more than eight concurrent tracks.
- [ ] Every behavior has an explicit reduced-motion mapping; essential content is visible without animation.
- [ ] Long-running loops are compositor-friendly, pausable, and stopped when offscreen.
- [ ] No motion relies on color alone, flashes at unsafe frequency, or blocks keyboard/screen-reader order.

## 8. Cultural-fit checklist

- [ ] Directional motion uses logical start/end. Mirror chevrons, breadcrumbs, progress flow, and page-turn direction for RTL; do not mirror logos, time numerals, mathematical operators, or audio waveforms.
- [ ] Stagger order follows the localized reading order, including RTL grids and any opted-in vertical CJK composition.
- [ ] Display/body font roles are matched across scripts; diacritics, connected scripts, Thai line breaks, and CJK wrapping are tested with real strings.
- [ ] Color meaning is reviewed per region. Red, white, and green are not assigned universal cultural meaning, and color never stands alone as a signal.
- [ ] Scroll-driven storytelling remains interruptible and compatible with keyboard navigation; page-flip metaphors follow local reading direction and are never imposed on long-form content.
- [ ] Audio cues are opt-in after user interaction, never autoplayed as the sole cue, and have text/visual equivalents. Voice or narration needs transcript and locale review.
- [ ] Avoid vestibular triggers such as large zoom, horizon movement, multi-layer parallax, cursor chasing, or oscillation; provide a visible site-level motion toggle for motion-heavy experiences when feasible.

## 9. Hand-off contract

The build guide and do/don't files in `research_doc/animated_website_minimax_3/` will use these tokens by name; deviations require a `ponytail: ...` comment.

A deviation comment must state the reason, the known ceiling or risk, and the condition that would justify returning to the canonical token. A downstream author must not silently invent a new duration, easing, distance, breakpoint, color role, or typography scale value.

Required downstream behavior:

1. Cite `share/design/T-2026-07-29-001/brief.md` as the visual and motion authority.
2. Use dot-separated names such as `motion.duration.base`, `motion.easing.enter`, `motion.distance.md`, and `motion.delay.item` in prose and tables.
3. Map implementation-specific engine names to these tokens rather than replacing the grammar with engine defaults.
4. Include the reduced-motion and performance rules in every build path, including CSS-only, timeline, scroll-driven, SVG, canvas, WebGL, and page-transition genres.
5. Preserve logical direction and locale checks in all examples.

## 10. Evidence consulted

- `agents_manager/design/resources/motion-spec-template.md` — canonical token/rule structure, compositor-only baseline, reduced-motion fallback, and sequence format.
- `agents_manager/design/resources/token-schema.md` — portable token groups and semantic alias direction.
- `agents_manager/design/resources/multi-locale-checklist.md` — script coverage, RTL mirroring, number/date behavior, typography, and cultural checks.
- `resources/animated_website_raw_research.txt` — evidence for common patterns such as scroll reveals, hover feedback, loaders, responsive adaptation, cursor/tilt effects, 3D/canvas, asset sizing, sound, and transform/opacity guidance. Specific claims remain subject to authoritative verification in the research and build phases.

No implementation library is selected by this brief.

## 11. Self-critique

- The palette is deliberately neutral and cannot replace a product-specific brand palette or region-specific color study.
- Font families are recommended categories and fallbacks, not proof that every weight or script subset is licensed, available, or metrically compatible.
- This web dossier does not specify native haptics, device vibration, spatial-computing comfort zones, or platform transition conventions.
- Voice-driven motion, sign-language media choreography, and synchronized caption animation need separate specialist guidance.
- `prefers-reduced-motion` is only a baseline. The brief does not include user research with people who have vestibular, cognitive, migraine, or photosensitive conditions.
- The concurrency and timing limits are safe defaults, not measured budgets for a specific device matrix; downstream implementation still requires profiling.
- Breakpoints are shared documentation references. A real site must adjust layouts when its content requires it rather than forcing every genre into fixed device classes.
