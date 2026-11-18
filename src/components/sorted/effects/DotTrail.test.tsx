import { afterEach, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { DotTrail } from "./DotTrail";

function motion(allowed: boolean) {
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: allowed && query.includes("no-preference"),
    media: query,
    addEventListener() {},
    removeEventListener() {},
  }));
}

afterEach(() => {
  vi.unstubAllGlobals();
  document.documentElement.classList.remove("dot-live");
});

describe("DotTrail", () => {
  it("is absent under reduced motion, and leaves the placeholders their own dots", () => {
    motion(false);
    const { container } = render(<DotTrail />);
    expect(container).toBeEmptyDOMElement();
    expect(document.documentElement).not.toHaveClass("dot-live");
  });

  it("is one decorative dot, and says it is running so the placeholders stand aside", () => {
    motion(true);
    const { container, unmount } = render(<DotTrail />);
    const dot = container.querySelector("[data-dot-trail]")!;
    expect(dot).toHaveAttribute("aria-hidden", "true");
    expect(dot).toHaveClass("dot-trail");
    expect(document.documentElement).toHaveClass("dot-live");
    unmount();
    expect(document.documentElement).not.toHaveClass("dot-live");
  });

  const box = (left: number, top: number, width: number, height: number) => () =>
    ({ left, top, width, height, right: left + width, bottom: top + height, x: left, y: top, toJSON() {} }) as DOMRect;

  function anchor(mode: string, rect: () => DOMRect) {
    const el = document.createElement("button");
    el.setAttribute("data-dot", mode);
    el.getBoundingClientRect = rect;
    document.body.append(el);
    return el;
  }

  /** Run the page for `ms`, a frame every 16. */
  const run = (ms: number) => vi.advanceTimersByTimeAsync(ms);

  it("starts on the nearest anchor without a show, then is thrown to the next and settles there", async () => {
    motion(true);
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout", "requestAnimationFrame", "cancelAnimationFrame", "performance"] });
    Object.defineProperty(window, "innerHeight", { value: 900, configurable: true });
    const first = anchor("top", box(100, 440, 80, 40));
    const { unmount } = render(<DotTrail />);
    await run(60);
    const dot = document.querySelector<HTMLElement>("[data-dot-trail]")!;
    /* Perched on the first anchor's top edge, at its middle. */
    expect(dot.style.transform).toContain("translate3d(133.0px, 426.0px, 0)");
    expect(first).toHaveAttribute("data-dot-on");

    /* A second anchor arrives nearer the eye's line: the dot leaves the first... */
    first.getBoundingClientRect = box(100, 140, 80, 40);
    const second = anchor("top", box(600, 450, 200, 60));
    window.dispatchEvent(new Event("scroll"));
    await run(400);
    expect(first).not.toHaveAttribute("data-dot-on");
    const mid = /translate3d\(([\d.-]+)px, ([\d.-]+)px/.exec(dot.style.transform)!;
    expect(Number(mid[1])).toBeGreaterThan(140);
    expect(Number(mid[1])).toBeLessThan(700);

    /* ...and comes to rest on top of the second, round again, having told it so. */
    await run(2500);
    expect(second).toHaveAttribute("data-dot-on");
    expect(dot.style.transform).toContain("translate3d(693.0px, 436.0px, 0)");
    expect(dot.style.transform).toContain("scale(1.000, 1.000)");
    unmount();
    expect(second).not.toHaveAttribute("data-dot-on");
    first.remove();
    second.remove();
    vi.useRealTimers();
  });

  it("becomes an element it goes into: that element's shape, then out of sight so the element shows", async () => {
    motion(true);
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout", "requestAnimationFrame", "cancelAnimationFrame", "performance"] });
    Object.defineProperty(window, "innerHeight", { value: 900, configurable: true });
    const first = anchor("top", box(100, 440, 80, 40));
    const { unmount } = render(<DotTrail />);
    await run(60);
    first.getBoundingClientRect = box(100, 100, 80, 40);
    const pill = anchor("into", box(500, 420, 240, 60));
    window.dispatchEvent(new Event("scroll"));
    await run(3000);
    const dot = document.querySelector<HTMLElement>("[data-dot-trail]")!;
    expect(pill).toHaveAttribute("data-dot-on");
    expect(parseFloat(dot.style.width)).toBe(240);
    expect(parseFloat(dot.style.height)).toBe(60);
    expect(Number(dot.style.opacity)).toBe(0);
    unmount();
    first.remove();
    pill.remove();
    vi.useRealTimers();
  });
});
