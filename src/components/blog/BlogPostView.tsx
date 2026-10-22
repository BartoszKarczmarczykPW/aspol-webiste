"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { TypedObject } from "@portabletext/types";

import { getPostBySlug } from "@/lib/sanity";
import { useLanguage } from "@/contexts/LanguageContext";
import SocialShare from "@/components/ui/SocialShare";
import PageHero from "@/components/layout/PageHero";
import Pill from "@/components/ui/Pill";


interface SanityPost {
    _id: string;
    title: { en: string; fr: string; pl: string };
    slug: { current: string };
    author: string;
    publishedAt: string;
    excerpt: { en: string; fr: string; pl: string };
    content: { en: TypedObject[]; fr: TypedObject[]; pl: TypedObject[] };
    imageUrl: string | null;
    tags?: string[];
    featured?: boolean;
    sponsors?: { _key?: string; name: string; website?: string; logoUrl?: string }[];
    partners?: { _key?: string; name: string; website?: string; logoUrl?: string }[];
}

const withLineBreaks = (children: React.ReactNode) =>
    React.Children.map(children, (child) => {
        if (typeof child !== "string") return child;
        const parts = child.split("\n");
        return parts.map((part, index) => (
            <React.Fragment key={`${part}-${index}`}>
                {part}
                {index < parts.length - 1 ? <br /> : null}
            </React.Fragment>
        ));
    });

const portableTextComponents: PortableTextComponents = {
    block: {
        h2: ({ children }) => <h2>{withLineBreaks(children)}</h2>,
        h3: ({ children }) => <h3>{withLineBreaks(children)}</h3>,
        h4: ({ children }) => <h4>{withLineBreaks(children)}</h4>,
        blockquote: ({ children }) => <blockquote>{withLineBreaks(children)}</blockquote>,
        normal: ({ children }) => <p>{withLineBreaks(children)}</p>,
    },
    list: {
        bullet: ({ children }) => <ul>{children}</ul>,
        number: ({ children }) => <ol>{children}</ol>,
    },
    listItem: {
        bullet: ({ children }) => <li>{children}</li>,
        number: ({ children }) => <li>{children}</li>,
    },
    marks: {
        link: ({ value, children }) => {
            const href = value?.href || "";
            const isExternal = /^https?:\/\//.test(href);
            return (
                <a href={href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined}>
                    {children}
                </a>
            );
        },
    },
};

/**
 * Static i18n labels — hoisted to module level to avoid
 * re-creating the object on every render.
 */
const LABELS = {
    en: {
        back: "Back to Polish Paris Forum",
        share: "Share Article",
        readTime: "Read Time",
        published: "Published",
        writtenBy: "Written by",
        sponsors: "Sponsors",
        partners: "Partners",
        visit: "Visit website",
        notFoundTitle: "Article Not Found",
        notFoundCta: "Return to Polish Paris Forum",
    },
    fr: {
        back: "Retour au Polish Paris Forum",
        share: "Partager l'article",
        readTime: "Temps de lecture",
        published: "Publié le",
        writtenBy: "Écrit par",
        sponsors: "Sponsors",
        partners: "Partenaires",
        visit: "Visiter le site",
        notFoundTitle: "Article introuvable",
        notFoundCta: "Retour au Polish Paris Forum",
    },
    pl: {
        back: "Powrót do Polish Paris Forum",
        share: "Udostępnij artykuł",
        readTime: "Czas czytania",
        published: "Opublikowano",
        writtenBy: "Autor",
        sponsors: "Sponsorzy",
        partners: "Partnerzy",
        visit: "Odwiedź stronę",
        notFoundTitle: "Nie znaleziono artykułu",
        notFoundCta: "Wróć do Polish Paris Forum",
    },
} as const;

/** Fallback labels for unknown locales */
const FALLBACK_LABELS: Record<keyof typeof LABELS.en, string> = {
    back: "Back",
    share: "Share",
    readTime: "Read Time",
    published: "Published",
    writtenBy: "Written by",
    sponsors: "Sponsors",
    partners: "Partners",
    visit: "Visit website",
    notFoundTitle: "Article Not Found",
    notFoundCta: "Return to Blog",
};

/**
 * Article view. The post is fetched on the server (see app/(website)/blog/[slug]/page.tsx) and passed in
 * as `initialPost`, so the full article is in the HTML crawlers receive. The client fetch below is only a
 * fallback if the server could not provide it.
 */
export default function BlogPostView({ slug, initialPost = null }: { slug: string; initialPost?: SanityPost | null }) {
    const { language } = useLanguage();
    const [post, setPost] = useState<SanityPost | null>(initialPost);
    const [loading, setLoading] = useState(!initialPost);

    const t = LABELS[language as keyof typeof LABELS] || FALLBACK_LABELS;

    useEffect(() => {
        if (!slug || initialPost) return;
        async function fetchPost() {
            try {
                const data = await getPostBySlug(slug);
                setPost(data || null);
            } catch (error) {
                console.error("Error fetching post:", error);
                setPost(null);
            } finally {
                setLoading(false);
            }
        }

        fetchPost();
    }, [slug, initialPost]);

    const localizedTitle = post?.title?.[language as "en" | "fr" | "pl"] || "";
    const localizedExcerpt = post?.excerpt?.[language as "en" | "fr" | "pl"] || "";
    const localizedContent = useMemo(() => {
        if (!post?.content) return [];
        return post.content[language as "en" | "fr" | "pl"] || [];
    }, [post, language]);

    const formatDate = (dateString?: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString(language === "fr" ? "fr-FR" : language === "pl" ? "pl-PL" : "en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-aspol-white">
                <div className="text-center">
                    <div className="inline-block size-12 animate-spin rounded-full border-2 border-aspol-line border-t-aspol-navy"></div>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-aspol-white px-6">
                <div className="text-center">
                    <h1 className="display display-lg mb-6">{t.notFoundTitle}</h1>
                    <Pill href="/blog" variant="dark">{t.notFoundCta}</Pill>
                </div>
            </div>
        );
    }

    const renderPartnerGrid = (title: string, items: NonNullable<SanityPost["sponsors"]>) => (
        <div>
            <h3 className="display display-sm mb-5">{title}</h3>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                    <li key={item._key || item.name} className="flex flex-col rounded-[2rem] bg-aspol-mist p-5">
                        {item.logoUrl && (
                            <div className="relative mb-4 h-16 w-full rounded-2xl bg-white">
                                <Image src={item.logoUrl} alt={item.name} fill className="object-contain p-3" />
                            </div>
                        )}
                        <p className="font-display text-base font-bold">{item.name}</p>
                        {item.website && (
                            <a
                                href={item.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 text-sm font-semibold text-aspol-navy underline underline-offset-4 hover:text-aspol-red"
                            >
                                {t.visit}
                            </a>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <div className="min-h-screen bg-aspol-white text-aspol-dark">
            <PageHero
                badge={[formatDate(post.publishedAt), post.author].filter(Boolean).join("  ·  ")}
                title={localizedTitle}
                titleClassName="text-[clamp(2rem,5vw,4.75rem)]"
                actions={
                    <Pill href="/blog" variant="ghost" noChip className="px-7">
                        {t.back}
                    </Pill>
                }
            />

            <main className="pb-24 sm:pb-32">
                {post.imageUrl && (
                    <div className="container-x -mt-2 pt-10 sm:pt-14">
                        <div className="relative mx-auto aspect-16/9 max-w-5xl overflow-hidden rounded-[2rem] bg-aspol-mist">
                            <Image src={post.imageUrl} alt={localizedTitle} fill priority sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
                        </div>
                    </div>
                )}

                <article className="mx-auto max-w-3xl px-5 pt-12 sm:px-6 sm:pt-16">
                    {localizedExcerpt && (
                        <p className="mb-10 font-display text-2xl font-bold leading-snug text-aspol-navy sm:text-3xl">{localizedExcerpt}</p>
                    )}

                    <div className="article-body mb-16">
                        <PortableText value={localizedContent} components={portableTextComponents} />
                    </div>

                    {(post.sponsors?.length || post.partners?.length) && (
                        <div className="mb-12 mt-12 space-y-10 border-t border-aspol-line pt-10">
                            {post.sponsors && post.sponsors.length > 0 && renderPartnerGrid(t.sponsors, post.sponsors)}
                            {post.partners && post.partners.length > 0 && renderPartnerGrid(t.partners, post.partners)}
                        </div>
                    )}

                    <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-aspol-line pt-8 sm:flex-row sm:items-center">
                        <h3 className="display display-sm">{t.share}</h3>
                        <SocialShare
                            url={`https://aspol.fr/blog/${slug}`}
                            title={localizedTitle}
                            description={localizedExcerpt}
                        />
                    </div>
                </article>
            </main>
        </div>
    );
}
