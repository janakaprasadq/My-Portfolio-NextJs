import { Metadata } from "next";
import SectionTitle from "@/components/SectionTitle";
import { prisma } from "@/lib/prisma";
import ProjectsList from "@/components/ProjectsList";
import { projects as staticProjects } from "@/data";
import { Project } from "@prisma/client";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore full-stack web applications, SaaS platforms, and software engineering projects built by Janaka Prasad with Next.js, React, Node.js, and Supabase.",
  openGraph: {
    title: "Projects Portfolio | Janaka Prasad",
    description:
      "A showcase of real-world full-stack web applications, REST APIs, and system architectures built by Janaka Prasad.",
  },
};

export default async function ProjectsPage() {
  let projects: Project[] = [];

  try {
    projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (err) {
    console.error("Database unavailable in /projects, using static fallback:", err);
  }

  const activeProjects: Project[] = projects.length > 0 ? projects : staticProjects.map((p, i) => ({
    id: p.id || `proj-${i}`,
    title: p.title,
    category: p.category,
    description: p.description,
    longDescription: p.longDescription || null,
    techStack: p.techStack,
    imageUrl: p.imageUrl,
    gallery: p.gallery || [],
    features: p.features || [],
    liveDemoUrl: p.liveDemoUrl || null,
    githubUrl: p.githubUrl || null,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Archived Projects & Deployments"
          subtitle="ENGINEERING RECORD // CODEBASE SPECIFICATIONS // REPOSITORIES"
          badge="03 // PROJECTS"
        />

        <ProjectsList initialProjects={activeProjects} />
      </div>
    </div>
  );
}
