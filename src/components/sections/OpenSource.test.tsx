import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { OpenSource } from "./OpenSource";

type IOCallback = (entries: Array<{ isIntersecting: boolean }>) => void;

class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  constructor(public callback: IOCallback) {
    setTimeout(() => {
      this.callback([{ isIntersecting: true }]);
    }, 0);
  }
}
vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

describe("OpenSource Section", () => {
  it("renders the section header and description", () => {
    render(<OpenSource />);

    expect(screen.getByText("Open source")).toBeInTheDocument();
    expect(screen.getByText("I ship in")).toBeInTheDocument();
    expect(screen.getByText(/public, too/)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Small tools, experiments, and bits of client work that are safe to open up/
      )
    ).toBeInTheDocument();
  });

  it("renders the repository list with names and languages", () => {
    render(<OpenSource />);

    expect(screen.getByText("hydration-engine")).toBeInTheDocument();
    expect(
      screen.getByText("On-device hydration model — ships inside Sipli.")
    ).toBeInTheDocument();
    expect(screen.getByText("Swift")).toBeInTheDocument();

    expect(screen.getByText("nextjs-seo-kit")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();

    expect(screen.getByText("gesture-lab")).toBeInTheDocument();
    expect(screen.getByText("Dart")).toBeInTheDocument();

    expect(screen.getByText("friday-ship")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
  });

  it("renders the git stats overview", () => {
    render(<OpenSource />);

    expect(screen.getByText(/@its-me-anoop/)).toBeInTheDocument();
    expect(screen.getByText(/Commits/)).toBeInTheDocument();
    expect(screen.getByText(/Best streak/)).toBeInTheDocument();
    expect(screen.getByText("27d")).toBeInTheDocument();
    expect(screen.getByText("Repos")).toBeInTheDocument();
  });
});
