import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import styles from "./redesign-shell.module.css";

const pageLinks = [
  ["Home", "/"],
  ["GP practices", "/gp-websites"],
  ["Care homes", "/care-home-websites"],
  ["Packages", "/packages"],
] as const;

const companyLinks = [
  ["About", "/about"],
  ["Contact", "/contact"],
  ["Book a call", "/book"],
] as const;

const policyLinks = [
  ["Accessibility statement", "/accessibility"],
  ["Cookie policy", "/cookie-policy"],
] as const;

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly (readonly [string, string])[];
}) {
  return (
    <nav aria-label={`${title} links`} className={styles.footerColumn}>
      <p className={styles.footerLabel}>{title}</p>
      <ul>
        {links.map(([label, href]) => (
          <li key={href}>
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function RedesignFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerGrid}>
          <div className={styles.footerIntro}>
            <Link href="/" className={styles.footerBrand} aria-label="Flutterly home">
              <Image src="/flutterly-logo.png" alt="" width={44} height={44} />
              <span className={styles.brandWords}>
                <span className={styles.footerBrandName}>Flutterly</span>
                <span className={styles.footerBrandDescriptor}>Digital delivery</span>
              </span>
            </Link>
            <p>
              {site.legalName} · {site.address.addressLocality}, UK ·{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </div>
          <FooterColumn title="Pages" links={pageLinks} />
          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Policies" links={policyLinks} />
        </div>
        <p className={styles.footerLegal}>
          © {new Date().getFullYear()} {site.legalName} · {site.address.addressLocality}, UK
        </p>
      </div>
    </footer>
  );
}
