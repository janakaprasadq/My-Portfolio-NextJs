import { prisma } from "@/lib/prisma";
import EducationManager from "@/components/admin/EducationManager";

export default async function AdminEducationPage() {
  const education = await prisma.education.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Education History</h1>
        <p className="text-gray-400">Manage your academic qualifications.</p>
      </div>

      <EducationManager initialData={education} />
    </div>
  );
}
