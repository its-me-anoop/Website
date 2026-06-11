import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { About } from "./About";
import { site } from "@/lib/site";

describe("About (aurora)", () => {
  it("renders the heading", () => {
    render(<About />);
    expect(
      screen.getByRole("heading", { level: 2, name: /deliberately/i })
    ).toBeInTheDocument();
  });

  it("renders the studio facts", () => {
    render(<About />);
    expect(screen.getByText("Founded")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText("Reading, UK")).toBeInTheDocument();
    expect(screen.getByText("1 + collaborators")).toBeInTheDocument();
  });

  it("shows the portrait with a descriptive alt", () => {
    render(<About />);
    expect(
      screen.getByAltText(/Anoop Jose — founder and lead engineer/i)
    ).toBeInTheDocument();
  });

  it("links GitHub and LinkedIn profiles", () => {
    render(<About />);
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      site.social.github
    );
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      site.social.linkedin
    );
  });
});
