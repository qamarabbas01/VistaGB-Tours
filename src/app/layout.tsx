import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import AlertBanner from "@/components/AlertBanner";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { LazyLiveChat } from "@/components/lazy/LiveChat";
import Navbar from "@/components/Navbar";
import { PreferencesProvider } from "@/components/PreferencesProvider";
import {
  absoluteUrl,
  organizationJsonLd,
  websiteJsonLd,
  withJsonLdContext,
} from "@/lib/seo";
import { THEME_BOOTSTRAP } from "@/lib/theme-script";
import { site } from "@/config/site";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400"],
  display: "swap",
  preload: false,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: {
    default: site.title,
    template: "%s — VistaGB Tours",
  },
  description: site.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.ogDescription,
    images: [
      {
        url: site.defaultOgImage,
        width: 1200,
        height: 630,
        alt: site.defaultOgAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.ogDescription,
    images: [site.defaultOgImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body
        className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable} font-body bg-night text-glacier antialiased`}
      >
        <Script id="vistagb-theme" strategy="beforeInteractive">
          {THEME_BOOTSTRAP}
        </Script>
        <PreferencesProvider>
          <JsonLd
            data={withJsonLdContext([organizationJsonLd(), websiteJsonLd()])}
          />
          <AlertBanner />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <LazyLiveChat />
        </PreferencesProvider>
      </body>
    </html>
  );
}
