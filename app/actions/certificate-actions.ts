"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Certificate } from "@prisma/client";
import { assertAdminSession } from "@/lib/auth-guard";

export async function createCertificate(data: Omit<Certificate, "id" | "createdAt" | "updatedAt">) {
  await assertAdminSession();
  const cert = await prisma.certificate.create({ data });
  revalidatePath("/resume");
  revalidatePath("/admin/certificates");
  return cert;
}

export async function updateCertificate(id: string, data: Partial<Certificate>) {
  await assertAdminSession();
  const cert = await prisma.certificate.update({ where: { id }, data });
  revalidatePath("/resume");
  revalidatePath("/admin/certificates");
  return cert;
}

export async function deleteCertificate(id: string) {
  await assertAdminSession();
  await prisma.certificate.delete({ where: { id } });
  revalidatePath("/resume");
  revalidatePath("/admin/certificates");
}
