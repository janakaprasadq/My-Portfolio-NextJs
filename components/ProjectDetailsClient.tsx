"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Github, ExternalLink, Image as ImageIcon, ChevronDown } from "lucide-react";
import { Project } from "@prisma/client";
import ImageViewer from "@/components/ImageViewer";

interface Feature {
  label: string;
  description: string | null;
}

interface ProjectWithFeatures extends Project {
  featureList: Feature[];
}

interface ProjectDetailsClientProps {
  project: ProjectWithFeatures;
}

export default function ProjectDetailsClient({ project }: ProjectDetailsClientProps) {
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
      {/* Back Link */}
      <Link
        href="/projects"
        className="inline-flex items-center font-mono text-xs text-[#81918a] hover:text-[#e87a24] transition-colors mb-8"
      >
        <ArrowLeft size={14} className="mr-2" />
        <span>BACK TO ARCHIVED PROJECTS</span>
      </Link>

      {/* Main Spec Frame */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0c0f10] border border-[#1e2624]"
      >
        {/* Spec Header Bar */}
        <div className="p-4 bg-[#141a18] border-b border-[#1e2624] flex items-center justify-between font-mono text-xs">
          <div className="text-[#e87a24] font-semibold flex items-center gap-2">
            <span className="w-2 h-2 bg-[#e87a24]" />
            <span>PROJECT SPECIFICATION // {project.category.toUpperCase()}</span>
          </div>
          <span className="text-[#53625b] text-[10px] uppercase">ID: {project.id}</span>
        </div>

        {/* Hero Image Frame */}
        <div className="h-64 sm:h-96 relative bg-[#101415] border-b border-[#1e2624]">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d0e] via-[#0a0d0e]/40 to-transparent" />

          <div className="absolute bottom-0 left-0 p-6 sm:p-10 w-full">
            <h1 className="text-3xl sm:text-5xl font-bold text-[#e5ece8] mb-4 uppercase tracking-tight">
              {project.title}
            </h1>

            <div className="flex flex-wrap gap-1.5 font-mono text-xs">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 bg-[#141a18]/90 text-[#81918a] border border-[#1e2624]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Description & Features */}
          <div className="lg:col-span-8 space-y-10">
            <div>
              <div className="font-mono text-xs text-[#53625b] uppercase tracking-wider mb-3">
                SYSTEM OVERVIEW
              </div>
              <p className="text-sm sm:text-base text-[#81918a] leading-relaxed font-sans whitespace-pre-wrap">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Key Features */}
            {project.featureList && project.featureList.length > 0 && (
              <div>
                <div className="font-mono text-xs text-[#53625b] uppercase tracking-wider mb-4 pb-2 border-b border-[#1e2624]">
                  ARCHITECTURAL FEATURES & SPECIFICATIONS
                </div>
                <div className="space-y-3">
                  {project.featureList.map((feature, idx) => (
                    <FeatureItem key={idx} feature={feature} index={idx} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Project Access */}
            <div className="bg-[#101415] border border-[#1e2624] p-5">
              <div className="font-mono text-xs text-[#53625b] uppercase tracking-wider mb-4 pb-2 border-b border-[#1e2624]">
                DEPLOYMENT CHANNELS
              </div>

              <div className="space-y-2.5 font-mono text-xs">
                {project.liveDemoUrl ? (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full p-3 bg-[#e87a24] text-[#0a0d0e] font-semibold hover:bg-[#f38a38] transition-colors"
                  >
                    <span>LIVE DEMO</span>
                    <ExternalLink size={14} />
                  </a>
                ) : (
                  <button
                    onClick={() => setIsImageViewerOpen(true)}
                    className="flex items-center justify-between w-full p-3 bg-[#141a18] border border-[#1e2624] hover:border-[#2d3834] text-[#e5ece8] transition-colors cursor-pointer"
                  >
                    <span>VIEW IMAGE ARCHIVE</span>
                    <ImageIcon size={14} />
                  </button>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full p-3 bg-[#141a18] border border-[#1e2624] hover:border-[#2d3834] text-[#81918a] hover:text-[#e5ece8] transition-colors"
                  >
                    <span>SOURCE REPOSITORY</span>
                    <Github size={14} />
                  </a>
                )}
              </div>
            </div>

            {/* Architecture Inquiry */}
            <div className="bg-[#101415] border border-[#1e2624] p-5">
              <div className="font-mono text-xs text-[#e87a24] uppercase tracking-wider mb-2">
                STACK CONSULTATION
              </div>
              <p className="font-mono text-xs text-[#81918a] leading-relaxed mb-4">
                Need similar architecture, microservice performance, or low-level systems integration?
              </p>
              <Link
                href="/contact"
                className="font-mono text-xs text-[#e87a24] hover:underline flex items-center gap-1"
              >
                <span>Initiate Contact Transmission →</span>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Lightbox */}
      <ImageViewer
        isOpen={isImageViewerOpen}
        onClose={() => setIsImageViewerOpen(false)}
        images={project.gallery.length > 0 ? project.gallery : [project.imageUrl]}
      />
    </div>
  );
}

function FeatureItem({ feature, index }: { feature: Feature; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="bg-[#101415] border border-[#1e2624] hover:border-[#2d3834] transition-colors cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="p-4 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-3 text-[#e5ece8]">
          <span className="text-[#e87a24] select-none font-semibold">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-sans font-medium text-sm text-[#e5ece8]">
            {feature.label}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[#53625b]"
        >
          <ChevronDown size={16} />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && feature.description && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-10 pb-4 text-[#81918a] text-xs leading-relaxed font-sans border-t border-[#1e2624] pt-3">
              {feature.description}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
