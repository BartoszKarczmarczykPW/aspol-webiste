"use client";

import { MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { setConsent, useConsent } from "@/lib/consent";

interface EventMapProps {
    location: string;
    className?: string;
}

const LABELS = {
    en: {
        title: "Map of the venue",
        body: "Google Maps sets its own cookies, so the map loads only with your consent.",
        show: "Show map",
        open: "Open in Google Maps",
        frame: "Map showing location:",
    },
    fr: {
        title: "Plan d'accès",
        body: "Google Maps dépose ses propres cookies : la carte ne se charge qu'avec votre accord.",
        show: "Afficher la carte",
        open: "Ouvrir dans Google Maps",
        frame: "Carte du lieu :",
    },
    pl: {
        title: "Mapa dojazdu",
        body: "Mapy Google zapisują własne pliki cookie, dlatego mapa wczytuje się dopiero po Twojej zgodzie.",
        show: "Pokaż mapę",
        open: "Otwórz w Mapach Google",
        frame: "Mapa lokalizacji:",
    },
} as const;

export default function EventMap({ location, className = "" }: EventMapProps) {
    const { language } = useLanguage();
    const L = LABELS[language];
    const consent = useConsent();

    if (!location) return null;

    const encodedLocation = encodeURIComponent(location);
    const mapSrc = `https://maps.google.com/maps?q=${encodedLocation}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;

    if (consent !== "all") {
        return (
            <div className={`flex w-full flex-col items-start justify-center gap-3 overflow-hidden rounded-2xl border border-aspol-line bg-aspol-mist p-6 ${className}`}>
                <span className="grid size-10 place-items-center rounded-full bg-aspol-navy text-white" aria-hidden="true">
                    <MapPin size={20} />
                </span>
                <p className="font-display font-bold text-aspol-dark">{L.title}</p>
                <p className="max-w-[44ch] text-sm leading-relaxed text-aspol-ink-soft">{L.body}</p>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    <button
                        type="button"
                        onClick={() => setConsent("all")}
                        className="rounded-full bg-aspol-dark px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-aspol-navy"
                    >
                        {L.show}
                    </button>
                    <a
                        href={mapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-aspol-navy underline underline-offset-4 hover:text-aspol-red"
                    >
                        {L.open}
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className={`w-full rounded-2xl overflow-hidden shadow-sm border border-gray-100 ${className}`}>
            <iframe
                width="100%"
                height="100%"
                src={mapSrc}
                title={`${L.frame} ${location}`}
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
            />
        </div>
    );
}
