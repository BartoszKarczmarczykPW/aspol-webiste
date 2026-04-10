"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink, BookOpen } from "lucide-react";
import { motion, useInView as useFramerInView, AnimatePresence, type Transition } from "framer-motion";

import { useLanguage } from "@/contexts/LanguageContext";
import { getPosts } from "@/lib/sanity";

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

// ─── Animation helpers ────────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUpVariants = {
    hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } as Transition },
};

const cardVariant = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } as Transition },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Instagram Story-style card with brand gradient border */
function IgCard({ slide, label, openLabel }: { slide: HighlightSlide; label: string; openLabel: string }) {
    return (
        <a
            href={slide.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block shrink-0 snap-start focus-visible:outline-none"
            aria-label={`Instagram — ${slide.label}`}
            style={{ width: "clamp(140px, 22vw, 196px)" }}
        >
            {/* Gradient ring (Instagram-style) */}
            <div
                className="rounded-[18px] p-[2.5px] transition-all duration-300 group-hover:p-[3px]"
                style={{
                    background: "linear-gradient(135deg, #900c15 0%, #143D73 60%, #004AAD 100%)",
                }}
            >
                <div className="relative overflow-hidden rounded-[16px] bg-aspol-dark">
                    {/* Image */}
                    <div className="relative" style={{ aspectRatio: "3/4" }}>
                        <Image
                            src={slide.imagePath}
                            alt={slide.label}
                            fill
                            sizes="(max-width: 640px) 42vw, (max-width: 1024px) 22vw, 196px"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                        />
                    </div>

                    {/* Bottom overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-aspol-dark/80 via-aspol-dark/10 to-transparent" />

                    {/* Open badge — appears on hover */}
                    <div className="absolute inset-x-0 top-0 flex justify-end p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <span className="inline-flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
                            {openLabel}
                            <ExternalLink className="h-3 w-3" />
                        </span>
                    </div>

                    {/* Label */}
                    <div className="absolute inset-x-0 bottom-0 p-3">
                        <p className="text-[13px] font-semibold tracking-wide text-white drop-shadow-sm">{slide.label}</p>
                    </div>
                </div>
            </div>

            {/* Label below card */}
            <p className="mt-2 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-aspol-navy/50">
                {label}
            </p>
        </a>
    );
}

/** Featured post — editorial horizontal card */
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
    const ref = useRef<HTMLDivElement>(null);
    const inView = useFramerInView(ref, { once: true, margin: "-60px" });
    const lang = language as keyof typeof post.title;

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUpVariants}
            transition={{ duration: 0.7, ease: EASE }}
        >
            <Link href={`/blog/${post.slug.current}`} className="group block">
                <div className="relative overflow-hidden rounded-3xl bg-white shadow-[0_2px_24px_rgba(18,35,72,0.08)] ring-1 ring-aspol-navy/8 transition-all duration-500 hover:shadow-[0_16px_48px_rgba(18,35,72,0.14)] hover:-translate-y-1">
                    <div className="grid grid-cols-1 lg:grid-cols-[55%_45%]">
                        {/* Image */}
                        <div className="relative h-72 lg:h-full overflow-hidden">
                            <Image
                                src={post.imageUrl || "/placeholder-blog.jpg"}
                                alt={post.title[lang]}
                                fill
                                priority
                                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 lg:to-white/20" />

                            {/* Badges */}
                            <div className="absolute top-5 left-5 flex gap-2">
                                {post.featured && (
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-aspol-red px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-white shadow-lg">
                                        <span className="block h-1.5 w-1.5 rounded-full bg-white/70" />
                                        {featuredLabel}
                                    </span>
                                )}
                                {post.upcoming && (
                                    <span className="rounded-full bg-aspol-navy px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-white shadow-lg">
                                        {upcomingLabel}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex flex-col justify-center p-8 lg:p-12 xl:p-14">
                            {/* Meta */}
                            <div className="mb-5 flex items-center gap-3">
                                <time className="text-xs font-semibold uppercase tracking-[0.14em] text-aspol-red">
                                    {formatDate(post.publishedAt)}
                                </time>
                                {post.author && (
                                    <>
                                        <span className="text-aspol-navy/25">·</span>
                                        <span className="text-xs font-medium text-aspol-navy/50">{post.author}</span>
                                    </>
                                )}
                            </div>

                            {/* Title */}
                            <h2 className="font-heading text-3xl lg:text-4xl xl:text-5xl font-bold leading-[1.1] tracking-tight text-aspol-dark mb-5">
                                {post.title[lang]}
                            </h2>

                            {/* Excerpt */}
                            <p className="text-aspol-navy/65 leading-relaxed mb-8 line-clamp-3 text-base lg:text-lg">
                                {post.excerpt[lang]}
                            </p>

                            {/* Tags */}
                            {post.tags && post.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {post.tags.map((tag) => (
                                        <span key={tag} className="rounded-full border border-aspol-navy/15 px-3 py-1 text-xs font-medium text-aspol-navy/60">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* CTA */}
                            <div className="inline-flex items-center gap-2 text-aspol-red font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                                {readMoreLabel}
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

/** Regular post card */
function PostCard({
    post,
    language,
    readMoreLabel,
    upcomingLabel,
    formatDate,
    index,
}: {
    post: SanityPost;
    language: string;
    readMoreLabel: string;
    upcomingLabel: string;
    formatDate: (d: string) => string;
    index: number;
}) {
    const lang = language as keyof typeof post.title;
    const primaryTag = post.tags?.[0];

    return (
        <motion.div variants={cardVariant} className="h-full">
            <Link href={`/blog/${post.slug.current}`} className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_16px_rgba(18,35,72,0.07)] ring-1 ring-aspol-navy/8 transition-all duration-400 hover:shadow-[0_12px_36px_rgba(18,35,72,0.13)] hover:-translate-y-1">
                {/* Image */}
                <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
                    <Image
                        src={post.imageUrl || "/placeholder-blog.jpg"}
                        alt={post.title[lang]}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    />
                    {/* Subtle top-fade so the image bleeds nicely */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-transparent" />

                    {post.upcoming && (
                        <div className="absolute top-3 right-3">
                            <span className="rounded-full bg-aspol-navy/90 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                                {upcomingLabel}
                            </span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                    {/* Tag + Date row */}
                    <div className="mb-3 flex items-center justify-between gap-2">
                        {primaryTag ? (
                            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-aspol-red">
                                {primaryTag}
                            </span>
                        ) : (
                            <span />
                        )}
                        <time className="text-[11px] font-medium text-aspol-navy/40">
                            {formatDate(post.publishedAt)}
                        </time>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-xl font-bold leading-snug tracking-tight text-aspol-dark mb-3 line-clamp-2 flex-none">
                        {post.title[lang]}
                    </h3>

                    {/* Excerpt */}
                    <p className="flex-1 text-sm leading-relaxed text-aspol-navy/55 line-clamp-3 mb-5">
                        {post.excerpt[lang]}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between border-t border-aspol-navy/8 pt-4">
                        <span className="text-xs font-medium text-aspol-navy/40">{post.author}</span>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-aspol-red transition-gap duration-300 group-hover:gap-2">
                            {readMoreLabel}
                            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

// ─── Main page component ──────────────────────────────────────────────────────

function BlogContent() {
    const { language } = useLanguage();
    const [posts, setPosts] = useState<SanityPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    const heroRef   = useRef<HTMLDivElement>(null);
    const igRef     = useRef<HTMLDivElement>(null);
    const postsRef  = useRef<HTMLDivElement>(null);
    const trackerRef = useRef<HTMLDivElement>(null);

    const heroInView   = useFramerInView(heroRef,  { once: true });
    const igInView     = useFramerInView(igRef,    { once: true, margin: "-80px" });
    const postsInView  = useFramerInView(postsRef, { once: true, margin: "-80px" });

    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(true);

    useEffect(() => {
        getPosts()
            .then(setPosts)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

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
        <div className="min-h-screen" style={{ background: "#FFFFFD" }}>
            {/* ── HERO ─────────────────────────────────────────────────── */}
            <section
                ref={heroRef}
                className="relative overflow-hidden pt-28 md:pt-36 pb-20 md:pb-28"
                style={{
                    background: "linear-gradient(165deg, #122348 0%, #143D73 55%, #0e1e3d 100%)",
                }}
            >
                {/* Subtle noise texture overlay */}
                <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />

                {/* Decorative blobs */}
                <div className="pointer-events-none absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full opacity-10"
                    style={{ background: "radial-gradient(circle, #900c15 0%, transparent 70%)" }} />
                <div className="pointer-events-none absolute bottom-0 -left-24 h-[400px] w-[400px] rounded-full opacity-8"
                    style={{ background: "radial-gradient(circle, #004AAD 0%, transparent 70%)" }} />

                <div className="relative max-w-7xl mx-auto px-6">
                    {/* Badge */}
                    <motion.div
                        ref={heroRef}
                        initial="hidden"
                        animate={heroInView ? "visible" : "hidden"}
                        variants={fadeUpVariants}
                        transition={{ duration: 0.7, ease: EASE, delay: 0 }}
                        className="mb-6 flex justify-center"
                    >
                        <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/8 px-4 py-2 backdrop-blur-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-aspol-red" />
                            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">
                                {t.badge}
                            </span>
                        </div>
                    </motion.div>

                    {/* Title */}
                    <motion.div
                        initial="hidden"
                        animate={heroInView ? "visible" : "hidden"}
                        variants={fadeUpVariants}
                        transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
                        className="text-center mb-4"
                    >
                        <h1
                            className="font-heading font-bold text-white leading-[0.95] tracking-tight"
                            style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}
                        >
                            Polish
                            <br />
                            <span className="text-transparent"
                                style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.35)" }}>
                                Paris Forum
                            </span>
                        </h1>
                    </motion.div>

                    {/* Red accent rule */}
                    <motion.div
                        initial="hidden"
                        animate={heroInView ? "visible" : "hidden"}
                        variants={fadeUpVariants}
                        transition={{ duration: 0.7, ease: EASE, delay: 0.16 }}
                        className="flex justify-center mb-6"
                    >
                        <div className="h-px w-20 bg-aspol-red" />
                    </motion.div>

                    {/* Subtitle */}
                    <motion.p
                        initial="hidden"
                        animate={heroInView ? "visible" : "hidden"}
                        variants={fadeUpVariants}
                        transition={{ duration: 0.7, ease: EASE, delay: 0.22 }}
                        className="text-center text-base md:text-lg text-white/50 max-w-xl mx-auto font-light mb-12 md:mb-16"
                    >
                        {t.subtitle}
                    </motion.p>

                    {/* ── INSTAGRAM SECTION ──────────────────────────────── */}
                    {INSTAGRAM_HIGHLIGHT_SLIDES.length > 0 && (
                        <motion.div
                            ref={igRef}
                            initial="hidden"
                            animate={igInView ? "visible" : "hidden"}
                            variants={fadeUpVariants}
                            transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-5">
                                <div className="flex items-center gap-3">
                                    {/* IG gradient icon */}
                                    <div
                                        className="flex h-9 w-9 items-center justify-center rounded-xl shadow-lg"
                                        style={{
                                            background: "linear-gradient(135deg, #900c15 0%, #143D73 100%)",
                                        }}
                                    >
                                        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white">{t.igSection}</p>
                                        <p className="text-[11px] text-white/40 hidden md:block">@aspol_fr</p>
                                    </div>
                                </div>

                                {/* Scroll controls */}
                                <div className="hidden sm:flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => scrollIg("prev")}
                                        disabled={!canScrollPrev}
                                        aria-label={t.igPrev}
                                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/15 disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => scrollIg("next")}
                                        disabled={!canScrollNext}
                                        aria-label={t.igNext}
                                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/15 disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Scrollable track */}
                            <div className="relative">
                                {/* Fade edges */}
                                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#143D73]/80 to-transparent" />
                                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#0e1e3d]/80 to-transparent" />

                                <div
                                    ref={trackerRef}
                                    onScroll={updateScrollState}
                                    className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                                >
                                    {INSTAGRAM_HIGHLIGHT_SLIDES.map((slide) => (
                                        <IgCard
                                            key={slide.id}
                                            slide={slide}
                                            label={slide.label}
                                            openLabel={t.igOpen}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Mobile swipe hint */}
                            <p className="mt-3 text-center text-[11px] text-white/30 sm:hidden">
                                {t.igSwipe} →
                            </p>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* ── POSTS SECTION ────────────────────────────────────────── */}
            <section ref={postsRef} className="py-16 md:py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Section header */}
                    <motion.div
                        initial="hidden"
                        animate={postsInView ? "visible" : "hidden"}
                        variants={fadeUpVariants}
                        transition={{ duration: 0.7, ease: EASE, delay: 0 }}
                        className="mb-10 md:mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-6"
                    >
                        <div>
                            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-aspol-red">
                                Blog
                            </p>
                            <h2 className="font-heading text-3xl md:text-4xl font-bold text-aspol-dark tracking-tight">
                                {t.postsSection}
                            </h2>
                        </div>

                        {/* Tag filters */}
                        {allTags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => setSelectedTag(null)}
                                    className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                                        selectedTag === null
                                            ? "bg-aspol-red text-white shadow-md"
                                            : "border border-aspol-navy/20 text-aspol-navy/60 hover:border-aspol-navy/40 hover:text-aspol-navy"
                                    }`}
                                >
                                    {t.all}
                                </button>
                                {allTags.map((tag) => (
                                    <button
                                        key={tag}
                                        onClick={() => setSelectedTag(tag)}
                                        className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                                            selectedTag === tag
                                                ? "bg-aspol-red text-white shadow-md"
                                                : "border border-aspol-navy/20 text-aspol-navy/60 hover:border-aspol-navy/40 hover:text-aspol-navy"
                                        }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* Loading */}
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-24 gap-4">
                            <div className="h-10 w-10 rounded-full border-2 border-aspol-navy/10 border-t-aspol-red animate-spin" />
                            <p className="text-sm text-aspol-navy/40">{t.loading}</p>
                        </div>
                    )}

                    {/* Empty */}
                    {!loading && sortedPosts.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-24 gap-4">
                            <BookOpen className="h-12 w-12 text-aspol-navy/20" />
                            <p className="text-base text-aspol-navy/40">{t.empty}</p>
                        </div>
                    )}

                    {/* Content */}
                    {!loading && sortedPosts.length > 0 && (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedTag ?? "__all__"}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25 }}
                            >
                                {/* Featured */}
                                {featuredPost && (
                                    <div className="mb-10 md:mb-14">
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

                                {/* Grid */}
                                {regularPosts.length > 0 && (
                                    <motion.div
                                        initial="hidden"
                                        animate={postsInView ? "visible" : "hidden"}
                                        variants={stagger}
                                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                                    >
                                        {regularPosts.map((post, i) => (
                                            <PostCard
                                                key={post._id}
                                                post={post}
                                                language={language}
                                                readMoreLabel={t.readMore}
                                                upcomingLabel={t.upcoming}
                                                formatDate={formatDate}
                                                index={i}
                                            />
                                        ))}
                                    </motion.div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    )}
                </div>
            </section>
        </div>
    );
}

export default function BlogPage() {
    return <BlogContent />;
}
