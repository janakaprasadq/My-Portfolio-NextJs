import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import CommandPalette from "@/components/CommandPalette";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";
import Providers from "@/components/Providers";
import { prisma } from "@/lib/prisma";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://janakaprasad.com");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Janaka Prasad | Full Stack Software Engineer",
    template: "%s | Janaka Prasad",
  },
  description:
    "Portfolio of Janaka Prasad — Full Stack Software Engineer specializing in React, Next.js, TypeScript, Node.js, Spring Boot, Supabase, and high-performance system design.",
  keywords: [
    "Janaka Prasad",
    "Full Stack Developer",
    "Software Engineer",
    "Next.js Developer",
    "React Developer",
    "Node.js",
    "TypeScript",
    "Supabase",
    "Prisma ORM",
    "Web Developer Sri Lanka",
    "Freelance Software Engineer",
  ],
  authors: [{ name: "Janaka Prasad", url: siteUrl }],
  creator: "Janaka Prasad",
  publisher: "Janaka Prasad",
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Janaka Prasad Portfolio",
    title: "Janaka Prasad | Full Stack Software Engineer",
    description:
      "Full Stack Software Engineer building modern, production-grade web applications with Next.js, React, Node.js, and Supabase.",
    images: [
      {
        url: "/icon.svg",
        width: 512,
        height: 512,
        alt: "Janaka Prasad Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Janaka Prasad | Full Stack Software Engineer",
    description:
      "Full Stack Software Engineer building modern, production-grade web applications with Next.js, React, Node.js, and Supabase.",
    images: ["/icon.svg"],
    creator: "@janakaprased",
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
}: {
  children: React.ReactNode;
}) {
  // Fetch CV URL from DB so CommandPalette can download the latest version
  let cvUrl = "/cv/janaka-prasad-cv-v2.pdf";
  try {
    const profile = await prisma.profile.findFirst({ select: { cvUrl: true } });
    if (profile?.cvUrl) cvUrl = profile.cvUrl;
  } catch {
    // If DB is unavailable, fall back to static file silently
  }

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <JsonLd />
      </head>

      <body className="bg-dark text-ink-primary font-sans antialiased overflow-x-hidden selection:bg-primary selection:text-dark">
        <Providers>
          {/* Architectural Background Grid */}
          <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            <div 
              className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage: "linear-gradient(to right, #e5ece8 1px, transparent 1px), linear-gradient(to bottom, #e5ece8 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
            <div 
              className="absolute inset-0 opacity-40"
              style={{
                background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(232, 122, 36, 0.08), transparent 70%)",
              }}
            />
          </div>

          {/* 🔼 Header / Navigation */}
          <Navbar />

          <main className="relative z-10 min-h-screen">{children}</main>

          {/* 🔽 Footer */}
          <Footer />
          <CommandPalette cvUrl={cvUrl} />
          <WhatsAppButton />
          <AnalyticsTracker />
        </Providers>
      </body>
    </html>
  );
}
