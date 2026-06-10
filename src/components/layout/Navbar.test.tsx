import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Navbar } from "./Navbar";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("Navbar component", () => {
  it("renders the personal wordmark", () => {
    render(<Navbar />);
    expect(screen.getByRole("link", { name: /anoop jose — home/i })).toBeInTheDocument();
  });

  it("renders primary navigation items", () => {
    render(<Navbar />);
    expect(screen.getAllByRole("link", { name: /Work/ })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Services/ })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Process/ })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /About/ })[0]).toBeInTheDocument();
  });

  it("renders the Let's talk CTA pointing at the brief", () => {
    render(<Navbar />);
    expect(screen.getAllByRole("link", { name: /let.?s talk/i })[0]).toHaveAttribute(
      "href",
      "#brief"
    );
  });

  it("opens the mobile curtain menu when the toggle is clicked", () => {
    render(<Navbar />);
    const menuBtn = screen.getByLabelText(/Open menu|Close menu/);
    expect(screen.queryByLabelText("Mobile primary")).not.toBeInTheDocument();

    fireEvent.click(menuBtn);
    expect(screen.getByLabelText("Mobile primary")).toBeInTheDocument();
  });
});
