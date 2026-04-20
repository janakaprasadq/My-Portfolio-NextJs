"use client";

import { Education } from "@prisma/client";
import { Plus, Trash2, Pencil, Save, X } from "lucide-react";
import { useState } from "react";
import { createEducation, updateEducation, deleteEducation } from "@/app/actions/resume-actions";

export default function EducationManager({ initialData }: { initialData: Education[] }) {
  const [items, setItems] = useState<Education[]>(initialData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    degree: "",
    institution: "",
    period: "",
    details: ""
  });

  const handleSave = async (id?: string) => {
    try {
      if (id) {
        const updated = await updateEducation(id, formData);
        setItems(items.map(item => item.id === id ? updated : item));
        setEditingId(null);
      } else {
        const created = await createEducation(formData);
        setItems([...items, created]);
        setIsAdding(false);
      }
      setFormData({ degree: "", institution: "", period: "", details: "" });
    } catch (error) {
      alert("Failed to save education");
    }
  };

  const startEdit = (item: Education) => {
    setFormData({
      degree: item.degree,
      institution: item.institution,
      period: item.period,
      details: item.details || ""
    });
    setEditingId(item.id);
    setIsAdding(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this education entry?")) {
      await deleteEducation(id);
      setItems(items.filter(i => i.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Education</h2>
        {!isAdding && !editingId && (
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold transition-all"
          >
            <Plus size={18} />
            <span>Add Education</span>
          </button>
        )}
      </div>

      {(isAdding || editingId) && (
        <div className="bg-white/5 border border-primary/20 p-6 rounded-2xl space-y-4">
          <h3 className="text-white font-bold">{editingId ? "Edit Education" : "New Education"}</h3>
          <div className="grid grid-cols-1 gap-4">
            <input
              placeholder="Degree (e.g. BSc in Computer Science)"
              value={formData.degree}
              onChange={e => setFormData({...formData, degree: e.target.value})}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary/50"
            />
            <input
              placeholder="Institution (e.g. University of Example)"
              value={formData.institution}
              onChange={e => setFormData({...formData, institution: e.target.value})}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary/50"
            />
            <input
              placeholder="Period (e.g. 2017 - 2021)"
              value={formData.period}
              onChange={e => setFormData({...formData, period: e.target.value})}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary/50"
            />
            <textarea
              placeholder="Additional Details (Honours, GPA, etc.)"
              value={formData.details}
              onChange={e => setFormData({...formData, details: e.target.value})}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary/50"
              rows={2}
            />
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

      <div className="grid grid-cols-1 gap-4">
        {items.map(item => (
          <div 
            key={item.id} 
            className={`p-6 rounded-2xl border transition-all ${
              editingId === item.id ? "bg-primary/5 border-primary/30" : "bg-white/5 border-white/10"
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-lg font-bold text-white">{item.degree}</h4>
                <p className="text-primary text-sm font-medium">{item.institution}</p>
                <p className="text-gray-500 text-xs mt-1">{item.period}</p>
                {item.details && <p className="text-gray-400 text-sm mt-3 italic">{item.details}</p>}
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
          </div>
        ))}
      </div>
    </div>
  );
}
