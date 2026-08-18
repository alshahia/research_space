# Do and Don't Matrix

**Audience:** Reviewer + LLM code agent. This file is one of TWO dossier files (alongside `12-self-questions-for-agents.md` from Phase 3E) where pre-existing universal phrases are allowed per the plan's explicit bound. The matrix is the agent-facing rubric for a single-PR review; the rows are the gates the reviewer applies to the diff.

**Anchor:** Capacitor v8.5.0 (verified 2026-08-18). v9.0.0-alpha.6 is watch-only (#8560). Every row's `Source` column points at the angle research file that motivated it; every `Where it lives` column points at the dossier file with the corrective action described in long-form.

**Cross-references:** back to `06-native-like-delivery-checklist.md` (the 14-area native-like checklist; rows 1-15 of the matrix below map directly), `07-best-companion-libraries.md` (UI library decision rule; row 2), `08-build-and-ship.md` (CI/CD + asset pipeline + version bump + OTA caveat; rows 3, 12, 20); forward to `10-known-issues-and-solutions.md` (the per-row workaround details; rows 1, 9, 12, 19, 20), `11-system-prompt-for-llms.md` (the LLM-facing rules cited at the bottom), `12-self-questions-for-agents.md` (the companion self-question set that surfaces these rows as phase-grouped prompts).

This chapter is the rubric. Twenty rows, six columns: `#`, `Do` (the best practice), `Don't` (the anti-pattern), `Why` (one line), `Source` (the research angle citation), `Where it lives` (the dossier file with the long-form corrective action). The rows are drawn from angle-C's § 12.2 matrix + angle-B's known conversion anti-patterns + the HIGH-risk register. The matrix is balanced across the dossier (see `## Matrix coverage by section`).

## How to read this matrix

Each row is a `[recommendation + anti-pattern + why + source]`. When the `Where it lives` column points at a sibling dossier file, that is where the corrective action is described in long-form. Pre-existing universal phrases (such as the canonical "do not use this plugin" warnings) are allowed in this file per the plan's explicit bound; the global banned-phrase rule does not apply to `09-do-and-dont.md`. Reviewers apply this matrix row-by-row against a single-PR diff; if a row's `Don't` matches the diff, the PR is rejected unless the author can justify the deviation in the PR description.

The matrix is not a substitute for reading the long-form sections. A row says "use `KeyboardResize.Native` for non-Ionic stacks"; the long-form in `06-native-like-delivery-checklist.md` Axis 5 explains WHY (`KeyboardResize.Ionic` only works with `ion-app` in the DOM) and shows the code block. Use the matrix as the index; jump to the linked file for the explanation.

## The matrix

| # | Do | Don't | Why | Source | Where it lives |
|---|---|---|---|---|---|
| 1 | Pin `@capacitor/*` to the v8 family (`~8.5.0`); verify v9 stabilization before bumping. | Pin `@capacitor/*` to `^9.0.0-alpha` for new code. | v9 is pre-release; breaking changes ship between alphas; v9.0.0-alpha.6 ships a broken iOS framework that fails App Store Connect upload (#8560). | [A-S1][A-S2][A-S20] | `02-install-and-setup.md#v7-to-v8-migration-table` |
| 2 | Use the Capacitor Community org (`capacitor-community/`) and the curated `riderx/awesome-capacitor` index for community plugins; run the 4-step audit on every install. | Install the first-hit community plugin from a search engine without verification. | First-hit plugins often have stale last-publish dates, AGPL or BSL licenses, or permission overreach (e.g. a flashlight plugin declaring `READ_CONTACTS`). | [C-S22][C-S23] | `05-plugin-system-and-lifecycle.md#community-plugins` |
| 3 | Generate `@capacitor/assets` in custom mode with the four required files (icon-only, icon-foreground, icon-background, splash, splash-dark) for Android 12+ adaptive icons. | Generate a flat 1024x1024 PNG and rely on default mode. | Default mode produces a flat icon; Android 12+ device parity fails because the launcher shape masks the foreground but the background layer is missing. | [C-S24] | `08-build-and-ship.md#pre-build-asset-pipeline` |
| 4 | Call `SplashScreen.hide()` after first meaningful paint in the SPA root. | Leave the splash visible until native `launchShowDuration` timeout (default 3 s). | App feels frozen while the JS bundle hydrates; users report "the app doesn't load"; native timeout fires before the SPA is interactive. | [C-S29] | `06-native-like-delivery-checklist.md#axis-3-splash-screen` |
| 5 | `StatusBar.setStyle({style: Style.DARK or LIGHT})` reactively on every theme change. | Set status bar style once at app launch and never re-apply. | Theme mismatch leaves a white-bar tell in dark mode (illegible light icons on light background) or a black-bar tell in light mode. | [C-S25] | `06-native-like-delivery-checklist.md#axis-2-status-bar` |
| 6 | `Keyboard.resize: KeyboardResize.Native` for non-Ionic stacks (the WebView resizes, `vh` updates, Tailwind `h-screen` works). | `Keyboard.resize: KeyboardResize.Ionic` when the project is not Ionic. | Resize is a no-op without `ion-app` in the DOM; the input is hidden under the keyboard and the user taps blind. | [C-S26] | `06-native-like-delivery-checklist.md#axis-4-keyboard-not-applicable--see-axis-5-in-axis-list` |
| 7 | `URL.revokeObjectURL(blobUrl)` after the consumer stops using the blob. | Hold a blob URL reference forever. | Memory leak; long-running app OOMs on lower-RAM devices (a 1-2 MB image blob held open for the session lifetime adds up fast). | [C-S34] | `06-native-like-delivery-checklist.md#bonus-row-15-memory-pressure` |
| 8 | Subscribe to `addListener('appStateChange' / 'pause' / 'resume', ...)` and clean up in `useEffect` return (or framework equivalent). | Subscribe and never unsubscribe. | Double handlers fire on resume; native references leak; in-memory state grows on each `pause`/`resume` cycle. | [A-S16][C-S34] | `05-plugin-system-and-lifecycle.md#lifecycle-events` |
| 9 | Animate `transform` + `opacity` only (compositor path, 60 fps). | Animate `top / left / width / height / right / bottom`. | Layout-thrash; 30 fps on mid-range Android; jank visible to users even on devices that pass the dev-time smoke. | [C-S40][C-S50] | `06-native-like-delivery-checklist.md#axis-14-performance` |
| 10 | `will-change` only on the element about to animate; remove after the animation finishes. | `will-change: transform` on a root container or globally. | Memory pressure; GPU layer keeps the original texture around; 200-500 MB GPU memory consumed on a 100-row list. | [C-S40] | `06-native-like-delivery-checklist.md#axis-14-performance` |
| 11 | Lazy-render long lists via TanStack Virtual (any list > 100 rows). | Render 1000 rows in the DOM with `.map()`. | Frame budget lost at row 200-400 on mid-range Android; 60 fps scroll collapses to ~25 fps with the unvirtualized list. | [C-S50] | `06-native-like-delivery-checklist.md#axis-14-performance` |
| 12 | `server.cleartext: true` only in dev (`NODE_ENV=development`); never in committed config. | Hard-code `server.cleartext: true` in `capacitor.config.ts` so live reload works. | Apple App Store rejection: ATS-non-compliant; the Info.plist `NSAppTransportSecurity` leaks `NSAllowsArbitraryLoads` and Apple flags the submission. | [A-S17][A-S28][C-S19][C-S38] | `08-build-and-ship.md#debugging-on-devices` |
| 13 | Add every cross-origin endpoint (auth, analytics, payments, OAuth callbacks) to `server.allowNavigation` before the route is hit. | Fetch an unlisted domain and let the WebView silently block it. | Hard-to-debug "no network" failures; the WebView returns `ERR_BLOCKED_BY_RESPONSE` with no console message visible to the JS layer. | [A-S28][C-S19] | `03-configuration-reference.md#server-block` |
| 14 | `<video autoplay muted playsinline>` for background video loops. | `<video autoplay>` without `muted` and `playsinline`. | iOS refuses to autoplay without `muted` (no audio allowed at autoplay) and `playsinline` (forces fullscreen otherwise). | [C-S40][C-S52] | `06-native-like-delivery-checklist.md#axis-13-image-lazy-loading-autoplay` |
| 15 | `loading="lazy"` on every below-fold `<img>` (and `decoding="async"` for non-blocking decode). | Heavy images with no `loading` attribute. | First-frame render budget burnt on off-screen images; cold-start time visible to the user. | [C-S40] | `06-native-like-delivery-checklist.md#axis-13-image-lazy-loading-autoplay` |
| 16 | Re-apply `@media (prefers-color-scheme: dark)` via a theme controller that listens to `matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ...)`; re-call `StatusBar.setStyle` and `SplashScreen.backgroundColor` on the change event. | Theme set once at launch; never re-render on OS change. | User pulls the device out of Do Not Disturb (toggles appearance) and the app stays in the wrong theme; status-bar icons become illegible. | [C-S25][C-S29][C-S40] | `06-native-like-delivery-checklist.md#axis-2-status-bar` |
| 17 | `<html>` (or `<body>`) carries the theme class; CSS variables in `:root` drive the design tokens. | Inline `style={{...}}` per-element for theme-aware values. | Inconsistent state; CSS-variable tokens are unusable; a third-party component can't react to the theme. | [C-S40] | `06-native-like-delivery-checklist.md#axis-2-status-bar` |
| 18 | Use the official `@capacitor/push-notifications` for FCM (Android) + APNs (iOS); register via `PushNotifications.register()`. | Roll your own push notification client on the WebView side using `fetch`. | Misses the native wake-on-push path; no badge counts; no permission priming; iOS never wakes the WebView from a JS-side `fetch` polling loop. | [C-S32] | `07-best-companion-libraries.md#realtime--push` |
| 19 | `ScreenOrientation.lock({orientation: 'portrait'})` on screen entry + `unlock()` on screen exit. | Lock portrait globally in `capacitor.config.ts` and forget to unlock. | Landscape-shareable screens (camera, video, settings that need landscape) become unusable; users report "the app is broken". | [C-S27] | `06-native-like-delivery-checklist.md#long-tail-axis-6-screen-orientation` |
| 20 | Bump `package.json` `version`, iOS `CFBundleShortVersionString` + `CFBundleVersion`, Android `versionName` + `versionCode` in lockstep per release; tag the release commit. | Bump JS version only; leave native build numbers stale. | Store rejects the upload ("CFBundleVersion must be higher than the previous uploaded build"); analytics breaks because the JS bundle version diverges from the native build number. | [A-S31][C-S38] | `08-build-and-ship.md#version-bumps-in-lockstep` |

The matrix above is the rubric. The rows map to the `Do` / `Don't` / `Why` columns; the `Source` column is the research citation; the `Where it lives` column is the dossier file pointer. Reviewers should walk every row against the diff; the engineer should self-check before requesting review. Note that some rows reference angle-B conversion findings (e.g. the `server.cleartext` / `server.androidScheme` interactions with Chrome WebView 117+) at [B-S10]; the `[A-S#]` / `[B-S#]` / `[C-S#]` markers are cross-angle citations resolved in the angle research files at `share/notes/01_research_T-2026-08-18-002_angle-{core,conversion,ecosystem}.md`.

## Matrix coverage by section

The 14 dossier files mapped to the rows that most affect them. Confirms the matrix is balanced across the dossier (no row cluster is missing from the file).

| Dossier file | Rows most affecting this file | Notes |
|---|---|---|
| `00_README.md` | none (the index; no engineering rows) | The README carries the freshness footer and reading-path links; the matrix rows are the gate for the body files. |
| `01-what-is-capacitor.md` | none | The framing file; no do/don't content of its own. |
| `02-install-and-setup.md` | 1, 6 | The v8 anchor (row 1) and the install flow (row 6 lives in `06`, but the install recipe in `02` references it). |
| `03-configuration-reference.md` | 13 | The `server.allowNavigation` field is the row's corrective action. |
| `04-conversion-guide.md` | 9 (web preview on Capacitor WebView), 12 (white-screen root cause is often a cleartext misconfig) | Conversion pitfalls surface as matrix rows. |
| `05-plugin-system-and-lifecycle.md` | 2, 8 | Community-plugin audit (row 2) and lifecycle cleanup (row 8). |
| `06-native-like-delivery-checklist.md` | 4, 5, 7, 9, 10, 11, 14, 15, 16, 17, 19 | The largest consumer of matrix rows; 11 of 20 rows map here. |
| `07-best-companion-libraries.md` | 2, 18 | Community plugin (row 2) and push notifications (row 18). |
| `08-build-and-ship.md` | 1, 3, 12, 20 | v8 anchor (row 1), asset pipeline (row 3), live-reload `cleartext` (row 12), version bump (row 20). |
| `09-do-and-dont.md` | this file | The matrix itself; no other file. |
| `10-known-issues-and-solutions.md` | 1, 9, 12, 19, 20 | The HIGH-risk register that backs these rows. |
| `11-system-prompt-for-llms.md` | all 20 | The LLM prompt cites every row in the constraint section. |
| `12-self-questions-for-agents.md` | all 20 | The self-question set surfaces the rows as phase-grouped prompts. |
| `13-sources-and-references.md` | none | The citation ledger mirror. |

The 11-of-20 mapping into `06-native-like-delivery-checklist.md` is intentional: the six-axis priority list + the 14-area long-tail checklist is the largest engineering content surface, and most anti-patterns map to a specific checklist row. The 3 rows in `08-build-and-ship.md` are the build/ship-specific gates (asset generation, live-reload cleartext, version bump). The 5 rows in `10-known-issues-and-solutions.md` are the issue-backed rows that have a GitHub issue number or canonical doc anchor.

## Anti-patterns from real Capacitor issues

Five well-known anti-patterns with the GitHub issue number (where applicable) and the corrective action. Drawn from the HIGH-risk register (angle A) + the HIGH-risk register (angle B) + the LLM-facing prompt's anti-pattern block.

### Anti-pattern 1 -- Pinning `@capacitor/*` to v9-alpha (#8560)

The 9.0.0-alpha.6 release of `@capacitor/core` ships a broken `Cordova.xcframework` that embeds a nested `Capacitor.framework`. The nested framework triggers a `CFBundleIdentifier Collision` on App Store Connect upload -- `altool` validation rejects the binary with "Multiple commands produce .../Capacitor.framework". The fix has been merged in PR #8560 but is not yet tagged [A-S20].

**Corrective action:** pin `@capacitor/*` to `~8.5.0` for any production work; do not pin `@capacitor/core@next` until v9 stabilizes. See row 1 in the matrix above and `10-known-issues-and-solutions.md` H1.

### Anti-pattern 2 -- `@capacitor/cli@<8` with `tar@^7.5.19` (#8573)

The Capacitor CLI 6.x and 7.x call `tar.extract` in `extractTemplate()`; tar v7 (the post-CVE-2026-23745 patch) returns `undefined` for `extract` because the API shape changed between tar v6 and tar v7. `npm audit fix` may force `tar` to `^7.5.19` via `npm overrides`, and `npx cap add android` then throws `TypeError: Cannot read properties of undefined (reading 'extract')` [A-S21].

**Corrective action:** upgrade to `@capacitor/cli@^8` (which uses the tar v7-safe API); or pin `tar` to `^6` via `npm overrides` until you can upgrade. See `10-known-issues-and-solutions.md` H2.

### Anti-pattern 3 -- `server.cleartext: true` in committed config (App Store rejection)

The single most common App Store rejection for Capacitor apps. The CLI does not validate `server.cleartext` at build time; the flag is silently translated to `NSAppTransportSecurity.NSAllowsArbitraryLoads: true` in `ios/App/Info.plist`. Apple App Store review flags any app with `NSAllowsArbitraryLoads: true` that does not have a documented exception (e.g. a domain-specific load exception) [A-S17][C-S19].

**Corrective action:** gate `server.cleartext` on `process.env.NODE_ENV === 'development'` so production builds never carry the flag. Use `cap run --live-reload` for dev-only live reload. See row 12 in the matrix above.

### Anti-pattern 4 -- `Keyboard.resize: KeyboardResize.Ionic` on a non-Ionic project

`@capacitor/keyboard`'s `KeyboardResize.Ionic` mode resizes only the `ion-app` DOM element (the root of an Ionic Framework app). If the project is React + Tailwind + no Ionic, the resize is a no-op and the keyboard covers the focused input. The agent reaches for `KeyboardResize.Ionic` because the docs' "recommended" path mentions it first [C-S26].

**Corrective action:** for non-Ionic stacks, set `Keyboard.resize: KeyboardResize.Native` (resizes the entire WebView, `vh` updates, Tailwind `h-screen` works). For Ionic stacks, keep `KeyboardResize.Ionic` AND verify `ion-app` is in the DOM. See row 6 in the matrix above.

### Anti-pattern 5 -- CodePush for OTA on Capacitor (no first-party story)

An LLM agent trained on React Native guidance will reflexively suggest CodePush for OTA updates. CodePush is RN-only; the App Center service that hosted the CodePush server was sunset on 2025-09-30. The "use CodePush" suggestion is wrong for Capacitor [C-S36][C-S37].

**Corrective action:** Capacitor has no first-party OTA story. The credible commercial third-party is `@capgo/capacitor-updater` (Capgo, with a SaaS plan and a self-hosted option); the marketing-page OTA path is `vite-plugin-pwa` + service worker (not a JS-bundle OTA, but a PWA-style cache invalidation). For most apps, ship-then-store-review is the safe default. See `08-build-and-ship.md#ota-caveat` and `11-system-prompt-for-llms.md` rule 2.

The five anti-patterns above are the most common reviewer-rejection causes for a Capacitor PR. Walk each row against the diff before requesting review.

## Cross-file pointers

- **back to `06-native-like-delivery-checklist.md`** -- the 14-area native-like checklist; rows 4, 5, 7, 9, 10, 11, 14, 15, 16, 17, 19 of this matrix are the anti-pattern keys to the checklist rows.
- **back to `07-best-companion-libraries.md`** -- the UI library decision rule; row 2 of this matrix (community-plugin audit) and row 18 (push notifications) reference the companion-libraries verdict.
- **back to `08-build-and-ship.md`** -- the CI/CD matrix + asset pipeline + version bump + OTA caveat; rows 1, 3, 12, 20 of this matrix.
- **forward to `10-known-issues-and-solutions.md`** -- the HIGH-risk register + per-issue workarounds; rows 1, 9, 12, 19, 20 each have a numbered workaround in the per-issue section.
- **forward to `11-system-prompt-for-llms.md`** -- the LLM-facing rules cited at the bottom of the prompt; rules 2, 6, 11 cite this matrix row-by-row.
- **forward to `12-self-questions-for-agents.md`** -- the companion self-question set; question 1 = row 1, question 3 = row 3, etc.; the questions surface the matrix rows as phase-grouped prompts the agent must answer before moving past a phase.

## Freshness

<!-- freshness: capacitor=8.5.0 access=2026-08-18 -->

- last_verified: 2026-08-18
- source_schema_versions: @capacitor/core@8.5.0, @capacitor/cli@~8.0.0, @capacitor/app@^8.0.0
- anchor_url: https://capacitorjs.com/docs
- v9_watch_only_issue: https://github.com/ionic-team/capacitor/issues/8560
- app_center_sunset: 2025-09-30

## References

- [A-S1] -- https://registry.npmjs.org/@capacitor/core -- accessed 2026-08-18 (npm dist-tags: 8.5.0 latest, 9.0.0-alpha.6 next, 7.6.8 latest-7, 6.2.1 latest-6)
- [A-S2] -- https://github.com/ionic-team/capacitor -- accessed 2026-08-18 (Capacitor repo root; 16,336 stars; last release 8.5.0 2026-07-31; pushed within last 24h)
- [A-S16] -- https://capacitorjs.com/docs/apis/app -- accessed 2026-08-18 (`@capacitor/app` lifecycle events: appStateChange / pause / resume / appUrlOpen / appRestoredResult / backButton; cleanup responsibility)
- [A-S17] -- https://capacitorjs.com/docs/guides/live-reload -- accessed 2026-08-18 (live reload; server.url + server.cleartext; the most common App Store rejection if cleartext leaks to production)
- [A-S20] -- https://github.com/ionic-team/capacitor/issues/8560 -- accessed 2026-08-18 (9.0.0-alpha.6 broken iOS framework; the do-not-pin-v9-alpha evidence)
- [A-S21] -- https://github.com/ionic-team/capacitor/issues/8573 -- accessed 2026-08-18 (CLI 6.x/7.x broken by tar@^7.5.19; extractTemplate() call site)
- [A-S28] -- https://capacitorjs.com/docs/v8/config -- accessed 2026-08-18 (CapacitorConfig schema; server.allowNavigation field is the row 13 corrective action)
- [A-S31] -- https://capacitorjs.com/docs/ios/configuration -- accessed 2026-08-18 (Info.plist edits; the CFBundleVersion / versionCode rejection source for row 20)
- [B-S10] -- https://ionic.io/blog/capacitor-android-customscheme-issue-with-chrome-117 -- accessed 2026-08-18 (Ionic blog post: Capacitor Android CustomScheme issue with Chrome 117; the `androidScheme` setting broken by Chrome Webview 117 behavior change; cross-reference for row 12 / row 13 / WA-H6 context)
- [C-S19] -- https://raw.githubusercontent.com/ionic-team/capacitor/main/cli/src/declarations.ts -- accessed 2026-08-18 (canonical Capacitor configuration schema; server.cleartext default false; the source-of-truth for row 12)
- [C-S22] -- https://capacitorjs.com/docs/v8/basics/using-plugins -- accessed 2026-08-18 (Capacitor Community org pointer; community-plugin anti-pattern rationale)
- [C-S23] -- https://github.com/riderx/awesome-capacitor -- accessed 2026-08-18 (curated community plugin index by Capgo; the canonical OSS-community reference; the 4-step audit source)
- [C-S24] -- https://www.npmjs.com/package/@capacitor/assets -- accessed 2026-08-18 (icon + splash generator 3.0.5; custom mode requires four files for Android 12+ adaptive icons)
- [C-S25] -- https://www.npmjs.com/package/@capacitor/status-bar -- accessed 2026-08-18 (`Style` enum: DARK / LIGHT / DEFAULT; setStyle / setBackgroundColor / setOverlaysWebView / getInfo; the row 5 / row 16 source)
- [C-S26] -- https://www.npmjs.com/package/@capacitor/keyboard -- accessed 2026-08-18 (`KeyboardResize` enum: Body / Ionic / Native / None; the row 6 source)
- [C-S27] -- https://www.npmjs.com/package/@capacitor/screen-orientation -- accessed 2026-08-18 (8 orientation keys; lock + unlock; the row 19 source)
- [C-S29] -- https://www.npmjs.com/package/@capacitor/splash-screen -- accessed 2026-08-18 (SplashScreen config: launchShowDuration default 3000 ms; launchAutoHide; the row 4 source)
- [C-S32] -- https://www.npmjs.com/package/@capacitor/push-notifications -- accessed 2026-08-18 (FCM on Android, APNs on iOS; the row 18 source)
- [C-S34] -- https://www.npmjs.com/package/@capacitor/app -- accessed 2026-08-18 (App API: lifecycle events; exitApp / getInfo / getState; the row 7 / row 8 source)
- [C-S36] -- https://capacitorjs.com/docs/v8/basics/using-plugins -- accessed 2026-08-18 (Capacitor docs note "no OTA story for Capacitor"; the anti-pattern 5 source)
- [C-S37] -- https://capgo.io -- accessed 2026-08-18 (Capgo home page; `@capgo/capacitor-updater`; commercial SaaS + self-hosted option; the row 12 cross-reference)
- [C-S38] -- https://capacitorjs.com/docs/cli/commands/run -- accessed 2026-08-18 (CI/CD guidance; the row 12 / row 20 cross-reference)
- [C-S40] -- https://capacitorjs.com/docs/web -- accessed 2026-08-18 (Capacitor web platform docs; viewport-fit + safe-area; touch-action: manipulation; the row 9 / row 10 / row 14 / row 15 / row 16 / row 17 source)
- [C-S50] -- https://tanstack.com/virtual/latest -- accessed 2026-08-18 (TanStack Virtual docs; default list virtualization for any list > 100 rows; the row 11 source)
- [C-S52] -- https://capacitorjs.com/docs/v8/web -- accessed 2026-08-18 (Capacitor v8 web platform page; `<video autoplay muted playsinline>` requirement for iOS background loops; the row 14 source)