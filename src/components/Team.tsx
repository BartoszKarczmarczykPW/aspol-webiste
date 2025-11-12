"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";

export default function Team() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentSection = sectionRef.current;

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  const [tiltStyle, setTiltStyle] = useState<Record<number, { transform: string; transition: string }>>({});

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>, index: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    setTiltStyle(prev => ({
      ...prev,
      [index]: {
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
        transition: 'transform 0.1s ease-out'
      }
    }));
  };

  const handleMouseLeave = (index: number) => {
    setTiltStyle(prev => ({
      ...prev,
      [index]: {
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: 'transform 0.5s ease-out'
      }
    }));
  };

  const boardMembers = [
    {
      name: "Kacper Pabisz",
      role: t.team.coPresident,
      photo: "/KacperPabisz.jpg",
      linkedin: "https://www.linkedin.com/in/kacperpabisz02/",
    },
    {
      name: "Zofia Gostkowska",
      role: t.team.coPresident,
      photo: "/ZosiaGostkowska.jpg",
      linkedin: "https://www.linkedin.com/in/zofia-gostkowska-688b4b1a0/",
    },
    {
      name: "Amelia Ogiela",
      role: t.team.partnerships,
      photo: "/AmeliaOgiela.jpg",
      linkedin: "https://www.linkedin.com/in/amelia-zofia-ogiela/",
    },
    {
      name: "Klara Winiarczyk",
      role: t.team.communityAmbassador,
      photo: "/KlaraWiniarczyk.jpg",
      linkedin: "https://www.linkedin.com/in/klarawiniarczyk/",
    },
    {
      name: "Aleksandra Kobyłecka",
      role: t.team.mentorship,
      photo: "/AleksandraKobylecka.jpg",
      linkedin: "https://www.linkedin.com/in/aleksandra-izabela-koby%C5%82ecka/",
    },
    {
      name: "Marta Mrygoń",
      role: t.team.communications,
      photo: "/MartaMrygon.jpg",
      linkedin: "https://www.linkedin.com/in/marta-mrygo%C5%84-5b92472a5/",
    },
    {
      name: "Weronika Sadownik",
      role: t.team.socialMedia,
      photo: "/WeronikaSadownik.jpg",
      linkedin: "https://www.linkedin.com/in/weronika-sadownik-b6719b258/",
    },
    {
      name: "Julianna Ramatowska",
      role: t.team.graphicDesign,
      photo: "/JuliannaRamatowska.jpg",
      linkedin: "https://www.linkedin.com/in/julianna-ramatowska-2bb251329/",
    },
    {
      name: "Marianna Maciąg",
      role: t.team.finance,
      photo: "/MariannaMaciag.jpg",
      linkedin: "https://www.linkedin.com/in/marianna-maci%C4%85g-93285632b/",
    },
    {
      name: "Eliza Freret",
      role: t.team.culturalEvents,
      photo: "/ElizaFreret.jpg",
      linkedin: "https://www.linkedin.com/in/eliza-freret-a4627028a/",
    },
    {
      name: "Alicja Łukasik",
      role: t.team.operations,
      photo: "/AlicjaLukasik.png",
      linkedin: null,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="team"
      className="py-20 px-6 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-12 sm:mb-16 px-2 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            {t.team.title}
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            {t.team.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {boardMembers.map((member, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-2xl transition-shadow duration-500 touch-manipulation ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                ...(tiltStyle[index] || {})
              }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-3 sm:mb-4">
                  <Image
                    src={member.photo}
                    alt={`${member.name}, ${member.role} of ASPOL`}
                    fill
                    className="rounded-full object-cover"
                    sizes="(max-width: 640px) 112px, 128px"
                    loading={index < 4 ? "eager" : "lazy"}
                    priority={index < 4}
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-1.5 sm:mb-2 text-gray-900">
                  {member.name}
                </h3>
                <p className="text-gray-700 text-xs sm:text-sm font-medium mb-1">
                  {member.role}
                </p>
                <div className="flex items-center justify-center gap-2 text-gray-500 text-xs mb-3">
                  <span>{t.team.board} 2025/26</span>
                  {member.linkedin && (
                    <>
                      <span className="text-gray-300">•</span>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-gray-400 hover:text-red-600 transition-colors duration-200 group"
                        aria-label={`${member.name}'s LinkedIn profile`}
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">{t.team.joinTeam}</p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSebv4I-YbT98Y732JaGTqTfxDYpeGQAxUHybgzntkyai_VEwg/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-red-600 text-white font-medium rounded-full hover:bg-red-700 transition-all duration-200 hover:scale-105"
          >
            {t.team.becomeVolunteer}
          </a>
        </div>
      </div>
    </section>
  );
}
