"use client";

import { useEffect, useState } from "react";
import styles from "./home.module.css";

const words = ["Websites", "Digital", "Campaigns"] as const;

export function RotatingWords() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    let timeoutId = 0;

    const intervalId = window.setInterval(() => {
      setPhase("out");
      timeoutId = window.setTimeout(() => {
        setIndex((current) => (current + 1) % words.length);
        setPhase("in");
      }, 280);
    }, 2600);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
    };
  }, []);

  const word = words[index];

  return (
    <p className={styles.rotatingWords} aria-live="polite">
      <span
        className={`${styles.rotatingWord} ${styles.rotatingWordActive} ${
          phase === "out" ? styles.rotatingWordOut : ""
        }`}
      >
        {word}
      </span>
    </p>
  );
}
