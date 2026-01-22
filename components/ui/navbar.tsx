"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Terminal, Shield, FileText, Home, Github } from "lucide-react";

const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "Chat-DLP", path: "/#chat-dlp", icon: Shield },
  { name: "Logs", path: "/blog", icon: FileText },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-md"
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-green-500/10 p-2 rounded-lg border border-green-500/20 group-hover:bg-green-500/20 transition-colors">
            <Terminal className="w-5 h-5 text-green-500" />
          </div>
          <span className="font-mono font-bold text-slate-200 group-hover:text-green-400 transition-colors">
            qcb<span className="text-green-500">_</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-2 text-sm font-mono transition-colors ${
                pathname === item.path
                  ? "text-green-400"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}
          <Link
            href="https://github.com/2019xiaopeng"
            target="_blank"
            className="flex items-center gap-2 text-sm font-mono text-slate-400 hover:text-white transition-colors pl-8 border-l border-slate-800"
          >
            <Github className="w-4 h-4" />
            GitHub
          </Link>
        </nav>

        {/* Mobile Menu Button (simplified for now) */}
        <div className="md:hidden">
            <Link href="/blog" className="text-sm font-mono text-green-400 border border-green-500/20 px-3 py-1 rounded">
                /logs
            </Link>
        </div>
      </div>
    </motion.header>
  );
}
