"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Instagram } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

// Sample Instagram posts - replace with real data from Instagram API or manual updates
const instagramPosts = [
    {
        id: "1",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=400&fit=crop",
        caption: "Paris Polish Forum VII - April 2025",
        link: "https://www.instagram.com/aspolska/",
        likes: 234,
    },
    {
        id: "2",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=400&fit=crop",
        caption: "Networking event at Polish Embassy",
        link: "https://www.instagram.com/aspolska/",
        likes: 189,
    },
    {
        id: "3",
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=400&fit=crop",
        caption: "Monthly meetup - connecting Polish students",
        link: "https://www.instagram.com/aspolska/",
        likes: 156,
    },
    {
        id: "4",
        image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=400&fit=crop",
        caption: "Workshop with industry professionals",
        link: "https://www.instagram.com/aspolska/",
        likes: 201,
    },
    {
        id: "5",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=400&fit=crop",
        caption: "New Year's celebration at the Embassy",
        link: "https://www.instagram.com/aspolska/",
        likes: 267,
    },
    {
        id: "6",
        image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=400&fit=crop",
        caption: "Cultural evening - Polish traditions",
        link: "https://www.instagram.com/aspolska/",
        likes: 143,
    },
];

export default function InstagramFeed() {
    const { language } = useLanguage();

    const content = {
        en: {
            title: "Follow Our Journey",
            subtitle: "Stay connected with ASPOL community on Instagram",
            handle: "@aspolska",
            followButton: "Follow Us on Instagram",
        },
        fr: {
            title: "Suivez Notre Parcours",
            subtitle: "Restez connecté avec la communauté ASPOL sur Instagram",
            handle: "@aspolska",
            followButton: "Suivez-nous sur Instagram",
        },
        pl: {
            title: "Śledź Naszą Podróż",
            subtitle: "Bądź połączony ze społecznością ASPOL na Instagramie",
            handle: "@aspolska",
            followButton: "Śledź nas na Instagramie",
        },
    };

    const locale = language as "en" | "fr" | "pl";
    const c = content[locale];

    return (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Instagram className="h-8 w-8 text-pink-600" />
                        <h2 className="text-4xl font-bold text-gray-900">{c.title}</h2>
                    </div>
                    <p className="text-lg text-gray-600 mb-4">{c.subtitle}</p>
                    <a
                        href="https://www.instagram.com/aspolska/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 font-semibold text-xl transition-colors"
                    >
                        <Instagram className="h-6 w-6" />
                        {c.handle}
                    </a>
                </motion.div>

                {/* Instagram Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
                    {instagramPosts.map((post, index) => (
                        <motion.a
                            key={post.id}
                            href={post.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="group relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                        >
                            <Image
                                src={post.image}
                                alt={post.caption}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                            />
                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <p className="text-white text-sm font-medium line-clamp-2">
                                        {post.caption}
                                    </p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <svg
                                            className="h-4 w-4 text-white"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span className="text-white text-sm">{post.likes}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* Follow Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center"
                >
                    <a
                        href="https://www.instagram.com/aspolska/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                        <Instagram className="h-6 w-6" />
                        {c.followButton}
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
