"use client";

import { useEffect, useState } from "react";

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [percent, setPercent] = useState(0);
  const [isExit, setIsExit] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  useEffect(() => {
    // Simulated progress logic
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 99) return 99;
        const diff = 100 - prev;
        const inc = Math.max(1, Math.floor(diff * 0.1));
        return prev + inc;
      });
    }, 80);

    const handleLoad = () => {
      clearInterval(interval);
      setPercent(100);

      setTimeout(() => {
        setIsExit(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 300); // Reduced exit animation time
      }, 100);
    };

    if (typeof window !== 'undefined') {
      if (document.readyState === "complete") {
        handleLoad();
      } else {
        window.addEventListener("load", handleLoad);
      }
    }

    const safetyTimer = setTimeout(() => {
      if (!isExit) handleLoad();
    }, 300); // Reduced safety timer from 2000ms to 300ms

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimer);
      if (typeof window !== 'undefined') {
        window.removeEventListener("load", handleLoad);
      }
    };
  }, [isExit]);

  if (!mounted) return null;
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center pointer-events-none">
      {/* Background Shutters */}
      <div className="absolute inset-0 z-0 flex pointer-events-auto">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`h-full flex-1 bg-neutral-900 border-r border-blue-900/30 last:border-r-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${isExit ? '-translate-y-full' : 'translate-y-0'
              }`}
            style={{ transitionDelay: `${i * 40}ms` }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl px-4 pointer-events-none">

        {/* Main Brand Name */}
        <div className="overflow-hidden mb-6">
          <h1 className={`text-6xl md:text-8xl font-bold tracking-[0.2em] text-white transition-all duration-1000 delay-300 ${isExit ? 'translate-y-24 opacity-0' : 'translate-y-0 opacity-100'
            }`}>
            ASPOL
          </h1>
        </div>

        {/* Subtitle / Full Name */}
        <div className="overflow-hidden mb-12 text-center">
          <p className={`text-sm md:text-lg text-white/70 font-light tracking-widest uppercase transition-all duration-1000 delay-100 ${isExit ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
            }`}>
            Association des Étudiants Polonais en France
          </p>
        </div>

        {/* Progress Line */}
        <div className={`w-64 h-px bg-blue-900/30 overflow-hidden relative transition-opacity duration-500 ${isExit ? 'opacity-0' : 'opacity-100'}`}>
          <div
            className="absolute top-0 left-0 h-full bg-red-600 transition-all duration-200 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>

        {/* Percentage Number */}
        <div className={`mt-4 font-mono text-white/50 text-xs transition-opacity duration-300 ${isExit ? 'opacity-0' : 'opacity-100'}`}>
          {percent}%
        </div>

      </div>
    </div>
  );
}
