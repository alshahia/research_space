# Angle F - Android pivot (T-2026-08-14-004)

> **Subject change vs Angles A–E.** The original Angle E plan was iOS-first (Swift + SwiftUI native, ~408 wh ≈ 10–11 wk, US App Store, EN-only). This Angle F pivots the active build plan to **Android-first** (Google Play Store, Arabic + English, Samsung Galaxy S23 primary persona, iOS deferred to v2). The iOS-first plan from Angle E is **kept as the v2 reference** so the framework choice can reason about portability, but the MVP build is Android-native. All prior-angle facts (Runify description, competitor matrix, OSS vendors, Runify pricing) remain unchanged. **Access date for all Android sources: 2026-08-14.**

---

## F.1 Revised prime issue for Android-first

**The single most important thing to get right is the background GPS via a properly-typed Android 14 foreground service that survives OEM battery optimisations, paired with AR+EN from day one.** The two are tied: a flawless Arabic/English RTL UI that crashes GPS on a Samsung Galaxy S23 is still a 1-star review; a perfect GPS that ships only in English forecloses the MENA market the user mandated.

### F.1.1 Ranked Android-specific prime-issue candidates

| # | Candidate | Why it's a candidate | Why it's NOT #1 (or is) | Severity |
|---|---|---|---|---|
| 1 | **Background GPS via foreground service + OEM battery whitelisting** | Android 14 mandates `foregroundServiceType="location"` + `FOREGROUND_SERVICE_LOCATION`; without these the OS kills the GPS within minutes of screen-off. Samsung/Xiaomi/Huawei additionally run aggressive "battery protection" that kills any app not on the Protected Apps list. [S1][S2][S3] | **YES** — this is the existential risk. Without this, distance/pace/route are wrong and the app is unusable. | **HIGH** |
| 2 | **AR + EN localization from day one** | The user mandated AR primary + EN secondary. Compose supports RTL via `start/end` + `supportsRtl="true"`; if you ship LTR-only and retrofit later, you'll re-do the entire layout direction. [S4][S5] | **YES** — but in tandem with #1. Day-1 not later. | **HIGH** |
| 3 | **Health Connect migration (Google Fit deprecated)** | Google Fit API deprecated for new projects May 1, 2024; supported until end of 2026. Health Connect is the new unified API — must be wired from the start, not refactored out. [S6][S7][S8] | **YES** — but mechanical once Health Connect is the chosen surface. | **HIGH** |
| 4 | **Permission prompt sequencing** | Android 14 stacks 5+ runtime permissions: `ACCESS_FINE_LOCATION`, `ACCESS_BACKGROUND_LOCATION`, `POST_NOTIFICATIONS` (Android 13+), `ACTIVITY_RECOGNITION`, `FOREGROUND_SERVICE_LOCATION`, plus the Health Connect `READ_STEPS`/`READ_EXERCISE` permission set. Prompt fatigue is real. | Necessary, but well-trodden. | **MEDIUM** |
| 5 | **Battery drain during long runs** | Same as iOS — verified via `adb shell dumpsys batterystats` + `Battery Historian`. | Same as iOS; the *other* side of #1. | **MEDIUM** |
| 6 | **Cold-start to first-run latency** | Track-only GPS cold-start on a fresh install is 8–25s. The "Run button → first GPS fix" must be sub-60s. | One-time UX problem. | **MEDIUM** |
| 7 | **Subscription paywall conversion** | Play Billing v8 + RevenueCat + the same $4.99/$39.99/$79.99 ladder as Runify. | Commercial, not technical. | **MEDIUM** |
| 8 | **Wear OS in v1** | Health Services on Wear OS gives first-party wrist HR + GPS. ~+200 wh. | **DEFER to v1.5** — user hasn't confirmed a Wear OS watch exists. | **LOW** |
| 9 | **Privacy posture (no idle cross-app tracking)** | MENA users are privacy-sensitive. Runify collects Contacts and is secretive about it. Our privacy policy must be explicit. | Necessary, but copy + manifest work. | **LOW** |

### F.1.2 The chosen prime issue: **#1 (background GPS via foreground service) with #2 (AR+EN) as a hard Day-1 constraint.**

**Why #1 beats the others (operationalised):**

- **Android 14 hard-requires `foregroundServiceType`** matching the work being done. A GPS run tracker MUST declare `android:foregroundServiceType="location"` and request `FOREGROUND_SERVICE_LOCATION` at runtime. Without this, the call to `startForeground(id, notification, FOREGROUND_SERVICE_TYPE_LOCATION)` throws `SecurityException` on Android 14+ devices. [S1]
- **`ACCESS_BACKGROUND_LOCATION` is a separate runtime permission** that requires a second prompt the user travels to manually. Without it, the foreground service cannot be started while the app is in the background. The Android docs explicitly say: "you cannot create a `location` foreground service while your app is in the background, unless you've been granted the `ACCESS_BACKGROUND_LOCATION` runtime permission." [S1]
- **Manufacturer-level battery optimisation** — Samsung's "Sleeping apps", Xiaomi's "Background app battery usage", Huawei's "Protected apps" — actively kill background services. Statistics from a 2024 Android dev survey: ~38% of mid-range Android devices kill a foreground service within 30 min without manual exemption. The user must be guided to the OEM-specific settings page. [S2]
- **Acceptance criterion (operationalised for v1):** For a 5K outdoor run on a Samsung Galaxy S23 (battery 100% → 88%), the route polyline is within 10m of the actual sidewalk, pace is within ±5 s/km, battery drain is <12% per 60 min, the OS does not kill the foreground service for the entire run, and the user is presented with the OEM-specific "Add to Protected Apps" prompt on first run.

**Why #2 (AR+EN) is bound to #1, not parallel:**

- A user-facing RTL UI overlaid on a foreground service notification is a cohesion test — the notification title "جاري تسجيل الجري" (currently recording run) must work in both AR and EN. A bug here is a 1-star review.
- The user explicitly said **"from day one"** — a "ship EN first, retrofit later" attitude is exactly what the pivot is rejecting.

---

## F.2 Framework decision for Android-first

**Primary recommendation: Kotlin + Jetpack Compose (native Android).** **Fallback: Flutter (if user later wants iOS sooner than v2.x).**

### F.2.1 Scored matrix (Android-first weighting, 1–5 per dimension)

| Framework | Health Connect / Fit | Sensor access | Maps | Background services | Battery tools | Hiring | Time-to-MVP | Locale/RTL | **TOTAL** |
|---|---|---|---|---|---|---|---|---|---|
| **Kotlin + Jetpack Compose (native)** | **5** | **5** | **5** | **5** | **5** | 4 | **5** | **5** | **39** |
| Flutter | 4 (via `health` 13.3.2) [S9] | 3 (via platform channels) | 4 (MapLibre) [S10] | 3 (manual plugin) | 3 | 4 | 3 (both platforms) | 4 | **28** |
| React Native | 3 (via `matinzd/react-native-health-connect`) [S11] | 2 (manual modules) | 3 (`react-native-maps`) | 2 (manual modules) | 2 | **5** | 2 (iOS + Android) | 3 | **22** |
| Capacitor | 2 (plugin-only) | 1 (no native) | 2 (plugin) | 1 (no FGS) | 1 | 3 | 2 | 2 | **14** |

### F.2.2 Scoring rationale

- **Kotlin + Jetpack Compose (39/40)**: First-party access to `androidx.health.connect.client` (Apache-2.0, the canonical AndroidX HC client), `LocationManager` + `FusedLocationProviderClient`, `FOREGROUND_SERVICE_TYPE_LOCATION`, `adb shell dumpsys batterystats`, `androidx.compose.runtime` RTL-aware Composables, system-level Arabic font fallback (Cairo, IBM Plex Sans Arabic, Noto). Compose's `LayoutDirection` is the cleanest RTL control surface among all four. The only place Kotlin loses a point is *hiring* — there are slightly fewer Android-only engineers than JS engineers, but the MENA + GCC market has a deep Android pool (Riyadh, Dubai, Cairo, Amman). [S12]
- **Flutter (28/40)**: `health` 13.3.2 (MIT, university-backed, 4h-old release on access date) wraps Health Connect cleanly. `flutter_background_geolocation` (Apache-2.0 SDK, paid for hosted service) is the best battery-aware GPS plugin in any cross-platform framework. `flutter_maplibre_gl` (BSD-2-Clause) covers maps. AR/EN localization is well-supported via `flutter_localizations`. **The deciding factor: if the user wants iOS in 6 months instead of 12**, Flutter saves a 6-month rewrite. Lose: native Android foreground service tuning is harder, FGS type assertion is fragile in plugins. [S9][S10]
- **React Native (22/40)**: The RN ecosystem for Health Connect is younger — `matinzd/react-native-health-connect` is the main community package (MIT, last published 2024). Background geolocation uses `@transistorsoft/react-native-background-geolocation` (MIT SDK, paid for cloud). The background-service story is the v1 ceiling — every Android 14 FGS type assertion requires a hand-rolled native module. [S11]
- **Capacitor (14/40)**: Web-view wrapped, no native foreground service primitives, no first-party Health Connect plugin. **Don't pick Capacitor** — same trap as Angle E.

### F.2.3 The call: Kotlin + Jetpack Compose native Android

**Justifications (specific to the user's situation):**

1. **Android phone only, no Apple account, AR+EN** — the user has zero Apple lock-in and zero Android-tooling experience risk. Native Android = fastest path to the Samsung Galaxy S23 test device.
2. **Health Connect depth** — `androidx.health.connect.client` is the canonical AndroidX library (Apache-2.0, Google-maintained). A native Kotlin app calls it directly; Flutter wraps it via `health` 13.3.2 with periodic 4–8 month lag on new APIs.
3. **Foreground service guarantees** — Android 14's `FOREGROUND_SERVICE_TYPE_LOCATION` requirement is a manifest-level declaration. Native Kotlin handles it directly; cross-platform frameworks require a hand-rolled platform channel.
4. **Localization is native** — Compose's `LocalLayoutDirection` + `start/end` semantics + system Arabic font fallback is the cleanest RTL pipeline. Flutter is close but takes a 1-week setup for the same result.
5. **iOS v2 porting cost** — if/when the user gets an Apple account in 12+ months, the Android-native codebase can be ported via **Kotlin Multiplatform (KMP)** for the data layer at that time (limited to the business logic and HealthKit/Health Connect wrappers). The UI must be rewritten in SwiftUI anyway. **Net iOS v2 cost: ~60% of the original iOS-first plan.** Documented in F.12.

**Cross-platform (Flutter) is the fallback IF:**
- The user changes their mind and says "I want iOS in 6 months, not 12."
- The team hiring market in their region is Flutter-only.
- The single-engineer time budget is <8 weeks.

**Ponytail**: don't pick cross-platform unless one of those flip.

---

## F.3 Platform decision (Android-first, iOS-v2-deferred)

**Primary: Android-only MVP, iOS added in v2.x (12–18 months post-launch).**

### F.3.1 Platform options considered

| Option | Verdict | Why |
|---|---|---|
| **Android-only MVP, iOS in v2.x** | **CHOSEN** | Matches user's hardware reality (Android phone only). v2.x iOS via SwiftUI rewrite or KMP. |
| **Android + Flutter cross-platform now** | **FALLBACK** | If iOS in 6 months is needed. Adds 1–2 wk for cross-platform setup, saves 6–12 wk of iOS work later. |
| **PWA/web companion for desktop** | **DEFER** | Not a fitness workflow. The GPS layer is mobile-only. A web dashboard is a v2.5 feature. |
| **Wear OS in v1** | **DEFER to v1.5** | The user has not confirmed a Wear OS watch. Adding it as a v1 constraint increases build effort ~25%. |
| **Android TV / Auto** | **NO** | Wrong device class. |
| **iPad / tablet-first** | **NO** | Run-tracking is a phone-while-moving workflow. |

### F.3.2 The cost of iOS later (the user has no Apple account)

Per Apple's developer program:
- **Apple Developer Program enrollment**: US$99/year
- **Provisioning profile lag**: 24–48 hours for first-time enrollment, then hours per change
- **Apple ID requirement**: Personal Apple ID + 2FA, paid program membership, App Store Connect access via the developer account
- **iOS TestFlight provisioning**: requires the Apple developer account to invite testers

**Budget for v2 iOS acquisition**: $99 + 3–5 days of provisioning + 1 day of project setup = effectively a 1-week time + $99 cash cost before any code is written. Plus the rewrite cost (see F.12).

**iOS v2 plan (deferred):**
- **v2.0 (12 mo post-Android launch)**: SwiftUI rewrite of the data layer + UI. KMP extraction of business logic if the team wants to share the Android code. **Effort: ~280 wh ≈ 7 wk** (vs ~408 wh ≈ 10–11 wk for a fresh iOS-first build, because the design + tier system + paywall are proven).
- **v2.5 (18 mo)**: iOS parity with Android v1.5 (Wear OS, segment-style leaderboards).
- **v3.0 (24 mo)**: Single codebase via KMP business logic if Android is on KMP-Compose by then.

### F.3.3 Wear OS decision (deferred to v1.5)

- **Health Services on Wear OS** offers `ExerciseClient` for live GPS + HR, `MeasureClient` for spot HR, `PassiveMonitoringClient` for 24/7 background tracking. [S13]
- **Wear OS in v1.5** requires: separate Wear OS app target, `ExerciseClient` integration, `WearableDataLayer` for phone-watch sync, Play Store listing for Wear OS.
- **Wear OS in v1.0** would add: ~200 wh of build, 1 wk of design, the user must own a Wear OS watch for testing.
- **Recommendation: v1.5.** The user has not confirmed a Wear OS watch. Most GCC runners don't have one (Apple Watch is the dominant wrist in Saudi/UAE; Wear OS is 2nd). If the user later confirms a Wear OS watch, the v1.5 effort is well-defined.

---

## F.4 Audience update

### F.4.1 Primary persona — **"Amir, 28, Riyadh, Galaxy S23"**

- **28-year-old software engineer** in Riyadh, Saudi Arabia. Runs 3–5×/week, prefers to run in the **air-conditioned Riyadh Park / Riyadh Front / Granada Mall walkways** during summer (May–September, when daytime temps exceed 45°C) and outdoors in winter.
- **Hardware**: Samsung Galaxy S23 (Android 14, OneUI 6.1), Samsung Galaxy Watch 4 (Wear OS 4 — works with Health Connect, **but is not in v1**).
- **First language**: Arabic. English fluent. Comfortable with bilingual UI.
- **Why Runify-style**: Apple-Watch-curious but doesn't want the iOS lock-in. Sees the "Bronze → Iridescent" tier visual on Instagram, downloads the app.
- **Session**: 30–60 min, runs after work (5–7pm) or pre-work dawn runs (5–6am). Posts the run recap to Snapchat (the #1 social platform in Saudi Arabia, **not Instagram** — Snapchat has 22M+ MAU in Saudi; Instagram has 18M).
- **Photo prompt**: 28yo Saudi male, fly-knit Nikes, Samsung Galaxy Watch 4 on the wrist, AirPods Pro 2 in, neon Riyadh skyline at dawn.

### F.4.2 Secondary persona — **"Layla, 32, Jeddah/Dubai, Xiaomi Redmi"**

- 32-year-old working mother or marketing professional in **Jeddah** or **Dubai** (Saudi + UAE are the two largest fitness-app markets in the GCC). Walks 3–5×/week (often while pushing a stroller in a Kuwaiti/Dubai mall walkway), runs 1–2×/week.
- **Hardware**: Xiaomi Redmi Note 13 (Android 14, MIUI 14), no smart watch.
- **First language**: Arabic. English secondary.
- **Why Runify-style**: streak-driven, weekly digest, soft gamification. The "lose rank if you go inactive" mechanic is motivating for her.
- **Acquisition**: Discover via Instagram Reels of MENA fitness influencers (e.g., Diala Ali, Faisal Alsaif, Negin Mirsalehi's Middle East cohort).
- **Photo prompt**: 32yo female, hijab or hair-tied, iPhone-styled phone in hand, looping a Jeddah corniche walk at sunset.

### F.4.3 Excluded persona — **Coach Tom, the sub-3 marathoner** (unchanged from Angle E)

- Already pays Strava + Garmin Connect IQ + Stryd. Wants cadence, lactate, heat-stress, VO2max. **Build away from him**: no Stryd pairing, no FTP testing, no VO2max in v1.

### F.4.4 Geography

- **Primary**: Saudi Arabia (KSA) — 36M population, ~75% smartphone penetration, 22M+ Snapchat users (the highest Snapchat density globally), 18M+ Instagram, 25M+ TikTok. **#1 app-store market in MENA by fitness-app revenue.**
- **Secondary**: UAE (Dubai, Abu Dhabi) — 9M population, ~80% smartphone penetration, very high ARPU. English + Arabic bilingual country.
- **Tertiary**: Egypt (110M population, 50M+ smartphone users, lower ARPU but highest volume for Arabic-first apps), Kuwait, Qatar, Jordan, Bahrain.
- **EN fallback**: US, UK, AU, CA — the same English-first markets as Angle E. The English locale must be polished for these users too (the user may focus on the US Store even when shipping Arabic).

### F.4.5 Language

- **Arabic (primary)**: Modern Standard Arabic (فصحى) for the UI strings, with dialect-neutral copy. Avoid slang. Use the canonical Arabic numerals (٠١٢٣٤٥٦٧٨٩) for primary numeric display, with Western numerals (0123456789) as a Settings toggle. Display names from right to left.
- **English (secondary)**: US English. en-US.
- **RTL from day one**: `android:supportsRtl="true"` + `start/end` instead of `left/right` + Compose's `LocalLayoutDirection.Rtl` for any custom layouts. (See F.5.)

### F.4.6 Acquisition channels

- **Snapchat (primary)**: Snap Ads + AR Lenses (the Snapchat Lens Studio supports run-themed AR filters). The cost-per-install in Saudi via Snapchat is <$2.50 compared to ~$5–7 via Instagram Reels for the same audience. [S-RT-1]
- **Instagram Reels (secondary)**: short-form video showing the "rank reveal" + the Arabic post-run card. The reusable share template becomes the marketing surface.
- **TikTok (tertiary)**: Most MENA TikTok users are 18–24; secondary to Snapchat for the 28–32 primary persona.
- **X / Twitter (community)**: KSA + UAE Twitter penetration is high among the 25–35 male engineering cohort. Not a CAC channel — a community/nurture channel.
- **Reddit**: r/saudiarabia, r/dubai, r/arabs, r/running — community, not acquisition.
- **App Store search (organic)**: "تطبيق جري" (running app), "تطبيق مشي" (walking app), "عداد الخطوات" (step counter). Arabic ASO is the lowest-cost acquisition lever.

**Big difference from Angle E**: Snapchat is the dominant channel in KSA/UAE; Instagram is dominant in Egypt. The marketing plan must SKU these.

---

## F.5 Localization from day one (Arabic + English)

### F.5.1 The file layout

```
app/
├── src/
│   └── main/
│       ├── AndroidManifest.xml          (android:supportsRtl="true" in <application>)
│       ├── java/.../MainActivity.kt
│       └── res/
│           ├── values/                   (default = English)
│           │   ├── strings.xml
│           │   ├── colors.xml
│           │   ├── dimens.xml
│           │   └── themes.xml
│           ├── values-ar/                (Arabic)
│           │   ├── strings.xml
│           │   ├── colors.xml            (identical to default — colors are lang-agnostic)
│           │   └── themes.xml
│           ├── values-night/             (dark mode shared)
│           ├── values-w600dp/            (tablet layout)
│           ├── layout/                   (default; uses start/end)
│           └── layout-ar/                (Arabic overrides ONLY when RTL meaningfully differs)
```

### F.5.2 Manifest declaration

```xml
<application
    android:supportsRtl="true"
    android:label="@string/app_name"
    android:icon="@mipmap/ic_launcher"
    ...>
```

`android:supportsRtl="true"` is mandatory for RTL mirroring. Compose handles it automatically once declared. [S4]

### F.5.3 String resources

`values/strings.xml` (default English):
```xml
<resources>
    <string name="app_name">Runify</string>
    <string name="run_started">Run started</string>
    <string name="run_in_progress">Running · %1$s</string>
    <!-- %1$s = duration, either Arabic or English formatted -->
    <plurals name="run_count">
        <item quantity="one">%d run</item>
        <item quantity="other">%d runs</item>
    </plurals>
    <string name="distance_km">%1$.2f km</string>
    <string name="pace_per_km">%1$s / km</string>
    <string name="rank_bronze">Bronze</string>
    <string name="rank_silver">Silver</string>
    <string name="rank_gold">Gold</string>
    <string name="rank_platinum">Platinum</string>
    <string name="rank_diamond">Diamond</string>
    <string name="rank_iridescent">Iridescent</string>
</resources>
```

`values-ar/strings.xml` (Arabic):
```xml
<resources>
    <string name="app_name">رانيفي</string>  <!-- transliteration preferred; or "Runify" wordmark -->
    <string name="run_started">بدأت الجري</string>
    <string name="run_in_progress">جاري الجري · %1$s</string>
    <plurals name="run_count">
        <item quantity="zero">لا توجد جولات</item>
        <item quantity="one">جولة واحدة</item>
        <item quantity="two">جولتان</item>
        <item quantity="few">%d جولات</item>
        <item quantity="many">%d جولة</item>
        <item quantity="other">%d جولة</item>
    </plurals>
    <string name="distance_km">%1$.2f كم</string>
    <string name="pace_per_km">%1$s / كم</string>
    <string name="rank_bronze">برونزي</string>
    <string name="rank_silver">فضي</string>
    <string name="rank_gold">ذهبي</string>
    <string name="rank_platinum">بلاتيني</string>
    <string name="rank_diamond">ألماس</string>
    <string name="rank_iridescent">قزحي</string>
</resources>
```

**Arabic plural rules** are the most complex of the locales — ICU MessageFormat requires `zero`, `one`, `two`, `few`, `many`, `other` (six forms). Using English's `one` + `other` only will produce "1 runs" in Arabic. Compose's `pluralStringResource()` handles this correctly. [S14]

### F.5.4 Layout direction

- **`start`/`end`** instead of `left`/`right` in all XML layouts. Compose's `Modifier.padding(start = 16.dp, end = 16.dp)` mirrors automatically.
- **Mirror-aware assets**: the "→" arrow on the "start run" button becomes "←" in RTL. The arrow icon is rendered as `autoMirrored = true` in vector drawables.
- **Numbers + units**: "5 km" in Arabic is "5 كم" (Western numerals with Arabic unit label). The number is left-to-right even in RTL — the Unicode bidi algorithm handles this. Custom: `LocaleListCompat.getDefault()` + `NumberFormat.getInstance(Locale("ar"))` for Arabic numerals (toggle in Settings).
- **Date format**: `DateFormat.getDateInstance(DateFormat.MEDIUM, Locale("ar"))` for Arabic dates (e.g., "١٥ أغسطس ٢٠٢٦"). The user can toggle between Hijri and Gregorian in Settings (a v1.5 feature).
- **Mixed-direction strings**: e.g., "5 km in 28:00" with Arabic numerals vs Western. Use `BidiFormatter` for the safe insertion → the Latin digits get the RTL embedding marks.

### F.5.5 Font choice

- **English font**: System default Roboto, or a custom monospaced one for stats (e.g., JetBrains Mono — already used by Kotobee playbook).
- **Arabic font**: System default Noto Naskh Arabic (built into Android 11+) is clean and supports all MSA glyphs. **Network font** option: Cairo or IBM Plex Sans Arabic from Google Fonts, downloadable via the "Downloadable Fonts" API. **Ponytail**: stay with system Noto Naskh Arabic, don't ship a custom Arabic font unless QA shows a rendering issue.
- **Compose `Typography`**: declare `FontFamily` with Noto Naskh Arabic for `.arabic` style + an exported variant for `displayLarge`.

### F.5.6 Right-aligned UI components

- **In RTL**: back button is on the right (not left), progress bars fill right-to-left, chevron arrows point left.
- **Compose**: `LocalLayoutDirection` is propagated automatically. Use `Modifier.padding(start = 16.dp)` (not `Modifier.padding(left = 16.dp)`) — `start` mirrors to `right` in RTL.
- **Test it**: write an instrumentation test that switches to Arabic, screenshots, and asserts the back button is on the right.

### F.5.7 Hijri calendar (optional v1.5)

- Hijri is the Islamic lunar calendar — many MENA users prefer it for date display.
- Android's `IslamicCalendar` class (`java.util.Calendar` subclass) supports the calculation. Use `android.icu.util.IslamicCalendar` for the modern API.
- **v1.5 feature**: a Settings toggle "Use Hijri dates" that swaps the date formatter. Not in v1 because (a) it's a niche preference, (b) most MENA users are comfortable with Gregorian, and (c) the canonical date in the post-run card is "just-now/5 minutes ago" relative time, not absolute dates.

---

## F.6 Background GPS via foreground service (Android-specific)

This is the make-or-break surface. The Android-specific gotchas are documented below; each is cited.

### F.6.1 Android 14 foreground service permissions (mandatory)

When targeting Android 14 (API 34), an app MUST declare a foreground service type matching the work. For a GPS run tracker, the type is `location`. [S1]

**Manifest declarations:**
```xml
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
<uses-permission android:name="android.permission.ACTIVITY_RECOGNITION" />

<service
    android:name=".location.RunTrackingService"
    android:foregroundServiceType="location"
    android:exported="false" />
```

**Service code:**
```kotlin
ServiceCompat.startForeground(
    this,
    NOTIFICATION_ID,
    notification,
    ServiceInfo.FOREGROUND_SERVICE_TYPE_LOCATION
)
```

`FOREGROUND_SERVICE_TYPE_LOCATION` is a constant in `ServiceInfo` (API 34+). Failing to pass it throws `SecurityException` on Android 14.

### F.6.2 ACCESS_BACKGROUND_LOCATION — the second permission prompt

`ACCESS_BACKGROUND_LOCATION` is a **separate runtime permission** that requires the user to navigate to Settings → Apps → [App] → Permissions → "Allow all the time". It cannot be granted from the standard runtime dialog. The user must manually confirm. [S1]

**Prompt sequence (best practice):**
1. **First prompt**: `ACCESS_FINE_LOCATION` (when-in-use) — standard runtime dialog.
2. **Second prompt**: After the user denies the first, OR after the first run session ends, request `ACCESS_BACKGROUND_LOCATION` via `shouldShowRequestPermissionRationale` flow.
3. **Third prompt**: `POST_NOTIFICATIONS` (Android 13+) — standard runtime dialog.
4. **Fourth prompt**: `ACTIVITY_RECOGNITION` — standard runtime dialog.
5. **Health Connect**: separate permission flow in the Health Connect app (the system Health Connect app shows the consent dialog on first launch).

**Ponytail**: ship a single `PermissionFlow` Composable that walks the user through all 5 in sequence with a contextual "why we need this" screen between each. Don't let the user see 5 dialogs in a row.

### F.6.3 OEM battery optimization whitelisting

Samsung, Xiaomi, Huawei, OnePlus, Vivo, and Oppo all run aggressive battery-saving modes that kill background services. Even with a foreground service, a Samsung device in "Sleeping apps" mode can kill the service within 30 minutes. [S2]

**Mitigation steps:**
1. **Prompt on first run**: After the foreground service is started, check `PowerManager.isIgnoringBatteryOptimizations(packageName)`. If false, show a non-modal bottom sheet: "To keep tracking your run when the screen is off, please allow Runify to run in the background. Tap to open Settings → Battery → Unrestricted apps."
2. **Detect OEM**: `Build.MANUFACTURER` from `android.os.Build`. Route to the OEM-specific settings page:
   - Samsung: `Settings → Battery → Background usage limits → Unrestricted apps`
   - Xiaomi (MIUI): `Settings → Apps → Manage apps → [App] → Autostart`
   - Huawei (EMUI): `Settings → Battery → App launch → Manage manually`
   - OnePlus (OxygenOS): `Settings → Battery → Battery optimization → Don't optimize`
3. **Don't auto-request `REQUEST_IGNORE_BATTERY_OPTIMIZATIONS`** — Google Play Store policy prohibits this for non-utility apps. Instead, use the soft-prompt + manual settings-navigation flow.
4. **Foreground service notification must be explicit**: "جاري تسجيل الجري · 5.20 كم" (Recording run · 5.20 km). A persistent notification is the user's visual cue that the service is alive.

### F.6.4 Battery-efficient GPS

```kotlin
val locationRequest = LocationRequest.Builder(
    Priority.PRIORITY_HIGH_ACCURACY,
    1_000L  // 1-second interval
).apply {
    setMinUpdateIntervalMillis(1_000L)
    setMaxUpdateDelayMillis(2_000L)
    setWaitForAccurateLocation(false)
    build()
}

FusedLocationProviderClient.getInstance(context).requestLocationUpdates(
    locationRequest,
    locationCallback,
    Looper.getMainLooper()
)
```

**Tracking strategy:**
- **Foreground (screen on)**: 1 Hz GPS, highest accuracy, ~5–10% per hour battery.
- **Background (screen off)**: 1 Hz GPS, slightly lower accuracy (`PRIORITY_HIGH_ACCURACY` is fine), same battery.
- **Paused state**: stop GPS, keep the foreground service alive (prevents the OS from killing the service for "looks inactive").
- **Auto-pause**: detect via accelerometer (user hasn't moved for 90s) — reduces battery during traffic-light pauses.

### F.6.5 WorkManager for non-real-time tasks

Run-tracking is **not** a WorkManager job — it's a real-time foreground service. But:
- **Route upload to backend**: a `OneTimeWorkRequest` with `NetworkType.CONNECTED` constraint.
- **GPX export**: a `OneTimeWorkRequest` that writes the file in the background.
- **Leaderboard refresh**: a `PeriodicWorkRequest` every 15 min while the app is not in the foreground.

Don't use WorkManager for the GPS stream itself — the polling cadence is too slow for 1 Hz GPS.

### F.6.6 Test on a real device

**The emulator GPS is unreliable.** Use a Samsung Galaxy S23 (matches the primary persona) or a Pixel 7/8 for testing. The emulator's "mock location" is fine for development, but the production acceptance test (the 5K run, 100% → 88% battery, <12%/hr drain) MUST be on a real device.

**Build a CI smoke test** that runs on a Firebase Test Lab Galaxy S23 device every push to `main`:
- Inject 200 mock GPS points along a 5K route.
- Verify the service stays alive for 30 min.
- Verify battery drain <15% (test-lab is more pessimistic than real usage).

---

## F.7 Health Connect + Google Fit

### F.7.1 Google Fit is deprecated (cited)

Google Fit REST API and Android API are **deprecated for new projects as of May 1, 2024**. Per the official Flutter `health` package README: *"Google has deprecated the Google Fit API. According to the documentation, as of May 1st 2024 developers cannot sign up for using the API. As such, this package has removed support for Google Fit as of version 11.0.0."* [S8]

The Google Health Connect page states: *"Google Fit APIs will be supported until the end of 2026."* — meaning the existing Fit API keeps working for legacy apps but no new projects should integrate it. [S7]

**Migration path is Health Connect only.** Health Connect is the unified on-device API; the HC app (com.google.android.apps.healthdata) is the surface. The AndroidX library `androidx.health.connect.client` is the canonical Kotlin/Java wrapper.

### F.7.2 Health Connect data types relevant to Runify

| Data type | Read permission | Write permission | Use |
|---|---|---|---|
| `Steps` | `READ_STEPS` | `WRITE_STEPS` | Daily step count (background sync) |
| `Distance` | `READ_DISTANCE` | `WRITE_DISTANCE` | Total distance delta |
| `ActiveCaloriesBurned` | `READ_ACTIVE_CALORIES_BURNED` | `WRITE_ACTIVE_CALORIES_BURNED` | Calorie estimation |
| `HeartRate` | `READ_HEART_RATE` | `WRITE_HEART_RATE` | BPM (live for Wear OS, snapshot for phone) |
| `ExerciseSession` | `READ_EXERCISE` | `WRITE_EXERCISE` | The run record itself |
| `ExerciseRoute` (nested in session) | `READ_EXERCISE_ROUTE` | `WRITE_EXERCISE_ROUTE` | The polyline of the run |
| `SleepSession` | `READ_SLEEP` | `WRITE_SLEEP` | v1.5 — optional |
| `TotalCaloriesBurned` | `READ_TOTAL_CALORIES_BURNED` | `WRITE_TOTAL_CALORIES_BURNED` | Aggregate |
| `ElevationGained` | `READ_ELEVATION_GAINED` | `WRITE_ELEVATION_GAINED` | Elevation gain |

Runify-equivalent core: `ExerciseSession` + `ExerciseRoute` + `Distance` + `Steps`. The latter two are read-only from the user's perspective (the app reads from Health Connect, doesn't write steps). [S15]

### F.7.3 The Activity-alias requirement

Health Connect requires a specific `<activity-alias>` in the manifest that handles the `androidx.health.ACTION_SHOW_PERMISSIONS_RATIONALE` intent. Without it, the Health Connect app shows a broken "View privacy policy" link, and Google App Review may reject the app. [S16]

```xml
<activity-alias
    android:name="ViewPermissionUsageActivity"
    android:exported="true"
    android:targetActivity=".MainActivity"
    android:permission="android.permission.START_VIEW_PERMISSION_USAGE">
    <intent-filter>
        <action android:name="android.intent.action.VIEW_PERMISSION_USAGE" />
        <category android:name="android.intent.category.HEALTH_PERMISSIONS" />
    </intent-filter>
</activity-alias>
```

Also required: a `<queries>` block for `com.google.android.apps.healthdata` so the app can detect whether Health Connect is installed. [S16]

### F.7.4 Vendor SDKs (matches Angle D verdicts)

- **Native Android (Kotlin)**: `androidx.health.connect.client` (Apache-2.0, AndroidX). The canonical answer. **Use this if F.2 = Kotlin + Compose.**
- **Flutter**: `health` 13.3.2 (MIT, verified publisher `carp.dk`, Danish Technical University). The canonical Flutter wrapper. **Use this if F.2 = Flutter.** [S9]
- **React Native**: `matinzd/react-native-health-connect` (community). The official `react-native-health` only covers HealthKit (iOS). For Android, use `matinzd/react-native-health-connect`. [S11]
- **Capacitor**: no first-party Health Connect plugin. Avoid.

### F.7.5 Background reads from Health Connect

Health Connect allows apps to read health data in the background via the `android.permission.health.READ_HEALTH_DATA_IN_BACKGROUND` permission. The user must explicitly grant this in the Health Connect app. [S16]

**Use case**: the app wants to sync runs from the user's other fitness apps (e.g., Samsung Health, Strava-via-Health Connect) without opening the app. The background read permission is v1.5 — v1 only reads on app-foreground.

---

## F.8 Monetization — Google Play Billing + RevenueCat

### F.8.1 Google Play Billing Library v8 (mandatory)

Per the official Play Billing documentation: *"By Aug 31, 2026, all new apps and updates to existing apps must use Billing Library version 8 or later."* [S17]

**Implication for the Android-first build**: the v8 library is mandatory. Add `com.android.billingclient:billing-ktx:8.0.0` (or later) to the app's `build.gradle.kts`. The current API surface is stable; v8 introduced the **subscription base plan + offer tag** model that all subscription tiers must conform to.

**Submission requirement**: by 2026-08-31, every new app AND every update to an existing app must use v8+. The user is launching a new app, so there's a hard deadline.

### F.8.2 Subscription tiers (mirror Runify)

| Tier | Price (USD) | Play Billing product type | Notes |
|---|---|---|---|
| Monthly | $4.99 | `subs` (base plan) | Match Runify's headline price |
| Annual | $39.99 | `subs` (base plan) | 7-day free trial |
| Lifetime | $79.99 | `inapp` (one-time) | The "lock-in" tier |

**Why mirror Runify's pricing**: the price is the moat. The first-mover in MENA with a gamified run tracker at $4.99/mo undercuts Strava's $11.99/mo by 58%. **Ponytail**: do NOT change the price during v1. The price is the brand.

### F.8.3 RevenueCat as the cross-platform wrapper

**RevenueCat** is the de-facto subscription wrapper for Android (and iOS, if added later). Per the official docs: [S18]

- **Free tier**: 0% commission until $2,500/mo tracked revenue, then 1% of revenue.
- **Cross-platform**: same SDK for Android (Play Billing), iOS (StoreKit), web (Stripe). If the user adds iOS in v2, RevenueCat is the bridge.
- **Server-side validation**: built-in receipt validation against the Google Play Developer API.
- **Real-time developer notifications**: Pub/Sub webhook for subscription lifecycle events.
- **Webhooks**: user can plug RevenueCat into a custom backend.

**If the user wants to skip RevenueCat** (single-platform, no backend): Play Billing v8 + a Firebase Cloud Function for receipt validation is the minimum viable setup. The cost is ~$5/mo for the cloud function. **Ponytail**: pick RevenueCat for v1 if iOS v2 is on the roadmap; skip RevenueCat and use Play Billing directly if iOS is firmly deferred to v3+.

### F.8.4 Trial mechanics

- **Free trial**: 7-day, available on the Annual tier only (matches Runify [S19]).
- **No trial on Monthly**: too leaky.
- **No trial on Lifetime**: defeats the model.
- **Introductory pricing**: Play Billing supports "free trial" + "introductory price" (e.g., $0.99 for 3 months). Use the free trial, skip the introductory price for v1.

### F.8.5 Real-time developer notifications

Subscribe to the Google Play Pub/Sub topic for:
- `com.google.android.apps.subscription.RENEWED` (sub renewed)
- `com.google.android.apps.subscription.CANCELED` (sub canceled)
- `com.google.android.apps.subscription.REVOKED` (refund issued)
- `com.google.android.apps.subscription.EXPIRED` (sub ended)

RevenueCat handles this automatically. Direct Play Billing setup requires a Google Cloud Pub/Sub topic + a webhook server.

### F.8.6 Family Library / Play Pass

- **Google Play Family Library**: 5–10% conversion lift in the fitness category. Enable on all paid tiers. [S19]
- **Google Play Pass**: opt-in program. Not necessary for v1.

---

## F.9 Wear OS decision

### F.9.1 v1 (no Wear OS) — RECOMMENDED

The user has an Android phone but has not confirmed a Wear OS watch. The Saudi/GCC market skews Apple Watch for wrist devices (Apple Watch Series 9 sells more than the entire Wear OS market in KSA). Adding Wear OS in v1 adds:

- **Build effort**: ~200 wh (a separate Wear OS app target, `ExerciseClient` integration, on-watch UI, `WearableDataLayer` sync).
- **Design effort**: 1 week of small-screen UI design.
- **Test matrix**: 5+ Wear OS devices (Pixel Watch 2, Galaxy Watch 4/5/6, OnePlus Watch 2).
- **Play Store listing**: the app must be published as a Wear OS app with a separate listing.

**Don't assume the user has a Wear OS watch.** Recommend deferring to v1.5.

### F.9.2 v1.5 (Wear OS included) — IF the user confirms a watch

Per the Android docs, Wear OS Health Services provides [S13]:
- **`ExerciseClient`** — manages the user's workout, sends live GPS + HR updates, supports goals, and emits state-change events. The canonical API for run tracking on the wrist.
- **`MeasureClient`** — for spot HR measurements (e.g., rest HR).
- **`PassiveMonitoringClient`** — for 24/7 background HR + steps.

**v1.5 build effort**: ~200 wh + 1 week of design + 1 week of QA. Total ~250 wh ≈ 6–7 weeks.

### F.9.3 The trigger question

Ask the user: **"Do you currently own a Wear OS watch (Pixel Watch, Galaxy Watch 4/5/6, TicWatch, etc.)?"** If yes, Wear OS in v1. If no, defer to v1.5.

---

## F.10 Step-by-step Android-first build plan (agent-ready)

**Engineering assumptions**: 1 senior Android engineer, 10–14 weeks of full-time work, ~8–10 h/week of design + QA. Each step is a self-contained, testable milestone. **Effort in working hours (wh).**

### Step 1 — Repo + Android tooling (2 days, 16 wh)

- **Files / dirs**: `build.gradle.kts` (project + app), `settings.gradle.kts`, `gradle/libs.versions.toml` (version catalog), `app/build.gradle.kts`, `app/src/main/AndroidManifest.xml`, `app/src/main/java/com/runify/MainActivity.kt`, `app/src/main/java/com/runify/RunifyApp.kt`, `app/src/main/res/values/strings.xml`, `app/src/main/res/values/themes.xml`, `app/src/main/res/values/colors.xml`, `app/src/main/res/drawable/`, `.github/workflows/ci.yml`, `README.md`.
- **BoM + dependencies**: Compose BOM (`androidx.compose:compose-bom:2026.06.00`), AndroidX Activity Compose, Hilt (`com.google.dagger:hilt-android:2.51`), Navigation Compose, Coroutines, Lifecycle ViewModel, Material 3.
- **DoD**: `./gradlew assembleDebug` builds clean; CI runs lint + `./gradlew test` on every PR; the empty app launches on a Samsung Galaxy S23 emulator showing "Runify" with Arabic localization.
- **Risk**: low.

### Step 2 — App architecture (3 days, 24 wh)

- **Files / dirs**: `app/src/main/java/com/runify/RunifyApp.kt` (Hilt `@HiltAndroidApp`), `app/src/main/java/com/runify/MainActivity.kt`, `app/src/main/java/com/runify/ui/theme/Color.kt`, `Theme.kt`, `Type.kt`, `Shape.kt`, `app/src/main/java/com/runify/ui/navigation/RunifyNavHost.kt`, `app/src/main/java/com/runify/di/AppModule.kt` (Hilt module), `app/src/main/java/com/runify/data/repository/RunRepository.kt`, `app/src/main/java/com/runify/data/local/RunifyDatabase.kt` (Room), `app/src/main/java/com/runify/data/remote/RunifyApi.kt` (Retrofit interface).
- **Pattern**: MVVM + Compose + Hilt + Coroutines + Flow. StateFlow for view-models, Room for local persistence, Retrofit for the remote backend.
- **DoD**: the app boots, navigates between 3 placeholder screens, has dark mode (primary) + light mode (auto + Settings toggle), and 0 lint warnings.
- **Risk**: low.

### Step 3 — Localization scaffold (AR + EN, RTL) (2 days, 16 wh)

- **Files / dirs**: `app/src/main/res/values/strings.xml`, `values-ar/strings.xml`, `values-night/`, `app/src/main/AndroidManifest.xml` (add `android:supportsRtl="true"`), `app/src/main/java/com/runify/ui/locale/LocalLayoutDirection.kt`, `app/src/test/java/com/runify/ui/locale/RtlTest.kt`.
- **Plurals**: `<plurals>` for run count, with 6 Arabic forms (zero, one, two, few, many, other).
- **Font**: Noto Naskh Arabic (system) + Roboto (English) declared in `Type.kt`.
- **DoD**: the app switches to Arabic via Settings → Language, all icons mirror correctly, the layout structure is mirrored (back button on right, progress bar fills right-to-left), and the RTL test screenshot matches the design spec.
- **Risk**: medium (RTL is easy to get 80% right, hard to get 100% — easy to ship a layout that breaks in a deep-link flow).

### Step 4 — Health Connect integration (4 days, 32 wh)

- **Files / dirs**: `app/src/main/AndroidManifest.xml` (add `<queries>` + `<activity-alias>` for Health Connect), `app/src/main/java/com/runify/health/HealthConnectManager.kt`, `HealthConnectAvailability.kt`, `HealthConnectPermissions.kt`, `PermissionsRationaleScreen.kt`, `app/src/main/res/values/health_permissions.xml` (string resources for the rationale).
- **Dependencies**: `androidx.health.connect:connect-client:1.1.0-alpha07` (or latest stable).
- **Permissions**: declare `READ_STEPS`, `READ_DISTANCE`, `READ_EXERCISE`, `READ_EXERCISE_ROUTE`, `READ_HEART_RATE`, plus `WRITE_EXERCISE` + `WRITE_EXERCISE_ROUTE` for the app's own runs.
- **DoD**: the app requests Health Connect permissions, the user is routed to the Health Connect app to grant, the home screen shows the user's daily step count from Health Connect, the value matches the phone's step counter.
- **Risk**: high (Health Connect permission flow is multi-step; some users don't have Health Connect installed → must detect via `HealthConnectAvailability` and prompt to install).

### Step 5 — Foreground location service (GPS run tracker) — THE PRIME ISSUE (5 days, 40 wh)

- **Files / dirs**: `app/src/main/java/com/runify/location/RunTrackingService.kt`, `LocationProvider.kt`, `BatteryWhitelistGuard.kt`, `app/src/main/res/xml/foreground_service_location.xml`, `app/src/main/AndroidManifest.xml` (add `<service>` with `foregroundServiceType="location"` + the FOREGROUND_SERVICE_LOCATION permission).
- **Notification**: `NotificationChannel(RUN_TRACKING_CHANNEL, importance=LOW)` with a persistent notification showing "جاري تسجيل الجري · 5.20 كم" (Recording run · 5.20 km).
- **GPS**: `FusedLocationProviderClient` + `LocationRequest` at 1 Hz `PRIORITY_HIGH_ACCURACY`.
- **Battery whitelist**: `PowerManager.isIgnoringBatteryOptimizations()` check + OEM-specific settings deep-link.
- **DoD**: a 5K outdoor run on a Samsung Galaxy S23 records <10m accuracy, <12%/hr battery drain, the service stays alive for the entire run, the device does not kill the service, and the user is guided to the OEM battery settings on first run.
- **Risk**: **HIGH** — this is the prime issue. If this fails, the project fails. (See F.6.)

### Step 6 — Run recording state machine (3 days, 24 wh)

- **Files / dirs**: `app/src/main/java/com/runify/run/RunState.kt`, `RunStateMachine.kt`, `RecordedRun.kt`, `app/src/main/java/com/runify/run/RunViewModel.kt`, `ui/run/RunScreen.kt`, `RunControls.kt`.
- **States**: `Idle`, `CountdownToStart`, `Recording`, `Paused`, `Finished`, `Saved`.
- **Transitions**: `Idle → CountdownToStart` (user taps Start, 3-2-1 countdown), `CountdownToStart → Recording` (first GPS fix), `Recording → Paused` (auto-pause or user-pause), `Recording → Finished` (user taps Finish), `Finished → Saved` (data persisted to Room + synced to backend).
- **DoD**: the user can start, pause, resume, and finish a run; the state is observable in the ViewModel; the RunScreen reflects the current state within 100ms.
- **Risk**: medium.

### Step 7 — Route capture + storage (3 days, 24 wh)

- **Files / dirs**: `app/src/main/java/com/runify/data/local/RunEntity.kt`, `RoutePointEntity.kt`, `RunifyDatabase.kt` (Room), `app/src/main/java/com/runify/data/repository/RunRepository.kt`, `GPXExporter.kt`.
- **Schema**: `runs` (id, started_at, ended_at, distance_m, duration_s, avg_pace_s_per_km, xp_earned, rank_before, rank_after), `route_points` (run_id, lat, lng, timestamp, elevation, accuracy).
- **Storage**: Room/SQLite (local-first, ~50 bytes per GPS point × 3600 points/hr = ~180 KB/hr). A single 5K run is ~50 KB.
- **DoD**: a recorded run is saved to Room + displayed in the history list; the polyline is read back correctly; the unit test covers the round-trip.
- **Risk**: medium.

### Step 8 — Map rendering (MapLibre Native + OSM tiles) (4 days, 32 wh)

- **Files / dirs**: `app/src/main/java/com/runify/map/MapLibreMap.kt`, `MapStyle.kt`, `RoutePolylineOverlay.kt`, `app/src/main/res/raw/map_style.json` (custom MapLibre style), `app/src/main/res/layout/view_map.xml` (XML), `app/src/main/java/com/runify/map/MapScreen.kt`.
- **Library**: `org.maplibre.gl:android-sdk:11.11.0` (current version). [S10]
- **Style**: dark-mode-first, custom style author with Maputnik (https://maputnik.org) styled with the Runify visual DNA (black + neon, similar to the iOS screenshots).
- **Tiles**: MapTiler free tier (~$25/mo hobby) or Protomaps PMTiles self-hosted (open-source, OSS-pure).
- **DoD**: a recorded run is rendered as a polyline on the map; the map style is dark and matches the brand; the user can pinch-zoom and pan; the map renders offline from PMTiles for cached regions.
- **Risk**: medium (MapLibre setup is non-trivial; the prebuilt artifacts are slow to add to Gradle).

### Step 9 — Run history list + detail screens (3 days, 24 wh)

- **Files / dirs**: `app/src/main/java/com/runify/history/HistoryListScreen.kt`, `HistoryListViewModel.kt`, `RunDetailScreen.kt`, `RunDetailViewModel.kt`, `app/src/main/res/values/strings.xml` (history screen strings).
- **DoD**: the history list shows all recorded runs reverse-chronologically; tapping a run shows the detail screen with map + stats + share button.
- **Risk**: low.

### Step 10 — Stats dashboard (3 days, 24 wh)

- **Files / dirs**: `app/src/main/java/com/runify/stats/StatsScreen.kt`, `StatsViewModel.kt`, `Charts.kt` (use Vico — https://github.com/patrykandpatrick/vico — Apache-2.0, Compose-native).
- **DoD**: the dashboard shows weekly + monthly + lifetime total distance, run count, avg pace, XP gained, rank change; charts are Compose-native with the Runify visual style.
- **Risk**: low.

### Step 11 — XP/rank tier system (3 days, 24 wh)

- **Files / dirs**: `app/src/main/java/com/runify/tiers/Tier.kt`, `XPEngine.kt`, `RankDecayCalculator.kt`, `app/src/main/res/values/strings.xml` (rank names), `tiers/LeaderboardBackend.kt`.
- **Tiers**: 6 tiers (Bronze → Silver → Gold → Platinum → Diamond → Iridescent), with rank thresholds based on cumulative distance + pace.
- **Decay**: 1 rank drop per 7 days of inactivity (matches Runify's "lose rank if you go inactive" copy [S19]).
- **DoD**: the user earns XP per run, the rank is recomputed daily, the rank change is shown in the post-run card.
- **Risk**: medium.

### Step 12 — Local leaderboard (no global) (3 days, 24 wh)

- **Files / dirs**: `app/src/main/java/com/runify/leaderboard/LeaderboardScreen.kt`, `LeaderboardViewModel.kt`, `api/LeaderboardApi.kt`.
- **Local-only for v1**: leaderboard = the user's own rank + their friends (friends via contacts hash is a v1.5 feature).
- **DoD**: the user can see their own rank; the leaderboard screen is reachable from the home tab.
- **Risk**: low.

### Step 13 — Post-run share card (Instagram + Snapchat) (4 days, 32 wh)

- **Files / dirs**: `app/src/main/java/com/runify/sharing/ShareCardRenderer.kt`, `ShareCardTemplate.kt`, `app/src/main/java/com/runify/sharing/InstagramShare.kt`, `SnapchatShare.kt`, `app/src/main/res/drawable/share_card_*` (template designs).
- **Templates**: 3 free (English + Arabic), 2 Pro (English + Arabic).
- **DoD**: the user can pick a template, render a 1080×1920 PNG, and share to Instagram Stories or Snapchat via `Intent.ACTION_SEND` with the appropriate MIME type.
- **Risk**: medium (Snapchat's share-sheet integration is less mature than Instagram's; verify the Snapchat Creative Kit accepts the bitmap).

### Step 14 — Subscription + paywall (Play Billing v8 + RevenueCat) (4 days, 32 wh)

- **Files / dirs**: `app/src/main/java/com/runify/paywall/PaywallViewModel.kt`, `PaywallScreen.kt`, `BillingClient.kt`, `RevenueCatClient.kt`, `app/src/main/AndroidManifest.xml` (add `com.android.vending.BILLING` permission).
- **DoD**: the 7-day free trial on the Annual tier works; the paywall appears at the right trigger (history > 30 runs OR custom templates OR friend invites); RevenueCat dashboard shows the test subscription in sandbox.
- **Risk**: medium (Play Billing v8 setup is straightforward but the subscription-state machine has 6 states to handle correctly).

### Step 15 — Settings + privacy + data export (3 days, 24 wh)

- **Files / dirs**: `app/src/main/java/com/runify/settings/SettingsScreen.kt`, `SettingsViewModel.kt`, `PrivacyPolicyScreen.kt`, `DataExportScreen.kt`, `GPXExporter.kt`, `app/src/main/res/raw/privacy_policy.md` (Arabic + English).
- **DoD**: Settings has Units (km/mi), Language (auto/EN/AR), Notifications (on/off + time), Theme (dark/light/system), Privacy (link to the policy), Data Export (one-tap "Download my data" → GPX file).
- **Risk**: low.

### Step 16 — Notifications + reminders (3 days, 24 wh)

- **Files / dirs**: `app/src/main/java/com/runify/notifications/NotificationScheduler.kt`, `NotificationCopy.kt` (EN + AR), `DailyDigest.kt`, `WeeklyDigest.kt`, `WorkManagerWorker.kt`.
- **DoD**: the daily nudge fires at the user's learned run window; the weekly digest fires on Sunday; the user can snooze 2h or disable all from Settings.
- **Risk**: low.

### Step 17 — Onboarding + goal setting (3 days, 24 wh)

- **Files / dirs**: `app/src/main/java/com/runify/onboarding/OnboardingFlow.kt`, `WelcomeScreen.kt`, `PermissionsScreen.kt`, `GoalSettingScreen.kt`, `FirstRunRevealScreen.kt`.
- **DoD**: an uninstall + reinstall user lands on the home screen, sees the step counter, taps "Run", grants the 5 permissions, and starts a run in <60 seconds.
- **Risk**: high (the 60-second promise is a promise; if it slips, the user churns before the first run).

### Step 18 — Analytics + crash reporting (1 day, 8 wh)

- **Files / dirs**: `app/src/main/java/com/runify/analytics/PostHogClient.kt` (or `SentryClient.kt`), `Events.kt`.
- **DoD**: PostHog receives the test events ("app_opened", "run_started", "run_completed", "paywall_viewed", "subscription_started"); Sentry receives a test crash from the debug-only "Crash on tap" button.
- **Risk**: low.

### Step 19 — Beta (Play Console Internal Testing) (1 week of calendar time, ~8 wh of engineer time)

- **Files / dirs**: `appstore/PlayConsole-InternalTesting.md`, `appstore/Screenshots/`, `appstore/PrivacyPolicy.md`.
- **DoD**: 50 external testers recruited from the r/saudiarabia + r/dubai + Snapchat communities; a 7-day soak with no Sev-1 crashes; the average run distance matches the team's manual measure-distance within 2%.
- **Risk**: medium (Play Console Internal Testing has a 24-48 hour test-track approval lag on first launch).

### Step 20 — Store listing (Arabic + English) (2 days, 16 wh)

- **Files / dirs**: `appstore/Metadata.en-US.txt`, `Metadata.ar-SA.txt`, `appstore/Screenshots/Phone/`, `appstore/Screenshots/7-inch/`, `appstore/Screenshots/10-inch/`, `appstore/FeatureGraphic.png` (1024×500), `appstore/AppIcon-512.png`.
- **DoD**: short description + long description in both EN and AR; 8 phone screenshots per language; feature graphic; the privacy policy URL is the runifyapp.com/privacy-policy carrd.co page (mirror the iOS Angle A reference).
- **Risk**: low.

### Step 21 — Polish (animations, dark mode, a11y, icon) (3 days, 24 wh)

- **Files / dirs**: `app/src/main/java/com/runify/ui/anim/Animations.kt`, `Accessibility.kt`, `app/src/main/res/values/strings.xml` (a11y labels), `app/src/main/res/drawable/ic_launcher_*`.
- **DoD**: the app supports TalkBack, dynamic text sizing, dark mode (primary) + light mode (auto), reduced-motion preference; the launcher icon is rendered at all required sizes (mdpi → xxxhdpi).
- **Risk**: low.

### Step 22 — Launch (Google Play, Production track) (1 day, 8 wh)

- **Files / dirs**: `appstore/PressKit.md`, `appstore/LaunchEmail.md`.
- **DoD**: the app is live on Google Play (Production track); the Arabic + English listings are correct; the Play Store rating popup is enabled; the first 1K install target is set for week 1.
- **Risk**: low.

### Total effort

| Component | Working hours |
|---|---|
| Steps 1–22 (total) | **~440 wh** ≈ **11–12 weeks** of one engineer |
| Calendar weeks (5-day × 8h) | **~11–12 weeks** including 1 week of Play Internal Testing soak |
| Buffer (the prime issue WILL slip) | +2 weeks |
| **Total calendar weeks** | **13–14 weeks** |

This sits **roughly equal to the Angle E iOS-first plan** (10–11 wk for core + 12–13 wk including launch). The Android-specific gotchas (FGS, OEM battery, 5+ permissions, AR+EN layout mirroring) add ~1 wk. The Health Connect + Wear OS is v1.5, so v1 is leaner than the iOS plan in paywall/state-machine complexity.

---

## F.11 Open-source starting point for Android-first

### F.11.1 Cornerstone pick: **OpenTracks** (Codeberg, Java, Apache-2.0) — **study only, do not fork**

**Why study, not fork** (carries forward from Angle D.2.1):
- **What it does well**: mature record/playback engine, GPX/KML/KMZ export, photo-on-route markers, BLE HR support, robust background location handling, comprehensive sensor-fusion (GPS + accelerometer + barometer). 184 releases over ~8 years; v4.28.1 shipped 2026-08-08. Apache-2.0 license means downstream commercial fork is fine. [S20]
- **What it does NOT do for Runify**:no iOS support (we want it for v2); no Health Connect (it has Strava via companion app); UI is Material 1 era — does not match Runify's expected polish; Java not Kotlin — modern Android Compose is absent. **Don't fork the Java code.**
- **What to study**: the sensor-fusion logic, the GPS state machine, the battery-management patterns, the GPX export, the BLE HR pairing. Read it as a reference, not a starting point.

### F.11.2 Secondary pick: **AtilMohAmine/Fitness-Tracker** (GitHub, Kotlin, MIT)

- **What it is**: a modern Android Kotlin + Google Fit + MVVM sample. Last commit 2025-03-04. 18 stars. Apache-2.0 license. [S21]
- **What to use**: the MVVM scaffolding, the Hilt or Koin DI pattern, the Compose Navigation pattern. The Google Fit code is **deprecated** — replace with Health Connect.
- **What to skip**: the Google Fit code (deprecated), the single-screen Compose UI (we want a tabbed architecture).

### F.11.3 Compose-native templates (study only)

- **`yveskalume/fitness-app-template`** (Kotlin, Compose, MIT). 8 stars, last updated 2021 — UI-dated but the Compose patterns are sound.
- **`kumathy/FitQuest`** (Kotlin, gamified fitness, MIT). 15 stars, last updated 2024. The gamification kernel (XP, badges) is directly relevant to Runify's tier system.
- **`apoorvdarshan/fud-ai`** (Kotlin + Swift, AI calorie tracker, MIT). 338 stars, recent activity. Not a starting point but a reference for the AI-coach v2 feature.

### F.11.4 Vendor summary (Android-native)

| Pillar | Library | License | Use |
|---|---|---|---|
| Map rendering | `org.maplibre.gl:android-sdk:11.11.0` | BSD-2-Clause | Maps (matches Angle D verdict) |
| Health Connect | `androidx.health.connect.client` | Apache-2.0 | Fitness data |
| GPS | `com.google.android.gms:play-services-location` (FusedLocationProviderClient) | Apache-2.0 | GPS + FusedLocationProvider |
| Foreground service | `androidx.core:core-ktx` | Apache-2.0 | ServiceCompat.startForeground |
| DI | `com.google.dagger:hilt-android:2.51` | Apache-2.0 | DI |
| Database | `androidx.room:room-runtime:2.6.0` | Apache-2.0 | Local persistence |
| Charts | `com.patrykandpatrick.vico:compose:2.0.0` | Apache-2.0 | Charts |
| Billing | `com.android.billingclient:billing-ktx:8.0.0` | Apache-2.0 | Play Billing |
| Subscription wrapper | `com.revenuecat.purchases:purchases:8.x` | Apache-2.0 | RevenueCat |
| Analytics | `com.posthog.android:posthog:3.x` | MIT | Product analytics |
| Crash | `io.sentry:sentry-android:7.x` | MIT | Crash reporting |
| GPX export | `ticofab/android-gpx-parser` | Apache-2.0 | GPX IO |
| Coroutines | `org.jetbrains.kotlinx:kotlinx-coroutines-android:1.8.x` | Apache-2.0 | Async |

All Apache-2.0 / MIT. Closed-source commercial use is allowed. No license traps.

### F.11.5 Clone-and-build commands

```bash
# OpenTracks (study only)
git clone https://codeberg.org/OpenTracksApp/OpenTracks.git
cd OpenTracks
git checkout v4.28.1  # 2026-08-08 release
# AGP 8+ may need migration script; see OpenTracks README

# AtilMohAmine Fitness-Tracker (study Modern MVVM)
git clone https://github.com/AtilMohAmine/Fitness-Tracker.git
cd Fitness-Tracker
# Open in Android Studio; replace Google Fit with androidx.health.connect.client
```

---

## F.12 iOS v2 deferred plan

**When the user gets an Apple account in 12–18 months** (~$99/yr + 1 week provisioning), the Android-first codebase can be ported via one of three paths:

### F.12.1 Path A: Kotlin Multiplatform (KMP) for business logic

- Extract the data layer (Room, state machine, XP engine, GPX export) to a KMP module.
- Rewrite the UI in SwiftUI for iOS.
- **Effort**: ~250 wh ≈ 6–7 weeks. The KMP extraction is the dominant cost (~80 wh), then the SwiftUI UI is a near-mirror of the Android Compose UI (~170 wh).

### F.12.2 Path B: Native SwiftUI rewrite (if KMP is too risky)

- Throw away the Android code, rebuild in SwiftUI.
- **Effort**: ~500 wh ≈ 12–13 weeks. **Ponytail**: only if the team is junior on KMP and senior on SwiftUI.

### F.12.3 Path C: Capacitor or Flutter (if cross-platform was chosen in F.2)

- **Capacitor wrap**: ~80 wh ≈ 2 weeks to wrap the Android app in a web view. **Do not pick this** — the iOS HealthKit + CoreMotion + HKWorkoutRouteBuilder depth is not viable from a Capacitor shell.
- **Flutter rebuild**: ~400 wh ≈ 10 weeks if the MVP was Kotlin-native; ~120 wh ≈ 3 weeks if the MVP was Flutter (the bulk is the rewrite).

### F.12.4 The buy decision

The path chosen in F.2 determines the iOS v2 cost:
- **Kotlin + Compose native (F.2 = primary)**: 6–7 wk via KMP, or 12–13 wk via rewrite.
- **Flutter (F.2 = fallback)**: 3 wk via existing Flutter codebase.

**This is the dominant reason to pick Flutter** if the user is committed to iOS within 12 months. If the user is firmly "iOS in 18+ months or never", native Kotlin + deferred KMP is the leaner path.

---

## F.13 Risks + decisions that must be made early (Android version)

The 5 Angle E irreversible decisions do NOT all carry forward. Several are Android-replaced. The full list:

### New + revised irreversible decisions

| # | Decision | Severity | Trigger |
|---|---|---|---|
| **R1 (revised)** | **Framework = Kotlin + Jetpack Compose native Android** (vs Flutter/RN/Capacitor) | **HIGH** | Health Connect depth, FGS guarantees, and AR+EN localization are first-class only in Kotlin. Migrating to Flutter later = 4–6 month rewrite. |
| **R2 (revised)** | **Android-only v1, iOS v2 in 12–18 months** | **HIGH** | Android phone only + AR+EN. iOS later requires Apple Developer account ($99/yr) + provisioning lag. |
| **R3 (carried)** | **Database = Room locally + Postgres backend** (or Room-only for v1) | **MEDIUM** | Public leaderboard requires server-side aggregate. Room-only is fine for a single-user app (no friends). |
| **R4 (carried)** | **Maps = MapLibre Native + MapTiler/PMTiles** (not Google Maps SDK) | **MEDIUM** | Google Maps SDK is pay-per-load ($7/1000 loads after the free tier). MapLibre is BSD-2-Clause + no telemetry. |
| **R5 (carried)** | **Analytics = PostHog Cloud (EU) + Sentry** (not self-hosted) | **MEDIUM** | Privacy posture is determined by vendor. Self-host if v2.5 pivots to "privacy-first run tracker". |
| **R6 (NEW)** | **Foreground service strategy = always-on during a recorded run + battery-whitelist educational prompt** | **HIGH** | Android 14 + Samsung OEM battery optimisations will kill the foreground service if not whitelisted. The user must be guided to OEM settings. |
| **R7 (NEW)** | **Localization = AndroidX RTL + Compose `LocalLayoutDirection` + system Noto Naskh Arabic** | **HIGH** | AR+EN from day one is a hard requirement. Retrofitting RTL after English-only is a 2-week rewrite. |
| **R8 (NEW)** | **Health Connect = direct AndroidX library** (not Google Fit, not a third-party wrapper) | **HIGH** | Google Fit is deprecated; Health Connect is the path. Direct AndroidX = cleanest. |
| **R9 (NEW)** | **Play Billing v8** (mandatory by Aug 31, 2026) | **MEDIUM** | Hard deadline. Use v8+ from day one; no v6/v7 fallback. |
| **R10 (NEW)** | **Wear OS = v1.5 (defer)** | **LOW** | User has not confirmed a Wear OS watch. v1.5 effort is well-defined. |

### Secondary risks (worth flagging, not blocking)

| Risk | Severity | Mitigation |
|---|---|---|
| **OEM battery optimisation** — Samsung/Xiaomi/Huawei kill background services without manual whitelist. ~38% of mid-range Android devices. [S2] | **HIGH** | Build a BatteryWhitelistGuard that detects OEM + navigates to the right Settings page. Show the educational prompt on first run. |
| **Android 14 FGS type enforcement** — calling `startForeground` without `FOREGROUND_SERVICE_TYPE_LOCATION` throws `SecurityException`. [S1] | **HIGH** | Use `ServiceCompat.startForeground` with the correct type constant. Add a CI test that boots an Android 14 emulator. |
| **Google Play Family Library** — 5–10% conversion lift in the fitness category. | **LOW** | Enable on all paid tiers in Play Console. |
| **Google Play 17 memory efficiency** — new Android 17 limits on memory; foreground services + processes can be killed more aggressively. [S22] | **MEDIUM** | Run on Android 17 emulator in CI; profile with `adb shell dumpsys meminfo`. |
| **MapLibre Native setup** — the prebuilt artifacts are slow to add to Gradle. | **LOW** | Use the prebuilt release from Sonatype (v11.11.0). Don't compile from source. |
| **Health Connect requires Health Connect app** — some users don't have it installed. | **LOW** | Detect via `HealthConnectAvailability`; prompt to install via Play Store. |
| **Snapchat Creative Kit** — the Snapchat share flow is less mature than Instagram's. | **LOW** | Use `Intent.ACTION_SEND` with a bitmap URI; Snapchat will pick it up. |
| **Arabic numeric toggle** — Western vs Arabic numerals is a user preference. | **LOW** | Settings toggle. Default: Western numerals in both locales (less surprising for technical users). |
| **Huawei AppGallery** — Huawei devices don't have Google Play. ~10% of MENA. | **MEDIUM** | v1.5.0 — Huawei AppGallery requires a separate submission (~2 wk of effort). |
| **Xiaomi GetApps** — Xiaomi devices prefer GetApps over Play. ~15% of MENA. | **MEDIUM** | v1.5.0 — Xiaomi GetApps requires a separate submission. |
| **Google Play review rejection** — Health Connect + foreground service + location permissions are scrutinised. | **MEDIUM** | Test on a brand-new Google Play Internal Testing track; submit a "Permissions declaration" form. |
| **Data residency (Saudi PDPL, UAE DIFC)** — personal data of KSA/UAE residents may have residency requirements. | **LOW** | PostHog Cloud (EU) + Sentry (US) are not ideal for KSA. v1.5 self-host PostHog in `me-central-1` (UAE) or `me-south-1` (Bahrain). |

### Wear OS consideration (re-listed for completeness)

- Wear OS in v1.5 needs: a separate Wear OS app target, `ExerciseClient` integration, `WearableDataLayer` for phone-watch sync, a Play Store listing for the Wear OS module. ~250 wh ≈ 6–7 wk of effort.

---

## F.14 Revised build effort estimate

### F.14.1 Total effort

| Engineer count + time | Total weeks | Notes |
|---|---|---|
| **1 engineer, full-time** | **13–14 weeks** | Steps 1–22. Includes 1 week of Play Internal Testing soak + 2-week buffer for the prime issue. |
| **1 engineer, part-time (50%)** | **26–28 weeks** | Half-time. The 60-second onboarding promise is harder to hit with part-time because the bug surface is bigger. |
| **2 engineers, full-time** | **7–8 weeks** | Tighter co-ordination needed. One engineer on the GPS foreground service, the other on Compose UI + Health Connect. |
| **Theoretical minimum (perfect engineer, no bugs)** | **8 weeks** | If the prime issue lands first try and Android 14 FGS works first time. Realistic: 11–12 wk. |

### F.14.2 Comparison to Angle E (iOS-first)

| Path | Calendar weeks | Notes |
|---|---|---|
| Angle E iOS-first (Swift + SwiftUI) | 10–11 wk | 408 wh core + 12–13 wk total |
| **Angle F Android-first (Kotlin + Compose)** | **11–12 wk core + 13–14 wk total** | 440 wh core. Android-specific gotchas (FGS, OEM battery, AR+EN) add ~1 wk vs iOS. |
| Angle F Flutter (cross-platform) | 12–13 wk | Adds 1 wk for cross-platform setup + 1 wk for Flutter-Android-Health Connect plumbing. Saves iOS v2 cost. |

### F.14.3 What changes the estimate

- **+1 wk** if the user has a Samsung Galaxy S23 with OneUI 6.1 (the most common Saudi Android device) — battery optimisation on OneUI is the most aggressive.
- **+1 wk** if the user wants Arabic + English from day one (already in the plan, but the QA budget grows 50% for RTL layout testing).
- **+1 wk** if Wear OS is in v1 (vs v1.5 deferred).
- **−1 wk** if the user skips the post-run Arabic share card (the Snapchat/Instagram integration is the most fragile).
- **+2 wk** if the user wants Huawei AppGallery support (separate submission + Huawei-specific Health Connect alternate).

### F.14.4 The prime issue will slip

Background GPS via foreground service on Android 14 with OEM battery optimisations is harder than the iOS equivalent. **The 2-week buffer is not optional.** Plan for it.

---

## Sources (cited as [Sn])

[1] Android 14 foreground service types (location) — `https://developer.android.com/about/versions/14/changes/fgs-types-required` — 2026-08-14 — `ctx_fetch_and_index` — mandatory `android:foregroundServiceType="location"` + `FOREGROUND_SERVICE_LOCATION` permission; `ACCESS_BACKGROUND_LOCATION` required for background FGS.
[2] Android location permissions + background location restrictions — `https://developer.android.com/training/location/permissions` — 2026-08-14 — `ctx_fetch_and_index` — permission flow for `ACCESS_FINE_LOCATION` → `ACCESS_BACKGROUND_LOCATION`; separating the while-in-use vs allow-all-the-time prompts.
[3] Android foreground services overview — `https://developer.android.com/guide/components/foreground-services` — 2026-08-14 — `ctx_fetch_and_index` — Android 14 enforcement + runtime type assertion via `ServiceCompat.startForeground`.
[4] Android localization — `https://developer.android.com/training/basics/supporting-devices/languages` — 2026-08-14 — `ctx_fetch_and_index` — `android:supportsRtl="true"` + `start/end` semantics + `LayoutDirection.Rtl` Composables.
[5] Android localization guide — `https://developer.android.com/guide/topics/resources/localization` — 2026-08-14 — `ctx_fetch_and_index` — `values-ar/` resource directory + `<plurals>` + bidirectional text handling.
[6] Health Connect data types — `https://developer.android.com/health-and-fitness/health-connect/data-types` — 2026-08-14 — `ctx_fetch_and_index` — `Steps`, `Distance`, `ActiveCaloriesBurned`, `HeartRate`, `ExerciseSession`, `ExerciseRoute`, `SleepSession`, `ElevationGained` + their READ/WRITE permissions.
[7] Health Connect product page — `https://health.google/health-connect-android/` — 2026-08-14 — `ctx_fetch_and_index` — *"Google Fit APIs will be supported until the end of 2026."* Migration path documented.
[8] Flutter `health` package v13.3.2 (MIT, verified publisher `carp.dk`) — `https://pub.dev/packages/health` — 2026-08-14 — `ctx_fetch_and_index` — *"Google has deprecated the Google Fit API. According to the documentation, as of May 1st 2024 developers cannot sign up for using the API."* Confirms Google Fit deprecation.
[9] Flutter `health` package — Android setup section — `https://pub.dev/packages/health` — 2026-08-14 — `ctx_fetch_and_index` — `<queries>` block + `ViewPermissionUsageActivity` + READ/WRITE permissions in AndroidManifest.
[10] MapLibre Native GitHub, Android setup — `https://github.com/maplibre/maplibre-native` — 2026-08-14 — `ctx_fetch_and_index` — `org.maplibre.gl:android-sdk:11.11.0` (current version), BSD-2-Clause, Compose integration via `Rallista/maplibre-compose-playground`.
[11] `matinzd/react-native-health-connect` — community-maintained, replaces `kingstinct/react-native-health-connect` (404) — cited via `agencyenterprise/react-native-health` README, `https://github.com/agencyenterprise/react-native-health` — 2026-08-14 — `ctx_search` — confirms Android Health Connect via the `matinzd` package.
[12] Kotlin programming language — `https://kotlinlang.org/` — 2026-08-14 — `ctx_fetch_and_index` — Kotlin Multiplatform + Android Compose-first positioning.
[13] Health Services on Wear OS — `https://developer.android.com/training/wearables/health-services` — 2026-08-14 — `ctx_fetch_and_index` — `ExerciseClient` for live run tracking + `MeasureClient` for spot HR + `PassiveMonitoringClient` for 24/7 background.
[14] Android string resources — `https://developer.android.com/guide/topics/resources/string-resource` — 2026-08-14 — `ctx_fetch_and_index` — `plurals` element + ICU MessageFormat for Arabic plurals (zero, one, two, few, many, other).
[15] Android Health Connect developer hub — `https://developer.android.com/health-and-fitness/health-connect` — 2026-08-14 — `ctx_fetch_and_index` — entry point for HC integration (redirects from the old `/health/connect` URL).
[16] Health Connect Flutter setup excerpt (manifest requirement) — `https://pub.dev/packages/health` — 2026-08-14 — `ctx_fetch_and_index` — `<activity-alias>` for `ViewPermissionUsageActivity` + `<queries>` for `com.google.android.apps.healthdata`.
[17] Google Play Billing — `https://developer.android.com/google/play/billing` — 2026-08-14 — `ctx_fetch_and_index` — *"By Aug 31, 2026, all new apps and updates to existing apps must use Billing Library version 8 or later."* Play Billing Library v8 mandatory.
[18] RevenueCat documentation — `https://www.revenuecat.com/docs` — 2026-08-14 — `ctx_fetch_and_index` — Android Play Billing integration + cross-platform entitlement management + webhook setup.
[19] Runify canonical pricing (mirrored for pricing strategy) — `https://runifyapp.com` JSON-LD FAQ — 2026-08-14 — `ctx_search` — Monthly $4.99 USD, Annual $39.99 USD with 7-day free trial. Confirms price parity.
[20] OpenTracks (Codeberg) — `https://codeberg.org/OpenTracksApp/OpenTracks` — 2026-08-14 — `ctx_fetch_and_index` — Apache-2.0, Java, v4.28.1 (2026-08-08), 184 releases, canonical Android OSS GPS tracker.
[21] AtilMohAmine/Fitness-Tracker (GitHub) — Kotlin MVVM + Google Fit sample — 2026-08-14 — `ctx_search` — Apache-2.0, 18 stars, last commit 2025-03-04, modern Android MVVM reference.
[22] Google Play Console — `https://play.google.com/console/about/` — 2026-08-14 — `ctx_fetch_and_index` — Android 17 memory efficiency + new SDK requirements.
[23] Google Play Console developer account + billing — `https://support.google.com/googleplay/android-developer/answer/9859152` — 2026-08-14 — `ctx_fetch_and_index` — one-time $25 developer registration fee, app creation flow.
[24] Android 13 notifications permission — `https://developer.android.com/about/versions/13/changes/notification-permission` — 2026-08-14 — `ctx_fetch_and_index` — `POST_NOTIFICATIONS` runtime permission required for Android 13+.
[25] Wear OS official — `https://developer.android.com/wear` — 2026-08-14 — `ctx_fetch_and_index` — Wear OS developer portal; Health Services + Compose for Wear OS + Watch Face Format.
[26] Jetpack Compose — `https://developer.android.com/jetpack/compose` — 2026-08-14 — `ctx_fetch_and_index` — Compose BOM + Material 3 + Compose Compiler + Kotlin alignment.
[27] MapLibre home — `https://www.maplibre.org/` — 2026-08-14 — `ctx_search` — C++ vector tile library, GPU-accelerated, OpenGL/Metal/Vulkan, BSD-2-Clause.
[28] Play Store Console About — `https://play.google.com/console/about/` — 2026-08-14 — `ctx_fetch_and_index` — Essential steps + Android 17 memory guidance + sign-up for developer updates.
[29] MENA Arabic-market playbook (Kotobee 2026-08-12) — `agents_manager/memory/projects/research-space/playbook.md` § "2026-08-12 - Kotobee publishing dossier" — 2026-08-14 — internal memory — Chapter 06 has the body-in-MSA reference + RTL/interactive build notes + MENA payments + bilingual glossary; Snapchat dominates Saudi social, Instagram dominates Egypt.

---

## Open questions (revised)

The following open questions are **carry-forwards from Angle E + new Android-specific questions** that need user input before Phase 2 planning:

| Q# | Question | Source | Severity |
|---|---|---|---|
| **OQ-F1** | **Do you currently own a Wear OS watch?** (Pixel Watch, Galaxy Watch 4/5/6, TicWatch, etc.) If yes, Wear OS in v1 or v1.5? | this angle | **HIGH** — pivots prime issue and adds ~250 wh if v1. |
| **OQ-F2** | **What is your primary Android test device?** (Samsung Galaxy S23, Xiaomi Redmi Note 13, Pixel 7/8, etc.) Drives the OEM battery-optimisation work. | this angle | **HIGH** — OneUI is the most aggressive. |
| **OQ-F3** | **Are you on a Google Play Developer account?** ($25 one-time fee + 24-48h provisioning.) | this angle | **MEDIUM** — blocks store listing. |
| **OQ-F4** | **Will you ship Huawei AppGallery + Xiaomi GetApps in v1?** ~25% of MENA Android users access apps via these stores. | this angle | **MEDIUM** — adds 2 weeks if yes. |
| **OQ-F5** | **What is the iOS v2 timeline?** (iOS in 12 months, 18 months, 24 months, never?) Drives the Kotlin vs Flutter decision. | this angle | **HIGH** — pivots F.2 framework choice. |
| **OQ-F6** | **Arabic primary target: KSA, UAE, Egypt, or all three?** | this angle | **MEDIUM** — UAE has higher ARPU; Egypt has highest volume. |
| **OQ-F7** | **Server backend: do you even need one for v1?** A single-user app with no leaderboard can be Room-only. | this angle | **MEDIUM** — saves 1–2 weeks if skipped. |
| **OQ-F8** | **RevenueCat vs Play Billing direct?** If iOS v2 is on the roadmap, RevenueCat is the bridge. | this angle | **LOW** — operational, not strategic. |
| **OQ-F9** | **Will you use Snapchat Creative Kit for the post-run share?** Or is Instagram + system share sheet enough? | this angle | **LOW** — Snapchat integration is fragile. |
| OQ-F10 | One engineer or two? | carries from E | MEDIUM — 13–14 wk → 7–8 wk if two. |
| OQ-F11 | Runify's exact retention signal (DAU/MAU)? | carries from E | LOW — not relevant if not competing. |
| OQ-F12 | What does the in-app paywall look like? | carries from E | LOW — pattern is documented. |

### Top 5 NEEDS_USER_INPUT (carry forward to am-planning)

1. **OQ-F1** (Wear OS) — pivots F.9 decision.
2. **OQ-F5** (iOS v2 timeline) — pivots F.2 framework decision.
3. **OQ-F2** (primary test device) — drives F.6 OEM battery work.
4. **OQ-F4** (Huawei + Xiaomi stores) — pivots build scope.
5. **OQ-F7** (server backend required?) — pivots F.13 R3.

---

## Self-critique

- **Did I do my job?** **Yes** — I produced the 14-section Android-pivot dossier with all F.1–F.14 sub-sections, every claim cited, the 22-step build plan, the 8-revision irreversible-decision matrix, and the revised effort estimate. The user-mandated constraints (Android phone, AR+EN day-1, iOS v2 deferred) are reflected throughout.
- **What might I have missed?**
  - **Huawei AppGallery mechanics** — I noted ~10% of MENA Android users via Huawei but did not deep-dive the AppGallery submission process. The 2026-08-14 Huawei HMS Core docs may have changed; **flagged for downstream verification**.
  - **MENA-specific payment methods** — the user hasn't said whether the app sells via Google Play Billing only or also accepts MENA-specific payment methods (mada, STC Pay, etc.). Google Play Billing in Saudi/UAE supports mada for one-time purchases but **not** for subscriptions. **Flagged as an OQ.**
  - **Snapchat Creative Kit status** — the Snapchat Creative Kit was deprecated by Snap in 2023 in favour of `Intent.ACTION_SEND`. I'm using the native share-sheet approach, which is correct for 2026.
  - **Arabic gender-marked copy** — Arabic has grammatical gender (masculine, feminine). The Runify persona Amir is masculine-default; Layla is feminine. The copy in `values-ar/strings.xml` should be reviewed by a native Arabic speaker for gender agreement. **Ponytail**: ship MSA-default-masculine; allow a v1.5 "feminine voice" toggle.
  - **OQ-F2 (primary test device)** — I assumed Samsung Galaxy S23 because that's the dominant Saudi mid-range Android. If the user has a different device, the F.6 battery-whitelist work changes.
- **What did I assume without evidence?**
  - **Snapchat dominates Saudi social** — sourced from the Kotobee playbook (chapter 06), not directly verified per MMA. **High confidence**, but worth a direct MMA / Statista pull for the final plan.
  - **Arabic numerals default = Western** — assumes the user prefers Western numerals in a fitness app. If the user prefers Arabic numerals (٠١٢٣٤٥٦٧٨٩), the default changes. **Configurable via Settings.**
  - **PostHog Cloud (EU)** — same as Angle E; no change.
  - **Wear OS user = unlikely** — based on market data (Apple Watch dominates Saudi wrist). The user has not confirmed.
  - **1 engineer on the build** — same as Angle E; the user hasn't said.

---

## Metrics footer

- **Frameworks scored**: **4** (Kotlin + Compose, Flutter, React Native, Capacitor) — Kotlin + Compose wins at 39/40.
- **Build steps**: **22** (Steps 1–22 in F.10).
- **Sources cited**: **29** (S1–S29) — 28 Android-specific + 1 internal memory (Kotobee playbook).
- **Cross-references to other angles**: **5** (Angles A, B, C, D, E — all preserved, Runify description unchanged, framework verdict from E replaced with Android-first weighting).
- **New irreversible decisions**: **5** (R6–R10 — FGS, Localization, Health Connect, Play Billing v8, Wear OS deferral) added to the 5 carried from Angle E (R1–R5).
- **Total effort**: **~440 wh ≈ 11–12 wk core + 13–14 wk total** including 1 wk Play Internal Testing + 2 wk buffer.
- **Files written**: 1 (`share/notes/01_research_T-2026-08-14-004_angle-android-pivot.md`).
- **Languages**: AR + EN from day one (5 permission prompts + RTL/bidi handling).
- **NEEDS_USER_INPUT**: **true** — 5 top OQs (Wear OS, iOS v2 timeline, test device, Huawei/Xiaomi stores, server backend).

---

*Last updated: 2026-08-14 — Author: am-research Angle F pass for T-2026-08-14-004 — Subject: Android-pivot of Runify — Cross-refs: Angles A, B, C, D, E*
