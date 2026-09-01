import Image from "next/image";
import { eventTypes } from "@/features/booking/core/config";
import { calBookingUrl } from "@/lib/cal";
import { site } from "@/lib/site";
import { RedesignShell } from "./RedesignShell";
import styles from "./contact.module.css";

const callCopy = {
  "intro-call": {
    title: "Fit check",
    description: "Is this the right conversation?",
  },
  consultation: {
    title: "Scope talk",
    description: "What needs to work better.",
  },
  "project-scoping": {
    title: "Walkthrough",
    description: "A deeper look at the work.",
  },
} as const;

export function ContactScreen() {
  return (
    <RedesignShell>
      <section className={styles.hero} aria-labelledby="contact-title">
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Contact</p>
            <h1 id="contact-title" className={styles.title}>
              Email Anoop. Or book a call.
            </h1>
            <p className={styles.intro}>
              {site.email} · reply within one working day · Reading, UK
            </p>
            <a href={`mailto:${site.email}`} className={styles.emailButton}>
              Email Anoop
            </a>
          </div>

          <div className={styles.projectFrame}>
            <Image
              src="/project-greenmead.png"
              alt="Greenmead website delivered by Flutterly"
              width={1052}
              height={512}
              className={styles.projectImage}
              sizes="(min-width: 1024px) 526px, calc(100vw - 40px)"
              priority
            />
          </div>
        </div>
      </section>

      <section id="book" className={styles.bookingSection} aria-labelledby="book-title">
        <div className={styles.bookingInner}>
          <p id="book-title" className={styles.eyebrow}>
            Book a call
          </p>
          <div className={styles.callGrid}>
            {eventTypes.map((eventType) => {
              const copy = callCopy[eventType.id];
              const href = calBookingUrl(eventType.id);
              if (href) {
                return (
                  <a key={eventType.id} href={href} className={styles.callCard}>
                    <p className={styles.duration}>{eventType.durationMinutes} min</p>
                    <h2>{copy.title}</h2>
                    <p className={styles.callDescription}>{copy.description}</p>
                  </a>
                );
              }
              return (
                <div
                  key={eventType.id}
                  className={`${styles.callCard} ${styles.callCardStatic}`}
                >
                  <p className={styles.duration}>{eventType.durationMinutes} min</p>
                  <h2>{copy.title}</h2>
                  <p className={styles.callDescription}>{copy.description}</p>
                  <p className={styles.unavailable}>Not yet bookable online</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </RedesignShell>
  );
}
