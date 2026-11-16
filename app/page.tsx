import { prisma } from "@/lib/prisma";
import HomeClient from "@/components/HomeClient";
import { personalInfo } from "@/data";
import { Profile, Testimonial } from "@prisma/client";

export default async function HomePage() {
  let profile: Profile | null = null;
  let testimonials: Testimonial[] = [];

  try {
    const [dbProfile, dbTestimonials] = await Promise.all([
      prisma.profile.findFirst(),
      prisma.testimonial.findMany({
        orderBy: { createdAt: "desc" },
      }),
    ]);
    profile = dbProfile;
    testimonials = dbTestimonials;
  } catch (error) {
    console.error("Database unavailable, falling back to static data:", error);
  }

  // Graceful fallback to data.ts so the homepage always renders
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

  return <HomeClient profile={activeProfile} testimonials={testimonials} />;
}
