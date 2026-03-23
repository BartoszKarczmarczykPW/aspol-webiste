"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, User, BookOpen } from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";
import { getPosts } from "@/lib/sanity";
import SmoothBackground from "@/components/ui/effects/SmoothBackground";
import GlassCard from "@/components/ui/cards/GlassCard";

// Type for Sanity post
interface SanityPost {
    _id: string;
    title: {
        en: string;
        fr: string;
        pl: string;
    };
    slug: {
        current: string;
    };
    author: string;
    publishedAt: string;
    excerpt: {
        en: string;
        fr: string;
        pl: string;
    };
    imageUrl: string | null;
    tags?: string[];
    featured?: boolean;
    upcoming?: boolean;
}

/**
 * Static i18n labels — hoisted to module level so they are created once,
 * not re-allocated on every render.
 */
const LABELS = {
    en: {
        title: "Polish Paris Forum",
        subtitle: "Conference news, highlights, and insights from the Polish Paris Forum.",
        spotlightBadge: "Flagship Event 2026",
        spotlightTitle: "Paris Polish Forum X",
        spotlightText: "Join the 10th edition and explore the full agenda, speakers, and registration details.",
        agendaCta: "View PPF 2026 Agenda",
        registerCta: "Register for PPF 2026",
        all: "All Posts",
        readMore: "Read Article",
        featured: "Featured Story",
        upcoming: "Upcoming",
        empty: "No posts found for this category.",
        loading: "Loading posts...",
    },
    fr: {
        title: "Polish Paris Forum",
        subtitle: "Actualités, temps forts et analyses de la conférence Polish Paris Forum.",
        spotlightBadge: "Événement phare 2026",
        spotlightTitle: "Paris Polish Forum X — Événement principal de l'année",
        spotlightText: "Rejoignez la 10e édition et découvrez l'agenda complet, les intervenants et les informations d'inscription.",
        agendaCta: "Voir l'agenda PPF 2026",
        registerCta: "S'inscrire au PPF 2026",
        all: "Tous les articles",
        readMore: "Lire l'article",
        featured: "À la une",
        upcoming: "À venir",
        empty: "Aucun article trouvé pour cette catégorie.",
        loading: "Chargement des articles...",
    },
    pl: {
        title: "Polish Paris Forum",
        subtitle: "Aktualności, relacje i wnioski z konferencji Polish Paris Forum.",
        spotlightBadge: "Najważniejsze wydarzenie 2026",
        spotlightTitle: "Paris Polish Forum X — główne wydarzenie roku",
        spotlightText: "Dołącz do 10. edycji i zobacz pełną agendę, prelegentów oraz szczegóły zapisów.",
        agendaCta: "Zobacz agendę PPF 2026",
        registerCta: "Zapisz się na PPF 2026",
        all: "Wszystkie wpisy",
        readMore: "Czytaj artykuł",
        featured: "Wyróżniony artykuł",
        upcoming: "Nadchodzące",
        empty: "Nie znaleziono wpisów dla tej kategorii.",
        loading: "Ładowanie wpisów...",
    },
} as const;

function BlogContent() {
    const { language } = useLanguage();
    const [posts, setPosts] = useState<SanityPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const data = await getPosts();
                setPosts(data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, []);

    const t = LABELS[language as keyof typeof LABELS] || LABELS.en;

    // Get all unique tags
    const allTags = Array.from(new Set(posts.flatMap((post) => post.tags || [])));

    // Filter posts by selected tag
    const filteredPosts = selectedTag
        ? posts.filter((post) => post.tags?.includes(selectedTag))
        : posts;

    // Sort posts by date (newest first)
    const sortedPosts = [...filteredPosts].sort((a, b) => {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });

    // Featured Post
    const featuredPost = sortedPosts.find((p) => p.featured) || sortedPosts[0];
    const regularPosts = sortedPosts.filter((p) => p._id !== featuredPost?._id);

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(
            language === "fr" ? "fr-FR" : language === "pl" ? "pl-PL" : "en-US",
            {
                year: "numeric",
                month: "long",
                day: "numeric",
            }
        );
    };

    return (
        <div className="min-h-screen bg-white">
            <SmoothBackground />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 animate-fade-in-up">
                        {t.title}
                    </h1>
                    <p
                        className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up"
                        style={{ animationDelay: "0.1s" }}
                    >
                        {t.subtitle}
                    </p>

                    <div className="mt-10 animate-fade-in-up max-w-4xl mx-auto" style={{ animationDelay: "0.2s" }}>
                        <GlassCard className="rounded-3xl border border-white/60 p-6 md:p-8 text-left shadow-xl/20 bg-white/75 backdrop-blur-md">
                            <div className="inline-flex items-center rounded-full bg-aspol-red/10 border border-aspol-red/20 px-3 py-1 text-[11px] md:text-xs font-bold uppercase tracking-[0.12em] text-aspol-red">
                                {t.spotlightBadge}
                            </div>

                            <h2 className="mt-4 text-2xl md:text-[2.05rem] font-bold text-aspol-navy leading-tight">
                                {t.spotlightTitle}
                            </h2>

                            <p className="mt-3 text-base md:text-lg text-gray-600 max-w-3xl">
                                {t.spotlightText}
                            </p>

                            <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                <Link
                                    href="/ppf#ppf-agenda"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-aspol-red px-6 py-3 text-sm md:text-base font-semibold text-white shadow-lg shadow-aspol-red/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-700"
                                >
                                    {t.agendaCta}
                                    <ArrowRight className="w-4 h-4" />
                                </Link>

                                <Link
                                    href="/ppf#ppf-form"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm md:text-base font-semibold text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-400 hover:bg-gray-50"
                                >
                                    {t.registerCta}
                                </Link>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </section>

            {/* Tags Filter */}
            {allTags.length > 0 && (
                <section className="py-8 px-6">
                    <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-3">
                        <button
                            onClick={() => setSelectedTag(null)}
                            className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${selectedTag === null
                                ? "bg-aspol-red text-white shadow-lg"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            {t.all}
                        </button>
                        {allTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(tag)}
                                className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${selectedTag === tag
                                    ? "bg-aspol-red text-white shadow-lg"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </section>
            )}

            {/* Loading State */}
            {loading ? (
                <section className="py-20 px-6">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-aspol-red"></div>
                        <p className="mt-4 text-gray-600">{t.loading}</p>
                    </div>
                </section>
            ) : sortedPosts.length === 0 ? (
                <section className="py-20 px-6">
                    <div className="text-center">
                        <BookOpen className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                        <p className="text-xl text-gray-500">{t.empty}</p>
                    </div>
                </section>
            ) : (
                <>
                    {/* Featured Post */}
                    {featuredPost && (
                        <section className="py-12 px-6">
                            <div className="max-w-7xl mx-auto">
                                <GlassCard className="overflow-hidden hover:scale-[1.02] transition-transform duration-300">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                                        {/* Image */}
                                        <div className="relative h-64 lg:h-full">
                                            <Image
                                                src={featuredPost.imageUrl || "/placeholder-blog.jpg"}
                                                alt={featuredPost.title[language as keyof typeof featuredPost.title]}
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                                                {featuredPost.featured && (
                                                    <span className="bg-aspol-red text-white px-4 py-2 rounded-full text-sm font-semibold">
                                                        {t.featured}
                                                    </span>
                                                )}
                                                {featuredPost.upcoming && (
                                                    <span className="bg-aspol-navy text-white px-4 py-2 rounded-full text-sm font-semibold">
                                                        {t.upcoming}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-8 lg:p-12 flex flex-col justify-center">
                                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                                <div className="flex items-center gap-2">
                                                    <User className="w-4 h-4" />
                                                    <span>{featuredPost.author}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{formatDate(featuredPost.publishedAt)}</span>
                                                </div>
                                            </div>

                                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                                                {featuredPost.title[language as keyof typeof featuredPost.title]}
                                            </h2>

                                            <p className="text-gray-600 mb-6 text-lg">
                                                {featuredPost.excerpt[language as keyof typeof featuredPost.excerpt]}
                                            </p>

                                            {featuredPost.tags && featuredPost.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mb-6">
                                                    {featuredPost.tags.map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            <Link
                                                href={`/blog/${featuredPost.slug.current}`}
                                                className="inline-flex items-center gap-2 text-aspol-red hover:text-red-700 font-semibold group"
                                            >
                                                {t.readMore}
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                </GlassCard>
                            </div>
                        </section>
                    )}

                    {/* Regular Posts Grid */}
                    {regularPosts.length > 0 && (
                        <section className="py-12 px-6">
                            <div className="max-w-7xl mx-auto">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {regularPosts.map((post, index) => (
                                        <div key={post._id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                                            <GlassCard className="group hover:scale-105 transition-transform duration-300 overflow-hidden h-full">
                                                {/* Post Image */}
                                                <div className="relative h-48 overflow-hidden">
                                                    <Image
                                                        src={post.imageUrl || "/placeholder-blog.jpg"}
                                                        alt={post.title[language as keyof typeof post.title]}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                </div>

                                                {/* Post Content */}
                                                <div className="p-6">
                                                    {post.upcoming && (
                                                        <div className="mb-3">
                                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-aspol-navy/10 text-aspol-navy">
                                                                {t.upcoming}
                                                            </span>
                                                        </div>
                                                    )}
                                                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                                                        <div className="flex items-center gap-1">
                                                            <User className="w-3 h-3" />
                                                            <span>{post.author}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            <span>{formatDate(post.publishedAt)}</span>
                                                        </div>
                                                    </div>

                                                    <h3 className="text-xl font-bold mb-3 text-gray-900 line-clamp-2">
                                                        {post.title[language as keyof typeof post.title]}
                                                    </h3>

                                                    <p className="text-gray-600 mb-4 line-clamp-3">
                                                        {post.excerpt[language as keyof typeof post.excerpt]}
                                                    </p>

                                                    {post.tags && post.tags.length > 0 && (
                                                        <div className="flex flex-wrap gap-2 mb-4">
                                                            {post.tags.slice(0, 2).map((tag) => (
                                                                <span
                                                                    key={tag}
                                                                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                                                                >
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}

                                                    <Link
                                                        href={`/blog/${post.slug.current}`}
                                                        className="inline-flex items-center gap-2 text-aspol-red hover:text-red-700 font-semibold text-sm group"
                                                    >
                                                        {t.readMore}
                                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                    </Link>
                                                </div>
                                            </GlassCard>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}
                </>
            )}
        </div>
    );
}

export default function BlogPage() {
    return <BlogContent />;
}
