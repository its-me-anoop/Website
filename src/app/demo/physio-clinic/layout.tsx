import type { Metadata, Viewport } from "next";
import { PhysioShell } from "@/components/demos/physio/PhysioShell";

export const metadata: Metadata = {
  title: {
    default: "Forbury Physiotherapy — sample physiotherapy clinic website",
    template: "%s — Forbury Physiotherapy (sample)",
  },
  description:
    "A sample private physiotherapy clinic website by Flutterly, showing public pricing, a self-pay vs insured explainer and WCAG 2.2 AA accessibility. The clinic shown is fictional.",
  /* Demo pages are linked from the site but kept out of search results
     so a fictional clinic never appears in local search. */
  robots: { index: false, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#c2452f",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function PhysioDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PhysioShell>{children}</PhysioShell>;
}
