"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { eventTypes } from "@/features/booking/core/config";
import type { EventTypeId } from "@/features/booking/core/types";
import { site } from "@/lib/site";
import { cal, calBookingUrl } from "@/lib/cal";
import { CalEmbed } from "./CalEmbed";
import styles from "./book.module.css";

const founderFirstName = site.founder.split(" ")[0];

const reassurances = [
  "No cost and no obligation for any first call",
  "Powered by Cal.com — confirmation and calendar invite are instant",
  "Times shown in your own timezone",
  "Reschedule from the Cal.com confirmation email whenever you need",
] as const;

function locationLabel(location: string) {
  return location.replaceAll("-", " ");
}

export function BookExperience() {
  const [selectedId, setSelectedId] = useState<EventTypeId>(eventTypes[0]!.id);
  const selected = useMemo(
    () => eventTypes.find((eventType) => eventType.id === selectedId) ?? eventTypes[0]!,
    [selectedId],
  );

  function selectCallType(id: EventTypeId) {
    setSelectedId(id);
    // Mobile: bring the Cal.com calendar into view after choosing a plan.
    requestAnimationFrame(() => {
      const reduceMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.getElementById("scheduler")?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    });
  }

  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <p className={styles.eyebrow}>Book a call</p>
        <h1 className={styles.title}>Pick a time, skip the email tennis.</h1>
        <p className={styles.lead}>
          Choose the conversation you need, then book straight into{" "}
          {founderFirstName}&apos;s Cal.com diary. You get an instant confirmation
          and a calendar invite for your own diary.
        </p>
      </header>

      <div className={styles.rule} />

      <section className={styles.offer} aria-labelledby="call-types">
        <p className={styles.eyebrow}>Call types</p>
        <h2 className={styles.offerTitle} id="call-types">
          Three ways to start, all of them free.
        </h2>
      </section>

      <ul className={styles.grid} aria-label="Call types">
        {eventTypes.map((eventType, index) => {
          const featured = index === 0;
          const isSelected = eventType.id === selectedId;
          return (
            <li key={eventType.id} className={styles.gridItem}>
              <button
                type="button"
                className={`${styles.card} ${featured ? styles.actionCard : ""} ${
                  isSelected ? styles.cardSelected : ""
                }`}
                aria-pressed={isSelected}
                onClick={() => selectCallType(eventType.id)}
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
                <span
                  className={`${styles.cta} ${
                    isSelected || featured ? styles.ctaFilled : styles.ctaOutline
                  }`}
                >
                  {isSelected ? "Selected — pick a time below" : "Select"}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <section
        className={styles.scheduler}
        aria-labelledby="scheduler-heading"
        id="scheduler"
      >
        <div className={styles.schedulerHead}>
          <div>
            <p className={styles.eyebrow}>Cal.com</p>
            <h2 id="scheduler-heading" className={styles.schedulerTitle}>
              Book {selected.name}
            </h2>
            <p className={styles.schedulerLead}>
              {selected.durationMinutes} minutes · {locationLabel(selected.location)}.
              Pick a slot below — Cal.com confirms immediately.
            </p>
          </div>
          {cal.enabled ? (
            <a
              className={styles.externalLink}
              href={calBookingUrl(selected.id)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Cal.com
            </a>
          ) : null}
        </div>

        {cal.enabled ? (
          <CalEmbed
            eventTypeId={selected.id}
            title={`Book ${selected.name} on Cal.com`}
          />
        ) : (
          <div className={styles.fallback}>
            <p>
              Live Cal.com booking needs <code>NEXT_PUBLIC_CAL_USERNAME</code>.
              Until then you can use the on-site scheduler or email{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
            <Link href={`/book/${selected.id}`} className={styles.fallbackButton}>
              Pick a time
            </Link>
          </div>
        )}
      </section>

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
          Prefer email — or no times suit? Write to{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a> instead: both routes
          get the same attention.
        </p>
      </section>
    </div>
  );
}
