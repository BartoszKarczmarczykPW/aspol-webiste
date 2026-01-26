"use client";

import React, { useRef, useState } from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  enableSpotlight?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  enableSpotlight = true,
}: GlassCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || !enableSpotlight) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    if (enableSpotlight) setOpacity(1);
  };

  const handleMouseLeave = () => {
    if (enableSpotlight) setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-2xl border border-white/20 bg-white/70 backdrop-blur-md shadow-lg transition-all duration-300 hover:shadow-xl ${className}`}
    >
      {/* Spotlight Effect */}
      {enableSpotlight && (
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
          style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(20, 61, 115, 0.08), transparent 40%)`,
          }}
        />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
