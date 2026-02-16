"use client";

import { motion } from "framer-motion";
import { Globe, Smartphone, Building2 } from "lucide-react";

const appleEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const services = [
  {
    title: "Web Development",
    description:
      "Fast, accessible, and beautifully crafted websites and web applications that turn visitors into customers.",
    icon: Globe,
    tech: ["React", "Next.js", "WordPress", "TypeScript"],
  },
  {
    title: "Mobile Apps",
    description:
      "Native and cross-platform apps for iOS and Android. Stunning performance, seamless user experience.",
    icon: Smartphone,
    tech: ["Flutter", "SwiftUI", "React Native", "Kotlin"],
  },
  {
    title: "Enterprise Solutions",
    description:
      "Robust business infrastructure setup and management. Scale confidently with enterprise-grade tools.",
    icon: Building2,
    tech: ["Zoho", "Google Workspace", "Azure", "AWS"],
  },
];

const sectionVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: appleEase,
      staggerChildren: 0.1,
      delayChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: appleEase } },
};

export default function Services() {
  return (
    <section id="services" className="bg-white py-24 md:py-32">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="mx-auto max-w-[1020px] px-6"
      >
        <motion.div variants={itemVariants} className="mb-14 text-center md:mb-20">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#0071e3]">
            Services
          </h2>
          <p className="mx-auto max-w-[780px] text-3xl font-semibold leading-tight tracking-[-0.02em] text-[#1d1d1f] md:text-4xl lg:text-[2.8rem]">
            Expertise that delivers results.
          </p>
          <p className="mx-auto mt-5 max-w-[640px] text-base leading-relaxed text-[#86868b] md:text-lg">
            Full-cycle product development, from strategy through launch, built to perform reliably on every device.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              variants={itemVariants}
              transition={{ delay: index * 0.07 }}
              whileHover={{ y: -4 }}
              className="group flex h-full flex-col rounded-[28px] border border-black/10 bg-white p-7 shadow-[0_10px_32px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_14px_36px_rgba(0,0,0,0.09)] md:p-8"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0071e3]/10">
                <service.icon className="h-5 w-5 text-[#0071e3]" />
              </div>

              <h3 className="mb-3 text-xl font-semibold tracking-tight text-[#1d1d1f]">
                {service.title}
              </h3>
              <p className="mb-7 text-[15px] leading-relaxed text-[#86868b] md:text-base">
                {service.description}
              </p>

              <div className="mt-auto flex flex-wrap gap-2">
                {service.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-black/10 px-3 py-1.5 text-xs font-medium text-[#86868b]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
