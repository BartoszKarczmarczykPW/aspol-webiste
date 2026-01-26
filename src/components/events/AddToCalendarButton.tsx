"use client";

import React, { useState } from "react";
import { Calendar as CalendarIcon, Check } from "lucide-react";
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
        const start = event.isoDate.replace(/-/g, "") + "T180000Z";
        const end = event.isoDate.replace(/-/g, "") + "T200000Z";

        const text = encodeURIComponent(event.title);
        const details = encodeURIComponent(event.shortDescription);
        const location = encodeURIComponent(event.location);

        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${end}&details=${details}&location=${location}`;
    };

    const handleGoogleClick = () => {
        window.open(getGoogleCalendarLink(), "_blank");
    };

    const variants = {
        default: "bg-aspol-navy/5 hover:bg-aspol-navy/10 text-aspol-navy",
        glass: "bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 shadow-lg",
        outline: "border border-gray-200 hover:border-aspol-navy text-gray-600 hover:text-aspol-navy"
    };

    return (
        <button
            onClick={handleGoogleClick}
            className={`inline-flex items-center gap-2 px-4 py-2 font-bold rounded-xl transition-all duration-300 text-sm ${variants[variant]} ${className}`}
        >
            <CalendarIcon size={16} />
            {label}
        </button>
    );
}
