# Known Issues and Solutions

**Audience:** Engineer debugging. When a Capacitor app breaks in production -- or when a PR's first build rejects in App Store review -- this is the index of known HIGH/MEDIUM/LOW issues with the GitHub issue URL, the trigger, the symptom, the workaround, and the permanent-fix status. The HIGH-risk register is the first thing to check.

**Anchor:** Capacitor v8.5.0 (verified 2026-08-18). v9.0.0-alpha.6 is watch-only (#8560). Every issue row carries a GitHub URL or canonical doc anchor; every workaround is a code-level snippet the engineer can apply in `capacitor.config.ts`, `package.json`, `ios/App/Info.plist`, or `android/app/src/main/AndroidManifest.xml`.

**Cross-references:** back to `05-plugin-system-and-lifecycle.md` (Cordova compat shim; `@capacitor/storage` deprecation; `@capacitor/local-llm` experimental); `06-native-like-delivery-checklist.md` (Android 16 status-bar no-op; safe-area patterns); `08-build-and-ship.md` (CI/CD matrix; version bumps; OTA caveat); forward to `11-system-prompt-for-llms.md` (LLM-facing rules), `12-self-questions-for-agents.md` (per-phase pause-and-confirm prompts).

This chapter is the risk register. Three tables (HIGH / MEDIUM / LOW) + a per-issue workaround section for every HIGH row + a "how to file a Capacitor issue" section + cross-file pointers + freshness + references. The HIGH-risk register is the first thing an engineer should walk when an issue is hard to diagnose; the MEDIUM/LOW registers are the long-tail.

## HIGH-risk register

These are the open issues / docs-acknowledged warnings that will block a release or ship a broken app. Walk every row when an app is about to ship; walk them in order (H1, H2, ...) when the symptom is unclear.

| # | Issue | Trigger | Symptom | Workaround | Permanent fix |
|---|---|---|---|---|---|
| **H1** | [Capacitor 9.0.0-alpha.6 broken iOS framework](https://github.com/ionic-team/capacitor/issues/8560) | Pin `@capacitor/core@next` or `^9.0.0-alpha` in `package.json` | `xcodebuild archive` succeeds but App Store Connect upload fails with "CFBundleIdentifier Collision: Multiple commands produce .../Capacitor.framework" inside the `Cordova.xcframework` | Pin `@capacitor/core@~8.5.0` and `@capacitor/cli@~8` for any production work; do not pin `@capacitor/core@next` until #8560 merges | PR open in `capacitor-swift-pm` to fix the nested `xcodebuild archive` invocation that creates the duplicate `Capacitor.framework` |
| **H2** | [Capacitor CLI 6.x/7.x broken by `tar@^7.5.19`](https://github.com/ionic-team/capacitor/issues/8573) | `npm audit fix` forces `tar` to `^7.5.19` via `npm overrides`; project is on `@capacitor/cli@<8` | `npx cap add android` throws `TypeError: Cannot read properties of undefined (reading 'extract')` at the `extractTemplate()` call site | (a) Upgrade to `@capacitor/cli@^8` (uses tar v7-safe API); OR (b) pin `tar` to `^6` via `npm overrides` | The CLI's tar call site was updated in v8 to use the new API shape; v6/v7 will not receive a backport |
| **H3** | [Android `eval()` on destroyed WebView after activity recreate](https://github.com/ionic-team/capacitor/issues/8562) | A configuration change (fontScale, locale, density) not declared in `android:configChanges` in `AndroidManifest.xml` | `Application attempted to call on a destroyed WebView` warning in logcat ~190 ms after activity destroy; `pause` / `appStateChange` posted to the old activity's main thread run after the WebView is torn down | Add the missing axis to `android:configChanges` on the `MainActivity`; v8 ships `orientation\|keyboardHidden\|keyboard\|screenSize\|locale\|smallestScreenSize\|screenLayout\|uiMode\|navigation\|density` as the default | MockCordovaWebViewImpl.eval() needs a `webView != null` guard; fix is in PR review as of 2026-08-18 |
| **H4** | [iOS `WKURLSchemeTask` cancellation does not cancel `URLSessionDataTask`](https://github.com/ionic-team/capacitor/pull/8546) | Long-running `fetch` calls; `AbortController.abort()`; many concurrent timeouts | Orphaned `URLSession.shared` per-host connections exhaust the pool; new requests fail with `NSURLErrorCannotConnectToHost` even when the server is healthy | Use a 1-3 s client-side timeout in addition to `URLSession`'s own timeout; backport the PR's `WebViewAssetHandler.swift` change locally | PR #8546 from `lazerwalker` is open and includes a test; watch for merge |
| **H5** | [iOS `prompt()`-based cookie reads pause media playback](https://github.com/ionic-team/capacitor/issues/8539) | Calling `Cookies.getCookies()` from `@capacitor/cookies` while an `AVPlayer` is playing video or audio | Media playback pauses even when the user has not authorized the underlying cookie operation; resumes only after the prompt dialog dismisses | Read cookies at app launch, not during media playback; cache the value in `@capacitor/preferences` | `@capacitor/cookies` should switch from `prompt()` to `HTTPCookieStorage`; fix proposed but not yet merged |
| **H6** | Android 16 status-bar `overlaysWebView` + `backgroundColor` no-op | App targets Android 16 (API 36) on real devices; `@capacitor/status-bar` `setOverlaysWebView` and `setBackgroundColor` called | Status bar ignores the configuration; the WebView is forced edge-to-edge regardless; `backgroundColor` setting has no visual effect | Plan layout with `env(safe-area-inset-*)` padding; do not rely on `overlaysWebView` or `backgroundColor` for layout; use `@capacitor/system-bars` (new in v8) for JS-side inset reads | Capacitor v8 docs page for Status Bar carries an "Android 16+ behavior change" callout that explicitly lists both properties as no-ops; behavior is by design |
| **H7** | Cordova `--platform` flag deprecated; `cap add web` removed | `npx cap add web` or `npx cap add <platform> --platform=web` on a v8 project | `Error: Platform "web" is not supported`; v7 docs references break | Use `npx cap add ios` and `npx cap add android` only; for PWA, ship the bundler's `dist/` directly without adding a native platform | Capacitor 9 will formally deprecate the Cordova framework; the `cap add web` removal is permanent |

The HIGH-risk register covers seven rows. H1-H5 are open GitHub issues; H6 is a docs-acknowledged OS-behavior change; H7 is a CLI surface deprecation. Every row has a workaround the engineer can apply today; permanent fixes for H1, H3, H4, H5 are open PRs or proposed fixes.

## MEDIUM-risk register

Five MEDIUM-risk issues. These break specific features without blocking the release, but the engineer should walk the table before claiming a feature works as designed.

| # | Issue | Trigger | Symptom | Workaround | Permanent fix status |
|---|---|---|---|---|---|
| **M1** | White-screen on first launch | `webDir` pointed at the source folder instead of the post-build folder; bundler emits absolute paths like `/static/js/main.abc123.js`; `base: '/'` in Vite instead of `base: './'` | The WebView loads an empty page; the user sees a white screen; logcat / Safari DevTools show 404 for every asset | Set bundler `base: './'` (Vite), `basePath: ''` (Next static export), `"homepage": "."` (CRA); validate `cap copy` produced a non-empty `ios/App/public/` before `cap sync` | None required -- this is a configuration issue, not a runtime bug |
| **M2** | Cordova-to-Capacitor scheme-swap data loss | Migrating an app from Cordova with `cordova-plugin-ionic-webview` (origin `ionic://localhost`) to Capacitor (origin `capacitor://localhost`) | User logs in via the old `ionic://` scheme, upgrades to Capacitor, and the LocalStorage / IndexedDB data is gone (the origin changed) | Set `server.iosScheme: "ionic"` in `capacitor.config.ts` for the migration only; new Capacitor-only projects should never set `iosScheme` away from the default `capacitor` | None -- the origin change is the migration's intent |
| **M3** | `@capacitor/storage` deprecation (stuck at 1.2.5) | New code uses `@capacitor/storage` on a v8 project | The package works but the npm page lists no v8 release; the v8 docs sidebar no longer carries `Storage` as an official plugin | Use `@capacitor/preferences` 8.0.1 for every new KV store; treat `@capacitor/storage` as deprecated even though the package still publishes | `@capacitor/storage` will not receive a v8 release; the package is effectively in maintenance mode |
| **M4** | `cordova-plugin-fcm` (Firebase Cloud Messaging) shim removed in v8 | Project uses `cordova-plugin-fcm` and upgrades from v7 to v8 | Push notifications stop arriving; native-side errors in logcat: `Plugin cordova-plugin-fcm not found` | Switch to `@capacitor/push-notifications` 8.1.2 (MIT, official, FCM on Android + APNs on iOS); run `npx cap migrate` and re-test | v9 will remove the Cordova framework entirely; migration to `@capacitor/push-notifications` is required for the v9 upgrade |
| **M5** | PWA service-worker conflict with the WebView | The bundler emits a `service-worker.js` that registers on every page load, including the Capacitor WebView | WebView serves a stale cached page when the LAN is down; offline behavior is wrong for the app shell; cross-origin fetch fails silently | Gate SW registration on `!navigator.userAgent.includes('; wv)')` so the SW only registers in a real browser, not the Android System WebView | None required -- the gating pattern is the documented fix |
| **M6** | `adjustMarginsForEdgeToEdge` config removed in v8 | App upgrades from v7 to v8 with the old config flag set in `capacitor.config.ts` | Status bar / navigation bar overlap content on Android 15+; the `npx cap migrate` does NOT add the replacement plugin | Install `@capacitor/system-bars` (new in v8); set safe-area CSS variables (`env(safe-area-inset-*)`); remove the old config flag from `capacitor.config.ts` | None -- the migration is one-time; future v8 versions keep the new plugin |

The MEDIUM register covers configuration and migration issues. Each row has a one-time or per-build workaround; permanent fix is in the v8 docs.

## LOW-risk register

Five LOW-risk issues. These are foot-guns the engineer should be aware of but rarely block a release.

| # | Issue | Trigger | Symptom | Workaround | Permanent fix status |
|---|---|---|---|---|---|
| **L1** | `appendUserAgent` whitespace dropped on iOS in v7 | App sets `appendUserAgent` with extra whitespace to override the WebView's UA on iOS | The UA override silently does nothing on iOS in v7; the WebView reports the default Safari UA | Move the extra-whitespace workaround to `ios.appendUserAgent` in v7; v8 fixes the bug and the workaround is no longer needed |
| **L2** | `density` configChanges axis missing in v7 | App upgrades from v7 to v8 with `android:configChanges` from a v7 template | App recreates the activity on density change (Android 13+); `pause` / `appStateChange` fire spuriously; `eval()` runs on a destroyed WebView (the H3 root cause) | Add `density` to `android:configChanges` on the `MainActivity` in `AndroidManifest.xml`; the v8 default template already includes it | v8 default template ships `density`; v7 apps upgrading must add it manually |
| **L3** | CocoaPods replaced by SPM in v8 default | v7 project re-runs `npx cap add ios` after deleting `ios/` | The v8 template generates a `Package.swift` instead of a `Podfile`; the v7 `Podfile.lock` is lost; CI scripts that reference `pod install` fail | Pass `--packagemanager CocoaPods` to `npx cap add ios` to keep the v7 setup; do not delete `ios/` between `cap-sync` cycles on a CocoaPods project | None -- SPM is the v8 default; CocoaPods is opt-in via flag |
| **L4** | UIScene lifecycle adoption in v8.5 | App upgrades from v8.0 to v8.5 | `application(_:open:options:)` and `application(_:continue:restorationHandler:)` stop firing on the `AppDelegate`; deep-link routing breaks | Add `SceneDelegate.swift` + `UIApplicationSceneManifest` to `Info.plist`; route deep links through the `SceneDelegateProxy` (new in v8.5) | v8.5 ships the `SceneDelegate.swift` template; the migration is one-time |
| **L5** | `@capacitor/local-llm` experimental badge | App pins `@capacitor/local-llm` for production code | The plugin works but the Capacitor Labs README flags "These are experimental plugins. Use at your own risk"; API surface may break between releases | Use only for prototyping; pin to an exact version (`8.0.0-beta.X`) and re-test on every release; track the Capacitor Labs repo for stable-tag announcement | Watch-only; do not pin to `^` or `~` ranges until a stable tag ships |

The LOW register covers configuration foot-guns and the experimental plugin flag. None block a release; the engineer should be aware of each before claiming a feature works as designed.

## Per-issue workarounds -- expanded

For each HIGH row, the expanded workaround with code snippets. The MEDIUM/LOW rows have one-line workarounds in their tables; HIGH rows warrant the long-form.

### WA-H1 -- v9.0.0-alpha.6 broken iOS framework

The v9.0.0-alpha.6 release of `@capacitor/core` (npm tag `next`) ships a broken `Cordova.xcframework` that embeds a nested `Capacitor.framework`. The nested framework triggers `CFBundleIdentifier Collision` on `altool` validation when uploading to App Store Connect. The root cause is `ionic-team/capacitor-swift-pm` PR #37 creating a Cordova-side `xcodebuild archive` invocation that nests `Capacitor.framework` inside `Cordova.xcframework`. Only v9.0.0-alpha.6 is affected; v7 and v8 are clean.

```json
// package.json -- safe pin for any production work
{
  "dependencies": {
    "@capacitor/core": "~8.5.0",
    "@capacitor/cli": "~8.5.0",
    "@capacitor/android": "~8.5.0",
    "@capacitor/ios": "~8.5.0"
  },
  "devDependencies": {
    "@capacitor/assets": "~3.0.5"
  }
}
```

The `~8.5.0` pin accepts 8.5.x patch releases but not 8.6.0 (which would be the v9-stable migration). Verify against the npm dist-tags before upgrading: `npm view @capacitor/core dist-tags` should show `latest: 8.5.0` (or higher 8.x) and `next: 9.0.0-alpha.X`.

If the team needs a v9 feature, branch the upgrade into a separate worktree, run the full test matrix (including the App Store Connect upload via `xcrun altool --validate-app`), and confirm the `CFBundleIdentifier Collision` is gone before merging. Do NOT pin `@capacitor/core@next` in `main` until the PR that fixes #8560 merges and the v9 release is tagged stable.

### WA-H2 -- `@capacitor/cli@<8` broken by `tar@^7.5.19`

The Capacitor CLI 6.x and 7.x call `tar.extract` in `extractTemplate()`. tar v7 (post-CVE-2026-23745) returns `undefined` for `extract` because the API shape changed between tar v6 and tar v7. When `npm audit fix` forces `tar` to `^7.5.19` via `npm overrides`, `npx cap add android` throws `TypeError: Cannot read properties of undefined (reading 'extract')`.

```json
// package.json -- override A: upgrade CLI to v8 (recommended)
{
  "devDependencies": {
    "@capacitor/cli": "^8.5.0"
  }
}
```

```json
// package.json -- override B: pin tar to v6 via npm overrides (when v8 is not possible)
{
  "overrides": {
    "tar": "^6.2.1"
  }
}
```

After applying either override, run `rm -rf node_modules package-lock.json && npm install` to force the new dependency tree. Verify with `npm ls tar` -- the output should show `tar@^6.x` (override B) or `tar@^7.5.x` with `@capacitor/cli@^8` (override A). Then `npx cap add android` should succeed.

If neither override is acceptable (e.g. the team is locked to a specific CLI version for Cordova migration), the only safe path is to NOT apply the tar security patch and accept the CVE-2026-23745 risk until the CLI upgrade lands. The CVE is a path-traversal in tar's archive-extraction; the attack vector requires a malicious tarball to be opened, which the CLI's `extractTemplate()` does NOT do for an attacker-controlled source. The risk is low in practice but non-zero.

### WA-H3 -- Android `eval()` on destroyed WebView

`MockCordovaWebViewImpl.eval()` posts a runnable to the main looper without checking if the WebView is alive. If the activity is recreated (fontScale change, locale change, density change on Android 13+, etc.) and the configChange axis is not declared in `android:configChanges`, the runnable fires after the WebView is torn down and Android logs `Application attempted to call on a destroyed WebView` ~190 ms after destroy.

```xml
<!-- android/app/src/main/AndroidManifest.xml -->
<activity
    android:name=".MainActivity"
    android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|smallestScreenSize|screenLayout|uiMode|navigation|density"
    android:exported="true">
    <!-- ... -->
</activity>
```

The v8 default template already includes `density` in the `configChanges` list (added in v8.0). For v7 apps upgrading, add the missing axis. For v8 apps that removed an axis (e.g. an engineer trimmed `screenLayout` thinking it was unused), restore it -- `screenLayout` fires on foldable devices (Z Fold, Pixel Fold) and `smallestScreenSize` fires on Android 13+ density changes.

After applying the fix, validate on a real device by triggering a configuration change (Settings -> Display -> Font size -> Largest) and watching logcat for the `destroyed WebView` warning. The warning should not appear.

### WA-H4 -- iOS `WKURLSchemeTask` cancellation

iOS `WKURLSchemeTask` cancellation does not cancel the underlying `URLSessionDataTask`. Cancelling a fetch via `AbortController` only sets a flag on the WebView side; the actual network task keeps running, holds `URLSession.shared` per-host connections, and exhausts the pool when many requests time out together.

```ts
// In your client code: add a 1-3 s client-side timeout in addition to URLSession's own timeout
async function fetchWithTimeout(url: string, opts: RequestInit = {}, timeoutMs = 3000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...opts, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}
```

For network-heavy apps (image-heavy feeds, real-time chat), backport the PR's `WebViewAssetHandler.swift` change locally:

```swift
// ios/App/Capacitor/WebViewAssetHandler.swift (post-PR-#8546 patch)
// The PR adds explicit cancel forwarding from WKURLSchemeTask to URLSessionDataTask
func webView(_ webView: WKWebView, stop urlSchemeTask: WKURLSchemeTask) {
    // existing code...
    // PR #8546 addition:
    sessionTaskMap[urlSchemeTask]?.cancel()
    sessionTaskMap.removeValue(forKey: urlSchemeTask)
}
```

Track PR #8546 for merge; backport is necessary only for network-heavy apps that hit the connection pool exhaustion.

### WA-H5 -- iOS `prompt()` pauses media playback

`@capacitor/cookies` uses `prompt()` internally to read cookies from the WebView. iOS pauses `AVPlayer` playback when a `prompt()` is shown, even when the user has not authorized the underlying cookie operation. The fix is to read cookies at app launch, not during media playback.

```ts
// app root: read cookies once at launch, cache in @capacitor/preferences
import { App } from '@capacitor/app';
import { CapacitorCookies } from '@capacitor/cookies';
import { Preferences } from '@capacitor/preferences';

App.addListener('appStateChange', async ({ isActive }) => {
  if (isActive && Capacitor.getPlatform() === 'ios') {
    // Defer cookie reads to a future tick -- NEVER during active media playback
    setTimeout(async () => {
      const cookies = await CapacitorCookies.getCookies({ url: 'https://your-api.example.com' });
      await Preferences.set({ key: 'session_cookies', value: JSON.stringify(cookies) });
    }, 0);
  }
});
```

The cookie cache lives in `@capacitor/preferences` (`UserDefaults` on iOS, `SharedPreferences` on Android); re-read only when the cookie expires. Avoid calling `Cookies.getCookies()` while a `video` or `audio` element is playing.

Track issue #8539 for merge; the fix switches `@capacitor/cookies` from `prompt()` to `HTTPCookieStorage` and removes the side effect.

### WA-H6 -- Android 16 status-bar no-op

Capacitor v8 enforces edge-to-edge on Android 16 (API 36). `@capacitor/status-bar`'s `setOverlaysWebView` and `setBackgroundColor` options silently no-op; the WebView is forced edge-to-edge regardless of the configuration.

```ts
// Plan layout with env(safe-area-inset-*) padding; do not rely on
// overlaysWebView or backgroundColor for the Android 16+ case
import { Capacitor } from '@capacitor/core';
import { SystemBars } from '@capacitor/system-bars';
import { StatusBar, Style } from '@capacitor/status-bar';

const isAndroid16Plus =
  Capacitor.getPlatform() === 'android' &&
  parseInt(await Device.getInfo().then(i => i.osVersion)) >= 16;

if (isAndroid16Plus) {
  // Read insets via @capacitor/system-bars (new in v8)
  const insets = await SystemBars.getInsets();
  // Apply to your CSS variables
  document.documentElement.style.setProperty('--safe-area-top', `${insets.top}px`);
  document.documentElement.style.setProperty('--safe-area-bottom', `${insets.bottom}px`);
} else {
  // Older Android: the legacy path
  await StatusBar.setOverlaysWebView({ overlay: false });
  await StatusBar.setBackgroundColor({ color: '#0b0b0d' });
}
```

The CSS side uses `env(safe-area-inset-top)` etc. as the standard. See `06-native-like-delivery-checklist.md` Axis 1 for the meta-rule and `## Cross-file pointers` for the full pattern.

### WA-H7 -- Cordova `--platform` flag deprecated

`npx cap add web` and `npx cap add <platform> --platform=web` were removed in v8; the Web/PWA build is the no-platform Capacitor mode.

```bash
# v8 syntax: add the platforms explicitly
npx cap add ios
npx cap add android

# For PWA-only: ship the bundler's dist/ directory directly without adding native platforms
# (the PWA service worker registers on real browsers; the Capacitor WebView handles the JS bundle)
```

For a migration from Cordova, the equivalent v8 flow is:

```bash
# 1. Remove the old Cordova platform add commands
# (npx cap add web is removed; --platform=web is removed)

# 2. Add native platforms
npx cap add ios
npx cap add android

# 3. Migrate Cordova plugins
# npx cap migrate (reads config.xml preferences and writes them to capacitor.config.ts)
# npm uninstall cordova-plugin-<name> && npm install @capacitor/<replacement> && npx cap sync
```

The Cordova framework is bundled by default in v8; Capacitor 9 will remove it entirely. Plan the migration to `@capacitor/*` plugins now; do not start a fresh v8 app with `cordova-plugin-*` installs.

## How to file a Capacitor issue

When an issue is hard to diagnose and not in the HIGH/MEDIUM/LOW register above, file a new issue at `github.com/ionic-team/capacitor/issues/new`. The reproduction template below is the minimum viable format; the team triages in 1-3 days and responds within 1-2 weeks for community-maintained issues.

The Capacitor repo split: `@capacitor/core`, `@capacitor/cli`, `@capacitor/android`, `@capacitor/ios` are "core" (Ionic Team maintained); the 39 official `@capacitor/*` plugins (see `05-plugin-system-and-lifecycle.md` for the inventory) are split between "core" (`@capacitor/app`, `@capacitor/camera`, `@capacitor/filesystem`, etc.) and "community-maintained" (`@capacitor/push-notifications`, `@capacitor/local-notifications`, `@capacitor/haptics` -- in the `ionic-team/capacitor-plugins` monorepo but with the team-blessed `capacitorDependencies` shape). For community plugins, file at `github.com/ionic-team/capacitor-plugins/issues/new`; for `@capacitor-community/*` plugins, file at the plugin's own repo under the `capacitor-community/` org.

The reproduction template:

```markdown
## Reproduction
- Capacitor version (`@capacitor/core`): 8.5.0
- Platform(s) affected: iOS 18 / Android 14 / both / web
- Device: iPhone 15 / Pixel 8 / iPad Pro / etc.
- App ID + bundle ID + version

## Expected behavior
What should happen.

## Actual behavior
What actually happens, with logcat / Safari console output and screenshots.

## Reproduction steps
1. `npm install`
2. `npx cap sync`
3. `npx cap run ios --target=<id>` (or android)
4. Trigger: <action>

## Environment
- Node: 22.x
- npm: 10.x
- Xcode: 26.0 (for iOS issues)
- Android Studio: 2025.2.1 (for Android issues)
- `cap doctor` output (paste the full block)

## Capacitor config
```ts
// capacitor.config.ts (only the relevant fields)
```

## Plugin manifest
```json
// package.json dependencies (only the @capacitor/* plugins)
```

## Anything else?
Screenshots, logs, links to a minimal-repro repo.
```

Filing the issue with the template above cuts triage time from days to hours. Include `cap doctor` output -- it lists the dev environment in one block (Node, Xcode, CocoaPods, Android SDK, Java, Gradle, JDK) and saves the triage engineer 5-10 follow-up questions.

## Cross-file pointers

- **back to `05-plugin-system-and-lifecycle.md`** -- the Cordova compat shim (referenced by H7, M2, M4); `@capacitor/storage` deprecation (referenced by M3); `@capacitor/local-llm` experimental badge (referenced by L5).
- **back to `06-native-like-delivery-checklist.md`** -- Android 16 status-bar no-op pattern (referenced by H6 and Axis 2); safe-area patterns (referenced by WA-H6); the six-axis priority list.
- **back to `08-build-and-ship.md`** -- the CI/CD matrix (referenced by H1, H2, H3 workaround code paths); version bumps in lockstep (referenced by H1 / L1); OTA caveat (no first-party Capacitor story; referenced by `09-do-and-dont.md` row 20 and `11-system-prompt-for-llms.md` rule 2).
- **forward to `11-system-prompt-for-llms.md`** -- the LLM-facing rules that cite this file (especially rules 2, 6, 7, 11, 12).
- **forward to `12-self-questions-for-agents.md`** -- the per-phase self-question set; questions 14, 15, 16 surface the HIGH-risk register rows as runtime-phase prompts.

## Freshness

<!-- freshness: capacitor=8.5.0 access=2026-08-18 -->

- last_verified: 2026-08-18
- source_schema_versions: @capacitor/core@8.5.0, @capacitor/cli@~8.0.0, @capacitor/android@~8.0.0, @capacitor/ios@~8.0.0
- anchor_url: https://capacitorjs.com/docs
- issue_tracker_url: https://github.com/ionic-team/capacitor/issues
- v9_watch_only_issue: https://github.com/ionic-team/capacitor/issues/8560
- tar_v7_cli_issue: https://github.com/ionic-team/capacitor/issues/8573
- destroyed_webview_issue: https://github.com/ionic-team/capacitor/issues/8562
- url_session_task_pr: https://github.com/ionic-team/capacitor/pull/8546
- prompt_media_issue: https://github.com/ionic-team/capacitor/issues/8539

## References

- [A-S2] -- https://github.com/ionic-team/capacitor -- accessed 2026-08-18 (Capacitor repo root; 16,336 stars; last release 8.5.0 2026-07-31; v9.0.0-alpha.6 tagged on `next` dist-tag)
- [A-S7] -- https://capacitorjs.com/docs/android/setting-target-sdk -- accessed 2026-08-18 (Capacitor Android target SDK page; v8 requires targetSdk=36; `Capacitor Android does not support custom target SDK versions`; the H6 Android 16 context)
- [A-S8] -- https://capacitorjs.com/docs/updating/8-0 -- accessed 2026-08-18 (v7 to v8 upgrade guide; the L2 / M6 / L2 / L3 context; variables.gradle lockfile; AGP 8.13.0; Kotlin 2.2.20; `density` added to configChanges; `adjustMarginsForEdgeToEdge` removed in favor of `@capacitor/system-bars`)
- [A-S9] -- https://capacitorjs.com/docs/updating/8-5 -- accessed 2026-08-18 (UIScene lifecycle adoption; SceneDelegate.swift + UIApplicationSceneManifest + SceneDelegateProxy; the L4 context)
- [A-S10] -- https://capacitorjs.com/docs/v8/cli -- accessed 2026-08-18 (CLI command list: add, build, copy, doctor, init, ls, migrate, open, run, sync, update; the H7 `cap add web` removal context)
- [A-S11] -- https://capacitorjs.com/docs/web -- accessed 2026-08-18 (Capacitor Web/PWA: builds ES2017; script-include option removed; PWA is the no-platform Capacitor mode; the M5 / WA-H7 context)
- [A-S15] -- https://registry.npmjs.org/{package-name} -- accessed 2026-08-18 (npm plugin versions on the 8.x line; `@capacitor/storage` 1.2.5 [legacy / deprecated]; `@capacitor/local-llm` 8.0.0-beta [experimental]; the M3 / L5 context)
- [A-S17] -- https://capacitorjs.com/docs/guides/live-reload -- accessed 2026-08-18 (live reload; server.url + server.cleartext; the H1 / H2 cross-reference)
- [A-S18] -- https://capacitorjs.com/docs/v8/plugins/creating-plugins -- accessed 2026-08-18 (plugin generator `npm init @capacitor/plugin@latest`; the cordova-plugin- replacement path referenced by M4)
- [A-S19] -- https://capacitorjs.com/docs/cordova -- accessed 2026-08-18 (Cordova migration guide; the M4 / H7 context)
- [A-S20] -- https://github.com/ionic-team/capacitor/issues/8560 -- accessed 2026-08-18 (9.0.0-alpha.6 broken iOS framework; the H1 evidence)
- [A-S21] -- https://github.com/ionic-team/capacitor/issues/8573 -- accessed 2026-08-18 (CLI 6.x/7.x broken by tar@^7.5.19; the H2 evidence; repro repo `simionabobai/capacitor-tar-override-bug`)
- [A-S22] -- https://github.com/ionic-team/capacitor/issues/8562 -- accessed 2026-08-18 (Android eval() on destroyed WebView; the H3 evidence; filed 2026-08-11 by `rekinet` on Android 14 ASUS AI2201)
- [A-S23] -- https://github.com/ionic-team/capacitor/pull/8546 -- accessed 2026-08-18 (iOS WKURLSchemeTask cancellation PR; the H4 evidence; PR by `lazerwalker` filed 2026-08-01; includes test)
- [A-S24] -- https://github.com/ionic-team/capacitor/issues/8539 -- accessed 2026-08-18 (iOS prompt() pauses media playback; the H5 evidence; filed 2026-07-23 by `richard-jfc`)
- [A-S26] -- https://capacitorjs.com/docs/cordova/migration-strategy -- accessed 2026-08-18 (Cordova migration strategy; the M4 / H7 long-form context)
- [A-S28] -- https://capacitorjs.com/docs/v8/config -- accessed 2026-08-18 (CapacitorConfig schema; per-platform ios / android blocks; the H1 / H3 / L2 cross-reference)
- [A-S31] -- https://capacitorjs.com/docs/ios/configuration -- accessed 2026-08-18 (iOS configuration; the L1 `appendUserAgent` workaround; the Privacy Manifest context)
- [B-S7] -- https://capacitorjs.com/docs/getting-started -- accessed 2026-08-18 (install flow; `npx cap init` auto-detects `webDir`; the M1 / M5 cross-reference; the `; wv)` UA tell for Android WebView service-worker gating)
- [B-S10] -- https://capacitorjs.com/docs/cordova -- accessed 2026-08-18 (Cordova compatibility shim; `@ionic/cordova-plugins`; the M2 / M4 context)
- [C-S22] -- https://capacitorjs.com/docs/v8/basics/using-plugins -- accessed 2026-08-18 (community plugin anti-patterns; the L5 cross-reference for `@capacitor/local-llm` Labs tier)