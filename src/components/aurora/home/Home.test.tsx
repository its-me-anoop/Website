import React from "react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { LazyMotion } from "framer-motion";
import domMax from "@/lib/motion-features";
import { Home } from "./Home";

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

function renderHome() {
  return render(
    <LazyMotion features={domMax} strict>
      <Home />
    </LazyMotion>
  );
}

function linksTo(href: string) {
  return screen.getAllByRole("link").filter((a) => a.getAttribute("href") === href);
}

describe("Home", () => {
  it("renders one hero headline with a plain accessible name", () => {
    renderHome();
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent("Healthcare websites that answer first.");
  });

  it("exposes primary navigation with the sector and packages pages", () => {
    renderHome();
    expect(screen.getByRole("navigation", { name: /primary/i })).toBeInTheDocument();
    ["/gp-websites", "/care-home-websites", "/packages"].forEach((href) => {
      expect(linksTo(href).length).toBeGreaterThan(0);
    });
  });

  it("links to the booking page from the nav, closing band and footer", () => {
    renderHome();
    expect(linksTo("/book").length).toBeGreaterThanOrEqual(3);
    expect(screen.getAllByRole("link", { name: /^Book a call$/i }).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /Book a 15-minute call/i })).toHaveAttribute("href", "/book");
  });

  it("offers the free website audit as a form and as a route", () => {
    renderHome();
    expect(linksTo("/free-audit").length).toBeGreaterThan(0);
    const inputs = screen.getAllByRole("textbox", { name: /your website address/i });
    expect(inputs.length).toBeGreaterThanOrEqual(2);
    inputs.forEach((input) => {
      const form = input.closest("form");
      expect(form).toHaveAttribute("action", "/audit");
      expect(form?.getAttribute("method")?.toLowerCase()).toBe("get");
    });
  });

  it("links to all five hosted sample sites", () => {
    renderHome();
    ["/demo/gp-practice", "/demo/care-home", "/demo/dental-practice", "/demo/pharmacy", "/demo/physio-clinic"].forEach(
      (href) => expect(linksTo(href).length).toBeGreaterThan(0)
    );
  });

  it("exposes the sample showcase as an accessible tab interface with arrow keys", () => {
    renderHome();
    const tablist = screen.getByRole("tablist", { name: /sample sites by sector/i });
    const tabs = within(tablist).getAllByRole("tab");
    expect(tabs).toHaveLength(5);
    expect(tabs.filter((t) => t.getAttribute("aria-selected") === "true")).toHaveLength(1);
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");

    const panel = screen.getByRole("tabpanel");
    expect(panel).toHaveAttribute("aria-labelledby", tabs[0].id);
    expect(within(panel).getByRole("link", { name: /Open the sample site/ })).toHaveAttribute("href", "/demo/gp-practice");

    tabs[0].focus();
    fireEvent.keyDown(tabs[0], { key: "ArrowRight" });
    expect(tabs[1]).toHaveAttribute("aria-selected", "true");
    expect(tabs[1]).toHaveFocus();
    expect(within(screen.getByRole("tabpanel")).getByRole("link", { name: /Open the sample site/ })).toHaveAttribute(
      "href",
      "/demo/care-home"
    );

    fireEvent.keyDown(tabs[1], { key: "End" });
    expect(tabs[4]).toHaveAttribute("aria-selected", "true");
    fireEvent.keyDown(tabs[4], { key: "ArrowRight" });
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
  });

  it("links case studies internally and client sites externally", () => {
    renderHome();
    expect(linksTo("/projects/sipli").length).toBeGreaterThan(0);
    const littleArtist = linksTo("/projects/artling");
    expect(littleArtist.some((a) => /Little Artist/.test(a.textContent ?? ""))).toBe(true);

    const lifeline = linksTo("/projects/little-lifeline");
    expect(lifeline.some((a) => /Little Lifeline/.test(a.textContent ?? ""))).toBe(true);

    const greenmead = screen.getAllByRole("link").filter((a) => a.getAttribute("href")?.includes("greenmead.co.uk"));
    expect(greenmead.length).toBeGreaterThan(0);
    greenmead.forEach((a) => {
      expect(a).toHaveAttribute("target", "_blank");
      expect(a.getAttribute("rel")).toContain("noopener");
    });
  });

  it("keeps duplicated marquee copies out of the accessibility tree", () => {
    const { container } = renderHome();
    const copies = container.querySelectorAll("[data-marquee-copy]");
    expect(copies.length).toBeGreaterThan(0);
    copies.forEach((copy) => expect(copy).toHaveAttribute("aria-hidden", "true"));
  });

  it("shows the sample sites in device frames with a drawn status bar, never cropping the capture", () => {
    const { container } = renderHome();
    expect(container.querySelectorAll("[data-status-bar]").length).toBeGreaterThan(0);
    const screens = container.querySelectorAll<HTMLElement>("[data-screen]");
    expect(screens.length).toBeGreaterThan(0);
    screens.forEach((s) => expect(s.style.aspectRatio).toMatch(/\d+ \/ \d+/));
  });

  it("lets the picker row switch the showcase like the tabs do", () => {
    renderHome();
    fireEvent.click(screen.getByRole("button", { name: /Show Kennet Bridge Dental/ }));
    expect(within(screen.getByRole("tabpanel")).getByRole("link", { name: /Open the sample site/ })).toHaveAttribute(
      "href",
      "/demo/dental-practice"
    );
    expect(screen.getByRole("tab", { name: "Dental" })).toHaveAttribute("aria-selected", "true");
  });

  it("renders the anti-template comparison table", () => {
    renderHome();
    expect(screen.getByRole("table", { name: /typical template builders/i })).toBeInTheDocument();
    expect(screen.getAllByText(/A Flutterly build/).length).toBeGreaterThan(0);
  });

  it("renders the process steps, packages and footer contact details", () => {
    renderHome();
    ["Listen", "Shape", "Build", "Ship"].forEach((step) => {
      expect(screen.getByRole("heading", { level: 3, name: step })).toBeInTheDocument();
    });
    ["Essentials", "Standard", "Partnership"].forEach((name) =>
      expect(screen.getByRole("heading", { name })).toBeInTheDocument()
    );
    const pricing = within(document.getElementById("packages")!);
    expect(pricing.getByText("£995")).toBeInTheDocument();
    expect(pricing.getByText("£1,490")).toBeInTheDocument();
    expect(pricing.getByText("Most chosen")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /enquire about essentials/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /talk about partnership/i })).toBeInTheDocument();
    expect(screen.getAllByText(new RegExp(`© ${new Date().getFullYear()}`)).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /anoop@flutterly\.co\.uk/i }).length).toBeGreaterThan(0);
  });
});
