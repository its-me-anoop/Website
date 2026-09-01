import Link from "next/link";
import { site } from "@/lib/site";
import { packages } from "../data";
import { RedesignShell } from "./RedesignShell";
import { RevealOnScroll } from "./RevealOnScroll";
import { SectionInView } from "./SectionInView";
import styles from "./packages.module.css";

function packageCta(packageName: string) {
  if (packageName === "Essentials") {
    return { label: "Start Essentials", subject: "Start Essentials", featured: false };
  }
  if (packageName === "Standard") {
    return { label: "Start Standard", subject: "Start Standard", featured: true };
  }
  return {
    label: "Get a tailored quote",
    subject: `Quote request: ${packageName} package`,
    featured: false,
  };
}

function packageMailto(subject: string) {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
}

function packageDisplay(pkg: (typeof packages)[number]) {
  if (pkg.price) return pkg.price;
  return { amount: "Quote-only", note: "Priced on scope. +VAT." };
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
            Compare what you get in each plan, then pick the one that fits.
            Essentials and Standard are priced. Complete is quote-only. All
            published prices are +VAT.
          </p>
        </div>
      </section>

      <section className={styles.packagesSection} aria-label="Website delivery packages">
        <SectionInView>
          <div className={styles.planGrid}>
            {packages.map((pkg, index) => {
              const display = packageDisplay(pkg);
              const cta = packageCta(pkg.name);
              return (
                <article
                  key={pkg.name}
                  data-stagger-item
                  className={`${styles.planCard} ${pkg.featured ? styles.featuredCard : ""}`}
                >
                  <div className={styles.planTop}>
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
                  </div>

                  <div className={styles.priceBlock}>
                    <p className={styles.packagePriceAmount}>{display.amount}</p>
                    <p className={styles.packagePriceNote}>{display.note}</p>
                  </div>

                  <ul className={styles.featureList}>
                    {pkg.features.map((feature) => (
                      <li key={feature}>
                        <span className={styles.check} aria-hidden>
                          +
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    className={`${styles.quoteButton} ${
                      cta.featured ? styles.quoteFeatured : styles.quoteOutline
                    }`}
                    href={packageMailto(cta.subject)}
                  >
                    {cta.label}
                  </a>
                </article>
              );
            })}
          </div>
        </SectionInView>
      </section>

      <section className={styles.closingBand} aria-labelledby="packages-closing-title">
        <RevealOnScroll>
          <div className={styles.closingInner}>
            <h2 id="packages-closing-title">Not sure which plan fits?</h2>
            <p className={styles.closingCopy}>
              Book a short call and we will map the scope before you commit.
            </p>
            <div className={styles.closingActions}>
              <Link href="/book" className={styles.closingButton}>
                Book a call
              </Link>
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent("Discuss a Flutterly project")}`}
                className={styles.closingSecondary}
              >
                Discuss a project
              </a>
            </div>
          </div>
        </RevealOnScroll>
      </section>
    </RedesignShell>
  );
}
