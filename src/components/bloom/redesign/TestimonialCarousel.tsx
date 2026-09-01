"use client";

import { useState } from "react";
import styles from "./home.module.css";

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  org: string;
};

export function TestimonialCarousel({
  items,
}: {
  items: readonly Testimonial[];
}) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"idle" | "leave" | "enter">("idle");
  const item = items[index];

  if (!item) return null;

  function go(nextIndex: number) {
    if (phase !== "idle" || nextIndex === index) return;
    setPhase("leave");
    window.setTimeout(() => {
      setIndex(nextIndex);
      setPhase("enter");
      window.setTimeout(() => setPhase("idle"), 420);
    }, 220);
  }

  return (
    <div className={styles.testimonialWrap}>
      <div className={styles.testimonialMeta}>
        <span className={styles.testimonialCounter}>
          {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
        <div className={styles.testimonialControls}>
          <button
            type="button"
            className={styles.testimonialControl}
            aria-label="Previous testimonial"
            onClick={() => go((index - 1 + items.length) % items.length)}
          >
            ←
          </button>
          <button
            type="button"
            className={styles.testimonialControl}
            aria-label="Next testimonial"
            onClick={() => go((index + 1) % items.length)}
          >
            →
          </button>
        </div>
      </div>
      <blockquote
        className={`${styles.testimonialQuote} ${
          phase === "leave"
            ? styles.testimonialLeave
            : phase === "enter"
              ? styles.testimonialEnter
              : ""
        }`}
      >
        <p>{item.quote}</p>
        <footer>
          <strong>{item.name}</strong>
          <span>
            {item.role} · {item.org}
          </span>
        </footer>
      </blockquote>
    </div>
  );
}
