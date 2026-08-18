# Plugin System and Lifecycle

**Audience:** Engineer writing or evaluating Capacitor plugins.
**Anchor:** Capacitor v8.5.0 (verified 2026-08-18). v9.0.0-alpha.6 is watch-only (#8560).
**Cross-references:** `06-native-like-delivery-checklist.md` invokes the Status Bar / Splash Screen / Haptics / Keyboard / Screen Orientation plugins; `07-best-companion-libraries.md` lists the companion UI / state / router / storage layers that consume plugin output.

This chapter is the reference for the Capacitor plugin system: what a plugin is, the three-file plugin anatomy, the canonical scaffolding flow, the six lifecycle events, the full inventory of the 39 official `@capacitor/*` plugins (with version + license + docs URL), the curated community-plugin landscape and its anti-patterns, and the Cordova compat shim. Every claim cites a primary source.

## What a Capacitor plugin IS

A Capacitor plugin is a thin native proxy exposed to JavaScript via a generated module. The plugin has three pieces: a JavaScript module that calls `registerPlugin<T>('Name')` and returns a typed proxy object, a native class on each supported platform (Swift on iOS, Java or Kotlin on Android), and an optional web fallback that runs in the browser when the WebView is not Capacitor's native shell. A plugin can be official (published under the `@capacitor/*` npm scope by the Ionic Team, MIT-licensed, and listed at `capacitorjs.com/docs/apis`) or community (published under any scope, MIT or other permissive license, and surfaced via the curated `riderx/awesome-capacitor` index) [A-S18][C-S23].

Plugins are how the WebView code reaches native APIs that have no Web Platform equivalent (haptics, status bar, push, file system outside the browser sandbox). Every method on the JS proxy maps to one or more calls on the native class; the bridge serializes arguments as JSON over a `WKScriptMessageHandler` on iOS and a `WebView.evaluateJavascript` round-trip on Android. Methods return a `Promise<T>` so the JS side can `await` them like any other async function [A-S18].

## Plugin anatomy

A canonical Capacitor plugin has three files in three repos, plus the package manifest:

```
+--------------------------------------+
|  JS module (src/index.ts)            |
|  - @CapacitorPlugin decorator        |
|  - registerPlugin<Hello>('Hello')    |
|  - typed method signatures           |
|  - web() static fallback (optional)  |
+--------------------------------------+
              |  JS bridge (JSON-RPC)
              v
+----------------------+   +----------------------+
|  iOS                 |   |  Android             |
|  Hello.swift         |   |  Hello.java / .kt    |
|  HelloPlugin class   |   |  HelloPlugin class   |
|  @objec(HelloPlugin) |   |  extends Plugin      |
|  CAPPlugin methods   |   |  PluginCall methods  |
+----------------------+   +----------------------+

+--------------------------------------+
|  package.json                        |
|  - "capacitor" field with iOS +      |
|    Android registration instructions |
|  - peerDependencies @capacitor/core  |
|  - "capacitorDependencies" object    |
|    with native library coordinates   |
+--------------------------------------+
```

The JS class is a thin proxy; the heavy lifting happens on the native side. The `@CapacitorPlugin` decorator on the JS class is optional in v8 but recommended -- it lets the CLI discover the plugin's metadata and lets the bundler tree-shake unused methods. The native class names are conventional, not enforced: a `Hello` JS plugin typically maps to `HelloPlugin` on iOS and `HelloPlugin` on Android, but the contract is whatever the implementation chooses [A-S18][A-S16].

## Creating your own plugin -- the canonical flow

The canonical scaffold command:

```bash
# v8.x (verify version against npm)
npm init @capacitor/plugin@latest

# Equivalent explicit version (matches angle-core [A-S18])
npm init @capacitor/plugin@latest -- --package-id=com.example.hello
```

The generator repo is `ionic-team/create-capacitor-plugin`. The scaffold answers four prompts (package name, package ID, description, GitHub repo) and produces a repo with `src/` (TypeScript), `ios/` (Swift + Package.swift), `android/` (Java or Kotlin), `package.json`, and a README that links to the official plugin guide [A-S18].

A minimal plugin has three pieces in `src/index.ts`:

```ts
import { registerPlugin } from '@capacitor/core';

export interface HelloPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}

const Hello = registerPlugin<HelloPlugin>('Hello', {
  web: () => ({
    echo: async ({ value }: { value: string }) => ({ value }),
  }),
});

export * from './definitions';
export { Hello };
```

The three contracts are: (1) the `Promise<T>` return type -- every method must resolve to an object, never throw a bare exception; (2) the `web()` static fallback -- when the app runs in a plain browser (no Capacitor native shell), the bridge falls back to the web implementation; (3) the `getPlatform()` and `isNativePlatform()` checks -- when the web fallback is not feasible, branch on platform inside the method body and throw `UNIMPLEMENTED` for unsupported platforms [A-S18].

```ts
import { Capacitor, registerPlugin } from '@capacitor/core';

if (Capacitor.getPlatform() === 'web') {
  // Browser-only branch
} else if (Capacitor.isNativePlatform()) {
  // Native branch
}
```

The `registerPlugin<T>('Name')` call is auto-generated by the bundler from the `capacitorDependencies` object in `package.json`; if the native side is missing, the JS call resolves with `{ value: 'UNIMPLEMENTED' }` rather than throwing.

## Lifecycle events

The `@capacitor/app` plugin exposes six lifecycle events on iOS, Android, and the web. Each event maps to a platform-native signal:

| Event | iOS mapping | Android mapping | Web mapping |
|-------|-------------|-----------------|-------------|
| `appStateChange` | `UIApplication.willResignActiveNotification` + `didBecomeActiveNotification` | `Activity.onResume` + `Activity.onStop` | `document.visibilitychange` |
| `pause` | `UIApplication.didEnterBackgroundNotification` | `Activity.onPause` | `document.hidden === true` |
| `resume` | `UIApplication.willEnterForegroundNotification` | `Activity.onResume` | `document.hidden === false` |
| `appUrlOpen` | Custom scheme + Universal Links via `application(_:open:options:)` | `<intent-filter>` + `onNewIntent` | `popstate` (history navigation) |
| `appRestoredResult` | Replay of an activity-restart plugin call | Same (Camera, etc.) | n/a |
| `backButton` | n/a (iOS has no hardware back) | Hardware + gesture back, default pops history | Browser back |

The JS API is `App.addListener('eventName', handler)`; the returned `PluginListenerHandle` exposes a `.remove()` method for cleanup in `useEffect` returns or equivalent lifecycle hooks [A-S16][C-S34].

iOS hook point for app launch and URL opens: the v8.5 template registers `application(_:didFinishLaunchingWithOptions:)` on `AppDelegate` and (since v8.5 UIScene) `scene(_:willConnectTo:options:)` on the new `SceneDelegate.swift`. Pre-v8.5 apps that have not adopted the UIScene lifecycle still use the legacy AppDelegate path; both routes are supported, but new v8.5 projects should use the scene variant [A-S9].

Android hook point for `appRestoredResult` and result-replay: `onActivityResult` on `MainActivity` (Capacitor's `BridgeActivity`). The Capacitor bridge stores the result of any pending plugin call across activity recreates (e.g. Camera, Browser) and re-emits it via `appRestoredResult` so the JS side can resolve the original promise [A-S16].

Custom URL schemes (required for `appUrlOpen` to fire on a non-universal-link URL):

- iOS `Info.plist`: `CFBundleURLTypes` array with `CFBundleURLName` + `CFBundleURLSchemes` entries. The default scheme is the package ID.
- Android `AndroidManifest.xml`: `<intent-filter>` inside the `MainActivity` with `<data android:scheme="@string/custom_url_scheme" />`. The default string resource is the package name [A-S16][A-S30][A-S31].

## The 39 official plugins

The inventory below is taken from the official `/docs/apis` sidebar [A-S14] and verified against the npm registry on 2026-08-18 [A-S15]. The `@capacitor/storage` plugin is on the inventory but flagged deprecated; `@capacitor/local-llm` is on the inventory but flagged experimental; `@capacitor/vibration` is no longer shipped as a standalone package -- the npm name resolves to a legacy alias that points at `@capacitor/haptics` [A-S15]. All other plugins are on the v8.x line.

| # | Plugin (npm) | Version | What it does | Docs URL | License | Status |
|---|---|---|---|---|---|---|
| 1 | `@capacitor/action-sheet` | 8.1.1 | Native action sheet UI (iOS: `UIAlertController`; Android: `AlertDialog` with list) | `capacitorjs.com/docs/apis/action-sheet` | MIT | Active |
| 2 | `@capacitor/app` | 8.1.1 | App lifecycle (state, info, launch URL, listeners); min API for any app | `capacitorjs.com/docs/apis/app` | MIT | Active |
| 3 | `@capacitor/app-launcher` | 8.0.1 | Open another app by URL or package ID (`canLaunch` + `launch`) | `capacitorjs.com/docs/apis/app-launcher` | MIT | Active |
| 4 | `@capacitor/background-runner` | 8.x | Long-running background tasks (iOS: BGTaskScheduler; Android: WorkManager) | `capacitorjs.com/docs/apis/background-runner` | MIT | Active |
| 5 | `@capacitor/barcode-scanner` | 8.x | ML Kit (Android) / Vision (iOS) barcode + QR reader | `capacitorjs.com/docs/apis/barcode-scanner` | MIT | Active |
| 6 | `@capacitor/browser` | 8.0.4 | SFSafariViewController (iOS) / Chrome Custom Tab (Android) via `open` + `close` | `capacitorjs.com/docs/apis/browser` | MIT | Active |
| 7 | `@capacitor/calendar` | 8.x | Read / write calendar events via EKEventStore (iOS) / CalendarContract (Android) | `capacitorjs.com/docs/apis/calendar` | MIT | Active |
| 8 | `@capacitor/camera` | 8.2.2 | Take photos / record video / pick from library via the native camera UI | `capacitorjs.com/docs/apis/camera` | MIT | Active |
| 9 | `@capacitor/clipboard` | 8.x | Read / write system clipboard (added to official scope in v8) | `capacitorjs.com/docs/apis/clipboard` | MIT | Active (v8+) |
| 10 | `@capacitor/contacts` | 8.x | Read / write contacts via CNContactStore (iOS) / ContactsContract (Android) | `capacitorjs.com/docs/apis/contacts` | MIT | Active |
| 11 | `@capacitor/cookies` | 8.x | Same-site `document.cookie` behaviour on native (added to official scope in v8) | `capacitorjs.com/docs/apis/cookies` | MIT | Active (v8+) |
| 12 | `@capacitor/device` | 8.0.3 | Device info (model, OS, battery, network state, language, locale) | `capacitorjs.com/docs/apis/device` | MIT | Active |
| 13 | `@capacitor/dialog` | 8.0.1 | Native `alert` / `confirm` / `prompt` dialogs (replaces `window.alert`) | `capacitorjs.com/docs/apis/dialog` | MIT | Active |
| 14 | `@capacitor/file-transfer` | 8.x | Background file upload / download via URLSession (iOS) / OkHttp (Android) | `capacitorjs.com/docs/apis/file-transfer` | MIT | Active |
| 15 | `@capacitor/file-viewer` | 8.x | Open a file in another app via UIDocumentInteractionController (iOS) / Intent (Android) | `capacitorjs.com/docs/apis/file-viewer` | MIT | Active |
| 16 | `@capacitor/filesystem` | 8.1.2 | Read / write / append / delete files in named dirs (`Documents`, `Data`, `Library`, `Cache`, `External`, `ExternalStorage`) | `capacitorjs.com/docs/apis/filesystem` | MIT | Active |
| 17 | `@capacitor/geolocation` | 8.2.2 | GPS location via CLLocationManager (iOS) / FusedLocationProviderClient (Android) | `capacitorjs.com/docs/apis/geolocation` | MIT | Active |
| 18 | `@capacitor/google-maps` | 8.x | Native Google Maps view (separate package from the JS Maps SDK) | `capacitorjs.com/docs/apis/google-maps` | MIT | Active |
| 19 | `@capacator/haptics` (typo guard: `@capacitor/haptics`) | 8.0.2 | Tactile feedback (`impact`, `notification`, `vibrate`, `selectionStart/Changed/End`) | `capacitorjs.com/docs/apis/haptics` | MIT | Active |
| 20 | `@capacitor/http` | 8.x | Native HTTP client (Cordova-plugin-advanced-http successor) with cookie + cert handling | `capacitorjs.com/docs/apis/http` | MIT | Active |
| 21 | `@capacitor/in-app-browser` | 8.x | Custom in-app browser with toolbar color + close button (overlaps with `@capacitor/browser`) | `capacitorjs.com/docs/apis/in-app-browser` | MIT | Active |
| 22 | `@capacitor/keyboard` | 8.0.5 | Keyboard show / hide, resize mode (`Body` / `Ionic` / `Native` / `None`), accessory bar visibility, scroll behaviour | `capacitorjs.com/docs/apis/keyboard` | MIT | Active |
| 23 | `@capacitor/local-llm` | 8.x (alpha) | On-device LLM inference (experimental, Capacitor Labs; "Use at your own risk") | `capacitorjs.com/docs/apis/local-llm` | MIT | **Experimental** |
| 24 | `@capacitor/local-notifications` | 8.3.0 | Schedule and show local notifications (badge count, sound, action buttons) | `capacitorjs.com/docs/apis/local-notifications` | MIT | Active |
| 25 | `@capacitor/motion` | 8.0.1 | Accelerometer + gyroscope + orientation events (CMMotionManager / SensorManager) | `capacitorjs.com/docs/apis/motion` | MIT | Active |
| 26 | `@capacitor/network` | 8.0.1 | Network connectivity status (Wi-Fi / cellular / none) + connectivity-change listeners | `capacitorjs.com/docs/apis/network` | MIT | Active |
| 27 | `@capacitor/preferences` | 8.0.1 | Key-value store (`UserDefaults` iOS / `SharedPreferences` Android / `localStorage` web) | `capacitorjs.com/docs/apis/preferences` | MIT | Active |
| 28 | `@capacitor/privacy-screen` | 8.x | Blur / hide app preview in the app switcher (FLAG_SECURE on Android; overlay on iOS) | `capacitorjs.com/docs/apis/privacy-screen` | MIT | Active |
| 29 | `@capacitor/push-notifications` | 8.1.2 | FCM (Android) + APNs (iOS) registration, token, on-message + on-action listeners | `capacitorjs.com/docs/apis/push-notifications` | MIT | Active |
| 30 | `@capacitor/screen-orientation` | 8.0.1 | Lock / unlock screen orientation; 8 named orientations | `capacitorjs.com/docs/apis/screen-orientation` | MIT | Active |
| 31 | `@capacitor/screen-reader` | 8.x | Detect VoiceOver / TalkBack state and announce text (accessibility) | `capacitorjs.com/docs/apis/screen-reader` | MIT | Active |
| 32 | `@capacitor/share` | 8.0.1 | Native share sheet (`UIActivityViewController` iOS / `Intent.ACTION_SEND` Android) | `capacitorjs.com/docs/apis/share` | MIT | Active |
| 33 | `@capacitor/splash-screen` | 8.0.2 | Show / hide launch splash, launch show duration, fade out, dark variant | `capacitorjs.com/docs/apis/splash-screen` | MIT | Active |
| 34 | `@capacitor/status-bar` | 8.0.3 | Set status bar style (`DARK` / `LIGHT` / `DEFAULT`), background color, overlay | `capacitorjs.com/docs/apis/status-bar` | MIT | Active |
| 35 | `@capacitor/system-bars` | 8.x (new in v8) | Edge-to-edge safe-area + system bar insets; replaces the `android.adjustMarginsForEdgeToEdge` config flag removed in v8 | `capacitorjs.com/docs/apis/system-bars` | MIT | Active (v8+) |
| 36 | `@capacitor/text-zoom` | 8.0.1 | Set the system text size multiplier for accessibility | `capacitorjs.com/docs/apis/text-zoom` | MIT | Active |
| 37 | `@capacitor/toast` | 8.0.1 | Show native toast / snackbar messages | `capacitorjs.com/docs/apis/toast` | MIT | Active |
| 38 | `@capacitor/storage` | 1.2.5 | Legacy KV store (deprecated; use `@capacitor/preferences` on v8) | `capacitorjs.com/docs/apis/storage` (with deprecation footer) | MIT | **Deprecated** -- do not use on new v8 code |
| 39 | `@capacitor/vibration` | n/a (alias) | Legacy alias; no longer ships standalone on v8 -- use `@capacitor/haptics` | n/a | MIT | **Legacy** -- routed via `@capacitor/haptics` |

Inventory verified 2026-08-18 [A-S14][A-S15]. Versions in the `Version` column are the npm `latest` tag at access time and are accurate to the patch level. The two `@capacitor/*` packages that require a separate enterprise licence are not in the public inventory and are out of scope for this dossier [A-S14].

## Community plugins -- the curated Awesome list

The canonical community index is `riderx/awesome-capacitor` on GitHub (maintained by Capgo, 635 stars at access time, last update 2026-07-29) [C-S23]. The community also publishes under the `capacitor-community/` GitHub organization, which hosts community-vetted plugins that have gone through the `capacitor-community/proposals/` review [C-S22]. A third credible umbrella is `@capawesome-team/` (community but with paid options on the umbrella).

When NOT to install a community plugin:

| Anti-pattern | Symptom | Why it breaks |
|---|---|---|
| Abandoned | Last npm publish > 12 months ago | No security patch path; App Store submission may flag known CVEs |
| License mismatch | `LICENSE` is AGPL, BSL, or commercial | AGPL forces source disclosure; BSL blocks competitive use; commercial requires a paid licence |
| Permission overreach | `AndroidManifest.xml` declares `READ_CONTACTS` for a "flashlight" plugin | App Store / Play Store rejects; looks like data exfiltration; users uninstall |
| Fork of an official | A community plugin with the exact same API surface as an `@capacitor/*` plugin | Maintenance is single-person; the official one will outlive the community one |

Mitigation: run `npm view <name> time` (last publish within 6 months), check the repo `LICENSE` (MIT / Apache-2.0 / ISC preferred), grep the Android manifest for permissions beyond what the plugin name implies, and check the last commit date on the repo. Fail any of these gates and surface the reason rather than installing [C-S22][C-S23].

## Cordova compat shim

Capacitor v8 ships a `Cordova.framework` (iOS) and an equivalent Android shim inside `@capacitor/core` so most `cordova-plugin-*` packages keep working with no code changes. The shim proxies the `cordova.exec` call surface to the Capacitor plugin bridge; the legacy plugin's `plugin.xml` is parsed at `cap sync` time and the JS side's `cordova-plugin-*` require resolves through the shim. Capacitor 9 will remove the Cordova framework entirely (per the 9.0.0-alpha.6 changelog, fixed in #8524) -- any project that depends on Cordova plugins today must plan a migration to the equivalent `@capacitor/*` plugin before upgrading to v9 [A-S1][A-S19][A-S26].

## Cross-file pointers

- `06-native-like-delivery-checklist.md` -- the Status Bar, Splash Screen, Haptics, Keyboard, and Screen Orientation plugins are invoked in the six-axis priority list and the long-tail native-feel rows.
- `07-best-companion-libraries.md` -- the companion UI / state / router / storage / HTTP libraries consume the plugin output (e.g. `@capacitor/preferences` for refresh-token persistence, `@capacitor/haptics` for tap feedback in a TanStack Virtual list, `@capacitor/browser` for OAuth via web).

## Freshness

<!-- freshness: capacitor=8.5.0 access=2026-08-18 -->

- last_verified: 2026-08-18
- source_schema_versions: @capacitor/core@8.5.0, @capacitor/cli@~8.0.0, @capacitor/app@^8.0.0, generator `ionic-team/create-capacitor-plugin` at HEAD
- anchor_inventory_url: https://capacitorjs.com/docs/apis
- anchor_plugin_guide_url: https://capacitorjs.com/docs/v8/plugins/creating-plugins
- anchor_v9_watch_only: https://github.com/ionic-team/capacitor/issues/8560

## References

- [A-S1] -- https://registry.npmjs.org/@capacitor/core -- accessed 2026-08-18 (npm dist-tags: 8.5.0 latest, 9.0.0-alpha.6 next; 7.6.8 latest-7; 6.2.1 latest-6)
- [A-S2] -- https://api.github.com/repos/ionic-team/capacitor/releases -- accessed 2026-08-18 (8.5.0 tag published 2026-07-31; 9.0.0-alpha.6 published 2026-07-14)
- [A-S6] -- https://capacitorjs.com/docs/ios -- accessed 2026-08-18 (iOS 15+; Xcode 26.0+; WKWebView; AppDelegate + SceneDelegate since v8.5)
- [A-S9] -- https://capacitorjs.com/docs/updating/8-5 -- accessed 2026-08-18 (UIScene lifecycle adoption: SceneDelegate.swift, UIApplicationSceneManifest, SceneDelegateProxy; legacy AppDelegate stops firing once scene manifest is in place)
- [A-S14] -- https://capacitorjs.com/docs/apis/app -- accessed 2026-08-18 (39-plugin official inventory: Status Bar, Splash Screen, Preferences, Haptics, Browser, App, App Launcher, Camera, Clipboard, Cookies, Device, Dialog, Filesystem, Geolocation, Keyboard, Local LLM (experimental), Local Notifications, Motion, Network, Privacy Screen, Push Notifications, Screen Orientation, Screen Reader, Share, System Bars (new in v8), Text Zoom, Toast, Action Sheet, App Launcher, Background Runner, Barcode Scanner, Calendar, Contacts, File Transfer, File Viewer, Google Maps, Http, In-App Browser; deprecated Storage)
- [A-S15] -- https://registry.npmjs.org/@capacitor/{app,browser,camera,filesystem,geolocation,haptics,keyboard,local-notifications,motion,network,preferences,screen-orientation,share,status-bar,storage,text-zoom,toast,action-sheet,dialog,push-notifications,splash-screen,device,app-launcher,clipboard,cookies} -- accessed 2026-08-18 (npm plugin versions on the 8.x line: app 8.1.1, browser 8.0.4, camera 8.2.2, filesystem 8.1.2, geolocation 8.2.2, haptics 8.0.2, keyboard 8.0.5, local-notifications 8.3.0, motion 8.0.1, network 8.0.1, preferences 8.0.1, screen-orientation 8.0.1, share 8.0.1, status-bar 8.0.3, storage 1.2.5 (legacy), text-zoom 8.0.1, toast 8.0.1, action-sheet 8.1.1, dialog 8.0.1, push-notifications 8.1.2, splash-screen 8.0.2, device 8.0.3, app-launcher 8.0.1)
- [A-S16] -- https://capacitorjs.com/docs/apis/app -- accessed 2026-08-18 (`@capacitor/app` API page: lifecycle events `appStateChange`, `pause`, `resume`, `appUrlOpen`, `appRestoredResult`, `backButton`; CFBundleURLTypes + AndroidManifest intent-filter; `getAppLanguage()` since 8.1.0; `disableBackButtonHandler` config since 7.1.0)
- [A-S18] -- https://capacitorjs.com/docs/v8/plugins/creating-plugins -- accessed 2026-08-18 (Plugin generator: `npm init @capacitor/plugin@latest`; generator repo `ionic-team/create-capacitor-plugin`; JS bridge contract; `registerPlugin<T>`; `web()` static fallback; `getPlatform()` + `isNativePlatform()`)
- [A-S19] -- https://capacitorjs.com/docs/cordova -- accessed 2026-08-18 (Cordova compatibility shim; `cordova-plugin-*` install detection; migration strategy; `npx cap migrate cordova`)
- [A-S20] -- https://github.com/ionic-team/capacitor/issues/8560 -- accessed 2026-08-18 (v9.0.0-alpha.6 broken iOS framework: nested `Capacitor.framework` inside `Cordova.xcframework`; CFBundleIdentifier Collision on App Store Connect; pin `@capacitor/core@~8.5.0` for production work)
- [A-S26] -- https://capacitorjs.com/docs/cordova -- accessed 2026-08-18 (Capacitor supports Cordova plugins via the included Cordova compatibility framework; `/docs/cordova` and `/docs/cordova/migration-strategy` cover audit and migration)
- [A-S30] -- https://capacitorjs.com/docs/android/configuration -- accessed 2026-08-18 (AndroidManifest.xml edits; permissions; deeplinks; URL scheme via `custom_url_scheme` in `strings.xml`)
- [A-S31] -- https://capacitorjs.com/docs/ios/configuration -- accessed 2026-08-18 (Info.plist edits; capabilities via Signing & Capabilities; deeplinks via Universal Links; iPadOS 26 `UIDesignRequiresCompatibility` plist entry; Privacy Manifest `ios/PrivacyInfo.xcprivacy`)
- [B-S9] -- https://github.com/ionic-team/capacitor/blob/main/cli/src/declarations.ts -- accessed 2026-08-18 (canonical Capacitor configuration schema; plugin registration coordinates live in the per-plugin `capacitorDependencies` object)
- [C-S22] -- https://capacitorjs.com/docs/v8/basics/using-plugins -- accessed 2026-08-18 (Capacitor Community org pointer; `capacitor-community/proposals/` for new plugin proposals)
- [C-S23] -- https://github.com/riderx/awesome-capacitor -- accessed 2026-08-18 (curated community plugin index; 635 stars; last update 2026-07-29; maintained by Capgo)
- [C-S34] -- https://www.npmjs.com/package/@capacitor/app -- accessed 2026-08-18 (App API: exitApp, getInfo, getState, getLaunchUrl, minimizeApp, getAppLanguage (8.1.0), toggleBackButtonHandler (7.1.0); addListener/removeAllListeners lifecycle)