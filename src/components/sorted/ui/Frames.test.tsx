import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserFrame, PhoneFrame, phoneHeight } from "./Frames";

describe("PhoneFrame", () => {
  it("describes the screen once, through the figure, with the image decorative", () => {
    render(<PhoneFrame src="/demos/gp-mobile.webp" alt="Willowbrook Surgery on a phone" />);
    expect(screen.getByRole("img", { name: "Willowbrook Surgery on a phone" })).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(1);
  });

  it("gives the 390×844 capture its own shape at any width", () => {
    expect(phoneHeight(300)).toBeGreaterThan(Math.round((270 * 844) / 390));
    expect(Math.abs(phoneHeight(150) - phoneHeight(300) / 2)).toBeLessThanOrEqual(1);
  });

  it("is decorative when no alt is given", () => {
    const { container } = render(<PhoneFrame src="/demos/gp-mobile.webp" alt="" />);
    expect(screen.queryByRole("img")).toBeNull();
    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });
});

describe("BrowserFrame", () => {
  it("names the screen through the figure and keeps the capture's own aspect ratio", () => {
    const { container } = render(
      <BrowserFrame src="/demos/gp-home.png" alt="Willowbrook Surgery in a browser" width={1920} height={1200} />
    );
    expect(screen.getByRole("img", { name: "Willowbrook Surgery in a browser" })).toBeInTheDocument();
    const screenBox = container.querySelector("[data-screen]") as HTMLElement;
    expect(screenBox.style.aspectRatio).toBe("1920 / 1200");
  });

  it("defaults to the 1440×1000 sample captures", () => {
    const { container } = render(<BrowserFrame src="/demos/gp-home.png" alt="" />);
    const screenBox = container.querySelector("[data-screen]") as HTMLElement;
    expect(screenBox.style.aspectRatio).toBe("1440 / 1000");
  });

  it("shows the address in a bar that assistive technology ignores", () => {
    const { container } = render(<BrowserFrame src="/demos/gp-home.png" alt="A site" url="example.org" />);
    const bar = container.querySelector("[data-browser-bar]");
    expect(bar).toHaveAttribute("aria-hidden", "true");
    expect(bar).toHaveTextContent("example.org");
  });

  it("is flat on its own: only a scene around it turns it in 3D", () => {
    const { container } = render(<BrowserFrame src="/demos/gp-home.png" alt="A site" />);
    expect(container.innerHTML).not.toMatch(/preserve-3d|perspective|translateZ/);
  });
});
