import { Globe, Layers, Megaphone } from "lucide-react";
import styles from "./home.module.css";

const orbs = [
  { tone: "mint", icon: Globe, label: "Websites" },
  { tone: "violet", icon: Layers, label: "Digital products" },
  { tone: "amber", icon: Megaphone, label: "Campaigns" },
] as const;

export function HeroLumaPath() {
  return (
    <div className={styles.heroLumaPath} data-hero-luma-path="" aria-hidden="true">
      <svg
        className={styles.heroLumaWave}
        viewBox="0 0 1200 320"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-40 168 C 180 96, 320 248, 520 168 S 860 88, 1240 176"
          pathLength={1}
        />
      </svg>
      <ul className={styles.heroLumaOrbs}>
        {orbs.map(({ tone, icon: Icon, label }) => (
          <li key={tone} className={styles.heroLumaOrb} data-tone={tone}>
            <span className={styles.heroLumaOrbHalo} />
            <span className={styles.heroLumaOrbIcon}>
              <Icon size={18} strokeWidth={2.1} />
            </span>
            <span className={styles.visuallyHidden}>{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
