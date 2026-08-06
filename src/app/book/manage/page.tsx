import type { Metadata, Viewport } from "next";
import { ManagePage } from "@/features/booking/ui/ManagePage";

export const metadata: Metadata = {
  title: "Manage bookings",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#fafcfb",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function ManageBookings() {
  return <ManagePage />;
}
