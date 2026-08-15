// src/components/NavBar.tsx — Tier 2 SaaS bundle skeleton
// Top navigation. Auth state via Clerk's SignedIn / SignedOut + UserButton.
// ponytail: single-piece NavBar; production may split into `<DesktopNav />`
// + `<MobileNav />` per viewport tier.
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";

export function NavBar(): React.ReactElement {
  return (
    <nav className="flex items-center justify-between border-b border-neutral-200 bg-white px-6 py-4">
      <Link to="/" className="text-lg font-semibold tracking-tight">
        SaaS Bundle
      </Link>
      <div className="flex items-center gap-4 text-sm">
        <Link to="/pricing" className="hover:text-brand-700">
          Pricing
        </Link>
        <SignedIn>
          <Link to="/dashboard" className="hover:text-brand-700">
            Dashboard
          </Link>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm hover:bg-neutral-50">
              Sign in
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="rounded-md bg-brand-500 px-3 py-1.5 text-sm text-white hover:bg-brand-700">
              Sign up
            </button>
          </SignUpButton>
        </SignedOut>
      </div>
    </nav>
  );
}
