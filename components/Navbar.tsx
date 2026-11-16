"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname.startsWith("/admin") || pathname.startsWith("/auth")) {
    return null;
  }

  const navLinks = [
    { name: "Overview", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Resume", path: "/resume" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-colors duration-200 border-b ${
        scrolled
          ? "bg-[#0a0d0e]/95 backdrop-blur-md border-[#1e2624]"
          : "bg-[#0a0d0e]/60 backdrop-blur-sm border-[#1e2624]/60"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Technical Brand Callout */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="px-2.5 py-1 border border-[#2d3834] bg-[#121716] group-hover:border-[#e87a24] transition-colors">
              <span className="font-mono text-xs font-semibold text-[#e87a24] tracking-wider">
                JP
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-semibold text-sm tracking-tight text-[#e5ece8] group-hover:text-white transition-colors">
                JANAKA PRASAD
              </span>
              <span className="font-mono text-[10px] text-[#81918a] tracking-widest uppercase">
                ENGINEERING SPEC
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`px-3 py-1.5 text-xs font-mono tracking-wider transition-colors ${
                    isActive
                      ? "text-[#e87a24] bg-[#141a18] border border-[#2d3834]"
                      : "text-[#81918a] hover:text-[#e5ece8] hover:bg-[#121716] border border-transparent"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Technical Command Palette Keycap */}
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
              className="ml-3 flex items-center space-x-2 px-2.5 py-1 text-xs font-mono text-[#81918a] hover:text-[#e5ece8] bg-[#101415] border border-[#1e2624] hover:border-[#2d3834] transition-all cursor-pointer"
              title="Search or jump to command (⌘K / Ctrl+K)"
            >
              <Search size={13} className="text-[#81918a]" />
              <span className="text-[11px] text-[#53625b]">CMD</span>
              <kbd className="px-1 text-[10px] bg-[#1a221f] text-[#e87a24] font-mono border border-[#2d3834]">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 border border-[#1e2624] bg-[#101415] text-[#81918a] hover:text-[#e5ece8]"
              aria-label="Toggle navigation"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="md:hidden bg-[#0a0d0e] border-b border-[#1e2624] px-4 py-3 space-y-1"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 text-xs font-mono tracking-wider ${
                    isActive
                      ? "text-[#e87a24] bg-[#141a18] border-l-2 border-[#e87a24]"
                      : "text-[#81918a] hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
