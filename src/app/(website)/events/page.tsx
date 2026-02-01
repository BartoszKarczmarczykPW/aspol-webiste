"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { getEvents } from "@/lib/sanity";
import { Calendar, MapPin, Clock, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import AddToCalendarButton from "@/components/events/AddToCalendarButton";
import CalendarWidget from "@/components/events/CalendarWidget";
import SmoothBackground from "@/components/ui/effects/SmoothBackground";
import RippleButton from "@/components/ui/RippleButton";
// Removed ChevronDownIcon import as it's not critical if I use lucide-react's ChevronDown, but keeping style consistency
import { ChevronDownIcon } from "@/components/icons/ChevronDownIcon";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Type for Sanity event
interface SanityEvent {
    _id: string;
    title: {
        en: string;
        fr: string;
        pl: string;
    };
    slug: {
        current: string;
    };
    date: string;
    location: {
        en: string;
        fr: string;
        pl: string;
    };
    description: {
        en: string;
        fr: string;
        pl: string;
    };
    imageUrl: string;
    registrationLink?: string;
    tags?: string[];
    featured?: boolean;
}

// Event Card Component
function EventCard({ event, t, formatDate, formatTime, language }: {
    event: SanityEvent;
    t: any;
    formatDate: (d: string) => string;
    formatTime: (d: string) => string;
    language: string;
}) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <article className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full flex flex-col">
            {/* Event Image */}
            <div className="relative h-56 overflow-hidden">
                <Image
                    src={event.imageUrl || "/placeholder-event.jpg"}
                    alt={event.title[language as keyof typeof event.title]}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>

                <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex gap-2 mb-2">
                        {event.featured && (
                            <span className="bg-aspol-red/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                                {t.featured}
                            </span>
                        )}
                        <span className="bg-white/90 backdrop-blur-md text-aspol-navy px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(event.date)}
                        </span>
                    </div>
                    <h3 className="text-xl font-bold text-white leading-tight drop-shadow-md">
                        {event.title[language as keyof typeof event.title]}
                    </h3>
                </div>
            </div>

            {/* Event Content */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-gray-500 text-sm mb-4 border-b border-gray-100 pb-4">
                    <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1.5 text-aspol-red" />
                        {formatTime(event.date)}
                    </div>
                    <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1.5 text-aspol-red" />
                        {event.location[language as keyof typeof event.location]}
                    </div>
                </div>

                <div className="flex-grow mb-6 relative">
                    <p className={`text-gray-600 text-sm leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}>
                        {event.description[language as keyof typeof event.description]}
                    </p>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-aspol-red text-xs font-bold uppercase tracking-wider mt-2 inline-flex items-center gap-1 hover:underline focus:outline-none"
                    >
                        {isExpanded ? (
                            <>
                                {t.showLess}
                                <ChevronUp className="w-4 h-4" />
                            </>
                        ) : (
                            <>{t.readMore} <ChevronDown className="w-4 h-4" /></>
                        )}
                    </button>
                </div>

                <div className="flex gap-3 mt-auto pt-4 border-t border-gray-50">
                    {event.registrationLink && (
                        <a
                            href={event.registrationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-4 py-2.5 bg-aspol-navy text-white text-center rounded-lg hover:bg-opacity-90 transition-all font-medium text-sm flex items-center justify-center gap-2 group/btn"
                        >
                            {t.register}
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                        </a>
                    )}
                    <AddToCalendarButton
                        event={{
                            id: event._id,
                            title: event.title[language as keyof typeof event.title],
                            date: formatDate(event.date),
                            time: formatTime(event.date),
                            location: event.location[language as keyof typeof event.location],
                            isoDate: event.date,
                            shortDescription: event.description[language as keyof typeof event.description],
                            fullDescription: '',
                            image: event.imageUrl,
                            category: 'Event' as any,
                            registrationLink: event.registrationLink,
                        }}
                        className="px-3 border border-gray-200 hover:border-aspol-navy hover:bg-aspol-navy/5 text-aspol-navy rounded-lg"
                        variant="outline"
                        label=""
                    />
                </div>
            </div>
        </article>
    );
}

function EventsContent() {
    const { language } = useLanguage();
    const [filter, setFilter] = useState<"upcoming" | "past">("upcoming");
    const [events, setEvents] = useState<SanityEvent[]>([]);
    const [loading, setLoading] = useState(true);

    const heroRef = useRef<HTMLDivElement>(null);
    useScrollAnimation(heroRef);

    useEffect(() => {
        async function fetchEvents() {
            try {
                const data = await getEvents();
                setEvents(data);
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchEvents();
    }, []);

    const labels = {
        en: {
            title: "Events Calendar",
            subtitle: "Curated experiences for the Polish community in France.",
            upcoming: "Upcoming",
            past: "Archive",
            featured: "Featured Event",
            readMore: "Read More",
            showLess: "Show Less",
            register: "Register Now",
            empty: "No upcoming events scheduled at the moment.",
            loading: "Loading events...",
            scrollDown: "Scroll Down",
        },
        fr: {
            title: "Calendrier des Événements",
            subtitle: "Des expériences sélectionnées pour la communauté polonaise en France.",
            upcoming: "À venir",
            past: "Archives",
            featured: "Événement à la une",
            readMore: "Lire la suite",
            showLess: "Voir moins",
            register: "S'inscrire",
            empty: "Aucun événement prévu pour le moment.",
            loading: "Chargement des événements...",
            scrollDown: "Défiler vers le bas",
        },
        pl: {
            title: "Kalendarz Wydarzeń",
            subtitle: "Wyjątkowe doświadczenia dla polskiej społeczności we Francji.",
            upcoming: "Nadchodzące",
            past: "Archiwum",
            featured: "Wyróżnione Wydarzenie",
            readMore: "Czytaj więcej",
            showLess: "Pokaż mniej",
            register: "Zarejestruj się",
            empty: "Brak zaplanowanych wydarzeń w tym momencie.",
            loading: "Ładowanie wydarzeń...",
            scrollDown: "Przewiń w dół",
        },
    };

    const t = labels[language as keyof typeof labels] || labels.en;

    // Filter events by upcoming/past
    const now = new Date();
    const filteredEvents = events.filter((event) => {
        const eventDate = new Date(event.date);
        return filter === "upcoming" ? eventDate >= now : eventDate < now;
    });

    // Sort events by date
    const sortedEvents = [...filteredEvents].sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return filter === "upcoming" ? dateA - dateB : dateB - dateA;
    });

    // Format date for display
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(language === "fr" ? "fr-FR" : language === "pl" ? "pl-PL" : "en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    // Format time for display
    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString(language === "fr" ? "fr-FR" : language === "pl" ? "pl-PL" : "en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const scrollToEvents = () => {
        document.getElementById('events-grid')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-white">

            {/* Hero Section - Unique Events Style but matching system */}
            <section
                ref={heroRef}
                className="relative min-h-[50vh] flex items-center justify-center px-4 sm:px-6 pt-32 pb-16 overflow-hidden"
            >
                {/* Smooth Animated Background */}
                <SmoothBackground />

                <div className="max-w-7xl mx-auto relative z-10 w-full">
                    <div className="flex flex-col items-center text-center">

                        {/* Badge */}
                        <div className="fade-in-element opacity-0 mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-aspol-navy/5 border border-aspol-navy/10">
                            <span className="w-2 h-2 rounded-full bg-aspol-red animate-pulse"></span>
                            <span className="text-xs font-semibold tracking-wide text-aspol-navy uppercase">
                                ASPOL Events
                            </span>
                        </div>

                        {/* Main heading */}
                        <div className="fade-in-element opacity-0 mb-6">
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-aspol-navy mb-4">
                                {t.title}
                            </h1>
                        </div>

                        {/* Description */}
                        <div className="fade-in-element opacity-0 mb-8 max-w-2xl" style={{ animationDelay: "0.1s" }}>
                            <p className="text-xl text-gray-600 leading-relaxed font-light">
                                {t.subtitle}
                            </p>
                        </div>

                        {/* Scroll Down Indicator - Simpler version */}
                        <div className="fade-in-element opacity-0 mt-8 pt-4" style={{ animationDelay: "0.3s" }}>
                            <button onClick={scrollToEvents} className="flex flex-col items-center gap-3 cursor-pointer group">
                                <span className="text-xs font-semibold uppercase tracking-widest text-aspol-navy/40 group-hover:text-aspol-red transition-colors">{t.scrollDown}</span>
                                <ChevronDownIcon className="w-5 h-5 text-aspol-red animate-bounce" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filter Tabs - Modernized */}
            <section id="events-grid" className="py-8 px-6 sticky top-0 z-10 bg-white/95 backdrop-blur-sm transition-all border-b border-gray-100">
                <div className="max-w-7xl mx-auto flex justify-center gap-2 p-1 bg-gray-50 rounded-full shadow-inner border border-gray-200/50 w-fit">
                    <button
                        onClick={() => setFilter("upcoming")}
                        className={`px-6 py-2 rounded-full font-medium text-sm transition-all duration-300 ${filter === "upcoming"
                            ? "bg-aspol-red text-white shadow-md"
                            : "text-gray-500 hover:bg-white hover:text-gray-900"
                            }`}
                    >
                        {t.upcoming}
                    </button>
                    <button
                        onClick={() => setFilter("past")}
                        className={`px-6 py-2 rounded-full font-medium text-sm transition-all duration-300 ${filter === "past"
                            ? "bg-aspol-navy text-white shadow-md"
                            : "text-gray-500 hover:bg-white hover:text-gray-900"
                            }`}
                    >
                        {t.past}
                    </button>
                </div>
            </section>

            {/* Events Grid */}
            <section className="py-24 px-6 bg-gray-50/50">
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <div className="text-center py-32">
                            <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-aspol-red"></div>
                            <p className="mt-4 text-sm font-medium text-gray-500 tracking-wide uppercase">{t.loading}</p>
                        </div>
                    ) : sortedEvents.length === 0 ? (
                        <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-gray-300">
                            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Calendar className="h-8 w-8 text-gray-400" />
                            </div>
                            <p className="text-lg font-medium text-gray-900">{t.empty}</p>
                            <p className="text-gray-500 mt-1">Check back later for updates.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {sortedEvents.map((event, index) => (
                                <div key={event._id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                                    <EventCard
                                        event={event}
                                        t={t}
                                        formatDate={formatDate}
                                        formatTime={formatTime}
                                        language={language}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Calendar Widget - Improved integration */}
            {filter === "upcoming" && (
                <section className="py-20 px-6 bg-white border-t border-gray-100 relative overflow-hidden">
                    <div className="max-w-5xl mx-auto relative z-10">
                        <div className="text-center mb-12">
                            <span className="text-aspol-red font-bold uppercase tracking-widest text-xs mb-2 block">Planned</span>
                            <h2 className="text-3xl font-bold text-aspol-navy">Month View</h2>
                        </div>
                        <CalendarWidget
                            events={sortedEvents.map((e) => ({
                                id: e._id,
                                title: e.title[language as keyof typeof e.title],
                                date: formatDate(e.date),
                                isoDate: e.date,
                                time: formatTime(e.date),
                                location: e.location[language as keyof typeof e.location],
                                shortDescription: e.description[language as keyof typeof e.description],
                                fullDescription: "",
                                image: e.imageUrl,
                                category: "Social" as "Conference" | "Social" | "Workshop" | "Cultural" | "Webinar",
                                registrationLink: e.registrationLink,
                            }))}
                        />
                    </div>
                </section>
            )}
        </div>
    );
}

export default function EventsPage() {
    return <EventsContent />;
}
