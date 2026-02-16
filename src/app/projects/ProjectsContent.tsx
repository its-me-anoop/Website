"use client";

import Header from "@/components/Header";
import Contact from "@/components/Contact";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Home,
  Heart,
  Leaf,
  Stethoscope,
  Shield,
  Activity,
  Droplets,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const projects = [
  {
    title: "Thirsty.ai",
    description:
      "An iOS hydration tracker powered by on-device Apple Foundation Models. Delivering private, personalized coaching with adaptive reminders and zero cloud dependency.",
    icon: Droplets,
    tags: ["iOS App", "On-device AI", "Privacy-first"],
    link: "/projects/thirsty-ai",
  },
  {
    title: "Greenmead Housing",
    description:
      "A specialised housing solution platform for a Community Interest Company. Fully accessible, responsive website that communicates their mission of providing safe, empowering homes for individuals with learning disabilities.",
    icon: Home,
    tags: ["Web Development", "Accessibility", "CIC"],
    link: "https://www.greenmead.co.uk",
  },
  {
    title: "Sandbourne Care",
    description:
      "A comprehensive digital presence for a residential and supported living service provider. The platform showcases specialised care services for mental health and autism with accessible design and clear service pathways.",
    icon: Heart,
    tags: ["Web Design", "Healthcare", "Accessibility"],
    link: "https://sandbournecare.co.uk",
  },
  {
    title: "JJ Paper Essentials",
    description:
      "An eco-friendly e-commerce platform for sustainable paper products made from sugarcane waste. Clean, nature-inspired design highlighting environmental benefits and premium product quality.",
    icon: Leaf,
    tags: ["E-commerce", "Sustainability", "Product Design"],
    link: "https://www.jjpaperessential.com",
  },
  {
    title: "Nursely",
    description:
      "A comprehensive mobile application for nursing staff management and scheduling. Available on iOS and Android, streamlining shift booking, compliance tracking, and communication for healthcare professionals.",
    icon: Stethoscope,
    tags: ["Mobile App", "iOS & Android", "Healthcare"],
    link: "https://nursely.app",
  },
  {
    title: "Montis Care",
    description:
      "A professional digital platform for a care service provider specialising in support for learning disabilities and mental health. Clear information on services, compliance, and care philosophy.",
    icon: Shield,
    tags: ["Web Design", "Care Services", "Compliance"],
    link: "https://www.montiscare.co.uk",
  },
  {
    title: "Uniq Healthcare",
    description:
      "A digital presence for a home healthcare provider focused on compassion and dignity. Showcasing expertise in caring for adults and individuals with learning disabilities, highlighting their CQC 'Good' rating.",
    icon: Activity,
    tags: ["Web Design", "Home Care", "CQC Registered"],
    link: "https://uniqhealthcare.co.uk",
  },
];

export default function ProjectsContent() {
  return (
    <main className="min-h-screen bg-white text-[#1d1d1f]">
      <Header />

      <section className="pt-32 pb-24 md:pt-40 md:pb-32 bg-[#fbfbfd]">
        <div className="max-w-[980px] mx-auto px-6">
          <div className="text-center mb-16 md:mb-20">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-tight text-[#1d1d1f] mb-4"
            >
              Our Work
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-[#86868b] max-w-lg mx-auto"
            >
              Digital experiences crafted for clients across healthcare,
              e-commerce, and enterprise sectors.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: (index % 2) * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group rounded-3xl bg-white p-8 md:p-10 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#f5f5f7] flex items-center justify-center mb-6 group-hover:bg-[#e8e8ed] transition-colors duration-300">
                  <project.icon className="w-6 h-6 text-[#1d1d1f]" />
                </div>

                <h2 className="text-xl font-bold text-[#1d1d1f] mb-3 tracking-tight">
                  {project.title}
                </h2>
                <p className="text-[#86868b] text-[15px] leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-[#f5f5f7] text-xs font-medium text-[#6e6e73]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {project.link.startsWith("/") ? (
                  <Link
                    href={project.link}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0071e3] hover:underline"
                  >
                    View Case Study
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0071e3] hover:underline"
                  >
                    Visit Website
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </main>
  );
}
