"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const codeSnippets = [
  {
    lang: "Swift",
    filename: "HydrationModel.swift",
    code: `struct HydrationModel {
  @Published var intake: Double
  
  func predict() -> Recommendation {
    MLModel.run(with: intake)
  }
}`,
  },
  {
    lang: "TypeScript",
    filename: "api/analytics.ts",
    code: `export async function POST(req: Request) {
  const { event, data } = await req.json()
  
  await analytics.track({
    event, data, timestamp: Date.now()
  })
}`,
  },
  {
    lang: "React",
    filename: "Dashboard.tsx",
    code: `export function Dashboard() {
  const { data } = useSWR('/api/metrics')
  
  return (
    <motion.div animate={{ opacity: 1 }}>
      <MetricsGrid data={data} />
    </motion.div>
  )
}`,
  },
];

interface AnimatedCodeBlockProps {
  className?: string;
}

export function AnimatedCodeBlock({ className = "" }: AnimatedCodeBlockProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedCode, setDisplayedCode] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const snippet = codeSnippets[currentIndex];
    let charIndex = 0;
    setIsTyping(true);
    setDisplayedCode("");

    const typeInterval = setInterval(() => {
      if (charIndex < snippet.code.length) {
        setDisplayedCode(snippet.code.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        
        // Wait then switch to next snippet
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % codeSnippets.length);
        }, 3000);
      }
    }, 25);

    return () => clearInterval(typeInterval);
  }, [currentIndex]);

  const currentSnippet = codeSnippets[currentIndex];

  return (
    <motion.div
      className={`relative rounded-2xl border border-white/[0.06] bg-black/60 backdrop-blur-xl overflow-hidden shadow-2xl shadow-black/50 ${className}`}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.04] bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <AnimatePresence mode="wait">
            <motion.span
              key={currentSnippet.filename}
              className="ml-3 font-mono text-[11px] text-zinc-500"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
            >
              {currentSnippet.filename}
            </motion.span>
          </AnimatePresence>
        </div>
        <motion.span
          className="font-mono text-[9px] uppercase tracking-wider text-zinc-600"
          animate={{ opacity: isTyping ? [0.5, 1, 0.5] : 1 }}
          transition={{ duration: 0.8, repeat: isTyping ? Infinity : 0 }}
        >
          {currentSnippet.lang}
        </motion.span>
      </div>

      {/* Code */}
      <div className="p-4 font-mono text-[11px] leading-relaxed">
        <pre className="text-zinc-300 whitespace-pre-wrap">
          {displayedCode}
          {isTyping && (
            <motion.span
              className="inline-block w-1.5 h-4 bg-[var(--accent)] ml-0.5 align-middle"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
          )}
        </pre>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-1.5 pb-3">
        {codeSnippets.map((_, index) => (
          <motion.span
            key={index}
            className="w-1 h-1 rounded-full"
            animate={{
              backgroundColor: index === currentIndex ? "rgb(0, 113, 227)" : "rgb(63, 63, 70)",
              scale: index === currentIndex ? 1.2 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </motion.div>
  );
}
