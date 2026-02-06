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
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+44 7780 580534",
    href: "tel:+447780580534",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "Flat 21, 3 Erleigh Road, Reading RG1 5LR, UK",
    href: undefined,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
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
    <footer id="contact" className="relative pt-28 pb-12">
      <div
        className="absolute top-0 left-0 right-0 section-divider"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6">
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-sm font-medium uppercase tracking-widest text-blue-400 mb-4">
            Get In Touch
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let&apos;s Build Something Amazing
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-8">
            Ready to start your next project? Get in touch with us today for a
            free consultation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative h-12 w-48 mb-8">
              <Image
                src="/logo-tagline.png"
                alt="Flutterly Ltd - Build Beautiful Apps"
                fill
                className="object-contain object-left"
              />
            </div>

            <p className="text-gray-400 mb-10 max-w-md leading-relaxed">
              We&apos;re a UK-based digital agency passionate about creating
              exceptional digital experiences. Let&apos;s discuss how we can help
              bring your vision to life.
            </p>

            <div className="space-y-5">
              {contactInfo.map((item) => {
                const content = (
                  <div className="flex items-center gap-4 group">
                    <div
                      className={`w-11 h-11 rounded-xl ${item.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-gray-300 text-sm group-hover:text-white transition-colors duration-300">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block"
                  >
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
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/[0.08] flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <link.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-10 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-6"
            aria-label="Contact form"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="firstName"
                  className="text-sm font-medium text-gray-400"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all duration-300"
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="lastName"
                  className="text-sm font-medium text-gray-400"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all duration-300"
                  placeholder="Doe"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-400"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all duration-300"
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-sm font-medium text-gray-400"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all duration-300 h-32 resize-none"
                placeholder="Tell us about your project..."
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 font-semibold text-white hover:shadow-lg hover:shadow-blue-600/25 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              Send Message
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </motion.form>
        </div>

        {/* Bottom bar */}
        <div className="section-divider mb-8" aria-hidden="true" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Flutterly Ltd. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/#services"
              className="text-gray-600 hover:text-gray-400 transition-colors duration-300 text-sm"
            >
              Services
            </Link>
            <Link
              href="/projects"
              className="text-gray-600 hover:text-gray-400 transition-colors duration-300 text-sm"
            >
              Work
            </Link>
            <Link
              href="/#about"
              className="text-gray-600 hover:text-gray-400 transition-colors duration-300 text-sm"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
