# 02 — Hadith

## 1. sunnah-com/api (official) ⭐ canonical
- **Contains:** Official API for hadith collections (Bukhari, Muslim, Abu Dawud, Tirmidhi, Nasa'i, Ibn Majah, Malik, Riyad as-Salihin, etc.) — Arabic + English, chapters, gradings.
- **License:** Content © sunnah.com; API key required (request via GitHub issue) or offline dump on request. Repo source open.
- **Get it:**
  ```bash
  git clone https://github.com/sunnah-com/api
  # Docs: https://sunnah.stoplight.io/docs/api/  (key via github.com/sunnah-com/api issue)
  ```
- **Agent notes:** Most authoritative. Pair with a Python client `NaxAlpha/sunnah-api` (`pip install git+https://github.com/NaxAlpha/sunnah-api`).

## 2. fawazahmed0/hadith-api (GitHub, 358★) ⭐ best offline
- **Contains:** Free Hadith API — multiple languages, multiple grades, 9+ books (Bukhari, Muslim, Abu Dawud, Tirmidhi, Nasa'i, Ibn Majah, Malik, Riyadussalihin, etc.).
- **License:** Repo MIT; content per upstream (sunnah.com + others).
- **Get it:** `git clone https://github.com/fawazahmed0/hadith-api` (offline JSON) or raw CDN.

## 3. AhmedBaset/hadith-json (GitHub)
- **Contains:** 50,884 hadiths (Arabic + English) from sunnah.com, 17 books. Two layouts: `db/by_book/`, `db/by_chapter/`.
- **License:** Scraped from sunnah.com — attribute sunnah.com.
- **Get it:** `git clone --branch v1.2.0 https://github.com/AhmedBaset/hadith-json` (pin a tag; format may change on main).

## 4. freococo/sunnah_dataset (Hugging Face)
- **Contains:** 39,318 hadiths from Sunnah.com (Kutub al-Sittah + secondary). Fields: arabic_full, english_full, gradings (Sahih/Hasan/Da'if + scholar), book/chapter, url.
- **License:** CC BY-NC-SA 4.0 (non-commercial).
- **Get it:** `python -c "from datasets import load_dataset; load_dataset('freococo/sunnah_dataset')"`.

## 5. mhashim6/Open-Hadith-Data (GitHub)
- **Contains:** Full databases of 9 hadith books (with/without Arabic diacritics, UTF-8).
- **License:** Open (check repo).
- **Get it:** `git clone https://github.com/mhashim6/Open-Hadith-Data`.

## 6. gadingnst/hadith-api (GitHub)
- **Contains:** Hadith collections in multiple languages (Bukhari, Muslim, Abu Daud, etc.), used by many apps.
- **License:** Check repo.
- **Get it:** `git clone https://github.com/gadingnst/hadith-api`.

## 7. quranlab/hadith (Hugging Face)
- **Contains:** Nine Books Arabic matn, translations, normalized authenticity grades — joins `quranlab/islamic-corpus-graph` on verse_key.
- **License:** Per upstream (sunnah.com origin).
- **Get it:** `load_dataset('quranlab/hadith')`.

## 8. CheeseWithSauce/HadithsJSONFormat (GitHub)
- **Contains:** Free organized hadith (Arabic, English, gradings) book-wise + topic-wise: Bukhari, Muslim, Abu Dawud, Tirmidhi, Nasa'i, Ibn Majah, Malik, Riyad as-Salihin, + more. "No credits required."
- **License:** Free to use (stated by author).
- **Get it:** `git clone https://github.com/CheeseWithSauce/HadithsJSONFormat`.

## Also noted
- `kamranxdev/sunnah-com-scraper` (Python, bilingual, resume), `haseebarshad17/quran-hadith-json` (95+ lang hadith JSON), `dorar.net` Arabic hadith API (`AhmedElTabarani/dorar-hadith`), `fekracomputers/HadithWebservice`.

## Agent notes
- For **authenticity grading**, prefer `sunnah-com/api` or `fawazahmed0/hadith-api` (graded). `freococo` is NC-only — avoid for commercial apps.
- Join Quran↔Hadith via `quranlab/islamic-corpus-graph` for retrieval agents.
