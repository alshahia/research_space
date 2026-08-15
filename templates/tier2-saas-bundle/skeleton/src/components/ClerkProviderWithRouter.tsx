// src/components/ClerkProviderWithRouter.tsx — Tier 2 SaaS bundle skeleton
// Bridge between @clerk/clerk-react's required `routerPush` + `routerReplace`
// props and React Router 7's `useNavigate()`. ponytail: the smallest
// possible adapter; production code SHOULD also pass `signInForceRedirectUrl`
// + `signUpForceRedirectUrl` per Clerk's auth-UX recommendations.
import { type ReactNode } from "react";
import { ClerkProvider } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

interface Props {
  publishableKey: string;
  children: ReactNode;
}

export function ClerkProviderWithRouter({ publishableKey, children }: Props): React.ReactElement {
  const navigate = useNavigate();
  return (
    <ClerkProvider
      publishableKey={publishableKey}
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
    >
      {children}
    </ClerkProvider>
  );
}
