"use client";

import Link from "next/link";
import { Video } from "lucide-react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";
import styles from "./home.module.css";

const orbs = [
  {
    id: "mint",
    size: "lg",
    left: "14%",
    top: "44%",
    delay: 0,
    float: [-8, 6, -8] as number[],
    duration: 6.2,
  },
  {
    id: "violet",
    size: "sm",
    left: "50%",
    top: "27%",
    delay: 0.35,
    float: [-5, 8, -5] as number[],
    duration: 5.4,
  },
  {
    id: "amber",
    size: "lg",
    left: "86%",
    top: "42%",
    delay: 0.7,
    float: [-7, 5, -7] as number[],
    duration: 6.8,
  },
] as const;

const copyStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const copyItem = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function HeroLuma() {
  const reduced = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <div className={styles.heroLumaScene} data-hero-luma-path="">
        <svg
          className={styles.heroLumaWave}
          viewBox="0 0 1200 360"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <m.path
            d="M -20 210 C 180 92, 320 268, 520 176 S 860 88, 1240 196"
            pathLength={1}
            initial={reduced ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1] as const, delay: 0.05 }}
          />
        </svg>

        <ul className={styles.heroLumaOrbs} aria-hidden="true">
          {orbs.map((orb) => (
            <li
              key={orb.id}
              className={`${styles.heroLumaOrb} ${styles[`heroLumaOrb${orb.size}`]}`}
              data-tone={orb.id}
              style={{ left: orb.left, top: orb.top }}
            >
              <m.div
                className={styles.heroLumaOrbFloat}
                initial={reduced ? false : { opacity: 0, scale: 0.72 }}
                animate={
                  reduced
                    ? { opacity: 1, scale: 1 }
                    : {
                        opacity: 1,
                        scale: 1,
                        y: orb.float,
                      }
                }
                transition={
                  reduced
                    ? { duration: 0.3 }
                    : {
                        opacity: { duration: 0.55, delay: orb.delay, ease: [0.16, 1, 0.3, 1] as const },
                        scale: {
                          duration: 0.65,
                          delay: orb.delay,
                          type: "spring",
                          stiffness: 260,
                          damping: 22,
                        },
                        y: {
                          duration: orb.duration,
                          repeat: Infinity,
                          repeatType: "mirror",
                          ease: "easeInOut",
                          delay: orb.delay + 0.65,
                        },
                      }
                }
              >
                <span className={styles.heroLumaOrbHalo} />
                <span className={styles.heroLumaOrbIcon}>
                  <Video size={orb.size === "sm" ? 16 : 20} strokeWidth={2.2} />
                </span>
              </m.div>
            </li>
          ))}
        </ul>

        <m.div
          className={`${styles.site} ${styles.heroInner}`}
          variants={copyStagger}
          initial={reduced ? false : "hidden"}
          animate="show"
        >
          <m.h1 id="home-heading" variants={copyItem}>
            What will you ship?
          </m.h1>
          <m.p className={styles.heroLead} variants={copyItem}>
            Create accessible websites and products for organisations people rely
            on — built directly in Reading.
          </m.p>
          <m.div className={styles.heroActions} variants={copyItem}>
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent("Project enquiry")}`}
              className={styles.heroPrimaryButton}
            >
              Get started <span aria-hidden>→</span>
            </a>
            <Link href="/book" className={styles.heroSecondaryLink}>
              Book a call
            </Link>
          </m.div>
        </m.div>
      </div>
    </LazyMotion>
  );
}
