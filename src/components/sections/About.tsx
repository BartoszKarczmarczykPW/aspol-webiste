"use client";

import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import SpotlightCard from "@/components/ui/cards/SpotlightCard"; // Import SpotlightCard
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
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

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {t.about.features.map((feature, index) => {
            const icons = [
              <GraduationIcon key="0" className="w-12 h-12" />,
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
                  {/* Removed manual hover effects in favor of spotlight, but kept scale on icon */}
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
    </section>
  );
}

