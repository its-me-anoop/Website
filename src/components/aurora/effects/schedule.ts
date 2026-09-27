/**
 * Scheduling helpers for the decorative canvases. They keep the shader
 * and embers off the critical path: nothing starts until the page has
 * loaded and the main thread is idle, and small or touch screens draw
 * at half rate.
 */

/**
 * Run `fn` once the window has loaded and the browser reports an idle
 * period, plus `delayMs`. Returns a cancel function.
 */
export function whenIdle(fn: () => void, delayMs = 400): () => void {
  let cancelled = false;
  let idleId: number | ReturnType<typeof setTimeout> | undefined;
  let timer: ReturnType<typeof setTimeout> | undefined;

  const afterIdle = () => {
    if (cancelled) return;
    timer = setTimeout(() => !cancelled && fn(), delayMs);
  };
  const onLoad = () => {
    if (cancelled) return;
    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(afterIdle, { timeout: 2500 });
    } else {
      idleId = setTimeout(afterIdle, 200);
    }
  };

  if (document.readyState === "complete") onLoad();
  else window.addEventListener("load", onLoad, { once: true });

  return () => {
    cancelled = true;
    window.removeEventListener("load", onLoad);
    if (timer) clearTimeout(timer);
    if (idleId !== undefined) {
      if (typeof window.cancelIdleCallback === "function" && typeof idleId === "number") {
        window.cancelIdleCallback(idleId);
      } else {
        clearTimeout(idleId as ReturnType<typeof setTimeout>);
      }
    }
  };
}

/** Frames per second for a decorative loop on this screen. */
export function targetFps({ width, coarse }: { width: number; coarse: boolean }): number {
  return coarse || width < 768 ? 30 : 60;
}

/**
 * A rAF gate: returns true when enough time has passed since the last
 * frame it let through. Tolerates a couple of ms of rAF jitter.
 */
export function frameGate(fps: number) {
  const interval = 1000 / fps;
  let last = -Infinity;
  return (now: number) => {
    if (now - last < interval - 2) return false;
    last = now;
    return true;
  };
}
