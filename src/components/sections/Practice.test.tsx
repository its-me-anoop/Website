import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Practice } from "./Practice";

describe("Practice Section", () => {
  it("renders the heading and descriptions correctly", () => {
    render(<Practice />);
    
    // Check section header elements
    expect(screen.getByText("№ 03 · The practice")).toBeInTheDocument();
    expect(screen.getByText("Four working rules")).toBeInTheDocument();
    
    // Check that rules are rendered correctly
    expect(screen.getByText("Rule 01")).toBeInTheDocument();
    expect(screen.getByText("One brief at a time.")).toBeInTheDocument();
    expect(
      screen.getByText(
        "We run one engagement at full depth at a time. You get our attention, not our availability. It keeps the work honest and the calendar clear."
      )
    ).toBeInTheDocument();

    expect(screen.getByText("Rule 02")).toBeInTheDocument();
    expect(screen.getByText("Friday ships.")).toBeInTheDocument();

    expect(screen.getByText("Rule 03")).toBeInTheDocument();
    expect(screen.getByText("Design at the code.")).toBeInTheDocument();

    expect(screen.getByText("Rule 04")).toBeInTheDocument();
    expect(screen.getByText("Yours to own.")).toBeInTheDocument();
  });

  it("renders the technical stack appendix section correctly", () => {
    render(<Practice />);
    expect(screen.getByText("Appendix · Tools on the bench")).toBeInTheDocument();
    expect(screen.getByText("Web")).toBeInTheDocument();
    expect(screen.getByText("Next.js · React · TypeScript · Tailwind · Astro")).toBeInTheDocument();
    expect(screen.getByText("Mobile")).toBeInTheDocument();
    expect(screen.getByText("Backend")).toBeInTheDocument();
    expect(screen.getByText("Tooling")).toBeInTheDocument();
  });
});
