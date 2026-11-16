"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Briefcase, 
  GraduationCap, 
  Code2, 
  Settings,
  LogOut,
  FolderKanban,
  Award,
  Mail,
  MessageSquareQuote,
  Terminal
} from "lucide-react";
import { signOut } from "next-auth/react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { name: "Telemetry & KPI", href: "/admin", icon: LayoutDashboard },
    { name: "Dispatch Inbox", href: "/admin/messages", icon: Mail },
    { name: "Project Archive", href: "/admin/projects", icon: FolderKanban },
    { name: "Endorsements", href: "/admin/testimonials", icon: MessageSquareQuote },
    { name: "Engineering Roles", href: "/admin/experience", icon: Briefcase },
    { name: "Academic History", href: "/admin/education", icon: GraduationCap },
    { name: "Capability Matrix", href: "/admin/skills", icon: Code2 },
    { name: "Certifications", href: "/admin/certificates", icon: Award },
    { name: "Profile Parameters", href: "/admin/profile", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0a0d0e] text-[#e5ece8]">
      {/* Fixed Architectural Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-[#0c0f10] border-r border-[#1e2624] flex flex-col z-30">
        <div className="p-5 border-b border-[#1e2624]">
          <div className="flex items-center space-x-2">
            <Terminal size={16} className="text-[#e87a24]" />
            <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#e5ece8]">
              JP // ADMIN DOSSIER
            </h2>
          </div>
          <p className="font-mono text-[10px] text-[#53625b] mt-1">
            CONTROL PLANE // SPEC V2.4
          </p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2 text-xs font-mono tracking-wider transition-colors ${
                  isActive 
                    ? "bg-[#141a18] text-[#e87a24] border-l-2 border-[#e87a24]" 
                    : "text-[#81918a] hover:text-[#e5ece8] hover:bg-[#101415] border-l-2 border-transparent"
                }`}
              >
                <item.icon size={15} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#1e2624] bg-[#0a0d0e]">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center space-x-2 px-3 py-2 text-xs font-mono text-[#81918a] hover:text-[#f87171] hover:bg-[#211214] transition-colors w-full cursor-pointer"
          >
            <LogOut size={14} />
            <span>TERMINATE SESSION</span>
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="pl-64 min-h-screen">
        <div className="p-8 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
