"use client";

import { memo } from 'react';

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Testimonial } from "@/types";
import { getTestimonials } from "@/lib/sanity";

const Testimonials = memo(function Testimonials() {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const [cmsTestimonials, setCmsTestimonials] = useState<Testimonial[] | null>(null);

  const testimonials: Record<string, Testimonial[]> = {
    en: [
      {
        name: "Maria K.",
        role: "Sciences Po Paris Student",
        text: "ASPOL helped me integrate into French student life and connected me with amazing people. The mentoring program was invaluable during my first year in Paris!",
        year: "2024",
      },
      {
        name: "Jakub S.",
        role: "HEC Paris Alumni",
        text: "Being part of ASPOL was one of the best decisions I made. The networking opportunities and cultural events created friendships that will last a lifetime.",
        year: "2023",
      },
      {
        name: "Anna W.",
        role: "Sorbonne University Student",
        text: "The Paris Polish Forum organized by ASPOL opened doors I never knew existed. It's more than an association - it's a community that truly cares.",
        year: "2024",
      },
      {
        name: "Piotr L.",
        role: "Architecture Student",
        text: "Thanks to ASPOL, I found a mentor who guided me through the complex application process for my masters. Forever grateful!",
        year: "2025",
      },
      {
        name: "Kasia M.",
        role: "Erasmus Student",
        text: "Initially, I was worried about moving to Paris alone. ASPOL events made me feel at home instantly. Great vibes and lovely people.",
        year: "2024",
      },
      {
        name: "Michał R.",
        role: "Law Student at Assas",
        text: "Professional, ambitious, and fun. The perfect mix. I highly recommend joining the board if you want to gain leadership skills.",
        year: "2023",
      },
    ],
    fr: [
      {
        name: "Maria K.",
        role: "Étudiante à Sciences Po Paris",
        text: "ASPOL m'a aidée à m'intégrer dans la vie étudiante française et m'a mise en contact avec des personnes formidables. Le programme de mentorat a été inestimable pendant ma première année à Paris!",
        year: "2024",
      },
      {
        name: "Jakub S.",
        role: "Ancien d'HEC Paris",
        text: "Faire partie d'ASPOL a été l'une des meilleures décisions que j'ai prises. Les opportunités de networking et les événements culturels ont créé des amitiés qui dureront toute une vie.",
        year: "2023",
      },
      {
        name: "Anna W.",
        role: "Étudiante à l'Université Sorbonne",
        text: "Le Paris Polish Forum organisé par ASPOL a ouvert des portes dont je ne connaissais pas l'existence. C'est plus qu'une association - c'est une communauté qui se soucie vraiment.",
        year: "2024",
      },
      {
        name: "Piotr L.",
        role: "Étudiant en Architecture",
        text: "Grâce à ASPOL, j'ai trouvé un mentor qui m'a guidé à travers le processus complexe de candidature pour mon master. Éternellement reconnaissant !",
        year: "2025",
      },
      {
        name: "Kasia M.",
        role: "Étudiante Erasmus",
        text: "Au début, j'étais inquiète de déménager seule à Paris. Les événements ASPOL m'ont fait me sentir chez moi instantanément. Super ambiance et gens adorables.",
        year: "2024",
      },
      {
        name: "Michał R.",
        role: "Étudiant en Droit à Assas",
        text: "Professionnel, ambitieux et amusant. Le mélange parfait. Je recommande vivement de rejoindre le bureau si vous voulez acquérir des compétences en leadership.",
        year: "2023",
      },
    ],
    pl: [
      {
        name: "Maria K.",
        role: "Studentka Sciences Po Paris",
        text: "ASPOL pomógł mi zintegrować się z francuskim życiem studenckim i połączył mnie ze wspaniałymi ludźmi. Program mentorski był bezcenny podczas mojego pierwszego roku w Paryżu!",
        year: "2024",
      },
      {
        name: "Jakub S.",
        role: "Absolwent HEC Paris",
        text: "Bycie częścią ASPOL było jedną z najlepszych decyzji, jakie podjąłem. Możliwości networkingu i wydarzenia kulturalne stworzyły przyjaźnie, które przetrwają całe życie.",
        year: "2023",
      },
      {
        name: "Anna W.",
        role: "Studentka Sorbonne",
        text: "Paris Polish Forum organizowane przez ASPOL otworzył drzwi, o których istnieniu nie wiedziałam. To więcej niż stowarzyszenie - to społeczność, która naprawdę dba.",
        year: "2024",
      },
      {
        name: "Piotr L.",
        role: "Student Architektury",
        text: "Dzięki ASPOL znalazłem mentora, który przeprowadził mnie przez skomplikowany proces aplikacji na studia magisterskie. Jestem dozgonnie wdzięczny!",
        year: "2025",
      },
      {
        name: "Kasia M.",
        role: "Studentka Erasmus",
        text: "Początkowo martwiłam się przeprowadzką do Paryża sama. Wydarzenia ASPOL sprawiły, że od razu poczułam się jak w domu. Świetna atmosfera i wspaniali ludzie.",
        year: "2024",
      },
      {
        name: "Michał R.",
        role: "Student Prawa na Assas",
        text: "Profesjonalnie, ambitnie i zabawnie. Idealna mieszanka. Gorąco polecam dołączenie do zarządu, jeśli chcesz zdobyć umiejętności przywódcze.",
        year: "2023",
      },
    ],
  };

  const currentTestimonials = cmsTestimonials || testimonials[language] || testimonials.en;

  useEffect(() => {
    let mounted = true;
    async function loadTestimonials() {
      try {
        const data = await getTestimonials();
        if (!mounted) return;
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((item: {
            name: string;
            role?: { en?: string; fr?: string; pl?: string };
            text?: { en?: string; fr?: string; pl?: string };
            year?: string;
          }) => ({
            name: item.name,
            role: item.role?.[language] || item.role?.en || "",
            text: item.text?.[language] || item.text?.en || "",
            year: item.year || "",
          }));
          setCmsTestimonials(mapped);
        } else {
          setCmsTestimonials(null);
        }
      } catch {
        if (mounted) setCmsTestimonials(null);
      }
    }
    loadTestimonials();
    return () => {
      mounted = false;
    };
  }, [language]);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % currentTestimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentTestimonials.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % currentTestimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? currentTestimonials.length - 1 : prev - 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swiped left - next slide
      nextSlide();
    }
    if (touchEndX.current - touchStartX.current > 50) {
      // Swiped right - previous slide
      prevSlide();
    }
  };

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            {language === "en" && "What Our Members Say"}
            {language === "fr" && "Ce Que Disent Nos Membres"}
            {language === "pl" && "Co Mówią Nasi Członkowie"}
          </h2>
          <p className="text-xl text-gray-600">
            {language === "en" && "Hear from students who found their community with ASPOL"}
            {language === "fr" && "Écoutez des étudiants qui ont trouvé leur communauté avec ASPOL"}
            {language === "pl" && "Posłuchaj studentów, którzy znaleźli swoją społeczność z ASPOL"}
          </p>
        </div>

        <div
          className="relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Testimonial Card */}
          <div className="bg-gray-50 rounded-3xl p-8 md:p-12 shadow-lg min-h-75 flex flex-col justify-between touch-pan-y transition-all duration-300 hover:shadow-xl">
            <div>
              <svg className="w-12 h-12 text-red-600 mb-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 italic">
                &quot;{currentTestimonials[currentIndex].text}&quot;
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-900 text-lg">
                  {currentTestimonials[currentIndex].name}
                </p>
                <p className="text-gray-600">
                  {currentTestimonials[currentIndex].role}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {language === "en" && "Member since"}
                  {language === "fr" && "Membre depuis"}
                  {language === "pl" && "Członek od"} {currentTestimonials[currentIndex].year}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-gray-200 hover:bg-red-600 hover:text-white transition-colors"
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {currentTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${index === currentIndex
                    ? "bg-red-600 w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-gray-200 hover:bg-red-600 hover:text-white transition-colors"
              aria-label="Next testimonial"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Join CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4 text-lg">
            {language === "en" && "Want to share your story?"}
            {language === "fr" && "Envie de partager votre histoire?"}
            {language === "pl" && "Chcesz podzielić się swoją historią?"}
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSebv4I-YbT98Y732JaGTqTfxDYpeGQAxUHybgzntkyai_VEwg/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-red-600 text-white font-medium rounded-full hover:bg-red-700 transition-all duration-200 hover:scale-105"
          >
            {language === "en" && "Join ASPOL Today"}
            {language === "fr" && "Rejoignez ASPOL Aujourd'hui"}
            {language === "pl" && "Dołącz do ASPOL Dziś"}
          </a>
        </div>
      </div>
    </section>
  );
});

export default Testimonials;
