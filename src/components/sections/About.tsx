"use client";

import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import SpotlightCard from "@/components/ui/cards/SpotlightCard"; // Import SpotlightCard
import RippleButton from "@/components/ui/RippleButton";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Link from "next/link";
import { GraduationIcon } from "@/components/icons/GraduationIcon";
import { UsersIcon } from "@/components/icons/UsersIcon";
import { RocketIcon } from "@/components/icons/RocketIcon";
import { GlobeIcon } from "@/components/icons/GlobeIcon";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useScrollAnimation(sectionRef);

  return (
    <section id="about" ref={sectionRef} className="relative py-16 sm:py-20 px-4 sm:px-6 bg-transparent overflow-hidden">

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20 fade-in-element opacity-0">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider text-aspol-navy uppercase bg-aspol-navy/5 rounded-full border border-aspol-navy/10 backdrop-blur-sm">
            Our Mission
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-aspol-dark mb-6 sm:mb-8 px-2 tracking-tight">
            {t.about.title}
          </h2>
          <p className="text-lg sm:text-xl text-aspol-navy/80 max-w-3xl mx-auto mb-3 sm:mb-4 px-2 font-medium">
            {t.about.subtitle}
          </p>
          <p className="text-base sm:text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed px-2">
            {t.about.description}
          </p>


        </div>

        {/* Features Layout */}
        <div className="space-y-8">
          {/* Main Feature: Pathway to French Universities */}
          {t.about.features.length > 0 && (() => {
            const pathwayFeature = t.about.features[0];
            return (
              <Link href="/pathway" className="block group">
                <SpotlightCard className="fade-in-element opacity-0 p-1 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden border-2 border-aspol-red/10 hover:border-aspol-red/30">
                  <div className="flex flex-col md:flex-row items-center p-6 md:p-8 gap-6 md:gap-8 h-full relative">
                    {/* Icon */}
                    <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 bg-linear-to-br from-red-600 to-red-500 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                      <GraduationIcon className="w-8 h-8 md:w-10 md:h-10" />
                    </div>

                    {/* Content */}
                    <div className="text-center md:text-left flex-1">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-aspol-red transition-colors">
                        {pathwayFeature.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-2xl">
                        {pathwayFeature.description}
                      </p>
                      <div className="mt-3 inline-flex items-center text-aspol-red font-bold text-base group-hover:translate-x-2 transition-transform">
                        {t.about.pathwayButton || "Learn More"} <span className="ml-2 text-lg">→</span>
                      </div>
                    </div>

                    {/* Decorative Arrow */}
                    <div className="hidden md:block absolute right-8 top-1/2 -translate-y-1/2 text-aspol-red/10 group-hover:text-aspol-red/20 transition-colors">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </div>
                  </div>
                </SpotlightCard>
              </Link>
            );
          })()}

          {/* Secondary Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {t.about.features.slice(1).map((feature, index) => {
              const icons = [
                <UsersIcon key="1" className="w-12 h-12" />,
                <RocketIcon key="2" className="w-12 h-12" />,
                <GlobeIcon key="3" className="w-12 h-12" />
              ];

              return (
                <SpotlightCard
                  key={index}
                  className="fade-in-element opacity-0 p-1 sm:p-1 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
                >
                  <div className="flex flex-col items-center text-center p-5 sm:p-7 h-full w-full">
                    {/* Icon */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-linear-to-br from-red-600 to-red-500 rounded-xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-300 relative z-10 shadow-md">
                      {icons[index]}
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 relative z-10 group-hover:text-red-700 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed relative z-10">
                      {feature.description}
                    </p>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

