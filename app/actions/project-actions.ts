"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Project } from "@prisma/client";

export async function createProject(data: any) {
  const { features, ...projectData } = data;
  
  const project = await prisma.project.create({
    data: {
      ...projectData,
      featureList: {
        create: features.map((f: any) => ({
          label: f.label,
          description: f.description,
        })),
      },
    },
  });
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  return project;
}

export async function updateProject(id: string, data: any) {
  const { features, ...projectData } = data;

  const project = await prisma.project.update({
    where: { id },
    data: {
      ...projectData,
      featureList: {
        deleteMany: {},
        create: features.map((f: any) => ({
          label: f.label,
          description: f.description,
        })),
      },
    },
  });
  revalidatePath("/projects");
  revalidatePath(`/projects/${id}`);
  revalidatePath("/admin/projects");
  return project;
}

export async function deleteProject(id: string) {
  await prisma.project.delete({
    where: { id },
  });
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
}
