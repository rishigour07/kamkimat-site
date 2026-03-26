import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { siteConfig } from "@/lib/site";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "Kamkimat | Premium AI Software Systems",
    template: "%s | Kamkimat"
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
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
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Kamkimat | Premium AI Software Systems",
    description: siteConfig.description
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} bg-background`}>
        <div className="relative min-h-screen overflow-x-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[540px] bg-[radial-gradient(circle_at_top,_rgba(108,99,255,0.16),_transparent_38%),radial-gradient(circle_at_top_right,_rgba(0,212,255,0.12),_transparent_28%)]" />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

