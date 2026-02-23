"use client";

import { memo, useState, useEffect, useRef } from 'react';
import { useLanguage } from "@/contexts/LanguageContext";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSanityData } from "@/hooks/useSanityData";
import { StatItemProps } from "@/types";
import { getStatistics } from "@/lib/sanity";

function StatItem({ end, label, suffix = "", duration = 2000 }: StatItemProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, 0.3);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isVisible) return;

    // If user prefers reduced motion, show the final value immediately
    if (prefersReducedMotion) {
      setCount(end);
      return;
    }

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration, prefersReducedMotion]);

  return (
    <div ref={ref} className="text-center p-6">
      <div className="flex flex-col items-center">
        <div className="text-5xl sm:text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-linear-to-b from-white to-blue-200 mb-2 font-heading tracking-tight">
          {count}{suffix}
        </div>
        <div className="h-1 w-12 bg-red-500 rounded-full mb-4 opacity-80"></div>
        <p className="text-blue-100 font-medium text-sm sm:text-base uppercase tracking-wider">
          {label}
        </p>
      </div>
    </div>
  );
}

// --- Module-level constants (hoisted, zero re-allocation) ---
const FALLBACK_LABELS = {
  en: { members: "Active Members", events: "Annual Events", forums: "Paris Polish Forum Editions", years: "Years Active" },
  fr: { members: "Membres Actifs", events: "Événements Annuels", forums: "Éditions Paris Polish Forum", years: "Années d'Activité" },
  pl: { members: "Aktywnych Członków", events: "Wydarzenia Rocznie", forums: "Edycji Paris Polish Forum", years: "Lat Działalności" },
} as const;

interface StatDataItem {
  value: number;
  suffix?: string;
  order?: number;
  label?: { en?: string; fr?: string; pl?: string };
}

const FALLBACK_ITEMS: readonly StatDataItem[] = [
  { value: 350, suffix: "+", label: { en: FALLBACK_LABELS.en.members, fr: FALLBACK_LABELS.fr.members, pl: FALLBACK_LABELS.pl.members } },
  { value: 25, suffix: "+", label: { en: FALLBACK_LABELS.en.events, fr: FALLBACK_LABELS.fr.events, pl: FALLBACK_LABELS.pl.events } },
  { value: 10, suffix: "", label: { en: FALLBACK_LABELS.en.forums, fr: FALLBACK_LABELS.fr.forums, pl: FALLBACK_LABELS.pl.forums } },
  { value: 10, suffix: "", label: { en: FALLBACK_LABELS.en.years, fr: FALLBACK_LABELS.fr.years, pl: FALLBACK_LABELS.pl.years } },
] as const;

const Statistics = memo(function Statistics() {
  const { language } = useLanguage();

  const currentLabels = FALLBACK_LABELS[language] || FALLBACK_LABELS.en;

  const { data: items, loading } = useSanityData<StatDataItem[]>(
    async () => {
      const data = await getStatistics();
      if (!data?.items?.length) return null;
      return [...data.items].sort((a: StatDataItem, b: StatDataItem) => (a.order ?? 0) - (b.order ?? 0));
    },
    { fallback: [] },
  );

  const resolvedItems = !loading && items.length > 0 ? items : FALLBACK_ITEMS;

  return (
    <section className="py-16 px-6 bg-aspol-white" aria-label="Key statistics">
      <div className="max-w-7xl mx-auto bg-aspol-dark rounded-xl shadow-xl shadow-aspol-navy/10 overflow-hidden relative border border-aspol-navy/20">
        <h2 className="sr-only">ASPOL in Numbers</h2>

        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl mix-blend-overlay -translate-y-1/2 translate-x-1/2" aria-hidden="true"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl mix-blend-overlay translate-y-1/2 -translate-x-1/2" aria-hidden="true"></div>

        <div className="relative z-10 py-12 sm:py-16 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {resolvedItems.map((item, index) => {
              const label = item.label
                ? item.label[language] || item.label.en || ""
                : index === 0 ? currentLabels.members
                : index === 1 ? currentLabels.events
                : index === 2 ? currentLabels.forums
                : currentLabels.years;

              return (
                <StatItem
                  key={`stat-${index}`}
                  end={item.value}
                  label={label}
                  suffix={item.suffix || ""}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});

export default Statistics;
