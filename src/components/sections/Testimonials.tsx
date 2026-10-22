"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import Pill from "@/components/ui/Pill";
import { PHOTOS, photoAlt, type PhotoKey } from "@/lib/photos";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { Testimonial } from "@/types";
import { useSanityData } from "@/hooks/useSanityData";
import { usePrefetch } from "@/contexts/SanityPrefetchContext";
import { getTestimonials, type SanityImageWithAlt } from "@/lib/sanity";
import type { ResolvedImage } from "@/contexts/SiteContentContext";

type TestimonialWithPhoto = Testimonial & { photo?: SanityImageWithAlt | null };

interface SanityTestimonial {
  photo?: SanityImageWithAlt | null;
  name: string;
  role?: { en?: string; fr?: string; pl?: string };
  text?: { en?: string; fr?: string; pl?: string };
  year?: number | string;
}

const TESTIMONIALS: Readonly<Record<string, Testimonial[]>> = {
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
} as const;

const Testimonials = memo(function Testimonials() {
  const { language } = useLanguage();
  const { home, text, image, joinUrl } = useSiteContent();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const autoPlayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const prefetch = usePrefetch();
  const { data: rawTestimonials } = useSanityData<SanityTestimonial[] | null>(
    async () => {
      const data = await getTestimonials();
      return Array.isArray(data) && data.length > 0 ? (data as SanityTestimonial[]) : null;
    },
    { fallback: null, initial: prefetch.testimonials as SanityTestimonial[] | null | undefined },
  );
  const cmsTestimonials = useMemo<TestimonialWithPhoto[] | null>(
    () =>
      rawTestimonials && rawTestimonials.length > 0
        ? rawTestimonials.map((item) => ({
            name: item.name,
            role: item.role?.[language] || item.role?.en || "",
            text: item.text?.[language] || item.text?.en || "",
            year: String(item.year || ""),
            photo: item.photo ?? null,
          }))
        : null,
    [rawTestimonials, language],
  );

  const currentTestimonials: TestimonialWithPhoto[] = cmsTestimonials || TESTIMONIALS[language] || TESTIMONIALS.en;

  // Defensive: derive safe index inline to prevent crash before useEffect fires
  const safeIndex = currentTestimonials.length > 0
    ? currentIndex % currentTestimonials.length
    : 0;
  const currentItem = currentTestimonials[safeIndex];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % currentTestimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentTestimonials.length]);

  const pauseAutoPlay = useCallback(() => {
    setIsAutoPlaying(false);
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current);
    }
    autoPlayTimerRef.current = setTimeout(() => setIsAutoPlaying(true), 10000);
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
      }
    };
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    pauseAutoPlay();
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % currentTestimonials.length);
    pauseAutoPlay();
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? currentTestimonials.length - 1 : prev - 1
    );
    pauseAutoPlay();
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

  const quoteName = currentItem?.name || "";
  const initials = quoteName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const heading =
    language === "fr" ? "Ce Que Disent Nos Membres" : language === "pl" ? "Co Mówią Nasi Członkowie" : "What Our Members Say";
  const subheading =
    language === "fr"
      ? "Écoutez des étudiants qui ont trouvé leur communauté avec ASPOL"
      : language === "pl"
        ? "Posłuchaj studentów, którzy znaleźli swoją społeczność z ASPOL"
        : "Hear from students who found their community with ASPOL";
  const carouselLabel =
    language === "en" ? "Member testimonials" : language === "fr" ? "Témoignages des membres" : "Opinie członków";
  const memberSince = language === "fr" ? "Membre depuis" : language === "pl" ? "Członek od" : "Member since";

  const cmsMoments = (home.moments ?? []).map((m) => image(m, 900)).filter((m): m is ResolvedImage => !!m);
  const defaultMoments: PhotoKey[] = ["smilingPair", "sunsetGroup", "violinPiano", "salonGroup", "singer", "sunsetFriends"];
  const moments = cmsMoments.length
    ? cmsMoments.map((m) => ({ key: m.src, src: m.src, alt: m.alt }))
    : defaultMoments.map((k) => ({ key: k, src: PHOTOS[k].src, alt: photoAlt(k, language) }));
  const portrait = image(currentItem?.photo, 600);

  return (
    <section
      className="on-dark dome-top relative overflow-hidden bg-aspol-navy pb-20 text-white sm:pb-28"
      aria-label={carouselLabel}
    >
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <Reveal as="h2" className="display display-lg lg:col-span-8" text={text(home.testimonialsTitle, heading)} />
          <p className="max-w-[40ch] text-base leading-relaxed text-white/85 sm:text-lg lg:col-span-4">{text(home.testimonialsSubtitle, subheading)}</p>
        </div>

        <div
          className="relative mt-12 sm:mt-16"
          role="region"
          aria-roledescription="carousel"
          aria-label={carouselLabel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="rounded-[2rem] bg-aspol-dark p-7 sm:p-12 lg:p-16">
            <div
              aria-live="polite"
              aria-atomic="true"
              key={safeIndex}
              className="quote-in grid min-h-80 touch-pan-y gap-8 lg:grid-cols-[auto_1fr] lg:gap-16"
            >
              <div
                className="relative grid size-24 shrink-0 place-items-center overflow-hidden rounded-full bg-aspol-white font-display text-3xl font-extrabold text-aspol-navy sm:size-32 sm:text-4xl lg:size-56 lg:text-7xl"
                aria-hidden="true"
              >
                {portrait ? <Image src={portrait.src} alt={portrait.alt || quoteName} fill sizes="224px" className="object-cover" /> : initials}
              </div>
              <div className="flex flex-col justify-between gap-8">
                <blockquote>
                  <p className="font-display text-[1.3rem] font-bold leading-[1.22] sm:text-3xl lg:text-4xl">
                    &ldquo;{currentItem?.text}&rdquo;
                  </p>
                </blockquote>
                <div>
                  <p className="display display-sm">{currentItem?.name}</p>
                  <p className="mt-1.5 text-base text-white/80">{currentItem?.role}</p>
                  {currentItem?.year && (
                    <p className="mt-0.5 text-sm text-white/60">
                      {memberSince} {currentItem.year}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center gap-3 sm:gap-5">
            <button
              type="button"
              onClick={prevSlide}
              className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-aspol-navy transition-transform duration-300 hover:-translate-x-0.5 active:scale-95"
              aria-label="Previous testimonial"
            >
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex flex-1 items-center gap-1.5">
              {currentTestimonials.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => goToSlide(index)}
                  className="group flex h-11 min-w-0 flex-1 items-center touch-manipulation"
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-current={index === safeIndex ? "true" : undefined}
                >
                  <span
                    className={`block h-1 w-full rounded-full transition-colors duration-500 ${
                      index === safeIndex ? "bg-white" : "bg-white/30 group-hover:bg-white/60"
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={nextSlide}
              className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-aspol-navy transition-transform duration-300 hover:translate-x-0.5 active:scale-95"
              aria-label="Next testimonial"
            >
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Moments from our events: horizontally scrolling photo strip */}
      <ul
        className="no-scrollbar mt-16 flex snap-x gap-4 overflow-x-auto px-[max(1rem,4vw)] pb-2 sm:mt-24"
        aria-label={language === "fr" ? "Moments de nos événements" : language === "pl" ? "Chwile z naszych wydarzeń" : "Moments from our events"}
      >
        {moments.map((m) => (
          <li key={m.key} className="photo-card relative aspect-4/5 w-[68vw] max-w-80 shrink-0 snap-start overflow-hidden rounded-[2rem] bg-aspol-dark sm:w-72">
            <Image
              src={m.src}
              alt={m.alt}
              fill
              sizes="(min-width: 640px) 288px, 68vw"
              loading="lazy"
              className="object-cover"
            />
          </li>
        ))}
      </ul>

      <div className="container-x mt-16 flex flex-col items-start justify-between gap-6 sm:mt-24 sm:flex-row sm:items-center">
        <p className="display display-md max-w-[24ch]">
          {text(home.testimonialsShareText, language === "fr" ? "Envie de partager votre histoire?" : language === "pl" ? "Chcesz podzielić się swoją historią?" : "Want to share your story?")}
        </p>
        <Pill href={joinUrl} target="_blank" rel="noopener noreferrer">
          {text(home.testimonialsJoinButton, language === "fr" ? "Rejoignez ASPOL Aujourd'hui" : language === "pl" ? "Dołącz do ASPOL Dziś" : "Join ASPOL Today")}
        </Pill>
      </div>
    </section>
  );
});

export default Testimonials;
