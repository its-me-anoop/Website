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

export default function Contact() {
  return (
    <footer id="contact" className="bg-[#f5f5f7]">
      {/* CTA Section */}
      <div className="section-dark py-24 md:py-32">
        <div className="max-w-[980px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#0071e3] mb-3">
              Get in Touch
            </h2>
            <p className="text-3xl md:text-4xl lg:text-[2.8rem] font-bold tracking-tight text-[#f5f5f7] leading-tight mb-4">
              Let&apos;s build something great.
            </p>
            <p className="text-[#86868b] max-w-lg mx-auto text-lg">
              Ready to start your next project? Reach out for a free consultation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative h-10 w-40 mb-8">
                <Image
                  src="/logo-tagline.png"
                  alt="Flutterly Ltd - Build Beautiful Apps"
                  fill
                  className="object-contain object-left brightness-200"
                />
              </div>

              <p className="text-[#86868b] mb-10 max-w-md leading-relaxed">
                UK-based digital agency creating exceptional digital experiences.
                Let&apos;s discuss how we can bring your vision to life.
              </p>

              <div className="space-y-5">
                {contactInfo.map((item) => {
                  const content = (
                    <div className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center shrink-0 group-hover:bg-white/[0.1] transition-colors duration-200">
                        <item.icon className="w-4 h-4 text-[#86868b]" />
                      </div>
                      <div>
                        <p className="text-xs text-[#6e6e73] mb-0.5">
                          {item.label}
                        </p>
                        <p className="text-[#f5f5f7] text-sm group-hover:text-white transition-colors duration-200">
                          {item.value}
                        </p>
                      </div>
                    </div>
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

              {/* Social links */}
              <div className="flex gap-3 mt-10">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${link.label}`}
                    className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center text-[#86868b] hover:text-white hover:bg-white/[0.1] transition-all duration-200"
                  >
                    <link.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Contact form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-5"
              aria-label="Contact form"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="firstName" className="text-sm text-[#86868b]">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className="w-full bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder:text-[#6e6e73] focus:outline-none focus:border-[#0071e3]/60 focus:bg-white/[0.08] transition-all duration-200 text-sm"
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
                    className="w-full bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder:text-[#6e6e73] focus:outline-none focus:border-[#0071e3]/60 focus:bg-white/[0.08] transition-all duration-200 text-sm"
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
                  className="w-full bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder:text-[#6e6e73] focus:outline-none focus:border-[#0071e3]/60 focus:bg-white/[0.08] transition-all duration-200 text-sm"
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
                  className="w-full bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder:text-[#6e6e73] focus:outline-none focus:border-[#0071e3]/60 focus:bg-white/[0.08] transition-all duration-200 h-28 resize-none text-sm"
                  placeholder="Tell us about your project..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#0071e3] font-medium text-white hover:bg-[#0077ed] transition-colors duration-200 flex items-center justify-center gap-2 group text-sm"
              >
                Send Message
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              </button>
            </motion.form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="py-6 bg-[#f5f5f7]">
        <div className="max-w-[980px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#86868b] text-xs">
            &copy; {new Date().getFullYear()} Flutterly Ltd. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/#services"
              className="text-[#86868b] hover:text-[#1d1d1f] transition-colors duration-200 text-xs"
            >
              Services
            </Link>
            <Link
              href="/projects"
              className="text-[#86868b] hover:text-[#1d1d1f] transition-colors duration-200 text-xs"
            >
              Work
            </Link>
            <Link
              href="/#about"
              className="text-[#86868b] hover:text-[#1d1d1f] transition-colors duration-200 text-xs"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
