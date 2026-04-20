"use client";

import { useState } from "react";
import { uploadImage, deleteImage } from "@/app/actions/storage-actions";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
  bucket?: string;
}

export default function ImageUpload({ value, onChange, label, bucket = "portfolio" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("bucket", bucket);

      const result = await uploadImage(formData);
      onChange(result.url);
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed. Make sure you've created the 'portfolio' bucket in Supabase and set it to public.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async () => {
    // If it's a Supabase URL, we could try to delete it from storage
    // For now, just clear the field
    onChange("");
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm text-gray-400">{label}</label>
      
      <div className="relative group aspect-video rounded-xl border-2 border-dashed border-white/10 hover:border-primary/40 bg-white/5 transition-all overflow-hidden">
        {value ? (
          <>
            <Image
              src={value}
              alt="Preview"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
              <button
                type="button"
                onClick={handleRemove}
                className="p-2 bg-red-500 text-white rounded-full hover:scale-110 transition-transform"
              >
                <X size={20} />
              </button>
            </div>
          </>
        ) : (
          <label className="absolute inset-0 cursor-pointer flex flex-col items-center justify-center text-gray-500 hover:text-gray-300 transition-colors">
            {uploading ? (
              <Loader2 className="animate-spin mb-2" size={32} />
            ) : (
              <>
                <Upload className="mb-2" size={32} />
                <span className="text-xs font-medium">Click to upload</span>
              </>
            )}
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>
        )}
      </div>
    </div>
  );
}
