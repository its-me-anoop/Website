import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { AboutScreen } from "./AboutScreen";
import { ContactScreen } from "./ContactScreen";
import { HomeScreen } from "./HomeScreen";
import { PackagesScreen } from "./PackagesScreen";
import { SectorScreen } from "./SectorScreen";

let pathname = "/";

vi.mock("next/navigation", () => ({
  usePathname: () => pathname,
}));

afterEach(() => {
  pathname = "/";
  cleanup();
});

describe("Flutterly redesign screens", () => {
  it("renders the Home navigation, six live-work cards and safe external links", () => {
    const { container } = render(<HomeScreen />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Digital delivery for organisations people rely on.",
      }),
    ).toBeInTheDocument();

    const primary = screen.getByRole("navigation", {
      name: "Primary navigation",
    });
    [
      "/",
      "/gp-websites",
      "/care-home-websites",
      "/packages",
      "/about",
      "/contact",
    ].forEach((href) => {
      expect(primary.querySelector(`a[href="${href}"]`)).toBeTruthy();
    });

    expect(container.querySelectorAll("[data-project-card]")).toHaveLength(6);
    const externalProjects = container.querySelectorAll<HTMLAnchorElement>(
      '[data-project-card][target="_blank"]',
    );
    expect(externalProjects).toHaveLength(4);
    externalProjects.forEach((link) => {
      expect(link.rel).toContain("noopener");
      expect(link.rel).toContain("noreferrer");
    });
    expect(screen.getByRole("link", { name: "Request a free audit" })).toHaveAttribute(
      "href",
      "/free-audit",
    );
  });

  it("keeps both sector samples usable on their production routes", () => {
    const gp = render(<SectorScreen sector="gp" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "A practice website that works as hard as your reception team",
    );
    expect(
      screen
        .getAllByRole("link")
        .some((link) => link.getAttribute("href") === "/demo/gp-practice"),
    ).toBe(true);
    gp.unmount();

    render(<SectorScreen sector="care" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "A home families trust before they ever visit.",
    );
    expect(
      screen
        .getAllByRole("link")
        .some((link) => link.getAttribute("href") === "/demo/care-home"),
    ).toBe(true);
  });

  it("renders Packages with three tailored quote actions", () => {
    render(<PackagesScreen />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Clear packages. Honest quotes.",
    );
    expect(screen.getAllByRole("link", { name: "Get a tailored quote" })).toHaveLength(3);
  });

  it("marks the current route and keeps the mobile menu keyboard-dismissible", () => {
    pathname = "/contact";
    render(<ContactScreen />);

    const primary = screen.getByRole("navigation", {
      name: "Primary navigation",
    });
    expect(within(primary).getByRole("link", { name: "Contact" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(within(primary).getByRole("link", { name: "Home" })).not.toHaveAttribute(
      "aria-current",
    );

    const menuButton = screen.getByRole("button", { name: "Open menu" });
    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("navigation", { name: "Mobile navigation" }),
    ).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.queryByRole("navigation", { name: "Mobile navigation" }),
    ).not.toBeInTheDocument();
  });

  it("renders the new About and Contact routes with direct contact and booking choices", () => {
    const about = render(<AboutScreen />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Direct digital delivery, with one person accountable.",
    );
    expect(
      screen
        .getAllByRole("link", { name: "anoop@flutterly.co.uk" })
        .some((link) => link.getAttribute("href") === "mailto:anoop@flutterly.co.uk"),
    ).toBe(true);
    about.unmount();

    render(<ContactScreen />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Email Anoop. Or book a call.",
    );
    [
      ["Fit check", "/book/intro-call"],
      ["Scope talk", "/book/consultation"],
      ["Walkthrough", "/book/project-scoping"],
    ].forEach(([name, href]) => {
      expect(screen.getByRole("link", { name: new RegExp(name) })).toHaveAttribute(
        "href",
        href,
      );
    });
  });
});
