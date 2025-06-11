"use client";

import { type Author } from "@/interfaces/author";
import Link from "next/link";
import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { useLanguage } from "@/contexts/language-context";

type Props = {
  title: string;
  coverImages: string[];
  date: string;
  excerpt: string;
  author?: Author;
  slug: string;
};

export function PostPreview({
  title,
  coverImages,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  const { language } = useLanguage();
  const coverImage = coverImages?.[0] || "/default-cover.jpg"; // First image as cover

  // Generate language-specific URL
  const postUrl = language === "zh" ? `/zh/posts/${slug}` : `/posts/${slug}`;

  return (
    <div>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>
      <h3 className="text-xl mb-3 leading-snug">
        <Link href={postUrl} className="hover:underline">
          {title}
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateFormatter dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      {author && <Avatar name={author.name} picture={author.picture} />}
    </div>
  );
}
