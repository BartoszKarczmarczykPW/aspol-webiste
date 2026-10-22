"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { useSanityData } from "@/hooks/useSanityData";
import { usePrefetch } from "@/contexts/SanityPrefetchContext";
import { getAboutSection, type SanityImageWithAlt } from "@/lib/sanity";
import { PHOTOS, photoAlt } from "@/lib/photos";
import Reveal from "@/components/ui/Reveal";
import { PillFace } from "@/components/ui/Pill";
import { GraduationIcon } from "@/components/icons/GraduationIcon";
import { UsersIcon } from "@/components/icons/UsersIcon";
import { RocketIcon } from "@/components/icons/RocketIcon";
import { GlobeIcon } from "@/components/icons/GlobeIcon";

interface LocalizedString {
  en?: string;
  fr?: string;
  pl?: string;
}

interface AboutFeature {
  image?: SanityImageWithAlt | null;
  icon?: string;
  order?: number;
  link?: string;
  title?: LocalizedString;
  description?: LocalizedString;
}

interface AboutSectionData {
  eyebrow?: LocalizedString;
  title?: LocalizedString;
  subtitle?: LocalizedString;
  description?: LocalizedString;
  features?: AboutFeature[];
}

/** Tone cycle for the secondary panels: tints/shades of the brand palette. */
const TONES = [
  "bg-aspol-dark text-white",
  "bg-aspol-mist text-aspol-dark",
  "bg-aspol-navy text-white",
] as const;

const SECONDARY_ICONS = [UsersIcon, RocketIcon, GlobeIcon];

const normalizeLink = (value?: string) => {
  if (!value) return "/pathway";
  if (value === "/" || value === "https://aspol.fr" || value === "https://www.aspol.fr") return "/pathway";
  if (value.startsWith("http")) {
    try {
      return new URL(value).pathname || "/pathway";
    } catch {
      return "/pathway";
    }
  }
  return value;
};

export default function About() {
  const { t, language } = useLanguage();
  const { image } = useSiteContent();

  const prefetch = usePrefetch();
  const { data: aboutData } = useSanityData<AboutSectionData | null>(getAboutSection, {
    fallback: null,
    initial: prefetch.about as AboutSectionData | null | undefined,
  });

  const pick = (value?: LocalizedString) => value?.[language] || value?.en || "";

  const fallbackFeatures: AboutFeature[] = t.about.features.map((feature) => ({
    icon: feature.icon,
    title: { en: feature.title, fr: feature.title, pl: feature.title },
    description: { en: feature.description, fr: feature.description, pl: feature.description },
  }));

  const features: AboutFeature[] = aboutData?.features?.length
    ? [...aboutData.features].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    : fallbackFeatures;

  const [pathway, ...secondary] = features;
  const leadImg = image(pathway?.image);
  const heading = aboutData?.title?.[language] || t.about.title;
  const eyebrow = aboutData?.eyebrow?.[language] || "Our Mission";
  const subtitle = aboutData?.subtitle?.[language] || t.about.subtitle;
  const description = aboutData?.description?.[language] || t.about.description;

  return (
    <section
      id="about"
      className="section-pad dome-gap relative overflow-hidden bg-aspol-white text-aspol-dark"
      aria-label={language === "en" ? "About ASPOL" : language === "fr" ? "À propos d'ASPOL" : "O ASPOL"}
    >
      <div className="container-x">
        {/* Header: big statement left, supporting copy right */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="mb-6 flex items-center gap-4 font-display text-sm font-bold tracking-wide text-aspol-navy">
              <span className="h-px w-12 bg-aspol-navy/40" aria-hidden="true" />
              {eyebrow}
            </p>
            <Reveal as="h2" className="display display-lg" text={heading} />
          </div>
          <div className="flex flex-col justify-end gap-5 lg:col-span-5">
            <p className="font-display text-xl font-bold leading-snug text-aspol-navy sm:text-2xl">{subtitle}</p>
            <p className="max-w-[60ch] text-base leading-relaxed text-aspol-ink-soft sm:text-lg">{description}</p>
          </div>
        </div>

        {/* Lead feature: wide photographic panel linking to the Pathway guide */}
        {pathway && (
          <Link
            href={normalizeLink(pathway.link)}
            className="group photo-card relative mt-14 block overflow-hidden rounded-[2rem] bg-aspol-dark text-white transition-[border-radius] duration-700 ease-(--ease-out-expo) hover:rounded-[3.5rem] sm:mt-20"
          >
            <Image
              src={leadImg?.src ?? PHOTOS.terraceDay.src}
              alt={leadImg?.alt || photoAlt("terraceDay", language)}
              width={PHOTOS.terraceDay.width}
              height={PHOTOS.terraceDay.height}
              sizes="(min-width: 1408px) 1312px, 100vw"
              className="absolute inset-0 size-full object-cover object-[50%_30%]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-aspol-dark via-aspol-dark/55 to-aspol-dark/10" aria-hidden="true" />
            <div className="relative flex min-h-[26rem] flex-col justify-end gap-6 p-7 sm:min-h-[32rem] sm:p-12 lg:min-h-[36rem]">
              <span className="grid size-14 place-items-center rounded-full bg-white text-aspol-red" aria-hidden="true">
                <GraduationIcon className="size-7" />
              </span>
              <div className="max-w-2xl">
                <h3 className="display display-md">{pick(pathway.title)}</h3>
                <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">{pick(pathway.description)}</p>
              </div>
              <PillFace className="self-start">{t.about.pathwayButton || "Learn More"}</PillFace>
            </div>
          </Link>
        )}

        {/* Remaining features: any count, auto-fitting columns */}
        {secondary.length > 0 && (
          <ul className="mt-5 grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,17rem),1fr))]">
            {secondary.map((feature, index) => {
              const Icon = SECONDARY_ICONS[index % SECONDARY_ICONS.length];
              const tone = TONES[index % TONES.length];
              return (
                <li
                  key={index}
                  className={`group flex min-h-72 flex-col justify-between gap-10 rounded-[2rem] p-7 transition-[border-radius] duration-700 ease-(--ease-out-expo) hover:rounded-[3.25rem] sm:p-9 ${tone}`}
                >
                  <span
                    className="grid size-14 place-items-center rounded-full bg-white/15 transition-transform duration-500 ease-(--ease-out-expo) group-hover:scale-110 group-hover:-rotate-12"
                    aria-hidden="true"
                  >
                    <Icon className="size-7" />
                  </span>
                  <div>
                    <h3 className="display display-sm">{pick(feature.title)}</h3>
                    <p className="mt-3 text-base leading-relaxed opacity-85">{pick(feature.description)}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
