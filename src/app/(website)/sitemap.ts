import { MetadataRoute } from 'next';
import { blogPosts } from '@/data/blogPosts';
import { eventsData } from '@/data/eventsData';
import { universityGuides } from '@/data/universityGuides';
import { getPosts } from '@/lib/sanity';

const baseUrl = 'https://aspol.fr';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Current date at build time — Next.js regenerates this on each build
  // so static routes always reflect the latest deployment date.
  const buildDate = new Date();

  // Static routes
  const routes = [
    '',
    '/blog',
    '/events',
    '/partners',
    '/pathway',
    '/ppf',
    '/legal-notice',
    '/privacy-policy',
    '/terms-of-use',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: buildDate,
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // University guides (statically generated pages under /pathway)
  const guideRoutes = Object.keys(universityGuides).map((slug) => ({
    url: `${baseUrl}/pathway/${slug}`,
    lastModified: buildDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Blog articles come from Sanity (that is what /blog/[slug] renders). If Sanity
  // cannot be reached at build time, fall back to the bundled list so the sitemap never breaks.
  let blogRoutes: MetadataRoute.Sitemap;
  try {
    const posts = await getPosts();
    blogRoutes = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug.current}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch {
    blogRoutes = blogPosts.en.map((post) => ({
      url: `${baseUrl}/blog/${post.id}`,
      lastModified: new Date(post.date),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  }

  // Event detail pages (rendered from the bundled events list)
  const eventRoutes = eventsData.en.map((event) => ({
    url: `${baseUrl}/events/${event.id}`,
    lastModified: buildDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...routes, ...guideRoutes, ...blogRoutes, ...eventRoutes];
}
