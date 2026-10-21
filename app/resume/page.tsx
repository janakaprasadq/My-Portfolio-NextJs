import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ResumeClient from "@/components/ResumeClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Resume & Certifications",
  description:
    "View and download Janaka Prasad's professional resume (CV), technical skills, verified certifications, and career credentials.",
  openGraph: {
    title: "Resume & Verified Credentials | Janaka Prasad",
    description:
      "Explore Janaka Prasad's professional CV, verified certificates, and full-stack engineering qualifications.",
  },
};

export default async function ResumePage() {
  const [certificates, profile] = await Promise.all([
    prisma.certificate.findMany({
      orderBy: { issueDate: "desc" },
    }),
    prisma.profile.findFirst({ select: { cvUrl: true } }),
  ]);

  // Use cloud URL if uploaded, otherwise fall back to the static file in public/cv/
  const cvUrl = profile?.cvUrl ?? "/cv/janaka-prasad-cv-v2.pdf";

  return <ResumeClient certificates={certificates} cvUrl={cvUrl} />;
}
