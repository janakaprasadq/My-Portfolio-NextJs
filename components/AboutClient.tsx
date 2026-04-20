"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";
import { Calendar, MapPin, Briefcase, GraduationCap } from "lucide-react";
import { Experience, Education, SkillCategory, Profile } from "@prisma/client";

// ---------------- Roadmap Item ----------------
type ExperienceItem = {
  kind: "experience";
  role: string;
  company: string;
  period: string;
  description: string[];
};

type EducationItem = {
  kind: "education";
  degree: string;
  institution: string;
  period: string;
  details?: string | null;
};

type RoadmapItemType = ExperienceItem | EducationItem;

interface RoadmapItemProps {
  item: RoadmapItemType;
  index: number;
  total: number;
}

const RoadmapItem = ({ item, index, total }: RoadmapItemProps) => {
  const isEven = index % 2 === 0;
  const isLast = index === total - 1;

  return (
    <div
      className={`
      relative mb-8 md:mb-12 flex 
      ${isEven ? "md:flex-row-reverse" : "md:flex-row"}
      md:items-center md:justify-between
    `}
    >
      {/* Mobile timeline line */}
      <div className="md:hidden flex flex-col items-center mr-6 shrink-0 relative">
        <div
          className={`w-[2px] bg-gradient-to-b from-primary/50 to-secondary/50 absolute top-0 ${
            isLast ? "h-8" : "bottom-[-32px]"
          } left-1/2 -translate-x-1/2`}
        />
        <div className="relative z-10 mt-6 w-8 h-8 rounded-full bg-dark border-2 border-accent shadow-[0_0_15px_#4CC9F0] flex items-center justify-center">
          <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse shadow-[0_0_8px_white]" />
        </div>
      </div>

      <div className="hidden md:block md:w-5/12" />

      {/* Center node (Desktop) */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center w-8 h-8 rounded-full bg-dark border-2 border-accent shadow-[0_0_15px_#4CC9F0] z-20">
        <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse shadow-[0_0_8px_white]" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="w-full md:w-5/12 relative z-10"
      >
        <div
          className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-accent/50 to-transparent w-12 ${
            isEven ? "left-auto -right-12 rotate-180" : "right-auto -left-12"
          }`}
        />

        <div
          className={`relative p-1 rounded-xl bg-gradient-to-br from-white/10 to-transparent hover:from-accent/30 hover:to-primary/30 transition-all duration-300 group ${
            isEven ? "md:text-right" : "md:text-left"
          }`}
        >
          <div className="bg-dark/90 backdrop-blur-xl p-6 rounded-[10px] h-full border border-white/5 group-hover:border-accent/30 transition-colors shadow-lg">
            <div
              className={`flex flex-col mb-4 ${
                isEven ? "md:items-end" : "md:items-start"
              }`}
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-primary/20 text-accent border border-primary/30 mb-2">
                <Calendar size={12} className="mr-2" />
                {item.period}
              </span>

              <h3 className="text-xl font-bold text-white group-hover:text-secondary transition-colors">
                {item.kind === "experience" ? item.role : item.degree}
              </h3>

              <p className="text-lg text-gray-300 font-medium mt-1">
                {item.kind === "experience" ? item.company : item.institution}
              </p>
            </div>

            {item.kind === "experience" ? (
              <ul
                className={`list-none text-gray-400 text-sm space-y-3 ${
                  isEven ? "md:flex md:flex-col md:items-end" : ""
                }`}
              >
                {item.description.map((desc: string, i: number) => (
                  <li
                    key={i}
                    className={`relative pl-5 ${isEven ? "md:pl-0 md:pr-5" : ""}`}
                  >
                    <span
                      className={`absolute top-2 left-0 w-1.5 h-1.5 bg-secondary rounded-full shadow-[0_0_5px_#F72585] ${
                        isEven ? "md:left-auto md:right-0" : ""
                      }`}
                    />
                    {desc}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-wrap">
                {item.details}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ---------------- About Client Component ----------------

interface AboutClientProps {
  profile: Profile;
  experiences: Experience[];
  education: Education[];
  skills: SkillCategory[];
}

export default function AboutClient({ profile, experiences, education, skills }: AboutClientProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle
        title="About Me"
        subtitle="My journey, education, and technical expertise"
      />

      {/* Profile + Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
        {/* Left: Profile */}
        <div className="lg:col-span-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="sticky top-24 max-w-md mx-auto lg:max-w-none lg:mx-0"
          >
            <div className="aspect-square rounded-2xl overflow-hidden border-2 border-accent/20 relative group shadow-[0_0_30px_rgba(58,12,163,0.3)]">
              <Image
                src="/images/profile.png"
                alt={profile.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-dark to-transparent">
                <h3 className="text-2xl font-bold text-white mb-1">{profile.name}</h3>
                <p className="text-accent font-medium">{profile.role}</p>
              </div>
            </div>

            {/* Contact */}
            <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md">
              <div className="space-y-4 text-gray-300 text-sm">
                <div className="flex items-center p-3 rounded-lg bg-white/5">
                  <MapPin size={18} className="mr-3 text-secondary" />
                  {profile.location}
                </div>
                <div className="flex items-center p-3 rounded-lg bg-white/5">
                  <Briefcase size={18} className="mr-3 text-electric" />
                  Open to Opportunities
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: Bio + Skills */}
        <div className="lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-12 backdrop-blur-sm relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full" />
            <p className="text-lg text-gray-300 leading-relaxed relative z-10 whitespace-pre-wrap">
              {profile.about}
            </p>
          </motion.div>

          {/* Skills */}
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
            <span className="w-1.5 h-8 bg-gradient-to-b from-secondary to-electric rounded-full mr-4"></span>
            Technical Arsenal
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {skills.map((category, idx) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#0F0518] border border-white/5 p-5 rounded-xl hover:bg-[#150824] hover:border-primary/40 transition-all duration-300"
              >
                <h4 className="text-lg font-bold text-white mb-4">
                  {category.name}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white/5 text-gray-300 border border-white/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Experience Roadmap */}
      <div className="mb-16 relative">
        <div className="flex items-center justify-center mb-12">
          <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-accent mr-4"></div>
          <h3 className="text-3xl font-bold text-white flex items-center">
            <Briefcase className="mr-3 text-accent" size={32} /> Experience Roadmap
          </h3>
          <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-accent ml-4"></div>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-secondary to-accent -translate-x-1/2 rounded-full opacity-50" />

          <div className="space-y-4">
            {experiences.map((exp, idx) => (
              <RoadmapItem
                key={exp.id}
                item={{ ...exp, kind: "experience" }}
                index={idx}
                total={experiences.length}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="mb-12 relative">
        <div className="flex items-center justify-center mb-12">
          <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-secondary mr-4"></div>
          <h3 className="text-3xl font-bold text-white flex items-center">
            <GraduationCap className="mr-3 text-secondary" size={32} /> Education Journey
          </h3>
          <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-secondary ml-4"></div>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-secondary via-electric to-primary -translate-x-1/2 rounded-full opacity-50" />

          <div className="space-y-4">
            {education.map((edu, idx) => (
              <RoadmapItem
                key={edu.id}
                item={{ ...edu, kind: "education" }}
                index={idx}
                total={education.length}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
