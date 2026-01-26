interface Event {
    name: string;
    startDate: string;
    endDate?: string;
    location: {
        name: string;
        address?: string;
    };
    description: string;
    url?: string;
    image?: string;
    organizer?: {
        name: string;
        url?: string;
    };
}

interface EventStructuredDataProps {
    events: Event[];
}

export default function EventStructuredData({ events }: EventStructuredDataProps) {
    const structuredData = events.map((event) => ({
        "@context": "https://schema.org",
        "@type": "Event",
        name: event.name,
        startDate: event.startDate,
        endDate: event.endDate || event.startDate,
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        location: {
            "@type": "Place",
            name: event.location.name,
            address: event.location.address
                ? {
                    "@type": "PostalAddress",
                    addressLocality: event.location.address,
                }
                : undefined,
        },
        image: event.image ? [event.image] : undefined,
        description: event.description,
        url: event.url,
        organizer: event.organizer
            ? {
                "@type": "Organization",
                name: event.organizer.name,
                url: event.organizer.url || "https://aspol.fr",
            }
            : {
                "@type": "Organization",
                name: "ASPOL",
                url: "https://aspol.fr",
            },
    }));

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(structuredData),
            }}
        />
    );
}
