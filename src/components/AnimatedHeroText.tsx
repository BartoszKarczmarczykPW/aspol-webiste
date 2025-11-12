"use client";

import { useEffect, useRef } from "react";

export default function AnimatedHeroText({ text }: { text: string }) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!textRef.current) return;

      const { left, top, width, height } = textRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      const rotateX = y * 10;
      const rotateY = x * -10;

      textRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    };

    const handleMouseLeave = () => {
      if (!textRef.current) return;
      textRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    };

    const element = textRef.current;
    if (element) {
      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div
      ref={textRef}
      className="relative inline-block transition-transform duration-200 ease-out cursor-pointer"
      style={{
        textShadow: "0 5px 15px rgba(220, 38, 38, 0.3)",
      }}
    >
      <span className="relative z-10 bg-clip-text text-transparent bg-linear-to-r from-red-600 via-red-500 to-red-700 font-bold">
        {text}
      </span>
      <span
        className="absolute inset-0 bg-clip-text text-transparent bg-linear-to-r from-red-700 via-red-600 to-red-800 font-bold blur-sm opacity-50"
        aria-hidden="true"
      >
        {text}
      </span>
    </div>
  );
}
