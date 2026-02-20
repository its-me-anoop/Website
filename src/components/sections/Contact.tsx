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
      {/* Decorative organic shapes */}
      <div
        className="absolute top-16 -left-24 w-72 h-72 rounded-full opacity-40 pointer-events-none"
        style={{ background: "rgba(139, 158, 126, 0.15)" }}
      />
      <div
        className="absolute bottom-12 -right-20 w-64 h-64 rounded-full opacity-30 pointer-events-none"
        style={{ background: "rgba(184, 112, 77, 0.08)" }}
      />
      <div
        className="absolute top-1/2 right-1/4 w-40 h-40 rounded-full opacity-20 pointer-events-none"
        style={{ background: "rgba(139, 158, 126, 0.15)" }}
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
