import type { Metadata } from "next";
import { eventsData } from "@/data/eventsData";
import { getAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = eventsData.en.find((item) => item.id === slug);

  if (!event) {
    return {
      title: "Event Not Found",
      description: "The requested event does not exist.",
      alternates: getAlternates(`/events/${slug}`),
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${event.title} | ASPOL`;
  const description = event.shortDescription;
  const image = event.image || "/og-image.svg";
  const url = `/events/${slug}`;

  return {
    title,
    description,
    alternates: getAlternates(url),
    openGraph: {
      type: "website",
      title,
      description,
      url,
      images: [{ url: image, alt: event.title }],
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
