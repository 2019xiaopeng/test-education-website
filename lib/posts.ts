import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content");

export interface PostData {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags?: string[];
  content: string;
}

export function getSortedPostsData(): PostData[] {
  // Get file names under /content
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      // Remove ".md" from file name to get id
      const slug = fileName.replace(/\.md$/, "");

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      const date = matterResult.data.date 
        ? (matterResult.data.date instanceof Date ? matterResult.data.date.toISOString() : String(matterResult.data.date))
        : new Date().toISOString();

      // Combine the data with the id
      return {
        slug,
        title: matterResult.data.title || "",
        date,
        description: matterResult.data.description || "",
        tags: matterResult.data.tags || [],
        content: matterResult.content, // Include content for search
        ...matterResult.data,
      };
    });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostSlugs() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      return {
        params: {
          slug: fileName.replace(/\.md$/, ""),
        },
      };
    });
}

export async function getPostData(slug: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  const date = matterResult.data.date 
    ? (matterResult.data.date instanceof Date ? matterResult.data.date.toISOString() : String(matterResult.data.date))
    : new Date().toISOString();

  return {
    slug,
    content: matterResult.content,
    title: matterResult.data.title || "",
    date,
    description: matterResult.data.description || "",
    tags: matterResult.data.tags || [],
    ...matterResult.data,
  };
}
