"use client";

import { motion } from "framer-motion";

const techStack = [
  { name: "Next.js", color: "#000", textColor: "#fff", icon: "▲" },
  { name: "React", color: "#61dafb", textColor: "#000", icon: "⚛" },
  { name: "Swift", color: "#f05138", textColor: "#fff", icon: "🔶" },
  { name: "TypeScript", color: "#3178c6", textColor: "#fff", icon: "TS" },
  { name: "Flutter", color: "#02569b", textColor: "#fff", icon: "◇" },
  { name: "Tailwind", color: "#38bdf8", textColor: "#000", icon: "〰" },
];

interface FloatingTechBadgesProps {
  className?: string;
}

export function FloatingTechBadges({ className = "" }: FloatingTechBadgesProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {techStack.map((tech, index) => {
        // Position badges in different areas
        const positions = [
          { top: "15%", left: "8%" },
          { top: "25%", right: "12%" },
          { top: "55%", left: "5%" },
          { top: "65%", right: "8%" },
          { top: "80%", left: "15%" },
          { top: "40%", right: "5%" },
        ];
        const pos = positions[index % positions.length];
        
        return (
          <motion.div
            key={tech.name}
            className="absolute hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.06] bg-black/40 backdrop-blur-xl shadow-xl"
            style={pos}
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ 
              opacity: 0.7, 
              scale: 1, 
              y: 0,
            }}
            transition={{
              delay: 1.5 + index * 0.15,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ 
              opacity: 1, 
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
          >
            <motion.div
              animate={{
                y: [0, -4, 0, 4, 0],
              }}
              transition={{
                duration: 5 + index,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex items-center gap-2"
            >
              <span 
                className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold"
                style={{ backgroundColor: tech.color, color: tech.textColor }}
              >
                {tech.icon}
              </span>
              <span className="text-[11px] font-medium text-zinc-400">{tech.name}</span>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
