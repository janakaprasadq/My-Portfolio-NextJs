import { Metadata } from "next";
import SectionTitle from "@/components/SectionTitle";
import { prisma } from "@/lib/prisma";
import ProjectsList from "@/components/ProjectsList";

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
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="My Projects"
          subtitle="A selection of my recent work and experiments"
        />

        <ProjectsList initialProjects={projects} />
      </div>
    </div>
  );
}
