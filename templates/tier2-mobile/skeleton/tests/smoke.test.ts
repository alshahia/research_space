// tests/smoke.test.ts — Tier 2 mobile skeleton
//
// Tier 2 mobile done-when per Phase 3.3 spec + `01_RECOMMENDED_DESIGN.md`
// Decision 6 mobile row:
//   "render the default route; expect <View /> + <Text /> renders"
//
// The smoke test imports the Expo Router root layout (`app/_layout.tsx`) +
// the default route (`app/(tabs)/index.tsx`) and renders them via jsdom.
// The `<View>` and `<Text>` primitives are inline DOM wrappers in `_layout.tsx`.
//
// ponytail: minimal smoke test. Five tests covering the load-bearing shape:
// title, locale, target indicator, default route, View + Text renders.
import "@testing-library/jest-dom/vitest";
import { describe, it, expect } from "vitest";
import { createElement } from "react";
import { render, screen } from "@testing-library/react";
import RootLayout from "../app/_layout";
import HomeTab from "../app/(tabs)/index";
import tierConfig from "../tier.config.json";

describe("tier2-mobile smoke", () => {
  it("renders the home page with the configured title text", () => {
    render(
      createElement(RootLayout, null, createElement(HomeTab)),
    );
    const title = screen.getByTestId("app-title");
    expect(title).toBeInTheDocument();
    expect(title.textContent).toBe(tierConfig.title);
  });

  it("shows locale + dir from tier.config.json", () => {
    render(
      createElement(RootLayout, null, createElement(HomeTab)),
    );
    expect(screen.getByTestId("locale-indicator")).toBeInTheDocument();
    expect(screen.getByTestId("locale-indicator").textContent).toMatch(
      /Locale: en \(ltr\)/,
    );
  });

  it("shows the active mobile target indicator", () => {
    render(
      createElement(RootLayout, null, createElement(HomeTab)),
    );
    const indicator = screen.getByTestId("target-indicator");
    expect(indicator).toBeInTheDocument();
    // Default target is "expo" per tier.config.json.
    expect(indicator.textContent).toMatch(/Mobile target: expo/);
    expect(indicator.textContent).toMatch(/Bundle ID: com\.example\.tier2mobile/);
    expect(indicator.textContent).toMatch(/Scheme: myapp:\/\//);
  });

  it("renders the default route (home tab) with Welcome text", () => {
    render(
      createElement(RootLayout, null, createElement(HomeTab)),
    );
    const homeTab = screen.getByTestId("home-tab");
    expect(homeTab).toBeInTheDocument();
    expect(homeTab.getAttribute("data-default-route")).toBe("true");
    expect(homeTab.textContent).toMatch(/Welcome to tier2-mobile/);
  });

  it("renders <View /> and <Text /> primitives (DOM-friendly wrappers)", () => {
    const { container } = render(
      createElement(RootLayout, null, createElement(HomeTab)),
    );
    // `<View>` renders as a `<div>` (root layout + home tab both use it).
    const divs = container.querySelectorAll("div");
    expect(divs.length).toBeGreaterThan(0);
    // `<Text>` renders as a `<span>` (title + locale + target + body).
    const spans = container.querySelectorAll("span");
    expect(spans.length).toBeGreaterThan(0);
    // The root layout has data-testid="root-layout" — verify the wrapper
    // contract (View -> div, with the testid preserved).
    const rootLayout = container.querySelector('[data-testid="root-layout"]');
    expect(rootLayout).toBeInTheDocument();
    expect(rootLayout?.tagName).toBe("DIV");
  });
});
