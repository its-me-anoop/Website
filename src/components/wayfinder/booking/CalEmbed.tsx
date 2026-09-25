"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Sign ink: Cal paints its selected dates and buttons in the brand colour
 * with white text, so the brand must be dark enough to carry it (signal
 * yellow would not). Ink with white text is ≈18:1.
 */
const CAL_BRAND = "#14171b";
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
      {/* Cal draws its own bordered card; reserve height around it only. */}
      <div className="min-h-[560px] overflow-hidden rounded-[10px] border-2 border-wf-ink bg-white p-2 sm:min-h-[600px]">
        <Cal
          namespace={NAMESPACE}
          calLink={site.booking.calLink}
          config={{ layout: "month_view", theme: "light" }}
          style={{ width: "100%", height: "100%", overflow: "auto" }}
        />
      </div>
      <p className="mt-4 text-center text-[15px] leading-snug text-wf-muted">
        Calendar not loading?{" "}
        <a
          href={site.booking.url}
          target="_blank"
          rel="noopener noreferrer"
          className="wf-link inline-flex items-center gap-1 font-bold text-wf-ink"
        >
          Open the booking page on Cal.com
          <ArrowUpRight size={13} aria-hidden />
        </a>
      </p>
    </div>
  );
}
