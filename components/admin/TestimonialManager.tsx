"use client";

import { useState } from "react";
import { Testimonial } from "@prisma/client";
import { Plus, Trash2, Pencil, Save, MessageSquareQuote, Star, X } from "lucide-react";
import { createTestimonial, updateTestimonial, deleteTestimonial } from "@/app/actions/testimonial-actions";

export default function TestimonialManager({ initialData }: { initialData: Testimonial[] }) {
  const [items, setItems] = useState<Testimonial[]>(initialData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const [formData, setFormData] = useState({
    clientName: "",
    clientRole: "",
    company: "",
    content: "",
    rating: 5,
  });

  const handleSave = async (id?: string) => {
    try {
      if (!formData.clientName || !formData.company || !formData.content) {
        alert("Please fill in client name, company, and review content.");
        return;
      }

      if (id) {
        const updated = await updateTestimonial(id, formData);
        setItems(items.map((item) => (item.id === id ? updated : item)));
        setEditingId(null);
      } else {
        const created = await createTestimonial(formData);
        setItems([created, ...items]);
        setIsAdding(false);
      }
      setFormData({ clientName: "", clientRole: "", company: "", content: "", rating: 5 });
    } catch {
      alert("Failed to save testimonial. Please check your database connection.");
    }
  };

  const startEdit = (item: Testimonial) => {
    setFormData({
      clientName: item.clientName,
      clientRole: item.clientRole,
      company: item.company,
      content: item.content,
      rating: item.rating,
    });
    setEditingId(item.id);
    setIsAdding(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this testimonial?")) {
      await deleteTestimonial(id);
      setItems(items.filter((i) => i.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center">
            <MessageSquareQuote className="mr-3 text-secondary" size={26} />
            Client Reviews & Testimonials
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage client quotes and social proof displayed on the home page.
          </p>
        </div>

        {!isAdding && !editingId && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-xl text-sm font-semibold transition-all cursor-pointer shadow-lg shadow-primary/20"
          >
            <Plus size={16} className="mr-1.5" /> Add Review
          </button>
        )}
      </div>

      {/* Add / Edit Form Modal or Card */}
      {(isAdding || editingId) && (
        <div className="bg-[#0A0118] border border-primary/30 p-6 rounded-2xl space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-white">
              {editingId ? "Edit Testimonial" : "Add New Testimonial"}
            </h3>
            <button
              onClick={() => {
                setIsAdding(false);
                setEditingId(null);
              }}
              className="text-gray-400 hover:text-white cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Client Name *</label>
              <input
                type="text"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                placeholder="e.g. David Harrison"
                className="w-full bg-dark/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Role / Title *</label>
              <input
                type="text"
                value={formData.clientRole}
                onChange={(e) => setFormData({ ...formData, clientRole: e.target.value })}
                placeholder="e.g. Product Director"
                className="w-full bg-dark/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Company / Organization *</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="e.g. Apex Digital"
                className="w-full bg-dark/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Review Content *</label>
            <textarea
              rows={3}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="What did the client say about working with you?"
              className="w-full bg-dark/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              <label className="text-xs text-gray-400">Rating:</label>
              <select
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                className="bg-dark/50 border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none"
              >
                <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
              </select>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  setIsAdding(false);
                  setEditingId(null);
                }}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSave(editingId || undefined)}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl text-sm font-semibold cursor-pointer"
              >
                <Save size={16} className="mr-1.5" /> Save Review
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Testimonials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-[#0A0118] border border-white/5 p-5 rounded-xl flex flex-col justify-between hover:border-white/10 transition-colors"
          >
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="text-base font-bold text-white">{item.clientName}</h4>
                  <p className="text-xs text-gray-400">
                    {item.clientRole} &bull; <span className="text-primary">{item.company}</span>
                  </p>
                </div>
                <div className="flex text-amber-400 text-xs">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} size={13} fill="currentColor" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-300 italic line-clamp-3 my-3">
                &ldquo;{item.content}&rdquo;
              </p>
            </div>

            <div className="flex justify-end space-x-2 pt-3 border-t border-white/5">
              <button
                onClick={() => startEdit(item)}
                className="p-1.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg cursor-pointer"
              >
                <Pencil size={15} />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg cursor-pointer"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}

        {items.length === 0 && !isAdding && (
          <div className="col-span-full bg-[#0A0118] border border-white/5 rounded-2xl p-8 text-center text-gray-500 text-sm">
            No custom testimonials added yet. Click &quot;Add Review&quot; to add your first client quote.
          </div>
        )}
      </div>
    </div>
  );
}
