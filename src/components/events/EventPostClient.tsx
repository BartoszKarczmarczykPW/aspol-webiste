"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/navigation/Breadcrumb";
import SocialShare from "@/components/ui/SocialShare";
import { useLanguage } from "@/contexts/LanguageContext";
import { eventsData } from "@/data/eventsData";
import { Event } from "@/types";

interface EventPostClientProps {
  initialEvent: Event;
  slug: string;
}

export default function EventPostClient({ initialEvent, slug }: EventPostClientProps) {
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const eventList = eventsData[language as keyof typeof eventsData] || eventsData.en;
  const clientMatch = eventList.find((e: Event) => e.id === slug);
  const currentEvent = clientMatch || initialEvent;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-32 pb-20">
        <div className={`max-w-5xl mx-auto px-4 sm:px-6 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Events", href: "/events" },
              { label: currentEvent.title }
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-8">

            {/* Main Content (Left) */}
            <div className="lg:col-span-2">
              {/* Image */}
              <div className="relative rounded-3xl h-64 sm:h-96 w-full shadow-2xl overflow-hidden group mb-8">
                <Image
                  src={currentEvent.image}
                  alt={currentEvent.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Title & Desc */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {currentEvent.title}
              </h1>

              <div
                className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-gray-900"
                dangerouslySetInnerHTML={{ __html: currentEvent.fullDescription || currentEvent.shortDescription }}
              />

              {/* Share */}
              <div className="mt-12 pt-8 border-t border-gray-100">
                <p className="text-sm text-gray-500 mb-3 font-medium uppercase tracking-wider">Share this event</p>
                <SocialShare
                  url={`https://aspol.fr/events/${slug}`}
                  title={currentEvent.title}
                  description={currentEvent.shortDescription}
                />
              </div>
            </div>

            {/* Sidebar (Right) - Sticky Information Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-200/50">
                <div className="space-y-6">

                  {/* Status Badge */}
                  <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider rounded-lg">
                    {currentEvent.category}
                  </span>

                  {/* Date & Time */}
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-red-50 text-red-600 rounded-xl">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Date</h3>
                      <p className="text-gray-600">{currentEvent.date}</p>
                      {currentEvent.time && (
                        <p className="text-sm text-gray-500 mt-1">{currentEvent.time}</p>
                      )}
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Location</h3>
                      <p className="text-gray-600 leading-relaxed">{currentEvent.location}</p>
                    </div>
                  </div>

                  {/* Register Button */}
                  {currentEvent.registrationLink ? (
                    <a
                      href={currentEvent.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-center rounded-2xl transition-all duration-300 shadow-lg shadow-red-600/20 hover:scale-[1.02]"
                    >
                      Register Now
                    </a>
                  ) : (
                    <button disabled className="block w-full py-4 bg-gray-100 text-gray-400 font-bold text-center rounded-2xl cursor-not-allowed">
                      Registrations Closed
                    </button>
                  )}

                  <p className="text-xs text-center text-gray-400">
                    Limited spots available. Registration required.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Back Button */}
          <div className="mt-16 text-center">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 font-semibold transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              All Events
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
