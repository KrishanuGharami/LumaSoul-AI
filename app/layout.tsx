import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://lumasoul-ai.vercel.app")
  ),
  title: "LumaSoul AI | Your Taste. Your Space. Your Light.",
  description:
    "Architectural cultural lighting architect powered by Qloo API. Translates personal taste across cinema, music, fashion, and travel into bespoke residential lighting masterplans.",
  keywords: [
    "architectural lighting",
    "lighting design",
    "Qloo API",
    "cultural intelligence",
    "home lighting blueprint",
    "circadian lighting",
    "Kelvin temperature",
    "CRI 95",
    "smart lighting design",
  ],
  authors: [{ name: "LumaSoul AI Team" }],
  openGraph: {
    title: "LumaSoul AI | Your Taste. Your Space. Your Light.",
    description:
      "Your cultural identity deserves more than a default lighting preset. Bespoke architectural lighting masterplans powered by Qloo cultural intelligence.",
    type: "website",
    locale: "en_US",
    siteName: "LumaSoul AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "LumaSoul AI | Your Taste. Your Space. Your Light.",
    description:
      "Translates personal cultural taste across cinema, sound, fashion, and travel into bespoke architectural lighting blueprints.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-charcoal-950 text-ivory-100 min-h-screen flex flex-col selection:bg-amberGold-500/30 selection:text-amberGold-300">
        {children}
      </body>
    </html>
  );
}
