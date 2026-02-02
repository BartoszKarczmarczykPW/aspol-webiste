"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { getEventCountdown, getEvents } from "@/lib/sanity";
import { Calendar, MapPin, Clock, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import AddToCalendarButton from "@/components/events/AddToCalendarButton";
import CalendarWidget from "@/components/events/CalendarWidget";
import SmoothBackground from "@/components/ui/effects/SmoothBackground";
import RippleButton from "@/components/ui/RippleButton";
// Removed ChevronDownIcon import as not critical
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

interface EventCountdownConfig {
    _id: string;
    title: string;
    label: { en: string; fr: string; pl: string };
    targetDate: string;
    liveLabel?: { en: string; fr: string; pl: string };
    completedMessage?: { en: string; fr: string; pl: string };
    isActive?: boolean;
    showLiveBadge?: boolean;
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

    // Extract day and month for the Date Box
    const dateObj = new Date(event.date);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleDateString(language === 'fr' ? 'fr-FR' : language === 'pl' ? 'pl-PL' : 'en-US', { month: 'short' });

    return (
        <article className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden h-full flex flex-col relative">
            {/* Event Image */}
            <div className="relative aspect-16/10 overflow-hidden bg-gray-100">
                <Image
                    src={event.imageUrl || "/placeholder-event.jpg"}
                    alt={event.title[language as keyof typeof event.title]}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Soft Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent opacity-70" />

                {/* Featured Badge */}
                {event.featured && (
                    <div className="absolute top-4 right-4 z-10">
                        <span className="bg-aspol-red text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg shadow-aspol-red/20">
                            {t.featured}
                        </span>
                    </div>
                )}

                {/* Date Box */}
                <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md rounded-xl p-2.5 text-center min-w-14 shadow-md shadow-black/10 group-hover:scale-105 transition-transform duration-300">
                    <span className="block text-xl font-bold text-aspol-navy leading-none">{day}</span>
                    <span className="block text-[0.65rem] font-bold uppercase tracking-widest text-aspol-red mt-0.5">{month}</span>
                </div>
            </div>

            {/* Event Content */}
            <div className="p-6 flex flex-col grow bg-white relative">
                <h3 className="text-2xl font-bold text-gray-900 leading-tight mb-3 font-serif group-hover:text-aspol-navy transition-colors">
                    {event.title[language as keyof typeof event.title]}
                </h3>

                {/* Metadata Row */}
                <div className="flex flex-col items-start gap-2 text-gray-500 text-sm mb-5">
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-aspol-red" />
                        <span className="font-medium text-gray-600">{formatTime(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-aspol-red" />
                        <span className="font-medium text-gray-600">{event.location[language as keyof typeof event.location]}</span>
                    </div>
                </div>

                {/* Description - Expandable */}
                <div className="grow mb-6 relative">
                    <p className={`text-gray-600 text-[0.95rem] leading-relaxed transition-all duration-300 ${isExpanded ? '' : 'line-clamp-3'}`}>
                        {event.description[language as keyof typeof event.description]}
                    </p>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="group/btn text-aspol-navy text-xs font-bold uppercase tracking-wider mt-3 inline-flex items-center gap-1.5 hover:text-aspol-red transition-colors focus:outline-none"
                    >
                        {isExpanded ? (
                            <>
                                {t.showLess}
                                <ChevronUp className="w-3.5 h-3.5" />
                            </>
                        ) : (
                            <>
                                {t.readMore}
                                <div className="w-4 h-4 rounded-full bg-aspol-navy/5 flex items-center justify-center group-hover/btn:bg-aspol-red/10 transition-colors">
                                    <ChevronDown className="w-3 h-3 group-hover/btn:text-aspol-red transition-colors" />
                                </div>
                            </>
                        )}
                    </button>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100">
                    {event.registrationLink && (
                        <a
                            href={event.registrationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-4 py-3 bg-aspol-navy text-white text-center rounded-xl hover:bg-aspol-red hover:shadow-lg hover:shadow-aspol-red/25 transition-all duration-300 font-semibold text-sm flex items-center justify-center gap-2 group/btn"
                        >
                            {t.register}
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
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
                        className="px-4 border border-gray-200 hover:border-aspol-navy hover:bg-aspol-navy/5 text-aspol-navy rounded-xl transition-colors"
                        variant="outline"
                        label=""
                    />
                </div>
            </div>
        </article>
    );
}

function FeaturedEventCard({ event, t, formatDate, formatTime, language }: {
    event: SanityEvent;
    t: any;
    formatDate: (d: string) => string;
    formatTime: (d: string) => string;
    language: string;
}) {
    return (
        <article className="group bg-white rounded-3xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden">
            <div className="grid md:grid-cols-5 gap-0">
                <div className="relative md:col-span-2 aspect-16/10 md:aspect-auto md:min-h-65 overflow-hidden bg-gray-100">
                    <Image
                        src={event.imageUrl || "/placeholder-event.jpg"}
                        alt={event.title[language as keyof typeof event.title]}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent opacity-80" />
                    <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md rounded-xl p-2.5 text-center min-w-14 shadow-md shadow-black/10 group-hover:scale-105 transition-transform duration-300">
                        <span className="block text-xl font-bold text-aspol-navy leading-none">
                            {new Date(event.date).getDate()}
                        </span>
                        <span className="block text-[0.65rem] font-bold uppercase tracking-widest text-aspol-red mt-0.5">
                            {new Date(event.date).toLocaleDateString(language === "fr" ? "fr-FR" : language === "pl" ? "pl-PL" : "en-US", { month: "short" })}
                        </span>
                    </div>
                </div>
                <div className="md:col-span-3 p-6 sm:p-8 flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="inline-flex items-center px-3 py-1 bg-red-50 text-red-700 text-xs font-bold tracking-wider uppercase rounded-full">
                            {t.featured}
                        </span>
                        <span className="text-xs text-gray-500 font-semibold uppercase tracking-widest">
                            {formatDate(event.date)}
                        </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 font-serif group-hover:text-aspol-navy transition-colors">
                        {event.title[language as keyof typeof event.title]}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-5 line-clamp-3">
                        {event.description[language as keyof typeof event.description]}
                    </p>
                    <div className="flex flex-col items-start gap-2 text-gray-500 text-sm mb-6">
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-aspol-red" />
                            <span className="font-medium text-gray-600">{formatTime(event.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-aspol-red" />
                            <span className="font-medium text-gray-600">{event.location[language as keyof typeof event.location]}</span>
                        </div>
                    </div>
                    <div className="flex gap-3 mt-auto">
                        {event.registrationLink && (
                            <a
                                href={event.registrationLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-5 py-3 bg-aspol-navy text-white rounded-xl hover:bg-aspol-red transition-all duration-300 font-semibold text-sm inline-flex items-center gap-2"
                            >
                                {t.register}
                                <ArrowRight className="w-4 h-4" />
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
                                fullDescription: "",
                                image: event.imageUrl,
                                category: "Event" as any,
                                registrationLink: event.registrationLink,
                            }}
                            className="px-4 border border-gray-200 hover:border-aspol-navy hover:bg-aspol-navy/5 text-aspol-navy rounded-xl transition-colors"
                            variant="outline"
                            label=""
                        />
                    </div>
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
    const [countdownConfig, setCountdownConfig] = useState<EventCountdownConfig | null>(null);

    const heroRef = useRef<HTMLDivElement>(null);
    useScrollAnimation(heroRef);

    useEffect(() => {
        async function fetchEvents() {
            try {
                const [eventsData, countdownData] = await Promise.all([
                    getEvents(),
                    getEventCountdown(),
                ]);
                setEvents(eventsData);
                setCountdownConfig(countdownData || null);
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchEvents();
    }, []);

    const countdownTargetTimestamp = useMemo(() => {
        if (countdownConfig?.targetDate) {
            return new Date(countdownConfig.targetDate).getTime();
        }
        return new Date("2026-04-25T00:00:00+02:00").getTime();
    }, [countdownConfig?.targetDate]);

    const getCountdown = (targetTimestamp: number) => {
        const now = new Date();
        const diff = targetTimestamp - now.getTime();
        if (diff <= 0) {
            return { done: true, days: 0, hours: 0, minutes: 0 };
        }
        const totalMinutes = Math.floor(diff / 60000);
        const days = Math.floor(totalMinutes / 1440);
        const hours = Math.floor((totalMinutes % 1440) / 60);
        const minutes = totalMinutes % 60;
        return { done: false, days, hours, minutes };
    };

    const [ppfCountdown, setPpfCountdown] = useState(() => getCountdown(countdownTargetTimestamp));

    useEffect(() => {
        setPpfCountdown(getCountdown(countdownTargetTimestamp));
        const id = setInterval(() => {
            setPpfCountdown(getCountdown(countdownTargetTimestamp));
        }, 60000);
        return () => clearInterval(id);
    }, [countdownTargetTimestamp]);


    const labels = {
        en: {
            title: "Events Calendar",
            subtitle: "Curated experiences for the Polish community in France.",
            upcoming: "Upcoming",
            past: "Archive",
            featured: "Featured",
            readMore: "Read More",
            showLess: "Show Less",
            register: "Register",
            empty: "No upcoming events scheduled at the moment.",
            loading: "Loading events...",
            scrollDown: "Scroll Down",
            heroBadge: "Community first",
            heroCardTitle: "Meet ASPOL live",
            heroCardDescription: "Meetups, workshops, and conferences created by students. Register for the next event or contact us.",
            heroCardCtaPrimary: "View events",
            heroCardCtaSecondary: "Contact us",
        },
        fr: {
            title: "Calendrier des Événements",
            subtitle: "Des expériences sélectionnées pour la communauté polonaise en France.",
            upcoming: "À venir",
            past: "Archives",
            featured: "À la une",
            readMore: "Lire la suite",
            showLess: "Voir moins",
            register: "S'inscrire",
            empty: "Aucun événement prévu pour le moment.",
            loading: "Chargement des événements...",
            scrollDown: "Défiler vers le bas",
            heroBadge: "La communauté d'abord",
            heroCardTitle: "Rencontrez ASPOL en direct",
            heroCardDescription: "Rencontres, ateliers et conférences créés par des étudiants. Inscrivez-vous au prochain événement ou contactez-nous.",
            heroCardCtaPrimary: "Voir les événements",
            heroCardCtaSecondary: "Contactez-nous",
        },
        pl: {
            title: "Kalendarz Wydarzeń",
            subtitle: "Wyjątkowe doświadczenia dla polskiej społeczności we Francji.",
            upcoming: "Nadchodzące",
            past: "Archiwum",
            featured: "Wyróżnione",
            readMore: "Czytaj więcej",
            showLess: "Pokaż mniej",
            register: "Zarejestruj się",
            empty: "Brak zaplanowanych wydarzeń w tym momencie.",
            loading: "Ładowanie wydarzeń...",
            scrollDown: "Przewiń w dół",
            heroBadge: "Społeczność przede wszystkim",
            heroCardTitle: "Poznaj ASPOL na żywo",
            heroCardDescription: "Spotkania, warsztaty i konferencje tworzone przez studentów. Zapisz się na najbliższe wydarzenie lub skontaktuj się z nami.",
            heroCardCtaPrimary: "Zobacz wydarzenia",
            heroCardCtaSecondary: "Skontaktuj się",
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

    const featuredEvents = sortedEvents.filter((event) => event.featured);
    const regularEvents = sortedEvents.filter((event) => !event.featured);

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
        <div className="min-h-screen bg-gray-50/30">

            {/* Hero Section - Unique Events Style but matching system */}
            <section
                ref={heroRef}
                className="relative min-h-[58vh] flex items-center justify-center px-4 sm:px-6 pt-32 pb-16 overflow-hidden bg-linear-to-b from-white via-white to-gray-50"
            >
                {/* Smooth Animated Background */}
                <SmoothBackground />

                <div className="max-w-7xl mx-auto relative z-10 w-full">
                    <div className="grid lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-7 flex flex-col items-start text-left">

                        {/* Badge */}
                        <div className="fade-in-element opacity-0 mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-aspol-navy/10 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-aspol-red animate-pulse"></span>
                            <span className="text-xs font-semibold tracking-wide text-aspol-navy uppercase">
                                ASPOL Events
                            </span>
                        </div>

                        {/* Main heading */}
                        <div className="fade-in-element opacity-0 mb-6">
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-aspol-dark mb-4 font-serif">
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
                        <div className="fade-in-element opacity-0 mt-4" style={{ animationDelay: "0.3s" }}>
                            <button onClick={scrollToEvents} className="flex items-center gap-3 cursor-pointer group">
                                <span className="text-xs font-semibold uppercase tracking-widest text-aspol-navy/40 group-hover:text-aspol-red transition-colors">{t.scrollDown}</span>
                                <ChevronDownIcon className="w-5 h-5 text-aspol-red animate-bounce" />
                            </button>
                        </div>
                    </div>

                    <div className="lg:col-span-5">
                        <div className="fade-in-element opacity-0 relative rounded-3xl border border-white/60 bg-white/90 p-6 sm:p-7 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.45)] backdrop-blur-sm overflow-hidden">
                            <div className="absolute -top-20 -right-16 h-48 w-48 rounded-full bg-aspol-red/10 blur-3xl" />
                            <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-aspol-navy/10 blur-3xl" />

                            <div className="relative">
                                <span className="inline-flex items-center gap-2 rounded-full bg-aspol-navy/5 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-aspol-navy mb-4">
                                    <span className="h-1.5 w-1.5 rounded-full bg-aspol-red" />
                                    {t.heroBadge}
                                </span>
                                <h3 className="text-2xl sm:text-3xl font-bold text-aspol-navy mb-3 font-serif">
                                    {t.heroCardTitle}
                                </h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {t.heroCardDescription}
                                </p>

                                {countdownConfig?.isActive !== false && (
                                    <div className="mb-6 rounded-2xl border border-aspol-navy/10 bg-white/70 p-4 sm:p-5 shadow-sm">
                                        <div className="flex items-center justify-between gap-3 mb-4">
                                            <div>
                                                <p className="text-[0.7rem] font-semibold uppercase tracking-widest text-aspol-navy/60">
                                                    {countdownConfig?.label?.[language as keyof EventCountdownConfig["label"]] ||
                                                        (language === "fr"
                                                            ? "Compte à rebours vers PPF X 2026"
                                                            : language === "en"
                                                                ? "Countdown to PPF X 2026"
                                                                : "Odliczanie do PPF X 2026")}
                                                </p>
                                                <p className="text-sm font-semibold text-aspol-navy">
                                                    {new Date(countdownTargetTimestamp).toLocaleDateString(
                                                        language === "fr" ? "fr-FR" : language === "pl" ? "pl-PL" : "en-US",
                                                        { day: "2-digit", month: "2-digit", year: "numeric" }
                                                    )}
                                                </p>
                                            </div>
                                            {countdownConfig?.showLiveBadge !== false && (
                                                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-aspol-red shadow-sm">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-aspol-red animate-pulse" />
                                                    {countdownConfig?.liveLabel?.[language as keyof EventCountdownConfig["label"]] || "Live"}
                                                </span>
                                            )}
                                        </div>
                                        {ppfCountdown.done ? (
                                            <div className="rounded-xl bg-white/80 px-4 py-3 text-sm font-semibold text-aspol-navy text-center shadow-sm">
                                                {countdownConfig?.completedMessage?.[language as keyof EventCountdownConfig["label"]] ||
                                                    (language === "fr"
                                                        ? "On commence aujourd’hui !"
                                                        : language === "en"
                                                            ? "We start today!"
                                                            : "Startujemy dziś!")}
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-3 gap-3 text-center">
                                                <div className="rounded-2xl bg-white px-3 py-3 shadow-sm border border-gray-100">
                                                    <div className="text-2xl font-bold text-aspol-navy leading-none">{ppfCountdown.days}</div>
                                                    <div className="text-[0.65rem] uppercase tracking-widest text-gray-500 mt-1">
                                                        {language === "fr" ? "jours" : language === "en" ? "days" : "dni"}
                                                    </div>
                                                </div>
                                                <div className="rounded-2xl bg-white px-3 py-3 shadow-sm border border-gray-100">
                                                    <div className="text-2xl font-bold text-aspol-navy leading-none">{ppfCountdown.hours}</div>
                                                    <div className="text-[0.65rem] uppercase tracking-widest text-gray-500 mt-1">
                                                        {language === "fr" ? "h" : language === "en" ? "hrs" : "godz."}
                                                    </div>
                                                </div>
                                                <div className="rounded-2xl bg-white px-3 py-3 shadow-sm border border-gray-100">
                                                    <div className="text-2xl font-bold text-aspol-navy leading-none">{ppfCountdown.minutes}</div>
                                                    <div className="text-[0.65rem] uppercase tracking-widest text-gray-500 mt-1">
                                                        {language === "fr" ? "min" : language === "en" ? "min" : "min"}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="flex flex-wrap gap-3">
                                    <button
                                        onClick={scrollToEvents}
                                        className="inline-flex items-center gap-2 px-5 py-3 bg-aspol-navy text-white rounded-xl hover:bg-aspol-red transition-colors text-sm font-semibold shadow-sm"
                                    >
                                        {t.heroCardCtaPrimary}
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                    <Link
                                        href="/#contact"
                                        className="inline-flex items-center gap-2 px-5 py-3 border border-gray-200 text-aspol-navy rounded-xl hover:border-aspol-navy hover:bg-aspol-navy/5 transition-colors text-sm font-semibold"
                                    >
                                        {t.heroCardCtaSecondary}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </section>

            {/* Filter Tabs - Modernized */}
            <section id="events-grid" className="py-6 px-6 sticky top-0 z-10 bg-white/95 backdrop-blur-md transition-all border-b border-gray-100/60">
                <div className="max-w-7xl mx-auto flex justify-center">
                    <div className="flex gap-2 p-1.5 bg-gray-100/60 rounded-full border border-gray-200/60 w-fit shadow-sm">
                    <button
                        onClick={() => setFilter("upcoming")}
                        className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 ${filter === "upcoming"
                            ? "bg-white text-aspol-red shadow-sm"
                            : "text-gray-500 hover:bg-white/50 hover:text-gray-900"
                            }`}
                    >
                        {t.upcoming}
                    </button>
                    <button
                        onClick={() => setFilter("past")}
                        className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 ${filter === "past"
                            ? "bg-white text-aspol-navy shadow-sm"
                            : "text-gray-500 hover:bg-white/50 hover:text-gray-900"
                            }`}
                    >
                        {t.past}
                    </button>
                    </div>
                </div>
            </section>

            {/* Events Grid */}
            <section className="py-20 px-6 bg-gray-50/30">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                        <div>
                            <span className="text-xs font-semibold uppercase tracking-widest text-aspol-red block mb-2">
                                {filter === "upcoming" ? t.upcoming : t.past}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-aspol-navy font-serif">
                                {t.title}
                            </h2>
                        </div>
                    </div>
                    {loading ? (
                        <div className="text-center py-32">
                            <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-aspol-red"></div>
                            <p className="mt-4 text-sm font-medium text-gray-500 tracking-wide uppercase">{t.loading}</p>
                        </div>
                    ) : sortedEvents.length === 0 ? (
                        <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-300/60">
                            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Calendar className="h-8 w-8 text-gray-400" />
                            </div>
                            <p className="text-lg font-medium text-gray-900">{t.empty}</p>
                            <p className="text-gray-500 mt-1">Check back later for updates.</p>
                        </div>
                    ) : (
                        <>
                            {filter === "upcoming" && featuredEvents.length > 0 && (
                                <div className="mb-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {featuredEvents.map((event, index) => (
                                        <div key={event._id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                                            <FeaturedEventCard
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

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {regularEvents.map((event, index) => (
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
                        </>
                    )}
                </div>
            </section>

            {/* Calendar Widget - Improved integration */}
            {filter === "upcoming" && (
                <section className="py-20 px-6 bg-white border-t border-gray-100/50 relative overflow-hidden">
                    <div className="max-w-5xl mx-auto relative z-10">
                        <div className="text-center mb-12">
                            <span className="text-aspol-red font-bold uppercase tracking-widest text-xs mb-2 block">Planned</span>
                            <h2 className="text-3xl font-bold text-aspol-navy font-serif">Month View</h2>
                        </div>
                        <div className="rounded-3xl border border-gray-100 shadow-sm p-2 bg-white">
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
                    </div>
                </section>
            )}
        </div>
    );
}

export default function EventsPage() {
    return <EventsContent />;
}
