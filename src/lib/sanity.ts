import { createClient } from '@sanity/client'

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'YOUR_PROJECT_ID',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

// Helper function to get events
export async function getEvents() {
    return client.fetch(`*[_type == "event"] | order(date desc) {
    _id,
    title,
    slug,
    date,
    location,
    description,
    "imageUrl": image.asset->url,
    registrationLink,
    tags,
    featured
  }`)
}

// Helper function to get blog posts
export async function getPosts() {
    return client.fetch(`*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    author,
    publishedAt,
    excerpt,
    content,
    "imageUrl": featuredImage.asset->url,
    tags,
    featured
  }`)
}

// Helper function to get single event by slug
export async function getEventBySlug(slug: string) {
    return client.fetch(`*[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    date,
    location,
    description,
    "imageUrl": image.asset->url,
    registrationLink,
    tags,
    featured
  }`, { slug })
}

// Helper function to get single post by slug
export async function getPostBySlug(slug: string) {
    return client.fetch(`*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    author,
    publishedAt,
    excerpt,
    content,
    "imageUrl": featuredImage.asset->url,
    tags,
    featured
  }`, { slug })
}
