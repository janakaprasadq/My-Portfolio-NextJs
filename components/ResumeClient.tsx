"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";
import { Download, ExternalLink, Award } from "lucide-react";
import { Certificate } from "@prisma/client";
import { trackCustomEvent } from "@/components/AnalyticsTracker";

interface ResumeClientProps {
  certificates: Certificate[];
  cvUrl: string;
}

export default function ResumeClient({ certificates, cvUrl }: ResumeClientProps) {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header & Direct Download Button */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-8">
          <SectionTitle
            title="Curriculum Vitae & Credentials"
            subtitle="DOCUMENTATION SPECIFICATION // VERIFIED QUALIFICATIONS"
            badge="04 // CV"
          />

          <a
            href={cvUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCustomEvent("/cv/download")}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#e87a24] hover:bg-[#f38a38] text-[#0a0d0e] font-mono text-xs font-semibold uppercase tracking-wider transition-colors w-fit border border-[#e87a24]"
          >
            <Download size={14} />
            <span>Download PDF</span>
          </a>
        </div>

        <div className="space-y-16">
          {/* PDF Viewer Frame */}
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0c0f10] border border-[#1e2624] overflow-hidden aspect-[1/1.3] w-full"
            >
              <iframe
                src={cvUrl}
                className="w-full h-full border-none bg-white/5"
                title="Resume Preview Frame"
              />
            </motion.div>
            <p className="font-mono text-xs text-[#53625b]">
              Note: If PDF frame rendering is blocked in your environment, use the direct download trigger above.
            </p>
          </div>

          {/* Certifications Section */}
          {certificates.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between border-b border-[#1e2624] pb-4">
                <div className="font-mono text-xs text-[#e87a24] uppercase tracking-widest flex items-center gap-2">
                  <Award size={14} className="text-[#e87a24]" />
                  <span>VERIFIED CERTIFICATIONS & ACCREDITATIONS</span>
                </div>
                <span className="font-mono text-xs text-[#53625b]">
                  TOTAL: {certificates.length}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certificates.map((cert, index) => (
                  <div
                    key={cert.id}
                    className="p-5 bg-[#0c0f10] border border-[#1e2624] hover:border-[#2d3834] transition-colors flex justify-between items-start"
                  >
                    <div>
                      <div className="font-mono text-[10px] text-[#53625b] uppercase mb-1">
                        CERT // {String(index + 1).padStart(2, "0")}
                      </div>
                      <h4 className="text-sm font-bold text-[#e5ece8] mb-2 uppercase tracking-wide">
                        {cert.name}
                      </h4>
                      <div className="font-mono text-xs text-[#81918a] space-y-0.5">
                        <div>ISSUER: {cert.issuer}</div>
                        <div>DATE: {cert.issueDate}</div>
                      </div>
                    </div>

                    {cert.certificateUrl && (
                      <a
                        href={cert.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-[#141a18] border border-[#1e2624] hover:border-[#e87a24] text-[#81918a] hover:text-[#e87a24] transition-colors"
                        title="Verify Certificate"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
