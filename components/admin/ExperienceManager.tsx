"use client";

import { Experience } from "@prisma/client";
import { Plus, Trash2, Pencil, Save } from "lucide-react";
import { useState } from "react";
import { createExperience, updateExperience, deleteExperience } from "@/app/actions/resume-actions";

export default function ExperienceManager({ initialData }: { initialData: Experience[] }) {
  const [items, setItems] = useState<Experience[]>(initialData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    role: "",
    company: "",
    period: "",
    description: [""] as string[]
  });

  const handleAddDescription = () => {
    setFormData({ ...formData, description: [...formData.description, ""] });
  };

  const handleRemoveDescription = (idx: number) => {
    const newDesc = [...formData.description];
    newDesc.splice(idx, 1);
    setFormData({ ...formData, description: newDesc });
  };

  const handleSave = async (id?: string) => {
    try {
      if (id) {
        const updated = await updateExperience(id, formData);
        setItems(items.map(item => item.id === id ? updated : item));
        setEditingId(null);
      } else {
        const created = await createExperience(formData);
        setItems([...items, created]);
        setIsAdding(false);
      }
      setFormData({ role: "", company: "", period: "", description: [""] });
    } catch {
      alert("Failed to save experience");
    }
  };

  const startEdit = (item: Experience) => {
    setFormData({
      role: item.role,
      company: item.company,
      period: item.period,
      description: item.description
    });
    setEditingId(item.id);
    setIsAdding(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this experience entry?")) {
      await deleteExperience(id);
      setItems(items.filter(i => i.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Work Experience</h2>
        {!isAdding && !editingId && (
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold transition-all"
          >
            <Plus size={18} />
            <span>Add Experience</span>
          </button>
        )}
      </div>

      {(isAdding || editingId) && (
        <div className="bg-white/5 border border-primary/20 p-6 rounded-2xl space-y-4">
          <h3 className="text-white font-bold">{editingId ? "Edit Experience" : "New Experience"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Role (e.g. Software Engineer)"
              value={formData.role}
              onChange={e => setFormData({...formData, role: e.target.value})}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary/50"
            />
            <input
              placeholder="Company"
              value={formData.company}
              onChange={e => setFormData({...formData, company: e.target.value})}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary/50"
            />
            <input
              placeholder="Period (e.g. 2021 - Present)"
              value={formData.period}
              onChange={e => setFormData({...formData, period: e.target.value})}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-500">Responsibilities</label>
            {formData.description.map((desc, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  value={desc}
                  onChange={e => {
                    const newDesc = [...formData.description];
                    newDesc[idx] = e.target.value;
                    setFormData({...formData, description: newDesc});
                  }}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none"
                />
                <button onClick={() => handleRemoveDescription(idx)} className="text-gray-500 hover:text-red-400">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            <button 
              type="button" 
              onClick={handleAddDescription}
              className="text-xs text-primary font-bold hover:underline"
            >
              + Add Responsibility
            </button>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-white/5">
            <button 
              onClick={() => { setEditingId(null); setIsAdding(false); }}
              className="px-4 py-2 text-gray-400 hover:text-white"
            >
              Cancel
            </button>
            <button 
              onClick={() => handleSave(editingId || undefined)}
              className="flex items-center space-x-2 px-6 py-2 bg-primary rounded-lg font-bold"
            >
              <Save size={18} />
              <span>Save</span>
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {items.map(item => (
          <div 
            key={item.id} 
            className={`p-6 rounded-2xl border transition-all ${
              editingId === item.id ? "bg-primary/5 border-primary/30" : "bg-white/5 border-white/10"
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-bold text-white">{item.role}</h4>
                <p className="text-primary text-sm font-medium">{item.company} | {item.period}</p>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => startEdit(item)}
                  className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white"
                >
                  <Pencil size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-400"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <ul className="list-disc list-inside space-y-1">
              {item.description.map((d, i) => (
                <li key={i} className="text-gray-400 text-sm whitespace-pre-wrap">{d}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
