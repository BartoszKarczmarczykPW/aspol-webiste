"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteContent } from "@/contexts/SiteContentContext";
import SocialShare from "@/components/ui/SocialShare";
import Reveal from "@/components/ui/Reveal";
import Pill from "@/components/ui/Pill";
import { useSanityData } from "@/hooks/useSanityData";
import { getInitiatives, type SanityImageWithAlt } from "@/lib/sanity";
import { PHOTOS, photoAlt, type PhotoKey } from "@/lib/photos";

interface LocalizedString {
  en?: string;
  fr?: string;
  pl?: string;
}

interface SanityInitiative {
  image?: SanityImageWithAlt | null;
  link?: string;
  featured?: boolean;
  icon?: string;
  title?: LocalizedString;
  badge?: LocalizedString;
  description?: LocalizedString;
}

// Static icon components (outside render to prevent re-creation)
const ForumIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
  </svg>
);

const MentoringIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const UsersIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

/** Photo per initiative key; unknown keys cycle through the spare set. */
const PHOTO_BY_ICON: Record<string, PhotoKey> = {
  forum: "panel2026",
  mentoring: "networking",
  community: "laughingTrio",
};
const SPARE_PHOTOS: PhotoKey[] = ["sofaGroup", "violinPiano", "salonGroup"];

function IconFor({ icon, className }: { icon: string; className?: string }) {
  if (icon === "mentoring") return <MentoringIcon className={className} />;
  if (icon === "community") return <UsersIcon className={className} />;
  return <ForumIcon className={className} />;
}

export default function Events() {
  const { t, language } = useLanguage();
  const { home, text, image, joinUrl } = useSiteContent();
  const learnMore = language === "fr" ? "En savoir plus" : language === "pl" ? "Dowiedz się więcej" : "Learn more";

  const { data: initiativesData } = useSanityData<SanityInitiative[]>(
    async () => {
      const data = await getInitiatives();
      return Array.isArray(data) ? data : null;
    },
    { fallback: [] },
  );

  const fallbackInitiatives = [
    { icon: "forum", data: t.events.parisforum },
    { icon: "mentoring", data: t.events.mentoring },
    { icon: "community", data: t.events.community },
  ];

  const initiatives = (
    initiativesData.length
      ? initiativesData.map((item) => ({
          icon: item.icon || "forum",
          data: {
            title: item.title?.[language] || item.title?.en || "",
            badge: item.badge?.[language] || item.badge?.en || "",
            description: item.description?.[language] || item.description?.en || "",
          },
          featured: item.featured,
          image: item.image ?? null,
          link: item.link,
        }))
      : fallbackInitiatives.map((item) => ({
          icon: item.icon,
          data: item.data,
          featured: item.icon === "forum",
          image: null as SanityImageWithAlt | null,
          link: undefined as string | undefined,
        }))
  ).map((item, index, all) => {
    const spareIndex = all.slice(0, index).filter((o) => !PHOTO_BY_ICON[o.icon]).length;
    const photoKey = PHOTO_BY_ICON[item.icon] ?? SPARE_PHOTOS[spareIndex % SPARE_PHOTOS.length];
    return { ...item, photoKey };
  });

  const featured = initiatives.find((item) => item.featured) || initiatives[0];
  const secondary = initiatives.filter((item) => item !== featured);
  const featuredImg = image(featured?.image, 1600);

  const shareUrl = (title: string) => `https://aspol.fr/events#${title.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <section
      id="events"
      className="section-pad relative overflow-hidden bg-aspol-white text-aspol-dark"
      aria-label={language === "en" ? "Our initiatives" : language === "fr" ? "Nos initiatives" : "Nasze inicjatywy"}
    >
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <Reveal as="h2" className="display display-lg lg:col-span-7" text={text(home.initiativesTitle, t.events.title)} />
          <p className="max-w-[48ch] text-base leading-relaxed text-aspol-ink-soft sm:text-lg lg:col-span-5">
            {text(home.initiativesSubtitle, t.events.subtitle)}
          </p>
        </div>

        {/* Featured initiative: blue text panel + photograph */}
        {featured && (
          <article className="photo-card group mt-12 grid overflow-hidden rounded-[2rem] bg-aspol-navy text-white transition-[border-radius] duration-700 ease-(--ease-out-expo) hover:rounded-[3.5rem] sm:mt-16 lg:grid-cols-[1fr_1.05fr]">
            <div className="on-dark flex flex-col justify-between gap-12 p-7 sm:p-12">
              <div className="flex flex-wrap items-center gap-3">
                <span className="grid size-14 place-items-center rounded-full bg-white text-aspol-blue" aria-hidden="true">
                  <IconFor icon={featured.icon} className="size-7" />
                </span>
                {featured.data.badge && (
                  <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">{featured.data.badge}</span>
                )}
              </div>
              <div>
                <h3 className="display display-md">{featured.data.title}</h3>
                <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-white/85 sm:text-lg">
                  {featured.data.description}
                </p>
                {featured.link && (
                  <div className="mt-6">
                    <Pill href={featured.link} target="_blank" rel="noopener noreferrer">
                      {learnMore}
                    </Pill>
                  </div>
                )}
              </div>
              <div className="w-fit rounded-full bg-aspol-white px-4 py-2">
                <SocialShare
                  url={shareUrl(featured.data.title)}
                  title={`${featured.data.title} - ASPOL`}
                  description={featured.data.description}
                />
              </div>
            </div>
            <div className="relative min-h-72 lg:min-h-[32rem]">
              <Image
                src={featuredImg?.src ?? PHOTOS[featured.photoKey].src}
                alt={featuredImg?.alt || photoAlt(featured.photoKey, language)}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </article>
        )}

        {/* Remaining initiatives: photographic cards, any count */}
        {secondary.length > 0 && (
          <ul className="mt-5 grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,21rem),1fr))]">
            {secondary.map((initiative, index) => (
              <li key={index}>
                <article className="photo-card group on-dark relative flex min-h-[30rem] flex-col justify-end overflow-hidden rounded-[2rem] bg-aspol-dark text-white transition-[border-radius] duration-700 ease-(--ease-out-expo) hover:rounded-[3.25rem]">
                  <Image
                    src={image(initiative.image, 1200)?.src ?? PHOTOS[initiative.photoKey].src}
                    alt={image(initiative.image, 1200)?.alt || photoAlt(initiative.photoKey, language)}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-aspol-dark via-aspol-dark/60 to-transparent" aria-hidden="true" />
                  <div className="relative flex flex-col gap-4 p-7 sm:p-9">
                    <div className="flex items-center gap-3">
                      <span className="grid size-12 place-items-center rounded-full bg-white text-aspol-dark transition-transform duration-500 ease-(--ease-out-expo) group-hover:-rotate-12 group-hover:scale-110" aria-hidden="true">
                        <IconFor icon={initiative.icon} className="size-6" />
                      </span>
                      {initiative.data.badge && (
                        <span className="rounded-full bg-white/15 px-3.5 py-1.5 text-sm font-semibold backdrop-blur-sm">
                          {initiative.data.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="display display-sm">{initiative.data.title}</h3>
                    <p className="text-base leading-relaxed text-white/85">{initiative.data.description}</p>
                    {initiative.link && (
                      <Pill href={initiative.link} target="_blank" rel="noopener noreferrer" className="self-start">
                        {learnMore}
                      </Pill>
                    )}
                    <div className="w-fit rounded-full bg-aspol-white px-3 py-1.5">
                      <SocialShare
                        url={shareUrl(initiative.data.title)}
                        title={`${initiative.data.title} - ASPOL`}
                        description={initiative.data.description}
                      />
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}

        {/* Bottom CTA */}
        <div className="mt-14 flex flex-col items-start justify-between gap-6 sm:mt-20 sm:flex-row sm:items-center">
          <p className="display display-md max-w-[24ch]">{text(home.initiativesCta, t.events.cta)}</p>
          <Pill href={joinUrl} target="_blank" rel="noopener noreferrer" variant="red">
            {text(home.initiativesJoinButton, t.events.joinButton)}
          </Pill>
        </div>
      </div>
    </section>
  );
}
