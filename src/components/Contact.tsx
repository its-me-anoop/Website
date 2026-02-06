"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export default function Contact() {
  return (
    <footer id="contact" className="py-20 md:py-28">
      <div className="max-w-[980px] mx-auto px-6 lg:px-0">
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-100 mb-5">
            Let&apos;s talk.
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-[500px] mx-auto">
            Ready to start your next project? Get in touch for a free
            consultation.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 mb-20">
          {/* Left - Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative h-8 w-32 mb-10">
              <Image
                src="/logo-tagline.png"
                alt="Flutterly Ltd - Build Beautiful Apps"
                fill
                className="object-contain object-left"
              />
            </div>

            <p className="text-gray-400 mb-10 max-w-sm leading-relaxed">
              A UK-based digital agency passionate about creating exceptional
              digital experiences.
            </p>

            <div className="space-y-6">
              <a
                href="mailto:anoop@flutterly.co.uk"
                className="flex items-center gap-4 group"
              >
                <Mail className="w-5 h-5 text-gray-500 group-hover:text-apple-blue transition-colors" />
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  anoop@flutterly.co.uk
                </span>
              </a>
              <a
                href="tel:+447780580534"
                className="flex items-center gap-4 group"
              >
                <Phone className="w-5 h-5 text-gray-500 group-hover:text-apple-blue transition-colors" />
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  +44 7780 580534
                </span>
              </a>
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                <span className="text-gray-300">
                  Flat 21, 3 Erleigh Road
                  <br />
                  Reading RG1 5LR, United Kingdom
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="space-y-5"
            aria-label="Contact form"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm text-gray-400 mb-2"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className="w-full bg-surface border border-[#333336] rounded-xl px-4 py-3 text-gray-100 placeholder:text-gray-600 focus:outline-none focus:border-apple-blue focus:ring-1 focus:ring-apple-blue/30 transition-all"
                  placeholder="John"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm text-gray-400 mb-2"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className="w-full bg-surface border border-[#333336] rounded-xl px-4 py-3 text-gray-100 placeholder:text-gray-600 focus:outline-none focus:border-apple-blue focus:ring-1 focus:ring-apple-blue/30 transition-all"
                  placeholder="Doe"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gray-400 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full bg-surface border border-[#333336] rounded-xl px-4 py-3 text-gray-100 placeholder:text-gray-600 focus:outline-none focus:border-apple-blue focus:ring-1 focus:ring-apple-blue/30 transition-all"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm text-gray-400 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full bg-surface border border-[#333336] rounded-xl px-4 py-3 text-gray-100 placeholder:text-gray-600 focus:outline-none focus:border-apple-blue focus:ring-1 focus:ring-apple-blue/30 transition-all resize-none"
                placeholder="Tell us about your project..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-apple-blue text-white font-medium rounded-xl py-3.5 hover:bg-apple-blue-hover transition-colors duration-300"
            >
              Send Message
            </button>
          </motion.form>
        </div>

        {/* Footer bottom */}
        <div className="h-px bg-[#333336] mb-8" aria-hidden="true" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600">
            Copyright &copy; {new Date().getFullYear()} Flutterly Ltd. All
            rights reserved.
          </p>
          <div className="flex gap-8">
            <Link
              href="/#services"
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              Services
            </Link>
            <Link
              href="/projects"
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              Work
            </Link>
            <Link
              href="/#about"
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              About
            </Link>
            <a
              href="https://www.linkedin.com/in/anoop-jose-0b308a296/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
