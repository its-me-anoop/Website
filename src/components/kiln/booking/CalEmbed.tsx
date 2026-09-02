"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Kiln fire, so the embed's selected dates and buttons match the site. */
const CAL_BRAND = "#bf3a15";
const NAMESPACE = "discovery";

/**
 * Inline Cal.com booker for the discovery call. The container reserves
 * height so the page does not jump while Cal loads, and a plain link to
 * the public booking page sits beneath it in case the embed is blocked
 * (content blockers, strict network policies, scripts off).
 *
 * `month_view` is requested for the desktop booker; Cal switches to its
 * own mobile layout automatically under narrow viewports.
 */
export function CalEmbed({ className }: { className?: string }) {
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const cal = await getCalApi({ namespace: NAMESPACE });
      if (cancelled) return;
      cal("ui", {
        theme: "light",
        hideEventTypeDetails: false,
        layout: "month_view",
        cssVarsPerTheme: {
          light: { "cal-brand": CAL_BRAND },
          dark: { "cal-brand": CAL_BRAND },
        },
      });
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className={cn("w-full", className)}>
      <div className="min-h-[560px] overflow-hidden rounded-[18px] bg-k-paper ring-1 ring-k-line sm:min-h-[640px]">
        <Cal
          namespace={NAMESPACE}
          calLink={site.booking.calLink}
          config={{ layout: "month_view", theme: "light" }}
          style={{ width: "100%", height: "100%", overflow: "auto" }}
        />
      </div>
      <p className="mt-4 text-center text-[14px] leading-snug text-k-muted">
        Calendar not loading?{" "}
        <a
          href={site.booking.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-k-ink underline decoration-k-line-2 underline-offset-4 transition-colors hover:decoration-k-ink"
        >
          Open the booking page on Cal.com
          <ArrowUpRight size={13} aria-hidden />
        </a>
      </p>
    </div>
  );
}
