"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CalendarClock, Copy, LockKeyhole, Plus, Trash2 } from "lucide-react";
import { BloomShell } from "@/components/bloom/BloomShell";
import { getEventType } from "../core/config";
import type { AvailabilityRules, WeeklyWindow } from "../core/types";

const dayNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

type AdminAvailability = {
  rules: AvailabilityRules;
  source: "file" | "env" | "default";
  bookingOpen: boolean;
  envJson: string;
};

type AdminBooking = {
  reference: string;
  eventTypeId: string;
  eventTypeName: string;
  startIso: string;
  endIso: string;
  name: string;
  email: string;
  notes: string;
  status: string;
};

const tokenStorageKey = "flutterly.booking.adminToken";

/**
 * /book/manage — the owner's availability platform. Sign in with
 * BOOKING_ADMIN_TOKEN, then add or remove weekly windows, pause booking
 * entirely, and see upcoming bookings. Saving writes the rules store
 * and shows the JSON to mirror into hosting env for durability.
 */
export function ManagePage() {
  const [token, setToken] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  const [data, setData] = useState<AdminAvailability | null>(null);
  const [windows, setWindows] = useState<WeeklyWindow[]>([]);
  const [minNoticeHours, setMinNoticeHours] = useState(18);
  const [horizonDays, setHorizonDays] = useState(60);
  const [bufferMinutes, setBufferMinutes] = useState(15);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [bookings, setBookings] = useState<AdminBooking[] | null>(null);

  const [newDay, setNewDay] = useState(1);
  const [newStart, setNewStart] = useState("09:30");
  const [newEnd, setNewEnd] = useState("12:30");
  const [copied, setCopied] = useState(false);

  const applyRules = useCallback((payload: AdminAvailability) => {
    setData(payload);
    setWindows([...payload.rules.weeklyWindows]);
    setMinNoticeHours(payload.rules.minNoticeHours);
    setHorizonDays(payload.rules.horizonDays);
    setBufferMinutes(payload.rules.bufferMinutes);
    setDirty(false);
  }, []);

  const loadDashboard = useCallback(
    async (candidate: string): Promise<boolean> => {
      const headers = { authorization: `Bearer ${candidate}` };
      const response = await fetch("/api/booking/admin/availability", { headers });
      if (response.status === 503) {
        setAuthError(
          "Admin access is not configured on this deployment: set BOOKING_ADMIN_TOKEN in the hosting environment first."
        );
        return false;
      }
      if (!response.ok) {
        setAuthError("That token was not accepted.");
        return false;
      }
      applyRules((await response.json()) as AdminAvailability);
      const diary = await fetch("/api/booking/bookings", { headers });
      if (diary.ok) {
        const payload = (await diary.json()) as { bookings: AdminBooking[] };
        setBookings(
          payload.bookings.filter(
            (booking) =>
              booking.status === "confirmed" && Date.parse(booking.startIso) > Date.now()
          )
        );
      }
      return true;
    },
    [applyRules]
  );

  // Resume a previous session's token quietly.
  useEffect(() => {
    const stored = sessionStorage.getItem(tokenStorageKey);
    if (!stored) return;
    setToken(stored);
    void loadDashboard(stored).then((ok) => {
      if (ok) setSignedIn(true);
      else sessionStorage.removeItem(tokenStorageKey);
    });
  }, [loadDashboard]);

  async function signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setChecking(true);
    setAuthError(null);
    try {
      const ok = await loadDashboard(token);
      if (ok) {
        sessionStorage.setItem(tokenStorageKey, token);
        setSignedIn(true);
      }
    } catch {
      setAuthError("The dashboard could not be loaded. Check your connection and try again.");
    } finally {
      setChecking(false);
    }
  }

  async function save(nextWindows: WeeklyWindow[]) {
    setSaving(true);
    setNotice(null);
    try {
      const response = await fetch("/api/booking/admin/availability", {
        method: "PUT",
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          timeZone: data?.rules.timeZone ?? "Europe/London",
          weeklyWindows: nextWindows,
          minNoticeHours,
          horizonDays,
          bufferMinutes,
        }),
      });
      const payload = (await response.json().catch(() => null)) as
        | (AdminAvailability & { error?: string })
        | null;
      if (!response.ok || !payload?.rules) {
        setNotice(payload?.error ?? "The rules could not be saved.");
        return;
      }
      applyRules(payload);
      setNotice(
        payload.bookingOpen
          ? "Saved. Booking is open with the windows below."
          : "Saved. Booking is paused: no windows, so clients see no times."
      );
    } catch {
      setNotice("The rules could not be saved. Check your connection and try again.");
    } finally {
      setSaving(false);
    }
  }

  function addWindow() {
    if (newStart >= newEnd) {
      setNotice("A window must start before it ends.");
      return;
    }
    const next = [...windows, { day: newDay, start: newStart, end: newEnd }].sort(
      (a, b) => a.day - b.day || a.start.localeCompare(b.start)
    );
    setWindows(next);
    setDirty(true);
    setNotice(null);
  }

  function removeWindow(index: number) {
    setWindows(windows.filter((_, i) => i !== index));
    setDirty(true);
  }

  const sourceLabel = useMemo(() => {
    switch (data?.source) {
      case "file":
        return "saved rules file";
      case "env":
        return "BOOKING_AVAILABILITY_JSON environment variable";
      default:
        return "built-in default (closed)";
    }
  }, [data?.source]);

  return (
    <BloomShell>
      <section className="relative overflow-hidden">
        <div aria-hidden className="bl-grid absolute inset-0" />
        <div className="relative mx-auto w-full max-w-[880px] px-5 pb-20 pt-10 sm:px-8 sm:pt-14">
          <Link
            href="/book"
            className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-bl-teal hover:text-bl-teal-hover"
          >
            <ArrowLeft size={15} aria-hidden />
            Booking page
          </Link>

          {!signedIn ? (
            <div className="bl-card mx-auto mt-6 max-w-[440px] rounded-[26px] border border-bl-line bg-bl-surface p-8">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-bl-teal-soft text-bl-teal">
                <LockKeyhole size={20} aria-hidden />
              </span>
              <h1 className="mt-4 text-[22px] font-medium tracking-tight text-bl-ink">
                Manage bookings
              </h1>
              <p className="mt-2 text-[14px] leading-relaxed text-bl-ink-soft">
                This area is for the site owner. Sign in with the booking admin
                token to set availability and see upcoming calls.
              </p>
              <form onSubmit={signIn} className="mt-5 grid gap-3">
                <label className="grid gap-1.5">
                  <span className="text-[13.5px] font-medium text-bl-ink">Admin token</span>
                  <input
                    type="password"
                    value={token}
                    onChange={(event) => setToken(event.target.value)}
                    required
                    autoComplete="current-password"
                    className="rounded-xl border border-bl-line-2 bg-bl-surface px-4 py-2.5 text-[14.5px] text-bl-ink"
                  />
                </label>
                {authError ? (
                  <p role="alert" className="rounded-xl bg-bl-amber-soft px-4 py-3 text-[13.5px] text-bl-ink">
                    {authError}
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={checking}
                  className="rounded-full bg-bl-teal px-6 py-3 text-[14.5px] font-medium text-white transition-colors hover:bg-bl-teal-hover disabled:cursor-wait disabled:opacity-60"
                >
                  {checking ? "Checking…" : "Sign in"}
                </button>
              </form>
            </div>
          ) : (
            <div className="mt-6 grid gap-5">
              <div className="bl-card rounded-[26px] border border-bl-line bg-bl-surface p-7 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h1 className="text-[24px] font-medium tracking-tight text-bl-ink">
                    Availability
                  </h1>
                  <span
                    className={
                      data?.bookingOpen
                        ? "rounded-full bg-bl-teal-soft px-3.5 py-1.5 text-[13px] font-semibold text-bl-teal"
                        : "rounded-full bg-bl-amber-soft px-3.5 py-1.5 text-[13px] font-semibold text-bl-ink"
                    }
                  >
                    {data?.bookingOpen ? "Booking is open" : "Booking is paused"}
                  </span>
                </div>
                <p className="mt-2 text-[13.5px] leading-relaxed text-bl-muted">
                  Current rules come from the {sourceLabel}. Clients only see
                  times inside the weekly windows below; with none, nobody can
                  book.
                </p>

                {windows.length ? (
                  <ul className="mt-5 divide-y divide-bl-line rounded-2xl border border-bl-line">
                    {windows.map((window, index) => (
                      <li
                        key={`${window.day}-${window.start}-${window.end}`}
                        className="flex items-center justify-between gap-3 px-4 py-3"
                      >
                        <span className="text-[14.5px] text-bl-ink">
                          <span className="font-medium">{dayNames[window.day - 1]}</span>{" "}
                          {window.start}–{window.end}{" "}
                          <span className="text-bl-muted">({data?.rules.timeZone} time)</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => removeWindow(index)}
                          className="inline-flex items-center gap-1.5 rounded-full border border-bl-line-2 px-3 py-1.5 text-[12.5px] font-semibold text-bl-ink transition-colors hover:border-bl-teal hover:text-bl-teal"
                        >
                          <Trash2 size={13} aria-hidden />
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-5 rounded-2xl bg-bl-band px-4 py-3 text-[14px] text-bl-ink-soft">
                    No weekly windows. The booking pages show &ldquo;booking is
                    paused&rdquo; until you add one and save.
                  </p>
                )}

                <div className="mt-5 flex flex-wrap items-end gap-3">
                  <label className="grid gap-1.5">
                    <span className="text-[12.5px] font-medium text-bl-muted">Day</span>
                    {/* The wrapping label's text would otherwise include every
                        option, so name the control explicitly. */}
                    <select
                      aria-label="Day"
                      value={newDay}
                      onChange={(event) => setNewDay(Number(event.target.value))}
                      className="rounded-xl border border-bl-line-2 bg-bl-surface px-3 py-2 text-[14px] text-bl-ink"
                    >
                      {dayNames.map((name, index) => (
                        <option key={name} value={index + 1}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="grid gap-1.5">
                    <span className="text-[12.5px] font-medium text-bl-muted">From</span>
                    <input
                      type="time"
                      value={newStart}
                      onChange={(event) => setNewStart(event.target.value)}
                      className="rounded-xl border border-bl-line-2 bg-bl-surface px-3 py-2 text-[14px] text-bl-ink"
                    />
                  </label>
                  <label className="grid gap-1.5">
                    <span className="text-[12.5px] font-medium text-bl-muted">To</span>
                    <input
                      type="time"
                      value={newEnd}
                      onChange={(event) => setNewEnd(event.target.value)}
                      className="rounded-xl border border-bl-line-2 bg-bl-surface px-3 py-2 text-[14px] text-bl-ink"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={addWindow}
                    className="inline-flex items-center gap-1.5 rounded-full border border-bl-line-2 px-4 py-2.5 text-[13.5px] font-semibold text-bl-ink transition-colors hover:border-bl-teal hover:text-bl-teal"
                  >
                    <Plus size={14} aria-hidden />
                    Add window
                  </button>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <label className="grid gap-1.5">
                    <span className="text-[12.5px] font-medium text-bl-muted">
                      Minimum notice (hours)
                    </span>
                    <input
                      type="number"
                      min={0}
                      max={336}
                      value={minNoticeHours}
                      onChange={(event) => {
                        setMinNoticeHours(Number(event.target.value));
                        setDirty(true);
                      }}
                      className="rounded-xl border border-bl-line-2 bg-bl-surface px-3 py-2 text-[14px] text-bl-ink"
                    />
                  </label>
                  <label className="grid gap-1.5">
                    <span className="text-[12.5px] font-medium text-bl-muted">
                      Horizon (days ahead)
                    </span>
                    <input
                      type="number"
                      min={1}
                      max={365}
                      value={horizonDays}
                      onChange={(event) => {
                        setHorizonDays(Number(event.target.value));
                        setDirty(true);
                      }}
                      className="rounded-xl border border-bl-line-2 bg-bl-surface px-3 py-2 text-[14px] text-bl-ink"
                    />
                  </label>
                  <label className="grid gap-1.5">
                    <span className="text-[12.5px] font-medium text-bl-muted">
                      Buffer between calls (min)
                    </span>
                    <input
                      type="number"
                      min={0}
                      max={120}
                      value={bufferMinutes}
                      onChange={(event) => {
                        setBufferMinutes(Number(event.target.value));
                        setDirty(true);
                      }}
                      className="rounded-xl border border-bl-line-2 bg-bl-surface px-3 py-2 text-[14px] text-bl-ink"
                    />
                  </label>
                </div>

                {notice ? (
                  <p role="status" className="mt-5 rounded-xl bg-bl-band px-4 py-3 text-[13.5px] text-bl-ink">
                    {notice}
                  </p>
                ) : null}

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    disabled={saving || (!dirty && windows.length === data?.rules.weeklyWindows.length)}
                    onClick={() => void save(windows)}
                    className="rounded-full bg-bl-teal px-6 py-3 text-[14.5px] font-medium text-white transition-colors hover:bg-bl-teal-hover disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {saving ? "Saving…" : "Save availability"}
                  </button>
                  <button
                    type="button"
                    disabled={saving || windows.length === 0}
                    onClick={() => {
                      setWindows([]);
                      void save([]);
                    }}
                    className="rounded-full border border-bl-line-2 px-6 py-3 text-[14.5px] font-medium text-bl-ink transition-colors hover:border-bl-teal hover:text-bl-teal disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Pause all booking
                  </button>
                </div>
              </div>

              <div className="bl-card rounded-[26px] border border-bl-line bg-bl-surface p-7 sm:p-8">
                <h2 className="text-[17px] font-medium tracking-tight text-bl-ink">
                  Keep rules durable on serverless hosting
                </h2>
                <p className="mt-2 text-[13.5px] leading-relaxed text-bl-muted">
                  On Vercel the saved rules file does not survive instance
                  recycling. After saving, copy this value into the
                  <code className="mx-1 rounded bg-bl-band px-1.5 py-0.5 text-[12.5px]">BOOKING_AVAILABILITY_JSON</code>
                  environment variable so the rules always load.
                </p>
                <div className="mt-4 flex items-start gap-2">
                  <textarea
                    readOnly
                    value={data?.envJson ?? ""}
                    rows={3}
                    aria-label="Availability rules JSON for the hosting environment"
                    className="w-full rounded-xl border border-bl-line-2 bg-bl-band px-3 py-2 font-mono text-[12px] text-bl-ink"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      void navigator.clipboard?.writeText(data?.envJson ?? "").then(() => {
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      });
                    }}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-bl-line-2 px-4 py-2.5 text-[13px] font-semibold text-bl-ink transition-colors hover:border-bl-teal hover:text-bl-teal"
                  >
                    <Copy size={13} aria-hidden />
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>

              <div className="bl-card rounded-[26px] border border-bl-line bg-bl-surface p-7 sm:p-8">
                <h2 className="flex items-center gap-2 text-[17px] font-medium tracking-tight text-bl-ink">
                  <CalendarClock size={18} aria-hidden className="text-bl-teal" />
                  Upcoming bookings
                </h2>
                {bookings === null ? (
                  <p className="mt-3 text-[13.5px] text-bl-muted">
                    The diary could not be loaded from this instance.
                  </p>
                ) : bookings.length === 0 ? (
                  <p className="mt-3 text-[13.5px] text-bl-muted">
                    Nothing booked. New bookings also reach you via the
                    notification webhook, which is the durable record on
                    serverless hosting.
                  </p>
                ) : (
                  <ul className="mt-4 divide-y divide-bl-line rounded-2xl border border-bl-line">
                    {bookings.map((booking) => (
                      <li key={booking.reference} className="grid gap-1 px-4 py-3">
                        <span className="text-[14.5px] font-medium text-bl-ink">
                          {new Date(booking.startIso).toLocaleString("en-GB", {
                            timeZone: data?.rules.timeZone ?? "Europe/London",
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          · {getEventType(booking.eventTypeId)?.name ?? booking.eventTypeName}
                        </span>
                        <span className="text-[13.5px] text-bl-ink-soft">
                          {booking.name} · {booking.email} · {booking.reference}
                        </span>
                        {booking.notes ? (
                          <span className="text-[13px] text-bl-muted">{booking.notes}</span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </BloomShell>
  );
}
