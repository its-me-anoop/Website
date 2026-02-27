"use client";

import { motion } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";
import Link from "next/link";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

export function Contact() {
  return (
    <section
      id="contact"
      className="py-24 md:py-32 px-4 md:px-10 bg-background border-t border-border overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto text-center">
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
        >
             <h2 className="text-[12vw] md:text-[10vw] font-display font-bold text-foreground leading-[0.8] mb-10 tracking-tighter">
                LET&apos;S TALK
            </h2>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
            <Link
                href="mailto:anoop@flutterly.co.uk"
                className="group relative inline-flex items-center gap-4 px-10 py-5 rounded-full bg-foreground text-background text-lg font-bold uppercase tracking-wide overflow-hidden"
            >
                <span className="relative z-10 group-hover:text-foreground transition-colors duration-300">Email Us</span>
                 <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                 <ArrowRight className="relative z-10 group-hover:text-foreground transition-colors duration-300 group-hover:translate-x-1 transition-transform" />
            </Link>

             <Link
                href="tel:+447780580534"
                className="group relative inline-flex items-center gap-4 px-10 py-5 rounded-full border border-border text-foreground text-lg font-bold uppercase tracking-wide overflow-hidden hover:border-accent"
            >
                 <span className="relative z-10 group-hover:text-background transition-colors duration-300">Call Us</span>
                 <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                 <Phone size={20} className="relative z-10 group-hover:text-background transition-colors duration-300" />
            </Link>
        </motion.div>
      </div>
    </section>
  );
}
