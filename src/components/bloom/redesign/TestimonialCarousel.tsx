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
  const item = items[index];

  if (!item) return null;

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
            onClick={() => setIndex((current) => (current - 1 + items.length) % items.length)}
          >
            ←
          </button>
          <button
            type="button"
            className={styles.testimonialControl}
            aria-label="Next testimonial"
            onClick={() => setIndex((current) => (current + 1) % items.length)}
          >
            →
          </button>
        </div>
      </div>
      <blockquote className={styles.testimonialQuote}>
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
