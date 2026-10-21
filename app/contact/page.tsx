import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ContactClient from "@/components/ContactClient";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Contact & Hire Me",
  description:
    "Get in touch with Janaka Prasad for full-stack engineering roles, freelance software development projects, consulting, or technical collaborations.",
  openGraph: {
    title: "Contact & Hire Janaka Prasad | Software Engineer",
    description:
      "Send a project inquiry, schedule a discussion, or reach out directly to Janaka Prasad.",
  },
};

export default async function ContactPage() {
  const profile = await prisma.profile.findFirst();

  if (!profile) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <ContactClient profile={profile} />
    </div>
  );
}
