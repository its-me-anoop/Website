import type { Metadata, Viewport } from "next";
import { NotFoundPage } from "@/components/sorted/pages/NotFoundPage";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4efe8" },
    { media: "(prefers-color-scheme: dark)", color: "#201e1f" },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

export default function NotFound() {
  return <NotFoundPage />;
}
