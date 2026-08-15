# Quick Start: Build a New App from Template

## Step 1: Copy this folder

```bash
cp -r general-app-template/ my-new-app/
cd my-new-app
```

## Step 2: Customize package.json

```bash
# Edit name, version, description in package.json
code package.json
```

## Step 3: Install dependencies

```bash
npm install
```

## Step 4: Define your data models

1. Edit `src/lib/types.ts` — define your interfaces
2. Edit `src/db/schema.ts` — define WatermelonDB tables
3. Edit `src/db/migrations.ts` — define migration steps
4. Create model files in `src/db/models/`
5. Update `src/db/index.ts` — register new models

## Step 5: Create API modules

```bash
# Create one file per domain
touch src/lib/api/users.ts
touch src/lib/api/products.ts
```

Edit `src/lib/api/index.ts` and `src/lib/utils.ts` to wire them up.

## Step 6: Build UI

1. Edit `src/components/Layout.tsx` with your navigation
2. Edit `src/App.tsx` with your routes
3. Create pages in `src/pages/`
4. Create components in `src/components/`

## Step 7: Set up server

Edit `server.ts` with your API endpoints.

## Step 8: Verify

```bash
npm run lint    # TypeScript check
npm run dev     # Start dev server at http://localhost:3000
```

## Step 9: Mobile build (optional)

```bash
npx cap init
npx cap add android
npx cap sync
npx cap run android
```

---

## Folder Structure After Scaffolding

```
my-new-app/
├── server.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
├── capacitor.config.ts
├── index.html
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── components/
│   │   ├── Layout.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── ConfirmModal.tsx
│   │   └── NotificationBell.tsx
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   └── SettingsPage.tsx
│   ├── context/
│   │   ├── NotificationContext.tsx
│   │   └── SettingsContext.tsx
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── types.ts
│   │   ├── api/
│   │   │   └── index.ts
│   │   └── audit.ts
│   ├── db/
│   │   ├── index.ts
│   │   ├── schema.ts
│   │   ├── migrations.ts
│   │   ├── DatabaseProvider.tsx
│   │   └── models/
│   └── types/
└── resources/
```
