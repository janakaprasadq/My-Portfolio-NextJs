"use client";

import { Profile } from "@prisma/client";
import { useState } from "react";
import { updateProfile } from "@/app/actions/profile-actions";
import { Save } from "lucide-react";

export default function ProfileForm({ initialData }: { initialData: Profile }) {
  const [loading, setLoading] = useState(false);
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
    try {
      await updateProfile(formData);
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Identity */}
        <div className="bg-[#0A0118] border border-white/10 p-6 rounded-2xl space-y-4">
          <h3 className="text-lg font-bold text-white mb-4">Identity</h3>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Display Name</label>
            <input
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary/50"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Role Title</label>
            <input
              value={formData.role}
              onChange={e => setFormData({...formData, role: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary/50"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Tagline</label>
            <textarea
              value={formData.tagline}
              onChange={e => setFormData({...formData, tagline: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary/50"
              rows={2}
            />
          </div>
        </div>

        {/* Contact Links */}
        <div className="bg-[#0A0118] border border-white/10 p-6 rounded-2xl space-y-4">
          <h3 className="text-lg font-bold text-white mb-4">Social & Contact</h3>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Email</label>
            <input
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">GitHub URL</label>
            <input
              value={formData.github}
              onChange={e => setFormData({...formData, github: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">LinkedIn URL</label>
            <input
              value={formData.linkedin}
              onChange={e => setFormData({...formData, linkedin: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none"
            />
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-[#0A0118] border border-white/10 p-6 rounded-2xl space-y-4">
        <h3 className="text-lg font-bold text-white mb-4">About Section</h3>
        <textarea
          value={formData.about}
          onChange={e => setFormData({...formData, about: e.target.value})}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary/50"
          rows={6}
        />
      </div>

      <div className="flex justify-end">
        <button
          disabled={loading}
          type="submit"
          className="flex items-center space-x-2 px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Save size={20} />
              <span>Update Profile</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
