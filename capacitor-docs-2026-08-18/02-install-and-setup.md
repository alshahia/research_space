# Install and Setup

**Capacitor v8.5.0 anchor (verified 2026-08-18). v9.0.0-alpha.6 ships a broken iOS framework (#8560) -- do NOT use the `next` channel yet.** Capacitor 8.5.0 is the current stable. The 8.5.0 release (2026-07-31) added the iOS UIScene lifecycle, the CLI TypeScript 7 support, and a few v7 to v8 leftovers (density `configChanges`, `adjustMarginsForEdgeToEdge` removal). Capacitor 9.0.0-alpha.6 (published 2026-07-14) embeds a nested `Capacitor.framework` inside `Cordova.xcframework`, producing a `CFBundleIdentifier Collision` on App Store Connect upload. Any consumer install that pins `@capacitor/core@next` today hits a build they cannot ship. Pin to `~8.5.0` for any production work; revisit v9 when the fix lands.

This chapter walks the install flow end-to-end: Node / Xcode / Android Studio prerequisites, the `npm install` + `npx cap init` flow for a new app and for an existing project, the CLI command reference, the project structure, the iOS and Android shell floors, live reload, the update / upgrade path, the v7 to v8 migration table, and the most common setup pitfalls.

## Node and npm floor

Capacitor v8 requires **Node.js >= 22.0.0** (the engine pinned in `@capacitor/cli`'s `package.json`) and **npm >= 10.0.0**. Lower Node versions install silently but fail at runtime when the CLI hits V8 features that landed after Node 18. Lower npm versions fail at peer-dependency resolution for `@capacitor/*` packages that declare `peerDependencies: { "@capacitor/core": "^8.0.0" }`.

Verify before installing:

```bash
node --version    # expected: v22.x.x or newer (v22.0.0+)
npm --version     # expected: 10.x.x or newer (10.0.0+)
```

If either is too low, install via `nvm install 22` (macOS / Linux) or download the LTS from `nodejs.org` (Windows). The `@capacitor/cli` binary spawns via `npx`, which ships with npm 5.2+; no separate install is needed.

## Xcode and Android Studio floor

| Platform | Minimum | Recommended |
|----------|---------|-------------|
| iOS deployment target | iOS 15.0 | iOS 17.0 |
| Xcode | 26.0.0 | latest stable |
| Xcode project format | UIScene (v8.5+) | UIScene |
| Android `minSdkVersion` | 24 (Android 7.0) | 24 |
| Android `compileSdkVersion` | 36 (Capacitor 8) | 36 |
| Android `targetSdkVersion` | 36 (Capacitor 8; no custom target SDKs allowed) | 36 |
| Android Studio | 2025.2.1 (Otter) | 2025.2.1 or newer |
| Android Gradle Plugin | 8.13.0 | 8.13.0 |
| Gradle wrapper | 8.14.3 | 8.14.3 |
| Kotlin | 2.2.20 | 2.2.20 |
| JDK | 17 | 17 |

iOS deployment target is **non-negotiable** below iOS 15.0 -- Capacitor 8.5 templates assume `IPHONEOS_DEPLOYMENT_TARGET = 15.0`. Android `targetSdkVersion` is also non-negotiable: Capacitor explicitly states that *each version of Capacitor Android requires a specific target SDK version* and does not support custom target SDKs. Capacitor 8 pins `targetSdk 36`; using `targetSdk 34` will compile but will fail App Store validation and Play Store pre-launch checks.

Verify Android Studio before installing:

```bash
# macOS
/Applications/Android\ Studio.app/Contents/MacOS/studio --version
# Windows
"C:\Program Files\Android\Android Studio\bin\studio.exe" --version
# Linux
~/.local/share/Google/AndroidStudio*/bin/studio --version
```

The CLI auto-detects Android Studio and CocoaPods paths but honors `CAPACITOR_ANDROID_STUDIO_PATH` and `CAPACITOR_COCOAPODS_PATH` environment variables for non-standard installs.

## Quick install -- brand-new app

The canonical flow (verified against the official docs at v8.5.0):

```bash
# Step 1 -- core runtime + CLI
npm i @capacitor/core
npm i -D @capacitor/cli

# Step 2 -- native platform packages
npm i @capacitor/android @capacitor/ios

# Step 3 -- initialize the CapacitorConfig file
npx cap init "My App" com.example.myapp --web-dir=www

# Step 4 -- create the native projects (one per platform)
npx cap add ios
npx cap add android

# Step 5 -- build the web bundle, then sync to native
npm run build
npx cap sync
```

`npx cap init` accepts a non-interactive form with three positional args: app name, app ID (reverse-DNS, immutable after first App Store / Play Store submission), and `--web-dir`. The interactive questionnaire is still available by running `npx cap init` with no args. `npx cap add` accepts only `ios` and `android` as platform args in v8 -- `cap add web` is not supported; the PWA / Web target is the no-platform Capacitor mode.

After `npx cap sync`, the `ios/` and `android/` directories contain real Xcode and Gradle projects. Open `ios/App.xcworkspace` in Xcode (not `.xcodeproj`; the workspace includes the SPM dependencies). Open `android/` in Android Studio. Both projects build to a real binary that runs on a simulator or a device.

## Quick install -- adding to an existing JS / TS project

For an existing Vite, Next.js, Vue, Angular, SvelteKit, plain Webpack, or plain HTML project, the per-bundler `webDir` mapping and bundler config snippets live in `04-conversion-guide.md`. The summary for all of them is the same six commands:

```bash
# Inside the existing project
npm i @capacitor/core
npm i -D @capacitor/cli
npm i @capacitor/android @capacitor/ios

# Init the Capacitor config (point --web-dir at the bundler's build output)
npx cap init "My App" com.example.myapp --web-dir=dist

# Build the web bundle once so `cap add` has something to copy
npm run build

# Create the native projects
npx cap add ios
npx cap add android

# Sync the build output and the plugin manifests
npx cap sync
```

The `--web-dir` value differs per bundler. Vite emits to `dist`; Next.js (static export) emits to `out`; Angular emits to `dist/<project-name>`; Vue + Vite emits to `dist`; SvelteKit (static adapter) emits to `build`; plain Webpack emits to whatever `output.path` says (commonly `dist` or `build`). The seven per-bundler recipes in `04-conversion-guide.md` walk each one in full.

## CLI commands reference

The CLI ships with the commands below; each command has a dedicated doc anchor. The list is verified against v8.5.0.

| Command | Purpose | Common syntax |
|---------|---------|---------------|
| `cap init` | Create `capacitor.config.ts` from prompts or args | `npx cap init [name] [id] [--web-dir]` |
| `cap add` | Add a native platform (only `ios` / `android` in v8) | `npx cap add ios` / `npx cap add android` |
| `cap sync` | Copy `webDir` + update plugin manifests + reinstall native deps | `npx cap sync` |
| `cap copy` | Copy `webDir` into native projects only (no plugin / native install) | `npx cap copy` |
| `cap update` | Update plugin versions + native dep manifests (no copy) | `npx cap update` |
| `cap build` | Run the bundler's build script (reads `package.json` scripts) | `npx cap build` |
| `cap run` | Build native + launch on a target device | `npx cap run ios --target=<id>` |
| `cap open` | Open the native project in Xcode or Android Studio | `npx cap open ios` / `npx cap open android` |
| `cap ls` | List installed platforms and their versions | `npx cap ls` |
| `cap doctor` | Validate the dev environment (Node, Xcode, Android Studio, JDK, CocoaPods, SPM) | `npx cap doctor` |
| `cap migrate` | Migrate from Cordova (`cordova-plugin-*` to `@capacitor/*`) | `npx cap migrate cordova` |
| `cap config` | Read / write config values without opening the file | `npx cap config set appId com.example.myapp` |
| `cap plugin:generate` | Scaffold a new plugin (alternative to `npm init @capacitor/plugin@latest`) | `npx cap plugin:generate` |

`cap sync` is the composite of three things: (1) `cap copy` (copies `webDir` into the native project's bundle dir), (2) updates the plugin manifests in the native project, (3) runs `pod install` on iOS and re-syncs Gradle dependencies on Android. Use `cap sync` after any plugin add / update; use `cap copy` after a pure web rebuild during development.

`cap run --live-reload --port 8100` temporarily injects `server.url` + `server.cleartext` into the config and restores the original on termination. `--target <id>` picks a specific device or simulator; `--list` lists targets without launching.

`cap doctor` is the first thing to run when "nothing works". It checks Node, Xcode, Android Studio, JDK, CocoaPods (if used), SPM, and the project's Capacitor versions against the latest published.

## Project structure

After `npx cap add ios android`, the project layout is:

```
my-app/
  ios/                          # generated by `cap add ios`
    App/                        # App target (AppDelegate, SceneDelegate since v8.5)
      AppDelegate.swift
      SceneDelegate.swift
      Info.plist
    App.xcworkspace             # open this in Xcode
    Podfile                     # present if --packagemanager CocoaPods (legacy)
  android/                      # generated by `cap add android`
    app/
      src/main/
        AndroidManifest.xml
        assets/                 # `webDir` content is copied here on `cap sync`
        java/.../MainActivity.java
      build.gradle
    variables.gradle            # SDK / Kotlin / AndroidX lockfile
    build.gradle
    settings.gradle
  www/                          # (or whatever `webDir` you set) -- the built web bundle
  capacitor.config.ts           # CapacitorConfig (TS) -- preferred for TS projects
  capacitor.config.json         # alternative for non-TS projects
  package.json
  package-lock.json
```

The `ios/App.xcworkspace` is the entry point for Xcode; opening `App.xcodeproj` directly bypasses the SPM dependency resolution and fails. The `android/` directory is the Gradle root; Android Studio imports it as-is. The `www/` directory (or `dist/`, `out/`, `build/`, whatever `webDir` is set to) is the Capacitor-side build output -- it is regenerated by `npm run build` and copied into the native projects by `cap sync`.

The `www/` directory is not automatically excluded from git. The recommendation is: commit `www/` for apps that do not rebuild on CI (the build artifact is part of the shipped binary); do not commit `www/` for apps that rebuild on CI (the artifact is regenerated by `npm run build` and `cap sync`).

## webDir, bundledWebRuntime, appId, appName

These four values are the core of `capacitor.config.ts`. They wire together as:

- **`appId`** -- reverse-DNS string, immutable after first App Store / Play Store submission. iOS uses it for the bundle ID; Android uses it for the application ID. Format: `com.company.appname` or `io.company.appname`.
- **`appName`** -- human-readable name displayed on the device home screen and in Settings. iOS reads it from `Info.plist` (`CFBundleDisplayName`); Android reads it from `strings.xml` (`app_name`). Renaming requires editing the native project files; the value in `capacitor.config.ts` is the source of truth that `cap sync` writes into the native project.
- **`webDir`** -- the directory (relative to the project root) that contains the built web bundle. `cap sync` copies this directory into the native project's bundle location. Default is `www` for a brand-new project; Vite users typically change this to `dist`; Next.js static-export users to `out`.
- **`bundledWebRuntime`** -- when `true`, the Capacitor runtime is bundled into the web bundle (so the WebView can boot offline with no extra asset fetch). When `false` (default), the Capacitor runtime is loaded as a separate script. Set `true` if you need offline boot or if you ship the app as a standalone PWA; leave `false` for most apps.

Example `capacitor.config.ts`:

```ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.myapp',
  appName: 'My Capacitor App',
  webDir: 'www',
};

export default config;
```

For an existing Vite project, the only difference is `webDir`:

```ts
const config: CapacitorConfig = {
  appId: 'com.example.myapp',
  appName: 'My Capacitor App',
  webDir: 'dist',   // Vite's default output
};
```

## iOS shell

The iOS shell is a Swift project generated by `npx cap add ios`. The root view controller is `CAPBridgeViewController` (a `UIViewController` subclass that hosts the WKWebView). iOS 8.5 added `SceneDelegateProxy.swift` alongside the existing `ApplicationDelegateProxy.swift`; UIScene lifecycle events (`sceneWillConnect`, `sceneDidBecomeActive`, `sceneWillResignActive`, `sceneDidEnterBackground`, `sceneWillEnterForeground`) route through the SceneDelegate, and legacy AppDelegate events stop firing once the scene manifest is in place.

The deployment target floor is iOS 15.0 (enforced by the template). The build system default flipped from CocoaPods to **SPM (Swift Package Manager)** in v8.0. Existing v7 apps that re-run `cap add ios` after deleting `ios/` get SPM and lose their Podfile lockfile; pass `--packagemanager CocoaPods` to opt back into CocoaPods if needed. `pod install` runs under the hood on the first `cap sync` for CocoaPods projects.

The Xcode workspace `ios/App.xcworkspace` is the entry point. The Info.plist carries `CFBundleURLTypes` for custom URL schemes, `UISupportedInterfaceOrientations` for orientation locks, and `PrivacyInfo.xcprivacy` (the privacy manifest required for App Store submission as of v8). Background modes (`UIBackgroundModes` for audio, location, fetch, remote-notification) are configured in Signing & Capabilities, not the plist.

## Android shell

The Android shell is a Gradle project generated by `npx cap add android`. The root activity is `BridgeActivity` (extends `AppCompatActivity`); `com.getcapacitor.BridgeFragment` is the WebView host. The AndroidX baselines are pinned in `variables.gradle`: Activity `1.11.0`, AppCompat `1.7.1`, Core `1.17.0`, Fragment `1.8.9`, Splash `1.2.0`, Webkit `1.14.0`. AGP `8.13.0`, Gradle wrapper `8.14.3`, Kotlin `2.2.20`, `google-services 4.4.4`.

`minSdkVersion` floor is **24** (Android 7.0); `compileSdkVersion` and `targetSdkVersion` are **36** (Android 16). Capacitor explicitly disallows custom target SDK values -- using `targetSdk 34` will compile but will fail Play Store pre-launch checks. The `android:configChanges` attribute in `AndroidManifest.xml` must include `orientation|keyboardHidden|keyboard|screenSize|locale|smallestScreenSize|screenLayout|uiMode|navigation|density` (the `density` entry is new in v8.0; missing it produces a destroyed-WebView warning on font-scale change, see issue #8562).

The AndroidManifest `<intent-filter>` inside `<activity>` carries the custom URL scheme via `<data android:scheme="@string/custom_url_scheme" />` (the default value is the package name). `strings.xml` carries the `app_name` (synced from `capacitor.config.ts` `appName`) and `custom_url_scheme` (synced from `capacitor.config.ts` `server.androidScheme`).

## Live reload

Live reload uses the `server` block in `capacitor.config.ts`. Add the block during development; remove (or set `cleartext: false`) before shipping.

```ts
const config: CapacitorConfig = {
  appId: 'com.example.myapp',
  appName: 'My App',
  webDir: 'www',
  server: {
    url: 'http://192.168.1.42:5173',   // LAN address of the dev server
    cleartext: true,                    // required for http:// in WKWebView / Android WebView
  },
};
```

`cleartext: true` is required because both iOS (since App Transport Security) and Android (since Android 9, API 28) block cleartext HTTP in WebViews by default. The dev server must bind to `0.0.0.0`, not `127.0.0.1`, so the device can reach it on the LAN.

The Ionic CLI equivalent is `ionic cap run android|ios -l --external`, which writes the `server` block automatically and removes it on command exit. The Capacitor CLI equivalent is `npx cap run <platform> --live-reload --port 8100`.

Vite HMR (Hot Module Replacement) is a different mechanism: HMR swaps modules in the running WebView without a full page reload, but it requires the dev server URL to be reachable from the WebView. The Capacitor `server.url` block points at the dev server, so HMR works "for free" once `server` is set. Most apps combine both: Vite HMR for the dev-loop fast path, `cap sync` for the production build.

To remove the live-reload config before a production build, delete the `server` block (or set `url` to undefined) and re-run `cap sync`. A common footgun is committing `capacitor.config.ts` with `cleartext: true` to a public repo -- App Store review will reject the build for the cleartext flag in `Info.plist`'s `NSAppTransportSecurity`.

## Update and upgrade paths

To upgrade Capacitor inside an existing project:

```bash
# Upgrade to the latest 8.x
npm install @capacitor/core@~8 @capacitor/cli@~8 @capacitor/android@~8 @capacitor/ios@~8

# Re-sync the native projects
npx cap sync
```

`cap sync` after an upgrade re-resolves SPM dependencies on iOS and re-syncs Gradle dependencies on Android. If a plugin has a native change (a new permission, a new manifest entry), the upgrade requires `cap sync` (not `cap copy`); `cap copy` is web-bundle-only.

For production builds, `npx cap sync --deployment` writes the deployment-mode flag to the native project, which disables the dev menu in the WebView and locks down the debug surface. The flag is read by `@capacitor/core`'s `isDevMode()` helper.

## v7 to v8 migration table

The table below summarizes the v7-to-v8 changes most likely to bite a v7 app being upgraded. The full migration guide lives at `https://capacitorjs.com/docs/updating/8-0` and `https://capacitorjs.com/docs/updating/8-5`.

| Change | v7 behavior | v8 behavior | Action |
|--------|-------------|-------------|--------|
| iOS deployment target | 13.0+ | 15.0+ | Bump in Xcode build settings |
| Android `minSdkVersion` | 22 | 24 | Update `variables.gradle` |
| Android `targetSdkVersion` | 35 | 36 (locked) | Update `variables.gradle` |
| Android `configChanges` | `orientation\|...` (no density) | Add `density` | Update `AndroidManifest.xml` |
| iOS dependency manager | CocoaPods (default) | SPM (default) | Pass `--packagemanager CocoaPods` if you need CocoaPods |
| iOS app lifecycle | AppDelegate | AppDelegate + UIScene (8.5+) | Add `SceneDelegate.swift` + `UIApplicationSceneManifest` |
| Android edge-to-edge insets | `android.adjustMarginsForEdgeToEdge: true` config flag | Config flag removed; use `@capacitor/system-bars` plugin | Install the plugin, remove the config flag |
| iOS `appendUserAgent` whitespace | iOS bug: extra whitespace dropped the user-agent override | Fixed; whitespace preserved | Move any workaround to `ios.appendUserAgent` |
| `@capacitor/swift-pm` SHA256 pin | SPM resolution by version | SPM resolution by exact SHA256 | Re-run `npx cap sync` to refresh |
| Node engine | `>=18.0.0` | `>=22.0.0` | Upgrade Node |
| Cordova framework | Bundled by default | Bundled by default; removed in v9 | None for v8; plan migration for v9 |

The `@capacitor/system-bars` plugin replaces the `adjustMarginsForEdgeToEdge` config flag. Apps that relied on the flag to handle Android edge-to-edge cutouts silently lose the safe margin after `npx cap migrate`; install the plugin and set the safe-area CSS variables (`env(safe-area-inset-*)`).

## Known setup pitfalls

Six pitfalls cover most "nothing works" reports.

1. **Node version too old** (Node 18 or 20 against `@capacitor/cli@8`). Cause: `@capacitor/cli@8` requires Node >=22; lower versions install but throw `SyntaxError` or `Cannot find module` at runtime. Fix: `nvm install 22 && nvm use 22 && rm -rf node_modules && npm install`.

2. **CocoaPods not installed on macOS** (when an existing v7 project opts back into CocoaPods via `--packagemanager CocoaPods`). Cause: SPM is the v8 default; CocoaPods only matters if you pass the flag. Fix: `sudo gem install cocoapods` (or `brew install cocoapods`); verify with `pod --version`.

3. **JDK 11 instead of JDK 17** (Android Studio ships with JDK 17 in 2025.2.1+; older installs point at JDK 11). Cause: AGP 8.13 requires JDK 17; JDK 11 throws `Unsupported class file major version 61` at Gradle sync. Fix: in Android Studio, Settings -> Build, Execution, Deployment -> Build Tools -> Gradle -> Gradle JDK -> 17.

4. **`CAPACITOR_ANDROID_STUDIO_PATH` pointing at a missing binary** (CI / Docker / WSL). Cause: auto-detection fails when Android Studio is in a non-standard location. Fix: set the env var to the absolute path of `studio` / `studio.exe`, or unset the env var to fall back to auto-detect.

5. **`cap add ios` fails with `Cordova.xcframework` CFBundleIdentifier Collision** on **v9.0.0-alpha.6 only**. Cause: `ionic-team/capacitor-swift-pm` PR #37 creates Cordova's own `xcodebuild archive` invocation that nests `Capacitor.framework` inside `Cordova.xcframework`. Fix: pin to `@capacitor/core@~8.5.0` (the latest stable); do not pin `@capacitor/core@next` until #8560 is merged.

6. **CLI 6.x or 7.x fails with `Cannot read properties of undefined (reading 'extract')`** on **`npx cap add android`** when a security advisory forces `npm overrides tar@^7.5.19`. Cause: the CLI's `extractTemplate()` calls `tar.extract` whose shape changed between tar v6 and tar v7. Fix: upgrade to `@capacitor/cli@^8` (which uses a tar API that survives v7); or pin `tar` to `^6` via `npm overrides` until you can upgrade.

The full HIGH-risk register (including the issue numbers and the open-PR status) lives in `10-known-issues-and-solutions.md`.

<!-- freshness: capacitor=8.5.0 access=2026-08-18 -->

## Freshness

- last_verified: 2026-08-18
- source_schema_versions: @capacitor/core@8.5.0, @capacitor/cli@~8.0.0, @capacitor/app@^8.0.0
- anchor_intro_url: https://capacitorjs.com/docs/getting-started
- anchor_v8_upgrade_url: https://capacitorjs.com/docs/updating/8-0
- anchor_v85_upgrade_url: https://capacitorjs.com/docs/updating/8-5
- v9_watch_only_issue: https://github.com/ionic-team/capacitor/issues/8560
- tar_v7_cli_issue: https://github.com/ionic-team/capacitor/issues/8573

## References

- [A-S1] -- https://registry.npmjs.org/@capacitor/core -- accessed 2026-08-18 (npm dist-tags: 8.5.0 latest, 9.0.0-alpha.6 next, 7.6.8 latest-7, 6.2.1 latest-6)
- [A-S3] -- https://capacitorjs.com/docs/main/reference/support-policy -- accessed 2026-08-18 (v8 Active, v7 Extended Support until 2026-12-08, v6 End of Support; minimum Node 22 / Xcode 26.0 / Android Studio 2025.2.1 / iOS 15.0 / Android 7.0 API 24)
- [A-S4] -- https://www.npmjs.com/package/@capacitor/cli -- accessed 2026-08-18 (license MIT, engines node>=22.0.0)
- [A-S6] -- https://capacitorjs.com/docs/ios -- accessed 2026-08-18 (iOS 15+, Xcode 26.0+, WKWebView, `npx cap add ios`, `npx cap open ios`)
- [A-S8] -- https://capacitorjs.com/docs/updating/8-0 -- accessed 2026-08-18 (v7 to v8: NodeJS 22+, Xcode 26.0+, iOS deployment target 15.0, variables.gradle with minSdk 24 / compileSdk 36 / targetSdk 36, AGP 8.13.0, Gradle 8.14.3, Kotlin 2.2.20, density added to configChanges, adjustMarginsForEdgeToEdge removed)
- [A-S9] -- https://capacitorjs.com/docs/updating/8-5 -- accessed 2026-08-18 (UIScene lifecycle adoption; SceneDelegate.swift, UIApplicationSceneManifest, SceneDelegateProxy; TmpViewController/tmpWindow removed)
- [A-S10] -- https://capacitorjs.com/docs/v8/cli -- accessed 2026-08-18 (CLI command list: add, build, copy, doctor, init, ls, migrate, open, run, sync, update)
- [A-S11] -- https://capacitorjs.com/docs/web -- accessed 2026-08-18 (Capacitor Web/PWA: builds ES2017; script-include option removed; PWA is the no-platform Capacitor mode)
- [A-S12] -- https://capacitorjs.com/docs/v8/cli/commands/sync -- accessed 2026-08-18 (cap sync: copies webDir, installs native deps, updates plugin registrations)
- [A-S13] -- https://capacitorjs.com/docs/v8/cli/commands/copy -- accessed 2026-08-18 (cap copy: copies webDir only, no native-side work)
- [A-S15] -- https://registry.npmjs.org/{package-name} -- accessed 2026-08-18 (npm plugin versions on the 8.x line)
- [A-S16] -- https://capacitorjs.com/docs/apis/app -- accessed 2026-08-18 (App plugin: lifecycle events appStateChange / pause / resume / appUrlOpen / appRestoredResult / backButton; CFBundleURLTypes + AndroidManifest intent-filter for custom URL schemes)
- [A-S17] -- https://capacitorjs.com/docs/guides/live-reload -- accessed 2026-08-18 (Live reload: server.url + server.cleartext, Ionic CLI integration, --live-reload --port flag)
- [A-S18] -- https://capacitorjs.com/docs/v8/plugins/creating-plugins -- accessed 2026-08-18 (Plugin generator `npm init @capacitor/plugin@latest`; JS bridge contract; registerPlugin<T>; Swift/Java plugin model)
- [A-S20] -- https://github.com/ionic-team/capacitor/issues/8560 -- accessed 2026-08-18 (9.0.0-alpha.6 Cordova.xcframework ships a nested Capacitor.framework; CFBundleIdentifier Collision on App Store Connect upload)
- [A-S21] -- https://github.com/ionic-team/capacitor/issues/8573 -- accessed 2026-08-18 (CLI 6.x/7.x incompatible with tar 7.5.3+; extractTemplate() calls tar.extract whose shape changed in tar v7)
- [A-S22] -- https://github.com/ionic-team/capacitor/issues/8562 -- accessed 2026-08-18 (Android eval() runs on destroyed WebView after activity recreate when configChanges doesn't include the changed config; add fontScale + density to configChanges)
- [A-S27] -- https://capacitorjs.com/docs/getting-started -- accessed 2026-08-18 (verbatim install flow: npm i @capacitor/core, npx cap init, npx cap add ios/android, npx cap sync)
- [A-S28] -- https://capacitorjs.com/docs/v8/config -- accessed 2026-08-18 (CapacitorConfig TypeScript interface; per-platform ios / android blocks; server block; env vars CAPACITOR_ANDROID_STUDIO_PATH / CAPACITOR_COCOAPODS_PATH)
- [A-S29] -- https://capacitorjs.com/docs/v8/cli/commands/run -- accessed 2026-08-18 (cap run flags: --list, --target, --live-reload --port; --live-reload temporarily injects server config)
- [A-S31] -- https://capacitorjs.com/docs/ios/configuration -- accessed 2026-08-18 (Info.plist edits, deeplinks via Universal Links, iPadOS 26 UIDesignRequiresCompatibility, PrivacyInfo.xcprivacy)
- [B-S7] -- https://capacitorjs.com/docs/v8/getting-started/installation -- accessed 2026-08-18 (npx cap init auto-detects webDir per framework)
- [B-S9] -- https://github.com/ionic-team/capacitor/blob/main/cli/src/declarations.ts -- accessed 2026-08-18 (CLI TypeScript schema: CapacitorConfig.webDir, server.url, server.cleartext, server.androidScheme, server.iosScheme, server.allowNavigation; env vars CAPACITOR_ANDROID_STUDIO_PATH, CAPACITOR_COCOAPODS_PATH)
- [B-S22] -- https://capacitorjs.com/docs/guides/live-reload -- accessed 2026-08-18 (rendered Live Reload guide: npx cap run <platform> --livereload flow)