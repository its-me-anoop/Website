import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { RevealText } from "./RevealText";

describe("RevealText component", () => {
  it("renders its children", () => {
    render(<RevealText>Developer</RevealText>);
    expect(screen.getByText("Developer")).toBeInTheDocument();
  });

  it("clips the line inside an overflow mask", () => {
    const { container } = render(<RevealText>line</RevealText>);
    expect((container.firstChild as HTMLElement).className).toContain("overflow-hidden");
  });

  it("merges a custom class on the mask", () => {
    const { container } = render(<RevealText className="text-xl">x</RevealText>);
    expect((container.firstChild as HTMLElement).className).toContain("text-xl");
  });
});
