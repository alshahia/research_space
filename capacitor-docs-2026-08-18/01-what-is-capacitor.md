# What is Capacitor?

Capacitor is a cross-platform native runtime for web apps. A Capacitor app is a thin native shell -- one Swift project for iOS, one Gradle project for Android -- that hosts a WebView (WKWebView on iOS, Android System WebView on Android) and loads a static `webDir` of HTML / CSS / JS. The same `webDir` also runs as a PWA when no native platform is added. Plugins give the WebView code access to native APIs (camera, geolocation, haptics, file system, push, etc.) via a JS bridge. You ship as a real App Store and Play Store binary, not as a wrapped browser tab.

When to use Capacitor vs. something else: pick Capacitor when you have a web app (or a web-first codebase) and you need an iOS and Android binary without rewriting the UI in Swift or Kotlin. Pick something else when the UI must be 60fps native views (React Native, Flutter), when the desktop binary matters (Electron, Tauri), when the app is CPU-bound 3D / AR / VR (a custom native engine), or when there are zero web components.

## vs. Cordova

Cordova is the predecessor; Capacitor is the modernized successor. The Capacitor team maintains a Cordova-compatibility framework inside `@capacitor/core` so most `cordova-plugin-*` packages keep working via a shim layer (no code changes required for many plugins), but new plugin development targets the Capacitor plugin contract (`registerPlugin<T>` + Swift/Java class pair) and the Capacitor 9 release will remove the Cordova framework entirely. The build pipeline, the iOS deployment target, the Android min/target SDK, and the WebView defaults all moved forward under Capacitor; the user-facing web API is broadly the same. New projects should default to Capacitor; existing Cordova projects can migrate via `npx cap migrate cordova` and a manual `config.xml` to `capacitor.config.ts` preference port.

## vs. Tauri

Tauri ships a Rust-side `webview-rs` process that hosts the OS WebView (WKWebView / WebView2 / WebKitGTK). Capacitor ships a thin Swift / Java shell around the platform WebView (no Rust process, no Chromium in the bundle). Different deployment profiles: Tauri is desktop-first with mobile Tauri v2 in development; Capacitor is mobile-first with desktop web as a PWA fallback. Different size profile: a Tauri binary is typically smaller than an Electron binary (no Chromium), and a Capacitor binary is in the same ballpark as a Tauri binary on iOS and Android. Different App-Store-approval profile: Capacitor follows the standard Swift / Kotlin path; Tauri on iOS uses an embedder that some App Store reviewers flag. Different dev-velocity profile: a Capacitor app can use any web framework with no Rust toolchain; a Tauri app needs `cargo` on the host.

## vs. Electron

Electron bundles its own Chromium binary. Capacitor uses the platform WebView (no Chromium in the bundle). Different deployment story: Electron produces a desktop binary (macOS, Windows, Linux); Capacitor produces App Store / Play Store binaries plus a PWA. Different size profile: an Electron app is typically 80-150 MB on disk; a Capacitor app is 5-30 MB on disk. Different platform coverage: Electron does not ship to iOS or Android App Store; Capacitor does. The two are not direct substitutes -- if desktop is the target, use Electron (or Tauri); if mobile is the target, use Capacitor.

## vs. React Native

React Native renders JavaScript through Hermes + a bridge to native UI components (UIKit / Android views); the JS layer never touches a WebView for the user-facing UI. Capacitor renders a real web page (HTML / CSS / JS) in a WebView. Trade-off: React Native wins for very-high-FPS native UI and for animations that need to hit 60fps on a 120Hz display; Capacitor wins for design-system portability (the same HTML / CSS works in a browser, a PWA, and a Capacitor app), for teams that already have a web codebase, and for using any web framework (React, Vue, Svelte, Solid, plain HTML). The two can co-exist (a Capacitor WebView can host a React Native Web bundle via `react-native-web`); they are not mutually exclusive.

## vs. Expo / Expo Router

Expo is the React Native + tooling layer (managed build pipeline, EAS update for OTA, the Expo SDK of native modules). It is not a direct alternative to Capacitor; it is a layer on top of React Native. If your team is React-first and needs OTA updates with first-party tooling, Expo is a credible path. If your team has a non-React web app and wants to ship a mobile binary without rewriting the UI in JSX, Capacitor is the path.

## vs. Flutter

Flutter compiles Dart to native Skia rendering; the UI never touches a WebView or platform UI components. Capacitor renders HTML / CSS / JS in a WebView. Different mental model: Flutter is a reactive widget tree with its own layout / paint pipeline; Capacitor is a web page. Different team profile: Flutter needs a Dart-skilled team; Capacitor needs a web-skilled team. Different app size profile: a minimal Flutter app is typically 5-15 MB on disk; a minimal Capacitor app is in the same range (5-15 MB) but the WebView shared libraries are already on the device. Different build profile: Flutter has a fast incremental build (`flutter run --hot`) and a single-step release build; Capacitor has a one-time `cap sync` and a per-platform native build (Xcode / Android Studio).

## When to choose Capacitor

Use the following decision rule. If at least five of six bullets apply, choose Capacitor.

- The team has a working web app (or a web-first codebase) and wants iOS + Android binaries without rewriting the UI in Swift / Kotlin.
- The app's UI is mostly forms, lists, navigation, and modal sheets -- the things HTML / CSS do well.
- The design system is already CSS-based (Tailwind, vanilla CSS, CSS-in-JS) and the team does not want to port it to SwiftUI / Jetpack Compose.
- The app's native API surface is small (camera, geolocation, push, file system, haptics, status bar) -- all of which have first-party Capacitor plugins.
- The team already owns the JS / TS bundler and CI pipeline; adding Capacitor is one `npx cap init` away.
- OTA updates are not a hard requirement (Capacitor has no first-party OTA story; Capgo is the credible third-party option; see `08-build-and-ship.md`).

## When NOT to choose Capacitor

Use a different tool when any of the following is true:

- The UI must hit 60fps on a 120Hz display for animation-heavy screens (use Flutter or native Swift / Kotlin).
- The app is CPU-bound 3D, AR / VR, or system-level (kernel module, custom input device) -- Capacitor's WebView cannot deliver this.
- The app requires permissions outside the WebView's reach at native-API parity (CallKit, Call Screening, full HealthKit, push-to-talk over the lock screen) -- Capacitor exposes only what the plugins expose; anything beyond requires a custom plugin or a different framework.
- The team is not willing to own the native shell (Xcode project, Gradle project, App Store Connect, Play Console) -- Capacitor does not abstract native builds away.

<!-- freshness: capacitor=8.5.0 access=2026-08-18 -->

## Freshness

- last_verified: 2026-08-18
- source_schema_versions: @capacitor/core@8.5.0, @capacitor/cli@~8.0.0, @capacitor/app@^8.0.0
- anchor_intro_url: https://capacitorjs.com/docs/ ("Web Native" framing)
- v9_watch_only_issue: https://github.com/ionic-team/capacitor/issues/8560

## References

- [A-S1] -- https://registry.npmjs.org/@capacitor/core -- accessed 2026-08-18 (npm dist-tags: 8.5.0 latest, 9.0.0-alpha.6 next, 7.6.8 latest-7, 6.2.1 latest-6)
- [A-S3] -- https://capacitorjs.com/docs/main/reference/support-policy -- accessed 2026-08-18 (v8 Active, v7 Extended Support until 2026-12-08, v6 End of Support; minimum Node 22 / Xcode 26.0 / Android Studio 2025.2.1 / iOS 15.0 / Android 7.0 API 24)
- [A-S4] -- https://www.npmjs.com/package/@capacitor/cli -- accessed 2026-08-18 (license MIT, engines node>=22.0.0, description)
- [A-S5] -- https://api.github.com/repos/ionic-team/capacitor -- accessed 2026-08-18 (16,336 stars, 1,228 forks, MIT, TypeScript, organization ionic-team)
- [A-S8] -- https://capacitorjs.com/docs/updating/8-0 -- accessed 2026-08-18 (v7 to v8 upgrade guide: NodeJS 22+, Xcode 26.0+, iOS deployment target 15.0, AGP 8.13.0, Kotlin 2.2.20, density added to configChanges, adjustMarginsForEdgeToEdge removed in favor of System Bars plugin)
- [A-S14] -- https://capacitorjs.com/docs/apis/app -- accessed 2026-08-18 (39-plugin official inventory including System Bars, Local LLM experimental, Cookies, Clipboard, Privacy Screen, Screen Reader)
- [A-S19] -- https://capacitorjs.com/docs/cordova -- accessed 2026-08-18 (Cordova migration strategy; compat shim for cordova-plugin-* packages)
- [A-S25] -- https://capacitorjs.com/docs/ -- accessed 2026-08-18 (intro: "Capacitor is a cross-platform native runtime that makes it easy to build performant mobile applications that run natively on iOS, Android, and more using modern web tooling")
- [A-S26] -- https://capacitorjs.com/docs/cordova -- accessed 2026-08-18 (Cordova overview; Capacitor supports Cordova plugins via the included Cordova compatibility framework)