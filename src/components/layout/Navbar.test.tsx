import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Navbar } from "./Navbar";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("Navbar component", () => {
  it("renders studio logo text correctly", () => {
    render(<Navbar />);
    expect(screen.getByText("Flutterly")).toBeInTheDocument();
  });

  it("renders primary navigation items in desktop layout", () => {
    render(<Navbar />);
    expect(screen.getByRole("link", { name: "Work" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Process" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Studio" })).toBeInTheDocument();
  });

  it("opens mobile menu overlay when menu button is clicked", async () => {
    render(<Navbar />);
    
    const menuBtn = screen.getByLabelText("Toggle menu");
    expect(screen.queryByLabelText("Mobile primary")).not.toBeInTheDocument();
    
    // Click toggle button
    fireEvent.click(menuBtn);
    expect(screen.getByLabelText("Mobile primary")).toBeInTheDocument();
    
    // Close it
    fireEvent.click(menuBtn);
    // Overlay exit animation is managed by AnimatePresence, which runs asynchronously.
  });
});
