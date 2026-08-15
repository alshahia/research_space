// src/main.tsx — Tier 2 ai-chat skeleton
// React DOM mount entry. Wraps <App /> in <DatabaseProvider>.
// ponytail: React 19 root API; no createRoot import dance. Mirrors tier1-standard.
import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { DatabaseProvider } from "./db/DatabaseProvider";
import "./index.css";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("#root element not found in index.html");

createRoot(rootEl).render(
  <React.StrictMode>
    <DatabaseProvider>
      <App />
    </DatabaseProvider>
  </React.StrictMode>,
);
