"use client";

import Header from "@/components/Header";
import Contact from "@/components/Contact";
import { motion } from "framer-motion";
import {
  Home,
  Heart,
  Leaf,
  Stethoscope,
  Shield,
  Activity,
  ChevronRight,
} from "lucide-react";

const projects = [
  {
    title: "Greenmead Housing",
    description:
      "A specialised housing solution platform for a Community Interest Company providing safe, empowering homes for individuals with learning disabilities.",
    icon: Home,
    tags: ["Web Development", "Accessibility", "CIC"],
    link: "https://www.greenmead.co.uk",
  },
  {
    title: "Sandbourne Care",
    description:
      "A comprehensive digital presence for a residential and supported living service provider specialising in mental health and autism care.",
    icon: Heart,
    tags: ["Web Design", "Healthcare", "Accessibility"],
    link: "https://sandbournecare.co.uk",
  },
  {
    title: "JJ Paper Essentials",
    description:
      "An eco-friendly e-commerce platform for sustainable paper products made from sugarcane waste, featuring nature-inspired design.",
    icon: Leaf,
    tags: ["E-commerce", "Sustainability", "Product Design"],
    link: "https://www.jjpaperessential.com",
  },
  {
    title: "Nursely",
    description:
      "A comprehensive mobile application for nursing staff management and scheduling, available on iOS and Android.",
    icon: Stethoscope,
    tags: ["Mobile App", "iOS & Android", "Healthcare"],
    link: "https://nursely.app",
  },
  {
    title: "Montis Care",
    description:
      "A professional digital platform for a care service provider specialising in learning disabilities and mental health support.",
    icon: Shield,
    tags: ["Web Design", "Care Services", "Compliance"],
    link: "https://www.montiscare.co.uk",
  },
  {
    title: "Uniq Healthcare",
    description:
      "A digital presence for a home healthcare provider focused on compassion, dignity, and their CQC 'Good' rating.",
    icon: Activity,
    tags: ["Web Design", "Home Care", "CQC Registered"],
    link: "https://uniqhealthcare.co.uk",
  },
];

export default function ProjectsContent() {
  return (
    <main className="min-h-screen bg-black text-[#f5f5f7]">
      <Header />

      <section className="pt-32 pb-20 md:pt-44 md:pb-28">
        <div className="max-w-[980px] mx-auto px-6 lg:px-0">
          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20 md:mb-24"
          >
            <p className="text-apple-blue text-base md:text-lg font-medium mb-4">
              Our Portfolio
            </p>
            <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-bold tracking-[-0.04em] leading-[1.05] text-gray-100 mb-6">
              Our work speaks
              <br />
              for itself.
            </h1>
            <p className="text-xl md:text-[1.75rem] leading-[1.32] font-semibold text-gray-400 max-w-[600px] mx-auto">
              Digital experiences crafted for clients across healthcare,
              e-commerce, and enterprise.
            </p>
          </motion.div>

          {/* Project grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="group bg-surface rounded-3xl p-10 flex flex-col transition-transform duration-500 hover:scale-[1.02]"
              >
                <project.icon className="w-10 h-10 text-apple-blue mb-6" />

                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-100 mb-4">
                  {project.title}
                </h2>

                <p className="text-gray-400 leading-relaxed mb-8 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium text-gray-500 bg-[#1c1c1e] rounded-full px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-0.5 text-apple-blue text-sm hover:underline"
                >
                  Visit website
                  <ChevronRight className="w-4 h-4" />
                </a>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </main>
  );
}
