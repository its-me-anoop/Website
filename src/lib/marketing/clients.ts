/**
 * The businesses Flutterly works with, in the order Anoop listed them.
 *
 * Logos live in public/clients. Each one is a transparent single-colour
 * mask, so the strip can paint every mark in the same ink and light it
 * amber on hover however the original was coloured. A client without a
 * logo file is set as a typeset wordmark until one arrives.
 */
export type ClientLogo = {
  src: string;
  /** Intrinsic size of the file, for the aspect ratio. */
  width: number;
  height: number;
  /** Rendered height in px, tuned so the marks carry similar weight. */
  displayHeight: number;
  /** True when the logo is a symbol with no name in it, so the name is set beside it. */
  symbolOnly?: boolean;
};

export type Client = {
  name: string;
  href?: string;
  logo?: ClientLogo;
};

export const clients: readonly Client[] = [
  {
    name: "Pembroke Care",
    href: "https://pembrokecare.com/",
    logo: { src: "/clients/pembroke-care.svg", width: 324, height: 200, displayHeight: 64 },
  },
  {
    name: "Sandbourne Care",
    href: "https://sandbournecare.co.uk/",
    logo: { src: "/clients/sandbourne-care.svg", width: 800, height: 800, displayHeight: 40, symbolOnly: true },
  },
  { name: "Montis Care" },
  {
    name: "20X",
    logo: { src: "/clients/20x.png", width: 228, height: 80, displayHeight: 30 },
  },
  {
    name: "Goodwill Dairy",
    logo: { src: "/clients/goodwill-dairy.png", width: 199, height: 113, displayHeight: 64 },
  },
];
