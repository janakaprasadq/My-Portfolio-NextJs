"use server";

import { supabase } from "@/lib/supabase";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { assertAdminSession } from "@/lib/auth-guard";
import crypto from "crypto";

const BUCKET = "portfolio";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const ALLOWED_IMAGE_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp"]);

/**
 * Upload a CV/Resume PDF to Supabase Storage and save the public URL to the Profile.
 * Verifies admin session, enforces 5MB limit, and checks PDF magic bytes.
 */
export async function uploadCV(formData: FormData) {
  await assertAdminSession();

  const file = formData.get("file") as File;

  if (!file || !(file instanceof File)) {
    throw new Error("No file provided.");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File size must be under 5 MB.");
  }

  // Verify PDF magic bytes (%PDF-)
  const headerBuffer = await file.slice(0, 5).arrayBuffer();
  const headerBytes = new Uint8Array(headerBuffer);
  const isPdf =
    headerBytes[0] === 0x25 && // %
    headerBytes[1] === 0x50 && // P
    headerBytes[2] === 0x44 && // D
    headerBytes[3] === 0x46 && // F
    headerBytes[4] === 0x2d;   // -

  if (!isPdf) {
    throw new Error("Invalid file content: Not a valid PDF document.");
  }

  // Remove old CV from storage if one exists
  const profile = await prisma.profile.findFirst({ select: { cvUrl: true } });
  if (profile?.cvUrl) {
    const pathMatch = profile.cvUrl.match(/\/storage\/v1\/object\/public\/portfolio\/(.+)/);
    if (pathMatch?.[1]) {
      await supabase.storage.from(BUCKET).remove([pathMatch[1]]);
    }
  }

  // Upload new PDF
  const timestamp = Date.now();
  const filePath = `cv/resume_${timestamp}.pdf`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(filePath, file, { contentType: "application/pdf", upsert: true });

  if (uploadError) throw new Error(uploadError.message);

  const { data: { publicUrl } } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(filePath);

  // Persist the URL in the Profile row
  await prisma.profile.update({
    where: { id: "main" },
    data: { cvUrl: publicUrl },
  });

  revalidatePath("/resume");
  revalidatePath("/admin/profile");

  return { url: publicUrl };
}

/**
 * Upload an image to Supabase Storage with strict MIME, extension, and size checks.
 */
export async function uploadImage(formData: FormData) {
  await assertAdminSession();

  const file = formData.get("file") as File;

  if (!file || !(file instanceof File)) {
    throw new Error("No valid file uploaded.");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File exceeds maximum allowed size of 5 MB.");
  }

  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    throw new Error("Invalid file type. Only JPEG, PNG, and WebP images are allowed.");
  }

  const rawExt = file.name.split(".").pop()?.toLowerCase() || "";
  if (!ALLOWED_IMAGE_EXTENSIONS.has(rawExt)) {
    throw new Error("Invalid file extension.");
  }

  const safeFileName = `${crypto.randomUUID()}.${rawExt}`;
  const filePath = `uploads/${safeFileName}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filePath, file, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data: { publicUrl } } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(filePath);

  return { url: publicUrl, path: filePath };
}

/**
 * Safely delete an uploaded file from Supabase Storage.
 * Strictly prevents path traversal and restricts deletion to uploads/ folder.
 */
export async function deleteImage(path: string) {
  await assertAdminSession();

  if (!path || typeof path !== "string" || path.includes("..")) {
    throw new Error("Invalid path specified.");
  }

  // Restrict deletion to files within the designated uploads folder
  if (!path.startsWith("uploads/")) {
    throw new Error("Deletion target must be within uploads directory.");
  }

  const { error } = await supabase.storage
    .from(BUCKET)
    .remove([path]);

  if (error) {
    throw new Error(error.message);
  }

  return { success: true };
}
