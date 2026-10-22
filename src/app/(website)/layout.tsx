import type { Metadata } from "next";
import { Archivo, Mulish } from "next/font/google"; // Mulish is an excellent Avenir alternative
import "./globals.css";
import Providers from "@/components/providers/Providers";
import StructuredData from "@/components/seo/StructuredData";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getAlternates } from "@/lib/seo";

/**
 * Display face: Archivo is a variable family with a width axis, so headlines
 * can run heavy and slightly extended (poster-style type)
 * without loading a second font file. Polish/French diacritics live in the
 * latin-ext subset, which is declared separately with preload off: it is only
 * downloaded when a page actually renders such a glyph, instead of costing every
 * visitor ~120 KB up front. (Its variable comes first in the font stack; with
 * adjustFontFallback off it has no fallback face that could shadow the latin file.)
 */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});
const archivoExt = Archivo({
  variable: "--font-archivo-ext",
  subsets: ["latin-ext"],
  axes: ["wdth"],
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

/**
 * Mulish serves as a free Avenir alternative.
 * The CSS variable stays `--font-avenir` so globals.css and Tailwind
 * still reference it, but the JS variable is now honest about the
 * actual typeface being loaded.
 */
const mulish = Mulish({
  variable: "--font-avenir",
  subsets: ["latin"],
  display: "swap",
});
const mulishExt = Mulish({
  variable: "--font-avenir-ext",
  subsets: ["latin-ext"],
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // The next/font variable classes live on <html> so the theme variables declared on :root
  // in globals.css (e.g. --font-display) can resolve them; on <body> they would be undefined there.
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${archivo.variable} ${archivoExt.variable} ${mulish.variable} ${mulishExt.variable}`}
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
        <Providers>
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
