import type { Viewport } from "next";

/** Studio pages share a fixed petrol masthead in both colour schemes. */
export const studioViewport: Viewport = {
  themeColor: "#092c30",
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};
