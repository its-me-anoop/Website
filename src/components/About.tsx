"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "100%", label: "Client Satisfaction" },
  { value: "24/7", label: "Support Available" },
  { value: "5+", label: "Years Experience" },
];

const strengths = [
  "Expertise in modern frameworks like Next.js and Flutter",
  "Enterprise-grade security and scalability",
  "Dedicated support and ongoing maintenance",
  "User-centric design that drives results",
];

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-white">
      <div className="max-w-[980px] mx-auto px-6">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24 md:mb-32"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="text-center"
            >
              <h3 className="text-4xl md:text-5xl font-bold text-[#1d1d1f] tracking-tight">
                {stat.value}
              </h3>
              <p className="text-sm text-[#86868b] mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Why Choose Us */}
        <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-20 mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#0071e3] mb-3">
              Why Flutterly
            </h2>
            <p className="text-3xl md:text-4xl font-bold tracking-tight text-[#1d1d1f] leading-tight mb-6">
              We don&apos;t just write code.{" "}
              <span className="text-[#86868b]">We build digital assets that drive growth.</span>
            </p>
            <p className="text-[#86868b] text-lg mb-8 leading-relaxed">
              Our team works closely with you to understand your unique challenges
              and deliver solutions that scale with your business.
            </p>
            <ul className="space-y-4">
              {strengths.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#0071e3]/10 flex items-center justify-center mt-0.5 shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0071e3]" />
                  </div>
                  <span className="text-[#1d1d1f] text-[15px]">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="flex-1 w-full"
          >
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-6 md:p-8 rounded-2xl bg-[#f5f5f7] text-center"
                >
                  <h4 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] tracking-tight">
                    {stat.value}
                  </h4>
                  <p className="text-xs text-[#86868b] mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Founder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-[#f5f5f7] p-10 md:p-16"
        >
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            <div className="relative w-56 h-56 md:w-72 md:h-72 shrink-0 order-1 md:order-2">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[#e8e8ed] to-[#f5f5f7]" />
              <Image
                src="/anoop-jose.png"
                alt="Anoop Jose - Lead Developer and Founder of Flutterly Ltd"
                fill
                className="object-contain rounded-3xl relative z-10"
              />
            </div>

            <div className="flex-1 order-2 md:order-1 text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] tracking-tight mb-2">
                Anoop Jose
              </h3>
              <p className="text-[#0071e3] font-medium text-lg mb-6">
                Lead Developer &amp; Founder
              </p>

              <blockquote className="text-lg md:text-xl text-[#6e6e73] leading-relaxed mb-8">
                &ldquo;I believe in crafting digital experiences that are not just
                functional, but truly memorable. Every line of code is written with
                performance, scalability, and the user in mind.&rdquo;
              </blockquote>

              <div className="flex gap-3 justify-center md:justify-start">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-white text-[#1d1d1f] text-sm font-medium hover:bg-[#e8e8ed] transition-colors duration-200"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/anoop-jose-0b308a296/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-white text-[#1d1d1f] text-sm font-medium hover:bg-[#e8e8ed] transition-colors duration-200"
                >
                  LinkedIn
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-white text-[#1d1d1f] text-sm font-medium hover:bg-[#e8e8ed] transition-colors duration-200"
                >
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
