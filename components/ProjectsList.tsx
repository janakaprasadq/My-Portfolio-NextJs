"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@prisma/client";
import { ArrowUpRight } from "lucide-react";

interface ProjectsListProps {
  initialProjects: Project[];
}

export default function ProjectsList({ initialProjects }: ProjectsListProps) {
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...new Set(initialProjects.map((p) => p.category))];

  const filteredProjects =
    filter === "All"
      ? initialProjects
      : initialProjects.filter((p) => p.category === filter);

  return (
    <>
      {/* FILTER MONOSPACE SEGMENTS */}
      <div className="flex items-center gap-1 mb-10 overflow-x-auto pb-2 border-b border-[#1e2624]">
        <span className="font-mono text-xs text-[#53625b] uppercase mr-3 hidden sm:inline">
          FILTER SPEC:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
              filter === cat
                ? "bg-[#141a18] text-[#e87a24] border border-[#2d3834]"
                : "text-[#81918a] hover:text-[#e5ece8] hover:bg-[#101415] border border-transparent"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* TECHNICAL SPEC PROJECTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="group bg-[#0c0f10] border border-[#1e2624] hover:border-[#e87a24] transition-colors flex flex-col justify-between"
          >
            <div>
              {/* TOP SPEC BAR */}
              <div className="p-3 bg-[#101415] border-b border-[#1e2624] flex items-center justify-between text-xs font-mono">
                <span className="text-[#e87a24] font-semibold">
                  PRJ // {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="text-[#81918a] uppercase text-[10px]">
                  {project.category}
                </span>
              </div>

              {/* IMAGE PREVIEW WITH DELIBERATE CROP */}
              <div className="aspect-[16/10] overflow-hidden relative bg-[#141a18] border-b border-[#1e2624]">
                <Link href={`/projects/${project.id}`} className="block w-full h-full">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover opacity-85 group-hover:opacity-100 transition-opacity"
                  />
                </Link>
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <h3 className="text-base font-bold text-[#e5ece8] mb-2 group-hover:text-white transition-colors">
                  <Link
                    href={`/projects/${project.id}`}
                    className="flex items-center justify-between gap-2"
                  >
                    <span>{project.title}</span>
                    <ArrowUpRight
                      size={16}
                      className="text-[#81918a] group-hover:text-[#e87a24] transition-colors shrink-0"
                    />
                  </Link>
                </h3>

                <p className="text-xs text-[#81918a] mb-4 line-clamp-2 leading-relaxed font-sans">
                  {project.description}
                </p>
              </div>
            </div>

            {/* TECH STACK FOOTER */}
            <div className="p-4 bg-[#0a0d0e] border-t border-[#1e2624] flex flex-wrap gap-1.5 font-mono text-[10px]">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 bg-[#141a18] border border-[#1e2624] text-[#81918a]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
