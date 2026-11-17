import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import styles from "./HomeSections.module.css";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className={styles.contact}>
      <div className={styles.contactLayout}>
        <div>
          <p className={styles.label}>Get in touch</p>
          <h2 id="contact-title" className={styles.heading}>What are you<br />working on?</h2>
        </div>
        <div className={styles.contactActions}>
          <a className={styles.email} href={`mailto:${site.email}`}>{site.email}<ArrowUpRight size={24} aria-hidden /></a>
          <p>I’ll get back to you within one working day.</p>
          <Link href="/book" className={styles.call}>Book a {site.booking.durationMinutes}-minute call <ArrowUpRight size={17} aria-hidden /></Link>
        </div>
      </div>
    </section>
  );
}
