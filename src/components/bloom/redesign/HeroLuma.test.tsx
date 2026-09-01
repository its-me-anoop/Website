import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { HeroLuma } from "./HeroLuma";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual<typeof import("framer-motion")>("framer-motion");
  return {
    ...actual,
    useReducedMotion: () => true,
  };
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("HeroLuma", () => {
  it("renders the Luma-style hero question, CTA and path decoration", () => {
    const { container } = render(
      <section className="heroSection">
        <HeroLuma />
      </section>,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "What will you ship?" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Get started/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Book a call" })).toHaveAttribute("href", "/book");
    expect(container.querySelector("[data-hero-luma-path]")).toBeTruthy();
    expect(container.querySelectorAll("[data-tone]").length).toBeGreaterThanOrEqual(3);
  });
});
