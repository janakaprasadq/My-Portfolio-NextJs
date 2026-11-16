"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  FileText,
  Github,
  Linkedin,
  Mail,
  Terminal,
} from "lucide-react";
import { Profile, Testimonial } from "@prisma/client";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function HomeClient({
  profile,
  testimonials = [],
}: {
  profile: Profile;
  testimonials?: Testimonial[];
}) {
  return (
    <>
      {/* TECHNICAL FIELD HERO */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#1e2624]">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            
            {/* LEFT COLUMN: PRIMARY DOSSIER & CALLOUT */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-7 flex flex-col justify-center"
            >
              {/* SYSTEM STATUS BADGE */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#101415] border border-[#1e2624] w-fit mb-6 text-xs font-mono text-[#81918a]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e87a24] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e87a24]"></span>
                </span>
                <span>STATUS: AVAILABLE FOR BACKEND & FULL-STACK ROLES</span>
                <span className="text-[#53625b]">|</span>
                <span className="text-[#53625b] hidden sm:inline">COLOMBO (UTC+5:30)</span>
              </div>

              {/* NAME & PRIMARY TITLE */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#e5ece8] leading-[1.05] uppercase mb-4">
                {profile.name}
              </h1>

              <div className="font-mono text-sm sm:text-base text-[#e87a24] tracking-wider uppercase mb-6 flex items-center gap-2">
                <Terminal size={18} className="text-[#e87a24]" />
                <span>{profile.role || "Software Engineer (Full Stack)"}</span>
              </div>

              {/* TECHNICAL SUMMARY */}
              <p className="text-base sm:text-lg text-[#81918a] leading-relaxed max-w-2xl mb-8 font-sans">
                {profile.tagline ||
                  "Designing and implementing scalable RESTful APIs, modular backend microservices, and high-performance applications with verified experience in AOSP framework customization."}
              </p>

              {/* ACTION SPEC BUTTONS */}
              <div className="flex flex-wrap items-center gap-4 mb-12">
                <Link
                  href="/projects"
                  className="px-6 py-3 bg-[#e87a24] text-[#0a0d0e] font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-[#f38a38] transition-colors flex items-center gap-2 border border-[#e87a24]"
                >
                  <span>Explore Projects</span>
                  <ArrowRight size={16} />
                </Link>

                <Link
                  href="/resume"
                  className="px-6 py-3 bg-[#101415] text-[#e5ece8] font-mono text-xs sm:text-sm tracking-wider uppercase hover:bg-[#141a18] hover:text-white border border-[#1e2624] hover:border-[#2d3834] transition-all flex items-center gap-2"
                >
                  <FileText size={16} className="text-[#81918a]" />
                  <span>Technical Resume</span>
                </Link>
              </div>

              {/* SYSTEM METRICS ROW */}
              <div className="grid grid-cols-3 gap-4 border-t border-[#1e2624] pt-6 max-w-xl">
                <div>
                  <div className="font-mono text-xs text-[#53625b] uppercase">Focus</div>
                  <div className="font-sans font-medium text-sm text-[#e5ece8] mt-0.5">Backend & AOSP</div>
                </div>
                <div>
                  <div className="font-mono text-xs text-[#53625b] uppercase">Experience</div>
                  <div className="font-sans font-medium text-sm text-[#e5ece8] mt-0.5">Zebra Tech & Raahi</div>
                </div>
                <div>
                  <div className="font-mono text-xs text-[#53625b] uppercase">Credentials</div>
                  <div className="font-sans font-medium text-sm text-[#e5ece8] mt-0.5">BSc Electronics & IT</div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT COLUMN: TECHNICAL SPEC DOSSIER PANEL */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="lg:col-span-5 bg-[#101415] border border-[#1e2624] divide-y divide-[#1e2624]"
            >
              {/* DOSSIER HEADER */}
              <div className="p-4 bg-[#141a18] flex items-center justify-between">
                <div className="font-mono text-xs text-[#e5ece8] uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#e87a24]" />
                  ENGINEERING SPECIFICATION
                </div>
                <div className="font-mono text-[10px] text-[#53625b] uppercase">
                  SPEC: 2026.01
                </div>
              </div>

              {/* SPEC ROWS */}
              <div className="p-4 space-y-3 font-mono text-xs">
                <div className="flex justify-between items-start gap-4">
                  <span className="text-[#53625b] uppercase min-w-[100px]">LANGUAGES</span>
                  <span className="text-[#e5ece8] text-right">Java, TypeScript, Python, C/C++, SQL</span>
                </div>
                <div className="flex justify-between items-start gap-4">
                  <span className="text-[#53625b] uppercase min-w-[100px]">BACKEND</span>
                  <span className="text-[#e5ece8] text-right">NestJS, Spring Boot, Node.js, FastAPI</span>
                </div>
                <div className="flex justify-between items-start gap-4">
                  <span className="text-[#53625b] uppercase min-w-[100px]">FRONTEND</span>
                  <span className="text-[#e5ece8] text-right">Next.js, React, Tailwind CSS</span>
                </div>
                <div className="flex justify-between items-start gap-4">
                  <span className="text-[#53625b] uppercase min-w-[100px]">DATABASES</span>
                  <span className="text-[#e5ece8] text-right">PostgreSQL, MySQL, Supabase, Prisma</span>
                </div>
                <div className="flex justify-between items-start gap-4">
                  <span className="text-[#53625b] uppercase min-w-[100px]">SYSTEMS</span>
                  <span className="text-[#e5ece8] text-right">AOSP Framework, Docker, AWS, Git/Gerrit</span>
                </div>
              </div>

              {/* VERIFIED EXPERIENCE CALLOUT */}
              <div className="p-4 bg-[#0d1011]">
                <div className="text-[11px] font-mono text-[#53625b] uppercase mb-2">
                  RECENT DEPLOYMENTS & ROLES
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-[#e5ece8]">Zebra Technologies</span>
                    <span className="font-mono text-[11px] text-[#81918a]">AOSP Intern &bull; 2025</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-[#e5ece8]">Raahi Startup</span>
                    <span className="font-mono text-[11px] text-[#81918a]">Backend Dev &bull; 2025&ndash;Present</span>
                  </div>
                </div>
              </div>

              {/* DIRECT CHANNELS */}
              <div className="p-4 bg-[#101415] flex items-center justify-between text-xs font-mono">
                <span className="text-[#53625b] uppercase">CONNECT</span>
                <div className="flex items-center gap-4">
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#81918a] hover:text-[#e87a24] transition-colors flex items-center gap-1"
                    title="GitHub"
                  >
                    <Github size={14} />
                    <span>GITHUB</span>
                  </a>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#81918a] hover:text-[#e87a24] transition-colors flex items-center gap-1"
                    title="LinkedIn"
                  >
                    <Linkedin size={14} />
                    <span>LINKEDIN</span>
                  </a>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-[#81918a] hover:text-[#e87a24] transition-colors flex items-center gap-1"
                    title="Email"
                  >
                    <Mail size={14} />
                    <span>EMAIL</span>
                  </a>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* CAPABILITIES & SERVICES MATRIX */}
      <ServicesSection />

      {/* TECHNICAL ENDORSEMENTS & REVIEWS */}
      <TestimonialsSection testimonials={testimonials} />
    </>
  );
}
