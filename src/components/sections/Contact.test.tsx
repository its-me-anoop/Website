import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Contact } from "./Contact";

describe("Contact Section", () => {
  it("renders the heading and copy", () => {
    render(<Contact />);

    expect(screen.getByText("Get in touch")).toBeInTheDocument();
    expect(screen.getByText(/Let.?s build/)).toBeInTheDocument();
    expect(
      screen.getByText(
        /only take a handful of projects a year/
      )
    ).toBeInTheDocument();
  });

  it("renders an email link as call-to-action", () => {
    render(<Contact />);

    const emailLinks = screen.getAllByRole("link", { name: /anoop@flutterly\.co\.uk/i });
    expect(emailLinks.length).toBeGreaterThan(0);
    expect(emailLinks[0]).toHaveAttribute("href", "mailto:anoop@flutterly.co.uk");
  });

  it("renders the contact details", () => {
    render(<Contact />);

    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Phone")).toBeInTheDocument();
    expect(screen.getByText("Office")).toBeInTheDocument();
    expect(screen.getByText("Reply")).toBeInTheDocument();

    const phoneLink = screen.getByRole("link", { name: /\+44 7780 580 534/ });
    expect(phoneLink).toHaveAttribute("href", "tel:+447780580534");

    expect(screen.getByText("Reading, UK")).toBeInTheDocument();
    expect(screen.getByText(/Within 48 hours/)).toBeInTheDocument();
  });
});
