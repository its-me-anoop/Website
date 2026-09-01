import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { CalEmbed } from "@/components/bloom/redesign/CalEmbed";
import { RedesignShell } from "@/components/bloom/redesign/RedesignShell";
import bookStyles from "@/components/bloom/redesign/book.module.css";
import { eventTypes, getEventType } from "@/features/booking/core/config";
import { Scheduler } from "@/features/booking/ui/Scheduler";
import { cal, calBookingUrl } from "@/lib/cal";
import type { EventTypeId } from "@/features/booking/core/types";

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

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default async function BookEventType({ params }: { params: Promise<Params> }) {
  const { eventType: id } = await params;
  const eventType = getEventType(id);
  if (!eventType) notFound();

  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Book a call", path: "/book" },
    { name: eventType.name, path: `/book/${eventType.id}` },
  ]);

  if (!cal.enabled) {
    return (
      <>
        <JsonLd data={[crumbs]} />
        <Scheduler eventType={eventType} />
      </>
    );
  }

  return (
    <>
      <JsonLd data={[crumbs]} />
      <RedesignShell>
        <div className={bookStyles.page}>
          <header className={bookStyles.head}>
            <p className={bookStyles.eyebrow}>
              <Link href="/book">Book a call</Link> · Cal.com
            </p>
            <h1 className={bookStyles.title}>{eventType.name}</h1>
            <p className={bookStyles.lead}>
              {eventType.durationMinutes} minutes ·{" "}
              {eventType.location.replaceAll("-", " ")}. Book directly in{" "}
              {site.founder.split(" ")[0]}&apos;s Cal.com diary — confirmation and
              calendar invite are instant.
            </p>
            <p className={bookStyles.schedulerLead}>
              <a
                className={bookStyles.externalLink}
                href={calBookingUrl(eventType.id as EventTypeId)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in Cal.com
              </a>
            </p>
          </header>
          <CalEmbed
            eventTypeId={eventType.id as EventTypeId}
            title={`Book ${eventType.name} on Cal.com`}
          />
          <section className={bookStyles.how} aria-labelledby="call-covers">
            <h2 className={bookStyles.eyebrow} id="call-covers">
              This call covers
            </h2>
            <ul className={bookStyles.points}>
              {eventType.agenda.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className={bookStyles.email}>
              Prefer email? Write to{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </section>
        </div>
      </RedesignShell>
    </>
  );
}
