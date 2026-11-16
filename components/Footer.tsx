"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { personalInfo } from "@/data";

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin") || pathname.startsWith("/auth")) {
    return null;
  }

  return (
    <footer className="bg-[#080a0b] border-t border-[#1e2624] pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-[#1e2624]">
          {/* Identity & Technical Info */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 bg-[#e87a24]" />
              <span className="font-mono text-xs font-semibold text-[#e5ece8] tracking-widest uppercase">
                JANAKA PRASAD
              </span>
            </div>
            <p className="font-mono text-xs text-[#81918a] leading-relaxed max-w-sm mb-4">
              Software Engineer specializing in scalable backend systems, RESTful microservices, and AOSP framework customization.
            </p>
            <div className="font-mono text-[11px] text-[#53625b] space-y-1">
              <div>LOC: Sri Lanka (UTC+5:30)</div>
              <div>STACK: Java, TypeScript, NestJS, Spring Boot, PostgreSQL</div>
            </div>
          </div>

          {/* Site Navigation */}
          <div className="md:col-span-3">
            <div className="font-mono text-[11px] uppercase tracking-wider text-[#53625b] mb-4">
              INDEX
            </div>
            <ul className="space-y-2 font-mono text-xs">
              {[
                { name: "01. Overview", href: "/" },
                { name: "02. About & Background", href: "/about" },
                { name: "03. Archived Projects", href: "/projects" },
                { name: "04. Technical Resume", href: "/resume" },
                { name: "05. Contact & Dispatch", href: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[#81918a] hover:text-[#e87a24] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Channels */}
          <div className="md:col-span-4">
            <div className="font-mono text-[11px] uppercase tracking-wider text-[#53625b] mb-4">
              COMMUNICATION CHANNELS
            </div>
            <div className="space-y-2 font-mono text-xs">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 bg-[#101415] border border-[#1e2624] text-[#81918a] hover:text-[#e5ece8] hover:border-[#2d3834] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Github size={14} />
                  <span>GITHUB // @janakaprasadq</span>
                </span>
                <ArrowUpRight size={14} />
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 bg-[#101415] border border-[#1e2624] text-[#81918a] hover:text-[#e5ece8] hover:border-[#2d3834] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Linkedin size={14} />
                  <span>LINKEDIN // janaka-prasad</span>
                </span>
                <ArrowUpRight size={14} />
              </a>

              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center justify-between p-2.5 bg-[#101415] border border-[#1e2624] text-[#81918a] hover:text-[#e5ece8] hover:border-[#2d3834] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Mail size={14} />
                  <span>EMAIL // {personalInfo.email}</span>
                </span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Technical Status Sub-bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#53625b]">
          <div>
            &copy; {new Date().getFullYear()} JANAKA PRASAD. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-block w-1.5 h-1.5 bg-[#e87a24]" />
            <span>SYS STATUS: NOMINAL</span>
            <span>|</span>
            <span>SPEC: V2.4-FIELD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
