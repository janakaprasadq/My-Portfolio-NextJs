import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ResumeClient from "@/components/ResumeClient";
import { Certificate } from "@prisma/client";

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
  let certificates: Certificate[] = [];
  let cvUrl = "/cv/janaka-prasad-cv-v2.pdf";

  try {
    const [dbCerts, profile] = await Promise.all([
      prisma.certificate.findMany({
        orderBy: { issueDate: "desc" },
      }),
      prisma.profile.findFirst({ select: { cvUrl: true } }),
    ]);
    certificates = dbCerts;
    if (profile?.cvUrl) cvUrl = profile.cvUrl;
  } catch (err) {
    console.error("Database unavailable in /resume, using fallback:", err);
  }

  return <ResumeClient certificates={certificates} cvUrl={cvUrl} />;
}
