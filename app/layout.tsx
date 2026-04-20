import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ClickSparkle from "@/components/ClickSparkle";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Janaka Prasad | Full Stack Software Engineer",
  description:
    "Portfolio of Janaka Prasad — Full Stack Developer specializing in React, Next.js, Node.js, Spring Boot, and scalable system design.",
};

import Providers from "@/components/Providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>

      </head>

      <body className={`${inter.className} bg-dark text-white antialiased overflow-x-hidden`}>
        <Providers>
          {/* 🔥 Global Click Effects (optional component) */}
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
        </Providers>
      </body>
    </html>
  );
}
