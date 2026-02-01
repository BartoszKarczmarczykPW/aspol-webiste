import { MetadataRoute } from 'next';
import { blogPosts } from '@/data/blogPosts';
import { eventsData } from '@/data/eventsData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://aspol-webiste.vercel.app';

  // Static routes
  const routes = [
    '',
    '/blog',
    '/events',
    '/legal-notice',
    '/privacy-policy',
    '/terms-of-use',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic Blog routes (EN is default)
  const blogRoutes = blogPosts.en.map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(post.date), // Assuming date string is parseable or just use new Date()
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Dynamic Event routes (EN is default)
  const eventRoutes = eventsData.en.map((event) => ({
    url: `${baseUrl}/events/${event.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...routes, ...blogRoutes, ...eventRoutes];
}
