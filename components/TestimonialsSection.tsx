"use client";

import { motion } from "framer-motion";
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

export default function TestimonialsSection({
  testimonials = [],
}: TestimonialsSectionProps) {
  const displayItems = testimonials.length > 0 ? testimonials : defaultTestimonials;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-[#1e2624]">
      <div className="max-w-7xl mx-auto">
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-12 border-b border-[#1e2624] gap-4">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#e87a24] mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#e87a24]" />
              02 // ENDORSEMENTS
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#e5ece8] uppercase">
              Technical Testimonials & Peer Reviews
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#81918a] max-w-md font-mono">
            Documented feedback on code quality, architecture delivery, and communication.
          </p>
        </div>

        {/* 3-COLUMN STRUCTURAL REFERENCES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1e2624] border border-[#1e2624]">
          {displayItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className="bg-[#0c0f10] p-6 sm:p-7 flex flex-col justify-between hover:bg-[#101415] transition-colors"
            >
              <div>
                {/* REFERENCE METADATA HEADER */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1e2624]">
                  <span className="font-mono text-[10px] text-[#53625b] uppercase tracking-wider">
                    REF // {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[10px] text-[#e87a24] uppercase tracking-wider">
                    VERIFIED CLIENT
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#81918a] leading-relaxed mb-6 font-sans">
                  &ldquo;{item.content}&rdquo;
                </p>
              </div>

              {/* AUTHOR SPEC */}
              <div className="pt-4 border-t border-[#1e2624] font-mono text-xs">
                <div className="font-bold text-[#e5ece8] tracking-wide">
                  {item.clientName}
                </div>
                <div className="text-[11px] text-[#53625b] mt-0.5">
                  {item.clientRole} — <span className="text-[#81918a]">{item.company}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
