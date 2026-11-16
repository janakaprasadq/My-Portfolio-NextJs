"use client";

import { motion } from "framer-motion";

export default function SectionTitle({
  title,
  subtitle,
  badge,
}: {
  title: string;
  subtitle?: string;
  badge?: string;
}) {
  return (
    <div className="mb-12 border-b border-[#1e2624] pb-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          {badge && (
            <div className="font-mono text-xs uppercase tracking-widest text-[#e87a24] mb-2 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 bg-[#e87a24]" />
              {badge}
            </div>
          )}
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold tracking-tight text-[#e5ece8] uppercase"
          >
            {title}
          </motion.h2>
        </div>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xs md:text-sm text-[#81918a] max-w-xl font-mono"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}
