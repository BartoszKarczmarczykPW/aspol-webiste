"use client";

import { memo } from 'react';

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useRef } from "react";
import type { MouseEvent } from "react";
import { useInView } from "@/hooks/useInView";
import { TeamMember } from "@/types";

const Team = memo(function Team() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useInView(sectionRef);

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

  const boardMembers: TeamMember[] = [
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
      className="py-16 px-6 bg-white relative overflow-hidden"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[32px_32px] mask-[radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* Ambient Depth Blobs - Professional & Subtle */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-aspol-navy/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div
          className={`text-center mb-16 px-2 transition-all duration-1000 ${isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
            }`}
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider text-aspol-navy uppercase bg-aspol-navy/5 rounded-full border border-aspol-navy/10">
            {t.nav.about}
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6 text-aspol-dark">
            {t.team.title}
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            {t.team.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {boardMembers.map((member, index) => (
            <div
              key={index}
              className={`bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100/50 ${isVisible
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
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 mb-6 group">
                  <div className="absolute inset-0 bg-linear-to-br from-red-100 to-blue-100 rounded-full rotate-6 scale-95 group-hover:rotate-12 transition-transform duration-500"></div>
                  <Image
                    src={member.photo}
                    alt={`${member.name}, ${member.role} of ASPOL`}
                    fill
                    className="rounded-full object-cover relative z-10 border-4 border-white shadow-sm"
                    sizes="(max-width: 640px) 128px, 160px"
                    loading={index < 4 ? "eager" : "lazy"}
                    priority={index < 4}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/default-avatar.svg';
                    }}
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900 group-hover:text-red-700 transition-colors">
                  {member.name}
                </h3>
                <p className="text-red-600 font-medium mb-3 text-sm tracking-wide uppercase">
                  {member.role}
                </p>

                <div className="w-12 h-0.5 bg-gray-100 mb-4"></div>

                <div className="flex items-center justify-center gap-2 text-gray-500 text-xs">
                  <span className="font-medium text-gray-400">{t.team.board} 2025/26</span>
                  {member.linkedin && (
                    <>
                      <span className="text-gray-300">•</span>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-gray-400 hover:text-[#0077b5] transition-colors duration-200"
                        aria-label={`${member.name}'s LinkedIn profile`}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-gray-500 mb-6 font-medium">{t.team.joinTeam}</p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSebv4I-YbT98Y732JaGTqTfxDYpeGQAxUHybgzntkyai_VEwg/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-all duration-300 hover:scale-105 shadow-lg shadow-red-600/20"
          >
            {t.team.becomeVolunteer}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
});

export default Team;
