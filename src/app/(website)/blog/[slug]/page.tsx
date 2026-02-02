"use client";

import React, { use, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";

import { getPostBySlug } from "@/lib/sanity";
import { useLanguage } from "@/contexts/LanguageContext";
import SocialShare from "@/components/ui/SocialShare";


interface PageProps {
    params: Promise<{ slug: string }>;
}

interface SanityPost {
    _id: string;
    title: { en: string; fr: string; pl: string };
    slug: { current: string };
    author: string;
    publishedAt: string;
    excerpt: { en: string; fr: string; pl: string };
    content: { en: any[]; fr: any[]; pl: any[] };
    imageUrl: string;
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

function BlogPostContent({ slug }: { slug: string }) {
    const { language } = useLanguage();
    const [post, setPost] = useState<SanityPost | null>(null);
    const [loading, setLoading] = useState(true);

    const t = {
        en: {
            back: "Back to Blog",
            share: "Share Article",
            readTime: "Read Time",
            published: "Published",
            writtenBy: "Written by",
            sponsors: "Sponsors",
            partners: "Partners",
            visit: "Visit website",
            notFoundTitle: "Article Not Found",
            notFoundCta: "Return to Blog",
        },
        fr: {
            back: "Retour au Blog",
            share: "Partager l'article",
            readTime: "Temps de lecture",
            published: "Publié le",
            writtenBy: "Écrit par",
            sponsors: "Sponsors",
            partners: "Partenaires",
            visit: "Visiter le site",
            notFoundTitle: "Article introuvable",
            notFoundCta: "Retour au blog",
        },
        pl: {
            back: "Powrót do Bloga",
            share: "Udostępnij artykuł",
            readTime: "Czas czytania",
            published: "Opublikowano",
            writtenBy: "Autor",
            sponsors: "Sponsorzy",
            partners: "Partnerzy",
            visit: "Odwiedź stronę",
            notFoundTitle: "Nie znaleziono artykułu",
            notFoundCta: "Wróć do bloga",
        },
    }[language as "en" | "fr" | "pl"] || {
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

    useEffect(() => {
        if (!slug) return;
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
    }, [slug]);

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
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-aspol-red"></div>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.notFoundTitle}</h1>
                    <Link href="/blog" className="text-aspol-red font-bold hover:underline">{t.notFoundCta}</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFDFD] font-sans text-gray-900">


            <main className="pt-24 pb-20">
                {/* HERO SECTION */}
                <div className="relative h-[50vh] min-h-100 w-full mb-12">
                    <Image
                        src={post.imageUrl || "/placeholder-blog.jpg"}
                        alt={localizedTitle}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

                    <div className="absolute bottom-0 left-0 w-full p-6 sm:p-12 z-20">
                        <div className="max-w-4xl mx-auto">
                            <Link href="/blog" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full text-sm font-medium border border-white/10 hover:bg-black/30">
                                <ArrowLeft size={16} className="mr-2" />
                                {t.back}
                            </Link>

                            <div className="flex flex-wrap items-center gap-4 mb-4">
                                <span className="flex items-center text-white/90 text-sm font-medium bg-black/30 px-3 py-1 rounded-lg backdrop-blur-sm">
                                    <Clock size={14} className="mr-2" />
                                    {formatDate(post.publishedAt)}
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight shadow-sm">
                                {localizedTitle}
                            </h1>

                            <div className="flex items-center gap-6 text-white/90">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-aspol-white/20 flex items-center justify-center">
                                        <User size={16} />
                                    </div>
                                    <span className="font-medium">{post.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} />
                                    <span>{formatDate(post.publishedAt)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CONTENT */}
                <article className="max-w-3xl mx-auto px-6">
                    {/* Lead Excerpt */}
                    <div className="text-xl md:text-2xl text-aspol-navy font-serif leading-relaxed mb-10 pl-6 border-l-4 border-aspol-red/30 italic">
                        {localizedExcerpt}
                    </div>

                    {/* Main Content */}
                    <div className="prose prose-lg prose-slate max-w-none 
                        prose-headings:font-serif prose-headings:text-aspol-navy 
                        prose-a:text-aspol-red prose-a:no-underline hover:prose-a:underline
                        prose-img:rounded-xl prose-img:shadow-lg
                        text-gray-600 leading-relaxed mb-16">
                        <PortableText value={localizedContent} components={portableTextComponents} />
                    </div>

                    {(post.sponsors?.length || post.partners?.length) && (
                        <div className="border-t border-gray-100 pt-10 mt-12 mb-12">
                            {post.sponsors && post.sponsors.length > 0 && (
                                <div className="mb-10">
                                    <h3 className="text-lg font-bold text-aspol-navy mb-4">{t.sponsors}</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {post.sponsors.map((sponsor) => (
                                            <div key={sponsor._key || sponsor.name} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                                                {sponsor.logoUrl && (
                                                    <div className="relative h-14 w-full mb-3">
                                                        <Image src={sponsor.logoUrl} alt={sponsor.name} fill className="object-contain" />
                                                    </div>
                                                )}
                                                <div className="text-sm font-semibold text-gray-900 mb-2">
                                                    {sponsor.name}
                                                </div>
                                                {sponsor.website && (
                                                    <a
                                                        href={sponsor.website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-sm text-aspol-red font-semibold hover:text-red-700"
                                                    >
                                                        {t.visit}
                                                    </a>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {post.partners && post.partners.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-bold text-aspol-navy mb-4">{t.partners}</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {post.partners.map((partner) => (
                                            <div key={partner._key || partner.name} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                                                {partner.logoUrl && (
                                                    <div className="relative h-14 w-full mb-3">
                                                        <Image src={partner.logoUrl} alt={partner.name} fill className="object-contain" />
                                                    </div>
                                                )}
                                                <div className="text-sm font-semibold text-gray-900 mb-2">
                                                    {partner.name}
                                                </div>
                                                {partner.website && (
                                                    <a
                                                        href={partner.website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-sm text-aspol-red font-semibold hover:text-red-700"
                                                    >
                                                        {t.visit}
                                                    </a>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Share Section */}
                    <div className="border-t border-gray-100 pt-8 mt-12 mb-12">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                            <h3 className="text-lg font-bold text-aspol-navy">{t.share}</h3>
                            <SocialShare
                                url={`https://aspol.fr/blog/${slug}`}
                                title={localizedTitle}
                                description={localizedExcerpt}
                            />
                        </div>
                    </div>
                </article>

            </main>

        </div>
    );
}

export default function BlogPostPage({ params }: PageProps) {
    const resolvedParams = use(params);

    return <BlogPostContent slug={resolvedParams.slug} />;
}
