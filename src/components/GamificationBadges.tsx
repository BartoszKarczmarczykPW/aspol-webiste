"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

export default function GamificationBadges() {
  const { language } = useLanguage();
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  const badges: Record<string, Badge[]> = {
    en: [
      {
        id: "newcomer",
        name: "Newcomer",
        description: "Welcome to ASPOL! Your journey begins.",
        icon: "🌱",
        color: "from-green-400 to-green-600",
        unlocked: true,
      },
      {
        id: "first-event",
        name: "First Event",
        description: "Attended your first ASPOL event",
        icon: "🎪",
        color: "from-blue-400 to-blue-600",
        unlocked: true,
      },
      {
        id: "networking-pro",
        name: "Networking Pro",
        description: "Connect with 10+ members",
        icon: "🤝",
        color: "from-purple-400 to-purple-600",
        unlocked: false,
        progress: 7,
        maxProgress: 10,
      },
      {
        id: "mentor",
        name: "Mentor",
        description: "Help 3 new students settle in France",
        icon: "👨‍🏫",
        color: "from-yellow-400 to-yellow-600",
        unlocked: false,
        progress: 1,
        maxProgress: 3,
      },
      {
        id: "event-host",
        name: "Event Host",
        description: "Organize an ASPOL event",
        icon: "🎯",
        color: "from-red-400 to-red-600",
        unlocked: false,
      },
      {
        id: "forum-speaker",
        name: "Forum Speaker",
        description: "Present at Paris Polish Forum",
        icon: "🎤",
        color: "from-pink-400 to-pink-600",
        unlocked: false,
      },
      {
        id: "community-leader",
        name: "Community Leader",
        description: "Join ASPOL board",
        icon: "👑",
        color: "from-amber-400 to-amber-600",
        unlocked: false,
      },
      {
        id: "super-connector",
        name: "Super Connector",
        description: "Introduce 20+ members to each other",
        icon: "🌟",
        color: "from-cyan-400 to-cyan-600",
        unlocked: false,
      },
    ],
    fr: [
      {
        id: "newcomer",
        name: "Nouveau Membre",
        description: "Bienvenue à ASPOL! Votre voyage commence.",
        icon: "🌱",
        color: "from-green-400 to-green-600",
        unlocked: true,
      },
      {
        id: "first-event",
        name: "Premier Événement",
        description: "Participation à votre premier événement ASPOL",
        icon: "🎪",
        color: "from-blue-400 to-blue-600",
        unlocked: true,
      },
      {
        id: "networking-pro",
        name: "Pro du Networking",
        description: "Connectez-vous avec 10+ membres",
        icon: "🤝",
        color: "from-purple-400 to-purple-600",
        unlocked: false,
        progress: 7,
        maxProgress: 10,
      },
      {
        id: "mentor",
        name: "Mentor",
        description: "Aidez 3 nouveaux étudiants à s'installer en France",
        icon: "👨‍🏫",
        color: "from-yellow-400 to-yellow-600",
        unlocked: false,
        progress: 1,
        maxProgress: 3,
      },
      {
        id: "event-host",
        name: "Organisateur",
        description: "Organisez un événement ASPOL",
        icon: "🎯",
        color: "from-red-400 to-red-600",
        unlocked: false,
      },
      {
        id: "forum-speaker",
        name: "Intervenant Forum",
        description: "Présentez au Paris Polish Forum",
        icon: "🎤",
        color: "from-pink-400 to-pink-600",
        unlocked: false,
      },
      {
        id: "community-leader",
        name: "Leader Communautaire",
        description: "Rejoignez le bureau ASPOL",
        icon: "👑",
        color: "from-amber-400 to-amber-600",
        unlocked: false,
      },
      {
        id: "super-connector",
        name: "Super Connecteur",
        description: "Présentez 20+ membres entre eux",
        icon: "🌟",
        color: "from-cyan-400 to-cyan-600",
        unlocked: false,
      },
    ],
    pl: [
      {
        id: "newcomer",
        name: "Nowicjusz",
        description: "Witaj w ASPOL! Twoja podróż się rozpoczyna.",
        icon: "🌱",
        color: "from-green-400 to-green-600",
        unlocked: true,
      },
      {
        id: "first-event",
        name: "Pierwsze Wydarzenie",
        description: "Uczestnictwo w pierwszym wydarzeniu ASPOL",
        icon: "🎪",
        color: "from-blue-400 to-blue-600",
        unlocked: true,
      },
      {
        id: "networking-pro",
        name: "Pro Networkingu",
        description: "Połącz się z 10+ członkami",
        icon: "🤝",
        color: "from-purple-400 to-purple-600",
        unlocked: false,
        progress: 7,
        maxProgress: 10,
      },
      {
        id: "mentor",
        name: "Mentor",
        description: "Pomóż 3 nowym studentom osiedlić się we Francji",
        icon: "👨‍🏫",
        color: "from-yellow-400 to-yellow-600",
        unlocked: false,
        progress: 1,
        maxProgress: 3,
      },
      {
        id: "event-host",
        name: "Organizator Wydarzeń",
        description: "Zorganizuj wydarzenie ASPOL",
        icon: "🎯",
        color: "from-red-400 to-red-600",
        unlocked: false,
      },
      {
        id: "forum-speaker",
        name: "Prelegent Forum",
        description: "Wystąp na Paris Polish Forum",
        icon: "🎤",
        color: "from-pink-400 to-pink-600",
        unlocked: false,
      },
      {
        id: "community-leader",
        name: "Lider Społeczności",
        description: "Dołącz do zarządu ASPOL",
        icon: "👑",
        color: "from-amber-400 to-amber-600",
        unlocked: false,
      },
      {
        id: "super-connector",
        name: "Super Łącznik",
        description: "Przedstaw sobie 20+ członków",
        icon: "🌟",
        color: "from-cyan-400 to-cyan-600",
        unlocked: false,
      },
    ],
  };

  const currentBadges = badges[language as keyof typeof badges] || badges.en;
  const unlockedCount = currentBadges.filter((b) => b.unlocked).length;
  const totalCount = currentBadges.length;

  const labels = {
    en: { title: "Your Journey", subtitle: "Achievements & Milestones", progress: "Progress" },
    fr: { title: "Votre Parcours", subtitle: "Réalisations & Jalons", progress: "Progrès" },
    pl: { title: "Twoja Podróż", subtitle: "Osiągnięcia i Kamienie Milowe", progress: "Postęp" },
  };

  const currentLabels = labels[language as keyof typeof labels] || labels.en;

  return (
    <section className="py-24 px-6 bg-linear-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            {currentLabels.title}
          </h2>
          <p className="text-xl text-gray-600 mb-8">{currentLabels.subtitle}</p>
          
          {/* Overall Progress */}
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">{currentLabels.progress}</span>
              <span className="text-sm font-bold text-red-600">
                {unlockedCount}/{totalCount}
              </span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-red-500 to-red-600 transition-all duration-1000 ease-out"
                style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {currentBadges.map((badge, index) => (
            <div
              key={badge.id}
              onClick={() => setSelectedBadge(badge)}
              className={`relative group cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                badge.unlocked ? "" : "opacity-60"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={`relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow ${
                  badge.unlocked ? "border-2 border-transparent" : "border-2 border-dashed border-gray-300"
                }`}
              >
                {/* Badge Icon */}
                <div
                  className={`w-20 h-20 mx-auto mb-4 rounded-full bg-linear-to-br ${badge.color} flex items-center justify-center text-4xl ${
                    badge.unlocked ? "animate-bounce" : "grayscale"
                  }`}
                  style={{ animationDuration: "2s", animationIterationCount: "1" }}
                >
                  {badge.icon}
                </div>

                {/* Badge Name */}
                <h3 className="text-center font-bold text-gray-900 mb-2">{badge.name}</h3>

                {/* Progress Bar */}
                {badge.progress !== undefined && badge.maxProgress && !badge.unlocked && (
                  <div className="mt-3">
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-linear-to-r ${badge.color} transition-all`}
                        style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 text-center mt-1">
                      {badge.progress}/{badge.maxProgress}
                    </p>
                  </div>
                )}

                {/* Locked Overlay */}
                {!badge.unlocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-40 rounded-2xl">
                    <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}

                {/* Shine effect for unlocked badges */}
                {badge.unlocked && (
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transition-opacity rounded-2xl pointer-events-none" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Badge Detail Modal */}
        {selectedBadge && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6"
            onClick={() => setSelectedBadge(null)}
          >
            <div
              className="bg-white rounded-3xl p-8 max-w-md w-full transform animate-fade-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`w-32 h-32 mx-auto mb-6 rounded-full bg-linear-to-br ${selectedBadge.color} flex items-center justify-center text-6xl`}>
                {selectedBadge.icon}
              </div>
              <h3 className="text-3xl font-bold text-center text-gray-900 mb-4">
                {selectedBadge.name}
              </h3>
              <p className="text-center text-gray-600 mb-6">{selectedBadge.description}</p>
              {selectedBadge.unlocked ? (
                <div className="text-center">
                  <span className="inline-block px-6 py-2 bg-green-100 text-green-800 rounded-full font-semibold">
                    ✓ Unlocked!
                  </span>
                </div>
              ) : selectedBadge.progress !== undefined && selectedBadge.maxProgress ? (
                <div>
                  <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full bg-linear-to-r ${selectedBadge.color} transition-all`}
                      style={{ width: `${(selectedBadge.progress / selectedBadge.maxProgress) * 100}%` }}
                    />
                  </div>
                  <p className="text-center text-sm text-gray-600">
                    {selectedBadge.progress}/{selectedBadge.maxProgress} completed
                  </p>
                </div>
              ) : (
                <p className="text-center text-gray-500 italic">Keep participating to unlock!</p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
