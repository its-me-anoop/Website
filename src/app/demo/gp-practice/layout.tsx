import type { Metadata, Viewport } from "next";
import { GpShell } from "@/components/demos/gp/GpShell";

export const metadata: Metadata = {
  title: {
    default: "Willowbrook Surgery — sample GP practice website",
    template: "%s — Willowbrook Surgery (sample)",
  },
  description:
    "A sample GP practice website by Flutterly, showing NHS-aligned signposting, self-serve patient journeys and WCAG 2.2 AA accessibility. The practice shown is fictional.",
  /* Demo pages are linked from the site but kept out of search results
     so a fictional surgery never appears in local search. */
  robots: { index: false, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#005eb8",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function GpDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GpShell>{children}</GpShell>;
}
