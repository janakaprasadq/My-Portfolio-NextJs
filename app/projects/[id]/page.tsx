import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ProjectDetailsClient from "@/components/ProjectDetailsClient";
import { notFound } from "next/navigation";
import { projects as staticProjects } from "@/data";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  let project: { title: string; description: string; imageUrl: string; techStack: string[] } | null = null;

  try {
    project = await prisma.project.findUnique({
      where: { id },
      select: {
        title: true,
        description: true,
        imageUrl: true,
        techStack: true,
      },
    });
  } catch {
    const staticP = staticProjects.find((p) => p.id === id);
    if (staticP) {
      project = {
        title: staticP.title,
        description: staticP.description,
        imageUrl: staticP.imageUrl,
        techStack: staticP.techStack,
      };
    }
  }

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.description,
    keywords: [...project.techStack, "Janaka Prasad", "Portfolio Project", "Web Development"],
    openGraph: {
      title: `${project.title} | Janaka Prasad`,
      description: project.description,
      images: [
        {
          url: project.imageUrl,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Janaka Prasad`,
      description: project.description,
      images: [project.imageUrl],
    },
  };
}

type ProjectWithFeatures = {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string | null;
  techStack: string[];
  imageUrl: string;
  gallery: string[];
  features: string[];
  featureList: { label: string; description: string | null }[];
  liveDemoUrl: string | null;
  githubUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let project: ProjectWithFeatures | null = null;

  try {
    project = await prisma.project.findUnique({
      where: { id },
      include: {
        featureList: true,
      },
    });
  } catch (err) {
    console.error("Database unavailable in /projects/[id], checking static fallback:", err);
  }

  if (!project) {
    const staticP = staticProjects.find((p) => p.id === id);
    if (staticP) {
      project = {
        id: staticP.id,
        title: staticP.title,
        category: staticP.category,
        description: staticP.description,
        longDescription: staticP.longDescription || null,
        techStack: staticP.techStack,
        imageUrl: staticP.imageUrl,
        gallery: staticP.gallery || [],
        features: staticP.features || [],
        featureList: (staticP.features || []).map((f) => ({ label: f, description: null })),
        liveDemoUrl: staticP.liveDemoUrl || null,
        githubUrl: staticP.githubUrl || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
  }

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <ProjectDetailsClient project={project} />
    </div>
  );
}
