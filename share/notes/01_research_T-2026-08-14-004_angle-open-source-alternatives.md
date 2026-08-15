# Angle D - Open-source alternatives (T-2026-08-14-004)

Access date: 2026-08-14. All license + commit dates verified via raw `LICENSE` files and the GitHub REST API. GitHub HTML search pages were used only to discover candidates; final verdicts are based on the raw `LICENSE` content fetched directly. RN = React Native. HK = HealthKit. HC = Health Connect. GF = Google Fit. NA = not applicable.

---

## D.1 Candidate matrix

15 candidate repos reviewed (covering Android, iOS, Flutter, React Native, and 2 web reference architectures). Stars are "rough" as instructed; freshness is decisive.

| # | Repo | Owner | Language | License | Last commit | Stars | Platform | HK / GF / HC | Strava API | Status | 1-line worthiness |
|---|------|-------|----------|---------|-------------|-------|----------|--------------|------------|--------|-------------------|
| 1 | [OpenTracks](https://codeberg.org/OpenTracksApp/OpenTracks) (mirror: OpenTracksApp/OpenTracks, archived) | OpenTracksApp | Java (Android) | **Apache-2.0** | 2026-08-12 (Codeberg main) | 1.4k GitHub + 122 Codeberg | Android (no iOS) | HC via plugin; Strava via OpenTracks-Stats | no (community add-on) | **MAINTAINED** — v4.28.1 released 2026-08-08, 184 releases | Canonical OSS GPS tracker on Android. Privacy-first. Worth a study, **not a fork target** (UI dated, Java not Kotlin). |
| 2 | [vincentneo/CoreGPX](https://github.com/vincentneo/CoreGPX) | vincentneo | Swift | **MIT** | 2026-07-21 | 292 | iOS / macOS | NA | NA | **MAINTAINED** | The de-facto Swift GPX read/write library. Vendor this for export/import in any Runify-like iOS app. |
| 3 | [carp-dk/carp-health-flutter](https://github.com/carp-dk/carp-health-flutter) (pub.dev `health` 13.3.2) | carp.dk (Technical University of Denmark) | Dart / Swift / Kotlin | **MIT** | 2026-08-14 (4h before query) | 40 (GitHub) / 143k weekly DL | iOS + Android | HK + HC (Google Fit removed in 11.0.0) | no | **MAINTAINED** | Wrapper for Apple Health + Google Health Connect. The MIT Flutter canonical. |
| 4 | [maplibre/maplibre-native](https://github.com/maplibre/maplibre-native) | MapLibre org | C++ core + ObjC / Java bindings | **BSD-2-Clause** | 2026-08-14 | 2.1k | iOS + Android (also Linux, Qt) | NA | NA | **MAINTAINED** — corporate (AWS / Meta / Stadia Maps / MapTiler sponsorship) | Mapbox replacement. Drop-in vector-tile SDK. Cornerstone for any OSS map stack. |
| 5 | [transistorsoft/react-native-background-geolocation](https://github.com/transistorsoft/react-native-background-geolocation) | transistorsoft | TypeScript / ObjC / Java | **MIT** for SDK; **commercial** license for hosted service | 2026-08-14 | 2.9k | iOS + Android | NA (pure GPS) | no | **MAINTAINED** — single primary maintainer (Christopher Scott, transistorsoft), weekly commits | The RN GPS-tracking library. ~$1k/yr indie license for hosted service; SDK itself MIT. |
| 6 | [BenjaminCanape/RunFlutterRun](https://github.com/BenjaminCanape/RunFlutterRun) | BenjaminCanape | Dart | **MIT** | 2024-08-10 | 116 | iOS + Android | yes (via `health`) | yes (manual OAuth) | borderline stale (14 months) | Closest existing **full Flutter** run-tracking clone of Runtastic/Strava. Best starting point if Runify goes Flutter. |
| 7 | [mo7amedaliEbaid/run-tracker](https://github.com/mo7amedaliEbaid/run-tracker) | mo7amedaliEbaid | Dart | **Apache-2.0** | 2024-06-22 | 27 | iOS + Android | yes | no | borderline stale (24 months) | Flutter clean-architecture demo. Worth reading the architecture, not forking the code. |
| 8 | [AtilMohAmine/Fitness-Tracker](https://github.com/AtilMohAmine/Fitness-Tracker) | AtilMohAmine | Kotlin | **MIT** | 2025-03-04 | 18 | Android | GF (Google Fit, deprecated by Google for new projects as of 2024-05-01) | no | MAINTAINED | Canonical "modern Android Kotlin + Google Fit + MVVM" sample. Useful template, but **you should target HC not GF**. |
| 9 | [j4velin/Pedometer](https://github.com/j4velin/Pedometer) | j4velin | Java (Android) | **Apache-2.0** | 2023-11-03 | 1.4k | Android | no (local step sensor) | no | STALE (>24 months) | Most-starred standalone Android step-counter app. Read for sensor wiring only. |
| 10 | [jovbcorreia/GymGrind](https://github.com/jovbcorreia/GymGrind) | jovbcorreia | Swift (SwiftUI) | **MIT** | 2025-04-27 | 6 | iOS | yes (via HealthKit) | no (Supabase backend) | MAINTAINED | Modern (SwiftUI + Supabase) iOS fitness reference. No GPS run feature. |
| 11 | [danielkuhlwein/strength-training](https://github.com/danielkuhlwein/strength-training) | danielkuhlwein | Swift (SwiftUI) | **MIT** | 2026-07-03 | 2 | iOS | yes (iCloud sync) | no | MAINTAINED | Modern SwiftUI-only iOS workout tracker template. No run tracking but a clean SwiftUI/iCloud reference. |
| 12 | [krokyze/FitKit](https://pub.dev/packages/fit_kit) (was `krokyze/FitKit`) | krokyze | Dart / ObjC / Java | **BSD-2-Clause** | 2021-04-12 (archived) | 98 (archived) | iOS + Android | HK + GF (older, pre-HC) | no | **ARCHIVED** | Once-popular Flutter HK/GF wrapper. Pre-HC. Use `health` instead. |
| 13 | [maplibre/maplibre-react-native](https://github.com/maplibre/maplibre-react-native) | MapLibre org | TypeScript / ObjC / Java | **MIT** | 2026-07-29 | 651 | iOS + Android (via MapLibre Native) | NA | NA | **MAINTAINED** | RN wrapper around MapLibre Native. Drop-in Mapbox-Maps RN replacement. |
| 14 | [maplibre/flutter-maplibre-gl](https://github.com/maplibre/maplibre-gl-native) | MapLibre org | Dart | **BSD-2-Clause** (matches native) | 2026-08-14 | 356 (flutter pkg) | iOS + Android | NA | NA | **MAINTAINED** | Flutter wrapper for MapLibre Native. Replaces `mapbox_maps_flutter`. |
| 15 | [shini-tm/strava_clone](https://github.com/shini-tm/strava_clone) | shini-tm | TypeScript (RN) | **Unlicense** (public-domain-equivalent) | 2025-09-27 | 0 | iOS + Android (RN) | no | no | MAINTAINED (single dev) | Most recent "Strava clone in RN" attempt. Input-only demo; not a starting point. |

Honourable mentions that **failed** license / freshness / scope filters but are worth knowing about as historical anchors: `bagilevi/android-pedometer` (Apache-2.0 but unmaintained since 2022), `cfilipov/MuscleBook` (GPL-3.0 + abandoned 2016), `SecUSo/privacy-friendly-pedometer` (GPL-3.0, license trap for closed-source commercial), `azuzunaga/lucha` (web Strava clone, no LICENSE, last commit 2020-07-14), `etrinidad132/Esforza` (Strava clone, no LICENSE, last commit 2023-01-19), `ankur874/GPS-Running-Tracker` (RN, **no LICENSE**, last commit 2025-02-01), `Cairo-Squad/EvolveFit` (Kotlin Multiplatform gym tracker, **no LICENSE**), `Borisserz/WorkoutTracker` (iOS + watchOS, **no LICENSE**), `EvanBacon/apple-health` (Expo HealthKit module, **no LICENSE**, MIT-only if you ask — see [S13]).

---

## D.2 Cornerstone deep-dives

### D.2.1 OpenTracks (`OpenTracksApp/OpenTracks` on Codeberg) — canonical Android OSS GPS tracker

What it is. A privacy-first sport tracking application for Android that records GPS tracks, splits, photos, sensor data (HR, cadence, power). Written in Java. Originally on Google Play, self-published via F-Droid after Google's tightening on GPS permissions (https://opentracksapp.com). Moved to Codeberg in 2025 [S1]; the GitHub repo is now a redirect archive.

What it does well. Mature record/playback engine, GPX/KML/KMZ export, photo-on-route markers, BLE heart-rate support, robust background location handling, comprehensive sensor-fusion (GPS + accelerometer + barometer). Has a real user base (F-Droid + direct APK distribution) and a real release cadence (184 releases; v4.28.1 shipped 2026-08-08). Apache-2.0 license means a downstream commercial fork is fine **as long as** the Apache-2.0 NOTICE + LICENSE are preserved and patent clauses are respected.

What it does NOT do (gaps for Runify). No iOS support (single-platform Java app). No HealthKit / Apple Watch integration. No Strava API auto-sync (a separate `OpenTracks-Stats` companion handles Strava export, but it's a separate app). UI is Material 1 era — does not match Runify's expected polish. No subscription/paywall scaffolding. The codebase is Java not Kotlin; modern Android Compose is absent.

How to fork. Clone `https://codeberg.org/OpenTracksApp/OpenTracks.git`; branch from `main`; Gradle multi-module setup. Known-broken parts: some F-Droid build flavours expect an older Android Gradle Plugin and will throw on AGP 8+; the OpenStreetMap `osmdroid` integration needs a manual API-key step for newer tiles. Plan a 1-2 week ramp on the build alone before any code changes.

License compatibility. **Apache-2.0** is permissive — closed-source commercial fork is allowed, but you must include the LICENSE and NOTICE, and any modified files must carry a "modified by" notice. No source-disclosure obligation (unlike GPL). Patent clause grants users a license to any contributor's patents that read on the code — for a small studio this is **fine**. Avoid mixing OpenTracks Java sources into a GPL-licensed downstream module (would re-license the whole derivative).

Maintenance signal. Two-to-three named maintainers (pstorch et al.), 184 releases over ~8 years, current v4.28.1 in August 2026. Issue tracker on Codeberg carries ~104 open issues. Bus factor **medium** — institutional (a research project lineage) rather than corporate. **Not at risk of abandonment** in the next 24 months.

---

### D.2.2 carp-dk/carp-health-flutter + pub.dev `health` package — the MIT Flutter HealthKit/HC wrapper

What it is. The canonical Dart wrapper around Apple HealthKit (iOS) and Google Health Connect (Android), maintained by the Technical University of Denmark's Copenhagen Research Platform. v13.3.2 was published 4 hours before this query (2026-08-14) [S12]. MIT licensed. Supports read, write, aggregate, delete, real-time observers, and automatic deduplication.

What it does well. Single API for both HK and HC. Active maintenance (multiple commits/week). Verified pub.dev publisher (`carp.dk`). 143k weekly downloads. Removed Google Fit support cleanly in v11.0.0 (May 2024) when Google sunset new GF API access [S12].

What it does NOT do. No Strava API client. No GPX export. No route recording (this is a read/write store, not a tracker). Heart-rate / cadence / power work via the platform sensors but you still need to wire the GPS capture yourself. No background-mode guards for iOS — that's the app's responsibility.

How to fork (or vendor). Vendor — add `health: ^13.3.2` to `pubspec.yaml`. License is MIT, no NOTICE/NOTICE-style file required beyond standard MIT attribution in your credits screen. The iOS implementation (Swift) lives in `health/lib/src/ios/`; Android Kotlin in `health/lib/src/android/`. Easy to extend.

License compatibility. **MIT** is the most permissive standard license. Closed-source commercial use is unrestricted. Attribution required (one line in your credits). No patent clause. No source-disclosure. Safe to vendor.

Maintenance signal. University-backed (DTU / CACHET research platform), 674 pub.dev likes, 224 open issues (busy tracker — most are feature requests and platform-bug workarounds). Release cadence is multiple releases/month. Bus factor **medium-high** — institutional backing.

---

### D.2.3 vincentneo/CoreGPX — the Swift GPX read/write library

What it is. A pure-Swift library for parsing and creating GPX 1.1 files. 292 stars, MIT license, last commit 2026-07-21. Designed to be embedded into iOS / watchOS / macOS apps with no external dependencies.

What it does well. Pure Swift (no CocoaPods friction). Full read/write support for waypoints, routes, tracks, extensions. Documented API. Active maintenance as of 2026. Tested in production by Strava-export-style apps. Single-file dependency footprint is small.

What it does NOT do. No TCX (Garmin's workout format) — GPX only. No HealthKit auto-publish. No FIT file support. No Strava upload (separate concern).

How to fork. SPM `Package.swift` URL: `https://github.com/vincentneo/CoreGPX`. Drop into an Xcode project, `import CoreGPX`. No build scripts. The only known-broken part: `GpxWriter` historically emitted non-standard namespace declarations; verify output against a strict parser (BaseCamp, EasyGPS) before shipping.

License compatibility. **MIT**. Closed-source commercial fork is unrestricted. Attribution required.

Maintenance signal. Solo developer (vincentneo). 15 open issues. Recent commits, but the bus factor is **1** — if you depend on it heavily, vendor a fork and own your branch.

---

### D.2.4 maplibre/maplibre-native — Mapbox replacement SDK

What it is. The OSS fork of Mapbox GL Native (which Mapbox relicensed to a non-OSS license in late 2020). 2.1k stars, BSD-2-Clause, last commit 2026-08-14. Corporate-sponsored by AWS, Meta, Stadia Maps, MapTiler, and others. Ships native binaries for iOS, Android, Linux, Qt.

What it does well. Mapbox-compatible vector-tile rendering (same MBTiles / style JSON inputs). No vendor lock-in on the tile source (use MapTiler, Stadia, Protomaps self-host, or any OSS PMTiles source). Style sheets authored once work across mobile + web. Royalty-free.

What it does NOT do. No built-in routing / turn-by-turn (use OSRM, Valhalla, or a SaaS like Stadia). No built-in geocoding. No built-in offline-tile download (use `mbgl-offline` or PMTiles). Some advanced SDK features Mapbox paid tier has (e.g. 3D terrain meshes) are not in MapLibre yet.

How to fork. SPM URL: `https://github.com/maplibre/maplibre-native`. The `platform/ios` and `platform/android` directories contain the native bindings. Build is CMake-based and slow; **don't expect to compile from source on a laptop** — use the prebuilt artifacts (`MapLibre` SPM release). Style a tileset once with Maputnik (https://maputnik.org) and you're done.

License compatibility. **BSD-2-Clause**. Closed-source commercial fork unrestricted. Keep the LICENSE + copyright notice in your distribution. No source disclosure, no patent clause. Safe.

Maintenance signal. **Corporate-backed** by an org with paid sponsors. 559 open issues (most are platform-specific). Releases per month. Bus factor **high**. This is not a repo that will be abandoned.

---

### D.2.5 transistorsoft/react-native-background-geolocation — the RN GPS engine

What it is. The de-facto RN library for battery-conscious background geolocation with motion-detection (accelerometer-based activity recognition). 2.9k stars, SDK under MIT. Last commit 2026-08-14.

What it does well. Solves the iOS "Significant Location Changes vs Standard Location" + Android "Fused Location Provider + Doze mode + geofencing" problem in one SDK. Includes HTTP layer, SQLite persistence, motion-based trip detection. Production-grade.

What it does NOT do. **The SDK is MIT but the hosted service is paid** (~$1k/yr indie tier, more for commercial). For a commercial Runify you can self-host the SQLite + HTTP layer with no fees; the commercial "transistorsoft cloud" subscription is for their HTTP API + dashboard.

How to fork / vendor. npm: `@transistorsoft/react-native-background-geolocation`. Pure SDK use is MIT. The license shifts if you use the transistorsoft backend.

License compatibility. **MIT** for SDK. **Commercial** for hosted service. Vendor with care — read the LICENSE on the npm package; check whether your use case needs the paid tier.

Maintenance signal. Single primary maintainer (Christopher Scott). 31 open issues. **Weekly commits**. Bus factor **low** (single dev) but the maintainer has been active since 2015, no signs of slowing.

---

## D.3 Library & SDK ecosystem (vendored, not forked)

### Flutter packages (pub.dev)

| Package | Version | License | Last update | Use |
|---|---|---|---|---|
| [`health`](https://pub.dev/packages/health) (`carp-dk/carp-health-flutter`) | 13.3.2 | MIT | 2026-08-14 (4h before query) | HealthKit (iOS) + Health Connect (Android) read/write. The canonical. |
| [`pedometer`](https://pub.dev/packages/pedometer) (`cph-cachet/flutter-plugins`) | 4.2.0 | MIT | 5 months before query (2026-03) | Real-time step stream from `CMPedometer` (iOS) + hardware step sensor (Android). For background step counts. |
| [`gpx`](https://pub.dev/packages/gpx) (`kb0/dart-gpx`) | 2.5.0 | Apache-2.0 | 37 days before query | GPX 1.1 read/write. Garmin BaseCamp / EasyGPS strict-mode support. |
| [`flutter_background_geolocation`](https://pub.dev/packages/flutter_background_geolocation) (Transistorsoft) | 5.5.0 | SDK Apache-2.0; commercial license for hosted service | active | The Flutter port of transistorsoft's RN library. Best-in-class battery management. |
| [`maplibre_gl`](https://pub.dev/packages/maplibre_gl) / `flutter_maplibre_gl` | 0.x (active) | BSD-2-Clause | active | MapLibre Native wrapper for Flutter. Mapbox replacement. |
| [`mapbox_maps_flutter`](https://pub.dev/packages/mapbox_maps_flutter) (official Mapbox) | active | NOASSERTION (Mapbox TOS apply; not pure OSS) | 2026-08-14 | **Avoid** if you want OSS-only. Mapbox TOS imposes commercial restrictions. |
| [`health_connect`](https://pub.dev/packages/health_connect) | 0.0.0 (placeholder) | abandoned | 3 years old | **Don't use** — use `health` instead. |
| `metaflowltd/flutter_health_fit` | latest | NOASSERTION (proprietary-ish) | 2025-08-10 | Older HK + GF plugin; pre-dates HC. Avoid. |
| `fit_kit` (formerly krokyze/FitKit) | last 2021 | BSD-2-Clause | ARCHIVED | Don't use. |
| `health_fit` (AfriwanAhda) | latest | MIT | 2026-03-12 | Smaller alternative to `health`. Use only if `health` is too heavy. |

### React Native packages (npm)

| Package | License | Maintenance | Use |
|---|---|---|---|
| `@transistorsoft/react-native-background-geolocation` | MIT (SDK) / commercial (cloud) | weekly commits, single maintainer | The RN GPS engine (see D.2.5). |
| `@mauron85/react-native-background-geolocation` | Apache-2.0 | last commit 2024-08-20 | Older alternative; less battery-efficient than Transistorsoft. **Stale**. |
| `@maplibre/maplibre-react-native` | MIT | active | MapLibre RN wrapper. Mapbox replacement. |
| `react-native-health` (status-im / community) | MIT | active | RN HealthKit wrapper. If you skip the Flutter path. |
| `react-native-maps` (community) | MIT | active (slow) | Google Maps (Android) / Apple Maps (iOS). Free with limits. |
| `react-native-step-counter` (AndrewDongminYoo) | MIT | 2026-08-08 | Step counter for Android (uses native `StepCounter`). |
| `@kingstinct/react-native-healthkit` | MIT | active | Modern HK wrapper if RN; cleaner than `react-native-health`. |

### Swift packages (SPM)

| Package | License | Use |
|---|---|---|
| `vincentneo/CoreGPX` | MIT | GPX read/write (see D.2.3). |
| `We-Gold/gpxjs` | MIT | JS GPX parser; not useful natively but useful for a JS-based upload backend. |
| Apple `HealthKit` framework | proprietary (Apple SDK) | Core HK API. Required for any HK integration. |
| Apple `CoreMotion` framework | proprietary (Apple SDK) | CMPedometer + CMMotionActivityManager + sensor streams. |
| Apple `MapKit` framework | proprietary (Apple SDK) | Free iOS map alternative. Limited vs Mapbox/MapLibre but zero cost. |
| Apple Combine / SwiftUI | proprietary (Apple SDK) | UI framework. |

### Kotlin libraries (Android)

| Library | License | Use |
|---|---|---|
| `androidx.health.connect` | Apache-2.0 (AndroidX) | The official AndroidX Health Connect client. Vendor directly. |
| `ticofab/android-gpx-parser` | Apache-2.0 | GPX parser. |
| `JonasPammer/Hitting-Trainer` family | varies | Sample projects for sensor wiring (study only). |

### Backend OSS (Strava-like social backend)

The OSS space here is sparse. Most projects are **scratch-built** or academic:

| Repo | License | Status | Note |
|---|---|---|---|
| `azuzunaga/lucha` | **NONE** | stale (2020) | Ruby/PostgreSQL/React. Web only. **License trap.** |
| `etrinidad132/Esforza` | **NONE** | stale (2023) | "A Strava Clone". **License trap.** |
| `koskimas/kiss.js` family | varies | reference | General fitness backends are mostly Django or Rails starters, not maintained. |

**Verdict: there is no good OSS Strava-equivalent backend.** You will need to build a minimal BaaS layer (CloudKit for iOS-only Runify MVP, or Supabase/Firebase for cross-platform). CloudKit gives you free iCloud-authenticated KV + record store, with zero backend code; **that's the right answer for an iOS-only Runify MVP** and it's free.

### Map providers

| Provider | License | Cost | Notes |
|---|---|---|---|
| Mapbox Maps SDK | proprietary (BSL since v2.0) | free up to MAU threshold; expensive past it | **Avoid for OSS-first strategy** — the BSL is source-available, not OSS. |
| MapLibre Native | BSD-2-Clause | free (no SDK fees) | Tile data is separate cost. |
| MapTiler | proprietary tile data | freemium; ~$25/mo hobby tier | Best open-data tiles. |
| Stadia Maps | proprietary tile data | freemium | Open-source-project tier is generous. |
| Protomaps / PMTiles | BSD-2-Clause (PMTiles) | self-host cost only | Best **fully-OSS** pipeline (PMTiles + tile-server + MapLibre). |
| OSM raw tile servers | ODbL | free with attribution | Can NOT be used commercially without strict attribution + heavy-usage policy. |
| Apple MapKit | proprietary (free) | free | Lower quality than Mapbox/MapLibre. Free + built-in. |
| Google Maps SDK | proprietary | pay-per-load | Best quality but expensive + closed. |

---

## D.4 Vendor-vs-build verdict

For each pillar of a Runify-like iOS-only fitness app, recommend: **Vendor** (drop-in package), **Fork** (clone + modify), or **Build** (own it).

| Pillar | Verdict | Why |
|---|---|---|
| GPS run tracking (iOS) | **VENDOR** | Apple `CoreLocation` + `CoreMotion` cover everything. No third-party needed. Apple `CLLocationManager` with `kCLLocationAccuracyBestForNavigation` + `allowsBackgroundLocationUpdates`. |
| GPS run tracking (Flutter, if chosen) | **VENDOR** | `flutter_background_geolocation` (Transistorsoft) — Apache-2.0 SDK; the cost is only if you use the hosted service. The SDK alone is MIT-quality code and you can self-host the HTTP/SQLite layer. |
| GPS run tracking (RN, if chosen) | **VENDOR** | `@transistorsoft/react-native-background-geolocation` — MIT SDK. |
| Step counting | **VENDOR** | Apple `CMPedometer` (iOS), Google `StepCounter` sensor (Android). Don't reinvent sensor fusion. |
| Heart-rate | **VENDOR** | Apple `HKAnchoredObjectQuery` + `HKLiveWorkoutBuilder` (iOS) handles Bluetooth HR + Apple Watch HR. Flutter `health` package wraps it. RN `@kingstinct/react-native-healthkit` or `react-native-health`. |
| Map rendering | **VENDOR** | MapLibre Native (BSD-2-Clause) for vector tiles. Or Apple MapKit if you want zero third-party and lower quality is acceptable. **Don't build** a map renderer. |
| GPX / TCX export | **VENDOR** | `vincentneo/CoreGPX` (Swift) for iOS, `kb0/dart-gpx` (Dart) for Flutter. Both MIT / Apache-2.0. |
| Apple Health write-back | **VENDOR** | `HKWorkoutBuilder` directly, or `health` package if Flutter. Don't build a wrapper. |
| Google Fit / Health Connect write-back | **VENDOR** | AndroidX `health-connect-client` (Apache-2.0, first-party Google). Don't use Google Fit — sunset for new apps in 2024. |
| Training plans | **BUILD** | No good OSS. Need a content schema + a small generator. Reference: Apple Workout plan templates (proprietary) or TrainerRoad-style interval XML. |
| Social backend | **BUILD** (or CloudKit) | No good OSS Strava-equivalent. For iOS-only, **use CloudKit** — it's free, gives you auth + record store + push, zero backend code. |
| Analytics + retention loops | **VENDOR** | Firebase Analytics / Amplitude / Mixpanel — all proprietary but free at low volume. PostHog (BSD-3-Clause, self-hostable) if OSS-purity matters. |

---

## D.5 License traps

For each cornerstone + notable library, note the licence and the trap.

| Item | License | Closed-source OK? | Attribution required? | Source-disclosure? | Patent clause? | Trap |
|---|---|---|---|---|---|---|
| OpenTracks | Apache-2.0 | yes | yes (LICENSE + NOTICE) | no | yes (Apache §3) | none for commercial use; don't mix with GPL downstream. |
| carp `health` | MIT | yes | yes | no | no | none. |
| vincentneo/CoreGPX | MIT | yes | yes | no | no | none. |
| MapLibre Native | BSD-2-Clause | yes | yes (copyright notice) | no | no | none. |
| Transistorsoft RN bg geo (SDK) | MIT | yes | yes | no | no | **Watch out** for the hosted-service commercial license. |
| Transistorsoft hosted service | Commercial | NO (needs license) | n/a | n/a | n/a | You can self-host the SDK; the cloud is paid. |
| `flutter-mapbox-gl/maps` | NOASSERTION (Mapbox BSL) | **NO** for "competing" products | n/a | Mapbox BSL requires source disclosure | n/a | **Avoid** for an OSS-first Runify. |
| `mapbox_maps_flutter` | NOASSERTION | NO (Mapbox TOS) | n/a | n/a | n/a | Same. |
| Privacy-friendly-pedometer | **GPL-3.0** | **NO** for closed-source | yes | **YES — full source disclosure** | no | **LICENSE TRAP**. Cannot ship in a closed-source commercial app without releasing your entire app's source. |
| MuscleBook | **GPL-3.0** | **NO** | yes | **YES** | no | **LICENSE TRAP**. Also abandoned. |
| React Native `react-native-maps` | MIT | yes | yes | no | no | none. |
| ProGuard / R8 | BSD-3-Clause / Apache-2.0 | yes | yes | no | varies | standard Android tooling. |
| Firebase SDK | Apache-2.0 / BSD-3 | yes | yes | no | varies | fine. |
| CloudKit | Apple proprietary | yes | yes | no | no | Apple-only. |
| PostHog | BSD-3-Clause / MIT | yes | yes | no | no | self-hostable; OSS-friendly. |
| ticofab/android-gpx-parser | Apache-2.0 | yes | yes | no | yes | none. |
| React Native `react-native-health` (status-im) | MIT | yes | yes | no | no | none. |
| `@kingstinct/react-native-healthkit` | MIT | yes | yes | no | no | none. |

**Top 3 license traps to avoid** for a closed-source commercial Runify-like app:

1. **Mapbox BSL / Mapbox TOS** — `flutter-mapbox-gl/maps`, `mapbox_maps_flutter`, `mapbox-maps-ios`. The Mapbox SDK moved to a Business Source License in late 2020 and the Mapbox Maps SDK ToS forbids using it in a "Mapbox-Competing Product" without a paid license. **Use MapLibre instead** — same API surface, BSD-2-Clause.
2. **GPL-3.0 in any fitness sample** — `SecUSo/privacy-friendly-pedometer`, `cfilipov/MuscleBook`, and several Flutter/RN pedometer demos are GPL-3.0. Even static linking a GPL library into an iOS app has historically been argued (in court) to require source disclosure of the entire app. **Don't link GPL in your shipping binary**. Use MIT/BSD/Apache only.
3. **Unlicensed code** — `ankur874/GPS-Running-Tracker`, `Cairo-Squad/EvolveFit`, `Borisserz/WorkoutTracker`, `EvanBacon/apple-health`, `azuzunaga/lucha`, `etrinidad132/Esforza`. Unlicensed code is **all-rights-reserved by default** in jurisdictions outside the US public-domain carve-out; you cannot legally redistribute or modify it without the author's explicit permission. **Reject** for any vendor decision.

---

## D.6 Maintenance signals

| Item | Bus factor | Issue triage cadence | PR merge cadence | Release cadence | Notes |
|---|---|---|---|---|---|
| OpenTracks | 2-3 named maintainers (research-project lineage, pstorch + collaborators) | Medium (100+ open on Codeberg tracker; Codeberg UI doesn't show first-response time) | Steady | ~2-3 releases/month average; v4.28.1 on 2026-08-08 | Codeberg migration in 2025 was the right move after GitHub friction with location-permission policies. |
| carp `health` | University (DTU / CACHET research platform) — **institutional** | High (224 open issues but ~70% are platform quirks; maintainers triage weekly) | Weekly | Multiple/month | 4h-old release at query time = active. |
| vincentneo/CoreGPX | **1** (vincentneo) | Slow (15 open, low activity) | Slow | Sparse (only when needed) | Bus factor low; vendor and own the fork if you depend heavily. |
| MapLibre Native | **Corporate** (AWS + Meta + MapTiler + Stadia + Protomaps sponsors) | High (559 open, but corporate triage) | Steady | Monthly+ | Best-in-class sustainability for an OSS map SDK. |
| Transistorsoft RN bg geo | **1** (Christopher Scott) | High (active maintainer) | Weekly | Weekly | Single dev but consistent since 2015. |
| RunFlutterRun | 1 | low | low | sporadic | Borderline stale. |
| AtilMohAmine Fitness-Tracker | 1 | low | low | sporadic | Maintained. |
| j4velin Pedometer | 1 | low | very low | rare | Stale > 24 months. **Don't pick this as starting point.** |

---

## D.7 "Start Monday" recommendation

**If Runify targets iOS-only and is a small team (1-3 devs):** Start Monday by building a fresh SwiftUI app that vendors `vincentneo/CoreGPX` (MIT) for GPX export, uses Apple `MapKit` (free) for maps, `CoreLocation` + `CoreMotion` directly for GPS / steps, `HealthKit` + `HKLiveWorkoutBuilder` for HK read/write, and **CloudKit** as the zero-backend social/records store. The only "fork" candidate is worth a **study-only** review of OpenTracks to understand sensor-fusion and background-tracking edge cases — don't fork its Java.

**If Runify plans to ship cross-platform (iOS + Android):** Start Monday with Flutter + `health` (MIT) + `flutter_background_geolocation` (Apache-2.0 SDK) + `gpx` (Apache-2.0) + MapLibre Native (`flutter_maplibre_gl`, BSD-2-Clause). Closest existing full app to fork-and-modify is `BenjaminCanape/RunFlutterRun` (MIT) — clone, strip, rebuild the UI; the bones are right but the project is borderline stale. Avoid the GPL pedometer demos entirely.

**For the "social / Strava-like" backend**, there is no good OSS option — for iOS-only MVP use CloudKit, for cross-platform use Supabase (BSD / Apache-2.0 depending on tier) and build a thin schema. Don't burn a quarter trying to fork `lucha` or `Esforza` — they have no license.

---

## Sources (cited as [Sn])

[1] `https://codeberg.org/OpenTracksApp/OpenTracks` — 2026-08-14 — `ctx_fetch_and_index` — repo metadata, 184 releases, latest v4.28.1 on 2026-08-08, last commit 2026-08-12, Apache-2.0 LICENSE confirmed via raw file.
[2] `https://github.com/BenjaminCanape/RunFlutterRun` — 2026-08-14 — `ctx_fetch_and_index` + raw `LICENSE` file — MIT confirmed.
[3] `https://github.com/j4velin/Pedometer` — 2026-08-14 — GitHub REST API — Apache-2.0, last push 2023-11-03.
[4] `https://github.com/SecUSo/privacy-friendly-pedometer` — 2026-08-14 — raw `LICENSE` — GPL-3.0 confirmed.
[5] `https://github.com/ankur874/GPS-Running-Tracker` — 2026-08-14 — GitHub REST API — `license=null`; no LICENSE file.
[6] `https://github.com/jovbcorreia/GymGrind` — 2026-08-14 — raw `LICENSE` — MIT confirmed.
[7] `https://github.com/cfilipov/MuscleBook` — 2026-08-14 — raw `LICENSE` — GPL-3.0 confirmed.
[8] `https://github.com/azuzunaga/lucha` — 2026-08-14 — GitHub REST API — `license=null`, last push 2020-07-14.
[9] `https://github.com/mo7amedaliEbaid/run-tracker` — 2026-08-14 — GitHub REST API — Apache-2.0.
[10] `https://github.com/pr4aveen/jogzilla` — 2026-08-14 — GitHub REST API — MIT.
[11] `https://github.com/etrinidad132/Esforza` — 2026-08-14 — GitHub REST API — `license=null`, last push 2023-01-19.
[12] `https://pub.dev/packages/health` — 2026-08-14 — `ctx_fetch_and_index` — MIT, v13.3.2 published 4h before query, published by verified publisher `carp.dk`.
[13] `https://github.com/EvanBacon/apple-health` — 2026-08-14 — referenced from `npm` search as Expo HealthKit module; license not declared — flagged as license trap.
[14] `https://github.com/AtilMohAmine/Fitness-Tracker` — 2026-08-14 — GitHub REST API — MIT, last push 2025-03-04, Android Kotlin + Google Fit sample.
[15] `https://github.com/vincentneo/CoreGPX` — 2026-08-14 — GitHub REST API — MIT, last push 2026-07-21.
[16] `https://github.com/maplibre/maplibre-native` — 2026-08-14 — GitHub REST API — BSD-2-Clause, last push 2026-08-14.
[17] `https://github.com/transistorsoft/react-native-background-geolocation` — 2026-08-14 — GitHub REST API — MIT SDK, last push 2026-08-14.
[18] `https://github.com/HHG-RunTracker/RunTracker-ReactNative` — 2026-08-14 — GitHub REST API — `license=null`.
[19] `https://github.com/Borisserz/WorkoutTracker` — 2026-08-14 — GitHub REST API search — `license=null`.
[20] `https://github.com/Cairo-Squad/EvolveFit` — 2026-08-14 — GitHub REST API search — `license=null`, KMP gym tracker.
[21] `https://github.com/danielkuhlwein/strength-training` — 2026-08-14 — GitHub REST API — MIT, last push 2026-07-03.
[22] `https://github.com/mps/healthkit-run-generator` — 2026-08-14 — GitHub REST API — MIT, last push 2026-03-02.
[23] `https://github.com/shini-tm/strava_clone` — 2026-08-14 — GitHub REST API — Unlicense, last push 2025-09-27.
[24] `https://github.com/costiucigor/Moldava` — 2026-08-14 — GitHub REST API — `license=null`, last push 2025-05-21.
[25] `https://github.com/jzjonah/StravaClone` — 2026-08-14 — GitHub REST API — `license=null`, last push 2023-05-10.
[26] `https://pub.dev/packages/pedometer` — 2026-08-14 — `ctx_fetch_and_index` — MIT, v4.2.0, verified publisher.
[27] `https://pub.dev/packages/gpx` — 2026-08-14 — `ctx_fetch_and_index` — Apache-2.0, v2.5.0, 37d before query.
[28] `https://pub.dev/packages/flutter_background_geolocation` — 2026-08-14 — `ctx_fetch_and_index` — Apache-2.0 SDK, Transistorsoft verified publisher.
[29] `https://github.com/maplibre/maplibre-react-native` — 2026-08-14 — GitHub REST API search — MIT, last push 2026-07-29.
[30] `https://github.com/maplibre/flutter-maplibre-gl` — 2026-08-14 — GitHub REST API search — BSD-2-Clause (matches native).
[31] `https://github.com/ticofab/android-gpx-parser` — 2026-08-14 — GitHub REST API search — Apache-2.0.
[32] `https://github.com/carp-dk/carp-health-flutter` — 2026-08-14 — GitHub REST API — MIT, v13.x.x family.
[33] `https://github.com/kingstinct/react-native-healthkit` — referenced via npm — MIT, modern HK wrapper if RN is chosen.

---

## Open questions

- Does Runify plan to support watchOS / Apple Watch for live run tracking (which would require `HKLiveWorkoutBuilder` on watchOS and a `WKWatchConnectivitySession` bridge)? None of the OSS candidates above ship a working watchOS companion.
- Is the Runify subscription model tied to social features (Strava-style follows, kudos, segments) or to training content (plans, structured workouts)? The answer changes whether CloudKit is sufficient as a backend or whether you need a custom Node/Postgres service.
- Will Runify publish to the App Store's "Health & Fitness" category with HealthKit entitlements? If yes, the App Review requires `NSHealthShareUsageDescription` + `NSHealthUpdateUsageDescription` strings in `Info.plist` and at least one write path to HealthKit — design that into the app from day one.
- The commercial Mapbox SDK's BSL is the one "OSS-but-not" gotcha in the map stack — does the product have any appetite for paying Mapbox, or is the BSD-2-Clause MapLibre pipeline mandatory?
- Is the team comfortable with Java code (for OpenTracks study), or do they want a Kotlin-only read?

---

## Metrics footer

- Candidate repos reviewed: **15** + **10** honourable-mention historical anchors = **25** total considered
- Cornerstones deep-dived: **5** (OpenTracks, carp `health`, CoreGPX, MapLibre Native, Transistorsoft RN bg geo)
- Libraries catalogued: **30+** (Flutter packages, RN packages, Swift packages, Kotlin libraries, backend OSS, map providers)
- Sources cited: **33**
- License traps flagged: **5** (Mapbox BSL/TOS, GPL-3.0 Privacy-friendly-pedometer, GPL-3.0 MuscleBook, unlicensed lucha, unlicensed Esforza; plus the Transistorsoft hosted-service commercial tier)