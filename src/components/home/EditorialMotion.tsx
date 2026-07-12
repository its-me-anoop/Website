"use client";

import { useEffect, useRef } from "react";

type MotionKind = "up" | "left" | "right" | "scale";

type RevealGroup = {
  selector: string;
  delay?: number;
  stagger?: number;
  kind?: MotionKind;
};

const revealGroups: RevealGroup[] = [
  { selector: "#top > div:first-child > p:first-child", delay: 80 },
  { selector: "#top h1", delay: 150 },
  { selector: "#top > div:first-child > p:nth-of-type(2)", delay: 310 },
  { selector: "#top > div:first-child > div", delay: 410 },
  { selector: "#top > div:last-child", delay: 220, kind: "scale" },
  { selector: "#work > div:first-child" },
  { selector: "#work [data-project-card]", delay: 80, stagger: 120, kind: "scale" },
  { selector: "#services > div:first-child" },
  { selector: "#services article", delay: 70, stagger: 110 },
  { selector: "#process > div:first-child" },
  { selector: "#process article", delay: 50, stagger: 100 },
  { selector: "#about > div:first-child", kind: "left" },
  { selector: "#about > div:last-child", delay: 100, kind: "right" },
  { selector: "#contact > *", stagger: 90 },
  { selector: "footer", kind: "up" },
];

export function EditorialMotion() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const main = document.querySelector<HTMLElement>("#main");
    const root = main?.parentElement;
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const registered = new Set<HTMLElement>();
    const targets: HTMLElement[] = [];

    const register = ({ selector, delay = 0, stagger = 0, kind = "up" }: RevealGroup) => {
      document.querySelectorAll<HTMLElement>(selector).forEach((element, index) => {
        if (registered.has(element)) return;
        registered.add(element);
        targets.push(element);
        element.dataset.motion = "true";
        element.dataset.motionKind = kind;
        element.style.setProperty("--motion-delay", `${delay + index * stagger}ms`);
      });
    };

    revealGroups.forEach(register);
    root.dataset.motionReady = "true";

    let observer: IntersectionObserver | undefined;
    if (reducedMotion || !("IntersectionObserver" in window)) {
      targets.forEach((element) => {
        element.dataset.visible = "true";
      });
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const element = entry.target as HTMLElement;
            element.dataset.visible = "true";
            observer?.unobserve(element);
          });
        },
        { rootMargin: "0px 0px -8%", threshold: 0.12 }
      );

      targets.forEach((element) => observer?.observe(element));
    }

    const revealSafety = window.setTimeout(() => {
      targets.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 1.15) element.dataset.visible = "true";
      });
    }, 900);

    let progressFrame = 0;
    const updateProgress = () => {
      progressFrame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      progressRef.current?.style.setProperty("transform", `scaleX(${progress})`);
    };
    const requestProgress = () => {
      if (progressFrame) return;
      progressFrame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", requestProgress, { passive: true });
    window.addEventListener("resize", requestProgress);

    const tiltCleanups: Array<() => void> = [];
    if (!reducedMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const tiltTargets = [
        document.querySelector<HTMLElement>("#top > div:last-child"),
        ...document.querySelectorAll<HTMLElement>("[data-project-card]"),
      ].filter((element): element is HTMLElement => Boolean(element));

      tiltTargets.forEach((element) => {
        element.dataset.tilt = "true";
        let frame = 0;

        const reset = () => {
          element.style.setProperty("--tilt-x", "0deg");
          element.style.setProperty("--tilt-y", "0deg");
          element.style.setProperty("--glow-opacity", "0");
        };

        const move = (event: PointerEvent) => {
          if (frame) window.cancelAnimationFrame(frame);
          frame = window.requestAnimationFrame(() => {
            const rect = element.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;
            element.style.setProperty("--tilt-x", `${(0.5 - y) * 3.5}deg`);
            element.style.setProperty("--tilt-y", `${(x - 0.5) * 4.5}deg`);
            element.style.setProperty("--glow-x", `${x * 100}%`);
            element.style.setProperty("--glow-y", `${y * 100}%`);
            element.style.setProperty("--glow-opacity", "1");
          });
        };

        element.addEventListener("pointermove", move);
        element.addEventListener("pointerleave", reset);
        tiltCleanups.push(() => {
          if (frame) window.cancelAnimationFrame(frame);
          element.removeEventListener("pointermove", move);
          element.removeEventListener("pointerleave", reset);
        });
      });
    }

    return () => {
      window.clearTimeout(revealSafety);
      observer?.disconnect();
      window.removeEventListener("scroll", requestProgress);
      window.removeEventListener("resize", requestProgress);
      if (progressFrame) window.cancelAnimationFrame(progressFrame);
      tiltCleanups.forEach((cleanup) => cleanup());
      delete root.dataset.motionReady;
    };
  }, []);

  return (
    <>
      <div ref={progressRef} className="editorial-scroll-progress" aria-hidden="true" />
      <style>{`
        .editorial-scroll-progress {
          position: fixed;
          inset: 0 auto auto 0;
          z-index: 220;
          width: 100%;
          height: 3px;
          transform: scaleX(0);
          transform-origin: left center;
          background: linear-gradient(90deg, #2146d0 0%, #ff5b3f 58%, #d9ff57 100%);
          pointer-events: none;
          will-change: transform;
        }

        [data-motion-ready="true"] > header {
          animation: editorial-header-in 700ms cubic-bezier(.16, 1, .3, 1) both;
        }

        [data-motion-ready="true"] [data-motion="true"] {
          --tilt-x: 0deg;
          --tilt-y: 0deg;
          opacity: 0;
          filter: blur(10px);
          transform: perspective(1200px) translate3d(0, 42px, 0) scale(.985)
            rotateX(var(--tilt-x)) rotateY(var(--tilt-y));
          transform-origin: center;
          transition:
            opacity 850ms cubic-bezier(.16, 1, .3, 1),
            filter 850ms cubic-bezier(.16, 1, .3, 1),
            transform 900ms cubic-bezier(.16, 1, .3, 1),
            box-shadow 350ms ease;
          transition-delay: var(--motion-delay, 0ms);
          will-change: transform, opacity, filter;
        }

        [data-motion-ready="true"] [data-motion-kind="left"] {
          transform: perspective(1200px) translate3d(-52px, 0, 0) scale(.985)
            rotateX(var(--tilt-x)) rotateY(var(--tilt-y));
        }

        [data-motion-ready="true"] [data-motion-kind="right"] {
          transform: perspective(1200px) translate3d(52px, 0, 0) scale(.985)
            rotateX(var(--tilt-x)) rotateY(var(--tilt-y));
        }

        [data-motion-ready="true"] [data-motion-kind="scale"] {
          transform: perspective(1200px) translate3d(0, 28px, 0) scale(.94)
            rotateX(var(--tilt-x)) rotateY(var(--tilt-y));
        }

        [data-motion-ready="true"] [data-motion="true"][data-visible="true"] {
          opacity: 1;
          filter: blur(0);
          transform: perspective(1200px) translate3d(0, 0, 0) scale(1)
            rotateX(var(--tilt-x)) rotateY(var(--tilt-y));
        }

        [data-motion-ready="true"] #top h1[data-visible="true"] span {
          animation: editorial-blue-line-in 850ms 420ms cubic-bezier(.16, 1, .3, 1) both;
        }

        [data-motion-ready="true"] #top > div:last-child {
          transform-style: preserve-3d;
        }

        [data-motion-ready="true"] #top > div:last-child > * {
          transform: translateZ(24px);
        }

        [data-motion-ready="true"] [data-project-card] {
          position: relative;
          transform-style: preserve-3d;
        }

        [data-motion-ready="true"] [data-project-card]::after,
        [data-motion-ready="true"] #top > div:last-child::after {
          position: absolute;
          inset: 0;
          z-index: 3;
          border-radius: inherit;
          opacity: var(--glow-opacity, 0);
          background: radial-gradient(
            420px circle at var(--glow-x, 50%) var(--glow-y, 50%),
            rgba(255, 255, 255, .22),
            transparent 58%
          );
          content: "";
          pointer-events: none;
          transition: opacity 250ms ease;
        }

        [data-motion-ready="true"] [data-project-card]:hover {
          box-shadow: 0 34px 80px rgba(22, 22, 22, .15);
        }

        [data-motion-ready="true"] [data-project-card] > div:first-child {
          transition: transform 700ms cubic-bezier(.16, 1, .3, 1), filter 500ms ease;
        }

        [data-motion-ready="true"] [data-project-card]:hover > div:first-child {
          transform: scale(1.035);
          filter: saturate(1.08);
        }

        [data-motion-ready="true"] #services article,
        [data-motion-ready="true"] #process article {
          transition-property: opacity, filter, transform, background-color, color;
        }

        [data-motion-ready="true"] #services article:hover {
          background: rgba(255, 255, 255, .08);
          transform: translateY(-8px);
        }

        [data-motion-ready="true"] #process article:hover h3 {
          color: #2146d0;
          transform: translateX(6px);
        }

        [data-motion-ready="true"] #process article h3 {
          transition: color 220ms ease, transform 300ms cubic-bezier(.16, 1, .3, 1);
        }

        [data-motion-ready="true"] a svg,
        [data-motion-ready="true"] button svg {
          transition: transform 300ms cubic-bezier(.16, 1, .3, 1);
        }

        [data-motion-ready="true"] a:hover svg,
        [data-motion-ready="true"] button:hover svg {
          transform: translate(3px, 3px) rotate(-2deg);
        }

        [data-motion-ready="true"] #contact > a svg {
          animation: editorial-contact-arrow 2.2s ease-in-out infinite;
        }

        [data-motion-ready="true"] #about > div:first-child img {
          transition: transform 1.1s cubic-bezier(.16, 1, .3, 1), filter 600ms ease;
        }

        [data-motion-ready="true"] #about > div:first-child:hover img {
          transform: scale(1.045);
          filter: contrast(1.03) saturate(1.04);
        }

        [data-motion-ready="true"] header nav[aria-label="Mobile"] {
          transform-origin: top right;
          animation: editorial-menu-in 360ms cubic-bezier(.16, 1, .3, 1) both;
        }

        [data-motion-ready="true"] header nav[aria-label="Mobile"] a {
          opacity: 0;
          animation: editorial-menu-item-in 420ms cubic-bezier(.16, 1, .3, 1) forwards;
        }

        [data-motion-ready="true"] header nav[aria-label="Mobile"] a:nth-child(1) { animation-delay: 40ms; }
        [data-motion-ready="true"] header nav[aria-label="Mobile"] a:nth-child(2) { animation-delay: 80ms; }
        [data-motion-ready="true"] header nav[aria-label="Mobile"] a:nth-child(3) { animation-delay: 120ms; }
        [data-motion-ready="true"] header nav[aria-label="Mobile"] a:nth-child(4) { animation-delay: 160ms; }
        [data-motion-ready="true"] header nav[aria-label="Mobile"] a:nth-child(5) { animation-delay: 200ms; }

        @keyframes editorial-header-in {
          from { opacity: 0; transform: translateY(-18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes editorial-blue-line-in {
          from { opacity: 0; transform: translateY(.35em); clip-path: inset(0 0 100% 0); }
          to { opacity: 1; transform: translateY(0); clip-path: inset(0); }
        }

        @keyframes editorial-contact-arrow {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(7px, 7px); }
        }

        @keyframes editorial-menu-in {
          from { opacity: 0; transform: translateY(-10px) scale(.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes editorial-menu-item-in {
          from { opacity: 0; transform: translateX(14px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @media (max-width: 820px) {
          [data-motion-ready="true"] [data-motion="true"] {
            --tilt-x: 0deg !important;
            --tilt-y: 0deg !important;
          }

          [data-motion-ready="true"] [data-project-card]:hover > div:first-child {
            transform: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .editorial-scroll-progress {
            display: none;
          }

          [data-motion-ready="true"] > header,
          [data-motion-ready="true"] [data-motion="true"],
          [data-motion-ready="true"] #top h1[data-visible="true"] span,
          [data-motion-ready="true"] #contact > a svg,
          [data-motion-ready="true"] header nav[aria-label="Mobile"],
          [data-motion-ready="true"] header nav[aria-label="Mobile"] a {
            opacity: 1 !important;
            filter: none !important;
            transform: none !important;
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}
