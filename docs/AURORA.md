# Design Language — "Aurora" (homepage)

The homepage's dark design language: an obsidian canvas under a live
WebGL aurora, glass surfaces, neon accents, and scroll-driven
choreography. It is scoped to the home route by the `.aurora-root`
wrapper (`src/app/page.tsx`); everything under `/projects/*` stays on
[Porcelain](./DESIGN-SYSTEM.md).

> TL;DR — `#05060A` obsidian + `#ECEEF8` frost ink, five neon accents,
> Syne display type with outlined-stroke headline lines, JetBrains Mono
> micro-labels, real `backdrop-blur` glass, and motion that reveals the
> page one beat at a time.

---

## 1. Tokens

Declared in `src/app/globals.css` (`:root` + `@theme inline`).

| Token | Value | Utility | Use |
|---|---|---|---|
| `--obsidian` | `#05060A` | `bg-obsidian` | Page canvas, intro wipe |
| `--frost` | `#ECEEF8` | `text-frost` (+ `/55`, `/40`… opacities) | All ink |
| `--mint` | `#3DF2C4` | `text-mint` | Primary accent, logo asterisk, live dots |
| `--iris` | `#8B7CFF` | `text-iris` | Violet accent (services, Sandbourne) |
| `--candy` | `#FF6FCB` | `text-candy` | Pink accent (process, Artling) |
| `--amber` | `#FFB45C` | `text-amber` | Orange accent (stack, JJ Paper, stars) |
| `--lime` | `#7CE38B` | `text-lime` | Green accent (Greenmead) |

Glass recipe (used by nav, cards, chips): translucent
`rgba(9–16,11–14,10–22,.35–.72)` fill + `backdrop-blur(10–28px)` +
`border-white/10` + `inset 0 1px 0 rgba(255,255,255,.07–.09)` inner
highlight.

## 2. Type

Self-hosted latin variable subsets, loaded in `layout.tsx` via
`next/font/local` and exposed as Tailwind utilities:

| Utility | Family | Role |
|---|---|---|
| `font-syne` | Syne (400–800) | Display headings, uppercase, tight tracking; alternate lines use `.text-outline` / `.text-outline-hero` (transparent fill + `-webkit-text-stroke`) |
| `font-grotesk` | Space Grotesk (300–700) | Body and buttons |
| `font-jb` | JetBrains Mono (100–800) | Micro-labels: 10–12px, uppercase, `.12–.3em` tracking |

## 3. Backdrop

`AuroraBackdrop` renders three fixed, pointer-transparent layers:

1. **WebGL canvas** (z-0) — domain-warped fbm noise at half
   resolution, drifting with the cursor and dimming (`u_dim`) as the
   hero scrolls away. Falls back to a static CSS gradient when WebGL
   is unavailable; renders a single frame under reduced motion.
2. **Vignette** (z-0) — radial darkening toward the edges.
3. **Film grain** (z-2) — SVG `feTurbulence` tile at 5.5% opacity,
   `mix-blend-overlay`.

Content sections sit at z-1, nav at z-50, scroll progress at z-60, the
intro wipe at z-100.

## 4. Motion

All in `src/components/home/`; every effect has a
`prefers-reduced-motion` path (skip or single static frame).

- **`IntroWipe`** — brand overlay, holds 850ms, wipes up over 1s.
- **`Reveal`** — blur-rise scroll reveal (`up | left | right | pop |
  word` kinds, per-element delays). Children render visible on the
  server; a position check on mount/scroll/poll guarantees nothing can
  stay hidden even if IntersectionObserver never fires.
- **`WorkStack`** — five sticky cards; each scales to 94% and dims to
  55% brightness in proportion to how much the next card covers it.
- **`TiltCard`** — pointer-tracked `rotateX/rotateY` perspective tilt.
- **`Counter`** — counts up over 1.5s (cubic ease-out) when visible.
- **`MagneticCta`** — the email pill is pulled toward the cursor
  within a 220px radius.
- **CSS keyframes** (`au-*`) — marquees (both directions), pulse dots,
  mascot float, dashed-ring spin, scroll-hint line.

## 5. Accessibility

- Reduced motion: choreography skipped, content immediately visible
  (verified by `npm run test:browser`).
- One `h1` per page; sections are landmarks with labelled nav.
- Decorative layers are `aria-hidden`; marquee/strip duplicates too.
- `:focus-visible` ring switches to mint inside `.aurora-root`;
  selection colour matches.
- The intro wipe is removed for no-JS visitors via `<noscript>`.
