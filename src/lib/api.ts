import { Post } from "@/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

// Extract language from filename (e.g., "post.zh.md" -> "zh", "post.md" -> "en")
function extractLanguageFromFilename(filename: string): "en" | "zh" {
  const match = filename.match(/\.([a-z]{2})\.md$/);
  return match ? (match[1] as "en" | "zh") : "en";
}

// Get base slug from filename (e.g., "post.zh.md" -> "post", "post.md" -> "post")
function getBaseSlugFromFilename(filename: string): string {
  return filename.replace(/\.(en|zh)\.md$/, "").replace(/\.md$/, "");
}

// Check if a post exists in both languages
export function isPostBilingual(slug: string): { hasEn: boolean; hasZh: boolean } {
  const enPath = join(postsDirectory, `${slug}.md`);
  const enExplicitPath = join(postsDirectory, `${slug}.en.md`);
  const zhPath = join(postsDirectory, `${slug}.zh.md`);

  return {
    hasEn: fs.existsSync(enPath) || fs.existsSync(enExplicitPath),
    hasZh: fs.existsSync(zhPath)
  };
}

export function getPostBySlug(slug: string, language?: "en" | "zh") {
  // If language is specified, try to find the language-specific file first
  if (language) {
    const languageSpecificPath = join(postsDirectory, `${slug}.${language}.md`);
    if (fs.existsSync(languageSpecificPath)) {
      const fileContents = fs.readFileSync(languageSpecificPath, "utf8");
      const { data, content } = matter(fileContents);
      return { ...data, slug, content, language } as Post;
    }
  }

  // Fall back to the default file (without language suffix)
  const defaultPath = join(postsDirectory, `${slug}.md`);
  if (fs.existsSync(defaultPath)) {
    const fileContents = fs.readFileSync(defaultPath, "utf8");
    const { data, content } = matter(fileContents);
    return { ...data, slug, content, language: "en" } as Post;
  }

  return null;
}

export function getAllPosts(language?: "en" | "zh"): Post[] {
  const slugs = getPostSlugs();
  const posts: Post[] = [];
  const processedSlugs = new Set<string>();

  slugs.forEach((filename) => {
    const fileLanguage = extractLanguageFromFilename(filename);
    const baseSlug = getBaseSlugFromFilename(filename);

    // If we're filtering by language and this file doesn't match, skip it
    if (language && fileLanguage !== language) {
      return;
    }

    // If we already processed this slug, skip it
    if (processedSlugs.has(baseSlug)) {
      return;
    }

    const fullPath = join(postsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    posts.push({
      ...data,
      slug: baseSlug,
      content,
      language: fileLanguage,
    } as Post);

    processedSlugs.add(baseSlug);
  });

  // Sort posts by date in descending order
  return posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}
