# 08 — Curated Hubs & Meta-Lists

These aggregate many sources and are the best **starting points** for an agentic app.

## 1. islamhouse-api/multilingual-quran-hadith-islamic-content-database-api-hub (GitHub, 80★) ⭐
- **Contains:** Single reference hub for **IslamHouse**, **QuranEnc**, **HadeethEnc** official APIs — Quran (translations/tafsir/metadata), Hadith (texts/translations/explanations), books, articles, fatwas, audio, video, 147-language directory.
- **License:** Repo + docs MIT; **content governed separately** by each platform's rights. Explicit attribution guidance.
- **Get it:** `git clone https://github.com/islamhouse-api/multilingual-quran-hadith-islamic-content-database-api-hub`. Docs: IslamHouse API v3 (Postman), QuranEnc API, HadeethEnc API.

## 2. choubari/Awesome-Muslims (GitHub, 432★)
- **Contains:** Curated list of open-source Muslim projects & resources — web/mobile/desktop apps, APIs & data (Quran API, Hadith JSON, AlAdhan, azkar-db, Open-Hadith-Data, sunnah-com/api, fawazahmed0 hubs), libraries, assets (fonts/sound/db).
- **License:** Open list.
- **Get it:** `git clone https://github.com/choubari/Awesome-Muslims`.

## 3. tarekeldeeb/awesome-islamic-open-source-apps (GitHub, 2025)
- **Contains:** Maintained, auto-categorized list of 300+ open-source Islamic projects by app type & language (Quran reading 170, prayer times 44, hadith 15, dua 2, qibla 2…). Includes `quran-api` (gadingnst, 784★), `fawazahmed0/quran-api` (831★), `quran.com` (1030★), `quranic-universal-library` (586★).
- **Get it:** `git clone https://github.com/tarekeldeeb/awesome-islamic-open-source-apps`.

## 4. marzzuki/awesome-islamic-tech (GitHub)
- **Contains:** Curated technical resources, APIs, libraries, learning platforms (Unlicense).
- **Get it:** `git clone https://github.com/marzzuki/awesome-islamic-tech`.

## 5. AhmedKamal/awesome-Islam (GitHub)
- **Contains:** Curated list: APIs & libraries (ITL, Pray-Times, quran-cli, pyIslam…), ML/AI (Tarteel), apps, dev resources (Quran-CSV, madani-muhsaf-json, Quran-Corpus, Open-Hadith-Data, Hisn json, Names json).
- **Get it:** `git clone https://github.com/AhmedKamal/awesome-Islam`.

## 6. mmmoussa/Islamic-Developer-Resources (GitHub)
- **Contains:** List of Quran copies/translations (Tanzil, AlQuran.cloud, GlobalQuran), analysis (Alfanous, Quranic Arabic Corpus), audio/images (EveryAyah, QuranicAudio, official vectors), prayer-time libs (Adhan, PrayTimes, AlAdhan, MuslimSalat), masjid API, Arabic NLP (betaCode, stemmers, fonts).
- **Get it:** `git clone https://github.com/mmmoussa/Islamic-Developer-Resources`.

## 7. quranlab/islamic-corpus-graph (Hugging Face) ⭐ for RAG agents
- **Contains:** Links `quranlab/quran` + `quranlab/hadith` + tafsir into one structured graph with retrieval passages + held-out eval set. Same `verse_key` join.
- **Get it:** `load_dataset('quranlab/islamic-corpus-graph')`.

## Agent notes
- Start from `islamhouse-api` hub + `awesome-islamic-open-source-apps` to discover vetted sources.
- For a **retrieval/RAG agent**, `quranlab/islamic-corpus-graph` gives a ready joined corpus.
