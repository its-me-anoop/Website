import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { IMacFrame, IPhoneFrame, iphoneHeight } from "./DeviceFrame";

describe("IPhoneFrame", () => {
  it("describes the screen once, through the figure, with the image decorative", () => {
    render(<IPhoneFrame src="/demos/gp-mobile.webp" alt="Willowbrook Surgery on a phone" />);
    expect(screen.getByRole("img", { name: "Willowbrook Surgery on a phone" })).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(1);
  });

  it("draws an iOS-style status bar that assistive technology ignores", () => {
    const { container } = render(<IPhoneFrame src="/demos/gp-mobile.webp" alt="A phone" />);
    const bar = container.querySelector("[data-status-bar]");
    expect(bar).not.toBeNull();
    expect(bar).toHaveAttribute("aria-hidden", "true");
    expect(bar).toHaveTextContent("9:41");
  });

  it("gives the whole capture room: the frame is taller than the 390×844 screen plus the status bar", () => {
    expect(iphoneHeight(300)).toBeGreaterThan(Math.round((300 * 844) / 390));
    expect(iphoneHeight(150)).toBe(Math.round(iphoneHeight(300) / 2));
  });

  it("is decorative when no alt is given", () => {
    const { container } = render(<IPhoneFrame src="/demos/gp-mobile.webp" alt="" />);
    expect(screen.queryByRole("img")).toBeNull();
    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });

  it("never builds a 3D context or a blur layer (iOS Safari layer budget)", () => {
    const { container } = render(<IPhoneFrame src="/demos/gp-mobile.webp" alt="A phone" />);
    expect(container.innerHTML).not.toMatch(/preserve-3d|perspective|translateZ|blur-\[/);
  });
});

describe("IMacFrame", () => {
  it("names the screen through the figure and keeps the capture's own aspect ratio", () => {
    const { container } = render(
      <IMacFrame src="/demos/gp-home.png" alt="Willowbrook Surgery on an iMac" width={1920} height={1200} />
    );
    expect(screen.getByRole("img", { name: "Willowbrook Surgery on an iMac" })).toBeInTheDocument();
    const screenBox = container.querySelector("[data-screen]") as HTMLElement;
    expect(screenBox.style.aspectRatio).toBe("1920 / 1200");
  });

  it("defaults to the 1440×1000 sample captures", () => {
    const { container } = render(<IMacFrame src="/demos/gp-home.png" alt="" />);
    const screenBox = container.querySelector("[data-screen]") as HTMLElement;
    expect(screenBox.style.aspectRatio).toBe("1440 / 1000");
  });
});
