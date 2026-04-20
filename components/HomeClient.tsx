"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
} from "lucide-react";
import FloatingIcons from "@/components/FloatingIcons";
import { Profile } from "@prisma/client";

const roles = [
  "Software Engineer",
  "Full Stack Developer",
  "Backend Developer",
  "Frontend Developer",
  "React Developer",
];

export default function HomeClient({ profile }: { profile: Profile }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typeSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting && displayText !== currentRole) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
      } else if (isDeleting && displayText !== "") {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
      } else if (!isDeleting && displayText === currentRole) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-[#030014]">
      {/* CYBER GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0 pointer-events-none" />

      {/* FLOATING ICONS */}
      <FloatingIcons />

      {/* GLOW BLOBS */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-electric/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow" />
      <div className="absolute top-[20%] right-[20%] w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[100px] animate-float" />

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* HIRE BADGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5 text-accent text-sm mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(76,201,240,0.2)]"
          >
            <span className="relative flex h-2.5 w-2.5 mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
            </span>
            Available for Hire
          </motion.div>

          {/* HERO TITLE */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          >
            Hi, {"I'm"} <br className="md:hidden" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent via-secondary to-primary drop-shadow-[0_0_15px_rgba(247,37,133,0.5)]">
              {profile.name}
            </span>
          </motion.h1>

          {/* TYPING ROLE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="h-12 md:h-20 mb-6 flex items-center justify-center"
          >
            <span className="text-xl md:text-3xl lg:text-4xl text-gray-300 font-light">
              I am a{" "}
              <span className="text-white font-bold border-b-2 border-accent pb-1 inline-block">
                {displayText}
              </span>
              <span className="animate-pulse ml-1 text-accent text-2xl md:text-4xl">
                |
              </span>
            </span>
          </motion.div>

          {/* DESCRIPTION */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed"
          >
            {profile.tagline}
          </motion.p>

          {/* CTA BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row gap-5"
          >
            <Link
              href="/projects"
              className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(114,9,183,0.6)] transition-all transform hover:-translate-y-1 overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center">
                View Projects{" "}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </span>
            </Link>

            <Link
              href="/resume"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 hover:border-accent/50 hover:text-accent transition-all transform hover:-translate-y-1 backdrop-blur-sm"
            >
              View Resume <Download className="ml-2" size={20} />
            </Link>
          </motion.div>

          {/* SOCIAL ICONS */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-16 flex space-x-8"
          >
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white hover:scale-110 transition-all"
            >
              <Github size={28} />
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white hover:scale-110 transition-all"
            >
              <Linkedin size={28} />
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
