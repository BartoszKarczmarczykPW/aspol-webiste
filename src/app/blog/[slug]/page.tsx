"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, User, Clock, Share2, Tag } from "lucide-react";

import { blogPosts } from "@/data/blogPosts";
import { useLanguage, LanguageProvider } from "@/contexts/LanguageContext";
import SocialShare from "@/components/ui/SocialShare";


interface PageProps {
    params: Promise<{ slug: string }>;
}

function BlogPostContent({ slug }: { slug: string }) {
    const { language } = useLanguage();

    const t = {
        en: { back: "Back to Blog", share: "Share Article", readTime: "Read Time", published: "Published", writtenBy: "Written by" },
        fr: { back: "Retour au Blog", share: "Partager l'article", readTime: "Temps de lecture", published: "Publié le", writtenBy: "Écrit par" },
        pl: { back: "Powrót do Bloga", share: "Udostępnij artykuł", readTime: "Czas czytania", published: "Opublikowano", writtenBy: "Autor" }
    }[language as 'en' | 'fr' | 'pl'] || { back: "Back", share: "Share", readTime: "Read Time", published: "Published", writtenBy: "Written by" };

    const posts = blogPosts[language as keyof typeof blogPosts] || blogPosts.en;
    const post = posts.find((p) => p.id === slug);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
                    <Link href="/blog" className="text-aspol-red font-bold hover:underline">Return to Blog</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFDFD] font-sans text-gray-900">


            <main className="pt-24 pb-20">
                {/* HERO SECTION */}
                <div className="relative h-[50vh] min-h-[400px] w-full mb-12">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    <div className="absolute bottom-0 left-0 w-full p-6 sm:p-12 z-20">
                        <div className="max-w-4xl mx-auto">
                            <Link href="/blog" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full text-sm font-medium border border-white/10 hover:bg-black/30">
                                <ArrowLeft size={16} className="mr-2" />
                                {t.back}
                            </Link>

                            <div className="flex flex-wrap items-center gap-4 mb-4">
                                <span className="px-3 py-1 bg-aspol-red text-white text-xs font-bold tracking-widest uppercase rounded-lg shadow-lg">
                                    {post.category}
                                </span>
                                <span className="flex items-center text-white/90 text-sm font-medium bg-black/30 px-3 py-1 rounded-lg backdrop-blur-sm">
                                    <Clock size={14} className="mr-2" />
                                    {post.readTime}
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight shadow-sm">
                                {post.title}
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
                                    <span>{post.date}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CONTENT */}
                <article className="max-w-3xl mx-auto px-6">
                    {/* Lead Excerpt */}
                    <div className="text-xl md:text-2xl text-aspol-navy font-serif leading-relaxed mb-10 pl-6 border-l-4 border-aspol-red/30 italic">
                        {post.excerpt}
                    </div>

                    {/* Main Content */}
                    <div className="prose prose-lg prose-slate max-w-none 
                        prose-headings:font-serif prose-headings:text-aspol-navy 
                        prose-a:text-aspol-red prose-a:no-underline hover:prose-a:underline
                        prose-img:rounded-xl prose-img:shadow-lg
                        text-gray-600 leading-relaxed mb-16">
                        <div dangerouslySetInnerHTML={{ __html: post.content || "" }} />
                    </div>

                    {/* Share Section */}
                    <div className="border-t border-gray-100 pt-8 mt-12 mb-12">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                            <h3 className="text-lg font-bold text-aspol-navy">{t.share}</h3>
                            <SocialShare
                                url={`https://aspol.fr/blog/${slug}`}
                                title={post.title}
                                description={post.excerpt}
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
    return (
        <LanguageProvider>
            <BlogPostContent slug={resolvedParams.slug} />
        </LanguageProvider>
    );
}
