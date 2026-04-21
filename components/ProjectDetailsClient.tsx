"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Github, ExternalLink, Layers, CheckCircle, Image as ImageIcon, ChevronDown } from "lucide-react";
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back Link */}
      <Link
        href="/projects"
        className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft size={20} className="mr-2" /> Back to Projects
      </Link>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0A0118] border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm shadow-2xl"
      >
        {/* Header Image */}
        <div className="h-64 md:h-96 relative">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#030014] to-transparent" />

          <div className="absolute bottom-0 left-0 p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {project.title}
            </h1>

            <div className="flex flex-wrap gap-3">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-sm rounded-full bg-primary/20 
                             text-accent border border-primary/30 backdrop-blur-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Overview + Features */}
          <div className="md:col-span-2 space-y-8">
            {/* Overview */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Layers className="mr-2 text-accent" /> Overview
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                {project.longDescription}
              </p>
            </div>

            {/* Features */}
            {project.featureList && project.featureList.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">
                  Key Features
                </h2>
                <div className="space-y-4">
                  {project.featureList.map((feature, idx) => (
                    <FeatureItem key={idx} feature={feature} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Links Card */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4">
                Project Links
              </h3>

              <div className="space-y-3">
                {project.liveDemoUrl ? (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full py-3 bg-gradient-to-r 
                              from-primary to-secondary hover:opacity-90 text-white rounded-lg 
                              transition-all font-medium shadow-lg shadow-primary/20"
                  >
                    <ExternalLink size={18} className="mr-2" />
                    Live Demo
                  </a>
                ) : (
                  <button
                    onClick={() => setIsImageViewerOpen(true)}
                    className="flex items-center justify-center w-full py-3 bg-gradient-to-r 
                              from-primary to-secondary hover:opacity-90 text-white rounded-lg 
                              transition-all font-medium shadow-lg shadow-primary/20"
                  >
                    <ImageIcon size={18} className="mr-2" />
                    View Images
                  </button>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full py-3 bg-white/10 
                              hover:bg-white/20 text-white rounded-lg transition-all 
                              font-medium border border-white/10"
                  >
                    <Github size={18} className="mr-2" />
                    View Source
                  </a>
                )}
              </div>
            </div>

            {/* Hire CTA */}
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-6 border border-primary/20">
              <h4 className="text-white font-semibold mb-2">
                Interested in this stack?
              </h4>
              <p className="text-gray-400 text-sm mb-4">
                I can build similar applications for your needs. Let&apos;s discuss.
              </p>
              <Link
                href="/contact"
                className="text-accent text-sm font-medium hover:underline"
              >
                Contact Me →
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
function FeatureItem({ feature }: { feature: Feature }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-primary/30 transition-colors cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center text-gray-200 font-medium">
          <CheckCircle
            size={20}
            className="mr-3 text-secondary flex-shrink-0"
          />
          {feature.label}
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-gray-500"
        >
          <ChevronDown size={20} />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && feature.description && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-11 pb-4 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-3 mx-4">
              {feature.description}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
