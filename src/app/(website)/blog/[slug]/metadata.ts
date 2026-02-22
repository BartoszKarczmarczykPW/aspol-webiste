import type { Metadata } from "next";
import { getPostBySlug } from "@/lib/sanity";
import { getAlternates } from "@/lib/seo";

type LocalizedText = string | { en?: string; fr?: string; pl?: string } | undefined;

const getLocalizedValue = (value: LocalizedText, lang: "en" | "fr" | "pl" = "en") => {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value[lang] || value.en || value.fr || value.pl || "";
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found",
      description: "The requested article does not exist.",
      alternates: getAlternates(`/blog/${slug}`),
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = getLocalizedValue(post.title, "en") || "Polish Paris Forum";
  const description =
    getLocalizedValue(post.excerpt, "en") ||
    "Conference news, highlights, and insights from the Polish Paris Forum.";
  const image = post.imageUrl || "/og-image.svg";
  const url = `/blog/${slug}`;

  return {
    title,
    description,
    alternates: getAlternates(url),
    openGraph: {
      type: "article",
      title,
      description,
      url,
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
