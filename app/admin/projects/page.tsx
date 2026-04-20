import { prisma } from "@/lib/prisma";
import ProjectTable from "@/components/admin/ProjectTable";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Manage Projects</h1>
        <p className="text-gray-400">Add, edit, or remove projects from your portfolio.</p>
      </div>

      <ProjectTable projects={projects} />
    </div>
  );
}
