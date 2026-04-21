"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";

import { Download } from "lucide-react";

export default function ResumePageRoot() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top title + button */}
        <div className="flex justify-between items-center mb-8">
          <SectionTitle title="Resume" />
          <a
            href="/cv/janaka-prasad-cv-v2.pdf"
            download
            className="flex items-center px-5 py-2 bg-primary hover:bg-primary/80 
    text-white rounded-full transition-colors shadow-lg shadow-primary/20 border border-primary/50"
          >
            <Download size={18} className="mr-2" />
            Download PDF
          </a>

        </div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#11051F]/50 border border-white/10 rounded-2xl overflow-hidden aspect-[1/1.414] w-full shadow-2xl"
          >
            <iframe
              src="/cv/janaka-prasad-cv-v2.pdf"
              className="w-full h-full border-none"
              title="Resume Preview"
            />
          </motion.div>

          <p className="text-center text-gray-500 text-sm italic">
            Note: If the preview doesn&apos;t load, please use the download button above.
          </p>
        </div>
      </div>
    </div>
  );
}
