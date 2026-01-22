import { getPostData, getAllPostSlugs } from "@/lib/posts";
import Link from "next/link";
import { ArrowLeft, Terminal } from "lucide-react";
import ReactMarkdown from "react-markdown";

export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths.map((path) => path.params);
}

// Next.js 15 breaking change: params is now a Promise
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const postData = await getPostData(slug);
  return {
    title: `${postData.title} | qcb`,
    description: postData.description,
  };
}

// Next.js 15 breaking change: params is now a Promise
export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const postData = await getPostData(slug);
  
  // Defensive date handling: handle both string and Date object
  const dateStr = postData.date instanceof Date 
    ? (postData.date as Date).toISOString() 
    : String(postData.date);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-20">
      <article className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-green-500 hover:text-green-400 font-mono mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>cd ..</span>
        </Link>

        <header className="mb-12 border-b border-slate-800 pb-8">
          <div className="flex items-center gap-2 text-green-500/60 font-mono text-sm mb-4">
            <Terminal className="w-4 h-4" />
            <span>log_entry_{dateStr.split("T")[0].replace(/-/g, "")}.md</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 font-mono leading-tight">
            {postData.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-slate-400 font-mono text-sm">
            <time dateTime={dateStr} className="bg-slate-900 px-2 py-1 rounded border border-slate-800">
              {dateStr.split("T")[0]}
            </time>
            {postData.tags && postData.tags.map((tag: string) => (
              <span key={tag} className="text-green-500/80">#{tag}</span>
            ))}
          </div>
        </header>

        <div className="prose prose-invert prose-slate max-w-none 
          prose-headings:font-mono prose-headings:text-green-400 
          prose-a:text-green-500 prose-a:no-underline hover:prose-a:underline
          prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-slate-800 prose-pre:text-slate-200
          prose-code:text-green-300 prose-code:font-mono prose-code:bg-slate-900/50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
        ">
          <ReactMarkdown>{postData.content}</ReactMarkdown>
        </div>
        
        <div className="mt-16 pt-8 border-t border-slate-800 flex justify-between items-center">
            <p className="text-slate-500 font-mono text-sm">End of log.</p>
            <Link href="/blog" className="text-slate-400 hover:text-white font-mono text-sm">
                Return to Index
            </Link>
        </div>
      </article>
    </main>
  );
}
