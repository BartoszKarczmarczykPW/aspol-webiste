"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button"
      );
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", updateCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", updateCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  // Hide on mobile / touch devices
  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-9999 mix-blend-difference"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <div
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white transition-transform duration-100 ease-out will-change-transform"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${isPointer ? 2.5 : 1})`,
          width: "20px",
          height: "20px",
        }}
      />
    </div>
  );
}
