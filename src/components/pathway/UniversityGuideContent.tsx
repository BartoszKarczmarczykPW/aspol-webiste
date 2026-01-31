"use client";

import React from 'react';
import ReactMarkdown from 'react-markdown';
import RippleButton from '@/components/ui/RippleButton';
import { ArrowLeftIcon, MapPinIcon, GraduationCapIcon, CheckCircle2, XCircle } from 'lucide-react';
import Link from 'next/link';
import type { Components } from 'react-markdown';
import { UniversityGuide } from '@/data/universityGuides';

interface UniversityGuideContentProps {
    guide: UniversityGuide;
}

export default function UniversityGuideContent({ guide }: UniversityGuideContentProps) {
    // Custom renderer for markdown to make it look "pro"
    const components: Components = {
        h1: () => null, // Hide H1 as we render it in the hero
        h2: ({ children }) => <h2 className="text-2xl font-bold text-aspol-navy mt-10 mb-6 pb-2 border-b border-gray-100">{children}</h2>,
        h3: ({ children }) => {
            // Check for specific "badge-like" content
            const text = String(children);
            if (text.includes("✅") || text.includes("❌")) {
                const isYes = text.includes("✅");
                return (
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 mr-3 ${isYes ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                        {isYes ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                        {text.replace(":", "").replace("✅", "").replace("❌", "").trim()}
                    </div>
                );
            }
            return <h3 className="text-xl font-bold text-aspol-navy mt-8 mb-4">{children}</h3>;
        },
        ul: ({ children }) => <ul className="space-y-4 my-6">{children}</ul>,
        li: ({ children }) => (
            <li className="flex items-start gap-4 text-gray-600 leading-relaxed group">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-aspol-red shrink-0 group-hover:scale-125 transition-transform" />
                <span className="flex-1">{children}</span>
            </li>
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
                linkText.includes('aplikuj') ||
                linkText.includes('strona') ||
                linkText.includes('website') ||
                linkText.includes('apply') ||
                linkText.includes('program') ||
                linkText.includes('bachelor') ||
                linkText.includes('master');

            if (isButton) {
                return (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 mr-4 no-underline group-hover:no-underline mb-4">
                        <span className="px-6 py-3 bg-white border border-aspol-navy/10 text-aspol-navy font-semibold rounded-xl hover:bg-aspol-navy hover:text-white transition-all shadow-sm hover:shadow-md flex items-center gap-2 group-hover:translate-x-1 duration-300">
                            {children} <span className="text-xs opacity-50">↗</span>
                        </span>
                    </a>
                );
            }
            return <a href={href} target="_blank" rel="noopener noreferrer" className="text-aspol-red font-medium underline decoration-aspol-red/30 underline-offset-4 hover:decoration-aspol-red transition-all">{children}</a>;
        },
        p: ({ children }) => <p className="text-gray-600 leading-relaxed mb-6 text-lg">{children}</p>,
        strong: ({ children }) => <strong className="font-bold text-aspol-navy">{children}</strong>,
        blockquote: ({ children }) => <blockquote className="border-l-4 border-aspol-red pl-6 py-2 my-8 text-xl font-light italic text-gray-700 bg-gray-50/50 rounded-r-xl">{children}</blockquote>,
    };

    return (
        <main className="min-h-screen bg-gray-50/30">
            {/* Header / Hero */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-xl bg-white/80 supports-[backdrop-filter]:bg-white/60">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link
                        href="/pathway"
                        className="inline-flex items-center text-gray-500 hover:text-aspol-navy transition-colors text-sm font-medium group px-4 py-2 hover:bg-gray-50 rounded-lg"
                    >
                        <ArrowLeftIcon className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Pathway
                    </Link>
                    <div className="md:hidden font-bold text-aspol-navy truncate max-w-[200px]">{guide.name}</div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-12">

                {/* Hero Card */}
                <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-gray-100 mb-12 flex flex-col md:flex-row items-center md:items-start gap-10">
                    <div className="w-32 h-32 md:w-48 md:h-48 bg-gray-50 rounded-3xl border border-gray-100 p-8 flex items-center justify-center shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={guide.logo} alt={guide.name} className="max-w-full max-h-full object-contain" />
                    </div>
                    <div className="text-center md:text-left flex-1 py-2">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-aspol-navy mb-6 tracking-tight">{guide.name}</h1>
                        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                            <span className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-100"><MapPinIcon className="w-4 h-4" /> France</span>
                            <span className="flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-full text-sm font-medium border border-purple-100"><GraduationCapIcon className="w-4 h-4" /> Top University</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content */}
                    <article className="lg:col-span-8">
                        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-gray-100">
                            <ReactMarkdown components={components}>{guide.content}</ReactMarkdown>
                        </div>
                    </article>

                    {/* Sidebar / Quick Actions */}
                    <div className="lg:col-span-4 space-y-8 sticky top-32 h-fit">
                        <div className="bg-aspol-navy text-white p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold mb-4">Dreaming of {guide.name}?</h3>
                                <p className="text-white/80 mb-8 text-base leading-relaxed">
                                    Our mentors are current students at {guide.name}. They can guide you through the application process and share insider tips.
                                </p>
                            </div>
                            {/* Decorative background circle */}
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 ease-in-out" />
                        </div>

                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-3 text-lg">
                                <span className="w-1.5 h-6 bg-aspol-red rounded-full" />
                                Why choose {guide.name}?
                            </h3>
                            <ul className="space-y-4 text-gray-600">
                                <li className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0"><CheckCircle2 className="w-4 h-4" /></div> World-class education</li>
                                <li className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0"><CheckCircle2 className="w-4 h-4" /></div> International environment</li>
                                <li className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0"><CheckCircle2 className="w-4 h-4" /></div> Career opportunities</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main >
    );
}
