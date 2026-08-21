# 09 — Licensing & Attribution (READ THIS)

**The single most important finding:** a repo's MIT/Apache license almost never covers the
*content* (Quran text, translations, hadith, tafsir). Content carries its own rights.
Failing to attribute correctly is the #1 legal risk for an Islamic app.

## Content rights at a glance

| Content | Typical rights | Attribution requirement |
|---------|----------------|--------------------------|
| Arabic Quran (Uthmani) | Public domain / Tanzil CC BY 3.0 | Credit Tanzil (`tanzil.net`) |
| Quran translations | Mixed: PD (Pickthall, Yusuf Ali) + copyrighted (Saheeh Intl, etc.) | Per-edition; keep translator + source |
| Tafsir | Per scholar/publisher (Ibn Kathir PD-ish; others rights-held) | Credit author/source |
| Hadith (sunnah.com) | © sunnah.com | API key / attribute sunnah.com |
| Hisnul Muslim (duas) | Widely public domain | Optional |
| Recitation audio | © reciters & producers | Do NOT re-host; link/stream only |
| Word timing (quranlab) | CC-BY-4.0 | Credit QuranLab / cpfair |

## Rules of thumb
1. **Separate code license from content license.** MIT repo ≠ free content.
2. **Keep provenance metadata** (platform, translator, author, version) in your data store. Build attribution into the UI early, not at release.
3. **Don't modify the Quran text** (Tanzil CC BY 3.0: "text may not be modified").
4. **Audio:** stream from original source / reference manifest; never redistribute reciter files.
5. **Non-commercial datasets** (`freococo/sunnah_dataset` CC BY-NC-SA, `FaresElmenshawi` CC BY-NC) → exclude from commercial apps.
6. **Use official APIs** (islamhouse/quranenc/hadeethenc/sunnah) over scraping when possible.
7. **Preserve integrity** — don't alter or misrepresent meaning; AI summaries must not be presented as verbatim source.

## Honor-shopping quick list (commercial-safe defaults)
- Quran text: `tanzil.net` (CC BY 3.0) or `quranlab/quran` (PD + attributed).
- Translations: pick PD editions (Pickthall, Shakir, Yusuf Ali) for zero-friction use.
- Hadith: `sunnah-com/api` (canonical) or `fawazahmed0/hadith-api` (graded, MIT repo).
- Prayer math: `batoulapps/adhan-js` (MIT) — compute locally.
- Duas: Hisnul Muslim (public domain).
- Names of Allah: `adiman-dev/islamic-json` (no license, free).

## References
- islamhouse-api hub `LICENSES.md` / Content Usage & Rights section.
- Tanzil terms: https://tanzil.net/download/
- QuranLab `LICENSES.md` (per-edition license table).
