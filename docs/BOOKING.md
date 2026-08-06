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

Double-booking is prevented at write time wherever processes share one
store: the availability check runs inside a serialised critical section
guarded both in-process (promise queue) and across processes (an
advisory `.lock` file created with `O_CREAT|O_EXCL`, stale after 10s),
and the API answers `409` so the UI can refresh and explain. Abuse is
rate-limited per client (sliding window) with a cap on upcoming
bookings per email address.

**The honest serverless caveat:** on default Vercel, lambda instances
do not share a filesystem, so no file lock can coordinate them — two
simultaneous instances could, rarely, both accept the same slot, and a
recycled instance forgets stored bookings. For a single consultant's
diary this is a small, visible risk (both parties are emailed via the
webhook), not a silent one — but the store file must not be treated as
the system of record there. Configure `BOOKING_NOTIFY_WEBHOOK` so every
booking reaches the owner's inbox immediately; the upgrade path is a
durable shared backend (e.g. Vercel KV/Upstash Redis or Postgres) behind
`server/store.ts`, which is deliberately the single persistence seam.

## Configuration (all optional)

| Env var | Purpose |
|---|---|
| `BOOKING_STORE_FILE` | Store path (default `.data/bookings.json` locally, `/tmp/flutterly-bookings.json` on Vercel where the lambda filesystem is read-only elsewhere). Point at a persistent volume in hosting that has one. |
| `BOOKING_NOTIFY_WEBHOOK` | URL POSTed on each new booking (`kind: booking.created`) — e.g. a Zapier/Make hook that emails or Slacks the owner. Failures log and never block the client. **Strongly recommended on Vercel**, where it is the durable record of each booking. |
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
