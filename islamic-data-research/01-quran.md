# 01 — Quran Text & Translations

## 1. quranlab/quran (Hugging Face) ⭐ top pick
- **Contains:** Verse-aligned multilingual Quran corpus — 79 languages, 185 translations, all row-aligned on canonical `verse_key` (Hafs ʿan ʿAsim, 114 surahs, 6,236 ayahs). Includes Arabic (Uthmani & Simple-Clean, Tanzil CC BY 3.0), morphology (Quranic Arabic Corpus, GPL), structural metadata (juz/hizb/page/ruku/manzil/sajda).
- **License:** Arabic text Tanzil CC BY 3.0; PD translations verbatim; others by-reference with per-row `license`/`source`/`attribution`. Dataset asserts no copyright. Honest removal-on-request.
- **Get it:**
  ```bash
  pip install datasets
  python -c "from datasets import load_dataset; load_dataset('quranlab/quran')"   # arabic-uthmani default
  # load_dataset('quranlab/quran','en-pickthall'); load_dataset('quranlab/quran','tafsir-kuranyolu-tr')
  ```
- **Agent notes:** Single `verse_key` join key → easy RAG over Quran. Companion datasets `quran-audio`, `hadith`, `islamic-corpus-graph` join on same key.

## 2. fawazahmed0/quran-api ⭐ (GitHub, 831★)
- **Contains:** Free Quran API — 90+ languages, 400+ translations, offline JSON.
- **License:** Content aggregated from Tanzil / quran.com / KFGQPC; repo MIT, content per upstream.
- **Get it:** clone `https://github.com/fawazahmed0/quran-api` or use raw/JSDelivr CDN:
  ```bash
  git clone https://github.com/fawazahmed0/quran-api
  # or: curl https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@main/quran/{edition}/{surah}.json
  ```

## 3. mjmirza/quran-dataset (GitHub)
- **Contains:** Validated Arabic Quran — 114 surahs, 6,236 ayahs. Nested JSON, flat JSONL, CSV. Word-level + rich metadata (juz/hizb/manzil/ruku/page/sajda), 6-layer validation, content hashes.
- **License:** CC BY 4.0 (original schema/validation); Arabic text public domain; Tanzil structural metadata CC BY 3.0 (keep NOTICE.md).
- **Get it:** `git clone https://github.com/mjmirza/quran-dataset` → `data/quran.json`.

## 4. dotquran/corpus (GitHub)
- **Contains:** Tanzil text in JSON/YAML/XML for 7 variants (uthmani, simple, simple-clean, simple-minimal, simple-plain, simple-imlaai).
- **License:** Tanzil CC BY 3.0 (text may not be modified; credit tanzil.net).
- **Get it:** `git clone https://github.com/dotquran/corpus` → `processed/<variant>/quran-<n>.json`.

## 5. risan/quran-json (npm / GitHub)
- **Contains:** Quran text, transliteration, translations in JSON (en, id, ru, tr, ur, zh…) via CDN.
- **License:** Text from QuranEnc/Tanzil (see upstream); repo MIT.
- **Get it:** `npm i quran-json` or CDN `https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/quran.json`.

## 6. nafiskabbo/quran-dataset (GitHub)
- **Contains:** Offline-first Quran DB (SQLite + JSON mirrors): Uthmani text, EN/BN/UR/FR/ID translations, transliteration, audio schema, metadata. Export script (JSON/CSV), validation, MIT repo.
- **License:** MIT repo; Quran text/translations carry own attribution (see docs/DATA_SOURCES.md).
- **Get it:** `git clone https://github.com/nafiskabbo/quran-dataset`.

## 7. faha1999/al-quran-database (GitHub / npm)
- **Contains:** Developer-first dataset + API platform. 134 translations, word-by-word morphology, per-ayah knowledge base, REST + GraphQL, offline TS SDK `@faha1999/al-quran-database`. 20+ typed functions.
- **License:** See repo (check LICENSE).
- **Get it:** `npm i @faha1999/al-quran-database` or `git clone https://github.com/faha1999/al-quran-database`.

## 8. Tarteel AI — Quranic Universal Library (QUL) (qul.tarteel.ai)
- **Contains:** Curated open-source Arabic Quranic datasets + tools: Uthmani script, metadata (surah/ayah/juz/hizb/rub/manzil), DigitalKhatt font. Also tafsir JSON/SQLite exports.
- **License:** Repo CC BY 4.0; content per upstream.
- **Get it:** Browse `https://qul.tarteel.ai/resources` → download JSON/SQLite.

## 9. Tanzil (tanzil.net) — canonical origin
- **Contains:** Authoritative Uthmani + simplified Quran text, quran-data.xml metadata. The root source most datasets derive from.
- **License:** CC BY 3.0.
- **Get it:** `https://tanzil.net/download/` or `https://tanzil.net/res/text/metadata/quran-data.xml`.

## Also noted
- `quran/quran.com-api`, `gadingnst/quran-api` (784★), `rn0x/Quran-Data`, `aliftype/quran-data`, `semarketir/quranjson`, `azvox/quran-csv`, `hamzakat/madani-muhsaf-json` (Madani pagination), `quran/corpus` (morphology/grammar).
