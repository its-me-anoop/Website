import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Practice } from "./Practice";

describe("Practice (Process) Section", () => {
  it("renders the heading and overview", () => {
    render(<Practice />);

    expect(screen.getByText("How we work")).toBeInTheDocument();
    expect(screen.getByText(/A clear path/)).toBeInTheDocument();
    expect(screen.getByText(/launch in 9 weeks/)).toBeInTheDocument();
  });

  it("renders all 5 process steps", () => {
    render(<Practice />);

    // Each step title is unique
    expect(screen.getAllByText("Discover").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Design").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Build").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Launch").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Support").length).toBeGreaterThan(0);
  });

  it("renders the stack section", () => {
    render(<Practice />);

    expect(screen.getByText("Tools on the bench")).toBeInTheDocument();
    expect(screen.getByText("Frontend")).toBeInTheDocument();
    expect(screen.getByText("Mobile")).toBeInTheDocument();
    expect(screen.getByText("Backend")).toBeInTheDocument();
    expect(screen.getByText("Tooling")).toBeInTheDocument();
  });
});
