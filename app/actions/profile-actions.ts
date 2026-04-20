"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateProfile(data: any) {
  const profile = await prisma.profile.upsert({
    where: { id: "main" },
    update: data,
    create: {
      id: "main",
      ...data
    },
  });
  
  revalidatePath("/");
  revalidatePath("/resume");
  revalidatePath("/admin");
  
  return profile;
}
