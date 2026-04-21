"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Profile } from "@prisma/client";

export async function updateProfile(data: Omit<Profile, "id" | "updatedAt">) {
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
