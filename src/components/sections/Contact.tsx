"use client";

import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

export function Contact() {
  return (
    <section
      id="contact"
      className="py-24 md:py-32 px-6 bg-background relative overflow-hidden"
    >
      {/* Subtle gradient backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 50% 80%, rgba(99,102,241,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Centered card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease }}
        className="max-w-[800px] mx-auto bg-background-secondary rounded-3xl p-12 md:p-16 relative z-10"
      >
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="font-display text-3xl md:text-4xl font-medium text-foreground text-center mb-4"
        >
          Have a project in mind?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          className="text-foreground-secondary text-center text-lg max-w-md mx-auto mb-10"
        >
          We&apos;re currently taking on new projects. Reach out and let&apos;s
          discuss how we can bring your vision to life.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <Link
            href="mailto:anoop@flutterly.co.uk"
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-accent text-white font-medium text-[15px] hover:bg-accent-hover transition-colors duration-200 w-full sm:w-auto justify-center"
          >
            <Mail size={16} />
            anoop@flutterly.co.uk
          </Link>

          <Link
            href="tel:+447780580534"
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-accent text-accent font-medium text-[15px] hover:bg-accent-muted transition-colors duration-200 w-full sm:w-auto justify-center"
          >
            <Phone size={16} />
            +44 7780 580534
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
