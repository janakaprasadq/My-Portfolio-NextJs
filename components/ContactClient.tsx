"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { Profile } from "@prisma/client";
import { submitContactMessage } from "@/app/actions/contact-actions";

export default function ContactClient({ profile }: { profile: Profile }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const res = await submitContactMessage(formData);
    setLoading(false);

    if (res.success) {
      setStatus({
        type: "success",
        message: "Message delivered successfully to engineering inbox. Expect response within 24 hours.",
      });
      setFormData({ name: "", email: "", subject: "", message: "", honeypot: "" });
    } else {
      setStatus({
        type: "error",
        message: res.error || "Delivery failure. Please check input parameters or email directly.",
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
      <SectionTitle
        title="Direct Dispatch & Communication"
        subtitle="COMMUNICATION SPECIFICATION // CONTRACTS // ENGINEERING INQUIRIES"
        badge="05 // DISPATCH"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Dispatch Details & Channels */}
        <div className="lg:col-span-5 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0c0f10] border border-[#1e2624] divide-y divide-[#1e2624]"
          >
            <div className="p-4 bg-[#141a18] flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-[#e5ece8] uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 bg-[#e87a24]" />
                COMMUNICATION PROTOCOL
              </span>
              <span className="font-mono text-[10px] text-[#53625b]">STATUS: ONLINE</span>
            </div>

            {/* Direct Channels */}
            <div className="p-6 space-y-5 font-mono text-xs">
              <div>
                <div className="text-[#53625b] uppercase text-[10px] mb-1 flex items-center gap-1.5">
                  <Mail size={12} className="text-[#e87a24]" />
                  <span>DIRECT INBOX</span>
                </div>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-[#e5ece8] hover:text-[#e87a24] text-sm font-semibold transition-colors break-all"
                >
                  {profile.email}
                </a>
              </div>

              {profile.phone && (
                <div>
                  <div className="text-[#53625b] uppercase text-[10px] mb-1 flex items-center gap-1.5">
                    <Phone size={12} className="text-[#e87a24]" />
                    <span>DIRECT LINE</span>
                  </div>
                  <a
                    href={`tel:${profile.phone}`}
                    className="text-[#e5ece8] hover:text-[#e87a24] text-sm font-semibold transition-colors"
                  >
                    {profile.phone}
                  </a>
                </div>
              )}

              <div>
                <div className="text-[#53625b] uppercase text-[10px] mb-1 flex items-center gap-1.5">
                  <MapPin size={12} className="text-[#e87a24]" />
                  <span>BASE STATION</span>
                </div>
                <p className="text-[#e5ece8] text-sm">{profile.location}</p>
                <p className="text-[#81918a] text-[11px] mt-0.5">Timezone: UTC+5:30</p>
              </div>

              <div>
                <div className="text-[#53625b] uppercase text-[10px] mb-1 flex items-center gap-1.5">
                  <Clock size={12} className="text-[#e87a24]" />
                  <span>SLA RESPONSE TIME</span>
                </div>
                <p className="text-[#e5ece8] text-sm">Under 24 Hours</p>
              </div>
            </div>

            <div className="p-4 bg-[#101415] text-[11px] font-mono text-[#81918a]">
              Available for full-time engineering contracts, architecture consultations, and backend system development.
            </div>
          </motion.div>
        </div>

        {/* Right: Message Dispatch Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-7 bg-[#0c0f10] border border-[#1e2624]"
        >
          <div className="p-4 bg-[#141a18] border-b border-[#1e2624] flex items-center justify-between">
            <span className="font-mono text-xs font-semibold text-[#e5ece8] uppercase tracking-wider">
              MESSAGE DISPATCH TERMINAL
            </span>
            <span className="font-mono text-[10px] text-[#53625b]">SECURE FORM</span>
          </div>

          <div className="p-6 sm:p-8">
            {status && (
              <div
                className={`p-4 mb-6 font-mono text-xs flex items-start space-x-3 border ${
                  status.type === "success"
                    ? "bg-[#121c16] border-[#22442d] text-[#6ee7b7]"
                    : "bg-[#211214] border-[#442226] text-[#fca5a5]"
                }`}
              >
                {status.type === "success" ? (
                  <CheckCircle2 className="shrink-0 mt-0.5 text-[#34d399]" size={16} />
                ) : (
                  <AlertCircle className="shrink-0 mt-0.5 text-[#f87171]" size={16} />
                )}
                <span>{status.message}</span>
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Bot honeypot */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                tabIndex={-1}
                autoComplete="off"
                className="hidden opacity-0 absolute -z-10 pointer-events-none"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block font-mono text-xs uppercase text-[#53625b] mb-2">
                    IDENTIFIER / NAME *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. David Harrison"
                    className="w-full bg-[#101415] border border-[#1e2624] px-4 py-2.5 text-xs font-mono text-[#e5ece8] focus:outline-none focus:border-[#e87a24] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-mono text-xs uppercase text-[#53625b] mb-2">
                    RETURN ADDRESS / EMAIL *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. david@apexsolutions.io"
                    className="w-full bg-[#101415] border border-[#1e2624] px-4 py-2.5 text-xs font-mono text-[#e5ece8] focus:outline-none focus:border-[#e87a24] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block font-mono text-xs uppercase text-[#53625b] mb-2">
                  SUBJECT / TOPIC SPECIFICATION
                </label>
                <input
                  id="subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Backend Architecture Contract / Job Engagement"
                  className="w-full bg-[#101415] border border-[#1e2624] px-4 py-2.5 text-xs font-mono text-[#e5ece8] focus:outline-none focus:border-[#e87a24] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block font-mono text-xs uppercase text-[#53625b] mb-2">
                  TRANSMISSION BODY / DETAILS *
                </label>
                <textarea
                  id="message"
                  rows={6}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Outline project scope, requirements, architecture parameters, and expected timeline..."
                  className="w-full bg-[#101415] border border-[#1e2624] px-4 py-3 text-xs font-mono text-[#e5ece8] focus:outline-none focus:border-[#e87a24] resize-none transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-[#e87a24] text-[#0a0d0e] font-mono text-xs font-semibold py-3.5 tracking-wider uppercase flex items-center justify-center transition-colors cursor-pointer border border-[#e87a24] ${
                  loading ? "opacity-60 cursor-not-allowed" : "hover:bg-[#f38a38]"
                }`}
              >
                {loading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-[#0a0d0e] border-t-transparent animate-spin mr-2" />
                    <span>DISPATCHING TRANSMISSION...</span>
                  </>
                ) : (
                  <>
                    <Send size={14} className="mr-2" />
                    <span>DISPATCH TRANSMISSION</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
