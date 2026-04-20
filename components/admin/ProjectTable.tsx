"use client";

import { Project } from "@prisma/client";
import { 
  Pencil, 
  Trash2, 
  Plus, 
  ExternalLink, 
  Search,
  MoreVertical
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { deleteProject } from "@/app/actions/project-actions";

interface ProjectTableProps {
  projects: Project[];
}

export default function ProjectTable({ projects }: ProjectTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deleteProject(id);
      } catch (error) {
        alert("Failed to delete project");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl 
                       focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
          />
        </div>
        
        <Link
          href="/admin/projects/new"
          className="flex items-center justify-center space-x-2 px-6 py-2.5 bg-primary 
                     hover:bg-primary/90 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary/20"
        >
          <Plus size={20} />
          <span>New Project</span>
        </Link>
      </div>

      <div className="bg-[#0A0118] border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Project</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Category</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Tech Stack</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Created At</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/10 flex-shrink-0">
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-white group-hover:text-primary transition-colors">
                          {project.title}
                        </div>
                        <div className="text-xs text-gray-500 truncate max-w-[200px]">
                          {project.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-[10px] font-bold rounded-full bg-secondary/10 text-secondary border border-secondary/20">
                      {project.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span key={tech} className="px-2 py-0.5 text-[8px] rounded border border-white/5 bg-white/5 text-gray-400">
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="text-[8px] text-gray-600">+{project.techStack.length-3} more</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Link 
                        href={`/projects/${project.id}`}
                        target="_blank"
                        className="p-2 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-all"
                        title="View Live"
                      >
                        <ExternalLink size={18} />
                      </Link>
                      <Link 
                        href={`/admin/projects/${project.id}/edit`}
                        className="p-2 hover:bg-blue-500/10 rounded-lg text-gray-500 hover:text-blue-400 transition-all"
                        title="Edit Project"
                      >
                        <Pencil size={18} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(project.id, project.title)}
                        className="p-2 hover:bg-red-500/10 rounded-lg text-gray-500 hover:text-red-400 transition-all"
                        title="Delete Project"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredProjects.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            No projects found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
