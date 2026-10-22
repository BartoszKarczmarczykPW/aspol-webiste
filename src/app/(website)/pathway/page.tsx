"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, Rocket, School } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Reveal from "@/components/ui/Reveal";
import PageHero from "@/components/layout/PageHero";
import Pill from "@/components/ui/Pill";
import { PHOTOS, photoAlt } from "@/lib/photos";

const universities = [
    { name: "Sciences Po", url: "/pathway/sciences-po", logo: "/images/logos/sciences-po.png" },
    { name: "École Polytechnique", url: "/pathway/ecole-polytechnique", logo: "/images/logos/polytechnique.png" },
    { name: "ESSEC Business School", url: "/pathway/essec", logo: "/images/logos/essec.png" },
    { name: "HEC Paris", url: "/pathway/hec-paris", logo: "/images/logos/hec.png" },
    { name: "École Normale Supérieure", url: "/pathway/ecole-normale-superieure", logo: "/images/logos/ens.png" },
    { name: "ESCP Business School", url: "/pathway/escp-paris", logo: "/images/logos/escp.png" },
    { name: "Université Paris-Saclay", url: "/pathway/universite-paris-saclay", logo: "/images/logos/saclay.png" },
    { name: "INSEAD", url: "/pathway/insead", logo: "/images/logos/insead.png" },
    { name: "Panthéon-Assas University", url: "/pathway/pantheon-assas", logo: "/images/logos/assas.png" },
];

export default function PathwayPage() {
    const { t, language } = useLanguage();

    return (
        <main className="min-h-screen bg-aspol-white text-aspol-dark">
            {/* Hero Section */}
            <PageHero
                badge={t.pathway.heroBadge}
                title={`${t.pathway.heroTitleStart} ${t.pathway.heroTitleHighlight} ${t.pathway.heroTitleEnd}`}
                subtitle={t.pathway.heroSubtitle}
                actions={
                    <>
                        <Pill href="#universities">{t.pathway.heroPrimaryCta}</Pill>
                        <Pill href="/#contact" variant="ghost" noChip className="px-7">
                            {t.pathway.heroSecondaryCta}
                        </Pill>
                    </>
                }
                aside={
                    <div className="photo-card relative aspect-4/3 overflow-hidden rounded-[2rem] bg-aspol-dark">
                        <Image
                            src={PHOTOS.smilingPair.src}
                            alt={photoAlt("smilingPair", language)}
                            fill
                            priority
                            sizes="(min-width: 1024px) 40vw, 100vw"
                            className="object-cover"
                        />
                    </div>
                }
            />

            {/* Campus France Info */}
            <section className="container-x pt-14 sm:pt-20">
                <div className="flex flex-col items-start gap-6 rounded-[2rem] bg-aspol-mist p-7 sm:flex-row sm:items-center sm:gap-8 sm:p-10">
                    <div className="grid size-20 shrink-0 place-items-center rounded-3xl bg-white p-4">
                        <Image
                            src="/images/logos/campus-france.png"
                            alt="Campus France"
                            width={56}
                            height={56}
                            className="max-h-full max-w-full object-contain"
                        />
                    </div>
                    <div className="flex-1">
                        <h3 className="display display-sm mb-2">{t.pathway.campusFranceTitle}</h3>
                        <p className="max-w-[62ch] text-base leading-relaxed text-aspol-ink-soft sm:text-lg">
                            <span className="font-semibold text-aspol-red">Campus France</span> {t.pathway.campusFranceBodyPrefix}{" "}
                            <a
                                href="https://www.pologne.campusfrance.org/pl"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 font-semibold text-aspol-navy underline underline-offset-4 hover:text-aspol-red"
                            >
                                {t.pathway.campusFranceLink}
                                <ExternalLink className="size-4" aria-hidden="true" />
                            </a>
                        </p>
                    </div>
                </div>
            </section>

            {/* Universities Section */}
            <section id="universities" className="section-pad scroll-mt-20">
                <div className="container-x">
                    <div className="mb-10 grid gap-6 sm:mb-14 lg:grid-cols-12 lg:items-end lg:gap-12">
                        <Reveal as="h2" className="display display-lg lg:col-span-7" text={t.pathway.universitiesTitle} />
                        <p className="max-w-[44ch] text-base leading-relaxed text-aspol-ink-soft sm:text-lg lg:col-span-5">
                            {t.pathway.universitiesSubtitle}
                        </p>
                    </div>

                    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                        {universities.map((uni) => (
                            <li key={uni.url}>
                                <Link
                                    href={uni.url}
                                    className="group flex h-full items-center gap-5 rounded-[2rem] bg-aspol-mist p-5 transition-[border-radius] duration-700 ease-(--ease-out-expo) hover:rounded-[3rem] sm:p-6"
                                >
                                    <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-white p-3">
                                        <Image
                                            src={uni.logo}
                                            alt=""
                                            width={48}
                                            height={48}
                                            className="max-h-full max-w-full object-contain"
                                        />
                                    </span>
                                    <span className="min-w-0 flex-1">
                                        <span className="display display-sm block">{uni.name}</span>
                                        <span className="mt-1 block text-sm text-aspol-ink-soft">{t.pathway.universitiesCta}</span>
                                    </span>
                                    <span
                                        className="grid size-11 shrink-0 place-items-center rounded-full bg-aspol-navy text-white transition-transform duration-500 ease-(--ease-out-expo) group-hover:-rotate-45"
                                        aria-hidden="true"
                                    >
                                        <ArrowRight className="size-5" />
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Services Section */}
            <section className="pb-20 sm:pb-28">
                <div className="container-x">
                    <div className="mb-10 grid gap-6 sm:mb-14 lg:grid-cols-12 lg:items-end lg:gap-12">
                        <Reveal as="h2" className="display display-lg lg:col-span-7" text={t.pathway.supportTitle} />
                        <p className="max-w-[44ch] text-base leading-relaxed text-aspol-ink-soft sm:text-lg lg:col-span-5">
                            {t.pathway.supportSubtitle}
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        <article className="on-dark group flex min-h-80 flex-col justify-between gap-10 rounded-[2rem] bg-aspol-navy p-7 text-white transition-[border-radius] duration-700 ease-(--ease-out-expo) hover:rounded-[3.25rem] sm:p-10">
                            <span className="grid size-14 place-items-center rounded-full bg-white/15 transition-transform duration-500 ease-(--ease-out-expo) group-hover:-rotate-12 group-hover:scale-110" aria-hidden="true">
                                <Rocket className="size-7" />
                            </span>
                            <div>
                                <h3 className="display display-md">{t.pathway.mentoringTitle}</h3>
                                <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-white/85 sm:text-lg">{t.pathway.mentoringBody}</p>
                                <div className="mt-8">
                                    <Pill href="/#contact">{t.pathway.mentoringCta}</Pill>
                                </div>
                            </div>
                        </article>

                        <article className="group flex min-h-80 flex-col justify-between gap-10 rounded-[2rem] bg-aspol-mist p-7 transition-[border-radius] duration-700 ease-(--ease-out-expo) hover:rounded-[3.25rem] sm:p-10">
                            <span className="grid size-14 place-items-center rounded-full bg-white text-aspol-navy transition-transform duration-500 ease-(--ease-out-expo) group-hover:-rotate-12 group-hover:scale-110" aria-hidden="true">
                                <School className="size-7" />
                            </span>
                            <div>
                                <h3 className="display display-md">{t.pathway.visitsTitle}</h3>
                                <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-aspol-ink-soft sm:text-lg">{t.pathway.visitsBody}</p>
                                <div className="mt-8">
                                    <Pill href="/#contact" variant="dark">{t.pathway.visitsCta}</Pill>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="pb-20 sm:pb-28">
                <div className="container-x">
                    <div className="on-dark rounded-[2rem] bg-aspol-red p-8 text-white sm:p-14 lg:p-20">
                        <Reveal as="h2" className="display display-lg max-w-[16ch]" text={t.pathway.finalTitle} />
                        <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-white/90 sm:text-lg">{t.pathway.finalBody}</p>
                        <div className="mt-10">
                            <Pill href="/#contact">{t.pathway.finalCta}</Pill>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
