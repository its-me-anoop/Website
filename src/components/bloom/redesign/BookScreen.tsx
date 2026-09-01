import Link from "next/link";
import { site } from "@/lib/site";
import { eventTypes } from "@/features/booking/core/config";
import { calBookingUrl } from "@/lib/cal";
import { RedesignShell } from "./RedesignShell";
import styles from "./book.module.css";

const founderFirstName = site.founder.split(" ")[0];

const reassurances = [
  "No cost and no obligation for any first call",
  "Video link sent by email once you book",
  "Times shown in your own timezone",
  "Reschedule from the Cal.com confirmation",
] as const;

function locationLabel(location: string) {
  return location.replaceAll("-", " ");
}

export function BookScreen() {
  return (
    <RedesignShell>
      <div className={styles.page}>
        <header className={styles.head}>
          <p className={styles.eyebrow}>Book a call</p>
          <h1 className={styles.title}>Pick a time, skip the email tennis.</h1>
          <p className={styles.lead}>
            Choose the kind of conversation you need and book it straight into{" "}
            {founderFirstName}&apos;s diary. You&rsquo;ll get an instant confirmation
            and a calendar file for your own diary.
          </p>
        </header>

        <div className={styles.rule} />

        <section className={styles.offer} aria-labelledby="call-types">
          <p className={styles.eyebrow}>Call types</p>
          <h2 className={styles.offerTitle} id="call-types">
            Three ways to start, all of them free.
          </h2>
        </section>

        <div className={styles.grid}>
          {eventTypes.map((eventType, index) => {
            const featured = index === 0;
            const href = calBookingUrl(eventType.id);
            return (
              <article
                key={eventType.id}
                className={`${styles.card} ${featured ? styles.actionCard : ""}`}
              >
                <p className={styles.meta}>
                  {eventType.durationMinutes} min · {locationLabel(eventType.location)}
                </p>
                <h3 className={styles.cardTitle}>{eventType.name}</h3>
                <p className={styles.description}>{eventType.description}</p>
                <ul className={styles.agenda}>
                  {eventType.agenda.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                {href ? (
                  <a
                    className={`${styles.cta} ${featured ? styles.ctaFilled : styles.ctaOutline}`}
                    href={href}
                  >
                    Pick a time
                  </a>
                ) : (
                  <p className={styles.unavailable}>Not yet bookable online</p>
                )}
              </article>
            );
          })}
        </div>

        <div className={styles.rule} />

        <section className={styles.how} aria-labelledby="how-booking-works">
          <h2 className={styles.eyebrow} id="how-booking-works">
            How booking works
          </h2>
          <ul className={styles.points}>
            {reassurances.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className={styles.email}>
            Intro and consultation times open on Cal.com in your own timezone.
            The 60-minute project scoping session is not on Cal.com yet. Prefer
            email — or that longer slot? Write to{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a> instead: both
            routes get the same attention.
          </p>
        </section>
      </div>
    </RedesignShell>
  );
}

export function BookUnavailableScreen({
  name,
  durationMinutes,
}: {
  name: string;
  durationMinutes: number;
}) {
  return (
    <RedesignShell>
      <div className={styles.page}>
        <header className={styles.head}>
          <p className={styles.eyebrow}>Book a call</p>
          <h1 className={styles.title}>
            {name} is not yet bookable online.
          </h1>
          <p className={styles.lead}>
            The {durationMinutes}-minute {name.toLowerCase()} session does not
            have a Cal.com event yet, so this page is not a booking link. Email{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a> to arrange it, or
            book a shorter call from the list.
          </p>
          <Link className={`${styles.cta} ${styles.ctaFilled}`} href="/book">
            See call types
          </Link>
        </header>
      </div>
    </RedesignShell>
  );
}
