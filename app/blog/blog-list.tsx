"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Terminal, Calendar, ArrowRight, Search, Hash, X, AlertTriangle } from "lucide-react";

// Define the shape of the data coming from Tina
// In a real app, import this from tina/__generated__/types
interface Post {
  id: string;
  _sys: {
    filename: string;
  };
  title: string;
  date: string;
  description?: string | null;
  tags?: string[] | null;
  body: any; // Rich text JSON
}

interface BlogListProps {
  initialPosts: Post[];
}

export function BlogList({ initialPosts }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    initialPosts.forEach((post) => {
      post.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [initialPosts]);

  // Filter and Sort posts
  const filteredPosts = useMemo(() => {
    let result = initialPosts.filter((post) => {
      const matchesTag = selectedTag ? post.tags?.includes(selectedTag) : true;
      const query = searchQuery.toLowerCase();
      // Simple search on title and description. Body search requires traversing the rich text JSON which is complex.
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(query) ||
        (post.description && post.description.toLowerCase().includes(query)) ||
        post.date.includes(query);

      return matchesTag && matchesSearch;
    });

    // Sort by date
    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [initialPosts, searchQuery, selectedTag, sortOrder]);

  return (
    <div className="space-y-8">
      {/* Search and Filter Section */}
      <div className="bg-slate-900/30 p-6 rounded-lg border border-slate-800 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search logs by keyword or date..."
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
          
          <select 
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            className="bg-slate-950 border border-slate-800 rounded px-4 py-2 text-sm font-mono text-slate-400 focus:outline-none focus:border-green-500/50"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
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
            key={post.id}
            href={`/blog/${post._sys.filename}`}
            className="block group relative p-6 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-green-500/50 transition-all hover:bg-slate-900/80"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-green-500/70 font-mono">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
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
          <div className="flex flex-col items-center justify-center py-20 border border-dashed border-slate-800 rounded-lg bg-slate-950/50">
            <AlertTriangle className="w-12 h-12 text-slate-600 mb-4" />
            <p className="text-slate-500 font-mono text-lg">No signals detected.</p>
            <p className="text-slate-600 text-sm mt-2">Adjust your sensors (filters) and try again.</p>
            {(searchQuery || selectedTag) && (
              <button 
                  onClick={() => {setSearchQuery(""); setSelectedTag(null)}}
                  className="mt-6 text-sm text-green-500 hover:text-green-400 font-mono border border-green-500/30 px-4 py-2 rounded hover:bg-green-500/10 transition-colors"
              >
                  Reset Sensors
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
