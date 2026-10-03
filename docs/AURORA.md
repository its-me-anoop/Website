# Design Language — "Aurora", Ember edition

The marketing site (home, GP practices, care homes, packages, Clear Path,
free audit, audit report, booking, accessibility statement) runs Aurora
in its Ember edition: a warm near-black canvas for the opening, the
studio and the close; warm paper for everything a practice manager reads
carefully (sample sites, who it is for, the comparison, the process and
the prices); heavy grotesque display type with serif italic emphasis; and
one amber action colour. The palette stays deliberately warm (black,
ember, amber, paper) and avoids the blue, purple and neon of most
generated sites.

Ember replaced the shader-lit first edition in 2026-10: the live WebGL
aurora, embers, glass, pointer spotlights, conic rims and 3D tilts are
gone. What remains is solid surfaces, hairlines, one breathing ember
glow, and real device frames around every sample-site capture. The
audience (NHS-literate, risk-averse practice managers) reads long
sections on paper, not over a shader.

Everything is scoped to `.aurora-root` (see `Shell`), so no token leaks
into `/projects/*` or `/demo/*`.

## Tokens (`src/app/globals.css`)

Night (the default inside `.aurora-root`):

| Token | Value | Use |
|---|---|---|
| `--a-void` | `#0b0907` | Page canvas (warm black) |
| `--a-night` | `#120e0b` | Alternate bands |
| `--a-deep` | `#1b1510` | Solid raised surfaces |
| `--a-ink` | `#f8f1e7` | Primary text (≈18:1 on void) |
| `--a-ink-soft` | `#cbbfae` | Secondary text (≈11:1) |
| `--a-muted` | `#9c8f7e` | Captions (≈6.2:1) |
| `--a-line` / `--a-line-2` | warm white 10% / 18% | Hairlines |
| `--a-amber` | `#ffb020` | **The only action colour**, always a fill. Void text on it ≈11:1 |
| `--a-gold` | `#ffc24a` | Small labels and check marks on night |
| `--a-pass` `--a-warn` `--a-fail` | | Audit statuses, each ≥ 4.5:1 on void |
| `--a-grad` | pale gold → amber → orange → ember | Emphasis text, the scroll progress bar |

Paper, used by sections that carry `.a-paper` or `.a-paper-2`:

| Token | Value | Use |
|---|---|---|
| `--a-paper` / `--a-paper-2` | `#f6f1e8` / `#ece5d8` | Reading canvas and its alternate band |
| `--a-paper-raised` | `#fbf8f2` | Cards on paper |
| `--a-paper-ink` | `#17140f` | Primary text (≈16:1) |
| `--a-paper-ink-soft` | `#3d3730` | Body (≈10:1) |
| `--a-paper-muted` | `#5f574c` | Captions (≈6:1) |
| `--a-paper-line` / `-2` | ink 12% / 24% | Hairlines |
| `--a-ember-deep` | `#b4421a` | Emphasis and marks on paper (≈5:1 as text) |

The paper scope works by remapping: `.a-paper` redefines `--a-ink`,
`--a-ink-soft`, `--a-muted`, `--a-line`, `--a-deep`, `--a-gold` and
`--a-grad` to their paper values, so every component built on
`text-a-ink`, `border-a-line`, `bg-a-deep` and the display `<em>` reads
correctly on paper without knowing where it is. Amber is never remapped:
on paper it stays a fill with void text. `.a-on-ink` does the reverse
for an ink card inside a paper section (the featured package, the
comparison column, the "something else" card).

Tailwind utilities are generated as `bg-a-*`, `text-a-*`, `border-a-*`.

## Type

- **Display**: Bricolage Grotesque (variable, weight ~640, `opsz` 96),
  tracking −0.045em, line-height 0.96 — `.a-display`.
- **Emphasis**: `<em>` inside a display heading switches to Instrument
  Serif italic (the only Instrument face loaded), amber on night and
  deep ember on paper.
- **Body**: Geist. **Labels**: Geist Mono, uppercase, tracked
  (`.a-eyebrow` adds a pulsing amber dot; ember, still, on paper).

All four are self-hosted woff2 (SIL OFL) in `src/fonts/`.

## Surfaces

- `.a-card` — the one card: raised surface (`--a-deep`), hairline,
  20px-ish radius. Links and buttons that are cards lift 4px on hover;
  `.a-card-hover` opts a static card into the same lift.
- `.a-glass` — kept for the nav and its menu sheet (a dense warm fill
  with a backdrop blur on night); inside `.a-paper` it is a plain
  raised card.
- No left-border accents, no gradient washes, no glow behind cards.

## Devices (`ui/DeviceFrame.tsx`)

Every sample-site capture sits in a drawn device, never a browser box.

- `IPhoneFrame` — titanium-style rim, Dynamic Island, side buttons and
  an iOS-style status bar (9:41, signal, Wi-Fi, battery) drawn above the
  capture, all scaled from one `width`. The screen is a 390×844 box, so
  the captures in `public/demos/*-mobile.webp` are never cropped;
  `iphoneHeight(width)` gives the frame's height. `float` adds the
  gentle 7s drift.
- `IMacFrame` — thin silver bezel with a camera dot, blank chin, neck
  and foot. The screen takes the capture's own aspect ratio (default
  1440×1000; pass `width`/`height` for others).

Both are plain CSS: no 3D context, no blur, no per-frame work. One
`<figure role="img">` carries the description and the screenshot inside
is decorative; an empty `alt` makes the whole device decorative
(`effects/ios-safety.test.tsx` and `ui/DeviceFrame.test.tsx` guard this).

## Motion (`src/components/aurora/effects/`)

| Effect | Where | Notes |
|---|---|---|
| Ember glow (`EmberGlow`, `.a-glow`) | Home hero, page heroes, closing band | One static radial of ember that breathes over 9s. Transform and opacity only, so it stays on the compositor |
| Word reveal (`SplitWords`) | Every h1 | Pure CSS, final state in SSR HTML |
| Rise (`.a-fade-up`, `Reveal`) | Above-the-fold copy, every section below | Transform plus a partial fade; never a filter |
| Process rail (`.a-rail-fill`) | Home | The ember line fills from the left when the section is in view; steps rise after it |
| Lift | Buttons, cards, work rows | 2–4px translate on hover, arrows nudge forward, nav links underline |
| Magnetic buttons (`Magnetic`) | Primary CTAs | Fine pointers only |
| Marquee (`Marquee`) | Home ticker | Copy row is `aria-hidden`; pauses on hover/focus |
| Showcase tabs | Home | Keyed remount so the new sample animates in; the picker row and the tabs share one state |
| Scroll progress | `Shell` | Decorative, `aria-hidden` |

### Performance rules

- No canvases. Nothing runs per frame; every animation is a CSS
  animation or a Framer Motion transition on transform and opacity.
- Entrances never start at `opacity: 0` for hero text (`.a-fade-up`,
  hero words): text that fades in on the compositor is never counted as
  LCP. Sections below the fold use `Reveal`.
- No infinite repaint animations (no film grain, no panning gradients,
  no rotating conic rims).
- iOS Safari layer budget: nothing animates `filter`, no `blur()` on
  large boxes, no 3D context anywhere. `effects/ios-safety.test.tsx`
  guards all of this.
- `prefers-reduced-motion` stops the glow, the float, the marquee and
  the rail, and shows every entrance in its end state.

Social card: `public/og-aurora.png` (1200×630).

`useMotionAllowed()` reads `prefers-reduced-motion` through
`useSyncExternalStore` with a `false` server snapshot, so SSR and
hydration always agree and motion arms right after hydration.

## iPhone Duo (foldable)

Follows Apple's HIG "Designing for iPhone Duo", translated to the web
(Safari exposes no fold or reserved-region API, only a resize):

- Resize, don't rearrange: the same content and controls on the folded
  outer screen (~466×678) and the open inner screen (~626×890 / 890×626),
  with small layout steps between them.
- Reserved side regions (side toolbar, corner camera) show the page
  background, so Aurora pages are dark underneath and set theme-color
  `#0b0907` to match.
- Even column counts where a repeating grid spans the fold (the report's
  facts go 2 → 6, not 3). Three-item rows stay one row of three.
- `test:browser` and `test:contrast` run every route at all three Duo
  sizes and fold/unfold the home page mid-visit.

## Accessibility

- One `<h1>` per page; the word reveal keeps a single plain accessible name.
- Sample-site showcase follows the WAI-ARIA tabs pattern (arrows,
  Home/End, roving tabindex, `aria-controls`/`aria-labelledby`).
- Hero text sits on the solid night canvas with only the ember glow
  behind it. `npm run test:contrast` hides the glyphs, samples the
  pixels actually painted behind every hero, page-hero and CTA text
  run, and checks WCAG AA against them; CI runs it.
- Reduced motion: every animation is removed and all content is visible.
- `npm run test:a11y` (axe, WCAG 2.2 A/AA) and `npm run test:browser`
  cover every route.

## Printed audit report

The PDF (`audit/print/PrintReport.tsx`) is a paper document, so it keeps
the light bone-and-coal palette (`--k-*` tokens, Zodiak and Switzer) via
`audit/print/print-parts.tsx`. On screen the report is Aurora.
