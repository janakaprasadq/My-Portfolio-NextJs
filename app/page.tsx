import { prisma } from "@/lib/prisma";
import HomeClient from "@/components/HomeClient";
import { notFound } from "next/navigation";

export default async function HomePage() {
  const [profile, testimonials] = await Promise.all([
    prisma.profile.findFirst(),
    prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    }),
  ]);

  if (!profile) {
    return notFound();
  }

  return <HomeClient profile={profile} testimonials={testimonials} />;
}
