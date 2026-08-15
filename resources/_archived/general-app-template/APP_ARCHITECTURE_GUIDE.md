# General App Architecture Guide

This guide defines the architecture, file structure, and conventions for building a React + TypeScript app using the stack below. It is designed for both **Web (Express + Vite)** and **Android (Capacitor)**.

---

## 1. Technology Stack (Approved List)

| Category | Technology | Version/Notes |
|---|---|---|
| **UI Framework** | React 18 | `^18.0.0` |
| **Language** | TypeScript | `~5.8.2`, strict mode |
| **Build Tool** | Vite 6 | `^6.2.0` with `@vitejs/plugin-react` (babel) |
| **CSS** | Tailwind CSS v4 | `^4.1.14` via `@tailwindcss/vite` plugin |
| **Animations** | motion | `^12.23.24` |
| **Icons** | lucide-react | `^0.546.0` |
| **Routing** | react-router-dom v7 | `^7.14.0` |
| **Utility** | clsx + tailwind-merge | `cn()` utility |
| **Charts** | recharts (optional) | `^3.8.1` |
| **PDF** | jspdf + html2canvas | `^4.2.1`, `^1.4.1` |
| **Mobile DB** | WatermelonDB | `^0.28.0`, LokiJS adapter |
| **Mobile** | Capacitor v8 | `@capacitor/core`, `@capacitor/android` |
| **Server** | Express + better-sqlite3 | web dev server + API |
| **Dev Runner** | tsx | dev mode `tsx server.ts` |
| **Testing** | Vitest | `^4.1.10` (only if required) |

## 2. Project Structure

```
project-root/
├── server.ts                  # Express server (web entrypoint)
├── package.json
├── tsconfig.json
├── vite.config.ts             # Vite + babel decorators + tailwind
├── vitest.config.ts           # (optional) test config
├── capacitor.config.ts        # Android config
├── index.html                 # Root HTML (lang="ar" dir="rtl")
├── public/
│   └── manifest.json          # PWA manifest
├── src/
│   ├── main.tsx               # React root + DBProvider
│   ├── App.tsx                # Router + providers + layout
│   ├── index.css              # Tailwind import + theme CSS variables
│   ├── components/            # Shared components
│   │   ├── Layout.tsx         # Main layout (sidebar + header)
│   │   ├── ErrorBoundary.tsx  # Error boundary wrapper
│   │   ├── ConfirmModal.tsx   # Confirmation dialog
│   │   ├── NotificationBell.tsx
│   │   └── ...                # Other shared components
│   ├── pages/                 # Page files (organized by module)
│   │   ├── Dashboard.tsx
│   │   ├── SettingsPage.tsx
│   │   └── ...                # Module subdirectories
│   ├── context/               # React Context providers
│   │   ├── NotificationContext.tsx
│   │   └── SettingsContext.tsx
│   ├── lib/                   # Shared utilities & business logic
│   │   ├── utils.ts           # cn(), api object, types, helpers
│   │   ├── types.ts           # All TypeScript interfaces
│   │   ├── api/               # Data access modules (one per domain)
│   │   │   ├── index.ts       # Re-exports all modules
│   │   │   ├── accounts.ts
│   │   │   ├── transactions.ts
│   │   │   └── ...
│   │   ├── audit.ts           # Audit logging (logCreate/Update/Delete)
│   │   └── ...                # Other utilities
│   ├── db/                    # WatermelonDB setup (mobile only)
│   │   ├── index.ts           # Database instance + model registration
│   │   ├── schema.ts          # appSchema + tableSchema
│   │   ├── migrations.ts      # Schema migrations
│   │   ├── DatabaseProvider.tsx # React wrapper
│   │   └── models/            # WatermelonDB Model classes
│   └── types/                 # Ambient type declarations
│       └── *.d.ts
├── resources/                 # Static resources (images, seeds)
└── scripts/                   # Utility scripts
```

## 3. Config Files

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
    "module": "ESNext",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "isolatedModules": true,
    "moduleDetection": "force",
    "allowJs": true,
    "jsx": "react-jsx",
    "paths": { "@/*": ["./*"] },
    "allowImportingTsExtensions": true,
    "noEmit": true
  }
}
```

### vite.config.ts
```ts
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react({
        babel: {
          plugins: [
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            ['@babel/plugin-proposal-class-properties', { loose: true }],
          ],
        },
      }),
      tailwindcss(),
    ],
    resolve: { alias: { '@': path.resolve(__dirname, '.') } },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          },
        },
      },
    },
    server: { hmr: process.env.DISABLE_HMR !== 'true' },
  };
});
```

### index.html
```html
<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#1e3a8a" />
    <link rel="manifest" href="/manifest.json" />
    <title>App Name</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

## 4. Application Boot Sequence

```
main.tsx
  └─ StrictMode
       └─ DBProvider (WatermelonDB)
            └─ App.tsx
                 ├─ Router (BrowserRouter)
                 ├─ SettingsProvider
                 ├─ NotificationProvider
                 ├─ Layout
                 │   ├─ Sidebar (Navigation groups + items)
                 │   └─ Main Content Area
                 └─ ErrorBoundary
                      └─ Suspense (LoadingSpinner)
                           └─ Routes (lazy-loaded pages)
```

### main.tsx Pattern
```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { DBProvider } from './db/DatabaseProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DBProvider>
      <App />
    </DBProvider>
  </StrictMode>,
);
```

### App.tsx Pattern
```tsx
import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { NotificationProvider } from './context/NotificationContext';
import { SettingsProvider } from './context/SettingsContext';
import ErrorBoundary from './components/ErrorBoundary';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-amin-blue border-t-transparent" />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <SettingsProvider>
        <NotificationProvider>
          <Layout>
            <ErrorBoundary>
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </Layout>
        </NotificationProvider>
      </SettingsProvider>
    </Router>
  );
}
```

## 5. Layout Pattern

Layout has a responsive sidebar (collapsible groups) and a top header bar. The sidebar uses `NavLink` for active state detection.

Key elements:
- **Sidebar groups**: collapsible sections with `SidebarGroup` and `SidebarItem` subcomponents
- **Header**: company logo/brand, theme controls, notification bell, user menu
- **Mobile**: hamburger menu toggle with overlay backdrop
- **Full-page mode**: `isFullPage` hides sidebar/header on `/new` and `/edit` routes

## 6. Data Layer Pattern

### API Modules (`src/lib/api/`)
Each business domain gets a module file that exports async functions:
- `getXxx()` — fetch records
- `createXxx()` — create record (wraps in `database.write`)
- `updateXxx()` — update record
- `deleteXxx()` — delete record

All modules are spread into a single `api` object in `utils.ts`:
```ts
import * as accountsModule from './api/accounts';
import * as transactionsModule from './api/transactions';

export const api = {
  ...accountsModule,
  ...transactionsModule,
  // ... more modules
};
```

### CRUD Pattern (WatermelonDB)
```ts
import { database } from '../../db';
import { Q } from '@nozbe/watermelondb';
import { logCreate, logUpdate, logDelete } from '../audit';

export async function getItems(): Promise<Item[]> {
  const records = await database.get('items').query().fetch();
  return records.map(r => ({ ...r._raw, id: r.id }));
}

export async function createItem(data: Partial<Item>) {
  const record = await database.write(async () => {
    return await database.get('items').create((r: any) => {
      r.name = data.name;
      r.code = data.code;
    });
  });
  logCreate('Item', record.id);
  return { ...record._raw, id: record.id } as Item;
}

export async function updateItem(id: string, data: Partial<Item>) {
  const record = await database.get('items').find(id);
  const updated = await database.write(async () => {
    return await record.update((r: any) => {
      if (data.name) r.name = data.name;
    });
  });
  logUpdate('Item', id, JSON.stringify(data));
  return { ...updated._raw, id: updated.id } as Item;
}

export async function deleteItem(id: string) {
  const record = await database.get('items').find(id);
  await database.write(async () => { await record.markAsDeleted(); });
  logDelete('Item', id);
  return true;
}
```

### WatermelonDB Model Pattern
```ts
import { Model } from '@nozbe/watermelondb';
import { field, date, readonly, text } from '@nozbe/watermelondb/decorators';

export default class Item extends Model {
  static table = 'items';

  @text('name') name!: string;
  @text('code') code!: string;
  @field('quantity') quantity!: number;
  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;
}
```

### Schema + Migrations Pattern
```ts
import { appSchema, tableSchema } from '@nozbe/watermelondb';

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'items',
      columns: [
        { name: 'code', type: 'string', isIndexed: true },
        { name: 'name', type: 'string' },
        { name: 'quantity', type: 'number' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number', isIndexed: true },
      ],
    }),
  ],
});
```

### Database Index Pattern
```ts
import { Database } from '@nozbe/watermelondb';
import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs';
import schema from './schema';
import migrations from './migrations';
import Item from './models/Item';

const adapter = new LokiJSAdapter({ schema, migrations, useWebWorker: false, useIncrementalIndexedDB: false });

export const database = new Database({ adapter, modelClasses: [Item] });
```

### DatabaseProvider Pattern
```tsx
import React from 'react';
import DatabaseProvider from '@nozbe/watermelondb/react/DatabaseProvider';
import { database } from './index';

export const DBProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <DatabaseProvider database={database}>{children}</DatabaseProvider>
);
```

## 7. Context Pattern

```tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

interface MyContextType { value: string; updateValue: (v: string) => void; }

const MyContext = createContext<MyContextType | undefined>(undefined);

export const MyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [value, setValue] = useState('default');

  const updateValue = (v: string) => setValue(v);

  return (
    <MyContext.Provider value={{ value, updateValue }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (context === undefined) throw new Error('useMyContext must be used within MyProvider');
  return context;
};
```

## 8. Component Patterns

### Modal Pattern
```tsx
import React from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}

const MyModal = ({ isOpen, onClose, onSave, initialData }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200"
      >
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-bold text-slate-900">{initialData?.id ? 'تعديل' : 'إضافة جديد'}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-200 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 space-y-5">
          {/* Form fields here */}
        </div>
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
          <button onClick={onClose} className="amin-btn-secondary text-sm px-6">إلغاء</button>
          <button onClick={() => onSave({})} className="amin-btn-primary text-sm px-6">حفظ</button>
        </div>
      </motion.div>
    </div>
  );
};

export default MyModal;
```

### Page Pattern
```tsx
import React, { useEffect, useState } from 'react';
import { api, SomeType, cn, playNotificationSound } from '../lib/utils';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import ConfirmModal from '../components/ConfirmModal';
import MyModal from '../components/MyModal';

export default function MyPage() {
  const [data, setData] = useState<SomeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [editItem, setEditItem] = useState<SomeType | null>(null);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(true);
    try { setData(await api.getXxx()); }
    catch (e) { console.error('Error:', e); }
    finally { setLoading(false); }
  };

  const handleSave = async (formData: Partial<SomeType>) => {
    try {
      if (editItem?.id) await api.updateXxx(editItem.id, formData);
      else await api.createXxx(formData);
      playNotificationSound('success');
      setIsModalOpen(false);
      loadData();
    } catch (e) { console.error('Error:', e); }
  };

  const handleDelete = async () => {
    if (editItem?.id) {
      await api.deleteXxx(editItem.id);
      setIsConfirmOpen(false);
      loadData();
    }
  };

  if (loading) {
    return <div className="h-96 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amin-blue" />
    </div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-slate-900">الصفحة الرئيسية</h1>
        <button onClick={() => { setEditItem(null); setIsModalOpen(true); }} className="amin-btn-primary flex items-center gap-2">
          <Plus size={18} /> إضافة جديد
        </button>
      </div>

      {/* Data table/list here */}

      <MyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} initialData={editItem} />
      <ConfirmModal isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} onConfirm={handleDelete} title="تأكيد الحذف" message="هل أنت متأكد؟" type="danger" />
    </div>
  );
}
```

## 9. CSS / Design System

### index.css Structure
```css
@import "tailwindcss";

:root {
  --amin-primary: #1e3a8a;
  --amin-accent: #3b82f6;
  --amin-radius: 12px;
}

/* Theme variants via data-theme attribute */
[data-theme='green'] { --amin-primary: #065f46; --amin-accent: #10b981; }
[data-theme='dark'] { --amin-primary: #1e293b; --amin-accent: #64748b; }

@theme {
  --font-sans: "Cairo", ui-sans-serif, system-ui, sans-serif;
  --color-amin-blue: var(--amin-primary);
  --color-amin-light: #f1f5f9;
  --color-amin-accent: var(--amin-accent);
  /* Override oklch colors with hex for html2canvas compatibility */
  --color-slate-50: #f8fafc;
  --color-slate-100: #f1f5f9;
  /* ... all tailwind colors as hex ... */
  --radius-lg: var(--amin-radius);
}

@layer base {
  html { direction: rtl; font-family: var(--font-sans); font-size: 14px; }
  body { @apply bg-amin-light text-slate-900; }
}

@media print {
  aside, header, button, .no-print { display: none !important; }
}

/* Utility classes */
.amin-card { @apply bg-white border border-slate-200 shadow-sm rounded-lg overflow-hidden transition-all duration-300; }
.amin-input { @apply w-full px-3 py-2 border border-slate-200 rounded-md focus:ring-4 focus:ring-amin-accent/30 focus:border-amin-accent outline-none transition-all bg-white; }
.amin-btn-primary { @apply px-4 py-2 bg-amin-blue text-white rounded-md hover:bg-blue-900 transition-colors font-medium; }
.amin-btn-secondary { @apply px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors font-medium; }

/* Effects */
.glass-effect .amin-card { background: rgba(255, 255, 255, 0.45) !important; backdrop-filter: blur(12px); }
.gradient-bg body { background: linear-gradient(-45deg, #f1f5f9, #e2e8f0, #f8fafc, #eff6ff) !important; }
```

### Utility Function: `cn()`
```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## 10. Audit Logging Pattern

```ts
import { database } from '../db';

export async function logAudit(entityType: string, entityId: string, action: 'CREATE' | 'UPDATE' | 'DELETE', changes?: string): Promise<void> {
  try {
    await database.write(async () => {
      await database.get('audit_log').create((r: any) => {
        r.entityType = entityType;
        r.entityId = entityId;
        r.action = action;
        if (changes) r.changes = changes;
        r.userId = 'system';
      });
    });
  } catch (e) { console.error('Audit log failed:', e); }
}

export async function logCreate(entityType: string, entityId: string) { return logAudit(entityType, entityId, 'CREATE'); }
export async function logUpdate(entityType: string, entityId: string, changes: string) { return logAudit(entityType, entityId, 'UPDATE', changes); }
export async function logDelete(entityType: string, entityId: string) { return logAudit(entityType, entityId, 'DELETE'); }
```

## 11. Routing Conventions

| Path Pattern | Usage |
|---|---|
| `/module` | List page |
| `/module/new` | Create form (full page, hides nav) |
| `/module/edit/:id` | Edit form (full page, hides nav) |
| `/module/:id` | Detail/view page |
| `/settings/*` | Settings & configuration pages |
| `/tools/*` | Utility tools (import, export) |

## 12. Naming Conventions

| Item | Convention | Example |
|---|---|---|
| Page files | PascalCase + `Page` suffix | `UsersPage.tsx` |
| Component files | PascalCase | `UserModal.tsx` |
| Context files | PascalCase + `Context` suffix | `UserContext.tsx` |
| API modules | kebab-case | `user-accounts.ts` |
| DB model files | PascalCase | `User.ts` |
| Utility files | camelCase | `formatCurrency.ts` |
| CSS classes | kebab-case | `amin-btn-primary` |
| Routes | kebab-case | `/user-accounts` |
| Interfaces | PascalCase | `UserAccount` |
| Functions | camelCase | `getUserAccounts()` |
| Constants | UPPER_SNAKE_CASE | `STORAGE_KEYS` |

## 13. Express Server Pattern (Web)

```ts
import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import Database from 'better-sqlite3';

async function startServer() {
  const app = express();
  const PORT = 3000;

  const db = new Database('app.db');
  db.pragma('journal_mode = WAL');

  // Initialize tables
  db.exec(`CREATE TABLE IF NOT EXISTS ...`);

  app.use(express.json());

  // Security headers
  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    next();
  });

  // API routes
  app.get('/api/items', (req, res) => { ... });
  app.post('/api/items', (req, res) => { ... });

  // Vite middleware for dev
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: 'spa' });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), 'dist')));
    app.get('*', (req, res) => res.sendFile(path.join(process.cwd(), 'dist', 'index.html')));
  }

  app.listen(PORT, '0.0.0.0', () => console.log(`Server running on http://localhost:${PORT}`));
}

startServer();
```

## 14. Capacitor Configuration

```ts
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.company.app',
  appName: 'App Name',
  webDir: 'dist'
};

export default config;
```

## 15. Key Dependencies (package.json scripts)

```json
{
  "scripts": {
    "dev": "tsx server.ts",
    "build": "vite build && esbuild server.ts --bundle --platform=node --format=cjs --packages=external --sourcemap --outfile=dist/server.cjs",
    "start": "node dist/server.cjs",
    "lint": "tsc --noEmit",
    "test": "vitest run"
  }
}
```
