"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Experience, Education, SkillCategory } from "@prisma/client";
import { assertAdminSession } from "@/lib/auth-guard";

// Experience
export async function createExperience(data: Omit<Experience, "id" | "createdAt" | "updatedAt">) {
  await assertAdminSession();
  const exp = await prisma.experience.create({ data });
  revalidatePath("/resume");
  revalidatePath("/admin/experience");
  return exp;
}

export async function updateExperience(id: string, data: Partial<Experience>) {
  await assertAdminSession();
  const exp = await prisma.experience.update({ where: { id }, data });
  revalidatePath("/resume");
  revalidatePath("/admin/experience");
  return exp;
}

export async function deleteExperience(id: string) {
  await assertAdminSession();
  await prisma.experience.delete({ where: { id } });
  revalidatePath("/resume");
  revalidatePath("/admin/experience");
}

// Education
export async function createEducation(data: Omit<Education, "id" | "createdAt" | "updatedAt">) {
  await assertAdminSession();
  const edu = await prisma.education.create({ data });
  revalidatePath("/resume");
  revalidatePath("/admin/education");
  return edu;
}

export async function updateEducation(id: string, data: Partial<Education>) {
  await assertAdminSession();
  const edu = await prisma.education.update({ where: { id }, data });
  revalidatePath("/resume");
  revalidatePath("/admin/education");
  return edu;
}

export async function deleteEducation(id: string) {
  await assertAdminSession();
  await prisma.education.delete({ where: { id } });
  revalidatePath("/resume");
  revalidatePath("/admin/education");
}

// Skills
export async function createSkillCategory(data: Omit<SkillCategory, "id" | "createdAt" | "updatedAt">) {
  await assertAdminSession();
  const cat = await prisma.skillCategory.create({ data });
  revalidatePath("/resume");
  revalidatePath("/admin/skills");
  return cat;
}

export async function updateSkillCategory(id: string, data: Partial<SkillCategory>) {
  await assertAdminSession();
  const cat = await prisma.skillCategory.update({ where: { id }, data });
  revalidatePath("/resume");
  revalidatePath("/admin/skills");
  return cat;
}

export async function deleteSkillCategory(id: string) {
  await assertAdminSession();
  await prisma.skillCategory.delete({ where: { id } });
  revalidatePath("/resume");
  revalidatePath("/admin/skills");
}
