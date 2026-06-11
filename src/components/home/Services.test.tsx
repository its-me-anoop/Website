import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Services } from "./Services";

describe("Services (aurora)", () => {
  it("renders the section heading", () => {
    render(<Services />);
    expect(
      screen.getByRole("heading", { level: 2, name: /four disciplines/i })
    ).toBeInTheDocument();
  });

  it("renders all four disciplines", () => {
    render(<Services />);
    for (const title of [
      "Web applications",
      "Mobile apps",
      "Backend & APIs",
      "Design systems",
    ]) {
      expect(
        screen.getByRole("heading", { level: 3, name: title })
      ).toBeInTheDocument();
    }
  });

  it("lists each discipline's stack", () => {
    render(<Services />);
    expect(
      screen.getByText("NEXT.JS / REACT / TYPESCRIPT / TAILWIND")
    ).toBeInTheDocument();
    expect(
      screen.getByText("SWIFTUI / FLUTTER / REACT NATIVE")
    ).toBeInTheDocument();
    expect(
      screen.getByText("NODE / POSTGRES / GRAPHQL / AWS")
    ).toBeInTheDocument();
    expect(screen.getByText("FIGMA / TOKENS / STORYBOOK")).toBeInTheDocument();
  });
});
