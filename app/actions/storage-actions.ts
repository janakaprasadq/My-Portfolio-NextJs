"use server";

import { supabase } from "@/lib/supabase";

export async function uploadImage(formData: FormData) {
  const file = formData.get("file") as File;
  const bucket = formData.get("bucket") as string || "portfolio";

  if (!file) {
    throw new Error("No file uploaded");
  }

  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
  const filePath = `uploads/${fileName}`;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (error) {
    throw new Error(error.message);
  }

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return { url: publicUrl, path: filePath };
}

export async function deleteImage(path: string, bucket: string = "portfolio") {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([path]);

  if (error) {
    throw new Error(error.message);
  }

  return { success: true };
}
