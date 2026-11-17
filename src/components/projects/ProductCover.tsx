import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import styles from "./product-cover.module.css";

type ProductCoverProps = {
  variant: "water" | "paper" | "clinic";
  name: string;
  category: string;
  title: ReactNode;
  description: string;
  platform: string;
  availability: string;
  store: string;
  policy: string;
  sections: readonly (readonly [string, string])[];
  children: ReactNode;
};

export function StoreLink({ name, href }: { name: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={styles.store}
      aria-label={`Download ${name} on the App Store`}>
      Get on the App Store <ArrowUpRight size={18} aria-hidden />
    </a>
  );
}

export function ProductCover({
  variant, name, category, title, description, platform, availability,
  store, policy, sections, children,
}: ProductCoverProps) {
  return (
    <header className={`${styles.cover} ${styles[variant]}`}>
      <div className={styles.inner}>
        <Link href="/#work" className={styles.back}><ArrowLeft size={15} aria-hidden /> Selected work</Link>
        <div className={styles.spread}>
          <div className={styles.copy}>
            <p className={styles.label}>{name} <span aria-hidden>/</span> {category}</p>
            <h1>{title}</h1>
            <p className={styles.intro}>{description}</p>
            <StoreLink name={name} href={store} />
            <p className={styles.platform}>{platform}<br />{availability}</p>
          </div>
          <div className={styles.art}>{children}</div>
        </div>
        <nav className={styles.index} aria-label={`About ${name}`}>
          {sections.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
          <a href={policy}>Privacy policy</a>
        </nav>
      </div>
    </header>
  );
}
