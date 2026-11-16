"use client";

import { signIn } from "next-auth/react";
import { Github, Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function SignIn() {
  return (
    <div className="min-h-screen bg-[#0a0d0e] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-[#0c0f10] border border-[#1e2624] p-8"
      >
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#1e2624]">
          <Shield size={16} className="text-[#e87a24]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#e87a24] font-semibold">
            ENGINEERING SPEC // ACCESS GATE
          </span>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-bold uppercase text-[#e5ece8] tracking-tight mb-2">
            Administrator Authentication
          </h1>
          <p className="font-mono text-xs text-[#81918a]">
            Identity verification via GitHub OAuth required for administrative commands.
          </p>
        </div>

        <button
          onClick={() => signIn("github", { callbackUrl: "/admin" })}
          className="w-full flex items-center justify-center space-x-2 py-3.5 bg-[#e87a24] text-[#0a0d0e] font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#f38a38] transition-colors cursor-pointer border border-[#e87a24]"
        >
          <Github size={16} />
          <span>AUTHENTICATE WITH GITHUB</span>
        </button>

        <div className="mt-8 pt-4 border-t border-[#1e2624] flex items-center justify-between text-[10px] font-mono text-[#53625b]">
          <span>SECURE ENVIRONMENT</span>
          <span>AUTH: NEXTAUTH // OAUTH2</span>
        </div>
      </motion.div>
    </div>
  );
}
