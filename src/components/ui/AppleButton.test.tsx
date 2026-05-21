import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AppleButton } from "./AppleButton";

describe("AppleButton component", () => {
  it("renders children content correctly", () => {
    render(<AppleButton>Click Me</AppleButton>);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("handles event clicks correctly", () => {
    const handleClick = vi.fn();
    render(<AppleButton onClick={handleClick}>Click Me</AppleButton>);
    
    const button = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies primary styles by default", () => {
    render(<AppleButton>Primary</AppleButton>);
    const button = screen.getByRole("button", { name: /primary/i });
    expect(button.className).toContain("bg-[var(--accent)]");
  });

  it("applies custom classnames correctly", () => {
    render(<AppleButton className="custom-class">Custom</AppleButton>);
    const button = screen.getByRole("button", { name: /custom/i });
    expect(button.className).toContain("custom-class");
  });
});
