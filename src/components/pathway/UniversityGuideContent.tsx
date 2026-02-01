"use client";

import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, ExternalLink, CheckCircle2, XCircle, Building2, BookOpen } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { Components } from 'react-markdown';
import { UniversityGuide } from '@/data/universityGuides';
import { useLanguage } from '@/contexts/LanguageContext';

interface UniversityGuideContentProps {
    guide: UniversityGuide;
}

export default function UniversityGuideContent({ guide }: UniversityGuideContentProps) {
    const { language, t } = useLanguage();
    const localizedContent = guide.content[language] || guide.content.en || guide.content.pl;

    const slugify = (value: string) => value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

    const tocItems = useMemo(() => {
        const lines = localizedContent.split('\n');
        return lines
            .map((line) => {
                const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
                if (!match) return null;
                const level = match[1].length;
                const text = match[2].trim();
                if (text.includes('✅') || text.includes('❌')) return null;
                return { level, text, id: slugify(text) };
            })
            .filter((item): item is { level: number; text: string; id: string } => Boolean(item));
    }, [localizedContent]);

    const components: Components = {
        h1: () => null,
        h2: ({ children }) => {
            const text = String(children);
            const id = slugify(text);
            return (
                <h2 id={id} className="text-2xl md:text-3xl font-bold text-aspol-navy mt-12 mb-5 flex items-center gap-3 border-b border-gray-100 pb-3 scroll-mt-24">
                    <span className="w-1.5 h-7 bg-aspol-red rounded-full" />
                    {children}
                </h2>
            );
        },
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
            const id = slugify(text);
            return (
                <h3 id={id} className="text-xl font-semibold text-aspol-navy mt-8 mb-3 scroll-mt-24">
                    {children}
                </h3>
            );
        },
        ul: ({ children }) => (
            <ul className="space-y-3 my-5">
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
                <li className="flex items-start gap-3 text-gray-700 text-base leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-aspol-navy/50 shrink-0" />
                    <span className="flex-1">{children}</span>
                </li>
            );
        },
        ol: ({ children }) => (
            <ol className="space-y-3 my-5 list-decimal list-inside marker:text-aspol-navy marker:font-semibold">
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
                <p className="text-gray-700 text-base leading-7 mb-4">
                    {children}
                </p>
            );
        },
        strong: ({ children }) => (
            <strong className="font-semibold text-aspol-navy">{children}</strong>
        ),
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-aspol-red/50 pl-5 my-8 text-gray-600 italic bg-red-50/40 py-3 rounded-r-lg">
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
                        <span>{t.pathway.guideBack}</span>
                    </Link>
                </div>
            </header>

            {/* Hero Section */}
            <section className="border-b border-gray-100 bg-linear-to-b from-gray-50/50 to-white">
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
                                    {t.pathway.guideCountry}
                                </span>
                                <span className="w-1 h-1 rounded-full bg-gray-300" />
                                <span className="flex items-center gap-1.5">
                                    <BookOpen className="w-4 h-4" />
                                    {t.pathway.guideType}
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
                                <span className="font-semibold text-aspol-navy">{t.pathway.guideTipLabel}</span>{" "}
                                {t.pathway.guideTipBody}{" "}
                                <a
                                    href="https://www.pologne.campusfrance.org/pl"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-semibold text-aspol-navy hover:text-aspol-red transition-colors inline-flex items-center gap-1"
                                >
                                    {t.pathway.guideTipLink}
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                                {" "}{t.pathway.guideTipSuffix}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <article className="max-w-4xl mx-auto px-6 py-10 md:py-14">
                {tocItems.length > 0 && (
                    <div className="mb-8 rounded-2xl border border-gray-100 bg-gray-50/70 p-5 md:p-6">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">
                            {t.pathway.guideTocTitle}
                        </h3>
                        <ul className="space-y-2">
                            {tocItems.map((item) => (
                                <li key={item.id} className={item.level === 3 ? "ml-4" : undefined}>
                                    <a
                                        href={`#${item.id}`}
                                        className="text-aspol-navy hover:text-aspol-red transition-colors text-sm md:text-base"
                                    >
                                        {item.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="prose-custom bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-10">
                    <ReactMarkdown components={components}>{localizedContent}</ReactMarkdown>
                </div>

                {/* Bottom CTA */}
                <div className="mt-14 pt-10 border-t border-gray-100">
                    <div className="bg-aspol-navy rounded-2xl p-8 md:p-10 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-xl md:text-2xl font-bold mb-3">
                                {t.pathway.guideCtaTitle}
                            </h3>
                            <p className="text-white/70 text-sm md:text-base mb-6 max-w-lg">
                                {t.pathway.guideCtaBody.replace("{university}", guide.name)}
                            </p>
                            <Link
                                href="/#contact"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-aspol-navy font-semibold rounded-lg hover:bg-gray-100 transition-colors text-sm"
                            >
                                {t.pathway.guideCtaButton}
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
                        <span>{t.pathway.guideBackAll}</span>
                    </Link>
                </div>
            </article>
        </main>
    );
}
