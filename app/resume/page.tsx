"use client";

import { motion } from "framer-motion";
import {
  Download,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
} from "lucide-react";

import SectionTitle from "@/components/SectionTitle";
import { personalInfo, skills, experiences, education } from "@/data";

// Reusable page sheet
const ResumePage = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className={`bg-[#11051F] text-gray-200 rounded-lg shadow-2xl shadow-primary/10 overflow-hidden 
    border border-white/10 min-h-[800px] flex flex-col ${className}`}
  >
    {children}
  </motion.div>
);

export default function ResumePageRoot() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

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
          {/* PAGE 1 */}
          <ResumePage>
            {/* Header */}
            <div className="bg-[#1A0B2E] p-8 md:p-12 border-b border-white/5">
              <h1 className="text-4xl font-bold tracking-tight mb-2 uppercase text-white">
                {personalInfo.name}
              </h1>
              <p className="text-accent text-xl font-medium mb-6">
                {personalInfo.role}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
                <div className="flex items-center">
                  <MapPin size={14} className="mr-2 text-primary" />
                  {personalInfo.location}
                </div>
                <div className="flex items-center">
                  <Mail size={14} className="mr-2 text-primary" />
                  {personalInfo.email}
                </div>
                <div className="flex items-center">
                  <Phone size={14} className="mr-2 text-primary" />
                  {personalInfo.phone}
                </div>
                <div className="flex items-center space-x-4">
                  <a
                    href={personalInfo.linkedin}
                    className="hover:text-accent flex items-center transition-colors"
                  >
                    <Linkedin size={14} className="mr-1" /> LinkedIn
                  </a>
                  <a
                    href={personalInfo.github}
                    className="hover:text-accent flex items-center transition-colors"
                  >
                    <Github size={14} className="mr-1" /> GitHub
                  </a>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-8 md:p-12 space-y-8 flex-grow">
              {/* Summary */}
              <section>
                <h3 className="text-lg font-bold text-white border-b-2 border-primary/50 
                    pb-1 mb-3 uppercase tracking-wide">
                  Summary
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {personalInfo.about}
                </p>
              </section>

              {/* Work Experience */}
              <section>
                <h3 className="text-lg font-bold text-white border-b-2 border-primary/50 
                    pb-1 mb-4 uppercase tracking-wide">
                  Work Experience
                </h3>
                <div className="space-y-6">
                  {experiences.map((exp, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-bold text-gray-100 text-lg">
                          {exp.role}
                        </h4>
                        <span className="text-sm text-gray-500 font-medium">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-secondary font-semibold mb-2">
                        {exp.company}
                      </p>

                      <ul className="list-disc list-outside ml-4 text-gray-400 space-y-1 text-sm">
                        {exp.description.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Page Number */}
            <div className="p-4 text-center text-gray-600 text-xs border-t border-white/5">
              Page 1 / 2
            </div>
          </ResumePage>

          {/* PAGE 2 */}
          <ResumePage delay={0.2}>
            <div className="p-8 md:p-12 space-y-8 flex-grow">
              {/* Education */}
              <section>
                <h3 className="text-lg font-bold text-white border-b-2 border-primary/50 
                    pb-1 mb-4 uppercase tracking-wide">
                  Education
                </h3>
                <div className="space-y-4">
                  {education.map((edu, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-bold text-gray-100">{edu.degree}</h4>
                        <span className="text-sm text-gray-500 font-medium">
                          {edu.period}
                        </span>
                      </div>
                      <p className="text-accent italic mb-1">{edu.institution}</p>
                      <p className="text-sm text-gray-400">{edu.details}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Skills */}
              <section>
                <h3 className="text-lg font-bold text-white border-b-2 border-primary/50 
                    pb-1 mb-4 uppercase tracking-wide">
                  Skills
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {skills.map((cat, idx) => (
                    <div key={idx}>
                      <h5 className="font-bold text-gray-200 mb-1 text-sm text-secondary">
                        {cat.name}
                      </h5>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {cat.skills.join(", ")}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Activities */}
              <section>
                <h3 className="text-lg font-bold text-white border-b-2 border-primary/50 
                    pb-1 mb-4 uppercase tracking-wide">
                  Extracurricular Activities
                </h3>

                <ul className="list-disc list-outside ml-4 text-gray-400 text-sm space-y-2">
                  <li>IT coordinator | Astronomical Society of University of Colombo (2023 - 2024)</li>
                  <li>IT coordinator | Physics Club of University of Colombo (2023 - 2024)</li>
                  <li>Marketing director | Leo Club of University of Colombo (2022 - 2023)</li>
                </ul>
              </section>
            </div>

            {/* Page Number */}
            <div className="p-4 text-center text-gray-600 text-xs border-t border-white/5">
              Page 2 / 2
            </div>
          </ResumePage>
        </div>
      </div>
    </div>
  );
}
