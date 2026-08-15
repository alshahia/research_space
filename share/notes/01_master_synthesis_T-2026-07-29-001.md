# Master synthesis — T-2026-07-29-001 (animated websites)

**Status:** DONE (Phase 1)
**Author:** master orchestrator
**Date:** 2026-07-29
**Companion to:** `01_research_T-2026-07-29-001.md`

This file is the master's own narrative voice — not a summary of the angle reports, but an opinionated reading of what they mean together. The canonical index lives in `01_research_T-2026-07-29-001.md`; this synthesis explains why the dossier is structured the way it is and what I think the user should know before Phase 2 planning begins.

---

## What the user actually asked for

Re-read the six deliverables:

1. All kinds/genres/types of animated websites
2. Resources catalog + what each offers
3. Ready templates (online + offline)
4. Full build guide per kind — human AND LLM/agent-facing, specific accurate steps
5. Do/don't table with reasons
6. Conversion playbook (normal site → animated site)

The user did not ask for a comparison to the sibling `deepseek_flash` research. They asked for a dossier that is **specific, accurate, and dual-audience** (human + LLM/agent). The dual-audience constraint is the load-bearing one. If the build guide is only readable by humans, half the value is missing.

The user's stated preference for sequential + parallel execution and parallel web search indicates they understand multi-agent work and want speed. They asked for documentation of every task — that maps directly to the per-phase handoff files I am writing in `share/handoffs/` and `share/notes/`.

---

## What I think the dossier actually delivers

**Kinds (deliverable 1).** Twelve primary kinds on a trigger×surface matrix, plus seven emerging kinds folded into the same matrix. The matrix is the schema; a new library in 2027 drops into an existing cell. The matrix is what makes the kinds "specific, accurate, and dual-audience" — agents can reason over a matrix; humans can read a table.

**Resources (deliverable 2).** Seventy-plus libraries in fourteen sub-tables, every one with a license flag. Two libraries (Remotion, Theatre.js studio) would surprise a commercial user; the explicit flagging prevents that. GSAP being free is the most-likely-to-be-wrong fact in older guides; leading with this correction is high-value.

**Templates (deliverable 3).** Four template categories (online SaaS, OSS GitHub, commercial marketplace, offline). I gave the user my opinion in the canonical file: templates are right for non-technical founders and fast prototyping, but engineers should start from a shadcn/Tailwind starter and skip templates. This is a defensible opinion; the user can override.

**Build guide (deliverable 4).** Per-kind, both Human-facing and LLM-facing variants. The Human-facing variant is prose with code snippets and acceptance criteria. The LLM-facing variant is structured for an agent: pre-flight check, forbidden patterns, an acceptance-criteria block that a Playwright spec can read directly. The LLM-facing version is the harder artifact; angle C delivered it.

**Do/don't (deliverable 5).** Thirty rows of Use, thirty of Avoid. The top 10 are summarized in the canonical file; the full table lives in angle C. Every Avoid row has a reason (not just "don't do this" — what goes wrong if you do).

**Conversion playbook (deliverable 6).** Ten steps, ≈1105 words, under the 1500-word budget. Each step is self-contained and independently shippable. Steps 1, 9, 10 are measurement; steps 2–8 are build. The recipe generalizes to any retrofit motion work.

---

## How the angles fit together

The three research angles had real overlap and real independence. Looking back:

- **Angle A (taxonomy)** defined the **schema**. Twelve cells on a matrix. This is the structural skeleton.
- **Angle B (resources)** populated the **library space**. Seventy-plus libraries, each with a license and a verification status.
- **Angle C (build playbook)** populated the **playbook space**. Per-cell build steps, do/don't, conversion. This is the action content.

The schema (A) and the action content (C) are tightly coupled — each kind in A maps to one section in C. The library space (B) is referenced from C but is independently browsable. This separation is right: a user could read only C and ship a scroll-reveal site without ever opening B; they would just use the first library in C's "recommended" line.

**The design brief is parallel, not downstream.** It defines the motion grammar that all kinds respect. It is not "another angle" — it is the contract. Every implementation must read it. This is a hard wall I am enforcing in the master defaults.

---

## Where the dossier is weaker than I'd like

Six honest weaknesses (full list in canonical §11; abbreviated here):

1. **Cross-reference drift risk.** Angle C cites angle B libraries by URL. Phase 2 should produce a single canonical "library index" so the seam does not rot.
2. **Accessibility is "by default," not "validated."** The do/don't rows reference vestibular-disorder best practice but we did not test with actual vestibular-disorder users. Phase 2 should not claim accessibility validation.
3. **Emerging kinds (ix–xii) are thinner.** Acceptable trade-off; user can ask for depth.
4. **The 30/30 do/don't is opinionated, not measured.** I trusted angle C's framing. The user should treat it as a strong default.
5. **WebGPU / View Transitions browser-support tables are deferred to caniuse.** Acceptable; the user is sophisticated enough to check.
6. **The conversion playbook is generic.** No brand-specific micro-conversion overlay. Phase 2 should ask if the user wants one.

---

## What the corrections vs. the source actually change

The scraped source (`resources/animated_website_raw_research.txt`) is 2023-era. Eight corrections matter:

| # | Correction | Why it matters | Surface in dossier |
|---|---|---|---|
| 1 | GSAP is free | Changes "expensive library" framing to "free, MIT, top-tier" | Resources, build steps, do/don't |
| 2 | "Framer Motion" → "Motion" | Import paths and package names changed; React codebases may need migration | Resources, build steps |
| 3 | Three.js r185 + WebGPU baseline | WebGPU is now first-class; the "experimental" caveat is wrong | Resources, kind (ii) |
| 4 | CSS `transform`/`opacity` are compositor-only | Source's "main-thread" claim is wrong; affects performance advice | Do/don't row 1 |
| 5 | Lenis repo moved | Old tutorials cite dead org | Resources, build steps |
| 6 | Theatre.js studio is AGPL | Commercial users must pick `@theatre/core` | License posture |
| 7 | Remotion has commercial threshold | Verification needed before adoption | License posture |
| 8 | `<script src="https://cloudflare.com">` artifacts | Three scrape artifacts in source; replace before publishing | Build steps |

If the user forwards this dossier to anyone who has read the scraped source, those eight corrections will save them from embarrassment.

---

## What I want the user to verify before Phase 2

The clarifying questions from angles A, B, C total 13. I auto-defaulted 10 of them in the canonical file. The remaining 3 are worth surfacing here so the user can override if I am wrong:

1. **Framework target** — I am defaulting to framework-agnostic with per-kind options. If the user has a specific stack (React-only, Next.js-only, Webflow-only, vanilla-only), the playbook should specialize. Reversible at Phase 2 gate.
2. **Taxonomy axis** — I am defaulting to trigger×surface. If the user prefers intent-based (marketing/portfolio/product/editorial) or stack-based (CSS/WebGL/Canvas/Lottie), the matrix rebuilds. Reversible.
3. **Whether emerging kinds deserve a 13th "Emerging kinds" section** — I am defaulting to folding them into the matrix (CSS scroll-driven into kind i, View Transitions into kind vii, WebGPU into kind ii, etc.). If the user wants each emerging kind as a primary section, the playbook grows by 7. Reversible.

Everything else (license posture, depth weighting, audience breadth, curator galleries, legacy-library omission, Rive vs Lottie placement, test stack recommendation) is also reversible at the Phase 2 gate but I am more confident in those defaults.

---

## What I am NOT doing in Phase 1

- I am not dispatching `am-coder` yet. Phase 2 (planning) comes first.
- I am not writing any deliverable files in `research_doc/animated_website_minimax_3/`. That is `am-coder`'s lane in Phase 3+.
- I am not committing anything to git. Per the hard rule.
- I am not auto-installing dependencies or running non-read-only bash.
- I am not skipping the Phase 2 user-approval gate. The user will see the plan before any code runs.

---

## What Phase 2 will produce

When I dispatch `am-planning`, it will write:

1. `share/notes/02_plan_high_T-2026-07-29-001.md` — one-page high-level plan.
2. `share/notes/02_plan_phases_T-2026-07-29-001.md` — phased plan with chunked tasks.
3. Updates to `tasks/T-2026-07-29-001.md` — sub-task rows per phase.

After that, I will pause for user approval. The user can flip any default in §2 of the canonical file before Phase 2 starts.

---

## Metrics

- master_decisions_documented: 10
- corrections_propagated_to_canonical: 8
- honest_weaknesses_listed: 6
- phase_1_files_written: 7 (4 angle reports + 1 design brief + 1 design tokens + 1 canonical merge + this synthesis = 8; counter discrepancy due to count timing)
- phase_2_gate: pending user approval
- master_overrides_active: pause-at-Phase-2

STATUS: DONE
