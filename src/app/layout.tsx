import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, JetBrains_Mono } from "next/font/google";
import { site } from "@/content/site";
import { coreKeywords, pageSeo } from "@/content/seo";
import { siteUrl } from "@/lib/site-url";
import { JsonLd } from "@/components/seo/json-ld";
import { siteGraph } from "@/lib/structured-data";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ThemeScript } from "@/components/layout/theme-script";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { RevealObserver } from "@/components/providers/reveal-observer";
import { TopographicBackground } from "@/components/backgrounds/topographic-background";
import { ChatWidget } from "@/components/chat/chat-widget";
import "./globals.css";

/** Display font for headings. */
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

/** Body font. */
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

/** Labels, eyebrows, code. */
const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: pageSeo.home.title,
    template: `%s | ${site.name}`,
  },
  description: pageSeo.home.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.name,
  keywords: coreKeywords,
  category: "technology",
  // No `alternates.canonical` here on purpose: it would be inherited by every page.
  // Each page sets its own canonical through pageMetadata().
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    title: pageSeo.home.title,
    description: pageSeo.home.description,
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { telephone: false, email: false, address: false },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // Server renders the default theme; ThemeScript corrects it before paint.
      className={`dark ${bricolage.variable} ${geist.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-dvh flex-col">
        <JsonLd data={siteGraph()} />
        <TopographicBackground />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatWidget />
        <SmoothScroll />
        <RevealObserver />
      </body>
    </html>
  );
}
