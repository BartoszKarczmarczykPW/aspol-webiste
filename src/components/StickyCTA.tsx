"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-fade-in">
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSebv4I-YbT98Y732JaGTqTfxDYpeGQAxUHybgzntkyai_VEwg/viewform"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-3 px-6 py-4 bg-red-600 text-white font-semibold rounded-full shadow-2xl hover:bg-red-700 transition-all duration-300 hover:scale-105"
        aria-label={t.hero?.joinButton || "Join ASPOL"}
      >
        {/* Pulse animation ring */}
        <span className="absolute inset-0 rounded-full bg-red-600 animate-ping opacity-20"></span>
        
        {/* Icon */}
        <svg 
          className="w-5 h-5 relative z-10" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 4v16m8-8H4" 
          />
        </svg>
        
        {/* Text */}
        <span className="relative z-10 hidden sm:inline">
          {t.hero?.joinButton || "Join ASPOL"}
        </span>
        
        {/* Arrow */}
        <svg 
          className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 5l7 7-7 7" 
          />
        </svg>
      </a>
    </div>
  );
}
