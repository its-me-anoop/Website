import type { Viewport } from "next";

/** Shared chrome for Studio (dark editorial) marketing routes. */
export const studioViewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#050505" },
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
  ],
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const STUDIO_THEME_COLOR = "#050505";
