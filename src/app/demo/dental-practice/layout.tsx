import type { Metadata, Viewport } from "next";
import { DentalShell } from "@/components/demos/dental/DentalShell";

export const metadata: Metadata = {
  title: {
    default: "Kennet Bridge Dental — sample dental practice website",
    template: "%s — Kennet Bridge Dental (sample)",
  },
  description:
    "A sample mixed NHS and private dental practice website by Flutterly, showing transparent fee tables, sector-literate patient journeys and WCAG 2.2 AA accessibility. The practice shown is fictional.",
  /* Demo pages are linked from the site but kept out of search results
     so a fictional practice never appears in local search. */
  robots: { index: false, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0e6b78",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function DentalDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DentalShell>{children}</DentalShell>;
}
