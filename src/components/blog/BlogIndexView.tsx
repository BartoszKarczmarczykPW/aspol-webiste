"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink, BookOpen } from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";
import { getPosts } from "@/lib/sanity";
import PageHero from "@/components/layout/PageHero";
import Reveal from "@/components/ui/Reveal";
import { PillFace } from "@/components/ui/Pill";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SanityPost {
    _id: string;
    title: { en: string; fr: string; pl: string };
    slug: { current: string };
    author: string;
    publishedAt: string;
    excerpt: { en: string; fr: string; pl: string };
    imageUrl: string | null;
    tags?: string[];
    featured?: boolean;
    upcoming?: boolean;
}

type HighlightSlide = {
    id: string;
    imagePath: string;
    label: string;
    instagramUrl: string;
};

// ─── Constants ────────────────────────────────────────────────────────────────

const INSTAGRAM_HIGHLIGHT_SLIDES: HighlightSlide[] = [
    { id: "about",   imagePath: "/files/ppf-instagram/PPF-ABOUT-POST.png",   label: "About",   instagramUrl: "https://www.instagram.com/p/DVecy_ADah5/?img_index=1" },
    { id: "date",    imagePath: "/files/ppf-instagram/PPF-DATE-POST.png",    label: "Date",    instagramUrl: "https://www.instagram.com/p/DVjQBDkDUdi/" },
    { id: "motto",   imagePath: "/files/ppf-instagram/PPF-MOTTO-POST.png",   label: "Motto",   instagramUrl: "https://www.instagram.com/p/DVqv1HYDBqT/?img_index=1" },
    { id: "venue",   imagePath: "/files/ppf-instagram/PPF-VENUE-POST.png",   label: "Venue",   instagramUrl: "https://www.instagram.com/p/DV9GP9vDXBi/?img_index=1" },
    { id: "tickets", imagePath: "/files/ppf-instagram/PPF-TICKETS-POST.png", label: "Tickets", instagramUrl: "https://www.instagram.com/p/DV_n9A_DauB/" },
    { id: "cec",     imagePath: "/files/ppf-instagram/PPF-CEC-POST.png",     label: "CEC",     instagramUrl: "https://www.instagram.com/p/DWI2adajf4/" },
    { id: "agenda",  imagePath: "/files/ppf-instagram/PPF-AGENDA-POST.png",  label: "Agenda",  instagramUrl: "https://www.instagram.com/p/DW8bICBjVwp/?img_index=1" },
];

const LABELS = {
    en: {
        badge: "Conference Blog",
        title: "Polish Paris Forum",
        titleLine2: "",
        subtitle: "Conference news, highlights, and insights.",
        igSection: "Latest from Instagram",
        igHint: "Tap to open the Instagram post",
        igSwipe: "Swipe to explore",
        igPrev: "Previous",
        igNext: "Next",
        igOpen: "Open post",
        all: "All",
        readMore: "Read article",
        featured: "Featured",
        upcoming: "Upcoming",
        empty: "No posts found.",
        loading: "Loading...",
        postsSection: "Latest Articles",
    },
    fr: {
        badge: "Blog de la Conférence",
        title: "Polish Paris Forum",
        titleLine2: "",
        subtitle: "Actualités, temps forts et analyses.",
        igSection: "Derniers posts Instagram",
        igHint: "Appuyer pour ouvrir",
        igSwipe: "Faites glisser",
        igPrev: "Précédent",
        igNext: "Suivant",
        igOpen: "Ouvrir",
        all: "Tout",
        readMore: "Lire l'article",
        featured: "À la une",
        upcoming: "À venir",
        empty: "Aucun article trouvé.",
        loading: "Chargement...",
        postsSection: "Derniers Articles",
    },
    pl: {
        badge: "Blog Konferencji",
        title: "Polish Paris Forum",
        titleLine2: "",
        subtitle: "Aktualności, relacje i wnioski z konferencji.",
        igSection: "Najnowsze z Instagrama",
        igHint: "Kliknij, aby otworzyć posta",
        igSwipe: "Przesuń, aby zobaczyć więcej",
        igPrev: "Poprzednie",
        igNext: "Następne",
        igOpen: "Otwórz",
        all: "Wszystkie",
        readMore: "Czytaj artykuł",
        featured: "Wyróżniony",
        upcoming: "Nadchodzące",
        empty: "Nie znaleziono wpisów.",
        loading: "Ładowanie...",
        postsSection: "Najnowsze Artykuły",
    },
} as const;

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Instagram highlight: poster graphic in a rounded card, label underneath. */
function IgCard({ slide, label, openLabel }: { slide: HighlightSlide; label: string; openLabel: string }) {
    return (
        <a
            href={slide.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block shrink-0 snap-start"
            aria-label={`Instagram — ${slide.label}`}
            style={{ width: "clamp(150px, 22vw, 204px)" }}
        >
            <div className="relative overflow-hidden rounded-[1.75rem] bg-aspol-dark transition-[border-radius] duration-700 ease-(--ease-out-expo) group-hover:rounded-[2.75rem]">
                <div className="relative aspect-3/4">
                    <Image
                        src={slide.imagePath}
                        alt={slide.label}
                        fill
                        sizes="(max-width: 640px) 42vw, (max-width: 1024px) 22vw, 204px"
                        className="object-cover transition-transform duration-1000 ease-(--ease-out-expo) group-hover:scale-105"
                    />
                </div>
                <span className="absolute bottom-3 right-3 grid size-10 place-items-center rounded-full bg-white text-aspol-navy transition-transform duration-500 ease-(--ease-out-expo) group-hover:-rotate-12 group-hover:scale-110">
                    <ExternalLink className="size-4" aria-hidden="true" />
                    <span className="sr-only">{openLabel}</span>
                </span>
            </div>
            <p className="mt-3 font-display text-sm font-bold text-white">{label}</p>
        </a>
    );
}

/** Featured post: navy text panel beside the cover, same language as the home initiatives. */
function FeaturedCard({
    post,
    language,
    featuredLabel,
    readMoreLabel,
    upcomingLabel,
    formatDate,
}: {
    post: SanityPost;
    language: string;
    featuredLabel: string;
    readMoreLabel: string;
    upcomingLabel: string;
    formatDate: (d: string) => string;
}) {
    const lang = language as keyof typeof post.title;

    return (
        <Link href={`/blog/${post.slug.current}`} className="group block">
            <article className="on-dark grid overflow-hidden rounded-[2rem] bg-aspol-navy text-white transition-[border-radius] duration-700 ease-(--ease-out-expo) group-hover:rounded-[3.5rem] lg:grid-cols-[1.05fr_1fr]">
                <div className="relative min-h-72 overflow-hidden lg:min-h-120">
                    <Image
                        src={post.imageUrl || "/placeholder-blog.jpg"}
                        alt={post.title[lang]}
                        fill
                        priority
                        sizes="(min-width: 1024px) 52vw, 100vw"
                        className="object-cover transition-transform duration-1000 ease-(--ease-out-expo) group-hover:scale-105"
                    />
                </div>

                <div className="flex flex-col justify-between gap-10 p-7 sm:p-12">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                        {post.featured && <span className="rounded-full bg-white px-3.5 py-1.5 font-display text-xs font-bold text-aspol-navy">{featuredLabel}</span>}
                        {post.upcoming && <span className="rounded-full bg-white/15 px-3.5 py-1.5 font-display text-xs font-bold">{upcomingLabel}</span>}
                        <time className="text-white/80">{formatDate(post.publishedAt)}</time>
                        {post.author && <span className="text-white/60">{post.author}</span>}
                    </div>

                    <div>
                        <h2 className="display display-md">{post.title[lang]}</h2>
                        <p className="mt-5 line-clamp-4 max-w-[52ch] text-base leading-relaxed text-white/85 sm:text-lg">{post.excerpt[lang]}</p>
                        {post.tags && post.tags.length > 0 && (
                            <p className="mt-5 text-sm text-white/65">{post.tags.join(" · ")}</p>
                        )}
                    </div>

                    <PillFace className="self-start">{readMoreLabel}</PillFace>
                </div>
            </article>
        </Link>
    );
}

/** Regular post card */
function PostCard({
    post,
    language,
    readMoreLabel,
    upcomingLabel,
    formatDate,
}: {
    post: SanityPost;
    language: string;
    readMoreLabel: string;
    upcomingLabel: string;
    formatDate: (d: string) => string;
    index?: number;
}) {
    const lang = language as keyof typeof post.title;
    const primaryTag = post.tags?.[0];

    return (
        <Link
            href={`/blog/${post.slug.current}`}
            className="group flex h-full flex-col overflow-hidden rounded-[2rem] bg-aspol-mist text-aspol-dark transition-[border-radius] duration-700 ease-(--ease-out-expo) hover:rounded-[3rem]"
        >
            <div className="relative aspect-16/10 overflow-hidden">
                <Image
                    src={post.imageUrl || "/placeholder-blog.jpg"}
                    alt={post.title[lang]}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-1000 ease-(--ease-out-expo) group-hover:scale-105"
                />
                {post.upcoming && (
                    <span className="absolute left-4 top-4 rounded-full bg-white px-3.5 py-1.5 font-display text-xs font-bold text-aspol-navy">
                        {upcomingLabel}
                    </span>
                )}
            </div>

            <div className="flex flex-1 flex-col p-6 sm:p-7">
                <div className="mb-3 flex items-center justify-between gap-3 text-sm">
                    {primaryTag ? <span className="font-semibold text-aspol-red">{primaryTag}</span> : <span />}
                    <time className="text-aspol-ink-soft">{formatDate(post.publishedAt)}</time>
                </div>

                <h3 className="display display-sm line-clamp-3">{post.title[lang]}</h3>
                <p className="mt-3 line-clamp-3 flex-1 text-base leading-relaxed text-aspol-ink-soft">{post.excerpt[lang]}</p>

                <div className="mt-6 flex items-center justify-between gap-3 border-t border-aspol-line pt-5">
                    <span className="text-sm text-aspol-ink-soft">{post.author}</span>
                    <span className="flex items-center gap-3 font-display text-sm font-bold">
                        {readMoreLabel}
                        <span className="grid size-10 place-items-center rounded-full bg-aspol-navy text-white transition-transform duration-500 ease-(--ease-out-expo) group-hover:-rotate-45" aria-hidden="true">
                            <ArrowRight className="size-4" />
                        </span>
                    </span>
                </div>
            </div>
        </Link>
    );
}

// ─── Main page component ──────────────────────────────────────────────────────

/** Blog listing. `initialPosts` comes from the server page so article links are in the crawled HTML. */
export default function BlogIndexView({ initialPosts = null }: { initialPosts?: SanityPost[] | null }) {
    const { language } = useLanguage();
    const [posts, setPosts] = useState<SanityPost[]>(initialPosts ?? []);
    const [loading, setLoading] = useState(!initialPosts);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    const igRef     = useRef<HTMLDivElement>(null);
    const trackerRef = useRef<HTMLDivElement>(null);


    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(true);

    useEffect(() => {
        if (initialPosts) return;
        getPosts()
            .then(setPosts)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [initialPosts]);

    const t = LABELS[language as keyof typeof LABELS] ?? LABELS.en;

    const allTags = Array.from(new Set(posts.flatMap((p) => p.tags ?? [])));

    const sortedPosts = [...posts]
        .filter((p) => !selectedTag || p.tags?.includes(selectedTag))
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    const featuredPost  = sortedPosts.find((p) => p.featured) ?? sortedPosts[0];
    const regularPosts  = sortedPosts.filter((p) => p._id !== featuredPost?._id);

    const formatDate = useCallback(
        (d: string) =>
            new Date(d).toLocaleDateString(
                language === "fr" ? "fr-FR" : language === "pl" ? "pl-PL" : "en-US",
                { year: "numeric", month: "long", day: "numeric" }
            ),
        [language]
    );

    // Horizontal scroll controls
    const updateScrollState = useCallback(() => {
        const el = trackerRef.current;
        if (!el) return;
        const max = Math.max(el.scrollWidth - el.clientWidth, 0);
        setCanScrollPrev(el.scrollLeft > 6);
        setCanScrollNext(el.scrollLeft < max - 6);
    }, []);

    useEffect(() => {
        updateScrollState();
        window.addEventListener("resize", updateScrollState);
        return () => window.removeEventListener("resize", updateScrollState);
    }, [updateScrollState]);

    const scrollIg = useCallback(
        (dir: "prev" | "next") => {
            const el = trackerRef.current;
            if (!el) return;
            const dist = Math.max(el.clientWidth * 0.65, 220);
            el.scrollBy({ left: dir === "next" ? dist : -dist, behavior: "smooth" });
        },
        []
    );

    return (
        <div className="min-h-screen bg-aspol-white text-aspol-dark">
            {/* ── HERO ─────────────────────────────────────────────────── */}
            <PageHero badge={t.badge} title={t.title} subtitle={t.subtitle}>
                {INSTAGRAM_HIGHLIGHT_SLIDES.length > 0 && (
                    <div ref={igRef} className="mt-14 sm:mt-20">
                        <div className="mb-5 flex items-center justify-between gap-4">
                            <div>
                                <p className="display display-sm">{t.igSection}</p>
                                <p className="mt-1 hidden text-sm text-white/65 md:block">@aspol_fr</p>
                            </div>

                            <div className="hidden items-center gap-2 sm:flex">
                                <button
                                    type="button"
                                    onClick={() => scrollIg("prev")}
                                    disabled={!canScrollPrev}
                                    aria-label={t.igPrev}
                                    className="grid size-11 place-items-center rounded-full bg-white text-aspol-navy transition-[opacity,transform] duration-300 hover:-translate-x-0.5 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-x-0"
                                >
                                    <ChevronLeft className="size-5" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => scrollIg("next")}
                                    disabled={!canScrollNext}
                                    aria-label={t.igNext}
                                    className="grid size-11 place-items-center rounded-full bg-white text-aspol-navy transition-[opacity,transform] duration-300 hover:translate-x-0.5 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-x-0"
                                >
                                    <ChevronRight className="size-5" />
                                </button>
                            </div>
                        </div>

                        <div
                            ref={trackerRef}
                            onScroll={updateScrollState}
                            className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3"
                        >
                            {INSTAGRAM_HIGHLIGHT_SLIDES.map((slide) => (
                                <IgCard key={slide.id} slide={slide} label={slide.label} openLabel={t.igOpen} />
                            ))}
                        </div>

                        <p className="mt-3 text-sm text-white/65 sm:hidden">{t.igSwipe}</p>
                    </div>
                )}
            </PageHero>

            {/* ── POSTS SECTION ────────────────────────────────────────── */}
            <section className="section-pad">
                <div className="container-x">
                    <div className="mb-10 grid gap-8 md:mb-14 lg:grid-cols-12 lg:items-end lg:gap-12">
                        <Reveal as="h2" className="display display-lg lg:col-span-6" text={t.postsSection} />

                        {allTags.length > 0 && (
                            <div className="flex flex-wrap gap-2 lg:col-span-6 lg:justify-end">
                                {[null, ...allTags].map((tag) => (
                                    <button
                                        key={tag ?? "__all__"}
                                        type="button"
                                        onClick={() => setSelectedTag(tag)}
                                        aria-pressed={selectedTag === tag}
                                        className={`rounded-full px-5 py-2.5 font-display text-sm font-bold transition-colors duration-300 ${
                                            selectedTag === tag
                                                ? "bg-aspol-navy text-white"
                                                : "bg-aspol-mist text-aspol-dark hover:bg-aspol-line"
                                        }`}
                                    >
                                        {tag ?? t.all}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {loading && (
                        <div className="flex flex-col items-center justify-center gap-4 py-24">
                            <div className="size-10 animate-spin rounded-full border-2 border-aspol-line border-t-aspol-navy" />
                            <p className="text-sm text-aspol-ink-soft">{t.loading}</p>
                        </div>
                    )}

                    {!loading && sortedPosts.length === 0 && (
                        <div className="rounded-[2rem] bg-aspol-mist p-12 text-center">
                            <BookOpen className="mx-auto mb-4 size-10 text-aspol-navy/50" aria-hidden="true" />
                            <p className="font-display text-lg font-bold">{t.empty}</p>
                        </div>
                    )}

                    {!loading && sortedPosts.length > 0 && (
                        <div key={selectedTag ?? "__all__"} className="quote-in">
                            {featuredPost && (
                                <div className="mb-5 md:mb-8">
                                    <FeaturedCard
                                        post={featuredPost}
                                        language={language}
                                        featuredLabel={t.featured}
                                        readMoreLabel={t.readMore}
                                        upcomingLabel={t.upcoming}
                                        formatDate={formatDate}
                                    />
                                </div>
                            )}

                            {regularPosts.length > 0 && (
                                <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
                                    {regularPosts.map((post) => (
                                        <li key={post._id}>
                                            <PostCard
                                                post={post}
                                                language={language}
                                                readMoreLabel={t.readMore}
                                                upcomingLabel={t.upcoming}
                                                formatDate={formatDate}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
