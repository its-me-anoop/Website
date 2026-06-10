import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Services } from "./Services";

describe("Services section", () => {
  it("renders the label and section heading", () => {
    render(<Services />);
    expect(screen.getByText("What I do")).toBeInTheDocument();
    const h2 = screen.getByRole("heading", { level: 2 });
    expect(h2).toHaveTextContent(/engineering & design/i);
  });

  it("renders all four service rows", () => {
    render(<Services />);
    expect(screen.getByText("Web Applications")).toBeInTheDocument();
    expect(screen.getByText("Mobile Apps")).toBeInTheDocument();
    expect(screen.getByText("Backend & APIs")).toBeInTheDocument();
    expect(screen.getByText("Design Systems")).toBeInTheDocument();
  });

  it("opens the first row by default and toggles on click", () => {
    render(<Services />);
    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toHaveAttribute("aria-expanded", "true");
    expect(buttons[1]).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(buttons[1]);
    expect(buttons[1]).toHaveAttribute("aria-expanded", "true");
    expect(buttons[0]).toHaveAttribute("aria-expanded", "false");
  });

  it("exposes the open row's description", () => {
    render(<Services />);
    expect(
      screen.getByText(/Production-grade web apps with Next.js/)
    ).toBeInTheDocument();
  });
});
