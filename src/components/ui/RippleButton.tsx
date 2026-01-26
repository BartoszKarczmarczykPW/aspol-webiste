"use client";

import { MouseEvent, useState } from "react";

interface RippleButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  target?: string;
  rel?: string;
}

interface Ripple {
  x: number;
  y: number;
  size: number;
  id: number;
}

export default function RippleButton({ 
  children, 
  href, 
  onClick, 
  className = "",
  target,
  rel 
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const addRipple = (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const newRipple = {
      x,
      y,
      size,
      id: Date.now(),
    };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);
  };

  const baseClassName = `relative overflow-hidden ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={baseClassName}
        onClick={(e) => {
          addRipple(e);
          onClick?.();
        }}
      >
        {children}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute bg-white/30 rounded-full animate-ripple pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
            }}
          />
        ))}
      </a>
    );
  }

  return (
    <button
      className={baseClassName}
      onClick={(e) => {
        addRipple(e);
        onClick?.();
      }}
    >
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ripple pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
    </button>
  );
}
