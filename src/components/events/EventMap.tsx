"use client";

import React from "react";

interface EventMapProps {
    location: string;
    className?: string;
}

export default function EventMap({ location, className = "" }: EventMapProps) {
    if (!location) return null;

    const encodedLocation = encodeURIComponent(location);
    const mapSrc = `https://maps.google.com/maps?q=${encodedLocation}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

    return (
        <div className={`w-full rounded-2xl overflow-hidden shadow-sm border border-gray-100 ${className}`}>
            <iframe
                width="100%"
                height="100%"
                src={mapSrc}
                title={`Map showing location: ${location}`}
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
            />
        </div>
    );
}
