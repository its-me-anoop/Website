# Design Language — "Aurora"

The marketing site (home, GP practices, care homes, packages, Clear Path,
free audit, audit report, booking, accessibility statement) runs Aurora:
a warm near-black canvas lit by a live WebGL shader of slow, molten
light with embers rising through it, glass surfaces, heavy grotesque
display type with amber-lit serif italics, and one amber action colour.
The palette is deliberately warm (black, ember, orange, amber, gold) and
avoids the blue, purple and neon of most generated sites. It replaced the earlier "Kiln" language. Case-study pages keep
Porcelain and the demo sites keep their own scopes.

Everything is scoped to `.aurora-root` (see `Shell`), so no token leaks
into `/projects/*` or `/demo/*`.

## Tokens (`src/app/globals.css`)

| Token | Value | Use |
|---|---|---|
| `--a-void` | `#0b0907` | Page canvas (warm black) |
| `--a-night` | `#120e0b` | Alternate bands |
| `--a-deep` | `#1b1510` | Solid raised surfaces |
| `--a-ink` | `#f8f1e7` | Primary text (≈18:1 on void) |
| `--a-ink-soft` | `#cbbfae` | Secondary text (≈11:1) |
| `--a-muted` | `#9c8f7e` | Captions (≈6.2:1) |
| `--a-line` / `--a-line-2` | warm white 10% / 18% | Hairlines |
| `--a-amber` | `#ffb020` | **The only action colour.** Void text on it ≈11:1 |
| `--a-ember` `--a-orange` `--a-gold` `--a-red` | | Warm hues, decoration only |
| `--a-pass` `--a-warn` `--a-fail` | | Audit statuses, each ≥ 4.5:1 on void |
| `--a-grad` | pale gold → amber → orange → ember | Emphasis text, rims, progress |

Tailwind utilities are generated as `bg-a-*`, `text-a-*`, `border-a-*`.

## Type

- **Display**: Bricolage Grotesque (variable, weight ~640, `opsz` 96),
  tracking −0.045em, line-height 0.96 — `.a-display`.
- **Emphasis**: `<em>` inside a display heading switches to Instrument
  Serif italic (the only Instrument face loaded) filled with `--a-grad`.
- **Body**: Geist. **Labels**: Geist Mono, uppercase, tracked
  (`.a-eyebrow` adds a glowing amber dot).

All four are self-hosted woff2 (SIL OFL) in `src/fonts/`.

## Surfaces

- `.a-glass` — translucent fill, hairline border, top highlight,
  backdrop blur (solid under `prefers-reduced-transparency`).
- `.a-spot` — a radial glow and gradient rim follow the pointer. One
  delegated listener (`SpotlightTracker`) writes `--mx`/`--my`.
- `.a-conic` — a rotating conic-gradient rim for the single featured
  card on a page. It spins only on hover or focus: an infinite rotation
  repaints every frame and costs mobile main-thread time for nothing.
  A card takes `.a-spot` **or** `.a-conic`, never both (both use
  `::before`/`::after`).

## Effects (`src/components/aurora/effects/`)

| Effect | Where | Notes |
|---|---|---|
| Molten shader (`AuroraCanvas` + `aurora-gl.ts`) | Home hero, page heroes, closing band | Domain-warped fbm in ember → orange → amber → gold, drifting upwards like heat, bent by the pointer, rendered at ~½ resolution, paused off-screen and in hidden tabs, one still frame for reduced motion |
| Embers (`Embers` + `embers.ts`) | Same places | Additive 2D sparks that rise, sway and burn out; count scales with area (max 60); off for reduced motion |
| CSS blobs (`.a-blobs`) | Heroes, CTA band | Fallback when WebGL is unavailable; fades out once the shader has drawn (`[data-shader="ready"]`) |
| Page curtain (`app/template.tsx`) | Every in-app navigation | A dark then an amber panel lift away to reveal the next page; never on first load, off for reduced motion |
| Wipe reveal (`WipeReveal`) | Portrait, sector sample frame, showcase tab changes | The image uncovers upwards with a small settle in scale |
| Word reveal (`SplitWords`) | Every h1 | Pure CSS, final state in SSR HTML |
| Scroll tilt (`ScrollTilt`) | Showreel, sector hero | A raked 3D plane that stands up as it enters |
| Pointer tilt (`Tilt`) | Showcase, portrait, sample frames | Fine pointers only |
| Magnetic buttons (`Magnetic`) | Primary CTAs | Fine pointers only |
| Pinned horizontal work (`Work`) | Home | ≥1024px with motion; otherwise a grid. Focus scrolls the card into view |
| Process rail (`Process`) | Home | Gradient line fills with scroll |
| Marquee (`Marquee`) | Home ticker | Copy row is `aria-hidden`; pauses on hover/focus |
| 3D phone (`ui/Phone3D`) | Showcase, sector sample frame | CSS 3D: stacked body slabs for depth, warm metal rim, sliding glare. Swings round with scroll and leans to a fine pointer; a fixed angle for reduced motion. Screens are real 390×844 captures of the demos (`public/demos/*-mobile.webp`) |
| Cursor light, scroll progress | `Shell` | Decorative, `aria-hidden` |

### Performance rules

- Canvases start late: `whenIdle()` (`effects/schedule.ts`) waits for
  `load` plus an idle period, so the shader and embers never compete
  with first paint or hydration.
- Small or touch screens draw at 30fps (`targetFps` + `frameGate`), the
  shader at 0.35 scale and embers at DPR ≤ 1.5. Embers stamp
  pre-rendered sprites instead of building gradients per frame.
- The shader is skipped on software WebGL (SwiftShader, llvmpipe:
  `isSoftwareRenderer`); the CSS blobs remain. `?shader=force` overrides
  this for screenshots.
- Entrances never start at `opacity: 0` (hero words, `.a-fade-up`, the
  route wrapper): text that fades in on the compositor is never counted
  as LCP. They move and un-blur instead.
- No infinite repaint animations (no film grain, no panning gradients).
- `WipeReveal` observes an outer element and clips an inner one: an
  IntersectionObserver on a fully clipped element never fires.
- `BrowserFrame` contains its URL bar's inline size, so a long URL
  cannot widen a grid column past the viewport. `test:browser` fails on
  any `<figure>` wider than the viewport.

Social card: `public/og-aurora.png` (1200×630), rendered from the real
shader, logo and display type.

`useMotionAllowed()` reads `prefers-reduced-motion` through
`useSyncExternalStore` with a `false` server snapshot, so SSR and
hydration always agree and motion arms right after hydration.

## Accessibility

- One `<h1>` per page; the word reveal keeps a single plain accessible name.
- Sample-site showcase follows the WAI-ARIA tabs pattern (arrows,
  Home/End, roving tabindex, `aria-controls`/`aria-labelledby`).
- A scrim sits behind hero copy so text stays above 4.5:1 over the
  brightest aurora curtains.
- Reduced motion: every animation is removed and all content is visible.
- `npm run test:a11y` (axe, WCAG 2.2 A/AA) and `npm run test:browser`
  cover every route.

## Printed audit report

The PDF (`audit/print/PrintReport.tsx`) is a paper document, so it keeps
the light bone-and-coal palette (`--k-*` tokens, Zodiak and Switzer) via
`audit/print/print-parts.tsx`. On screen the report is Aurora.
