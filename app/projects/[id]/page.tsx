import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ProjectDetailsClient from "@/components/ProjectDetailsClient";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id },
    select: {
      title: true,
      description: true,
      imageUrl: true,
      techStack: true,
    },
  });

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

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      featureList: true,
    },
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <ProjectDetailsClient project={project} />
    </div>
  );
}
