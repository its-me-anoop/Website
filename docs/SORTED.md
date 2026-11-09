# Design Language — "Sorted"

The marketing site (home, services, GP practices, care homes, packages,
Clear Path, free audit, audit report, booking, accessibility statement,
404) runs Sorted. It takes the studio's line literally: *Your digital
side, sorted.* The page is a desk. Things arrive scattered and settle
into rows; cards have real thickness and turn in 3D; every service has
one colour and keeps it everywhere; an emphasised word wears a label.

Sorted replaced "Aurora" (a warm night canvas, amber, serif italics, a
WebGL shader) in 2026-11. Nothing of Aurora remains: no dark-first
canvas, no gradients, no glass, no glow, no custom cursor, no device
mock-ups.

Everything is scoped to `.s-root` (see `Shell`), or `.s-chrome` for the
bar and footer around a case-study page, so no token leaks into
`/projects/*` or `/demo/*`.

## Palette (`src/app/globals.css`)

Flat colour and hard edges. No gradients anywhere.

| Token | Value | Use |
|---|---|---|
| `--s-chalk` / `--s-chalk-2` | `#f4f3ee` / `#e9e8e0` | The desk: page canvas and inset wells |
| `--s-white` | `#ffffff` | Cards, the audit field |
| `--s-navy` | `#0b1026` | Ink, rules, dark bands (≈17:1 on chalk) |
| `--s-cobalt` | `#2238e8` | The studio's colour: hero, marks, Websites |
| `--s-flame` | `#ff5c1f` | **The action colour**, lifted from the butterfly. Navy text on it ≈6:1; never white text |
| `--s-sun` | `#ffd23a` | SEO, highlights, focus ring |
| `--s-jade` | `#1fb57a` | IT support, "fixed" marks |
| `--s-pink` | `#ff93d1` | Social media |
| `--s-sky` | `#dfe4ff` | The audit bands |

### Tones

A band or card takes one `tone-*` class (`chalk`, `white`, `sky`,
`cobalt`, `navy`, `flame`, `sun`, `jade`, `pink`). The class paints the
background and remaps the semantic tokens every component reads:
`--s-bg`, `--s-raised`, `--s-ink`, `--s-ink-soft`, `--s-muted`,
`--s-line`, `--s-line-2`, `--s-accent` (ticks, numbers, links as text),
`--s-mark` / `--s-mark-ink` (the label behind an emphasised word),
`--s-action` / `--s-action-ink` / `--s-action-edge` (the primary key),
and `--s-pass` / `--s-warn` / `--s-fail`. A component built on
`text-s-ink`, `border-s-line-2` and `.s-key` therefore comes out right
on any tone without knowing where it is. Every pairing is ≥ 4.5:1.

### The colour code

`ui/tones.ts` maps each service to one tone, used for its divider in the
card index, its page hero, its mark in the menu, its tab on a project
and its tiles on the sorting table: Websites cobalt, Apps flame, IT
support jade, Social media pink, SEO sun.

Tailwind utilities are generated as `bg-s-*`, `text-s-*`, `border-s-*`.

## Type

One family: **Archivo** (variable weight and width, SIL OFL,
self-hosted in `src/fonts/`).

- **Display** (`.s-display`): weight 800, width 116%, tracking
  −0.038em, line-height 0.94 (override with `--lh`).
- **Emphasis**: `<em>` inside a display heading is not italic. It is an
  inline block with the tone's mark colour behind it, turned −1.4°: a
  label stuck on a box.
- **Labels** (`.s-label`, `.s-eyebrow`): width 74%, weight 650,
  capitals, tracked. `.s-eyebrow` adds a small flame diamond.
- **Body**: Archivo at normal width, 400–600.

## Surfaces and controls

- **Keys** (`.s-key`): every button is a key with a side. The face sits
  on a solid edge (`--key-depth`), rises 2px on hover and presses down
  on `:active`. Variants: default (the tone's action), `.s-key-plain`
  (white), `.s-key-navy`, `.s-key-outline`. `ButtonLink` wraps them.
- **Cards**: flat fill, a 2px navy rule, 12–16px radius, and a solid
  navy side (`shadow-[0_6px_0_0_var(--s-navy)]`) when they matter.
  Never a soft shadow.
- **Slabs** (`.slab`): a box with real sides. `::after` is the side
  below the face and `::before` the side to its right (`data-edge="left"`
  for the left). They only show when an ancestor turns the slab in 3D.
  Clip inside `.slab-face`, never on the slab itself.
- **Frames** (`ui/Frames.tsx`): `BrowserFrame` and `PhoneFrame` draw a
  flat window or phone around a real capture. One `<figure role="img">`
  carries the description; an empty `alt` makes the frame decorative.
- `.s-dots`: a dotted cutting-mat ground for sections that hold objects.

## 3D scenes

Each scene is a small, bounded box of DOM with its own `perspective`.
There is no canvas and no WebGL.

| Scene | Where | What it does |
|---|---|---|
| **Sorting table** (`home/Hero.tsx`, `.sort-*`) | Home hero | Twelve tiles for the parts of a digital side. They arrive scattered in depth with a problem showing ("Not secure", "Last run: unknown") and drop into rows with it fixed, while "sorted." in the headline sorts its own letters. A switch flips between "as found" and "sorted"; the table leans towards a mouse. Sizes are container units (`cqw`), three across on wide tables and two across (eight tiles) on narrow ones |
| **Card index** (`home/Services.tsx`, `.idx-*`) | Home | Five dividers leaning back in a drawer, each in its service colour with its pillar on a tab. Pointing at or tabbing to one stands it up and opens it. All open on touch screens. CSS only |
| **Turning screens** (`.shot`, `ui/SampleScene.tsx`) | Work, sample sites, sector heroes | A capture on a slab that comes round to face you as it scrolls in (CSS scroll timeline) and squares up under the pointer |
| **Exploded page** (`ui/XRay.tsx`, `.xray-*`) | Home audit section, `/free-audit`, `/audit` | One web page pulled apart into the seven sheets the audit reads. The sheets separate as the stack scrolls into view; pointing at an area in the list lifts its sheet |
| **Slab stack** (`ui/SlabStack.tsx`, `.stack-*`) | Inner-page heroes, 404 | Slabs in the service colours drop into a neat pile and breathe |
| **Staff pass** (`home/Studio.tsx`) | Home | The founder's portrait on a badge that hangs from a lanyard, sways, and leans towards the pointer (`Tilt`) |
| **Flaps** (`Reveal`, `SplitWords`, `.route-flaps`) | Everywhere | Sections tip up on a top hinge as they scroll in; headline words turn up one at a time; between pages five flaps in the service colours cover the new page and turn away like a departure board |

### Rules that keep it fast and safe

- **The first paint is the finished layout.** The hero's arrival is a
  CSS animation with only a `from` keyframe (`data-intro`), so it plays
  without JavaScript, never delays the headline and always ends on the
  server-rendered layout. Hero text never starts at `opacity: 0`.
- Transform and opacity only. No animated `filter`, no `blur()`, no
  backdrop blur, no canvas (`effects/scene-safety.test.tsx` guards this).
- `Reveal` and `Tilt` use the element's own `transformPerspective`, so
  no ancestor becomes a 3D context. The page shell is never one.
- Opacity below 1 flattens a `preserve-3d` element, so scenes never fade
  a slab that needs its sides.
- Scroll-linked motion sits behind `@supports (animation-timeline:
  view())`; other browsers show the finished state.
- Pointer-following (the table, `Tilt`) runs only with a fine pointer.
- `prefers-reduced-motion` stops every scene and shows every entrance in
  its end state; the switch still works, instantly.
- Component classes in `globals.css` are unlayered, so they beat
  Tailwind utilities. `.s-key`'s `display` alone sits in
  `@layer components` so `hidden` / `lg:hidden` still apply; other
  overrides go through custom properties (`--lh`, `--key-depth`,
  `--key-radius`, `--card-radius`).

## Layout

- **Bar** (`layout/Nav.tsx`): a solid chalk bar, 64px, with a navy rule.
  Routes are condensed labels; a flame marker slides under the current
  one. Below `lg` a menu key opens a sheet where each route is a
  coloured divider that flaps down, followed by the five services.
  `Shell` pads `<main>` by the bar's height.
- **Page hero** (`layout/PageHero.tsx`): words left, a 3D scene right
  (`art`), on any tone. Service pages take their service's tone.
- **Closing band** (`layout/CtaBand.tsx`): cobalt, with the audit bar
  and the booking key on a white card.
- **Footer**: navy; the name spelled out in nine keys.

Social cards (1200×630): `public/og-flutterly.png` is the default and
`public/og-healthcare.png` stays on the GP, care-home and Clear Path
pages; `node scripts/og-card.mjs` renders both.

## iPhone Duo (foldable)

Follows Apple's HIG "Designing for iPhone Duo", translated to the web
(Safari exposes no fold or reserved-region API, only a resize):

- Resize, don't rearrange: the same content and controls on the folded
  outer screen (~466×678) and the open inner screen (~626×890 / 890×626).
- Reserved side regions show the page background, so Sorted pages paint
  `html` chalk and set theme-color `#f4f3ee` to match the bar.
- Even column counts where a repeating grid spans the fold.
- `test:browser` and `test:contrast` run every route at all three Duo
  sizes and fold/unfold the home page mid-visit.

## Accessibility

- One `<h1>` per page. The home headline carries an `aria-label`, so the
  letter-by-letter "sorted." reads as one sentence.
- The sorting table is a single `role="img"` with a description; the
  switch is a real `role="switch"`. Every other scene is `aria-hidden`.
- Focus: a navy outline inside a sun ring, visible on every tone.
- Sample-site showcase follows the WAI-ARIA tabs pattern.
- `npm run test:contrast` hides the glyphs, samples the pixels actually
  painted behind every hero and closing-band text run (sorted and
  scattered) and checks WCAG AA against them; CI runs it.
- `npm run test:a11y` (axe, WCAG 2.2 A/AA) and `npm run test:browser`
  cover every route.

## Printed audit report

The PDF (`audit/print/PrintReport.tsx`) is a paper document with its own
`--k-*` ramp in the same palette (chalk sheets, navy bands, cobalt
marks, sun highlights) and the same Archivo.
