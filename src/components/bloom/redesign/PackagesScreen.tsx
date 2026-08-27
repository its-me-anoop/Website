import Image from "next/image";
import { Check } from "lucide-react";
import { site } from "@/lib/site";
import { packages } from "../data";
import { RedesignShell } from "./RedesignShell";
import styles from "./packages.module.css";

const projectStills = [
  { src: "/project-sandbourne.png", alt: "Sandbourne Care website" },
  { src: "/project-greenmead.png", alt: "Greenmead website" },
  { src: "/project-jjpaper.png", alt: "JJ Paper website" },
  { src: "/project-pembroke.png", alt: "Pembroke Care website" },
] as const;

function quoteHref(packageName: string) {
  return `mailto:${site.email}?subject=${encodeURIComponent(
    `Quote request: ${packageName} package`,
  )}`;
}

export function PackagesScreen() {
  return (
    <RedesignShell>
      <section className={styles.hero} aria-labelledby="packages-title">
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Packages · Tailored scope</p>
          <h1 id="packages-title" className={styles.title}>
            Clear packages. Honest quotes.
          </h1>
          <p className={styles.intro}>
            After a short call: a written fixed quote within two working days.
            No currency on this page.
          </p>

          <div className={styles.projectStrip} aria-label="A selection of Flutterly projects">
            {projectStills.map((project, index) => (
              <Image
                key={project.src}
                src={project.src}
                alt={project.alt}
                width={320}
                height={192}
                className={styles.projectStill}
                sizes="160px"
                priority={index < 2}
              />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.packagesSection} aria-label="Website delivery packages">
        <div className={styles.packagesGrid}>
          {packages.map((pkg, index) => (
            <article
              key={pkg.name}
              className={`${styles.packageCard} ${pkg.featured ? styles.featuredCard : ""}`}
            >
              <div className={styles.packageLabelRow}>
                <p className={styles.packageLabel}>
                  {String(index + 1).padStart(2, "0")} · {pkg.name}
                </p>
                {pkg.featured ? (
                  <span className={styles.popularLabel}>Most popular</span>
                ) : null}
              </div>

              <h2 className={styles.packageTitle}>{pkg.strap}</h2>
              <p className={styles.packageCopy}>{pkg.copy}</p>
              <ul className={styles.featureList}>
                {pkg.features.map((feature) => (
                  <li key={feature}>
                    <Check className={styles.checkIcon} size={16} strokeWidth={2.5} aria-hidden />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a className={styles.quoteButton} href={quoteHref(pkg.name)}>
                Get a tailored quote
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.closingBand} aria-labelledby="packages-closing-title">
        <div className={styles.closingInner}>
          <h2 id="packages-closing-title">A clear scope. A fixed quote.</h2>
          <a
            href={`mailto:${site.email}?subject=${encodeURIComponent("Discuss a Flutterly project")}`}
            className={styles.closingButton}
          >
            Discuss a project
          </a>
        </div>
      </section>
    </RedesignShell>
  );
}
