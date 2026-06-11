import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { HomeFooter } from "./HomeFooter";
import { site } from "@/lib/site";

describe("HomeFooter", () => {
  it("renders the legal line", () => {
    render(<HomeFooter />);
    expect(
      screen.getByText(new RegExp(`© \\d{4} ${site.legalName}`))
    ).toBeInTheDocument();
  });

  it("links Work, GitHub and LinkedIn", () => {
    render(<HomeFooter />);
    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute(
      "href",
      "#work"
    );
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      site.social.github
    );
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      site.social.linkedin
    );
  });

  it("credits the designer-engineer", () => {
    render(<HomeFooter />);
    expect(
      screen.getByText(new RegExp(`Designed & built by ${site.founder}`))
    ).toBeInTheDocument();
  });
});
