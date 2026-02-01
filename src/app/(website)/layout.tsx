import type { Metadata } from "next";
import { Lora, Mulish } from "next/font/google"; // Mulish is an excellent Avenir alternative
import "./globals.css";
import Providers from "@/components/providers/Providers";
import StructuredData from "@/components/seo/StructuredData";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

const avenir = Mulish({
  variable: "--font-avenir",
  subsets: ["latin"],
  display: "swap",
}); // Simulating Avenir with Mulish for best free alternative

export const metadata: Metadata = {
  metadataBase: new URL('https://aspol.fr'),
  title: {
    default: "ASPOL - Association des Étudiants Polonais en France",
    template: "%s | ASPOL",
  },
  description: "L'association des étudiants polonais en France. Rejoignez notre communauté dynamique et découvrez nos événements culturels, programme de mentorat et Paris Polish Forum.",
  alternates: {
    canonical: '/',
  },
  keywords: ["ASPOL", "Polish students", "France", "Paris", "étudiants polonais", "association", "networking", "mentoring", "Paris Polish Forum"],
  authors: [{ name: "ASPOL" }],
  creator: "ASPOL",
  publisher: "ASPOL",

  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["fr_FR", "pl_PL"],
    url: "https://aspol.fr",
    siteName: "ASPOL - Association des Étudiants Polonais en France",
    title: "ASPOL - Association des Étudiants Polonais en France",
    description: "Join the community of Polish students in France. Discover our events, mentoring program, and networking opportunities.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "ASPOL - Building bridges between Poland and France",
        type: "image/svg+xml",
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
    description: "Join the community of Polish students in France. Discover our events, mentoring program, and networking opportunities.",
    images: ["/og-image.svg"],
    creator: "@aspolska",
    site: "@aspolska",
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
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#dc2626" />
      </head>
      <body className={`${lora.variable} ${avenir.variable} antialiased`} suppressHydrationWarning>
        <StructuredData />
        <Providers>
          <a href="#main-content" className="skip-link">Skip to content</a>
          <Header />
          <div id="main-content">
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
