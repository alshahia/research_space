# 06 — Names of Allah (Asma ul Husna)

## 1. adiman-dev/islamic-json → asma.json ⭐ simplest
- **Contains:** 99 Names of Allah JSON (part of a multi-content repo: also angels, prophets, adhan, remembrance, istigfar).
- **License:** No license (free to use).
- **Get it:** `git clone https://github.com/adiman-dev/islamic-json` → `asma.json`.

## 2. uthumany/asma-al-husna-api (GitHub)
- **Contains:** Static JSON API: 99 names with Arabic, transliteration, meaning, descriptions, audio. Served via GitHub Pages.
- **License:** Check repo.
- **Get it:** `curl https://uthumany.github.io/asma-al-husna-api/api/names.json` (or clone).

## 3. haikelz/asmaul-husna-api (GitHub)
- **Contains:** API: `/api/all`, `/api/:urutan`, `/api/latin/:latin`. Returns `{urutan, latin, arab, arti}` (Indonesian meaning).
- **License:** Check repo.
- **Get it:** `git clone https://github.com/haikelz/asmaul-husna-api`.

## 4. KabDeveloper/99-Names-Of-Allah (GitHub)
- **Contains:** JSON of 99 names with translations (meaning + description), verses where found. FR/EN (+ WIP others).
- **License:** Check repo.
- **Get it:** `git clone https://github.com/KabDeveloper/99-Names-Of-Allah`.

## 5. zuckdorsey/MuslimApi (FastAPI, MIT)
- **Contains:** REST API for Asmaul Husna + Quran Surahs (random name endpoint, by id 1-99).
- **License:** MIT.
- **Get it:** `git clone https://github.com/birdfromhell/MuslimApi`.

## 6. cemalkarabulakli/esmaulhusna_muslimbg (Flutter pub.dev, MIT)
- **Contains:** Offline Esmaul Husna dataset for Flutter; Arabic + localized meanings (bg, en, tr, bs, mk, sq, ar).
- **License:** MIT.
- **Get it:** `flutter pub add esmaulhusna_muslimbg`.

## 7. my-prayers/muslim-data-flutter (Apache-2.0)
- **Contains:** Flutter lib: prayer times, offline geocoder, **99 Names of Allah** (en, ar, ckb, fa, ru), Azkars. MIT.
- **Get it:** `flutter pub add muslim_data`.

## Also noted
- `asmaul-husna-api-coral.vercel.app` (multilingual EN/BN/UR/ID, audio), `rn0x/Names_Of_Allah_Json`.

## Agent notes
- For a non-Flutter backend, `adiman-dev/islamic-json` (asma.json) or `uthumany/asma-al-husna-api` (static JSON, no server) are the leanest picks.
