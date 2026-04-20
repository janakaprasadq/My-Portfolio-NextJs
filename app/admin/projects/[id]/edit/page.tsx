import { prisma } from "@/lib/prisma";
import ProjectForm from "@/components/admin/ProjectForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default async function EditProjectPage({
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
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <Link 
          href="/admin/projects"
          className="p-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-white transition-all"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Edit Project</h1>
          <p className="text-gray-400">Modify the details of {project.title}.</p>
        </div>
      </div>

      <ProjectForm initialData={project} />
    </div>
  );
}
