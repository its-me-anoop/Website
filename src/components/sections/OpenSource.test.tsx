import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { OpenSource } from "./OpenSource";

// Mock IntersectionObserver correctly as a constructor class
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  constructor(public callback: any) {
    // Proactively call the callback to simulate intersection and trigger the counter logic
    setTimeout(() => {
      this.callback([{ isIntersecting: true }]);
    }, 0);
  }
}
vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

describe("OpenSource Section", () => {
  it("renders the section headers and descriptions correctly", () => {
    render(<OpenSource />);
    
    expect(screen.getByText("№ 04 · Open source")).toBeInTheDocument();
    expect(screen.getByText("We ship in")).toBeInTheDocument();
    expect(screen.getByText(/public, too/)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Small tools, experiments, and bits of client work that are safe to open up/
      )
    ).toBeInTheDocument();
  });

  it("renders the git repository list with languages and stats", () => {
    render(<OpenSource />);
    
    // Check repository names and descriptions
    expect(screen.getByText("hydration-engine")).toBeInTheDocument();
    expect(screen.getByText("On-device hydration model — ships inside Sipli.")).toBeInTheDocument();
    expect(screen.getByText("Swift")).toBeInTheDocument();
    expect(screen.getByText("★ 412")).toBeInTheDocument();
    
    expect(screen.getByText("nextjs-seo-kit")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    
    expect(screen.getByText("gesture-lab")).toBeInTheDocument();
    expect(screen.getByText("Dart")).toBeInTheDocument();
    
    expect(screen.getByText("friday-ship")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
  });

  it("renders the git stats overview panel correctly", () => {
    render(<OpenSource />);
    
    expect(screen.getByText("@ its-me-anoop")).toBeInTheDocument();
    expect(screen.getByText(/Commits · ytd/)).toBeInTheDocument();
    expect(screen.getByText(/Best streak/)).toBeInTheDocument();
    expect(screen.getByText(/27d/)).toBeInTheDocument();
    expect(screen.getByText(/Repos/)).toBeInTheDocument();
  });
});
