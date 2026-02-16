"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";

const projects = [
  {
    title: "Thirsty.ai",
    description:
      "A privacy-first iOS hydration tracker that delivers personalized coaching and reminders using Apple Foundation Models running on-device.",
    image: "/projects/thirsty-ai/app-icon.png",
    tags: ["iOS Product", "AI", "Privacy-First"],
    link: "/projects/thirsty-ai",
    color: "bg-blue-50",
  },
  {
    title: "Greenmead Housing",
    description:
      "A specialized housing solution platform for a Community Interest Company. We built a fully accessible, responsive website that effectively communicates their mission of providing safe, empowering homes for individuals with learning disabilities.",
    image: "/project-greenmead.png",
    tags: ["Web Development", "Accessibility", "CIC"],
    link: "https://www.greenmead.co.uk",
    color: "bg-emerald-50",
  },
  {
    title: "Sandbourne Care",
    description:
      "A comprehensive digital presence for a residential and supported living service provider. The platform showcases their specialized care services for mental health and autism, featuring an accessible design and clear service pathways.",
    image: "/project-sandbourne.png",
    tags: ["Web Design", "Healthcare", "Accessibility"],
    link: "https://sandbournecare.co.uk",
    color: "bg-sky-50",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 bg-white">
      <div className="max-w-[980px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#0071e3] mb-3">
            Portfolio
          </h2>
          <p className="text-3xl md:text-4xl lg:text-[2.8rem] font-bold tracking-tight text-[#1d1d1f] leading-tight">
            Featured Work.
          </p>
        </motion.div>

        <div className="space-y-12 md:space-y-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center rounded-[2.5rem] p-4 md:p-8 transition-colors duration-500 ${project.color}`}
            >
              <div
                className={`relative rounded-2xl overflow-hidden aspect-[16/10] bg-white shadow-sm border border-black/[0.03] ${
                  index % 2 === 1 ? "md:order-2" : ""
                }`}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className={index % 2 === 1 ? "md:order-1 md:pl-4" : "md:pr-4"}>
                <h3 className="text-2xl md:text-3xl font-bold text-[#1d1d1f] mb-4 tracking-tight">
                  {project.title}
                </h3>
                <p className="text-[#86868b] text-base md:text-lg mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-white/60 border border-black/[0.03] text-xs font-medium text-[#6e6e73]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {project.link.startsWith("/") ? (
                  <Link
                    href={project.link}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1d1d1f] text-white text-sm font-medium hover:bg-[#323234] transition-colors"
                  >
                    View Case Study
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1d1d1f] text-white text-sm font-medium hover:bg-[#323234] transition-colors"
                  >
                    Visit Website
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-20 text-center"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-[#0071e3] font-medium hover:underline"
          >
            See all projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
