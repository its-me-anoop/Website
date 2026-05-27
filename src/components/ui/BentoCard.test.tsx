import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { BentoCard } from "./BentoCard";

describe("BentoCard component", () => {
  it("renders children correctly", () => {
    render(<BentoCard>Card Content</BentoCard>);
    expect(screen.getByText("Card Content")).toBeInTheDocument();
  });

  it("applies the rounded glassmorphic shell classes", () => {
    const { container } = render(<BentoCard>Test</BentoCard>);
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain("rounded-[24px]");
    expect(root.className).toContain("backdrop-blur-xl");
  });

  it("merges custom classnames", () => {
    const { container } = render(<BentoCard className="col-span-4">Test</BentoCard>);
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain("col-span-4");
  });
});
