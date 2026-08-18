# Research - T-2026-08-18-002 (angle C: ecosystem, native-like delivery, do/don't, LLM prompt + self-question set)

**Date:** 2026-08-18
**Trigger:** initial (parallel angle)
**Sub-agent:** research
**Research-detector tier:** 3 (sum=3.6; carried from `tasks/T-2026-08-18-002.md`)
**Coverage target:** the Capacitor ecosystem (UI kits, plugin landscape, native-bridge anti-patterns), the native-like delivery checklist (the load-bearing 14-area check), build/test/ship, CI/CD matrix, and the three LLM-facing artifacts (system prompt, self-question set, do/don't matrix).

**Reuses:** none directly -- prior task T-2026-08-18-001 (OpenCode SDK dossier) is a sibling shape, not a content overlap. `agents_manager/memory/projects/research-space/playbook.md` patterns (3-reading-path dossier, per-rule verdict table, citation table with type tags) are carried into this file. The verified evidence-handling template is `share/notes/01_research_T-2026-08-18-001.md`.

**Encoding note (CRITICAL, project lint):** this file contains zero em-dashes / en-dashes / smart quotes per the `agents_manager/memory/global/windows-encoding-validation-trap.md` rule. All dashes are ASCII `--`. Verified by reading the file in UTF-8 and scanning for `E2 80 94` bytes before return.

---

## Task in one sentence

Produce the agent/LLM-facing slice of the Capacitor dossier that covers (a) the UI/design + plugin ecosystem and the "official-vs-community" decision rules, (b) the high-value native-like delivery checklist (safe-area + status bar + splash + haptics + keyboard + orientation + transitions + dark mode + tap/delay + scroll/perf), (c) build/test/ship + CI/CD, and (d) the three required LLM artifacts: a system prompt for a Capacitor code agent, a 12-25 question self-question set grouped by phase, and a ~20-row do/don't matrix.

---

## What we know for sure

- **Capacitor is at v8.5.0** (released `2026-07-31` per the `ionic-team/capacitor` releases page); v9 is in pre-release (`9.0.0-alpha.6` tag visible on the same releases page) [S1][S2][S12].
- **All published packages verify on `npmjs.com` as 8.x or 8.5.0 published within the last 30 days** (`@capacitor/core` 8.5.0, `@capacitor/cli` 8.5.0, `@capacitor/android` 8.5.0, `@capacitor/ios` 8.5.0, `@capacitor/haptics` 8.0.2, `@capacitor/assets` 3.0.5, `@capacitor/keyboard` 8.x, `@capacitor/status-bar` 8.x, `@capacitor/screen-orientation` 8.x, `@capacitor/preferences` 8.x, `@capacitor/filesystem` 8.x, `@capacitor/push-notifications` 8.x, `@capacitor/browser` 8.x) [S3]-[S13]. The 30-day freshness is the strongest possible "package is alive" signal at the access date.
- **Capacitor is an Ionic Team / OutSystems project**: the docs page carries an `An OutSystems Company` banner and the package README on GitHub is `ionic-team/capacitor`. OutSystems acquired Ionic in 2023 (per the official pages); Capacitor, Ionic Framework, and Stencil are listed together as "Open Source" products on the docs [S14][S15][S16].
- **Capacitor does NOT require Ionic Framework** -- the official Capacitor FAQ states: "No, you do not need to use Ionic Framework with Capacitor. Without the Ionic Framework, you may need to implement Native UI yourself." [S14].
- **Platform floors at the access date**: iOS `15+` required, Xcode `26.0+` required, WKWebView (UIWebView is deprecated) [S17]; Android `API 24+` (Android 7 Nougat or later) covering ~99% of in-market devices, with Chrome WebView `60+` minimum (declared in `declarations.ts` as the `minWebViewVersion` floor, default `60`) [S18][S19].
- **35 official Capacitor plugins** are listed on the `/docs/apis` page; the same list is published on `/docs/v8/apis` and includes: Action Sheet, App Launcher, App, Background Runner, Barcode Scanner, Browser, Calendar, Camera, Clipboard, Contacts, Cookies, Device, Dialog, Filesystem, File Transfer, File Viewer, Geolocation, Google Maps, Haptics, Http, InAppBrowser, Keyboard, Local LLM (experimental), Local Notifications, Motion, Network, Preferences, Privacy Screen, Push Notifications, Screen Orientation, Screen Reader, Share, Splash Screen, Status Bar, and System Bars [S20].
- **"Local LLM" is the explicit experimental plugin** in v8, a Capacitor Labs offering (the `capacitor-plugins/README.md` notes "These are experimental plugins. Use at your own risk.") [S21].
- **The Capacitor Community org on GitHub** (`capacitor-community/`) hosts community plugins; new plugin proposals go through `capacitor-community/proposals/` rather than being merged into the official org without review [S22].
- **The curated community-plugin list lives at `riderx/awesome-capacitor`**, not under `ionic-team/` or `capacitor-community/`; it is maintained by Capgo and shows `635` stars, last updated `2026-07-29` (within the last 30 days), HTML format [S23].
- **`@capacitor/assets` (3.0.5) is the canonical icon + splash generator**: takes a single `1024x1024` PNG for icon and a `2732x2732` PNG for splash (custom mode), or icon-only + icon-foreground + icon-background + splash + splash-dark if separate foreground/background are wanted; supports `--ios`, `--android`, `--pwa` flags [S24].
- **`StatusBar.Style` enum**: `DARK` = light text for dark backgrounds; `LIGHT` = dark text for light backgrounds; `DEFAULT` = follows device appearance [S25].
- **`Keyboard.resize` enum** (five named values): `Body` (resize only `<body>`, viewport unchanged), `Ionic` (resize only `ion-app`, only with Ionic Framework), `Native` (resize the entire WebView, affects `vh`), `None` (do not resize) [S26].
- **`ScreenOrientation.lock` accepts 8 orientation keys**: `'any' | 'natural' | 'landscape' | 'portrait' | 'portrait-primary' | 'portrait-secondary' | 'landscape-primary' | 'landscape-secondary'`; `unlock()` exists since v4.0.0 [S27].
- **`Haptics` exposes seven methods**: `impact(style)`, `notification(type)`, `vibrate(duration)`, `selectionStart()`, `selectionChanged()`, `selectionEnd()`, and the enum result `HapticsImpactStyle` + `HapticsNotificationType` [S28].
- **`SplashScreen.show({ autoHide, showDuration })` and `SplashScreen.hide()`** are the run-time API; configuration (in `capacitor.config.ts`) accepts `launchShowDuration` (default `3000` ms), `launchAutoHide` (default `true`), `launchFadeOutDuration`, `backgroundColor`, `androidSplashResourceName`, `androidScaleType`, `showSpinner`, `androidSpinnerStyle`, `iosSpinnerStyle`, `spinnerColor`, `splashFullScreen`, `splashImmersive`, `layoutName`, `useDialog` [S29].
- **`@capacitor/preferences` is the official key-value store** (`UserDefaults` on iOS, `SharedPreferences` on Android, `localStorage` fallback on web); method set `configure / get / set / remove / clear / keys / migrate / removeOld` and a `MigrateResult` exists to migrate from the legacy `@capacitor/storage` plugin (Capacitor 2 era) [S30].
- **`@capacitor/filesystem` accepts the named directories** `Documents`, `Data`, `Library`, `Cache`, `External`, `ExternalStorage`; methods include `readFile / writeFile / appendFile / deleteFile / mkdir / rmdir / readdir / getUri / stat / copy / rename / downloadFile` [S31].
- **`@capacitor/push-notifications` unregister method**: "This will delete a firebase token on Android, and unregister APNS on iOS. **Since:** 5.0.0" [S32]. The token shape carries `{value: string}` where `value` is the APNs token on iOS and the FCM token on Android.
- **`@capacitor/browser` opens `SFSafariViewController` on iOS** (not the deprecated UIWebView) and a Chrome Custom Tab on Android; options include `presentationStyle: 'fullscreen' | 'popover'`, iPad width/height in popover mode (since 4.0.0) [S33].
- **`@capacitor/app` exposes the full app-lifecycle listeners**: `appStateChange`, `pause`, `resume`, `appUrlOpen` (deep links), `appRestoredResult`, and `backButton` (since the `backButton` event was added) plus `exitApp()`, `getInfo()`, `getState()`, `getLaunchUrl()`, `minimizeApp()`, `getAppLanguage()`, `toggleBackButtonHandler({enabled: boolean})` since 7.1.0 [S34].
- **Capacitor configuration schema** is fully typed in `cli/src/declarations.ts`; the server block has `url`, `hostname` (default `localhost`), `androidScheme` (default `https`), `iosScheme` (default `capacitor`), `cleartext` (default `false`), `allowNavigation`, `errorPath` (a fallback HTML to redirect when WebView below min version), `loggingBehavior` (`'none' | 'production' | 'debug' | 'production-with-rl'`, default `debug` in dev / `production` in prod), and `backgroundColor`; root options `appId`, `appName`, `webDir`, `minWebViewVersion` (default `60`), `backgroundColor`, `bundledWebRuntime`, `includePluginsInCore`, `android.allowMixedContent`, `ios.contentInset`, `ios.backgroundColor`, `android.backgroundColor`, `android.adjustMarginsForEdgeToEdge`, `android.disableInputAccessoryView` [S19].
- **`CapacitorCookies.enabled`** is a top-level plugins option (since 4.3.0) which, when enabled, overrides the global `document.cookie` on native so cookies behave like a real native client [S35].
- **CodePush for OTA updates is RN-only.** CodePush was created by Microsoft for React Native; App Center (the host) was sunset on 2025-09-30 and the managed CodePush service was discontinued. Capacitor has no first-party OTA story for the JS bundle; the closest the ecosystem offers is `Capgo` (`@capgo/capacitor-updater`), a community/commercial hybrid with a SaaS dashboard and self-hosted option, plus vite-plugin-pwa for the marketing surface [S36][S37].
- **Codemagic is the most explicitly Capacitor-friendly CI vendor**; Bitrise and Appcircle are credible alternatives; GitHub Actions remains the most universal via the capacitor-team .github reusable workflows (the capacitor-team `capacitor-plugin-converter` and `capacitor-app-deployed` repos carry the matrix); fastlane is the de-facto iOS layer underneath any of them [S38].
- **`cap sync` == `cap copy` + native dependency install**; `cap copy` is just the web-bundle copy, `cap sync` adds the native dep install/update step on top [S39].
- **iOS viewport-fit `cover`** is set via a `<meta name="viewport" content="viewport-fit=cover, ...">` tag in `index.html` and consumed by the iOS WKWebView; safe-area CSS uses `env(safe-area-inset-top / right / bottom / left)`. Capacitor does not inject this meta tag for you -- it is your responsibility in the web bundle [S17][S40].
- **`@capacitor/keyboard` configuration** accepts `resize` (the enum above), `style` (`DARK | LIGHT | DEFAULT`), `resizeOnFullScreen` (default `true`), and `autoBackdropColor` (auto | a hex color) [S26].
- **`@capacitor/browser` Android binding uses `androidx.browser:browser`** version pinned through `variables.gradle` (`androidxBrowserVersion`, default `1.9.0`); `--webViewDebuggingEnabled` (default `true` in dev) drives `WebView.setWebContentsDebuggingEnabled(...)` [S33][S41].
- **`@capacitor/splash-screen` Android binding uses `androidx.core:core-splashscreen`** version pinned via `coreSplashScreenVersion` (default `1.2.0`) [S29].
- **`@capacitor/cli` exposes 11 commands**: `add`, `build`, `copy`, `doctor`, `init`, `ls`, `migrate`, `open`, `run`, `sync`, `update` [S42].
- **The Capacitor-Ionic relationship is "sister projects, not coupled"**: same maintainer team (ionic-team) but independent product lines; Ionic Framework is a UI toolkit delivered as `@ionic/react`, `@ionic/vue`, `@ionic/angular`; Capacitor is a native runtime that does not require it [S14][S15].

## What we don't know (ambiguities)

- **No definitive public roadmap for Capgo vs a Capacitor-blessed OTA story as of access date.** The community has Capgo (paid SaaS + free self-hosted), the user must verify whether their jurisdiction/use-case falls under the self-hosted license. If a free pure-OSS OTA story exists in 2026, this dossier does not surface it.
  - **Suggested clarifying question:** "For the dossier's native-like delivery section, is an OTA/JS-bundle live-update channel (e.g. Capgo) in scope, or do we treat the JS bundle as shipped-then-unchanged and accept store review for every update?"
- **`@capacitor/local-llm` is labeled experimental.** The plugin is on the official list but is in the Capacitor Labs org, marked "Use at your own risk."
  - **Suggested clarifying question:** "Should the LLM prompt include the Local LLM plugin as a recommended path for on-device inference in v1, or only as a 'do not pin, watch GA' note?"
- **The exact iOS deployment target default for new `npx cap add ios` projects was not surfaced cleanly in the v8 docs pages.** The `package.json` for `@capacitor/ios` did not declare an `IPHONEOS_DEPLOYMENT_TARGET` at the access date; the Platform Setup docs reference Xcode 26.0+ as the build requirement, but the default `IPHONEOS_DEPLOYMENT_TARGET` for newly generated projects is not pinned to a specific value in the fetched source.
  - **Suggested clarifying question:** "Should the dossier recommend an explicit `IPHONEOS_DEPLOYMENT_TARGET` (e.g. `15.0`) for new projects, or leave it to the Xcode default?"
- **Codemagic's 2026 pricing tier for a 1-engineer solo Capacitor builder was not pulled in this dispatch.** The Codemagic public docs do not surface the per-minute macOS-host pricing without sign-in; the LLM-facing artifact in §10 does not depend on the exact figure.
  - **Suggested clarifying question:** "For the CI/CD matrix section, should the dossier cite a specific per-build USD figure (requires login), or stay generic at 'Codemagic fits 1-engineer at low/no cost on Hobby plan, scales to metered MAC-host for parallel iOS builds'?"
- **Whether the user wants the system prompt to anchor on v8 (current GA) or v9 (alpha).** v8.5.0 is the released version; v9 is at `9.0.0-alpha.6`.
  - **Suggested clarifying question:** "The recommended system prompt below assumes v8 (current GA, `ionic-team` package versions 8.5.0). If you want v9-first, the agent should pin `^9.0.0-alpha` and accept breaking-change risk; confirm."

## Risks and doubts

- **A 14-area native-feel checklist is the load-bearing content of this angle, and getting even one of them wrong degrades the perceived quality of the shipped app materially (a white-bar status bar is the universal "this is a webview in a wrapper" tell).** Concretely: missed safe-area causes content under the notch; missed `viewport-fit=cover` means the env() values are all zero; missed StatusBar `setStyle` after a dark/light theme change leaves the wrong icon contrast; missed `setBackgroundColor` causes a white flash on launch on Android; missed `SplashScreen.hide()` after first render leaves the splash visible while the SPA hydrates.
  - **Severity:** high
  - **Mitigation:** The checklist is the centerpiece of §4 below, every row cites one or more of [S17][S19][S20][S25]-[S29]; the LLM agent's self-question set in §9 forces an explicit answer per area.
- **Community plugins from `awesome-capacitor` come with three classes of risk that an LLM agent will not detect from a README alone: (a) abandonment (last commit > 12 months, no `npm view last published`), (b) license mismatch (most are MIT, a few are AGPL or BSL), (c) request permission overreach (a "simple flashlight" plugin asking for `READ_CONTACTS` is a red flag).** A default AI behaviour of "install the first hit" will surface these only at rejection time, sometimes in App Store review.
  - **Severity:** medium
  - **Mitigation:** §3 (native bridge) gives a 4-row anti-pattern matrix for community plugins (abandoned, AGPL, perm overreach, fork-of-official). The LLM question set in §9 forces a per-plugin "check last publish date + license + requested manifest permissions" pass.
- **`server.cleartext: true` is required for HTTP localhost dev servers during live reload but is also the single most common cause of Apple App Store rejection if it leaks to a release build.** An LLM agent that hard-codes `cleartext: true` in `capacitor.config.ts` "to make live reload work" will block the eventual store submission.
  - **Severity:** high
  - **Mitigation:** The example in §6 (`capacitor.config.ts`) sets `cleartext: true` ONLY inside `server: { cleartext: true, url: 'http://10.0.2.2:5173' }` and the build helper scripts in §11 gate `cap run --livereload --target=...` on the `NODE_ENV` so production `cap sync` is safe. The self-question set asks "is any production env-var pointing at an HTTP URL?"
- **The Ionic Team's own Ionic Framework pairing is opt-in, but the Capacitor docs default path on `capacitorjs.com/docs/getting-started/with-ionic` is the *with-Ionic* variant of the project layout.** An LLM agent that learns Capacitor from these docs will reach for Ionic as the UI layer, even when a no-Ionic stack (e.g. pure React + Tailwind, or pure Vue + Pinia) is the right call for the project. This is the "Ionic by default" mistake.
  - **Severity:** medium
  - **Mitigation:** The UI-Kit Do/Don't table in §2 foregrounds this; the LLM prompt explicitly says "Capacitor does NOT require Ionic; treat Ionic as one of several UI stacks."
- **`@capacitor/keyboard`'s `KeyboardResize.Ionic` mode only works with `ion-app`** in the DOM. If the project is not Ionic and the agent sets `resize: 'ionic'`, the keyboard will simply not resize -- the input will be covered by the keyboard and the user will tap-blind.
  - **Severity:** low
  - **Mitigation:** The example in §6 sets `Keyboard.resize: KeyboardResize.Native` for non-Ionic stacks; the LLM checklist in §9 forces an explicit per-area decision.
- **The `@capacitor/assets` default mode generates a flat icon (no transparency / no adaptive-icon foreground+background) and a static splash that looks dated on Android 12+.** Adaptive icons (`assets/icon-foreground.png` + `assets/icon-background.png`) are required for Android 12+ device parity. Generating them once is more work than just dropping a `1024x1024` PNG.
  - **Severity:** low
  - **Mitigation:** The §4 splash/icon row covers both modes; the asset call in §11 uses custom mode and lists the four required files.
- **Capacitor has no first-party OTA (JS-bundle hot-update) channel; the surrounding ecosystem (Capgo, capacitor-updater) is either commercial or self-hosted-with-license.** An LLM agent that suggests "use CodePush to push a JS update" is wrong -- CodePush is RN-only and the App Center service was sunset 2025-09-30.
  - **Severity:** medium
  - **Mitigation:** The build/test/ship section in §5 says "no Capacitor JS-bundle OTA story; `@capgo/capacitor-updater` is the credible option but is commercial plus self-host option; marketing-page live updates belong on vite-plugin-pwa + capacitor push notifications for banner, not on the app shell."
- **WebView `chrome://inspect` works on Android (remote debugging the WebView is possible with `webViewDebuggingEnabled: true`), but iOS WKWebView remote debugging from a non-mac host is awkward -- Safari Web Inspector requires macOS Safari.** This is a foot-gun for solo Linux/Windows devs trying to debug iOS behavior.
  - **Severity:** low
  - **Mitigation:** Debugging matrix in §5 names the host/macOS/mac-host requirement explicitly.
- **`@capacitor/haptics.notification` and `.vibrate` have platform fallbacks that differ**: iOS UIImpactFeedbackGenerator supports `HEAVY / MEDIUM / LIGHT / RIGID / SOFT` plus notification `SUCCESS / WARNING / ERROR`; Android Vibrator supports `durationMs`. iOS `vibrate({duration: 1000})` is a no-op because iOS does not expose a single-duration vibrator API; use impact+light or notification+error for that pattern.
  - **Severity:** low
  - **Mitigation:** §7 (haptics row) names the iOS-call-on-Android-pattern foot-gun.
- **The `keyboard.resize` default is `Body`** -- safe in pure HTML but breaks CSS layouts that depend on `100vh` (the viewport metric does not change, only the body element). `Native` mode is required if the project uses Tailwind `h-screen` or any layout that depends on vh (which is the common pattern).
  - **Severity:** medium
  - **Mitigation:** §4 keyboard row and §6 example both specify `Native`; the self-question set asks for an explicit decision.
- **`<system-reminder>` removed from prior task's env-capture** -- this is a hosting-environment quirk, not a Capacitor risk. Do not silently drop; recorded here so the verifier can spot if a future hook chains an inspection off the wrong path.

## Technical findings

### 1. Ecosystem overview (verified 2026-08-18)

| Layer | Name | Type | Version/access | License | Maintenance signal | Verdict for Capacitor |
|---|---|---|---|---|---|---|
| Native runtime | `@capacitor/core` | npm | 8.5.0 / npm published 2026-07-31 [S3] | MIT | Active (weekly downloads multi-M, dependents ~700+) [S2][S3] | Default (no alternative) |
| Native runtime | `@capacitor/cli` | npm | 8.5.0 / 215 dependents [S4] | MIT | Active | Default |
| Native runtime | `@capacitor/android` | npm | 8.5.0 / 18 days ago [S5] | MIT | Active | Default for Android |
| Native runtime | `@capacitor/ios` | npm | 8.5.0 / 18 days ago [S6] | MIT | Active | Default for iOS |
| v9 (alpha) | `ionic-team/capacitor` v9.0.0-alpha.6 | npm/GitHub | Pre-release, on main branch [S1][S2] | MIT | Active | Watch-only; do not pin |
| Plugins (official, 35 total) | `@capacitor/*` (status-bar, haptics, splash-screen, keyboard, screen-orientation, preferences, filesystem, push-notifications, browser, app, network, device, share, dialog, camera, geolocation, motion, cookies, app-launcher, action-sheet, share, screen-reader, privacy-screen, system-bars, local-notifications, http, file-transfer, file-viewer, google-maps, inappbrowser, calendar, clipboard, contacts, barcode-scanner, background-runner) [S20] | npm | 8.x or last published < 30 days [S3]-[S13] | MIT | Active | Pick from this list first |
| Plugins (experimental) | `@capacitor/local-llm` (Capacitor Labs) [S21] | npm | Marked experimental | MIT | Labs tier | Watch, do not pin |
| UI toolkit (recommended companion) | `@ionic/react`, `@ionic/vue`, `@ionic/angular` [S15] | npm | Active [S15] | MIT | Active (sister project, same Ionic Team) | Optional -- not required |
| UI toolkit (no-Ionic) | Konsta UI | MIT npm | 4.4k+ stars, active [S43] | MIT | Active | Optional Tailwind iOS+Material kit; lighter than Ionic |
| UI toolkit (no-Ionic) | NativeCSS, plain Tailwind v4, plain UnoCSS | n/a | Tailwind v4.3 current [S44]; UnoCSS active [S45] | MIT | Active | Use Tailwind v4 by default; UnoCSS only when Tailwind semantics conflict with build |
| Router | TanStack Router, React Router (history mode), Vue Router (history mode) | npm | Active | MIT | Active | Set the SPA to serve `index.html` for every deep link -- configure `server.allowNavigation` accordingly |
| State | Zustand, Redux Toolkit, Pinia (Vue, official), Svelte stores | npm | All active | MIT | Active | Default to the framework's own state primitive; add Zustand for cross-framework shared stores |
| Forms | TanStack Form, FormKit (Vue), VeeValidate (Vue) | npm | Active | MIT | Active | Pick the per-framework default |
| Indexed storage | Dexie.js | npm | Active, 5.x current [S46] | Apache-2.0 (per repo) / MIT-friendly | Active | Default for > 5 MB client-side storage |
| Local-first DB | RxDB 17.x | npm | Active, 22.9k stars, MIT-style [S47] | Apache-2.0 / commercial-paths | Active | Only when sync/replication needed |
| Icons | Ionicons | npm | v7 [S15] | MIT | Active | Default (sister project; works in Capacitor and in web) |
| Icons | Lucide | npm | Active, 5.x current [S48] | ISC | Active | Default for non-Ionic projects |
| Icons | Phosphor | npm | Active [S49] | MIT | Active | Default for design systems that want 6 styles |
| Virtualization | TanStack Virtual | npm | Active, 10-15 kb, framework-agnostic React/Solid/Vue/Svelte [S50] | MIT | Active | Default for any list > 100 items |
| Gestures | `@use-gesture/vanilla` | npm | Active [S51] | MIT | Active | Default for swipe-back / drag / pinch in any non-Ionic project |
| UI toolkit (config layer) | Tailwind v4.3 | npm | Active [S44] | MIT | Active | Default for styling |
| CI/CD | Codemagic, Bitrise, Appcircle, GitHub Actions + fastlane | SaaS | Codemagic most Capacitor-friendly [S38] | n/a | Active | Codemagic first choice for solo, GitHub Actions for team |
| OTA JS-bundle | `@capgo/capacitor-updater` | npm | Active | Commercial + self-hosted | Active | Optional; explicit consent for commercial SaaS |

### 2. UI / design system choices (UI kit + icon lib + gesture lib + font)

- **Ionic Framework (`@ionic/react`, `@ionic/vue`, `@ionic/angular`).** Official Ionic Team / OutSystems project that the Capacitor maintainers also ship and recommend on the same docs site. NOT mandatory -- the Capacitor GitHub FAQ is explicit that you do not need it [S14][S15]. If the project is greenfield and the team knows React or Vue, Ionic shortcuts a lot of native-feel patterns (modals, sheets, segments, virtual scroll) and is the path-of-least-surprise. Verdict: USE when (a) the team is comfortable with the framework Ionic pairs with, (b) the app is multi-platform from day one, (c) you have accepted the visual signature (rounded, iOS-default Material-default tokens). DON'T pick it if (a) you need a totally custom design system, (b) you have a hard bundle-size budget that excludes Ionic's CSS reset, (c) you want zero coupling to a company that may rebrand (already happened: Ionic was acquired by OutSystems in 2023).
- **Konsta UI.** Pixel-perfect mobile UI components in Tailwind v3/v4 with iOS + Material design flavors. Lighter than Ionic; same author-team brand-agnostic. Verdict: USE for a Tailwind-first project that wants a mobile UI kit but no Angular/Vue/React framework lock-in; ships React/Vue/Svelte flavors. Last verified 4-5k stars on GitHub and active [S43].
- **Vanilla Tailwind v4 / UnoCSS / NativeCSS.** Tailwind v4 is the 2026 mainstream (CSS-first config, `@theme` blocks) [S44]; UnoCSS is a powerful on-demand atomic engine with `preset-icons` (Pure CSS Icons via a single class) and is sometimes a better fit for Capacitor because the on-demand engine produces the smallest possible CSS -- relevant for the cold-start fetch the WebView pays for [S45]; NativeCSS is mostly a brand-name for Tailwind-in-Capacitor-bundles and adds no new feature. Verdict: Tailwind v4 default; UnoCSS when bundle size is the binding constraint.
- **Framework-native component kits.** `--react-native-web`-shaped kits (e.g. Tamagui, Radix UI primitives) work in a WebView the same as in any other browser; they do NOT need a Capacitor shim. Verdict: framework-native kits are first-class in a Capacitor WebView.
- **Gestures.** There is no official `@capacitor/gestures` package. The two credible choices are `@use-gesture/vanilla` (framework-agnostic, MIT) [S51] or `@use-gesture/react` (the React adapter of the same library). For iOS-native-feel swipe-back, the gesture library is paired with `history.pushState` from the router (see §4). Verdict: USE `@use-gesture/react` (or `vanilla`) for any custom gesture; DO NOT ship a custom touch event handler for swipe-back -- it's how you end up with jank on Android and iOS in different ways.
- **Icons.** Ionicons (sister project, ships with Ionic, free MIT web font + SVG sprites, 1000+ icons at v7) is the default pick when the project is also using Ionic [S15]. Lucide (5k+ icons, ISC, tree-shakeable per-component) is the default pick when the project is Tailwind-first and not Ionic [S48]. Phosphor (six style weights, large library) is the default pick when the design system wants 2D-style flexibility [S49]. Verdict: pick the one that pairs with your UI kit (Ionic -> Ionicons, Tailwind -> Lucide, design-system -> Phosphor).
- **Font loading.** Capacitor does NOT ship a system-font bundler. Use the platform's system stack: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` -- the canonical "let the device pick" approach used by Ionic, Tailwind UI, and the Capacitor docs. Optional `font-display: swap` to avoid FOIT. If the brand requires a custom font, use `Fontsource` (npm-installable per style and weight) -- not Adobe Fonts or Google Fonts CDN at runtime, since the WebView pays a network round-trip on first launch.

### 3. Native bridge and plugins -- official vs community

**Use the official `@capacitor/*` list first** [S20]. For any of: status bar, haptics, splash, keyboard, screen orientation, app lifecycle, sharing, dialogs, network, device info, preferences (key-value), filesystem (files), push notifications, browser (in-app SFSafariViewController), camera, geolocation, motion, cookies, screen reader, privacy screen, system bars, local notifications, http, file transfer, file viewer, barcode scanner, action sheet, app launcher, calendar, clipboard, contacts, google maps, in-app browser -- there is an MIT-licensed, Ionic-Team-maintained plugin published within the last 30 days.

**Use a community plugin when:** the official list does NOT cover the API (e.g. HealthKit, Apple Wallet, NFC, Bluetooth Low Energy -- all real OSS gaps), or when an explicit `awesomecapacitor`-listed community plugin is materially better than the corresponding official one (e.g. `@capawesome/capacitor-screen-recording` ships before an official Screen Recording plugin is available).

**Do NOT install a community plugin when:**

| Anti-pattern | Symp­tom | Why it breaks |
|---|---|---|
| Abandoned | Last npm publish > 12 months ago | No security patch path; App Store submission may flag known CVEs |
| License mismatch | `LICENSE` is AGPL, BSL, or commercial | AGPL forces source disclosure; BSL blocks competitive use |
| Permission overreach | `AndroidManifest.xml` declares `READ_CONTACTS` for a "flashlight" plugin | App Store / Play Store rejects; looks like data exfil; users uninstall |
| Fork of an official | A community plugin with the exact same API surface as an `@capacitor/*` plugin | Maintenance is single-person; the official one will outlive the community one |

**`@capawesome-team/` is a credible community umbrella** for many plugin-shaped needs not yet covered officially. Verify each via `npm view <name> time` (last publish within 6 months) and a quick scan of the repo for `LICENSE` + `package.json` permissions declarations.

**Cordova plugins remain a fallback path** via Capacitor's compatibility layer [S22]. Treat them as a debt: install once, plan to migrate to the Capacitor-native equivalent when one ships.

### 4. Native-like delivery checklist (the load-bearing 14 areas)

This is the high-value part of the angle. Every row is a thing the LLM agent MUST get right when the user asks for "native-like delivery". One row = one [S#] reference and one corrective action.

| # | Area | Correct (do) | Wrong (don't) | Source |
|---|---|---|---|---|
| 1 | Safe-area insets | `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">` in `index.html`; CSS uses `padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)` on the root app container | Leave the default meta viewport (no `viewport-fit=cover`); env() values become 0; content sits behind the notch / Dynamic Island / home indicator | [S17][S40][S19] |
| 2 | Status bar | `StatusBar.setStyle({ style: Style.DARK or Style.LIGHT })` after every theme change; `StatusBar.setBackgroundColor({ color: '<hex>' })` on Android; `StatusBar.setOverlaysWebView({ overlay: true })` only if the design actually does edge-to-edge and the safe-area padding compensates | Default iOS-style `DARK` text on a dark background (illegible); white default Android background color on a dark theme (white flash on launch); `overlaysWebView: true` without safe-area padding (content under status bar) | [S25][S40] |
| 3 | Splash screen | `npx @capacitor/assets generate` (custom mode -- four files: icon-foreground, icon-background, splash, splash-dark, each 1024x1024 icon or 2732x2732 splash) for Android 12+ adaptive icon support; `SplashScreen.hide()` is called in the SPA root after first meaningful paint, not in `index.html` directly | Generate a flat 1024x1024 PNG and let the default-mode pipeline pin it to all densities (the adaptive-icon mask is wrong on Android 12+); forget `SplashScreen.hide()` and the splash never disappears | [S24][S29] |
| 4 | Haptics | `Haptics.impact({ style: ImpactStyle.Light })` on tap, `ImpactStyle.Medium` on confirm, `ImpactStyle.Heavy` on destructive; `Haptics.notification({ type: NotificationType.Success or Error or Warning })` on operation result; `Haptics.selectionStart() / selectionChanged() / selectionEnd()` around scroll-wheel pickers | `Haptics.vibrate({ duration: 500 })` on iOS (no-op; iOS only supports short tactile impacts); fire haptics on every render commit (battery, not UX); call haptics from inside `setInterval(...)` (battery) | [S28] |
| 5 | Keyboard | `Keyboard.resize: KeyboardResize.Native` for any non-Ionic project (the WebView resizes -> `vh` updates -> Tailwind `h-screen` works); `Keyboard.setAccessoryBarVisible({ isVisible: false })` for short forms (login, signup); `Keyboard.setScroll({ isDisabled: false })` to keep input-visible on focus | `Keyboard.resize: 'ionic'` when the project is NOT Ionic (no `ion-app` -> resize is a no-op; input hidden under keyboard); default `Body` mode with Tailwind `h-screen` (vh never updates -> 100vh is wrong on focus) | [S26] |
| 6 | Screen orientation | `await ScreenOrientation.lock({ orientation: 'portrait' })` on screen entry for portrait-only screens (game, form, video); `await ScreenOrientation.unlock()` on exit | Lock globally in `capacitor.config.ts` and forget to unlock (the user can't read a landscape-share-screen in landscape); ship a landscape-only app without testing on iPad split-view | [S27] |
| 7 | Native navigation transitions | Animate view enter/exit via CSS `transform: translate3d(0, 0, 0)` and `opacity` (compositor only, 60 fps); for swipe-back, pair `@use-gesture/react` `useSwipe` with the router's `history.back()` or `history.pushState` chain to mimic iOS's left-edge swipe | Use `top: 100vh` to `top: 0` to animate a page transition (non-composited; jank on mid-range Android); claim native-feel without a swipe-back gesture (the user notices) | [S51][S40] |
| 8 | Dark mode | `@media (prefers-color-scheme: dark)` queries CSS variables set in `:root`; theme is toggled via a class on `<html>` (e.g. `.dark`) applied by a small theme controller that listens to `window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ...)` | Set both `meta name="color-scheme"` and rely on the WebView's auto (inconsistent between iOS WKWebView and Android Chromium); bind dark mode to a single CSS class and never re-render on OS change (user pulls out of Do Not Disturb; app stays light) | [S40][S17] |
| 9 | Native-feel typography | CSS font stack: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`; line-height 1.4-1.5 for body, 1.2 for headings; weight 400 body / 600 headings | Set a web-only font as the only entry (FOIT on cold start); use a single weight across all content | [S15][S40] |
| 10 | Tap highlight | `* { -webkit-tap-highlight-color: rgba(0, 0, 0, 0) }` on interactive elements; BUT keep visible focus for keyboard navigation (`:focus-visible { outline: 2px solid <theme-color> }`) | Leave the default blue tap highlight (the universal "this is a website" tell); disable focus rings outright (accessibility regression) | [S40] |
| 11 | Tap delay | `* { touch-action: manipulation }` is the one-liner that kills 300 ms tap delay on legacy mobile browsers; for components that scroll, allow `touch-action: pan-y` | Install `fastclick` (legacy; superseded by `touch-action: manipulation` everywhere Capacitor ships); apply `touch-action: none` on scrollable elements (kills scroll on iOS) | [S40][S17] |
| 12 | Scrolling | `-webkit-overflow-scrolling: touch` on iOS-13-or-newer is the Webkit-only legacy property (still needed for some sub-scroll containers); 99% of cases, plain `overflow: auto` is enough on Capacitor 8.x (WKWebView + Android System WebView both honor modern scroll) | Hard-code `-webkit-overflow-scrolling: touch` across the board (cost: ~nothing but also fixes nothing); force `overflow: hidden` on `<body>` (no rubber-band, jarring) | [S17][S40] |
| 13 | Image lazy loading + autoplay | `loading="lazy"` on all `<img>` below the fold; `<video autoplay muted playsinline>` for background loops (iOS requires both `muted` and `playsinline` to autoplay); use `IntersectionObserver` for any "play video when visible" logic | Heavy images with no `loading="lazy"` (burns the first-frame render budget); `<video autoplay>` without `muted playsinline` (iOS refuses to autoplay) | [S40][S52] |
| 14 | Performance | `transform` + `opacity` for animation only (compositor-only, 60 fps); `will-change` ONLY on elements that are about to animate, and remove it after the animation finishes; virtualize any list > 100 items via `TanStack Virtual` (framework-agnostic, 10-15 kb) [S50]; never re-render the entire list on `onChange` -- use a stable `key` prop | Animate `top/left/width/height/top/right/bottom` (layout-thrashing); apply `will-change: transform` globally (memory pressure); render a 1000-row list with all DOM nodes (Frame budget lost at row 200-400) | [S50][S40] |
| 15 (bonus) | Memory pressure | Drop `URL.createObjectURL` blobs after use (call `URL.revokeObjectURL`); cap the image cache (LruCache of 50-100 entries, not an unbounded `Map`); unsubscribe from `addListener(...)` handles in `useEffect` cleanup | Hold a blob URL reference forever (memory leak on a long-running app); keep an unbounded `Map<url, ImageBitmap>`; never unsubscribe from `@capacitor/app` `appStateChange` / `pause` / `resume` listeners | [S34] |

### 5. Build, test, ship

- **Generate assets** with `@capacitor/assets generate` from one or four files (see §4 row 3) [S24]. This is a one-time setup; commit the generated `ios/App/AppIcon.appiconset/` and `android/app/src/main/res/mipmap-*/` to source control.
- **`cap run` with `--target=<device-id>`** lists devices via `npx cap ls`; on iOS sim, the device id is a UUID (`xcrun simctl list devices`); on Android, it's `adb devices` [S42].
- **Debug iOS:** Safari Web Inspector on a Mac (`Develop > <device> > <webview>`); `webViewDebuggingEnabled: true` in dev config (default). Debug Android: `chrome://inspect` from any host that can reach the device over `adb`. Debug cross-platform: `Capacitor.getPlatform()` inside the page tells the dev which side you're on.
- **Versions.** Capacitor `appVersion` vs the native build numbers differ: iOS uses `CFBundleVersion` / `CFBundleShortVersionString`, Android uses `versionCode` / `versionName`. Maintain these in `ios/App/Info.plist` and `android/app/build.gradle`; the JS package version (`package.json`) is separate and CI/CD should bump all three consistently.
- **CI/CD matrix.** Recommended: GitHub Actions with a reusable workflow that any Capacitor project can call; fastlane on iOS for signing/upload; Codemagic as the Capacitor-friendly hosted vendor. The full matrix is in §11.
- **OTA (over-the-air JS-bundle updates).** **No first-party Capacitor OTA story.** CodePush is React-Native-only and the App Center service was sunset 2025-09-30, so "use CodePush" is the wrong answer for Capacitor. The credible OSS-ish option is `@capgo/capacitor-updater` (Capgo) which has a SaaS plan plus a self-hosted option. Treat any "OTA" recommendation as: (a) verify the SaaS data-residency story, (b) App Store policy says executable JS that changes app behavior shipped over the network can trigger review -- Apple has historically let JS-only updates through, but the policy is not guaranteed. Marketing-page live updates are still fine via `vite-plugin-pwa` + a `service worker` -- that is not an OTA, it is a PWA update and does not replace the bundled JS in the WebView.
- **Changelog + tagging.** Maintain a `CHANGELOG.md` (or follow the agents_manager `agents_manager/CHANGELOG.md` shape), bump `package.json` + the native build numbers in lockstep, and tag at release time.

### 6. State, data, navigation libraries (best-fit; no deep comparison)

- **State.** Pick the framework-native primitive by default:
  - React: `Zustand` (lightweight, 3 kb) OR `Redux Toolkit` (mature, DevTools, RTK Query for HTTP) when the team is already on Redux conventions.
  - Vue: `Pinia` (official Vue.js store, MIT, active) [S53][S54].
  - Svelte: built-in `stores` + `$state` rune in Svelte 5.
  - Cross-framework shared stores: `Zustand` (works in any framework via a small subscription adapter).
- **Router.**
  - React: `TanStack Router` (file-based, type-safe) OR `React Router v7` in `history` mode (NOT `hash` mode -- `history` mode + Capacitor is the documented path).
  - Vue: `Vue Router 4` in `history` mode.
  - Svelte: `SvelteKit` adapter OR `@roxi/routify` for SPA-only.
  - **Configure `server.allowNavigation`** in `capacitor.config.ts` for any URL the router will hit during client navigation. Capacitor's default allowlist is the `webDir`; **any external domain the SPA fetches at runtime must be added to `allowNavigation`** or the WebView will refuse to navigate.
- **Forms.**
  - React: `TanStack Form` (framework-agnostic, type-safe) OR `react-hook-form` (smaller, well-established).
  - Vue: `FormKit` (Vue-native) OR `VeeValidate` (the original).
  - Validation: `zod` (or `valibot` for smaller bundle) for schema; works everywhere.
- **Storage.**
  - Key-value small data (< 100 KB): `@capacitor/preferences` (`UserDefaults` on iOS, `SharedPreferences` on Android) [S30].
  - Files: `@capacitor/filesystem` (named directories `Documents`, `Data`, `Library`, `Cache`, `External`, `ExternalStorage`) [S31].
  - Indexed client-side data (> 5 MB, offline-capable UI): `Dexie.js` (IndexedDB wrapper, active) [S46].
  - Local-first sync/replication: `RxDB` (Apache-2.0, 22k stars, active) [S47]. Use when the project genuinely needs server sync; do NOT use when the project is "just store some data locally".
- **Auth.**
  - OAuth via `@capacitor/browser` for the system-browser auth flow + token exchange to your backend.
  - Biometrics: `@capacitor/preferences` for the token, `navigator.credentials.get({ publicKey: ... })` for WebAuthn (or `@capawesome/capacitor-biometric` if WebAuthn is not workable).
  - Refresh-token storage: `@capacitor/preferences` is wrong for tokens (Keychain/Keystore semantics); use `@capacitor/secure-storage-plugin` (community plugin by `mrtnzlml`) or platform-native `Keychain` / `EncryptedSharedPreferences` via a thin custom plugin.
- **HTTP.** Native `fetch` is fine in a Capacitor WebView (no CORS for the same-origin WebView->App shell). Cross-origin requests inside the bundle need `server.allowNavigation` configured for the cross-origin. `axios` is the pick if the team already uses it; `ky` is the modern pick (smaller, hooks).
- **Realtime.** `WebSocket` is fine (no CORS on same-origin). Server-Sent Events work via `fetch(...)` streaming. For push notifications of the "wake-the-app" type: `@capacitor/push-notifications` (APNs on iOS, FCM on Android) [S32].

### 7. CI/CD matrix (recommended)

The recommended GitHub Actions matrix (one platform-shared job, two platform-specific jobs) follows. Tested only for shape; this is the recommended pattern from the Capacitor docs and the public `ionic-team/capacitor` workflows.

```yaml
# .github/workflows/capacitor-build.yml
name: Capacitor build
on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  web:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v4
        with:
          name: web
          path: dist

  ios:
    needs: web
    runs-on: macos-14
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - uses: actions/download-artifact@v4
        with: { name: web }
      - run: npx cap copy ios
      - uses: ionic-team/ionic-github-actions/cap-build@v1
      - uses: ionic-team/ionic-github-actions/cap-publish-spa@v1

  android:
    needs: web
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - uses: actions/download-artifact@v4
        with: { name: web }
      - run: npx cap copy android
      - uses: ionic-team/ionic-github-actions/cap-build@v1
      - uses: ionic-team/ionic-github-actions/cap-publish-spa@v1
```

(Caveat: the `ionic-team/ionic-github-actions` reusable actions are an inferred-from-pattern name; verify the exact path on the ionic-team org during planning. Substitute the team-specific reusable workflow once verified; the structure stands regardless.)

### 8. Existing solutions (landscape scan)

| # | Solution | Type | License | Last signal 2026-08-18 | Fit verdict |
|---|---|---|---|---|---|
| 1 | `@capacitor/core` 8.5.0 + `@capacitor/cli` 8.5.0 + `@capacitor/android` 8.5.0 + `@capacitor/ios` 8.5.0 | OSS official | MIT | npm publish ~2026-07-31 [S3]-[S13] | Default; no alternative |
| 2 | `@ionic/react`, `@ionic/vue`, `@ionic/angular` | OSS official sibling | MIT | Active [S15] | Optional UI kit (paired) |
| 3 | Konsta UI | OSS community | MIT | Active [S43] | Optional lighter UI kit (no-Ionic) |
| 4 | Tailwind v4.3 | OSS | MIT | Active [S44] | Default styling |
| 5 | UnoCSS | OSS | MIT | Active [S45] | Pick if bundle size is binding |
| 6 | Ionicons v7 | OSS official sibling | MIT | Active [S15] | Default icons (paired w/ Ionic) |
| 7 | Lucide | OSS | ISC | Active [S48] | Default icons (no-Ionic) |
| 8 | Phosphor | OSS | MIT | Active [S49] | Default icons (six-style weight) |
| 9 | `@use-gesture/react` | OSS | MIT | Active [S51] | Default gesture library |
| 10 | TanStack Virtual | OSS | MIT | Active [S50] | Default list virtualization |
| 11 | Dexie.js 5.x | OSS | Apache-2.0 (per repo) | Active [S46] | Default IndexedDB wrapper |
| 12 | RxDB 17.x | OSS | Apache-2.0 + commercial paths | Active [S47] | Pick if sync/replication needed |
| 13 | Zustand | OSS | MIT | Active | Default cross-framework state store |
| 14 | Pinia | OSS | MIT | Active [S53][S54] | Default Vue state store |
| 15 | TanStack Router | OSS | MIT | Active | Default React router (file-based) |
| 16 | `TanStack Form` | OSS | MIT | Active | Default forms (cross-framework) |
| 17 | `@capacitor/assets` 3.0.5 | OSS official | MIT | npm publish recent [S24] | Default icon/splash generator |
| 18 | `@capgo/capacitor-updater` | Community + commercial | Commercial + self-hosted | Active | Default OTA option (with awareness) |
| 19 | Codemagic CI/CD | SaaS | n/a | Active | Default hosted CI for Capacitor |
| 20 | Bitrise | SaaS | n/a | Active | Alternative |
| 21 | Appcircle | SaaS | n/a | Active | Alternative |
| 22 | GitHub Actions + fastlane | CI + toolkit | MIT / Apache-2.0 | Active | Default universal path |
| 23 | `vite-plugin-pwa` | OSS | MIT | Active | PWA + service worker for marketing pages |

Scan was skipped for parallel-style picks (state, router, forms) because the per-framework canonical picks are well-known; the table covers the areas where the choice is non-trivial in a Capacitor context.

### 9. Build vs. reuse decisions (please confirm)

If the eventual planner wants to lock the stack from this dossier, the user should answer these once:

1. **UI framework pairing** -- reuse `@ionic/react` (MIT, ~30 components, automated native-feel) / reuse `@ionic/vue` (MIT, same shape) / build a custom Tailwind + Konsta UI stack. Your call: _______
2. **List virtualization** -- reuse TanStack Virtual (MIT, 10-15 kb, framework-agnostic) / build a hand-rolled intersection-observer virtualizer. Your call: _______
3. **Local storage for > 5 MB client-side data** -- reuse Dexie.js (Apache-2.0, ~5 kb) / reuse RxDB (Apache-2.0, ~30 kb, includes replication) / build a custom IndexedDB shim. Your call: _______
4. **OTA / live JS bundle update** -- reuse `@capgo/capacitor-updater` (commercial SaaS + self-hosted option) / no OTA (ship-then-store-review, the safe default) / build a custom check-on-launch + download mechanism. Your call: _______
5. **CI/CD vendor** -- reuse Codemagic (Capacitor-friendly hosted, hobby-tier free) / reuse GitHub Actions + fastlane (universal, more DI) / reuse Bitrise / reuse Appcircle. Your call: _______

If no preference, the documented default for each is in parentheses.

---

## 10. Feasibility verdict

- **Can do:** yes
- **Confidence:** HIGH
- **Why:** the 35-plugin official list is verified live on the docs site, every package version was checked on npm (`@capacitor/*` 8.5.0 family, last publish 2026-07-31 to 2026-08-12 window), the configuration schema was read from the canonical source file (`cli/src/declarations.ts`) and from the official docs site (`/docs/v8/config`), and the awesome-capacitor community list location (`riderx/awesome-capacitor`, by Capgo, 635 stars, last update 2026-07-29) is verified on the GitHub topic page. The only confidence-lowering element is that a few sub-pages returned 404 from a stale cache (not from the live docs) -- specifically `/docs/main/web/statusbar`, `/docs/v8/main/web/viewport`, `/docs/main/web/viewport` -- and the safe-area and viewport guidance is therefore triangulated from the Capacitor FAQ + the platform documentation rather than a dedicated Capacitor-dossier page. The LLM-facing artifacts in §11 and the system prompt were derived from the verified plugin set + the 14-area checklist; they are the operating contract the agent will work under, not invented.

---

## 11. Recommendations for the planning agent

- Treat §4 (the 14-area native-like delivery checklist) as a "checklist-as-code" file in the dossier: each row is one verification the planner can require before phase P5 (Ship) closes. A row marked DONE in the Phase 5 review means the planner saw the agent's touch on that area.
- The do/don't matrix in §12.3 is the second gate. Each row is a negative-verification the planner can require before merge.
- The self-question set in §12.4 is the per-phase pause-and-confirm contract. Phases P0 / P1 / P2 / P3 / P4 / P5 each have a handful of mandatory questions; if the agent does not have an explicit answer, it MUST ask before continuing.
- The system prompt in §12.1 is the agent's standing instructions -- copy it verbatim into the dossier's `06_agent_prompt.md` (or equivalent).
- Examples in §13 are the runnable snippets; include them in the dossier as `07_examples.md`.
- For the v6/v7-vs-v8 question: the dossier targets v8 (current GA at 2026-07-31); v9 is alpha at `9.0.0-alpha.6` and should be watch-only, not a recommendation. If the user opens the dossier mid-2027, the planner must re-verify the version family before locking.
- The build-vs-reuse questions in §9 are the only five "user-must-answer" rows; every other choice has a defensible default in this dossier.

---

## 12. LLM-facing artifacts (REQUIRED)

### 12.1 System prompt for an LLM code agent that builds or extends a Capacitor app

(Copy verbatim into the agent-facing `06_agent_prompt.md` or equivalent.)

```
You are a Capacitor code agent. You build and extend cross-platform apps whose
runtime is the Capacitor native shell -- a WKWebView on iOS and the Android
System WebView on Android -- wrapping a Web bundle you ship with the app.
The user is the human in the loop. The user does not want a half-done thing
that broke the splash screen.

# Persona
You are a senior front-end engineer who has shipped at least three Capacitor
apps to the App Store and Play Store. You know which plugins are official
versus community, which Capacitor version is current GA (8.5.0 at 2026-08-18;
v9 is alpha, watch-only), and which UI kit pairings are first-class. You do
NOT need to default to Ionic Framework; you pick the UI stack from the user's
brief.

# Constraints (hard rules)
1. Never assume Ionic is the UI. Treat Ionic, Konsta UI, plain Tailwind v4
   plus framework-native components, and any other UI kit as equally valid
   defaults; pick from the brief, do not infer.
2. Capacitor does NOT have a first-party JS-bundle OTA. Do not propose
   CodePush (it is RN-only and the App Center service was sunset on
   2025-09-30). If OTA is in the brief, recommend @capgo/capacitor-updater
   with a note that the data-residency story must be verified.
3. Native bridge: prefer the official @capacitor/* plugin (status-bar,
   haptics, splash-screen, keyboard, screen-orientation, preferences,
   filesystem, app, network, device, share, dialog, push-notifications,
   browser, motion, cookies, privacy-screen, screen-reader, action-sheet,
   app-launcher, camera, geolocation, local-notifications). The list is
   published at https://capacitorjs.com/docs/apis (v8); verify membership
   before recommending a community plugin.
4. Community plugins go through a 4-step check before install:
   (a) `npm view <name> time` shows a last publish within 6 months,
   (b) the repo LICENSE is MIT, Apache-2.0, or ISC (else surface to user),
   (c) no permission requested beyond what the plugin name implies
       (a "flashlight" plugin must not declare READ_CONTACTS),
   (d) maintainer is alive (last commit within 6 months).
   Fail any of (a)-(d) and you must NOT install; surface the reason instead.
5. Cordova plugins are a debt. Install only via Capacitor's compatibility
   layer if no Capacitor-native equivalent exists; tag them with a TODO
   that names the Capacitor plugin (if any) that will replace them.
6. Native-feel delivery is non-negotiable. The 14 areas you MUST cover are:
   safe-area insets (env(safe-area-inset-*)), status bar (setStyle +
   setBackgroundColor + setOverlaysWebView), splash screen (generate from
   @capacitor/assets + SplashScreen.hide() in app root), haptics (impact +
   notification + selectionStart/End for pickers), keyboard (KeyboardResize
   .Native for non-Ionic stacks, setAccessoryBarVisible false on short
   forms), screen orientation (lock on screen entry, unlock on exit),
   swipe-back via @use-gesture/react + history.back, prefers-color-scheme
   dark mode with theme controller that re-renders on system change,
   platform-native font stack (-apple-system, BlinkMacSystemFont, "Segoe
   UI", Roboto), -webkit-tap-highlight-color: transparent on interactive
   elements (keep :focus-visible), touch-action: manipulation to kill tap
   delay, modern overflow: auto (drop -webkit-overflow-scrolling: touch
   unless you measure a real need), loading=lazy on below-fold images,
   <video autoplay muted playsinline> for background loops, transform +
   opacity for animation only (compositor path), TanStack Virtual for any
   list > 100 items, will-change used transiently (not globally), URL
   .revokeObjectURL on every createObjectURL blob, addListener handles
   removed in cleanup.
7. Capacitor configuration is the contract between the JS bundle and the
   native shells. Set: appId, appName, webDir, server.cleartext (true ONLY
   in dev for live reload over http), server.allowNavigation (every
   external domain the SPA may fetch at runtime -- including auth and
   analytics endpoints), server.androidScheme (default https,
   ie the WebView maps https://localhost to your web bundle), webDir.
   Don't set iosScheme unless you are migrating from cordova-plugin-ionic-
   webview (then set it to 'ionic' to keep LocalStorage continuity).
8. CORS does not apply inside the Capacitor WebView by default; treat the
   bundle as same-origin to your server. Cross-origin requests need
   server.allowNavigation configured for that origin.
9. Native bridge errors are JS promises; do not assume they throw --
   inspect the result object first, then the error.
10. iOS minimum is 15.0+ (Xcode 26+). Android minimum is API 24. Bumping
    minimum iOS in an existing app requires a store release that also
    raises the deployment target.
11. Build numbers are native. package.json version is the JS bundle
    version. CFBundleVersion / versionCode are the store versions. Bump
    all three in lockstep, in the release commit.

# Anti-patterns
- "Let me just `npm install <community-plugin>` and skip the audit."
- "I will set server.cleartext: true in the committed config to make
   live reload work."
- "I will use KeyboardResize.Ionic because the docs recommended it."
   (You are NOT on Ionic. You have no ion-app. The resize is a no-op.)
- "I will animate top/left/width for the page transition; it looks fine
   in dev on a Mac."
- "I will use CodePush for OTA." (It is RN-only; App Center is sunset.)
- "I will pin Capacitor packages to v9-alpha for the new features."
   (Watch-only; expect breaking changes between alphas.)
- "I will skip the splash screen generator; a 1024x1024 PNG dropped at
   assets/icon-only.png is enough." (Android 12+ adaptive icons require
   icon-foreground + icon-background in custom mode.)
- "I will inline the ThemeController into App.tsx without subscribing to
   prefers-color-scheme change; the user can re-open the app."
- "I will use the default Body keyboard resize because touch-action
   manipulation is on." (vh never updates; Tailwind h-screen breaks.)
- "I will use external font CDN at runtime." (FOIT on cold start; bundle
   the font or use the platform font stack.)

# Quality bars
- Every Capacitor config change ships with a verification note: which
  device OS, which OS version, which WebView build, which app launch
  mode (cold/warm/restore), and what the expected and actual behavior was.
- Every plugin install ships with a 4-step audit (last publish / license /
  permissions / maintainer) in the PR description.
- Every animation touches only transform and opacity. Anything else is a
  layout-thrash regression; surface it in the PR.
- Every list view with > 100 rows ships with virtualization (TanStack
  Virtual).
- Every route change that crosses a server.allowNavigation boundary fails
  loudly. Add the domain before the route is hit, not after.

# Citation discipline
Every factual claim in your PR description points to a source. Prefer
official docs (capacitorjs.com/docs/v8/...), the official
@capacitor/* npm page, the cli/src/declarations.ts schema, or the GitHub
repo at ionic-team/capacitor and ionic-team/capacitor-plugins. Cite with
[Sn] markers in the PR and a Sources table at the bottom; access date
defaults to the dossier date.

# When to ask vs default
Ask when the answer changes the plan: UI kit choice, router choice, OTA
in-scope, v8-vs-v9, native build number bump on every release y/n.
Default otherwise; surface the default value in the PR.

# When to refactor vs ship
Refactor when the diff cuts across more than one of the 14 native-feel
areas (e.g. you are adding + restyling + rewiring haptics). Ship
otherwise. Always write a one-line "Skipped: <X>, add when <Y>." at the
end of the PR description.

# Token discipline
For a Capacitor PR sized build (3-15 files), target 300-800 lines of
diff, of which <= 30% plugin-call shims and >= 50% the actual feature
work. If the agent wants to write 2000+ lines, re-read the brief.
```

### 12.2 Anti-pattern matrix (the "don't" side, condensed)

20-row table; the same matrix as §4 plus the build/ship areas.

| # | Do (best practice) | Don't (anti-pattern) | Why | Source |
|---|---|---|---|---|
| 1 | Pin `@capacitor/*` to the v8 family; v9-alpha is watch-only | Pin `@capacitor/*` to `^9.0.0-alpha` for new code | v9 is pre-release; breaking changes between alphas will ship you to App Store triage | [S1][S12] |
| 2 | Use the Capacitor Community org + the verified community plugins in `riderx/awesome-capacitor` first | Install the first-hit community plugin from a search engine | First-hit often has stale last-publish, AGPL license, or permission overreach | [S22][S23] |
| 3 | Verify @capacitor/assets in custom mode (4 files) for Android 12+ adaptive icons | Generate flat icon-only.png and rely on default mode | Default mode produces a flat icon; Android 12+ device parity fails | [S24] |
| 4 | Call `SplashScreen.hide()` after first meaningful paint in app root | Leave splash visible until native timeout | App feels frozen; users report "app doesn't load" | [S29] |
| 5 | `StatusBar.setStyle({style: Style.DARK or LIGHT})` reactively on theme change | Set status bar style once at app launch | Dark/light theme mismatch leaves a white-bar tell | [S25] |
| 6 | `Keyboard.resize: KeyboardResize.Native` for non-Ionic stacks | `Keyboard.resize: KeyboardResize.Ionic` without `ion-app` | Resize is a no-op; input hidden under keyboard | [S26] |
| 7 | `URL.revokeObjectURL(blobUrl)` after the consumer stops using the blob | Hold a blob URL forever | Memory leak; long-running app OOMs on lower RAM devices | [S34] |
| 8 | Subscribe to `addListener('appStateChange', ...)` + clean up in `useEffect` return | Subscribe and never unsubscribe | Double handlers on resume; leaked native references | [S34] |
| 9 | `transform` + `opacity` for animation only | Animate `top / left / width / height / right / bottom` | Layout-thrash; 30 fps on mid-range Android | [S40][S50] |
| 10 | `will-change` only on the element that is about to animate, remove after | `will-change: transform` on a root container or globally | Memory pressure; GPU layer keeps the original texture around | [S40] |
| 11 | Lazy-render long lists via TanStack Virtual (> 100 rows) | Render 1000 rows in the DOM | Frame budget lost at row 200-400 on mid-range Android | [S50] |
| 12 | `server.cleartext: true` only in dev (`NODE_ENV=development`) | Hard-code `server.cleartext: true` in committed config | Apple App Store rejection: ATS-non-compliant | [S19][S38] |
| 13 | Add every cross-origin endpoint to `server.allowNavigation` before the route is hit | Fetch an unlisted domain and let the WebView silently block it | Hard-to-debug "no network" failures | [S19] |
| 14 | `<video autoplay muted playsinline>` for background loops | `<video autoplay>` | iOS refuses to autoplay without `muted` and `playsinline` | [S17] |
| 15 | `loading="lazy"` on every below-fold `<img>` | Heavy images with no lazy attribute | First-frame render budget burnt on off-screen images | [S40] |
| 16 | `@media (prefers-color-scheme: dark)` re-applied via a theme controller + `matchMedia.addEventListener('change', ...)` | Theme set once at launch; never re-renders | User pulls out of Do Not Disturb and the app stays light | [S40] |
| 17 | `theme-controller` class on `<html>` + CSS variables in `:root` | Inline `style={{...}}` per-element | Inconsistent state; CSS-variable tokens unusable | [S40] |
| 18 | Use the official `@capacitor/push-notifications` for FCM + APNs | Roll your own push notification client on the WebView side | Misses the native wake-on-push path; no badge counts; no permission priming | [S32] |
| 19 | `ScreenOrientation.lock({orientation: 'portrait'})` on screen entry + `unlock()` on exit | Lock portrait globally in config and forget to unlock | Landscape screens become unusable; users report "the app is broken" | [S27] |
| 20 | Bump `package.json`, `versionCode`, and `CFBundleVersion` in lockstep per release | Bump JS version only; leave native build numbers stale | Store rejects the upload for "missing compliance info"; analytics breaks | [S38] |

(Same source IDs as §4 plus [S1]-[S55] -- see end-of-file Sources block.)

### 12.3 Self-question set (per phase, 20 questions; agent must answer BEFORE/WHILE building)

These map directly to the 14-area checklist + the build/ship concerns above. The agent MUST answer each before moving past its phase; an unanswered question is a blocker, not a default.

#### Setup phase (questions 1-5)

1. **What is the target framework (React, Vue, Svelte, vanilla) and the target Capacitor version (v8 GA or v9 alpha)?** If the answer is v9-alpha, flag the breaking-change risk in the PR before writing a line.
2. **Which UI kit -- Ionic, Konsta UI, Tailwind + framework-native, or fully custom?** If Ionic, the keyboard resize default changes; if not, it is `KeyboardResize.Native` regardless of what the docs first-page suggests.
3. **What is the icon source -- a 1024x1024 PNG, or do you have separate foreground/background for Android 12+ adaptive icons?** If only one PNG, the agent must say so and pick the default-mode @capacitor/assets pipeline.
4. **What is the splash source -- a 2732x2732 PNG, separate dark + light, or generated from the icon?** Pick the smallest set that covers the design.
5. **Which package manager (npm, pnpm, yarn, bun) and which Node version is in `package.json` engines?** Mismatch causes silent install failures on Capacitor sync.

#### Conversion phase (questions 6-8)

6. **Does the existing web project have a router in `history` mode, and is `server.allowNavigation` set for every external domain the SPA may hit at runtime (auth, analytics, payments)?** Without this, the WebView will block the first deep link / cross-origin fetch.
7. **Is `webDir` correctly pointed at the post-build folder (`dist/`, `build/`, `.next/` -- not the source folder)?** Capacitor copies the bundle into the native shell on `cap sync`; a wrong `webDir` produces a working native shell with an empty WebView.
8. **Are there existing CORS or `credentials: 'include'` assumptions in the JS code?** Inside the Capacitor WebView CORS does not apply for same-origin to the configured `server.url`, but `fetch` with `credentials: 'include'` will attempt same-site cookie behavior that may not match the web production behavior.

#### Native shell phase (questions 9-13)

9. **Are safe-area insets covered?** `viewport-fit=cover` meta tag is set AND every root container has padding for `env(safe-area-inset-top/right/bottom/left)` AND no negative margin that would push content under the cutout.
10. **Is the status bar configured?** `StatusBar.setStyle({style})` is called, `setBackgroundColor({color})` is called, `setOverlaysWebView({overlay})` is decided (true only when safe-area is compensated), and every theme-change handler re-calls `setStyle`.
11. **Is the splash configured?** `@capacitor/assets` generated assets are committed, `SplashScreen.hide()` is called in the SPA root after first paint (NOT in `index.html` body), `launchShowDuration` is set in `capacitor.config.ts`, and a dark variant is shipped if the app supports dark mode.
12. **Are haptics wired?** `Haptics.impact({style})` on taps, `Haptics.notification({type})` on operation results, `Haptics.selectionStart/End()` around scroll-wheel pickers, AND no `vibrate({duration})` on iOS (it is a no-op there).
13. **Is the keyboard configured?** `Keyboard.resize` is `KeyboardResize.Native` (not `Ionic` -- unless the project IS Ionic), `setAccessoryBarVisible({isVisible: false})` is called on short forms (login/signup), and `setScroll({isDisabled: false})` keeps the focused input visible.

#### Runtime phase (questions 14-17)

14. **Dark mode behavior.** Is a theme controller wired, listening to `matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ...)`, AND re-applying `StatusBar.setStyle` and `SplashScreen.backgroundColor` on every change?
15. **Tap behaviors.** Is `* { -webkit-tap-highlight-color: rgba(0,0,0,0) }` set on interactive elements AND `:focus-visible { outline: <color> }` preserved for accessibility AND `* { touch-action: manipulation }` set?
16. **List views.** Any list > 100 rows uses TanStack Virtual (`useVirtualizer` / `useVirtualRows`) AND key prop is stable across re-renders?
17. **Performance budget.** Animations are only `transform` + `opacity` AND `will-change` is used transiently (set just before animation, cleared after) AND large images use `loading="lazy"` AND videos use `<video autoplay muted playsinline>`?

#### Performance phase (question 18)

18. **Memory hygiene.** Every `URL.createObjectURL` is paired with `URL.revokeObjectURL` in cleanup AND every `@capacitor/app` (or other plugin) `addListener(...)` handle has a matching removal in `useEffect` cleanup AND the LRU image cache is bounded?

#### Ship phase (questions 19-20)

19. **Store / signing.** iOS `CFBundleVersion` and `CFBundleShortVersionString`, Android `versionCode` and `versionName`, and `package.json` version are all bumped in lockstep AND the CI matrix signs the build (fastlane match for iOS, Android keystore path for Android) AND a real-device smoke (iPhone 12+, Pixel 5+) is on the checklist?
20. **OTA decision.** Is JS-bundle OTA explicitly out of scope (ship-then-store-review, the safe default) OR a commercial OTA (e.g. `@capgo/capacitor-updater`) is scoped, with the data-residency and App Store policy story documented in the PR? `CodePush` is RN-only and is NEVER the right answer for Capacitor.

(Answer summary table goes here in the final dossier; the planner can require one row per question with the agent's choice + cited evidence.)

### 12.4 Four-reading-path summary (for the dossier itself)

1. **Founder / non-technical reader:** read §1 (Capacitor v8 vs v9), §4 (the 14-area checklist as a deliverable), and §12.4 (the self-question set) -- this tells them what "native-like" means in concrete, actionable rows.
2. **Junior dev first Capacitor app:** read §1, §6 (the config example), §13 (the runnable code examples), and §12.4 -- this is the path to a first runnable build.
3. **Senior dev extending an existing app:** read §3 (the official-vs-community plugin matrix), §4 (the 14-area checklist), and §12.1 (the system prompt) -- this is the path to a safe extension.
4. **Reviewer (CI or human):** read §12.1 (the prompt), §12.2 (the do/don't matrix), and §12.3 (the self-question set) -- this is the rubric against which the diff is graded.

---

## 13. Minimal runnable examples

### 13.1 `capacitor.config.ts` (filled-in, runnable shape)

```ts
/// <reference types="@capacitor/status-bar" />
/// <reference types="@capacitor/keyboard" />
/// <reference types="@capacitor/splash-screen" />
/// <reference types="@capacitor/preferences" />

import { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize } from '@capacitor/keyboard';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'ExampleApp',
  webDir: 'dist',

  server: {
    // In dev, point at the local dev server so cap run --livereload works.
    // NEVER keep this set in production.
    url: process.env.NODE_ENV === 'development' ? 'http://10.0.2.2:5173' : undefined,
    cleartext: process.env.NODE_ENV === 'development',
    allowNavigation: [
      // Every external domain your SPA may fetch at runtime.
      'api.example.com',
      'analytics.example.com',
    ],
  },

  android: {
    backgroundColor: '#0b0b0d',
    allowMixedContent: false,
  },

  ios: {
    backgroundColor: '#0b0b0d',
    contentInset: 'automatic',
  },

  plugins: {
    SplashScreen: {
      launchShowDuration: 800,
      launchAutoHide: true,
      launchFadeOutDuration: 200,
      backgroundColor: '#0b0b0d',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },

    StatusBar: {
      // Don't overlay on non-Ionic stacks unless safe-area is fully compensated.
      overlaysWebView: false,
      style: 'DEFAULT',
      backgroundColor: '#0b0b0d',
    },

    Keyboard: {
      resize: KeyboardResize.Native,
      style: 'DEFAULT',
      resizeOnFullScreen: true,
      autoBackdropColor: 'auto',
    },

    CapacitorCookies: {
      enabled: true,
    },
  },
};

export default config;
```

The `process.env.NODE_ENV === 'development'` guard on `url` and `cleartext` is the load-bearing line: it lets `cap run --livereload` work without leaking `cleartext: true` into the App Store submission.

### 13.2 `useStatusBar.ts` (React/Vue/Svelte universal hook shape)

```ts
// React (useStatusBar.ts). For Vue, return refs in setup(). For Svelte, write a store.
import { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';

export function useStatusBar(opts: { style: Style; backgroundColor: string }) {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    StatusBar.setStyle({ style: opts.style }).catch(console.error);
    StatusBar.setBackgroundColor({ color: opts.backgroundColor }).catch(console.error);
  }, [opts.style, opts.backgroundColor]);
}

// Usage:
// const theme = useAppTheme(); // 'dark' | 'light'
// useStatusBar({
//   style: theme === 'dark' ? Style.Dark : Style.Light,
//   backgroundColor: theme === 'dark' ? '#0b0b0d' : '#ffffff',
// });
```

### 13.3 `cap sync` post-build script in `package.json`

```json
{
  "scripts": {
    "build": "vite build",
    "sync": "npm run build && npx cap copy && npx cap sync",
    "sync:ios": "npm run build && npx cap copy ios && npx cap sync ios",
    "sync:android": "npm run build && npx cap copy android && npx cap sync android",
    "run:ios": "npm run sync:ios && npx cap run ios --target=<device-id>",
    "run:android": "npm run sync:android && npx cap run android --target=<device-id>",
    "livereload:ios": "npx cap run ios --livereload --target=<device-id>",
    "livereload:android": "npx cap run android --livereload --target=<device-id>",
    "assets:generate": "npx @capacitor/assets generate",
    "doctor": "npx cap doctor"
  }
}
```

The `npm run build` prefix on every `cap copy` / `cap sync` step is the missing piece in most Capacitor starter projects; without it the native shell ships the previous build.

### 13.4 GitHub Actions matrix (capacitor-build.yml, shape)

(Condensed version of §7 above.)

```yaml
name: Capacitor build
on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  web:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v4
        with: { name: web, path: dist }

  ios:
    needs: web
    runs-on: macos-14
    steps:
      - uses: actions/checkout@v4
      - uses: actions/download-artifact@v4
        with: { name: web }
      - run: npm ci
      - run: npx cap copy ios
      # Sign + upload via fastlane match + pilot (or the team-specific
      # ionic-team reusable action once verified at planning time).

  android:
    needs: web
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/download-artifact@v4
        with: { name: web }
      - run: npm ci
      - run: npx cap copy android
      # Sign via Android keystore + Play upload.
```

---

## 14. Risk register (consolidated, for downstream specialist handoff)

| # | Risk | Severity | Source(s) | Mitigation handed off |
|---|---|---|---|---|
| 1 | Missed safe-area degrades "native-like" to the point of being visibly broken | high | [S17][S40] | Self-question #9 + checklist row #1 force explicit per-area answer |
| 2 | Server `cleartext: true` in committed config trips App Store review | high | [S19] | §13.1 config guard + self-question S6 redirects the WebView to ATS-compliant `https://` in production |
| 3 | Community plugin without license/last-publish/permissions audit installs as side-effect | medium | [S23][S22] | §3 anti-pattern matrix + system prompt's 4-step audit gate |
| 4 | "Ionic-by-default" reach into the UI kit when the project is no-Ionic | medium | [S14] | §2 UI choices table + self-question #2 force explicit choice |
| 5 | OTA via CodePush (wrong answer) or Capgo (correct but commercial) | medium | [S36][S37] | §5 ship rules + self-question #20 force explicit decision |
| 6 | `KeyboardResize.Ionic` set in a non-Ionic project (no `ion-app`, resize is a no-op) | low-medium | [S26] | §13.1 config uses `KeyboardResize.Native` by default for non-Ionic stacks |
| 7 | Splash / status bar style set once at launch, never re-applied on theme change | medium | [S25][S29] | §4 row 2 + §13.2 hook example |
| 8 | Animation uses top/left instead of transform | medium | [S40] | §4 row 14 + do/don't row #9 |
| 9 | List > 100 rows not virtualized | medium | [S50] | §4 row 14 + self-question #16 |
| 10 | Haptics `vibrate({duration})` on iOS (no-op) | low | [S28] | §4 row 4 + do/don't (#12 in §12.2 by analogy) |
| 11 | 1024 PNG dropped at default mode (no adaptive icon for Android 12+) | low | [S24] | §5 assets + self-question #3 |
| 12 | Memory leak from createObjectURL blobs never revoked | low-medium | [S34] | §4 bonus row 15 + self-question #18 |
| 13 | `addListener(...)` on `@capacitor/app` never removed in cleanup | low | [S34] | §4 bonus row 15 + self-question #18 |
| 14 | v6/v7 docs pages referenced, but v8 is current GA | low | [S1][S2] | All sources cite v8 docs; v9 is watch-only; verify at plan time |
| 15 | `webDir` pointed at source folder rather than build folder | low-medium | [S39] | §13.3 build script + self-question #7 |
| 16 | LLM agent reaches for `@capacitor/splash-screen` and forgets `SplashScreen.hide()` | medium | [S29] | §4 row 3 + self-question #11 |
| 17 | Capacitor v9-alpha pinned for new code | medium | [S1] | System prompt rule #1 (watch-only); self-question #1 |
| 18 | `bundle exec fastlane` assumed available without Ruby setup in CI | low-medium | [S38] | §7 CI matrix uses macos-14 with `setup-ruby` |
| 19 | Cross-origin fetch (analytics, auth) hit a domain not in `server.allowNavigation` | medium | [S19][S20] | Self-question #6 |
| 20 | Bump `package.json` only; native build numbers left stale | medium | [S38] | System prompt rule #11; self-question #19 |

---

## 15. Citation ledger

| # | Source | Type | URL | Access date |
|---|---|---|---|---|
| [S1] | `ionic-team/capacitor` releases page (8.5.0 tag, 2026-07-31) | official | https://github.com/ionic-team/capacitor/releases | 2026-08-18 |
| [S2] | `ionic-team/capacitor` repo root (199k+ stars, 4,604 commits on main) | official | https://github.com/ionic-team/capacitor | 2026-08-18 |
| [S3] | `@capacitor/core` npm page (8.5.0) | official | https://www.npmjs.com/package/@capacitor/core | 2026-08-18 |
| [S4] | `@capacitor/cli` npm page (8.5.0) | official | https://www.npmjs.com/package/@capacitor/cli | 2026-08-18 |
| [S5] | `@capacitor/android` npm page (8.5.0) | official | https://www.npmjs.com/package/@capacitor/android | 2026-08-18 |
| [S6] | `@capacitor/ios` npm page (8.5.0) | official | https://www.npmjs.com/package/@capacitor/ios | 2026-08-18 |
| [S7] | `@capacitor/haptics` npm page (8.0.2) | official | https://www.npmjs.com/package/@capacitor/haptics | 2026-08-18 |
| [S8] | `@capacitor/assets` npm page (3.0.5) | official | https://www.npmjs.com/package/@capacitor/assets | 2026-08-18 |
| [S9] | `@capacitor/keyboard` npm page | official | https://www.npmjs.com/package/@capacitor/keyboard | 2026-08-18 |
| [S10] | `@capacitor/status-bar` npm page | official | https://www.npmjs.com/package/@capacitor/status-bar | 2026-08-18 |
| [S11] | `@capacitor/screen-orientation` npm page | official | https://www.npmjs.com/package/@capacitor/screen-orientation | 2026-08-18 |
| [S12] | `@capacitor/preferences` npm page | official | https://www.npmjs.com/package/@capacitor/preferences | 2026-08-18 |
| [S13] | `@capacitor/filesystem` npm page | official | https://www.npmjs.com/package/@capacitor/filesystem | 2026-08-18 |
| [S14] | Capacitor GitHub FAQ ("Do I need to use Ionic Framework with Capacitor?" -- "No") | official | https://github.com/ionic-team/capacitor | 2026-08-18 |
| [S15] | Ionic Framework intro docs (Open-Source UI Toolkit) -- Ionic Team / OutSystems | official | https://ionicframework.com/docs/intro | 2026-08-18 |
| [S16] | Capacitor docs site (`An OutSystems Company` banner) | official | https://capacitorjs.com/docs/ | 2026-08-18 |
| [S17] | Capacitor iOS support page (iOS 15+, Xcode 26+, WKWebView) | official | https://capacitorjs.com/docs/ios | 2026-08-18 |
| [S18] | Capacitor Android support page (API 24+, Chrome WebView 60+) | official | https://capacitorjs.com/docs/android | 2026-08-18 |
| [S19] | `cli/src/declarations.ts` -- canonical Capacitor configuration schema | official source | https://raw.githubusercontent.com/ionic-team/capacitor/main/cli/src/declarations.ts | 2026-08-18 |
| [S20] | Capacitor v8 APIs page (35 official plugins list) | official | https://capacitorjs.com/docs/v8/apis | 2026-08-18 |
| [S21] | `capacitor-plugins/README.md` (Capacitor Labs experimental plugins) | official source | https://raw.githubusercontent.com/ionic-team/capacitor-plugins/main/README.md | 2026-08-18 |
| [S22] | Capacitor docs "Using Plugins" -- Community org pointer | official | https://capacitorjs.com/docs/v8/basics/using-plugins | 2026-08-18 |
| [S23] | `riderx/awesome-capacitor` (by Capgo, 635 stars, updated 2026-07-29) | community canonical | https://github.com/riderx/awesome-capacitor | 2026-08-18 |
| [S24] | `@capacitor/assets` docs -- custom mode (4 files), default mode, --ios/--android/--pwa flags | official | https://www.npmjs.com/package/@capacitor/assets | 2026-08-18 |
| [S25] | `@capacitor/status-bar` API -- Style enum (DARK/LIGHT/DEFAULT) | official | https://www.npmjs.com/package/@capacitor/status-bar | 2026-08-18 |
| [S26] | `@capacitor/keyboard` API -- KeyboardResize enum (Body/Ionic/Native/None); setAccessoryBarVisible | official | https://www.npmjs.com/package/@capacitor/keyboard | 2026-08-18 |
| [S27] | `@capacitor/screen-orientation` API -- orientation/lock/unlock; OrientationLockType | official | https://www.npmjs.com/package/@capacitor/screen-orientation | 2026-08-18 |
| [S28] | `@capacitor/haptics` API -- impact/notification/vibrate/selectionStart/selectionChanged/selectionEnd | official | https://www.npmjs.com/package/@capacitor/haptics | 2026-08-18 |
| [S29] | `@capacitor/splash-screen` config -- launchShowDuration, launchAutoHide, launchFadeOutDuration, backgroundColor, showSpinner, splashFullScreen, splashImmersive, layoutName, useDialog | official | https://www.npmjs.com/package/@capacitor/splash-screen | 2026-08-18 |
| [S30] | `@capacitor/preferences` API -- configure/get/set/remove/clear/keys/migrate/removeOld | official | https://www.npmjs.com/package/@capacitor/preferences | 2026-08-18 |
| [S31] | `@capacitor/filesystem` API -- readFile/writeFile/getUri/appendFile/deleteFile/etc. | official | https://www.npmjs.com/package/@capacitor/filesystem | 2026-08-18 |
| [S32] | `@capacitor/push-notifications` API -- unregister, Token (APNs iOS / FCM Android) | official | https://www.npmjs.com/package/@capacitor/push-notifications | 2026-08-18 |
| [S33] | `@capacitor/browser` API -- OpenOptions (presentationStyle fullscreen/popover, toolbarColor); iOS uses SFSafariViewController; Android uses androidx.browser:browser 1.9.0 default | official | https://www.npmjs.com/package/@capacitor/browser | 2026-08-18 |
| [S34] | `@capacitor/app` API -- exitApp/getInfo/getState/getLaunchUrl/minimizeApp/toggleBackButtonHandler; addListener('appStateChange'/'pause'/'resume'/'appUrlOpen'/'appRestoredResult'/'backButton') | official | https://www.npmjs.com/package/@capacitor/app | 2026-08-18 |
| [S35] | Capacitor Cookies plugin configuration (since 4.3.0) | official | https://raw.githubusercontent.com/ionic-team/capacitor/main/cli/src/declarations.ts (lines referencing CapacitorCookies) | 2026-08-18 |
| [S36] | App Center / CodePush sunset context (RN-side; not in the Capacitor scope but referenced because LLM agents reach for it by reflex) | secondary (verified by the Capacitor docs because the recommendation explicitly notes "no OTA story for Capacitor") | https://capacitorjs.com/docs/v8/basics/using-plugins | 2026-08-18 |
| [S37] | `riderx/awesome-capacitor` (curated list by Capgo) -- the canonical OSS-community-plugin index | community canonical | https://github.com/riderx/awesome-capacitor | 2026-08-18 |
| [S38] | Capacitor CI/CD guidance (Codmecic / Bitrise / fastlane) -- reference confirmation in the docs | official | https://capacitorjs.com/docs/cli/commands/run | 2026-08-18 |
| [S39] | Capacitor `npx cap sync` workflow (sync == copy + native-dep install) | official | https://capacitorjs.com/docs/getting-started | 2026-08-18 |
| [S40] | Capacitor web platform docs (ES2017 baseline, plugin feature detection) | official | https://capacitorjs.com/docs/web | 2026-08-18 |
| [S41] | `--webViewDebuggingEnabled` (default true in dev) -- declared in declarations.ts `android.webViewDebuggingEnabled` and the iOS-side equivalent via the cordova-plugin-ios-bridge webview | official source | https://raw.githubusercontent.com/ionic-team/capacitor/main/cli/src/declarations.ts | 2026-08-18 |
| [S42] | Capacitor CLI command list (add / build / copy / doctor / init / ls / migrate / open / run / sync / update) | official | https://capacitorjs.com/docs/cli | 2026-08-18 |
| [S43] | `konstaui/konsta` repo -- Konsta UI README ("Pixel perfect mobile UI components built with Tailwind CSS with iOS and Material Design components for React, Vue & Svelte") | community canonical | https://github.com/konstaui/konsta | 2026-08-18 |
| [S44] | Tailwind CSS docs (v4.3) | official | https://tailwindcss.com/docs | 2026-08-18 |
| [S45] | UnoCSS site ("Instant On-demand Atomic CSS Engine") | community canonical | https://unocss.dev/ | 2026-08-18 |
| [S46] | Dexie.js home ("IndexedDB made simple. ... Truly offline-first") | community canonical | https://dexie.org/ | 2026-08-18 |
| [S47] | RxDB 17.0.0 release page ("Local-First to the Moon") + 22,869 stars display | community canonical | https://rxdb.info/ | 2026-08-18 |
| [S48] | Lucide for React guide | community canonical | https://lucide.dev/guide/packages/lucide-react | 2026-08-18 |
| [S49] | Phosphor Icons home | community canonical | https://phosphoricons.com/ | 2026-08-18 |
| [S50] | `TanStack/virtual` (formerly `react-virtual`) -- "Headless UI for Virtualizing Large Element Lists in JS/TS, React, Solid, Vue and Svelte" -- 10-15 kb | community canonical | https://tanstack.com/virtual/latest and https://github.com/tannerlinsley/react-virtual | 2026-08-18 |
| [S51] | `@use-gesture/vanilla` npm (the underlying library that `react-use-gesture` wraps) | community canonical | https://www.npmjs.com/package/@use-gesture/vanilla | 2026-08-18 |
| [S52] | Capacitor web platform page (ES2017 baseline, plugin feature detection) | official | https://capacitorjs.com/docs/v8/web | 2026-08-18 |
| [S53] | Vue.js State Management guide | official | https://vuejs.org/guide/scaling-up/state-management | 2026-08-18 |
| [S54] | Pinia home ("The intuitive store for Vue.js") | community canonical | https://pinia.vuejs.org/ | 2026-08-18 |
| [S55] | `@capacitor/dialog` API -- native dialogs (alert/confirm/prompt) | official | https://www.npmjs.com/package/@capacitor/dialog | 2026-08-18 |

Citation ledger conventions (per the `agents_manager/research/SKILL.md` rules):
- `official` = direct primary source (npm registry page, official docs site, ionic-team GitHub repo).
- `official source` = raw content inside the canonical repo (`raw.githubusercontent.com/ionic-team/capacitor/main/cli/src/declarations.ts` is the schema of record).
- `community canonical` = the maintainer-curated index or landing page for an OSS project (awesome list, package home page, npm package page for non-Capacitor deps).
- `secondary` = a source that mentions the claim but is not authoritative on the API (used only where marked; e.g. [S36] is a secondary cross-reference for the App Center sunset because no first-party CodePush-in-Capacitor doc exists by design).

All sources verified reachable on 2026-08-18 unless noted. The `/docs/guides/dependencies`, `/docs/core-concepts`, `/docs/theming`, `/docs/main/web/statusbar`, `/docs/v8/ios/viewport-fit`, and `/docs/main/web/viewport` pages returned HTTP 404 at access time (those URL slugs no longer exist on the v8 docs); the recommendations covering those areas are triangulated from the surviving docs pages + the platform (Apple HIG / Android WebView) specs + the canonical configuration schema.

---

## Anomalous content

None. All fetched content was from official Capacitor docs, official npm registry pages, the canonical `cli/src/declarations.ts` schema, or community-maintained canonical landing pages. No prompt-injection-shaped content detected in the indexed sources.

---

## Self-critique

- **Did I do my job?** yes. The 14-area native-like delivery checklist is the load-bearing content of this angle and is fully populated with citations; the LLM-facing artifacts (system prompt, self-question set, do/don't matrix) are at the file-level sizes requested (system prompt ~700 words; self-question set 20 questions across 6 phases; do/don't matrix 20 rows); the official vs community plugin landscape is captured in §1 and §3 with the 4-row anti-pattern matrix; the CI/CD matrix and the runnable config + hook examples are present and cite the canonical schema.
- **What might I have missed?**
  - A handful of `/docs/v8/...` sub-pages returned 404 at access time (`/docs/main/web/statusbar`, `/docs/v8/ios/viewport-fit`, `/docs/main/web/viewport`, `/docs/guides/dependencies`). The recommendations in those areas are triangulated from the canonical `declarations.ts` schema + the platform HIG + the v8 config reference. The planner should re-verify at plan time if the v8 docs ever restore those pages.
  - The `@capacitor/cli` 9.0.0-alpha.6 release notes were not pulled in detail (only the existence of the alpha tag was confirmed on the releases page). The dossier treats v9 as watch-only, which is the safer posture for an LLM agent build, but the v9 breaking-changes list is not in scope here.
  - The exact pricing tiers for Codemagic / Bitrise / Appcircle in 2026 were not surfaced (require sign-in for current per-minute macOS host pricing). The CI/CD recommendation is at the level of "Codmecic is the most Capacitor-friendly vendor; verify pricing at signup time" rather than a hard USD figure.
  - The `riderx/awesome-capacitor` list was located and confirmed (635 stars, last update 2026-07-29), but the per-plugin list content was not opened in detail. The dossier captures the meta-shape (Capgo maintains it, it is the canonical OSS community index) but does not enumerate every community plugin; the agent's job at build time is to consult that list with the 4-step audit gate.
  - `use-gesture/vanilla` is documented as the underlying library for `react-use-gesture`; the React adapter (`@use-gesture/react`) is the right pick for React projects. The dossier references both at once.
- **What did I assume without evidence?**
  - I assumed `ionic-team/ionic-github-actions/cap-build@v1` etc. are the right reusable-action names for Capacitor; the Capacitor-team's GitHub org hosts reusable Actions but the exact path needs plan-time verification.
  - I assumed the Capacitor 8.5.0 minimum iOS version is `15.0+` per the iOS support docs page (the docs page says "iOS 15+ is supported. Xcode 26.0+ is required"). The plan-time default should be `IPHONEOS_DEPLOYMENT_TARGET = 15.0` but the planner should re-verify against the latest Xcode template.
  - I assumed `@capgo/capacitor-updater` is the most credible OSS-ish OTA option for Capacitor (the canonical community umbrella, by Capgo the maintainer of `riderx/awesome-capacitor`). This is inferred from the relationship; an explicit search of alternative OTAs in late 2026 was not executed.
  - I assumed the GitHub Actions `macos-14` runner is current and supported. This was true at the access date but Apple-silicon/native runners may have been added under a different label.
  - I assumed UTF-8 byte scan for `E2 80 94` (em dash), `E2 80 93` (en dash), and `E2 80 98` / `E2 80 99` (smart single quotes) returns zero hits across the entire body of this file; the file was written avoiding all four code points.

---

## Metrics

- findings: 47
- risks_HIGH: 2
- risks_MEDIUM: 6
- risks_LOW: 5
- clarifying_Qs: 5

---

`NEEDS_USER_INPUT: true` (5 clarifying questions open in the `## What we don't know (ambiguities)` block; each is non-blocking -- defaults are documented in this file -- but the user may want to override before the dossier lands in `capacitor-docs-2026-08-18/`.)
