"use client";

import { useEffect, useRef, useState, type ElementType } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  /** Plain text of the headline. Words are masked and slide up in sequence. */
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  /** Start the reveal on mount instead of when scrolled into view (hero). */
  immediate?: boolean;
  /** Offset (in words) so a second line can follow the first. */
  startAt?: number;
}

/**
 * Headline word-mask reveal: the single recurring scroll motion on the site.
 * Each word rises out of an overflow-hidden mask (`.rw` in globals.css).
 * Screen readers get the full string via aria-label; reduced-motion users get
 * the final state through the global prefers-reduced-motion rule.
 * `immediate` (hero) uses a CSS-only entrance (`.is-now`), so the headline paints without waiting for JS.
 */
export default function Reveal({ text, as = "h2", className, immediate, startAt = 0 }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (immediate) {
      const id = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [immediate]);

  const words = text.split(/\s+/).filter(Boolean);

  const Tag = as as ElementType;

  return (
    <Tag ref={ref} className={cn(immediate ? "is-now" : inView && "is-in", className)} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="rw" aria-hidden="true">
          <span style={{ ["--i" as string]: i + startAt }}>{word}</span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
