# Conversion Guide

**Anchor version:** Capacitor `@capacitor/core@8.5.0` (npm `latest`, verified 2026-08-18). Do NOT pin `@capacitor/core@next` -- Capacitor `9.0.0-alpha.6` ships a broken iOS framework (GitHub issue #8560) and is watch-only [A-S20][B-S1].
**Audience:** Engineer converting an existing JS/TS web project to Capacitor.
**What this file covers:** pre-conversion audit, seven per-bundler recipes (Vite lead, then Next.js, Vue 3 + Vite, Angular, SvelteKit, plain Webpack/CRA, plain HTML/JS), eleven conversion pitfalls with fixes, env and secrets handling, routing in the WebView, asset management, app metadata, build and ship flow, the compatibility table of libraries that break, the Cordova migration sub-section, and a worked Vite + React + TypeScript end-to-end example. Read `02-install-and-setup.md` for the install flow itself; this file picks up where that one leaves off.

## Pre-conversion audit checklist

Run these checks before `npx cap init`. Each one is a known failure mode in the v8 docs or in the CLI's own error messages [B-S9][B-S16][B-S17]. A pre-conversion project that passes all eight lands in the Capacitor WebView on the first try; one that skips any of them typically spends a day debugging "white screen on launch".

1. **Bundler outputs a `webDir` with `index.html` at its root.** Run `npm run build`, then `ls <webDir>/index.html`. If the index sits at `<webDir>/public/index.html` (some Vite scaffolds), set `webDir` to `<webDir>/public`. The CLI's `npx cap init` auto-detects per bundler [B-S7] but cross-check -- the auto-detector is a heuristic and gets edge cases wrong.
2. **Bundler `base` is RELATIVE.** Vite defaults to `base: '/'` which emits `/assets/...` paths that 404 under `capacitor://localhost` [B-S24]. Set `base: './'` (Vite), `homepage: "."` (CRA), `basePath: ''` + `assetPrefix: ''` + `output: 'export'` (Next.js), `baseHref: './'` (Angular), empty `paths.base` (SvelteKit). Absolute `base` produces the "asset 404 soup" pitfall.
3. **SPA router survives without a dev-server 404-to-index fallback.** Vue Router history mode, React Router, `@angular/router`, and SvelteKit all use `history.pushState()`. The Capacitor WebView serves `index.html` for any path that does not match a file (the bridge's `serve` does the right thing) [B-S9]. But if your dev workflow relies on a proxy that rewrites unknown paths to `index.html`, that proxy is gone in the WebView -- the SPA router must own the routing.
4. **No service worker that the WebView can hijack.** If the existing project ships a PWA `service-worker.js`, conditionally `navigator.serviceWorker.register(...)` only when `Capacitor.isNativePlatform() === false`. The Android WebView always appends `; wv)` to the UA so a UA check is the reliable gate [B-S25][B-S26]. Ship without an SW inside the native build by default; the WebView already caches the bundled assets aggressively.
5. **Auth tokens are not in `document.cookie`.** iOS WKWebView does not persist 3rd-party cookies; first-party cookies under the bundled origin persist until the user clears Safari data, but the persistence is OS-managed, not app-managed. For sessions longer than a day, prefer `@capacitor/preferences` (KV) or a server-side session token rehydrated at boot [B-S27].
6. **No heavy reliance on `localStorage` for >5 MB.** iOS WKWebView LocalStorage is limited to roughly 5-10 MB and is the flakier surface [B-S23][B-S27]. For >5 MB, switch to `@capacitor-community/sqlite` (relational), `@capacitor/filesystem` (blobs + JSON), or Dexie (IndexedDB on web, with the caveat that IndexedDB-on-CDN-origin does not survive a cold-cache).
7. **`IndexedDB` origin is `capacitor://localhost` (iOS) / `https://localhost` (Android).** Multiple Capacitor apps from the same vendor (dev + prod side-by-side) partition IndexedDB by origin so they do not collide [B-S9]. Cordova apps that used `ionic://localhost` lose IndexedDB on first Capacitor launch unless `server.iosScheme: "ionic"` is preserved during migration (see `## Cordova migration`).
8. **Native deps from `node_modules` are limited to packages with `@capacitor/*` plugins or to pure-JS UI libs.** `react-native-*` and `expo-*` SDK modules require the React Native runtime which is not loaded in a Capacitor WebView. Plain UI deps (React, Vue, Tailwind, GSAP, RxDB, Three.js, Mapbox GL) work as-is in the WebView; Cordova plugins without Capacitor equivalents require the Cordova compat shim and may not work without `cordova-plugin-*` left in `package.json`.

If any item is a "no", fix the project before adding Capacitor. Each "no" has a documented fix in the per-bundler recipe below; the most common one is item 2 (`base: './'`).

## Bundler recipes index

The seven per-bundler recipes live in the next section. Pick the bundler that matches the existing project; if the project uses several, lead with the one used by the primary app and reuse the same `base`/SPA-router discipline for the others.

| Bundler | Sub-section | Default `webDir` | Notable gotcha |
|---------|-------------|------------------|----------------|
| Vite (React, Vue, Svelte, Solid, Lit, vanilla) | [Vite](#vite-react--vue--svelte--solid--lit--vanilla) | `dist` | `base: './'` is mandatory; default `/` emits `/assets/...` paths that 404 |
| Next.js (static export only) | [Next.js](#nextjs-static-export-only) | `out` | No Node server in the WebView; no `next/headers`, no Route Handlers, no Server Actions |
| Vue 3 + Vite | [Vue 3 + Vite](#vue-3--vite) | `dist` | Same Vite recipe; vue-router history mode works because all routes resolve to one `index.html` |
| Angular CLI 17+ | [Angular CLI 17+](#angular-cli-17) | `www` | `baseHref: './'` + AOT + bundle-budget bumps + no `provideServerRendering()` |
| SvelteKit | [SvelteKit](#sveltekit) | `build` | Must be fully static (`adapter-static`); `fallback: 'index.html'` for SPA routing |
| Plain Webpack / CRA (sunset) | [Plain Webpack / CRA](#plain-webpack--cra) | `build` | CRA is sunset by React team; "migrate to Vite" is the recommendation |
| Plain HTML / JS (no bundler) | [Plain HTML / JS](#plain-html--js) | folder containing `index.html` | No bundler config to change; relative `<script type="module">` paths |

## Per-bundler recipes

### Vite (React / Vue / Svelte / Solid / Lit / Vanilla)

Vite is the lead bundler for new Capacitor projects; the `@capacitor/*` packages are tested against Vite, the auto-detected `webDir` is `dist`, and the build pipeline is the smallest. The recipe below is the minimum config a Vite + Capacitor project needs.

#### Overview

Vite emits a static bundle into `dist/` by default. For Capacitor, the only required change is `base: './'` so the emitted asset paths are relative (`./assets/...` instead of `/assets/...`). Without this change the WebView loads `capacitor://localhost/index.html` and the JS bundles fail with `Failed to load module script: Expected a JavaScript module script but the server responded with a MIME type of text/html` -- the classic white screen. The `assetsInlineLimit: 0` keeps assets as separate files (some image-heavy Capacitor plugins assume `Resources/<name>` exists on disk). `sourcemap: false` prevents shipping sourcemaps to the App Store [B-S24].

#### Bundler config

```ts
// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',                  // critical for Capacitor
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsInlineLimit: 0,      // keep assets as separate files
    sourcemap: false,          // don't ship sourcemaps to App Store
    rollupOptions: {
      output: { manualChunks: undefined }
    }
  }
});
```

For a React + Vite project, add `@vitejs/plugin-react`. For Vue + Vite, add `@vitejs/plugin-vue`. The Capacitor integration does not care which Vite plugin chain you run; only `base` and the `build` block matter.

#### Capacitor config

```ts
// capacitor.config.ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Example',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    cleartext: false
  }
};

export default config;
```

The `server.androidScheme: 'https'` is the secure default; setting it to anything other than `http` or `https` on Chrome WebView 117+ breaks URL-path rewriting and "may leave your app unable to resolve routing" [B-S10]. Do not change `iosScheme` unless migrating from Cordova (see `## Cordova migration`).

#### Asset path gotcha

The single most common Vite + Capacitor failure is `base: '/'` (the Vite default) emitting `/assets/index-abc123.js`. The WebView loads `https://localhost/index.html` (Android) or `capacitor://localhost/index.html` (iOS) and the browser tries to fetch `/assets/index-abc123.js` against that origin -- the request resolves to a 404 because the WebView does not serve from `/`. Set `base: './'` and Vite emits `./assets/index-abc123.js`, which the browser resolves relative to the document URL and finds the file.

#### Routing / serving note

Vite + a history-mode SPA router (Vue Router, React Router) works inside the Capacitor WebView because every URL the router navigates to resolves to the same `index.html`. The Capacitor bridge's static-file `serve` does not implement SPA fallback the way a dev server does -- it just serves the literal file at the literal path. SPA routing works because the router reads `window.location.pathname` after the WebView serves `index.html`, not because the WebView did any rewriting. The one pitfall is deep links from outside the app (e.g. a notification taps opens `myapp://route/x`); handle those with `@capacitor/app` `addListener('appUrlOpen', ...)` at boot [B-S12].

#### Commands

```bash
# Inside the Vite project
npm i @capacitor/core
npm i -D @capacitor/cli
npm i @capacitor/android @capacitor/ios

npx cap init "Example" com.example.app --web-dir=dist

npm run build
npx cap add ios
npx cap add android
npx cap sync
```

After the first sync, iterate with `npm run build && npx cap copy` (faster than `sync` -- the latter also re-installs plugins and re-syncs Gradle/SPM deps, which you only need after a plugin add or upgrade) [A-S12][A-S13].

### Next.js (static export only)

Next.js is the most painful bundler to convert because the framework assumes a Node server in the production deployment model. Capacitor's WebView is a static file server; every Next.js feature that requires a Node process does not work.

#### Overview

Capacitor supports Next.js **only via `output: 'export'`** (the static HTML export). The export step pre-renders every reachable page into `out/`; the WebView serves `out/` as a flat static site. The framework features that disappear with the static export: `next/headers`, Route Handlers (`app/api/*/route.ts`), Server Actions, `middleware.ts`, `getServerSideProps`, image optimization, dynamic route rewrites, and `next/link` prefetch. The recommended pattern is App Router with full `'use client'` components -- treat Next as a build tool that produces a SPA bundle, not as a framework that runs server code [B-S7].

#### Bundler config

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

The `trailingSlash: true` is the SPA-style fallback -- it makes every route end in `/index.html` so the WebView's static serve finds a literal file. Without it, dynamic routes like `/blog/[slug]` either pre-generate (must list every slug in `generateStaticParams`) or 404.

#### Capacitor config

```ts
// capacitor.config.ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Example',
  webDir: 'out'               // Next.js static export output
};

export default config;
```

#### Asset path gotcha

`next/image` does not work without a server. The `images.unoptimized: true` setting above makes `next/image` render as a plain `<img>`; you lose responsive `sizes`/`srcSet` behavior. If you need responsive images in the WebView, use plain `<img>` with a hand-rolled `srcSet` or a third-party loader.

#### Routing / serving note

**Hard blockers** (Next.js features that DO NOT work in Capacitor because there is no Node server):
- All `next/headers` APIs (`cookies()`, `headers()`).
- All Route Handlers (`app/api/*/route.ts`).
- All Server Actions.
- Middleware (`middleware.ts`).
- `getServerSideProps` / `getStaticProps` with `revalidate`.
- Image optimization (`next/image` falls back to a plain `<img>` because of `images.unoptimized: true`).
- `next/link` prefetch (the prefetch hits the dev server).
- Dynamic routes that depend on rewrites (e.g. `/blog/[slug]` rewrites); static export pre-generates them, and dynamic params 404 in the WebView unless `generateStaticParams` covers every route or `dynamicParams: false`.

Deep links from outside the app (e.g. a notification opens `myapp://route/x`) need `@capacitor/app` `addListener('appUrlOpen', ...)` plus a Next.js client-side router push to the destination route [B-S12].

#### Commands

```bash
# Inside the Next.js project
npm i @capacitor/core
npm i -D @capacitor/cli
npm i @capacitor/android @capacitor/ios

npx cap init "Example" com.example.app --web-dir=out

npm run build                   # runs `next build` which writes `out/`
npx cap add ios
npx cap add android
npx cap sync
```

The `npm run build` step is what produces `out/`. The Next.js `build` script is unchanged from the web project -- the only project-local change is `next.config.js`.

### Vue 3 + Vite

#### Overview

Vue 3 + Vite uses the Vite recipe above verbatim. The vue-router history mode works inside the Capacitor WebView because all routes resolve to one `index.html` and the router reads `window.location.pathname` after the WebView serves the document [B-S9]. No extra Capacitor config beyond the Vite recipe.

#### Bundler config

```ts
// vite.config.ts (Vue 3 variant)
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: './',
  plugins: [vue()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsInlineLimit: 0,
    sourcemap: false
  }
});
```

#### Capacitor config

```ts
// capacitor.config.ts (Vue 3)
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Example',
  webDir: 'dist'
};

export default config;
```

#### Asset path gotcha

Same as the Vite recipe: `base: '/'` produces absolute paths. Set `base: './'`. Vue single-file components (`<template>`, `<script>`, `<style>`) compile to a single JS chunk that the WebView serves the same way Vite serves it -- no special handling needed.

#### Routing / serving note

```ts
// router.ts (Vue 3 + vue-router)
import { createRouter, createWebHistory } from 'vue-router';
import { Capacitor } from '@capacitor/core';

const router = createRouter({
  history: createWebHistory(),
  routes: [/* ... */]
});

// Boot-time deep-link handler
import { App } from '@capacitor/app';
App.addListener('appUrlOpen', (event) => {
  // event.url is the custom-scheme or universal-link URL
  // parse the path and push to the SPA router
});
```

`vue-router` history mode uses `history.pushState()`, which the WebView preserves across in-app navigation. Custom URL schemes (`myapp://route/x`) hit the `appUrlOpen` listener; universal links (iOS) and app links (Android) hit the same listener [B-S12].

#### Commands

```bash
npm i @capacitor/core
npm i -D @capacitor/cli
npm i @capacitor/android @capacitor/ios

npx cap init "Example" com.example.app --web-dir=dist

npm run build
npx cap add ios
npx cap add android
npx cap sync
```

Same as the Vite recipe. No Vue-specific extras.

### Angular CLI 17+

#### Overview

Angular CLI emits into `dist/<project-name>/browser/` by default (since v17); the older single-folder output (`dist/<project-name>/`) is deprecated. Capacitor's auto-detector picks `www` for Angular projects [B-S7]; for a v17+ project, set `webDir` to the actual browser output path or override the build to emit directly into `www/`. The two configuration items that bite an Angular + Capacitor project are bundle budgets and AOT mode.

#### Bundler config

```json
// angular.json (under projects.<app>.architect.build.options)
{
  "outputPath": "www",
  "baseHref": "./",
  "assets": ["src/favicon.ico", "src/assets"],
  "styles": ["src/styles.css"],
  "scripts": [],
  "budgets": [
    { "type": "initial", "maximumWarning": "1mb", "maximumError": "3mb" }
  ]
}
```

Critical Angular settings:
- `baseHref: './'` (Angular CLI auto-fills `<base href>` in `index.html`; this is the Angular-side equivalent of Vite's `base: './'`).
- Bundle budget: Angular apps overshoot 1 MB without `outputHashing: "all"` budget errors; bump to 3-5 MB warning / 6 MB error, then trim with route-level lazy loading.
- AOT is mandatory (Angular CLI default since v9); JIT does not work in the WebView because of CSP on `file://` and `capacitor://`.
- Do not use `provideServerRendering()` -- pure SPA only.

#### Capacitor config

```ts
// capacitor.config.ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Example',
  webDir: 'www'
};

export default config;
```

#### Asset path gotcha

Angular CLI emits `<base href="./">` into `index.html`; the asset paths in your components are relative to that base. The combination of `baseHref: './'` + relative component paths (`'./assets/logo.png'`, `'src/assets/logo.png'` in templates) works inside the WebView. The one failure mode is a component that uses `import.meta.url`-style asset references (a custom Webpack loader or a non-CLI build); these resolve to `file://` paths that the WebView cannot serve.

#### Routing / serving note

Angular Router (the default in CLI 17+) uses `PathLocationStrategy` (HTML5 history mode) by default. Every route resolves to `index.html` in the WebView; the router reads `window.location.pathname` and routes accordingly. Two `NgZone` gotchas are documented specifically for Capacitor [B-S28]:
- `provideExperimentalZonelessChangeDetection()` may break `@capacitor/core`'s zone-based Promise bridge; keep `NgZone` until v8 plugin zone adapters land.
- Heavy `ngAfterViewInit` work that re-renders the layout can fight with the WebView's gesture-state machine; defer to `requestAnimationFrame` once per tick.

#### Commands

```bash
npm i @capacitor/core
npm i -D @capacitor/cli
npm i @capacitor/android @capacitor/ios

npx cap init "Example" com.example.app --web-dir=www

npm run build                   # runs `ng build`, writes to www/
npx cap add ios
npx cap add android
npx cap sync
```

### SvelteKit

#### Overview

SvelteKit must be fully static (no SSR) to ship as a Capacitor app. The `@sveltejs/adapter-static` adapter produces a `build/` directory of pre-rendered HTML + JS + CSS; the WebView serves `build/` the same way it serves a Vite `dist/`. SvelteKit auto-registers a service worker if `src/service-worker.{js,ts}` exists; gate that registration on `Capacitor.isNativePlatform()` so the SW does not hijack the Capacitor WebView [B-S25].

#### Bundler config

```js
// svelte.config.js
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      fallback: 'index.html'   // SPA fallback for unknown paths
    })
  }
};

export default config;
```

The `fallback: 'index.html'` option is what allows SPA-style routing for any unknown path; without it the WebView shows a 404 on deep links.

#### Capacitor config

```ts
// capacitor.config.ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Example',
  webDir: 'build'
};

export default config;
```

#### Asset path gotcha

`paths.base` is empty by default in SvelteKit; setting it to anything other than `''` breaks relative asset paths in Capacitor. If you have `paths.base: '/docs/'` from a documentation site, drop it before adding Capacitor.

#### Routing / serving note

SvelteKit's `fallback: 'index.html'` is the SPA fallback. Any path that does not match a pre-rendered page returns `index.html`; the SvelteKit client router takes over from `window.location.pathname`. Deep links from outside the app (a notification taps `myapp://route/x`) hit `@capacitor/app` `addListener('appUrlOpen', ...)` and the client router pushes to the route [B-S12].

`src/service-worker.{js,ts}` should NOT be registered when `Capacitor.isNativePlatform() === true`; SvelteKit auto-registers if the file exists, and the auto-registration does not know about the WebView context. Gate manually:

```ts
// src/service-worker.ts (or .js)
import { Capacitor } from '@capacitor/core';

if (Capacitor.isNativePlatform()) {
  // do not register the service worker
} else {
  // register normally for web
  self.addEventListener('fetch', /* ... */);
}
```

#### Commands

```bash
npm i @capacitor/core
npm i -D @capacitor/cli
npm i @capacitor/android @capacitor/ios

npx cap init "Example" com.example.app --web-dir=build

npm run build                   # runs `vite build` via SvelteKit, writes to build/
npx cap add ios
npx cap add android
npx cap sync
```

### Plain Webpack / CRA

#### Overview

Create React App was sunset by the React team in February 2025; the React docs now point at Vite-based community scripts as the recommended replacement. Hard recommendation: port to Vite first, then add Capacitor (see the "Migrate to Vite" mini-recipe below). If you must stay on CRA or on a hand-rolled Webpack config, the minimum change is `"homepage": "."` in `package.json` (CRA's equivalent of Vite's `base: './'`) [B-S7]. For a hand-rolled Webpack config, set `output.publicPath: ''` and `output.assetModulePublicPath: ''`.

#### Bundler config (CRA in-place)

```json
// package.json
{
  "name": "my-app",
  "homepage": ".",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test"
  }
}
```

If you need finer control (custom Webpack), use `react-app-rewired` with a `config-overrides.js` that exports the Webpack tweaks.

#### Bundler config (plain Webpack 5)

```js
// webpack.config.js (production + Capacitor)
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'assets/[name].[contenthash:8].js',
    chunkFilename: 'assets/[name].[contenthash:8].chunk.js',
    publicPath: '',                // relative; critical for Capacitor
    clean: true
  },
  resolve: { extensions: ['.tsx', '.ts', '.jsx', '.js'] },
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'public/index.html' })
  ]
};
```

#### Capacitor config

```ts
// capacitor.config.ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Example',
  webDir: 'build'                 // CRA default output
};

export default config;
```

#### Asset path gotcha

CRA defaults to `homepage: '/'`; without `"homepage": "."` the emitted `index.html` references `/static/js/main.abc123.js` and the WebView 404s. Hand-rolled Webpack with `publicPath: '/'` has the same problem; set `publicPath: ''` to get relative paths.

#### Routing / serving note

CRA does not ship a router; if you added React Router, history mode works because every URL resolves to one `index.html` (same as Vite + vue-router). Deep links from outside the app hit `@capacitor/app` `addListener('appUrlOpen', ...)` and you push the path through React Router [B-S12].

#### Migrate to Vite (mini-recipe)

If the project is plain CRA (no `react-app-rewired` customizations, no `src/setupTests.js` Jest overrides, no `craco`), porting to Vite takes 30-60 minutes of config edits:

1. `npm i -D vite @vitejs/plugin-react`.
2. Create `vite.config.ts` mirroring the CRA `base`, `build`, `resolve` settings (use the Vite recipe above; `base: './'`).
3. Rename `src/index.js` to `src/index.tsx` (or keep `.js`).
4. Move `tsconfig.json` paths into `vite.config.ts`'s `resolve.alias`.
5. Drop `react-scripts` from `package.json`; replace `start`/`build` scripts with `vite` and `vite build`.
6. Replace Jest with Vitest (`npm i -D vitest`) -- Vitest uses the same `describe`/`it` API as Jest, so most tests port unchanged.
7. Run `npm run build` and verify `dist/index.html` exists and the bundle paths are relative.

The Webpack-scripts version `5.0.1` (CRA's underlying bundler) is no longer being kept in sync with security patches, so the Vite migration is also a security upgrade.

#### Commands

```bash
npm i @capacitor/core
npm i -D @capacitor/cli
npm i @capacitor/android @capacitor/ios

npx cap init "Example" com.example.app --web-dir=build

npm run build
npx cap add ios
npx cap add android
npx cap sync
```

### Plain HTML / JS

#### Overview

If the project is plain HTML + CSS + vanilla JS (no bundler, no transpiler), Capacitor wraps the folder directly. Set `webDir` to the folder that contains `index.html`; the CLI copies the whole folder into the native bundle. Use `<script type="module" src="./main.js">` to keep relative paths inside the WebView.

#### Bundler config

No bundler config to change. The folder layout is the project layout.

```
my-app/
  index.html
  main.js
  styles.css
  assets/
    logo.png
```

#### Capacitor config

```ts
// capacitor.config.ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Example',
  webDir: 'app'             // the folder containing index.html
};

export default config;
```

If `index.html` sits at the project root, set `webDir: '.'`. The CLI's auto-detector picks `.` when no other bundler signature is found [B-S7].

#### Asset path gotcha

Relative paths are mandatory. `<script src="/main.js">` (absolute) 404s; `<script src="./main.js">` (relative) works. Same for `<link href="./styles.css">`, `<img src="./assets/logo.png">`, and `fetch('./data.json')`. If the existing project uses absolute paths because it lived at a CDN root, switch to relative before adding Capacitor.

#### Routing / serving note

No SPA router in plain HTML. If you need multi-page navigation, either (a) link between literal HTML files (`<a href="./about.html">`), or (b) add a tiny client-side router (the `10-line History API` pattern). The WebView serves any literal file in `webDir/` at its literal path; there is no SPA fallback unless you add one.

Deep links from outside the app (`myapp://route/x`) hit `@capacitor/app` `addListener('appUrlOpen', ...)`; parse the URL and either navigate to a literal HTML file or use the History API to update `window.location.pathname` [B-S12].

#### Commands

```bash
npm init -y
npm i @capacitor/core
npm i -D @capacitor/cli
npm i @capacitor/android @capacitor/ios

npx cap init "Example" com.example.app --web-dir=.

npx cap add ios
npx cap add android
npx cap sync
```

No `npm run build` step -- the folder is the bundle.

## Common conversion pitfalls with solutions

The eleven pitfalls below are the ones that recur in real conversion projects. Each one names the symptom, the root cause, the fix (with code), and the URL the fix is verified at. Severity tags follow the angle-B HIGH/MEDIUM classification [B-S5][B-S7][B-S11][B-S12][B-S22][B-S24][B-S27].

### Pitfall 1 -- White screen on launch

- **Severity:** HIGH
- **Symptom:** App launches, splash hides, WebView is white. No error in the native log; no JS console output.
- **Root cause:** Three possibilities, in order of frequency:
  1. `webDir` points at the wrong folder (or is empty). `npx cap init`'s auto-detector is a heuristic and gets edge cases wrong [B-S7].
  2. Bundler `base` is absolute (`/`). The emitted `/assets/...` paths 404 under `capacitor://` [B-S24].
  3. SPA router does not mount at boot, so `capacitor://localhost/route/x` serves `index.html` but the router does not route to `/route/x`.
- **Fix:**
  1. `npx cap init` then inspect `capacitor.config.ts` for `webDir`. Confirm `npm run build && ls <webDir>/index.html` produces the expected `index.html`.
  2. Set `base: './'` (Vite), `"homepage": "."` (CRA), `baseHref: './'` (Angular), empty `paths.base` (SvelteKit), `output.publicPath: ''` (Webpack).
  3. Mount the SPA router at boot; verify deep-link routing with `@capacitor/app` `addListener('appUrlOpen', ...)` [B-S12].
- **Verified at:** [B-S22][B-S24][B-S9]

### Pitfall 2 -- Asset 404 soup

- **Severity:** HIGH
- **Symptom:** WebView console shows `Failed to load resource: the server responded with a status of 404 (Not Found)` for every JS chunk, CSS file, and image. The "white screen" symptom is usually this.
- **Root cause:** Bundler `base` is absolute; the WebView cannot serve from `/`. The static-export frameworks (Next.js, Vite without `base: './'`, CRA without `homepage: "."`) emit absolute paths like `/static/js/main.abc123.js` and Capacitor serves them at `capacitor://localhost/static/js/...` where they 404 [B-S24].
- **Fix:** Set relative `base` in every bundler. The per-bundler recipes above have the exact config snippet.
- **Verified at:** [B-S24]

### Pitfall 3 -- Cordova to Capacitor scheme swap silently nukes LocalStorage / IndexedDB

- **Severity:** HIGH
- **Symptom:** Users migrate from a Cordova app (origin `ionic://localhost`) to Capacitor (origin `capacitor://localhost`) and on first launch all their LocalStorage data, IndexedDB databases, and cookies are gone.
- **Root cause:** Web storage is partitioned by origin. The Capacitor iOS scheme is `capacitor://`; Cordova with `cordova-plugin-ionic-webview` defaults to `ionic://`. The origin change means every `localStorage.setItem` from the old app is in a different bucket from the new app [B-S5][B-S8].
- **Fix:** For a transition-only period, set `server.iosScheme: "ionic"` in `capacitor.config.ts` so the WebView serves at the old origin and existing data persists. New Capacitor-only projects should never set `iosScheme` away from the default `capacitor`.
  ```ts
  // capacitor.config.ts (transition only)
  const config: CapacitorConfig = {
    appId: 'com.example.app',
    appName: 'Example',
    webDir: 'dist',
    server: { iosScheme: 'ionic' }
  };
  ```
  If you cannot preserve the old origin, run a one-shot migration script that reads from the old storage and writes to the new.
- **Verified at:** [B-S5][B-S8]

### Pitfall 4 -- Edge-to-edge breakage on Android 16 (API 36)

- **Severity:** HIGH
- **Symptom:** App that depended on `@capacitor/status-bar` `overlaysWebView: true` + `backgroundColor` for layout silently breaks on Android 16+ devices. The WebView ignores both settings; content renders behind the status / navigation bar.
- **Root cause:** Android 16 enforces edge-to-edge for all apps targeting API 36+. Capacitor 8 documents this explicitly: `overlaysWebView` and `backgroundColor` no longer have any effect on Android 16 (API 36) + Capacitor 8 [B-S11]. Existing code does not fail because the option block still parses -- the visual break only shows on a real device running API 36+.
- **Fix:** Use `env(safe-area-inset-*)` CSS padding for the safe-area layout, and do not rely on `overlaysWebView` + `backgroundColor` for Android 16+:
  ```css
  /* styles.css */
  .app-header {
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
  }
  ```
  Make sure `<meta name="viewport" content="viewport-fit=cover, ...">` is in `index.html`; without `viewport-fit=cover`, the `env(safe-area-inset-*)` values resolve to `0` even on iPhones with notches [B-S30].
- **Verified at:** [B-S11][B-S30]

### Pitfall 5 -- Status bar wrong color or overlaps content

- **Severity:** MEDIUM
- **Symptom:** Status bar is the wrong color (white icons on white background, dark icons on dark background), or content renders under the status bar.
- **Root cause:** `@capacitor/status-bar` is configured but never updated when the OS theme changes, or `setOverlaysWebView({ overlay: true })` is set without the matching `padding-top: env(safe-area-inset-top)` in CSS [B-S11].
- **Fix:**
  ```ts
  import { StatusBar, Style } from '@capacitor/status-bar';

  // Initial setup
  await StatusBar.setStyle({ style: Style.Dark });   // light text on dark background
  await StatusBar.setBackgroundColor({ color: '#0b0b0f' });
  await StatusBar.setOverlaysWebView({ overlay: false });

  // Follow OS theme changes
  const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  await StatusBar.setStyle({ style: dark ? Style.Dark : Style.Light });
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', async (e) => {
    await StatusBar.setStyle({ style: e.matches ? Style.Dark : Style.Light });
  });
  ```
  On Android 16+ the `backgroundColor` + `overlaysWebView` calls are no-ops; rely on `env(safe-area-inset-*)` for the layout instead [B-S11].
- **Verified at:** [B-S11][B-S29]

### Pitfall 6 -- Safe-area-inset not respected

- **Severity:** MEDIUM
- **Symptom:** Content renders under the iPhone notch / Android cutout. Buttons at the bottom of the screen are unreachable behind the home indicator.
- **Root cause:** `<meta name="viewport">` is missing `viewport-fit=cover`, so the `env(safe-area-inset-*)` values resolve to `0` even on iPhones with notches [B-S30].
- **Fix:** Add the viewport meta tag and use the env() values:
  ```html
  <!-- index.html -->
  <meta name="viewport" content="viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0" />
  ```
  ```css
  /* styles.css */
  .top-bar    { padding-top: env(safe-area-inset-top); }
  .bottom-bar { padding-bottom: env(safe-area-inset-bottom); }
  .left-pad   { padding-left: env(safe-area-inset-left); }
  .right-pad  { padding-right: env(safe-area-inset-right); }
  ```
- **Verified at:** [B-S30]

### Pitfall 7 -- Dark mode not following OS

- **Severity:** MEDIUM
- **Symptom:** App is light mode when the OS is in dark mode (or vice versa). Status bar icons stay the wrong color after a theme change.
- **Root cause:** The app reads `(prefers-color-scheme: dark)` at boot only, and never updates the status bar / chrome when the OS theme changes. The Status Bar `style` is set once and never refreshed [B-S11].
- **Fix:**
  ```ts
  // theme.ts
  import { StatusBar, Style } from '@capacitor/status-bar';

  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  const apply = async () => {
    document.documentElement.dataset.theme = mq.matches ? 'dark' : 'light';
    await StatusBar.setStyle({ style: mq.matches ? Style.Dark : Style.Light });
  };
  mq.addEventListener('change', apply);
  await apply();
  ```
  Pair with CSS custom properties (`--bg`, `--fg`) keyed off `data-theme` for a complete theme flip.
- **Verified at:** [B-S11]

### Pitfall 8 -- Splash screen gone too fast (or too slow)

- **Severity:** MEDIUM
- **Symptom:** Splash hides before the SPA hydrates and the user sees a white flash; or splash stays visible long after the app is ready.
- **Root cause:** `launchAutoHide: true` (default) hides the splash after `launchShowDuration` ms (default 3000) regardless of app readiness. The right time to hide is after the SPA's first paint, not after `DOMContentLoaded` [B-S31].
- **Fix:**
  ```ts
  // capacitor.config.ts
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,           // disable auto-hide; manage manually
      launchAutoHide: false,
      backgroundColor: '#0b0b0f',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false
    }
  }
  ```
  ```ts
  // app.ts (after the first paint)
  import { SplashScreen } from '@capacitor/splash-screen';

  window.addEventListener('load', async () => {
    await SplashScreen.hide({ fadeOutDuration: 250 });
  });
  ```
- **Verified at:** [B-S31]

### Pitfall 9 -- Storage limits on iOS (LocalStorage / IndexedDB eviction)

- **Severity:** MEDIUM
- **Symptom:** Data the user saved yesterday is gone today. Or the WebView console shows `QuotaExceededError` on `localStorage.setItem`.
- **Root cause:** LocalStorage in `WKWebView` is limited to roughly 5-10 MB and is evicted aggressively (Safari's 7-day policy for "never visited" tabs applies to the WebView's local data too in some iOS versions). IndexedDB has per-origin quotas that vary by iOS version; on older iOS the quota is small and the app silently fails to persist [B-S23][B-S27].
- **Fix:** Use the right storage primitive for the data size:
  - **Small KV (< 100 KB):** `@capacitor/preferences` (NSUserDefaults on iOS, SharedPreferences on Android, localStorage on web) [B-S27].
  - **Relational / structured data (> 5 MB):** `@capacitor-community/sqlite` or RxDB + a Capacitor adapter.
  - **Blobs (images, video, audio):** `@capacitor/filesystem` with a base64 or a file path.
  ```ts
  import { Preferences } from '@capacitor/preferences';
  await Preferences.set({ key: 'session-token', value: token });
  const { value } = await Preferences.get({ key: 'session-token' });
  ```
- **Verified at:** [B-S23][B-S27]

### Pitfall 10 -- Deep links / Universal Links / App Links not firing

- **Severity:** HIGH
- **Symptom:** User taps a link to `myapp://route/x` from outside the app (an email, a notification, another app) and nothing happens. Or the app launches but the user lands on the home screen, not the deep-link destination.
- **Root cause:** Either (a) the custom URL scheme is not registered in `Info.plist` (iOS) and `AndroidManifest.xml` (Android), or (b) the `@capacitor/app` `appUrlOpen` listener is not registered at boot, or (c) the listener fires but the SPA router does not navigate to the path [B-S12].
- **Fix:** Register the scheme in the native config and the listener at boot:
  ```xml
  <!-- ios/App/App/Info.plist (add CFBundleURLTypes) -->
  <key>CFBundleURLTypes</key>
  <array>
    <dict>
      <key>CFBundleURLName</key>
      <string>com.example.app</string>
      <key>CFBundleURLSchemes</key>
      <array>
        <string>myapp</string>
      </array>
    </dict>
  </array>
  ```
  ```xml
  <!-- android/app/src/main/AndroidManifest.xml (inside <activity>) -->
  <intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="myapp" />
  </intent-filter>
  ```
  ```ts
  // app.ts
  import { App } from '@capacitor/app';

  App.addListener('appUrlOpen', (event) => {
    const path = new URL(event.url).pathname;
    router.push(path);
  });
  ```
  iOS Universal Links and Android App Links use the same `appUrlOpen` listener; the only difference is the `<data>` element (`<data android:scheme="https" android:host="example.com" />` for App Links) [B-S12].
- **Verified at:** [B-S12]

### Pitfall 11 -- OAuth / authentication redirect loses state

- **Severity:** HIGH
- **Symptom:** User signs in with Google / Apple / Auth0 / etc., the OAuth provider redirects back to the app, the WebView lands on `myapp://callback?code=...` but the user is "logged out forever" because the code was not exchanged for a token.
- **Root cause:** The redirect target is registered as a deep link (`myapp://callback`) but the `@capacitor/app` `appUrlOpen` listener is not registered, OR the redirect target is registered as a `https://` link and the WebView does not navigate to it because `server.allowNavigation` does not include the OAuth provider's host [B-S12][B-S33].
- **Fix:** Use `@capacitor/browser` for the OAuth round-trip and the `appUrlOpen` listener for the custom-scheme callback:
  ```ts
  import { Browser } from '@capacitor/browser';
  import { App } from '@capacitor/app';

  // Open the OAuth flow in a system browser
  await Browser.open({ url: 'https://auth.example.com/authorize?...' });

  // The provider redirects to myapp://callback?code=...
  // Listen for the deep link at boot
  App.addListener('appUrlOpen', async (event) => {
    const url = new URL(event.url);
    if (url.host === 'callback') {
      const code = url.searchParams.get('code');
      const token = await exchangeCodeForToken(code);
      await Preferences.set({ key: 'session-token', value: token });
    }
  });
  ```
  If the OAuth provider redirects to an `https://` URL on your own domain (a backend callback), add it to `server.allowNavigation`:
  ```ts
  server: {
    allowNavigation: ['auth.example.com', 'api.example.com']
  }
  ```
- **Verified at:** [B-S12][B-S33]

## Env & secrets handling

Capacitor has no built-in `env:` block. `capacitor.config.ts` is a typed TS object with no substitution; the values are constants. The valid paths for env-driven configuration:

| Bundler | Env prefix | Where to set | Build-time vs runtime |
|---------|-----------|--------------|------------------------|
| Vite | `VITE_*` | `.env`, `.env.production` (loaded by Vite) | Build-time: `import.meta.env.VITE_API_URL` is inlined at build |
| Next.js (static export) | `NEXT_PUBLIC_*` | `.env.local`, `.env.production` | Build-time: `process.env.NEXT_PUBLIC_*` is inlined |
| Angular | `environment.ts` + `fileReplacements` in `angular.json` | Per-target swap, then build | Build-time |
| CRA | `REACT_APP_*` | `.env`, `.env.production` | Build-time: `process.env.REACT_APP_*` is inlined |
| SvelteKit (static) | `$env/static/public` (PUBLIC_*) | `.env`, `.env.production` | Build-time: `import { PUBLIC_API_URL } from '$env/static/public'` |
| Generic | generator script | Writes `src/generated/env.ts` from `.env.production` | Build-time |

Example for Vite:

```bash
# .env.production
VITE_API_URL=https://api.example.com
VITE_SENTRY_DSN=https://examplePublicKey@o0.ingest.sentry.io/0
```

```ts
// src/api.ts
export const API_URL = import.meta.env.VITE_API_URL;
```

For per-target swaps (staging vs production builds from the same Capacitor project), run the build with the env file as an argument:

```bash
# Production build
VITE_API_URL=https://api.example.com npm run build && npx cap sync

# Staging build (separate appId recommended)
VITE_API_URL=https://staging.api.example.com npm run build && npx cap sync android
```

### Secrets warning

Nothing sensitive should ship in the bundle. Capacitor apps ship the JS bundle inside the IPA / APK; an App Store reviewer, a jailbroken device, or anyone with `apktool` can read it. If you must use a key in the bundle:

1. Add it to a `.env` that is `.gitignore`d, and ensure the build pipeline reads from a CI secret.
2. Accept that any App Store reviewer or jailbroken user sees it.

For local-only "feature flags" that must NOT be in production, gate at runtime via `@capacitor/preferences` rather than baking them into the bundle:

```ts
import { Preferences } from '@capacitor/preferences';
const { value: flag } = await Preferences.get({ key: 'feature-flag-x' });
if (flag === 'on') { /* ... */ }
```

## Routing & navigation in the WebView

The WebView serves the bundled `webDir/` at a scheme-locked origin. iOS defaults to `capacitor://localhost`; Android defaults to `https://localhost` (since v3, when Android WebView began rejecting non-`http`/`https` schemes) [B-S9]. Custom schemes on Android are unreliable on Chrome WebView 117+ [B-S10]. Production apps almost never set `iosScheme` away from the default.

### SPA router in history mode

`history.pushState()` works inside the WebView; the Capacitor bridge serves `index.html` for any literal file path that does not exist on disk. The SPA router reads `window.location.pathname` after the document loads and routes accordingly. This is true for Vue Router (`createWebHistory`), React Router (`createBrowserHistory`), Angular Router (`PathLocationStrategy`), and SvelteKit's client router.

If you need a deep-link to come from outside the app (a notification, an email link, a system intent), register the URL scheme in `Info.plist` and `AndroidManifest.xml` and listen with `@capacitor/app` `addListener('appUrlOpen', ...)` at boot [B-S12].

### server block for live reload

```ts
// capacitor.config.ts (dev only -- remove before shipping)
const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Example',
  webDir: 'dist',
  server: {
    url: 'http://192.168.1.42:5173',   // LAN address of the bundler dev server
    cleartext: true,                    // required for http://
    hostname: 'localhost'               // default
  }
};
```

`cleartext: true` is required because both iOS (since App Transport Security) and Android (since API 28, Android 9 Pie) block cleartext HTTP in WebViews by default. The dev server must bind to `0.0.0.0`, not `127.0.0.1`, so the device can reach it on the LAN [B-S9][B-S22].

**Never ship `server.cleartext: true` in a production build.** App Store review rejects the build because Capacitor's iOS template writes `NSAllowsArbitraryLoads = true` into `Info.plist` when cleartext is on. Remove the `server` block (or set `cleartext: false`) before the production `cap sync`.

### server.allowNavigation

The WebView is locked by default to the `capacitor://`/`https://localhost` origin. Any navigation to a different host fails silently. Use `server.allowNavigation` to allow specific external hosts (for OAuth providers, image CDNs, analytics):

```ts
server: {
  allowNavigation: [
    'auth.example.com',
    'api.stripe.com',
    'cdn.example.com'
  ]
}
```

Do NOT add a wildcard. `allowNavigation: ['*']` is a phishing vector; the WebView would happily navigate to any URL.

## Asset management

### Icons and splash via @capacitor/assets

`@capacitor/assets` (3.0.5, MIT, `ionic-team/capacitor-assets`) is the canonical icon + splash generator. It takes source PNGs from `resources/` and emits the platform-specific icon sets + splash drawables:

```bash
# One-time setup
mkdir -p resources
# Drop a 1024x1024 icon-only.png and a 2732x2732 splash.png into resources/
# (plus icon-foreground.png + icon-background.png for Android 12+ adaptive icons)

# Generate
npx @capacitor/assets generate --ios
npx @capacitor/assets generate --android
```

Default mode requires a single `resources/icon-only.png` (1024x1024) and `resources/splash.png` (2732x2732). Custom mode requires `icon-only.png` + `icon-foreground.png` + `icon-background.png` + `splash.png` + `splash-dark.png` (the dark-mode splash is optional but recommended) [B-S13][B-S14].

Android 12+ requires adaptive icons (foreground + background). Generating them once is more work than dropping a single PNG; without them the launcher icon renders as a flat white square on Android 12+ devices.

### Local fonts

Keep them under `public/fonts/` (Vite) or `<webDir>/fonts/` and reference as `url('./fonts/...woff2')` from your CSS. Same relative-path discipline as JS bundles. For Capacitor's purpose, local fonts are better than web fonts because the WebView does not need a network round-trip to render the first paint.

```css
/* styles.css */
@font-face {
  font-family: 'Inter';
  src: url('./fonts/Inter-Regular.woff2') format('woff2');
  font-display: swap;
}
```

`font-display: swap` shows the fallback font immediately while the WebView loads the WebFont -- prevents the "invisible text" flash.

### Images

Keep small images imported (Vite's `import logo from './logo.png'` becomes a hashed URL) or under `public/` (Next.js, Vue, SvelteKit). Large images over ~50 KB should be lazy-loaded (`<img loading="lazy">`) so the WebView does not block first paint.

### Video and audio

Bundle inside `webDir` for offline (`./videos/intro.mp4`); stream via the `<video>` tag's `src` for online content. The realistic per-asset ceiling is ~50 MB on first install; larger bundles trip App Store / Play Store size limits (Android App Bundles cap at 150 MB per download; iOS bundles have no hard cap but install times scale).

## App metadata

The four core values of `capacitor.config.ts` are `appId`, `appName`, `webDir`, and the visual chrome (`backgroundColor`, `androidScheme`, `iosScheme`). Two more are worth setting at the project root: `version` in `package.json` (the JS / TS bundle version) and `versionCode` + `CFBundleVersion` in the native projects (the App Store / Play Store version). The two must move in lockstep -- Capacitor does not manage the native versions for you [B-S34].

```ts
// capacitor.config.ts (canonical metadata block)
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.myapp',       // immutable after first submission
  appName: 'My App',                // human-readable; safe to change
  webDir: 'dist',                   // bundler output
  bundledWebRuntime: false,         // default; future-proofing for Capacitor 9+
  loggingBehavior: 'production',    // or 'development' / 'debug' / 'none'
  android: {
    backgroundColor: '#FFFFFFFF'    // enforced NO-OP on Android 16+ / API 36+ [B-S11]
  },
  ios: {
    backgroundColor: '#FFFFFFFF',
    contentInset: 'automatic'       // 'automatic' | 'always' | 'never'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: '#FFFFFFFF',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      iosSpinnerStyle: 'small',
      spinnerColor: '#999999',
      splashFullScreen: true,
      splashImmersive: true
    },
    StatusBar: {
      style: 'DEFAULT',
      backgroundColor: '#FFFFFFFF',
      overlaysWebView: false
    },
    Browser: { presentationStyle: 'fullscreen' },
    App: { appendUserAgent: 'MyApp/1.0.0' }
  }
};

export default config;
```

- `appId` is immutable after first App Store / Play Store submission. Do not use placeholders.
- `appName` is the display name on the home screen; `cap sync` writes it into `Info.plist` (iOS) and `strings.xml` (Android).
- `version` and `versionCode` / `CFBundleVersion` are set in Xcode / Android Studio, not in `capacitor.config.ts`. Drive both from `package.json` `"version"` and inject via a CI script or `@capacitor/configure` to keep them in lockstep [B-S34].
- For App Store, Apple's build number must be strictly increasing across builds in the same version; Play Store's `versionCode` is the same.
- `bundledWebRuntime: false` is the default; set `true` if you need offline boot or ship the app as a standalone PWA.

## Build & ship flow

The canonical sequence from a clean checkout to a build ready for the App Store / Play Store:

```
+----------------------------------+
|  npm ci                          |   (or npm install on a fresh clone)
+-----------------+----------------+
                  v
+----------------------------------+
|  npm run build                   |   (bundler produces webDir/)
+-----------------+----------------+
                  v
+----------------------------------+
|  npx cap sync android ios        |   (webDir copy + plugin update + native install)
+-----------------+----------------+
                  v
+----------------------------------+
|  npx cap open ios                |   (Xcode opens; build + archive + upload)
|  npx cap open android            |   (Android Studio opens; ./gradlew bundleRelease)
+-----------------+----------------+
                  v
+----------------------------------+
|  App Store Connect / Play Store  |   (upload the .ipa / .aab)
+----------------------------------+
```

### cap sync vs cap copy

`npx cap sync` runs three things in sequence [A-S12][A-S17][A-S18]:
1. `cap copy` -- copies `webDir/` into the native project's bundle directory.
2. Plugin manifest update -- refreshes the native projects' plugin registration.
3. Native dependency install -- runs `pod install` on iOS (or refreshes SPM resolution) and re-syncs Gradle dependencies on Android.

`npx cap copy` does only (1). Use it during development when only the web bundle changed (a faster loop than `cap sync`). Use `cap sync` after any plugin add / update / upgrade [A-S12][A-S13].

### Opening in Xcode / Android Studio

After `npx cap sync`, the native projects are ready to build:

```bash
npx cap open ios                  # opens Xcode at ios/App.xcworkspace
npx cap open android              # opens Android Studio at android/
```

iOS builds go through Xcode's standard flow: select a target device or simulator, `Product > Run` to test, `Product > Archive` to produce the `.xcarchive`, then Distribute App > App Store Connect to upload. Android builds use Gradle: `./gradlew :app:bundleRelease` produces `android/app/build/outputs/bundle/release/app-release.aab`, which uploads to the Play Console [B-S35].

### Build variants (debug / staging / production)

The conventional pattern is one `capacitor.config.ts` per variant, kept in `config/` and copied to the root before `cap sync`:

```
config/
  capacitor.config.development.ts
  capacitor.config.staging.ts
  capacitor.config.production.ts
capacitor.config.ts                # the active variant, gitignored
```

A wrapper script picks the variant and runs the full sequence:

```bash
#!/bin/bash
# scripts/build-and-sync.sh
VARIANT=$1
cp config/capacitor.config.$VARIANT.ts capacitor.config.ts
npm run build
npx cap sync android ios
```

Or use `@capacitor/configure` (community plugin) for a more declarative variant setup.

### Signing

- **Android:** `android/build.gradle` reads `keystorePath` / `keystorePassword` from `capacitor.config.ts > android.buildOptions` (or from a Gradle property file). The keystore itself lives outside the repo; the CI secret manager injects the path + password at build time. For Play Store, upload the AAB with `releaseType: 'AAB'` [B-S35].
- **iOS:** Xcode manages signing through the Signing & Capabilities tab. The provisioning profile and the distribution certificate are environment-specific (Apple Developer Portal). For CI, use `match` (fastlane) to sync the certificates and provisioning profiles across machines.

### App Store / Play Store metadata

- **Play Store:** upload `android/app/build/outputs/bundle/release/app-release.aab` via the Play Console. The metadata lives in the Play Console (description, screenshots, categories) and is independent of the bundle.
- **App Store:** upload via Xcode > Organizer > Distribute App > App Store Connect, or via `xcrun altool --upload-app`. The metadata lives in App Store Connect. The build must be uploaded by a Mac with Xcode 26+; CI runners on Linux cannot upload to the App Store.

## Compatibility: libraries that break in a Capacitor WebView

The table below covers the libraries / patterns that specifically target **conversion-time** choices (not library-evaluation choices, which live in `07-best-companion-libraries.md`).

| Don't ship | Why it breaks | Substitute inside Capacitor |
|-----------|---------------|------------------------------|
| `react-native-*` (any RN-only module that ships native code) | RN modules require the React Native runtime, which is not loaded in a Capacitor WebView | Same JS API if it exists on web; otherwise `@capacitor/*` plugin or `Cordova plugin via the compat shim` |
| `expo-*` SDK modules that depend on the Expo runtime | Same as above; Expo is its own bridge | Strip Expo, use plain React Native bare (which Capacitor cannot help with) -- reconsider the framework choice |
| `next/headers`, `next/server`, Server Actions | No Node server in the WebView | Move to a backend-for-frontend (BFF) or compute at build time |
| `document.cookie` for auth session on Android < 5.0 / iOS 7-day eviction | Cookie lifetimes are managed by the OS, not the app | `@capacitor/preferences` for explicit storage [B-S27] |
| `navigator.locks` only as a single-tab lock (works in browser) | No multi-tab lock semantics in a single WebView process; behaves single-thread anyway | Use a TS lock primitive (`async-mutex`, etc.) |
| Stripe Checkout with redirect to `myapp://callback` | `stripe-js` web SDK uses redirect; the redirect target must be added to `server.allowNavigation` (custom scheme) OR use `@capacitor/browser` to wrap | `@capacitor/browser` `Browser.open()` for the checkout; listen for `appUrlOpen` or `browserFinished` [B-S33] |
| Mapbox GL JS in WKWebView on iOS < 16 | WebGL rendering bugs in older WKWebView | Lock the minimum OS to iOS 16+ or use `react-native-mapbox-gl` (off-scope of Capacitor) -- flag as a known constraint |
| Heavy custom `<canvas>` / WebGL inside a slow Android WebView (pre-API 28) | Frame skips; Capacitor requires Android 7+ / Chrome WebView 60+; very old devices still choke | Use a 2D fallback or `<picture>` |
| `IndexedDB` for > 50 MB | iOS WebView quotas vary by iOS version; WKWebView limit is set per origin and may evict | `@capacitor-community/sqlite` |
| Background fetch / persistent connection | WebView backgrounding kills `fetch` after ~30 s on iOS | Server-side push via APNs / FCM; `@capacitor/push-notifications` |

The wider scope of "what libraries break" (community plugins, UI kits, state management) lives in `07-best-companion-libraries.md`. The four above are the ones that bite the conversion specifically because they target the WebView-vs-Cordova-vs-RN boundary.

## Cordova migration

Capacitor keeps an emulation layer for most `cordova-plugin-*` packages. The official migration guide is `capacitorjs.com/docs/cordova/migrating-from-cordova-to-capacitor` [B-S5][B-S21]. The full mapping list is in the docs at `/docs/cordova`; common swaps are listed below.

### 8-step migration

**Step 0:** Make a separate git branch. The migration is reversible but touches many files.

```bash
git checkout -b capacitor-migration
```

**Step 1:** Install Capacitor alongside the existing Cordova deps.

```bash
npm install @capacitor/core @capacitor/cli
```

These pull in the `cordova-plugin-*` shim if Cordova plugins are still in `package.json` [B-S5][B-S21].

**Step 2:** Initialize Capacitor. `npx cap init` reads `<preference>` blocks from `config.xml` and ports them into the new `capacitor.config.json` under `cordova.preferences` [B-S5][B-S6].

```bash
npx cap init "My App" com.example.myapp --web-dir=www
```

**Step 3:** Build the web bundle (Cordova's `www/` is usually Capacitor's `webDir`).

```bash
npm run build
```

**Step 4:** Create the native shells.

```bash
npx cap add ios                  # Mac only
npx cap add android
```

**Step 5:** For each Cordova plugin, install the Capacitor equivalent (or remove it):

| Cordova plugin | Capacitor replacement |
|----------------|----------------------|
| `cordova-plugin-camera` | `@capacitor/camera` |
| `cordova-plugin-geolocation` | `@capacitor/geolocation` |
| `cordova-plugin-statusbar` | `@capacitor/status-bar` |
| `cordova-plugin-splashscreen` | `@capacitor/splash-screen` |
| `cordova-plugin-network-information` | `@capacitor/network` |
| `cordova-plugin-push` (older variants) | `@capacitor/push-notifications` |
| `cordova-plugin-app-version` | `@capacitor/app` |
| `cordova-plugin-inappbrowser` | `@capacitor/browser` |

```bash
npm install @capacitor/camera
npm uninstall cordova-plugin-camera
npx cap sync
```

**Step 6:** Address the scheme shift. Capacitor iOS uses `capacitor://`, not `ionic://`. LocalStorage and cookies migrate as a one-time script (see Pitfall 3). For a transition-only period, set `server.iosScheme: "ionic"` in `capacitor.config.ts` [B-S5][B-S8].

**Step 7:** Test on a real device early. Cordova + Capacitor can co-exist on the same `package.json` during migration; remove Cordova entirely once all plugins are replaced.

**Step 8:** Remove the Cordova scaffolding (`cordova-android`, `cordova-ios`, `cordova-plugin-*`, the `cordova prepare` step in CI) and switch the CI build to the Capacitor sequence (`cap sync` + native build).

### npx cap migrate cordova

The `npx cap migrate cordova` CLI command auto-converts a Cordova `config.xml` to Capacitor config, porting preferences, platform list, and `<access>` rules. It does NOT migrate Cordova plugin code or whitelists; those have to be re-attested in `Info.plist` / `AndroidManifest.xml` [B-S5].

### Permissions

Cordova plugins declared `<uses-permission>` in their manifests; Capacitor plugins prompt at first use, but the underlying native permission is auto-added by the plugin's own `plugin.xml`. After migration, run on a device and verify each formerly-Cordova plugin still requests permission (Android 13+ added runtime permissions; older Android only needed manifest declarations).

### Capacitor 9 will remove the Cordova framework entirely

Per Capacitor's roadmap (issue #8524 fixed in 9.0.0-alpha.6), Capacitor 9 removes the Cordova compatibility framework from the bundle. A Capacitor 9 project that still has `cordova-plugin-*` references in `package.json` will fail to build. The Cordova migration should be completed (all Cordova plugins replaced or removed) before adopting Capacitor 9 [A-S1].

## Worked end-to-end example

This example walks the most common conversion path: a Vite + React + TypeScript project becomes an iOS + Android app. Every step is a real command; the expected output is what `npx cap sync` and the native IDEs print on a clean run.

**Starting state:** a Vite + React + TypeScript project at `~/code/my-app/` with `package.json`, `vite.config.ts`, `src/main.tsx`, `src/App.tsx`. No Capacitor yet.

### Step 1 -- Install Capacitor packages

```bash
cd ~/code/my-app
npm i @capacitor/core
npm i -D @capacitor/cli
npm i @capacitor/android @capacitor/ios
```

Expected: `@capacitor/core@8.5.0`, `@capacitor/cli@8.5.0`, `@capacitor/android@8.5.0`, `@capacitor/ios@8.5.0` appear in `package.json` `dependencies` / `devDependencies`. No peer-dependency warnings if Node >= 22 [A-S4].

### Step 2 -- Verify the bundler config

```ts
// vite.config.ts (already present, verify base: './')
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false
  }
});
```

If `base` is `/`, change it to `./`. This is the most common white-screen cause [B-S24].

### Step 3 -- Initialize Capacitor config

```bash
npx cap init "My App" com.example.myapp --web-dir=dist
```

Expected: `capacitor.config.ts` is created at the project root. Contents:

```ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.myapp',
  appName: 'My App',
  webDir: 'dist'
};

export default config;
```

### Step 4 -- Build the web bundle

```bash
npm run build
```

Expected: Vite writes `dist/index.html`, `dist/assets/index-abc123.js`, `dist/assets/index-def456.css`. Open `dist/index.html` in a text editor; the `<script>` and `<link>` tags should reference `./assets/...` (relative paths), not `/assets/...`.

### Step 5 -- Add the native platforms

```bash
npx cap add ios
npx cap add android
```

Expected (iOS, Mac only):

```
✔ add ios in 4.52s
✔ add in 4.520s
✔ Synchronizing capacitor.config.json
✔ Running sync in 4.72s
> npx cap sync ios
[success] iOS app added
```

Expected (Android):

```
✔ add android in 3.81s
✔ Synchronizing capacitor.config.json
✔ Running sync in 3.92s
> npx cap sync android
[success] Android app added
```

The project now has `ios/` (Xcode project) and `android/` (Gradle project) directories.

### Step 6 -- Sync the web bundle into the native projects

```bash
npx cap sync
```

Expected:

```
✔ Sync finished in 1.43s
> npx cap sync ios android
[success] sync ios
[success] sync android
```

The `dist/` content is now inside `ios/App/App/public/` and `android/app/src/main/assets/public/`.

### Step 7 -- Open the iOS project in Xcode

```bash
npx cap open ios
```

Expected: Xcode opens `ios/App.xcworkspace` (NOT `.xcodeproj` -- the workspace includes the SPM dependencies [A-S6]). Select a target simulator or device from the scheme dropdown, click Run (or press Cmd-R). The app builds, installs on the simulator, and launches. The SPA renders inside the WKWebView; safe-area insets work; status bar matches the theme.

For a real device: plug the iPhone in, select it from the device dropdown, click Run. The first build requires a development team to be set in Signing & Capabilities.

### Step 8 -- Open the Android project in Android Studio

```bash
npx cap open android
```

Expected: Android Studio opens `android/`. Wait for Gradle sync to complete (downloads AGP, Kotlin, AndroidX dependencies -- takes 2-5 minutes on a cold cache). Select a target emulator or device from the device dropdown, click Run. The app builds, installs, and launches. The SPA renders inside the Android System WebView.

For a real device: enable USB debugging in Developer Options, plug the device in, accept the RSA fingerprint prompt, select it from the device dropdown, click Run.

### Step 9 -- Iterate

The development loop is:

```bash
# Make changes to React components, CSS, etc.
npm run build
npx cap copy               # faster than `cap sync` when only the web bundle changed

# Or after a plugin add/upgrade
npm run build
npx cap sync
```

For HMR (Hot Module Replacement) inside the WebView, use Vite's dev server + `cap run --live-reload`:

```bash
# Run Vite dev server in one terminal
npm run dev

# In another terminal, point the WebView at the dev server
npx cap run ios --livereload --port 8100
npx cap run android --livereload --port 8100
```

The `--livereload` flag temporarily injects `server.url: 'http://<lan-ip>:8100'` + `server.cleartext: true` into the config and restores the original on termination [B-S22].

### You now have a working shell

The next files in this dossier cover:

- `05-plugin-system-and-lifecycle.md` -- the 39-plugin official inventory, the JS bridge contract, and the lifecycle events to wire your app's behavior to.
- `06-native-like-delivery-checklist.md` -- the six-axis priority list (safe-area, status bar, splash, haptics, back-button, dark-mode-follow) plus the long tail of native-like polish items.
- `08-build-and-ship.md` -- the GH Actions + fastlane CI matrix for shipping the build to the App Store / Play Store, including the OTA caveat (no first-party Capacitor story; Capgo is the credible third-party option).

<!-- freshness: capacitor=8.5.0 access=2026-08-18 -->

## Freshness

- last_verified: 2026-08-18
- source_schema_versions: @capacitor/core@8.5.0, @capacitor/cli@~8.0.0, @capacitor/android@8.5.0, @capacitor/ios@8.5.0, @capacitor/app@8.1.1, @capacitor/status-bar@8.0.3, @capacitor/splash-screen@8.0.2, @capacitor/preferences@8.0.1, @capacitor/browser@8.0.4, @capacitor/haptics@8.0.2, @capacitor/assets@3.0.5
- anchor_v8_config_url: https://capacitorjs.com/docs/v8/config
- anchor_v8_installation_url: https://capacitorjs.com/docs/getting-started
- anchor_v8_cordova_url: https://capacitorjs.com/docs/cordova/migrating-from-cordova-to-capacitor
- v9_watch_only_issue: https://github.com/ionic-team/capacitor/issues/8560
- tar_v7_cli_issue: https://github.com/ionic-team/capacitor/issues/8573

## References

- [B-S1] -- https://www.npmjs.com/package/@capacitor/cli -- accessed 2026-08-18 (license MIT, version 8.5.0, engines `node>=22.0.0`)
- [B-S2] -- https://www.npmjs.com/package/@capacitor/core -- accessed 2026-08-18 (license MIT, version 8.5.0; per-package versions for /cli, /android, /ios, /splash-screen 8.0.2, /status-bar 8.0.3, /app 8.1.1, /browser 8.0.4, /preferences 8.0.1, /assets 3.0.5)
- [B-S5] -- https://capacitorjs.com/docs/cordova/migrating-from-cordova-to-capacitor -- accessed 2026-08-18 (Cordova-to-Capacitor migration: config.xml preference porting, scheme swap warning, `npm uninstall cordova-plugin-name && npx cap sync`)
- [B-S7] -- https://capacitorjs.com/docs/getting-started -- accessed 2026-08-18 (`npx cap init` auto-detects webDir per framework; per-bundler webDir mapping)
- [B-S8] -- https://capacitorjs.com/docs/cordova/migrating-from-cordova-to-capacitor -- accessed 2026-08-18 (scheme-change LocalStorage loss warning; `iosScheme: "ionic"` transition workaround)
- [B-S9] -- https://github.com/ionic-team/capacitor/blob/main/cli/src/declarations.ts -- accessed 2026-08-18 (CLI TypeScript schema: CapacitorConfig.webDir, server.url, server.cleartext, server.androidScheme, server.iosScheme, server.allowNavigation, server.errorPath; env vars CAPACITOR_ANDROID_STUDIO_PATH, CAPACITOR_COCOAPODS_PATH)
- [B-S10] -- https://ionic.io/blog/capacitor-android-customscheme-issue-with-chrome-117 -- accessed 2026-08-18 (Chrome WebView 117 changed custom-scheme handling; only `http`/`https` reliable on Android)
- [B-S11] -- https://capacitorjs.com/docs/apis/status-bar -- accessed 2026-08-18 (Android 16+ behavior change: `overlaysWebView` + `backgroundColor` are no-ops on API 36+ / Capacitor 8)
- [B-S12] -- https://www.npmjs.com/package/@capacitor/app -- accessed 2026-08-18 (`addListener('appUrlOpen', ...)` covers custom URL schemes + iOS Universal Links + Android App Links; full App plugin API surface)
- [B-S13] -- https://capacitorjs.com/docs/guides/splash-screens-and-icons -- accessed 2026-08-18 (splash + icon generation; `resources/` folder layout)
- [B-S14] -- https://github.com/ionic-team/capacitor-assets -- accessed 2026-08-18 (`npx @capacitor/assets generate --ios / --android`; 3.0.5)
- [B-S16] -- https://capacitorjs.com/docs/sitemap.xml -- accessed 2026-08-18 (v8 docs sitemap; per-framework Vite/Next/SvelteKit/React guides removed from sidebar)
- [B-S17] -- https://github.com/ionic-team/capacitor/blob/main/cli/src/tasks/sync.ts -- accessed 2026-08-18 (`cap sync` = composite of update + copy + install)
- [B-S18] -- https://github.com/ionic-team/capacitor/blob/main/cli/src/tasks/copy.ts -- accessed 2026-08-18 (`cap copy` = webDir copy only)
- [B-S22] -- https://capacitorjs.com/docs/guides/live-reload -- accessed 2026-08-18 (`npx cap run <platform> --livereload --port 8100`; server.url + cleartext temporary injection)
- [B-S23] -- https://capacitorjs.com/docs/guides/storage -- accessed 2026-08-18 (storage guide: LocalStorage / IndexedDB limits; recommendations for `@capacitor/preferences` + `@capacitor-community/sqlite` + filesystem)
- [B-S24] -- https://vitejs.dev/config/shared-options.html#base -- accessed 2026-08-18 (Vite `base` config: relative base for sub-path deployments like Capacitor)
- [B-S25] -- https://capacitorjs.com/docs/guides/react-hooks -- accessed 2026-08-18 (React Hooks guide; service worker gate on `Capacitor.isNativePlatform()`)
- [B-S26] -- https://capacitorjs.com/docs/web -- accessed 2026-08-18 (Capacitor Web/PWA: PWA is the no-platform mode; UA check for Android WebView `; wv)`)
- [B-S27] -- https://www.npmjs.com/package/@capacitor/preferences -- accessed 2026-08-18 (KV store API: set/get/remove/keys/clear/configure; uses NSUserDefaults on iOS, SharedPreferences on Android)
- [B-S28] -- https://capacitorjs.com/docs/guides/angular -- accessed 2026-08-18 (Angular Capacitor guide: NgZone notes; `provideExperimentalZonelessChangeDetection()` interaction)
- [B-S29] -- https://capacitorjs.com/docs/lifecycle -- accessed 2026-08-18 (lifecycle events; pause/resume/appStateChange cross-platform mapping)
- [B-S30] -- https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/UsingtheViewport/UsingtheViewport.html -- accessed 2026-08-18 (Apple viewport guide: `viewport-fit=cover` + `env(safe-area-inset-*)`)
- [B-S31] -- https://capacitorjs.com/docs/apis/splash-screen -- accessed 2026-08-18 (Splash Screen API: `show({ autoHide })`, `hide()`, `launchShowDuration`, `launchAutoHide`, `backgroundColor`)
- [B-S33] -- https://capacitorjs.com/docs/apis/browser -- accessed 2026-08-18 (Browser API: `open({ url, presentationStyle })`, listeners, SFSafariViewController on iOS)
- [B-S34] -- https://capacitorjs.com/docs/ios -- accessed 2026-08-18 (iOS getting started: Xcode-driven `CFBundleVersion` / versionCode; Capacitor Sync Xcode run script)
- [B-S35] -- https://capacitorjs.com/docs/guides/ci-cd -- accessed 2026-08-18 (CI/CD guide: GH Actions + fastlane matrix; Android `bundleRelease`; iOS `xcodebuild archive`)
- [A-S1] -- https://registry.npmjs.org/@capacitor/core -- accessed 2026-08-18 (npm dist-tags: 8.5.0 latest, 9.0.0-alpha.6 next, 7.6.8 latest-7, 6.2.1 latest-6)
- [A-S3] -- https://capacitorjs.com/docs/main/reference/support-policy -- accessed 2026-08-18 (v8 Active, v7 Extended Support until 2026-12-08, v6 End of Support; minimum Node 22 / Xcode 26.0 / Android Studio 2025.2.1 / iOS 15.0 / Android 7.0 API 24)
- [A-S4] -- https://www.npmjs.com/package/@capacitor/cli -- accessed 2026-08-18 (license MIT, engines `node>=22.0.0`)
- [A-S6] -- https://capacitorjs.com/docs/ios -- accessed 2026-08-18 (iOS 15+, Xcode 26.0+, WKWebView, `npx cap add ios`, `npx cap open ios` opens `App.xcworkspace`)
- [A-S10] -- https://capacitorjs.com/docs/v8/cli -- accessed 2026-08-18 (CLI command list: add, build, copy, doctor, init, ls, migrate, open, run, sync, update)
- [A-S11] -- https://capacitorjs.com/docs/web -- accessed 2026-08-18 (Capacitor Web/PWA: builds ES2017; script-include option removed; PWA is the no-platform mode)
- [A-S12] -- https://capacitorjs.com/docs/v8/cli/commands/sync -- accessed 2026-08-18 (`cap sync`: copies webDir, installs native deps, updates plugin registrations)
- [A-S13] -- https://capacitorjs.com/docs/v8/cli/commands/copy -- accessed 2026-08-18 (`cap copy`: copies webDir only, no native-side work)
- [A-S16] -- https://capacitorjs.com/docs/apis/app -- accessed 2026-08-18 (App plugin: lifecycle events `appStateChange` / `pause` / `resume` / `appUrlOpen` / `appRestoredResult` / `backButton`; CFBundleURLTypes + AndroidManifest intent-filter for custom URL schemes)
- [A-S20] -- https://github.com/ionic-team/capacitor/issues/8560 -- accessed 2026-08-18 (9.0.0-alpha.6 `Cordova.xcframework` ships a nested `Capacitor.framework`; CFBundleIdentifier Collision on App Store Connect upload; do not pin `@capacitor/core@next`)
