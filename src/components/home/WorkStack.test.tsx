import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { WorkStack } from "./WorkStack";

describe("WorkStack", () => {
  it("renders the section heading", () => {
    render(<WorkStack />);
    expect(
      screen.getByRole("heading", { level: 2, name: /five products/i })
    ).toBeInTheDocument();
  });

  it("renders all five projects", () => {
    render(<WorkStack />);
    for (const name of [
      "Sipli",
      "Artling",
      "Greenmead",
      "JJ Paper",
      "Sandbourne",
    ]) {
      expect(screen.getByText(name)).toBeInTheDocument();
    }
  });

  it("links shipped apps to their case studies", () => {
    render(<WorkStack />);
    const caseStudies = screen.getAllByRole("link", { name: /case study/i });
    expect(caseStudies.map((a) => a.getAttribute("href"))).toEqual([
      "/projects/sipli",
      "/projects/artling",
    ]);
  });

  it("points client work at the contact section", () => {
    render(<WorkStack />);
    const asks = screen.getAllByRole("link", { name: /ask about it/i });
    expect(asks).toHaveLength(3);
    asks.forEach((a) => expect(a).toHaveAttribute("href", "#contact"));
  });

  it("renders Sipli's live badge and capability chips", () => {
    render(<WorkStack />);
    expect(screen.getByText("Live")).toBeInTheDocument();
    expect(screen.getByText("ON-DEVICE AI")).toBeInTheDocument();
    expect(screen.getByText("HEALTHKIT")).toBeInTheDocument();
  });

  it("mentions NDA work", () => {
    render(<WorkStack />);
    expect(screen.getByText(/live under NDA/i)).toBeInTheDocument();
  });
});
