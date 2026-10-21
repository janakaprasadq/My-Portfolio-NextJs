import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ClickSparkle from "@/components/ClickSparkle";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import CommandPalette from "@/components/CommandPalette";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import { prisma } from "@/lib/prisma";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Janaka Prasad | Full Stack Software Engineer",
  description:
    "Portfolio of Janaka Prasad — Full Stack Developer specializing in React, Next.js, Node.js, Spring Boot, and scalable system design.",
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
