"use client";

import { Post } from "@/interfaces/post";
import { PostPreview } from "./post-preview";
import { useLanguage } from "@/contexts/language-context";

type Props = {
  posts: Post[];
};

export function MoreStories({ posts }: Props) {
  const { language } = useLanguage();

  if (!posts.length) {
    return null;
  }

  return (
    <section>
      <h2 className="mb-8 text-2xl md:text-3xl font-bold tracking-tighter leading-tight">
        {language === "en" ? "Previous screenings" : "过往放映"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImages={post.coverImages}
            date={post.date}
            excerpt={post.excerpt}
            author={post.author}
            slug={post.slug}
            backgroundColor={post.backgroundColor}
          />
        ))}
      </div>
    </section>
  );
}
