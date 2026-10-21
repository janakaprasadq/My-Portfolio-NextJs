"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { assertAdminSession } from "@/lib/auth-guard";

export interface ProfileUpdateData {
  name: string;
  role: string;
  tagline: string;
  about: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
}

export async function updateProfile(data: ProfileUpdateData) {
  await assertAdminSession();

  const profile = await prisma.profile.upsert({
    where: { id: "main" },
    update: data,
    create: {
      id: "main",
      ...data,
    },
  });

  revalidatePath("/");
  revalidatePath("/resume");
  revalidatePath("/admin");

  return profile;
}
