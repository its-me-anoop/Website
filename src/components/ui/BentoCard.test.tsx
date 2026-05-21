import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { BentoCard } from "./BentoCard";

describe("BentoCard component", () => {
  it("renders content children correctly", () => {
    render(<BentoCard>Card Content</BentoCard>);
    expect(screen.getByText("Card Content")).toBeInTheDocument();
  });

  it("applies the default premium card styling classes", () => {
    const { container } = render(<BentoCard>Test</BentoCard>);
    const divElement = container.firstChild as HTMLElement;
    expect(divElement.className).toContain("rounded-[24px]");
    expect(divElement.className).toContain("border-white/5");
    expect(divElement.className).toContain("bg-[#09090b]/80");
  });

  it("merges custom classnames properly", () => {
    const { container } = render(<BentoCard className="col-span-4">Test</BentoCard>);
    const divElement = container.firstChild as HTMLElement;
    expect(divElement.className).toContain("col-span-4");
  });
});
