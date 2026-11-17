import React from 'react';
import type { Metadata } from 'next';
import { DEFAULT_OG_IMAGE, getAlternates } from '@/lib/seo';
import { notFound } from 'next/navigation';
import { universityGuides } from '@/data/universityGuides';
import UniversityGuideContent from '@/components/pathway/UniversityGuideContent';

export const revalidate = 86400;

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function UniversityGuidePage({ params }: PageProps) {
    const { slug } = await params;
    const guide = universityGuides[slug];

    if (!guide) {
        notFound();
    }

    // Today (Paris) decides which deadlines are shown as passed; the page regenerates daily.
    const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Paris" }).format(new Date());
    return <UniversityGuideContent guide={guide} today={today} />;
}

export async function generateStaticParams() {
    return Object.keys(universityGuides).map((slug) => ({
        slug: slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const guide = universityGuides[slug];
    if (!guide) return { title: 'Guide not found', robots: { index: false, follow: false } };

    const fullTitle = `Study at ${guide.name}: admissions guide | ASPOL`;
    const description = `${guide.name}: programmes open to Polish students, 2027 admission deadlines, requirements and tuition, checked against official sources.`;
    const url = `/pathway/${slug}`;

    return {
        title: { absolute: fullTitle },
        description,
        alternates: getAlternates(url),
        openGraph: { type: 'article', title: fullTitle, description, url, images: [DEFAULT_OG_IMAGE] },
        twitter: { card: 'summary_large_image', title: fullTitle, description, images: [DEFAULT_OG_IMAGE.url] },
    };
}
