"use client";

import React, { useRef, useEffect, useState } from "react";

interface ScrollRevealTextProps {
  text: string;
  className?: string;
}

export default function ScrollRevealText({ text, className = "" }: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const element = containerRef.current;
      const { top } = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress: 0 when element enters viewport, 1 when it leaves (or centers)
      // Let's make it fully revealed when it's in the center
      const start = windowHeight * 0.8; // Starts revealing when element is at 80% viewport height
      const end = windowHeight * 0.4;   // Fully revealed at 40% viewport height

      let progress = (start - top) / (start - end);
      progress = Math.min(Math.max(progress, 0), 1);

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const words = text.split(" ");

  return (
    <div ref={containerRef} className={`flex flex-wrap justify-center ${className}`}>
      {words.map((word, i) => {
        // Calculate the threshold for this specific word
        const start = i / words.length;
        const end = start + (1 / words.length);
        
        // Map the global scrollProgress to this word's opacity
        // If scrollProgress is past this word's 'end', it's opacity 1
        // If scrollProgress is before 'start', it's opacity 0.1
        // In between is interpolated
        
        // Even smoother: calculate opacity based on distance from current progress
        const wordProgress = (scrollProgress - start) / (end - start);
        let opacity = 0.1; // Base opacity
        if (scrollProgress > end) opacity = 1;
        else if (scrollProgress > start) opacity = 0.1 + (wordProgress * 0.9);

        return (
          <span
            key={i}
            className="transition-opacity duration-200 mr-[0.25em]"
            style={{ opacity }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
}
