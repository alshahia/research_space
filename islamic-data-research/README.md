# Islamic Data Sources — Research Compilation

**Goal:** Build an Islamic app with agents using only **free & open-source** data.
**Run scope:** Research + documentation only. **No installs were performed in this run.**
**Date:** 2026-08-21

This folder is a curated index of every free/open-source Islamic dataset, API, and
library found, grouped by category. Each entry lists **what it contains**, **license**,
**how to download/install**, and **notes for an agentic app**.

> ⚠️ **LICENSING IS PER-DATASET, NOT PER-REPO.** The MIT/Apache license on a GitHub
> repo almost never covers the *content* (Quran text, translations, hadith, tafsir).
> Content has its own rights/attribution. See `09-licensing.md`.

---

## Index

| # | Category | Best starter pick |
|---|----------|-------------------|
| 01 | Quran text & translations | `fawazahmed0/quran-api` (90+ langs) or `quranlab/quran` (HF, 79 langs) |
| 02 | Hadith | `sunnah-com/api` + `fawazahmed0/hadith-api` or `AhmedBaset/hadith-json` |
| 03 | Tafsir (exegesis) | `spa5k/tafsir_api` (122 tafsirs) or `meibassam/mosahaf-tafseer` |
| 04 | Prayer times / Qibla / Hijri | `batoulapps/adhan-js` (calc) + `aladhan.com` API (geo) |
| 05 | Duas & Adhkar | `sehalhussain/Hadith-Dua-assets` or `rn0x/Adhkar-json` |
| 06 | Names of Allah (Asma ul Husna) | `adiman-dev/islamic-json` or `uthumany/asma-al-husna-api` |
| 07 | Recitation audio | `everyayah.com` + `quranlab/quran-audio` (timing) |
| 08 | Curated hubs / meta-lists | `islamhouse-api` hub, `choubari/Awesome-Muslims`, `tarekeldeeb/awesome-islamic-open-source-apps` |

---

## Recommended agentic-app starter stack

- **Quran text + 100+ translations + tafsir + audio refs**: `quranlab/quran` (HF dataset) as the canonical text layer, joined on `verse_key` with `quranlab/quran-audio` for recitations.
- **Hadith**: `fawazahmed0/hadith-api` (offline JSON, multilingual, graded) + `sunnah-com/api` for canonical Arabic.
- **Prayer/Qibla/Hijri math**: `batoulapps/adhan-js` (MIT, precise) for local calculation; `aladhan.com` API for geo lookups.
- **Duas/Adhkar**: `rn0x/Adhkar-json` (text+audio, Hisnul Muslim).
- **Names of Allah**: `adiman-dev/islamic-json` (`asma.json`).
- **Agent retrieval (RAG)**: use `quranlab/islamic-corpus-graph` to link Quran + Hadith + tafsir into one graph with retrieval passages.

See individual files for full detail.

---

## How to read each entry

- **Contains** — the actual data.
- **License** — repo license AND content rights (where known).
- **Get it** — exact clone / API / CDN command (no execution this run).
- **Agent notes** — integration tips.
