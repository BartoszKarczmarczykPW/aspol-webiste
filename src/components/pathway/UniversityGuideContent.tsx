"use client";

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, ExternalLink, CheckCircle2, XCircle, Building2, BookOpen } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { Components } from 'react-markdown';
import { UniversityGuide } from '@/data/universityGuides';

interface UniversityGuideContentProps {
    guide: UniversityGuide;
}

export default function UniversityGuideContent({ guide }: UniversityGuideContentProps) {
    const components: Components = {
        h1: () => null,
        h2: ({ children }) => (
            <h2 className="text-xl font-bold text-aspol-navy mt-10 mb-4 flex items-center gap-3">
                <span className="w-1 h-6 bg-aspol-red rounded-full" />
                {children}
            </h2>
        ),
        h3: ({ children }) => {
            const text = String(children);
            // Handle language availability badges
            if (text.includes("✅") || text.includes("❌")) {
                const isYes = text.includes("✅");
                const cleanText = text.replace(":", "").replace("✅", "").replace("❌", "").trim();
                return (
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium mr-2 mb-2 ${isYes
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-gray-100 text-gray-500 border border-gray-200'
                        }`}>
                        {isYes ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                        {cleanText}
                    </span>
                );
            }
            return (
                <h3 className="text-lg font-semibold text-aspol-navy mt-8 mb-3">
                    {children}
                </h3>
            );
        },
        ul: ({ children }) => (
            <ul className="space-y-2 my-4">
                {children}
            </ul>
        ),
        li: ({ children }) => {
            const childArray = React.Children.toArray(children);

            const isLinkElement = (child: React.ReactNode): boolean => {
                if (!React.isValidElement(child)) return false;
                if (child.type === 'a') return true;
                const props = child.props as Record<string, unknown>;
                return 'href' in props;
            };

            const isOnlyLink = childArray.length === 1 && isLinkElement(childArray[0]);
            const textContent = childArray.map(c => typeof c === 'string' ? c.trim() : '').join('');
            const hasOnlyWhitespace = textContent === '' && childArray.every(c =>
                typeof c === 'string' || isLinkElement(c)
            );

            if (isOnlyLink || hasOnlyWhitespace) {
                return <li className="list-none">{children}</li>;
            }

            return (
                <li className="flex items-start gap-2.5 text-gray-600 text-[15px] leading-relaxed">
                    <span className="mt-2 w-1 h-1 rounded-full bg-aspol-navy/40 shrink-0" />
                    <span className="flex-1">{children}</span>
                </li>
            );
        },
        ol: ({ children }) => (
            <ol className="space-y-2 my-4 list-decimal list-inside marker:text-aspol-navy marker:font-medium">
                {children}
            </ol>
        ),
        a: ({ href, children }) => {
            if (!href) return <span>{children}</span>;

            const linkText = String(children).toLowerCase();
            const linkHref = href.toLowerCase();

            const isButton =
                linkHref.includes('apply') ||
                linkHref.includes('admissions') ||
                linkHref.includes('admission') ||
                linkHref.includes('candidatures') ||
                linkHref.includes('escp') ||
                linkHref.includes('insead') ||
                linkHref.includes('sciencespo') ||
                linkHref.includes('hec') ||
                linkHref.includes('polytechnique') ||
                linkHref.includes('essec') ||
                linkHref.includes('ens.psl') ||
                linkHref.includes('universite-paris-saclay') ||
                linkHref.includes('u-paris2') ||
                linkHref.includes('parcoursup') ||
                linkText.includes('aplikuj') ||
                linkText.includes('strona') ||
                linkText.includes('website') ||
                linkText.includes('apply') ||
                linkText.includes('program') ||
                linkText.includes('bachelor') ||
                linkText.includes('master');

            if (isButton) {
                return (
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-aspol-navy bg-aspol-navy/5 hover:bg-aspol-navy hover:text-white rounded-lg transition-all duration-200 mr-2 mb-2"
                    >
                        {children}
                        <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                    </a>
                );
            }

            return (
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-aspol-red hover:text-aspol-red/80 underline underline-offset-2 decoration-aspol-red/30 hover:decoration-aspol-red transition-colors"
                >
                    {children}
                </a>
            );
        },
        p: ({ children }) => {
            const childArray = React.Children.toArray(children);

            const isLinkElement = (child: React.ReactNode): boolean => {
                if (!React.isValidElement(child)) return false;
                const props = child.props as Record<string, unknown>;
                return 'href' in props;
            };

            const hasOnlyLinks = childArray.every(c =>
                (typeof c === 'string' && c.trim() === '') ||
                isLinkElement(c)
            );

            if (hasOnlyLinks && childArray.some(c => React.isValidElement(c))) {
                return <div className="flex flex-wrap mt-4">{children}</div>;
            }

            return (
                <p className="text-gray-600 text-[15px] leading-relaxed mb-3">
                    {children}
                </p>
            );
        },
        strong: ({ children }) => (
            <strong className="font-semibold text-aspol-navy">{children}</strong>
        ),
        blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-aspol-red/50 pl-4 my-6 text-gray-500 italic">
                {children}
            </blockquote>
        ),
    };

    return (
        <main className="min-h-screen bg-white">
            {/* Minimal Header */}
            <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-6 py-4">
                    <Link
                        href="/pathway"
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-aspol-navy transition-colors text-sm"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Powrót do Pathway</span>
                    </Link>
                </div>
            </header>

            {/* Hero Section */}
            <section className="border-b border-gray-100 bg-gradient-to-b from-gray-50/50 to-white">
                <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
                    <div className="flex flex-col md:flex-row items-start gap-6 md:gap-10">
                        {/* Logo */}
                        <div className="w-20 h-20 md:w-28 md:h-28 bg-white rounded-2xl border border-gray-200 p-4 flex items-center justify-center shrink-0 shadow-sm">
                            <Image
                                src={guide.logo}
                                alt={guide.name}
                                width={80}
                                height={80}
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>

                        {/* Title & Meta */}
                        <div className="flex-1">
                            <h1 className="text-3xl md:text-4xl font-bold text-aspol-navy mb-4 leading-tight">
                                {guide.name}
                            </h1>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                                <span className="flex items-center gap-1.5">
                                    <Building2 className="w-4 h-4" />
                                    Francja
                                </span>
                                <span className="w-1 h-1 rounded-full bg-gray-300" />
                                <span className="flex items-center gap-1.5">
                                    <BookOpen className="w-4 h-4" />
                                    Przewodnik uczelniany
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Campus France Info + Disclaimer */}
            <section className="py-6 px-6 bg-blue-50/50 border-b border-blue-100/50">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                        <div className="w-14 h-14 bg-white rounded-lg p-2 flex items-center justify-center shrink-0 border border-gray-100">
                            <Image
                                src="/images/logos/campus-france.png"
                                alt="Campus France"
                                width={40}
                                height={40}
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>
                        <div className="flex-1">
                            <p className="text-gray-700 text-sm">
                                <span className="font-semibold text-aspol-navy">💡 Pro tip:</span>{" "}
                                Przed aplikacją sprawdź najnowsze wymagania rekrutacyjne na stronie uczelni oraz na{" "}
                                <a
                                    href="https://www.pologne.campusfrance.org/pl"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-semibold text-aspol-navy hover:text-aspol-red transition-colors inline-flex items-center gap-1"
                                >
                                    Campus France Pologne
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                                {" "}– oficjalnym portalu o studiach we Francji.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <article className="max-w-4xl mx-auto px-6 py-10 md:py-14">
                <div className="prose-custom">
                    <ReactMarkdown components={components}>{guide.content}</ReactMarkdown>
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 pt-10 border-t border-gray-100">
                    <div className="bg-aspol-navy rounded-2xl p-8 md:p-10 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-xl md:text-2xl font-bold mb-3">
                                Potrzebujesz pomocy z aplikacją?
                            </h3>
                            <p className="text-white/70 text-sm md:text-base mb-6 max-w-lg">
                                Nasi mentorzy to aktualni studenci {guide.name}. Mogą Ci pomóc przejść przez proces aplikacyjny i podzielić się swoimi doświadczeniami.
                            </p>
                            <Link
                                href="/#contact"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-aspol-navy font-semibold rounded-lg hover:bg-gray-100 transition-colors text-sm"
                            >
                                Skontaktuj się z nami
                            </Link>
                        </div>
                        {/* Decorative */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    </div>
                </div>

                {/* Back Link */}
                <div className="mt-10 text-center">
                    <Link
                        href="/pathway"
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-aspol-navy transition-colors text-sm"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Zobacz wszystkie uczelnie</span>
                    </Link>
                </div>
            </article>
        </main>
    );
}
