import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { StackMarquees } from "./StackMarquees";

describe("StackMarquees", () => {
  it("renders the bench heading", () => {
    render(<StackMarquees />);
    expect(
      screen.getByRole("heading", { level: 2, name: /boring where it counts/i })
    ).toBeInTheDocument();
  });

  it("renders tools in both rows (duplicated for the loop)", () => {
    render(<StackMarquees />);
    for (const tool of ["NEXT.JS", "SWIFTUI", "POSTGRES", "SENTRY"]) {
      // each chip appears twice — once per marquee half
      expect(screen.getAllByText(tool)).toHaveLength(2);
    }
  });
});
