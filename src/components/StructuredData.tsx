export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ASPOL - Association des Étudiants Polonais en France",
    "alternateName": "ASPOL",
    "url": "https://aspol.fr",
    "logo": "https://aspol.fr/aspollogo.png",
    "description": "Association of Polish Students in France - Building prosperous future between Poland and France through mentoring, community events, and the Paris Polish Forum",
    "email": "contact@aspol.fr",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Paris",
      "addressCountry": "FR"
    },
    "sameAs": [
      "https://www.facebook.com/aspologne",
      "https://www.instagram.com/aspolska/",
      "https://www.linkedin.com/company/aspolscpo/"
    ],
    "foundingDate": "2017",
    "memberOf": {
      "@type": "Organization",
      "name": "Polish Student Organizations in Europe"
    },
    "knowsAbout": [
      "Polish culture",
      "French-Polish relations",
      "Student mentoring",
      "International education",
      "Cultural exchange"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ASPOL",
    "url": "https://aspol.fr",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://aspol.fr/?s={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "inLanguage": ["en", "fr", "pl"]
  };

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Paris Polish Forum",
    "description": "Annual flagship conference bringing together Polish and French communities at Sciences Po and the Embassy of Poland",
    "organizer": {
      "@type": "Organization",
      "name": "ASPOL",
      "url": "https://aspol.fr"
    },
    "location": {
      "@type": "Place",
      "name": "Sciences Po Paris",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Paris",
        "addressCountry": "FR"
      }
    },
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
    </>
  );
}
