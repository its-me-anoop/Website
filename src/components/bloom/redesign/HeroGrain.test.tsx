import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { HeroGrain } from "./HeroGrain";

function stubMatchMedia(reduced: boolean) {
  window.matchMedia = (query: string) => ({
    matches: reduced && query.includes("prefers-reduced-motion"),
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

afterEach(() => {
  stubMatchMedia(false);
  Object.defineProperty(document, "hidden", { configurable: true, value: false });
  cleanup();
  vi.restoreAllMocks();
});

describe("HeroGrain", () => {
  it("writes a capped pointer shift and pauses drift when the document is hidden", () => {
    stubMatchMedia(false);
    const { container } = render(
      <section>
        <HeroGrain />
      </section>,
    );
    const host = container.querySelector("section") as HTMLElement;
    const grain = container.querySelector("[data-hero-grain]") as HTMLElement;
    expect(grain).toBeTruthy();
    expect(grain.getAttribute("aria-hidden")).toBe("true");

    vi.spyOn(host, "getBoundingClientRect").mockReturnValue({
      x: 0,
      y: 0,
      left: 0,
      top: 0,
      right: 200,
      bottom: 200,
      width: 200,
      height: 200,
      toJSON: () => ({}),
    });

    fireEvent.pointerMove(host, { clientX: 200, clientY: 0 });
    expect(grain.style.getPropertyValue("--grain-x")).toBe("8px");
    expect(grain.style.getPropertyValue("--grain-y")).toBe("-8px");

    fireEvent.pointerLeave(host);
    expect(grain.style.getPropertyValue("--grain-x")).toBe("0px");
    expect(grain.style.getPropertyValue("--grain-y")).toBe("0px");

    Object.defineProperty(document, "hidden", { configurable: true, value: true });
    document.dispatchEvent(new Event("visibilitychange"));
    expect(grain.style.animationPlayState).toBe("paused");

    Object.defineProperty(document, "hidden", { configurable: true, value: false });
    document.dispatchEvent(new Event("visibilitychange"));
    expect(grain.style.animationPlayState).toBe("running");
  });

  it("keeps the tile but ignores the pointer when motion is reduced", () => {
    stubMatchMedia(true);
    const { container } = render(
      <section>
        <HeroGrain />
      </section>,
    );
    const host = container.querySelector("section") as HTMLElement;
    const grain = container.querySelector("[data-hero-grain]") as HTMLElement;

    vi.spyOn(host, "getBoundingClientRect").mockReturnValue({
      x: 0,
      y: 0,
      left: 0,
      top: 0,
      right: 200,
      bottom: 200,
      width: 200,
      height: 200,
      toJSON: () => ({}),
    });

    fireEvent.pointerMove(host, { clientX: 200, clientY: 200 });
    expect(grain.style.getPropertyValue("--grain-x")).toBe("");
    expect(grain.style.getPropertyValue("--grain-y")).toBe("");
  });
});
