import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/providers/Providers";
import StructuredData from "@/components/seo/StructuredData";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getAlternates } from "@/lib/seo";
import { getPrefetch } from "@/lib/prefetch";

export const metadata: Metadata = {
  metadataBase: new URL('https://aspol.fr'),
  title: {
    default: "ASPOL - Association des Étudiants Polonais en France",
    template: "%s | ASPOL",
  },
  description: "L'association des étudiants polonais en France. Rejoignez notre communauté dynamique et découvrez nos événements culturels, programme de mentorat et Paris Polish Forum.",
  alternates: getAlternates('/'),
  keywords: ["ASPOL", "Polish students", "France", "Paris", "étudiants polonais", "association", "networking", "mentoring", "Paris Polish Forum"],
  authors: [{ name: "ASPOL" }],
  creator: "ASPOL",
  publisher: "ASPOL",

  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: ["en_US", "pl_PL"],
    url: "https://aspol.fr",
    siteName: "ASPOL - Association des Étudiants Polonais en France",
    title: "ASPOL - Association des Étudiants Polonais en France",
    description: "Rejoignez la communauté des étudiants polonais en France. Découvrez nos événements, notre programme de mentorat et les opportunités de networking.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ASPOL - Building bridges between Poland and France",
        type: "image/png",
      },
      {
        url: "/aspollogo.png",
        width: 512,
        height: 512,
        alt: "ASPOL Logo",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ASPOL - Association des Étudiants Polonais en France",
    description: "Rejoignez la communauté des étudiants polonais en France. Découvrez nos événements, notre programme de mentorat et les opportunités de networking.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Live Sanity content is fetched here, on the server, and cached (revalidate 300s).
  const prefetch = await getPrefetch();

  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#143D73" />
        <noscript>
          {/* Headline reveals start hidden; without JS show them as-is. */}
          <style>{`.rw>span{transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <StructuredData />
        <Providers prefetch={prefetch}>
          <a href="#main-content" className="skip-link">Skip to content</a>
          <Header />
          <main id="main-content">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
