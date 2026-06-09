import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { LiquidGlass } from "./LiquidGlass";

describe("LiquidGlass component", () => {
  // jsdom has no canvas 2D context, so the engine degrades to a no-op and the
  // children must always render normally underneath.
  it("renders its children", () => {
    render(
      <LiquidGlass>
        <h1>Refracted heading</h1>
      </LiquidGlass>
    );
    expect(screen.getByRole("heading", { name: /refracted heading/i })).toBeInTheDocument();
  });

  it("wraps children in a stage + content layer", () => {
    const { container } = render(
      <LiquidGlass className="my-stage" contentClassName="my-content">
        <span>inner</span>
      </LiquidGlass>
    );
    const stage = container.querySelector(".lg-stage");
    expect(stage).toBeTruthy();
    expect(stage?.className).toContain("my-stage");
    expect(container.querySelector(".lg-content")?.className).toContain("my-content");
  });

  it("applies the scene background and radius to the stage", () => {
    const { container } = render(
      <LiquidGlass scene="#fff" radius="20px">
        <span>x</span>
      </LiquidGlass>
    );
    const stage = container.querySelector(".lg-stage") as HTMLElement;
    expect(stage.style.background).toBe("rgb(255, 255, 255)");
    expect(stage.style.borderRadius).toBe("20px");
  });
});
