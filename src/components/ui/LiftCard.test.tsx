import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { LiftCard } from "./LiftCard";

describe("LiftCard component", () => {
  it("renders plain children", () => {
    render(<LiftCard>Card body</LiftCard>);
    expect(screen.getByText("Card body")).toBeInTheDocument();
  });

  it("supports render-prop children with parallax motion values", () => {
    render(
      <LiftCard>
        {({ px, py }) => (
          <span>
            offsets {typeof px.get()} {typeof py.get()}
          </span>
        )}
      </LiftCard>
    );
    expect(screen.getByText(/offsets number number/)).toBeInTheDocument();
  });

  it("applies the white hairline surface shell", () => {
    const { container } = render(<LiftCard>x</LiftCard>);
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain("bg-surface");
    expect(root.className).toContain("border-line");
  });
});
