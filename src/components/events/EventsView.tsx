"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { getEvents } from "@/lib/sanity";
import { Calendar, MapPin, Clock, ChevronDown, ChevronUp } from "lucide-react";
import AddToCalendarButton from "@/components/events/AddToCalendarButton";
import { ChevronDownIcon } from "@/components/icons/ChevronDownIcon";
import PageHero from "@/components/layout/PageHero";
import Reveal from "@/components/ui/Reveal";
import Pill from "@/components/ui/Pill";
import { PHOTOS, photoAlt } from "@/lib/photos";

const CalendarWidget = dynamic(() => import("@/components/events/CalendarWidget"), {
    ssr: false,
    loading: () => <div className="animate-pulse bg-gray-100 rounded-3xl h-[600px] w-full" />
});

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
    imageUrl: string | null;
    registrationLink?: string;
    tags?: string[];
    featured?: boolean;
}


type EventsLabels = {
    featured: string;
    showLess: string;
    readMore: string;
    register: string;
};

// Shared card for regular and featured events (featured = navy panel, regular = mist panel)
function EventCard({ event, t, formatDate, formatTime, language, featured = false }: {
    event: SanityEvent;
    t: EventsLabels;
    formatDate: (d: string) => string;
    formatTime: (d: string) => string;
    language: string;
    featured?: boolean;
}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const isPastEvent = new Date(event.date) < new Date();
    const lang = language as keyof typeof event.title;

    const dateObj = new Date(event.date);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleDateString(language === "fr" ? "fr-FR" : language === "pl" ? "pl-PL" : "en-US", { month: "short" });

    const tone = featured ? "on-dark bg-aspol-navy text-white" : "bg-aspol-mist text-aspol-dark";
    const soft = featured ? "text-white/80" : "text-aspol-ink-soft";

    return (
        <article className={`group relative flex h-full flex-col overflow-hidden rounded-[2rem] transition-[border-radius] duration-700 ease-(--ease-out-expo) hover:rounded-[3rem] ${tone}`}>
            <div className="relative aspect-16/10 overflow-hidden">
                <Image
                    src={event.imageUrl || "/placeholder-event.jpg"}
                    alt={event.title[lang]}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-1000 ease-(--ease-out-expo) group-hover:scale-105"
                />

                {/* Date tag */}
                <div className="absolute left-4 top-4 min-w-16 rounded-2xl bg-white px-3 py-2.5 text-center text-aspol-dark">
                    <span className="block font-display text-2xl font-extrabold leading-none">{day}</span>
                    <span className="mt-1 block text-xs font-bold text-aspol-red">{month}</span>
                </div>

                {event.featured && (
                    <span className="absolute right-4 top-4 rounded-full bg-aspol-red px-3.5 py-1.5 font-display text-xs font-bold text-white">
                        {t.featured}
                    </span>
                )}
            </div>

            <div className="flex grow flex-col p-6 sm:p-8">
                <h3 className="display display-sm mb-4">{event.title[lang]}</h3>

                <ul className={`mb-5 flex flex-col gap-2 text-sm ${soft}`}>
                    <li className="flex items-center gap-3">
                        <Clock className="size-4 shrink-0" aria-hidden="true" />
                        <span className="font-medium">{formatTime(event.date)}</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <MapPin className="size-4 shrink-0" aria-hidden="true" />
                        <span className="font-medium">{event.location[lang]}</span>
                    </li>
                </ul>

                <div className="mb-6 grow">
                    <p className={`text-base leading-relaxed ${soft} ${isExpanded ? "" : "line-clamp-3"}`}>
                        {event.description[lang]}
                    </p>
                    <button
                        type="button"
                        onClick={() => setIsExpanded(!isExpanded)}
                        aria-expanded={isExpanded}
                        className="mt-3 inline-flex items-center gap-2 font-display text-sm font-bold underline-offset-4 hover:underline"
                    >
                        {isExpanded ? t.showLess : t.readMore}
                        {isExpanded ? <ChevronUp className="size-4" aria-hidden="true" /> : <ChevronDown className="size-4" aria-hidden="true" />}
                    </button>
                </div>

                <div className={`mt-auto flex flex-wrap items-center gap-3 border-t pt-5 ${featured ? "border-white/20" : "border-aspol-line"}`}>
                    {event.registrationLink && !isPastEvent && (
                        <Pill href={event.registrationLink} target="_blank" rel="noopener noreferrer" variant={featured ? "light" : "dark"}>
                            {t.register}
                        </Pill>
                    )}
                    <AddToCalendarButton
                        event={{
                            id: event._id,
                            title: event.title[lang],
                            date: formatDate(event.date),
                            time: formatTime(event.date),
                            location: event.location[lang],
                            isoDate: event.date,
                            shortDescription: event.description[lang],
                            fullDescription: "",
                            image: event.imageUrl || "",
                            category: "Social",
                            registrationLink: event.registrationLink,
                        }}
                        variant={featured ? "glass" : "outline"}
                        label=""
                    />
                </div>
            </div>
        </article>
    );
}


/**
 * Static i18n labels — hoisted to module level so they are created once,
 * not re-allocated on every render.
 */
const LABELS = {
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
        emptyHint: "Check back later for updates.",
        loading: "Loading events...",
        scrollDown: "Scroll Down",
        planned: "Planned",
        monthView: "Month View",
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
        emptyHint: "Revenez plus tard pour les mises à jour.",
        loading: "Chargement des événements...",
        scrollDown: "Défiler vers le bas",
        planned: "Planifié",
        monthView: "Vue mensuelle",
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
        emptyHint: "Sprawdź ponownie później.",
        loading: "Ładowanie wydarzeń...",
        scrollDown: "Przewiń w dół",
        planned: "Zaplanowane",
        monthView: "Widok miesięczny",
        heroBadge: "Społeczność przede wszystkim",
        heroCardTitle: "Poznaj ASPOL na żywo",
        heroCardDescription: "Spotkania, warsztaty i konferencje tworzone przez studentów. Zapisz się na najbliższe wydarzenie lub skontaktuj się z nami.",
        heroCardCtaPrimary: "Zobacz wydarzenia",
        heroCardCtaSecondary: "Skontaktuj się",
    },
} as const;

/** Events listing. `initialEvents` comes from the server page so the cards are in the crawled HTML. */
export default function EventsView({ initialEvents = null }: { initialEvents?: SanityEvent[] | null }) {
    const { language } = useLanguage();
    const [filter, setFilter] = useState<"upcoming" | "past">("upcoming");
    const [events, setEvents] = useState<SanityEvent[]>(initialEvents ?? []);
    const [loading, setLoading] = useState(!initialEvents);


    useEffect(() => {
        if (initialEvents) return;
        async function fetchEvents() {
            try {
                const eventsData = await getEvents();
                setEvents(eventsData);
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchEvents();
    }, [initialEvents]);


    const t = LABELS[language as keyof typeof LABELS] || LABELS.en;

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
        <div className="min-h-screen bg-aspol-white text-aspol-dark">

            {/* Hero: shared PageHero, with the original "Meet ASPOL live" card over a photograph */}
            <PageHero
                badge="ASPOL Events"
                title={t.title}
                subtitle={t.subtitle}
                actions={
                    <button type="button" onClick={scrollToEvents} className="group inline-flex items-center gap-3 rounded-full py-2 pr-4 text-sm font-semibold text-white/85 transition-colors hover:text-white">
                        <span className="grid size-9 place-items-center rounded-full ring-1 ring-white/40" aria-hidden="true">
                            <ChevronDownIcon className="size-4 motion-safe:animate-bounce" />
                        </span>
                        {t.scrollDown}
                    </button>
                }
                aside={
                    <div className="photo-card relative overflow-hidden rounded-[2rem] bg-aspol-dark">
                        <div className="relative aspect-4/3">
                            <Image
                                src={PHOTOS.panelWide.src}
                                alt={photoAlt("panelWide", language)}
                                fill
                                sizes="(min-width: 1024px) 40vw, 100vw"
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-aspol-dark/80 to-transparent" aria-hidden="true" />
                        </div>
                        <div className="relative -mt-24 p-6 sm:p-7">
                            <div className="rounded-3xl bg-white p-5 text-aspol-dark sm:p-6">
                                <p className="mb-3 inline-flex rounded-full bg-aspol-mist px-3 py-1 text-xs font-semibold text-aspol-navy">{t.heroBadge}</p>
                                <h3 className="display display-sm mb-2">{t.heroCardTitle}</h3>
                                <p className="mb-5 text-base leading-relaxed text-aspol-ink-soft">{t.heroCardDescription}</p>
                                <div className="flex flex-wrap gap-3">
                                    <Pill variant="dark" onClick={scrollToEvents}>{t.heroCardCtaPrimary}</Pill>
                                    <Pill href="/#contact" variant="ghost" noChip className="px-6 text-aspol-dark">{t.heroCardCtaSecondary}</Pill>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            />

            {/* Filter: floating segmented control */}
            <div id="events-grid" className="pointer-events-none sticky top-22 z-10 flex justify-center px-4 py-4">
                <div className="pointer-events-auto flex gap-1 rounded-full bg-aspol-mist p-1.5 ring-1 ring-aspol-line" role="tablist" aria-label="Event filter">
                    {(["upcoming", "past"] as const).map((key) => (
                        <button
                            key={key}
                            type="button"
                            role="tab"
                            aria-selected={filter === key}
                            aria-controls="events-panel"
                            onClick={() => setFilter(key)}
                            className={`rounded-full px-6 py-2.5 font-display text-sm font-bold transition-colors duration-300 ${
                                filter === key ? "bg-aspol-navy text-white" : "text-aspol-dark hover:bg-aspol-line"
                            }`}
                        >
                            {key === "upcoming" ? t.upcoming : t.past}
                        </button>
                    ))}
                </div>
            </div>

            {/* Events Grid */}
            <section id="events-panel" role="tabpanel" className="section-pad pt-10 sm:pt-14">
                <div className="container-x">
                    <Reveal
                        key={`heading-${filter}`}
                        as="h2"
                        className="display display-lg mb-10 sm:mb-14"
                        text={filter === "upcoming" ? t.upcoming : t.past}
                    />

                    {loading ? (
                        <div className="py-32 text-center">
                            <div className="inline-block size-10 animate-spin rounded-full border-2 border-aspol-line border-t-aspol-navy"></div>
                            <p className="mt-4 text-sm font-medium text-aspol-ink-soft">{t.loading}</p>
                        </div>
                    ) : sortedEvents.length === 0 ? (
                        <div className="rounded-[2rem] bg-aspol-mist px-6 py-20 text-center">
                            <Calendar className="mx-auto mb-5 size-10 text-aspol-navy/50" aria-hidden="true" />
                            <p className="display display-sm">{t.empty}</p>
                            <p className="mt-2 text-aspol-ink-soft">{t.emptyHint}</p>
                        </div>
                    ) : (
                        <div key={`list-${filter}`} className="quote-in">
                            {filter === "upcoming" && featuredEvents.length > 0 && (
                                <ul className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
                                    {featuredEvents.map((event) => (
                                        <li key={event._id}>
                                            <EventCard event={event} t={t} formatDate={formatDate} formatTime={formatTime} language={language} featured />
                                        </li>
                                    ))}
                                </ul>
                            )}

                            <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                                {regularEvents.map((event) => (
                                    <li key={event._id}>
                                        <EventCard event={event} t={t} formatDate={formatDate} formatTime={formatTime} language={language} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </section>

            {/* Calendar */}
            {filter === "upcoming" && (
                <section className="section-pad bg-aspol-mist">
                    <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-14">
                        <div className="lg:col-span-5">
                            <p className="mb-6 flex items-center gap-4 font-display text-sm font-bold tracking-wide text-aspol-navy">
                                <span className="h-px w-12 bg-aspol-navy/40" aria-hidden="true" />
                                {t.planned}
                            </p>
                            <Reveal as="h2" className="display display-lg" text={t.monthView} />
                        </div>
                        <div className="lg:col-span-7">
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
                                    image: e.imageUrl || "",
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
