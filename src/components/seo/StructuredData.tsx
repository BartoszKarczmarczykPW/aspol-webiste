"use client";

import Script from 'next/script';

export default function StructuredData() {
    // Organization Schema
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "ASPOL",
        "alternateName": "Association des Étudiants Polonais en France",
        "url": "https://aspol.fr",
        "logo": "https://aspol.fr/aspollogo.png",
        "image": "https://aspol.fr/og-image.svg",
        "description": "ASPOL is the leading association of Polish students in France, fostering community, networking, and cultural exchange through events, mentorship programs, and the annual Paris Polish Forum.",
        "foundingDate": "2016",
        "sameAs": [
            "https://www.instagram.com/aspolska",
            "https://www.linkedin.com/company/aspol",
            "https://www.facebook.com/aspolska"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "General Inquiries",
            "email": "office@aspol.fr",
            "availableLanguage": ["English", "French", "Polish"]
        },
        "location": {
            "@type": "Place",
            "name": "Paris",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Paris",
                "addressRegion": "Île-de-France",
                "addressCountry": "FR"
            }
        },
        "areaServed": {
            "@type": "Country",
            "name": "France"
        }
    };

    // Event Schema - Paris Polish Forum VII
    const eventSchema = {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": "Paris Polish Forum VII",
        "description": "Poland's EU Vision: Leading an Innovation, Democracy, and Security. The seventh edition of Paris Polish Forum brings together students, professionals, and leaders to discuss Poland's role in shaping the future of the European Union.",
        "startDate": "2025-04-25T14:00:00+02:00",
        "endDate": "2025-04-25T20:00:00+02:00",
        "eventStatus": "https://schema.org/EventScheduled",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "location": {
            "@type": "Place",
            "name": "Sciences Po Paris",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "27 Rue Saint-Guillaume",
                "addressLocality": "Paris",
                "postalCode": "75007",
                "addressCountry": "FR"
            }
        },
        "image": "https://aspol.fr/og-image.svg",
        "organizer": {
            "@type": "Organization",
            "name": "ASPOL",
            "url": "https://aspol.fr"
        },
        "performer": {
            "@type": "Organization",
            "name": "ASPOL"
        },
        "offers": {
            "@type": "Offer",
            "url": "https://aspol.fr/#events",
            "price": "0",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock",
            "validFrom": "2025-01-01T00:00:00+02:00"
        },
        "isAccessibleForFree": true,
        "inLanguage": ["en", "fr", "pl"]
    };

    // WebSite Schema with Search Action
    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "ASPOL - Association des Étudiants Polonais en France",
        "alternateName": "ASPOL",
        "url": "https://aspol.fr",
        "description": "The official website of ASPOL, connecting Polish students across France through networking, events, and mentorship programs.",
        "inLanguage": ["en", "fr", "pl"],
        "publisher": {
            "@type": "Organization",
            "name": "ASPOL"
        }
    };

    return (
        <>
            {/* Organization Schema */}
            <Script
                id="organization-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(organizationSchema),
                }}
            />

            {/* Event Schema */}
            <Script
                id="event-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(eventSchema),
                }}
            />

            {/* WebSite Schema */}
            <Script
                id="website-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(websiteSchema),
                }}
            />
        </>
    );
}
