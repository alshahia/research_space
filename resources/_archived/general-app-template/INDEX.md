# General App Template — Index

This folder contains everything an AI agent needs to build a full-stack React+TypeScript application following the patterns, architecture, and conventions of the reference project.

## File Map

| File | Purpose | Who reads it |
|---|---|---|
| `SYSTEM_PROMPT_AGENT.md` | Master system prompt for the building agent | Agent (first) |
| `APP_ARCHITECTURE_GUIDE.md` | Complete architecture reference with code patterns | Agent |
| `RULES_GUIDE.md` | Hard rules — DO and DO NOT | Agent |
| `AGENT_INSTRUCTIONS.md` | Step-by-step building workflow | Agent |
| `REFERENCES.md` | Real code examples from working project | Agent |
| `REFERENCES_STYLE_SYSTEM.md` | Design tokens, CSS classes, animation patterns | Agent |
| `PACKAGE_TEMPLATE.json` | Ready-to-use package.json (copy + rename) | Builder |
| `QUICK_START.md` | 9-step guide to scaffold a new app | Human + Agent |

## Reading Order for Agents

1. `SYSTEM_PROMPT_AGENT.md` — sets behavior and constraints
2. `APP_ARCHITECTURE_GUIDE.md` — learn the full architecture
3. `RULES_GUIDE.md` — learn what NOT to do
4. `AGENT_INSTRUCTIONS.md` — follow the 8-phase workflow
5. `REFERENCES.md` — reference examples while coding
6. `REFERENCES_STYLE_SYSTEM.md` — reference for CSS/design

## Customization Points

When building a new app, you MUST customize:

1. **App name** in `package.json`, `index.html` `<title>`, `capacitor.config.ts`
2. **Data models** in `src/lib/types.ts`, `src/db/schema.ts`, `src/db/models/`
3. **API modules** in `src/lib/api/*.ts`
4. **Navigation** in `src/components/Layout.tsx`
5. **Routes** in `src/App.tsx`
6. **Theme colors** in `src/index.css` `:root` variables
7. **Server routes** in `server.ts`

## What Stays the Same

These should NOT change between apps (just the data/content changes):

- `src/main.tsx` entry point pattern
- `src/App.tsx` provider nesting + lazy loading pattern
- `src/components/Layout.tsx` sidebar/header structure
- `src/lib/audit.ts` logging pattern
- `src/lib/utils.ts` `cn()` function + `api` object pattern
- `src/db/DatabaseProvider.tsx`
- `vite.config.ts`, `tsconfig.json`, `vitest.config.ts`
- `src/index.css` theme system structure (colors can change)
- `server.ts` Express + Vite middleware pattern
