import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("Footer Component", () => {
  it("renders the legal line and credits", () => {
    render(<Footer />);
    expect(screen.getByText(/2026 Flutterly Ltd/)).toBeInTheDocument();
    expect(screen.getByText(/Anoop Jose/)).toBeInTheDocument();
  });

  it("renders the footer link rail", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /^Work$/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Services/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Process/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /About/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Sipli/i })).toHaveAttribute(
      "href",
      "/projects/sipli"
    );
  });
});
