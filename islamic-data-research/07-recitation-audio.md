# 07 — Quran Recitation Audio

> ⚠️ Audio files are **copyright of reciters/producers** — never re-host without permission. Use *reference manifests* that link to the original source, or download for personal/derived use under each host's terms.

## 1. everyayah.com ⭐ verse-by-verse origin
- **Contains:** Complete verse-by-verse (ayah) MP3 recitations by ~44 reciters (Mishary Alafasy, Abdul Basit, Husary, etc.). Also full-surah MP3, timing files, Quran text.
- **License:** Public-source MP3s (widely used; check everyayah.com terms).
- **Get it:** Browse `https://everyayah.com/` → `recitations_ayat.html`; timing files at `https://everyayah.com/data/timings_files/`.

## 2. quranlab/quran-audio (Hugging Face) ⭐ reference + timing
- **Contains:** Verse-aligned **reference manifest** — 245-reciter taxonomy, per-ayah + per-surah manifests with external `audio_url` (everyayah.com, mp3quran.net), and **CC-BY-4.0 word timing** for 44 recordings. Hosts NO audio bytes (links out).
- **License:** Word timing CC-BY-4.0; audio referenced, not hosted (honor reciter rights).
- **Get it:** `load_dataset('quranlab/quran-audio')` (default `manifest`); `load_dataset('quranlab/quran-audio','surah-manifest')`; per-reciter configs e.g. `husary`, `mishary-alafasy`.
- **Agent notes:** Join `verse_key` with `quranlab/quran` for text+audio alignment. Fetch bytes from `audio_url`.

## 3. QuranicAudio.com
- **Contains:** High-quality MP3 recitations (Haramain Taraweeh, non-Hafs, translations).
- **License:** Check site terms.
- **Get it:** `https://quranicaudio.com/`.

## 4. zaibihassan/Quranic-Recitation-Data (Hugging Face, Apache-2.0)
- **Contains:** 135 reciters × 114 surahs — 15,390 `.opus` files (16kHz, 32kbps) + Protocol-Buffer word-level timing (`.pb`) for karaoke highlighting. Cloudflare CDN w/ range requests.
- **License:** Apache-2.0.
- **Get it:** `curl https://cdn.mualim.app/<reciter>/001.opus` + `001.pb`. (Repo ~17GB; stream via CDN.)

## 5. Rdyh/everyayah (Hugging Face, CC-BY-4.0)
- **Contains:** 24,944 ayah-level recitations (4 reciters: Matroud, Al-Juhani, Yasser Salama, Al-Hussary), diacritized Arabic text, ~174h, 16kHz MP3.
- **License:** CC-BY-4.0.
- **Get it:** `load_dataset('Rdyh/everyayah')`.

## 6. dev-ahmedhany/everyayah-wav (Hugging Face, CC0)
- **Contains:** everyayah.com MP3s re-encoded to 16kHz mono WAV (44 reciters), audio-only, for ML/ASR.
- **License:** CC0 1.0.
- **Get it:** `load_dataset('dev-ahmedhany/everyayah-wav')`.

## 7. Wider-Community/quranic-universal-audio (GitHub)
- **Contains:** Unified audio + timing hub; word/letter-level timestamps; visualizer + editing tool. Sources: QuranicAudio, EveryAyah, MP3Quran, QUL, TVQuran, SurahQuran.
- **License:** Project work CC BY 4.0; recordings remain reciter property.
- **Get it:** `git clone https://github.com/Wider-Community/quranic-universal-audio`.

## Also noted
- `quranlab/quran` carries word-level **morphology** (Buckwalter) — pair with audio timing for word-sync highlight.
- `mp3quran.net` — per-surah recordings across 15 riwayat.

## Agent notes
- For an **audio-sync app**, use `zaibihassan/Quranic-Recitation-Data` (`.pb` timing, Apache-2.0) or `quranlab/quran-audio` (CC-BY timing + reference URLs).
- Always stream/link rather than redistributing reciter audio.
