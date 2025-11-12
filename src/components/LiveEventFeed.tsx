"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface LiveUpdate {
  id: string;
  type: "registration" | "milestone" | "announcement";
  message: string;
  timestamp: Date;
  icon: string;
}

export default function LiveEventFeed() {
  const { language } = useLanguage();
  const [updates, setUpdates] = useState<LiveUpdate[]>([]);
  const [attendeeCount, setAttendeeCount] = useState(47);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate live updates
    const messages = {
      en: [
        "Maria from Sciences Po just registered! 🎉",
        "50 members milestone reached! 🎊",
        "New mentoring session scheduled for next week 📚",
        "Tomasz joined the Paris Polish Forum! 🌟",
        "Emma registered for the networking event! 🤝",
        "100 total registrations this month! 🚀",
      ],
      fr: [
        "Maria de Sciences Po vient de s'inscrire! 🎉",
        "Jalon de 50 membres atteint! 🎊",
        "Nouvelle session de mentorat prévue la semaine prochaine 📚",
        "Tomasz a rejoint le Paris Polish Forum! 🌟",
        "Emma s'est inscrite à l'événement de networking! 🤝",
        "100 inscriptions totales ce mois-ci! 🚀",
      ],
      pl: [
        "Maria z Sciences Po właśnie się zarejestrowała! 🎉",
        "Osiągnięto kamień milowy 50 członków! 🎊",
        "Nowa sesja mentoringu zaplanowana na przyszły tydzień 📚",
        "Tomasz dołączył do Paris Polish Forum! 🌟",
        "Emma zarejestrowała się na wydarzenie networkingowe! 🤝",
        "100 całkowitych rejestracji w tym miesiącu! 🚀",
      ],
    };

    const currentMessages = messages[language as keyof typeof messages] || messages.en;

    const addRandomUpdate = () => {
      const randomMessage = currentMessages[Math.floor(Math.random() * currentMessages.length)];
      const types: Array<"registration" | "milestone" | "announcement"> = ["registration", "milestone", "announcement"];
      const randomType = types[Math.floor(Math.random() * types.length)];

      const newUpdate: LiveUpdate = {
        id: Date.now().toString(),
        type: randomType,
        message: randomMessage,
        timestamp: new Date(),
        icon: randomType === "registration" ? "👤" : randomType === "milestone" ? "🎯" : "📢",
      };

      setUpdates((prev) => [newUpdate, ...prev.slice(0, 4)]);
      
      // Randomly increment attendee count
      if (Math.random() > 0.7) {
        setAttendeeCount((prev) => prev + 1);
      }
    };

    // Add update every 4-8 seconds
    const interval = setInterval(() => {
      addRandomUpdate();
    }, Math.random() * 4000 + 4000);

    // Initial updates
    addRandomUpdate();
    setTimeout(() => addRandomUpdate(), 2000);

    return () => clearInterval(interval);
  }, [language]);

  if (!isVisible) return null;

  const labels = {
    en: {
      title: "Live Activity",
      attendees: "Active Members",
      close: "Close",
    },
    fr: {
      title: "Activité en Direct",
      attendees: "Membres Actifs",
      close: "Fermer",
    },
    pl: {
      title: "Aktywność na Żywo",
      attendees: "Aktywni Członkowie",
      close: "Zamknij",
    },
  };

  const currentLabels = labels[language as keyof typeof labels] || labels.en;

  return (
    <div className="fixed bottom-8 left-8 z-50 max-w-sm">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-red-600 to-red-700 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping" />
            </div>
            <span className="text-white font-semibold">{currentLabels.title}</span>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-white hover:text-gray-200 transition-colors"
            aria-label={currentLabels.close}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Attendee Counter */}
        <div className="bg-red-50 px-4 py-3 border-b border-red-100">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">{currentLabels.attendees}</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-red-600">{attendeeCount}</span>
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        {/* Updates Feed */}
        <div className="max-h-64 overflow-y-auto">
          {updates.length === 0 ? (
            <div className="px-4 py-8 text-center text-gray-500">
              <svg className="w-12 h-12 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm">Waiting for updates...</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {updates.map((update, index) => (
                <div
                  key={update.id}
                  className="px-4 py-3 hover:bg-gray-50 transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{update.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800 leading-relaxed">{update.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(update.timestamp).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
