"use client";

import { motion } from "framer-motion";

const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Swift",
  "SwiftUI",
  "Flutter",
  "Dart",
  "Node.js",
  "PostgreSQL",
  "Supabase",
  "AWS",
  "Vercel",
  "Tailwind CSS",
  "Framer Motion",
  "GraphQL",
  "REST APIs",
  "CI/CD",
  "Git",
];

interface TechMarqueeProps {
  className?: string;
}

export function TechMarquee({ className = "" }: TechMarqueeProps) {
  // Duplicate for seamless loop
  const items = [...technologies, ...technologies];

  return (
    <div className={`relative overflow-hidden py-6 ${className}`}>
      {/* Gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: [0, "-50%"] }}
        transition={{
          x: {
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {items.map((tech, index) => (
          <span
            key={`${tech}-${index}`}
            className="inline-flex items-center gap-2 text-zinc-500 font-mono text-sm tracking-wide"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]/40" />
            {tech}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
