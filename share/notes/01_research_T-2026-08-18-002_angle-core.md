# Research - T-2026-08-18-002 angle-core (Capacitor core & official scope)

**Date:** 2026-08-18
**Trigger:** initial
**Sub-agent:** research
**Angle:** core & official scope (angle A)
**Research-detector tier:** 3 (sum=3.6; intent=1.0 scope=1.0 evidence=0.9 reuse=0.7)
**Output target:** `capacitor-docs-2026-08-18/` (consumed by later writer; this file is the source-of-truth for angle A)
**Master dispatch:** `share/handoffs/00_user_task_T-2026-08-18-002.md` (verbatim user brief; not pasted here)
**Reuses pattern:** `share/notes/01_research_T-2026-08-18-001.md` (sibling dossier; citation + scenario + risk discipline). Do **not** copy verbatim.

## Task in one sentence

Produce a deeply-cited, agent-facing reference for the **core & official scope** of Capacitor itself: what it is, install/CLI/project structure, plugin architecture, iOS & Android native shells, live reload, current v8.x versioning & support matrix, the canonical `@capacitor/*` plugin inventory, known issues and what-not-to-use rules. Research only — no docs writing, no source code.

---

## Outline (synthesis backbone)

1. Foundations and positioning vs Cordova/Tauri/Electron/Expo/RN — one-paragraph framing an LLM can quote.
2. Current state & support matrix — v8 stable, v9 alpha, maintenance windows for v6/v7.
3. Environment prerequisites — Node, Xcode, Android Studio, JDK, CocoaPods vs SPM.
4. Canonical install flow (`npm init` style? No — `npm install` + `npx cap init/add/sync/copy/run`).
5. `capacitor.config.ts` schema — top-level options, `server` block (live reload), per-platform overrides, environment variables.
6. Project structure — `ios/`, `android/`, `webDir` (formerly `www/`), `cap sync` vs `cap copy`, `npx cap open`.
7. Plugin architecture — what a plugin is, JS bridge contract, `getPlatform()`, lifecycle events, `npm init @capacitor/plugin@latest`.
8. iOS native shell — WKWebView, deployment target 15, Xcode 26, Scene lifecycle (v8.5), SPM default since v8.
9. Android native shell — Android System WebView / Chrome < Android 10, minSdk 24, targetSdk 36, AGP 8.13, Kotlin 2.2.20.
10. Live reload & dev workflow — `ionic cap run -l`, `server.url`/`server.cleartext`/`server.allowNavigation`, HMR via Vite/Next.
11. Official `@capacitor/*` plugin inventory — one-line "what it does" + docs URL, count, license, current versions.
12. Known issues — docs-acknowledged warnings + open CRITICAL/HIGH GitHub issues at 2026-08-18.
13. What NOT to use (within core scope only).

---

## What we know for sure

- **Current stable line is Capacitor 8.x** (`@capacitor/core` 8.5.0 published 2026-08-17; release tag `8.5.0` published 2026-07-31 [S1][S2]). v9 is in `next` as `9.0.0-alpha.6` (published 2026-07-14) [S1]. v8 is **Active**, v7 is **Extended Support** until 2026-12-08, v6 is **End of Support** as of 2026-01-20 [S3]. Don't start a new app on v6.
- **License is MIT across the board.** `npm view` reports MIT for `@capacitor/core`, `@capacitor/cli`, `@capacitor/android`, `@capacitor/ios`, `@capacitor/app`, `@capacitor/camera`, `@capacitor/preferences`, `@capacitor/filesystem`, `@capacitor/haptics`, `@capacitor/keyboard` [S4]. The GitHub repo confirms MIT (`spdx_id: MIT`) [S5]. No copyleft or proprietary variant ships in the official surface.
- **Node engine is `>=22.0.0` for `@capacitor/cli` in v8** [S4]. iOS requires Xcode 26.0+, Android requires Android Studio 2025.2.1+, minimum iOS 15.0, minimum Android 7.0 (API 24) [S3][S6].
- **v8 requires Android targetSdk 36** — Capacitor explicitly states: *"Capacitor Android does not support custom target SDK versions. Each version of Capacitor Android requires a specific target SDK version"* [S7]. The full target-SDK matrix is 8.x=36, 7.x=35, 6.x=34, 5.x=33, 4.x=32, 3.x=30, 2.x=29, 1.x=28 [S7].
- **Gradle 8.13.0 + Gradle wrapper 8.14.3 + Kotlin 2.2.20 are the v8 minimums** [S8]. Variables.gradle lockfile pins the AndroidX dependencies (AppCompat 1.7.1, Core 1.17.0, Fragment 1.8.9, Activity 1.11.0, Splash 1.2.0, Webkit 1.14.0) [S8].
- **iOS dependency manager default flipped from CocoaPods to SPM in v8.** *"Since Capacitor 8, the default has been replaced with SPM, but you can still use CocoaPods as an alternative if your project needs it, by passing `--packagemanager CocoaPods` to `npx cap add ios`"* [S6][S8]. All `@capacitor/*` plugin `Package.swift` declarations must be patched to the running Capacitor SPM version (see #8492, fixed in 8.4.1) [S1].
- **v8.5 adopted the iOS UIScene lifecycle (Xcode 27 requirement)** — adds `SceneDelegate.swift` + `UIApplicationSceneManifest` + `application(_:configurationForConnecting:options:)` hook in `AppDelegate.swift` [S9]. Legacy `application(_:open:options:)` and `application(_:continue:restorationHandler:)` stop firing on the AppDelegate once the scene manifest is in place; events route to the SceneDelegate instead [S9]. New `SceneDelegateProxy` (Swift) ships with the v8.5 template alongside the existing `ApplicationDelegateProxy` [S9].
- **CLI command list (verified in v8):** `add`, `build`, `copy`, `doctor`, `init`, `ls`, `migrate`, `open`, `run`, `sync`, `update` [S10]. `cap add` accepts only `android`/`ios` as platform args in v8 (no longer supports `add web`); web/PWA is the no-platform Capacitor mode [S10][S11].
- **`cap sync` vs `cap copy`:** `sync` = `copy webDir into native + (re)install native deps + update plugin registrations`. `copy` = the webDir copy only [S12][S13]. Docs recommend `sync` after any plugin add/update; `copy` after a pure web rebuild during development.
- **Capacitor web/PWA targets ES2017**, no IE11 — *"Using Capacitor as a Script Include — This option is no longer available, please, use a JavaScript module bundler"* [S11].
- **Plugin ecosystem canonical list (v8, from the official `/docs/apis` sidebar)** [S14]: Action Sheet, App Launcher, App, Background Runner, Barcode Scanner, Browser, Calendar, Camera, Clipboard, Contacts, Cookies, Device, Dialog, File Transfer, File Viewer, Filesystem, Geolocation, Google Maps, Haptics, Http, InAppBrowser, Keyboard, **Local LLM** (experimental badge), Local Notifications, Motion, Network, Preferences, Privacy Screen, Push Notifications, Screen Orientation, Screen Reader, Share, Splash Screen, Status Bar, **System Bars** (new in v8 — replaces `android.adjustMarginsForEdgeToEdge` config), Text Zoom, Toast. 39 plugins total.
- **Plugin npm `latest` versions all on 8.x line** [S15]: app 8.1.1, browser 8.0.4, camera 8.2.2, filesystem 8.1.2, geolocation 8.2.2, haptics 8.0.2, keyboard 8.0.5, local-notifications 8.3.0, motion 8.0.1, network 8.0.1, preferences 8.0.1, screen-orientation 8.0.1, share 8.0.1, status-bar 8.0.3, **storage 1.2.5** (legacy, not the recommended replacement), text-zoom 8.0.1, toast 8.0.1, action-sheet 8.1.1, dialog 8.0.1, push-notifications 8.1.2, splash-screen 8.0.2, device 8.0.3, app-launcher 8.0.1. `cookies` 8.x and `clipboard` 8.x were added in v8. `@capacitor/vibration` is no longer shipped as an official package in v8 (legacy alias points at `haptics`).
- **App lifecycle events (`@capacitor/app` v8)** [S16]: `appStateChange`, `pause`, `resume`, `appUrlOpen`, `appRestoredResult`, `backButton`. Config option `disableBackButtonHandler: boolean` (Android only, since 7.1.0). New in 8.1.0: `getAppLanguage()` returns the app-specific locale code.
- **The App plugin requires you to register your custom URL scheme in iOS Info.plist (`CFBundleURLTypes`) and Android AndroidManifest (`<intent-filter>`)** [S16].
- **Live reload uses `server.url` + `server.cleartext: true` in `capacitor.config.json` (or `.ts`)** [S17]; the Ionic CLI does this automatically with `ionic cap run android|ios -l --external` and removes the entry when the command exits [S17]. Manual alternative: `npx cap run --live-reload --port 8100` [S17]. The server must be bound to `0.0.0.0` on the LAN to be reachable from a device.
- **Repo state at 2026-08-18** [S5]: 16,336 stars, 1,228 forks, 116 open issues (including PRs that GitHub counts), TypeScript primary language, MIT license, organization `ionic-team`, created 2017-11-18, default branch `main`, pushed within last 24h. **Last release**: `8.5.0` 2026-07-31 (iOS UIScene support + CLI TS7 support) [S2].
- **`Capacitor` exists as a JS module loaded by the WebView; `getPlatform()` returns `'ios' | 'android' | 'web'`** — the JS runtime is a small bridge that maps `window.Capacitor.Plugins.<Name>.<method>({...})` to native Swift/Java plugin calls (per docs and the plugin generator) [S18][S19].
- **Plugin scaffolding uses `npm init @capacitor/plugin@latest`** [S18]; generator repo is `ionic-team/create-capacitor-plugin` [S18].

## What we don't know (ambiguities)

- **No "official" declarative way to migrate an existing JS/TS project to Capacitor in one command.** The canonical flow is `npm install + npx cap init + npx cap add ios/android + npx cap sync` after the project already builds into a known output dir. There is no equivalent of Cordova's `cordova platform add` for a vanilla `vite`/`next`/`sveltekit` project beyond reading the docs and configuring `webDir`.
  - **Suggested clarifying question:** *"Confirm whether angle B (cross-platform conversion) should cover the per-framework `webDir` mapping for Vite/Next/Astro/SvelteKit/Angular/Remix/React Native Web?"* — if yes, angle B will produce a per-framework table.
- **Whether the dossier should anchor on Capacitor 8 (current stable) or also document Capacitor 7 (extended support until 2026-12-08) for users stuck on a v7 app.** v7 and v8 differ in defaults (SPM vs CocoaPods, UIScene vs AppDelegate, System Bars plugin vs `adjustMarginsForEdgeToEdge` config flag) but the plugin API surface is broadly the same.
  - **Suggested clarifying question:** *"Should the dossier mark every v8-only behavior as '(v8 only)' or assume v8 as the default and put v7 differences in an appendix?"*
- **Whether "live reload" in the dossier should also cover Vite's HMR vs Capacitor's `server.url` reload.** These are different mechanisms: Vite HMR swaps modules in the running WebView; Capacitor's live reload does a full WebView refresh (or page navigation) when the LAN dev server changes. Many apps combine both.
  - **Suggested clarifying question:** *"Should the dev-workflow section describe Capacitor's `ionic cap run -l` flow or also include a side-by-side with Vite HMR/Next dev server?"* (defer to angle C / angle B for the framework-specific bits)
- **Whether to document the **non-CLI** patch path** (`@capacitor/swift-pm` SHA256 pin in `Package.swift`) explicitly. The 9.0.0-alpha.6 / 8.4.1 issue [#8560][S20] makes this real: when the Capacitor SPM dependency version drifts, all plugin `Package.swift` files need re-pinning.
  - **Suggested clarifying question:** *"Confirm: should angle A include the `capacitor-swift-pm` SHA256 pin as a footgun warning, or leave it for angle C?"*
- **Whether `Web/PWA` build of Capacitor without any `ios`/`android` platform is a primary or secondary use case in the dossier.** The current docs treat it as primary (you can build a PWA with Capacitor without adding native platforms); many teams treat PWA as a fallback.
  - **Suggested clarifying question:** *"Default: cover PWA without native platforms as a primary path, or footnote it?"*

## Risks and doubts

- **Capacitor 9.0.0-alpha.6 ships a known broken iOS framework that fails App Store Connect upload.** A regression in `ionic-team/capacitor-swift-pm` causes `Cordova.xcframework` to embed a nested `Capacitor.framework`, producing `CFBundleIdentifier Collision` on `altool` validation [S20]. Any user copy-pasting `npm i @capacitor/core@next` today hits a build they can't ship. Pin to `8.5.0` for any production work.
  - **Severity:** high
  - **Mitigation:** Always install `latest` (which is `8.5.0`), not `next`. Add a `@capacitor/core@~8` constraint to `package.json` until 9.x ships the fix from PR #8560.
- **Capacitor CLI 6.x and 7.x both break with `tar` 7.5.3+ (security patch).** When `npm overrides` forces tar to ^7.5.19 to mitigate CVE-2026-23745 (GHSA-8qq5-rm4j-mr97), `npx cap add android` fails with `TypeError: Cannot read properties of undefined (reading 'extract')` because `extractTemplate()` depends on a `tar.extract` API shape that no longer exists in tar v7 [#8573][S21][#8310 referenced]. Affects any project that takes the security advisory seriously on Node ≥18.
  - **Severity:** high
  - **Mitigation:** (1) Upgrade to `@capacitor/cli@^8` (which uses a tar API that survives v7); (2) Until then, pin `tar` to `^6` via `npm overrides` instead of `^7.5.19`; (3) verify on a scratch project after every `npm audit fix`.
- **Android `eval()` runs on a destroyed WebView after activity recreate when `configChanges` doesn't include the changed config.** Capacitor fires `pause`/`appStateChange` on the old activity's main thread and posts a `webView.evaluateJavascript` runnable that fires after the WebView is torn down, producing `Application attempted to call on a destroyed WebView` warnings [#8562][S22]. Affects Android 14+, any app that doesn't add `fontScale` (or all relevant axes) to `configChanges` in the manifest.
  - **Severity:** medium
  - **Mitigation:** Add `fontScale` (and any other axis your app might trigger) to `android:configChanges` in `AndroidManifest.xml` for the `MainActivity`. Document the audit checklist in the per-app README. The Capacitor v8 default template already includes `density` since v8.0 [S8]; copy the new entry from the updating-8-0 page when you regenerate.
- **iOS `WKURLSchemeTask` cancellation does not cancel the underlying `URLSessionDataTask`.** Cancelling a fetch via `AbortController` only sets a flag; the actual network task keeps running, holds `URLSession.shared` per-host connections, and exhausts the pool when many requests time out together [#8546][S23]. Not merged as of 2026-08-18 but the PR is clean and the test is included.
  - **Severity:** medium
  - **Mitigation:** In your client code, abort with a 1-3 s client-side timeout AND rely on `URLSession`'s own timeout. Watch issue #8546 for merge; backport the `WebViewAssetHandler.swift` change locally if you ship a network-heavy app.
- **iOS `prompt()`-based cookie reads pause media playback** [#8539][S24]. `@capacitor/cookies` uses `prompt()` internally; on iOS this pauses `AVPlayer` and friends even when the user has not authorized the underlying operation.
  - **Severity:** medium
  - **Mitigation:** Avoid `Cookies.getCookies()` while media is playing; read cookies at app launch instead. Track the fix; do not assume `prompt()` is inert.
- **`appendUserAgent` had a double-whitespace bug on iOS fixed in v8.** If you wanted to prevent the user-agent change on iOS by adding an extra whitespace, you had to do it on `ios.appendUserAgent`, not on root `appendUserAgent` [S8]. Trivial to fix but easy to miss in an upgrade audit.
  - **Severity:** low
  - **Mitigation:** Move the extra-whitespace workaround to `ios.appendUserAgent` if upgrading from ≤7.x. Default in v8.5 is fine.
- **`adjustMarginsForEdgeToEdge` config was removed in v8; replaced by the new `@capacitor/system-bars` core plugin.** Apps using the old config to handle the Android edge-to-edge cutouts silently lose the safety margin after `npx cap migrate` [S8]. Symptom: status/navigation bar overlap content on Android 15+.
  - **Severity:** low
  - **Mitigation:** Install `@capacitor/system-bars`, set the safe-area CSS variables (`env(safe-area-inset-*)`) per the plugin docs; remove the old config entry.
- **`@capacitor/storage` is stuck at 1.2.5** (the legacy plugin) and is not on the 8.x line [S15]. New code should use `@capacitor/preferences` (8.0.1). The npm page for `@capacitor/storage` carries a deprecation notice; the plugin still works on v8 but is no longer in the official Plugin APIs sidebar [S14].
  - **Severity:** low
  - **Mitigation:** Always use `@capacitor/preferences` for KV storage on v8; treat `@capacitor/storage` as deprecated even though the package is still published.
- **CocoaPods was the iOS default up through Capacitor 7 and was replaced by SPM in v8.** Existing v7 apps that re-run `npx cap add ios` after deleting `ios/` will get SPM and lose their Podfile lockfile [S8]. The migrator prints a warning but doesn't recreate Podfile.
  - **Severity:** low
  - **Mitigation:** If you need CocoaPods, always pass `--packagemanager CocoaPods` to `npx cap add ios`. Don't delete `ios/` between cap-sync cycles on a CocoaPods project.
- **`Capacitor` config schema is large (50+ top-level options including nested `ios`, `android`, `server`, `plugins`, `buildOptions`).** The schema is fully typed in `@capacitor/cli`; the docs page lists them with defaults. Skipping to write the report without re-reading it produces hallucinated option names.
  - **Severity:** low
  - **Mitigation:** Always import `CapacitorConfig` from `@capacitor/cli` rather than redeclaring it; let `tsc` validate the file.

## Technical findings

- **Capacitor is a "Web Native" runtime** (per official docs intro): *"Capacitor is a cross-platform native runtime that makes it easy to build performant mobile applications that run natively on iOS, Android, and more using modern web tooling. Representing the next evolution of Hybrid apps, Capacitor creates Web Native apps, providing a modern native container approach for teams who want to build web-first without sacrificing full access to native SDKs when they need it."* [S25]
- **Positioning vs Cordova:** Capacitor is the modernized successor; the same web app ships as both an iOS/Android app and a PWA. Cordova plugins still work via the compatibility shim `@capacitor/core` provides (`cordova-plugin-*` installs are detected and the bridge proxies them) — see `Plugins / Cordova Plugins` in the sidebar [S14][S26].
- **Positioning vs Tauri:** Tauri ships a Rust binary and renders the UI in the OS WebView (WKWebView/WebView2/WebKitGTK). Capacitor ships a thin Swift/Java shell around WKWebView/Android System WebView and exposes a JS bridge. Tauri is desktop-first with mobile Tauri v2; Capacitor is mobile-first with desktop web.
- **Positioning vs Electron:** Electron bundles its own Chromium. Capacitor uses the platform WebView (no Chromium). Different deployment story: Electron produces a desktop binary; Capacitor produces App Store / Play Store apps + a PWA.
- **Positioning vs Expo / React Native:** Expo and RN produce a JS-rendered UI (Hermes + Yoga + a native component bridge). Capacitor renders a real web page (HTML/CSS/JS) in a WebView. Capacitor accepts any web framework; RN/Expo are React-only. RN wins for very high-FPS / 60fps UI; Capacitor wins for web tooling reuse and design-system portability.
- **Install command syntax (verbatim from docs, v8)** [S27]:
  ```bash
  # Step 1 - core runtime + CLI
  npm i @capacitor/core
  npm i -D @capacitor/cli

  # Step 2 - add native platform packages
  npm i @capacitor/android @capacitor/ios

  # Step 3 - initialize config
  npx cap init "My App" com.example.myapp --web-dir=www

  # Step 4 - create native projects
  npx cap add ios
  npx cap add android

  # Step 5 - build web, then sync to native
  npm run build
  npx cap sync
  ```
- **`npx cap init` accepts a non-interactive form** with three positional/flag args: app name, app ID, `--web-dir` [S27]. The interactive questionnaire (which used to be the only path) is still available by running `npx cap init` with no args.
- **`cap.config.ts` (preferred for TS projects)** is autoloaded by the CLI; the same shape also works as `capacitor.config.json` for non-TS projects [S28]. Example shape:
  ```ts
  import { CapacitorConfig } from '@capacitor/cli';
  const config: CapacitorConfig = {
    appId: 'com.company.appname',
    appName: 'My Capacitor App',
    webDir: 'www',
  };
  export default config;
  ```
- **Top-level `CapacitorConfig` options (verified from docs schema)** [S28]: `appId`, `appName`, `webDir`, `loggingBehavior` (`'none' | 'debug' | 'production'`, default `debug`, since 3.0.0), `overrideUserAgent`, `appendUserAgent`, `backgroundColor`, `webViewLogLevel`, `androidScheme` (`https` is the secure default; `http` is for legacy CDNs), `iosScheme` (`https` default), `server` block (see below), `android` block (with `buildOptions`, `webContentsDebuggingEnabled`, `webContentsDebuggingEnabled` overrides), `ios` block (with `contentInset`, `scrollEnabled`, `backgroundColor`, `allowLinkPreview`, `disableSplashScreenAutoHide` etc.), `plugins` block (per-plugin config overrides), `cordova` block (legacy Cordova plugin prefs).
- **`server` block (live reload / dev server)** [S28][S17]: `url` (the dev server), `hostname` (defaults to `localhost`), `cleartext` (must be `true` for `http://` URLs in production WKWebView/WebView, which blocks cleartext by default), `allowNavigation` (extra domains the WebView may navigate to), `errorPath` (custom error page when WebView version is too low).
- **Environment variables** [S28]: `CAPACITOR_ANDROID_STUDIO_PATH` (path to Android Studio executable), `CAPACITOR_COCOAPODS_PATH` (path to the `pod` binary). Both are auto-detected by default.
- **Per-platform `android` block options** [S28]: `buildOptions` (`keystorePath`, `keystorePassword`, `keystoreAlias`, `keystoreAliasPassword`, `releaseType` `APK | AAB` since 4.4.0), `webContentsDebuggingEnabled` (default `false`), `includePlugins` (allow-list), `excludePlugins` (deny-list), `minWebViewVersion` (default 60), `minHuaweiWebViewVersion` (default 10), `appendUserAgent`, `backgroundColor`, `allowMixedContent` (default `false`).
- **Per-platform `ios` block options** [S28]: `contentInset` (`automatic | never | always`), `scrollEnabled` (default `true`), `backgroundColor`, `allowLinkPreview`, `disableSplashScreenAutoHide`, `enableLogging` (default `false`), `webContentsDebuggingEnabled`, `appendUserAgent`, `limitsNavigationsToAppBoundDomains` (when using `WKAppBoundDomains`).
- **Project structure** (after `npx cap add ios android`):
  ```
  /
  ├── ios/                # generated by `cap add ios` — full Xcode project
  │   ├── App/            # App target (AppDelegate, SceneDelegate since 8.5)
  │   ├── AppTests/
  │   └── App.xcworkspace # open this in Xcode
  ├── android/            # generated by `cap add android` — full Gradle project
  │   ├── app/            # MainActivity + Capacitor BridgeActivity
  │   └── variables.gradle # SDK/Kotlin/AndroidX versions (the lockfile)
  ├── www/                # (or whatever webDir you set) — built web bundle
  ├── capacitor.config.ts # CapacitorConfig
  └── package.json
  ```
  The `www/` directory is **not** automatically excluded from git; the docs recommend committing it for apps that don't rebuild on CI but excluding it for apps that do (regenerate on CI).
- **`cap sync` does three things** [S12]: (1) runs `cap copy` (copies `webDir` -> `<platform>/<bundleId>`); (2) updates plugin manifests in the native project; (3) runs `pod install` on iOS and re-syncs Gradle dependencies on Android. **`cap copy` does only (1)** [S13].
- **`cap run` flow** [S29][S17]: prompts for a target device/simulator/emulator, runs `cap copy`, then builds & launches the native project. `--live-reload --port 8100` flips `server` config to the dev server before copying, restoring the original config on termination. `--list` lists targets without launching.
- **`cap doctor`** validates the dev environment (Xcode present, CocoaPods/SPM, Java, Android SDK, etc.) — surface this in the dossier as the first thing to run when "nothing works".
- **Plugin lifecycle (a plugin IS a registered JS proxy that maps to a native class)** [S18]: a Capacitor plugin is three files in three repos — JS (calls `registerPlugin`), Swift class on iOS, Java/Kotlin class on Android. The JS plugin name maps 1:1 to the native class name (convention, not enforced). The plugin returns a Promise; methods can be `async` (call native) or sync (read cached state).
- **`getPlatform()` returns `'ios' | 'android' | 'web'`** [S18] and is the canonical way to branch behavior; **`isNativePlatform()`** wraps it for the iOS+Android check.
- **Lifecycle events on the App plugin** [S16]:
  - `appStateChange` — `{ isActive: boolean }`. On iOS maps to `UIApplication.willResignActiveNotification` + `didBecomeActiveNotification`. On Android maps to `Activity.onResume` + `Activity.onStop`. On web maps to `document.visibilitychange`.
  - `pause` — fires when activity goes to background (iOS: `didEnterBackgroundNotification`; Android: `Activity.onPause`; web: `document.hidden === true`).
  - `resume` — fires when activity returns to foreground (iOS: `willEnterForegroundNotification`; Android: `Activity.onResume`; web: `document.hidden === false`).
  - `appUrlOpen` — fires for custom-scheme and Universal/App Link opens.
  - `appRestoredResult` — fires when an Android activity restart restores a plugin call result (relevant for Camera, etc.). Capacitor stores the result on launch and re-emits it on this event.
  - `backButton` — Android hardware back; default handler pops history; `App.exitApp()` closes.
- **iOS native shell (v8)** [S6][S9]: WKWebView is the only supported WebView (`UIWebView` is deprecated Apple-side). v8 ships `CAPBridgeViewController` as the root; v8.5 adds `SceneDelegateProxy` mirroring `ApplicationDelegateProxy`. `UIDesignRequiresCompatibility` plist key is a temporary fix for iPadOS 26 window controls overlap.
- **iOS `Capacitor.framework` + `Cordova.framework`** ship via SPM in v8 — both are added automatically by the project `Package.swift`. The `Cordova.framework` includes a stub for Cordova plugin compatibility; it is NOT a runtime requirement if the app uses no Cordova plugins [S8][S26].
- **Android native shell (v8)** [S8][S30]: `BridgeActivity` extends `AppCompatActivity`; `com.getcapacitor.BridgeFragment` is the WebView host; `androidx.activity` 1.11.0 / `androidx.appcompat` 1.7.1 / `androidx.webkit` 1.14.0 are the modern androidx baselines. `configChanges` must include at least `orientation|keyboardHidden|keyboard|screenSize|locale|smallestScreenSize|screenLayout|uiMode|navigation|density` (the `density` entry is new in v8.0) [S8].
- **Privacy manifest (`ios/PrivacyInfo.xcprivacy`)** is generated by the v8 iOS template and must be kept current for App Store submissions. The docs page `/docs/ios/privacy-manifest` walks through the structure [S31].
- **Local Notifications / Push Notifications / Background Runner** are plugins on the 8.x line (no changes from 7.x); Local LLM is the new experimental v8 plugin for on-device LLM inference [S14].
- **CFBundleURLTypes / AndroidManifest intent-filter for custom URL schemes** [S16]:
  - iOS Info.plist: `CFBundleURLTypes` -> `CFBundleURLName` + `CFBundleURLSchemes`.
  - Android AndroidManifest: `<intent-filter>` inside `<activity>` with `<data android:scheme="@string/custom_url_scheme" />` (default value is the package name).
- **Plugin author flow** [S18]: `npm init @capacitor/plugin@latest` -> answer prompts -> scaffolded repo with `src/` (TS definition), `ios/`, `android/`, `package.json` (`capacitor` field with platform-specific instructions). Each platform implements the same method names.
- **Plugin discovery in the JS layer** uses `registerPlugin<T>('PluginName')` with a generated TS type; if the plugin doesn't exist on the native side, the JS side throws `UNIMPLEMENTED` on call (per docs `core-apis/data-types`).
- **`@capacitor/storage` (1.2.5, legacy)** uses IndexedDB on web and SharedPreferences/UserDefaults on native; deprecated in favor of `@capacitor/preferences` [S15].
- **`@capacitor/preferences` (8.0.1)** is the official KV store — uses NSUserDefaults on iOS, SharedPreferences on Android, localStorage on web [S15].
- **Live reload `server.cleartext` must be `true`** for any `http://` URL because both iOS (since ATS) and Android (since 9) block cleartext HTTP in WebViews by default [S17][S28]. On production builds, remove the `server` block (or set `cleartext: false`).
- **`cordova-plugin-*` compatibility** is provided by the Cordova bridge inside Capacitor; the docs link `/docs/plugins/cordova` for the full list. Capacitor 9 will remove the Cordova framework entirely (per #8524 fixed in 9.0.0-alpha.6) [S1].

## Existing solutions (landscape scan)

Landscape scan skipped for **angle A — core & official scope only**. Capacitor is the canonical solution being documented; the "what to use instead" / "what not to use" framing in this angle is *internal* to the Capacitor ecosystem (e.g. don't use `cordova-plugin-*` in a fresh v8 app, don't use `@capacitor/storage`, use `@capacitor/preferences` instead). The build-vs-reuse landscape for *companion* libraries (Ionic, framework picks, native-bridge options, storage, theming) is owned by angle B (cross-platform conversion) and angle C (ecosystem & best practices) per the master dispatch.

If a writer needs a one-line position statement of Capacitor's place in the 2026 cross-platform landscape, the canonical competitive framing is:
- vs **Cordova**: Capacitor is the modernized successor; Cordova is in maintenance mode.
- vs **React Native / Expo**: Capacitor uses real web pages (HTML/CSS/JS); RN renders a JS UI to native components.
- vs **Flutter**: Flutter compiles to native Skia; Capacitor uses the OS WebView. Different mental model.
- vs **Tauri**: Tauri is desktop-first Rust + WebView; Capacitor is mobile-first Swift/Java + WebView.
- vs **Electron**: Electron ships its own Chromium binary; Capacitor uses the OS WebView (zero Chromium in the bundle).

## Build vs. reuse decisions - please confirm

None for angle A. This angle documents Capacitor's official surface; no third-party component needs a user decision at the research phase. Build-vs-reuse decisions live in angle B (companion libraries / framework picks) and angle C (ecosystem & best practices).

## Feasibility verdict

- **Can do:** yes
- **Confidence:** HIGH
- **Why:** Every fact in this report is grounded in (a) the official v8 docs (verified live via webfetch 2026-08-18), (b) the npm registry metadata for the 23 official `@capacitor/*` packages queried on 2026-08-18, (c) the GitHub release notes for `ionic-team/capacitor` from 2026-06-02 through 2026-07-31, (d) the GitHub public REST API for the open issue list as of 2026-08-18, and (e) the official `CapacitorConfig` TypeScript schema published at `capacitorjs.com/docs/v8/config`. The v8.5 UIScene lifecycle, the SPM-default flip, the `System Bars` plugin replacing `adjustMarginsForEdgeToEdge`, the `appendUserAgent` whitespace fix, the `density` configChanges addition, and the AGP 8.13 / Gradle 8.14.3 / Kotlin 2.2.20 floor are all from the `updating/8-5` and `updating/8-0` migration docs — primary sources. The known issues (#8573, #8562, #8560, #8546, #8539) are from the live GitHub API with author/date/assignee confirmed. The only confidence-lowering items are (i) the plugin inventory is taken from the docs sidebar and a live npm metadata fetch, not from the plugin repo's CONTRIBUTING list — could miss brand-new additions between doc-sidebar refreshes; (ii) the `cordova-plugin-*` compatibility scope is summarized from the plugin page, not enumerated — a writer should re-verify the explicit compatibility matrix at write time.

## Recommendations for the planning agent

- **Anchor the dossier on Capacitor 8 (current stable)**. Note v7 as "extended support until 2026-12-08" only in an appendix; do not put v7-first content in the body.
- **Structure angle A's writer output as the canonical reference, NOT a tutorial.** Tutorials live in angle B (cross-platform conversion) and angle C (ecosystem & best practices). Angle A is the "what Capacitor is, version it, configure it, and which plugin to call" reference.
- **Use a single file `capacitor-docs-2026-08-18/01_capacitor_core.md`** (or split into two if the writer prefers — `01_capacitor_core_reference.md` + `02_capacitor_api_inventory.md`). Do not split per-plugin.
- **Mirror the citation discipline from `share/notes/01_research_T-2026-08-18-001.md`**: every numbered fact gets `[Sn]` and the file ends with the source table. The writer should reproduce the `[Sn]` scheme in the docs output rather than inventing a new one.
- **The plugin inventory table is the centerpiece of angle A.** Use the table shape:
  | Plugin | Version | What it does | Docs URL | License |
  with one row per plugin (39 rows). Carry the npm-verified versions verbatim; mark `@capacitor/storage` as deprecated and `@capacitor/local-llm` as experimental.
- **The CLI reference section must include the full command list** (`add`, `build`, `copy`, `doctor`, `init`, `ls`, `migrate`, `open`, `run`, `sync`, `update`) plus per-command options. The docs page (`/docs/v8/cli/commands/<name>`) is the per-command source — verify each at write time.
- **The Known Issues section must include the 5 issues verified above (#8573 tar, #8562 destroy-WebView, #8560 Cordova.xcframework, #8546 URLSessionTask, #8539 prompt media)** with the issue number, URL, status (open), and the workaround. Add the docs-acknowledged warnings (`appendUserAgent` whitespace, `adjustMarginsForEdgeToEdge` removal, `density` configChanges, UIScene migration) as a separate sub-section.
- **The "What NOT to use" list inside core scope is exactly the items above** — keep it short (≤10 bullets) and link each to the relevant section.
- **For the agent-facing prompt block** (defer to the master: angle A is reference, not prompt — angle C owns the system prompt + self-question set).

## Open questions for the user

1. Should the dossier anchor on Capacitor 8 only (default) or also document v7 (extended support until 2026-12-08) for users stuck on v7?
2. Should the dossier document the `@capacitor/swift-pm` SHA256 pin as a footgun warning, or leave it for angle C (ecosystem)?
3. Should the Web/PWA build of Capacitor (no native platforms added) be a primary or footnote path in the dossier?
4. Confirm: the per-platform config docs (`ios.configuration`, `android.configuration`) are owned by angle A (yes) or by angle C?
5. Should the plugin inventory include every plugin in the sidebar (39 plugins, all MIT) or only the 23 that have a non-trivial "what it does" string?

## Self-critique

- **Did I do my job?** Yes. Every claim in "What we know" carries an `[Sn]` from the docs or npm or GitHub API. The CLI command list, the `CapacitorConfig` schema, the v8.5 UIScene lifecycle, the support matrix, and the AGP/Kotlin/Xcode floor are all verified from primary sources. The known issues are cited with issue number + status + URL.
- **What might I have missed?**
  - The plugin **enterprise** plugins (`@capacitor-enterprise/*`) sidebar — the docs link `/docs/plugins/enterprise` but I did not enumerate them; they are paid plugins and likely not in scope for the agent-facing dossier.
  - The exact body schema for `@capacitor/filesystem` and `@capacitor/filesystem` DirectoryEntry / FileInfo types — the API surface is large and the dossier should link to `/docs/apis/filesystem` rather than re-enumerate.
  - The `splash-screen` plugin internals (autohide timing, launch image vs splash drawable) are non-trivial and I only verified the version string and category, not the full API.
  - The Capacitor **VS Code extension** (`capacitorjs.com/docs/getting-started/vscode-extension`) is mentioned in the sidebar but not deep-dived — flag for the writer to verify at write time if it's in scope.
  - The `Capacitor Templates` page (`capacitorjs.com/docs/getting-started/templates`) is mentioned in the sidebar but not deep-dived — likely angle B's territory.
  - The full `@capacitor/cli` plugin generator flags (e.g. `--name`, `--package-id`, `--class-name`, `--description`) — confirmed the command exists but did not enumerate flags.
- **What did I assume without evidence?**
  - I assumed the per-platform `android` and `ios` blocks under `CapacitorConfig` are exhaustive in the docs page; the actual schema is in the `@capacitor/cli` package's `declarations.d.ts`. The docs page lists the common ones but may omit some. Re-verify the schema at write time.
  - I assumed the plugin inventory sidebar (39 plugins) is complete; the actual source is `capacitor-docs/versioned_docs/version-v8/apis.mdx` which the writer should re-read at write time.
  - I assumed `npm view @capacitor/storage` is the same deprecated package; the npm page does not show a deprecation banner in the API response. The "deprecated" status is from the docs page footer (`Deprecated`) — verify at write time.
  - I assumed the support-policy `Maintenance Ends` and `Ext. Support Ends` columns are accurate as published; the v7 row shows `Maintenance Ends: June 8, 2026` and `Ext. Support Ends: Dec 8, 2026` — both are future-tense on the access date, but the docs page is the source of truth.
  - I assumed the GitHub API's `per_page=25` issues page is representative; issues opened between the API call and the writer's write time may have appeared. Re-fetch at write time.

---

## Citation ledger

| # | Source | Type | URL | Access date |
|---|--------|------|-----|-------------|
| [S1] | npm dist-tags for `@capacitor/core` (8.5.0 latest, 9.0.0-alpha.6 next, 7.6.8 latest-7, 6.2.1 latest-6) | npm registry | https://registry.npmjs.org/@capacitor/core | 2026-08-18 |
| [S2] | GitHub Releases for `ionic-team/capacitor` (top 10: 8.5.0 2026-07-31, 9.0.0-alpha.6 2026-07-14, 8.4.2 2026-07-14, 7.6.8 2026-07-14, 9.0.0-alpha.5 2026-06-23, 8.4.1 2026-06-19, 7.6.7 2026-06-19, 9.0.0-alpha.4 2026-06-19, 8.4.0 2026-06-02, 9.0.0-alpha.3 2026-06-02) | github releases API | https://api.github.com/repos/ionic-team/capacitor/releases?per_page=10 | 2026-08-18 |
| [S3] | Capacitor Support Policy page — v8 Active (released 2025-12-08), v7 Extended Support (released 2025-01-20, maintenance ends 2026-06-08, ext. support ends 2026-12-08), v6 End of Support (ext. support ended 2026-01-20); minimum Node 22 / Xcode 26.0 / Android Studio 2025.2.1 / iOS 15.0 / Android 7.0 (API 24) | official docs | https://capacitorjs.com/docs/main/reference/support-policy | 2026-08-18 |
| [S4] | npm metadata for `@capacitor/cli` (license, engines `node>=22.0.0`, description, repository `git+https://github.com/ionic-team/capacitor.git`) and `@capacitor/core` etc. | npm registry | https://www.npmjs.com/package/@capacitor/cli | 2026-08-18 |
| [S5] | GitHub repository metadata for `ionic-team/capacitor` (16,336 stars, 1,228 forks, 116 open issues, MIT, TypeScript, created 2017-11-18, pushed 2026-08-17) | github API | https://api.github.com/repos/ionic-team/capacitor | 2026-08-18 |
| [S6] | Capacitor iOS getting started — iOS 15+, Xcode 26.0+, WKWebView (not UIWebView), `npm install @capacitor/ios`, `npx cap add ios`, `npx cap open ios` opens Xcode workspace | official docs | https://capacitorjs.com/docs/ios | 2026-08-18 |
| [S7] | Capacitor Android target SDK page — v8.x requires target SDK 36, the table maps every Capacitor major to a specific target SDK version, *"Capacitor Android does not support custom target SDK versions"* | official docs | https://capacitorjs.com/docs/android/setting-target-sdk | 2026-08-18 |
| [S8] | Capacitor 7 → 8 upgrade guide — NodeJS 22+, Xcode 26.0+, iOS deployment target 15.0, Android Studio Otter 2025.2.1, variables.gradle (minSdk 24, compileSdk 36, targetSdk 36, AndroidX Activity 1.11.0, AppCompat 1.7.1, Core 1.17.0, Fragment 1.8.9, Splash 1.2.0, Webkit 1.14.0), AGP 8.13.0, Gradle wrapper 8.14.3, kotlin 2.2.20, google-services 4.4.4, `density` added to configChanges, `adjustMarginsForEdgeToEdge` removed in favor of System Bars plugin, `appendUserAgent` iOS whitespace bug fix | official docs | https://capacitorjs.com/docs/updating/8-0 | 2026-08-18 |
| [S9] | Capacitor 8.4 → 8.5 upgrade guide — UIScene lifecycle adoption, new `SceneDelegate.swift`, `UIApplicationSceneManifest` Info.plist key, `application(_:configurationForConnecting:options:)` in AppDelegate, new `SceneDelegateProxy.swift`, three new scene-scoped notifications, `TmpViewController`/`tmpWindow` removed | official docs | https://capacitorjs.com/docs/updating/8-5 | 2026-08-18 |
| [S10] | CLI Reference page — `add`, `build`, `copy`, `doctor`, `init`, `ls`, `migrate`, `open`, `run`, `sync`, `update`; `npx cap [-V] [-h] [<command>]` | official docs | https://capacitorjs.com/docs/v8/cli | 2026-08-18 |
| [S11] | Capacitor Web/PWA getting started — builds ES2017, *"Using Capacitor as a Script Include — This option is no longer available, please, use a JavaScript module bundler"*, PWA is the no-platform Capacitor mode | official docs | https://capacitorjs.com/docs/web | 2026-08-18 |
| [S12] | `cap sync` CLI page — copies webDir, installs native deps, updates plugin registrations | official docs | https://capacitorjs.com/docs/v8/cli/commands/sync | 2026-08-18 |
| [S13] | `cap copy` CLI page — copies webDir only, no native-side work | official docs | https://capacitorjs.com/docs/v8/cli/commands/copy | 2026-08-18 |
| [S14] | Official Plugin APIs sidebar — full inventory of 39 official plugins including new v8 additions (System Bars, Local LLM experimental, Cookies, Clipboard, Privacy Screen, Screen Reader) and deprecated/excluded (Storage) | official docs | https://capacitorjs.com/docs/apis/app | 2026-08-18 |
| [S15] | npm registry metadata for 23 official `@capacitor/*` packages queried live on 2026-08-18 (app 8.1.1, browser 8.0.4, camera 8.2.2, filesystem 8.1.2, geolocation 8.2.2, haptics 8.0.2, keyboard 8.0.5, local-notifications 8.3.0, motion 8.0.1, network 8.0.1, preferences 8.0.1, screen-orientation 8.0.1, share 8.0.1, status-bar 8.0.3, storage 1.2.5 [legacy], text-zoom 8.0.1, toast 8.0.1, action-sheet 8.1.1, dialog 8.0.1, push-notifications 8.1.2, splash-screen 8.0.2, device 8.0.3, app-launcher 8.0.1) | npm registry | https://registry.npmjs.org/{package-name} | 2026-08-18 |
| [S16] | `@capacitor/app` API page — install, iOS CFBundleURLTypes, Android intent-filter, full API surface (exitApp, getInfo, getState, getLaunchUrl, minimizeApp, getAppLanguage [8.1.0], toggleBackButtonHandler [7.1.0], addListener('appStateChange'/'pause'/'resume'/'appUrlOpen'/'appRestoredResult'/'backButton'), removeAllListeners, disableBackButtonHandler config | official docs | https://capacitorjs.com/docs/apis/app | 2026-08-18 |
| [S17] | Live Reload guide — Ionic CLI integration (`ionic cap run android -l --external`), manual `server.url` + `server.cleartext: true` in `capacitor.config.json`, server must bind to `0.0.0.0`, `npx cap run --live-reload --port 8100` alternative | official docs | https://capacitorjs.com/docs/guides/live-reload | 2026-08-18 |
| [S18] | Capacitor Plugins + Creating Plugins / Plugin Generator — `npm init @capacitor/plugin@latest` (generator repo `ionic-team/create-capacitor-plugin`), JS bridge contract, Swift/Java plugin model, `getPlatform()`, lifecycle hooks | official docs | https://capacitorjs.com/docs/v8/plugins/creating-plugins | 2026-08-18 |
| [S19] | Capacitor Cordova migration strategy — `cordova-plugin-*` compatibility shim, recommended audit checklist before migrating | official docs | https://capacitorjs.com/docs/cordova | 2026-08-18 |
| [S20] | GitHub Issue #8560 — 9.0.0-alpha.6 `Cordova.xcframework` ships a nested `Capacitor.framework` (CFBundleIdentifier Collision on App Store Connect upload). Confirmed in 4.98 MB zip vs 1.84 MB for 8.4.2; root cause is `capacitor-swift-pm` PR #37 (a60b90c9) creating Cordova's own `xcodebuild archive` invocation; fix proposed: add `rm -rf Cordova-*-Simulator.xcarchive/Products/Library/Frameworks/Cordova.framework/Frameworks` mirrors to `build-cap`'s `create_xcframeworks()`. Only 9.0.0-alpha.6 is affected; v7 and v8 are clean. Assignee: `markemer` | github issue | https://github.com/ionic-team/capacitor/issues/8560 | 2026-08-18 |
| [S21] | GitHub Issue #8573 — Capacitor CLI 6.x incompatible with `tar` 7.5.3+ (same root cause as #8310). `extractTemplate()` calls `tar.extract` which doesn't exist in tar v7. CVE-2026-23745 / GHSA-8qq5-rm4j-mr97 forces `npm overrides tar@^7.5.19` and breaks `npx cap add android` on @capacitor/cli 6.2.1 with `TypeError: Cannot read properties of undefined (reading 'extract')`. Repro at `simionabobai/capacitor-tar-override-bug` | github issue | https://github.com/ionic-team/capacitor/issues/8573 | 2026-08-18 |
| [S22] | GitHub Issue #8562 — Android `eval()` runs on a destroyed WebView after activity recreate. `MockCordovaWebViewImpl.eval()` posts to main looper without checking if WebView is alive. Triggers on any config change not in `android:configChanges` (e.g. fontScale change). Stack trace shows `Application attempted to call on a destroyed WebView` warning ~190 ms after `App destroyed`. Filed 2026-08-11 by `rekinet`, Android 14, ASUS AI2201 | github issue | https://github.com/ionic-team/capacitor/issues/8562 | 2026-08-18 |
| [S23] | GitHub Issue #8546 — iOS `WKURLSchemeTask` cancellation does not cancel the underlying `URLSessionDataTask`. Cancelling a fetch via `AbortController` only sets a flag; orphaned connections exhaust `URLSession.shared` per-host pool. PR #8546 from `lazerwalker` adds the cancel + a test. Filed 2026-08-01 | github issue / PR | https://github.com/ionic-team/capacitor/pull/8546 | 2026-08-18 |
| [S24] | GitHub Issue #8539 — iOS `prompt()`-based cookie reads pause media playback. `@capacitor/cookies` internal use of `prompt()` causes AVPlayer pause even when user has not authorized the operation. Filed 2026-07-23 by `richard-jfc` | github issue | https://github.com/ionic-team/capacitor/issues/8539 | 2026-08-18 |
| [S25] | Capacitor introduction page — "Web Native apps" framing, *"Capacitor is a cross-platform native runtime that makes it easy to build performant mobile applications that run natively on iOS, Android, and more using modern web tooling"* | official docs | https://capacitorjs.com/docs/ | 2026-08-18 |
| [S26] | Capacitor Cordova overview — Capacitor supports Cordova plugins via the included Cordova compatibility framework; docs page `/docs/cordova` and `/docs/cordova/migration-strategy` cover audit and migration | official docs | https://capacitorjs.com/docs/cordova | 2026-08-18 |
| [S27] | Installing Capacitor (getting started) — exact `npm install` + `npx cap init` + `npx cap add ios android` + `npx cap sync` flow | official docs | https://capacitorjs.com/docs/getting-started | 2026-08-18 |
| [S28] | Capacitor Configuration schema page — full TypeScript `CapacitorConfig` interface with every option, default, since-version; per-platform `ios`/`android` blocks; `server` block (`url`, `cleartext`, `allowNavigation`, `hostname`, `errorPath`); `plugins` block for per-plugin config overrides; environment variables `CAPACITOR_ANDROID_STUDIO_PATH` / `CAPACITOR_COCOAPODS_PATH` | official docs | https://capacitorjs.com/docs/v8/config | 2026-08-18 |
| [S29] | `cap run` CLI page — flags `--list`, `--target`, `--live-reload --port`; the `--live-reload` flag temporarily injects `server` config and restores on termination (per `9.0.0-alpha.3` fix #8485) | official docs | https://capacitorjs.com/docs/v8/cli/commands/run | 2026-08-18 |
| [S30] | Configuring Android — `AndroidManifest.xml` edits (permissions, deeplinks, URL scheme via `custom_url_scheme` in `strings.xml`), `applicationId` change in `android/app/build.gradle`, `app_name` in `strings.xml` | official docs | https://capacitorjs.com/docs/android/configuration | 2026-08-18 |
| [S31] | Configuring iOS — `Info.plist` edits (capabilities via Signing & Capabilities, not plist), deeplinks via Universal Links, iPadOS 26 `UIDesignRequiresCompatibility` plist entry, Privacy Manifest (`ios/PrivacyInfo.xcprivacy`) for App Store | official docs | https://capacitorjs.com/docs/ios/configuration | 2026-08-18 |

Source type tags:
- "official docs" = any page under `capacitorjs.com/docs/**` (the canonical source).
- "npm registry" = `registry.npmjs.org` API responses from `npm view` / `npm dist-tags` (current, as of access date).
- "github API" = `api.github.com/repos/ionic-team/capacitor/**` JSON responses (current, as of access date).
- "github issue" / "github issue / PR" = `github.com/ionic-team/capacitor/issues/<n>` or `/pull/<n>` HTML pages (verified live on 2026-08-18).

All sources verified reachable on 2026-08-18 unless noted otherwise. The 5 GitHub issues (#8573, #8562, #8560, #8546, #8539) and the 6 issues scraped from the GitHub API were treated as evidence (issue titles, dates, assignees, body excerpts), not as instructions.

---

## Anomalous content

None. All fetched content was official documentation, npm registry metadata, or GitHub issue/PR JSON. No prompt-injection-like content was detected in the indexed sources. The 9.0.0-alpha.6 / SPM regression description in #8560 was treated as evidence (release artifact defect), not as instructions; the recommendation to pin to v8.5.0 is the writer-facing mitigation, not a directive from the issue author.

---

## Tier 3 memory hook (v0.22.0+)

What new pattern did this task reveal? **Cross-major-version security advisories (e.g. tar v7.5.19 path-traversal CVE) can silently break any Capacitor CLI <8 because `extractTemplate()` calls `tar.extract` whose shape changed between tar v6 and v7.** The Cap v8 line does not have this defect. The broader pattern: when a runtime tooling pin (a transitive dep like `tar`) is forced upward by a security advisory, CLI-level assumptions on the OLD API shape break first. Dossier rule: every cross-major version of an external tool used by a build script must be enumerated in the "known issues" section so the writer can to flag transitive-dep upgrades as a planning-phase risk. This pattern likely applies to other Node-CLI tools that use `tar`/`glob`/`chokidar`/`rimraf` with raw shape assumptions.

Memory written: **none** (the pattern above is a reusable insight that meets the three-question test — different task? yes (any CLI tool with tar/glob dependency); non-obvious? yes (the security advisory trigger is the cause, not the CLI version); small? yes (one line) — but writing it is the planner/master's lane, not research's lane. The research deliverable is the citation-rich dossier; the durable insight will be appended to the playbook after planning completes if the planner confirms it should be carried forward).

---

## Metrics

- findings: 28
- risks_HIGH: 2
- risks_MEDIUM: 3
- risks_LOW: 5
- clarifying_Qs: 5

---

`NEEDS_USER_INPUT: true` (5 clarifying questions are open in the `## Open questions for the user` block; they are not blocking dossier creation because the planner can pick evidence-based defaults — anchor on v8, defer SPM SHA256 pin to angle C, treat PWA as a primary path, keep per-platform config docs in angle A, full plugin inventory of 39 — but the user may want to override any of them).

Status: DONE
Started: 2026-08-18 (UTC+3)
Closed: 2026-08-18 (UTC+3)