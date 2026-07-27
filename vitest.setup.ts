import "@testing-library/jest-dom";

// jsdom doesn't implement IntersectionObserver, which framer-motion's useInView relies on.
if (typeof globalThis.IntersectionObserver === "undefined") {
  class IO {
    readonly root: Element | Document | null = null;
    readonly rootMargin: string = "";
    readonly thresholds: ReadonlyArray<number> = [];
    constructor(_cb: IntersectionObserverCallback, _opts?: IntersectionObserverInit) {}
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  }
  (globalThis as unknown as { IntersectionObserver: typeof IntersectionObserver }).IntersectionObserver = IO as unknown as typeof IntersectionObserver;
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
