import React from "react";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { LazyMotion } from "framer-motion";
import domMax from "@/lib/motion-features";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

const nav = vi.hoisted(() => ({ pathname: "/packages" }));
vi.mock("next/navigation", () => ({ usePathname: () => nav.pathname }));

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
beforeEach(() => {
  nav.pathname = "/packages";
});

const withMotion = (ui: React.ReactNode) =>
  render(
    <LazyMotion features={domMax} strict>
      {ui}
    </LazyMotion>
  );

const openMenu = () => fireEvent.click(screen.getByRole("button", { name: "Open menu" }));

describe("Packages link", () => {
  it("sits in the desktop nav, labelled to match the page, straight after Services", () => {
    withMotion(<Nav />);
    const primary = screen.getByRole("navigation", { name: "Primary" });
    const links = within(primary).getAllByRole("link");
    expect(links.map((l) => l.textContent)).toEqual(["Services", "Packages", "Work", "Healthcare", "Studio", "Contact"]);
    expect(within(primary).getByRole("link", { name: "Packages" })).toHaveAttribute("href", "/packages");
  });

  it("is marked as the current page in the desktop nav on /packages", () => {
    withMotion(<Nav />);
    const primary = screen.getByRole("navigation", { name: "Primary" });
    expect(within(primary).getByRole("link", { name: "Packages" })).toHaveAttribute("aria-current", "page");
    expect(within(primary).getByRole("link", { name: "Services" })).not.toHaveAttribute("aria-current");
  });

  it("is not marked current on other pages", () => {
    nav.pathname = "/services";
    withMotion(<Nav />);
    const primary = screen.getByRole("navigation", { name: "Primary" });
    expect(within(primary).getByRole("link", { name: "Packages" })).not.toHaveAttribute("aria-current");
    expect(within(primary).getByRole("link", { name: "Services" })).toHaveAttribute("aria-current", "page");
  });

  it("appears in the mobile menu and is marked current on /packages", () => {
    withMotion(<Nav />);
    openMenu();
    const sheet = screen.getByRole("navigation", { name: "Site menu" });
    const link = within(sheet).getByRole("link", { name: /Packages/ });
    expect(link).toHaveAttribute("href", "/packages");
    expect(link).toHaveAttribute("aria-current", "page");
  });

  it("is not marked current in the mobile menu on other pages", () => {
    nav.pathname = "/";
    withMotion(<Nav />);
    openMenu();
    const sheet = screen.getByRole("navigation", { name: "Site menu" });
    expect(within(sheet).getByRole("link", { name: /Packages/ })).not.toHaveAttribute("aria-current");
  });

  it("appears in the footer's Studio column with the same label", () => {
    nav.pathname = "/";
    withMotion(<Footer />);
    const footer = screen.getByRole("navigation", { name: "Footer" });
    const studio = within(footer).getByRole("heading", { name: "Studio" }).parentElement!;
    const link = within(studio).getByRole("link", { name: "Packages" });
    expect(link).toHaveAttribute("href", "/packages");
    expect(link).not.toHaveAttribute("aria-current");
  });

  it("links to /packages only once in the footer, with no old Healthcare entry", () => {
    nav.pathname = "/";
    withMotion(<Footer />);
    const footer = screen.getByRole("navigation", { name: "Footer" });
    const toPackages = within(footer)
      .getAllByRole("link")
      .filter((l) => l.getAttribute("href") === "/packages");
    expect(toPackages).toHaveLength(1);
    expect(within(footer).queryByRole("link", { name: "Website packages" })).not.toBeInTheDocument();
    const healthcare = within(footer).getByRole("heading", { name: "Healthcare" }).parentElement!;
    expect(within(healthcare).queryByRole("link", { name: /packages/i })).not.toBeInTheDocument();
  });

  it("is marked as the current page in the footer on /packages", () => {
    withMotion(<Footer />);
    const footer = screen.getByRole("navigation", { name: "Footer" });
    const studio = within(footer).getByRole("heading", { name: "Studio" }).parentElement!;
    expect(within(studio).getByRole("link", { name: "Packages" })).toHaveAttribute("aria-current", "page");
  });
});
