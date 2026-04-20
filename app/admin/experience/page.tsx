import { prisma } from "@/lib/prisma";
import ExperienceManager from "@/components/admin/ExperienceManager";

export default async function AdminExperiencePage() {
  const experiences = await prisma.experience.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Work Experience</h1>
        <p className="text-gray-400">Manage your career history and responsibilities.</p>
      </div>

      <ExperienceManager initialData={experiences} />
    </div>
  );
}
