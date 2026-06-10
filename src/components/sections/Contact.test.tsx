import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Contact } from "./Contact";

describe("Contact Section", () => {
  it("renders the giant call to action as a mail link", () => {
    render(<Contact />);
    const cta = screen.getByRole("link", { name: /start a project/i });
    expect(cta).toHaveAttribute("href", "mailto:anoop@flutterly.co.uk");
    expect(cta).toHaveTextContent(/Let.?s work/i);
    expect(cta).toHaveTextContent(/Together/i);
  });

  it("renders the qualifying copy", () => {
    render(<Contact />);
    expect(
      screen.getByText(/only take a handful of projects a year/)
    ).toBeInTheDocument();
  });

  it("renders the contact channels", () => {
    render(<Contact />);
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Phone")).toBeInTheDocument();
    expect(screen.getByText("GitHub")).toBeInTheDocument();
    expect(screen.getByText("LinkedIn")).toBeInTheDocument();

    const phone = screen.getByRole("link", { name: /\+44 7780 580 534/ });
    expect(phone).toHaveAttribute("href", "tel:+447780580534");
  });
});
