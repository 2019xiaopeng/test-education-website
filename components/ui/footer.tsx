import Link from "next/link";
import { Terminal } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-8 border-t border-slate-800 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 text-slate-400">
          <Terminal className="w-4 h-4" />
          <span className="font-mono text-sm">
            © {new Date().getFullYear()} qcb.
          </span>
        </div>
        
        <div className="flex items-center gap-6">
          <Link 
            href="/.well-known/security.txt" 
            className="text-sm font-mono text-green-500/70 hover:text-green-400 transition-colors underline decoration-dotted underline-offset-4"
          >
            Security Policy (RFC 9116)
          </Link>
        </div>
      </div>
    </footer>
  );
}
