import { prisma } from "@/lib/prisma";
import TestimonialManager from "@/components/admin/TestimonialManager";
import { Testimonial } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  let testimonials: Testimonial[] = [];

  try {
    testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to load testimonials:", error);
  }

  return <TestimonialManager initialData={testimonials} />;
}
