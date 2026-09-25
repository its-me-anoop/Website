import React from "react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { heroSigns, samples } from "@/lib/marketing/content";
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

function linksTo(href: string) {
  return screen.getAllByRole("link").filter((a) => a.getAttribute("href") === href);
}

describe("Home", () => {
  it("renders one hero headline with a plain accessible name", () => {
    render(<Home />);
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent("Websites that answer before the phone rings.");
  });

  it("exposes primary navigation with the sector and packages pages", () => {
    render(<Home />);
    expect(screen.getByRole("navigation", { name: /primary/i })).toBeInTheDocument();
    ["/gp-websites", "/care-home-websites", "/packages", "/leaving-msw"].forEach((href) => {
      expect(linksTo(href).length).toBeGreaterThan(0);
    });
  });

  it("points every arm of the hero fingerpost at a real sample-site page", () => {
    render(<Home />);
    const post = screen.getByRole("list", { name: /signs to pages on the sample sites/i });
    const arms = within(post).getAllByRole("link");
    expect(arms).toHaveLength(heroSigns.length);
    arms.forEach((arm, i) => {
      expect(arm).toHaveAttribute("href", heroSigns[i].href);
      expect(arm).toHaveAccessibleName(new RegExp(`^${heroSigns[i].label}.*${heroSigns[i].place}`));
    });
  });

  it("links to the booking page from the nav, hero, closing band and footer", () => {
    render(<Home />);
    expect(linksTo("/book").length).toBeGreaterThanOrEqual(3);
    expect(screen.getAllByRole("link", { name: /^Book a call$/i }).length).toBeGreaterThan(0);
    const cta = screen.getByRole("link", { name: /Book a 15-minute call/i });
    expect(cta).toHaveAttribute("href", "/book");
  });

  it("offers the free website audit as a form and as a route", () => {
    render(<Home />);
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
    render(<Home />);
    samples.forEach((sample) => expect(linksTo(sample.href).length).toBeGreaterThan(0));
  });

  it("exposes the sample directory as an accessible tab interface with arrow keys", () => {
    render(<Home />);
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
    fireEvent.keyDown(tabs[0], { key: "ArrowLeft" });
    expect(tabs[4]).toHaveAttribute("aria-selected", "true");
    fireEvent.keyDown(tabs[4], { key: "Home" });
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
  });

  it("sends each visitor question in the directory to the page that answers it", () => {
    render(<Home />);
    const tabs = within(screen.getByRole("tablist", { name: /sample sites by sector/i })).getAllByRole("tab");
    samples.forEach((sample, i) => {
      fireEvent.click(tabs[i]);
      const panel = screen.getByRole("tabpanel");
      sample.routes.forEach((route) => {
        const link = within(panel).getByRole("link", { name: new RegExp(route.label.replace(/[&]/g, "\\$&")) });
        expect(link).toHaveAttribute("href", route.href);
        expect(link).toHaveTextContent(route.ask);
      });
      expect(within(panel).getByText(sample.audienceCopy)).toBeInTheDocument();
    });
  });

  it("links case studies internally and client sites externally", () => {
    const { container } = render(<Home />);
    expect(container.querySelectorAll("[data-project-card]")).toHaveLength(6);
    expect(linksTo("/projects/sipli").length).toBeGreaterThan(0);
    const littleArtist = linksTo("/projects/artling");
    expect(littleArtist.some((a) => /Little Artist/.test(a.textContent ?? ""))).toBe(true);

    const greenmead = screen.getAllByRole("link").filter((a) => a.getAttribute("href")?.includes("greenmead.co.uk"));
    expect(greenmead.length).toBeGreaterThan(0);
    greenmead.forEach((a) => {
      expect(a).toHaveAttribute("target", "_blank");
      expect(a.getAttribute("rel")).toContain("noopener");
    });
  });

  it("states the studio's thesis and renders the anti-template comparison table", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 2, name: /becomes a phone call/i })).toBeInTheDocument();
    expect(screen.getByRole("table", { name: /typical template builders/i })).toBeInTheDocument();
    expect(screen.getAllByText(/A Flutterly build/).length).toBeGreaterThan(0);
  });

  it("renders the process stops, packages and footer contact details", () => {
    render(<Home />);
    ["Listen", "Shape", "Build", "Ship"].forEach((step) => {
      expect(screen.getByRole("heading", { level: 3, name: step })).toBeInTheDocument();
    });
    ["Essentials", "Standard", "Partnership"].forEach((name) =>
      expect(screen.getByRole("heading", { name })).toBeInTheDocument()
    );
    const pricing = within(document.getElementById("packages")!);
    expect(pricing.getByText("£995")).toBeInTheDocument();
    expect(pricing.getByText("£1,490")).toBeInTheDocument();
    expect(pricing.getByText("Most popular")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /enquire about essentials/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /talk about partnership/i })).toBeInTheDocument();
    expect(screen.getAllByText(new RegExp(`© ${new Date().getFullYear()}`)).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /sales@flutterly\.co\.uk/i }).length).toBeGreaterThan(0);
  });

  it("gives every in-page anchor a target", () => {
    const { container } = render(<Home />);
    const ids = new Set([...container.querySelectorAll("[id]")].map((el) => el.id));
    [...container.querySelectorAll('a[href^="#"]')].forEach((a) => {
      const target = a.getAttribute("href")!.slice(1);
      expect(ids.has(target), `#${target}`).toBe(true);
    });
  });
});
