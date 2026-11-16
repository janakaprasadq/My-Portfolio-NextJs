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
            className="inline-flex items-center px-3.5 py-1.5 bg-[#141a18] hover:bg-[#1a221f] text-[#e87a24] border border-[#1e2624] text-xs font-mono font-semibold transition-colors"
          >
            <Mail size={14} className="mr-2" />
            INQUIRIES ({stats.unreadMessages})
          </Link>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center px-3.5 py-1.5 bg-[#101415] hover:bg-[#141a18] text-[#e5ece8] border border-[#1e2624] text-xs font-mono transition-colors"
          >
            <span>LIVE TELEMETRY</span>
            <ArrowUpRight size={14} className="ml-1.5" />
          </Link>
        </div>
      </div>

      {/* Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => {
          const Content = (
            <div className="bg-[#0c0f10] border border-[#1e2624] p-5 hover:border-[#2d3834] transition-colors group relative flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-[#141a18] border border-[#1e2624] text-[#e87a24]">
                  <stat.icon size={18} />
                </div>
                {stat.href && (
                  <span className="text-[11px] font-mono text-[#53625b] group-hover:text-[#e87a24] transition-colors flex items-center uppercase">
                    SPEC <ArrowUpRight size={12} className="ml-0.5" />
                  </span>
                )}
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-[#e5ece8] mb-1 group-hover:text-white transition-colors">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-[#81918a] font-mono uppercase">{stat.name}</div>
                <div className="text-[11px] text-[#53625b] mt-0.5 font-mono">{stat.subtext}</div>
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
        <div className="lg:col-span-8 bg-[#0c0f10] border border-[#1e2624] p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#1e2624]">
            <div className="flex items-center space-x-3">
              <div className="p-1.5 bg-[#141a18] border border-[#1e2624] text-[#e87a24]">
                <TrendingUp size={16} />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#e5ece8] font-mono">
                  7-Day Visitor Telemetry
                </h3>
                <p className="text-[11px] font-mono text-[#53625b]">Daily transmission count across routes</p>
              </div>
            </div>
          </div>

          <div className="h-44 flex items-end justify-between gap-3 pt-6 border-b border-[#1e2624] pb-3">
            {activityDays.map((day) => {
              const heightPercent = Math.max((day.count / maxDayCount) * 100, 8);
              return (
                <div key={day.label} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-[10px] font-mono text-[#81918a] opacity-0 group-hover:opacity-100 transition-opacity">
                    {day.count}
                  </span>
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full max-w-[36px] bg-[#e87a24] hover:bg-[#f38a38] transition-colors"
                  />
                  <span className="text-[11px] font-mono text-[#53625b]">{day.label}</span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-between pt-3 text-[11px] font-mono text-[#53625b]">
            <span>TELEMETRY WINDOW: 7 DAYS</span>
            <span className="text-[#e87a24]">TOTAL VIEWS: {activityDays.reduce((a, b) => a + b.count, 0)}</span>
          </div>
        </div>

        {/* Top Countries */}
        <div className="lg:col-span-4 bg-[#0c0f10] border border-[#1e2624] p-6">
          <div className="flex items-center space-x-3 mb-5 pb-3 border-b border-[#1e2624]">
            <div className="p-1.5 bg-[#141a18] border border-[#1e2624] text-[#e87a24]">
              <Globe size={16} />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#e5ece8] font-mono">
                Origin Nodes
              </h3>
              <p className="text-[11px] font-mono text-[#53625b]">Traffic by geo-location</p>
            </div>
          </div>

          <div className="space-y-2.5">
            {topCountries.length > 0 ? (
              topCountries.map((c) => (
                <div key={c.country} className="flex items-center justify-between text-xs font-mono p-2 bg-[#101415] border border-[#1e2624]">
                  <div className="flex items-center space-x-2 text-[#81918a]">
                    <MapPin size={12} className="text-[#e87a24]" />
                    <span>{c.country}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#e5ece8]">
                    {c.count} HITS
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs font-mono text-[#53625b] py-6 text-center">
                NO GEOLOCATION RECORDS DETECTED.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Grid: Top Pages & Recent Visitors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-[#0c0f10] border border-[#1e2624] p-6">
          <div className="flex items-center space-x-3 mb-5 pb-3 border-b border-[#1e2624]">
            <div className="p-1.5 bg-[#141a18] border border-[#1e2624] text-[#e87a24]">
              <Layers size={16} />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#e5ece8] font-mono">
                Route Frequency
              </h3>
              <p className="text-[11px] font-mono text-[#53625b]">Most requested resource paths</p>
            </div>
          </div>

          <div className="space-y-2">
            {topPages.length > 0 ? (
              topPages.map((p) => (
                <div
                  key={p.path}
                  className="flex items-center justify-between p-2.5 bg-[#101415] border border-[#1e2624] text-xs font-mono"
                >
                  <span className="text-[#81918a] truncate max-w-[240px]">
                    {p.path === "/" ? "/ (OVERVIEW)" : p.path}
                  </span>
                  <span className="font-semibold text-[#e87a24]">
                    {p.count} REQUESTS
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs font-mono text-[#53625b] py-4 text-center">NO ROUTE RECORDS DETECTED.</p>
            )}
          </div>
        </div>

        {/* Recent Visitors */}
        <div className="bg-[#0c0f10] border border-[#1e2624] p-6">
          <div className="flex items-center space-x-3 mb-5 pb-3 border-b border-[#1e2624]">
            <div className="p-1.5 bg-[#141a18] border border-[#1e2624] text-[#e87a24]">
              <Eye size={16} />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#e5ece8] font-mono">
                Transmission Ingestion
              </h3>
              <p className="text-[11px] font-mono text-[#53625b]">Incoming connection requests</p>
            </div>
          </div>

          <div className="space-y-2">
            {recentVisitors.length > 0 ? (
              recentVisitors.map((visit) => (
                <div
                  key={visit.id}
                  className="flex justify-between items-center p-2.5 bg-[#101415] border border-[#1e2624] text-xs font-mono"
                >
                  <div className="flex flex-col">
                    <span className="text-[#e5ece8]">
                      {visit.path === "/" ? "/" : visit.path}
                    </span>
                    <span className="text-[#53625b] text-[10px] flex items-center mt-0.5">
                      <MapPin size={10} className="mr-1 text-[#e87a24]" />
                      {visit.city || "Unknown City"}, {visit.country || "Unknown"}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#81918a]">
                    {new Date(visit.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-[#53625b] font-mono text-xs text-center py-4">NO TELEMETRY RECORDED.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
