"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Certificate } from "@prisma/client";

export async function createCertificate(data: Omit<Certificate, "id" | "createdAt" | "updatedAt">) {
  const cert = await prisma.certificate.create({ data });
  revalidatePath("/resume");
  revalidatePath("/admin/certificates");
  return cert;
}

export async function updateCertificate(id: string, data: Partial<Certificate>) {
  const cert = await prisma.certificate.update({ where: { id }, data });
  revalidatePath("/resume");
  revalidatePath("/admin/certificates");
  return cert;
}

export async function deleteCertificate(id: string) {
  await prisma.certificate.delete({ where: { id } });
  revalidatePath("/resume");
  revalidatePath("/admin/certificates");
}
