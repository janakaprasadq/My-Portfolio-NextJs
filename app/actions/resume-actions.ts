"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Experience
export async function createExperience(data: any) {
  const exp = await prisma.experience.create({ data });
  revalidatePath("/resume");
  revalidatePath("/admin/experience");
  return exp;
}

export async function updateExperience(id: string, data: any) {
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
export async function createEducation(data: any) {
  const edu = await prisma.education.create({ data });
  revalidatePath("/resume");
  revalidatePath("/admin/education");
  return edu;
}

export async function updateEducation(id: string, data: any) {
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
export async function createSkillCategory(data: any) {
  const cat = await prisma.skillCategory.create({ data });
  revalidatePath("/resume");
  revalidatePath("/admin/skills");
  return cat;
}

export async function updateSkillCategory(id: string, data: any) {
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
