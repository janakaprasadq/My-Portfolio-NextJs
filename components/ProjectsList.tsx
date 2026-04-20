"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@prisma/client";

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
      {/* Filter Tabs */}
      <div className="flex justify-center mb-12 flex-wrap gap-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              filter === cat
                ? "bg-primary text-white shadow-lg shadow-primary/25 ring-2 ring-secondary/50"
                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="group relative bg-[#0A0118] border border-white/10 rounded-2xl overflow-hidden 
                       hover:border-secondary/50 transition-all duration-300 
                       hover:shadow-[0_0_20px_rgba(114,9,183,0.3)]"
          >
            {/* Image */}
            <div className="aspect-video overflow-hidden relative">
              <Link href={`/projects/${project.id}`} className="block w-full h-full">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 transition-colors duration-300 group-hover:bg-black/20" />
              </Link>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="text-xs font-medium text-accent mb-2 uppercase tracking-wider">
                {project.category}
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                <Link href={`/projects/${project.id}`}>
                  {project.title}
                </Link>
              </h3>

              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.techStack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-[10px] rounded-md bg-white/5 
                               border border-white/10 text-gray-300"
                  >
                    {tech}
                  </span>
                ))}

                {project.techStack.length > 3 && (
                  <span className="px-2 py-1 text-[10px] rounded-md bg-white/5 
                                 border border-white/10 text-gray-300">
                    +{project.techStack.length - 3}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
