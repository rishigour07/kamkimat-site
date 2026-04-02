import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";

import { ChatWidget } from "@/components/chatbot/chat-widget";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { siteConfig } from "@/lib/site";
import { getSiteContentData } from "@/lib/site-content";

import "./globals.css";

const siteUrl = `https://${siteConfig.domain}`;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["500", "600", "700"],
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kamkimat | Premium AI Software Systems",
    template: "%s | Kamkimat"
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  icons: {
    icon: "/kamkimat-logo.png",
    shortcut: "/kamkimat-logo.png",
    apple: "/kamkimat-logo.png"
  },
  keywords: [
    "Kamkimat",
    "AI automation",
    "custom SaaS development",
    "AI chatbot development",
    "workflow integration",
    "web app development",
    "software consulting"
  ],
  openGraph: {
    title: "Kamkimat | Premium AI Software Systems",
    description: siteConfig.description,
    siteName: siteConfig.name,
    type: "website",
    url: siteUrl,
    images: [
      {
        url: "/kamkimat-logo.png",
        width: 831,
        height: 240,
        alt: "Kamkimat logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Kamkimat | Premium AI Software Systems",
    description: siteConfig.description,
    images: ["/kamkimat-logo.png"]
  }
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { siteConfig: liveSiteConfig } = await getSiteContentData();

  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} bg-background`}>
        <div className="relative min-h-screen overflow-x-hidden">
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ChatWidget contactPhone={liveSiteConfig.phone} />
        </div>
      </body>
    </html>
  );
}
