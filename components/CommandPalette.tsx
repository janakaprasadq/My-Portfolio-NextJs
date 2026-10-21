"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Home, 
  User, 
  Code, 
  FileText, 
  Mail, 
  Download, 
  Github, 
  Linkedin, 
  Copy, 
  Check, 
  ShieldCheck, 
  X 
} from "lucide-react";
import { trackCustomEvent } from "@/components/AnalyticsTracker";

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  category: "Navigation" | "Actions" | "Socials";
  onSelect: () => void;
  keywords?: string[];
}

export default function CommandPalette({ cvUrl = "/cv/janaka-prasad-cv-v2.pdf" }: { cvUrl?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  // Keyboard shortcut listener and custom event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => setIsOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, [isOpen]);


  const copyEmail = () => {
    navigator.clipboard.writeText("janakaprased99@gmail.com");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setIsOpen(false);
    }, 1200);
  };

  const downloadResume = () => {
    trackCustomEvent("/cv/download");
    const link = document.createElement("a");
    link.href = cvUrl;
    link.download = "janaka-prasad-cv.pdf";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();
    setIsOpen(false);
  };

  const items: CommandItem[] = [
    // Navigation
    {
      id: "nav-home",
      title: "Go to Home",
      subtitle: "Main hero, services, and client testimonials",
      icon: Home,
      category: "Navigation",
      keywords: ["main", "landing"],
      onSelect: () => {
        router.push("/");
        setIsOpen(false);
      },
    },
    {
      id: "nav-projects",
      title: "Explore Projects",
      subtitle: "Full-stack apps, systems, and case studies",
      icon: Code,
      category: "Navigation",
      keywords: ["work", "portfolio", "apps", "code"],
      onSelect: () => {
        router.push("/projects");
        setIsOpen(false);
      },
    },
    {
      id: "nav-about",
      title: "About & Experience",
      subtitle: "Career timeline, education, and skills",
      icon: User,
      category: "Navigation",
      keywords: ["bio", "career", "history"],
      onSelect: () => {
        router.push("/about");
        setIsOpen(false);
      },
    },
    {
      id: "nav-resume",
      title: "Resume & Certifications",
      subtitle: "View qualifications and verified credentials",
      icon: FileText,
      category: "Navigation",
      keywords: ["cv", "certs", "diploma"],
      onSelect: () => {
        router.push("/resume");
        setIsOpen(false);
      },
    },
    {
      id: "nav-contact",
      title: "Contact & Hire Me",
      subtitle: "Send a direct message or project inquiry",
      icon: Mail,
      category: "Navigation",
      keywords: ["email", "call", "message", "hire"],
      onSelect: () => {
        router.push("/contact");
        setIsOpen(false);
      },
    },
    {
      id: "nav-admin",
      title: "Admin Dashboard",
      subtitle: "Manage content, analytics, and messages",
      icon: ShieldCheck,
      category: "Navigation",
      keywords: ["admin", "login", "stats"],
      onSelect: () => {
        router.push("/admin");
        setIsOpen(false);
      },
    },

    // Actions
    {
      id: "act-resume",
      title: "Download Resume (PDF)",
      subtitle: "Get the latest updated CV document",
      icon: Download,
      category: "Actions",
      keywords: ["pdf", "download", "cv"],
      onSelect: downloadResume,
    },
    {
      id: "act-copy-email",
      title: copied ? "Email Copied!" : "Copy Email Address",
      subtitle: "janakaprased99@gmail.com",
      icon: copied ? Check : Copy,
      category: "Actions",
      keywords: ["email", "copy", "clipboard"],
      onSelect: copyEmail,
    },

    // Socials
    {
      id: "soc-github",
      title: "GitHub Profile",
      subtitle: "Explore open-source repos and contributions",
      icon: Github,
      category: "Socials",
      keywords: ["git", "code", "repositories"],
      onSelect: () => {
        window.open("https://github.com/janakaprased99", "_blank");
        setIsOpen(false);
      },
    },
    {
      id: "soc-linkedin",
      title: "LinkedIn Profile",
      subtitle: "Connect with me professionally",
      icon: Linkedin,
      category: "Socials",
      keywords: ["social", "network"],
      onSelect: () => {
        window.open("https://linkedin.com/in/janakaprased", "_blank");
        setIsOpen(false);
      },
    },
  ];

  const filteredItems = items.filter((item) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.keywords?.some((k) => k.toLowerCase().includes(q))
    );
  });

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-xl bg-[#0A0015] border border-primary/40 rounded-2xl shadow-[0_0_50px_rgba(114,9,183,0.35)] overflow-hidden z-10"
            >
              {/* Search Bar Input */}
              <div className="flex items-center px-4 py-3.5 border-b border-white/10">
                <Search size={20} className="text-primary mr-3 shrink-0" />
                <input
                  type="text"
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Type a command or search... (e.g. Projects, Resume, Email)"
                  className="w-full bg-transparent text-white placeholder-gray-500 text-sm focus:outline-none"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-white p-1 rounded-lg cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Items List */}
              <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={item.onSelect}
                        className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all text-left group cursor-pointer"
                      >
                        <div className="flex items-center space-x-3 min-w-0">
                          <div className="p-2 rounded-lg bg-white/5 text-gray-300 group-hover:bg-primary/20 group-hover:text-primary transition-colors shrink-0">
                            <Icon size={18} />
                          </div>
                          <div className="truncate">
                            <div className="text-sm font-semibold text-white group-hover:text-accent transition-colors truncate">
                              {item.title}
                            </div>
                            <div className="text-xs text-gray-400 truncate">
                              {item.subtitle}
                            </div>
                          </div>
                        </div>

                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/5 ml-3 shrink-0">
                          {item.category}
                        </span>
                      </button>
                    );
                  })
                ) : (
                  <div className="p-8 text-center text-gray-500 text-sm">
                    No matching commands found.
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2.5 bg-white/[0.02] border-t border-white/5 flex items-center justify-between text-[11px] text-gray-500 font-mono">
                <span>Navigation & Actions</span>
                <span className="flex items-center gap-1">
                  Press <kbd className="px-1.5 py-0.5 bg-white/10 text-gray-300 rounded">ESC</kbd> to exit
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
