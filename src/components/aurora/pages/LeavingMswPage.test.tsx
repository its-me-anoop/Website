import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { LazyMotion } from "framer-motion";
import domMax from "@/lib/motion-features";
import { LeavingMswPage } from "./LeavingMswPage";

function renderPage() {
  return render(
    <LazyMotion features={domMax} strict>
      <LeavingMswPage />
    </LazyMotion>
  );
}

function linksTo(href: string) {
  return screen.getAllByRole("link").filter((a) => a.getAttribute("href") === href);
}

describe("LeavingMswPage", () => {
  it("renders the locked hero and the two campaign CTAs", () => {
    renderPage();

    expect(
      screen.getByRole("heading", { level: 1, name: /Leaving My Surgery Website\?/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Clear Path moves you to a site you own/,
      })
    ).toBeInTheDocument();

    const auditCtas = screen.getAllByRole("link", { name: /Book a free audit/i });
    expect(auditCtas.length).toBeGreaterThan(0);
    auditCtas.forEach((link) => expect(link).toHaveAttribute("href", "/free-audit"));

    const callCtas = screen.getAllByRole("link", { name: /^Book a call$/i });
    expect(callCtas.length).toBeGreaterThan(0);
    callCtas.forEach((link) => expect(link).toHaveAttribute("href", "/book"));
  });

  it("publishes the locked Move Essentials and Move Standard prices", () => {
    const { container } = renderPage();
    const text = container.textContent ?? "";

    expect(screen.getByRole("heading", { name: "Move Essentials" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Move Standard" })).toBeInTheDocument();
    expect(text).toContain("£995");
    expect(text).toContain("£1,490");
    expect(text).toContain("£49/mo");
    expect(text).toContain("£10/mo");
    expect(text).toMatch(/31 October 2026/);
    expect(text).toMatch(/31 March 2027/);
  });

  it("states capacity honestly and does not invent supplier claims", () => {
    const { container } = renderPage();
    const text = container.textContent ?? "";

    expect(text).toMatch(/2–3 builds\/mo/);
    expect(text).not.toMatch(/7,?000/);
    expect(text).not.toMatch(/Tree View/i);
    expect(text).not.toMatch(/SurgeryWeb/i);
    expect(text).not.toMatch(/\bRADF\b/);
    expect(text).not.toMatch(/48%/);
  });

  it("points proof at the live GP demo, accessibility statement and packages", () => {
    renderPage();

    expect(linksTo("/demo/gp-practice").length).toBeGreaterThan(0);
    expect(linksTo("/accessibility").length).toBeGreaterThan(0);
    expect(linksTo("/packages").length).toBeGreaterThan(0);
    expect(linksTo("/free-audit").length).toBeGreaterThan(0);
    expect(linksTo("/book").length).toBeGreaterThan(0);
  });

  it("does not send package CTAs to mailto or a packages-only pitch", () => {
    renderPage();

    const packageAudits = screen
      .getAllByRole("link", { name: /Book a free audit/i })
      .filter((link) => link.getAttribute("href") === "/free-audit");
    expect(packageAudits.length).toBeGreaterThanOrEqual(2);

    const mailtos = screen
      .getAllByRole("link")
      .filter((a) => (a.getAttribute("href") ?? "").startsWith("mailto:"));
    /* Footer and CtaBand still offer email; package cards must not. */
    mailtos.forEach((a) => {
      expect(a.textContent).not.toMatch(/Essentials|Standard/i);
    });
  });
});
