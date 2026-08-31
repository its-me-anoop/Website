# Design Language — "Bloom"

The marketing site (home, services, sector pages, packages and audit)
runs the **Bloom** language: a clean, high-trust system for a professional
digital delivery company. It uses a tinted canvas, soft mint bands, deep
pine ink, one teal action colour and restrained route-level motion. Case-study pages stay on the
"Porcelain" system (see [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md)).

## Scope

Everything is scoped under `.bloom-root` (applied by
`src/components/bloom/BloomShell.tsx`), so Bloom tokens and chrome
never leak into Porcelain pages.

## Tokens (globals.css)

| Token | Role |
|---|---|
| `--bl-canvas` | Tinted near-white page background |
| `--bl-band` / `--bl-band-2` | Soft mint section bands |
| `--bl-surface` | Cards |
| `--bl-ink` / `--bl-ink-soft` / `--bl-muted` | Text ramp |
| `--bl-line` / `--bl-line-2` | Hairlines |
| `--bl-pine` / `--bl-pine-2` / `--bl-pine-ink` | Dark bands (process, footer, CTA) |
| `--bl-teal` (+ `-hover`, `-soft`) | The one action colour |
| `--bl-nhs` (+ `-soft`) | GP-practice accent (NHS blue) |
| `--bl-amber` (+ `-soft`) | Care-home accent (warm amber) |

Typography pairs Archivo for display copy with Atkinson Hyperlegible Next
for body copy. Helpers: `.bl-frost` (opaque sticky navigation surface),
`.bl-card` (soft elevation), `.bl-grid` (faint technical grid behind heroes).

## Structure

```
src/components/bloom/
├── BloomShell.tsx     # Nav + <main id="main"> + Footer, .bloom-root scope
├── Nav.tsx            # Sticky nav: service links, project CTA, mobile sheet
├── Footer.tsx         # Pine footer: contact, columns, compliance links
├── CtaBand.tsx        # Closing CTA band (configurable copy per page)
├── primitives.tsx     # EASE, RevealWords, Rise, Eyebrow, SectionHead,
│                      # BtnLink, CheckItem, FaqList
├── data.ts            # Single content model for every Bloom page
├── home/              # Homepage sections (Hero, TrustBar, Suite, Sectors,
│                      # Compare, Audit, Work, Why, Process, About)
├── sectors/           # SectorPage template (GP practices / care homes)
├── services/          # Services hub + reusable service-detail template
├── packages/          # PackagesPage
├── audit/             # AuditPage (free website audit)
└── ../privacy/        # Global consent notice and inline preferences
```

The `/book` landing page now uses Field Notes (`BookScreen`). Scheduler
and manage routes (`/book/[eventType]`, `/book/manage`) still render
inside `BloomShell` — see [BOOKING.md](./BOOKING.md).

## Signature moves

- **Company positioning first**: the hero names Flutterly Limited as a
  digital delivery company, then makes GP practices and care homes clear
  as specialisms within a broader commercial service offer.
- **Joined-up services**: websites, products, business email, social
  campaigns and ongoing support share one information architecture.
- **Sector accents**: NHS blue for GP content, warm amber for care
  homes; teal remains the only action colour.
- **Delivery-model comparison**: a real `<table>` (with `sr-only`
  caption) contrasts fragmented suppliers with accountable delivery.
- **Free audit**: recurring offer; the audit page requests via a
  prefilled `mailto:` (no backend form).
- **Direct booking**: the nav's primary action is "Book a call" —
  a cal.com-style scheduler at `/book` (see [BOOKING.md](./BOOKING.md)).
- **Native disclosure FAQs**: `<details>/<summary>`, no JS state.
- **Proportionate consent**: the site currently sets no cookies or trackers;
  a non-modal preference panel records the choice in local storage and exposes
  versioned gates for any future optional scripts.

## Motion & accessibility

- Below-fold content is static to keep scrolling stable. Route transitions
  and the mobile menu use short opacity/transform motion with reduced-motion
  fallbacks. The sticky header deliberately avoids backdrop filters.
- One `<h1>` per page, `#main` skip-link target in `BloomShell`,
  visible focus styles (teal), AA contrast on every text/background
  pair, and keyboard-operable menus.
