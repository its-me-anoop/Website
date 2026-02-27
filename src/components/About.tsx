"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Github, Linkedin, Twitter } from "lucide-react";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "100%", label: "Client Satisfaction" },
  { value: "24/7", label: "Support Available" },
  { value: "5+", label: "Years Experience" },
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/anoop-jose-0b308a296/",
    icon: Linkedin,
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: Twitter,
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-[#0F172A]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-16"
        >
          <p className="text-xs font-medium uppercase tracking-widest text-foreground-tertiary mb-4">
            About
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-medium text-[#FDFBF7] leading-tight">
            Built by a developer who
            <br />
            cares about craft.
          </h2>
        </motion.div>

        {/* Content Row */}
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left: Founder Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="shrink-0"
          >
            <div className="relative w-72 h-80 overflow-hidden rounded-[80px_20px_80px_20px]">
              <Image
                src="/anoop-jose.jpg"
                sizes="288px"
                alt="Anoop Jose - Lead Developer and Founder of Flutterly Ltd"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Right: Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="flex-1"
          >
            <h3 className="font-display text-3xl font-medium text-[#FDFBF7] mb-2">
              Anoop Jose
            </h3>
            <p className="text-accent font-medium text-lg mb-6">
              Lead Developer &amp; Founder
            </p>

            <blockquote className="text-lg md:text-xl text-foreground-tertiary leading-relaxed italic mb-8">
              &ldquo;I believe in crafting digital experiences that are not just
              functional, but truly memorable. Every line of code is written with
              performance, scalability, and the user in mind.&rdquo;
            </blockquote>

            {/* Social Links */}
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-11 h-11 rounded-xl border border-foreground-tertiary/30 flex items-center justify-center text-[#FDFBF7] hover:bg-[#FDFBF7]/10 transition-colors duration-200"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 + index * 0.08, duration: 0.5, ease }}
              className="text-center"
            >
              <h4 className="font-display text-4xl md:text-5xl font-semibold text-[#FDFBF7] tracking-tight">
                {stat.value}
              </h4>
              <p className="font-sans text-sm text-foreground-tertiary mt-2">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
