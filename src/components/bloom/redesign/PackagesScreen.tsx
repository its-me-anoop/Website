import { site } from "@/lib/site";
import { packages } from "../data";
import { RedesignShell } from "./RedesignShell";
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
            Essentials and Standard are priced. Complete is quote-only.
            Published prices are +VAT.
          </p>
        </div>
      </section>

      <section className={styles.packagesSection} aria-label="Website delivery packages">
        <div className={styles.priceGrid}>
          {packages.map((pkg, index) => {
            const display = packageDisplay(pkg);
            return (
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
                <p className={styles.packagePrice}>
                  <span className={styles.packagePriceAmount}>{display.amount}</span>
                  <span className={styles.packagePriceNote}>{display.note}</span>
                </p>
              </article>
            );
          })}
        </div>

        <div className={styles.detailGrid}>
          {packages.map((pkg) => {
            const cta = packageCta(pkg.name);
            return (
              <div key={`${pkg.name}-detail`} className={styles.detailColumn}>
                <p className={styles.packageCopy}>{pkg.copy}</p>
                <ul className={styles.featureList}>
                  {pkg.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <a
                  className={`${styles.quoteButton} ${cta.featured ? styles.quoteFeatured : styles.quoteOutline}`}
                  href={packageMailto(cta.subject)}
                >
                  {cta.label}
                </a>
              </div>
            );
          })}
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
