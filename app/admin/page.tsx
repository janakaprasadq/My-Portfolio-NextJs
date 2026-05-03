import { prisma } from "@/lib/prisma";
import { FolderKanban, Briefcase, GraduationCap, Code2, Award, Eye, MapPin, Globe } from "lucide-react";

export default async function AdminDashboard() {
  // We'll catch errors if DB is not yet set up
  let stats = {
    projects: 0,
    experience: 0,
    education: 0,
    skills: 0,
    certificates: 0,
    pageViews: 0,
  };
  
  let recentVisitors: any[] = [];

  try {
    const [projectsCount, expCount, eduCount, skillsCount, certCount, pageViewsCount, visitorsList] = await Promise.all([
      prisma.project.count(),
      prisma.experience.count(),
      prisma.education.count(),
      prisma.skillCategory.count(),
      prisma.certificate.count(),
      prisma.pageView.count(),
      prisma.pageView.findMany({
        take: 6,
        orderBy: { createdAt: "desc" },
        // Simple distinct logic to avoid same person refreshing (if ip isn't tracked perfectly)
        // For our basic setup, we'll just show the latest raw visits
      }),
    ]);
    stats = {
      projects: projectsCount,
      experience: expCount,
      education: eduCount,
      skills: skillsCount as number,
      certificates: certCount as number,
      pageViews: pageViewsCount as number,
    };
    recentVisitors = visitorsList as any[];
  } catch (error) {
    console.error("Database connection error:", error);
  }

  const statCards = [
    { name: "Projects", value: stats.projects, icon: FolderKanban, color: "text-blue-400" },
    { name: "Experience", value: stats.experience, icon: Briefcase, color: "text-green-400" },
    { name: "Education", value: stats.education, icon: GraduationCap, color: "text-purple-400" },
    { name: "Skills", value: stats.skills, icon: Code2, color: "text-orange-400" },
    { name: "Certificates", value: stats.certificates, icon: Award, color: "text-pink-400" },
    { name: "Total Views", value: stats.pageViews, icon: Eye, color: "text-cyan-400" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-gray-400">Welcome back! Manage your portfolio data from here.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div 
            key={stat.name} 
            className="bg-[#0A0118] border border-white/5 p-6 rounded-2xl hover:border-primary/20 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1 group-hover:text-primary transition-colors">
              {stat.value}
            </div>
            <div className="text-sm text-gray-500 font-medium">{stat.name}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#0A0118] border border-white/5 p-8 rounded-2xl">
          <h3 className="text-xl font-bold text-white mb-4">Quick Start</h3>
          <p className="text-gray-400 leading-relaxed mb-6">
            To get started, make sure you have:
          </p>
          <ul className="list-disc list-inside space-y-3 text-gray-400 text-sm">
            <li>Added your <code className="text-primary">DATABASE_URL</code> to the <code className="text-secondary">.env</code> file.</li>
            <li>Run <code className="text-primary">npx prisma db push</code> to sync your schema.</li>
            <li>Set up GitHub OAuth tokens for authentication.</li>
          </ul>
        </div>

        {/* Analytics Breakdown */}
        <div className="bg-[#0A0118] border border-white/5 p-8 rounded-2xl">
          <div className="flex items-center space-x-3 mb-6">
            <Globe className="text-primary" size={24} />
            <h3 className="text-xl font-bold text-white">Recent Visitors</h3>
          </div>
          
          <div className="space-y-4">
            {recentVisitors.length > 0 ? (
              recentVisitors.map((visit) => (
                <div key={visit.id} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                  <div className="flex flex-col">
                    <span className="text-white font-medium text-sm">{visit.path === "/" ? "Home" : visit.path}</span>
                    <span className="text-gray-500 text-xs flex items-center mt-1">
                      <MapPin size={12} className="mr-1" />
                      {visit.city}, {visit.country}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 bg-black/30 px-2 py-1 rounded-md">
                    {new Date(visit.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm text-center py-4">No visits recorded yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
