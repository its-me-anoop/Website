"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const stats = [
  {
    value: "50+",
    label: "Projects Delivered",
    color: "text-blue-400",
  },
  {
    value: "100%",
    label: "Client Satisfaction",
    color: "text-cyan-400",
  },
  {
    value: "24/7",
    label: "Support Available",
    color: "text-violet-400",
  },
  {
    value: "5+",
    label: "Years Experience",
    color: "text-emerald-400",
  },
];

const strengths = [
  "Expertise in latest technologies (Next.js, Flutter)",
  "Enterprise-grade security and scalability",
  "Dedicated support and maintenance",
  "User-centric design approach",
];

export default function About() {
  return (
    <section id="about" className="py-28 relative overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 section-divider"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6">
        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-28"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
            >
              <h3 className={`text-4xl md:text-5xl font-bold mb-2 ${stat.color}`}>
                {stat.value}
              </h3>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Why choose us */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20 mb-28">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <p className="text-sm font-medium uppercase tracking-widest text-blue-400 mb-4">
              Why Choose Us
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose Flutterly?
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              At Flutterly, we don&apos;t just write code; we build digital
              assets that drive growth. Our team of expert developers and
              consultants works closely with you to understand your unique
              challenges and deliver solutions that scale.
            </p>
            <ul className="space-y-4">
              {strengths.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 relative w-full"
          >
            {/* Decorative elements */}
            <div
              className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-10 -left-10 w-40 h-40 bg-violet-500/10 rounded-full blur-3xl"
              aria-hidden="true"
            />

            <div className="relative z-10 p-8 md:p-10 rounded-2xl bg-white/[0.02] border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="p-6 rounded-xl bg-white/[0.03] border border-white/[0.04] text-center hover:bg-white/[0.05] transition-colors duration-300"
                  >
                    <h4 className={`text-3xl md:text-4xl font-bold mb-2 ${stat.color}`}>
                      {stat.value}
                    </h4>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Founder card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-full bg-gradient-to-r from-blue-500/8 to-violet-500/8 blur-3xl rounded-full -z-10"
            aria-hidden="true"
          />

          <div className="p-10 md:p-16 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl max-w-5xl mx-auto relative overflow-hidden group hover:border-white/[0.12] transition-all duration-500">
            {/* Top gradient line */}
            <div
              className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"
              aria-hidden="true"
            />

            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
              <div className="relative z-10 flex-1 text-left order-2 md:order-1">
                <h3 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">
                  Anoop Jose
                </h3>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-medium text-xl mb-8">
                  Lead Developer &amp; Founder
                </p>

                <blockquote className="text-xl text-gray-300 leading-relaxed font-light italic mb-10 border-l-4 border-blue-500/30 pl-6">
                  &ldquo;I believe in crafting digital experiences that are not
                  just functional, but truly memorable. Every line of code is
                  written with performance, scalability, and user experience in
                  mind.&rdquo;
                </blockquote>

                <div className="flex gap-3">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-sm font-medium text-gray-400 hover:text-white"
                  >
                    Github
                  </a>
                  <a
                    href="https://www.linkedin.com/in/anoop-jose-0b308a296/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-sm font-medium text-gray-400 hover:text-white"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-sm font-medium text-gray-400 hover:text-white"
                  >
                    Twitter
                  </a>
                </div>
              </div>

              <div className="relative w-64 h-64 md:w-80 md:h-80 shrink-0 order-1 md:order-2">
                <div
                  className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent rounded-full blur-2xl opacity-50"
                  aria-hidden="true"
                />
                <Image
                  src="/anoop-jose.png"
                  alt="Anoop Jose - Lead Developer and Founder of Flutterly Ltd"
                  fill
                  className="object-contain drop-shadow-2xl scale-110 group-hover:scale-[1.15] transition-transform duration-700 brightness-105 contrast-110 grayscale-[10%]"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
