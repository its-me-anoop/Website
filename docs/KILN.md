# Design Language — "Kiln"

The marketing site (home, sector pages, packages, free audit,
accessibility statement) runs the **Kiln** language: a two-tone
editorial system with a warm bone canvas, deep coal bands, a serif
display face, and one fired vermilion for actions. It replaced "Bloom"
in September 2026. Case-study pages stay on the "Porcelain" system (see
[DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md)); the five demo sites keep their
own scopes.

The reference point was the Melius marketing site: floating pill
navigation, curved section joins, a prompt-style input as the hero
action, sans-serif body with serif display, and a charcoal/bone palette
with a single hot accent. Kiln borrows the structure and rhythm, not the
content or colours.

## Scope

Everything is scoped under `.kiln-root` (applied by
`src/components/kiln/KilnShell.tsx`). Dark bands add `.on-coal`, which
swaps the focus ring and hairline colours for the coal ramp.

## Type

- **Zodiak** (display, regular + italic) via `--font-zodiak`, applied by
  `.k-display`. Tight leading (0.98), slight negative tracking. `em`
  inside a display heading renders as Zodiak Italic; this is the only
  emphasis device, never colour or gradients.
- **Switzer** (body, 400/500/600) via `--font-switzer`. Body 15–17.5px,
  line-height 1.55–1.65, measures capped at 60–65ch.
- `.k-eyebrow`: 11px, 600, uppercase, 0.16em tracking. Short labels only.

Both faces are self-hosted woff2 in `src/fonts/` (Fontshare licence) and
loaded with `next/font/local` in `src/app/layout.tsx`.

## Tokens (globals.css)

| Token | Role |
|---|---|
| `--k-bone` `#f3f0ea` | Page canvas |
| `--k-bone-2` `#e9e4db` | Deeper band on bone |
| `--k-paper` `#faf8f4` | Raised surfaces on bone (package cards) |
| `--k-ink` / `--k-ink-soft` / `--k-muted` | Text ramp on bone (≥5:1 throughout) |
| `--k-line` / `--k-line-2` | Hairlines on bone |
| `--k-coal` `#141210` | Dark bands, footer, nav pill, browser frames |
| `--k-coal-2` / `--k-coal-3` | Raised / hover surfaces on coal |
| `--k-coal-ink` / `--k-coal-soft` | Text ramp on coal |
| `--k-coal-line` | Hairlines on coal |
| `--k-fire` `#bf3a15` (+ `-hover`, `-soft`) | The one action colour; bone text on it ≈4.8:1 |
| `--k-fire-lite` `#ff8a5b` | Fire as text or icon on coal |
| `--k-butter` `#f1e27c` (+ `-soft`) | Quiet second highlight: "Free audit" button, tags |

Helpers: `.k-frost` (frosted coal chrome with a reduced-transparency
fallback), `.k-bite-top` / `.k-bite-bottom` / `.k-bite-both` (concave
curved section joins via `clip-path`), `.k-fan` (3D perspective for the
hero strip), `.k-ticker` (masked marquee with a reduced-motion stop),
`.k-dots` (dotted texture on coal), `.k-rule` (hairline).

## Structure

```
src/components/kiln/
├── KilnShell.tsx      # Nav + <main id="main"> + Footer, .kiln-root scope
├── Nav.tsx            # Floating pill (wordmark, inline links, menu) + two actions
├── Footer.tsx         # Coal footer: studio, contact, four link columns
├── CtaBand.tsx        # Closing band: serif statement, audit bar, email
├── primitives.tsx     # EASE, Rise, Eyebrow, Display, SectionHead, BtnLink,
│                      # Tag, CheckItem, FaqList, AuditBar, BrowserFrame
├── data.ts            # Single content model for every Kiln page
├── home/              # Hero, Ticker, Showcase, Personas, Statement, Work,
│                      # Compare, Process, PackagesTeaser, KilnHome
├── sectors/           # SectorPage template (GP practices / care homes)
├── packages/          # PackagesPage
├── audit/             # AuditPage (/free-audit landing), ReportPage (/audit)
│   ├── report/        # ScoreDial, ReportHeader, CategoryList, Priorities,
│   │                  # Pitch, Progress, ErrorState, StatusMark
│   └── print/         # PrintReport: the A4 PDF document, QrBook
└── booking/           # BookPage + CalEmbed (Cal.com discovery call)
```

## Booking

`/book` (`src/app/book/page.tsx` → `booking/BookPage.tsx`) is the
site's "talk to a person" route: eyebrow, serif heading, two short
paragraphs (what the call is, the email alternative), then an inline
Cal.com booker (`booking/CalEmbed.tsx`, built on `@calcom/embed-react`).
The embed is themed light with `cal-brand` set to fire, requests
`month_view` on desktop and lets Cal switch to its own mobile layout;
the container reserves height so the page does not jump, and a plain
`target="_blank"` link to the public Cal.com page sits beneath it in
case the embed is blocked.

The Cal.com details live in one place, `site.booking` in
`src/lib/site.ts` (`calLink` for the embed, `url` for fallback links,
`durationMinutes` for copy). The nav's fire action, the menu sheet's
action, the "Book a 15-minute call" button in every `CtaBand` (hidden
on `/book` itself via `showBooking={false}`) and the footer's Services
column all route to `/book`. Free-audit actions keep pointing at
`/free-audit`.

## Signature moves

- **The audit bar** is the hero action on every page: type a web
  address, press the arrow, and a native GET form lands on `/audit`,
  which runs the instant audit and renders the scored report (see
  [`AUDIT.md`](./AUDIT.md)). Nothing is stored. It reappears in the
  closing band and on the report itself. The written audit is still a
  prefilled `mailto:` (`auditMailto`), now offered as the follow-up from
  the report's next-steps section and from the error state.
- **Cycling audience word** in the hero headline (`RotatingWord`): the
  italic word rotates through `heroAudiences` in `data.ts`, each in its
  own glaze colour (all ≥ 3:1 on bone). The visual copy is `aria-hidden`
  and a static "patients" is read by assistive tech; reduced motion holds
  the static word. From `sm` the headline has fixed lines so the word's
  width never changes the line count.
- **Fanned strip** of seven finished sites in the hero, each a real link
  (`.k-fan`, 3D `rotateY` / `translateZ`, arched live around the viewport
  centre while the track loops; ends dissolve under a mask on `.k-fan`).
- **Ticker** of client names interleaved with plain commitments; the
  duplicated run is `aria-hidden`.
- **Showcase tabs**: an accessible `tablist` of the five demo sites with a
  coal browser frame per panel, plus a flat link list beneath it.
- **Curved joins** (`.k-bite-*`) where bone meets a photograph or coal.
- **Editorial rows, not cards**: features, audit checks and personas use
  hairline-separated rows with oversized serif numerals. Package cards
  are the only true cards, and they sit on coal.
- **Anti-template table**: a real `<table>` with an `sr-only` caption and
  a coal "A Flutterly build" column.
- **Native disclosure FAQs**: `<details>/<summary>`, no JS state.

## Motion & accessibility

- Entrances use the shared `EASE` (`[0.16, 1, 0.3, 1]`) through `Rise`
  and a handful of `m.*` elements; all check `useReducedMotion` and render
  static when it is set. The ticker stops under `prefers-reduced-motion`.
- Only `transform` and `opacity` animate.
- One `<h1>` per page, `#main` skip-link target in `KilnShell`, 2px fire
  focus ring on bone and a butter ring on coal, AA contrast on every
  text/background pair, keyboard-operable menu (Escape closes, focus-out
  closes) and tabs (arrow keys, Home, End).
