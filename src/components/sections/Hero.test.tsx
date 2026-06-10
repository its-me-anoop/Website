import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "./Hero";

describe("Hero section", () => {
  it("renders the display headline", () => {
    render(<Hero />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent(/Developer/i);
    expect(h1).toHaveTextContent(/Designer/i);
  });

  it("introduces Anoop and Flutterly in the intro copy", () => {
    render(<Hero />);
    expect(screen.getByText(/I.?m Anoop Jose/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /flutterly/i })).toHaveAttribute(
      "href",
      "#studio"
    );
  });

  it("shows the availability meta row", () => {
    render(<Hero />);
    expect(screen.getByText(/Open for briefs/i)).toBeInTheDocument();
    expect(screen.getByText(/Reading, UK/)).toBeInTheDocument();
  });

  it("renders the trust stats", () => {
    render(<Hero />);
    expect(screen.getByText("Apps shipped")).toBeInTheDocument();
    expect(screen.getByText("Experience")).toBeInTheDocument();
    expect(screen.getByText("Reply time")).toBeInTheDocument();
  });

  it("links to the selected work index", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: /see my work/i })).toHaveAttribute(
      "href",
      "#work"
    );
  });
});
