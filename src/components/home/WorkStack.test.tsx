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

  it("links client work to the live sites in a new tab", () => {
    render(<WorkStack />);
    const visits = screen.getAllByRole("link", { name: /visit the site/i });
    expect(visits.map((a) => a.getAttribute("href"))).toEqual([
      "https://www.greenmead.co.uk/",
      "https://www.jjpaperessential.com/",
      "https://sandbournecare.co.uk/",
    ]);
    visits.forEach((a) => {
      expect(a).toHaveAttribute("target", "_blank");
      expect(a).toHaveAttribute("rel", "noopener noreferrer");
    });
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
