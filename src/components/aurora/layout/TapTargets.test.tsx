import React from "react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { LazyMotion } from "framer-motion";
import domMax from "@/lib/motion-features";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { FaqList } from "../ui/primitives";

/*
 * Comfortable tap targets on touch screens (the narrow folded screen of
 * a foldable most of all). The `tap-target` utility only grows an
 * element to 44px under a coarse pointer, so mouse layouts are unchanged.
 */

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

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

const withMotion = (ui: React.ReactNode) =>
  render(
    <LazyMotion features={domMax} strict>
      {ui}
    </LazyMotion>
  );

describe("tap targets on touch screens", () => {
  it("every footer link is a tap target, laid out as a box so min-height applies", () => {
    withMotion(<Footer />);
    const links = within(screen.getByRole("contentinfo")).getAllByRole("link");
    expect(links.length).toBeGreaterThan(10);
    links.forEach((link) => {
      expect(link, link.textContent ?? "").toHaveClass("tap-target");
      expect(link, link.textContent ?? "").toHaveClass("inline-flex");
    });
  });

  it("the header's logo, actions and menu button are tap targets", () => {
    withMotion(<Nav />);
    const header = screen.getByRole("banner");
    const controls = [...within(header).getAllByRole("link"), within(header).getByRole("button", { name: /open menu/i })];
    controls.forEach((control) => expect(control, control.textContent ?? "").toHaveClass("tap-target"));
  });

  it("each FAQ question opens from a full-height row", () => {
    render(<FaqList items={[{ q: "Is there a minimum term?", a: "One year." }]} />);
    const summary = screen.getByText("Is there a minimum term?").closest("summary");
    expect(summary).toHaveClass("tap-target");
  });
});
