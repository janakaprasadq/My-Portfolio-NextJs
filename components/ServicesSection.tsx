"use client";

import { motion } from "framer-motion";
import { Code2, Server, Database, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Code2,
    title: "Full-Stack Web Development",
    description:
      "End-to-end modern web applications built with Next.js, React, and TypeScript. Optimized for speed, SEO, and seamless user experiences.",
    highlights: ["Server-Side Rendering (SSR) & App Router", "State Management & React Server Components", "PWA & Mobile-First Responsive Layouts"],
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    accent: "from-blue-500/20 to-primary/20",
    border: "hover:border-blue-500/50",
  },
  {
    icon: Server,
    title: "Backend & API Engineering",
    description:
      "Scalable RESTful & GraphQL microservices and backend architectures. Secure authentication, automated workflows, and robust validation.",
    highlights: ["NextAuth & OAuth Integrations", "Optimized Query Execution & Rate Limiting", "Webhooks & Third-Party API Integrations"],
    tags: ["Node.js", "REST APIs", "NextAuth", "Zod"],
    accent: "from-primary/20 to-secondary/20",
    border: "hover:border-secondary/50",
  },
  {
    icon: Database,
    title: "Database Design & Cloud Infra",
    description:
      "High-availability relational database schemas and cloud deployments on Supabase, PostgreSQL, and AWS with automated migrations.",
    highlights: ["Relational Data Modeling with Prisma ORM", "Connection Pooling & Latency Optimization", "Cloud Storage Buckets & Edge Deployment"],
    tags: ["Supabase", "PostgreSQL", "Prisma", "Vercel"],
    accent: "from-emerald-500/20 to-teal-500/20",
    border: "hover:border-emerald-500/50",
  },
  {
    icon: Sparkles,
    title: "UI/UX & Interactive Design",
    description:
      "Eye-catching cyber aesthetics, high-performance micro-interactions, smooth animations, and clean accessibility that leave a lasting impression.",
    highlights: ["Framer Motion Page Transitions", "Dark Neon & Glassmorphism Design", "Lighthouse 95+ Performance Scores"],
    tags: ["Framer Motion", "Tailwind CSS", "Figma", "UI/UX"],
    accent: "from-pink-500/20 to-purple-500/20",
    border: "hover:border-pink-500/50",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-3.5 py-1.5 rounded-full border border-secondary/30 bg-secondary/5 text-secondary text-xs font-semibold tracking-wider uppercase mb-4"
          >
            What I Offer
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4"
          >
            Engineering Solutions for{" "}
            <span className="bg-gradient-to-r from-accent via-secondary to-primary bg-clip-text text-transparent">
              Ambitious Projects
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-base md:text-lg"
          >
            Whether you need a full SaaS application built from scratch, high-speed API architecture, or sleek UI/UX overhaul, I turn your vision into production-ready software.
          </motion.p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`bg-[#0A0118]/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 transition-all duration-300 ${service.border} hover:shadow-[0_0_25px_rgba(114,9,183,0.2)] group flex flex-col justify-between`}
              >
                <div>
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.accent} border border-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-105 transition-transform`}>
                    <Icon size={26} className="text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2 mb-6">
                    {service.highlights.map((item) => (
                      <div key={item} className="flex items-center text-xs text-gray-300">
                        <CheckCircle2 size={14} className="text-accent mr-2 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/5 text-gray-300 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold text-base hover:shadow-[0_0_30px_rgba(247,37,133,0.5)] transition-all transform hover:-translate-y-1"
          >
            Start a Project Together <ArrowRight size={18} className="ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
