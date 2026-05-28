import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Services } from "./Services";

describe("Services section", () => {
  it("renders the section header", () => {
    render(<Services />);
    expect(screen.getByText("What we build")).toBeInTheDocument();
    expect(screen.getByText(/engineering & design/)).toBeInTheDocument();
  });

  it("renders all four service cards", () => {
    render(<Services />);
    expect(screen.getByText("Web Applications")).toBeInTheDocument();
    expect(screen.getByText("Mobile Apps")).toBeInTheDocument();
    expect(screen.getByText("Backend & APIs")).toBeInTheDocument();
    expect(screen.getByText("Design Systems")).toBeInTheDocument();
  });

  it("exposes a discuss link per service", () => {
    render(<Services />);
    expect(
      screen.getByRole("link", { name: /discuss web applications/i })
    ).toHaveAttribute("href", "#brief");
  });
});
