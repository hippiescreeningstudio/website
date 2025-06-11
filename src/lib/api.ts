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
  // Check if this post is bilingual
  const bilingualInfo = isPostBilingual(slug);
  const isBilingual = bilingualInfo.hasEn && bilingualInfo.hasZh;

  // If language is specified, try to find the language-specific file first
  if (language) {
    const languageSpecificPath = join(postsDirectory, `${slug}.${language}.md`);
    if (fs.existsSync(languageSpecificPath)) {
      const fileContents = fs.readFileSync(languageSpecificPath, "utf8");
      const { data, content } = matter(fileContents);

      // Ensure coverImage is available from coverImages
      const postData: any = { ...data, slug, content, language };
      if (!postData.coverImage && postData.coverImages?.length > 0) {
        postData.coverImage = postData.coverImages[0];
      }

      return postData as Post;
    }
  }

  // Fall back to the default file (without language suffix)
  const defaultPath = join(postsDirectory, `${slug}.md`);
  if (fs.existsSync(defaultPath)) {
    const fileContents = fs.readFileSync(defaultPath, "utf8");
    const { data, content } = matter(fileContents);

    // Ensure coverImage is available from coverImages
    const postData: any = { ...data, slug, content, language: "en" };
    if (!postData.coverImage && postData.coverImages?.length > 0) {
      postData.coverImage = postData.coverImages[0];
    }

    return postData as Post;
  }

  // For single-language posts, if the requested language doesn't exist,
  // fall back to whichever language version is available
  if (!isBilingual) {
    // Try the other language
    const otherLanguage = language === "en" ? "zh" : "en";
    const otherLanguagePath = join(postsDirectory, `${slug}.${otherLanguage}.md`);
    if (fs.existsSync(otherLanguagePath)) {
      const fileContents = fs.readFileSync(otherLanguagePath, "utf8");
      const { data, content } = matter(fileContents);

      // Ensure coverImage is available from coverImages
      const postData: any = { ...data, slug, content, language: otherLanguage };
      if (!postData.coverImage && postData.coverImages?.length > 0) {
        postData.coverImage = postData.coverImages[0];
      }

      return postData as Post;
    }
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

    // If we already processed this slug, skip it
    if (processedSlugs.has(baseSlug)) {
      return;
    }

    // Check if this post is bilingual
    const bilingualInfo = isPostBilingual(baseSlug);
    const isBilingual = bilingualInfo.hasEn && bilingualInfo.hasZh;

    // If post is bilingual, only show the version that matches the current language
    if (isBilingual && language) {
      const languageSpecificPath = join(postsDirectory, `${baseSlug}.${language}.md`);
      if (fs.existsSync(languageSpecificPath)) {
        const fileContents = fs.readFileSync(languageSpecificPath, "utf8");
        const { data, content } = matter(fileContents);

        const postData: any = {
          ...data,
          slug: baseSlug,
          content,
          language: language,
        };

        // Ensure coverImage is available from coverImages
        if (!postData.coverImage && postData.coverImages?.length > 0) {
          postData.coverImage = postData.coverImages[0];
        }

        posts.push(postData as Post);
        processedSlugs.add(baseSlug);
      }
    } else {
      // If post is not bilingual, show it in all language modes
      const fullPath = join(postsDirectory, filename);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      const postData: any = {
        ...data,
        slug: baseSlug,
        content,
        language: fileLanguage,
      };

      // Ensure coverImage is available from coverImages
      if (!postData.coverImage && postData.coverImages?.length > 0) {
        postData.coverImage = postData.coverImages[0];
      }

      posts.push(postData as Post);
      processedSlugs.add(baseSlug);
    }
  });

  // Sort posts by date in descending order
  return posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}
