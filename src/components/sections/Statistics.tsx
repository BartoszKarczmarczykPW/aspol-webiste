"use client";

import { memo } from 'react';

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useInView } from "@/hooks/useInView";
import { StatItemProps } from "@/types";
import { getStatistics } from "@/lib/sanity";

function StatItem({ end, label, suffix = "", duration = 2000 }: StatItemProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, 0.3);

  useEffect(() => {
    if (!isVisible) return;

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
  }, [isVisible, end, duration]);

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

const Statistics = memo(function Statistics() {
  const { language } = useLanguage();

  const fallbackLabels = {
    en: {
      members: "Active Members",
      events: "Annual Events",
      forums: "Paris Polish Forum Editions",
      years: "Years Active",
    },
    fr: {
      members: "Membres Actifs",
      events: "Événements Annuels",
      forums: "Éditions Paris Polish Forum",
      years: "Années d'Activité",
    },
    pl: {
      members: "Aktywnych Członków",
      events: "Wydarzenia Rocznie",
      forums: "Edycji Paris Polish Forum",
      years: "Lat Działalności",
    },
  };

  const currentLabels = fallbackLabels[language] || fallbackLabels.en;

  const fallbackItems = [
    {
      value: 350,
      suffix: "+",
      label: {
        en: fallbackLabels.en.members,
        fr: fallbackLabels.fr.members,
        pl: fallbackLabels.pl.members,
      },
    },
    {
      value: 25,
      suffix: "+",
      label: {
        en: fallbackLabels.en.events,
        fr: fallbackLabels.fr.events,
        pl: fallbackLabels.pl.events,
      },
    },
    {
      value: 10,
      suffix: "",
      label: {
        en: fallbackLabels.en.forums,
        fr: fallbackLabels.fr.forums,
        pl: fallbackLabels.pl.forums,
      },
    },
    {
      value: 10,
      suffix: "",
      label: {
        en: fallbackLabels.en.years,
        fr: fallbackLabels.fr.years,
        pl: fallbackLabels.pl.years,
      },
    },
  ];

  const [items, setItems] = useState<
    Array<{
      value: number;
      suffix?: string;
      order?: number;
      label?: { en?: string; fr?: string; pl?: string };
    }>
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function loadStats() {
      try {
        const data = await getStatistics();
        if (!mounted) return;
        if (data?.items?.length) {
          setItems(
            [...data.items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
          );
        } else {
          setItems([]);
        }
      } catch (error) {
        if (mounted) setItems([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadStats();
    return () => {
      mounted = false;
    };
  }, []);

  const resolvedItems = !loading && items.length > 0 ? items : null;

  return (
    <section className="py-16 px-6 bg-aspol-white">
      {/* Container - Professional Dashboard Panel */}
      <div className="max-w-7xl mx-auto bg-aspol-dark rounded-xl shadow-xl shadow-aspol-navy/10 overflow-hidden relative border border-aspol-navy/20">

        {/* Background Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl mix-blend-overlay -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl mix-blend-overlay translate-y-1/2 -translate-x-1/2"></div>
        {/* CSS Grid Pattern - no external file needed */}

        <div className="relative z-10 py-12 sm:py-16 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {(resolvedItems || fallbackItems).map((item, index) => {
              const label = item.label
                ? item.label[language] || item.label.en || ""
                : index === 0
                  ? currentLabels.members
                  : index === 1
                    ? currentLabels.events
                    : index === 2
                      ? currentLabels.forums
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
