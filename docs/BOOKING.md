# Appointment Booking

A cal.com-style scheduling system so clients book consultations directly
at `/book`, without email back-and-forth. Dependency-free: availability
maths and calendar files are hand-rolled on Intl, storage is a JSON
file, and the UI is plain Bloom components.

## Client journey

1. **`/book`** — choose a call type: intro call (15 min), consultation
   (30 min) or project scoping (60 min). All free video calls.
2. **`/book/[eventType]`** — a month calendar shows days with open
   slots; times render in the visitor's own timezone (switchable). Pick
   a slot, add name/email/notes, confirm.
3. **Confirmation** — instant booking reference, an `.ics` download, a
   Google Calendar link, and a note that joining details follow by
   email. Rescheduling is a reply quoting the reference.

## Architecture

```
src/features/booking/
├── core/               # Pure, fully unit-tested domain logic
│   ├── types.ts        # EventType, Booking, AvailabilityConfig …
│   ├── config.ts       # The three event types + working hours
│   ├── time.ts         # DST-safe wall-time ↔ UTC conversion (Intl only)
│   ├── availability.ts # Slot engine: windows, notice, horizon, buffers
│   ├── ics.ts          # RFC 5545 calendar files (escaping, folding)
│   └── reference.ts    # Phone-friendly booking references (FL-XXXXXXXX)
├── server/
│   ├── store.ts        # JSON-file persistence behind a write lock
│   ├── bookings.ts     # Validation + race-safe createBooking()
│   └── notify.ts       # Optional owner webhook on each booking
└── ui/
    ├── BookingLanding.tsx  # /book event-type cards
    └── Scheduler.tsx       # Calendar, slots, form, confirmation

src/app/api/booking/
├── availability/route.ts   # GET slots for a window (≤ 45 days)
└── bookings/route.ts       # POST create · GET admin list
```

Availability rules live in `core/config.ts`: Mon–Fri, 09:30–12:30 and
14:00–17:30 Europe/London, 18 hours minimum notice, 60-day horizon,
15-minute buffer around existing bookings. Slots step by the event's
own duration. All times cross the wire as UTC instants; the client
groups and formats them in the visitor's timezone, so GMT/BST and
overseas clients are handled by construction (see `core/time.test.ts`
for the DST cases).

Double-booking is prevented at write time: the availability check runs
inside the store's serialised critical section, and the API answers
`409` so the UI can refresh and explain.

## Configuration (all optional)

| Env var | Purpose |
|---|---|
| `BOOKING_STORE_FILE` | Store path (default `.data/bookings.json`, gitignored). Point at a persistent volume in hosting that has one. |
| `BOOKING_NOTIFY_WEBHOOK` | URL POSTed on each new booking (`kind: booking.created`) — e.g. a Zapier/Make hook that emails or Slacks the owner. Failures log and never block the client. |
| `BOOKING_ADMIN_TOKEN` | Enables `GET /api/booking/bookings` with `Authorization: Bearer <token>` for reading the diary. Unset ⇒ endpoint answers 503. |

On serverless hosting without a mounted volume the JSON store is
per-instance and ephemeral — set `BOOKING_NOTIFY_WEBHOOK` so every
booking reaches the owner's inbox regardless, or point
`BOOKING_STORE_FILE` at a volume. The store interface is one module
(`server/store.ts`) so a database can replace it without touching the
domain logic.

## Honesty notes

- The confirmation promises joining details "by email": that email is
  the owner's follow-up (triggered via the webhook), not an automated
  mailer — there is deliberately no SMTP dependency in the site.
- No cookies, no trackers: the scheduler keeps state in React only,
  matching the site's consent posture.
