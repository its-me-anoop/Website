import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Reveal } from "./Reveal";

const mockMatchMedia = (matches: boolean) => {
  window.matchMedia = vi.fn().mockReturnValue({
    matches,
    media: "",
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Reveal", () => {
  it("reveals in-view content after mount (position check, no IO needed)", () => {
    mockMatchMedia(false);
    render(
      <Reveal>
        <p>choreographed</p>
      </Reveal>
    );
    // jsdom rects sit at 0,0 — inside the viewport band, so the mount
    // check must release the element immediately.
    const wrapper = screen.getByText("choreographed").parentElement!;
    expect(wrapper.style.opacity).toBe("1");
    expect(wrapper.style.transform).toBe("none");
  });

  it("skips the choreography entirely for reduced motion", () => {
    mockMatchMedia(true);
    render(
      <Reveal>
        <p>calm</p>
      </Reveal>
    );
    const wrapper = screen.getByText("calm").parentElement!;
    expect(wrapper.style.opacity).toBe("");
    expect(wrapper.style.filter).toBe("");
  });

  it("renders a span wrapper inside headings when asked", () => {
    mockMatchMedia(true);
    render(
      <h1>
        <Reveal as="span" kind="word">
          word
        </Reveal>
      </h1>
    );
    expect(screen.getByText("word").tagName).toBe("SPAN");
  });
});
