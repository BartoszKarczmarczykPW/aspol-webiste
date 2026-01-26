"use client";

import { useInView } from "@/hooks/useInView";
import { useRef } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  mode?: "word" | "char";
}

export default function TextReveal({ text, className = "", delay = 0, mode = "word" }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Lower threshold for better mobile detection, or if element starts in view
  const isVisible = useInView(ref, 0.1); 

  const items = mode === "word" ? text.split(" ") : text.split("");

  return (
    <div ref={ref} className={`inline-flex flex-wrap gap-[0.25em] justify-center ${className}`}>
      {items.map((item, index) => (
        <span
          key={index}
          className="inline-block transition-all duration-700 ease-out will-change-transform"
          style={{
            transform: isVisible ? "translateY(0)" : "translateY(100%)",
            opacity: isVisible ? 1 : 0,
            transitionDelay: `${delay + index * (mode === "word" ? 50 : 30)}ms`,
            clipPath: isVisible ? "inset(0 0 0 0)" : "inset(100% 0 0 0)",
          }}
        >
          {item === " " ? "\u00A0" : item}
        </span>
      ))}
    </div>
  );
}
