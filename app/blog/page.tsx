import { BlogList } from "./blog-list";
import { client } from "@/lib/tina-client";

export const metadata = {
  title: "Security Logs | qcb",
  description: "Security research logs and development notes.",
};

export default async function BlogIndex() {
  let posts: any[] = [];
  
  try {
      // Fetch posts from TinaCMS
      const res = await client.queries.postConnection({
        sort: "date",
        last: 100, // Fetch recent 100 posts
      });
      
      posts = res.data.postConnection.edges?.map((edge: any) => edge.node) || [];
  } catch (e) {
      console.error("Failed to fetch posts from TinaCMS:", e);
      // We can leave posts as empty array to show "No signals detected" state
  }

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

        <BlogList initialPosts={posts} />
        
        <div className="mt-16 pt-8 border-t border-slate-800 text-center">
             <div className="text-xs text-slate-600 font-mono mb-4">
                System Status: TinaCMS Integration Active
             </div>
        </div>
      </div>
    </main>
  );
}
