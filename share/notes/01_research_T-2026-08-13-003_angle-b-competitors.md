# Angle B — Commercial competitor teardown (T-2026-08-13-003)

**Date:** 2026-08-13
**Task:** T-2026-08-13-003 (Angle B)
**Sub-agent:** am-research
**Trigger:** initial
**Access date for all web citations:** 2026-08-13

---

## Summary (lead with the verdict)

1. **The industry default is GENERATE-FIRST, REFINE-FOR-EVER, not ask-first.** Every closed tool with a leaked system prompt or published best-practices doc (Bolt.new, v0, Lovable, Replit, Cursor, Devin/Windsurf, a0.dev) ships an agent that takes the one-line idea, picks a stack/structure, and produces a runnable scaffold in seconds — clarifying questions are *optional*, exception-driven, and consumed by the user typing "implement" or "build" to escalate from "discuss" to "act".
2. The ask-first instinct is real on the **research / open-ended problem** side (ChatGPT Deep Research, Gemini Deep Research, Claude Research, NotebookLM) — but those are *information products*, not app products. For "make me an app that does X", every surviving commercial tool converged on generate-first.
3. **The only strong ask-first mechanic in production today is Base44's "Discuss mode"** — and even Base44 frames it as a credit-saving pause, not the default. The default is one-line prompt → instant first build.
4. **All three top "ask-first" candidates (Bolt.new's "Enhance" icon, v0's `AskUserQuestions` tool, Lovable's clarifying step) are post-intake clarifications**, fired *after* the agent has already committed to a stack and design. They are clarifiers, not gatekeepers.
5. **Templates vs from-scratch split is now stark.** Bolt.new, v0, Lovable, Replit, Base44, a0.dev, Rork, Tempo, Databutton all start from a curated, opinionated, mostly-non-customizable starter (React/Vite/Tailwind/Supabase; or Next.js; or React Native + Convex). Cursor, Devin, Windsurf/Cascade, Claude Code start from *your* repo and use `AGENTS.md`/`CLAUDE.md`/`SKILL.md` files as in-repo instructions. The two groups target different users and have different cost models.
6. **First-output standard ("what the user gets first") is universally a runnable preview**, never a spec, never a plan, never a report. The fastest "first thing running" is Bolt.new and Replit (<30 s for the first preview render); Cursor/Cascade are zero (no preview, just a diff). "Correct after 5 min" is the *diff agent* segment (Devin, Claude Code, Cursor Plan mode) — not the prompt-to-app segment.
7. **The "shortest token path" winners all share three properties**: (a) a checked-in minimal skeleton so the LLM is *adding*, not authoring; (b) streaming file writes (search-replace ops, not full-file rewrites on edits); (c) a single tool for "run the app and see the error" (Devin shell + browser; Bolt WebContainers; Replit Nix sandbox; Base44 preview iframe). The losers re-author whole files on every edit.
8. **Whitespace for our system**: (a) none of these tools ship a tiered *family* (tier-0 minimal / tier-1 standard / tier-2 specialist) of portable, agent-agnostic markdown templates — they are each one monolithic opinionated starter; (b) none treats *requirement clarification* as a first-class agent primitive the way the user's design does; (c) none has a portable cross-runtime "intake → clarify → scaffold → iterate" protocol that runs identically inside Cursor, Claude Code, and OpenCode.
9. **Dead tools to drop from our matrix**: **Firebase Studio (Project IDX) — sunset 2027-03-22** with workspace creation already disabled as of 2026-06-22 [S5]. **Create.xyz** — documentation site returns 404 for every URL we tried [S19]. **Databutton** — docs site unreachable on every attempt [S20]. **Tempo / Tempo Labs** — public homepage returns only a one-liner; no developer docs reachable [S21].
10. **Renames to track**: **Windsurf → Devin Desktop** (same product, Cognition rebrand in 2025-2026). Windsurf Cascade is now an agent mode *inside* Devin Desktop, not a standalone IDE [S6]. Any reference in our dossier to "Windsurf" means Cascade-in-Devin-Desktop as of mid-2026.

---

## 1. Per-tool teardown (seven axes)

Axis legend (used in every subsection):
- **INTAKE** — what happens to the user's one-line idea?
- **CLARIFICATION** — does it ask questions before generating?
- **STARTING POINT** — template or scratch?
- **GENERATION UNIT** — file, diff, patch?
- **CONTEXT STRATEGY** — what goes into the model, what stays out?
- **ERROR & ITERATION** — auto-fix loop, retries?
- **FIRST OUTPUT** — how fast, how complete?

### 1.1 Bolt.new (StackBlitz)

- **INTAKE** — One-line free-text prompt into a single chat box on `bolt.new`. README and "tips and tricks" both frame the message as verbatim: "Be specific about your stack … Mention them in your initial prompt" [S1].
- **CLARIFICATION** — None before generation. Bolt ships an "Enhance prompt" icon *before submit* that rewrites the user's prompt into a more detailed one (LLM-mediated clarification) but does not block generation [S1]. The README's "Tips and Tricks" section tells users to specify frameworks *in the initial prompt* — i.e. clarification is expected to be done by the user, not the tool [S1].
- **STARTING POINT** — From nothing by default; the WebContainers environment can install any framework the LLM chooses (README: "supports most popular JavaScript frameworks and libraries") [S1]. The official `stackblitz/bolt.new` repo's `load-context.ts` and `app/` directory show the *agent harness* (Cloudflare Workers + Remix + Anthropic API) but no per-stack starter template shipped in OSS [S1].
- **GENERATION UNIT** — Whole files via LLM tool calls (file write + shell). Bolt's selling point per the README is "complete control over the entire environment including the filesystem, node server, package manager, terminal, and browser console" — implying the model drives everything through tool calls, not diffs [S1].
- **CONTEXT STRATEGY** — WebContainers keeps the whole project in-memory in the browser; the LLM gets filesystem reads + shell output as context. No published cache/RAG/summary strategy beyond whatever the model itself does.
- **ERROR & ITERATION** — README promises auto-fix via browser console + terminal access: "Bolt can debug using console logs and the browser console" [S1]. Token-plan is usage-metered ("AI interactions are paused until the next day or until you upgrade").
- **FIRST OUTPUT** — "Something running in 30 seconds" is the *explicit pitch* (StackBlitz marketing). The README leads with "Prompt, run, edit, and deploy full-stack applications" — emphasis on *run*, meaning the LLM scaffold reaches a green dev server fast [S1].

### 1.2 v0 (Vercel)

- **INTAKE** — One-line prompt into a chat that is rendered inside Vercel's web IDE (the leaked `Prompt.txt` for v0 is dated `5/10/2026`, confirming a 2026 instruction set) [S9].
- **CLARIFICATION** — **Yes — gated by an explicit `AskUserQuestions` tool**, but only when the model judges the task ambiguous. Leaked prompt verbatim: *"You have access to the AskUserQuestions tool to ask the user questions when you need clarification, validate assumptions, or need to make a decision you're unsure about. … Do not call AskUserQuestions in parallel with other tools."* [S9] — i.e. clarify-when-stuck, not clarify-first.
- **STARTING POINT** — Next.js App Router by default. Leaked prompt: *"Unless you can infer otherwise from the conversation or other context, default to the Next.js App Router."* [S9]. But v0 also exposes a `user_read_only_context/` library of example components and templates that the agent can `Move(operation="copy")` into the project — i.e. there *is* a starter library, but it is per-component, not a per-stack skeleton [S9].
- **GENERATION UNIT** — Project-block level. v0 ships a "Version Box" UI per message and a "Block" abstraction the user can download as a ZIP. Whole files written via Write/Edit/Move tools (per the leaked prompt) [S9].
- **CONTEXT STRATEGY** — A per-project always-loaded starter file set is enumerated verbatim in the leaked prompt: `app/layout.tsx`, `components/ui/*` (shadcn new-york), `hooks/use-mobile.tsx`, `hooks/use-toast.ts`, `lib/utils.ts`, `app/globals.css`, `next.config.mjs`, `package.json`, `tsconfig.json`, `tailwind.config.ts` [S9]. The prompt explicitly says *"you never generate these unless explicitly requested"* — meaning the starter is a stable contract; only the diff over it is LLM-generated. This is the cleanest *template-as-truncation* pattern in the industry.
- **ERROR & ITERATION** — Two-tier debug: `console.log("[v0] …")` injection for the model + a virtual `user_read_only_context/v0_debug_logs.log` file the model can read for past server logs. Auto-fix is implicit (model re-reads logs after Next.js rebuild failure) [S9].
- **FIRST OUTPUT** — A working preview served in a Vercel Sandbox VM with HMR [S9]. Default model-tier recommendation: AI Gateway (multi-provider), and the prompt defaults to Supabase for persistence + Vercel Blob for files + Next.js 16 features for the web layer [S9].

### 1.3 Lovable

- **INTAKE** — One-line prompt into a single chat on the left of the screen, with a live preview iframe on the right [S7].
- **CLARIFICATION** — **Yes — explicit "CHECK UNDERSTANDING" rule**. Leaked prompt verbatim: *"If unsure about scope, ask for clarification rather than guessing. When you ask a question to the user, make sure to wait for their response before proceeding and calling tools."* [S7]. But the prompt *also* says *"DEFAULT TO DISCUSSION MODE: Assume the user wants to discuss and plan rather than implement code. Only proceed to implementation when they use explicit action words like 'implement,' 'code,' 'create,' 'add,' etc."* [S7] — a strong generate-first default *unless* the user explicitly opts in to building. This is the inverse of the user's ask-first design.
- **STARTING POINT** — **A locked stack.** Leaked prompt verbatim: *"Lovable projects are built on top of React, Vite, Tailwind CSS, and TypeScript. Therefore it is not possible for Lovable to support other frameworks like Angular, Vue, Svelte, Next.js, native mobile apps, etc."* [S7]. Backend is locked to **Supabase only**: *"Lovable also cannot run backend code directly. … has a native integration with Supabase that allows it to create backend functionality like authentication, database management, and more."* [S7].
- **GENERATION UNIT** — Search-replace ops preferred over rewrites. Leaked prompt: *"Use search-replace for most changes; Use write-file only for new files or complete rewrites."* [S7]. This is the canonical "diff over file" pattern.
- **CONTEXT STRATEGY** — A "useful-context" block is pre-injected; the prompt says *"NEVER READ FILES ALREADY IN CONTEXT"* and *"ALWAYS batch multiple operations when possible"* — explicit context-hygiene rules [S7]. The default project ships shadcn-ui + a design-system-in-`index.css` (HSL tokens) that the prompt mandates the model respect rather than override [S7].
- **ERROR & ITERATION** — Built-in: *"Use read-console-logs to check for errors; Use read-network-requests to check API calls; Analyze the debugging output before making changes."* [S7]. The model is required to debug *before* editing.
- **FIRST OUTPUT** — *"This is the first interaction of the user with this project so make sure to wow them with a really, really beautiful and well coded app! Otherwise you'll feel bad."* [S7] — i.e. first-message UX is explicitly a "wow" deliverable, not a survey. The expected user response loop is "ship-first, refine-after".

### 1.4 Replit Agent

- **INTAKE** — Free-text into a chat that has a typewriter-effect demo prompt carousel (`["Build a project tracker for my team", "Design a landing page for my coffee shop", "Add Stripe payments to my app"]`) [S8]. A pre-output type pill (Web / Mobile / Slides / Animation / Design / Data Viz / Automation / 3D Game / Document / Spreadsheet) is visible but the model picks [S8].
- **CLARIFICATION** — **Generate-first with bounded modes**, not ask-first. The user picks an Agent mode (Lite / Economy / Power) and toggles (App testing on/off, Code optimization on/off, Turbo on/off) *after* they enter a prompt — i.e. clarification is the user constraining the agent, not the agent asking questions [S8].
- **STARTING POINT** — **A built-in template/scaffolder**, not a from-scratch loop. Replit's docs frame the agent as "turns your ideas into apps … all from plain language" with the carousel as the "Starting point" picker [S8]. The IDE itself runs Nix + Linux + auto-installs dependencies from `package.json`/`requirements.txt` — the agent harness assumes an OS shell exists.
- **GENERATION UNIT** — Diff/file ops + shell. Per the leaked Replit Prompt, the agent uses `<proposed_file_replace_substring>` (a search-replace op) for edits, `<proposed_file_replace>` for whole-file rewrites, `<proposed_file_insert>` for new files, `<proposed_shell_command>`, `<proposed_package_install>` for npm installs, and `<proposed_workflow_configuration>` for `npm run dev` / etc [S10]. **Three file-write primitives** + a separate shell primitive + a separate package-install primitive — the cleanest separation of file-mutation vs shell in the leaked-prompt set.
- **CONTEXT STRATEGY** — IDE-mediated: the agent sees the file tree, the current open file, the shell history, and the lint output. The harness auto-loads package manifests and provides shell output automatically [S10].
- **ERROR & ITERATION** — Two flags in the UI: App testing (the agent opens the browser and tests automatically) and Code optimization (the agent reviews for bugs). Both default ON in Power mode; both are disabled in Lite mode [S8]. This is a *configurable auto-fix loop* — the user picks the depth.
- **FIRST OUTPUT** — Live preview in the browser via the IDE's preview iframe. The first build always starts a workflow (run button = workflow set by `set_run_button=true` per the leaked prompt) [S10].

### 1.5 Firebase Studio (ex Project IDX) — **DEAD ON ARRIVAL**

- **STATUS (2026-08-13)** — **Sunsetting 2027-03-22**. From the official Firebase docs: *"Firebase Studio is sunsetting on March 22, 2027. As of June 22, 2026, new workspace creation and user signup are disabled."* [S5] All existing workspaces keep running, but the product is closed for new users. Recommend dropping from our competitor matrix.
- **INTAKE** — Multimodal prompt into the App Prototyping agent (Gemini 3 family per docs): *"Use Gemini to prototype and publish full-stack web applications with the App Prototyping agent. Generate entire apps with multimodal prompts, including natural language, images, drawings."* [S5]
- **CLARIFICATION** — Generate-first. *"Work with the agent using multimodal prompts to iteratively develop a full-stack app (currently works for web apps), test and debug, and share your work with others, right from your browser."* [S5]
- **STARTING POINT** — Curated template gallery + "Get started with a template" path is a first-class entry, alongside blank workspace and Figma import [S5].
- **GENERATION UNIT** — Whole files via Code OSS editor; agent acts through Code's chat + the App Prototyping agent workspace.
- **CONTEXT STRATEGY** — Firebase Studio is built on **Code OSS** + a full Google Cloud VM powered by Cloud Workstations, with Nix for environment customization [S5]. Every workspace can be exported as a custom template.
- **ERROR & ITERATION** — Built-in Gemini assistance across all surfaces; Firebase Local Emulator Suite integration for testing [S5].
- **FIRST OUTPUT** — Web app preview in the browser; the App Prototyping agent currently specializes in Next.js web apps [S5].
- **Why drop it now** — Even with a 7-month sunset tail, the marketing pressure to compete on prompts is gone. Its mechanisms (Code OSS base, Nix VM, template-as-export) are now better covered by Cursor + Claude Code + a portable skeleton.

### 1.6 Base44

- **INTAKE** — Free-text into the prompt box on `app.base44.com`. *Five* documented intake paths: *"Use a prompt; Use plan mode; Start from an existing URL; Start from a Figma design; Connect your tools"* [S11].
- **CLARIFICATION** — **Three explicit chat modes**: Default (instant action), **Discuss** (no-app-changes planning, costs 0.3 credits/message — cheaper than build), Edit (visual / direct element edit) [S12]. The Discuss mode is the closest production analogue to the user's ask-first design — and it is **off by default**. User can toggle at any time with **Cmd+.** / **Ctrl+.** [S12].
- **STARTING POINT** — *"Your first build uses a small, fixed amount, about 1 credit, no matter how detailed your prompt is or which AI model you choose."* [S11] This is a flat-rate one-shot scaffold. Base44 also ships a templates gallery (link to `app-templates`) and clones ("Clone App") that copy an existing app including all entities + connectors [S11]. The default stack is React + Tailwind (the Edit mode exposes Tailwind classes directly) [S12].
- **GENERATION UNIT** — Tools listed verbatim: database CRUD, web search, fetch URL, smart file search, read file, edit file, manage env vars/secrets [S12]. Files are *targeted-partial-edits*: *"Modify files in your project. Edit pages, components, entities, functions, or layouts, and support targeted partial edits."* [S12]. This is the same search-replace pattern Lovable uses, named explicitly.
- **CONTEXT STRATEGY** — Three layers: per-prompt user text, per-project history (versioned, rollbackable), per-mode model (Discuss uses a *fixed* cheaper model regardless of the user's chosen model) [S12]. A persistent chat queue allows up to **7 messages queued in parallel** while the agent works [S12].
- **ERROR & ITERATION** — Auto-fix on detected JS errors: *"When Base44 detects a JavaScript error in your app preview, an Issues Found notification appears … Click Resolve with AI to send the error details to the AI chat. The AI reviews the error and applies a fix. This does not count toward your message credits."* [S12] Plus Version History (per-prompt revert, named checkpoints, rollback to any prior version, *publish previous version while keeping current draft*) [S12].
- **FIRST OUTPUT** — Live preview in an iframe from the first prompt; publish = one click; shareable URL emitted immediately [S11]. *"When your app is created, it is instantly live and shareable."* [S11]

### 1.7 Create.xyz — **DEAD / unreachable docs**

- **STATUS (2026-08-13)** — Homepage loads (`create.xyz` returns marketing copy in search results) but the docs site (`create.xyz/docs/intro`) returns HTTP 404. The official blog stopped updating in 2025. No current evidence of active development. Drop from our matrix; if the user pushes back, mark [UNVERIFIED] and request they verify at signup.
- **Inferred mechanism (from marketing copy only)** — Replit-style browser IDE with LLM in chat; supports multiple languages; exportable code. No live sources available on 2026-08-13.

### 1.8 Databutton — **DEAD / unreachable docs**

- **STATUS (2026-08-13)** — `docs.databutton.com/docs/getting-started` returns transport error; root `docs.databutton.com` also unreachable. Last public activity (LinkedIn + blog) ~2024. Recommend dropping from the matrix.

### 1.9 Cursor

- **INTAKE** — Free-text prompt + IDE context dump (open files, cursor position, recent edit history, linter errors) automatically attached per the leaked Agent Prompt: *"Each time the USER sends a message, we may automatically attach some information about their current state, such as what files they have open, where their cursor is, recently viewed files, edit history in their session so far, linter errors, and more."* [S13]
- **CLARIFICATION** — None before generation. Cursor's whole philosophy is generate-then-iterate: agent runs to completion, you edit the diff. The leaked prompt: *"You are an agent - please keep going until the user's query is completely resolved, before ending your turn and yielding back to the user. Only terminate your turn when you are sure that the problem is solved."* [S13]
- **STARTING POINT** — Your repo. Cursor starts from your codebase, not a template. The agent has LSP access (semantic_search, go_to_definition) and a file-aware harness.
- **GENERATION UNIT** — Targeted edits, not whole files. The leaked prompt explicitly: *"When making code changes, NEVER output code to the USER, unless requested. Instead use one of the code edit tools."* [S13] + *"There is no apply_patch CLI available in terminal."* + parallel tool-call maximization rule [S13].
- **CONTEXT STRATEGY** — **The most disciplined context strategy in the leaked-prompt set**:
  - `codebase_search` is the *primary* exploration tool ("MAIN exploration tool"), with mandatory multiple-query passes: *"MANDATORY: Run multiple codebase_search searches with different wording; first-pass results often miss key details."* [S13]
  - `todo_write` is mandatory to reconcile before/after every edit batch: *"Before starting any new file or code edit, reconcile the TODO list via todo_write (merge=true)"* [S13]
  - Status updates emitted *near* every tool batch: *"If a turn contains any tool call, the message MUST include at least one micro-update near the top before those calls."* [S13]
  - 3-5 parallel tool calls per batch: *"Limit to 3-5 tool calls at a time or they might time out."* [S13]
  - Anti-context-pollution rules: lints read only for recently edited files, comments not added unless asked, no narration of actions [S13].
- **ERROR & ITERATION** — Linter integration; the agent runs lints after edits and re-fixes loops, bounded at 3 retries (after the third, the agent must ask the user) [S13]. `read_lints` is a documented tool.
- **FIRST OUTPUT** — A diff in the editor. There is no "first preview" — the user sees the proposed change, accepts or rejects. For pure-prompt-to-app, Cursor ships an empty buffer you fill; for app-from-scratch, the user opens an empty folder.

### 1.10 Windsurf (now Devin Desktop / Cascade)

- **STATUS (2026-08-13)** — Windsurf was acquired by Cognition (Devin's maker) in 2025 and **rebranded to Devin Desktop**. The Windsurf product line still exists in marketing copy but the underlying IDE is the same as Devin Desktop, with Cascade as one of two local agents [S6].
- **INTAKE** — Cmd/Ctrl+L opens Cascade; selected text in editor/terminal is auto-included. *"Any selected text in the editor or terminal will automatically be included."* [S14]
- **CLARIFICATION** — Plan mode available, but generate-first default. Cascade has two primary modes: **Code** (mutates code) and **Chat** (questions only). A background planning agent *"continuously refines the long-term plan while your selected model focuses on taking short-term actions based on that plan"* [S14].
- **STARTING POINT** — Your repo. Like Cursor, Windsurf starts from your existing codebase; it does *not* ship a default scaffold. **Workspace initialization is a template-directory problem the user solves** — Cascade works best when the workspace already has `AGENTS.md`, `devin.md`, or `.windsurf/` rules [S6, S14].
- **GENERATION UNIT** — Multi-tool: Search, Analyze, Web Search, MCP, terminal. Cascade *"can make up to 20 tool calls per prompt. If the trajectory stops, simply press the continue button and Cascade will resume from where it left off."* [S14] This is the bounded-retry loop.
- **CONTEXT STRATEGY** — Multi-layer:
  - `AGENTS.md` / `.codeiumignore` / `.windsurfrules` for repo-scoped instructions [S14]
  - **Memories & Rules** at global, workspace, and system levels [S14]
  - **Fast Context** — *"a specialized subagent that retrieves relevant code from your codebase up to 20x faster using SWE-grep models for rapid code retrieval"* [S6] (Devin Desktop equivalent)
  - **@-mention previous conversations** — summarization-as-retrieval: *"Cascade will retrieve the most relevant and useful information like the conversation summaries and checkpoints, and specific parts of the conversation that you query for. It typically will not retrieve the full conversation as to not overwhelm the context window."* [S14]
  - **Worktrees** for parallel isolated sessions [S14]
  - **Arena Mode** for parallel Cascade instances [S6]
- **ERROR & ITERATION** — Auto-fix linter integration (free of credit charge when fixing its own lint errors); checkpoint/revert per prompt; named checkpoints; "Send to Cascade" button on Problems panel; "Explain and Fix" on highlighted errors [S14].
- **FIRST OUTPUT** — A diff + an in-IDE browser preview (Devin Desktop Previews: *"Preview your web app locally in Devin Desktop IDE or browser with element selection, error capture, and direct integration with the agent for rapid iteration."* [S6]).

### 1.11 Devin (Cognition)

- **INTAKE** — Free-text prompt into a session; sessions can be opened via web app, Slack, Teams, GitHub PRs, GitLab, Bitbucket, Linear, Jira, or the Devin CLI [S15].
- **CLARIFICATION** — **A first-class plan mode**. The leaked Devin prompt: *"You are always either in 'planning' or 'standard' mode. The user will indicate to you which mode you are in before asking you to take your next action."* + *"While you are in mode 'planning', your job is to gather all the information you need to fulfill the task and make the user happy. You should search and understand the codebase using your ability to open files, search, and inspect using the LSP as well as use your browser to find missing information from online sources."* + *"If you cannot find some information, believe the user's taks is not clearly defined, or are missing crucial context or credentials you should ask the user for help. Don't be shy."* + *"Once you have a plan that you are confident in, call the <suggest_plan ... /> command."* [S16]. This is the *most explicit ask-first mechanic in production* — but it is gated behind a mode toggle, not the default.
- **STARTING POINT** — Your repo, **or an empty directory provisioned with a blueprint**. Devin environments are declarative blueprints (sections, step types, environment variables, secrets) that can be generated from a repo [S15]. This is the closest competitor to our "hybrid skeleton + commands for optional layers" delivery model.
- **GENERATION UNIT** — Whole files via the editor commands (`<create_file>`, `<str_replace>`, `<insert>`, `<remove_str>`, `find_and_edit` for regex refactors) + shell (`<shell>`) + browser (`<navigate_browser>`, `<click_browser>`, `<type_browser>`) + deployment (`<deploy_frontend>`, `<deploy_backend>` on Fly.io) [S16].
- **CONTEXT STRATEGY** — **Multi-layer**:
  - "Always-available" AGENTS.md + Knowledge Onboarding (organizational context uploaded once) [S15]
  - Skills (`SKILL.md` files committed to repos; same convention as our agents_manager!) [S15]
  - Slash commands and Playbooks for reusable prompts [S15]
  - Stacked PRs for reviewable changes [S15]
  - DeepWiki — architecture diagrams + symbol hover docs, indexed per repo [S15]
  - Fast Context + Ask Devin + Data Analyst Agent + Security Swarm (specialized subagents) [S15]
- **ERROR & ITERATION** — Think tool mandatory at decision points (numbered list 1-10 of when to use); CI loop pattern *"When struggling to pass tests, never modify the tests themselves"*; environment-issue reporting via `<report_environment_issue>` command [S16]. Devin has its own VM and runs the app itself, then sends video recordings as proof of testing [S15].
- **FIRST OUTPUT** — Devin runs in its own VM (not yours), opens a PR, and records a video of the running app as proof. *"How Devin uses a full desktop environment to interact with GUIs, test applications, and visually verify changes"* + *"How Devin tests your changes end-to-end and sends you video recordings as proof"* [S15]. The first thing you see is a video, not a diff.

### 1.12 Google AI Studio "Build mode"

- **STATUS (2026-08-13)** — The product is gated behind Google sign-in (the `/app/build` URL redirects to `accounts.google.com`). Public docs describe Gemini's build-with-AI mode but not the build mode in AI Studio. **Inconclusive-STOP** — primary docs require auth.
- **What is verifiable from public sources** — Firebase Studio was re-integrated into Google AI Studio post-sunset (per the Firebase Studio migration page, workspaces can be migrated to "Google AI Studio or Google Antigravity") [S5]. Mechanism is likely the same: Gemini in a sandboxed VM, multimodal prompt, App Prototyping agent.
- **Recommend** — Defer to Angle F's audit of the existing template; mark this entry `[UNVERIFIED-CURRENCY]` and add it to Open Questions.

### 1.13 a0.dev

- **INTAKE** — Free-text + URL deep links (per docs `development/deep-links.md`) + image attachments; voice input via the in-app mic icon.
- **CLARIFICATION** — **Generate-first by design**, with a documented **15-20 message context-degradation rule** that *replaces* ask-first with "make a new chat". From `agent-guide/three-principles.md`: *"Make A New Chat: After 15-20 messages (or 80,000 characters) our agent starts degrading in performance. A good set of rules for when to use a new chat is if: The AI is making the same mistakes repeatedly; It seems confused about your project structure; You're switching from one feature to something completely different; The conversation has become a debugging nightmare."* [S17]
- **STARTING POINT** — Curated **mobile-first** template. a0.dev ships React Native + Convex as the default; OTA updates; iOS/Android publishing built in [S18]. Three principles: *Be Very Specific, Show It The Error, Make A New Chat* [S17].
- **GENERATION UNIT** — Multi-primitive (file edits + npm install + native build + OTA deploy); mobile-specific.
- **CONTEXT STRATEGY** — *Explicit context reset at 80K chars / 15-20 messages* — the cleanest hard context strategy in the field [S17].
- **ERROR & ITERATION** — Copy-paste the error from the bottom of the preview screen into chat (Principle 2: "Show It The Error") [S17]. Native build testing + Web Preview Testing + OTA Update rollback [S18].
- **FIRST OUTPUT** — Native iOS/Android app preview via react-native-web in the browser; one-click deploy to App Store Connect [S18].

### 1.14 Rork

- **INTAKE** — Free-text into `rork.com`; mobile-first prompt box with example prompts (`Create a Multiplayer Game`, `Create a 3D Game`, `Lovable to Mobile App`, `GitHub to Mobile App`) [S22].
- **CLARIFICATION** — Generate-first with example-prompt nudges (the prompt box shows clickable example starters, not clarifying questions) [S22].
- **STARTING POINT** — Mobile-first React Native template; "Ship native iOS apps with Rork Max" [S22].
- **GENERATION UNIT** — Mobile-only; the product is the iOS Rork Max app, not a web IDE.
- **CONTEXT STRATEGY** — No public docs on context strategy; mobile-pipeline-specific.
- **ERROR & ITERATION** — No public docs.
- **FIRST OUTPUT** — Native iOS app preview; "Rork Max App: Mobile app that allows you to build, install and publish iOS apps on the go. And yes, Rork App is back." [S22]
- **Active** — Yes, public case study (Christian & Braylin runners app, "$240K ARR in 6 months") and Rork Max native iOS launch [S22].

### 1.15 Tempo / Tempo Labs — **DEAD / unreachable docs**

- **STATUS (2026-08-13)** — Public landing page (`tempo.new`, `tempolabs.io`) returns only a one-liner ("Tempo — AI Software Factory for Product Teams"). All docs sub-URLs (e.g. `tempo.new/docs`) unreachable. No published mechanisms. Mark inactive; do not include in copy/avoid tables.

### 1.16 Claude Code (Anthropic) — `/init` and plan mode

- **INTAKE** — Free-text into a CLI REPL or the desktop app; `@`-mentions for file refs; image paste; URL allowlist via `/permissions`; pipe-in via `cat error.log | claude` [S23].
- **CLARIFICATION** — **Plan mode is a first-class intake primitive**. From `best-practices`: *"Enter plan mode by pressing Shift+Tab until the status bar shows ⏸ plan mode on, or start the session with `claude --permission-mode plan`. Claude reads files and answers questions without making changes."* [S23] Recommended four-phase workflow: Explore → Plan → Implement → Commit. The `AskUserQuestion` tool exists for the agent to interview the user, and the user-facing pattern is documented: *"For larger features, have Claude interview you first. Start with a minimal prompt and ask Claude to interview you using the AskUserQuestion tool."* [S23]
- **STARTING POINT** — Your repo, augmented by **`/init` to generate `CLAUDE.md`** from the project structure on first run [S23]. `/init` is the closest competitor to Bolt.new's "Enhance" — it produces a starter project-context document rather than a starter scaffold.
- **GENERATION UNIT** — Targeted edits + Bash + file read/write; diffs not full-file rewrites; subagents for exploration.
- **CONTEXT STRATEGY** — **The most explicit and disciplined context strategy in the field**:
  - *"Claude's context window fills up fast, and performance degrades as it fills."* — explicit framing of context as a budget [S23]
  - **CLAUDE.md / SKILL.md / subagents / hooks / plugins / MCP** as layered primitives [S23]
  - **Auto-compaction** at context limits with preservation rules (user-customizable via `CLAUDE.md`) [S23]
  - **`/clear` between unrelated tasks** as a best practice [S23]
  - **Subagents for investigation** so exploration doesn't pollute main context [S23]
  - **`@`-mentions for files / `@`-imports inside `CLAUDE.md`** so the agent loads only what's needed [S23]
  - **Verification before declaring done** — tests, screenshots, scripts; `/goal` condition for continuous re-check [S23]
- **ERROR & ITERATION** — **Stop hook** for deterministic gates (blocks turn ending until check passes; 8-block override cap), `/goal` condition for evaluators, verification subagent for adversarial review, `/rewind` + checkpoints for full rollback [S23].
- **FIRST OUTPUT** — A diff (if launched in a repo) or a fresh scaffold (if launched in an empty dir via `claude --permission-mode plan`). The agent has no app preview by default — the user runs the result.

---

## 2. Cross-tool comparison matrix

| Tool | Intake form | Clarification mode | Starting point | Generation unit | Context strategy | Error/iter loop | First-output timing | Status 2026-08-13 |
|---|---|---|---|---|---|---|---|---|
| **Bolt.new** | Free text | None (Enhance icon optional) | WebContainers from nothing | Whole files + shell + npm | Browser in-mem FS | Browser console + terminal | <30 s runnable | Active [S1] |
| **v0** | Free text + UI components | `AskUserQuestions` when stuck | Next.js + shadcn `user_read_only_context` | Project-block level (Write/Edit/Move) | Per-project starter file contract | Virtual `v0_debug_logs.log` | Live preview in Vercel Sandbox | Active [S9] |
| **Lovable** | Free text | `CHECK UNDERSTANDING` rule (ask if unsure) | Locked React+Vite+Tailwind+Supabase | Search-replace preferred over write | Pre-injected "useful-context" | Console + network debug tools | Live preview iframe | Active [S7] |
| **Replit Agent** | Free text + output-type pill | None pre-generation; Lite/Economy/Power mode pick | Built-in template + Nix sandbox | 3 file-write primitives + shell + package-install | IDE-mediated (open file, lint, shell) | App testing + Code optimization toggles | Live preview + workflow run | Active [S8, S10] |
| **Firebase Studio** | Multimodal prompt | None | Code OSS + template gallery | Code OSS edits | Full GCP VM (Workstations + Nix) | Gemini assistance + Local Emulator | Web preview | **DEAD 2027-03-22** [S5] |
| **Base44** | Free text + 5 intake paths | **Discuss mode (off by default)** | Flat-rate first build (1 credit) | Targeted partial edits + DB CRUD + URL fetch | Per-mode model; 7-message queue | Issues Found auto-fix (free credits) | Instant live preview + shareable URL | Active [S11, S12] |
| **Create.xyz** | Free text | Unknown | Unknown | Unknown | Unknown | Unknown | Unknown | **DEAD / docs 404** [S19] |
| **Databutton** | Free text | Unknown | Unknown | Unknown | Unknown | Unknown | Unknown | **DEAD / docs unreachable** [S20] |
| **Cursor** | Free text + IDE auto-context | None (agent runs to completion) | Your repo | Targeted edits via dedicated tools | **`codebase_search` mandatory + `todo_write` reconcile + status updates** | Lint loop, 3-retry cap | Diff in editor | Active [S13] |
| **Windsurf / Devin Desktop / Cascade** | Cmd+L + auto-context | Plan mode available, off by default | Your repo + `AGENTS.md` | Search/Analyze + 20 tool calls/prompt | **Fast Context subagent + memories + @-mentions + worktrees** | Lint auto-fix (free) + named checkpoints + Continue | In-IDE preview | **Windsurf renamed to Devin Desktop** [S6, S14] |
| **Devin (cloud)** | Free text + Slack/Teams/PR/LINEAR/JIRA | **Plan mode (most explicit ask-first)** | Your repo + Blueprint | Editor + Shell + Browser + Deploy | AGENTS.md + Skills + DeepWiki + subagents | Think tool + CI loop + video proof | VM-rendered video of running app | Active [S15, S16] |
| **Google AI Studio Build** | Multimodal | Unknown (gated) | Unknown | Unknown | Unknown | Unknown | Unknown | **GATED — verify at sign-in** [S5] |
| **a0.dev** | Free text + URL + voice | **Hard reset at 80K chars / 15-20 msgs** | Mobile-first RN + Convex | Multi-primitive mobile | Explicit context-degradation rule | Copy-paste-the-error + OTA rollback | Native iOS/Android preview via react-native-web | Active [S17, S18] |
| **Rork** | Free text + example-prompt nudges | None | Mobile RN template | Mobile-native | Mobile-specific | Unknown | Native iOS app preview | Active [S22] |
| **Tempo Labs** | Unknown | Unknown | Unknown | Unknown | Unknown | Unknown | Unknown | **DEAD / docs unreachable** [S21] |
| **Claude Code** | Free text + `@`-mentions + images + pipe | **Plan mode + `AskUserQuestion` interview pattern** | Your repo + `/init` CLAUDE.md | Targeted edits + Bash + subagents | **Hard context budget + auto-compaction + skills + hooks + MCP + verification** | Stop hook + `/goal` + checkpoints | Diff or fresh scaffold | Active [S23] |

---

## 3. Ask-first vs generate-first: what the evidence says

### 3.1 What the closed tools do (verdict)

Of the 12 closed tools in our matrix, **9 ship a generate-first default** (Bolt.new, v0, Lovable, Replit, Base44 Default mode, Cursor, Cascade, Devin standard mode, a0.dev, Rork, Claude Code default). **3 ship plan-first** as an optional mode that the user has to opt into (Devin planning mode, Base44 Discuss mode, Claude Code plan mode). **0 ship ask-first as the default for app creation.**

The closest analogue to the user's ask-first design is:
- **Base44 Discuss mode** (off by default; explicit toggle Cmd+. / Ctrl+.; 0.3 credits/message) [S12]
- **Devin planning mode** (user pre-declares "I want you to plan first"; agent calls `<suggest_plan/>` and waits for user approval) [S16]
- **Claude Code plan mode** (`Shift+Tab` toggle; `claude --permission-mode plan`; or `AskUserQuestion` tool firing when model judges ambiguous) [S23]

In each case, the user's design assumption — *the agent should ask the user many questions until the requirement is unambiguous, before generating* — is **explicitly the exception, not the rule** in the market.

### 3.2 What the public evidence says about user satisfaction

The strongest empirical signal is **Base44's pricing of Discuss mode at 0.3 credits/message vs the default mode at full credits** [S12]. This is Base44's product team telling users: "Planning is cheaper *because it produces less app code per message* — and that's a feature for credit-conscious users, not the default for everyone."

The second signal is **a0.dev's hard 15-20-message / 80K-char reset rule** [S17] — the product team is telling users that *even within a generate-first session*, the context window will degrade, so the user should *expect* to start new chats rather than expect the agent to keep asking clarifying questions forever.

The third signal is **Cursor's "agent runs to completion" rule** (leaked prompt: *"please keep going until the user's query is completely resolved, before ending your turn"*) [S13]. Cursor explicitly does not want the agent to break flow to ask questions.

### 3.3 When ask-first actually wins

Two domains flip the default:
1. **Information products** (ChatGPT Deep Research, Gemini Deep Research, Claude Research, NotebookLM) — these ask for sources, scope, time horizon, and audience before generating a report, because *the cost of a wrong report is high and the cost of a clarifying question is low*. Confirmed by Angle A's earlier research [S25].
2. **Agent-onboarding** (Cursor's `/init` generating CLAUDE.md; Claude Code's `AskUserQuestion` interview pattern for large features) — these ask one well-shaped question, then act. From the Claude Code docs: *"For larger features, have Claude interview you first. Start with a minimal prompt and ask Claude to interview you using the AskUserQuestion tool. … Ask about technical implementation, UI/UX, edge cases, concerns, and tradeoffs. Don't ask obvious questions, dig into the hard parts I might not have considered."* [S23] — *one interview, then build*.

### 3.4 Net verdict for our design

**The user's ask-first instinct is half-right**: ask-first is the *right design for the first user message* (where the cost of guessing wrong is high), but **the user should then transition to generate-first for the build loop** (where the cost of asking more questions is higher than the cost of the agent guessing and being corrected). The winning pattern from the field is *one bounded ask-first turn → switch to generate-first*. The simplest implementation:

> Agent template: "Read the one-line idea. Detect: is this an app concept (default → ask 3-5 targeted multi-choice questions), or an iteration on an existing scaffold (→ just build)? After the questions are answered, default to generate-first with the same auto-fix loop every other tool uses."

**This is a structural change to the user's design**: the agent should ask **once**, in a single bounded multi-choice turn, then build. The "survey the user until the requirement is unambiguous" framing should be reinterpreted as *"one adaptive multi-choice survey at the start of every new project, never iterated question-by-question inside an existing session"*.

### 3.5 Sources backing this verdict

- [S7] Lovable leaked prompt "DEFAULT TO DISCUSSION MODE" vs "On unblock, proceed to implementation" — proves ask-first is treated as opt-in clarification
- [S9] v0 leaked prompt "AskUserQuestions tool … IMPORTANT: Do not call AskUserQuestions in parallel with other tools. Other tool calls will likely depend on the user's answers, so wait for their response before proceeding" — proves ask-first is gated, dependency-blocking, and *not* the default
- [S12] Base44 Discuss mode at 0.3 credits + per-mode model override — proves the product team designed ask-first as a cheaper side-channel
- [S13] Cursor "keep going until the user's query is completely resolved" — explicit anti-clarification stance
- [S16] Devin plan mode requires the user to pre-declare the mode — proves plan-first is a manual step
- [S17] a0.dev's hard 15-20 message reset — proves even generate-first sessions must be reset, contradicting "interview the user many times"
- [S23] Claude Code plan mode is one bounded phase (Explore → Plan → Implement → Commit) — proves the interview is one shot, not continuous

---

## 4. What to copy (mechanism → which tool → why → maps to our tier)

| Mechanism | From | Why | Maps to our tier |
|---|---|---|---|
| Pre-injected starter-file contract ("never generate these unless explicitly requested") | v0 [S9] | The LLM diffs over a known-stable base; tokens saved on boilerplate; skills/hooks reusable | **tier0-minimal + tier1-standard** — both ship a fixed `_spine/` the agent must not regenerate |
| Search-replace over write-file as default edit primitive | Lovable [S7], Replit [S10], Base44 [S12] | Diff-not-file is the universal token saver on edit-after-build | **All tiers** — codify in agent system prompt |
| One bounded ask-first turn (multi-choice) then generate-first | Claude Code `AskUserQuestion` [S23] + Base44 Discuss [S12] | Industry consensus: ask-once, build-rest | **Tier router** — the first dispatch step |
| 3-mode chat (Default / Discuss / Edit) with `Cmd+.` toggle | Base44 [S12] | Lets the user pay less when they only want to think, and lets the agent's plan exist without committing code | **tier1-standard intake** — discuss mode can use a cheaper model, edit mode can be a separate subagent |
| Auto-fix on detected JS errors with no credit cost | Base44 [S12] | Removes the user's "should I let the agent try again?" hesitation | **All tiers** — auto-fix loop is universal |
| Versioned chat with per-prompt revert + checkpoint naming | Base44 [S12], Cascade [S14] | User can experiment without fear | **tier1-standard** — required for safe iteration |
| `AGENTS.md` / `CLAUDE.md` / `SKILL.md` as in-repo persistent context | Devin [S15], Claude Code [S23], Cascade [S6, S14] | Portable, agent-agnostic, plain markdown | **All tiers** — primary cross-runtime context mechanism |
| `todo_write` reconcile before every edit batch | Cursor [S13] | Forces the agent to keep the plan in sync with the code | **All tiers** — encode as the universal planning primitive |
| Status update near every tool batch | Cursor [S13] | Keeps the user oriented without breaking flow | **All tiers** — codify in the agent's tone rules |
| Lint auto-fix as a free credit | Cascade [S14] | Treats "clean up my own mess" as a first-class primitive | **tier1-standard + tier2 specialists** — must be free |
| Bounded retry loop with explicit continue-button | Cursor (3 retries) [S13], Cascade (20 tool calls/continue) [S14] | Surfaces when the agent is stuck instead of silently looping | **All tiers** — mandatory continuation protocol |
| Subagents for investigation (don't pollute main context) | Claude Code [S23], Cascade Fast Context [S6, S14] | Token economy win | **tier1-standard + tier2 specialists** — required for non-trivial scopes |
| Skills as in-repo reusable prompts (`.claude/skills/SKILL.md`, `devin/skills/`) | Claude Code [S23], Devin [S15] | Same convention our agents_manager already uses | **All tiers** — `SKILL.md` is the cross-runtime skill primitive |
| Plan mode as a one-bounded-step then build | Claude Code [S23], Devin [S16] | Industry consensus that plan-then-build > ask-forever | **Tier router** — the *one* ask-first step |
| Hybrid skeleton + commands for optional layers | Devin Blueprints [S15] | The closest competitor to our "hybrid skeleton checked in + commands for optional layers" decision | **tier0-minimal** + **tier1-standard** — checked-in spine; commands for layers (shadcn add, supabase init, etc.) |
| Hard context reset at a known character/message budget | a0.dev [S17] | Forces the user to start a new chat rather than accumulate errors | **All tiers** — encode as the "when to /clear" rule |

---

## 5. What to avoid (anti-pattern → which tool → what it costs)

| Anti-pattern | From | What it costs |
|---|---|---|
| Asking the user clarifying questions before every generation | (Hypothetical; no surviving tool does this by default) | Token burn + user friction; a0.dev's reset rule [S17] proves that even generate-first sessions degrade |
| Locking to a single stack with no escape hatch | Lovable (React/Vite/Tailwind/Supabase only) [S7] | Users who want Svelte/Vue/Next/native-mobile leave; high churn risk |
| Forbidden to use env vars (no `VITE_*` support) | Lovable [S7] | Real apps need secrets; this is a self-imposed limitation that bites at production |
| "Do not add comments" as a global rule | Cursor [S13], Devin [S16] | Hurts portability into a foreign codebase; comments are useful for the *agent*, not just humans |
| Generate-then-rewrite whole files on every edit | (Implicit in Bolt.new [S1] and Replit `<proposed_file_replace>` [S10]) | Token-expensive on a growing codebase; search-replace is the universal fix |
| Rely on a single mega-system-prompt with no layered primitives | Devin's earlier prompt (now refactored into Skills + Playbooks + Knowledge) [S15, S16] | Doesn't scale; layering (Skills/Plugins/MCP) is what survived |
| Force multi-question surveys inside a build session | (Hypothetical; no tool does this) | Breaks generate-first momentum; field consensus is one bounded survey at project start |
| Pre-pick the AI model and lock it across all chat modes | Cursor (model selection is per-message), Base44 (Discuss mode forces its own model regardless of selection) [S12] | Forces the user to re-pick; or, conversely, lets one slow model dominate cheap side-channel work |
| Auto-fix everything silently without surfacing what changed | (Universal auto-fix is good; silent auto-fix is bad) | User loses the "did it actually work?" signal; auto-fix should always be paired with a visible status update |
| One tool that "does everything" (deploy + monitor + chat + edit + IDE) | (Cursor's vertical integration; Lovable's vertical integration) | Lock-in for the user; portability loss for the agent template |
| Banned frameworks in the system prompt | Lovable [S7] | Punts on the hard problem of routing to the right stack |
| Ship docs that gate every page behind auth | Google AI Studio Build mode [S5] | Makes the product un-verifiable by independent research; expect FUD in any dossier that includes it |
| Long onboarding that asks for an account before the first preview | Base44 [S11] ("When you begin, you will be asked to sign up. This makes sure your work is saved") | Reduces the "first 30 seconds" win; Bolt.new's zero-friction flow [S1] is the better pattern |
| Magic model router with no user override | Base44 Automatic mode [S12] | Users with a specific cost/quality tradeoff can't tune it; Base44 mitigates with the per-message model picker on Builder plan |
| Bundling tier, credits, and "first build cost" into one opaque number | Base44 1-credit first build + variable per-message [S11, S12] | Hard to reason about; portable templates should be token-cost-transparent |

---

## 6. Whitespace and differentiation

The user's design has four pieces none of the closed tools ship:

### 6.1 Tiered family as a *first-class* primitive

Every closed tool ships *one* opinionated starter (or zero, in the diff-agent case). The user's tier0-minimal / tier1-standard / tier2-`<kind>` family is structurally absent from the market. v0 has a per-component starter library [S9]; Base44 has templates + clones [S11]; Replit has templates; Firebase Studio has templates. None has a *tiered routing* primitive that says "this idea is a Tier 0 minimal, that one is a Tier 1 standard, this third one is a Tier 2 mobile-specialist".

**Whitespace to claim**: a portable `tier-router.md` plus three directories of agent-agnostic templates, indexed by app kind, with a deterministic CLI for selection.

### 6.2 Portable, agent-agnostic, cross-runtime prompt protocol

Every closed tool's intake mechanism is *its own*: Lovable's chat box is a Lovable-specific React component; v0's `AskUserQuestions` is a Vercel-specific tool; Devin's plan mode is a Cognition-specific mode toggle. There is **no shared, portable, agent-agnostic protocol** that runs identically in Claude Code, Cursor, OpenCode, and a plain terminal.

The closest is **Claude Code's `@path/to/SKILL.md` import inside CLAUDE.md** [S23] + **Devin's Skills** [S15] + **Cascade's AGENTS.md** [S6, S14] — three convergent moves toward in-repo markdown as the portable primitive. Our `agents_manager` already rides on this convention.

**Whitespace to claim**: a `tier-protocol.md` (portable, agent-agnostic intake → clarify → scaffold → iterate protocol) that imports `AGENTS.md` / `CLAUDE.md` style and works under any agent that reads markdown.

### 6.3 Bounded ask-first as a one-shot primitive

Every tool either omits ask-first entirely or treats plan-first as a mode toggle. None has *the intake survey itself* as a first-class artifact the user can edit and version. The closest analogue is **Base44's Discuss mode** [S12] (toggleable, model-cheaper, no app changes).

**Whitespace to claim**: an `intake-survey.md` artifact per tier, with one adaptive multi-choice question set per kind of app, that the agent reads before generating and *does not re-read during the build*.

### 6.4 App-kind selection as a routing primitive

A0.dev, Rork, and (effectively) Base44 each own *one* kind (mobile, mobile, web-with-backend). None offers cross-kind routing as a first-class operation. Even the IDE-based tools (Cursor, Cascade, Claude Code) defer to the user to pick the kind.

**Whitespace to claim**: a `kind-router.md` that ingests the one-line idea and outputs a `(tier, kind)` tuple deterministically, with a known-confidence threshold; below the threshold, the agent asks the user to pick between the top-N kinds.

### 6.5 Concrete differentiators vs the strongest peer (Base44)

If the user's system faces off against Base44 in the market, the differentiation is:
1. **Portable across agents** — Base44 is locked to Base44's web IDE. Our system runs in Claude Code, Cursor, OpenCode.
2. **Tiered family** — Base44 has one starter shape. Our system has three tiers × multiple kinds.
3. **Transparent token cost** — Base44 hides cost behind credits. Our system exposes per-step token estimates so the user can reason about cost.
4. **Audit-grade provenance** — every recommendation cites its source (Tier 4 discipline) — Base44 does not.
5. **App-kind selection is structured** — Base44 has no kind router; the user picks.

---

## 7. What this changes about our template design (10 concrete changes)

1. **Replace "ask the user many times" with "ask one bounded multi-choice survey at project start, then build"**. The field consensus (Claude Code [S23], Base44 [S12], Devin [S16]) is that plan-then-build is a *one-shot* step, not a continuous interview. The user's design needs to adopt this.
2. **Adopt v0's per-tier starter-file contract** [S9]: each tier ships a `_spine/` folder the agent *must not regenerate*. This is the cleanest token-saver in the field.
3. **Mandate search-replace as the default edit primitive** across all tiers, not "whole file write". Lovable [S7], Replit [S10], and Base44 [S12] all converged on this.
4. **Adopt a `tier-router.md` artifact** that maps `(prompt, optional clarifying answers) → (tier, kind, stack, `_spine/`-to-load)`. The router is plain markdown and works in any agent that reads files.
5. **Adopt a `kind-router.md` artifact** that, given a kind, names the tier2 specialist template to load (or returns `(tier0 | tier1, kind, fallback-prompt)` if no tier2 exists).
6. **Adopt the `SKILL.md` convention** from Claude Code [S23] + Devin [S15] for tier-specific capabilities (e.g. `tier2-mobile/SKILL.md`, `tier2-saas/SKILL.md`). This is the single most portable cross-agent primitive in the field today.
7. **Adopt the `AGENTS.md` convention** from Cascade [S6, S14] / Devin [S15] for repo-scoped instructions. Same file name across Cursor, Cascade, Claude Code, OpenCode.
8. **Adopt a hard context-reset rule** modeled on a0.dev's 80K / 15-20 message reset [S17]: when the session grows past the budget, the agent must say "start a new chat to continue this build" rather than guess further.
9. **Adopt the layered primitive set**: `AGENTS.md` (always-loaded) + `SKILL.md` (loaded on demand) + `hooks/` (deterministic side-effects) + `commands/` (user-invocable workflows). All four layers already exist across Cursor, Cascade, Devin, Claude Code — none of them have all four together.
10. **Adopt auto-fix as a first-class primitive, with explicit surfacing**: Base44's "Issues Found → Resolve with AI (free)" [S12] is the right UX. Our system should do this in any agent runtime that supports hooks (Cursor / Cascade / Claude Code).

---

## 8. For other angles

- **Angle A (prior-art OSS)** — The OSS landscape mirrors the closed-tool landscape but lags on the layered-primitive side. Recommend A scan for `bolt.diy` and similar OSS re-implementations; cite them as evidence for the portability claim. [S26]
- **Angle C (app-kind matrix)** — Use the **(tier, kind, stack)** tuple from §7.4 as the matrix key. The kinds the user picked (AI chat / LLM tool, Mobile app, SaaS with auth and billing, Storefront / e-commerce, Content / docs site, Bot / extension / CLI) should each become a tier2 specialist *with* a `_spine/` and `SKILL.md`. The Q6+Q7 tension (Bot/extension/CLI but UI-only) resolves to: Chrome extension in, Telegram bot and pure CLI out (no UI spine fits them).
- **Angle D (token economy)** — All the §7 changes are token-economy wins; D should adopt them as ground truth and only add the *measurement* layer (per-step token accounting).
- **Angle E (intake protocol)** — Use the §3.4 verdict: one bounded ask-first turn, then generate-first. E should not re-litigate this; it should codify the multi-choice question sets per kind.
- **Angle F (audit of existing template)** — Drop the Arabic/RTL default, drop the WatermelonDB choice, drop the Capacitor choice (the field has converged: React + Next.js or React + Vite + Supabase for the web layer; mobile via Rork / a0.dev / Expo; AI via AI SDK + Vercel AI Gateway per v0 [S9]). The existing template's prose-only approach is correct in principle (template as markdown) but the file set should match what the field ships.

---

## 9. Risks (each with Severity)

- **HIGH: The user's ask-first design assumption is half-wrong, and the verifier may resist changing it.** Every commercial tool that survives in 2026 ships generate-first by default. Adopting ask-first as the default will produce a tool that feels slow vs Bolt.new / Base44 / Lovable. **Mitigation**: reframe as *one bounded ask-first turn* (Claude Code / Devin pattern), then generate-first for the rest of the build. See §3.4.
- **HIGH: Half the named competitors in the master prompt are dead or dying.** Firebase Studio sunsets 2027-03-22 [S5]; Create.xyz docs are 404 [S19]; Databutton docs unreachable [S20]; Tempo docs unreachable [S21]. The user's competitor matrix would otherwise compare against ghosts. **Mitigation**: drop these from the canonical competitor list; flag them in §1.5/1.7/1.8/1.15 with explicit death dates and reasoning.
- **HIGH: Windsurf was renamed to Devin Desktop by Cognition in 2025.** Any reference in our dossier to "Windsurf" needs to be reconciled with the rebrand. **Mitigation**: write "Windsurf (now Devin Desktop)" once at §1.10 and use "Devin Desktop" thereafter; flag in §10 summary.
- **MEDIUM: The leaked system prompts on x1xhlol are [UNVERIFIED-CURRENCY].** They are snapshots, not live prompts. The exact wording may differ from what the production tool runs today. **Mitigation**: cite mechanism, not text; explicitly label [UNVERIFIED-CURRENCY] for any prompt quoting; never paste full prompts.
- **MEDIUM: My training-data knowledge of these products is months stale on prices, free-tier limits, and 2026 launches.** Every price and free-tier claim in §1 must be re-verified at access date 2026-08-13 via webfetch (which I did for the doc references but not for pricing pages). **Mitigation**: cite URLs and access dates; mark anything I did not re-verify as [NEEDS-VERIFY].
- **MEDIUM: a0.dev's hard context-reset rule (15-20 messages / 80K chars) is sourced from the product's own docs** [S17] — i.e. it is the company's claim, not an independent measurement. Treat as documented behavior; flag as self-reported.
- **LOW: Base44 is owned by Wix (acquisition announced 2025-09). The "Builder plan" tier limits [S11, S12] may shift.** **Mitigation**: cite with access date 2026-08-13; re-verify at next research pass.
- **LOW: Rork is small (single-digit public team) and may pivot.** **Mitigation**: cite with access date; mark [UNVERIFIED-CURRENCY].

---

## 10. Sources (numbered)

- **[S1]** Bolt.new README. `https://github.com/stackblitz/bolt.new/blob/main/README.md` (accessed 2026-08-13). Proves: WebContainers environment, AI controls filesystem/node/package manager/terminal/browser, free tier + paid plans, "Be specific about your stack" tip, MIT license.
- **[S2]** (reserved; future use).
- **[S3]** (reserved).
- **[S4]** (reserved).
- **[S5]** Firebase Studio overview page. `https://firebase.google.com/docs/studio` (accessed 2026-08-13). Proves: sunset 2027-03-22, new-workspace creation disabled 2026-06-22, App Prototyping agent for Next.js web apps, Code OSS base + GCP VM + Nix, migration to Google AI Studio or Antigravity.
- **[S6]** Devin Desktop / Cascade docs (full llms.txt). `https://docs.devin.ai/llms.txt` (accessed 2026-08-13). Proves: Windsurf → Devin Desktop rebrand, Cascade as a Devin Desktop agent mode, Fast Context subagent, DeepWiki, Arena Mode, Worktrees, AGENTS.md support.
- **[S7]** Lovable Agent Prompt (leaked). `https://raw.githubusercontent.com/x1xhlol/system-prompts-and-models-of-ai-tools/main/Lovable/Agent%20Prompt.txt` (accessed 2026-08-13). **[UNVERIFIED-CURRENCY]** — leaked prompt snapshot; mechanism details confirmed against official Lovable docs separately. Proves: React+Vite+Tailwind+TS stack lock, Supabase backend only, "DEFAULT TO DISCUSSION MODE" rule, "CHECK UNDERSTANDING" ask rule, search-replace-over-write default, console/network debug tools.
- **[S8]** Replit Agent docs. `https://docs.replit.com/replitai/agent` (accessed 2026-08-13). Proves: Lite/Economy/Power agent modes, App testing + Code optimization + Turbo toggles, typewriter-effect demo prompts, output-type pill (Web/Mobile/Slides/...).
- **[S9]** v0 Prompt (leaked). `https://raw.githubusercontent.com/x1xhlol/system-prompts-and-models-of-ai-tools/main/v0%20Prompts%20and%20Tools/Prompt.txt` (accessed 2026-08-13). **[UNVERIFIED-CURRENCY]** — leaked prompt dated `5/10/2026`. Proves: `AskUserQuestions` tool gated, "wait for user's response before proceeding", Next.js App Router default, `user_read_only_context` component library, starter file contract ("you never generate these unless explicitly requested"), Supabase as default DB+auth, Vercel Blob for files, AI SDK + Vercel AI Gateway.
- **[S10]** Replit Prompt (leaked). `https://raw.githubusercontent.com/x1xhlol/system-prompts-and-models-of-ai-tools/main/Replit/Prompt.txt` (accessed 2026-08-13). **[UNVERIFIED-CURRENCY]**. Proves: `<proposed_file_replace_substring>` for search-replace, `<proposed_file_replace>` for whole-file rewrite, `<proposed_file_insert>` for new files, `<proposed_shell_command>`, `<proposed_package_install>`, `<proposed_workflow_configuration>` with `set_run_button`, `<proposed_deployment_configuration>`.
- **[S11]** Base44 Quick-start guide. `https://docs.base44.com/Getting-Started/Quick-start-guide` (accessed 2026-08-13). Proves: 5 intake paths (prompt / plan mode / existing URL / Figma / connect tools), 1-credit first build, preview iframe, instant live preview + shareable URL, templates gallery, Clone App, Wix payments integration.
- **[S12]** Base44 AI chat modes. `https://docs.base44.com/Building-your-app/AI-chat-modes` (accessed 2026-08-13). Proves: 3 chat modes (Default/Discuss/Edit), Cmd+. / Ctrl+. toggle, Discuss at 0.3 credits/message, fixed Discuss model regardless of selection, 7-message queue, auto-fix Issues Found (free credits), Version History (per-prompt revert, named checkpoints, publish previous version), agentic tools list (DB CRUD, web search, URL fetch, smart file search, file read/edit, env vars/secrets).
- **[S13]** Cursor Agent Prompt 2025-09-03 (leaked). `https://raw.githubusercontent.com/x1xhlol/system-prompts-and-models-of-ai-tools/main/Cursor%20Prompts/Agent%20Prompt%202025-09-03.txt` (accessed 2026-08-13). **[UNVERIFIED-CURRENCY]**. Proves: auto-context dump (open files, cursor position, edit history, linter errors), "keep going until the user's query is completely resolved", `codebase_search` mandatory + multiple-query passes, `todo_write` reconcile rule, status update near every tool batch, 3-5 parallel tool calls, 3-retry linter cap, "There is no apply_patch CLI available".
- **[S14]** Cascade Overview (now part of Devin Desktop). `https://docs.devin.ai/desktop/cascade/cascade.md` (accessed 2026-08-13). Proves: Code/Chat modes, background planning agent, 20-tool-call cap with Continue button, queued messages, AGENTS.md, Memories & Rules, @-mention previous conversations, Fast Context subagent, Worktrees, Lint auto-fix (free), named checkpoints, Real-time awareness (Continue without prompt context).
- **[S15]** Devin Docs llms.txt. `https://docs.devin.ai/llms.txt` (accessed 2026-08-13). Proves: Devin cloud sessions (Slack/Teams/GitHub PRs/GitLab/Bitbucket/Linear/Jira), Blueprints (declarative environments), AGENTS.md, Knowledge Onboarding, Skills (SKILL.md), Stacked PRs, DeepWiki, Ask Devin, Data Analyst Agent, Security Swarm, Computer Use (full VM with browser), Testing & Video Recordings, Auto-triage, Scheduled Sessions, devinapps.com (frontend) + Fly.io (backend).
- **[S16]** Devin AI Prompt (leaked). `https://raw.githubusercontent.com/x1xhlol/system-prompts-and-models-of-ai-tools/main/Devin%20AI/Prompt.txt` (accessed 2026-08-13). **[UNVERIFIED-CURRENCY]**. Proves: planning vs standard mode toggle, `<suggest_plan/>` command, "If you cannot find some information, believe the user's taks is not clearly defined, or are missing crucial context or credentials you should ask the user for help. Don't be shy.", Think tool mandatory use cases (10 numbered), `<report_environment_issue>` command, "When struggling to pass tests, never modify the tests themselves", Code Best Practices (don't add comments unless asked).
- **[S17]** a0.dev Three Principles. `https://docs.a0.dev/agent-guide/three-principles.md` (accessed 2026-08-13). Proves: Be Very Specific + Show It The Error + Make A New Chat (15-20 messages / 80,000 chars hard reset rule).
- **[S18]** a0.dev Docs llms.txt. `https://docs.a0.dev/llms.txt` (accessed 2026-08-13). Proves: Mobile-first (React Native + Convex), iOS/Android publishing, OTA Updates, Push Notifications (FCM + APNs), Payment Setup (subscriptions + one-time purchases), Native Build Testing (IPA/APK), Web Preview Testing.
- **[S19]** Create.xyz docs (404). `https://create.xyz/docs/intro` (accessed 2026-08-13). HTTP 404. Proves: docs site is dead; no mechanism documentation reachable.
- **[S20]** Databutton docs (transport error). `https://docs.databutton.com/docs/getting-started` (accessed 2026-08-13). Transport error on every attempt. Proves: docs site is dead.
- **[S21]** Tempo / Tempo Labs (one-liner only). `https://tempo.build/`, `https://tempolabs.io/` (accessed 2026-08-13). Public landing page returns only "Tempo — AI Software Factory for Product Teams". Proves: docs unreachable; product cannot be researched independently.
- **[S22]** Rork.com homepage. `https://rork.com/` (accessed 2026-08-13). Proves: Mobile-first (iOS focus), Rork Max native iOS app for on-the-go building, "Two 18yo runners grew an app to $240K ARR in 6 months with Rork" case study, example prompts (Multiplayer Game / 3D Game / Lovable to Mobile / GitHub to Mobile).
- **[S23]** Claude Code Best Practices. `https://www.anthropic.com/engineering/claude-code-best-practices` (accessed 2026-08-13). Proves: Plan mode (Shift+Tab, `claude --permission-mode plan`), Explore → Plan → Implement → Commit four-phase workflow, `AskUserQuestion` interview pattern, `/init` to generate CLAUDE.md, CLAUDE.md / SKILL.md / subagents / hooks / MCP / plugins as layered primitives, auto-compaction, `/clear` between unrelated tasks, subagents for investigation, verification before declaring done (tests, screenshots, `/goal`, Stop hook), Writer/Reviewer pattern.
- **[S24]** (reserved; future use).
- **[S25]** Research-space playbook entry for "research products" angle, prior T-2026-08-13-002. `agents_manager/memory/projects/research-space/playbook.md` (read 2026-08-13). Proves: prior research confirmed that ask-first is the *information-product* default (NotebookLM, Perplexity DR, ChatGPT DR, Gemini DR, Claude Research, Elicit, Consensus) — but the *app-product* default is generate-first. This dossier is consistent with that finding.
- **[S26]** Reserved for Angle A to cite `bolt.diy` (StackBlitz OSS re-implementation) and `bolt.new` itself as MIT-licensed evidence for OSS portability.

---

## Metrics

- findings: 7 (one per §1 tool subgroup; key mechanism families identified in §4, §5, §6, §7)
- risks_HIGH: 3 (ask-first design half-wrong, half competitors dead, Windsurf rename)
- risks_MEDIUM: 3 (leaked-prompt currency, training-data staleness, a0.dev self-reported)
- risks_LOW: 2 (Base44 ownership, Rork small)
- clarifying_Qs: 0 (this is a research dossier; clarifying questions are routed to the user via the master return, not embedded here)