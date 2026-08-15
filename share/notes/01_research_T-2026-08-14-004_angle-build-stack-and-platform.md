# Angle E - Build stack + platform decision (T-2026-08-14-004)

**Date:** 2026-08-14
**Trigger:** initial (parallel-research mode, angle E)
**Sub-agent:** research (am-research)
**Cross-reference status:** `app-deep-dive`, `ui-screens-monetization`, `competitive-landscape`, `open-source-alternatives` files do NOT yet exist on disk. Claims that depend on them are tagged `[INFERRED — pending cross-reference]`. Real-world evidence below is drawn from the live App Store listing, vendor docs, and the 11 prior research outputs in this repo.

> **Reuses:** `agents_manager/memory/projects/research-space/playbook.md` § "2026-08-13 - Kotobee publishing dossier" (MENA/Arabic-market pattern), § "2026-08-10 - Book-to-video" (Measured-audio-first / pipeline-shape pattern), § "2026-08-12 - Book-selling platforms" (Two-test decision gate framing). No prior run-tracking fitness app research exists in this repo.

---

## E.1 Prime issue to focus on

**The single most important thing to get right is background GPS run tracking that is accurate enough to be trusted, but light enough on battery that runners finish a 10K without reaching for a charger.** Everything else (tracking UI, gamification, leaderboards, templates, pricing) is downstream of whether the recorded distance, pace, and route are actually right. Strava, Nike Run Club, Adidas Running, and Runify all win or lose on this: if the GPS dot is on the wrong side of the street, runners notice within one session and churn within a week [S1][S2][S3]. The Runify listing explicitly calls out "Ranked Running & Mile Tracker" and "Auto-filled template editor · Includes time, distance, and pace" as the headline features [S1] - every one of these depends on the GPS signal being trusted.

**Why this beats the other candidates:**

| # | Candidate | Why it is NOT the top issue for v1 |
|---|---|---|
| 1 | **Background GPS accuracy** (battery vs precision) | **THE issue.** Bad GPS = instant uninstall. |
| 2 | Permission UX (motion + location + health) | Necessary but mechanical; iOS 16+ has standard prompt choreography [S13]; Runify lists it as the only declaring field on the App Store privacy card [S1]. |
| 3 | Cold-start to first-run latency | One-time UX problem; addressed by an onboarding-to-run in <60s spec. |
| 4 | Subscription paywall conversion | Commercial, not technical. Runify Pro lists $4.99 / mo ($59.88 / yr) and a tiered $19.99-$79.99 ladder [S1] - the math works AFTER the GPS is trusted. |
| 5 | Apple Watch / Wear OS companion | A delightful feature, not a v1 requirement. Runify itself is iPhone-only with no Watch listing [S1]. |
| 6 | Battery drain during a long run | This is the *other side* of #1: pick the right power profile (e.g. `kCLLocationAccuracyBest` + `pausesLocationUpdatesAutomatically`) and you get both. |
| 7 | Onboarding → first session within 60s | Streaks only matter if the user returns for run #2; onboarding is the gate, GPS is the wall. |
| 8 | Data export / portability | Regulatory (GDPR/CCPA) and a trust move, but deferrable until v1.1. |
| 9 | Privacy posture (no third-party trackers) | Runify advertises its privacy posture via carrd.co privacy page [S1]; build the data-flow audit into step 0, but the implementation is light. |
| 10 | App size & first-launch feel | 91.1 MB installed, iOS 16+ minimum [S1]; acceptable for the genre. |

**Operationalisation of the prime issue:**

- **Sensor stack = Core Motion + Core Location + HealthKit on iOS**; **Core Motion + Fused Location Provider + Health Connect on Android** [S4][S5][S6]. Health Connect API absorbed the deprecated Google Fit API on 2024-05-01 [S5].
- **Power profile = adaptive**: foreground `kCLLocationAccuracyBest` (1-3 s cadence, ~5-10% per hour battery on a 5K), background `kCLLocationAccuracyHundredMeters` or `kCLLocationAccuracyNearestTenMeters` with `activityType = .fitness` and `pausesLocationUpdatesAutomatically = true` (the official "always-on" cheat that avoids the "looks like a sustained service" rejection) [S4].
- **Acceptance criterion:** for a 5K run on a stock iPhone 14 (battery 100% → 91%), the route polyline is within 10m of the actual sidewalk; pace is within ±5 s/km; the battery drain is under 12% per 60 min - both verifiable with a 10-run test matrix.
- **Background-execution guarantee = `UIBackgroundModes: location` + `processing` in Info.plist**; Apple's standard `Significant-change` service is fine for a step counter but **not** for a run tracker [S4].

---

## E.2 Audience focus

**Primary persona - "Amir, the competitive phone-runner" (21-32, urban, EN-primary).** A 28-year-old software engineer or grad student running 3-5 times a week, post-Couch-to-5K, who already owns an iPhone and an Apple Watch but resents paying $11.99/mo for Strava just to see himself on a leaderboard. He scrolls the App Store Health & Fitness chart, sees "Runify - Free, In-App Purchases", and downloads it because the screenshot promises ranks and XP - the visual language of League of Legends applied to a 5K. His session length is 30-60 min; his "share" action is a swiped-to-Instagram template, not a long private story. Photo prompt: 28yo male, fly-knit Nikes, Galaxy Watch or Apple Watch Ultra on the wrist, AirPods in, dawn light on a city park.

**Secondary persona - "Layla, the streak-proud health-curious" (25-40, casual walker-turned-runner, EN-primary).** A 32-year-old working mother who ran during lockdown, kept the Apple Health crystals, and now opens a fitness app 3-4 times a week to clock a 2-3K and check her weekly distance. She is the *buyer* of the App Store lifetime tier; she values the streak counter and weekly digest more than the leaderboard. Photo prompt: 32yo female, iPhone 14, hair-tied, looping a neighborhood park, sunrise.

**Excluded persona - "Coach Tom, the serious distance runner training for a sub-3 marathon" (28-50, multi-platform, multi-subscription).** This user already pays Strava + a Garmin Connect IQ + a dedicated Garmin watch strap; she does not want a gamified ranked-tier app, she wants cadence, lactate, heat-stress, structured-workout, and Stryd power. Building for Tom means competing with Garmin's locked-in ecosystem and a 10-year head start. Build **away** from him: do not add Stryd pairing, FTP testing, lactate thresholds, or VO2max estimation in v1 - those features raise the technical bar, push the price tier, and dilute the competitive XP wedge that is Runify's actual moat.

**Geography.** First market = **US App Store, English-only, paid via StoreKit 2** [S1]. Expand to **UK + Canada + Australia** in the same locale (3 months after launch). Defer MENA / Arabic localisation to **v1.2** unless the user is the MENA-resident persona from `share/handoffs/00_user_task_T-2026-08-14-004.md` (the prior Kotobee playbook set the Arabic-research bar at Modern Standard Arabic with transliterated technical terms [S-RT-1]). Runify's own listing is EN-only at 91.1 MB, two-decimal pricing [S1] = the developer is showing zero indication of intending MENA.

**Acquisition channel.** TikTok creator ads + App Store search ads ("run tracker", "mile tracker", "running gamified"). The visual inventory of Runify is the marketing: ranked tiers, XP bars, neon-on-dark, swipeable Instagram templates - these are the *thumbnails* that convert in 1.5 seconds. Reddit r/running and r/GarminFenix are NOT the channel (too hostile to gamified apps). Influencer seeding via 5-10 mid-tier fitness Tiktok creators in the 50K-500K follower band is the cheapest CAC at <$3/install [INFERRED — pending cross-reference | based on prior Kotobee playbook's "agency-channel as primary GTM" pattern].

---

## E.3 Target platform decision

**Primary recommendation = iOS-first, iPhone-only, US App Store.** **Fallback = iOS + Android via Flutter.**

| Option | Winning condition (verbatim) | When it WOULD win this build |
|---|---|---|
| **iOS-first** (chosen) | Audience is RUN on an iPhone, US App Store is the fitness innovation engine, HealthKit + CoreMotion + `HKWorkoutRouteBuilder` give the deepest sensor stack on the market | **YES** - Runify is iPhone-only, EN-only, US-only, with a 91.1 MB footprint and 239 ratings ranking, all consistent with an iOS-only shop [S1] |
| Android-first | Audience is in MENA / SEA / India where iPhone share is <15%, or the OS-specific chips (BLE heart-rate straps, Wear OS) are mandatory | **NO** - Runify is iPhone-only [S1]; user-task audience is unclear; no precedent for Android in the comparator set |
| Both from day one (cross-platform framework) | Build budget is finite, audience is truly cross-platform, sensors can be deep via platform channels | **NO** for MVP - see "iOS + Android via Flutter" analysis below. **YES** for v1.5 if Android is added in 6-month post-launch. |
| iOS + Android via Flutter | One codebase, two stores, both sensors reachable via plugins (`health` 13.3.2 [S5] + `health_connect` + `flutter_background_geolocation`) | **YES** as fallback - if the user-task context demands Android sooner, Flutter is the proven path (BMW, GooglePay, Alibaba case studies [S7]). |
| iOS + Watch | Apple Watch is the natural companion to a runner, GPS + heart-rate on the wrist | **DEFER** - Runify itself is iPhone-only and no Watch SKU is listed [S1]; Watch is a v1.5 feature, not a v1. |
| iOS + Wear OS | Cross-device Android budget | **NO** - not while iOS-first |
| **Web companion** (Strava-style dashboard) | Users want to analyse runs on a big screen, share routemaps, deep-link routes | **DEFER** to v1.3 - the dashboard surface is a meaningful retention lever but it duplicates the run-history screen and demands a server-side templating system. |

**Why iOS-first is the call (not Flutter):**

- **Effort multiplier for v1 = 1.0x iOS-only vs ~1.4x Flutter single-engineer (iOS + Android happy path) vs ~1.7x Flutter single-engineer (iOS + Android + Watch + Wear OS)** [INFERRED - based on shared README patterns from 5 Flutter production case studies [S7]].
- **Sensor depth cost:** Apple HealthKit + CoreMotion + MapKit + `HKWorkoutRouteBuilder` is the single best fitness stack on the planet [S4]; the same stack on Android via Health Connect + Fused Location Provider is genuinely comparable BUT the developer ergonomics (HealthKit's strongly-typed `HKQuantityType`, the `HKWorkoutRouteBuilder` flow, the `NSHealthShareUsageDescription` prompt) are far more linear than Health Connect's permission dialog spaghetti [S5][S6].
- **Hiring market:** A Swift/SwiftUI engineer runs $90-150/hr in the US/EU; a Flutter engineer is $50-90/hr in the same market but takes 1.4x to ship the same depth on both platforms [INFERRED — not directly cited, mark as estimate].
- **Time-to-MVP for iOS-only = ~6 weeks** (per the 19-step plan in E.8); Time-to-MVP for iOS + Android via Flutter = ~9 weeks (single engineer, both stores, single codebase).
- **What we sacrifice:** Android users (huge global market) and the MENA/SEA TAM. **What we win:** 30-40% faster time-to-market, deeper HealthKit integration, cleaner onboarding, lower server cost (one platform), and the right to *re-decide* Android in 12 months with revenue data.

**Who has done this and succeeded:** Runify itself (iPhone-only, 4.8★ from 239 ratings, $4.99/mo and a value-ladder up to $79.99 [S1] - this is the live reference). Nike Run Club (iOS-first for years, Android added later). Peloton (iOS-first, Android later). WHOOP (iOS-first). The pattern is the same: iOS-first, Android-second, both within 12-18 months.

---

## E.4 Framework decision

**Recommended framework: Swift 5.10 + SwiftUI on iOS 17+ (degrading to iOS 16 via conditional UIKit shims).** Justified by the 8-dimension scoring matrix below.

| Dimension (1-5) | Swift / SwiftUI (native iOS) | Kotlin / Jetpack Compose (native Android) | React Native (Expo) | Flutter | Capacitor |
|---|---|---|---|---|---|
| **HealthKit access depth** | **5** - direct, type-safe, `HKWorkoutRouteBuilder`, `HKLiveWorkoutBuilder` [S4] | 1 (N/A - no HealthKit on Android) | 3 - `react-native-health` covers most APIs (1.2k★, MIT, 287 forks, 890 commits) [S8] | 4 - `health` 13.3.2 (BSD-3-Clause, Actively Maintained by `carp.dk` [S5]) covers HealthKit + Health Connect + writes + workout routes | 2 - requires custom Swift bridge plugin for HealthKit |
| **CoreMotion access depth** | **5** - direct (`CMMotionActivityManager`, `CMPedometer`, `CMAltimeter`) [S4] | 1 (N/A) | 3 - via `react-native-pedometer` (community) | 2 - via platform channels; less idiomatic | 1 - requires custom plugin |
| **Android equivalent (Health Connect + Google Fit)** | 1 (N/A) | **5** - first-class via Jetpack Health Services Compose | 3 - via `react-native-health-connect` (community) | 4 - `health` 13.3.2 wraps Health Connect end-to-end [S5] | 2 - requires custom plugin |
| **Map rendering quality** | **5** - MapKit + `MKPolyline` + tile-overlay API [S9] | 4 - Google Maps SDK for Android | 3 - `react-native-maps` (community, ~7k★) | 4 - `google_maps_flutter` is mature | 3 - via `capacitor-google-maps` |
| **Background execution guarantees** | **5** - `UIBackgroundModes: location` + `pausesLocationUpdatesAutomatically` is the canonical and Apple-approved pattern [S4] | 4 - Fused Location Provider + foreground services | 3 - requires native module on iOS | 3 - requires native plugin | 2 - requires native plugin |
| **Battery profiling tools** | **5** - Xcode Energy Log, MetricKit, `os_signpost`, `Instruments > Energy` | 4 - Android Studio Energy Profiler, Battery Historian | 3 - Vysor + native tools | 3 - Android Studio + DevTools | 2 - browser DevTools only |
| **Hiring market** | **5** - the largest pool of iOS-native engineers globally | 4 - large and growing | **5** - the largest pool of JS devs (any web dev can ramp) | 4 - growing | 3 - niche |
| **Time-to-MVP (single engineer, one platform)** | **5** - ~6 weeks per the E.8 plan | 4 - ~7 weeks equivalent | 3 - ~8 weeks includes native module glue | 3 - ~9 weeks for both platforms at parity | 2 - ~10 weeks and the bridge code is yours |
| **TOTAL (out of 40)** | **36** | 25 | 26 | 27 | 17 |

**Why Swift wins over Flutter for v1:**

- The prime issue (E.1) is **background GPS + battery + `HKWorkoutRouteBuilder`**. Swift does this in 4 lines of `CLLocationManager` + `HKWorkoutRouteBuilder.insertRouteData(_:)`; Flutter needs a navigator plugin + native code + a TypeScript chord (Flutter 3.24 adds a `flutter_map` plugin that is still beta and doesn't yet match MapKit's polish). When the *technical ceiling* aligns with the prime issue, ship native.
- **The hybrid path is real:** if the user is committed to Android at v1, **Flutter is the right call** (27/40 vs React Native 26/40 vs Capacitor 17/40, and Flutter is the only one that scores >4 on Health Connect depth [S5][S7]). React Native ties on most metrics but Cap 4 (background execution) is the v1 ceiling.
- **Don't pick Capacitor** - the score is 17/40 and the Energy Profiler / Battery profiling story is the worst of the four. Capacitor is right for a content app (e.g. a book platform); wrong for a sensor-heavy one.
- **Don't pick React Native** unless the team is TypeScript-first, the team already runs an Expo app, and the prime issue is *not* background GPS. The `react-native-health` package is "fine" (1.2k★, 890 commits, MIT) [S8] but every "fine" wrapper is a layer of bug-surface between you and the OS API.

**What the framework choice forfeits:** the ability to ship to Android in the same 6 weeks. **What it wins:** depth on the prime issue, 30-40% faster time-to-market, the cleanest onboarding, and the right to re-decide Android in 6-12 months once the iOS revenue is real.

---

## E.5 Build approach (the "how")

### MVP scope (v1)

A 91.1 MB iPhone-only EN app that (1) tracks outdoor runs with GPS at <12% battery per hour and <10m route accuracy, (2) reads steps from HealthKit, (3) renders the route on a MapKit polyline, (4) saves every run locally + to a private backend, (5) awards XP per run and tiers the user (Bronze → Iridescent) based on rolling 30-day distance + pace, (6) lets you add friends by username and view a single global + friend leaderboard, (7) ships a 2D post-run template editor that exports to Instagram Stories, and (8) hides a Runify Pro paywall behind history > 30 runs OR custom templates OR friend invites. **No Apple Watch SKU, no social feed, no training plans, no custom audio coaching, no dry-land yoga, no podcast integration** in v1 [S1].

### Architecture (in prose)

- **Client (iOS-only, SwiftUI, iOS 16+)** - one app target, two flavours: foreground (UI) and background (Core Location + HealthKit writer). View-model layer is `@Observable` (Swift 5.9 macros) or Combine + `@MainActor`; data layer is `Core Data` + CloudKit (private DB) for runs + CloudKit sharing for leaderboards. No third-party analytics SDK before v1.1.
- **API (serverless)** - a thin Swift Vapor or Hummingbird backend hosted on **Fly.io** in `iad` for low latency to the US East Coast, with a single Cloudflare Workers edge in front of the API for rate-limiting. REST, not GraphQL (the entity count is <20: User, Run, Segment, Route, Template, Friend, Leaderboard, Tier, XPEvent, Subscription). One Postgres database (Fly Postgres or Supabase Postgres) [S10].
- **Database** - **Postgres on Fly.io** (managed) or **Supabase Postgres** if the team is small. Schema is 7 tables: `users`, `runs`, `segments`, `routes`, `templates`, `friendships`, `leaderboard_snapshots`. Each row carries a `user_id` and a `created_at`. Use **RLS** (Row-Level Security) if Supabase. No Realm on the device (lock-in; the Apple-recommended path is `Core Data` + CloudKit for sync, and the *fallback* sync to Postgres is server-side only) [S10].
- **Auth** - **Sign in with Apple** (mandatory if any other social login is offered per App Store Guidelines 5.1.1 [S11]), plus **Email magic link** (via Supabase Auth or a custom mailer on a transactional service like Resend), plus **Google Sign-In** as a non-Apple path. **No Facebook login** (deprecated for new apps and aggressive ATT).
- **Analytics** - **PostHog Cloud (EU region)** for v1 (free tier: 1M events/mo, EU-region storage, GDPR-friendly) [S15]. **Not **Mixpanel/Amplitude** (they ship SDKs that trigger the App Tracking Transparency prompt and increase review risk). **Not** self-hosted PostHog yet (the operational cost is ~$50/mo for a 1-engineer team; out of scope for v1).
- **Crash reporting** - **Sentry** for iOS [S13]. Self-hosted GlitchTip is technically fine but the operational cost is higher than Sentry's free tier (5K events/mo, 1 project, 7-day retention). Switch to GlitchTip *only* if the privacy posture rejects Sentry's data residency.
- **Payments** - **StoreKit 2** for iOS subscriptions (the only legal in-app unlock mechanism per App Store Guidelines 3.1.1 [S11]). Use **RevenueCat** as the subscription wrapper (free until $2.5K MRR, 127K+ apps use it, daily 3B API requests [S14]) - RevenueCat handles receipt validation, refund webhooks, paywall A/B testing, and the future Android migration. **No Stripe for in-app subscriptions** (Apple prohibits it).
- **Maps** - **MapLibre Native with OpenMapTiles + Apple MapKit for the foreground map** and **Apple MapKit for the route polyline** [S9][S16]. **Mapbox** is the commercial alternative (Navigation SDK free up to 100 MAU, then $0.30/MAU + per-trip fees [S9]); do NOT pick Mapbox for v1 because the free tier is too tight for a freemium app and the per-MAU cost at 10K MAU is real. **MapLibre Native is BSD-2-Clause, no MAU billing, no telemetry** - the right call for a paywall-free fitness app [S16]. **Use Apple MapKit** for the polyline rendering because it's GPU-accelerated and free; **use MapLibre + self-hosted tiles** for the *styling* layer (dark / neon / custom map skins that match Runify's aesthetic).
- **Social / sharing** - **minimal**: deep-link to share (`https://runifyapp.com/r/<run-id>`), Apple-native share sheet, **Instagram Stories auto-export via the template editor** (the headline feature of Runify [S1]). **No Strava-style follower graph, no inline feed, no comments**. **Strava API integration = NO** (their API Agreement prohibits "uses that replicate Strava sites, services or products" and a leaderboard-with-friends arguably crosses that line [S17]).
- **Hosting** - **Fly.io** for the API + Postgres (low-latency multi-region, $5/mo minimum); **Cloudflare** for DNS + edge cache + WAF; **Resend** for transactional email (3K/mo free tier); **GitHub Actions** for CI/CD; **TestFlight + App Store Connect** for distribution. **No Vercel** (wrong region games for a global API).

### Architecture diagram (one-line form)

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

---

## E.6 Monetization model

**Free tier (the *engine* of acquisition):**

- GPS run tracking, unlimited runs, single activity
- Step counting via HealthKit (read-only)
- 30-day run history
- 1 leaderboard view (your rank vs global)
- 2 post-run templates (no custom uploads)
- 1 friend invite, no friend requests

**Paywall (the *engine* of revenue):**

- **Custom templates** (5+ designs, your own photo + custom colours - the headline feature behind Runify Pro [S1])
- **Cloud sync + backup** (so a device-switch doesn't lose your history)
- **Friend graph** (more than 1 friend, friend requests, friend leaderboard)
- **Local + global leaderboards** (no free-tier global ranking)
- **Advanced stats** (cadence, elevation gain, splits, training load)
- **No-ads** (no ads in v1, period)
- **Lifetime tier** (one-time purchase)

**Pricing (mirroring Runify's own ladder) [S1]:**

| Tier | Price | Annualised | Runify reference |
|---|---|---|---|
| Free | $0 | $0 | "Free, In-App Purchases" |
| Monthly | $4.99 | $59.88 | "Runify Pro Monthly $4.99" |
| 3-month | $19.99 | $79.96 | implied tier |
| 6-month | $29.99 | $59.98 | "Runify Pro $29.99" |
| Annual | $49.99 | $49.99 | "Runify Pro $49.99" |
| 2-year | $79.99 | $40.00 | "Runify Pro $79.99" |
| Lifetime | $99.99 | one-time | not in Runify listing; add as a *delighter* |

**Trial:** **7-day free trial on the Annual tier** (Apple's "Free Trial" Introductory Offer is the standard pattern; the 3-month / 6-month / annual / 2-year tiers are *promotional* offers that require a confirmed renewal intent). **No trial on monthly** (too leaky). **No trial on lifetime** (defeats the model).

**Family Sharing:** enable on all paid tiers; this is a 5-10% conversion lift in the fitness category [INFERRED — not directly cited, mark as estimate; assumes Apple Family Sharing parity].

**Refunds / cancellation:** standard 1-tap cancellation in App Store Subscriptions; the app shows a hard-cancel confirmation with a "Are you sure you'll lose your ranked-tier?" friction step. Chargeback ratio target <1.5% (the App Store average for fitness apps is 1.2-2.0%) [INFERRED — pending cross-reference].

**Pricing rationale:** Runify's ladder averages out to ~$50-60 annual equivalent, which is **half of Strava's $11.99/mo ($143.88/yr)** and matches the value-anchored, gamified niche. The $4.99/mo entry is the cheapest tier that still funds a server bill; the $79.99 2-year tier is the "lock-in" tier that buys 2 years of stable MRR for a 12-month CAC payback [S1].

---

## E.7 Retention loop design

**Daily hook - smart local notification at the user's most-active hour.** Use CoreLocation to learn the user's *typical* run window (e.g. 7-8am) and schedule a `UNUserNotificationCenter` local notification at the start of that window with copy like *"Your Bronze streak is 4 days. Don't break it now."* Copy is generated from the rank tier the user is currently in, not a generic nudge. Stash a "Snooze 2 hours" CTA so the user gets 1 nudge/day max. Strava's "your friends are running" weekly email is the partial analog [S2].

**Weekly hook - "Weekly Roll-Up" every Sunday 8pm local.** Auto-generated card showing: total km, total runs, average pace, XP gained, tier change (Bronze → Silver), and a "You're 3 runs from Silver" CTA. **This is the single most important retention surface** for v1 - it is the *email* version of the Streak counter, and it is the lever that converts a once-a-week user into a 3x/week user. Runify's own "Weekly summaries and lifetime stats" call-out in the App Store listing confirms the surface is intentional [S1].

**Monthly hook - "Monthly Challenge" on the 1st of the month.** A new challenge every month unlocked for Pro users (e.g. "Run 100 km in March" or "Run 5K under 25:00"). Free users see the challenge but cannot claim the badge. The challenge *itself* is just a SQL query with a check function; the value is the *unlock* and the *badge* - both are social currency, the wedge that Runify's "Compete With Friends" is monetising [S1].

**Long-term hook - "Year in Review" + "Iridescent" tier.** Runify's top tier is "Iridescent", which is the rare/seasonal visual identity [S1]. The Year in Review (Apple's "Year in Review" was the 2023-2024 fitness-app template) is the late-December surface that converts a 12-month user into a 24-month user. **Iridescent is a *visual subscription perk*, not a power perk** - it changes the avatar frame, the leaderboard chip, and the post-run template - it costs nothing to maintain and is the *only* reason a serious user upgrades to the $79.99 2-year tier.

**Justification by what worked for Runify + competitors:**

- **Streak counter** (Runify) - the proven surface for daily exercise habit-formation. *"Lose rank if you go inactive"* is the explicit Runify copy [S1]. The streak is a *negative* game (you lose rank if you stop) which is the criticism of all streaks; soften with a 1-day "streak saver" Pro perk.
- **Leaderboard (Runify + Strava)** - the social comparison lever. Runify has *Friends, Global, Local* leaderboards [S1]; Strava pioneered the *Local leaderboard* (segment) model. Both work.
- **Post-run share template (Runify)** - the social_signal lever. Runify exports "directly to Instagram" [S1] - this is the *cheapest* CAC channel because the user is the marketing channel.
- **Personal Record (Runify + Strava + Nike)** - the moment-of-glory surface. Strava's "PR" trophy and Nike's audio cheer are the gold standard. Runify does not call this out in the listing [S1] - it is a v1.1 feature.

---

## E.8 Step-by-step build (agent-ready)

**Engineering assumptions:** 1 senior iOS engineer, 6-10 weeks of full-time work, 8-10h/week of design + QA hand-off. Each step is a self-contained, testable milestone. **Effort is in working hours (wh).** **Risk severity is rated against the v1 ship date.**

### Step 1 — Repo + tooling + design tokens (1 day, 8wh)

- **Files / dirs:** `Package.swift`, `runify.xcodeproj`, `runify/runifyApp.swift`, `runify/Design/Tokens.swift`, `runify/Design/Colors.swift`, `runify/Design/Spacing.swift`, `runify/Design/Typography.swift`, `.github/workflows/ci.yml`, `.swift-version`, `README.md`.
- **DoD:** `xcodebuild` builds clean; CI runs `swift build` + `swift test` on every PR; design tokens compile (`Tokens.swift` exposes `Color.brand.iridescent`, `Spacing.s4`, `Font.bodyL`).
- **Risk:** low.

### Step 2 — Data model + auth + account (3 days, 24wh)

- **Files / dirs:** `runify/Models/User.swift`, `runify/Models/Run.swift`, `runify/Models/Segment.swift`, `runify/Models/Tier.swift`, `runify/Auth/AuthService.swift`, `runify/Auth/SignInWithApple.swift`, `runify/Auth/MagicLink.swift`, `server/db/migrations/0001_init.sql`.
- **DoD:** Sign in with Apple works in TestFlight; email magic link works via Resend; the Postgres `users` table has a row for the test user; schema is in `server/db/migrations/`.
- **Risk:** medium (Sign in with Apple has Apple-specific setup steps; the team often forgets to enable the capability in App Store Connect).

### Step 3 — HealthKit + Health Connect permissions + step counting (2 days, 16wh)

- **Files / dirs:** `runify/HealthKit/HealthKitService.swift`, `runify/HealthKit/HealthKitTypes.swift`, `runify/HealthKit/StepsView.swift`, `runify/Info.plist` (`NSHealthShareUsageDescription`, `NSHealthUpdateUsageDescription`).
- **DoD:** `HealthKitService.requestAuthorization()` returns the 5 expected read types + 2 write types; the home screen shows today's step count from HealthKit; the value matches the Apple Health app to the unit.
- **Risk:** high (HealthKit permission dialogs are notoriously tricky to test - the dev cannot reset them without un-installing the app, and TestFlight rebuilds inherit the old grant. Add a Settings → "Reset Permissions" debug button).

### Step 4 — GPS run tracking (background) — THE PRIME ISSUE (5 days, 40wh)

- **Files / dirs:** `runify/Location/LocationService.swift`, `runify/Location/LocationStream.swift`, `runify/Location/RouteBuilder.swift`, `runify/Location/LocationAuth.swift`, `runify/Info.plist` (`NSLocationWhenInUseUsageDescription`, `NSLocationAlwaysAndWhenInUseUsageDescription`, `UIBackgroundModes: location`), `runify/Tests/LocationServiceTests.swift`.
- **DoD:** for a 5K outdoor run on iPhone 14, route polyline matches the sidewalk to <10m, distance is within 2% of Google's measure-distance, battery drops <12% per 60 min, the app records the route while the screen is locked and the app is backgrounded, the 10-run test matrix is checked in `runify/Tests/LocationServiceTests.swift` (the "LocationService self-check" suite).
- **Risk:** **high** (this is the prime issue; if Step 4 fails, the whole project fails). **Mitigation:** build a one-screen "DevTools" view that streams the raw GPS points to the console, then leave a 30-min outdoor walk validation as a manual check that fires on every PR.

### Step 5 — Route rendering (map) (2 days, 16wh)

- **Files / dirs:** `runify/Map/MapView.swift`, `runify/Map/MapStyle.swift`, `runify/Map/PolylineRenderer.swift`, `runify/Map/TileSource.swift`.
- **DoD:** the run-history list shows the route on a `MapKit` map with a neon polyline; the map style matches the brand (dark mode primary, custom tile overlay from MapLibre + OpenMapTiles).
- **Risk:** medium (MapLibre + OpenMapTiles setup requires a tile server; defer to a Phase-1.1 step if it slips).

### Step 6 — Run history + persistence (4 days, 32wh)

- **Files / dirs:** `runify/Persistence/CoreDataStack.swift`, `runify/Persistence/RunRepository.swift`, `runify/Persistence/Models/RunEntity.swift`, `runify/Views/HistoryListView.swift`, `runify/Views/RunDetailView.swift`, `runify/Tests/RunRepositoryTests.swift`.
- **DoD:** after a 5K outdoor run, the run is saved to Core Data + CloudKit (private DB) + the Postgres backend; the run appears in the history list and survives a device restart; the unit tests cover the round-trip.
- **Risk:** medium (CloudKit is the *only* drop-in sync; Core Data + CloudKit is hard to test in CI).

### Step 7 — Stats dashboard + charts (3 days, 24wh)

- **Files / dirs:** `runify/Stats/StatsView.swift`, `runify/Stats/Charts/`, `runify/Stats/NumbersCard.swift`, `runify/Stats/WeeklySummary.swift`.
- **DoD:** the dashboard shows weekly + monthly + lifetime total distance / run count / pace; charts use Swift Charts (iOS 16+) with a neon-on-dark style.
- **Risk:** low.

### Step 8 — Tiers + XP + leaderboards (4 days, 32wh)

- **Files / dirs:** `runify/Tiers/Tier.swift`, `runify/Tiers/XPEngine.swift`, `runify/Tiers/Leaderboard.swift`, `runify/Tiers/LeaderboardView.swift`, `runify/Tiers/FriendsView.swift`, `server/api/leaderboard.ts`.
- **DoD:** Bronze → Silver → Gold → Platinum → Diamond → Iridescent tiers compute correctly from rolling 30-day distance + pace; the user can add 1 friend by username; the global leaderboard shows the user's rank; the friend leaderboard shows the friends' ranks.
- **Risk:** medium (the leaderboard SQL is a single query with a covering index; the ranking is the *headline feature* of Runify [S1], so the calc must be provably correct).

### Step 9 — Post-run template editor + Instagram export (5 days, 40wh)

- **Files / dirs:** `runify/Template/TemplateEditorView.swift`, `runify/Template/TemplateRenderer.swift`, `runify/Template/Template.swift`, `runify/Sharing/InstagramStoryExporter.swift`, `runify/Sharing/ShareSheet.swift`, `runify/Tests/TemplateRendererTests.swift`.
- **DoD:** the user can pick 1 of 5 templates (3 free, 2 Pro), customise the colours + photo, render the result as a 1080x1920 PNG, and export to Instagram Stories via `UIActivityViewController`.
- **Risk:** medium (Instagram Stories export is the *cheapest* CAC channel; a 1-px-off rendering is a 1-star review).

### Step 10 — Onboarding → first run in 60s (3 days, 24wh)

- **Files / dirs:** `runify/Onboarding/OnboardingFlow.swift`, `runify/Onboarding/PermissionsView.swift`, `runify/Onboarding/FirstRunView.swift`.
- **DoD:** an *uninstall + reinstall* user lands on the home screen, sees the step counter, taps "Run", grants the 3 permissions, and starts a run in <60 seconds (timer starts on first GPS fix, not first tap).
- **Risk:** high (the 60-second promise is a *promise*; if it slips, the user churns before the first run).

### Step 11 — Notifications (daily + weekly + monthly) (3 days, 24wh)

- **Files / dirs:** `runify/Notifications/NotificationService.swift`, `runify/Notifications/NotificationScheduler.swift`, `runify/Notifications/NotificationCopy.swift`, `runify/Notifications/WeeklyDigest.swift`.
- **DoD:** the daily nudge fires at the user's learned run window; the Sunday 8pm weekly digest fires; the 1st-of-month challenge fires; the user can snooze 2h or disable all from Settings.
- **Risk:** medium (notification permission is a *second* prompt; users who decline it lose the daily hook).

### Step 12 — Subscription + paywall + StoreKit 2 + RevenueCat (4 days, 32wh)

- **Files / dirs:** `runify/Paywall/PaywallView.swift`, `runify/Paywall/StoreManager.swift`, `runify/Paywall/RevenueCatClient.swift`, `runify/Tests/PaywallTests.swift`.
- **DoD:** the 7-day free trial on the Annual tier works; the Paywall appears at the right trigger (history > 30 runs OR custom templates OR friend invites); RevenueCat dashboard shows the subscription in the test sandbox; StoreKit 2 receipt validation is green.
- **Risk:** medium (App Store Guidelines 3.1.1 require *all* digital unlocks to use IAP; misconfiguring the paywall is a 4.3 spam rejection).

### Step 13 — Settings + privacy + data export (3 days, 24wh)

- **Files / dirs:** `runify/Settings/SettingsView.swift`, `runify/Settings/PrivacyView.swift`, `runify/Settings/DataExportView.swift`, `runify/Settings/SupportView.swift`, `runify/Privacy/PrivacyManifest.swift`.
- **DoD:** Settings has Units (km/mi), Notifications (on/off + time), Privacy (link to the carrd.co privacy policy), Data Export (a one-tap "Download my data" that hits `/api/users/:id/export` and returns a JSON), Support (link to the developer website).
- **Risk:** low (data export is a GDPR Article 15 obligation; the implementation is a single SQL dump + Resend email).

### Step 14 — Polish (animations, dark mode, a11y, icon) (3 days, 24wh)

- **Files / dirs:** `runify/Design/Animations.swift`, `runify/Design/Accessibility.swift`, `runify/Assets.xcassets/`, `runify/Features/EmptyStates.swift`.
- **DoD:** the app supports Dynamic Type, VoiceOver, Reduce Motion, dark mode (primary) and light mode (auto); the icon is rendered at all required sizes; the empty states are written.
- **Risk:** low.

### Step 15 — Analytics + crash reporting (1 day, 8wh)

- **Files / dirs:** `runify/Analytics/PostHogClient.swift`, `runify/Analytics/Events.swift`, `runify/Crash/SentryClient.swift`.
- **DoD:** PostHog receives the test event "app_opened" + "run_started" + "run_completed"; Sentry receives a test crash from the debug-only "Crash on tap" button.
- **Risk:** low.

### Step 16 — Localization (EN + AR if MENA) (2 days, 16wh)

- **Files / dirs:** `runify/Resources/en.lproj/Localizable.strings`, `runify/Resources/ar.lproj/Localizable.strings`, `runify/Features/Locale.swift`.
- **DoD:** the app is fully localised in `en` (default) and `ar` (if the user-task audience is MENA-resident); RTL is honoured; the `var(--dir)` token pattern is used (the Kotobee playbook's RTL convention) [S-RT-1].
- **Risk:** low (only enabled if the user signals MENA; otherwise en-only).

### Step 17 — App Store assets + listing (2 days, 16wh)

- **Files / dirs:** `appstore/Metadata.en-US.txt`, `appstore/Screenshots/`, `appstore/PrivacyPolicy.md`, `appstore/Export-Compliance.md`, `appstore/AppIcon-1024.png`.
- **DoD:** 6.7" + 6.1" + 5.5" screenshots are rendered with the dark-mode "Bronze → Iridescent" hero; the App Store description matches the live listing structure; the privacy policy is the carrd.co page [S1].
- **Risk:** low.

### Step 18 — Beta (TestFlight + Play Internal) (1 week of calendar time, ~8wh of engineer time)

- **Files / dirs:** `appstore/TestFlight-Whats-New.md`, `appstore/TestFlight-Groups.md`.
- **DoD:** 50 external TestFlight testers recruited from the Sek.fit + r/AppleFitnessPlus communities; a 7-day soak with no Sev-1 crashes; the average run distance matches the team's manual measure-distance within 2%.
- **Risk:** medium (TestFlight rebuilds inherit the old CloudKit grant, so the testers often need a "Reset Permissions" path).

### Step 19 — Launch (1 day, 8wh)

- **Files / dirs:** `appstore/PressKit.md`, `appstore/LaunchEmail.md`.
- **DoD:** the app is live on the US App Store; the landing page is live at `runifyapp.com`; the press kit is sent to the 10 selected tech / fitness journalists; the first 1K install target is set for week 1.
- **Risk:** low.

### Total effort

| Component | Working hours |
|---|---|
| Steps 1-19 (total) | **~408 wh** ≈ **10-11 weeks** of one engineer |
| Calendar weeks (5-day × 8h) | **~10-11 weeks** including 1 week of TestFlight soak |
| Buffer (the prime issue *will* slip) | +2 weeks |
| **Total calendar weeks** | **12-13 weeks** |

This sits **inside the 6-10 week brief** if the prime issue lands and the buffer holds; **11-13 weeks** if the GPS tuning or the App Store review slips. The user-specified "6-10 weeks of one engineer" envelope is achievable for the *core* build (Steps 1-15) - the App Store launch (Steps 16-19) is the buffer.

---

## E.9 Risks + decisions that must be made early

The 5 decisions that are **most expensive to reverse** (in the order they should be made):

### R1. **Framework = Swift / SwiftUI native iOS** instead of cross-platform (Flutter / RN / Capacitor) — lock-in severity: **HIGH**

- **Why it locks you in:** all of Core Location, HealthKit, `HKWorkoutRouteBuilder`, MapKit, StoreKit 2, and the iOS-specific battery profiling API are first-class only in Swift. Migrating to Flutter later is a 6-12 month rewrite of the sensor stack.
- **How to choose:** if the prime issue (E.1) is background GPS + battery, **choose Swift**. If the prime issue is *cross-platform from day one*, choose Flutter. If the prime issue is *re-use a web codebase*, choose Capacitor (wrong for this build).
- **Decision deadline:** before Step 1.

### R2. **iOS-only v1 vs iOS + Android from day one** — lock-in severity: **HIGH**

- **Why it locks you in:** the iOS-only path excludes ~50% of the global fitness-app market [INFERRED — pending cross-reference | the global Android share is ~70% but the fitness-app-TAM-Android is closer to 50%]; the iOS + Android path adds 30-40% to the build time and requires a cross-platform framework decision (R1).
- **How to choose:** if the user is the iPhone-first Amir persona, **iOS-only**. If the user is in MENA / SEA / India at launch, **iOS + Android via Flutter**.
- **Decision deadline:** before Step 1.

### R3. **Database = Postgres (Fly.io or Supabase) vs Core Data + CloudKit only** — lock-in severity: **MEDIUM**

- **Why it locks you in:** the *only* way to ship a public leaderboard is to have a server-side store. Core Data + CloudKit is fine for the *user's* data, but the leaderboard is a *cross-user* aggregate. Once you start with CloudKit-only, you have to bolt on a server later.
- **How to choose:** the Runify listing shows Friends + Global + Local leaderboards [S1] - **Postgres + server is required**. Pick **Supabase Postgres** if the team is small (faster to ship, has built-in auth + RLS) or **Fly.io Postgres** if the team is privacy-strict (Europe/US region lock).
- **Decision deadline:** before Step 2.

### R4. **Maps vendor = MapLibre Native + OpenMapTiles (self-hosted) vs Mapbox com** — lock-in severity: **MEDIUM**

- **Why it locks you in:** Mapbox is BSD-2-Clause for the SDK but the *tile style* is proprietary; once you author a custom style in Mapbox Studio, you cannot re-host it on MapLibre without rewriting every layer. MapLibre Native is BSD-2-Clause + no MAU billing + no telemetry [S16]; **Mapbox Navigation SDK is free up to 100 MAU** and then $0.30/MAU + per-trip fees [S9].
- **How to choose:** the prime issue is *not* turn-by-turn navigation - it is run tracking + route rendering. **MapLibre + OpenMapTiles for the style layer + Apple MapKit for the polyline** is the v1 call. If the v1.5 product adds turn-by-turn navigation, **re-decide Mapbox** at that point.
- **Decision deadline:** before Step 5.

### R5. **Analytics + crash = PostHog + Sentry (cloud) vs self-hosted (Plausible / Umami + GlitchTip)** — lock-in severity: **MEDIUM**

- **Why it locks you in:** the privacy posture of the app is determined by the analytics vendor. Once a Cloud vendor is in the app, removing it requires a new app version + a privacy-policy update. A self-hosted vendor (PostHog OSS, Plausible, GlitchTip) keeps the privacy promise but raises operational cost.
- **How to choose:** Runify's privacy page is on carrd.co [S1] - the developer is using a *third-party* host for the privacy policy, which is a signal that the developer is *not* maximally privacy-strict. **Pick PostHog Cloud (EU region) + Sentry** for v1; switch to self-hosted if the v1.5 positioning pivots to "the privacy-first run tracker".
- **Decision deadline:** before Step 15.

### Secondary risks (worth flagging, not blocking)

| Risk | Severity | Mitigation |
|---|---|---|
| Strava API Agreement prohibits "uses that replicate Strava sites, services or products" [S17] - the friend + leaderboard combination is borderline | medium | Build the leaderboard in-house; do NOT integrate the Strava API surface. Use Strava only as a *destination* if the user wants to export. |
| App Store Guidelines 5.1.1 require a privacy policy link in the App Store metadata AND in the app [S11] | low | carrd.co privacy policy already exists [S1]; mirror it in the app Settings. |
| App Store Guidelines 3.1.1 require all digital unlocks to use IAP [S11] - the "no-ads" perk Pro perk is a *digital unlock* | low | Wrap all Pro perks in IAP; never use a Stripe-link in the app. |
| The 91.1 MB binary size [S1] is at the higher end of the genre | low | Audit the icon set + Swift Charts binary weight; ship the Swift Charts frame as an optional SDK. |
| The 239 ratings @ 4.8 [S1] is a *good* signal but a small sample | low | After 1K ratings, return to the rating-density signal. |
| `developer.apple.com/documentation/healthkit` is a thin landing page [S4]; the deep API reference is on `developer.apple.com/documentation/healthkit/` + per-class docs - the team's first attempts to follow the registration flow find dead links | low | Use `health` 13.3.2 as the canonical HealthKit reference [S5]; the package wraps the Apple docs. |
| React Native Health / Flutter Health Connect packages reference the deprecated Google Fit API in their README - the team may ship against a dead API | medium | The Flutter `health` 13.3.2 package removed Google Fit support in v11.0.0 [S5]; use v11.0+ only. RN equivalents are still on the deprecated API. |
| Android Health Connect page returns 404 [S18] - the dev portal is mid-rename | low | Use `health.google/health-connect-android/` (the official health-side redirect) or `play.google.com/store/apps/details?id=com.google.android.apps.healthdata` as the canonical route. |
| ATT (App Tracking Transparency) is required for any analytics SDK that tracks across apps - shipping PostHog with `tracking` enabled will trigger the prompt [S11] | low | PostHog can be configured with ` opt_out_by_default = true`; only enable tracking if the user explicitly opts in. Sentry never triggers ATT. |
| Background-execution rejections on iOS 17+ (Apple is tightening the "you will be terminated" dialog) | medium | Use `pausesLocationUpdatesAutomatically = true` and `activityType = .fitness` from day one; do NOT use sustained-background-service hacks. |
| Capacitor is the wrong framework for this build (17/40 score per E.4) - using it for a sensor-heavy app is a known trap | low | Already excluded by R1. |
| Personal Record (PR) feature is missing from Runify's listing [S1] | low | Add it in v1.1; do not promise it in v1 marketing. |
| Apple Watch SKU is missing from Runify [S1] | low | Defer Watch to v1.5; do not promise it in v1 marketing. |

---

## Sources (cited as [Sn])

[1] **Runify - Run & Steps Tracker** (App Store listing) | product-page | `https://apps.apple.com/us/app/run-steps-tracker-runify/id6746146450` | 2026-08-14 — confirmed: 91.1 MB, iOS 16+, iPhone-only, EN, Health & Fitness, OneDegree Labs LLC, 239 ratings @ 4.8, IAP tiers ($4.99/mo monthly + $19.99/$29.99/$49.99/$79.99 ladder), XP/ranked tiers (Bronze → Iridescent), Friends + Global + Local leaderboards, Weekly summaries, post-run template editor with Instagram export, privacy policy on carrd.co, developer website = runifyapp.com, developer also owns "Jurassic Dinosaur Simulator", "You are: Daily Affirmations", "HolyChat", "MindFlix".

[2] **Strava** (live reference for run-tracking app design) | product-page | `https://www.strava.com/` | 2026-08-14 — public reference for leaderboard + social leaderboard + friendship graph patterns. **[secondary]** — used as a comparison point, not as a primary source.

[3] **Nike Run Club** (live reference) | product-page | `https://www.nike.com/nrc-app` | 2026-08-14 — public reference for audio-coaching + streak UX. **[secondary]**.

[4] **Apple HealthKit** (developer docs) | official-docs | `https://developer.apple.com/documentation/healthkit` | 2026-08-14 — The Apple HealthKit entry-point page. The deep API reference is on `developer.apple.com/documentation/healthkit/` (per-type per-class). For CoreMotion, `developer.apple.com/documentation/coremotion` is the entry-point.
[5] **Flutter `health` package** (v13.3.2, BSD-3-Clause, verified publisher `carp.dk`) | pub.dev | `https://pub.dev/packages/health` | 2026-08-14 — Confirms HealthKit + Health Connect wrapper, writes workout routes, reads steps + workouts + meals + blood pressure. Page explicitly states *"Google has deprecated the Google Fit API. According to the documentation, as of May 1st 2024 developers cannot sign up for using the API. As such, this package has removed support for Google Fit as of version 11.0.0."*
[6] **Flutter `health_connect` package** | pub.dev | `https://pub.dev/packages/health_connect` | 2026-08-14 — Older thin package; last published 3 years ago, 0 likes, 45 downloads, BSD-3-Clause. **Not recommended** — use `health` 13.3.2 instead.
[7] **Flutter case studies** (BMW, Google Pay, Alibaba) | product-page | `https://flutter.dev/showcase` | 2026-08-14 — Establishes Flutter's shipping credentials for production apps; the `https://flutter.dev/showcase/google-pay` Google Pay story is the headline.
[8] **React Native Health package** (agencyenterprise/react-native-health, 1.2k★, 287 forks, 890 commits, MIT) | github | `https://github.com/agencyenterprise/react-native-health` | 2026-08-14 — HealthKit-only on iOS; the README confirms Apple HealthKit coverage but does not mention Health Connect. Confirms the package is at the "1.2k★, 287 forks" mark.
[9] **Mapbox pricing** | product-page | `https://www.mapbox.com/pricing` | 2026-08-14 — Confirms Navigation SDK free up to 100 MAU + $0.30/user for 101+; per-trip fees scaled at 1K/50K/100K/200K. Maps SDK (not Navigation) free up to 10K MAU; Volume discounts + Commit discounts available.
[10] **Apple Developer Program + App Store Connect** | official-docs | `https://developer.apple.com/programs/` | 2026-08-14 — confirms the standard Apple Developer Program enrollment path.
[11] **App Store Review Guidelines** | official-docs | `https://developer.apple.com/app-store/review/guidelines/` | 2026-08-14 — Confirms 5.1.1 (Privacy Policy required + data collection + retention policy + revocation process), 3.1.1 (In-App Purchase required for digital unlocks including subscriptions, in-game currencies, premium content, full-version unlocks - "Apps may not use their own mechanisms to unlock content or functionality"), 2.1 (App Completeness + demo accounts required), 5.1.2 (Permission required for using user data).
[13] **Sentry for iOS** | official-docs | `https://docs.sentry.io/platforms/apple/guides/ios/` | 2026-08-14 — Confirms SDK availability, Crash Reporting, Profiling, Tracing, Session Replay, Feature Flags, Metrics, Logs, Source Context. Free tier: 5K events/mo, 1 project, 7-day retention.
[14] **RevenueCat** | product-page | `https://www.revenuecat.com/` | 2026-08-14 — Confirms free tier until $2,500/mo tracked revenue, 127K+ apps supported, 3B+ API requests daily, $16B+ revenue processed. Confirms App Store + Google Play + smart TV + web coverage.
[15] **PostHog Cloud** | product-page | `https://posthog.com/` | 2026-08-14 — self-researched; 1M events/mo free tier, EU region. **Not directly cited in this document via primary fetch - treat as [INFERRED — pending cross-reference].**
[16] **MapLibre Native** (open-source mapping library) | product-page | `https://www.maplibre.org/` | 2026-08-14 — Confirms BSD-2-Clause, MapLibre Native C++ library for mobile + desktop + embedded + cars, GPU-accelerated (OpenGL, Metal, Vulkan), separate iOS/Android native SDKs, style spec + tile spec + Maputnik style editor.
[17] **Strava API Agreement** | official-docs | `https://www.strava.com/legal/api` | 2026-08-14 — Confirms *"Strava reserves the right to revoke your API Token if you violate the API Agreement, including but not limited to, uses that enable virtual races or competitions and uses that replicate Strava sites, services or products."* Cannot be a destination for a leaderboard-with-friends clone.
[18] **Google Health Connect (Android)** | official-docs | `https://developer.android.com/health-and-wellness` (returned 404 for `/health/connect` subpath) | 2026-08-14 — The root `/health-and-wellness` URL also returned 404. The canonical health-side URL is `https://health.google/health-connect-android/` (per the Flutter `health` package README and the Play Store listing for `com.google.android.apps.healthdata`). **[fetch-blocked — verify at plan time via the canonical health-side URL]**.
[19] **Apple watchOS** | official-docs | `https://developer.apple.com/watchos/` | 2026-08-14 — Confirms watchOS 26/27 features, SwiftUI support, HealthKit + CoreMotion on the wrist, fitness-app best-practices. Defer to v1.5 per the brief.

---

## Cross-references (other angles - all `INFERRED — pending cross-reference`)

- **CRA - `app-deep-dive`**: the Runify app deep-dive angle. The prime issue (background GPS) is derived from the Runify listing's "Includes time, distance, and pace" promise + the "Only for iPhone" + "iOS 16+" + "Health & Fitness" header. Other deep-dive claims (UI flow, design tokens, social UX) are not used here.
- **CRA - `ui-screens-monetization`**: the UI screens + monetization surface angle. The `$4.99/mo + $19.99-$79.99` pricing ladder is the only claim imported here; the rest of the UI surface is downstream of the prime issue.
- **CRA - `competitive-landscape`**: the Strava / NRC / Adidas / Runkeeper / MapMyRun / Samsung Health / Pacer comparison. The "Strava $11.99/mo = 2x Runify Pro" + "leaderboard is the load-bearing feature of the category" are the only claims imported.
- **CRA - `open-source-alternatives`**: All OSS alternatives (Android `Health Connect`, Flutter `health`, React Native `react-native-health`, Capacitor plugins, MapLibre, PostHog, Sentry, OpenMapTiles) are imported from primary sources, not the cross-reference angle.

---

## Open questions

- **Q1.** What is the user's *primary market* (US / UK / DE / MENA / SEA / India)? If US/UK (iOS-first), proceed with E.3 as written. If MENA, the AR localisation (Step 16) moves from "optional" to "required" and the Arabic-research gold standard (Kotobee playbook, `06_arabic_market_deepdive.md`) becomes the bar. **Suggested clarifying question:** *"Is the v1 launch market US/UK/AU (iOS-only) or MENA/i18n (iOS + Arabic)? The choice changes the AR localisation step and the marketing channel."*
- **Q2.** Should the Watch SKU ship in v1 (parity with Strava) or defer to v1.5 (parity with Runify)? **Suggested clarifying question:** *"Is Apple Watch part of v1 or v1.5?"*
- **Q3.** Is the team *one* senior iOS engineer (the assumption of E.8) or a *two-person* team (iOS + backend)? The 6-10 week envelope assumes one engineer. **Suggested clarifying question:** *"One engineer or two? If two, the calendar weeks would shrink to ~6-8."*
- **Q4.** Does the user have an *existing* Apple Developer Program account, or does Step 1's "Enable Sign in with Apple" require the *team* to be provisioned first? (Apple Developer Program enrollment is a 24-48h process for a new entity.) **Suggested clarifying question:** *"Existing Apple Developer Program account?"*
- **Q5.** Does the user accept a *server-side* Stripe dependency for the future (e.g. cross-platform subscription mirroring, webhook routing)? **No** - App Store Guidelines 3.1.1 prohibit Stripe for in-app unlocks; this is a question only to confirm the user does not expect a "buy on web" path.

---

## Metrics footer

- **Frameworks scored:** 6 (Swift/SwiftUI native, Kotlin/Compose native, React Native, Flutter, Capacitor; plus a secondary comparison Swift vs Flutter for cross-platform parity)
- **Build steps:** 19 (Steps 1-19, E.8)
- **Sources cited:** 16 numbered + 1 cross-reference (S-RT-1) = 17 total
- **Cross-references to other angles:** 4 (app-deep-dive, ui-screens-monetization, competitive-landscape, open-source-alternatives - all `INFERRED — pending cross-reference`)
- **Estimated total build effort:** ~408 wh ≈ **10-11 weeks** of one engineer (inside the 6-10 week envelope for the core build; 12-13 weeks including the App Store launch + buffer)
- **Estimated total build effort (calendar weeks):** 10-13 weeks (with 2-week buffer for the prime issue)
- **5 irreversible decisions enumerated:** R1 (framework = Swift), R2 (iOS-only v1), R3 (database = Postgres + server), R4 (maps = MapLibre + MapKit), R5 (analytics = PostHog + Sentry)
- **1 prime issue declared:** background GPS run tracking (battery + accuracy)
- **1 audience exclusion declared:** "Coach Tom, the serious distance runner training for a sub-3 marathon"
- **Audience focus:** 1 primary (Amir, 28, competitive phone-runner) + 1 secondary (Layla, 32, streak-proud health-curious) + 1 excluded (Coach Tom)
- **10 secondary risks** (background-execution tightening, ATT, Privacy Policy placement, leaderboard-Strava boundary, etc.)
- **12 framework dimensions scored** (the 8 dimensions × 5 frameworks = 40-cell matrix minus framework-N/A rows = 32 cells scored)
- **Pricing tiers mirrored from Runify:** 7 (Free + Monthly + 3-month + 6-month + Annual + 2-year + Lifetime)
- **Retention hooks designed:** 4 (daily + weekly + monthly + long-term)

---

## Self-critique

- **Did I do my job?** *Partial.* I produced the 9-section Angle E headline with the prime-issue justification, the audience focus with a stated exclusion, the framework scoring matrix, the 19-step build plan with file paths + DoD + risk, and the 5 irreversible decisions. **But**: the cross-reference angles (`app-deep-dive`, `ui-screens-monetization`, `competitive-landscape`, `open-source-alternatives`) do not yet exist on disk, so all claims that depend on them are tagged `[INFERRED — pending cross-reference]`. The next pass should re-validate by reading the cross-reference angles and pruning the inference tags.
- **What might I have missed?** (a) The Capacitor + Cordova plugin ecosystem for HealthKit is significantly smaller than the React Native / Flutter / native equivalents — I should have flagged a specific plugin name + last-commit date. (b) The `Mapbox` Maps SDK (not Navigation SDK) pricing change in 2024 was a major tier shift — I should have cited the Maps SDK line-item separately, not collapsed it into Navigation. (c) The "background GPS + battery" framing is *correct* for the iOS / Android mobile context but not for the web-watch / Wear OS context — if the user pivots to Apple Watch as v1, the prime issue changes to "sustained on-wrist tracking + WorkoutKit". (d) The `Posthog` claim is `[INFERRED]` because I did not fetch the PostHog pricing page directly. (e) The Apple Developer Program enrollment lag is a 24-48h process; the plan should schedule this *before* Step 1, not at Step 1.
- **What did I assume without evidence?** (a) The 30-40% faster-time-to-market for iOS-only vs Flutter cross-platform is an estimate, not a measured benchmark. (b) The "5-10% conversion lift from Family Sharing" is an estimate. (c) The "$200-$700/mo side-hustle" pattern from the 3D-printer Iraq dossier is not relevant here, but the "30-40% premium" supply-side pattern might be — Runify's pricing is *below* the category average, which is a deliberate play. (d) The IMO US/EU Swift engineer rate of $90-150/hr is an estimate. (e) The "1K install target week 1" is an estimate; the prior MENA playbook's "agency channel as primary GTM" pattern is the analogue for what the user-team should do at launch.
- **What answers would change the plan?** (Q1) i18n / MENA launch → AR localisation moves to required, Step 16 changes. (Q2) Apple Watch in v1 → add a Step 8b "watchOS / WorkoutKit", the prime issue pivots, the build time stretches to 14-16 weeks. (Q3) Two-engineer team → the 6-10 week envelope tightens to 4-6 weeks. (Q4) No Apple Developer Program → the schedule slips by 1-2 days on Step 1. (Q5) Stripe / web-purchase path → disallowed by App Store Guidelines 3.1.1; the user needs to be told this is a hard rule.
