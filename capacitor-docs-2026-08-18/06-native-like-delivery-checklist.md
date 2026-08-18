# Native-Like Delivery Checklist

**Audience:** Engineer working on the native-like delivery layer of a Capacitor app.
**Anchor:** Capacitor v8.5.0 (verified 2026-08-18). The six-axis priority list at the top is the user's calibration knob (auto-answers Q15). The 14-area long-tail below is the polish list.
**Cross-references:** back to `02-install-and-setup.md` for the dep install; forward to `07-best-companion-libraries.md` for UI library choices that affect native-feel; `09-do-and-dont.md` for anti-patterns; `10-known-issues-and-solutions.md` for known issues.

This chapter is the load-bearing native-feel checklist. Every row is one verification the engineer (or the LLM agent) must close before the app is shippable. The six-axis list at the top is the calibration knob -- the user brief reduced to the six things that, if missed, mark the app as a wrapped browser tab. The long tail is the 14-area checklist plus the bonus memory-pressure row. Common pitfalls at the bottom document the typical first-week mistakes.

## The 6-axis priority list (calibration knob)

The user's six-axis priority list, from the brief: **safe-area insets, status bar, splash screen, haptics, back-button handling, dark-mode-follow**. Get these six right before you start on the long tail; miss any of them and the app reads as a wrapped browser tab regardless of how polished the rest is.

### Axis 1 -- Safe-area insets

- **Goal:** every interactive element sits inside the device cutout / home indicator / Dynamic Island; no content hidden under the notch or behind the home indicator.
- **Official plugin:** none (CSS-only via `env(safe-area-inset-*)`); `@capacitor/system-bars` (new in v8) can read the inset values for JS-side adjustments [C-S40][C-S19].
- **Required setup:**
  ```html
  <!-- index.html -->
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  ```
  ```css
  /* app container */
  .app-root {
    padding-top: env(safe-area-inset-top);
    padding-right: env(safe-area-inset-right);
    padding-bottom: env(safe-area-inset-bottom);
    padding-left: env(safe-area-inset-left);
  }
  ```
- **Common pitfall:** leaving the default meta viewport without `viewport-fit=cover`; `env(safe-area-inset-*)` resolves to `0` and content sits behind the notch. The Capacitor WebView does NOT inject the `viewport-fit=cover` meta for you -- this is the bundler's responsibility [C-S40].

### Axis 2 -- Status bar

- **Goal:** status-bar icon contrast follows the app theme; background color matches the app background; no white flash on launch; no overlap with the web content.
- **Official plugin:** `@capacitor/status-bar` 8.0.3 (`Style` enum: `DARK` | `LIGHT` | `DEFAULT`; `setStyle`, `setBackgroundColor`, `setOverlaysWebView`, `hide`, `show`, `getInfo`) [C-S25].
- **Required setup:**
  ```ts
  // app root, called once and again on every theme change
  await StatusBar.setStyle({ style: theme === 'dark' ? Style.Dark : Style.Light });
  await StatusBar.setBackgroundColor({ color: theme === 'dark' ? '#0b0b0d' : '#ffffff' });
  // Only set overlaysWebView: true if your design is truly edge-to-edge
  // AND the safe-area padding is fully compensated.
  await StatusBar.setOverlaysWebView({ overlay: true });
  ```
- **Common pitfall:** setting the status bar style once at app launch and never re-applying it on theme change (leaves a white-bar tell); setting `overlaysWebView: true` without compensating safe-area (content sits behind the status bar) [C-S25].

### Axis 3 -- Splash screen

- **Goal:** a native-quality launch screen on iOS and Android 12+ adaptive-icon-aware on Android; the splash hides only after first meaningful paint, never before; a dark variant exists if the app supports dark mode.
- **Official plugin:** `@capacitor/splash-screen` 8.0.2 (`show`, `hide`, `launchShowDuration` (default 3000 ms), `launchAutoHide` (default true), `launchFadeOutDuration`, `backgroundColor`, `splashFullScreen`, `splashImmersive`) [C-S29]; `@capacitor/assets` 3.0.5 to generate the icon + splash source files [C-S24].
- **Required setup:**
  ```ts
  // capacitor.config.ts plugins block
  SplashScreen: {
    launchShowDuration: 800,
    launchAutoHide: true,
    launchFadeOutDuration: 200,
    backgroundColor: '#0b0b0d',
    showSpinner: false,
    splashFullScreen: true,
    splashImmersive: true,
  }
  ```
  ```ts
  // app root, after first meaningful paint (NOT in index.html body)
  import { SplashScreen } from '@capacitor/splash-screen';
  // ...first paint logic
  await SplashScreen.hide();
  ```
- **Common pitfall:** relying on the native `launchShowDuration` timeout (default 3 s) instead of calling `SplashScreen.hide()` after the SPA hydrates (the splash lingers while the JS bundle boots and the user sees a frozen launch); generating only a flat `1024x1024` PNG and letting the default-mode pipeline pin it to all densities (Android 12+ adaptive-icon mask is wrong) [C-S24][C-S29].

### Axis 4 -- Haptics

- **Goal:** tactile feedback on tap (light), confirm (medium), destructive (heavy), operation result (success / warning / error), and around scroll-wheel pickers (`selectionStart` / `selectionChanged` / `selectionEnd`).
- **Official plugin:** `@capacitor/haptics` 8.0.2 (`impact(style)`, `notification(type)`, `vibrate(duration)`, `selectionStart()`, `selectionChanged()`, `selectionEnd()`; enums `ImpactStyle` = `Heavy | Medium | Light | Rigid | Soft`, `NotificationType` = `Success | Warning | Error`) [C-S28].
- **Required setup:**
  ```ts
  import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
  // Tap on a primary button
  await Haptics.impact({ style: ImpactStyle.Light });
  // Confirm an operation
  await Haptics.notification({ type: NotificationType.Success });
  // Scroll-wheel picker
  await Haptics.selectionStart();
  await Haptics.selectionChanged(); // on each value change
  await Haptics.selectionEnd();
  ```
- **Common pitfall:** calling `Haptics.vibrate({ duration: 500 })` on iOS -- iOS has no single-duration vibrator API and the call is a no-op there; use `impact + Light` or `notification + Error` for that pattern instead. Calling haptics on every render commit burns battery and trains users to ignore the feedback [C-S28].

### Axis 5 -- Back-button handling

- **Goal:** the Android hardware back button (and the gesture-back on Android 10+) behaves predictably -- pops the in-app history if there is one, exits the app if there is not; the iOS swipe-back gesture (where implemented) does the same.
- **Official plugin:** `@capacitor/app` 8.1.1 (`addListener('backButton', handler)`, `exitApp()`, `toggleBackButtonHandler({ enabled: boolean })` since 7.1.0) [C-S34][A-S16].
- **Required setup:**
  ```ts
  import { App } from '@capacitor/app';
  App.addListener('backButton', ({ canGoBack }) => {
    if (router.canGoBack()) {
      router.back();
    } else {
      App.exitApp();
    }
  });
  // Optional: disable the default back-button handler if you want
  // full control (Android only).
  // capacitor.config.ts
  // plugins.App.disableBackButtonHandler = true
  ```
- **Common pitfall:** shipping without a custom `backButton` listener and relying on the default (which pops the WebView history -- if your router uses an in-memory stack and not `history.pushState`, the WebView history is empty and the first back press exits the app, which surprises users). Disabling the default handler globally in config (`disableBackButtonHandler: true`) without writing a replacement handler -- the back button stops working altogether [C-S34].

### Axis 6 -- Dark-mode-follow

- **Goal:** the app re-renders its theme when the user toggles the OS appearance; the status bar and splash background follow; the theme controller listens to `prefers-color-scheme` change events, not just the launch-time value.
- **Official plugin:** none (CSS-only via `@media (prefers-color-scheme: dark)`); the `@capacitor/status-bar` plugin must be re-driven on every theme change [C-S40][C-S25].
- **Required setup:**
  ```ts
  // theme controller (universal shape)
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  const apply = (isDark: boolean) => {
    document.documentElement.classList.toggle('dark', isDark);
    if (Capacitor.isNativePlatform()) {
      StatusBar.setStyle({ style: isDark ? Style.Dark : Style.Light }).catch(noop);
      // If you have a splash background that needs to follow the theme:
      // SplashScreen.setBackgroundColor({ color: isDark ? '#0b0b0d' : '#ffffff' }).catch(noop);
    }
  };
  apply(mq.matches);
  mq.addEventListener('change', (e) => apply(e.matches));
  ```
  ```css
  :root { --bg: #ffffff; --fg: #0b0b0d; }
  :root.dark { --bg: #0b0b0d; --fg: #ffffff; }
  ```
- **Common pitfall:** reading `prefers-color-scheme` once at app launch and never subscribing to the `change` event (the user pulls out of Do Not Disturb at 11pm and the app stays light until relaunch); binding the theme to a single CSS class and not re-calling `StatusBar.setStyle` (the bar tells the truth but the bar tell is a white-bar against a dark body); relying on the WebView's auto `meta name="color-scheme"` (inconsistent between iOS WKWebView and Android Chromium) [C-S40].

## The long-tail checklist

The 14-area native-feel checklist plus the bonus memory-pressure row. Every row: area name, correct (do), wrong (don't), source citation.

### 7. Keyboard accessory view

- **Correct:** `Keyboard.setAccessoryBarVisible({ isVisible: false })` on short forms (login, signup, search) so the keyboard does not carry an extra bar above the keys; `Keyboard.setScroll({ isDisabled: false })` so the focused input is scrolled into view.
- **Wrong:** leaving the accessory bar visible on every form (iOS extra bar above the keyboard -- a UI tell).
- **Source:** `@capacitor/keyboard` 8.0.5 docs; `Keyboard.resize` is `KeyboardResize.Native` for non-Ionic stacks, `KeyboardResize.Ionic` only if the DOM has `ion-app` (no-op otherwise) [C-S26].

### 8. Screen orientation lock

- **Correct:** `await ScreenOrientation.lock({ orientation: 'portrait' })` on screen entry for portrait-only screens (game, form, video); `await ScreenOrientation.unlock()` on screen exit.
- **Wrong:** locking portrait globally in `capacitor.config.ts` and forgetting to unlock (users on landscape-only screens cannot rotate); shipping a landscape-only app without testing on iPad split-view.
- **Source:** `@capacitor/screen-orientation` 8.0.1 API; `OrientationLockType` accepts `'any' | 'natural' | 'landscape' | 'portrait' | 'portrait-primary' | 'portrait-secondary' | 'landscape-primary' | 'landscape-secondary'` [C-S27].

### 9. Native-feel typography

- **Correct:** system font stack `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`; line-height 1.4-1.5 for body, 1.2 for headings; weight 400 body / 600 headings; `font-display: swap` if a custom font is required.
- **Wrong:** a web-only font as the only entry (FOIT on cold start); a single weight across all content.
- **Source:** `@capacitor/assets` 3.0.5 docs; Capacitor does NOT ship a font bundler [C-S15][C-S40].

### 10. Touch action (kill tap delay)

- **Correct:** `* { touch-action: manipulation }` globally; for components that must scroll vertically, allow `touch-action: pan-y`.
- **Wrong:** installing `fastclick` (legacy, superseded by `touch-action: manipulation` everywhere Capacitor ships); `touch-action: none` on scrollable elements (kills scroll on iOS).
- **Source:** Capacitor web platform page [C-S40][C-S17].

### 11. Tap-highlight color

- **Correct:** `* { -webkit-tap-highlight-color: rgba(0, 0, 0, 0) }` on interactive elements; preserve `:focus-visible { outline: 2px solid <theme-color> }` for keyboard / accessibility navigation.
- **Wrong:** leaving the default blue tap highlight (the universal "this is a website" tell); disabling focus rings outright (accessibility regression).
- **Source:** Capacitor web platform page [C-S40].

### 12. Scroll inertia

- **Correct:** plain `overflow: auto` -- on Capacitor 8.x (WKWebView + Android System WebView) both honor modern scroll. Add `-webkit-overflow-scrolling: touch` only if a real sub-scroll container measurably needs it.
- **Wrong:** hard-coding `-webkit-overflow-scrolling: touch` across the board (fixes nothing on modern WebViews and pollutes the stylesheet); forcing `overflow: hidden` on `<body>` (no rubber-band -- the jarring "this is not a native scroll" tell).
- **Source:** Capacitor iOS getting-started; web platform docs [C-S17][C-S40].

### 13. Image lazy loading and video autoplay

- **Correct:** `loading="lazy"` on all `<img>` below the fold; `<video autoplay muted playsinline>` for background loops (iOS requires both `muted` AND `playsinline` to autoplay); `IntersectionObserver` for "play video when visible" logic.
- **Wrong:** heavy images with no `loading="lazy"` (burns the first-frame render budget on off-screen images); `<video autoplay>` without `muted playsinline` (iOS refuses to autoplay).
- **Source:** Capacitor web platform page [C-S40][C-S52].

### 14. Performance (animation + list virtualization + memory)

- **Correct:** `transform` + `opacity` for animation only (compositor-only, 60 fps); `will-change` used transiently (set just before an animation, cleared after); virtualize any list > 100 items via `TanStack Virtual` (10-15 kb, framework-agnostic); stable `key` prop on every list row.
- **Wrong:** animating `top / left / width / height / right / bottom` (layout-thrash; 30 fps on mid-range Android); `will-change: transform` on a root container or globally (memory pressure; GPU layer keeps the original texture around); rendering 1000 rows in the DOM (frame budget lost at row 200-400 on mid-range Android).
- **Source:** `TanStack Virtual` docs; Capacitor web platform page [C-S50][C-S40].

### 15. Memory pressure (bonus row)

- **Correct:** `URL.revokeObjectURL(blobUrl)` after the consumer stops using the blob; cap the image cache (LRU of 50-100 entries, NOT an unbounded `Map`); unsubscribe from every `addListener(...)` handle in cleanup.
- **Wrong:** holding a blob URL reference forever (memory leak on a long-running app); keeping an unbounded `Map<url, ImageBitmap>`; never removing `@capacitor/app` `appStateChange` / `pause` / `resume` listeners (double handlers on resume, leaked native references).
- **Source:** `@capacitor/app` API [C-S34][C-S40].

## Capacity / memory -- what browsers do in a Capacitor WebView

The Capacitor WebView is the platform WebView (WKWebView on iOS, Android System WebView on Android), not a separate Chromium. Memory pressure and capacity limits are closer to Safari Mobile / Chrome Mobile than to a desktop browser. Three classes of pressure show up first:

1. **List virtualization.** A 1,000-row list in plain DOM costs ~5 MB of layout + paint state on Android mid-range (per `TanStack Virtual` benchmark, 200-400 rows before frame budget is lost). Virtualize at > 100 rows via `TanStack Virtual`; supply a stable `key` prop; the virtualizer only mounts the visible window [C-S50].
2. **Image size controls.** The WebView decodes the full image bytes regardless of the rendered size. A `300x300` rendered image with a `4000x3000` source costs 8x more memory than the same image at `600x600`. Generate responsive images at the source (`srcset` + `sizes`) or downscale at build time (`vite-imagetools`, `next/image`); never trust the WebView to downscale on the fly [C-S40].
3. **Blob URLs.** `URL.createObjectURL(blob)` returns a handle that pins the blob in memory until `URL.revokeObjectURL(...)` is called or the document unloads. Hold the reference only as long as the consumer needs the blob; revoke on cleanup. Long-running apps that hold blob URLs forever OOM on lower-RAM devices [C-S34][C-S40].

## Animations and transitions

The composite-only path is the only path that hits 60 fps on mid-range Android. Concretely:

- **`transform` + `opacity` only.** Every animation that touches `top`, `left`, `width`, `height`, `right`, `bottom`, `margin`, or `padding` triggers a layout + paint cycle. A 200 ms slide animation on a list item with `top` animation drops to 30 fps on a Pixel 5; the same animation with `transform: translate3d` stays at 60 fps.
- **`will-change` is transient.** Set `will-change: transform` on the element that is about to animate, remove it after the animation ends. Permanent `will-change` on a root container keeps a GPU layer pinned in memory for every visible element -- memory pressure on lower-RAM devices.
- **`IntersectionObserver` for entrance animations.** Trigger an animation when an element scrolls into view; do not animate every element on initial render. The observer's `rootMargin` lets you fire the animation a few hundred ms before the element is fully visible (perceived as "smoother").
- **Page transitions.** A push transition animates the incoming view via `transform: translate3d(100%, 0, 0)` -> `translate3d(0, 0, 0)` (compositor); pair with `@use-gesture/react`'s `useSwipe` for swipe-back (left-edge gesture calls `history.back()`).
- **Avoid `requestAnimationFrame` for repeated work.** If the animation must run on every frame for more than 200 ms, it is either a transform/opacity animation (handled by the compositor, no JS frame loop needed) or it is doing the wrong work [C-S51][C-S40][C-S50].

## Common pitfalls and rejections

Five to seven typical first-week mistakes:

1. **Tap delay on iOS** -- `touch-action: manipulation` globally. Without it, iOS adds a 300 ms delay between touchstart and click. `fastclick` is the legacy workaround; `touch-action: manipulation` is the modern one-liner [C-S40].
2. **White status bar in dark mode** -- `StatusBar.setStyle({ style: Style.Dark })` is the load-bearing call. Set it at launch AND on every theme change; the WebView does not infer the bar style from the page background [C-S25].
3. **Splash fade-in timing** -- `SplashScreen.hide()` MUST be called after first meaningful paint in the SPA root, NOT inside `index.html`. If you call it before the JS bundle hydrates, the splash disappears and the user sees a blank WebView for a few hundred ms before the UI renders [C-S29].
4. **Wrong safe-area on iPhone notch** -- the meta tag is `viewport-fit=cover`. Without it, `env(safe-area-inset-*)` resolves to `0` and content sits behind the notch. The default meta viewport is wrong on a Capacitor app -- this is the bundler's responsibility, not Capacitor's [C-S40].
5. **Haptics on old Androids** -- `Haptics.impact({ style: ImpactStyle.Light })` is a no-op on devices without a vibrator (cheap Android tablets, emulators). Wrap the call in a `try / catch` and degrade silently; do not surface a haptic-failure toast to the user [C-S28].
6. **Dark-mode flash on app boot** -- the WebView renders the page background before any JS runs. Set the `<meta name="color-scheme" content="light dark">` AND the `background-color` CSS on `html` to the dark theme; otherwise the user sees a white flash for ~100 ms before the theme controller applies [C-S40].
7. **`server.cleartext: true` leaking to production** -- this is the #1 cause of App Store rejection for ATS-non-compliance. Gate `cleartext` on `process.env.NODE_ENV === 'development'` in `capacitor.config.ts`; the production build must omit `cleartext` (default `false`) [C-S19][C-S38].

## Verification matrix per axis

A condensed summary the engineer can paste into a PR description. One row per axis / area, marked done when the verification step is observed on a real device (iPhone 12+, Pixel 5+ or equivalent).

| Axis / area | Verification step | Device class |
|---|---|---|
| 1 -- Safe-area | The header, the tab bar, and any full-bleed media sit inside the notch / Dynamic Island / home indicator on iPhone 14 Pro and Pixel 7 | Real device |
| 2 -- Status bar | The status bar icon contrast matches the app theme on iOS and Android; no white flash on launch; the background color matches the body background | Real device + launch cold-start |
| 3 -- Splash | The splash hides within ~200 ms of first meaningful paint; a dark variant exists if the app supports dark mode | Real device + cold start |
| 4 -- Haptics | Tap on a primary button fires `ImpactStyle.Light`; confirm fires `ImpactStyle.Medium`; destructive fires `ImpactStyle.Heavy`; success fires `NotificationType.Success`; no haptic on background renders | Real device with vibrator |
| 5 -- Back button | The Android hardware back pops in-app history; the last back press exits the app; the iOS swipe-back works in the same direction | Android device + iPhone with gesture |
| 6 -- Dark mode | Toggling the OS appearance re-renders the theme AND re-applies `StatusBar.setStyle`; the user-visible flash on app launch is < 100 ms | Real device, OS appearance toggle |
| 7 -- Keyboard accessory | Short forms hide the accessory bar; the focused input is scrolled into view | iPhone + Android |
| 8 -- Orientation | Locked screens release the lock on exit; landscape-only screens are usable on iPad split-view | iPad |
| 9 -- Typography | The system font renders on iOS (San Francisco) and Android (Roboto); custom fonts use `font-display: swap` | Real device |
| 10 -- Touch action | No 300 ms tap delay on iOS Safari-era WebViews; scroll containers scroll smoothly | Real device |
| 11 -- Tap highlight | No default blue highlight on tap; `:focus-visible` outline visible for keyboard navigation | Real device + keyboard |
| 12 -- Scroll inertia | Scroll on a long list rubber-bands correctly; no `overflow: hidden` on `<body>` | Real device |
| 13 -- Lazy loading + autoplay | Off-screen images do not block first paint; background videos autoplay on iOS (muted + playsinline) | Real device + Network panel |
| 14 -- Performance | Animations stay at 60 fps on a Pixel 5; lists > 100 rows use `TanStack Virtual`; `will-change` is transient | Real device + DevTools Performance |
| 15 -- Memory | Blob URLs are revoked in cleanup; LRU image cache is bounded; listener handles are removed | Code review + memory profile on a low-RAM device |

Every row on this matrix should be checked off before a release. The matrix is also the rubric an LLM code agent can run against its own diff.

## Cross-file pointers

- `02-install-and-setup.md` -- `@capacitor/assets`, `@capacitor/status-bar`, `@capacitor/splash-screen`, `@capacitor/haptics`, `@capacitor/keyboard`, `@capacitor/screen-orientation`, and `@capacitor/app` install commands and version constraints.
- `07-best-companion-libraries.md` -- UI library choices that affect native-feel: Ionic Framework shortcuts a lot of native-feel patterns (modals, sheets, segments, virtual scroll); Konsta UI + Tailwind is a lighter shell; the no-Ionic Tailwind path requires the engineer to wire all six-axis rows by hand.
- `09-do-and-dont.md` -- anti-patterns keyed to the rows in this checklist; rows 4-13 map to the rows here.
- `10-known-issues-and-solutions.md` -- the Android 16 status-bar `overlaysWebView` / `backgroundColor` no-op; the `density` configChanges addition in v8; the UIScene migration in v8.5 that affects `backButton` handler registration.

## Per-axis debugging cheatsheet

When a row in the verification matrix fails on a real device, the diagnosis is usually one of the items below. Walk the table in order; the fix is usually at the top of the column.

| Symptom | First guess | Second guess | Verify on |
|---|---|---|---|
| Content sits behind the notch | `<meta name="viewport">` is missing `viewport-fit=cover` | The padding is on the wrong element (e.g. the body, not the app container) | iPhone 14 Pro + Safari Responsive |
| White status bar in dark mode | `StatusBar.setStyle` not called after theme switch | `StatusBar.setBackgroundColor` not called for the dark hex | Real device, OS appearance toggle |
| Splash lingers for 3+ seconds | `SplashScreen.hide()` is not called anywhere | `launchShowDuration` is the default 3000 ms and there is no `hide()` call | Real device, cold start, watch the launch |
| Tap does nothing on a primary button | `Haptics.impact` is called on a no-vibrator device | The click handler is bound to `onClick` but the user is on touch-only | Real device with a vibrator (most modern phones) |
| Back button exits the app immediately | `addListener('backButton')` is not registered | The router uses an in-memory stack and `history.back()` finds nothing | Android device, hardware back |
| Dark mode does not switch | `matchMedia('change')` listener is not subscribed | `StatusBar.setStyle` is not re-driven on the change event | Real device, OS appearance toggle, in-app |
| Keyboard covers the input | `Keyboard.resize` is `Body` (default) and the layout uses `100vh` | `Keyboard.resize` is `Ionic` but the project is not Ionic | iPhone, focus an input at the bottom of the screen |
| Screen does not rotate | `ScreenOrientation.lock` was called and `unlock` was forgotten | The `capacitor.config.ts` lock is global and the screen wants to differ from the lock | iPad, hardware rotation |
| Custom font does not show on first paint | The font is fetched from a CDN at runtime (FOIT) | `font-display` is `block` not `swap` | Real device, cold start, network panel |
| Tap has a 300 ms delay | `touch-action: manipulation` is missing | An old `fastclick` shim is still loaded | iPhone, any tap target |
| Blue flash on tap | `-webkit-tap-highlight-color` is the default | The CSS does not cascade to the button class | Real device, any interactive element |
| Scroll has no rubber-band | `<body>` has `overflow: hidden` | A parent has `position: fixed` and `overflow: hidden` | iPhone, top-of-list overscroll |
| Background video does not autoplay | `<video>` is missing `muted` or `playsinline` | iOS Safari blocks the autoplay regardless; check the WebView build version | Real iOS device, in-app |
| Animation drops to 30 fps | `top / left` is animated instead of `transform` | `will-change` is permanent and the GPU layer is full | Real device, Performance panel |
| App OOMs after a long session | Blob URLs are never revoked | An unbounded `Map<url, ImageBitmap>` is growing | Memory profile on a low-RAM device |

## Freshness

<!-- freshness: capacitor=8.5.0 access=2026-08-18 -->

- last_verified: 2026-08-18
- source_schema_versions: @capacitor/core@8.5.0, @capacitor/cli@~8.0.0, @capacitor/app@^8.0.0, @capacitor/status-bar@~8.0.0, @capacitor/splash-screen@~8.0.0, @capacitor/haptics@~8.0.0, @capacitor/keyboard@~8.0.0, @capacitor/screen-orientation@~8.0.0
- anchor_url: https://capacitorjs.com/docs
- v9_watch_only_issue: https://github.com/ionic-team/capacitor/issues/8560

## References

- [C-S15] -- https://ionicframework.com/docs/intro -- accessed 2026-08-18 (Ionic Framework intro docs; Open-Source UI Toolkit; Ionic Team / OutSystems)
- [C-S17] -- https://capacitorjs.com/docs/ios -- accessed 2026-08-18 (Capacitor iOS support page: iOS 15+, Xcode 26+, WKWebView; touch-action + viewport-fit guidance)
- [C-S19] -- https://raw.githubusercontent.com/ionic-team/capacitor/main/cli/src/declarations.ts -- accessed 2026-08-18 (canonical Capacitor configuration schema; `server.cleartext` default `false`; `android.adjustMarginsForEdgeToEdge` removed in v8 in favor of `@capacitor/system-bars`)
- [C-S24] -- https://www.npmjs.com/package/@capacitor/assets -- accessed 2026-08-18 (icon + splash generator 3.0.5; custom mode requires four files: icon-only, icon-foreground, icon-background, splash, splash-dark; default mode flattens to one PNG; `--ios`, `--android`, `--pwa` flags)
- [C-S25] -- https://www.npmjs.com/package/@capacitor/status-bar -- accessed 2026-08-18 (`Style` enum: `DARK` (light text for dark backgrounds), `LIGHT` (dark text for light backgrounds), `DEFAULT` (follows device appearance); `setStyle`, `setBackgroundColor`, `setOverlaysWebView`, `hide`, `show`, `getInfo`)
- [C-S26] -- https://www.npmjs.com/package/@capacitor/keyboard -- accessed 2026-08-18 (`Keyboard.resize` enum: `Body` (resize only `<body>`), `Ionic` (resize only `ion-app`, requires Ionic Framework), `Native` (resize entire WebView, affects `vh`), `None` (do not resize); `setAccessoryBarVisible`, `setScroll`)
- [C-S27] -- https://www.npmjs.com/package/@capacitor/screen-orientation -- accessed 2026-08-18 (`orientation` lock type accepts 8 values: `'any' | 'natural' | 'landscape' | 'portrait' | 'portrait-primary' | 'portrait-secondary' | 'landscape-primary' | 'landscape-secondary'`; `unlock()` since v4.0.0)
- [C-S28] -- https://www.npmjs.com/package/@capacitor/haptics -- accessed 2026-08-18 (Haptics API: `impact(style)` (`Heavy | Medium | Light | Rigid | Soft`), `notification(type)` (`Success | Warning | Error`), `vibrate(duration)`, `selectionStart()`, `selectionChanged()`, `selectionEnd()`)
- [C-S29] -- https://www.npmjs.com/package/@capacitor/splash-screen -- accessed 2026-08-18 (`SplashScreen.show({ autoHide, showDuration })`, `hide()`; config: `launchShowDuration` (default 3000 ms), `launchAutoHide` (default true), `launchFadeOutDuration`, `backgroundColor`, `splashFullScreen`, `splashImmersive`, `androidSplashResourceName`, `androidScaleType`, `showSpinner`, `spinnerColor`, `layoutName`, `useDialog`)
- [C-S34] -- https://www.npmjs.com/package/@capacitor/app -- accessed 2026-08-18 (App API: lifecycle events `appStateChange`, `pause`, `resume`, `appUrlOpen`, `appRestoredResult`, `backButton`; `exitApp()`, `getInfo()`, `getState()`, `getLaunchUrl()`, `minimizeApp()`, `getAppLanguage()` since 8.1.0, `toggleBackButtonHandler({enabled})` since 7.1.0)
- [C-S38] -- https://capacitorjs.com/docs/cli/commands/run -- accessed 2026-08-18 (CI/CD guidance: Codemagic / Bitrise / Appcircle / GitHub Actions + fastlane; `cap run --live-reload` injects `server` config; `server.cleartext` must be `true` for `http://` URLs and is the most common App Store rejection if leaked to production)
- [C-S40] -- https://capacitorjs.com/docs/web -- accessed 2026-08-18 (Capacitor web platform docs: ES2017 baseline; viewport-fit + safe-area; `touch-action: manipulation`; `-webkit-tap-highlight-color`; `loading="lazy"`; `playsinline` for `<video>` autoplay; the WebView does NOT inject `viewport-fit=cover` for you)
- [C-S50] -- https://tanstack.com/virtual/latest -- accessed 2026-08-18 (TanStack Virtual docs: headless virtualizer for large element lists; framework-agnostic React / Solid / Vue / Svelte; 10-15 kb; use for any list > 100 items; stable `key` prop required)
- [C-S51] -- https://www.npmjs.com/package/@use-gesture/vanilla -- accessed 2026-08-18 (the underlying library that `@use-gesture/react` wraps; framework-agnostic swipe / drag / pinch; pair with `history.back()` for iOS-feel swipe-back)
- [C-S52] -- https://capacitorjs.com/docs/v8/web -- accessed 2026-08-18 (Capacitor v8 web platform page; `<video autoplay muted playsinline>` is required for background loops on iOS; `IntersectionObserver` for visibility-driven animations)
- [A-S16] -- https://capacitorjs.com/docs/apis/app -- accessed 2026-08-18 (`@capacitor/app` lifecycle events list; CFBundleURLTypes + AndroidManifest intent-filter; `disableBackButtonHandler` config since 7.1.0; `getAppLanguage` since 8.1.0)