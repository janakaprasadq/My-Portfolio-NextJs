import { prisma } from "@/lib/prisma";
import { 
  FolderKanban, 
  Briefcase, 
  GraduationCap, 
  Code2, 
  Award, 
  Eye, 
  MapPin, 
  Globe, 
  Mail, 
  Download, 
  TrendingUp, 
  Layers,
  ArrowUpRight
} from "lucide-react";
import { PageView } from "@prisma/client";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  let stats = {
    projects: 0,
    experience: 0,
    education: 0,
    skills: 0,
    certificates: 0,
    pageViews: 0,
    unreadMessages: 0,
    totalMessages: 0,
    resumeDownloads: 0,
  };
  
  let recentVisitors: PageView[] = [];
  let topPages: { path: string; count: number }[] = [];
  let topCountries: { country: string; count: number }[] = [];
  let activityDays: { label: string; count: number }[] = [];

  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const [
      projectsCount,
      expCount,
      eduCount,
      skillsCount,
      certCount,
      pageViewsCount,
      unreadCount,
      messagesTotal,
      resumeDownloadsCount,
      visitorsList,
      rawTopPages,
      rawTopCountries,
      viewsLast7Days,
    ] = await Promise.all([
      prisma.project.count(),
      prisma.experience.count(),
      prisma.education.count(),
      prisma.skillCategory.count(),
      prisma.certificate.count(),
      prisma.pageView.count(),
      prisma.contactMessage.count({ where: { isRead: false } }),
      prisma.contactMessage.count(),
      prisma.pageView.count({ where: { path: "/cv/download" } }),
      prisma.pageView.findMany({
        take: 6,
        orderBy: { createdAt: "desc" },
      }),
      prisma.pageView.groupBy({
        by: ["path"],
        _count: { path: true },
        orderBy: { _count: { path: "desc" } },
        take: 5,
      }),
      prisma.pageView.groupBy({
        by: ["country"],
        where: { country: { not: null } },
        _count: { country: true },
        orderBy: { _count: { country: "desc" } },
        take: 5,
      }),
      prisma.pageView.findMany({
        where: { createdAt: { gte: sevenDaysAgo } },
        select: { createdAt: true },
      }),
    ]);

    stats = {
      projects: projectsCount,
      experience: expCount,
      education: eduCount,
      skills: skillsCount,
      certificates: certCount,
      pageViews: pageViewsCount,
      unreadMessages: unreadCount,
      totalMessages: messagesTotal,
      resumeDownloads: resumeDownloadsCount,
    };

    recentVisitors = visitorsList;
    topPages = rawTopPages.map((p) => ({ path: p.path, count: p._count.path }));
    topCountries = rawTopCountries.map((c) => ({
      country: c.country || "Unknown",
      count: c._count.country,
    }));

    // Group last 7 days activity
    const daysMap = new Map<string, number>();
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayLabel = d.toLocaleDateString(undefined, { weekday: "short" });
      daysMap.set(dayLabel, 0);
    }
    viewsLast7Days.forEach((v) => {
      const label = new Date(v.createdAt).toLocaleDateString(undefined, { weekday: "short" });
      if (daysMap.has(label)) {
        daysMap.set(label, (daysMap.get(label) || 0) + 1);
      }
    });
    activityDays = Array.from(daysMap.entries()).map(([label, count]) => ({ label, count }));
  } catch (error) {
    console.error("Database connection error in AdminDashboard:", error);
  }

  const maxDayCount = Math.max(...activityDays.map((d) => d.count), 1);

  const statCards = [
    { 
      name: "New Inquiries", 
      value: stats.unreadMessages, 
      subtext: `${stats.totalMessages} total`, 
      icon: Mail, 
      color: "text-secondary", 
      href: "/admin/messages" 
    },
    { 
      name: "Total Views", 
      value: stats.pageViews, 
      subtext: "All-time traffic", 
      icon: Eye, 
      color: "text-cyan-400" 
    },
    { 
      name: "CV Downloads", 
      value: stats.resumeDownloads, 
      subtext: "Recruiters & leads", 
      icon: Download, 
      color: "text-emerald-400" 
    },
    { 
      name: "Projects", 
      value: stats.projects, 
      subtext: "Active portfolio", 
      icon: FolderKanban, 
      color: "text-blue-400", 
      href: "/admin/projects" 
    },
    { 
      name: "Experience", 
      value: stats.experience, 
      subtext: "Timeline nodes", 
      icon: Briefcase, 
      color: "text-green-400", 
      href: "/admin/experience" 
    },
    { 
      name: "Education", 
      value: stats.education, 
      subtext: "Degrees & institutions", 
      icon: GraduationCap, 
      color: "text-purple-400", 
      href: "/admin/education" 
    },
    { 
      name: "Skill Categories", 
      value: stats.skills, 
      subtext: "Tech stacks", 
      icon: Code2, 
      color: "text-orange-400", 
      href: "/admin/skills" 
    },
    { 
      name: "Certifications", 
      value: stats.certificates, 
      subtext: "Verified credentials", 
      icon: Award, 
      color: "text-pink-400", 
      href: "/admin/certificates" 
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Dashboard Overview</h1>
          <p className="text-gray-400 text-sm">
            Live visitor analytics, client messages, and portfolio management.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            href="/admin/messages"
            className="inline-flex items-center px-4 py-2 rounded-xl bg-secondary/20 hover:bg-secondary/30 text-secondary border border-secondary/30 text-sm font-semibold transition-all"
          >
            <Mail size={16} className="mr-2" />
            Inquiries ({stats.unreadMessages})
          </Link>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 text-sm font-medium transition-all"
          >
            View Live Site <ArrowUpRight size={16} className="ml-1.5" />
          </Link>
        </div>
      </div>

      {/* Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((stat) => {
          const Content = (
            <div className="bg-[#0A0118] border border-white/5 p-5 rounded-2xl hover:border-primary/30 transition-all group relative overflow-hidden h-full flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-xl bg-white/5 ${stat.color}`}>
                  <stat.icon size={22} />
                </div>
                {stat.href && (
                  <span className="text-xs text-gray-500 group-hover:text-primary transition-colors flex items-center">
                    Manage <ArrowUpRight size={12} className="ml-0.5" />
                  </span>
                )}
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1 group-hover:text-primary transition-colors">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-300">{stat.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{stat.subtext}</div>
              </div>
            </div>
          );

          return stat.href ? (
            <Link key={stat.name} href={stat.href} className="block">
              {Content}
            </Link>
          ) : (
            <div key={stat.name}>{Content}</div>
          );
        })}
      </div>

      {/* Analytics Visual Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 7-Day Pageviews Trend */}
        <div className="lg:col-span-8 bg-[#0A0118] border border-white/5 p-6 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/20 rounded-lg text-primary">
                <TrendingUp size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">7-Day Visitor Trend</h3>
                <p className="text-xs text-gray-400">Daily pageviews across all pages</p>
              </div>
            </div>
          </div>

          <div className="h-48 flex items-end justify-between gap-3 pt-6 border-b border-white/5 pb-3">
            {activityDays.map((day) => {
              const heightPercent = Math.max((day.count / maxDayCount) * 100, 8);
              return (
                <div key={day.label} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-[11px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
                    {day.count}
                  </span>
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full max-w-[42px] bg-gradient-to-t from-primary/40 to-secondary rounded-t-lg transition-all group-hover:brightness-125"
                  />
                  <span className="text-xs text-gray-400 font-medium">{day.label}</span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-between pt-3 text-xs text-gray-500">
            <span>Past 7 days traffic</span>
            <span className="text-accent font-semibold">Total views: {activityDays.reduce((a, b) => a + b.count, 0)}</span>
          </div>
        </div>

        {/* Top Countries */}
        <div className="lg:col-span-4 bg-[#0A0118] border border-white/5 p-6 rounded-2xl">
          <div className="flex items-center space-x-3 mb-5">
            <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
              <Globe size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Top Locations</h3>
              <p className="text-xs text-gray-400">Visitors by country</p>
            </div>
          </div>

          <div className="space-y-3.5">
            {topCountries.length > 0 ? (
              topCountries.map((c) => (
                <div key={c.country} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 text-gray-300">
                    <MapPin size={14} className="text-secondary" />
                    <span>{c.country}</span>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/5 text-gray-300 border border-white/5">
                    {c.count} views
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-500 py-6 text-center">
                Country analytics will populate automatically when deployed to Vercel!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Grid: Top Pages & Recent Visitors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-[#0A0118] border border-white/5 p-6 rounded-2xl">
          <div className="flex items-center space-x-3 mb-5">
            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
              <Layers size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Top Visited Pages</h3>
              <p className="text-xs text-gray-400">Most viewed URLs on your site</p>
            </div>
          </div>

          <div className="space-y-3">
            {topPages.length > 0 ? (
              topPages.map((p) => (
                <div
                  key={p.path}
                  className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 rounded-xl text-sm"
                >
                  <span className="font-mono text-xs text-gray-300 truncate max-w-[240px]">
                    {p.path === "/" ? "/ (Home)" : p.path}
                  </span>
                  <span className="text-xs font-semibold text-primary">
                    {p.count} hits
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-500 py-4 text-center">No pageviews recorded yet.</p>
            )}
          </div>
        </div>

        {/* Recent Visitors */}
        <div className="bg-[#0A0118] border border-white/5 p-6 rounded-2xl">
          <div className="flex items-center space-x-3 mb-5">
            <div className="p-2 bg-pink-500/20 rounded-lg text-pink-400">
              <Eye size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Recent Visitors</h3>
              <p className="text-xs text-gray-400">Real-time incoming visits</p>
            </div>
          </div>

          <div className="space-y-2.5">
            {recentVisitors.length > 0 ? (
              recentVisitors.map((visit) => (
                <div
                  key={visit.id}
                  className="flex justify-between items-center p-3 bg-white/[0.02] rounded-xl border border-white/5"
                >
                  <div className="flex flex-col">
                    <span className="text-white font-medium text-xs">
                      {visit.path === "/" ? "Home" : visit.path}
                    </span>
                    <span className="text-gray-500 text-[11px] flex items-center mt-0.5">
                      <MapPin size={11} className="mr-1 text-secondary" />
                      {visit.city || "Unknown City"}, {visit.country || "Unknown Country"}
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-400 bg-black/40 px-2 py-0.5 rounded-md font-mono">
                    {new Date(visit.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-xs text-center py-4">No visits recorded yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
