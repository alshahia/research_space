// src/components/ProtectedRoute.tsx — Tier 2 SaaS bundle skeleton
// Wraps a child route in `<SignedIn>` + falls back to `<RedirectToSignIn />`.
// ponytail: Clerk ships `<RedirectToSignIn />` for declarative redirection;
// equivalent to Next.js middleware. In Tier 2 SaaS, this is the only place
// client-side auth gating is wired.
import type { ReactNode } from "react";
import { SignedIn, RedirectToSignIn } from "@clerk/clerk-react";

export function ProtectedRoute({ children }: { children: ReactNode }): React.ReactElement {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <RedirectToSignIn />
    </>
  );
}
