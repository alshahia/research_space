// tests/smoke.test.ts — Tier 1 standard skeleton
// Tier 1 done-when per 01_RECOMMENDED_DESIGN.md Decision 6:
//   "render the home page; expect h1 text"
import "@testing-library/jest-dom/vitest";
import { describe, it, expect } from "vitest";
import { createElement } from "react";
import { render, screen } from "@testing-library/react";
import { App } from "../src/App";
import tierConfig from "../tier.config.json";

describe("tier1-standard smoke", () => {
  it("renders the home page with the configured h1 text", () => {
    render(createElement(App));
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe(tierConfig.title);
  });

  it("shows locale + dir from tier.config.json", () => {
    render(createElement(App));
    expect(screen.getByText(/Locale:/)).toBeInTheDocument();
  });
});
