# Appointment Booking

Public booking on `/book` uses **Cal.com public links**
(`cal.com/{username}/{event-slug}`). There is no Cal.com API or embed.

Username is `anoop-jose-jtij1j` (`NEXT_PUBLIC_CAL_USERNAME`). Do not
use `flutterly` — `cal.com/flutterly` is a 404.

Verified live events (2026-09-01):

| Site call type | Duration | Cal.com URL |
|---|---|---|
| Intro call | 15 min | https://cal.com/anoop-jose-jtij1j/short-discovery-meeting |
| Consultation | 30 min | https://cal.com/anoop-jose-jtij1j/30-minutes-meeting |
| Project scoping | 60 min | **none** — no Cal event yet; card is not a booking link |

The named Cal event types “Intro”, “Consultation” and “Project scoping”
do not exist. The 30-minute event is titled “Domain transfer meeting”
on Cal.com; it is still the live 30-minute slot. A 60-minute slug must
not be invented — set `NEXT_PUBLIC_CAL_EVENT_SCOPING` only after a real
event exists.

The in-house scheduler remains at `/book/manage` for owner availability.
Deep links `/book/intro-call` and `/book/consultation` redirect to the
matching Cal.com URL. `/book/project-scoping` stays on-site as
not-yet-bookable.

## Client journey

1. **`/book`** — choose a call type. Intro (15 min) and consultation
   (30 min) open the matching Cal.com event. Project scoping (60 min)
   is labelled “not yet bookable online” until a real Cal event exists.
2. **`/book/intro-call`** and **`/book/consultation`** redirect to those
   Cal.com URLs. **`/book/project-scoping`** stays on-site with an email
   fallback.
3. **Confirmation** — Cal.com sends the confirmation, calendar invite
   and reschedule link. Email `anoop@flutterly.co.uk` for the unwired
   60-minute session.

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
| `NEXT_PUBLIC_CAL_USERNAME` | Cal.com username. Default `anoop-jose-jtij1j`. Never `flutterly`. |
| `NEXT_PUBLIC_CAL_ORIGIN` | Origin for public links. Default `https://cal.com`. |
| `NEXT_PUBLIC_CAL_EVENT_INTRO` | 15-min event slug. Default `short-discovery-meeting`. |
| `NEXT_PUBLIC_CAL_EVENT_CONSULTATION` | 30-min event slug. Default `30-minutes-meeting`. |
| `NEXT_PUBLIC_CAL_EVENT_SCOPING` | 60-min event slug. **Unset** — no live event. Set only after one exists. |
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
