import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { serviceHref, services } from "@/lib/marketing/services";
import styles from "./HomeSections.module.css";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className={styles.services}>
      <div className={styles.serviceLayout}>
        <div className={styles.serviceIntro}>
          <p className={styles.label}>Capabilities</p>
          <h2 className={styles.heading} id="services-title">What I do.</h2>
          <p className={styles.intro}>From your first website to the systems that keep your business running.</p>
        </div>
        <ul className={styles.serviceIndex}>
          {services.map((service) => (
            <li key={service.slug}>
              <Link href={serviceHref(service.slug)} className={styles.serviceLink}>
                <span className={styles.servicePillar}>{service.pillar}</span>
                <span className={styles.serviceText}>
                  <span className={styles.serviceName}>{service.name}</span>
                  <span className={styles.serviceSummary}>{service.summary}</span>
                </span>
                <ArrowUpRight className={styles.serviceArrow} size={22} strokeWidth={1.5} aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
