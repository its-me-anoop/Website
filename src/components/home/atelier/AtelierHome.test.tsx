import React from "react";
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { LazyMotion } from "framer-motion";
import domMax from "@/lib/motion-features";
import { AtelierHome } from "./AtelierHome";

/** The app provides LazyMotion in `template.tsx`; mirror that here. */
function renderHome() {
  return render(
    <LazyMotion features={domMax} strict>
      <AtelierHome />
    </LazyMotion>
  );
}

describe("AtelierHome", () => {
  it("renders the hero headline and studio eyebrow", () => {
    renderHome();

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(/Design, build/);
    expect(heading).toHaveTextContent(/people love to use/);
    expect(
      screen.getByText(/Independent product studio · Reading, UK/i)
    ).toBeInTheDocument();
  });

  it("exposes primary navigation with section links", () => {
    renderHome();

    const nav = screen.getByRole("navigation", { name: /primary/i });
    expect(nav).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /start a project/i }).length)
      .toBeGreaterThan(0);
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

  it("switches the folder tabs between apps and web work", async () => {
    renderHome();

    const webTab = screen.getByRole("tab", { name: /web/i });
    expect(webTab).toHaveAttribute("aria-selected", "false");

    fireEvent.click(webTab);

    expect(webTab).toHaveAttribute("aria-selected", "true");
    expect(
      await screen.findByAltText(/Greenmead Housing website/i)
    ).toBeInTheDocument();
  });

  it("advances the featured showcase with the arrow controls", () => {
    renderHome();

    expect(screen.getByText(/Case study · Adaptive hydration/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /next project/i }));

    expect(screen.getByText(/Case study · Family memories/i)).toBeInTheDocument();
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
