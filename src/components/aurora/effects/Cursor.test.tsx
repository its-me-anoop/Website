import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { Cursor } from "./Cursor";

function mockPointer(fine: boolean) {
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: query.includes("pointer: fine") ? fine : false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
}

afterEach(() => vi.unstubAllGlobals());

describe("Cursor", () => {
  it("renders nothing on touch devices", () => {
    mockPointer(false);
    const { container } = render(<Cursor />);
    expect(container.querySelector("[data-fx-cursor]")).toBeNull();
  });

  it("renders decorative crosshair parts for a mouse or trackpad", () => {
    mockPointer(true);
    const { container } = render(<Cursor />);
    const root = container.querySelector("[data-fx-cursor]");
    expect(root).toHaveAttribute("aria-hidden", "true");
    expect(root?.querySelectorAll(".fx-cursor")).toHaveLength(4);
  });
});
