"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import GlassCard from "@/components/ui/cards/GlassCard";
import { ArrowRight, CheckCircle2, Users, Building2, Globe, TrendingUp, Handshake, Briefcase } from "lucide-react";

export default function PartnersPage() {
    const { language, t } = useLanguage();
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-fade-in-up");
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            const elements = sectionRef.current.querySelectorAll(".fade-in-element");
            elements.forEach((el) => observer.observe(el));
        }

        return () => observer.disconnect();
    }, []);

    const content = {
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
                    "Exclusive recruitment workshops & case studies",
                    "Keynote speaking opportunities at Paris Polish Forum",
                    "Dedicated brand ambassadors on campus",
                    "VIP networking events with student leaders",
                    "Customized social media campaigns",
                    "Scholarship & mentorship program sponsorship",
                    "Strategic naming rights for key events"
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
                email: "office@aspol.fr"
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
                    "Ateliers de recrutement exclusifs et études de cas",
                    "Opportunités de prise de parole au Paris Polish Forum",
                    "Ambassadeurs de marque dédiés sur les campus",
                    "Événements de networking VIP avec les leaders étudiants",
                    "Campagnes de réseaux sociaux personnalisées",
                    "Parrainage de programmes de bourses et de mentorat",
                    "Droits de naming stratégiques pour les événements clés"
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
                email: "office@aspol.fr"
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
                    "Ekskluzywne warsztaty rekrutacyjne i case studies",
                    "Wystąpienia eksperckie podczas Paris Polish Forum",
                    "Dedykowani ambasadorzy marki na kampusach",
                    "Networking VIP z liderami studenckimi",
                    "Dedykowane kampanie w mediach społecznościowych",
                    "Sponsoring programów stypendialnych i mentorskich",
                    "Strategiczny sponsoring kluczowych wydarzeń"
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
                email: "office@aspol.fr"
            }
        }
    };

    const pageContent = content[language as keyof typeof content] || content.en;

    return (
        <main ref={sectionRef} className="min-h-screen bg-white">
            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 px-6 bg-gradient-to-br from-aspol-navy via-aspol-dark to-aspol-navy text-white overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 right-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 left-10 w-96 h-96 bg-aspol-red rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="fade-in-element opacity-0 text-center mb-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-sm font-semibold tracking-wide uppercase">
                            <Building2 size={16} />
                            {pageContent.hero.label}
                        </div>
                    </div>

                    <h1 className="fade-in-element opacity-0 text-5xl md:text-7xl font-bold text-center mb-8 leading-tight" style={{ animationDelay: "0.1s" }}>
                        {pageContent.hero.title}
                    </h1>

                    <p className="fade-in-element opacity-0 text-xl md:text-2xl text-gray-200 text-center max-w-4xl mx-auto mb-12 leading-relaxed" style={{ animationDelay: "0.2s" }}>
                        {pageContent.hero.subtitle}
                    </p>

                    <div className="fade-in-element opacity-0 text-center" style={{ animationDelay: "0.3s" }}>
                        <a
                            href={`mailto:${pageContent.cta.email}`}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-aspol-red text-white text-lg font-semibold rounded-full hover:bg-red-700 transition-all duration-200 hover:scale-105 shadow-lg"
                        >
                            {pageContent.hero.cta}
                            <ArrowRight size={20} />
                        </a>
                    </div>
                </div>
            </section>

            {/* VALUE PROPOSITION SECTION */}
            <section className="py-24 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="fade-in-element opacity-0 text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
                        {pageContent.value.title}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {pageContent.value.items.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <div key={idx} className="fade-in-element opacity-0" style={{ animationDelay: `${idx * 0.1}s` }}>
                                    <GlassCard className="h-full p-8 hover:scale-105 transition-transform duration-300">
                                        <div className="w-16 h-16 mb-6 bg-gradient-to-br from-aspol-red to-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                                            <Icon size={32} />
                                        </div>
                                        <h3 className="text-2xl font-bold mb-4 text-gray-900">{item.title}</h3>
                                        <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                                    </GlassCard>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* COLLABORATION SCOPE SECTION */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16 fade-in-element opacity-0">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">{pageContent.scope.title}</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">{pageContent.scope.subtitle}</p>
                    </div>

                    <GlassCard className="fade-in-element opacity-0 p-10 md:p-14" style={{ animationDelay: "0.1s" }}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {pageContent.scope.items.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-4">
                                    <CheckCircle2 className="text-green-600 mt-1 shrink-0" size={20} />
                                    <span className="text-gray-700 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                            <p className="text-sm text-gray-500 italic">
                                * Custom arrangements available upon request for strategic partners.
                            </p>
                        </div>
                    </GlassCard>
                </div>
            </section>

            {/* DEMOGRAPHICS SECTION */}
            <section className="py-24 px-6 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="fade-in-element opacity-0">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">{pageContent.demographics.title}</h2>
                            <div className="w-20 h-1 bg-aspol-red mb-8"></div>
                            <p className="text-sm font-semibold tracking-wide uppercase text-gray-500 mb-2">
                                Core Disciplines:
                            </p>
                            <p className="text-xl font-semibold text-aspol-navy mb-8">
                                {pageContent.demographics.disciplines}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6 fade-in-element opacity-0" style={{ animationDelay: "0.1s" }}>
                            {pageContent.demographics.stats.map((stat, idx) => (
                                <GlassCard key={idx} className="p-8 text-center hover:scale-105 transition-transform duration-300">
                                    <div className="text-5xl font-bold text-aspol-navy mb-3">{stat.value}</div>
                                    <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{stat.label}</div>
                                </GlassCard>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-4xl mx-auto text-center fade-in-element opacity-0">
                    <div className="mb-8">
                        <Handshake className="mx-auto text-aspol-red" size={64} strokeWidth={1.5} />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{pageContent.cta.title}</h2>
                    <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                        {pageContent.cta.subtitle}
                    </p>
                    <a
                        href={`mailto:${pageContent.cta.email}`}
                        className="inline-flex items-center gap-3 px-10 py-5 bg-aspol-navy text-white text-lg font-semibold rounded-full hover:bg-aspol-dark transition-all duration-200 hover:scale-105 shadow-xl"
                    >
                        {pageContent.cta.button}
                        <ArrowRight size={20} />
                    </a>
                    <div className="mt-8 text-gray-500">
                        or email us directly at{" "}
                        <a href={`mailto:${pageContent.cta.email}`} className="text-aspol-red hover:underline font-semibold">
                            {pageContent.cta.email}
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
