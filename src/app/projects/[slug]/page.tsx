import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { breadcrumbJsonLd, defaultOgImage } from "@/lib/seo";
import { caseStudies, getCaseStudy } from "@/lib/marketing/case-studies";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProjectPage } from "@/components/sorted/pages/ProjectPage";

type Params = { params: Promise<{ slug: string }> };

/** Only the case studies in `case-studies.ts` exist here; Sipli, Little Artist and Little Lifeline have their own routes. */
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  if (!study) return {};
  const path = `/projects/${study.slug}`;
  return {
    title: study.name,
    description: study.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: `${study.name} — ${site.studio}`,
      description: study.metaDescription,
      url: `${site.url}${path}`,
      siteName: site.studio,
      locale: site.locale,
      type: "website",
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.name} — ${site.studio}`,
      description: study.metaDescription,
      images: [site.ogImage],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#f4f3ee",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default async function ProjectRoute({ params }: Params) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Work", path: "/#work" },
          { name: study.name, path: `/projects/${study.slug}` },
        ])}
      />
      <ProjectPage study={study} />
    </>
  );
}
