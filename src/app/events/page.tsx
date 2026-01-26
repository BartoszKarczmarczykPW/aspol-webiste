"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { useLanguage } from "@/contexts/LanguageContext";
import { getEvents } from "@/lib/sanity";
import SmoothBackground from "@/components/ui/effects/SmoothBackground";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import RippleButton from "@/components/ui/RippleButton";
import GlassCard from "@/components/ui/cards/GlassCard";
import AddToCalendarButton from "@/components/events/AddToCalendarButton";
import CalendarWidget from "@/components/events/CalendarWidget";

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

function EventsContent() {
    const { language } = useLanguage();
    const [filter, setFilter] = useState<"upcoming" | "past">("upcoming");
    const [events, setEvents] = useState<SanityEvent[]>([]);
    const [loading, setLoading] = useState(true);

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
            readMore: "View Details",
            register: "Register Now",
            empty: "No upcoming events scheduled at the moment.",
            loading: "Loading events...",
        },
        fr: {
            title: "Calendrier des Événements",
            subtitle: "Des expériences sélectionnées pour la communauté polonaise en France.",
            upcoming: "À venir",
            past: "Archives",
            featured: "Événement à la une",
            readMore: "Voir les détails",
            register: "S'inscrire",
            empty: "Aucun événement prévu pour le moment.",
            loading: "Chargement des événements...",
        },
        pl: {
            title: "Kalendarz Wydarzeń",
            subtitle: "Wyjątkowe doświadczenia dla polskiej społeczności we Francji.",
            upcoming: "Nadchodzące",
            past: "Archiwum",
            featured: "Wyróżnione Wydarzenie",
            readMore: "Zobacz szczegóły",
            register: "Zarejestruj się",
            empty: "Brak zaplanowanych wydarzeń w tym momencie.",
            loading: "Ładowanie wydarzeń...",
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

    // Get featured event
    const featuredEvent = sortedEvents.find((e) => e.featured);

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

    return (
        <div className="min-h-screen bg-white">
            <SmoothBackground />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 animate-fade-in-up">
                        {t.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                        {t.subtitle}
                    </p>
                </div>
            </section>

            {/* Filter Tabs */}
            <section className="py-8 px-6">
                <div className="max-w-7xl mx-auto flex justify-center gap-4">
                    <button
                        onClick={() => setFilter("upcoming")}
                        className={`px-8 py-3 rounded-full font-semibold transition-all duration-200 ${filter === "upcoming"
                            ? "bg-aspol-red text-white shadow-lg"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                    >
                        {t.upcoming}
                    </button>
                    <button
                        onClick={() => setFilter("past")}
                        className={`px-8 py-3 rounded-full font-semibold transition-all duration-200 ${filter === "past"
                            ? "bg-aspol-red text-white shadow-lg"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                    >
                        {t.past}
                    </button>
                </div>
            </section>

            {/* Events Grid */}
            <section className="py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-aspol-red"></div>
                            <p className="mt-4 text-gray-600">{t.loading}</p>
                        </div>
                    ) : sortedEvents.length === 0 ? (
                        <div className="text-center py-20">
                            <Calendar className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                            <p className="text-xl text-gray-500">{t.empty}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {sortedEvents.map((event, index) => (
                                <div key={event._id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                                    <GlassCard className="group hover:scale-105 transition-transform duration-300 overflow-hidden h-full flex flex-col">
                                        {/* Event Image */}
                                        <div className="relative h-48 overflow-hidden flex-shrink-0">
                                            <Image
                                                src={event.imageUrl || "/placeholder-event.jpg"}
                                                alt={event.title[language as keyof typeof event.title]}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                            {event.featured && (
                                                <div className="absolute top-4 right-4 bg-aspol-red text-white px-3 py-1 rounded-full text-sm font-semibold">
                                                    {t.featured}
                                                </div>
                                            )}
                                        </div>

                                        {/* Event Content */}
                                        <div className="p-6 flex flex-col flex-grow">
                                            <h3 className="text-2xl font-bold mb-3 text-gray-900">
                                                {event.title[language as keyof typeof event.title]}
                                            </h3>

                                            <div className="space-y-2 mb-4">
                                                <div className="flex items-center text-gray-600">
                                                    <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                                                    <span className="text-sm">{formatDate(event.date)}</span>
                                                </div>
                                                <div className="flex items-center text-gray-600">
                                                    <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                                                    <span className="text-sm">{formatTime(event.date)}</span>
                                                </div>
                                                <div className="flex items-start text-gray-600">
                                                    <MapPin className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                                                    <span className="text-sm">{event.location[language as keyof typeof event.location]}</span>
                                                </div>
                                            </div>

                                            <p className="text-gray-600 mb-6 line-clamp-3 flex-grow">
                                                {event.description[language as keyof typeof event.description]}
                                            </p>

                                            <div className="flex gap-3 mt-auto">
                                                {event.registrationLink && (
                                                    <a
                                                        href={event.registrationLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex-1 px-4 py-2 bg-aspol-red text-white text-center rounded-full hover:bg-red-700 transition-colors font-semibold text-sm"
                                                    >
                                                        {t.register}
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
                                                />
                                            </div>
                                        </div>
                                    </GlassCard>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Calendar Widget */}
            {filter === "upcoming" && sortedEvents.length > 0 && (
                <section className="py-12 px-6 bg-gray-50">
                    <div className="max-w-4xl mx-auto">
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
                                category: e.tags?.[0] || "Event",
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
