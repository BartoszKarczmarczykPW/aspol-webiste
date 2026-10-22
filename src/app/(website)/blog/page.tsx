import BlogIndexView from "@/components/blog/BlogIndexView";
import { getPosts } from "@/lib/sanity";

export const revalidate = 300;

export default async function BlogPage() {
    // If Sanity is unreachable the view falls back to fetching on the client.
    const posts = await getPosts().catch(() => null);
    return <BlogIndexView initialPosts={posts as never} />;
}
