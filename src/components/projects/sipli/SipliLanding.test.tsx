import React from "react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { LazyMotion } from "framer-motion";
import domMax from "@/lib/motion-features";
import { sipli } from "@/lib/projects/sipli";
import { SipliLanding } from "./SipliLanding";

vi.mock("next/navigation", () => ({ usePathname: () => "/projects/sipli" }));

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
      <SipliLanding />
    </LazyMotion>
  );
}

describe("SipliLanding", () => {
  it("has a single h1", () => {
    renderPage();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("links to the App Store listing safely", () => {
    renderPage();
    const links = screen.getAllByRole("link", { name: /Download Sipli on the App Store/i });
    expect(links.length).toBeGreaterThan(0);
    links.forEach((a) => {
      expect(a).toHaveAttribute("href", sipli.appStoreUrl);
      expect(a.getAttribute("rel")).toContain("noopener");
    });
  });

  it("shows a heading for every section of the listing", () => {
    renderPage();
    sipli.sections.forEach((s) => expect(screen.getByRole("heading", { name: s.title })).toBeInTheDocument());
  });

  it("shows only the real App Store screenshots", () => {
    renderPage();
    const main = screen.getByRole("main");
    const srcs = Array.from(main.querySelectorAll("img"), (img) => decodeURIComponent(img.getAttribute("src") ?? ""));
    expect(srcs.length).toBeGreaterThan(0);
    srcs.forEach((src) => expect(src).toMatch(/\/projects\/sipli\/(store\/|mark\.png)/));
  });

  it("has no star rating or decorative mock-ups", () => {
    renderPage();
    expect(document.querySelector("[data-mock]")).toBeNull();
    expect(screen.queryByLabelText(/\bstars?\b|rating/i)).toBeNull();
  });

  it("links to the privacy policy", () => {
    renderPage();
    expect(
      screen.getAllByRole("link", { name: /privacy policy/i }).some((a) => a.getAttribute("href") === "/projects/sipli/privacy-policy")
    ).toBe(true);
  });
});
