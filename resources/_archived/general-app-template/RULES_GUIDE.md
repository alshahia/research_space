# Hard Rules for Building Apps

## DO (Always)

- Use `React 18` with functional components and hooks
- Use `TypeScript strict mode` — define interfaces for all data
- Use `Tailwind v4` with `@tailwindcss/vite` (NO postcss.config.js)
- Use `clsx` + `tailwind-merge` `cn()` utility for className merging
- Use `motion` library for animations (NOT framer-motion directly)
- Use `lucide-react` for icons
- Use `react-router-dom v7` for routing
- Lazy load every page with `React.lazy()` + `Suspense`
- Use `watermelondb` with `LokiJS adapter` for mobile data
- Use `better-sqlite3` for web server data
- Organize API functions into `src/lib/api/` modules
- Spread API modules into a single `api` object in `utils.ts`
- Call `logCreate/logUpdate/logDelete` in every data mutation
- Use `database.write()` for all WatermelonDB mutations
- Use `database.get('collection').create/update/query` pattern
- Provide `DBProvider` wrapping the app root
- Set RTL direction via `dir="rtl"` on `<html>`
- Use Arabic (`ar`) as the UI language
- Use `@` path alias pointing to project root
- Add `experimentalDecorators: true` + `useDefineForClassFields: false` in tsconfig
- Add babel decorator plugins in vite config
- Export `database` from `src/db/index.ts` as a singleton
- Handle loading states with a spinner
- Handle empty states with a placeholder message
- Handle error states with try/catch and user feedback

## DO NOT (Never)

- **NEVER** use `any` type — define proper interfaces
- **NEVER** write comments in code
- **NEVER** use class components (except ErrorBoundary)
- **NEVER** use inline styles — use Tailwind classes only
- **NEVER** create `postcss.config.js` or `tailwind.config.js` (Tailwind v4)
- **NEVER** use emotion, styled-components, or CSS-in-JS
- **NEVER** use regular `<div>` when `motion.div` animation is better
- **NEVER** fetch data outside of `useEffect` or event handlers
- **NEVER** mutate state directly — use `setState` setter functions
- **NEVER** use `// @ts-ignore` or `// eslint-disable-next-line`
- **NEVER** commit secrets or API keys in code
- **NEVER** use `var` — use `const`/`let`
- **NEVER** use `for` loops when array methods work (map/filter/reduce)
- **NEVER** use `document.title` directly — use a hook or effect
- **NEVER** use `eval()` or `new Function()`
- **NEVER** import from `react` unnecessarily (React is auto-imported with jsx: react-jsx)
- **NEVER** add test framework unless explicitly required

## Code Style Rules

- PascalCase for: component files, page files, context files, model files, interfaces, types
- camelCase for: utility files, functions, variables, hooks
- kebab-case for: api module files, CSS classes, routes, folder names (preferred)
- UPPER_SNAKE_CASE for: constants
- Interfaces should NOT have an `I` prefix (use `User` not `IUser`)
- Exports: use `export default function` for components and pages
- Exports: use `export function` for API utilities
- Props interface: define inline or in file, suffix with `Props`
- One component per file (except tiny sub-components used only in that file)

## File Size Rules

- Max ~500 lines per file. Split large files into modules.
- API modules: one domain per file.
- Page files: keep logic lean — extract modals and sub-components.
- CSS files: only `index.css` at root (Tailwind + theme variables).

## Import Order

1. React/hooks
2. Third-party libraries (react-router, motion, lucide, recharts)
3. Internal lib/utils (api, cn, types)
4. Components
5. Context hooks
6. CSS (only in main.tsx)

## Audio Pattern

Use Web Audio API for sound effects (no audio files):
```ts
const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
const oscillator = audioContext.createOscillator();
oscillator.connect(audioContext.destination);
oscillator.start();
oscillator.stop(audioContext.currentTime + 0.2);
```

## Export/Import Pattern

```ts
// api/accounts.ts
export async function getAccounts() { ... }

// utils.ts
import * as accountsModule from './api/accounts';
export const api = { ...accountsModule };

// pages/AccountsPage.tsx
import { api } from '../lib/utils';
```

## Theme System

The app supports multiple themes via `data-theme` attribute on `<html>`:
- `blue` (default), `green`, `dark`, `slate`, `purple`, `orange`, `custom`
- Custom colors via `--amin-primary` and `--amin-accent` CSS variables
- Glassmorphism effect via `.glass-effect` class
- Gradient background via `.gradient-bg` class
- Border radius via `--amin-radius` CSS variable

All theme settings are stored in `SettingsContext` and persisted.

## Mobile Patterns

- File storage: use `@capacitor/filesystem` with `Documents` directory
- File picker: use `@capawesome/capacitor-file-picker`
- Printing: use `@capgo/capacitor-printer`
- Notifications: use `@capacitor/local-notifications`
- Platform detection: `Capacitor.isNativePlatform()`
- App state handling: `App.addListener('appStateChange', ...)`

## Server Pattern

- Express server serves as both API backend and Vite dev middleware
- better-sqlite3 for server-side persistence
- API routes at `/api/*`
- Security headers on all responses
- Optional Bearer token auth via `API_KEY` env var
- WAL mode for SQLite performance
