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
  MessageSquareQuote
} from "lucide-react";
import { signOut } from "next-auth/react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Messages", href: "/admin/messages", icon: Mail },
    { name: "Projects", href: "/admin/projects", icon: FolderKanban },
    { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
    { name: "Experience", href: "/admin/experience", icon: Briefcase },
    { name: "Education", href: "/admin/education", icon: GraduationCap },
    { name: "Skills", href: "/admin/skills", icon: Code2 },
    { name: "Certificates", href: "/admin/certificates", icon: Award },
    { name: "Profile", href: "/admin/profile", icon: Settings },
  ];


  return (
    <div className="min-h-screen bg-[#030014] text-gray-200">
      {/* Fixed Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-[#0A0118] border-r border-white/5 flex flex-col z-30">
        <div className="p-6">
          <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Admin Panel
          </h2>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  isActive 
                    ? "bg-primary/20 text-primary border border-primary/20" 
                    : "hover:bg-white/5 text-gray-400 hover:text-white"
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-400/5 transition-all w-full cursor-pointer"
          >
            <LogOut size={20} />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pl-64 min-h-screen">
        <div className="p-8 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
