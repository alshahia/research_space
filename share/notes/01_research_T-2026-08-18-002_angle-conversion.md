# Research - T-2026-08-18-002 — Angle B (Conversion path from existing JS/TS web projects into Capacitor)

**Date:** 2026-08-18
**Trigger:** initial
**Sub-agent:** research
**Angle:** B — conversion path (Vite, Next.js, Vue, SvelteKit, Angular, CRA/Webpack, plain HTML/JS) plus pitfall catalogue, env handling, routing, assets, build/ship, Cordova migration
**Companion angles:** A (Capacitor core) and C (ecosystem / best companion libraries) are dispatched separately; this file is read-only for them.
**Research-detector tier:** 3 (sum=3.6 per `tasks/T-2026-08-18-002.md`); Tier 1+ source-connector protocol active.

## Task in one sentence

Reuses: `research/agent-app-templates-2026-08-13/02_STACK_MATRIX.md` already names Capacitor `^8.5.0` and frames it as "wrap my web app" — angle B adds the specific, version-grounded conversion recipes, pitfall catalogue, routing/env/asset/Cordova bridge, and the per-bundler config snippets that the master dossier needs to make the wrap-my-web-app promise concrete.

Distil, for an LLM/agent-facing Capacitor dossier, the **conversion path** from any existing JavaScript/TypeScript web project (Vite, Next.js, Vue 3, Angular, SvelteKit, plain CRA/Webpack, plain HTML/JS) into a Capacitor 8 cross-platform mobile build, including the pre-conversion audit checklist, per-bundler recipe, pitfall solutions, env-handling, routing, asset/build/ship, compatibility traps, and the official Cordova-migration bridge.

## What we know for sure

- **Capacitor v8.5.0 is current** as of 2026-08-18 (`@capacitor/core`, `@capacitor/cli`, `@capacitor/android`, `@capacitor/ios` all publish 8.5.0); lerna.json at the monorepo root confirms `"version": "8.5.0"` [S1, S2]. Sub-plugin packages vary by release window: `@capacitor/splash-screen@8.0.2`, `@capacitor/status-bar@8.0.3`, `@capacitor/app@8.1.1`, `@capacitor/browser@8.0.4`, `@capacitor/preferences@8.0.1`, `@capacitor/assets@3.0.5` (the `assets` CLI is on its own cycle) [S2].
- **Capacitor considers each platform project a *source asset*, not a *build-time asset*.** Xcode and Android Studio projects live in `ios/` and `android/` and are checked into source control; you use the IDEs to do platform-specific configuration, signing, and `test`/`archive` [S3, S4].
- **`npx cap init` reads `config.xml` preferences** from a Cordova project and ports them to `capacitor.config.json`/`.ts` automatically, including `<preference>` tags; additional Cordova preferences can be added manually under `cordova.preferences` [S5, S6]. The CLI also auto-detects `webDir` per framework (Angular=`www`, React CRA=`build`, Vue=`public`, etc.) but recommends cross-checking [S7].
- **The default iOS scheme is `capacitor://`; Cordova-with-`cordova-plugin-ionic-webview` defaults to `ionic://`.** Switching origins silently nukes LocalStorage/IndexedDB data; if you keep `iosScheme: "ionic"` in `capacitor.config.json` the data persists [S5, S8].
- **`cleartext: false` is hard-coded on Android** since API level 28 (Android 9 Pie, 2018). The `server.cleartext` option is **"intended for use with live-reload servers" — never ship it on in production** [S9]. The verified escape is `server.allowNavigation` against your dev hostname, not `cleartext: true`.
- **`androidScheme: "https"` is the default on Android**; setting it to anything other than `http`/`https` on Webview 117+ breaks URL-path rewriting (used to be only a routing-resolution issue, now the comment in the TS schema explicitly says it can leave your app unable to resolve routing) [S10]. The ionic blog post linked in the source explains the Webview 117 behavioral change [S10].
- **`@capacitor/status-bar` `overlaysWebView: true` + `backgroundColor` no longer have any effect on Android 16 (API 36) + Capacitor 8** because edge-to-edge is enforced; this is documented on the v8 Status Bar page with a "Android 16+ behavior change" callout that explicitly lists both properties as no-ops [S11].
- **`@capacitor/app` plugin's `addListener('appUrlOpen', ...)` is the single hook for ALL deep-link paths:** custom URL schemes, iOS Universal Links, and Android App Links [S12]. This is the replacement for any Cordova `handleOpenUrl` custom code.
- **`@capacitor/assets` is the canonical icons/splash generator** — `npx @capacitor/assets generate --ios` and `--android` regenerates icons and splash from a `resources/` folder; it is maintained by the Capacitor team in `ionic-team/capacitor-assets` (separate repo, version cycle 3.0.5 as of access) [S13, S14].
- **Capacitor officially supports iOS 15+ and Android 7+**; Android explicitly requires Chrome WebView 60+ for runtime [S15]. Below those baselines the WebView is too old for v8.
- **The v8 docs removed per-framework recipes** (Vite, Next.js, React, SvelteKit, Webpack, CRA are no longer standalone guides); the per-framework `webDir` default is the only official per-framework reference and was moved into the `getting-started/installation.md` page [S7, S16]. The v8 sitemap lists 23 canonical docs URLs and the per-framework guides are NOT in that list [S16]. Per-framework recipes therefore have to be reconstructed from the v5/v6 docs (where they lived under `docs/guides/`) and from the Capacitor "Awesome" community list.
- **`cap sync` runs `update + copy + install`** (it bundles `cap copy` and the dependency install for both native projects in one command); `cap copy` is for fast iteration when only `webDir` changed and you don't need plugin install [S17, S18, S19]. Source code for `copy.ts` and `sync.ts` confirms this is the intended split [S17, S18].
- **The Capacitor CLI is not a build tool** — the JS bundler still owns the build pipeline; `npx cap sync` assumes the bundler produced `webDir/index.html` already. The README explicitly says "you must build your web project at least once before adding any native platforms" [S20].
- **Cordova migration mechanism**: Capacitor keeps an emulation layer for most Cordova plugins; some need replacement, and the official step is `npm uninstall cordova-plugin-name && npx cap sync` once an equivalent Capacitor plugin (or no replacement) is decided [S5, S21]. The full migration guide is `versioned_docs/version-v8/main/cordova/migrating-from-cordova-to-capacitor.md` [S5, S21].
- **`capacitor.config.ts` is TypeScript-first** by default — the CLI's example uses `import { CapacitorConfig } from '@capacitor/cli'` and recommends TS because the plugin configs are typed; a JSON file is also supported [S9].

## What we don't know (ambiguities)

- **The user has not specified which bundler the user's existing web project uses**, or even whether it's a single bundler or several (they may have multiple apps in flight). The angle covers all seven major shapes (Vite, Next.js, Vue 3 + Vite, Angular, SvelteKit, plain CRA/Webpack, plain HTML/JS), but the planner may want to emphasize one based on the dominant stack in the repo.
  - **Suggested clarifying question:** "Which bundler/source framework is the existing web project? (Vite / Next.js / Vue 3 / Angular / SvelteKit / CRA / Webpack / plain HTML). If mixed, lead with the one used by the primary app."
- **Whether the user wants iOS, Android, both, or Capacitor's "Web" target** as the first cross-platform target. iOS requires a Mac with Xcode; Android requires Java 17 + Android Studio + (often) accepted SDK license.
  - **Suggested clarifying question:** "First target = iOS, Android, or both? Confirm a Mac is available if iOS is in."
- **Whether the project has an existing PWA / service worker / installable manifest** that will conflict with the Capacitor build (a PWA service worker is fine inside the WebView but causes a white screen if it tries to fetch from a non-existent CDN origin offline).
  - **Suggested clarifying question:** "Does the existing web project ship a service worker / PWA manifest? If yes, do we need it inside the Capacitor WebView or is it web-only?"
- **What "near-native-like" means for this dossier.** Possibilities: faithful Material 3 / iOS HIG styling + safe-area handling + gesture fidelity + 60fps scroll + native haptics + native modal sheets + adaptive icons. The droid-skill expects "native feel" to surface in the recommended libraries (Tailwind v4 + `motion` for animations, Capacitor's own `Haptics` / `StatusBar` / `SplashScreen` plugins, plus `@capacitor/browser` for OAuth flows) but does not promise a specific subset.
  - **Suggested clarifying question:** "Top 3 priorities for 'near-native feel': (a) 60fps scroll, (b) proper safe-area + system-bar handling, (c) native haptics + sheets, (d) Material 3 / iOS HIG component fidelity, (e) ?"
- **The Capacitor v9 / "next" docs URL is listed in the docs home page header** (the docs version dropdown shows `[v9](/docs/next/)` above v8) — v9 is "next" / unreleased at the access date. The dossier should treat v9 as pre-release unless the user explicitly opts in.
  - **Suggested clarifying question:** "Anchor the dossier on Capacitor 8 (current stable) or v9 (`/docs/next/` is announced but pre-release)?"
- **Whether the existing web project relies on cookie-based sessions** that would not survive the Android WebView clearing cookies on app backgrounding / iOS 7-day cookie expiry for `WKWebView` (well known but version-dependent).
  - **Suggested clarifying question:** "Does the app rely on cookie-based auth? If yes, we need to plan for `@capacitor/preferences` or a session cookie that the native side stores instead."
- **Whether the project has a Cordova predecessor.** A "yes" triggers the Cordova-migration section (item 10 in the brief) in full; a "no" lets us compress it to a single-paragraph pointer at `@ionic/cordova-plugins` + `npx cap migrate cordova`-style helpers.
  - **Suggested clarifying question:** "Is there an existing Cordova project? If yes, did it use a custom `config.xml` plugins block we need to port?"

## Risks and doubts

- **White-screen on first launch** is the single highest-frequency failure mode for new Capacitor projects. Root causes are (a) `webDir` pointing at the wrong folder (or empty), (b) `base` set to an absolute path in the bundler producing `/assets/...` paths that 404 under `file://` or `capacitor://`, (c) server returning 404 for SPA routes that need to fall back to `index.html`. Agents that don't cross-check `cap init`'s auto-detected `webDir` will spend an afternoon on this.
  - **Severity:** high
  - **Mitigation:** Three-step verification: (1) `npx cap init` then inspect `capacitor.config.json` for `webDir`; (2) `npm run build` produces `index.html` inside `webDir`; (3) `npx cap sync android ios` then `npx cap open android` and load the bundled JS to confirm `200`s. For path issues, set bundler `base: './'` (Vite) or `basePath: ''` (Next static export) and re-run.
- **Cordova→Capacitor scheme-swap silently nukes LocalStorage / IndexedDB / cookies** because the origin changes from `ionic://localhost` (Cordova with `cordova-plugin-ionic-webview`) to `capacitor://localhost`. End-user impact: "I lost all my notes" on the first launch after migration.
  - **Severity:** high
  - **Mitigation:** Add `server.iosScheme: "ionic"` in `capacitor.config.json` for that migration only (or migrate data via a one-shot script). New Capacitor-only projects should never set `iosScheme` away from the default `capacitor`.
- **Edge-to-edge breakage on Android 16 (API 36) for any app that depends on `overlaysWebView: true` + `backgroundColor` for layout** — both v8 Status Bar options **silently no-op** on Android 16+ and you will not get any compile-time warning, only a visual break on devices running API 36+ [S11]. The Capacitor team documented this but the option block still parses, so existing code does not fail.
  - **Severity:** high
  - **Mitigation:** Add a runtime test on the Status Bar config: if `Capacitor.getPlatform() === 'android' && parseInt(deviceInfo.version) >= 16` then plan the layout with `env(safe-area-inset-*)` padding and do not rely on `backgroundColor`. Update the Status Bar configuration to use `getInfo()` and adapt at runtime.
- **Service-worker conflict with the Capacitor WebView** — if you ship a PWA-style `service-worker.js` that caches resources with a network-first strategy and the CDN origin is down, the Capacitor WebView can serve a stale, broken app. Conversely, shipping NO service worker means every native-launch cold start re-fetches the JS (faster than web, but bad UX if network is shaky).
  - **Severity:** medium
  - **Mitigation:** Default = no service worker in the native build (don't register it if `Capacitor.isNativePlatform()` returns true). If you need offline cache inside the app, use `@capacitor/preferences` for small KV and a filesystem strategy (Filesystem plugin + a JSON file) for larger data. Do not use IndexedDB-on-CDN-origin as the cache.
- **PWA / WebView storage limits on iOS** — LocalStorage in `WKWebView` is evicted aggressively (Safari's 7-day policy for "never visited" tabs, but the WebView inside an app is generally persistent on the same iOS app sandbox; the eviction policy that bites you is "no backup" + device-storage-pruning). For >5 MB of data, LocalStorage is the wrong choice.
  - **Severity:** medium
  - **Mitigation:** `@capacitor/preferences` for small KV (analogous to LocalStorage but explicit and survives uninstall only with `set({ key, value })`); `@capacitor-community/sqlite` (or RxDB) for relational/large; `@capacitor/filesystem` for blob storage.
- **Bundler `base` mismatch produces a 404 soup.** Static-export frameworks (Next.js, Vite without `base: './'`, CRA without `homepage: "."`) emit absolute paths like `/static/js/main.abc123.js`. Capacitor serves them at `capacitor://localhost/static/js/...` and they 404. The "white screen" symptom is usually this.
  - **Severity:** high
  - **Mitigation:** Set relative `base` in every bundler (recipe table below). For Next.js, `output: 'export'` + custom `basePath`; for Vite, `base: './'`; for CRA, `"homepage": "."` in `package.json`; for Angular, `baseHref` not used — Angular writes `index.html` with `<base href="./">` by default in v17+.
- **`mixedContentMode: "always"` for an HTTPS-hosted backend + HTTP dev origin is a footgun.** A user running on real Android (post-API 28) will hit cleartext block even with this set; the right primitive is `server.allowNavigation` per dev host, NOT enabling all mixed content globally.
  - **Severity:** medium
  - **Mitigation:** Reserve `server.cleartext: true` (and equivalent for Android `network_security_config.xml`) **only** for the live-reload dev host. Never commit `cleartext: true`. Use `server.url` + `server.allowNavigation` paired with the CLI's `cap run` for live-reload on device.
- **Auth-redirect round-trips through `WKWebView` get eaten by the URL scheme handler.** Cordova's `handleOpenURL` plugin was the standard answer; Capacitor uses `@capacitor/app`'s `appUrlOpen`. If the OAuth callback URL is registered as a deep link (`myapp://callback`) the listener fires and parses the URL. Missing this is a "logged-out forever" failure mode.
  - **Severity:** high
  - **Mitigation:** Implement `@capacitor/app` `appUrlOpen` listener at app boot; for OAuth flows that require cookies/session state (`<Server-side session>` + redirect chain) use `@capacitor/browser` (`open`) and listen for `browserFinished` plus the `appUrlOpen` listener for the custom-scheme callback.

## Existing solutions (landscape scan)

Angle B is mostly about recipes; the build-vs-reuse scan is light because Capacitor is itself the wrapping primitive. The only meaningful landscape items are:

- **Capacitor CLI** — official npm `@capacitor/cli@8.5.0` (MIT) [S2]
- **Cordova plugin shim** — `@ionic/cordova-plugins` (Apache-2.0, last touched 2026 in `ionic-team/capacitor` monorepo; built into Capacitor since v3) — no separate npm install needed if the project historically used Cordova plugins [S5, S21]
- **`@capacitor/assets`** — official icon/splash generator (MIT, `ionic-team/capacitor-assets`, 3.0.5) [S13, S14]
- **`@capacitor/app`, `@capacitor/browser`, `@capacitor/preferences`, `@capacitor/status-bar`, `@capacitor/splash-screen`, `@capacitor/haptics`** — official plugin family (MIT, all 8.x) [S2, S12]
- **`@capacitor-community/sqlite`** — community SQLite plugin (MIT, the de-facto large-data choice, maintainer `jepique` on GitHub) — recommended for >5 MB relational data; see angle C for the compatibility matrix since the ecosystem is angle C's scope.

No competing cross-platform wrappers of equivalent feature-set sit on this exact wedge; Cordova is in maintenance mode and the Capacitor docs explicitly call it out [S3, S5]. The "scan" is therefore mostly a confirmation: this is the canonical recipe; nothing else competes at the same level.

## Build vs. reuse decisions - please confirm

1. **Component "Capacitor core + CLI"** — reuse `@capacitor/core@^8` + `@capacitor/cli@^8` (MIT, official, current 8.5.0 [S2]). **No decision needed.** → preset: reinstall.
2. **Component "Plugin family"** — reuse the `@capacitor/*` plugins as you need them (MIT, official, 8.x). **No decision needed.** → preset: add per feature.
3. **Component "Cordova plugin compatibility"** — reuse Capacitor's built-in cordova-plugin shim (kept inside the Capacitor monorepo since v3; auto-installed when you `npm install` `@capacitor/core`) [S5, S21]. **No decision needed.** → preset: on.
4. **Component "Storage layer"** — for small KV reuse `@capacitor/preferences`; for relational/large use `@capacitor-community/sqlite`; for blobs use `@capacitor/filesystem`. **No decision needed.** → preset as listed; the droid-skill/angle C may want to substitute RxDB or WatermelonDB if the codebase already uses an ORM.
5. **Component "Live-reload during dev"** — reuse the Capacitor CLI's `npx cap run <platform> --livereload` (or `@ionic/cli` `ionic cap run` for live-reload + deploy + browser refresh) [S22]. **No decision needed.**
6. **Component "Cross-bundler discovery of `webDir`"** — let `npx cap init` auto-detect and cross-check the result manually [S7]. **No decision needed.**

The six decisions resolve to "default on" — no user input is required for the recipe file. The agent may want to weigh in on the storage tier only if the user already uses Dexie / RxDB / WatermelonDB in the existing web project (that lives in angle C).

## Technical findings

### 1. Pre-conversion audit checklist (do these before `npx cap init`)

Every item is a failure mode I've verified exists in the v8 docs or the CLI's own error messages [S9, S16, S17, S23].

- [ ] **Bundler outputs a `webDir` with `index.html` at its root.** Test: `npm run build` then `ls <webDir>/index.html`. If the index is at `<webDir>/public/index.html`, set `webDir` to `<webDir>/public` for Vite, or `webDir: 'out'` for Next.js with `output: 'export'`.
- [ ] **Bundler `base` is RELATIVE** (Vite, Next static export, CRA, Vue). Required: `base: './'` (Vite) / `"homepage": "."` (CRA) / next.config `basePath` empty + `assetPrefix` empty + `output: 'export'` + `trailingSlash: true` (Next.js). Default bundler configs emit `/assets/...` paths that 404 under `capacitor://` [S24].
- [ ] **No reliance on server-side 404 → `index.html` fallback** that the Capacitor WebView can't replicate. SPA routers (Vue Router history mode, React Router, `@angular/router`) need `history.pushState()`; if the user deep-links `capacitor://localhost/some/route` the WebView will load `index.html` and the SPA router will read `window.location.pathname` — that works, but only if the bundler produced a single `index.html` and the router is mounted at boot. If a server is proxying unknown paths to `index.html` in dev, this no longer happens in the WebView [S9].
- [ ] **No `service-worker.js` that the WebView can hijack.** If the existing project ships a PWA service worker, conditionally `navigator.serviceWorker.register(...)` only when `Capacitor.isNativePlatform() === false` [S25, S26].
- [ ] **Auth tokens are not in `document.cookie`** or, if they are, the same-origin cookie policy works under the `capacitor://localhost` (iOS) / `https://localhost` (Android) scheme. iOS WKWebView does not persist 3rd-party cookies; first-party cookies under the bundled origin DO persist until the user clears Safari data. For long sessions, prefer `@capacitor/preferences` and re-hydrate on boot [S27].
- [ ] **No heavy reliance on `localStorage` for >5 MB.** LocalStorage on iOS WebView is limited to ~5-10 MB and historically was a flakier surface than `@capacitor/preferences`. For >5 MB, switch to `@capacitor-community/sqlite` or `@capacitor/filesystem` (JSON) [S27].
- [ ] **`IndexedDB` survives a backup-restore migration** but is keyed by the WebView's storage profile. If multiple Capacitor apps from the same vendor (e.g. dev + prod side-by-side) open at once, IndexedDB is partitioned by origin so they don't collide. Document the origin (`capacitor://localhost` on iOS, `https://localhost` on Android).
- [ ] **All env-prefix values used at runtime are `.env`-driven and not server-secret**. Anything that must NOT ship to the bundle (a backend service key, a paid-tier token) belongs in a backend; the bundle is shipped to App Store reviewers and visible to anyone with a jailbroken device.
- [ ] **Native deps from `node_modules` are limited to packages with `@capacitor/*` plugins**. Plain Cordova plugins without Capacitor equivalents require the Cordova bridge (kept inside Capacitor) and may not work without `cordova-plugin-*` packages left in `package.json`. Most UI-only deps (React, Vue, Tailwind, GSAP, RxDB, Three.js, Mapbox GL) work as-is in the WebView; native-only deps (e.g. `react-native-*`, `expo-*`) do not.

### 2. Project-type recipes

All seven. The patterns are reconstructed from the v8 docs site-removal of per-framework guides [S16], the canonical `webDir` list in `getting-started/installation.md` [S7], the TS config schema in `cli/src/declarations.ts` [S9], and the v6 migration guides for the bundler-specific gotchas (Vite, Next.js, Angular CLI, SvelteKit) — the legacy recipes still work in v8 because the v8 auto-detector is the union of the v6 patterns.

#### 2.1 Vite (React / Vue / Svelte / Solid / Lit / Vanilla)

```js
// vite.config.ts
import { defineConfig } from 'vite';
export default defineConfig({
  base: './',                  // critical for Capacitor
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsInlineLimit: 0,      // keeps assets as separate files; required for some plugins
    sourcemap: false,          // don't ship sourcemaps to App Store
    rollupOptions: {
      output: { manualChunks: undefined } // let Capacitor see one bundle tree
    }
  }
});
```

```json
// capacitor.config.json
{
  "appId": "com.example.app",
  "appName": "Example",
  "webDir": "dist",
  "server": {
    "androidScheme": "https",
    "cleartext": false
  }
}
```

- Vite's auto-detection picks `dist` for React/Vue/Svelte [S7].
- `base: './'` is mandatory; the default `/` will produce `/assets/...` paths [S24].
- For monorepos, set `outDir` to a non-default and pass the same path to `webDir`.
- Verify with `npm run build && ls dist/index.html` before `npx cap add android ios`.

#### 2.2 Next.js (most painful; static export only)

```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',            // static export; required for the WebView
  basePath: '',                // no /docs prefix
  assetPrefix: '',             // no CDN
  trailingSlash: true,         // critical for SPA-style fallback
  images: { unoptimized: true },// next/image won't work without a server
  reactStrictMode: true
};
module.exports = nextConfig;
```

```json
// capacitor.config.json
{ "appId": "com.example.app", "appName": "Example", "webDir": "out" }
```

**Hard blockers** (Next.js features that DO NOT work in Capacitor because there is no Node server):
- All `next/headers` APIs (`cookies()`, `headers()`).
- All Route Handlers (`app/api/*/route.ts`).
- All Server Actions.
- Middleware (`middleware.ts`).
- `getServerSideProps` / `getStaticProps` with `revalidate`.
- Image optimization (`next/image` falls back to a plain `<img>` because of `images.unoptimized: true`; or use a static `<img>`).
- `next/link` prefetch — the prefetch hits the dev server.
- Dynamic routes that depend on rewrites (e.g. `/blog/[slug]` rewrites) — static export pre-generates them, dynamic params → 404 in the WebView unless `generateStaticParams` covers every route or `dynamicParams: false`.

Recommended Next.js Capacitor pattern: use the **App Router with full `'use client'`** components everywhere; treat Next as a build tool, not a framework.

#### 2.3 Vue 3 + Vite

Same Vite recipe above. The router caveat:

```js
// vue-router history mode requires Capacitor to allow the path
// (the platform handles deep links, but the SPA also needs to know about them)
import { Capacitor } from '@capacitor/core';
const router = createRouter({ history: createWebHistory(), routes });
// every <router-link> uses the SPA router; the @capacitor/app appUrlOpen
// listener is registered at boot to route external deep-links.
```

Vue 3 needs no extra Capacitor config beyond the Vite recipe; `vue-router` history mode works inside the WebView because all routes resolve to `capacitor://localhost/index.html` + SPA pushState.

#### 2.4 Angular (CLI >= 17)

```json
// angular.json (under projects.app.architect.build)
{
  "options": {
    "outputPath": "www",
    "baseHref": "./",
    "assets": ["src/favicon.ico", "src/assets"],
    "styles": ["src/styles.css"],
    "scripts": [],
    "budgets": [
      { "type": "initial", "maximumWarning": "1mb", "maximumError": "3mb" }
    ]
  }
}
```

```json
// capacitor.config.json
{ "appId": "com.example.app", "appName": "Example", "webDir": "www" }
```

Critical Angular settings:
- `baseHref: './'` (Angular CLI auto-fills `<base href>` in `index.html`).
- Bundle-budget: Angular apps overshoot 1 MB without `outputHashing: "all"` budget errors; bump to 3-5 MB warning / 6 MB error and then trim with route-level lazy loading.
- AOT is mandatory (Angular CLI default since v9); JIT will not work in the WebView because of CSP on `file://` and `capacitor://`.
- Do not use `provideServerRendering()` — pure SPA only.
- Two `NgZone` gotchas are documented specifically for Capacitor [S28]:
  - `provideExperimentalZonelessChangeDetection()` may break `@capacitor/core`'s zone-based Promise bridge; keep `NgZone` until v8 plugin zone adapters land.
  - Heavy `ngAfterViewInit` work that re-renders the layout can fight with the WebView's gesture-state machine; defer to `requestAnimationFrame` once per tick.

#### 2.5 SvelteKit

SvelteKit must be **fully static** (no SSR). Setup:

```js
// svelte.config.js
import adapter from '@sveltejs/adapter-static';
export default {
  kit: { adapter: adapter({ fallback: 'index.html' }) }
};
```

```json
// capacitor.config.json
{ "appId": "com.example.app", "appName": "Example", "webDir": "build" }
```

- `paths.base` is empty by default in SvelteKit; setting it to anything other than `''` will break relative asset paths in Capacitor.
- The `fallback: 'index.html'` option is what allows SPA-style routing for any unknown path; without it the WebView will show a 404 on deep links.
- `service-worker` and `src/service-worker.js` (SvelteKit's `src/service-worker.ts`) should NOT be registered when `Capacitor.isNativePlatform() === true`; SvelteKit auto-registers if the file exists.

#### 2.6 Plain CRA → migrate off (recommended) OR set `"homepage": "."`

CRA has been **sunset** by the React team (announced Feb 2025; new "react.dev/learn" + Vite-based community scripts are now recommended). Hard recommendation: port to Vite first, then add Capacitor.

Minimal in-place recipe if you must stay on CRA:

```json
// package.json
{ "name": "app", "homepage": "." }
```

```js
// config-overrides.js (using react-app-rewired)
module.exports = {
  paths: { /* keep defaults */ }
};
```

Then `npx cap init` with `webDir: 'build'`. The `"homepage": "."` is the equivalent of Vite's `base: './'`.

Porting recipe (smaller surface than people think):
1. Add `vite`, `@vitejs/plugin-react`, `vite-plugin-pwa` (or just keep your `service-worker` opt-out).
2. Move `tsconfig.json`'s paths + `react-app-rewired` config into `vite.config.ts`.
3. Rename `index.js` to `index.tsx` (or keep `.js`).
4. `npm install` your postcss/tailwind plugins to Vite equivalents (autoprefixer, postcss stay the same).
5. Drop `react-scripts` and the `start`/`build` script wrappers — Vite's own `dev`/`build` replaces them.
6. Most CRA projects port in 30-60 minutes of config edits unless they used `src/setupTests.js`-like Jest customizations (Jest stays; only the bundler swaps).

This is the more reliable path because CRA's underlying webpack-scripts `5.0.1` is no longer being kept in sync with security patches.

#### 2.7 Plain HTML/JS (no bundler)

```html
<!-- your existing index.html sits at /app/index.html -->
```

```json
// capacitor.config.json
{
  "appId": "com.example.app",
  "appName": "Example",
  "webDir": "app"             // the folder containing index.html
}
```

No bundler config to change. `npm init -y` + `npm i @capacitor/core @capacitor/cli` + `npx cap init` + `npx cap add android ios` is the whole flow. Use `<script type="module" src="./main.js">` to keep relative paths.

### 3. Common conversion pitfalls with solutions

- **White screen on launch** — see `Risks` above; verify `webDir`, `base: './'`, and inspect the WebView remote-debugger log via `chrome://inspect` (Android) or Safari Web Inspector (iOS).
- **Asset 404s** — bundler `base` is absolute. Fix per 2.x recipes. On Capacitor 8 the Android WebView is Chrome (because `Capacitor` uses the latest `Chrome WebView` on device) [S15]; iOS uses `WKWebView` from the system.
- **Status bar wrong color / overlaps content** — `@capacitor/status-bar` config (see Findings below for the Android 16 caveat). Use `setOverlaysWebView({ overlay: true })` + CSS `padding-top: env(safe-area-inset-top)` for transparent status bars [S11, S29].
- **Safe-area-inset not respected** — set `viewport` meta to `viewport-fit=cover` and use `env(safe-area-inset-top)` / `env(safe-area-inset-bottom)` in CSS. Without `viewport-fit=cover`, both values resolve to `0` even on iPhones with notches [S30].
- **Dark mode not following OS** — listen to `(prefers-color-scheme: dark)` media queries in CSS **and** update Status Bar with `StatusBar.setStyle({ style: 'DARK' or 'LIGHT' })` per matchMedia change [S11].
- **Splash screen gone too fast** — `@capacitor/splash-screen` plugin: `SplashScreen.show({ autoHide: false })` then hide at the right time (after your first-frame paint, not after `DOMContentLoaded`). `launchShowDuration` is the static config in `capacitor.config.json`; default 3000 ms, can be 0 for test [S31].
- **Storage limits on iOS** — see `Risks`; switch to `@capacitor/preferences` (KV), `@capacitor-community/sqlite` (relational), or `@capacitor/filesystem` (blobs) [S27].
- **Deep links / Universal Links / App Links** — register your scheme in `Info.plist` (iOS) and `AndroidManifest.xml` (Android); implement `App.addListener('appUrlOpen', ...)` at app boot to route them [S12, S32].
- **Authentication redirects losing state** — see `Risks`; use `@capacitor/browser` (`Browser.open({ url })`) for OAuth-style round-trips, listen for `appUrlOpen` to catch the custom-scheme callback, store the token via `@capacitor/preferences` [S12, S33].
- **PWA service worker conflict** — conditional `navigator.serviceWorker.register(...)` only when `Capacitor.isNativePlatform() === false`; in a Capacitor build the WebView already caches the bundled assets aggressively [S25, S26].
- **HTTPS / mixed-content** — cleartext is blocked by default on Android 9+; for live-reload dev, `server.cleartext: true` + `server.url` + `server.allowNavigation: [dev-host]`. **Never ship `cleartext: true` to production.** For production HTTPS, no flag needed [S9, S22].
- **Live-reload → device works in dev but ships broken in prod** — make sure `cap sync` is the last step before `cap open`/`cap run`; `cap copy` only copies web assets but does NOT install pod / Gradle plugin dependencies; `cap sync` does both [S17, S18].

### 4. Env & secrets handling in a Capacitor build

Capacitor has **no built-in `env:` block**. The schema is just TS shape, no substitution. The valid paths are:

- **Vite**: `import.meta.env.VITE_*` — works inside the bundle; set `VITE_API_URL` per build target (`VITE_API_URL=https://api.example.com npx cap sync`). The bundle will inline this value at build time [S24].
- **Next.js (static export)**: `NEXT_PUBLIC_*` at build time; on the server side, only `process.env.*` AT BUILD TIME (no server).
- **Angular**: `src/environments/environment.ts` + file replacements via `angular.json` `fileReplacements`. Per target swap, build, then `npx cap sync`.
- **CRA**: `REACT_APP_*` at build time. `process.env.REACT_APP_*` is inlined.
- **SvelteKit (static)**: `$env/static/public` for `PUBLIC_*` envs inlined at build.
- **Generic**: write a tiny generator script that copies `.env.production` values into `src/config.production.ts` (or `src/generated/env.ts`) and import that file; the bundler inlines the constants.

**Secrets**: nothing sensitive should be in the bundle. Use a backend-for-frontend or a proxy. If you absolutely must use a key in the bundle:
1. Add it to a `.env` that is `.gitignore`d, and ensure the build pipeline reads from a CI secret.
2. Accept that any App Store reviewer or jailbroken user sees it.

For local-development-only "feature flags" that must NOT be in production, use `@capacitor/preferences` at runtime to gate, not inlined bundle constants.

### 5. Routing & navigation inside the WebView

- **iOS WebView** serves at `capacitor://localhost`. iOS scheme is swappable via `server.iosScheme`; production apps almost never set it [S9].
- **Android WebView** serves at `https://localhost` (default) or `http://localhost` (if `androidScheme: 'http'`). Custom Android schemes are unreliable on Webview 117+ as of the comment in `declarations.ts` [S10].
- **SPA router** (Vue Router, React Router, Angular Router, SvelteKit) uses `history.pushState`; the WebView treats `capacitor://localhost/route/x` as a request for the same `index.html` (Capacitor's server-side `serve` does the right thing). Angular CLI emits `<base href="./">` by default which is why `dist/` works with deep links.
- **`server.url`** — set to your live-reload dev server (e.g. `http://192.168.1.10:5173`) and `npx cap run <platform>` to point the WebView at the dev server for hot reload. **Production builds must NOT have `server.url` set** [S9, S22].
- **`server.allowNavigation`** — array of hostnames (string), e.g. `['api.example.com']`. The WebView is locked by default to the `capacitor://`/`https://localhost` origin; use this to allow specific external hosts (for OAuth providers you redirect to).

### 6. Asset management

- **Icons + splash** — generate with `npx @capacitor/assets generate --ios` / `--android` from a `resources/` folder. Source PNGs typically go in `resources/icon-only.png` and `resources/splash.png` (and `resources/icon-foreground.png` + `resources/icon-background.png` for adaptive icons on Android 8+) [S13, S14].
- **Local fonts** — keep them under `public/fonts/` (Vite) or `<webDir>/fonts/` and reference as `url('./fonts/...woff2')` from your CSS. Same relative-path discipline as JS bundles.
- **Images** — keep small images imported (Vite) or under `public/` (Next, Vue); large images over ~50 KB should be lazy-loaded.
- **Video / audio** — bundle inside `webDir` for offline; stream via the `<video>` tag's `src` for online content. `~50 MB` is the realistic per-asset ceiling on first install.

### 7. App metadata (capacitor.config.{ts,json} top-level)

```jsonc
{
  "appId": "com.example.myapp",       // bundle id / application id; DO NOT change after first release
  "appName": "My App",                // app store display name; safe to change
  "webDir": "dist",                   // <-- what your bundler outputs
  "bundledWebRuntime": false,         // default false; future-proofing for Capacitor 9+
  "loggingBehavior": "production",    // or "development" / "debug" / "none"
  "android": {
    "backgroundColor": "#FFFFFFFF"    // enforced NO-OP on Android 16+ / API 36+ [S11]
  },
  "ios": {
    "backgroundColor": "#FFFFFFFF",
    "contentInset": "automatic"       // or "always" / "never"
  },
  "plugins": {
    "StatusBar": { "style": "DEFAULT", "backgroundColor": "#FFFFFFFF", "overlaysWebView": false },
    "SplashScreen": { "launchShowDuration": 3000, "launchAutoHide": true, "backgroundColor": "#FFFFFFFF", "androidSplashResourceName": "splash", "androidScaleType": "CENTER_CROP", "showSpinner": false, "iosSpinnerStyle": "small", "spinnerColor": "#999999", "splashFullScreen": true, "splashImmersive": true },
    "Browser": { "presentationStyle": "fullscreen" },
    "App": { "appendUserAgent": "MyApp/1.0.0" }
  }
}
```

- `appId` once set cannot be changed in the store without a new SKU; do not use placeholders.
- `version` and `versionCode` are set in Xcode/Android Studio per platform (Capacitor does not manage them) [S34].
- For the App Store, Apple's `Build` number must be strictly increasing across builds in the same version; `Marketplace`/Play Store's `versionCode` same.
- To sync version+build across platforms, the droid-skill convention is to drive both from `package.json` `"version"` and inject via a `fastlane`/`eas.json`/`@capacitor/configure` script (see angle A).

### 8. Build & ship flow

- `npx cap add android` — generates `android/` (one-time per project). ONCE. Don't re-run.
- `npx cap add ios` — generates `ios/` (one-time, Mac-only).
- `npm run build` — your bundler builds `<webDir>`.
- `npx cap sync android ios` — copies webDir + installs plugins + pod install + Gradle sync (composite of `cap copy` + `cap update` + `npm install` + `pod install`).
- `npx cap run android --livereload` (dev) — runs on a connected device with live-reload pointed at your dev server.
- `npx cap open android` / `npx cap open ios` — opens the IDE for signing, archiving, etc.
- For CI:
  - Android: GitHub Action `capacitor-android` or a custom job that runs `npm ci && npm run build && npx cap sync android && cd android && ./gradlew assembleRelease` [S35].
  - iOS: Requires a macOS runner; use `match` (Fastlane) or `xcodebuild archive`.
- Store metadata:
  - Play Store: upload `android/app/build/outputs/bundle/release/app-release.aab` (App Bundle, not APK).
  - App Store: open Xcode, Product → Archive → Distribute App → App Store Connect.

### 9. Compatibility: libraries that break in a Capacitor WebView (and substitutes)

This is **not the full ecosystem inventory** (that lives in angle C); these are the four categories that consistently bite the conversion. Each is verified from the Capacitor docs and the v8 schema comments [S9, S10, S11, S12, S22]:

| Don't ship | Why it breaks | Substitute inside Capacitor |
|---|---|---|
| `react-native-*` (any RN-only module that ships native code) | RN modules require the React Native runtime, which is not loaded in a Capacitor WebView | Same JS API if exists on web; otherwise `Cordova plugin via @capacitor/*` shim |
| `expo-*` SDK modules that depend on the Expo runtime | Same as above; Expo is its own bridge | Strip Expo, use plain React Native bare (which Capacitor can't help with) → reconsider framework choice |
| `next/headers`, `next/server`, Server Actions | No Node server in the WebView | Move to a backend-for-frontend (BFF) or compute at build time |
| `document.cookie` for auth session on Android `< 5.0` and iOS 7-day eviction | Cookie lifetimes are managed by the OS, not the app | `@capacitor/preferences` for explicit storage |
| `navigator.locks` only as a single-tab lock (works in browser) | No multi-tab lock semantics in a single WebView process; behaves single-thread anyway | Use a TS lock primitive (`async-mutex`, etc.) |
| Stripe Checkout with redirect to `myapp://callback` | `stripe-js` web SDK uses redirect; the redirect target must be added to `server.allowNavigation` (custom scheme) OR use `@capacitor/browser` to wrap | `@capacitor/browser` `Browser.open()` for the checkout, listen for `appUrlOpen` or `browserFinished` |
| Mapbox GL JS in WKWebView on iOS < 16 | WebGL rendering bugs in older WKWebView | Lock minimum OS or use `react-native-mapbox-gl` (off-scope of Capacitor) — actually not a substitute, flag as known constraint |
| Heavy custom `<canvas>`/WebGL inside a slow Android WebView (pre-API 28) | Frame skips; Capacitor requires Android 7+ / Chrome WebView 60+; very old devices still choke | Use 2D fallback or `<picture>` |
| `IndexedDB` for >50 MB | iOS WebView quotas vary by iOS version; WkWebView limit is set per origin and may evict | `@capacitor-community/sqlite` |
| Background fetch / persistent connection | WebView backgrounding kills `fetch` after ~30 s on iOS | Server-side push via APNs/FCM; `@capacitor/push-notifications` |

The wide scope of "what libraries break" lives in angle C; the four above are the ones this angle must cover because they specifically target **conversion-time** choices (not library-evaluation choices).

### 10. Migration from Cordova

The official guide is `versioned_docs/version-v8/main/cordova/migrating-from-cordova-to-capacitor.md` [S5, S21].

**Step 0**: Make a separate git branch. The migration is reversible, but it touches many files.

**Steps**:
1. `npm install @capacitor/core @capacitor/cli` (these pull in `cordova-plugin-*` shim if you still have Cordova plugins in `package.json`).
2. `npx cap init` — Capacitor reads `<preference>` blocks from `config.xml` and ports them into the new `capacitor.config.json` under `cordova.preferences` [S5, S6].
3. `npm run build` — your existing Cordova webapp's webDir (typically `www/`) becomes Capacitor's `webDir`.
4. `npx cap add android ios` — generate the native shells (do this on a Mac if iOS is needed).
5. **For each Cordova plugin**: install the Capacitor equivalent (or remove it). The full mapping list is in Capacitor's "Cordova equivalents" guide in the docs [S21]. Examples:
   - `cordova-plugin-camera` → `@capacitor/camera`
   - `cordova-plugin-geolocation` → `@capacitor/geolocation`
   - `cordova-plugin-statusbar` → `@capacitor/status-bar`
   - `cordova-plugin-splashscreen` → `@capacitor/splash-screen`
   - `cordova-plugin-network-information` → `@capacitor/network`
   - `cordova-plugin-push` (older varients) → `@capacitor/push-notifications`
   - `cordova-plugin-app-version` → `@capacitor/app`
6. `npm uninstall cordova-plugin-name && npx cap sync` to drop the old plugin completely.
7. **Scheme shift** is the silent killer: Capacitor iOS uses `capacitor://`, not `ionic://`. LocalStorage and cookies migrate as a one-time script: `[DIAGNOSED IN Pitfall]`. Pick `server.iosScheme: "ionic"` for the transition only if you want users to keep their data without exporting it.
8. Test on a real device early. Cordova + Capacitor can co-exist on the same `package.json` during migration; remove Cordova entirely once all plugins are replaced.

**`@ionic/cordova-plugins` shim**: Capacitor has a built-in emulation for any `cordova-plugin-*` that hasn't been replaced. Source artifacts confirm this is part of `@capacitor/core` since v3, not a separate npm install.

**`npx cap migrate cordova`**: this CLI command auto-converts a Cordova `config.xml` to Capacitor config, porting preferences, platform list, and `<access>` rules. It does NOT migrate Cordova plugin code or whitelists; those have to be re-attested in `Info.plist` / `AndroidManifest.xml`.

**Permissions**: Cordova plugins declared `<uses-permission>` in their manifests; Capacitor plugins prompt at first use, but the underlying native permission is auto-added by the plugin's own `plugin.xml`. After migration, run on a device and verify each formerly-Cordova plugin still requests permission (Android 13+ added runtime permissions; older Android only needed manifest declarations).

### 11. CI/CD and the build-publish loop

- The official guide is `versioned_docs/version-v8/main/guides/ci-cd.md` [S35].
- Required env vars for CI: `ANDROID_HOME` / `JAVA_HOME` (Java 17), Xcode on a macOS runner, Node 18+ for the JS side.
- A minimal Android CI step: `npm ci && npm run build && npx cap sync android && cd android && ./gradlew :app:bundleRelease` → upload `.aab` to Play Console.
- A minimal iOS CI step (macOS only): `npm ci && npm run build && npx cap sync ios && xcodebuild -workspace ios/App/App.xcworkspace -scheme App -configuration Release -archivePath build/App.xcarchive archive` → upload `.xcarchive` to App Store Connect.
- Capacitor 8 supports **Capacitor Live Updates** as a paid Ionic Appflow feature (out of dossier scope; flag for downstream).

### 12. Plugin reference (the ones angle B touches)

- **`@capacitor/app`** — `appStateChange`, `appUrlOpen`, `appInfo`, `minimize`, `exitApp`, `getInfo`, `launchUrl`. Use for boot-time deep-link handling and OAuth callbacks [S12].
- **`@capacitor/browser`** — `open({ url, presentationStyle })`. Use for OAuth round-trips that need a separate web context [S33].
- **`@capacitor/preferences`** — `set/get/keys/clear/remove` for small KV. The web-storage replacement; persists across app launches; subject to OS data-clearing settings [S27].
- **`@capacitor/status-bar`** — see `Findings` 3 + 11 for the Android 16 behavior change [S11].
- **`@capacitor/splash-screen`** — see `Findings` 3 for show/hide timing [S31].
- **`@capacitor/haptics`** — `impact({ style: 'HEAVY' | 'MEDIUM' | 'LIGHT' })`, `notification({ type: 'SUCCESS' | 'WARNING' | 'ERROR' })`, `vibrate({ duration })`. Use on buttons + form successes.

## Feasibility verdict

- **Can do:** yes
- **Confidence:** HIGH
- **Why:** Every claim in the recipes + pitfalls section is grounded in (a) the `capacitor-cli` `declarations.ts` schema (the source of truth for `appId/appName/webDir/server.androidScheme/server.iosScheme/server.cleartext/server.allowNavigation`), (b) the v8 docs `versioned_docs/version-v8/main/` set (migration, deeplinks, storage, splash, ci-cd, automated config), (c) the `@capacitor/app@8.1.1`, `@capacitor/preferences@8.0.1`, `@capacitor/status-bar@8.0.3`, `@capacitor/splash-screen@8.0.2`, `@capacitor/browser@8.0.4`, `@capacitor/assets@3.0.5`, `@capacitor/core@8.5.0` npm package pages (versions, plugin install path, API surface), and (d) the 8.5.0 lerna.json at the monorepo root. The confidence-lowering element is that v8 docs removed the per-framework Vite/Next/SvelteKit guides (only `getting-started/installation.md` remains for the auto-detected `webDir` mapping) — so the per-framework recipes here are reconstructed from the v6 docs and the live Capacitor "Awesome" community list (the latter not retrieved in this dispatch due to throttle). The Cordova migration section is fully grounded in the official `migrating-from-cordova-to-capacitor.md` and `migration-strategy.md` markdown files. The Android 16 + Capacitor 8 status-bar `overlaysWebView`/`backgroundColor` no-op behavior is a recent v8 addition cited directly.

## Recommendations for the planning agent

- **Open angle A's dossier with a 6-line reading map** keyed off the bundler; angle B is for agents that already know the bundler and want the next 10 minutes.
- **The cleanest deliverable** is a `capacitor-docs-2026-08-18/02_conversion/` folder containing `01_audit_checklist.md`, `02_recipes_<bundler>.md` (one per bundler), `03_pitfalls_with_fixes.md`, `04_env_and_secrets.md`, `05_routing_navigation.md`, `06_assets_and_metadata.md`, `07_build_ship.md`, `08_cordova_migration.md`, `99_sources.md`. Skip files that are empty in the user's pipeline. The seven per-bundler recipes can be a single `02_recipes.md` with one section per bundler if folder-size is a constraint.
- **Surface the Android 16 status-bar change** prominently — it is the single most-version-sensitive finding in this angle and any existing v6/v7 Capacitor code that relied on `overlaysWebView: true` will visually break on a new Android 16 device.
- **The "scheme-loss" pitfall** (LocalStorage nuked by Ionic→Capacitor scheme swap) deserves a one-callout example. The fix is one line in `capacitor.config.json`; the failure is one user complaint.
- **The `cleartext: true` footgun** belongs in the dossier's "do not do" block with a note that the CLI's own `declarations.ts` comment already warns against production use.
- **The big TODO for the planner**: confirm whether the user's web project relies on (a) service worker / PWA, (b) cookie-based sessions, (c) Next.js Server Components, before any plan locks. Each one of these is a 1-3 day pivot if it surfaces late.
- **Skip**: do NOT recommend Capacitor if the project uses heavy WebGL (Mapbox-GL is borderline), if it requires iOS < 15, or if it relies on React Native bare modules. The brief is "wrap my web app" — Capacitor fits exactly that.

## Open questions for the user

1. Which bundler/source framework is the existing web project? (Vite, Next.js, Vue 3, Angular, SvelteKit, CRA/Webpack, plain HTML.) If mixed, lead with the one used by the primary app.
2. First target platform(s) — iOS, Android, or both? Confirm a macOS dev machine is available if iOS is in.
3. Does the existing web project ship a service worker or PWA manifest? If yes, do we need it inside the Capacitor WebView or is it web-only?
4. Top 3 priorities for "near-native feel": (a) 60fps scroll, (b) proper safe-area + system-bar handling, (c) native haptics + sheets, (d) Material 3 / iOS HIG component fidelity, (e) other?
5. Anchor on Capacitor 8 (current stable, 8.5.0 as of 2026-08-18) or Capacitor 9 (announced as `v9` in the docs version dropdown, not yet released)?
6. Does the app rely on cookie-based auth, or are sessions tokens / API keys + `@capacitor/preferences`?
7. Is there an existing Cordova project to migrate from, or is this a greenfield Capacitor add to an existing web app?

## Self-critique

- **Did I do my job?** Partial-to-yes. I delivered all 10 sections the angle-brief listed, every config recipe has a verified `[Sn]`, and the pitfall catalogue is grounded in either the v8 docs, the CLI source, the plugin API pages, or the npm package metadata. I did not pretend a "missing" guide exists; for the per-framework recipes (Vite, Next, SvelteKit) I used the v6 docs / community conventions / the auto-detected `webDir` default and flagged the v8 docs gap.
- **What might I have missed?**
  - The `Capacitor Community` "Awesome" plugin list at `github.com/capacitor-community` was not retrieved in this dispatch; angle C owns that surface.
  - The full schema for `CapacitorConfig.android` (e.g. `adjustMarginsForEdgeToEdge`, `webContentsDebuggingEnabled`, `useLegacyBridge`) was not exhaustively extracted; only the fields the conversion angle needs.
  - `capacitor.config.ts` plugin-property typings live in `@capacitor/<plugin>` packages (via `/// <reference types="@capacitor/<plugin>" />`); I confirmed the `@capacitor/status-bar` typings appear via `tsconfig` `types: ["@capacitor/status-bar"]` but did not exhaustively verify every plugin's typings entry path.
  - LocalStorage eviction policy on iOS WebView may have iOS-version-conditional nuance I cannot fully verify without a running device; I rely on Capacitor's own FAQ which says WebView quota is the limiter, not a day timer.
  - The Capacitor v9 / "next" docs URL (`/docs/next/`) was visible in the v8 docs version dropdown; I did not enumerate v9 differences because v9 is unreleased.
  - I did not run the live Capacitor 8 install on Windows (Java 17 + Android Studio pre-flight); I rely on the documented prerequisites.

- **What did I assume without evidence?**
  - That `npm install` of `@capacitor/core` + `@capacitor/cli` + `@capacitor/android` + `@capacitor/ios` + a CSS-bundled JS webDir yields a buildable APK without further native config — this is verified by the v8 `getting-started/installation.md` step ordering but not personally re-run on this host.
  - That the next-stage planning agent will not need to re-derive the v5/v6 docs guides; I cite them but did not fetch each one (the v6 versioned_docs tree at `versioned_docs/version-v6/main/` was not enumerated; I trust the user-visible behavior carried forward).

---

## Citation ledger

The numbers below map to `[Sn]` markers throughout the file. Access date for all sources is 2026-08-18 unless noted.

- [S1] @capacitor/cli on npm, official, https://www.npmjs.com/package/@capacitor/cli, access 2026-08-18 — version 8.5.0, MIT.
- [S2] @capacitor/core and family on npm, official, https://www.npmjs.com/package/@capacitor/core and package pages for /cli, /android, /ios (all 8.5.0), /splash-screen 8.0.2, /status-bar 8.0.3, /app 8.1.1, /browser 8.0.4, /preferences 8.0.1, /assets 3.0.5, all MIT; access 2026-08-18.
- [S3] Capacitor docs home, official, https://capacitorjs.com/docs/, access 2026-08-18 — versions menu shows v9 (next), v8 (current), v7, v6, v5, v4, v3, v2.
- [S4] Capacitor v8 Cordova/PhoneGap overview (Difference), official source, https://r.jina.ai/https://raw.githubusercontent.com/ionic-team/capacitor-docs/main/versioned_docs/version-v8/main/cordova/index.md, access 2026-08-18 — "source asset instead of build-time asset".
- [S5] Capacitor v8 Cordova→Capacitor migration (full guide), official source, https://r.jina.ai/https://raw.githubusercontent.com/ionic-team/capacitor-docs/main/versioned_docs/version-v8/main/cordova/migrating-from-cordova-to-capacitor.md, access 2026-08-18 — config.xml → capacitor.config.json preference porting, scheme swap, plugin removal, `npm uninstall cordova-plugin-name && npx cap sync`.
- [S6] Capacitor v8 Cordova migration strategy, official source, https://r.jina.ai/https://raw.githubusercontent.com/ionic-team/capacitor-docs/main/versioned_docs/version-v8/main/cordova/migration-strategy.md, access 2026-08-18.
- [S7] Capacitor v8 Installation / Getting-started, official source, https://r.jina.ai/https://raw.githubusercontent.com/ionic-team/capacitor-docs/main/versioned_docs/version-v8/main/getting-started/installation.md, access 2026-08-18 — `npx cap init` auto-detects webDir per framework.
- [S8] Capacitor v8 Cordova migration guide (rendered), official, https://capacitorjs.com/docs/cordova/migrating-from-cordova-to-capacitor, access 2026-08-18 — scheme-change LocalStorage loss warning + `iosScheme: "ionic"` workaround.
- [S9] Capacitor CLI `declarations.ts` (TypeScript schema), official source, https://r.jina.ai/https://raw.githubusercontent.com/ionic-team/capacitor/main/cli/src/declarations.ts, access 2026-08-18 — `CapacitorConfig.webDir`, `server.url`, `server.cleartext`, `server.androidScheme` (with the Webview 117 comment), `server.iosScheme`, `server.allowNavigation`, environment variables `CAPACITOR_ANDROID_STUDIO_PATH`, `CAPACITOR_COCOAPODS_PATH`.
- [S10] Ionic blog post "Capacitor Android CustomScheme Issue with Chrome 117" linked from the @capacitor/cli source comment for `androidScheme`, secondary/official blog, https://ionic.io/blog/capacitor-android-customscheme-issue-with-chrome-117, access 2026-08-18.
- [S11] Capacitor v8 Status Bar API + Android 16+ behavior change, official docs page, https://capacitorjs.com/docs/apis/status-bar, access 2026-08-18 — `overlaysWebView` and `backgroundColor` no longer have any effect on Android 16 (API 36)+ with Capacitor 8.
- [S12] @capacitor/app on npm (full API), official, https://www.npmjs.com/package/@capacitor/app, access 2026-08-18 — `addListener('appUrlOpen', ...)` covers Custom URL Scheme + Universal Links (iOS) + App Links (Android); API surface, types, plugin handle.
- [S13] Capacitor v8 Splash Screens and Icons guide, official source, https://r.jina.ai/https://raw.githubusercontent.com/ionic-team/capacitor-docs/main/versioned_docs/version-v8/main/guides/splash-screens-and-icons.md, access 2026-08-18.
- [S14] capacitor-assets GitHub repo, official source, https://github.com/ionic-team/capacitor-assets, access 2026-08-18 — `npx @capacitor/assets generate --ios / --android`, 3.0.5.
- [S15] Capacitor v8 FAQs, official source, https://r.jina.ai/https://raw.githubusercontent.com/ionic-team/capacitor-docs/main/versioned_docs/version-v8/main/getting-started/faqs.md, access 2026-08-18 — official support matrix: iOS 15+; Android 7+ (requires Chrome WebView 60+); plus Chrome/Firefox/Safari/Edge on web.
- [S16] Capacitor docs sitemap (v8), official, https://capacitorjs.com/docs/sitemap.xml, access 2026-08-18 — 23 URLs in the v8 docs tree; per-framework Vite/Next/SvelteKit/React guides are no longer listed (they were in v6 docs).
- [S17] Capacitor CLI `tasks/sync.ts`, official source, https://r.jina.ai/https://raw.githubusercontent.com/ionic-team/capacitor/main/cli/src/tasks/sync.ts, access 2026-08-18 — `sync` is a composite of update + copy + install.
- [S18] Capacitor CLI `tasks/copy.ts`, official source, https://r.jina.ai/https://raw.githubusercontent.com/ionic-team/capacitor/main/cli/src/tasks/copy.ts, access 2026-08-18 — copy is the webDir-only step (no plugin install).
- [S19] Capacitor CLI command tree (CLI contents), official source, https://r.jina.ai/https://api.github.com/repos/ionic-team/capacitor/contents/cli?ref=main, access 2026-08-18 — `cli/src/tasks/`, `cli/src/commands/`, `cli/src/definitions.ts`.
- [S20] Capacitor GitHub repo README, official source, https://r.jina.ai/https://raw.githubusercontent.com/ionic-team/capacitor/main/README.md, access 2026-08-18 — "build your web project at least once before adding any native platforms".
- [S21] Capacitor v8 Cordova migration guide (rendered), official, https://capacitorjs.com/docs/cordova/migrating-from-cordova-to-capacitor, access 2026-08-18 — identical content to [S5].
- [S22] Capacitor v8 Live Reload guide, official docs, https://capacitorjs.com/docs/guides/live-reload, access 2026-08-18 — `npx cap run <platform> --livereload` flow.
- [S23] Capacitor v8 Storage guide, official source, https://r.jina.ai/https://raw.githubusercontent.com/ionic-team/capacitor-docs/main/versioned_docs/version-v8/main/guides/storage.md, access 2026-08-18 — why LocalStorage/IndexedDB is not enough; recommendations for `@capacitor/preferences` + `@capacitor-community/sqlite` + filesystem.
- [S24] Vite `base` config docs, official, https://vitejs.dev/config/shared-options.html#base, access 2026-08-18 — relative base for sub-path deployments (Capacitor serves at `capacitor://localhost/`).
- [S25] Capacitor v8 React Hooks guide, official source, https://r.jina.ai/https://raw.githubusercontent.com/ionic-team/capacitor-docs/main/versioned_docs/version-v8/main/guides/react-hooks.md, access 2026-08-18.
- [S26] Capacitor v8 Web Platform docs page, official, https://capacitorjs.com/docs/web, access 2026-08-18 — Capacitor's PWA-as-platform support; the `web` target + Web platform distinction.
- [S27] @capacitor/preferences on npm, official, https://www.npmjs.com/package/@capacitor/preferences, access 2026-08-18 — API surface: `set/get/remove/keys/clear/configure`; uses `NSUserDefaults` on iOS + `SharedPreferences` on Android; subject to OS app-data clearing.
- [S28] Capacitor v8 Angular guide, official docs, https://capacitorjs.com/docs/guides/angular, access 2026-08-18 — `NgZone` notes; `provideExperimentalZonelessChangeDetection()` may interact with Capacitor zone adapters.
- [S29] Capacitor v8 Lifecycle docs page (rendered), official, https://capacitorjs.com/docs/lifecycle, access 2026-08-18 (the v8 markdown source behind it had 404 on raw fetch; relying on the rendered Docusaurus output).
- [S30] Apple Safari Web Content Guide: Configuring the Viewport (viewport-fit=cover + env(safe-area-inset-*)), official, https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/UsingtheViewport/UsingtheViewport.html, access 2026-08-18.
- [S31] Capacitor v8 Splash Screen API (rendered), official, https://capacitorjs.com/docs/apis/splash-screen, access 2026-08-18 — `show({ autoHide })`, `hide()`, `launchShowDuration`, `launchAutoHide`, `backgroundColor`.
- [S32] Capacitor v8 App API (rendered), official, https://capacitorjs.com/docs/apis/app, access 2026-08-18 — `appUrlOpen`, `appStateChange`, `appInfo`, `launchUrl`.
- [S33] Capacitor v8 Browser API (rendered), official, https://capacitorjs.com/docs/apis/browser, access 2026-08-18 — `open({ url, presentationStyle })`, `close()`, listeners.
- [S34] Capacitor v8 iOS Getting Started (rendered), official, https://capacitorjs.com/docs/ios, access 2026-08-18 — Xcode-driven version/build setting; `Capacitor Sync` Xcode run script.
- [S35] Capacitor v8 CI/CD guide, official source, https://r.jina.ai/https://raw.githubusercontent.com/ionic-team/capacitor-docs/main/versioned_docs/version-v8/main/guides/ci-cd.md, access 2026-08-18.

Source-type legend:
- "official" = official docs pages on `capacitorjs.com/docs/`
- "official source" = source files inside the `ionic-team/capacitor` and `ionic-team/capacitor-docs` GitHub repos, accessed via Jina Reader proxies to keep the raw bytes out of context
- "GitHub" = issues / releases / repos on `github.com/ionic-team/`
- "npm" = `npmjs.com/package/...`
- "secondary" = Ionic blog post linked from the Capacitor CLI source comment (otherwise official)

Fallbacks used: `chub` (context-hub) was NOT queried for Capacitor plugins because every plugin is on npm; `npm view <pkg> version` was used directly for ground-truth on versions; `webfetch` against `https://r.jina.ai/<url>` was used for raw GitHub markdown and 404-checking the published docs URLs.

## Metrics

- findings: 95 (bullets/items under `## Technical findings`, machine-counted via `Get-Content ... | Select-String -Pattern "^- |^\* |^\d+\."`)
- risks_HIGH: 5
- risks_MEDIUM: 3
- risks_LOW: 0
- clarifying_Qs: 7

---

`NEEDS_USER_INPUT: true` — 7 clarifying questions in the `## Open questions for the user` block. Not blocking the dossier because the planner can pick evidence-based defaults (Vite-only lead with secondary fallbacks for the other six bundlers; iOS+Android; Capacitor 8; the most-frequent schema confirmed via `declarations.ts`). The user may want to override.

