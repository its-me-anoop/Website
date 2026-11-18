import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { navLinks } from "@/lib/marketing/content";
import { services } from "@/lib/marketing/services";
import { Nav } from "./Nav";

const nav = vi.hoisted(() => ({ pathname: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => nav.pathname }));

beforeEach(() => {
  nav.pathname = "/";
});
afterEach(() => {
  document.documentElement.style.overflow = "";
});

const toggle = () => screen.getByRole("button", { name: /menu/ });
const index = () => screen.queryByRole("navigation", { name: "Site menu" });

describe("the floating bar", () => {
  it("links the wordmark home and keeps the booking pill in reach", () => {
    render(<Nav />);
    expect(screen.getByRole("link", { name: "Flutterly home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Book a call" })).toHaveAttribute("href", "/book");
    expect(screen.getByRole("link", { name: "Free audit" })).toHaveAttribute("href", "/free-audit");
  });

  it("does not block the page underneath: only the pills take the pointer", () => {
    const { container } = render(<Nav />);
    expect(container.querySelector("header")).toHaveClass("pointer-events-none");
    expect(screen.getByRole("navigation", { name: "Primary" })).toHaveClass("pointer-events-auto");
  });
});

describe("the index", () => {
  it("is closed until asked for, and says so", () => {
    render(<Nav />);
    expect(index()).toBeNull();
    expect(toggle()).toHaveAttribute("aria-expanded", "false");
    expect(toggle()).toHaveAttribute("aria-controls", "site-menu");
  });

  it("lays out every route as a numbered card, then the services and the two ways to start", () => {
    render(<Nav />);
    fireEvent.click(toggle());
    const sheet = index()!;
    expect(toggle()).toHaveAttribute("aria-expanded", "true");
    expect(toggle()).toHaveAccessibleName("Close menu");
    const hrefs = within(sheet)
      .getAllByRole("link")
      .map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual([
      ...navLinks.map((l) => l.href),
      ...services.map((s) => `/services/${s.slug}`),
      "/free-audit",
      "/book",
    ]);
    /* The numerals are decoration: a card is named by its route alone. */
    navLinks.forEach((l) => expect(within(sheet).getByRole("link", { name: l.label })).toBeInTheDocument());
  });

  it("stops the page behind it from scrolling, and lets it go again", () => {
    render(<Nav />);
    fireEvent.click(toggle());
    expect(document.documentElement.style.overflow).toBe("hidden");
    fireEvent.click(toggle());
    expect(document.documentElement.style.overflow).toBe("");
  });

  it("closes on Escape and hands focus back to the pill that opened it", () => {
    render(<Nav />);
    fireEvent.click(toggle());
    fireEvent.keyDown(window, { key: "Escape" });
    expect(index()).toBeNull();
    expect(toggle()).toHaveFocus();
  });

  it("keeps Tab inside itself, wrapping from the last link to the pill and back", () => {
    render(<Nav />);
    fireEvent.click(toggle());
    const links = within(index()!).getAllByRole("link");
    const last = links[links.length - 1];
    last.focus();
    fireEvent.keyDown(window, { key: "Tab" });
    expect(toggle()).toHaveFocus();
    fireEvent.keyDown(window, { key: "Tab", shiftKey: true });
    expect(last).toHaveFocus();
  });

  it("closes when a card is chosen", () => {
    render(<Nav />);
    fireEvent.click(toggle());
    fireEvent.click(within(index()!).getByRole("link", { name: "Packages" }));
    expect(index()).toBeNull();
  });

  it("marks the page you are on", () => {
    nav.pathname = "/services";
    render(<Nav />);
    fireEvent.click(toggle());
    const card = within(index()!).getByRole("link", { name: "Services" });
    expect(card).toHaveAttribute("aria-current", "page");
    expect(card).toHaveTextContent("you are here");
  });
});
