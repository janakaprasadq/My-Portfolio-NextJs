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
              initial={{ opacity: 0, scale: 0.98, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.15 }}
              className="relative w-full max-w-xl bg-[#0c0f10] border border-[#1e2624] overflow-hidden z-10 shadow-2xl"
            >
              {/* Search Bar Input */}
              <div className="flex items-center px-4 py-3.5 border-b border-[#1e2624] bg-[#101415]">
                <Search size={16} className="text-[#e87a24] mr-3 shrink-0" />
                <input
                  type="text"
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="TYPE TO SEARCH SPECIFICATION... (e.g. Projects, Resume, Email)"
                  className="w-full bg-transparent text-[#e5ece8] placeholder-[#53625b] text-xs font-mono focus:outline-none"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[#53625b] hover:text-[#e5ece8] p-1 cursor-pointer"
                >
                  <X size={16} />
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
                        className="w-full flex items-center justify-between p-2.5 hover:bg-[#141a18] transition-colors text-left group cursor-pointer border border-transparent hover:border-[#1e2624]"
                      >
                        <div className="flex items-center space-x-3 min-w-0">
                          <div className="p-1.5 bg-[#141a18] border border-[#1e2624] text-[#81918a] group-hover:text-[#e87a24] group-hover:border-[#e87a24] transition-colors shrink-0">
                            <Icon size={16} />
                          </div>
                          <div className="truncate">
                            <div className="text-xs font-semibold text-[#e5ece8] group-hover:text-[#e87a24] transition-colors truncate font-mono">
                              {item.title}
                            </div>
                            <div className="text-[11px] text-[#81918a] truncate font-sans">
                              {item.subtitle}
                            </div>
                          </div>
                        </div>

                        <span className="text-[10px] font-mono px-2 py-0.5 bg-[#141a18] text-[#53625b] border border-[#1e2624] ml-3 shrink-0 uppercase">
                          {item.category}
                        </span>
                      </button>
                    );
                  })
                ) : (
                  <div className="p-8 text-center text-[#53625b] font-mono text-xs">
                    NO MATCHING SPECIFICATION FOUND.
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2 bg-[#101415] border-t border-[#1e2624] flex items-center justify-between text-[11px] text-[#53625b] font-mono">
                <span>SYSTEM KEYBOARD NAVIGATION</span>
                <span className="flex items-center gap-1">
                  PRESS <kbd className="px-1.5 py-0.2 bg-[#141a18] border border-[#1e2624] text-[#81918a]">ESC</kbd> TO CLOSE
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
