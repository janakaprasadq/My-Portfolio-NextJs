import ProjectForm from "@/components/admin/ProjectForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewProjectPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <Link 
          href="/admin/projects"
          className="p-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-white transition-all"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">New Project</h1>
          <p className="text-gray-400">Fill in the details to showcase a new piece of work.</p>
        </div>
      </div>

      <ProjectForm />
    </div>
  );
}
