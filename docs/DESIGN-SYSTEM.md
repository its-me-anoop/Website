# Flutterly Design System — "Obsidian Studio"

This document describes the redesigned visual language of the Flutterly site:
its tokens, primitives, motion, and accessibility rules. It is the reference
for building any new page or component so the experience stays coherent.

> TL;DR — a refined, architectural **dark** theme. A disciplined neutral ramp,
> one citron **Signal** accent, generous negative space, and a WebGL shader
> field that carries the colour interest so surfaces stay calm.

---

## 1. Principles

1. **Whitespace first.** Sections breathe with `--space-section`
   (`clamp(5rem, 11vw, 11rem)`) vertical padding. Content is capped at
   `--measure` (1280px). Let the layout rest.
2. **One accent, used sparingly.** Citron `--signal` marks the single most
   important action or word in a view. Everything else is the neutral ramp.
3. **Colour lives in the background.** The animated shader field (and the CSS
   fallback) provides hue; foreground surfaces are near-monochrome with
   hairline borders.
4. **Motion is a finish, not a feature.** Entrances are soft (blur + rise),
   easing is expo/quint. Every animation has a `prefers-reduced-motion` path.
5. **Type does the heavy lifting.** Outfit (display) at large sizes with tight
   tracking; system sans for body.

---

## 2. Tokens

All tokens live in `src/app/globals.css` under `:root` and are exposed to
Tailwind v4 via the `@theme inline` block. Use the Tailwind utility, not the
raw variable, in components.

### Surfaces (obsidian ramp)

| Token | Value | Utility | Use |
|---|---|---|---|
| `--obsidian` | `#0a0a0c` | `bg-obsidian` | Page canvas |
| `--obsidian-2` | `#0d0d11` | `bg-obsidian-2` | Raised canvas |
| `--surface` | `#141418` | `bg-surface` | Cards |
| `--surface-2` | `#1b1b21` | `bg-surface-2` | Nested cards / inputs |
| `--surface-3` | `#232329` | `bg-surface-3` | Hover |

### Ink (text ramp)

| Token | Utility | Use |
|---|---|---|
| `--ink` `#f5f5f6` | `text-ink` | Primary text |
| `--ink-2` `#cbcbd2` | `text-ink-2` | Secondary |
| `--ink-3` `#9a9aa4` | `text-ink-3` | Tertiary / body on dark |
| `--muted` `#71717a` | `text-muted` | Captions / labels |
| `--faint` `#34343c` | `text-faint` | Disabled |

### Hairlines

`--line` / `--line-2` / `--line-3` → `border-line`, `border-line-2`,
`border-line-3` (white at 7% / 11% / 16%). Default card edge is `border-line`.

### Signal (citron accent)

| Token | Utility | Use |
|---|---|---|
| `--signal` `#d4f24c` | `bg-signal` / `text-signal` | Primary CTA, emphasis |
| `--signal-soft` | `bg-signal-soft` | Hover of a signal fill |
| `--signal-deep` | `bg-signal-deep` | Pressed / dense |
| `--signal-ink` `#10120a` | `text-signal-ink` | Text **on** a signal fill |

### Supporting hues (sparingly, for data/section accents)

`--azure` (links/cool), `--aqua` (positive/data), `--coral` (warm/alert),
`--plum` → `text-azure`, `text-aqua`, `text-coral`, `text-plum`.

### Radii, elevation, spacing, motion

- Radii: `--r-xs…--r-xl` → `rounded-xs…rounded-xl`, plus `rounded-[var(--r-lg)]`.
- Shadows: `--shadow`, `--shadow-lg`, `--shadow-signal`.
- Spacing: `--space-section`, `--gutter`, `--measure`.
- Easing: `--ease-out-expo`, `--ease-out-quint`, `--ease-in-out`,
  `--ease-spring`. In framer-motion use the cubic array `[0.16, 1, 0.3, 1]`.

### Product themes

`.sipli-theme` (aqua / deep navy) and `.artling-theme` (warm orange) re-map the
semantic tokens. Wrap a case-study page root in the matching class and the same
token utilities render in that product's palette.

---

## 3. Typography

- **Display** (`font-display`): Outfit variable font, bundled locally at
  `src/fonts/Outfit-VariableFont_wght.ttf`. Used for all headings; tight
  tracking (`-0.025em`), weight 600.
- **Body** (`font-sans`): platform system sans stack (no webfont fetch).
- **Mono** (`font-mono`): platform monospace — used for eyebrows, labels,
  metadata, code-like accents.

Headings use `text-wrap: balance`; paragraphs use `text-wrap: pretty`.
Display sizes are fluid: `text-[clamp(34px,5vw,60px)]` for section titles,
larger for the hero and contact finale.

---

## 4. Primitives (`src/components/ui/`)

| Component | Purpose | Notes |
|---|---|---|
| `Button` | CTA / actions | `variant`: `signal \| solid \| outline \| ghost`; `size`: `sm \| md \| lg`; optional `magnetic` cursor attraction. |
| `SectionHeader` | Section intro | `eyebrow`, `title` (JSX; wrap an emphasis word in `<em>` to tint it signal), `lede`, `headingId`, `dot`, `align`. |
| `SpotlightCard` | Surface card | Cursor spotlight + spring tilt + parallax. Children may be a render-prop receiving `{ px, py }` motion values for floating art. |
| `Reveal` | Scroll entrance | `direction`, `delay`, `blur`, `as`. Plus `staggerContainer` / `staggerItem` variants for lists. |
| `Marquee` | Infinite ticker | Duplicates children for a seamless loop; `duration`, `reverse`. |
| `PhoneFrame` | Device bezel | CSS-only 9:19.5 phone for framing product UI. |

All interactive primitives honour `prefers-reduced-motion`.

---

## 5. Visual background (`src/components/visual/`)

- `ShaderField.tsx` — a fullscreen React-Three-Fiber `<Canvas>` rendering a
  domain-warped fractal-noise ("fbm") aurora tinted with the palette. Cheap:
  one plane, ~5 octaves, `dpr` capped at 1.5, `low-power` GL.
- `ShaderBackground.tsx` — the component you actually mount. It always paints a
  static CSS gradient + dot-grid (instant first paint / fallback), then lazily
  layers `ShaderField` on idle **only** when WebGL is available and the user
  has not requested reduced motion. A legibility scrim guarantees text contrast.

Mount once per page, behind everything (`-z-10`, `fixed inset-0`).

---

## 6. Motion & transitions

- **Route transitions:** `src/app/template.tsx` re-mounts on navigation and
  gives each page a blur-and-rise entrance (skipped for reduced motion).
- **Section entrances:** `Reveal` / `whileInView` with `once: true` and a
  `-12% 0px` margin so content animates just before it scrolls into view.
- **Micro-interactions:** spring physics for taps/hover, `layoutId` shared
  elements for the nav pill and hero tab pill.

---

## 7. Accessibility checklist

- One `<h1>` per page; sections labelled via `aria-labelledby` → `headingId`.
- Decorative layers are `aria-hidden`; the shader canvas is `aria-hidden`.
- Focus-visible rings use the signal colour at a 3px offset.
- Skip-to-content link in the root layout.
- All motion has a reduced-motion fallback.
- Colour pairings meet WCAG AA: ink on obsidian, and `signal-ink` on `signal`.

---

## 8. Adding a new section (recipe)

```tsx
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export function Example() {
  return (
    <section
      id="example"
      className="relative border-t border-line px-[var(--gutter)] py-[var(--space-section)]"
      aria-labelledby="example-heading"
    >
      <div className="mx-auto w-full max-w-[1280px]">
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
