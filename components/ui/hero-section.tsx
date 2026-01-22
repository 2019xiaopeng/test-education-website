"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Download } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export function HeroSection() {
  const [text, setText] = useState("");
  const fullText = "Hello, I'm qcb";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i + 1));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20 relative overflow-hidden">
      <div className="space-y-6 max-w-3xl z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-400 border border-green-500/20 mb-4 font-mono">
            System Online
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-mono tracking-tight text-white mb-4">
            {text}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="text-green-500"
            >
              _
            </motion.span>
          </h1>
          <h2 className="text-xl md:text-2xl text-slate-400 font-mono">
            Security Researcher | Developer | Python | JS
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
        >
          <Link
            href="#chat-dlp"
            className="group relative px-6 py-3 font-mono font-bold text-black bg-green-400 rounded hover:bg-green-300 transition-all active:scale-95"
          >
            <span className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download Chat-DLP
            </span>
          </Link>
          <Link
            href="https://github.com/2019xiaopeng"
            target="_blank"
            className="group px-6 py-3 font-mono font-bold text-green-400 border border-green-500/50 rounded hover:bg-green-500/10 transition-all active:scale-95"
          >
            <span className="flex items-center gap-2">
              <Github className="w-4 h-4" />
              View GitHub
            </span>
          </Link>
        </motion.div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-500 opacity-20 blur-[100px]"></div>
    </section>
  );
}
