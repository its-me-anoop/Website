import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

describe("Footer Component", () => {
  it("renders the studio brand and copyright info correctly", () => {
    render(<Footer />);
    
    expect(screen.getByText("Flutterly Ltd")).toBeInTheDocument();
    expect(screen.getByText(/2026/)).toBeInTheDocument();
    expect(screen.getByText(/Anoop Jose/)).toBeInTheDocument();
  });

  it("renders secondary navigation links", () => {
    render(<Footer />);
    
    expect(screen.getByRole("link", { name: "Work" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Practice" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Open Source" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Studio" })).toBeInTheDocument();
  });
});
