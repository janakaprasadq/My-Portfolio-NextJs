"use client";

import { usePathname } from "next/navigation";
import { Github, Linkedin, Mail } from "lucide-react";
import { personalInfo } from "@/data";

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin") || pathname.startsWith("/auth")) {
    return null;
  }
  return (
    <footer className="bg-dark border-t border-white/5 pt-12 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center space-y-6">
          
          {/* Social Icons */}
          <div className="flex space-x-6">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-accent hover:scale-110 transition-all"
            >
              <Github size={24} />
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-accent hover:scale-110 transition-all"
            >
              <Linkedin size={24} />
            </a>

            <a
              href={`mailto:${personalInfo.email}`}
              className="text-gray-400 hover:text-accent hover:scale-110 transition-all"
            >
              <Mail size={24} />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-gray-500 text-sm text-center">
            &copy; {new Date().getFullYear()} Janaka Prasad. All rights reserved.
            <br />
            Designed & Built with{" "}
            <span className="text-secondary">♥</span> using Next.js & Tailwind.
          </p>
        </div>
      </div>
    </footer>
  );
}
