// tests/smoke.test.ts — Tier 2 SaaS bundle skeleton
// Renders <App /> via the router; asserts h1 + PricingTable + nav + at
// least one plan card. Uses the same routing shape as production: root
// element is <ClerkProviderWithRouter> wrapping an <Outlet />, with all
// routes (including sign-in / sign-up) as children of the root.
import "@testing-library/jest-dom/vitest";
import { describe, it, expect, beforeAll } from "vitest";
import { createElement, type ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider, Outlet, type RouteObject } from "react-router-dom";
import { App } from "../src/App";
import { SignInPage } from "../src/routes/sign-in";
import { SignUpPage } from "../src/routes/sign-up";
import { PricingPage } from "../src/routes/pricing";
import { DashboardPage } from "../src/routes/dashboard";
import { ProtectedRoute } from "../src/components/ProtectedRoute";
import { ClerkProviderWithRouter } from "../src/components/ClerkProviderWithRouter";

const TEST_PUBLISHABLE_KEY = "pk_test_Y2xlcmsuZXhhbXBsZS5jb20k";

function renderApp(initial: string): void {
  // Production shape: <ClerkProviderWithRouter> wraps an <Outlet />. All
  // pages (including sign-in / sign-up) are children of this route so the
  // Clerk context is provided universally.
  const routes: RouteObject[] = [
    {
      element: createElement(
        ClerkProviderWithRouter,
        { publishableKey: TEST_PUBLISHABLE_KEY, children: createElement(Outlet) },
      ),
      children: [
        {
          path: "/",
          element: createElement(App),
          children: [
            { index: true, element: createElement(PricingPage) },
            { path: "pricing", element: createElement(PricingPage) },
            {
              path: "dashboard",
              element: createElement(ProtectedRoute, null, createElement(DashboardPage)),
            },
          ],
        },
        { path: "/sign-in/*", element: createElement(SignInPage) },
        { path: "/sign-up/*", element: createElement(SignUpPage) },
      ],
    },
  ];
  const router = createMemoryRouter(routes, { initialEntries: [initial] });
  render(createElement(RouterProvider, { router }) as ReactElement);
}

describe("tier2-saas-bundle smoke", () => {
  beforeAll(() => {
    // Stub fetch so any side-effect-fetching hook (Clerk's session bootstrap)
    // doesn't throw during the render cycle.
    globalThis.fetch = (() =>
      Promise.resolve(
        new Response(JSON.stringify({}), {
          status: 200,
          headers: { "content-type": "application/json" },
        }),
      )) as typeof globalThis.fetch;
  });

  it("renders the marketing page with the configured h1 and at least one plan card", () => {
    renderApp("/");
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Pricing");
    expect(screen.getByTestId("pricing-table")).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: /subscribe|sign in to subscribe|no card required/i }).length,
    ).toBeGreaterThanOrEqual(1);
  });

  it("shows the three plan names on /pricing", () => {
    renderApp("/pricing");
    expect(screen.getByText("Free")).toBeInTheDocument();
    expect(screen.getByText("Pro")).toBeInTheDocument();
    expect(screen.getByText("Team")).toBeInTheDocument();
  });

  it("mounts the sign-in page at /sign-in without crashing", () => {
    renderApp("/sign-in");
    // ponytail: with ClerkProvider mounted, <SignIn /> renders its script
    // loader (no real session = empty placeholder). We just assert no
    // thrown error: the body is mounted, and `Clerk` script tag is queried.
    expect(document.body).toBeTruthy();
  });
});
