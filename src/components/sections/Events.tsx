"use client";

import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import GlassCard from "@/components/ui/cards/GlassCard";
import SocialShare from "@/components/ui/SocialShare";
import { useInView } from "@/hooks/useInView";

// Inline Icons to prevent import errors
const ForumIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
  </svg>
);

const MentoringIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const UsersIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

export default function Events() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useInView(sectionRef);
  const { t } = useLanguage();

  const initiatives = [
    {
      icon: <ForumIcon className="w-8 h-8" />,
      data: t.events.parisforum,
    },
    {
      icon: <MentoringIcon className="w-8 h-8" />,
      data: t.events.mentoring,
    },
    {
      icon: <UsersIcon className="w-8 h-8" />,
      data: t.events.community,
    },
  ];

  return (
    <section
      id="events"
      ref={sectionRef}
      className="relative py-16 sm:py-24 px-6 bg-gray-50 overflow-hidden border-t border-gray-100"
    >
      {/* Background Pattern - Consistent Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#122348_1px,transparent_1px),linear-gradient(to_bottom,#122348_1px,transparent_1px)] bg-size-[40px_40px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 sm:mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block py-1 px-3 rounded-full bg-aspol-navy/5 border border-aspol-navy/10 text-aspol-navy text-xs font-bold tracking-widest uppercase mb-4">
            Networking & Growth
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-aspol-dark mb-6 px-2 tracking-tight">
            {t.events.title}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-2 leading-relaxed">
            {t.events.subtitle}
          </p>
        </div>

        {/* Initiatives Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {initiatives.map((initiative, index) => (
            <GlassCard
              key={index}
              className={`p-8 h-full group hover:-translate-y-2 transition-transform duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
              <div className="relative z-10 flex flex-col items-center text-center h-full">
                {/* Icon Container with Glow */}
                <div className="relative mb-8">
                  <div className="relative w-16 h-16 bg-aspol-white rounded-lg flex items-center justify-center text-aspol-navy group-hover:bg-aspol-red group-hover:text-white transition-all duration-300 shadow-sm border border-gray-100 group-hover:border-transparent group-hover:-translate-y-1">
                    {initiative.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-red-700 transition-colors">
                  {initiative.data.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-6 grow">
                  {initiative.data.description}
                </p>

                {/* Badge */}
                <span className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-600 text-xs font-bold tracking-wider uppercase rounded-full group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
                  {initiative.data.badge}
                </span>

                {/* Social Share */}
                <div className="mt-8 pt-8 w-full border-t border-gray-100 group-hover:border-red-50 transition-colors flex justify-center">
                  <SocialShare
                    url={`https://aspol.fr/events#${initiative.data.title.toLowerCase().replace(/\s+/g, '-')}`}
                    title={`${initiative.data.title} - ASPOL`}
                    description={initiative.data.description}
                  />
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-gray-600 mb-6 text-lg">
            {t.events.cta}
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSebv4I-YbT98Y732JaGTqTfxDYpeGQAxUHybgzntkyai_VEwg/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-red-600 text-white text-lg font-semibold rounded-full hover:bg-red-700 transition-all duration-200 hover:scale-105 shadow-lg"
          >
            {t.events.joinButton}
          </a>
        </div>
      </div>
    </section>
  );
}
