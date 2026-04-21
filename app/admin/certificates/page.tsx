import { prisma } from "@/lib/prisma";
import CertificateManager from "@/components/admin/CertificateManager";

export default async function AdminCertificatesPage() {
  const certificates = await prisma.certificate.findMany({
    orderBy: {
      issueDate: "desc",
    },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Manage Certifications</h1>
        <p className="text-gray-400">Add and manage your professional certificates from Udemy, Coursera, etc.</p>
      </div>

      <CertificateManager initialData={certificates} />
    </div>
  );
}
