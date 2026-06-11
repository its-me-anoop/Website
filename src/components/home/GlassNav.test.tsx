import React from "react";
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { GlassNav } from "./GlassNav";

describe("GlassNav", () => {
  it("links the wordmark (with the Flutterly logo) back to the top", () => {
    render(<GlassNav />);
    const home = screen.getByRole("link", { name: /flutterly/i });
    expect(home).toHaveAttribute("href", "#top");
    const logo = home.querySelector("img");
    expect(logo).not.toBeNull();
    expect(logo!.getAttribute("src")).toContain("flutterly-logo");
  });

  it("renders all section links", () => {
    render(<GlassNav />);
    for (const [name, href] of [
      ["Work", "#work"],
      ["Services", "#services"],
      ["Process", "#process"],
      ["About", "#about"],
    ]) {
      expect(screen.getByRole("link", { name })).toHaveAttribute("href", href);
    }
  });

  it("renders the contact CTA", () => {
    render(<GlassNav />);
    expect(
      screen.getByRole("link", { name: /start a project/i })
    ).toHaveAttribute("href", "#contact");
  });

  it("opens and closes the mobile menu", () => {
    render(<GlassNav />);
    const toggle = screen.getByRole("button", { name: /open menu/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.queryByRole("navigation", { name: /mobile/i })
    ).not.toBeInTheDocument();

    fireEvent.click(toggle);
    const menu = screen.getByRole("navigation", { name: /mobile/i });
    expect(menu).toBeInTheDocument();
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    // the panel carries all four section links plus the contact CTA
    expect(menu.querySelectorAll('a[href^="#"]')).toHaveLength(5);

    // choosing a section closes the menu again
    const mobileWork = menu.querySelector('a[href="#work"]')!;
    fireEvent.click(mobileWork);
    expect(
      screen.queryByRole("navigation", { name: /mobile/i })
    ).not.toBeInTheDocument();
  });
});
