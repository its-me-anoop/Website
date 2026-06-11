import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Contact } from "./Contact";
import { site } from "@/lib/site";

describe("Contact (aurora)", () => {
  it("renders the closing headline", () => {
    render(<Contact />);
    const h2 = screen.getByRole("heading", { level: 2 });
    expect(h2).toHaveTextContent(/let.s build/i);
    expect(h2).toHaveTextContent(/something\./i);
  });

  it("renders the magnetic email CTA as a mailto link", () => {
    render(<Contact />);
    expect(
      screen.getByRole("link", { name: new RegExp(site.email) })
    ).toHaveAttribute("href", `mailto:${site.email}`);
  });

  it("renders phone, location and reply-time details", () => {
    render(<Contact />);
    expect(screen.getByText(site.phoneDisplay)).toBeInTheDocument();
    expect(screen.getByText("READING, UK")).toBeInTheDocument();
    expect(screen.getByText(/REPLIES < 48H/)).toBeInTheDocument();
  });
});
