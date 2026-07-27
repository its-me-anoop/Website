import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { LazyMotion } from "framer-motion";
import domMax from "@/lib/motion-features";
import { BloomHome } from "./BloomHome";

/** The app provides LazyMotion in `template.tsx`; mirror that here. */
function renderHome() {
  return render(
    <LazyMotion features={domMax} strict>
      <BloomHome />
    </LazyMotion>
  );
}

describe("BloomHome", () => {
  it("renders the hero headline and studio eyebrow", () => {
    renderHome();

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(/Websites that care for/);
    expect(heading).toHaveTextContent(/who use them/);
    expect(
      screen.getByText(/Independent product studio · Reading, UK/i)
    ).toBeInTheDocument();
  });

  it("exposes primary navigation with the healthcare sector pages", () => {
    renderHome();

    const nav = screen.getByRole("navigation", { name: /primary/i });
    expect(nav).toBeInTheDocument();

    ["/gp-websites", "/care-home-websites", "/packages"].forEach((href) => {
      const links = screen
        .getAllByRole("link")
        .filter((a) => a.getAttribute("href") === href);
      expect(links.length).toBeGreaterThan(0);
    });
    expect(
      screen.getAllByRole("link", { name: /get in touch/i }).length
    ).toBeGreaterThan(0);
  });

  it("offers the free website audit prominently", () => {
    renderHome();

    const auditLinks = screen
      .getAllByRole("link")
      .filter((a) => a.getAttribute("href") === "/free-audit");
    expect(auditLinks.length).toBeGreaterThan(0);
  });

  it("links to the hosted sample sites from the sector cards", () => {
    renderHome();

    ["/demo/gp-practice", "/demo/care-home"].forEach((href) => {
      const links = screen
        .getAllByRole("link")
        .filter((a) => a.getAttribute("href") === href);
      expect(links.length).toBeGreaterThan(0);
    });
  });

  it("links case studies internally and client sites externally", () => {
    renderHome();

    const sipli = screen
      .getAllByRole("link")
      .filter((a) => a.getAttribute("href") === "/projects/sipli");
    expect(sipli.length).toBeGreaterThan(0);

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
      name: /comparison of typical template builders/i,
    });
    expect(table).toBeInTheDocument();
    expect(screen.getByText(/A Flutterly build/)).toBeInTheDocument();
  });

  it("renders the process steps and footer contact details", () => {
    renderHome();

    ["Listen", "Shape", "Build", "Ship"].forEach((step) => {
      expect(
        screen.getByRole("heading", { level: 3, name: step })
      ).toBeInTheDocument();
    });

    expect(
      screen.getAllByText(new RegExp(`© ${new Date().getFullYear()}`)).length
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("link", { name: /anoop@flutterly\.co\.uk/i }).length
    ).toBeGreaterThan(0);
  });
});
