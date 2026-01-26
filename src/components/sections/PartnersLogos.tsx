"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import Link from "next/link";

export default function PartnersLogos() {
  const { t } = useLanguage();

  const partners = [
    { name: "Campus France", logo: "/partners/campus-france.png", url: "https://www.campusfrance.org/" },
    { name: "Sciences Po Paris", logo: "/partners/sciences-po.png", url: "https://www.sciencespo.fr/" },
    { name: "Polish Embassy in Paris", logo: "/partners/polish-embassy.png", url: "https://www.gov.pl/web/france" },
    { name: "Boston Consulting Group", logo: "/partners/bcg.png", url: "https://www.bcg.com/" },
    { name: "Société Générale", logo: "/partners/societe-generale.png", url: "https://www.societegenerale.com/" },
    { name: "Publicis Groupe", logo: "/partners/publicis.png", url: "https://www.publicisgroupe.com/" },
    { name: "La French Tech", logo: "/partners/la-french-tech.png", url: "https://lafrenchtech.com/" },
  ];

  // Duplicate the array to ensure seamless scrolling logic (we need enough width)
  const infinitePartners = [...partners, ...partners, ...partners, ...partners];

  return (
    <section className="py-12 border-y border-gray-100 bg-white/50 backdrop-blur-sm overflow-hidden">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm font-semibold tracking-widest text-gray-500 uppercase mb-8">
          {(t.partners && t.partners.title) || "Trusted by Industry Leaders & Institutions"}
        </p>

        <div className="relative w-full mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] mb-8">
          <div className="flex w-max items-center animate-scroll hover:pause-animation">
            {infinitePartners.map((partner, index) => (
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                key={`${partner.name}-${index}`}
                className="mx-8 md:mx-12 relative w-32 h-16 md:w-40 md:h-20 opacity-70 transition-all duration-300 hover:opacity-100 hover:scale-105 block"
              >
                <Image
                  src={partner.logo}
                  alt={`${partner.name} - Official ASPOL Partner supporting Polish students in France`}
                  fill
                  sizes="(max-width: 768px) 128px, 160px"
                  className="object-contain mix-blend-multiply grayscale hover:grayscale-0"
                  style={{ filter: 'contrast(0.95) brightness(1.1)' }}
                />
              </a>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/partners"
            className="inline-flex items-center gap-2 text-sm font-medium text-aspol-red hover:text-aspol-navy transition-colors group"
          >
            {(t.partners && t.partners.cta) || "Become a Partner"}
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
