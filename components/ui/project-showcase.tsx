"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Download, ExternalLink } from "lucide-react";
import Link from "next/link";

export function ProjectShowcase() {
  return (
    <section id="chat-dlp" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="text-2xl font-mono font-bold text-green-400 mb-2 flex items-center gap-2">
          <span className="text-green-500/50">02.</span> Project Showcase
        </h2>
        <div className="h-px bg-slate-800 w-full"></div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 p-8 md:p-12"
      >
        <div className="absolute top-0 right-0 p-4 opacity-20">
          <ShieldCheck className="w-64 h-64 text-green-500 rotate-12" />
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-950/30 px-3 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-500/20 mb-6">
            Featured Project
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 font-mono">
            Chat-DLP
          </h3>
          <p className="text-slate-400 text-lg mb-8 leading-relaxed">
            A browser extension designed to prevent data leakage in LLM chats. 
            It acts as a firewall for your conversations, ensuring sensitive personal 
            information (PII) stays private while you leverage the power of AI.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-400 text-slate-950 font-bold rounded transition-colors">
              <Download className="w-5 h-5" />
              Install Extension
            </button>
            <Link 
              href="/privacy"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded border border-slate-700 transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              Privacy Policy
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
