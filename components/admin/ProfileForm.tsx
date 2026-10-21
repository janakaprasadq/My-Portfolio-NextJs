"use client";

import { Profile } from "@prisma/client";
import { useRef, useState } from "react";
import { updateProfile } from "@/app/actions/profile-actions";
import { uploadCV } from "@/app/actions/storage-actions";
import { Save, FileText, Upload, CheckCircle2, AlertCircle, Loader2, ExternalLink } from "lucide-react";

export default function ProfileForm({ initialData }: { initialData: Profile }) {
  const [loading, setLoading] = useState(false);
  const [cvLoading, setCvLoading] = useState(false);
  const [profileStatus, setProfileStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [cvStatus, setCvStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [cvUrl, setCvUrl] = useState<string | null>(initialData.cvUrl ?? null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: initialData.name,
    role: initialData.role,
    tagline: initialData.tagline,
    about: initialData.about,
    email: initialData.email,
    phone: initialData.phone,
    location: initialData.location,
    linkedin: initialData.linkedin,
    github: initialData.github,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setProfileStatus(null);
    try {
      await updateProfile(formData);
      setProfileStatus({ type: "success", message: "Profile updated successfully!" });
    } catch {
      setProfileStatus({ type: "error", message: "Failed to update profile. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleCvUpload = async (file: File) => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      setCvStatus({ type: "error", message: "Please upload a PDF file only." });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setCvStatus({ type: "error", message: "File size must be under 5 MB." });
      return;
    }

    setCvLoading(true);
    setCvStatus(null);

    try {
      const fd = new FormData();
      fd.append("file", file);
      const result = await uploadCV(fd);
      setCvUrl(result.url);
      setCvStatus({ type: "success", message: "CV uploaded successfully! Your resume page now uses this file." });
    } catch (err) {
      setCvStatus({
        type: "error",
        message: err instanceof Error ? err.message : "Upload failed. Please try again.",
      });
    } finally {
      setCvLoading(false);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleCvUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleCvUpload(file);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* ── CV Upload Card ── */}
      <div className="bg-[#0A0118] border border-white/10 p-6 rounded-2xl space-y-4">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-primary/20 rounded-lg text-primary">
            <FileText size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Resume / CV</h3>
            <p className="text-xs text-gray-400">
              Upload your latest PDF — it instantly updates the live resume page without any redeployment.
            </p>
          </div>
        </div>

        {/* Status banner */}
        {cvStatus && (
          <div
            className={`flex items-start space-x-3 p-3 rounded-xl border text-sm ${
              cvStatus.type === "success"
                ? "bg-green-500/10 border-green-500/30 text-green-300"
                : "bg-red-500/10 border-red-500/30 text-red-300"
            }`}
          >
            {cvStatus.type === "success" ? (
              <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-green-400" />
            ) : (
              <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-400" />
            )}
            <span>{cvStatus.message}</span>
          </div>
        )}

        {/* Current CV pill */}
        {cvUrl && (
          <div className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl text-sm">
            <div className="flex items-center space-x-2 min-w-0">
              <FileText size={16} className="text-primary shrink-0" />
              <span className="text-gray-200 font-medium truncate">Current CV (Supabase Cloud)</span>
            </div>
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-xs text-accent hover:text-accent/80 transition-colors shrink-0 ml-3"
            >
              <ExternalLink size={13} />
              <span>Preview</span>
            </a>
          </div>
        )}

        {/* Drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
            dragOver
              ? "border-primary bg-primary/10 scale-[1.01]"
              : "border-white/10 hover:border-primary/50 hover:bg-white/[0.03]"
          }`}
        >
          {cvLoading ? (
            <Loader2 size={32} className="text-primary animate-spin" />
          ) : (
            <Upload size={32} className={dragOver ? "text-primary" : "text-gray-500"} />
          )}

          <div className="text-center">
            {cvLoading ? (
              <p className="text-sm text-gray-300 font-medium">Uploading to Supabase...</p>
            ) : (
              <>
                <p className="text-sm font-semibold text-white">
                  {cvUrl ? "Replace CV" : "Upload CV"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Drag & drop or click to browse — PDF only, max 5 MB
                </p>
              </>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            className="hidden"
            onChange={handleFileInput}
            disabled={cvLoading}
          />
        </div>

        {!cvUrl && (
          <p className="text-xs text-gray-500 text-center">
            No cloud CV uploaded yet. The site currently serves the static file from{" "}
            <code className="text-gray-400">public/cv/</code>.
          </p>
        )}
      </div>

      {/* ── Profile Info Form ── */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Status banner */}
        {profileStatus && (
          <div
            className={`flex items-start space-x-3 p-3 rounded-xl border text-sm ${
              profileStatus.type === "success"
                ? "bg-green-500/10 border-green-500/30 text-green-300"
                : "bg-red-500/10 border-red-500/30 text-red-300"
            }`}
          >
            {profileStatus.type === "success" ? (
              <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-green-400" />
            ) : (
              <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-400" />
            )}
            <span>{profileStatus.message}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Identity */}
          <div className="bg-[#0A0118] border border-white/10 p-6 rounded-2xl space-y-4">
            <h3 className="text-lg font-bold text-white mb-4">Identity</h3>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Display Name</label>
              <input
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary/50 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Role Title</label>
              <input
                value={formData.role}
                onChange={e => setFormData({ ...formData, role: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary/50 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Tagline</label>
              <textarea
                value={formData.tagline}
                onChange={e => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary/50 text-white"
                rows={2}
              />
            </div>
          </div>

          {/* Social & Contact */}
          <div className="bg-[#0A0118] border border-white/10 p-6 rounded-2xl space-y-4">
            <h3 className="text-lg font-bold text-white mb-4">Social & Contact</h3>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Email</label>
              <input
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Phone</label>
              <input
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Location</label>
              <input
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">GitHub URL</label>
              <input
                value={formData.github}
                onChange={e => setFormData({ ...formData, github: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">LinkedIn URL</label>
              <input
                value={formData.linkedin}
                onChange={e => setFormData({ ...formData, linkedin: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none text-white"
              />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-[#0A0118] border border-white/10 p-6 rounded-2xl space-y-4">
          <h3 className="text-lg font-bold text-white mb-4">About Section</h3>
          <textarea
            value={formData.about}
            onChange={e => setFormData({ ...formData, about: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary/50 text-white"
            rows={6}
          />
        </div>

        <div className="flex justify-end">
          <button
            disabled={loading}
            type="submit"
            className="flex items-center space-x-2 px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary/20 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <>
                <Save size={20} />
                <span>Update Profile</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
