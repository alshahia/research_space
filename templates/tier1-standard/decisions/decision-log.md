# Decision log — tier1-standard

Append-only. Record every build-time decision with date, author, and reason. Per `01_RECOMMENDED_DESIGN.md` Decision 5.

## Entries

| Date | Author | Decision | Reason |
|---|---|---|---|
| 2026-08-14 | am-coder (Phase 3.1) | Spine uses Vite + React + TypeScript (not Next.js 16). | Spec scope mentions "Next.js 16" but file list is Vite-shaped (`vite.config.ts` OR `next.config.ts` + `src/main.tsx` + `src/App.tsx`). Vite matches the literal file list with zero scope expansion; tier2 templates add Next.js when needed. |
| 2026-08-14 | am-coder (Phase 3.1) | Dropped `next` + `@clerk/nextjs` from `package.json` deps. | Spine is Vite-shaped; `@clerk/nextjs` requires Next.js. tier2-saas-bundle adds both when migrating to production tier1. Surface in coder summary as deviation. |
| 2026-08-14 | am-coder (Phase 3.1) | Pinned `tailwindcss ^4.3.3` + added `@tailwindcss/vite ^4.3.3`. | Tailwind v4 requires the Vite plugin for CSS-first `@theme` blocks. |
| 2026-08-14 | am-coder (Phase 3.1) | Audit log is kind-agnostic + storage-adapter pattern (not WatermelonDB-coupled). | Per `01_RECOMMENDED_DESIGN.md` Decision 3 ("What is checked in"); reverses the old `resources/general-app-template/APP_ARCHITECTURE_GUIDE.md:566-588` WatermelonDB coupling. |
| 2026-08-14 | am-coder (Phase 3.1) | Vitest smoke test renders `<App />` via `@testing-library/react`; not Next.js routing. | Vite + React + Vitest + jsdom is the simplest path that satisfies done-when; tier2 templates that add Next.js can swap to Next.js-aware smoke tests. |
