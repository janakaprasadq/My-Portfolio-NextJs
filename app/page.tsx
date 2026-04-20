import { prisma } from "@/lib/prisma";
import HomeClient from "@/components/HomeClient";
import { notFound } from "next/navigation";

export default async function HomePage() {
  const profile = await prisma.profile.findFirst();

  if (!profile) {
    // If no profile yet, we could show a fallback or redirect to setup
    // But since we seeded, it should exist.
    return notFound();
  }

  return <HomeClient profile={profile} />;
}
