import type { Metadata, Viewport } from "next";
import { CareShell } from "@/components/demos/care/CareShell";

export const metadata: Metadata = {
  title: {
    default: "Oakfield House — sample care home website",
    template: "%s — Oakfield House (sample)",
  },
  description:
    "A sample care home website by Flutterly, showing families-first design, CQC transparency and WCAG 2.2 AA accessibility. The home shown is fictional.",
  /* Demo pages are linked from the site but kept out of search results
     so a fictional care home never appears in local search. */
  robots: { index: false, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#faf6ef",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function CareDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CareShell>{children}</CareShell>;
}
