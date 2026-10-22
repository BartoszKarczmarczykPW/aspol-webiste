"use client";

import { memo, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSanityData } from "@/hooks/useSanityData";
import { StatItemProps } from "@/types";
import { getStatistics } from "@/lib/sanity";
import { PHOTOS } from "@/lib/photos";

function StatItem({ end, label, suffix = "", duration = 2200 }: StatItemProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, 0.3);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isVisible) return;

    // If user prefers reduced motion, show the final value immediately
    if (prefersReducedMotion) {
      const frame = requestAnimationFrame(() => setCount(end));
      return () => cancelAnimationFrame(frame);
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
    <div ref={ref} className="flex flex-col justify-between gap-6 border-t border-white/25 pt-6 sm:min-h-52">
      <div
        className="display text-[clamp(3.5rem,8vw,7.5rem)] leading-[0.85] tabular-nums"
        aria-label={`${end}${suffix}`}
      >
        <span aria-hidden="true">
          {count}
          {suffix}
        </span>
      </div>
      <p className="max-w-[18ch] font-display text-base font-bold leading-tight text-white/85 sm:text-lg">{label}</p>
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
  const { home, image } = useSiteContent();
  const statsImg = image(home.statsImage, 1600);

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
    <section
      className="on-dark dome-top relative overflow-hidden bg-aspol-dark pb-20 text-white sm:pb-28"
      aria-label="Key statistics"
    >
      {/* Textural photograph, desaturated and sunk into the navy */}
      <Image
        src={statsImg?.src ?? PHOTOS.hallAudience.src}
        alt=""
        fill
        sizes="100vw"
        loading="lazy"
        className="object-cover opacity-[0.16] mix-blend-luminosity"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-linear-to-b from-aspol-dark via-transparent to-aspol-dark" aria-hidden="true" />

      <div className="container-x relative">
        <h2 className="sr-only">ASPOL in Numbers</h2>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4 lg:gap-x-10">
          {resolvedItems.map((item, index) => {
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
              <li key={`stat-${index}`}>
                <StatItem end={item.value} label={label} suffix={item.suffix || ""} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
});

export default Statistics;
