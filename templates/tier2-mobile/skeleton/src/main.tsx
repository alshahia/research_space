// src/main.tsx — Tier 2 mobile skeleton
// Vite entry point. Mounts the Expo Router root layout + the default route
// into `#root`. The production Expo runtime uses Metro bundler; this Vite
// entry is the test + web-preview path.
import React from "react";
import { createRoot } from "react-dom/client";
import RootLayout from "../app/_layout";
import HomeTab from "../app/(tabs)/index";
import "./index.css";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("#root element not found in index.html");

createRoot(rootEl).render(
  <React.StrictMode>
    <RootLayout>
      <HomeTab />
    </RootLayout>
  </React.StrictMode>,
);
