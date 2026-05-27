import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

describe("Footer Component", () => {
  it("renders the brand and copyright info", () => {
    render(<Footer />);

    // The brand logo/name appears in the header
    expect(screen.getAllByText(/Flutterly/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/2026/)).toBeInTheDocument();
    expect(screen.getByText(/Anoop Jose/)).toBeInTheDocument();
  });

  it("renders the link columns", () => {
    render(<Footer />);

    expect(screen.getByRole("link", { name: /Services/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^Work$/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Process/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /About/i })).toBeInTheDocument();
  });
});
