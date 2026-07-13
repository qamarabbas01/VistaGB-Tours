import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://vista-gb-tours.vercel.app",
  ),
  title: {
    default: "VistaGB Tours — Gilgit-Baltistan",
    template: "%s — VistaGB Tours",
  },
  description:
    "Discover the Karakoram, Hunza, Skardu and the high valleys of Gilgit-Baltistan with VistaGB Tours — curated journeys, treks and stays across northern Pakistan.",
  openGraph: {
    type: "website",
    locale: "en_PK",
    siteName: "VistaGB Tours",
    title: "VistaGB Tours — Gilgit-Baltistan",
    description:
      "Curated journeys through the Karakoram, Hunza, Skardu and the high valleys of Gilgit-Baltistan.",
  },
  twitter: {
    card: "summary_large_image",
    title: "VistaGB Tours — Gilgit-Baltistan",
    description:
      "Curated journeys through the Karakoram, Hunza, Skardu and the high valleys of Gilgit-Baltistan.",
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
    <html lang="en">
      <body
        className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable} font-body bg-night text-glacier antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
