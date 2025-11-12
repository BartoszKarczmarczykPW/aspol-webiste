"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CountdownTimerProps {
  targetDate: Date;
  eventName: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ targetDate, eventName }: CountdownTimerProps) {
  const { language } = useLanguage();
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft | null => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference <= 0) {
        setIsExpired(true);
        return null;
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    // Initial calculation and update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Immediately calculate first time
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 0);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (isExpired) {
    return (
      <div className="text-center p-6 bg-gray-100 rounded-2xl">
        <p className="text-lg text-gray-600">
          {language === "en" && "This event has ended"}
          {language === "fr" && "Cet événement est terminé"}
          {language === "pl" && "To wydarzenie się zakończyło"}
        </p>
      </div>
    );
  }

  if (!timeLeft) {
    return null;
  }

  const labels = {
    en: { days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds", until: "Until" },
    fr: { days: "Jours", hours: "Heures", minutes: "Minutes", seconds: "Secondes", until: "Jusqu'à" },
    pl: { days: "Dni", hours: "Godziny", minutes: "Minuty", seconds: "Sekundy", until: "Do" },
  };

  const currentLabels = labels[language as keyof typeof labels] || labels.en;

  return (
    <div className="bg-linear-to-br from-red-50 to-red-100 rounded-2xl p-6 mb-8">
      <div className="text-center mb-4">
        <p className="text-sm font-medium text-red-800 uppercase tracking-wide">
          {currentLabels.until} {eventName}
        </p>
      </div>
      
      <div className="grid grid-cols-4 gap-3">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-3xl md:text-4xl font-bold text-red-600 mb-1">
              {value.toString().padStart(2, '0')}
            </div>
            <div className="text-xs md:text-sm text-gray-600 font-medium uppercase">
              {currentLabels[unit as keyof typeof currentLabels]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
