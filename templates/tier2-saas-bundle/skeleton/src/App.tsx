// src/App.tsx — Tier 2 SaaS bundle skeleton
// Layout shell: NavBar on top, <Outlet> for child routes, footer.
// Auth state is read via Clerk React hooks (SignedIn / SignedOut).
import { Outlet } from "react-router-dom";
import { NavBar } from "./components/NavBar";

export function App(): React.ReactElement {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1 px-6 py-10">
        <Outlet />
      </main>
      <footer className="px-6 py-8 text-center text-sm text-neutral-500">
        tier2-saas-bundle spine · Vite + React Router + Express + Clerk + Stripe
      </footer>
    </div>
  );
}
