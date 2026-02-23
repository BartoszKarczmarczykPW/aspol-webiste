"use client";

import { useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getPartners } from "@/lib/sanity";
import { useSanityData } from "@/hooks/useSanityData";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

interface PartnerItem {
  name: string;
  logoUrl: string;
  url: string;
  lqip?: string;
}

interface SanityPartner {
  name: string;
  website: string;
  logo?: { asset?: { metadata?: { lqip?: string } } };
  logoPath?: string;
}

const fallbackPartners: readonly PartnerItem[] = [
  { name: "Campus France", logoUrl: "/partners/campus-france.png", url: "https://www.campusfrance.org/" },
  { name: "Sciences Po Paris", logoUrl: "/partners/sciences-po.png", url: "https://www.sciencespo.fr/" },
  { name: "Polish Embassy in Paris", logoUrl: "/partners/polish-embassy.png", url: "https://www.gov.pl/web/france" },
  { name: "Boston Consulting Group", logoUrl: "/partners/bcg.png", url: "https://www.bcg.com/" },
  { name: "Société Générale", logoUrl: "/partners/societe-generale.png", url: "https://www.societegenerale.com/" },
  { name: "Publicis Groupe", logoUrl: "/partners/publicis.png", url: "https://www.publicisgroupe.com/" },
  { name: "La French Tech", logoUrl: "/partners/la-french-tech.png", url: "https://lafrenchtech.com/" },
];

export default function PartnersLogos() {
  const { t } = useLanguage();

  const { data: partners, loading } = useSanityData<PartnerItem[]>(
    async () => {
      const data = await getPartners();
      if (!Array.isArray(data) || data.length === 0) return null;
      const mapped = (data as SanityPartner[])
        .map((item) => {
          const logoUrl = item.logo?.asset
            ? urlFor(item.logo).width(320).height(160).fit("max").url()
            : item.logoPath || "";
          return {
            name: item.name,
            url: item.website,
            logoUrl,
            lqip: item.logo?.asset?.metadata?.lqip,
          };
        })
        .filter((item) => item.logoUrl);
      return mapped.length > 0 ? mapped : null;
    },
    { fallback: [...fallbackPartners] },
  );

  const infinitePartners = useMemo(
    () => [...partners, ...partners, ...partners, ...partners],
    [partners],
  );

  return (
    <section className="py-12 border-y border-gray-100 bg-white/50 backdrop-blur-sm overflow-hidden" aria-label="Our partners">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm font-semibold tracking-widest text-gray-500 uppercase mb-8">
          {(t.partners && t.partners.title) || "Trusted by Industry Leaders & Institutions"}
        </p>

        <div className="relative w-full mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] mb-8" role="marquee" aria-label="Partner logos">
          <div className="flex w-max items-center animate-scroll hover:pause-animation motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:w-auto">
            {(!loading ? infinitePartners : fallbackPartners).map((partner, index) => {
              // Only first set of partners is keyboard-focusable; duplicates are decorative
              const isDuplicate = !loading && index >= partners.length;
              return (
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                key={`${partner.name}-${index}`}
                tabIndex={isDuplicate ? -1 : undefined}
                aria-hidden={isDuplicate ? true : undefined}
                className="mx-4 sm:mx-8 md:mx-12 relative w-28 h-14 sm:w-32 sm:h-16 md:w-40 md:h-20 opacity-90 md:opacity-70 transition-all duration-300 md:hover:opacity-100 md:hover:scale-105 block"
              >
                <Image
                  src={partner.logoUrl}
                  alt={`${partner.name} - Official ASPOL Partner supporting Polish students in France`}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 128px, 160px"
                  className="object-contain mix-blend-multiply grayscale hover:grayscale-0"
                  style={{ filter: 'contrast(0.95) brightness(1.1)' }}
                  placeholder={partner.lqip ? "blur" : "empty"}
                  blurDataURL={partner.lqip}
                />
              </a>
              );
            })}
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
