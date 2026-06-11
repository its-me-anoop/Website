import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "./Hero";

describe("Hero (aurora)", () => {
  it("renders the display headline", () => {
    render(<Hero />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent(/Design-grade/i);
    expect(h1).toHaveTextContent(/engineering/i);
  });

  it("positions the studio and credits Anoop Jose", () => {
    render(<Hero />);
    expect(
      screen.getByText(/one-person product studio in Reading, UK/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Anoop Jose/)).toBeInTheDocument();
  });

  it("renders both CTAs with in-page targets", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: /see the work/i })).toHaveAttribute(
      "href",
      "#work"
    );
    expect(
      screen.getByRole("link", { name: /start a project/i })
    ).toHaveAttribute("href", "#contact");
  });

  it("renders the stat strip", () => {
    render(<Hero />);
    expect(screen.getByText("Apps shipped")).toBeInTheDocument();
    expect(screen.getByText("Lighthouse")).toBeInTheDocument();
    expect(screen.getByText("Reply time")).toBeInTheDocument();
    expect(screen.getByText("Keyboard, no hand-offs")).toBeInTheDocument();
  });
});
