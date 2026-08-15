// src/routes/sign-up.tsx — Tier 2 SaaS bundle skeleton
import { SignUp } from "@clerk/clerk-react";

export function SignUpPage(): React.ReactElement {
  return (
    <div className="mx-auto mt-10 max-w-md">
      <SignUp routing="virtual" signInUrl="/sign-in" />
    </div>
  );
}
