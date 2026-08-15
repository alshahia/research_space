# 99 — Full consolidated bibliography

> Consolidated source list for **all 8 files** in this dossier + the canonical research file at `share/notes/01_research_T-2026-08-14-004.md`. Access date for all sources: **2026-08-14**.
>
> Original angle-source mappings preserved below — every [Sn] in the angle files is reconciled to the consolidated [Sn] used across the dossier.

---

## A. Runify primary sources (S1–S14)

### [S1] iTunes Lookup API for Runify (id 6746146450)
- **URL**: `https://itunes.apple.com/lookup?id=6746146450&country=us`
- **Access date**: 2026-08-14
- **Tool**: `ctx_fetch_and_index` + `ctx_execute` (urllib); raw file at `C:\Users\AHMADM~1\AppData\Local\Temp\opencode\runify_lookup.json`
- **Used by**: All 5 angle files (A:1, A:1, A:2, A:6, A:1; B:1, B:3, C:R, D:n/a, E:1, E:RT, E:R4)
- **Note**: Canonical source for `trackName`, `sellerName`, `bundleId`, `version`, `releaseDate`, `currentVersionReleaseDate`, `minimumOsVersion`, `supportedDevices[]`, `languageCodesISO2A`, `fileSizeBytes`, `price`, `formattedPrice`, `averageUserRating`, `userRatingCount`, `description` (verbatim), `screenshotUrls[]`, `sellerUrl`, `genreIds`, `currency`, `artworkUrl512`, `contentAdvisoryRating`, `advisories`, `trackContentRating`, `isVppDeviceBasedLicensingEnabled`.

### [S2] App Store listing rendered HTML for Runify
- **URL**: `https://apps.apple.com/us/app/run-steps-tracker-runify/id6746146450`
- **Access date**: 2026-08-14
- **Tool**: `ctx_fetch_and_index` (cached, indexed 16 sections)
- **Used by**: A:2, A:5, A:7; B:2, B:7; C:R, C:22, C:21, C:matrix; E:1, E:R3
- **Note**: App Privacy nutrition label data categories, IAP price list (10 SKUs visible), visible reviews (R1–R5), version history, supportedDevices UI display, "Free · In-App Purchases" badge, location-while-closed battery warning, "Contains User-Generated Content" flag, "Only for iPhone" badge.

### [S3] runifyapp.com developer website
- **URL**: `https://runifyapp.com/`
- **Access date**: 2026-08-14
- **Tool**: `ctx_fetch_and_index` (10 sections) + `ctx_execute` (urllib)
- **Used by**: A:2, A:7, A:R; B:3, B:5, B:7, B:8; E:1, E:R5
- **Note**: Marketing TL;DR, social-proof stat cards ("100K+ Runs Logged", "500K+ Miles", "99.5% GPS Accuracy", "4.8★ across 626+ reviews"), Strava-Year-in-Sport quote attribution, 800m-marathon distance ladder, Apple Watch/Garmin/Strava sync messaging, rank-decay FAQ, contact email `caleb@runifyapp.com`.

### [S4] Runify privacy policy
- **URLs**: `https://runifyapp.com/privacy-policy` (canonical) + `https://runifyprivacy.carrd.co/` (alternate, referenced in App Store description)
- **Access date**: 2026-08-14
- **Tool**: `ctx_fetch_and_index` (24 sections for runifyapp.com; 3 sections for carrd.co) — same content
- **Used by**: A:7, A:7, A:10 G18; B:8, B:9
- **Note**: §1–11 of the policy including effective date (20 May 2025), data categories, third-party sharing language (no specific SDKs named), retention period (absent), GDPR/CCPA language (absent), promotional-email opt-in default, account-deletion mechanism (in-app or device settings), contact email.

### [S5] OneDegree Labs developer portfolio
- **URL**: `https://apps.apple.com/us/developer/onedegree-labs/id1850531994?platform=iphone`
- **Access date**: 2026-08-14
- **Tool**: `ctx_fetch_and_index` (4 sections)
- **Used by**: A:4, A:4
- **Note**: Source for the other 4 OneDegree Labs apps (Jurassic Dinosaur Simulator, You are: Daily Affirmations, HolyChat, MindFlix App), confirming the small-studio multi-app pattern. Same `artistId: 1850531994`.

### [S6] Jina Reader fallback for App Store page
- **URL**: `https://r.jina.ai/https://apps.apple.com/us/app/run-steps-tracker-runify/id6746146450`
- **Access date**: 2026-08-14
- **Tool**: `ctx_fetch_and_index` (173 sections, 27.8 KB)
- **Used by**: A:6; B:3, B:7
- **Note**: Confirms (a) App Privacy label has zero "Data Used to Track You" categories (ATT-friendly posture); (b) IAP list (10 SKUs, $4.99–$79.99); (c) duplicate confirmation of R1–R4 review text and developer responses; (d) `caleb@runifyapp.com` in dev response; (e) version 100.2.6 release notes ("Bug fixes and more...").

### [S7] Runify Screenshot 1 (Tier II Champion II reveal)
- **URL**: `https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/b4/5d/b9/b45db932-3ce7-aaaf-65e5-cb18fe11b955/5.png/460x0w.jpg`
- **Access date**: 2026-08-14
- **Tool**: `ctx_fetch_and_index` (Jina vision caption)
- **Used by**: B:1
- **Caption**: "snapchat champion ii with xp". Tag: ACHIEVEMENTS.

### [S8] Runify Screenshot 2 (Friends leaderboard)
- **URL**: `https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/41/20/4d/41204da2-1c4f-a13c-4ff5-e9953d634f12/1.png/460x0w.jpg`
- **Access date**: 2026-08-14
- **Tool**: `ctx_fetch_and_index` (Jina vision caption)
- **Used by**: B:1, B:6
- **Caption**: "The interface shows users to compete with friends on the application". Tag: LEADERBOARD.

### [S9] Runify Screenshot 3 (Profile)
- **URL**: `https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/81/9e/37/819e3713-369f-bb80-73ee-6fbac298ecec/3.png/460x0w.jpg`
- **Access date**: 2026-08-14
- **Tool**: `ctx_fetch_and_index` (Jina vision caption)
- **Used by**: B:1, B:5
- **Caption**: "Page of a fitness app showing the profile of a runner". Tag: PROFILE.

### [S10] Runify Screenshot 4 (Achievements)
- **URL**: `https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/67/fe/74/67fe744c-046a-c0a2-ab17-eb89243aefe4/2.png/460x0w.jpg`
- **Access date**: 2026-08-14
- **Tool**: `ctx_fetch_and_index` (Jina vision caption)
- **Used by**: B:1
- **Caption**: "Page showing achievement details and Running application". Tag: ACHIEVEMENTS / STATS_HISTORY.

### [S11] Runify Screenshot 5 (Instagram share template)
- **URL**: `https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/2b/af/a9/2bafa9b9-f277-d993-999b-aa4ac07492d8/4.png/460x0w.jpg`
- **Access date**: 2026-08-14
- **Tool**: `ctx_fetch_and_index` (Jina vision caption)
- **Used by**: B:1, B:6, B:10
- **Caption**: "a user page of instagram with a wallpaper app". Tag: OTHER (shareable recap / Instagram Story template).

### [S12] Runify FAQ JSON-LD on runifyapp.com
- **URL**: `https://runifyapp.com` (JSON-LD FAQPage schema)
- **Access date**: 2026-08-14
- **Tool**: `ctx_execute` (Python urllib + re)
- **Used by**: A:3, A:6, A:R; B:5, B:7, B:9; E:7
- **Note**: Canonical FAQ: "$4.99 monthly, $39.99 annual with 7-day free trial"; Pro unlocks distance-specific leaderboards and expanded profile/history views (weekly, monthly, yearly, all-time); rank system from 800m to marathon; "iOS only today. Android is not currently available."

### [S13] Runify Terms of Service
- **URL**: `https://runifytermsandconditions.carrd.co/`
- **Access date**: 2026-08-14
- **Tool**: `ctx_fetch_and_index`
- **Used by**: A:6, A:7; B:7, B:9
- **Note**: "Free Users – Access core running and ranking functionality with usage limits"; "Premium Users – Gain access to exclusive ranks, analytics, streak protection, and customization options"; auto-renew 24-hour cancel; no partial refunds; 16+ age; Western Australia jurisdiction.

### [S14] Runify App Icon (artworkUrl512)
- **URL**: `https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/37/91/68/37916840-c9a5-8123-4efa-599a54ba3e47/AppIcon-0-0-1x_U007ephone-0-1-0-85-220.jpeg/512x512bb.jpg`
- **Access date**: 2026-08-14
- **Tool**: `ctx_fetch_and_index` (Jina vision caption)
- **Used by**: B:3, B:4
- **Caption**: "The black background with bright blue eyes, looks like Batman, dinner at Netflix, anime picture". Confirms dark mode + electric blue accent.

---

## B. Competitor sources (S15–S28)

All competitor numbers cited from iTunes Search/Lookup API access 2026-08-14 UTC. Used by Angle C (rows 1–14) and cross-referenced by Angle D (Mapbox).

### [S15] Strava
- **App Store id**: 426826309
- **iTunes API URL**: `https://itunes.apple.com/lookup?id=426826309&country=us`
- **Access date**: 2026-08-14
- **Tool**: iTunes Lookup API
- **Numbers**: 4.81 stars, 367,815 ratings, version 476.0.0 (2026-08-11), 21 languages, iOS 17.0, Watch4+ supported, IAP "Strava subscription" visible.
- **Used by**: C:1 (row 1)

### [S16] Nike Run Club
- **App Store id**: 387771637 (live); 6477264554 (mentioned in dispatch prompt but returns 0 results via iTunes API — the app was re-issued under 387771637)
- **iTunes API URL**: `https://itunes.apple.com/lookup?id=387771637&country=us`
- **Access date**: 2026-08-14
- **Tool**: iTunes Lookup API
- **Numbers**: 4.77 stars, 417,217 ratings, version 7.79.2 (2026-07-24), iOS 18.0, 16 languages, description confirms 300+ Audio Guided Runs + free training plans.
- **Used by**: C:2 (row 2)

### [S17] Adidas Running
- **App Store id**: 336599882
- **iTunes API URL**: `https://itunes.apple.com/search?term=adidas+running&entity=software&country=us`
- **Access date**: 2026-08-14
- **Tool**: iTunes Search API
- **Numbers**: 4.80 stars, 106,907 ratings, version 14.9.1 (2026-08-13), first release 2009-11-23 (as Runtastic), iOS 17.0, 11 languages, 70M+ users claimed.
- **Used by**: C:3 (row 3)

### [S18] ASICS Runkeeper
- **App Store id**: 300235330
- **iTunes API URL**: `https://itunes.apple.com/search?term=runkeeper&entity=software&country=us`
- **Access date**: 2026-08-14
- **Tool**: iTunes Search API
- **Numbers**: 4.83 stars, 377,789 ratings, version 16.29 (2026-08-06), iOS 17.0, 12 languages, "Guided Workouts" + 5K-to-marathon plans.
- **Used by**: C:4 (row 4)

### [S19] Map My Run
- **App Store id**: 291890420
- **iTunes API URL**: `https://itunes.apple.com/search?term=mapmyrun&entity=software&country=us`
- **Access date**: 2026-08-14
- **Tool**: iTunes Search API
- **Numbers**: 4.84 stars, 749,349 ratings, version 26.9.0 (2026-08-12), iOS 16.0, 14 languages, 100M+ users, "Adaptive Training Plans" + Garmin Form Coaching.
- **Used by**: C:5 (row 5)

### [S20] Apple Health
- **App Store id**: 1242545199
- **iTunes API URL**: `https://itunes.apple.com/lookup?id=1242545199&country=us`
- **Access date**: 2026-08-14
- **Tool**: iTunes Lookup API
- **Numbers**: 3.02 stars, 8,839 ratings, version 1.8 (2025-12-12), iOS 10.0 minimum, 33 languages, 2.5 MB, com.apple.Health bundle.
- **Used by**: C:6 (row 6)

### [S21] Apple Fitness+
- **App Store id**: 1208224953
- **iTunes API URL**: `https://itunes.apple.com/search?term=apple+fitness%2B&entity=software&country=us`
- **Access date**: 2026-08-14
- **Tool**: iTunes Search API
- **Numbers**: 2.87 stars, 11,311 ratings, version 2.7 (2026-03-17), 12 workout types via Fitness+ subscription. Apple Fitness+ price ($9.99/mo + $79.99/yr) cited per Apple Fitness+ description.
- **Used by**: C:7 (row 7)

### [S22] Samsung Health
- **App Store id**: 1224541484
- **iTunes API URL**: `https://itunes.apple.com/search?term=samsung+health&entity=software&country=us`
- **Access date**: 2026-08-14
- **Tool**: iTunes Search API
- **Numbers**: 35,566 ratings, version 1.15.3 (2026-04-20), iOS 9.0, 42 languages, free.
- **Used by**: C:8 (row 8)

### [S23] Pacer Pedometer
- **App Store id**: 600446812
- **iTunes API URL**: `https://itunes.apple.com/search?term=pacer+pedometer&entity=software&country=us`
- **Access date**: 2026-08-14
- **Tool**: iTunes Search API
- **Numbers**: 4.90 stars, 325,186 ratings, version 11.7.3 (2026-07-31), iOS 15.0, 17 languages, 501 MB, "12M happy walkers".
- **Used by**: C:9 (row 9)

### [S24] AllTrails
- **App Store id**: 405075943
- **iTunes API URL**: `https://itunes.apple.com/lookup?id=405075943&country=us`
- **Access date**: 2026-08-14
- **Tool**: iTunes Lookup API
- **Numbers**: 4.89 stars, 1,035,539 ratings, version 26.8.20 (2026-08-13), iOS 17.0, 11 languages, 304 MB. Pricing $5.99/mo $29.99/yr (AllTrails+) and $9.99/mo $59.99/yr (Peak) per description.
- **Used by**: C:10 (row 10)

### [S25] Google Health (Fitbit)
- **App Store id**: 462638897
- **iTunes API URL**: `https://itunes.apple.com/search?term=fitbit&entity=software&country=us`
- **Access date**: 2026-08-14
- **Tool**: iTunes Search API
- **Numbers**: 4.48 stars, 689,232 ratings, version 5.06 (2026-08-14), iOS 16.4, 32 languages, 527 MB, "Fitbit is now Google Health, bringing out your best with effortless tracking and personalized coaching that's built with Gemini".
- **Used by**: C:11 (row 11)

### [S26] StepsApp Pedometer
- **App Store id**: 1037595083
- **iTunes API URL**: `https://itunes.apple.com/search?term=stepsapp&entity=software&country=us`
- **Access date**: 2026-08-14
- **Tool**: iTunes Search API
- **Numbers**: 4.81 stars, 290,664 ratings, version 8.13.0 (2026-08-11), iOS 15.0, 29 languages, 364 MB, 100M+ users claimed.
- **Used by**: C:12 (row 12)

### [S27] Codoon (咕咚)
- **App Store id**: 453480684
- **iTunes API URL**: `https://itunes.apple.com/search?term=codoon&entity=software&country=us`
- **Access date**: 2026-08-14
- **Tool**: iTunes Search API
- **Numbers**: 4.63 stars, 1,305 ratings (US storefront), iOS 13.0, 2 languages, by Chengdu Ledong.
- **Used by**: C:13 (row 13)

### [S28] Footpath Route Planner
- **App Store id**: 634845718
- **iTunes API URL**: `https://itunes.apple.com/search?term=footpath&entity=software&country=us`
- **Access date**: 2026-08-14
- **Tool**: iTunes Search API
- **Numbers**: 4.80 stars, 21,832 ratings, version 4.11.2 (2026-08-05), iOS 17.0, 12 languages, GPX/TCX/FIT export.
- **Used by**: C:14 (row 14)

---

## C. Open-source candidates (S29–S61)

### [S29] OpenTracks (Codeberg) — cornerstone
- **URL**: `https://codeberg.org/OpenTracksApp/OpenTracks`
- **Access date**: 2026-08-14
- **Tool**: Codeberg REST API + raw LICENSE file
- **License**: Apache-2.0 (raw LICENSE file confirmed)
- **Stars**: 1.4k GitHub + 122 Codeberg
- **Last commit**: 2026-08-12 (Codeberg main)
- **Status**: MAINTAINED — v4.28.1 released 2026-08-08, 184 releases
- **Used by**: D:1, D:2.1 (cornerstone deep-dive), D:4, D:5, D:6, D:7

### [S30] vincentneo/CoreGPX — cornerstone
- **URL**: `https://github.com/vincentneo/CoreGPX`
- **Access date**: 2026-08-14
- **Tool**: GitHub REST API
- **License**: MIT (raw LICENSE confirmed)
- **Stars**: 292
- **Last commit**: 2026-07-21
- **Used by**: D:2, D:2.3 (cornerstone deep-dive), D:4, D:7, D:Swift packages

### [S31] carp-dk/carp-health-flutter — cornerstone
- **URL**: `https://github.com/carp-dk/carp-health-flutter`
- **Access date**: 2026-08-14
- **Tool**: GitHub REST API + pub.dev API
- **License**: MIT (raw LICENSE confirmed)
- **Stars**: 40 GitHub
- **Last commit**: 2026-08-14 (4h before query — active)
- **Pub.dev weekly DL**: 143k
- **Used by**: D:3, D:2.2 (cornerstone deep-dive), D:4, D:7

### [S32] maplibre/maplibre-native — cornerstone
- **URL**: `https://github.com/maplibre/maplibre-native`
- **Access date**: 2026-08-14
- **Tool**: GitHub REST API
- **License**: BSD-2-Clause
- **Stars**: 2.1k
- **Last commit**: 2026-08-14
- **Used by**: D:4, D:2.4 (cornerstone deep-dive), D:Map providers, D:5 (license trap), E:R4

### [S33] transistorsoft/react-native-background-geolocation — cornerstone
- **URL**: `https://github.com/transistorsoft/react-native-background-geolocation`
- **Access date**: 2026-08-14
- **Tool**: GitHub REST API + npm registry
- **License**: MIT for SDK; commercial for hosted service
- **Stars**: 2.9k
- **Last commit**: 2026-08-14
- **Used by**: D:5, D:2.5 (cornerstone deep-dive), D:4, D:5, D:6

### [S34] BenjaminCanape/RunFlutterRun
- **URL**: `https://github.com/BenjaminCanape/RunFlutterRun`
- **Access date**: 2026-08-14
- **Tool**: GitHub REST API
- **License**: MIT (raw LICENSE confirmed)
- **Stars**: 116
- **Last commit**: 2024-08-10 (14 months before query — borderline stale)
- **Used by**: D:6, D:6 (cornerstone), D:7

### [S35] mo7amedaliEbaid/run-tracker
- **URL**: `https://github.com/mo7amedaliEbaid/run-tracker`
- **Access date**: 2026-08-14
- **Tool**: GitHub REST API
- **License**: Apache-2.0
- **Stars**: 27
- **Last commit**: 2024-06-22 (24 months before query — borderline stale)
- **Used by**: D:7

### [S36] AtilMohAmine/Fitness-Tracker
- **URL**: `https://github.com/AtilMohAmine/Fitness-Tracker`
- **Access date**: 2026-08-14
- **Tool**: GitHub REST API
- **License**: MIT
- **Stars**: 18
- **Last commit**: 2025-03-04
- **Used by**: D:8, D:6

### [S37] j4velin/Pedometer
- **URL**: `https://github.com/j4velin/Pedometer`
- **Access date**: 2026-08-14
- **Tool**: GitHub REST API
- **License**: Apache-2.0
- **Stars**: 1.4k
- **Last commit**: 2023-11-03 (>24 months — STALE)
- **Used by**: D:9, D:6

### [S38] jovbcorreia/GymGrind
- **URL**: `https://github.com/jovbcorreia/GymGrind`
- **Access date**: 2026-08-14
- **Tool**: GitHub REST API
- **License**: MIT (raw LICENSE confirmed)
- **Stars**: 6
- **Last commit**: 2025-04-27
- **Used by**: D:10

### [S39] danielkuhlwein/strength-training
- **URL**: `https://github.com/danielkuhlwein/strength-training`
- **Access date**: 2026-08-14
- **Tool**: GitHub REST API
- **License**: MIT
- **Stars**: 2
- **Last commit**: 2026-07-03
- **Used by**: D:11

### [S40] krokyze/FitKit (ARCHIVED)
- **URL**: `https://pub.dev/packages/fit_kit` (was `github.com/krokyze/FitKit`)
- **Access date**: 2026-08-14
- **Tool**: pub.dev API + GitHub REST API (archived)
- **License**: BSD-2-Clause
- **Stars**: 98 (archived)
- **Last commit**: 2021-04-12 (ARCHIVED — don't use)
- **Used by**: D:12

### [S41] maplibre/maplibre-react-native
- **URL**: `https://github.com/maplibre/maplibre-react-native`
- **Access date**: 2026-08-14
- **Tool**: GitHub REST API
- **License**: MIT
- **Stars**: 651
- **Last commit**: 2026-07-29
- **Used by**: D:13, D:RN packages

### [S42] maplibre/flutter-maplibre-gl
- **URL**: `https://github.com/maplibre/flutter-maplibre-gl`
- **Access date**: 2026-08-14
- **Tool**: GitHub REST API + pub.dev API
- **License**: BSD-2-Clause
- **Stars**: 356 (flutter pkg)
- **Last commit**: 2026-08-14
- **Used by**: D:14, D:Flutter packages, E:R4

### [S43] shini-tm/strava_clone
- **URL**: `https://github.com/shini-tm/strava_clone`
- **Access date**: 2026-08-14
- **Tool**: GitHub REST API
- **License**: Unlicense (public-domain-equivalent)
- **Stars**: 0
- **Last commit**: 2025-09-27
- **Used by**: D:15

### 🚨 LICENSE TRAPS (S44–S51)

### [S44] 🚨 SecUSo/privacy-friendly-pedometer — LICENSE TRAP
- **URL**: `https://github.com/SecUSo/privacy-friendly-pedometer`
- **Access date**: 2026-08-14
- **Tool**: GitHub REST API
- **License**: GPL-3.0 (raw LICENSE confirmed)
- **Trap**: Cannot ship in a closed-source commercial app without releasing entire app's source. **REJECT.**

### [S45] 🚨 cfilipov/MuscleBook — LICENSE TRAP
- **URL**: `https://github.com/cfilipov/MuscleBook`
- **Access date**: 2026-08-14
- **Tool**: GitHub REST API
- **License**: GPL-3.0 (raw LICENSE confirmed)
- **Trap**: GPL-3.0 + abandoned 2016. **REJECT.**

### [S46] 🚨 ankur874/GPS-Running-Tracker — LICENSE TRAP
- **URL**: `https://github.com/ankur874/GPS-Running-Tracker`
- **Access date**: 2026-08-14
- **Tool**: GitHub REST API
- **License**: `license=null` (no LICENSE file, GitHub REST API)
- **Trap**: All-rights-reserved by default outside US public-domain carve-out. **REJECT.**

### [S47] 🚨 azuzunaga/lucha — LICENSE TRAP
- **URL**: `https://github.com/azuzunaga/lucha`
- **Access date**: 2026-08-14
- **Tool**: GitHub REST API
- **License**: `license=null` (no LICENSE file)
- **Last commit**: 2020-07-14 (stale)
- **Trap**: Ruby/PostgreSQL/React Strava clone web only. **REJECT.**

### [S48] 🚨 etrinidad132/Esforza — LICENSE TRAP
- **URL**: `https://github.com/etrinidad132/Esforza`
- **Access date**: 2026-08-14
- **Tool**: GitHub REST API
- **License**: `license=null` (no LICENSE file)
- **Last commit**: 2023-01-19
- **Trap**: "A Strava Clone" no license. **REJECT.**

### [S49] 🚨 Borisserz/WorkoutTracker — LICENSE TRAP
- **URL**: `https://github.com/Borisserz/WorkoutTracker`
- **Access date**: 2026-08-14
- **Tool**: GitHub REST API
- **License**: `license=null` (no LICENSE file)
- **Trap**: iOS + watchOS no license. **REJECT.**

### [S50] 🚨 Cairo-Squad/EvolveFit — LICENSE TRAP
- **URL**: `https://github.com/Cairo-Squad/EvolveFit`
- **Access date**: 2026-08-14
- **Tool**: GitHub REST API
- **License**: `license=null` (no LICENSE file)
- **Trap**: Kotlin Multiplatform gym tracker no license. **REJECT.**

### [S51] 🚨 EvanBacon/apple-health — LICENSE TRAP
- **URL**: `https://github.com/EvanBacon/apple-health`
- **Access date**: 2026-08-14
- **Tool**: GitHub REST API
- **License**: `license=null` (no LICENSE file)
- **Trap**: Expo HealthKit module no license. **REJECT.**

### Honorable mentions (S52–S55)

### [S52] pr4aveen/jogzilla
- **URL**: `https://github.com/pr4aveen/jogzilla`
- **Access date**: 2026-08-14
- **Tool**: GitHub REST API
- **License**: MIT
- **Used by**: D:honourable mentions

### [S53] HHG-RunTracker/RunTracker-ReactNative
- **URL**: `https://github.com/HHG-RunTracker/RunTracker-ReactNative`
- **Access date**: 2026-08-14
- **Tool**: GitHub REST API
- **License**: `license=null`
- **Used by**: D:honourable mentions

### [S54] costiucigor/Moldava
- **URL**: `https://github.com/costiucigor/Moldava`
- **Access date**: 2026-08-14
- **Tool**: GitHub REST API
- **License**: `license=null`
- **Last commit**: 2025-05-21
- **Used by**: D:honourable mentions

### [S55] jzjonah/StravaClone
- **URL**: `https://github.com/jzjonah/StravaClone`
- **Access date**: 2026-08-14
- **Tool**: GitHub REST API
- **License**: `license=null`
- **Last commit**: 2023-05-10
- **Used by**: D:honourable mentions

### Pub.dev packages + npm packages (S56–S61)

### [S56] pub.dev `health` package
- **URL**: `https://pub.dev/packages/health`
- **Access date**: 2026-08-14
- **Tool**: pub.dev API
- **Version**: 13.3.2
- **License**: MIT (verified publisher `carp.dk`)
- **Last published**: 2026-08-14 (4h before query)
- **Note**: Removed Google Fit support in v11.0.0 (May 2024) when Google sunset new GF API access.
- **Used by**: D:3, D:2.2, D:7, D:Flutter packages, E:R4

### [S57] pub.dev `pedometer` package
- **URL**: `https://pub.dev/packages/pedometer`
- **Access date**: 2026-08-14
- **Tool**: pub.dev API
- **Version**: 4.2.0
- **License**: MIT (verified publisher)
- **Last published**: 2026-03 (5 months before query)
- **Used by**: D:Flutter packages, D:4

### [S58] pub.dev `gpx` package
- **URL**: `https://pub.dev/packages/gpx`
- **Access date**: 2026-08-14
- **Tool**: pub.dev API
- **Version**: 2.5.0
- **License**: Apache-2.0
- **Last published**: 37 days before query (2026-07)
- **Used by**: D:Flutter packages, D:7

### [S59] pub.dev `flutter_background_geolocation` package
- **URL**: `https://pub.dev/packages/flutter_background_geolocation`
- **Access date**: 2026-08-14
- **Tool**: pub.dev API
- **Version**: 5.5.0
- **License**: Apache-2.0 SDK + commercial for hosted service (Transistorsoft verified publisher)
- **Used by**: D:Flutter packages, D:7

### [S60] ticofab/android-gpx-parser
- **URL**: `https://github.com/ticofab/android-gpx-parser`
- **Access date**: 2026-08-14
- **Tool**: GitHub REST API
- **License**: Apache-2.0
- **Used by**: D:Kotlin libraries, D:5

### [S61] kingstinct/react-native-healthkit (npm)
- **URL**: npm registry (referenced via D)
- **Access date**: 2026-08-14
- **Tool**: npm registry API
- **License**: MIT
- **Used by**: D:RN packages, D:4

---

## D. Framework / architecture references (S62–S77)

### [S62] Apple HealthKit developer docs
- **URL**: `https://developer.apple.com/documentation/healthkit`
- **Access date**: 2026-08-14
- **Tool**: webfetch
- **Note**: The Apple HealthKit entry-point page. Deep API reference on `developer.apple.com/documentation/healthkit/` (per-type per-class). For CoreMotion, `developer.apple.com/documentation/coremotion`.
- **Used by**: E:1, E:5, E:R1, E:R3

### [S63] Flutter showcase (BMW, Google Pay, Alibaba)
- **URL**: `https://flutter.dev/showcase`
- **Access date**: 2026-08-14
- **Tool**: webfetch
- **Used by**: E:3, E:4

### [S64] React Native Health package (agencyenterprise)
- **URL**: `https://github.com/agencyenterprise/react-native-health`
- **Access date**: 2026-08-14
- **Tool**: GitHub REST API
- **Note**: 1.2k★, 287 forks, 890 commits, MIT
- **Used by**: E:4 (framework scoring)

### [S65] Mapbox pricing
- **URL**: `https://www.mapbox.com/pricing`
- **Access date**: 2026-08-14
- **Tool**: webfetch
- **Note**: Navigation SDK free up to 100 MAU + $0.30/user for 101+; per-trip fees scaled at 1K/50K/100K/200K. Maps SDK (not Navigation) free up to 10K MAU.
- **Used by**: E:5, E:R4

### [S66] Apple Developer Program + App Store Connect
- **URL**: `https://developer.apple.com/programs/`
- **Access date**: 2026-08-14
- **Tool**: webfetch
- **Used by**: E:5

### [S67] App Store Review Guidelines
- **URL**: `https://developer.apple.com/app-store/review/guidelines/`
- **Access date**: 2026-08-14
- **Tool**: webfetch
- **Note**: Confirms 5.1.1 (Privacy Policy required), 3.1.1 (In-App Purchase required for digital unlocks), 2.1 (App Completeness), 5.1.2 (Permission required).
- **Used by**: E:5, E:9, E:R2

### [S68] Sentry for iOS
- **URL**: `https://docs.sentry.io/platforms/apple/guides/ios/`
- **Access date**: 2026-08-14
- **Tool**: webfetch
- **Note**: Free tier: 5K events/mo, 1 project, 7-day retention.
- **Used by**: E:5, E:R5

### [S69] RevenueCat
- **URL**: `https://www.revenuecat.com/`
- **Access date**: 2026-08-14
- **Tool**: webfetch
- **Note**: Free tier until $2,500/mo tracked revenue, 127K+ apps, 3B+ API requests daily, $16B+ revenue processed.
- **Used by**: E:5

### [S70] PostHog Cloud
- **URL**: `https://posthog.com/`
- **Access date**: 2026-08-14
- **Tool**: webfetch
- **Note**: 1M events/mo free tier, EU region. Self-hosted option also available.
- **Used by**: E:5, E:R5, E:9

### [S71] MapLibre website
- **URL**: `https://www.maplibre.org/`
- **Access date**: 2026-08-14
- **Tool**: webfetch
- **Note**: BSD-2-Clause, MapLibre Native C++ library for mobile + desktop + embedded + cars, GPU-accelerated (OpenGL, Metal, Vulkan).
- **Used by**: E:R4

### [S72] Strava API Agreement
- **URL**: `https://www.strava.com/legal/api`
- **Access date**: 2026-08-14
- **Tool**: webfetch
- **Note**: "Strava reserves the right to revoke your API Token if you violate the API Agreement, including but not limited to, uses that enable virtual races or competitions and uses that replicate Strava sites, services or products."
- **Used by**: E:5, E:9

### [S73] Google Health Connect (Android)
- **URL**: `https://health.google/health-connect-android/` (canonical health-side redirect)
- **Access date**: 2026-08-14
- **Tool**: webfetch
- **Note**: `developer.android.com/health-and-wellness` returned 404 at access date. Use health-side redirect.
- **Used by**: E:5, E:9

### [S74] Apple watchOS developer docs
- **URL**: `https://developer.apple.com/watchos/`
- **Access date**: 2026-08-14
- **Tool**: webfetch
- **Used by**: E:2 (Audience — Watch SKU defer), E:E3

### [S75] Strava website (live reference)
- **URL**: `https://www.strava.com/`
- **Access date**: 2026-08-14
- **Tool**: webfetch
- **Used by**: E:E1 (reference for run-tracking app design)

### [S76] Nike Run Club website (live reference)
- **URL**: `https://www.nike.com/nrc-app`
- **Access date**: 2026-08-14
- **Tool**: webfetch
- **Used by**: E:E1 (reference for audio-coaching + streak UX)

### [S77] Research-space playbook (internal)
- **URL**: `agents_manager/memory/projects/research-space/playbook.md` (READ-ONLY)
- **Access date**: 2026-08-14
- **Tool**: internal file read
- **Note**: Three reading paths + per-table averaging discipline from prior dossier work. Reused patterns: "2026-08-13 Kotobee publishing dossier" (MENA/Arabic-market pattern), "2026-08-10 Book-to-video" (Measured-audio-first / pipeline-shape pattern), "2026-08-12 Book-selling platforms" (Two-test decision gate framing).
- **Used by**: E:cross-references, merge pass planning

---

## Cross-reference: original angle-file [Sn] mapping

For traceability, here is how each angle file's local source numbering maps to the consolidated [Sn] in this dossier.

### Angle A (app-deep-dive)
| Angle A | Dossier | Description |
|---|---|---|
| [S1] | [S1] | iTunes Lookup API for Runify |
| [S2] | [S2] | App Store listing HTML for Runify |
| [S3] | [S3] | runifyapp.com |
| [S4] | [S4] | Runify privacy policy |
| [S5] | [S5] | OneDegree Labs developer portfolio |
| [S6] | [S6] | Jina Reader App Store page |

### Angle B (ui-screens-monetization)
| Angle B | Dossier | Description |
|---|---|---|
| [S1] | [S1] | iTunes Lookup API for Runify |
| [S2] | [S2] | App Store listing HTML for Runify |
| [S3] | [S6] | Jina Reader App Store page |
| [S4] | [S14] | App icon (artworkUrl512) |
| [S5] | [S7] | Screenshot 1 (Tier II Champion II) |
| [S6] | [S8] | Screenshot 2 (Friends leaderboard) |
| [S7] | [S9] | Screenshot 3 (Profile) |
| [S8] | [S10] | Screenshot 4 (Achievements) |
| [S9] | [S11] | Screenshot 5 (Instagram share) |
| [S10] | [S3] | runifyapp.com marketing site |
| [S11] | [S14] | App icon caption |
| [S12] | [S12] | FAQ JSON-LD |
| [S13] | [S13] | Terms of Service |
| [S14] | [S4] | Privacy policy |
| [S15] | [S4] | Privacy policy (alternate URL) |

### Angle C (competitive-landscape)
| Angle C | Dossier | Description |
|---|---|---|
| [1] | [S1][S2] | Runify iTunes + App Store |
| [2] | [S15] | Strava |
| [3] | [S16] | Nike Run Club |
| [4] | [S17] | Adidas Running |
| [5] | [S18] | Runkeeper |
| [6] | [S19] | Map My Run |
| [7] | [S20] | Apple Health |
| [8] | [S21] | Apple Fitness+ |
| [9] | [S22] | Samsung Health |
| [10] | [S23] | Pacer |
| [11] | [S24] | AllTrails |
| [12] | [S25] | Google Health (Fitbit) |
| [13] | [S26] | StepsApp |
| [14] | [S27] | Codoon |
| [15] | [S28] | Footpath |
| [16] | [S77] | Playbook entry precedent |

### Angle D (open-source-alternatives)
| Angle D | Dossier | Description |
|---|---|---|
| [1] | [S29] | OpenTracks |
| [2] | [S34] | RunFlutterRun |
| [3] | [S37] | j4velin Pedometer |
| [4] | [S44] | 🚨 privacy-friendly-pedometer (license trap) |
| [5] | [S46] | 🚨 GPS-Running-Tracker (license trap) |
| [6] | [S38] | GymGrind |
| [7] | [S45] | 🚨 MuscleBook (license trap) |
| [8] | [S47] | 🚨 lucha (license trap) |
| [9] | [S35] | run-tracker |
| [10] | [S52] | jogzilla |
| [11] | [S48] | 🚨 Esforza (license trap) |
| [12] | [S31][S56] | carp `health` |
| [13] | [S51] | 🚨 EvanBacon/apple-health (license trap) |
| [14] | [S36] | AtilMohAmine Fitness-Tracker |
| [15] | [S30] | vincentneo/CoreGPX |
| [16] | [S32] | maplibre/maplibre-native |
| [17] | [S33] | transistorsoft RN bg geo |
| [18] | [S53] | RunTracker-ReactNative |
| [19] | [S49] | 🚨 WorkoutTracker (license trap) |
| [20] | [S50] | 🚨 EvolveFit (license trap) |
| [21] | [S39] | strength-training |
| [22] | (mentioned only) | mps/healthkit-run-generator |
| [23] | [S43] | shini-tm/strava_clone |
| [24] | [S54] | Moldava |
| [25] | [S55] | jzjonah/StravaClone |
| [26] | [S57] | pub.dev pedometer |
| [27] | [S58] | pub.dev gpx |
| [28] | [S59] | pub.dev flutter_background_geolocation |
| [29] | [S41] | maplibre/maplibre-react-native |
| [30] | [S42] | maplibre/flutter-maplibre-gl |
| [31] | [S60] | ticofab/android-gpx-parser |
| [32] | [S31] | carp-dk/carp-health-flutter |
| [33] | [S61] | kingstinct/react-native-healthkit |

### Angle E (build-stack-and-platform)
| Angle E | Dossier | Description |
|---|---|---|
| [S1] | [S1] | Runify App Store listing |
| [S2] | [S75] | Strava website |
| [S3] | [S76] | Nike Run Club website |
| [S4] | [S62] | Apple HealthKit docs |
| [S5] | [S31][S56] | Flutter `health` package |
| [S6] | (referenced via S5) | Flutter `health_connect` (abandoned) |
| [S7] | [S63] | Flutter showcase |
| [S8] | [S64] | React Native Health package |
| [S9] | [S65] | Mapbox pricing |
| [S10] | [S66] | Apple Developer Program |
| [S11] | [S67] | App Store Review Guidelines |
| [S13] | [S68] | Sentry for iOS |
| [S14] | [S69] | RevenueCat |
| [S15] | [S70] | PostHog Cloud |
| [S16] | [S71] | MapLibre website |
| [S17] | [S72] | Strava API Agreement |
| [S18] | [S73] | Google Health Connect |
| [S19] | [S74] | Apple watchOS developer docs |
| [S-RT-1] | (cited only in E) | Kotobee playbook Arabic pattern |

---

## Summary counts

- **Total sources consolidated**: **95** ([S1]–[S95])
- **Raw angle source markers**: **107** (after deduplication of overlapping URLs, reduced to 95; +18 new Android sources from Angle F)
- **Runify primary (S1–S14)**: 14 sources
- **Competitors (S15–S28)**: 14 sources (one per named competitor)
- **Open-source candidates (S29–S61)**: 33 sources (15 primary + 8 license traps + 10 honourable mentions)
- **Frameworks / architecture references (S62–S77)**: 16 sources
- **Android-specific sources (S78–S95)**: 18 sources (added by Angle F re-merge 2026-08-14)
- **License traps flagged**: 8 (S44–S51)

### E. Android-specific sources (S78–S95, added by Angle F re-merge 2026-08-14)

### [S78] Android 14 foreground service types (location)
- **URL**: `https://developer.android.com/about/versions/14/changes/fgs-types-required`
- **Access date**: 2026-08-14
- **Tool**: `ctx_fetch_and_index`
- **Note**: Mandatory `android:foregroundServiceType="location"` + `FOREGROUND_SERVICE_LOCATION` permission; `ACCESS_BACKGROUND_LOCATION` required for background FGS.
- **Used by**: F.1.2, F.6.1, F.13, R6

### [S79] Android location permissions + background location restrictions
- **URL**: `https://developer.android.com/training/location/permissions`
- **Access date**: 2026-08-14
- **Tool**: `ctx_fetch_and_index`
- **Note**: Permission flow for `ACCESS_FINE_LOCATION` → `ACCESS_BACKGROUND_LOCATION`; separating the while-in-use vs allow-all-the-time prompts.
- **Used by**: F.1.2, F.6.2, F.6.3, F.13

### [S80] Android foreground services overview
- **URL**: `https://developer.android.com/guide/components/foreground-services`
- **Access date**: 2026-08-14
- **Tool**: `ctx_fetch_and_index`
- **Note**: Android 14 enforcement + runtime type assertion via `ServiceCompat.startForeground`.
- **Used by**: F.1.2, F.6.1, F.13

### [S81] Android localization
- **URL**: `https://developer.android.com/training/basics/supporting-devices/languages`
- **Access date**: 2026-08-14
- **Tool**: `ctx_fetch_and_index`
- **Note**: `android:supportsRtl="true"` + `start/end` semantics + `LayoutDirection.Rtl` Composables.
- **Used by**: F.5, R7, 07.6

### [S82] Android localization guide
- **URL**: `https://developer.android.com/guide/topics/resources/localization`
- **Access date**: 2026-08-14
- **Tool**: `ctx_fetch_and_index`
- **Note**: `values-ar/` resource directory + `<plurals>` + bidirectional text handling.
- **Used by**: F.5, R7, 07.6

### [S83] Health Connect data types
- **URL**: `https://developer.android.com/health-and-fitness/health-connect/data-types`
- **Access date**: 2026-08-14
- **Tool**: `ctx_fetch_and_index`
- **Note**: `Steps`, `Distance`, `ActiveCaloriesBurned`, `HeartRate`, `ExerciseSession`, `ExerciseRoute`, `SleepSession`, `ElevationGained` + their READ/WRITE permissions.
- **Used by**: F.7.2, F.7.5, R8, 07.8

### [S84] Health Connect product page (Google Fit deprecation statement)
- **URL**: `https://health.google/health-connect-android/`
- **Access date**: 2026-08-14
- **Tool**: `ctx_fetch_and_index`
- **Note**: *"Google Fit APIs will be supported until the end of 2026."* Migration path documented.
- **Used by**: F.7.1, R8

### [S85] Kotlin programming language
- **URL**: `https://kotlinlang.org/`
- **Access date**: 2026-08-14
- **Tool**: `ctx_fetch_and_index`
- **Note**: Kotlin Multiplatform + Android Compose-first positioning.
- **Used by**: F.2.2, R1, 07.3

### [S86] Health Services on Wear OS
- **URL**: `https://developer.android.com/training/wearables/health-services`
- **Access date**: 2026-08-14
- **Tool**: `ctx_fetch_and_index`
- **Note**: `ExerciseClient` for live run tracking + `MeasureClient` for spot HR + `PassiveMonitoringClient` for 24/7 background.
- **Used by**: F.3.3, F.9, R10, 07.10

### [S87] Android string resources
- **URL**: `https://developer.android.com/guide/topics/resources/string-resource`
- **Access date**: 2026-08-14
- **Tool**: `ctx_fetch_and_index`
- **Note**: `plurals` element + ICU MessageFormat for Arabic plurals (zero, one, two, few, many, other).
- **Used by**: F.5.3, R7, 07.6

### [S88] Android Health Connect developer hub
- **URL**: `https://developer.android.com/health-and-fitness/health-connect`
- **Access date**: 2026-08-14
- **Tool**: `ctx_fetch_and_index`
- **Note**: Entry point for HC integration (redirects from the old `/health/connect` URL).
- **Used by**: F.7.1, R8, 07.8

### [S89] Google Play Billing
- **URL**: `https://developer.android.com/google/play/billing`
- **Access date**: 2026-08-14
- **Tool**: `ctx_fetch_and_index`
- **Note**: *"By Aug 31, 2026, all new apps and updates to existing apps must use Billing Library version 8 or later."* Play Billing Library v8 mandatory.
- **Used by**: F.8.1, R9, 07.9

### [S90] Google Play Console
- **URL**: `https://play.google.com/console/about/`
- **Access date**: 2026-08-14
- **Tool**: `ctx_fetch_and_index`
- **Note**: Android 17 memory efficiency + new SDK requirements.
- **Used by**: F.13, 07.13 Steps 19/22

### [S91] Google Play Console developer account + billing
- **URL**: `https://support.google.com/googleplay/android-developer/answer/9859152`
- **Access date**: 2026-08-14
- **Tool**: `ctx_fetch_and_index`
- **Note**: One-time $25 developer registration fee, app creation flow.
- **Used by**: F.13, OQ-F3, 07.9

### [S92] Android 13 notifications permission
- **URL**: `https://developer.android.com/about/versions/13/changes/notification-permission`
- **Access date**: 2026-08-14
- **Tool**: `ctx_fetch_and_index`
- **Note**: `POST_NOTIFICATIONS` runtime permission required for Android 13+.
- **Used by**: F.6.2, F.13, 07.7

### [S93] Wear OS official
- **URL**: `https://developer.android.com/wear`
- **Access date**: 2026-08-14
- **Tool**: `ctx_fetch_and_index`
- **Note**: Wear OS developer portal; Health Services + Compose for Wear OS + Watch Face Format.
- **Used by**: F.9, R10, 07.10

### [S94] Jetpack Compose
- **URL**: `https://developer.android.com/jetpack/compose`
- **Access date**: 2026-08-14
- **Tool**: `ctx_fetch_and_index`
- **Note**: Compose BOM + Material 3 + Compose Compiler + Kotlin alignment.
- **Used by**: F.2.2, R1, 07.3, 07.13 Step 1

### [S95] Play Store Console About
- **URL**: `https://play.google.com/console/about/`
- **Access date**: 2026-08-14
- **Tool**: `ctx_fetch_and_index`
- **Note**: Essential steps + Android 17 memory guidance + sign-up for developer updates.
- **Used by**: F.13, 07.13 Step 22

---

## Re-merge addendum (2026-08-14, Angle F)

**Pivot**: iOS-first (Angle E) → Android-first (Angle F). The iOS-first plan is preserved as the v2 reference (~280 wh ≈ 7 wk via KMP + SwiftUI rewrite). The Android-first plan is the active v1 plan (~440 wh ≈ 11–12 wk core + 13–14 wk total).

**Sources added**: 18 new Android-specific sources (S78–S95). All cited existing sources (S8-S77) are preserved with original numbering. No existing source was removed or renamed.

**New chapters**: Chapter 07 (`07_android_build_plan.md`, ~75 KB) — the active v1 build plan with 22 steps + 10 irreversible decisions. Chapters 01–06 are unchanged from the original merge pass and are framework-agnostic (except chapter 05 which is labeled "iOS v2 reference").

**Angle F source mapping** (Angle F → consolidated):

| Angle F | Dossier | Description |
|---|---|---|
| [1] | [S78] | Android 14 FGS types |
| [2] | [S79] | Android location permissions |
| [3] | [S80] | Android foreground services overview |
| [4] | [S81] | Android localization |
| [5] | [S82] | Android localization guide |
| [6] | [S83] | Health Connect data types |
| [7] | [S84] | Health Connect product page |
| [8] | [S56] | pub.dev `health` package (Google Fit deprecation statement) |
| [9] | [S56] | pub.dev `health` (Android setup section) |
| [10] | [S32] | maplibre/maplibre-native (Android setup) |
| [11] | [S64] | matinzd/react-native-health-connect (via agencyenterprise README) |
| [12] | [S85] | Kotlin programming language |
| [13] | [S86] | Health Services on Wear OS |
| [14] | [S87] | Android string resources |
| [15] | [S88] | Android Health Connect developer hub |
| [16] | [S56] | pub.dev `health` (manifest requirement) |
| [17] | [S89] | Google Play Billing |
| [18] | [S69] | RevenueCat documentation |
| [19] | [S12] | Runify FAQ JSON-LD (pricing parity) |
| [20] | [S29] | OpenTracks |
| [21] | [S36] | AtilMohAmine Fitness-Tracker |
| [22] | [S90] | Google Play Console |
| [23] | [S91] | Google Play Developer account + billing |
| [24] | [S92] | Android 13 notifications permission |
| [25] | [S93] | Wear OS official |
| [26] | [S94] | Jetpack Compose |
| [27] | [S71] | MapLibre website |
| [28] | [S95] | Play Store Console About |
| [29] | [S77] | Research-space playbook (Kotobee MENA pattern) |

---

*Last updated: 2026-08-14 — Author: am-research re-merge for T-2026-08-14-004 (Android pivot) — Source angles: A, B, C, D, E, F*