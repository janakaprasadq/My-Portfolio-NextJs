import { prisma } from "@/lib/prisma";
import ProjectDetailsClient from "@/components/ProjectDetailsClient";
import { notFound } from "next/navigation";

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
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

