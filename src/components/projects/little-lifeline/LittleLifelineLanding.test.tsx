import React from "react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { LazyMotion } from "framer-motion";
import domMax from "@/lib/motion-features";
import { LittleLifelineLanding } from "./LittleLifelineLanding";

vi.mock("next/navigation", () => ({ usePathname: () => "/projects/little-lifeline" }));

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

function renderPage() {
  return render(
    <LazyMotion features={domMax} strict>
      <LittleLifelineLanding />
    </LazyMotion>
  );
}

describe("LittleLifelineLanding", () => {
  it("has a single h1 naming the game", () => {
    renderPage();
    const h1 = screen.getAllByRole("heading", { level: 1 });
    expect(h1).toHaveLength(1);
    expect(h1[0].textContent).toMatch(/clinic/i);
  });

  it("links to the App Store listing safely", () => {
    renderPage();
    const links = screen
      .getAllByRole("link", { name: /Download Little Lifeline on the App Store/i });
    expect(links.length).toBeGreaterThan(0);
    links.forEach((a) => {
      expect(a).toHaveAttribute("href", "https://apps.apple.com/us/app/little-lifeline/id6786840477");
      expect(a).toHaveAttribute("target", "_blank");
      expect(a.getAttribute("rel")).toContain("noopener");
    });
  });

  it("links to the published privacy policy", () => {
    renderPage();
    const policy = screen.getAllByRole("link", { name: /privacy policy/i });
    expect(
      policy.some((a) => a.getAttribute("href")?.includes("gravitile-support"))
    ).toBe(true);
  });

  it("states the no-ads, on-device and no-medical-advice facts", () => {
    renderPage();
    expect(screen.getAllByText(/no advertis/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/fictional/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/on (your|the) device/i).length).toBeGreaterThan(0);
  });

  it("gives the app icon a text alternative", () => {
    renderPage();
    expect(screen.getAllByAltText(/Little Lifeline app icon/i).length).toBeGreaterThan(0);
  });
});
