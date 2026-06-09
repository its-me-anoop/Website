import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "./Hero";

describe("Hero section", () => {
  it("renders the headline and subhead", () => {
    render(<Hero />);
    expect(screen.getByText(/love opening/)).toBeInTheDocument();
    expect(screen.getByText(/Developer and designer crafting/)).toBeInTheDocument();
  });

  it("introduces Anoop by name", () => {
    render(<Hero />);
    expect(screen.getByText(/Anoop Jose/)).toBeInTheDocument();
  });

  it("renders the primary and secondary CTAs", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: /see my work/i })).toHaveAttribute(
      "href",
      "#work"
    );
    expect(
      screen.getByRole("link", { name: /start a project/i })
    ).toHaveAttribute("href", "#brief");
  });

  it("renders the live demo tabs", () => {
    render(<Hero />);
    const tablist = screen.getByRole("tablist", { name: /live demo screens/i });
    expect(tablist).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /hydration/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /insights/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /coach/i })).toBeInTheDocument();
  });

  it("renders the trust stats", () => {
    render(<Hero />);
    expect(screen.getByText("Apps shipped")).toBeInTheDocument();
    expect(screen.getByText("Lighthouse")).toBeInTheDocument();
  });
});
