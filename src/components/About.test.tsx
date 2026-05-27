import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import About from "./About";

describe("About Section", () => {
  it("renders the studio heading and quote", () => {
    render(<About />);

    expect(screen.getByText("The studio")).toBeInTheDocument();
    expect(screen.getByText(/One engineer/)).toBeInTheDocument();
    expect(screen.getByText(/I started Flutterly because/)).toBeInTheDocument();
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
