import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { AboutScreen } from "./AboutScreen";
import { BookScreen } from "./BookScreen";
import { ContactScreen } from "./ContactScreen";
import { HomeScreen } from "./HomeScreen";
import { PackagesScreen } from "./PackagesScreen";
import { SectorScreen } from "./SectorScreen";
import { ServicesScreen } from "./ServicesScreen";

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

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
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
    expect(container.querySelector("[data-hero-grain]")).toBeTruthy();
  });

  it("keeps the frozen hero grain on Home only", () => {
    const screens = [
      <PackagesScreen key="packages" />,
      <SectorScreen key="gp" sector="gp" />,
      <SectorScreen key="care" sector="care" />,
      <AboutScreen key="about" />,
      <ContactScreen key="contact" />,
      <ServicesScreen key="services" />,
      <BookScreen key="book" />,
    ];

    screens.forEach((screen) => {
      const view = render(screen);
      expect(view.container.querySelector("[data-hero-grain]")).toBeNull();
      view.unmount();
    });
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

  it("publishes locked Essentials and Standard prices +VAT and keeps Complete quote-only", () => {
    render(<PackagesScreen />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Clear packages. Honest quotes.",
    );
    expect(screen.queryByText("No currency on this page.")).not.toBeInTheDocument();
    expect(
      screen.getByText(/Essentials and Standard are priced\. Complete is quote-only\./i),
    ).toBeInTheDocument();
    expect(screen.getByText(/published prices are \+VAT/i)).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Get a tailored quote" })).toHaveLength(1);

    const essentials = screen
      .getByRole("heading", { name: "A focused site, done properly" })
      .closest("article");
    expect(essentials).toHaveTextContent("£995");
    expect(essentials).toHaveTextContent("£10");
    expect(essentials).toHaveTextContent("+VAT");
    expect(screen.getByRole("link", { name: "Start Essentials" })).toHaveAttribute(
      "href",
      "mailto:anoop@flutterly.co.uk?subject=Start%20Essentials",
    );

    const standard = screen
      .getByRole("heading", { name: "Build plus a care plan" })
      .closest("article");
    expect(standard).toHaveTextContent("£1,490");
    expect(standard).toHaveTextContent("£49");
    expect(standard).toHaveTextContent("+VAT");
    expect(within(standard as HTMLElement).getByText("Most popular")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Start Standard" })).toHaveAttribute(
      "href",
      "mailto:anoop@flutterly.co.uk?subject=Start%20Standard",
    );

    const complete = screen
      .getByRole("heading", { name: "An ongoing digital partner" })
      .closest("article");
    expect(complete?.textContent).not.toMatch(/£/);
    expect(complete).toHaveTextContent("Quote-only");
    expect(screen.getByRole("link", { name: "Get a tailored quote" })).toBeInTheDocument();
  });

  it("renders Field Notes Services and Book from live copy", () => {
    const services = render(<ServicesScreen />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Digital services that work together.",
    );
    expect(screen.getByRole("link", { name: "Discuss what you need" })).toHaveAttribute(
      "href",
      "mailto:anoop@flutterly.co.uk?subject=Digital%20project%20enquiry",
    );
    expect(screen.getByRole("link", { name: "Review website care plans" })).toHaveAttribute(
      "href",
      "/packages",
    );
    expect(services.container.querySelector("[data-hero-grain]")).toBeNull();
    services.unmount();

    const book = render(<BookScreen />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Pick a time, skip the email tennis.",
    );
    const pickLinks = screen.getAllByRole("link", { name: "Pick a time" });
    expect(pickLinks).toHaveLength(3);
    expect(pickLinks[0]).toHaveAttribute(
      "href",
      "https://cal.com/anoop-jose-jtij1j/intro",
    );
    expect(pickLinks[1]).toHaveAttribute(
      "href",
      "https://cal.com/anoop-jose-jtij1j/consultation",
    );
    expect(pickLinks[2]).toHaveAttribute(
      "href",
      "https://cal.com/anoop-jose-jtij1j/project-scoping",
    );
    expect(screen.queryByText(/Not yet bookable online/i)).toBeNull();
    expect(screen.getByRole("heading", { name: "Intro call" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Consultation" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Project scoping" })).toBeInTheDocument();
    expect(book.container.querySelector("[data-hero-grain]")).toBeNull();
  });

  it("marks the current route and keeps the mobile menu keyboard-dismissible", () => {
    pathname = "/contact";
    render(<ContactScreen />);

    const menuButton = screen.getByRole("button", { name: "Open menu" });
    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-expanded", "true");

    const primary = screen.getByRole("navigation", {
      name: "Primary navigation",
    });
    expect(within(primary).getByRole("link", { name: /Contact/ })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(within(primary).getByRole("link", { name: /Home/ })).not.toHaveAttribute(
      "aria-current",
    );

    fireEvent.keyDown(window, { key: "Escape" });
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
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
    expect(screen.getByRole("link", { name: /Fit check/i })).toHaveAttribute(
      "href",
      "https://cal.com/anoop-jose-jtij1j/intro",
    );
    expect(screen.getByRole("link", { name: /Scope talk/i })).toHaveAttribute(
      "href",
      "https://cal.com/anoop-jose-jtij1j/consultation",
    );
    expect(screen.getByRole("link", { name: /Walkthrough/i })).toHaveAttribute(
      "href",
      "https://cal.com/anoop-jose-jtij1j/project-scoping",
    );
    expect(screen.queryByText(/Not yet bookable online/i)).toBeNull();
  });
});
