"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import SpotlightCard from "@/components/ui/cards/SpotlightCard";
import SocialShare from "@/components/ui/SocialShare";
import { useInView } from "@/hooks/useInView";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { getInitiatives } from "@/lib/sanity";

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
  const { t, language } = useLanguage();
  const [initiativesData, setInitiativesData] = useState<
    Array<{
      featured?: boolean;
      icon?: string;
      title?: { en?: string; fr?: string; pl?: string };
      badge?: { en?: string; fr?: string; pl?: string };
      description?: { en?: string; fr?: string; pl?: string };
    }>
  >([]);

  useScrollAnimation(sectionRef);

  useEffect(() => {
    let mounted = true;
    async function loadInitiatives() {
      try {
        const data = await getInitiatives();
        if (!mounted) return;
        if (Array.isArray(data)) setInitiativesData(data);
      } catch (error) {
        if (mounted) setInitiativesData([]);
      }
    }
    loadInitiatives();
    return () => {
      mounted = false;
    };
  }, []);

  const fallbackInitiatives = [
    { icon: 'forum', data: t.events.parisforum },
    { icon: 'mentoring', data: t.events.mentoring },
    { icon: 'community', data: t.events.community },
  ];

  const initiatives = (initiativesData.length
    ? initiativesData.map((item) => ({
      icon: item.icon || 'forum',
      data: {
        title: item.title?.[language] || item.title?.en || '',
        badge: item.badge?.[language] || item.badge?.en || '',
        description: item.description?.[language] || item.description?.en || '',
      },
      featured: item.featured,
    }))
    : fallbackInitiatives.map((item) => ({
      icon: item.icon,
      data: item.data,
      featured: item.icon === 'forum',
    })))
    .map((item) => ({
      ...item,
      iconNode:
        item.icon === 'mentoring' ? <MentoringIcon className="w-8 h-8" /> :
        item.icon === 'community' ? <UsersIcon className="w-8 h-8" /> :
        <ForumIcon className="w-8 h-8" />,
      iconNodeSmall:
        item.icon === 'mentoring' ? <MentoringIcon className="w-6 h-6" /> :
        item.icon === 'community' ? <UsersIcon className="w-6 h-6" /> :
        <ForumIcon className="w-6 h-6" />,
    }));

  const featured = initiatives.find((item) => item.featured) || initiatives[0];
  const secondary = initiatives.filter((item) => item !== featured);

  return (
    <section
      id="events"
      ref={sectionRef}
      className="relative py-16 sm:py-24 px-6 bg-aspol-white overflow-hidden border-t border-gray-100"
    >
      {/* Background accents */}
      <div className="absolute -top-40 right-0 h-80 w-80 rounded-full bg-red-500/10 blur-3xl"></div>
      <div className="absolute -bottom-40 left-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-14 sm:mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
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

        {/* Initiatives Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Featured Initiative */}
          <SpotlightCard
            className={`lg:col-span-5 border-aspol-navy/10 bg-white/80 p-1 shadow-lg transition-all duration-500 fade-in-element opacity-0 group ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            spotlightColor="rgba(15, 23, 42, 0.08)"
          >
            <div className="flex flex-col h-full p-7 sm:p-8 rounded-2xl bg-white">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-red-600 to-red-500 text-white flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105">
                  {featured.iconNode}
                </div>
                <span className="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-700 text-xs font-bold tracking-wider uppercase rounded-full transition-colors duration-300 group-hover:bg-red-100">
                  {featured.data.badge}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 transition-colors duration-300 group-hover:text-aspol-red">
                {featured.data.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg mb-8">
                {featured.data.description}
              </p>

              <div className="mt-auto pt-6 border-t border-gray-100 flex justify-start">
                <SocialShare
                  url={`https://aspol.fr/events#${featured.data.title.toLowerCase().replace(/\s+/g, "-")}`}
                  title={`${featured.data.title} - ASPOL`}
                  description={featured.data.description}
                />
              </div>
            </div>
          </SpotlightCard>

          {/* Secondary Initiatives */}
          <div className="lg:col-span-7 space-y-6">
            {secondary.map((initiative, index) => (
              <SpotlightCard
                key={index}
                className={`border-gray-100 bg-white/80 p-1 shadow-md transition-all duration-500 hover:-translate-y-1 fade-in-element opacity-0 group ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                spotlightColor="rgba(220, 38, 38, 0.12)"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-6 p-6 sm:p-7 rounded-2xl bg-white">
                  <div className="w-12 h-12 rounded-xl bg-aspol-navy text-white flex items-center justify-center shrink-0 shadow-sm transition-all duration-300 group-hover:bg-aspol-red group-hover:scale-105">
                    {initiative.iconNodeSmall}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 transition-colors duration-300 group-hover:text-aspol-red">
                        {initiative.data.title}
                      </h3>
                      <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold tracking-wider uppercase rounded-full transition-colors duration-300 group-hover:bg-red-50 group-hover:text-red-600">
                        {initiative.data.badge}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {initiative.data.description}
                    </p>
                  </div>

                  <div className="sm:pl-4 sm:border-l sm:border-gray-100">
                    <SocialShare
                      url={`https://aspol.fr/events#${initiative.data.title.toLowerCase().replace(/\s+/g, "-")}`}
                      title={`${initiative.data.title} - ASPOL`}
                      description={initiative.data.description}
                    />
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-14 sm:mt-16 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
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
