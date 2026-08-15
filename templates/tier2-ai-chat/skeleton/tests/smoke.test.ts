// tests/smoke.test.ts — Tier 2 ai-chat skeleton
//
// Tier 2 done-when per 01_RECOMMENDED_DESIGN.md Decision 6 ai-chat row:
//   "render the home page; expect h1 text" + "user/assistant bubble rendered
//    for Path A" + (per Phase 3.2 spec) "at least one text-delta chunk rendered".
//
// The `data-text-delta-chunk="true"` attribute on the assistant bubble marks the
// element that represents what a streamed text-delta would render to in a live
// useChat() integration. The smoke test asserts the attribute is present.
//
// ponytail: inline seed messages keep the test free of any live backend; jsdom
// can't host a streaming `/api/chat` route.
import "@testing-library/jest-dom/vitest";
import { describe, it, expect } from "vitest";
import { createElement } from "react";
import { render, screen } from "@testing-library/react";
import { App } from "../src/App";
import tierConfig from "../tier.config.json";

describe("tier2-ai-chat smoke", () => {
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

  it("shows the active path indicator", () => {
    render(createElement(App));
    const indicator = screen.getByTestId("path-indicator");
    expect(indicator).toBeInTheDocument();
    // Path A (default for tier.config.json): "Path: A (direct) · Model family: google"
    expect(indicator.textContent).toMatch(/Path: A \(direct\)/);
    expect(indicator.textContent).toMatch(/Model family: google/);
  });

  it("renders at least one user bubble + one assistant bubble for Path A", () => {
    render(createElement(App));
    const userBubble = screen.getByTestId("bubble-user");
    const assistantBubble = screen.getByTestId("bubble-assistant");
    expect(userBubble).toBeInTheDocument();
    expect(assistantBubble).toBeInTheDocument();
    expect(userBubble.textContent).toMatch(/markdown example/);
    // Assistant bubble renders a code block via react-markdown; the rendered
    // output should contain a <code> element.
    expect(assistantBubble.querySelector("code")).not.toBeNull();
    expect(assistantBubble.textContent).toMatch(/Hello from OpenCode|Path A renders this|Path B returns/);
  });

  it("renders at least one text-delta chunk marker in the assistant bubble", () => {
    const { container } = render(createElement(App));
    // The assistant bubble wraps its markdown in a div with data-text-delta-chunk="true"
    // to mark the element that represents what a streamed text-delta would render to
    // in a live useChat() integration. The smoke test asserts the marker is present.
    const chunk = container.querySelector('[data-text-delta-chunk="true"]');
    expect(chunk).toBeInTheDocument();
  });
});
