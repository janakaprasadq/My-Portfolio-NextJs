"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Project } from "@prisma/client";
import { createProject, updateProject } from "@/app/actions/project-actions";
import { Save, X, Plus, Trash2 } from "lucide-react";
import ImageUpload from "./ImageUpload";

interface ProjectFormProps {
  initialData?: Project;
}

interface Feature {
  label: string;
  description: string;
}

interface ProjectWithFeatures extends Project {
  featureList: { label: string; description: string | null }[];
}

export default function ProjectForm({ initialData }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    category: initialData?.category || "Full Stack",
    description: initialData?.description || "",
    longDescription: initialData?.longDescription || "",
    imageUrl: initialData?.imageUrl || "",
    liveDemoUrl: initialData?.liveDemoUrl || "",
    githubUrl: initialData?.githubUrl || "",
    techStack: initialData?.techStack || [],
    gallery: initialData?.gallery || [],
    features: (((initialData as unknown) as ProjectWithFeatures)?.featureList || []).map((f: { label: string; description?: string | null }) => ({
      label: f.label,
      description: f.description || "",
    })) || [],
  });

  const categories = ["Full Stack", "Frontend", "Backend", "Mobile", "UI/UX", "Desktop"];

  const handleListChange = (field: "techStack" | "gallery" | "features", index: number, value: string) => {
    const newList = [...formData[field]];
    newList[index] = value;
    setFormData({ ...formData, [field]: newList });
  };

  const addListItem = (field: "techStack" | "gallery" | "features") => {
    const newValue = field === "features" ? { label: "", description: "" } : "";
    setFormData({ ...formData, [field]: [...formData[field], newValue as unknown as string] });
  };

  const removeListItem = (field: "techStack" | "gallery" | "features", index: number) => {
    const newList = [...formData[field]];
    newList.splice(index, 1);
    setFormData({ ...formData, [field]: newList });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (initialData) {
        await updateProject(initialData.id, formData);
      } else {
        await createProject(formData);
      }
      router.push("/admin/projects");
      router.refresh();
    } catch {
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0A0118] border border-white/10 p-6 rounded-2xl space-y-4">
            <h3 className="text-lg font-bold text-white mb-4">Basic Information</h3>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Project Title</label>
              <input
                required
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:border-primary/50"
                placeholder="e.g. Portfolio Website"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:border-primary/50"
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Short Description</label>
              <input
                required
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:border-primary/50"
                placeholder="A brief overview..."
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Long Description</label>
              <textarea
                rows={5}
                value={formData.longDescription || ""}
                onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:border-primary/50"
                placeholder="Detailed project explanation..."
              />
            </div>
          </div>

          {/* Features */}
          <div className="bg-[#0A0118] border border-white/10 p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Project Features</h3>
              <button 
                type="button" 
                onClick={() => addListItem("features")}
                className="text-primary hover:text-primary/80 flex items-center text-sm font-bold"
              >
                <Plus size={16} className="mr-1" /> Add Feature
              </button>
            </div>
            
            <div className="space-y-4">
              {formData.features.map((feature: Feature, idx: number) => (
                <div key={idx} className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-3 relative group">
                  <button 
                    type="button" 
                    onClick={() => removeListItem("features", idx)}
                    className="absolute top-4 right-4 p-1 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={18} />
                  </button>

                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Feature Title</label>
                    <input
                      type="text"
                      value={feature.label}
                      onChange={(e) => {
                        const newFeatures = [...formData.features];
                        newFeatures[idx] = { ...newFeatures[idx], label: e.target.value };
                        setFormData({ ...formData, features: newFeatures });
                      }}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 outline-none focus:border-primary/50 text-sm"
                      placeholder="e.g. Real-time Chat"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Description (Click to Expand)</label>
                    <textarea
                      rows={2}
                      value={feature.description}
                      onChange={(e) => {
                        const newFeatures = [...formData.features];
                        newFeatures[idx] = { ...newFeatures[idx], description: e.target.value };
                        setFormData({ ...formData, features: newFeatures });
                      }}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 outline-none focus:border-primary/50 text-sm"
                      placeholder="Explain how it works..."
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Components */}
        <div className="space-y-6">
          {/* Media Links */}
          <div className="bg-[#0A0118] border border-white/10 p-6 rounded-2xl space-y-4">
            <h3 className="text-lg font-bold text-white mb-2">Media & Assets</h3>
            
            <ImageUpload
              label="Project Thumbnail"
              value={formData.imageUrl}
              onChange={(url) => setFormData({ ...formData, imageUrl: url })}
            />

            <div className="pt-4 border-t border-white/5">
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm text-gray-400">Project Gallery</label>
                <button 
                  type="button" 
                  onClick={() => addListItem("gallery")} 
                  className="text-xs text-primary font-bold hover:underline flex items-center"
                >
                  <Plus size={14} className="mr-1" /> Add Image
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {formData.gallery.map((url, idx) => (
                  <div key={idx} className="relative">
                    <ImageUpload
                      label={`Image ${idx + 1}`}
                      value={url}
                      onChange={(newUrl) => handleListChange("gallery", idx, newUrl)}
                    />
                    {url && (
                      <button
                        type="button"
                        onClick={() => removeListItem("gallery", idx)}
                        className="absolute top-8 right-2 p-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors z-10"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="bg-[#0A0118] border border-white/10 p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Tech Stack</h3>
              <button type="button" onClick={() => addListItem("techStack")} className="text-xs text-primary font-bold hover:underline">
                Add Tag
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.techStack.map((tech, idx) => (
                <div key={idx} className="relative group">
                  <input
                    type="text"
                    value={tech}
                    onChange={(e) => handleListChange("techStack", idx, e.target.value)}
                    className="bg-primary/20 text-primary border border-primary/30 rounded-lg px-3 py-1 text-xs outline-none w-24"
                  />
                  <button 
                    type="button" 
                    onClick={() => removeListItem("techStack", idx)}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={10} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="bg-[#0A0118] border border-white/10 p-6 rounded-2xl space-y-4">
            <h3 className="text-lg font-bold text-white mb-2">URLs</h3>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Live Demo URL</label>
              <input
                type="text"
                value={formData.liveDemoUrl || ""}
                onChange={(e) => setFormData({ ...formData, liveDemoUrl: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary/50"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">GitHub URL</label>
              <input
                type="text"
                value={formData.githubUrl || ""}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary/50"
                placeholder="https://github.com/..."
              />
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-64 right-0 p-4 bg-[#030014]/80 backdrop-blur-md border-t border-white/5 flex justify-end space-x-4 z-40">
        <button
          type="button"
          onClick={() => router.push("/admin/projects")}
          className="px-6 py-2 rounded-xl text-gray-400 hover:text-white transition-all font-bold"
        >
          Cancel
        </button>
        <button
          disabled={loading}
          type="submit"
          className="flex items-center space-x-2 px-8 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Save size={20} />
              <span>{initialData ? "Update Project" : "Create Project"}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
