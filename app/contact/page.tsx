import { prisma } from "@/lib/prisma";
import ContactClient from "@/components/ContactClient";
import { notFound } from "next/navigation";

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
