"use client";

import { Certificate } from "@prisma/client";
import { Plus, Trash2, Pencil, Save, Award, ExternalLink } from "lucide-react";
import { useState } from "react";
import { createCertificate, updateCertificate, deleteCertificate } from "@/app/actions/certificate-actions";

export default function CertificateManager({ initialData }: { initialData: Certificate[] }) {
  const [items, setItems] = useState<Certificate[]>(initialData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    issuer: "",
    issueDate: "",
    certificateUrl: ""
  });

  const handleSave = async (id?: string) => {
    try {
      if (id) {
        const updated = await updateCertificate(id, formData);
        setItems(items.map(item => item.id === id ? updated : item));
        setEditingId(null);
      } else {
        const created = await createCertificate(formData);
        setItems([...items, created]);
        setIsAdding(false);
      }
      setFormData({ name: "", issuer: "", issueDate: "", certificateUrl: "" });
    } catch {
      alert("Failed to save certificate. Make sure you have run 'npx prisma db push' first.");
    }
  };

  const startEdit = (item: Certificate) => {
    setFormData({
      name: item.name,
      issuer: item.issuer,
      issueDate: item.issueDate,
      certificateUrl: item.certificateUrl || ""
    });
    setEditingId(item.id);
    setIsAdding(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this certificate?")) {
      await deleteCertificate(id);
      setItems(items.filter(i => i.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white flex items-center">
          <Award className="mr-2 text-primary" size={24} />
          Certifications
        </h2>
        {!isAdding && !editingId && (
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold transition-all"
          >
            <Plus size={18} />
            <span>Add Certificate</span>
          </button>
        )}
      </div>

      {(isAdding || editingId) && (
        <div className="bg-white/5 border border-primary/20 p-6 rounded-2xl space-y-4 shadow-xl">
          <h3 className="text-white font-bold">{editingId ? "Edit Certificate" : "New Certificate"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-400 mb-1">Certificate Name</label>
              <input
                placeholder="e.g. Meta Front-End Developer Professional Certificate"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary/50 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Issuer</label>
              <input
                placeholder="e.g. Coursera / Udemy"
                value={formData.issuer}
                onChange={e => setFormData({...formData, issuer: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary/50 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Issue Date</label>
              <input
                placeholder="e.g. August 2023"
                value={formData.issueDate}
                onChange={e => setFormData({...formData, issueDate: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary/50 text-white"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-400 mb-1">Certificate URL (Optional)</label>
              <input
                placeholder="https://coursera.org/verify/..."
                value={formData.certificateUrl}
                onChange={e => setFormData({...formData, certificateUrl: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary/50 text-white"
              />
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
              className="flex items-center space-x-2 px-6 py-2 bg-primary rounded-lg font-bold text-white transition-all hover:bg-primary/90"
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
              editingId === item.id ? "bg-primary/5 border-primary/30" : "bg-[#0A0118] border-white/10 shadow-lg"
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                  <Award size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">{item.name}</h4>
                  <p className="text-primary text-sm font-medium">{item.issuer}</p>
                  <p className="text-gray-500 text-xs mt-1">{item.issueDate}</p>
                  {item.certificateUrl && (
                    <a 
                      href={item.certificateUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-accent text-xs mt-3 hover:underline"
                    >
                      <ExternalLink size={14} className="mr-1" />
                      Verify Certificate
                    </a>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => startEdit(item)}
                  className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                >
                  <Pencil size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {items.length === 0 && !isAdding && (
          <div className="text-center py-12 bg-white/5 border border-dashed border-white/10 rounded-2xl">
            <Award className="mx-auto text-gray-600 mb-4" size={48} />
            <p className="text-gray-500">No certificates added yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
