import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Process } from "./Process";

describe("Process", () => {
  it("renders the nine-week promise", () => {
    render(<Process />);
    expect(
      screen.getByRole("heading", { level: 2, name: /nine weeks/i })
    ).toBeInTheDocument();
  });

  it("renders all five phases in order", () => {
    render(<Process />);
    const phases = ["Discover", "Design", "Build", "Launch", "Support"];
    for (const phase of phases) {
      expect(
        screen.getByRole("heading", { level: 3, name: phase })
      ).toBeInTheDocument();
    }
  });

  it("labels each phase with its weeks", () => {
    render(<Process />);
    for (const week of ["Week 1", "Weeks 2–3", "Weeks 4–8", "Week 9", "Ongoing"]) {
      expect(screen.getByText(week)).toBeInTheDocument();
    }
  });
});
