"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { assertAdminSession } from "@/lib/auth-guard";

export interface TestimonialInput {
  clientName: string;
  clientRole: string;
  company: string;
  content: string;
  rating?: number;
  avatarUrl?: string;
}

export async function createTestimonial(data: TestimonialInput) {
  await assertAdminSession();
  const item = await prisma.testimonial.create({
    data: {
      clientName: data.clientName,
      clientRole: data.clientRole,
      company: data.company,
      content: data.content,
      rating: data.rating || 5,
      avatarUrl: data.avatarUrl || null,
    },
  });
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  return item;
}

export async function updateTestimonial(id: string, data: TestimonialInput) {
  await assertAdminSession();
  const item = await prisma.testimonial.update({
    where: { id },
    data: {
      clientName: data.clientName,
      clientRole: data.clientRole,
      company: data.company,
      content: data.content,
      rating: data.rating || 5,
      avatarUrl: data.avatarUrl || null,
    },
  });
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  return item;
}

export async function deleteTestimonial(id: string) {
  await assertAdminSession();
  await prisma.testimonial.delete({
    where: { id },
  });
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  return { success: true };
}
