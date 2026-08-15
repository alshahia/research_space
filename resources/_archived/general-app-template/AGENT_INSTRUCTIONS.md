# Agent Instructions: Building a New App

This document is for AI agents tasked with building a new app based on this template. Follow these instructions step by step.

---

## Phase 1: Understand the Template

1. Read `SYSTEM_PROMPT_AGENT.md` first — this is your core behavior guide.
2. Read `APP_ARCHITECTURE_GUIDE.md` — this defines the architecture.
3. Read `RULES_GUIDE.md` — the hard rules you must follow.
4. Read `REFERENCES.md` — see working examples from the reference project.

## Phase 2: Scaffold the Project

1. Create the project folder.
2. Copy `package.json` template, adjust name, version.
3. Create `tsconfig.json`, `vite.config.ts`, `vitest.config.ts`, `index.html`, `capacitor.config.ts`.
4. Run `npm install`.
5. Create the full `src/` directory structure:
   - `src/main.tsx`
   - `src/App.tsx`
   - `src/index.css`
   - `src/components/`
   - `src/pages/`
   - `src/context/`
   - `src/lib/` + `src/lib/api/`
   - `src/db/` + `src/db/models/`
   - `src/types/`

## Phase 3: Define Data Layer

1. Define your domain model interfaces in `src/lib/types.ts`.
2. Create WatermelonDB schema in `src/db/schema.ts`.
3. Create WatermelonDB migration steps in `src/db/migrations.ts`.
4. Create model classes in `src/db/models/*.ts`.
5. Register models in `src/db/index.ts`.
6. Create API modules in `src/lib/api/*.ts`.
7. Wire up the `api` object in `src/lib/utils.ts`.

## Phase 4: Create Context Providers

1. Create settings/configuration context.
2. Create notification context (with polling if needed).
3. Wire them in `App.tsx`.

## Phase 5: Build UI Components

1. Build the `Layout` component (sidebar + header).
2. Build shared components: `ConfirmModal`, `ErrorBoundary`, notification bell.
3. Build domain-specific modals/components.

## Phase 6: Build Pages

1. Build Dashboard page.
2. Build CRUD pages for each domain.
3. Build Settings page.
4. Wire all routes in `App.tsx`.
5. Lazy load every page.

## Phase 7: Connect Server

1. Create `server.ts` with Express.
2. Add API routes for each domain.
3. Add security headers and auth middleware.
4. Wire Vite middleware for dev mode.

## Phase 8: Verify

1. Run `npm run lint` (tsc --noEmit) — fix all errors.
2. Run `npm run dev` — test manually.
3. Verify mobile build: `npx cap sync && npx cap run android`.

---

## Communication with User

- Report progress after each phase.
- Ask for clarification if requirements are ambiguous.
- Suggest optimizations when you see potential issues.
- Never assume a feature — ask.
