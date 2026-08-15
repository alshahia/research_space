// src/main.tsx — Tier 2 SaaS bundle skeleton
// React 19 entry. Imports the configured router and mounts it via
// `<RouterProvider>` inside `<StrictMode>`. The router (see ./router.tsx)
// wraps the SPA in `<ClerkProviderWithRouter>` for the auth-routing bridge.
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
