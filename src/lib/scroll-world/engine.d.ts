export type ScrollWorldCta = {
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export type ScrollWorldSection = {
  id: string;
  label: string;
  still: string;
  stillMobile?: string;
  clip: string;
  clipMobile?: string;
  accent: string;
  scroll?: number;
  linger?: number;
  eyebrow?: string;
  title?: string;
  body?: string;
  tags?: string[];
  cta?: ScrollWorldCta;
};

export type ScrollWorldConfig = {
  brand?: { name: string; href?: string };
  diveScroll?: number;
  connScroll?: number;
  crossfade?: number;
  hint?: string;
  nav?: boolean;
  atmosphere?: boolean;
  cta?: { label: string; href: string };
  sections: ScrollWorldSection[];
  connectors?: Array<string | null>;
  connectorsMobile?: Array<string | null>;
};

export function mountScrollWorld(
  container: HTMLElement,
  config: ScrollWorldConfig,
): void;
