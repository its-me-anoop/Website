import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Navbar } from "./Navbar";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("Navbar component", () => {
  it("renders the personal brand text", () => {
    render(<Navbar />);
    expect(screen.getByText("Anoop Jose")).toBeInTheDocument();
  });

  it("renders primary navigation items", () => {
    render(<Navbar />);
    expect(screen.getAllByRole("link", { name: "Services" })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Work" })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Process" })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "About" })[0]).toBeInTheDocument();
  });

  it("opens mobile menu when toggle button is clicked", () => {
    render(<Navbar />);

    const menuBtn = screen.getByLabelText(/Open menu|Close menu/);
    expect(screen.queryByLabelText("Mobile primary")).not.toBeInTheDocument();

    fireEvent.click(menuBtn);
    expect(screen.getByLabelText("Mobile primary")).toBeInTheDocument();
  });
});
