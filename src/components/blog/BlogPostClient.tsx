"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/navigation/Breadcrumb";
import SocialShare from "@/components/ui/SocialShare";
import { useLanguage } from "@/contexts/LanguageContext";
import { blogPosts } from "@/data/blogPosts";
import { BlogPost } from "@/types";

interface BlogPostClientProps {
  initialPost: BlogPost;
  slug: string;
}

export default function BlogPostClient({ initialPost, slug }: BlogPostClientProps) {
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(timer);
  }, []);

  // Find the post in the centralized data based on current client language
  const postsForLang = blogPosts[language as keyof typeof blogPosts] || blogPosts.en;

  // Try to find exact match in current language
  const clientMatch = postsForLang.find((post: BlogPost) => post.id === slug);

  // Use client match if found, otherwise fall back to the initial (EN) post passed from server
  // This handles the case where a translation might be missing for a specific slug
  const currentPost = clientMatch || initialPost;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-32 pb-20">
        <article className={`max-w-4xl mx-auto px-4 sm:px-6 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: currentPost.title }
            ]}
          />

          {/* Hero Image */}
          <div className="relative rounded-3xl h-64 sm:h-96 mb-8 mt-8 shadow-2xl overflow-hidden group">
            <Image
              src={currentPost.image}
              alt={currentPost.title}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full font-medium">
              {currentPost.category}
            </span>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {currentPost.date}
            </div>
            <span className="text-gray-300">•</span>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {currentPost.readTime}
            </div>
            <span className="text-gray-300">•</span>
            <div className="flex items-center font-medium text-gray-900">
              <div className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs mr-2">
                {currentPost.author.charAt(0)}
              </div>
              {currentPost.author}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
            {currentPost.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-gray-600 mb-8 leading-relaxed font-light border-l-4 border-red-500 pl-6 py-2 bg-gray-50 rounded-r-lg">
            {currentPost.excerpt}
          </p>

          {/* Social Share (Top) */}
          <div className="mb-12 pb-8 border-b border-gray-100">
            <p className="text-sm text-gray-500 mb-3 font-medium uppercase tracking-wider">Share this article</p>
            <SocialShare
              url={`https://aspol.fr/blog/${slug}`}
              title={currentPost.title}
              description={currentPost.excerpt}
            />
          </div>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:first:mt-0
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-3
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
              prose-ul:my-6 prose-li:text-gray-700 prose-li:mb-2 prose-li:marker:text-red-500
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-a:text-red-600 prose-a:no-underline hover:prose-a:text-red-700 hover:prose-a:underline
              prose-blockquote:border-l-4 prose-blockquote:border-red-600 
              prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-800
              prose-blockquote:bg-red-50/50 prose-blockquote:py-4 prose-blockquote:pr-4 prose-blockquote:rounded-r-lg
              prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-8"
            dangerouslySetInnerHTML={{ __html: currentPost.content || "" }}
          />

          {/* Bottom Social Share */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <p className="text-lg font-semibold text-gray-900 mb-4">Enjoyed this article? Share it!</p>
            <SocialShare
              url={`https://aspol.fr/blog/${slug}`}
              title={currentPost.title}
              description={currentPost.excerpt}
            />
          </div>

          {/* Back to Blog */}
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-red-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Polish Paris Forum
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
