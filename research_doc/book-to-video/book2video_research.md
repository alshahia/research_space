# Book → Video Pipeline — Full Research Guide for Agent Execution

**Date:** 2026-08-10 · **Goal:** convert a custom book (agent-generated or user-supplied) into a narrated, visualized video
**Audience:** other LLMs/agents that must implement this end-to-end. Everything needed to execute is in this file.

---

## 0. TL;DR — What to build

Two video modes (user-selectable):

1. **Mode 1 — Single static image:** one image (cover or chosen art) stays on screen for the whole video. Optional subtitle track + optional voice visualizer (waveform overlay). 
2. **Mode 2 — Multi-image (agent-planned):** an LLM analyzes the book, writes a *scene plan* (how many images, where each lands in the timeline), generates one image per scene with a consistent style, and the video cuts between them with Ken Burns motion.

Pipeline stages: `parse book → LLM scene analysis → TTS narration → image gen (Flux) → subtitle/timing → ffmpeg assembly → (optional waveform overlay)`.

**Key decisions (rationale below):**
- TTS: **Kokoro-82M** (local, Apache-2.0, best narration quality-per-size) as the pipeline default; **debpalash/VoiceStudio** app as a full GUI/audiobook alternative; **Chatterbox** if voice *cloning* is required. **Meta Voicebox is a dead end — never released to the public.**
- Images: **Flux.1 Schnell Q4_K_S GGUF** (user already owns `flux1-schnell-Q4_K_S.gguf`) via ComfyUI-GGUF node. 4 steps, cfg 1.0, 1024×1024.
- Video: **ffmpeg** (already installed, full gyan build) with zoompan Ken Burns + xfade transitions + burned-in subtitles + optional showwaves/showwavespic waveform.

---

## 1. Local environment facts (verified 2026-08-10)

| Item | State | Notes |
|---|---|---|
| Python | **NOT installed** (MS Store stub only) | **Must install first** — every pipeline tool needs it. Install 3.11+ from python.org; check "Add to PATH". |
| ffmpeg | ✅ Installed | `2025-08-25-git full build (gyan.dev)` — has zoompan, xfade, showwaves, showwavespic, libass, subtitles. |
| GPU | NVIDIA Quadro RTX 4000 | Driver reports **4 GB VRAM** (AdapterRAM), physical card is normally 8 GB — **verify with `nvidia-smi` before sizing**; treat as 8 GB worst-case-tight. |
| RAM | 31.8 GB | Ample for CPU TTS + ComfyUI. |
| iGPU | Intel UHD 630 (1 GB) | Not usable for gen; CPU fallback for Kokoro is fine (faster than realtime). |

### Model files present at `D:\comfy\models` (verified)

| Path | Model | Role |
|---|---|---|
| `diffusion_models\flux1-schnell-Q4_K_S.gguf` | Flux.1 Schnell 4-bit (city96) | **Primary image model** |
| `text_encoders\clip_l.safetensors` | CLIP-L | Flux text encoder (paired with T5) |
| `text_encoders\t5xxl_fp16.safetensors` | T5-XXL FP16 | Flux text encoder (the prompt understands language) |
| `vae\ae.safetensors` | Flux VAE | Decode latents → pixels |
| `checkpoints\ponyDiffusionV6XL_v6StartWithThisOne.safetensors` | SDXL checkpoint | **Fallback** image model (standard SD workflow) |
| `clip_vision\clip_vision_h.safetensors`, `blip\checkpoints`, `insightface\buffalo_1`, `xlabs\controlnets`, `xlabs\loras` | — | Not needed for this pipeline |

⚠️ **Empty/unpopulated** (do not rely on): `unet`, `gguf`, `upscale_models`, `animatediff_*`, `CogVideo`, `controlnet`, `loras`, `vae_approx`, `style_models`, `diffusers`, `embeddings`, `LLM`, `gligen`, `hypernetworks`, `liveportrait`, `photomaker`, `Joy_caption`, `layerstyle`, `configs`. **No ComfyUI install lives at D:\comfy** (it's a shared models folder). Find the actual ComfyUI install elsewhere on the machine or install fresh; either way, model dirs above must be pointed at / copied into the ComfyUI `models/` tree.

---

## 2. Pipeline overview

```
book (PDF/EPUB/MD/TXT)
   │
   ▼
[1] Parse & chunk ──► chapters, paragraphs, dialogue vs narration (NLTK/pypdf)
   │
   ▼
[2] LLM scene analysis ──► scenes.json  (Mode 2: how many images + where; Mode 1: skip)
   │  style bible (consistent look for whole book) + per-scene image prompt
   │
   ├──────────────┬────────────────────┐
   ▼              ▼                    ▼
[3a] TTS          [3b] Image gen       [3c] Timing
narration per     Flux Schnell via     per-sentence audio durations
chunk             ComfyUI API          (real audio → true scene length)
   │              │                    │
   ▼              ▼                    ▼
[4] Assemble with ffmpeg
   │  per-scene clip: image + Ken Burns (zoompan) + optional waveform overlay
   │  xfade transitions on exact scene boundaries
   │  hard-burn SRT subtitles (optional)
   │  concat + narration + optional BGM via amix
   ▼
final.mp4 (H.264 +faststart)
```

**Golden rule (from pdf2vid + Wheel of Heaven):** scene duration = **actual measured narration audio length**, never an estimate. Generate/measure audio first, then cut video to fit audio.

---

## 3. Stage 1 — Parse the book

```bash
pip install pypdf nltk
```

- PDF: `pypdf.PdfReader` → per-page text → strip headers/footers/page numbers.
- Split sentences with NLTK (`nltk.download('punkt_tab')`).
- Classify each sentence: inside quotes (`"..."`/`'...'`/guillemets) → **dialogue**, else **narration** (pattern from Book2Movie). Dialogue can get character voices; narration gets narrator voice.
- Chunk for TTS: narration → paragraphs; dialogue → per-line. **Never feed TTS more than ~1 short paragraph per call** (see §5: model clips <30 s).

---

## 4. Stage 2 — Agent scene analysis (Mode 2: multi-image)

Deliverable: `scenes.json` + `style.json`.

### 4.1 Style bible first (book-wide consistency — Wheel of Heaven pattern)

One `style.json` for the whole book, e.g.:

```json
{
  "book_title": "The Alchemist",
  "style_prefix": "cinematic book illustration, warm golden palette, soft volumetric light, painterly, rich detail",
  "style_suffix": "no text, no letters, no watermark, photorealistic rendering",
  "negative": "",
  "resolution": [1024, 1024],
  "characters": {
    "santiago": "young shepherd boy, dark curly hair, white shirt, brown pants, carrying a sheepfold",
    "the_alchemist": "old wise man, long beard, black robes, piercing eyes"
  },
  "locations": {
    "andalusia_field": "rolling green hills, olive trees, morning mist",
    "desert": "vast golden sand dunes at dusk, caravan silhouettes"
  }
}
```

- **Character-consistency trick** (ai-video-pipeline): reuse the *last generated image* of a character as the base for the next scene showing them (img2img tail-frame chaining). Cheap alternative: fixed textual description per character in the style bible.

### 4.2 Scene plan (LLM writes this)

Input: full text (or per-chapter), theme/setting/plot/tone hints, style bible.
Output rules:

- One scene per distinct **location + time + event** beat. A 30k-word book ≈ 60–150 scenes (typical: 1 scene ≈ 200–500 words of narration ≈ 1.5–4 min of audio).
- Each scene: `{id, chapter, start_word_idx, end_word_idx, summary, image_prompt, mood, characters_present}`.
- The image prompt = `style_prefix + scene-specific description + character/location blocks + style_suffix`.
- Scene placement is *absolute* in the text → because durations come from real TTS audio (§5), the video timeline is built by cumulating per-chunk audio durations, so **scene boundaries in time are computed after TTS**, not before.

```json
// scenes.json — one entry per scene (Mode 2); Mode 1 has exactly 1 entry
[{
  "id": "ch1_scene1",
  "chapter": 1,
  "text_range": [0, 312],
  "summary": "Santiago leaves his flock and enters the ruined church",
  "image_prompt": "cinematic book illustration, warm golden palette, ... | young shepherd boy, dark curly hair, white shirt, brown pants, carrying a sheepfold | ruined stone church interior, sycamore tree, moonlight beam through roof hole | no text, no letters, photorealistic rendering",
  "mood": "quiet wonder"
}]
```

### 4.3 Mode 1 (single image)

One image total — user picks (cover art, first scene, or a custom prompt). The whole video uses it with continuous slow Ken Burns. Optional: the same image blurred + darkened as backdrop while captions sit on it.

---

## 5. Stage 3a — TTS narration (pick ONE)

### 5.1 Decision table

| Need | Choice | License | Why |
|---|---|---|---|
| **Default narration** | **Kokoro-82M** (via `pip install kokoro`) | Apache-2.0 | 82M params, 54 voices / 8 langs, faster-than-realtime on **CPU** (~no GPU pressure), trained on long-form narration, TTS Arena Elo ≈ 1060, ≈ $0.50/1M chars vs ElevenLabs $165 |
| Full app / audiobook studio / GUI | **VoiceStudio** (`debpalash/VoiceStudio`, the open ElevenLabs alt) | AGPL-3.0 | 100% local Tauri app; 14 TTS engines incl. Kokoro/CosyVoice 3; **Audiobook EPUB/PDF → .m4b multi-voice cast**; voice cloning; OpenAI-compatible API on `localhost:3900`; even ships an **MCP server** so an agent can drive it |
| Voice **cloning** (user's voice) | **Chatterbox** (Resemble) — `pip install chatterbox-tts` | MIT | 0.5B, zero-shot clone from ~5 s, 23+ langs, emotion dial, Turbo variant 75 ms |
| Online, zero-install, word-accurate subtitles | **edge-tts** (`pip install edge-tts`, free MS neural voices) | free (online) | subtitle cues are word-accurate natively — ideal for quick drafts |
| Best-quality pre-produced clone (non-commercial) | CosyVoice 3 (`Fun-CosyVoice3-0.5B`) | free (research) | best zero-shot for audiobooks, RTF ≈ 0.7 |
| ❌ **Meta Voicebox** | **Not available — never released.** Do not attempt. | — | Research paper + demo site only (June 2023) |

### 5.2 Kokoro — exact setup (recommended default)

```bash
pip install kokoro soundfile  # or: git clone remsky/Kokoro-FastAPI for the FastAPI server
python -c "from kokoro import KPipeline; p = KPipeline(lang_code='a'); 
for i,(gs,ps,audio) in enumerate(p('Hello world.', voice='af_heart')): 
    print(i, gs, ps); audio.write('test.wav')"
```

- Voices: `af_heart`, `af_alloy`, `af_bella`, `am_michael`, ... (54 total; `am_` = male, `af_` = female, US/GB variants).
- **Chunking is mandatory**: each call renders a finite clip (keep ≤ ~1 paragraph; long books need per-paragraph calls, concat later).
- Short lines ("he said") sound robotic in Kokoro → merge attribution into the surrounding paragraph, or let a different voice read dialogue.
- Character voice allocation (Book2Movie): LLM classifies characters into narrator / M / F; each **lead character gets its own voice**; minor characters share remaining voices round-robin. Kokoro has no cloning, so pick from the 54 presets.

### 5.3 VoiceStudio — alternative path (app)

- Install Windows MSI from `github.com/debpalash/VoiceStudio/releases`.
- It exposes an OpenAI-compatible endpoint at `http://localhost:3900/v1` — an agent can just POST `/v1/audio/speech` instead of running Kokoro itself.
- Its "Audiobook" feature already does EPUB/PDF → multi-voice `.m4b`; use that if the pipeline is OK running inside the app.

---

## 6. Stage 3b — Image gen with Flux Schnell GGUF

### 6.1 One-time install

```bash
# 1. Have a ComfyUI install (find the existing one on the machine, or fresh clone)
git clone https://github.com/comfyanonymous/ComfyUI
cd ComfyUI && pip install -r requirements.txt

# 2. GGUF support node (city96)
git clone https://github.com/city96/ComfyUI-GGUF custom_nodes/ComfyUI-GGUF
pip install --upgrade gguf   # dependency

# 3. Point the shared D:\comfy\models into the ComfyUI tree
#    (copy OR set extra_model_paths.yaml):
#    comfyui:
#      unet:            D:\comfy\models\diffusion_models
#      clip:            D:\comfy\models\text_encoders
#      vae:             D:\comfy\models\vae
#      checkpoints:     D:\comfy\models\checkpoints
```

**File placement rules (GGUF):** GGUF DiT files load via **"Unet Loader (GGUF)"** and live in `models/unet/` (the loader's `unet_name`). Safetensors encoders go in `models/clip/`, VAE in `models/vae/`.

### 6.2 Node graph (exact, no extras)

| Node | Inputs | Value |
|---|---|---|
| **Unet Loader (GGUF)** (category `bootleg`) | `unet_name` | `flux1-schnell-Q4_K_S.gguf` |
| **DualCLIPLoader** | `clip_name1` = `clip_l.safetensors`, `clip_name2` = `t5xxl_fp16.safetensors`, `type` = `flux` | |
| **CLIP Text Encode (Prompt)** | clip, text = **natural-language prompt** (T5 strength — no comma-tag syntax) | |
| **Load VAE** | `vae_name` | `ae.safetensors` |
| **Empty Latent Image** | 1024×1024 (batch 1) | 1280×720 for 16:9; ≤ 2 MP total |
| **KSampler** | `steps` = **4**, `cfg` = **1.0**, `sampler` = `euler`, `scheduler` = `simple` (or `beta`), `denoise` = 1.0 | **Schnell is trained for 1–4 steps; more steps = waste. Negative prompt: leave blank (Flux ignores it).** |
| **VAE Decode** → **Save Image** | | |

Optional on 4–8 GB VRAM: replace `t5xxl_fp16.safetensors` with quantized `t5-v1_1-xxl-encoder-Q8_0.gguf` (or Q6_K) from `city96/t5-v1_1-xxl-encoder-gguf` → `models/clip/` if OOM.

### 6.3 Speed & VRAM expectations

- Reference: ~16 s/image (warm) on RTX 4090 at Q8. On this Quadro (4–8 GB) expect **~30 s–2 min/image** at 4 steps — a 100-scene book ≈ 1–3 h of image gen. Generate scenes in parallel batches (ComfyUI queues them).
- VRAM tiering: 24 GB→Q8_0, 16 GB→Q6_K, 12 GB→Q5_K_S, ≤10 GB→Q4_0/Q4_1 (user's Q4_K_S is right); T5: 16 GB→FP16, 12 GB→Q8, 8 GB→Q6_K.
- `flux1-schnell-Q4_K_S.gguf` file size ≈ 4.7 GB; peak VRAM ≈ 7–8 GB at 1024². If it OOMs: drop to 768×768, batch 1, or T5 Q6_K.

### 6.4 Automating from an agent (ComfyUI API)

1. Start ComfyUI: `python main.py --port 8188` (models already wired).
2. POST workflow JSON to `http://127.0.0.1:8188/prompt`:
   - Nodes = `{ "3": {"class_type": "KSampler", "inputs": {"seed": 1, "steps": 4, "cfg": 1.0, "sampler_name": "euler", "scheduler": "simple", "denoise": 1.0, "model": ["4", 0], "positive": ["6", 0], "negative": ["7", 0], "latent_image": ["5", 0]}}, ... }` — inputs reference other nodes by `[node_id_string, output_index]`.
3. Poll `GET /history/{prompt_id}` until the node list shows done; grab `outputs.<id>.images[0].filename`.
4. Fetch bytes via `GET /view?filename=<filename>&subfolder=&type=output`.
5. Loop per scene: new prompt text + new seed → new image. (Optional live progress via `/ws` websocket + `client_id`.)

### 6.5 Fallback (no ComfyUI available)

`ponyDiffusionV6XL_v6StartWithThisOne.safetensors` (SDXL) is on disk — standard SD workflow (CLIP loader with clip_l + open_clip laion; **needs a real negative prompt**; 25–30 steps, cfg 7). Or use edge-tts + plain images to still ship Mode 1.

---

## 7. Stage 3c — Timing & subtitles

- **Measure** every TTS chunk's real duration (ffprobe or pydub `AudioSegment` duration). Scene start = cumulative sum → exact cuts.
- Word-level timestamps for subtitles:
  - **edge-tts**: returns word-boundary events natively → build SRT directly.
  - **Kokoro/chatterbox**: run `faster-whisper` with `word_timestamps=True` on the generated audio (~20× realtime on CPU), then `difflib.SequenceMatcher` to align recognized words to the canonical script text (fixes hallucinated words). WhisperX if diarization needed.
- SRT format:

```srt
1
00:00:00,000 --> 00:00:03,200
Santiago had always believed in omens.
```

---

## 8. Stage 4 — ffmpeg assembly (all copy-paste ready)

### 8.1 Mode 1 — single image + narration (+ optional waveform)

```powershell
ffmpeg -y -i narration.wav -i cover.png -filter_complex ^
"[1:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,zoompan=z='min(zoom+0.0005,1.15)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=25*N:s=1920x1080:fps=25,format=yuv420p[bg]; ^
[0:a]showwaves=s=1920x1080:colors=white@0.85:mode=line:rate=25[wave]; ^
[bg][wave]overlay=0:0:format=auto[v]" ^
-map "[v]" -map 0:a -c:v libx264 -crf 20 -preset medium -c:a aac -b:a 192k -movflags +faststart mode1.mp4
```

- `d=25*N` (N = video duration in seconds) keeps the single image alive for the full video; the `zoompan` gives slow Ken Burns.
- **Waveform scroll history limitation:** `showwaves` draws only the current 1/frame window (no history). For a *full scrolling waveform*, pre-render the whole waveform once and scroll it (8.3).

### 8.2 Mode 2 — multi-scene with Ken Burns + xfade

Per-scene clip (scene i, duration Di from real audio):

```powershell
ffmpeg -y -loop 1 -i scene_i.png -filter_complex ^
"[0:v]scale=8000:-1,zoompan=z='zoom+0.0008':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=25*Di:s=1920x1080:fps=25,format=yuv420p" ^
-t Di -c:v libx264 -crf 20 -preset medium scene_i.mp4
```

(Scale to 8000px wide *first* so zoompan has sub-pixel headroom → smooth glide, no judder — the Wheel of Heaven 4× supersample trick; 60 fps also helps.)

Then chain with exact xfade boundaries — each xfade offsets by cumulative durations minus transition length (T = 0.8 s):

```powershell
ffmpeg -y -i scene_1.mp4 -i scene_2.mp4 -i scene_3.mp4 -filter_complex ^
"[0:v][1:v]xfade=transition=fade:duration=0.8:offset=D1-0.8[v01]; ^
[v01][2:v]xfade=transition=fade:duration=0.8:offset=D1+D2-1.6[v]" ^
-map "[v]" -c:v libx264 -crf 20 -preset medium scenes.mp4
```

Final pass — mix narration (delayed to sit behind intro if wanted), optional BGM, burn subtitles:

```powershell
ffmpeg -y -i scenes.mp4 -i narration.wav -i bgm.mp3 -filter_complex ^
"[1:a]adelay=2000|2000[nar]; [2:a]volume=0.15[bg]; [nar][bg]amix=inputs=2:duration=first:dropout_transition=3[a]; ^
[0:v]subtitles=subtitles.srt:force_style='FontSize=22,PrimaryColour=&H00FFFFFF,OutlineColour=&H00000000,BorderStyle=1,Outline=2,Alignment=2',vignette=PI/5,format=yuv420p[v]" ^
-map "[v]" -map "[a]" -c:v libx264 -crf 20 -preset medium -c:a aac -b:a 192k -movflags +faststart final.mp4
```

- `subtitles=` needs the SRT as a real file path (escape `:` in Windows paths) — gyan full build has libass. Alternative: pre-render captions with Pillow and overlay (no libass dependency).
- Scene-still text: keep images **language-neutral**; captions live only in the subtitle track (so one image set serves any language).

### 8.3 Full scrolling waveform overlay (the "voice visualizer" done right)

```powershell
# 1. Render ENTIRE waveform as one image
ffmpeg -y -i narration.wav -filter_complex "aformat=channel_layouts=mono,showwavespic=s=3840x1080:colors=#4fc3f7" wave_full.png

# 2. Scroll it across the background for the video duration N
ffmpeg -y -i narration.wav -i bg.png -i wave_full.png -filter_complex ^
"[1:v]scale=1920:1080[bg]; ^
[bg][2:v]overlay=x='W-w*t/N':y=H-h:format=auto,format=yuv420p[v]" ^
-map "[v]" -map 0:a -c:v libx264 -crf 20 -c:a aac -movflags +faststart visualizer.mp4
```

- `showwavespic` renders the whole waveform in one frame → scrolling it via `overlay=x=W-w*t/N` gives the classic "voice visualizer" sweep. `showwaves` alone cannot do scrolling history.
- Color by energy: `showwaves` with `mode=cline` and `colors=#4fc3f7|#e91e63`; or `showspectrum=color=intensity:slide=1:scale=cbrt` for a spectrum analyzer look.

---

## 9. Full dependency checklist

```powershell
# 1. Python 3.11+ from python.org (check "Add to PATH")
python --version

# 2. Pipeline libs
pip install pypdf nltk kokoro soundfile faster-whisper pydub  # edge-tts optional
# (chatterbox instead of kokoro if cloning: pip install chatterbox-tts torchaudio)

# 3. ComfyUI + GGUF node (see §6.1) — models already present at D:\comfy\models

# 4. ffmpeg — ✅ already installed (gyan full build)
ffmpeg -version
```

---

## 10. Open questions / verification items for the executor

1. **GPU VRAM discrepancy:** driver says 4 GB; Quadro RTX 4000 is normally 8 GB. Run `nvidia-smi` first; if truly 4 GB, use 768×768 + T5 Q6_K GGUF, and consider CPU-only Kokoro (fine).
2. **Where is the actual ComfyUI install?** Only the models folder exists at D:\comfy. Locate the install (search for `main.py` / `custom_nodes` on disk) or install fresh; then wire `extra_model_paths.yaml` to D:\comfy\models.
3. **Input format of the book** (PDF/EPUB/MD/TXT) — parsing path differs (§3 handles PDF/EPUB via pypdf; MD/TXT is trivial).
4. **Voice preference** — default to Kokoro `af_heart` (female US) / `am_michael` (male US); if the user wants *their own* voice → Chatterbox clone path.
5. **BGM** — pipeline supports optional BGM bed (`amix`, volume 0.15); supply a track or skip.
6. **Output resolution** — examples use 1920×1080 (YouTube); 1080×1920 vertical for TikTok is a drop-in swap of W/H in every filter.

---

## 11. Reference projects (steal their patterns)

| Project | Pattern to steal |
|---|---|
| `wpggLabs/pdf2vid` | Mode 1 exactly: page image + Ken Burns + blurred backdrop + drop-shadow captions + **duration from real narration audio**; provider registry (edge-tts/Kokoro/Chatterbox) |
| `Frozen-tuna/Book2Movie` | Sentence classification (narration vs dialogue), Tome = N-seconds text+audio, LLM image prompts with style hints, character voice allocation, ComfyUI API image gen |
| Wheel of Heaven cinematic audiobook | `scenes.yaml` style bible + per-scene prompts, zoompan 4× supersample, xfade on exact audio boundaries, captions via Pillow, vignette+scrim |
| `Youhai020616/ai-video-pipeline` | FLUX per story, Ken Burns, hard-burned SRT, character consistency via tail-frame chaining |
| `jaebong-human/audiobook-gen` | Whisper word timestamps → subtitle timing |
| `jjjames38/cutengine` | Per-frame Ken Burns transforms, multi-track TTS+BGM mixing (volume/fade/crossfade/atempo) |
| `debpalash/VoiceStudio` | Full local TTS app (GUI + OpenAI-compatible API on :3900 + MCP server) |
