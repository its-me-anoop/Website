import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd, defaultOgImage } from "@/lib/seo";
import { getService, headingText, serviceHref, serviceSlugs } from "@/lib/marketing/services";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServicePage } from "@/components/aurora/pages/ServicePage";

type Params = { params: Promise<{ slug: string }> };

/** Only the five known services exist; anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  const path = serviceHref(service.slug);
  const title = `${service.name} in Reading`;
  return {
    title,
    description: service.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: `${headingText(service)} — ${site.studio}`,
      description: service.metaDescription,
      url: `${site.url}${path}`,
      siteName: site.studio,
      locale: site.locale,
      type: "website",
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${headingText(service)} — ${site.studio}`,
      description: service.metaDescription,
      images: [site.ogImage],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#0b0907",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default async function ServiceRoute({ params }: Params) {
  const service = getService((await params).slug);
  if (!service) notFound();
  const path = serviceHref(service.slug);
  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            name: service.name,
            description: service.metaDescription,
            path,
            serviceType: service.name,
          }),
          faqJsonLd(service.faqs),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.name, path },
          ]),
        ]}
      />
      <ServicePage service={service} />
    </>
  );
}
