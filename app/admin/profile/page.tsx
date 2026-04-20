import { prisma } from "@/lib/prisma";
import ProfileForm from "@/components/admin/ProfileForm";
import { notFound } from "next/navigation";

export default async function AdminProfilePage() {
  const profile = await prisma.profile.findFirst();

  if (!profile) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
        <p className="text-gray-400">Manage your personal information and social links.</p>
      </div>

      <ProfileForm initialData={profile} />
    </div>
  );
}
