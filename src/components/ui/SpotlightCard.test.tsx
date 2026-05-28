import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SpotlightCard } from "./SpotlightCard";

describe("SpotlightCard component", () => {
  it("renders plain children", () => {
    render(<SpotlightCard>Card body</SpotlightCard>);
    expect(screen.getByText("Card body")).toBeInTheDocument();
  });

  it("supports render-prop children with parallax motion values", () => {
    render(
      <SpotlightCard>
        {({ px, py }) => (
          <span>
            offsets {typeof px.get()} {typeof py.get()}
          </span>
        )}
      </SpotlightCard>
    );
    expect(screen.getByText(/offsets number number/)).toBeInTheDocument();
  });

  it("applies the rounded surface shell", () => {
    const { container } = render(<SpotlightCard>x</SpotlightCard>);
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain("backdrop-blur-xl");
    expect(root.className).toContain("border-line");
  });
});
