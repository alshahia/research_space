# Best Companion Libraries

**Audience:** Engineer picking companion libraries for a Capacitor app.
**Anchor:** Capacitor v8.5.0 (verified 2026-08-18). Decisions below cite the live npm versions, the GitHub repos, and the official Capacitor plugin docs where the layer intersects the native bridge.
**Cross-references:** back to `05-plugin-system-and-lifecycle.md` (the WebView's plugin model); forward to `08-build-and-ship.md` (CI plugin pinning), `10-known-issues-and-solutions.md` (deprecated plugin references).

This chapter is the layer-cake reference for everything that surrounds the Capacitor runtime: the UI / design system layer, the state container, the router, the forms layer, the storage layer, the HTTP client, the realtime layer, the auth flow, the animation / gesture layer, the icon set, the font choice, and the build / CI choices. The verdict per library is a one-to-three paragraph block: when to use it, when NOT to use it, and the Capacitor fit one-liner.

The decision rule at the top of every section is: **pick the library your team already knows.** Every library below is battle-tested; the cost of an unfamiliar library usually exceeds the benefit of the marginal feature. The exception is the UI library (no neutral default) and the storage layer (where Capacitor's own plugins cover most cases).

## Decision matrix at a glance

A condensed reference for a single-PR review. The `Pick` column is the default for a greenfield project; `Override` lists when the team should pick something else.

| Layer | Pick (default) | Override when |
|---|---|---|
| UI / design system | The framework's native primitive (Radix, Headless UI, framework-native) | Auth + push + camera parity matters -> Ionic; Tailwind-first + mobile UI -> Konsta UI; marketing-only -> vanilla Tailwind |
| State | The framework's primitive (Svelte stores, Pinia for Vue, useState / useReducer for React) | Cross-framework shared store -> Zustand; existing Redux -> Redux Toolkit |
| Router | The framework's router in history mode | File-based type-safe routing on React -> TanStack Router |
| Forms | The framework's forms library (react-hook-form, FormKit, TanStack Form) | Schema-only -> zod / valibot |
| Storage < 100 KB | `@capacitor/preferences` 8.0.1 | n/a (always) |
| Storage < 50 MB files | `@capacitor/filesystem` 8.1.2 | n/a (always) |
| Storage > 5 MB indexed | Dexie.js | Sync / replication -> RxDB; relational -> SQLite |
| HTTP | Native `fetch` | Team already uses axios / ky / ofetch -> use that |
| Realtime | Native WebSocket | Wake-the-app -> `@capacitor/push-notifications` 8.1.2; in-app scheduled -> `@capacitor/local-notifications` 8.3.0 |
| Auth (consumer) | Native form + `@capacitor/preferences` + biometrics | n/a |
| Auth (B2B / OAuth) | `@capacitor/browser` + custom-scheme redirect | Biometric + refresh -> `@capawesome/capacitor-authenticator` |
| Animation (in-app) | `Framer Motion` (React) / `motion-one` (any) | n/a |
| Animation (marketing) | GSAP + plugins | n/a |
| Gestures | `@use-gesture/react` (React) / `@use-gesture/vanilla` (any) | n/a |
| Haptics | `@capacitor/haptics` 8.0.2 | n/a (always) |
| Icon set | Pairs with UI kit (Ionic -> Ionicons, Tailwind -> Lucide, design-system -> Phosphor) | Material-themed -> Material Symbols |
| Font | System font stack | Brand font -> bundle via `Fontsource` + `font-display: swap` |
| Virtualization | `TanStack Virtual` | n/a (any list > 100 rows) |
| CI / CD | GitHub Actions + fastlane | Solo + Capacitor-friendly -> Codemagic |

The matrix above is the summary; the per-section verdicts below give the long-form reasoning and the when-NOT-to-use gates.

## UI library decision

The UI library is the only choice where there is no neutral default; pick deliberately.

| Stack | When to use | When NOT to use | Capacitor fit |
|---|---|---|---|
| **Ionic Framework** (`@ionic/react`, `@ionic/vue`, `@ionic/angular`) | The team is comfortable with the framework Ionic pairs with; the app is multi-platform from day one; you have accepted the visual signature (rounded, iOS-default / Material-default tokens); you want native-feel shortcuts (modals, sheets, segments, virtual scroll, ion-router). | You need a totally custom design system that fights the icon's tokens; you have a hard bundle-size budget that excludes the Ionic CSS reset; you want zero coupling to a company that has already rebranded once (Ionic by OutSystems since 2023). | The default for full-featured apps; community-supported for Capacitor (Ionic by Ionic Team; Capacitor by Ionic Team; sister projects, same maintainers). [C-S15] |
| **Konsta UI + Tailwind** (`konstaui/konsta`) | The project is Tailwind-first and wants a mobile UI kit (iOS + Material design flavors) with no Angular / Vue / React framework lock-in; ships React / Vue / Svelte flavors. | You need components outside the mobile kit (data tables, complex form layouts); you are not already on Tailwind. | The lightweight shell option for Tailwind-first projects; ~4-5k stars on GitHub, active, MIT. [C-S43] |
| **Vanilla Tailwind v4** (no UI kit) | The app is marketing-only or content-only (no complex mobile UI patterns); the design system is fully custom; bundle size is the binding constraint. | The app needs iOS- or Material-default behaviors (sheet modals, swipe-to-go-back, segmented controls, action sheets) without writing them by hand. | The styling default; pair with UnoCSS if the on-demand engine produces smaller CSS than Tailwind for the same bundle. [C-S44][C-S45] |
| **NativeCSS** | A brand name for Tailwind-in-Capacitor-bundles; adds no new feature beyond Tailwind itself. | Always (use plain Tailwind; NativeCSS is a thin brand). | A no-op in terms of features. |
| **Framework-native kits** (Radix UI, Tamagui, Headless UI) | The team already uses them in a web app; the components do NOT need a Capacitor shim. | The kit depends on cookie-based CSRF or assumes the `window` is a desktop browser. | First-class in a Capacitor WebView. |

**Decision rule.** Pick Ionic when auth + push + camera + Capacitor-native parity matters and the team already knows one of the paired frameworks (React, Vue, or Angular). Pick Konsta UI + Tailwind when the project is Tailwind-first and wants mobile polish without Ionic's tokens. Pick vanilla Tailwind + framework-native components when the design system is fully custom or the app is marketing-only. Pick framework-native kits (Radix, Tamagui, Headless UI) when the team already uses them and they do not require Capacitor-specific shims [C-S14][C-S15][C-S43][C-S44].

## State management

The framework's own state primitive is the default. Add a third-party store only when the cross-cutting shared state needs more than the primitive can offer.

- **Zustand** -- 3 kb, MIT, framework-agnostic via a small subscription adapter. **Verdict:** USE when the team is React-first and needs a single cross-framework shared store (Zustand works in any framework via a tiny subscription shim). DO NOT use if the team is already on Redux conventions; the migration cost is real.
- **Redux Toolkit** -- mature, DevTools, RTK Query for HTTP. **Verdict:** USE when the team is already on Redux conventions (existing project, large team with Redux muscle memory). DO NOT use on a greenfield React project; Zustand or Jotai is smaller.
- **Pinia** -- the official Vue.js store, MIT, active. **Verdict:** USE on every Vue / Vue + Vite / Nuxt project. DO NOT use outside Vue (Pinia is Vue-specific).
- **Svelte stores + `$state` rune (Svelte 5)** -- the official Svelte state primitive. **Verdict:** USE on every Svelte / SvelteKit project. No third-party store needed.
- **MobX** -- observable-based, MIT. **Verdict:** USE only when the team already uses it; the paradigm is orthogonal to React's render cycle and the learning curve is real.

**Decision rule.** Pick the framework's own state primitive; add Zustand for cross-framework shared stores. Do not introduce a state library the team has not used before.

## Router / navigation

Every router in history mode works in a Capacitor WebView. The configuration gate is `server.allowNavigation` in `capacitor.config.ts`: any external domain the SPA fetches at runtime (auth, analytics, payments, deep links) must be added to the allowlist or the WebView silently blocks the navigation.

- **TanStack Router** -- file-based, type-safe, MIT. **Verdict:** USE on greenfield React projects that want type-safe routing + loaders. Configure `server.allowNavigation` for any cross-origin fetch the loaders touch.
- **React Router v7** -- history mode (NOT hash mode; hash mode breaks in a Capacitor WebView). **Verdict:** USE when the team already uses React Router. The history-mode + Capacitor combination is the documented path.
- **Vue Router 4** -- history mode, official Vue.js router. **Verdict:** USE on every Vue / Vue + Vite / Nuxt project. Same `server.allowNavigation` rule.
- **SvelteKit's `$app/navigation`** -- the official Svelte / SvelteKit router. **Verdict:** USE on every Svelte / SvelteKit project. The static adapter is the Capacitor-friendly mode.
- **Angular Router** -- official Angular router. **Verdict:** USE on every Angular project.

**Capacitor fit note:** history mode needs `server.allowNavigation` for every cross-origin fetch the SPA may hit at runtime. Capacitor's default allowlist is the `webDir`; a missing entry looks like a network failure with no error message.

## Forms

Forms libraries that depend on cookie-based CSRF (most SSR-flavored form kits) do not work in a Capacitor WebView; same-origin `fetch` does not send the cookie unless `server.allowNavigation` is configured for the cross-origin endpoint. Pick a client-side-first forms library.

- **TanStack Form** -- framework-agnostic, type-safe, MIT. **Verdict:** USE on greenfield React / Vue / Solid / Svelte projects that want a single forms library across the stack.
- **react-hook-form + zod** (or valibot) -- React-specific, MIT, well-established. **Verdict:** USE when the team already uses React Hook Form; the zod (or valibot) schema layer is a separate decision and is the same regardless of the forms library.
- **FormKit** (Vue) -- Vue-native, MIT. **Verdict:** USE on Vue / Vue + Vite / Nuxt projects.
- **VeeValidate** (Vue) -- the original Vue forms library, MIT. **Verdict:** USE when the team already uses VeeValidate; FormKit is the newer default.

**Skip** forms libraries that depend on cookie-based CSRF (any SSR / server-action forms kit). Use a client-side schema (`zod`, `valibot`) and call your own API.

## Storage

The Capacitor native bridge covers most storage needs via official plugins. Add a third-party client-side store only when the data is too large for `Preferences` and the shape needs queries.

| Data size / shape | Pick | Why |
|---|---|---|
| < 100 KB key-value | `@capacitor/preferences` 8.0.1 | `UserDefaults` iOS / `SharedPreferences` Android / `localStorage` web. Practical limit ~5-10 MB total across keys; 50-100 KB per key. [C-S30] |
| Files (any size) | `@capacitor/filesystem` 8.1.2 | Named directories `Documents`, `Data`, `Library`, `Cache`, `External`, `ExternalStorage`. Methods `readFile` / `writeFile` / `appendFile` / `deleteFile` / `mkdir` / `rmdir` / `readdir` / `getUri` / `stat` / `copy` / `rename` / `downloadFile`. [C-S31] |
| Indexed, > 5 MB client-side | Dexie.js 5.x | IndexedDB wrapper, Apache-2.0, active. Default for > 5 MB client-side data. [C-S46] |
| Local-first sync / replication | RxDB 17.x | Apache-2.0 + commercial paths, 22k+ stars, active. Use only when the project genuinely needs server sync; do NOT use when the project is "just store some data locally". [C-S47] |
| SQLite (relational) | `@capacitor-community/sqlite` (community plugin) or `better-sqlite3` polyfill (web only) | The official `@capacitor/*` does not ship a SQLite plugin; the community `@capacitor-community/sqlite` is the credible cross-platform option. Use only when the data is relational AND > 50 MB. |
| WatermelonDB | WatermelonDB | React-native-origin, but works in a WebView via the JS-only adapter. Use for offline-first reactive databases with sync. |

**Decision rule.** `< 100 KB` -> `@capacitor/preferences`. `< 50 MB` -> `@capacitor/filesystem`. `>= 50 MB` relational -> SQLite (community plugin). `>= 5 MB` Indexed -> Dexie. Sync / replication -> RxDB or WatermelonDB.

**Skip** `@capacitor/storage` -- it is the deprecated 1.2.5 legacy KV store; new v8 code uses `@capacitor/preferences` [C-S30][A-S15].

**SQLite detail.** The `@capacitor-community/sqlite` plugin is a community-maintained wrapper around native SQLite (iOS: `FMDB` / `SQLite.swift`; Android: `androidx.sqlite`). The plugin exposes a `Database` class with `open`, `close`, `execute`, `executeSet`, `run`, `query`, `transaction`. It supports encryption via `importDatabaseFromJson` and `setEncryptionSecret` (SQLCipher integration). The web fallback uses `better-sqlite3` polyfilled into a WASM build. The plugin is the right call when the data shape is relational AND the size is > 50 MB (Dexie can store 50 MB but the query ergonomics are weaker than SQL). For smaller relational data, `@capacitor/preferences` is still the answer.

## HTTP / fetch

The Capacitor WebView does not impose CORS on same-origin requests (the WebView maps `https://localhost` to your `webDir`); treat the WebView as same-origin to your server. Cross-origin requests need `server.allowNavigation` configured for that origin [C-S19].

- **Native `fetch`** -- sufficient in a WebView; no CORS for same-origin. **Verdict:** USE when the team does not already use a third-party HTTP client.
- **axios** -- MIT, mature, interceptors, request cancellation. **Verdict:** USE when the team already uses axios; the migration cost is real.
- **ky** -- MIT, modern, smaller than axios, hooks via `beforeRequest` / `afterResponse`. **Verdict:** USE on greenfield projects that want a modern HTTP client.
- **ofetch** -- MIT, from the Nuxt team. **Verdict:** USE on Nuxt / Vue projects that want a Nuxt-aligned client.
- **Native `@capacitor/http`** -- when the team needs native HTTP semantics (cookie handling, cert pinning, no CORS). **Verdict:** USE only when native HTTP is a requirement; the WebView's `fetch` covers most cases.

**Note:** CORS does NOT apply inside the WebView for the bundle-as-origin. Treat the `webDir`'s server as same-origin.

## Realtime / push

- **Native WebSocket** -- works in the WebView, no CORS on same-origin. **Verdict:** USE for client-to-server realtime (chat, live data, multiplayer state).
- **Server-Sent Events (SSE)** -- works via `fetch(...)` streaming in modern WebViews. **Verdict:** USE for one-way server-to-client streams.
- **`@capacitor/push-notifications` 8.1.2** -- FCM on Android, APNs on iOS. The token shape is `{value: string}` where `value` is the FCM token on Android and the APNs token on iOS. **Verdict:** USE for wake-the-app push (the native wake path that the WebView cannot do); the `unregister()` method removes the FCM token on Android and unregisters APNs on iOS. [C-S32]
- **`@capacitor/local-notifications` 8.3.0** -- schedule and show notifications while the app is foreground / backgrounded. **Verdict:** USE for in-app scheduled notifications (reminders, marketing banners, deferred tasks). [C-S32]
- **EventSource polyfill** -- for older WebView builds without native SSE. **Verdict:** USE only when the minimum WebView version is too old.

**CodePush is NOT the answer for Capacitor.** CodePush is React-Native-only and the App Center service was sunset 2025-09-30. The credible OSS-ish OTA option is `@capgo/capacitor-updater` (commercial SaaS + self-hosted); see `08-build-and-ship.md` for the OTA caveat.

## Auth

Two patterns. The choice depends on the app shape (auto-answers Q5).

- **Lightweight apps (consumer, marketing-first):** in-app native form + `@capacitor/preferences` 8.0.1 for the session token. `@capacitor-community/biometric-auth` (community) or `navigator.credentials.get({ publicKey: ... })` for biometrics. **Verdict:** USE for greenfield consumer apps where OAuth is overkill.
- **OAuth-heavy apps (B2B, third-party integration):** `@capacitor/browser` 8.0.4 (SFSafariViewController on iOS, Chrome Custom Tab on Android) opens the OAuth provider; the redirect back to a custom URL scheme carries the state token; server-side validation exchanges for the session. **Verdict:** USE for any app with a real auth provider (Google, GitHub, Auth0, Clerk, Supabase Auth). The custom-scheme redirect must be registered in iOS `CFBundleURLTypes` and Android `<intent-filter>` (see `05-plugin-system-and-lifecycle.md`).
- **`@capawesome/capacitor-authenticator`** (community plugin) -- wraps biometric + token + refresh in one call. **Verdict:** USE when the app needs biometric + refresh-token rotation out of the box.
- **Roll-your-own on `@capacitor/preferences` + `@capacitor/browser`** -- the lighter path when the auth flow is simple and biometrics are not required. **Verdict:** USE for prototypes and small consumer apps; the OAuth-via-web pattern with custom-scheme redirect is documented in `04-conversion-guide.md` Pitfall 11.

**Refresh-token storage note.** `@capacitor/preferences` is the wrong place to store refresh tokens -- `UserDefaults` / `SharedPreferences` are not encrypted at rest beyond the OS-level data-protection class. Use a Keychain / Keystore-aware plugin (`@capacitor-community/secure-storage-plugin` by `mrtnzlml`, or platform-native `Keychain` / `EncryptedSharedPreferences` via a thin custom plugin) for any token that survives an app session. The session token itself can stay in `@capacitor/preferences`; only the long-lived secret needs Keychain.

**Biometrics detail.** `navigator.credentials.get({ publicKey: ... })` is the WebAuthn API and works in the Capacitor WebView on iOS 14+ and Android 9+. For a simpler UX, `@capacitor-community/biometric-auth` (community plugin) exposes `BiometricAuth.check()` and `BiometricAuth.authenticate()` with a native prompt. The community plugin is the lower-friction default; WebAuthn is the spec-compliant option for app-passwordless flows.

## Animation / gestures

The composite-only path is the only path that hits 60 fps on mid-range Android. Every animation library below is correct; the wrong choice is animating `top` / `left` / `width` / `height`.

- **Framer Motion (React)** -- declarative React animations, MIT. **Verdict:** USE on React projects that want declarative entrance / exit animations. Pair with `@use-gesture/react` for swipe-back.
- **motion-one** -- 4 kb, framework-agnostic, MIT. **Verdict:** USE on Vue / Svelte / vanilla projects that want a tiny animation library.
- **GSAP** -- mature, MIT-licensed for the core, plugins are paid. **Verdict:** USE on marketing landing pages that want rich timeline-based animations; not the right tool for in-app list transitions.
- **`@use-gesture/react`** -- swipe / drag / pinch, MIT, paired with `history.back()` for iOS-feel swipe-back. **Verdict:** USE on every Capacitor app that wants native-feel gestures.
- **`@use-gesture/vanilla`** -- framework-agnostic version of the above. **Verdict:** USE on non-React projects.

**Does NOT replace Haptics.** Haptics is a separate `@capacitor/haptics` plugin call; gesture libraries animate the view, haptics fire the tactile feedback. Pair them: `@use-gesture/react` detects the swipe, `@capacitor/haptics` fires `ImpactStyle.Light` on tap-release.

**Animation library shape.** `Framer Motion` and `motion-one` both export the `motion` component / primitive and the `animate(...)` imperative API; `Framer Motion` is the React-only declarative default, `motion-one` is the framework-agnostic lower-level API. GSAP is the right call for marketing-landing timeline work (intro animations, scroll-driven hero reveals) but not for in-app transitions; GSAP plugins (`ScrollTrigger`, `SplitText`) are paid for commercial use. Pick `motion-one` when bundle size matters; pick `Framer Motion` when the team is React and the declarative API saves time.

## Icon set

Pick the icon set that pairs with your UI kit. All of the libraries below work in the WebView.

- **Ionicons v7** -- sister project to Ionic, MIT, 1000+ icons, web font + SVG sprites. **Verdict:** USE when the project is also using Ionic Framework. [C-S15]
- **Lucide** -- 5k+ icons, ISC, tree-shakeable per-component. **Verdict:** USE on Tailwind-first projects that are not Ionic. The default for non-Ionic stacks. [C-S48]
- **Phosphor** -- six style weights, large library, MIT. **Verdict:** USE when the design system wants 2D-style flexibility. [C-S49]
- **Material Symbols** -- Google's icon set, Apache-2.0. **Verdict:** USE on Android-first Material-themed apps.

**All four work in the WebView.** The choice is a design-system fit, not a Capacitor fit.

## Font loading

- **System font stack** -- `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`. **Verdict:** USE as the default; no FOIT, no extra bundle weight, every device picks the platform-native font.
- **`font-display: swap`** on a custom font -- avoids FOIT. **Verdict:** USE when a brand font is required; bundle via `Fontsource` (npm-installable per style and weight).
- **Google Fonts / Adobe Fonts CDN at runtime** -- the wrong call: the WebView pays a network round-trip on first launch. **Verdict:** DO NOT use external font CDN at runtime.

## Virtualization

- **TanStack Virtual** -- 10-15 kb, framework-agnostic React / Solid / Vue / Svelte, MIT. **Verdict:** USE for any list > 100 rows. The default for in-app lists. [C-S50]
- **React Window** -- older, React-specific, MIT. **Verdict:** USE when the project is React-only and the team already knows it; TanStack Virtual is the modern successor.
- **Hand-rolled IntersectionObserver virtualizer** -- possible but rarely worth it. **Verdict:** DO NOT roll your own unless TanStack Virtual measurably falls short on a specific list shape.

## CI / CD

- **GitHub Actions + fastlane** -- the universal path. MIT / Apache-2.0. The Capacitor docs reference the `ionic-team` reusable workflows; substitute the team-specific path once verified. **Verdict:** USE when the team is on GitHub and wants full control. [C-S38][C-S42]
- **Codemagic** -- the most Capacitor-friendly hosted CI. Hobby tier is free for solo builders. **Verdict:** USE for solo Capacitor projects; the pre-built Capacitor workflows reduce first-week setup. [C-S38]
- **Bitrise** -- enterprise alternative; paid per concurrency. **Verdict:** USE when the team already has Bitrise.
- **Appcircle** -- enterprise alternative; paid per concurrency. **Verdict:** USE when the team already has Appcircle.
- **fastlane** -- the iOS sign + upload layer that goes inside any of the above. **Verdict:** USE for any iOS build that needs `match` + `pilot` (or `deliver`).

**OTA caveat (recap from `08-build-and-ship.md`):** CodePush is RN-only and the App Center service was sunset 2025-09-30. There is no first-party Capacitor JS-bundle OTA story. `@capgo/capacitor-updater` is the credible commercial option with a self-hosted variant. Marketing-page live updates belong on `vite-plugin-pwa` + a service worker -- that is a PWA update, not an OTA, and does not replace the bundled JS in the WebView.

## Cross-file pointers

- `05-plugin-system-and-lifecycle.md` -- the WebView's plugin model (39 official plugins, the Cordova compat shim, the lifecycle events) is the layer that consumes the companion libraries' output.
- `08-build-and-ship.md` -- CI plugin pinning, the OTA caveat, version bump discipline.
- `09-do-and-dont.md` -- anti-patterns for companion library choices (e.g. don't reach for Ionic by default, don't add a state library the team doesn't know, don't use CodePush for OTA).
- `10-known-issues-and-solutions.md` -- the deprecated plugin references (`@capacitor/storage` 1.2.5, `@capacitor/vibration` legacy alias).

## Common traps when picking companion libraries

These come up in PR review. The wrong choice is usually a reflex from a different framework or a web-only project; the right choice is the Capacitor-aware variant.

1. **Reaching for Ionic by default.** The Capacitor docs default path on `/docs/getting-started/with-ionic` is the *with-Ionic* variant of the project layout. An LLM agent that learns Capacitor from those docs will reach for Ionic as the UI layer even when a no-Ionic stack is the right call. The fix: pick the UI library from the user's brief, not from the docs index page [C-S14][C-S15].
2. **Adding a state library the team does not know.** Zustand is great; introducing it on a team that has shipped Redux for five years is a five-week migration. The fix: pick the state library the team already uses.
3. **Using `@capacitor/storage` on new v8 code.** It still works on v8 (the package is still published at 1.2.5) but it is deprecated. The fix: `@capacitor/preferences` for every new KV store [C-S30][A-S15].
4. **Using `KeyboardResize.Ionic` on a non-Ionic project.** The resize is a no-op without `ion-app` in the DOM. The fix: `KeyboardResize.Native` for any non-Ionic stack [C-S26].
5. **Storing refresh tokens in `@capacitor/preferences`.** `UserDefaults` and `SharedPreferences` are not encrypted at rest beyond the OS data-protection class. The fix: Keychain / Keystore plugin for refresh tokens; `@capacitor/preferences` for the session token only.
6. **Using CodePush for OTA on Capacitor.** CodePush is React-Native-only and the App Center service was sunset 2025-09-30. The fix: `@capgo/capacitor-updater` is the credible commercial option; `vite-plugin-pwa` is the marketing-page PWA update. No first-party Capacitor OTA story exists [C-S38].
7. **Pinning `@capacitor/*` to v9-alpha for new code.** v9 is at `9.0.0-alpha.6` and the iOS framework ships broken (#8560). The fix: pin to `~8.5.0` for any production work [A-S20].
8. **Reaching for a 3rd-party HTTP client when `fetch` is fine.** The Capacitor WebView is same-origin to the `webDir` server; `fetch` covers same-origin without CORS. The fix: only add `axios` / `ky` if the team already uses one.
9. **Adding a community plugin without a license + last-publish + permissions audit.** First-hit community plugins often have stale last-publish, AGPL licenses, or permission overreach. The fix: run `npm view <name> time`, check the repo `LICENSE`, grep the Android manifest for permissions beyond what the plugin name implies [C-S22][C-S23].
10. **Bundling a custom font from a CDN at runtime.** The WebView pays a network round-trip on first launch (FOIT). The fix: bundle the font via `Fontsource` (npm-installable per style + weight) and use `font-display: swap`.

## iOS vs Android parity cheat sheet

Some companion libraries have meaningful platform differences inside a Capacitor WebView. The list below is the subset that matters for a single-PR review.

| Library | iOS | Android | Notes |
|---|---|---|---|
| `@capacitor/haptics` `vibrate({duration})` | No-op (iOS has no single-duration vibrator) | Works | Use `impact` / `notification` on iOS |
| `@capacitor/keyboard` `KeyboardResize.Ionic` | No-op without `ion-app` | No-op without `ion-app` | `KeyboardResize.Native` for non-Ionic stacks |
| `@capacitor/browser` | `SFSafariViewController` | Chrome Custom Tab | The toolbar color is set per-platform |
| `<video autoplay>` | Requires `muted` + `playsinline` | Requires `muted` only | iOS is stricter |
| `URL.createObjectURL` lifetime | Tied to the document | Tied to the document | Same on both platforms; revoke in cleanup |
| `IndexedDB` quota | ~50 MB / origin on Safari, larger with persistent storage | ~50 MB / origin on Chrome, larger with persistent storage | Use `navigator.storage.persist()` for > 50 MB |
| WebSocket reconnect on background | Connection drops on `pause` | Connection drops on `pause` | Reconnect in the `resume` handler |
| Service Worker registration | Works in WebView (no `; wv)` UA tell) | Blocked in WebView (the `; wv)` UA tell) | Gate SW registration on `navigator.userAgent.includes('; wv)')` |
| `<input type="file" accept="image/*" capture>` | Opens camera / library | Opens camera / library | Both platforms honor `capture` for camera access |
| `position: fixed` inside a scrollable parent | `overflow: hidden` on body breaks rubber-band | Same | Use `overflow: auto` on the scrollable container |

## Freshness

<!-- freshness: capacitor=8.5.0 access=2026-08-18 -->

- last_verified: 2026-08-18
- source_schema_versions: @capacitor/core@8.5.0, @capacitor/preferences@~8.0.0, @capacitor/filesystem@~8.0.0, @capacitor/haptics@~8.0.0, @capacitor/keyboard@~8.0.0, @capacitor/push-notifications@~8.0.0, @capacitor/browser@~8.0.0
- anchor_url: https://capacitorjs.com/docs
- v9_watch_only_issue: https://github.com/ionic-team/capacitor/issues/8560

## References

- [C-S14] -- https://capacitorjs.com/docs/v8/apis -- accessed 2026-08-18 (official Capacitor v8 APIs page; 35 official plugins list including the new v8 additions)
- [C-S15] -- https://ionicframework.com/docs/intro -- accessed 2026-08-18 (Ionic Framework intro docs; Ionic Team / OutSystems; Ionicons v7 sister project; system font stack recommendation)
- [C-S19] -- https://raw.githubusercontent.com/ionic-team/capacitor/main/cli/src/declarations.ts -- accessed 2026-08-18 (canonical Capacitor configuration schema; `server.allowNavigation` allowlist for cross-origin fetches; `server.cleartext` must be `true` for `http://` dev URLs)
- [C-S22] -- https://capacitorjs.com/docs/v8/basics/using-plugins -- accessed 2026-08-18 (Capacitor Community org pointer; `capacitor-community/proposals/` for new community plugins; Cordova compatibility shim)
- [C-S23] -- https://github.com/riderx/awesome-capacitor -- accessed 2026-08-18 (curated community plugin index; 635 stars; last update 2026-07-29; maintained by Capgo)
- [C-S30] -- https://www.npmjs.com/package/@capacitor/preferences -- accessed 2026-08-18 (`@capacitor/preferences` 8.0.1 API: `configure` / `get` / `set` / `remove` / `clear` / `keys` / `migrate` / `removeOld`; `UserDefaults` iOS, `SharedPreferences` Android, `localStorage` web; `MigrateResult` for `@capacitor/storage` migration)
- [C-S31] -- https://www.npmjs.com/package/@capacitor/filesystem -- accessed 2026-08-18 (`@capacitor/filesystem` 8.1.2 API; named directories `Documents`, `Data`, `Library`, `Cache`, `External`, `ExternalStorage`; methods `readFile` / `writeFile` / `appendFile` / `deleteFile` / `mkdir` / `rmdir` / `readdir` / `getUri` / `stat` / `copy` / `rename` / `downloadFile`)
- [C-S32] -- https://www.npmjs.com/package/@capacitor/push-notifications -- accessed 2026-08-18 (`@capacitor/push-notifications` 8.1.2 API; `unregister` since 5.0.0; Token shape `{value: string}` with FCM token on Android, APNs token on iOS; FCM on Android, APNs on iOS)
- [C-S34] -- https://www.npmjs.com/package/@capacitor/app -- accessed 2026-08-18 (App API: lifecycle events `appStateChange`, `pause`, `resume`, `appUrlOpen`, `appRestoredResult`, `backButton`; `exitApp`, `getInfo`, `getState`, `getLaunchUrl`, `minimizeApp`, `getAppLanguage` since 8.1.0, `toggleBackButtonHandler` since 7.1.0)
- [C-S38] -- https://capacitorjs.com/docs/cli/commands/run -- accessed 2026-08-18 (CI/CD guidance: Codemagic / Bitrise / Appcircle / GitHub Actions + fastlane; OTA caveat: no first-party Capacitor JS-bundle OTA; CodePush is RN-only; App Center sunset 2025-09-30; `@capgo/capacitor-updater` is the credible commercial option with self-hosted variant)
- [C-S42] -- https://capacitorjs.com/docs/cli -- accessed 2026-08-18 (Capacitor CLI command list: `add` / `build` / `copy` / `doctor` / `init` / `ls` / `migrate` / `open` / `run` / `sync` / `update`)
- [C-S43] -- https://github.com/konstaui/konsta -- accessed 2026-08-18 (Konsta UI README: pixel-perfect mobile UI components built with Tailwind CSS; iOS + Material Design components for React, Vue & Svelte; ~4-5k stars; MIT)
- [C-S44] -- https://tailwindcss.com/docs -- accessed 2026-08-18 (Tailwind CSS v4.3 docs: CSS-first config; `@theme` blocks; the 2026 mainstream)
- [C-S45] -- https://unocss.dev/ -- accessed 2026-08-18 (UnoCSS site: instant on-demand atomic CSS engine; `preset-icons` for Pure CSS Icons; smaller CSS than Tailwind for the same bundle)
- [C-S46] -- https://dexie.org/ -- accessed 2026-08-18 (Dexie.js home: IndexedDB made simple; truly offline-first; 5.x current; default for > 5 MB client-side storage)
- [C-S47] -- https://rxdb.info/ -- accessed 2026-08-18 (RxDB 17.0.0 release page: Local-First to the Moon; 22,869 stars; Apache-2.0 + commercial paths; only when sync / replication is needed)
- [C-S48] -- https://lucide.dev/guide/packages/lucide-react -- accessed 2026-08-18 (Lucide for React guide: 5k+ icons; ISC; tree-shakeable per-component; default for non-Ionic projects)
- [C-S49] -- https://phosphoricons.com/ -- accessed 2026-08-18 (Phosphor Icons home: six style weights; large library; MIT; default for design systems that want 2D-style flexibility)
- [C-S50] -- https://tanstack.com/virtual/latest -- accessed 2026-08-18 (TanStack Virtual docs: headless UI for virtualizing large element lists; framework-agnostic React / Solid / Vue / Svelte; 10-15 kb; default for any list > 100 items)
- [C-S51] -- https://www.npmjs.com/package/@use-gesture/vanilla -- accessed 2026-08-18 (the underlying library that `@use-gesture/react` wraps; framework-agnostic swipe / drag / pinch; pair with `history.back()` for iOS-feel swipe-back)
- [A-S15] -- https://registry.npmjs.org/{package-name} -- accessed 2026-08-18 (npm plugin versions on the 8.x line; storage 1.2.5 [legacy / deprecated]; text-zoom 8.0.1; splash-screen 8.0.2)