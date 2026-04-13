import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";

import { ChatWidget } from "@/components/chatbot/chat-widget";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { siteConfig } from "@/lib/site";
import { getSiteContentData } from "@/lib/site-content";

import "./globals.css";

const siteUrl = `https://${siteConfig.domain}`
const logoUrl = `${siteUrl}/kamkimat-logo.png`;

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteUrl}#organization`,
  name: "Kamkimat Technologies Private Limited",
  alternateName: "Kamkimat",
  url: siteUrl,
  logo: logoUrl,
  image: logoUrl,
  description: siteConfig.description,
  email: siteConfig.email,
  telephone: `+91${siteConfig.phone}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address,
    addressLocality: "Indore",
    addressRegion: "Madhya Pradesh",
    addressCountry: "IN"
  },
  areaServed: ["IN", "US", "UK", "AE", "Global"],
  sameAs: [siteUrl],
  serviceType: [
    "IT services",
    "AI automation services",
    "Custom software development",
    "SaaS development",
    "Chatbot development",
    "Workflow integration"
  ]
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}#website`,
  url: siteUrl,
  name: "Kamkimat",
  description: siteConfig.description,
  publisher: {
    "@id": `${siteUrl}#organization`
  },
  inLanguage: "en-IN"
};

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
    default: "Kamkimat Technologies | IT Service Company for AI & Software Development",
    template: "%s | Kamkimat"
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  category: "technology",
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: "/favicon.jpeg",
    shortcut: "/favicon.jpeg",
    apple: "/favicon.jpeg"
  },
  keywords: [
    "Kamkimat",
    "IT service company",
    "IT service company in India",
    "software development company",
    "AI automation",
    "AI development company",
    "custom SaaS development",
    "AI chatbot development",
    "workflow integration",
    "web app development company",
    "software consulting"
  ],
  openGraph: {
    title: "Kamkimat Technologies | IT Service Company for AI & Software Development",
    description: siteConfig.description,
    siteName: siteConfig.name,
    type: "website",
    url: siteUrl,
    locale: "en_IN",
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
    title: "Kamkimat Technologies | IT Services & AI Software Development",
    description: siteConfig.description,
    images: ["/kamkimat-logo.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema, websiteSchema])
          }}
        />
      </head>
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
