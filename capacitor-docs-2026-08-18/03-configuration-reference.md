# Configuration Reference

`capacitor.config.ts` is the single source of truth for the Capacitor runtime. It lives at the project root (sibling of `package.json`), exports a typed `CapacitorConfig` object, and is read by `@capacitor/cli` on every `cap init`, `cap add`, `cap sync`, and `cap copy`. The TypeScript shape is preferred for TypeScript projects because `tsc` validates the field names, the types, and the nested blocks (`server`, `ios`, `android`, `plugins`); a JSON variant (`capacitor.config.json`) is supported for non-TS projects but offers no compile-time validation.

This chapter documents every top-level field, the per-platform blocks, the `server` block (live reload and dev server config), the `plugins` block (per-plugin overrides), the environment variables the CLI reads, the v7 to v8 changes that affect the config shape, and a worked end-to-end `capacitor.config.ts` example.

## Overview

The canonical config shape:

```ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.myapp',
  appName: 'My App',
  webDir: 'dist',
};

export default config;
```

The TypeScript type `CapacitorConfig` is exported from `@capacitor/cli` and is the source of truth for every field below. The CLI reads the file via dynamic import (TS projects are transpiled on the fly by `@capacitor/cli` using `esbuild`); if the file fails to parse, the CLI throws `Unable to load capacitor.config.ts`.

The file is autoloaded by `@capacitor/cli` from the project root. There is no `--config` flag; the file path is fixed. The CLI does not support a custom config path; if you need a per-environment config, use a wrapper script that writes the right `capacitor.config.ts` before each `cap sync` (this is the pattern Ionic's CI scripts use).

## Top-level fields

The table below lists every top-level field on `CapacitorConfig`. The TypeScript type, the default, and the description are taken from the CLI's `declarations.ts` schema.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `appId` | `string` | -- | Reverse-DNS app identifier (iOS bundle ID / Android application ID). Immutable after first App Store / Play Store submission. |
| `appName` | `string` | -- | Human-readable name displayed on the device home screen and in Settings. |
| `webDir` | `string` | `www` | Path (relative to project root) to the built web bundle. `cap sync` copies this directory into the native project's bundle location. |
| `bundledWebRuntime` | `boolean` | `false` | When `true`, bundles the Capacitor runtime into the web bundle so the WebView can boot offline. |
| `loggingBehavior` | `'none' \| 'debug' \| 'production'` | `'debug'` | Controls JS console log forwarding to native logcat / Xcode. `'debug'` forwards in dev, `'production'` in release, `'debug'` always forwards. |
| `overrideUserAgent` | `string` | -- | Override the WebView's user-agent string entirely. Use sparingly -- breaks some 3rd-party SDKs. |
| `appendUserAgent` | `string` | -- | Append a string to the default user-agent (e.g. `MyApp/1.0.0`). The default Android WebView user-agent is preserved; iOS strips whitespace (see v8 fix below). |
| `webViewLogLevel` | `'NONE' \| 'VERBOSE' \| 'DEBUG' \| 'INFO' \| 'WARN' \| 'ERROR' \| 'ASSERT'` | `'DEBUG'` | Logcat log level for native plugin logs. |
| `backgroundColor` | `string` (hex `#RRGGBB` or `#RRGGBBAA`) | platform default | WebView background color shown before the first paint. Set to your splash background to avoid a white flash. |
| `androidScheme` | `'https' \| 'http'` | `'https'` | Custom scheme for the Android WebView. `'https'` is the secure default; `'http'` is for legacy CDNs (note: Chrome 117 changed WebView scheme handling; see Ionic blog). |
| `iosScheme` | `'https' \| 'http'` | `'https'` | Same as `androidScheme`, for iOS WKWebView. |
| `server` | `ServerConfig` | -- | Dev-server config (URL, cleartext, hostname, allowNavigation, errorPath). Documented below. |
| `android` | `AndroidConfig` | -- | Per-platform Android overrides. Documented below. |
| `ios` | `IOSConfig` | -- | Per-platform iOS overrides. Documented below. |
| `web` | `WebConfig` | -- | Per-platform web / PWA overrides. Documented below. |
| `plugins` | `PluginsConfig` | -- | Per-plugin config overrides (one key per plugin). Documented below. |
| `cordova` | `CordovaConfig` | -- | Cordova legacy preferences (only relevant for projects that ship Cordova plugins via the compat shim). |
| `includePlugins` | `string[]` | -- | Allow-list of plugin names to include (deny everything else). Default: include all. |
| `errorPath` | `string` | -- | Custom error page shown when the WebView version is too low. Path is relative to `webDir`. |

Two fields are **commonly confused**:

- `appId` is the reverse-DNS identifier (e.g. `com.example.myapp`), used by App Store Connect and Play Console.
- `appName` is the human-readable display name (e.g. `My App`), used on the home screen.

Renaming `appId` after first submission requires a new App Store listing (iOS) or a new application ID (Android). Renaming `appName` does not.

## server block

The `server` block controls live reload, dev server config, and the WebView's allowlist for outbound navigation.

```ts
const config: CapacitorConfig = {
  appId: 'com.example.myapp',
  appName: 'My App',
  webDir: 'dist',
  server: {
    url: 'http://192.168.1.42:5173',      // dev server URL (omit for production builds)
    hostname: 'localhost',                  // hostname used in WebView load (default 'localhost')
    iosScheme: 'https',                     // override of top-level iosScheme for live reload
    androidScheme: 'https',                 // override of top-level androidScheme for live reload
    allowNavigation: ['example.com'],       // extra domains the WebView may navigate to
    cleartext: false,                       // must be `true` if `url` is http:// (dev only)
    errorPath: 'error.html',                // custom error page for too-low WebView version
  },
};
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `url` | `string` | -- | Dev server URL. When set, the WebView loads from this URL instead of `webDir`. Remove before shipping to production. |
| `hostname` | `string` | `'localhost'` | Hostname used in the WebView load (iOS only). |
| `iosScheme` | `'https' \| 'http'` | inherits top-level | Overrides the top-level `iosScheme` for live reload. |
| `androidScheme` | `'https' \| 'http'` | inherits top-level | Overrides the top-level `androidScheme` for live reload. |
| `allowNavigation` | `string[]` | `[]` | Extra domains the WebView is allowed to navigate to. The default scheme's origin is always allowed. |
| `cleartext` | `boolean` | `false` | When `true`, allows `http://` URLs in the WebView. Must be `true` for `server.url` on `http://`. **Dangerous in production** -- App Store review will reject for ATS cleartext flag in `Info.plist`. |
| `errorPath` | `string` | -- | Custom error page shown when the WebView version is too low. Path is relative to `webDir`. |

Production risk per option:

- `url` set: app loads the dev URL instead of the bundled `webDir`. If the dev server is unreachable, the app is dead.
- `cleartext: true` in production: App Store rejection. The build's `Info.plist` will include `NSAllowsArbitraryLoads = true` (via Capacitor's iOS template), and the reviewer will reject.
- `allowNavigation` too broad: opens a phishing vector. Restrict to the specific OAuth / 3rd-party domains the app actually navigates to.
- `errorPath` pointing at a non-existent file: silent failure; the user sees the default error.

## ios block

The `ios` block overrides iOS-specific WebView and App behavior.

```ts
const config: CapacitorConfig = {
  // ...
  ios: {
    contentInset: 'automatic',                         // 'automatic' | 'never' | 'always'
    backgroundColor: '#ffffff',                       // WebView background before first paint
    limitsNavigationsToAppBoundDomains: true,         // WKAppBoundDomains enforcement (iOS 14+)
    allowLinkPreview: true,                           // 3D Touch / long-press link preview
    scrollEnabled: true,                              // disable for fixed-layout apps
    disableSplashScreenAutoHide: false,               // set true to manage splash manually
    enableLogging: false,                             // WebView console.log forwarding to Xcode
    webContentsDebuggingEnabled: false,               // Safari Web Inspector enable (dev only)
    appendUserAgent: ' MyApp/1.0.0',                   // per-platform append; v8 fixed the whitespace bug
    preferredModeScaleFactor: 1.0,                    // 'automatic' for dynamic type
  },
};
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `contentInset` | `'automatic' \| 'never' \| 'always'` | `'automatic'` | How the WebView adjusts its content insets. `'always'` reserves space for the status bar; `'never'` overlays; `'automatic'` decides per page. |
| `backgroundColor` | `string` | white | WebView background before first paint. |
| `limitsNavigationsToAppBoundDomains` | `boolean` | `false` | When `true`, WebView navigations outside `WKAppBoundDomains` are blocked. Required for iOS 14+ App Store compliance. |
| `allowLinkPreview` | `boolean` | `true` | Allow 3D Touch / long-press link preview. |
| `scrollEnabled` | `boolean` | `true` | Allow WebView scrolling. Disable for fixed-layout games / full-screen apps. |
| `disableSplashScreenAutoHide` | `boolean` | `false` | Disable auto-hide of the launch splash. Use `@capacitor/splash-screen` to manage manually. |
| `enableLogging` | `boolean` | `false` | Forward WebView `console.log` to Xcode console. Dev only. |
| `webContentsDebuggingEnabled` | `boolean` | `false` | Enable Safari Web Inspector attachment. Dev only. **Set `true` only when attached** -- leaving it `true` in production leaks debugging surface. |
| `appendUserAgent` | `string` | -- | Per-platform append. v8 fixed the iOS whitespace bug (extra whitespace dropped the override; v8 preserves it). |
| `preferredModeScaleFactor` | `number \| 'automatic'` | `1.0` | Force a specific scale factor or use dynamic type. |

Production risk per option:

- `webContentsDebuggingEnabled: true` in production: exposes the WebView to anyone with Xcode. Set `true` only when attached to a debug session.
- `limitsNavigationsToAppBoundDomains: false` on iOS 14+: App Store rejection.
- `disableSplashScreenAutoHide: true` without manual `SplashScreen.hide()`: the splash is forever.

## android block

The `android` block overrides Android-specific WebView and Activity behavior.

```ts
const config: CapacitorConfig = {
  // ...
  android: {
    backgroundColor: '#ffffff',
    allowMixedContent: false,                         // allow http:// subresources on https:// pages
    captureInput: true,                               // allow text input capture
    webContentsDebuggingEnabled: false,               // chrome://inspect enable (dev only)
    appendUserAgent: ' MyApp/1.0.0',
    includePlugins: [],                               // empty = include all
    excludePlugins: [],                               // empty = exclude none
    minWebViewVersion: 60,                            // minimum Chrome WebView version
    minHuaweiWebViewVersion: 10,                      // minimum Huawei WebView version
    buildOptions: {
      keystorePath: 'release.keystore',
      keystorePassword: '<env>',
      keystoreAlias: 'myapp',
      keystoreAliasPassword: '<env>',
      releaseType: 'AAB',                             // 'APK' or 'AAB' (Android App Bundle)
    },
  },
};
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `backgroundColor` | `string` | white | WebView background before first paint. |
| `allowMixedContent` | `boolean` | `false` | Allow `http://` subresources on `https://` pages. **Dangerous** -- opens MITM. Use only with a known CDN. |
| `captureInput` | `boolean` | `true` | Whether the WebView captures soft-keyboard input. |
| `webContentsDebuggingEnabled` | `boolean` | `false` | Enable `chrome://inspect` attachment. Dev only. |
| `appendUserAgent` | `string` | -- | Per-platform append to the user-agent. |
| `includePlugins` | `string[]` | -- | Allow-list of plugin names to include in the Android build. Default = all. |
| `excludePlugins` | `string[]` | -- | Deny-list of plugin names to exclude from the Android build. Default = none. |
| `minWebViewVersion` | `number` | `60` | Minimum Chrome WebView major version required. Apps show the `errorPath` page on lower versions. |
| `minHuaweiWebViewVersion` | `number` | `10` | Minimum Huawei WebView version required. |
| `buildOptions` | `AndroidBuildOptions` | -- | Android signing + release type config. See below. |

`buildOptions` covers the Android signing config and the release-type choice. `releaseType: 'AAB'` produces an Android App Bundle (Play Store default); `releaseType: 'APK'` produces a single APK (sideload / direct distribution). The keystore config should reference env vars, not committed secrets.

Production risk per option:

- `allowMixedContent: true` in production: opens MITM. Use only with a known, trusted CDN.
- `webContentsDebuggingEnabled: true` in production: exposes the WebView to anyone with Chrome devtools.
- `buildOptions.keystorePassword` committed to the repo: leaked signing key. Use env vars + `.env.example`.

## web block

The `web` block controls the no-platform Capacitor mode (the PWA / Web target).

```ts
const config: CapacitorConfig = {
  // ...
  web: {
    directoryListingType: 'auto',                     // 'auto' | 'always' | 'never'
    browsersPath: '',                                 // path to custom browser executable (Electron embed)
  },
};
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `directoryListingType` | `'auto' \| 'always' \| 'never'` | `'auto'` | Whether the dev server lists directories when no `index.html` is present. |
| `browsersPath` | `string` | -- | Path to a custom browser executable (used by Electron-style embeds). Leave empty for the system default. |

The `web` block is rarely customized. The PWA / Web target is the no-platform Capacitor mode: the project ships without `npx cap add ios` / `npx cap add android`, and the `webDir` is served as a PWA.

## plugins block

The `plugins` block carries per-plugin config overrides. Each plugin's config shape is exported by the plugin's own TypeScript package (via `/// <reference types="@capacitor/<plugin>" />`).

```ts
const config: CapacitorConfig = {
  // ...
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,                       // ms the launch splash stays visible
      launchAutoHide: true,                           // auto-hide after launchShowDuration
      backgroundColor: '#1a1a1a',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      androidSpinnerStyle: 'small',
      spinnerColor: '#ffffff',
    },
    StatusBar: {
      style: 'DARK',                                  // 'DARK' | 'LIGHT' | 'DEFAULT'
      backgroundColor: '#1a1a1a',                     // Android only; no-op on Android 16+ (Capacitor 8)
      overlaysWebView: false,                         // edge-to-edge; no-op on Android 16+ (Capacitor 8)
    },
    Haptics: {
      impactStyle: 'MEDIUM',                          // 'LIGHT' | 'MEDIUM' | 'HEAVY'
    },
  },
};
```

Common plugin config patterns:

- **SplashScreen** -- `launchShowDuration` + `launchAutoHide` control the launch splash; `showSpinner` + `androidSpinnerStyle` add a spinner.
- **StatusBar** -- `style` (DARK = light text on dark bg, LIGHT = dark text on light bg) is the most common; `backgroundColor` + `overlaysWebView` are no-ops on Android 16+ / Capacitor 8 (documented in `@capacitor/status-bar` v8 with an explicit callout).
- **Haptics** -- `impactStyle` is the default tap-impact intensity; the API takes a `style` override per call.
- **Preferences** -- no config block needed; the API is `set / get / remove / keys / clear / configure`.
- **Browser** -- `presentationStyle: 'fullscreen' | 'popover'` controls the OAuth / external-URL view.

The full per-plugin API lives in `05-plugin-system-and-lifecycle.md` and at `https://capacitorjs.com/docs/apis/<plugin-name>`.

## v7 to v8 config changes

The v7-to-v8 changes most likely to bite a v7 app being upgraded:

| Field / area | v7 behavior | v8 behavior | Action |
|--------------|-------------|-------------|--------|
| `android.allowMixedContent` | default `false` | default `false` | None |
| `ios.appendUserAgent` whitespace | iOS bug: extra whitespace dropped the user-agent override | Fixed; whitespace preserved | Move any workaround to `ios.appendUserAgent` |
| `android.adjustMarginsForEdgeToEdge` | Config flag at top level | Removed in favor of `@capacitor/system-bars` plugin | Install the plugin, remove the config flag |
| `ios.limitsNavigationsToAppBoundDomains` | default `false` | default `false` | None; App Store still requires `true` for iOS 14+ in some categories |
| `android.buildOptions.releaseType` | `APK` only | `APK` or `AAB` | Switch to `AAB` for Play Store |
| iOS dependency manager | CocoaPods | SPM | Pass `--packagemanager CocoaPods` if you need CocoaPods |
| iOS app lifecycle | AppDelegate only | AppDelegate + UIScene (v8.5+) | Add `SceneDelegate.swift` + `UIApplicationSceneManifest` |
| Android `configChanges` | `orientation\|...` (no density) | Add `density` | Update `AndroidManifest.xml` |
| `@capacitor/storage` plugin | In the official inventory | Deprecated; use `@capacitor/preferences` | Swap to `@capacitor/preferences` |
| Node engine pin in `@capacitor/cli` | `>=18.0.0` | `>=22.0.0` | Upgrade Node |

The `@capacitor/system-bars` plugin replaces the `adjustMarginsForEdgeToEdge` config flag. Apps that relied on the flag to handle Android edge-to-edge cutouts silently lose the safe margin after `npx cap migrate`. Symptom: status / navigation bar overlap content on Android 15+.

The Android 16 status-bar behavior change is documented in `@capacitor/status-bar` v8 with an explicit callout: `overlaysWebView: true` and `backgroundColor` no longer have any effect on Android 16 (API 36) + Capacitor 8. Layout must use `env(safe-area-inset-*)` padding instead.

## Worked example

A complete `capacitor.config.ts` that wires up a real-world app:

```ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  // Core
  appId: 'io.example.myapp',
  appName: 'My App',
  webDir: 'dist',

  // Visual
  backgroundColor: '#0b0b0f',
  androidScheme: 'https',
  iosScheme: 'https',

  // Logging (debug builds forward; production builds silence)
  loggingBehavior: 'debug',
  webViewLogLevel: 'DEBUG',

  // Plugin config
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      launchAutoHide: true,
      backgroundColor: '#0b0b0f',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#0b0b0f',
    },
    Haptics: {
      impactStyle: 'MEDIUM',
    },
    Preferences: {
      // No config required; the plugin is opt-in.
    },
  },

  // Per-platform
  ios: {
    contentInset: 'automatic',
    backgroundColor: '#0b0b0f',
    limitsNavigationsToAppBoundDomains: true,
    appendUserAgent: ' MyApp/1.0.0',
    webContentsDebuggingEnabled: false,
  },
  android: {
    backgroundColor: '#0b0b0f',
    allowMixedContent: false,
    webContentsDebuggingEnabled: false,
    appendUserAgent: ' MyApp/1.0.0',
    captureInput: true,
    minWebViewVersion: 80,
  },

  // Dev server (comment out or set cleartext: false before shipping)
  // server: {
  //   url: 'http://192.168.1.42:5173',
  //   cleartext: true,
  // },
};

export default config;
```

Key choices in this example:

- `appId: 'io.example.myapp'` -- reverse-DNS, immutable. Update both iOS bundle ID and Android application ID via `cap sync`.
- `webDir: 'dist'` -- Vite's default output. Switch to `out` for Next.js static export, `build` for SvelteKit static, `dist/<project-name>` for Angular.
- `backgroundColor: '#0b0b0f'` -- set to the splash background to avoid a white flash on launch.
- `loggingBehavior: 'debug'` -- forward console in dev, silence in release.
- `ios.limitsNavigationsToAppBoundDomains: true` -- required for iOS 14+ App Store compliance.
- `android.minWebViewVersion: 80` -- raise from the default 60 to enforce a more capable WebView.
- `server` block commented out -- uncomment for local dev with `npx cap run --live-reload`; comment out before shipping.

<!-- freshness: capacitor=8.5.0 access=2026-08-18 -->

## Freshness

- last_verified: 2026-08-18
- source_schema_versions: @capacitor/core@8.5.0, @capacitor/cli@~8.0.0, @capacitor/app@^8.0.0
- anchor_config_url: https://capacitorjs.com/docs/v8/config
- anchor_v8_upgrade_url: https://capacitorjs.com/docs/updating/8-0
- anchor_v85_upgrade_url: https://capacitorjs.com/docs/updating/8-5

## References

- [A-S6] -- https://capacitorjs.com/docs/ios -- accessed 2026-08-18 (iOS getting started: iOS 15+, Xcode 26.0+, WKWebView, Info.plist edits via Signing & Capabilities)
- [A-S8] -- https://capacitorjs.com/docs/updating/8-0 -- accessed 2026-08-18 (v7 to v8: density added to configChanges, adjustMarginsForEdgeToEdge removed in favor of @capacitor/system-bars, appendUserAgent iOS whitespace bug fix)
- [A-S9] -- https://capacitorjs.com/docs/updating/8-5 -- accessed 2026-08-18 (UIScene lifecycle: SceneDelegate.swift, UIApplicationSceneManifest, SceneDelegateProxy)
- [A-S14] -- https://capacitorjs.com/docs/apis/app -- accessed 2026-08-18 (39-plugin official inventory including Status Bar, Splash Screen, Preferences, Haptics, Browser)
- [A-S15] -- https://registry.npmjs.org/{package-name} -- accessed 2026-08-18 (npm plugin versions on the 8.x line: status-bar 8.0.3, splash-screen 8.0.2, preferences 8.0.1, haptics 8.0.2, browser 8.0.4)
- [A-S16] -- https://capacitorjs.com/docs/apis/app -- accessed 2026-08-18 (App plugin: lifecycle events; CFBundleURLTypes + AndroidManifest intent-filter)
- [A-S17] -- https://capacitorjs.com/docs/guides/live-reload -- accessed 2026-08-18 (Live reload: server.url + server.cleartext, --live-reload --port flag)
- [A-S18] -- https://capacitorjs.com/docs/v8/plugins/creating-plugins -- accessed 2026-08-18 (Plugin generator; JS bridge contract; registerPlugin<T>; per-plugin config shape)
- [A-S19] -- https://capacitorjs.com/docs/cordova -- accessed 2026-08-18 (Cordova compat shim; cordova block in config for legacy plugin preferences)
- [A-S20] -- https://github.com/ionic-team/capacitor/issues/8560 -- accessed 2026-08-18 (v9.0.0-alpha.6 broken iOS framework; do not pin @capacitor/core@next)
- [A-S25] -- https://capacitorjs.com/docs/ -- accessed 2026-08-18 (Capacitor intro: cross-platform native runtime; Web Native framing)
- [A-S27] -- https://capacitorjs.com/docs/getting-started -- accessed 2026-08-18 (Install flow; capacitor.config.ts shape; npx cap init scaffold)
- [A-S28] -- https://capacitorjs.com/docs/v8/config -- accessed 2026-08-18 (CapacitorConfig TypeScript interface; per-platform ios / android blocks; server block; env vars CAPACITOR_ANDROID_STUDIO_PATH / CAPACITOR_COCOAPODS_PATH)
- [A-S29] -- https://capacitorjs.com/docs/v8/cli/commands/run -- accessed 2026-08-18 (cap run: --live-reload temporarily injects server config; --target for device selection)
- [A-S30] -- https://capacitorjs.com/docs/android/configuration -- accessed 2026-08-18 (AndroidManifest.xml edits; build.gradle applicationId; strings.xml app_name; custom_url_scheme via intent-filter)
- [A-S31] -- https://capacitorjs.com/docs/ios/configuration -- accessed 2026-08-18 (Info.plist; CFBundleURLTypes; Universal Links; iPadOS 26 UIDesignRequiresCompatibility; PrivacyInfo.xcprivacy)
- [B-S9] -- https://github.com/ionic-team/capacitor/blob/main/cli/src/declarations.ts -- accessed 2026-08-18 (CLI TypeScript schema: CapacitorConfig.webDir, server.url, server.cleartext, server.androidScheme, server.iosScheme, server.allowNavigation, server.errorPath; ios.contentInset, ios.scrollEnabled, ios.allowLinkPreview, ios.limitsNavigationsToAppBoundDomains; android.allowMixedContent, android.appendUserAgent, android.webContentsDebuggingEnabled, android.includePlugins, android.minWebViewVersion, android.buildOptions)