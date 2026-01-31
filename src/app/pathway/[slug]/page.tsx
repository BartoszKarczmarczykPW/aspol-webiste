import React from 'react';
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
