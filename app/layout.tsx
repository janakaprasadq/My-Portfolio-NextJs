import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ClickSparkle from "@/components/ClickSparkle";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import CommandPalette from "@/components/CommandPalette";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import { prisma } from "@/lib/prisma";

const inter = Inter({ subsets: ["latin"] });

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
        <JsonLd />
      </head>

      <body className={`${inter.className} bg-dark text-white antialiased overflow-x-hidden`}>
        <Providers>
          {/* 🔥 Global Click Effects */}
          <ClickSparkle />

          {/* 🌈 Global Glow Background */}
          <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            <div className="absolute -top-[10%] -left-[15%] w-[40%] h-[40%] rounded-full bg-electric/20 blur-[120px]" />
            <div className="absolute top-[25%] right-[0%] w-[30%] h-[30%] rounded-full bg-secondary/10 blur-[120px]" />
            <div className="absolute bottom-[0%] left-[25%] w-[35%] h-[35%] rounded-full bg-primary/10 blur-[120px]" />
          </div>

          {/* 🔼 Navbar */}
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
