"use client";

import { useEffect, useState } from "react";
import styles from "./home.module.css";

const words = ["Websites", "Digital", "Campaigns"] as const;

export function RotatingWords() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % words.length);
    }, 2600);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <p className={styles.rotatingWords} aria-live="polite">
      {words.map((word, wordIndex) => (
        <span
          key={word}
          className={`${styles.rotatingWord} ${
            wordIndex === index ? styles.rotatingWordActive : ""
          }`}
        >
          {word}
        </span>
      ))}
    </p>
  );
}
