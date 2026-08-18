# Build and Ship

**Audience:** Engineer wiring up CI/CD, asset generation, debugging on devices, store upload, and version-disciplined releases for a Capacitor app.
**Anchor:** Capacitor v8.5.0 (verified 2026-08-18). v9.0.0-alpha.6 is watch-only (#8560). Pin `@capacitor/*` to `~8.5.0` for any production work.
**Cross-references:** back to `02-install-and-setup.md` (CLI command list, `capacitor.config.ts` shape, `cap add ios`/`android` flow), `05-plugin-system-and-lifecycle.md` (Cordova compat shim), `06-native-like-delivery-checklist.md` (six-axis priority list); forward to `09-do-and-dont.md` (the anti-pattern matrix keyed to build / ship), `10-known-issues-and-solutions.md` (HIGH-risk register + per-issue workarounds), `11-system-prompt-for-llms.md` (LLM-facing rules).

This chapter is the production-side of the dossier. Once an app is shipping (or about to), every row below answers a question the engineer meets on day zero of the release: how to generate icons and splash assets, when to use `cap sync` versus `cap copy`, how to debug on a real device, what the recommended CI matrix looks like, how fastlane signs and uploads the build, what store upload looks like for App Store + Play Store, how to bump versions in lockstep without missing a number, and what the JS-bundle OTA story is (there is no first-party Capacitor story; CodePush is RN-only). Every claim cites a primary source.

## Pre-build asset pipeline

Every Capacitor app ships with an icon (the launcher tile) and a splash screen (the launch frame). Both are generated from a small set of source PNGs by `@capacitor/assets` (3.0.5, MIT, `ionic-team/capacitor-assets`). The package is invoked once at first-install time, then re-run only when the design changes [C-S24].

### Single-source mode (the minimum viable)

For a 1-PNG app, drop one `1024x1024` PNG at `resources/icon-only.png` and (optionally) one `2732x2732` PNG at `resources/splash.png`, then run:

```bash
npx @capacitor/assets generate --android --ios --assetSources=resources
```

`@capacitor/assets` generates the iOS `AppIcon.appiconset/` and the Android `mipmap-*/` (and splash `drawable-*/`) from the single source. The single-source mode is sufficient for iOS and for Android < 12.

### Custom mode (Android 12+ adaptive icons)

Android 12+ devices render adaptive icons (the launcher shape -- circle, squircle, teardrop -- depends on the device OEM). Adaptive icons require a separate foreground + background PNG, not a flat square. Drop these four files at `resources/`:

```
resources/
  icon-only.png          # 1024x1024 (no transparency)  -- fallback / iOS / Android <12
  icon-foreground.png    # 1024x1024 with transparency   -- Android 12+ foreground layer
  icon-background.png    # 1024x1024 (solid color OK)    -- Android 12+ background layer
  splash.png             # 2732x2732 (default light)     -- iOS + Android splash (light)
  splash-dark.png        # 2732x2732 (dark variant)      -- Android splash when system is in dark mode
```

Then run:

```bash
npx @capacitor/assets generate --android --ios --assetSources=resources
```

The CLI writes `ios/App/AppIcon.appiconset/`, `android/app/src/main/res/mipmap-*`, `android/app/src/main/res/drawable-*/splash.png`, and the foreground/background adaptive-icon assets to `android/app/src/main/res/mipmap-anydpi-v26/ic_launcher.xml` + `drawable/ic_launcher_foreground.xml`. Commit the generated assets to source control so the next engineer does not have to re-run the CLI on a fresh clone [C-S24].

### PWA-only build

`--pwa` writes `public/` assets for a Progressive Web App (the marketing surface, no native platforms added). Most Capacitor apps that target only iOS + Android do not need this flag; the bundler's own `public/` directory covers the PWA-only case [C-S24].

### Common pitfalls

- **Flat icon on Android 12+ devices** -- the launcher shape masks the foreground but a flat icon (no transparency, no adaptive-icon asset) renders as a square inside a circle and looks wrong. Fix: switch to custom mode with `icon-foreground.png` + `icon-background.png` [C-S24].
- **Splash lingers for 3+ seconds** -- relying on `launchShowDuration` (default `3000` ms) instead of calling `SplashScreen.hide()` after first meaningful paint. Fix: call `SplashScreen.hide()` in the SPA root after first paint, set `launchShowDuration` to the minimum acceptable (~800 ms) in `capacitor.config.ts`. See `06-native-like-delivery-checklist.md` Axis 3.
- **Dark-mode splash mismatch** -- generating `splash-dark.png` only for Android 12+ but not configuring `androidSplashResourceName` per dark variant. Fix: rely on the `splash-dark.png` filename convention; `@capacitor/assets` wires the dark variant to `android:colors-night` automatically [C-S24][C-S29].

## The `cap run` / `cap sync` / `cap copy` decision tree

The three commands overlap. The decision tree below picks one for each scenario; the rule of thumb is `sync` for plugin changes, `copy` for pure web rebuilds, `run` for launching on a device [A-S12][A-S13][A-S29].

```
                            Did the plugin list change?
                              (added/removed/updated
                               any @capacitor/* package)
                                      |
                              +-------+-------+
                              |               |
                             yes              no
                              |               |
                              v               v
                       npx cap sync    Did webDir content change?
                       (npm install    (npm run build produced
                        + cap copy     a new dist/)
                        + pod install       |
                        + gradle sync)      |
                              |          +--+--+
                              |          |     |
                              |         yes    no
                              |          |     |
                              |          v     v
                              |    npx cap     npx cap copy
                              |    copy        is a no-op
                              |    (web-bundle
                              |     only)
                              |
                              v
                       Want to launch on a real device
                       or simulator?
                              |
                       +------+------+
                       |             |
                      yes            no
                       |             |
                       v             v
                 npx cap run     workflow ends;
                 <platform>      CI step runs
                 --target=<id>   npx cap sync
```

| Scenario | Command | Why |
|---|---|---|
| Added or removed a plugin (e.g. `@capacitor/preferences`) | `npx cap sync` | Sync runs `cap copy` AND installs the native dependency on both iOS (pod install) and Android (gradle sync). `cap copy` alone would leave the native side stale [A-S12][A-S13]. |
| Updated a plugin version | `npx cap sync` | Same as above; the native side must re-resolve. |
| Rebuilt the web bundle only (no plugin change) | `npx cap copy` | Copy is web-bundle-only and ~10x faster than sync. Use it during the inner dev loop when only the JS changed [A-S13]. |
| First install of a new platform | `npx cap add ios` or `npx cap add android` | `cap add` generates the native Xcode / Gradle project from scratch; one-shot per project [A-S12][A-S29]. |
| Launch on a real device or simulator | `npx cap run <platform> --target=<id>` | Run is copy + native build + install + launch. `--target=<id>` picks a device; on iOS sim use `xcrun simctl list devices` for the UUID; on Android use `adb devices`. `--list` prints targets without launching [A-S29]. |
| Live-reload against a dev server | `npx cap run <platform> --live-reload --port=5173` | Run with `--live-reload` flips the `server.url` config to the dev server and restores it on exit. Pair with `server.cleartext: true` (dev only) [A-S17]. |
| Doctor / environment check | `npx cap doctor` | Validates Node, Xcode, Android SDK, Java, CocoaPods, Gradle. Run when "nothing works" [A-S10]. |

Run `npx cap --help` to enumerate every command flag; the canonical CLI reference is `https://capacitorjs.com/docs/v8/cli` [A-S10][C-S42].

## Debugging on devices

Two debug surfaces: the WebView itself (HTML / CSS / JS) and the native shell (Swift / Kotlin). Each platform exposes a different debugging toolchain [C-S40].

### iOS (real device + simulator)

- **Safari Web Inspector** -- macOS Safari -> Develop -> `<device-or-simulator>` -> `<webview-label>`. Requires Safari (not Chrome) on the host and a USB-attached or paired simulator. The Capacitor WebView shows as `App` / `<bundle-id>` in the Develop menu.
- **iOS Simulator's `xcrun simctl` headless attach** -- `xcrun simctl ui <udid> appearance` for theme, `xcrun simctl spawn <udid> log stream` for stdout.
- **iOS device console** -- `xcrun devicectl device process list` + `xcrun devicectl device log stream` for USB-attached devices (Xcode 15+).
- **`webContentsDebuggingEnabled: true`** -- iOS-side equivalent of Android's `webViewDebuggingEnabled`. Default is `true` in dev (build mode debug), `false` in release [C-S19].

The Capacitor WebView identifies itself in the JS-side `navigator.userAgent` as the default Safari UA plus the `appendUserAgent` override. The default iOS UA is the same as the host Safari UA; you cannot distinguish the WebView from a real Safari tab by UA alone on iOS. The distinguishing string is the URL scheme (`capacitor://localhost` instead of `https://`) [C-S40].

### Android (real device + emulator)

- **`chrome://inspect`** from a desktop Chrome -- any host that can reach the device over `adb` works. The Capacitor WebView shows under the device label as a WebView row; click `inspect` to open DevTools.
- **`adb logcat | grep -i 'Capacitor'`** -- filters the native-side logs to just the Capacitor bridge messages.
- **Android WebView UA tell** -- the Android System WebView appends `; wv)` to the `navigator.userAgent` when running inside an Android app. Gate any PWA service-worker registration on `!navigator.userAgent.includes('; wv)')` so the SW does not run inside the WebView (where it cannot cache cross-origin resources reliably) [B-S7].

### Cross-platform runtime introspection

The `@capacitor/app` plugin's `getInfo()` returns runtime info that is useful for in-app diagnostics:

```ts
import { App } from '@capacitor/app';

const info = await App.getInfo();
// {
//   name: 'ExampleApp',
//   id: 'com.example.app',
//   build: '1.0.0',          // matches iOS CFBundleVersion / Android versionCode
//   version: '1.0.0',        // matches iOS CFBundleShortVersionString / Android versionName
//   platform: 'ios',         // 'ios' | 'android' | 'web'
//   platformVersion: '18.0', // iOS 18 / Android 14
//   webViewVersion: '605.1.15' // WKWebView build on iOS
// }
```

`App.getState()` returns `{ isActive: boolean }` (whether the activity is foreground). Both methods help a single-PR review verify what platform the build is actually running on without checking the device by hand [A-S16].

For routing-aware debug logs, `import { Capacitor } from '@capacitor/core'` exposes `Capacitor.getPlatform()` returning `'ios' | 'android' | 'web'` and `Capacitor.isNativePlatform()` returning `true` for iOS + Android only. Most plugins check `isNativePlatform()` before calling native code so the same JS bundle runs on the PWA web surface without throwing [A-S18].

## CI/CD matrix

The recommended Capacitor CI matrix is three jobs: one web-build job on Linux (the bundler output), and two platform-specific jobs that each download the web artifact and run the native build + sign + upload. GitHub Actions is the default; the matrix shape ports directly to Bitrise / Appcircle / Codemagic [C-S38].

### Complete GitHub Actions workflow

The recommended matrix shape -- one platform-shared web build job, two platform-specific jobs (iOS on macOS, Android on Linux). Replace the `ionic-team/...` reusable actions with the team-specific reusable workflows once verified at planning time; the shape stands regardless [C-S38].

```yaml
# .github/workflows/capacitor-build.yml
name: Capacitor build

on:
  push:
    branches: [main]
    tags: ['v*']
  pull_request:
    branches: [main]
  workflow_dispatch:
    inputs:
      target:
        description: 'TestFlight internal | Play internal | store upload'
        required: true
        default: 'TestFlight internal'

concurrency:
  group: capacitor-${{ github.ref }}
  cancel-in-progress: ${{ github.ref != 'refs/heads/main' }}

jobs:
  web:
    name: Build web bundle
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'

      - name: Install JS deps
        run: npm ci

      - name: Build web bundle
        run: npm run build
        env:
          # Inject secrets at build time; never commit .env to source control
          NODE_ENV: production

      - name: Upload web artifact
        uses: actions/upload-artifact@v4
        with:
          name: web-bundle
          path: dist
          retention-days: 7

  ios:
    name: iOS build + sign + upload
    needs: web
    runs-on: macos-14
    timeout-minutes: 60
    # Only run iOS job on main pushes, tag pushes, or manual dispatch
    if: github.event_name != 'pull_request'
    env:
      # Secrets live in repo Settings -> Secrets and variables -> Actions
      APPLE_TEAM_ID: ${{ secrets.APPLE_TEAM_ID }}
      APP_STORE_CONNECT_API_KEY_ID: ${{ secrets.APP_STORE_CONNECT_API_KEY_ID }}
      APP_STORE_CONNECT_API_ISSUER_ID: ${{ secrets.APP_STORE_CONNECT_API_ISSUER_ID }}
      MATCH_PASSWORD: ${{ secrets.MATCH_PASSWORD }}
      MATCH_GIT_BASIC_AUTHORIZATION: ${{ secrets.MATCH_GIT_BASIC_AUTHORIZATION }}
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'

      - uses: actions/download-artifact@v4
        with:
          name: web-bundle
          path: dist

      - name: Install JS deps
        run: npm ci

      - name: cap copy ios
        run: npx cap copy ios

      # Install fastlane for signing + upload (see Fastfile below)
      - uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.3'
          bundler-cache: true

      # Build + sign + upload via fastlane match + pilot (TestFlight) or
      # deliver (App Store Connect). Replace this step with the team's
      # reusable action once verified.
      - name: fastlane ios upload
        run: bundle exec fastlane ios upload
        env:
          MATCH_PASSWORD: ${{ secrets.MATCH_PASSWORD }}
          MATCH_GIT_BASIC_AUTHORIZATION: ${{ secrets.MATCH_GIT_BASIC_AUTHORIZATION }}
          APP_STORE_CONNECT_API_KEY_ID: ${{ secrets.APP_STORE_CONNECT_API_KEY_ID }}
          APP_STORE_CONNECT_API_ISSUER_ID: ${{ secrets.APP_STORE_CONNECT_API_ISSUER_ID }}
          APP_STORE_CONNECT_API_KEY_PATH: ${{ secrets.APP_STORE_CONNECT_API_KEY_PATH }}

  android:
    name: Android build + sign + upload
    needs: web
    runs-on: ubuntu-latest
    timeout-minutes: 45
    if: github.event_name != 'pull_request'
    env:
      ANDROID_KEYSTORE_PATH: ${{ secrets.ANDROID_KEYSTORE_PATH }}
      ANDROID_KEYSTORE_PASSWORD: ${{ secrets.ANDROID_KEYSTORE_PASSWORD }}
      ANDROID_KEY_ALIAS: ${{ secrets.ANDROID_KEY_ALIAS }}
      ANDROID_KEY_PASSWORD: ${{ secrets.ANDROID_KEY_PASSWORD }}
      PLAY_STORE_JSON_KEY: ${{ secrets.PLAY_STORE_JSON_KEY }}
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'

      - uses: actions/download-artifact@v4
        with:
          name: web-bundle
          path: dist

      - name: Install JS deps
        run: npm ci

      - uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '17'

      - name: cap copy android
        run: npx cap copy android

      # Build the signed AAB and upload via fastlane supply
      - name: fastlane android upload
        run: bundle exec fastlane android upload
        env:
          ANDROID_KEYSTORE_PATH: ${{ secrets.ANDROID_KEYSTORE_PATH }}
          ANDROID_KEYSTORE_PASSWORD: ${{ secrets.ANDROID_KEYSTORE_PASSWORD }}
          ANDROID_KEY_ALIAS: ${{ secrets.ANDROID_KEY_ALIAS }}
          ANDROID_KEY_PASSWORD: ${{ secrets.ANDROID_KEY_PASSWORD }}
          PLAY_STORE_JSON_KEY: ${{ secrets.PLAY_STORE_JSON_KEY }}
```

The matrix above is the canonical pattern. The two platform jobs depend on the `web` job so a failing web build never burns the macOS runner (which costs more). The macOS-14 runner is the current GitHub-hosted macOS image as of 2026-08-18; bump to `macos-15` once it leaves the "preview" tier [C-S38].

### Caching and concurrency

- **Node modules cache** -- `actions/setup-node@v4` with `cache: 'npm'` reads `package-lock.json` and restores `~/.npm` between runs; ~30-60 s saved per job.
- **Gradle cache** -- `actions/cache@v4` with `path: ~/.gradle/caches` + `key: gradle-${{ hashFiles('**/*.gradle*') }}` saves the first-time Gradle download (~300 MB) on warm runs.
- **CocoaPods cache** -- `actions/cache@v4` with `path: ~/Library/Caches/CocoaPods` + `key: pods-${{ hashFiles('ios/Podfile.lock') }}` saves the pod install on warm runs.
- **Concurrency cancel-in-progress** -- the `concurrency:` block at the top cancels in-progress builds on the same branch when a new commit lands. Skip on `main` (where you want every build to complete) [C-S38].

### Recommended `package.json` scripts

```json
{
  "scripts": {
    "build": "vite build",
    "cap:sync": "npm run build && cap copy && cap sync",
    "cap:sync:ios": "npm run build && cap copy ios && cap sync ios",
    "cap:sync:android": "npm run build && cap copy android && cap sync android",
    "cap:run:ios": "npm run cap:sync:ios && cap run ios --target=<device-id>",
    "cap:run:android": "npm run cap:sync:android && cap run android --target=<device-id>",
    "cap:livereload:ios": "cap run ios --livereload --port=5173 --target=<device-id>",
    "cap:livereload:android": "cap run android --livereload --port=5173 --target=<device-id>",
    "cap:doctor": "cap doctor",
    "assets:generate": "cap assets generate --android --ios --assetSources=resources"
  }
}
```

The `npm run build` prefix on every `cap copy` / `cap sync` step is the missing piece in most Capacitor starter projects; without it, the native shell ships the previous build [A-S12][A-S13].

## fastlane integration

`fastlane` is the de-facto iOS signing + upload layer underneath any CI vendor. For Android, `fastlane supply` uploads the AAB to the Play Console; for iOS, `fastlane match` provisions the signing certificate and `fastlane pilot` (TestFlight) or `fastlane deliver` (App Store Connect) does the upload.

### Recommended `Fastfile` skeleton

```ruby
# fastlane/Fastfile

default_platform(:ios)

# App Store Connect API key -- generate at App Store Connect -> Users -> Keys
# Then expose MATCH_PASSWORD, MATCH_GIT_BASIC_AUTHORIZATION, and the
# APP_STORE_CONNECT_API_KEY_* trio via CI secrets.

platform :ios do
  desc "Build, sign, and upload to TestFlight (internal)"
  lane :upload do
    # Pull the signing certificate from the team match repo
    match(
      type: "appstore",
      readonly: true,
      git_url: ENV["MATCH_GIT_URL"]
    )

    # Bump build number to current timestamp (matches CI's every-build-is-a-build-number pattern)
    increment_build_number(
      build_number: ENV["GITHUB_RUN_NUMBER"] || latest_testflight_build_number + 1
    )

    # Build the signed IPA
    build_app(
      workspace: "ios/App/App.xcworkspace",
      scheme: "App",
      configuration: "Release",
      export_method: "app-store",
      output_directory: "./build",
      output_name: "App.ipa"
    )

    # Upload to TestFlight (internal testing track)
    upload_to_testflight(
      skip_waiting_for_build_processing: true
    )
  end
end

platform :android do
  desc "Build, sign, and upload to Play Console (internal track)"
  lane :upload do
    # Bump versionCode to current timestamp
    android_set_version_code(
      version_code: ENV["GITHUB_RUN_NUMBER"] || 1,
      gradle_file: "android/app/build.gradle"
    )

    # Build the signed AAB
    gradle(
      project_dir: "android",
      task: "bundleRelease",
      properties: {
        "android.injected.signing.store.file" => ENV["ANDROID_KEYSTORE_PATH"],
        "android.injected.signing.store.password" => ENV["ANDROID_KEYSTORE_PASSWORD"],
        "android.injected.signing.key.alias" => ENV["ANDROID_KEY_ALIAS"],
        "android.injected.signing.key.password" => ENV["ANDROID_KEY_PASSWORD"]
      }
    )

    # Upload to Play Console (internal testing track)
    upload_to_play_store(
      track: "internal",
      aab: "android/app/build/outputs/bundle/release/app-release.aab",
      json_key: ENV["PLAY_STORE_JSON_KEY"],
      skip_upload_apk: true
    )
  end
end
```

The lane above is the minimum viable fastlane setup for both platforms. Replace `MATCH_GIT_URL` with the team's match repo (or a 1Password / Google Cloud Secret Manager-backed reference) and supply the four Android keystore secrets + the Play Console JSON key.

### Screenshot generation (optional but recommended)

`fastlane snapshot` (iOS) and `fastlane screengrab` (Android) automate the screenshot generation for the App Store and Play Store listings. Both run on a UI test target and produce the per-device-resolution images the stores require. For Capacitor apps, the screenshot test target must be a Swift/Kotlin UI test that loads `capacitor://localhost` (or a stable dev URL) and taps through the screen-list you want captured [C-S38].

## Alternative CI/CD vendors

Three credible alternatives to GitHub Actions. The decision is usually "team size + budget + existing CI", not "which is best for Capacitor" -- all three ship pre-built Capacitor workflow templates.

### Codemagic (paid, Capacitor-friendly)

Codemagic is the CI vendor most explicitly aligned with Capacitor. It ships a pre-built Capacitor workflow template (under "Add app -> Capacitor"), which wires the matrix shape (web build -> iOS build on `Mac Pro` runner -> Android build on Linux runner) and the codemagic.yaml shape without the engineer writing YAML by hand. Pricing is tiered: a Hobby tier covers 1-engineer projects at low/no cost, Team tiers charge per macOS-host minute for parallel iOS builds. The macOS host is required for iOS builds (no Linux alternative); Codemagic's Mac Pro hosts are the fastest path for a single-PR iOS Capacitor build. Trade-off: vendor lock-in (the codemagic.yaml is not portable to GitHub Actions without translation); best for a solo / small team with budget for hosted macOS [C-S38].

### Bitrise (enterprise alternative)

Bitrise is the enterprise-friendly alternative with native iOS + Android build steps ("Steps" in Bitrise parlance). The Capacitor-specific build step is community-maintained but stable. Pricing is per-concurrent-build with macOS + Linux hosts. Bitrise's main advantage over GitHub Actions is the visual workflow editor (drag-and-drop steps) -- useful for teams that prefer GUI over YAML. Trade-off: the visual editor is not version-controlled the way a YAML file is, so the build pipeline audit history lives in Bitrise's web UI rather than `git log`. Best for mobile-first teams already on Bitrise for native iOS/Android apps [C-S38].

### Appcircle (alternative for teams already on Appcircle)

Appcircle is a mobile-focused CI/CD with first-class iOS + Android support and a Capacitor template in its template gallery. Pricing is per-concurrent-build; the free tier covers small teams. Appcircle's main advantage is its built-in code signing distribution (the "Signing Profiles" feature centralizes iOS certificates + Android keystores across multiple apps in a single team account). Trade-off: smaller community than Bitrise; harder to find answers to edge-case build issues. Best for teams that already use Appcircle for native iOS/Android and want a single vendor across both [C-S38].

The recommended default for new projects is **GitHub Actions + fastlane** (free for public repos; per-minute for private repos with generous free tier); switch to Codemagic when the macOS-build minute cost on GitHub Actions exceeds Codemagic's per-month subscription.

## App Store + Play Store upload

### App Store Connect (iOS)

The iOS upload pipeline has three layers: signing (certificate + provisioning profile), uploading (IPA -> TestFlight or App Store Connect), and review (Apple's manual + automated review queue).

- **TestFlight internal testing track** -- invite-only, no App Store review. Add testers by email under App Store Connect -> My Apps -> TestFlight. Build is auto-distributed to invited testers within ~1 minute of upload. Use this for QA + stakeholder review.
- **TestFlight external testing track** -- up to 10,000 external testers; requires a brief Beta App Review (usually < 48 hours). Use this for closed-beta programs.
- **App Store submission** -- full App Store review (1-3 days typical, can be 24 hours or 2 weeks depending on complexity). Requires finalized screenshots + privacy manifest + signing + all metadata.

**App Store Connect API key vs Apple Developer account auth** -- the modern path uses an App Store Connect API key (Settings -> Users and Access -> Keys -> Generate). The API key is a `.p8` file + Key ID + Issuer ID; fastlane and the `xcrun altool` command consume it directly. The legacy path used your Apple Developer account's 2FA + an app-specific password (`xcrun altool --upload-package ... -u <email> -p <app-specific-password>`); this path still works but is harder to automate in CI because the 2FA rotation breaks the password. The recommended CI path is the API key [C-S38].

**Privacy manifest** -- `ios/PrivacyInfo.xcprivacy` ships with the v8 iOS template and must be kept current for App Store submissions. The `NSPrivacyTracking` flag must be `false` unless the app uses tracking per Apple's definition; `NSPrivacyTrackingDomains` must list any domain used for tracking; `NSPrivacyCollectedAPIUsageTypes` must enumerate the "Required Reason" API categories the app uses. Apple publishes the manifest format at `capacitorjs.com/docs/ios/privacy-manifest` and rejects submissions without it [A-S31].

**App Store review common rejections for Capacitor apps** -- the canonical list lives in `10-known-issues-and-solutions.md` Table B. The single most common is a leaked `server.cleartext: true` in `capacitor.config.ts` (which translates to `NSAppTransportSecurity` allowing arbitrary loads in `Info.plist`); the second is missing `NSPrivacyAccessedAPITypeReasons` entries in the privacy manifest.

### Play Console (Android)

The Android upload pipeline is simpler than iOS because the Play Console accepts the signed AAB directly and the review queue is largely automated.

- **Internal testing track** -- invite-only, no Play review. Use for QA + stakeholder review.
- **Closed testing track** -- invite-only with a larger tester pool; useful for beta programs.
- **Open testing track** -- public link; visible on the Play Store as "Early Access". Useful for opt-in beta.
- **Production track** -- full Play review (usually < 24 hours, can be up to 2 weeks for new developer accounts).

**Google Play Console API** -- fastlane supply uses a JSON key generated at Google Play Console -> Setup -> API access -> Create new service account. The key file is committed to CI secrets as `PLAY_STORE_JSON_KEY`. The recommended CI path is the JSON key, not the legacy `package_name` + `track` upload form [C-S38].

**Play Store signing** -- Play App Signing is mandatory for new apps since August 2021. The upload key (your keystore) signs the AAB; Play re-signs the APK distributed to devices with Google's app signing key. Keep the upload keystore in a team-shared secret manager; losing it blocks future uploads.

**Target API level** -- Capacitor v8 requires `targetSdk = 36` (Android 16). The `variables.gradle` `targetSdkVersion` field is the single source of truth; bump it only when Capacitor publishes a new major (the team has stated: *"Capacitor Android does not support custom target SDK versions"*) [A-S7]. Play Store submissions require the app to target the latest Android API level within 12 months of its release; missing the deadline triggers a "Update your app" warning in the Play Console.

### TestFlight internal testing track (iOS)

For each release:

1. Bump `CFBundleShortVersionString` (e.g. `1.0.0` -> `1.1.0`) and `CFBundleVersion` (e.g. `42` -> `43`) in `ios/App/Info.plist`.
2. Bump `versionName` (e.g. `1.0.0` -> `1.1.0`) and `versionCode` (e.g. `42` -> `43`) in `android/app/build.gradle`.
3. Bump `version` in `package.json` (e.g. `1.0.0` -> `1.1.0`).
4. Tag the release commit: `git tag -a v1.1.0 -m "v1.1.0: <one-line>"`.
5. Push the tag: `git push origin v1.1.0`.
6. CI runs the matrix, signs the IPA + AAB, uploads to TestFlight internal + Play Console internal.
7. Smoke-test on real devices (iPhone 12+, Pixel 5+).
8. Promote TestFlight internal -> TestFlight external -> App Store production (or Play Console internal -> production) on the timeline the team chose.

## Version bumps in lockstep

Three version numbers must move in lockstep on every release: the JS `package.json` version, the iOS native build numbers, and the Android native build numbers. The `@capacitor/cli` does NOT automate this (issue #8492 is the open feature request) -- bundle a script and wire it into the release commit.

### The three numbers

| Surface | Field | File | Example |
|---|---|---|---|
| JS bundle | `version` | `package.json` | `"version": "1.1.0"` |
| iOS release version | `CFBundleShortVersionString` | `ios/App/Info.plist` | `<string>1.1.0</string>` |
| iOS build number | `CFBundleVersion` | `ios/App/Info.plist` | `<string>43</string>` |
| Android release version | `versionName` | `android/app/build.gradle` | `versionName "1.1.0"` |
| Android build number | `versionCode` | `android/app/build.gradle` | `versionCode 43` |

### A simple release script

`scripts/bump-version.mjs`:

```js
#!/usr/bin/env node
// Bump package.json + ios/App/Info.plist + android/app/build.gradle
// Usage: node scripts/bump-version.mjs 1.1.0 43
import { readFileSync, writeFileSync } from 'node:fs';

const [, , newVersion, newBuild] = process.argv;
if (!newVersion || !newBuild) {
  console.error('Usage: node scripts/bump-version.mjs <version> <build>');
  process.exit(1);
}

// 1. package.json
const pkgPath = 'package.json';
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
pkg.version = newVersion;
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

// 2. iOS Info.plist (CFBundleShortVersionString + CFBundleVersion)
const plistPath = 'ios/App/Info.plist';
let plist = readFileSync(plistPath, 'utf8');
plist = plist.replace(
  /<key>CFBundleShortVersionString<\/key>\s*<string>[^<]+<\/string>/,
  `<key>CFBundleShortVersionString</key><string>${newVersion}</string>`
);
plist = plist.replace(
  /<key>CFBundleVersion<\/key>\s*<string>[^<]+<\/string>/,
  `<key>CFBundleVersion</key><string>${newBuild}</string>`
);
writeFileSync(plistPath, plist);

// 3. Android build.gradle (versionName + versionCode)
const gradlePath = 'android/app/build.gradle';
let gradle = readFileSync(gradlePath, 'utf8');
gradle = gradle.replace(/versionName "[^"]+"/, `versionName "${newVersion}"`);
gradle = gradle.replace(/versionCode \d+/, `versionCode ${newBuild}`);
writeFileSync(gradlePath, gradle);

console.log(`Bumped to ${newVersion} (${newBuild}) in package.json + iOS + Android`);
```

Wire it into the `npm version` lifecycle:

```json
{
  "scripts": {
    "version": "node scripts/bump-version.mjs $npm_package_version $((`git rev-list --count HEAD`))"
  }
}
```

Then `npm version minor` triggers the lifecycle script that bumps all three files in lockstep and writes the version commit. `git rev-list --count HEAD` returns the commit count as the build number, which monotonically increases per commit and never collides with a previous build.

### Why this matters

The store submission upload fails if `CFBundleVersion` / `versionCode` do not increment. iOS rejects an upload with "CFBundleVersion must be higher than the previous uploaded build"; Play Store rejects the same way on `versionCode`. Bumping only `package.json` and shipping the same build number twice is the second most common release-day mistake (after the `cleartext: true` leak) [A-S31].

The store-side analytics (crash reports, version breakdowns, install cohort analysis) also break if the JS bundle version diverges from the native build numbers. A user running `package.json@1.1.0` on `CFBundleVersion=42` shows up as `1.1.0 (42)` in the analytics dashboard; if you bump one and not the other, the dashboard becomes incoherent.

## OTA caveat

**Capacitor has no first-party OTA (over-the-air JS-bundle hot-update) story.** This is a deliberate API surface decision -- the JS bundle shipped in the App Store / Play Store binary is the JS bundle the device runs, period. There is no Capacitor-side mechanism for swapping that bundle without a store review [C-S36][C-S37].

**CodePush is RN-only.** CodePush was created by Microsoft for React Native; the App Center service that hosted CodePush was sunset on 2025-09-30. The "use CodePush for OTA" suggestion is the wrong answer for Capacitor -- the package does not target Capacitor apps, and the managed service it depended on no longer exists [C-S36].

**The credible OSS-ish third-party is `@capgo/capacitor-updater`** (Capgo). It is a community/commercial hybrid with a SaaS plan (managed dashboard, OTA server, versioning UI) and a self-hosted option (the server-side OTA backend runs on your own infra under the Capgo Community License). It is published on npm as `@capgo/capacitor-updater` (verify the package name at install time; the npm registry is the source of truth, not this dossier). The official page is `capgo.io`. The community-plugin index at `riderx/awesome-capacitor` (maintained by Capgo) lists it as the primary OTA option [C-S23][C-S37].

**Trade-offs for Capgo:**

- **App Store policy.** Apple has historically allowed JS-only updates without triggering review, but the policy is not guaranteed and Apple has flagged apps with aggressive OTA patterns in the past. Verify the App Store policy posture for your use-case before shipping Capgo to production.
- **Data residency.** The SaaS plan stores the JS bundle + version metadata on Capgo's infrastructure; verify the data-residency story for EU / regulated deployments. The self-hosted option eliminates this concern at the cost of running the OTA server yourself.
- **Code signing.** The OTA bundle must be signed; Capgo signs with an RSA key you generate at first install. The key lives in your CI's secret manager; losing the key forces a re-publish via the store, not via OTA.

**When to ship without OTA.** The default safe posture is "ship-then-store-review": every JS change goes through the App Store + Play Store review queue. This is the recommended default unless the team has a real use-case (A/B testing across user cohorts, hot-fix shipping outside the review window, security patches that must land within hours). For most apps, the store-review cadence is fast enough that OTA is not justified [C-S36][C-S37].

**Marketing-page OTA via PWA.** A different beast entirely: the `vite-plugin-pwa` + service worker pattern updates the marketing landing page over the air without touching the native binary. This is not a JS-bundle OTA (the WebView's bundled JS is unchanged); it is a PWA-style cache invalidation. Marketing pages only -- never ship business-logic updates this way [C-S38].

The full OTA decision rule is in `09-do-and-dont.md` row 20 and `11-system-prompt-for-llms.md` rule 2.

## Cross-file pointers

- **back to `02-install-and-setup.md`** -- the CLI command list (`add`, `build`, `copy`, `doctor`, `init`, `ls`, `migrate`, `open`, `run`, `sync`, `update`); the install flow (`npm i @capacitor/core`, `npx cap init`, `npx cap add ios/android`, `npx cap sync`); the v7-to-v8 migration table (especially the UIScene migration in 8.5 that affects CI scripts that touch `ios/App/AppDelegate.swift`).
- **back to `05-plugin-system-and-lifecycle.md`** -- the plugin lifecycle events (`appStateChange`, `pause`, `resume`, `appUrlOpen`, `backButton`) that the `useStatusBar` hook and the `useKeyboard` hook subscribe to; the Cordova compat shim that lets legacy Cordova plugins ship without rewriting; the `@capacitor/app` `getInfo()` shape used in the cross-platform debugging section above.
- **back to `06-native-like-delivery-checklist.md`** -- the six-axis priority list (safe-area + status bar + splash + haptics + back-button + dark-mode-follow) that any release must satisfy before the build is shippable; the native-like delivery rows that the per-PR review checks.
- **forward to `09-do-and-dont.md`** -- the 20-row anti-pattern matrix; rows 12, 17, 18, 19, 20 are directly keyed to this file's build / ship / OTA sections.
- **forward to `10-known-issues-and-solutions.md`** -- the HIGH-risk register (`#8560` v9 broken framework, `#8573` tar v7 CLI breakage, `#8562` destroyed WebView, `#8546` URLSessionTask, `#8539` prompt media) with per-issue workarounds; the Android 16 status-bar no-op entry; the App Store review-rejection list.
- **forward to `11-system-prompt-for-llms.md`** -- the LLM-facing rules that cite this file (especially rules 2, 7, 11, and the anti-pattern rows for cleartext + version-bump).

## Freshness

<!-- freshness: capacitor=8.5.0 access=2026-08-18 -->

- last_verified: 2026-08-18
- source_schema_versions: @capacitor/core@8.5.0, @capacitor/cli@~8.0.0, @capacitor/assets@3.0.5
- anchor_url: https://capacitorjs.com/docs
- anchor_ci_url: https://capacitorjs.com/docs/cli/commands/run
- v9_watch_only_issue: https://github.com/ionic-team/capacitor/issues/8560
- tar_v7_cli_issue: https://github.com/ionic-team/capacitor/issues/8573
- app_center_sunset: 2025-09-30

## References

- [A-S7] -- https://capacitorjs.com/docs/android/setting-target-sdk -- accessed 2026-08-18 (Capacitor Android target SDK page; v8.x requires targetSdk=36; `Capacitor Android does not support custom target SDK versions`)
- [A-S8] -- https://capacitorjs.com/docs/updating/8-0 -- accessed 2026-08-18 (v7 to v8 upgrade guide; variables.gradle lockfile; minSdk 24, compileSdk 36, targetSdk 36; AGP 8.13.0; Gradle 8.14.3; Kotlin 2.2.20; `density` added to configChanges)
- [A-S10] -- https://capacitorjs.com/docs/v8/cli -- accessed 2026-08-18 (CLI command list: add, build, copy, doctor, init, ls, migrate, open, run, sync, update)
- [A-S12] -- https://capacitorjs.com/docs/v8/cli/commands/sync -- accessed 2026-08-18 (cap sync: copies webDir + installs native deps + updates plugin registrations)
- [A-S13] -- https://capacitorjs.com/docs/v8/cli/commands/copy -- accessed 2026-08-18 (cap copy: copies webDir only; no native-side work)
- [A-S16] -- https://capacitorjs.com/docs/apis/app -- accessed 2026-08-18 (`@capacitor/app` lifecycle events; `getInfo()` returns name/id/build/version/platform/platformVersion/webViewVersion; `getState()` returns isActive)
- [A-S17] -- https://capacitorjs.com/docs/guides/live-reload -- accessed 2026-08-18 (live reload; server.url + server.cleartext; Ionic CLI integration `ionic cap run -l --external`; manual `npx cap run --live-reload --port`)
- [A-S18] -- https://capacitorjs.com/docs/v8/plugins/creating-plugins -- accessed 2026-08-18 (plugin anatomy; JS bridge contract; `registerPlugin<T>`; `getPlatform()` returns `'ios' | 'android' | 'web'`; `isNativePlatform()`)
- [A-S20] -- https://github.com/ionic-team/capacitor/issues/8560 -- accessed 2026-08-18 (9.0.0-alpha.6 `Cordova.xcframework` ships a nested `Capacitor.framework`; CFBundleIdentifier Collision on App Store Connect upload; only v9-alpha affected)
- [A-S21] -- https://github.com/ionic-team/capacitor/issues/8573 -- accessed 2026-08-18 (CLI 6.x/7.x broken by `tar@^7.5.19`; `extractTemplate()` calls `tar.extract` whose shape changed in tar v7; upgrade to `@capacitor/cli@^8` or pin `tar` to `^6`)
- [A-S29] -- https://capacitorjs.com/docs/v8/cli/commands/run -- accessed 2026-08-18 (cap run flags: `--list`, `--target`, `--live-reload --port`; `--live-reload` temporarily injects `server` config and restores on termination)
- [A-S31] -- https://capacitorjs.com/docs/ios/configuration -- accessed 2026-08-18 (Info.plist edits; capabilities via Signing & Capabilities tab; deeplinks via Universal Links; iPadOS 26 `UIDesignRequiresCompatibility`; Privacy Manifest `ios/PrivacyInfo.xcprivacy` for App Store)
- [B-S7] -- https://capacitorjs.com/docs/getting-started -- accessed 2026-08-18 (the official install flow; `npx cap init` auto-detects `webDir` per framework; the `; wv)` UA tell for the Android WebView)
- [C-S19] -- https://raw.githubusercontent.com/ionic-team/capacitor/main/cli/src/declarations.ts -- accessed 2026-08-18 (canonical Capacitor configuration schema; `webViewDebuggingEnabled` per platform; `server.cleartext` must be `true` for `http://` dev URLs and is the most common App Store rejection if leaked to production)
- [C-S23] -- https://github.com/riderx/awesome-capacitor -- accessed 2026-08-18 (curated community plugin index; 635 stars; maintained by Capgo; the canonical OSS-community reference; OTA options listed at the top)
- [C-S24] -- https://www.npmjs.com/package/@capacitor/assets -- accessed 2026-08-18 (icon + splash generator 3.0.5; single-source mode takes one 1024x1024 PNG; custom mode requires four files: icon-only, icon-foreground, icon-background, splash, splash-dark; `--ios`, `--android`, `--pwa` flags)
- [C-S29] -- https://www.npmjs.com/package/@capacitor/splash-screen -- accessed 2026-08-18 (SplashScreen config: `launchShowDuration` default 3000 ms, `launchAutoHide` default true, `launchFadeOutDuration`, `backgroundColor`, `splashFullScreen`, `splashImmersive`, `androidSplashResourceName`, `splash-dark.png` filename convention for Android 12+ dark variant)
- [C-S36] -- https://capacitorjs.com/docs/v8/basics/using-plugins -- accessed 2026-08-18 (Capacitor docs note "no OTA story for Capacitor"; CodePush is RN-only; App Center sunset 2025-09-30; cross-reference for the OTA caveat)
- [C-S37] -- https://capgo.io -- accessed 2026-08-18 (Capgo home page; `@capgo/capacitor-updater`; commercial SaaS + self-hosted option under Capgo Community License; data-residency story; App Store policy posture)
- [C-S38] -- https://capacitorjs.com/docs/cli/commands/run -- accessed 2026-08-18 (Capacitor CI/CD guidance; Codemagic / Bitrise / Appcircle / GitHub Actions + fastlane matrix; `cap run --live-reload` injects `server` config; App Store Connect API key vs Apple Developer account auth)
- [C-S40] -- https://capacitorjs.com/docs/web -- accessed 2026-08-18 (Capacitor web platform docs; ES2017 baseline; viewport-fit + safe-area; `touch-action: manipulation`; `-webkit-tap-highlight-color`; the WebView does NOT inject `viewport-fit=cover` for you)
- [C-S42] -- https://capacitorjs.com/docs/cli -- accessed 2026-08-18 (Capacitor CLI command list: `add` / `build` / `copy` / `doctor` / `init` / `ls` / `migrate` / `open` / `run` / `sync` / `update`)
- [C-S43] -- https://github.com/konstaui/konsta -- accessed 2026-08-18 (Konsta UI README; pixel-perfect mobile UI components; iOS + Material Design flavors for React/Vue/Svelte; default lightweight shell when not on Ionic)
- [C-S50] -- https://tanstack.com/virtual/latest -- accessed 2026-08-18 (TanStack Virtual docs; default list virtualization for any list > 100 rows; referenced by the runtime/long-tail checklist)