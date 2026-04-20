"use client";

import { SkillCategory } from "@prisma/client";
import { Plus, Trash2, Pencil, Save, X } from "lucide-react";
import { useState } from "react";
import { createSkillCategory, updateSkillCategory, deleteSkillCategory } from "@/app/actions/resume-actions";

export default function SkillsManager({ initialData }: { initialData: SkillCategory[] }) {
  const [items, setItems] = useState<SkillCategory[]>(initialData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    skills: [] as string[]
  });

  const handleAddSkill = () => {
    setFormData({ ...formData, skills: [...formData.skills, ""] });
  };

  const handleRemoveSkill = (idx: number) => {
    const newSkills = [...formData.skills];
    newSkills.splice(idx, 1);
    setFormData({ ...formData, skills: newSkills });
  };

  const handleSave = async (id?: string) => {
    try {
      if (id) {
        const updated = await updateSkillCategory(id, formData);
        setItems(items.map(item => item.id === id ? updated : item));
        setEditingId(null);
      } else {
        const created = await createSkillCategory(formData);
        setItems([...items, created]);
        setIsAdding(false);
      }
      setFormData({ name: "", skills: [] });
    } catch (error) {
      alert("Failed to save skill category");
    }
  };

  const startEdit = (item: SkillCategory) => {
    setFormData({
      name: item.name,
      skills: item.skills
    });
    setEditingId(item.id);
    setIsAdding(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this skill category?")) {
      await deleteSkillCategory(id);
      setItems(items.filter(i => i.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Skill Categories</h2>
        {!isAdding && !editingId && (
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold transition-all"
          >
            <Plus size={18} />
            <span>Add Category</span>
          </button>
        )}
      </div>

      {(isAdding || editingId) && (
        <div className="bg-white/5 border border-primary/20 p-6 rounded-2xl space-y-4">
          <h3 className="text-white font-bold">{editingId ? "Edit Category" : "New Category"}</h3>
          <div className="grid grid-cols-1 gap-4">
            <input
              placeholder="Category Name (e.g. Frontend, Backend)"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary/50 text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-500">Skills</label>
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill, idx) => (
                <div key={idx} className="flex items-center bg-white/5 border border-white/10 rounded-lg pr-1">
                  <input
                    value={skill}
                    onChange={e => {
                      const newSkills = [...formData.skills];
                      newSkills[idx] = e.target.value;
                      setFormData({...formData, skills: newSkills});
                    }}
                    className="bg-transparent px-3 py-1 outline-none text-sm text-white w-32"
                    placeholder="Skill"
                  />
                  <button onClick={() => handleRemoveSkill(idx)} className="text-gray-500 hover:text-red-400 p-1">
                    <X size={14} />
                  </button>
                </div>
              ))}
              <button 
                type="button" 
                onClick={handleAddSkill}
                className="px-3 py-1 bg-white/5 border border-dashed border-white/20 rounded-lg text-xs text-gray-400 hover:text-white"
              >
                + Add Skill
              </button>
            </div>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map(item => (
          <div 
            key={item.id} 
            className={`p-6 rounded-2xl border transition-all ${
              editingId === item.id ? "bg-primary/5 border-primary/30" : "bg-white/5 border-white/10"
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-lg font-bold text-white uppercase tracking-wider text-xs">{item.name}</h4>
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
            <div className="flex flex-wrap gap-2">
              {item.skills.map((skill, idx) => (
                <span key={idx} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
