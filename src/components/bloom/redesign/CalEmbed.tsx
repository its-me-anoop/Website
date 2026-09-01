"use client";

import type { EventTypeId } from "@/features/booking/core/types";
import { cal, calEmbedUrl } from "@/lib/cal";
import styles from "./cal-embed.module.css";

type CalEmbedProps = {
  eventTypeId: EventTypeId;
  title: string;
  className?: string;
};

/**
 * Dark-theme Cal.com booking embed (iframe). Opens the matching Cal event
 * so visitors pick a real slot with confirmation handled by Cal.com.
 * Parent surfaces own “Open in Cal.com” deep link to avoid duplicate links.
 */
export function CalEmbed({ eventTypeId, title, className = "" }: CalEmbedProps) {
  if (!cal.enabled) {
    return (
      <p className={styles.missing}>
        Cal.com is not configured. Set <code>NEXT_PUBLIC_CAL_USERNAME</code> to
        enable booking.
      </p>
    );
  }

  return (
    <div className={`${styles.shell} ${className}`}>
      <iframe
        src={calEmbedUrl(eventTypeId)}
        title={title}
        className={styles.frame}
        loading="lazy"
        allow="camera; microphone; fullscreen"
      />
    </div>
  );
}
