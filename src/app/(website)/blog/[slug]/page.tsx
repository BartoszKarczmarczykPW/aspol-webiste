import { notFound } from "next/navigation";

import BlogPostView from "@/components/blog/BlogPostView";
import { getPostBySlug } from "@/lib/sanity";

// Re-validate articles every few minutes; edits in Sanity also revalidate via the "blog" cache tag.
export const revalidate = 300;

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) notFound();

    return <BlogPostView slug={slug} initialPost={post as never} />;
}
