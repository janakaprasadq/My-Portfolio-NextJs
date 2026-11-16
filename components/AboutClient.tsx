"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";
import { Experience, Education, SkillCategory, Profile } from "@prisma/client";

interface AboutClientProps {
  profile: Profile;
  experiences: Experience[];
  education: Education[];
  skills: SkillCategory[];
}

export default function AboutClient({
  profile,
  experiences,
  education,
  skills,
}: AboutClientProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
      <SectionTitle
        title="Background & Technical Dossier"
        subtitle="ENGINEERING RECORD // EXPERIENCE // SKILL SPECIFICATION"
        badge="01 // DOSSIER"
      />

      {/* TOP GRID: PROFILE & SKILL MATRIX */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
        {/* Left Column: Dossier Card & Metadata */}
        <div className="lg:col-span-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="sticky top-24 bg-[#0c0f10] border border-[#1e2624]"
          >
            {/* Image Box */}
            <div className="aspect-[4/5] relative bg-[#101415] border-b border-[#1e2624]">
              <Image
                src="/images/profile.png"
                alt={profile.name}
                fill
                className="object-cover opacity-90"
              />
            </div>

            {/* Profile Info Spec */}
            <div className="p-5 space-y-3 font-mono text-xs">
              <div className="flex justify-between border-b border-[#1e2624] pb-2">
                <span className="text-[#53625b] uppercase">NAME</span>
                <span className="text-[#e5ece8] font-bold">{profile.name}</span>
              </div>
              <div className="flex justify-between border-b border-[#1e2624] pb-2">
                <span className="text-[#53625b] uppercase">ROLE</span>
                <span className="text-[#e87a24]">{profile.role}</span>
              </div>
              <div className="flex justify-between border-b border-[#1e2624] pb-2">
                <span className="text-[#53625b] uppercase">LOCATION</span>
                <span className="text-[#81918a]">{profile.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#53625b] uppercase">STATUS</span>
                <span className="text-[#e87a24] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#e87a24]" />
                  ACTIVE
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Bio Statement & Skill Matrix */}
        <div className="lg:col-span-8 space-y-12">
          {/* Engineering Bio */}
          <div className="bg-[#101415] border border-[#1e2624] p-6 sm:p-8">
            <div className="font-mono text-xs text-[#e87a24] uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#e87a24]" />
              EXECUTIVE SUMMARY
            </div>
            <p className="text-sm sm:text-base text-[#81918a] leading-relaxed font-sans whitespace-pre-wrap">
              {profile.about}
            </p>
          </div>

          {/* Skill Specification Grid */}
          <div>
            <div className="font-mono text-xs text-[#53625b] uppercase tracking-wider mb-4 flex items-center justify-between border-b border-[#1e2624] pb-2">
              <span>TECHNICAL CAPABILITY MATRIX</span>
              <span>INDEX: SKILLS</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((category) => (
                <div
                  key={category.id}
                  className="bg-[#0c0f10] border border-[#1e2624] p-5 hover:border-[#2d3834] transition-colors"
                >
                  <div className="font-mono text-xs font-semibold text-[#e87a24] uppercase mb-3 flex items-center justify-between">
                    <span>{category.name}</span>
                    <span className="text-[#53625b] text-[10px]">
                      {category.skills.length} MODULES
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 bg-[#141a18] border border-[#1e2624] text-[#81918a]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CHRONOLOGICAL ENGINEERING LOG / EXPERIENCE */}
      <div className="mb-20">
        <div className="font-mono text-xs text-[#e87a24] uppercase tracking-widest mb-2 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#e87a24]" />
          02 // EXPERIENCE RECORD
        </div>
        <h3 className="text-2xl font-bold uppercase text-[#e5ece8] mb-8 border-b border-[#1e2624] pb-4">
          Professional Engagements & Roles
        </h3>

        <div className="space-y-6">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="bg-[#0c0f10] border border-[#1e2624] p-6 sm:p-8 hover:border-[#2d3834] transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-[#1e2624]">
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-[#e5ece8] uppercase tracking-wide">
                    {exp.role}
                  </h4>
                  <div className="font-mono text-xs text-[#e87a24] mt-0.5">
                    {exp.company}
                  </div>
                </div>
                <div className="font-mono text-xs text-[#81918a] bg-[#141a18] px-3 py-1 border border-[#1e2624] w-fit">
                  {exp.period}
                </div>
              </div>

              <ul className="space-y-2 font-mono text-xs text-[#81918a]">
                {exp.description.map((desc, dIdx) => (
                  <li key={dIdx} className="flex items-start gap-2.5">
                    <span className="text-[#e87a24] mt-0.5 select-none">›</span>
                    <span className="leading-relaxed font-sans">{desc}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* EDUCATION CREDENTIALS */}
      <div>
        <div className="font-mono text-xs text-[#e87a24] uppercase tracking-widest mb-2 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#e87a24]" />
          03 // ACADEMIC RECORD
        </div>
        <h3 className="text-2xl font-bold uppercase text-[#e5ece8] mb-8 border-b border-[#1e2624] pb-4">
          Education & Degree Credentials
        </h3>

        <div className="space-y-6">
          {education.map((edu, idx) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="bg-[#0c0f10] border border-[#1e2624] p-6 sm:p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-[#1e2624]">
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-[#e5ece8] uppercase tracking-wide">
                    {edu.degree}
                  </h4>
                  <div className="font-mono text-xs text-[#e87a24] mt-0.5">
                    {edu.institution}
                  </div>
                </div>
                <div className="font-mono text-xs text-[#81918a] bg-[#141a18] px-3 py-1 border border-[#1e2624] w-fit">
                  {edu.period}
                </div>
              </div>

              {edu.details && (
                <p className="font-mono text-xs text-[#81918a] leading-relaxed">
                  {edu.details}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
