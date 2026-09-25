import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { Reveal } from "./Reveal";

type Callback = (entries: Partial<IntersectionObserverEntry>[]) => void;

function stubMotion(allowed: boolean) {
  vi.stubGlobal(
    "matchMedia",
    (query: string) =>
      ({
        matches: allowed && query.includes("no-preference"),
        media: query,
        addEventListener: () => {},
        removeEventListener: () => {},
      }) as unknown as MediaQueryList
  );
}

function stubObserver() {
  const observers: Callback[] = [];
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(cb: Callback) {
        observers.push(cb);
      }
      observe() {}
      disconnect() {}
      unobserve() {}
    }
  );
  return observers;
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("Reveal", () => {
  it("renders its content visibly with no reveal state by default", () => {
    render(<Reveal>Hello</Reveal>);
    expect(screen.getByText("Hello")).not.toHaveAttribute("data-reveal");
  });

  it("never hides content when reduced motion is requested", () => {
    stubMotion(false);
    stubObserver();
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ top: 5000 } as DOMRect);
    render(<Reveal>Below the fold</Reveal>);
    expect(screen.getByText("Below the fold")).not.toHaveAttribute("data-reveal");
  });

  it("never hides content that is already on screen", () => {
    stubMotion(true);
    stubObserver();
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ top: 10 } as DOMRect);
    render(<Reveal>Above the fold</Reveal>);
    expect(screen.getByText("Above the fold")).not.toHaveAttribute("data-reveal");
  });

  it("waits below the fold, then rises in when scrolled to", () => {
    stubMotion(true);
    const observers = stubObserver();
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ top: 5000 } as DOMRect);
    render(
      <Reveal as="li" delay={120}>
        Later
      </Reveal>
    );
    const el = screen.getByText("Later");
    expect(el.tagName).toBe("LI");
    expect(el).toHaveAttribute("data-reveal", "wait");
    act(() => observers[0]([{ isIntersecting: true }]));
    expect(el).toHaveAttribute("data-reveal", "in");
    expect(el.style.getPropertyValue("--reveal-delay")).toBe("120ms");
  });
});
