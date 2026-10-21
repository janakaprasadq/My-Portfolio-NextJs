"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
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
        message: "Thank you! Your message has been sent successfully. I'll get back to you shortly.",
      });
      setFormData({ name: "", email: "", subject: "", message: "", honeypot: "" });
    } else {
      setStatus({
        type: "error",
        message: res.error || "Failed to send message. Please try again.",
      });
    }
  };


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle
        title="Get in Touch"
        subtitle="Let's build something amazing together"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-electric/20 border border-white/10 p-8 rounded-2xl backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary/20 rounded-lg text-accent">
                  <Mail size={24} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-gray-400 mb-1">Email Me</p>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-white hover:text-secondary transition-colors text-lg font-medium break-all"
                  >
                    {profile.email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              {profile.phone && (
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/20 rounded-lg text-accent">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Call Me</p>
                    <a
                      href={`tel:${profile.phone}`}
                      className="text-white hover:text-secondary transition-colors text-lg font-medium"
                    >
                      {profile.phone}
                    </a>
                  </div>
                </div>
              )}

              {/* Location */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary/20 rounded-lg text-accent">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Location</p>
                  <p className="text-white text-lg font-medium">{profile.location}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map / Location Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="h-64 bg-[#11051F] rounded-2xl overflow-hidden border border-white/10 relative"
          >
            <Image
              src="https://picsum.photos/seed/map/800/400"
              alt="Map Location"
              fill
              className="object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-dark/80 text-accent px-4 py-2 rounded-lg backdrop-blur-md border border-accent/20">
                Based in {profile.location}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-electric/20 border border-white/10 p-8 rounded-2xl backdrop-blur-sm"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
          
          {status && (
            <div
              className={`p-4 rounded-xl mb-6 flex items-start space-x-3 border ${
                status.type === "success"
                  ? "bg-green-500/10 border-green-500/30 text-green-300"
                  : "bg-red-500/10 border-red-500/30 text-red-300"
              }`}
            >
              {status.type === "success" ? (
                <CheckCircle2 className="shrink-0 mt-0.5 text-green-400" size={20} />
              ) : (
                <AlertCircle className="shrink-0 mt-0.5 text-red-400" size={20} />
              )}
              <span className="text-sm font-medium">{status.message}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Honeypot field for bot protection */}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                  Name *
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Name"
                  className="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-600 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-600 transition-colors"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Project Inquiry / Job Opportunity"
                className="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-600 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                rows={5}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell me about your project, timeline, and requirements..."
                className="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary resize-none placeholder-gray-600 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-4 rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center cursor-pointer ${
                loading ? "opacity-60 cursor-not-allowed" : "hover:shadow-secondary/40 hover:-translate-y-1"
              }`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 rounded-full bg-white/20 border-2 border-white/30 border-t-white animate-spin mr-3"></div>
                  Sending Message...
                </>
              ) : (
                <>
                  <Send size={20} className="mr-2" /> Send Message
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
