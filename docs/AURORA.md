# Design Language — "Aurora"

Every Flutterly-branded route — the homepage, the two sector pages,
packages, the free audit, the accessibility statement, the case
studies and the privacy policies — runs **Aurora**: a deep
midnight-pine canvas lit by slow-drifting aurora gradients, glass
surfaces with hairline gradient edges, film grain, and one bright teal
action colour.

The two sample client sites under `/demo/*` deliberately do **not**
use it. They exist to show a prospective practice manager or care-home
owner a finished site of their own, so each keeps its own scope and
palette (see [DESIGN.md](../DESIGN.md)).

## Scope

Everything is scoped under `.aurora-root`, applied by
`src/components/aurora/Shell.tsx`, so Aurora tokens never leak into the
demo sites.

## The one continuous backdrop

`AuroraBackdrop` is mounted **once**, `fixed`, at the shell level.
Sections are transparent and scroll *through* the light rather than
each carrying its own background. Five decorative layers, all
`aria-hidden` and pointer-transparent:

1. a vertical wash, darkest at the fold
2. two blurred aurora fields drifting on long, offset loops
3. an engineering grid, radially masked to a whisper
4. a horizon glow anchoring the bottom of the viewport
5. film grain, blended soft-light, to kill gradient banding

> **Gotcha worth keeping:** any ancestor with a `filter` other than
> `none` becomes the containing block for `position: fixed`
> descendants. Framer Motion leaves the final `filter: blur(0px)` on
> anything that animates a blur, which silently un-fixes this backdrop
> and the scroll-progress bar. `app/template.tsx` therefore animates
> opacity and offset only — never a filter.

## Tokens (globals.css)

| Token | Role |
|---|---|
| `--au-void` `#03070a` | Behind everything (overscroll, scrollbars) |
| `--au-canvas` `#060d11` | Page |
| `--au-canvas-2` / `-3` | Raised / pressed panels |
| `--au-surface` … `-3` | Translucent glass fills |
| `--au-line` / `-2` | Hairlines |
| `--au-ink` … `--au-muted` | Text ramp — 16.8:1 down to 5.4:1 on canvas |
| `--au-teal` (+ `-2`, `-deep`, `-ink`) | The one action colour |
| `--au-aqua` / `--au-sky` / `--au-violet` | Gradients, glows and graphics only |
| `--au-nhs` / `--au-care` | Sector accents (GP blue, care amber) |
| `--au-accent` / `-2` | Accent hook — case-study scopes retint through it |
| `--au-day*` | The bright relief panel ramp |

Helpers: `.au-glass` / `.au-glass-strong` (frosted surfaces),
`.au-frost` (the header bar), `.au-day-panel` (bright interlude),
`.au-mesh` / `.au-grid` / `.au-dots` / `.au-horizon` / `.au-grain`
(background graphics), `.au-hairline` (1px gradient edge),
`.au-spot` (pointer spotlight), `.au-grad-text` / `.au-fade-text`,
`.au-mono`.

> **Vendor-prefix order matters.** The CSS minifier drops the standard
> `backdrop-filter` when it *follows* the `-webkit-` form, leaving a
> declaration modern Chromium ignores. Prefix first, standard last.

## Structure

```
src/components/
├── fx/                  # The effects kit — see below
└── aurora/
    ├── Shell.tsx        # Backdrop + progress + Nav + <main id="main"> + Footer
    ├── Nav.tsx          # Floating glass bar, sliding hover pill, mobile sheet
    ├── Footer.tsx       # Contact, site map, oversized wordmark
    ├── CtaBand.tsx      # Beam-lit closing call to action
    ├── LegalPage.tsx    # Long-form document layout (+ PolicySection, Bullet)
    ├── primitives.tsx   # Btn, SectionHead, CheckItem, Pill, FaqList, Section
    ├── data.ts          # Single content model for every marketing page
    ├── home/            # Hero, TrustBand, Suite, Sectors, Compare, Audit,
    │                    # Work, Why, Process, About
    ├── sectors/         # SectorPage template (GP practices / care homes)
    ├── packages/        # PackagesPage
    └── audit/           # AuditPage (free website audit)
```

## The effects kit (`src/components/fx`)

| Piece | What it does |
|---|---|
| `AuroraBackdrop` | The shared five-layer field described above |
| `ParticleField` | Canvas constellation in the hero; count scales with area, DPR capped at 2, loop suspends off-screen or on a hidden tab |
| `Reveal` / `TextReveal` / `Stagger` | Blur-and-rise entrances; `TextReveal` resolves a heading word by word |
| `GlassCard` / `BeamCard` | The workhorse surface, and the rotating conic beam reserved for one featured item per page |
| `Tilt` / `Magnetic` / `Parallax` | Pointer tilt with `translateZ` depth, magnetic buttons, scroll-linked drift |
| `CountUp` | Stat counter; values that do not open with digits render verbatim |
| `Marquee` | Seamless band; the duplicated half is `aria-hidden` |
| `ScrollProgress` | Aurora hairline that fills as the page scrolls |

A `background-clip: text` fill never reaches glyphs inside a
transformed descendant, so `TextReveal` puts the tone class on the
*animated* word span — not on a wrapper around it.

## Signature moves

- **Specialist positioning first** — the hero leads with GP practices
  and care homes, honest capability stats (commitments, not invented
  numbers) and layered glass browser frames of live client work.
- **One bright interlude per page** — the densest content (the
  anti-template comparison table, what every build includes) sits on an
  `.au-day-panel`, because dense content reads better on paper.
- **Sector accents** — NHS blue for GP content, warm amber for care
  homes; teal stays the only action colour.
- **Case studies retint, they don't diverge** — Sipli (aqua) and
  Artling (amber) set `--au-accent` and remap the semantic tokens their
  markup already uses, so one block retints a whole page.
- **Native disclosure FAQs** — `<details>/<summary>`, no JS state.

## Motion & accessibility

- Every decorative layer is `aria-hidden` and `pointer-events-none`.
- `prefers-reduced-motion` removes entrances, parallax, tilt, magnetism
  and the marquee, and drops the particle field entirely — content
  renders complete and still.
- `prefers-reduced-transparency` swaps every frosted surface for a
  solid panel.
- Text/background pairs clear WCAG 2.2 AA on both the dark canvas and
  the bright panels; the focus ring flips to the deep brand teal inside
  `.au-day-panel` so it keeps 3:1 there.
- One `<h1>` per page, `#main` skip-link target in `Shell`, real
  `<table>` semantics with a screen-reader caption, and the
  horizontally scrollable table is a focusable, labelled region.
