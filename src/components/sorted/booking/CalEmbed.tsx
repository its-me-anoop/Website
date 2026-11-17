"use client";

import { useEffect, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";

/** Cal's embedded document takes a literal colour rather than a CSS token. */
const CAL_BRAND = "#092c30";
const NAMESPACE = "discovery";

export function CalEmbed() {
  const [status, setStatus] = useState<"loading" | "ready" | "delayed" | "failed">("loading");

  useEffect(() => {
    let listening = true;
    let removeListeners: (() => void) | undefined;
    const slowLoad = window.setTimeout(() => setStatus("delayed"), 12_000);

    async function configure() {
      const cal = await getCalApi({ namespace: NAMESPACE });
      if (!listening) return;
      const ready = () => {
        window.clearTimeout(slowLoad);
        setStatus("ready");
      };
      const failed = () => {
        window.clearTimeout(slowLoad);
        setStatus("failed");
      };
      cal("on", { action: "linkReady", callback: ready });
      cal("on", { action: "linkFailed", callback: failed });
      removeListeners = () => {
        cal("off", { action: "linkReady", callback: ready });
        cal("off", { action: "linkFailed", callback: failed });
      };
      cal("ui", {
        theme: "light",
        hideEventTypeDetails: false,
        layout: "month_view",
        cssVarsPerTheme: {
          light: { "cal-brand": CAL_BRAND },
          dark: { "cal-brand": CAL_BRAND },
        },
      });
    }
    configure().catch(() => {
      if (listening) {
        window.clearTimeout(slowLoad);
        setStatus("failed");
      }
    });
    return () => {
      listening = false;
      removeListeners?.();
      window.clearTimeout(slowLoad);
    };
  }, []);

  return (
    <div>
      <div className="cv-calendar-head">
        <p role="status">
          {status === "failed" ? "The calendar could not load." :
            status === "delayed" ? "The calendar is taking a while to load." :
            status === "ready" ? "Available times" : "Loading available times…"}
        </p>
        <a href={site.booking.url} target="_blank" rel="noopener noreferrer" className="cv-inline-link">
          Open the booking page on Cal.com <ArrowUpRight size={15} aria-hidden />
        </a>
      </div>
      {status !== "failed" && (
        <div className="cv-calendar" role="region" aria-label="Booking calendar">
          <Cal namespace={NAMESPACE} calLink={site.booking.calLink}
            config={{ layout: "month_view", theme: "light" }}
            style={{ width: "100%", height: "100%", overflow: "auto" }} />
        </div>
      )}
    </div>
  );
}
