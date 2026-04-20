import { prisma } from "@/lib/prisma";
import SkillsManager from "@/components/admin/SkillsManager";

export default async function AdminSkillsPage() {
  const skillCategories = await prisma.skillCategory.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Technical Skills</h1>
        <p className="text-gray-400">Manage your tech stack and categorise your skills.</p>
      </div>

      <SkillsManager initialData={skillCategories} />
    </div>
  );
}
