// src/lib/auth.ts — Tier 2 SaaS bundle skeleton
// Clerk React helpers re-exported through a single seam. Server-side
// (`@clerk/express`) is wired in `server.ts`; client-side reads live in
// the React Router components (e.g. `SignInPage`, `DashboardPage`).
//
// Auth shape:
//   - <ClerkProvider> in src/main.tsx (publishableKey from VITE_CLERK_PUBLISHABLE_KEY)
//   - <SignedIn> / <SignedOut> for visibility toggling (NavBar, etc.)
//   - <RedirectToSignIn> for protected routes
//   - useUser() / useAuth() / getToken() inside components (NOT here, to keep this file isomorphic)
//
// Phase 2 Gate E pivoted from @clerk/nextjs (Next.js only) →
// @clerk/clerk-react + @clerk/express (Vite + Express). The Clerk team
// ship framework-specific drop-in components (<SignIn />, <SignUp />,
// <UserButton />) that match @clerk/clerk-react API.
export {};
