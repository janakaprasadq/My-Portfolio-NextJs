"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Experience, Education, SkillCategory } from "@prisma/client";

// Experience
export async function createExperience(data: Omit<Experience, "id" | "createdAt" | "updatedAt">) {
  const exp = await prisma.experience.create({ data });
  revalidatePath("/resume");
  revalidatePath("/admin/experience");
  return exp;
}

export async function updateExperience(id: string, data: Partial<Experience>) {
  const exp = await prisma.experience.update({ where: { id }, data });
  revalidatePath("/resume");
  revalidatePath("/admin/experience");
  return exp;
}

export async function deleteExperience(id: string) {
  await prisma.experience.delete({ where: { id } });
  revalidatePath("/resume");
  revalidatePath("/admin/experience");
}

// Education
export async function createEducation(data: Omit<Education, "id" | "createdAt" | "updatedAt">) {
  const edu = await prisma.education.create({ data });
  revalidatePath("/resume");
  revalidatePath("/admin/education");
  return edu;
}

export async function updateEducation(id: string, data: Partial<Education>) {
  const edu = await prisma.education.update({ where: { id }, data });
  revalidatePath("/resume");
  revalidatePath("/admin/education");
  return edu;
}

export async function deleteEducation(id: string) {
  await prisma.education.delete({ where: { id } });
  revalidatePath("/resume");
  revalidatePath("/admin/education");
}

// Skills
export async function createSkillCategory(data: Omit<SkillCategory, "id" | "createdAt" | "updatedAt">) {
  const cat = await prisma.skillCategory.create({ data });
  revalidatePath("/resume");
  revalidatePath("/admin/skills");
  return cat;
}

export async function updateSkillCategory(id: string, data: Partial<SkillCategory>) {
  const cat = await prisma.skillCategory.update({ where: { id }, data });
  revalidatePath("/resume");
  revalidatePath("/admin/skills");
  return cat;
}

export async function deleteSkillCategory(id: string) {
  await prisma.skillCategory.delete({ where: { id } });
  revalidatePath("/resume");
  revalidatePath("/admin/skills");
}
