import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Practice } from "./Practice";

describe("Practice (Process) Section", () => {
  it("renders the label and section heading", () => {
    render(<Practice />);
    expect(screen.getByText("How it works")).toBeInTheDocument();
    const h2 = screen.getByRole("heading", { level: 2 });
    expect(h2).toHaveTextContent(/clear path/i);
    expect(h2).toHaveTextContent(/9 weeks/);
  });

  it("renders all 5 process steps", () => {
    render(<Practice />);
    expect(screen.getByText("Discover")).toBeInTheDocument();
    expect(screen.getByText("Design")).toBeInTheDocument();
    expect(screen.getByText("Build")).toBeInTheDocument();
    expect(screen.getByText("Launch")).toBeInTheDocument();
    expect(screen.getByText("Support")).toBeInTheDocument();
  });

  it("labels the steps with durations", () => {
    render(<Practice />);
    expect(screen.getByText("Week 1")).toBeInTheDocument();
    expect(screen.getByText("Week 4–8")).toBeInTheDocument();
    expect(screen.getByText("Ongoing")).toBeInTheDocument();
  });
});
