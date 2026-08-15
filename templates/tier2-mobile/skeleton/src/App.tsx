// src/App.tsx — Tier 2 mobile skeleton
//
// Re-export of the Expo Router root layout for Vite entry compatibility. The
// actual layout is `app/_layout.tsx` (Expo Router file structure); this file
// is a thin wrapper so `vite.config.ts` can point at `src/App.tsx` as the
// secondary entry while preserving the Expo Router shape.
import RootLayout from "../app/_layout";

export function App(): React.ReactElement {
  return <RootLayout />;
}

export default App;
