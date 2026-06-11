import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { GlassNav } from "./GlassNav";

describe("GlassNav", () => {
  it("links the wordmark back to the top", () => {
    render(<GlassNav />);
    expect(screen.getByRole("link", { name: /flutterly/i })).toHaveAttribute(
      "href",
      "#top"
    );
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
});
