import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Marquee } from "./Marquee";

describe("Marquee component", () => {
  it("duplicates its children for a seamless loop", () => {
    render(
      <Marquee>
        <span>Next.js</span>
      </Marquee>
    );
    // Rendered once visibly + once in the aria-hidden clone.
    expect(screen.getAllByText("Next.js")).toHaveLength(2);
  });

  it("accepts a custom duration", () => {
    const { container } = render(
      <Marquee duration={30}>
        <span>x</span>
      </Marquee>
    );
    const track = container.querySelector(".animate-marquee") as HTMLElement;
    expect(track.style.getPropertyValue("--marquee-duration")).toBe("30s");
  });
});
