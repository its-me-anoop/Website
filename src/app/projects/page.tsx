import type { Metadata } from "next";
<<<<<<< ours
import ProjectsContent from "./ProjectsContent";

export const metadata: Metadata = {
  title: "Our Projects - Web & Mobile App Portfolio",
  description:
    "Explore our portfolio of successful web and mobile app projects. From healthcare platforms to e-commerce solutions, see how Flutterly Ltd delivers digital excellence for clients across the UK.",
  openGraph: {
    title: "Our Projects | Flutterly Ltd Portfolio",
    description:
      "Explore our portfolio of successful web and mobile app projects across healthcare, e-commerce, and enterprise sectors.",
    url: "https://flutterly.co.uk/projects",
  },
  alternates: {
    canonical: "https://flutterly.co.uk/projects",
=======
import ProjectsClient from "./ProjectsClient";

const title = "Projects";
const description =
  "Explore Flutterly's portfolio of web and mobile projects across healthcare, sustainability, and care services.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: `${title} | Flutterly Ltd`,
    description,
    url: "/projects",
    type: "website",
    images: [
      {
        url: "/logo-horizontal.png",
        width: 1200,
        height: 630,
        alt: "Flutterly projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Flutterly Ltd`,
    description,
    images: ["/logo-horizontal.png"],
>>>>>>> theirs
  },
};

export default function ProjectsPage() {
<<<<<<< ours
  return <ProjectsContent />;
=======
  return <ProjectsClient />;
>>>>>>> theirs
}
