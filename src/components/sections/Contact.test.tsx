import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Contact } from "./Contact";

describe("Contact Section", () => {
  it("renders the heading and copy correctly", () => {
    render(<Contact />);
    
    expect(screen.getByText("№ 06 · The brief")).toBeInTheDocument();
    expect(screen.getByText(/Got a brief/)).toBeInTheDocument();
    expect(screen.getByText(/worth/)).toBeInTheDocument();
    expect(screen.getByText(/building/)).toBeInTheDocument();
    expect(
      screen.getByText(
        /We only take a handful of projects a year, so not every fit is the right fit/
      )
    ).toBeInTheDocument();
  });

  it("renders the email call-to-action button correctly", () => {
    render(<Contact />);
    
    const emailLinks = screen.getAllByRole("link", { name: /anoop@flutterly.co.uk/ });
    expect(emailLinks.length).toBeGreaterThan(0);
    expect(emailLinks[0]).toHaveAttribute("href", "mailto:anoop@flutterly.co.uk");
  });

  it("renders the other contact specifications accurately", () => {
    render(<Contact />);
    
    expect(screen.getByText("Write")).toBeInTheDocument();
    expect(screen.getByText("Ring")).toBeInTheDocument();
    expect(screen.getByText("Visit")).toBeInTheDocument();
    expect(screen.getByText("Usual reply")).toBeInTheDocument();
    
    expect(screen.getByRole("link", { name: /\+44 7780 580 534/ })).toHaveAttribute(
      "href",
      "tel:+447780580534"
    );
    expect(screen.getByText("Reading, UK")).toBeInTheDocument();
    expect(screen.getByText("Within a working day")).toBeInTheDocument();
  });
});
