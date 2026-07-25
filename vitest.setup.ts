import "@testing-library/jest-dom";

// jsdom doesn't implement IntersectionObserver, which framer-motion's useInView relies on.
if (typeof globalThis.IntersectionObserver === "undefined") {
  class IO {
    readonly root: Element | Document | null = null;
    readonly rootMargin: string = "";
    readonly thresholds: ReadonlyArray<number> = [];
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  }
  (globalThis as unknown as { IntersectionObserver: typeof IntersectionObserver }).IntersectionObserver = IO as unknown as typeof IntersectionObserver;
}

// jsdom has no canvas backend, and logs a "not implemented" error for every
// getContext call. The particle field already treats a null context as
// "cannot draw here", so return that quietly instead of flooding the output.
if (typeof HTMLCanvasElement !== "undefined") {
  HTMLCanvasElement.prototype.getContext = (() =>
    null) as unknown as HTMLCanvasElement["getContext"];
}

// Some libs check window.matchMedia
if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}
