"use client";

import { signIn } from "next-auth/react";
import { Github } from "lucide-react";
import { motion } from "framer-motion";

export default function SignIn() {
  return (
    <div className="min-h-screen bg-[#030014] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-[#0A0118] border border-white/10 p-8 rounded-3xl shadow-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Access</h1>
          <p className="text-gray-400 text-sm">Please sign in with GitHub to manage your portfolio.</p>
        </div>

        <button
          onClick={() => signIn("github", { callbackUrl: "/admin" })}
          className="w-full flex items-center justify-center space-x-3 py-4 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-colors"
        >
          <Github />
          <span>Continue with GitHub</span>
        </button>

        <p className="mt-8 text-center text-xs text-gray-500 uppercase tracking-widest">
          Secure Environment
        </p>
      </motion.div>
    </div>
  );
}
