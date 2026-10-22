"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { useSanityData } from "@/hooks/useSanityData";
import { getPartnersPage, type SanityPartnersPage } from "@/lib/sanity";
import Image from "next/image";
import PageHero from "@/components/layout/PageHero";
import Pill from "@/components/ui/Pill";
import Reveal from "@/components/ui/Reveal";
import { PHOTOS, photoAlt } from "@/lib/photos";
import { Users, Globe, TrendingUp, Check } from "lucide-react";

/**
 * Static i18n content — hoisted to module level so the large object
 * is created once at import time, not re-allocated on every render.
 */
const CONTENT = {
    en: {
        hero: {
            label: "For Business Partners",
            title: "Bridge to Top Polish Talent in France",
            subtitle: "We connect visionary companies with high-potential students from Sciences Po, HEC Paris, Sorbonne, and other leading institutions.",
            cta: "Start a Conversation",
        },
        value: {
            title: "Strategic Value",
            items: [
                {
                    icon: Users,
                    title: "Access to Elite Talent",
                    desc: "Direct recruitment channel to pre-screened, bilingual candidates from top 5 French universities."
                },
                {
                    icon: TrendingUp,
                    title: "Employer Branding",
                    desc: "Position your company as a top employer of choice among the most ambitious Polish students abroad."
                },
                {
                    icon: Globe,
                    title: "CSR & Community Impact",
                    desc: "Support the development of the Polish community in France and foster cross-border cooperation."
                }
            ]
        },
        scope: {
            title: "Scope of Collaboration",
            subtitle: "We believe in partnerships that drive real results. Our cooperation model is flexible and tailored to your business objectives.",
            items: [
                "Logo & brand visibility at Paris Polish Forum conference",
                "Presence in ASPOL newsletter & social media campaigns",
                "Speaking opportunities & dedicated panel sessions at PPF",
                "Direct communication with ASPOL student community",
                "Access to student CV database & career survey insights",
                "Co-creation of educational projects & webinars",
                "Promotional materials in conference packages",
                "Exclusive industry partnership opportunities"
            ]
        },
        demographics: {
            title: "Our Community Profile",
            stats: [
                { value: "40%", label: "Sciences Po Paris" },
                { value: "25%", label: "HEC / ESSEC / ESCP" },
                { value: "20%", label: "Sorbonne & Polytechnic" },
                { value: "15%", label: "Other Grand Écoles" },
            ],
            disciplines: "Law • Finance • International Relations • Engineering"
        },
        cta: {
            title: "Let's Build Something Together",
            subtitle: "Each partnership is unique. Contact us to design a collaboration plan that meets your specific goals.",
            button: "Contact Partnership Team",
            email: "office@aspol.fr",
            emailCta: "or email us directly at",
        }
    },
    fr: {
        hero: {
            label: "Pour les Partenaires",
            title: "Un pont vers les meilleurs talents polonais en France",
            subtitle: "Nous connectons les entreprises visionnaires avec des étudiants à haut potentiel de Sciences Po, HEC Paris, la Sorbonne et d'autres grandes écoles.",
            cta: "Démarrer une conversation",
        },
        value: {
            title: "Valeur Stratégique",
            items: [
                {
                    icon: Users,
                    title: "Accès aux Talents d'Élite",
                    desc: "Canal de recrutement direct vers des candidats bilingues et pré-sélectionnés des 5 meilleures universités françaises."
                },
                {
                    icon: TrendingUp,
                    title: "Marque Employeur",
                    desc: "Positionnez votre entreprise comme un employeur de choix parmi les étudiants polonais les plus ambitieux à l'étranger."
                },
                {
                    icon: Globe,
                    title: "RSE & Impact Communautaire",
                    desc: "Soutenez le développement de la communauté polonaise en France et favorisez la coopération transfrontalière."
                }
            ]
        },
        scope: {
            title: "Périmètre de Collaboration",
            subtitle: "Nous croyons aux partenariats qui donnent des résultats concrets. Notre modèle de coopération est flexible et adapté à vos objectifs commerciaux.",
            items: [
                "Logo & visibilité de la marque lors de la conférence Paris Polish Forum",
                "Présence dans la newsletter ASPOL & campagnes sur les réseaux sociaux",
                "Opportunités de prise de parole & sessions de panel dédiées au PPF",
                "Communication directe avec la communauté étudiante ASPOL",
                "Accès à la base de données CV étudiants & insights d'enquête carrière",
                "Co-création de projets éducatifs & webinaires",
                "Matériels promotionnels dans les paquets de conférence",
                "Opportunités de partenariat exclusif dans l'industrie"
            ]
        },
        demographics: {
            title: "Profil de Notre Communauté",
            stats: [
                { value: "40%", label: "Sciences Po Paris" },
                { value: "25%", label: "HEC / ESSEC / ESCP" },
                { value: "20%", label: "Sorbonne & Polytechnique" },
                { value: "15%", label: "Autres Grandes Écoles" },
            ],
            disciplines: "Droit • Finance • Relations Internationales • Ingénierie"
        },
        cta: {
            title: "Construisons quelque chose ensemble",
            subtitle: "Chaque partenariat est unique. Contactez-nous pour concevoir un plan de collaboration qui répond à vos objectifs spécifiques.",
            button: "Contacter l'équipe Partenariats",
            email: "office@aspol.fr",
            emailCta: "ou envoyez-nous un email directement à",
        }
    },
    pl: {
        hero: {
            label: "Dla Partnerów Biznesowych",
            title: "Most do najlepszych polskich talentów we Francji",
            subtitle: "Łączymy wizjonerskie firmy ze studentami o wysokim potencjale z Sciences Po, HEC Paris, Sorbony i innych wiodących uczelni.",
            cta: "Rozpocznij Rozmowę",
        },
        value: {
            title: "Wartość Strategiczna",
            items: [
                {
                    icon: Users,
                    title: "Dostęp do Elitarnych Talentów",
                    desc: "Bezpośredni kanał rekrutacyjny do wstępnie zweryfikowanych, dwujęzycznych kandydatów z top 5 francuskich uczelni."
                },
                {
                    icon: TrendingUp,
                    title: "Employer Branding",
                    desc: "Pozycjonuj swoją firmę jako pracodawcę z wyboru wśród najbardziej ambitnych polskich studentów za granicą."
                },
                {
                    icon: Globe,
                    title: "CSR i Społeczność",
                    desc: "Wspieraj rozwój polskiej społeczności we Francji i promuj współpracę transgraniczną."
                }
            ]
        },
        scope: {
            title: "Zakres Współpracy",
            subtitle: "Wierzymy w partnerstwa, które przynoszą realne wyniki. Nasz model współpracy jest elastyczny i dopasowany do Twoich celów biznesowych.",
            items: [
                "Logo & widoczność marki podczas konferencji Paris Polish Forum",
                "Obecność w newsletterze ASPOL & kampaniach w mediach społecznościowych",
                "Możliwości wystąpień & dedykowane sesje panelowe na PPF",
                "Bezpośrednia komunikacja ze społecznością studencką ASPOL",
                "Dostęp do bazy CV studentów & wyników ankiet zawodowych",
                "Współtworzenie projektów edukacyjnych & webinarów",
                "Materiały promocyjne w paczkach konferencyjnych",
                "Ekskluzywne możliwości partnerstwa branżowego"
            ]
        },
        demographics: {
            title: "Profil Naszej Społeczności",
            stats: [
                { value: "40%", label: "Sciences Po Paris" },
                { value: "25%", label: "HEC / ESSEC / ESCP" },
                { value: "20%", label: "Sorbonne & Politechnika" },
                { value: "15%", label: "Inne Grandes Écoles" },
            ],
            disciplines: "Prawo • Finanse • Stosunki Międzynarodowe • Inżynieria"
        },
        cta: {
            title: "Zbudujmy coś razem",
            subtitle: "Każde partnerstwo jest wyjątkowe. Skontaktuj się z nami, aby opracować plan współpracy spełniający Twoje konkretne cele.",
            button: "Skontaktuj się z Działem Partnerstw",
            email: "office@aspol.fr",
            emailCta: "lub napisz do nas bezpośrednio na",
        }
    }
} as const;

export default function PartnersPage() {
    const { language } = useLanguage();

    const { settings, text, image } = useSiteContent();
    const { data: cms } = useSanityData<SanityPartnersPage | null>(getPartnersPage, { fallback: null });
    const d = CONTENT[language as keyof typeof CONTENT] || CONTENT.en;

    // Built-in copy is the base; any field (or list) filled in Sanity replaces it.
    const pageContent = {
        hero: {
            label: text(cms?.heroLabel, d.hero.label),
            title: text(cms?.heroTitle, d.hero.title),
            subtitle: text(cms?.heroSubtitle, d.hero.subtitle),
            cta: text(cms?.heroCta, d.hero.cta),
        },
        value: {
            title: text(cms?.valueTitle, d.value.title),
            items: cms?.valueItems?.length
                ? cms.valueItems.map((item, i) => ({
                      icon: d.value.items[i % d.value.items.length].icon,
                      title: text(item.title, ""),
                      desc: text(item.description, ""),
                  }))
                : d.value.items,
        },
        scope: {
            title: text(cms?.scopeTitle, d.scope.title),
            subtitle: text(cms?.scopeSubtitle, d.scope.subtitle),
            items: cms?.scopeItems?.length
                ? cms.scopeItems.map((item) => text(item.text, "")).filter(Boolean)
                : d.scope.items,
        },
        demographics: {
            title: text(cms?.communityTitle, d.demographics.title),
            disciplines: text(cms?.disciplines, d.demographics.disciplines),
            stats: cms?.stats?.length
                ? cms.stats.map((stat) => ({ value: stat.value ?? "", label: text(stat.label, "") }))
                : d.demographics.stats,
        },
        cta: {
            title: text(cms?.ctaTitle, d.cta.title),
            subtitle: text(cms?.ctaSubtitle, d.cta.subtitle),
            button: text(cms?.ctaButton, d.cta.button),
            email: settings.contactEmail || d.cta.email,
            emailCta: text(cms?.ctaEmailText, d.cta.emailCta),
        },
    };
    const heroImg = image(cms?.heroImage);
    const tones = [
        "bg-aspol-dark text-white",
        "bg-aspol-mist text-aspol-dark",
        "bg-aspol-navy text-white",
    ];

    return (
        <main className="min-h-screen bg-aspol-white text-aspol-dark">
            {/* HERO */}
            <PageHero
                badge={pageContent.hero.label}
                title={pageContent.hero.title}
                subtitle={pageContent.hero.subtitle}
                actions={<Pill href={`mailto:${pageContent.cta.email}`}>{pageContent.hero.cta}</Pill>}
                aside={
                    <div className="photo-card relative aspect-4/3 overflow-hidden rounded-[2rem] bg-aspol-dark">
                        <Image
                            src={heroImg?.src ?? PHOTOS.groupBanner.src}
                            alt={heroImg?.alt || photoAlt("groupBanner", language)}
                            fill
                            priority
                            sizes="(min-width: 1024px) 40vw, 100vw"
                            className="object-cover"
                        />
                    </div>
                }
            />

            {/* VALUE PROPOSITION */}
            <section className="section-pad">
                <div className="container-x">
                    <Reveal as="h2" className="display display-lg mb-12 sm:mb-16" text={pageContent.value.title} />
                    <ul className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,18rem),1fr))]">
                        {pageContent.value.items.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <li
                                    key={idx}
                                    className={`group flex min-h-80 flex-col justify-between gap-10 rounded-[2rem] p-7 transition-[border-radius] duration-700 ease-(--ease-out-expo) hover:rounded-[3.25rem] sm:p-9 ${tones[idx % tones.length]}`}
                                >
                                    <span className="grid size-14 place-items-center rounded-full bg-white/15 transition-transform duration-500 ease-(--ease-out-expo) group-hover:-rotate-12 group-hover:scale-110" aria-hidden="true">
                                        <Icon size={28} />
                                    </span>
                                    <div>
                                        <h3 className="display display-sm">{item.title}</h3>
                                        <p className="mt-3 text-base leading-relaxed opacity-85">{item.desc}</p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </section>

            {/* COLLABORATION SCOPE */}
            <section className="section-pad bg-aspol-mist">
                <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-5">
                        <div className="lg:sticky lg:top-32">
                            <Reveal as="h2" className="display text-[clamp(2.1rem,4.4vw,4.25rem)] [overflow-wrap:anywhere]" text={pageContent.scope.title} />
                            <p className="mt-6 max-w-[40ch] text-base leading-relaxed text-aspol-ink-soft sm:text-lg">{pageContent.scope.subtitle}</p>
                        </div>
                    </div>
                    <div className="lg:col-span-7">
                        <ul className="border-b border-aspol-line">
                            {pageContent.scope.items.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-4 border-t border-aspol-line py-5 sm:py-6">
                                    <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-aspol-navy text-white" aria-hidden="true">
                                        <Check size={16} strokeWidth={3} />
                                    </span>
                                    <span className="font-display text-lg font-bold leading-snug sm:text-xl">{item}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-6 text-sm text-aspol-ink-soft">
                            * Custom arrangements available upon request for strategic partners.
                        </p>
                    </div>
                </div>
            </section>

            {/* DEMOGRAPHICS */}
            <section className="on-dark bg-aspol-dark py-20 text-white sm:py-28">
                <div className="container-x">
                    <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
                        <Reveal as="h2" className="display display-lg lg:col-span-7" text={pageContent.demographics.title} />
                        <div className="lg:col-span-5">
                            <p className="font-display text-sm font-bold text-white/70">Core Disciplines:</p>
                            <p className="mt-1 font-display text-xl font-bold leading-snug sm:text-2xl">{pageContent.demographics.disciplines}</p>
                        </div>
                    </div>
                    <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4 lg:gap-x-10">
                        {pageContent.demographics.stats.map((stat, idx) => (
                            <li key={idx} className="flex flex-col justify-between gap-6 border-t border-white/25 pt-6">
                                <span className="display text-[clamp(3rem,7vw,6.5rem)] leading-[0.85]">{stat.value}</span>
                                <span className="max-w-[16ch] font-display text-base font-bold leading-tight text-white/85 sm:text-lg">{stat.label}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* CTA */}
            <section className="section-pad">
                <div className="container-x">
                    <div className="on-dark relative overflow-hidden rounded-[2rem] bg-aspol-red p-8 text-white sm:p-14 lg:p-20">
                        <Reveal as="h2" className="display display-lg max-w-[16ch]" text={pageContent.cta.title} />
                        <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-white/90 sm:text-lg">{pageContent.cta.subtitle}</p>
                        <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                            <Pill href={`mailto:${pageContent.cta.email}`}>{pageContent.cta.button}</Pill>
                            <p className="text-white/85">
                                {pageContent.cta.emailCta}{" "}
                                <a href={`mailto:${pageContent.cta.email}`} className="font-semibold text-white underline underline-offset-4">
                                    {pageContent.cta.email}
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
