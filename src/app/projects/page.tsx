import type { Metadata } from "next";
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
  },
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
