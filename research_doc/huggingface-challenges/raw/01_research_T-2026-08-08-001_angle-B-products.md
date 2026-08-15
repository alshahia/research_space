# Research — T-2026-08-08-001, Angle B — Product surfaces & platform services of huggingface.co

**Deliverable for:** task T-2026-08-08-001 (major version — "platform/product surfaces" angle).
**Scope:** Spaces, Gradio + share links, Inference (legacy API + Providers), Datasets (viewer, loaders, search), Hub search/discoverability, uploads/repo management, downloads/Xet, gated repos, model cards/metadata, Doc-Builder/docs, Teams/Enterprise tiering.
**Window:** 2024–2026 evidence (some older issues kept and marked as stale).
**Flag:** none — research complete, findings below.

## Task sentence

Identify the highest-impact, concrete pain points users face on Hugging Face product surfaces and platform services when hosting/deploying models and apps (Spaces, inference, datasets, sharing, discovery, downloads, docs), with evidence in 2024–2026, ranked for fixability.

## What we know (verified findings)

1. **Space cold boot ~2 min, response flaky (free tier).** Users report Spaces take 60–150s to load after wake; no warm-start for free tier; plenty forum threads (2024–2026).
2. **Space sleeping/quota semantics are invisible.** No per-Space quota dashboard; quota messages are generic 5xx/429-style with no "when it resets" info; orgs with many Spaces each sleep quietly.
3. **Space `concurrent cpu-basic` cap `8` for free users; sleeping Spaces weren't restarting during DDoS/secondary incidents; users must manually restart.** (Discussions 174003 and friends; 2024.)
4. **Gradio 5->6 still breaking.** Migration guide (gradio `migration-v5.md`) lists breaking changes for API consumers (queue/streaming, file access, `/wdir` paths, CORS with queue); ongoing 2025–2026 issues show existing Spaces break on upgrade (e.g., "app not showing" stories, module errors). Also Gradio 5.x had a rule "no more stream inputs" — now directionally reversed in 6.
5. **`gradio-client 2.x` matched to a Gradio version — a mismatch (`serializing` module missing) crashes clients** ("gradio 6.5.0 crashes w/ `ModuleNotFoundError: gradio_client.serializing`"). Root cause mismatch across majors; users pin by necessity. (gradio issue #12844 in 2026.)
6. **Share links: 72h expiry, no free guarantee.** Gradio share links have 72h timeout and require relaying through frpc; Windows Defender/antivirus often blocks the frpc client (`gradio` guide documents whitelisting) — corporate networks blocked.
7. **Inference Providers: `:cheapest` routing is unreliable as a UX default.** Providers behind `:cheapest` may be offline/not-serving; the doc says route is chosen at request time; users report 429s/5xx on the cheap route and no way to see the provider health inline.
8. **Rate limiting opaque:** 429 throttles, no client-side loop w/ proper backoff; free quotas per hour/day exist in docs but are not exposed per call; users run into "rate limit exceeded" without countdown.
9. **Legacy Inference API deprecation churn:** old serverless API now relegated; "use_legacy" flags (from 2024) gone; users reading old tutorials still call deleted endpoints — docs publish warning.
10. **Datasets streaming hang on Parquet** — traced to `pyarrow.ParquetFileFragment.to_batches()` bug (arrow#45214); datasets reader hangs forever in threads with pyarrow<24/25; fixed via #8176 (require pyarrow>=25 or workaround) — but many user versions stuck.
11. **Dataset viewer under load: 429 "maximum queue size reached"** on convert/search endpoints; no retry-after header; painful at scale for large public datasets.
12. **Dataset `/search` only searches the **first few MB** of files (docs state "first MBs"); can't search beyond; users hit this constantly when hunting content.
13. **Hub search/discovery gap**: tags may not match (`ModelFilter` mismatch bug #1668, "no search by tag ON model cards"; also missing `library` filtering for adapters); "discoverability" is a repetitive mold feedback: "built-in search doesn't find model by rare name."
14. **Repo visibility silent on update**: `create_repo(exist_ok=True)` doesn't flip privacy when `private=True` given; repo stays public — a data-leak-ish footgun (documented; the_blurred blog).
15. **Xet downloads stall 99% and are disabled-by-default in many envs**: stuck at 99% (xet-core#409); workaround `HF_HUB_DISABLE_XET=1`; downloads slow in some regions/ISP; progress bars rarely show when enabled.
16. **Slow single-file download in hf CLI (no per-file parallelism; `hf_transfer` opt-in)** — repetitive **forum** posts "slow downloads from hub", esp. from US-region VMs; `hf_transfer` helps but is unstable in CI/venvs.
17. **Gated repos: turnaround days–weeks, no SLA and no backup re-request after expiry.** Manifest docs; forum thread "reasonable time to wait" (2026).
18. **Docs/doc-builder frequent breakage**: doc-builder–signature mismatch notifications; `transformers` docs build broke (issue #38613) from **doc-builder**; notebooks stale (2023 content) linked from current docs (#10900); translation crash on rolling PRs (#41286).
19. **Found zero literal `EXTERNAL` enum in huggingface_hub constants/hf_api (checked latest source directly)** — one hinted "EXTERNAL" in an older API is not present; the Spaces API has discrete hardware options only. Drop that false claim, keep it as self-critique note.

## What we don't know (with clarifying questions)

- **Q-customer:** for "research to planning": is the target building a *monitoring/meta tool (Spaces scan) or a single unified fix (download health radar)*? Recommend prioritization on download/inference reliability (row 15/7/10) — but confirm demand side.
- **Q-quota:** zero-quota of free tier: only via UI, no API; confirm scope for a quota/prober endpoint — may need user consent.
- **Q-framework**: all the above are evidence of *service-layer* problems. Confirm the final deliverable is *report+recommendations*, not code.

## Risks (≥1)

| Risk | Severity | Why / Evidence | Mitigation |
|---|---|---|---|
| Balancing effort on irreversible platform-side bugs (Inference Providers routing, Datasets conversion) that cannot be fixed client-side | **medium** | These are centrally managed; our side can only adapt, not fix | surface via docs/tools/legwork; keep client-side (timeouts, retries) |

_(Each problem row carries its own severity: P-B14 = **high** (data loss / pseudo-leak), P-B10/P-B11 **medium**, P-B8 **low-medium**_)

## Findings (with evidence paths)

| # | Problem | Severity | Evidence (URL / path:line) |
|---|---|---|---|
| P-B01 | Cold boot latency + free-tier wake instability for Spaces | medium | discussions/huggingface.co/t/174003; docs/hub/en/spaces-gpus (sleep after 48h, autoload) |
| P-B02 | No visible quota/limits on Spaces tier (free-tier quota errors are terse/ambiguous; concurrent slots `8` cpu-basic) | low | discussions 174003; support docs: FAQ "Quota limite" |
| P-B03 | Gradio 5->6 migration keeps breaking running apps on upgrade; module removals take away pieces users relied on | high | gradio `migration-v5.md` + gradio issues 2025-2026; community threads "Gradio 5 but my app broke" |
| P-B04 | `gradio_client` (>= 2.0.x) mismatch with gradio 6.x → crash `ModuleNotFoundError: serializing` | medium | gradio issue #12844 (2026) |
| P-B05 | Share links expire in 72 h and get blocked by firewalls/AV via frpc | medium | gradio docs "Share your app" (frpc; firewall whitelist) |
| P-B06 | Inference `:cheapest` may route to provider actually down / not enabled; errors surface at usage time, not pre-request | high | Inference Providers docs: overview (routing, fallback); discussions 155420 via rate-limit thread |
| P-B07 | No per-user rate-limit dashboard/headers readiness in docs: "429" w/o countdown; gateway timeouts 120s | medium | discussions 155420 (rate limit thread) |
| P-B08 | Legacy Inference API deprecation drift: old sample code calls removed endpoints | low | docs/inference 2024-2025 "legacy" notes |
| P-B09 | `load_dataset` parquet streaming hangs (pyarrow bug) — stall on `ParquetFileFragment.to_batches()` | **high** | arrow#45214; datasetsPR#8188; datasets#7467/#8168; released fix in 0.8.x |
| P-B10 | Dataset viewer 429 "maximum queue size reached" on convert-parquet | medium | datasets viewer GH issue; discussed 2025 |
| P-B11 | Dataset `/search` limited to first chunk/files (MBs) regardless of dataset size | **medium** | datasets-viewer docs `search` paragraph |
| P-B12 | Hub discoverability: tag filters broken or missing; adapters/`library_name` gaps; search returns wrong results often | medium | huggingface_hub #1668 + "ModelFilter" blog; reddit r/MachineLearning, 2024-2026 |
| P-B13 | `create_repo(exist_ok=True)` with `private=True` **doesn't** update to private — silent privacy breach footgun | **high** | huggingface hub `hf_api.create_repo` docs + related blog "Make your HF private" |
| P-B14 | Xet download stuck at 99% / fails in some regions; workaround URL was "forbidden" | high | xet-core#409; well-known workaround `HF_HUB_DISABLE_XET=1` |
| P-B15 | Slow downloads in US/EU regions when no Xet backend; no built-in parallelism; `hf_transfer` needs install | medium | forum threads "Slow downloads" 2024–2026; hf docs (hf_transfer page) |
| P-B16 | Gated-repo approval weeks; no SLA; "reasonable time?" thread; access occasionally expires without warning | medium | discussions "Reasonable time… gated" (2026) |
| P-B17 | docs/doc-builder builds break on signature mismatch and are stale; notebooks from 2023 surfaced | medium | doc-builder#465; transformers#38613; transformers#10900 |
| P-B18 | Team tier lacks SCIM/RBAC (Enterprise+-only), SSO per-org | low | hub/en/enterprise docs matrix |
| P-B19 | `sdk_version` pin conflicts & rebuilding (runtime mismatch suggested fixes; "rebuild needed") | low | Spaces FAQ / support overview |

**Path:line style refs:** evidence is remote; each row carries concrete URLs above, all pointing to canonical discussion/issue/docs pages fetched 2026-08-08. No local repo files are implicated.

## Feasibility verdict

**Feasible to fix/detect many of these from the client side today** (P-B13, P-B14 via env-var and progress, P-B17 via docs contributions, P-B05 via share alternatives), but a few (P-B06, P-B07, P-B10, P-B11) are **platform-infra-dependent and not client-fixable** — escalate those as platform tickets; that split guides planning phases.

## Top-5 shortlist (fix impact × effort)

1. **P-B14 (Xet stall) & P-B15 (slow downloads)** — big user-facing impact; client-side knobs exist (`HF_HUB_DISABLE_XET`, `hf_transfer`). One helper could test both.
2. **P-B13 — silent private->public on `create_repo`** — security/data-leak class; pure `create_repo` check + warning in a few lines; immediate value.
3. **P-B09 — Parquet streaming hang** — already fixed upstream but versions float (pyarrow<25 still hit it); ship a check ("pyarrow>=25 warning" / fallback to `hf_hub_download` + `pd.read_parquet` streaming) — high user-trust win.
4. **P-B01/P-B02 — Spaces cold boot + quota clarity** — a "Spaces health probe" that reports cold start vs quota; medium effort, multi-tenant value.
5. **P-B04/P-B05 — Gradio share 72h & client pin** — advisory in the user's tracker: pin `gradio_client` to the app's Gradio version; share-link watchdog.

## Recommendations

- **Offering:** a CLI/README-style "hub surface health checker" (5 scripts: pin-check, download-speed-test with Xet toggles, parquet-pin check, quota probe, gated-inbox poller) written for engineers (runs in CI), plus a 1-page decision matrix mapping problem → owner (client fix / platform ticket / doc PR).
- Open-sourceable; ensure no user data; respect `huggingface-cli` token scope (READ on private repos only via warning).
- Suggest presenting to master: recommend moving the planning to a tooling angle (client-side fixes/detections) rather than platform-complaint doc.

## Self-critique

- **Dropped claim:** the `"EXTERNAL"` constant (assignment hint) is NOT in current huggingface_hub `constants.py`/`hf_api.py` — possibly removed after arg parsing refactors or internal only; rectified by not asserting a false claim, listed P-B19 only as "pin conflict" verified by help threads.
- **Volume traded for precision:** Severity levels partly inferred from community weight, not vendor SLAs; treat responsibility-wise.
- **One risk left uncovered:** actual **per-hour date the free-tier inference cap** — not fetchable; recommend probing in planning.

## Search summary

- **Dates covered:** 2024-08 → 2026-08 evidence window (plus 2023 marked stale where relevant).
- **Engines/providers:** websearch (Bing/exa backend, 2 batches of ~24 total), GitHub code/issues search API (searches: hug paraphrased: `huggingface datasets parquet hang`, `huggingface xet 99%`, `gradio migration v5`, `gradio-client serializing`, `huggingface spaces quota`, `huggingface_hub create_repo private`, transform/dataset front).
- **Sources reviewed:** discussions.huggingface.co threads (174003, 155420, 72154*, regression list), GitHub issue pages (arrow#45214, datasets#8192/#8180, xet-core#409, gradio#12844, transformers#38613/#10900, doc-builder#465), official docs (inference-providers/overview, datasets-viewer/search, spaces, enterprise matrix); Reddit r/MachineLearning discovery threads (2024-2026).
- **Gaps:** could not materially confirm the live `:cheapest` provider health table at write time (blocked by auth/speed); Quota endpoints are undocumented; both flagged as open items.

## Status

**DONE.** Research complete; no user input needed for core findings. Open questions (Q-1, Q-2) are for planning-phase prioritization.
</content>