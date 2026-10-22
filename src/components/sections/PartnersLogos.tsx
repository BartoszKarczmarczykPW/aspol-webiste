"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { getPartners } from "@/lib/sanity";
import { useSanityData } from "@/hooks/useSanityData";
import { usePrefetch } from "@/contexts/SanityPrefetchContext";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Pill from "@/components/ui/Pill";

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

/** Sanity partners -> logo tiles (null when nothing is usable, so the built-in list is shown). */
function mapPartners(data: unknown): PartnerItem[] | null {
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
}

export default function PartnersLogos() {
  const { t } = useLanguage();
  const { home, text } = useSiteContent();

  const prefetch = usePrefetch();
  const { data: partners, loading } = useSanityData<PartnerItem[]>(
    async () => mapPartners(await getPartners()),
    { fallback: [...fallbackPartners], initial: mapPartners(prefetch.partners) },
  );

  const safePartners = partners || fallbackPartners;
  const infinitePartners = [...safePartners, ...safePartners, ...safePartners, ...safePartners];

  return (
    <section className="relative overflow-hidden bg-aspol-white py-14 sm:py-20" aria-label="Our partners">
      <div className="container-x flex flex-col gap-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <p className="display display-md max-w-[22ch] text-aspol-dark">
            {text(home.partnersTitle, (t.partners && t.partners.title) || "Trusted by Industry Leaders & Institutions")}
          </p>
          <Pill href="/partners" variant="dark" className="self-start sm:self-auto">
            {text(home.partnersCta, (t.partners && t.partners.cta) || "Become a Partner")}
          </Pill>
        </div>
      </div>

      <div
        className="relative mt-10 w-full mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        role="marquee"
        aria-label="Partner logos"
      >
        <div className="flex w-max items-center animate-[scroll_70s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:justify-center">
          {(!loading ? infinitePartners : fallbackPartners).map((partner, index) => {
            // Only the first set is keyboard-focusable; duplicates are decorative
            const isDuplicate = !loading && index >= partners.length;
            return (
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                key={`${partner.name}-${index}`}
                tabIndex={isDuplicate ? -1 : undefined}
                aria-hidden={isDuplicate ? true : undefined}
                className="relative mx-3 block h-20 w-40 shrink-0 rounded-3xl bg-aspol-mist p-4 transition-colors duration-500 hover:bg-white sm:mx-4 sm:h-24 sm:w-48"
              >
                <Image
                  src={partner.logoUrl}
                  alt={`${partner.name} - Official ASPOL Partner supporting Polish students in France`}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 160px, 192px"
                  className="object-contain p-4 mix-blend-multiply grayscale transition-[filter] duration-500 hover:grayscale-0"
                  placeholder={partner.lqip ? "blur" : "empty"}
                  blurDataURL={partner.lqip}
                />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
