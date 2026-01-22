"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Shield, FileText, Home, Github, Menu, X, Lock } from "lucide-react";
import { useState } from "react";

const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "Blog", path: "/blog", icon: FileText },
  { name: "Project", path: "/#chat-dlp", icon: Shield },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-md"
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group" onClick={() => setIsOpen(false)}>
          <div className="bg-green-500/10 p-2 rounded-lg border border-green-500/20 group-hover:bg-green-500/20 transition-colors">
            <Terminal className="w-5 h-5 text-green-500" />
          </div>
          <span className="font-mono font-bold text-slate-200 group-hover:text-green-400 transition-colors">
            qcb<span className="text-green-500">_</span>
          </span>
        </Link>

        {/* Desktop Nav */}
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

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-slate-400 hover:text-white transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-xl overflow-hidden"
          >
            <nav className="flex flex-col p-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 text-sm font-mono p-2 rounded transition-colors ${
                    pathname === item.path
                      ? "bg-green-500/10 text-green-400"
                      : "text-slate-400 hover:text-white hover:bg-slate-900"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              ))}
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 text-sm font-mono text-slate-500 hover:text-green-500 p-2 rounded hover:bg-slate-900 transition-colors"
              >
                <Lock className="w-4 h-4" />
                Admin
              </Link>
              <Link
                href="https://github.com/2019xiaopeng"
                target="_blank"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 text-sm font-mono text-slate-400 hover:text-white p-2 rounded hover:bg-slate-900 transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
