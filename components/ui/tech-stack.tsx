"use client";

import { motion } from "framer-motion";
import { Code2, FileCode, Shield, Terminal, Database } from "lucide-react";

const technologies = [
  { name: "HTML/CSS", icon: FileCode, color: "text-orange-400" },
  { name: "JavaScript", icon: Code2, color: "text-yellow-400" },
  { name: "Python", icon: Terminal, color: "text-blue-400" },
  { name: "React / Next.js", icon: Database, color: "text-cyan-400" },
  { name: "Security", icon: Shield, color: "text-green-400" },
];

export function TechStack() {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="text-2xl font-mono font-bold text-green-400 mb-2 flex items-center gap-2">
          <span className="text-green-500/50">01.</span> Tech Stack
        </h2>
        <div className="h-px bg-slate-800 w-full"></div>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative p-6 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-green-500/50 transition-colors"
          >
            <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"></div>
            <div className="flex flex-col items-center gap-4 relative z-10">
              <tech.icon className={`w-12 h-12 ${tech.color} drop-shadow-lg`} />
              <span className="font-mono text-sm text-slate-300 group-hover:text-white transition-colors">
                {tech.name}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
