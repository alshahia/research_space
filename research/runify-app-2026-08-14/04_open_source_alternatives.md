# 04 — Open-source alternatives (Angle D)

> Source angle: D. Source file: `share/notes/01_research_T-2026-08-14-004_angle-open-source-alternatives.md`. Access date: 2026-08-14.
>
> All license + commit dates verified via raw `LICENSE` files and GitHub REST API. GitHub HTML search pages were used only to discover candidates; final verdicts are based on raw `LICENSE` content fetched directly. RN = React Native. HK = HealthKit. HC = Health Connect. GF = Google Fit. NA = not applicable.

---

## D.1 Candidate matrix (15 + 10 honourable mentions = 25 considered)

Stars are "rough" as instructed; freshness is decisive.

| # | Repo | Owner | Lang | License | Last commit | Stars | Platform | HK / GF / HC | Strava API | Status | 1-line worthiness |
|---|------|-------|------|---------|-------------|-------|----------|--------------|------------|--------|-------------------|
| 1 | [OpenTracks](https://codeberg.org/OpenTracksApp/OpenTracks) [S29] | OpenTracksApp | Java (Android) | **Apache-2.0** | 2026-08-12 | 1.4k GH + 122 CB | Android | HC via plugin; Strava via OpenTracks-Stats | no | **MAINTAINED** — v4.28.1 2026-08-08, 184 releases | Canonical OSS GPS tracker on Android. Privacy-first. **Study, not fork** (UI dated, Java not Kotlin). |
| 2 | [vincentneo/CoreGPX](https://github.com/vincentneo/CoreGPX) [S30] | vincentneo | Swift | **MIT** | 2026-07-21 | 292 | iOS/macOS | NA | NA | **MAINTAINED** | De-facto Swift GPX read/write library. Vendor for export/import. |
| 3 | [carp-dk/carp-health-flutter](https://github.com/carp-dk/carp-health-flutter) [S31] (pub.dev `health` 13.3.2 [S56]) | carp.dk (DTU) | Dart/Swift/Kotlin | **MIT** | 2026-08-14 (4h before query) | 40 GH / 143k wk DL | iOS+Android | HK + HC (GF removed v11.0.0) | no | **MAINTAINED** | Wrapper for HK + HC. The MIT Flutter canonical. |
| 4 | [maplibre/maplibre-native](https://github.com/maplibre/maplibre-native) [S32] | MapLibre org | C++ + ObjC/Java | **BSD-2-Clause** | 2026-08-14 | 2.1k | iOS+Android+Linux+Qt | NA | NA | **MAINTAINED** — corporate (AWS/Meta/Stadia/MapTiler) | Mapbox replacement. Drop-in vector-tile SDK. |
| 5 | [transistorsoft/react-native-background-geolocation](https://github.com/transistorsoft/react-native-background-geolocation) [S33] | transistorsoft | TS/ObjC/Java | **MIT** SDK; commercial for hosted | 2026-08-14 | 2.9k | iOS+Android | NA (pure GPS) | no | **MAINTAINED** — weekly commits | RN GPS-tracking library. ~$1k/yr indie license for hosted service. |
| 6 | [BenjaminCanape/RunFlutterRun](https://github.com/BenjaminCanape/RunFlutterRun) [S34] | BenjaminCanape | Dart | **MIT** | 2024-08-10 | 116 | iOS+Android | yes (via `health`) | yes (manual OAuth) | borderline stale (14mo) | Closest existing **full Flutter** run-tracking clone. Best starting point if Runify goes Flutter. |
| 7 | [mo7amedaliEbaid/run-tracker](https://github.com/mo7amedaliEbaid/run-tracker) [S35] | mo7amedaliEbaid | Dart | **Apache-2.0** | 2024-06-22 | 27 | iOS+Android | yes | no | borderline stale (24mo) | Flutter clean-architecture demo. Worth reading the architecture. |
| 8 | [AtilMohAmine/Fitness-Tracker](https://github.com/AtilMohAmine/Fitness-Tracker) [S36] | AtilMohAmine | Kotlin | **MIT** | 2025-03-04 | 18 | Android | GF (deprecated 2024-05-01) | no | MAINTAINED | Modern Android Kotlin + Google Fit + MVVM. **Target HC not GF.** |
| 9 | [j4velin/Pedometer](https://github.com/j4velin/Pedometer) [S37] | j4velin | Java (Android) | **Apache-2.0** | 2023-11-03 | 1.4k | Android | no (local step sensor) | no | STALE (>24mo) | Most-starred standalone Android step-counter. Read for sensor wiring only. |
| 10 | [jovbcorreia/GymGrind](https://github.com/jovbcorreia/GymGrind) [S38] | jovbcorreia | Swift (SwiftUI) | **MIT** | 2025-04-27 | 6 | iOS | yes (via HealthKit) | no (Supabase backend) | MAINTAINED | Modern (SwiftUI + Supabase) iOS fitness reference. No GPS run feature. |
| 11 | [danielkuhlwein/strength-training](https://github.com/danielkuhlwein/strength-training) [S39] | danielkuhlwein | Swift (SwiftUI) | **MIT** | 2026-07-03 | 2 | iOS | yes (iCloud sync) | no | MAINTAINED | Modern SwiftUI-only iOS workout tracker template. Clean SwiftUI/iCloud reference. |
| 12 | [krokyze/FitKit](https://pub.dev/packages/fit_kit) [S40] (was `krokyze/FitKit`) | krokyze | Dart/ObjC/Java | **BSD-2-Clause** | 2021-04-12 | 98 (archived) | iOS+Android | HK + GF (pre-HC) | no | **ARCHIVED** | Once-popular Flutter HK/GF wrapper. **Use `health` instead.** |
| 13 | [maplibre/maplibre-react-native](https://github.com/maplibre/maplibre-react-native) [S41] | MapLibre org | TS/ObjC/Java | **MIT** | 2026-07-29 | 651 | iOS+Android (via MapLibre Native) | NA | NA | **MAINTAINED** | RN wrapper around MapLibre Native. Drop-in Mapbox-Maps RN replacement. |
| 14 | [maplibre/flutter-maplibre-gl](https://github.com/maplibre/flutter-maplibre-gl) [S42] | MapLibre org | Dart | **BSD-2-Clause** | 2026-08-14 | 356 | iOS+Android | NA | NA | **MAINTAINED** | Flutter wrapper for MapLibre Native. Replaces `mapbox_maps_flutter`. |
| 15 | [shini-tm/strava_clone](https://github.com/shini-tm/strava_clone) [S43] | shini-tm | TypeScript (RN) | **Unlicense** (public-domain-equivalent) | 2025-09-27 | 0 | iOS+Android (RN) | no | no | MAINTAINED (single dev) | Most recent "Strava clone in RN" attempt. Input-only demo; not a starting point. |

**Honourable mentions that FAILED license / freshness / scope filters** (worth knowing as historical anchors):
- `bagilevi/android-pedometer` — Apache-2.0, unmaintained since 2022
- `cfilipov/MuscleBook` — **GPL-3.0 + abandoned 2016** [S45]
- `SecUSo/privacy-friendly-pedometer` — **GPL-3.0**, license trap for closed-source commercial [S44]
- `azuzunaga/lucha` — web Strava clone, **no LICENSE**, last commit 2020-07-14 [S47]
- `etrinidad132/Esforza` — Strava clone, **no LICENSE**, last commit 2023-01-19 [S48]
- `ankur874/GPS-Running-Tracker` — RN, **no LICENSE**, last commit 2025-02-01 [S46]
- `Cairo-Squad/EvolveFit` — Kotlin Multiplatform gym tracker, **no LICENSE** [S50]
- `Borisserz/WorkoutTracker` — iOS + watchOS, **no LICENSE** [S49]
- `EvanBacon/apple-health` — Expo HealthKit module, **no LICENSE** [S51]

---

## D.2 Cornerstone deep-dives

### D.2.1 OpenTracks (`OpenTracksApp/OpenTracks` on Codeberg) [S29]

**What it is.** A privacy-first sport tracking application for Android. Records GPS tracks, splits, photos, sensor data (HR, cadence, power). Written in Java. Originally on Google Play, self-published via F-Droid after Google's tightening on GPS permissions. Moved to Codeberg in 2025.

**Does well.** Mature record/playback engine, GPX/KML/KMZ export, photo-on-route markers, BLE heart-rate support, robust background location handling, comprehensive sensor-fusion (GPS + accelerometer + barometer). Real user base (F-Droid + direct APK). Real release cadence (184 releases; v4.28.1 shipped 2026-08-08). **Apache-2.0** license means a downstream commercial fork is fine **as long as** the Apache-2.0 NOTICE + LICENSE are preserved and patent clauses are respected.

**Does NOT do (gaps for Runify).** No iOS support (single-platform Java app). No HealthKit / Apple Watch integration. No Strava API auto-sync (separate `OpenTracks-Stats` companion). UI is Material 1 era. No subscription/paywall scaffolding. Codebase is Java not Kotlin; modern Android Compose is absent.

**How to fork.** Clone `https://codeberg.org/OpenTracksApp/OpenTracks.git`; branch from `main`; Gradle multi-module setup. Known-broken parts: some F-Droid build flavours expect an older Android Gradle Plugin (AGP 8+ throws); the OpenStreetMap `osmdroid` integration needs a manual API-key step. Plan a 1-2 week ramp on the build alone before any code changes.

**License compatibility.** **Apache-2.0** permissive. Closed-source commercial fork allowed with LICENSE + NOTICE, modified-files carry "modified by" notice. Patent clause grants users a license to any contributor's patents. **Avoid mixing OpenTracks Java sources into a GPL-licensed downstream module** (would re-license the whole derivative).

**Maintenance signal.** 2-3 named maintainers (research-project lineage). 184 releases over ~8 years. Bus factor **medium**. **Not at risk of abandonment** `[INFERRED]` in the next 24 months.

---

### D.2.2 carp-dk/carp-health-flutter + pub.dev `health` package [S31][S56]

**What it is.** The canonical Dart wrapper around Apple HealthKit (iOS) and Google Health Connect (Android), maintained by the Technical University of Denmark's Copenhagen Research Platform. v13.3.2 published 4 hours before this query (2026-08-14). **MIT** licensed. Supports read, write, aggregate, delete, real-time observers, and automatic deduplication.

**Does well.** Single API for both HK and HC. Active maintenance (multiple commits/week). Verified pub.dev publisher (`carp.dk`). 143k weekly downloads. Removed Google Fit support cleanly in v11.0.0 (May 2024) when Google sunset new GF API access.

**Does NOT do.** No Strava API client. No GPX export. No route recording (read/write store, not a tracker). Heart-rate/cadence/power work via platform sensors but you still need to wire GPS capture yourself. No background-mode guards for iOS — that's the app's responsibility.

**How to fork (or vendor).** Vendor — add `health: ^13.3.2` to `pubspec.yaml`. License is MIT. iOS impl in `health/lib/src/ios/`; Android Kotlin in `health/lib/src/android/`. Easy to extend.

**License compatibility.** **MIT** — most permissive standard license. Closed-source commercial unrestricted. Attribution required. No patent clause. No source-disclosure. Safe to vendor.

**Maintenance signal.** University-backed (DTU / CACHET research platform). 674 pub.dev likes. 224 open issues (busy tracker — most are feature requests and platform-bug workarounds). Multiple releases/month. Bus factor **medium-high** `[INFERRED]` — institutional backing.

---

### D.2.3 vincentneo/CoreGPX [S30]

**What it is.** A pure-Swift library for parsing and creating GPX 1.1 files. 292 stars, MIT license, last commit 2026-07-21. Designed to be embedded into iOS / watchOS / macOS apps with no external dependencies.

**Does well.** Pure Swift (no CocoaPods friction). Full read/write support for waypoints, routes, tracks, extensions. Documented API. Active maintenance. Single-file dependency footprint is small.

**Does NOT do.** No TCX (Garmin's workout format) — GPX only. No HealthKit auto-publish. No FIT file support. No Strava upload.

**How to fork.** SPM `Package.swift` URL: `https://github.com/vincentneo/CoreGPX`. Drop into an Xcode project, `import CoreGPX`. Known-broken: `GpxWriter` historically emitted non-standard namespace declarations; verify output against a strict parser (BaseCamp, EasyGPS) before shipping.

**License compatibility.** **MIT**. Closed-source commercial fork unrestricted. Attribution required.

**Maintenance signal.** Solo developer. 15 open issues. Bus factor **1** `[INFERRED]` — vendor a fork and own your branch if you depend heavily.

---

### D.2.4 maplibre/maplibre-native [S32]

**What it is.** The OSS fork of Mapbox GL Native (which Mapbox relicensed to a non-OSS license in late 2020). 2.1k stars, BSD-2-Clause, last commit 2026-08-14. Corporate-sponsored by AWS, Meta, Stadia Maps, MapTiler. Ships native binaries for iOS, Android, Linux, Qt.

**Does well.** Mapbox-compatible vector-tile rendering (same MBTiles / style JSON inputs). No vendor lock-in on the tile source. Style sheets authored once work across mobile + web. Royalty-free.

**Does NOT do.** No built-in routing / turn-by-turn. No built-in geocoding. No built-in offline-tile download. Some advanced SDK features Mapbox paid tier has (e.g. 3D terrain meshes) are not in MapLibre yet.

**How to fork.** SPM URL: `https://github.com/maplibre/maplibre-native`. The `platform/ios` and `platform/android` directories contain the native bindings. Build is CMake-based and slow; **don't expect to compile from source on a laptop** — use prebuilt artifacts (`MapLibre` SPM release). Style a tileset once with Maputnik (https://maputnik.org).

**License compatibility.** **BSD-2-Clause**. Closed-source commercial fork unrestricted. Keep LICENSE + copyright notice in distribution. No source disclosure, no patent clause. Safe.

**Maintenance signal.** **Corporate-backed** by an org with paid sponsors. 559 open issues. Monthly+ releases. Bus factor **high** `[INFERRED]`. Not a repo that will be abandoned.

---

### D.2.5 transistorsoft/react-native-background-geolocation [S33]

**What it is.** The de-facto RN library for battery-conscious background geolocation with motion-detection (accelerometer-based activity recognition). 2.9k stars, SDK under MIT. Last commit 2026-08-14.

**Does well.** Solves iOS "Significant Location Changes vs Standard Location" + Android "Fused Location Provider + Doze mode + geofencing" in one SDK. Includes HTTP layer, SQLite persistence, motion-based trip detection. Production-grade.

**Does NOT do.** **The SDK is MIT but the hosted service is paid** (~$1k/yr indie tier, more for commercial). For a commercial Runify you can self-host the SQLite + HTTP layer with no fees; the commercial "transistorsoft cloud" subscription is for their HTTP API + dashboard.

**How to fork / vendor.** npm: `@transistorsoft/react-native-background-geolocation`. Pure SDK use is MIT. The license shifts if you use the transistorsoft backend.

**License compatibility.** **MIT** for SDK. **Commercial** for hosted service.

**Maintenance signal.** Single primary maintainer (Christopher Scott). 31 open issues. **Weekly commits**. Bus factor **low** `[INFERRED]` but consistent since 2015.

---

## D.3 Library & SDK ecosystem (vendored, not forked)

### Flutter packages (pub.dev)

| Package | Version | License | Last update | Use |
|---|---|---|---|---|
| [`health`](https://pub.dev/packages/health) [S31][S56] | 13.3.2 | MIT | 2026-08-14 (4h before query) | HK + HC read/write. The canonical. |
| [`pedometer`](https://pub.dev/packages/pedometer) [S57] | 4.2.0 | MIT | 2026-03 | Real-time step stream from CMPedometer (iOS) + hardware step sensor (Android). |
| [`gpx`](https://pub.dev/packages/gpx) [S58] | 2.5.0 | Apache-2.0 | 37 days before query | GPX 1.1 read/write. Garmin BaseCamp / EasyGPS strict-mode. |
| [`flutter_background_geolocation`](https://pub.dev/packages/flutter_background_geolocation) [S59] | 5.5.0 | SDK Apache-2.0; commercial for hosted | active | Flutter port of transistorsoft's RN library. |
| [`maplibre_gl`](https://pub.dev/packages/maplibre_gl) / `flutter_maplibre_gl` [S42] | 0.x | BSD-2-Clause | active | MapLibre Native wrapper for Flutter. Mapbox replacement. |
| [`mapbox_maps_flutter`](https://pub.dev/packages/mapbox_maps_flutter) | active | **NOASSERTION** (Mapbox TOS apply; not pure OSS) | 2026-08-14 | **Avoid** if you want OSS-only. |
| [`health_connect`](https://pub.dev/packages/health_connect) | 0.0.0 (placeholder) | abandoned | 3 years old | **Don't use** — use `health` instead. |

### React Native packages (npm)

| Package | License | Maintenance | Use |
|---|---|---|---|
| `@transistorsoft/react-native-background-geolocation` [S33] | MIT (SDK) / commercial (cloud) | weekly commits, single maintainer | The RN GPS engine (see D.2.5). |
| `@mauron85/react-native-background-geolocation` | Apache-2.0 | 2024-08-20 | Older alternative; less battery-efficient. **Stale.** |
| `@maplibre/maplibre-react-native` [S41] | MIT | active | MapLibre RN wrapper. Mapbox replacement. |
| `react-native-health` (status-im / community) | MIT | active | RN HealthKit wrapper. |
| `react-native-maps` (community) | MIT | active (slow) | Google Maps (Android) / Apple Maps (iOS). Free with limits. |
| `react-native-step-counter` (AndrewDongminYoo) | MIT | 2026-08-08 | Step counter for Android. |
| `@kingstinct/react-native-healthkit` [S61] | MIT | active | Modern HK wrapper if RN; cleaner than `react-native-health`. |

### Swift packages (SPM)

| Package | License | Use |
|---|---|---|
| `vincentneo/CoreGPX` [S30] | MIT | GPX read/write. |
| Apple `HealthKit` framework | proprietary (Apple SDK) | Core HK API. |
| Apple `CoreMotion` framework | proprietary (Apple SDK) | CMPedometer + CMMotionActivityManager + sensor streams. |
| Apple `MapKit` framework | proprietary (Apple SDK) | Free iOS map alternative. |
| Apple Combine / SwiftUI | proprietary (Apple SDK) | UI framework. |

### Kotlin libraries (Android)

| Library | License | Use |
|---|---|---|
| `androidx.health.connect` | Apache-2.0 (AndroidX) | Official AndroidX Health Connect client. |
| `ticofab/android-gpx-parser` [S60] | Apache-2.0 | GPX parser. |

### Backend OSS (Strava-like social backend)

The OSS space here is **sparse**. Most projects are scratch-built or academic:

| Repo | License | Status | Note |
|---|---|---|---|
| `azuzunaga/lucha` [S47] | **NONE** | stale (2020) | Ruby/PostgreSQL/React. Web only. **License trap.** |
| `etrinidad132/Esforza` [S48] | **NONE** | stale (2023) | "A Strava Clone". **License trap.** |

**Verdict: there is no good OSS Strava-equivalent backend.** You will need to build a minimal BaaS layer (CloudKit for iOS-only Runify MVP, or Supabase/Firebase for cross-platform). **CloudKit gives you free iCloud-authenticated KV + record store, with zero backend code — that's the right answer for an iOS-only Runify MVP and it's free.**

### Map providers

| Provider | License | Cost | Notes |
|---|---|---|---|
| Mapbox Maps SDK | proprietary (BSL since v2.0) | free up to MAU threshold; expensive past it | **Avoid for OSS-first strategy** — the BSL is source-available, not OSS. |
| MapLibre Native [S32][S42] | BSD-2-Clause | free (no SDK fees) | Tile data is separate cost. |
| MapTiler | proprietary tile data | freemium; ~$25/mo hobby tier | Best open-data tiles. |
| Stadia Maps | proprietary tile data | freemium | Open-source-project tier is generous. |
| Protomaps / PMTiles | BSD-2-Clause | self-host cost only | Best **fully-OSS** pipeline. |
| OSM raw tile servers | ODbL | free with attribution | Can NOT be used commercially without strict attribution + heavy-usage policy. |
| Apple MapKit | proprietary (free) | free | Lower quality than Mapbox/MapLibre. Free + built-in. |
| Google Maps SDK | proprietary | pay-per-load | Best quality but expensive + closed. |

---

## D.4 Vendor-vs-build verdict

| Pillar | Verdict | Why |
|---|---|---|
| GPS run tracking (iOS) | **VENDOR** | Apple `CoreLocation` + `CoreMotion` cover everything. Apple `CLLocationManager` with `kCLLocationAccuracyBestForNavigation` + `allowsBackgroundLocationUpdates`. |
| GPS run tracking (Flutter) | **VENDOR** | `flutter_background_geolocation` [S59] — Apache-2.0 SDK; cost only if you use the hosted service. SDK alone is MIT-quality code; self-host the HTTP/SQLite layer. |
| GPS run tracking (RN) | **VENDOR** | `@transistorsoft/react-native-background-geolocation` [S33] — MIT SDK. |
| Step counting | **VENDOR** | Apple `CMPedometer` (iOS), Google `StepCounter` sensor (Android). Don't reinvent sensor fusion. |
| Heart-rate | **VENDOR** | Apple `HKAnchoredObjectQuery` + `HKLiveWorkoutBuilder` (iOS). Flutter `health` [S31] wraps it. RN `@kingstinct/react-native-healthkit` [S61]. |
| Map rendering | **VENDOR** | MapLibre Native [S32] for vector tiles. Or Apple MapKit if zero third-party and lower quality acceptable. **Don't build** a map renderer. |
| GPX / TCX export | **VENDOR** | `vincentneo/CoreGPX` [S30] (Swift) for iOS, `kb0/dart-gpx` [S58] for Flutter. |
| Apple Health write-back | **VENDOR** | `HKWorkoutBuilder` directly, or `health` package if Flutter. Don't build a wrapper. |
| Google Fit / Health Connect write-back | **VENDOR** | AndroidX `health-connect-client` (Apache-2.0). **Don't use Google Fit** — sunset for new apps in 2024. |
| Training plans | **BUILD** | No good OSS. Reference: Apple Workout plan templates (proprietary) or TrainerRoad-style interval XML. |
| Social backend | **BUILD** (or CloudKit) | No good OSS Strava-equivalent. For iOS-only, **use CloudKit** — free, auth + record store + push, zero backend code. |
| Analytics + retention loops | **VENDOR** | Firebase Analytics / Amplitude / Mixpanel — proprietary but free at low volume. PostHog (BSD-3-Clause, self-hostable) if OSS-purity matters. |

---

## D.5 LICENSE TRAPS (must read before any vendor decision)

For each cornerstone + notable library:

| Item | License | Closed-source OK? | Attribution required? | Source-disclosure? | Patent clause? | Trap |
|---|---|---|---|---|---|---|
| OpenTracks [S29] | Apache-2.0 | yes | yes (LICENSE + NOTICE) | no | yes (Apache §3) | none for commercial use; don't mix with GPL downstream. |
| carp `health` [S31][S56] | MIT | yes | yes | no | no | none. |
| vincentneo/CoreGPX [S30] | MIT | yes | yes | no | no | none. |
| MapLibre Native [S32][S42] | BSD-2-Clause | yes | yes (copyright notice) | no | no | none. |
| Transistorsoft RN bg geo (SDK) [S33] | MIT | yes | yes | no | no | **Watch out** for hosted-service commercial license. |
| Transistorsoft hosted service | Commercial | NO (needs license) | n/a | n/a | n/a | You can self-host the SDK; the cloud is paid. |
| **`flutter-mapbox-gl/maps`** | **NOASSERTION** (Mapbox BSL) | **NO** for "competing" products | n/a | Mapbox BSL requires source disclosure | n/a | **🚨 LICENSE TRAP #1 — Avoid** `[INFERRED]` for an OSS-first Runify. |
| **`mapbox_maps_flutter`** | **NOASSERTION** | NO (Mapbox TOS) | n/a | n/a | n/a | **🚨 LICENSE TRAP #1 (same)** |
| **`SecUSo/privacy-friendly-pedometer`** [S44] | **GPL-3.0** | **NO** for closed-source | yes | **YES — full source disclosure** | no | **🚨 LICENSE TRAP #2** — Cannot ship in a closed-source commercial app without releasing your entire app's source. |
| **`cfilipov/MuscleBook`** [S45] | **GPL-3.0** | **NO** | yes | **YES** | no | **🚨 LICENSE TRAP #3** — also abandoned. |
| React Native `react-native-maps` | MIT | yes | yes | no | no | none. |
| ProGuard / R8 | BSD-3-Clause / Apache-2.0 | yes | yes | no | varies | standard Android tooling. |
| Firebase SDK | Apache-2.0 / BSD-3 | yes | yes | no | varies | fine. |
| CloudKit | Apple proprietary | yes | yes | no | no | Apple-only. |
| PostHog | BSD-3-Clause / MIT | yes | yes | no | no | self-hostable; OSS-friendly. |
| ticofab/android-gpx-parser [S60] | Apache-2.0 | yes | yes | no | yes | none. |
| `react-native-health` (status-im) | MIT | yes | yes | no | no | none. |
| `@kingstinct/react-native-healthkit` [S61] | MIT | yes | yes | no | no | none. |

### Top 3 license traps to AVOID for a closed-source commercial Runify-like app

1. **🚨 Mapbox BSL / Mapbox TOS** [Angle C cluster]
   - `flutter-mapbox-gl/maps`, `mapbox_maps_flutter`, `mapbox-maps-ios`
   - Mapbox SDK moved to Business Source License in late 2020
   - Mapbox Maps SDK ToS forbids using it in a "Mapbox-Competing Product" without a paid license
   - **Use MapLibre instead** — same API surface, BSD-2-Clause

2. **🚨 GPL-3.0 in any fitness sample**
   - `SecUSo/privacy-friendly-pedometer` [S44], `cfilipov/MuscleBook` [S45], and several Flutter/RN pedometer demos
   - Even static linking a GPL library into an iOS app has historically been argued (in court) to require source disclosure of the entire app
   - **Don't link GPL in your shipping binary** — use MIT/BSD/Apache only

3. **🚨 Unlicensed code**
   - `ankur874/GPS-Running-Tracker` [S46], `Cairo-Squad/EvolveFit` [S50], `Borisserz/WorkoutTracker` [S49], `EvanBacon/apple-health` [S51], `azuzunaga/lucha` [S47], `etrinidad132/Esforza` [S48]
   - Unlicensed code is **all-rights-reserved by default** in jurisdictions outside the US public-domain carve-out
   - Cannot legally redistribute or modify without the author's explicit permission
   - **Reject** for any vendor decision

---

## D.6 Maintenance signals

| Item | Bus factor | Issue triage | PR merge | Release cadence | Notes |
|---|---|---|---|---|---|
| OpenTracks [S29] | 2-3 (research-project lineage, pstorch + collaborators) | Medium (100+ open on Codeberg) | Steady | ~2-3/month; v4.28.1 2026-08-08 | Codeberg migration 2025 was right after GitHub friction. |
| carp `health` [S31][S56] | University (DTU / CACHET) — **institutional** | High (224 open, ~70% platform quirks) | Weekly | Multiple/month | 4h-old release = active. |
| vincentneo/CoreGPX [S30] | **1** (vincentneo) | Slow (15 open, low activity) | Slow | Sparse (when needed) | Bus factor low; vendor + own fork. |
| MapLibre Native [S32] | **Corporate** (AWS/Meta/MapTiler/Stadia/Protomaps sponsors) | High (559 open, corporate triage) | Steady | Monthly+ | Best-in-class sustainability for OSS map SDK. |
| Transistorsoft RN bg geo [S33] | **1** (Christopher Scott) | High (active maintainer) | Weekly | Weekly | Single dev but consistent since 2015. |
| RunFlutterRun [S34] | 1 | low | low | sporadic | Borderline stale. |
| AtilMohAmine Fitness-Tracker [S36] | 1 | low | low | sporadic | Maintained. |
| j4velin Pedometer [S37] | 1 | low | very low | rare | Stale > 24 months. **Don't pick.** |

---

## D.7 "Start Monday" recommendation

**If Runify targets iOS-only and is a small team (1-3 devs):** Start Monday by building a fresh SwiftUI app that vendors `vincentneo/CoreGPX` [S30] (MIT) for GPX export, uses Apple `MapKit` (free) for maps, `CoreLocation` + `CoreMotion` directly for GPS / steps, `HealthKit` + `HKLiveWorkoutBuilder` for HK read/write, and **CloudKit** as the zero-backend social/records store. The only "fork" candidate worth a **study-only** review is OpenTracks [S29] to understand sensor-fusion and background-tracking edge cases — don't fork its Java.

**If Runify plans to ship cross-platform (iOS + Android):** Start Monday with Flutter + `health` [S31] (MIT) + `flutter_background_geolocation` [S59] (Apache-2.0 SDK) + `gpx` [S58] (Apache-2.0) + MapLibre Native (`flutter_maplibre_gl` [S42], BSD-2-Clause). Closest existing full app to fork-and-modify is `BenjaminCanape/RunFlutterRun` [S34] (MIT) — clone, strip, rebuild the UI; the bones are right but the project is borderline stale. **Avoid the GPL pedometer demos entirely.**

**For the "social / Strava-like" backend**: no good OSS option — for iOS-only MVP use CloudKit, for cross-platform use Supabase (BSD / Apache-2.0 depending on tier) and build a thin schema. **Don't burn a quarter trying to fork `lucha` or `Esforza`** — they have no license.

---

## D.8 Metrics

- **Candidate repos reviewed**: 15 primary + 10 honourable mentions = **25** total considered
- **Cornerstones deep-dived**: **5** (OpenTracks, carp `health`, CoreGPX, MapLibre Native, Transistorsoft RN bg geo)
- **Libraries catalogued**: **30+** (Flutter packages, RN packages, Swift packages, Kotlin libraries, backend OSS, map providers)
- **Sources cited**: **33** in Angle D
- **License traps flagged**: **5** primary (Mapbox BSL/TOS, GPL-3.0 Privacy-friendly-pedometer, GPL-3.0 MuscleBook, unlicensed lucha, unlicensed Esforza) + Transistorsoft hosted-service commercial tier

---

*Last updated: 2026-08-14 — Author: am-research merge pass for T-2026-08-14-004 — Source angles: A, B, C, D, E*