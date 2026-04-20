import { prisma } from "@/lib/prisma";
import AboutClient from "@/components/AboutClient";
import { notFound } from "next/navigation";

export default async function AboutPage() {
  const profile = await prisma.profile.findFirst();
  const experiences = await prisma.experience.findMany({
    orderBy: { createdAt: "desc" },
  });
  const education = await prisma.education.findMany({
    orderBy: { createdAt: "desc" },
  });
  const skills = await prisma.skillCategory.findMany({
    orderBy: { name: "asc" },
  });

  if (!profile) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-24 pb-12 overflow-hidden">
      <AboutClient 
        profile={profile} 
        experiences={experiences} 
        education={education} 
        skills={skills} 
      />
    </div>
  );
}
