# 03 — Tafsir (Quranic Exegesis)

## 1. spa5k/tafsir_api (GitHub, 189★) ⭐ best
- **Contains:** Free Tafsir API — **122 tafsirs** in many languages, no rate limits. REST-style static JSON served via CDN.
- **License:** MIT.
- **Get it:**
  ```bash
  git clone https://github.com/spa5k/tafsir_api
  # or CDN: https://cdn.jsdelivr.net/gh/spa5k/tafsir_api@main/tafsir/en-al-jalalayn/1.json
  # editions: https://cdn.jsdelivr.net/gh/spa5k/tafsir_api@main/tafsir/editions.json
  ```

## 2. meibassam/mosahaf-tafseer (GitHub) ⭐ Arabic tafsir set
- **Contains:** Complete Quran (114 surahs, 6,236 ayahs) in JSON, one file per surah, each ayah with a `tafsir` array. Includes: Al-Tafsir Al-Muyassar, Al-Jalalayn, As-Sa'di, **Ibn Kathir**, Al-Waseet, Al-Baghawi, Al-Qurtubi, Al-Tabari.
- **License:** Automated aggregation of public sources; verify per-use.
- **Get it:** `git clone https://github.com/meibassam/mosahaf-tafseer` → `NNN_surah-slug.json`.

## 3. Tarteel AI — QUL tafsir exports (qul.tarteel.ai)
- **Contains:** Tafsir Ibne Kathir and others, exportable as JSON + SQLite. Multi-ayah groups, ayah_keys alignment.
- **License:** Repo CC BY 4.0; content per upstream.
- **Get it:** `https://qul.tarteel.ai/resources/tafsir/306` (Ibn Kathir) → download JSON/SQLite.

## 4. bdllhdrss3/Quran-Database (GitHub)
- **Contains:** Per-ayah Quran text + Ibn Kathir tafsir + English translation (Dr. T.B. Irving) + metadata. Free for personal/educational/research.
- **License:** Free to use (stated).
- **Get it:** `git clone https://github.com/bdllhdrss3/Quran-Database`.

## 5. NeaByteLab/Quran-Data (GitHub)
- **Contains:** Static dataset: verses, Indonesian translation, Kemenag tafsir, per-verse audio, mushaf page images (Hafs/Hafs-Tajweed/Warsh), + 9 hadith collections. 114 JSON per surah for quran & tafsir.
- **License:** Check repo.
- **Get it:** `git clone https://github.com/NeaByteLab/Quran-Data` (also Google Drive backup).

## 6. quran/quran-mcp (GitHub, MCP server)
- **Contains:** Canonical Quran text (multiple qira'at), 50+ translations, 15+ tafsir (Ibn Kathir, Tabari, Qurtubi, Sa'di…), full-text search, morphology, mushaf viewer. Sourced from quran.com / Quran Foundation.
- **License:** Content © Quran Foundation.
- **Get it:** `git clone https://github.com/quran/quran-mcp`.

## Also noted
- `zhibeky/quran_ai` (RAG example with `tafsir_ibn_kathir.json` ~39MB), Kaggle `oyilmaztekin/quran-tafsir-ibn-kathir-jsonl`, `emadmokhtar/tafseer_api`.

## Agent notes
- For RAG: `spa5k/tafsir_api` gives clean per-ayah tafsir JSON; `quranlab/quran` carries tafsir subsets (e.g. `tafsir-kuranyolu-tr`). Join on `verse_key`.
