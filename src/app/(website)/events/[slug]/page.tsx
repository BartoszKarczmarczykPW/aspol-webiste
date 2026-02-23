"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Clock, Share2 } from "lucide-react";

import { eventsData } from "@/data/eventsData";
import { useLanguage } from "@/contexts/LanguageContext";
import RippleButton from "@/components/ui/RippleButton";
import AddToCalendarButton from "@/components/events/AddToCalendarButton";
import EventMap from "@/components/events/EventMap";


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
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.notFoundTitle}</h1>
                    <Link href="/events" className="text-aspol-red font-bold hover:underline">{t.notFoundCta}</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFDFD] font-sans">


            <main className="pt-24 pb-20">
                {/* HERO SECTION */}
                <section className="relative h-[60vh] min-h-125 w-full overflow-hidden">
                    <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-aspol-navy/90 via-aspol-navy/50 to-transparent" />

                    <div className="absolute bottom-0 left-0 w-full p-6 sm:p-12 pb-16 z-20">
                        <div className="max-w-7xl mx-auto">
                            <Link href="/events" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full text-sm font-medium border border-white/10 hover:bg-black/30">
                                <ArrowLeft size={16} className="mr-2" />
                                {t.back}
                            </Link>

                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-aspol-red text-white text-xs font-bold tracking-widest uppercase rounded-lg mb-4 shadow-lg">
                                {event.category}
                            </div>

                            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight max-w-4xl shadow-sm">
                                {event.title}
                            </h1>

                            <div className="flex flex-wrap gap-x-8 gap-y-4 text-white/90 font-medium text-lg">
                                <div className="flex items-center gap-3">
                                    <Calendar className="text-aspol-red" size={20} />
                                    {event.date}
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPin className="text-aspol-red" size={20} />
                                    {event.location}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CONTENT GRID */}
                <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-30">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                        {/* LEFT COLUMN: Main Content */}
                        <div className="lg:col-span-8 space-y-12">
                            {/* Description Card */}
                            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
                                <h2 className="text-2xl font-serif font-bold text-aspol-navy mb-8 pb-4 border-b border-gray-100 italic">
                                    {t.desc}
                                </h2>

                                <div className="prose prose-lg prose-slate max-w-none text-gray-600 leading-relaxed space-y-6">
                                    {/* Render HTML content safely if available, otherwise fallback to short description */}
                                    {event.fullDescription ? (
                                        <div dangerouslySetInnerHTML={{ __html: event.fullDescription }} />
                                    ) : (
                                        <p>{event.shortDescription}</p>
                                    )}
                                </div>
                            </div>

                            {/* Map / Additional Info (Placeholder) */}
                            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                                <h3 className="text-xl font-bold text-aspol-navy mb-4 flex items-center gap-2">
                                    <MapPin className="text-aspol-red" /> {t.location}
                                </h3>
                                <p className="text-gray-600 mb-4">{event.location}</p>
                                <EventMap location={event.location} className="h-64 rounded-xl" />
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Sidebar (Sticky) */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="sticky top-32 space-y-6">

                                {/* Registration Card */}
                                <div className="bg-white rounded-3xl p-8 shadow-xl border border-aspol-navy/5 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-aspol-red/5 rounded-bl-full -mr-4 -mt-4" />

                                    <h3 className="text-xl font-bold text-aspol-navy mb-6">{t.details}</h3>

                                    <div className="space-y-6 mb-8">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 text-aspol-blue">
                                                <Calendar size={18} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{t.dateLabel}</p>
                                                <p className="font-semibold text-gray-900">{event.date}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 text-aspol-blue">
                                                <Clock size={18} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{t.timeLabel}</p>
                                                <p className="font-semibold text-gray-900">{event.time || t.tba}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 text-aspol-blue">
                                                <MapPin size={18} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{t.locationLabel}</p>
                                                <p className="font-semibold text-gray-900">{event.location}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {event.registrationLink ? (
                                            <RippleButton
                                                href={event.registrationLink}
                                                className="w-full py-4 bg-aspol-navy text-white font-bold rounded-xl hover:bg-aspol-blue transition-all shadow-lg text-center block"
                                            >
                                                {t.register}
                                            </RippleButton>
                                        ) : (
                                            <button disabled className="w-full py-4 bg-gray-100 text-gray-400 font-bold rounded-xl cursor-not-allowed">
                                                {t.registrationClosed}
                                            </button>
                                        )}

                                        <AddToCalendarButton
                                            event={event}
                                            className="w-full"
                                            label={t.addToCalendar}
                                        />
                                    </div>
                                </div>

                                {/* Share Card (Optional) */}
                                <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-sm flex items-center justify-between">
                                    <span className="font-semibold text-gray-700">{t.share}</span>
                                    <div className="flex gap-2">
                                        <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-aspol-blue hover:shadow-md transition-all">
                                            <Share2 size={18} />
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
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
