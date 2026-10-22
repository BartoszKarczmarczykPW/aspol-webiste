"use client";

import dynamic from "next/dynamic";
import { use } from "react";
import Image from "next/image";
import { Calendar, MapPin, Clock } from "lucide-react";

import { eventsData } from "@/data/eventsData";
import { useLanguage } from "@/contexts/LanguageContext";
import PageHero from "@/components/layout/PageHero";
import Pill from "@/components/ui/Pill";
import AddToCalendarButton from "@/components/events/AddToCalendarButton";

const EventMap = dynamic(() => import("@/components/events/EventMap"), {
    ssr: false,
    loading: () => <div className="bg-aspol-mist animate-pulse rounded-[2rem] w-full h-64" />
});


interface PageProps {
    params: Promise<{ slug: string }>;
}

/**
 * Static i18n labels — hoisted to module level to avoid
 * re-creating the object on every render.
 */
const LABELS = {
    en: {
        back: "Back to Events",
        register: "Register Now",
        share: "Share",
        desc: "About this event",
        details: "Event Details",
        location: "Location",
        notFoundTitle: "Event Not Found",
        notFoundCta: "Return to Events",
        dateLabel: "Date",
        timeLabel: "Time",
        locationLabel: "Location",
        registrationClosed: "Registration Closed",
        addToCalendar: "Add to Calendar",
        tba: "TBA",
    },
    fr: {
        back: "Retour aux événements",
        register: "S'inscrire",
        share: "Partager",
        desc: "À propos de cet événement",
        details: "Détails de l'événement",
        location: "Lieu",
        notFoundTitle: "Événement introuvable",
        notFoundCta: "Retour aux événements",
        dateLabel: "Date",
        timeLabel: "Heure",
        locationLabel: "Lieu",
        registrationClosed: "Inscriptions fermées",
        addToCalendar: "Ajouter au calendrier",
        tba: "À confirmer",
    },
    pl: {
        back: "Powrót do wydarzeń",
        register: "Zarejestruj się",
        share: "Udostępnij",
        desc: "O wydarzeniu",
        details: "Szczegóły wydarzenia",
        location: "Lokalizacja",
        notFoundTitle: "Nie znaleziono wydarzenia",
        notFoundCta: "Wróć do wydarzeń",
        dateLabel: "Data",
        timeLabel: "Godzina",
        locationLabel: "Lokalizacja",
        registrationClosed: "Rejestracja zamknięta",
        addToCalendar: "Dodaj do kalendarza",
        tba: "Do ustalenia",
    },
} as const;

/** Fallback labels for unknown locales */
const FALLBACK_LABELS: Record<keyof typeof LABELS.en, string> = {
    back: "Back",
    register: "Register",
    share: "Share",
    desc: "About",
    details: "Details",
    location: "Location",
    notFoundTitle: "Event Not Found",
    notFoundCta: "Return to Events",
    dateLabel: "Date",
    timeLabel: "Time",
    locationLabel: "Location",
    registrationClosed: "Registration Closed",
    addToCalendar: "Add to Calendar",
    tba: "TBA",
};

function EventDetailContent({ slug }: { slug: string }) {
    const { language } = useLanguage();
    const t = LABELS[language as keyof typeof LABELS] || FALLBACK_LABELS;

    const events = eventsData[language as keyof typeof eventsData] || eventsData.en;
    const event = events.find((e) => e.id === slug);

    if (!event) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-aspol-white px-6">
                <div className="text-center">
                    <h1 className="display display-lg mb-6">{t.notFoundTitle}</h1>
                    <Pill href="/events" variant="dark">{t.notFoundCta}</Pill>
                </div>
            </div>
        );
    }

    const now = new Date();
    const eventEndOfDay = new Date(event.isoDate);
    eventEndOfDay.setHours(23, 59, 59, 999);
    const isPastEvent = eventEndOfDay < now;

    const detailRows = [
        { icon: Calendar, label: t.dateLabel, value: event.date },
        { icon: Clock, label: t.timeLabel, value: event.time || t.tba },
        { icon: MapPin, label: t.locationLabel, value: event.location },
    ];

    return (
        <div className="min-h-screen bg-aspol-white text-aspol-dark">
            <PageHero
                badge={event.category}
                title={event.title}
                titleClassName="text-[clamp(2rem,5vw,4.75rem)]"
                actions={
                    <Pill href="/events" variant="ghost" noChip className="px-7">
                        {t.back}
                    </Pill>
                }
            />

            <main className="pb-24 sm:pb-32">
                <div className="container-x pt-10 sm:pt-14">
                    <div className="relative aspect-16/9 overflow-hidden rounded-[2rem] bg-aspol-mist sm:aspect-21/9">
                        <Image src={event.image} alt={event.title} fill priority sizes="(min-width: 1408px) 1312px, 100vw" className="object-cover" />
                    </div>

                    <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
                        <div className="space-y-12 lg:col-span-7">
                            <section>
                                <h2 className="display display-md mb-6">{t.desc}</h2>
                                <div className="article-body">
                                    {event.fullDescription ? (
                                        <div dangerouslySetInnerHTML={{ __html: event.fullDescription }} />
                                    ) : (
                                        <p>{event.shortDescription}</p>
                                    )}
                                </div>
                            </section>

                            <section>
                                <h3 className="display display-sm mb-4">{t.location}</h3>
                                <p className="mb-4 text-aspol-ink-soft">{event.location}</p>
                                <EventMap location={event.location} className="h-64 rounded-[2rem]" />
                            </section>
                        </div>

                        <aside className="lg:col-span-5">
                            <div className="space-y-5 lg:sticky lg:top-28">
                                <div className="rounded-[2rem] bg-aspol-mist p-7 sm:p-9">
                                    <h3 className="display display-sm mb-7">{t.details}</h3>

                                    <ul className="mb-8 space-y-5">
                                        {detailRows.map(({ icon: Icon, label, value }) => (
                                            <li key={label} className="flex items-start gap-4">
                                                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-aspol-navy text-white" aria-hidden="true">
                                                    <Icon size={18} />
                                                </span>
                                                <div>
                                                    <p className="text-sm text-aspol-ink-soft">{label}</p>
                                                    <p className="font-display text-lg font-bold leading-snug">{value}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="flex flex-col items-stretch gap-3">
                                        {event.registrationLink && !isPastEvent ? (
                                            <Pill href={event.registrationLink} target="_blank" rel="noopener noreferrer" variant="dark" className="justify-between">
                                                {t.register}
                                            </Pill>
                                        ) : (
                                            <button type="button" disabled className="min-h-14 rounded-full bg-aspol-line px-6 font-display text-sm font-bold text-aspol-ink-soft">
                                                {t.registrationClosed}
                                            </button>
                                        )}

                                        <AddToCalendarButton event={event} variant="outline" className="w-full" label={t.addToCalendar} />
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default function EventPage({ params }: PageProps) {
    const resolvedParams = use(params);
    return <EventDetailContent slug={resolvedParams.slug} />;
}
