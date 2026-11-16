"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const capabilities = [
  {
    index: "01",
    title: "Backend & Microservices Engineering",
    description:
      "Design and implementation of resilient RESTful APIs, modular backend microservices, and asynchronous task runners. Production experience with NestJS, Spring Boot, Node.js, and FastAPI.",
    deliverables: [
      "Modular RESTful & GraphQL API Architecture",
      "Authentication, Session Management & RBAC",
      "Database connection pooling, Redis caching & query tuning",
    ],
    techStack: ["NestJS", "Spring Boot", "TypeScript", "Node.js", "FastAPI"],
  },
  {
    index: "02",
    title: "Systems & AOSP Framework Development",
    description:
      "Low-level Android Open Source Project (AOSP) framework customization and system-level enhancements. Version control management with Git and Gerrit in enterprise Agile teams.",
    deliverables: [
      "AOSP framework service modification & Java middleware",
      "Cross-functional debugging, logcat tracing & issue resolution",
      "Gerrit code review workflows & enterprise patchsets",
    ],
    techStack: ["Java", "AOSP", "Linux", "Gerrit", "Git"],
  },
  {
    index: "03",
    title: "Full-Stack Web Architecture",
    description:
      "High-performance client interfaces built with Next.js App Router, React, and TypeScript. Optimized for deterministic rendering, Core Web Vitals, and responsive layout fidelity.",
    deliverables: [
      "Server Components (RSC) & Server Actions execution",
      "Clean client state boundaries and typed API contracts",
      "Zero-latency optimistic UI updates & accessible markup",
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    index: "04",
    title: "Database Design & Infrastructure",
    description:
      "Relational schema modeling, migration pipelines, and cloud database administration on PostgreSQL, MySQL, Supabase, and Docker containers.",
    deliverables: [
      "Schema normalization & Prisma ORM migration pipelines",
      "Indexed query strategies & performance profiling",
      "Containerized deployment environments with Docker",
    ],
    techStack: ["PostgreSQL", "Supabase", "Prisma", "MySQL", "Docker", "AWS"],
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-[#1e2624]">
      <div className="max-w-7xl mx-auto">
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-12 border-b border-[#1e2624] gap-4">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#e87a24] mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#e87a24]" />
              01 &bull; CAPABILITIES
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#e5ece8] uppercase">
              Core Engineering Competencies
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#81918a] max-w-md font-mono">
            Structured full-lifecycle development across low-level frameworks, backend APIs, and distributed web applications.
          </p>
        </div>

        {/* 2x2 STRUCTURAL CAPABILITIES GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-[#1e2624] border border-[#1e2624] mb-12">
          {capabilities.map((item, idx) => (
            <motion.div
              key={item.index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              className="bg-[#0c0f10] p-6 sm:p-8 flex flex-col justify-between hover:bg-[#101415] transition-colors group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-[#e87a24] font-semibold">
                    CAPABILITY &bull; {item.index}
                  </span>
                  <span className="font-mono text-[10px] text-[#53625b]">
                    READY FOR DEPLOYMENT
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[#e5ece8] mb-3 group-hover:text-white transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#81918a] leading-relaxed mb-6 font-sans">
                  {item.description}
                </p>

                {/* DELIVERABLES SPEC LIST */}
                <div className="space-y-2 mb-8">
                  <div className="text-[11px] font-mono text-[#53625b] uppercase tracking-wider">
                    SPECIFICATION DELIVERABLES:
                  </div>
                  {item.deliverables.map((d) => (
                    <div key={d} className="flex items-start gap-2 text-xs text-[#81918a] font-mono">
                      <span className="text-[#e87a24] mt-0.5 select-none">›</span>
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* TECH STACK BADGES */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#1e2624]">
                {item.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-[11px] font-mono text-[#81918a] bg-[#141a18] border border-[#1e2624]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="p-6 bg-[#101415] border border-[#1e2624] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-mono text-xs text-[#81918a]">
            HAVE A SYSTEM REQUIREMENT OR ARCHITECTURAL CHALLENGE?
          </div>
          <Link
            href="/contact"
            className="px-5 py-2.5 bg-[#e87a24] text-[#0a0d0e] font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#f38a38] transition-colors flex items-center gap-2"
          >
            <span>Initiate Discussion</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
