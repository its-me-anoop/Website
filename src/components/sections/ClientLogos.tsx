"use client";

import { motion } from "framer-motion";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

const clients = ["Sipstreak", "Greenmead", "JJ Paper", "Sandbourne"];

export function ClientLogos() {
  return (
    <section className="py-16 md:py-20 px-6 bg-background">
      <div className="max-w-[1200px] mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-xs font-medium text-foreground-tertiary uppercase tracking-widest mb-12"
        >
          Trusted By
        </motion.p>

        {/* Desktop: flex row with dividers */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="hidden md:flex items-center justify-center gap-0"
        >
          {clients.map((client, index) => (
            <div key={client} className="flex items-center">
              {index > 0 && (
                <div className="w-px h-8 bg-border-strong mx-10" />
              )}
              <span className="font-display text-xl font-medium text-foreground-secondary">
                {client}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Mobile: 2x2 grid */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="md:hidden grid grid-cols-2 gap-y-8"
        >
          {clients.map((client) => (
            <span
              key={client}
              className="font-display text-xl font-medium text-foreground-secondary"
            >
              {client}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
