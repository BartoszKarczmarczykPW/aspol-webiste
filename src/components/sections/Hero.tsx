"use client";

import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import RippleButton from "@/components/ui/RippleButton";
import SmoothBackground from "@/components/ui/effects/SmoothBackground";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ChevronDownIcon } from "@/components/icons/ChevronDownIcon";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useScrollAnimation(heroRef);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[90vh] flex items-center justify-center px-6 pt-32 pb-20 overflow-hidden"
    >
      {/* Smooth Animated Background */}
      <SmoothBackground />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="flex flex-col items-center text-center">

          {/* Badge/Label */}
          <div className="fade-in-element opacity-0 mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-aspol-navy/5 border border-aspol-navy/10">
            <span className="w-2 h-2 rounded-full bg-aspol-red animate-pulse"></span>
            <span className="text-sm font-semibold tracking-wide text-aspol-navy uppercase">
              Est. 2017 &bull; Paris, France
            </span>
          </div>

          {/* Main heading */}
          <div className="fade-in-element opacity-0 mb-8">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-aspol-dark mb-4">
              <span className="block leading-tight">{t.hero.welcome}</span>
              <span className="block text-aspol-red">
                ASPOL
              </span>
            </h1>
          </div>

          {/* Description */}
          <div className="fade-in-element opacity-0 mb-12 max-w-2xl" style={{ animationDelay: "0.1s" }}>
            <p className="text-xl md:text-2xl text-aspol-navy/80 leading-relaxed font-light">
              {t.hero.subtitle}
            </p>
            <p className="text-lg text-gray-500 mt-4 leading-relaxed">
              {t.hero.description}
            </p>
          </div>

          {/* CTA Buttons - Professional Styling */}
          <div className="fade-in-element opacity-0 flex flex-col sm:flex-row gap-4 w-full sm:w-auto" style={{ animationDelay: "0.2s" }}>
            <RippleButton
              href="https://docs.google.com/forms/d/e/1FAIpQLSebv4I-YbT98Y732JaGTqTfxDYpeGQAxUHybgzntkyai_VEwg/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-aspol-red text-white text-lg font-semibold rounded-lg hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-aspol-red/20 hover:-translate-y-0.5"
            >
              {t.hero.joinButton}
            </RippleButton>
            <RippleButton
              href="/partners"
              className="px-8 py-4 bg-white text-aspol-navy text-lg font-semibold rounded-lg border-2 border-aspol-navy/10 hover:border-aspol-navy hover:bg-aspol-navy hover:text-white transition-all duration-300"
            >
              {t.hero.partnerButton || "Become a Partner"}
            </RippleButton>
          </div>

        </div>

        {/* Bottom Stats Strip (Optional, Professional Touch) */}
        <div className="fade-in-element opacity-0 mt-20 pt-8 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-8 text-center" style={{ animationDelay: "0.3s" }}>
          {/* We can move simple stats here or just leave it clean. Let's start with scroll indicator */}
          <div className="col-span-full flex justify-center">
            <div className="flex flex-col items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
              <span className="text-xs font-semibold uppercase tracking-widest text-aspol-navy/40">{t.hero.scrollDown}</span>
              <ChevronDownIcon className="w-5 h-5 text-aspol-red animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

