import { createClient } from '@sanity/client'
import { apiVersion, dataset, projectId } from '@/sanity/env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Ensure newly published content shows immediately
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

// Helper function to get event countdown (singleton-ish)
export async function getEventCountdown() {
  return client.fetch(`*[_type == "eventCountdown" && isActive == true] | order(_updatedAt desc)[0] {
    _id,
    title,
    label,
    targetDate,
    liveLabel,
    completedMessage,
    isActive,
    showLiveBadge
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
    upcoming,
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
    featured,
    sponsors[] {
      _key,
      name,
      website,
      "logoUrl": logo.asset->url
    },
    partners[] {
      _key,
      name,
      website,
      "logoUrl": logo.asset->url
    }
  }`, { slug })
}

// Helper function to get partners for carousel
export async function getPartners() {
  return client.fetch(`*[_type == "partner" && status == "active"] | order(order asc, name asc) {
    _id,
    name,
    website,
    logoPath,
    logo {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions { width, height } }
      }
    },
    order
  }`)
}

// Helper function to get site statistics (singleton)
export async function getStatistics() {
  return client.fetch(`*[_type == "statistics"] | order(_updatedAt desc)[0] {
    items[] {
      value,
      suffix,
      order,
      label { en, fr, pl }
    }
  }`)
}

// Home About section (singleton)
export async function getAboutSection() {
  return client.fetch(`*[_type == "aboutSection"] | order(_updatedAt desc)[0] {
    eyebrow { en, fr, pl },
    title { en, fr, pl },
    subtitle { en, fr, pl },
    description { en, fr, pl },
    features[] {
      icon,
      order,
      link,
      title { en, fr, pl },
      description { en, fr, pl }
    }
  }`)
}

// Home initiatives
export async function getInitiatives() {
  return client.fetch(`*[_type == "initiative" && status == "active"] | order(order asc, title.en asc) {
    _id,
    featured,
    icon,
    title { en, fr, pl },
    badge { en, fr, pl },
    description { en, fr, pl }
  }`)
}

// Team members
export async function getTeamMembers() {
  return client.fetch(`*[_type == "teamMember" && status == "active"] | order(order asc, name asc) {
    _id,
    name,
    role { en, fr, pl },
    linkedin,
    photo {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions { width, height } }
      }
    }
  }`)
}

// Testimonials
export async function getTestimonials() {
  return client.fetch(`*[_type == "testimonial" && status == "active"] | order(order asc, name asc) {
    _id,
    name,
    role { en, fr, pl },
    text { en, fr, pl },
    year
  }`)
}
