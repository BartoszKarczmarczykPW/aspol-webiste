"use client";

import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, ExternalLink, CheckCircle2, XCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { Components } from 'react-markdown';
import { UniversityGuide } from '@/data/universityGuides';
import { useLanguage } from '@/contexts/LanguageContext';
import PageHero from "@/components/layout/PageHero";
import Pill from "@/components/ui/Pill";

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
                <h2 id={id} className="display display-md mt-16 mb-6 border-b border-aspol-line pb-4 scroll-mt-28">
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
                    <span className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-semibold mr-2 mb-2 ${isYes
                        ? 'bg-aspol-navy text-white'
                        : 'bg-aspol-mist text-aspol-ink-soft'
                        }`}>
                        {isYes ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                        {cleanText}
                    </span>
                );
            }
            const id = slugify(text);
            return (
                <h3 id={id} className="display display-sm mt-10 mb-3 scroll-mt-28">
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
                <li className="flex items-start gap-3 text-aspol-ink-soft text-base leading-relaxed sm:text-lg sm:leading-8">
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
                        className="inline-flex min-h-11 items-center gap-1.5 px-5 py-2.5 text-sm font-bold text-aspol-dark bg-aspol-mist hover:bg-aspol-navy hover:text-white rounded-full transition-colors duration-300 mr-2 mb-2"
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
                <p className="text-aspol-ink-soft text-base leading-7 sm:text-lg sm:leading-8 mb-4">
                    {children}
                </p>
            );
        },
        strong: ({ children }) => (
            <strong className="font-bold text-aspol-dark">{children}</strong>
        ),
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-aspol-navy pl-5 my-8 font-display text-lg font-bold leading-snug text-aspol-dark">
                {children}
            </blockquote>
        ),
    };

    return (
        <main className="min-h-screen bg-aspol-white text-aspol-dark">
            <PageHero
                badge={`${t.pathway.guideCountry}  ·  ${t.pathway.guideType}`}
                title={guide.name}
                titleClassName="text-[clamp(2rem,5.4vw,5rem)]"
                actions={
                    <Pill href="/pathway" variant="ghost" noChip className="px-7">
                        {t.pathway.guideBack}
                    </Pill>
                }
                aside={
                    <div className="grid size-36 place-items-center rounded-[2rem] bg-white p-6 lg:ml-auto lg:size-48 lg:p-8">
                        <Image
                            src={guide.logo}
                            alt={guide.name}
                            width={120}
                            height={120}
                            className="max-h-full max-w-full object-contain"
                        />
                    </div>
                }
            />

            <div className="mx-auto max-w-4xl px-5 sm:px-6">
                {/* Campus France tip */}
                <div className="mt-10 flex flex-col items-start gap-5 rounded-[2rem] bg-aspol-mist p-6 sm:flex-row sm:items-center sm:p-8">
                    <div className="grid size-16 shrink-0 place-items-center rounded-2xl bg-white p-3">
                        <Image
                            src="/images/logos/campus-france.png"
                            alt="Campus France"
                            width={40}
                            height={40}
                            className="max-h-full max-w-full object-contain"
                        />
                    </div>
                    <p className="flex-1 text-base leading-relaxed text-aspol-ink-soft">
                        <span className="font-display font-bold text-aspol-dark">{t.pathway.guideTipLabel}</span>{" "}
                        {t.pathway.guideTipBody}{" "}
                        <a
                            href="https://www.pologne.campusfrance.org/pl"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-semibold text-aspol-navy underline underline-offset-4 hover:text-aspol-red"
                        >
                            {t.pathway.guideTipLink}
                            <ExternalLink className="size-3.5" aria-hidden="true" />
                        </a>{" "}
                        {t.pathway.guideTipSuffix}
                    </p>
                </div>

                <article className="py-12 md:py-16">
                    {tocItems.length > 0 && (
                        <nav className="mb-12 rounded-[2rem] bg-aspol-mist p-6 md:p-8" aria-label={t.pathway.guideTocTitle}>
                            <h2 className="display display-sm mb-4">{t.pathway.guideTocTitle}</h2>
                            <ul className="space-y-1">
                                {tocItems.map((item) => (
                                    <li key={item.id} className={item.level === 3 ? "ml-4" : undefined}>
                                        <a
                                            href={`#${item.id}`}
                                            className="inline-block py-1.5 text-base text-aspol-navy underline-offset-4 transition-colors hover:text-aspol-red hover:underline"
                                        >
                                            {item.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    )}

                    <div className="prose-custom">
                        <ReactMarkdown components={components}>{localizedContent}</ReactMarkdown>
                    </div>

                    {/* Bottom CTA */}
                    <div className="on-dark mt-16 rounded-[2rem] bg-aspol-navy p-7 text-white sm:p-12">
                        <h3 className="display display-md max-w-[20ch]">{t.pathway.guideCtaTitle}</h3>
                        <p className="mt-4 max-w-[48ch] text-base leading-relaxed text-white/85 sm:text-lg">
                            {t.pathway.guideCtaBody.replace("{university}", guide.name)}
                        </p>
                        <div className="mt-8">
                            <Pill href="/#contact">{t.pathway.guideCtaButton}</Pill>
                        </div>
                    </div>

                    <div className="mt-10 text-center">
                        <Link
                            href="/pathway"
                            className="inline-flex items-center gap-2 py-3 text-sm font-semibold text-aspol-navy underline-offset-4 hover:text-aspol-red hover:underline"
                        >
                            <ArrowLeft className="size-4" aria-hidden="true" />
                            <span>{t.pathway.guideBackAll}</span>
                        </Link>
                    </div>
                </article>
            </div>
        </main>
    );
}
