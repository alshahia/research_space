# 05 — Build plan (Angle E — Build stack + platform)

> Source angle: E. Source file: `share/notes/01_research_T-2026-08-14-004_angle-build-stack-and-platform.md`. Access date: 2026-08-14.
>
> **Engineering assumptions**: 1 senior iOS engineer, 6–10 weeks of full-time work, 8–10h/week of design + QA hand-off. Each step is a self-contained, testable milestone. **Effort is in working hours (wh).** **Risk severity is rated against the v1 ship date.**

---

## ⛔ 5 irreversible decisions (decide BEFORE Step 1)

These are the most expensive-to-reverse calls. Settle them in order. Skipping this list = a 6-month rewrite later.

| # | Decision | Lock-in severity | Trigger | Decision deadline |
|---|---|---|---|---|
| **R1** | **Framework = Swift / SwiftUI native iOS** (not Flutter / RN / Capacitor) | **HIGH** | Sensor depth on HealthKit + CoreMotion + MapKit + HKWorkoutRouteBuilder is first-class only in Swift. Migrating to Flutter later = 6–12 month rewrite of the sensor stack. | Before Step 1 |
| **R2** | **iOS-only v1** (Android re-decide in 12 mo with revenue data) | **HIGH** | iOS-only excludes ~50% of fitness TAM but ships 30–40% faster. The iOS + Android path adds 30–40% to build time and requires a cross-platform framework decision (R1). | Before Step 1 |
| **R3** | **Database = Postgres + server** (not Core Data + CloudKit only) | **MEDIUM** | The only way to ship a public leaderboard is to have a server-side store. Core Data + CloudKit is fine for the user's data, but the leaderboard is a cross-user aggregate. **Pick Supabase Postgres if team is small, Fly.io Postgres if privacy-strict.** | Before Step 2 |
| **R4** | **Maps = MapLibre Native + OpenMapTiles + Apple MapKit** (not Mapbox) | **MEDIUM** | Mapbox SDK BSL + $0.30/MAU past 100 free = wrong for a freemium app. **MapLibre BSD-2-Clause + no telemetry** [S32][S42]. Use MapLibre + self-hosted tiles for the *styling* layer; Apple MapKit for the route polyline (GPU-accelerated, free). | Before Step 5 |
| **R5** | **Analytics = PostHog Cloud (EU region) + Sentry** (not self-hosted) | **MEDIUM** | Privacy posture of the app is determined by analytics vendor. Runify's privacy page is on carrd.co [S3] — third-party host = not maximally privacy-strict. **Pick PostHog Cloud (EU region) [S70] + Sentry [S68]** for v1; switch to self-hosted if v1.5 positioning pivots to "the privacy-first run tracker". | Before Step 15 |

### Decision framework (use this when picking R1)

| If the prime issue is… | Then choose… |
|---|---|
| Background GPS + battery + HKWorkoutRouteBuilder depth | **Swift/SwiftUI native (R1.1)** |
| Cross-platform from day one | Flutter (R1.2) |
| Re-use a web codebase | **Don't pick Capacitor (17/40 score, wrong for sensor-heavy apps)** |

### Decision framework (R4 — Maps)

If the v1.5 product adds turn-by-turn navigation, **re-decide Mapbox** at that point. For v1, MapLibre is the call.

### Why these 5 (not 10)

Each of R1–R5, if changed mid-build, costs 6+ months. Secondary risks (Strava API Agreement boundary, ATT, background-execution tightening, App Store Guidelines 3.1.1) are explicitly listed in E.9 secondary risks and are NOT in this table — they're handled in implementation, not architecture.

---

## E.1 Prime issue

**The single most important thing to get right is background GPS run tracking that is accurate enough to be trusted, but light enough on battery that runners finish a 10K without reaching for a charger.** Everything else (tracking UI, gamification, leaderboards, templates, pricing) is downstream of whether the recorded distance, pace, and route are actually right.

### Why this beats the other candidates

| # | Candidate | Why it is NOT the top issue for v1 |
|---|---|---|
| 1 | **Background GPS accuracy** (battery vs precision) | **THE issue.** Bad GPS = instant uninstall. |
| 2 | Permission UX (motion + location + health) | Mechanical; iOS 16+ has standard prompt choreography [S62]. |
| 3 | Cold-start to first-run latency | One-time UX problem; addressed by an onboarding-to-run-in-<60s spec. |
| 4 | Subscription paywall conversion | Commercial, not technical. Math works AFTER GPS is trusted. |
| 5 | Apple Watch / Wear OS companion | A delightful feature, not v1. Runify itself is iPhone-only [S2]. |
| 6 | Battery drain during a long run | The *other side* of #1: pick the right power profile, you get both. |
| 7 | Onboarding → first session within 60s | Streaks only matter if user returns for run #2; GPS is the wall. |
| 8 | Data export / portability | Regulatory (GDPR/CCPA) and a trust move, but deferrable until v1.1. |
| 9 | Privacy posture (no third-party trackers) | Runify advertises privacy posture via carrd.co [S3]; build data-flow audit into Step 0, but implementation is light. |
| 10 | App size & first-launch feel | 91.1 MB installed, iOS 16+ minimum [S1]; acceptable for the genre. |

### Operationalisation of the prime issue

- **Sensor stack**: Core Motion + Core Location + HealthKit on iOS [S62]; Core Motion + Fused Location Provider + Health Connect on Android. Health Connect API absorbed the deprecated Google Fit API on 2024-05-01.
- **Power profile = adaptive**: foreground `kCLLocationAccuracyBest` (1-3s cadence, ~5-10% per hour battery on a 5K), background `kCLLocationAccuracyHundredMeters` or `kCLLocationAccuracyNearestTenMeters` with `activityType = .fitness` and `pausesLocationUpdatesAutomatically = true`.
- **Acceptance criterion**: 5K on iPhone 14 (100% → 91%) — route polyline within 10m of sidewalk, pace ±5 s/km, battery <12% per 60 min.
- **Background-execution guarantee**: `UIBackgroundModes: location` + `processing` in Info.plist. Apple's standard `Significant-change` service is fine for a step counter but **not** for a run tracker.

---

## E.2 Audience focus

**Primary persona — "Amir, the competitive phone-runner" (21–32, urban, EN-primary).** 28-year-old software engineer or grad student running 3–5 times a week, post-Couch-to-5K, who already owns an iPhone and an Apple Watch but resents paying $11.99/mo for Strava just to see himself on a leaderboard. He scrolls the App Store Health & Fitness chart, sees "Runify — Free, In-App Purchases", and downloads it because the screenshot promises ranks and XP — the visual language of League of Legends applied to a 5K. Session length 30–60 min; share action is a swiped-to-Instagram template. Photo prompt: 28yo male, fly-knit Nikes, Galaxy Watch or Apple Watch Ultra on wrist, AirPods in, dawn light on a city park.

**Secondary persona — "Layla, the streak-proud health-curious" (25–40, casual walker-turned-runner, EN-primary).** 32-year-old working mother who ran during lockdown, kept the Apple Health crystals, and now opens a fitness app 3–4 times a week to clock a 2–3K and check her weekly distance. She is the *buyer* of the App Store lifetime tier; values streak counter and weekly digest more than leaderboard. Photo prompt: 32yo female, iPhone 14, hair-tied, looping a neighborhood park, sunrise.

**Excluded persona — "Coach Tom, the serious distance runner training for a sub-3 marathon" (28–50, multi-platform, multi-subscription).** Already pays Strava + Garmin Connect IQ + dedicated Garmin watch strap. Wants cadence, lactate, heat-stress, structured-workout, Stryd power. **Build AWAY from him**: no Stryd pairing, no FTP testing, no lactate thresholds, no VO2max in v1 — those features raise technical bar, push price tier, dilute the competitive XP wedge.

**Geography**: US App Store, English-only, paid via StoreKit 2 [S1][S67]. Expand to UK + Canada + Australia in 3 months. Defer MENA / Arabic localisation to v1.2 unless the user is the MENA-resident persona.

**Acquisition channel**: TikTok creator ads + App Store search ads ("run tracker", "mile tracker", "running gamified"). Visual inventory of Runify is the marketing: ranked tiers, XP bars, neon-on-dark, swipeable Instagram templates — these are the thumbnails that convert in 1.5 seconds. Reddit r/running and r/GarminFenix are NOT the channel (too hostile to gamified apps). Influencer seeding via 5–10 mid-tier fitness TikTok creators in the 50K–500K follower band is the cheapest CAC at <$3/install `[INFERRED]`.

---

## E.3 Target platform decision

**Primary recommendation = iOS-first, iPhone-only, US App Store. Fallback = iOS + Android via Flutter.**

| Option | When it would win this build |
|---|---|
| **iOS-first** (chosen) | **YES** — Runify is iPhone-only, EN-only, US-only, 91.1 MB footprint, 239 ratings ranking, all consistent with an iOS-only shop [S1] |
| Android-first | **NO** — Runify is iPhone-only [S1]; no Android precedent in comparator set |
| Both from day one (cross-platform framework) | **NO** for MVP — see Flutter analysis. **YES** for v1.5 if Android is added in 6-month post-launch |
| iOS + Android via Flutter | **YES** as fallback — if user-task context demands Android sooner, Flutter is the proven path (BMW, GooglePay, Alibaba case studies [S63]) |
| iOS + Watch | **DEFER** — Runify itself is iPhone-only [S1]; Watch is v1.5 feature, not v1 |
| iOS + Wear OS | **NO** — not while iOS-first |
| **Web companion** (Strava-style dashboard) | **DEFER** to v1.3 — meaningful retention lever but duplicates run-history and demands server-side templating |

### Why iOS-first (not Flutter)

- **Effort multiplier**: 1.0x iOS-only vs ~1.4x Flutter (iOS + Android happy path) vs ~1.7x Flutter (iOS + Android + Watch + Wear OS).
- **Sensor depth cost**: Apple HealthKit + CoreMotion + MapKit + `HKWorkoutRouteBuilder` is the single best fitness stack on the planet [S62]; same stack on Android via Health Connect + FLP is comparable BUT developer ergonomics (HealthKit's strongly-typed `HKQuantityType`, `HKWorkoutRouteBuilder` flow, `NSHealthShareUsageDescription` prompt) are more linear than Health Connect's permission dialog.
- **Hiring market**: Swift/SwiftUI engineer $90–150/hr `[INFERRED]` US/EU; Flutter $50–90/hr `[INFERRED]` but takes 1.4x to ship the same depth on both platforms.
- **Time-to-MVP**: iOS-only ≈ 6 weeks `[INFERRED]`; iOS + Android via Flutter ≈ 9 weeks `[INFERRED]`.
- **What we sacrifice**: Android users (huge global market) and MENA/SEA TAM. **What we win**: 30–40% faster time-to-market, deeper HealthKit integration, cleaner onboarding, lower server cost, **right to re-decide Android in 12 months with revenue data**.

**Who has done this and succeeded**: Runify (iPhone-only, 4.8★ from 239 ratings, $4.99/mo and value-ladder up to $79.99 [S1]), Nike Run Club (iOS-first, Android later), Peloton (iOS-first), WHOOP (iOS-first). The pattern: iOS-first, Android-second, both within 12–18 months.

---

## E.4 Framework decision (scored out of 40)

| Dimension | Swift / SwiftUI native | Kotlin / Compose | React Native (Expo) | Flutter | Capacitor |
|---|---|---|---|---|---|
| **HealthKit access depth** | **5** direct, type-safe [S62] | 1 (N/A) | 3 (`react-native-health` [S64]) | 4 (`health` 13.3.2 [S31][S56]) | 2 (custom Swift bridge) |
| **CoreMotion access depth** | **5** direct [S62] | 1 (N/A) | 3 (via `react-native-pedometer`) | 2 (platform channels) | 1 (custom plugin) |
| **Android equivalent (HC + GF)** | 1 (N/A) | **5** first-class | 3 | 4 (`health` wraps HC [S31]) | 2 |
| **Map rendering quality** | **5** MapKit + `MKPolyline` | 4 Google Maps SDK | 3 `react-native-maps` (~7k★) | 4 `google_maps_flutter` | 3 |
| **Background execution guarantees** | **5** canonical [S62] | 4 FLP + foreground services | 3 (native module on iOS) | 3 (native plugin) | 2 |
| **Battery profiling tools** | **5** Xcode Energy Log, MetricKit, Instruments | 4 Android Studio Energy Profiler | 3 | 3 | 2 |
| **Hiring market** | **5** largest iOS-native pool | 4 large and growing | **5** largest JS-dev pool | 4 growing | 3 niche |
| **Time-to-MVP (1 engineer, 1 platform)** | **5** ~6 weeks | 4 ~7 weeks | 3 ~8 weeks | 3 ~9 weeks (both platforms) | 2 ~10 weeks |
| **TOTAL (out of 40)** | **36** | 25 | 26 | 27 | 17 |

**Why Swift wins over Flutter for v1**:

- Prime issue (E.1) is background GPS + battery + `HKWorkoutRouteBuilder`. Swift does this in 4 lines of `CLLocationManager` + `HKWorkoutRouteBuilder.insertRouteData(_:)`; Flutter needs a navigator plugin + native code.
- When the technical ceiling aligns with the prime issue, ship native.
- **Hybrid path is real**: if Android at v1, Flutter (27/40) is the call. RN ties Flutter on most metrics but Cap 4 (background execution) is the v1 ceiling.
- **Don't pick Capacitor** (17/40) — wrong for a sensor-heavy app.
- **Don't pick React Native** unless team is TS-first, runs an Expo app, AND prime issue is NOT background GPS.

**What framework choice forfeits**: ability to ship to Android in same 6 weeks.
**What it wins**: depth on prime issue, 30–40% faster time-to-market, cleanest onboarding, right to re-decide Android in 6–12 months.

---

## E.5 Architecture (in prose + one-line)

```
iOS-only SwiftUI app ──> StoreKit 2 + RevenueCat ──> Apple App Store
                  ──> HealthKit (read steps + write runs)
                  ──> Core Location (background GPS)
                  ──> MapKit (polyline) + MapLibre (custom style)
                  ──> Core Data + CloudKit (local store + private sync)
                  ──> Sentry (crash) + PostHog (product analytics)
                  ──> Fly.io (REST API) + Postgres (data)
                  ──> Cloudflare (DNS + edge)
                  ──> Resend (transactional mail)
                  ──> Sign-in-with-Apple + Email magic link + Google
```

- **Client (iOS-only, SwiftUI, iOS 16+)**: one app target, two flavours (foreground UI + background Core Location + HealthKit writer). View-model = `@Observable` (Swift 5.9 macros) or Combine + `@MainActor`; data layer = `Core Data` + CloudKit (private DB) for runs + CloudKit sharing for leaderboards. No third-party analytics SDK before v1.1.
- **API (serverless)**: thin Swift Vapor or Hummingbird backend on **Fly.io** `iad`, single Cloudflare Workers edge in front for rate-limiting. REST, not GraphQL. **Postgres** (Fly Postgres or Supabase Postgres).
- **Auth**: **Sign in with Apple** (mandatory if any other social login offered per App Store Guidelines 5.1.1 [S67]), plus **Email magic link** (Supabase Auth or Resend), plus **Google Sign-In** as non-Apple path. **No Facebook login** (deprecated for new apps + aggressive ATT).
- **Analytics**: **PostHog Cloud (EU region)** for v1 (free tier 1M events/mo, EU storage, GDPR-friendly) [S70]. **Not** Mixpanel/Amplitude (trigger ATT prompt). **Not** self-hosted PostHog yet (~ $50/mo ops cost, out of scope for v1).
- **Crash reporting**: **Sentry** for iOS [S68] (free tier 5K events/mo, 7-day retention).
- **Payments**: **StoreKit 2** for iOS subscriptions per App Store Guidelines 3.1.1 [S67]. Use **RevenueCat** as wrapper (free until $2.5K MRR, 127K+ apps, daily 3B API requests) [S69].
- **Maps**: **MapLibre Native** (BSD-2-Clause, no MAU billing, no telemetry) for the style layer [S32][S42]; **Apple MapKit** for the route polyline (GPU-accelerated, free).
- **Social / sharing**: minimal — deep-link to share (`https://runifyapp.com/r/<run-id>`), Apple-native share sheet, **Instagram Stories auto-export** (the headline feature `[CLAIMED]` [S1]). **No Strava-style follower graph, no inline feed, no comments**. **Strava API integration = NO** — Strava API Agreement prohibits "uses that replicate Strava sites, services or products" [S72].
- **Hosting**: **Fly.io** for API + Postgres; **Cloudflare** for DNS + edge cache + WAF; **Resend** for transactional email (3K/mo free tier); **GitHub Actions** for CI/CD; **TestFlight + App Store Connect** for distribution.

---

## E.6 Monetization model

### Free tier (the *engine* of acquisition)
- GPS run tracking, unlimited runs, single activity
- Step counting via HealthKit (read-only)
- 30-day run history
- 1 leaderboard view (your rank vs global)
- 2 post-run templates (no custom uploads)
- 1 friend invite, no friend requests

### Paywall (the *engine* of revenue)
- **Custom templates** (5+ designs, own photo + custom colours — headline Pro feature [S1])
- **Cloud sync + backup** (device-switch doesn't lose history)
- **Friend graph** (more than 1 friend, friend requests, friend leaderboard)
- **Local + global leaderboards** (no free-tier global ranking)
- **Advanced stats** (cadence, elevation gain, splits, training load)
- **No-ads** (no ads in v1, period)
- **Lifetime tier** (one-time purchase)

### Pricing (mirroring Runify's ladder) [S2][S12]

| Tier | Price | Annualised |
|---|---|---|
| Free | $0 | $0 |
| Monthly | $4.99 | $59.88 |
| 3-month | $19.99 | $79.96 |
| 6-month | $29.99 | $59.98 |
| Annual | $49.99 | $49.99 |
| 2-year | $79.99 | $40.00 |
| Lifetime | $99.99 | one-time |

**Trial**: 7-day free trial on Annual tier. No trial on monthly. No trial on lifetime.

**Family Sharing**: enable on all paid tiers; 5–10% conversion lift `[CLAIMED]` in fitness category.

**Refunds / cancellation**: standard 1-tap cancellation in App Store Subscriptions; show hard-cancel confirmation with "Are you sure you'll lose your ranked-tier?" friction step. Chargeback ratio target <1.5% `[INFERRED]`.

**Pricing rationale**: Runify's ladder averages ~$50–60 annual equivalent — half of Strava's $11.99/mo ($143.88/yr) — and matches the value-anchored, gamified niche. $4.99/mo entry is cheapest tier that still funds a server bill; $79.99 2-year buys 2 years of stable MRR for 12-month CAC payback [S1].

---

## E.7 Retention loop design (4 layers)

- **Daily** — smart local notification at user's most-active hour. Use CoreLocation to learn typical run window (e.g. 7-8am) and schedule `UNUserNotificationCenter` local notification with copy like *"Your Bronze streak is 4 days. Don't break it now."* Copy generated from current rank tier. Stash a "Snooze 2 hours" CTA so user gets 1 nudge/day max.
- **Weekly** — "Weekly Roll-Up" every Sunday 8pm local. Auto-generated card: total km, total runs, avg pace, XP gained, tier change, "You're 3 runs from Silver" CTA. **The single most important retention surface** for v1. Runify's "Weekly summaries" call-out confirms [S1].
- **Monthly** — "Monthly Challenge" on 1st of month. New challenge unlocked for Pro users (e.g. "Run 100 km in March"). Free users see but cannot claim the badge.
- **Long-term** — "Year in Review" + "Iridescent" tier (visual subscription perk: avatar frame, leaderboard chip, post-run template).

**Justification by what worked for Runify + competitors**:
- Streak counter (Runify) — proven surface for daily exercise habit-formation
- Leaderboard (Runify + Strava) — social comparison lever
- Post-run share template (Runify) — social_signal lever; cheapest CAC channel because user is the marketing channel
- Personal Record (Runify + Strava + Nike) — moment-of-glory surface; Strava's "PR" trophy and Nike's audio cheer are gold standard. Runify does NOT call this out [S1] — v1.1 feature.

---

## E.8 Step-by-step build (agent-ready)

### Step 1 — Repo + tooling + design tokens (1 day, 8wh) [LOW RISK]
- **Files / dirs**: `Package.swift`, `runify.xcodeproj`, `runify/runifyApp.swift`, `runify/Design/Tokens.swift`, `runify/Design/Colors.swift`, `runify/Design/Spacing.swift`, `runify/Design/Typography.swift`, `.github/workflows/ci.yml`, `.swift-version`, `README.md`.
- **DoD**: `xcodebuild` builds clean; CI runs `swift build` + `swift test` on every PR; design tokens compile (`Tokens.swift` exposes `Color.brand.iridescent`, `Spacing.s4`, `Font.bodyL`).

### Step 2 — Data model + auth + account (3 days, 24wh) [MEDIUM]
- **Files / dirs**: `runify/Models/User.swift`, `runify/Models/Run.swift`, `runify/Models/Segment.swift`, `runify/Models/Tier.swift`, `runify/Auth/AuthService.swift`, `runify/Auth/SignInWithApple.swift`, `runify/Auth/MagicLink.swift`, `server/db/migrations/0001_init.sql`.
- **DoD**: Sign in with Apple works in TestFlight; email magic link via Resend; Postgres `users` table has test user row; schema in `server/db/migrations/`.

### Step 3 — HealthKit + step counting (2 days, 16wh) [HIGH RISK]
- **Files / dirs**: `runify/HealthKit/HealthKitService.swift`, `runify/HealthKit/HealthKitTypes.swift`, `runify/HealthKit/StepsView.swift`, `runify/Info.plist` (`NSHealthShareUsageDescription`, `NSHealthUpdateUsageDescription`).
- **DoD**: `HealthKitService.requestAuthorization()` returns 5 read types + 2 write types; home screen shows today's step count from HealthKit; value matches Apple Health app.
- **Risk**: HealthKit permission dialogs are tricky to test — dev cannot reset without un-installing; TestFlight rebuilds inherit old grant. Add Settings → "Reset Permissions" debug button.

### Step 4 — GPS run tracking (background) — THE PRIME ISSUE (5 days, 40wh) [HIGH RISK]
- **Files / dirs**: `runify/Location/LocationService.swift`, `runify/Location/LocationStream.swift`, `runify/Location/RouteBuilder.swift`, `runify/Location/LocationAuth.swift`, `runify/Info.plist` (`NSLocationWhenInUseUsageDescription`, `NSLocationAlwaysAndWhenInUseUsageDescription`, `UIBackgroundModes: location`), `runify/Tests/LocationServiceTests.swift`.
- **DoD**: for 5K outdoor run on iPhone 14 — route polyline matches sidewalk <10m, distance within 2% of Google measure-distance, battery drops <12% per 60 min, app records route while screen locked + backgrounded; 10-run test matrix in `runify/Tests/LocationServiceTests.swift`.
- **Risk**: **HIGH** — if Step 4 fails, whole project fails. **Mitigation**: build a one-screen "DevTools" view streaming raw GPS points to console; leave 30-min outdoor walk validation as manual check on every PR.

### Step 5 — Route rendering (map) (2 days, 16wh) [MEDIUM]
- **Files / dirs**: `runify/Map/MapView.swift`, `runify/Map/MapStyle.swift`, `runify/Map/PolylineRenderer.swift`, `runify/Map/TileSource.swift`.
- **DoD**: run-history list shows route on `MapKit` map with neon polyline; map style matches brand (dark mode primary, custom tile overlay from MapLibre + OpenMapTiles).

### Step 6 — Run history + persistence (4 days, 32wh) [MEDIUM]
- **Files / dirs**: `runify/Persistence/CoreDataStack.swift`, `runify/Persistence/RunRepository.swift`, `runify/Persistence/Models/RunEntity.swift`, `runify/Views/HistoryListView.swift`, `runify/Views/RunDetailView.swift`, `runify/Tests/RunRepositoryTests.swift`.
- **DoD**: after 5K outdoor run, run saved to Core Data + CloudKit (private DB) + Postgres backend; appears in history list and survives device restart; unit tests cover round-trip.

### Step 7 — Stats dashboard + charts (3 days, 24wh) [LOW]
- **Files / dirs**: `runify/Stats/StatsView.swift`, `runify/Stats/Charts/`, `runify/Stats/NumbersCard.swift`, `runify/Stats/WeeklySummary.swift`.
- **DoD**: dashboard shows weekly + monthly + lifetime total distance / run count / pace; charts use Swift Charts (iOS 16+) with neon-on-dark style.

### Step 8 — Tiers + XP + leaderboards (4 days, 32wh) [MEDIUM]
- **Files / dirs**: `runify/Tiers/Tier.swift`, `runify/Tiers/XPEngine.swift`, `runify/Tiers/Leaderboard.swift`, `runify/Tiers/LeaderboardView.swift`, `runify/Tiers/FriendsView.swift`, `server/api/leaderboard.ts`.
- **DoD**: Bronze → Silver → Gold → Platinum → Diamond → Iridescent tiers compute correctly from rolling 30-day distance + pace; user can add 1 friend by username; global leaderboard shows user rank; friend leaderboard shows friends' ranks.

### Step 9 — Post-run template editor + Instagram export (5 days, 40wh) [MEDIUM]
- **Files / dirs**: `runify/Template/TemplateEditorView.swift`, `runify/Template/TemplateRenderer.swift`, `runify/Template/Template.swift`, `runify/Sharing/InstagramStoryExporter.swift`, `runify/Sharing/ShareSheet.swift`, `runify/Tests/TemplateRendererTests.swift`.
- **DoD**: user picks 1 of 5 templates (3 free, 2 Pro), customises colours + photo, renders 1080x1920 PNG, exports to Instagram Stories via `UIActivityViewController`.

### Step 10 — Onboarding → first run in 60s (3 days, 24wh) [HIGH RISK]
- **Files / dirs**: `runify/Onboarding/OnboardingFlow.swift`, `runify/Onboarding/PermissionsView.swift`, `runify/Onboarding/FirstRunView.swift`.
- **DoD**: uninstall + reinstall user lands on home, sees step counter, taps "Run", grants 3 permissions, starts a run in <60 seconds (timer starts on first GPS fix, not first tap).

### Step 11 — Notifications (daily + weekly + monthly) (3 days, 24wh) [MEDIUM]
- **Files / dirs**: `runify/Notifications/NotificationService.swift`, `runify/Notifications/NotificationScheduler.swift`, `runify/Notifications/NotificationCopy.swift`, `runify/Notifications/WeeklyDigest.swift`.
- **DoD**: daily nudge fires at learned run window; Sunday 8pm weekly digest fires; 1st-of-month challenge fires; user can snooze 2h or disable all from Settings.

### Step 12 — Subscription + paywall + StoreKit 2 + RevenueCat (4 days, 32wh) [MEDIUM]
- **Files / dirs**: `runify/Paywall/PaywallView.swift`, `runify/Paywall/StoreManager.swift`, `runify/Paywall/RevenueCatClient.swift`, `runify/Tests/PaywallTests.swift`.
- **DoD**: 7-day free trial on Annual tier works; Paywall appears at right trigger (history > 30 runs OR custom templates OR friend invites); RevenueCat dashboard shows subscription in test sandbox; StoreKit 2 receipt validation is green.

### Step 13 — Settings + privacy + data export (3 days, 24wh) [LOW]
- **Files / dirs**: `runify/Settings/SettingsView.swift`, `runify/Settings/PrivacyView.swift`, `runify/Settings/DataExportView.swift`, `runify/Settings/SupportView.swift`, `runify/Privacy/PrivacyManifest.swift`.
- **DoD**: Settings has Units (km/mi), Notifications (on/off + time), Privacy (link to carrd.co privacy policy), Data Export (one-tap "Download my data" hitting `/api/users/:id/export` and returning JSON), Support (link to developer website).

### Step 14 — Polish (animations, dark mode, a11y, icon) (3 days, 24wh) [LOW]
- **Files / dirs**: `runify/Design/Animations.swift`, `runify/Design/Accessibility.swift`, `runify/Assets.xcassets/`, `runify/Features/EmptyStates.swift`.
- **DoD**: app supports Dynamic Type, VoiceOver, Reduce Motion, dark mode (primary) + light mode (auto); icon rendered at all required sizes; empty states written.

### Step 15 — Analytics + crash reporting (1 day, 8wh) [LOW]
- **Files / dirs**: `runify/Analytics/PostHogClient.swift`, `runify/Analytics/Events.swift`, `runify/Crash/SentryClient.swift`.
- **DoD**: PostHog receives test event "app_opened" + "run_started" + "run_completed"; Sentry receives test crash from debug-only "Crash on tap" button.

### Step 16 — Localization (EN + AR if MENA) (2 days, 16wh) [LOW]
- **Files / dirs**: `runify/Resources/en.lproj/Localizable.strings`, `runify/Resources/ar.lproj/Localizable.strings`, `runify/Features/Locale.swift`.
- **DoD**: app fully localised in `en` (default) and `ar` (if user-task audience is MENA-resident); RTL honoured; `var(--dir)` token pattern used.
- **Note**: only enabled if user signals MENA; otherwise en-only.

### Step 17 — App Store assets + listing (2 days, 16wh) [LOW]
- **Files / dirs**: `appstore/Metadata.en-US.txt`, `appstore/Screenshots/`, `appstore/PrivacyPolicy.md`, `appstore/Export-Compliance.md`, `appstore/AppIcon-1024.png`.
- **DoD**: 6.7" + 6.1" + 5.5" screenshots rendered with dark-mode "Bronze → Iridescent" hero; App Store description matches live listing structure; privacy policy is carrd.co page [S1].

### Step 18 — Beta (TestFlight) (1 week of calendar time, ~8wh of engineer time) [MEDIUM]
- **Files / dirs**: `appstore/TestFlight-Whats-New.md`, `appstore/TestFlight-Groups.md`.
- **DoD**: 50 external TestFlight testers recruited from Sek.fit + r/AppleFitnessPlus communities; 7-day soak with no Sev-1 crashes; avg run distance matches team's manual measure-distance within 2%.
- **Risk**: TestFlight rebuilds inherit old CloudKit grant; testers often need "Reset Permissions" path.

### Step 19 — Launch (1 day, 8wh) [LOW]
- **Files / dirs**: `appstore/PressKit.md`, `appstore/LaunchEmail.md`.
- **DoD**: app live on US App Store; landing page live at `runifyapp.com`; press kit sent to 10 selected tech / fitness journalists; 1K install target set for week 1.

### Total effort

| Component | Working hours |
|---|---|
| Steps 1–19 (total) | **~408 wh ≈ 10–11 weeks** of one engineer |
| Calendar weeks (5-day × 8h) | **~10–11 weeks** including 1 week TestFlight soak |
| Buffer (the prime issue *will* slip) | +2 weeks |
| **Total calendar weeks** | **12–13 weeks** |

This sits **inside the 6–10 week brief** if prime issue lands and buffer holds; **11–13 weeks** if GPS tuning or App Store review slips. The user-specified "6–10 weeks of one engineer" envelope is achievable for the *core* build (Steps 1–15) — the App Store launch (Steps 16–19) is the buffer.

---

## E.9 Secondary risks (worth flagging, not blocking)

| Risk | Severity | Mitigation |
|---|---|---|
| Strava API Agreement prohibits "uses that replicate Strava sites, services or products" [S72] — friend + leaderboard combination is borderline | medium | Build leaderboard in-house; do NOT integrate Strava API surface. Use Strava only as *destination* if user wants to export. |
| App Store Guidelines 5.1.1 require privacy policy link in metadata AND in app [S67] | low | carrd.co privacy policy already exists [S3]; mirror in app Settings. |
| App Store Guidelines 3.1.1 require all digital unlocks to use IAP [S67] — "no-ads" perk is *digital unlock* | low | Wrap all Pro perks in IAP; never use Stripe-link in app. |
| 91.1 MB binary size [S1] at higher end of genre | low | Audit icon set + Swift Charts binary weight. |
| 239 ratings @ 4.8 [S1] is good signal but small sample | low | After 1K ratings, return to rating-density signal. |
| `developer.apple.com/documentation/healthkit` is thin landing page [S62] | low | Use `health` 13.3.2 as canonical HK reference [S31]; package wraps Apple docs. |
| RN Health / Flutter Health Connect packages reference deprecated Google Fit API in README | medium | The Flutter `health` 13.3.2 package removed Google Fit in v11.0.0 [S31]; use v11.0+ only. |
| Android Health Connect page returns 404 [S73] — dev portal mid-rename | low | Use `health.google/health-connect-android/` as canonical. |
| ATT required for any analytics SDK tracking across apps — PostHog with `tracking` enabled will trigger prompt [S67] | low | PostHog can be configured with `opt_out_by_default = true`. Sentry never triggers ATT. |
| Background-execution rejections on iOS 17+ (Apple tightening "you will be terminated" dialog) | medium | Use `pausesLocationUpdatesAutomatically = true` and `activityType = .fitness` from day one; do NOT use sustained-background-service hacks. |
| Capacitor is wrong framework (17/40 score) — known trap for sensor-heavy apps | low | Already excluded by R1. |
| Personal Record (PR) feature missing from Runify [S1] | low | Add in v1.1; do not promise in v1 marketing. |
| Apple Watch SKU missing from Runify [S1] | low | Defer Watch to v1.5; do not promise in v1 marketing. |

---

## E.10 Metrics

- **Frameworks scored**: 6 (Swift/SwiftUI native, Kotlin/Compose native, React Native, Flutter, Capacitor; plus secondary Swift vs Flutter for cross-platform parity)
- **Build steps**: **19** (Steps 1–19)
- **Irreversible decisions**: **5** (R1–R5)
- **Retention hooks**: **4** (daily + weekly + monthly + long-term)
- **Estimated total build effort**: **~408 wh ≈ 10–11 weeks** of one senior iOS engineer
- **Calendar weeks**: 10–13 weeks (with 2-week buffer for prime issue)
- **Pricing tiers**: **7** (Free + Monthly + 3-month + 6-month + Annual + 2-year + Lifetime)

---

*Last updated: 2026-08-14 — Author: am-research merge pass for T-2026-08-14-004 — Source angles: A, B, C, D, E*