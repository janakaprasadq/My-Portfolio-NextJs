"use client";

import { motion } from "framer-motion";
import { Star, Quote, CheckCircle } from "lucide-react";
import { Testimonial } from "@prisma/client";

const defaultTestimonials = [
  {
    id: "default-1",
    clientName: "David Harrison",
    clientRole: "Product Director",
    company: "Apex Digital Solutions",
    content:
      "Janaka is an exceptional software engineer. He built our full-stack dashboard with Next.js and Prisma ahead of schedule. The code quality, database design, and responsiveness were world-class.",
    rating: 5,
  },
  {
    id: "default-2",
    clientName: "Elena Rostova",
    clientRole: "Founder & CTO",
    company: "Veloce Commerce",
    content:
      "Working with Janaka transformed our digital platform. His deep knowledge of Supabase, high-speed API architecture, and micro-interactions made our application significantly faster and more enjoyable for customers.",
    rating: 5,
  },
  {
    id: "default-3",
    clientName: "Mark Reynolds",
    clientRole: "Engineering Lead",
    company: "Synapse Labs",
    content:
      "Outstanding communication and technical depth. Janaka quickly understood complex requirements and delivered robust, clean code with zero hassle. I highly recommend him for any ambitious engineering project.",
    rating: 5,
  },
];

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

export default function TestimonialsSection({ testimonials = [] }: TestimonialsSectionProps) {
  const displayItems = testimonials.length > 0 ? testimonials : defaultTestimonials;

  return (
    <section className="py-24 relative overflow-hidden bg-[#050012]/60 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-4"
          >
            Client Reviews
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4"
          >
            What Clients & Teams{" "}
            <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              Say About Working Together
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-base md:text-lg"
          >
            Real feedback from founders, product managers, and engineering leaders.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-[#0A0118] border border-white/10 rounded-2xl p-7 flex flex-col justify-between hover:border-primary/40 transition-all duration-300 relative group"
            >
              {/* Top Quote Icon & Stars */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400 space-x-1">
                    {Array.from({ length: item.rating || 5 }).map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <Quote size={24} className="text-white/10 group-hover:text-primary/40 transition-colors" />
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
                  &ldquo;{item.content}&rdquo;
                </p>
              </div>

              {/* Author footer */}
              <div className="pt-4 border-t border-white/5 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-white text-sm shrink-0">
                  {item.clientName.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold text-white flex items-center">
                    {item.clientName}
                    <CheckCircle size={13} className="ml-1.5 text-accent" />
                  </div>
                  <div className="text-xs text-gray-400">
                    {item.clientRole} &bull; <span className="text-gray-300">{item.company}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
