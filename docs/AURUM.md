# Design Language — "Aurum"

Every Flutterly-branded route — the homepage, the two sector pages,
packages, the free audit, the accessibility statement, the case
studies and the privacy policies — runs **Aurum**: a warm cream paper
canvas under soft amber washes, cocoa ink, plates that sit on the page
like pressed card, Bricolage Grotesque over Figtree, and one
three-colour rule — **teal → amber → rose** — drawn at the seams
between sections.

The two sample client sites under `/demo/*` deliberately do **not**
use it. They exist to show a prospective practice manager or care-home
owner a finished site of their own, so each keeps its own scope and
palette (see [DESIGN.md](../DESIGN.md)).

## Scope

Everything is scoped under `.aurum-root`, applied by
`src/components/aurum/Shell.tsx`, so Aurum tokens never leak into the
demo sites.

## The page is light; two bands invert it

The fold and the process interlude are **night bands**: cocoa grounds
that break the cream. They invert by *re-declaring the same tokens*
rather than by forking the component vocabulary — drop `.au-night` on
a section and every plate, hairline and ink step inside it flips,
because each one already reads the token it always read.

```css
.au-night {
  --au-paper: var(--au-night);    /* the ground */
  --au-ink: #fffaf0;              /* the ink ramp inverts */
  --au-line: rgba(245, 230, 215, 0.16);
  --au-teal: var(--au-teal-lift); /* the teal that survives cocoa */
  …
}
```

One set of components, two atmospheres, no variant props.

Two values are deliberately **exempt** from the flip: `--au-cream` and
`--au-cocoa`. A cream button has to stay cream wherever it is dropped —
that is the whole point of it on a night band.

## The shared ground

`PaperField` is mounted **once**, `fixed`, at the shell level. Sections
are transparent and scroll *through* the light; the night bands are
opaque, so they simply cover it. Four decorative layers, all
`aria-hidden` and pointer-transparent:

1. the cream base, warmest at the top of the page
2. two blurred colour washes — amber high-left, rose and teal below —
   drifting on long, offset loops
3. an engineering grid, radially masked to a whisper
4. paper tooth, blended multiply, to kill gradient banding

> **Gotcha worth keeping:** any ancestor with a `filter` — or a
> `transform` — other than `none` becomes the containing block for
> `position: fixed` descendants, which silently un-fixes this backdrop
> and the scroll-progress rail and anchors them to the document. Framer
> Motion leaves a final `filter: blur(0px)` behind on anything that
> animates a blur, so no entrance animates a filter. The route-change
> keyframe does animate a transform, and therefore carries **no fill
> mode**: the moment it ends the wrapper is untransformed again. Do not
> "tidy" `au-page-in` to `forwards`.

## Tokens (globals.css)

| Token | Role |
|---|---|
| `--au-paper` `#fdf6ec` | The page |
| `--au-paper-2` `#fffaf0` | Plates and cards |
| `--au-paper-3` / `--au-sink` | Inputs / the tinted relief band |
| `--au-night` … `-3` | The cocoa grounds |
| `--au-ink` … `--au-muted` | Text ramp — 17.7:1 down to 5.7:1 on paper |
| `--au-line` / `-2`, `--au-surface` … `-3` | Cocoa hairlines and washes |
| `--au-teal` (+ `-deep`, `-press`, `-lift`, `-ink`) | The action colour |
| `--au-amber` / `--au-rose` (+ `-ink`) | The other two voices of the rule |
| `--au-gold` | Stat numerals on night |
| `--au-cream` / `--au-cocoa` | The two values the night scope never flips |
| `--au-nhs` / `--au-care` (+ `-lift`) | Sector accents (GP blue, care amber) |
| `--au-accent` / `-2` | Accent hook — case-study scopes retint through it |
| `--au-rule` | The three-colour gradient itself |

Helpers: `.au-plate` / `.au-plate-strong` (card stock), `.au-frost`
(the header bar), `.au-band` (tinted relief), `.au-night` (the
inversion), `.au-rule-top` / `.au-rule-bottom` / `.au-rule-heavy` /
`.au-tick` (the rule at its four weights), `.au-wash` /
`.au-wash-night` / `.au-grid` / `.au-dots` / `.au-grain` (background
graphics), `.au-lift` / `.au-spot` (hover behaviour), `.au-display` /
`.au-display-hero` / `.au-label` / `.au-fade-text` (type),
`.au-underline` / `.au-sweep` (the two signature interactions), and
`.au-enter` / `.au-lift-in` / `.au-page-in` (the keyframe entrances).

> There was an `.au-grad-text` that painted one phrase per heading with
> a three-stop teal → amber → rose gradient through
> `background-clip: text`. It is gone. Interpolating across three hues
> puts the middle of a phrase in colours the palette does not contain —
> "Honest quotes." ran through olive and rust — and the gradient
> restarted per segment, so a two-phrase headline jumped from magenta
> back to teal mid-sentence. Emphasis is `tone: "accent"` and weight.
> `.au-fade-text` stays: it is a single-hue fade to transparent on the
> decorative 22%-opacity footer wordmark, not colour on reading text.

> **Vendor-prefix order matters.** The CSS minifier drops the standard
> `backdrop-filter` when it *follows* the `-webkit-` form, leaving a
> declaration modern Chromium ignores. Prefix first, standard last.

## Type

Two faces, no third.

- **Bricolage Grotesque** for display, shipped with its optical-size
  axis and pinned by `.au-display` to `opsz 96` — the cut drawn for
  headlines, where the joins tighten and the apertures close up. Below
  that it relaxes into a text face. `.au-display-hero` adds weight
  (700) and a tighter fit for the fold and the closing line.
- **Figtree** for everything else, including `.au-label`: 11px,
  uppercase, `0.28em` tracking, tabular numerals. The letterspacing is
  what makes it read as a label rather than as shouting.

Bricolage does the job a display serif was doing before it: it sets
tight enough that "No templates. No plugins. No excuses." holds one
line where a neutral grotesque wraps, and it has enough character in
the `g` and the `W` to carry a page that is otherwise very quiet.

## Structure

```
src/components/
├── fx/                  # The effects kit — see below
└── aurum/
    ├── Shell.tsx        # Ground + progress + Nav + <main id="main"> + Footer
    ├── Nav.tsx          # Solid cream bar, growing underlines, mobile sheet
    ├── Footer.tsx       # Night band: contact, site map, oversized wordmark
    ├── CtaBand.tsx      # Closing call to action, ruled top and bottom
    ├── LegalPage.tsx    # Long-form document layout (+ PolicySection, Bullet)
    ├── primitives.tsx   # Btn, TextLink, SectionHead, CheckItem, Pill,
    │                    # FaqList, Section, Band
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
| `PaperField` | The shared four-layer ground described above |
| `MacBook` / `IMac` / `Phone` | Device frames, drawn entirely in CSS |
| `ParticleField` | Canvas constellation in the fold, in the rule's colours; count scales with area, DPR capped at 2, the rAF loop is cancelled (not just skipped) off-screen or on a hidden tab, and a resize carries the field across rather than reseeding it |
| `Reveal` / `TextReveal` / `Stagger` | Rise-and-clip entrances; `TextReveal` resolves a heading word by word |
| `Plate` / `RuleCard` | The workhorse surface, and the rule-crowned card reserved for one featured item per page |
| `Tilt` / `Magnetic` / `Parallax` | Pointer tilt with `translateZ` depth, magnetic buttons, scroll-linked drift |
| `CountUp` | Stat counter; values that do not open with digits render verbatim |
| `Marquee` | Seamless band; the duplicated half is `aria-hidden` |
| `ScrollProgress` | The three-colour rule, filling as the page scrolls |

### Entrances are CSS, and only ever additive

Two rules, and both are load-bearing.

**A block is only hidden once JavaScript has armed it.** The hidden
start state in `globals.css` requires `[data-armed]`, an attribute
nothing but the effect in `fx/Reveal.tsx` ever writes. There is
therefore no state in which content is hidden and nothing is coming to
reveal it — no JavaScript, a blocked script, a chunk that 404s after a
deploy, a hydration crash: the page simply reads.

**Only what is below the fold at hydration gets armed.** Anything
already on screen is left exactly as served, so the headline, the lede
and the calls to action paint with the HTML and never wait on a bundle.

This is not a style preference. These entrances used to be motion
components, and Framer serialises a component's `initial` state into the
server-rendered HTML: the homepage shipped 60 text-bearing elements at
`opacity: 0`, wrapped in one page-level `<div style="opacity:0">`, and
nothing painted until the async `domMax` chunk had downloaded, parsed
and hydrated. At 400 kbps that was a 10.5 s blank cream screen. FCP is
now 3.3 s, the hero is readable at that moment, and every route renders
in full with JavaScript off.

Three shapes, all transform-and-opacity only — no animated blur, which
is the most expensive thing to composite during a scroll:

| Hook | Used for |
|---|---|
| `[data-au-reveal]` / `[data-au-words]` / `[data-au-stagger]` | Observer-driven. Armed with `data-armed`, revealed with `data-in`. |
| `.au-enter` / `.au-page-in` | Plain keyframes on a timer — above-the-fold furniture and the route change. |
| `.au-lift-in` | The same, without the fade. |

Three details worth keeping:

- The entrance is an **`animation`, never a `transition`**. A
  `transition` shorthand on `[data-au-reveal]` outranks the
  `transition-colors` / `transition-shadow` utilities that call sites
  put on the very same element, and their hovers snap instead of easing.
- `.au-lift-in` exists because an element below full opacity is a
  *grouping element*, and a grouping element flattens
  `transform-style: preserve-3d`. Fading the hero's two machines
  collapsed the depth of the screens inside them for the whole
  animation, and the composition popped into perspective as the fade
  ended. They lift without fading.
- The shared observer uses `rootMargin: "100000px 0px -12% 0px"`. The
  bottom −12% is the timing. The enormous top margin is a correctness
  fix: without it, a trackpad flick or a jump to a `#hash` can carry a
  block from below the fold to above it between two frames, the ratio
  goes 0 → 0, no threshold is crossed, the callback never fires at all,
  and that block stays invisible for the rest of the session.


## Signature moves

- **Work is shown on hardware** — a screenshot in a rounded rectangle
  reads as "an image"; the same screenshot inside a laptop reads as "a
  website someone is looking at", which is the claim the page is
  making. The frames are CSS, not mock-up PNGs, so there is no raster
  to ship and the aluminium re-tints (`light` on paper, `dark` on
  night) with whatever ground it lands on. Reserved for the fold and
  the sector pages — a grid of framed cards is noise.
- **The rule at the seams** — teal → amber → rose, 3px between
  sections, 7px at the foot of the fold and the foot of the closing
  call to action, and as a tick under a heading or above a footer
  column.
- **The page rhythm** — night fold → cream → tinted band → cream →
  tinted band → cream → night interlude → cream → warm closing band.
  Two inversions, never adjacent, each sealed by the rule.
- **Per-card light** — a card sets `--au-brand`, and its hover edge,
  shadow bloom and pointer spotlight all take that colour. The three
  crafts, the six work specimens and the two sectors each pick theirs.
- **Underlines that grow from the centre** — a 3px pill under each nav
  link, in that link's own colour.
- **Specialist positioning first** — the fold leads with GP practices
  and care homes, honest capability stats (commitments, not invented
  numbers) and layered glass browser frames of live client work.
- **Case studies retint, they don't diverge** — Sipli (deep water
  teal) and Artling (burnt amber) set `--au-accent` and remap the
  semantic tokens their markup already uses, so one block retints a
  whole case study.
- **Native disclosure FAQs** — `<details>/<summary>`, no JS state.

## Motion & accessibility

- Every decorative layer is `aria-hidden` and `pointer-events-none`.
- `prefers-reduced-motion` removes entrances, parallax, tilt, magnetism
  and the marquee, and drops the particle field entirely — content
  renders complete and still.
- `prefers-reduced-transparency` swaps the frosted header for a solid
  bar.
- Text/background pairs clear WCAG 2.2 AA on cream and cocoa alike, and
  `scripts/contrast-audit.mjs` proves it by walking every rendered text
  node on every route and compositing the colour actually painted
  behind it. Teal at full strength is 3.6:1 on paper — enough for
  icons, borders and large display type, never for body copy, which is
  why `--au-teal-deep` exists and why hover states deepen rather than
  pale.
- One `<h1>` per page, `#main` skip-link target in `Shell`, real
  `<table>` semantics with a screen-reader caption, and the
  horizontally scrollable table is a focusable, labelled region.
