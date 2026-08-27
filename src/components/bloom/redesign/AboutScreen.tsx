import Image from "next/image";
import { site } from "@/lib/site";
import { RedesignShell } from "./RedesignShell";
import styles from "./about.module.css";

const deliveredWork = [
  {
    src: "/project-pembroke.png",
    alt: "Pembroke Care website delivered by Flutterly",
  },
  {
    src: "/project-sandbourne.png",
    alt: "Sandbourne Care website delivered by Flutterly",
  },
] as const;

export function AboutScreen() {
  return (
    <RedesignShell>
      <section className={styles.hero} aria-labelledby="about-title">
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>About · Reading, UK</p>
            <h1 id="about-title" className={styles.title}>
              Direct digital delivery, with one person accountable.
            </h1>
            <p className={styles.intro}>
              {site.founder}, founder. The person you brief is the person who builds.
            </p>
            <p className={styles.positioningNote}>
              Not an occupancy agency. Not an NHS product house. Not a cheap GP-template shop.
            </p>
          </div>

          <div className={styles.portraitFrame}>
            <Image
              src="/anoop-jose.jpg"
              alt={`${site.founder}, founder of Flutterly`}
              width={864}
              height={448}
              className={styles.portrait}
              sizes="(min-width: 1024px) 432px, calc(100vw - 40px)"
              priority
            />
          </div>
        </div>
      </section>

      <section className={styles.workSection} aria-label="Selected work">
        <div className={styles.workGrid}>
          {deliveredWork.map((project) => (
            <Image
              key={project.src}
              src={project.src}
              alt={project.alt}
              width={1072}
              height={448}
              className={styles.workStill}
              sizes="(min-width: 768px) 50vw, calc(100vw - 40px)"
            />
          ))}
        </div>
      </section>

      <section className={styles.closingBand} aria-labelledby="about-closing-title">
        <div className={styles.closingInner}>
          <h2 id="about-closing-title">Reading, UK. Reply within one working day.</h2>
          <a href={`mailto:${site.email}`} className={styles.closingButton}>
            {site.email}
          </a>
        </div>
      </section>
    </RedesignShell>
  );
}
