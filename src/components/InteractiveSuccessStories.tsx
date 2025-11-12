"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface SuccessStory {
  id: number;
  name: string;
  year: string;
  before: string;
  after: string;
  achievement: string;
  image: string;
  color: string;
}

export default function InteractiveSuccessStories() {
  const { language } = useLanguage();
  const [activeStory, setActiveStory] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  const stories: Record<string, SuccessStory[]> = {
    en: [
      {
        id: 1,
        name: "Maria K.",
        year: "2023",
        before: "Polish student arriving in Paris",
        after: "Leading consultant at McKinsey France",
        achievement: "Found her dream job through ASPOL networking",
        image: "💼",
        color: "from-blue-500 to-blue-700",
      },
      {
        id: 2,
        name: "Tomasz W.",
        year: "2022",
        before: "Uncertain about studying abroad",
        after: "PhD candidate at Sorbonne",
        achievement: "Mentored by ASPOL, now mentoring others",
        image: "🎓",
        color: "from-purple-500 to-purple-700",
      },
      {
        id: 3,
        name: "Anna M.",
        year: "2021",
        before: "Struggling with French language",
        after: "Bilingual project manager at L'Oréal",
        achievement: "Built confidence through ASPOL events",
        image: "🚀",
        color: "from-pink-500 to-pink-700",
      },
      {
        id: 4,
        name: "Piotr S.",
        year: "2024",
        before: "Tech enthusiast with an idea",
        after: "Founder of successful French-Polish startup",
        achievement: "Met co-founder at Paris Polish Forum",
        image: "💡",
        color: "from-green-500 to-green-700",
      },
    ],
    fr: [
      {
        id: 1,
        name: "Maria K.",
        year: "2023",
        before: "Étudiante polonaise arrivant à Paris",
        after: "Consultante principale chez McKinsey France",
        achievement: "A trouvé son emploi de rêve grâce au réseau ASPOL",
        image: "💼",
        color: "from-blue-500 to-blue-700",
      },
      {
        id: 2,
        name: "Tomasz W.",
        year: "2022",
        before: "Incertain quant aux études à l'étranger",
        after: "Doctorant à la Sorbonne",
        achievement: "Mentoré par ASPOL, encadre maintenant d'autres",
        image: "🎓",
        color: "from-purple-500 to-purple-700",
      },
      {
        id: 3,
        name: "Anna M.",
        year: "2021",
        before: "Difficultés avec la langue française",
        after: "Chef de projet bilingue chez L'Oréal",
        achievement: "A gagné en confiance grâce aux événements ASPOL",
        image: "🚀",
        color: "from-pink-500 to-pink-700",
      },
      {
        id: 4,
        name: "Piotr S.",
        year: "2024",
        before: "Passionné de tech avec une idée",
        after: "Fondateur d'une startup franco-polonaise réussie",
        achievement: "A rencontré son cofondateur au Paris Polish Forum",
        image: "💡",
        color: "from-green-500 to-green-700",
      },
    ],
    pl: [
      {
        id: 1,
        name: "Maria K.",
        year: "2023",
        before: "Polska studentka przyjeżdżająca do Paryża",
        after: "Główna konsultantka w McKinsey France",
        achievement: "Znalazła wymarzoną pracę dzięki sieci ASPOL",
        image: "💼",
        color: "from-blue-500 to-blue-700",
      },
      {
        id: 2,
        name: "Tomasz W.",
        year: "2022",
        before: "Niepewny co do studiowania za granicą",
        after: "Doktorant na Sorbonie",
        achievement: "Wspierany przez ASPOL, teraz wspiera innych",
        image: "🎓",
        color: "from-purple-500 to-purple-700",
      },
      {
        id: 3,
        name: "Anna M.",
        year: "2021",
        before: "Zmagająca się z językiem francuskim",
        after: "Dwujęzyczna kierownik projektu w L'Oréal",
        achievement: "Zbudowała pewność siebie dzięki wydarzeniom ASPOL",
        image: "🚀",
        color: "from-pink-500 to-pink-700",
      },
      {
        id: 4,
        name: "Piotr S.",
        year: "2024",
        before: "Entuzjasta technologii z pomysłem",
        after: "Założyciel odnoszącego sukcesy startupu francusko-polskiego",
        achievement: "Poznał współzałożyciela na Paris Polish Forum",
        image: "💡",
        color: "from-green-500 to-green-700",
      },
    ],
  };

  const currentStories = stories[language as keyof typeof stories] || stories.en;

  const labels = {
    en: { title: "Success Stories", subtitle: "From Students to Leaders", before: "Before", after: "After" },
    fr: { title: "Histoires de Réussite", subtitle: "D'Étudiants à Leaders", before: "Avant", after: "Après" },
    pl: { title: "Historie Sukcesu", subtitle: "Od Studentów do Liderów", before: "Przed", after: "Po" },
  };

  const currentLabels = labels[language as keyof typeof labels] || labels.en;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStory((prev) => (prev + 1) % currentStories.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentStories.length]);

  const activeStoryData = currentStories[activeStory];

  return (
    <section className="py-24 px-6 bg-gray-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">{currentLabels.title}</h2>
          <p className="text-xl text-gray-300">{currentLabels.subtitle}</p>
        </div>

        {/* Main Story Display */}
        <div className="relative">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* Before Section */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-red-500 rounded-full blur-3xl opacity-20" />
              <div className="relative bg-gray-800 rounded-3xl p-8 transform transition-all duration-500 hover:scale-105">
                <div className="inline-block px-4 py-2 bg-gray-700 rounded-full text-sm font-semibold mb-4">
                  {currentLabels.before}
                </div>
                <p className="text-2xl font-medium text-gray-300 leading-relaxed">{activeStoryData.before}</p>
              </div>
            </div>

            {/* Arrow & Icon */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className={`w-32 h-32 rounded-full bg-linear-to-br ${activeStoryData.color} flex items-center justify-center text-6xl shadow-2xl transform transition-all duration-500 hover:rotate-12 hover:scale-110`}>
                {activeStoryData.image}
              </div>
            </div>

            {/* After Section */}
            <div className="relative">
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-green-500 rounded-full blur-3xl opacity-20" />
              <div className="relative bg-linear-to-br from-gray-700 to-gray-800 rounded-3xl p-8 border-2 border-green-500 transform transition-all duration-500 hover:scale-105">
                <div className="inline-block px-4 py-2 bg-green-500 rounded-full text-sm font-semibold mb-4">
                  {currentLabels.after}
                </div>
                <p className="text-2xl font-medium leading-relaxed">{activeStoryData.after}</p>
              </div>
            </div>
          </div>

          {/* Story Details */}
          <div className="text-center mb-12 animate-fade-in">
            <h3 className="text-4xl font-bold mb-3">{activeStoryData.name}</h3>
            <p className="text-xl text-gray-300 mb-4">{activeStoryData.achievement}</p>
            <span className="inline-block px-4 py-2 bg-gray-800 rounded-full text-sm text-gray-400">
              Class of {activeStoryData.year}
            </span>
          </div>
        </div>

        {/* Timeline Navigation */}
        <div ref={timelineRef} className="relative">
          <div className="flex justify-center items-center gap-4 mb-8">
            {currentStories.map((story, index) => (
              <button
                key={story.id}
                onClick={() => setActiveStory(index)}
                className={`group relative transition-all duration-300 ${
                  index === activeStory ? "scale-125" : "scale-100 opacity-50 hover:opacity-100"
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-full bg-linear-to-br ${story.color} flex items-center justify-center text-3xl shadow-lg transform transition-all ${
                    index === activeStory ? "ring-4 ring-white" : ""
                  }`}
                >
                  {story.image}
                </div>
                {index === activeStory && (
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="text-sm font-semibold">{story.name}</span>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="max-w-2xl mx-auto mt-16">
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className={`h-full bg-linear-to-r ${activeStoryData.color} transition-all duration-300`}
                style={{ width: `${((activeStory + 1) / currentStories.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center gap-4 mt-12">
          <button
            onClick={() => setActiveStory((prev) => (prev - 1 + currentStories.length) % currentStories.length)}
            className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
            aria-label="Previous story"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setActiveStory((prev) => (prev + 1) % currentStories.length)}
            className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
            aria-label="Next story"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
