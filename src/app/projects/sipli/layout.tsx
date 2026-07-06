import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "Sipli — AI hydration, on device";
const description =
    "Sipli is an iOS and iPadOS hydration coach with an on-device AI, 18+ beverage tracking, HealthKit sync, adaptive goals, widgets, and a weekly insights dashboard. A Flutterly project.";

export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: "/projects/sipli" },
    openGraph: {
        title: `${title} · Flutterly`,
        description,
        url: "/projects/sipli",
        images: [
            {
                url: "/images/sipli/iphone/01-hero-1320x2868.png",
                width: 1320,
                height: 2868,
                alt: "Sipli — home screen",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: `${title} · Flutterly`,
        description,
        images: ["/images/sipli/iphone/01-hero-1320x2868.png"],
    },
};

export default function SipliLayout({ children }: { children: ReactNode }) {
    return <>{children}</>;
}
