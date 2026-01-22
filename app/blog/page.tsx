import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import { BlogList } from "./blog-list";

export const metadata = {
  title: "Security Logs | qcb",
  description: "Security research logs and development notes.",
};

export default function BlogIndex() {
  const allPosts = getSortedPostsData();

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-20 pt-28">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <div className="inline-block rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-400 border border-green-500/20 mb-4 font-mono">
            /var/log/security
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-mono text-white mb-4">
            Terminal Logs
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            Documenting vulnerabilities, research findings, and development progress.
          </p>
        </header>

        <BlogList initialPosts={allPosts} />
        
        <div className="mt-16 pt-8 border-t border-slate-800 text-center">
             <Link href="/" className="text-green-500 hover:text-green-400 font-mono text-sm underline decoration-dotted underline-offset-4">
                cd /home
             </Link>
        </div>
      </div>
    </main>
  );
}
