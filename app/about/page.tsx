import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import AboutClient from "@/components/AboutClient";
import { personalInfo, experiences as staticExperiences, education as staticEducation, skills as staticSkills } from "@/data";
import { Profile, Experience, Education, SkillCategory } from "@prisma/client";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Learn about Janaka Prasad's engineering journey, work experience, education, and technical skill set across front-end, back-end, and database technologies.",
  openGraph: {
    title: "About Janaka Prasad | Full Stack Software Engineer",
    description:
      "Explore Janaka Prasad's background, professional experience, education, and core software engineering stack.",
  },
};

export default async function AboutPage() {
  let profile: Profile | null = null;
  let experiences: Experience[] = [];
  let education: Education[] = [];
  let skills: SkillCategory[] = [];

  try {
    const [dbProfile, dbExperiences, dbEducation, dbSkills] = await Promise.all([
      prisma.profile.findFirst(),
      prisma.experience.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.education.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.skillCategory.findMany({ orderBy: { name: "asc" } }),
    ]);
    profile = dbProfile;
    experiences = dbExperiences;
    education = dbEducation;
    skills = dbSkills;
  } catch (err) {
    console.error("Database unavailable in /about, using static fallback:", err);
  }

  const activeProfile: Profile = profile || {
    id: "main",
    name: personalInfo.name,
    role: personalInfo.role,
    tagline: personalInfo.tagline,
    email: personalInfo.email,
    phone: personalInfo.phone,
    location: personalInfo.location,
    linkedin: personalInfo.linkedin,
    github: personalInfo.github,
    about: personalInfo.about,
    cvUrl: "/cv/janaka-prasad-cv-v2.pdf",
    updatedAt: new Date(),
  };

  const activeExperiences: Experience[] = experiences.length > 0 ? experiences : staticExperiences.map((exp, i) => ({
    id: exp.id || `exp-${i}`,
    role: exp.role,
    company: exp.company,
    period: exp.period,
    description: exp.description,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  const activeEducation: Education[] = education.length > 0 ? education : staticEducation.map((edu, i) => ({
    id: `edu-${i}`,
    degree: edu.degree,
    institution: edu.institution,
    period: edu.period,
    details: edu.details || null,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  const activeSkills: SkillCategory[] = skills.length > 0 ? skills : staticSkills.map((cat, i) => ({
    id: `cat-${i}`,
    name: cat.name,
    skills: cat.skills,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  return (
    <div className="min-h-screen">
      <AboutClient 
        profile={activeProfile} 
        experiences={activeExperiences} 
        education={activeEducation} 
        skills={activeSkills} 
      />
    </div>
  );
}
