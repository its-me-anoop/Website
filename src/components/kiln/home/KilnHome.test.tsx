import React from "react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { LazyMotion } from "framer-motion";
import domMax from "@/lib/motion-features";
import { KilnHome } from "./KilnHome";

// jsdom has no layout observer; real sizing and particle movement are
// verified in the browser. Keep the mock local to these hero consumers.
beforeAll(() => {
  vi.stubGlobal("ResizeObserver", class {
    observe() {}
    unobserve() {}
    disconnect() {}
  });
});
afterAll(() => vi.unstubAllGlobals());

/** The app provides LazyMotion in `template.tsx`; mirror that here. */
function renderHome() {
  return render(
    <LazyMotion features={domMax} strict>
      <KilnHome />
    </LazyMotion>
  );
}

function linksTo(href: string) {
  return screen.getAllByRole("link").filter((a) => a.getAttribute("href") === href);
}

describe("KilnHome", () => {
  it("keeps duplicate marquee links out of keyboard navigation", () => {
    const { container } = renderHome();
    const duplicate = container.querySelector("#top ul[aria-hidden='true']");
    expect(duplicate).not.toHaveAttribute("inert");
    duplicate?.querySelectorAll("a").forEach((link) => expect(link).toHaveAttribute("tabindex", "-1"));
    expect(screen.getByRole("list", { name: "Finished websites by Flutterly" }).querySelectorAll("a")).toHaveLength(7);
  });

  it("renders the hero headline", () => {
    renderHome();

    /* The visual audience word cycles and is aria-hidden; the accessible
       name must stay fixed on the static word. */
    const heading = screen.getByRole("heading", {
      level: 1,
      name: /One studio\. Every page your patients need\./,
    });
    expect(heading).toBeInTheDocument();
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

    /* Header action, menu-sheet action (closed, so not rendered), closing
       band button and footer column: at least three routes in. */
    expect(linksTo("/book").length).toBeGreaterThanOrEqual(3);
    expect(screen.getAllByRole("link", { name: /^Book a call$/i }).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /Book a 15-minute call/i })).toHaveAttribute(
      "href",
      "/book"
    );
  });

  it("offers the free website audit as a form and as a route", () => {
    renderHome();

    expect(linksTo("/free-audit").length).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("button", { name: /run the free website audit/i }).length
    ).toBeGreaterThan(0);
    const inputs = screen.getAllByRole("textbox", { name: /your website address/i });
    expect(inputs.length).toBeGreaterThan(0);

    /* A plain GET form to /audit: works before hydration and yields a
       shareable report address. */
    inputs.forEach((input) => {
      expect(input).toHaveAttribute("name", "url");
      const form = input.closest("form");
      expect(form).toHaveAttribute("action", "/audit");
      expect(form?.getAttribute("method")?.toLowerCase()).toBe("get");
    });
  });

  it("links to all five hosted sample sites", () => {
    renderHome();

    [
      "/demo/gp-practice",
      "/demo/care-home",
      "/demo/dental-practice",
      "/demo/pharmacy",
      "/demo/physio-clinic",
    ].forEach((href) => {
      expect(linksTo(href).length).toBeGreaterThan(0);
    });
  });

  it("exposes the sample showcase as an accessible tab interface", () => {
    renderHome();

    const tablist = screen.getByRole("tablist", { name: /sample sites by sector/i });
    expect(tablist).toBeInTheDocument();
    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(5);
    expect(tabs.filter((t) => t.getAttribute("aria-selected") === "true")).toHaveLength(1);
    expect(screen.getByRole("tabpanel")).toBeInTheDocument();
  });

  it("links case studies internally and client sites externally", () => {
    renderHome();

    expect(linksTo("/projects/sipli").length).toBeGreaterThan(0);

    const greenmead = screen
      .getAllByRole("link")
      .filter((a) => a.getAttribute("href")?.includes("greenmead.co.uk"));
    expect(greenmead.length).toBeGreaterThan(0);
    greenmead.forEach((a) => {
      expect(a).toHaveAttribute("target", "_blank");
      expect(a.getAttribute("rel")).toContain("noopener");
    });
  });

  it("renders the anti-template comparison table", () => {
    renderHome();

    const table = screen.getByRole("table", {
      name: /typical template builders/i,
    });
    expect(table).toBeInTheDocument();
    expect(screen.getAllByText(/A Flutterly build/).length).toBeGreaterThan(0);
  });

  it("renders the process steps, packages and footer contact details", () => {
    renderHome();

    ["Listen", "Shape", "Build", "Ship"].forEach((step) => {
      expect(screen.getByRole("heading", { level: 3, name: step })).toBeInTheDocument();
    });

    expect(screen.getByRole("heading", { name: "Essentials" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Standard" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Partnership" })).toBeInTheDocument();
    expect(screen.getByText("£995")).toBeInTheDocument();
    expect(screen.getByText("£1,490")).toBeInTheDocument();
    expect(screen.getByText("Most popular")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /enquire about essentials/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /enquire about standard/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /talk about partnership/i })).toBeInTheDocument();

    expect(
      screen.getAllByText(new RegExp(`© ${new Date().getFullYear()}`)).length
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("link", { name: /sales@flutterly\.co\.uk/i }).length
    ).toBeGreaterThan(0);
  });
});
