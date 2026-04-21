"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";
import { Download, Award, ExternalLink, Calendar, Building2 } from "lucide-react";
import { Certificate } from "@prisma/client";

interface ResumeClientProps {
  certificates: Certificate[];
}

export default function ResumeClient({ certificates }: ResumeClientProps) {
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

        <div className="space-y-16">
          {/* PDF Preview */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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

          {/* Certifications Section */}
          {certificates.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/20 rounded-lg text-primary">
                  <Award size={24} />
                </div>
                <h2 className="text-3xl font-bold text-white">Online Certifications</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certificates.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 bg-[#0A0118] border border-white/5 rounded-2xl hover:border-primary/30 transition-all group"
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                          {cert.name}
                        </h3>
                        <div className="flex flex-col space-y-1">
                          <span className="flex items-center text-gray-400 text-sm">
                            <Building2 size={14} className="mr-2 text-primary" />
                            {cert.issuer}
                          </span>
                          <span className="flex items-center text-gray-500 text-xs">
                            <Calendar size={14} className="mr-2" />
                            {cert.issueDate}
                          </span>
                        </div>
                      </div>
                      
                      {cert.certificateUrl && (
                        <a
                          href={cert.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/5 hover:bg-primary/20 text-gray-400 hover:text-primary rounded-lg transition-all"
                          title="Verify Certificate"
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
