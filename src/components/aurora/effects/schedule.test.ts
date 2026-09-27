import { afterEach, describe, expect, it, vi } from "vitest";
import { frameGate, targetFps, whenIdle } from "./schedule";

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("frameGate", () => {
  it("lets a frame through only once the interval has elapsed", () => {
    const gate = frameGate(30);
    expect(gate(0)).toBe(true);
    expect(gate(10)).toBe(false);
    expect(gate(20)).toBe(false);
    expect(gate(34)).toBe(true);
  });

  it("never drifts behind when frames arrive late", () => {
    const gate = frameGate(30);
    gate(0);
    expect(gate(100)).toBe(true);
    expect(gate(110)).toBe(false);
    expect(gate(134)).toBe(true);
  });
});

describe("targetFps", () => {
  it("halves the rate on small or touch screens", () => {
    expect(targetFps({ width: 390, coarse: true })).toBe(30);
    expect(targetFps({ width: 700, coarse: false })).toBe(30);
    expect(targetFps({ width: 1440, coarse: false })).toBe(60);
  });
});

describe("whenIdle", () => {
  it("waits for the load event, then an idle period, before running", () => {
    vi.useFakeTimers();
    let readyState = "loading";
    const listeners: Record<string, () => void> = {};
    vi.stubGlobal("document", { get readyState() { return readyState; } });
    vi.stubGlobal("window", {
      addEventListener: (type: string, cb: () => void) => (listeners[type] = cb),
      removeEventListener: vi.fn(),
      requestIdleCallback: (cb: () => void) => setTimeout(cb, 50),
      cancelIdleCallback: (id: ReturnType<typeof setTimeout>) => clearTimeout(id),
    });
    const run = vi.fn();
    whenIdle(run, 200);
    vi.advanceTimersByTime(1000);
    expect(run).not.toHaveBeenCalled();

    readyState = "complete";
    listeners.load();
    vi.advanceTimersByTime(100);
    expect(run).not.toHaveBeenCalled();
    vi.advanceTimersByTime(200);
    expect(run).toHaveBeenCalledTimes(1);
  });

  it("can be cancelled before it fires", () => {
    vi.useFakeTimers();
    vi.stubGlobal("document", { readyState: "complete" });
    vi.stubGlobal("window", {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      requestIdleCallback: (cb: () => void) => setTimeout(cb, 10),
      cancelIdleCallback: (id: ReturnType<typeof setTimeout>) => clearTimeout(id),
    });
    const run = vi.fn();
    const cancel = whenIdle(run, 0);
    cancel();
    vi.advanceTimersByTime(1000);
    expect(run).not.toHaveBeenCalled();
  });
});
