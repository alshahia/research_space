// src/routes/sign-in.tsx — Tier 2 SaaS bundle skeleton
// Clerk's pre-built <SignIn /> component renders inside the React Router
// route. The `routing="virtual"` prop means Clerk manages the sub-routing
// itself (no nested routes needed in `router.tsx` beyond the wildcard).
import { SignIn } from "@clerk/clerk-react";

export function SignInPage(): React.ReactElement {
  return (
    <div className="mx-auto mt-10 max-w-md">
      <SignIn routing="virtual" signUpUrl="/sign-up" />
    </div>
  );
}
