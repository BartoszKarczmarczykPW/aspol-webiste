"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import RippleButton from "./RippleButton";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      const elements = heroRef.current.querySelectorAll(".fade-in-element");
      elements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20 pb-10 overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-br from-red-50 via-white to-gray-50"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-red-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto text-center">
        {/* Main heading */}
        <div className="fade-in-element opacity-0 mb-6">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 px-2">
            <span className="block text-gray-900">{t.hero.welcome}</span>
            <span className="block bg-linear-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
              ASPOL
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <div className="fade-in-element opacity-0 mb-8 sm:mb-12 px-2" style={{ animationDelay: "0.1s" }}>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t.hero.subtitle}
          </p>
          <p className="text-base sm:text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mt-3 sm:mt-4">
            {t.hero.description}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="fade-in-element opacity-0 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4" style={{ animationDelay: "0.2s" }}>
          <RippleButton
            href="https://docs.google.com/forms/d/e/1FAIpQLSebv4I-YbT98Y732JaGTqTfxDYpeGQAxUHybgzntkyai_VEwg/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-red-600 text-white text-lg font-semibold rounded-full hover:bg-red-700 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl touch-manipulation"
          >
            {t.hero.joinButton}
          </RippleButton>
          <RippleButton
            href="#contact"
            className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 text-lg font-semibold rounded-full border-2 border-gray-300 hover:border-red-600 hover:text-red-600 transition-all duration-200 touch-manipulation"
          >
            {t.hero.contactButton}
          </RippleButton>
        </div>

        {/* Scroll indicator */}
        <div className="fade-in-element opacity-0 mt-12 sm:mt-20 hidden sm:block" style={{ animationDelay: "0.3s" }}>
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-400 mb-2">{t.hero.scrollDown}</span>
            <svg
              className="w-6 h-6 text-gray-400 animate-bounce"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
