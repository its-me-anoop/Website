# Design System — "Porcelain"

The visual language of the **case-study pages** (`/projects/*`): a
**light, Apple-inspired, whitespace-first** system. This is the
reference for building product sub-pages so they stay coherent. The
homepage runs its own dark language — see ["Aurora"](./AURORA.md).

> TL;DR — white canvas with `#f5f5f7` bands, a disciplined ink ramp, hairline
> rules, **one** Apple-blue accent, soft diffuse shadows, SF-style system
> typography, and calm scroll-driven motion. Whitespace is the main design
> material; colour is the garnish.

---

## 1. Principles

1. **Whitespace first.** Sections breathe with `--space-section`
   (`clamp(6rem, 13vw, 13rem)`) vertical padding and content capped at
   `--measure` (1200px). When in doubt, remove an element rather than add one.
2. **One accent.** Apple blue `--accent` marks the single most important
   action or word in a view. Supporting hues (indigo/teal/orange/pink/green)
   only tint data and product tiles.
3. **Bands, not borders.** Sections alternate `bg-canvas` (white) and
   `bg-canvas-2` (#f5f5f7) instead of stacking hairline dividers. One
   full-bleed black `bg-night` band (the contact finale) supplies drama.
4. **Motion is a finish, not a feature.** Blur-in entrances, scroll-scrubbed
   product imagery, calm springs. Every animation has a
   `prefers-reduced-motion` path.
5. **Type does the heavy lifting.** The native SF-style system stack at large
   sizes with tight tracking — zero webfont payload, instant render.

---

## 2. Tokens

All tokens live in `src/app/globals.css` under `:root` and are exposed to
Tailwind v4 via the `@theme inline` block. Use the Tailwind utility, not the
raw variable, in components.

### Canvases & surfaces

| Token | Value | Utility | Use |
|---|---|---|---|
| `--canvas` | `#ffffff` | `bg-canvas` | Page / white bands |
| `--canvas-2` | `#f5f5f7` | `bg-canvas-2` | Alternating grey bands |
| `--surface` | `#ffffff` | `bg-surface` | Cards |
| `--surface-2` | `#f5f5f7` | `bg-surface-2` | Nested chips / inputs |
| `--night` | `#000000` | `bg-night` | Full-bleed dark finale |
| `--night-ink` | `#f5f5f7` | `text-night-ink` | Text on night |

### Ink (text ramp)

| Token | Utility | Use |
|---|---|---|
| `--ink` `#1d1d1f` | `text-ink` | Primary text / headings |
| `--ink-2` `#424245` | `text-ink-2` | Secondary |
| `--ink-3` `#6e6e73` | `text-ink-3` | Body on light |
| `--muted` `#86868b` | `text-muted` | Captions / labels |
| `--faint` `#d2d2d7` | `text-faint` | Disabled / hairline fills |

### Hairlines

`--line` / `--line-2` / `--line-3` → `border-line`, `border-line-2`,
`border-line-3` (black at 8% / 12% / 18%). Default card edge is `border-line`.

### Accent

| Token | Utility | Use |
|---|---|---|
| `--accent` `#0071e3` | `bg-accent` / `text-accent` | Primary CTA, emphasis word |
| `--accent-hover` | `bg-accent-hover` | Hover of an accent fill |
| `--accent-ink` `#ffffff` | `text-accent-ink` | Text **on** an accent fill |
| `--accent-soft` | `bg-accent-soft` | Tinted ghost-hover wash |

### Supporting hues

`--indigo #5e5ce6`, `--teal #30b0c7`, `--orange #ff9500`, `--pink #ff375f`,
`--green #34c759` → `text-teal`, `bg-orange`, … Use for data viz, status dots,
and per-project tile tints — never for CTAs.

### Radii, elevation, spacing, motion

- Radii: `--r-xs…--r-xl` (8→32px) via `rounded-[var(--r-lg)]` etc.
- Shadows: diffuse and soft — `--shadow-sm`, `--shadow`, `--shadow-lg`,
  `--shadow-accent`. Never harsh.
- Spacing: `--space-section`, `--gutter`, `--measure`.
- Easing: `--ease-out-expo`, `--ease-out-quint`, `--ease-in-out`,
  `--ease-spring`. In framer-motion use the cubic array `[0.16, 1, 0.3, 1]`.

### Product themes

`.sipli-theme` (aqua on pale blue) and `.artling-theme` (orange on warm cream)
re-map the semantic tokens for the case-study pages. Wrap the page root in the
class and the same token utilities render in that product's palette.

---

## 3. Typography

- **All text** uses the native system stack (`-apple-system, BlinkMacSystemFont,
  "SF Pro Display/Text", Segoe UI, Inter, …`) — the most Apple-feeling result
  on Apple hardware and zero font payload everywhere.
- Headings: weight 600, tracking `-0.028em`, `text-wrap: balance`.
- Display sizes are fluid: `text-[clamp(34px,5vw,64px)]` for section titles;
  up to `clamp(44px,8vw,108px)` for the hero and finale.
- `font-mono` (SF Mono stack) is reserved for eyebrows, labels and metadata.

---

## 4. Primitives (`src/components/ui/`)

| Component | Purpose | Notes |
|---|---|---|
| `Button` | CTA / actions | `variant`: `primary \| dark \| outline \| ghost`; `size`: `sm \| md \| lg`. Calm spring tap + 1px hover lift. |
| `SectionHeader` | Section intro | `eyebrow`, `title` (wrap a word in `<em>` for accent tint), `lede`, `headingId`, `dot`, `align`. |
| `LiftCard` | Surface card | White, hairline edge, soft shadow lift on hover, whisper of 3D tilt; render-prop `{ px, py }` motion values for parallax art. |
| `Reveal` | Scroll entrance | `direction`, `delay`, `blur`, `as`. Plus `staggerContainer` / `staggerItem` variants for lists. |
| `Marquee` | Infinite ticker | Duplicates children for a seamless loop; `duration`, `reverse`. |
| `PhoneFrame` | Device bezel | CSS-only 9:19.5 phone for product demos. |

All interactive primitives honour `prefers-reduced-motion`.

---

## 5. Motion & transitions

- **Route transitions:** `src/app/template.tsx` re-mounts per navigation and
  gives each page a soft blur-and-rise entrance.
- **Scroll-scrub:** the hero phone uses `useScroll` + `useTransform` to scale
  from 92% → 100% and settle as it enters the viewport — the signature
  Apple-product-page move. Reuse this pattern for large imagery.
- **Section entrances:** `Reveal` / `whileInView` with `once: true` and a
  `-12% 0px` margin.
- **Micro-interactions:** spring physics for taps, `layoutId` shared elements
  for the nav underline and hero tab pill.

---

## 6. Accessibility checklist

- One `<h1>` per page; sections labelled via `aria-labelledby` → `headingId`.
- Decorative layers are `aria-hidden`.
- Focus-visible rings use the accent at a 3px offset.
- Skip-to-content link in the root layout.
- All motion has a reduced-motion fallback.
- Colour pairings meet WCAG AA: ink on white, white on accent, white on night.

---

## 7. Adding a new section (recipe)

```tsx
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export function Example() {
  return (
    <section
      id="example"
      className="relative bg-canvas-2 px-[var(--gutter)] py-[var(--space-section)]"
      aria-labelledby="example-heading"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <SectionHeader
          eyebrow="Label"
          headingId="example-heading"
          title={<>A clear headline, <em>with emphasis.</em></>}
          lede="One supporting sentence."
        />
        <Reveal>{/* content */}</Reveal>
      </div>
    </section>
  );
}
```
