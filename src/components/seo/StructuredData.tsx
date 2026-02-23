export default function StructuredData() {
    // Organization Schema
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "ASPOL",
        "alternateName": "Association des Étudiants Polonais en France",
        "url": "https://aspol.fr",
        "logo": "https://aspol.fr/aspollogo.png",
        "image": "https://aspol.fr/og-image.png",
        "description": "ASPOL is the leading association of Polish students in France, fostering community, networking, and cultural exchange through events, mentorship programs, and the annual Paris Polish Forum.",
        "foundingDate": "2016",
        "sameAs": [
            "https://www.instagram.com/aspolska",
            "https://www.linkedin.com/company/aspolscpo/",
            "https://www.facebook.com/aspologne"
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

    // Event Schema - PPF X 2026
    const eventSchema = {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": "Paris Polish Forum X – Reinventing Europe: A New Generational Treaty",
        "description": "The 10th edition of the Paris Polish Forum, held under the theme 'Reinventing Europe: A New Generational Treaty,' invites participants to Sciences Po and the Polish Embassy in Paris for high-level debates in English.",
        "startDate": "2026-04-17T14:00:00+02:00",
        "endDate": "2026-04-17T20:00:00+02:00",
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
        "image": "https://aspol.fr/og-image.png",
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
            "url": "https://aspol.fr/events",
            "price": "0",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock",
            "validFrom": "2026-01-01T00:00:00+02:00"
        },
        "isAccessibleForFree": true,
        "inLanguage": ["en", "fr", "pl"]
    };

    // WebSite Schema
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(organizationSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(eventSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(websiteSchema),
                }}
            />
        </>
    );
}
