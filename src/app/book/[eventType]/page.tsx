import type { Metadata, Viewport } from "next";
import { studioViewport } from "@/lib/studio";
import { notFound, redirect } from "next/navigation";
import { site } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  BookUnavailableExperience,
} from "@/components/bloom/redesign/BookExperience";
import { RedesignShell } from "@/components/bloom/redesign/RedesignShell";
import { eventTypes, getEventType } from "@/features/booking/core/config";
import { calBookingUrl } from "@/lib/cal";

type Params = { eventType: string };

export function generateStaticParams(): Params[] {
  return eventTypes.map((eventType) => ({ eventType: eventType.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { eventType: id } = await params;
  const eventType = getEventType(id);
  if (!eventType) return {};
  const title = `Book: ${eventType.name} (${eventType.durationMinutes} min)`;
  return {
    title,
    description: eventType.description,
    alternates: { canonical: `/book/${eventType.id}` },
    openGraph: {
      title: `${title} — ${site.studio}`,
      description: eventType.description,
      url: `${site.url}/book/${eventType.id}`,
      siteName: site.studio,
      locale: site.locale,
      type: "website",
      images: [{ url: site.ogImage, width: 1200, height: 630 }],
    },
  };
}

export const viewport: Viewport = studioViewport;

export default async function BookEventType({
  params,
}: {
  params: Promise<Params>;
}) {
  const { eventType: id } = await params;
  const eventType = getEventType(id);
  if (!eventType) notFound();

  const calUrl = calBookingUrl(eventType.id);
  if (calUrl) redirect(calUrl);

  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Book a call", path: "/book" },
    { name: eventType.name, path: `/book/${eventType.id}` },
  ]);

  return (
    <>
      <JsonLd data={[crumbs]} />
      <RedesignShell>
        <BookUnavailableExperience
          name={eventType.name}
          durationMinutes={eventType.durationMinutes}
        />      </RedesignShell>
    </>
  );
}
