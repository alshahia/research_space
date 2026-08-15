# 02 — Runify UI, Screens, and Monetization (Angle B)

> Source angle: B. Source file: `share/notes/01_research_T-2026-08-14-004_angle-ui-screens-monetization.md`. Access date: 2026-08-14.
>
> **Method note**: All claims derived from public App Store listing, iTunes Lookup API, runifyapp.com marketing site, runifyprivacy.carrd.co / runifytermsandconditions.carrd.co legal pages, plus Jina Reader vision captions of the 5 iPhone screenshots + app icon. **No access to the running app.** Pixel-level UI detail is `[OPAQUE]` where noted.

---

## B.1 Screenshot inventory

The iTunes Lookup API returns exactly 5 iPhone screenshots and zero iPad screenshots [S1]. The visible file-name sequence is not the carousel order — Apple's CDN order is shown below. All five are portrait iPhone screens (the developer page is tagged "Only for iPhone" [S2][S3]).

| # | Jina caption | Tag | What it shows |
|---|---|---|---|
| 1 | "snapchat champion ii with xp" [S7] | `ACHIEVEMENTS` | Tier II ("Champion II") rank reveal with visible XP counter |
| 2 | "The interface shows users to compete with friends on the application" [S8] | `LEADERBOARD` | Friends or global leaderboard surface |
| 3 | "Page of a fitness app showing the profile of a runner" [S9] | `PROFILE` | Runner profile view — per-user lifetime/weekly stats |
| 4 | "Page showing achievement details and Running application" [S10] | `ACHIEVEMENTS` / `STATS_HISTORY` | Achievements roster or run-breakdown card |
| 5 | "a user page of instagram with a wallpaper app" [S11] | `OTHER` (shareable recap / Instagram Story template) | Post-run recap generator output |

### Inventory gaps
- **Device-class / exact pixel dimensions**: `[OPAQUE]`. Reasonable assumption: 1242×2688 iPhone 6.5" template.
- **Tab bar / nav bar**: `[OPAQUE]`. No screenshot crops the bottom 80-100px.
- **Onboarding screenshot**: **None**. Carousel is all in-app feature screens.
- **Paywall screenshot**: **None** (see B.7).
- **iPad screenshots**: **0** returned. App is "iPhone Only" per the App Store badge [S2][S3].

---

## B.2 Navigation pattern (inferred)

**Inferred from the 5 screenshots + the App Store description:**
- **No explicit "home" screenshot.** Carousel loaded with feature surfaces (achievements, leaderboard, profile, recap).
- **No bottom-tab screenshot.** Classic iOS running-app pattern (Home / Activities / Stats / Profile) is *not* evidenced. `[OPAQUE — not visible]`. Plausible 4–5 tab navigation (Home · Ranks/Leaderboards · Stats · Profile) but **not confirmed**.
- **Persistent "Start run" CTA**: most likely prominent center-button on the Home tab; `[OPAQUE]`.
- **Onboarding**: no permission prompts or wizard steps. Plausibly Strava/HealthKit-permission ask + handle/avatar setup.
- **No card-stack, hamburger, or wizard patterns mentioned.**

**Bottom line**: Navigation pattern cannot be determined from screenshots alone. `[OPAQUE]`.

---

## B.3 Color system

Inferred from the App Store description, privacy/terms URLs, and Jina's icon caption ("black background with bright blue eyes" [S14]):

- **Dominant hue: black + electric/rank-blue accent**. Working hex estimate: background `#000000`–`#0A0A0A`, accent near `#1E6CFF` / `#2D7BFF`.
- **Supporting palette: tier-coded colors.** Description names tiers "Bronze, Diamond, and Iridescent" [S1]. The rank-reveal screen (Screenshot 1) almost certainly uses metallic gradients — bronze → silver → gold → platinum → diamond → iridescent/holo. **The "iridescent" tier signals a holographic/rainbow gradient at the top of the ladder**.
- **Light vs dark**: dark-mode-first or dark-mode-only.
- **CTA accent**: same electric blue as the icon. `[OPAQUE — button shape not confirmed]`.
- **Gradient or flat**: iridescent tier implies at least one gradient.

**Color palette size**: 2 confirmed (black + electric blue), 6 inferred (tier metals).

---

## B.4 Typography & iconography

### App icon
- **Style**: stylized character mascot (runner avatar with bright blue eyes against black) [S14]. "Batman, anime picture" caption.
- **Composition**: character-centric, not logo-type.
- **Evolution**: "Unlock a visual identity that evolves with you" [S1] — character changes skins/borders as user climbs tiers.

### In-app UI style
- **Rounded vs sharp**: `[OPAQUE — no direct evidence]`.
- **Glassmorphism / skeuomorphism / minimal**: `[OPAQUE]`. "Iridescent" tier name + high XP-bar emphasis suggest *minimal + glossy accent*.
- **Icon style**: likely outline (nav) + filled (selected) mix.

### Typography
- **No pixel-level access.** `[OPAQUE]`. "BIG NUMBER" style stat typography common in running apps (large km/mi, smaller unit below) is most likely but **not confirmed**.

---

## B.5 Stat blocks & data viz

### Metrics advertised
From App Store description [S1] and marketing site [S3][S12]:
- **Distance** (km or mi — locale dependent)
- **Pace** (per km / per mi)
- **Time**
- **XP** (proprietary metric — based on distance + pace per FAQ [S12])
- **Rank** (overall + distance-specific: 800m, 1K, 5K, 10K, half, marathon)
- **Streak / streak history** ("streak protection" is Pro tier per ToS [S13])
- **Weekly / monthly / yearly / all-time stats** (Pro per FAQ [S12] — gated)
- **Lifetime stats** ("Weekly summaries and lifetime stats" — description [S1])

### Metrics NOT advertised
- Heart rate — not mentioned
- VO₂max — not mentioned
- Cadence — not mentioned
- Elevation / gain — not mentioned
- Calories — not mentioned in description (ToS mentions obliquely)
- Sleep — not mentioned

### Chart types (from screenshots + descriptions)
- **Stat blocks**: profile screen (Screenshot 3) — "BIG NUMBER" stat panel.
- **XP graph / "XP over time"**: description claims "XP graphs, streak history, run breakdowns" → **line chart** most likely. `[INFERENCE]`.
- **Achievements grid**: bronze/silver/gold/platinum/diamond/iridescent ranks + per-distance achievements. `[INFERENCE]`.
- **Leaderboard**: vertical list with rank numbers, avatars, pace/distance.
- **No map polyline visible** in screenshots per Jina's captions. FAQ says "Record inside Runify with live GPS" [S3] — a map exists in the run-recording screen but it's not in the carousel.
- **No heatmap** mentioned.

### Comparisons shown
- **Yesterday vs today**: not explicitly mentioned.
- **Last week vs this week**: "Weekly summaries" implies W-over-W surface exists.
- **Vs goal**: Goal is NOT a top-level concept — Runify is *rank-driven*, not goal-driven.
- **Vs friends**: "Watch your rivals rise or fall in real time" — yes, core comparison.

### Net observation
Runify uses **rank + XP** visualization instead of the more common "goal rings" (Apple Fitness / Fitbit) or "weekly totals bar chart" (Strava / NRC). The data-viz is *thinner* than Strava or NRC because the product is selling **status, not data**.

---

## B.6 Social loop

**Strongly present in the listing.** Runify is **NOT a Strava-style social-feed app** (no activity feed in screenshots), but it has a *competitive* social loop:

- **Friends leaderboard** (Screenshot 2) [S8]
- **Global leaderboard** (per FAQ [S12])
- **Real-time rival position tracking** ("Watch your rivals rise or fall in real time" [S1])
- **Race across 1K, 5K, 10K, and more** [S1] — head-to-head distance challenges
- **Per-distance ladders** (800m, 1K, 5K, 10K, half, marathon) [S12]
- **Shareable run recaps to Instagram Stories** [S1][S3] — Instagram is the outward social surface
- **Likely follow / friends-only toggle** [S12]

**No mention of**: clubs, teams, group challenges, comments, activity-comments.

This is a deliberate **"competition surface, not community surface"** bet. Strava is a feed-of-effort social network; Runify is a ladder/climb social loop. Tag: `COMPETITIVE_SOCIAL`.

---

## B.7 Monetization surface

### Pricing (canonical, from official FAQ JSON-LD on runifyapp.com [S12])

| Plan | Price | Reveal in FAQ |
|---|---|---|
| Monthly | $4.99 USD | "The monthly plan is $4.99." |
| Annual | $39.99 USD | "The annual plan is $39.99 and includes a 7-day free trial." |

**Pro unlocks (the only Pro differentiation stated public):**
- Distance-specific leaderboards (800m, 1K, 5K, 10K, half, marathon ladders)
- Expanded profile and history views (weekly, monthly, yearly, all-time stats)

### IAP tier table (App Store [S2])
The App Store "In-App Purchases" list contains **10 tiers**, all labeled "Runify Pro":

| # | Tier label | Price (USD) | Likely interpretation |
|---|---|---|---|
| 1 | Runify Pro | $79.99 | Lifetime purchase |
| 2 | Runify Pro | $49.99 | Likely annual (legacy price test) |
| 3 | Runify Pro | $19.99 | Likely 3-month or short promo |
| 4 | Runify Pro | $49.99 | (duplicate of #2) |
| 5 | Runify Pro | $29.99 | Likely 6-month |
| 6 | Runify Pro | $49.99 | (duplicate of #2) |
| 7 | Runify Pro Monthly | $4.99 | Monthly subscription (matches FAQ) |
| 8 | Runify Pro | $79.99 | (duplicate of #1) |
| 9 | Runify Pro | $4.99 | Likely 1-month intro |
| 10 | Runify Pro | $29.99 | (duplicate of #5) |

**Source caveat**: App Store IAP list is flat with no duration metadata [S2]. Mapping above is **inferred** from typical iOS subscription patterns + canonical FAQ.

### Paywall screenshots
**None of the 5 carousel screenshots is a paywall screen.** The carousel is feature-reveal screens. The paywall is therefore NOT in the marketing creative — **soft paywall** (free user reaches the feature, sees "Pro required" gating).

### Free vs Pro split (per ToS + FAQ)
- **Free**: "Access core running and ranking functionality with usage limits" [S13]. FAQ clarifies: "Pro unlocks distance-specific leaderboards and expanded profile and history views" [S12]. Free users likely get core weekly stats only, not the full multi-window history.
- **Pro**: "exclusive ranks, analytics, streak protection, and customization options" [S13]. Specifically:
  - All distance-specific leaderboards
  - Expanded profile + history views (weekly, monthly, yearly, all-time)
  - **Streak protection** (Pro feature — streak breaks if you miss a day, Pro preserves it)
  - Higher tiers (probably "Iridescent" + above)
  - Custom run-recap templates

### Hard vs soft paywall
**Soft paywall.** Product fully usable for free. Gated features (deep leaderboards, full history, streak protection) are premium-only.

### Renewals
- Auto-renew [S13]
- Cancel at least 24 hours before renewal [S13]
- No partial refunds [S13]
- 7-day free trial on annual plan [S12]

### Dark-pattern audit
1. **Trial length** — 7 days is on shorter end of fair. **Not a dark pattern.** **[NO FLAG]**
2. **Pre-selected higher tier** — `[OPAQUE]`. The 10-tier IAP list (3 lifetime/short + 6 multi-month + 1 monthly) is **highly unusual**. **[GREY FLAG, not clear dark pattern]**
3. **Hidden "no thanks" / "X" / "restore" button** — `[OPAQUE — cannot verify]`
4. **Countdown timer / fake scarcity** — none visible. **[NO FLAG]**
5. **Streak-decay as retention hook** — "I ran through rain for the first time in my life because I didn't want to lose my tier" testimonial **brags about compulsive behavior**. **[GREY FLAG — "dark pattern-adjacent" gamification]**
6. **"Streak Protection" requires Pro** — free users feel rank decay; Pro is sold as the only way to avoid it. **Textbook "punish the free user, sell the rescue"**. **[FLAG — borderline dark pattern]** (Counter: Duolingo's "Streak Repair" is the same pattern and is generally accepted.)
7. **No high-pressure language in copy.** **[NO FLAG]**
8. **Refund policy** — no partial refunds. **[NO FLAG]**

**Net dark-pattern verdict**: No clear-cut dark patterns. Two grey flags: (a) 10-tier IAP funnel is unusual and likely A/B-tested, (b) streak-decay + streak-protection-Pro dynamic is gamification that preys on loss-aversion. None reach "Apple App Review rejection" level.

---

## B.8 Onboarding flow (inferred)

**No onboarding screenshots in the carousel.** Inferred from runifyapp.com FAQ + ToS + privacy policy:

- **Step 1**: Sign-in / Handle. FAQ: "When you register for an account..." [S4] — account creation step.
- **Step 2**: Permissions. ToS [S13] + privacy policy [S4]:
  - Location (Precise + Coarse) — for GPS run tracking
  - Motion & Fitness — for activity tracking
  - Notifications — for "updates, XP milestones, run reminders"
  - Camera (optional) — for custom run templates
- **Step 3**: Strava / HealthKit / Garmin connect. FAQ: "Past runs bulk-import so your rank reflects real history" [S3]. **The onboarding wedge** — connect an existing tracker to bulk-import XP and immediately land on a non-Bronze tier.
- **Step 4**: Tier reveal. "Live post-run rank-up reveal whenever a run bumps you into the next tier" [S12].
- **Age gate**: 16+ per ToS [S13] — date-of-birth prompt likely.

**No demographic prompts** (age, weight, height, gender, goal-setting). Distance and pace are the only inputs.

**Total onboarding steps**: 3–5. `[INFERENCE]`.

---

## B.9 Retention hooks (visible)

| Hook | Visible? | Source |
|---|---|---|
| Daily streak | Yes — implied by "streak protection" | [S1][S13] |
| Streak counter | Yes — "streak history" | [S1] |
| Goal rings | **No** — Runify is rank-driven, not goal-driven | [S1] (silence) |
| XP counter | Yes — central mechanic | [S1][S3] |
| Rank tier reveal | Yes — "post-run rank-up reveals" | [S12] |
| Rank decay | Yes — "Lose rank if you go inactive" | [S1][S3] |
| Achievements | Yes — distance-specific achievements | [S12] |
| Leaderboard (friends) | Yes | [S12] |
| Push notifications | Yes — "updates, XP milestones, run reminders" | [S13] |
| Email digest | Yes — "Weekly summaries" | [S1] |
| Promotional email opt-out | Yes | [S4] |
| Streak protection (Pro) | Yes — Pro feature | [S13] |
| Iridescent tier (top) | Yes — "Unlock a visual identity that evolves with you" | [S1] |
| Weekly summary screen | Yes — "Weekly summaries" | [S1] |

**Retention verdict**: **Exceptionally strong** on the listing. **4 distinct hooks** (streak, XP, rank, leaderboard) layered. The "rank decay" mechanic is the most aggressive — it punishes inactivity in a way Strava (nudges with weekly emails) and NRC (sends coach audio) do not. The **"Streak Protection as a Pro feature"** is the monetization hook that converts the retention loop into revenue.

---

## B.10 Visual DNA — Runify is a hybrid of:

- **Strava** — distance ladders (800m → marathon), friends/global leaderboards, Apple Watch / Garmin / Strava sync, weekly summaries. "Race across 1K, 5K, 10K, and more" is almost a direct Strava segment competitor.
- **Nike Run Club** — visual share-to-Instagram Stories recap template, quick-start session feel, single-screen run-tracking emphasis. Run-recap generator is **almost identical to Nike's "shareable run" cards**.
- **Apple Fitness** — iridescent tier name, dark-mode-first visual style, "evolution" arc of visual identity. The "Iridescent" tier is **a literal Apple Fitness ring aesthetic**.
- **Duolingo** — XP mechanic, tier ladder, streak system, "consistency is the whole point" framing, loss-aversion rank decay. **This is the most distinctive visual-product DNA** — Runify is fundamentally a running app with Duolingo's gamification kernel bolted on.
- **Where it does NOT look like anything**: the "rank card you post to Instagram" (Screenshot 5) — a stylized tier reveal meant to be shared externally. Runify is the first running app to make *visible rank identity* a shareable artifact.

**One-line visual DNA**: *"Strava tracking mechanics, Duolingo XP/tier/decay loop, and an Apple Fitness iridescent tier visual — all wrapped around a status-as-content play you can post to Instagram Stories."*

---

## B.11 Metrics

- **Screenshots analyzed**: 5 (iPhone only; 0 iPad returned by iTunes API)
- **Sources cited**: 15 ([S1]–[S15])
- **Paywall screenshots**: 0
- **Canonical pricing**: $4.99/month, $39.99/year with 7-day free trial [S12]; 10 IAP SKUs ($4.99–$79.99) on App Store page
- **Color palette size**: 2 confirmed (black + electric blue from Jina icon caption); 6 inferred (tier metals)

---

*Last updated: 2026-08-14 — Author: am-research merge pass for T-2026-08-14-004 — Source angles: A, B, C, D, E*