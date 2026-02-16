"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const appleEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "anoop@flutterly.co.uk",
    href: "mailto:anoop@flutterly.co.uk",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+44 7780 580534",
    href: "tel:+447780580534",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "Flat 21, 3 Erleigh Road, Reading RG1 5LR, UK",
    href: undefined,
  },
];

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com" },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/anoop-jose-0b308a296/",
  },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
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

export default function Contact() {
  return (
    <footer id="contact" className="border-t border-black/10 bg-white">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
        className="mx-auto max-w-[1020px] px-6 py-24 md:py-32"
      >
        <motion.div variants={itemVariants} className="mb-14 text-center md:mb-20">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#0071e3]">
            Get in Touch
          </h2>
          <p className="mx-auto max-w-[760px] text-3xl font-semibold leading-tight tracking-[-0.02em] text-[#1d1d1f] md:text-4xl lg:text-[2.8rem]">
            Let&apos;s build something great.
          </p>
          <p className="mx-auto mt-5 max-w-[620px] text-base leading-relaxed text-[#86868b] md:text-lg">
            Ready to start your next project? Reach out for a free consultation and we&apos;ll map the best path forward.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-7">
          <motion.div
            variants={itemVariants}
            className="rounded-[28px] border border-black/10 bg-white p-7 shadow-[0_10px_30px_rgba(0,0,0,0.05)] md:p-8"
          >
            <div className="relative mb-8 h-10 w-44">
              <Image
                src="/logo-tagline.png"
                alt="Flutterly Ltd - Build Beautiful Apps"
                fill
                className="object-contain object-left"
              />
            </div>

            <p className="mb-8 max-w-md leading-relaxed text-[#86868b]">
              UK-based digital agency creating exceptional digital experiences.
              Let&apos;s discuss how we can bring your vision to life.
            </p>

            <div className="space-y-4">
              {contactInfo.map((item, index) => {
                const content = (
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.7 }}
                    transition={{ delay: 0.12 + index * 0.07, duration: 0.45 }}
                    className="group flex items-center gap-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0071e3]/10 transition-colors duration-200 group-hover:bg-[#0071e3]/[0.16]">
                      <item.icon className="h-4 w-4 text-[#0071e3]" />
                    </div>
                    <div>
                      <p className="mb-0.5 text-xs text-[#86868b]">{item.label}</p>
                      <p className="text-sm text-[#1d1d1f]">{item.value}</p>
                    </div>
                  </motion.div>
                );

                return item.href ? (
                  <a key={item.label} href={item.href} className="block">
                    {content}
                  </a>
                ) : (
                  <div key={item.label}>{content}</div>
                );
              })}
            </div>

            <div className="mt-9 flex gap-3">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${link.label}`}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.7 }}
                  transition={{ delay: 0.2 + index * 0.06, duration: 0.4 }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 text-[#86868b] transition-all duration-200 hover:border-[#0071e3]/30 hover:text-[#0071e3]"
                >
                  <link.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.form
            variants={itemVariants}
            className="rounded-[28px] border border-black/10 bg-white p-7 shadow-[0_10px_30px_rgba(0,0,0,0.05)] md:p-8"
            aria-label="Contact form"
          >
            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="firstName" className="text-sm text-[#86868b]">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-[#1d1d1f] placeholder:text-[#86868b] transition-all duration-200 focus:border-[#0071e3]/60 focus:outline-none"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="lastName" className="text-sm text-[#86868b]">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-[#1d1d1f] placeholder:text-[#86868b] transition-all duration-200 focus:border-[#0071e3]/60 focus:outline-none"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm text-[#86868b]">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-[#1d1d1f] placeholder:text-[#86868b] transition-all duration-200 focus:border-[#0071e3]/60 focus:outline-none"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-sm text-[#86868b]">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  className="h-32 w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-[#1d1d1f] placeholder:text-[#86868b] transition-all duration-200 focus:border-[#0071e3]/60 focus:outline-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0071e3] py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#0077ed]"
              >
                Send Message
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </div>
          </motion.form>
        </div>
      </motion.div>

      <div className="border-t border-black/10 bg-white py-6">
        <div className="mx-auto flex max-w-[1020px] flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <p className="text-xs text-[#86868b]">
            &copy; {new Date().getFullYear()} Flutterly Ltd. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/#services"
              className="text-xs text-[#86868b] transition-colors duration-200 hover:text-[#1d1d1f]"
            >
              Services
            </Link>
            <Link
              href="/projects"
              className="text-xs text-[#86868b] transition-colors duration-200 hover:text-[#1d1d1f]"
            >
              Work
            </Link>
            <Link
              href="/#about"
              className="text-xs text-[#86868b] transition-colors duration-200 hover:text-[#1d1d1f]"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
