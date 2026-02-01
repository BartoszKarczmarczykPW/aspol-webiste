"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, Rocket, School } from "lucide-react";
import ConstellationPoints from "@/components/ui/effects/ConstellationPoints";
import SpotlightCard from "@/components/ui/cards/SpotlightCard";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";

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
    const pageRef = useRef<HTMLDivElement>(null);
    const { t } = useLanguage();

    useScrollAnimation(pageRef);

    return (
        <main ref={pageRef} className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative min-h-[72vh] flex items-center bg-aspol-navy overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 opacity-30">
                    <ConstellationPoints color="255, 255, 255" />
                </div>

                {/* Gradient Overlays */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(220,38,38,0.15),transparent)]" />
                    <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.08),transparent_60%)]" />
                </div>

                <div className="relative max-w-6xl mx-auto px-6 py-28">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/70 text-sm font-semibold mb-8 fade-in-element opacity-0">
                            <span className="w-2 h-2 bg-aspol-red rounded-full" />
                            {t.pathway.heroBadge}
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] fade-in-element opacity-0">
                            {t.pathway.heroTitleStart}{" "}
                            <span className="text-aspol-red">{t.pathway.heroTitleHighlight}</span>{" "}
                            {t.pathway.heroTitleEnd}
                        </h1>

                        <p className="text-xl md:text-2xl text-white/60 mb-10 max-w-xl fade-in-element opacity-0">
                            {t.pathway.heroSubtitle}
                        </p>

                        <div className="flex flex-wrap gap-4 fade-in-element opacity-0">
                            <a
                                href="#universities"
                                className="inline-flex items-center gap-2 px-7 py-4 bg-aspol-red text-white font-bold rounded-xl hover:bg-aspol-red/90 transition-colors text-lg"
                            >
                                {t.pathway.heroPrimaryCta}
                                <ArrowRight className="w-5 h-5" />
                            </a>
                            <Link
                                href="/#contact"
                                className="inline-flex items-center gap-2 px-7 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors text-lg"
                            >
                                {t.pathway.heroSecondaryCta}
                            </Link>
                        </div>

                    </div>
                </div>
            </section>

            {/* Campus France Info */}
            <section className="py-12 px-6 bg-white border-b border-gray-100">
                <div className="max-w-6xl mx-auto">
                    <SpotlightCard className="p-1 bg-white/90 fade-in-element opacity-0" spotlightColor="rgba(220, 38, 38, 0.12)">
                        <div className="flex flex-col sm:flex-row items-center gap-6 rounded-2xl bg-white p-6 sm:p-7">
                            <div className="w-20 h-20 bg-gray-50 rounded-xl p-4 flex items-center justify-center shrink-0 border border-gray-100">
                                <Image
                                    src="/images/logos/campus-france.png"
                                    alt="Campus France"
                                    width={56}
                                    height={56}
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>
                            <div className="text-center sm:text-left flex-1">
                                <h3 className="text-lg font-bold text-aspol-navy mb-1">
                                    {t.pathway.campusFranceTitle}
                                </h3>
                                <p className="text-gray-600">
                                    <span className="font-semibold text-aspol-red">Campus France</span> {t.pathway.campusFranceBodyPrefix}{" "}
                                    <a
                                        href="https://www.pologne.campusfrance.org/pl"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-semibold text-aspol-navy hover:text-aspol-red transition-colors inline-flex items-center gap-1"
                                    >
                                        {t.pathway.campusFranceLink}
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </p>
                            </div>
                        </div>
                    </SpotlightCard>
                </div>
            </section>

            {/* Universities Section */}
            <section id="universities" className="py-20 px-6 bg-white scroll-mt-20">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-12 text-center sm:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold text-aspol-navy mb-3 fade-in-element opacity-0">
                            {t.pathway.universitiesTitle}
                        </h2>
                        <p className="text-gray-500 text-lg fade-in-element opacity-0">
                            {t.pathway.universitiesSubtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {universities.map((uni, index) => (
                            <Link
                                key={index}
                                href={uni.url}
                                className="group"
                            >
                                <SpotlightCard className="p-1 bg-white/80 fade-in-element opacity-0 transition-all duration-300 hover:-translate-y-1">
                                    <div className="flex items-center gap-5 p-5 bg-white rounded-2xl border border-gray-100">
                                        <div className="w-16 h-16 bg-gray-50 rounded-xl p-3 flex items-center justify-center shrink-0 border border-gray-100 group-hover:border-gray-200 transition-colors">
                                            <Image
                                                src={uni.logo}
                                                alt={uni.name}
                                                width={48}
                                                height={48}
                                                className="max-w-full max-h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-gray-900 group-hover:text-aspol-navy transition-colors text-base md:text-lg">
                                                {uni.name}
                                            </h3>
                                            <span className="text-sm text-gray-400 group-hover:text-aspol-red transition-colors flex items-center gap-1">
                                                {t.pathway.universitiesCta}
                                                <ArrowRight className="w-4 h-4" />
                                            </span>
                                        </div>
                                    </div>
                                </SpotlightCard>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-12 text-center sm:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold text-aspol-navy mb-3 fade-in-element opacity-0">
                            {t.pathway.supportTitle}
                        </h2>
                        <p className="text-gray-500 text-lg fade-in-element opacity-0">
                            {t.pathway.supportSubtitle}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Mentoring */}
                        <SpotlightCard className="p-1 bg-aspol-navy/90 border-aspol-navy/30 fade-in-element opacity-0" spotlightColor="rgba(255, 255, 255, 0.18)">
                            <div className="bg-aspol-navy rounded-3xl p-8 md:p-10 h-full">
                                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                                    <Rocket className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{t.pathway.mentoringTitle}</h3>
                                <p className="text-white/60 text-lg mb-6 leading-relaxed">
                                    {t.pathway.mentoringBody}
                                </p>
                                <Link
                                    href="/#contact"
                                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-aspol-navy font-bold rounded-xl hover:bg-gray-100 transition-colors"
                                >
                                    {t.pathway.mentoringCta}
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </SpotlightCard>

                        {/* School Visits */}
                        <SpotlightCard className="p-1 bg-white/90 border-gray-100 fade-in-element opacity-0" spotlightColor="rgba(15, 23, 42, 0.08)">
                            <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-200 h-full">
                                <div className="w-14 h-14 bg-aspol-navy/5 rounded-xl flex items-center justify-center mb-6">
                                    <School className="w-7 h-7 text-aspol-navy" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-aspol-navy mb-3">{t.pathway.visitsTitle}</h3>
                                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                                    {t.pathway.visitsBody}
                                </p>
                                <Link
                                    href="/#contact"
                                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-aspol-navy text-white font-bold rounded-xl hover:bg-aspol-navy/90 transition-colors"
                                >
                                    {t.pathway.visitsCta}
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </SpotlightCard>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 px-6 bg-white border-t border-gray-100">
                <div className="max-w-3xl mx-auto text-center">
                    <SpotlightCard className="p-1 bg-white/90 fade-in-element opacity-0" spotlightColor="rgba(220, 38, 38, 0.12)">
                        <div className="rounded-2xl bg-white px-8 py-10">
                            <h2 className="text-3xl md:text-4xl font-bold text-aspol-navy mb-4">
                                {t.pathway.finalTitle}
                            </h2>
                            <p className="text-gray-500 text-lg mb-8">
                                {t.pathway.finalBody}
                            </p>
                            <Link
                                href="/#contact"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-aspol-navy text-white font-bold rounded-xl hover:bg-aspol-navy/90 transition-colors text-lg"
                            >
                                {t.pathway.finalCta}
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </SpotlightCard>
                </div>
            </section>
        </main>
    );
}
