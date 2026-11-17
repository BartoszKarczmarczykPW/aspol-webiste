import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DEFAULT_OG_IMAGE, getAlternates } from "@/lib/seo";
import { getResource } from "@/lib/sanity";
import ResourceView from "@/components/resources/ResourceView";

export const revalidate = 300;

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const resource = await getResource(slug).catch(() => null);
  if (!resource) return { title: "Guide not found" };
  const title = resource.title?.en || resource.title?.pl || "Guide";
  const description = resource.description?.en || resource.description?.pl || "A practical guide to life and studies in France by ASPOL.";
  return {
    title,
    description,
    alternates: getAlternates(`/resources/${slug}`),
    openGraph: { title: `${title} | ASPOL`, description, type: "article", url: `/resources/${slug}`, images: [DEFAULT_OG_IMAGE] },
    twitter: { card: "summary_large_image", title: `${title} | ASPOL`, description, images: [DEFAULT_OG_IMAGE.url] },
  };
}

export default async function ResourcePage({ params }: Params) {
  const { slug } = await params;
  const resource = await getResource(slug).catch(() => null);
  if (!resource?.fileUrl) notFound();
  return <ResourceView resource={resource} />;
}
