import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "./Hero";

describe("Hero section", () => {
  it("renders the display headline", () => {
    render(<Hero />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent(/Apps people love opening/);
    expect(h1).toHaveTextContent(/end to end/i);
  });

  it("shows the Flutterly studio label", () => {
    render(<Hero />);
    expect(screen.getByText(/Flutterly — Product studio/i)).toBeInTheDocument();
  });

  it("does not show the old availability line", () => {
    render(<Hero />);
    expect(screen.queryByText(/Open for briefs/i)).not.toBeInTheDocument();
  });

  it("renders the primary and secondary CTAs", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: /start a project/i })).toHaveAttribute(
      "href",
      "#brief"
    );
    expect(screen.getByRole("link", { name: /see my work/i })).toHaveAttribute(
      "href",
      "#work"
    );
  });

  it("renders the live dashboard metrics", () => {
    render(<Hero />);
    expect(screen.getByText("Lighthouse")).toBeInTheDocument();
    expect(screen.getByText("Apps shipped")).toBeInTheDocument();
    expect(screen.getByText(/studio metrics/i)).toBeInTheDocument();
  });
});
