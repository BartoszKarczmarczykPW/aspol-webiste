import Script from 'next/script';

interface StructuredDataProps {
  data?: Record<string, unknown>;
}

export default function StructuredData({ data }: StructuredDataProps) {
  const jsonLd = data || {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ASPOL",
    "url": "https://aspol.fr",
    "logo": "https://aspol.fr/logo.png",
    "sameAs": [
      "https://facebook.com/aspologne",
      "https://instagram.com/aspolska", 
      "https://linkedin.com/company/aspol-fr"
    ]
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
