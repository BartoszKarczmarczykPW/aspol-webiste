"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface StatItemProps {
  end: number;
  label: string;
  suffix?: string;
  duration?: number;
}

function StatItem({ end, label, suffix = "", duration = 2000 }: StatItemProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // Easing function for smooth animation
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
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-6xl font-bold text-white mb-2">
        {count}{suffix}
      </div>
      <div className="text-red-100 text-lg">{label}</div>
    </div>
  );
}

export default function Statistics() {
  const { language } = useLanguage();

  const stats = {
    en: {
      members: "Active Members",
      events: "Events This Year",
      universities: "Partner Universities",
      years: "Years Active",
    },
    fr: {
      members: "Membres Actifs",
      events: "Événements Cette Année",
      universities: "Universités Partenaires",
      years: "Années d'Activité",
    },
    pl: {
      members: "Aktywnych Członków",
      events: "Wydarzenia w tym Roku",
      universities: "Uniwersytety Partnerskie",
      years: "Lat Działalności",
    },
  };

  const currentStats = stats[language] || stats.en;

  return (
    <section className="py-20 px-6 bg-linear-to-r from-red-600 to-red-500 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <StatItem end={150} label={currentStats.members} suffix="+" />
          <StatItem end={20} label={currentStats.events} suffix="+" />
          <StatItem end={15} label={currentStats.universities} suffix="+" />
          <StatItem end={8} label={currentStats.years} suffix="+" />
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white/20 rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 border-2 border-white/20 rounded-full"></div>
    </section>
  );
}
