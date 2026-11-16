import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ContactClient from "@/components/ContactClient";
import { personalInfo } from "@/data";
import { Profile } from "@prisma/client";

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
  let profile: Profile | null = null;

  try {
    profile = await prisma.profile.findFirst();
  } catch (err) {
    console.error("Database unavailable in /contact, using static fallback:", err);
  }

  const activeProfile: Profile = profile || {
    id: "main",
    name: personalInfo.name,
    role: personalInfo.role,
    tagline: personalInfo.tagline,
    email: personalInfo.email,
    phone: personalInfo.phone,
    location: personalInfo.location,
    linkedin: personalInfo.linkedin,
    github: personalInfo.github,
    about: personalInfo.about,
    cvUrl: "/cv/janaka-prasad-cv-v2.pdf",
    updatedAt: new Date(),
  };

  return (
    <div className="min-h-screen">
      <ContactClient profile={activeProfile} />
    </div>
  );
}
