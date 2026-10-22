import React from 'react';
import type { Metadata } from 'next';
import { DEFAULT_OG_IMAGE, getAlternates } from '@/lib/seo';
import { notFound } from 'next/navigation';
import { universityGuides } from '@/data/universityGuides';
import UniversityGuideContent from '@/components/pathway/UniversityGuideContent';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function UniversityGuidePage({ params }: PageProps) {
    const { slug } = await params;
    const guide = universityGuides[slug];

    if (!guide) {
        notFound();
    }

    return <UniversityGuideContent guide={guide} />;
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

    const title = `Study at ${guide.name}: admissions guide for Polish students`;
    const fullTitle = `Study at ${guide.name}: admissions guide | ASPOL`;
    const description = `Admissions requirements, programmes and practical tips for Polish students applying to ${guide.name} in France, written by students for students.`;
    const url = `/pathway/${slug}`;

    return {
        title: { absolute: fullTitle },
        description,
        alternates: getAlternates(url),
        openGraph: { type: 'article', title: fullTitle, description, url, images: [DEFAULT_OG_IMAGE] },
        twitter: { card: 'summary_large_image', title: fullTitle, description, images: [DEFAULT_OG_IMAGE.url] },
    };
}
