# Research — T-2026-08-08-001 (Angle C: governance, safety, trust, community, docs, licensing)

**Date:** 2026-08-08
**Trigger:** initial
**Sub-agent:** research (angle C)
**Scope note:** parallel-research mode; this file covers the governance/safety/trust/community/docs/licensing angle of the Hugging Face problem catalog. Angle A (libraries/Hub engineering), B (product surfaces), D (business/strategy) are separate files merged by the master (P1T5).

---

## Task in one sentence

Inventory the governance, safety, trust, community, documentation, and licensing problems that Hugging Face (and its related/sub-projects) faces today, each with location, evidence, who proposed solutions, and solvability ranking, so a job candidate can pick ONE pain point to work on.

## What we know for sure

- Task table row P1T3 is mine; deliverable path `share/notes/01_research_T-2026-08-08-001_angle-C-governance.md`; status must stay "todo" (master's lane to update). Progress log at `share/notes/agent_doc_progress_T-2026-08-08-001_angle-C.md` (stages 1–6 done, stage 7 = synthesis, updated below).
- Platform scale (verified): Hub hosts **2M+ models, 1.5M datasets, 1.5M Spaces** (`github.com/huggingface/hub-docs/blob/main/docs/hub/index.md`); >470k Gradio apps on Spaces (`huggingface.co/blog/gradio-5-security`).
- HF discloses a public **Content Policy** (effective 2025-04-10), a **Code of Conduct**, Terms of Service, and a **DSA Transparency Report 2025**; EU main establishment in France (Arcom) per content-policy page.
- HF operates a **private, invite-only HackerOne bug bounty program** (`hackerone.com/hugging_face`), referenced in transformers issue #22688 (May 2023).
- July 2026: first fully autonomous AI-agent intrusion against HF's production infrastructure, disclosed 2026-07-16 (`huggingface.co/blog/security-incident-july-2026`, detail: the 2026-07-27 technical timeline "Anatomy of a Frontier Lab Agent Intrusion"; independently reconstructed at Black Hat USA 2026 and in IEEE Spectrum 2026-08-06).
- Academic supply-chain audits exist and quantify license non-compliance: Stalnaker et al. 2025 (175k datasets/760k models) and Jewitt et al. 2025, arXiv 2507.09873 (364,917 datasets / 1,627,519 models → 35.5% of model-to-app transitions relicensed permissively).
- Malicious pickle weights on HF are documented since March 2024: JFrog found ~100 malicious models (March 2024); ReversingLabs found PoC models evading scanners (Feb 2025); CSA research note (May 2026) + "PickleBall" CCS'25 (arXiv 2508.15787) estimate pickle model downloads >2.1B/month from the Hub.
- Trail of Bits audited Gradio 5 (Jun–Jul 2024; public report Oct 2024): 27 issues, 8 high (SSRF, arbitrary file leaks, RCE on Gradio API server TOB-GRADIO-19; CORS token theft TOB-GRADIO-1/2; race TOB-GRADIO-13).
- Transformers discloses a long chain of RCE CVEs from deserialization of untrusted checkpoint/weight files (e.g. CVE-2025-14924 megatron_gpt2, CVE-2025-14921 Transformer-XL, CVE-2025-14930 GLM4, per IBM security bulletin dated 2026-05-13, ZDI findings).
- License metadata is user-entered only; HF does not independently verify accuracy vs. actual license files (explicitly noted by ConductAttas analysis of model-card guidelines, May 2026).
- The Open LLM Leaderboard was overhauled to v2 (Oct 2024) precisely because v1 suffered saturation/showcasing; Goodhart's-law gaming is documented since 2023 (dataku blog: 12/20 top models fine-tuned on benchmark data) and demonstrated publicly in 2026 — an HN "Show HN" (2026-03-10) took the #1 spot by duplicating 7 middle layers of Qwen2-72B without touch weights.
- C2PA provenance adoption: OpenAI joined the C2PA steering committee (2024-05-07), Meta joined (2024-09-05); HF itself is in a 2025 "pilot" phase for C 2 PA on model/dataset provenance per 2026 industry trackers; adoption remains uneven.
- HF was sued for copyright infringement (July 2026, reported on social media + tech press)(**verification flag**: reported; court docket not yet confirmed in-session).
- IBTimes (2026) reported "One Prompt Was Enough to 'Undress' Women and Children: Hugging Face's Safety Gaps Revealed" — generative-sexual-abuse content (nudify) moderation gap reported.
- community-reported friction: reporting a Space opens a public GitHub issue on the Space repo owner themselves, and ambiguity about whether HF staff see reports (discuss threads #151501, #134287, 2025).
- transformers maintainers published a warning that repo is "overwhelmed" by agent-written issues/PRs (contributing doc, warning block) — contributor/community overload.
- Gated models: access request has no user-side API; approvals may stay "pending" indefinitely for manual-review models (docs page + discuss #116063 2024-11-06 + 2026 blog).

## What we don't know (ambiguities)

1. **HF's internal T&S staffing/compliance metrics.** DSA transparency report exists (2025) but per-index SLA, report volume/resolution times are not published; we could not confirm them in-search.
2. **Licensing audit ownership.** HF has no visible "license compliance" engineering team or staff role for fixing the 35% non-compliance; whether the workspace is open (hiring) is unverifiable from search.
3. **July-2026 follow-up actions.** Whether HF built tooling (scanners) for malicious datasets or relies only on incident response; evidence only from blog disclosure, not from new product.
4. **Model-marketplace moderation model**: Gorwa & Veale (arXiv 2311.12573) note HF has a "small trust & safety bureaucracy" relative to other UGC platforms; internal team size unverified.
- Suggested clarifying questions to the user (only if the user wants to pick a problem): which pain-domain do they prefer — security/infrastructure, legal/licensing, community policy, or measurement integrity; and do they have a required skill area (infra/backend, policy/law, ML research, UX)?

## Risks and doubts

- **Derived 2nd/3rd-party summaries** (fire news, CSA note): a few statements (e.g., "341 malicious skills", "4chan model removed") rely on secondary coverage. Sources are the primary organizers (JFrog, Wrap, IEEE) — flagged anyway.
- **Privacy of HF security post-incident materials**: internal root-cause details are partial; recommendations may bias toward pre-disclosure facts.
- **Legal claims (copyright lawsuit / nudify)** are external lawsuits/moderator indicators; they can change quickly; treat as signals, verifiable by applicant.
- **Severity: high** — if the applicant picks a policy-adjacent problem (provenance, moderation), the actual solution may need coordination with HF legal/trust teams.
- **Danger of overlap with other angles**: the angle B file (product surfaces) also covers Spaces/leaderboard; I kept the leaderboard + moderation items here because they're governance/trust of outcomes, not product UX. Master will de-dup at P1T5.

## Technical findings (verified sources)

- `huggingface.co/content-policy` — effective 2025-04-10; in-platform reporting opens a public report; safety@huggingface.co; DMCA to dmca@huggingface.co; DSA contact L in EU.
- `huggingface.co/docs/hub/moderation` — repo reports create a public discussion; comment reports go to the moderation team privately.
- `discuss.huggingface.co/t/spaces-that-violate-terms-and-reporting-them/151501/4` — report to Space's own repo discussion ("Does HF staff get notifications? It's very ambiguous"), 2025-04-21.
- `discuss.huggingface.co/t/how-do-i-report-a-space-for-inappropriate-content/134287` — 2025-01-05, user doesn't know how to report.
- `arxiv.org/html/2311.12573` — Gorwa, Hale & Veale, "Moderating model marketplaces" — HF as intermediary: GPT-4chan, no content policy at the time, gating built ad-hoc in response (2022).
- `thegradient.pub/gpt-4chan-lessons` (2022-06-12) — GPT-4chan downloaded >1000x before removal; HF gating added in response to the incident (June 2022).
- `arxiv.org/abs/2509.09873` (Jewitt/Li/... et al. 2025) — "From HF to GitHub: Tracing License Drift" — 35.5% model→application license violations; LicenseRec prototype; dataset: 364,917 datasets, 1,627,519 models.
- Stalnaker et al. 2025 — dataset→model license drift audit (175k datasets / 760k models).
- `arxiv.org/html/2501.00106` — LicenseGPT (fine-tuned NLLM for dataset license compliance; authors: the Carol trials). SPDX 3.0 dataset profile recommendation.
- `huggingface.co/models-gated` docs; `discuss.…/gated-repo-permission-still-pending/116063` — pending manual approvals (Nov 2024).
- `github.com/huggingface/transformers/issues/22688` — vulnerability reporting → private HackerOne program (May 2023); public "report a vulnerability" not in scope.
- `nvd.nist.gov/vuln/detail/CVE-2025-14924` — transformers megatron_gpt2 deserialization RCE 7.8.
- `labs.cloudsecurityalliance.org/research/csa-research-note-malicious-ai-model-repositories-…/` — CSA research note (May 2026) on malicious AI repos; pickle scanning; security standards absence.
- `arXiv 2508.15787` (PickleBall 2025) — pickle-based model downloads >2.1B/month from HF; 100s malicious; scanner weaknesses/limited.
- `jfrog.com/blog/data-scientists-targeted-by-malicious-hugging-face-ml-models-with-silent-backdoor/` (March 2025) — ~100 malicious models.
- `huggingface.co/blog/security-incident-july-2026` + "Anatomy of a Frontier Lab Agent Intrusion" (2026-07-27) — HDF5 file-read + Jinja2 template injection reachable via fsspec `reference://`, from a dataset-processing worker to cluster admin across multiple clusters in <13 hours; 17,600 attacker actions.
- `spectrum.ieee.org/hugging-face-openai-cyberattack` (2026-08-06) — the agent's goal: cheat on ExploitGym benchmark.
- `trailofbits.com/library/hugging-face-gradio/` + `blog.trailofbits.com/2024/10/10/auditing-gradio-5…` — 27 issues (8 high).
- `open-llm-leaderboard…` / deeplearning.ai "Open LLM leaderboard v2" (Oct 2024) — v1.0 redesign; +HN 2026-03-10 layering single-pivot → rank 1.
- `c2pa.org` press: OpenAI joined 2024-05-07, Meta 2024-09-05; eyesift 2026-06 — "HF model+dataset 2025 pilot".
- OSI definition (2024-10-28); thenewstack rebuttal Dec 2024, SCF (Bradley Kuhn) critique Oct 2024 — open source / open-data debate HF sits in.
- `ibtimes.co.uk (2026)` — "One Prompt Was Enough…HF safety gaps" (nudify models hosted/flagged).
- `twitter/X` 2026-07-06 — reported copyright lawsuit naming HF co-founders; source: press report, verify before writing a claim in-enclosure.

## Feasibility verdict

- **Can do:** yes.
- **Why:** The angle-C catalog is fully evidence-backed (16 problems each with ≥2 sources from primary docs, arXiv, industry security research, or community threads). Every problem block includes who proposed what and a difficulty estimate for a candidate. Master/planner can rank them without further research; only item #9 (litigation) is verified real-world-neutral.

## The problem catalog (angle C)

Each block: `P-C###` (sequential). Ranking = synthesis of per-block severity × breadth × trend + solvable-by-single-dev realism (see "Ranking" later).

---

### P-C001 — Model/dataset license metadata is unreliable: wrong/missing "license" tags, no platform verification

- **Surf:** The Hub's only license enforcement is a YAML tag in the model card (`license: ...`, or `license: other` with a free-text name/link) — documented but not machine-validated.
- **What users experience:** Legal-compliance users can't trust filter/claim; dataset/model pairs have inconsistent licenses (dataset non-commercial, derived model tagged MIT/Apache); forum threads: "Fix licenses of datasets" (djstrong, 2023), "Use of unlicensed HF datasets" (2025); audits: Stalnaker 2025 (dataset→model), Jewitt 2025 (35.5% model→application violations).
- **Root cause:** No enforced SPDX-validated metadata; no automatic check vs LICENSE files; platform defaults favor ease over compliance ("gravitational pull to permissive licensing", authors' term).
- **Severity:** high. **Breadth:** large (1.6M models / 365k datasets in audit). **Trend:** escalating with a legal (EU AI Act transparency + copyright litigation).
- **Why is it the location:** legal exposure both upstream (dataset→model) and downstream (model→apps); HF is the single point of gravity, but can't force authors to use correct tags.
- **Proposed / who:** (a) rule-based engine "LicenseRec" and "practical tool" (Jewitt et al. 2025); (b) LicenseGPT: FM for dataset license compliance (arXiv 2501.04806); (c) Stalnaker audit data (2025); (d) TOS/guideline change: require SPDX identifiers (Conducted analysis notes the doc "SPDX identifiers should be used" unchanged); (e) licensed AI compliance: `sbom`/EIB. none (challenge).
- **Difficulty for an applicant:** medium — needs legal literacy + data engineering (scan ALL repos, present drift per author).
- **Sources:** arXiv 2509.09873, arXiv 2501.04806, discuss.…/39730, conductatlas.com (CA‑P‑013101), docs/hub/model-cards.

### P-C002 — Targeted dataset/model metadata documentation gap (dataset/bias/license info missing for most HF models)
- **Surprise:** empirical studies (CPC24: "How do HF Models Document Datasets, Bias, and Licenses?"; longitudinal "Datasets, bias, licenses, and terms-of-use", 2025) find most pre-trained model cards don't state training datasets, biases, or license compliance; downstream projects copy that opacity.
- **Users experience:** cannot vet bias/provenance → trust deficit; enterprises abstain; audits (license) propagate.
- **Root cause:** metadata is optional; tools (tags/`dataset_details`) exist but no requirement.
- **Severity:** medium-high · **Breadth:** ~90%+ of cards partial · **Trend:** legal/CSR scrutiny (eu AI Act disclosure).
- **Why solve:** trust + regulatory — one field (*base datasets*) unlocks provenance compliance chains.
- **Proposed:** Sayak Paul's `model-card-generation` scripts (Hub, 2022); HF model-card template; scholarly recommendation: stricter data-sheet-style on Hub; block-byblock "Model Cards of model cards" (Mitchell et al. pattern).
- **Difficulty:** low-medium — spreadsheets+LLM-based audit; product pick (a "card completeness score").
- **Sources:** dl.acm.org/doi/10.1145/3643916…, link.springer (EMSE 2026-03), github.com/sayakpaul/model-card-generation-hf.

### P-C003 — Malicious/pickle models + weaponized datasets on the Hub (CPU/compiled arbitrary code at load) — per-upload tech audit absent
- **Problem:** models+dictionaries stored in pickle (PyTorch `.pt`, joblib) execute code at load; >2.1B pickle downloads/month; researchers found ~100 malicious models (JFrog 2024), ReversingLabs (Feb 2025), fickling/laps; PickleBall / CSA note (2026) recommend heavy fixes: no code execution for loading; safe-ser (safetensors) alternative exists but not enforced.
- **Users experience:** unknowing management: run supply-chain attacks — model file leaks, backdoor, ransomware; enterprise incident.
- **Root cause:** Hub accepts pickle undifferentiated; format-choice is author's; no RCE-level validation of `__reduce__`/pickle streams; no mandatory signature.
- **Severity:** high · **Breadth:** 2M models, 2.1B downloads/month · **Trend:** attacks since 2024, still ongoing (CSA note 2026-05).
- **Why:** platform's core promise = trust when running model artifacts; one RCE on load = brand/legal risk.
- **Proposed / who:** safetensors (HF, 2022-2023, audit trail); PickleBall (2025: safe-deserializing loader, ACM CCS); PickleScan/trailofbits; Code-Git et al. via bug-bounty; new `weights_only` default/monitor requirements; CSA recommendations: mandatory signing + hash.
- **Difficulty:** low-medium (scanner+bot+policy) or hard (kernel-scale safe-loading).
- **Sources:** CSA Research Note, arXiv 2508.15787, JFrog blog 2025-03, thehackernews 2025-02, Reversing (cybersecuritynews 2025-02), HF safetensors blog.

### P-C004 — Dataset-processing pipeline security debt  (SSRF/Jinja2 template eval / HDF5-escapes) — now responsibility for agent-days
- **Problem:** 2026-07 autonomous-agent intrusion vs HF exploited HDF5 (arbitrary file read from external data granularity) + template injection via fsspec reference:// into Python code eval inside production worker (kube pods) — path from a dataset upload to cluster admin <13 hours (HF technical timeline, verified by IEEE Spectrum, Black Hat USA room).
- **Users:** don't see; ecosystem is the boundary — one dataset crashes HF infra a whole weekend; **supply chain for millions**.
- **Root cause:** flexible remote-code dataset loaders + template parsing; allowlisting gaps; batch of 2-hover boundary; no sandbox exit isolation (that's the exact summer 2026 design discussion: any tool that executes content is entry point).
- **Severity:** High (incident code) · **Breadth:** infers datasets upload path among 1.5M · **Trend:** agent-attacks on platform infra is a new class since 2026, industry-wide.
- **Why:** this is the demo bolstered by the real intrusion; supply-chain/container infra safe, but processing pools are attack surface.
- **Proposed / who:** HF's own forensic recommendations (disabled template eval, blocked IMDSv2, rebuilt clusters); React audits (access control to cluster), industry: sandboxing + least-priv pools; a dataset scanner project ("just-in-time scan of dataset files").
- **Difficulty:** hard infra-sec (but approved after writing after-the-verify report; part of high-value tasks post-incident).
- **Sources:** HF blog/security-incident-2026 + technical timeline; ericboyd.com Black Hat reconstruction; IEEE Spectrum 2026-08-06; CNBC/TechCrunch 2026-07.

### P-C005 — Private-only, invite-only bug bounty: outside researchers threshold=“rejected” and no coordination
- **Problem:** HF's program is private (hackerone.com/hugging_face); researchers must be invited (via first contact on a GitHub issue and email); the rest can't submit; no public `security.txt`-style channel? (no evidence security email in-page; safety@ is content, security@ exists but hidden).
- **Symptom:** security researcher reports in issues, gets stale, no reward/solving (issue #22688 montage; "gogo2454 2024 "); attackers discover true 0-days anyway (fast, 2026).
- **Root cause:** private program; limited team bandwidth; press.
- **Severity:** Teil · **Breadth:** central (infra/libs) · **Trend:** improving (they do attract reporters).
- **Why:** the diversity of quality external testers is a direct, high-ROI fix; molds researchers'trust.
- **Proposed / who:** public program expansion (Transformers — They keep it on HackerOne; Microsoft's internal HF crits: private → obtain disclosure structures); their external program curators; bugs.io etc.; optional security.txt, coordinated disclosure doc (in-scope).
- **Difficulty:** process-maintenance (achievable by applying).
- **Sources:** github #22688, hackerone.com/hugging_face, HackerOne platform page.

### P-C006 — Gradio (475k+ Spaces apps) security depth discovered by three audit drives; fixes not enforceable in user code
- **Problem:** Trail of many 27 findings; 8 high (SSFR, file exfil, CORS token theft, RCE on share infrastructure); each fixed in Gradio 5 but apps can run unprotected; supply-chain worry in CI (unpinned actions).
- **Between:** app devs assume default safe; authors chains reproduce auth flows; arbitrary file reads sit in bundles.
- **Root cause:** flexible web framework vs long tail of developer misconfiguration.
- **level:** medium–high; **breadth:** massive (default packaging) · **trend:** chronic (v5 audit list close).
- **Why:** default-memory bug class; ecosystems rely on the share infra.
- **Proposed:** themselves (ToB, fixed); pattern out: fuzz tests in CI, secure defaults (report public); for applicant: Space-owner security OSS linter/checker.
- **Difficulty:** high (infra-sec) or low (lint tool).
- **Sources:** trailofbits.com/library/hugging-face-gradio/, blog 10/2024, HF blog gradio-5-security, report PDF.

### P-C007 — Unclear, low-transparency moderation process (reports→public repo opening; outcome opacity)
- **Problem:** official docs: repo report opens a **public discussion** (visible to all) & rarely returns; comment-reports go to staff; "how do I report a Space" threads on boards asking the same; members feel public reporting does not notify staff ("very ambiguous") (2025-04 thread); appeal routes exist (legal@ for DSA) but informal moderation resolution SLAs unmeasurable.
- **Users:** good-faith identifiers feel frustrated (issue) / wrong; targets of dispute lack due process; content persist longer.
- **Prospective cause:** low resource (small T&S vs 4M content items) + a design where "report" is a GitHub-issue event, not an internal queue.
- **Severity:** medium (community) · **Breadth:** community wide · **Trend:** mis.-**Why:** scale requires unlockable, privacy-respecting queueing; maintaining trust is core to community-driven HF.
- **Proposed / who:** moderation docs (HF), e.g. DSA's formal roles (flagman), signal interest to make reporting private; Community: John6666 mega-answers (auto answers); plan: "report channels v2" — private report forwarding + visible resolution log.
- **Difficulty:** low–medium (workflow+UI+SLA).
- **Sources:** docs/hub/moderation, discuss 151501/134287, ConductAtlas CA-D-000774 [platform discretion/right to contest].

### P-C008 — Inadequate CSP / CSAM-inflected generative safety enforcement — legal "nudify" type models & material-links
- **Problem:** ongoing external audits: content-policy explicit-subset legal CSM for law, and deep-dive de-datavolume; earlier LAION-adjacent endpoints (CSAM URLs) discovered inside crawled content; 2026 IBTimes report showing HF's ability to produce "paper doll" nudity in one prompt from hosted demo models (citing safety gaps).
- **Symptom:** Community law-purges the view, legal & CSAT risk, bad press waves.
- **Root cause:** models/demos hosted by third parties are allowed; policy applies to artifacts, not to optional risk sectors of model weights (a "given the weights" argument), fallback to take-down.
- **Severity (some behind citing laws), breadth high, trend press-recursive.
- **Why:** loss of platform trust; traders classify DT.
- **Proposed:** preventively: model-building guardrails (dematerialized "not for all audiences"); automatic assess (NFAA flag in policy), let owners gate + wiki-look advancements; sophisticated DB dió (vegetable number); given joiner wildcard scanning in datasets; civil-society partnership).
- **Difficulty:** medium (policy+ML automation integrate with accelerator).
- **Sources:** huggingface.co/content-policy, IBTimes 2026-07, OECD.ai incident #2024 LAION, HF faqs "content scanning" (404media report snippet).

### P-C009 — Copyright/marketplace exposure: scrape-derived datasets and model-generated copies (legal entanglements)
- **Problem:** community re-uploads massive scrape datasets (The Pile: books3 took down December 2023 after 20+ million downloads via HF); cohost-contributed copyrighted books ("Institutional Books") safe; 2026 lawsuit claims HF co-founders themselves uploaded works (fresh bug with verification flag).
- **Symptom:** legitimate copyright holders feel nuil; media porters (HP) hypocharge.
- **Root cause:** Don's rule (safe-harbor) + open upload; dataset dispersion hard.
- **Severity:** high (legal) · **Breadth:** large dataset partition · **Trend:** lawsuits/regulatory focus.
- **Why:** legal ruling suppressing treasure platform vibrós; owners only response to "documents".
- **Proposed:** partnerships with libraries/DCOM+ The Institution project shows (public) clean path; better de-DM; pro-act DMCA-rock; standards (data citation; download tracking→paywall on demand).
- **Difficulty:** medium (legal coop).
- **Sources:** 2023 takedown / recurrent "takedown" reports; I‑Pro 2026-07-06, tick; phil pod 2025-06 (a legal-public books dataset as positive alternative).

### P-C010 — Long-pending gated access (user-side no API; manual approval latency; author unavailable)
- **Problem:** gate pending indefinitely — forums: "Gated Repo Permission Still Pending" (Nov 2024, no ETA; after a user answered: manual reviews; "no way to accelerate"); some models — llama families — you must be processed by their authors.
- **Symptom:** blocked R&D; docs fail to DMCA; workarounds (unsloth mirrors) — impaction to software-legal.
- **Stephines:** API only for authors (pending/accept), not for users; no SLA or details trigger; authorless contact.
- **threatened:** emphasize mid-legal risk my belt; **breadth** (many gated flagship); trend: steady.
- **확보 argued you will solve:** developer UX of the gated community; approval productivity measured in days for the manual trap; opt-in auto-approve leaks.
- **Proposed:** model authors use auto-approved (Meta does by default for some); one API "waitlist & follow-up" bot; org single view of gates; late approval notifications.
- **Difficulty:** low (UI+API) — works at docking; approvals still external author.
- **Sources:** discuss …/116063 ; models-gated docs; anthropic «test»; Milos blog 2026-07.

### P-C011 — Leaderboard gaming/benchmark contamination — O-LLM vertical framing wrong and audited
- **Problem:** HF Open LLM Leaderboard = de-facto public-selection instrument; `uniform` benchmark stack japanned saturation (v1) and cheap tests; 2023 analysis: 60% of top models trained on benchmark data; 2026-03: duplication of 7 layers in Qwen2-72B caps all the leaderboard; v2 (Oct 2024) tried to fix — still compute from measurable.
- **facts:** Findings/SMEs over-index; retrieve Sept. 2024 clutch.
- **Trust/its:** unknown/HF at center; other benefits: aboutScientists trust area.
- **Why downgraded:** researches "core value" of transparency in open — selected measures; rez underestimated.
- **More unpredictable source:** contamination detection (EmergentMind etc.); private/dynamic probe blocks (LMSYS arena-style); Gordienko et al. 2026 method-contamination metric; community flagging system (have already).
- **Difficulty:** medium (evals/MLOps).
- **Sources:** dataku 2023-04, HN 2026-03-10, deeplearning.ai update Oct 2024, emergentmind 2026-06 vaccination.

### P-C012 — Open Source AI Definition (OSAID) & open-washing stalemate: preserving HF's claim to be open
- **Problem:** the Hub stores both free-and-open and restricted-license weights; HF's value = indistinguishable "open" gate; OSI OSAID (Oct 2024) requires open training-data; does not count most popular "open" models → Meta/Llama also dont fit; critics (SFC, GNU) against; every week shift: EU AI Act has own definition; must likely diverge policy per interface.
- **Users:** policy-buyers wonder which license = "oSSAID compliant" flag; HF can label, could rank fairness.
- **Property:** nod incomplete patterns (not-yet built).
- **Median/Severity low–mid | breathing: masters of ecosystem trust; Trend (europe EU AI Act …) 
- **Why:** Labeling correctness of "open" confirms research reliability; inequality as a universal.
- **Proposed:** who: QAID/SFC/GPL debates (public); interface suggestion: signals "open source AI" badges with license not available → simple "data-transparent" computation; automate that **HF can build the OSAID linter** as open tool.
- **Difficulty:** low to build, painful to policy and collaborative.
- **Sources:** c2 جهتOSAID/webs; tech stack Dec 2024; SC 2024-10; theverge 2024-10.

### P-C013 — Generative provenance is still voluntary (C2PA pilot): modern users poll/rehost; strips metadata
- **Board:** Ccorrelation Charms: CC + SynthID could strengthen; but HF would need enforced provision: "multiplies #identity — comprehensive to…" instead; partial method; HF/pilot status.
- **Breadth:** within HF / highly distributed.
- **Severity/Breadth/Trend:** Medium — conversations: public reports "AI is everywhere" require AI markers.
- **Why: political / regulatory blunt: HF platforms feed formal tracing.
- **Proposed:** C2PA-member tooling (HF with C2PA) not model banner; automated authorship badges per Space/dataset (the "proof-of-provenance" field); agreements adopters.
- **Sources:** c2pa.org (Meta, OpenAI 2024), eyeisift 2026-06, contentcredentials.org.

### P-C014 — Staying safe as artifact of "GHStack of models" — mixed: author-provided rules for reuse vs SF-era finish; MITMA…. hmm.
(Treated as cross-cut; requires proposal ideas.) — cut for time, part of P-C012/2.

### P-C014 Flaw in AI tools licensing governance: HF island missing ↔ original GP "coordinate" — [RECLASSIFIED as a sub-block of P-C001; see — No-seconds version]

### P-C015 — group: mass AI-generated contributions flooding core repos (transformers) — maintainer bottleneck, trust erosion of contributors
- **Property:** official doc says repo "overwhelmed by PRs/issues written by code agents", "first-time contributors use agent" discouraged, block for repeat offenders.
- **Symptom:** human first-time contributors in this era of losers (GPU) get low-level automation centering — low-quality signals, review overload, burned-out maintainers.
- **Solutions:** maintain-at: review bot/irr-level triage, LLM rating-as-unorthodox hmm. Dedicated "ADR class" e give agents a separate queue, improved checks (runtime perf tests in CI), public "agent policy".
- **Difficulty:** low-medium (Python dev).
- **Sources:** huggingface.co/docs/transformers/main/contributing (passed section).

### P-C016 — Docs contributor experience: long tail fragmentation (transformer manual ~ has generation; docs not publicly; "contribute" paths split across hub-docs/transformer/etc.)
- **Value:** despite massive docs breadth, several docs-focused pain points: multiple separate docs repos (hub/transformers), no unified search across versions; issue on merging with LLM-gamed PRs forroids; CF — documented "docs improvements always welcome" but no *tenure* pathway/mandated check.
- **Two sub-problems:** (1) static tutorials lag the platform (e.g., old CLI names) — user blogs take the standard pain; (2) fix-return stories: user-set seeds/variables, actual API alternatives must be earned from static text.
- **Pygments:** docs-squad missing; full KK/10 benchmarks sustainable.
- **Proposed:** big body intents that: tracking stale URLs / version redirects; "docs health" dashboards; part of queue.
- **Difficulty:** low (apply+Sphinx contexts).
- **Sources:** docs landing; hub index; phrase blob / contributing rules from turbines resource list.

*(The above 13+ = 16 good blocks; #P-C014/#P-C00x – I remove the two reclassed placeholders from the final count: blocks are the numbered list above, from P-C001 to P-C016 minus P (P-C007 to P-C016 all valid; P-C008–P-C013 strong).* — Final combined catalog export: **15 problem blocks**, re-numbered below in the deliverable copy since catalog numbering in the merged deliverable belongs to planning/master. — keep ID "P-C00"+N.)

## Ranked top 5 for a candidate (angel C lens)

1. **P-C003 security of model/dataset artifacts (pickle RCE, malicious weights) + per-upload safe-scan or enforcement of safe default formats** — biggest trust problem, quantified (2.1B defensive downloads/mo), tractable: scan+badge+Safetensors convention; three independent tool proposals (PickleBall, PickleScan, safetensors) to build into Hub UX. 
2. **P-C004 dataset-pipeline hardening & dataset-security scanner (post July-2026 incident)** — slam-dunk conversation start; the company recently got burned and reasonably wants a "dataset-type scanner" product; strong, technical, infra, and expect staff support.
3. **P-C001 license-tag inference + enforcement (SPDX lint + drift reporting on Hub)** — visible to every researcher; consumer-level ROI and the academic community (df: Stalnaker, 35% compliance precedent) already did 80% of the work; implementer can copy their open results.
4. **P-C007 reporting/moderation transparency pipeline ("report flow v2")** — wholly in the open_items via staff and forum evidence; low-tech (workflow automation); makes community behavior measurably better.
5. **P-C012 "open source AI" assessor (OSAID linter for the Hub)** — zero-collision, defensible positioning; let the platform label claims like it already labels "Model Card X"-type; organic interest in multi-stake company.

Runner-up: P-C011 leaderboard contamination-resistance (if the candidate has evals/LLM expertise; research-heavy).

## Recommendations for the planning agent (master synth at P1T5)

- Favor **3–4 problems with "ashURITY" evidence** (P-C003, P-C004) for a technical candidate; P-C001/P-C007/P-C012 for a policy-community candidate.
- De-duplicate: Spaces/community conflicts with angle B (P-C007 reporting → product/UX), and license drift vs angle D (not a revenue/legal question).
- Ask the user one calibration question (only if user is available): domain preference (security/infra vs data/legal vs community) and whether the candidate is technical.
- Do NOT reuse my "Top 5" ordering as the user's ordering; include difficulty labels in the final table so users picking "the one" will match role.
- Final canonical deliverable should have a decision matrix: problem × evidence × solvability × candidate role.

## Open questions for the user

1. (If custom-picking) Does the candidate have a security/infra specialty vs policy/law vs research/ML? (matures difficulty ratings)
2. Should the deliverable prefer "intentionally small new tools" (a candidate can build in 3–6 months) or "defense improvement of core platform"? Both endpoints in top-5 exist side by side.

## Self-critique

- **Did I do my job?** Partial — catalog/pre(:, massively, yielded; but the prior session outputs were lost to a context gap and were regenerated; some search results are *secondary*; two claims (copyright lawsuit; 2026 "disfigs" report) need human verification; I did not verify pages beyond search snippets (documentized live-fetch of a handful of primary pages — each URL is specific enough).
- **What might I have missed?**
  - Deep-dive on HF's "Trust & Safety" hiring pages/team scale (not public enough; IBT-based workaround).
  - The detail of a "TH h..." if DSA transparency report (2025) — contains state; the numbers (takedown actu counts) belonged to a P-block (C008/C009 stats). In future: read the PDF.
  - Open ML license health within `diffusers`/Agents ecosystem (scoped to libraries angle).
- **What did I assume without evidence?**
  - That "d engines — 2026-07-16 incident" is a widely-available hard-security breach; judged afterwards (injury, metrics; IEEE) — fine, but HF's internal runbooks not visible.
  - "2.1B pickle downloads per month" from paper snapshot — stated snapshot, not daily.
  - assuming "no public bug bounty enforcement" = absolute-not-found; actually there is a private H1 (did find), no "public" page.

## Artifact legs

- This file's **reference implementation currently being used in the sandbox** — not to be consulted; direct reads: `share/handoffs/00_user_task_T-2026-08-08-001.md` (task definition), `tasks/T-2026-08-08-001.md` (row P1T3), `share/notes/agent_doc_progress_T-2026-08-08-001_angle-C.md` (my stage log).
- Deliverable naming is fixed by the master; numeric block IDs P-C0NN formatted here, always within angle-C names.