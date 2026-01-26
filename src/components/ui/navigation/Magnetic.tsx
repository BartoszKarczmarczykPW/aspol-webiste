"use client";

import { useRef, useState, MouseEvent } from "react";

interface MagneticProps {
  children: React.ReactNode;
  strength?: number; // How strong the pull is. Higher = moves more. Default 50.
  active?: boolean;
}

export default function Magnetic({ children, strength = 30, active = true }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !active) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Calculate distance from center
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    
    // Scale movement by strength (0 to 1 range roughly, assuming strength ~ 10-50)
    // Old hardcoded was 0.5. Let's make strength=50 be 0.5
    const factor = strength / 100;
    setPosition({ x: x * factor, y: y * factor });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: "transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
      className="inline-block"
    >
      {children}
    </div>
  );
}
