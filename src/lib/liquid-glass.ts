/**
 * Liquid Glass — a cross-browser refraction engine.
 * ----------------------------------------------------------------------------
 * A single SVG `feDisplacementMap` filter bends a content layer's *own pixels*
 * through a lens map generated on a canvas. Because we filter the content
 * (not the backdrop), it runs unflagged in Chromium, Safari and Firefox.
 *
 * Technique after Aave Labs' "Building Glass for the Web". This port adds:
 *   • spring-eased follow + gentle idle drift for smoother motion
 *   • `prefers-reduced-motion` and no-canvas (SSR/test) graceful degradation
 *   • IntersectionObserver gating so the rAF loop sleeps when off-screen
 *   • full teardown (filter nodes, observers, rAF) via destroy()
 *
 * Safari notes honoured: sRGB filter space, a fresh filter id on every
 * rebuild (Safari caches output by id), and map regeneration only on shape
 * change — moving the lens just shifts the feImage x/y.
 */

const SVG_NS = "http://www.w3.org/2000/svg";
const XLINK_NS = "http://www.w3.org/1999/xlink";

let filterSeq = 0;
let defsEl: SVGDefsElement | null = null;

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

/** Lazily create (once) the hidden <svg><defs> that holds every lens filter. */
function getDefs(): SVGDefsElement | null {
  if (typeof document === "undefined") return null;
  if (defsEl && defsEl.isConnected) return defsEl;
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  svg.style.cssText = "position:absolute;width:0;height:0;overflow:hidden;pointer-events:none";
  defsEl = document.createElementNS(SVG_NS, "defs");
  svg.appendChild(defsEl);
  document.body.appendChild(svg);
  return defsEl;
}

function svgEl<K extends keyof SVGElementTagNameMap>(
  name: K,
  attrs: Record<string, string | number> = {}
): SVGElementTagNameMap[K] {
  const el = document.createElementNS(SVG_NS, name);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, String(v));
  return el;
}

export interface LensShape {
  width: number;
  height: number;
  radius: number;
  depth: number;
  curvature: number;
}

export interface LensOptics {
  scale: number;
  chroma: number;
  blur: number;
}

interface LensMap {
  url: string;
  width: number;
  height: number;
  radius: number;
}

/**
 * Build the displacement map. A rounded-rect signed-distance field pushes rim
 * pixels along the outward normal (the curved-glass look). Only the top-left
 * quadrant is computed; the rest is mirrored with the signs flipped — a quarter
 * of the per-pixel work. Returns null where canvas 2D is unavailable (SSR/test).
 */
function generateLensMap({ width, height, radius, depth, curvature }: LensShape): LensMap | null {
  const W = Math.max(4, Math.round(width));
  const H = Math.max(4, Math.round(height));
  const r = clamp(radius, 1, Math.min(W, H) / 2);
  const band = clamp(depth, 1, Math.min(W, H) / 2);

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const img = ctx.createImageData(W, H);
  const d = img.data;

  const hw = W / 2;
  const hh = H / 2;
  const ix = hw - r;
  const iy = hh - r;
  const enc = (v: number) => Math.round(128 + v * 127);

  const put = (x: number, y: number, R: number, G: number, B: number, A: number) => {
    const i = (y * W + x) * 4;
    d[i] = R;
    d[i + 1] = G;
    d[i + 2] = B;
    d[i + 3] = A;
  };

  const halfW = Math.ceil(W / 2);
  const halfH = Math.ceil(H / 2);
  for (let y = 0; y < halfH; y++) {
    const ay = hh - (y + 0.5);
    for (let x = 0; x < halfW; x++) {
      const ax = hw - (x + 0.5);
      const qx = ax - ix;
      const qy = ay - iy;
      const mx = Math.max(qx, 0);
      const my = Math.max(qy, 0);
      const sd = Math.min(Math.max(qx, qy), 0) + Math.hypot(mx, my) - r;
      const cov = clamp(0.5 - sd, 0, 1);

      let dx = 0;
      let dy = 0;
      let mag = 0;
      if (cov > 0) {
        const t = clamp(-sd / band, 0, 1);
        mag = Math.pow(1 - t, curvature);
        let nx: number;
        let ny: number;
        if (qx > 0 && qy > 0) {
          const l = Math.hypot(mx, my) || 1;
          nx = mx / l;
          ny = my / l;
        } else if (qx > qy) {
          nx = 1;
          ny = 0;
        } else {
          nx = 0;
          ny = 1;
        }
        dx = -nx * mag;
        dy = -ny * mag;
      }

      const B = Math.round(mag * cov * 210);
      const A = Math.round(cov * 255);
      put(x, y, enc(dx), enc(dy), B, A);
      put(W - 1 - x, y, enc(-dx), enc(dy), B, A);
      put(x, H - 1 - y, enc(dx), enc(-dy), B, A);
      put(W - 1 - x, H - 1 - y, enc(-dx), enc(-dy), B, A);
    }
  }

  ctx.putImageData(img, 0, 0);
  let url: string;
  try {
    url = canvas.toDataURL("image/png");
  } catch {
    return null;
  }
  return { url, width: W, height: H, radius: r };
}

/** Build a <filter> node under a brand-new id (the Safari cache-buster rule). */
function buildFilter(map: LensMap, lensX: number, lensY: number, optics: LensOptics): SVGFilterElement {
  const id = "lg" + ++filterSeq;
  const f = svgEl("filter", {
    id,
    x: "-15%",
    y: "-15%",
    width: "130%",
    height: "130%",
    "color-interpolation-filters": "sRGB",
    primitiveUnits: "userSpaceOnUse",
  });

  f.appendChild(svgEl("feFlood", { "flood-color": "rgb(128,128,0)", result: "bed" }));

  const im = svgEl("feImage", {
    x: lensX,
    y: lensY,
    width: map.width,
    height: map.height,
    preserveAspectRatio: "none",
    result: "lens",
  });
  im.setAttribute("href", map.url);
  im.setAttributeNS(XLINK_NS, "xlink:href", map.url);
  f.appendChild(im);

  const merge = svgEl("feMerge", { result: "dmap" });
  merge.appendChild(svgEl("feMergeNode", { in: "bed" }));
  merge.appendChild(svgEl("feMergeNode", { in: "lens" }));
  f.appendChild(merge);

  const s = optics.scale;
  const ch = optics.chroma;
  const result = "glass";

  if (ch > 0.001 && s > 0.001) {
    const passes: [string, number, string][] = [
      ["r", s * (1 + ch), "1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"],
      ["g", s, "0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"],
      ["b", s * (1 - ch), "0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"],
    ];
    for (const [n, sc, m] of passes) {
      f.appendChild(
        svgEl("feDisplacementMap", {
          in: "SourceGraphic",
          in2: "dmap",
          scale: sc.toFixed(2),
          xChannelSelector: "R",
          yChannelSelector: "G",
          result: "d_" + n,
        })
      );
      f.appendChild(svgEl("feColorMatrix", { in: "d_" + n, type: "matrix", values: m, result: "c_" + n }));
    }
    f.appendChild(
      svgEl("feComposite", { in: "c_r", in2: "c_g", operator: "arithmetic", k1: 0, k2: 1, k3: 1, k4: 0, result: "rg" })
    );
    f.appendChild(
      svgEl("feComposite", { in: "rg", in2: "c_b", operator: "arithmetic", k1: 0, k2: 1, k3: 1, k4: 0, result: "glass" })
    );
  } else {
    f.appendChild(
      svgEl("feDisplacementMap", {
        in: "SourceGraphic",
        in2: "dmap",
        scale: s.toFixed(2),
        xChannelSelector: "R",
        yChannelSelector: "G",
        result: "glass",
      })
    );
  }

  if (optics.blur > 0.05) {
    f.appendChild(svgEl("feGaussianBlur", { in: result, stdDeviation: optics.blur, result: "soft" }));
    f.appendChild(svgEl("feComposite", { in: "soft", in2: "lens", operator: "in", result: "softIn" }));
    f.appendChild(svgEl("feComposite", { in: "softIn", in2: result, operator: "over", result: "out" }));
  }

  return f;
}

export interface LiquidGlassOptions {
  stage: HTMLElement;
  content: HTMLElement;
  shape?: Partial<LensShape>;
  optics?: Partial<LensOptics>;
  draggable?: boolean;
  /** Gentle ambient drift when the user isn't dragging. */
  idle?: boolean;
  /** 0–1 follow factor per 60fps frame; lower = silkier, slower catch-up. */
  smoothing?: number;
  highlight?: number;
  reducedMotion?: boolean;
}

/** One lens over one filtered content layer. */
export class LiquidGlass {
  private stage: HTMLElement;
  private content: HTMLElement;
  private shape: LensShape;
  private optics: LensOptics;
  private readonly draggable: boolean;
  private readonly idle: boolean;
  private readonly smoothing: number;
  private readonly reduced: boolean;

  readonly lens: HTMLDivElement;
  private map: LensMap | null = null;
  private filterEl: SVGFilterElement | null = null;
  private feImage: SVGFEImageElement | null = null;

  private cx = 0; // current
  private cy = 0;
  private tx = 0; // target
  private ty = 0;
  private baseX = 0; // idle anchor (stage centre)
  private baseY = 0;
  private ampX = 0;
  private ampY = 0;
  private phase = Math.random() * Math.PI * 2;
  private dragging = false;
  private visible = true;
  private raf = 0;
  private lastT = 0;
  private queued = false;

  private ro?: ResizeObserver;
  private io?: IntersectionObserver;
  private onPointerDown?: (e: PointerEvent) => void;

  constructor(opts: LiquidGlassOptions) {
    this.stage = opts.stage;
    this.content = opts.content;
    this.shape = { width: 180, height: 110, radius: 44, depth: 26, curvature: 1.6, ...opts.shape };
    this.optics = { scale: 56, chroma: 0.24, blur: 0, ...opts.optics };
    this.draggable = opts.draggable ?? false;
    this.idle = opts.idle ?? false;
    this.smoothing = opts.smoothing ?? 0.16;
    this.reduced = opts.reducedMotion ?? false;

    this.lens = document.createElement("div");
    this.lens.className = "lg-lens";
    if (typeof opts.highlight === "number") this.lens.style.setProperty("--hl", String(opts.highlight));
    this.stage.appendChild(this.lens);

    this.cx = this.tx = this.baseX = this.stage.clientWidth / 2;
    this.cy = this.ty = this.baseY = this.stage.clientHeight / 2;

    this.rebuild();
    if (this.draggable) this.bindDrag();
    this.observe();
  }

  /** Regenerate the map and rebuild the filter under a fresh id. */
  rebuild() {
    const defs = getDefs();
    const map = generateLensMap(this.shape);
    // No canvas (SSR/test) → leave content unfiltered, no lens.
    if (!map || !defs) {
      this.lens.style.display = "none";
      return;
    }
    this.lens.style.display = "";
    this.map = map;

    const lx = this.cx - map.width / 2;
    const ly = this.cy - map.height / 2;
    const f = buildFilter(map, lx, ly, this.optics);
    defs.appendChild(f);

    const old = this.filterEl;
    this.filterEl = f;
    this.feImage = f.querySelector("feImage");
    this.content.style.filter = `url(#${f.id})`;
    if (old) requestAnimationFrame(() => old.remove());

    Object.assign(this.lens.style, {
      width: map.width + "px",
      height: map.height + "px",
      borderRadius: map.radius + "px",
    });
    this.recomputeBounds();
    this.apply(this.cx, this.cy);
  }

  private recomputeBounds() {
    this.baseX = this.stage.clientWidth / 2;
    this.baseY = this.stage.clientHeight / 2;
    this.ampX = Math.min(this.stage.clientWidth * 0.16, 64);
    this.ampY = Math.min(this.stage.clientHeight * 0.16, 30);
  }

  private queueRebuild() {
    if (this.queued) return;
    this.queued = true;
    requestAnimationFrame(() => {
      this.queued = false;
      this.rebuild();
    });
  }

  setShape(p: Partial<LensShape>) {
    Object.assign(this.shape, p);
    this.queueRebuild();
  }
  setOptics(p: Partial<LensOptics>) {
    Object.assign(this.optics, p);
    this.queueRebuild();
  }
  setHighlight(v: number) {
    this.lens.style.setProperty("--hl", String(v));
  }

  /** Write the lens position to the DOM (clamped inside the stage). */
  private apply(x: number, y: number) {
    if (!this.map || !this.feImage) return;
    const m = 4;
    const hw = this.map.width / 2;
    const hh = this.map.height / 2;
    const px = clamp(x, hw + m, Math.max(hw + m, this.stage.clientWidth - hw - m));
    const py = clamp(y, hh + m, Math.max(hh + m, this.stage.clientHeight - hh - m));
    this.cx = px;
    this.cy = py;
    const lx = px - hw;
    const ly = py - hh;
    this.feImage.setAttribute("x", String(lx));
    this.feImage.setAttribute("y", String(ly));
    this.lens.style.transform = `translate(${lx}px, ${ly}px)`;
  }

  /** Set a target the lens eases toward (used by drag + idle). */
  place(x: number, y: number) {
    this.tx = x;
    this.ty = y;
    if (this.reduced) {
      this.apply(x, y);
      return;
    }
    this.startLoop();
  }

  private startLoop() {
    if (this.raf || !this.visible) return;
    this.lastT = performance.now();
    this.raf = requestAnimationFrame(this.tick);
  }

  private tick = (now: number) => {
    this.raf = 0;
    const dt = Math.min(0.05, (now - this.lastT) / 1000);
    this.lastT = now;

    if (this.idle && !this.dragging) {
      this.phase += dt * 0.45;
      this.tx = this.baseX + Math.sin(this.phase) * this.ampX;
      this.ty = this.baseY + Math.sin(this.phase * 1.3 + 1) * this.ampY;
    }

    // Frame-rate-independent exponential smoothing toward the target.
    const k = 1 - Math.pow(1 - this.smoothing, dt * 60);
    const nx = this.cx + (this.tx - this.cx) * k;
    const ny = this.cy + (this.ty - this.cy) * k;
    this.apply(nx, ny);

    const settled = Math.hypot(this.tx - this.cx, this.ty - this.cy) < 0.25;
    const keepGoing = this.visible && ((this.idle && !this.dragging) || this.dragging || !settled);
    if (keepGoing) this.startLoop();
  };

  private bindDrag() {
    this.lens.classList.add("draggable");
    this.lens.setAttribute("aria-hidden", "true");
    this.onPointerDown = (e: PointerEvent) => {
      if (!this.map) return;
      e.preventDefault();
      this.dragging = true;
      this.lens.setPointerCapture(e.pointerId);
      const r0 = this.stage.getBoundingClientRect();
      const ox = e.clientX - r0.left - this.cx;
      const oy = e.clientY - r0.top - this.cy;
      const move = (ev: PointerEvent) => {
        const r = this.stage.getBoundingClientRect();
        this.place(ev.clientX - r.left - ox, ev.clientY - r.top - oy);
      };
      const up = () => {
        this.dragging = false;
        this.lens.removeEventListener("pointermove", move);
        this.lens.removeEventListener("pointerup", up);
        this.lens.removeEventListener("pointercancel", up);
        if (this.idle) this.startLoop();
      };
      this.lens.addEventListener("pointermove", move);
      this.lens.addEventListener("pointerup", up);
      this.lens.addEventListener("pointercancel", up);
    };
    this.lens.addEventListener("pointerdown", this.onPointerDown);
  }

  private observe() {
    if (typeof ResizeObserver !== "undefined") {
      this.ro = new ResizeObserver(() => {
        this.recomputeBounds();
        this.apply(this.cx, this.cy);
      });
      this.ro.observe(this.stage);
    }
    if (typeof IntersectionObserver !== "undefined") {
      this.io = new IntersectionObserver(
        (entries) => {
          this.visible = entries[0]?.isIntersecting ?? true;
          if (this.visible && this.idle && !this.reduced) this.startLoop();
        },
        { threshold: 0 }
      );
      this.io.observe(this.stage);
    }
    if (this.idle && !this.reduced) this.startLoop();
  }

  destroy() {
    if (this.raf) cancelAnimationFrame(this.raf);
    this.ro?.disconnect();
    this.io?.disconnect();
    if (this.onPointerDown) this.lens.removeEventListener("pointerdown", this.onPointerDown);
    this.filterEl?.remove();
    this.content.style.filter = "";
    this.lens.remove();
  }
}
