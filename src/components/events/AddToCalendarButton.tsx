"use client";

import React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Event } from "@/types";

interface AddToCalendarButtonProps {
    event: Event;
    className?: string;
    label?: string;
    variant?: "default" | "glass" | "outline";
}

export default function AddToCalendarButton({ event, className = "", label = "Add to Calendar", variant = "default" }: AddToCalendarButtonProps) {
    // Helpers to generate links
    const getGoogleCalendarLink = () => {
        const date = new Date(event.isoDate);

        // Format date to YYYYMMDDTHHmmSSZ
        const formatDate = (d: Date) => {
            return d.toISOString().replace(/[-:]/g, "").split('.')[0] + "Z";
        };

        const start = formatDate(date);

        // Default duration 2 hours
        const endDate = new Date(date.getTime() + 2 * 60 * 60 * 1000);
        const end = formatDate(endDate);

        const text = encodeURIComponent(event.title);
        const details = encodeURIComponent(event.shortDescription);
        const location = encodeURIComponent(event.location);

        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${end}&details=${details}&location=${location}`;
    };

    const handleGoogleClick = () => {
        window.open(getGoogleCalendarLink(), "_blank");
    };

    const variants = {
        default: "bg-aspol-mist hover:bg-aspol-line text-aspol-dark",
        glass: "bg-white/15 hover:bg-white text-white hover:text-aspol-navy",
        outline: "ring-1 ring-aspol-line hover:bg-aspol-navy hover:text-white hover:ring-aspol-navy text-aspol-dark",
    };

    const iconOnly = !label;

    return (
        <button
            type="button"
            onClick={handleGoogleClick}
            aria-label={iconOnly ? "Add to Google Calendar" : undefined}
            className={`inline-flex items-center justify-center gap-2 rounded-full font-display font-bold transition-colors duration-300 text-sm ${
                iconOnly ? "size-14" : "min-h-14 px-6"
            } ${variants[variant]} ${className}`}
        >
            <CalendarIcon size={18} aria-hidden="true" />
            {label}
        </button>
    );
}
