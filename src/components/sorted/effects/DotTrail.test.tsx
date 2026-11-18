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

  it("clears its mark from whatever it was standing on when it goes", async () => {
    motion(true);
    vi.stubGlobal("requestAnimationFrame", (run: FrameRequestCallback) => setTimeout(() => run(performance.now()), 0) as unknown as number);
    vi.stubGlobal("cancelAnimationFrame", (id: number) => clearTimeout(id));
    const anchor = document.createElement("button");
    anchor.setAttribute("data-dot", "top");
    anchor.getBoundingClientRect = () => ({ left: 100, top: 300, width: 80, height: 40, right: 180, bottom: 340, x: 100, y: 300, toJSON() {} });
    document.body.append(anchor);
    const { unmount } = render(<DotTrail />);
    await new Promise((done) => setTimeout(done, 40));
    const dot = document.querySelector<HTMLElement>("[data-dot-trail]")!;
    /* The first anchor is taken without a hop: the dot is simply there, perched on its top edge. */
    expect(dot.style.opacity).toBe("1");
    expect(dot.style.transform).toContain("translate3d(133.0px, 286.0px, 0)");
    unmount();
    expect(anchor).not.toHaveAttribute("data-dot-on");
    anchor.remove();
  });
});
