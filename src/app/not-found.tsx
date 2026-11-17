import { studioViewport } from "@/lib/marketing/viewport";
import type { Metadata, Viewport } from "next";
import { NotFoundPage } from "@/components/sorted/pages/NotFoundPage";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export const viewport: Viewport = studioViewport;

export default function NotFound() {
  return <NotFoundPage />;
}
