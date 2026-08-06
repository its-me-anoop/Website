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
   a slot, add name/email/notes, confirm. When the owner has no
   availability configured — the default — the scheduler shows a clear
   "booking is paused" panel with an email fallback instead.
3. **Confirmation** — instant booking reference, an `.ics` download, a
   Google Calendar link, and a note that joining details follow by
   email. Rescheduling is a reply quoting the reference.

## Owner platform: availability

Booking ships **closed**: there are no built-in working hours, so
nobody can book until the owner opens some. Availability is managed at
**`/book/manage`** (sign in with `BOOKING_ADMIN_TOKEN`):

- add or remove recurring weekly windows (day + start/end, host
  timezone), plus minimum notice, horizon and buffer;
- **Pause all booking** clears every window in one click;
- see upcoming bookings from this instance's diary;
- copy the current rules as JSON for the hosting environment.

Rules resolve in this order: the saved rules file (written by the
platform, immediate effect) → the `BOOKING_AVAILABILITY_JSON` env var →
the closed default. On serverless hosting the file does not survive
instance recycling, so after changing availability paste the JSON the
platform shows into `BOOKING_AVAILABILITY_JSON` to make it durable.

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

Availability is owner-defined data, not code (see the platform section
above); `core/config.ts` holds only the closed default and the shared
numbers (18 hours minimum notice, 60-day horizon, 15-minute buffer —
all editable in the platform). Slots step by the event's own duration
inside each weekly window. All times cross the wire as UTC instants;
the client groups and formats them in the visitor's timezone, so
GMT/BST and overseas clients are handled by construction (see
`core/time.test.ts` for the DST cases).

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
| `BOOKING_ADMIN_TOKEN` | Enables the owner platform at `/book/manage` and the admin APIs (`GET /api/booking/bookings`, `GET/PUT /api/booking/admin/availability`), presented as a bearer token. Unset ⇒ they answer 503. |
| `BOOKING_AVAILABILITY_JSON` | Durable availability rules for serverless hosting; `/book/manage` shows the exact value to paste after saving. |
| `BOOKING_AVAILABILITY_FILE` | Rules-file path override (default `.data/availability.json` locally, `/tmp/flutterly-availability.json` on Vercel). |
| `BOOKING_STORE_FILE` | Store path (default `.data/bookings.json` locally, `/tmp/flutterly-bookings.json` on Vercel where the lambda filesystem is read-only elsewhere). Point at a persistent volume in hosting that has one. |
| `BOOKING_NOTIFY_WEBHOOK` | URL POSTed on each new booking (`kind: booking.created`) — e.g. a Zapier/Make hook that emails or Slacks the owner. Failures log and never block the client. **Strongly recommended on Vercel**, where it is the durable record of each booking. |

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
