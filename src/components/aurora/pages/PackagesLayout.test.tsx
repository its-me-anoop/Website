import React from "react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { LazyMotion } from "framer-motion";
import domMax from "@/lib/motion-features";
import { packages } from "@/lib/marketing/content";
import { PackagesPage } from "./PackagesPage";

vi.mock("next/navigation", () => ({ usePathname: () => "/packages" }));

beforeAll(() => {
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  );
});
afterAll(() => vi.unstubAllGlobals());

describe("package cards layout", () => {
  function grid() {
    render(
      <LazyMotion features={domMax} strict>
        <PackagesPage />
      </LazyMotion>
    );
    const heading = screen.getByRole("heading", { level: 2, name: packages[0].name });
    return heading.closest("ul")!;
  }

  it("keeps the desktop breakpoints: two across from md, three from xl", () => {
    expect(grid()).toHaveClass("md:grid-cols-2", "xl:grid-cols-3");
  });

  it("sits two across on an unfolded or roomy screen narrower than md", () => {
    expect(grid()).toHaveClass("roomy:max-md:grid-cols-2");
  });

  it("puts all three side by side in landscape below desktop widths", () => {
    expect(grid()).toHaveClass("wide-landscape:max-lg:grid-cols-3");
  });
});
