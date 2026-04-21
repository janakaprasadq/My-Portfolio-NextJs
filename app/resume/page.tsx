import { prisma } from "@/lib/prisma";
import ResumeClient from "@/components/ResumeClient";

export default async function ResumePage() {
  const certificates = await prisma.certificate.findMany({
    orderBy: {
      issueDate: "desc",
    },
  });

  return <ResumeClient certificates={certificates} />;
}
