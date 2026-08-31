import Link from "next/link";
import { site } from "@/lib/site";
import { services, supportService } from "../data";
import { RedesignShell } from "./RedesignShell";
import styles from "./services.module.css";

const PROJECT_MAIL = `mailto:${site.email}?subject=${encodeURIComponent("Digital project enquiry")}`;

export function ServicesScreen() {
  return (
    <RedesignShell>
      <article className={styles.page}>
        <header className={styles.head}>
          <p className={styles.eyebrow}>Services</p>
          <h1 className={styles.title}>Digital services that work together.</h1>
          <p className={styles.lead}>
            Flutterly Limited plans, builds and supports websites, digital
            products, business systems and campaigns for GP practices, care
            homes and other organisations.
          </p>
          <div className={styles.actions}>
            <a className={`${styles.button} ${styles.filled}`} href={PROJECT_MAIL}>
              Discuss what you need
            </a>
            <Link className={`${styles.button} ${styles.outline}`} href="/#work">
              Review delivered work
            </Link>
          </div>
        </header>

        <div className={styles.rule} />

        <section className={styles.offerHead} aria-labelledby="delivery-offer">
          <p className={styles.eyebrow}>The delivery offer</p>
          <h2 className={styles.offerTitle} id="delivery-offer">
            Start with the business need, then choose the technology.
          </h2>
        </section>

        {services.map((service, index) => (
          <div key={service.id}>
            {index > 0 ? <div className={styles.rule} /> : null}
            <section className={styles.row} aria-labelledby={`service-${service.number}`}>
              <p className={styles.index} aria-hidden="true">
                {service.number}
              </p>
              <div>
                <p className={styles.kind}>{service.label}</p>
                <h3 className={styles.rowTitle} id={`service-${service.number}`}>
                  {service.title}
                </h3>
                <p className={styles.rowCopy}>{service.copy}</p>
                <p className={styles.meta}>{service.points.join(" · ")}</p>
                <Link className={styles.link} href={service.cta.href}>
                  {service.cta.label}
                </Link>
              </div>
            </section>
          </div>
        ))}

        <div className={styles.rule} />

        <section className={styles.support} aria-labelledby="ongoing-support">
          <p className={styles.eyebrow}>{supportService.label}</p>
          <h2 className={styles.supportTitle} id="ongoing-support">
            {supportService.title}
          </h2>
          <p className={styles.supportCopy}>{supportService.copy}</p>
          <Link className={styles.link} href={supportService.cta.href}>
            {supportService.cta.label}
          </Link>
        </section>
      </article>
    </RedesignShell>
  );
}
