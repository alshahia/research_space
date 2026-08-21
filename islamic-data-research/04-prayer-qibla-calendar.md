# 04 — Prayer Times / Qibla / Hijri Calendar

## Calculation libraries (offline, no API key)

### 1. batoulapps/adhan-js (GitHub) ⭐ top calc lib
- **Contains:** High-precision Islamic prayer time library (JS/TS, Node + browser, ESM+CJS, typed). Prayer times, current/next prayer, Sunnah (Qiyam) times. Implements rigorous astronomical algorithms.
- **License:** MIT.
- **Get it:** `npm install adhan` → `new PrayerTimes(coordinates, date, params)`.

### 2. islamic-network/api.aladhan.com (GitHub) — powers aladhan.com
- **Contains:** Source of the AlAdhan.com Prayer Times + Hijri Calendar REST API (compute by coords/city/address; Ramadan calendar).
- **License:** Open source (check repo).
- **Get it:** `git clone https://github.com/islamic-network/api.aladhan.com`.

### 3. arabeyes-org/ITL (GitHub) — Islamic Tools & Libraries
- **Contains:** C library: `prayertime` (geo-aware prayer + Qibla) and `hijri` (Hijri generation/conversion). Basis for many ports.
- **License:** LGPL (derived works must stay open).
- **Get it:** `git clone https://github.com/arabeyes-org/ITL`.

### 4. fikr4n/iclib (Python / Java) — ICLib
- **Contains:** Prayer times, Qibla direction, Hijri (incl. Umm al-Qura) conversion. Apache-licensed (more permissive than ITL/LGPL).
- **License:** Apache-2.0.
- **Get it:** `git clone https://github.com/fikr4n/iclib-python` (or `-java`).

### 5. abougouffa/pyIslam (Python, 114★)
- **Contains:** Prayer times, Hijri/Gregorian conversion, Qibla, **Zakat** and **Mirath** (inheritance) calculation.
- **License:** LGPL-3.0.
- **Get it:** `pip install pyislam` (or clone `abougouffa/pyIslam`).

### 6. dev-asadali/islamic-utils (JS, 2025)
- **Contains:** Zero-dep JS: prayer times, Hijri calendar, Qibla, moon sighting, events (EN/AR). Multiple madhabs, regions, high-latitude tuning.
- **License:** Check repo.
- **Get it:** `npm install islamic-utils`.

### 7. azkal182/islamic-utils (TS)
- **Contains:** Prayer times (13+ methods), Qibla bearing+distance, **Inheritance (Faraidh)**, Hijri calendar with adjustments.
- **License:** Check repo.
- **Get it:** `npm install @azkal182/islamic-utils`.

### 8. AthanLib (C++, GPL-3.0) — earthtojad/AthanLib
- **Contains:** Dependency-free C++ prayer times (Fajr/Dhuhr/Asr/Maghrib/Isha) by astronomical formula, multiple conventions.
- **License:** GPL-3.0.
- **Get it:** `git clone https://github.com/earthtojad/AthanLib`.

## Geo / REST APIs (no key for most)

### aladhan.com Prayer Times API ⭐
- **Contains:** Prayer times & calendars by coordinates/city/address; Hijri calendar conversion; Ramadan calendar. Free, no key. Also open-source web app.
- **License:** Free API; content open.
- **Get it:** `curl "https://api.aladhan.com/v1/timings?latitude=..&longitude=..&method=2"`. Python: `pip install aladhan-api`. TS wrapper: `Boda335/Muwaqqit`.

### i-muslim Developer API
- **Contains:** Prayer times (coords+method+madhab via adhan), Qibla bearing, Gregorian↔Hijri (Umm al-Qura), mosque directory query. Bulk translation downloads, CORS-open, no key.
- **Get it:** `GET /api/v1/prayer-times` — see https://i-muslim.com/en/developers.

## Qibla-only
- `getQiblaDirection(lat,lon)` in `dev-asadali/islamic-utils`; `iclib.qibla` (Python/Java); `itl-java` `getNorthQibla()`.

## Agent notes
- Compute locally with `adhan-js` (MIT, precise) to avoid network + rate limits.
- Use `aladhan.com` only when you need geocoding (city→coords) or Ramadan calendars.
- For **Zakat / Inheritance** agents: `pyIslam` (LGPL) or `azkal182/islamic-utils` (Faraidh).
