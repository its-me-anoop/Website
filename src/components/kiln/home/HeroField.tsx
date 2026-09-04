"use client";

import { useEffect, useRef, type RefObject } from "react";
import Image from "next/image";
import { assemblyProgress, butterflyBlend, butterflyFlight, edgeDestination, offscreenStart, pointerRepulsion, refugeProgress, scrollDispersal, smoothstep } from "./heroParticleMotion";
import styles from "./Hero.module.css";

type Star = {
  x: number; y: number; z: number; size: number; phase: number; color: number;
  glow: boolean; side: number; start: number; edge: number; height: number;
  delay: number; traveller: boolean;
};
// Ice, blue, amber, peach and mint: coloured cores and matching halos.
const palette = [
  { light: 96, chroma: 0.024, hue: 230, ink: "oklch(52% 0.15 250)" },
  { light: 83, chroma: 0.105, hue: 245, ink: "oklch(55% 0.18 250)" },
  { light: 88, chroma: 0.135, hue: 80, ink: "oklch(58% 0.13 75)" },
  { light: 83, chroma: 0.125, hue: 40, ink: "oklch(58% 0.18 35)" },
  { light: 86, chroma: 0.095, hue: 158, ink: "oklch(52% 0.13 160)" },
];
const colors = palette.map(({ light, chroma, hue }) => `oklch(${light}% ${chroma} ${hue})`);
function randomSequence() {
  let seed = 72841;
  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

/** One mask supplies both the full 3D silhouette and the tiny butterflies. */
function makeAssets(image: HTMLImageElement, count: number) {
  const mask = document.createElement("canvas");
  mask.width = mask.height = 180;
  const context = mask.getContext("2d", { willReadFrequently: true });
  if (!context) return null;
  context.drawImage(image, 0, 0, 180, 180);
  const imageData = context.getImageData(0, 0, 180, 180);
  const pixels = imageData.data;
  const samples: { x: number; y: number }[] = [];
  for (let y = 0; y < 180; y++) {
    for (let x = 0; x < 180; x++) {
      const i = (y * 180 + x) * 4;
      if (pixels[i + 3] > 100 && pixels[i + 1] > 65) {
        samples.push({ x, y });
        pixels[i] = pixels[i + 1] = pixels[i + 2] = 255;
      } else pixels[i + 3] = 0;
    }
  }
  if (!samples.length) return null;
  context.putImageData(imageData, 0, 0);
  const butterflies = palette.map(({ ink }) => {
    const sprite = document.createElement("canvas");
    sprite.width = 64;
    sprite.height = 50;
    const ctx = sprite.getContext("2d");
    if (ctx) {
      ctx.drawImage(mask, 20, 36, 140, 108, 0, 0, 64, 50);
      ctx.globalCompositeOperation = "source-in";
      ctx.fillStyle = ink;
      ctx.fillRect(0, 0, 64, 50);
    }
    return sprite;
  });
  const random = randomSequence();
  const stars: Star[] = Array.from({ length: count }, (_, index) => {
    const sample = samples[Math.floor(random() * samples.length)];
    const size = random();
    const colour = random();
    return {
      x: (sample.x - 90 + random() - 0.5) / 73,
      y: (sample.y - 90 + random() - 0.5) / 73,
      z: (random() - 0.5) * 0.36,
      size: size > 0.97 ? 1.8 + random() : 0.5 + size * 0.9,
      phase: random() * Math.PI * 2,
      color: colour < 0.44 ? 0 : colour < 0.65 ? 1 : colour < 0.79 ? 2 : colour < 0.9 ? 3 : 4,
      glow: size > 0.95,
      side: index % 4,
      start: random(), edge: random(), height: random(), delay: random() * 700,
      // Odd strides alternate left/right rather than selecting only even sides.
      traveller: index % (count < 2000 ? 23 : 31) === 0,
    };
  });
  return { stars, butterflies };
}

function makeGlow(index: number) {
  const sprite = document.createElement("canvas");
  sprite.width = sprite.height = 64;
  const context = sprite.getContext("2d");
  if (!context) return sprite;
  const { light, chroma, hue } = palette[index];
  const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, colors[index]);
  gradient.addColorStop(0.12, `oklch(${light}% ${chroma} ${hue} / 0.7)`);
  gradient.addColorStop(0.36, `oklch(${light}% ${chroma} ${hue} / 0.16)`);
  gradient.addColorStop(1, `oklch(${light}% ${chroma} ${hue} / 0)`);
  context.fillStyle = gradient;
  context.fillRect(0, 0, 64, 64);
  return sprite;
}

/** A viewport canvas lets each particle cross the real section boundary.
 * It never captures input; the original, accessible button rotates the cloud.
 * Scroll changes geometry; only ambient motion and arrival use elapsed time. */
export function HeroField({ motionEnabled, reducedMotion, heroRef, canvasRef }: {
  motionEnabled: boolean;
  reducedMotion: boolean | null;
  heroRef: RefObject<HTMLElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
}) {
  const surfaceRef = useRef<HTMLButtonElement>(null);
  const motion = useRef({ enabled: motionEnabled, reduced: reducedMotion });
  const controls = useRef<{ sync: () => void } | null>(null);
  const hydrated = reducedMotion !== null;

  useEffect(() => {
    motion.current = { enabled: motionEnabled, reduced: reducedMotion };
    controls.current?.sync();
  }, [motionEnabled, reducedMotion]);

  useEffect(() => {
    const surface = surfaceRef.current;
    const canvas = canvasRef.current;
    const hero = heroRef.current;
    const main = hero?.closest("main");
    // jsdom has no layout/canvas; keep semantic tests on the real controls.
    if (!hydrated || !surface || !canvas || !hero || !main || !surface.clientWidth) return;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) { surface.dataset.failed = "true"; return; }

    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let lastTime = 0;
    let elapsed = 0;
    let dirty = true;
    let disposed = false;
    let stars: Star[] = [];
    let offsets = new Float32Array(0);
    let flights = new Float32Array(0);
    let paths: { start: { x: number; y: number }; edge: { x: number; y: number } }[] = [];
    let butterflies: HTMLCanvasElement[] = [];
    let surfaceBox = surface.getBoundingClientRect();
    let heroBox = hero.getBoundingClientRect();
    let mainBox = main.getBoundingClientRect();
    const coal = main.querySelector<HTMLElement>(":scope > .on-coal");
    let coalBox = coal?.getBoundingClientRect();
    const refuges = Array.from(main.querySelectorAll<HTMLElement>("[data-particle-refuge]"));
    let refugeBoxes = refuges.map((element) => ({ box: element.getBoundingClientRect(), name: element.dataset.particleRefuge }));
    const pointer = { x: 0, y: 0, active: false, touch: false };
    let response = 0.18;
    let targetX = -0.08;
    let targetY = -0.16;
    let rotationX = targetX;
    let rotationY = targetY;
    let wasDragged = false;
    const glows = palette.map((_, index) => makeGlow(index));
    const active = () => mainBox.bottom > 0 && mainBox.top < height;
    const random = randomSequence();
    const sky = Array.from({ length: 1900 }, () => ({ x: random(), y: random(), size: 0.45 + random() * 0.95, phase: random() * Math.PI * 2, color: random() > 0.82 ? 2 : 0 }));
    const updatePaths = () => {
      paths = stars.map((star) => ({
        start: offscreenStart(star.side, star.start, width, height),
        edge: edgeDestination(star.side, star.edge, star.height, width, height),
      }));
    };

    const draw = () => {
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);
      if (!stars.length || document.hidden || !active()) return;
      const reduced = motion.current.reduced === true;
      const time = elapsed / 1000;
      const scale = Math.min(surfaceBox.width, surfaceBox.height) * 0.44;
      const disperse = reduced ? 0 : scrollDispersal(-heroBox.top, height);
      const opacity = reduced ? 1 : smoothstep(mainBox.bottom / Math.max(height * 0.5, 1));
      let resting: (typeof refugeBoxes)[number] | undefined;
      let gather = 0;
      if (!reduced && disperse > 0.9) {
        for (const refuge of refugeBoxes) {
          if (refuge.box.width < 180 || refuge.box.height < 160) continue;
          const progress = refugeProgress(refuge.box.top + refuge.box.height / 2, height);
          if (progress > gather) { gather = progress; resting = refuge; }
        }
      }
      const processFormation = resting?.name === "process";
      const idleX = wasDragged || reduced ? 0 : Math.sin(time * 0.28) * 0.1;
      const idleY = wasDragged || reduced ? 0 : Math.sin(time * 0.22) * 0.22;
      const sinX = Math.sin(rotationX + idleX);
      const cosX = Math.cos(rotationX + idleX);
      const sinY = Math.sin(rotationY + idleY);
      const cosY = Math.cos(rotationY + idleY);
      surface.dataset.phase = reduced ? "static" : gather > 0.5 ? `resting-${resting?.name}` : heroBox.bottom < height && disperse > 0.8 ? "butterflies" : disperse > 0.01 ? "dispersing" : elapsed < 5900 ? "arriving" : "formed";
      surface.dataset.interaction = pointer.active && !reduced && motion.current.enabled ? "repelling" : "resting";

      // Far-away pinpoints fill the negative space, behind the foreground.
      // They stay in the dark hero and fade with the outgoing constellation.
      context.globalCompositeOperation = "screen";
      const skyCount = width < 600 ? 650 : sky.length;
      for (let i = 0; i < skyCount; i++) {
        const point = sky[i];
        const x = point.x * width + (reduced ? 0 : Math.sin(time * 0.08 + point.phase) * 2);
        const y = heroBox.top + point.y * heroBox.height;
        if (y < 0 || y > height || y > heroBox.bottom) continue;
        context.globalAlpha = (0.32 + (reduced ? 0.05 : Math.sin(time * 0.5 + point.phase) * 0.17)) * (reduced ? 1 : smoothstep(elapsed / 1500)) * (1 - disperse * 0.8);
        context.fillStyle = colors[point.color];
        context.fillRect(x, y, point.size, point.size);
      }

      let airborne = 0;
      for (let index = 0; index < stars.length; index++) {
        const star = stars[index];
        const flockStar = star.traveller || index % 11 === 0;
        const formationStar = flockStar || processFormation;
        if (disperse >= 1 && !formationStar) continue;
        const orbit = reduced ? 0 : time * (0.45 + star.start * 0.35) + star.phase;
        const x = star.x + (reduced ? 0 : Math.cos(orbit) * 0.018);
        const y = star.y + (reduced ? 0 : Math.sin(orbit) * 0.014);
        const z = star.z + (reduced ? 0 : Math.sin(time * 0.65 + star.phase) * 0.045);
        const rx = x * cosY + z * sinY;
        const rz = z * cosY - x * sinY;
        const ry = y * cosX - rz * sinX;
        const depth = star.y * sinX + rz * cosX;
        const perspective = 3.4 / (3.4 - depth);
        const markX = surfaceBox.left + surfaceBox.width * 0.5 + rx * scale * perspective;
        const markY = surfaceBox.top + surfaceBox.height * 0.48 + ry * scale * perspective;
        const form = reduced ? 1 : Math.max(disperse, assemblyProgress(elapsed, star.delay));
        const { start, edge } = paths[index];
        let assembledX = markX;
        let assembledY = markY;
        if (form < 1) {
          const centerX = surfaceBox.left + surfaceBox.width * 0.5;
          const centerY = surfaceBox.top + surfaceBox.height * 0.48;
          const angle = Math.atan2(start.y - centerY, start.x - centerX) + form * Math.PI * 1.3;
          const spiralRadius = (Math.hypot(width, height) + Math.abs(centerX - width / 2)) * (0.78 + star.start * 0.18) * (1 - form);
          assembledX = centerX + (markX - centerX) * form + Math.cos(angle) * spiralRadius;
          assembledY = centerY + (markY - centerY) * form + Math.sin(angle) * spiralRadius;
        }
        let px = assembledX + (edge.x - assembledX) * disperse;
        let py = assembledY + (edge.y - assembledY) * disperse;
        if (resting && gather > 0) {
          const box = resting.box;
          const restScale = Math.min(box.width, box.height) * 0.43;
          const restX = processFormation ? rx * perspective : star.x;
          const restY = processFormation ? ry * perspective : star.y;
          px += (box.left + box.width * 0.5 + restX * restScale - px) * gather;
          py += (box.top + box.height * 0.5 + restY * restScale - py) * gather;
        }
        const butterflyMaterial = reduced ? 0 : butterflyBlend(py, heroBox.bottom) * (coalBox ? 1 - butterflyBlend(py, coalBox.top) : 1);
        const offsetIndex = index * 2;
        const flightIndex = index * 3;
        let pushX = 0;
        let pushY = 0;
        if (pointer.active && !reduced && motion.current.enabled) {
          const dx = px - pointer.x;
          const dy = py - pointer.y;
          const radius = pointer.touch ? 85 : 115;
          if (dx * dx + dy * dy < radius * radius) {
            if (butterflyMaterial > 0.5 && formationStar) {
              if (elapsed - flights[flightIndex] > 3900) {
                const heading = Math.atan2(dy, dx) + Math.sin(star.phase) * 0.65;
                const distance = 100 + star.start * 150;
                flights[flightIndex] = elapsed + star.delay * 0.18;
                flights[flightIndex + 1] = Math.cos(heading) * distance;
                flights[flightIndex + 2] = Math.sin(heading) * distance * 0.7;
              }
            } else {
              const push = pointerRepulsion(dx, dy, radius, (pointer.touch ? 68 : 82) * (0.6 + star.start * 0.7));
              pushX = push.x; pushY = push.y;
            }
          }
        }
        // Exponential settling avoids a spring/bounce and is independent of
        // the base geometry, so the exact silhouette returns on pointer exit.
        if (!reduced && motion.current.enabled) {
          offsets[offsetIndex] += (pushX - offsets[offsetIndex]) * response;
          offsets[offsetIndex + 1] += (pushY - offsets[offsetIndex + 1]) * response;
        } else if (reduced) offsets[offsetIndex] = offsets[offsetIndex + 1] = 0;
        px += offsets[offsetIndex]; py += offsets[offsetIndex + 1];
        let flightEnergy = 0;
        if (!reduced && butterflyMaterial > 0.5 && formationStar) {
          const flight = butterflyFlight(elapsed - flights[flightIndex], star.phase, flights[flightIndex + 1], flights[flightIndex + 2]);
          flightEnergy = flight.energy;
          if (flightEnergy > 0.01) airborne++;
          px += flight.x + Math.sin(time * 1.35 + star.phase) * (2 + gather * 3);
          py += flight.y + Math.cos(time * 1.7 + star.phase) * (2 + gather * 3);
        }
        const radius = star.size * perspective;
        const edgeFade = star.traveller ? 1 - disperse * 0.8 : Math.pow(1 - disperse, 1.5);
        const fade = opacity * (edgeFade * (1 - gather) + (formationStar ? 0.95 : 0) * gather);
        if (px < -40 || px > width + 40 || py < -40 || py > height + 40 || fade < 0.005) continue;
        const butterfly = reduced ? 0 : butterflyBlend(py, heroBox.bottom) * (coalBox ? 1 - butterflyBlend(py, coalBox.top) : 1);
        const twinkle = reduced ? 0.9 : 0.7 + Math.sin(time * 1.1 + star.phase) * 0.28;
        const starOpacity = fade * (1 - butterfly) * twinkle;
        if (starOpacity > 0.005) {
          context.globalCompositeOperation = "screen";
          context.globalAlpha = starOpacity;
          context.fillStyle = colors[star.color];
          context.fillRect(px - radius / 2, py - radius / 2, radius, radius);
          if (star.glow) {
            const size = radius * (star.color === 0 ? 13 : 17) * (1 - disperse * 0.6 + (processFormation ? gather * 0.6 : 0));
            context.drawImage(glows[star.color], px - size / 2, py - size / 2, size, size);
          }
        }
        if (butterfly > 0.005 && flockStar) {
          context.globalCompositeOperation = "source-over";
          context.globalAlpha = fade * butterfly * 0.78;
          const size = (4.5 + star.size) * (1 - gather) + (6.8 + star.size * 1.2) * gather;
          context.save();
          context.translate(px, py);
          context.rotate(Math.sin(time * 1.7 + star.phase) * (0.24 + flightEnergy * 0.5));
          context.scale(0.35 + (0.5 + Math.sin(time * (7 + flightEnergy * 5) + star.phase) * 0.5) * 0.65, 1);
          context.drawImage(butterflies[star.color], -size / 2, -size * 0.39, size, size * 0.78);
          context.restore();
        }
      }
      surface.dataset.flightCount = String(airborne);
      context.globalAlpha = 1;
    };

    const tick = (now: number) => {
      frame = 0;
      if (disposed || document.hidden) return;
      const animate = stars.length > 0 && motion.current.enabled && !motion.current.reduced && active();
      if (animate && (!lastTime || now - lastTime >= 30)) {
        const delta = lastTime ? Math.min(now - lastTime, 64) : 0;
        elapsed += delta;
        lastTime = now;
        const smoothing = 1 - Math.exp(-delta / 95);
        response = 1 - Math.exp(-delta / 150);
        rotationX += (targetX - rotationX) * smoothing;
        rotationY += (targetY - rotationY) * smoothing;
        dirty = true;
      }
      if (dirty) { draw(); dirty = false; }
      surface.dataset.motion = animate ? "running" : "paused";
      if (animate) frame = requestAnimationFrame(tick);
    };
    const schedule = () => {
      dirty = true;
      if (!frame && !document.hidden && !disposed) frame = requestAnimationFrame(tick);
    };
    const measure = () => {
      // Reads are batched here, never inside the particle loop.
      surfaceBox = surface.getBoundingClientRect();
      heroBox = hero.getBoundingClientRect();
      mainBox = main.getBoundingClientRect();
      coalBox = coal?.getBoundingClientRect();
      refugeBoxes = refuges.map((element) => ({ box: element.getBoundingClientRect(), name: element.dataset.particleRefuge }));
      pointer.active = false;
      schedule();
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
      measure();
    };
    const resize = () => {
      width = document.documentElement.clientWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      updatePaths();
      measure();
    };
    const updateView = () => {
      surface.dataset.view = `${targetX.toFixed(3)},${targetY.toFixed(3)}`;
      if (!motion.current.enabled) { rotationX = targetX; rotationY = targetY; }
      schedule();
    };
    const reset = () => {
      targetX = -0.08;
      targetY = -0.16;
      wasDragged = false;
      elapsed = motion.current.enabled && !motion.current.reduced ? 0 : 6000;
      offsets.fill(0);
      for (let i = 0; i < flights.length; i += 3) flights[i] = -10000;
      updateView();
    };
    const point = (event: PointerEvent) => {
      if (!event.isPrimary) return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.touch = event.pointerType !== "mouse";
      pointer.active = !pointer.touch || event.buttons > 0 || event.type === "pointerdown";
    };
    const release = () => { pointer.active = false; };
    const leave = (event: PointerEvent) => { if (!event.relatedTarget) release(); };
    const key = (event: KeyboardEvent) => {
      const directions: Record<string, [number, number]> = {
        ArrowLeft: [0, -0.18], ArrowRight: [0, 0.18], ArrowUp: [-0.12, 0], ArrowDown: [0.12, 0],
      };
      const direction = directions[event.key];
      if (!direction) return;
      event.preventDefault();
      targetX = Math.max(-1.05, Math.min(1.05, targetX + direction[0]));
      targetY += direction[1];
      wasDragged = true;
      updateView();
    };
    const click = (event: MouseEvent) => { if (event.detail === 0) reset(); };
    const observer = new ResizeObserver(resize);
    observer.observe(hero);
    observer.observe(surface);
    observer.observe(main);
    resize();
    controls.current = { sync };
    window.addEventListener("pointermove", point, { passive: true });
    window.addEventListener("pointerdown", point, { passive: true });
    window.addEventListener("pointerup", release, { passive: true });
    window.addEventListener("pointercancel", release, { passive: true });
    window.addEventListener("pointerout", leave, { passive: true });
    window.addEventListener("blur", release);
    surface.addEventListener("keydown", key);
    surface.addEventListener("click", click);
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", sync);

    const image = new window.Image();
    image.onload = () => {
      if (disposed) return;
      const assets = makeAssets(image, window.matchMedia("(max-width: 599px)").matches ? 1500 : 3200);
      if (!assets) { surface.dataset.failed = "true"; return; }
      stars = assets.stars;
      offsets = new Float32Array(stars.length * 2);
      flights = new Float32Array(stars.length * 3);
      for (let i = 0; i < flights.length; i += 3) flights[i] = -10000;
      butterflies = assets.butterflies;
      updatePaths();
      surface.dataset.ready = "true";
      sync();
    };
    image.onerror = () => { if (!disposed) surface.dataset.failed = "true"; };
    image.src = "/flutterly-logo.png";

    return () => {
      disposed = true;
      image.onload = image.onerror = null;
      cancelAnimationFrame(frame);
      observer.disconnect();
      controls.current = null;
      window.removeEventListener("pointermove", point);
      window.removeEventListener("pointerdown", point);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
      window.removeEventListener("pointerout", leave);
      window.removeEventListener("blur", release);
      surface.removeEventListener("keydown", key);
      surface.removeEventListener("click", click);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [hydrated, heroRef, canvasRef]);

  return (
    <div className={styles.starField}>
      <button
        ref={surfaceRef}
        className={styles.starSurface}
        type="button"
        aria-label="Interactive Flutterly star field"
        aria-describedby="hero-star-instructions"
        data-reduced={reducedMotion === true}
      >
        <Image src="/flutterly-logo.png" alt="" width={900} height={900} className={styles.starFallback} />
      </button>
      <span id="hero-star-instructions" className="sr-only">Use arrow keys to rotate the stars. Press Enter to replay the formation.</span>
    </div>
  );
}
