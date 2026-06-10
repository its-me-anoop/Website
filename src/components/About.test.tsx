import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import About from "./About";

describe("About Section", () => {
  it("renders the section heading", () => {
    render(<About />);
    const h2 = screen.getByRole("heading", { level: 2 });
    expect(h2).toHaveTextContent(/About/i);
    expect(h2).toHaveTextContent(/the studio/i);
  });

  it("renders the founding quote", () => {
    render(<About />);
    expect(screen.getByText(/I started Flutterly because/)).toBeInTheDocument();
    expect(screen.getByText(/So I stopped handing it off/)).toBeInTheDocument();
  });

  it("renders founder caption details", () => {
    render(<About />);
    expect(screen.getByText(/Founder · Lead Engineer/)).toBeInTheDocument();
    expect(screen.getByText("Anoop Jose")).toBeInTheDocument();
  });

  it("renders the studio meta details", () => {
    render(<About />);
    expect(screen.getByText("Founded")).toBeInTheDocument();
    expect(screen.getByText("Based")).toBeInTheDocument();
    expect(screen.getByText("Team")).toBeInTheDocument();
    expect(screen.getByText("Reply time")).toBeInTheDocument();
  });
});
