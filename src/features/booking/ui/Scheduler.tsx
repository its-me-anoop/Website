"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarPlus,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Globe2,
  Video,
} from "lucide-react";
import { site } from "@/lib/site";
import { BloomShell } from "@/components/bloom/BloomShell";
import { CheckItem } from "@/components/bloom/primitives";
import { availabilityConfig } from "../core/config";
import { addDaysToKey, dateKeyInZone, wallTimeToUtc, weekdayOfKey } from "../core/time";
import type { EventType } from "../core/types";

type Step = "pick" | "details" | "confirmed";

type Confirmation = {
  reference: string;
  startIso: string;
  endIso: string;
  ics: string;
  email: string;
};

const weekdayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

function monthKeyOf(dateKey: string): string {
  return dateKey.slice(0, 7);
}

function shiftMonthKey(monthKey: string, by: number): string {
  const [year, month] = monthKey.split("-").map(Number);
  const shifted = new Date(Date.UTC(year, month - 1 + by, 1));
  return shifted.toISOString().slice(0, 7);
}

function daysInMonth(monthKey: string): number {
  const [year, month] = monthKey.split("-").map(Number);
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

function monthTitle(monthKey: string): string {
  const [year, month] = monthKey.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, 1)).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function formatDayHeading(dateKey: string): string {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  });
}

function formatTime(iso: string, timeZone: string): string {
  return new Date(iso).toLocaleTimeString("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatSlotSummary(startIso: string, endIso: string, timeZone: string): string {
  const day = new Date(startIso).toLocaleDateString("en-GB", {
    timeZone,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return `${day}, ${formatTime(startIso, timeZone)}–${formatTime(endIso, timeZone)}`;
}

function googleCalendarUrl(eventType: EventType, confirmation: Confirmation): string {
  const compact = (iso: string) => iso.replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${eventType.name} — ${site.studio}`,
    dates: `${compact(confirmation.startIso)}/${compact(confirmation.endIso)}`,
    details: `Booking reference ${confirmation.reference}. Joining details arrive by email from ${site.email}.`,
    location: "Video call",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * The /book/[eventType] scheduler: month calendar, timezone-aware slot
 * list, details form and confirmation. Availability arrives as UTC
 * instants; every visible date and time is derived in the timezone the
 * visitor picked, so "Wednesday 09:30" always means their 09:30.
 */
export function Scheduler({ eventType }: { eventType: EventType }) {
  const [timeZone, setTimeZone] = useState<string | null>(null);
  const [todayKey, setTodayKey] = useState<string | null>(null);
  const [monthKey, setMonthKey] = useState<string | null>(null);
  const [slots, setSlots] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(true);
  const [slotsError, setSlotsError] = useState<string | null>(null);
  const [reloadCount, setReloadCount] = useState(0);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [step, setStep] = useState<Step>("pick");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);

  // Timezone and "today" are visitor-specific, so they resolve after
  // hydration; until then the calendar shows a quiet loading state.
  useEffect(() => {
    const detected = Intl.DateTimeFormat().resolvedOptions().timeZone || "Europe/London";
    const today = dateKeyInZone(new Date(), detected);
    setTimeZone(detected);
    setTodayKey(today);
    setMonthKey(monthKeyOf(today));
  }, []);

  useEffect(() => {
    if (!timeZone || !monthKey) return;
    const controller = new AbortController();
    const firstKey = `${monthKey}-01`;
    const nextFirstKey = `${shiftMonthKey(monthKey, 1)}-01`;
    const from = wallTimeToUtc(firstKey, "00:00", timeZone);
    const to = wallTimeToUtc(nextFirstKey, "00:00", timeZone);
    const query = new URLSearchParams({
      eventType: eventType.id,
      from: from.toISOString(),
      to: to.toISOString(),
    });
    setSlotsLoading(true);
    setSlotsError(null);
    fetch(`/api/booking/availability?${query.toString()}`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(`availability ${response.status}`);
        const payload = (await response.json()) as { slots: string[] };
        setSlots(payload.slots);
        setSlotsLoading(false);
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        console.error(error);
        setSlotsError("The diary could not be loaded. Check your connection and try again.");
        setSlotsLoading(false);
      });
    return () => controller.abort();
  }, [eventType.id, monthKey, timeZone, reloadCount]);

  const slotsByDay = useMemo(() => {
    const grouped = new Map<string, string[]>();
    if (!timeZone) return grouped;
    for (const iso of slots) {
      const key = dateKeyInZone(new Date(iso), timeZone);
      grouped.set(key, [...(grouped.get(key) ?? []), iso]);
    }
    return grouped;
  }, [slots, timeZone]);

  // Keep a sensible day selected: first available day of the month.
  useEffect(() => {
    if (slotsLoading || !monthKey) return;
    if (selectedDay && slotsByDay.has(selectedDay) && monthKeyOf(selectedDay) === monthKey) return;
    const firstAvailable = [...slotsByDay.keys()].sort()[0] ?? null;
    setSelectedDay(firstAvailable);
  }, [slotsLoading, slotsByDay, selectedDay, monthKey]);

  const timeZoneOptions = useMemo(() => {
    const zones =
      typeof Intl.supportedValuesOf === "function"
        ? Intl.supportedValuesOf("timeZone")
        : ["Europe/London"];
    return timeZone && !zones.includes(timeZone) ? [timeZone, ...zones] : zones;
  }, [timeZone]);

  const minMonthKey = todayKey ? monthKeyOf(todayKey) : null;
  const maxMonthKey = todayKey
    ? monthKeyOf(addDaysToKey(todayKey, availabilityConfig.horizonDays))
    : null;

  const calendarCells = useMemo(() => {
    if (!monthKey) return [];
    const cells: (string | null)[] = [];
    const firstKey = `${monthKey}-01`;
    for (let blank = 0; blank < weekdayOfKey(firstKey) - 1; blank += 1) cells.push(null);
    for (let day = 1; day <= daysInMonth(monthKey); day += 1) {
      cells.push(`${monthKey}-${String(day).padStart(2, "0")}`);
    }
    return cells;
  }, [monthKey]);

  async function submitBooking(form: FormData) {
    if (!selectedSlot || !timeZone) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch("/api/booking/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventTypeId: eventType.id,
          startIso: selectedSlot,
          name: form.get("name"),
          email: form.get("email"),
          notes: form.get("notes") ?? "",
          timeZone,
        }),
      });
      const payload = (await response.json().catch(() => null)) as
        | { booking?: Confirmation & { reference: string }; ics?: string; error?: string }
        | null;
      if (response.status === 201 && payload?.booking && payload.ics) {
        setConfirmation({
          reference: payload.booking.reference,
          startIso: payload.booking.startIso,
          endIso: payload.booking.endIso,
          email: payload.booking.email,
          ics: payload.ics,
        });
        setStep("confirmed");
      } else if (response.status === 409) {
        setSubmitError(payload?.error ?? "That time has just been taken. Pick another slot.");
        setSelectedSlot(null);
        setStep("pick");
        setReloadCount((count) => count + 1);
      } else {
        setSubmitError(payload?.error ?? "The booking could not be made. Try again.");
      }
    } catch (error) {
      console.error(error);
      setSubmitError("The booking could not be made. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const ready = timeZone && monthKey && todayKey;

  return (
    <BloomShell>
      <section className="relative overflow-hidden">
        <div aria-hidden className="bl-grid absolute inset-0" />
        <div className="relative mx-auto w-full max-w-[1080px] px-5 pb-20 pt-10 sm:px-8 sm:pt-14">
          <Link
            href="/book"
            className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-bl-teal hover:text-bl-teal-hover"
          >
            <ArrowLeft size={15} aria-hidden />
            All call types
          </Link>

          <div className="bl-card mt-5 overflow-hidden rounded-[26px] border border-bl-line bg-bl-surface">
            {step === "confirmed" && confirmation ? (
              <ConfirmationPanel
                eventType={eventType}
                confirmation={confirmation}
                timeZone={timeZone ?? "Europe/London"}
              />
            ) : (
              <div className="grid lg:grid-cols-[300px_1fr]">
                <aside className="border-b border-bl-line bg-bl-band-2/60 p-7 lg:border-b-0 lg:border-r sm:p-8">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-bl-muted">
                    {site.founder} · {site.studio}
                  </p>
                  <h1 className="mt-2 text-[24px] font-medium tracking-tight text-bl-ink">
                    {eventType.name}
                  </h1>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-bl-teal">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-bl-teal-soft px-3 py-1 text-[12.5px] font-semibold">
                      <Clock3 size={13} aria-hidden />
                      {eventType.durationMinutes} min
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-bl-teal-soft px-3 py-1 text-[12.5px] font-semibold">
                      <Video size={13} aria-hidden />
                      Video call
                    </span>
                  </div>
                  <p className="mt-4 text-[14px] leading-relaxed text-bl-ink-soft">
                    {eventType.description}
                  </p>
                  <ul className="mt-5 grid gap-2.5">
                    {eventType.agenda.map((item) => (
                      <CheckItem key={item} className="text-bl-ink-soft">
                        {item}
                      </CheckItem>
                    ))}
                  </ul>

                  <label className="mt-7 block">
                    <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-bl-muted">
                      <Globe2 size={13} aria-hidden />
                      Timezone
                    </span>
                    <select
                      value={timeZone ?? "Europe/London"}
                      onChange={(event) => setTimeZone(event.target.value)}
                      disabled={!ready}
                      className="mt-2 w-full rounded-xl border border-bl-line-2 bg-bl-surface px-3 py-2 text-[13.5px] text-bl-ink"
                    >
                      {timeZoneOptions.map((zone) => (
                        <option key={zone} value={zone}>
                          {zone.replaceAll("_", " ")}
                        </option>
                      ))}
                    </select>
                  </label>
                </aside>

                {step === "pick" ? (
                  <div className="grid p-7 sm:p-8 md:grid-cols-[1fr_220px] md:gap-8">
                    <div>
                      {submitError ? (
                        <p role="alert" className="mb-4 rounded-xl bg-bl-amber-soft px-4 py-3 text-[13.5px] text-bl-ink">
                          {submitError}
                        </p>
                      ) : null}
                      <div className="flex items-center justify-between">
                        <h2 className="text-[16px] font-medium text-bl-ink">
                          {monthKey ? monthTitle(monthKey) : "Loading dates…"}
                        </h2>
                        <div className="flex gap-1.5">
                          <button
                            type="button"
                            aria-label="Previous month"
                            disabled={!ready || monthKey === minMonthKey}
                            onClick={() => setMonthKey((key) => key && shiftMonthKey(key, -1))}
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-bl-line-2 text-bl-ink transition-colors hover:border-bl-teal hover:text-bl-teal disabled:cursor-not-allowed disabled:opacity-35"
                          >
                            <ChevronLeft size={16} aria-hidden />
                          </button>
                          <button
                            type="button"
                            aria-label="Next month"
                            disabled={!ready || monthKey === maxMonthKey}
                            onClick={() => setMonthKey((key) => key && shiftMonthKey(key, 1))}
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-bl-line-2 text-bl-ink transition-colors hover:border-bl-teal hover:text-bl-teal disabled:cursor-not-allowed disabled:opacity-35"
                          >
                            <ChevronRight size={16} aria-hidden />
                          </button>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-7 gap-1 text-center">
                        {weekdayLabels.map((label) => (
                          <span
                            key={label}
                            className="pb-1 text-[11px] font-semibold uppercase tracking-wide text-bl-muted"
                          >
                            {label}
                          </span>
                        ))}
                        {calendarCells.map((dateKey, index) =>
                          dateKey ? (
                            <button
                              key={dateKey}
                              type="button"
                              disabled={!slotsByDay.has(dateKey)}
                              aria-pressed={selectedDay === dateKey}
                              aria-label={`${formatDayHeading(dateKey)}${
                                slotsByDay.has(dateKey) ? "" : " — no times"
                              }`}
                              onClick={() => setSelectedDay(dateKey)}
                              className={
                                selectedDay === dateKey
                                  ? "flex h-10 items-center justify-center rounded-xl bg-bl-teal text-[13.5px] font-semibold text-white"
                                  : slotsByDay.has(dateKey)
                                    ? "flex h-10 items-center justify-center rounded-xl bg-bl-teal-soft text-[13.5px] font-semibold text-bl-teal transition-colors hover:bg-bl-teal hover:text-white"
                                    : "flex h-10 items-center justify-center rounded-xl text-[13.5px] text-bl-muted/60"
                              }
                            >
                              <span aria-hidden>{Number(dateKey.slice(8))}</span>
                              {todayKey === dateKey ? <span className="sr-only">(today)</span> : null}
                            </button>
                          ) : (
                            <span key={`blank-${index}`} aria-hidden />
                          )
                        )}
                      </div>

                      {slotsError ? (
                        <div role="alert" className="mt-5 rounded-xl bg-bl-amber-soft px-4 py-3 text-[13.5px] text-bl-ink">
                          {slotsError}{" "}
                          <button
                            type="button"
                            onClick={() => setReloadCount((count) => count + 1)}
                            className="font-semibold text-bl-teal underline-offset-2 hover:underline"
                          >
                            Retry
                          </button>
                        </div>
                      ) : null}
                      {!slotsError && !slotsLoading && slotsByDay.size === 0 ? (
                        <p className="mt-5 text-[13.5px] leading-relaxed text-bl-ink-soft">
                          No times are open this month. Try the next month, or email{" "}
                          <a className="font-medium text-bl-teal" href={`mailto:${site.email}`}>
                            {site.email}
                          </a>
                          .
                        </p>
                      ) : null}
                    </div>

                    <div className="mt-7 md:mt-0" aria-busy={slotsLoading}>
                      <h3 className="text-[13.5px] font-semibold text-bl-ink">
                        {selectedDay ? formatDayHeading(selectedDay) : "Pick a date"}
                      </h3>
                      <div className="mt-3 grid max-h-[356px] gap-2 overflow-y-auto pr-1">
                        {slotsLoading ? (
                          <p className="text-[13.5px] text-bl-muted">Loading times…</p>
                        ) : (
                          (slotsByDay.get(selectedDay ?? "") ?? []).map((iso) => (
                            <button
                              key={iso}
                              type="button"
                              onClick={() => {
                                setSelectedSlot(iso);
                                setSubmitError(null);
                                setStep("details");
                              }}
                              className="rounded-xl border border-bl-line-2 px-4 py-2.5 text-[14px] font-semibold text-bl-teal transition-colors hover:border-bl-teal hover:bg-bl-teal hover:text-white"
                            >
                              {timeZone ? formatTime(iso, timeZone) : ""}
                            </button>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-7 sm:p-8">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitError(null);
                        setStep("pick");
                      }}
                      className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-bl-teal hover:text-bl-teal-hover"
                    >
                      <ArrowLeft size={15} aria-hidden />
                      Change time
                    </button>
                    <h2 className="mt-4 text-[20px] font-medium tracking-tight text-bl-ink">
                      Confirm your {eventType.name.toLowerCase()}
                    </h2>
                    {selectedSlot && timeZone ? (
                      <p className="mt-2 rounded-xl bg-bl-teal-soft px-4 py-3 text-[14px] font-medium text-bl-teal">
                        {formatSlotSummary(
                          selectedSlot,
                          new Date(
                            new Date(selectedSlot).getTime() + eventType.durationMinutes * 60_000
                          ).toISOString(),
                          timeZone
                        )}{" "}
                        ({timeZone.replaceAll("_", " ")})
                      </p>
                    ) : null}

                    <form
                      className="mt-6 grid max-w-[480px] gap-4"
                      onSubmit={(event) => {
                        event.preventDefault();
                        void submitBooking(new FormData(event.currentTarget));
                      }}
                    >
                      <label className="grid gap-1.5">
                        <span className="text-[13.5px] font-medium text-bl-ink">Your name</span>
                        <input
                          name="name"
                          required
                          maxLength={120}
                          autoComplete="name"
                          className="rounded-xl border border-bl-line-2 bg-bl-surface px-4 py-2.5 text-[14.5px] text-bl-ink"
                        />
                      </label>
                      <label className="grid gap-1.5">
                        <span className="text-[13.5px] font-medium text-bl-ink">Email address</span>
                        <input
                          name="email"
                          type="email"
                          required
                          maxLength={254}
                          autoComplete="email"
                          className="rounded-xl border border-bl-line-2 bg-bl-surface px-4 py-2.5 text-[14.5px] text-bl-ink"
                        />
                        <span className="text-[12.5px] text-bl-muted">
                          The confirmation and video link go here.
                        </span>
                      </label>
                      <label className="grid gap-1.5">
                        <span className="text-[13.5px] font-medium text-bl-ink">
                          Anything worth knowing beforehand?{" "}
                          <span className="font-normal text-bl-muted">(optional)</span>
                        </span>
                        <textarea
                          name="notes"
                          rows={3}
                          maxLength={2000}
                          className="rounded-xl border border-bl-line-2 bg-bl-surface px-4 py-2.5 text-[14.5px] text-bl-ink"
                        />
                      </label>

                      {submitError ? (
                        <p role="alert" className="rounded-xl bg-bl-amber-soft px-4 py-3 text-[13.5px] text-bl-ink">
                          {submitError}
                        </p>
                      ) : null}

                      <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-bl-teal px-6 py-3 text-[14.5px] font-medium text-white shadow-[0_10px_26px_-12px_rgba(14,122,99,0.65)] transition-colors hover:bg-bl-teal-hover disabled:cursor-wait disabled:opacity-60"
                      >
                        {submitting ? "Booking…" : "Confirm booking"}
                      </button>
                      <p className="text-[12.5px] leading-relaxed text-bl-muted">
                        Your details are used only to arrange this call: no
                        marketing lists, no sharing.
                      </p>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </BloomShell>
  );
}

function ConfirmationPanel({
  eventType,
  confirmation,
  timeZone,
}: {
  eventType: EventType;
  confirmation: Confirmation;
  timeZone: string;
}) {
  const icsHref = `data:text/calendar;charset=utf-8,${encodeURIComponent(confirmation.ics)}`;
  const rescheduleMailto = `mailto:${site.email}?subject=${encodeURIComponent(
    `Reschedule booking ${confirmation.reference}`
  )}`;

  return (
    <div className="p-8 text-center sm:p-12">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-bl-teal-soft text-bl-teal">
        <CheckCircle2 size={28} aria-hidden />
      </span>
      <h1 className="mt-5 text-[26px] font-medium tracking-tight text-bl-ink">
        You&rsquo;re booked in
      </h1>
      <p className="mx-auto mt-3 max-w-[460px] text-[15px] leading-relaxed text-bl-ink-soft">
        {eventType.name} · {formatSlotSummary(confirmation.startIso, confirmation.endIso, timeZone)}{" "}
        ({timeZone.replaceAll("_", " ")})
      </p>
      <p className="mt-2 text-[14px] text-bl-ink-soft">
        Booking reference{" "}
        <span className="font-semibold tracking-wide text-bl-ink">{confirmation.reference}</span>
      </p>
      <p className="mx-auto mt-4 max-w-[460px] text-[14px] leading-relaxed text-bl-ink-soft">
        A confirmation with the video link is on its way to{" "}
        <span className="font-medium text-bl-ink">{confirmation.email}</span>. Need to move it?
        Reply to that email or{" "}
        <a className="font-medium text-bl-teal hover:text-bl-teal-hover" href={rescheduleMailto}>
          email {site.founder.split(" ")[0]}
        </a>{" "}
        quoting the reference.
      </p>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <a
          href={icsHref}
          download={`flutterly-${confirmation.reference}.ics`}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-bl-teal px-6 py-3 text-[14.5px] font-medium text-white shadow-[0_10px_26px_-12px_rgba(14,122,99,0.65)] transition-colors hover:bg-bl-teal-hover"
        >
          <CalendarPlus size={16} aria-hidden />
          Add to calendar (.ics)
        </a>
        <a
          href={googleCalendarUrl(eventType, confirmation)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-bl-line-2 bg-bl-surface px-6 py-3 text-[14.5px] font-medium text-bl-ink transition-colors hover:border-bl-teal hover:text-bl-teal"
        >
          Add to Google Calendar
        </a>
      </div>
      <p className="mt-8 text-[13.5px]">
        <Link href="/" className="font-medium text-bl-teal hover:text-bl-teal-hover">
          Back to the site
        </Link>
      </p>
    </div>
  );
}
