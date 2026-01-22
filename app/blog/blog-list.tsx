"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Terminal, Calendar, ArrowRight, Search, Hash, X } from "lucide-react";
import type { PostData } from "@/lib/posts";

interface BlogListProps {
  initialPosts: PostData[];
}

export function BlogList({ initialPosts }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    initialPosts.forEach((post) => {
      post.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [initialPosts]);

  // Filter posts based on search query and selected tag
  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesTag = selectedTag ? post.tags?.includes(selectedTag) : true;
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.date.includes(query);

      return matchesTag && matchesSearch;
    });
  }, [initialPosts, searchQuery, selectedTag]);

  return (
    <div className="space-y-8">
      {/* Search and Filter Section */}
      <div className="bg-slate-900/30 p-6 rounded-lg border border-slate-800 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search logs by keyword, date, or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-10 py-2 text-sm font-mono text-slate-200 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/20 transition-all placeholder:text-slate-600"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Tags Cloud */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-mono text-slate-500 mr-2 flex items-center gap-1">
            <Hash className="w-3 h-3" /> Filters:
          </span>
          <button
            onClick={() => setSelectedTag(null)}
            className={`text-xs font-mono px-3 py-1 rounded transition-colors border ${
              selectedTag === null
                ? "bg-green-500/10 text-green-400 border-green-500/30"
                : "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700"
            }`}
          >
            ALL
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`text-xs font-mono px-3 py-1 rounded transition-colors border ${
                tag === selectedTag
                  ? "bg-green-500/10 text-green-400 border-green-500/30"
                  : "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-500">
        <span>
          Found {filteredPosts.length} {filteredPosts.length === 1 ? "entry" : "entries"}
        </span>
        {(searchQuery || selectedTag) && (
            <span className="text-green-500/50">
                Filter Active
            </span>
        )}
      </div>

      {/* Posts Grid */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block group relative p-6 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-green-500/50 transition-all hover:bg-slate-900/80"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-green-500/70 font-mono">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={post.date}>{post.date}</time>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-100 group-hover:text-green-400 transition-colors font-mono">
                  {post.title}
                </h2>
                <p className="text-slate-400 line-clamp-2 text-sm md:text-base">
                  {post.description}
                </p>

                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-2 py-1 bg-slate-800 text-slate-300 rounded border border-slate-700"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="hidden md:flex items-center text-green-500/50 group-hover:text-green-400 group-hover:translate-x-2 transition-all">
                <Terminal className="w-6 h-6 mr-2" />
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </Link>
        ))}

        {filteredPosts.length === 0 && (
          <div className="text-center py-20 border border-dashed border-slate-800 rounded-lg">
            <p className="text-slate-500 font-mono">No logs matching query found.</p>
            <button 
                onClick={() => {setSearchQuery(""); setSelectedTag(null)}}
                className="mt-4 text-sm text-green-500 hover:underline"
            >
                Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
